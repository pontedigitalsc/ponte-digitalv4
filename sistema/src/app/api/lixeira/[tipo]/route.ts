import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { listarClientesExcluidos } from '@/services/cliente.service'
import { listarLeadsExcluidos } from '@/services/lead.service'
import { listarTarefasExcluidas } from '@/services/tarefa.service'
import { listarImplantacoesExcluidas } from '@/services/implantacao.service'
import { listarTransacoesExcluidas } from '@/services/transacao.service'
import { handleApiError } from '@/lib/api-error'

/**
 * ─── ROTA UNIFICADA DE LIXEIRA ────────────────────────────────────────────────
 *
 * Uma única rota parametrizada por tipo, em vez de 5 rotas quase-idênticas
 * (/api/clientes/lixeira, /api/leads/lixeira, etc). O mapa abaixo é o único
 * lugar que precisa mudar se um novo modelo ganhar soft delete no futuro.
 */

const LISTADORES = {
  clientes:      listarClientesExcluidos,
  leads:         listarLeadsExcluidos,
  tarefas:       listarTarefasExcluidas,
  implantacoes:  listarImplantacoesExcluidas,
  transacoes:    listarTransacoesExcluidas,
} as const

type TipoLixeira = keyof typeof LISTADORES

function ehTipoValido(tipo: string): tipo is TipoLixeira {
  return tipo in LISTADORES
}

// GET /api/lixeira/[tipo]
export async function GET(_: NextRequest, { params }: { params: Promise<{ tipo: string }> }) {
  try {
    const usuario = await requireUserApi()
    const { tipo } = await params

    if (!ehTipoValido(tipo)) {
      return NextResponse.json(
        { error: `Tipo inválido. Use um de: ${Object.keys(LISTADORES).join(', ')}` },
        { status: 422 }
      )
    }

    const itens = await LISTADORES[tipo](usuario.empresaId)
    return NextResponse.json({ itens })
  } catch (err) {
    return handleApiError(err)
  }
}
