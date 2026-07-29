import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Sparkles, CheckCircle2, TrendingUp } from 'lucide-react'

interface ConquistaCognitiva {
  icone: 'conhecimento' | 'decisao' | 'aprendizado' | 'evolucao'
  titulo: string
  descricao: string
  data: string
}

interface CognitiveCelebrationsCardProps {
  conquistas: ConquistaCognitiva[]
}

const CONQUISTA_CONFIG: Record<string, { icone: React.ReactNode; cor: string }> = {
  conhecimento: { icone: <CheckCircle2 className="h-3 w-3" />, cor: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200' },
  decisao: { icone: <TrendingUp className="h-3 w-3" />, cor: 'text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-200' },
  aprendizado: { icone: <Sparkles className="h-3 w-3" />, cor: 'text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-200' },
  evolucao: { icone: <TrendingUp className="h-3 w-3" />, cor: 'text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-200' },
}

export function CognitiveCelebrationsCard({ conquistas }: CognitiveCelebrationsCardProps) {
  if (conquistas.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Celebrações Cognitivas
          <span className="ml-auto text-xs text-muted-foreground font-normal">{conquistas.length} conquista(s)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {conquistas.map((c, i) => {
          const cfg = CONQUISTA_CONFIG[c.icone] ?? CONQUISTA_CONFIG.aprendizado
          return (
            <div key={i} className={cn('flex items-start gap-3 rounded-lg border p-3', cfg.cor)}>
              <span className="mt-0.5 shrink-0">{cfg.icone}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{c.titulo}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.descricao}</p>
              </div>
              {c.data && <span className="text-[10px] text-muted-foreground shrink-0">{c.data}</span>}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
