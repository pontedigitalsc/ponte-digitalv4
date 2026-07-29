// ─────────────────────────────────────────────────────────────────────────────
// COGNITIVE EXPERIENCE ENGINE
//
// Transforma o estado cognitivo (produzido pelos motores e organizado pelo
// Orchestrator) em experiências específicas para cada interface.
//
// Não produz conhecimento. Não interpreta. Não decide.
// Apenas transforma conhecimento em percepção humana.
//
// Depende exclusivamente da interface pública do Orchestrator.
// ─────────────────────────────────────────────────────────────────────────────

import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import type { ExperienceAction } from './cognitive-action-composer'
import { gerarActions } from './cognitive-action-composer'
import type { CognitiveWorkflow } from './cognitive-workflow-engine'
import { gerarWorkflows } from './cognitive-workflow-engine'
import type { Journey, JourneySummary } from './cognitive-journey-engine'
import { gerarJornadas, resumirJornadas } from './cognitive-journey-engine'
import type { TimelineExperience as _TimelineExperience, TimelineResumo as _TimelineResumo } from './cognitive-timeline-engine'
import { gerarTimeline } from './cognitive-timeline-engine'
import type { CognitiveNotification } from './cognitive-notification-engine'
import { gerarNotificacoes } from './cognitive-notification-engine'
import type { CognitiveBriefing } from './cognitive-briefing-engine'
import { gerarBriefing } from './cognitive-briefing-engine'
import type { HealthScore } from './cognitive-health-engine'
import { calcularHealthScore } from './cognitive-health-engine'
import type { CognitiveEvolution } from './cognitive-evolution-engine'
import { calcularEvolucao } from './cognitive-evolution-engine'
import type { KnowledgeAge } from './knowledge-aging-engine'
import { avaliarEnvelhecimento } from './knowledge-aging-engine'
import type { ConfidenceDrift } from './confidence-drift-engine'
import { calcularDrift } from './confidence-drift-engine'
import type { CognitiveMilestone } from './cognitive-milestone-engine'
import { gerarMilestones } from './cognitive-milestone-engine'
import type { CompanyMaturity } from './company-maturity-engine'
import { calcularMaturidade } from './company-maturity-engine'
import { construirCentroCognitivo } from './centro-cognitivo-engine'
import { melhorDecisao } from './decision-engine'
import { gerarOportunidades } from './growth-opportunity-engine'
import type { GrowthEngineOutput } from './growth-opportunity-engine'
import { gerarMapaCalor } from './cognitive-heatmap-engine'
import type { MapaCalor } from './cognitive-heatmap-engine'
import { gerarCenarios } from './cognitive-brainstorm-engine'
import type { CenarioAlternativo } from './cognitive-brainstorm-engine'
import { consultarMemoria } from './cognitive-memory-engine'
import type { Decisao } from './decision-engine'
import { obterEstadoPatrimonio } from './cognitive-heritage-facade'
import { gerarNarrativaEmpresarial } from './cognitive-narrative-engine'
import type { NarrativaEmpresarial } from './cognitive-narrative-engine'
import { gerarAlertasCognitivos } from './cognitive-alert-engine'
import type { SaidaAlertas } from './cognitive-alert-engine'
import { construirCiclosDecisao } from './decision-learning-cycle-engine'
import type { ResumoCiclos } from './decision-learning-cycle-engine'
import { calcularCapacidadeAdaptativa } from './adaptive-capacity-engine'
import type { AdaptiveCapacity } from './adaptive-capacity-engine'
import { calcularCapitalCognitivo } from './cognitive-capital-engine'
import { gerarCurvaEvolutiva } from './cognitive-curve-engine'
import { gerarRadarCapacidades } from './cognitive-radar-engine'
import { gerarComparacoesAntesDepois } from './cognitive-before-after-engine'
import { gerarAnaliseClareza } from './clarity-engine'
import type { AnaliseClareza } from './clarity-engine'
import { construirMemoriaEstrategica } from './strategic-memory-engine'
import type { MemoriaEstrategica } from './strategic-memory-engine'
import { gerarVisaoFundador } from './founder-panel-engine'
import type { FundadorVisaoDiaria } from './founder-panel-engine'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { listarAprendizados, contagemPorCategoria as contagemAprendizados, obterPerguntasRapidas } from './aprendizado-service'
import type { AprendizadoItem } from './aprendizado-service'

export interface EvolutionPlatformFields {
  evolution: CognitiveEvolution
  knowledgeAge: KnowledgeAge[]
  confidenceDrift: ConfidenceDrift[]
  milestones: CognitiveMilestone[]
  companyMaturity: CompanyMaturity
}

// ─── 1. CONTRATOS PÚBLICOS ────────────────────────────────────────────────

export interface Narrativa {
  id: string
  titulo: string
  texto: string
  tom: 'descoberta' | 'alerta' | 'evolucao' | 'inicio' | 'continuidade'
  momento: 'dashboard' | 'assistente' | 'login'
}

export interface Insight {
  id: string
  tipo: 'descoberta' | 'alerta' | 'confirmacao' | 'aprendizado'
      | 'recomendacao' | 'impacto' | 'atencao' | 'evolucao'
  prioridade: 'alta' | 'media' | 'baixa'
  mensagem: string
  explicacao: string
  acao?: { rotulo: string; href: string }
  confianca: number
  origem: string
  categoria: string
  timestamp: Date
}

export interface ImpactSummary {
  evolucaoGeral: number
  areaMaisEvoluiu: { categoria: string; descricao: string } | null
  areaAtencao: { categoria: string; descricao: string } | null
  aprendizadosRecentes: number
}

export interface MetricSummary {
  rotulo: string
  valor: string
  variacao: number | null
  tendencia: 'positiva' | 'negativa' | 'estavel'
}

export type ExperienceBlock =
  | (Insight & { tipoBloco: 'insight' })
  | (ImpactSummary & { tipoBloco: 'impact-summary' })
  | (MetricSummary & { tipoBloco: 'metric-summary' })

export interface CognitiveOSFields {
  notifications: CognitiveNotification[]
  briefing: CognitiveBriefing | null
  healthScore: HealthScore | null
}

