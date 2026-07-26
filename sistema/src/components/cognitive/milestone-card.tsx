import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Sparkles } from 'lucide-react'
import type { CognitiveMilestone } from '@/engine'

interface MilestoneCardProps {
  milestones: CognitiveMilestone[]
}

export function MilestoneCard({ milestones }: MilestoneCardProps) {
  if (!milestones.length) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Conquistas
          <span className="ml-auto text-xs text-muted-foreground">{milestones.length} conquistas</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-3 w-3" />
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
