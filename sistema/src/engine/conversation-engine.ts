import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { FLUXOS } from '@/engine/fluxos/primeira-conversa'
import { obterReacao, REACOES_BLOCO } from '@/engine/reacoes'
import { registrarEvidencia } from '@/engine/evidence-engine'
import { registrarEventoAtivacao } from '@/engine/founder-activation-engine'
import type { EstadoConversa, RespostaConversa, Progresso, Fluxo } from '@/engine/tipos'
import { NotFoundError, BusinessRuleError } from '@/lib/app-errors'

const BLOCO_POR_ETAPA: Record<string, string> = {
  'empresa.segmento': 'empresa',
  'empresa.tempo': 'empresa',
  'empresa.funcionarios': 'empresa',
  'empresa.faturamento': 'empresa',
  'operacao.aquisicao': 'operacao',
  'operacao.produto': 'operacao',
  'operacao.lucro': 'operacao',
  'operacao.trabalhoso': 'operacao',
  'operacao.horas': 'operacao',
  'gestao.contratacao': 'gestao',
  'gestao.promocao': 'gestao',
  'gestao.caixa': 'gestao',
  'gestao.decisao': 'gestao',
  'problemas.insonia': 'problemas',
  'problemas.repeticao': 'problemas',
  'problemas.perda': 'problemas',
  'objetivos.meta': 'objetivos',
  'objetivos.automatizar': 'objetivos',
  'objetivos.delegar': 'objetivos',
}

const BLOCO_ORDEM = ['empresa', 'operacao', 'gestao', 'problemas', 'objetivos']

function calcularProgresso(etapaIndex: number, total: number): Progresso {
  if (etapaIndex < 0 || total === 0) {
    return { blocoAtual: 1, totalBlocos: 5, etapaNoBloco: 1, totalEtapasNoBloco: 1, percentual: 0 }
  }

  const idsEtapas = Object.keys(BLOCO_POR_ETAPA)
  const etapaId = idsEtapas[Math.min(etapaIndex, idsEtapas.length - 1)]
  const blocoAtual = BLOCO_POR_ETAPA[etapaId]
  const blocoIdx = BLOCO_ORDEM.indexOf(blocoAtual)

  const etapasNoBloco = idsEtapas.filter((id) => BLOCO_POR_ETAPA[id] === blocoAtual)
  const etapaNoBloco = etapasNoBloco.indexOf(etapaId)

  return {
    blocoAtual: blocoIdx + 1,
    totalBlocos: BLOCO_ORDEM.length,
    etapaNoBloco: etapaNoBloco + 1,
    totalEtapasNoBloco: etapasNoBloco.length,
    percentual: Math.round(((etapaIndex + 1) / idsEtapas.length) * 100),
  }
}

export async function criarConversa(token: string, fluxoId = 'primeira-conversa'): Promise<EstadoConversa> {
  const fluxo = FLUXOS[fluxoId]
  if (!fluxo) throw new NotFoundError(`Fluxo "${fluxoId}" não encontrado`)

  const primeiraEtapa = fluxo.etapas[0]

  await prisma.conversa.create({
    data: {
      token,
      fluxo: fluxoId,
      etapa: primeiraEtapa.id,
      respostas: {},
    },
  })

  return {
    token,
    fluxo: fluxoId,
    etapa: primeiraEtapa.id,
    concluida: false,
    respostas: {},
  }
}

export async function carregarConversa(token: string): Promise<EstadoConversa | null> {
  const conversa = await prisma.conversa.findFirst({
    where: { token, concluida: false },
    orderBy: { criadaEm: 'desc' },
  })
  if (!conversa) return null

  return {
    token: conversa.token,
    fluxo: conversa.fluxo,
    etapa: conversa.etapa ?? undefined,
    concluida: conversa.concluida,
    respostas: conversa.respostas as Record<string, string | null>,
  }
}

