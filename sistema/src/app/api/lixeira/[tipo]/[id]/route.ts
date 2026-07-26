import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/authorize'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { restaurarCliente } from '@/services/cliente.service'
import { restaurarLead } from '@/services/lead.service'
import { restaurarTarefa } from '@/services/tarefa.service'
import { restaurarImplantacao } from '@/services/implantacao.service'
import { restaurarTransacao } from '@/services/transacao.service'
import { handleApiError } from '@/lib/api-error'

type Restaurador = (id: string, empresaId: string) => Promise<unknown>

/**
 * Restaurar exige a mesma permissão de GESTOR+ usada para excluir — simetria
 * deliberada: se um MEMBRO não pode apagar um registro, também não deveria
 * poder desfazer uma exclusão feita por um GESTOR.
 */

const RESTAURADORES = {
  clientes:      restaurarCliente,
  leads:         restaurarLead,
  tarefas:       restaurarTarefa,
  implantacoes:  restaurarImplantacao,
  transacoes:    restaurarTransacao,
} as const

type TipoLixeira = keyof typeof RESTAURADORES

function ehTipoValido(tipo: string): tipo is TipoLixeira {
  return tipo in RESTAURADORES
}

// PATCH /api/lixeira/[tipo]/[id]
export async function PATCH(
  _: NextRequest,
  { params }: { params: Promise<{ tipo: string; id: string }> }
) {
  try {
    const usuario = await requireRole('GESTOR')

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { tipo, id } = await params

    if (!ehTipoValido(tipo)) {
      return NextResponse.json(
        { error: `Tipo inválido. Use um de: ${Object.keys(RESTAURADORES).join(', ')}` },
        { status: 422 }
      )
    }

    const item = await RESTAURADORES[tipo](id, usuario.empresaId)
    return NextResponse.json({ data: item })
  } catch (err) {
    return handleApiError(err)
  }
}
