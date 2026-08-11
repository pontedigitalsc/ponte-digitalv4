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

const ONDE_CONTRIBUIR = [
  {
    titulo: 'Problemas que importam',
    texto: 'o que sua realidade mostra que ainda não foi resolvido',
  },
  {
    titulo: 'Informações a conectar',
    texto: 'quais partes da empresa você gostaria que conversassem',
  },
  {
    titulo: 'Perguntas relevantes',
    texto: 'as perguntas que você sempre quis poder fazer',
  },
  {
    titulo: 'Funcionalidades',
    texto: 'o que faz sentido primeiro, no dia a dia real',
  },
  {
    titulo: 'Comportamento da inteligência',
    texto: 'como a camada deve ler, perguntar e se posicionar',
  },
  {
    titulo: 'Limites',
    texto: 'até onde a inteligência deve ir — e onde parar',
  },
]

/**
 * Founder — convite institucional para participar da CONSTRUÇÃO DA
 * CATEGORIA (não é "benefícios de assinatura"). A participação guia
 * problemas, informações, perguntas, funcionalidades, comportamento da
 * inteligência e limites. Nada de benefícios inventados: o que não está
 * confirmado é remetido à conversa inicial ("Os detalhes da participação
 * Founder são apresentados na conversa inicial.").
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
          Founder não é um plano de compra: é participar da construção de uma
          categoria. Os primeiros participantes ajudam a definir o que a Ponte
          deve observar, conectar e perguntar — antes de ela existir por completo.
        </p>

        <div className="mx-auto mt-7 grid max-w-2xl gap-x-8 gap-y-4 text-left sm:grid-cols-2">
          {ONDE_CONTRIBUIR.map((c) => (
            <div key={c.titulo} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="dot-green mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" />
              <div>
                <p className="text-sm font-medium text-white/85">{c.titulo}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/55">{c.texto}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <FounderCTA variant="evergreen" className="w-full sm:w-auto">
            Quero participar como Founder
          </FounderCTA>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-xs italic leading-relaxed text-white/50">
          Os detalhes da participação Founder são apresentados na conversa inicial.
        </p>
      </div>
    </div>
  )
}