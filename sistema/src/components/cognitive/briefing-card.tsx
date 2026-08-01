import { Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Sun, TrendingUp, AlertTriangle, Clock, Sparkles, CheckSquare, ChevronRight } from 'lucide-react'
import type { CognitiveBriefing } from '@/engine'
import { CATEGORIA_EVIDENCIA } from '@/constants'

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
          Sua semana
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground italic">{briefing.saudacao}</p>
        <p className="text-xs text-muted-foreground">{briefing.data}</p>

        {briefing.prioridadePrincipal && (
          <div className="rounded-lg border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/10 p-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 mb-0.5">
              <TrendingUp className="h-3 w-3" />
              Maior evolução
            </div>
            <p className="text-xs text-muted-foreground">{briefing.prioridadePrincipal}</p>
          </div>
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
            <span>Há {briefing.acoesPendentes} coisa{briefing.acoesPendentes !== 1 ? 's' : ''} para acompanhar</span>
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          {briefing.pontos.map((ponto, i) => (
            <div key={i} className={cn('flex items-start gap-3 border-l-4 p-2 rounded-r-lg bg-muted/30', corPonto[ponto.tipo] ?? 'border-l-muted')}>
              <span className="mt-0.5 shrink-0">{iconePonto[ponto.tipo]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{ponto.mensagem}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{CATEGORIA_EVIDENCIA[ponto.categoria]?.label ?? ponto.categoria}</p>
              </div>
            </div>
          ))}
        </div>

        {briefing.acoesPendentes > 0 && (
          <Separator />
        )}

        {briefing.acoesPendentes > 0 && (
          <div className="rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/10 p-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-400 mb-0.5">
              <ChevronRight className="h-3 w-3" />
              Próximo passo
            </div>
            <p className="text-xs text-muted-foreground">Vamos revisar isso em 30 dias</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
