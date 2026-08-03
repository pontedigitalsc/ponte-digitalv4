import { requireUser } from '@/lib/auth'
import { gerarDecisoes, classificarDecisoesPorPrioridade, enriquecerDecisoesComTrust, filtrarDecisoesPorRelevancia, obterEstadoCognitivoCompleto } from '@/engine'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/card'
import { PensarAntesDeDecidir } from '@/components/decisao/pensar-antes-de-decidir'

const COR_PRIORIDADE: Record<string, string> = {
  URGENTE: 'destructive',
  ALTA: 'warning',
  MEDIA: 'info',
  BAIXA: 'secondary',
}

const NIVEL_LABEL: Record<string, string> = {
  URGENTE: 'Agora',
  ALTA: 'Em breve',
  MEDIA: 'Quando puder',
  BAIXA: 'Vale acompanhar',
}

const TIPO_ACAO_LABEL: Record<string, string> = {
  registrar: 'Registrar',
  revisar: 'Revisar',
  contatar: 'Contatar um cliente',
  negociar: 'Negociar',
  organizar: 'Organizar',
  mapear: 'Mapear',
  conversar: 'Conversar',
  analisar: 'Analisar',
  planejar: 'Planejar',
}

const DIFICULDADE_LABEL: Record<string, string> = {
  alta: 'Alto esforço',
  media: 'Esforço médio',
  baixa: 'Baixo esforço',
}

function BarraIndice({ value, label }: { value: number; label: string }) {
  const cor = value >= 70 ? 'bg-destructive' : value >= 45 ? 'bg-amber-500' : value >= 20 ? 'bg-blue-500' : 'bg-gray-300'
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary">
        <div className={`h-1.5 rounded-full ${cor}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  )
}

export default async function CentroDecisaoPage() {
  const usuario = await requireUser()
  const estado = await obterEstadoCognitivoCompleto(usuario.empresaId, { incluirAuditoria: false, registrarVisualizacao: true })
  const decisoes = await gerarDecisoes(usuario.empresaId)
  const decisoesComTrust = await enriquecerDecisoesComTrust(decisoes, usuario.empresaId)
  const decisoesFiltradas = filtrarDecisoesPorRelevancia(decisoesComTrust, estado.contexto ?? undefined)

  // P52 — recomendações contam história: para cada categoria, juntamos os
  // resultados reais que já vieram (outcomes), para mostrar "de onde veio
  // e o que já aconteceu" em vez de uma sugestão solta.
  const outcomesPorCategoria = new Map<string, string[]>()
  for (const o of estado.topOutcomes ?? []) {
    const cat = o.categoria ?? 'GERAL'
    const arr = outcomesPorCategoria.get(cat) ?? []
    arr.push(o.descricao)
    outcomesPorCategoria.set(cat, arr)
  }

  const MAX_POR_GRUPO = 5

const grupos = {
  URGENTE: decisoesFiltradas.filter((d) => d.prioridade >= 4).slice(0, MAX_POR_GRUPO),
  ALTA: decisoesFiltradas.filter((d) => d.prioridade === 3).slice(0, MAX_POR_GRUPO),
  MEDIA: decisoesFiltradas.filter((d) => d.prioridade === 2).slice(0, MAX_POR_GRUPO),
  BAIXA: decisoesFiltradas.filter((d) => d.prioridade <= 1).slice(0, MAX_POR_GRUPO),
}

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">O que merece sua atenção hoje</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Reuni aqui o que considero mais importante para sua empresa agora, com base em tudo que conhecemos do seu negócio.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {Object.entries(grupos).map(([nivel, lista]) => (
          <Card key={nivel}>
            <CardHeader className="p-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{NIVEL_LABEL[nivel] ?? nivel}</CardTitle>
                <Badge variant={COR_PRIORIDADE[nivel] as never}>{lista.length}</Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        {Object.entries(grupos).map(([nivel, lista]) =>
          lista.length > 0 ? (
            <div key={nivel} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{NIVEL_LABEL[nivel] ?? nivel} ({lista.length})</h3>
              {lista.map((d) => {
                const outcomesDaCategoria = outcomesPorCategoria.get(d.categoria) ?? []
                return (
                <Card key={d.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{d.titulo}</CardTitle>
                        <p className="text-sm text-muted-foreground">{d.descricao}</p>
                      </div>
                      <Badge variant={COR_PRIORIDADE[nivel] as never}>{NIVEL_LABEL[nivel] ?? nivel}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <BarraIndice value={d.prioridade * 20} label="Importância" />
                      <BarraIndice value={d.trustScore?.scoreAtual ?? 50} label="Nossa confiança" />
                      <BarraIndice value={d.relevancia} label="Atenção" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      A confiança mostra o quanto acreditamos nessa recomendação, com base no que você já nos contou.
                    </p>
                    <div className="rounded-lg border border-primary/15 bg-primary/5 px-3 py-2">
                      <p className="text-xs font-medium text-primary">Por que importa</p>
                      <p className="text-sm leading-relaxed">{d.motivo}</p>
                    </div>
                    {(d.evidenciasChave.length > 0 || outcomesDaCategoria.length > 0) && (
                      <div className="rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 space-y-1">
                        <p className="text-xs font-medium text-primary">O que percebemos</p>
                        {d.evidenciasChave.length > 0 && (
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Nasceu de: {d.evidenciasChave.join('; ')}.
                          </p>
                        )}
                        {outcomesDaCategoria.length > 0 && (
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            O que já veio disso: {outcomesDaCategoria[0]}
                          </p>
                        )}
                      </div>
                    )}
                    {(d.riscos.length > 0 || d.desconhecidos.length > 0) && (
                      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 space-y-1.5">
                        <p className="text-xs font-medium text-amber-700 dark:text-amber-400">O que pode acontecer</p>
                        {d.riscos.length > 0 && (
                          <ul className="space-y-0.5">
                            {d.riscos.map((r, i) => (
                              <li key={`r-${i}`} className="text-xs text-muted-foreground list-disc list-inside">Se não for cuidado: {r}</li>
                            ))}
                          </ul>
                        )}
                        {d.desconhecidos.length > 0 && (
                          <ul className="space-y-0.5">
                            {d.desconhecidos.map((u, i) => (
                              <li key={`u-${i}`} className="text-xs text-muted-foreground list-disc list-inside">Ainda não sabemos: {u}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="text-xs">Próximo passo: {TIPO_ACAO_LABEL[d.tipoAcao] ?? d.tipoAcao}</Badge>
                      <Badge variant="outline" className="text-xs">{DIFICULDADE_LABEL[d.dificuldade] ?? d.dificuldade}</Badge>
                    </div>
                  </CardContent>
                </Card>
                )
              })}
            </div>
          ) : null
        )}
        {decisoesFiltradas.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              Por enquanto, nada precisa de atenção imediata. Quando algo surgir, vou trazer aqui.
            </CardContent>
          </Card>
        )}
      </div>

      <div className="border-t border-border/60 pt-8">
        {/* P61 — Pensar antes de decidir: o próprio empresário registra a decisão */}
        <PensarAntesDeDecidir />
      </div>
    </div>
  )
}
