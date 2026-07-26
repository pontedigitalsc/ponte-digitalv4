export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
  retryAfter: number
}

export interface RateLimitProvider {
  check(key: string, maxRequests: number, windowMs: number): RateLimitResult
  delete(key: string): void
  clear(): void
  stats(): RateLimitProviderStats
}

export interface RateLimitProviderStats {
  entries: number
  totalRequests: number
  totalBlocked: number
}

interface FixedWindowEntry {
  count: number
  resetAt: number
}

export class MemoryRateLimitProvider implements RateLimitProvider {
  private windows = new Map<string, FixedWindowEntry>()
  private totalRequests = 0
  private totalBlocked = 0

  check(key: string, maxRequests: number, windowMs: number): RateLimitResult {
    this.totalRequests++
    const now = Date.now()
    const entry = this.windows.get(key)

    if (!entry || now > entry.resetAt) {
      this.windows.set(key, { count: 1, resetAt: now + windowMs })
      return { allowed: true, limit: maxRequests, remaining: maxRequests - 1, resetAt: now + windowMs, retryAfter: Math.ceil(windowMs / 1000) }
    }

    if (entry.count >= maxRequests) {
      this.totalBlocked++
      return { allowed: false, limit: maxRequests, remaining: 0, resetAt: entry.resetAt, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
    }

    entry.count++
    return { allowed: true, limit: maxRequests, remaining: maxRequests - entry.count, resetAt: entry.resetAt, retryAfter: 0 }
  }

  delete(key: string): void {
    this.windows.delete(key)
  }

  clear(): void {
    this.windows.clear()
    this.totalRequests = 0
    this.totalBlocked = 0
  }

  stats(): RateLimitProviderStats {
    return {
      entries: this.windows.size,
      totalRequests: this.totalRequests,
      totalBlocked: this.totalBlocked,
    }
  }
}
