import { CheckSquare, ChevronRight, RefreshCw } from 'lucide-react'
import type { CognitiveWorkflow } from '@/engine'
import { cn } from '@/lib/utils'

export function WorkflowCard({ workflow }: { workflow: CognitiveWorkflow }) {
  const etapaAtual = workflow.etapas.find(e => !e.concluido)
  const progressoLabel = workflow.concluido
    ? 'Concluído'
    : `${etapaAtual ? etapaAtual.titulo : '—'}`

  return (
    <div className="rounded-lg border bg-card px-5 py-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <RefreshCw className="h-4 w-4 text-muted-foreground shrink-0" />
          <p className="text-sm font-semibold truncate">{workflow.titulo}</p>
        </div>
        <span className={cn(
          'shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded',
          workflow.prioridade === 'alta' && 'bg-destructive/10 text-destructive',
          workflow.prioridade === 'media' && 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
          workflow.prioridade === 'baixa' && 'bg-muted text-muted-foreground',
        )}>
          {workflow.prioridade}
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{workflow.descricao}</p>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              workflow.concluido ? 'bg-emerald-500' : 'bg-primary',
            )}
            style={{ width: `${workflow.progresso}%` }}
          />
        </div>
        <span className="text-xs font-medium shrink-0 tabular-nums">{workflow.progresso}%</span>
      </div>

      {etapaAtual && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <CheckSquare className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{etapaAtual.titulo}</span>
        </div>
      )}

      {etapaAtual?.href && (
        <a
          href={etapaAtual.href}
          className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Continuar
          <ChevronRight className="h-3 w-3" />
        </a>
      )}
    </div>
  )
}
