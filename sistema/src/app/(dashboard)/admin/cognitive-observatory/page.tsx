import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import {
  obterResumoCognitivo,
  obterEvolucaoDiaria,
  obterCategoriasMaisAprendidas,
  obterCategoriasEstagnadas,
  obterEmpresasMaisEvoluidas,
  obterAlertasGovernanca,
} from '@/engine'

export const metadata: Metadata = { title: 'Observatório Cognitivo' }
export const dynamic = 'force-dynamic'

function rotuloCategoria(cat: string): string {
  const mapa: Record<string, string> = {
    FINANCEIRO: 'Financeiro',
    CLIENTES: 'Clientes',
    OPERACAO: 'Operação',
    GESTAO: 'Gestão',
    PESSOAS: 'Pessoas',
    PRODUTO: 'Produto',
    ESTRATEGIA: 'Estratégia',
  }
  return mapa[cat] ?? cat
}

export default async function CognitiveObservatoryPage() {
  const usuario = await requireUser()
  if (usuario.role !== 'ADMIN') redirect('/dashboard')

  const [resumo, evolucao, categorias, estagnadas, empresas, alertas] = await Promise.all([
    obterResumoCognitivo(),
    obterEvolucaoDiaria(),
    obterCategoriasMaisAprendidas(),
    obterCategoriasEstagnadas(),
    obterEmpresasMaisEvoluidas(5),
    obterAlertasGovernanca(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">🔭 Observatório Cognitivo</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          A Ponte Digital sabe mais hoje do que sabia ontem? — {resumo.data}
        </p>
      </div>

      {/* 1. Resumo do dia */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          📊 Resumo do patrimônio cognitivo
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Empresas analisadas</p>
            <p className="text-lg font-semibold mt-0.5">{resumo.empresasAnalisadas}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Evidências registradas</p>
            <p className="text-lg font-semibold mt-0.5">{resumo.evidenciasRegistradas}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hipóteses criadas</p>
            <p className="text-lg font-semibold mt-0.5">{resumo.hipotesesCriadas}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hipóteses fortalecidas</p>
            <p className="text-lg font-semibold mt-0.5 text-emerald-600">{resumo.hipotesesFortalecidas}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hipóteses descartadas</p>
            <p className="text-lg font-semibold mt-0.5 text-destructive">{resumo.hipotesesDescartadas}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conhecimentos promovidos</p>
            <p className="text-lg font-semibold mt-0.5 text-emerald-600">{resumo.conhecimentosPromovidos}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Outcomes positivos</p>
            <p className="text-lg font-semibold mt-0.5 text-emerald-600">{resumo.outcomesPositivos}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Outcomes negativos</p>
            <p className="text-lg font-semibold mt-0.5 text-destructive">{resumo.outcomesNegativos}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Score médio conhecimentos</p>
            <p className="text-lg font-semibold mt-0.5">{resumo.scoreMedioConhecimentos}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Evolução média empresas</p>
            <p className="text-lg font-semibold mt-0.5">{resumo.scoreMedioEvolucaoEmpresas}%</p>
          </div>
        </div>
      </div>

      {/* 2. Evolução */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          📈 Evolução
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-muted-foreground">
                <th className="text-left py-2 pr-4 font-medium">Período</th>
                <th className="text-right py-2 pr-4 font-medium">Evidências</th>
                <th className="text-right py-2 pr-4 font-medium">Hipóteses</th>
                <th className="text-right py-2 pr-4 font-medium">Conhecimentos</th>
                <th className="text-right py-2 font-medium">Outcomes</th>
              </tr>
            </thead>
            <tbody>
              {evolucao.map((p) => {
                const labels: Record<string, string> = { hoje: 'Hoje', '7d': 'Últimos 7 dias', '30d': 'Últimos 30 dias' }
                return (
                  <tr key={p.periodo} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-medium">{labels[p.periodo] ?? p.periodo}</td>
                    <td className="text-right py-2 pr-4">{p.evidencias}</td>
                    <td className="text-right py-2 pr-4">{p.hipoteses}</td>
                    <td className="text-right py-2 pr-4">{p.conhecimentos}</td>
                    <td className="text-right py-2">{p.outcomes}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Categorias */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card px-5 py-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            🏆 Categorias mais aprendidas
          </p>
          <div className="space-y-2">
            {categorias.map((c) => (
              <div key={c.categoria} className="flex items-center justify-between text-sm">
                <span className={c.estagnada ? 'text-muted-foreground line-through' : ''}>
                  {rotuloCategoria(c.categoria)}
                </span>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span>{c.evidencias} ev.</span>
                  <span>{c.conhecimentos} cn.</span>
                  <span>{c.outcomes} out.</span>
                  <span className="font-medium">{c.scoreMedio}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card px-5 py-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            🚫 Categorias estagnadas
          </p>
          {estagnadas.length > 0 ? (
            <div className="space-y-2">
              {estagnadas.map((c) => (
                <div key={c.categoria} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{rotuloCategoria(c.categoria)}</span>
                  <span className="text-xs text-destructive">Sem atividade</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Todas as categorias têm atividade recente.</p>
          )}
        </div>
      </div>

      {/* 4. Empresas */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          🏢 Empresas
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Maior evolução</p>
            <div className="space-y-1.5">
              {empresas.maiorEvolucao.map((e) => (
                <div key={e.empresaId} className="flex justify-between text-sm">
                  <span className="truncate">{e.nome}</span>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{e.scoreAtivacao}%</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Maior estagnação</p>
            <div className="space-y-1.5">
              {empresas.maiorEstagnacao.length > 0 ? empresas.maiorEstagnacao.map((e) => (
                <div key={e.empresaId} className="flex justify-between text-sm">
                  <span className="truncate">{e.nome}</span>
                  <span className="text-xs text-destructive shrink-0 ml-2">{e.scoreAtivacao}%</span>
                </div>
              )) : <p className="text-xs text-muted-foreground">Nenhuma empresa estagnada.</p>}
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-[10px] font-medium text-muted-foreground mb-1">Mais aprendizados</p>
            {empresas.maisAprendizados.slice(0, 3).map((e) => (
              <p key={e.empresaId} className="text-xs">{e.nome} — {e.totalHipoteses} hip.</p>
            ))}
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground mb-1">Mais outcomes</p>
            {empresas.maisOutcomes.slice(0, 3).map((e) => (
              <p key={e.empresaId} className="text-xs">{e.nome} — {e.totalOutcomes} out.</p>
            ))}
          </div>
          <div>
            <p className="text-[10px] font-medium text-muted-foreground mb-1">Mais hipóteses</p>
            {empresas.maisHipoteses.slice(0, 3).map((e) => (
              <p key={e.empresaId} className="text-xs">{e.nome} — {e.totalHipoteses} hip.</p>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Governança */}
      <div className="rounded-lg border bg-card px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          🛡️ Alertas de governança
        </p>
        {alertas.length > 0 ? (
          <div className="space-y-2">
            {alertas.slice(0, 8).map((a, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="shrink-0 mt-0.5 text-xs">
                  {a.severidade === 'alta' ? '🔴' : a.severidade === 'media' ? '🟡' : '🟢'}
                </span>
                <div>
                  <p className="text-xs">{a.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Nenhum alerta ativo.</p>
        )}
      </div>
    </div>
  )
}
