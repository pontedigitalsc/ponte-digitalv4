import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { consultarEvidencias } from './evidence-engine'
import type { CategoriaEvidencia, EstadoHipotese } from '@prisma/client'
import { NotFoundError } from '@/lib/app-errors'

// ─── Hipóteses ──────────────────────────────────────────────────────────

export async function criarHipotese(
  empresaId: string,
  descricao: string,
  categoria: CategoriaEvidencia,
  evidenciaOrigem?: string
) {
  return prisma.hipotese.create({
    data: { empresaId, descricao, categoria, evidenciaOrigem },
  })
}

export async function atualizarEstadoHipotese(
  id: string,
  estado: EstadoHipotese,
  confianca: 'ALTA' | 'MEDIA' | 'BAIXA' | undefined,
  empresaId: string
) {
  const hipotese = await prisma.hipotese.findFirst({ where: { id, empresaId } })
  if (!hipotese) throw new NotFoundError('Hipótese não encontrada')

  return prisma.hipotese.update({
    where: { id },
    data: { estado, ...(confianca ? { confianca } : {}) },
  })
}

export async function listarHipoteses(empresaId: string, ativas?: boolean) {
  return prisma.hipotese.findMany({
    where: {
      empresaId,
      ...(ativas ? { estado: { in: ['NOVA', 'EM_OBSERVACAO', 'FORTALECIDA'] } } : {}),
    },
    orderBy: { atualizadaEm: 'desc' },
  })
}

// ─── Memória Cognitiva ─────────────────────────────────────────────────

interface EntradaMemoria {
  tipo: 'descoberta' | 'mudanca' | 'confirmacao' | 'descarte' | 'evolucao'
  descricao: string
  categoria: CategoriaEvidencia
  versao: number
  metadados?: Record<string, unknown>
}

export async function registrarNaMemoria(
  empresaId: string,
  entrada: EntradaMemoria
) {
  return prisma.memoriaCognitiva.create({
    data: {
      empresaId,
      tipo: entrada.tipo,
      descricao: entrada.descricao,
      categoria: entrada.categoria,
      versao: entrada.versao,
      metadados: entrada.metadados ?? undefined,
    },
  })
}

export async function consultarMemoria(
  empresaId: string,
  limite = 20
) {
  return prisma.memoriaCognitiva.findMany({
    where: { empresaId },
    orderBy: { criadaEm: 'desc' },
    take: limite,
  })
}

export async function ultimasMudancas(empresaId: string, dias = 30) {
  const desde = new Date(Date.now() - dias * 24 * 60 * 60 * 1000)
  return prisma.memoriaCognitiva.findMany({
    where: {
      empresaId,
      criadaEm: { gte: desde },
      tipo: { in: ['descoberta', 'mudanca', 'confirmacao', 'descarte'] },
    },
    orderBy: { criadaEm: 'desc' },
    take: 10,
  })
}

// ─── Motor Analítico — compara evidências com conhecimento atual ──────

export interface AnaliseEvolucao {
  novasHipoteses: string[]
  hipotesesFortalecidas: string[]
  hipotesesEnfraquecidas: string[]
  hipotesesDescartadas: string[]
  conhecimentosConfirmados: string[]
  mudancasPercebidas: string[]
  scoreEvolucao: number
}

export async function analisarEvolucao(
  empresaId: string,
  identidade: { conhecimentos?: unknown; crencas?: unknown } | null
): Promise<AnaliseEvolucao> {
  const evidenciasRecentes = await consultarEvidencias(empresaId, {
    desde: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    limite: 100,
  })

  const hipoteses = await listarHipoteses(empresaId, true)

  const novasHipoteses: string[] = []
  const hipotesesFortalecidas: string[] = []
  const hipotesesEnfraquecidas: string[] = []
  const hipotesesDescartadas: string[] = []
  const conhecimentosConfirmados: string[] = []
  const mudancasPercebidas: string[] = []

  // Verifica hipóteses que receberam novas evidências
  for (const hip of hipoteses) {
    const evidenciasRelacionadas = evidenciasRecentes.filter(
      (e) => e.categoria === hip.categoria
    )

    if (evidenciasRelacionadas.length >= 3 && hip.estado === 'NOVA') {
      hipotesesFortalecidas.push(hip.descricao)
    }

    if (evidenciasRelacionadas.length === 0 && hip.estado === 'EM_OBSERVACAO') {
      hipotesesEnfraquecidas.push(hip.descricao)
    }
  }

  // Detecta novas hipóteses a partir de evidências recentes
  const categoriasRecentes = new Set(evidenciasRecentes.map((e) => e.categoria))
  for (const cat of categoriasRecentes) {
    const jaTemHipotese = hipoteses.some((h) => h.categoria === cat)
    if (!jaTemHipotese && evidenciasRecentes.filter((e) => e.categoria === cat).length >= 3) {
      novasHipoteses.push(`Nova concentração de atividade em ${cat.toLowerCase()}`)
    }
  }

  // Verifica conhecimentos confirmados
  const conhecimentos = identidade?.conhecimentos as { descricao: string }[] | null | undefined
  if (conhecimentos) {
    for (const c of conhecimentos) {
      const recentes = evidenciasRecentes.filter(
        (e) => c.descricao.toLowerCase().includes(e.categoria.toLowerCase())
      )
      if (recentes.length > 0) {
        conhecimentosConfirmados.push(c.descricao)
      }
    }
  }

  // Mudanças perceptíveis
  if (evidenciasRecentes.length > 0) {
    const categorias = [...new Set(evidenciasRecentes.map((e) => e.categoria))]
    for (const cat of categorias) {
      mudancasPercebidas.push(`Atividade detectada em ${cat.toLowerCase()}`)
    }
  }

  const scoreEvolucao = Math.min(
    (novasHipoteses.length * 2 +
      hipotesesFortalecidas.length * 1.5 +
      conhecimentosConfirmados.length * 1 +
      mudancasPercebidas.length * 0.5) / 10,
    1
  )

  return {
    novasHipoteses,
    hipotesesFortalecidas,
    hipotesesEnfraquecidas,
    hipotesesDescartadas,
    conhecimentosConfirmados,
    mudancasPercebidas,
    scoreEvolucao,
  }
}
