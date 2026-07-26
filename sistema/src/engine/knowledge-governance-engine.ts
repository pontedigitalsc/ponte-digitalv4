import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { consultarEvidencias, contagemPorCategoria } from './evidence-engine'
import { listarHipoteses, registrarNaMemoria, atualizarEstadoHipotese } from './cognitive-memory-engine'
import { principaisOutcomes } from './outcome-intelligence-engine'
import type { CategoriaEvidencia, EstadoHipotese, ConfiancaEvidencia } from '@prisma/client'

export interface AuditoriaConhecimento {
  conhecimentosPromovidos: number
  conhecimentosEnfraquecidos: number
  conhecimentosDescartados: number
  totalConhecimentos: number
  auditoriasRecentes: string[]
  scoreMedio: number
}

// ─── Validar hipóteses — quais podem virar conhecimento ──────────────

export async function validarHipoteses(empresaId: string) {
  const hipoteses = await listarHipoteses(empresaId)
  const evidencias30d = await consultarEvidencias(empresaId, {
    desde: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    limite: 200,
  })
  const contagem = await contagemPorCategoria(empresaId, 30)
  const outcomes = await principaisOutcomes(empresaId, 20)

  const resultado: Array<{
    hipoteseId: string
    descricao: string
    categoria: string
    estado: string
    scoreConfianca: number
    qtdeEvidencias: number
    qtdeConfirmacoes: number
    qtdeRefutacoes: number
    podePromover: boolean
    motivo: string
  }> = []

  for (const hip of hipoteses) {
    if (hip.estado === 'DESCARTADA') continue

    const evCategoria = evidencias30d.filter((e) => e.categoria === hip.categoria)
    const qtdeEvidencias = evCategoria.length
    const totalCategoria = contagem[hip.categoria] ?? 0
    const outcomesConfirmam = outcomes.filter(
      (o) => o.categoria === hip.categoria && o.confianca === 'ALTA'
    ).length

    const score = calcularScore(qtdeEvidencias, totalCategoria, outcomesConfirmam, hip.estado)
    const podePromover = score >= 60 && qtdeEvidencias >= 3

    const motivo = podePromover
      ? `Score ${score}% — ${qtdeEvidencias} evidências, ${outcomesConfirmam} outcomes confirmam`
      : `Score ${score}% — precisa de mais evidências ou confirmações`

    resultado.push({
      hipoteseId: hip.id,
      descricao: hip.descricao,
      categoria: hip.categoria,
      estado: hip.estado,
      scoreConfianca: score,
      qtdeEvidencias,
      qtdeConfirmacoes: outcomesConfirmam,
      qtdeRefutacoes: 0,
      podePromover,
      motivo,
    })
  }

  return resultado.sort((a, b) => b.scoreConfianca - a.scoreConfianca)
}

// ─── Promover conhecimento ──────────────────────────────────────────

export async function promoverConhecimento(
  empresaId: string,
  hipoteseId: string,
  score: number
) {
  const hipotese = await prisma.hipotese.findFirst({ where: { id: hipoteseId, empresaId } })
  if (!hipotese) return null

  const evidencias = await consultarEvidencias(empresaId, {
    categorias: [hipotese.categoria],
    limite: 50,
  })

  const jaExiste = await prisma.conhecimentoValidado.findFirst({
    where: { empresaId, hipoteseId },
  })
  if (jaExiste) return jaExiste

  const conhecimento = await prisma.conhecimentoValidado.create({
    data: {
      empresaId,
      hipoteseId,
      descricao: hipotese.descricao,
      categoria: hipotese.categoria as CategoriaEvidencia,
      scoreConfianca: score,
      quantidadeEvidencias: evidencias.length,
      quantidadeConfirmacoes: 1,
      quantidadeRefutacoes: 0,
      ultimaValidacao: new Date(),
      origem: 'validacao_hipotese',
      dados: { estadoAnterior: hipotese.estado, confiancaAnterior: hipotese.confianca },
    },
  })

  // Atualiza estado da hipótese
  void atualizarEstadoHipotese(hipoteseId, 'CONFIRMADA', 'ALTA', empresaId)

  void registrarNaMemoria(empresaId, {
    tipo: 'confirmacao',
    descricao: `Conhecimento promovido: ${hipotese.descricao} (score ${score}%)`,
    categoria: hipotese.categoria as CategoriaEvidencia,
    versao: 0,
    metadados: { conhecimentoId: conhecimento.id, score },
  })

  return conhecimento
}

// ─── Enfraquecer conhecimento ───────────────────────────────────────

export async function enfraquecerConhecimento(
  conhecimentoId: string,
  empresaId: string,
  motivo: string
) {
  const conhecimento = await prisma.conhecimentoValidado.findFirst({
    where: { id: conhecimentoId, empresaId },
  })
  if (!conhecimento) return null

  const novoScore = Math.max(0, conhecimento.scoreConfianca - 20)

  const atualizado = await prisma.conhecimentoValidado.update({
    where: { id: conhecimentoId, empresaId },
    data: {
      scoreConfianca: novoScore,
      quantidadeRefutacoes: { increment: 1 },
      ultimaValidacao: new Date(),
    },
  })

  void registrarNaMemoria(empresaId, {
    tipo: 'mudanca',
    descricao: `Conhecimento enfraquecido: ${conhecimento.descricao} — ${motivo}`,
    categoria: conhecimento.categoria as CategoriaEvidencia,
    versao: 0,
    metadados: { conhecimentoId, scoreAnterior: conhecimento.scoreConfianca, novoScore },
  })

  return atualizado
}

// ─── Descartar conhecimento ─────────────────────────────────────────

