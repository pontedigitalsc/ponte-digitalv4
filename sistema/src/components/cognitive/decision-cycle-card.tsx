import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, Clock, TrendingUp, AlertTriangle, Sparkles, ChevronRight } from 'lucide-react'
import type { CicloDecisao, ResumoCiclos } from '@/engine'

interface DecisionCycleCardProps {
  resumo: ResumoCiclos
}

const ETAPA_COR: Record<string, string> = {
  HIPOTESE: 'border-l-sky-400',
  DECISAO: 'border-l-indigo-400',
  EXECUCAO: 'border-l-amber-400',
  RESULTADO: 'border-l-emerald-400',
  APRENDIZADO: 'border-l-purple-400',
  NOVA_RECOMENDACAO: 'border-l-blue-400',
}

const ETAPA_ICONE: Record<string, React.ReactNode> = {
  HIPOTESE: <Circle className="h-3 w-3 text-sky-500" />,
  DECISAO: <TrendingUp className="h-3 w-3 text-indigo-500" />,
  EXECUCAO: <Clock className="h-3 w-3 text-amber-500" />,
  RESULTADO: <CheckCircle2 className="h-3 w-3 text-emerald-500" />,
  APRENDIZADO: <Sparkles className="h-3 w-3 text-purple-500" />,
  NOVA_RECOMENDACAO: <ChevronRight className="h-3 w-3 text-blue-500" />,
}

export function DecisionCycleCard({ resumo }: DecisionCycleCardProps) {
  if (resumo.ciclos.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          Ciclo Decisão → Aprendizado
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {resumo.taxaAprendizado}% concluídos
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{resumo.totalCiclos} ciclo(s)</span>
          <span className="text-emerald-500">{resumo.ciclosCompletos} completo(s)</span>
          <span className="text-amber-500">{resumo.totalCiclos - resumo.ciclosCompletos} em andamento</span>
        </div>

        <div className="space-y-3">
          {resumo.ciclos.map((ciclo) => (
            <CicloCard key={ciclo.id} ciclo={ciclo} />
          ))}
        </div>

        {resumo.proximoPasso && (
          <div className="rounded-lg border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/10 p-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-400 mb-0.5">
              <ChevronRight className="h-3 w-3" />
              Próximo passo
            </div>
            <p className="text-xs text-muted-foreground">{resumo.proximoPasso}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CicloCard({ ciclo }: { ciclo: CicloDecisao }) {
  const statusCor = ciclo.status === 'CONCLUIDO' ? 'text-emerald-500' : ciclo.status === 'EM_ANDAMENTO' ? 'text-amber-500' : 'text-red-500'
  const statusRotulo = ciclo.status === 'CONCLUIDO' ? 'Concluído' : ciclo.status === 'EM_ANDAMENTO' ? 'Em andamento' : 'Interrompido'

  return (
    <div className="rounded-lg border p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">{ciclo.titulo}</p>
        <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full border', statusCor)}>{statusRotulo}</span>
      </div>
      <p className="text-[11px] text-muted-foreground">{ciclo.categoria}</p>

      <div className="space-y-1.5">
        {ciclo.etapas.map((etapa, i) => (
          <div key={i} className={cn('flex items-start gap-2 border-l-2 pl-2 py-0.5', ETAPA_COR[etapa.etapa] ?? 'border-l-muted')}>
            <span className="mt-0.5 shrink-0">{ETAPA_ICONE[etapa.etapa]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground">{etapa.descricao}</p>
              {etapa.confianca && (
                <span className="text-[10px] text-muted-foreground">
                  Confiança: {Math.round(etapa.confianca * 100)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {ciclo.aprendizadosGerados.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {ciclo.aprendizadosGerados.map((a, i) => (
            <span key={i} className="text-[10px] text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30 px-1.5 py-0.5 rounded">
              {a}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
