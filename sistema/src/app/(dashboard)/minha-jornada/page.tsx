import { requireUser } from '@/lib/auth'
import { montarLinhaDaHistoria } from '@/engine/relacao-engine'
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

  const [historia, perguntasVivas] = await Promise.all([
    montarLinhaDaHistoria(usuario.empresaId, respostas),
    prisma.perguntaViva.findMany({
      where: { empresaId: usuario.empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
    }),
  ])

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
