import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingDown, Sparkles, TrendingUp } from 'lucide-react'
import type { MemoriaEstrategica } from '@/engine'

interface MemoryShiftCardProps {
  memoriaEstrategica: MemoriaEstrategica
}

export function MemoryShiftCard({ memoriaEstrategica }: MemoryShiftCardProps) {
  const shifts = memoriaEstrategica.registros.length > 0
    ? memoriaEstrategica.registros.slice(0, 4)
    : []

  if (shifts.length === 0 && memoriaEstrategica.maioresAprendizados.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-amber-500" />
          Memória Viva
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Antes nós acreditávamos...</p>

        {shifts.map((r, i) => (
          <div key={r.id} className="space-y-1">
            <div className="flex items-start gap-2">
              <div className="flex flex-col items-center mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {i < shifts.length - 1 && <div className="w-px h-3 bg-border" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground leading-relaxed">{r.nuncaRepetir}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 ml-4">
              <TrendingDown className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-foreground font-medium leading-relaxed">{r.repetir}</p>
                {r.aprendemos && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">{r.aprendemos.substring(0, 80)}{r.aprendemos.length > 80 ? '...' : ''}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {memoriaEstrategica.maioresAprendizados.length > 0 && (
          <div className="mt-2 pt-3 border-t border-border/40 space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Hoje sabemos que</p>
            {memoriaEstrategica.maioresAprendizados.slice(0, 3).map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <Sparkles className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-xs text-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        )}

        {memoriaEstrategica.totalRegistros > 0 && (
          <div className="text-[11px] text-muted-foreground pt-1">
            {memoriaEstrategica.totalRegistros} decisão(ões) revisada(s) · Taxa de acerto: {memoriaEstrategica.taxaAcertos}%
          </div>
        )}
      </CardContent>
    </Card>
  )
}
