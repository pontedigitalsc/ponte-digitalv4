import { MemoryCacheProvider } from './cache-provider'
import type { CacheProvider } from './cache-provider'

export const TTL = {
  RAPIDO: 30_000,
  CONTEXTO: 60_000,
  AGREGADO: 300_000,
} as const

let instance: CacheProvider | null = null

export function getCache(): CacheProvider {
  if (!instance) {
    instance = new MemoryCacheProvider()
  }
  return instance
}

export function resetCache(): void {
  if (instance) {
    instance.clear()
    instance = null
  }
}
