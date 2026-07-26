import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { CicloConfiguracao } from '@prisma/client'
import type { FrequenciaCiclo as PrismaFrequenciaCiclo } from '@prisma/client'
export type FrequenciaCiclo = PrismaFrequenciaCiclo

export interface CicloConfig {
  id: string
  empresaId: string
  tipo: string
  frequencia: FrequenciaCiclo
  ativo: boolean
  ultimaExecucao: Date | null
  proximaExecucao: Date | null
  heartbeatEm: Date | null
  heartbeatOk: boolean
  config: Record<string, unknown> | null
}

export interface StatusCiclo extends CicloConfig {
  saudavel: boolean
  horasDesdeHeartbeat: number | null
  horasAteProxima: number | null
}

export interface HeartbeatResult {
  ok: boolean
  atrasado: boolean
  horasAtraso: number | null
}

// ─── Rhythm calculation (pure) ─────────────────────────────────────

export function calcularProximaData(frequencia: FrequenciaCiclo, base: Date = new Date()): Date {
  const prox = new Date(base)
  switch (frequencia) {
    case 'DIARIA':
      prox.setDate(prox.getDate() + 1)
      break
    case 'SEMANAL':
      prox.setDate(prox.getDate() + 7)
      break
    case 'MENSAL':
      prox.setMonth(prox.getMonth() + 1)
      break
  }
  prox.setHours(0, 0, 0, 0)
  return prox
}

function calcularStatusCiclo(ciclo: CicloConfiguracao): StatusCiclo {
  const agora = new Date()
  const ultimaExecucao = ciclo.ultimaExecucao
  const heartbeatEm = ciclo.heartbeatEm
  const proximaExecucao = ciclo.proximaExecucao

  const horasDesdeHeartbeat = heartbeatEm
    ? Math.floor((agora.getTime() - heartbeatEm.getTime()) / (1000 * 60 * 60))
    : null

  const horasAteProxima = proximaExecucao
    ? Math.floor((proximaExecucao.getTime() - agora.getTime()) / (1000 * 60 * 60))
    : null

  const saudavel = ciclo.heartbeatOk && (horasDesdeHeartbeat === null || horasDesdeHeartbeat < 48)

  return {
    id: ciclo.id,
    empresaId: ciclo.empresaId,
    tipo: ciclo.tipo,
    frequencia: ciclo.frequencia,
    ativo: ciclo.ativo,
    ultimaExecucao,
    proximaExecucao,
    heartbeatEm,
    heartbeatOk: ciclo.heartbeatOk,
    config: ciclo.config as Record<string, unknown> | null,
    saudavel,
    horasDesdeHeartbeat,
    horasAteProxima,
  }
}

// ─── DB access ─────────────────────────────────────────────────────

export async function configurarCiclo(
  empresaId: string,
  tipo: string,
  frequencia: FrequenciaCiclo,
  ativo: boolean = true,
  config?: Record<string, unknown>
): Promise<CicloConfig> {
  const result = await prisma.cicloConfiguracao.upsert({
    where: { empresaId_tipo: { empresaId, tipo } },
    update: { frequencia, ativo, config: config ?? undefined },
    create: {
      empresaId,
      tipo,
      frequencia,
      ativo,
      proximaExecucao: calcularProximaData(frequencia),
      config: config ?? undefined,
    },
  })
  return result as unknown as CicloConfig
}

export async function obterCiclo(
  empresaId: string,
  tipo: string
): Promise<StatusCiclo | null> {
  const ciclo = await prisma.cicloConfiguracao.findUnique({
    where: { empresaId_tipo: { empresaId, tipo } },
  })
  if (!ciclo) return null
  return calcularStatusCiclo(ciclo)
}

export async function obterCiclos(
  empresaId: string,
  ativos?: boolean
): Promise<StatusCiclo[]> {
  const where: Record<string, unknown> = { empresaId }
  if (ativos !== undefined) where.ativo = ativos

  const ciclos = await prisma.cicloConfiguracao.findMany({
    where: where as never,
    orderBy: { criadoEm: 'asc' },
  })
  return ciclos.map(calcularStatusCiclo)
}

export async function desativarCiclo(
  empresaId: string,
  tipo: string
): Promise<void> {
  await prisma.cicloConfiguracao.update({
    where: { empresaId_tipo: { empresaId, tipo } },
    data: { ativo: false },
  })
}

// ─── Heartbeat ─────────────────────────────────────────────────────

export async function registrarHeartbeat(
  empresaId: string,
  tipo: string
): Promise<HeartbeatResult> {
  const ciclo = await prisma.cicloConfiguracao.findUnique({
    where: { empresaId_tipo: { empresaId, tipo } },
  })
  if (!ciclo) {
    return { ok: false, atrasado: false, horasAtraso: null }
  }

  const agora = new Date()
  const diffMs = ciclo.proximaExecucao
    ? agora.getTime() - new Date(ciclo.proximaExecucao).getTime()
    : 0
  const horasAtraso = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)))

  await prisma.cicloConfiguracao.update({
    where: { empresaId_tipo: { empresaId, tipo } },
    data: {
      ultimaExecucao: agora,
      heartbeatEm: agora,
      heartbeatOk: horasAtraso < 24,
      proximaExecucao: calcularProximaData(ciclo.frequencia, agora),
    },
  })

  return { ok: true, atrasado: horasAtraso > 0, horasAtraso }
}

export async function verificarHeartbeats(empresaId: string): Promise<StatusCiclo[]> {
  const ciclos = await prisma.cicloConfiguracao.findMany({
    where: { empresaId, ativo: true },
  })

  const agora = new Date()
  const desatualizados = ciclos.filter((c) => {
    const horasDesde = c.heartbeatEm
      ? Math.floor((agora.getTime() - c.heartbeatEm.getTime()) / (1000 * 60 * 60))
      : null
    return c.heartbeatOk && horasDesde !== null && horasDesde >= 48
  })

  if (desatualizados.length > 0) {
    await prisma.cicloConfiguracao.updateMany({
      where: { id: { in: desatualizados.map((c) => c.id) } },
      data: { heartbeatOk: false },
    })
  }

  return ciclos.map(calcularStatusCiclo)
}

export interface AtualizarConfigInput {
  tipo: string
  ativo?: boolean
  frequencia?: FrequenciaCiclo
  config?: Record<string, unknown>
}

export async function atualizarConfiguracaoCiclo(
  empresaId: string,
  input: AtualizarConfigInput
): Promise<CicloConfig | null> {
  if (input.ativo === false) {
    await desativarCiclo(empresaId, input.tipo)
    return null
  }
  return configurarCiclo(empresaId, input.tipo, input.frequencia!, input.ativo ?? true, input.config)
}

// ─── Alias (backward compat) ───────────────────────────────────────

export async function obterStatusCiclos(empresaId: string): Promise<StatusCiclo[]> {
  return obterCiclos(empresaId)
}
