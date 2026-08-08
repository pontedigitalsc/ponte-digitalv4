import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { promoverPerguntaParaConhecimento } from '@/engine/pergunta-aberta-service'
import { handleApiError } from '@/lib/api-error'
import { BusinessRuleError } from '@/lib/app-errors'
import { registrarAuditoriaPlataforma } from '@/lib/plataforma'

// POST /api/painel-do-fundador/promover — ETAPA 7: promoção para conhecimento.
// A descoberta deixa de ser uma pergunta e vira ConhecimentoColetivo candidato.
export async function POST(request: NextRequest) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const body = await request.json().catch(() => null)

    const perguntaId = typeof body?.perguntaId === 'string' ? body.perguntaId : null
    const titulo = typeof body?.titulo === 'string' ? body.titulo.trim() : ''
    const descricao = typeof body?.descricao === 'string' ? body.descricao.trim() : ''
    const categoria = typeof body?.categoria === 'string' ? body.categoria.trim() : 'ESTRATEGIA'

    if (!perguntaId) throw new BusinessRuleError('Pergunta não informada')
    if (!titulo) throw new BusinessRuleError('Dê um título à descoberta')
    if (!descricao) throw new BusinessRuleError('Descreva a descoberta')

    const conhecimento = await promoverPerguntaParaConhecimento(perguntaId, { titulo, descricao, categoria })

    await registrarAuditoriaPlataforma({
      usuario,
      acao: 'CONHECIMENTO_PROMOVIDO',
      modulo: 'painel-do-fundador',
      contexto: 'plataforma',
      detalhes: { conhecimentoId: conhecimento.id, perguntaId, categoria },
    })

    return NextResponse.json({ data: { conhecimentoId: conhecimento.id } })
  } catch (err) {
    return handleApiError(err)
  }
}
