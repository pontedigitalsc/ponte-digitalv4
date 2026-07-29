import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle2, Sparkles, TrendingUp } from 'lucide-react'
import type { CognitiveMilestone } from '@/engine'

interface MilestoneCardProps {
  milestones: CognitiveMilestone[]
  evolucaoGeral?: number
}

const CATEGORIA_COR: Record<string, string> = {
  conhecimento: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  aprendizado: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  execucao: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  maturidade: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
}

const CATEGORIA_ICONE: Record<string, React.ReactNode> = {
  conhecimento: <Sparkles className="h-3 w-3" />,
  aprendizado: <Sparkles className="h-3 w-3" />,
  execucao: <TrendingUp className="h-3 w-3" />,
  maturidade: <TrendingUp className="h-3 w-3" />,
}

export function MilestoneCard({ milestones, evolucaoGeral = 0 }: MilestoneCardProps) {
  if (!milestones.length) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Marcos Evolutivos
          <span className="ml-auto text-xs text-muted-foreground">{milestones.length} marco(s)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {evolucaoGeral > 0 && (
          <div className="flex items-center gap-2 text-xs text-emerald-500 mb-3 pb-3 border-b">
            <TrendingUp className="h-3 w-3" />
            <span>Evolução: {evolucaoGeral}% — Sua empresa está ficando mais inteligente</span>
          </div>
        )}

        <div className="space-y-3">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-full',
                  CATEGORIA_COR[m.categoria] ?? 'bg-muted text-muted-foreground'
                )}>
                  {CATEGORIA_ICONE[m.categoria] ?? <CheckCircle2 className="h-3 w-3" />}
                </div>
                {i < milestones.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-1" />
                )}
              </div>
              <div className="flex-1 pb-3">
                <p className="text-sm font-medium">{m.titulo}</p>
                {m.descricao && (
                  <p className="text-xs text-muted-foreground mt-0.5">{m.descricao}</p>
                )}
                <span className={cn(
                  'inline-block text-[10px] font-medium px-1.5 py-0.5 rounded mt-1',
                  CATEGORIA_COR[m.categoria] ?? 'bg-muted text-muted-foreground'
                )}>
                  {m.categoria}
                </span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {new Date(m.data).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
