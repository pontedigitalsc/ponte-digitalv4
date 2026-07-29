import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AlertTriangle, TrendingUp, TrendingDown, Sparkles, ChevronRight } from 'lucide-react'
import type { SaidaAlertas, AlertaCognitivo } from '@/engine'

interface ProactiveAlertCardProps {
  alertas: SaidaAlertas
}

const URGENCIA_COR: Record<string, string> = {
  ALTA: 'border-l-red-500 bg-red-50/30 dark:bg-red-950/10',
  MEDIA: 'border-l-amber-500 bg-amber-50/30 dark:bg-amber-950/10',
  BAIXA: 'border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/10',
}

const URGENCIA_ICONE: Record<string, React.ReactNode> = {
  ALTA: <AlertTriangle className="h-4 w-4 text-red-500" />,
  MEDIA: <TrendingDown className="h-4 w-4 text-amber-500" />,
  BAIXA: <TrendingUp className="h-4 w-4 text-emerald-500" />,
}

export function ProactiveAlertCard({ alertas }: ProactiveAlertCardProps) {
  if (alertas.alertas.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Inteligência Proativa
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {alertas.alertas.filter(a => a.urgencia === 'ALTA').length} prioritário(s)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground rounded-lg bg-muted/50 p-2">
          <AlertTriangle className="h-3 w-3" />
          <span>{alertas.resumo}</span>
        </div>

        <div className="space-y-2">
          {alertas.alertas.map((alerta) => (
            <AlertaItem key={alerta.id} alerta={alerta} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AlertaItem({ alerta }: { alerta: AlertaCognitivo }) {
  return (
    <div className={cn('rounded-lg border-l-4 p-3 space-y-2', URGENCIA_COR[alerta.urgencia] ?? 'border-l-muted')}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0">{URGENCIA_ICONE[alerta.urgencia] ?? <AlertTriangle className="h-4 w-4" />}</span>
          <div className="min-w-0">
            <p className="text-sm font-medium leading-snug">{alerta.problema}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{alerta.impacto}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <span className={cn(
          'font-medium px-1.5 py-0.5 rounded',
          alerta.urgencia === 'ALTA' ? 'text-red-500 bg-red-50 dark:bg-red-950/20' :
          alerta.urgencia === 'MEDIA' ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' :
          'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
        )}>
          {alerta.urgencia === 'ALTA' ? 'Prioritário' : alerta.urgencia === 'MEDIA' ? 'Observar' : 'Informativo'}
        </span>
        <span>· Confiança: {Math.round(alerta.confianca)}%</span>
      </div>

      <div className="grid gap-1.5 text-xs">
        <div className="flex items-start gap-1.5">
          <ChevronRight className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
          <span className="text-muted-foreground">{alerta.caminhoSugerido}</span>
        </div>
        <p className="text-[10px] text-muted-foreground italic">Evidência: {alerta.evidencia}</p>
      </div>
    </div>
  )
}
