import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Sparkles, ChevronRight } from 'lucide-react'
import type { CapitalCognitivo, ComponenteCapital } from '@/engine'

interface CognitiveCapitalCardProps {
  capital: CapitalCognitivo
}

const NIVEL_COR: Record<string, string> = {
  INICIAL: 'text-slate-500',
  EM_CONSTRUCAO: 'text-blue-500',
  CONSOLIDADO: 'text-indigo-500',
  AVANCADO: 'text-emerald-500',
}

const NIVEL_ROTULO: Record<string, string> = {
  INICIAL: 'Inicial',
  EM_CONSTRUCAO: 'Em construção',
  CONSOLIDADO: 'Consolidado',
  AVANCADO: 'Avançado',
}

export function CognitiveCapitalCard({ capital }: CognitiveCapitalCardProps) {
  const ordenado = [...capital.componentes].sort((a, b) => b.score - a.score)
  const maior = ordenado[0]
  const menor = ordenado[ordenado.length - 1]
  const maiorPotencial = [...capital.componentes].sort((a, b) => (b.peso - b.score) - (a.peso - a.score))[0]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          Capital Cognitivo
          <span className={cn('ml-auto text-xs font-medium', NIVEL_COR[capital.nivel])}>
            {NIVEL_ROTULO[capital.nivel]}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-3">
          <span className={cn('text-4xl font-bold', NIVEL_COR[capital.nivel])}>
            {capital.scoreTotal}
          </span>
          <div className="flex items-center gap-1.5 mb-1">
            <span className={cn(
              'flex items-center gap-0.5 text-sm font-medium',
              capital.variacaoMensal >= 0 ? 'text-emerald-500' : 'text-red-500'
            )}>
              {capital.variacaoMensal >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {capital.variacaoMensal >= 0 ? '+' : ''}{capital.variacaoMensal} este mês
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">O que mais contribuiu</p>
          <div className="flex items-center gap-1.5 text-xs">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span className="font-medium text-foreground">{maior.nome}</span>
            <span className="text-muted-foreground">({maior.score}/{maior.peso})</span>
          </div>
        </div>

        {menor.score < maior.score && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">O que mais limita</p>
            <div className="flex items-center gap-1.5 text-xs">
              <TrendingDown className="h-3 w-3 text-red-400" />
              <span className="font-medium text-foreground">{menor.nome}</span>
              <span className="text-muted-foreground">({menor.score}/{menor.peso})</span>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Maior potencial de crescimento</p>
          <div className="flex items-center gap-1.5 text-xs">
            <ChevronRight className="h-3 w-3 text-amber-500" />
            <span className="font-medium text-foreground">{maiorPotencial.nome}</span>
            <span className="text-muted-foreground">pode crescer {maiorPotencial.peso - maiorPotencial.score} pontos</span>
          </div>
        </div>

        {capital.variacaoMensal !== 0 && (
          <div className="rounded-lg border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/10 p-2.5 space-y-1">
            <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Por que variou</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {capital.variacaoMensal > 0
                ? `Aumento impulsionado por ${maior.nome.toLowerCase()} (${maior.score}/${maior.peso}). ${menor.nome} ainda tem espaço para crescer (${menor.score}/${menor.peso}).`
                : `Queda concentrada em ${menor.nome.toLowerCase()} (${menor.score}/${menor.peso}). ${maior.nome} se manteve estável.`}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Comportamentos geradores</p>
          {capital.componentes.map((c, i) => (
            <ComponenteRow key={i} componente={c} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ComponenteRow({ componente }: { componente: ComponenteCapital }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{componente.nome}</span>
        <span className={cn('font-medium', componente.score >= 60 ? 'text-emerald-500' : componente.score >= 30 ? 'text-amber-500' : 'text-red-500')}>
          {componente.score}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', componente.score >= 60 ? 'bg-emerald-500' : componente.score >= 30 ? 'bg-amber-500' : 'bg-red-500')}
          style={{ width: `${(componente.score / Math.max(componente.peso, 1)) * 100}%` }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground">{componente.descricao}</p>
    </div>
  )
}
