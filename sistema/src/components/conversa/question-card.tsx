'use client'

import { useState } from 'react'

interface QuestionCardProps {
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: { valor: string; rotulo: string }[]
  valor: string
  onChange: (valor: string) => void
  onEnviar: () => void
  enviando: boolean
  erro?: boolean
  // P54 — Etapa 3: resposta rápida que ainda permite profundidade.
  // Selecionar uma opção preenche a resposta; o empresário pode, se quiser,
  // acrescentar um detalhe antes de seguir.
  permiteDetalhe?: boolean
}

export function QuestionCard({ pergunta, tipo, opcoes, valor, onChange, onEnviar, enviando, erro, permiteDetalhe = false }: QuestionCardProps) {
  const [selecaoValor, setSelecaoValor] = useState('')
  const [detalhe, setDetalhe] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && valor.trim()) {
      e.preventDefault()
      onEnviar()
    }
  }

  const escolherOpcao = (opcao: { valor: string; rotulo: string }) => {
    if (!permiteDetalhe) {
      onChange(opcao.rotulo)
      setTimeout(onEnviar, 100)
      return
    }
    setSelecaoValor(opcao.rotulo)
  }

  const enviarComDetalhe = () => {
    const texto = detalhe.trim() ? `${selecaoValor} — ${detalhe.trim()}` : selecaoValor
    onChange(texto)
    onEnviar()
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <p className="text-lg font-medium leading-relaxed">{pergunta}</p>

      {tipo === 'texto' && (
        <input
          autoFocus
          type="text"
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escreva à vontade..."
          className={`w-full rounded-xl border bg-background px-4 py-3 text-base outline-none transition-all focus:ring-2 focus:ring-primary/50 ${
            erro ? 'border-destructive animate-shake' : ''
          }`}
          disabled={enviando}
        />
      )}

      {(tipo === 'selecao' || tipo === 'faixa') && opcoes && (
        <div className="grid gap-2">
          {opcoes.map((opcao, i) => (
            <button
              key={opcao.valor}
              onClick={() => escolherOpcao(opcao)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-base transition-all animate-slide-up ${
                selecaoValor === opcao.rotulo
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'hover:border-primary/50 hover:bg-accent active:scale-[0.98]'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
              disabled={enviando}
            >
              {opcao.rotulo}
            </button>
          ))}
        </div>
      )}

      {permiteDetalhe && selecaoValor && (
        <div className="space-y-3 animate-fade-in">
          <textarea
            value={detalhe}
            onChange={(e) => setDetalhe(e.target.value)}
            rows={2}
            placeholder="Se quiser, conte mais..."
            className="w-full rounded-xl border bg-background px-4 py-3 text-base outline-none transition-all focus:ring-2 focus:ring-primary/50 resize-none"
            disabled={enviando}
          />
          <div className="flex justify-end">
            <button
              onClick={enviarComDetalhe}
              disabled={enviando}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40"
            >
              {enviando ? (
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Enviando...
                </span>
              ) : 'Continuar'}
            </button>
          </div>
        </div>
      )}

      {tipo === 'texto' && (
        <div className="flex justify-end">
          <button
            onClick={onEnviar}
            disabled={!valor.trim() || enviando}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40"
          >
            {enviando ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Enviando...
              </span>
            ) : 'Continuar'}
          </button>
        </div>
      )}
    </div>
  )
}
