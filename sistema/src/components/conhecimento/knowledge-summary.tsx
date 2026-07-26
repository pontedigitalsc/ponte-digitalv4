import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, AlertCircle, Trash2, Sparkles, Bot } from 'lucide-react'

interface KnowledgeSummaryProps {
  total: number
  confirmados: number
  hipotesesAtivas: number
  descartados: number
  scoreMedio: number
  criadosEstaSemana: number
}

export function KnowledgeSummary({
  total,
  confirmados,
  hipotesesAtivas,
  descartados,
  scoreMedio,
  criadosEstaSemana,
}: KnowledgeSummaryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <Card>
        <CardContent className="p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Bot className="h-3.5 w-3.5" />
            <span>Total</span>
          </div>
          <p className="text-xl font-bold">{total}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Confirmados</span>
          </div>
          <p className="text-xl font-bold text-emerald-600">{confirmados}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
            <span>Em observação</span>
          </div>
          <p className="text-xl font-bold text-amber-600">{total - confirmados - descartados}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Trash2 className="h-3.5 w-3.5 text-red-500" />
            <span>Descartados</span>
          </div>
          <p className="text-xl font-bold text-red-600">{descartados}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Score médio</span>
          </div>
          <p className="text-xl font-bold">{scoreMedio}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            <span>Esta semana</span>
          </div>
          <p className="text-xl font-bold text-violet-600">{criadosEstaSemana}</p>
        </CardContent>
      </Card>
    </div>
  )
}
