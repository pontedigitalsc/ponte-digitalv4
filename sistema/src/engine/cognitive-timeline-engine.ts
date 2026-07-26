import type { Journey } from './cognitive-journey-engine'
import type { CognitiveWorkflow } from './cognitive-workflow-engine'

export type TimelineItemTipo =
  | 'conversa' | 'evidencia' | 'memoria' | 'hipotese'
  | 'conhecimento' | 'acao' | 'feedback' | 'outcome'
  | 'jornada' | 'workflow' | 'ativacao' | 'narrativa'

export interface TimelineItem {
  id: string
  tipo: TimelineItemTipo
  origem: string
  categoria: string
  momento: string
  explicacao: string
  impacto?: string
  confianca?: number
  relacoes?: string[]
}

export interface TimelineGroup {
  rotulo: string
  items: TimelineItem[]
}

export interface TimelineSection {
  periodo: string
  grupos: TimelineGroup[]
}

export interface TimelineResumo {
  aprendizadosHoje: number
  mudancasHoje: number
  confirmacoesHoje: number
  hipotesesAtivas: number
  acoesPendentes: number
}

export interface TimelineExperience {
  secoes: TimelineSection[]
  resumo: TimelineResumo
}

export interface TimelineFilter {
  tipos?: TimelineItemTipo[]
  categorias?: string[]
  periodo?: 'hoje' | 'semana' | 'mes' | 'tudo'
}

type DadoFeedback = { tipo?: string; acao?: { titulo?: string; categoria?: string }; comentario?: string; criadoEm?: string | Date }
type DadoAcao = { id: string; titulo: string; descricao?: string; status: string; categoria: string; criadaEm?: string | Date }
type DadoOutcome = { id?: string; descricao: string; categoria: string; origem?: string; criadoEm?: string | Date; confianca?: number }
type DadoMemoria = { tipo: string; descricao: string; categoria: string; versao: number; criadoEm?: string | Date }
type DadoAtivacao = { nivel: string; progresso: number; eventos: string[] }

let contadorTimeline = 0

function gerarId(): string {
  return `tl_${++contadorTimeline}_${Date.now()}`
}

function periodoLabel(data: Date): string {
  const agora = new Date()
  const diff = agora.getTime() - data.getTime()
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (dias === 0) return 'Hoje'
  if (dias === 1) return 'Ontem'
  if (dias <= 7) return 'Esta semana'
  if (dias <= 30) return 'Este mês'
  return 'Anterior'
}

function ordenarItems(items: TimelineItem[]): TimelineItem[] {
  return items.sort((a, b) => b.momento.localeCompare(a.momento))
}

function agruparPorPeriodo(items: TimelineItem[]): TimelineSection[] {
  const grupos = new Map<string, TimelineItem[]>()

  for (const item of items) {
    const periodo = periodoLabel(new Date(item.momento))
    const arr = grupos.get(periodo) ?? []
    arr.push(item)
    grupos.set(periodo, arr)
  }

  const ordem = ['Hoje', 'Ontem', 'Esta semana', 'Este mês', 'Anterior']
  return ordem
    .filter(p => grupos.has(p))
    .map(periodo => ({
      periodo,
      grupos: [{ rotulo: `Atividades de ${periodo.toLowerCase()}`, items: ordenarItems(grupos.get(periodo)!) }],
    }))
}

