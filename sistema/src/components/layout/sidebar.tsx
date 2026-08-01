'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, UserCheck, Users,
  DollarSign, Settings, Bot, ChevronLeft, Building2,
  Clock, Sparkles, RefreshCw,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  {
    group: 'Sua empresa',
    items: [
      { href: '/minha-empresa-hoje', label: 'Minha empresa',  icon: LayoutDashboard },
      { href: '/atendimento',        label: 'Atendimento',    icon: UserCheck },
      { href: '/conversa',           label: 'Conversar',      icon: Bot },
      { href: '/minha-jornada',      label: 'Minha História', icon: RefreshCw },
    ],
  },
  {
    group: 'Consultar',
    items: [
      { href: '/historico',      label: 'Nossa caminhada', icon: Clock },
      { href: '/centro-decisao', label: 'O que merece atenção', icon: Sparkles },
      { href: '/conhecimento',   label: 'O que entendemos', icon: RefreshCw },
      { href: '/financeiro',     label: 'Caixa',            icon: DollarSign },
      { href: '/clientes',       label: 'Pessoas',          icon: Users },
    ],
  },
  {
    group: 'Aprender',
    items: [
      { href: '/aprendizados', label: 'Descobertas', icon: Clock },
      { href: '/assistente',   label: 'Assistente',   icon: Bot },
    ],
  },
  {
    group: 'Ajustes',
    items: [
      { href: '/configuracoes', label: 'Preferências', icon: Settings },
    ],
  },
]

const MODULO_MAP: Record<string, string> = {
  '/minha-empresa-hoje': 'inicio',
  '/dashboard': 'inicio',
  '/atendimento': 'inicio',
  '/conversa': 'conversa',
  '/minha-jornada': 'minha-jornada',
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
                            <span className="text-[10px] text-muted-foreground/30">em breve</span>
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

      {/* Fundador — aparece dentro da conta, não como venda externa (FASE 8) */}
      {!collapsed && (
        <div className="border-t px-2 py-3">
          <Link
            href="/fundador"
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
          >
            <svg className="h-3.5 w-3.5 shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>Construir essa história conosco</span>
          </Link>
        </div>
      )}
      {collapsed && (
        <div className="border-t p-2">
          <Link
            href="/fundador"
            className="flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            title="Fundador"
          >
            <svg className="h-4 w-4 shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </Link>
        </div>
      )}

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
