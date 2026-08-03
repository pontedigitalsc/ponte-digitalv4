import { getCurrentUser } from '@/lib/auth'
import { montarLinhaDaHistoria, obterPerguntaVivaAtiva } from '@/engine/relacao-engine'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'

export const metadata = { title: 'Fundador' }

const WHATSAPP_URL = 'https://wa.me/5548991133397'

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

  const compromissos = [
    { titulo: 'Participar da evolução', descricao: 'Cada decisão que a Ponte toma passa por quem a constrói.' },
    { titulo: 'Ajudar a validar', descricao: 'Seu uso real mostra o que funciona e o que precisa mudar.' },
    { titulo: 'Influenciar caminhos', descricao: 'Os primeiros Founders ajudam a definir a direção.' },
    { titulo: 'Fazer parte dos primeiros 1000', descricao: 'Um grupo pequeno que esteve no começo de algo novo.' },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <AvatarPonte state="success" size="lg" />
          <h1 className="text-2xl font-semibold tracking-tight">Fundador</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {nome
              ? `${nome}, você já faz parte da história da Ponte.`
              : 'Você já faz parte da história da Ponte.'}
          </p>
          {pertencimento && (
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-50 px-4 py-2 text-sm dark:bg-amber-950/30">
              <span className="text-amber-700 dark:text-amber-400">
                {pertencimento.titulo} #{String(pertencimento.numero).padStart(4, '0')}
              </span>
            </div>
          )}
        </div>

        {/* Founder Invisível — mostra evolução, não vende plano (ETAPA 9) */}
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
            <Link
              href="/minha-jornada"
              className="inline-block text-xs text-primary hover:underline underline-offset-2"
            >
              Ler a história da sua empresa →
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {compromissos.map((c) => (
            <div key={c.titulo} className="rounded-xl border-l-4 border-amber-400/40 border bg-card p-4 space-y-1">
              <h3 className="font-semibold text-sm">{c.titulo}</h3>
              <p className="text-sm text-muted-foreground">{c.descricao}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-dashed border-primary/30 bg-card/50 p-6 text-center space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ser Fundador não é uma vantagem. É uma forma de pertencer a algo que está sendo construído por pessoas reais, com problemas reais.
          </p>
          <p className="text-sm font-medium">
            Os primeiros 1000 empresários estão construindo uma nova forma de pensar empresas.
          </p>
          <div className="space-y-2 pt-2">
            <Link
              href={usuario ? '/conversa' : '/criar-conta'}
              className="block w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Quero continuar essa conversa
            </Link>
            <Link
              href="/tornar-se-fundador"
              className="block w-full rounded-xl border border-amber-400/40 bg-amber-50 px-6 py-3 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/70"
            >
              Tornar-se Fundador →
            </Link>
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent('Olá, quero participar como Founder da Ponte Digital.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl border border-border bg-card px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Falar com a equipe (WhatsApp)
            </a>
            <Link
              href="/diagnostico"
              className="block w-full rounded-xl border border-border bg-card px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Voltar à Primeira Sessão Estratégica
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

