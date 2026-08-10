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
 * Camada Rodada 3: balões translúcidos com luz verde discreta no topo.
 */
export function MicroInsights() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {INSIGHTS.map((ins) => (
        <div
          key={ins.titulo}
          className="balloon balloon-lift px-5 py-6"
        >
          <span
            aria-hidden="true"
            className="dot-green flex h-9 w-9 items-center justify-center rounded-full text-base font-semibold text-night-text"
          >
            {ins.icone}
          </span>
          <h3 className="mt-4 font-editorial text-lg font-light leading-snug text-night-text">{ins.titulo}</h3>
          <p className="mt-2 text-sm leading-relaxed text-night-text-soft">{ins.texto}</p>
        </div>
      ))}
    </div>
  )
}