import { NextResponse } from 'next/server'
import { MemoryRateLimitProvider, type RateLimitResult, type RateLimitProvider } from './rate-limit-provider'
import { RATE_LIMIT_CONFIG, type RateLimitConfigName } from './rate-limit-config'
import { RateLimitError } from './app-errors'

let provider: RateLimitProvider | null = null

function getProvider(): RateLimitProvider {
  if (!provider) provider = new MemoryRateLimitProvider()
  return provider
}

export function getRateLimiter(): RateLimitProvider {
  return getProvider()
}

export function checkRateLimit(key: string, configName: RateLimitConfigName): RateLimitResult {
  const config = RATE_LIMIT_CONFIG[configName]
  return getProvider().check(key, config.maxRequests, config.windowMs)
}

export function assertRateLimit(key: string, configName: RateLimitConfigName): RateLimitResult {
  const result = checkRateLimit(key, configName)
  if (!result.allowed) {
    throw new RateLimitError('Muitas requisições. Tente novamente mais tarde.', {
      details: {
        retryAfter: result.retryAfter,
        limit: result.limit,
        remaining: result.remaining,
        resetAt: result.resetAt,
      },
    })
  }
  return result
}

export function buildRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
    'Retry-After': String(result.retryAfter),
  }
}

export function buildRateLimitResponse(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: 'Muitas requisições. Tente novamente mais tarde.',
      code: 'RATE_LIMIT_ERROR',
      retryAfter: result.retryAfter,
      limit: result.limit,
      remaining: result.remaining,
      resetAt: result.resetAt,
    },
    {
      status: 429,
      headers: buildRateLimitHeaders(result),
    }
  )
}

export function checkAssistenteRateLimit(userId: string): RateLimitResult {
  return checkRateLimit(`assistente:${userId}`, 'ASSISTENTE')
}

export function checkConversaRateLimit(identifier: string): RateLimitResult {
  return checkRateLimit(`conversa:${identifier}`, 'CONVERSA')
}

export function checkLoginRateLimit(identifier: string): RateLimitResult {
  return checkRateLimit(`login:${identifier}`, 'LOGIN')
}

export function checkCriarContaRateLimit(identifier: string): RateLimitResult {
  return checkRateLimit(`criar-conta:${identifier}`, 'CRIAR_CONTA')
}

export function getRateLimitStats() {
  return getProvider().stats()
}

export function resetRateLimiter(): void {
  if (provider) {
    provider.clear()
    provider = null
  }
}

// ─── BACKWARD COMPATIBILITY ──────────────────────────────────────────────────

interface RegistroLimite {
  contagem: number
  resetaEm: number
}

const registros = new Map<string, RegistroLimite>()

setInterval(() => {
  const agora = Date.now()
  for (const [chave, registro] of registros.entries()) {
    if (registro.resetaEm < agora) registros.delete(chave)
  }
}, 60_000)

interface ResultadoLimite {
  permitido: boolean
  restante: number
  resetaEm: number
}

export function verificarLimite(chave: string, maxRequests: number, janelaMs: number): ResultadoLimite {
  const agora = Date.now()
  const registro = registros.get(chave)

  if (!registro || registro.resetaEm < agora) {
    registros.set(chave, { contagem: 1, resetaEm: agora + janelaMs })
    return { permitido: true, restante: maxRequests - 1, resetaEm: agora + janelaMs }
  }

  if (registro.contagem >= maxRequests) {
    return { permitido: false, restante: 0, resetaEm: registro.resetaEm }
  }

  registro.contagem += 1
  return { permitido: true, restante: maxRequests - registro.contagem, resetaEm: registro.resetaEm }
}

export const LIMITES = {
  assistente: { maxRequests: 20, janelaMs: 60_000 },
  mutacaoGenerica: { maxRequests: 60, janelaMs: 60_000 },
} as const

export function checarLimiteMutacao(usuarioId: string): Response | null {
  const { permitido, resetaEm } = verificarLimite(
    `mutacao:${usuarioId}`,
    LIMITES.mutacaoGenerica.maxRequests,
    LIMITES.mutacaoGenerica.janelaMs
  )
  if (permitido) return null

  const segundos = Math.ceil((resetaEm - Date.now()) / 1000)
  return new Response(
    JSON.stringify({ error: `Muitas requisições. Tente novamente em ${segundos}s.` }),
    { status: 429, headers: { 'Content-Type': 'application/json' } }
  )
}
