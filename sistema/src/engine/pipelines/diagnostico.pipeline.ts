import type { EventoPonteDigital } from '../cognitive-bus'
import { EVENTOS_NEGOCIO, EVENTOS_SAIDA, EVENTOS_PIPELINE } from '../event-catalog'
import { decidirContexto } from '../cognitive-context-engine'
import { calcularNivelAtivacao } from '../founder-activation-engine'
import { listarHipoteses } from '../cognitive-memory-engine'
import { PipelineMonitor } from '../pipeline-monitor'
import { criarEventPublisherPersistente } from '../event-store'
import { createLogger } from '@/lib/logger'

const log = createLogger('pipeline', 'diagnostico')
const publisher = criarEventPublisherPersistente()
const monitor = new PipelineMonitor()

export { monitor as pipelineMonitor }

const HANDLER_STEP1 = 'handlerDiagnosticoPipeline'
const HANDLER_STEP2 = 'handlerContextoPipeline'
const HANDLER_STEP3 = 'handlerNivelAtivacaoPipeline'
const HANDLER_STEP4 = 'handlerHipotesePipeline'

export async function handlerDiagnosticoPipeline(
  evento: EventoPonteDigital
): Promise<void> {
  const startedAt = new Date()
  const inicio = startedAt.getTime()
  const { tenantId, correlationId } = evento.metadata
  if (!tenantId) return

  monitor.registrarInicio({
    correlationId, eventId: evento.eventId, eventType: evento.eventType,
    handler: HANDLER_STEP1, tenantId, step: 1, startedAt,
  })

  log.info('Step 1 iniciado: DiagnosticoConcluido', { correlationId, eventId: evento.eventId, empresaId: tenantId })

  try {
    const contexto = await decidirContexto(tenantId)
    const agora = new Date()
    log.debug('Step 1 contexto calculado', { correlationId, empresaId: tenantId, durationMs: agora.getTime() - inicio })

    await publisher.publish({
      eventType: EVENTOS_SAIDA.CONTEXTO_ATUALIZADO,
      aggregateId: tenantId,
      aggregateType: 'Empresa',
      data: { pipeline: true, contexto },
      tenantId,
      correlationId,
    })

    const finishedAt = new Date()
    const duration = finishedAt.getTime() - inicio
    monitor.registrarFim({
      correlationId, eventId: evento.eventId, eventType: evento.eventType,
      handler: HANDLER_STEP1, tenantId, step: 1,
      startedAt, finishedAt, duration,
    })
    log.info('Step 1 concluido: ContextoAtualizado publicado', { correlationId, empresaId: tenantId, durationMs: duration })
  } catch (err) {
    const finishedAt = new Date()
    const duration = finishedAt.getTime() - inicio
    monitor.registrarErro({
      correlationId, eventId: evento.eventId, eventType: evento.eventType,
      handler: HANDLER_STEP1, tenantId, step: 1,
      startedAt, finishedAt, duration,
      error: err instanceof Error ? err.message : String(err),
    })
    log.error('Step 1 erro', { correlationId, empresaId: tenantId, durationMs: duration, error: err instanceof Error ? err : undefined })
  }
}