export interface BaseExperience extends CognitiveOSFields {
  narrativa: Narrativa
  foco: { rotulo: string; href: string } | null
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

export interface CentroCognitivoData {
  estadoGeral: { status: 'POSITIVO' | 'ATENCAO' | 'CRITICO'; titulo: string; resumo: string }
  statusAtual: { scoreMaturidade: number; nivelMaturidade: string; scoreSaude: number; confiancaMedia: number; areasExploradas: number; totalAreas: number }
  mudancas: { evolucaoGeral: number; variacaoMaturidade: number; principaisMudancas: Array<{ area: string; tipo: 'POSITIVA' | 'NEGATIVA' | 'ATENCAO'; descricao: string }> }
  pontosAtencao: Array<{ categoria: string; descricao: string; severidade: 'ALTA' | 'MEDIA' | 'BAIXA' }>
  melhorDecisao: { titulo: string; descricao: string; impacto: string; confianca: number; urgencia: number } | null
  decisaoCompleta: Decisao | null
  aprendizadosRecentes: number
}

export interface DashboardExperience extends BaseExperience {
  centroCognitivo: CentroCognitivoData
  oportunidades: GrowthEngineOutput
  timeline: _TimelineExperience
  mapaCalor: MapaCalor
  cenarios: CenarioAlternativo[]
  memoriasRecentes: Array<{ tipo: string; descricao: string; data: Date; confianca?: number }>
  totalMemorias: number
  idadeMediaMemorias: number
  patrimonioScore: number
  patrimonioAtivos: number
  patrimonioMaiorConfianca: number
  totalHipoteses: number
  totalDescartados: number
  evolucaoMaturidade: number
  narrativaEmpresarial: import('./cognitive-narrative-engine').NarrativaEmpresarial | null
  alertasCognitivos: import('./cognitive-alert-engine').SaidaAlertas
  ciclosDecisao: import('./decision-learning-cycle-engine').ResumoCiclos
  capacidadeAdaptativa: import('./adaptive-capacity-engine').AdaptiveCapacity
  curvaEvolutiva: import('./cognitive-curve-engine').CurvaEvolutiva
  capitalCognitivo: import('./cognitive-capital-engine').CapitalCognitivo
  radarCapacidades: import('./cognitive-radar-engine').RadarCapacidades
  antesDepois: import('./cognitive-before-after-engine').AntesDepoisEngine
  analiseClareza: import('./clarity-engine').AnaliseClareza
  memoriaEstrategica: import('./strategic-memory-engine').MemoriaEstrategica
  visaoFundador: import('./founder-panel-engine').FundadorVisaoDiaria
}

export interface SidebarExperience extends CognitiveOSFields {
  foco: { rotulo: string; href: string } | null
  nivelAtivacao: { nivel: string; progresso: number; rotulo: string; cor: string }
}

export interface AssistenteExperience extends BaseExperience {
  sugestoes: string[]
  insightPrincipal: Insight | null
  memoriaInicial: string | null
  contexto: { empresaConhecida: boolean; nivelAtivacao: string }
}

export interface ModulosLiberados {
  modulos: string[]
  todosLiberados: boolean
}

export interface LoginExperience {
  narrativa: Narrativa | null
  redirectAposLogin: string
}

// ─── 2. EXPERIENCES ESPECIALIZADAS ─────────────────────────────────────────

// ─── 2a. Financeiro Experience ──────────────────────────────────────────────
export interface FinanceiroExperience {
  narrativa: Narrativa
  tendencia: { rotulo: string; valor: string; direcao: 'positiva' | 'negativa' | 'neutra' } | null
  principaisRiscos: Insight[]
  oportunidades: Insight[]
  recomendacoes: Insight[]
  focoFinanceiro: { rotulo: string; descricao: string } | null
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 2b. CRM Experience ─────────────────────────────────────────────────────
export interface PipelineNarrative {
  saudacao: string
  resumo: string
  tom: 'crescendo' | 'desacelerando' | 'estavel' | 'alerta'
}

export interface CRMExperience {
  narrativa: Narrativa
  pipelineNarrative: PipelineNarrative
  leadsParados: Insight[]
  receitaPrevista: { total: number; detalhes: { estagio: string; valor: number }[] }
  insights: Insight[]
  recomendacoes: Insight[]
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 2c. Clientes (lista) Experience ────────────────────────────────────────
export interface ClientePrioridade {
  clienteId: string
  nome: string
  status: string
  risco: 'alto' | 'medio' | 'baixo'
  ultimaInteracao: string | null
  recomendacao: string
}

export interface ClientesExperience {
  narrativa: Narrativa
  clientesPorPrioridade: ClientePrioridade[]
  insights: Insight[]
  recomendacoes: Insight[]
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 2d. Cliente (individual) Experience ────────────────────────────────────
export interface CognicaoCliente {
  oQueSabemos: string[]
  oQueMudou: string[]
  mereceAtencao: string[]
  proximaMelhorAcao: string | null
  linhaDoTempo: Array<{ data: string; tipo: string; descricao: string }>
}

export interface ClienteExperience {
  narrativa: Narrativa
  cognicao: CognicaoCliente
  insights: Insight[]
  recomendacoes: Insight[]
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 2e. Tarefas Experience ────────────────────────────────────────────────
export interface GrupoTarefas {
  rotulo: string
  justificativa: string
  tarefas: Array<{ id: string; titulo: string; status: string; prioridade: string; dataVencimento: string | null }>
}

export interface TarefasExperience {
  narrativa: Narrativa
  plano: GrupoTarefas[]
  insights: Insight[]
  recomendacoes: Insight[]
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 2f. Histórico Experience ──────────────────────────────────────────────
export interface EventoAgrupado {
  tipo: 'descoberta' | 'confirmacao' | 'mudanca' | 'aprendizado'
  descricao: string
  data: string
  detalhes?: string
}

export interface HistoricoExperience {
  narrativa: Narrativa
  eventos: EventoAgrupado[]
  evolucaoEmpresa: string | null
  insights: Insight[]
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 2g. Implantações Experience ────────────────────────────────────────────
export interface ImplantacaoCritica {
  id: string
  titulo: string
  cliente: string | null
  risco: 'critico' | 'atencao' | 'normal'
  motivo: string
  sugestao: string
}

export interface ImplantacoesExperience {
  narrativa: Narrativa
  criticas: ImplantacaoCritica[]
  insights: Insight[]
  recomendacoes: Insight[]
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 2h. Configurações Experience ───────────────────────────────────────────
export interface MaturidadeCognitiva {
  nivelAtivacao: string
  conhecimentosAprovados: number
  hipotesesAtivas: number
  lacunasIdentificadas: string[]
  evolucaoGeral: number
  narrativaEmpresa: string
}

export interface ConfiguracoesExperience {
  narrativa: Narrativa
  maturidade: MaturidadeCognitiva
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 2i. Conhecimento Experience ──────────────────────────────────────────
export interface ConhecimentoItem {
  id: string
  descricao: string
  categoria: string
  scoreConfianca: number
  origem: string
  ultimaValidacao: string | null
  criadoEm: string
  status: 'HIPOTESE' | 'EM_OBSERVACAO' | 'CONFIRMADO' | 'DESCARTADO'
  podePromover: boolean
}

export interface CategoriaCount {
  categoria: string
  total: number
  confirmados: number
  scoreMedio: number
}

export interface TimelineEvent {
  id: string
  tipo: string
  descricao: string
  categoria: string
  data: string
}

export interface ConhecimentoExperience {
  narrativa: Narrativa
  resumo: {
    total: number
    confirmados: number
    hipotesesAtivas: number
    descartados: number
    scoreMedio: number
    criadosEstaSemana: number
  }
  conhecimentos: ConhecimentoItem[]
  categorias: CategoriaCount[]
  timeline: TimelineEvent[]
  insights: Insight[]
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 2j. Learning Experience (aprendizados explícitos) ────────────────────

export interface AprendizadoExplicito {
  id: string
  descricao: string
  categoria: string
  origem: string
  contexto: string | null
  criadoEm: string
}

export interface PerguntaRapida {
  pergunta: string
  categoria: string
  contexto: string
}

export interface LearningExperience {
  narrativa: Narrativa
  resumo: {
    total: number
    porCategoria: Array<{ categoria: string; total: number }>
  }
  aprendizados: AprendizadoExplicito[]
  perguntasRapidas: PerguntaRapida[]
  insights: Insight[]
  blocks: ExperienceBlock[]
  actions: ExperienceAction[]
  workflows: CognitiveWorkflow[]
}

// ─── 3. JOURNEY EXPERIENCE ────────────────────────────────────────────────

export interface JourneyExperience {
  narrativa: Narrativa
  jornadas: Journey[]
  sumario: JourneySummary
}

// ─── 4. TIMELINE EXPERIENCE ───────────────────────────────────────────────

// TimelineExperience re-exportado do cognitive-timeline-engine
export type TimelineExperience = _TimelineExperience
export type TimelineResumo = _TimelineResumo

// ─── 5. HOME EXPERIENCE ───────────────────────────────────────────────────

export interface HomeExperience extends DashboardExperience {}

export type EvolutionExperience = BaseExperience & EvolutionPlatformFields

// ─── 6. INTERFACE DO ORCHESTRATOR ─────────────────────────────────────────

export interface OrchestratorInterface {
  obterEstadoCognitivoCompleto: (
    empresaId: string,
    opcoes?: { incluirAuditoria?: boolean; registrarVisualizacao?: boolean }
  ) => Promise<EstadoCognitivoCompleto>
}

// ─── 5. BUILDERS INTERNOS ─────────────────────────────────────────────────

// ─── 5a. Narrative Builder ─────────────────────────────────────────────────

type TomNarrativa = Narrativa['tom']

const MAPA_CATEGORIA_LINK: Record<string, { rotulo: string; href: string }> = {
  FINANCEIRO:  { rotulo: 'Organizar fluxo de caixa', href: '/financeiro' },
  CLIENTES:    { rotulo: 'Acompanhar clientes',      href: '/clientes' },
  OPERACAO:    { rotulo: 'Revisar operação',         href: '/tarefas' },
  GESTAO:      { rotulo: 'Organizar gestão',         href: '/dashboard' },
  PESSOAS:     { rotulo: 'Gerir equipe',             href: '/dashboard' },
  PRODUTO:     { rotulo: 'Acompanhar produto',       href: '/dashboard' },
  ESTRATEGIA:  { rotulo: 'Revisar estratégia',       href: '/assistente' },
}

const ROTULO_NIVEL: Record<string, string> = {
  NOVO: 'Novo',
  CONHECENDO: 'Conhecendo',
  ATIVO: 'Ativo',
  ENGAJADO: 'Engajado',
  FUNDADOR_VALIDADO: 'Fundador Validado',
}

const COR_NIVEL: Record<string, string> = {
  NOVO: 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300',
  CONHECENDO: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
  ATIVO: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
  ENGAJADO: 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400',
  FUNDADOR_VALIDADO: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
}

let contadorNarrativa = 0

function gerarId(): string {
  return `exp_${++contadorNarrativa}_${Date.now()}`
}

function construirNarrativa(
  estado: EstadoCognitivoCompleto,
  momento: Narrativa['momento']
): Narrativa {
  const { contexto, decisao, feedbackRecente, impacto, jornada, identidade } = estado

  const empresaConhecida = identidade?.empresaConhecida ?? false
  const temFeedback = feedbackRecente.length > 0
  const temDecisao = !!decisao
  const temEvolucao = impacto.evolucaoGeral > 0

  // Determina tom e conteúdo
  let tom: TomNarrativa = 'continuidade'
  let titulo = 'De onde paramos'
  let texto = 'Continuando de onde paramos.'

  if (!empresaConhecida || jornada.nivel === 'NOVO') {
    tom = 'inicio'
    titulo = 'Vamos começar'
    texto = 'Ainda estamos conhecendo sua empresa. Cada conversa me ajuda a entender melhor seus desafios.'
  } else if (temFeedback) {
    tom = 'descoberta'
    titulo = 'Aprendizados recentes'
    const fb = feedbackRecente[0]
    const rotuloFeedback: Record<string, string> = {
      AJUDOU: 'funcionou bem',
      AJUDOU_PARCIALMENTE: 'funcionou parcialmente',
      NAO_AJUDOU: 'não funcionou como esperado',
      NAO_EXECUTADA: 'não foi executada',
    }
    texto = `Com base no seu feedback, a ação "${(fb as any).acao?.titulo ?? ''}" ${rotuloFeedback[(fb as any).tipo] ?? 'foi avaliada'}.`
    if ((fb as any).tipo === 'AJUDOU') texto += ' Isso confirmou o que estávamos aprendendo.'
    if ((fb as any).tipo === 'NAO_AJUDOU') texto += ' Ajustei meu entendimento com base nisso.'
  } else if (temEvolucao) {
    tom = 'evolucao'
    titulo = 'Sua evolução'
    const areaDestaque = impacto.areaMaisEvoluiu
      ? `A área que mais evoluiu foi ${impacto.areaMaisEvoluiu.categoria}.`
      : ''
    texto = `Desde nossa última conversa, sua empresa evoluiu ${impacto.evolucaoGeral}%. ${areaDestaque}`
    if (impacto.areaAtencao) {
      texto += ` Identificamos que ${impacto.areaAtencao.categoria} merece atenção.`
    }
  } else if (contexto && contexto.confianca > 0.5) {
    tom = 'alerta'
    titulo = 'Onde está seu foco'
    texto = `Nas últimas semanas identificamos que o centro de atenção da sua empresa está em ${contexto.prioridade}. ${contexto.motivo}`
  } else if (temDecisao && empresaConhecida) {
    tom = 'alerta'
    titulo = 'Uma decisão merece atenção'
    texto = `Analisando todos os dados, ${decisao!.titulo}. ${decisao!.motivo}`
  }

  return {
    id: gerarId(),
    titulo,
    texto,
    tom,
    momento,
  }
}

// ─── 5b. Insight Builder ───────────────────────────────────────────────────

function construirInsight(
  tipo: Insight['tipo'],
  mensagem: string,
  explicacao: string,
  confianca: number,
  categoria: string,
  origem: string,
  acao?: { rotulo: string; href: string }
): Insight {
  const prioridade = confianca >= 0.7 ? 'alta' : confianca >= 0.4 ? 'media' : 'baixa'
  return {
    id: gerarId(),
    tipo,
    prioridade,
    mensagem,
    explicacao,
    acao,
    confianca: Math.round(confianca * 100),
    origem,
    categoria,
    timestamp: new Date(),
  }
}

function extrairInsights(estado: EstadoCognitivoCompleto): Insight[] {
  const insights: Insight[] = []
  const { contexto, decisao, acoesAtivas, feedbackRecente, impacto, topOutcomes } = estado

  // Insights de decisão
  if (decisao) {
    insights.push(construirInsight(
      'recomendacao',
      decisao.titulo,
      decisao.motivo,
      decisao.confianca,
      decisao.categoria,
      'Decision Engine',
      acoesAtivas.length < 3
        ? { rotulo: 'Criar ação', href: '/assistente' }
        : { rotulo: 'Ver no assistente', href: '/assistente' },
    ))
  }

  // Insights de evolução
  if (impacto.evolucaoGeral > 0) {
    if (impacto.areaMaisEvoluiu) {
      insights.push(construirInsight(
        'evolucao',
        `${impacto.areaMaisEvoluiu.categoria} evoluiu`,
        impacto.areaMaisEvoluiu.justificativa,
        0.8,
        impacto.areaMaisEvoluiu.categoria,
        'Outcome Engine',
      ))
    }
    if (impacto.areaAtencao) {
      insights.push(construirInsight(
        'atencao',
        `${impacto.areaAtencao.categoria} merece atenção`,
        impacto.areaAtencao.justificativa,
        0.6,
        impacto.areaAtencao.categoria,
        'Outcome Engine',
      ))
    }
  }

  // Insights de feedback
  for (const fb of feedbackRecente.slice(0, 2)) {
    const fbData = fb as any
    if (fbData.tipo === 'AJUDOU') {
      insights.push(construirInsight(
        'confirmacao',
        `${fbData.acao?.titulo ?? 'Ação'} confirmada`,
        'O feedback indicou que a ação funcionou como esperado.',
        0.9,
        fbData.acao?.categoria ?? 'GESTAO',
        'Feedback Engine',
      ))
    } else if (fbData.tipo === 'NAO_AJUDOU') {
      insights.push(construirInsight(
        'aprendizado',
        `${fbData.acao?.titulo ?? 'Ação'} não funcionou`,
        'O feedback indicou que a ação não gerou o resultado esperado. Hipótese enfraquecida.',
        0.7,
        fbData.acao?.categoria ?? 'GESTAO',
        'Feedback Engine',
      ))
    }
  }

  // Insights de ações ativas
  for (const acao of acoesAtivas.slice(0, 2)) {
    insights.push(construirInsight(
      'impacto',
      `Acompanhando: ${acao.titulo}`,
      acao.descricao,
      acao.status === 'EM_ANDAMENTO' ? 0.6 : 0.4,
      acao.categoria,
      'Action Engine',
    ))
  }

  return insights
}

// ─── 5c. Recommendation Builder ────────────────────────────────────────────

function extrairRecomendacoes(estado: EstadoCognitivoCompleto): Insight[] {
  const recomendacoes: Insight[] = []
  const { decisao, acoesAtivas, feedbackRecente } = estado

  if (decisao && acoesAtivas.length < 3) {
    recomendacoes.push(construirInsight(
      'recomendacao',
      `Criar ação para: ${decisao.titulo}`,
      'Com base na decisão atual, criar uma ação concreta aumenta as chances de evolução.',
      0.8,
      decisao.categoria,
      'Recommendation Builder',
      { rotulo: 'Criar ação', href: '/assistente' },
    ))
  }

  const feedbackPendente = feedbackRecente.filter(
    (fb: any) => fb.tipo === 'NAO_EXECUTADA'
  )
  if (feedbackPendente.length > 0) {
    recomendacoes.push(construirInsight(
      'recomendacao',
      'Revisar ação não executada',
      'Uma ação foi marcada como não executada. Que tal revisar o planejamento?',
      0.5,
      'GESTAO',
      'Recommendation Builder',
      { rotulo: 'Revisar', href: '/assistente' },
    ))
  }

  return recomendacoes
}

// ─── 5d. Focus Builder ────────────────────────────────────────────────────

function determinarFoco(
  estado: EstadoCognitivoCompleto
): { rotulo: string; href: string } | null {
  const { contexto, jornada, identidade } = estado

  if (!identidade?.empresaConhecida || jornada.nivel === 'NOVO') {
    return { rotulo: 'Conhecer minha empresa', href: '/conversa' }
  }

  if (contexto && contexto.confianca > 0.5) {
    return MAPA_CATEGORIA_LINK[contexto.prioridade] ?? null
  }

  return null
}

// ─── 5e. Experience Factory ───────────────────────────────────────────────

function factoryBuildBlocks(estado: EstadoCognitivoCompleto): ExperienceBlock[] {
  const blocks: ExperienceBlock[] = []
  const insights = extrairInsights(estado)
  const recomendacoes = extrairRecomendacoes(estado)

  // 1. Recomendações primeiro (alta prioridade)
  for (const rec of recomendacoes) {
    blocks.push({ ...rec, tipoBloco: 'insight' as const })
  }

  // 2. Insights por prioridade
  const insightsOrdenados = [...insights].sort((a, b) => {
    const peso = { alta: 3, media: 2, baixa: 1 }
    return (peso[b.prioridade] ?? 0) - (peso[a.prioridade] ?? 0)
  })

  for (const ins of insightsOrdenados) {
    blocks.push({ ...ins, tipoBloco: 'insight' as const })
  }

  // 3. Impact summary (se houver dados)
  if (estado.impacto.evolucaoGeral > 0) {
    blocks.push({
      tipoBloco: 'impact-summary' as const,
      evolucaoGeral: estado.impacto.evolucaoGeral,
      areaMaisEvoluiu: estado.impacto.areaMaisEvoluiu
        ? { categoria: estado.impacto.areaMaisEvoluiu.categoria, descricao: estado.impacto.areaMaisEvoluiu.justificativa }
        : null,
      areaAtencao: estado.impacto.areaAtencao
        ? { categoria: estado.impacto.areaAtencao.categoria, descricao: estado.impacto.areaAtencao.justificativa }
        : null,
      aprendizadosRecentes: estado.feedbackRecente.length,
    })
  }

  return blocks
}

// ─── 5f. Financeiro Factory ──────────────────────────────────────────────

function construirFinanceiroExperience(estado: EstadoCognitivoCompleto): FinanceiroExperience {
  const { contexto, impacto, decisao, acoesAtivas, feedbackRecente } = estado
  const narrativa = construirNarrativa(estado, 'dashboard')

  // Tendência baseada em evolução geral
  const tendencia = impacto.evolucaoGeral > 0
    ? { rotulo: 'Evolução', valor: `${impacto.evolucaoGeral}%`, direcao: 'positiva' as const }
    : impacto.areaAtencao?.categoria === 'FINANCEIRO'
    ? { rotulo: 'Atenção', valor: impacto.areaAtencao.justificativa, direcao: 'negativa' as const }
    : null

  // Riscos
  const principaisRiscos: Insight[] = []
  if (impacto.areaAtencao && impacto.areaAtencao.categoria === 'FINANCEIRO') {
    principaisRiscos.push(construirInsight(
      'atencao', 'Risco financeiro identificado',
      impacto.areaAtencao.justificativa, 0.7, 'FINANCEIRO', 'Outcome Engine',
    ))
  }
  if (contexto?.prioridade === 'FINANCEIRO' && contexto.confianca > 0.5) {
    principaisRiscos.push(construirInsight(
      'alerta', `Foco em ${contexto.prioridade}`,
      contexto.motivo, contexto.confianca, 'FINANCEIRO', 'Context Engine',
    ))
  }

  // Oportunidades
  const oportunidades: Insight[] = []
  if (impacto.mudancasPositivas.length > 0) {
    for (const m of impacto.mudancasPositivas.filter(p => p.categoria === 'FINANCEIRO').slice(0, 2)) {
      oportunidades.push(construirInsight(
        'impacto', `${m.categoria} em evolução`,
        m.descricao, 0.8, 'FINANCEIRO', 'Outcome Engine',
      ))
    }
  }

  // Recomendações
  const recomendacoes: Insight[] = []
  if (decisao && ['FINANCEIRO', 'CLIENTES'].includes(decisao.categoria)) {
    recomendacoes.push(construirInsight(
      'recomendacao', decisao.titulo, decisao.motivo, decisao.confianca,
      decisao.categoria, 'Decision Engine',
      acoesAtivas.length < 3 ? { rotulo: 'Criar ação', href: '/assistente' } : undefined,
    ))
  }
  if (feedbackRecente.some((fb: any) => fb.tipo === 'NAO_EXECUTADA')) {
    recomendacoes.push(construirInsight(
      'recomendacao', 'Revisar ações financeiras',
      'Há ações financeiras não executadas. Revisar o planejamento pode evitar riscos.',
      0.6, 'FINANCEIRO', 'Recommendation Builder',
    ))
  }

  // Foco
  const focoFinanceiro = contexto?.prioridade === 'FINANCEIRO' && contexto.confianca > 0.5
    ? { rotulo: 'Organizar fluxo de caixa', descricao: contexto.motivo }
    : null

  // Blocks
  const blocks: ExperienceBlock[] = [
    ...principaisRiscos.map(r => ({ ...r, tipoBloco: 'insight' as const })),
    ...oportunidades.map(r => ({ ...r, tipoBloco: 'insight' as const })),
    ...recomendacoes.map(r => ({ ...r, tipoBloco: 'insight' as const })),
  ]

  const todosInsightsFinanceiro = [...principaisRiscos, ...oportunidades, ...recomendacoes]
  return { narrativa, tendencia, principaisRiscos, oportunidades, recomendacoes, focoFinanceiro, blocks, actions: gerarActions(todosInsightsFinanceiro), workflows: gerarWorkflows(todosInsightsFinanceiro, []) }
}

// ─── 5g. CRM Factory ─────────────────────────────────────────────────────

function construirCRMExperience(estado: EstadoCognitivoCompleto): CRMExperience {
  const { contexto, impacto, decisao, acoesAtivas } = estado
  const narrativa = construirNarrativa(estado, 'dashboard')

  // Pipeline narrative
  const temEvolucao = impacto.evolucaoGeral > 0
  const prioridadeCRM = contexto?.prioridade === 'CLIENTES'
  let tom: PipelineNarrative['tom'] = 'estavel'
  if (temEvolucao && impacto.areaMaisEvoluiu?.categoria === 'CLIENTES') tom = 'crescendo'
  else if (impacto.areaAtencao?.categoria === 'CLIENTES') tom = 'alerta'
  else if ((contexto?.confianca ?? 0) < 0.3) tom = 'desacelerando'

  let resumo = 'O pipeline de vendas está estável.'
  if (tom === 'crescendo') resumo = `O pipeline está crescendo — ${impacto.areaMaisEvoluiu?.justificativa}`
  if (tom === 'alerta') resumo = `Atenção necessária no pipeline — ${impacto.areaAtencao?.justificativa}`
  if (tom === 'desacelerando') resumo = 'O pipeline desacelerou. Identificar novos negócios pode ajudar.'

  const pipelineNarrative: PipelineNarrative = {
    saudacao: prioridadeCRM ? 'Acompanhando seus clientes.' : 'Visão geral do pipeline.',
    resumo,
    tom,
  }

  // Leads parados
  const leadsParados: Insight[] = []
  if (decisao && ['CLIENTES', 'GESTAO'].includes(decisao.categoria)) {
    leadsParados.push(construirInsight(
      'atencao', 'Oportunidades precisam de ação',
      decisao.motivo, 0.6, 'CLIENTES', 'Decision Engine',
      { rotulo: 'Ver pipeline', href: '/crm' },
    ))
  }

  // Receita prevista (do estado cognitivo — topOutcomes ou contexto)
  const receitaPrevista = {
    total: 0,
    detalhes: [] as { estagio: string; valor: number }[],
  }

  // Insights gerais
  const insights: Insight[] = []
  if (impacto.mudancasPositivas.length > 0) {
    for (const m of impacto.mudancasPositivas.filter(p => p.categoria === 'CLIENTES').slice(0, 2)) {
      insights.push(construirInsight(
        'impacto', `Clientes: ${m.descricao}`, `${m.categoria} em evolução`,
        0.7, 'CLIENTES', 'Outcome Engine',
      ))
    }
  }

  // Recomendações
  const recomendacoes: Insight[] = []
  if (!prioridadeCRM) {
    recomendacoes.push(construirInsight(
      'recomendacao', 'Explorar oportunidades comerciais',
      'Revisar o pipeline de vendas pode revelar novas oportunidades.',
      0.5, 'CLIENTES', 'Recommendation Builder',
      { rotulo: 'Ver CRM', href: '/crm' },
    ))
  }

  const blocks: ExperienceBlock[] = [
    ...leadsParados.map(r => ({ ...r, tipoBloco: 'insight' as const })),
    ...insights.map(r => ({ ...r, tipoBloco: 'insight' as const })),
    ...recomendacoes.map(r => ({ ...r, tipoBloco: 'insight' as const })),
  ]

  const todosInsightsCRM = [...leadsParados, ...insights, ...recomendacoes]
  return { narrativa, pipelineNarrative, leadsParados, receitaPrevista, insights, recomendacoes, blocks, actions: gerarActions(todosInsightsCRM), workflows: gerarWorkflows(todosInsightsCRM, []) }
}

// ─── 5h. Clientes (lista) Factory ─────────────────────────────────────────

function construirClientesExperience(estado: EstadoCognitivoCompleto): ClientesExperience {
  const { contexto, impacto, decisao, acoesAtivas } = estado
  const narrativa = construirNarrativa(estado, 'dashboard')

  const clientesPorPrioridade: ClientePrioridade[] = []

  // Constrói insights e recomendações a partir do estado cognitivo
  const insights: Insight[] = []
  if (impacto.mudancasPositivas.filter(p => p.categoria === 'CLIENTES').length > 0) {
    insights.push(construirInsight(
      'evolucao', 'Base de clientes ativa',
      'Há movimentação positiva na base de clientes.', 0.7, 'CLIENTES', 'Outcome Engine',
    ))
  }
  if (impacto.areaAtencao?.categoria === 'CLIENTES') {
    insights.push(construirInsight(
      'atencao', 'Clientes merecem atenção',
      impacto.areaAtencao.justificativa, 0.6, 'CLIENTES', 'Outcome Engine',
    ))
  }

  const recomendacoes: Insight[] = []
  if (decisao && decisao.categoria === 'CLIENTES') {
    recomendacoes.push(construirInsight(
      'recomendacao', decisao.titulo, decisao.motivo,
      decisao.confianca, 'CLIENTES', 'Decision Engine',
      { rotulo: 'Ver cliente', href: `/clientes/${(decisao as any).id}` },
    ))
  }
  if (acoesAtivas.filter(a => a.categoria === 'CLIENTES').length > 0) {
    recomendacoes.push(construirInsight(
      'impacto', `${acoesAtivas.filter(a => a.categoria === 'CLIENTES').length} ação(ões) em clientes ativa(s)`,
      'Acompanhe o progresso das ações nos clientes.', 0.5, 'CLIENTES', 'Action Engine',
    ))
  }

  const blocks: ExperienceBlock[] = [
    ...insights.map(r => ({ ...r, tipoBloco: 'insight' as const })),
    ...recomendacoes.map(r => ({ ...r, tipoBloco: 'insight' as const })),
  ]

  const todosInsightsClientes = [...insights, ...recomendacoes]
  return { narrativa, clientesPorPrioridade, insights, recomendacoes, blocks, actions: gerarActions(todosInsightsClientes), workflows: gerarWorkflows(todosInsightsClientes, []) }
}
// ─── 5i. Cliente (individual) Factory ─────────────────────────────────────

function construirClienteExperience(estado: EstadoCognitivoCompleto, _clienteNome: string): ClienteExperience {
  const { contexto, decisao, feedbackRecente } = estado
  const impacto = estado.impacto
  const narrativa = construirNarrativa(estado, 'dashboard')

  const temMemoria = (contexto?.memoriaRecente?.length ?? 0) > 0

  const oQueSabemos: string[] = []
  if (contexto?.evidenciasChave) {
    for (const ev of contexto.evidenciasChave) oQueSabemos.push(ev.descricao)
  }
  if (estado.identidade?.verdadesEstaveis) {
    for (const v of estado.identidade.verdadesEstaveis) oQueSabemos.push(v)
  }

  const oQueMudou = contexto?.mudancasRecentes ?? []
  const mereceAtencao: string[] = []
  if (impacto.areaAtencao) mereceAtencao.push(impacto.areaAtencao.justificativa)
  if (impacto.areaAtencao?.categoria === 'CLIENTES') mereceAtencao.push(`Área afetada: ${impacto.areaAtencao.categoria}`)

  const proximaMelhorAcao = decisao ? `${decisao.titulo}: ${decisao.motivo}` : null

  const linhaDoTempo: Array<{ data: string; tipo: string; descricao: string }> = []
  if (temMemoria) {
    for (const m of contexto!.memoriaRecente!.slice(0, 5)) {
      linhaDoTempo.push({ data: '', tipo: m.tipo, descricao: m.descricao })
    }
  }
  for (const fb of feedbackRecente.slice(0, 3)) {
    const fbData = fb as any
    linhaDoTempo.push({
      data: fbData.criadoEm ? new Date(fbData.criadoEm).toISOString().slice(0, 10) : '',
      tipo: fbData.tipo === 'AJUDOU' ? 'confirmacao' : 'aprendizado',
      descricao: `Feedback: ${fbData.acao?.titulo ?? ''} — ${fbData.tipo}`,
    })
  }

  const insights: Insight[] = []
  if (decisao) {
    insights.push(construirInsight(
      'recomendacao', decisao.titulo, decisao.motivo,
      decisao.confianca, decisao.categoria, 'Decision Engine',
    ))
  }

  const recomendacoes: Insight[] = []
  if (proximaMelhorAcao) {
    recomendacoes.push(construirInsight(
      'recomendacao', proximaMelhorAcao,
      'Com base no que sabemos sobre este cliente.', 0.6, 'CLIENTES', 'Recommendation Builder',
    ))
  }

  const blocks: ExperienceBlock[] = [
    ...insights.map(r => ({ ...r, tipoBloco: 'insight' as const })),
    ...recomendacoes.map(r => ({ ...r, tipoBloco: 'insight' as const })),
  ]

  return {
    narrativa,
    cognicao: { oQueSabemos, oQueMudou, mereceAtencao, proximaMelhorAcao, linhaDoTempo },
    insights,
    recomendacoes,
    blocks,
    actions: gerarActions([...insights, ...recomendacoes]),
    workflows: gerarWorkflows([...insights, ...recomendacoes], []),
  }
}

// ─── 5j. Tarefas Factory ─────────────────────────────────────────────────

function construirTarefasExperience(estado: EstadoCognitivoCompleto): TarefasExperience {
  const { contexto, decisao, acoesAtivas, impacto } = estado
  const narrativa = construirNarrativa(estado, 'dashboard')

  const planoTarefas: GrupoTarefas[] = []

  // Grupo 1: Decisão atual
  if (decisao) {
    planoTarefas.push({
      rotulo: `📌 Prioridade: ${decisao.titulo}`,
      justificativa: `Concluir primeiro resolve ${decisao.categoria.toLowerCase()}.`,
      tarefas: acoesAtivas
        .filter(a => a.categoria === decisao.categoria)
        .map(a => ({
          id: a.id, titulo: a.titulo, status: a.status,
          prioridade: 'alta', dataVencimento: (a as any).dataVencimento ?? null,
        })),
    })
  }

  // Grupo 2: Ações em andamento
  if (acoesAtivas.filter(a => a.status === 'EM_ANDAMENTO').length > 0) {
    planoTarefas.push({
      rotulo: '🔄 Em andamento',
      justificativa: 'Manter o ritmo evita acúmulo.',
      tarefas: acoesAtivas
        .filter(a => a.status === 'EM_ANDAMENTO')
        .map(a => ({
          id: a.id, titulo: a.titulo, status: a.status,
          prioridade: 'media', dataVencimento: (a as any).dataVencimento ?? null,
        })),
    })
  }

  // Grupo 3: Ações pendentes
  if (acoesAtivas.filter(a => a.status !== 'EM_ANDAMENTO').length > 0) {
    planoTarefas.push({
      rotulo: '⏳ Pendentes',
      justificativa: 'Programar estas ações evita que se tornem urgentes.',
      tarefas: acoesAtivas
        .filter(a => a.status !== 'EM_ANDAMENTO')
        .map(a => ({
          id: a.id, titulo: a.titulo, status: a.status,
          prioridade: 'baixa', dataVencimento: (a as any).dataVencimento ?? null,
        })),
    })
  }

  const insights: Insight[] = []
  if (impacto.evolucaoGeral > 0) {
    insights.push(construirInsight(
      'evolucao', `Empresa evoluiu ${impacto.evolucaoGeral}%`,
      'As ações estão gerando resultado.', 0.7, 'GESTAO', 'Outcome Engine',
    ))
  }

  const recomendacoes: Insight[] = []
  if (planoTarefas.length > 0) {
    recomendacoes.push(construirInsight(
      'recomendacao', `Concluir ${planoTarefas[0].tarefas.length} tarefa(s) primeiro`,
      planoTarefas[0].justificativa, 0.6, 'GESTAO', 'Recommendation Builder',
    ))
  }

  const blocks: ExperienceBlock[] = [
    ...insights.map(r => ({ ...r, tipoBloco: 'insight' as const })),
    ...recomendacoes.map(r => ({ ...r, tipoBloco: 'insight' as const })),
  ]

  const todosInsightsTarefas = [...insights, ...recomendacoes]
  return { narrativa, plano: planoTarefas, insights, recomendacoes, blocks, actions: gerarActions(todosInsightsTarefas), workflows: gerarWorkflows(todosInsightsTarefas, []) }
}

// ─── 5k. Histórico Factory ────────────────────────────────────────────────

function construirHistoricoExperience(estado: EstadoCognitivoCompleto): HistoricoExperience {
  const { feedbackRecente, contexto, impacto } = estado
  const narrativa = construirNarrativa(estado, 'dashboard')

  const eventos: EventoAgrupado[] = []

  // Feedbacks → aprendizados
  for (const fb of feedbackRecente) {
    const fbData = fb as any
    let tipo: EventoAgrupado['tipo'] = 'aprendizado'
    if (fbData.tipo === 'AJUDOU') tipo = 'confirmacao'
    else if (fbData.tipo === 'NAO_AJUDOU') tipo = 'aprendizado'
    else if (fbData.tipo === 'NAO_EXECUTADA') tipo = 'mudanca'

    eventos.push({
      tipo,
      descricao: `${fbData.acao?.titulo ?? 'Ação'} — ${fbData.tipo}`,
      data: fbData.criadoEm ? new Date(fbData.criadoEm).toISOString().slice(0, 10) : '',
      detalhes: fbData.comentario ?? undefined,
    })
  }

  // Memória recente → descobertas/mudanças
  if (contexto?.memoriaRecente) {
    for (const m of contexto.memoriaRecente) {
      eventos.push({
        tipo: (m.tipo as EventoAgrupado['tipo']),
        descricao: m.descricao,
        data: '',
      })
    }
  }

  // Mudanças recentes → mudanças
  if (contexto?.mudancasRecentes) {
    for (const m of contexto.mudancasRecentes) {
      eventos.push({
        tipo: 'mudanca',
        descricao: m,
        data: '',
      })
    }
  }

  // Evolução
  const evolucaoEmpresa = impacto.evolucaoGeral > 0
    ? `Sua empresa evoluiu ${impacto.evolucaoGeral}% no período. ${impacto.areaMaisEvoluiu ? `Destaque: ${impacto.areaMaisEvoluiu.categoria}.` : ''}`
    : null

  const insights: Insight[] = []
  if (eventos.filter(e => e.tipo === 'confirmacao').length > 0) {
    insights.push(construirInsight(
      'confirmacao', `${eventos.filter(e => e.tipo === 'confirmacao').length} confirmação(ões)`,
      'Ações que funcionaram como esperado.', 0.8, 'GESTAO', 'Feedback Engine',
    ))
  }
  if (eventos.filter(e => e.tipo === 'aprendizado').length > 0) {
    insights.push(construirInsight(
      'aprendizado', `${eventos.filter(e => e.tipo === 'aprendizado').length} aprendizado(s)`,
      'Ações que geraram novos entendimentos.', 0.6, 'GESTAO', 'Feedback Engine',
    ))
  }

  const blocks: ExperienceBlock[] = insights.map(r => ({ ...r, tipoBloco: 'insight' as const }))

  return { narrativa, eventos, evolucaoEmpresa, insights, blocks, actions: gerarActions(insights), workflows: gerarWorkflows(insights, []) }
}

// ─── 5l. Implantações Factory ─────────────────────────────────────────────

function construirImplantacoesExperience(estado: EstadoCognitivoCompleto): ImplantacoesExperience {
  const { contexto, decisao, acoesAtivas, impacto } = estado
  const narrativa = construirNarrativa(estado, 'dashboard')

  const criticas: ImplantacaoCritica[] = []

  // Criticidade baseada em dados cognitivos
  if (impacto.areaAtencao?.categoria === 'OPERACAO') {
    criticas.push({
      id: `critica-${Date.now()}`,
      titulo: 'Operação merece atenção',
      cliente: null,
      risco: 'critico',
      motivo: impacto.areaAtencao.justificativa,
      sugestao: 'Revisar cronograma de implantações pode evitar atrasos.',
    })
  }

  if (acoesAtivas.filter(a => a.categoria === 'OPERACAO').length > 0) {
    criticas.push({
      id: `acoes-${Date.now()}`,
      titulo: `Ações em operação: ${acoesAtivas.filter(a => a.categoria === 'OPERACAO').length}`,
      cliente: null,
      risco: 'atencao',
      motivo: 'Há ações em andamento na área de operação.',
      sugestao: 'Acompanhar o progresso das implantações.',
    })
  }

  if (contexto?.prioridade === 'OPERACAO' && contexto.confianca > 0.5) {
    criticas.push({
      id: `contexto-${Date.now()}`,
      titulo: 'Implantações são prioridade',
      cliente: null,
      risco: 'atencao',
      motivo: contexto.motivo,
      sugestao: 'Organizar o cronograma pode liberar recursos.',
    })
  }

  const insights: Insight[] = []
  if (decisao && decisao.categoria === 'OPERACAO') {
    insights.push(construirInsight(
      'recomendacao', decisao.titulo, decisao.motivo,
      decisao.confianca, 'OPERACAO', 'Decision Engine',
    ))
  }

  const recomendacoes: Insight[] = []
  if (criticas.length > 0) {
    recomendacoes.push(construirInsight(
      'recomendacao', `${criticas.length} ponto(s) crítico(s) identificado(s)`,
      'Revisar as implantações indicadas reduz riscos.', 0.7, 'OPERACAO', 'Recommendation Builder',
    ))
  }

  const blocks: ExperienceBlock[] = [
    ...insights.map(r => ({ ...r, tipoBloco: 'insight' as const })),
    ...recomendacoes.map(r => ({ ...r, tipoBloco: 'insight' as const })),
  ]

  const todosInsightsImplant = [...insights, ...recomendacoes]
  return { narrativa, criticas, insights, recomendacoes, blocks, actions: gerarActions(todosInsightsImplant), workflows: gerarWorkflows(todosInsightsImplant, []) }
}

// ─── 5m. Configurações Factory ───────────────────────────────────────────

function construirConfiguracoesExperience(
  estado: EstadoCognitivoCompleto,
  auditoria?: { conhecimentosPromovidos: number; totalConhecimentos: number; scoreMedio: number } | null,
): ConfiguracoesExperience {
  const { jornada, identidade, impacto, contexto } = estado
  const narrativa = construirNarrativa(estado, 'dashboard')

  const nivel = jornada.nivel
  const empresaConhecida = identidade?.empresaConhecida ?? false
  const lacunas: string[] = []

  if (!empresaConhecida) {
    lacunas.push('Ainda não conhecemos sua empresa — agende uma conversa.')
  }
  if (!contexto || contexto.confianca < 0.3) {
    lacunas.push('Nosso entendimento sobre sua empresa ainda é limitado.')
  }
  if (impacto.mudancasNegativas.length > 0) {
    for (const m of impacto.mudancasNegativas) {
      lacunas.push(`${m.categoria}: ${m.descricao}`)
    }
  }

  const maturidade: MaturidadeCognitiva = {
    nivelAtivacao: ROTULO_NIVEL[nivel] ?? nivel,
    conhecimentosAprovados: auditoria?.conhecimentosPromovidos ?? 0,
    hipotesesAtivas: (estado.identidade?.hipoteses?.length ?? 0),
    lacunasIdentificadas: lacunas.slice(0, 5),
    evolucaoGeral: impacto.evolucaoGeral,
    narrativaEmpresa: empresaConhecida
      ? 'Conhecemos sua empresa e estamos evoluindo juntos.'
      : 'Ainda estamos conhecendo sua empresa.',
  }

  return { narrativa, maturidade, blocks: [], actions: [], workflows: [] }
}

// ─── 5n. Conhecimento Factory ────────────────────────────────────────────

async function construirConhecimentoExperience(
  empresaId: string,
  estado: EstadoCognitivoCompleto,
): Promise<ConhecimentoExperience> {
  const [conhecimentos, hipotesesAtivas, memoria] = await Promise.all([
    prisma.conhecimentoValidado.findMany({
      where: { empresaId },
      orderBy: { criadoEm: 'desc' },
    }),
    prisma.hipotese.count({
      where: { empresaId, estado: { notIn: ['DESCARTADA', 'CONFIRMADA'] } },
    }),
    consultarMemoria(empresaId, 20),
  ])

  const criadosEstaSemana = conhecimentos.filter((c) => {
    const semanaAtras = Date.now() - 7 * 24 * 60 * 60 * 1000
    return c.criadoEm.getTime() > semanaAtras
  }).length

  const confirmados = conhecimentos.filter((c) => c.scoreConfianca >= 60).length
  const descartadosInferiores = conhecimentos.filter((c) => c.scoreConfianca < 20).length

  const scoreTotal = conhecimentos.reduce((acc, c) => acc + c.scoreConfianca, 0)
  const scoreMedio = conhecimentos.length > 0 ? Math.round(scoreTotal / conhecimentos.length) : 0

  const todosConhecimentos: ConhecimentoItem[] = conhecimentos.map((c) => ({
    id: c.id,
    descricao: c.descricao,
    categoria: c.categoria,
    scoreConfianca: c.scoreConfianca,
    origem: c.origem,
    ultimaValidacao: c.ultimaValidacao?.toISOString() ?? null,
    criadoEm: c.criadoEm.toISOString(),
    status: c.scoreConfianca >= 60 ? 'CONFIRMADO' : c.scoreConfianca < 20 ? 'DESCARTADO' : 'EM_OBSERVACAO',
    podePromover: c.scoreConfianca >= 50 && c.scoreConfianca < 60,
  }))

  const categorias = ['FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA'].map((cat) => {
    const items = conhecimentos.filter((c) => c.categoria === cat)
    const catScoreTotal = items.reduce((acc, c) => acc + c.scoreConfianca, 0)
    return {
      categoria: cat,
      total: items.length,
      confirmados: items.filter((c) => c.scoreConfianca >= 60).length,
      scoreMedio: items.length > 0 ? Math.round(catScoreTotal / items.length) : 0,
    }
  })

  const timeline: TimelineEvent[] = memoria
    .filter((m: any) => ['descoberta', 'mudanca', 'confirmacao', 'descarte', 'evolucao'].includes(m.tipo))
    .slice(0, 20)
    .map((m: any) => ({
      id: m.id,
      tipo: m.tipo,
      descricao: m.descricao,
      categoria: m.categoria,
      data: m.criadaEm?.toISOString?.() ?? new Date().toISOString(),
    }))

  const insights: Insight[] = []
  if (conhecimentos.length === 0) {
    insights.push(construirInsight(
      'descoberta', 'Nenhum conhecimento registrado ainda',
      'Conhecimentos são organizados a partir das conversas e interações com a Ponte.',
      0.5, 'GESTAO', 'Knowledge Vault',
      { rotulo: 'Conversar com Assistente', href: '/assistente' },
    ))
  }
  if (categorias.some((c) => c.total === 0)) {
    const estagnadas = categorias.filter((c) => c.total === 0).map((c) => c.categoria.toLowerCase())
    insights.push(construirInsight(
      'atencao', `${estagnadas.length} área(s) sem conhecimento`,
      `Nenhum conhecimento registrado em: ${estagnadas.join(', ')}.`,
      0.4, 'GESTAO', 'Knowledge Vault',
    ))
  }
  if (criadosEstaSemana > 0) {
    insights.push(construirInsight(
      'evolucao', `${criadosEstaSemana} conhecimento(s) novo(s) esta semana`,
      'Novos conhecimentos estão sendo organizados automaticamente.',
      0.7, 'GESTAO', 'Knowledge Vault',
    ))
  }

  const blocks: ExperienceBlock[] = insights.map((r) => ({ ...r, tipoBloco: 'insight' as const }))

  return {
    narrativa: construirNarrativa(estado, 'dashboard'),
    resumo: {
      total: conhecimentos.length,
      confirmados,
      hipotesesAtivas,
      descartados: descartadosInferiores,
      scoreMedio,
      criadosEstaSemana,
    },
    conhecimentos: todosConhecimentos,
    categorias,
    timeline,
    insights,
    blocks,
    actions: gerarActions(insights),
    workflows: gerarWorkflows(insights, []),
  }
}

// ─── 5o. Learning Factory ────────────────────────────────────────────────

async function construirLearningExperience(
  empresaId: string,
  estado: EstadoCognitivoCompleto,
): Promise<LearningExperience> {
  const [aprendizados, contagem] = await Promise.all([
    listarAprendizados(empresaId, { ativo: true }),
    contagemAprendizados(empresaId),
  ])

  const insights: Insight[] = []
  if (aprendizados.length === 0) {
    insights.push(construirInsight(
      'descoberta', 'Nenhum aprendizado registrado ainda',
      'Responda perguntas rápidas para ensinar preferências e regras da sua empresa.',
      0.5, 'GESTAO', 'Learning Engine',
    ))
  } else {
    insights.push(construirInsight(
      'evolucao', `${aprendizados.length} aprendizado(s) registrado(s)`,
      `Distribuídos em ${contagem.length} categoria(s).`,
      0.7, 'GESTAO', 'Learning Engine',
    ))
  }

  const blocks: ExperienceBlock[] = insights.map((r) => ({ ...r, tipoBloco: 'insight' as const }))

  return {
    narrativa: construirNarrativa(estado, 'dashboard'),
    resumo: {
      total: aprendizados.length,
      porCategoria: contagem,
    },
    aprendizados: aprendizados.map((a) => ({
      id: a.id,
      descricao: a.descricao,
      categoria: a.categoria,
      origem: a.origem,
      contexto: a.contexto,
      criadoEm: a.criadoEm,
    })),
    perguntasRapidas: obterPerguntasRapidas().map((p) => ({
      pergunta: p.pergunta,
      categoria: p.categoria,
      contexto: p.contexto,
    })),
    insights,
    blocks,
    actions: gerarActions(insights),
    workflows: gerarWorkflows(insights, []),
  }
}

function saudacaoPorNivel(nivel: string): string {
  const mapa: Record<string, string> = {
    NOVO: 'Ainda não nos conhecemos.',
    CONHECENDO: 'Já sei algumas coisas sobre sua empresa.',
    ATIVO: 'Que bom ver você de volta.',
    ENGAJADO: 'Estamos evoluindo juntos.',
    FUNDADOR_VALIDADO: 'É sempre bom encontrar quem confia na Ponte.',
  }
  return mapa[nivel] ?? 'Olá!'
}

function extrairSugestoes(estado: EstadoCognitivoCompleto): string[] {
  const sugestoes: string[] = []
  const { contexto, decisao, feedbackRecente, impacto } = estado

  if (contexto?.acaoSugerida) {
    sugestoes.push(contexto.acaoSugerida)
  }

  if (decisao) {
    sugestoes.push(`Explique: ${decisao.titulo}`)
  }

  if (contexto?.prioridade === 'FINANCEIRO') {
    sugestoes.push('Como está o fluxo de caixa hoje?')
  } else if (contexto?.prioridade === 'CLIENTES') {
    sugestoes.push('Como está o pipeline de vendas?')
  } else {
    sugestoes.push('Quais tarefas estão atrasadas?')
  }

  if (impacto.mudancasPositivas.length > 0) {
    sugestoes.push(`Explique: ${impacto.mudancasPositivas[0].descricao}`)
  }

  if (feedbackRecente.length > 0) {
    sugestoes.push('O que aprendemos com as ações recentes?')
  }

  if (contexto?.mudancasRecentes && contexto.mudancasRecentes.length > 0) {
    for (const m of contexto.mudancasRecentes.slice(0, 2)) {
      sugestoes.push(`Explique: ${m}`)
    }
  }

  return sugestoes.slice(0, 5)
}

// ─── 5f. Cognitive OS Fields Builder ─────────────────────────────────────

function construirOSFields(
  estado: EstadoCognitivoCompleto,
  insights: Insight[],
  actions: ExperienceAction[],
  workflows: CognitiveWorkflow[],
  journeys: Journey[],
): CognitiveOSFields {
  return {
    notifications: gerarNotificacoes({
      decisoes: estado.decisao ? [estado.decisao] : [],
      acoesAtivas: estado.acoesAtivas as any,
      feedbackRecente: estado.feedbackRecente as any,
      topOutcomes: estado.topOutcomes as any,
      jornada: estado.jornada,
      auditoria: estado.auditoria ?? undefined,
      journeys: journeys.map(j => ({ categoria: j.categoria, titulo: j.titulo, progresso: j.progresso })),
    }),
    briefing: gerarBriefing({
      impacto: estado.impacto,
      decisoes: estado.decisao ? [estado.decisao] : [],
      acoesAtivas: estado.acoesAtivas as any,
      feedbackRecente: estado.feedbackRecente as any,
      topOutcomes: estado.topOutcomes as any,
      journeys: journeys.map(j => ({ categoria: j.categoria, progresso: j.progresso })),
      jornada: estado.jornada,
    }),
    healthScore: calcularHealthScore({
      impacto: estado.impacto,
      jornada: estado.jornada,
      auditoria: estado.auditoria ?? undefined,
      acoesAtivas: estado.acoesAtivas as any,
      feedbackRecente: estado.feedbackRecente as any,
    }),
  }
}

async function construirEvolutionPlatformFields(
  empresaId: string,
  estado: EstadoCognitivoCompleto,
): Promise<EvolutionPlatformFields> {
  const [evolution, knowledgeAge, confidenceDrift, milestones, companyMaturity] = await Promise.all([
    calcularEvolucao(empresaId, estado),
    avaliarEnvelhecimento(empresaId),
    calcularDrift(empresaId),
    gerarMilestones(empresaId, estado),
    calcularMaturidade(empresaId, estado),
  ])

  return {
    evolution,
    knowledgeAge,
    confidenceDrift,
    milestones,
    companyMaturity,
  }
}

// ─── 6. EXPERIENCE ENGINE ─────────────────────────────────────────────────

export function createExperienceEngine(orchestrator: OrchestratorInterface) {
  return {
    // ─── Dashboard ──────────────────────────────────────────────────────
    async obterDashboardExperience(empresaId: string): Promise<DashboardExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false,
        registrarVisualizacao: true,
      })

