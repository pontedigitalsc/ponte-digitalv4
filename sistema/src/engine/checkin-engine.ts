import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

// ─────────────────────────────────────────────────────────────────────────────
// CHECK-IN DIÁRIO — P95
//
// O dashboard pergunta "Como sua empresa está hoje?" e o empresário escreve o
// que aconteceu. Antes, o texto era descartado: o botão apenas navegava para a
// conversa. Este motor garante que a entrada não se perca — ela vira um
// `SinalValor` `CHECKIN_DIARIO` (memória operacional real da empresa).
//
// - Idempotente por dia: dentro da mesma janela de 24h, o registro daquele
//   dia é atualizado, não duplicado.
// - Determinístico: nada de IA — apenas gravar o que foi dito, com o humor
//   escolhido, para alimentar o histórico da empresa.
// ─────────────────────────────────────────────────────────────────────────────

export const TIPO_CHECKIN_DIARIO = 'CHECKIN_DIARIO'
export const ORIGEM_COMO_ESTA_HOJE = 'DASHBOARD_COMO_ESTA_HOJE'

export const JANELA_CHECKIN_MS = 24 * 60 * 60 * 1000 // 24h — um check-in por dia

export interface CheckinDiarioDados {
  humor: string
  texto: string
}

/**
 * Persiste o check-in diário do empresário como SinalValor.
 * Retorna `true` se gravou (ou atualizou) um registro, `false` se a entrada
 * estava vazia.
 */
export async function registrarCheckinDiario(
  empresaId: string,
  dados: CheckinDiarioDados
): Promise<boolean> {
  const texto = dados.texto?.trim()
  const humor = dados.humor?.trim()

  if (!texto && !humor) return false

  const agora = new Date()
  const inicioJanela = new Date(agora.getTime() - JANELA_CHECKIN_MS)

  const existente = await prisma.sinalValor.findFirst({
    where: {
      empresaId,
      tipo: TIPO_CHECKIN_DIARIO,
      origem: ORIGEM_COMO_ESTA_HOJE,
      deletedAt: null,
      criadoEm: { gte: inicioJanela },
    },
    select: { id: true, metadata: true },
    orderBy: { criadoEm: 'desc' },
  })

  const metadata = {
    humor,
    texto,
    registradoEm: agora.toISOString(),
  }

  if (existente) {
    await prisma.sinalValor.update({
      where: { id: existente.id },
      data: {
        metadata: { ...((existente.metadata as Record<string, unknown>) ?? {}), ...metadata },
      },
    })
    return true
  }

  await prisma.sinalValor.create({
    data: {
      empresaId,
      tipo: TIPO_CHECKIN_DIARIO,
      origem: ORIGEM_COMO_ESTA_HOJE,
      peso: 1.0,
      metadata,
    },
  })
  return true
}
