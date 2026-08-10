import { AvatarPonte } from '@/components/ui/avatar'

const MUNDOS = [
  'clientes',
  'operação',
  'equipe',
  'processos',
  'decisões',
  'histórico',
  'sinais',
  'oportunidades',
]

const ROTACOES = [3, -2, 1.5, -3, 2, -1.5, 2.5, -2]

/**
 * O que a Ponte pode acompanhar — não uma lista de features, mas a
 * amplitude conceitual do olhar: os mundos da empresa existem separados
 * hoje; a Ponte é o ponto onde eles se encontram.
 */
export function Reach() {
  return (
    <div>
      <ul className="mx-auto grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
        {MUNDOS.map((m, i) => (
          <li
            key={m}
            className="pill px-4 py-2 text-center text-sm text-night-text-soft"
            style={{ transform: `rotate(${ROTACOES[i]}deg)` }}
          >
            {m}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center">
          <span aria-hidden="true" className="dot-teal absolute h-1.5 w-1.5 rounded-full animate-note" style={{ transform: 'translate(-62px, 0)' }} />
          <span aria-hidden="true" className="dot-teal absolute h-1.5 w-1.5 rounded-full animate-note" style={{ transform: 'translate(62px, 0)' }} />
          <AvatarPonte state="breathing" size="lg" />
        </div>
        <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-night-text-dim">
          Cada um desses mundos existe hoje em sistemas separados. A Ponte existe
          no ponto onde eles se encontram.
        </p>
      </div>
    </div>
  )
}