      const insightsDashboard = [...extrairRecomendacoes(estado), ...extrairInsights(estado)]
      const actions = gerarActions(insightsDashboard)
      const workflows = gerarWorkflows(insightsDashboard, actions)
      const journeys = gerarJornadas(
        workflows,
        estado.topOutcomes.map(o => ({ categoria: (o as any).categoria ?? '', descricao: (o as any).descricao ?? '', origem: (o as any).origem })),
        {
          evolucaoGeral: estado.impacto.evolucaoGeral,
          areaMaisEvoluiu: estado.impacto.areaMaisEvoluiu,
          areaAtencao: estado.impacto.areaAtencao,
        },
        {
          nivel: estado.jornada.nivel,
          progresso: estado.jornada.progresso,
          proximosPassos: estado.jornada.proximosPassos,
        },
      )
      const [companyMaturity, evolution, decisao, mapaCalor, cenarios] = await Promise.all([
        calcularMaturidade(empresaId, estado),
        calcularEvolucao(empresaId, estado),
        melhorDecisao(empresaId),
        Promise.resolve(gerarMapaCalor(estado)),
        Promise.resolve(gerarCenarios(estado)),
      ])
      const osFields = construirOSFields(estado, insightsDashboard, actions, workflows, journeys)
      const oportunidades = gerarOportunidades(estado, companyMaturity, osFields.healthScore, evolution)
      const milestones = await gerarMilestones(empresaId, estado).catch(() => [])
      return {
        narrativa: construirNarrativa(estado, 'dashboard'),
        foco: determinarFoco(estado),
        blocks: factoryBuildBlocks(estado),
        actions,
        workflows,
        ...osFields,
        centroCognitivo: construirCentroCognitivo(
          estado,
          osFields.healthScore,
          companyMaturity,
          evolution,
          decisao,
          estado.topOutcomes.length,
        ),
        oportunidades,
        timeline: gerarTimeline(
          { feedbackRecente: estado.feedbackRecente as any, acoesAtivas: estado.acoesAtivas as any, topOutcomes: estado.topOutcomes as any, jornada: estado.jornada, auditoria: estado.auditoria ?? undefined, impacto: estado.impacto },
          journeys, workflows,
        ),
        mapaCalor,
        cenarios,
        memoriasRecentes: [],
        totalMemorias: 0,
        idadeMediaMemorias: 0,
        patrimonioScore: 0,
        patrimonioAtivos: 0,
        patrimonioMaiorConfianca: 0,
        totalHipoteses: 0,
        totalDescartados: 0,
        evolucaoMaturidade: 0,
        narrativaEmpresarial: null,
        alertasCognitivos: { alertas: [], resumo: '', prioridadeDoMomento: '' },
        ciclosDecisao: { ciclos: [], ciclosCompletos: 0, totalCiclos: 0, taxaAprendizado: 0, proximoPasso: '' },
        capacidadeAdaptativa: { scoreGeral: 0, variacaoGeral: 0, capacidades: [], nivelGeral: '', maiorCapacidade: '', menorCapacidade: '' },
        curvaEvolutiva: { pontos: [], capacidades: [], totais: {}, maiorEvolucao: { capacidade: '', variacao: 0 }, tendenciaGeral: 'ESTAVEL', historiaCompleta: '' },
        capitalCognitivo: { scoreTotal: 0, variacaoMensal: 0, componentes: [], scoreAnterior: 0, scoreAtual: 0, nivel: 'INICIAL' },
        radarCapacidades: { muitoForte: [], forte: [], emEvolucao: [], critica: [], areasQuentes: [], sugestaoFoco: '' },
        antesDepois: { comparacoes: [], totalMelhorias: 0, resumoGeral: '' },
        analiseClareza: { ondeEstamos: '', oQueMudou: '', oQueImporta: '', oQuePodeEsperar: '', proximoMelhorMovimento: '', capacidadeFortalecida: '' },
        memoriaEstrategica: { registros: [], totalRegistros: 0, taxaAcertos: 0, maioresAprendizados: [], padroesIdentificados: [] },
        visaoFundador: { evolucaoEmpresa: '', patrimonioCresceu: '', capacidadeEstagnada: '', conhecimentoNovo: '', rfcsCriadas: 0, hipotesesQueMorreram: 0, scoreCapacidadeAdaptativa: 0, scoreCapitalCognitivo: 0, tendencia: 'ESTAVEL', sugestaoFoco: '', maiorAprendizado: '', riscoPrincipal: '' },
      }
    },

