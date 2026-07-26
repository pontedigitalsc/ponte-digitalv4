'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { RefreshCw, AlertCircle, CheckCircle2, Circle, Layers, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/avatar'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/form-elements'
import { STATUS_IMPLANTACAO } from '@/constants'
import { formatarData, estaAtrasado, cn } from '@/lib/utils'
import type { Implantacao, StatusImplantacao } from '@/types'
import type { ImplantacoesExperience } from '@/engine'

function useImplantacoes() {
  const [implantacoes, setImplantacoes] = useState<Implantacao[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const carregar = useCallback(async (status?: string) => {
    setLoading(true); setError(null)
    try {
      const params = status && status !== 'TODAS' ? `?status=${status}` : ''
      const res = await fetch(`/api/implantacoes${params}`)
      if (!res.ok) throw new Error('Erro ao carregar')
      const json = await res.json()
      setImplantacoes(json.implantacoes ?? [])
    } catch { setError('Erro ao carregar implantações') }
    finally { setLoading(false) }
  }, [])

  const toggleEtapa = useCallback(async (etapaId: string) => {
    setImplantacoes((prev) => prev.map((impl) => ({
      ...impl,
      etapas: impl.etapas?.map((e) => e.id === etapaId ? { ...e, concluida: !e.concluida } : e),
    })))
    try {
      await fetch(`/api/implantacoes/etapas/${etapaId}`, { method: 'PATCH' })
      await carregar()
    } catch { await carregar() }
  }, [carregar])

  return { implantacoes, loading, error, carregar, toggleEtapa }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ImplantacaoCard({ impl, onToggleEtapa }: { impl: any; onToggleEtapa: (id: string) => void }) {
  const [expandido, setExpandido] = useState(false)
  const etapas = impl.etapas ?? []
  const concluidas = etapas.filter((e: { concluida: boolean }) => e.concluida).length
  const progresso = etapas.length > 0 ? Math.round((concluidas / etapas.length) * 100) : 0
  const st = STATUS_IMPLANTACAO[impl.status as StatusImplantacao]
  const atrasada = impl.dataPrevisao ? estaAtrasado(impl.dataPrevisao) : false

  return (
    <Card className={cn(atrasada && impl.status !== 'CONCLUIDA' && 'border-amber-400/50')}>
      <CardHeader className="p-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color: st.cor, backgroundColor: st.bg }}>{st.label}</span>
              {atrasada && impl.status !== 'CONCLUIDA' && <span className="text-[10px] font-semibold text-amber-600">Atrasada</span>}
            </div>
            <p className="text-sm font-semibold">{impl.titulo}</p>
            {impl.cliente && (
              <a href={`/clientes/${impl.cliente.id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mt-0.5">
                <ExternalLink className="h-3 w-3" />{impl.cliente.nome}
              </a>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p className="text-2xl font-bold">{progresso}%</p>
            <p className="text-[10px] text-muted-foreground">{concluidas}/{etapas.length} etapas</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className={cn('h-full rounded-full transition-all duration-500', progresso === 100 ? 'bg-emerald-500' : 'bg-primary')} style={{ width: `${progresso}%` }} />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          {impl.dataInicio && <span>Início: {formatarData(impl.dataInicio)}</span>}
          {impl.dataPrevisao && <span className={cn(atrasada && impl.status !== 'CONCLUIDA' && 'text-amber-600 font-medium')}>Previsão: {formatarData(impl.dataPrevisao)}</span>}
          {impl.dataConclusao && <span className="text-emerald-600">Concluída: {formatarData(impl.dataConclusao)}</span>}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <button onClick={() => setExpandido(!expandido)} className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-2">
          {expandido ? 'Ocultar checklist' : 'Ver checklist'}
        </button>
        {expandido && (
          <div className="space-y-1.5 mt-1">
            {etapas.map((etapa: { id: string; titulo: string; concluida: boolean }) => (
              <button key={etapa.id} onClick={() => onToggleEtapa(etapa.id)} className="flex items-center gap-2.5 w-full text-left group/etapa hover:bg-muted/40 rounded-md px-2 py-1.5 transition-colors">
                {etapa.concluida
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  : <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0 group-hover/etapa:text-muted-foreground" />}
                <span className={cn('text-sm', etapa.concluida ? 'line-through text-muted-foreground' : '')}>{etapa.titulo}</span>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

type Props = {
  experience: ImplantacoesExperience
}

export default function ImplantacoesContent({ experience }: Props) {
  const { implantacoes, loading, error, carregar, toggleEtapa } = useImplantacoes()
  const [statusFiltro, setStatusFiltro] = useState<StatusImplantacao | 'TODAS'>('TODAS')

  useEffect(() => { carregar(statusFiltro) }, [statusFiltro, carregar])

  const stats = useMemo(() => ({
    emAndamento: implantacoes.filter((i) => i.status === 'EM_ANDAMENTO').length,
    pendentes:   implantacoes.filter((i) => i.status === 'PENDENTE').length,
    concluidas:  implantacoes.filter((i) => i.status === 'CONCLUIDA').length,
    atrasadas:   implantacoes.filter((i) => i.dataPrevisao && estaAtrasado(i.dataPrevisao) && i.status !== 'CONCLUIDA').length,
  }), [implantacoes])

  return (
    <div className="space-y-5">

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Em andamento', valor: stats.emAndamento, cor: 'text-blue-600' },
          { label: 'Pendentes',    valor: stats.pendentes,   cor: 'text-muted-foreground' },
          { label: 'Concluídas',   valor: stats.concluidas,  cor: 'text-emerald-600' },
          { label: 'Atrasadas',    valor: stats.atrasadas,   cor: 'text-amber-600' },
        ].map((s) => (
          <Card key={s.label}><CardContent className="p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={cn('text-2xl font-bold mt-1', s.cor)}>{s.valor}</p>
          </CardContent></Card>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Select value={statusFiltro} onValueChange={(v) => setStatusFiltro(v as StatusImplantacao | 'TODAS')}>
          <SelectTrigger className="h-8 w-44 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="TODAS">Todas</SelectItem>
            {Object.entries(STATUS_IMPLANTACAO).map(([k, s]) => <SelectItem key={k} value={k}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <button onClick={() => carregar(statusFiltro)} disabled={loading} className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-accent transition-colors">
          <RefreshCw className={cn('h-3.5 w-3.5 text-muted-foreground', loading && 'animate-spin')} />
        </button>
      </div>

      {error && <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}

      {loading && implantacoes.length === 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}</div>
      )}

      {!loading && implantacoes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4 animate-fade-in">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent mb-4 ring-1 ring-primary/10">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">Ainda estamos iniciando sua jornada de implantações</p>
          <p className="text-xs text-muted-foreground mt-2 max-w-sm leading-relaxed">
            À medida que leads forem convertidos em clientes,
            a Ponte começará a gerenciar cada implantação automaticamente —
            identificando riscos, acompanhando prazos e sugerindo os próximos passos.
          </p>
        </div>
      )}

      {implantacoes.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {implantacoes.map((impl) => <ImplantacaoCard key={impl.id} impl={impl} onToggleEtapa={toggleEtapa} />)}
        </div>
      )}
    </div>
  )
}
