interface ProximoSaltoCardProps {
  titulo: string | null
  descricao: string | null
  impacto: string | null
  confianca: number | null
}

export function ProximoSaltoCard({ titulo, descricao, impacto, confianca }: ProximoSaltoCardProps) {
  if (!titulo) {
    return (
      <div className="rounded-xl border bg-card p-6 space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Próximo Salto</h3>
        <p className="text-sm text-muted-foreground/60">Complete seu diagnóstico para receber sua primeira recomendação.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Próximo Salto</h3>

      <div className="space-y-3">
        <p className="text-base font-semibold leading-snug">{titulo}</p>
        {descricao && <p className="text-sm leading-relaxed text-card-foreground/80">{descricao}</p>}
      </div>

      {impacto && (
        <div className="rounded-lg bg-primary/5 p-3">
          <p className="text-xs text-muted-foreground mb-0.5">Impacto esperado</p>
          <p className="text-sm font-medium">{impacto}</p>
        </div>
      )}

      {confianca !== null && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Confiança</span>
          <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${confianca * 100}%` }} />
          </div>
          <span>{Math.round(confianca * 100)}%</span>
        </div>
      )}
    </div>
  )
}
