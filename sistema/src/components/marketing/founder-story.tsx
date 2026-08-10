const TRAJETORIA = [
  'experimentação',
  'automações',
  'organização de processos',
  'criação de CRMs',
  'integração de informações',
  'desenvolvimento de software',
  'problemas reais de empresas',
]

/**
 * Quem está construindo — a história da Ponte e de Kelven, seu fundador.
 * Apenas fatos documentados: a construção passou por experimentação,
 * automações, organização de processos, CRMs, integração de informações,
 * desenvolvimento de software e interação com problemas reais. Sem datas,
 * sem números, sem exageros — narrativa conceitual e humana.
 */
export function FounderStory() {
  return (
    <div className="mx-auto grid max-w-3xl gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div className="space-y-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          Quem está por trás
        </p>
        <h2 className="font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          Uma história que nasceu na prática.
        </h2>

        <div className="space-y-4 text-sm leading-relaxed text-night-text-soft sm:text-base sm:leading-7">
          <p>
            A Ponte Digital começou antes de existir como software — na
            experiência prática com empresas e na percepção de que muitos negócios
            já têm informação suficiente para decidir melhor. O que falta não é
            informação: é a conexão entre as partes.
          </p>
          <p>
            A construção passou por experimentação, automações, organização de
            processos, criação de CRMs, integração de informações, desenvolvimento
            de software e interação constante com problemas reais.
          </p>
          <p>
            Com o tempo, a visão deixou de ser construir mais uma ferramenta.
            Passou a ser{' '}
            <span className="font-editorial italic text-night-green-bright">
              construir uma nova forma de administrar empresas
            </span>
            .
          </p>
        </div>

        <ul className="flex flex-wrap gap-2 pt-1">
          {TRAJETORIA.map((t) => (
            <li key={t} className="pill px-3.5 py-1.5 text-xs text-night-text-dim">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="balloon px-6 py-7">
        <p className="font-editorial text-lg font-light leading-snug text-night-text">
          A Ponte não nasceu de uma empresa gigantesca tentando criar mais um software.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-night-text-soft">
          Nasceu da observação de problemas reais de gestão — e da tentativa de
          construir uma forma diferente de compreendê-los.
        </p>
        <div className="mt-6 flex items-center gap-3 border-t border-night-700/60 pt-5">
          <span aria-hidden="true" className="dot-green h-2.5 w-2.5 rounded-full" />
          <div>
            <p className="text-sm font-semibold text-night-text">Kelven</p>
            <p className="text-xs text-night-text-dim">fundador da Ponte Digital</p>
          </div>
        </div>
      </div>
    </div>
  )
}