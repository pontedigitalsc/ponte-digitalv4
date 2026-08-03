'use client'

import { useState } from 'react'

const CATEGORIAS = [
  { valor: 'NOVA_PERCEPCAO', rotulo: 'Nova percepção', descricao: 'Vi algo que não tinha percebido' },
  { valor: 'CONFIRMACAO', rotulo: 'Confirmação', descricao: 'Confirmou o que eu já desconfiava' },
  { valor: 'MUDANCA_DE_DECISAO', rotulo: 'Mudança de decisão', descricao: 'Me ajudou a decidir diferente' },
  { valor: 'NENHUM_IMPACTO', rotulo: 'Nenhum impacto', descricao: 'Ainda não fez diferença' },
] as const

export function ClarezaCheckin() {
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  const podeEnviar = !enviando && texto.trim().length > 0 && categoria !== null

  const enviar = async () => {
    if (!podeEnviar) return
    setEnviando(true)
    setErro(null)
    try {
      const res = await fetch('/api/conversa/clareza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoria, texto: texto.trim() }),
      })
      if (!res.ok) throw new Error()
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
        <p className="text-sm font-medium text-foreground">Obrigado. Isso ajuda a Ponte a melhorar.</p>
        <p className="text-xs text-muted-foreground">Sua percepção fica guardada junto com o retrato da sua empresa.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-dashed border-primary/30 bg-card/50 p-5 space-y-4 animate-fade-in">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Só mais uma coisa</p>
      <p className="text-sm text-foreground leading-relaxed">
        Depois dessa conversa, qual foi a principal coisa que você percebeu sobre sua empresa?
      </p>

      <div className="grid grid-cols-2 gap-2">
        {CATEGORIAS.map((c) => (
          <button
            key={c.valor}
            onClick={() => setCategoria(c.valor)}
            className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
              categoria === c.valor
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-primary/40'
            }`}
          >
            <span className="block font-medium">{c.rotulo}</span>
            <span className="block text-[10px] opacity-70">{c.descricao}</span>
          </button>
        ))}
      </div>

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="O que você percebeu? (ex.: que tudo depende de mim, que preciso de previsibilidade...)"
        className="w-full rounded-xl border bg-background p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[70px]"
      />

      {erro && <p className="text-xs text-destructive">{erro}</p>}

      <button
        onClick={enviar}
        disabled={!podeEnviar}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {enviando ? 'Guardando...' : 'Guardar percepção'}
      </button>
    </div>
  )
}
