import { ExternalLink, Plus, RefreshCw, Settings, Eye, ChevronRight } from 'lucide-react'
import type { ExperienceAction } from '@/engine'
import { cn } from '@/lib/utils'

const ICONE_POR_TIPO: Record<string, typeof ExternalLink> = {
  abrir: ExternalLink,
  criar: Plus,
  executar: RefreshCw,
  corrigir: Settings,
  acompanhar: Eye,
}

const COR_POR_PRIORIDADE = {
  alta:  'border-l-primary',
  media: 'border-l-blue-400',
  baixa: 'border-l-muted-foreground/30',
} as const

export function ActionCard({ action }: { action: ExperienceAction }) {
  const Icon = ICONE_POR_TIPO[action.tipo] ?? ExternalLink
  const bordaCor = COR_POR_PRIORIDADE[action.prioridade]

  return (
    <div className={cn('rounded-lg border-l-4 bg-card px-4 py-3', bordaCor)}>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium leading-snug">{action.titulo}</p>
            <span className={cn(
              'shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded',
              action.prioridade === 'alta' && 'bg-destructive/10 text-destructive',
              action.prioridade === 'media' && 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
              action.prioridade === 'baixa' && 'bg-muted text-muted-foreground',
            )}>
              {action.prioridade}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{action.descricao}</p>
        </div>
        {action.href && (
          <a
            href={action.href}
            className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {action.titulo}
            <ChevronRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  )
}
