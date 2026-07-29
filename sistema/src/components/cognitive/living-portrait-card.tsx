import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, AlertTriangle, Sparkles, Clock, CheckCircle2 } from 'lucide-react'
import type { RetratoVivo } from '@/engine'

interface LivingPortraitCardProps {
  retrato: RetratoVivo
}

export function LivingPortraitCard({ retrato }: LivingPortraitCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Retrato Vivo da Empresa
          </span>
        </div>

        <p className="text-sm text-foreground leading-relaxed">{retrato.identidade}</p>

        {retrato.forcas.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Forças
            </p>
            <div className="flex flex-wrap gap-1.5">
              {retrato.forcas.map((f: string, i: number) => (
                <span key={i} className="text-[10px] text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/50">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {retrato.riscos.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Riscos
            </p>
            <div className="flex flex-wrap gap-1.5">
              {retrato.riscos.map((r: string, i: number) => (
                <span key={i} className="text-[10px] text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/50">
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-3">
          <Clock className="h-3 w-3" />
          <span>{retrato.ultimos90Dias}</span>
        </div>
      </div>
    </Card>
  )
}
