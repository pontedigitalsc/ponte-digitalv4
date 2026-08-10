const INSIGHTS = [
  {
    icone: '↗',
    titulo: 'Um dado que dura meses não sai da sua mesinha.',
    texto: 'Quem observa a própria rotina em camadas pode começar a notar relações que os relatórios não mostram.',
  },
  {
    icone: '✳',
    titulo: 'Repetição é um começo, não uma resposta.',
    texto: 'Um padrão que reaparece costuma ser um pedido de atenção — talvez, apenas talvez, uma oportunidade disfarçada.',
  },
  {
    icone: '→',
    titulo: 'A relação que faltava pode já estar nas suas conversas.',
    texto: 'Informações que se conectam em lugares diferentes podem revelar escolhas melhores do que qualquer pergunta feita às pressas.',
  },
]

/**
 * Micro-insights — três observações curtas sobre sinais, relações e
 * evolução. Linguagem deliberadamente aberta ("talvez", "podem"): a Ponte
 * não promete certezas, devolve possibilidades para o leitor considerar.
 */
export function MicroInsights() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {INSIGHTS.map((ins) => (
        <div
          key={ins.titulo}
          className="rounded-2xl border border-border/70 bg-card/70 px-5 py-6 shadow-soft"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-base text-primary"
          >
            {ins.icone}
          </span>
          <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">{ins.titulo}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ins.texto}</p>
        </div>
      ))}
    </div>
  )
}