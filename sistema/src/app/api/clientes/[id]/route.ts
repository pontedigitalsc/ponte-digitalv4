import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi, requireRole } from '@/lib/authorize'
import { buscarClientePorId, atualizarCliente, excluirCliente } from '@/services/cliente.service'
import { clienteSchema } from '@/lib/validations'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

type Params = { params: Promise<{ id: string }> }

// GET /api/clientes/[id]
export async function GET(_: NextRequest, { params }: Params) {
  try {
    const usuario = await requireUserApi()
    const { id } = await params
    const cliente = await buscarClientePorId(id, usuario.empresaId)
    if (!cliente) return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 })
    return NextResponse.json({ data: cliente })
  } catch (err) {
    return handleApiError(err)
  }
}

// PATCH /api/clientes/[id]
// Qualquer usuário autenticado pode editar — a restrição fica em nível de
// exclusão, que é a ação com maior potencial de dano irreversível.
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    const body = await request.json()

    const validacao = clienteSchema.partial().safeParse(body)
    if (!validacao.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: validacao.error.flatten() },
        { status: 422 }
      )
    }

    const cliente = await atualizarCliente(id, usuario.empresaId, validacao.data)
    return NextResponse.json({ data: cliente })
  } catch (err) {
    return handleApiError(err)
  }
}

// DELETE /api/clientes/[id]
// Excluir um cliente é uma ação com consequência financeira e de dados real
// — restrita a GESTOR ou ADMIN. Um usuário comum (MEMBRO) pode gerenciar
// o dia a dia do cliente mas não apagar o cadastro inteiro.
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const usuario = await requireRole('GESTOR')

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    await excluirCliente(id, usuario.empresaId)
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    return handleApiError(err)
  }
}
