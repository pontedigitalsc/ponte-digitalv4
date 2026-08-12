import { NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { obterDiagnosticoDescobertaDetalhe } from '@/services/descoberta-operacional.service'
import { handleApiError } from '@/lib/api-error'

// GET /api/descoberta/diagnosticos/[id] — P92: agregado completo de um
// diagnóstico (categoria, participantes, respostas, registros, processos,
// desenhos desejados, divergências, oportunidades, histórico e pioneira).
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requirePlataforma('FOUNDER_VIEW_INTERNAL')
    const { id } = await params
    const detalhe = await obterDiagnosticoDescobertaDetalhe(id)
    return NextResponse.json({ data: detalhe })
  } catch (err) {
    return handleApiError(err)
  }
}