const FERRAMENTAS = ['CRM', 'Financeiro', 'Operação', 'Comunicação', 'Tarefas', 'Relatórios']

const PILARES = [
  { nome: 'Memória', sub: 'guarda o que foi aprendido' },
  { nome: 'Contexto', sub: 'o que existe ganha relação' },
  { nome: 'Inteligência', sub: 'observa, relaciona, hipotetiza' },
  { nome: 'Conversa', sub: 'investiga junto com você' },
]

const CONCEITOS = [
  {
    nome: 'Memória',
    lead: 'A empresa não deveria precisar esquecer o que já aprendeu.',
    texto:
      'Clientes têm histórico. Processos têm histórico. Decisões têm contexto. Hoje essa memória fica espalhada por conversas e telas separadas.',
  },
  {
    nome: 'Contexto',
    lead: 'Um número isolado é informação. Relacionado a outros acontecimentos, vira contexto.',
    texto:
      'Contexto permite investigação; investigação permite decisões melhores — em vez de respostas soltas às pressas.',
  },
  {
    nome: 'Inteligência',
    lead: 'A inteligência da Ponte é uma forma de pensar, não uma promessa.',
    texto:
      'Observar, relacionar, levantar hipóteses, conversar, ajudar a decidir — sempre deixando claro o que é fato, o que é interpretação e o que é hipótese.',
  },
]

/** Conector vertical do diagrama — a linha desenha quando a seção entra na
 *  tela (mecanismo .reveal-line). SEM JS, permanece desenhada. */
function FlowConnector() {
  return (
    <div className="flex justify-center py-2" aria-hidden="true">
      <svg viewBox="0 0 8 52" className="h-14 w-2" fill="none">
        <path
          d="M4,0 L4,52"
          pathLength={1}
          className="reveal-line"
          stroke="hsl(var(--l-teal) / 0.5)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
        />
      </svg>
    </div>
  )
}

/**
 * A nova categoria — a peça visual central da landing. As ferramentas
 * tradicionais operam em camadas isoladas; por baixo delas existe espaço
 * para uma camada de contexto: memória, contexto, inteligência e conversa
 * — que devolvem, à empresa, decisões melhores. Direção honesta, sem
 * promessa de funcionalidade pronta.
 */
export function NewCategory() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          Uma nova categoria
        </p>
        <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          Uma camada acima das ferramentas.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-night-text-soft">
          A Ponte não é mais um CRM, mais um ERP, nem um chatbot. É a camada de
          compreensão e coordenação que senta acima deles.
        </p>
      </div>

      {/* Diagrama — três camadas, duas conexões */}
      <div className="mt-10">
        <div className="flex flex-wrap justify-center gap-2">
          {FERRAMENTAS.map((f) => (
            <span
              key={f}
              className="pill px-3.5 py-1.5 text-xs text-night-text-dim"
            >
              {f}
            </span>
          ))}
        </div>

        <FlowConnector />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PILARES.map((p) => (
            <div key={p.nome} className="balloon px-4 py-4 text-center">
              <p className="font-editorial text-lg font-light text-night-text">{p.nome}</p>
              <p className="mt-1 text-[11px] leading-snug text-night-text-dim">{p.sub}</p>
            </div>
          ))}
        </div>

        <FlowConnector />

        <div className="light-panel mx-auto flex max-w-sm items-center justify-center gap-3 px-6 py-5 text-center">
          <span aria-hidden="true" className="dot-green h-2.5 w-2.5 shrink-0 rounded-full" />
          <p className="font-editorial text-xl font-light text-night-light-foreground sm:text-2xl">
            Decisões melhores
          </p>
        </div>
      </div>

      {/* Memória, Contexto, Inteligência — os três conceitos, explicados */}
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {CONCEITOS.map((c) => (
          <div key={c.nome} className="balloon balloon-lift px-5 py-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-teal">{c.nome}</p>
            <p className="mt-2 font-editorial text-lg font-light italic leading-snug text-night-text">
              {c.lead}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-night-text-soft">{c.texto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}