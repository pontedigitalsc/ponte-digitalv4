import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/authorize'
import { promoverPerguntaParaConhecimento } from '@/engine/pergunta-aberta-service'
import { handleApiError } from '@/lib/api-error'
import { BusinessRuleError } from '@/lib/app-errors'

// POST /api/painel-do-fundador/promover — ETAPA 7: promoção para conhecimento.
// A descoberta deixa de ser uma pergunta e vira ConhecimentoColetivo candidato.
export async function POST(request: NextRequest) {
  try {
    await requireRole('ADMIN')
    const body = await request.json().catch(() => null)

    const perguntaId = typeof body?.perguntaId === 'string' ? body.perguntaId : null
    const titulo = typeof body?.titulo === 'string' ? body.titulo.trim() : ''
    const descricao = typeof body?.descricao === 'string' ? body.descricao.trim() : ''
    const categoria = typeof body?.categoria === 'string' ? body.categoria.trim() : 'ESTRATEGIA'

    if (!perguntaId) throw new BusinessRuleError('Pergunta não informada')
    if (!titulo) throw new BusinessRuleError('Dê um título à descoberta')
    if (!descricao) throw new BusinessRuleError('Descreva a descoberta')

    const conhecimento = await promoverPerguntaParaConhecimento(perguntaId, { titulo, descricao, categoria })

    return NextResponse.json({ data: { conhecimentoId: conhecimento.id } })
  } catch (err) {
    return handleApiError(err)
  }
}
