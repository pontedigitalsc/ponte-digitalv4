import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <span className="text-2xl font-bold text-primary-foreground">P</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Cansou de planilha?
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Responda 5 perguntas sobre seu negócio e descubra o que está passando despercebido.
          </p>
        </div>

        <Link
          href="/api/sessao/iniciar"
          prefetch={false}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-10 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
        >
          Descobrir agora
        </Link>

        <p className="text-xs text-muted-foreground">
          Gratuito. Sem cadastro. Seus dados estao seguros.
        </p>
      </div>
    </div>
  )
}