    // ─── Sidebar ────────────────────────────────────────────────────────
    async obterSidebarExperience(empresaId: string): Promise<SidebarExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId)

      const nivel = estado.jornada.nivel
      const insights = [...extrairRecomendacoes(estado), ...extrairInsights(estado)]
      const actions = gerarActions(insights)
      const workflows = gerarWorkflows(insights, actions)
      const journeys = gerarJornadas(
        workflows,
        estado.topOutcomes.map(o => ({ categoria: (o as any).categoria ?? '', descricao: (o as any).descricao ?? '', origem: (o as any).origem })),
        {
          evolucaoGeral: estado.impacto.evolucaoGeral,
          areaMaisEvoluiu: estado.impacto.areaMaisEvoluiu,
          areaAtencao: estado.impacto.areaAtencao,
        },
        {
          nivel: estado.jornada.nivel,
          progresso: estado.jornada.progresso,
          proximosPassos: estado.jornada.proximosPassos,
        },
      )
      return {
        foco: determinarFoco(estado),
        nivelAtivacao: {
          nivel,
          progresso: estado.jornada.progresso,
          rotulo: ROTULO_NIVEL[nivel] ?? nivel,
          cor: COR_NIVEL[nivel] ?? 'bg-muted text-muted-foreground',
        },
        ...construirOSFields(estado, insights, actions, workflows, journeys),
      }
    },

