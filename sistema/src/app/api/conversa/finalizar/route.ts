import { NextRequest, NextResponse } from 'next/server'
import { obterRespostas, vincularConversa } from '@/engine/conversation-engine'
import { interpretarRespostas } from '@/engine/identity-engine'
import { gerarResumoNatural } from '@/engine/interpretacoes'
import { gerarRetratoEstrategico, registrarClarezaGerada } from '@/engine/retrato-estrategico'
import { processarConversa } from '@/engine/cognitive-orchestrator'
import { criarPerguntaVivaSeNecessario, registrarMemoriasEmocionais } from '@/engine/relacao-engine'
import { obterPerguntaAbertaAtiva, empresaJaRespondeu, estaCompativelComSegmento } from '@/engine/pergunta-aberta-service'
import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import { handleApiError } from '@/lib/api-error'
import { assertRateLimit } from '@/lib/rate-limit'
import { requireUserApi } from '@/lib/authorize'
import { AuthenticationError } from '@/lib/app-errors'
import { BusinessRuleError } from '@/lib/app-errors'

async function validarAcessoConversa(token: string, usuario: Awaited<ReturnType<typeof requireUserApi>> | null): Promise<void> {
  if (!usuario) return
  const conversa = await prismaSeguro.conversa.findFirst({
    where: { token, deletedAt: null },
    select: { empresaId: true, concluida: true },
  })
  if (!conversa) throw new AuthenticationError('Conversa não encontrada')
  if (conversa.concluida) throw new BusinessRuleError('Conversa já finalizada')
  if (conversa.empresaId && conversa.empresaId !== usuario.empresaId) {
    throw new AuthenticationError('Acesso negado a esta conversa')
  }
}

// POST /api/conversa/finalizar — gera interpretações e marca conversa como concluída
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi().catch(() => null)

    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    assertRateLimit(`conversa:${ip}`, 'CONVERSA')

    const token = request.cookies.get('conv_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Conversa não iniciada' }, { status: 400 })
    }

    await validarAcessoConversa(token, usuario)

    const respostas = await obterRespostas(token)

    const conversa = await prismaSeguro.conversa.findFirst({
      where: { token, concluida: false, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
    })
    if (!conversa) throw new BusinessRuleError('Conversa já finalizada')

    await prismaSeguro.conversa.update({
      where: { id: conversa.id },
      data: { concluida: true },
    })

    const interpretacoes = await interpretarRespostas(respostas)
    const resumoNatural = gerarResumoNatural(respostas, interpretacoes)
    const retratoEstrategico = gerarRetratoEstrategico(respostas, interpretacoes)

    let empresaId = conversa.empresaId
    if (!empresaId && usuario) {
      empresaId = usuario.empresaId
      await vincularConversa(token, empresaId)
    }

    if (empresaId) {
      processarConversa(empresaId, token).catch(() => {
        // Processamento cognitivo em background — falha não quebra o fluxo
      })

      // P49 — Pergunta Viva e Memória Emocional nascem da conversa
      criarPerguntaVivaSeNecessario(empresaId, respostas).catch(() => {
        // não interrompe a resposta
      })
      registrarMemoriasEmocionais(empresaId, respostas).catch(() => {
        // não interrompe a resposta
      })

      // P57A — Retrato Estratégico nasce da primeira conversa; a Clareza Gerada
      // é registrada como sinal de valor percebido (sem score artificial).
      registrarClarezaGerada(empresaId, retratoEstrategico, respostas).catch(() => {
        // registro é opcional — não interrompe a finalização
      })
    }

    // P52 — ETAPA 3: a Pergunta Aberta aparece quando a conversa termina
    // naturalmente, se o segmento é compatível, se a empresa ainda não
    // respondeu e se existe contexto (empresa identificada).
    let perguntaAberta: { id: string; pergunta: string; beneficio: string } | null = null
    if (empresaId) {
      try {
        const ativa = await obterPerguntaAbertaAtiva()
        if (ativa && !(await empresaJaRespondeu(ativa.id, empresaId))) {
          const compativel = await estaCompativelComSegmento(ativa.segmentosRecomendados, empresaId)
          if (compativel) {
            perguntaAberta = { id: ativa.id, pergunta: ativa.pergunta, beneficio: ativa.beneficio }
          }
        }
      } catch {
        // Pergunta Aberta é opcional — falha não interrompe a finalização
      }
    }

    return NextResponse.json({
      data: {
        interpretacoes,
        resumoNatural,
        retratoEstrategico,
        respostas,
        perguntaAberta,
      },
    })
  } catch (err) {
    return handleApiError(err)
  }
}
