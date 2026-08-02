import type { CognitiveWorkflow } from './cognitive-workflow-engine'

export interface JourneyPrediction {
  impactoEsperado: string
  metrica: string
  prazoRevisao: string
  resultadoEsperado: string
}

export interface JourneyStep {
  id: string
  ordem: number
  titulo: string
  descricao: string
  tipo: 'acao' | 'resultado' | 'aprendizado' | 'evolucao' | 'decisao'
  etapaWorkflowId?: string
  concluido: boolean
}

export interface Journey {
  id: string
  workflowId: string
  titulo: string
  descricao: string
  categoria: string
  prioridade: 'alta' | 'media' | 'baixa'
  etapaAtual: number
  totalEtapas: number
  progresso: number
  etapas: JourneyStep[]
  previsao: JourneyPrediction | null
  origem: string
}

export interface JourneySummary {
  total: number
  ativas: number
  concluidas: number
  progressoMedio: number
  areas: { categoria: string; progresso: number }[]
}

type OutcomeBasico = { categoria: string; descricao: string; origem?: string }
type ImpactoBasico = { evolucaoGeral: number; areaMaisEvoluiu: { categoria: string; justificativa: string } | null; areaAtencao: { categoria: string; justificativa: string } | null }
type AtivacaoBasica = { nivel: string; progresso: number; proximosPassos: string[] }

function gerarId(): string {
  return `jny_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function construirPrevisao(
  workflow: CognitiveWorkflow,
  outcomes: OutcomeBasico[],
  impacto: ImpactoBasico,
  ativacao: AtivacaoBasica,
): JourneyPrediction | null {
  const outcomesRelacionados = outcomes.filter(
    o => o.categoria.toUpperCase() === workflow.categoria.toUpperCase()
  )

  const impactoEsperado = outcomesRelacionados.length > 0
    ? outcomesRelacionados[0].descricao
    : impacto.areaMaisEvoluiu?.categoria === workflow.categoria
      ? `${workflow.categoria} continuará evoluindo`
      : `Melhoria em ${workflow.categoria}`

  const metricas: Record<string, string> = {
    financeiro: 'Receita recebida / Inadimplência reduzida',
    clientes: 'Clientes reativados / Taxa de retorno',
    crm: 'Negociações avançadas em andamento',
    tarefas: 'Tarefas concluídas dentro do prazo',
    implantacoes: 'Implantações dentro do cronograma',
  }

  return {
    impactoEsperado,
    metrica: metricas[workflow.categoria] ?? 'Progresso geral',
    prazoRevisao: ativacao.proximosPassos.length > 0 ? 'Próxima revisão semanal' : 'Após conclusão das etapas',
    resultadoEsperado: impacto.evolucaoGeral > 0
      ? 'Confirmar continuidade da evolução'
      : 'Estabelecer linha de base para evolução',
  }
}

function construirEtapasJornada(workflow: CognitiveWorkflow, outcomes: OutcomeBasico[]): JourneyStep[] {
  const etapas: JourneyStep[] = []

  for (const ws of workflow.etapas) {
    etapas.push({
      id: `jstep_${ws.id}`,
      ordem: etapas.length + 1,
      titulo: ws.titulo,
      descricao: ws.descricao,
      tipo: 'acao',
      etapaWorkflowId: ws.id,
      concluido: ws.concluido,
    })
  }

  const outcomesRelacionados = outcomes.filter(
    o => o.categoria.toUpperCase() === workflow.categoria.toUpperCase()
  )

  for (const o of outcomesRelacionados.slice(0, 2)) {
    if (etapas.some(e => e.descricao.includes(o.descricao))) continue
    etapas.push({
      id: `jstep_out_${o.categoria}_${etapas.length}`,
      ordem: etapas.length + 1,
      titulo: 'Resultado esperado',
      descricao: o.descricao,
      tipo: 'resultado',
      concluido: false,
    })
  }

  etapas.push({
    id: `jstep_aprender_${workflow.id}`,
    ordem: etapas.length + 1,
    titulo: 'Nova descoberta',
    descricao: 'A Ponte registra o que funcionou e fortalece o conhecimento',
    tipo: 'aprendizado',
    concluido: false,
  })

  return etapas
}

export function gerarJornadas(
  workflows: CognitiveWorkflow[],
  outcomes: OutcomeBasico[],
  impacto: ImpactoBasico,
  ativacao: AtivacaoBasica,
): Journey[] {
  if (workflows.length === 0) return []

  return workflows.map((wf) => {
    const etapas = construirEtapasJornada(wf, outcomes)
    const concluidas = etapas.filter(e => e.concluido).length
    const etapaAtual = etapas.findIndex(e => !e.concluido)
    const progresso = Math.round((concluidas / etapas.length) * 100)

    return {
      id: gerarId(),
      workflowId: wf.id,
      titulo: wf.titulo,
      descricao: wf.descricao,
      categoria: wf.categoria,
      prioridade: wf.prioridade,
      etapaAtual: etapaAtual >= 0 ? etapaAtual + 1 : etapas.length,
      totalEtapas: etapas.length,
      progresso,
      etapas,
      previsao: construirPrevisao(wf, outcomes, impacto, ativacao),
      origem: wf.origem,
    }
  })
}

export function resumirJornadas(jornadas: Journey[]): JourneySummary {
  const ativas = jornadas.filter(j => !j.etapas.every(e => e.concluido))
  const concluidas = jornadas.filter(j => j.etapas.every(e => e.concluido))
  const progressoMedio = jornadas.length > 0
    ? Math.round(jornadas.reduce((acc, j) => acc + j.progresso, 0) / jornadas.length)
    : 0

  const areasMap = new Map<string, number[]>()
  for (const j of jornadas) {
    const arr = areasMap.get(j.categoria) ?? []
    arr.push(j.progresso)
    areasMap.set(j.categoria, arr)
  }
  const areas = Array.from(areasMap.entries()).map(([categoria, progressos]) => ({
    categoria,
    progresso: Math.round(progressos.reduce((a, b) => a + b, 0) / progressos.length),
  }))

  return {
    total: jornadas.length,
    ativas: ativas.length,
    concluidas: concluidas.length,
    progressoMedio,
    areas,
  }
}
