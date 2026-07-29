import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Circle } from 'lucide-react'
import type { FundadorVisaoDiaria } from '@/engine'

interface FounderPanelCardProps {
  visao: FundadorVisaoDiaria
}

export function FounderPanelCard({ visao }: FounderPanelCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          Painel do Fundador
          <span className="ml-auto flex items-center gap-1 text-xs">
            {visao.tendencia === 'SUBINDO' && <TrendingUp className="h-3 w-3 text-emerald-500" />}
            {visao.tendencia === 'CAINDO' && <TrendingDown className="h-3 w-3 text-red-500" />}
            {visao.tendencia === 'ESTAVEL' && <Circle className="h-3 w-3 text-amber-500" />}
            <span className={cn(
              'font-medium',
              visao.tendencia === 'SUBINDO' && 'text-emerald-500',
              visao.tendencia === 'CAINDO' && 'text-red-500',
              visao.tendencia === 'ESTAVEL' && 'text-amber-500',
            )}>
              {visao.tendencia}
            </span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/50 p-2.5">
            <p className="text-[10px] text-muted-foreground/60">Capacidade Adaptativa</p>
            <p className="text-sm font-semibold">{visao.scoreCapacidadeAdaptativa}%</p>
          </div>
          <div className="rounded-lg border border-border/50 p-2.5">
            <p className="text-[10px] text-muted-foreground/60">Capital Cognitivo</p>
            <p className="text-sm font-semibold">{visao.scoreCapitalCognitivo}</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground/60">Evolucao</p>
              <p className="text-[11px] text-muted-foreground">{visao.evolucaoEmpresa}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 text-xs mt-0.5 shrink-0">+</span>
            <div>
              <p className="text-[10px] text-muted-foreground/60">Patrimonio cresceu</p>
              <p className="text-[11px] text-muted-foreground">{visao.patrimonioCresceu}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-xs mt-0.5 shrink-0">!</span>
            <div>
              <p className="text-[10px] text-muted-foreground/60">Capacidade estagnada</p>
              <p className="text-[11px] text-muted-foreground">{visao.capacidadeEstagnada}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 text-xs mt-0.5 shrink-0">~</span>
            <div>
              <p className="text-[10px] text-muted-foreground/60">Risco principal</p>
              <p className="text-[11px] text-muted-foreground">{visao.riscoPrincipal}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}