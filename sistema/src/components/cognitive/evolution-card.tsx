import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Sparkles, AlertTriangle } from 'lucide-react'
import type { CognitiveEvolution } from '@/engine'

const tendenciaIcone = (tendencia: string) => {
  if (tendencia === 'SUBINDO') return <TrendingUp className="h-4 w-4 text-emerald-500" />
  if (tendencia === 'CAINDO') return <TrendingDown className="h-4 w-4 text-red-500" />
  return <span className="h-4 w-4 text-muted-foreground">&ndash;</span>
}

interface EvolutionCardProps {
  evolution: CognitiveEvolution
}

export function EvolutionCard({ evolution }: EvolutionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-purple-500" />
          Evolução da sua empresa
          <span className="ml-auto flex items-center gap-1">
            {tendenciaIcone(evolution.tendencia)}
            <span className="text-xs text-muted-foreground">{evolution.tendencia}</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <span className={cn(
            'text-3xl font-bold',
            evolution.evolucaoTotal >= 50 ? 'text-emerald-500' : evolution.evolucaoTotal >= 20 ? 'text-amber-500' : 'text-red-500'
          )}>
            {evolution.evolucaoTotal}
          </span>
          <span className="text-sm text-muted-foreground">/ evolução</span>
          <div className="flex-1 h-2 rounded-full bg-muted ml-2">
            <div
              className={cn(
                'h-2 rounded-full transition-all',
                evolution.evolucaoTotal >= 50 ? 'bg-emerald-500' : evolution.evolucaoTotal >= 20 ? 'bg-amber-500' : 'bg-red-500'
              )}
              style={{ width: `${Math.min(evolution.evolucaoTotal, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Informações
            </p>
            <p className="text-lg font-semibold">{evolution.crescimentoConhecimento}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Confiança
            </p>
            <p className="text-lg font-semibold">{evolution.crescimentoConfianca}%</p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Suposições
          </p>
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="rounded bg-muted/30 p-2">
              <p className="font-semibold text-emerald-500">{evolution.hipotesesConfirmadas}</p>
              <p className="text-muted-foreground">Confirmadas</p>
            </div>
            <div className="rounded bg-muted/30 p-2">
              <p className="font-semibold text-amber-500">{evolution.hipotesesRefutadas}</p>
              <p className="text-muted-foreground">Refutadas</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
