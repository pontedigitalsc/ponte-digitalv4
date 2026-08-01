interface ProgressBarProps {
  blocoAtual: number
  totalBlocos: number
  percentual: number
}

export function ProgressBar({ percentual }: ProgressBarProps) {
  return (
    <div className="mx-auto w-40">
      <div className="h-0.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary/50 transition-all duration-700 ease-out"
          style={{ width: `${Math.min(Math.max(percentual, 4), 100)}%` }}
        />
      </div>
    </div>
  )
}
