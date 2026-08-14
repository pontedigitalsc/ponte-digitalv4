import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'
import { assertRateLimit } from '@/lib/rate-limit'
import { registrarCheckinDiario } from '@/engine/checkin-engine'
import { z } from 'zod'

// P95 — Check-in diário: o texto que o empresário escreve no dashboard não
// pode se perder. Esta rota grava (deterministicamente) humor + relato como
// SinalValor `CHECKIN_DIARIO` da empresa. Depois disso, o empresário segue
// para a conversa — a entrada virou memória.

const HUMORES = [
  'Muito bem',
  'Bem',
  'Mais ou menos',
  'Difícil',
  'Muito difícil',
] as const

const schema = z.object({
  humor: z.enum(HUMORES),
  texto: z.string().trim().min(1).max(2000),
})

// POST /api/dashboard/checkin — registra o check-in diário do empresário.
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    assertRateLimit(`checkin:${usuario.id}`, 'API_GERAL')

    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 })
    }

    const gravou = await registrarCheckinDiario(usuario.empresaId, parsed.data)

    return NextResponse.json({ data: { gravou } })
  } catch (err) {
    return handleApiError(err)
  }
}
