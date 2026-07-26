import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'

export type NivelMaturidade = 'INICIAL' | 'EM_DESENVOLVIMENTO' | 'MADURA' | 'EVOLUIDA' | 'REFERENCIA'

export interface CompanyMaturity {
  score: number
  nivel: NivelMaturidade
  fatores: string[]
}

export function calcularMaturidade(estado: EstadoCognitivoCompleto): CompanyMaturity {
  const fatores: string[] = []
  let score = 0

  const auditoria = estado.auditoria
  const impacto = estado.impacto
  const jornada = estado.jornada
  const totalConhecimentos = auditoria?.totalConhecimentos ?? 0
  const scoreMedio = auditoria?.scoreMedio ?? 0
  const feedbackCount = estado.feedbackRecente.length
  const acoesCount = estado.acoesAtivas.length
  const outcomesCount = estado.topOutcomes.length
  const evolucaoGeral = impacto.evolucaoGeral ?? 0

  if (totalConhecimentos >= 50) {
    score += 25
    fatores.push(`${totalConhecimentos} conhecimentos validados`)
  } else if (totalConhecimentos >= 10) {
    score += 15
    fatores.push(`${totalConhecimentos} conhecimentos validados`)
  } else if (totalConhecimentos > 0) {
    score += 5
    fatores.push('Primeiros conhecimentos validados')
  }

  if (evolucaoGeral >= 50) {
    score += 20
    fatores.push(`Evolução geral de ${evolucaoGeral}%`)
  } else if (evolucaoGeral >= 20) {
    score += 10
    fatores.push('Evolução moderada')
  }

  if (scoreMedio >= 70) {
    score += 15
    fatores.push(`Score médio de confiança: ${scoreMedio}`)
  } else if (scoreMedio >= 40) {
    score += 8
    fatores.push('Confiança média dos conhecimentos')
  }

  if (feedbackCount >= 5) {
    score += 10
    fatores.push(`${feedbackCount} feedbacks recentes`)
  } else if (feedbackCount > 0) {
    score += 3
    fatores.push('Feedbacks registrados')
  }

  if (acoesCount >= 3) {
    score += 10
    fatores.push(`${acoesCount} ações ativas`)
  } else if (acoesCount > 0) {
    score += 5
    fatores.push('Ações em andamento')
  }

  if (outcomesCount >= 3) {
    score += 10
    fatores.push(`${outcomesCount} outcomes registrados`)
  } else if (outcomesCount > 0) {
    score += 5
    fatores.push('Outcomes registrados')
  }

  if (jornada.nivel === 'FUNDADOR_VALIDADO' || jornada.nivel === 'ENGAJADO') {
    score += 10
    fatores.push(`Nível de jornada: ${jornada.nivel}`)
  } else if (jornada.nivel === 'ATIVO') {
    score += 5
    fatores.push('Jornada em progresso')
  }

  let nivel: NivelMaturidade
  if (score >= 80) {
    nivel = 'REFERENCIA'
  } else if (score >= 60) {
    nivel = 'EVOLUIDA'
  } else if (score >= 40) {
    nivel = 'MADURA'
  } else if (score >= 20) {
    nivel = 'EM_DESENVOLVIMENTO'
  } else {
    nivel = 'INICIAL'
  }

  return { score, nivel, fatores }
}
