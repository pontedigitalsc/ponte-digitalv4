interface ProgressBarProps {
  blocoAtual: number
  totalBlocos: number
  percentual: number
}

const BLOCO_ICONES = ['🧭', '⚙️', '🧠', '⚠️', '🎯']

export function ProgressBar({ blocoAtual, totalBlocos, percentual }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalBlocos }).map((_, i) => {
          const completo = i < blocoAtual
          const atual = i === blocoAtual - 1
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all ${
                  completo
                    ? 'bg-primary text-primary-foreground'
                    : atual
                    ? 'bg-primary/20 ring-2 ring-primary/40'
                    : 'bg-muted text-muted-foreground/40'
                }`}
              >
                {completo ? '✓' : BLOCO_ICONES[i]}
              </div>
            </div>
          )
        })}
      </div>

      <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${percentual}%` }}
        />
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {Math.min(blocoAtual, totalBlocos)} de {totalBlocos} blocos
      </p>
    </div>
  )
}
