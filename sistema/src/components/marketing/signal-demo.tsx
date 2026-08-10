const SINAIS = [
  { rotulo: 'Cliente', texto: 'Dois clientes pediram a mesma coisa em semanas seguidas.' },
  { rotulo: 'Operação', texto: 'A equipe relatou atraso por causa dessa mesma etapa.' },
  { rotulo: 'Equipe', texto: 'Na conversa, alguém lembrou que isso sempre aconteceu.' },
]

/**
 * Mini-demonstração da lógica da Ponte: três sinais de lugares diferentes
 * (cliente, operação, equipe) convergem num único ponto — o padrão
 * possível — que por sua vez devolve uma pergunta melhor. Estático e
 * legível (sem manipulação de dados); o movimento é só uma pulsaça sutil
 * que acompanha o olhar de cima para baixo. O avatar volta aqui, pequeno,
 * como o ponto onde os sinais se encontram.
 */
export function SignalDemo() {
  return (
    <div className="mx-auto grid max-w-3xl gap-y-10 sm:grid-cols-[1fr_auto_auto_auto_1fr] sm:items-center sm:gap-x-4">
      {/* Sinais — três fontes dispersas */}
      <ul className="space-y-3">
        {SINAIS.map((s, i) => (
          <li
            key={s.rotulo}
            className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 shadow-soft"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-mist text-xs font-semibold text-primary">
              0{i + 1}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.rotulo}</p>
              <p className="mt-0.5 text-sm leading-snug text-foreground">{s.texto}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Conexão — as linhas que convergem para o mesmo ponto */}
      <div className="hidden h-full min-h-40 items-center justify-center sm:flex" aria-hidden="true">
        <svg viewBox="0 0 120 40" className="w-20" fill="none">
          <path d="M0,8 C40,8 80,32 120,20" stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="3 4" />
          <path d="M0,32 C40,32 80,8 120,20" stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="3 4" />
        </svg>
      </div>

      {/* Ponto de encontro — o Avatar, pequeno, como marca de convergência */}
      <div className="hidden sm:flex sm:flex-col sm:items-center" aria-hidden="true">
        <div className="rounded-full bg-evergreen-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-evergreen">
          conexão
        </div>
      </div>

      <div className="hidden sm:flex sm:justify-center" aria-hidden="true">
        <svg viewBox="0 0 40 120" className="w-8" fill="none">
          <path d="M20,0 C20,40 20,80 20,120" stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="3 4" />
        </svg>
      </div>

      {/* Padrão possível — o que a convergência revela */}
      <div className="mx-auto w-full max-w-sm rounded-2xl bg-gradient-to-br from-mist-2 to-azure/60 p-5 text-left shadow-soft">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/80">
          Padrão possível
        </p>
        <p className="mt-2 font-editorial text-lg font-light italic leading-snug text-foreground">
          A etapa que atrasa é a mesma que os clientes pedem.
        </p>
        <p className="mt-3 border-t border-border/60 pt-3 text-sm leading-relaxed text-muted-foreground">
          A pergunta melhora: não &ldquo;por que atrasou?&rdquo;, mas
          &ldquo;o que essa etapa estava tentando te dizer já há semanas?&rdquo;
        </p>
      </div>
    </div>
  )
}