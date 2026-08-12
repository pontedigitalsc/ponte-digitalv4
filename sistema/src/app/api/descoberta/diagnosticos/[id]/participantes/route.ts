import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { adicionarParticipanteDescoberta } from '@/services/descoberta-operacional.service'
import { adicionarParticipanteSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/diagnosticos/[id]/participantes — P92: adiciona quem
// será ouvido na descoberta (proprietário, gestão, operação).
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = adicionarParticipanteSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const participante = await adicionarParticipanteDescoberta(id, parsed.data, {
      id: usuario.id,
      email: usuario.email,
    })

    return NextResponse.json({
      data: {
        id: participante.id,
        nome: participante.nome,
        papel: participante.papel,
        cargo: participante.cargo,
      },
    }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}