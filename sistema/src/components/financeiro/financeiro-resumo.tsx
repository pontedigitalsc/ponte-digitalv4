'use client'

import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Clock, BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/avatar'
import { formatarMoeda, cn } from '@/lib/utils'

interface Resumo {
  receitaLiquida: number
  despesaLiquida: number
  lucro: number
  margem: number
  receitaPendente: number
  vencidas: number
  mrr: number
  receitaAno: number
}

interface FinanceiroResumoProps {
  resumo: Resumo | null
  loading?: boolean
}

export function FinanceiroResumo({ resumo, loading }: FinanceiroResumoProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    )
  }

  if (!resumo) return null

  const lucroPositivo = resumo.lucro >= 0

  const cards = [
    {
      label:   'Receita recebida',
      valor:   formatarMoeda(resumo.receitaLiquida),
      sub:     'no mês atual',
      icone:   TrendingUp,
      cor:     'text-emerald-600',
      bgIcone: 'bg-emerald-100 dark:bg-emerald-950/40',
      corIcone:'text-emerald-600',
    },
    {
      label:   'Despesas pagas',
      valor:   formatarMoeda(resumo.despesaLiquida),
      sub:     'no mês atual',
      icone:   TrendingDown,
      cor:     'text-destructive',
      bgIcone: 'bg-destructive/10',
      corIcone:'text-destructive',
    },
    {
      label:   lucroPositivo ? 'Lucro líquido' : 'Prejuízo',
      valor:   formatarMoeda(Math.abs(resumo.lucro)),
      sub:     `margem de ${resumo.margem}%`,
      icone:   BarChart3,
      cor:     lucroPositivo ? 'text-primary' : 'text-destructive',
      bgIcone: lucroPositivo ? 'bg-primary/10' : 'bg-destructive/10',
      corIcone:lucroPositivo ? 'text-primary'  : 'text-destructive',
    },
    {
      label:   'A receber',
      valor:   formatarMoeda(resumo.receitaPendente),
      sub:     resumo.vencidas > 0 ? `${resumo.vencidas} vencida${resumo.vencidas > 1 ? 's' : ''}` : 'em dia',
      icone:   resumo.vencidas > 0 ? AlertTriangle : Clock,
      cor:     resumo.vencidas > 0 ? 'text-amber-600' : 'text-muted-foreground',
      bgIcone: resumo.vencidas > 0 ? 'bg-amber-100 dark:bg-amber-950/40' : 'bg-muted',
      corIcone:resumo.vencidas > 0 ? 'text-amber-600' : 'text-muted-foreground',
    },
  ]

  return (
    <div className="space-y-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icone
          return (
            <Card key={card.label}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs text-muted-foreground font-medium leading-tight">{card.label}</p>
                  <div className={cn('rounded-lg p-1.5', card.bgIcone)}>
                    <Icon className={cn('h-3.5 w-3.5', card.corIcone)} />
                  </div>
                </div>
                <p className={cn('text-xl font-bold', card.cor)}>{card.valor}</p>
                <p className={cn('text-xs mt-0.5', card.cor === 'text-muted-foreground' ? 'text-muted-foreground' : card.cor)}>
                  {card.sub}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* MRR + Ano */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">MRR</p>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{formatarMoeda(resumo.mrr)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Receita mensal recorrente</p>
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Acumulado no ano</p>
            </div>
            <p className="text-2xl font-bold text-primary">{formatarMoeda(resumo.receitaAno)}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Em receitas recebidas</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
