import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { EventPublisher, type SalvarEventoFn } from './event-publisher'
import { DeadLetterQueue, type SalvarDeadLetterFn } from './dead-letter-queue'
import type { EventoPonteDigital } from './cognitive-bus'
import type { DeadLetterEntry } from './dead-letter-queue'

export interface SalvarEventoParams {
  evento: EventoPonteDigital
  status?: 'PENDENTE' | 'PROCESSADO' | 'FALHA'
}

export interface SalvarDeadLetterParams {
  entry: DeadLetterEntry
}

export interface EventoPersistido {
  id: string
  eventType: string
  aggregateId: string
  aggregateType: string
  tenantId: string
  correlationId: string
  causationId: string | null
  version: number
  payload: unknown
  metadata: unknown
  status: string
  occurredAt: Date
  criadoEm: Date
  processadoEm: Date | null
  tentativas: number
}

export interface DeadLetterPersistido {
  id: string
  eventId: string | null
  eventType: string
  aggregateId: string
  aggregateType: string
  tenantId: string
  correlationId: string
  handlerName: string
  payload: unknown
  errorName: string
  errorMessage: string
  error: string
  stack: string | null
  tentativas: number
  occurredAt: Date
  failedAt: Date
  criadoEm: Date
}

export async function salvarEvento(params: SalvarEventoParams): Promise<EventoPersistido> {
  const { evento, status = 'PENDENTE' } = params
  const event = await prisma.event.create({
    data: {
      id: evento.eventId,
      eventType: evento.eventType,
      aggregateId: evento.aggregateId,
      aggregateType: evento.aggregateType,
      tenantId: evento.metadata.tenantId,
      correlationId: evento.metadata.correlationId,
      causationId: evento.metadata.causationId ?? null,
      version: evento.version,
      payload: evento.data as Record<string, unknown>,
      metadata: { ...evento.metadata },
      status,
      occurredAt: evento.occurredAt,
      tentativas: 0,
    },
  })
  return event
}

export async function salvarDeadLetter(params: SalvarDeadLetterParams): Promise<DeadLetterPersistido> {
  const { entry } = params
  const dl = await prisma.deadLetter.create({
    data: {
      eventId: entry.eventId,
      eventType: entry.eventType,
      aggregateId: entry.aggregateId,
      aggregateType: entry.aggregateType,
      tenantId: entry.tenantId,
      correlationId: entry.correlationId,
      handlerName: entry.handlerName,
      payload: entry.payload as Record<string, unknown>,
      errorName: entry.errorName,
      errorMessage: entry.errorMessage,
      error: `${entry.errorName}: ${entry.errorMessage}`,
      stack: entry.stack ?? null,
      tentativas: entry.retryCount,
      occurredAt: entry.occurredAt,
      failedAt: entry.failedAt,
    },
  })
  return dl
}

export async function atualizarStatusEvento(
  eventId: string,
  status: 'PROCESSADO' | 'FALHA'
): Promise<void> {
  await prisma.event.update({
    where: { id: eventId },
    data: {
      status,
      processadoEm: status === 'PROCESSADO' ? new Date() : undefined,
      tentativas: { increment: 1 },
    },
  })
}

export async function listarEventos(
  tenantId: string,
  options?: { eventType?: string; status?: string; limit?: number }
): Promise<EventoPersistido[]> {
  const where: Record<string, unknown> = { tenantId }
  if (options?.eventType) where.eventType = options.eventType
  if (options?.status) where.status = options.status
  return prisma.event.findMany({
    where,
    orderBy: { criadoEm: 'desc' },
    take: options?.limit ?? 50,
  })
}

export async function listarDeadLetters(
  tenantId: string,
  options?: { eventType?: string; handlerName?: string; limit?: number }
): Promise<DeadLetterPersistido[]> {
  const where: Record<string, unknown> = { tenantId }
  if (options?.eventType) where.eventType = options.eventType
  if (options?.handlerName) where.handlerName = options.handlerName
  return prisma.deadLetter.findMany({
    where,
    orderBy: { criadoEm: 'desc' },
    take: options?.limit ?? 50,
  })
}

export async function contarEventos(tenantId: string): Promise<{ pendentes: number; processados: number; falhas: number }> {
  const [pendentes, processados, falhas] = await Promise.all([
    prisma.event.count({ where: { tenantId, status: 'PENDENTE' } }),
    prisma.event.count({ where: { tenantId, status: 'PROCESSADO' } }),
    prisma.event.count({ where: { tenantId, status: 'FALHA' } }),
  ])
  return { pendentes, processados, falhas }
}

export function criarSalvarEventoFn(): SalvarEventoFn {
  return async (evento: EventoPonteDigital) => {
    await salvarEvento({ evento })
  }
}

export function criarSalvarDeadLetterFn(): SalvarDeadLetterFn {
  return async (entry: DeadLetterEntry) => {
    await salvarDeadLetter({ entry })
  }
}

export function criarEventPublisherPersistente(): EventPublisher {
  return new EventPublisher({ salvarEvento: criarSalvarEventoFn() })
}

export function criarDeadLetterQueuePersistente(): DeadLetterQueue {
  return new DeadLetterQueue({ salvarDeadLetter: criarSalvarDeadLetterFn() })
}
