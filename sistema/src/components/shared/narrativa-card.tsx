import type { Narrativa } from '@/engine'
import { Sparkles, AlertTriangle, TrendingUp, Bot, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

const TOM_CONFIG: Record<string, { icone: typeof Sparkles; cor: string }> = {
  descoberta:    { icone: Bot,           cor: 'border-l-blue-400 bg-blue-50/50 dark:bg-blue-950/20' },
  alerta:        { icone: AlertTriangle, cor: 'border-l-amber-400 bg-amber-50/50 dark:bg-amber-950/20' },
  evolucao:      { icone: TrendingUp,    cor: 'border-l-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' },
  inicio:        { icone: Sparkles,      cor: 'border-l-primary bg-primary/5' },
  continuidade:  { icone: RefreshCw,     cor: 'border-l-muted-foreground/30 bg-card' },
}

export function NarrativaCard({ narrativa }: { narrativa: Narrativa }) {
  const config = TOM_CONFIG[narrativa.tom] ?? TOM_CONFIG.continuidade
  const Icon = config.icone

  return (
    <div className={cn('rounded-lg border-l-4 px-5 py-4', config.cor)}>
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            {narrativa.titulo}
          </p>
          <p className="text-sm leading-relaxed">{narrativa.texto}</p>
        </div>
      </div>
    </div>
  )
}
