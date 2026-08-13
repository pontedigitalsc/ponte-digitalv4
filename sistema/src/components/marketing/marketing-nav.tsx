'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '#o-que-e', label: 'O que é' },
  { href: '#o-mapa', label: 'Mapa vivo' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#copiloto', label: 'Copiloto' },
  { href: '#a-visao', label: 'A visão' },
  { href: '#founder', label: 'Founder' },
]

export function MarketingNav() {
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const onHash = () => setAberto(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-night-700/50 bg-night-900/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-night-text">
          <span aria-hidden="true" className="text-base leading-none text-night-azure">✦</span>
          Ponte Digital
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Seções">
          {LINKS.slice(0, 5).map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-night-text-soft transition-colors hover:text-night-text">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/conversa"
            className="rounded-lg bg-night-azure text-night-light-foreground px-3.5 py-1.5 text-xs font-medium shadow-[0_8px_20px_-8px_hsl(var(--l-azure)/0.5)] transition-colors hover:bg-night-mist sm:px-4 sm:py-2 sm:text-sm"
          >
            Ter a primeira conversa
          </Link>

          {/* botão do menu mobile */}
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="nav-mobile-menu"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-night-700/60 text-night-text transition-colors hover:bg-night-850 md:hidden"
          >
            <span aria-hidden="true" className="relative block h-3.5 w-4">
              <span className={cn('absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-transform', aberto && 'translate-y-[6px] rotate-45')} />
              <span className={cn('absolute left-0 top-[6px] h-0.5 w-full rounded-full bg-current transition-opacity', aberto && 'opacity-0')} />
              <span className={cn('absolute left-0 top-[12px] h-0.5 w-full rounded-full bg-current transition-transform', aberto && '-translate-y-[6px] -rotate-45')} />
            </span>
          </button>
        </div>
      </div>

      {/* dropdown mobile */}
      {aberto && (
        <nav
          id="nav-mobile-menu"
          aria-label="Seções (menu mobile)"
          className="border-t border-night-700/50 bg-night-900/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto max-w-5xl space-y-1 px-4 py-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setAberto(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-night-text-soft transition-colors hover:bg-night-850 hover:text-night-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}