    // ─── Assistente ─────────────────────────────────────────────────────
    async obterAssistenteExperience(empresaId: string): Promise<AssistenteExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        registrarVisualizacao: true,
      })

      const empresaConhecida = estado.identidade?.empresaConhecida ?? false
      const nivel = estado.jornada.nivel

      let memoriaInicial: string | null = null
      if (estado.contexto?.memoriaRecente && estado.contexto.memoriaRecente.length > 0) {
        memoriaInicial = estado.contexto.memoriaRecente[0].descricao
      }

      const insights = extrairInsights(estado)
      const recomendacoes = extrairRecomendacoes(estado)
      const insightPrincipal = insights.length > 0
        ? insights.sort((a, b) => {
            const peso = { alta: 3, media: 2, baixa: 1 }
            return (peso[b.prioridade] ?? 0) - (peso[a.prioridade] ?? 0)
          })[0]
        : null

      const actionsAssistente = gerarActions([...recomendacoes, ...insights])
      const workflowsAssistente = gerarWorkflows([...recomendacoes, ...insights], actionsAssistente)
      const journeysAssistente = gerarJornadas(
        workflowsAssistente,
        estado.topOutcomes.map(o => ({ categoria: (o as any).categoria ?? '', descricao: (o as any).descricao ?? '', origem: (o as any).origem })),
        {
          evolucaoGeral: estado.impacto.evolucaoGeral,
          areaMaisEvoluiu: estado.impacto.areaMaisEvoluiu,
          areaAtencao: estado.impacto.areaAtencao,
        },
        {
          nivel: estado.jornada.nivel,
          progresso: estado.jornada.progresso,
          proximosPassos: estado.jornada.proximosPassos,
        },
      )

