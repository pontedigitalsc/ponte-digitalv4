'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Clock,
  MessageSquare,
  Phone,
  Save,
  Users,
  Sparkles,
  Check,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useConfirm } from '@/hooks/use-confirm'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  montarMensagemContato,
  montarUrlWhatsAppFundador,
  podeTransicionarStatusSolicitacao,
  STATUS_COM_CONFIRMACAO,
  ONBOARDING_FOUNDER_OPCOES,
  STATUS_SOLICITACAO_FOUNDER_ROTULO,
  type StatusSolicitacaoFounderOp,
} from '@/engine/founder-operacoes'

// ─── TIPOS (DTOs vindo do servidor) ───────────────────────────────────────────

interface SolicitacaoDto {
  id: string
  nomeEmpresa: string
  responsavel: string
  segmento: string
  cidadeRegiao: string
  equipe: string | null
  oQueEmpresaFaz: string
  principalDesafio: string
  gostariaEnxergar: string
  motivacao: string
  status: StatusSolicitacaoFounderOp
  origem: string
  usuarioId: string | null
  observacaoAdmin: string | null
  empresaId: string | null
  onboardingTipo: string | null
  contatoEm: Date | null
  fundadorAtivadoEm: Date | null
  criadoEm: Date
  atualizadoEm: Date
}

interface HistoricoDto {
  id: string
  acao: string
  statusDe: string | null
  statusPara: string | null
  detalhes: unknown
  criadoPorEmail: string | null
  criadoEm: Date
}

interface EmpresaDto {
  id: string
  nome: string
  slug: string
  numeroApoiador: number | null
  numeroFundador: number | null
  criadaEm?: Date
}

// ─── RÓTULOS ──────────────────────────────────────────────────────────────────

const PILL_STYLE: Record<StatusSolicitacaoFounderOp, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  CONTACTED: 'bg-sky-100 text-sky-800',
  IN_REVIEW: 'bg-violet-100 text-violet-800',
  APPROVED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-rose-100 text-rose-700',
}

const ROTULO_ACAO_HISTORICO: Record<string, string> = {
  STATUS_ALTERADO: 'Status alterado',
  OBSERVACAO_ATUALIZADA: 'Observação interna atualizada',
  ONBOARDING_DEFINIDO: 'Onboarding definido',
  FOUNDER_ATIVADO: 'Empresa ativada como Founder',
}

function formatarData(data: Date): string {
  return format(data, "d MMM 'às' HH:mm", { locale: ptBR })
}

