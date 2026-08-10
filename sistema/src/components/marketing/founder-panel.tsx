import { FounderCTA } from './founder-cta'

/**
 * Motivo decorativo discreto reaproveitando a linguagem do Hero (sinais se
 * conectando), recolorido para o fundo azul-noite: pontos em branco/névoa
 * muito baixa opacidade, o nó final em verde profundo — o único ponto de
 * verde visível no motivo, como "sinal de participação".
 */
function FounderMark() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 opacity-[0.14] sm:h-48 sm:w-48"
      aria-hidden="true"
      fill="none"
    >
      <circle cx="20" cy="20" r="3" fill="white" />
      <circle cx="55" cy="45" r="2.5" fill="white" />
      <circle cx="15" cy="70" r="3" fill="white" />
      <circle cx="70" cy="15" r="2.5" fill="white" />
      <path d="M20,20 L55,45 M15,70 L55,45 M70,15 L55,45 M55,45 L150,60" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="150" cy="60" r="4" fill="hsl(var(--evergreen-light))" fillOpacity="0.9" />
    </svg>
  )
}

/**
 * Founder — não é mais um bloco claro com CTA colorido: é o momento mais
 * marcante da página (azul-noite + verde profundo), pensado como convite
 * para participar da construção, não como oferta. Texto em tom claro sobre
 * fundo escuro; o único verde visível é o rótulo "ou" e o CTA — reforçando
 * a leitura de "verde = decisão de participar".
 */
export function FounderPanel() {
  return (
    <div className="bg-founder-gradient relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10">
      <FounderMark />

      <div className="relative grid gap-5 px-6 py-10 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:px-10 sm:py-14">
        <p className="text-center text-lg leading-snug text-white/65 sm:text-right sm:text-xl">
          Você pode esperar a Ponte ficar pronta.
        </p>
        <span className="text-evergreen-light text-center text-xs font-medium uppercase tracking-[0.25em] sm:justify-self-center">
          ou
        </span>
        <p className="font-editorial text-center text-2xl font-light italic leading-snug text-white sm:text-left sm:text-3xl">
          Pode ajudar a construí-la.
        </p>
      </div>

      <div className="relative border-t border-white/10 px-6 py-8 text-center sm:px-10">
        <p className="mx-auto max-w-md text-sm leading-relaxed text-white/60">
          A Ponte ainda está sendo construída. Os primeiros participantes têm uma
          oportunidade diferente: não apenas experimentar o que existe, mas participar
          de perto da evolução daquilo que a Ponte pode se tornar.
        </p>
        <FounderCTA variant="evergreen" className="mt-7">
          Tornar-me fundador
        </FounderCTA>
      </div>
    </div>
  )
}
