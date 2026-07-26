import { RefreshCw, ChevronRight, CheckSquare, Eye, TrendingUp } from 'lucide-react'
import type { Journey } from '@/engine'
import { cn } from '@/lib/utils'

function renderStepIcon(tipo: Journey['etapas'][number]['tipo'], concluido: boolean) {
  if (concluido) return <CheckSquare className="h-4 w-4 text-emerald-500 shrink-0" />
  if (tipo === 'resultado') return <Eye className="h-4 w-4 text-blue-500 shrink-0" />
  if (tipo === 'aprendizado') return <TrendingUp className="h-4 w-4 text-purple-500 shrink-0" />
  return <div className="h-2 w-2 rounded-full bg-muted-foreground/40 shrink-0" />
}

export function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <div className="rounded-lg border bg-card px-5 py-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <RefreshCw className="h-4 w-4 text-muted-foreground shrink-0" />
          <p className="text-sm font-semibold truncate">{journey.titulo}</p>
        </div>
        <span className={cn(
          'shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded',
          journey.prioridade === 'alta' && 'bg-destructive/10 text-destructive',
          journey.prioridade === 'media' && 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
          journey.prioridade === 'baixa' && 'bg-muted text-muted-foreground',
        )}>
          {journey.prioridade}
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-3">{journey.descricao}</p>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', journey.progresso >= 100 ? 'bg-emerald-500' : 'bg-primary')}
            style={{ width: `${journey.progresso}%` }}
          />
        </div>
        <span className="text-xs font-medium shrink-0 tabular-nums">{journey.progresso}%</span>
      </div>

      <div className="space-y-1.5 mb-3">
        {journey.etapas.map((etapa) => (
          <div key={etapa.id} className="flex items-center gap-2 text-xs">
            {renderStepIcon(etapa.tipo, etapa.concluido)}
            <span className={cn(
              'truncate',
              etapa.concluido ? 'text-muted-foreground line-through' : 'text-foreground',
            )}>
              {etapa.titulo}
            </span>
            {etapa.concluido && (
              <span className="text-[10px] text-emerald-600 font-medium shrink-0">✔</span>
            )}
          </div>
        ))}
      </div>

      {journey.previsao && (
        <div className="rounded-md bg-muted/50 px-3 py-2 text-xs space-y-1">
          <p className="font-medium text-muted-foreground">Previsão</p>
          <p><span className="text-muted-foreground">Impacto:</span> {journey.previsao.impactoEsperado}</p>
          <p><span className="text-muted-foreground">Métrica:</span> {journey.previsao.metrica}</p>
          <p><span className="text-muted-foreground">Revisão:</span> {journey.previsao.prazoRevisao}</p>
        </div>
      )}

      {journey.etapas.find(e => !e.concluido && e.etapaWorkflowId) && (
        <a
          href={journey.etapas.find(e => !e.concluido && e.etapaWorkflowId)?.etapaWorkflowId ? '#' : '#'}
          className="mt-3 inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Continuar
          <ChevronRight className="h-3 w-3" />
        </a>
      )}
    </div>
  )
}
