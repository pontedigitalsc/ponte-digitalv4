'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, Sparkles, RefreshCw } from 'lucide-react'
import { ChatMessage } from './chat-message'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { apiFetchStream, mensagemDeErro } from '@/lib/api-client'
import { CATEGORIA_EVIDENCIA } from '@/constants'

interface Mensagem {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ContextoDecisao {
  prioridade: string
  motivo: string
  confianca: number
  evidenciasChave: Array<{ descricao: string; origem: string }>
  acaoSugerida?: string
  setoresEstaveis?: string[]
  mudancasRecentes?: string[]
  tendencia?: string
  memoriaRecente?: Array<{ tipo: string; descricao: string }>
}

interface IdentidadeResumida {
  empresaConhecida: boolean
  verdadesEstaveis: string[]
  hipoteses: string[]
  mudancasRecentes: string[]
  ultimaConversa: Date | string | null
}

interface DecisaoResumida {
  id: string
  titulo: string
  descricao: string
  motivo: string
  prioridade: number
  tipoAcao: string
  impacto: string
  urgencia: string
  dificuldade: string
  confianca: number
}

interface AcaoResumida {
  id: string
  titulo: string
  descricao: string
  status: string
  categoria: string
}

interface FeedbackResumido {
  id: string
  tipo: string
  comentario: string | null
  criadoEm: Date
  acao: { titulo: string }
}

interface JornadaResumida {
  nivel: string
  progresso: number
  eventos: string[]
  proximosPassos: string[]
}

interface ImpactoResumido {
  mudancasPositivas: Array<{ categoria: string; descricao: string; confianca: string }>
  evolucaoGeral: number
}

const SUGESTOES_PADRAO = [
  'Como está a semana na empresa?',
  'Alguma conta te preocupando agora?',
  'Precisa de ajuda com alguma tarefa?',
  'Quer conversar sobre algum cliente?',
  'Tem alguma decisão difícil chegando?',
]

export function Chat({
  contexto,
  identidade,
  decisao,
  acoesAtivas,
  feedbackRecente,
  jornada,
  impacto,
}: {
  contexto?: ContextoDecisao | null
  identidade?: IdentidadeResumida | null
  decisao?: DecisaoResumida | null
  acoesAtivas?: AcaoResumida[]
  feedbackRecente?: FeedbackResumido[]
  jornada?: JornadaResumida | null
  impacto?: ImpactoResumido | null
}) {

  const empresaConhecida = identidade?.empresaConhecida ?? false
  const temMemoria = contexto?.memoriaRecente && contexto.memoriaRecente.length > 0
  const temFeedbackRecente = feedbackRecente && feedbackRecente.length > 0
  const temOutcomePositivo = impacto && impacto.mudancasPositivas.length > 0
  const nivelAtivacao = jornada?.nivel ?? 'NOVO'

  const sugestoes = temFeedbackRecente
    ? [
        'O que mais você aprendeu sobre sua empresa?',
        'Tem algo que mudou desde então?',
        'Qual área merece mais atenção agora?',
        ...(decisao ? [`Explique: ${decisao.titulo}`] : []),
      ].filter(Boolean).slice(0, 6)
    : temOutcomePositivo
    ? [
        `Conte mais sobre essa mudança`,
        'Isso já era esperado?',
        'O que mais melhorou?',
        ...(decisao ? [`Explique: ${decisao.titulo}`] : ['O que precisa de atenção hoje?']),
      ].filter(Boolean).slice(0, 6)
    : decisao
    ? [
        `Explique: ${decisao.titulo}`,
        'O que precisa ser feito primeiro?',
        'Qual o maior risco agora?',
        'Me ajude a entender essa decisão',
        ...(empresaConhecida ? ['Qual o resultado financeiro deste mês?'] : []),
      ].filter(Boolean).slice(0, 6)
    : empresaConhecida && contexto
      ? [
          contexto.acaoSugerida ?? 'O que você recomenda?',
          temMemoria && contexto.memoriaRecente![0]
            ? `Fale sobre: ${contexto.memoriaRecente![0].descricao.slice(0, 60)}`
            : 'O que precisa de atenção hoje?',
          contexto.prioridade === 'FINANCEIRO'
            ? 'Como está o fluxo de caixa?'
            : contexto.prioridade === 'CLIENTES'
              ? 'Como está o pipeline?'
              : 'Quais tarefas estão atrasadas?',
          ...(contexto.mudancasRecentes?.slice(0, 1).map((m) => `Explique: ${m.slice(0, 60)}`) ?? []),
          'Qual o resultado financeiro deste mês?',
        ].filter(Boolean).slice(0, 6)
      : SUGESTOES_PADRAO
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [erro, setErro]           = useState<string | null>(null)
  const bottomRef                 = useRef<HTMLDivElement>(null)
  const inputRef                  = useRef<HTMLTextAreaElement>(null)

  // Scroll automático para o final
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens, loading])

  const enviar = useCallback(async (texto?: string) => {
    const pergunta = (texto ?? input).trim()
    if (!pergunta || loading) return

    const novaMensagemUsuario: Mensagem = {
      id:      crypto.randomUUID(),
      role:    'user',
      content: pergunta,
    }

    setMensagens((prev) => [...prev, novaMensagemUsuario])
    setInput('')
    setLoading(true)
    setErro(null)

    // Mensagem temporária do assistente (streaming)
    const idAssistente = crypto.randomUUID()
    setMensagens((prev) => [
      ...prev,
      { id: idAssistente, role: 'assistant', content: '' },
    ])

    try {
      const historico = [...mensagens, novaMensagemUsuario].map((m) => ({
        role:    m.role,
        content: m.content,
      }))

      // apiFetchStream já lê a mensagem real do corpo de erro quando a
      // rota barra por plano insuficiente (402) ou limite diário (429) —
      // essas mensagens específicas chegam até aqui em vez de um texto
      // genérico fixo, e caem no catch abaixo como qualquer outro erro.
      const res = await apiFetchStream('/api/assistente', {
        method: 'POST',
        json: { mensagens: historico },
      })

      // Lê o stream
      const reader  = res.body?.getReader()
      const decoder = new TextDecoder()
      let   buffer  = ''

      if (!reader) throw new Error('Stream indisponível')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const linhas = buffer.split('\n')
        buffer = linhas.pop() ?? ''

        for (const linha of linhas) {
          if (linha.startsWith('0:')) {
            try {
              const texto = JSON.parse(linha.slice(2)) as string
              setMensagens((prev) =>
                prev.map((m) =>
                  m.id === idAssistente
                    ? { ...m, content: m.content + texto }
                    : m
                )
              )
            } catch { /* ignora parsing errors */ }
          }
        }
      }
    } catch (e) {
      setErro(mensagemDeErro(e, 'Não consegui responder agora. Vamos tentar novamente.'))
      // Remove a mensagem vazia do assistente
      setMensagens((prev) => prev.filter((m) => m.id !== idAssistente))
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [input, loading, mensagens])

  const limparConversa = () => {
    setMensagens([])
    setErro(null)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviar()
    }
  }

  // Auto-resize do textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const vazio = mensagens.length === 0

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-h-[800px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-4.5 w-4.5 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Assistente</h2>
            <p className="text-xs text-muted-foreground">O que sei sobre sua empresa, pra decidirmos juntos</p>
          </div>
        </div>
        {!vazio && (
          <Button variant="ghost" size="sm" onClick={limparConversa}>
            <RefreshCw className="h-3.5 w-3.5" />
            Nova conversa
          </Button>
        )}
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {/* Estado vazio — boas-vindas contextuais */}
        {vazio && (
          <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-4">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-3">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              {temFeedbackRecente ? (
                <>
                  <h3 className="text-base font-semibold">Aprendi algo novo sobre sua empresa</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    Com base no seu retorno recente, ajustei meu entendimento sobre:
                  </p>
                  {feedbackRecente!.slice(0, 2).map((fb) => (
                    <div key={fb.id} className="mt-2 rounded-lg border bg-card px-4 py-3 text-left max-w-sm">
                      <p className="text-xs font-medium text-primary">{fb.acao.titulo}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {fb.tipo === 'AJUDOU' ? 'Você disse que funcionou. Vou usar isso de novo quando precisar.' :
                         fb.tipo === 'AJUDOU_PARCIALMENTE' ? 'Você disse que funcionou em parte. Vou levar isso em conta da próxima.' :
                         fb.tipo === 'NAO_AJUDOU' ? 'Você disse que não funcionou. Vou parar de recomendar isso por enquanto.' :
                         'Registrei que ainda não foi usada.'}
                      </p>
                    </div>
                  ))}
                </>
              ) : temOutcomePositivo && !temFeedbackRecente ? (
                <>
                  <h3 className="text-base font-semibold">Desde a nossa última conversa, percebi uma evolução</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    {impacto!.mudancasPositivas[0].descricao}. Isso continua acontecendo?
                  </p>
                  {impacto!.mudancasPositivas.slice(0, 2).map((m, i) => (
                    <div key={i} className="mt-2 rounded-lg border bg-card px-4 py-2 text-left max-w-sm">
                      <p className="text-xs font-medium text-emerald-600 flex items-center gap-1">↑ {m.categoria}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.descricao}</p>
                    </div>
                  ))}
                </>
              ) : acoesAtivas && acoesAtivas.length > 0 ? (
                <>
                  <h3 className="text-base font-semibold">Deixei algo marcado para a gente acompanhar junto</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    Me conta como está indo:
                  </p>
                  {acoesAtivas.map((acao) => (
                    <div key={acao.id} className="mt-2 rounded-lg border bg-card px-4 py-3 text-left max-w-sm">
                      <p className="text-xs font-medium text-primary">{acao.titulo}</p>
                      <p className="text-xs text-muted-foreground mt-1">{acao.descricao}</p>
                      <span className="inline-block mt-2 rounded-full bg-amber-100 dark:bg-amber-950/30 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-400">
                        {acao.status === 'EM_ANDAMENTO' ? 'Em andamento' : 'Pendente'}
                      </span>
                    </div>
                  ))}
                </>
              ) : decisao ? (
                <>
                  <h3 className="text-base font-semibold">Deixa eu pensar no que já sei sobre a sua empresa...</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    Acho que tem uma coisa que merece sua atenção agora:
                  </p>
                  <div className="mt-3 rounded-lg border bg-card px-4 py-3 text-left max-w-sm">
                    <p className="text-xs font-medium text-primary flex items-center gap-1">
                      {decisao.tipoAcao === 'registrar' ? '📝' :
                       decisao.tipoAcao === 'revisar' ? '🔍' :
                       decisao.tipoAcao === 'contatar' ? '📞' :
                       decisao.tipoAcao === 'negociar' ? '🤝' : '🎯'}
                      {decisao.titulo}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{decisao.motivo.slice(0, 200)}</p>
                  </div>
                </>
              ) : empresaConhecida ? (
                <>
                  <h3 className="text-base font-semibold">
                    {nivelAtivacao === 'FUNDADOR_VALIDADO'
                      ? 'Que bom ver você de volta'
                      : nivelAtivacao === 'ENGAJADO'
                        ? 'Estamos evoluindo juntos'
                        : temMemoria
                          ? 'Lembrando da nossa conversa...'
                          : 'Continuando de onde paramos'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    {temMemoria
                      ? `${contexto!.memoriaRecente![0]!.descricao}. ${contexto?.tendencia ?? ''}`
                      : contexto?.motivo ?? 'Baseado no que aprendemos, posso ajudar.'}
                  </p>
                  {contexto?.prioridade && (
                    <span className="inline-block mt-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-medium text-primary">
                      Hoje o assunto é: {CATEGORIA_EVIDENCIA[contexto.prioridade]?.label ?? contexto.prioridade}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-base font-semibold">
                    {nivelAtivacao === 'CONHECENDO'
                      ? 'Já sei algumas coisas sobre sua empresa'
                      : 'Ainda não nos conhecemos'}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    {nivelAtivacao === 'CONHECENDO'
                      ? 'Se quiser, me conta algo da rotina que eu entendo melhor o seu momento.'
                      : 'Cada conversa que a gente tem, eu entendo melhor a sua empresa.'}
                  </p>
                </>
              )}
            </div>

            {/* Sugestões */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {sugestoes.map((s) => (
                <button
                  key={s}
                  onClick={() => enviar(s)}
                  className="text-left rounded-xl border bg-card px-3.5 py-2.5 text-sm hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mensagens */}
        {mensagens.map((msg, i) => (
          <ChatMessage
            key={msg.id}
            role={msg.role}
            content={msg.content}
            loading={loading && i === mensagens.length - 1 && msg.role === 'assistant' && msg.content === ''}
          />
        ))}

        {/* Erro */}
        {erro && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            ⚠ {erro}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="pt-4 border-t mt-4">
        <div className={cn(
          'flex items-end gap-2 rounded-xl border bg-background p-2 transition-colors',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1'
        )}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Me conta como está a semana..."
            rows={1}
            disabled={loading}
            className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 py-1 px-1 max-h-[120px]"
          />
          <Button
            size="icon"
            onClick={() => enviar()}
            disabled={!input.trim() || loading}
            className="shrink-0 h-8 w-8"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
