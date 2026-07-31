import { requireUser } from '@/lib/auth'
import { obterPerguntaVivaAtiva, obterReflexaoDaSemana, listarMemoriasEmocionais } from '@/engine/relacao-engine'
import { AvatarPonte } from '@/components/ui/avatar'
import { ComoEstaHoje } from '@/components/dashboard/como-esta-hoje'
import Link from 'next/link'

export const metadata = { title: 'Ponte Digital' }

export default async function DashboardPage() {
  const usuario = await requireUser()
  const nome = usuario.nome.split(' ')[0]

  const [perguntaViva, reflexao, memorias] = await Promise.all([
    obterPerguntaVivaAtiva(usuario.empresaId).catch(() => null),
    obterReflexaoDaSemana(usuario.empresaId).catch(() => null),
    listarMemoriasEmocionais(usuario.empresaId, 3).catch(() => []),
  ])

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Cabeçalho — presença, não painel */}
      <div className="text-center space-y-3">
        <AvatarPonte state="breathing" size="lg" />
        <h1 className="text-2xl font-semibold tracking-tight">
          {nome}, sua empresa está sendo escrita
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Não é um painel com números. É uma conversa que continua — com uma pergunta que acompanha você.
        </p>
      </div>

      {/* Pergunta Viva — UMA pergunta */}
      {perguntaViva && (
        <div className="rounded-xl border border-primary/20 bg-card p-6 space-y-3 animate-fade-in">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            A pergunta que acompanha você
          </p>
          <p className="text-lg font-medium leading-relaxed">
            {perguntaViva.pergunta}
          </p>
          {perguntaViva.contexto && (
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              {perguntaViva.contexto}
            </p>
          )}
          <Link
            href="/minha-jornada"
            className="inline-block text-xs text-primary hover:underline underline-offset-2"
          >
            Ver como essa pergunta evolui na minha história →
          </Link>
        </div>
      )}

      {/* Reflexão da Semana — UMA observação, não tarefa */}
      {reflexao && (
        <div className="rounded-xl border border-dashed border-amber-400/40 bg-card/50 p-6 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Para esta semana — apenas observe
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {reflexao.reflexao}
          </p>
          <p className="text-[10px] text-muted-foreground/60">
            Não precisa responder agora. A Ponte apenas planta a observação.
          </p>
        </div>
      )}

      {/* Memória Emocional — o que a Ponte lembra como sentiu */}
      {memorias.length > 0 && (
        <div className="rounded-xl border bg-card p-6 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            O que a Ponte lembra de como você se sentiu
          </p>
          <div className="space-y-2">
            {memorias.map((m) => (
              <p key={m.id} className="text-sm text-muted-foreground leading-relaxed border-l-2 border-muted pl-3">
                {m.sentimento}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Como está hoje — sentimento, não status */}
      <ComoEstaHoje />

      {/* Linha da História */}
      <div className="text-center pt-2">
        <Link
          href="/minha-jornada"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm text-foreground hover:bg-muted/50 transition-colors"
        >
          Ler minha história
        </Link>
      </div>
    </div>
  )
}
