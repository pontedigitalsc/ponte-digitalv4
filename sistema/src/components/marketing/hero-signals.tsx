const SINAIS = [
  { texto: 'Um orçamento sem resposta', nota: 'cliente', rotate: -2 },
  { texto: 'Um problema que voltou', nota: 'operação', rotate: 1 },
  { texto: 'Uma decisão no improviso', nota: 'rotina', rotate: -1 },
]

/**
 * Logo abaixo do HeroVisual: os sinais empresariais isolados e, embaixo,
 * o fio que começa a ligá-los — a frase final só aparece quando a atenção
 * desce até o ponto em que eles se encontram. Sem animação pesada (o fio
 * é estático; apenas um pulso sutil marca o encontro). Linguagem de
 * hipótese de propósito: "talvez exista um padrão".
 */
export function HeroSignals() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="text-center text-2xl leading-none text-muted-foreground/50" aria-hidden="true">…</p>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        {SINAIS.map((s) => (
          <div
            key={s.texto}
            className="rounded-xl border border-border/70 bg-card/80 px-2 py-3 text-center shadow-soft sm:px-3 sm:py-4"
            style={{ transform: `rotate(${s.rotate}deg)` }}
          >
            <p className="text-xs leading-relaxed text-foreground sm:text-sm">{s.texto}</p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground/60">{s.nota}</p>
          </div>
        ))}
      </div>

      {/* O fio que começa a ligá-los — traços simples, sem efeito. */}
      <div className="mt-6 hidden sm:block" aria-hidden="true">
        <div className="flex justify-between px-[16%]">
          <span className="h-10 w-px bg-border/70" />
          <span className="h-10 w-px bg-border/70" />
          <span className="h-10 w-px bg-border/70" />
        </div>
        <div className="relative h-px bg-border/70">
          <span className="absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/70 animate-pulse-soft" />
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-md text-center font-editorial text-xl font-light italic leading-snug text-foreground text-balance sm:text-2xl">
        Quando esses sinais aparecem juntos,
        <span className="text-primary"> talvez exista um padrão.</span>
      </p>
    </div>
  )
}