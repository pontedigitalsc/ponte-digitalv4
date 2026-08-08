import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { temPermissaoPlataformaUsuario } from '@/lib/plataforma'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const metadata: Metadata = { title: 'Diário Científico' }
export const dynamic = 'force-dynamic'

function formatarData(d: Date) {
  return format(d, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}

const ROTULOS_TIPO: Record<string, string> = {
  OBSERVACAO: '🔍 Observação',
  EVIDENCIA: '📊 Evidência',
  HIPOTESE: '🧪 Hipótese',
  EXPERIMENTO: '⚗️ Experimento',
  VALIDACAO: '✅ Validação',
  CONHECIMENTO: '🧠 Conhecimento',
}

export default async function DiarioCientificoPage() {
  const usuario = await requireUser()
  if (!temPermissaoPlataformaUsuario(usuario, 'FOUNDER_VIEW_INTERNAL')) redirect('/dashboard')

  const hoje = new Date()
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)

  const [registros, totalEmpresas, atividadesMes, hipotesesAtivas, conhecimentosMes, indiceGlobal] = await Promise.all([
    prisma.registroCientifico.findMany({ orderBy: { criadoEm: 'desc' }, take: 50 }),
    prisma.empresa.count({ where: { ativa: true, deletedAt: null } }),
    prisma.historico.count({ where: { criadoEm: { gte: inicioMes }, deletedAt: null } }),
    prisma.hipotese.count({ where: { deletedAt: null, estado: { not: 'DESCARTADA' } } }),
    prisma.conhecimentoValidado.count({ where: { criadoEm: { gte: inicioMes }, deletedAt: null } }),
    prisma.sinalValor.groupBy({ by: ['tipo'], _count: { id: true }, where: { criadoEm: { gte: inicioMes }, deletedAt: null } }),
  ])

  const agrupados = registros.reduce<Record<string, typeof registros>>((acc, r) => {
    const chave = format(r.criadoEm, "yyyy-MM-dd")
    if (!acc[chave]) acc[chave] = []
    acc[chave].push(r)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">📓 Diário Científico</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {formatarData(hoje)} — O que a Ponte Digital aprendeu hoje?
        </p>
      </div>

      {/* Perguntas do diário */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          🧭 Estado atual do conhecimento
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Empresas ativas</p>
            <p className="text-lg font-semibold mt-0.5">{totalEmpresas}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Atividades no mês</p>
            <p className="text-lg font-semibold mt-0.5">{atividadesMes}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hipóteses ativas</p>
            <p className="text-lg font-semibold mt-0.5">{hipotesesAtivas}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conhecimentos novos</p>
            <p className="text-lg font-semibold mt-0.5">{conhecimentosMes}</p>
          </div>
        </div>
      </div>

      {/* Últimas observações */}
      <div className="space-y-4">
        <p className="text-sm font-semibold">📋 Registros científicos</p>
        {Object.entries(agrupados).map(([data, items]) => (
          <div key={data} className="rounded-lg border bg-card px-5 py-4">
            <p className="text-xs font-medium text-muted-foreground mb-3">
              {format(new Date(data), "d 'de' MMMM", { locale: ptBR })}
            </p>
            <div className="space-y-3">
              {items.map(r => (
                <div key={r.id} className="border-l-2 border-primary/30 pl-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium">{ROTULOS_TIPO[r.tipo] ?? r.tipo}</span>
                    {r.autoria && <span className="text-[10px] text-muted-foreground">— {r.autoria}</span>}
                  </div>
                  <p className="text-sm font-medium">{r.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.descricao}</p>
                  {r.tags.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {r.tags.map(t => <span key={t} className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {registros.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">Nenhum registro científico ainda.</p>
            <p className="text-xs text-muted-foreground mt-1">Os registros aparecerão automaticamente à medida que o sistema aprender com os Founders.</p>
          </div>
        )}
      </div>

      {/* Sinais de valor do mês */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          📊 Sinais de valor (este mês)
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {indiceGlobal.map(s => (
            <div key={s.tipo}>
              <p className="text-xs text-muted-foreground">{s.tipo}</p>
              <p className="text-lg font-semibold mt-0.5">{s._count.id}</p>
            </div>
          ))}
          {indiceGlobal.length === 0 && (
            <p className="text-xs text-muted-foreground col-span-3">Nenhum sinal de valor registrado ainda.</p>
          )}
        </div>
      </div>
    </div>
  )
}