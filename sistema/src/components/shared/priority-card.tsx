import { TrendingUp } from 'lucide-react'

interface PriorityCardProps {
  icone?: React.ReactNode
  titulo: string
  descricao: string
  acao?: { rotulo: string; href: string }
}

export function PriorityCard({ icone, titulo, descricao, acao }: PriorityCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm space-y-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          {icone ?? <TrendingUp className="h-4 w-4 text-primary" />}
        </div>
        <div className="space-y-1 min-w-0">
          <h4 className="text-sm font-semibold leading-tight">{titulo}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{descricao}</p>
        </div>
      </div>
      {acao && (
        <a
          href={acao.href}
          className="inline-flex items-center gap-1 rounded-md bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          {acao.rotulo}
        </a>
      )}
    </div>
  )
}
