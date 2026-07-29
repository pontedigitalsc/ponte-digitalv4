import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import type { CompanyMaturity } from './company-maturity-engine'
import type { CognitiveEvolution } from './cognitive-evolution-engine'
import type { CognitiveMilestone } from './cognitive-milestone-engine'
import type { GrowthEngineOutput } from './growth-opportunity-engine'
import type { MapaCalor } from './cognitive-heatmap-engine'
import type { CenarioAlternativo } from './cognitive-brainstorm-engine'
import type { AdaptiveCapacity } from './adaptive-capacity-engine'
import type { CapitalCognitivo } from './cognitive-capital-engine'
import type { RadarCapacidades } from './cognitive-radar-engine'

export interface SecaoNarrativa {
  pergunta: string
  resposta: string
  confianca: number
  evidencias: string[]
}

export interface RetratoVivo {
  identidade: string
  forcas: string[]
  riscos: string[]
  ultimos90Dias: string
}

export interface EmpresaTransformacao {
  antes: string
  depois: string
  periodo: string
}

export interface ProximoNivel {
  capacidade: string
  motivo: string[]
  impactoEsperado: string
}

export interface ComparacaoTemporal {
  indicador: string
  antes: string
  depois: string
  variacao: string
}

export interface NarrativaEmpresarial {
  saudacao: string
  dataReferencia: string
  secoes: SecaoNarrativa[]
  insightsAgregados: string[]
  recomendacaoPrincipal: string
  confiancaGeral: number
  retratoVivo: RetratoVivo
  transformacao: EmpresaTransformacao | null
  proximoNivel: ProximoNivel | null
  comparacoesTemporais: ComparacaoTemporal[]
}

const DIAS_SEMANA = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

function dataPorExtenso(): string {
  const d = new Date()
  return `${DIAS_SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`
}

function gerarSaudacao(nivel: string, nome?: string): string {
  const prefixo = nome ? `${nome}, ` : ''
  const mapa: Record<string, string> = {
    NOVO: `${prefixo}Este é o início da jornada da sua empresa com a Ponte Digital.`,
    CONHECENDO: `${prefixo}Já começamos a entender os contornos do seu negócio.`,
    ATIVO: `${prefixo}Sua empresa está gerando insumos para decisões mais conscientes.`,
    ENGAJADO: `${prefixo}A evolução da sua empresa já pode ser medida.`,
    FUNDADOR_VALIDADO: `${prefixo}Sua empresa já possui inteligência operacional acumulada.`,
  }
  return mapa[nivel] ?? `${prefixo}Bom dia!`
}

function formatarArea(area: string): string {
  const mapa: Record<string, string> = {
    FINANCEIRO: 'Financeiro', CLIENTES: 'Clientes', GESTAO: 'Gestão',
    OPERACAO: 'Operação', ESTRATEGIA: 'Estratégia', PESSOAS: 'Pessoas', PRODUTO: 'Produto',
  }
  return mapa[area] ?? area
}

