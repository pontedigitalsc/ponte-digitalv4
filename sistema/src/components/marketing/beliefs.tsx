const CRENCAS = [
  {
    n: '01',
    titulo: 'Clareza vem antes da ação.',
    texto: 'Decidir melhor começa por enxergar melhor.',
  },
  {
    n: '02',
    titulo: 'Contexto vale mais que informação isolada.',
    texto: 'Um número solto conta pouco; o mesmo número relacionado muda a leitura.',
  },
  {
    n: '03',
    titulo: 'Dados precisam ser conectados.',
    texto: 'Onde hoje existe separação, existe espaço para a Ponte.',
  },
  {
    n: '04',
    titulo: 'Inteligência precisa ser explicável.',
    texto: 'Sem caixa-preta: sempre dá para ver de onde uma leitura veio.',
  },
  {
    n: '05',
    titulo: 'Uma boa pergunta vale mais que uma resposta rápida.',
    texto: 'A pressa responde; a pergunta certeira investiga.',
  },
  {
    n: '06',
    titulo: 'Tecnologia aumenta a capacidade humana de decidir.',
    texto: 'Ela não substitui o pensamento — amplia o alcance dele.',
  },
]

/**
 * O que a Ponte acredita — princípios como filosofia de produto, não
 * manifesto corporativo. Balões silenciosos, numeração discreta, luz verde
 * no toque de cada princípio.
 */
export function Beliefs() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CRENCAS.map((c) => (
        <div key={c.n} className="balloon balloon-lift px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-teal">{c.n}</p>
          <h3 className="mt-2 font-editorial text-lg font-light leading-snug text-night-text">{c.titulo}</h3>
          <p className="mt-2 text-sm leading-relaxed text-night-text-soft">{c.texto}</p>
        </div>
      ))}
    </div>
  )
}