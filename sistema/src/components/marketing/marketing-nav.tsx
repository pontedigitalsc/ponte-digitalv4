import Link from 'next/link'

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-night-700/50 bg-night-900/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-night-text">
          <span aria-hidden="true" className="text-base leading-none text-night-azure">✦</span>
          Ponte Digital
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Seções">
          <a href="#o-que-e" className="text-sm text-night-text-soft transition-colors hover:text-night-text">
            O que é
          </a>
          <a href="#como-funciona" className="text-sm text-night-text-soft transition-colors hover:text-night-text">
            Como funciona
          </a>
          <a href="#a-visao" className="text-sm text-night-text-soft transition-colors hover:text-night-text">
            A visão
          </a>
          <a href="#founder" className="text-sm text-night-text-soft transition-colors hover:text-night-text">
            Founder
          </a>
        </nav>

        <Link
          href="/conversa"
          className="rounded-lg bg-night-azure text-night-light-foreground px-3.5 py-1.5 text-xs font-medium shadow-[0_8px_20px_-8px_hsl(var(--l-azure)/0.5)] transition-colors hover:bg-night-mist sm:px-4 sm:py-2 sm:text-sm"
        >
          Ter a primeira conversa
        </Link>
      </div>
    </header>
  )
}