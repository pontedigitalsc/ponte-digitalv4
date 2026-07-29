import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Sparkles, TrendingUp, Shield } from 'lucide-react'
import type { RetratoVivo, EmpresaTransformacao, ComparacaoTemporal } from '@/engine'

interface CompanyMirrorCardProps {
  retrato: RetratoVivo
  transformacao: EmpresaTransformacao | null
  comparacoes: ComparacaoTemporal[]
}

export function CompanyMirrorCard({ retrato, transformacao, comparacoes }: CompanyMirrorCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className="bg-gradient-to-br from-indigo-50/40 to-white dark:from-indigo-950/10 dark:to-slate-950 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          <p className="text-sm font-semibold">Quem sua empresa está se tornando</p>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">{retrato.identidade}</p>

        {transformacao && (
          <div className="rounded-lg border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/10 p-3 space-y-1">
            <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Transformação nos últimos {transformacao.periodo}</p>
            <p className="text-xs text-foreground leading-relaxed">{transformacao.antes}</p>
            <div className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
              <TrendingUp className="h-3 w-3" />
              <span>{transformacao.depois}</span>
            </div>
          </div>
        )}

        {retrato.forcas.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Forças</p>
            <div className="flex flex-wrap gap-1">
              {retrato.forcas.map((f, i) => (
                <span key={i} className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/50">{f}</span>
              ))}
            </div>
          </div>
        )}

        {retrato.riscos.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Riscos</p>
            <div className="flex flex-wrap gap-1">
              {retrato.riscos.map((r, i) => (
                <span key={i} className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-900/50">{r}</span>
              ))}
            </div>
          </div>
        )}

        {retrato.ultimos90Dias && (
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Últimos 90 dias</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{retrato.ultimos90Dias}</p>
          </div>
        )}

        {comparacoes.length > 0 && (
          <div className="space-y-1">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Indicadores</p>
            <div className="grid grid-cols-2 gap-1">
              {comparacoes.slice(0, 4).map((c, i) => (
                <div key={i} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Shield className="h-2.5 w-2.5 shrink-0" />
                  <span>{c.indicador}: {c.antes} → {c.depois}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
