import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Marca institucional da Ponte Digital — P99, "A Travessia".
 *
 * Primeira leitura (2 segundos): UMA PONTE.
 * A marca para de esconder o próprio nome. Uma ponte arquitetônica estilizada:
 * uma corda de suspensão (arco), um tabuleiro em dois trechos separados por um
 * vão central, dois pilares que apoiam a travessia e finas linhas de conexão.
 *
 * Segunda leitura (quem conhece a Ponte):
 *   · dois lados que precisavam se conectar (as margens do arco);
 *   · o vão central — um TABULEIRO PARTIDO, com uma JÓIA verde que o completa:
 *     as partes separadas se encontram num ponto de clareza (contexto);
 *   · o espaço vazio abaixo do tabuleiro = A PASSAGEM (o vão que se atravessa);
 *   · as linhas de conexão = fios que ligam estrutura à travessia.
 * A lente/portal das rodadas P96–P98 sobrevive: o arco + o tabuleiro formam a
 * mesma abertura, agora dentro de uma leitura literalmente de ponte.
 *
 * Regra da rodada: LOGO = ponte · MARCA = ponte + conexão + inteligência ·
 * EXPERIÊNCIA = fragmentação → conexão → contexto → clareza → evolução.
 * O símbolo não tenta carregar toda a filosofia — ele é a porta de entrada.
 *
 * Variação:
 *   · variant="full"  — versão completa (padrão): arco + tabuleiro partido +
 *     jóia + pilares + linhas de conexão. Usar a partir de 24px.
 *   · variant="micro" — redução responsiva (16–24px, favicon, avatares, tiles):
 *     mesma silhueta, sem as linhas de conexão, traços mais pesados.
 *
 * Cores (hierarquia da identidade, só tokens existentes):
 *   · ink     — estrutura (pilares) — institutional-900 / l-azure-soft;
 *   · path    — a travessia (tabuleiro + arco) — primary / l-azure;
 *   · signal  — o ponto de clareza (jóia) — evergreen / l-green.
 *
 * Superfícies:
 *   · surface="light"     — fundo claro (produto/documentos).
 *   · surface="dark"      — fundo azul-noite (landing).
 *   · surface="deepnight" — fundo muito escuro/colorido (blanco para estrutura,
 *     mesmo arco/jóia com brilho maior).
 *   · surface="mono"      — tudo herda currentColor (PB, tiles, impressão).
 *
 * Animação futura (geometria já separada em elementos): margens aparecem →
 * arco se desenha → tabuleiro nasce das bordas → linhas conectam → jóia
 * converge ao centro. Elementos individuais, desenháveis via stroke-dashoffset.
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
  cable: string
  deckL: string
  deckR: string
  pierL: string
  pierR: string
  hangers: Array<{ d: string; o: number }>
  jewel: { cx: number; cy: number; r: number }
  stroke: { cable: number; deck: number; hanger: number; pier: number }
  cableOpacity: number
}

// "A Travessia" — ponte estaiada de perfil, viewBox 48×48:
// duas torres (pilares 12/36, y 16→40) que sustentam a corda de suspensão
// (arco de Bézier 12,16 → ápice 24,6 → 36,16); o tabuleiro partido desce
// (y=22, trechos 12–20 e 28–36) deixando um vão central onde brilha a jóia;
// finas linhas de conexão ligam corda a tabuleiro. Margens (pilares) em ink,
// travessia (corda + tabuleiro) em path, jóia no vão em signal.
const BRIDGE: BridgeShape = {
  cable: 'M 12 16 C 16 16, 19 6, 24 6 C 29 6, 32 16, 36 16',
  deckL: 'M 12 22 L 20 22',
  deckR: 'M 28 22 L 36 22',
  pierL: 'M 12 16 L 12 40',
  pierR: 'M 36 16 L 36 40',
  hangers: [
    { d: 'M 16 12 L 16 22', o: 0.5 },
    { d: 'M 20 8 L 20 22', o: 0.55 },
    { d: 'M 28 8 L 28 22', o: 0.55 },
    { d: 'M 32 12 L 32 22', o: 0.5 },
  ],
  jewel: { cx: 24, cy: 22, r: 4.2 },
  stroke: { cable: 2.4, deck: 4.6, hanger: 1.2, pier: 3.6 },
  cableOpacity: 1,
}

const BRIDGE_MICRO: BridgeShape = {
  cable: BRIDGE.cable,
  deckL: BRIDGE.deckL,
  deckR: BRIDGE.deckR,
  pierL: BRIDGE.pierL,
  pierR: BRIDGE.pierR,
  hangers: [],
  jewel: { cx: 24, cy: 22, r: 4.0 },
  stroke: { cable: 3.0, deck: 4.6, hanger: 0, pier: 3.9 },
  cableOpacity: 1,
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
      {/* Linhas de conexão — arco → tabuleiro (full apenas) */}
      {s.hangers.map((h, i) => (
        <path
          key={i}
          d={h.d}
          stroke={c('path')}
          strokeWidth={s.stroke.hanger}
          strokeLinecap="round"
          opacity={h.o}
        />
      ))}
      {/* Corda de suspensão — o arco que une as duas margens */}
      <path
        d={s.cable}
        stroke={c('path')}
        strokeWidth={s.stroke.cable}
        strokeLinecap="round"
        opacity={s.cableOpacity}
      />
      {/* Tabuleiro partido — dois trechos separados pelo vão central */}
      <path d={s.deckL} stroke={c('path')} strokeWidth={s.stroke.deck} strokeLinecap="round" />
      <path d={s.deckR} stroke={c('path')} strokeWidth={s.stroke.deck} strokeLinecap="round" />
      {/* Pilares — estrutura (as margens) */}
      <path d={s.pierL} stroke={c('ink')} strokeWidth={s.stroke.pier} strokeLinecap="round" />
      <path d={s.pierR} stroke={c('ink')} strokeWidth={s.stroke.pier} strokeLinecap="round" />
      {/* Jóia no vão — as partes separadas se encontram num ponto de clareza */}
      <circle cx={s.jewel.cx} cy={s.jewel.cy} r={s.jewel.r} fill={c('signal')} />
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