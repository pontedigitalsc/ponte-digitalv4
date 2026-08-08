import { redirect } from 'next/navigation'
import { AppShell } from '@/components/layout/app-shell'
import { requireUser, getEmpresaDoUsuario } from '@/lib/auth'
import { temPermissaoPlataformaUsuario } from '@/lib/plataforma'
import { experienceEngine } from '@/engine'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let usuario, empresa
  try {
    usuario = await requireUser()
    empresa = await getEmpresaDoUsuario(usuario.id)
  } catch {
    redirect('/login')
  }

  if (!empresa) redirect('/login')

  const modulosLiberados = await experienceEngine.obterModulosLiberados(usuario.empresaId).catch(() => null)
  const plataforma = temPermissaoPlataformaUsuario(usuario, 'FOUNDER_VIEW_PLATFORM')

  return (
    <AppShell
      usuario={usuario}
      nomeEmpresa={empresa.nome}
      modulosLiberados={modulosLiberados}
      plataforma={plataforma}
    >
      {children}
    </AppShell>
  )
}
