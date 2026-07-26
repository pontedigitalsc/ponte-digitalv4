import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi, requireRole } from '@/lib/authorize'
import { atualizarImplantacao, excluirImplantacao } from '@/services/implantacao.service'
import { implantacaoSchema } from '@/lib/validations'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

type Params = { params: Promise<{ id: string }> }

// PATCH /api/implantacoes/[id]
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    const body = await request.json()

    const validacao = implantacaoSchema.partial().safeParse(body)
    if (!validacao.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 })
    }

    const impl = await atualizarImplantacao(id, usuario.empresaId, validacao.data)
    return NextResponse.json({ data: impl })
  } catch (err) {
    return handleApiError(err)
  }
}

// DELETE /api/implantacoes/[id]
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const usuario = await requireRole('GESTOR')

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    await excluirImplantacao(id, usuario.empresaId)
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    return handleApiError(err)
  }
}
