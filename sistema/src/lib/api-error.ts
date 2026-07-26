import { NextResponse } from 'next/server'
import { BaseAppError } from '@/lib/app-errors'
import { PlanoError } from '@/lib/planos'
import { createLogger } from '@/lib/logger'
import { randomUUID } from 'crypto'

const log = createLogger('api', 'error-handler')

function gerarCorrelationId(): string {
  return randomUUID()
}

type ErrorResponseOptions = {
  correlationId?: string
  exposeStack?: boolean
  durationMs?: number
}

export function handleApiError(err: unknown, options?: ErrorResponseOptions): NextResponse {
  const { correlationId: correlationIdOpt, exposeStack = false, durationMs } = options ?? {}
  const correlationId = correlationIdOpt ?? (err instanceof BaseAppError ? err.correlationId : undefined) ?? gerarCorrelationId()

  if (err instanceof PlanoError) {
    log.warn('Plano insuficiente', { correlationId, empresaId: err.empresaId, errorCode: err.code, error: err, durationMs })
    return NextResponse.json(
      { success: false, error: err.message, code: err.code, correlationId },
      { status: err.status }
    )
  }

  if (err instanceof BaseAppError) {
    const level = err.statusCode >= 500 ? 'error' : 'warn'
    log[level]('Erro na API', { correlationId, empresaId: err.empresaId, errorCode: err.code, error: err, durationMs })
    const body: Record<string, unknown> = {
      success: false,
      error: err.message,
      code: err.code,
      details: err.details,
      correlationId,
    }
    if (exposeStack && err.cause) {
      body.cause = err.cause.message
    }
    return NextResponse.json(body, { status: err.statusCode })
  }

  log.error('Erro não tipado na API', { error: err instanceof Error ? err : undefined, correlationId, durationMs })
  return NextResponse.json(
    { success: false, error: 'Erro interno do servidor', code: 'INTERNAL_ERROR', correlationId },
    { status: 500 }
  )
}

export function respostaErroGenerico(erro: unknown, _mensagemAmigavel = 'Erro interno do servidor') {
  return handleApiError(erro)
}

export function gerarCorrelationIdRequisicao(): string {
  return gerarCorrelationId()
}
