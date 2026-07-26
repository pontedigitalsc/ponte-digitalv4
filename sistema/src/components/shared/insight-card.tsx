import { Sparkles, AlertTriangle, TrendingUp, CheckSquare, Bot, Clock } from 'lucide-react'
import type { Insight } from '@/engine'
import { cn } from '@/lib/utils'

const ICONE_POR_TIPO: Record<string, typeof Sparkles> = {
  descoberta:    Bot,
  alerta:        AlertTriangle,
  confirmacao:   CheckSquare,
  aprendizado:   Bot,
  recomendacao:  Sparkles,
  impacto:       TrendingUp,
  atencao:       Clock,
  evolucao:      TrendingUp,
}

const COR_POR_PRIORIDADE = {
  alta:  'border-l-primary bg-primary/5',
  media: 'border-l-blue-400 bg-blue-50/50 dark:bg-blue-950/20',
  baixa: 'border-l-muted-foreground/30 bg-card',
} as const

export function InsightCard({ insight }: { insight: Insight }) {
  const Icon = ICONE_POR_TIPO[insight.tipo] ?? Sparkles
  const bordaCor = COR_POR_PRIORIDADE[insight.prioridade]

  return (
    <div className={cn('rounded-lg border-l-4 px-5 py-4', bordaCor)}>
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-snug">{insight.mensagem}</p>
            <span className={cn(
              'shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded',
              insight.prioridade === 'alta' && 'bg-destructive/10 text-destructive',
              insight.prioridade === 'media' && 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
              insight.prioridade === 'baixa' && 'bg-muted text-muted-foreground',
            )}>
              {insight.prioridade}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{insight.explicacao}</p>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
            <span>{insight.origem}</span>
            <span>·</span>
            <span>Confiança: {insight.confianca}%</span>
            <span>·</span>
            <span>{insight.categoria}</span>
          </div>
          {insight.acao && (
            <a
              href={insight.acao.href}
              className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary hover:underline"
            >
              {insight.acao.rotulo} →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
