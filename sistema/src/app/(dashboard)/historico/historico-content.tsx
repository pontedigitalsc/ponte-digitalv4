'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, Plus, RefreshCw, Trash2, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/avatar'
import { Avatar } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/form-elements'
import { Label, Textarea } from '@/components/ui/form-elements'
import { useConfirm } from '@/hooks/use-confirm'
import { apiFetch, mensagemDeErro } from '@/lib/api-client'
import { formatarDataHora, cn } from '@/lib/utils'
import type { Historico, TipoHistorico } from '@/types'
import type { HistoricoExperience } from '@/engine'

const TIPO_CONFIG: Record<string, { label: string; cor: string; bg: string }> = {
  NOTA:     { label: 'Nota',     cor: '#6B7280', bg: '#F3F4F6' },
  LIGACAO:  { label: 'Ligação',  cor: '#2563EB', bg: '#EFF6FF' },
  EMAIL:    { label: 'E-mail',   cor: '#7C3AED', bg: '#F5F3FF' },
  REUNIAO:  { label: 'Reunião',  cor: '#D97706', bg: '#FFFBEB' },
  WHATSAPP: { label: 'WhatsApp', cor: '#059669', bg: '#ECFDF5' },
  PROPOSTA: { label: 'Proposta', cor: '#DC2626', bg: '#FEF2F2' },
  CONTRATO: { label: 'Contrato', cor: '#059669', bg: '#ECFDF5' },
  SISTEMA:  { label: 'Ponte',  cor: '#9CA3AF', bg: '#F9FAFB' },
}

const TIPOS_MANUAIS = ['NOTA', 'LIGACAO', 'EMAIL', 'REUNIAO', 'WHATSAPP', 'PROPOSTA', 'CONTRATO']

type Props = {
  experience: HistoricoExperience
}

