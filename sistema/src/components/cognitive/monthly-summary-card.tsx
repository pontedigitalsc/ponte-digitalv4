import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Sparkles, BarChart3 } from 'lucide-react'
import type { CapitalCognitivo, AdaptiveCapacity, CurvaEvolutiva } from '@/engine'

interface MonthlySummaryCardProps {
  capital: CapitalCognitivo
  capacidade: AdaptiveCapacity
  curva: CurvaEvolutiva
  totalConhecimentos: number
  totalHipoteses: number
  totalDescartados: number
}

export function MonthlySummaryCard({ capital, capacidade, curva, totalConhecimentos, totalHipoteses, totalDescartados }: MonthlySummaryCardProps) {
  const evolucoes = curva.capacidades.map(nome => {
    const primeiro = curva.pontos[0]?.capacidades[nome] ?? 0
    const ultimo = curva.pontos[curva.pontos.length - 1]?.capacidades[nome] ?? 0
    return { nome, variacao: ultimo - primeiro }
  }).filter(e => e.variacao > 0)

  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className="bg-gradient-to-br from-emerald-50/40 to-white dark:from-emerald-950/10 dark:to-slate-950 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-emerald-500" />
          <p className="text-sm font-semibold">Evolução do mês</p>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Este mês sua empresa:
        </p>

        <div className="space-y-2">
          {evolucoes.length > 0 && (
            <Row icone={<TrendingUp className="h-3 w-3 text-emerald-500" />} texto={`desenvolveu ${evolucoes.length} capacidade(s)`} />
          )}
          {totalConhecimentos > 0 && (
            <Row icone={<Sparkles className="h-3 w-3 text-emerald-500" />} texto={`validou ${totalConhecimentos} conhecimento(s)`} />
          )}
          {totalHipoteses > 0 && (
            <Row icone={<TrendingUp className="h-3 w-3 text-blue-500" />} texto={`${totalHipoteses} hipótese(s) em andamento`} />
          )}
          {totalDescartados > 0 && (
            <Row icone={<TrendingDown className="h-3 w-3 text-red-400" />} texto={`descartou ${totalDescartados} hipótese(s)`} />
          )}
          {capital.variacaoMensal !== 0 && (
            <Row
              icone={capital.variacaoMensal > 0 ? <TrendingUp className="h-3 w-3 text-emerald-500" /> : <TrendingDown className="h-3 w-3 text-red-400" />}
              texto={`${capital.variacaoMensal > 0 ? 'aumentou' : 'reduziu'} ${Math.abs(capital.variacaoMensal)} ponto(s) de Capital Cognitivo`}
            />
          )}
          {capacidade.variacaoGeral !== 0 && (
            <Row
              icone={capacidade.variacaoGeral > 0 ? <TrendingUp className="h-3 w-3 text-emerald-500" /> : <TrendingDown className="h-3 w-3 text-red-400" />}
              texto={`${capacidade.variacaoGeral > 0 ? 'melhorou' : 'reduziu'} ${Math.abs(capacidade.variacaoGeral)}% sua Capacidade Adaptativa`}
            />
          )}
        </div>
      </div>
    </Card>
  )
}

function Row({ icone, texto }: { icone: React.ReactNode; texto: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {icone}
      <span>{texto}</span>
    </div>
  )
}