export async function handlerContextoPipeline(
  evento: EventoPonteDigital
): Promise<void> {
  const startedAt = new Date()
  const inicio = startedAt.getTime()
  const { tenantId, correlationId } = evento.metadata
  if (!tenantId) return

  monitor.registrarInicio({
    correlationId, eventId: evento.eventId, eventType: evento.eventType,
    handler: HANDLER_STEP2, tenantId, step: 2, startedAt,
  })

  log.info('Step 2 iniciado: ContextoAtualizado', { correlationId, eventId: evento.eventId, empresaId: tenantId })

  try {
    const nivel = await calcularNivelAtivacao(tenantId)
    log.debug('Step 2 nivel calculado', { correlationId, empresaId: tenantId, durationMs: Date.now() - inicio })

    await publisher.publish({
      eventType: EVENTOS_PIPELINE.NIVEL_ATIVACAO_CALCULADO,
      aggregateId: tenantId,
      aggregateType: 'Empresa',
      data: { pipeline: true, nivel },
      tenantId,
      correlationId,
    })

    const finishedAt = new Date()
    const duration = finishedAt.getTime() - inicio
    monitor.registrarFim({
      correlationId, eventId: evento.eventId, eventType: evento.eventType,
      handler: HANDLER_STEP2, tenantId, step: 2,
      startedAt, finishedAt, duration,
    })
    log.info('Step 2 concluido: NivelAtivacaoCalculado publicado', { correlationId, empresaId: tenantId, durationMs: duration })
  } catch (err) {
    const finishedAt = new Date()
    const duration = finishedAt.getTime() - inicio
    monitor.registrarErro({
      correlationId, eventId: evento.eventId, eventType: evento.eventType,
      handler: HANDLER_STEP2, tenantId, step: 2,
      startedAt, finishedAt, duration,
      error: err instanceof Error ? err.message : String(err),
    })
    log.error('Step 2 erro', { correlationId, empresaId: tenantId, durationMs: duration, error: err instanceof Error ? err : undefined })
  }
}

export async function handlerNivelAtivacaoPipeline(
  evento: EventoPonteDigital
): Promise<void> {
  const startedAt = new Date()
  const inicio = startedAt.getTime()
  const { tenantId, correlationId } = evento.metadata
  if (!tenantId) return

  monitor.registrarInicio({
    correlationId, eventId: evento.eventId, eventType: evento.eventType,
    handler: HANDLER_STEP3, tenantId, step: 3, startedAt,
  })

  log.info('Step 3 iniciado: NivelAtivacaoCalculado', { correlationId, eventId: evento.eventId, empresaId: tenantId })

  try {
    const hipoteses = await listarHipoteses(tenantId)
    const temHipotese = hipoteses.length > 0
    log.debug('Step 3 hipoteses verificadas', { correlationId, empresaId: tenantId, durationMs: Date.now() - inicio, details: { temHipotese } })

    await publisher.publish({
      eventType: EVENTOS_PIPELINE.HIPOTESE_INICIAL_GERADA,
      aggregateId: tenantId,
      aggregateType: 'Empresa',
      data: { pipeline: true, temHipotese },
      tenantId,
      correlationId,
    })

    const finishedAt = new Date()
    const duration = finishedAt.getTime() - inicio
    monitor.registrarFim({
      correlationId, eventId: evento.eventId, eventType: evento.eventType,
      handler: HANDLER_STEP3, tenantId, step: 3,
      startedAt, finishedAt, duration,
    })
    log.info('Step 3 concluido: HipoteseInicialGerada publicado', { correlationId, empresaId: tenantId, durationMs: duration })
  } catch (err) {
    const finishedAt = new Date()
    const duration = finishedAt.getTime() - inicio
    monitor.registrarErro({
      correlationId, eventId: evento.eventId, eventType: evento.eventType,
      handler: HANDLER_STEP3, tenantId, step: 3,
      startedAt, finishedAt, duration,
      error: err instanceof Error ? err.message : String(err),
    })
    log.error('Step 3 erro', { correlationId, empresaId: tenantId, durationMs: duration, error: err instanceof Error ? err : undefined })
  }
}

export async function handlerHipotesePipeline(
  evento: EventoPonteDigital
): Promise<void> {
  const startedAt = new Date()
  const inicio = startedAt.getTime()
  const { tenantId, correlationId } = evento.metadata
  if (!tenantId) return

  monitor.registrarInicio({
    correlationId, eventId: evento.eventId, eventType: evento.eventType,
    handler: HANDLER_STEP4, tenantId, step: 4, startedAt,
  })

  log.info('Step 4: HipoteseInicialGerada - pipeline concluido', { correlationId, eventId: evento.eventId, empresaId: tenantId })

  const finishedAt = new Date()
  const duration = finishedAt.getTime() - inicio
  monitor.registrarFim({
    correlationId, eventId: evento.eventId, eventType: evento.eventType,
    handler: HANDLER_STEP4, tenantId, step: 4,
    startedAt, finishedAt, duration,
  })
}