export default function HistoricoContent({ experience }: Props) {
  const { confirmar, ConfirmDialog } = useConfirm()
  const [historicos, setHistoricos]   = useState<Historico[]>([])
  const [total, setTotal]             = useState(0)
  const [totalPages, setTotalPages]   = useState(1)
  const [page, setPage]               = useState(1)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const [busca, setBusca]             = useState('')
  const [tipoFiltro, setTipoFiltro]   = useState<TipoHistorico | 'TODOS'>('TODOS')
  const [modalOpen, setModalOpen]     = useState(false)
  const [salvando, setSalvando]       = useState(false)
  const [novoTipo, setNovoTipo]       = useState<TipoHistorico>('NOTA')
  const [novoTitulo, setNovoTitulo]   = useState('')
  const [novaDescricao, setNovaDescricao] = useState('')

  const carregar = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const params = new URLSearchParams()
      if (tipoFiltro !== 'TODOS') params.set('tipo', tipoFiltro)
      if (busca) params.set('busca', busca)
      params.set('page', String(page))
      const res = await fetch(`/api/historicos?${params}`)
      if (!res.ok) throw new Error('Não consegui carregar a caminhada')
      const json = await res.json()
      setHistoricos(json.historicos ?? [])
      setTotal(json.total ?? 0)
      setTotalPages(json.totalPages ?? 1)
    } catch { setError('Não consegui carregar a caminhada') }
    finally { setLoading(false) }
  }, [tipoFiltro, busca, page])

  useEffect(() => { carregar() }, [carregar])

  useEffect(() => {
    const t = setTimeout(() => { setPage(1) }, 350)
    return () => clearTimeout(t)
  }, [busca])

  const handleSalvar = async () => {
    if (!novoTitulo.trim()) return
    setSalvando(true)
    try {
      const res = await fetch('/api/historicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: novoTipo, titulo: novoTitulo, descricao: novaDescricao }),
      })
      if (!res.ok) throw new Error('Não consegui guardar isso')
      setModalOpen(false)
      setNovoTitulo(''); setNovaDescricao(''); setNovoTipo('NOTA')
      await carregar()
    } catch { setError('Não consegui guardar isso. Vamos tentar novamente.') }
    finally { setSalvando(false) }
  }

  const handleExcluir = async (id: string) => {
    const ok = await confirmar({
      titulo: 'Excluir este registro?',
      descricao: 'Esta ação não pode ser desfeita — o registro será removido permanentemente.',
      textoConfirmar: 'Excluir',
      variante: 'destrutiva',
    })
    if (!ok) return

    setHistoricos((prev) => prev.filter((h) => h.id !== id))
    try {
      await apiFetch(`/api/historicos/${id}`, { method: 'DELETE' })
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui remover isso. Vamos tentar novamente.'))
    }
    await carregar()
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />Anotar algo
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Buscar na nossa caminhada..." value={busca} onChange={(e) => setBusca(e.target.value)} className="pl-8 h-8 text-xs" />
        </div>
        <Select value={tipoFiltro} onValueChange={(v) => { setTipoFiltro(v as TipoHistorico | 'TODOS'); setPage(1) }}>
          <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Tudo</SelectItem>
            {Object.entries(TIPO_CONFIG).map(([k, t]) => <SelectItem key={k} value={k}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <button onClick={carregar} disabled={loading} className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-accent transition-colors">
          <RefreshCw className={cn('h-3.5 w-3.5 text-muted-foreground', loading && 'animate-spin')} />
        </button>
          {total > 0 && <span className="text-xs text-muted-foreground ml-auto"><strong className="text-foreground">{total}</strong> anotações</span>}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />{error}
        </div>
      )}

      {loading && historicos.length === 0 ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-5 w-5 rounded-full shrink-0 mt-1" />
              <div className="flex-1 space-y-1.5"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-56" /></div>
            </div>
          ))}
        </div>
      ) : historicos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4 animate-fade-in">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent mb-4 ring-1 ring-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-semibold text-foreground">Ainda não temos o que mostrar aqui</p>
          <p className="text-xs text-muted-foreground mt-2 max-w-sm leading-relaxed">
            Conforme você usar a Ponte Digital, cada interação,
            descoberta e decisão será guardada automaticamente,
            construindo uma memória viva da evolução da sua empresa.
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-[9px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-0">
            {historicos.map((h) => {
              const tipo   = TIPO_CONFIG[h.tipo] ?? TIPO_CONFIG.SISTEMA
              const manual = h.tipo !== 'SISTEMA'
              return (
                <div key={h.id} className="flex gap-4 pb-5 relative group">
                  <div className="shrink-0 h-[18px] w-[18px] rounded-full border-2 border-background z-10 mt-1" style={{ backgroundColor: tipo.cor }} />
                  <div className="flex-1 min-w-0 rounded-xl border bg-card p-3.5 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color: tipo.cor, backgroundColor: tipo.bg }}>{tipo.label}</span>
                          {h.cliente && <a href={`/clientes/${h.cliente.id}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">{(h.cliente as { nome: string }).nome}</a>}
                        </div>
                        <p className="text-sm font-medium">{h.titulo}</p>
                        {h.descricao && <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{h.descricao}</p>}
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{formatarDataHora(h.criadoEm)}</span>
                        {manual && (
                          <button onClick={() => handleExcluir(h.id)} className="opacity-0 group-hover:opacity-100 flex h-6 w-6 items-center justify-center rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    {h.usuario && (
                      <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t">
                        <Avatar src={(h.usuario as { avatar?: string }).avatar} nome={(h.usuario as { nome: string }).nome} size="sm" />
                        <span className="text-xs text-muted-foreground">{(h.usuario as { nome: string }).nome}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">Página {page} de {totalPages}</p>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page === 1 || loading}>Anterior</Button>
                <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages || loading}>Próxima</Button>
              </div>
            </div>
          )}
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={(v) => !v && setModalOpen(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Anotar atividade</DialogTitle>
            <DialogDescription>Conte uma interação, nota ou o que aconteceu.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select value={novoTipo} onValueChange={(v) => setNovoTipo(v as TipoHistorico)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TIPOS_MANUAIS.map((t) => <SelectItem key={t} value={t}>{TIPO_CONFIG[t].label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ht">Título <span className="text-destructive">*</span></Label>
              <Input id="ht" placeholder="Ex: Ligação de follow-up realizada" value={novoTitulo} onChange={(e) => setNovoTitulo(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hd">Descrição</Label>
              <Textarea id="hd" placeholder="Detalhes sobre a atividade..." rows={3} value={novaDescricao} onChange={(e) => setNovaDescricao(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="outline" onClick={() => setModalOpen(false)} disabled={salvando}>Cancelar</Button>
              <Button onClick={handleSalvar} disabled={salvando || !novoTitulo.trim()}>{salvando ? 'Guardando...' : 'Guardar'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {ConfirmDialog}
    </div>
  )
}
