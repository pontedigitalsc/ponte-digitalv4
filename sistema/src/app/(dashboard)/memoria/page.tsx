import { requireUser } from '@/lib/auth'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'
import { BookOpen, Compass, Sparkles, RefreshCw, Scale } from 'lucide-react'

export const metadata = { title: 'Memória da Empresa' }

interface ClarezaMeta {
  perguntaInicial?: string | null
  descoberta?: string
  decisaoSugerida?: string
  reacao?: string | null
  categoriaRotulo?: string | null
}

const STATUS_LABEL: Record<string, string> = {
  PENDENTE: 'Pensando',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Decidida',
  ABANDONADA: 'Não foi adiante',
}

function formatarData(iso: Date): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default async function MemoriaEmpresaPage() {
  const usuario = await requireUser()

  const [
    acoes,
    aprendizados,
    clarezas,
    sessoes,
    outcomes,
    memorias,
    sinalTotal,
  ] = await Promise.all([
    prisma.acaoCognitiva.findMany({
      where: { empresaId: usuario.empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      take: 20,
      include: { feedbacks: { where: { deletedAt: null }, orderBy: { criadoEm: 'desc' }, take: 1 } },
    }),
    prisma.aprendizado.findMany({
      where: { empresaId: usuario.empresaId, deletedAt: null, ativo: true },
      orderBy: { criadoEm: 'desc' },
      take: 20,
    }),
    prisma.sinalValor.findMany({
      where: { empresaId: usuario.empresaId, tipo: 'CLAREZA_GERADA', deletedAt: null },
      orderBy: { criadoEm: 'desc' },
      take: 20,
    }),
    prisma.conversa.findMany({
      where: { empresaId: usuario.empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      select: { criadaEm: true, concluida: true },
    }),
    prisma.outcome.findMany({
      where: { empresaId: usuario.empresaId, deletedAt: null },
      orderBy: { criadoEm: 'desc' },
      take: 20,
    }),
    prisma.memoriaEmocional.findMany({
      where: { empresaId: usuario.empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      take: 10,
    }),
    prisma.sinalValor.count({ where: { empresaId: usuario.empresaId, deletedAt: null } }),
  ])

  const sessaoAtiva = sessoes.find((s) => !s.concluida)
  const primeirasSessoes = sessoes.slice(0, 12)

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <AvatarPonte state="success" size="lg" />
        <h1 className="text-2xl font-semibold tracking-tight">A memória da sua empresa</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Aqui não é uma linha do tempo. É o patrimônio que a empresa constrói: cada decisão,
          cada aprendizado, cada clareza — com contexto e resultado. Nada é inventado: tudo veio de você.
        </p>
      </div>

      {/* ─── Sessão em aberto ───────────────────────────────────────────── */}
      {sessaoAtiva && (
        <div className="rounded-xl border border-primary/15 bg-primary/5 p-5 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Existe uma conversa em aberto</p>
            <p className="text-xs text-muted-foreground">Iniciada em {formatarData(sessaoAtiva.criadaEm)} — terminá-la guarda a memória desta fase.</p>
          </div>
          <Link href="/conversa" className="shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Continuar sessão
          </Link>
        </div>
      )}

      {/* ─── Decisões ───────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold tracking-tight">Decisões que registramos</h2>
        </div>
        {acoes.length > 0 ? (
          <div className="space-y-3">
            {acoes.map((a) => {
              const resultado = (a.resultado as { aconteceu?: string; aprendemos?: string } | null) ?? null
              const esperado = (a.impactoEsperado as { resultadoEsperado?: string } | null) ?? null
              const feedback = a.feedbacks[0]
              return (
                <div key={a.id} className="rounded-xl border bg-card p-5 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium leading-snug">{a.titulo}</p>
                    <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {STATUS_LABEL[a.status] ?? a.status}
                    </span>
                  </div>
                  {a.descricao && (
                    <p className="text-xs text-muted-foreground leading-relaxed">{a.descricao}</p>
                  )}
                  {esperado?.resultadoEsperado && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Resultado esperado:</span> {esperado.resultadoEsperado}
                    </p>
                  )}
                  {resultado?.aconteceu && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">O que aconteceu:</span> {resultado.aconteceu}
                    </p>
                  )}
                  {resultado?.aprendemos && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">O que aprendemos:</span> {resultado.aprendemos}
                    </p>
                  )}
                  {feedback?.tipo === 'AJUDOU' && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">✓ Ajudou de verdade</p>
                  )}
                  {feedback?.tipo === 'NAO_AJUDOU' && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">Ainda não ajudou como esperávamos</p>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-5 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Ainda não registramos nenhuma decisão. Quando você pensar antes de decidir, ela fica guardada aqui — com contexto e resultado.
            </p>
            <Link href="/centro-decisao" className="inline-flex items-center gap-1 text-xs text-primary hover:underline underline-offset-2">
              <Compass className="h-3.5 w-3.5" /> Pensar antes de decidir
            </Link>
          </div>
        )}
      </div>

      {/* ─── Aprendizados ───────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold tracking-tight">Aprendizados que a empresa guarda</h2>
        </div>
        {aprendizados.length > 0 ? (
          <div className="space-y-2">
            {aprendizados.map((a) => (
              <div key={a.id} className="rounded-xl border bg-card p-4 space-y-1">
                <p className="text-sm text-foreground leading-relaxed">{a.descricao}</p>
                {a.contexto && <p className="text-xs text-muted-foreground">{a.contexto}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-5 text-sm text-muted-foreground text-center">
            Os aprendizados aparecem aqui conforme a empresa evolui.
          </p>
        )}
      </div>

      {/* ─── Clarezas percebidas ────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h2 className="text-base font-semibold tracking-tight">Clarezas que cada conversa deixou</h2>
        </div>
        {clarezas.length > 0 ? (
          <div className="space-y-2">
            {clarezas.map((c) => {
              const meta = c.metadata as unknown as ClarezaMeta | null
              return (
                <div key={c.id} className="rounded-xl border bg-card p-4 space-y-1.5">
                  {meta?.descoberta && <p className="text-sm text-foreground leading-relaxed">{meta.descoberta}</p>}
                  {meta?.categoriaRotulo && (
                    <span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {meta.categoriaRotulo}
                    </span>
                  )}
                  {meta?.decisaoSugerida && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Foco:</span> {meta.decisaoSugerida}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-5 text-sm text-muted-foreground text-center">
            Após cada sessão estratégica, a clareza que você percebeu fica registrada aqui.
          </p>
        )}
      </div>

      {/* ─── Mudanças percebidas ────────────────────────────────────────── */}
      {(outcomes.length > 0 || memorias.length > 0) && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-emerald-500" />
            <h2 className="text-base font-semibold tracking-tight">Mudanças percebidas</h2>
          </div>
          <div className="space-y-2">
            {outcomes.map((o) => (
              <div key={o.id} className="rounded-xl border bg-card p-4 space-y-1">
                <p className="text-sm text-foreground leading-relaxed">{o.descricao}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{o.categoria}</p>
              </div>
            ))}
            {memorias.map((m) => (
              <div key={m.id} className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-4">
                <p className="text-sm text-foreground italic leading-relaxed">"{m.sentimento}"</p>
                {m.fato && <p className="text-xs text-muted-foreground mt-1">{m.fato}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Sessões estratégicas ───────────────────────────────────────── */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight">Sessões estratégicas</h2>
        {primeirasSessoes.length > 0 ? (
          <div className="space-y-2">
            {primeirasSessoes.map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border bg-card p-4">
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${s.concluida ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                  <p className="text-sm text-muted-foreground">Sessão de {formatarData(s.criadaEm)}</p>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {s.concluida ? 'Concluída' : 'Em aberto'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-5 text-sm text-muted-foreground text-center">
            A primeira sessão estratégica escreve o primeiro capítulo desta memória.
          </p>
        )}
        <div className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-5 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {sinalTotal > 0
              ? `A Ponte já registrou ${sinalTotal} evidência(s) de valor para a sua empresa.`
              : 'Toda interação real vira evidência para a Ponte — sem nota, sem julgamento.'}
          </p>
          <Link href="/conversa" className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Começar a próxima sessão
          </Link>
        </div>
      </div>
    </div>
  )
}