export async function descartarConhecimento(
  conhecimentoId: string,
  empresaId: string,
  motivo: string
) {
  const conhecimento = await prisma.conhecimentoValidado.findFirst({
    where: { id: conhecimentoId, empresaId },
  })
  if (!conhecimento) return null

  await prisma.conhecimentoValidado.delete({ where: { id: conhecimentoId, empresaId } })

  // Se vinculado a uma hipótese, descarta também
  if (conhecimento.hipoteseId) {
    void atualizarEstadoHipotese(
      conhecimento.hipoteseId,
      'DESCARTADA' as EstadoHipotese,
      'BAIXA' as ConfiancaEvidencia,
      empresaId
    )
  }

  void registrarNaMemoria(empresaId, {
    tipo: 'descarte',
    descricao: `Conhecimento descartado: ${conhecimento.descricao} — ${motivo}`,
    categoria: conhecimento.categoria as CategoriaEvidencia,
    versao: 0,
    metadados: { conhecimentoId, motivo },
  })

  return { descartado: true, descricao: conhecimento.descricao }
}

// ─── Calcular confiança ────────────────────────────────────────────

export async function calcularConfiancaConhecimento(conhecimentoId: string, empresaId: string) {
  const conhecimento = await prisma.conhecimentoValidado.findFirst({
    where: { id: conhecimentoId, empresaId },
  })
  if (!conhecimento) return null

  const evidenciasRecentes = await consultarEvidencias(conhecimento.empresaId, {
    categorias: [conhecimento.categoria as CategoriaEvidencia],
    desde: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    limite: 100,
  })

  const evidenciasNovas = evidenciasRecentes.length
  const scoreBase = conhecimento.scoreConfianca
  const bonusEvidenciasRecentes = Math.min(evidenciasNovas * 2, 20)

  const refutacaoPenalidade = conhecimento.quantidadeRefutacoes * 10
  const scoreFinal = Math.max(0, Math.min(100, scoreBase + bonusEvidenciasRecentes - refutacaoPenalidade))

  return {
    id: conhecimento.id,
    descricao: conhecimento.descricao,
    scoreBase,
    bonusEvidenciasRecentes,
    refutacaoPenalidade,
    scoreFinal,
    totalEvidencias: conhecimento.quantidadeEvidencias,
    confirmacoes: conhecimento.quantidadeConfirmacoes,
    refutacoes: conhecimento.quantidadeRefutacoes,
    ultimaValidacao: conhecimento.ultimaValidacao,
  }
}

// ─── Auditar todo o conhecimento ───────────────────────────────────

export async function auditarConhecimento(empresaId: string): Promise<AuditoriaConhecimento> {
  const conhecimentos = await prisma.conhecimentoValidado.findMany({
    where: { empresaId },
    orderBy: { criadoEm: 'desc' },
  })

  const auditoriasRecentes: string[] = []

  // Verifica cada conhecimento para possíveis ações
  for (const c of conhecimentos) {
    const scoreAtual = (await calcularConfiancaConhecimento(c.id, empresaId))?.scoreFinal ?? c.scoreConfianca

    if (scoreAtual < 20) {
      auditoriasRecentes.push(`⚠ ${c.descricao.slice(0, 60)} — score crítico (${scoreAtual}%)`)
    } else if (scoreAtual >= 80 && c.scoreConfianca < 80) {
      auditoriasRecentes.push(`↑ ${c.descricao.slice(0, 60)} — confiança consolidada (${scoreAtual}%)`)
    }

    if (c.quantidadeRefutacoes >= 3 && scoreAtual < 30) {
      auditoriasRecentes.push(`🗑 ${c.descricao.slice(0, 60)} — candidato a descarte`)
    }
  }

  const scoreTotal = conhecimentos.reduce((acc, c) => acc + c.scoreConfianca, 0)
  const scoreMedio = conhecimentos.length > 0 ? Math.round(scoreTotal / conhecimentos.length) : 0

  const promovidos = conhecimentos.filter((c) => c.scoreConfianca >= 60).length
  const enfraquecidos = conhecimentos.filter((c) => c.scoreConfianca >= 20 && c.scoreConfianca < 40).length

  return {
    conhecimentosPromovidos: promovidos,
    conhecimentosEnfraquecidos: enfraquecidos,
    conhecimentosDescartados: 0,
    totalConhecimentos: conhecimentos.length,
    auditoriasRecentes: auditoriasRecentes.slice(0, 5),
    scoreMedio,
  }
}

// ─── Consumir conhecimentos aprovados (para Identity Engine) ─────────

export async function obterConhecimentosAprovados(empresaId: string) {
  return prisma.conhecimentoValidado.findMany({
    where: {
      empresaId,
      scoreConfianca: { gte: 50 },
    },
    orderBy: { criadoEm: 'desc' },
    select: {
      id: true,
      descricao: true,
      categoria: true,
      scoreConfianca: true,
      ultimaValidacao: true,
    },
  })
}

// ─── Helpers ────────────────────────────────────────────────────────

function calcularScore(
  qtdeEvidencias: number,
  totalCategoria: number,
  outcomesConfirmam: number,
  estadoHipotese: string
): number {
  let score = 0

  // Evidências recentes (máx 40 pts)
  score += Math.min(qtdeEvidencias * 8, 40)

  // Volume total na categoria (máx 20 pts)
  score += Math.min(totalCategoria * 2, 20)

  // Outcomes confirmam (máx 25 pts)
  score += Math.min(outcomesConfirmam * 12, 25)

  // Estado da hipótese (máx 15 pts)
  const bonusEstado: Record<string, number> = {
    CONFIRMADA: 15,
    FORTALECIDA: 10,
    EM_OBSERVACAO: 5,
    NOVA: 2,
  }
  score += bonusEstado[estadoHipotese] ?? 0

  return Math.min(score, 100)
}
