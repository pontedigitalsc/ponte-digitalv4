import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { registrarRespostaAncoraDiagnostico } from '@/services/descoberta-operacional.service'
import { registrarRespostaAncoraSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/descoberta/diagnosticos/[id]/ancora — P92: registra a resposta da
// pergunta-âncora (P82). Obrigatória no MVP — sem ela o diagnóstico não avança.
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = registrarRespostaAncoraSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const atualizado = await registrarRespostaAncoraDiagnostico(
      id,
      parsed.data.resposta,
      parsed.data.resultadoDeclarado ?? null,
      { id: usuario.id, email: usuario.email },
    )

    return NextResponse.json({
      data: { id: atualizado.id, respostaAncora: atualizado.respostaAncora },
    })
  } catch (err) {
    return handleApiError(err)
  }
}