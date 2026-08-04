import { requireUser } from '@/lib/auth'
import { obterMemoriaViva } from '@/engine/memoria-evolutiva-engine'
import { obterPerguntaVivaAtiva } from '@/engine/relacao-engine'
import { AvatarPonte } from '@/components/ui/avatar'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import Link from 'next/link'
import type { SeloConfianca } from '@/engine/memoria-evolutiva-engine'

export const metadata = { title: 'Memória Viva da Empresa' }

const SELO_COR: Record<SeloConfianca, string> = {
  SABEMOS: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  ACREDITAMOS: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  INVESTIGANDO: 'bg-muted text-muted-foreground border-border',
}

export default async function MemoriaVivaPage() {
  const usuario = await requireUser()
  const nome = usuario.nome.split(' ')[0]

  const [memoria, perguntaViva] = await Promise.all([
    obterMemoriaViva(usuario.empresaId),
    obterPerguntaVivaAtiva(usuario.empresaId).catch(() => null),
  ])

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Cabeçalho — a frase que guia a Memória */}
      <div className="text-center space-y-4">
        <div className="mx-auto">
          <AvatarPonte state="success" size="lg" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{nome}, a memória viva da sua empresa</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          A Ponte não guarda dados. A Ponte guarda a evolução da empresa.
        </p>
      </div>

      {/* Narrativa primeiro — nunca um gráfico */}
      <div className="rounded-xl border border-primary/15 bg-card p-6 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
          {memoria.temHistorico ? `${memoria.totalSessoes} conversas na memória` : 'Começando nossa memória'}
        </p>
        <p className="text-sm text-foreground leading-relaxed">
          {memoria.narrativa}
        </p>
      </div>

      {/* Painéis de evolução — cada um responde "Estamos evoluindo?" */}
      <div className="space-y-5">
        {memoria.paineis.map((painel) => (
          <div key={painel.id} className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-lg">
                {painel.icone}
              </span>
              <div className="space-y-0.5">
                <h2 className="font-semibold tracking-tight">{painel.titulo}</h2>
                <p className="text-xs text-muted-foreground italic">{painel.pergunta}</p>
              </div>
            </div>

            {/* ANTES → HOJE: comparação, não linha do tempo */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1 rounded-lg bg-muted/40 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  Antes
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {painel.antes ? `"${painel.antes}"` : 'Ainda não me contou sobre isso.'}
                </p>
              </div>
              <div className="space-y-1 rounded-lg bg-muted/40 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                  Hoje
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {painel.hoje ? `"${painel.hoje}"` : 'Ainda não me contou sobre isso.'}
                </p>
              </div>
            </div>

            {/* Interpretação — a leitura da Ponte, sempre como leitura */}
            <div className="space-y-2">
              <p className="text-sm text-foreground leading-relaxed border-l-2 border-primary/20 pl-3">
                {painel.interpretacao}
              </p>
              <span className={`inline-block rounded-full border px-3 py-1 text-[10px] font-semibold ${SELO_COR[painel.selo]}`}>
                {painel.seloTexto}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Aviso de confiança — hipótese nunca é verdade */}
      <div className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-5 text-center">
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          {memoria.aviso}
        </p>
      </div>

      {/* Pergunta viva — a conversa continua */}
      {perguntaViva && (
        <div className="rounded-xl border bg-card p-6 space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            A pergunta que está acompanhando você
          </p>
          <p className="text-sm text-foreground leading-relaxed italic">
            {perguntaViva.pergunta}
          </p>
        </div>
      )}

      {/* Próxima conversa — nunca uma barra de progresso */}
      <div className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-6 space-y-3 text-center">
        <p className="text-sm text-muted-foreground">
          {memoria.temHistorico
            ? 'Cada conversa que tivermos compara o antes e o hoje — e escreve um novo parágrafo na memória.'
            : 'A próxima conversa vai comparar o estado atual com o que mudou.'}
        </p>
        <Link
          href="/conversa"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Continuar a conversa
        </Link>
      </div>
    </div>
  )
}
