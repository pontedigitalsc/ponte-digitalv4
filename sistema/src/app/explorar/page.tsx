import { requireUser } from '@/lib/auth'
import { montarContextoCenario, gerarCenarios } from '@/engine/cenario-engine'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'

export const metadata = { title: 'Explorar Cenários' }

export default async function ExplorarPage() {
  const usuario = await requireUser()

  const contexto = await montarContextoCenario(usuario.empresaId)
  const exploracao = gerarCenarios(contexto)

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in py-8">
      <div className="text-center space-y-4">
        <AvatarPonte state="thinking" size="lg" />
        <h1 className="text-2xl font-semibold tracking-tight">Explorar cenários</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Não é uma previsão. É uma simulação estratégica — uma forma de pensar antes de decidir.
        </p>
      </div>

      <div className="space-y-4">
        {exploracao.cenarios.map((c) => (
          <div key={c.id} className="rounded-xl border bg-card p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                Como seria se...
              </p>
              <h2 className="text-lg font-semibold tracking-tight">{c.pergunta}</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.mudaria}</p>
            <div className="space-y-2 border-l-2 border-primary/30 pl-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">O que mudaria para observar:</span> {c.observacao}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Risco a observar:</span> {c.risco}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground italic leading-relaxed">
        {exploracao.aviso}
      </p>

      <div className="text-center">
        <Link
          href="/conversa"
          className="inline-block rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Quero continuar essa conversa
        </Link>
      </div>
    </div>
  )
}
