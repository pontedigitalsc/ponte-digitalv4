import { NextRequest, NextResponse } from 'next/server'
import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import { handleApiError } from '@/lib/api-error'
import { assertRateLimit } from '@/lib/rate-limit'
import { registrarClarezaPendente, registrarClarezaDaConversa, CATEGORIAS_CLAREZA } from '@/engine/clareza-engine'
import { z } from 'zod'

// P59 — Métrica de Valor Real: a Clareza Gerada não é score, é evidência.
// Logo após a conversa, o empresário responde: "Qual foi a principal coisa
// que você percebeu sobre sua empresa?" com uma categoria de impacto.

const schema = z.object({
  categoria: z.enum(CATEGORIAS_CLAREZA),
  texto: z.string().trim().min(1).max(2000),
})

// POST /api/conversa/clareza — registra a evidência de clareza percebida.
// Conversa anônima: a resposta fica pendente na conversa e é registrada
// quando a conta é criada (nada é perdido silenciosamente).
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    assertRateLimit(`clareza:${ip}`, 'CONVERSA')

    const token = request.cookies.get('conv_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Conversa não iniciada' }, { status: 400 })
    }

    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 })
    }

    const { categoria, texto } = parsed.data

    const conversa = await prismaSeguro.conversa.findFirst({
      where: { token, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      select: { empresaId: true },
    })

    await registrarClarezaPendente(token, { categoria, texto })

    if (!conversa?.empresaId) {
      return NextResponse.json({ data: { gravado: false, motivo: 'sem-conta', pendente: true } })
    }

    await registrarClarezaDaConversa(token, conversa.empresaId)

    return NextResponse.json({ data: { gravado: true } })
  } catch (err) {
    return handleApiError(err)
  }
}
