import { Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, AlertTriangle, Sparkles } from 'lucide-react'
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
          Maturidade Estratégica
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
          {maturity.variacaoSemanal !== 0 && (
            <span className={cn(
              'flex items-center gap-0.5 text-xs font-medium',
              maturity.variacaoSemanal > 0 ? 'text-emerald-500' : 'text-red-500'
            )}>
              <TrendingUp className={cn('h-3 w-3', maturity.variacaoSemanal < 0 && 'rotate-180 scale-y-[-1]')} />
              {Math.abs(maturity.variacaoSemanal)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2">
          {maturity.maiorEvolucao && (
            <div className="rounded-lg border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/10 p-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 mb-1">
                <TrendingUp className="h-3 w-3" />
                Maior evolução
              </div>
              <p className="text-xs text-muted-foreground">{maturity.maiorEvolucao.area} — {maturity.maiorEvolucao.descricao}</p>
            </div>
          )}
          {maturity.maiorRisco && (
            <div className="rounded-lg border border-amber-100 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/10 p-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-700 dark:text-amber-400 mb-1">
                <AlertTriangle className="h-3 w-3" />
                Maior risco
              </div>
              <p className="text-xs text-muted-foreground">{maturity.maiorRisco.area} — {maturity.maiorRisco.descricao}</p>
            </div>
          )}
          {maturity.maiorOportunidade && (
            <div className="rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/10 p-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-400 mb-1">
                <Sparkles className="h-3 w-3" />
                Maior oportunidade
              </div>
              <p className="text-xs text-muted-foreground">{maturity.maiorOportunidade.area} — {maturity.maiorOportunidade.descricao}</p>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Fatores</p>
          {maturity.fatores.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <TrendingDown className="h-3 w-3 text-emerald-500 shrink-0" />
              <span className="text-xs text-muted-foreground">{f}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
