import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { CategoriaEvidencia, OrigemEvidencia, ConfiancaEvidencia, Prisma } from '@prisma/client'

export interface DadosEvidencia {
  categoria: CategoriaEvidencia
  origem: OrigemEvidencia
  descricao: string
  confianca?: ConfiancaEvidencia
  dados?: Record<string, unknown> | null
}

export interface FiltroEvidencias {
  categorias?: CategoriaEvidencia[]
  origens?: OrigemEvidencia[]
  desde?: Date
  ate?: Date
  limite?: number
}

export async function registrarEvidencia(
  empresaId: string,
  dados: DadosEvidencia
) {
  return prisma.evidencia.create({
    data: {
      empresaId,
      categoria: dados.categoria,
      origem: dados.origem,
      descricao: dados.descricao,
      confianca: dados.confianca ?? 'MEDIA',
      dados: dados.dados ?? undefined,
    },
  })
}

export async function consultarEvidencias(
  empresaId: string,
  filtro?: FiltroEvidencias
) {
  const where: Prisma.EvidenciaWhereInput = { empresaId }

  if (filtro?.categorias?.length) {
    where.categoria = { in: filtro.categorias }
  }
  if (filtro?.origens?.length) {
    where.origem = { in: filtro.origens }
  }
  if (filtro?.desde || filtro?.ate) {
    where.criadaEm = {}
    if (filtro.desde) where.criadaEm.gte = filtro.desde
    if (filtro.ate) where.criadaEm.lte = filtro.ate
  }

  return prisma.evidencia.findMany({
    where,
    orderBy: { criadaEm: 'desc' },
    take: filtro?.limite ?? 50,
  })
}

export async function contagemPorCategoria(
  empresaId: string,
  dias?: number
) {
  const desde = dias
    ? new Date(Date.now() - dias * 24 * 60 * 60 * 1000)
    : undefined

  const where: Prisma.EvidenciaWhereInput = { empresaId }
  if (desde) where.criadaEm = { gte: desde }

  const evidencias = await prisma.evidencia.findMany({ where })

  const contagem: Record<string, number> = {}
  for (const e of evidencias) {
    contagem[e.categoria] = (contagem[e.categoria] ?? 0) + 1
  }

  return contagem
}

export type { CategoriaEvidencia, OrigemEvidencia, ConfiancaEvidencia }
