'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'
import type { Usuario } from '@/types'
import type { CognitiveOSFields, ModulosLiberados } from '@/engine'

interface AppShellProps {
  children: React.ReactNode
  usuario?: Pick<Usuario, 'nome' | 'email' | 'avatar' | 'cargo'> | null
  nomeEmpresa?: string
  titulo?: string
  cognitiveOS?: CognitiveOSFields | null
  modulosLiberados?: ModulosLiberados | null
}

export function AppShell({ children, usuario, nomeEmpresa, titulo, cognitiveOS, modulosLiberados }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        nomeEmpresa={nomeEmpresa}
        cognitiveOS={cognitiveOS}
        modulosLiberados={modulosLiberados?.modulos ?? null}
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
