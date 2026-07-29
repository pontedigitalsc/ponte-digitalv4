import type { AdaptiveCapacity } from './adaptive-capacity-engine'
import type { RadarCapacidades } from './cognitive-radar-engine'
import type { CapitalCognitivo } from './cognitive-capital-engine'
import type { CognitiveEvolution } from './cognitive-evolution-engine'
import type { CognitiveMilestone } from './cognitive-milestone-engine'
import type { CurvaEvolutiva } from './cognitive-curve-engine'
import type { CompanyMaturity } from './company-maturity-engine'
export interface FundadorVisaoDiaria {
  evolucaoEmpresa: string
  patrimonioCresceu: string
  capacidadeEstagnada: string
  conhecimentoNovo: string
  rfcsCriadas: number
  hipotesesQueMorreram: number
  scoreCapacidadeAdaptativa: number
  scoreCapitalCognitivo: number
  tendencia: 'SUBINDO' | 'ESTAVEL' | 'CAINDO'
  sugestaoFoco: string
  maiorAprendizado: string
  riscoPrincipal: string
}

export function gerarVisaoFundador(
  capacidade: AdaptiveCapacity,
  capital: CapitalCognitivo | null,
  radar: RadarCapacidades,
  evolution: CognitiveEvolution,
  curva: CurvaEvolutiva | null,
  maturity: CompanyMaturity,
  milestones: CognitiveMilestone[] = [],
): FundadorVisaoDiaria {
  const scoreCap = capacidade.scoreGeral
  const scoreCapCapital = capital?.scoreTotal ?? 0
  const estagnadas = capacidade.capacidades
    .filter(c => c.variacao < 5 && c.nivel !== 'REFERENCIA')
    .map(c => c.nome)

  const maiorAprendizado = milestones.length > 0
    ? milestones[0].descricao
    : 'Nenhum aprendizado registrado ainda'

  const riscoPrincipal = maturity.maiorRisco?.descricao
    ?? radar.critica[0]?.descricao
    ?? 'Nenhum risco critico identificado'

  return {
    evolucaoEmpresa: curva?.tendenciaGeral === 'SUBINDO'
      ? `Empresa em evolucao — ${curva.maiorEvolucao.capacidade} cresceu ${curva.maiorEvolucao.variacao} pontos`
      : `Empresa estavel — manter ritmo de desenvolvimento de capacidades`,
    patrimonioCresceu: scoreCapCapital > 0
      ? `Capital Cognitivo em ${scoreCapCapital} pontos`
      : `Patrimonio cognitivo em construcao`,
    capacidadeEstagnada: estagnadas[0] ?? 'Nenhuma capacidade estagnada',
    conhecimentoNovo: milestones.filter(m => m.categoria === 'conhecimento' as any).length > 0
      ? `${milestones.filter(m => m.categoria === 'conhecimento' as any).length} novo(s) conhecimento(s) criado(s)`
      : 'Nenhum conhecimento novo no periodo',
    rfcsCriadas: milestones.filter(m => m.categoria === 'aprendizado' as any).length,
    hipotesesQueMorreram: 0,
    scoreCapacidadeAdaptativa: scoreCap,
    scoreCapitalCognitivo: scoreCapCapital,
    tendencia: curva?.tendenciaGeral ?? 'ESTAVEL',
    sugestaoFoco: radar.sugestaoFoco,
    maiorAprendizado,
    riscoPrincipal,
  }
}