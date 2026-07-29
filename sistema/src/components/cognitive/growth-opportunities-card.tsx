import type { GrowthEngineOutput } from '@/engine'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, AlertTriangle, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react'

interface GrowthOpportunitiesCardProps {
  oportunidades: GrowthEngineOutput
}

const IMPACTO_COR: Record<string, string> = {
  alto: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50',
  medio: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50',
  baixo: 'text-muted-foreground bg-muted/50 border-muted',
}

const ETAPAS_JORNADA = [
  { icone: Sparkles, label: 'Situação', cor: 'text-blue-400' },
  { icone: CheckCircle2, label: 'Objetivo', cor: 'text-emerald-400' },
  { icone: TrendingUp, label: 'Hipótese', cor: 'text-purple-400' },
  { icone: ChevronRight, label: 'Plano', cor: 'text-indigo-400' },
  { icone: TrendingDown, label: 'Resultado', cor: 'text-amber-400' },
]

export function GrowthOpportunitiesCard({ oportunidades }: GrowthOpportunitiesCardProps) {
  if (oportunidades.oportunidades.length === 0) return null

  const top = oportunidades.oportunidades[0]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Jornada de Recomendações
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {oportunidades.total} oportunidades
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {oportunidades.oportunidades.slice(0, 2).map((op) => {
          const impactoLabel = op.impacto === 'alto' ? 'Alto' : op.impacto === 'medio' ? 'Médio' : 'Baixo'

          return (
            <div key={op.id} className="rounded-lg border p-3 space-y-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-snug">{op.titulo}</p>
                <span className={cn('shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border', IMPACTO_COR[op.impacto])}>
                  {impactoLabel}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{op.descricao}</p>

              <div className="grid grid-cols-5 gap-1">
                {ETAPAS_JORNADA.map((etapa, j) => (
                  <div key={j} className="flex flex-col items-center gap-1 text-[9px] text-center">
                    <div className={cn('flex items-center justify-center w-5 h-5 rounded-full border border-border/40', etapa.cor.replace('text-', 'bg-').replace('400', '100/30') + ' dark:' + etapa.cor.replace('text-', 'bg-').replace('400', '900/20'))}>
                      <etapa.icone className={cn('h-3 w-3', etapa.cor)} />
                    </div>
                    <span className="text-muted-foreground leading-tight">{etapa.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground pt-1 border-t border-border/30">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span className={cn('font-medium', op.prioridade >= 60 ? 'text-emerald-500' : op.prioridade >= 30 ? 'text-amber-500' : '')}>
                    {op.prioridade}% relevância
                  </span>
                </div>
                <span>{op.esforco === 'alto' ? 'Alto esforço' : op.esforco === 'medio' ? 'Médio esforço' : 'Baixo esforço'}</span>
                <span>{op.tempo === 'curto' ? 'Curto prazo' : op.tempo === 'medio' ? 'Médio prazo' : 'Longo prazo'}</span>
                {op.risco !== 'baixo' && (
                  <span className="flex items-center gap-1 text-amber-500">
                    <AlertTriangle className="h-3 w-3" /> Risco {op.risco}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
