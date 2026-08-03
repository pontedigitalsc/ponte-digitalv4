'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type {
  PainelFundador,
  PerguntaAbertaItem,
  RespostaAbertaItem,
} from '@/engine/pergunta-aberta-service'
import type { GrandePergunta } from '@/engine/adaptive-question-engine'
import type { MetricasTransformacao } from '@/engine/operacao-founder'
import type { MaturidadeColetiva, PadraoColetivo, ConhecimentoCandidato } from '@/engine/inteligencia-coletiva'

interface PainelProps {
  painel: PainelFundador | null
  perguntas: PerguntaAbertaItem[]
  biblioteca: GrandePergunta[]
  metricas: MetricasTransformacao | null
  maturidadeColetiva: MaturidadeColetiva | null
  padroesColetivos: PadraoColetivo[]
  candidatos: ConhecimentoCandidato[]
}

function formatarData(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export function PainelDoFundador({ painel, perguntas, biblioteca, metricas, maturidadeColetiva, padroesColetivos, candidatos }: PainelProps) {
  const router = useRouter()
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  // Form de nova pergunta
  const [pergunta, setPergunta] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [capacidade, setCapacidade] = useState('')
  const [beneficio, setBeneficio] = useState('')
  const [segmentos, setSegmentos] = useState('')
  const [salvando, setSalvando] = useState(false)

  // Form de promoção
  const [promovendoId, setPromovendoId] = useState<string | null>(null)
  const [tituloDesc, setTituloDesc] = useState('')
  const [descricaoDesc, setDescricaoDesc] = useState('')

  const notificar = (msg: string, err?: boolean) => {
    if (err) { setErro(msg); setMensagem(null) } else { setMensagem(msg); setErro(null) }
  }

  const acao = async (url: string, body: unknown) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error('Falha na ação')
  }

  const criarNova = async (dados: { pergunta: string; objetivo: string; capacidade?: string; beneficio?: string; segmentosRecomendados?: string[] }) => {
    setSalvando(true)
    setErro(null)
    try {
      await acao('/api/painel-do-fundador', dados)
      setPergunta(''); setObjetivo(''); setCapacidade(''); setBeneficio(''); setSegmentos('')
      notificar('Pergunta Aberta criada. Apenas ela está ativa agora.')
      router.refresh()
    } catch {
      notificar('Não consegui criar agora.', true)
    } finally {
      setSalvando(false)
    }
  }

  const usarTemplate = (g: GrandePergunta) => {
    setPergunta(g.pergunta)
    setObjetivo(g.objetivo)
    setCapacidade(g.capacidade)
    setBeneficio(g.beneficio)
    setSegmentos(g.segmentos.join(', '))
  }

  const revisar = async (perguntaId: string, continuar: boolean) => {
    try {
      await acao('/api/painel-do-fundador/revisar', { perguntaId, continuar })
      notificar(continuar ? 'Pergunta mantida para a próxima revisão.' : 'Pergunta desativada. Crie a próxima quando quiser.')
      router.refresh()
    } catch {
      notificar('Não consegui revisar agora.', true)
    }
  }

  const promover = async (perguntaId: string) => {
    if (!tituloDesc.trim() || !descricaoDesc.trim()) {
      notificar('Dê título e descrição à descoberta.', true)
      return
    }
    try {
      await acao('/api/painel-do-fundador/promover', {
        perguntaId,
        titulo: tituloDesc,
        descricao: descricaoDesc,
        categoria: 'ESTRATEGIA',
      })
      setPromovendoId(null); setTituloDesc(''); setDescricaoDesc('')
      notificar('Descoberta promovida a conhecimento. Ela agora integra o patrimônio da Ponte.')
      router.refresh()
    } catch {
      notificar('Não consegui promover agora.', true)
    }
  }

  const atual = painel?.perguntaAtual ?? null

  const validar = async (id: string, status: 'VALIDADO' | 'REPLICADO' | 'CONSOLIDADO') => {
    try {
      const res = await fetch(`/api/painel-do-fundador/conhecimento/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Falha na ação')
      notificar(`Padrão marcado como ${status}. Ele agora aparece em Inteligência Coletiva.`)
      router.refresh()
    } catch {
      notificar('Não consegui validar agora.', true)
    }
  }

  const descartar = async (id: string) => {
    try {
      const res = await fetch(`/api/painel-do-fundador/conhecimento/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Falha na ação')
      notificar('Candidato descartado.')
      router.refresh()
    } catch {
      notificar('Não consegui descartar agora.', true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <header className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Interno — exclusivo do fundador</p>
          <h1 className="text-2xl font-semibold tracking-tight">Painel do Fundador</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Apenas organização. Nenhuma IA inventando conclusões — os padrões abaixo vêm das respostas reais.
          </p>
        </header>

        {mensagem && <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-400">{mensagem}</div>}
        {erro && <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive">{erro}</div>}

        {/* Métricas de transformação — P63. Mede transformação, não quantidade de telas. */}
        {metricas && (
          <section className="rounded-xl border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-base font-semibold">Transformação, não funcionalidades</h2>
              <p className="text-xs text-muted-foreground">
                O que importa é o empresário voltando, percebendo clareza, decidindo e evoluindo.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {[
                { valor: metricas.sessoesIniciadas, rotulo: 'sessões iniciadas' },
                { valor: metricas.sessoesConcluidas, rotulo: 'sessões concluídas' },
                { valor: `${metricas.taxaConclusaoSessao}%`, rotulo: 'conclusão de sessão' },
                { valor: metricas.clarezasRegistradas, rotulo: 'clarezas percebidas' },
                { valor: metricas.empresasComRetorno, rotulo: 'retornaram em 7 dias' },
                { valor: metricas.primeirasDecisoes, rotulo: 'decisões registradas' },
                { valor: metricas.primeirasEvolucoes, rotulo: 'evoluções registradas' },
                { valor: metricas.apoiadores, rotulo: 'apoiadores' },
                { valor: metricas.founders, rotulo: 'founders' },
                { valor: `${metricas.taxaConversaoApoiadorParaFundador}%`, rotulo: 'apoiador→founder' },
              ].map((m) => (
                <div key={m.rotulo} className="rounded-lg bg-muted/40 p-3 space-y-1">
                  <p className="text-xl font-bold">{m.valor}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">{m.rotulo}</p>
                </div>
              ))}
            </div>
            {metricas.clarezasPorCategoria.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Clareza percebida por categoria</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {metricas.clarezasPorCategoria.map((c) => (
                    <span key={c.categoria} className="rounded-full border border-border px-2.5 py-1">
                      {c.categoria}: {c.total}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <p className="text-[10px] text-muted-foreground italic">
              Recomendações consolidadas na plataforma: {metricas.recomendacoes}. Nenhum dado individual exposto — apenas agregados.
            </p>
          </section>
        )}

        {/* Inteligência Coletiva — P62. A Ponte compartilha apenas padrões agregados e anônimos, jamais dados de uma empresa. */}
        <section className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">Inteligência Coletiva</h2>
              <p className="text-xs text-muted-foreground">
                Padrões que aparecem porque se repetem em empresas reais — nunca o dado de uma empresa específica.
              </p>
            </div>
            {maturidadeColetiva && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary shrink-0">
                Fase: {maturidadeColetiva.rotulo}
              </span>
            )}
          </div>

          {maturidadeColetiva && (
            <>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground leading-relaxed">{maturidadeColetiva.descricao}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {maturidadeColetiva.gates.map((g) => (
                  <span
                    key={g.rotulo}
                    className={`rounded-full border px-2.5 py-1 ${g.ativo ? 'border-primary/40 bg-primary/5 text-primary' : 'border-border'}`}
                  >
                    {g.rotulo} · {g.limite}+
                  </span>
                ))}
              </div>
            </>
          )}

          {padroesColetivos.length > 0 ? (
            <div className="space-y-2">
              {padroesColetivos.map((p) => (
                <div key={`${p.titulo}-${p.repeticoes}`} className="flex items-start justify-between gap-3 rounded-lg bg-muted/40 p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-snug">{p.titulo}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{p.categoria ?? 'sem categoria'}</p>
                  </div>
                  <div className="shrink-0 text-right text-xs text-muted-foreground">
                    <p className="font-semibold">{p.repeticoes} repetição(ões)</p>
                    <p>confiança {p.scoreConfianca}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">
              Ainda não há padrões validados. Eles só aparecem quando um mesmo padrão se repete em empresas diferentes — sem volume, não há padrão.
            </p>
          )}
        </section>

        {/* Candidatos a conhecimento — P62: o founder valida o que vira padrão coletivo */}
        {candidatos.length > 0 && (
          <section className="rounded-xl border bg-card p-6 space-y-4">
            <div>
              <h2 className="text-base font-semibold">Descobertas aguardando validação</h2>
              <p className="text-xs text-muted-foreground">
                Promovidas da Pergunta Aberta como candidatas. Validar transforma o padrão em conhecimento coletivo visível; descartar arquiva sem expor nada.
              </p>
            </div>
            <div className="space-y-2">
              {candidatos.map((c) => (
                <div key={c.id} className="rounded-lg border border-border bg-background p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-snug">{c.titulo}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{c.descricao}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{c.categoria ?? 'sem categoria'}</p>
                    </div>
                    <div className="shrink-0 text-right text-xs text-muted-foreground">
                      <p className="font-semibold">{c.repeticoes} resposta(s)</p>
                      <p>{Math.round(c.scoreConfianca * 100)}% confiança</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => validar(c.id, 'VALIDADO')}
                      className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Validar
                    </button>
                    <button
                      type="button"
                      onClick={() => descartar(c.id)}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/50 transition-colors"
                    >
                      Descartar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pergunta atual */}
        <section className="rounded-xl border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Pergunta Aberta da semana</h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {atual ? 'ativa' : 'nenhuma ativa'}
            </span>
          </div>

          {atual ? (
            <>
              <div className="space-y-1">
                <p className="text-lg font-medium leading-relaxed">{atual.pergunta}</p>
                <p className="text-xs text-muted-foreground">{atual.objetivo}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border border-border px-2.5 py-1">Capacidade: {atual.capacidade}</span>
                <span className="rounded-full border border-border px-2.5 py-1">{atual.totalRespostas} resposta(s)</span>
                <span className="rounded-full border border-border px-2.5 py-1">Revisão: {formatarData(atual.dataRevisao)}</span>
                {atual.segmentosRecomendados.length > 0 && (
                  <span className="rounded-full border border-border px-2.5 py-1">Segmentos: {atual.segmentosRecomendados.join(', ')}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => revisar(atual.id, true)}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Continua por mais um ciclo
                </button>
                <button
                  type="button"
                  onClick={() => setPromovendoId(atual.id)}
                  className="rounded-lg border border-primary/40 bg-primary/5 px-4 py-2 text-sm text-primary hover:bg-primary/10 transition-colors"
                >
                  Promover a conhecimento
                </button>
                <button
                  type="button"
                  onClick={() => revisar(atual.id, false)}
                  className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                >
                  Encerrar e criar nova
                </button>
              </div>

              {promovendoId === atual.id && (
                <div className="space-y-2 rounded-lg border border-primary/20 bg-muted/30 p-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    ETAPA 7 — promover: a descoberta vira ConhecimentoColetivo candidato.
                  </p>
                  <input
                    value={tituloDesc}
                    onChange={(e) => setTituloDesc(e.target.value)}
                    placeholder="Título da descoberta"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  />
                  <textarea
                    value={descricaoDesc}
                    onChange={(e) => setDescricaoDesc(e.target.value)}
                    rows={3}
                    placeholder="O que as respostas revelaram"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => promover(atual.id)}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Promover
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhuma Pergunta Aberta ativa. Crie uma abaixo ou use um template da biblioteca.
            </p>
          )}
        </section>

        {/* Padrões */}
        <section className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="text-base font-semibold">Principais padrões observados</h2>
          {atual && painel && painel.padroes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {painel.padroes.map((p) => (
                <span key={p.palavra} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm">
                  {p.palavra} <span className="text-xs text-muted-foreground">×{p.ocorrencias}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Padrões aparecem quando 2+ empresas citam o mesmo tema.</p>
          )}

          {atual && painel && painel.perspectivasDiferentes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Empresas que trouxeram perspectivas diferentes</p>
              <div className="space-y-2">
                {painel.perspectivasDiferentes.map((r) => (
                  <RespostaLinha key={r.id} r={r} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Respostas das empresas */}
        <section className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="text-base font-semibold">
            Empresas participantes {atual ? `(${painel?.totalEmpresasParticipantes ?? 0})` : ''}
          </h2>
          {atual && painel && painel.respostas.length > 0 ? (
            <div className="space-y-3">
              {painel.respostas.map((r) => (
                <RespostaLinha key={r.id} r={r} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">As respostas registradas aparecem aqui, automaticamente.</p>
          )}
        </section>

        {/* Histórico de perguntas */}
        {perguntas.length > 0 && (
          <section className="rounded-xl border bg-card p-6 space-y-3">
            <h2 className="text-base font-semibold">Histórico de Perguntas Abertas</h2>
            <div className="space-y-2">
              {perguntas.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground line-clamp-1">{p.pergunta}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground">{p.totalRespostas} resposta(s)</span>
                    <span className={`text-xs ${p.ativa ? 'text-primary' : 'text-muted-foreground'}`}>
                      {p.ativa ? 'ativa' : formatarData(p.dataRevisao)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Biblioteca de grandes perguntas */}
        <section className="rounded-xl border bg-card p-6 space-y-4">
          <h2 className="text-base font-semibold">Biblioteca das Grandes Perguntas</h2>
          <p className="text-xs text-muted-foreground">Clique em um template para carregar no formulário abaixo.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {biblioteca.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => usarTemplate(g)}
                className="rounded-lg border border-border bg-background p-4 text-left hover:border-primary/40 hover:bg-muted/30 transition-colors space-y-1"
              >
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">{g.titulo}</p>
                <p className="text-sm font-medium leading-snug">{g.pergunta}</p>
                <p className="text-xs text-muted-foreground">{g.beneficio}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Nova pergunta */}
        <section className="rounded-xl border bg-card p-6 space-y-3">
          <h2 className="text-base font-semibold">Nova Pergunta Aberta</h2>
          <p className="text-xs text-muted-foreground">Apenas uma ativa por vez. Criar uma nova desativa a atual.</p>
          <div className="space-y-2">
            <input
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
              placeholder="Pergunta"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <textarea
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              rows={2}
              placeholder="Por que queremos entender isso?"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none"
            />
            <div className="grid gap-2 sm:grid-cols-3">
              <input
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                placeholder="Capacidade (ex.: Adaptação)"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                value={beneficio}
                onChange={(e) => setBeneficio(e.target.value)}
                placeholder="Benefício para o empresário"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2"
              />
            </div>
            <input
              value={segmentos}
              onChange={(e) => setSegmentos(e.target.value)}
              placeholder="Segmentos recomendados (separados por vírgula) — vazio = todos"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => criarNova({
                pergunta,
                objetivo,
                capacidade,
                beneficio,
                segmentosRecomendados: segmentos.split(',').map((s) => s.trim()).filter(Boolean),
              })}
              disabled={salvando || !pergunta.trim() || !objetivo.trim()}
              className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {salvando ? 'Criando...' : 'Ativar essa pergunta'}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

function RespostaLinha({ r }: { r: RespostaAbertaItem }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3 space-y-1">
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{r.empresaNome}</span>
        <span>{r.segmento ?? 'sem segmento'} · {formatarData(r.criadaEm)}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">"{r.resumo}"</p>
    </div>
  )
}
