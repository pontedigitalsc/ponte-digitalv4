import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import type { CompanyMaturity } from './company-maturity-engine'
import type { CognitiveEvolution } from './cognitive-evolution-engine'
import type { GrowthEngineOutput } from './growth-opportunity-engine'
import type { MapaCalor } from './cognitive-heatmap-engine'

export interface AlertaCognitivo {
  id: string
  problema: string
  impacto: string
  evidencia: string
  caminhoSugerido: string
  confianca: number
  urgencia: 'ALTA' | 'MEDIA' | 'BAIXA'
  categoria: string
  data: Date
  contextualizado: boolean
}

export interface SaidaAlertas {
  alertas: AlertaCognitivo[]
  resumo: string
  prioridadeDoMomento: string
}

function gerarId(): string {
  return `alerta_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function formatarArea(area: string): string {
  const mapa: Record<string, string> = {
    FINANCEIRO: 'Financeiro', CLIENTES: 'Clientes', GESTAO: 'Gestão',
    OPERACAO: 'Operação', ESTRATEGIA: 'Estratégia', PESSOAS: 'Pessoas', PRODUTO: 'Produto',
  }
  return mapa[area] ?? area
}

export function gerarAlertasCognitivos(
  estado: EstadoCognitivoCompleto,
  maturity: CompanyMaturity,
  evolution: CognitiveEvolution,
  oportunidades: GrowthEngineOutput,
  mapaCalor: MapaCalor,
): SaidaAlertas {
  const alertas: AlertaCognitivo[] = []

  if (estado.impacto?.areaAtencao) {
    const area = estado.impacto.areaAtencao
    alertas.push({
      id: gerarId(),
      problema: `${formatarArea(area.categoria)} requer atenção estratégica`,
      impacto: area.justificativa,
      evidencia: `Maturidade da empresa: ${maturity.score}/100 | Evolução: ${evolution.evolucaoTotal}%`,
      caminhoSugerido: `Revisar processos em ${formatarArea(area.categoria)} e criar plano de ação corretivo`,
      confianca: Math.min(85, maturity.score + 10),
      urgencia: maturity.score < 30 ? 'ALTA' : maturity.score < 60 ? 'MEDIA' : 'BAIXA',
      categoria: area.categoria,
      data: new Date(),
      contextualizado: true,
    })
  }

  const areasQueda = mapaCalor.areas.filter(a => a.tendencia === 'CAINDO' && a.intensidade < 50)
  for (const area of areasQueda) {
    if (!alertas.some(a => a.categoria === area.area)) {
      alertas.push({
        id: gerarId(),
        problema: `Atividade cognitiva em queda em ${area.area}`,
        impacto: `A área ${area.area} perdeu intensidade — pode indicar despriorização ou estagnação`,
        evidencia: `Intensidade atual: ${area.intensidade}/100 | Confiança média: ${area.confiancaMedia}%`,
        caminhoSugerido: `Investigar causas da queda em ${area.area} e reativar o monitoramento`,
        confianca: 60 + area.confiancaMedia / 2,
        urgencia: area.intensidade < 20 ? 'ALTA' : 'MEDIA',
        categoria: area.area,
        data: new Date(),
        contextualizado: true,
      })
    }
  }

  if (oportunidades.oportunidades.length > 0) {
    const oportunidadesData = oportunidades.oportunidades as any[]
    const paradas = oportunidadesData.filter((o: any) => {
      const idade = (Date.now() - new Date(o.dataIdentificacao ?? Date.now()).getTime()) / (1000 * 60 * 60 * 24)
      return idade > 15
    })
    for (const op of paradas) {
      const idade = Math.round((Date.now() - new Date(op.dataIdentificacao ?? Date.now()).getTime()) / (1000 * 60 * 60 * 24))
      alertas.push({
        id: gerarId(),
        problema: `Oportunidade aguardando ação há ${idade} dias`,
        impacto: `"${op.titulo}" — ${op.descricao}`,
        evidencia: `Identificada há ${idade} dias | Impacto: ${op.impacto}`,
        caminhoSugerido: `Avaliar oportunidade e definir próximos passos`,
        confianca: 70,
        urgencia: idade > 30 ? 'ALTA' : 'MEDIA',
        categoria: op.categoria ?? op.area ?? 'GERAL',
        data: new Date(),
        contextualizado: true,
      })
    }
  }

  if (maturity.variacaoSemanal < 0) {
    alertas.push({
      id: gerarId(),
      problema: 'Maturidade empresarial em declínio',
      impacto: `Score caiu ${Math.abs(maturity.variacaoSemanal)} pontos na última semana`,
      evidencia: `Score atual: ${maturity.score} | Variação: ${maturity.variacaoSemanal}`,
      caminhoSugerido: 'Revisar fatores que contribuíram para a queda e reestabelecer práticas',
      confianca: 80,
      urgencia: 'ALTA',
      categoria: 'GESTAO',
      data: new Date(),
      contextualizado: true,
    })
  }

  if (maturity.variacaoSemanal > 0 && alertas.length === 0) {
    alertas.push({
      id: gerarId(),
      problema: 'Empresa em evolução positiva — aproveitar momento',
      impacto: `A maturidade subiu ${maturity.variacaoSemanal} pontos — momento fértil para avanços`,
      evidencia: `Score: ${maturity.score} | Evolução: ${evolution.evolucaoTotal}%`,
      caminhoSugerido: 'Intensificar áreas com maior potencial de crescimento',
      confianca: 75,
      urgencia: 'BAIXA',
      categoria: 'GESTAO',
      data: new Date(),
      contextualizado: true,
    })
  }

  alertas.sort((a, b) => {
    const pesoUrgencia = { ALTA: 3, MEDIA: 2, BAIXA: 1 }
    return pesoUrgencia[b.urgencia] - pesoUrgencia[a.urgencia]
  })

  const resumo = alertas.length > 0
    ? `${alertas.length} alerta(s) cognitivo(s) — ${alertas.filter(a => a.urgencia === 'ALTA').length} prioritário(s)`
    : 'Nenhum alerta no momento — tudo dentro da normalidade esperada.'

  const prioridadeDoMomento = alertas.length > 0
    ? alertas[0].problema
    : 'Monitoramento ativo — sem anormalidades'

  return { alertas, resumo, prioridadeDoMomento }
}
