import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { BusinessRuleError } from '@/lib/app-errors'

// ─── PROGRAMA 52 — PERGUNTAS QUE CONSTROEM EMPRESAS ───────────────────────────
// ETAPA 1 a 7. Uma única Pergunta Aberta ativa por vez (nunca duas), escolhida
// pelo fundador, inserida naturalmente no fim de conversas compatíveis e
// registrada automaticamente quando respondida. Quando a descoberta tem
// maturidade, ela é promovida a conhecimento (ConhecimentoColetivo) — nunca
// antes. Nenhuma IA inventando conclusões: apenas organização.

const STOPWORDS = new Set([
  'que', 'para', 'com', 'mais', 'por', 'como', 'quando', 'sobre', 'muito',
  'também', 'ainda', 'depois', 'agora', 'hoje', 'sempre', 'nunca', 'pode',
  'posso', 'preciso', 'acho', 'sinto', 'parece', 'tudo', 'nada', 'algum',
  'alguma', 'essa', 'este', 'esta', 'esse', 'isso', 'isto', 'mas', 'até',
  'uma', 'uns', 'ser', 'ter', 'está', 'estão', 'vai', 'foi', 'era', 'são',
  'tem', 'vamos', 'precisa', 'alguma', 'outra', 'outro', 'mês', 'dia', 'anos',
])

function normalizar(palavra: string): string {
  return palavra
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function extrairPadroes(resumos: string[]): { palavra: string; ocorrencias: number }[] {
  const contagem = new Map<string, number>()
  for (const resumo of resumos) {
    const palavras = resumo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-z0-9]+/)
      .filter((p) => p.length > 3 && !STOPWORDS.has(p))
    for (const palavra of new Set(palavras)) {
      contagem.set(palavra, (contagem.get(palavra) ?? 0) + 1)
    }
  }
  return [...contagem.entries()]
    .filter(([, ocorrencias]) => ocorrencias >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([palavra, ocorrencias]) => ({ palavra, ocorrencias }))
}

export interface PerguntaAbertaItem {
  id: string
  pergunta: string
  objetivo: string
  capacidade: string
  beneficio: string
  segmentosRecomendados: string[]
  ativa: boolean
  dataInicio: string
  dataRevisao: string
  criadaEm: string
  totalRespostas: number
}

export interface RespostaAbertaItem {
  id: string
  empresaId: string
  empresaNome: string
  segmento: string | null
  resumo: string
  contexto: string | null
  criadaEm: string
}

export interface PainelFundador {
  perguntaAtual: PerguntaAbertaItem | null
  totalEmpresasParticipantes: number
  respostas: RespostaAbertaItem[]
  padroes: { palavra: string; ocorrencias: number }[]
  perspectivasDiferentes: RespostaAbertaItem[]
  proximaRevisao: string | null
}

function paraItem(
  p: {
    id: string
    pergunta: string
    objetivo: string
    capacidade: string
    beneficio: string
    segmentosRecomendados: string[]
    ativa: boolean
    dataInicio: Date
    dataRevisao: Date
    criadaEm: Date
    _count: { respostas: number }
  },
): PerguntaAbertaItem {
  return {
    id: p.id,
    pergunta: p.pergunta,
    objetivo: p.objetivo,
    capacidade: p.capacidade,
    beneficio: p.beneficio,
    segmentosRecomendados: p.segmentosRecomendados ?? [],
    ativa: p.ativa,
    dataInicio: p.dataInicio.toISOString(),
    dataRevisao: p.dataRevisao.toISOString(),
    criadaEm: p.criadaEm.toISOString(),
    totalRespostas: p._count.respostas,
  }
}

