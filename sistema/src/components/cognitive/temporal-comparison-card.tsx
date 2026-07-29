import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Clock } from 'lucide-react'
import type { ComparacaoTemporal } from '@/engine'

interface TemporalComparisonCardProps {
  comparacoes: ComparacaoTemporal[]
}

export function TemporalComparisonCard({ comparacoes }: TemporalComparisonCardProps) {
  if (comparacoes.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-indigo-500" />
          Inteligência Comparativa
          <span className="ml-auto text-xs text-muted-foreground font-normal">Hoje vs. Período anterior</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {comparacoes.map((comp, i) => {
          const isPositive = comp.variacao.startsWith('+')
          const isNegative = comp.variacao.startsWith('-')
          return (
            <div key={i} className="flex items-center justify-between rounded-lg border p-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium">{comp.indicador}</p>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                  <span>{comp.antes}</span>
                  <TrendingUp className="h-2.5 w-2.5" />
                  <span className="text-emerald-500">{comp.depois}</span>
                </div>
              </div>
              <span className={cn(
                'flex items-center gap-0.5 text-xs font-medium shrink-0 ml-2',
                isPositive ? 'text-emerald-500' : isNegative ? 'text-red-500' : 'text-muted-foreground'
              )}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : isNegative ? <TrendingDown className="h-3 w-3" /> : null}
                {comp.variacao}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
