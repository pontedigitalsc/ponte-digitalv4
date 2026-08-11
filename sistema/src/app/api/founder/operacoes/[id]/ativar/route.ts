import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { ativarFounder } from '@/services/founder-operacoes.service'
import { ativarFounderSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// POST /api/founder/operacoes/[id]/ativar — P91: ativa a empresa como Founder.
// Requer solicitação APROVADA, uma empresa real e (se ainda não tiver) um
// número de Fundador — reutiliza Empresa.numeroFundador (P57B). Só Founder
// Principal (FOUNDER_MANAGE_PLATFORM), com auditoria e histórico.
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params

    const body = await request.json().catch(() => null)
    const parsed = ativarFounderSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const resultado = await ativarFounder(id, parsed.data, { id: usuario.id, email: usuario.email })

    return NextResponse.json({
      data: {
        solicitacaoId: id,
        empresaId: parsed.data.empresaId,
        numeroFundador: resultado.numeroFundador,
        status: resultado.solicitacao?.status,
      },
    })
  } catch (err) {
    return handleApiError(err)
  }
}