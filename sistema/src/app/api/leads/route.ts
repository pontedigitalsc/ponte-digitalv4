import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { listarLeads, criarLead } from '@/services/lead.service'
import { leadSchema } from '@/lib/validations'
import type { EstagioLead, Temperatura } from '@/types'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// GET /api/leads — Lista leads com filtros opcionais
export async function GET(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const { searchParams } = new URL(request.url)

    const filtros = {
      estagio: searchParams.get('estagio') as EstagioLead | undefined,
      responsavelId: searchParams.get('responsavelId') ?? undefined,
      temperatura: searchParams.get('temperatura') as Temperatura | undefined,
      busca: searchParams.get('busca') ?? undefined,
      page: Number(searchParams.get('page') ?? 1),
      pageSize: Number(searchParams.get('pageSize') ?? 100),
    }

    const resultado = await listarLeads(usuario.empresaId, filtros)
    return NextResponse.json(resultado)
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/leads — Cria novo lead
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const body = await request.json()

    const validacao = leadSchema.safeParse(body)
    if (!validacao.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: validacao.error.flatten() },
        { status: 422 }
      )
    }

    const lead = await criarLead(usuario.empresaId, usuario.id, validacao.data)
    return NextResponse.json({ data: lead }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
