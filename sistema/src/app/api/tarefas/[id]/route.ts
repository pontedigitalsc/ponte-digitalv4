import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi, requireRole } from '@/lib/authorize'
import { atualizarTarefa, excluirTarefa, toggleConcluida } from '@/services/tarefa.service'
import { tarefaSchema } from '@/lib/validations'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

type Params = { params: Promise<{ id: string }> }

// PATCH /api/tarefas/[id]
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    const body = await request.json()

    // Ação especial: toggle concluída
    if (body._toggle === true) {
      const tarefa = await toggleConcluida(id, usuario.empresaId)
      return NextResponse.json({ data: tarefa })
    }

    const validacao = tarefaSchema.partial().safeParse(body)
    if (!validacao.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', detalhes: validacao.error.flatten() },
        { status: 422 }
      )
    }

    const tarefa = await atualizarTarefa(id, usuario.empresaId, validacao.data)
    return NextResponse.json({ data: tarefa })
  } catch (err) {
    return handleApiError(err)
  }
}

// DELETE /api/tarefas/[id]
// Restrito a GESTOR+, mesmo padrão aplicado aos demais domínios: exclusão
// é irreversível e não deve depender só de estar autenticado.
export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const usuario = await requireRole('GESTOR')

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    await excluirTarefa(id, usuario.empresaId)
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    return handleApiError(err)
  }
}
