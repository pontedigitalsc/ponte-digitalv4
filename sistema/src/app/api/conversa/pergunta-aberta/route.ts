import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { registrarRespostaPerguntaAberta } from '@/engine/pergunta-aberta-service'
import { handleApiError } from '@/lib/api-error'
import { BusinessRuleError } from '@/lib/app-errors'

// POST /api/conversa/pergunta-aberta — ETAPA 4 do P52.
// Registro automático da resposta à Pergunta Aberta. Nada além de:
// pergunta, empresa, segmento, resumo da resposta e data.
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const body = await request.json().catch(() => null)

    const perguntaId = typeof body?.perguntaId === 'string' ? body.perguntaId : null
    const resposta = typeof body?.resposta === 'string' ? body.resposta.trim() : ''

    if (!perguntaId) throw new BusinessRuleError('Pergunta não informada')
    if (!resposta) throw new BusinessRuleError('Escreva sua resposta para registrarmos')

    const registrada = await registrarRespostaPerguntaAberta(
      perguntaId,
      usuario.empresaId,
      resposta.slice(0, 2000),
      'conversa-finalizada',
    )

    return NextResponse.json({ data: { id: registrada.id } })
  } catch (err) {
    return handleApiError(err)
  }
}
