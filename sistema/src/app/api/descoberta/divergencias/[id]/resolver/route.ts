import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { resolverDivergenciaDescoberta } from '@/services/descoberta-operacional.service'
import { resolverDivergenciaSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/divergencias/[id]/resolver — P92: transforma a
// divergência em pergunta de validação para o campo (briefing §6).
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = resolverDivergenciaSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const resolvida = await resolverDivergenciaDescoberta(id, parsed.data.questaoValidacao, {
      id: usuario.id,
      email: usuario.email,
    })

    return NextResponse.json({
      data: { id: resolvida.id, status: resolvida.status, questaoValidacao: resolvida.questaoValidacao },
    })
  } catch (err) {
    return handleApiError(err)
  }
}