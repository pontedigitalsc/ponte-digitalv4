import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { obterPainelFundador, listarPerguntasAbertas, criarPerguntaAberta } from '@/engine/pergunta-aberta-service'
import { BIBLIOTECA_GRANDES_PERGUNTAS } from '@/engine/adaptive-question-engine'
import { handleApiError } from '@/lib/api-error'
import { BusinessRuleError } from '@/lib/app-errors'
import { registrarAuditoriaPlataforma } from '@/lib/plataforma'

// GET /api/painel-do-fundador — painel interno exclusivo do Founder Principal.
// ETAPA 5: pergunta atual, empresas participantes, padrões, pontos
// contraditórios, empresas com perspectivas diferentes, próxima revisão.
export async function GET() {
  try {
    await requirePlataforma('FOUNDER_VIEW_INTERNAL')
    const painel = await obterPainelFundador()
    const perguntas = await listarPerguntasAbertas()
    return NextResponse.json({ data: { painel, perguntas, biblioteca: BIBLIOTECA_GRANDES_PERGUNTAS } })
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/painel-do-fundador — ETAPA 2: criar a Pergunta Aberta.
// Apenas uma ativa por vez — criar uma nova desativa a anterior.
export async function POST(request: NextRequest) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const body = await request.json().catch(() => null)

    const pergunta = typeof body?.pergunta === 'string' ? body.pergunta.trim() : ''
    const objetivo = typeof body?.objetivo === 'string' ? body.objetivo.trim() : ''
    const capacidade = typeof body?.capacidade === 'string' ? body.capacidade.trim() : ''
    const beneficio = typeof body?.beneficio === 'string' ? body.beneficio.trim() : ''

    if (!pergunta) throw new BusinessRuleError('Escreva a pergunta')
    if (!objetivo) throw new BusinessRuleError('Explique por que queremos entender isso')

    const criada = await criarPerguntaAberta({
      pergunta,
      objetivo,
      capacidade: capacidade || 'Reflexão',
      beneficio: beneficio || 'Ajudar o empresário a enxergar melhor sua empresa',
      segmentosRecomendados: Array.isArray(body?.segmentosRecomendados)
        ? body.segmentosRecomendados.filter((s: unknown) => typeof s === 'string')
        : [],
      diasAteRevisao: typeof body?.diasAteRevisao === 'number' ? body.diasAteRevisao : 7,
    })

    await registrarAuditoriaPlataforma({
      usuario,
      acao: 'PERGUNTA_ABERTA_CRIADA',
      modulo: 'painel-do-fundador',
      contexto: 'plataforma',
      detalhes: { perguntaId: criada.id },
    })

    return NextResponse.json({ data: { pergunta: criada } })
  } catch (err) {
    return handleApiError(err)
  }
}
