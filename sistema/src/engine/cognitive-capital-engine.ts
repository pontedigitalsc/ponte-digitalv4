import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import type { CompanyMaturity } from './company-maturity-engine'
import type { AdaptiveCapacity } from './adaptive-capacity-engine'
import type { ResumoCiclos } from './decision-learning-cycle-engine'

export interface CapitalCognitivo {
  scoreTotal: number
  variacaoMensal: number
  componentes: ComponenteCapital[]
  scoreAnterior: number
  scoreAtual: number
  nivel: 'INICIAL' | 'EM_CONSTRUCAO' | 'CONSOLIDADO' | 'AVANCADO'
}

export interface ComponenteCapital {
  nome: string
  peso: number
  score: number
  descricao: string
}

function calcularNivel(score: number): CapitalCognitivo['nivel'] {
  if (score >= 700) return 'AVANCADO'
  if (score >= 400) return 'CONSOLIDADO'
  if (score >= 150) return 'EM_CONSTRUCAO'
  return 'INICIAL'
}

export function calcularCapitalCognitivo(
  estado: EstadoCognitivoCompleto,
  maturity: CompanyMaturity,
  capacidade: AdaptiveCapacity,
  ciclos: ResumoCiclos,
): CapitalCognitivo {
  const totalConhecimentos = (estado.auditoria as any)?.totalConhecimentos ?? 0
  const totalHipoteses = (estado.auditoria as any)?.totalHipoteses ?? 0
  const feedbackCount = estado.feedbackRecente.length
  const acoesCount = estado.acoesAtivas.length
  const outcomesCount = estado.topOutcomes.length
  const scoreMedio = estado.auditoria?.scoreMedio ?? 0
  const evolucaoGeral = estado.impacto.evolucaoGeral ?? 0

  const conhecimentos = Math.min(200, Math.round(totalConhecimentos * 8))
  const experimentos = Math.min(150, Math.round((totalHipoteses + feedbackCount) * 10))
  const hipotesesConfirmadas = Math.min(150, Math.round(totalHipoteses * 15 + outcomesCount * 10))
  const padroesIdentificados = Math.min(150, Math.round(capacidade.scoreGeral * 1.2))
  const decisoesRegistradas = Math.min(150, Math.round((estado.decisao ? 30 : 0) + acoesCount * 8 + ciclos.totalCiclos * 15))
  const aprendizadosCompartilhaveis = Math.min(200, Math.round(scoreMedio * 1.5 + evolucaoGeral * 2))

  const scoreTotal = conhecimentos + experimentos + hipotesesConfirmadas + padroesIdentificados + decisoesRegistradas + aprendizadosCompartilhaveis

  const scoreAnterior = Math.max(0, scoreTotal - Math.round(maturity.variacaoSemanal * 15 + feedbackCount * 5))
  const variacaoMensal = scoreTotal - scoreAnterior

  return {
    scoreTotal: Math.min(1000, scoreTotal),
    variacaoMensal,
    scoreAnterior,
    scoreAtual: Math.min(1000, scoreTotal),
    nivel: calcularNivel(scoreTotal),
    componentes: [
      { nome: 'Conhecimentos validados', peso: conhecimentos, score: Math.min(200, conhecimentos), descricao: `${totalConhecimentos} conhecimento(s)` },
      { nome: 'Experimentos realizados', peso: experimentos, score: Math.min(150, experimentos), descricao: `${totalHipoteses} hipótese(s), ${feedbackCount} feedback(s)` },
      { nome: 'Hipóteses confirmadas', peso: hipotesesConfirmadas, score: Math.min(150, hipotesesConfirmadas), descricao: `${outcomesCount} resultado(s) positivos` },
      { nome: 'Padrões identificados', peso: padroesIdentificados, score: Math.min(150, padroesIdentificados), descricao: `Capacidade: ${capacidade.scoreGeral}%` },
      { nome: 'Decisões registradas', peso: decisoesRegistradas, score: Math.min(150, decisoesRegistradas), descricao: `${ciclos.totalCiclos} ciclo(s), ${acoesCount} acao(ões)` },
      { nome: 'Aprendizados compartilháveis', peso: aprendizadosCompartilhaveis, score: Math.min(200, aprendizadosCompartilhaveis), descricao: `Score médio: ${scoreMedio}, Evolução: ${evolucaoGeral}%` },
    ],
  }
}
