'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Loader2, Send, CheckCircle2 } from 'lucide-react'
import type { PerguntaRapida } from '@/engine'

const CATEGORIA_EMOJI: Record<string, string> = {
  VALORES: '💎',
  PREFERENCIAS: '❤️',
  REGRAS: '📋',
  OBJETIVOS: '🎯',
  ROTINAS: '🔄',
  EQUIPE: '👥',
  CLIENTES: '🤝',
  FINANCEIRO: '💰',
  OPERACAO: '⚙️',
  VISAO: '🔭',
  RISCOS: '⚠️',
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

interface QuickLearningQuestionProps {
  perguntas: PerguntaRapida[]
  onResponder: (pergunta: PerguntaRapida, resposta: string) => Promise<void>
  jaRespondidas: string[]
}

export function QuickLearningQuestion({ perguntas, onResponder, jaRespondidas }: QuickLearningQuestionProps) {
  const [perguntaAtiva, setPerguntaAtiva] = useState<PerguntaRapida | null>(null)
  const [resposta, setResposta] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [ultimaResposta, setUltimaResposta] = useState<string | null>(null)

  const disponiveis = perguntas.filter((p) => !jaRespondidas.includes(p.contexto))

  if (!disponiveis.length) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Perguntas respondidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Você já respondeu tudo por agora. Conforme conversamos, novas perguntas aparecem.
          </p>
        </CardContent>
      </Card>
    )
  }

  async function handleSubmit() {
    if (!perguntaAtiva || !resposta.trim()) return
    setEnviando(true)
    try {
      await onResponder(perguntaAtiva, resposta.trim())
      setUltimaResposta(perguntaAtiva.contexto)
      setPerguntaAtiva(null)
      setResposta('')
    } finally {
      setEnviando(false)
    }
  }

  function iniciar(pergunta: PerguntaRapida) {
    setPerguntaAtiva(pergunta)
    setResposta('')
    setUltimaResposta(null)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Perguntas rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {!perguntaAtiva && (
          <div className="grid gap-2">
            {disponiveis.slice(0, 5).map((p) => (
              <button
                key={p.contexto}
                onClick={() => iniciar(p)}
                className="flex items-center gap-3 rounded-lg border p-3 text-left text-sm hover:bg-muted/50 transition-colors"
              >
                <span className="text-lg">{CATEGORIA_EMOJI[p.categoria] ?? '💡'}</span>
                <span className="flex-1">{p.pergunta}</span>
                <Send className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        )}

        {perguntaAtiva && (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-sm font-medium">{perguntaAtiva.pergunta}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Sobre: {CATEGORIA_LABEL[perguntaAtiva.categoria] ?? perguntaAtiva.categoria.toLowerCase()}
              </p>
            </div>
            <textarea
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
              placeholder="Escreva à vontade..."
              className="w-full min-h-[80px] rounded-md border bg-background p-3 text-sm outline-none focus:ring-1 focus:ring-primary resize-none"
              disabled={enviando}
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setPerguntaAtiva(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                disabled={enviando}
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!resposta.trim() || enviando}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {enviando ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                Guardar
              </button>
            </div>
            {ultimaResposta === perguntaAtiva.contexto && (
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Guardei! Vou lembrar disso.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
