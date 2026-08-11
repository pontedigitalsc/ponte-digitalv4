const PERFIS = [
  {
    nome: 'Empresário',
    foco: 'visão de conjunto e decisões maiores',
  },
  {
    nome: 'Gerente',
    foco: 'a operação e a equipe no dia a dia',
  },
  {
    nome: 'Vendedor',
    foco: 'o cliente e o relacionamento próximo',
  },
  {
    nome: 'Operacional',
    foco: 'o trabalho e os fluxos em andamento',
  },
  {
    nome: 'Financeiro',
    foco: 'números, custos e saúde econômica',
  },
  {
    nome: 'Cliente',
    foco: 'sua experiência, com o que é dele',
  },
]

/**
 * A empresa como organismo de conhecimento — cada função vê o negócio de um
 * ângulo, respeitando permissões. As visões são diferentes por natureza; a
 * Ponte procura conectá-las em uma compreensão mais rica, sem romper o que
 * cada pessoa tem direito de ver. Concretamente: cada perfil enxerga o que
 * o papel permite; a conversa entre as partes é o que falta hoje.
 */
export function Organism() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PERFIS.map((p) => (
          <div key={p.nome} className="balloon px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="dot-teal h-1.5 w-1.5 rounded-full" />
              <p className="text-sm font-semibold text-night-text">{p.nome}</p>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-night-text-soft">{p.foco}</p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-lg text-center text-sm leading-relaxed text-night-text-soft">
        Cada pessoa enxerga o que a função permite. Esse respeito à permissão não
        separa a empresa — é o que permite que visões diferentes{' '}
        <span className="font-editorial italic text-night-green-bright">
          contribuam para uma compreensão mais rica
        </span>{' '}
        sem quebrar a confiança.
      </p>
    </div>
  )
}