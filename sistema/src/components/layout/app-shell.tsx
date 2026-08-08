'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'
import type { Usuario } from '@/types'
import type { ModulosLiberados } from '@/engine'

interface AppShellProps {
  children: React.ReactNode
  usuario?: Pick<Usuario, 'nome' | 'email' | 'avatar' | 'cargo'> | null
  nomeEmpresa?: string
  titulo?: string
  modulosLiberados?: ModulosLiberados | null
  plataforma?: boolean
}

export function AppShell({ children, usuario, nomeEmpresa, titulo, modulosLiberados, plataforma }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        nomeEmpresa={nomeEmpresa}
        modulosLiberados={modulosLiberados?.modulos ?? null}
        plataforma={plataforma}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header usuario={usuario} titulo={titulo} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
