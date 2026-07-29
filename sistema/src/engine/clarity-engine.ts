import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import type { CompanyMaturity } from './company-maturity-engine'
import type { AdaptiveCapacity } from './adaptive-capacity-engine'

export interface AnaliseClareza {
  ondeEstamos: string
  oQueMudou: string
  oQueImporta: string
  oQuePodeEsperar: string
  proximoMelhorMovimento: string
  capacidadeFortalecida: string
}

export function gerarAnaliseClareza(
  estado: EstadoCognitivoCompleto,
  maturity: CompanyMaturity,
  capacidade: AdaptiveCapacity,
): AnaliseClareza {
  const areaAtencao = estado.impacto?.areaAtencao
  const areaEvoluiu = estado.impacto?.areaMaisEvoluiu
  const evolucaoGeral = estado.impacto?.evolucaoGeral ?? 0
  const menorCap = capacidade.menorCapacidade
  const maiorCap = capacidade.maiorCapacidade
  const scoreGeral = capacidade.scoreGeral

  const ondeEstamos = scoreGeral >= 70
    ? `Capacidade adaptativa avancada (${scoreGeral}%) — empresa com boa capacidade de evolucao`
    : scoreGeral >= 40
      ? `Capacidade adaptativa em desenvolvimento (${scoreGeral}%) — base sendo construida`
      : `Capacidade adaptativa inicial (${scoreGeral}%) — primeiros passos na jornada cognitiva`

  const oQueMudou = areaEvoluiu
    ? `${areaEvoluiu} apresentou maior evolucao recentemente`
    : evolucaoGeral > 5
      ? `Evolucao geral positiva (${evolucaoGeral}%)`
      : `Mudancas graduais em curso`

  const oQueImporta = areaAtencao
    ? `${areaAtencao} requer atencao prioritaria — maior risco atual`
    : menorCap
      ? `Fortalecer ${menorCap} — menor capacidade do momento`
      : `Consolidar ${maiorCap} — maior capacidade da empresa`

  const oQuePodeEsperar = scoreGeral >= 60
    ? `Proximo ciclo deve fortalecer ${menorCap} com base no aprendizado acumulado`
    : `Foco em estruturar observacao e compreensao antes de avancar para decisoes complexas`

  const proximoMelhorMovimento = menorCap
    ? `Desenvolver ${menorCap} — maior ganho potencial de capacidade adaptativa`
    : `Realizar diagnostico completo para identificar proximo salto`

  const capacidadeFortalecida = menorCap ?? maiorCap ?? 'Observar'

  return {
    ondeEstamos,
    oQueMudou,
    oQueImporta,
    oQuePodeEsperar,
    proximoMelhorMovimento,
    capacidadeFortalecida,
  }
}