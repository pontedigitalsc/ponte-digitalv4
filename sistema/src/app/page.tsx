import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg text-center space-y-10 relative">
        {/* Identidade */}
        <div className="space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-lg shadow-primary/20">
            <span className="text-xl font-bold text-primary-foreground">P</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A Ponte Digital
          </p>
        </div>

        {/* Proposta */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold tracking-tight leading-snug">
            A melhor conversa que você já teve<br />sobre sua própria empresa
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Não somos um sistema de gestão. Somos uma companhia que ajuda você a enxergar sua empresa com mais clareza — uma conversa de cada vez.
          </p>
        </div>

        {/* Dois caminhos */}
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            Como deseja começar?
          </p>
          <Link
            href="/api/sessao/iniciar"
            prefetch={false}
            className="block w-full rounded-xl bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
          >
            Quero entender melhor minha empresa
          </Link>
          <Link
            href="/criar-conta"
            className="block w-full rounded-xl border border-border bg-card px-6 py-4 text-sm text-foreground hover:bg-muted/50 transition-colors"
          >
            Quero ser Founder
          </Link>
          <Link
            href="/login"
            className="block w-full rounded-xl border border-border bg-card px-6 py-4 text-sm text-foreground hover:bg-muted/50 transition-colors"
          >
            Conhecer a Ponte
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Gratuito. Confidencial. Leva alguns minutos.
        </p>
      </div>
    </div>
  )
}
