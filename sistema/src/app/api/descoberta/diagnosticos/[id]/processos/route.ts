import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { criarProcessoDescoberta } from '@/services/descoberta-operacional.service'
import { criarProcessoDescobertaSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/diagnosticos/[id]/processos — P92: mapeia o COMO É —
// o processo real com suas etapas, entradas, saídas, retrabalhos, dependências
// e riscos. Tudo que será confrontado com o COMO PODERIA SER.
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = criarProcessoDescobertaSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const processo = await criarProcessoDescoberta(id, parsed.data, {
      id: usuario.id,
      email: usuario.email,
    })

    return NextResponse.json({
      data: { id: processo.id, nome: processo.nome },
    }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}