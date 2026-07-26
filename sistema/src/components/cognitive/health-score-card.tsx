import { Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react'
import type { HealthScore } from '@/engine'

const corScore = (score: number) => {
  if (score >= 70) return 'text-emerald-500'
  if (score >= 40) return 'text-amber-500'
  return 'text-red-500'
}

const bgBarra = (score: number) => {
  if (score >= 70) return 'bg-emerald-500'
  if (score >= 40) return 'bg-amber-500'
  return 'bg-red-500'
}

const tendenciaIcone: Record<string, React.ReactNode> = {
  positiva: <TrendingUp className="h-4 w-4 text-emerald-500" />,
  estavel: <span className="h-4 w-4 text-muted-foreground">&ndash;</span>,
  negativa: <TrendingDown className="h-4 w-4 text-red-500" />,
}

interface HealthScoreCardProps {
  healthScore: HealthScore | null
}

export function HealthScoreCard({ healthScore }: HealthScoreCardProps) {
  if (!healthScore) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CheckCircle2 className={cn('h-4 w-4', corScore(healthScore.score))} />
          Saúde do negócio
          <span className="ml-auto flex items-center gap-1">
            {tendenciaIcone[healthScore.tendencia]}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <span className={cn('text-3xl font-bold', corScore(healthScore.score))}>
            {healthScore.score}
          </span>
          <span className="text-sm text-muted-foreground">/ 100</span>
          <div className="flex-1 h-2 rounded-full bg-muted ml-2">
            <div
              className={cn('h-2 rounded-full transition-all', bgBarra(healthScore.score))}
              style={{ width: `${healthScore.score}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {healthScore.distribuicao.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-24 shrink-0">{item.rotulo}</span>
              <div className="flex-1 h-1.5 rounded-full bg-muted">
                <div
                  className={cn('h-1.5 rounded-full', bgBarra(item.valor))}
                  style={{ width: `${item.valor}%` }}
                />
              </div>
              <span className="text-xs font-medium w-8 text-right">{item.valor}</span>
            </div>
          ))}
        </div>

        <Separator />

        {healthScore.pontosFortes.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Pontos fortes
            </p>
            <ul className="space-y-0.5">
              {healthScore.pontosFortes.map((p, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {healthScore.pontosFracos.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
              <AlertTriangle className="h-3 w-3 text-amber-500" /> Pontos de atenção
            </p>
            <ul className="space-y-0.5">
              {healthScore.pontosFracos.map((p, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                  <TrendingDown className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {healthScore.recomendacoes.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
              <Sparkles className="h-3 w-3 text-blue-500" /> Recomendações
            </p>
            <ul className="space-y-0.5">
              {healthScore.recomendacoes.map((r, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                  <Sparkles className="h-3 w-3 text-blue-500 mt-0.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
