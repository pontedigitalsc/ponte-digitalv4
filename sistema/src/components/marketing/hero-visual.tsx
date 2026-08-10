import { AvatarPonte } from '@/components/ui/avatar'

/**
 * Composição central da Ponte: sinais dispersos (fragmentação) se conectam
 * (conexão) até convergir num único ponto coerente (clareza) — que é a
 * própria marca da Ponte, não uma ilustração decorativa. Sem fotografia,
 * sem stock, sem robô/cérebro. Puro SVG + CSS, legível mesmo parado.
 *
 * Sequência (e por quê o clímax é a CHEGADA, não o avatar sozinho):
 *   1. fragmentação — pontos aparecem espalhados (0–~1080ms)
 *   2. movimento/conexão local — sinais próximos se ligam entre si,
 *      formando pequenos agrupamentos (~650–2250ms, com sobreposição
 *      deliberada em relação à fase 1 para o movimento parecer contínuo,
 *      não uma sucessão de etapas estáticas)
 *   3. convergência — linhas longas partem dos agrupamentos em direção ao
 *      Avatar (~1900–3500ms)
 *   4. chegada — o Avatar (que até aqui estava com escala/opacidade
 *      reduzidas via .hero-avatar-arrive) só atinge opacidade e escala
 *      finais exatamente quando a ÚLTIMA linha convergente termina de
 *      chegar (3500ms) — nunca antes
 *   5. clareza — um pulso único (.hero-avatar-glow) marca o instante exato
 *      da chegada; depois disso a respiração ambiente (state="breathing",
 *      já rodando por baixo desde o início, apenas invisível) assume.
 *
 * viewBox 0 0 400 300 — o ponto de convergência fica em (300, 150), onde o
 * AvatarPonte é posicionado por cima via percentuais (75%, 50%).
 */

const DOTS = [
  { x: 40, y: 60, r: 4, delay: 0 },
  { x: 90, y: 30, r: 3, delay: 80 },
  { x: 30, y: 140, r: 3.5, delay: 160 },
  { x: 110, y: 110, r: 4, delay: 220 },
  { x: 70, y: 200, r: 3, delay: 300 },
  { x: 150, y: 60, r: 3, delay: 360 },
  { x: 160, y: 190, r: 4, delay: 420 },
  { x: 200, y: 230, r: 3, delay: 480 },
]

// Fase 2 — movimento/conexão local: começa enquanto os últimos pontos ainda
// estão surgindo (sobreposição intencional — nada de "parar e esperar"
// entre fases), e continua até logo antes da convergência começar.
const LOCAL_LINES = [
  { d: 'M40,60 L90,30', delay: 650 },
  { d: 'M40,60 L30,140', delay: 720 },
  { d: 'M110,110 L90,30', delay: 790 },
  { d: 'M110,110 L30,140', delay: 860 },
  { d: 'M70,200 L30,140', delay: 930 },
  { d: 'M150,60 L110,110', delay: 1000 },
  { d: 'M160,190 L70,200', delay: 1070 },
  { d: 'M200,230 L160,190', delay: 1140 },
]

// Fase 3 — convergência: dos agrupamentos até o Avatar (300,150). Começa
// antes das linhas locais terminarem (fluidez contínua) e a ÚLTIMA termina
// exatamente em 3500ms — o mesmo instante em que o Avatar atinge seu estado
// final (ver ARRIVE_DELAY/ARRIVE_DURATION abaixo).
const CONVERGING_LINES = [
  { d: 'M110,110 L300,150', delay: 1900 },
  { d: 'M160,190 L300,150', delay: 2000 },
  { d: 'M150,60 L300,150', delay: 2100 },
  { d: 'M200,230 L300,150', delay: 2200 },
]

const LOCAL_LINE_DURATION = '1.1s'
const CONVERGING_LINE_DURATION = '1.3s'

// A chegada do Avatar começa junto com a primeira linha convergente e
// termina no exato instante em que a última (delay 2200 + 1300 = 3500ms)
// completa o traço — por isso 1900ms + 1600ms = 3500ms.
const ARRIVE_DELAY = 1900
const ARRIVE_DURATION = 1600
const CLARITY_MOMENT = ARRIVE_DELAY + ARRIVE_DURATION // 3500ms

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md aspect-[4/3] select-none" aria-hidden="true">
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
      >
        {LOCAL_LINES.map((line, i) => (
          <path
            key={`local-${i}`}
            d={line.d}
            pathLength={1}
            className="signal-line"
            style={{ '--line-delay': `${line.delay}ms`, '--line-duration': LOCAL_LINE_DURATION } as React.CSSProperties}
            stroke="hsl(var(--mist-deep) / 0.9)"
            strokeWidth={1}
          />
        ))}
        {CONVERGING_LINES.map((line, i) => (
          <path
            key={`conv-${i}`}
            d={line.d}
            pathLength={1}
            className="signal-line"
            style={{ '--line-delay': `${line.delay}ms`, '--line-duration': CONVERGING_LINE_DURATION } as React.CSSProperties}
            stroke="hsl(var(--institutional-700) / 0.6)"
            strokeWidth={1.25}
          />
        ))}
        {DOTS.map((dot, i) => (
          <circle
            key={`dot-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            className="signal-dot"
            style={{ '--dot-delay': `${dot.delay}ms` } as React.CSSProperties}
            fill="hsl(var(--institutional-700) / 0.45)"
          />
        ))}
      </svg>

      {/* Ponto de convergência — a marca da Ponte, não um mascote.
          Três camadas propositais: a externa só posiciona/centraliza (sem
          animação — evita que a animação de transform da camada de
          chegada sobrescreva o translate de centralização); a do meio
          controla a chegada (.hero-avatar-arrive); a interna dispara o
          pulso de clareza (.hero-avatar-glow) no mesmo instante em que a
          chegada termina — em elemento separado para as duas animações
          não colidirem no mesmo transform/box-shadow. */}
      <div className="absolute" style={{ left: '75%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div
          className="hero-avatar-arrive"
          style={{
            '--arrive-delay': `${ARRIVE_DELAY}ms`,
            '--arrive-duration': `${ARRIVE_DURATION}ms`,
          } as React.CSSProperties}
        >
          <div
            className="rounded-full hero-avatar-glow"
            style={{ '--glow-delay': `${CLARITY_MOMENT}ms` } as React.CSSProperties}
          >
            <AvatarPonte state="breathing" size="lg" className="shadow-soft" />
          </div>
        </div>
      </div>
    </div>
  )
}
