import { useState, useEffect } from 'react'
import { CheckCircle2, Sparkles, Bot, ChevronRight, Loader2 } from 'lucide-react'

interface MicroReactionProps {
  reacao: string
  visivel: boolean
  tipo?: 'recebido' | 'processando' | 'insight' | 'completo'
  pipeline?: string[]
  pipelineAtual?: number
}

const ICONS = {
  recebido: CheckCircle2,
  processando: Sparkles,
  insight: Bot,
  completo: ChevronRight,
}

const COLORS = {
  recebido: 'border-emerald-200 dark:border-emerald-900 from-emerald-50/80 dark:from-emerald-950/20 text-emerald-600 dark:text-emerald-400',
  processando: 'border-blue-200 dark:border-blue-900 from-blue-50/80 dark:from-blue-950/20 text-blue-600 dark:text-blue-400',
  insight: 'border-amber-200 dark:border-amber-900 from-amber-50/80 dark:from-amber-950/20 text-amber-600 dark:text-amber-400',
  completo: 'border-primary/30 from-primary/5 text-primary',
}

function PipelineStep({ etapa, ativa, concluida }: { etapa: string; ativa: boolean; concluida: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-xs transition-all duration-300 ${concluida ? 'text-emerald-600 dark:text-emerald-400' : ativa ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground/50'}`}>
      {concluida ? (
        <CheckCircle2 className="h-3 w-3 shrink-0" />
      ) : ativa ? (
        <Loader2 className="h-3 w-3 shrink-0 animate-spin" />
      ) : (
        <div className="h-3 w-3 shrink-0 rounded-full border border-muted-foreground/30" />
      )}
      <span>{etapa}</span>
    </div>
  )
}

export function MicroReaction({ reacao, visivel, tipo = 'recebido', pipeline, pipelineAtual }: MicroReactionProps) {
  const [mostrarPipeline, setMostrarPipeline] = useState(false)

  useEffect(() => {
    if (tipo === 'processando' && pipeline && pipelineAtual !== undefined) {
      const t = setTimeout(() => setMostrarPipeline(true), 300)
      return () => clearTimeout(t)
    }
    setMostrarPipeline(false)
  }, [tipo, pipeline, pipelineAtual])

  if (!visivel) return null

  const Icon = ICONS[tipo]

  return (
    <div className={`rounded-lg border bg-gradient-to-r px-4 py-3 text-sm leading-relaxed animate-scale-in ${COLORS[tipo]}`}>
      <div className="flex items-start gap-2">
        <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${tipo === 'processando' ? 'animate-pulse' : ''}`} />
        <div className="space-y-1 flex-1">
          <span className="text-muted-foreground">{reacao}</span>
          {mostrarPipeline && pipeline && (
            <div className="space-y-1 pt-2 border-t border-muted-foreground/10">
              {pipeline.map((etapa, i) => (
                <PipelineStep
                  key={etapa}
                  etapa={etapa}
                  ativa={i === pipelineAtual}
                  concluida={i < (pipelineAtual ?? 0)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
