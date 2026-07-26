import { BaseAppError } from '@/lib/app-errors'

type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

type LogContext = {
  correlationId?: string
  empresaId?: string
  userId?: string
  eventId?: string
  aggregateId?: string
  aggregateType?: string
  requestId?: string
  operation?: string
  durationMs?: number
  errorCode?: string
  details?: unknown
  stack?: string
  error?: Error | BaseAppError
}

type Entry = {
  timestamp: string
  level: Level
  message: string
  service: string
  module?: string
} & Omit<LogContext, 'error'>

const isDev = process.env.NODE_ENV === 'development'

function extractFromError(ctx: LogContext): Partial<Entry> {
  if (!ctx.error) return {}
  const err = ctx.error

  const entry: Partial<Entry> = {}

  if (err instanceof BaseAppError) {
    entry.errorCode = err.code
    if (!ctx.correlationId && err.correlationId) entry.correlationId = err.correlationId
    if (!ctx.empresaId && err.empresaId) entry.empresaId = err.empresaId
    if (isDev) entry.stack = err.stack
    if (err.details) entry.details = err.details
    entry.durationMs = ctx.durationMs
  } else {
    if (isDev) entry.stack = err.stack
    entry.durationMs = ctx.durationMs
  }

  return entry
}

function buildEntry(level: Level, message: string, service: string, module: string | undefined, ctx: LogContext): Entry {
  const fromError = extractFromError(ctx)
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    service,
    ...(module && { module }),
    ...removeUndefined({
      correlationId: ctx.correlationId ?? fromError.correlationId,
      empresaId: ctx.empresaId ?? fromError.empresaId,
      userId: ctx.userId,
      eventId: ctx.eventId,
      aggregateId: ctx.aggregateId,
      aggregateType: ctx.aggregateType,
      requestId: ctx.requestId,
      operation: ctx.operation,
      durationMs: ctx.durationMs ?? fromError.durationMs,
      errorCode: ctx.errorCode ?? fromError.errorCode,
      stack: fromError.stack ?? ctx.stack,
      details: ctx.details ?? fromError.details,
    }),
  }
}

function removeUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Partial<T> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) result[k as keyof T] = v as T[keyof T]
  }
  return result
}

function write(entry: Entry): void {
  if (isDev) {
    const parts = [`${entry.timestamp} [${entry.level.toUpperCase()}] ${entry.service}${entry.module ? `:${entry.module}` : ''} ${entry.message}`]
    if (entry.correlationId) parts.push(`correlationId=${entry.correlationId}`)
    if (entry.empresaId) parts.push(`empresaId=${entry.empresaId}`)
    if (entry.durationMs !== undefined) parts.push(`duration=${entry.durationMs}ms`)
    if (entry.errorCode) parts.push(`code=${entry.errorCode}`)
    if (entry.stack) parts.push(`\n${entry.stack}`)
    if (entry.details) parts.push(` details=${JSON.stringify(entry.details)}`)

    const output = parts.join(' | ')
    if (entry.level === 'error' || entry.level === 'fatal') {
      console.error(output)
    } else if (entry.level === 'warn') {
      console.warn(output)
    } else {
      console.log(output)
    }
  } else {
    const json = JSON.stringify(entry)
    if (entry.level === 'error' || entry.level === 'fatal') {
      console.error(json)
    } else if (entry.level === 'warn') {
      console.warn(json)
    } else {
      console.log(json)
    }
  }
}

export interface Logger {
  debug(message: string, ctx?: LogContext): void
  info(message: string, ctx?: LogContext): void
  warn(message: string, ctx?: LogContext): void
  error(message: string, ctx?: LogContext): void
  fatal(message: string, ctx?: LogContext): void
}

export function createLogger(service: string, module?: string): Logger {
  return {
    debug(message: string, ctx: LogContext = {}): void {
      write(buildEntry('debug', message, service, module, ctx))
    },
    info(message: string, ctx: LogContext = {}): void {
      write(buildEntry('info', message, service, module, ctx))
    },
    warn(message: string, ctx: LogContext = {}): void {
      write(buildEntry('warn', message, service, module, ctx))
    },
    error(message: string, ctx: LogContext = {}): void {
      write(buildEntry('error', message, service, module, ctx))
    },
    fatal(message: string, ctx: LogContext = {}): void {
      write(buildEntry('fatal', message, service, module, ctx))
    },
  }
}
