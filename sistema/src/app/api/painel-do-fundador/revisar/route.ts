import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/authorize'
import { revisarPergunta } from '@/engine/pergunta-aberta-service'
import { handleApiError } from '@/lib/api-error'
import { BusinessRuleError } from '@/lib/app-errors'

// POST /api/painel-do-fundador/revisar — ETAPA 6: revisão semanal.
// Continuar = nova data de revisão. Nova pergunta = desativa a atual.
export async function POST(request: NextRequest) {
  try {
    await requireRole('ADMIN')
    const body = await request.json().catch(() => null)

    const perguntaId = typeof body?.perguntaId === 'string' ? body.perguntaId : null
    if (!perguntaId) throw new BusinessRuleError('Pergunta não informada')

    const atualizada = await revisarPergunta(perguntaId, {
      continuar: body?.continuar !== false,
      diasAteRevisao: typeof body?.diasAteRevisao === 'number' ? body.diasAteRevisao : 7,
    })

    return NextResponse.json({ data: { pergunta: atualizada } })
  } catch (err) {
    return handleApiError(err)
  }
}
