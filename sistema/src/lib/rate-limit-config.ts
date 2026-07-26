export const RATE_LIMIT_CONFIG = {
  ASSISTENTE: { maxRequests: 20, windowMs: 60_000, description: 'Assistant AI — most expensive endpoint' },
  CONVERSA: { maxRequests: 30, windowMs: 60_000, description: 'Guest conversation API' },
  LOGIN: { maxRequests: 10, windowMs: 60_000, description: 'Login attempts per IP' },
  CRIAR_CONTA: { maxRequests: 3, windowMs: 60_000, description: 'Account creation per IP' },
  API_GERAL: { maxRequests: 60, windowMs: 60_000, description: 'General CRUD mutations per user' },
} as const

export type RateLimitConfigName = keyof typeof RATE_LIMIT_CONFIG
