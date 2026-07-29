import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Circle } from 'lucide-react'

interface ConhecimentoAtivo {
  area: string
  descricao: string
  confianca: number
  tipo: 'CONFIRMADO' | 'EM_OBSERVACAO' | 'HIPOTESE'
  valor: number
}

interface PatrimonyCognitivoCardProps {
  conhecimentos: ConhecimentoAtivo[]
  scorePatrimonio: number
  totalAtivos: number
  maiorConfianca: number
  totalHipoteses?: number
  totalDescartados?: number
  evolucaoMaturidade?: number
}

const TIPO_BADGE: Record<string, string> = {
  CONFIRMADO: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50',
  EM_OBSERVACAO: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50',
  HIPOTESE: 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50',
}

export function PatrimonyCognitivoCard({
  conhecimentos,
  scorePatrimonio,
  totalAtivos,
  maiorConfianca,
  totalHipoteses = 0,
  totalDescartados = 0,
  evolucaoMaturidade = 0,
}: PatrimonyCognitivoCardProps) {
  const top3 = conhecimentos.slice(0, 3)
  const confirmados = conhecimentos.filter(c => c.tipo === 'CONFIRMADO').length

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          Patrimônio Cognitivo
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {totalAtivos} ativos
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.5"
                fill="none"
                stroke={scorePatrimonio >= 60 ? '#22c55e' : scorePatrimonio >= 30 ? '#f59e0b' : '#ef4444'}
                strokeWidth="3"
                strokeDasharray={`${scorePatrimonio} ${100 - scorePatrimonio}`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <span className={cn(
              'absolute text-lg font-bold',
              scorePatrimonio >= 60 ? 'text-emerald-500' : scorePatrimonio >= 30 ? 'text-amber-500' : 'text-red-500'
            )}>
              {scorePatrimonio}
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <p className="text-muted-foreground">Score do patrimônio intelectual</p>
            <p className="flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              Maior confiança: {maiorConfianca}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-emerald-50/50 dark:bg-emerald-950/10 p-2 text-center">
            <p className="text-lg font-bold text-emerald-500">{totalAtivos}</p>
            <p className="text-[10px] text-muted-foreground">Conhecimentos</p>
          </div>
          <div className="rounded-lg bg-blue-50/50 dark:bg-blue-950/10 p-2 text-center">
            <p className="text-lg font-bold text-blue-500">{confirmados}</p>
            <p className="text-[10px] text-muted-foreground">Validados</p>
          </div>
          <div className="rounded-lg bg-amber-50/50 dark:bg-amber-950/10 p-2 text-center">
            <p className="text-lg font-bold text-amber-500">{totalHipoteses}</p>
            <p className="text-[10px] text-muted-foreground">Hipóteses</p>
          </div>
          <div className="rounded-lg bg-red-50/50 dark:bg-red-950/10 p-2 text-center">
            <p className="text-lg font-bold text-red-500">{totalDescartados}</p>
            <p className="text-[10px] text-muted-foreground">Descartados</p>
          </div>
        </div>

        {evolucaoMaturidade !== 0 && (
          <div className="flex items-center gap-1.5 text-xs">
            {evolucaoMaturidade > 0 ? (
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={cn('font-medium', evolucaoMaturidade > 0 ? 'text-emerald-500' : 'text-red-500')}>
              {evolucaoMaturidade > 0 ? '+' : ''}{evolucaoMaturidade} pontos de maturidade
            </span>
          </div>
        )}

        {top3.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Conhecimentos mais valiosos
            </p>
            <div className="space-y-1.5">
              {top3.map((c, i) => (
                <div key={i} className="rounded-lg border p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium">{c.area}</span>
                    <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full border', TIPO_BADGE[c.tipo])}>
                      {c.tipo === 'CONFIRMADO' ? 'Confirmado' : c.tipo === 'EM_OBSERVACAO' ? 'Observando' : 'Hipótese'}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{c.descricao}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          c.confianca >= 0.6 ? 'bg-emerald-500' : c.confianca >= 0.3 ? 'bg-amber-500' : 'bg-red-500'
                        )}
                        style={{ width: `${Math.round(c.confianca * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{Math.round(c.confianca * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {conhecimentos.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <AlertTriangle className="h-5 w-5 text-muted-foreground/50" />
            <p className="text-xs text-muted-foreground italic">Nenhum conhecimento registrado ainda</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
