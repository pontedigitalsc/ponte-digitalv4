import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calcularMetricasPlataforma } from '@/engine/p36/platform-capital-engine'
import { obterFricoesAgrupadas } from '@/engine/p36/friction-radar'
import { calcularIndiceGlobal } from '@/engine/p36/value-index'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const metadata: Metadata = { title: 'Diário do Founder' }
export const dynamic = 'force-dynamic'

function formatarData(d: Date) {
  return format(d, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}

export default async function DiarioFounderPage() {
  const usuario = await requireUser()
  if (usuario.role !== 'ADMIN') redirect('/dashboard')

  const hoje = new Date()
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)

  const [metricas, fricoes, indice, totalEmpresas, atividadesHoje, wowCount, snapshots] = await Promise.all([
    calcularMetricasPlataforma(),
    obterFricoesAgrupadas(),
    calcularIndiceGlobal(),
    prisma.empresa.count({ where: { ativa: true, deletedAt: null } }),
    prisma.historico.count({ where: { criadoEm: { gte: new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) }, deletedAt: null } }),
    prisma.momentoWow.count({ where: { criadoEm: { gte: inicioMes }, deletedAt: null } }),
    prisma.plataformaSnapshot.findMany({ orderBy: { criadoEm: 'desc' }, take: 7 }),
  ])

  const [hipotesesFortalecidasMes, hipotesesDescartadasMes, conhecimentosNovosMes] = await Promise.all([
    prisma.hipotese.count({ where: { estado: { in: ['FORTALECIDA', 'CONFIRMADA'] }, atualizadaEm: { gte: inicioMes }, deletedAt: null } }),
    prisma.hipotese.count({ where: { estado: 'DESCARTADA', atualizadaEm: { gte: inicioMes }, deletedAt: null } }),
    prisma.conhecimentoValidado.count({ where: { criadoEm: { gte: inicioMes }, deletedAt: null } }),
  ])

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-xl font-semibold">📓 Diário do Founder</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {formatarData(hoje)} — Validação Científica da Ponte Digital
        </p>
      </div>

      {/* Pergunta 1: O que aconteceu hoje? */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          📋 O que aconteceu hoje?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Empresas ativas</p>
            <p className="text-lg font-semibold mt-0.5">{totalEmpresas}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Atividades registradas</p>
            <p className="text-lg font-semibold mt-0.5">{atividadesHoje}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Momentos WOW (mês)</p>
            <p className="text-lg font-semibold mt-0.5 text-emerald-600">{wowCount}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Índice de Valor Global</p>
            <p className="text-lg font-semibold mt-0.5">{indice.indiceMedio}</p>
          </div>
        </div>
      </div>

      {/* Pergunta 2: O que aprendemos? */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          🧠 O que aprendemos? (Este mês)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Hipóteses fortalecidas</p>
            <p className="text-lg font-semibold mt-0.5 text-emerald-600">{hipotesesFortalecidasMes}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hipóteses descartadas</p>
            <p className="text-lg font-semibold mt-0.5 text-destructive">{hipotesesDescartadasMes}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conhecimentos novos</p>
            <p className="text-lg font-semibold mt-0.5 text-emerald-600">{conhecimentosNovosMes}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Precisão recomendações</p>
            <p className="text-lg font-semibold mt-0.5">{metricas.precisaoRecomendacoes}%</p>
          </div>
        </div>
      </div>

      {/* Pergunta 3: Que hipótese foi fortalecida? */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          ✅ Hipóteses fortalecidas (top 5)
        </p>
        <HipotesesFortalecidas />
      </div>

      {/* Pergunta 4: Que hipótese morreu? */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          ❌ Hipóteses descartadas (top 5)
        </p>
        <HipotesesDescartadas />
      </div>

      {/* Radar de Fricção */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          ⚠️ Radar de Fricção
        </p>
        {fricoes.length > 0 ? (
          <div className="space-y-2">
            {fricoes.slice(0, 8).map((f, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-sm">{f.contexto}</span>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span className="text-destructive font-medium">{f.total} ocorrências</span>
                  <span>{Object.entries(f.tipos).map(([t, q]) => `${t}: ${q}`).join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Nenhuma fricção registrada neste período.</p>
        )}
      </div>

      {/* Capital Cognitivo da Plataforma */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          🏛️ Capital Cognitivo da Plataforma
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Total hipóteses</p>
            <p className="text-lg font-semibold mt-0.5">{metricas.totalHipoteses}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Taxa de validação</p>
            <p className="text-lg font-semibold mt-0.5">{metricas.taxaValidacao}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conhecimentos reutilizados</p>
            <p className="text-lg font-semibold mt-0.5">{metricas.conhecimentosReutilizados}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Recomendações eficazes</p>
            <p className="text-lg font-semibold mt-0.5">{metricas.recomendacoesEficazes}</p>
          </div>
        </div>

        {snapshots.length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">Histórico de snapshots</p>
            <div className="space-y-1">
              {snapshots.map(s => (
                <div key={s.id} className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{format(s.criadoEm, "d MMM HH:mm")}</span>
                  <span>H: {s.hipotesesValidadas} | D: {s.hipotesesDescartadas} | P: {s.precisaoRecomendacoes}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

async function HipotesesFortalecidas() {
  const hipoteses = await prisma.hipotese.findMany({
    where: { estado: { in: ['FORTALECIDA', 'CONFIRMADA'] }, deletedAt: null },
    orderBy: { atualizadaEm: 'desc' },
    take: 5,
    select: { descricao: true, categoria: true, confianca: true, atualizadaEm: true },
  })

  return hipoteses.length > 0 ? (
    <div className="space-y-2">
      {hipoteses.map((h, i) => (
        <div key={i} className="flex items-center justify-between text-sm">
          <span className="truncate flex-1">{h.descricao}</span>
          <div className="flex gap-3 text-xs text-muted-foreground shrink-0 ml-4">
            <span>{h.categoria}</span>
            <span className="text-emerald-600">{h.confianca}</span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-xs text-muted-foreground">Nenhuma hipótese fortalecida ainda.</p>
  )
}

async function HipotesesDescartadas() {
  const hipoteses = await prisma.hipotese.findMany({
    where: { estado: 'DESCARTADA', deletedAt: null },
    orderBy: { atualizadaEm: 'desc' },
    take: 5,
    select: { descricao: true, categoria: true, confianca: true, atualizadaEm: true },
  })

  return hipoteses.length > 0 ? (
    <div className="space-y-2">
      {hipoteses.map((h, i) => (
        <div key={i} className="flex items-center justify-between text-sm">
          <span className="truncate flex-1">{h.descricao}</span>
          <div className="flex gap-3 text-xs text-muted-foreground shrink-0 ml-4">
            <span>{h.categoria}</span>
            <span className="text-destructive">{h.confianca}</span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-xs text-muted-foreground">Nenhuma hipótese descartada ainda.</p>
  )
}
