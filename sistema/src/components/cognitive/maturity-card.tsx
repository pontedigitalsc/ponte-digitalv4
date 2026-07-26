import { Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, CheckCircle2 } from 'lucide-react'
import type { CompanyMaturity, NivelMaturidade } from '@/engine'

const ROTULO_NIVEL: Record<NivelMaturidade, string> = {
  INICIAL: 'Inicial',
  EM_DESENVOLVIMENTO: 'Em desenvolvimento',
  MADURA: 'Madura',
  EVOLUIDA: 'Evoluída',
  REFERENCIA: 'Referência',
}

const nivelBadge = (nivel: NivelMaturidade) => {
  const mapa: Record<NivelMaturidade, string> = {
    INICIAL: 'text-slate-500 border-slate-300',
    EM_DESENVOLVIMENTO: 'text-blue-500 border-blue-300',
    MADURA: 'text-indigo-500 border-indigo-300',
    EVOLUIDA: 'text-purple-500 border-purple-300',
    REFERENCIA: 'text-emerald-500 border-emerald-300',
  }
  return mapa[nivel] ?? 'text-slate-500 border-slate-300'
}

interface MaturityCardProps {
  maturity: CompanyMaturity
}

export function MaturityCard({ maturity }: MaturityCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-indigo-500" />
          Estágio da empresa
          <span className={cn('ml-auto text-xs font-medium px-2 py-0.5 rounded-full border', nivelBadge(maturity.nivel))}>
            {ROTULO_NIVEL[maturity.nivel] ?? maturity.nivel}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <span className={cn(
            'text-3xl font-bold',
            maturity.score >= 60 ? 'text-emerald-500' : maturity.score >= 30 ? 'text-amber-500' : 'text-red-500'
          )}>
            {maturity.score}
          </span>
          <span className="text-sm text-muted-foreground">/ 100</span>
          <div className="flex-1 h-2 rounded-full bg-muted ml-2">
            <div
              className={cn(
                'h-2 rounded-full transition-all',
                maturity.score >= 60 ? 'bg-emerald-500' : maturity.score >= 30 ? 'bg-amber-500' : 'bg-red-500'
              )}
              style={{ width: `${maturity.score}%` }}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Fatores</p>
          {maturity.fatores.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
              <span className="text-xs text-muted-foreground">{f}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
