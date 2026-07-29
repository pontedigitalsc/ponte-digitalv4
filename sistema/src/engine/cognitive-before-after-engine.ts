import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import type { AdaptiveCapacity } from './adaptive-capacity-engine'
import type { CognitiveEvolution } from './cognitive-evolution-engine'
import type { CompanyMaturity } from './company-maturity-engine'

export interface ComparacaoAntesDepois {
  dimensao: string
  antes: string
  depois: string
  resultado: string
  confianca: number
}

export interface AntesDepoisEngine {
  comparacoes: ComparacaoAntesDepois[]
  totalMelhorias: number
  resumoGeral: string
}

function formatarHoras(minutos: number): string {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  if (h > 0) return `${h}h${m > 0 ? m : ''}`
  return `${m}min`
}

export function gerarComparacoesAntesDepois(
  estado: EstadoCognitivoCompleto,
  capacidade: AdaptiveCapacity,
  evolution: CognitiveEvolution,
  maturity: CompanyMaturity,
): AntesDepoisEngine {
  const comparacoes: ComparacaoAntesDepois[] = []

  const scoreMedio = estado.auditoria?.scoreMedio ?? 0
  const evolucaoGeral = evolution.evolucaoTotal
  const totalConhecimentos = (estado.auditoria as any)?.totalConhecimentos ?? 0

  if (capacidade.scoreGeral > 0) {
    const scoreAntes = Math.max(0, capacidade.scoreGeral - Math.round(evolucaoGeral * 1.5))
    comparacoes.push({
      dimensao: 'Capacidade Adaptativa',
      antes: `${scoreAntes}% de capacidade`,
      depois: `${capacidade.scoreGeral}% de capacidade`,
      resultado: `+${capacidade.scoreGeral - scoreAntes}% de evolução`,
      confianca: Math.min(90, 65 + Math.round(evolucaoGeral)),
    })
  }

  if (totalConhecimentos > 0) {
    const conhecimentosAntes = Math.max(0, totalConhecimentos - Math.round(totalConhecimentos * 0.3))
    comparacoes.push({
      dimensao: 'Base de Conhecimento',
      antes: `${conhecimentosAntes} conhecimentos`,
      depois: `${totalConhecimentos} conhecimentos`,
      resultado: `+${totalConhecimentos - conhecimentosAntes} novos conhecimentos validados`,
      confianca: 80,
    })
  }

  if (scoreMedio > 0) {
    const scoreAntes = Math.max(0, scoreMedio - Math.round(scoreMedio * 0.25))
    comparacoes.push({
      dimensao: 'Qualidade das Informações',
      antes: `Confiança média de ${scoreAntes}%`,
      depois: `Confiança média de ${scoreMedio}%`,
      resultado: scoreMedio > scoreAntes ? 'Informações mais confiáveis' : 'Estabilidade mantida',
      confianca: 75,
    })
  }

  const feedbackPositivo = estado.feedbackRecente.filter((f: any) => f.tipo === 'AJUDOU' || f.tipo === 'AJUDOU_PARCIALMENTE').length
  if (feedbackPositivo > 0) {
    comparacoes.push({
      dimensao: 'Decisões Acertadas',
      antes: 'Decisões baseadas em intuição',
      depois: `${feedbackPositivo} decisões validadas por dados`,
      resultado: 'Maior precisão nas escolhas empresariais',
      confianca: 70 + feedbackPositivo * 5,
    })
  }

  if (maturity.score > 0) {
    const scoreAntes = Math.max(0, maturity.score - maturity.variacaoSemanal)
    comparacoes.push({
      dimensao: 'Maturidade Estratégica',
      antes: `${scoreAntes}/100`,
      depois: `${maturity.score}/100`,
      resultado: maturity.variacaoSemanal > 0
        ? `+${maturity.variacaoSemanal} pontos na maturidade`
        : 'Maturidade estável',
      confianca: 70,
    })
  }

  const totalMelhorias = comparacoes.filter(c => c.resultado.includes('+') || c.resultado.includes('Maior') || c.resultado.includes('mais')).length

  const resumoGeral = comparacoes.length > 0
    ? `Sua empresa melhorou em ${totalMelhorias} de ${comparacoes.length} dimensões analisadas.`
    : 'Acompanhamento ainda em construção — mais dados gerarão comparações mais precisas.'

  return { comparacoes, totalMelhorias, resumoGeral }
}