function bloco(titulo: string, Icon: typeof Building2, children: React.ReactNode) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">{titulo}</h3>
      </div>
      {children}
    </div>
  )
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function FounderOperacoesDetalhe({
  solicitacao,
  historico,
  empresa,
  empresas,
  equipeRotulo,
}: {
  solicitacao: SolicitacaoDto
  historico: HistoricoDto[]
  empresa: EmpresaDto | null
  empresas: EmpresaDto[]
  equipeRotulo: string | null
}) {
  const router = useRouter()
  const { confirmar, ConfirmDialog } = useConfirm()

  const [observacao, setObservacao] = useState(solicitacao.observacaoAdmin ?? '')
  const [salvandoObs, setSalvandoObs] = useState(false)
  const [salvandoStatus, setSalvandoStatus] = useState(false)
  const [salvandoOnboarding, setSalvandoOnboarding] = useState(false)
  const [ativando, setAtivando] = useState(false)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const [proximoStatus, setProximoStatus] = useState<StatusSolicitacaoFounderOp>(solicitacao.status)
  const [onboardingEscolhido, setOnboardingEscolhido] = useState<string>(solicitacao.onboardingTipo ?? '')
  const [empresaId, setEmpresaId] = useState<string>(empresa?.id ?? '')
  const [numeroFundador, setNumeroFundador] = useState<string>(empresa?.numeroFundador ? String(empresa.numeroFundador) : '')

  const notificar = (msg: string, err?: boolean) => {
    if (err) { setErro(msg); setMensagem(null) } else { setMensagem(msg); setErro(null) }
  }

  const acao = async (url: string, body: unknown) => {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const json = await res.json().catch(() => null)
    if (!res.ok) {
      const msg = json?.error ?? 'Não consegui salvar agora.'
      throw new Error(msg)
    }
    return json
  }

  // ── Observação interna ──
  const salvarObservacao = async () => {
    setSalvandoObs(true)
    setErro(null)
    try {
      await acao(`/api/founder/operacoes/${solicitacao.id}`, { observacaoAdmin: observacao.trim() || null })
      notificar('Observação interna salva.')
      router.refresh()
    } catch (e) {
      notificar((e as Error).message, true)
    } finally {
      setSalvandoObs(false)
    }
  }

  // ── Mudança de status ──
  const mudarStatus = async () => {
    if (proximoStatus === solicitacao.status) return

    if (STATUS_COM_CONFIRMACAO.includes(proximoStatus)) {
      const confirma = await confirmar({
        titulo: proximoStatus === 'APPROVED' ? 'Aprovar esta solicitação?' : 'Rejeitar esta solicitação?',
        descricao:
          proximoStatus === 'APPROVED'
            ? 'A empresa passa a ser considerada para se tornar Founder. Este passo é importante.'
            : 'A solicitação sairá do fluxo ativo. Você poderá reabri-la depois, se o contexto mudar.',
        textoConfirmar: proximoStatus === 'APPROVED' ? 'Aprovar' : 'Rejeitar',
        variante: proximoStatus === 'REJECTED' ? 'destrutiva' : 'neutra',
      })
      if (!confirma) return
    }

    setSalvandoStatus(true)
    setErro(null)
    try {
      await acao(`/api/founder/operacoes/${solicitacao.id}`, { status: proximoStatus })
      notificar(`Solicitação em "${STATUS_SOLICITACAO_FOUNDER_ROTULO[proximoStatus]}".`)
      router.refresh()
    } catch (e) {
      notificar((e as Error).message, true)
    } finally {
      setSalvandoStatus(false)
    }
  }

  // ── Onboarding (decisão do time, sem IA) ──
  const salvarOnboarding = async () => {
    if (!onboardingEscolhido) return
    setSalvandoOnboarding(true)
    setErro(null)
    try {
      await acao(`/api/founder/operacoes/${solicitacao.id}`, { onboardingTipo: onboardingEscolhido })
      notificar('Onboarding definido.')
      router.refresh()
    } catch (e) {
      notificar((e as Error).message, true)
    } finally {
      setSalvandoOnboarding(false)
    }
  }

  // ── Ativação como Founder ──
  const ativar = async () => {
    if (!empresaId) {
      notificar('Selecione a empresa a ser ativada.', true)
      return
    }
    if (solicitacao.status !== 'APPROVED') {
      notificar('A solicitação precisa estar aprovada antes de ativar.', true)
      return
    }
    const confirma = await confirmar({
      titulo: 'Ativar esta empresa como Founder?',
      descricao:
        'A empresa será marcada como Founder no patrimônio da Ponte. É um passo importante — confira se está certo antes de continuar.',
      textoConfirmar: 'Ativar',
      variante: 'neutra',
    })
    if (!confirma) return

    setAtivando(true)
    setErro(null)
    try {
      const res = await fetch(`/api/founder/operacoes/${solicitacao.id}/ativar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresaId,
          numeroFundador: numeroFundador ? Number(numeroFundador) : null,
        }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error(json?.error ?? 'Não consegui ativar agora.')
      notificar(
        json?.data?.numeroFundador
          ? `Empresa ativada como Founder nº ${json.data.numeroFundador}.`
          : 'Empresa ativada como Founder.',
      )
      router.refresh()
    } catch (e) {
      notificar((e as Error).message, true)
    } finally {
      setAtivando(false)
    }
  }

  const historiaRotulos = (h: HistoricoDto) => {
    const de = h.statusDe ? STATUS_SOLICITACAO_FOUNDER_ROTULO[h.statusDe as StatusSolicitacaoFounderOp] ?? h.statusDe : null
    const para = h.statusPara ? STATUS_SOLICITACAO_FOUNDER_ROTULO[h.statusPara as StatusSolicitacaoFounderOp] ?? h.statusPara : null
    if (de && para) return `${de} → ${para}`
    if (para) return para
    if (h.acao === 'ONBOARDING_DEFINIDO') {
      const onboardingTipo = (h.detalhes as { onboardingTipo?: string } | null)?.onboardingTipo
      const opcao = onboardingTipo ? ONBOARDING_FOUNDER_OPCOES.find((o) => o.chave === onboardingTipo) : null
      return opcao ? `Nível ${opcao.titulo}` : (onboardingTipo ?? null)
    }
    return null
  }

  const empresaSelecionada = empresas.find((e) => e.id === empresaId)
  const novoContato = montarMensagemContato({
    responsavel: solicitacao.responsavel,
    nomeEmpresa: solicitacao.nomeEmpresa,
  })

  return (
    <div className="space-y-6">
      {ConfirmDialog}

      {/* Cabeçalho / voltar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={{ pathname: '/admin/founder-operacoes', query: { status: solicitacao.status } }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para solicitações
        </Link>
        <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-semibold', PILL_STYLE[solicitacao.status])}>
          {STATUS_SOLICITACAO_FOUNDER_ROTULO[solicitacao.status]}
        </span>
      </div>

      {/* Feedback */}
      {(mensagem || erro) && (
        <div className={cn(
          'rounded-lg border px-4 py-2 text-sm',
          erro ? 'border-destructive/30 bg-destructive/5 text-destructive' : 'border-primary/30 bg-primary/5 text-primary'
        )}>
          {erro ?? mensagem}
        </div>
      )}

      {/* Título */}
      <div>
        <h2 className="text-xl font-semibold leading-tight">{solicitacao.nomeEmpresa}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Solicitação enviada em {formatarData(solicitacao.criadoEm)}
          {solicitacao.origem && ` · origem: ${solicitacao.origem}`}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Empresa */}
          {bloco('Empresa', Building2, (
            <dl className="space-y-2 text-sm">
              {[
                ['Empresa', solicitacao.nomeEmpresa],
                ['Responsável', solicitacao.responsavel],
                ['Segmento', solicitacao.segmento],
                ['Cidade / região', solicitacao.cidadeRegiao],
                ['Equipe', equipeRotulo ?? '—'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          ))}

          {/* Realidade */}
          {bloco('Realidade', MessageSquare, (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">O que a empresa faz</p>
                <p className="mt-0.5 leading-relaxed whitespace-pre-wrap">{solicitacao.oQueEmpresaFaz}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Principal desafio</p>
                <p className="mt-0.5 leading-relaxed whitespace-pre-wrap">{solicitacao.principalDesafio}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">O que gostaria de enxergar</p>
                <p className="mt-0.5 leading-relaxed whitespace-pre-wrap">{solicitacao.gostariaEnxergar}</p>
              </div>
            </div>
          ))}

          {/* Motivação */}
          {bloco('Motivação', Sparkles, (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{solicitacao.motivacao}</p>
          ))}
        </div>

        <div className="space-y-6">
          {/* Contato */}
          {bloco('Contato', Phone, (
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                Canal informado: <span className="font-medium text-foreground">{solicitacao.responsavel}</span>
              </p>
              <a
                href={montarUrlWhatsAppFundador(novoContato)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Conversar no WhatsApp
              </a>
              <p className="text-[11px] text-muted-foreground/70 italic">
                Mensagem pré-pronta pelo número oficial da Ponte. Revisar antes de enviar.
              </p>
            </div>
          ))}

          {/* Ops — observação interna */}
          {bloco('Observação interna (só aqui)', Users, (
            <div className="space-y-2">
              <textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                rows={3}
                placeholder="Anotações só para o time — não aparecem para o empresário."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
              <Button size="sm" onClick={salvarObservacao} disabled={salvandoObs}>
                <Save className="h-4 w-4" />
                {salvandoObs ? 'Salvando...' : 'Salvar observação'}
              </Button>
            </div>
          ))}

          {/* Ops — status */}
          {bloco('Fluxo da solicitação', Clock, (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label htmlFor="proximo-status" className="text-xs text-muted-foreground">Novo status:</label>
                <select
                  id="proximo-status"
                  value={proximoStatus}
                  onChange={(e) => setProximoStatus(e.target.value as StatusSolicitacaoFounderOp)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {Object.entries(STATUS_SOLICITACAO_FOUNDER_ROTULO).map(([chave, rotulo]) => (
                    <option
                      key={chave}
                      value={chave}
                      disabled={!podeTransicionarStatusSolicitacao(solicitacao.status, chave as StatusSolicitacaoFounderOp)}
                    >
                      {rotulo}
                    </option>
                  ))}
                </select>
                <Button size="sm" variant="outline" onClick={mudarStatus} disabled={salvandoStatus || proximoStatus === solicitacao.status}>
                  {salvandoStatus ? 'Salvando...' : 'Mudar status'}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground/70">
                {solicitacao.contatoEm && `Primeiro contato em ${formatarData(solicitacao.contatoEm)}. `}
                Aprovar e rejeitar pedem confirmação, de propósito.
              </p>
            </div>
          ))}

          {/* Onboarding (decisão do time) */}
          {bloco('Onboarding da empresa', Sparkles, (
            <div className="space-y-3">
              <div className="grid gap-2">
                {ONBOARDING_FOUNDER_OPCOES.map((opcao) => (
                  <button
                    key={opcao.chave}
                    type="button"
                    onClick={() => setOnboardingEscolhido(opcao.chave)}
                    className={cn(
                      'flex items-start gap-3 rounded-lg border p-3 text-left transition-colors',
                      onboardingEscolhido === opcao.chave
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/40'
                    )}
                  >
                    <span className={cn(
                      'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                      onboardingEscolhido === opcao.chave ? 'bg-primary border-primary' : 'border-muted-foreground/40'
                    )}>
                      {onboardingEscolhido === opcao.chave && <Check className="h-3 w-3 text-primary-foreground" />}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{opcao.titulo} <span className="text-xs font-normal text-muted-foreground">· {opcao.subtitulo}</span></span>
                      <span className="mt-0.5 block text-xs text-muted-foreground leading-relaxed">{opcao.descricao}</span>
                    </span>
                  </button>
                ))}
              </div>
              <Button size="sm" onClick={salvarOnboarding} disabled={salvandoOnboarding || !onboardingEscolhido}>
                <Save className="h-4 w-4" />
                {salvandoOnboarding ? 'Salvando...' : 'Definir onboarding'}
              </Button>
              <p className="text-[11px] text-muted-foreground/70 italic">
                Escolha do time, sem IA. A conversa em si usa a estrutura já existente do /conversa.
              </p>
            </div>
          ))}

          {/* Ativação como Founder */}
          {bloco('Ativar como Founder', Building2, (
            <div className="space-y-3">
              {solicitacao.status !== 'APPROVED' ? (
                <p className="text-sm text-muted-foreground">
                  A solicitação precisa estar <span className="font-medium">Aprovada</span> antes de ativar a empresa.
                </p>
              ) : (
                <>
                  <div className="space-y-2 text-sm">
                    <label htmlFor="empresa-vincular" className="text-xs text-muted-foreground">Empresa a ativar:</label>
                    <select
                      id="empresa-vincular"
                      value={empresaId}
                      onChange={(e) => {
                        setEmpresaId(e.target.value)
                        const escolhida = empresas.find((x) => x.id === e.target.value)
                        setNumeroFundador(escolhida?.numeroFundador ? String(escolhida.numeroFundador) : '')
                      }}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="">Selecione a empresa...</option>
                      {empresas.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.nome}{e.numeroFundador ? ` · Founder nº ${e.numeroFundador}` : e.numeroApoiador ? ` · Apoiador (nº ${e.numeroApoiador})` : ''}
                        </option>
                      ))}
                    </select>

                    {empresaSelecionada?.numeroFundador ? (
                      <p className="text-xs text-muted-foreground/70">
                        Esta empresa já é Founder (nº {empresaSelecionada.numeroFundador}).
                      </p>
                    ) : (
                      <div className="space-y-1">
                        <label htmlFor="numero-fundador" className="text-xs text-muted-foreground">
                          Número de Fundador {empresaSelecionada?.numeroApoiador ? `(mesmo número do apoiador: ${empresaSelecionada.numeroApoiador})` : ''}:
                        </label>
                        <input
                          id="numero-fundador"
                          type="number"
                          min={1}
                          value={numeroFundador}
                          onChange={(e) => setNumeroFundador(e.target.value)}
                          placeholder="Ex.: 7"
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>
                    )}
                  </div>
                  <Button onClick={ativar} disabled={ativando} variant="secondary">
                    <Check className="h-4 w-4" />
                    {ativando ? 'Ativando...' : 'Ativar empresa como Founder'}
                  </Button>
                  <p className="text-[11px] text-muted-foreground/70 italic">
                    Registra <span className="font-medium">Empresa.numeroFundador</span> (fonte de verdade existente) e vincula a solicitação. Não inventa privilégios de plataforma.
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Histórico */}
      <div>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <Clock className="h-4 w-4 text-primary" />
          Histórico
        </h3>
        <ol className="space-y-2">
          <li className="rounded-lg border bg-card px-4 py-2.5 text-sm">
            <span className="font-medium">Solicitação criada</span>
            <span className="ml-2 text-xs text-muted-foreground">{formatarData(solicitacao.criadoEm)}</span>
          </li>
          {historico.map((h) => {
            const mudanca = historiaRotulos(h)
            return (
              <li key={h.id} className="rounded-lg border bg-card px-4 py-2.5 text-sm">
                <span className="font-medium">{ROTULO_ACAO_HISTORICO[h.acao] ?? h.acao}</span>
                {mudanca && <span className="text-xs text-muted-foreground"> · {mudanca}</span>}
                <span className="ml-2 text-xs text-muted-foreground">{formatarData(h.criadoEm)}</span>
                {h.criadoPorEmail && (
                  <span className="block text-[11px] text-muted-foreground/60">por {h.criadoPorEmail}</span>
                )}
              </li>
            )
          })}
          {solicitacao.fundadorAtivadoEm && (
            <li className="rounded-lg border border-emerald-300/40 bg-emerald-50 px-4 py-2.5 text-sm">
              <span className="font-medium text-emerald-800">Empresa ativada como Founder</span>
              <span className="ml-2 text-xs text-emerald-700">{formatarData(solicitacao.fundadorAtivadoEm)}</span>
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}