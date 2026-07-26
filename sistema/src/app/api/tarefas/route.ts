import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { listarTarefas, criarTarefa, tarefasDeHoje } from '@/services/tarefa.service'
import { tarefaSchema } from '@/lib/validations'
import type { StatusTarefa, Prioridade, TipoTarefa } from '@/types'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// GET /api/tarefas
export async function GET(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const { searchParams } = new URL(request.url)

    // Retorna tarefas de hoje + atrasadas para o dashboard
    if (searchParams.get('hoje') === 'true') {
      const resultado = await tarefasDeHoje(usuario.empresaId, usuario.id)
      return NextResponse.json(resultado)
    }

    const filtros = {
      status:        searchParams.get('status')        as StatusTarefa | undefined,
      prioridade:    searchParams.get('prioridade')    as Prioridade   | undefined,
      tipo:          searchParams.get('tipo')          as TipoTarefa   | undefined,
      responsavelId: searchParams.get('responsavelId') ?? undefined,
      clienteId:     searchParams.get('clienteId')     ?? undefined,
      page:          Number(searchParams.get('page')     ?? 1),
      pageSize:      Number(searchParams.get('pageSize') ?? 50),
    }

    const resultado = await listarTarefas(usuario.empresaId, filtros)
    return NextResponse.json(resultado)
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/tarefas
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const body = await request.json()

    const validacao = tarefaSchema.safeParse(body)
    if (!validacao.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: validacao.error.flatten() },
        { status: 422 }
      )
    }

    const tarefa = await criarTarefa(usuario.empresaId, usuario.id, validacao.data)
    return NextResponse.json({ data: tarefa }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}