export function gerarTimeline(
  dados: {
    feedbackRecente?: DadoFeedback[]
    acoesAtivas?: DadoAcao[]
    topOutcomes?: DadoOutcome[]
    jornada?: DadoAtivacao
    auditoria?: { conhecimentosPromovidos: number; totalConhecimentos: number; scoreMedio: number }
    impacto?: { evolucaoGeral: number; mudancasPositivas: Array<{ categoria: string; descricao: string }>; mudancasNegativas: Array<{ categoria: string; descricao: string }> }
  },
  journeys: Journey[],
  workflows: CognitiveWorkflow[],
): TimelineExperience {
  const items: TimelineItem[] = []
  const agora = new Date()

  // Feedback → aprendizados e confirmações
  for (const fb of dados.feedbackRecente ?? []) {
    const tipo = fb.tipo === 'AJUDOU' ? 'feedback' as const
      : fb.tipo === 'NAO_AJUDOU' ? 'feedback' as const
      : 'feedback' as const
    items.push({
      id: gerarId(),
      tipo,
      origem: 'Feedback Engine',
      categoria: fb.acao?.categoria ?? 'GESTAO',
      momento: fb.criadoEm ? new Date(fb.criadoEm).toISOString() : agora.toISOString(),
      explicacao: fb.tipo === 'AJUDOU'
        ? `"${fb.acao?.titulo ?? 'Ação'}" funcionou como esperado`
        : fb.tipo === 'NAO_AJUDOU'
          ? `"${fb.acao?.titulo ?? 'Ação'}" não funcionou — novo aprendizado`
          : `"${fb.acao?.titulo ?? 'Ação'}" não foi executada`,
      impacto: fb.tipo === 'AJUDOU' ? 'Confirma conhecimento existente' : 'Gera novo aprendizado',
      confianca: fb.tipo === 'AJUDOU' ? 0.9 : 0.6,
    })
  }

  // Ações ativas → acompanhamento
  for (const acao of dados.acoesAtivas ?? []) {
    items.push({
      id: gerarId(),
      tipo: 'acao',
      origem: 'Action Engine',
      categoria: acao.categoria,
      momento: (acao as any).criadaEm ? new Date((acao as any).criadaEm).toISOString() : agora.toISOString(),
      explicacao: acao.status === 'EM_ANDAMENTO'
        ? `Acompanhando: ${acao.titulo}`
        : `Ação criada: ${acao.titulo}`,
      impacto: acao.status === 'EM_ANDAMENTO' ? 'Em progresso' : 'Aguardando execução',
    })
  }

  // Outcomes → resultados registrados
  for (const oc of dados.topOutcomes ?? []) {
    items.push({
      id: gerarId(),
      tipo: 'outcome',
      origem: oc.origem ?? 'Outcome Engine',
      categoria: oc.categoria,
      momento: oc.criadoEm ? new Date(oc.criadoEm).toISOString() : agora.toISOString(),
      explicacao: oc.descricao,
      impacto: 'Resultado registrado no patrimônio cognitivo',
      confianca: oc.confianca,
    })
  }

  // Impacto → evolução
  if (dados.impacto) {
    if (dados.impacto.evolucaoGeral > 0) {
      items.push({
        id: gerarId(),
        tipo: 'evidencia',
        origem: 'Outcome Engine',
        categoria: 'GESTAO',
        momento: agora.toISOString(),
        explicacao: `Empresa evoluiu ${dados.impacto.evolucaoGeral}%`,
        impacto: 'Evolução geral confirmada',
      })
    }
    for (const mp of dados.impacto.mudancasPositivas) {
      items.push({
        id: gerarId(),
        tipo: 'evidencia',
        origem: 'Outcome Engine',
        categoria: mp.categoria,
        momento: agora.toISOString(),
        explicacao: `Mudança positiva: ${mp.descricao}`,
        impacto: 'Área em evolução',
      })
    }
    for (const mn of dados.impacto.mudancasNegativas) {
      items.push({
        id: gerarId(),
        tipo: 'evidencia',
        origem: 'Outcome Engine',
        categoria: mn.categoria,
        momento: agora.toISOString(),
        explicacao: `Atenção necessária: ${mn.descricao}`,
        impacto: 'Área merece atenção',
      })
    }
  }

  // Ativação → nível da jornada
  if (dados.jornada) {
    items.push({
      id: gerarId(),
      tipo: 'ativacao',
      origem: 'Activation Engine',
      categoria: 'GESTAO',
      momento: agora.toISOString(),
      explicacao: `Nível de ativação: ${dados.jornada.nivel} (${dados.jornada.progresso}%)`,
      impacto: dados.jornada.eventos.length > 0
        ? `${dados.jornada.eventos.length} evento(s) de ativação registrado(s)`
        : 'Jornada do fundador em andamento',
    })
  }

  // Auditoria → conhecimento
  if (dados.auditoria && dados.auditoria.totalConhecimentos > 0) {
    items.push({
      id: gerarId(),
      tipo: 'conhecimento',
      origem: 'Knowledge Governance',
      categoria: 'GESTAO',
      momento: agora.toISOString(),
      explicacao: `${dados.auditoria.conhecimentosPromovidos} conhecimento(s) aprovados de ${dados.auditoria.totalConhecimentos}`,
      impacto: `Score médio: ${dados.auditoria.scoreMedio}`,
      confianca: dados.auditoria.scoreMedio / 100,
    })
  }

  // Workflows → planos ativos
  for (const wf of workflows) {
    items.push({
      id: gerarId(),
      tipo: 'workflow',
      origem: wf.origem,
      categoria: wf.categoria,
      momento: agora.toISOString(),
      explicacao: wf.concluido
        ? `Workflow concluído: ${wf.titulo}`
        : `Workflow ativo: ${wf.titulo} (${wf.progresso}%)`,
      impacto: wf.concluido ? 'Ciclo concluído' : 'Aguardando execução',
    })
  }

  // Journeys → visão de futuro
  for (const j of journeys) {
    const etapaInfo = j.etapaAtual <= j.totalEtapas
      ? `Etapa ${j.etapaAtual} de ${j.totalEtapas}`
      : 'Concluído'
    items.push({
      id: gerarId(),
      tipo: 'jornada',
      origem: j.origem,
      categoria: j.categoria,
      momento: agora.toISOString(),
      explicacao: `${j.titulo} — ${etapaInfo}`,
      impacto: j.previsao?.impactoEsperado ?? 'Jornada em andamento',
      confianca: j.progresso / 100,
      relacoes: [j.workflowId],
    })
  }

  // Hipóteses ativas derivadas de feedback não confirmado
  const feedbackNaoAjudou = dados.feedbackRecente?.filter(fb => fb.tipo === 'NAO_AJUDOU') ?? []
  if (feedbackNaoAjudou.length > 0) {
    items.push({
      id: gerarId(),
      tipo: 'hipotese',
      origem: 'Feedback Engine',
      categoria: 'GESTAO',
      momento: agora.toISOString(),
      explicacao: `${feedbackNaoAjudou.length} hipótese(s) enfraquecida(s) por feedback negativo`,
      impacto: 'Revisar abordagem para estas ações',
      confianca: 0.4,
      relacoes: feedbackNaoAjudou.map(() => gerarId()),
    })
  }

  // Agrupar por período
  const secoes = agruparPorPeriodo(items)

  // Resumo
  const aprendizadosHoje = items.filter(i => i.tipo === 'feedback' && i.confianca && i.confianca < 0.7).length
  const mudancasHoje = items.filter(i => i.tipo === 'evidencia').length
  const confirmacoesHoje = items.filter(i => i.tipo === 'feedback' && i.confianca && i.confianca >= 0.7).length
  const hipotesesAtivas = items.filter(i => i.tipo === 'hipotese').length
  const acoesPendentes = workflows.filter(w => !w.concluido).length

  return {
    secoes,
    resumo: {
      aprendizadosHoje,
      mudancasHoje,
      confirmacoesHoje,
      hipotesesAtivas,
      acoesPendentes,
    },
  }
}
