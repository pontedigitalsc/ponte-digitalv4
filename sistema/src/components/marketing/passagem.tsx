import { PonteSymbol } from '@/components/brand/ponte-logo'

const ANTES = ['cliente', 'prazo', 'orçamento', 'equipe', 'financeiro', 'histórico']
const DEPOIS = ['contexto', 'leitura', 'decisão preparada', 'aprendizado']

/**
 * A Passagem — a travessia da marca em três momentos: fragmentos dispersos
 * (antes) → a lente da Ponte + contexto (passagem) → uma visão mais clara
 * (depois). A própria identidade vira o fio condutor da narrativa.
 *
 * Honestidade: a travessia não promete resultado financeiro — promete clareza
 * para enxergar o que já existe e decidir melhor.
 */
export function Passagem() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          A travessia
        </p>
        <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          Uma passagem entre o que está espalhado e o que você consegue ver.
        </h2>
      </div>

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
        {/* ANTES — informação espalhada */}
        <div className="balloon px-6 py-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-text-dim">Antes</p>
          <p className="mt-1 font-editorial text-lg font-light italic leading-snug text-night-text-dim">
            informações espalhadas
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2" aria-hidden="true">
            {ANTES.map((w, i) => (
              <span
                key={w}
                className="pill px-3 py-1 text-xs text-night-text-dim"
                style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* PASSAGEM — a lente + o contexto */}
        <div className="relative flex flex-col items-center gap-3 py-2">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="dot-azure h-1.5 w-1.5 rounded-full opacity-60" />
            <span className="dot-azure h-1.5 w-1.5 rounded-full opacity-80" />
          </div>
          <PonteSymbol surface="dark" variant="full" className="h-20 w-auto" />
          <span
            className="h-16 w-px"
            style={{ background: 'linear-gradient(180deg, hsl(var(--l-teal)/0.5), hsl(var(--l-teal)/0.08))' }}
          />
          <span className="rounded-full border border-night-green/40 bg-night-800 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-night-green-bright">
            conexão + contexto
          </span>
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="dot-teal h-1.5 w-1.5 rounded-full opacity-80" />
            <span className="dot-teal h-1.5 w-1.5 rounded-full opacity-60" />
          </div>
        </div>

        {/* DEPOIS — visão mais clara */}
        <div className="rounded-[1.4rem] border border-night-green/40 bg-[radial-gradient(120%_100%_at_100%_0%,hsl(var(--l-green)/0.14),transparent_65%)] bg-night-800/80 px-6 py-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-green-bright">Depois</p>
          <p className="mt-1 font-editorial text-lg font-light italic leading-snug text-night-green-bright">
            visão mais clara
          </p>
          <ul className="mt-5 space-y-2.5">
            {DEPOIS.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm leading-relaxed text-night-text">
                <span aria-hidden="true" className="dot-green h-1.5 w-1.5 shrink-0 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-lg text-center text-sm leading-relaxed text-night-text-soft">
        A travessia não é promessa de resultado pronto — é clareza para enxergar
        o que já existe e decidir melhor. O resto se constrói com a sua operação,
        em conversa real.
      </p>
    </div>
  )
}