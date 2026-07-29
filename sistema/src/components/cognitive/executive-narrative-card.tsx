import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Sparkles, TrendingUp, AlertTriangle, ChevronRight, Clock, CheckCircle2, BarChart3 } from 'lucide-react'
import type { NarrativaEmpresarial } from '@/engine'

interface ExecutiveNarrativeCardProps {
  narrativa: NarrativaEmpresarial | null
  nomeUsuario?: string
  impactoAdaptativo?: { capacidade: string; score: number; variacao: number }
}

const CONFIANCA_COR = (c: number) => {
  if (c >= 70) return 'text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20'
  if (c >= 40) return 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20'
  return 'text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20'
}

const PERGUNTAS = [
  { chave: 'Onde estamos', icone: <Sparkles className="h-3.5 w-3.5 text-indigo-500" /> },
  { chave: 'O que mudou', icone: <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> },
  { chave: 'O que realmente importa', icone: <AlertTriangle className="h-3.5 w-3.5 text-amber-500" /> },
  { chave: 'O que pode esperar', icone: <Clock className="h-3.5 w-3.5 text-blue-500" /> },
  { chave: 'Próximo melhor movimento', icone: <ChevronRight className="h-3.5 w-3.5 text-purple-500" /> },
]

export function ExecutiveNarrativeCard({ narrativa, nomeUsuario, impactoAdaptativo }: ExecutiveNarrativeCardProps) {
  if (!narrativa || narrativa.secoes.length === 0) return null

  const nome = nomeUsuario ? nomeUsuario.split(' ')[0] : ''

  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="p-5 pb-3 space-y-1 border-b border-border/40">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              Ritual Diário
            </p>
            <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full border', CONFIANCA_COR(narrativa.confiancaGeral))}>
              {narrativa.confiancaGeral}% de clareza
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{narrativa.dataReferencia}</p>
          <p className="text-sm text-foreground/90 leading-relaxed mt-1">
            {narrativa.saudacao}
          </p>
        </div>

        <div className="p-5 pt-4 space-y-4">
          {narrativa.secoes.slice(0, 5).map((secao, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="shrink-0">{PERGUNTAS[i]?.icone}</span>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {PERGUNTAS[i]?.chave ?? secao.pergunta}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed ml-6">{secao.resposta}</p>
              {secao.evidencias.length > 0 && (
                <div className="flex flex-wrap gap-1 ml-6">
                  {secao.evidencias.slice(0, 2).map((ev, j) => (
                    <span key={j} className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                      {ev}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {narrativa.recomendacaoPrincipal && (
          <div className="mx-5 mb-5 rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/10 p-3">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 mb-1">
              <CheckCircle2 className="h-3 w-3" />
              Próximo melhor movimento
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{narrativa.recomendacaoPrincipal}</p>
          </div>
        )}

        {impactoAdaptativo && (
          <div className="mx-5 mb-5 rounded-lg border border-purple-200 dark:border-purple-900/50 bg-purple-50/30 dark:bg-purple-950/10 p-3">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-purple-700 dark:text-purple-400 mb-1">
              <BarChart3 className="h-3 w-3" />
              Impacto na capacidade adaptativa
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Seguir esta recomendação pode aumentar sua capacidade de {impactoAdaptativo.capacidade.toLowerCase()} em até {Math.min(100, impactoAdaptativo.score + impactoAdaptativo.variacao)}% — de {impactoAdaptativo.score}% para {Math.min(100, impactoAdaptativo.score + Math.abs(impactoAdaptativo.variacao))}%.
            </p>
          </div>
        )}

        {narrativa.insightsAgregados.length > 0 && (
          <div className="px-5 pb-5 space-y-1.5">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Contexto adicional</p>
            {narrativa.insightsAgregados.slice(0, 2).map((insight, i) => (
              <p key={i} className="text-xs text-muted-foreground leading-relaxed flex items-start gap-1.5">
                <ChevronRight className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                {insight}
              </p>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
