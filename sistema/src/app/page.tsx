import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingNav } from '@/components/marketing/marketing-nav'
import { MarketingFooter } from '@/components/marketing/marketing-footer'
import { HeroVisual } from '@/components/marketing/hero-visual'
import { HeroSignals } from '@/components/marketing/hero-signals'
import { SignalStrip } from '@/components/marketing/signal-strip'
import { SignalDemo } from '@/components/marketing/signal-demo'
import { MicroInsights } from '@/components/marketing/micro-insights'
import { FlowSteps } from '@/components/marketing/flow-steps'
import { EvidenceFlow } from '@/components/marketing/evidence-flow'
import { StoryExample } from '@/components/marketing/story-example'
import { FounderCTA } from '@/components/marketing/founder-cta'
import { FounderPanel } from '@/components/marketing/founder-panel'
import { Reveal } from '@/components/marketing/reveal'

export const metadata: Metadata = {
  title: { absolute: 'Ponte Digital | Antes de melhorar sua empresa, enxergue-a melhor.' },
  description:
    'A Ponte transforma conversas, experiências e informações do dia a dia em uma visão mais clara para ajudar pessoas e organizações a decidir e evoluir melhor.',
  openGraph: {
    title: 'Ponte Digital | Antes de melhorar sua empresa, enxergue-a melhor.',
    description:
      'A Ponte transforma conversas, experiências e informações do dia a dia em uma visão mais clara para ajudar pessoas e organizações a decidir e evoluir melhor.',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1">
        {/* 01 — HERO */}
        <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-mist/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[300px] bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--evergreen-soft)/0.35),transparent_70%)]" />
          <div className="pointer-events-none absolute -z-10 left-0 top-1/3 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Ponte Digital
            </p>
            <h1 className="mt-5 font-editorial text-3xl font-light leading-[1.18] tracking-tight text-foreground sm:text-5xl sm:leading-[1.08] md:text-6xl">
              <span className="block text-balance sm:inline">Antes de melhorar sua empresa,</span>{' '}
              <span className="block text-balance italic sm:inline">enxergue-a melhor.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg sm:leading-[1.75]">
              A Ponte transforma conversas, experiências e informações do dia a dia em uma
              visão mais clara do que está acontecendo, do que merece atenção e de onde
              existem oportunidades de evolução.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/conversa"
                className="w-full rounded-xl bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-primary transition-colors hover:bg-primary/90 sm:w-auto"
              >
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

        {/* 02 — A PRIMEIRA VIRADA */}
        <section className="bg-warm-surface px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Sua empresa já está falando com você.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">Todos os dias ela deixa sinais.</p>

            <ul className="mx-auto mt-8 max-w-sm space-y-2.5 text-left text-sm leading-relaxed text-muted-foreground">
              <li>Um cliente que não voltou.</li>
              <li>Um orçamento que ficou sem resposta.</li>
              <li>Um problema que apareceu novamente.</li>
              <li>Uma tarefa que sempre depende da mesma pessoa.</li>
              <li>Uma decisão tomada no improviso.</li>
              <li>Uma oportunidade que ninguém percebeu a tempo.</li>
            </ul>

            <p className="mx-auto mt-10 max-w-md font-editorial text-2xl font-light leading-snug text-foreground text-balance sm:text-3xl">
              O problema é que esses sinais raramente aparecem juntos.
            </p>
          </Reveal>
        </section>

        {/* 03 — NÃO É FALTA DE DADOS (gramática: pergunta direta) */}
        <section id="como-funciona" className="bg-mist px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-md text-center">
            <p className="text-xl font-medium text-foreground text-balance sm:text-2xl">
              Você já tem os dados. Tem clareza sobre eles?
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <SignalStrip />
          </Reveal>
        </section>

        {/* microcopy divisor — continua a atmosfera da seção anterior */}
        <div className="bg-mist px-4 pb-10 text-center sm:px-6 sm:pb-14">
          <p className="font-editorial mx-auto max-w-xs text-sm italic text-muted-foreground/70">
            Uma informação isolada pode esconder uma relação importante.
          </p>
        </div>

        {/* 04 — A LÓGICA, EM UM EXEMPLO PEQUENO (a atmosfera desce uma
            camada: azul-neblina vira azul-azul — profundidade crescente,
            sem chegar ao azul-noite, que fica reservado para a visão) */}
        <section className="bg-gradient-to-b from-mist-2 via-azure/50 to-mist-2 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              A lógica, em um exemplo pequeno.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Três lugares, uma mesma conclusão possível — sem consultoria, sem planilha que se resolve sozinha.
            </p>
          </Reveal>
          <div className="mt-12">
            <SignalDemo />
          </div>
        </section>

        {/* micro-insights — mesma camada atmosférica, mais perto do fim da
            respiração azul, antes de voltar à superfície clara */}
        <section className="bg-mist-2 px-4 pb-16 sm:px-6 sm:pb-24">
          <Reveal>
            <MicroInsights />
          </Reveal>
        </section>

        {/* 05 — COMO A PONTE PENSA */}
        <section className="bg-warm-surface px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              A Ponte começa onde sua realidade começa.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FlowSteps />
          </Reveal>
        </section>

        {/* 06 — A DIFERENÇA FUNDAMENTAL (gramática: comparação em colunas) */}
        <section id="a-ponte" className="px-4 py-20 sm:px-6 sm:py-32">
          <Reveal className="mx-auto max-w-lg">
            <div className="grid gap-5 sm:grid-cols-2 sm:divide-x sm:divide-border/60">
              <div className="text-center sm:pr-8 sm:text-right">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/70">Não</p>
                <p className="mt-1.5 text-lg leading-snug text-muted-foreground sm:text-xl">
                  quer pensar no seu lugar.
                </p>
              </div>
              <div className="text-center sm:pl-8 sm:text-left">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/70">Quer</p>
                <p className="mt-1.5 font-editorial text-xl font-light italic leading-snug text-foreground sm:text-2xl">
                  ajudar você a pensar melhor sobre aquilo que já está vivendo.
                </p>
              </div>
            </div>
            <p className="mx-auto mt-8 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
              A Ponte não pretende conhecer sua empresa melhor do que você. Não pretende
              substituir seu julgamento. Não precisa fingir que possui todas as respostas.
              Ela ajuda a organizar a realidade, encontrar relações e devolver perguntas,
              leituras e possibilidades que podem passar despercebidas no meio da rotina.
            </p>
          </Reveal>
        </section>

        {/* 07 — INTELIGÊNCIA SEM CAIXA-PRETA */}
        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <h2 className="font-editorial text-2xl font-light italic leading-snug text-foreground text-balance sm:text-3xl">
              Se existe uma descoberta, você deve conseguir entender de onde ela veio.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <EvidenceFlow />
          </Reveal>
        </section>

        {/* 08 — UM EXEMPLO REALISTA (descoberta: primeira introdução, muito
            sutil, do verde profundo — sinal de evolução, não decoração) */}
        <section className="bg-gradient-to-b from-evergreen-soft/70 via-evergreen-soft/25 to-transparent px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Uma conversa pode mudar a pergunta.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <StoryExample />
          </Reveal>
        </section>

        {/* PONTE — funde o que restava de valor nas antigas seções "Cinco
            coisas" e "Não é presa a um setor" (a maior parte já tinha sido
            dita em 04/06/07) numa única linha de transição direto para a
            visão — sem reabrir bloco explicativo antes do Founder. */}
        <div className="bg-warm-surface px-4 py-10 text-center sm:px-6 sm:py-14">
          <Reveal className="font-editorial mx-auto max-w-sm text-lg italic font-light leading-snug text-muted-foreground sm:text-xl">
            Nem toda leitura é uma certeza. E essa forma de olhar não depende de um setor.
          </Reveal>
        </div>

        {/* VISÃO DE LONGO PRAZO (cinematográfica, quase só espaço) */}
        <section className="bg-ponte-gradient px-4 py-24 text-center sm:px-6 sm:py-36">
          <Reveal className="mx-auto max-w-md">
            <p className="font-editorial text-2xl font-light leading-snug text-white/90 sm:text-3xl">
              Hoje, a Ponte começa com empresas.
            </p>
            <p className="mt-3 font-editorial text-2xl italic font-light leading-snug text-white sm:text-3xl">
              Amanhã, a lógica pode atravessar muito mais.
            </p>
            <p className="mx-auto mt-8 max-w-xs text-sm leading-relaxed text-white/60">
              Onde houver complexidade, informação espalhada e decisões importantes, existe
              espaço para mais clareza.
            </p>
          </Reveal>
        </section>

        {/* FOUNDER — porta diferente dentro da Ponte, não mais um CTA */}
        <section id="founder" className="bg-mist px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <FounderPanel />
          </Reveal>
        </section>

        {/* CONVERSA — fechamento da página, frase isolada como gramática.
            Retorno gradual a uma superfície luminosa (ação sem pressão).
            A pergunta "Quer descobrir..." precede o CTA: convida a ação
            como possibilidade, não como obrigação. */}
        <section className="bg-warm-surface px-4 py-20 text-center sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-lg">
            <p className="font-editorial text-3xl font-light italic leading-snug text-foreground text-balance sm:text-4xl">
              A próxima decisão fica melhor quando a realidade fica mais clara.
            </p>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Conte como as coisas funcionam hoje. A partir daí, começamos a descobrir
              juntos onde existe clareza para ganhar.
            </p>
            <p className="mx-auto mt-8 max-w-xs font-editorial text-lg font-light italic leading-snug text-muted-foreground">
              Quer descobrir o que esses sinais significam na sua realidade?
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/conversa"
                className="w-full rounded-xl bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-primary transition-colors hover:bg-primary/90 sm:w-auto"
              >
                Ter a primeira conversa
              </Link>
              <FounderCTA className="w-full sm:w-auto">Tornar-me fundador</FounderCTA>
            </div>
          </Reveal>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
