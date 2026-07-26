import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi, requireRole } from '@/lib/authorize'
import { atualizarLead, excluirLead, buscarLeadPorId } from '@/services/lead.service'
import { leadSchema } from '@/lib/validations'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// GET /api/leads/[id] — Busca lead por ID
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requireUserApi()
    const { id } = await params
    const lead = await buscarLeadPorId(id, usuario.empresaId)
    if (!lead) return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 })
    return NextResponse.json({ data: lead })
  } catch (err) {
    return handleApiError(err)
  }
}

// PATCH /api/leads/[id] — Atualiza lead (parcial)
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    const body = await request.json()

    const validacao = leadSchema.partial().safeParse(body)
    if (!validacao.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: validacao.error.flatten() },
        { status: 422 }
      )
    }

    const lead = await atualizarLead(id, usuario.empresaId, usuario.id, validacao.data)
    return NextResponse.json({ data: lead })
  } catch (err) {
    return handleApiError(err)
  }
}

// DELETE /api/leads/[id] — Exclui lead
// Restrito a GESTOR+: um lead pode representar semanas de trabalho comercial,
// exclusão indevida por um MEMBRO não deve ser possível sem essa permissão.
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requireRole('GESTOR')

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    await excluirLead(id, usuario.empresaId)
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    return handleApiError(err)
  }
}
