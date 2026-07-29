import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'

export interface Capacidade {
  id: string
  nome: string
  descricao: string
  score: number
  variacao: number
  nivel: 'INICIAL' | 'EM_DESENVOLVIMENTO' | 'AVANCADO' | 'REFERENCIA'
}

export interface AdaptiveCapacity {
  scoreGeral: number
  variacaoGeral: number
  capacidades: Capacidade[]
  nivelGeral: string
  maiorCapacidade: string
  menorCapacidade: string
}

function calcularNivel(score: number): Capacidade['nivel'] {
  if (score >= 80) return 'REFERENCIA'
  if (score >= 60) return 'AVANCADO'
  if (score >= 30) return 'EM_DESENVOLVIMENTO'
  return 'INICIAL'
}

export function calcularCapacidadeAdaptativa(
  estado: EstadoCognitivoCompleto,
  maturityScore: number,
): AdaptiveCapacity {
  const auditoria = estado.auditoria
  const impacto = estado.impacto
  const totalConhecimentos = auditoria?.totalConhecimentos ?? 0
  const scoreMedio = auditoria?.scoreMedio ?? 0
  const feedbackCount = estado.feedbackRecente.length
  const acoesCount = estado.acoesAtivas.length
  const outcomesCount = estado.topOutcomes.length
  const evolucaoGeral = impacto.evolucaoGeral ?? 0
  const temAcaoSugerida = !!estado.contexto?.acaoSugerida
  const temDecisaoAtiva = !!estado.decisao

  const observar = Math.min(100, Math.round(
    30 +
    (totalConhecimentos > 0 ? 15 : 0) +
    (feedbackCount > 0 ? feedbackCount * 5 : 0) +
    (scoreMedio * 0.3) +
    (temAcaoSugerida ? 10 : 0)
  ))

  const compreender = Math.min(100, Math.round(
    25 +
    (scoreMedio * 0.4) +
    (totalConhecimentos >= 10 ? 15 : totalConhecimentos > 0 ? 8 : 0) +
    (impacto.areaMaisEvoluiu ? 10 : 0) +
    (impacto.areaAtencao ? -5 : 5)
  ))

  const esclarecer = Math.min(100, Math.round(
    25 +
    (scoreMedio * 0.3) +
    (temAcaoSugerida ? 10 : 0) +
    (totalConhecimentos > 0 ? 10 : 0) +
    (temDecisaoAtiva ? 10 : 0) +
    (outcomesCount > 0 ? 10 : 0)
  ))

  const priorizar = Math.min(100, Math.round(
    25 +
    (temAcaoSugerida ? 20 : 0) +
    (temDecisaoAtiva ? 15 : 0) +
    (outcomesCount > 0 ? 10 : 0) +
    (feedbackCount > 0 ? feedbackCount * 3 : 0) +
    (scoreMedio * 0.2)
  ))

  const decidir = Math.min(100, Math.round(
    25 +
    (temDecisaoAtiva ? 20 : 0) +
    (estado.decisao?.confianca ? estado.decisao.confianca * 0.4 : 0) +
    (temAcaoSugerida ? 10 : 0) +
    (outcomesCount > 0 ? 10 : 0)
  ))

  const executar = Math.min(100, Math.round(
    30 +
    (acoesCount > 0 ? acoesCount * 8 : 0) +
    (outcomesCount > 0 ? 10 : 0) +
    (evolucaoGeral * 0.2) +
    (feedbackCount > 0 ? 5 : 0)
  ))

  const aprender = Math.min(100, Math.round(
    20 +
    (feedbackCount > 0 ? feedbackCount * 5 : 0) +
    (outcomesCount > 0 ? 10 : 0) +
    (totalConhecimentos > 0 ? 10 : 0) +
    (scoreMedio * 0.2) +
    (evolucaoGeral * 0.1)
  ))

  const evoluir = Math.min(100, Math.round(
    20 +
    (evolucaoGeral * 0.4) +
    (totalConhecimentos > 0 ? 10 : 0) +
    (feedbackCount > 0 ? feedbackCount * 4 : 0) +
    (outcomesCount > 0 ? 10 : 0) +
    (temDecisaoAtiva ? 10 : 0) +
    (maturityScore * 0.1)
  ))

  const capacidades: Capacidade[] = [
    {
      id: 'observar',
      nome: 'Observar',
      descricao: 'Perceber sinais, mudancas, anomalias, riscos e oportunidades',
      score: observar,
      variacao: observar - 30,
      nivel: calcularNivel(observar),
    },
    {
      id: 'compreender',
      nome: 'Compreender',
      descricao: 'Transformar informacao em significado',
      score: compreender,
      variacao: compreender - 25,
      nivel: calcularNivel(compreender),
    },
    {
      id: 'esclarecer',
      nome: 'Esclarecer',
      descricao: 'Reduzir complexidade e mostrar o essencial',
      score: esclarecer,
      variacao: esclarecer - 25,
      nivel: calcularNivel(esclarecer),
    },
    {
      id: 'priorizar',
      nome: 'Priorizar',
      descricao: 'Identificar o que realmente importa agora',
      score: priorizar,
      variacao: priorizar - 25,
      nivel: calcularNivel(priorizar),
    },
    {
      id: 'decidir',
      nome: 'Decidir',
      descricao: 'Escolher melhor com menor risco e maior confianca',
      score: decidir,
      variacao: decidir - 25,
      nivel: calcularNivel(decidir),
    },
    {
      id: 'executar',
      nome: 'Executar',
      descricao: 'Transformar decisoes em acoes com menos atrito',
      score: executar,
      variacao: executar - 30,
      nivel: calcularNivel(executar),
    },
    {
      id: 'aprender',
      nome: 'Aprender',
      descricao: 'Registrar resultados, validar hipoteses, gerar conhecimento',
      score: aprender,
      variacao: aprender - 20,
      nivel: calcularNivel(aprender),
    },
    {
      id: 'evoluir',
      nome: 'Evoluir',
      descricao: 'Transformar conhecimento em nova capacidade',
      score: evoluir,
      variacao: evoluir - 20,
      nivel: calcularNivel(evoluir),
    },
  ]

  const scoreGeral = Math.round(
    (observar * 0.125) +
    (compreender * 0.125) +
    (esclarecer * 0.125) +
    (priorizar * 0.125) +
    (decidir * 0.15) +
    (executar * 0.125) +
    (aprender * 0.1) +
    (evoluir * 0.125)
  )

  const variacaoGeral = scoreGeral - maturityScore
  const nivelGeral = calcularNivel(scoreGeral)
  const maiorCapacidade = capacidades.reduce((a, b) => a.score > b.score ? a : b).nome
  const menorCapacidade = capacidades.reduce((a, b) => a.score < b.score ? a : b).nome

  return {
    scoreGeral,
    variacaoGeral,
    capacidades,
    nivelGeral,
    maiorCapacidade,
    menorCapacidade,
  }
}
