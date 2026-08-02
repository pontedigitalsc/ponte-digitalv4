import { requireUser } from '@/lib/auth'
import { montarLinhaDaHistoria } from '@/engine/relacao-engine'
import { obterLinhaDaVida } from '@/engine/linha-da-vida-engine'
import { AvatarPonte } from '@/components/ui/avatar'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import Link from 'next/link'

export const metadata = { title: 'Minha História' }

export default async function MinhaHistoriaPage() {
  const usuario = await requireUser()
  const nome = usuario.nome.split(' ')[0]

  const ultimaConversa = await prisma.conversa.findFirst({
    where: { empresaId: usuario.empresaId, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    select: { respostas: true },
  })
  const respostas = (ultimaConversa?.respostas as Record<string, string | null>) ?? {}

  const [historia, perguntasVivas, linhaDaVida] = await Promise.all([
    montarLinhaDaHistoria(usuario.empresaId, respostas),
    prisma.perguntaViva.findMany({
      where: { empresaId: usuario.empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
    }),
    obterLinhaDaVida(usuario.empresaId).catch(() => null),
  ])

  const NIVEL_ROTULO: Record<string, string> = {
    observando: 'observando',
    crescendo: 'crescendo',
    consolidada: 'consolidada',
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <AvatarPonte state="success" size="lg" />
        <h1 className="text-2xl font-semibold tracking-tight">{nome}, a história da sua empresa</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          {historia.resumo}
        </p>
      </div>

      {/* Capítulos */}
      <div className="space-y-4">
        {historia.capitulos.map((cap) => (
          <div
            key={cap.numero}
            className={`rounded-xl border-l-4 ${cap.cor} border bg-card p-5 space-y-2 hover:bg-muted/30 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{cap.icone}</span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  Capítulo {cap.numero}
                </p>
                <h3 className="font-semibold text-sm">{cap.titulo}</h3>
              </div>
            </div>
            <div className="space-y-2 pl-10">
              {cap.paragrafos.length > 0 ? (
                cap.paragrafos.map((p, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                    {p}
                  </p>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Este capítulo ainda está em branco. Ele será escrito na próxima conversa.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Linha da Vida — marcos reais, mês a mês */}
      {linhaDaVida && (
        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight">A linha da vida da sua empresa</h2>
            <p className="text-xs text-muted-foreground">{linhaDaVida.empresa.resumo}</p>
          </div>

          {linhaDaVida.empresa.marcos.length > 0 ? (
            <div className="relative space-y-4 before:absolute before:left-[13px] before:top-1 before:bottom-1 before:w-px before:bg-border">
              {linhaDaVida.empresa.marcos.map((m, i) => (
                <div key={i} className="relative pl-9">
                  <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-sm">
                    {m.icone}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">{m.mes}</p>
                    <p className="text-sm font-medium">{m.titulo}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Sua linha da vida começa a ser desenhada na primeira conversa.
            </p>
          )}
        </div>
      )}

      {/* Evolução do empresário — clareza, confiança, maturidade, decisão */}
      {linhaDaVida && (
        <div className="rounded-xl border border-primary/15 bg-card p-6 space-y-5">
          <div>
            <h2 className="text-base font-semibold tracking-tight">A evolução de {nome}</h2>
            <p className="text-xs text-muted-foreground">
              A Ponte acompanha a sua evolução — não para medir você, mas para mostrar crescimento.
            </p>
          </div>

          {linhaDaVida.fundador.comparacao && (
            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-3">
              {linhaDaVida.fundador.comparacao}
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {linhaDaVida.fundador.dimensoes.map((d) => (
              <div key={d.dimensao} className="space-y-1.5 rounded-lg bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{d.dimensao}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                    {NIVEL_ROTULO[d.nivel] ?? d.nivel}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-primary/70 transition-all"
                    style={{ width: `${d.progresso}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.descricao}</p>
              </div>
            ))}
          </div>

          {linhaDaVida.fundador.indiceClareza !== null && (
            <div className="rounded-lg bg-muted/50 p-4 space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Índice de clareza — {linhaDaVida.fundador.indiceClareza}%
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{linhaDaVida.fundador.clarezaTexto}</p>
            </div>
          )}
        </div>
      )}

      {/* Perguntas Vivas — a história das perguntas */}
      <div className="rounded-xl border bg-card p-6 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          As perguntas que já acompanharam você
        </p>
        {perguntasVivas.length > 0 ? (
          <div className="space-y-3">
            {perguntasVivas.slice(0, 5).map((p) => (
              <div key={p.id} className="border-l-2 border-primary/20 pl-3 space-y-1">
                <p className="text-sm text-foreground">{p.pergunta}</p>
                {p.resposta && (
                  <p className="text-xs text-muted-foreground italic">
                    Respondida: {p.resposta}
                  </p>
                )}
                {p.estado === 'RESPONDIDA' && (
                  <p className="text-[10px] text-green-600 dark:text-green-400 font-medium">
                    ✓ Pergunta resolvida — uma nova nasceu depois dela
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Ainda não existe uma pergunta viva. Ela nasce da primeira conversa.
          </p>
        )}
      </div>

      {/* Progresso da história */}
      <div className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-6 space-y-3 text-center">
        <p className="text-sm text-muted-foreground">
          {historia.totalReflexoes > 0
            ? `${historia.totalReflexoes} reflexão(ões) plantadas. Cada uma delas escreveu algo na sua história.`
            : 'Cada semana ganha uma observação. Elas se tornam parágrafos da sua história.'}
        </p>
        <Link
          href="/conversa"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Continuar minha história
        </Link>
      </div>
    </div>
  )
}
