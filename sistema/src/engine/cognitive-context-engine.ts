import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { consultarEvidencias } from './evidence-engine'
import { obterIdentidade } from './identity-engine'
import { consultarMemoria } from './cognitive-memory-engine'
import { gerarSinaisClientes } from './clientes.sinais'
import { gerarSinaisTarefas } from './tarefas.sinais'
import { gerarSinaisFinanceiro } from './financeiro.sinais'
import { ordenarPorUrgencia, type Sinal } from './tipos'
import { getCache, TTL } from '@/lib/cache'
import type { CategoriaEvidencia } from './evidence-engine'

export interface DecisaoContexto {
  prioridade: CategoriaEvidencia
  motivo: string
  confianca: number
  evidenciasChave: Array<{
    descricao: string
    origem: string
    data: Date
    confianca: string
  }>
  acaoSugerida?: string
  setoresEstaveis: string[]
  mudancasRecentes: string[]
  tendencia?: string
  memoriaRecente?: { tipo: string; descricao: string }[]
}

const CATEGORIAS_VALORES = [
  'FINANCEIRO',
  'CLIENTES',
  'OPERACAO',
  'GESTAO',
  'PESSOAS',
  'PRODUTO',
  'ESTRATEGIA',
] as const

const PESO_CONFIANCA: Record<string, number> = {
  ALTA: 3,
  MEDIA: 2,
  BAIXA: 1,
}

export async function decidirContexto(empresaId: string): Promise<DecisaoContexto> {
  return getCache().remember(
    `contexto:${empresaId}:decisao`,
    async () => {
      const agora = new Date()
      const ultimos7Dias = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000)

      const situacao = await buscarSituacaoEmpresa(empresaId)
      const { evidencias, memoria, identidade, sinais } = situacao

      const evidenciasRecentes = evidencias.filter((e) => e.criadaEm >= ultimos7Dias)

      const scores = calcularScoresCategoria(evidencias, sinais, memoria, ultimos7Dias, agora)

  // 7. Se não há evidências nem identidade, retorna estado padrão
  if (Object.keys(scores).length === 0 && !identidade) {
    return {
      prioridade: 'ESTRATEGIA',
      motivo: 'Ainda não conhecemos sua empresa. Uma conversa inicial pode nos ajudar a entender seu negócio.',
      confianca: 0.1,
      evidenciasChave: [],
      setoresEstaveis: [],
      mudancasRecentes: [],
    }
  }

  // 8. Ordena por score
  const ordenado = Object.entries(scores).sort((a, b) => b[1].score - a[1].score)

  const topCategoria = ordenado[0]
  const topEvidencias = topCategoria[1].evidencias
    .slice(0, 3)
    .map((e) => ({
      descricao: e.descricao,
      origem: e.origem,
      data: e.criadaEm,
      confianca: e.confianca,
    }))

  // 9. Gera motivo legível (agora considera memória)
  const motivo = gerarMotivo(topCategoria[0], topEvidencias, identidade, evidenciasRecentes.length, memoria)

  // 10. Confiança
  const totalEvidencias = evidencias.length
  const confianca = Math.min(totalEvidencias / 20, 1) * 0.5 +
    (topCategoria[1].score / Math.max(totalEvidencias, 1)) * 0.3 +
    (identidade ? 0.2 : 0)

  // 11. Gera ação sugerida
  const acaoSugerida = gerarAcaoSugerida(topCategoria[0], identidade)

  // 12. Identifica setores estáveis e mudanças
  const setoresEstaveis = Object.entries(scores)
    .filter((entry) => entry[1].score < 3 && entry[1].score > 0)
    .map(([cat]) => traduzirCategoria(cat))

  const mudancasRecentes = evidenciasRecentes
    .filter((e) => e.confianca === 'ALTA')
    .slice(0, 3)
    .map((e) => e.descricao)

  // 13. Tendência — mudança de direção das evidências
  const tendencia = gerarTendencia(topCategoria[0], evidencias, memoria)

  return {
    prioridade: topCategoria[0] as CategoriaEvidencia,
    motivo,
    confianca: Math.round(confianca * 100) / 100,
    evidenciasChave: topEvidencias,
    acaoSugerida,
    setoresEstaveis,
    mudancasRecentes,
    tendencia,
      memoriaRecente: memoria.slice(0, 3).map((m) => ({ tipo: m.tipo, descricao: m.descricao })),
    }
  },
    TTL.CONTEXTO
  )
}

function mapearDominioParaCategoria(dominio: string): string {
  const mapa: Record<string, string> = {
    clientes: 'CLIENTES',
    tarefas: 'GESTAO',
    financeiro: 'FINANCEIRO',
  }
  return mapa[dominio] ?? 'GESTAO'
}

