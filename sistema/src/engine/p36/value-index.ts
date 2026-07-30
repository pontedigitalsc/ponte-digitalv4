// P36 ETAPA 3 — Índice de Valor Percebido
// Mede quanto valor a Ponte realmente entregou.
// Interno. Nunca aparece como score técnico para o empresário.

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type SinalValorTipo =
  | 'VOLTOU_ESPONTANEO'
  | 'DECIDIU_APOS_RECOMENDACAO'
  | 'ECONOMIZOU_TEMPO'
  | 'RESOLVEU_PROBLEMA'
  | 'REPETIU_COMPORTAMENTO'

const PESOS: Record<SinalValorTipo, number> = {
  VOLTOU_ESPONTANEO: 2.0,
  DECIDIU_APOS_RECOMENDACAO: 1.5,
  ECONOMIZOU_TEMPO: 1.0,
  RESOLVEU_PROBLEMA: 1.5,
  REPETIU_COMPORTAMENTO: 1.0,
}

export async function registrarSinalValor(
  empresaId: string,
  tipo: SinalValorTipo,
  origem: string,
  metadata?: Prisma.InputJsonValue,
) {
  await prisma.sinalValor.create({
    data: {
      empresaId,
      tipo,
      origem,
      peso: PESOS[tipo],
      metadata: metadata ?? Prisma.DbNull,
    },
  })
}

export async function calcularIndiceValor(empresaId: string): Promise<{
  indice: number
  sinais: number
  scorePorTipo: Record<string, number>
}> {
  const sinais = await prisma.sinalValor.findMany({
    where: { empresaId, deletedAt: null },
  })

  const scorePorTipo: Record<string, number> = {}
  let totalPonderado = 0

  for (const s of sinais) {
    const chave = s.tipo
    scorePorTipo[chave] = (scorePorTipo[chave] ?? 0) + s.peso
    totalPonderado += s.peso
  }

  return {
    indice: Math.round(totalPonderado * 10) / 10,
    sinais: sinais.length,
    scorePorTipo,
  }
}

export async function calcularIndiceGlobal(): Promise<{
  indiceMedio: number
  totalEmpresas: number
  totalSinais: number
}> {
  const empresas = await prisma.empresa.findMany({
    where: { ativa: true, deletedAt: null },
    select: { id: true },
  })

  let totalIndice = 0
  let totalSinais = 0

  for (const emp of empresas) {
    const result = await calcularIndiceValor(emp.id)
    totalIndice += result.indice
    totalSinais += result.sinais
  }

  return {
    indiceMedio: empresas.length > 0 ? Math.round((totalIndice / empresas.length) * 10) / 10 : 0,
    totalEmpresas: empresas.length,
    totalSinais,
  }
}
