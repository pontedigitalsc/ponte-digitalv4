import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, BarChart3 } from 'lucide-react'
import type { CurvaEvolutiva } from '@/engine'

interface EvolutionCurveCardProps {
  curva: CurvaEvolutiva
}

export function EvolutionCurveCard({ curva }: EvolutionCurveCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-4 w-4 text-indigo-500" />
          Curva Evolutiva
          <span className={cn(
            'ml-auto text-xs font-medium px-1.5 py-0.5 rounded-full',
            curva.tendenciaGeral === 'SUBINDO' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' :
            curva.tendenciaGeral === 'CAINDO' ? 'text-red-500 bg-red-50 dark:bg-red-950/20' :
            'text-muted-foreground bg-muted/50'
          )}>
            {curva.tendenciaGeral === 'SUBINDO' ? 'Evoluindo' : curva.tendenciaGeral === 'CAINDO' ? 'Atenção' : 'Estável'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-7 gap-1 items-end h-32">
          {curva.pontos.map((ponto, i) => {
            const media = Object.values(ponto.capacidades).reduce((s, v) => s + v, 0) / Object.values(ponto.capacidades).length
            return (
              <div key={i} className="flex flex-col items-center gap-1 group relative cursor-pointer">
                <div className="relative w-full">
                  <div
                    className="w-full rounded-t bg-indigo-400/60 dark:bg-indigo-500/40 transition-all"
                    style={{ height: `${(media / 100) * 100}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border text-popover-foreground text-[9px] px-2 py-1 rounded shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {ponto.narrativa.fase} — {Math.round(media)}%
                  </div>
                </div>
                <span className="text-[8px] text-muted-foreground whitespace-nowrap">{ponto.label}</span>
              </div>
            )
          })}
        </div>

        <div className="space-y-3 border-t border-border/40 pt-3">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Narrativa</p>
          {curva.pontos.slice(1).map((ponto, i) => {
            const media = Object.values(ponto.capacidades).reduce((s, v) => s + v, 0) / Object.values(ponto.capacidades).length
            return (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center mt-0.5">
                  <div className={cn('w-2 h-2 rounded-full', media >= 50 ? 'bg-emerald-500' : media >= 25 ? 'bg-amber-500' : 'bg-red-500')} />
                  {i < 5 && <div className="w-px h-5 bg-border" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold">{ponto.narrativa.fase}</p>
                    <span className="text-[9px] text-muted-foreground">({ponto.mes})</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{ponto.narrativa.descricao}</p>
                </div>
                <span className={cn('text-[10px] font-medium shrink-0', media >= 50 ? 'text-emerald-500' : 'text-amber-500')}>
                  {Math.round(media)}%
                </span>
              </div>
            )
          })}
        </div>

        {curva.maiorEvolucao.variacao > 0 && (
          <div className="flex items-center gap-2 text-xs text-emerald-500 border-t border-border/40 pt-3">
            <TrendingUp className="h-3 w-3" />
            <span>Maior evolução: {curva.maiorEvolucao.capacidade} (+{curva.maiorEvolucao.variacao})</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
