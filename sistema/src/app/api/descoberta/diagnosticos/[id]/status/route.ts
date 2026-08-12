import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { atualizarStatusDiagnosticoDescoberta } from '@/services/descoberta-operacional.service'
import { registrarAuditoriaPlataforma } from '@/lib/plataforma'
import { atualizarStatusDiagnosticoDescobertaSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/diagnosticos/[id]/status — P92: muda o estado do
// diagnóstico respeitando as transições do engine (uma descoberta de cada vez).
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = atualizarStatusDiagnosticoDescobertaSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const atualizado = await atualizarStatusDiagnosticoDescoberta(id, parsed.data.status, {
      id: usuario.id,
      email: usuario.email,
    })

    await registrarAuditoriaPlataforma({
      usuario,
      acao: 'DESCOBERTA_STATUS_ALTERADO',
      modulo: 'descoberta-operacional',
      contexto: 'plataforma',
      detalhes: { diagnosticoId: id, status: atualizado.status },
    })

    return NextResponse.json({
      data: { id: atualizado.id, status: atualizado.status, iniciadoEm: atualizado.iniciadoEm, concluidoEm: atualizado.concluidoEm },
    })
  } catch (err) {
    return handleApiError(err)
  }
}