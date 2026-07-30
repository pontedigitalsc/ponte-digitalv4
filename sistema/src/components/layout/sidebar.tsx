'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, UserCheck,
  DollarSign, Settings, Bot, ChevronLeft, Building2,
  TrendingUp, Clock, Sparkles, RefreshCw,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  {
    group: 'Trabalho',
    items: [
      { href: '/atendimento', label: 'Atendimento', icon: UserCheck },
      { href: '/dashboard',   label: 'Centro Hoje', icon: LayoutDashboard },
    ],
  },
  {
    group: 'Consultar',
    items: [
      { href: '/historico',     label: 'Timeline',    icon: Clock },
      { href: '/centro-decisao', label: 'Decisões',    icon: TrendingUp },
      { href: '/conhecimento',  label: 'Conhecimento', icon: Sparkles },
      { href: '/financeiro',    label: 'Caixa',        icon: DollarSign },
      { href: '/clientes',      label: 'Pessoas',      icon: UserCheck },
    ],
  },
  {
    group: 'Aprender',
    items: [
      { href: '/aprendizados', label: 'Aprendizados', icon: RefreshCw },
      { href: '/assistente',   label: 'Assistente',   icon: Bot },
    ],
  },
  {
    group: 'Sistema',
    items: [
      { href: '/configuracoes', label: 'Configurações', icon: Settings },
    ],
  },
]

const MODULO_MAP: Record<string, string> = {
  '/atendimento': 'atendimento',
  '/dashboard': 'inicio',
  '/historico': 'historico',
  '/centro-decisao': 'centro-decisao',
  '/conhecimento': 'conhecimento',
  '/financeiro': 'financeiro',
  '/clientes': 'clientes',
  '/aprendizados': 'aprendizados',
  '/assistente': 'assistente',
  '/configuracoes': 'configuracoes',
}

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  nomeEmpresa?: string
  modulosLiberados?: string[] | null
}

export function Sidebar({ collapsed = false, onToggle, nomeEmpresa = 'Ponte Digital', modulosLiberados }: SidebarProps) {
  const pathname = usePathname()

  const isLiberado = (href: string): boolean => {
    if (!modulosLiberados) return true
    const moduloId = MODULO_MAP[href]
    if (!moduloId) return true
    return modulosLiberados.includes(moduloId)
  }

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-card transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex h-14 items-center border-b px-4',
        collapsed ? 'justify-center' : 'justify-between'
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold truncate">{nomeEmpresa}</span>
          </div>
        )}
        {collapsed && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        {!collapsed && onToggle && (
          <button
            onClick={onToggle}
            className="rounded-md p-1 hover:bg-accent transition-colors"
            aria-label="Recolher menu"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navItems.map((group) => (
          <div key={group.group}>
            {!collapsed && (
              <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                {group.group}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href || pathname.startsWith(item.href + '/')
                const liberado = isLiberado(item.href)
                const classes = cn(
                  'flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors',
                  collapsed && 'justify-center px-0',
                  liberado
                    ? active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    : 'text-muted-foreground/40 cursor-not-allowed'
                )
                return (
                  <li key={item.href}>
                    {liberado ? (
                      <Link href={item.href} className={classes} title={collapsed ? item.label : undefined}>
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    ) : (
                      <div className={classes} title={collapsed ? item.label : undefined}>
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && (
                          <span className="flex items-center gap-1">
                            {item.label}
                            <span className="text-[10px] text-muted-foreground/30">bloqueado</span>
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle (when collapsed) */}
      {collapsed && onToggle && (
        <div className="border-t p-2">
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-center rounded-lg p-2 hover:bg-accent transition-colors"
            aria-label="Expandir menu"
          >
            <ChevronLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
          </button>
        </div>
      )}
    </aside>
  )
}
