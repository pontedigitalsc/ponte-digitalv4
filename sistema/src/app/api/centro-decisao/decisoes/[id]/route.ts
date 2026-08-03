import { NextRequest, NextResponse } from 'next/server'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { requireUserApi } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'
import { processarFeedback } from '@/engine/cognitive-orchestrator'
import { registrarEventoAtivacao } from '@/engine/founder-activation-engine'
import { z } from 'zod'
import type { Prisma } from '@prisma/client'

// P61 — acompanhar uma decisão registrada: o que decidiu, o que aconteceu,
// o que aprendeu. Fecha o ciclo "antes de decidir → depois de decidir".

const STATUS = ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA', 'ABANDONADA'] as const
const TIPOS_FEEDBACK = ['AJUDOU', 'AJUDOU_PARCIALMENTE', 'NAO_AJUDOU', 'NAO_EXECUTADA'] as const

const atualizarSchema = z.object({
  status: z.enum(STATUS),
  aconteceu: z.string().trim().max(1000).optional().or(z.literal('')),
  aprendemos: z.string().trim().max(1000).optional().or(z.literal('')),
  ajudou: z.enum(TIPOS_FEEDBACK).optional(),
})

// PATCH /api/centro-decisao/decisoes/[id]
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requireUserApi()
    const { id } = await params

    const existente = await prisma.acaoCognitiva.findFirst({
      where: { id, empresaId: usuario.empresaId, deletedAt: null },
    })
    if (!existente) {
      return NextResponse.json({ error: 'Decisão não encontrada' }, { status: 404 })
    }

    const body = await request.json()
    const parsed = atualizarSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 })
    }

    const { status, aconteceu, aprendemos, ajudou } = parsed.data

    const resultado: Prisma.InputJsonValue = {
      aconteceu: aconteceu || null,
      aprendemos: aprendemos || null,
    }

    const decisao = await prisma.acaoCognitiva.update({
      where: { id },
      data: {
        status,
        resultado: (existente.resultado ?? {}) as Prisma.InputJsonValue,
      },
    })

    // junta o resultado novo com o que já existia
    await prisma.acaoCognitiva.update({
      where: { id },
      data: {
        resultado: {
          ...((decisao.resultado ?? {}) as Record<string, unknown>),
          ...resultado,
        } as Prisma.InputJsonValue,
      },
    })

    // P61 — o feedback entra no ciclo de aprendizado completo (evidência →
    // memória cognitiva → fortalecimento/enfraquecimento de hipóteses), em vez
    // de criar uma linha órfã de FeedbackAcao que só alimentava contadores.
    if (ajudou) {
      await processarFeedback(usuario.empresaId, id, ajudou, aprendemos || undefined)
    }

    if (status === 'CONCLUIDA') {
      await registrarEventoAtivacao(usuario.empresaId, 'PRIMEIRA_ACAO_CONCLUIDA', { decisaoId: id })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleApiError(error)
  }
}
