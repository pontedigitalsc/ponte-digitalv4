'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { QuestionCard } from '@/components/conversa/question-card'
import { RevelacaoCard } from '@/components/conversa/revelacao-card'
import { ProgressBar } from '@/components/conversa/progress-bar'
import { ClarezaCheckin } from '@/components/conversa/clareza-checkin'
import { RetornoCheckin } from '@/components/conversa/retorno-checkin'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'

interface Pergunta {
  id: string
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: { valor: string; rotulo: string }[]
  categoria?: string
  estagio?: string
  permiteDetalhe?: boolean
}

interface Progresso {
  blocoAtual: number
  totalBlocos: number
  percentual: number
}

const ESTAGIO_LABEL: Record<string, string> = {
  contexto: 'O contexto',
  realidade: 'A realidade',
  tensao: 'A tensão',
  evolucao: 'A evolução',
  proximo_movimento: 'O próximo movimento',
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

interface RetratoEstrategicoData {
  titulo: string
  secoes: { numero: number; titulo: string; corpo: string; itens?: string[] }[]
  proximaReflexao: string
  aviso: string
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
  const [retratoEstrategico, setRetratoEstrategico] = useState<RetratoEstrategicoData | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [memoria, setMemoria] = useState<string | null>(null)
  const [perguntaAberta, setPerguntaAberta] = useState<{ id: string; pergunta: string; beneficio: string } | null>(null)
  const [respostaAberta, setRespostaAberta] = useState('')
  const [enviandoAberta, setEnviandoAberta] = useState(false)
  const [respostaAbertaEnviada, setRespostaAbertaEnviada] = useState(false)
  const [retomando, setRetomando] = useState(false)
  const [retornoDisponivel, setRetornoDisponivel] = useState(false)

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
        setCarregando(false)

        // Retorno de uma conversa já concluída: reapresenta o Retrato
        // que foi gerado na última sessão (regerado no servidor).
        if (data.retomando && data.interpretacoes) {
          setRetomando(true)
          setInterpretacoes(data.interpretacoes)
          if (data.resumoNatural) setResumoNatural(data.resumoNatural)
          if (data.retratoEstrategico) setRetratoEstrategico(data.retratoEstrategico)
          // P64 — O Retorno: check-in de 7 dias aparece junto, sem bloquear.
          setRetornoDisponivel(data.retorno?.disponivel === true)
          return
        }

        // Todas as perguntas respondidas mas ainda não finalizada
        // (ex.: aba fechada antes do finalizar): finaliza agora.
        setRetomando(false)
        finalizarConversa()
        return
      }

      setPerguntaAtual(data.perguntaAtual)
      setProgresso(data.progresso)
      setCarregando(false)
    } catch {
      setErro('Não consegui conectar agora. Vamos tentar de novo?')
      setCarregando(false)
    }
  }, [recuperarInterpretacoes])

  useEffect(() => { iniciarConversa() }, [iniciarConversa])

  // Memória viva: mostrar o contexto e seguir direto para a conversa,
  // sem pedir um clique a mais do empresário.
  useEffect(() => {
    if (!memoria || perguntaAtual || concluida) return
    const t = setTimeout(() => {
      setMemoria(null)
      iniciarConversa()
    }, 2200)
    return () => clearTimeout(t)
  }, [memoria, perguntaAtual, concluida, iniciarConversa])

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
      }, 1400)
    } catch {
      setErro('Não consegui ouvir sua resposta agora. Pode tentar de novo?')
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
      if (data.retratoEstrategico) setRetratoEstrategico(data.retratoEstrategico)
      if (data.perguntaAberta) setPerguntaAberta(data.perguntaAberta)
      setConcluida(true)
    } catch {
      setErro('Não consegui guardar essa conversa agora. Pode tentar de novo?')
    }
  }

  const enviarPerguntaAberta = async () => {
    if (!respostaAberta.trim() || enviandoAberta || !perguntaAberta) return
    setEnviandoAberta(true)
    setErro(null)
    try {
      const res = await fetch('/api/conversa/pergunta-aberta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perguntaId: perguntaAberta.id, resposta: respostaAberta }),
      })
      if (!res.ok) throw new Error()
      setRespostaAbertaEnviada(true)
    } catch {
      setErro('Não consegui guardar sua resposta agora. Pode tentar de novo?')
    } finally {
      setEnviandoAberta(false)
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
            <p className="text-sm text-muted-foreground">
              Oi! Vamos começar entendendo a sua empresa — ela primeiro. Depois, a sua história.
            </p>
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
            <AvatarPonte state="thinking" size="md" className="mx-auto" />
          </div>
        )}

        {/* Erro */}
        {erro && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive">
            {erro}
          </div>
        )}

        {/* Área da conversa */}
        <div className="card-premium rounded-xl p-6 min-h-[200px] flex flex-col justify-center">
          {concluida && interpretacoes ? (
            <RevelacaoCard
              interpretacoes={interpretacoes}
              resumoNatural={resumoNatural}
              retratoEstrategico={retratoEstrategico}
            />
          ) : mostrandoReacao && reacao ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground italic">{reacao}</p>
            </div>
          ) : perguntaAtual ? (
            <div className="space-y-3">
              {perguntaAtual.estagio && (
                <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                  {ESTAGIO_LABEL[perguntaAtual.estagio] ?? ''}
                </p>
              )}
              <QuestionCard
                key={perguntaAtual.id}
                pergunta={perguntaAtual.pergunta}
                tipo={perguntaAtual.tipo}
                opcoes={perguntaAtual.opcoes}
                valor={resposta}
                onChange={setResposta}
                onEnviar={enviarResposta}
                enviando={enviando}
                permiteDetalhe={perguntaAtual.permiteDetalhe}
              />
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Só um instante...</p>
          )}
        </div>

        {/* Pós-diagnóstico — Continuidade (ETAPA 1 + ETAPA 8) */}
        {concluida && interpretacoes && (
          <div className="text-center space-y-4 animate-fade-in">
            {/* P64 — O Retorno: quando a janela de 7 dias abre, o check-in
                aparece primeiro — a Ponte quer saber como a história continuou. */}
            {retornoDisponivel && <RetornoCheckin />}

            <p className="text-sm text-muted-foreground leading-relaxed">
              {resumoNatural
                ? `Existe um padrão que quero continuar observando com você.`
                : `Essa conversa faz parte de uma história maior.`}
            </p>

            {/* P59 — Clareza Gerada como evidência: pergunta de valor real */}
            <ClarezaCheckin />

            {/* P52 — Pergunta Aberta: inserção natural, nunca pesquisa */}
            {perguntaAberta && !respostaAbertaEnviada && (
              <div className="card-premium rounded-xl p-6 space-y-3 text-left">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  Enquanto conversávamos, fiquei pensando em uma situação comum entre empresas parecidas com a sua.
                </p>
                <p className="text-base font-medium leading-relaxed">
                  {perguntaAberta.pergunta}
                </p>
                {perguntaAberta.beneficio && (
                  <p className="text-xs text-muted-foreground italic">
                    {perguntaAberta.beneficio}
                  </p>
                )}
                <div className="space-y-2">
                  <textarea
                    value={respostaAberta}
                    onChange={(e) => setRespostaAberta(e.target.value)}
                    rows={3}
                    placeholder="Escreva com suas palavras..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                  <button
                    type="button"
                    onClick={enviarPerguntaAberta}
                    disabled={enviandoAberta || !respostaAberta.trim()}
                    className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {enviandoAberta ? 'Guardando...' : 'Quero compartilhar'}
                  </button>
                </div>
              </div>
            )}
            {perguntaAberta && respostaAbertaEnviada && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guardei o que você compartilhou. Cada resposta sua nos ajuda a entender melhor empresas como a sua.
              </p>
            )}

            <div className="space-y-2">
              {retomando && (
                <Link
                  href="/conversa?nova=1"
                  className="block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground text-center hover:bg-primary/90 transition-colors"
                >
                  Iniciar nova sessão
                </Link>
              )}
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
                Quero que a Ponte continue acompanhando minha empresa
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              Fica tranquilo — nossa conversa fica comigo. Continuamos quando você quiser.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
