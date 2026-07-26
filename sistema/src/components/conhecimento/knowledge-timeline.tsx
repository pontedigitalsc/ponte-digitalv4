import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Sparkles, CheckCircle2, AlertTriangle, Circle, TrendingUp } from 'lucide-react'
import type { TimelineEvent } from '@/engine'
import { CATEGORIA_EVIDENCIA } from '@/constants'

interface KnowledgeTimelineProps {
  events: TimelineEvent[]
}

const ICONE_TIPO: Record<string, React.ReactNode> = {
  descoberta: <Sparkles className="h-3.5 w-3.5 text-violet-500" />,
  confirmacao: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
  mudanca: <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />,
  descarte: <Circle className="h-3.5 w-3.5 text-red-500" />,
  evolucao: <TrendingUp className="h-3.5 w-3.5 text-blue-500" />,
}

const ROTULO_TIPO: Record<string, string> = {
  descoberta: 'Descoberta',
  confirmacao: 'Confirmação',
  mudanca: 'Mudança',
  descarte: 'Descarte',
  evolucao: 'Evolução',
}

export function KnowledgeTimeline({ events }: KnowledgeTimelineProps) {
  if (!events.length) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Linha do tempo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {events.map((event) => {
            const icone = ICONE_TIPO[event.tipo] ?? <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            const rotulo = ROTULO_TIPO[event.tipo] ?? event.tipo
            const categoriaLabel = CATEGORIA_EVIDENCIA[event.categoria]?.label ?? event.categoria
            const data = event.data ? new Date(event.data).toLocaleDateString('pt-BR') : ''

            return (
              <div key={event.id} className="flex gap-3 pb-3 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                    {icone}
                  </div>
                  {events.indexOf(event) < events.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium">{rotulo}</span>
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{categoriaLabel}</span>
                    {data && <span className="text-[10px] text-muted-foreground">{data}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{event.descricao}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
