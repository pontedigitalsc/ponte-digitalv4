import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, ChevronRight } from 'lucide-react'
import type { ProximoNivel } from '@/engine'

interface NextLevelCardProps {
  proximoNivel: ProximoNivel | null
}

export function NextLevelCard({ proximoNivel }: NextLevelCardProps) {
  if (!proximoNivel) return null

  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className="bg-gradient-to-br from-amber-50/30 to-white dark:from-amber-950/10 dark:to-slate-950 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-amber-500" />
          <p className="text-sm font-semibold">Seu próximo salto</p>
        </div>

        <div>
          <p className="text-[10px] font-medium text-muted-foreground">Capacidade a desenvolver</p>
          <p className="text-lg font-bold text-foreground">{proximoNivel.capacidade}</p>
        </div>

        {proximoNivel.motivo.length > 0 && (
          <div className="space-y-0.5">
            <p className="text-[10px] font-medium text-muted-foreground">Porque</p>
            {proximoNivel.motivo.map((m: string, i: number) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <ChevronRight className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-lg bg-emerald-50/50 dark:bg-emerald-950/10 p-2.5">
          <p className="text-[10px] font-medium text-emerald-500">Impacto esperado</p>
          <p className="text-xs text-muted-foreground">{proximoNivel.impactoEsperado}</p>
        </div>
      </div>
    </Card>
  )
}
