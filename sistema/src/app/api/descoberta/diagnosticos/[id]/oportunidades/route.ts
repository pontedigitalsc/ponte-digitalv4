import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { criarOportunidadeDescoberta } from '@/services/descoberta-operacional.service'
import { criarOportunidadeSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/diagnosticos/[id]/oportunidades — P92: registra uma
// possibilidade de melhoria (categoria de perda de energia do P82 §13).
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = criarOportunidadeSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const oportunidade = await criarOportunidadeDescoberta(id, parsed.data, {
      id: usuario.id,
      email: usuario.email,
    })

    return NextResponse.json({
      data: { id: oportunidade.id, categoria: oportunidade.categoria, status: oportunidade.status },
    }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}