import type { PipelineTimeline } from './pipeline-monitor'
import { pipelineMonitor } from './pipelines/diagnostico.pipeline'

export type TipoDiferenca =
  | 'IDENTICO'
  | 'COMPATIVEL'
  | 'DIVERGENTE'
  | 'FALTANDO_EVENTO'
  | 'EVENTO_EXTRA'
  | 'PAYLOAD_DIFERENTE'
  | 'ORDEM_DIFERENTE'
  | 'TEMPO_ANORMAL'

export interface LegacyStep {
  step: number
  eventType: string
  handler: string
  duration: number
  success: boolean
  payload?: unknown
}

export interface PipelineDifference {
  tipo: TipoDiferenca
  step?: number
  eventType?: string
  descricao: string
  esperado?: string
  recebido?: string
}

export interface PipelineComparisonResult {
  resultado: 'IDENTICO' | 'COMPATIVEL' | 'DIVERGENTE'
  diferencas: PipelineDifference[]
  totalSteps: number
  stepsIguais: number
  stepsDiferentes: number
}

export interface PipelineComparison {
  correlationId: string
  data: Date
  legado: LegacyStep[]
  pipelineTimeline?: PipelineTimeline
  resultado: PipelineComparisonResult
}

export interface ComparisonSnapshot {
  totalComparacoes: number
  identicas: number
  compativeis: number
  divergentes: number
  diferencasPorTipo: Record<string, number>
  diferencasPorEtapa: Record<string, number>
  diferencasPorEvento: Record<string, number>
}

export class PipelineComparator {
  private comparacoes: PipelineComparison[] = []

  comparar(
    correlationId: string,
    legado: LegacyStep[]
  ): PipelineComparison {
    const pipeline = pipelineMonitor.obterTimeline(correlationId)
    const result = this.compararComTimeline(legado, pipeline)
    const comparacao: PipelineComparison = {
      correlationId,
      data: new Date(),
      legado,
      pipelineTimeline: pipeline,
      resultado: result,
    }
    this.comparacoes.push(comparacao)
    return comparacao
  }

  private compararComTimeline(
    legado: LegacyStep[],
    pipeline?: PipelineTimeline
  ): PipelineComparisonResult {
    const diferencas: PipelineDifference[] = []

    if (!pipeline) {
      diferencas.push({ tipo: 'DIVERGENTE', descricao: 'Pipeline nao executou (sem timeline)' })
      return { resultado: 'DIVERGENTE', diferencas, totalSteps: legado.length, stepsIguais: 0, stepsDiferentes: legado.length }
    }

    if (legado.length === 0 && pipeline.steps.length === 0) {
      return { resultado: 'IDENTICO', diferencas: [], totalSteps: 0, stepsIguais: 0, stepsDiferentes: 0 }
    }

    const diffs = this.compararSequencia(legado, pipeline)
    diferencas.push(...diffs)

    const stepsIguais = legado.length - diferencas.filter((d) => d.step !== undefined).length
    const stepsDiferentes = legado.length - stepsIguais

    let resultado: 'IDENTICO' | 'COMPATIVEL' | 'DIVERGENTE' = 'IDENTICO'
    if (diferencas.length > 0) {
      const tiposCriticos: TipoDiferenca[] = ['DIVERGENTE', 'FALTANDO_EVENTO', 'EVENTO_EXTRA', 'ORDEM_DIFERENTE', 'PAYLOAD_DIFERENTE']
      resultado = diferencas.some((d) => tiposCriticos.includes(d.tipo))
        ? 'DIVERGENTE'
        : 'COMPATIVEL'
    }

    return { resultado, diferencas, totalSteps: Math.max(legado.length, pipeline.steps.length), stepsIguais, stepsDiferentes }
  }

