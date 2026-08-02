'use client'

import { useState, useCallback, useEffect } from 'react'
import { Search, UserCheck, Clock, TrendingUp, DollarSign, Plus, ChevronRight, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/card'
import { AvatarRoot, AvatarFallback } from '@/components/ui/avatar'
import { cn, formatarMoeda } from '@/lib/utils'
import { MICROCOPY } from '@/constants'

interface ClienteResumo {
  id: string
  nome: string
  telefone: string | null
  ultimoServico: string | null
  ultimoValor: number | null
  diasDesdeUltimo: number | null
  totalGasto: number
  totalVisitas: number
}

interface CaixaResumo {
  faturamentoHoje: number
  recebidoHoje: number
  aReceber: number
  ticketMedio: number
  clientesHoje: number
  variacao: number
}

interface AtendimentoShellProps {
  empresaId: string
  caixaResumo: CaixaResumo
  notifications: unknown[]
}

function getIniciais(nome: string): string {
  return nome.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

function ClienteCard({ cliente, onSelect }: { cliente: ClienteResumo; onSelect: (c: ClienteResumo) => void }) {
  return (
    <button
      onClick={() => onSelect(cliente)}
      className="w-full text-left rounded-lg border p-3 hover:bg-accent transition-colors space-y-2"
    >
      <div className="flex items-center gap-3">
        <AvatarRoot className="h-8 w-8">
          <AvatarFallback>{getIniciais(cliente.nome)}</AvatarFallback>
        </AvatarRoot>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{cliente.nome}</p>
          <p className="text-xs text-muted-foreground truncate">{cliente.telefone ?? 'Sem telefone'}</p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>
      {cliente.ultimoServico && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{cliente.ultimoServico}</span>
          {cliente.ultimoValor != null && <span>• {formatarMoeda(cliente.ultimoValor)}</span>}
          {cliente.diasDesdeUltimo != null && (
            <Badge variant="outline" className="text-[10px]">
              {cliente.diasDesdeUltimo === 0 ? 'hoje' : `${cliente.diasDesdeUltimo}d atrás`}
            </Badge>
          )}
        </div>
      )}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{cliente.totalVisitas} atendimento(s)</span>
        <span>{formatarMoeda(cliente.totalGasto)} no total</span>
      </div>
    </button>
  )
}

function PanelServico({ cliente, onConfirmar }: { cliente: ClienteResumo; onConfirmar: (servico: string, valor: number, recebido: boolean) => void }) {
  const [servico, setServico] = useState(cliente.ultimoServico ?? '')
  const [valor, setValor] = useState(cliente.ultimoValor?.toString() ?? '')

  const valorValido = Number(valor) > 0
  const pronto = servico.trim() && valorValido

  const repetirUltimo = cliente.ultimoServico && cliente.ultimoValor != null

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Anotar atendimento — {cliente.nome}</p>
      {repetirUltimo && (
        <button
          onClick={() => { setServico(cliente.ultimoServico!); setValor(String(cliente.ultimoValor)) }}
          className="rounded-lg border px-3 py-1.5 text-xs hover:bg-accent transition-colors"
        >
          Repetir o último: {cliente.ultimoServico} ({formatarMoeda(cliente.ultimoValor!)})
        </button>
      )}
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Serviço"
          value={servico}
          onChange={e => setServico(e.target.value)}
          className="text-sm"
          autoFocus={!cliente.ultimoServico}
        />
        <Input
          placeholder="Valor"
          value={valor}
          onChange={e => setValor(e.target.value)}
          className="text-sm"
          type="number"
          inputMode="decimal"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onConfirmar(servico, Number(valor), true)}
          disabled={!pronto}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          <span className="flex items-center justify-center gap-1.5">
            <Check className="h-4 w-4" /> Já recebi
          </span>
        </button>
        <button
          onClick={() => onConfirmar(servico, Number(valor), false)}
          disabled={!pronto}
          className="w-full rounded-lg border border-primary/40 px-4 py-2 text-sm font-medium text-primary hover:bg-accent disabled:opacity-50 transition-colors"
        >
          <span className="flex items-center justify-center gap-1.5">
            <Clock className="h-4 w-4" /> Ficou a receber
          </span>
        </button>
      </div>
      <p className="text-[11px] text-muted-foreground">
        {cliente.ultimoServico
          ? 'Deixei o último atendimento preenchido para você. Ajuste se precisar e guarde com um toque.'
          : 'Primeiro atendimento com este cliente. Basta anotar o serviço e o valor.'}
      </p>
    </div>
  )
}

