import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, AlertTriangle, Sparkles, ChevronRight } from 'lucide-react'
import type { CenarioAlternativo } from '@/engine'

interface StrategicRoomCardProps {
  cenarios: CenarioAlternativo[]
  totalConhecimentos: number
  totalHipoteses: number
}

const IMPACTO_COR: Record<string, string> = {
  positivo: 'border-l-emerald-400',
  negativo: 'border-l-red-400',
  neutro: 'border-l-muted',
}

export function StrategicRoomCard({ cenarios, totalConhecimentos, totalHipoteses }: StrategicRoomCardProps) {
  if (cenarios.length === 0) return null

  const positivos = cenarios.filter(c => c.impacto === 'positivo')
  const negativos = cenarios.filter(c => c.impacto === 'negativo')

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Sala Estratégica
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {cenarios.length} caminho(s)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-emerald-500" />
            {positivos.length} oportunidade(s)
          </span>
          <span className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-red-500" />
            {negativos.length} alerta(s)
          </span>
          <span>{totalConhecimentos} conhecimento(s)</span>
          <span>{totalHipoteses} hipótese(s)</span>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Cenários para sua empresa</p>
          {cenarios.map((c) => (
            <div key={c.id} className={cn('rounded-lg border-l-4 p-3 space-y-2', IMPACTO_COR[c.impacto])}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-snug">{c.titulo}</p>
                <span className={cn(
                  'shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full',
                  c.impacto === 'positivo' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30' :
                  c.impacto === 'negativo' ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30' :
                  'text-muted-foreground bg-muted'
                )}>
                  {c.impacto === 'positivo' ? 'Oportunidade' : c.impacto === 'negativo' ? 'Alerta' : 'Neutro'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.descricao}</p>

              <div className="flex items-center gap-3 text-[11px]">
                <span className={cn('font-medium', c.confianca >= 60 ? 'text-emerald-500' : c.confianca >= 30 ? 'text-amber-500' : '')}>
                  Confiança: {c.confianca}%
                </span>
                {c.riscos.length > 0 && (
                  <span className="text-muted-foreground">
                    {c.riscos.length} risco(s)
                  </span>
                )}
              </div>

              {c.riscos.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {c.riscos.slice(0, 2).map((r, i) => (
                    <span key={i} className="text-[10px] text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30 px-1.5 py-0.5 rounded">
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/10 p-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 mb-0.5">
            <ChevronRight className="h-3 w-3" />
            Simular caminho
          </div>
          <p className="text-xs text-muted-foreground">
            Escolha um cenário acima para simular o impacto na sua empresa, decidir o próximo passo e registrar o aprendizado.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
