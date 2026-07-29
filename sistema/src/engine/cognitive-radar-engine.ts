import type { AdaptiveCapacity, Capacidade } from './adaptive-capacity-engine'
import type { MapaCalor } from './cognitive-heatmap-engine'
import type { CompanyMaturity } from './company-maturity-engine'

export interface CapacidadeRadar {
  nome: string
  score: number
  nivel: 'MUITO_FORTE' | 'FORTE' | 'EM_EVOLUCAO' | 'CRITICA'
  descricao: string
}

export interface RadarCapacidades {
  muitoForte: CapacidadeRadar[]
  forte: CapacidadeRadar[]
  emEvolucao: CapacidadeRadar[]
  critica: CapacidadeRadar[]
  areasQuentes: string[]
  sugestaoFoco: string
}

function classificar(score: number): CapacidadeRadar['nivel'] {
  if (score >= 80) return 'MUITO_FORTE'
  if (score >= 60) return 'FORTE'
  if (score >= 35) return 'EM_EVOLUCAO'
  return 'CRITICA'
}

const DESCRICOES: Record<string, string> = {
  Observar: 'Perceber sinais, mudancas, anomalias, riscos e oportunidades',
  Compreender: 'Transformar informacao em significado',
  Esclarecer: 'Reduzir complexidade e mostrar o essencial',
  Priorizar: 'Identificar o que realmente importa agora',
  Decidir: 'Escolher melhor com menor risco e maior confianca',
  Executar: 'Transformar decisoes em acoes com menos atrito',
  Aprender: 'Registrar resultados, validar hipoteses, gerar conhecimento',
  Evoluir: 'Transformar conhecimento em nova capacidade',
}

export function gerarRadarCapacidades(
  capacidade: AdaptiveCapacity,
  mapaCalor: MapaCalor,
  maturity: CompanyMaturity,
): RadarCapacidades {
  const muitoForte: CapacidadeRadar[] = []
  const forte: CapacidadeRadar[] = []
  const emEvolucao: CapacidadeRadar[] = []
  const critica: CapacidadeRadar[] = []

  for (const cap of capacidade.capacidades) {
    const radar: CapacidadeRadar = {
      nome: cap.nome,
      score: cap.score,
      nivel: classificar(cap.score),
      descricao: DESCRICOES[cap.nome] ?? cap.descricao,
    }
    if (radar.nivel === 'MUITO_FORTE') muitoForte.push(radar)
    else if (radar.nivel === 'FORTE') forte.push(radar)
    else if (radar.nivel === 'EM_EVOLUCAO') emEvolucao.push(radar)
    else critica.push(radar)
  }

  if (maturity.maiorEvolucao) {
    forte.push({
      nome: maturity.maiorEvolucao.area,
      score: Math.min(80, maturity.score + 10),
      nivel: 'FORTE',
      descricao: maturity.maiorEvolucao.descricao,
    })
  }

  if (maturity.maiorRisco) {
    critica.push({
      nome: maturity.maiorRisco.area,
      score: Math.max(20, maturity.score - 20),
      nivel: 'CRITICA',
      descricao: maturity.maiorRisco.descricao,
    })
  }

  const areasQuentes = mapaCalor.areas
    .filter(a => a.intensidade >= 60)
    .map(a => a.area)

  const sugestaoFoco = critica.length > 0
    ? `Focar em ${critica[0].nome}: ${critica[0].descricao}`
    : emEvolucao.length > 0
      ? `Desenvolver ${emEvolucao[0].nome}: ${emEvolucao[0].descricao}`
      : `Consolidar ${muitoForte[0]?.nome ?? 'capacidades existentes'}`

  return { muitoForte, forte, emEvolucao, critica, areasQuentes, sugestaoFoco }
}
