import { Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Sun, TrendingUp, AlertTriangle, Clock, Sparkles, CheckSquare } from 'lucide-react'
import type { CognitiveBriefing } from '@/engine'

const iconePonto: Record<string, React.ReactNode> = {
  evolucao: <TrendingUp className="h-4 w-4 text-emerald-500" />,
  alerta: <AlertTriangle className="h-4 w-4 text-red-500" />,
  pendencia: <Clock className="h-4 w-4 text-amber-500" />,
  aprendizado: <Sparkles className="h-4 w-4 text-blue-500" />,
  conquista: <TrendingUp className="h-4 w-4 text-purple-500" />,
}

const corPonto: Record<string, string> = {
  evolucao: 'border-l-emerald-500',
  alerta: 'border-l-red-500',
  pendencia: 'border-l-amber-500',
  aprendizado: 'border-l-blue-500',
  conquista: 'border-l-purple-500',
}

interface BriefingCardProps {
  briefing: CognitiveBriefing | null
}

export function BriefingCard({ briefing }: BriefingCardProps) {
  if (!briefing) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sun className="h-4 w-4 text-amber-500" />
          {briefing.saudacao}
          <span className="text-xs font-normal text-muted-foreground ml-auto">{briefing.data}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {briefing.prioridadePrincipal && (
          <p className="text-sm font-medium text-foreground">{briefing.prioridadePrincipal}</p>
        )}
        {briefing.evolucaoRecente && (
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-4 w-4" />
            <span>{briefing.evolucaoRecente}</span>
          </div>
        )}
        {briefing.acoesPendentes > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckSquare className="h-4 w-4" />
            <span>{briefing.acoesPendentes} ação(ns) pendente(s)</span>
          </div>
        )}
        <Separator />
        <div className="space-y-2">
          {briefing.pontos.map((ponto, i) => (
            <div key={i} className={cn('flex items-start gap-3 border-l-4 p-2 rounded-r-lg bg-muted/30', corPonto[ponto.tipo] ?? 'border-l-muted')}>
              <span className="mt-0.5 shrink-0">{iconePonto[ponto.tipo]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{ponto.mensagem}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{ponto.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