function CaixaDia({ resumo }: { resumo: CaixaResumo }) {
  const vazio = resumo.faturamentoHoje === 0 && resumo.recebidoHoje === 0 && resumo.clientesHoje === 0
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          Caixa do dia
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {vazio ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            Nenhum movimento hoje. Os valores aparecerão após o primeiro atendimento.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/10 p-2">
                <p className="text-[10px] text-muted-foreground">Faturamento</p>
                <p className="text-sm font-semibold text-emerald-600">{formatarMoeda(resumo.faturamentoHoje)}</p>
              </div>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/10 p-2">
                <p className="text-[10px] text-muted-foreground">Recebido</p>
                <p className="text-sm font-semibold text-blue-600">{formatarMoeda(resumo.recebidoHoje)}</p>
              </div>
              <div className="rounded-lg bg-amber-50 dark:bg-amber-950/10 p-2">
                <p className="text-[10px] text-muted-foreground">A receber</p>
                <p className="text-sm font-semibold text-amber-600">{formatarMoeda(resumo.aReceber)}</p>
              </div>
              <div className="rounded-lg bg-purple-50 dark:bg-purple-950/10 p-2">
                <p className="text-[10px] text-muted-foreground">Ticket médio</p>
                <p className="text-sm font-semibold text-purple-600">{formatarMoeda(resumo.ticketMedio)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{resumo.clientesHoje} cliente(s) hoje</span>
              {resumo.variacao !== 0 && (
                <span className={cn('flex items-center gap-1', resumo.variacao > 0 ? 'text-emerald-500' : 'text-red-500')}>
                  <TrendingUp className="h-3 w-3" />
                  {resumo.variacao > 0 ? '+' : ''}{resumo.variacao}% vs ontem
                </span>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

function TimelineMini({ eventos }: { eventos: { hora: string; descricao: string; valor?: number; tipo: string }[] }) {
  if (eventos.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground text-center py-4">Nenhum atendimento hoje</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          Hoje
          <Badge variant="default" className="ml-auto text-[10px]">{eventos.length} atendimento(s)</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {eventos.map((ev, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
              {i < eventos.length - 1 && <div className="w-px flex-1 bg-border" />}
            </div>
            <div className="flex-1 pb-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">{ev.descricao}</p>
                {ev.valor != null && <span className="text-xs font-semibold">{formatarMoeda(ev.valor)}</span>}
              </div>
              <p className="text-[10px] text-muted-foreground">{ev.hora}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function AtendimentoShell({ empresaId, caixaResumo: caixaInicial, notifications: _notifications }: AtendimentoShellProps) {
  const [busca, setBusca] = useState('')
  const [resultados, setResultados] = useState<ClienteResumo[]>([])
  const [clienteSelecionado, setClienteSelecionado] = useState<ClienteResumo | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [eventosHoje, setEventosHoje] = useState<{ hora: string; descricao: string; valor?: number; tipo: string }[]>([])
  const [mostrandoPainel, setMostrandoPainel] = useState(false)
  const [caixaResumo, setCaixaResumo] = useState<CaixaResumo>(caixaInicial)
  const [criandoCliente, setCriandoCliente] = useState(false)
  const [nomeNovoCliente, setNomeNovoCliente] = useState('')
  const [salvandoNovoCliente, setSalvandoNovoCliente] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const carregarCaixa = useCallback(async () => {
    try {
      const res = await fetch('/api/atendimentos?resumo=true')
      const data = await res.json()
      setCaixaResumo(data)
    } catch { /* mantém o resumo atual em caso de falha */ }
  }, [])

  useEffect(() => {
    if (!busca.trim()) {
      setResultados([])
      return
    }
    const timer = setTimeout(async () => {
      setCarregando(true)
      try {
        const res = await fetch(`/api/clientes?busca=${encodeURIComponent(busca)}&limite=8&paraAtendimento=true`)
        const data = await res.json()
        const clientes: ClienteResumo[] = (data.clientes ?? []).map((c: Record<string, unknown>) => ({
          id: c.id as string,
          nome: c.nome as string,
          telefone: (c.telefone as string) ?? null,
          ultimoServico: (c.ultimoServico as string) ?? null,
          ultimoValor: (c.ultimoValor as number) ?? null,
          diasDesdeUltimo: (c.diasDesdeUltimo as number) ?? null,
          totalGasto: (c.totalGasto as number) ?? 0,
          totalVisitas: (c.totalVisitas as number) ?? 0,
        }))
        setResultados(clientes)
      } catch {
        setResultados([])
      }
      setCarregando(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [busca])

  const selecionarCliente = useCallback((cliente: ClienteResumo) => {
    setClienteSelecionado(cliente)
    setMostrandoPainel(true)
    setBusca('')
    setResultados([])
    setFeedback(null)
  }, [])

  const confirmarAtendimento = useCallback(async (servico: string, valor: number, recebido: boolean) => {
    if (!clienteSelecionado) return
    try {
      const res = await fetch('/api/atendimentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresaId,
          clienteId: clienteSelecionado.id,
          servico,
          valor,
          recebido,
        }),
      })
      if (!res.ok) {
        setFeedback('Não consegui guardar isso agora. Vamos tentar novamente.')
        return
      }
      setFeedback(recebido
        ? `Guardei. O valor já entrou no caixa de hoje.`
        : `Guardei. Ficou ${formatarMoeda(valor)} a receber de ${clienteSelecionado.nome}.`)
    } catch {
      setFeedback('Não consegui guardar isso agora. Vamos tentar novamente.')
      return
    }
    setEventosHoje(prev => [
      ...prev,
      {
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        descricao: `${servico} — ${clienteSelecionado.nome}`,
        valor,
        tipo: 'atendimento',
      },
    ])
    await carregarCaixa()
    setMostrandoPainel(false)
    setClienteSelecionado(null)
  }, [clienteSelecionado, empresaId, carregarCaixa])

  const criarClienteRapido = useCallback(async () => {
    if (!nomeNovoCliente.trim()) return
    setSalvandoNovoCliente(true)
    try {
      const res = await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeNovoCliente.trim() }),
      })
      const data = await res.json()
      if (!res.ok || !data?.data) {
        setFeedback('Não consegui guardar o cliente. Vamos tentar novamente.')
        return
      }
      const novo: ClienteResumo = {
        id: data.data.id,
        nome: data.data.nome,
        telefone: data.data.telefone ?? null,
        ultimoServico: null,
        ultimoValor: null,
        diasDesdeUltimo: null,
        totalGasto: 0,
        totalVisitas: 0,
      }
      setCriandoCliente(false)
      setNomeNovoCliente('')
      setBusca('')
      selecionarCliente(novo)
    } catch {
      setFeedback('Não consegui guardar o cliente. Vamos tentar novamente.')
    } finally {
      setSalvandoNovoCliente(false)
    }
  }, [nomeNovoCliente, selecionarCliente])

  const resetar = useCallback(() => {
    setClienteSelecionado(null)
    setMostrandoPainel(false)
    setBusca('')
    setFeedback(null)
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-6">
        {feedback && (
          <div className="flex items-start justify-between gap-2 rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/10 dark:border-emerald-900 px-4 py-3">
            <p className="text-sm text-emerald-700 dark:text-emerald-400">{feedback}</p>
            <button onClick={() => setFeedback(null)} className="text-emerald-600 hover:text-emerald-800">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cliente por nome, telefone ou e-mail..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="pl-9 h-12 text-base"
            autoFocus
          />
          {carregando && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
            </div>
          )}
        </div>

        {resultados.length > 0 && !clienteSelecionado && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              {resultados.length} cliente(s) encontrado(s) para &ldquo;{busca}&rdquo;
            </p>
            <div className="grid gap-2">
              {resultados.map(cliente => (
                <ClienteCard key={cliente.id} cliente={cliente} onSelect={selecionarCliente} />
              ))}
            </div>
          </div>
        )}

        {resultados.length === 0 && busca.trim() && !carregando && !criandoCliente && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <UserCheck className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {MICROCOPY.buscaClienteVazia} &ldquo;{busca}&rdquo; — mas podemos anotá-lo agora.
            </p>
            <button
              onClick={() => { setCriandoCliente(true); setNomeNovoCliente(busca.trim()) }}
              className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Plus className="h-3 w-3" />
              Adicionar este cliente agora
            </button>
          </div>
        )}

        {criandoCliente && (
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="text-sm font-medium">Novo cliente — só o nome, o resto a gente completa depois</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Nome do cliente"
                  value={nomeNovoCliente}
                  onChange={e => setNomeNovoCliente(e.target.value)}
                  className="text-sm"
                  autoFocus
                />
                <button
                  onClick={criarClienteRapido}
                  disabled={!nomeNovoCliente.trim() || salvandoNovoCliente}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {salvandoNovoCliente ? 'Guardando...' : 'Guardar e atender'}
                </button>
              </div>
              <button
                onClick={() => { setCriandoCliente(false); setNomeNovoCliente('') }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </button>
            </CardContent>
          </Card>
        )}

        {mostrandoPainel && clienteSelecionado && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AvatarRoot className="h-10 w-10">
                    <AvatarFallback>{getIniciais(clienteSelecionado.nome)}</AvatarFallback>
                  </AvatarRoot>
                  <div>
                    <p className="font-medium">{clienteSelecionado.nome}</p>
                    <p className="text-xs text-muted-foreground">{clienteSelecionado.telefone ?? ''}</p>
                  </div>
                </div>
                <button onClick={resetar} className="text-xs text-muted-foreground hover:text-foreground">
                  Trocar
                </button>
              </div>
              <PanelServico cliente={clienteSelecionado} onConfirmar={confirmarAtendimento} />
            </CardContent>
          </Card>
        )}

        {!mostrandoPainel && !busca.trim() && !criandoCliente && (
          <div className="text-center py-16 space-y-3">
            <UserCheck className="h-12 w-12 mx-auto text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              Busque um cliente para iniciar o atendimento
            </p>
            <p className="text-xs text-muted-foreground/60">
              Digite nome, telefone ou e-mail — o reconhecimento é automático
            </p>
          </div>
        )}
      </div>

      <div className="lg:col-span-4 space-y-4">
        <CaixaDia resumo={caixaResumo} />
        <TimelineMini eventos={eventosHoje} />
      </div>
    </div>
  )
}
