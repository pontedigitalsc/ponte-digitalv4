import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { temPermissaoPlataformaUsuario } from '@/lib/plataforma'
import { obterSolicitacoesComContagem } from '@/services/founder-operacoes.service'
import { CommandCenter } from '@/components/founder/command-center'
import {
  STATUS_SOLICITACAO_FOUNDER_ROTULO,
  STATUS_SOLICITACAO_FOUNDER_ORDEM,
  type StatusSolicitacaoFounderOp,
} from '@/engine/founder-operacoes'

export const metadata: Metadata = { title: 'Solicitações Founder' }
export const dynamic = 'force-dynamic'

export default async function FounderOperacoesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const usuario = await requireUser()
  if (!temPermissaoPlataformaUsuario(usuario, 'FOUNDER_VIEW_INTERNAL')) redirect('/dashboard')

  const { status } = await searchParams
  const { solicitacoes, contagem } = await obterSolicitacoesComContagem()

  const tabs = STATUS_SOLICITACAO_FOUNDER_ORDEM.map((chave) => ({
    chave,
    rotulo: STATUS_SOLICITACAO_FOUNDER_ROTULO[chave],
    total: contagem[chave] ?? 0,
  }))

  const statusAtivo = STATUS_SOLICITACAO_FOUNDER_ORDEM.includes(status as StatusSolicitacaoFounderOp)
    ? (status as StatusSolicitacaoFounderOp)
    : 'PENDING'

  return (
    <CommandCenter
      tabs={tabs}
      statusAtivo={statusAtivo}
      solicitacoes={solicitacoes}
      totais={contagem}
    />
  )
}