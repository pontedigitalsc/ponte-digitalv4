'use client'

import { useState } from 'react'
import { Sparkles, Bot, Eye, ChevronRight, AlertCircle } from 'lucide-react'
import { ConfidenceRing } from './confidence-ring'
import { cn } from '@/lib/utils'

interface Hipótese {
  area: string
  descricao: string
  confianca: number
}

interface CognitivePanelProps {
  hipoteses: Hipótese[]
  confiancaGeral: number
  areasExploradas: string[]
  areasTotal: string[]
  aberto?: boolean
  onToggle?: () => void
}

function LacunaBadge() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
      ?
    </span>
  )
}

export function CognitivePanel({
  hipoteses,
  confiancaGeral,
  areasExploradas,
  areasTotal,
  aberto = false,
  onToggle,
}: CognitivePanelProps) {
  const areasNaoExploradas = areasTotal.filter((a) => !areasExploradas.includes(a))

  return (
    <div className={cn(
      'fixed right-0 top-0 h-full z-40 transition-all duration-300',
      aberto ? 'translate-x-0' : 'translate-x-full'
    )}>
      <button
        onClick={onToggle}
        className="absolute -left-8 top-1/2 -translate-y-1/2 flex h-16 w-8 items-center justify-center rounded-l-xl border border-r-0 bg-card shadow-sm hover:bg-accent transition-colors"
      >
        <ChevronRight className={cn('h-4 w-4 transition-transform', aberto && 'rotate-180')} />
      </button>

      <div className="h-full w-80 border-l bg-card p-4 overflow-y-auto shadow-xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex items-center justify-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold">Painel Cognitivo</h3>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ConfidenceRing value={confiancaGeral} size="lg" showLabel />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Hipóteses Ativas
            </h4>
            <div className="space-y-2">
              {hipoteses.length === 0 && (
                <p className="text-xs text-muted-foreground italic">Nenhuma hipótese formada ainda</p>
              )}
              {hipoteses.map((h, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-card p-2.5 animate-slide-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{h.area}</span>
                    <ConfidenceRing value={h.confianca} size="sm" />
                  </div>
                  <p className="text-[11px] text-muted-foreground">{h.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
              <Eye className="h-3 w-3" />
              Áreas da Empresa
            </h4>
            <div className="space-y-1">
              {areasExploradas.map((area) => (
                <div key={area} className="flex items-center gap-2 text-xs text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {area}
                </div>
              ))}
              {areasNaoExploradas.map((area) => (
                <div key={area} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <LacunaBadge />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