function calcularScoresCategoria(
  evidencias: Array<{ categoria: string; criadaEm: Date; confianca: string; descricao: string; origem: string }>,
  sinais: Array<{ dominio: string; urgencia: string; titulo: string }>,
  memoria: Array<{ categoria: string }>,
  ultimos7Dias: Date,
  agora: Date
) {
  const evidenciasRecentes = evidencias.filter((e) => e.criadaEm >= ultimos7Dias)
  const categoriasMemoria = new Set(memoria.map((m) => m.categoria))

  const scores: Record<string, { score: number; evidencias: Array<{ descricao: string; origem: string; criadaEm: Date; confianca: string }> }> = {}

  for (const cat of CATEGORIAS_VALORES) {
    const daCategoria = evidencias.filter((e) => e.categoria === cat)
    if (daCategoria.length === 0) continue

    const recentes = daCategoria.filter((e) => e.criadaEm >= ultimos7Dias)
    const pesoRecencia = recentes.length * 2
    const pesoTotal = daCategoria.reduce(
      (acc, e) => acc + (PESO_CONFIANCA[e.confianca] ?? 1),
      0
    )
    const pesoMemoria = categoriasMemoria.has(cat) ? 4 : 0

    scores[cat] = {
      score: pesoTotal + pesoRecencia + daCategoria.length + pesoMemoria,
      evidencias: daCategoria,
    }
  }

  for (const sinal of sinais) {
    const cat = mapearDominioParaCategoria(sinal.dominio)
    if (scores[cat]) {
      const pesoUrgencia = sinal.urgencia === 'alta' ? 5 : sinal.urgencia === 'media' ? 3 : 1
      scores[cat].score += pesoUrgencia
      scores[cat].evidencias.push({
        descricao: sinal.titulo,
        origem: 'SISTEMA',
        criadaEm: agora,
        confianca: 'ALTA',
      })
    }
  }

  return scores
}

function traduzirCategoria(cat: string): string {
  const mapa: Record<string, string> = {
    FINANCEIRO: 'Financeiro',
    CLIENTES: 'Clientes',
    OPERACAO: 'Operação',
    GESTAO: 'Gestão',
    PESSOAS: 'Pessoas',
    PRODUTO: 'Produto',
    ESTRATEGIA: 'Estratégia',
  }
  return mapa[cat] ?? cat
}

function gerarMotivo(
  categoria: string,
  evidencias: Array<{ descricao: string }>,
  identidade: { interpretacoes?: unknown; narrativaVersao?: unknown } | null,
  totalRecentes: number,
  memoria: Array<{ tipo: string; descricao: string; criadaEm: Date }>
): string {
  // Memória recente tem prioridade — ela conta a história
  const mudancaRecente = memoria.find((m) => m.tipo === 'mudanca' || m.tipo === 'descoberta')
  if (mudancaRecente) {
    return `${mudancaRecente.descricao}. ${evidencias.length > 0 ? `A última atividade foi: ${evidencias[0].descricao}` : ''}`
  }

  const confirmacaoRecente = memoria.find((m) => m.tipo === 'confirmacao')
  if (confirmacaoRecente) {
    return `${confirmacaoRecente.descricao}. Os dados recentes confirmam essa direção.`
  }

  const narrativa = identidade?.narrativaVersao as string | null
  if (narrativa) {
    return `Fase: ${narrativa}. ${evidencias.length > 0 ? evidencias[0].descricao : ''}`
  }

  if (evidencias.length > 0) {
    const primeira = evidencias[0].descricao
    return `${primeira}${totalRecentes > 3 ? ` Além disso, houve ${totalRecentes} interações importantes nesta área na última semana.` : ''}`
  }

  const interp = identidade?.interpretacoes as { pontoAtencao?: string | null } | null | undefined
  if (interp?.pontoAtencao) {
    return `Na nossa conversa anterior, você destacou: "${interp.pontoAtencao}". Isso continua sendo relevante.`
  }

  return `A área de ${traduzirCategoria(categoria)} parece ser a mais relevante para sua empresa neste momento.`
}

function gerarTendencia(
  categoria: string,
  evidencias: Array<{ categoria: string; criadaEm: Date }>,
  memoria: Array<{ tipo: string; descricao: string }>
): string | undefined {
  const evidenciasDaCategoria = evidencias.filter((e) => e.categoria === categoria)
  if (evidenciasDaCategoria.length > 5) {
    if (memoria.some((m) => m.tipo === 'mudanca')) return 'Direção: evolução no entendimento'
    return 'Direção: consistente (múltiplas evidências na mesma área)'
  }
  if (memoria.some((m) => m.tipo === 'descoberta')) return 'Direção: nova área de interesse identificada'
  return undefined
}

