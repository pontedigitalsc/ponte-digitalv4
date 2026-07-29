interface QuestionCardProps {
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: { valor: string; rotulo: string }[]
  valor: string
  onChange: (valor: string) => void
  onEnviar: () => void
  enviando: boolean
  erro?: boolean
  contexto?: string
}

function ContextoBadge({ contexto }: { contexto: string }) {
  const cores: Record<string, string> = {
    FINANCEIRO: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    CLIENTES: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    OPERACAO: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    GESTAO: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    PESSOAS: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    PRODUTO: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    ESTRATEGIA: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  }

  const rotulos: Record<string, string> = {
    FINANCEIRO: 'Financeiro',
    CLIENTES: 'Clientes',
    OPERACAO: 'Operação',
    GESTAO: 'Gestão',
    PESSOAS: 'Pessoas',
    PRODUTO: 'Produto',
    ESTRATEGIA: 'Estratégia',
  }

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${cores[contexto] ?? 'bg-muted text-muted-foreground border-border'}`}>
      {rotulos[contexto] ?? contexto}
    </div>
  )
}

export function QuestionCard({ pergunta, tipo, opcoes, valor, onChange, onEnviar, enviando, erro, contexto }: QuestionCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && valor.trim()) {
      e.preventDefault()
      onEnviar()
    }
  }

  return (
    <div className="space-y-4 animate-slide-up">
      {contexto && <ContextoBadge contexto={contexto} />}
      <p className="text-lg font-medium leading-relaxed">{pergunta}</p>

      {tipo === 'texto' && (
        <input
          autoFocus
          type="text"
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua resposta..."
          className={`w-full rounded-lg border bg-background px-4 py-3 text-base outline-none transition-all focus:ring-2 focus:ring-primary/50 ${
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
              onClick={() => { onChange(opcao.valor); setTimeout(onEnviar, 100) }}
              className={`w-full rounded-lg border px-4 py-3 text-left text-base transition-all animate-slide-up ${
                valor === opcao.valor
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'hover:border-primary/50 hover:bg-accent active:scale-[0.97]'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
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
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] disabled:opacity-40"
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
