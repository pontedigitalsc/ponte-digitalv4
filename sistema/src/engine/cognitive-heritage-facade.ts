import { obterConhecimentosAprovados, auditarConhecimento } from './knowledge-governance-engine'
import { avaliarEnvelhecimento } from './knowledge-aging-engine'
import { avaliar, getForgettingStats, EstadoConhecimento } from './forgetting-engine'
import { executarSintese, getSynthesisStats } from './synthesis-engine'
import { registrarNaMemoria, consultarMemoria } from './cognitive-memory-engine'
import type { KnowledgeAge } from './knowledge-aging-engine'
import type { AvaliacaoResultado } from './forgetting-engine'
import type { ResultadoSintese } from './synthesis-engine'
import type { AuditoriaConhecimento } from './knowledge-governance-engine'
import type { CategoriaEvidencia } from '@prisma/client'

// ─── Tipos públicos da Facade ───────────────────────────────────────────────

export interface EntradaMemoriaFacade {
  tipo: 'descoberta' | 'mudanca' | 'confirmacao' | 'descarte' | 'evolucao'
  descricao: string
  categoria: string
  versao: number
  metadados?: Record<string, unknown>
}

export interface EstadoPatrimonio {
  data: string
  empresaId: string
  conhecimentos: {
    ativos: number
    enfraquecendo: number
    adormecidos: number
    arquivados: number
  }
  envelhecimento: {
    riscoAlto: number
    riscoMedio: number
    riscoBaixo: number
    precisaRevalidar: number
  }
  metricas: {
    scoreMedioAuditoria: number
    totalConhecimentos: number
    sintesesDisponiveis: number
    ultimasMemorias: number
  }
}

export interface FacadeMetrics {
  requisicoes: number
  tempoMedioMs: number
  falhas: number
  operacoes: Record<string, number>
}

// ─── Observabilidade ────────────────────────────────────────────────────────

let facadeStats = {
  requisicoes: 0,
  tempoMedioMs: 0,
  falhas: 0,
  operacoes: {} as Record<string, number>,
}
let totalMs = 0
let totalExec = 0

function registrarOperacao(operacao: string, inicio: number): void {
  const duracao = Date.now() - inicio
  totalMs += duracao
  totalExec++
  facadeStats.requisicoes++
  facadeStats.tempoMedioMs = totalExec > 0 ? Math.round(totalMs / totalExec) : 0
  facadeStats.operacoes[operacao] = (facadeStats.operacoes[operacao] ?? 0) + 1
}

function registrarFalha(): void {
  facadeStats.falhas++
}

export function obterMetricas(): FacadeMetrics {
  return { ...facadeStats, operacoes: { ...facadeStats.operacoes } }
}

export function resetMetricas(): void {
  facadeStats = { requisicoes: 0, tempoMedioMs: 0, falhas: 0, operacoes: {} }
  totalMs = 0
  totalExec = 0
}

// ─── Métodos da Facade ──────────────────────────────────────────────────────

export async function obterConhecimentos(empresaId: string) {
  const inicio = Date.now()
  try {
    const conhecimentos = await obterConhecimentosAprovados(empresaId)
    registrarOperacao('obterConhecimentos', inicio)
    return conhecimentos
  } catch (err) {
    registrarFalha()
    throw err
  }
}

export async function avaliarEnvelhecimentoPatrimonio(empresaId: string): Promise<{
  itens: KnowledgeAge[]
  resumo: { riscoAlto: number; riscoMedio: number; riscoBaixo: number; precisaRevalidar: number }
}> {
  const inicio = Date.now()
  try {
    const itens = await avaliarEnvelhecimento(empresaId)
    const resumo = {
      riscoAlto: itens.filter((i) => i.risco === 'ALTO').length,
      riscoMedio: itens.filter((i) => i.risco === 'MEDIO').length,
      riscoBaixo: itens.filter((i) => i.risco === 'BAIXO').length,
      precisaRevalidar: itens.filter((i) => i.precisaRevalidar).length,
    }
    registrarOperacao('avaliarEnvelhecimento', inicio)
    return { itens, resumo }
  } catch (err) {
    registrarFalha()
    throw err
  }
}

export async function avaliarEsquecimento(
  empresaId: string
): Promise<AvaliacaoResultado> {
  const inicio = Date.now()
  try {
    const resultado = await avaliar(empresaId)
    registrarOperacao('avaliarEsquecimento', inicio)
    return resultado
  } catch (err) {
    registrarFalha()
    throw err
  }
}

export async function gerarSinteses(empresaId: string): Promise<ResultadoSintese> {
  const inicio = Date.now()
  try {
    const resultado = await executarSintese(empresaId)
    registrarOperacao('gerarSinteses', inicio)
    return resultado
  } catch (err) {
    registrarFalha()
    throw err
  }
}

export async function obterEstadoPatrimonio(empresaId: string): Promise<EstadoPatrimonio> {
  const inicio = Date.now()
  try {
    const [avaliacaoMemoria, envelhecimento, auditoria, forgettingStats, sinteseStats, memorias] =
      await Promise.all([
        avaliar(empresaId),
        avaliarEnvelhecimento(empresaId),
        auditarConhecimento(empresaId).catch(() => ({
          conhecimentosPromovidos: 0,
          conhecimentosEnfraquecidos: 0,
          conhecimentosDescartados: 0,
          totalConhecimentos: 0,
          auditoriasRecentes: [],
          scoreMedio: 0,
        }) as AuditoriaConhecimento),
        Promise.resolve(getForgettingStats()),
        Promise.resolve(getSynthesisStats()),
        consultarMemoria(empresaId, 5),
      ])

    const resumo = avaliacaoMemoria.resumo

    const estado: EstadoPatrimonio = {
      data: new Date().toISOString(),
      empresaId,
      conhecimentos: {
        ativos: resumo.manterAtivo,
        enfraquecendo: resumo.enfraquecer,
        adormecidos: resumo.adormecer,
        arquivados: resumo.arquivar,
      },
      envelhecimento: {
        riscoAlto: envelhecimento.filter((i) => i.risco === 'ALTO').length,
        riscoMedio: envelhecimento.filter((i) => i.risco === 'MEDIO').length,
        riscoBaixo: envelhecimento.filter((i) => i.risco === 'BAIXO').length,
        precisaRevalidar: envelhecimento.filter((i) => i.precisaRevalidar).length,
      },
      metricas: {
        scoreMedioAuditoria: auditoria.scoreMedio,
        totalConhecimentos: auditoria.totalConhecimentos,
        sintesesDisponiveis: sinteseStats.sintesesGeradas,
        ultimasMemorias: memorias.length,
      },
    }

    registrarOperacao('obterEstadoPatrimonio', inicio)
    return estado
  } catch (err) {
    registrarFalha()
    throw err
  }
}

export async function registrarMemoria(
  empresaId: string,
  entrada: EntradaMemoriaFacade
): Promise<void> {
  const inicio = Date.now()
  try {
    await registrarNaMemoria(empresaId, {
      tipo: entrada.tipo,
      descricao: entrada.descricao,
      categoria: entrada.categoria as CategoriaEvidencia,
      versao: entrada.versao,
      metadados: entrada.metadados,
    })
    registrarOperacao('registrarMemoria', inicio)
  } catch (err) {
    registrarFalha()
    throw err
  }
}
