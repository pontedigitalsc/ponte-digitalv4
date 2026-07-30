// P36 ETAPA 5 — Radar de Fricção
// Toda dificuldade registrada automaticamente.
// Invisível. Ajuda a Ponte a aprender onde ainda atrapalha.

import { prisma } from '@/lib/prisma'

export type TipoFriccao =
  | 'DESISTENCIA'
  | 'MULTIPLOS_CLIQUES'
  | 'DEMORA'
  | 'ABANDONO'
  | 'PEDIU_AJUDA'

export async function registrarFriccao(
  empresaId: string,
  tipo: TipoFriccao,
  contexto: string,
  detalhes?: {
    duracaoSegundos?: number
    cliquesExtras?: number
    pagina?: string
    elemento?: string
  },
) {
  await prisma.friccao.create({
    data: {
      empresaId,
      tipo,
      contexto,
      duracaoSegundos: detalhes?.duracaoSegundos ?? null,
      cliquesExtras: detalhes?.cliquesExtras ?? null,
      pagina: detalhes?.pagina ?? null,
      elemento: detalhes?.elemento ?? null,
    },
  })
}

export async function obterFricoesRecentes(empresaId: string, dias: number = 7) {
  const desde = new Date(Date.now() - dias * 86400000)
  return prisma.friccao.findMany({
    where: {
      empresaId,
      criadoEm: { gte: desde },
      deletedAt: null,
    },
    orderBy: { criadoEm: 'desc' },
  })
}

export async function obterFricoesAgrupadas(empresaId?: string) {
  const where = empresaId ? { empresaId, deletedAt: null } : { deletedAt: null }
  const fricoes = await prisma.friccao.findMany({ where })

  const agrupadas: Record<string, { total: number; tipos: Record<string, number> }> = {}
  for (const f of fricoes) {
    if (!agrupadas[f.contexto]) agrupadas[f.contexto] = { total: 0, tipos: {} }
    agrupadas[f.contexto].total++
    agrupadas[f.contexto].tipos[f.tipo] = (agrupadas[f.contexto].tipos[f.tipo] ?? 0) + 1
  }

  return Object.entries(agrupadas)
    .map(([contexto, dados]) => ({ contexto, ...dados }))
    .sort((a, b) => b.total - a.total)
}
