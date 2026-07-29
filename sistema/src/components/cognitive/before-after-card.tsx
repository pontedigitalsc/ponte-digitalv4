import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react'
import type { AntesDepoisEngine, ComparacaoAntesDepois } from '@/engine'

interface BeforeAfterCardProps {
  dados: AntesDepoisEngine
}

export function BeforeAfterCard({ dados }: BeforeAfterCardProps) {
  if (dados.comparacoes.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          Antes × Depois
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {dados.totalMelhorias}/{dados.comparacoes.length} melhorias
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {dados.comparacoes.map((comp, i) => (
          <ComparacaoRow key={i} comp={comp} />
        ))}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t pt-2">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          <span>{dados.resumoGeral}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function ComparacaoRow({ comp }: { comp: ComparacaoAntesDepois }) {
  return (
    <div className="rounded-lg border p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium">{comp.dimensao}</span>
        <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full', comp.confianca >= 70 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' : 'text-amber-600 bg-amber-50 dark:bg-amber-950/30')}>
          {Math.round(comp.confianca)}% confiança
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs">
        <span className="text-red-500 text-left">{comp.antes}</span>
        <ChevronRight className="h-3 w-3 text-muted-foreground" />
        <span className="text-emerald-500 text-right">{comp.depois}</span>
      </div>
      <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">{comp.resultado}</p>
    </div>
  )
}
