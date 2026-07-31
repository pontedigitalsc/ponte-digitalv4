import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'
import { responderPerguntaViva } from '@/engine/relacao-engine'

// POST /api/relacao/perguntas/[id]/responder — responde a Pergunta Viva
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requireUserApi()
    const { id } = await params

    const body = await request.json().catch(() => ({}))
    const resposta = typeof body.resposta === 'string' ? body.resposta.trim() : ''

    if (!resposta) {
      return NextResponse.json({ error: 'Escreva algo antes de responder.' }, { status: 422 })
    }

    await responderPerguntaViva(usuario.empresaId, id, resposta)

    return NextResponse.json({ data: { ok: true } })
  } catch (err) {
    return handleApiError(err)
  }
}