      return {
        narrativa: construirNarrativa(estado, 'assistente'),
        foco: determinarFoco(estado),
        blocks: factoryBuildBlocks(estado),
        actions: actionsAssistente,
        workflows: workflowsAssistente,
        sugestoes: extrairSugestoes(estado),
        insightPrincipal,
        memoriaInicial,
        contexto: { empresaConhecida, nivelAtivacao: nivel },
        ...construirOSFields(estado, [...recomendacoes, ...insights], actionsAssistente, workflowsAssistente, journeysAssistente),
      }
    },

    // ─── Login ──────────────────────────────────────────────────────────
    async obterLoginExperience(
      empresaId?: string | null
    ): Promise<LoginExperience> {
      if (!empresaId) {
        return {
          narrativa: null,
          redirectAposLogin: '/conversa',
        }
      }

      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId)
      const empresaConhecida = estado.identidade?.empresaConhecida ?? false

      if (!empresaConhecida) {
        return {
          narrativa: {
            id: gerarId(),
            titulo: 'Bem-vindo de volta',
            texto: 'Ainda estamos conhecendo sua empresa. Vamos continuar de onde paramos?',
            tom: 'continuidade',
            momento: 'login',
          },
          redirectAposLogin: '/conversa',
        }
      }

      const temEvolucao = estado.impacto.evolucaoGeral > 0
      const texto = temEvolucao
        ? `Desde sua última visita, percebemos uma evolução de ${estado.impacto.evolucaoGeral}% na sua empresa. Vamos continuar exatamente de onde paramos.`
        : 'Desde sua última visita, continuamos analisando sua empresa. Vamos retomar o trabalho.'

