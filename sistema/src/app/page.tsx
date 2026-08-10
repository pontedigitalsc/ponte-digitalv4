import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { MarketingNav } from '@/components/marketing/marketing-nav'
import { MarketingFooter } from '@/components/marketing/marketing-footer'
import { HeroVisual } from '@/components/marketing/hero-visual'
import { HeroSignals } from '@/components/marketing/hero-signals'
import { SignalStrip } from '@/components/marketing/signal-strip'
import { SignalDemo } from '@/components/marketing/signal-demo'
import { MicroInsights } from '@/components/marketing/micro-insights'
import { Comparison } from '@/components/marketing/comparison'
import { EvidenceFlow } from '@/components/marketing/evidence-flow'
import { StoryExample } from '@/components/marketing/story-example'
import { FlowSteps } from '@/components/marketing/flow-steps'
import { Reach } from '@/components/marketing/reach'
import { Beliefs } from '@/components/marketing/beliefs'
import { NewCategory } from '@/components/marketing/new-category'
import { FounderStory } from '@/components/marketing/founder-story'
import { Futuro } from '@/components/marketing/futuro'
import { FounderCTA } from '@/components/marketing/founder-cta'
import { FounderPanel } from '@/components/marketing/founder-panel'
import { Reveal } from '@/components/marketing/reveal'

export const viewport: Viewport = {
  themeColor: '#0c1e30',
}

export const metadata: Metadata = {
  title: { absolute: 'Ponte Digital | Antes de melhorar sua empresa, enxergue-a melhor.' },
  description:
    'A Ponte conecta as informações fragmentadas de uma empresa — clientes, operação, equipe, conversas e histórico — em contexto e clareza. Não é CRM, nem ERP, nem chatbot: é uma nova camada para decidir melhor.',
  openGraph: {
    title: 'Ponte Digital | Antes de melhorar sua empresa, enxergue-a melhor.',
    description:
      'A Ponte conecta as informações fragmentadas de uma empresa em contexto e clareza. Uma nova camada para decidir melhor — e a conversa começa por aqui.',
    type: 'website',
  },
}

const PRIMARY_CTA =
  'inline-flex w-full items-center justify-center rounded-xl bg-night-azure px-7 py-3.5 text-sm font-medium text-night-light-foreground shadow-[0_10px_28px_-10px_hsl(var(--l-azure)/0.55)] transition-colors hover:bg-night-mist sm:w-auto'

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
      {children}
    </p>
  )
}

