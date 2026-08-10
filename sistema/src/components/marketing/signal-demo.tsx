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
 * como o ponto onde os sinais se encontram. Camada Rodada 3: superfícies
 * translúcidas sobre azul-noite; o padrão possível recebe o azul-azure da
 * clareza.
 */
export function SignalDemo() {
  return (
    <div className="mx-auto grid max-w-3xl gap-y-10 sm:grid-cols-[auto_auto_auto_auto_1fr] sm:items-center sm:gap-x-4">
      {/* Sinais — três fontes dispersas */}
      <ul className="space-y-3">
        {SINAIS.map((s, i) => (
          <li
            key={s.rotulo}
            className="flex items-center gap-3 rounded-2xl border border-night-700/60 bg-night-surf/70 px-4 py-3 backdrop-blur-sm"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-night-700 bg-night-800 text-xs font-semibold text-night-teal">
              0{i + 1}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-night-text-dim">{s.rotulo}</p>
              <p className="mt-0.5 text-sm leading-snug text-night-text">{s.texto}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Conexão — as linhas que convergem para o mesmo ponto */}
      <div className="hidden h-full min-h-40 items-center justify-center sm:flex" aria-hidden="true">
        <svg viewBox="0 0 120 40" className="w-20" fill="none">
          <path d="M0,8 C40,8 80,32 120,20" stroke="hsl(var(--l-teal) / 0.4)" strokeWidth={1} strokeDasharray="3 4" />
          <path d="M0,32 C40,32 80,8 120,20" stroke="hsl(var(--l-teal) / 0.4)" strokeWidth={1} strokeDasharray="3 4" />
        </svg>
      </div>

      {/* Ponto de encontro — o Avatar, pequeno, como marca de convergência */}
      <div className="hidden sm:flex sm:flex-col sm:items-center" aria-hidden="true">
        <div className="rounded-full border border-night-700 bg-night-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-night-teal">
          conexão
        </div>
      </div>

      <div className="hidden sm:flex sm:justify-center" aria-hidden="true">
        <svg viewBox="0 0 40 120" className="w-8" fill="none">
          <path d="M20,0 C20,40 20,80 20,120" stroke="hsl(var(--l-teal) / 0.4)" strokeWidth={1} strokeDasharray="3 4" />
        </svg>
      </div>

      {/* Padrão possível — o que a convergência revela (o azul-azure da
          clareza, sem sair da noite) */}
      <div className="mx-auto w-full max-w-sm rounded-2xl border border-night-700/80 bg-[radial-gradient(120%_90%_at_100%_0%,hsl(var(--l-azure)/0.14),transparent_60%)] bg-night-800/90 p-5 text-left shadow-[0_30px_70px_-30px_hsl(205_40%_3%/0.9)] backdrop-blur-sm">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-night-azure">
          Padrão possível
        </p>
        <p className="mt-2 font-editorial text-lg font-light italic leading-snug text-night-text">
          A etapa que atrasa é a mesma que os clientes pedem.
        </p>
        <p className="mt-3 border-t border-night-700/70 pt-3 text-sm leading-relaxed text-night-text-soft">
          A pergunta melhora: não &ldquo;por que atrasou?&rdquo;, mas
          &ldquo;o que essa etapa estava tentando te dizer já há semanas?&rdquo;
        </p>
      </div>
    </div>
  )
}