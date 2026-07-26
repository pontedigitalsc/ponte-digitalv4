import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { listarHistorico, criarHistorico, statsHistorico } from '@/services/historico.service'
import { historicoSchema } from '@/lib/validations'
import type { TipoHistorico } from '@/types'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// GET /api/historicos
export async function GET(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const { searchParams } = new URL(request.url)

    if (searchParams.get('stats') === 'true') {
      const stats = await statsHistorico(usuario.empresaId)
      return NextResponse.json(stats)
    }

    const filtros = {
      tipo:      searchParams.get('tipo')      as TipoHistorico | undefined,
      clienteId: searchParams.get('clienteId') ?? undefined,
      leadId:    searchParams.get('leadId')    ?? undefined,
      busca:     searchParams.get('busca')     ?? undefined,
      page:      Number(searchParams.get('page')     ?? 1),
      pageSize:  Number(searchParams.get('pageSize') ?? 30),
    }

    const resultado = await listarHistorico(usuario.empresaId, filtros)
    return NextResponse.json(resultado)
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/historicos
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const body = await request.json()

    const validacao = historicoSchema.safeParse(body)
    if (!validacao.success) {
      return NextResponse.json({ error: 'Dados inválidos', detalhes: validacao.error.flatten().fieldErrors }, { status: 422 })
    }

    const { tipo, titulo, descricao, clienteId, leadId } = validacao.data

    const historico = await criarHistorico(usuario.empresaId, usuario.id, {
      tipo, titulo, descricao, clienteId, leadId,
    })
    return NextResponse.json({ data: historico }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
