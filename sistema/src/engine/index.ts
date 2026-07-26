import type { Cliente, Tarefa } from '@/types'
import type { Sinal } from './tipos'
import { ordenarPorUrgencia } from './tipos'
import { gerarSinaisClientes } from './clientes.sinais'
import { gerarSinaisTarefas } from './tarefas.sinais'
import { gerarSinaisFinanceiro, type ResumoFinanceiroEntrada } from './financeiro.sinais'

export type { Sinal, DominioSinal, UrgenciaSinal, AcaoSugerida } from './tipos'
export type { ResumoFinanceiroEntrada } from './financeiro.sinais'
export { registrarEvidencia, consultarEvidencias, contagemPorCategoria } from './evidence-engine'
export type { DadosEvidencia, FiltroEvidencias } from './evidence-engine'
export type { CategoriaEvidencia, OrigemEvidencia, ConfiancaEvidencia } from './evidence-engine'
export { decidirContexto } from './cognitive-context-engine'
export { analisarEvolucao, atualizarEstadoHipotese, listarHipoteses, consultarMemoria, registrarNaMemoria } from './cognitive-memory-engine'
export { gerarDecisoes, melhorDecisao, classificarDecisoesPorPrioridade, enriquecerDecisoesComTrust, filtrarDecisoesPorRelevancia } from './decision-engine'
export type { Decisao } from './decision-engine'
export { criarAcao, listarAcoesAtivas } from './action-intelligence-engine'
export { construirIdentidade, obterIdentidade, interpretarRespostas, atualizarIdentidade } from './identity-engine'
export { registrarFeedback, listarFeedbackRecente } from './feedback-intelligence-engine'
export { registrarEventoAtivacao, calcularNivelAtivacao, obterJornadaFundador } from './founder-activation-engine'
export type { TipoEventoAtivacao } from '@prisma/client'
export { registrarOutcome, calcularImpactoEmpresa, principaisOutcomes } from './outcome-intelligence-engine'
export type { CategoriaOutcome, OrigemOutcome } from '@prisma/client'
export { validarHipoteses, promoverConhecimento, enfraquecerConhecimento, calcularConfiancaConhecimento, auditarConhecimento, obterConhecimentosAprovados } from './knowledge-governance-engine'
export { obterResumoCognitivo, obterEvolucaoDiaria, obterCategoriasMaisAprendidas, obterCategoriasEstagnadas, obterEmpresasMaisEvoluidas, obterAlertasGovernanca, obterMetricasPrimeiraExperiencia } from './cognitive-observatory'
export { criarConversa, responder, carregarConversa, obterEstado, vincularConversa, obterRespostas } from './conversation-engine'
export {
  obterEstadoCognitivoCompleto,
  processarConversa,
  processarAcao,
  processarFeedback,
  processarOutcome,
  processarCadastro,
  processarLogin,
  processarMudancaEmpresa,
  processarEvento,
} from './cognitive-orchestrator'
export type { EstadoCognitivoCompleto, ResultadoProcessamento } from './cognitive-orchestrator'
export {
  createExperienceEngine,
} from './cognitive-experience-engine'
export type {
  Narrativa,
  Insight,
  ImpactSummary,
  MetricSummary,
  ExperienceBlock,
  BaseExperience,
  DashboardExperience,
  SidebarExperience,
  AssistenteExperience,
  LoginExperience,
  FinanceiroExperience,
  CRMExperience,
  PipelineNarrative,
  ClientesExperience,
  ClientePrioridade,
  ClienteExperience,
  CognicaoCliente,
  TarefasExperience,
  GrupoTarefas,
  HistoricoExperience,
  EventoAgrupado,
  ImplantacoesExperience,
  ImplantacaoCritica,
  ConfiguracoesExperience,
  MaturidadeCognitiva,
  JourneyExperience,
  ConhecimentoExperience,
  ConhecimentoItem,
  CategoriaCount,
  TimelineEvent,
  LearningExperience,
  AprendizadoExplicito,
  PerguntaRapida,
} from './cognitive-experience-engine'
export { adicionarAprendizado, listarAprendizados, contagemPorCategoria as contagemAprendizados, aprendizadosParaContexto, aprendizadosRecentes, desativarAprendizado, obterPerguntasRapidas, obterPerguntaAleatoria, CATEGORIAS_APRENDIZADO, ORIGENS_APRENDIZADO } from './aprendizado-service'
export type { AprendizadoItem, CategoriaAprendizado, OrigemAprendizado, ContagemCategoria } from './aprendizado-service'
export type { TimelineExperience, CognitiveOSFields, HomeExperience, ModulosLiberados } from './cognitive-experience-engine'

export type { ExperienceAction } from './cognitive-action-composer'
export { gerarActions } from './cognitive-action-composer'

export type { CognitiveWorkflow, WorkflowStep } from './cognitive-workflow-engine'
export { gerarWorkflows } from './cognitive-workflow-engine'

export type { Journey, JourneyStep, JourneyPrediction, JourneySummary } from './cognitive-journey-engine'
export { gerarJornadas, resumirJornadas } from './cognitive-journey-engine'

export type { TimelineItem, TimelineGroup, TimelineSection, TimelineResumo, TimelineFilter } from './cognitive-timeline-engine'
export { gerarTimeline } from './cognitive-timeline-engine'

export type { CognitiveNotification, NotificacaoPrioridade } from './cognitive-notification-engine'
export { gerarNotificacoes } from './cognitive-notification-engine'

export type { CognitiveBriefing, BriefingPonto } from './cognitive-briefing-engine'
export { gerarBriefing } from './cognitive-briefing-engine'

