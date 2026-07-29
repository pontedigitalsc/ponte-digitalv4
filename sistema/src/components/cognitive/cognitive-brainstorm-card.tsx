import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, AlertTriangle, Sparkles } from 'lucide-react'
import type { CenarioAlternativo } from '@/engine'

interface CognitiveBrainstormCardProps {
  cenarios: CenarioAlternativo[]
}

const IMPACTO_COR: Record<string, string> = {
  positivo: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30',
  negativo: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30',
  neutro: 'text-muted-foreground bg-muted',
}

export function CognitiveBrainstormCard({ cenarios }: CognitiveBrainstormCardProps) {
  if (cenarios.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Brainstorm Cognitivo
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            Cenários alternativos
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {cenarios.map((c) => (
          <div key={c.id} className="rounded-lg border p-3 space-y-2 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-snug">{c.titulo}</p>
              <span className={cn('shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border', IMPACTO_COR[c.impacto])}>
                {c.impacto === 'positivo' ? 'Oportunidade' : c.impacto === 'negativo' ? 'Alerta' : 'Neutro'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{c.descricao}</p>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span className={cn('font-medium', c.confianca >= 60 ? 'text-emerald-500' : c.confianca >= 30 ? 'text-amber-500' : '')}>
                  {c.confianca}% confiança
                </span>
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-amber-400" />
                {c.riscos.length} risco{c.riscos.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
