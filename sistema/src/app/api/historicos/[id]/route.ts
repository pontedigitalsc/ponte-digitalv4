import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { excluirHistorico } from '@/services/historico.service'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// DELETE /api/historicos/[id]
// Diferente de Cliente/Lead/Tarefa/Transacao/Implantacao, aqui NÃO exigimos
// GESTOR+. Um registro de histórico é uma nota/interação pessoal (ligação,
// e-mail, reunião) — não um ativo de negócio. O service já impede a exclusão
// de registros tipo SISTEMA (auditoria automática), que é a proteção que
// realmente importa neste domínio. Exigir permissão elevada para apagar a
// própria nota seria fricção sem ganho real de segurança.
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    await excluirHistorico(id, usuario.empresaId)
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    return handleApiError(err)
  }
}
