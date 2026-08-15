import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Marca institucional da Ponte Digital — P100, "A Travessia" (reconstruída).
 *
 * Primeira leitura (2 segundos): UMA PONTE — um arco elegante entre duas
 * margens, com os dois lados quase se tocando no alto, fechados por um único
 * nó (a conexão central). Não é ponte de engenharia, nem ponte suspensa com
 * cabos: é a estrutura mínima e sofisticada de uma travessia.
 *
 * Segunda leitura (a linguagem da Ponte — pontos, sinais, convergência):
 *   · as duas margens (pilares + apoios no chão) = as partes separadas de
 *     uma empresa que precisam conversar;
 *   · o arco em DOIS TRECHOS que se aproximam pelo alto = informação
 *     convergindo de cada lado — a mesma conversa que a landing desenha
 *     (sinais → linhas → convergência);
 *   · o NÓ no ápice = a clareza onde as partes se encontram — não é um
 *     enfeite, é a consequência da conexão (o keystone que fecha o arco);
 *   · o espaço entre as duas margens, aberto, = A PASSAGEM (o vão que se
 *     atravessa; aquilo que ainda não foi conectado).
 *
 * Regra da rodada: LOGO = ponte · MARCA = ponte + conexão + inteligência ·
 * EXPERIÊNCIA = fragmentação → conexão → contexto → clareza → evolução.
 * O símbolo não tenta carregar toda a filosofia — ele é a origem dela: a
 * mesma gramática (arco + margens + nó) é o que a landing repete em
 * hero-visual, live-map e passagem.
 *
 * Variação:
 *   · variant="full"  — versão completa (padrão): arco em dois trechos +
 *     nó central + duas margens (pilares com apoio no chão). Usar ≥ 24px.
 *   · variant="micro" — redução responsiva (16–24px, favicon, avatares, tiles):
 *     mesma silhueta, traços mais pesados, nó maior para sobreviver.
 *
 * Cores (hierarquia da identidade, só tokens existentes):
 *   · ink    — estrutura (margens/pilares e apoios no chão);
 *   · path   — a travessia (o arco);
 *   · signal — a clareza (o nó onde as partes se encontram).
 *
 * Superfícies:
 *   · surface="light"     — fundo claro (produto/documentos).
 *   · surface="dark"      — fundo azul-noite (landing).
 *   · surface="deepnight" — fundo muito escuro/colorido (estrutura em branco).
 *   · surface="mono"      — tudo herda currentColor (PB, tiles, impressão).
 *
 * Animação futura (cada elemento é um path separado, desenhável via
 * stroke-dashoffset): margens aparecem → o arco nasce das duas bordas e
 * converge → o nó fecha a conexão → a passagem completa a leitura.
 */
export type PonteSurface = 'light' | 'dark' | 'deepnight' | 'mono'
export type PonteSymbolVariant = 'full' | 'micro'
export type PonteSize = 'micro' | 'small' | 'medium' | 'large'

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
  deepnight: {
    '--brand-ink': 'hsl(0 0% 100%)',
    '--brand-path': 'hsl(var(--l-azure))',
    '--brand-signal': 'hsl(var(--l-green-bright))',
  } as CSSProperties,
}

interface BridgeShape {
  arcL: string
  arcR: string
  pillarL: string
  pillarR: string
  groundL: string
  groundR: string
  node: { cx: number; cy: number; r: number }
  stroke: { arc: number; pillar: number; ground: number }
}

// "A Travessia" (P100) — ponte-e-nó, viewBox 48×48:
// duas margens (pilares 13/35, y 15→40, apoiadas nos dois blocos do solo
// 5–20 e 28–43) sustentam um arco em DOIS TRECHOS que convergem pelo alto
// (Béziers a partir dos topos 13,15 e 35,15, ápice ~24,4.6) — cada lado da
// empresa se aproxima do outro; o NÓ no ápice (24,5) fecha a conexão no ponto
// exato do encontro, como a pedra de fecho do arco. O espaço aberto entre as
// margens = A PASSAGEM (o vão que se atravessa). Estrutura/margens em ink,
// travessia (o arco) em path, clareza (o nó) em signal.
const BRIDGE: BridgeShape = {
  arcL: 'M 13 15 C 16 6, 21 4.6, 23.3 4.6',
  arcR: 'M 35 15 C 32 6, 27 4.6, 24.7 4.6',
  pillarL: 'M 13 15 L 13 40',
  pillarR: 'M 35 15 L 35 40',
  groundL: 'M 5 40 L 20 40',
  groundR: 'M 28 40 L 43 40',
  node: { cx: 24, cy: 5, r: 3.2 },
  stroke: { arc: 3.6, pillar: 3.0, ground: 3.0 },
}

const BRIDGE_MICRO: BridgeShape = {
  arcL: BRIDGE.arcL,
  arcR: BRIDGE.arcR,
  pillarL: BRIDGE.pillarL,
  pillarR: BRIDGE.pillarR,
  groundL: BRIDGE.groundL,
  groundR: BRIDGE.groundR,
  node: { cx: 24, cy: 5, r: 3.8 },
  stroke: { arc: 4.4, pillar: 3.8, ground: 3.8 },
}

export function PonteSymbol({ className, surface = 'light', variant = 'full' }: PonteSymbolProps) {
  const mono = surface === 'mono'
  const style = mono ? undefined : SURFACE_VARS[surface]
  const c = (varName: 'ink' | 'path' | 'signal') => (mono ? 'currentColor' : `var(--brand-${varName})`)
  const s = variant === 'micro' ? BRIDGE_MICRO : BRIDGE

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
      {/* Apoios no chão — as duas margens que sustentam a travessia */}
      <path d={s.groundL} stroke={c('ink')} strokeWidth={s.stroke.ground} strokeLinecap="round" />
      <path d={s.groundR} stroke={c('ink')} strokeWidth={s.stroke.ground} strokeLinecap="round" />
      {/* Pilares — a estrutura levantada por cada lado */}
      <path d={s.pillarL} stroke={c('ink')} strokeWidth={s.stroke.pillar} strokeLinecap="round" />
      <path d={s.pillarR} stroke={c('ink')} strokeWidth={s.stroke.pillar} strokeLinecap="round" />
      {/* O arco — dois trechos que convergem pelo alto (a travessia) */}
      <path d={s.arcL} stroke={c('path')} strokeWidth={s.stroke.arc} strokeLinecap="round" />
      <path d={s.arcR} stroke={c('path')} strokeWidth={s.stroke.arc} strokeLinecap="round" />
      {/* O nó no ápice — a clareza onde as duas partes se encontram */}
      <circle cx={s.node.cx} cy={s.node.cy} r={s.node.r} fill={c('signal')} />
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
}: PonteLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <PonteSymbol surface={surface} variant={variant} className={symbolClassName} />
      {withWordmark && <Wordmark surface={surface} />}
    </span>
  )
}

interface PonteLogoHorizontalProps extends PonteSymbolProps {
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