  private compararSequencia(legado: LegacyStep[], pipeline: PipelineTimeline): PipelineDifference[] {
    const diffs: PipelineDifference[] = []
    const maxSteps = Math.max(legado.length, pipeline.steps.length)

    for (let i = 0; i < maxSteps; i++) {
      const l = legado[i]
      const p = pipeline.steps[i]

      if (!l && p) {
        diffs.push({ tipo: 'EVENTO_EXTRA', step: p.step, eventType: p.eventType, descricao: `Pipeline executou step ${p.step} (${p.eventType}) sem equivalente legado` })
        continue
      }
      if (l && !p) {
        diffs.push({ tipo: 'FALTANDO_EVENTO', step: l.step, eventType: l.eventType, descricao: `Legado executou step ${l.step} (${l.eventType}) mas pipeline nao` })
        continue
      }
      if (!l || !p) continue

      if (l.step !== p.step) {
        diffs.push({ tipo: 'ORDEM_DIFERENTE', step: l.step, descricao: `Ordem diferente no step ${i + 1}: legado=${l.step}, pipeline=${p.step}` })
      }

      if (l.eventType !== p.eventType) {
        diffs.push({
          tipo: 'DIVERGENTE', step: l.step, eventType: l.eventType,
          descricao: `EventType diferente no step ${l.step}: legado=${l.eventType}, pipeline=${p.eventType}`,
          esperado: l.eventType, recebido: p.eventType,
        })
      }

      if (l.success !== p.success) {
        diffs.push({
          tipo: 'DIVERGENTE', step: l.step, eventType: l.eventType,
          descricao: `Status diferente no step ${l.step}: legado=${l.success}, pipeline=${p.success}`,
          esperado: String(l.success), recebido: String(p.success),
        })
      }

      const threshold = l.duration * 3
      if (p.duration > threshold && threshold > 0) {
        diffs.push({
          tipo: 'TEMPO_ANORMAL', step: l.step, eventType: l.eventType,
          descricao: `Tempo anormal no step ${l.step}: legado=${l.duration}ms, pipeline=${p.duration}ms (limite=${Math.round(threshold)}ms)`,
          esperado: `${l.duration}ms`, recebido: `${p.duration}ms`,
        })
      }
    }

    return diffs
  }

  compararPayload(esperado: unknown, recebido: unknown): PipelineDifference[] {
    const diffs: PipelineDifference[] = []
    if (typeof esperado !== typeof recebido) {
      diffs.push({
        tipo: 'PAYLOAD_DIFERENTE',
        descricao: 'Tipo do payload difere',
        esperado: typeof esperado,
        recebido: typeof recebido,
      })
      return diffs
    }

    if (typeof esperado === 'object' && esperado !== null && recebido !== null) {
      const keysEsperado = Object.keys(esperado as Record<string, unknown>)
      const keysRecebido = Object.keys(recebido as Record<string, unknown>)

      for (const key of keysEsperado) {
        if (!(key in (recebido as Record<string, unknown>))) {
          diffs.push({ tipo: 'PAYLOAD_DIFERENTE', descricao: `Chave '${key}' ausente no recebido`, esperado: `chave=${key}` })
        }
      }
      for (const key of keysRecebido) {
        if (!(key in (esperado as Record<string, unknown>))) {
          diffs.push({ tipo: 'PAYLOAD_DIFERENTE', descricao: `Chave '${key}' extra no recebido`, esperado: `chave=${key}` })
        }
      }
    }

    return diffs
  }

  obterResumo(): ComparisonSnapshot {
    let identicas = 0
    let compativeis = 0
    let divergentes = 0
    const diferencasPorTipo: Record<string, number> = {}
    const diferencasPorEtapa: Record<string, number> = {}
    const diferencasPorEvento: Record<string, number> = {}

    for (const c of this.comparacoes) {
      if (c.resultado.resultado === 'IDENTICO') identicas++
      else if (c.resultado.resultado === 'COMPATIVEL') compativeis++
      else divergentes++

      for (const d of c.resultado.diferencas) {
        diferencasPorTipo[d.tipo] = (diferencasPorTipo[d.tipo] ?? 0) + 1
        if (d.step !== undefined) {
          const key = `step_${d.step}`
          diferencasPorEtapa[key] = (diferencasPorEtapa[key] ?? 0) + 1
        }
        if (d.eventType) {
          diferencasPorEvento[d.eventType] = (diferencasPorEvento[d.eventType] ?? 0) + 1
        }
      }
    }

    return {
      totalComparacoes: this.comparacoes.length,
      identicas,
      compativeis,
      divergentes,
      diferencasPorTipo,
      diferencasPorEtapa,
      diferencasPorEvento,
    }
  }

  reset(): void {
    this.comparacoes = []
  }
}
