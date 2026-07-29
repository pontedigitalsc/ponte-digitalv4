import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Circle, TrendingUp } from 'lucide-react'
import type { MemoriaEstrategica } from '@/engine'

interface StrategicMemoryCardProps {
  memoria: MemoriaEstrategica
}

export function StrategicMemoryCard({ memoria }: StrategicMemoryCardProps) {
  if (memoria.totalRegistros === 0) return null
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-indigo-500" />
          Memoria Estrategica
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {memoria.taxaAcertos}% acerto
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {memoria.registros.slice(0, 3).map((r) => (
          <div key={r.id} className="rounded-lg border border-border/50 p-2.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{r.titulo}</span>
              {r.funcionou
                ? <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                : <Circle className="h-3 w-3 text-red-500" />
              }
            </div>
            <p className="text-[10px] text-muted-foreground">{r.porQue}</p>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/30">
              <div>
                <p className="text-[10px] font-medium text-emerald-500">Repetir</p>
                <p className="text-[9px] text-muted-foreground">{r.repetir}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium text-red-500">Nunca repetir</p>
                <p className="text-[9px] text-muted-foreground">{r.nuncaRepetir}</p>
              </div>
            </div>
          </div>
        ))}
        {memoria.padroesIdentificados.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground/60">Padroes identificados</p>
            {memoria.padroesIdentificados.map((p, i) => (
              <p key={i} className="text-[10px] text-muted-foreground">{p}</p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}