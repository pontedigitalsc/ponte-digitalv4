export interface PipelineStepExecution {
  correlationId: string
  eventId: string
  eventType: string
  handler: string
  tenantId: string
  step: number
  startedAt: Date
  finishedAt: Date
  duration: number
  success: boolean
  error?: string
}

export interface PipelineExecution {
  correlationId: string
  tenantId: string
  steps: PipelineStepExecution[]
  success: boolean
}

export interface PipelineMetrics {
  totalExecucoes: number
  totalErros: number
  tempoMedio: number
  tempoMax: number
  tempoMin: number
  execucoesPorEvento: Record<string, number>
  execucoesPorHandler: Record<string, number>
}

export interface PipelineSnapshot {
  metricas: PipelineMetrics
  timestamp: Date
  pipelinesAtivos: number
}

export interface PipelineTimeline {
  correlationId: string
  tenantId: string
  steps: {
    step: number
    eventType: string
    handler: string
    eventoId: string
    startedAt: Date
    finishedAt: Date
    duration: number
    success: boolean
    error?: string
  }[]
  totalDuration: number
  completo: boolean
}

export class PipelineMonitor {
  private execucoes = new Map<string, PipelineExecution>()
  private criadoEm = new Date()

  registrarInicio(params: {
    correlationId: string
    eventId: string
    eventType: string
    handler: string
    tenantId: string
    step: number
    startedAt: Date
  }): void {
    const key = params.correlationId
    if (!this.execucoes.has(key)) {
      this.execucoes.set(key, {
        correlationId: key,
        tenantId: params.tenantId,
        steps: [],
        success: true,
      })
    }
  }

  registrarFim(params: {
    correlationId: string
    eventId: string
    eventType: string
    handler: string
    tenantId: string
    step: number
    startedAt: Date
    finishedAt: Date
    duration: number
  }): void {
    const exec = this.execucoes.get(params.correlationId)
    if (!exec) return

    exec.steps.push({
      correlationId: params.correlationId,
      eventId: params.eventId,
      eventType: params.eventType,
      handler: params.handler,
      tenantId: params.tenantId,
      step: params.step,
      startedAt: params.startedAt,
      finishedAt: params.finishedAt,
      duration: params.duration,
      success: true,
    })
  }

  registrarErro(params: {
    correlationId: string
    eventId: string
    eventType: string
    handler: string
    tenantId: string
    step: number
    startedAt: Date
    finishedAt: Date
    duration: number
    error: string
  }): void {
    const exec = this.execucoes.get(params.correlationId)
    if (!exec) return

    exec.success = false
    exec.steps.push({
      correlationId: params.correlationId,
      eventId: params.eventId,
      eventType: params.eventType,
      handler: params.handler,
      tenantId: params.tenantId,
      step: params.step,
      startedAt: params.startedAt,
      finishedAt: params.finishedAt,
      duration: params.duration,
      success: false,
      error: params.error,
    })
  }

  obterTimeline(correlationId: string): PipelineTimeline | undefined {
    const exec = this.execucoes.get(correlationId)
    if (!exec) return undefined

    const steps = [...exec.steps].sort((a, b) => a.step - b.step)
    const primeiro = steps[0]
    const ultimo = steps[steps.length - 1]
    const totalDuration = ultimo ? ultimo.finishedAt.getTime() - primeiro.startedAt.getTime() : 0
    const completo = steps.length === 4 && steps.every((s) => s.step >= 1 && s.step <= 4)

    return {
      correlationId: exec.correlationId,
      tenantId: exec.tenantId,
      steps: steps.map((s) => ({
        step: s.step,
        eventType: s.eventType,
        handler: s.handler,
        eventoId: s.eventId,
        startedAt: s.startedAt,
        finishedAt: s.finishedAt,
        duration: s.duration,
        success: s.success,
        error: s.error,
      })),
      totalDuration,
      completo,
    }
  }

  obterMetricas(): PipelineSnapshot {
    const todasEtapas: PipelineStepExecution[] = []
    let totalErros = 0

    for (const exec of this.execucoes.values()) {
      for (const step of exec.steps) {
        todasEtapas.push(step)
        if (!step.success) totalErros++
      }
    }

    const durations = todasEtapas.map((s) => s.duration)
    const tempoMedio = durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0
    const tempoMax = durations.length > 0 ? Math.max(...durations) : 0
    const tempoMin = durations.length > 0 ? Math.min(...durations) : 0

    const execucoesPorEvento: Record<string, number> = {}
    const execucoesPorHandler: Record<string, number> = {}
    for (const step of todasEtapas) {
      execucoesPorEvento[step.eventType] = (execucoesPorEvento[step.eventType] ?? 0) + 1
      execucoesPorHandler[step.handler] = (execucoesPorHandler[step.handler] ?? 0) + 1
    }

    const pipelinesAtivos = [...this.execucoes.values()].filter((e) => {
      const ultimoStep = e.steps[e.steps.length - 1]
      return !ultimoStep || e.steps.length < 4
    }).length

    return {
      metricas: {
        totalExecucoes: todasEtapas.length,
        totalErros,
        tempoMedio,
        tempoMax,
        tempoMin,
        execucoesPorEvento,
        execucoesPorHandler,
      },
      timestamp: new Date(),
      pipelinesAtivos,
    }
  }

  reset(): void {
    this.execucoes.clear()
    this.criadoEm = new Date()
  }
}
