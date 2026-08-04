import { NextRequest, NextResponse } from 'next/server'
import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import { handleApiError } from '@/lib/api-error'
import { assertRateLimit } from '@/lib/rate-limit'
import { registrarRetorno } from '@/engine/retorno-engine'
import type { OpcaoRetorno } from '@/engine/retorno-engine'
import { z } from 'zod'

// P64 — O Retorno: depois de alguns dias da primeira conversa, o empresário
// volta e responde em um minuto: "O que aconteceu depois da nossa conversa?"
// A resposta é evidência real (SinalValor RETORNO_7_DIAS + PRIMEIRO_RETORNO).
// Conversa anônima: fica pendente na conversa e é registrada quando a conta
// existe (mesmo padrão da Clareza Gerada — nada se perde silenciosamente).

const OPCOES: OpcaoRetorno[] = ['voltei-a-olhar', 'comecei-algo', 'mudou-minha-visao', 'nada-ainda']

const schema = z.object({
  mudou: z.enum(OPCOES as [OpcaoRetorno, ...OpcaoRetorno[]]),
  texto: z.string().trim().min(1).max(2000),
})

// POST /api/conversa/retorno — registra o check-in de retorno.
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    assertRateLimit(`retorno:${ip}`, 'CONVERSA')

    const token = request.cookies.get('conv_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Conversa não iniciada' }, { status: 400 })
    }

    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 })
    }

    const { mudou, texto } = parsed.data

    const conversa = await prismaSeguro.conversa.findFirst({
      where: { token, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      select: { empresaId: true },
    })

    const resultado = await registrarRetorno(token, { mudou, texto })

    if (resultado.pendente || !conversa?.empresaId) {
      return NextResponse.json({ data: { gravado: false, motivo: 'sem-conta', pendente: true } })
    }

    return NextResponse.json({ data: { gravado: true } })
  } catch (err) {
    return handleApiError(err)
  }
}
