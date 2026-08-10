const SINAIS = [
  'clientes existentes não estão sendo acompanhados',
  'alguns orçamentos não recebem retorno',
  'clientes antigos desapareceram',
  'determinadas decisões ficam concentradas no proprietário',
  'um problema operacional aparece repetidamente',
]

/**
 * A conversa que muda a pergunta. Uma frase cotidiana, os sinais escondidos
 * atrás dela, e a virada: o problema aparente pode não ser o problema.
 * Camada Rodada 3: o balão da fala, os sinais como pílulas, a virada em
 * verde profundo.
 */
export function StoryExample() {
  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div className="balloon mx-auto w-fit px-6 py-4">
        <p className="font-editorial text-xl italic leading-snug text-night-text sm:text-2xl text-balance">
          &ldquo;Meu problema é falta de clientes.&rdquo;
        </p>
      </div>

      <ul className="space-y-2.5 border-l-2 border-night-teal/40 pl-5">
        {SINAIS.map((s) => (
          <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-night-text-soft">
            <span aria-hidden="true" className="dot-azure mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" />
            {s}
          </li>
        ))}
      </ul>

      <div className="space-y-2 pt-2">
        <p className="text-sm text-night-text-soft">Talvez o problema não seja simplesmente falta de clientes.</p>
        <p className="font-editorial text-xl leading-snug text-night-text sm:text-2xl text-balance">
          Talvez a pergunta certa seja{' '}
          <span className="italic text-night-green-bright">outra</span>.
        </p>
      </div>
    </div>
  )
}
