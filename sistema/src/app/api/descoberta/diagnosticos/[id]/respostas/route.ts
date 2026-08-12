import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { registrarRespostaDescoberta } from '@/services/descoberta-operacional.service'
import { registrarRespostaDescobertaSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/diagnosticos/[id]/respostas — P92: registra a fala de um
// participante (o DITO do P82, a ser verificado). A taxonomia não fica aqui:
// a classificação vive em /registros.
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = registrarRespostaDescobertaSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const resposta = await registrarRespostaDescoberta(id, parsed.data, {
      id: usuario.id,
      email: usuario.email,
    })

    return NextResponse.json({
      data: { id: resposta.id, participanteId: resposta.participanteId },
    }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}