// ETAPA 2 — criar a Pergunta Aberta. Apenas uma ativa por vez: criar uma nova
// desativa qualquer pergunta ativa anterior (nunca duas simultâneas).
export async function criarPerguntaAberta(dados: {
  pergunta: string
  objetivo: string
  capacidade: string
  beneficio: string
  segmentosRecomendados?: string[]
  diasAteRevisao?: number
}): Promise<PerguntaAbertaItem> {
  await prisma.perguntaAberta.updateMany({
    where: { ativa: true },
    data: { ativa: false },
  })

  const criada = await prisma.perguntaAberta.create({
    data: {
      pergunta: dados.pergunta,
      objetivo: dados.objetivo,
      capacidade: dados.capacidade,
      beneficio: dados.beneficio,
      segmentosRecomendados: dados.segmentosRecomendados ?? [],
      ativa: true,
      dataInicio: new Date(),
      dataRevisao: new Date(Date.now() + (dados.diasAteRevisao ?? 7) * 24 * 60 * 60 * 1000),
    },
    include: { _count: { select: { respostas: true } } },
  })

  return paraItem(criada)
}

export async function obterPerguntaAbertaAtiva(): Promise<PerguntaAbertaItem | null> {
  const p = await prisma.perguntaAberta.findFirst({
    where: { ativa: true, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    include: { _count: { select: { respostas: true } } },
  })
  return p ? paraItem(p) : null
}

export async function listarPerguntasAbertas(): Promise<PerguntaAbertaItem[]> {
  const items = await prisma.perguntaAberta.findMany({
    where: { deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    include: { _count: { select: { respostas: true } } },
  })
  return items.map(paraItem)
}

export async function obterPerguntaAberta(id: string): Promise<PerguntaAbertaItem | null> {
  const p = await prisma.perguntaAberta.findFirst({
    where: { id, deletedAt: null },
    include: { _count: { select: { respostas: true } } },
  })
  return p ? paraItem(p) : null
}

export async function empresaJaRespondeu(perguntaId: string, empresaId: string): Promise<boolean> {
  const encontrada = await prisma.respostaPerguntaAberta.findFirst({
    where: { perguntaId, empresaId, deletedAt: null },
    select: { id: true },
  })
  return !!encontrada
}

// ETAPA 3 — compatibilidade de segmento. Segmentos vazios = vale para todas.
export async function estaCompativelComSegmento(
  segmentosRecomendados: string[],
  empresaId: string,
): Promise<boolean> {
  if (!segmentosRecomendados || segmentosRecomendados.length === 0) return true

  const segmentos = await prisma.cliente.findMany({
    where: { empresaId, deletedAt: null, segmento: { not: null } },
    select: { segmento: true },
    distinct: ['segmento'],
  })

  const segmentosEmpresa = segmentos
    .map((c) => (c.segmento ?? '').trim().toLowerCase())
    .filter(Boolean)

  if (segmentosEmpresa.length === 0) return true // sem segmento registrado: não excluímos ninguém

  return segmentosRecomendados.some((s) =>
    segmentosEmpresa.includes(s.trim().toLowerCase()),
  )
}

// ETAPA 4 — registro automático da resposta. Uma resposta por empresa por
// pergunta. Registramos: pergunta, empresa, segmento, resumo e data. Nada mais.
export async function registrarRespostaPerguntaAberta(
  perguntaId: string,
  empresaId: string,
  resumo: string,
  contexto?: string | null,
): Promise<RespostaAbertaItem> {
  const pergunta = await obterPerguntaAberta(perguntaId)
  if (!pergunta) throw new BusinessRuleError('Pergunta aberta não encontrada')

  const jaRespondeu = await empresaJaRespondeu(perguntaId, empresaId)
  if (jaRespondeu) throw new BusinessRuleError('Essa empresa já respondeu esta pergunta')

  const segmentoCliente = await prisma.cliente.findFirst({
    where: { empresaId, deletedAt: null, segmento: { not: null } },
    select: { segmento: true },
  })

  const registrada = await prisma.respostaPerguntaAberta.create({
    data: {
      perguntaId,
      empresaId,
      segmento: segmentoCliente?.segmento ?? null,
      resumo,
      contexto: contexto ?? null,
    },
    include: { empresa: { select: { nome: true } } },
  })

  return {
    id: registrada.id,
    empresaId: registrada.empresaId,
    empresaNome: registrada.empresa.nome,
    segmento: registrada.segmento,
    resumo: registrada.resumo,
    contexto: registrada.contexto,
    criadaEm: registrada.criadaEm.toISOString(),
  }
}

export async function listarRespostas(perguntaId: string): Promise<RespostaAbertaItem[]> {
  const itens = await prisma.respostaPerguntaAberta.findMany({
    where: { perguntaId, deletedAt: null },
    orderBy: { criadaEm: 'asc' },
    include: { empresa: { select: { nome: true } } },
  })
  return itens.map((r) => ({
    id: r.id,
    empresaId: r.empresaId,
    empresaNome: r.empresa.nome,
    segmento: r.segmento,
    resumo: r.resumo,
    contexto: r.contexto,
    criadaEm: r.criadaEm.toISOString(),
  }))
}

// ETAPA 5 — painel do fundador. Sem IA inventando conclusões: apenas
// organização dos padrões reais observados.
export async function obterPainelFundador(perguntaId?: string): Promise<PainelFundador> {
  let pergunta: PerguntaAbertaItem | null = null
  if (perguntaId) {
    pergunta = await obterPerguntaAberta(perguntaId)
  }
  if (!pergunta) {
    pergunta = await obterPerguntaAbertaAtiva()
  }

  if (!pergunta) {
    return {
      perguntaAtual: null,
      totalEmpresasParticipantes: 0,
      respostas: [],
      padroes: [],
      perspectivasDiferentes: [],
      proximaRevisao: null,
    }
  }

  const respostas = await listarRespostas(pergunta.id)
  const padroes = extrairPadroes(respostas.map((r) => r.resumo))

  const palavrasPadrao = new Set(padroes.map((p) => normalizar(p.palavra)))
  const perspectivasDiferentes = respostas.filter((r) => {
    if (palavrasPadrao.size === 0) return false
    const palavras = normalizar(r.resumo).split(/[^a-z0-9]+/)
    return !palavras.some((p) => palavrasPadrao.has(p))
  })

  return {
    perguntaAtual: pergunta,
    totalEmpresasParticipantes: respostas.length,
    respostas,
    padroes,
    perspectivasDiferentes,
    proximaRevisao: pergunta.dataRevisao,
  }
}

// ETAPA 6 — revisão semanal. Continuar = nova data de revisão. Nova pergunta =
// desativa a atual (a próxima criação assume).
export async function revisarPergunta(
  perguntaId: string,
  opcoes: { continuar: boolean; diasAteRevisao?: number },
): Promise<PerguntaAbertaItem> {
  const pergunta = await obterPerguntaAberta(perguntaId)
  if (!pergunta) throw new BusinessRuleError('Pergunta aberta não encontrada')

  const atualizada = await prisma.perguntaAberta.update({
    where: { id: perguntaId },
    data: opcoes.continuar
      ? { dataRevisao: new Date(Date.now() + (opcoes.diasAteRevisao ?? 7) * 24 * 60 * 60 * 1000) }
      : { ativa: false },
    include: { _count: { select: { respostas: true } } },
  })

  return paraItem(atualizada)
}

// ETAPA 7 — promoção para conhecimento. A descoberta deixa de ser uma pergunta
// e passa a integrar o patrimônio: vira ConhecimentoColetivo candidato. O fluxo
// nunca é invertido: Pergunta → Conversas → Padrões → Conhecimento → Recomendação → Produto.
export async function promoverPerguntaParaConhecimento(
  perguntaId: string,
  dados: { titulo: string; descricao: string; categoria: string },
): Promise<{ id: string }> {
  const pergunta = await obterPerguntaAberta(perguntaId)
  if (!pergunta) throw new BusinessRuleError('Pergunta aberta não encontrada')

  const conhecimento = await prisma.conhecimentoColetivo.create({
    data: {
      titulo: dados.titulo,
      descricao: dados.descricao,
      categoria: dados.categoria,
      status: 'CANDIDATO',
      scoreConfianca: Math.min(pergunta.totalRespostas / 10, 1),
      repeticoes: pergunta.totalRespostas,
      metadados: {
        origem: 'pergunta-aberta',
        perguntaId,
        pergunta: pergunta.pergunta,
      },
    },
    select: { id: true },
  })

  await prisma.perguntaAberta.update({
    where: { id: perguntaId },
    data: { ativa: false },
  })

  return conhecimento
}
