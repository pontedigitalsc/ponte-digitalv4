import { NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { obterRelatorioDescoberta } from '@/services/descoberta-operacional.service'
import { handleApiError } from '@/lib/api-error'

// GET /api/descoberta/diagnosticos/[id]/relatorio — P92: monta o relatório
// final (briefing §21, 12 seções) em texto puro, pronto para copiar.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requirePlataforma('FOUNDER_VIEW_INTERNAL')
    const { id } = await params
    const relatorio = await obterRelatorioDescoberta(id)
    return NextResponse.json({ data: relatorio })
  } catch (err) {
    return handleApiError(err)
  }
}