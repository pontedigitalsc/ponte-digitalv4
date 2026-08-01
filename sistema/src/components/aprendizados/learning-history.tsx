import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Bot, Sparkles } from 'lucide-react'
import type { AprendizadoExplicito } from '@/engine'

interface LearningHistoryProps {
  aprendizados: AprendizadoExplicito[]
}

const ORIGEM_ICONE: Record<string, React.ReactNode> = {
  CONVERSA: <Sparkles className="h-3.5 w-3.5 text-blue-500" />,
  MANUAL: <Bot className="h-3.5 w-3.5 text-violet-500" />,
  PERGUNTA: <Sparkles className="h-3.5 w-3.5 text-amber-500" />,
}

const ORIGEM_LABEL: Record<string, string> = {
  CONVERSA: 'Nossa conversa',
  MANUAL: 'Registrado por você',
  PERGUNTA: 'Pergunta rápida',
}

const CATEGORIA_LABEL: Record<string, string> = {
  VALORES: 'Valores',
  PREFERENCIAS: 'Preferências',
  REGRAS: 'Regras',
  OBJETIVOS: 'Objetivos',
  ROTINAS: 'Rotinas',
  EQUIPE: 'Equipe',
  CLIENTES: 'Clientes',
  FINANCEIRO: 'Financeiro',
  OPERACAO: 'Operação',
  VISAO: 'Visão',
  RISCOS: 'Riscos',
}

export function LearningHistory({ aprendizados }: LearningHistoryProps) {
  if (!aprendizados.length) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Histórico de descobertas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {aprendizados.map((a, idx) => {
            const icone = ORIGEM_ICONE[a.origem] ?? <Bot className="h-3.5 w-3.5 text-muted-foreground" />
            const origemLabel = ORIGEM_LABEL[a.origem] ?? a.origem
            const categoriaLabel = CATEGORIA_LABEL[a.categoria] ?? a.categoria
            const data = a.criadoEm ? new Date(a.criadoEm).toLocaleDateString('pt-BR') : ''

            return (
              <div key={a.id} className="flex gap-3 pb-3 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                    {icone}
                  </div>
                  {idx < aprendizados.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium">{categoriaLabel}</span>
                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{origemLabel}</span>
                    {data && <span className="text-[10px] text-muted-foreground">{data}</span>}
                  </div>
                  <p className="text-sm mt-0.5">"{a.descricao}"</p>
                  {a.contexto && (
                    <p className="text-xs text-muted-foreground italic mt-0.5">{a.contexto}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
