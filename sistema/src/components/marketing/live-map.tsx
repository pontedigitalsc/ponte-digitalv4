import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { AvatarPonte } from '@/components/ui/avatar'

/**
 * O "mapa vivo" da conexão — informações isoladas (sinais que a empresa já
 * produz) convergindo para um único ponto coerente: a ponte, e depois a
 * clareza. Peça reutilizável (pode reaparecer discreta em outros pontos da
 * landing): pílulas nomeadas nas coordenadas percentuais, traços que se
 * desenham ao entrar na tela (mecanismo .reveal-line) e o AvatarPonte como
 * centro de convergência — a palavra clareza como a luz de chegada, em
 * verde profundo.
 *
 * Sem JS: os traços permanecem desenhados (ver .reveal-line em globals.css)
 * e as pílulas continuam legíveis — a informação nunca depende de animação.
 * Acessível: o SVG é decorativo (aria-hidden); os sinais são listados como
 * texto real para leitores de tela.
 */

const SINAIS = [
  { nome: 'Cliente', x: 50, y: 8 },
  { nome: 'Pedido', x: 84, y: 26 },
  { nome: 'Equipe', x: 93, y: 52 },
  { nome: 'Orçamento', x: 84, y: 78 },
  { nome: 'Material', x: 50, y: 92 },
  { nome: 'Prazo', x: 16, y: 78 },
  { nome: 'Financeiro', x: 7, y: 52 },
  { nome: 'Decisão', x: 16, y: 26 },
]

const CENTRO = { x: 50, y: 50 }

export function LiveMap({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-lg', className)}>
      <div className="relative aspect-square w-full select-none sm:aspect-[4/3]">
        {/* fundo: uma luz suave no centro, como o ponto de encontro */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--l-azure)/0.12),transparent_70%)]"
        />

        {/* traços que convergem — decorativos */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          fill="none"
        >
          {SINAIS.map((s, i) => (
            <path
              key={s.nome}
              d={`M${CENTRO.x},${CENTRO.y} L${s.x},${s.y}`}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              className="reveal-line"
              style={{ '--line-delay': `${i * 110}ms` } as CSSProperties}
              stroke="hsl(var(--l-teal) / 0.45)"
              strokeWidth={1}
            />
          ))}
        </svg>

        {/* pílulas nomeadas — os sinais reais da empresa */}
        {SINAIS.map((s, i) => (
          <span
            key={s.nome}
            className="pill absolute px-2.5 py-1 text-[11px] font-medium leading-tight text-night-text sm:px-3 sm:text-xs"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: 'translate(-50%, -50%)',
              transitionDelay: `${i * 40}ms`,
            }}
          >
            {s.nome}
          </span>
        ))}

        {/* centro de convergência — o AvatarPonte chega desenhado */}
        <div
          className="absolute"
          style={{ left: `${CENTRO.x}%`, top: `${CENTRO.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <AvatarPonte state="breathing" size="lg" className="shadow-soft" />
        </div>
      </div>

      {/* legendas fora do SVG — texto real, em verde a clareza */}
      <p className="sr-only">
        Sinais de uma empresa: {SINAIS.map((s) => s.nome).join(', ')}. Cada um existe separado;
        conectados pela Ponte, formam compreensão.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <span aria-hidden="true" className="hidden text-lg text-night-teal/60 sm:inline">▶</span>
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          informação isolada
        </p>
        <span aria-hidden="true" className="hidden text-lg text-night-teal/60 sm:inline">→</span>
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-night-azure">
          conexão
        </p>
        <span aria-hidden="true" className="hidden text-lg text-night-teal/60 sm:inline">→</span>
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-night-green-bright">
          clareza
        </p>
      </div>
    </div>
  )
}