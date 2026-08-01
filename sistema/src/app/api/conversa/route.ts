import { NextRequest, NextResponse } from 'next/server'
import { criarConversa, carregarConversa, responder, obterEstado } from '@/engine/conversation-engine'
import { handleApiError } from '@/lib/api-error'
import { conversaRespostaSchema } from '@/lib/validations'
import { assertRateLimit } from '@/lib/rate-limit'
import { requireUserApi } from '@/lib/authorize'
import { AuthenticationError } from '@/lib/app-errors'
import { listarMemoriasEmocionais } from '@/engine/relacao-engine'

function obterToken(request: NextRequest): string | null {
  return request.cookies.get('conv_token')?.value ?? null
}

// Valida que o usuário autenticado tem acesso à conversa
// (se a conversa já estiver vinculada a uma empresa)
async function validarAcessoConversa(token: string, usuario: Awaited<ReturnType<typeof requireUserApi>> | null): Promise<void> {
  if (!usuario) return
  const { prismaSeguro } = await import('@/lib/prisma-tenant-safe')
  const conversa = await prismaSeguro.conversa.findFirst({
    where: { token },
    select: { empresaId: true },
  })
  if (conversa?.empresaId && conversa.empresaId !== usuario.empresaId) {
    throw new AuthenticationError('Acesso negado a esta conversa')
  }
}

// GET /api/conversa — retorna estado atual da conversa (requer conv_token)
export async function GET(request: NextRequest) {
  try {
    let token = obterToken(request)
    let novoToken = false

    // Fluxo público: se não há token, cria um automaticamente
    // para que visitantes possam iniciar a conversa sem cadastro
    if (!token) {
      token = crypto.randomUUID()
      novoToken = true
    }

    const usuario = await requireUserApi().catch(() => null)
    await validarAcessoConversa(token, usuario)
    const estado = await obterEstado(token)

    // Memória Emocional — a conversa retoma de onde a última ficou no sentimento
    let memoria = undefined
    if (usuario) {
      const memorias = await listarMemoriasEmocionais(usuario.empresaId, 1).catch(() => [])
      if (memorias.length > 0) {
        memoria = `${memorias[0].sentimento} Fiquei pensando nisso desde então — quero saber como está agora.`
      }
    }

    let jsonResponse: NextResponse

    if (!estado) {
      const nova = await criarConversa(token)
      const fluxo = (await import('@/engine/fluxos/primeira-conversa')).FLUXOS[nova.fluxo]
      const primeira = fluxo?.etapas[0] ?? null

      jsonResponse = NextResponse.json({
        token,
        perguntaAtual: primeira,
        progresso: { blocoAtual: 1, totalBlocos: 4, etapaNoBloco: 1, totalEtapasNoBloco: 1, percentual: 0 },
        concluida: false,
        respostas: {},
        memoria,
      })
    } else {
      jsonResponse = NextResponse.json({
        token,
        ...estado,
        memoria,
      })
    }

    if (novoToken) {
      jsonResponse.cookies.set('conv_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      })
    }

    return jsonResponse
  } catch (err) {
    return handleApiError(err)
  }
}

// POST /api/conversa — envia resposta e avança
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi().catch(() => null)

    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    assertRateLimit(`conversa:${ip}`, 'CONVERSA')

    const token = obterToken(request)
    if (!token) {
      return NextResponse.json({ error: 'Conversa não iniciada' }, { status: 400 })
    }
    await validarAcessoConversa(token, usuario)

    const body = await request.json()
    const validacao = conversaRespostaSchema.safeParse(body)

    if (!validacao.success) {
      return NextResponse.json({ error: 'Dados inválidos', detalhes: validacao.error.flatten() }, { status: 422 })
    }

    const { perguntaId, valor } = validacao.data

    const resultado = await responder(token, perguntaId, valor)

    return NextResponse.json({ data: resultado })
  } catch (err) {
    return handleApiError(err)
  }
}
