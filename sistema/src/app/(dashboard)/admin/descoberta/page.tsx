import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { temPermissaoPlataformaUsuario } from '@/lib/plataforma'
import { obterDiagnosticosComContagem } from '@/services/descoberta-operacional.service'
import { DescobertaLista } from '@/components/descoberta/descoberta-lista'
import {
  STATUS_DIAGNOSTICO_DESCOBERTA_ORDEM,
  STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO,
  type StatusDiagnosticoDescobertaOp,
} from '@/engine/descoberta-operacional'

export const metadata: Metadata = { title: 'Ponte Descoberta' }
export const dynamic = 'force-dynamic'

// P92 — T1/T2: visão do trabalho de descoberta no campo real. Nível plataforma
// (sem tenant). O condutor (Kelven) vê a fila de empresas em estudo e escolhe
// por onde continuar — um diagnóstico de cada vez.
export default async function DescobertaPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const usuario = await requireUser()
  if (!temPermissaoPlataformaUsuario(usuario, 'FOUNDER_VIEW_INTERNAL')) redirect('/dashboard')

  const { status } = await searchParams
  const { diagnosticos, contagem } = await obterDiagnosticosComContagem()

  const tabs = STATUS_DIAGNOSTICO_DESCOBERTA_ORDEM.map((chave) => ({
    chave,
    rotulo: STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[chave],
    total: contagem[chave] ?? 0,
  }))

  const statusAtivo = STATUS_DIAGNOSTICO_DESCOBERTA_ORDEM.includes(status as StatusDiagnosticoDescobertaOp)
    ? (status as StatusDiagnosticoDescobertaOp)
    : 'EM_DESCOBERTA'

  return <DescobertaLista tabs={tabs} statusAtivo={statusAtivo} diagnosticos={diagnosticos} />
}