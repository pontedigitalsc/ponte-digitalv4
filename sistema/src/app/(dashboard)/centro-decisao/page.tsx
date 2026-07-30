import { requireUser } from '@/lib/auth'
import { gerarDecisoes, classificarDecisoesPorPrioridade, enriquecerDecisoesComTrust, filtrarDecisoesPorRelevancia, obterEstadoCognitivoCompleto } from '@/engine'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/card'

const COR_PRIORIDADE: Record<string, string> = {
  URGENTE: 'destructive',
  ALTA: 'warning',
  MEDIA: 'info',
  BAIXA: 'secondary',
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
        <h2 className="text-xl font-semibold tracking-tight">Centro de Decisão</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Decisões recomendadas para sua empresa com base no que conhecemos do seu negócio.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {Object.entries(grupos).map(([nivel, lista]) => (
          <Card key={nivel}>
            <CardHeader className="p-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{nivel}</CardTitle>
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
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{nivel} ({lista.length})</h3>
              {lista.map((d) => (
                <Card key={d.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{d.titulo}</CardTitle>
                        <p className="text-sm text-muted-foreground">{d.descricao}</p>
                      </div>
                      <Badge variant={COR_PRIORIDADE[nivel] as never}>{nivel}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Categoria: {d.categoria}</span>
                      <span>Tipo: {d.tipoAcao}</span>
                      <span>Impacto: {d.impacto}</span>
                      <span>Urgência: {d.urgencia}</span>
                      <span>Dificuldade: {d.dificuldade}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <BarraIndice value={d.prioridade * 20} label="Prioridade" />
                      <BarraIndice value={d.trustScore?.scoreAtual ?? 50} label="Confiança" />
                      <BarraIndice value={d.relevancia} label="Relevância" />
                    </div>
                    <p className="text-sm text-muted-foreground">{d.motivo}</p>
                    {d.evidenciasChave.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {d.evidenciasChave.map((ev, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{ev}</Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null
        )}
        {decisoesFiltradas.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              Nenhuma decisão recomendada no momento. Continue usando a Ponte Digital para receber novas recomendações.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
