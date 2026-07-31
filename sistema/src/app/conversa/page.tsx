'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { QuestionCard } from '@/components/conversa/question-card'
import { RevelacaoCard } from '@/components/conversa/revelacao-card'
import { ProgressBar } from '@/components/conversa/progress-bar'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'

interface Pergunta {
  id: string
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: { valor: string; rotulo: string }[]
  categoria?: string
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
  const [memoria, setMemoria] = useState<string | null>(null)

  const recuperarInterpretacoes = useCallback(async () => {
    setInterpretacoes(null)
  }, [])

  const iniciarConversa = useCallback(async () => {
    try {
      const res = await fetch('/api/conversa')
      if (!res.ok) throw new Error()
      const data = await res.json()

      if (data.memoria) {
        setMemoria(data.memoria)
      }

      if (data.concluida) {
        setConcluida(true)
        recuperarInterpretacoes()
        return
      }

      setPerguntaAtual(data.perguntaAtual)
      setProgresso(data.progresso)
      setCarregando(false)
    } catch {
      setErro('Não consegui conectar. Vamos tentar de novo?')
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

      if (!res.ok) throw new Error()

      const { data } = await res.json()

      setReacao(data.reacao)
      setMostrandoReacao(true)
      setEnviando(false)

      dadosRespostaRef.current = {
        concluida: data.concluida,
        proximaPergunta: data.proximaPergunta,
        progresso: data.progresso,
      }

      timerRef.current = setTimeout(() => {
        avancarDaReacao(data.concluida, data.proximaPergunta, data.progresso)
      }, 3000)
    } catch {
      setErro('Não foi dessa vez. Pode tentar de novo?')
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
      if (!res.ok) throw new Error()
      const { data } = await res.json()
      setInterpretacoes(data.interpretacoes)
      if (data.resumoNatural) setResumoNatural(data.resumoNatural)
      setConcluida(true)
    } catch {
      setErro('Não consegui finalizar. Pode tentar de novo?')
    }
  }

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30">
        <div className="text-center space-y-4">
          <AvatarPonte state="thinking" size="lg" />
          <p className="text-sm text-muted-foreground animate-pulse">
            Só um instante...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Identidade */}
        <div className="text-center space-y-2">
          <div className="mx-auto">
            <AvatarPonte state="breathing" size="md" />
          </div>
          {memoria && (
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              {memoria}
            </p>
          )}
          {!memoria && !concluida && (
            <p className="text-sm text-muted-foreground">Antes de qualquer coisa, quero entender como é administrar sua empresa.</p>
          )}
        </div>

        {/* Progresso */}
        {!concluida && !mostrandoReacao && !memoria && (
          <ProgressBar
            blocoAtual={progresso.blocoAtual}
            totalBlocos={progresso.totalBlocos}
            percentual={progresso.percentual}
          />
        )}

        {/* Memória viva — mostrar antes da primeira pergunta */}
        {memoria && !perguntaAtual && !concluida && (
          <div className="text-center animate-fade-in">
            <button
              onClick={() => {
                setMemoria(null)
                iniciarConversa()
              }}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Quero conversar
            </button>
          </div>
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
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground italic">{reacao}</p>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    const d = dadosRespostaRef.current
                    avancarDaReacao(d?.concluida ?? false, d?.proximaPergunta ?? null, d?.progresso ?? progresso)
                  }}
                  className="rounded-lg border border-primary/30 bg-primary/5 px-5 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  Continuar
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
              contexto={perguntaAtual.categoria}
            />
          ) : (
            <p className="text-center text-muted-foreground">Só um instante...</p>
          )}
        </div>

        {/* Pós-diagnóstico — Continuidade (ETAPA 1 + ETAPA 8) */}
        {concluida && interpretacoes && (
          <div className="text-center space-y-4 animate-fade-in">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {resumoNatural
                ? `Existe um padrão que quero continuar observando com você.`
                : `Essa conversa faz parte de uma história maior.`}
            </p>
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="block rounded-lg border border-border bg-card px-6 py-3 text-sm text-foreground hover:bg-muted/50 transition-colors"
              >
                Como está sua empresa hoje?
              </Link>
              <Link
                href="/minha-jornada"
                className="block rounded-lg border border-border bg-card px-6 py-3 text-sm text-foreground hover:bg-muted/50 transition-colors"
              >
                Ver minha jornada
              </Link>
              <Link
                href="/criar-conta"
                className="block rounded-lg border border-primary/30 bg-primary/5 px-6 py-3 text-sm text-primary hover:bg-primary/10 transition-colors"
              >
                Se você acredita que acompanhar sua empresa dessa forma pode fazer diferença ao longo dos próximos meses, existe uma maneira de construirmos essa jornada juntos.
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              Não se preocupe, está tudo salvo. Podemos continuar quando você quiser.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
