import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { MarketingNav } from '@/components/marketing/marketing-nav'
import { MarketingFooter } from '@/components/marketing/marketing-footer'
import { HeroVisual } from '@/components/marketing/hero-visual'
import { HeroSignals } from '@/components/marketing/hero-signals'
import { FragmentacaoMap } from '@/components/marketing/fragmentacao-map'
import { Passagem } from '@/components/marketing/passagem'
import { LiveMap } from '@/components/marketing/live-map'
import { Comparison } from '@/components/marketing/comparison'
import { EvidenceFlow } from '@/components/marketing/evidence-flow'
import { FlowSteps } from '@/components/marketing/flow-steps'
import { Beliefs } from '@/components/marketing/beliefs'
import { NewCategory } from '@/components/marketing/new-category'
import { PonteEssence } from '@/components/marketing/ponte-essence'
import { Organism } from '@/components/marketing/organism'
import { Realities } from '@/components/marketing/realities'
import { FounderStory } from '@/components/marketing/founder-story'
import { Futuro } from '@/components/marketing/futuro'
import { FounderCTA } from '@/components/marketing/founder-cta'
import { FounderPanel } from '@/components/marketing/founder-panel'
import { ValorExemplos } from '@/components/marketing/valor-exemplos'
import { CopilotoDemo } from '@/components/marketing/copiloto-demo'
import { CargaCognitiva } from '@/components/marketing/carga-cognitiva'
import { NaoSubstitui } from '@/components/marketing/nao-substitui'
import { BasePioneira } from '@/components/marketing/base-pioneira'
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
            {/* eco da marca "A Travessia" — a ponte quase invisível, topo-direita */}
            <svg viewBox="0 0 48 48" className="absolute -right-20 -top-28 h-80 w-80 sm:h-[26rem] sm:w-[26rem]" fill="none" style={{ stroke: 'hsl(var(--l-azure) / 0.07)' }}>
              <path d="M 5 40 L 20 40" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 28 40 L 43 40" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 13 15 L 13 40" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 35 15 L 35 40" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 13 15 C 16 6, 21 4.6, 23.3 4.6" strokeWidth="2" strokeLinecap="round" />
              <path d="M 35 15 C 32 6, 27 4.6, 24.7 4.6" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="5" r="3.2" fill="hsla(var(--l-azure) / 0.10)" />
            </svg>
            {/* eco espelhado, base-esquerda */}
            <svg viewBox="0 0 48 48" className="absolute -bottom-32 -left-24 h-96 w-96 sm:h-[30rem] sm:w-[30rem]" fill="none" style={{ stroke: 'hsl(var(--l-azure) / 0.06)' }}>
              <path d="M 5 40 L 20 40" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 28 40 L 43 40" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 13 15 L 13 40" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 35 15 L 35 40" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 13 15 C 16 6, 21 4.6, 23.3 4.6" strokeWidth="2" strokeLinecap="round" />
              <path d="M 35 15 C 32 6, 27 4.6, 24.7 4.6" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="5" r="3.2" fill="hsla(var(--l-azure) / 0.09)" />
            </svg>
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
            <p className="mx-auto mt-5 max-w-md font-editorial text-lg font-light italic leading-snug text-night-mist text-balance sm:text-xl">
              Existe muita coisa acontecendo dentro de uma empresa.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/conversa" className={PRIMARY_CTA}>
                Ter a primeira conversa
              </Link>
              <FounderCTA className="w-full sm:w-auto">Tornar-me Founder</FounderCTA>
            </div>
          </div>

          {/* os fragmentos que já existem — sinais nomeados da vida real */}
          <div aria-hidden="true" className="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {['Cliente', 'Operação', 'Equipe', 'Financeiro', 'Pedidos', 'Decisões'].map((w, i) => (
              <span
                key={w}
                className="pill animate-note px-3.5 py-1.5 text-xs text-night-text-soft"
                style={{ transform: `rotate(${[-2, 2, -1.5, 1, 0.5, -1][i]}deg)` }}
              >
                {w}
              </span>
            ))}
          </div>

          <Reveal delay={200} className="mt-14 sm:mt-16">
            <HeroVisual />
          </Reveal>
          <div className="mt-10 sm:mt-12">
            <HeroSignals />
          </div>
        </section>

        {/* 02 — O QUE É A PONTE */}
        <section id="o-que-e" className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>O que é a Ponte</Eyebrow>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-night-text-soft sm:text-base">
              Não é mais um sistema para guardar coisas. É uma camada que procura
              ajudar a empresa a compreender as informações que ela já tem.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <PonteEssence />
          </Reveal>
        </section>

        {/* 03 — FRAGMENTAÇÃO */}
        <section id="a-fragmentacao" className="bg-night-850 px-4 py-16 sm:px-6 sm:py-24">
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
            <FragmentacaoMap />
          </Reveal>

          <Reveal delay={200} className="mt-8">
            <p className="mx-auto max-w-sm text-center text-sm leading-relaxed text-night-text-dim">
              Cada parte diz uma coisa — e nenhuma fala com as outras.
            </p>
          </Reveal>
        </section>

        {/* 03.5 — A PASSAGEM: a travessia da marca, do espalhado à visão */}
        <section id="a-passagem" className="relative overflow-hidden bg-night-800 bg-landing-glow-azure px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <Passagem />
          </Reveal>
        </section>

        {/* 04 — MAPA VIVO: INFORMAÇÃO ISOLADA → CONEXÃO → CLAREZA */}
        <section id="o-mapa" className="bg-night-800 px-4 py-20 text-center sm:px-6 sm:py-28">
          <Reveal className="mx-auto max-w-xl">
            <Eyebrow>O mapa vivo da conexão</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Dois clientes, um prazo, uma decisão no improviso.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-night-text-soft">
              Cada ponto do mapa é uma informação que a sua empresa já produz.
              Sozinhos, são fatos. Conectados, viram leitura.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-12">
            <LiveMap />
          </Reveal>
        </section>

        {/* 05 — COMO A PONTE PENSA */}
        <section id="como-funciona" className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-xl text-center">
            <Eyebrow>Como a Ponte pensa</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Escuta, organização, conexão, pergunta, apoio, aprendizado.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-night-text-soft sm:text-base">
              Uma pergunta só merece resposta quando a pergunta está bem feita.
              Essa é a forma de pensar que a Ponte procura ajudar a construir —
              sempre com a decisão nas suas mãos.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <FlowSteps />
          </Reveal>
        </section>

        {/* 06 — O VALOR, EM SITUAÇÕES DO DIA A DIA */}
        <section id="exemplo" className="bg-night-850 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <ValorExemplos />
          </Reveal>
        </section>

        {/* 07 — COPILOTO OPERACIONAL (DEMONSTRATIVO) */}
        <section id="copiloto" className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>O Copiloto Operacional</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Não é um chatbot que responde. É uma camada que compreende.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-night-text-soft sm:text-base">
              Você conta o que acontece; a Ponte conecta ao que já sabe, marca o
              que ainda falta e pergunta se quer preparar a próxima etapa.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <CopilotoDemo />
          </Reveal>
        </section>

        {/* 08 — CARGA COGNITIVA */}
        <section id="carga-cognitiva" className="bg-night-850 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <CargaCognitiva />
          </Reveal>
        </section>

        {/* 09 — SISTEMAS TRADICIONAIS × PONTE */}
        <section id="a-diferenca" className="bg-night-950 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>A diferença fundamental</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Dois modelos de ver uma empresa.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <Comparison />
          </Reveal>
        </section>

        {/* 10 — INTELIGÊNCIA SEM CAIXA-PRETA */}
        <section className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
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

        {/* 11 — A PONTE NÃO SUBSTITUI A EMPRESA */}
        <section id="nao-substitui" className="bg-night-850 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <NaoSubstitui />
          </Reveal>
        </section>

        {/* 12 — EMPRESA COMO ORGANISMO DE CONHECIMENTO */}
        <section id="organismo" className="bg-night-800 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>Um organismo de conhecimento</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Cada função vê a empresa de um ângulo.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-night-text-soft sm:text-base">
              Multiperfis e permissões: cada pessoa enxerga o que o papel dela
              permite — e todas as visões alimentam uma compreensão mais rica.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <Organism />
          </Reveal>
        </section>

        {/* 13 — QUEM PODE USAR */}
        <section id="quem-pode-usar" className="bg-night-950 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal className="mx-auto max-w-lg text-center">
            <Eyebrow>Quem pode usar</Eyebrow>
            <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
              Empresas de verdade, nos seus tamanhos.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <Realities />
          </Reveal>
        </section>

        {/* 14 — COMO UMA EMPRESA CONSTRÓI A PRÓPRIA BASE */}
        <section id="base" className="bg-night-900 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <BasePioneira />
          </Reveal>
        </section>

        {/* 15 — A HISTÓRIA DO KELVEN */}
        <section id="a-historia" className="bg-night-850 bg-landing-glow-green px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <FounderStory />
          </Reveal>
        </section>

        {/* 16 — O QUE A PONTE ACREDITA */}
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

        {/* 17 — A NOVA CATEGORIA */}
        <section id="a-nova-categoria" className="relative overflow-hidden bg-night-950 bg-landing-glow-green px-4 py-20 sm:px-6 sm:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 opacity-[0.05]">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M 5 40 L 20 40" stroke="hsl(var(--l-azure))" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 28 40 L 43 40" stroke="hsl(var(--l-azure))" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 13 15 L 13 40" stroke="hsl(var(--l-azure))" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 35 15 L 35 40" stroke="hsl(var(--l-azure))" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 13 15 C 16 6, 21 4.6, 23.3 4.6" stroke="hsl(var(--l-azure))" strokeWidth="2" strokeLinecap="round" />
              <path d="M 35 15 C 32 6, 27 4.6, 24.7 4.6" stroke="hsl(var(--l-azure))" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="5" r="3.2" fill="hsl(var(--l-azure))" />
            </svg>
          </div>
          <Reveal>
            <NewCategory />
          </Reveal>
        </section>

        {/* divisor editorial — respiro antes do Founder */}
        <div className="bg-night-950 px-4 pb-2 text-center sm:px-6" aria-hidden="true">
          <p className="font-editorial mx-auto max-w-sm text-lg italic font-light leading-snug text-night-text-dim sm:text-xl">
            Nem toda leitura é uma certeza. Essa é uma forma de olhar — aberta a quem quer enxergar melhor.
          </p>
        </div>

        {/* 18 — FOUNDER */}
        <section id="founder" className="bg-night-950 px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <FounderPanel />
          </Reveal>
        </section>

        {/* 19 — VISÃO DE FUTURO */}
        <section id="a-visao" className="relative overflow-hidden bg-night-900 bg-landing-glow-green px-4 py-16 sm:px-6 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute -left-28 -bottom-28 h-80 w-80 opacity-[0.05]">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M 5 40 L 20 40" stroke="hsl(var(--l-azure))" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 28 40 L 43 40" stroke="hsl(var(--l-azure))" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 13 15 L 13 40" stroke="hsl(var(--l-azure))" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 35 15 L 35 40" stroke="hsl(var(--l-azure))" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 13 15 C 16 6, 21 4.6, 23.3 4.6" stroke="hsl(var(--l-azure))" strokeWidth="2" strokeLinecap="round" />
              <path d="M 35 15 C 32 6, 27 4.6, 24.7 4.6" stroke="hsl(var(--l-azure))" strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="5" r="3.2" fill="hsl(var(--l-azure))" />
            </svg>
          </div>
          <Reveal>
            <Futuro />
          </Reveal>
        </section>

        {/* 20 — CTA FINAL · a pergunta que fica */}
        <section className="bg-landing-glow-azure px-4 py-24 text-center sm:px-6 sm:py-32">
          <Reveal className="mx-auto max-w-xl">
            <Eyebrow>A pergunta que fica</Eyebrow>
            <p className="mt-4 font-editorial text-3xl font-light italic leading-snug text-night-text text-balance sm:text-4xl">
              Quer descobrir o que esses sinais significam na sua realidade?
            </p>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-night-text-soft">
              Conte como as coisas funcionam hoje. Depois começamos a descobrir
              juntos onde existe clareza para ganhar — uma conversa de cada vez.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/conversa" className={PRIMARY_CTA}>
                Ter a primeira conversa
              </Link>
              <FounderCTA variant="evergreen" className="w-full sm:w-auto">
                Tornar-me Founder
              </FounderCTA>
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