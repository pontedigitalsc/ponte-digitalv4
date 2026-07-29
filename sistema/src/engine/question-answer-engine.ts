import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { OrigemResposta } from '@prisma/client'

interface RegistrarRespostaParams {
  empresaId: string
  perguntaId: string
  pergunta: string
  valor: string
  bloco?: string
  origem?: OrigemResposta
  ordem?: number
  token?: string
}

export async function registrarResposta(
  params: RegistrarRespostaParams
): Promise<{ id: string }> {
  const { empresaId, perguntaId, pergunta, valor, bloco, origem, ordem, token } = params

  const resposta = await prisma.respostasConversa.create({
    data: {
      empresaId,
      perguntaId,
      pergunta,
      valor: valor.slice(0, 500),
      bloco,
      origem: origem ?? 'PRIMEIRA_CONVERSA',
      ordem: ordem ?? 0,
      token,
    },
    select: { id: true },
  })

  return resposta
}

export async function listarRespostasPorEmpresa(
  empresaId: string,
  opcoes?: { bloco?: string; limite?: number }
): Promise<{ perguntaId: string; pergunta: string; valor: string; bloco: string | null; criadaEm: Date }[]> {
  return prisma.respostasConversa.findMany({
    where: {
      empresaId,
      deletedAt: null,
      ...(opcoes?.bloco ? { bloco: opcoes.bloco } : {}),
    },
    select: {
      perguntaId: true,
      pergunta: true,
      valor: true,
      bloco: true,
      criadaEm: true,
    },
    orderBy: { criadaEm: 'desc' },
    take: opcoes?.limite ?? 50,
  })
}

export async function listarRespostasPorToken(
  token: string
): Promise<{ perguntaId: string; pergunta: string; valor: string; bloco: string | null }[]> {
  return prisma.respostasConversa.findMany({
    where: { token, deletedAt: null },
    select: {
      perguntaId: true,
      pergunta: true,
      valor: true,
      bloco: true,
    },
    orderBy: { ordem: 'asc' },
  })
}
