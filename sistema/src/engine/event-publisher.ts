import { ehEventoValido } from './event-catalog'
import { EventoPonteDigital, MetadadosEvento, criarEvento, obterEventBus } from './cognitive-bus'

export interface PublicarParams<T = unknown> {
  eventType: string
  aggregateId: string
  aggregateType: string
  data: T
  tenantId: string
  correlationId: string
  causationId?: string
  version?: number
}

export interface PublishResult {
  success: boolean
  eventId?: string
  eventType: string
  error?: string
  persisted: boolean
}

export interface EventPublisherConfig {
  salvarEvento?: SalvarEventoFn
}

export type SalvarEventoFn = (evento: EventoPonteDigital) => Promise<void>

export class EventValidationError extends Error {
  constructor(
    message: string,
    public campo: string
  ) {
    super(message)
    this.name = 'EventValidationError'
  }
}

export class EventPublisherError extends Error {
  constructor(
    message: string,
    public eventType: string
  ) {
    super(message)
    this.name = 'EventPublisherError'
  }
}

export class EventPublisher {
  private salvarEvento?: SalvarEventoFn

  constructor(config: EventPublisherConfig = {}) {
    this.salvarEvento = config.salvarEvento
  }

  async publish<T>(params: PublicarParams<T>): Promise<PublishResult> {
    try {
      this.validar(params)
      const evento = this.construirEvento(params)
      await obterEventBus().emit(evento)
      if (this.salvarEvento) {
        await this.salvarEvento(evento)
      }
      return { success: true, eventId: evento.eventId, eventType: evento.eventType, persisted: !!this.salvarEvento }
    } catch (err) {
      if (err instanceof EventValidationError) {
        throw err
      }
      const msg = err instanceof Error ? err.message : 'Erro desconhecido'
      return { success: false, eventType: params.eventType, error: msg, persisted: false }
    }
  }

  private validar<T>(params: PublicarParams<T>): void {
    if (!params.eventType || typeof params.eventType !== 'string') {
      throw new EventValidationError('eventType e obrigatorio', 'eventType')
    }
    if (!ehEventoValido(params.eventType)) {
      throw new EventValidationError(`Tipo invalido: ${params.eventType}`, 'eventType')
    }
    if (!params.aggregateId || typeof params.aggregateId !== 'string') {
      throw new EventValidationError('aggregateId e obrigatorio', 'aggregateId')
    }
    if (!params.aggregateType || typeof params.aggregateType !== 'string') {
      throw new EventValidationError('aggregateType e obrigatorio', 'aggregateType')
    }
    if (!params.tenantId || typeof params.tenantId !== 'string') {
      throw new EventValidationError('tenantId e obrigatorio', 'tenantId')
    }
    if (!params.correlationId || typeof params.correlationId !== 'string') {
      throw new EventValidationError('correlationId e obrigatorio', 'correlationId')
    }
    if (params.data === undefined || params.data === null) {
      throw new EventValidationError('payload (data) e obrigatorio', 'data')
    }
  }

  private construirEvento<T>(params: PublicarParams<T>): EventoPonteDigital<T> {
    const metadata: MetadadosEvento = {
      tenantId: params.tenantId,
      correlationId: params.correlationId,
      causationId: params.causationId,
    }
    return criarEvento(
      params.eventType,
      params.aggregateId,
      params.aggregateType,
      params.data,
      metadata,
      params.version
    )
  }
}
