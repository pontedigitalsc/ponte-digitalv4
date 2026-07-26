import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react'
import type { KnowledgeAge } from '@/engine'

const riscoBadge = (risco: string) => {
  const mapa: Record<string, string> = {
    ALTO: 'bg-red-100 text-red-700 border-red-200',
    MEDIO: 'bg-amber-100 text-amber-700 border-amber-200',
    BAIXO: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  }
  return mapa[risco] ?? 'bg-muted text-muted-foreground'
}

const riscoIcone = (risco: string) => {
  if (risco === 'ALTO') return <AlertTriangle className="h-3 w-3 text-red-500" />
  if (risco === 'MEDIO') return <AlertTriangle className="h-3 w-3 text-amber-500" />
  return <CheckCircle2 className="h-3 w-3 text-emerald-500" />
}

interface KnowledgeAgingCardProps {
  knowledgeAge: KnowledgeAge[]
}

export function KnowledgeAgingCard({ knowledgeAge }: KnowledgeAgingCardProps) {
  if (!knowledgeAge.length) return null

  const altoRisco = knowledgeAge.filter(k => k.risco === 'ALTO').length
  const medioRisco = knowledgeAge.filter(k => k.risco === 'MEDIO').length

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Informações para revisar
          <span className="ml-auto flex items-center gap-2 text-xs">
            {altoRisco > 0 && (
              <span className="flex items-center gap-1 text-red-500">
                <AlertTriangle className="h-3 w-3" /> {altoRisco} críticos
              </span>
            )}
            {medioRisco > 0 && (
              <span className="flex items-center gap-1 text-amber-500">
                <AlertTriangle className="h-3 w-3" /> {medioRisco} atenção
              </span>
            )}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {knowledgeAge.map((k, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
              <Sparkles className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{k.descricao}</p>
                <p className="text-xs text-muted-foreground">
                  {k.diasSemValidacao} dias sem revisão
                  {k.categoria && ` · ${k.categoria}`}
                </p>
              </div>
              <span className={cn(
                'shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border flex items-center gap-1',
                riscoBadge(k.risco)
              )}>
                {riscoIcone(k.risco)}
                {k.risco}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
