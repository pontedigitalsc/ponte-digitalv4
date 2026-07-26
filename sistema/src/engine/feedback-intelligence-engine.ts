import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { registrarEvidencia } from './evidence-engine'
import { registrarNaMemoria, atualizarEstadoHipotese, listarHipoteses } from './cognitive-memory-engine'
import { registrarEventoAtivacao } from './founder-activation-engine'
import type { CategoriaEvidencia, EstadoHipotese, ConfiancaEvidencia, TipoFeedbackAcao } from '@prisma/client'
import { NotFoundError } from '@/lib/app-errors'

const MAPA_IMPACTO: Record<TipoFeedbackAcao, { impacto: string; aprendizado: string; confianca: number }> = {
  AJUDOU:              { impacto: 'positivo',  aprendizado: 'Ação foi eficaz — conhecimento confirmado',     confianca: 0.9 },
  AJUDOU_PARCIALMENTE: { impacto: 'parcial',   aprendizado: 'Ação teve efeito parcial — hipótese ajustada', confianca: 0.6 },
  NAO_AJUDOU:          { impacto: 'negativo',  aprendizado: 'Ação não funcionou — hipótese enfraquecida',   confianca: 0.7 },
  NAO_EXECUTADA:       { impacto: 'inexistente', aprendizado: 'Ação não foi executada — motivo registrado', confianca: 0.5 },
}

// ─── Registrar feedback ──────────────────────────────────────────────

export async function registrarFeedback(
  empresaId: string,
  acaoId: string,
  tipo: TipoFeedbackAcao,
  comentario?: string,
  impactoPercebido?: Record<string, unknown>
) {
  const acao = await prisma.acaoCognitiva.findFirst({
    where: { id: acaoId, empresaId },
    select: { titulo: true, categoria: true, id: true },
  })
  if (!acao) throw new NotFoundError('Ação não encontrada')

  const feedback = await prisma.feedbackAcao.create({
    data: {
      empresaId,
      acaoId,
      tipo,
      comentario,
      impactoPercebido: impactoPercebido ?? undefined,
      dados: {
        tituloAcao: acao.titulo,
        categoria: acao.categoria,
      },
    },
  })

  // Gera evidência
  void registrarEvidencia(empresaId, {
    categoria: acao.categoria as CategoriaEvidencia,
    origem: 'SISTEMA',
    descricao: `Feedback recebido: "${acao.titulo}" — ${traduzirFeedback(tipo)}`,
    confianca: 'ALTA',
    dados: { feedbackId: feedback.id, acaoId, tipo, ...(comentario ? { comentario } : {}) },
  })

  // Atualiza memória cognitiva
  const { impacto, aprendizado } = MAPA_IMPACTO[tipo]
  void registrarNaMemoria(empresaId, {
    tipo: tipo === 'AJUDOU' ? 'confirmacao' : tipo === 'NAO_AJUDOU' ? 'mudanca' : 'evolucao',
    descricao: `${aprendizado}: ${acao.titulo}`,
    categoria: acao.categoria as CategoriaEvidencia,
    versao: 0,
    metadados: { feedbackId: feedback.id, acaoId, tipo, impacto },
  })

  // Registra eventos de ativação
  void registrarEventoAtivacao(empresaId, 'PRIMEIRO_FEEDBACK', { acaoId, tipo })
  if (tipo === 'AJUDOU' || tipo === 'AJUDOU_PARCIALMENTE') {
    void registrarEventoAtivacao(empresaId, 'PRIMEIRO_RETORNO', { acaoId, tipo })
  }

  // Fortalece ou enfraquece hipóteses relacionadas
  const hipoteses = await listarHipoteses(empresaId)
  const hipotesesRelacionadas = hipoteses.filter(
    (h) => h.categoria === acao.categoria && h.estado !== 'DESCARTADA'
  )

  for (const hip of hipotesesRelacionadas) {
    if (tipo === 'AJUDOU') {
      const novoEstado: EstadoHipotese = hip.estado === 'NOVA' ? 'FORTALECIDA'
        : hip.estado === 'FORTALECIDA' ? 'CONFIRMADA'
        : hip.estado
      if (novoEstado !== hip.estado) {
        void atualizarEstadoHipotese(hip.id, novoEstado, 'ALTA', empresaId)
      }
    } else if (tipo === 'NAO_AJUDOU') {
      const novoEstado: EstadoHipotese = hip.estado === 'CONFIRMADA' ? 'FORTALECIDA'
        : hip.estado === 'FORTALECIDA' ? 'EM_OBSERVACAO'
        : hip.estado === 'EM_OBSERVACAO' ? 'ENFRAQUECIDA'
        : hip.estado
      if (novoEstado !== hip.estado) {
        void atualizarEstadoHipotese(hip.id, novoEstado,
          novoEstado === 'ENFRAQUECIDA' ? ('BAIXA' as ConfiancaEvidencia) : ('MEDIA' as ConfiancaEvidencia),
          empresaId)
      }
    }
  }

  return feedback
}

