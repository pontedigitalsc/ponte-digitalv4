import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const metadata: Metadata = { title: 'Radar Founders' }
export const dynamic = 'force-dynamic'

export default async function RadarFoundersPage() {
  const usuario = await requireUser()
  if (usuario.role !== 'ADMIN') redirect('/dashboard')

  const empresas = await prisma.empresa.findMany({
    where: { ativa: true, deletedAt: null },
    select: {
      id: true, nome: true, criadaEm: true,
      _count: {
        select: {
          historicos: true,
          hipoteses: true,
          evidencias: true,
          conhecimentosValidados: true,
          sinaisValor: true,
          transacoes: true,
        },
      },
    },
    orderBy: { criadaEm: 'desc' },
  })

  const empresasComIndice = await Promise.all(empresas.map(async e => {
    const ultimoAcesso = await prisma.historico.findFirst({
      where: { empresaId: e.id, deletedAt: null },
      orderBy: { criadoEm: 'desc' },
      select: { criadoEm: true },
    })
    const ultimoAprendizado = await prisma.hipotese.findFirst({
      where: { empresaId: e.id, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      select: { descricao: true, criadaEm: true },
    })
    const totalSinaisValor = e._count.sinaisValor
    const scoreTransformacao = e._count.hipoteses > 0
      ? Math.min(100, Math.round((e._count.conhecimentosValidados * 30 + e._count.hipoteses * 20 + totalSinaisValor * 25) / (e._count.hipoteses || 1)))
      : 0

    return {
      id: e.id,
      nome: e.nome,
      criadaEm: e.criadaEm,
      totalAtendimentos: e._count.historicos,
      totalHipoteses: e._count.hipoteses,
      totalEvidencias: e._count.evidencias,
      totalConhecimentos: e._count.conhecimentosValidados,
      totalSinaisValor,
      totalTransacoes: e._count.transacoes,
      scoreTransformacao,
      ultimoAcesso: ultimoAcesso?.criadoEm ?? null,
      ultimoAprendizado: ultimoAprendizado?.descricao ?? null,
      ultimoAprendizadoEm: ultimoAprendizado?.criadaEm ?? null,
    }
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">📡 Radar dos Founders</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {empresasComIndice.length} empresa(s) ativa(s) — Acompanhamento de evolução
        </p>
      </div>

      {/* Cards de métrica agregada */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Total de empresas</p>
          <p className="text-xl font-semibold mt-0.5">{empresasComIndice.length}</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Total de aprendizados</p>
          <p className="text-xl font-semibold mt-0.5">{empresasComIndice.reduce((s, e) => s + e.totalHipoteses, 0)}</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Total de conhecimentos</p>
          <p className="text-xl font-semibold mt-0.5">{empresasComIndice.reduce((s, e) => s + e.totalConhecimentos, 0)}</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Transformação média</p>
          <p className="text-xl font-semibold mt-0.5">
            {empresasComIndice.length > 0 ? Math.round(empresasComIndice.reduce((s, e) => s + e.scoreTransformacao, 0) / empresasComIndice.length) : 0}%
          </p>
        </div>
      </div>

      {/* Tabela de Founders */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground bg-muted/50">
                <th className="text-left py-2 px-3 font-medium">Empresa</th>
                <th className="text-center py-2 px-3 font-medium">Atend.</th>
                <th className="text-center py-2 px-3 font-medium">Hip.</th>
                <th className="text-center py-2 px-3 font-medium">Evid.</th>
                <th className="text-center py-2 px-3 font-medium">Conh.</th>
                <th className="text-center py-2 px-3 font-medium">Sinais</th>
                <th className="text-center py-2 px-3 font-medium">Transformação</th>
                <th className="text-center py-2 px-3 font-medium">Último acesso</th>
                <th className="text-left py-2 px-3 font-medium">Último aprendizado</th>
              </tr>
            </thead>
            <tbody>
              {empresasComIndice.map(e => (
                <tr key={e.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="py-2 px-3 font-medium">{e.nome}</td>
                  <td className="text-center py-2 px-3 text-muted-foreground">{e.totalAtendimentos}</td>
                  <td className="text-center py-2 px-3 text-muted-foreground">{e.totalHipoteses}</td>
                  <td className="text-center py-2 px-3 text-muted-foreground">{e.totalEvidencias}</td>
                  <td className="text-center py-2 px-3 text-muted-foreground">{e.totalConhecimentos}</td>
                  <td className="text-center py-2 px-3 text-muted-foreground">{e.totalSinaisValor}</td>
                  <td className="text-center py-2 px-3">
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                      e.scoreTransformacao >= 60 ? 'bg-emerald-100 text-emerald-700' :
                      e.scoreTransformacao >= 30 ? 'bg-amber-100 text-amber-700' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {e.scoreTransformacao}%
                    </span>
                  </td>
                  <td className="text-center py-2 px-3 text-xs text-muted-foreground">
                    {e.ultimoAcesso ? format(e.ultimoAcesso, "d MMM", { locale: ptBR }) : '—'}
                  </td>
                  <td className="py-2 px-3 text-xs text-muted-foreground max-w-[200px] truncate">
                    {e.ultimoAprendizado ?? '—'}
                  </td>
                </tr>
              ))}
              {empresasComIndice.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-sm text-muted-foreground">
                    Nenhuma empresa ativa encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}