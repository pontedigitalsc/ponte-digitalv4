'use client'

import { useRouter } from 'next/navigation'
import { Bell, Moon, Sun, LogOut, User, Settings } from 'lucide-react'
import { DropdownMenu } from '@/components/shared/dropdown-menu'
import { useTheme } from 'next-themes'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import type { Usuario } from '@/types'

interface HeaderProps {
  usuario?: Pick<Usuario, 'nome' | 'email' | 'avatar' | 'cargo'> | null
  titulo?: string
}

export function Header({ usuario, titulo }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleSignOut = async () => {
    const { createSupabaseBrowserClient } = await import('@/lib/supabase-browser')
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4 lg:px-6">
      <div className="flex items-center gap-3">
        {titulo && (
          <h1 className="text-base font-semibold text-foreground">{titulo}</h1>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Alternar tema"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </Button>

        <div className="mx-1 h-6 w-px bg-border" />

        {usuario && (
          <DropdownMenu
            width="w-48"
            trigger={
              <div className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent transition-colors">
                <Avatar src={usuario.avatar} nome={usuario.nome} size="sm" />
                <div className="hidden md:block text-left">
                  <p className="text-xs font-medium leading-tight">{usuario.nome}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{usuario.cargo ?? 'Membro'}</p>
                </div>
              </div>
            }
            items={[
              { label: 'Meu perfil', onClick: () => router.push('/configuracoes/perfil'), icon: <User className="h-4 w-4" /> },
              { label: 'Configurações', onClick: () => router.push('/configuracoes'), icon: <Settings className="h-4 w-4" /> },
              'divider',
              { label: 'Sair', onClick: handleSignOut, variant: 'danger', icon: <LogOut className="h-4 w-4" /> },
            ]}
          />
        )}
      </div>
    </header>
  )
}
