export interface RetryConfig {
  maxRetries: number
  initialDelay: number
  backoffMultiplier: number
  maxDelay: number
}

export interface RetryAttempt {
  attempt: number
  startedAt: Date
  finishedAt: Date
  duration: number
  success: boolean
  error?: string
}

export interface RetryResult<T = unknown> {
  success: boolean
  attempts: RetryAttempt[]
  totalDuration: number
  result?: T
  error?: string
}

export interface RetryContext {
  attempt: number
  previousError?: Error
}

export type BackoffStrategy = (config: RetryConfig, attempt: number) => number

const DELAYS_PADRAO: RetryConfig = {
  maxRetries: 3,
  initialDelay: 100,
  backoffMultiplier: 3,
  maxDelay: 5000,
}

function backoffExponencial(config: RetryConfig, attempt: number): number {
  const delay = config.initialDelay * Math.pow(config.backoffMultiplier, attempt - 1)
  return Math.min(delay, config.maxDelay)
}

export class RetryPolicy {
  private config: RetryConfig
  private strategy: BackoffStrategy

  constructor(config?: Partial<RetryConfig>, strategy?: BackoffStrategy) {
    this.config = { ...DELAYS_PADRAO, ...config }
    this.strategy = strategy ?? backoffExponencial
  }

  obterConfig(): RetryConfig {
    return { ...this.config }
  }

  calcularDelay(attempt: number): number {
    return this.strategy(this.config, attempt)
  }
}

export class RetryExecutor {
  private policy: RetryPolicy

  constructor(policy?: RetryPolicy) {
    this.policy = policy ?? new RetryPolicy()
  }

  async execute<T>(fn: () => Promise<T>): Promise<RetryResult<T>> {
    const attempts: RetryAttempt[] = []
    const inicio = Date.now()
    let ultimoErro: Error | undefined

    for (let i = 1; i <= this.policy.obterConfig().maxRetries; i++) {
      const startedAt = new Date()
      try {
        const result = await fn()
        const finishedAt = new Date()
        attempts.push({
          attempt: i,
          startedAt,
          finishedAt,
          duration: finishedAt.getTime() - startedAt.getTime(),
          success: true,
        })
        return {
          success: true,
          attempts,
          totalDuration: Date.now() - inicio,
          result,
        }
      } catch (err) {
        const finishedAt = new Date()
        ultimoErro = err instanceof Error ? err : new Error(String(err))
        attempts.push({
          attempt: i,
          startedAt,
          finishedAt,
          duration: finishedAt.getTime() - startedAt.getTime(),
          success: false,
          error: ultimoErro.message,
        })
        if (i < this.policy.obterConfig().maxRetries) {
          const delay = this.policy.calcularDelay(i)
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }

    return {
      success: false,
      attempts,
      totalDuration: Date.now() - inicio,
      error: ultimoErro?.message,
    }
  }
}
