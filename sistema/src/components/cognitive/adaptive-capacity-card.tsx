import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, BarChart3, ChevronRight, Sparkles } from 'lucide-react'
import type { AdaptiveCapacity, Capacidade } from '@/engine'

interface AdaptiveCapacityCardProps {
  capacity: AdaptiveCapacity
}

const NIVEL_COR: Record<string, string> = {
  INICIAL: 'text-slate-500 border-slate-300',
  EM_DESENVOLVIMENTO: 'text-blue-500 border-blue-300',
  AVANCADO: 'text-indigo-500 border-indigo-300',
  REFERENCIA: 'text-emerald-500 border-emerald-300',
}

const NIVEL_ROTULO: Record<string, string> = {
  INICIAL: 'Inicial',
  EM_DESENVOLVIMENTO: 'Em desenvolvimento',
  AVANCADO: 'Avançado',
  REFERENCIA: 'Referência',
}

export function AdaptiveCapacityCard({ capacity }: AdaptiveCapacityCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-4 w-4 text-indigo-500" />
          Capacidades
          <span className={cn('ml-auto text-xs font-medium px-2 py-0.5 rounded-full border', NIVEL_COR[capacity.nivelGeral])}>
            {NIVEL_ROTULO[capacity.nivelGeral] ?? capacity.nivelGeral}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <span className={cn(
            'text-3xl font-bold',
            capacity.scoreGeral >= 60 ? 'text-emerald-500' : capacity.scoreGeral >= 30 ? 'text-amber-500' : 'text-red-500'
          )}>
            {capacity.scoreGeral}
          </span>
          <span className="text-sm text-muted-foreground">/ 100</span>
          <div className="flex-1 h-2 rounded-full bg-muted ml-2">
            <div
              className={cn(
                'h-2 rounded-full transition-all',
                capacity.scoreGeral >= 60 ? 'bg-emerald-500' : capacity.scoreGeral >= 30 ? 'bg-amber-500' : 'bg-red-500'
              )}
              style={{ width: `${capacity.scoreGeral}%` }}
            />
          </div>
          {capacity.variacaoGeral !== 0 && (
            <span className={cn(
              'flex items-center gap-0.5 text-xs font-medium',
              capacity.variacaoGeral > 0 ? 'text-emerald-500' : 'text-red-500'
            )}>
              {capacity.variacaoGeral > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(capacity.variacaoGeral)}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Habilidades em desenvolvimento</p>
          {capacity.capacidades.map((cap) => (
            <CapacidadeCompleta key={cap.id} capacidade={cap} />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="rounded-lg bg-muted/50 p-2.5 space-y-0.5">
            <span className="text-emerald-500 font-medium">{capacity.maiorCapacidade}</span>
            <p className="text-[10px]">Maior capacidade</p>
            <p className="text-[10px]">Ponto forte consolidado</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-2.5 space-y-0.5">
            <span className="text-amber-500 font-medium">{capacity.menorCapacidade}</span>
            <p className="text-[10px]">Próximo nível</p>
            <p className="text-[10px]">Capacidade a desenvolver</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CapacidadeCompleta({ capacidade }: { capacidade: Capacidade }) {
  const nivel = capacidade.score >= 70 ? 'Referência' : capacidade.score >= 45 ? 'Avançado' : capacidade.score >= 20 ? 'Em desenvolvimento' : 'Inicial'
  const nivelCor = capacidade.score >= 70 ? 'text-emerald-500' : capacidade.score >= 45 ? 'text-indigo-500' : capacidade.score >= 20 ? 'text-blue-500' : 'text-slate-500'

  return (
    <div className="rounded-lg border border-border/50 p-2.5 space-y-1.5 hover:border-border/80 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">{capacidade.nome}</span>
          <span className={cn('text-[9px] font-medium', nivelCor)}>{nivel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn('text-xs font-medium', capacidade.variacao > 0 ? 'text-emerald-500' : capacidade.variacao < 0 ? 'text-red-500' : 'text-muted-foreground')}>
            {capacidade.variacao > 0 ? '+' : ''}{capacidade.variacao}%
          </span>
          {capacidade.variacao > 0 ? <TrendingUp className="h-3 w-3 text-emerald-500" /> : capacidade.variacao < 0 ? <TrendingDown className="h-3 w-3 text-red-500" /> : null}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className={cn('h-full rounded-full', capacidade.score >= 60 ? 'bg-emerald-500' : capacidade.score >= 30 ? 'bg-amber-500' : 'bg-red-500')}
            style={{ width: `${capacidade.score}%` }}
          />
        </div>
        <span className={cn('text-[10px] font-medium', capacidade.score >= 60 ? 'text-emerald-500' : 'text-amber-500')}>{capacidade.score}%</span>
      </div>

      <p className="text-[10px] text-muted-foreground leading-relaxed">{capacidade.descricao}</p>

      <div className="grid grid-cols-2 gap-1">
        <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                  <ChevronRight className="h-2.5 w-2.5 text-emerald-400" />
          <span>Última melhoria: {capacidade.variacao > 0 ? 'Sim' : 'Não'}</span>
        </div>
                <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                  <Sparkles className="h-2.5 w-2.5 text-amber-400" />
                  <span>Próximo nível: {capacidade.score >= 70 ? 'Consolidar' : capacidade.score >= 45 ? 'Avançar' : capacidade.score >= 20 ? 'Estruturar' : 'Iniciar'}</span>
                </div>
      </div>
    </div>
  )
}
