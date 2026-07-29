import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Clock, TrendingUp, AlertTriangle, Check } from 'lucide-react'

interface EntradaMemoria {
  tipo: string
  descricao: string
  data: Date
  confianca?: number
}

interface CognitiveMemoryCardProps {
  recentes: EntradaMemoria[]
  totalMemorias: number
  idadeMedia: number
  hipotesesAtivas: number
  conhecimentosConfirmados: number
}

const TIPO_COR: Record<string, string> = {
  evidencia: 'border-l-emerald-400',
  hipotese: 'border-l-amber-400',
  descoberta: 'border-l-blue-400',
  mudanca: 'border-l-purple-400',
  sinal: 'border-l-red-400',
  acao: 'border-l-sky-400',
  aprendizado: 'border-l-indigo-400',
}

const TIPO_ROTULO: Record<string, string> = {
  evidencia: 'Evidência',
  hipotese: 'Hipótese',
  descoberta: 'Descoberta',
  mudanca: 'Mudança',
  sinal: 'Sinal',
  acao: 'Ação',
  aprendizado: 'Aprendizado',
}

function formatarTempo(data: Date): string {
  const diff = Date.now() - new Date(data).getTime()
  const horas = Math.floor(diff / (1000 * 60 * 60))
  if (horas < 1) return 'Agora'
  if (horas < 24) return `${horas}h atrás`
  const dias = Math.floor(horas / 24)
  if (dias < 30) return `${dias}d atrás`
  return `${Math.floor(dias / 30)}m atrás`
}

export function CognitiveMemoryCard({
  recentes,
  totalMemorias,
  idadeMedia,
  hipotesesAtivas,
  conhecimentosConfirmados,
}: CognitiveMemoryCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-amber-500" />
          Memória Empresarial
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {totalMemorias} registros
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded bg-muted/30 p-2 space-y-0.5">
            <p className="font-semibold text-lg">{idadeMedia}</p>
            <p className="text-muted-foreground">Dias médios</p>
          </div>
          <div className="rounded bg-muted/30 p-2 space-y-0.5">
            <p className="font-semibold text-lg text-amber-500">{hipotesesAtivas}</p>
            <p className="text-muted-foreground">Hipóteses</p>
          </div>
          <div className="rounded bg-muted/30 p-2 space-y-0.5">
            <p className="font-semibold text-lg text-emerald-500">{conhecimentosConfirmados}</p>
            <p className="text-muted-foreground">Confirmados</p>
          </div>
        </div>

        {recentes.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Registros recentes
            </p>
            <div className="space-y-1">
              {recentes.slice(0, 5).map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'text-xs border-l-2 pl-2.5 py-1.5 space-y-0.5',
                    TIPO_COR[m.tipo] ?? 'border-l-muted-foreground/30'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground/80">
                      {TIPO_ROTULO[m.tipo] ?? m.tipo}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatarTempo(m.data)}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{m.descricao}</p>
                  {m.confianca !== undefined && (
                    <div className="flex items-center gap-1">
                      <span className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        m.confianca >= 0.6 ? 'bg-emerald-500' : m.confianca >= 0.3 ? 'bg-amber-500' : 'bg-red-500'
                      )} />
                      <span className="text-[10px] text-muted-foreground">
                        {Math.round(m.confianca * 100)}% confiança
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {recentes.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <AlertTriangle className="h-5 w-5 text-muted-foreground/50" />
            <p className="text-xs text-muted-foreground italic">Nenhum registro de memória ainda</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
