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

        {/* Proposta — FASE 1: dor do empresário */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight leading-snug">
            Administrar uma empresa significa tomar centenas de decisões todos os dias.
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Mas quase ninguém tem um lugar para pensar sobre essas decisões. A Ponte é esse lugar.
          </p>
        </div>

        {/* CTA único — Primeira Sessão Estratégica, sem cadastro */}
        <div className="space-y-3">
          <Link
            href="/diagnostico"
            className="block w-full rounded-xl bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
          >
            Iniciar minha Primeira Sessão Estratégica
          </Link>
          <Link
            href="/login"
            className="block w-full rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Já tenho conta
          </Link>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Em alguns minutos vamos entender sua empresa e mostrar o que merece atenção. Gratuito. Confidencial. Sem cadastro.
        </p>
      </div>
    </div>
  )
}
