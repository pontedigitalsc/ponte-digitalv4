import { randomUUID } from 'crypto'
import type { EventoPonteDigital } from './cognitive-bus'

export interface DeadLetterEntry {
  eventId: string
  eventType: string
  aggregateId: string
  aggregateType: string
  tenantId: string
  correlationId: string
  handlerName: string
  payload: unknown
  errorName: string
  errorMessage: string
  stack?: string
  occurredAt: Date
  failedAt: Date
  retryCount: number
}

export interface DeadLetterConfig {
  salvarDeadLetter?: SalvarDeadLetterFn
}

export type SalvarDeadLetterFn = (entry: DeadLetterEntry) => Promise<void>

export interface DeadLetterResult {
  success: boolean
  persisted: boolean
  deadLetterId?: string
  error?: string
}

export interface RegistrarDeadLetterParams {
  evento: EventoPonteDigital
  handlerName: string
  error: Error
  retryCount?: number
}

export class DeadLetterQueue {
  private entries: DeadLetterEntry[] = []
  private config: DeadLetterConfig

  constructor(config: DeadLetterConfig = {}) {
    this.config = config
  }

  async registrar(params: RegistrarDeadLetterParams): Promise<DeadLetterResult> {
    const entry: DeadLetterEntry = {
      eventId: params.evento.eventId,
      eventType: params.evento.eventType,
      aggregateId: params.evento.aggregateId,
      aggregateType: params.evento.aggregateType,
      tenantId: params.evento.metadata.tenantId,
      correlationId: params.evento.metadata.correlationId,
      handlerName: params.handlerName,
      payload: params.evento.data,
      errorName: params.error.name,
      errorMessage: params.error.message,
      stack: params.error.stack,
      occurredAt: params.evento.occurredAt,
      failedAt: new Date(),
      retryCount: params.retryCount ?? 0,
    }

    this.entries.push(entry)

    const deadLetterId = randomUUID()

    try {
      if (this.config.salvarDeadLetter) {
        await this.config.salvarDeadLetter(entry)
      }
      return { success: true, persisted: !!this.config.salvarDeadLetter, deadLetterId }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao persistir dead letter'
      return { success: true, persisted: false, deadLetterId, error: msg }
    }
  }

  listar(): DeadLetterEntry[] {
    return [...this.entries]
  }

  limpar(): void {
    this.entries = []
  }
}

export class DeadLetterProcessor {
  // stub — implementação futura (retry, replay, reprocessamento)
}
