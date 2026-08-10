const TRADICIONAL = ['Registra', 'Organiza', 'Consulta', 'Relata']
const PONTE = ['Conecta', 'Contextualiza', 'Investiga', 'Ajuda a pensar']

/**
 * A diferença fundamental — apresentada como camada, nunca como ataque:
 * os sistemas tradicionais registram e organizam; a Ponte entra onde eles
 * param. Colunas em balões translúcidos; a coluna da Ponte recebe a luz
 * verde de evolução.
 */
export function Comparison() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="rounded-2xl border border-night-700/50 bg-night-surf/50 px-5 py-6 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-text-dim">
            Sistema tradicional
          </p>
          <ul className="mt-4 space-y-2.5">
            {TRADICIONAL.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-night-text-soft">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-night-text-dim/50" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <span aria-hidden="true" className="hidden font-editorial text-2xl italic text-night-text-dim sm:block">
          →
        </span>

        <div className="rounded-2xl border border-night-green/40 bg-[radial-gradient(120%_100%_at_100%_0%,hsl(var(--l-green)/0.14),transparent_65%)] bg-night-800/80 px-5 py-6 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-green-bright">
            A Ponte
          </p>
          <ul className="mt-4 space-y-2.5">
            {PONTE.map((p, i) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-night-text">
                <span aria-hidden="true" className="dot-green h-1.5 w-1.5 rounded-full" />
                <span className={i === 3 ? 'font-editorial text-base italic text-night-green-bright' : undefined}>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-night-text-dim">
        Não é um ataque aos sistemas. É a camada que faltava acima deles — a que
        transforma dados registrados em leitura, investigação e decisão.
      </p>
    </div>
  )
}