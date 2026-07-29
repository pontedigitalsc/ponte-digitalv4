'use client'

import { useState, useEffect } from 'react'
import { Bot, Sparkles, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PulseData {
  hipoteses: number
  confiancaGeral: number
  areasExploradas: string[]
  evidenciasRecentes: number
  aprendizadosRecentes: number
}

function getPulseColor(confianca: number): string {
  if (confianca >= 60) return 'bg-emerald-500 shadow-emerald-500/50'
  if (confianca >= 30) return 'bg-amber-500 shadow-amber-500/50'
  return 'bg-muted-foreground/30'
}

export function CognitivePulse() {
  const [data, setData] = useState<PulseData | null>(null)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/cognitive/panel')
        if (!res.ok) return
        const json = await res.json()
        setData({
          hipoteses: json.data.hipoteses.length,
          confiancaGeral: json.data.confiancaGeral,
          areasExploradas: json.data.areasExploradas,
          evidenciasRecentes: Object.values(json.data.estado?.contexto?.evidenciasChave ?? []).length,
          aprendizadosRecentes: json.data.memoriaRecente?.length ?? 0,
        })
      } catch {
        // Silencioso — não quebra a UI
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!data) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="h-2 w-2 rounded-full bg-muted-foreground/20 animate-pulse" />
        Inicializando...
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setAberto(!aberto)}
        className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-xs hover:bg-accent transition-colors"
      >
        <div className={cn('h-2 w-2 rounded-full animate-pulse shadow-lg', getPulseColor(data.confiancaGeral))} />
        <Bot className="h-3 w-3 text-primary" />
        <span className="text-muted-foreground">
          {data.confiancaGeral}% confiança
        </span>
        <ChevronRight className={cn('h-3 w-3 text-muted-foreground transition-transform', aberto && 'rotate-90')} />
      </button>

      {aberto && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border bg-card p-4 shadow-xl z-50 animate-slide-up">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <h4 className="text-xs font-semibold">Estado Cognitivo</h4>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Hipóteses ativas</span>
                <span className="font-medium">{data.hipoteses}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Áreas exploradas</span>
                <span className="font-medium">{data.areasExploradas.length}/7</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Confiança geral</span>
                <span className="font-medium">{data.confiancaGeral}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Aprendizados recentes</span>
                <span className="font-medium">{data.aprendizadosRecentes}</span>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>Sistema cognitivo ativo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
