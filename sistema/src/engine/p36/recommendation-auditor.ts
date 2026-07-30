// P36 ETAPA 8 — Auditoria de Valor
// Toda recomendação auditada automaticamente.
// A Ponte elimina recomendações que nunca geram impacto.

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function auditarRecomendacao(
  empresaId: string,
  recomendacaoId: string,
  resultado: 'ACAO_GERADA' | 'RESULTADO_OBTIDO' | 'APRENDIZADO_GERADO' | 'IGNORADA',
  detalhes?: { justificativa?: string; metadata?: Prisma.InputJsonValue },
) {
  await prisma.auditoriaRecomendacao.create({
    data: {
      empresaId,
      recomendacaoId,
      tipo: resultado,
      resultado: resultado === 'IGNORADA' ? 'NAO' : 'SIM',
      justificativa: detalhes?.justificativa ?? null,
      metadata: detalhes?.metadata ?? Prisma.DbNull,
    },
  })
}

export async function obterRecomendacoesIgnoradas(empresaId: string, limite: number = 10) {
  const ignoradas = await prisma.auditoriaRecomendacao.groupBy({
    by: ['recomendacaoId'],
    where: {
      empresaId,
      resultado: 'NAO',
      deletedAt: null,
    },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: limite,
  })

  return ignoradas.map(i => ({
    recomendacaoId: i.recomendacaoId,
    vezesIgnorada: i._count.id,
  }))
}

export async function calcularPrecisaoRecomendacoes(empresaId: string): Promise<{
  total: number
  aceitas: number
  ignoradas: number
  precisao: number
}> {
  const where = { empresaId, deletedAt: null }
  const [total, aceitas, ignoradas] = await Promise.all([
    prisma.auditoriaRecomendacao.count({ where }),
    prisma.auditoriaRecomendacao.count({ where: { ...where, resultado: 'SIM' } }),
    prisma.auditoriaRecomendacao.count({ where: { ...where, resultado: 'NAO' } }),
  ])

  return {
    total,
    aceitas,
    ignoradas,
    precisao: total > 0 ? Math.round((aceitas / total) * 100) : 0,
  }
}
