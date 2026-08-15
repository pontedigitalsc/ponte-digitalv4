import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Marca institucional da Ponte Digital — símbolo único, vetorial, sem duplicar
 * SVG espalhado pelo app.
 *
 * Conceito — "O Encontro" (interpretação da D1, convergência):
 *   · quatro sinais dispersos nas margens (fragmentos da realidade)
 *   · dois arcos que partem das margens e convergem para o centro
 *   · no centro, UM único ponto se completa — a clareza que nasce da
 *     própria geometria (não é um desenho acrescentado, como uma estrela)
 *
 * Dois lados que estavam separados encontram uma estrutura comum. A leitura
 * é de acolhimento e convergência — humano, equilibrado, e simples o
 * suficiente para sobreviver à redução. Ao esconder o nome "Ponte Digital",
 * o gesto reconhecível é: duas margens que se abrem para um centro.
 *
 * Variação:
 *   · variant="full"  — versão completa (padrão): margens + arcos + centro.
 *   · variant="micro" — redução responsiva (16–24px, favicon, avatares,
 *     tiles): mesmos arcos mais curtos e pontos de margem, idênticos de
 *     leitura — a marca pequena preserva a essência, não todos os detalhes.
 *
 * Cores (hierarquia da identidade):
 *   surface="light" — fundo claro: margens azul-noite(ink), arcos azul
 *                     primário (o caminho), centro evergreen (a clareza).
 *   surface="dark"  — fundo azul-noite (landing): margens azure suave,
 *                     arcos azure, centro verde (l-green).
 *   surface="mono"  — tudo herda currentColor (PB, favicon, tiles, impressão;
 *                     controle pela cor do elemento pai, ex. text-white).
 */

export type PonteSurface = 'light' | 'dark' | 'mono'
export type PonteSymbolVariant = 'full' | 'micro'
export type PonteShapePath = 'arcLeft' | 'arcRight'

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
  fragments: Array<{ cx: number; cy: number; r: number }>
  center: { cx: number; cy: number; r: number }
}

const FULL_SHAPES: ShapeSet = {
  arcLeft: 'M 11 13 Q 3 24 11 35',
  arcRight: 'M 37 13 Q 45 24 37 35',
  stroke: 3.6,
  fragments: [
    { cx: 7.6, cy: 19.6, r: 1.9 },
    { cx: 7.6, cy: 28.4, r: 1.9 },
    { cx: 40.4, cy: 19.6, r: 1.9 },
    { cx: 40.4, cy: 28.4, r: 1.9 },
  ],
  center: { cx: 24, cy: 24, r: 5 },
}

const MICRO_SHAPES: ShapeSet = {
  arcLeft: 'M 17 19 Q 10 24 17 29',
  arcRight: 'M 31 19 Q 38 24 31 29',
  stroke: 3.2,
  fragments: [
    { cx: 17, cy: 19, r: 1.5 },
    { cx: 17, cy: 29, r: 1.5 },
    { cx: 31, cy: 19, r: 1.5 },
    { cx: 31, cy: 29, r: 1.5 },
  ],
  center: { cx: 24, cy: 24, r: 5 },
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
      {/* Margens — dois arcos que convergem para o centro */}
      <path
        d={s.arcLeft}
        stroke={c('path')}
        strokeWidth={s.stroke}
        strokeLinecap="round"
      />
      <path
        d={s.arcRight}
        stroke={c('path')}
        strokeWidth={s.stroke}
        strokeLinecap="round"
      />
      {/* Fragmentos — sinais dispersos nas margens da realidade */}
      {s.fragments.map((f, i) => (
        <circle key={i} cx={f.cx} cy={f.cy} r={f.r} fill={c('ink')} />
      ))}
      {/* Clareza — o único ponto no centro, completo por si só */}
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