import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Marca institucional da Ponte Digital — símbolo único, vetorial, sem duplicar
 * SVG espalhado pelo app.
 *
 * Conceito — "A Passagem" (evolução de P96, direção CONEXÃO → PONTO DE CLAREZA):
 *
 *   · fragmentos: seis sinais postados nas margens (colunas esquerda/direita)
 *     — a informação, as pessoas e os processos que existem separados;
 *   · passagem: dois arcos que se abrem e se cruzam formando UMA LENTE
 *     (uma abertura/portal no centro) — dois mundos que não se tocam ainda,
 *     unidos por uma passagem única; sugere uma ponte sem desenhá-la;
 *   · fluxo: dois traços diagonais curtos entrando (cima-direita) e saindo
 *     (baixo-esquerda) — a forma não para na convergência: continua
 *     (informação que atravessa e segue transformada = evolução);
 *   · núcleo: uma pequena jóia sólida dentro da passagem — o ponto de
 *     clareza, o contexto que nasce do encontro.
 *
 * Duas leituras:
 *   1ª — uma forma bonita, elegante e própria (a lente + jóia);
 *   2ª — quem conhece a Ponte percebe: fragmentos que se organizam em
 *        direção a um centro, uma abertura que conecta dois lados, e um
 *        fluxo que continua depois da clareza.
 * A coincidência com uma "mira/olho" reforça o posicionamento ("Antes de
 * melhorar sua empresa, enxergue-a melhor") sem ser literal.
 *
 * Variação:
 *   · variant="full"  — versão completa (padrão): lente + jóia + fragmentos
 *     + fluxos. Usar a partir de 32px.
 *   · variant="micro" — redução responsiva (16–24px, favicon, avatares,
 *     tiles): mesma lente e jóia, apenas dois fragmentos diagonais (o
 *     fluxo implícito). A marca pequena preserva a essência.
 *
 * Cores (hierarquia da identidade):
 *   surface="light" — fundo claro: fragmentos azul-noite (ink), passagem
 *                     azul primário (o caminho), núcleo evergreen (clareza).
 *   surface="dark"  — fundo azul-noite (landing): azure suave / azure /
 *                     verde profundo (l-green).
 *   surface="mono"  — tudo herda currentColor (PB, favicon, tiles, impressão;
 *                     controle pela cor do elemento pai, ex. text-white).
 */

export type PonteSurface = 'light' | 'dark' | 'mono'
export type PonteSymbolVariant = 'full' | 'micro'

interface PonteSymbolProps {
  className?: string
  surface?: PonteSurface
  variant?: PonteSymbolVariant
}

const SURFACE_VARS: Record<Exclude<PonteSurface, 'mono'>, CSSProperties> = {
  light: {
    '--brand-ink': 'hsl(var(--institutional-900))',
    '--brand-path': 'hsl(var(--primary))',
    '--brand-signal': 'hsl(var(--evergreen))',
  } as CSSProperties,
  dark: {
    '--brand-ink': 'hsl(var(--l-azure-soft))',
    '--brand-path': 'hsl(var(--l-azure))',
    '--brand-signal': 'hsl(var(--l-green))',
  } as CSSProperties,
}

interface ShapeSet {
  arcLeft: string
  arcRight: string
  stroke: number
  tailIn: string
  tailOut: string
  tailStroke: number
  fragments: Array<{ cx: number; cy: number; r: number }>
  center: { cx: number; cy: number; r: number }
}

// Lente/portal: arcos que partem dos vértices (24, 9.5) e (24, 38.5) e se
// cruzam aos lados do centro, formando abertura vertical de ~20u × 29u.
const LENS_LEFT = 'M 24 9.5 C 17.6 10.9, 13.9 16.7, 13.9 24 C 13.9 31.3, 17.6 37.1, 24 38.5'
const LENS_RIGHT = 'M 24 38.5 C 30.4 37.1, 34.1 31.3, 34.1 24 C 34.1 16.7, 30.4 10.9, 24 9.5'

const FULL_SHAPES: ShapeSet = {
  arcLeft: LENS_LEFT,
  arcRight: LENS_RIGHT,
  stroke: 3,
  // fluxo: entra por cima-direita, atravessa a passagem e sai por baixo-esquerda
  tailIn: 'M 34.8 6.2 C 31.6 7, 27.6 8.2, 24 9.5',
  tailOut: 'M 24 38.5 C 20.4 39.8, 16.4 41, 13.2 41.8',
  tailStroke: 2.1,
  fragments: [
    { cx: 8.2, cy: 13.2, r: 1.9 },
    { cx: 7.6, cy: 24, r: 1.9 },
    { cx: 8.2, cy: 34.8, r: 1.9 },
    { cx: 39.8, cy: 13.2, r: 1.9 },
    { cx: 40.4, cy: 24, r: 1.9 },
    { cx: 39.8, cy: 34.8, r: 1.9 },
  ],
  center: { cx: 24, cy: 24, r: 3.4 },
}

const MICRO_SHAPES: ShapeSet = {
  arcLeft: LENS_LEFT,
  arcRight: LENS_RIGHT,
  stroke: 3.4,
  tailIn: '',
  tailOut: '',
  tailStroke: 0,
  fragments: [
    { cx: 33.2, cy: 8.2, r: 2.1 },
    { cx: 14.8, cy: 39.8, r: 2.1 },
  ],
  center: { cx: 24, cy: 24, r: 4.2 },
}

export function PonteSymbol({ className, surface = 'light', variant = 'full' }: PonteSymbolProps) {
  const mono = surface === 'mono'
  const style = mono ? undefined : SURFACE_VARS[surface]
  const c = (varName: 'ink' | 'path' | 'signal') => (mono ? 'currentColor' : `var(--brand-${varName})`)
  const s = variant === 'micro' ? MICRO_SHAPES : FULL_SHAPES

  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Ponte Digital"
      focusable="false"
      className={cn('shrink-0 select-none', className)}
      style={style as CSSProperties}
      fill="none"
    >
      {/* Fluxos — a forma continua além da convergência (evolução) */}
      {s.tailIn && s.tailOut && (
        <>
          <path
            d={s.tailIn}
            stroke={c('path')}
            strokeWidth={s.tailStroke}
            strokeLinecap="round"
            opacity={0.7}
          />
          <path
            d={s.tailOut}
            stroke={c('path')}
            strokeWidth={s.tailStroke}
            strokeLinecap="round"
            opacity={0.7}
          />
        </>
      )}
      {/* Passagem — dois arcos que se cruzam formando a lente/portal */}
      <path d={s.arcLeft} stroke={c('path')} strokeWidth={s.stroke} strokeLinecap="round" />
      <path d={s.arcRight} stroke={c('path')} strokeWidth={s.stroke} strokeLinecap="round" />
      {/* Fragmentos — sinais postados nas margens */}
      {s.fragments.map((f, i) => (
        <circle key={i} cx={f.cx} cy={f.cy} r={f.r} fill={c('ink')} />
      ))}
      {/* Clareza — a jóia dentro da passagem */}
      <circle cx={s.center.cx} cy={s.center.cy} r={s.center.r} fill={c('signal')} />
    </svg>
  )
}

interface PonteLogoProps extends PonteSymbolProps {
  /** false (padrão) = só o símbolo; true = símbolo + wordmark "Ponte Digital" */
  withWordmark?: boolean
  /** classes aplicadas ao símbolo interno (ex. controle de altura: h-5 w-auto) */
  symbolClassName?: string
}

export function PonteLogo({
  className,
  surface = 'light',
  variant = 'full',
  withWordmark = false,
  symbolClassName = 'h-7 w-auto',
}: PonteLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <PonteSymbol surface={surface} variant={variant} className={symbolClassName} />
      {withWordmark && (
        <span className="font-sans font-semibold tracking-tight text-inherit">
          Ponte Digital
        </span>
      )}
    </span>
  )
}