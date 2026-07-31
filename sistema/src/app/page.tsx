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
          <p className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            Ponte Digital
          </p>
        </div>

        {/* Proposta — dor invisível do empresário */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight leading-snug">
            O peso invisível de administrar uma empresa
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Você toma centenas de decisões carregando dúvidas que ninguém vê. Mas toda empresa deixa sinais. A Ponte ajuda você a enxergar esses sinais.
          </p>
        </div>

        {/* CTA único — diagnóstico sem cadastro */}
        <div className="space-y-3">
          <Link
            href="/diagnostico"
            className="block w-full rounded-xl bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
          >
            Entender minha empresa
          </Link>
          <Link
            href="/login"
            className="block w-full rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Já tenho conta
          </Link>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
          Gratuito. Confidencial. Sem cadastro. Leva menos de 3 minutos.
        </p>
      </div>
    </div>
  )
}
