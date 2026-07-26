import { createLogger } from '@/lib/logger'

const log = createLogger('engine', 'feature-flags')

export type FlagName =
  | 'useCognitivePipeline'
  | 'enablePipelineMonitor'
  | 'enablePipelineComparator'
  | 'enablePipelineSubscribers'

export interface FeatureFlagConfig {
  useCognitivePipeline: boolean
  enablePipelineMonitor: boolean
  enablePipelineComparator: boolean
  enablePipelineSubscribers: boolean
}

export interface FeatureFlagSnapshot {
  flags: Record<string, boolean>
  timestamp: Date
}

export interface FeatureFlagProvider {
  isEnabled(flag: FlagName): boolean
  enable(flag: FlagName): void
  disable(flag: FlagName): void
  set(flag: FlagName, value: boolean): void
  snapshot(): FeatureFlagSnapshot
  reset(): void
}

const DEFAULT_FLAGS: FeatureFlagConfig = {
  useCognitivePipeline: false,
  enablePipelineMonitor: false,
  enablePipelineComparator: false,
  enablePipelineSubscribers: true,
}

export class FeatureFlags implements FeatureFlagProvider {
  private flags: FeatureFlagConfig

  constructor(initial?: Partial<FeatureFlagConfig>) {
    this.flags = { ...DEFAULT_FLAGS, ...initial }
  }

  isEnabled(flag: FlagName): boolean {
    return this.flags[flag] ?? false
  }

  enable(flag: FlagName): void {
    this.set(flag, true)
  }

  disable(flag: FlagName): void {
    this.set(flag, false)
  }

  set(flag: FlagName, value: boolean): void {
    if (!(flag in this.flags)) {
      log.warn('Flag desconhecida', { details: { flag } })
      return
    }
    this.flags[flag] = value
  }

  snapshot(): FeatureFlagSnapshot {
    return {
      flags: { ...this.flags } as unknown as Record<string, boolean>,
      timestamp: new Date(),
    }
  }

  reset(): void {
    this.flags = { ...DEFAULT_FLAGS }
  }
}

export const featureFlags = new FeatureFlags()