function traduzirFeedback(tipo: TipoFeedbackAcao): string {
  const mapa: Record<TipoFeedbackAcao, string> = {
    AJUDOU: 'ajudou',
    AJUDOU_PARCIALMENTE: 'ajudou parcialmente',
    NAO_AJUDOU: 'não ajudou',
    NAO_EXECUTADA: 'não foi executada',
  }
  return mapa[tipo]
}

// ─── Analisar resultado de uma ação ──────────────────────────────────

export async function analisarResultadoAcao(acaoId: string, empresaId: string) {
  const feedbacks = await prisma.feedbackAcao.findMany({
    where: { acaoId, empresaId },
    orderBy: { criadoEm: 'desc' },
    include: {
      acao: { select: { titulo: true, categoria: true, descricao: true } },
    },
  })

  if (feedbacks.length === 0) return null

  const ultimo = feedbacks[0]
  const { impacto, aprendizado, confianca } = MAPA_IMPACTO[ultimo.tipo]

  // Busca hipótese mais relacionada na mesma categoria
  const hipoteses = await listarHipoteses(ultimo.empresaId)
  const hipoteseAfetada = hipoteses
    .filter((h) => h.categoria === ultimo.acao.categoria)
    .sort((a, b) => b.atualizadaEm.getTime() - a.atualizadaEm.getTime())[0]

  return {
    impactoReal: impacto,
    aprendizadoGerado: aprendizado,
    hipoteseAfetada: hipoteseAfetada
      ? { id: hipoteseAfetada.id, descricao: hipoteseAfetada.descricao, estado: hipoteseAfetada.estado }
      : null,
    confianca,
  }
}

// ─── Consultas ───────────────────────────────────────────────────────

export async function listarFeedbackRecente(empresaId: string, dias = 7) {
  const desde = new Date(Date.now() - dias * 24 * 60 * 60 * 1000)
  return prisma.feedbackAcao.findMany({
    where: { empresaId, criadoEm: { gte: desde } },
    orderBy: { criadoEm: 'desc' },
    take: 10,
    include: {
      acao: { select: { titulo: true, categoria: true, descricao: true } },
    },
  })
}

export async function feedbackPorAcao(acaoId: string, empresaId: string) {
  return prisma.feedbackAcao.findMany({
    where: { acaoId, empresaId },
    orderBy: { criadoEm: 'desc' },
  })
}

export async function acoesSemFeedback(empresaId: string) {
  const concluidas = await prisma.acaoCognitiva.findMany({
    where: {
      empresaId,
      status: 'CONCLUIDA',
    },
    select: { id: true, titulo: true, descricao: true, categoria: true },
    orderBy: { atualizadaEm: 'desc' },
    take: 5,
  })

  if (concluidas.length === 0) return []

  const acaoIds = concluidas.map((a) => a.id)
  const feedbacks = await prisma.feedbackAcao.findMany({
    where: { acaoId: { in: acaoIds } },
    select: { acaoId: true },
  })
  const idsComFeedback = new Set(feedbacks.map((f) => f.acaoId))

  return concluidas.filter((a) => !idsComFeedback.has(a.id))
}

// ─── Análise agregada ───────────────────────────────────────────────

export async function analisarAprendizados(empresaId: string) {
  const feedbacks = await listarFeedbackRecente(empresaId, 30)
  if (feedbacks.length === 0) return null

  const resultado: Record<string, { total: number; positivos: number; negativos: number; parciais: number }> = {}

  for (const fb of feedbacks) {
    const cat = fb.acao.categoria
    if (!resultado[cat]) resultado[cat] = { total: 0, positivos: 0, negativos: 0, parciais: 0 }
    resultado[cat].total++
    if (fb.tipo === 'AJUDOU') resultado[cat].positivos++
    else if (fb.tipo === 'NAO_AJUDOU') resultado[cat].negativos++
    else if (fb.tipo === 'AJUDOU_PARCIALMENTE') resultado[cat].parciais++
  }

  const aprendizados = Object.entries(resultado).map(([categoria, dados]) => {
    const aprendizado = dados.positivos > dados.negativos + dados.parciais
      ? 'positivo'
      : dados.negativos > dados.positivos
        ? 'negativo'
        : 'misto'
    return { categoria, ...dados, aprendizado }
  })

  return {
    total: feedbacks.length,
    categorias: aprendizados,
    ultimoFeedback: feedbacks[0],
  }
}
