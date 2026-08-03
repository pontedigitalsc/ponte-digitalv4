'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Scale, Plus, ChevronDown, ChevronUp } from 'lucide-react'

interface FeedbackItem {
  id: string
  tipo: string
  comentario: string | null
}

interface DecisaoItem {
  id: string
  titulo: string
  descricao: string
  status: string
  categoria: string
  impactoEsperado: { resultadoEsperado?: string; riscos?: string | null; condicao?: string | null } | null
  resultado: { aconteceu?: string | null; aprendemos?: string | null } | null
  feedback: FeedbackItem | null
  criadaEm: string
}

const CATEGORIAS = [
  { valor: 'FINANCEIRO', rotulo: 'Financeiro' },
  { valor: 'CLIENTES', rotulo: 'Clientes' },
  { valor: 'OPERACAO', rotulo: 'Operação' },
  { valor: 'GESTAO', rotulo: 'Gestão' },
  { valor: 'PESSOAS', rotulo: 'Pessoas' },
  { valor: 'PRODUTO', rotulo: 'Produto' },
  { valor: 'ESTRATEGIA', rotulo: 'Estratégia' },
]

const STATUS_LABEL: Record<string, string> = {
  PENDENTE: 'Pensando',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Decidida',
  ABANDONADA: 'Não foi adiante',
}

const AJUDOU_LABEL: Record<string, string> = {
  AJUDOU: 'Ajudou de verdade',
  AJUDOU_PARCIALMENTE: 'Ajudou em parte',
  NAO_AJUDOU: 'Não ajudou',
  NAO_EXECUTADA: 'Não chegou a ser executada',
}

