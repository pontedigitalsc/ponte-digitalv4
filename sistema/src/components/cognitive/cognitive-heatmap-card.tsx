import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import type { MapaCalor } from '@/engine'

interface CognitiveHeatmapCardProps {
  mapa: MapaCalor
}

const INTENSIDADE_COR = (i: number) => {
  if (i >= 70) return 'bg-red-500 border-red-300 dark:border-red-800'
  if (i >= 50) return 'bg-orange-500 border-orange-300 dark:border-orange-800'
  if (i >= 30) return 'bg-amber-500 border-amber-300 dark:border-amber-800'
  if (i >= 15) return 'bg-yellow-400 border-yellow-300 dark:border-yellow-800'
  return 'bg-blue-400 border-blue-300 dark:border-blue-800'
}

const TENDENCIA_ICONE = (t: string) => {
  if (t === 'SUBINDO') return <TrendingUp className="h-3 w-3 text-emerald-500" />
  if (t === 'CAINDO') return <TrendingDown className="h-3 w-3 text-red-500" />
  return <span className="h-3 w-3 text-muted-foreground">&ndash;</span>
}

export function CognitiveHeatmapCard({ mapa }: CognitiveHeatmapCardProps) {
  if (mapa.areas.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          Mapa de Calor Cognitivo
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {mapa.mediaIntensidade}% média
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {mapa.areas.map((area) => (
            <div
              key={area.area}
              className={cn(
                'rounded-lg border p-2.5 space-y-1.5 transition-colors',
                area.intensidade >= 50 ? 'bg-red-50/50 dark:bg-red-950/10' : 'bg-card'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{area.area}</span>
                {TENDENCIA_ICONE(area.tendencia)}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', INTENSIDADE_COR(area.intensidade))}
                    style={{ width: `${area.intensidade}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">
                  {area.intensidade}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{area.evidencias} evidências</span>
                {area.confiancaMedia > 0 && (
                  <span>{area.confiancaMedia}% conf.</span>
                )}
                {area.alertas > 0 && (
                  <span className="flex items-center gap-0.5 text-amber-500">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    {area.alertas}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t">
          <span>Total: {mapa.totalEvidencias} evidências</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              {mapa.areaMaisQuente}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              {mapa.areaMaisFria}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
