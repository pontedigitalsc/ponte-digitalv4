import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'
import {
  obterPerguntaVivaAtiva,
  obterReflexaoDaSemana,
  listarMemoriasEmocionais,
  montarLinhaDaHistoria,
} from '@/engine/relacao-engine'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

// GET /api/relacao — Pergunta Viva + Reflexão da Semana + História + Memória Emocional
export async function GET(_request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const empresaId = usuario.empresaId

    const respostas = await obterRespostasRecentes(empresaId)

    const [perguntaViva, reflexao, memorias, historia] = await Promise.all([
      obterPerguntaVivaAtiva(empresaId),
      obterReflexaoDaSemana(empresaId),
      listarMemoriasEmocionais(empresaId, 5),
      montarLinhaDaHistoria(empresaId, respostas),
    ])

    return NextResponse.json({
      data: {
        perguntaViva,
        reflexao,
        memorias,
        historia,
      },
    })
  } catch (err) {
    return handleApiError(err)
  }
}

async function obterRespostasRecentes(empresaId: string): Promise<Record<string, string | null>> {
  const ultima = await prisma.conversa.findFirst({
    where: { empresaId, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    select: { respostas: true },
  })
  if (!ultima) return {}
  return (ultima.respostas as Record<string, string | null>) ?? {}
}
