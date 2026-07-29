interface CapacidadeCardProps {
  nome: string
  score: number
  descricao: string
  impactoAtual: string
  comoDesenvolver: string | null
}

export function CapacidadeCard({ nome, score, descricao, impactoAtual, comoDesenvolver }: CapacidadeCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Capacidade Prioritária</h3>

      <div>
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-semibold">{nome}</p>
          <span className="text-sm text-muted-foreground">{score}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${score}%` }} />
        </div>
      </div>

      <p className="text-sm leading-relaxed text-card-foreground/80">{descricao}</p>

      <div className="rounded-lg bg-primary/5 p-3">
        <p className="text-xs text-muted-foreground mb-1">Impacto atual</p>
        <p className="text-sm leading-relaxed">{impactoAtual}</p>
      </div>

      {comoDesenvolver && (
        <div className="rounded-lg bg-emerald-500/5 p-3">
          <p className="text-xs text-muted-foreground mb-1">Como desenvolver</p>
          <p className="text-sm leading-relaxed text-emerald-700 dark:text-emerald-400">{comoDesenvolver}</p>
        </div>
      )}
    </div>
  )
}