export interface SituacaoEmpresa {
  empresaId: string
  evidencias: Awaited<ReturnType<typeof consultarEvidencias>>
  identidade: Awaited<ReturnType<typeof obterIdentidade>>
  memoria: Awaited<ReturnType<typeof consultarMemoria>>
  sinais: Sinal[]
  clientes: Array<{ id: string; nome: string; status: string | null; proximoContato: Date | null }>
  tarefas: Array<{ id: string; titulo: string; status: string; prioridade: string | null; dataVencimento: Date | null }>
  temTransacoesRecentes: boolean
  temTarefasAtrasadas: boolean
  temLeadsQuentes: boolean
  temClientesInadimplentes: boolean
  diasSemRegistroFinanceiro: number
  variacaoReceita: number | null
}

export async function buscarSituacaoEmpresa(empresaId: string): Promise<SituacaoEmpresa> {
  const agora = new Date()
  const ultimos30Dias = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000)
  const ultimos7Dias = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [evidencias, identidade, memoria, clientes, tarefas, transacao] = await Promise.all([
    consultarEvidencias(empresaId, { desde: ultimos30Dias, limite: 200 }),
    obterIdentidade(empresaId),
    consultarMemoria(empresaId, 10),
    prisma.cliente.findMany({
      where: { empresaId, deletedAt: null, status: { in: ['ATIVO', 'INADIMPLENTE'] } },
      select: { id: true, nome: true, status: true, proximoContato: true },
    }),
    prisma.tarefa.findMany({
      where: { empresaId, deletedAt: null, status: { in: ['PENDENTE', 'EM_ANDAMENTO'] } },
      select: { id: true, titulo: true, status: true, prioridade: true, dataVencimento: true },
    }),
    prisma.transacao.findFirst({
      where: { empresaId, deletedAt: null, criadaEm: { gte: ultimos7Dias } },
      orderBy: { criadaEm: 'desc' },
      select: { criadaEm: true },
    }),
  ])

  const transacoesRecentes = await prisma.transacao.count({
    where: { empresaId, deletedAt: null, criadaEm: { gte: ultimos7Dias } },
  })

  const inicioMesAtual = new Date(agora.getFullYear(), agora.getMonth(), 1)
  const inicioMesAnterior = new Date(agora.getFullYear(), agora.getMonth() - 1, 1)

  const [receitaMes, receitaMesAnterior, receitaPendente] = await Promise.all([
    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', status: 'PAGO', criadaEm: { gte: inicioMesAtual } },
      _sum: { valor: true },
    }),
    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', status: 'PAGO', criadaEm: { gte: inicioMesAnterior, lt: inicioMesAtual } },
      _sum: { valor: true },
    }),
    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', status: 'PENDENTE' },
      _sum: { valor: true },
    }),
  ])

  const receitaAtual = Number(receitaMes._sum.valor ?? 0)
  const receitaAnterior = Number(receitaMesAnterior._sum.valor ?? 0)
  // Variação real em relação ao mês anterior. Só vira número quando há mês
  // anterior para comparar — nunca inventamos essa comparação.
  const variacaoReceita = receitaAnterior > 0
    ? Math.round(((receitaAtual - receitaAnterior) / receitaAnterior) * 100)
    : null

  const sinais = ordenarPorUrgencia([
    ...gerarSinaisClientes(clientes as never, agora),
    ...gerarSinaisTarefas(tarefas as never, agora),
    ...gerarSinaisFinanceiro({
      receitaMes: receitaAtual,
      receitaPendente: Number(receitaPendente._sum.valor ?? 0),
      variacaoReceita,
    }),
  ])

  return {
    empresaId,
    evidencias,
    identidade,
    memoria,
    sinais,
    clientes,
    tarefas,
    temTransacoesRecentes: transacoesRecentes > 0,
    temTarefasAtrasadas: tarefas.some(t => t.dataVencimento && t.dataVencimento < agora && t.status !== 'CONCLUIDA'),
    temLeadsQuentes: await prisma.lead.count({
      where: { empresaId, deletedAt: null, estagio: { in: ['PROPOSTA', 'NEGOCIACAO'] } },
    }).then(c => c > 0),
    temClientesInadimplentes: clientes.some(c => c.status === 'INADIMPLENTE'),
    diasSemRegistroFinanceiro: transacao
      ? Math.floor((agora.getTime() - transacao.criadaEm.getTime()) / (24 * 60 * 60 * 1000))
      : 30,
    variacaoReceita,
  }
}

function gerarAcaoSugerida(
  categoria: string,
  identidade: { interpretacoes?: unknown } | null
): string | undefined {
  if (categoria === 'FINANCEIRO') return 'Recomendo revisar o fluxo de caixa e as contas a receber.'
  if (categoria === 'CLIENTES') return 'Que tal revisar as negociações de vendas e os clientes ativos?'
  if (categoria === 'GESTAO') return 'Verificar tarefas e processos internos pode trazer clareza.'
  if (categoria === 'OPERACAO') return 'Analisar a operação pode revelar gargalos.'
  if (categoria === 'ESTRATEGIA' && !identidade) return 'Que tal começarmos com uma conversa para entender sua empresa?'
  return undefined
}
