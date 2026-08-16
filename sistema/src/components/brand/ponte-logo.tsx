import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Marca institucional da Ponte Digital — P100B, "Clareza" (o símbolo aberto).
 *
 * Princípio da rodada (Founder): UM ÚNICO SÍMBOLO CONTA UMA HISTÓRIA POR VÁRIAS
 * LEITURAS SIMULTÂNEAS. Ela não diz "nós somos uma ponte" — ela faz a pessoa
 * sentir que "isso conecta coisas e as torna claras".
 *
 * O símbolo representa o processo que a Ponte Digital executa numa empresa:
 *
 *   FRAGMENTOS → CONEXÃO → CONVERGÊNCIA → CONTEXTO → CLAREZA → EVOLUÇÃO
 *
 * Leituras simultâneas:
 *   · sinais chegando  — 4+4 fragmentos nas margens (unidades de informação
 *     independentes: pessoa, processo, venda, planilha, WhatsApp, memória);
 *   · conexão          — as linhas atravessam o centro (informação conversa);
 *   · convergência     — as linhas dos dois lados se aproximam e cruzam no meio;
 *   · contexto/clareza — o centro (losango + eixos + pontas) organiza o disperso:
 *     é um PONTO DE CLAREZA surgindo no encontro, tratado como símbolo próprio
 *     da Ponte (construído em SVG, não é o caractere "✦" nem estrela decorativa);
 *   · evolução         — as linhas continuam depois do encontro (os caminhos não
 *     param no centro, seguem para o outro lado);
 *   · ponte            — a travessia aparece PELA RELAÇÃO entre os elementos
 *     (duas margens ligadas por linhas), sem desenhar torres, cabos ou arco;
 *   · visão            — a convergência sugere discretamente um foco/lente
 *     ("enxergar melhor a empresa"), sempre subliminar, nunca olho literal.
 *
 * NÃO FAZER (regras da rodada): ponte literal, "✦", ícones prontos (Lucide),
 * rede tecnológica genérica, Wi-Fi/blockchain/banco, excesso de linhas/nós,
 * centro como botão, olho literal, gradientes, sombras, depender de animação.
 *
 * Geometria (viewBox 240×100, full):
 *   · 8 fragmentos (pontos, `ink`) — 4 à esquerda (x 30) e 4 à direita (x 210),
 *     y {17, 39, 61, 83} — espaçamento perfeitamente consistente (22) e
 *     simétrico (±33, ±11 em torno de y 50): sinais independentes entrando;
 *   · 4 linhas de travessia (`path`) em Bézier quadrática — duas que descem
 *     (cruzam em (120, 36.5)) e duas que sobem (cruzam em (120, 63.5)),
 *     criando a malha da convergência; as linhas continuam além dos cruzamentos;
 *   · o CENTRO (`signal`) em (120, 50) — um losango com 4 eixos diagonais e 4
 *     pontas discretas: o ponto de clareza que nasce no encontro das conexões.
 *
 * O espaçamento e os cruzamentos são matematicamente consistentes; cada
 * elemento é um path separado e deterministicamente desenhável (animação
 * futura: pontos → linhas → malha → convergência → centro acende → fluxo segue).
 *
 * Variações:
 *   · variant="full"  — versão completa (padrão, 240×100): 8 fragmentos + malha
 *     + centro de clareza. Usar ≥ 32px (nav, footer, passagem ampla, lockups).
 *   · variant="micro" — núcleo quadrado (48×48) para 16–32px (favicon, avatar,
 *     sidebar, tiles): 4 fragmentos, o X da convergência e o losango — o que
 *     sobrevive e mantém a identidade na redução.
 *
 * Superfícies (hierarquia de tokens, sem cor nova):
 *   · ink    — estrutura/fragmentos (azul-noite no claro, azul-suave no escuro);
 *   · path   — a travessia/as linhas (primary no claro, azure no escuro);
 *   · signal — a clareza/o centro (evergreen no claro, l-green no escuro).
 *   · surface="mono" — tudo herda currentColor (PB, tiles, impressão).
 */
export type PonteSurface = 'light' | 'dark' | 'deepnight' | 'mono'
export type PonteSymbolVariant = 'full' | 'micro'
export type PonteSize = 'micro' | 'small' | 'medium' | 'large'

interface PonteSymbolProps {
  className?: string
  surface?: PonteSurface
  variant?: PonteSymbolVariant
  /** Tamanho em px (opcional). Quando informado, define width/height numéricos. */
  size?: number
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
  deepnight: {
    '--brand-ink': 'hsl(0 0% 100%)',
    '--brand-path': 'hsl(var(--l-azure))',
    '--brand-signal': 'hsl(var(--l-green-bright))',
  } as CSSProperties,
}

