import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckSquare, Sparkles, AlertTriangle, TrendingUp } from 'lucide-react'
import type { Narrativa } from '@/engine'

interface CognitiveCommunicationCardProps {
  narrativa: Narrativa
  notificationsCount: number
  insightsCount: number
}

const TOM_ROTULO: Record<string, { label: string; descricao: string; cor: string }> = {
  descoberta: { label: 'Descoberta', descricao: 'Linguagem de exploração e novidade', cor: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50' },
  alerta: { label: 'Alerta', descricao: 'Linguagem direta e urgente', cor: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50' },
  evolucao: { label: 'Evolução', descricao: 'Linguagem de progresso e crescimento', cor: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50' },
  inicio: { label: 'Início', descricao: 'Linguagem acolhedora e introdutória', cor: 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/50' },
  continuidade: { label: 'Continuidade', descricao: 'Linguagem de consistência e hábito', cor: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/50' },
}

export function CognitiveCommunicationCard({ narrativa, notificationsCount, insightsCount }: CognitiveCommunicationCardProps) {
  const tom = TOM_ROTULO[narrativa.tom] ?? TOM_ROTULO.descoberta

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CheckSquare className="h-4 w-4 text-indigo-500" />
          Comunicação Cognitiva
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-lg border bg-muted/30 p-3 space-y-1.5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Tom da comunicação hoje
          </p>
          <div className="flex items-center gap-2">
            <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', tom.cor)}>
              {tom.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{tom.descricao}</p>
          <p className="text-xs text-foreground/80 leading-relaxed border-t pt-1.5 mt-1.5">
            &ldquo;{narrativa.texto}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded bg-muted/30 p-2 space-y-0.5">
            <Sparkles className="h-3 w-3 mx-auto text-indigo-400" />
            <p className="font-semibold">{insightsCount}</p>
            <p className="text-muted-foreground">Insights</p>
          </div>
          <div className="rounded bg-muted/30 p-2 space-y-0.5">
            <AlertTriangle className="h-3 w-3 mx-auto text-amber-400" />
            <p className="font-semibold">{notificationsCount}</p>
            <p className="text-muted-foreground">Notificações</p>
          </div>
          <div className="rounded bg-muted/30 p-2 space-y-0.5">
            <TrendingUp className="h-3 w-3 mx-auto text-emerald-400" />
            <p className="font-semibold">{narrativa.tom}</p>
            <p className="text-muted-foreground">Tom ativo</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
