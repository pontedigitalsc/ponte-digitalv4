import { prisma } from '@/lib/prisma'

// ─────────────────────────────────────────────────────────────────────────────
// OPERAÇÃO FOUNDER — P63
//
// O painel do founder mede TRANSFORMAÇÃO, não quantidade de funcionalidades.
// Todas as métricas são agregadas em nível de plataforma (nunca linhas de uma
// empresa específica). Usa o client `prisma` cru porque é um painel exclusivo
// do founder (ADMIN) com contagens agregadas.
// ─────────────────────────────────────────────────────────────────────────────

export interface MetricasTransformacao {
  sessoesIniciadas: number
  sessoesConcluidas: number
  clarezasRegistradas: number
  clarezasPorCategoria: { categoria: string; total: number }[]
  empresasComRetorno: number
  primeirasDecisoes: number
  primeirasEvolucoes: number
  apoiadores: number
  founders: number
  recomendacoes: number
}

export async function obterMetricasTransformacao(): Promise<MetricasTransformacao> {
  const [
    sessoesIniciadas,
    sessoesConcluidas,
    clarezasRegistradas,
    clarezas,
    empresasComRetorno,
    primeirasDecisoes,
    primeirasEvolucoes,
    apoiadores,
    founders,
    recomendacoes,
  ] = await Promise.all([
    prisma.conversa.count({ where: { deletedAt: null } }),
    prisma.conversa.count({ where: { deletedAt: null, concluida: true } }),
    prisma.sinalValor.count({ where: { tipo: 'CLAREZA_GERADA', deletedAt: null } }),
    prisma.sinalValor.findMany({
      where: { tipo: 'CLAREZA_GERADA', deletedAt: null },
      select: { metadata: true },
    }),
    prisma.conversa.groupBy({
      by: ['empresaId'],
      where: { deletedAt: null, empresaId: { not: null } },
      _count: { _all: true },
    }).then((g) => g.filter((x) => x._count._all >= 2).length),
    prisma.acaoCognitiva.count({ where: { deletedAt: null, origem: 'USUARIO' } }),
    prisma.$queryRaw`SELECT COUNT(*)::int AS total FROM (
      SELECT empresaId FROM aprendizados WHERE deletedAt IS NULL
      UNION SELECT empresaId FROM outcomes WHERE deletedAt IS NULL
    ) t`.then((r) => (Array.isArray(r) && r[0] ? Number((r[0] as { total: number }).total) : 0)),
    prisma.empresa.count({ where: { deletedAt: null, numeroApoiador: { not: null } } }),
    prisma.empresa.count({ where: { deletedAt: null, numeroFundador: { not: null } } }),
    prisma.conhecimentoColetivo.count({ where: { deletedAt: null } }),
  ])

  const contagem = new Map<string, number>()
  for (const c of clarezas) {
    const meta = c.metadata as { categoria?: string } | null
    const cat = meta?.categoria ?? 'SEM_CATEGORIA'
    contagem.set(cat, (contagem.get(cat) ?? 0) + 1)
  }
  const clarezasPorCategoria = [...contagem.entries()]
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => b.total - a.total)

  return {
    sessoesIniciadas,
    sessoesConcluidas,
    clarezasRegistradas,
    clarezasPorCategoria,
    empresasComRetorno,
    primeirasDecisoes,
    primeirasEvolucoes,
    apoiadores,
    founders,
    recomendacoes,
  }
}
