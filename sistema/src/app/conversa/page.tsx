'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { QuestionCard } from '@/components/conversa/question-card'
import { MicroReaction } from '@/components/conversa/micro-reaction'
import { RevelacaoCard } from '@/components/conversa/revelacao-card'
import { ProgressBar } from '@/components/conversa/progress-bar'

interface Pergunta {
  id: string
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: { valor: string; rotulo: string }[]
}

interface Progresso {
  blocoAtual: number
  totalBlocos: number
  percentual: number
}

interface Interpretacoes {
  pontoAtencao: string
  observacao: string
  alinhamento: string
}

interface ResumoNaturalData {
  secao1: { titulo: string; paragrafo: string }
  secao2: { titulo: string; pontos: { evidencia: string; analise: string }[] }
  secao3: { titulo: string; paragrafo: string }
  secao4: { titulo: string; lacunas: string[] }
  secao5: { titulo: string; acao: string }
}

export default function ConversaPage() {
  const [carregando, setCarregando] = useState(true)
  const [perguntaAtual, setPerguntaAtual] = useState<Pergunta | null>(null)
  const [progresso, setProgresso] = useState<Progresso>({ blocoAtual: 1, totalBlocos: 5, percentual: 0 })
  const [resposta, setResposta] = useState('')
  const [reacao, setReacao] = useState<string | null>(null)
  const [mostrandoReacao, setMostrandoReacao] = useState(false)
  const [concluida, setConcluida] = useState(false)
  const [interpretacoes, setInterpretacoes] = useState<Interpretacoes | null>(null)
  const [resumoNatural, setResumoNatural] = useState<ResumoNaturalData | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const recuperarInterpretacoes = useCallback(async () => {
    setInterpretacoes(null)
  }, [])

  // Inicia ou retoma a conversa
  const iniciarConversa = useCallback(async () => {
    try {
      const res = await fetch('/api/conversa')
      if (!res.ok) throw new Error('Falha ao iniciar conversa')
      const data = await res.json()

      if (data.concluida) {
        setConcluida(true)
        recuperarInterpretacoes()
        return
      }

      setPerguntaAtual(data.perguntaAtual)
      setProgresso(data.progresso)
      setCarregando(false)
    } catch {
      setErro('Não foi possível conectar. Verifique sua internet e tente novamente.')
      setCarregando(false)
    }
  }, [recuperarInterpretacoes])

  useEffect(() => { iniciarConversa() }, [iniciarConversa])

  const enviarResposta = async () => {
    if (!resposta.trim() || !perguntaAtual || enviando) return

    setEnviando(true)
    setErro(null)

    try {
      const res = await fetch('/api/conversa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perguntaId: perguntaAtual.id, valor: resposta }),
      })

      if (!res.ok) {
        throw new Error('Erro ao enviar resposta')
      }

      const { data } = await res.json()

      // Mostra reação
      setReacao(data.reacao)
      setMostrandoReacao(true)
      setEnviando(false)

      // Guarda dados da resposta para o botão "Continuar agora"
      dadosRespostaRef.current = {
        concluida: data.concluida,
        proximaPergunta: data.proximaPergunta,
        progresso: data.progresso,
      }

      // Avança automaticamente após 5 segundos
      timerRef.current = setTimeout(() => {
        avancarDaReacao(data.concluida, data.proximaPergunta, data.progresso)
      }, 5000)
    } catch {
      setErro('Erro ao enviar resposta. Tente novamente.')
      setEnviando(false)
    }
  }

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dadosRespostaRef = useRef<{ concluida: boolean; proximaPergunta: Pergunta | null; progresso: Progresso } | null>(null)

  const avancarDaReacao = useCallback((concluida: boolean, proximaPergunta: Pergunta | null, proximoProgresso: Progresso) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setMostrandoReacao(false)
    setReacao(null)

    if (concluida) {
      finalizarConversa()
      return
    }

    if (proximaPergunta) {
      setPerguntaAtual(proximaPergunta)
    }
    setProgresso(proximoProgresso)
    setResposta('')
  }, [])

  const finalizarConversa = async () => {
    try {
      const res = await fetch('/api/conversa/finalizar', { method: 'POST' })
      if (!res.ok) throw new Error('Erro ao finalizar')
      const { data } = await res.json()
      setInterpretacoes(data.interpretacoes)
      if (data.resumoNatural) setResumoNatural(data.resumoNatural)
      setConcluida(true)
    } catch {
      setErro('Erro ao finalizar conversa. Tente novamente.')
    }
  }

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30">
        <div className="text-center space-y-3">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Iniciando conversa...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Logo / identidade */}
        <div className="text-center">
          <h1 className="text-lg font-semibold tracking-tight">Ponte Digital</h1>
          <p className="text-xs text-muted-foreground">Conhecendo sua empresa</p>
        </div>

        {/* Progresso */}
        {!concluida && !mostrandoReacao && (
          <ProgressBar
            blocoAtual={progresso.blocoAtual}
            totalBlocos={progresso.totalBlocos}
            percentual={progresso.percentual}
          />
        )}

        {/* Erro */}
        {erro && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive">
            {erro}
          </div>
        )}

        {/* Área da conversa */}
        <div className="rounded-xl border bg-card p-6 shadow-sm min-h-[200px] flex flex-col justify-center">
          {concluida && interpretacoes ? (
            <RevelacaoCard interpretacoes={interpretacoes} resumoNatural={resumoNatural} />
          ) : mostrandoReacao && reacao ? (
            <div className="space-y-4">
              <MicroReaction reacao={reacao} visivel />
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    const d = dadosRespostaRef.current
                    avancarDaReacao(d?.concluida ?? false, d?.proximaPergunta ?? null, d?.progresso ?? progresso)
                  }}
                  className="rounded-lg border border-primary/30 bg-primary/5 px-5 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  Continuar agora
                </button>
              </div>
            </div>
          ) : perguntaAtual ? (
            <QuestionCard
              pergunta={perguntaAtual.pergunta}
              tipo={perguntaAtual.tipo}
              opcoes={perguntaAtual.opcoes}
              valor={resposta}
              onChange={setResposta}
              onEnviar={enviarResposta}
              enviando={enviando}
            />
          ) : (
            <p className="text-center text-muted-foreground">Preparando...</p>
          )}
        </div>

        {/* Botão salvar (exibido após revelação) */}
        {concluida && interpretacoes && (
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              {resumoNatural
                ? `Quer que eu te ajude a resolver isso? Crie sua conta e continuamos de onde paramos.`
                : `Quer guardar tudo isso? Crie sua conta e a Identidade Digital da sua empresa ficara salva.`}
            </p>
            <a
              href="/criar-conta"
              className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Quero criar minha conta e continuar
            </a>
            <p className="text-xs text-muted-foreground">
              Suas respostas estao seguras. A conta e para preservar seu conhecimento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
