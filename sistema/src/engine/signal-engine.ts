import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { Sinal, DominioSinal, UrgenciaSinal } from './tipos'
import { ordenarPorUrgencia } from './tipos'
import { contagemPorCategoria } from './evidence-engine'

export interface FiltroSinal {
  dominio?: DominioSinal[]
  urgenciaMinima?: UrgenciaSinal
  fontes?: string[]
}

export interface DistribuicaoDominio {
  dominio: DominioSinal
  total: number
  alta: number
  media: number
  baixa: number
}

export interface SinalHistorico {
  id: string
  empresaId: string
  motorOrigem: string
  sinalId: string
  dominio: string
  urgencia: string
  titulo: string
  descricao: string | null
  criadoEm: Date
}

export interface FiltroHistorico {
  dominio?: string
  motorOrigem?: string
  dataInicio?: string
  dataFim?: string
  limite?: number
}

const PESOS_URGENCIA: Record<UrgenciaSinal, number> = { baixa: 1, media: 2, alta: 3 }

// ─── Pure functions ────────────────────────────────────────────────

export function filtrarSinais(sinais: Sinal[], filtro?: FiltroSinal): Sinal[] {
  if (!filtro) return sinais
  return sinais.filter((s) => {
    if (filtro.dominio && !filtro.dominio.includes(s.dominio)) return false
    if (filtro.urgenciaMinima && PESOS_URGENCIA[s.urgencia] < PESOS_URGENCIA[filtro.urgenciaMinima]) return false
    if (filtro.fontes && !filtro.fontes.includes(s.dominio)) return false
    return true
  })
}

export function distribuirPorDominio(sinais: Sinal[]): DistribuicaoDominio[] {
  const mapa = new Map<DominioSinal, { total: number; alta: number; media: number; baixa: number }>()

  for (const s of sinais) {
    const entry = mapa.get(s.dominio) ?? { total: 0, alta: 0, media: 0, baixa: 0 }
    entry.total++
    if (s.urgencia === 'alta') entry.alta++
    else if (s.urgencia === 'media') entry.media++
    else entry.baixa++
    mapa.set(s.dominio, entry)
  }

  return Array.from(mapa.entries()).map(([dominio, v]) => ({ dominio, ...v }))
}

export function ponderarSinais(
  sinais: Sinal[],
  pesosDominio?: Partial<Record<DominioSinal, number>>
): Sinal[] {
  const pesos = { clientes: 1, tarefas: 1, financeiro: 1.5, ...pesosDominio }
  return [...sinais].sort((a, b) => {
    const pesoA = PESOS_URGENCIA[a.urgencia] * (pesos[a.dominio] ?? 1)
    const pesoB = PESOS_URGENCIA[b.urgencia] * (pesos[b.dominio] ?? 1)
    return pesoB - pesoA
  })
}

// ─── DB access ─────────────────────────────────────────────────────

export async function consultarHistoricoSinais(
  empresaId: string,
  filtro?: FiltroHistorico
): Promise<SinalHistorico[]> {
  const where: Record<string, unknown> = { empresaId }
  if (filtro?.dominio) where.dominio = filtro.dominio
  if (filtro?.motorOrigem) where.motorOrigem = filtro.motorOrigem
  if (filtro?.dataInicio || filtro?.dataFim) {
    const criadoEm: Record<string, Date> = {}
    if (filtro.dataInicio) criadoEm.gte = new Date(filtro.dataInicio)
    if (filtro.dataFim) criadoEm.lte = new Date(filtro.dataFim)
    where.criadoEm = criadoEm
  }

  return prisma.historicoSinal.findMany({
    where: where as never,
    orderBy: { criadoEm: 'desc' },
    take: filtro?.limite ?? 50,
  }) as unknown as SinalHistorico[]
}

export async function expandirComEvidencias(
  empresaId: string,
  sinais: Sinal[]
): Promise<{ sinais: Sinal[]; evidencias: { categoria: string; total: number }[] }> {
  const contagem = await contagemPorCategoria(empresaId)
  const sinaisExpandidos = [...sinais]

  const categoriasComSinal = new Set(sinais.map((s) => s.dominio))

  for (const [categoria, total] of Object.entries(contagem)) {
    if (!categoriasComSinal.has(categoria.toLowerCase() as DominioSinal) && total > 0) {
      sinaisExpandidos.push({
        id: `evidencia-${categoria}`,
        dominio: categoria.toLowerCase() as DominioSinal,
        urgencia: 'media',
        titulo: `${total} evidências em ${categoria}`,
        descricao: `Categoria com dados não capturados como sinal`,
        origemDados: 'evidence-engine',
        acaoSugerida: { label: 'Revisar evidências', href: `/admin/${empresaId}/evidencias` },
      })
    }
  }

  const evidenciasArray = Object.entries(contagem).map(([categoria, total]) => ({ categoria, total }))

  return { sinais: ordenarPorUrgencia(sinaisExpandidos), evidencias: evidenciasArray }
}
