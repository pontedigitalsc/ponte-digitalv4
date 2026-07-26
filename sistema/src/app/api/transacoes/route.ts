import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { listarTransacoes, criarTransacao, resumoFinanceiro } from '@/services/transacao.service'
import { transacaoSchema } from '@/lib/validations'
import type { TipoTransacao, StatusTransacao } from '@/types'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// GET /api/transacoes
export async function GET(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const { searchParams } = new URL(request.url)

    // Retorna resumo/KPIs
    if (searchParams.get('resumo') === 'true') {
      const mes = searchParams.get('mes') ? Number(searchParams.get('mes')) : undefined
      const ano = searchParams.get('ano') ? Number(searchParams.get('ano')) : undefined
      const resultado = await resumoFinanceiro(usuario.empresaId, mes, ano)
      return NextResponse.json(resultado)
    }

    const filtros = {
      tipo:      searchParams.get('tipo')      as TipoTransacao   | undefined,
      status:    searchParams.get('status')    as StatusTransacao | undefined,
      clienteId: searchParams.get('clienteId') ?? undefined,
      categoria: searchParams.get('categoria') ?? undefined,
      busca:     searchParams.get('busca')     ?? undefined,
      mes:       searchParams.get('mes')  ? Number(searchParams.get('mes'))  : undefined,
      ano:       searchParams.get('ano')  ? Number(searchParams.get('ano'))  : undefined,
      page:      Number(searchParams.get('page')     ?? 1),
      pageSize:  Number(searchParams.get('pageSize') ?? 30),
    }

    const resultado = await listarTransacoes(usuario.empresaId, filtros)
    return NextResponse.json(resultado)
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/transacoes
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const body = await request.json()

    const validacao = transacaoSchema.safeParse(body)
    if (!validacao.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: validacao.error.flatten() },
        { status: 422 }
      )
    }

    const transacao = await criarTransacao(usuario.empresaId, validacao.data)
    return NextResponse.json({ data: transacao }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
