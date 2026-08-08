import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

/**
 * ─── PROVISIONAMENTO SEGURO DO FOUNDER PRINCIPAL (P84 Parte 6 / Parte 22) ─────
 *
 * Usa dotenv + variáveis SERVER-ONLY (nunca NEXT_PUBLIC_*):
 *   - FOUNDER_BOOTSTRAP_SUPABASE_ID  ou
 *   - FOUNDER_BOOTSTRAP_EMAIL
 *
 * Regras:
 *   - Nunca decide por email/hardcoded espalhado no código.
 *   - Nunca lê do frontend, query string ou localStorage.
 *   - Após rodar, recomenda-se REMOVER a variável de bootstrap do ambiente —
 *     a autorização passa a vir somente da coluna `platformRole` persistida.
 */
const bootstrapSupabaseId = process.env.FOUNDER_BOOTSTRAP_SUPABASE_ID?.trim()
const bootstrapEmail = process.env.FOUNDER_BOOTSTRAP_EMAIL?.trim()

if (!bootstrapSupabaseId && !bootstrapEmail) {
  throw new Error(
    'Defina FOUNDER_BOOTSTRAP_SUPABASE_ID ou FOUNDER_BOOTSTRAP_EMAIL para provisionar o Founder Principal'
  )
}

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  const usuario = bootstrapSupabaseId
    ? await prisma.usuario.findUnique({ where: { supabaseId: bootstrapSupabaseId } })
    : await prisma.usuario.findFirst({ where: { email: bootstrapEmail } })

  if (!usuario) {
    throw new Error(
      `Nenhum usuário encontrado para ${bootstrapSupabaseId ? `supabaseId=${bootstrapSupabaseId}` : `email=${bootstrapEmail}`}`
    )
  }

  if (usuario.platformRole === 'FOUNDER_PRINCIPAL') {
    console.log(`FOUNDER_PRINCIPAL já provisionado para ${usuario.email} (${usuario.id})`)
    await prisma.$disconnect()
    return
  }

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { platformRole: 'FOUNDER_PRINCIPAL' },
  })

  await prisma.auditoriaPlataforma.create({
    data: {
      usuarioId: usuario.id,
      email: usuario.email,
      acao: 'FOUNDER_PRINCIPAL_PROVISIONADO',
      modulo: 'provision-founder',
      contexto: 'plataforma',
      empresaId: usuario.empresaId,
    },
  })

  console.log(`Founder Principal provisionado: ${usuario.email} (${usuario.id})`)
  console.log('Empresa associada (tenant):', usuario.empresaId)
  console.log('Remova agora FOUNDER_BOOTSTRAP_* do ambiente se desejar desligar o bootstrap.')
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})