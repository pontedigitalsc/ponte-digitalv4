import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { criarDivergenciaDescoberta } from '@/services/descoberta-operacional.service'
import { criarDivergenciaSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/diagnosticos/[id]/divergencias — P92: registra quando
// descrito ≠ observado (o que o participante disse contra o que foi visto).
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = criarDivergenciaSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const divergencia = await criarDivergenciaDescoberta(id, parsed.data, {
      id: usuario.id,
      email: usuario.email,
    })

    return NextResponse.json({
      data: { id: divergencia.id, titulo: divergencia.titulo, status: divergencia.status },
    }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}