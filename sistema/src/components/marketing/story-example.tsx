const SINAIS = [
  'clientes existentes não estão sendo acompanhados',
  'alguns orçamentos não recebem retorno',
  'clientes antigos desapareceram',
  'determinadas decisões ficam concentradas no proprietário',
  'um problema operacional aparece repetidamente',
]

export function StoryExample() {
  return (
    <div className="mx-auto max-w-lg space-y-8">
      <p className="font-editorial text-xl italic leading-snug text-foreground sm:text-2xl text-balance">
        &ldquo;Meu problema é falta de clientes.&rdquo;
      </p>

      <ul className="space-y-2.5 border-l-2 border-primary/25 pl-5">
        {SINAIS.map((s) => (
          <li key={s} className="text-sm leading-relaxed text-muted-foreground">
            {s}
          </li>
        ))}
      </ul>

      <div className="space-y-2 pt-2">
        <p className="text-sm text-muted-foreground">Talvez o problema não seja simplesmente falta de clientes.</p>
        <p className="font-editorial text-xl leading-snug text-foreground sm:text-2xl text-balance">
          Talvez a pergunta certa seja outra.
        </p>
      </div>
    </div>
  )
}
