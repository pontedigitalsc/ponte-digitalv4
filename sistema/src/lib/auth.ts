import { createSupabaseServerClient } from '@/lib/supabase'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { redirect } from 'next/navigation'
import type { Usuario } from '@/types'

export async function getSession() {
  const supabase = await createSupabaseServerClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) return null
  return session
}

export async function getCurrentUser(): Promise<Usuario | null> {
  const session = await getSession()
  if (!session?.user) return null

  const usuario = await prisma.usuario.findUnique({
    where: { supabaseId: session.user.id },
  })

  return usuario as Usuario | null
}

export async function requireUser(): Promise<Usuario> {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  return user
}

export async function getEmpresaDoUsuario(usuarioId: string) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    include: { empresa: true },
  })
  return usuario?.empresa ?? null
}

export function temPermissao(role: string, permissaoMinima: 'MEMBRO' | 'GESTOR' | 'ADMIN'): boolean {
  const hierarquia = { MEMBRO: 0, GESTOR: 1, ADMIN: 2 }
  return hierarquia[role as keyof typeof hierarquia] >= hierarquia[permissaoMinima]
}
