import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { obterRespostas } from '@/engine/conversation-engine'
import { processarCadastro } from '@/engine'
import { registrarClarezaDaConversa } from '@/engine/clareza-engine'
import { registerSchema } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'
import { createLogger } from '@/lib/logger'
import { assertRateLimit } from '@/lib/rate-limit'

const log = createLogger('api', 'criar-conta')

// P57B — o número de pertencimento é único, nunca reutilizado e nunca alterado.
// A alocação acontece na própria transação de criação da empresa (evita corrida
// entre cadastros simultâneos); em caso de colisão de índice único, tenta de novo.
const MAX_TENTATIVAS_NUMERO = 3

async function alocarNumeroApoiador(empresaData: { nome: string; slug: string }) {
  for (let tentativa = 0; tentativa < MAX_TENTATIVAS_NUMERO; tentativa++) {
    try {
      return await prisma.$transaction(async (tx) => {
        const { _max } = await tx.empresa.aggregate({ _max: { numeroApoiador: true } })
        const proximo = (_max.numeroApoiador ?? 0) + 1
        const empresa = await tx.empresa.create({ data: { ...empresaData, numeroApoiador: proximo } })
        return { empresa, numero: proximo }
      })
    } catch (err) {
      const isUniqueViolation = err && typeof err === 'object' && 'code' in err && (err as { code?: string }).code === 'P2002'
      if (!isUniqueViolation || tentativa === MAX_TENTATIVAS_NUMERO - 1) throw err
      log.warn('Colisão de número de apoiador; tentando novamente', { details: { tentativa } })
    }
  }
  throw new Error('Não foi possível alocar um número de apoiador único.')
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    assertRateLimit(`criar-conta:${ip}`, 'CRIAR_CONTA')

    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos', detalhes: parsed.error.flatten().fieldErrors }, { status: 422 })
    }

    const { nome, email, senha, nomeEmpresa } = parsed.data

    const token = request.cookies.get('conv_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Nenhuma conversa encontrada. Faça a conversa primeiro.' }, { status: 400 })
    }

    // Valida se a conversa existe antes de criar qualquer recurso
    try {
      await obterRespostas(token)
    } catch {
      return NextResponse.json({ error: 'Conversa não encontrada. Inicie uma nova conversa.' }, { status: 400 })
    }

    // 1. Cria usuário no Supabase Auth
    const { data: authData, error: authError } = await getSupabaseAdmin().auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
      user_metadata: { nome, nomeEmpresa },
    })

    if (authError) {
      return NextResponse.json({ error: 'Não consegui guardar isso agora. Confira os dados e tente novamente.' }, { status: 400 })
    }

    const supabaseId = authData.user.id

    // 2. Cria empresa com o número de pertencimento (P57B)
    const slug = nomeEmpresa
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36)

    const { empresa, numero: numeroApoiador } = await alocarNumeroApoiador({ nome: nomeEmpresa, slug })

    // Vincula a conversa anônima à empresa recém-criada
    await prisma.conversa.updateMany({
      where: { token, concluida: false },
      data: { empresaId: empresa.id },
    })

    // 3. Cria usuário no banco
    const usuario = await prisma.usuario.create({
      data: {
        empresaId: empresa.id,
        supabaseId,
        nome,
        email,
        role: 'ADMIN',
      },
    })

    // 4. Delega o restante do processamento cognitivo ao Orchestrator
    const resultado = await processarCadastro(empresa.id, token)

    if (!resultado.sucesso) {
      log.warn('Orchestrator acionado com erros', { details: { erros: resultado.erros } })
    }

    // P59 — registra a clareza que ficou pendente durante a conversa anônima.
    registrarClarezaDaConversa(token, empresa.id).catch(() => {
      // registro é opcional — não interrompe a criação da conta
    })

    // 5. Retorna sucesso — o frontend redireciona
    return NextResponse.json({ data: { empresaId: empresa.id, usuarioId: usuario.id, numeroApoiador } })
  } catch (err) {
    return handleApiError(err)
  }
}