export default function LandingPage() {
  return (
    <div className="bg-landing-night flex min-h-screen flex-col text-night-text">
      <MarketingNav />

      <main className="flex-1">
        {/* 01 — HERO · a pergunta */}
        <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
          {/* o sistema acordando — alguns pontos de luz ambiente, discretos */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <span className="dot-azure animate-note absolute left-[10%] top-[18%] h-1.5 w-1.5 rounded-full opacity-60" />
            <span className="dot-teal animate-float absolute right-[12%] top-[15%] h-2 w-2 rounded-full opacity-50" />
            <span className="dot-green animate-note absolute bottom-[26%] left-[16%] h-2 w-2 rounded-full opacity-40" />
            <span className="dot-azure animate-float absolute bottom-[18%] right-[9%] h-1.5 w-1.5 rounded-full opacity-60" />
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Ponte Digital</Eyebrow>
            <h1 className="mt-5 font-editorial text-3xl font-light leading-[1.18] tracking-tight text-night-text sm:text-5xl sm:leading-[1.08] md:text-6xl">
              <span className="block text-balance sm:inline">Antes de melhorar sua empresa,</span>{' '}
              <span className="block text-balance italic text-night-mist sm:inline">enxergue-a melhor.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-night-text-soft text-pretty sm:text-lg sm:leading-[1.75]">
              Clientes, operação, equipe, conversas, histórico: sua empresa já produz
              tudo isso. A Ponte conecta o que hoje está separado — e devolve
              contexto, em vez de mais telas.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/conversa" className={PRIMARY_CTA}>
                Ter a primeira conversa
              </Link>
              <FounderCTA className="w-full sm:w-auto">Tornar-me fundador</FounderCTA>
            </div>
          </div>

          <Reveal delay={200} className="mt-14 sm:mt-16">
            <HeroVisual />
          </Reveal>
          <div className="mt-10 sm:mt-12">
            <HeroSignals />
          </div>
        </section>

        {/* 02 — A FRAGMENTAÇÃO */}
        <section id="a-fragmentacao" className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Toda a informação já existe</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Você consegue enxergar sua empresa inteira?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-night-text-soft sm:text-base">
              O empresário vive cercado de informações. Cliente, operação, equipe,
              financeiro, conversas, tarefas, histórico — tudo existe. Mas está
              separado.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <div className="flex flex-wrap justify-center gap-2.5" aria-hidden="true">
              {['Cliente', 'Operação', 'Equipe', 'Financeiro', 'Conversas', 'Tarefas', 'Histórico'].map((w, i) => (
                <span
                  key={w}
                  className="pill px-4 py-1.5 text-sm text-night-text-dim"
                  style={{ transform: `rotate(${[-2, 2, -3, 1.5, -1, 2.5, -2][i]}deg)` }}
                >
                  {w}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-8">
            <p className="mx-auto max-w-sm text-center text-sm leading-relaxed text-night-text-dim">
              Cada parte diz uma coisa — e nenhuma fala com as outras.
            </p>
          </Reveal>
        </section>

        {/* 03 — O PROBLEMA REAL: dados ≠ clareza */}
        <section id="o-problema" className="bg-night-850 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-md text-center">
            <p className="font-editorial text-2xl font-light italic leading-snug text-night-text text-balance sm:text-3xl">
              Você já tem os dados. Tem clareza sobre eles?
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <SignalStrip />
          </Reveal>

          <Reveal delay={200} className="mt-10">
            <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-night-text-dim">
              Informação espalhada não é clareza. O que falta, quase sempre, é a
              conexão entre as partes.
            </p>
          </Reveal>
        </section>

        {/* 04 — A CONEXÃO (virada editorial, quase só espaço) */}
        <section className="bg-night-800 px-4 py-20 text-center sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-xl">
            <p className="font-editorial text-2xl font-light italic leading-snug text-night-text text-balance sm:text-3xl">
              A Ponte conecta por construção de contexto,
              <span className="text-night-green-bright"> não por mágica.</span>
            </p>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-night-text-dim">
              Informações diferentes começam a conversar entre si — e o que parecia
              isolado ganha significado.
            </p>
          </Reveal>
        </section>

        {/* 05 — EXEMPLO PEQUENO */}
        <section id="exemplo" className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>A lógica na prática</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              A lógica, em um exemplo pequeno.
            </h2>
            <p className="mt-3 text-sm text-night-text-soft">
              Três lugares, uma mesma conclusão possível — sem consultoria, sem
              planilha que se resolve sozinha.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <SignalDemo />
          </Reveal>
        </section>

        {/* micro-insights — a mesma camada, ainda respirando */}
        <section className="bg-night-900 px-4 pb-16 sm:px-6 sm:pb-24" aria-label="Observações sobre sinais">
          <Reveal>
            <MicroInsights />
          </Reveal>
        </section>

        {/* 06 — A DIFERENÇA */}
        <section id="a-diferenca" className="bg-night-950 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>A diferença fundamental</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              O que muda, quando existe uma Ponte.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <Comparison />
          </Reveal>
        </section>

        {/* 07 — INTELIGÊNCIA SEM CAIXA-PRETA */}
        <section className="bg-night-850 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>Sem caixa-preta</Eyebrow>
            <h2 className="mt-3 font-editorial text-2xl font-light italic leading-snug text-night-text text-balance sm:text-3xl">
              Se existe uma descoberta, você deve conseguir entender de onde ela veio.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <EvidenceFlow />
          </Reveal>
          <Reveal delay={200} className="mt-8">
            <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-night-text-dim">
              Fato, contexto, hipótese, pergunta: cada passo do raciocínio fica
              visível. Nada aparece pronto, do nada.
            </p>
          </Reveal>
        </section>

        {/* 08 — A CONVERSA */}
        <section className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>Uma conversa</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Uma conversa pode mudar a pergunta.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <StoryExample />
          </Reveal>
        </section>

        {/* 09 — COMO A PONTE PENSA */}
        <section id="como-funciona" className="bg-night-800 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>Como a Ponte pensa</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Você não decide depois dela. Decide com ela.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FlowSteps />
          </Reveal>
        </section>

        {/* 10 — O QUE A PONTE PODE ACOMPANHAR */}
        <section className="bg-night-950 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>O alcance do olhar</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              A empresa inteira, não um pedaço dela.
            </h2>
            <p className="mt-3 text-sm text-night-text-soft">
              Não é uma lista de recursos: é a amplitude conceitual do que uma
              camada de contexto pode cobrir.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <Reach />
          </Reveal>
        </section>

        {/* 11 — O QUE A PONTE ACREDITA */}
        <section className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>O que a Ponte acredita</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Princípios de produto, não discurso.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <Beliefs />
          </Reveal>
        </section>

        {/* 12 — A NOVA CATEGORIA */}
        <section id="a-nova-categoria" className="bg-night-950 bg-landing-glow-green px-4 py-20 sm:px-6 sm:py-28">
          <Reveal>
            <NewCategory />
          </Reveal>
        </section>

        {/* 13 — A HISTÓRIA */}
        <section id="a-historia" className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <FounderStory />
          </Reveal>
        </section>

        {/* 14 — FUTURO */}
        <section id="visao" className="bg-night-850 bg-landing-glow-green px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <Futuro />
          </Reveal>
        </section>

        {/* divisor editorial — respiro antes do Founder */}
        <div className="bg-night-850 px-4 pb-2 text-center sm:px-6" aria-hidden="true">
          <p className="font-editorial mx-auto max-w-sm text-lg italic font-light leading-snug text-night-text-dim sm:text-xl">
            Nem toda leitura é uma certeza. Essa é uma forma de olhar — aberta a quem quer enxergar melhor.
          </p>
        </div>

        {/* 15 — FOUNDER */}
        <section id="founder" className="bg-night-950 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <FounderPanel />
          </Reveal>
        </section>

        {/* 16 — CTA FINAL · e o que a Ponte encontraria na sua empresa? */}
        <section className="bg-landing-glow-azure px-4 py-24 text-center sm:px-6 sm:py-32">
          <Reveal className="mx-auto max-w-xl">
            <Eyebrow>A pergunta que fica</Eyebrow>
            <p className="mt-4 font-editorial text-3xl font-light italic leading-snug text-night-text text-balance sm:text-4xl">
              E o que a Ponte encontraria na sua empresa?
            </p>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-night-text-soft">
              Conte como as coisas funcionam hoje. Depois começamos a descobrir
              juntos onde existe clareza para ganhar — uma conversa de cada vez.
            </p>
            <p className="mx-auto mt-8 max-w-xs font-editorial text-lg font-light italic leading-snug text-night-text-dim">
              Quer descobrir o que esses sinais significam na sua realidade?
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/conversa" className={PRIMARY_CTA}>
                Ter a primeira conversa
              </Link>
              <FounderCTA className="w-full sm:w-auto">Tornar-me fundador</FounderCTA>
            </div>

            <p className="mx-auto mt-8 max-w-xs text-center text-xs leading-relaxed text-night-text-dim">
              Toda leitura começa como hipótese — que você decide se vale investigar.
            </p>
          </Reveal>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}