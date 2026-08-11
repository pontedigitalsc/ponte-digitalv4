const CRENCAS = [
  {
    n: '01',
    titulo: 'Empresas não deveriam precisar de mais complexidade para ganhar clareza.',
    texto: 'Mais ferramentas nem sempre significam mais compreensão. A direção certa é o contrário.',
  },
  {
    n: '02',
    titulo: 'Inteligência não deveria ser uma caixa-preta.',
    texto: 'Uma leitura só merece confiança quando dá para ver de onde ela veio.',
  },
  {
    n: '03',
    titulo: 'Tecnologia deveria aproximar pessoas e informações.',
    texto: 'Em vez de criar mais silos, aproximar o que já existe — com respeito a permissões e funções.',
  },
  {
    n: '04',
    titulo: 'Sistemas deveriam ajudar a compreender a realidade.',
    texto: 'Não apenas registrar eventos. Registrar é o começo; compreender é a direção.',
  },
  {
    n: '05',
    titulo: 'Uma boa pergunta vale mais do que uma resposta rápida.',
    texto: 'A pressa responde; a pergunta certeira investiga.',
  },
  {
    n: '06',
    titulo: 'A empresa é maior do que os dados que consegue armazenar.',
    texto: 'Histórico e registros são parte dela — nunca a empresa inteira.',
  },
]

const PRINCIPIO_EXTENSO =
  'O conhecimento que vive dentro das pessoas também faz parte da empresa.'

/**
 * O que a Ponte acredita — princípios como filosofia de produto séria, não
 * manifesto exagerado. Os seis primeiros em balões; o sétimo, em uma faixa
 * ampla, porque é a síntese: a empresa inclui o que as pessoas sabem.
 */
export function Beliefs() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CRENCAS.map((c) => (
          <div key={c.n} className="balloon balloon-lift px-5 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-teal">{c.n}</p>
            <h3 className="mt-2 font-editorial text-lg font-light leading-snug text-night-text">{c.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-night-text-soft">{c.texto}</p>
          </div>
        ))}
      </div>

      <div className="balloon mt-4 flex items-start gap-4 px-6 py-6 sm:items-center">
        <span aria-hidden="true" className="dot-green mt-1 h-2 w-2 shrink-0 rounded-full sm:mt-0" />
        <p className="font-editorial text-xl font-light italic leading-snug text-night-text text-balance sm:text-2xl">
          {PRINCIPIO_EXTENSO}
        </p>
      </div>
    </div>
  )
}