/** Fragmentos do símbolo completo (pontos laterais). */
type Fragments = { lx: number; rx: number; ys: number[]; r: number }
/** A malha de travessia (linhas convergentes em Bézier quadrática). */
type Weave = { d: string; w: number }
/** O centro de clareza — losango + eixos + pontas. */
type Clarity = {
  cx: number
  cy: number
  hw: number
  hh: number
  /** eixos diagonais partindo do centro (M cx cy L x y). */
  rays: [number, number][]
  /** pontas discretas (círculos) no fim de cada eixo. */
  dots: [number, number, number][]
}

interface BridgeShape {
  viewBox: string
  fragments: Fragments
  weave: Weave[]
  clarity: Clarity
}

// "Clareza" (P100B) — full, 240×100: o símbolo aberto. 8 fragmentos nas duas
// margens, malha Bézier que converge e continua, centro de clareza no encontro.
// y dos fragmentos {17, 39, 61, 83}: espaçamento 22, simétrico em torno de 50.
const BRIDGE: BridgeShape = {
  viewBox: '0 0 240 100',
  fragments: { lx: 30, rx: 210, ys: [17, 39, 61, 83], r: 3.5 },
  weave: [
    // desce da margem esquerda de cima → cruza com a direita em (120, 36.5)
    { d: 'M 30 17 Q 120 34 210 61', w: 2.8 },
    // sobe da margem esquerda de baixo → cruza com a direita em (120, 63.5)
    { d: 'M 30 83 Q 120 66 210 39', w: 2.8 },
    // desce da margem direita de cima → cruza com a esquerda em (120, 36.5)
    { d: 'M 210 17 Q 120 34 30 61', w: 2.8 },
    // sobe da margem direita de baixo → cruza com a esquerda em (120, 63.5)
    { d: 'M 210 83 Q 120 66 30 39', w: 2.8 },
  ],
  clarity: {
    cx: 120,
    cy: 50,
    hw: 6,
    hh: 8,
    rays: [
      [126.4, 43.6],
      [113.6, 43.6],
      [126.4, 56.4],
      [113.6, 56.4],
    ],
    dots: [
      [126.4, 43.6, 1.7],
      [113.6, 43.6, 1.7],
      [126.4, 56.4, 1.7],
      [113.6, 56.4, 1.7],
    ],
  },
}

// "Clareza" micro — 48×48: núcleo quadrado para 16–32px. 4 fragmentos, o X da
// convergência e o losango da clareza — a identidade na redução sem perder leitura.
const BRIDGE_MICRO: BridgeShape = {
  viewBox: '0 0 48 48',
  fragments: { lx: 8, rx: 40, ys: [13.5, 34.5], r: 2.8 },
  weave: [
    { d: 'M 8 13.5 Q 24 24 40 34.5', w: 3.4 },
    { d: 'M 40 13.5 Q 24 24 8 34.5', w: 3.4 },
  ],
  clarity: {
    cx: 24,
    cy: 24,
    hw: 3.2,
    hh: 4.8,
    rays: [],
    dots: [],
  },
}

function lozengePath({ cx, cy, hw, hh }: Clarity): string {
  return `M ${cx} ${cy - hh} L ${cx + hw} ${cy} L ${cx} ${cy + hh} L ${cx - hw} ${cy} Z`
}

export function PonteSymbol({ className, surface = 'light', variant = 'full', size }: PonteSymbolProps) {
  const mono = surface === 'mono'
  const style = mono ? undefined : SURFACE_VARS[surface]
  const c = (varName: 'ink' | 'path' | 'signal') => (mono ? 'currentColor' : `var(--brand-${varName})`)
  const s = variant === 'micro' ? BRIDGE_MICRO : BRIDGE
  const { lx, rx, ys, r } = s.fragments
  const sizeStyle = size ? { width: size, height: size * (100 / 240) } : undefined

  return (
    <svg
      viewBox={s.viewBox}
      role="img"
      aria-label="Ponte Digital"
      focusable="false"
      className={cn('shrink-0 select-none', variant === 'micro' && 'aspect-square', className)}
      style={{ ...sizeStyle, ...style } as CSSProperties}
      fill="none"
    >
      {/* A malha — linhas Bézier que atravessam o centro e continuam além dele */}
      <g>
        {s.weave.map((thread, i) => (
          <path key={i} d={thread.d} stroke={c('path')} strokeWidth={thread.w} strokeLinecap="round" />
        ))}
      </g>
      {/* Os fragmentos — unidades de informação de cada margem */}
      <g>
        {ys.map((y) => (
          <g key={y}>
            <circle cx={lx} cy={y} r={r} fill={c('ink')} />
            <circle cx={rx} cy={y} r={r} fill={c('ink')} />
          </g>
        ))}
      </g>
      {/* O centro de clareza — eixos → losango → pontas (por cima da malha) */}
      <g>
        {s.clarity.rays.map(([x, y], i) => (
          <line key={`r${i}`} x1={s.clarity.cx} y1={s.clarity.cy} x2={x} y2={y} stroke={c('signal')} strokeWidth={2} strokeLinecap="round" />
        ))}
        <path d={lozengePath(s.clarity)} fill={c('signal')} />
        {s.clarity.dots.map(([x, y, dr], i) => (
          <circle key={`d${i}`} cx={x} cy={y} r={dr} fill={c('signal')} />
        ))}
      </g>
    </svg>
  )
}

