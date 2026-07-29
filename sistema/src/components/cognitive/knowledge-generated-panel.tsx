import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Sparkles, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react'
import type { MemoriaEstrategica } from '@/engine'

interface KnowledgeGeneratedPanelProps {
  totalConhecimentos: number
  totalHipoteses: number
  totalDescartados: number
  memoriaEstrategica: MemoriaEstrategica
  evolucaoMaturidade: number
}

export function KnowledgeGeneratedPanel({
  totalConhecimentos,
  totalHipoteses,
  totalDescartados,
  memoriaEstrategica,
  evolucaoMaturidade,
}: KnowledgeGeneratedPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          O que sua empresa aprendeu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <MiniCard
            icone={<Sparkles className="h-3.5 w-3.5 text-emerald-500" />}
            label="Conhecimentos validados"
            valor={totalConhecimentos}
            bg="bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-900/40"
          />
          <MiniCard
            icone={<TrendingDown className="h-3.5 w-3.5 text-red-400" />}
            label="Hipóteses descartadas"
            valor={totalDescartados}
            bg="bg-red-50/30 dark:bg-red-950/10 border-red-200/50 dark:border-red-900/40"
          />
          <MiniCard
            icone={<TrendingUp className="h-3.5 w-3.5 text-blue-500" />}
            label="Padrões descobertos"
            valor={memoriaEstrategica.padroesIdentificados.length}
            bg="bg-blue-50/30 dark:bg-blue-950/10 border-blue-200/50 dark:border-blue-900/40"
          />
          <MiniCard
            icone={<CheckCircle2 className="h-3.5 w-3.5 text-amber-500" />}
            label="Boas práticas criadas"
            valor={memoriaEstrategica.totalRegistros}
            bg="bg-amber-50/30 dark:bg-amber-950/10 border-amber-200/50 dark:border-amber-900/40"
          />
        </div>

        {memoriaEstrategica.maioresAprendizados.length > 0 && (
          <div className="mt-4 space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Principais aprendizados</p>
            {memoriaEstrategica.maioresAprendizados.slice(0, 3).map((a, i) => (
              <p key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                <span className="text-emerald-500 mt-0.5">•</span>
                {a}
              </p>
            ))}
          </div>
        )}

        {memoriaEstrategica.padroesIdentificados.length > 0 && (
          <div className="mt-3 space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Padrões identificados</p>
            {memoriaEstrategica.padroesIdentificados.slice(0, 3).map((p, i) => (
              <p key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                <span className="text-blue-500 mt-0.5">•</span>
                {p}
              </p>
            ))}
          </div>
        )}

        {totalHipoteses > 0 && (
          <div className="mt-3 pt-3 border-t border-border/40 text-[11px] text-muted-foreground">
            {totalHipoteses} hipótese{totalHipoteses !== 1 ? 's' : ''} em andamento · {totalDescartados} descartada{totalDescartados !== 1 ? 's' : ''} · Maturidade {evolucaoMaturidade > 0 ? '+' : ''}{evolucaoMaturidade}%
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MiniCard({ icone, label, valor, bg }: { icone: React.ReactNode; label: string; valor: number; bg: string }) {
  return (
    <div className={cn('rounded-lg border p-2.5 space-y-0.5', bg)}>
      <div className="flex items-center gap-1">
        {icone}
        <span className="text-lg font-bold">{valor}</span>
      </div>
      <p className="text-[9px] text-muted-foreground leading-tight">{label}</p>
    </div>
  )
}
