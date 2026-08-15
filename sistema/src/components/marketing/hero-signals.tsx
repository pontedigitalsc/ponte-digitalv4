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
 * hipótese de propósito: "talvez exista um padrão". Camada Rodada 3:
 * balões translúcidos sobre azul-noite, o encontro em verde profundo.
 */
export function HeroSignals() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="text-center text-2xl leading-none text-night-text-dim/60" aria-hidden="true">…</p>

      <div className="relative mt-6">
        {/* fio que começa a ligá-los — um traço contínuo, sem efeito */}
        <div className="absolute inset-x-6 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-night-teal/30 to-transparent sm:block" aria-hidden="true">
          <span className="dot-teal absolute -top-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full animate-note" />
        </div>

        <div className="relative mx-auto grid max-w-md grid-cols-3 gap-2 sm:gap-3">
          {SINAIS.map((s) => (
            <div
              key={s.texto}
              className="balloon px-2 py-3 text-center sm:px-3 sm:py-4"
              style={{ transform: `rotate(${s.rotate}deg)` }}
            >
              <p className="text-xs leading-relaxed text-night-text sm:text-sm">{s.texto}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-night-text-dim">{s.nota}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-9 max-w-md text-center font-editorial text-xl font-light italic leading-snug text-night-text text-balance sm:text-2xl">
        Quando as partes começam a conversar,
        <span className="text-night-green-bright"> a empresa começa a enxergar melhor.</span>
      </p>
    </div>
  )
}