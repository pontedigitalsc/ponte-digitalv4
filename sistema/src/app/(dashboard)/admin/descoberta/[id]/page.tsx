import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { temPermissaoPlataformaUsuario } from '@/lib/plataforma'
import { obterDiagnosticoDescobertaDetalhe } from '@/services/descoberta-operacional.service'
import { DescobertaDetalhe } from '@/components/descoberta/descoberta-detalhe'
import { calcularProgressoDescoberta } from '@/engine/descoberta-operacional'
import { rotuloTipoRegistroDescoberta } from '@/engine/descoberta-operacional'

export const metadata: Metadata = { title: 'Descoberta operacional' }
export const dynamic = 'force-dynamic'

// P92 — T3..T15: detalhe guiado de um diagnóstico de descoberta. O condutor
// (Kelven) recebe a narrativa por estado: o que já existe e qual a próxima
// ação, uma descoberta de cada vez. Sem IA — só dados reais classificados.
export default async function DescobertaDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const usuario = await requireUser()
  if (!temPermissaoPlataformaUsuario(usuario, 'FOUNDER_VIEW_INTERNAL')) redirect('/dashboard')

  const { id } = await params
  const detalhe = await obterDiagnosticoDescobertaDetalhe(id).catch(() => null)
  if (!detalhe) notFound()

  const progresso = calcularProgressoDescoberta({
    respostaAncora: detalhe.diagnostico.respostaAncora,
    totalParticipantes: detalhe.participantes.length,
    totalRegistros: detalhe.registros.length,
    totalProcessos: detalhe.processos.length,
    totalProcessosDesejados: detalhe.processosDesejados.length,
    totalDivergencias: detalhe.divergencias.length,
    totalOportunidades: detalhe.oportunidades.length,
  })

  return (
    <DescobertaDetalhe
      detalhe={detalhe}
      progresso={progresso}
      rotuloTipo={rotuloTipoRegistroDescoberta}
    />
  )
}