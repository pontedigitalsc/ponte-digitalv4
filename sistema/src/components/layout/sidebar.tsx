'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, UserCheck, Users,
  DollarSign, Settings, Bot, ChevronLeft, Building2,
  Clock, Sparkles, RefreshCw, Compass, BookOpen, Inbox,
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
    group: 'Operação',
    items: [
      { href: '/tarefas',       label: 'Tarefas',       icon: Clock },
      { href: '/implantacoes',  label: 'Implantações',  icon: Inbox },
      { href: '/crm',           label: 'Oportunidades', icon: Users },
    ],
  },
  {
    group: 'Consultar',
    items: [
      { href: '/memoria',        label: 'Memória da empresa', icon: BookOpen },
      { href: '/explorar',       label: 'Explorar cenários', icon: Compass },
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
  '/tarefas': 'tarefas',
  '/implantacoes': 'implantacoes',
  '/crm': 'crm',
  '/memoria': 'memoria',
  '/explorar': 'explorar',
  '/centro-decisao': 'centro-decisao',
  '/conhecimento': 'conhecimento',
  '/financeiro': 'financeiro',
  '/clientes': 'clientes',
  '/aprendizados': 'aprendizados',
  '/assistente': 'assistente',
  '/configuracoes': 'configuracoes',
}

const plataformaGroup = {
  group: 'Plataforma',
  items: [
    { href: '/painel-do-fundador', label: 'Painel do Fundador', icon: Sparkles },
    { href: '/admin/founder-operacoes', label: 'Solicitações Founder', icon: Inbox },
    { href: '/admin/descoberta', label: 'Descoberta', icon: Compass },
    { href: '/admin/radar-founders', label: 'Radar Founders', icon: Users },
    { href: '/admin/diario-founder', label: 'Diário Founder', icon: Clock },
    { href: '/admin/diario-cientifico', label: 'Diário Científico', icon: BookOpen },
    { href: '/admin/cognitive-observatory', label: 'Observatório Cognitivo', icon: RefreshCw },
  ],
}

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  mobileAberto?: boolean
  onCloseMobile?: () => void
  nomeEmpresa?: string
  modulosLiberados?: string[] | null
  plataforma?: boolean
}

export function Sidebar({ collapsed = false, onToggle, mobileAberto = false, onCloseMobile, nomeEmpresa = 'Ponte Digital', modulosLiberados, plataforma = false }: SidebarProps) {
  const pathname = usePathname()

  const isLiberado = (href: string): boolean => {
    if (!modulosLiberados) return true
    const moduloId = MODULO_MAP[href]
    if (!moduloId) return true
    return modulosLiberados.includes(moduloId)
  }

  const grupos = plataforma ? [...navItems, plataformaGroup] : navItems
  // No mobile (drawer aberto) sempre mostramos rótulos; collapsed só vale no desktop
  const mostrarRotulos = !collapsed || mobileAberto

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-card transition-all duration-300 ease-in-out',
        // Desktop: sidebar fixa com colapso manual (w-60 / w-16)
        'hidden lg:flex',
        collapsed ? 'lg:w-16' : 'lg:w-60',
        // Mobile: drawer sobreposto, abre/fecha com translate
        mobileAberto ? 'fixed inset-y-0 left-0 z-50 w-72' : 'fixed -translate-x-full'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex h-14 items-center border-b px-4',
        mostrarRotulos ? 'justify-between' : 'justify-center'
      )}>
        {mostrarRotulos ? (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold truncate">{nomeEmpresa}</span>
          </div>
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        {mostrarRotulos && onToggle && !mobileAberto && (
          <button
            onClick={onToggle}
            className="rounded-md p-1 hover:bg-accent transition-colors"
            aria-label="Recolher menu"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        {mobileAberto && onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="rounded-md p-1 hover:bg-accent transition-colors"
            aria-label="Fechar menu"
          >
            <ChevronLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {grupos.map((group) => (
          <div key={group.group}>
            {mostrarRotulos && (
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
                  !mostrarRotulos && 'justify-center px-0',
                  liberado
                    ? active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    : 'text-muted-foreground/40 cursor-not-allowed'
                )
                return (
                  <li key={item.href}>
                    {liberado ? (
                      <Link
                        href={item.href}
                        className={classes}
                        title={!mostrarRotulos ? item.label : undefined}
                        onClick={mobileAberto ? onCloseMobile : undefined}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {mostrarRotulos && <span>{item.label}</span>}
                      </Link>
                    ) : (
                      <div className={classes} title={!mostrarRotulos ? item.label : undefined}>
                        <Icon className="h-4 w-4 shrink-0" />
                        {mostrarRotulos && (
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
      {mostrarRotulos && (
        <div className="border-t px-2 py-3">
          <Link
            href="/fundador"
            onClick={mobileAberto ? onCloseMobile : undefined}
            className="flex items-center gap-3 rounded-lg px-2 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
          >
            <svg className="h-3.5 w-3.5 shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>Construir essa história conosco</span>
          </Link>
        </div>
      )}
      {!mostrarRotulos && (
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
      {!mostrarRotulos && onToggle && (
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
