import Link from 'next/link'

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-foreground">
          <span aria-hidden="true" className="text-base leading-none text-primary">✦</span>
          Ponte Digital
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#como-funciona" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Como funciona
          </a>
          <a href="#a-ponte" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            A Ponte
          </a>
          <a href="#founder" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Founder
          </a>
        </nav>

        <Link
          href="/conversa"
          className="rounded-lg bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:px-4 sm:py-2 sm:text-sm"
        >
          Ter a primeira conversa
        </Link>
      </div>
    </header>
  )
}
