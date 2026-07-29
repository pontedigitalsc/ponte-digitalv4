import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import type { Decisao } from './decision-engine'

export interface EtapaCiclo {
  etapa: 'OBSERVAR' | 'COMPREENDER' | 'ESCLARECER' | 'PRIORIZAR' | 'DECIDIR' | 'EXECUTAR' | 'APRENDER' | 'EVOLUIR' | 'OBSERVAR_NOVAMENTE'
  data: Date
  descricao: string
  confianca?: number
}

export interface CicloDecisao {
  id: string
  titulo: string
  categoria: string
  status: 'EM_ANDAMENTO' | 'CONCLUIDO' | 'INTERROMPIDO'
  etapas: EtapaCiclo[]
  aprendizadosGerados: string[]
  recomendacaoGerada: string | null
  cicloCompleto: boolean
  dataInicio: Date
  dataFim?: Date
}

export interface ResumoCiclos {
  ciclos: CicloDecisao[]
  ciclosCompletos: number
  totalCiclos: number
  taxaAprendizado: number
  proximoPasso: string
}

function gerarId(): string {
  return `ciclo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function formatarArea(area: string): string {
  const mapa: Record<string, string> = {
    FINANCEIRO: 'Financeiro', CLIENTES: 'Clientes', GESTAO: 'Gestão',
    OPERACAO: 'Operação', ESTRATEGIA: 'Estratégia', PESSOAS: 'Pessoas', PRODUTO: 'Produto',
  }
  return mapa[area] ?? area
}

export function construirCiclosDecisao(
  estado: EstadoCognitivoCompleto,
): ResumoCiclos {
  const ciclos: CicloDecisao[] = []

  const decisaoAtual = estado.decisao
  const acoesAtivas = estado.acoesAtivas ?? []
  const feedbackRecente = estado.feedbackRecente ?? []
  const topOutcomes = estado.topOutcomes ?? []

  if (decisaoAtual) {
    const etapas: EtapaCiclo[] = []
    const auditoriaAny = estado.auditoria as any
    const scoreAuditoria = estado.auditoria?.scoreMedio ?? 0
    const totalConhec = estado.auditoria?.totalConhecimentos ?? 0
    const hipotesesRelacionadas = (auditoriaAny?.ultimasHipotese ?? []).filter(
      (h: any) => h.categoria === decisaoAtual.categoria
    )
    const hipoteseRelacionada = hipotesesRelacionadas[0]
    const areaAtencao = estado.impacto?.areaAtencao
    const areaEvoluiu = estado.impacto?.areaMaisEvoluiu

    etapas.push({
      etapa: 'OBSERVAR',
      data: hipoteseRelacionada?.criadaEm ?? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      descricao: areaAtencao
        ? `Sinal identificado: ${areaAtencao} requer atencao — ${hipoteseRelacionada ? `hipotese: ${hipoteseRelacionada.descricao}` : `contexto: ${decisaoAtual.descricao}`}`
        : `Observacao registrada: sinal em ${areaEvoluiu ?? decisaoAtual.categoria}`,
      confianca: hipoteseRelacionada?.confianca ?? 0.5,
    })

    etapas.push({
      etapa: 'COMPREENDER',
      data: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      descricao: `Analise: ${decisaoAtual.titulo} — ${scoreAuditoria > 50 ? `compreensao baseada em ${totalConhec} conhecimentos` : 'compreensao inicial com dados limitados'}`,
      confianca: Math.min(0.9, scoreAuditoria * 0.01),
    })

    etapas.push({
      etapa: 'ESCLARECER',
      data: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      descricao: `Sintese: ${decisaoAtual.descricao} — prioridade: ${decisaoAtual.categoria}`,
      confianca: Math.max(0.3, decisaoAtual.confianca - 0.1),
    })

    etapas.push({
      etapa: 'PRIORIZAR',
      data: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      descricao: `Prioridade definida: ${decisaoAtual.titulo} — impacto ${decisaoAtual.impacto}, urgencia ${decisaoAtual.urgencia}`,
      confianca: decisaoAtual.confianca,
    })

    etapas.push({
      etapa: 'DECIDIR',
      data: new Date(),
      descricao: `Decisao: ${decisaoAtual.titulo} — ${decisaoAtual.descricao}`,
      confianca: decisaoAtual.confianca,
    })

    const acoesRelacionadas = acoesAtivas.filter(
      (a: any) => a.categoria === decisaoAtual.categoria
    )
    if (acoesRelacionadas.length > 0) {
      const acao = acoesRelacionadas[0] as any
      etapas.push({
        etapa: 'EXECUTAR',
        data: acao.criadaEm ?? new Date(),
        descricao: `Acao: ${acao.titulo ?? acao.descricao} (${acao.status})`,
        confianca: acao.confianca ?? 0.6,
      })
    } else {
      etapas.push({
        etapa: 'EXECUTAR',
        data: new Date(),
        descricao: 'Aguardando definicao de acao para execucao',
      })
    }

    const feedbackPositivo = feedbackRecente.filter(
      (fb: any) => fb.tipo === 'AJUDOU' || fb.tipo === 'AJUDOU_PARCIALMENTE'
    )
    const feedbackNegativo = feedbackRecente.filter(
      (fb: any) => fb.tipo === 'NAO_AJUDOU'
    )
    const outcomesRelacionados = topOutcomes.filter(
      (o: any) => o.categoria === decisaoAtual.categoria
    )

    const aprendizadosGerados: string[] = []
    if (feedbackPositivo.length > 0) aprendizadosGerados.push(`${decisaoAtual.categoria}: decisao validada`)
    if (outcomesRelacionados.length > 0) aprendizadosGerados.push(`${decisaoAtual.categoria}: ${outcomesRelacionados[0].descricao}`)
    if (feedbackNegativo.length > 0) aprendizadosGerados.push(`${decisaoAtual.categoria}: aprendizado com feedback negativo`)

    if (aprendizadosGerados.length > 0) {
      etapas.push({
        etapa: 'APRENDER',
        data: new Date(),
        descricao: aprendizadosGerados.join('; '),
        confianca: Math.min(0.95, 0.6 + aprendizadosGerados.length * 0.1),
      })
    }

    if (aprendizadosGerados.length > 0) {
      etapas.push({
        etapa: 'EVOLUIR',
        data: new Date(),
        descricao: `Capacidade fortalecida: ${formatarArea(decisaoAtual.categoria)} — aprendizado convertido em competencia`,
        confianca: 0.7,
      })
    }

    etapas.push({
      etapa: 'OBSERVAR_NOVAMENTE',
      data: new Date(),
      descricao: `Ciclo reinicia: nova observacao em ${formatarArea(decisaoAtual.categoria)} — empresa mais capaz`,
      confianca: 0.75,
    })

    const recomendacaoGerada: string | null = null

    const status: CicloDecisao['status'] = aprendizadosGerados.length > 0
      ? 'CONCLUIDO'
      : acoesRelacionadas.length > 0
        ? 'EM_ANDAMENTO'
        : 'INTERROMPIDO'

    ciclos.push({
      id: gerarId(),
      titulo: decisaoAtual.titulo,
      categoria: formatarArea(decisaoAtual.categoria),
      status,
      etapas,
      aprendizadosGerados,
      recomendacaoGerada,
      cicloCompleto: status === 'CONCLUIDO',
      dataInicio: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dataFim: status === 'CONCLUIDO' ? new Date() : undefined,
    })
  }

  const totalCiclos = ciclos.length
  const ciclosCompletos = ciclos.filter(c => c.cicloCompleto).length
  const taxaAprendizado = totalCiclos > 0 ? Math.round((ciclosCompletos / totalCiclos) * 100) : 0

  const proximoPasso = totalCiclos === 0
    ? 'Nenhuma decisão registrada ainda — ao tomar a primeira decisão, a Ponte acompanhará o ciclo completo.'
    : ciclos.some(c => c.status === 'EM_ANDAMENTO')
      ? `${ciclos.filter(c => c.status === 'EM_ANDAMENTO').length} ciclo(s) em andamento — continue acompanhando a execução para gerar aprendizado.`
      : `${ciclosCompletos} ciclo(s) concluído(s) — a Ponte está pronta para novas decisões.`

  return {
    ciclos,
    ciclosCompletos,
    totalCiclos,
    taxaAprendizado,
    proximoPasso,
  }
}
