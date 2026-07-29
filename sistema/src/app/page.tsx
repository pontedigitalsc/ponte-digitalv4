import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4 relative overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md text-center space-y-8 relative">
        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-lg shadow-primary/20 animate-fade-in">
            <span className="text-2xl font-bold text-primary-foreground">P</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight animate-slide-up">
            A inteligência da sua empresa
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-sm mx-auto animate-slide-up">
            Responda 5 perguntas sobre seu negócio.<br />
            Descubra o que está passando despercebido.
          </p>
        </div>

        <div className="animate-fade-in">
          <Link
            href="/api/sessao/iniciar"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-10 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97] transition-all duration-200"
          >
            Descobrir agora
          </Link>
        </div>

        <div className="space-y-3 animate-fade-in">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Shield className="h-3 w-3" />
            Gratuito. Sem cadastro. Protegido pela LGPD.
          </p>
          <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">✦ Diagnóstico gratuito</span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1">🔒 Dados protegidos</span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1">⚡ 5 minutos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
