/**
 * ─── CACHE PROVIDER ────────────────────────────────────────────────────────────
 *
 * Abstração de cache preparada para futura substituição por Redis/Upstash.
 * Atualmente utiliza Map em memória com expiração lazy (TTL por chave).
 *
 * Nada no sistema deve depender diretamente de Map ou de qualquer
 * implementação concreta — use sempre a interface CacheProvider.
 */

export interface CacheProvider {
  get<T>(key: string): T | undefined
  set<T>(key: string, value: T, ttlMs?: number): void
  delete(key: string): void
  clear(): void
  has(key: string): boolean
  remember<T>(key: string, fn: () => Promise<T>, ttlMs?: number): Promise<T>
  invalidateNamespace(ns: string): void
  invalidatePattern(pattern: string): void
  stats(): CacheStats
}

export interface CacheStats {
  hits: number
  misses: number
  entries: number
  hitRate(): number
}

interface CacheEntry<T> {
  value: T
  expiresAt: number
  createdAt: number
}

export class MemoryCacheProvider implements CacheProvider {
  private store = new Map<string, CacheEntry<unknown>>()
  private hits = 0
  private misses = 0

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key) as CacheEntry<T> | undefined
    if (!entry) {
      this.misses++
      return undefined
    }
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      this.misses++
      return undefined
    }
    this.hits++
    return entry.value
  }

  set<T>(key: string, value: T, ttlMs?: number): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + (ttlMs ?? 60_000),
      createdAt: Date.now(),
    })
  }

  delete(key: string): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
    this.hits = 0
    this.misses = 0
  }

  has(key: string): boolean {
    return this.get(key) !== undefined
  }

  async remember<T>(key: string, fn: () => Promise<T>, ttlMs?: number): Promise<T> {
    const cached = this.get<T>(key)
    if (cached !== undefined) return cached
    const value = await fn()
    this.set(key, value, ttlMs)
    return value
  }

  invalidateNamespace(ns: string): void {
    const prefix = `${ns}:`
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) this.store.delete(key)
    }
  }

  invalidatePattern(pattern: string): void {
    for (const key of this.store.keys()) {
      if (key.includes(pattern)) this.store.delete(key)
    }
  }

  stats(): CacheStats {
    const self = this
    return {
      get hits() { return self.hits },
      get misses() { return self.misses },
      get entries() { return self.store.size },
      hitRate(): number {
        const total = self.hits + self.misses
        return total === 0 ? 0 : self.hits / total
      },
    }
  }
}
