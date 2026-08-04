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
  taxaConclusaoSessao: number
  clarezasRegistradas: number
  clarezasPorCategoria: { categoria: string; total: number }[]
  empresasComRetorno: number
  retornosRegistrados: number
  primeirasDecisoes: number
  primeirasEvolucoes: number
  apoiadores: number
  founders: number
  taxaConversaoApoiadorParaFundador: number
  recomendacoes: number
}

const JANELA_RETORNO_DIAS = 7

export async function obterMetricasTransformacao(): Promise<MetricasTransformacao> {
  const [
    sessoesIniciadas,
    sessoesConcluidas,
    clarezasRegistradas,
    retornosRegistrados,
    clarezas,
    conversas,
    primeirasDecisoes,
    primeirasEvolucoes,
    apoiadores,
    founders,
    recomendacoes,
  ] = await Promise.all([
    prisma.conversa.count({ where: { deletedAt: null } }),
    prisma.conversa.count({ where: { deletedAt: null, concluida: true } }),
    prisma.sinalValor.count({ where: { tipo: 'CLAREZA_GERADA', deletedAt: null } }),
    prisma.sinalValor.count({ where: { tipo: 'RETORNO_7_DIAS', deletedAt: null } }),
    prisma.sinalValor.findMany({
      where: { tipo: 'CLAREZA_GERADA', deletedAt: null },
      select: { metadata: true },
    }),
    prisma.conversa.findMany({
      where: { deletedAt: null, empresaId: { not: null } },
      select: { empresaId: true, criadaEm: true },
      orderBy: { criadaEm: 'asc' },
    }),
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

  // Retorno real: a segunda sessão da empresa começou dentro de 7 dias
  // da primeira. Não é proxy de "2 conversas em qualquer período".
  const primeiraPorEmpresa = new Map<string, Date>()
  const empresasQueRetornaram = new Set<string>()
  for (const c of conversas) {
    if (!c.empresaId) continue
    const primeira = primeiraPorEmpresa.get(c.empresaId)
    if (!primeira) {
      primeiraPorEmpresa.set(c.empresaId, c.criadaEm)
      continue
    }
    const janela = JANELA_RETORNO_DIAS * 24 * 60 * 60 * 1000
    if (c.criadaEm.getTime() - primeira.getTime() <= janela) {
      empresasQueRetornaram.add(c.empresaId)
    }
  }

  const taxaConclusaoSessao = sessoesIniciadas > 0 ? Math.round((sessoesConcluidas / sessoesIniciadas) * 100) : 0
  const taxaConversaoApoiadorParaFundador = apoiadores > 0 ? Math.round((founders / apoiadores) * 100) : 0

  return {
    sessoesIniciadas,
    sessoesConcluidas,
    taxaConclusaoSessao,
    clarezasRegistradas,
    clarezasPorCategoria,
    empresasComRetorno: empresasQueRetornaram.size,
    retornosRegistrados,
    primeirasDecisoes,
    primeirasEvolucoes,
    apoiadores,
    founders,
    taxaConversaoApoiadorParaFundador,
    recomendacoes,
  }
}
