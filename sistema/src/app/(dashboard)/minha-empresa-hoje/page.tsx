import { requireUser, getEmpresaDoUsuario } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { startOfDay } from 'date-fns'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'

export const metadata = { title: 'Minha Empresa Hoje' }

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default async function MinhaEmpresaHojePage() {
  const usuario = await requireUser()
  const empresa = await getEmpresaDoUsuario(usuario.id)
  const nome = usuario.nome.split(' ')[0]

  const historia = await experienceEngine.obterHomeExperience(usuario.empresaId)
  const retrato = historia.narrativaEmpresarial?.retratoVivo

  const agora = new Date()
  const inicioHoje = startOfDay(agora)
  const inicioOntem = startOfDay(new Date(agora.getTime() - 86400000))

  const [receitaHoje, receitaOntem, atendimentosHoje, tarefasConcluidas, clientesNovos] = await Promise.all([
    prisma.transacao.aggregate({
      where: { empresaId: usuario.empresaId, deletedAt: null, tipo: 'RECEITA', dataPagamento: { gte: inicioHoje } },
      _sum: { valor: true },
    }),
    prisma.transacao.aggregate({
      where: { empresaId: usuario.empresaId, deletedAt: null, tipo: 'RECEITA', dataPagamento: { gte: inicioOntem, lt: inicioHoje } },
      _sum: { valor: true },
    }),
    prisma.historico.count({
      where: { empresaId: usuario.empresaId, criadoEm: { gte: inicioHoje }, descricao: { startsWith: 'Atendimento:' } },
    }),
    prisma.tarefa.count({
      where: { empresaId: usuario.empresaId, deletedAt: null, status: 'CONCLUIDA', concluidaEm: { gte: inicioOntem } },
    }),
    prisma.cliente.count({
      where: { empresaId: usuario.empresaId, deletedAt: null, criadoEm: { gte: inicioOntem } },
    }),
  ])

  const mudancas: { texto: string; positivo?: boolean }[] = []

  const valorHoje = Number(receitaHoje._sum.valor ?? 0)
  const valorOntem = Number(receitaOntem._sum.valor ?? 0)
  if (valorHoje > 0) {
    mudancas.push({ texto: `${brl.format(valorHoje)} recebido hoje${valorOntem > 0 ? ` (ontem foram ${brl.format(valorOntem)})` : ''}.`, positivo: true })
  }
  if (atendimentosHoje > 0) {
    mudancas.push({ texto: `${atendimentosHoje} atendimento${atendimentosHoje > 1 ? 's' : ''} registrado${atendimentosHoje > 1 ? 's' : ''} hoje.`, positivo: true })
  }
  if (tarefasConcluidas > 0) {
    mudancas.push({ texto: `${tarefasConcluidas} tarefa${tarefasConcluidas > 1 ? 's' : ''} concluída${tarefasConcluidas > 1 ? 's' : ''} desde ontem.`, positivo: true })
  }
  if (clientesNovos > 0) {
    mudancas.push({ texto: `${clientesNovos} cliente${clientesNovos > 1 ? 's' : ''} novo${clientesNovos > 1 ? 's' : ''} desde ontem.`, positivo: true })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Cabeçalho */}
      <div className="text-center space-y-4">
        <AvatarPonte state="success" size="lg" />
        <h1 className="text-2xl font-semibold tracking-tight">{nome}, sua empresa hoje</h1>
      </div>

      {/* Pertencimento (P57B) — cada conta tem um número na história da Ponte */}
      {(empresa?.numeroFundador ?? empresa?.numeroApoiador) ? (
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-50 px-4 py-2 text-sm dark:bg-amber-950/30">
          <span className="text-amber-700 dark:text-amber-400">
            {empresa.numeroFundador
              ? `Fundador #${String(empresa.numeroFundador).padStart(4, '0')}`
              : `Apoiador #${String(empresa.numeroApoiador).padStart(4, '0')}`}
            {' '}— você está na história da Ponte.
          </span>
        </div>
      ) : null}

      {/* Narrativa principal */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Na última conversa, começamos a entender como sua empresa funciona.
          Cada resposta que você deu foi um passo para construir um retrato mais fiel.
        </p>
        <div className="border-l-2 border-primary/30 pl-4 py-2 space-y-2">
          {retrato?.forcas?.[0] && (
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 dark:text-green-400 font-medium">Uma força que percebemos:</span>{' '}
              {retrato.forcas[0]}
            </p>
          )}
          {retrato?.riscos?.[0] && (
            <p className="text-sm text-muted-foreground">
              <span className="text-amber-600 dark:text-amber-400 font-medium">Um ponto que merece atenção:</span>{' '}
              {retrato.riscos[0]}
            </p>
          )}
          {!retrato?.forcas?.[0] && !retrato?.riscos?.[0] && (
            <p className="text-sm text-muted-foreground">
              Conforme conversamos, sua empresa vai ficando mais nítida. Cada conversa revela algo novo.
            </p>
          )}
        </div>
      </div>

      {/* O que mudou desde ontem */}
      <div className="rounded-xl border bg-card p-6 space-y-3">
        <div className="flex items-center gap-2">
          <AvatarPonte state="speaking" size="sm" />
          <h2 className="text-base font-semibold tracking-tight">O que mudou desde ontem</h2>
        </div>
        {mudancas.length > 0 ? (
          <ul className="space-y-1.5">
            {mudancas.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className={m.positivo ? 'text-emerald-500' : 'text-primary'} aria-hidden>✦</span>
                {m.texto}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nada mudou desde ontem — e isso também é informação. Quando algo acontecer, você vê aqui.
          </p>
        )}
      </div>

      {/* Vamos continuar entendendo sua empresa? */}
      <div className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-6 space-y-4 text-center">
        <AvatarPonte state="speaking" size="md" />
        <h2 className="text-lg font-semibold tracking-tight">Vamos continuar entendendo sua empresa?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          O que mudou desde nossa última conversa?
        </p>
        <Link
          href="/conversa"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Quero continuar essa conversa
        </Link>
      </div>

      {/* Jornada */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">Sua história está sendo construída</p>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/minha-jornada"
            className="rounded-xl border bg-card p-4 space-y-1 hover:bg-muted/30 transition-colors"
          >
            <p className="text-sm font-medium">Minha Jornada</p>
            <p className="text-xs text-muted-foreground">Veja os capítulos da sua história</p>
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border bg-card p-4 space-y-1 hover:bg-muted/30 transition-colors"
          >
            <p className="text-sm font-medium">Como está hoje?</p>
            <p className="text-xs text-muted-foreground">Compartilhe como se sente agora</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
