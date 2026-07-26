import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { createClient } from '@supabase/supabase-js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
)

async function main() {
  console.log('Seed — Empresa Zero (Ponte Digital)')
  console.log()

  const email = process.env.SEED_ADMIN_EMAIL ?? (() => { throw new Error('SEED_ADMIN_EMAIL é obrigatório') })()
  const senha = process.env.SEED_ADMIN_PASSWORD ?? (() => { throw new Error('SEED_ADMIN_PASSWORD é obrigatório') })()

  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
    user_metadata: { nome: 'Kelven' },
  })

  if (authError) {
    if (authError.message.includes('already exists')) {
      console.log('Usuário Supabase já existe — reutilizando')
    } else {
      throw authError
    }
  } else {
    console.log(`Usuário Supabase criado: ${authUser.user.id}`)
  }

  const supabaseId = authUser?.user?.id ?? (await supabaseAdmin.auth.admin.listUsers()).data.users
    .find(u => u.email === email)?.id

  if (!supabaseId) {
    throw new Error(`Não foi possível encontrar/criar o usuário ${email} no Supabase Auth`)
  }

  const empresa = await prisma.empresa.upsert({
    where: { slug: 'ponte-digital' },
    update: {},
    create: {
      nome: 'Ponte Digital',
      slug: 'ponte-digital',
      plano: 'PROFISSIONAL',
      configuracao: {
        create: {
          moeda: 'BRL',
          fuso: 'America/Sao_Paulo',
          corPrimaria: '#2563EB',
          etapasImplantacao: [
            'Kickoff com o cliente',
            'Configuração inicial do sistema',
            'Migração de dados',
            'Treinamento da equipe',
            'Período de testes',
            'Go-live',
            'Acompanhamento pós-implantação',
          ],
        },
      },
    },
  })
  console.log(`Empresa: ${empresa.nome} (${empresa.id})`)

  const usuario = await prisma.usuario.upsert({
    where: { supabaseId },
    update: {},
    create: {
      empresaId: empresa.id,
      supabaseId,
      nome: 'Kelven',
      email,
      role: 'ADMIN',
    },
  })
  console.log(`Admin: ${usuario.nome} (${usuario.id}) — ${usuario.email}`)
  console.log()
  console.log('Empresa Zero criada com sucesso!')
  console.log(`Email: ${email}`)
  console.log(`URL: ${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
