import type { CentroCognitivoData } from '@/engine'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, AlertTriangle, Sparkles } from 'lucide-react'

const STATUS_CONFIG = {
  POSITIVO: { icone: TrendingUp, cor: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50' },
  ATENCAO: { icone: AlertTriangle, cor: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50' },
  CRITICO: { icone: TrendingDown, cor: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50' },
} as const

interface CentroCognitivoBannerProps {
  data: CentroCognitivoData
}

export function CentroCognitivoBanner({ data }: CentroCognitivoBannerProps) {
  const cfg = STATUS_CONFIG[data.estadoGeral.status]
  const Icone = cfg.icone

  return (
    <div className={cn('rounded-xl border p-5 space-y-4', cfg.bg)}>
      <div className="flex items-start gap-3">
        <div className={cn('rounded-lg p-2 shrink-0', data.estadoGeral.status === 'POSITIVO' ? 'bg-emerald-100 dark:bg-emerald-900/30' : data.estadoGeral.status === 'ATENCAO' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-red-100 dark:bg-red-900/30')}>
          <Icone className={cn('h-5 w-5', cfg.cor)} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            {data.estadoGeral.titulo}
            <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full', cfg.cor)}>
              {data.estadoGeral.status === 'POSITIVO' ? 'Estável' : data.estadoGeral.status === 'ATENCAO' ? 'Atenção' : 'Crítico'}
            </span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{data.estadoGeral.resumo}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Metrica rotulo="Maturidade" valor={`${data.statusAtual.scoreMaturidade}`} sufixo="/100" cor={data.statusAtual.scoreMaturidade >= 60 ? 'text-emerald-500' : data.statusAtual.scoreMaturidade >= 30 ? 'text-amber-500' : 'text-red-500'} />
        <Metrica rotulo="Saúde" valor={`${data.statusAtual.scoreSaude}`} sufixo="/100" cor={data.statusAtual.scoreSaude >= 60 ? 'text-emerald-500' : data.statusAtual.scoreSaude >= 30 ? 'text-amber-500' : 'text-red-500'} />
        <Metrica rotulo="Confiança" valor={`${Math.round(data.statusAtual.confiancaMedia * 100)}`} sufixo="%" cor={data.statusAtual.confiancaMedia >= 0.6 ? 'text-emerald-500' : data.statusAtual.confiancaMedia >= 0.3 ? 'text-amber-500' : 'text-red-500'} />
        <Metrica rotulo="Evolução" valor={`${data.mudancas.evolucaoGeral > 0 ? '+' : ''}${data.mudancas.evolucaoGeral}`} sufixo="%" cor={data.mudancas.evolucaoGeral >= 10 ? 'text-emerald-500' : data.mudancas.evolucaoGeral >= 0 ? 'text-muted-foreground' : 'text-red-500'} />
      </div>

      {data.pontosAtencao.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Pontos de atenção
          </p>
          <div className="flex flex-wrap gap-2">
            {data.pontosAtencao.map((p, i) => (
              <span key={i} className={cn(
                'text-[11px] px-2 py-0.5 rounded-full border',
                p.severidade === 'ALTA' ? 'border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20' : 'border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20'
              )}>
                {p.categoria}: {p.descricao}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Metrica({ rotulo, valor, sufixo, cor }: { rotulo: string; valor: string; sufixo: string; cor: string }) {
  return (
    <div className="rounded-lg bg-background/80 dark:bg-background/40 p-2.5">
      <p className="text-[10px] text-muted-foreground">{rotulo}</p>
      <p className="text-lg font-bold mt-0.5">
        <span className={cor}>{valor}</span>
        <span className="text-xs text-muted-foreground font-normal ml-0.5">{sufixo}</span>
      </p>
    </div>
  )
}
