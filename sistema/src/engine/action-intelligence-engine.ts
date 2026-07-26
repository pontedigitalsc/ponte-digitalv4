import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { registrarEvidencia } from './evidence-engine'
import { registrarNaMemoria } from './cognitive-memory-engine'
import { registrarEventoAtivacao } from './founder-activation-engine'
import type { CategoriaEvidencia, StatusAcao, OrigemAcao } from '@prisma/client'
import type { Decisao } from './decision-engine'
import { NotFoundError } from '@/lib/app-errors'

const MAX_ACOES_ATIVAS = 3

// ─── Criar ação a partir de uma decisão ─────────────────────────────

export async function criarAcao(
  empresaId: string,
  decisao: Decisao,
  origem: OrigemAcao = 'DECISION_ENGINE'
) {
  const ativas = await prisma.acaoCognitiva.count({
    where: { empresaId, status: { in: ['PENDENTE', 'EM_ANDAMENTO'] } },
  })

  if (ativas >= MAX_ACOES_ATIVAS) {
    return null
  }

  const jaExiste = await prisma.acaoCognitiva.findFirst({
    where: {
      empresaId,
      decisaoId: decisao.id,
      status: { in: ['PENDENTE', 'EM_ANDAMENTO'] },
    },
  })

  if (jaExiste) return jaExiste

  const acao = await prisma.acaoCognitiva.create({
    data: {
      empresaId,
      decisaoId: decisao.id,
      titulo: decidirTituloAcao(decisao),
      descricao: decidirDescricaoAcao(decisao),
      categoria: decisao.categoria,
      status: 'PENDENTE',
      origem,
      impactoEsperado: {
        impacto: decisao.impacto,
        urgencia: decisao.urgencia,
        confianca: decisao.confianca,
      },
    },
  })

  void registrarEvidencia(empresaId, {
    categoria: decisao.categoria,
    origem: 'SISTEMA',
    descricao: `Nova ação criada: ${acao.titulo}`,
    confianca: 'ALTA',
    dados: { acaoId: acao.id, decisaoId: decisao.id },
  })

  void registrarEventoAtivacao(empresaId, 'PRIMEIRA_ACAO_CRIADA', { acaoId: acao.id })

  return acao
}

function decidirTituloAcao(decisao: Decisao): string {
  const mapa: Record<string, string> = {
    'fin-registrar-movimentacao': 'Registrar movimentações financeiras por 7 dias',
    'fin-revisar-fluxo-caixa': 'Analisar fluxo de caixa dos últimos 30 dias',
    'fin-negociar-receber': 'Negociar contas a receber com clientes inadimplentes',
    'cli-followup-leads': 'Fazer follow-up com leads em negociação',
    'cli-revisar-pipeline': 'Mapear o pipeline de vendas atual',
    'ges-organizar-tarefas': 'Organizar tarefas pendentes por prioridade',
    'ope-mapear-gargalos': 'Identificar gargalos operacionais',
    'est-primeira-conversa': 'Responder à Primeira Conversa',
    'est-revisar-planejamento': 'Revisar planejamento dos próximos meses',
    'pes-analisar-equipe': 'Analisar distribuição de tarefas da equipe',
  }
  return mapa[decisao.id] ?? decisao.titulo
}

function decidirDescricaoAcao(decisao: Decisao): string {
  return decisao.descricao
}

// ─── Status ─────────────────────────────────────────────────────────

export async function atualizarStatusAcao(
  acaoId: string,
  novoStatus: StatusAcao,
  empresaId: string
) {
  const acao = await prisma.acaoCognitiva.findFirst({ where: { id: acaoId, empresaId } })
  if (!acao) throw new NotFoundError('Ação não encontrada')

  const atualizada = await prisma.acaoCognitiva.update({
    where: { id: acaoId, empresaId },
    data: { status: novoStatus },
  })

  const statusLabel: Record<string, string> = {
    PENDENTE: 'pendente',
    EM_ANDAMENTO: 'em andamento',
    CONCLUIDA: 'concluída',
    ABANDONADA: 'abandonada',
  }

  void registrarEvidencia(acao.empresaId, {
    categoria: acao.categoria as CategoriaEvidencia,
    origem: 'SISTEMA',
    descricao: `Ação "${acao.titulo}" passou para ${statusLabel[novoStatus]}`,
    confianca: 'ALTA',
    dados: { acaoId, statusAnterior: acao.status, novoStatus },
  })

  if (novoStatus === 'CONCLUIDA' || novoStatus === 'ABANDONADA') {
    void registrarNaMemoria(acao.empresaId, {
      tipo: novoStatus === 'CONCLUIDA' ? 'evolucao' : 'mudanca',
      descricao: `Ação ${statusLabel[novoStatus]}: ${acao.titulo}`,
      categoria: acao.categoria as CategoriaEvidencia,
      versao: 0,
      metadados: { acaoId, status: novoStatus, categoria: acao.categoria },
    })
  }

  if (novoStatus === 'CONCLUIDA') {
    void registrarEventoAtivacao(acao.empresaId, 'PRIMEIRA_ACAO_CONCLUIDA', { acaoId })
  }

  return atualizada
}

