import { getCurrentUser } from '@/lib/auth'
import { montarLinhaDaHistoria, obterPerguntaVivaAtiva } from '@/engine/relacao-engine'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { obterMaturidadeColetiva, obterPadroesColetivos } from '@/engine/inteligencia-coletiva'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'
import {
  Brain, Lightbulb, TrendingUp, Users, Target, BookOpen,
  MessageCircle, ArrowRight, Sparkles, Compass, Bot, RefreshCw,
} from 'lucide-react'

export const metadata = { title: 'Fundador — A Ponte Digital' }

export default async function FundadorPage() {
  const usuario = await getCurrentUser().catch(() => null)
  const nome = usuario?.nome?.split(' ')[0]

  let pertencimento: { numero: number; titulo: string } | null = null
  if (usuario) {
    const empresa = await prisma.empresa
      .findUnique({
        where: { id: usuario.empresaId },
        select: { numeroApoiador: true, numeroFundador: true },
      })
      .catch(() => null)
    if (empresa?.numeroFundador) {
      pertencimento = { numero: empresa.numeroFundador, titulo: 'Fundador' }
    } else if (empresa?.numeroApoiador) {
      pertencimento = { numero: empresa.numeroApoiador, titulo: 'Apoiador' }
    }
  }

  // Evidências reais da comunidade — agregados, nunca dados de uma empresa.
  const [maturidade, padroes, apoiadores, founders, sessoesConcluidas] = await Promise.all([
    obterMaturidadeColetiva().catch(() => null),
    obterPadroesColetivos(3).catch(() => []),
    prisma.empresa.count({ where: { deletedAt: null, numeroApoiador: { not: null } } }).catch(() => 0),
    prisma.empresa.count({ where: { deletedAt: null, numeroFundador: { not: null } } }).catch(() => 0),
    prisma.conversa.count({ where: { concluida: true, deletedAt: null } }).catch(() => 0),
  ])

  let evolucao: {
    capitulos: number
    reflexoes: number
    perguntasResolvidas: number
    perguntaViva: string | null
  } | null = null

  if (usuario) {
    const ultimaConversa = await prisma.conversa.findFirst({
      where: { empresaId: usuario.empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      select: { respostas: true },
    })
    const respostas = (ultimaConversa?.respostas as Record<string, string | null>) ?? {}

    const [historia, perguntaViva] = await Promise.all([
      montarLinhaDaHistoria(usuario.empresaId, respostas).catch(() => null),
      obterPerguntaVivaAtiva(usuario.empresaId).catch(() => null),
    ])
    const perguntasResolvidas = historia
      ? await prisma.perguntaViva.count({ where: { empresaId: usuario.empresaId, estado: 'RESPONDIDA', deletedAt: null } }).catch(() => 0)
      : 0

    evolucao = {
      capitulos: historia?.capitulos.filter((c) => c.paragrafos.length > 0).length ?? 0,
      reflexoes: historia?.totalReflexoes ?? 0,
      perguntasResolvidas,
      perguntaViva: perguntaViva?.pergunta ?? null,
    }
  }

  const incluido = [
    { icon: Sparkles, titulo: 'Primeira Sessão Estratégica', descricao: 'Um lugar para pensar antes de decidir — sem formulário, sem cadastro para começar.' },
    { icon: BookOpen, titulo: 'Retrato Estratégico da empresa', descricao: 'O que percebemos, por que percebemos e o primeiro movimento. Escrito a partir do que você contou.' },
    { icon: RefreshCw, titulo: 'Memória da empresa', descricao: 'Suas decisões, seus aprendizados e sua história se acumulam como patrimônio — não como timeline.' },
    { icon: Compass, titulo: 'Centro de decisão', descricao: 'Antes de decidir, um espaço para organizar o que pretende fazer, por quê, os riscos e o que precisa acontecer.' },
    { icon: Lightbulb, titulo: 'Exploração de cenários', descricao: '"Como seria se..." — sempre com base no que sabemos hoje, nunca prevendo o futuro.' },
    { icon: Bot, titulo: 'Uma pergunta que acompanha', descricao: 'Uma única pergunta viva por vez, para a sua empresa evoluir entre uma conversa e outra.' },
  ]

  const compromissos = [
    'Cada decisão da Ponte passa por quem a constrói',
    'Seu uso real mostra o que funciona e o que muda',
    'Os primeiros Founders ajudam a definir a direção',
    'Fazer parte dos primeiros 1000 na história da Ponte',
  ]

  const roadmap = [
    { fase: 'P59 — Primeira Sessão Estratégica', status: 'Vivo', descricao: 'A sessão, o retrato e a clareza como evidência real.' },
    { fase: 'P60 — Memória da Empresa', status: 'Vivo', descricao: 'As decisões e aprendizados virando patrimônio da empresa.' },
    { fase: 'P61 — Centro de Decisão', status: 'Vivo', descricao: 'Pensar antes de decidir e acompanhar o que aconteceu.' },
    { fase: 'P62 — Inteligência Coletiva', status: 'Por volume', descricao: 'Padrões só aparecem com empresas suficientes — nunca dados crus.' },
    { fase: 'P63 — Operação Founder', status: 'Vivo', descricao: 'Medir transformação, não quantidade de telas.' },
  ]

  const hipoteses = [
    'Empresários voltam porque a Ponte lembra da empresa deles.',
    'Acompanhar decisões ao longo do tempo melhora a qualidade das próximas.',
    'Conhecimento coletivo ajuda melhor que conhecimento isolado — só depois de volume.',
    'Reconhecimento de pertencimento é percebido como valor, não como gamificação.',
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
        {/* ─── Cabeçalho ─────────────────────────────────────────────────── */}
        <div className="text-center space-y-4">
          <AvatarPonte state="success" size="lg" />
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Área Founder
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              {nome ? `${nome}, esta é a Ponte.` : 'Esta é a Ponte Digital.'}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            A Ponte não é um sistema para administrar a empresa. É um lugar para
            tomar decisões melhores porque compreende profundamente a história da empresa.
          </p>
          {pertencimento && (
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-50 px-4 py-2 text-sm dark:bg-amber-950/30">
              <span className="text-amber-700 dark:text-amber-400">
                {pertencimento.titulo} #{String(pertencimento.numero).padStart(4, '0')} — você está na história.
              </span>
            </div>
          )}
        </div>

        {/* ─── O que a Ponte faz por você ────────────────────────────────── */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
            O que a Ponte faz por você
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {incluido.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.titulo} className="rounded-xl border bg-card p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <p className="font-semibold text-sm">{c.titulo}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.descricao}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── Como a Ponte aprende ─────────────────────────────────────── */}
        <div className="rounded-xl border border-primary/15 bg-primary/5 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Como a Ponte aprende
            </p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A inteligência da Ponte não está em um modelo de IA. Ela está no patrimônio que
            sua empresa constrói aqui: o contexto, as decisões, os resultados e os aprendizados
            que você registra ao longo do tempo.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cada conversa e cada decisão fortalecem esse patrimônio. É isso que torna a Ponte
            mais útil com o passar dos meses — e é isso que nenhuma ferramenta de gestão faz.
          </p>
        </div>

        {/* ─── Founder Invisível — evolução real do usuário ─────────────── */}
        {evolucao && (
          <div className="rounded-xl border border-amber-400/30 bg-card p-6 space-y-4 animate-fade-in">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              O que sua empresa já construiu com a Ponte
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-muted/40 p-4 space-y-1">
                <p className="text-2xl font-bold">{evolucao.capitulos}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {evolucao.capitulos === 1 ? 'capítulo escrito' : 'capítulos escritos'}
                </p>
              </div>
              <div className="rounded-lg bg-muted/40 p-4 space-y-1">
                <p className="text-2xl font-bold">{evolucao.reflexoes}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {evolucao.reflexoes === 1 ? 'reflexão plantada' : 'reflexões plantadas'}
                </p>
              </div>
              <div className="rounded-lg bg-muted/40 p-4 space-y-1">
                <p className="text-2xl font-bold">{evolucao.perguntasResolvidas}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {evolucao.perguntasResolvidas === 1 ? 'pergunta viva resolvida' : 'perguntas vivas resolvidas'}
                </p>
              </div>
            </div>
            {evolucao.perguntaViva && (
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                A pergunta que acompanha sua empresa agora: {evolucao.perguntaViva}
              </p>
            )}
            <Link href="/minha-jornada" className="inline-block text-xs text-primary hover:underline underline-offset-2">
              Ler a história da sua empresa →
            </Link>
          </div>
        )}

        {/* ─── Evidências e aprendizados da comunidade ──────────────────── */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
            Evidências reais da comunidade
          </p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border bg-card p-4 space-y-1">
              <p className="text-2xl font-bold">{apoiadores}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">apoiadores</p>
            </div>
            <div className="rounded-xl border bg-card p-4 space-y-1">
              <p className="text-2xl font-bold">{founders}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">founders</p>
            </div>
            <div className="rounded-xl border bg-card p-4 space-y-1">
              <p className="text-2xl font-bold">{sessoesConcluidas}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">sessões concluídas</p>
            </div>
          </div>

          {maturidade && (
            <div className="rounded-xl border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Inteligência Coletiva
                </p>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {maturidade.rotulo}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{maturidade.descricao}</p>
              <div className="space-y-1.5">
                {maturidade.gates.map((g) => (
                  <div key={g.limite} className="flex items-center gap-2 text-xs">
                    <span className={`h-2 w-2 rounded-full ${g.ativo ? 'bg-emerald-500' : 'bg-muted'}`} />
                    <span className={g.ativo ? 'text-foreground' : 'text-muted-foreground'}>
                      {g.rotulo} — {g.descricao}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {padroes.length > 0 && (
            <div className="rounded-xl border border-dashed border-primary/25 bg-card/50 p-5 space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Padrões que já aprendemos juntos
              </p>
              {padroes.map((p) => (
                <p key={p.titulo} className="text-xs text-muted-foreground leading-relaxed">
                  • {p.titulo}
                  {p.repeticoes > 1 ? ` (observado ${p.repeticoes}x)` : ''}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* ─── Como funciona a evolução ─────────────────────────────────── */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
            Como funciona a evolução
          </p>
          <div className="rounded-xl border bg-card p-5 space-y-2">
            {[
              { step: '1', texto: 'Você conversa e decide com a Ponte. Cada resposta vira contexto.' },
              { step: '2', texto: 'A Ponte registra apenas o que é real: decisões, resultados, aprendizados.' },
              { step: '3', texto: 'Com o tempo, o retrato fica mais preciso e as recomendações mais específicas.' },
              { step: '4', texto: 'Nada é inventado. Toda recomendação tem origem rastreável.' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {s.step}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.texto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Os primeiros Founders constroem ──────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-amber-500" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Os primeiros Founders constroem a Ponte
            </p>
          </div>
          <div className="space-y-2">
            {compromissos.map((c) => (
              <div key={c} className="flex items-start gap-3 rounded-xl border-l-4 border-amber-400/40 border bg-card p-4">
                <span className="mt-0.5 text-amber-500" aria-hidden>✓</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Roadmap ──────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">Roadmap — o que estamos construindo</p>
          </div>
          <div className="space-y-2">
            {roadmap.map((r) => (
              <div key={r.fase} className="flex items-start justify-between gap-3 rounded-xl border bg-card p-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{r.fase}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.descricao}</p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Previsões, sempre como hipóteses ─────────────────────────── */}
        <div className="rounded-xl border border-dashed border-amber-400/30 bg-card/50 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-amber-500" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              O que acreditamos — hipóteses, não promessas
            </p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Estas são hipóteses que estamos validando com os primeiros Founders. Se não se confirmarem, mudamos — nunca insistimos.
          </p>
          <ul className="space-y-1.5">
            {hipoteses.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* ─── CTA — convite, nunca venda ───────────────────────────────── */}
        <div className="rounded-xl border border-dashed border-primary/30 bg-card/50 p-6 text-center space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ser Fundador não é uma vantagem. É uma forma de pertencer a algo que está sendo
            construído por pessoas reais, com problemas reais.
          </p>
          <p className="text-sm font-medium">
            Os primeiros 1000 empresários estão construindo uma nova forma de pensar empresas.
          </p>
          <div className="space-y-2 pt-2">
            <Link
              href="/solicitar-founder"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-medium text-amber-50 hover:bg-amber-600 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Quero me tornar Founder
            </Link>
            <Link
              href={usuario ? '/conversa' : '/criar-conta'}
              className="block w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {usuario ? 'Continuar essa conversa' : 'Começar minha jornada na Ponte'}
            </Link>
            <Link
              href="/tornar-se-fundador"
              className="flex w-full items-center justify-center gap-1 rounded-xl border border-border bg-card px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Entender o caminho Apoiador → Founder <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
