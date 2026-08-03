import { NextRequest, NextResponse } from 'next/server'
import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import { handleApiError } from '@/lib/api-error'
import { assertRateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

// P59 — Métrica de Valor Real: a Clareza Gerada não é score, é evidência.
// Logo após a conversa, o empresário responde: "Qual foi a principal coisa
// que você percebeu sobre sua empresa?" com uma categoria de impacto.
const CATEGORIAS = ['NOVA_PERCEPCAO', 'CONFIRMACAO', 'MUDANCA_DE_DECISAO', 'NENHUM_IMPACTO'] as const

const schema = z.object({
  categoria: z.enum(CATEGORIAS),
  texto: z.string().trim().min(1).max(2000),
})

const ROTULOS: Record<(typeof CATEGORIAS)[number], string> = {
  NOVA_PERCEPCAO: 'Nova percepção',
  CONFIRMACAO: 'Confirmação',
  MUDANCA_DE_DECISAO: 'Mudança de decisão',
  NENHUM_IMPACTO: 'Nenhum impacto',
}

// POST /api/conversa/clareza — registra a evidência de clareza percebida
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

    // Sem empresa vinculada (conversa anônima): aceita a resposta com
    // elegância, mas a evidência só é gravada quando a conta existe.
    if (!conversa?.empresaId) {
      return NextResponse.json({ data: { gravado: false, motivo: 'sem-conta' } })
    }

    const registro = await prismaSeguro.$transaction(async (tx) => {
      const existente = await tx.sinalValor.findFirst({
        where: { empresaId: conversa.empresaId!, tipo: 'CLAREZA_GERADA', deletedAt: null },
        orderBy: { criadoEm: 'desc' },
      })

      const metadata = {
        reacao: texto,
        categoria,
        categoriaRotulo: ROTULOS[categoria],
        respondidoEm: new Date().toISOString(),
      }

      if (existente) {
        return tx.sinalValor.update({
          where: { id: existente.id },
          data: { metadata: { ...((existente.metadata as Record<string, unknown>) ?? {}), ...metadata } },
        })
      }

      return tx.sinalValor.create({
        data: {
          empresaId: conversa.empresaId!,
          tipo: 'CLAREZA_GERADA',
          origem: 'PRIMEIRA_CONVERSA',
          peso: 1.0,
          metadata,
        },
      })
    })

    return NextResponse.json({ data: { gravado: true, id: registro.id } })
  } catch (err) {
    return handleApiError(err)
  }
}