      if (estado.decisao) {
        return {
          narrativa: {
            id: gerarId(),
            titulo: 'Temos novidades',
            texto: `Desde sua última visita, identificamos que ${estado.decisao.titulo}. ${texto}`,
            tom: 'alerta',
            momento: 'login',
          },
          redirectAposLogin: '/dashboard',
        }
      }

      return {
        narrativa: {
          id: gerarId(),
          titulo: 'Bem-vindo de volta',
          texto,
          tom: temEvolucao ? 'evolucao' : 'continuidade',
          momento: 'login',
        },
        redirectAposLogin: '/dashboard',
      }
    },

    // ─── Home Experience ─────────────────────────────────────────────────
    async obterHomeExperience(empresaId: string): Promise<HomeExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false,
        registrarVisualizacao: true,
      })

      const insights = [...extrairRecomendacoes(estado), ...extrairInsights(estado)]
      const actions = gerarActions(insights)
      const workflows = gerarWorkflows(insights, actions)
      const journeys = gerarJornadas(
        workflows,
        estado.topOutcomes.map(o => ({ categoria: (o as any).categoria ?? '', descricao: (o as any).descricao ?? '', origem: (o as any).origem })),
        {
          evolucaoGeral: estado.impacto.evolucaoGeral,
          areaMaisEvoluiu: estado.impacto.areaMaisEvoluiu,
          areaAtencao: estado.impacto.areaAtencao,
        },
        {
          nivel: estado.jornada.nivel,
          progresso: estado.jornada.progresso,
          proximosPassos: estado.jornada.proximosPassos,
        },
      )

      const [companyMaturity, evolution, decisao, mapaCalor, cenarios, memorias, patrimonio] = await Promise.all([
        calcularMaturidade(empresaId, estado),
        calcularEvolucao(empresaId, estado),
        melhorDecisao(empresaId),
        Promise.resolve(gerarMapaCalor(estado)),
        Promise.resolve(gerarCenarios(estado)),
        consultarMemoria(empresaId).catch(() => []),
        obterEstadoPatrimonio(empresaId).catch(() => null),
      ])
      const milestones = await gerarMilestones(empresaId, estado).catch(() => [])
      const oportunidades = gerarOportunidades(estado, companyMaturity, null, evolution as any)
      const capacidade = calcularCapacidadeAdaptativa(estado, companyMaturity.score)
      const ciclosDecisao = construirCiclosDecisao(estado)
      const osFields = construirOSFields(estado, insights, actions, workflows, journeys)

      const memoriasRecentes = memorias.map((m: any) => ({
        tipo: m.tipo ?? 'evidencia',
        descricao: m.descricao ?? '',
        data: m.criadaEm ?? m.createdAt ?? new Date(),
        confianca: m.confianca ?? undefined,
      }))
      const idadeMediaMemorias = memoriasRecentes.length > 0
        ? Math.round(memoriasRecentes.reduce((acc: number, m: any) => {
            const idade = (Date.now() - new Date(m.data).getTime()) / (1000 * 60 * 60 * 24)
            return acc + idade
          }, 0) / memoriasRecentes.length)
        : 0

