import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Trash2 } from 'lucide-react'
import { CATEGORIA_EVIDENCIA } from '@/constants'
import type { AprendizadoExplicito } from '@/engine'

interface ConversationKnowledgeCardProps {
  aprendizados: AprendizadoExplicito[]
  onDesativar?: (id: string) => void
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

const CATEGORIA_COR: Record<string, string> = {
  VALORES: 'text-violet-600 bg-violet-50',
  PREFERENCIAS: 'text-blue-600 bg-blue-50',
  REGRAS: 'text-red-600 bg-red-50',
  OBJETIVOS: 'text-emerald-600 bg-emerald-50',
  ROTINAS: 'text-amber-600 bg-amber-50',
  EQUIPE: 'text-cyan-600 bg-cyan-50',
  CLIENTES: 'text-indigo-600 bg-indigo-50',
  FINANCEIRO: 'text-green-600 bg-green-50',
  OPERACAO: 'text-orange-600 bg-orange-50',
  VISAO: 'text-purple-600 bg-purple-50',
  RISCOS: 'text-rose-600 bg-rose-50',
}

export function ConversationKnowledgeCard({ aprendizados, onDesativar }: ConversationKnowledgeCardProps) {
  if (!aprendizados.length) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          O que aprendemos com você
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {aprendizados.map((a) => (
          <div key={a.id} className="flex items-start justify-between gap-2 rounded-lg border p-3">
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${CATEGORIA_COR[a.categoria] ?? 'text-muted-foreground bg-muted'}`}>
                  {CATEGORIA_LABEL[a.categoria] ?? a.categoria}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(a.criadoEm).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className="text-sm leading-snug">"{a.descricao}"</p>
              {a.contexto && (
                <p className="text-xs text-muted-foreground italic">{a.contexto}</p>
              )}
            </div>
            {onDesativar && (
              <button
                onClick={() => onDesativar(a.id)}
                className="shrink-0 rounded p-1 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Remover"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
