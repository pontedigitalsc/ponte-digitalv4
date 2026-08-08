import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

/**
 * ─── PLANTAÇÃO DA FUNDAÇÃO (P85 — A PONTE USA A PONTE) ───────────────────────
 *
 * Executa a identidade definitiva da Ponte Digital como primeira empresa real
 * que usa o próprio Business OS. É IDEMPOTENTE: pode rodar várias vezes sem
 * duplicar ou corromper estado.
 *
 * O que faz:
 *   1. Garante a empresa "Imperador" (slug `imperador`) com
 *      numeroApoiador=1 e numeroFundador=1 (novo ciclo de numeração).
 *   2. Renumera a empresa canônica da Ponte Digital (slug `ponte-digital`,
 *      empresa do seed) com os números subsequentes (#2).
 *   3. Provisiona o Founder Principal (env FOUNDER_BOOTSTRAP_*) como
 *      platformRole='FOUNDER_PRINCIPAL'.
 *   4. Cria a membership EmpresaUsuario (role ADMIN) do Founder Principal na
 *      empresa canônica da Ponte Digital.
 *
 * Regras:
 *   - Nunca decide por email/hardcoded espalhado no código (usa env).
 *   - Nunca altera numeroApoiador/numeroFundador já preenchidos.
 *   - Nunca apaga histórico: empresas duplicadas de "Ponte Digital" de fases
 *     anteriores NÃO são tocadas (documentadas em KNOWN_ISSUES).
 *   - Uso único: server-side, via CLI, após a migration 009.
 *
 * Uso:
 *   npm run founder:plantar-fundacao
 */
const bootstrapSupabaseId = process.env.FOUNDER_BOOTSTRAP_SUPABASE_ID?.trim()
const bootstrapEmail = process.env.FOUNDER_BOOTSTRAP_EMAIL?.trim()

if (!bootstrapSupabaseId && !bootstrapEmail) {
  throw new Error(
    'Defina FOUNDER_BOOTSTRAP_SUPABASE_ID ou FOUNDER_BOOTSTRAP_EMAIL para plantar a fundação'
  )
}

const SLUG_IMPERADOR = 'imperador'
const SLUG_PONTE_CANONICA = 'ponte-digital'

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  // 1. Imperador — empresa nº 1 do novo ciclo (Fundador + Apoiador nº 1).
  const imperador = await prisma.empresa.upsert({
    where: { slug: SLUG_IMPERADOR },
    update: {},
    create: {
      nome: 'Imperador da Ponte Digital',
      slug: SLUG_IMPERADOR,
      numeroApoiador: 1,
      numeroFundador: 1,
    },
  })
  console.log(`Imperador garantido: ${imperador.id} (apoiador=${imperador.numeroApoiador}, fundador=${imperador.numeroFundador})`)

  // 2. Ponte Digital canônica (empresa do seed) — número subsequente (#2).
  const ponteCanonica = await prisma.empresa.findUnique({ where: { slug: SLUG_PONTE_CANONICA } })
  if (!ponteCanonica) {
    throw new Error(`Empresa canônica '${SLUG_PONTE_CANONICA}' não encontrada — confira o seed.`)
  }
  if (ponteCanonica.numeroApoiador === null) {
    await prisma.empresa.update({
      where: { id: ponteCanonica.id },
      data: { numeroApoiador: 2 },
    })
    console.log(`Ponte Digital canônica recebeu numeroApoiador=2 (${ponteCanonica.id})`)
  } else {
    console.log(`Ponte Digital canônica já numerada: numeroApoiador=${ponteCanonica.numeroApoiador}`)
  }
  if (ponteCanonica.numeroFundador === null) {
    await prisma.empresa.update({
      where: { id: ponteCanonica.id },
      data: { numeroFundador: 2 },
    })
    console.log(`Ponte Digital canônica recebeu numeroFundador=2 (${ponteCanonica.id})`)
  } else {
    console.log(`Ponte Digital canônica já numerada como fundadora: numeroFundador=${ponteCanonica.numeroFundador}`)
  }

  // 3. Founder Principal — plataforma + empresa canônica.
  const usuario = bootstrapSupabaseId
    ? await prisma.usuario.findUnique({ where: { supabaseId: bootstrapSupabaseId } })
    : await prisma.usuario.findFirst({ where: { email: bootstrapEmail } })

  if (!usuario) {
    throw new Error(
      `Nenhum usuário encontrado para ${bootstrapSupabaseId ? `supabaseId=${bootstrapSupabaseId}` : `email=${bootstrapEmail}`}`
    )
  }

  if (usuario.platformRole !== 'FOUNDER_PRINCIPAL') {
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { platformRole: 'FOUNDER_PRINCIPAL' },
    })
    console.log(`Founder Principal provisionado: ${usuario.email} (${usuario.id})`)
  } else {
    console.log(`Founder Principal já provisionado: ${usuario.email} (${usuario.id})`)
  }

  // 4. Membership ADMIN na empresa canônica da Ponte Digital.
  const membership = await prisma.empresaUsuario.upsert({
    where: { empresaId_usuarioId: { empresaId: ponteCanonica.id, usuarioId: usuario.id } },
    update: { ativo: true, role: 'ADMIN' },
    create: {
      empresaId: ponteCanonica.id,
      usuarioId: usuario.id,
      role: 'ADMIN',
      ativo: true,
    },
  })
  console.log(`Membership garantida: ${usuario.email} é ADMIN de ${SLUG_PONTE_CANONICA} (${membership.id})`)

  await prisma.auditoriaPlataforma.create({
    data: {
      usuarioId: usuario.id,
      email: usuario.email,
      acao: 'FUNDACAO_PLANTADA',
      modulo: 'plantar-fundacao',
      contexto: 'plataforma',
      empresaId: ponteCanonica.id,
    },
  })

  console.log('── Resumo ─────────────────────────────────────')
  console.log('Imperador:            #1 apoiador / #1 fundador')
  console.log('Ponte Digital canônica: #2 apoiador / #2 fundador')
  console.log('Founder Principal:    ' + usuario.email)
  console.log('Empresas duplicadas de fases anteriores: NÃO foram tocadas.')
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