// ─── WORDMARK INSTITUCIONAL ───────────────────────────────────────────────────
// "PONTE" com presença (bold); "DIGITAL" menor, com espaçamento controlado e
// na cor da travessia (path) — hierarquia institucional em duas linhas de leitura.

function Wordmark({ surface }: { surface: PonteSurface }) {
  const mono = surface === 'mono'
  const ink = mono ? undefined : { color: 'var(--brand-ink)' }
  const path = mono ? undefined : { color: 'var(--brand-path)' }
  return (
    <span className="inline-flex items-baseline gap-1.5 leading-none">
      <span style={ink} className="font-sans font-bold uppercase tracking-[-0.02em]">
        Ponte
      </span>
      <span
        style={path}
        className="font-sans text-[0.62em] font-semibold uppercase tracking-[0.3em]"
      >
        Digital
      </span>
    </span>
  )
}

interface PonteLogoProps extends PonteSymbolProps {
  /** false (padrão) = só o símbolo; true = símbolo + lockup "PONTE DIGITAL" */
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
  size,
}: PonteLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <PonteSymbol surface={surface} variant={variant} className={symbolClassName} size={size} />
      {withWordmark && <Wordmark surface={surface} />}
    </span>
  )
}

interface PonteLogoHorizontalProps extends Omit<PonteSymbolProps, 'size'> {
  size?: PonteSize
  symbolClassName?: string
}

const HORIZONTAL_SCALE: Record<PonteSize, { symbol: string; type: string }> = {
  micro: { symbol: 'h-4 w-auto', type: 'text-[10px]' },
  small: { symbol: 'h-5 w-auto', type: 'text-xs' },
  medium: { symbol: 'h-7 w-auto', type: 'text-base' },
  large: { symbol: 'h-10 w-auto', type: 'text-2xl' },
}

/** Lockup horizontal — símbolo + wordmark em linha única. */
export function PonteLogoHorizontal({
  className,
  surface = 'light',
  variant = 'full',
  size = 'medium',
  symbolClassName,
}: PonteLogoHorizontalProps) {
  const scale = HORIZONTAL_SCALE[size]
  return (
    <span className={cn('inline-flex items-center gap-2.5', scale.type, className)}>
      <PonteSymbol surface={surface} variant={variant} className={symbolClassName ?? scale.symbol} />
      <Wordmark surface={surface} />
    </span>
  )
}

const STACKED_SCALE: Record<PonteSize, { symbol: string; type: string }> = {
  micro: { symbol: 'h-4 w-auto', type: 'text-[10px]' },
  small: { symbol: 'h-5 w-auto', type: 'text-xs' },
  medium: { symbol: 'h-7 w-auto', type: 'text-base' },
  large: { symbol: 'h-10 w-auto', type: 'text-2xl' },
}

/** Lockup empilhado — símbolo sobre wordmark em duas linhas (sell/impressão). */
export function PonteLogoStacked({
  className,
  surface = 'light',
  variant = 'full',
  size = 'medium',
  symbolClassName,
}: PonteLogoHorizontalProps) {
  const scale = STACKED_SCALE[size]
  return (
    <span className={cn('inline-flex flex-col items-center gap-1.5', scale.type, className)}>
      <PonteSymbol surface={surface} variant={variant} className={symbolClassName ?? scale.symbol} />
      <span className="flex flex-col items-center">
        <span
          className="font-sans font-bold uppercase leading-none tracking-[-0.02em]"
          style={surface === 'mono' ? undefined : { color: 'var(--brand-ink)' }}
        >
          Ponte
        </span>
        <span
          className="mt-1.5 font-sans text-[0.58em] font-semibold uppercase leading-none tracking-[0.3em]"
          style={surface === 'mono' ? undefined : { color: 'var(--brand-path)' }}
        >
          Digital
        </span>
      </span>
    </span>
  )
}