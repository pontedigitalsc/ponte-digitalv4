import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { listarClientes, criarCliente, statsClientes } from '@/services/cliente.service'
import { clienteSchema } from '@/lib/validations'
import type { StatusCliente } from '@/types'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// GET /api/clientes
export async function GET(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const { searchParams } = new URL(request.url)

    if (searchParams.get('stats') === 'true') {
      const stats = await statsClientes(usuario.empresaId)
      return NextResponse.json(stats)
    }

    const filtros = {
      status:    searchParams.get('status') as StatusCliente | undefined,
      segmento:  searchParams.get('segmento') ?? undefined,
      busca:     searchParams.get('busca') ?? undefined,
      page:      Number(searchParams.get('page') ?? 1),
      pageSize:  Number(searchParams.get('pageSize') ?? 20),
    }

    const resultado = await listarClientes(usuario.empresaId, filtros)
    return NextResponse.json(resultado)
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/clientes
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const body = await request.json()

    const validacao = clienteSchema.safeParse(body)
    if (!validacao.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: validacao.error.flatten() },
        { status: 422 }
      )
    }

    const cliente = await criarCliente(usuario.empresaId, usuario.id, validacao.data)
    return NextResponse.json({ data: cliente }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
