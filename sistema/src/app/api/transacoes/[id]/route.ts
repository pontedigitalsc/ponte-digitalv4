import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi, requireRole } from '@/lib/authorize'
import { atualizarTransacao, excluirTransacao, marcarComoPago } from '@/services/transacao.service'
import { transacaoSchema } from '@/lib/validations'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

type Params = { params: Promise<{ id: string }> }

// PATCH /api/transacoes/[id]
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    const body = await request.json()

    // Atalho: marcar como pago
    if (body._pagar === true) {
      const transacao = await marcarComoPago(id, usuario.empresaId)
      return NextResponse.json({ data: transacao })
    }

    const validacao = transacaoSchema.partial().safeParse(body)
    if (!validacao.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 })
    }

    const transacao = await atualizarTransacao(id, usuario.empresaId, validacao.data)
    return NextResponse.json({ data: transacao })
  } catch (err) {
    return handleApiError(err)
  }
}

// DELETE /api/transacoes/[id]
// Rota financeira — restrição de GESTOR+ é ainda mais importante aqui do
// que nos demais domínios: excluir uma transação paga apaga rastro
// contábil, não apenas um registro operacional.
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const usuario = await requireRole('GESTOR')

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    await excluirTransacao(id, usuario.empresaId)
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    return handleApiError(err)
  }
}