// ─── Resultado ──────────────────────────────────────────────────────

export async function registrarResultadoAcao(
  acaoId: string,
  resultado: 'sim' | 'parcialmente' | 'nao',
  empresaId: string,
  observacao?: string
) {
  const acao = await prisma.acaoCognitiva.findFirst({ where: { id: acaoId, empresaId } })
  if (!acao) throw new NotFoundError('Ação não encontrada')

  const atualizada = await prisma.acaoCognitiva.update({
    where: { id: acaoId, empresaId },
    data: {
      status: 'CONCLUIDA',
      resultado: { resposta: resultado, observacao, concluidaEm: new Date().toISOString() },
    },
  })

  const descricaoResultado = resultado === 'sim'
    ? `Ação "${acao.titulo}" foi eficaz`
    : resultado === 'parcialmente'
      ? `Ação "${acao.titulo}" teve efeito parcial`
      : `Ação "${acao.titulo}" não gerou o resultado esperado`

  void registrarEvidencia(acao.empresaId, {
    categoria: acao.categoria as CategoriaEvidencia,
    origem: 'SISTEMA',
    descricao: descricaoResultado,
    confianca: 'ALTA',
    dados: { acaoId, resultado, ...(observacao ? { observacao } : {}) },
  })

  void registrarNaMemoria(acao.empresaId, {
    tipo: 'evolucao',
    descricao: descricaoResultado,
    categoria: acao.categoria as CategoriaEvidencia,
    versao: 0,
    metadados: { acaoId, resultado },
  })

  return atualizada
}

// ─── Consultas ──────────────────────────────────────────────────────

export async function listarAcoesAtivas(empresaId: string, limite = MAX_ACOES_ATIVAS) {
  return prisma.acaoCognitiva.findMany({
    where: {
      empresaId,
      status: { in: ['PENDENTE', 'EM_ANDAMENTO'] },
    },
    orderBy: { criadaEm: 'desc' },
    take: limite,
  })
}

export async function listarAcoesPorCategoria(empresaId: string, categoria: CategoriaEvidencia) {
  return prisma.acaoCognitiva.findMany({
    where: { empresaId, categoria, status: { in: ['PENDENTE', 'EM_ANDAMENTO'] } },
    orderBy: { criadaEm: 'desc' },
  })
}

export async function listarHistoricoAcoes(empresaId: string, limite = 10) {
  return prisma.acaoCognitiva.findMany({
    where: { empresaId },
    orderBy: { criadaEm: 'desc' },
    take: limite,
  })
}

export async function acaoAtivaPorDecisao(empresaId: string, decisaoId: string) {
  return prisma.acaoCognitiva.findFirst({
    where: {
      empresaId,
      decisaoId,
      status: { in: ['PENDENTE', 'EM_ANDAMENTO'] },
    },
  })
}

// ─── Análise de impacto ─────────────────────────────────────────────

export async function analisarImpacto(empresaId: string) {
  const historico = await listarHistoricoAcoes(empresaId, 20)
  if (historico.length === 0) return null

  const total = historico.length
  const concluidas = historico.filter((a) => a.status === 'CONCLUIDA')
  const comResultado = concluidas.filter((a) => a.resultado !== null)
  const eficazes = comResultado.filter((a) => {
    const r = a.resultado as { resposta?: string } | null
    return r?.resposta === 'sim'
  })

  return {
    total,
    taxaConclusao: total > 0 ? Math.round((concluidas.length / total) * 100) : 0,
    taxaEficacia: comResultado.length > 0 ? Math.round((eficazes.length / comResultado.length) * 100) : 0,
    emAndamento: historico.filter((a) => a.status === 'EM_ANDAMENTO').length,
    pendentes: historico.filter((a) => a.status === 'PENDENTE').length,
    ultimaAcao: historico[0] ?? null,
  }
}
