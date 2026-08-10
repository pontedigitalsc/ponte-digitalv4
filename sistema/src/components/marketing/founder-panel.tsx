import { FounderCTA } from './founder-cta'

/**
 * Motivo decorativo discreto reaproveitando a linguagem do Hero (sinais se
 * conectando): pontos em névoa muito baixa opacidade, o nó final em verde
 * profundo — o único ponto de verde visível no motivo, como "sinal de
 * participação".
 */
function FounderMark() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 opacity-[0.12] sm:h-48 sm:w-48"
      aria-hidden="true"
      fill="none"
    >
      <circle cx="20" cy="20" r="3" fill="white" />
      <circle cx="55" cy="45" r="2.5" fill="white" />
      <circle cx="15" cy="70" r="3" fill="white" />
      <circle cx="70" cy="15" r="2.5" fill="white" />
      <path d="M20,20 L55,45 M15,70 L55,45 M70,15 L55,45 M55,45 L150,60" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="150" cy="60" r="4" fill="hsl(var(--l-green-bright))" fillOpacity="0.9" />
    </svg>
  )
}

const BENEFICIOS = [
  'acesso antecipado ao que está sendo construído',
  'proximidade da evolução da Ponte',
  'influência por meio de feedback real',
  'participação na fase de construção e aprendizado',
  'proximidade com o projeto e com quem o constrói',
  'participar da primeira geração dessa abordagem',
]

/**
 * Founder — o momento mais marcante da página (azul-noite + verde
 * profundo). Não é um CTA: é um convite institucional para participar da
 * construção. Texto em tom claro sobre fundo escuro; o verde fica
 * reservado ao rótulo "ou", aos benefícios e ao CTA — "verde = decisão
 * de participar".
 */
export function FounderPanel() {
  return (
    <div
      className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-night-green/25"
      style={{
        backgroundImage:
          'radial-gradient(120% 140% at 12% 0%, hsl(var(--l-night-800) / 0.9) 0%, hsl(var(--l-night-900)) 52%, hsl(var(--l-green) / 0.28) 135%)',
      }}
    >
      <FounderMark />

      <div className="relative grid gap-4 px-6 pb-4 pt-10 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:px-10 sm:pt-14 sm:pb-6">
        <p className="text-center text-lg leading-snug text-night-text-soft sm:text-right sm:text-xl text-balance">
          Você pode esperar a nova categoria ficar pronta.
        </p>
        <span className="text-night-green-bright text-center text-xs font-medium uppercase tracking-[0.25em] sm:justify-self-center">
          ou
        </span>
        <p className="font-editorial text-center text-2xl font-light italic leading-snug text-white sm:text-left sm:text-3xl">
          Pode ajudar a construí-la.
        </p>
      </div>

      <div className="relative border-t border-white/10 px-6 py-8 sm:px-10">
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/65">
          A Ponte ainda está na fase de construção e aprendizado. Os primeiros
          participantes não apenas experimentam o que existe — participam de
          perto da evolução daquilo que a Ponte pode se tornar.
        </p>

        <ul className="mx-auto mt-7 grid max-w-2xl gap-x-8 gap-y-3 text-left sm:grid-cols-2">
          {BENEFICIOS.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/75">
              <span aria-hidden="true" className="dot-green mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <FounderCTA variant="evergreen" className="w-full sm:w-auto">
            Quero ser Founder
          </FounderCTA>
        </div>
      </div>
    </div>
  )
}