import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import {
  criarDiagnosticoDescoberta,
  obterDiagnosticosComContagem,
} from '@/services/descoberta-operacional.service'
import { criarDiagnosticoDescobertaSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// GET /api/descoberta/diagnosticos — P92: lista os diagnósticos de descoberta
// (plataforma, sem tenant) com a contagem por estado para as abas do painel.
export async function GET() {
  try {
    await requirePlataforma('FOUNDER_VIEW_INTERNAL')
    const resultado = await obterDiagnosticosComContagem()
    return NextResponse.json({ data: resultado })
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/descoberta/diagnosticos — P92: abre um novo trabalho de descoberta.
// A categoria nasce aqui (primeira empresa = pioneira). Só Founder Principal.
export async function POST(request: NextRequest) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const body = await request.json().catch(() => null)
    const parsed = criarDiagnosticoDescobertaSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const diagnostico = await criarDiagnosticoDescoberta(parsed.data, {
      id: usuario.id,
      email: usuario.email,
    })

    return NextResponse.json({ data: { id: diagnostico.id } }, { status: 201 })
  } catch (err) {
    return handleApiError(err)
  }
}