import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { listarImplantacoes, criarImplantacao } from '@/services/implantacao.service'
import { implantacaoSchema } from '@/lib/validations'
import { ETAPAS_PADRAO_IMPLANTACAO } from '@/constants'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// GET /api/implantacoes
export async function GET(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const status = new URL(request.url).searchParams.get('status') ?? undefined
    const resultado = await listarImplantacoes(usuario.empresaId, status)
    return NextResponse.json({ implantacoes: resultado })
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/implantacoes
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const body = await request.json()

    const validacao = implantacaoSchema.safeParse(body)
    if (!validacao.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: validacao.error.flatten() },
        { status: 422 }
      )
    }

    const etapas = body.etapas ?? ETAPAS_PADRAO_IMPLANTACAO
    const impl = await criarImplantacao(usuario.empresaId, usuario.id, validacao.data, etapas)
    return NextResponse.json({ data: impl }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