export async function responder(
  token: string,
  perguntaId: string,
  valor: string
): Promise<RespostaConversa> {
  const conversa = await prisma.conversa.findFirst({
    where: { token, concluida: false },
    orderBy: { criadaEm: 'desc' },
  })
  if (!conversa) throw new NotFoundError('Conversa não encontrada')
  if (conversa.concluida) throw new BusinessRuleError('Conversa já finalizada')

  const fluxo = FLUXOS[conversa.fluxo]
  if (!fluxo) throw new NotFoundError('Fluxo não encontrado')

  const respostasAtuais = (conversa.respostas as Record<string, string | null>) ?? {}
  respostasAtuais[perguntaId] = valor

  // Encontra o índice da etapa atual
  const etapaIndex = fluxo.etapas.findIndex((e) => e.id === perguntaId)
  const proximaEtapa = fluxo.etapas[etapaIndex + 1] ?? null

  const etapaSalvar = proximaEtapa?.id ?? null
  const foiConcluida = !proximaEtapa

  await prisma.conversa.update({
    where: { id: conversa.id },
    data: {
      respostas: respostasAtuais,
      etapa: etapaSalvar,
      concluida: foiConcluida,
    },
  })

  // Reação
  const reacao = obterReacao(perguntaId)

  // Transição de bloco
  const blocoAtual = BLOCO_POR_ETAPA[perguntaId]
  const proxBloco = proximaEtapa ? BLOCO_POR_ETAPA[proximaEtapa.id] : null
  const transicao = blocoAtual !== proxBloco && proxBloco ? REACOES_BLOCO[proxBloco] : null

  const reacaoFinal = transicao ? `${reacao}\n\n${transicao}` : reacao

  // Se for a última pergunta do bloco de problemas, adiciona transição especial
  let reacaoExtra = reacaoFinal
  if (perguntaId === 'problemas.perda') {
    reacaoExtra = `${reacaoFinal}\n\n${REACOES_BLOCO['objetivos']}`
  }

  // Registra evidência (apenas se vinculada a uma empresa)
  if (conversa.empresaId) {
    const categoriaEvidencia = mapearBlocoParaCategoria(BLOCO_POR_ETAPA[perguntaId])
    void registrarEvidencia(conversa.empresaId, {
      categoria: categoriaEvidencia,
      origem: 'PRIMEIRA_CONVERSA',
      descricao: `Resposta: ${valor.slice(0, 120)}`,
      confianca: 'ALTA',
      dados: { perguntaId, bloco: BLOCO_POR_ETAPA[perguntaId] },
    })
  }

  // Ativação — conversa concluída
  if (foiConcluida && conversa.empresaId) {
    void registrarEventoAtivacao(conversa.empresaId, 'DIAGNOSTICO_COMPLETO')
    void registrarEventoAtivacao(conversa.empresaId, 'CONVERSA_MENSAL_REALIZADA')
  }

  return {
    reacao: reacaoExtra,
    proximaPergunta: proximaEtapa,
    progresso: calcularProgresso(etapaIndex, fluxo.etapas.length),
    concluida: foiConcluida,
  }
}

function mapearBlocoParaCategoria(bloco: string) {
  const mapa: Record<string, 'FINANCEIRO' | 'CLIENTES' | 'OPERACAO' | 'GESTAO' | 'PESSOAS' | 'PRODUTO' | 'ESTRATEGIA'> = {
    empresa: 'GESTAO',
    operacao: 'OPERACAO',
    gestao: 'GESTAO',
    problemas: 'GESTAO',
    objetivos: 'ESTRATEGIA',
  }
  return mapa[bloco] ?? 'GESTAO'
}

export async function obterEstado(token: string): Promise<{
  perguntaAtual: Fluxo['etapas'][0] | null
  progresso: Progresso
  concluida: boolean
  respostas: Record<string, string | null>
  reacao?: string
} | null> {
  const estado = await carregarConversa(token)
  if (!estado) return null

  const fluxo = FLUXOS[estado.fluxo]
  if (!fluxo) return null

  const etapaIndex = fluxo.etapas.findIndex((e) => e.id === estado.etapa)

  return {
    perguntaAtual: estado.etapa ? (fluxo.etapas.find((e) => e.id === estado.etapa) ?? null) : null,
    progresso: calcularProgresso(etapaIndex, fluxo.etapas.length),
    concluida: estado.concluida,
    respostas: estado.respostas,
  }
}

export async function retomarConversa(token: string): Promise<EstadoConversa | null> {
  return carregarConversa(token)
}

export async function vincularConversa(token: string, empresaId: string): Promise<void> {
  await prisma.conversa.updateMany({
    where: { token, empresaId: null },
    data: { empresaId },
  })
}

export async function obterRespostas(token: string): Promise<Record<string, string | null>> {
  const conversa = await prisma.conversa.findFirst({
    where: { token },
    orderBy: { criadaEm: 'desc' },
  })
  if (!conversa) throw new NotFoundError('Conversa não encontrada')
  return (conversa.respostas as Record<string, string | null>) ?? {}
}

export function getFluxoSteps(fluxoId: string) {
  return FLUXOS[fluxoId]?.etapas ?? []
}

