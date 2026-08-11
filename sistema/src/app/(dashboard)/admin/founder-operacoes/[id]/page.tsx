import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { temPermissaoPlataformaUsuario } from '@/lib/plataforma'
import { obterSolicitacaoDetalhe, obterEmpresasParaVinculo } from '@/services/founder-operacoes.service'
import { FounderOperacoesDetalhe } from '@/components/founder/command-center-detalhe'
import { rotuloEquipeFounder } from '@/lib/validations'

export const metadata: Metadata = { title: 'Detalhe da solicitação' }
export const dynamic = 'force-dynamic'

export default async function FounderOperacoesDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const usuario = await requireUser()
  if (!temPermissaoPlataformaUsuario(usuario, 'FOUNDER_VIEW_INTERNAL')) redirect('/dashboard')

  const { id } = await params
  const detalhe = await obterSolicitacaoDetalhe(id).catch(() => null)
  if (!detalhe) {
    notFound()
  }
  const { solicitacao, historico, empresa } = detalhe

  const empresas = await obterEmpresasParaVinculo()
  const equipeRotulo = rotuloEquipeFounder(solicitacao.equipe)

  return (
    <FounderOperacoesDetalhe
      solicitacao={solicitacao}
      historico={historico}
      empresa={empresa}
      empresas={empresas}
      equipeRotulo={equipeRotulo}
    />
  )
}