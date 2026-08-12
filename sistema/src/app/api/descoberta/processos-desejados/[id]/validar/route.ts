import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { validarProcessoDesejadoDescoberta } from '@/services/descoberta-operacional.service'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/processos-desejados/[id]/validar — P92: o campo aprova
// o COMO PODERIA SER (tarefa 10). Só depois disso o desenho vira VALIDADO.
export async function POST(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const validado = await validarProcessoDesejadoDescoberta(id, {
      id: usuario.id,
      email: usuario.email,
    })
    return NextResponse.json({
      data: { id: validado.id, status: validado.status, validadoEm: validado.validadoEm },
    })
  } catch (err) {
    return handleApiError(err)
  }
}