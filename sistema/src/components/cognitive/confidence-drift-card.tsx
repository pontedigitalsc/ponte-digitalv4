import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react'
import type { ConfidenceDrift } from '@/engine'

interface ConfidenceDriftCardProps {
  confidenceDrift: ConfidenceDrift[]
}

export function ConfidenceDriftCard({ confidenceDrift }: ConfidenceDriftCardProps) {
  if (!confidenceDrift.length) return null

  const driftsCriticos = confidenceDrift.filter(d => d.variacao <= -20)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingDown className="h-4 w-4 text-red-500" />
          Variação de certeza
          {driftsCriticos.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-red-500 ml-auto">
              <AlertTriangle className="h-3 w-3" /> {driftsCriticos.length} variações
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {confidenceDrift.map((d, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
              <div className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full shrink-0',
                d.variacao <= -20
                  ? 'bg-red-100'
                  : d.variacao <= -5
                    ? 'bg-amber-100'
                    : d.variacao >= 5
                      ? 'bg-emerald-100'
                      : 'bg-muted'
              )}>
                {d.variacao <= -5 ? (
                  <TrendingDown className={cn(
                    'h-4 w-4',
                    d.variacao <= -20 ? 'text-red-500' : 'text-amber-500'
                  )} />
                ) : d.variacao >= 5 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                ) : (
                  <span className="h-4 w-4 text-muted-foreground">&ndash;</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{d.descricao}</p>
                <p className="text-xs text-muted-foreground">
                  {d.categoria && `${d.categoria} · `}
                  Variação de {Math.abs(d.variacao)}%
                </p>
              </div>
              <span className={cn(
                'shrink-0 text-xs font-medium px-2 py-0.5 rounded-full',
                d.variacao <= -20
                  ? 'bg-red-100 text-red-700'
                  : d.variacao <= -5
                    ? 'bg-amber-100 text-amber-700'
                    : d.variacao >= 5
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-muted text-muted-foreground'
              )}>
                {d.variacao > 0 ? '+' : ''}{d.variacao}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
