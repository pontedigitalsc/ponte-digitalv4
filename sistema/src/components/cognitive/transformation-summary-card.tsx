import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, ChevronRight } from 'lucide-react'
import type { EmpresaTransformacao } from '@/engine'

interface TransformationSummaryCardProps {
  transformacao: EmpresaTransformacao | null
}

export function TransformationSummaryCard({ transformacao }: TransformationSummaryCardProps) {
  if (!transformacao) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          Empresa em Transformação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-red-100 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/10 p-3">
            <p className="text-[10px] font-medium text-red-500 mb-1">Antes</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{transformacao.antes}</p>
          </div>
          <div className="rounded-lg border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/10 p-3">
            <p className="text-[10px] font-medium text-emerald-500 mb-1">Depois</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{transformacao.depois}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ChevronRight className="h-3 w-3 text-emerald-500" />
          <span>Período: {transformacao.periodo}</span>
        </div>
      </CardContent>
    </Card>
  )
}