export function PensarAntesDeDecidir() {
  const router = useRouter()
  const [decisoes, setDecisoes] = useState<DecisaoItem[]>([])
  const [carregando, setCarregando] = useState(true)

  const [titulo, setTitulo] = useState('')
  const [porQue, setPorQue] = useState('')
  const [resultadoEsperado, setResultadoEsperado] = useState('')
  const [riscos, setRiscos] = useState('')
  const [condicao, setCondicao] = useState('')
  const [categoria, setCategoria] = useState('GESTAO')
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const [aberta, setAberta] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    try {
      const res = await fetch('/api/centro-decisao/decisoes', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setDecisoes(data.decisoes ?? [])
      }
    } catch {
      // silencioso: a lista começa vazia
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => { carregar() }, [carregar])

  const limparForm = () => {
    setTitulo(''); setPorQue(''); setResultadoEsperado(''); setRiscos(''); setCondicao(''); setCategoria('GESTAO')
  }

  const registrar = async () => {
    setSalvando(true); setErro(null); setMensagem(null)
    try {
      const res = await fetch('/api/centro-decisao/decisoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, porQue, resultadoEsperado, riscos, condicao, categoria }),
      })
      if (!res.ok) throw new Error()
      setMensagem('Decisão registrada. Ela agora faz parte da memória da sua empresa.')
      limparForm()
      carregar()
      router.refresh()
    } catch {
      setErro('Não consegui registrar agora. Tente de novo.')
    } finally {
      setSalvando(false)
    }
  }

  const atualizar = async (id: string, dados: Record<string, unknown>) => {
    try {
      const res = await fetch(`/api/centro-decisao/decisoes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })
      if (!res.ok) throw new Error()
      setAberta(null)
      carregar()
      router.refresh()
    } catch {
      setErro('Não consegui atualizar a decisão.')
    }
  }

  const inputCls = 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground/50'

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ─── Pensar antes de decidir ──────────────────────────────────── */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="h-4 w-4 text-primary" />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            Pensar antes de decidir
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Uma decisão importante não se decide na pressa. Responda as cinco perguntas abaixo —
          o que você escrever aqui fica guardado na memória da sua empresa, com o que aconteceu depois.
        </p>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">O que você pretende fazer?</label>
            <input className={inputCls} value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex.: contratar a primeira pessoa para a operação" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Por quê?</label>
            <textarea className={`${inputCls} min-h-[70px]`} value={porQue} onChange={(e) => setPorQue(e.target.value)} placeholder="O que te levou a pensar nisso agora?" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Qual resultado você espera?</label>
            <input className={inputCls} value={resultadoEsperado} onChange={(e) => setResultadoEsperado(e.target.value)} placeholder="O que precisa acontecer para valer a pena?" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Quais riscos existem?</label>
              <textarea className={`${inputCls} min-h-[60px]`} value={riscos} onChange={(e) => setRiscos(e.target.value)} placeholder="O que pode dar errado?" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">O que precisaria acontecer para funcionar?</label>
              <textarea className={`${inputCls} min-h-[60px]`} value={condicao} onChange={(e) => setCondicao(e.target.value)} placeholder="Que condição precisa ser verdade para a decisão funcionar?" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Área da empresa</label>
            <select className={inputCls} value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {CATEGORIAS.map((c) => (
                <option key={c.valor} value={c.valor}>{c.rotulo}</option>
              ))}
            </select>
          </div>
        </div>

        {mensagem && <p className="text-xs text-emerald-600 dark:text-emerald-400">{mensagem}</p>}
        {erro && <p className="text-xs text-red-600 dark:text-red-400">{erro}</p>}

        <button
          onClick={registrar}
          disabled={salvando || !titulo.trim() || !porQue.trim() || !resultadoEsperado.trim()}
          className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {salvando ? 'Guardando...' : 'Guardar essa decisão'}
        </button>
      </div>

      {/* ─── Decisões registradas ─────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Decisões que registrei</h3>
        </div>

        {carregando ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : decisoes.length === 0 ? (
          <p className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-5 text-sm text-muted-foreground text-center">
            Nenhuma decisão registrada ainda. Quando uma decisão importante aparecer, comece por aqui.
          </p>
        ) : (
          <div className="space-y-3">
            {decisoes.map((d) => {
              const abertaAtual = aberta === d.id
              const impacto = d.impactoEsperado
              return (
                <div key={d.id} className="rounded-xl border bg-card p-5 space-y-2">
                  <button
                    onClick={() => setAberta(abertaAtual ? null : d.id)}
                    className="flex w-full items-start justify-between gap-3 text-left"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-snug">{d.titulo}</p>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {CATEGORIAS.find((c) => c.valor === d.categoria)?.rotulo ?? d.categoria}
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {STATUS_LABEL[d.status] ?? d.status}
                      </span>
                      {abertaAtual ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </span>
                  </button>

                  <p className="text-xs text-muted-foreground leading-relaxed">{d.descricao}</p>

                  {impacto?.resultadoEsperado && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Resultado esperado:</span> {impacto.resultadoEsperado}
                    </p>
                  )}

                  {abertaAtual && (
                    <DecisaoForm item={d} aoAtualizar={(dados) => atualizar(d.id, dados)} inputCls={inputCls} />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function DecisaoForm({ item, aoAtualizar, inputCls }: { item: DecisaoItem; aoAtualizar: (dados: Record<string, unknown>) => void; inputCls: string }) {
  const [status, setStatus] = useState(item.status)
  const [aconteceu, setAconteceu] = useState('')
  const [aprendemos, setAprendemos] = useState('')
  const [ajudou, setAjudou] = useState<string | null>(null)

  return (
    <div className="rounded-lg bg-muted/30 p-4 space-y-3 border-t pt-4">
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">O que decidiu no final?</label>
        <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value)}>
          {Object.entries(STATUS_LABEL).map(([v, r]) => (
            <option key={v} value={v}>{r}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">O que aconteceu?</label>
        <textarea className={`${inputCls} min-h-[60px]`} value={aconteceu} onChange={(e) => setAconteceu(e.target.value)} placeholder="O resultado real, não o que você esperava" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">O que vocês aprenderam com isso?</label>
        <textarea className={`${inputCls} min-h-[60px]`} value={aprendemos} onChange={(e) => setAprendemos(e.target.value)} placeholder="O que fica guardado para as próximas decisões" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Essa decisão ajudou?</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(AJUDOU_LABEL).map(([v, r]) => (
            <button
              key={v}
              onClick={() => setAjudou(v)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${ajudou === v ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => aoAtualizar({ status, aconteceu, aprendemos, ajudou })}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Guardar o que aconteceu
      </button>
    </div>
  )
}