export type { HealthScore, HealthScoreItem } from './cognitive-health-engine'
export { calcularHealthScore } from './cognitive-health-engine'

export type { CognitiveEvolution } from './cognitive-evolution-engine'
export { calcularEvolucao } from './cognitive-evolution-engine'

export type { KnowledgeAge } from './knowledge-aging-engine'
export { avaliarEnvelhecimento } from './knowledge-aging-engine'

export type { ConfidenceDrift } from './confidence-drift-engine'
export { calcularDrift } from './confidence-drift-engine'

export {
  EstadoConhecimento,
  FORGETTING_CONFIG,
  avaliar,
  getForgettingStats,
} from './forgetting-engine'
export type {
  EstadoMetadata,
  ForgettingConfig,
  ConhecimentoEstado,
  AvaliacaoResultado,
  ForgettingStats,
} from './forgetting-engine'

export {
  SYNTHESIS_CONFIG,
  identificarGrupos,
  gerarSintese,
  calcularConfianca,
  calcularScore,
  executarSintese,
  getSynthesisStats,
} from './synthesis-engine'
export type {
  SynthesisConfig,
  ConhecimentoParaSintese,
  GrupoSintese,
  Sintese,
  ResultadoSintese,
  SynthesisStats,
} from './synthesis-engine'

export {
  obterConhecimentos,
  avaliarEnvelhecimentoPatrimonio,
  avaliarEsquecimento,
  gerarSinteses,
  obterEstadoPatrimonio,
  obterMetricas,
} from './cognitive-heritage-facade'
export type {
  EntradaMemoriaFacade,
  EstadoPatrimonio,
  FacadeMetrics,
} from './cognitive-heritage-facade'

export type { CognitiveMilestone } from './cognitive-milestone-engine'
export { gerarMilestones } from './cognitive-milestone-engine'

export { EventPublisher, EventValidationError } from './event-publisher'
export type { PublicarParams, PublishResult, EventPublisherConfig, SalvarEventoFn } from './event-publisher'

export {
  EVENTOS_NEGOCIO, EVENTOS_COGNITIVOS, EVENTOS_ENTRADA, EVENTOS_SAIDA, EVENTOS_PIPELINE,
  ehEventoValido, categoriaDoEvento,
} from './event-catalog'
export type { EventType, CategoriaEvento } from './event-catalog'

export { EventSubscriber } from './event-subscriber'
export type { EventSubscription, HandlerRegistration, SubscriberOptions } from './event-subscriber'

export { DeadLetterQueue } from './dead-letter-queue'
export type { DeadLetterEntry, DeadLetterConfig, DeadLetterResult, RegistrarDeadLetterParams, SalvarDeadLetterFn } from './dead-letter-queue'

export type { RetryConfig, RetryAttempt, RetryResult, RetryContext, BackoffStrategy } from './retry-policy'

export { PipelineMonitor } from './pipeline-monitor'
export type { PipelineStepExecution, PipelineExecution, PipelineMetrics, PipelineSnapshot, PipelineTimeline } from './pipeline-monitor'

export { PipelineComparator } from './pipeline-comparator'
export type { PipelineComparison, PipelineComparisonResult, PipelineDifference, ComparisonSnapshot, LegacyStep, TipoDiferenca } from './pipeline-comparator'

export { featureFlags } from './feature-flags'
export type { FlagName, FeatureFlagConfig, FeatureFlagSnapshot, FeatureFlagProvider } from './feature-flags'

import { inicializarSubscribers as _initSubs } from './subscribers/index'
export { _initSubs as inicializarSubscribers }

import { inicializarPipelines as _initPipes } from './pipelines/pipeline-registry'
export { _initPipes as inicializarPipelines }

export { obterEventBus, criarEvento, EventEmitterBus } from './cognitive-bus'
export type { EventBus, EventoPonteDigital, MetadadosEvento, TipoHandlerEvento, MiddlewareEvento } from './cognitive-bus'

export type { CicloConfig, StatusCiclo, HeartbeatResult, FrequenciaCiclo } from './ritmo-engine'
export {
  obterCiclos,
  atualizarConfiguracaoCiclo,
} from './ritmo-engine'
export type { AtualizarConfigInput } from './ritmo-engine'

export type { CompanyMaturity, NivelMaturidade } from './company-maturity-engine'
export { calcularMaturidade } from './company-maturity-engine'

export type { EvolutionExperience } from './cognitive-experience-engine'
import { obterEstadoCognitivoCompleto as _obterEstado } from './cognitive-orchestrator'
import { createExperienceEngine as _criarEngine } from './cognitive-experience-engine'
export const experienceEngine = _criarEngine({ obterEstadoCognitivoCompleto: _obterEstado })

// ─── Inicialização do Pipeline ───────────────────────────────
// Registra subscribers do EventBus uma única vez no startup.
_initSubs()
_initPipes()
// ─────────────────────────────────────────────────────────────

interface DadosParaSinais {
  clientes: Cliente[]
  tarefas: Tarefa[]
  financeiro: ResumoFinanceiroEntrada
  agora?: Date
}

export function gerarSinais({ clientes, tarefas, financeiro, agora = new Date() }: DadosParaSinais): Sinal[] {
  const sinais: Sinal[] = [
    ...gerarSinaisClientes(clientes, agora),
    ...gerarSinaisTarefas(tarefas, agora),
    ...gerarSinaisFinanceiro(financeiro),
  ]

  return ordenarPorUrgencia(sinais)
}
