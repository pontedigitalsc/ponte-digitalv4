import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { adicionarAprendizado, desativarAprendizado } from '@/engine'
import { aprendizadoSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/aprendizados
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const body = await request.json()
    const validacao = aprendizadoSchema.safeParse(body)

    if (!validacao.success) {
      return NextResponse.json({ erro: 'Dados inválidos', detalhes: validacao.error.flatten() }, { status: 422 })
    }

    const { descricao, categoria, origem, contexto } = validacao.data

    const resultado = await adicionarAprendizado(
      usuario.empresaId,
      descricao.trim(),
      categoria,
      origem,
      contexto ?? null,
    )

    return NextResponse.json(resultado)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/aprendizados?id=xxx
export async function DELETE(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ erro: 'ID obrigatório' }, { status: 400 })
    }

    await desativarAprendizado(id, usuario.empresaId)
    return NextResponse.json({ sucesso: true })
  } catch (error) {
    return handleApiError(error)
  }
}
