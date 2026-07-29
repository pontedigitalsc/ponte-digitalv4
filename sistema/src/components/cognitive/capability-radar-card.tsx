import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react'
import type { RadarCapacidades, CapacidadeRadar } from '@/engine'

interface CapabilityRadarCardProps {
  radar: RadarCapacidades
}

function NivelSection({ titulo, cor, icone, items }: { titulo: string; cor: string; icone: React.ReactNode; items: CapacidadeRadar[] }) {
  if (items.length === 0) return null
  return (
    <div className="space-y-1.5">
      <p className={cn('text-[11px] font-medium flex items-center gap-1', cor)}>
        {icone}
        {titulo}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <span key={i} className={cn('text-[10px] px-2 py-0.5 rounded-full border', cor, 'bg-opacity-10')}>
            {item.nome}: {item.score}%
          </span>
        ))}
      </div>
    </div>
  )
}

export function CapabilityRadarCard({ radar }: CapabilityRadarCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingUp className="h-4 w-4 text-indigo-500" />
          Radar de Capacidades
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <NivelSection
          titulo="Muito Forte"
          cor="text-emerald-600 dark:text-emerald-400"
          icone={<CheckCircle2 className="h-3 w-3" />}
          items={radar.muitoForte}
        />
        <NivelSection
          titulo="Forte"
          cor="text-blue-600 dark:text-blue-400"
          icone={<TrendingUp className="h-3 w-3" />}
          items={radar.forte}
        />
        <NivelSection
          titulo="Em Evolução"
          cor="text-amber-600 dark:text-amber-400"
          icone={<Sparkles className="h-3 w-3" />}
          items={radar.emEvolucao}
        />
        <NivelSection
          titulo="Crítica"
          cor="text-red-600 dark:text-red-400"
          icone={<AlertTriangle className="h-3 w-3" />}
          items={radar.critica}
        />

        {radar.sugestaoFoco && (
          <div className="rounded-lg border border-amber-100 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/10 p-2.5">
            <p className="text-[10px] font-medium text-amber-500 mb-0.5">Sugestão de foco</p>
            <p className="text-xs text-muted-foreground">{radar.sugestaoFoco}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
