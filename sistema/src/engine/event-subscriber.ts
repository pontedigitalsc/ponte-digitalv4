import { randomUUID } from 'crypto'
import { EventoPonteDigital, TipoHandlerEvento, obterEventBus } from './cognitive-bus'
import { createLogger } from '@/lib/logger'

const log = createLogger('event-bus', 'subscriber')

export interface EventSubscription {
  id: string
  eventType: string
  ativo: boolean
  criadoEm: Date
}

export interface HandlerRegistration<T = unknown> {
  id: string
  eventType: string
  handler: TipoHandlerEvento<T>
  criadoEm: Date
}

export interface SubscriberOptions {
  autoInicializar?: boolean
}

export class SubscriberRegistry {
  private registros = new Map<string, Set<HandlerRegistration>>()

  adicionar<T>(eventType: string, handler: TipoHandlerEvento<T>): HandlerRegistration<T> {
    if (!this.registros.has(eventType)) {
      this.registros.set(eventType, new Set())
    }
    const registro: HandlerRegistration<T> = {
      id: randomUUID(),
      eventType,
      handler,
      criadoEm: new Date(),
    }
    this.registros.get(eventType)!.add(registro as HandlerRegistration)
    return registro
  }

  remover(eventType: string, handler: TipoHandlerEvento): boolean {
    const registros = this.registros.get(eventType)
    if (!registros) return false
    for (const r of registros) {
      if (r.handler === handler) {
        registros.delete(r)
        if (registros.size === 0) this.registros.delete(eventType)
        return true
      }
    }
    return false
  }

  removerPorId(eventType: string, id: string): boolean {
    const registros = this.registros.get(eventType)
    if (!registros) return false
    for (const r of registros) {
      if (r.id === id) {
        registros.delete(r)
        if (registros.size === 0) this.registros.delete(eventType)
        return true
      }
    }
    return false
  }

  obter(eventType: string): HandlerRegistration[] {
    const registros = this.registros.get(eventType)
    return registros ? [...registros] : []
  }

  todos(): HandlerRegistration[] {
    const resultado: HandlerRegistration[] = []
    for (const registros of this.registros.values()) {
      resultado.push(...registros)
    }
    return resultado
  }

  limpar(): void {
    this.registros.clear()
  }

  get tamanho(): number {
    let total = 0
    for (const registros of this.registros.values()) {
      total += registros.size
    }
    return total
  }
}

export class EventSubscriber {
  private registry = new SubscriberRegistry()
  private initialized = false

  constructor(private options?: SubscriberOptions) {}

  subscribe<T>(eventType: string, handler: TipoHandlerEvento<T>): EventSubscription {
    const registro = this.registry.adicionar(eventType, handler)
    if (this.initialized) {
      obterEventBus().on(eventType, handler)
    }
    return { id: registro.id, eventType, ativo: true, criadoEm: registro.criadoEm }
  }

  unsubscribe(eventType: string, handler: TipoHandlerEvento): boolean {
    const removido = this.registry.remover(eventType, handler)
    if (removido && this.initialized) {
      obterEventBus().off(eventType, handler)
    }
    return removido
  }

  initialize(): void {
    if (this.initialized) return
    const bus = obterEventBus()
    for (const registro of this.registry.todos()) {
      bus.on(registro.eventType, registro.handler)
    }
    this.initialized = true
  }

  dispose(): void {
    if (!this.initialized) return
    const bus = obterEventBus()
    for (const registro of this.registry.todos()) {
      bus.off(registro.eventType, registro.handler)
    }
    this.registry.limpar()
    this.initialized = false
  }

  listar(): EventSubscription[] {
    return this.registry.todos().map((r) => ({
      id: r.id,
      eventType: r.eventType,
      ativo: this.initialized,
      criadoEm: r.criadoEm,
    }))
  }
}

export function EmpresaCriadaHandler(evento: EventoPonteDigital): void {
  log.debug('Evento recebido: EmpresaCriada', { eventId: evento.eventId, correlationId: evento.metadata.correlationId, empresaId: evento.metadata.tenantId })
}

export function HipoteseConfirmadaHandler(evento: EventoPonteDigital): void {
  log.debug('Evento recebido: HipoteseConfirmada', { eventId: evento.eventId, correlationId: evento.metadata.correlationId, empresaId: evento.metadata.tenantId })
}

export function ConhecimentoValidadoHandler(evento: EventoPonteDigital): void {
  log.debug('Evento recebido: ConhecimentoValidado', { eventId: evento.eventId, correlationId: evento.metadata.correlationId, empresaId: evento.metadata.tenantId })
}

export function AprendizadoRegistradoHandler(evento: EventoPonteDigital): void {
  log.debug('Evento recebido: AprendizadoRegistrado', { eventId: evento.eventId, correlationId: evento.metadata.correlationId, empresaId: evento.metadata.tenantId })
}

export function ResultadoObservadoHandler(evento: EventoPonteDigital): void {
  log.debug('Evento recebido: ResultadoObservado', { eventId: evento.eventId, correlationId: evento.metadata.correlationId, empresaId: evento.metadata.tenantId })
}
