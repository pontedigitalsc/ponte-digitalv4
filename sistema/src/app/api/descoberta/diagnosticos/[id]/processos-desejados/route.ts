import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { criarProcessoDesejadoDescoberta } from '@/services/descoberta-operacional.service'
import { criarProcessoDesejadoSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/diagnosticos/[id]/processos-desejados — P92: propõe o
// COMO PODERIA SER a partir do que foi mapeado (tarefa 9). Só vira VALIDADO
// quando o campo aprovar.
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = criarProcessoDesejadoSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const desejado = await criarProcessoDesejadoDescoberta(id, parsed.data, {
      id: usuario.id,
      email: usuario.email,
    })

    return NextResponse.json({
      data: { id: desejado.id, nome: desejado.nome, status: desejado.status },
    }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}