import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { atualizarSolicitacao } from '@/services/founder-operacoes.service'
import { atualizarSolicitacaoFounderSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'

// PATCH /api/founder/operacoes/[id] — P91: atualiza status, observação interna
// e/ou tipo de onboarding de uma solicitação de Founder. Só Founder Principal
// (permissão FOUNDER_MANAGE_PLATFORM). Cada mudança vira evento de histórico.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params

    const body = await request.json().catch(() => null)
    const parsed = atualizarSolicitacaoFounderSchema.safeParse(body ?? {})
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 },
      )
    }

    const atualizada = await atualizarSolicitacao(id, parsed.data, { id: usuario.id, email: usuario.email })

    return NextResponse.json({
      data: {
        id: atualizada.id,
        status: atualizada.status,
        observacaoAdmin: atualizada.observacaoAdmin,
        onboardingTipo: atualizada.onboardingTipo,
        contatoEm: atualizada.contatoEm,
      },
    })
  } catch (err) {
    return handleApiError(err)
  }
}