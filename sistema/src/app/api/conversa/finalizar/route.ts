import { NextRequest, NextResponse } from 'next/server'
import { obterRespostas } from '@/engine/conversation-engine'
import { interpretarRespostas } from '@/engine/identity-engine'
import { gerarResumoNatural } from '@/engine/interpretacoes'
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

    return NextResponse.json({
      data: {
        interpretacoes,
        resumoNatural,
        respostas,
      },
    })
  } catch (err) {
    return handleApiError(err)
  }
}
