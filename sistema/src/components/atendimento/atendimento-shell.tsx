'use client'

import { useState, useCallback, useEffect } from 'react'
import { Search, UserCheck, Clock, TrendingUp, DollarSign, Plus, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/card'
import { AvatarRoot, AvatarFallback } from '@/components/ui/avatar'
import { cn, formatarMoeda } from '@/lib/utils'
import { AnelConfianca } from '@/components/cognitive/confidence-ring'

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
              {cliente.diasDesdeUltimo}d atrás
            </Badge>
          )}
        </div>
      )}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{cliente.totalVisitas} visita(s)</span>
        <span>{formatarMoeda(cliente.totalGasto)} total</span>
      </div>
    </button>
  )
}

function PanelServico({ cliente, onConfirmar }: { cliente: ClienteResumo; onConfirmar: (servico: string, valor: number) => void }) {
  const [servico, setServico] = useState(cliente.ultimoServico ?? '')
  const [valor, setValor] = useState(cliente.ultimoValor?.toString() ?? '')

  const SERVICOS_SUGERIDOS = [
    { nome: cliente.ultimoServico ?? 'Serviço padrão', valor: cliente.ultimoValor ?? 0 },
  ]

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Anotar atendimento — {cliente.nome}</p>
      <div className="flex gap-2">
        {SERVICOS_SUGERIDOS.filter(s => s.nome).map((s, i) => (
          <button
            key={i}
            onClick={() => { setServico(s.nome); setValor(s.valor.toString()) }}
            className="rounded-lg border px-3 py-1.5 text-xs hover:bg-accent transition-colors"
          >
            {s.nome} ({formatarMoeda(s.valor)})
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Serviço"
          value={servico}
          onChange={e => setServico(e.target.value)}
          className="text-sm"
        />
        <Input
          placeholder="Valor"
          value={valor}
          onChange={e => setValor(e.target.value)}
          className="text-sm"
          type="number"
        />
      </div>
      <button
        onClick={() => onConfirmar(servico, Number(valor))}
        disabled={!servico || !valor}
        className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        Guardar atendimento
      </button>
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
                  {resumo.variacao > 0 ? '+' : ''}{resumo.variacao}%
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
          <Badge variant="default" className="ml-auto text-[10px]">{eventos.length} evento(s)</Badge>
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

export function AtendimentoShell({ empresaId, caixaResumo, notifications: _notifications }: AtendimentoShellProps) {
  const [busca, setBusca] = useState('')
  const [resultados, setResultados] = useState<ClienteResumo[]>([])
  const [clienteSelecionado, setClienteSelecionado] = useState<ClienteResumo | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [eventosHoje, setEventosHoje] = useState<{ hora: string; descricao: string; valor?: number; tipo: string }[]>([])
  const [mostrandoPainel, setMostrandoPainel] = useState(false)

  useEffect(() => {
    if (!busca.trim()) {
      setResultados([])
      return
    }
    const timer = setTimeout(async () => {
      setCarregando(true)
      try {
        const res = await fetch(`/api/clientes?busca=${encodeURIComponent(busca)}&limite=8`)
        const data = await res.json()
        const clientes: ClienteResumo[] = (data.clientes ?? []).map((c: Record<string, unknown>) => ({
          id: c.id as string,
          nome: c.nome as string,
          telefone: (c.telefone as string) ?? null,
          ultimoServico: null,
          ultimoValor: null,
          diasDesdeUltimo: null,
          totalGasto: (c.valorMensal as number) ?? 0,
          totalVisitas: 0,
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
  }, [])

  const confirmarAtendimento = useCallback(async (servico: string, valor: number) => {
    if (!clienteSelecionado) return
    try {
      await fetch('/api/atendimentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresaId,
          clienteId: clienteSelecionado.id,
          servico,
          valor,
        }),
      })
    } catch {
      // Falha silenciosa — o atendimento ainda fica visível na sessão
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
    setMostrandoPainel(false)
    setClienteSelecionado(null)
  }, [clienteSelecionado, empresaId])

  const resetar = useCallback(() => {
    setClienteSelecionado(null)
    setMostrandoPainel(false)
    setBusca('')
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-8 space-y-6">
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

        {resultados.length === 0 && busca.trim() && !carregando && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <UserCheck className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Nenhum cliente encontrado para &ldquo;{busca}&rdquo;
            </p>
            <button
              onClick={() => {
                const nome = busca.trim()
                if (nome) window.location.href = `/clientes?novo=${encodeURIComponent(nome)}`
              }}
              className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Plus className="h-3 w-3" />
              Novo cliente
            </button>
          </div>
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
                <div className="flex items-center gap-2">
                  <AnelConfianca value={85} size="sm" />
                  <button onClick={resetar} className="text-xs text-muted-foreground hover:text-foreground">
                    Trocar
                  </button>
                </div>
              </div>
              <PanelServico cliente={clienteSelecionado} onConfirmar={confirmarAtendimento} />
            </CardContent>
          </Card>
        )}

        {!mostrandoPainel && !busca.trim() && (
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
