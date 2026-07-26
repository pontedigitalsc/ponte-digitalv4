import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { converterLeadEmCliente } from '@/services/cliente.service'
import { clienteSchema } from '@/lib/validations'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// POST /api/leads/[id]/converter
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    const body = await request.json().catch(() => ({}))

    const validacao = clienteSchema.partial().safeParse(body)
    if (!validacao.success) {
      return NextResponse.json({ error: 'Dados inválidos', detalhes: validacao.error.flatten().fieldErrors }, { status: 422 })
    }

    const cliente = await converterLeadEmCliente(id, usuario.empresaId, usuario.id, validacao.data)
    return NextResponse.json({ data: cliente }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
