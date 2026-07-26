import type { DecisaoContexto } from './cognitive-context-engine'
import type { TrustScore } from './trust-engine'

export interface ItemRelevancia {
  id: string
  tipo: string
  descricao: string
  data: Date
  trustScore: number
  relevancia: number
  prioridade: string
}

export interface FiltroRelevancia {
  diasMaximo?: number
  trustMinimo?: number
  relevanciaMinima?: number
  tipos?: string[]
}

const PESO_TEMPORAL = 0.3
const PESO_TRUST = 0.4
const PESO_CONTEXTO = 0.3

export function calcularRelevancia(
  item: {
    id: string
    tipo: string
    descricao: string
    data: Date
  },
  trustScore: TrustScore | null,
  contexto?: DecisaoContexto,
  filtro?: FiltroRelevancia
): number {
  const agora = new Date()
  const dias = Math.floor((agora.getTime() - item.data.getTime()) / (1000 * 60 * 60 * 24))

  if (filtro?.diasMaximo && dias > filtro.diasMaximo) return 0

  const scoreTemporal = Math.max(0, 1 - dias / 365)

  const trust = trustScore?.scoreAtual ?? 50
  if (filtro?.trustMinimo && trust < filtro.trustMinimo) return 0

  const scoreTrust = trust / 100

  let scoreContexto = 0.5
  if (contexto?.mudancasRecentes) {
    const match = contexto.mudancasRecentes.some(
      (m) => item.descricao.toLowerCase().includes(m.toLowerCase())
    )
    if (match) scoreContexto = 1.0
  }
  if (contexto?.setoresEstaveis) {
    const estavel = contexto.setoresEstaveis.some(
      (s) => item.descricao.toLowerCase().includes(s.toLowerCase())
    )
    if (estavel) scoreContexto = Math.max(scoreContexto - 0.3, 0)
  }

  const relevancia = scoreTemporal * PESO_TEMPORAL + scoreTrust * PESO_TRUST + scoreContexto * PESO_CONTEXTO

  return Math.round(relevancia * 100)
}

export function filtrarPorRelevancia(
  itens: ItemRelevancia[],
  trustScores: Map<string, TrustScore>,
  contexto?: DecisaoContexto,
  filtro?: FiltroRelevancia
): ItemRelevancia[] {
  return itens
    .map((item) => {
      const trust = trustScores.get(item.tipo) ?? null
      const relevancia = calcularRelevancia(item, trust, contexto, filtro)
      return { ...item, relevancia }
    })
    .filter((item) => {
      if (filtro?.relevanciaMinima && item.relevancia < filtro.relevanciaMinima) return false
      if (filtro?.tipos && !filtro.tipos.includes(item.tipo)) return false
      return true
    })
    .sort((a, b) => b.relevancia - a.relevancia)
}

export function agruparPorRelevancia(itens: ItemRelevancia[]): {
  alta: ItemRelevancia[]
  media: ItemRelevancia[]
  baixa: ItemRelevancia[]
} {
  return {
    alta: itens.filter((i) => i.relevancia >= 70),
    media: itens.filter((i) => i.relevancia >= 40 && i.relevancia < 70),
    baixa: itens.filter((i) => i.relevancia < 40),
  }
}