      return {
        narrativa: construirNarrativa(estado, 'dashboard'),
        foco: determinarFoco(estado),
        blocks: factoryBuildBlocks(estado),
        actions,
        workflows,
        ...osFields,
        centroCognitivo: construirCentroCognitivo(
          estado,
          osFields.healthScore,
          companyMaturity,
          evolution,
          decisao,
          estado.topOutcomes.length,
        ),
        oportunidades,
        timeline: gerarTimeline(
          { feedbackRecente: estado.feedbackRecente as any, acoesAtivas: estado.acoesAtivas as any, topOutcomes: estado.topOutcomes as any, jornada: estado.jornada, auditoria: estado.auditoria ?? undefined, impacto: estado.impacto },
          journeys, workflows,
        ),
        mapaCalor,
        cenarios,
        memoriasRecentes,
        totalMemorias: memorias.length,
        idadeMediaMemorias,
        patrimonioScore: Math.round((patrimonio?.metricas?.scoreMedioAuditoria ?? 0) * 100),
        patrimonioAtivos: patrimonio?.metricas?.totalConhecimentos ?? 0,
        patrimonioMaiorConfianca: Math.round((patrimonio?.metricas?.scoreMedioAuditoria ?? 0) * 100),
        totalHipoteses: (estado.auditoria as any)?.totalHipoteses ?? 0,
        totalDescartados: (estado.auditoria as any)?.hipotesesDescartadas ?? 0,
        evolucaoMaturidade: companyMaturity.variacaoSemanal,
        narrativaEmpresarial: gerarNarrativaEmpresarial(estado, companyMaturity, evolution, milestones, oportunidades, mapaCalor, cenarios, capacidade, null, null),
        alertasCognitivos: gerarAlertasCognitivos(estado, companyMaturity, evolution, oportunidades, mapaCalor),
        ciclosDecisao,
        capacidadeAdaptativa: capacidade,
        curvaEvolutiva: gerarCurvaEvolutiva(capacidade, evolution),
        capitalCognitivo: calcularCapitalCognitivo(estado, companyMaturity, capacidade, ciclosDecisao),
        radarCapacidades: gerarRadarCapacidades(capacidade, mapaCalor, companyMaturity),
        antesDepois: gerarComparacoesAntesDepois(estado, capacidade, evolution, companyMaturity),
        analiseClareza: gerarAnaliseClareza(estado, companyMaturity, capacidade),
        memoriaEstrategica: construirMemoriaEstrategica(ciclosDecisao.ciclos),
        visaoFundador: gerarVisaoFundador(capacidade, calcularCapitalCognitivo(estado, companyMaturity, capacidade, ciclosDecisao), gerarRadarCapacidades(capacidade, mapaCalor, companyMaturity), evolution, gerarCurvaEvolutiva(capacidade, evolution), companyMaturity, milestones),
      }
    },

    // ─── Evolution Platform ──────────────────────────────────────────────
    async obterEvolutionExperience(empresaId: string): Promise<EvolutionExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: true,
        registrarVisualizacao: true,
      })

      const insights = [...extrairRecomendacoes(estado), ...extrairInsights(estado)]
      const actions = gerarActions(insights)
      const workflows = gerarWorkflows(insights, actions)
      const journeys = gerarJornadas(
        workflows,
        estado.topOutcomes.map(o => ({ categoria: (o as any).categoria ?? '', descricao: (o as any).descricao ?? '', origem: (o as any).origem })),
        {
          evolucaoGeral: estado.impacto.evolucaoGeral,
          areaMaisEvoluiu: estado.impacto.areaMaisEvoluiu,
          areaAtencao: estado.impacto.areaAtencao,
        },
        {
          nivel: estado.jornada.nivel,
          progresso: estado.jornada.progresso,
          proximosPassos: estado.jornada.proximosPassos,
        },
      )
      const evolutionFields = await construirEvolutionPlatformFields(empresaId, estado)

      return {
        narrativa: construirNarrativa(estado, 'dashboard'),
        foco: determinarFoco(estado),
        blocks: factoryBuildBlocks(estado),
        actions,
        workflows,
        ...construirOSFields(estado, insights, actions, workflows, journeys),
        ...evolutionFields,
      }
    },

    // ─── Cognitive OS (utility) ─────────────────────────────────────────
    async obterCognitiveOS(empresaId: string): Promise<CognitiveOSFields> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false,
        registrarVisualizacao: true,
      })

      const insights = [...extrairRecomendacoes(estado), ...extrairInsights(estado)]
      const actions = gerarActions(insights)
      const workflows = gerarWorkflows(insights, actions)
      const journeys = gerarJornadas(
        workflows,
        estado.topOutcomes.map(o => ({ categoria: (o as any).categoria ?? '', descricao: (o as any).descricao ?? '', origem: (o as any).origem })),
        {
          evolucaoGeral: estado.impacto.evolucaoGeral,
          areaMaisEvoluiu: estado.impacto.areaMaisEvoluiu,
          areaAtencao: estado.impacto.areaAtencao,
        },
        {
          nivel: estado.jornada.nivel,
          progresso: estado.jornada.progresso,
          proximosPassos: estado.jornada.proximosPassos,
        },
      )

      return construirOSFields(estado, insights, actions, workflows, journeys)
    },

    // ─── Financeiro ────────────────────────────────────────────────────
    async obterFinanceiroExperience(empresaId: string): Promise<FinanceiroExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false, registrarVisualizacao: true,
      })
      return construirFinanceiroExperience(estado)
    },

    // ─── CRM ───────────────────────────────────────────────────────────
    async obterCRMExperience(empresaId: string): Promise<CRMExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false, registrarVisualizacao: true,
      })
      return construirCRMExperience(estado)
    },

    // ─── Clientes (lista) ──────────────────────────────────────────────
    async obterClientesExperience(empresaId: string): Promise<ClientesExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false, registrarVisualizacao: true,
      })
      return construirClientesExperience(estado)
    },

    // ─── Cliente (individual) ──────────────────────────────────────────
    async obterClienteExperience(empresaId: string, clienteNome: string): Promise<ClienteExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false, registrarVisualizacao: true,
      })
      return construirClienteExperience(estado, clienteNome)
    },

    // ─── Tarefas ───────────────────────────────────────────────────────
    async obterTarefasExperience(empresaId: string): Promise<TarefasExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false, registrarVisualizacao: true,
      })
      return construirTarefasExperience(estado)
    },

    // ─── Histórico ────────────────────────────────────────────────────
    async obterHistoricoExperience(empresaId: string): Promise<HistoricoExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false, registrarVisualizacao: true,
      })
      return construirHistoricoExperience(estado)
    },

    // ─── Implantações ─────────────────────────────────────────────────
    async obterImplantacoesExperience(empresaId: string): Promise<ImplantacoesExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false, registrarVisualizacao: true,
      })
      return construirImplantacoesExperience(estado)
    },

    // ─── Configurações ────────────────────────────────────────────────
    async obterConfiguracoesExperience(empresaId: string): Promise<ConfiguracoesExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: true, registrarVisualizacao: true,
      })
      return construirConfiguracoesExperience(estado, estado.auditoria)
    },

    // ─── Conhecimento ─────────────────────────────────────────────────
    async obterConhecimentoExperience(empresaId: string): Promise<ConhecimentoExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: true, registrarVisualizacao: true,
      })
      return construirConhecimentoExperience(empresaId, estado)
    },

    // ─── Aprendizados ────────────────────────────────────────────────
    async obterLearningExperience(empresaId: string): Promise<LearningExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false, registrarVisualizacao: true,
      })
      return construirLearningExperience(empresaId, estado)
    },

    // ─── Journey ──────────────────────────────────────────────────────
    async obterJourneyExperience(empresaId: string): Promise<JourneyExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: false, registrarVisualizacao: true,
      })

      const insights = [...extrairInsights(estado), ...extrairRecomendacoes(estado)]
      const actions = gerarActions(insights)
      const workflows = gerarWorkflows(insights, actions)
      const jornadas = gerarJornadas(
        workflows,
        estado.topOutcomes.map(o => ({ categoria: (o as any).categoria ?? '', descricao: (o as any).descricao ?? '', origem: (o as any).origem })),
        {
          evolucaoGeral: estado.impacto.evolucaoGeral,
          areaMaisEvoluiu: estado.impacto.areaMaisEvoluiu,
          areaAtencao: estado.impacto.areaAtencao,
        },
        {
          nivel: estado.jornada.nivel,
          progresso: estado.jornada.progresso,
          proximosPassos: estado.jornada.proximosPassos,
        },
      )
      const sumario = resumirJornadas(jornadas)

      return {
        narrativa: construirNarrativa(estado, 'dashboard'),
        jornadas,
        sumario,
      }
    },

    // ─── Timeline ─────────────────────────────────────────────────────
    async obterTimelineExperience(empresaId: string): Promise<_TimelineExperience> {
      const estado = await orchestrator.obterEstadoCognitivoCompleto(empresaId, {
        incluirAuditoria: true, registrarVisualizacao: true,
      })

      const insights = [...extrairInsights(estado), ...extrairRecomendacoes(estado)]
      const actions = gerarActions(insights)
      const workflows = gerarWorkflows(insights, actions)
      const jornadas = gerarJornadas(
        workflows,
        estado.topOutcomes.map(o => ({ categoria: (o as any).categoria ?? '', descricao: (o as any).descricao ?? '', origem: (o as any).origem })),
        {
          evolucaoGeral: estado.impacto.evolucaoGeral,
          areaMaisEvoluiu: estado.impacto.areaMaisEvoluiu,
          areaAtencao: estado.impacto.areaAtencao,
        },
        {
          nivel: estado.jornada.nivel,
          progresso: estado.jornada.progresso,
          proximosPassos: estado.jornada.proximosPassos,
        },
      )

      return gerarTimeline(
        {
          feedbackRecente: estado.feedbackRecente as any,
          acoesAtivas: estado.acoesAtivas as any,
          topOutcomes: estado.topOutcomes as any,
          jornada: estado.jornada,
          auditoria: estado.auditoria ?? undefined,
          impacto: estado.impacto,
        },
        jornadas,
        workflows,
      )
    },

    // ─── Modulos Liberados ────────────────────────────────────────────
    async obterModulosLiberados(empresaId: string): Promise<ModulosLiberados> {
      const { prismaSeguro } = await import('@/lib/prisma-tenant-safe')
      const eventos = await prismaSeguro.eventoAtivacao.findMany({
        where: { empresaId },
        select: { tipo: true },
      })

      const tipos = new Set(eventos.map((e: { tipo: string }) => e.tipo))

      const diasEmpresa = await prismaSeguro.empresa.findUnique({
        where: { id: empresaId },
        select: { criadaEm: true },
      })

      const diasDesdeCriacao = diasEmpresa
        ? Math.floor((Date.now() - new Date(diasEmpresa.criadaEm).getTime()) / (1000 * 60 * 60 * 24))
        : 0

      const temDecisao = tipos.has('PRIMEIRA_DECISAO_VISTA')
      const temAcao = tipos.has('PRIMEIRA_ACAO_CRIADA')
      const temFeedback = tipos.has('PRIMEIRO_FEEDBACK')
      const temAcaoConcluida = tipos.has('PRIMEIRA_ACAO_CONCLUIDA')

      const modulos: string[] = ['inicio', 'assistente', 'decisoes']

      if (temAcao) modulos.push('tarefas')
      if (diasDesdeCriacao >= 3 || temDecisao) modulos.push('crm', 'clientes')
      if (diasDesdeCriacao >= 7 || temDecisao) modulos.push('financeiro')
      if (temFeedback) modulos.push('conhecimento')
      if (temAcaoConcluida) modulos.push('aprendizados')

      modulos.push('configuracoes')

      return {
        modulos,
        todosLiberados: diasDesdeCriacao >= 30 && temAcaoConcluida && temFeedback,
      }
    },
  }
}
