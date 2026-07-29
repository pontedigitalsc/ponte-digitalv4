interface CapitalCardProps {
  score: number
  scoreAnterior: number | null
  variacao: number
  nivel: string
  explicacao: string
  comportamentoQueGerou: string | null
  comoContinuarEvoluindo: string | null
}

export function CapitalCard({ score, scoreAnterior, variacao, nivel, explicacao, comportamentoQueGerou, comoContinuarEvoluindo }: CapitalCardProps) {
  const tendenciaPositiva = variacao >= 0
  const pct = Math.min(score / 1000 * 100, 100)

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Capital Cognitivo</h3>

      <div className="flex items-end gap-3">
        <div>
          <p className="text-3xl font-bold tracking-tight">{score}</p>
          <p className="text-xs text-muted-foreground">/{'1000'} · {nivel}</p>
        </div>
        {scoreAnterior !== null && (
          <div className={`flex items-center gap-1 text-sm font-medium mb-1.5 ${tendenciaPositiva ? 'text-emerald-500' : 'text-red-500'}`}>
            <span>{tendenciaPositiva ? '↑' : '↓'}</span>
            <span>{Math.abs(variacao).toFixed(0)}</span>
          </div>
        )}
      </div>

      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>

      <p className="text-sm leading-relaxed text-card-foreground/80">{explicacao}</p>

      {comportamentoQueGerou && (
        <div className="rounded-lg bg-primary/5 p-3">
          <p className="text-xs text-muted-foreground mb-1">O que gerou essa mudança</p>
          <p className="text-sm leading-relaxed">{comportamentoQueGerou}</p>
        </div>
      )}

      {comoContinuarEvoluindo && (
        <div className="rounded-lg bg-emerald-500/5 p-3">
          <p className="text-xs text-muted-foreground mb-1">Como continuar evoluindo</p>
          <p className="text-sm leading-relaxed text-emerald-700 dark:text-emerald-400">{comoContinuarEvoluindo}</p>
        </div>
      )}
    </div>
  )
}
