'use client'

import { useState } from 'react'

const OPCOES = [
  { valor: 'voltei-a-olhar', rotulo: 'Voltei a olhar a empresa', descricao: 'A conversa me trouxe de volta' },
  { valor: 'comecei-algo', rotulo: 'Comecei algo que a conversa apontou', descricao: 'O retrato me deu um primeiro passo' },
  { valor: 'mudou-minha-visao', rotulo: 'Mudou minha visão sobre a empresa', descricao: 'Passei a enxergar diferente' },
  { valor: 'nada-ainda', rotulo: 'Ainda não fiz nada', descricao: 'A vida seguiu igual por enquanto' },
] as const

// P64 — O Retorno: o check-in de 1 minuto que fecha o loop. Depois de alguns
// dias da primeira conversa, a Ponte pergunta o que aconteceu. Nunca cobra,
// nunca bloqueia o Retrato — apenas lembra que quer saber como a história
// continuou.
export function RetornoCheckin() {
  const [mudou, setMudou] = useState<string | null>(null)
  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [pendente, setPendente] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const podeEnviar = !enviando && texto.trim().length > 0 && mudou !== null

  const enviar = async () => {
    if (!podeEnviar) return
    setEnviando(true)
    setErro(null)
    try {
      const res = await fetch('/api/conversa/retorno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mudou, texto: texto.trim() }),
      })
      if (!res.ok) throw new Error()
      const json = await res.json().catch(() => null)
      setPendente(json?.data?.pendente === true)
      setEnviado(true)
    } catch {
      setErro('Não consegui guardar isso agora. Pode tentar de novo?')
    } finally {
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-emerald-400/30 bg-card p-5 text-center space-y-2 animate-fade-in">
        {pendente ? (
          <>
            <p className="text-sm font-medium text-foreground">Guardo isso junto da sua conversa.</p>
            <p className="text-xs text-muted-foreground">
              Quando você criar sua conta, esse retorno passa a integrar a história da sua empresa.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-foreground">Obrigado. Isso mostra que a conversa fez diferença.</p>
            <p className="text-xs text-muted-foreground">Seu retorno fica guardado na história da sua empresa.</p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-dashed border-primary/30 bg-card/50 p-5 space-y-4 animate-fade-in">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Voltamos a nos falar</p>
      <p className="text-sm text-foreground leading-relaxed">
        Fazem alguns dias desde a nossa conversa. O que aconteceu depois dela?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {OPCOES.map((o) => (
          <button
            key={o.valor}
            onClick={() => setMudou(o.valor)}
            className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
              mudou === o.valor
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-primary/40'
            }`}
          >
            <span className="block font-medium">{o.rotulo}</span>
            <span className="block text-[10px] opacity-70">{o.descricao}</span>
          </button>
        ))}
      </div>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Conte o que aconteceu — mesmo que tenha sido pouco. (ex.: comecei a observar quanto tempo cada tarefa leva...)"
        className="w-full rounded-xl border bg-background p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[70px]"
      />

      {erro && <p className="text-xs text-destructive">{erro}</p>}

      <button
        onClick={enviar}
        disabled={!podeEnviar}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {enviando ? 'Guardando...' : 'Guardar o que aconteceu'}
      </button>
    </div>
  )
}
