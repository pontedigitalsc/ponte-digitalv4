interface QuestionCardProps {
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: { valor: string; rotulo: string }[]
  valor: string
  onChange: (valor: string) => void
  onEnviar: () => void
  enviando: boolean
}

export function QuestionCard({ pergunta, tipo, opcoes, valor, onChange, onEnviar, enviando }: QuestionCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && valor.trim()) {
      e.preventDefault()
      onEnviar()
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium leading-relaxed">{pergunta}</p>

      {tipo === 'texto' && (
        <input
          autoFocus
          type="text"
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua resposta..."
          className="w-full rounded-lg border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          disabled={enviando}
        />
      )}

      {(tipo === 'selecao' || tipo === 'faixa') && opcoes && (
        <div className="grid gap-2">
          {opcoes.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => { onChange(opcao.valor); setTimeout(onEnviar, 100) }}
              className={`w-full rounded-lg border px-4 py-3 text-left text-base transition-all ${
                valor === opcao.valor
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'hover:border-primary/50 hover:bg-accent'
              }`}
              disabled={enviando}
            >
              {opcao.rotulo}
            </button>
          ))}
        </div>
      )}

      {tipo === 'texto' && (
        <div className="flex justify-end">
          <button
            onClick={onEnviar}
            disabled={!valor.trim() || enviando}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40"
          >
            {enviando ? 'Enviando...' : 'Continuar'}
          </button>
        </div>
      )}
    </div>
  )
}
