import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { criarRegistroDescoberta } from '@/services/descoberta-operacional.service'
import { registrarAuditoriaPlataforma } from '@/lib/plataforma'
import { criarRegistroDescobertaSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/diagnosticos/[id]/registros — P92: cria um fato
// CLASSIFICADO pela taxonomia (briefing §2). Nenhum registro fica sem tipo.
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = criarRegistroDescobertaSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const registro = await criarRegistroDescoberta(id, parsed.data, {
      id: usuario.id,
      email: usuario.email,
    })

    await registrarAuditoriaPlataforma({
      usuario,
      acao: 'DESCOBERTA_REGISTRO_CRIADO',
      modulo: 'descoberta-operacional',
      contexto: 'plataforma',
      detalhes: { diagnosticoId: id, tipo: registro.tipo },
    })

    return NextResponse.json({
      data: { id: registro.id, tipo: registro.tipo },
    }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}