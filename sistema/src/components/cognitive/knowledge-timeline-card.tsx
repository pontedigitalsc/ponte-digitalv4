import type { TimelineExperience } from '@/engine'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react'

interface KnowledgeTimelineCardProps {
  timeline: TimelineExperience
}

const TIPO_CONFIG: Record<string, { icone: typeof Sparkles; cor: string; bg: string }> = {
  conhecimento: { icone: Sparkles, cor: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50' },
  hipotese: { icone: TrendingUp, cor: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50' },
  outcome: { icone: Sparkles, cor: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/50' },
  acao: { icone: CheckCircle2, cor: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50' },
}

export function KnowledgeTimelineCard({ timeline }: KnowledgeTimelineCardProps) {
  const knowledgeItems = timeline.secoes.flatMap(s =>
    s.grupos.flatMap(g =>
      g.items.filter(i => ['conhecimento', 'hipotese', 'outcome', 'acao'].includes(i.tipo))
    )
  ).slice(0, 8)

  if (knowledgeItems.length === 0) return null

  const marcosConquistas = knowledgeItems.filter(i => i.tipo === 'outcome' || (i.confianca ?? 0) >= 0.8)
  const totalAprendizados = knowledgeItems.length

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Jornada de Evolução
          <span className="ml-auto text-[10px] text-muted-foreground">
            {marcosConquistas.length} conquistas em {totalAprendizados} marcos
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {marcosConquistas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4 pb-3 border-b border-border/40">
            {marcosConquistas.slice(0, 4).map((m, i) => (
              <span key={i} className="text-[9px] bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/50">
                {m.tipo === 'outcome' ? 'Resultado' : 'Conquista'} #{i + 1}
              </span>
            ))}
            {marcosConquistas.length > 4 && (
              <span className="text-[9px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-full">
                +{marcosConquistas.length - 4} mais
              </span>
            )}
          </div>
        )}

        <div className="space-y-0">
          {knowledgeItems.map((item, i) => {
            const cfg = TIPO_CONFIG[item.tipo]
            const Icone = cfg?.icone ?? Sparkles
            const isMarco = item.tipo === 'outcome' || (item.confianca ?? 0) >= 0.8

            return (
              <div key={item.id} className="relative flex gap-3 pb-4 last:pb-0">
                {i < knowledgeItems.length - 1 && (
                  <div className={cn('absolute left-[11px] top-5 bottom-0 w-px', isMarco ? 'bg-amber-300 dark:bg-amber-700' : 'bg-border')} />
                )}
                <div className={cn(
                  'shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center border z-10',
                  cfg?.bg ?? 'bg-muted/50',
                  cfg ? 'border-current/20' : 'border-border',
                  isMarco ? 'ring-1 ring-amber-300 dark:ring-amber-700' : ''
                )}>
                  <Icone className={cn('h-3 w-3', cfg?.cor ?? 'text-muted-foreground')} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className={cn('text-xs leading-snug', isMarco ? 'font-semibold' : 'font-medium')}>{item.explicacao}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.categoria}</span>
                    <span className="text-[10px] text-muted-foreground">•</span>
                    <span className="text-[10px] text-muted-foreground">{item.origem}</span>
                    {item.confianca !== undefined && (
                      <>
                        <span className="text-[10px] text-muted-foreground">•</span>
                        <span className={cn('text-[10px] font-medium', item.confianca >= 0.7 ? 'text-emerald-500' : item.confianca >= 0.4 ? 'text-amber-500' : 'text-muted-foreground')}>
                          {Math.round(item.confianca * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {totalAprendizados >= 4 && (
          <div className="mt-4 pt-3 border-t border-border/40 space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">O que isso significa</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Sua empresa acumulou {totalAprendizados} marcos relevantes nesta jornada.
              {marcosConquistas.length > 0
                ? ` ${marcosConquistas.length} deles representam conquistas concretas — cada uma fortalece a capacidade de tomar decisões melhores.`
                : ' Cada novo registro aprofunda o entendimento sobre o negócio.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
