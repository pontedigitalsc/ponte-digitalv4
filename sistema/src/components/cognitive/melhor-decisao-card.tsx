import type { CentroCognitivoData } from '@/engine'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp } from 'lucide-react'

interface MelhorDecisaoCardProps {
  data: CentroCognitivoData['melhorDecisao']
}

export function MelhorDecisaoCard({ data }: MelhorDecisaoCardProps) {
  if (!data) return null

  return (
    <Card className="border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-indigo-500" />
          Melhor decisão hoje
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-medium">{data.titulo}</p>
        <p className="text-xs text-muted-foreground">{data.descricao}</p>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span className="text-muted-foreground">Impacto: </span>
            <span className="font-medium">{data.impacto}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Confiança: </span>
            <span className={cn('font-medium', data.confianca >= 0.6 ? 'text-emerald-500' : data.confianca >= 0.3 ? 'text-amber-500' : 'text-red-500')}>
              {Math.round(data.confianca * 100)}%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Urgência: </span>
            <span className={cn('font-medium', data.urgencia >= 4 ? 'text-red-500' : data.urgencia >= 3 ? 'text-amber-500' : 'text-muted-foreground')}>
              {data.urgencia}/5
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