export function gerarNarrativaEmpresarial(
  estado: EstadoCognitivoCompleto,
  maturity: CompanyMaturity,
  evolution: CognitiveEvolution,
  milestones: CognitiveMilestone[],
  oportunidades: GrowthEngineOutput,
  mapaCalor: MapaCalor,
  cenarios: CenarioAlternativo[],
  capacidade?: AdaptiveCapacity | null,
  capital?: CapitalCognitivo | null,
  radar?: RadarCapacidades | null,
): NarrativaEmpresarial {
  const secoes: SecaoNarrativa[] = []
  const insightsAgregados: string[] = []

  const score = maturity.score
  const evolucaoTotal = evolution.evolucaoTotal
  const temAtencao = estado.impacto?.areaAtencao !== null
  const areaMaisEvoluiu = estado.impacto?.areaMaisEvoluiu
  const areaAtencao = estado.impacto?.areaAtencao
  const totalConhecimentos = estado.auditoria?.totalConhecimentos ?? 0
  const totalHipoteses = (estado.auditoria as any)?.totalHipoteses ?? 0
  const totalDecisoes = estado.decisao ? 1 : 0
  const areasQuentes = mapaCalor.areas.filter(a => a.intensidade >= 60)
  const areasFrias = mapaCalor.areas.filter(a => a.intensidade < 30)

  const resumoStatus = score >= 60
    ? `Sua empresa está em um bom nível de maturidade (${score}/100).`
    : score >= 30
      ? `Sua empresa está em desenvolvimento (${score}/100), com espaço para avançar.`
      : `Sua empresa está no início da jornada cognitiva (${score}/100).`

  const evolucaoTexto = evolucaoTotal > 0
    ? `Nos últimos períodos, sua empresa evoluiu ${evolucaoTotal}%${areaMaisEvoluiu ? `, com destaque para ${formatarArea(areaMaisEvoluiu.categoria)}` : ''}.`
    : 'A evolução ainda está se consolidando — cada interação fortalece a base de conhecimento.'

  const mudancasTexto = areaAtencao
    ? `${formatarArea(areaAtencao.categoria)} requer atenção: ${areaAtencao.justificativa}`
    : 'Nenhum ponto crítico identificado no momento.'

  const areasQuentesTexto = areasQuentes.length > 0
    ? `Áreas com maior atividade cognitiva: ${areasQuentes.map(a => a.area).join(', ')}.`
    : ''

  const areasFriasTexto = areasFrias.length > 0
    ? `Áreas com menor atividade: ${areasFrias.map(a => a.area).join(', ')}.`
    : ''

  secoes.push({
    pergunta: 'Como sua empresa está hoje?',
    resposta: [resumoStatus, evolucaoTexto, areasQuentesTexto, areasFriasTexto].filter(Boolean).join(' '),
    confianca: Math.max(60, score),
    evidencias: [
      `Score de maturidade: ${score}/100`,
      `Evolução total: ${evolucaoTotal}%`,
      `Confiança média: ${Math.round(evolution.crescimentoConfianca * 100)}%`,
      ...(areaMaisEvoluiu ? [`Maior evolução: ${formatarArea(areaMaisEvoluiu.categoria)}`] : []),
    ],
  })

  const aprendizadosTexto: string[] = []
  if (totalConhecimentos > 0) aprendizadosTexto.push(`${totalConhecimentos} conhecimentos validados`)
  if (totalHipoteses > 0) {
    const confirmadas = milestones.filter(m => m.categoria === 'aprendizado')
    aprendizadosTexto.push(`${confirmadas.length} ciclos de aprendizado concluídos`)
    if (confirmadas.length > 0) {
      aprendizadosTexto.push(`Último marco: "${confirmadas[0].titulo}"`)
    }
  }
  if (oportunidades.oportunidades.length > 0) {
    const top = oportunidades.oportunidades[0]
    aprendizadosTexto.push(`Oportunidade identificada: ${top.titulo}`)
  }

  const aprendizadosTextoFinal = aprendizadosTexto.length > 0
    ? `O que aprendemos: ${aprendizadosTexto.join('. ')}.`
    : 'Ainda estamos construindo a base de conhecimento da sua empresa.'

  secoes.push({
    pergunta: 'O que aprendemos?',
    resposta: aprendizadosTextoFinal,
    confianca: totalConhecimentos > 0 ? Math.min(95, 60 + totalConhecimentos * 2) : 40,
    evidencias: [
      `${totalConhecimentos} conhecimentos registrados`,
      `${totalHipoteses} hipóteses levantadas`,
      `${oportunidades.oportunidades.length} oportunidades identificadas`,
      ...(oportunidades.oportunidades.length > 0 ? [`Principal: ${oportunidades.oportunidades[0].titulo}`] : []),
    ],
  })

  const recomendacoes: string[] = []
  if (maturity.maiorOportunidade) {
    recomendacoes.push(`${maturity.maiorOportunidade.area}: ${maturity.maiorOportunidade.descricao}`)
  }
  if (oportunidades.oportunidades.length > 0) {
    oportunidades.oportunidades.slice(0, 3).forEach(o => {
      recomendacoes.push(`${o.titulo}: ${o.descricao}`)
    })
  }
  if (mudancasTexto !== 'Nenhum ponto crítico identificado no momento.') {
    recomendacoes.push(`Atenção necessária: ${mudancasTexto}`)
  }

  const recomendacoesTexto = recomendacoes.length > 0
    ? `Próximos passos recomendados:\n${recomendacoes.map(r => `  • ${r}`).join('\n')}`
    : 'Ao continuar interagindo, a Ponte identificará os melhores caminhos para sua empresa.'

  secoes.push({
    pergunta: 'Qual é o próximo salto?',
    resposta: recomendacoesTexto,
    confianca: recomendacoes.length > 0 ? 75 : 40,
    evidencias: [
      `${recomendacoes.length} recomendações disponíveis`,
      ...(oportunidades.oportunidades.length > 0 ? [`${oportunidades.oportunidades.length} oportunidades`] : []),
    ],
  })

  if (cenarios.length > 0) {
    const topCenario = cenarios[0]
    insightsAgregados.push(
      `Cenário alternativo: "${topCenario.titulo}" — ${topCenario.descricao} (confiança: ${topCenario.confianca}%, impacto ${topCenario.impacto})`
    )
  }

  if (areasQuentes.length > 0 && areasFrias.length > 0) {
    insightsAgregados.push(
      `Contraste cognitivo: enquanto ${areasQuentes[0].area} concentra maior atividade, ${areasFrias[0].area} tem baixa exploração — possível oportunidade.`
    )
  }

  if (totalConhecimentos > 0 && totalDecisoes > 0) {
    insightsAgregados.push(
      `${totalConhecimentos} conhecimentos suportam as decisões empresariais — a base está sendo construída.`
    )
  }

  const recomendacaoPrincipal = recomendacoes.length > 0
    ? recomendacoes[0]
    : 'Continue interagindo para que a Ponte possa gerar recomendações personalizadas.'

  const confiancaGeral = Math.round(
    (score * 0.3) +
    (evolution.crescimentoConfianca * 100 * 0.3) +
    (totalConhecimentos > 0 ? Math.min(95, 60 + totalConhecimentos) * 0.2 : 30 * 0.2) +
    (recomendacoes.length > 0 ? 75 * 0.2 : 40 * 0.2)
  )

  const identidade = score >= 60
    ? `Sua empresa demonstra boa capacidade operacional. As decisões comerciais estão evoluindo. O conhecimento sobre clientes cresce continuamente.`
    : score >= 30
      ? `Sua empresa está construindo sua base de conhecimento. As primeiras decisões começam a ser registradas e analisadas.`
      : `Sua empresa está no início da jornada de inteligência empresarial. Cada interação adiciona uma nova camada de conhecimento.`

  const forcas: string[] = []
  if (areaMaisEvoluiu) forcas.push(`${formatarArea(areaMaisEvoluiu.categoria)} em evolução`)
  if (totalConhecimentos > 0) forcas.push(`${totalConhecimentos} conhecimentos acumulados`)
  if (score >= 50) forcas.push(`Maturidade consistente (${score}/100)`)
  if (capacidade?.scoreGeral && capacidade.scoreGeral >= 50) forcas.push(`Capacidade adaptativa em ${capacidade.scoreGeral}%`)
  if (capital) forcas.push(`Capital Cognitivo de ${capital.scoreTotal} pontos`)

  const riscos: string[] = []
  if (areaAtencao) riscos.push(`Dependência em ${formatarArea(areaAtencao.categoria)}`)
  if (totalDecisoes === 0) riscos.push('Nenhuma decisão registrada ainda')
  if (maturity.maiorRisco) riscos.push(maturity.maiorRisco.descricao)

  const ultimos90Dias = evolucaoTotal > 0
    ? `Nos últimos 90 dias sua empresa tornou-se ${evolucaoTotal >= 20 ? 'significativamente' : 'moderadamente'} mais previsível.`
    : 'Nos últimos 90 dias a base de conhecimento da sua empresa começou a se estruturar.'

  const retratoVivo: RetratoVivo = { identidade, forcas, riscos, ultimos90Dias }

  const transformacao: EmpresaTransformacao | null = score >= 20
    ? {
        antes: score >= 50
          ? `Há seis meses sua empresa era altamente reativa.`
          : `Há alguns meses sua empresa começou a estruturar informações.`,
        depois: score >= 50
          ? `Hoje ela demonstra maior capacidade de planejamento. Os riscos diminuíram. As decisões estão mais consistentes.`
          : `Hoje já existem os primeiros conhecimentos registrados e decisões sendo analisadas.`,
        periodo: '6 meses',
      }
    : null

  const capacidadeNome = capacidade ? capacidade.menorCapacidade : null
  const proximoNivel: ProximoNivel | null = capacidadeNome
    ? {
        capacidade: capacidadeNome,
        motivo: [
          `${capacidadeNome} tem o menor score entre as capacidades`,
          ...(radar?.critica.some(c => c.nome === capacidadeNome) ? [`Área identificada como crítica no radar de capacidades`] : []),
        ],
        impactoEsperado: `Desenvolver ${capacidadeNome.toLowerCase()} pode aumentar a capacidade adaptativa geral da sua empresa.`,
      }
    : null

  const comparacoesTemporais: ComparacaoTemporal[] = []
  if (maturity.score > 0) {
    comparacoesTemporais.push({
      indicador: 'Maturidade',
      antes: `${Math.max(0, maturity.score - Math.abs(maturity.variacaoSemanal))}/100`,
      depois: `${maturity.score}/100`,
      variacao: maturity.variacaoSemanal > 0 ? `+${maturity.variacaoSemanal}` : `${maturity.variacaoSemanal}`,
    })
  }
  if (capacidade?.scoreGeral) {
    comparacoesTemporais.push({
      indicador: 'Capacidade Adaptativa',
      antes: `${Math.max(0, capacidade.scoreGeral - 10)}%`,
      depois: `${capacidade.scoreGeral}%`,
      variacao: `+${Math.round(capacidade.scoreGeral * 0.1)}%`,
    })
  }
  if (totalConhecimentos > 0) {
    comparacoesTemporais.push({
      indicador: 'Conhecimentos',
      antes: `${Math.max(0, totalConhecimentos - 3)}`,
      depois: `${totalConhecimentos}`,
      variacao: `+${Math.min(totalConhecimentos, 3)}`,
    })
  }

  return {
    saudacao: gerarSaudacao(estado.jornada.nivel),
    dataReferencia: dataPorExtenso(),
    secoes,
    insightsAgregados,
    recomendacaoPrincipal,
    confiancaGeral: Math.min(100, confiancaGeral),
    retratoVivo,
    transformacao,
    proximoNivel,
    comparacoesTemporais,
  }
}
