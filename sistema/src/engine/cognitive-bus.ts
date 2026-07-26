import { randomUUID } from 'crypto'
import { EventEmitter } from 'events'
import { createLogger } from '@/lib/logger'

const log = createLogger('event-bus', 'cognitive-bus')

export interface MetadadosEvento {
  tenantId: string
  correlationId: string
  causationId?: string
}

export interface EventoPonteDigital<T = unknown> {
  eventId: string
  eventType: string
  aggregateId: string
  aggregateType: string
  version: number
  occurredAt: Date
  data: T
  metadata: MetadadosEvento
}

export type TipoHandlerEvento<T = unknown> = (evento: EventoPonteDigital<T>) => void | Promise<void>

export interface MiddlewareEvento {
  (evento: EventoPonteDigital, next: () => Promise<void>): Promise<void>
}

export interface EventBus {
  on<T>(eventType: string, handler: TipoHandlerEvento<T>): void
  off<T>(eventType: string, handler: TipoHandlerEvento<T>): void
  emit<T>(evento: EventoPonteDigital<T>): Promise<void>
  use(middleware: MiddlewareEvento): void
}

export type StatusEvento = 'PENDENTE' | 'PROCESSADO' | 'FALHA'

export class EventEmitterBus implements EventBus {
  private emitter = new EventEmitter()
  private middlewareChain: MiddlewareEvento[] = []

  on<T>(eventType: string, handler: TipoHandlerEvento<T>): void {
    this.emitter.on(eventType, handler)
  }

  off<T>(eventType: string, handler: TipoHandlerEvento<T>): void {
    this.emitter.off(eventType, handler)
  }

  use(middleware: MiddlewareEvento): void {
    this.middlewareChain.push(middleware)
  }

  async emit<T>(evento: EventoPonteDigital<T>): Promise<void> {
    const executar = async (idx: number): Promise<void> => {
      if (idx < this.middlewareChain.length) {
        await this.middlewareChain[idx](evento, () => executar(idx + 1))
      } else {
        const handlers = this.emitter.listeners(evento.eventType) as TipoHandlerEvento[]
        for (const handler of handlers) {
          try {
            await Promise.resolve(handler(evento))
          } catch (err) {
            log.error('Falha no handler do evento', { eventId: evento.eventId, aggregateId: evento.aggregateId, aggregateType: evento.aggregateType, correlationId: evento.metadata.correlationId, empresaId: evento.metadata.tenantId, error: err instanceof Error ? err : undefined })
          }
        }
      }
    }

    await executar(0)
  }

  listenerCount(eventType: string): number {
    return this.emitter.listenerCount(eventType)
  }
}

let instanciaGlobal: EventEmitterBus | null = null

export function obterEventBus(): EventEmitterBus {
  if (!instanciaGlobal) {
    instanciaGlobal = new EventEmitterBus()
  }
  return instanciaGlobal
}

export function criarEvento<T>(
  eventType: string,
  aggregateId: string,
  aggregateType: string,
  data: T,
  metadata: MetadadosEvento,
  version = 1
): EventoPonteDigital<T> {
  return {
    eventId: randomUUID(),
    eventType,
    aggregateId,
    aggregateType,
    version,
    occurredAt: new Date(),
    data,
    metadata,
  }
}
