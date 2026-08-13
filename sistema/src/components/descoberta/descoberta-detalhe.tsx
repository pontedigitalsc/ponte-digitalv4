'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Clock,
  Compass,
  MessageSquare,
  Save,
  Users,
  Sparkles,
  Check,
  Eye,
  FileText,
  ChevronDown,
  CheckSquare2,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useConfirm } from '@/hooks/use-confirm'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  PERGUNTA_ANCORA,
  podeTransicionarStatusDiagnostico,
  STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO,
  STATUS_DIAGNOSTICO_DESCOBERTA_DESCRICAO,
  STATUS_DIAGNOSTICO_COM_CONFIRMACAO,
  TAXONOMIA_REGISTRO_DESCOBERTA,
  CONFIANCA_DESCOBERTA_ROTULO,
  PAPEL_PARTICIPANTE_DESCOBERTA_ROTULO,
  CATEGORIAS_OPORTUNIDADE_DESCOBERTA,
  rotuloCategoriaOportunidade,
  type StatusDiagnosticoDescobertaOp,
  type ProgressoDescoberta,
} from '@/engine/descoberta-operacional'
import { CopilotoVisaoGerente } from './copiloto-visao-gerente'

// ─── TIPOS (DTOs vindos do servidor) ──────────────────────────────────────────

interface ParticipanteDto {
  id: string
  nome: string
  papel: string
  cargo: string | null
}

interface RespostaDto {
  id: string
  resposta: string
  criadaEm: Date
  participante: { id: string; nome: string; papel: string } | null
  pergunta: { texto: string; area: string } | null
}

interface RegistroDto {
  id: string
  tipo: string
  conteudo: string
  area: string | null
  confianca: string | null
  verificacaoEm: Date | null
  criadaEm: Date
}

interface ProcessoDto {
  id: string
  nome: string
  descricao: string | null
  inicio: string | null
  fim: string | null
  responsavel: string | null
  fonte: string | null
  ultimaValidacaoEm: Date | null
  etapas: unknown
  retrabalhos: unknown
  dependencias: unknown
  riscos: unknown
  indicadores: unknown
}

interface ProcessoDesejadoDto {
  id: string
  nome: string
  descricao: string | null
  melhoriaPrincipal: string | null
  status: string
  validadoEm: Date | null
  processoAtual: { id: string; nome: string } | null
}

interface DivergenciaDto {
  id: string
  titulo: string
  descricao: string
  questaoValidacao: string | null
  status: string
  participanteOrigem: { id: string; nome: string } | null
}

interface OportunidadeDto {
  id: string
  descricao: string
  categoria: string
  etapaReferente: string | null
  impactoEstimado: string | null
  status: string
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

interface DiagnosticoDto {
  id: string
  nomeEmpresa: string
  unidadeOperacional: string | null
  status: StatusDiagnosticoDescobertaOp
  respostaAncora: string | null
  resultadoDeclarado: string | null
  criadaEm: Date
}

interface DetalheDto {
  diagnostico: DiagnosticoDto
  categoria: { id: string; nome: string; slug: string } | null
  pioneiraNome: string | null
  participantes: ParticipanteDto[]
  respostas: RespostaDto[]
  registros: RegistroDto[]
  processos: ProcessoDto[]
  processosDesejados: ProcessoDesejadoDto[]
  divergencias: DivergenciaDto[]
  oportunidades: OportunidadeDto[]
  historico: HistoricoDto[]
}

interface DetalheProps {
  detalhe: DetalheDto
  progresso: ProgressoDescoberta[]
  rotuloTipo: (chave: string | null | undefined) => string | null
}

// ─── RÓTULOS ──────────────────────────────────────────────────────────────────

const PILL_STYLE: Record<StatusDiagnosticoDescobertaOp, string> = {
  NAO_INICIADO: 'bg-slate-100 text-slate-700',
  EM_DESCOBERTA: 'bg-amber-100 text-amber-800',
  MAPEADO: 'bg-sky-100 text-sky-800',
  EM_VALIDACAO: 'bg-violet-100 text-violet-800',
  VALIDADO: 'bg-emerald-100 text-emerald-800',
  EM_IMPLEMENTACAO: 'bg-teal-100 text-teal-800',
  IMPLEMENTADO: 'bg-blue-100 text-blue-800',
  EM_APRENDIZADO: 'bg-rose-100 text-rose-700',
}

const ROTULO_ACAO_HISTORICO: Record<string, string> = {
  DIAGNOSTICO_CRIADO: 'Diagnóstico criado',
  STATUS_ALTERADO: 'Estado alterado',
  RESPOSTA_ANCORA: 'Pergunta-âncora respondida',
  PARTICIPANTE_ADICIONADO: 'Participante adicionado',
  RESPOSTA_REGISTRADA: 'Fala registrada',
  REGISTRO_CRIADO: 'Registro classificado',
  PROCESSO_CRIADO: 'Processo mapeado (COMO É)',
  PROCESSO_DESEJADO_CRIADO: 'COMO PODERIA SER proposto',
  PROCESSO_DESEJADO_VALIDADO: 'COMO PODERIA SER validado',
  DIVERGENCIA_CRIADA: 'Divergência registrada',
  DIVERGENCIA_RESOLVIDA: 'Divergência em validação',
  OPORTUNIDADE_CRIADA: 'Oportunidade registrada',
}

function formatarData(data: Date): string {
  return format(data, "d MMM 'às' HH:mm", { locale: ptBR })
}

function listaDe(item: unknown): string[] {
  if (!Array.isArray(item)) return []
  return item.filter((x): x is string => typeof x === 'string' && x.trim().length > 0)
}

function bloco(titulo: string, Icon: typeof Building2, children: React.ReactNode, pendente?: boolean) {
  return (
    <div className={cn('rounded-lg border bg-card p-4', pendente && 'border-dashed')}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">{titulo}</h3>
        {pendente && (
          <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
            próximo passo
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function DescobertaDetalhe({ detalhe, progresso, rotuloTipo }: DetalheProps) {
  const router = useRouter()
  const { confirmar, ConfirmDialog } = useConfirm()
  const d = detalhe.diagnostico

  const [mensagem, setMensagem] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [ocupado, setOcupado] = useState<string | null>(null)

  // status
  const [proximoStatus, setProximoStatus] = useState<StatusDiagnosticoDescobertaOp>(d.status)

  // âncora
  const [ancora, setAncora] = useState(d.respostaAncora ?? '')
  const [resultadoDeclarado, setResultadoDeclarado] = useState(d.resultadoDeclarado ?? '')

  // participante
  const [pNome, setPNome] = useState('')
  const [pPapel, setPPapel] = useState('PROPRIETARIO')
  const [pCargo, setPCargo] = useState('')

  // resposta
  const [rParticipanteId, setRParticipanteId] = useState('')
  const [rTexto, setRTexto] = useState('')

  // registro
  const [regTipo, setRegTipo] = useState('OBSERVACAO')
  const [regArea, setRegArea] = useState('')
  const [regConfianca, setRegConfianca] = useState('')
  const [regConteudo, setRegConteudo] = useState('')

  // processo
  const [prNome, setPrNome] = useState('')
  const [prInicio, setPrInicio] = useState('')
  const [prFim, setPrFim] = useState('')
  const [prResponsavel, setPrResponsavel] = useState('')
  const [prEtapas, setPrEtapas] = useState('')
  const [prRetrabalhos, setPrRetrabalhos] = useState('')
  const [prDependencias, setPrDependencias] = useState('')
  const [prRiscos, setPrRiscos] = useState('')

  // desejado
  const [djNome, setDjNome] = useState('')
  const [djProcessoId, setDjProcessoId] = useState('')
  const [djMelhoria, setDjMelhoria] = useState('')

  // divergência
  const [dvTitulo, setDvTitulo] = useState('')
  const [dvDescricao, setDvDescricao] = useState('')
  const [dvProcessoId, setDvProcessoId] = useState('')
  const [dvParticipanteId, setDvParticipanteId] = useState('')

  // oportunidade
  const [opDescricao, setOpDescricao] = useState('')
  const [opCategoria, setOpCategoria] = useState('GARGALO')
  const [opEtapa, setOpEtapa] = useState('')
  const [opImpacto, setOpImpacto] = useState('')

  // relatório
  const [relatorio, setRelatorio] = useState<string | null>(null)
  const [copiado, setCopiado] = useState(false)

  const notificar = (msg: string, err?: boolean) => {
    if (err) { setErro(msg); setMensagem(null) } else { setMensagem(msg); setErro(null) }
  }

  const envia = async (url: string, body: unknown, metodo = 'POST') => {
    const res = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const json = await res.json().catch(() => null)
    if (!res.ok) {
      const msg = json?.error ?? 'Não consegui fazer isso agora.'
      throw new Error(msg)
    }
    return json
  }

  const limparCampos = () => {
    setPNome(''); setPPapel('PROPRIETARIO'); setPCargo('')
    setRParticipanteId(''); setRTexto('')
    setRegTipo('OBSERVACAO'); setRegArea(''); setRegConfianca(''); setRegConteudo('')
    setPrNome(''); setPrInicio(''); setPrFim(''); setPrResponsavel(''); setPrEtapas(''); setPrRetrabalhos(''); setPrDependencias(''); setPrRiscos('')
    setDjNome(''); setDjProcessoId(''); setDjMelhoria('')
    setDvTitulo(''); setDvDescricao(''); setDvProcessoId(''); setDvParticipanteId('')
    setOpDescricao(''); setOpCategoria('GARGALO'); setOpEtapa(''); setOpImpacto('')
  }

  const acaoRegistro = async (
    tipo: string,
    url: string,
    body: unknown,
    sucesso: string,
    limpar = false,
  ) => {
    setOcupado(tipo)
    setErro(null)
    try {
      await envia(url, body)
      notificar(sucesso)
      if (limpar) limparCampos()
      router.refresh()
    } catch (e) {
      notificar((e as Error).message, true)
    } finally {
      setOcupado(null)
    }
  }

  // ── Mudança de estado ──
  const mudarStatus = async () => {
    if (proximoStatus === d.status) return
    if (STATUS_DIAGNOSTICO_COM_CONFIRMACAO.includes(proximoStatus)) {
      const confirma = await confirmar({
        titulo: `Mover para "${STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[proximoStatus]}"?`,
        descricao: STATUS_DIAGNOSTICO_DESCOBERTA_DESCRICAO[proximoStatus],
        textoConfirmar: 'Confirmar',
        variante: proximoStatus === 'EM_APRENDIZADO' ? 'destrutiva' : 'neutra',
      })
      if (!confirma) return
    }
    await acaoRegistro(
      'status',
      `/api/descoberta/diagnosticos/${d.id}/status`,
      { status: proximoStatus },
      `Diagnóstico em "${STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[proximoStatus]}".`,
    )
  }

  // ── Relatório (tarefa 14) ──
  const gerarRelatorio = async () => {
    setOcupado('relatorio')
    setErro(null)
    try {
      const res = await fetch(`/api/descoberta/diagnosticos/${d.id}/relatorio`)
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error(json?.error ?? 'Não consegui gerar o relatório.')
      setRelatorio(json.data.texto)
      notificar('Relatório gerado — sem IA, só o que foi registrado no campo.')
    } catch (e) {
      notificar((e as Error).message, true)
    } finally {
      setOcupado(null)
    }
  }

  const copiarRelatorio = async () => {
    if (!relatorio) return
    try {
      await navigator.clipboard.writeText(relatorio)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      notificar('Não consegui copiar automaticamente.', true)
    }
  }

  const proximoPasso = progresso.find((p) => !p.concluido)

  return (
    <div className="space-y-6">
      {ConfirmDialog}

      {/* Cabeçalho */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={{ pathname: '/admin/descoberta', query: { status: d.status } }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para descobertas
        </Link>
        <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-semibold', PILL_STYLE[d.status])}>
          {STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[d.status]}
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
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold leading-tight">{d.nomeEmpresa}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {detalhe.categoria?.nome ?? 'Categoria'}
              {detalhe.pioneiraNome && ` · pioneira de categoria`}
              {' · '}descoberta iniciada em {formatarData(d.criadaEm)}
            </p>
          </div>
        </div>
      </div>

      {/* Narrativa do condutor — o próximo passo (sem IA) */}
      {proximoPasso && (
        <div className="rounded-xl border border-amber-300/40 bg-amber-50 px-4 py-3 text-sm">
          <p className="text-amber-900">
            <span className="font-semibold">Próximo passo: </span>
            {proximoPasso.rotulo}
          </p>
          <p className="text-xs text-amber-800/70 mt-0.5">
            {proximoPasso.chave === 'ancora' && 'A pergunta-âncora (P82) é obrigatória no MVP — é ela que define o primeiro recorte do campo.'}
            {proximoPasso.chave === 'participantes' && 'Quem será ouvido? Proprietário, gestão e/ou operação — uma descoberta de cada vez.'}
            {proximoPasso.chave === 'registros' && 'Registre e classifique os fatos pela taxonomia (informação fornecida, observação, hipótese...).'}
            {proximoPasso.chave === 'processos' && 'Mapeie o COMO É: o processo real, com início, fim, etapas e responsáveis.'}
            {proximoPasso.chave === 'desejados' && 'Desenhe o COMO PODERIA SER a partir do que foi mapeado.'}
            {proximoPasso.chave === 'oportunidades' && 'Priorize as oportunidades para o plano de implementação.'}
          </p>
        </div>
      )}

      {/* Progresso */}
      <div>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <CheckSquare2 className="h-4 w-4 text-primary" />
          Checklist do campo
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {progresso.map((p) => (
            <div key={p.chave} className={cn(
              'flex items-start gap-2 rounded-lg border px-3 py-2 text-xs',
              p.concluido ? 'border-emerald-300/40 bg-emerald-50' : 'border-dashed bg-card'
            )}>
              <span className={cn(
                'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                p.concluido ? 'bg-emerald-500 border-emerald-500' : 'border-muted-foreground/40'
              )}>
                {p.concluido && <Check className="h-3 w-3 text-white" />}
              </span>
              <span className={p.concluido ? 'text-emerald-800' : 'text-muted-foreground'}>
                {p.rotulo}
              </span>
            </div>
          ))}
        </div>
      </div>

      <CopilotoVisaoGerente
        diagnostico={{
          nomeEmpresa: d.nomeEmpresa,
          unidadeOperacional: d.unidadeOperacional,
          status: d.status,
          respostaAncora: d.respostaAncora,
        }}
        processos={detalhe.processos.map((p) => ({
          nome: p.nome,
          inicio: p.inicio,
          fim: p.fim,
          responsavel: p.responsavel,
          etapas: p.etapas,
          retrabalhos: p.retrabalhos,
          dependencias: p.dependencias,
          riscos: p.riscos,
        }))}
        divergencias={detalhe.divergencias.map((dv) => ({
          titulo: dv.titulo,
          descricao: dv.descricao,
          questaoValidacao: dv.questaoValidacao,
          status: dv.status,
        }))}
        oportunidades={detalhe.oportunidades.map((o) => ({
          descricao: o.descricao,
          categoria: o.categoria,
          status: o.status,
        }))}
        historico={detalhe.historico.map((h) => ({
          acao: h.acao,
          statusDe: h.statusDe,
          statusPara: h.statusPara,
          criadoEm: h.criadoEm,
        }))}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Pergunta-âncora (P82, T3) */}
          {bloco('Pergunta-âncora', MessageSquare, (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground italic border-l-2 border-primary pl-3">
                {PERGUNTA_ANCORA}
              </p>
              {d.respostaAncora ? (
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Resposta na voz do proprietário</p>
                    <p className="mt-0.5 leading-relaxed whitespace-pre-wrap">{d.respostaAncora}</p>
                  </div>
                  {d.resultadoDeclarado && (
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">Resultado declarado</p>
                      <p className="mt-0.5 leading-relaxed whitespace-pre-wrap">{d.resultadoDeclarado}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    value={ancora}
                    onChange={(e) => setAncora(e.target.value)}
                    rows={3}
                    placeholder="A resposta, na voz do dono (DITO literal, não interpretação nossa)."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                  <input
                    value={resultadoDeclarado}
                    onChange={(e) => setResultadoDeclarado(e.target.value)}
                    placeholder="O que o proprietário afirma que acontece hoje (resultado declarado)?"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <Button
                    size="sm"
                    onClick={() => acaoRegistro(
                      'ancora',
                      `/api/descoberta/diagnosticos/${d.id}/ancora`,
                      { resposta: ancora, resultadoDeclarado: resultadoDeclarado || null },
                      'Pergunta-âncora registrada.',
                      true,
                    )}
                    disabled={ocupado === 'ancora' || !ancora.trim()}
                  >
                    <Save className="h-4 w-4" />
                    {ocupado === 'ancora' ? 'Salvando...' : 'Registrar resposta'}
                  </Button>
                </div>
              )}
            </div>
          ))}

          {/* Participantes (T5) */}
          {bloco('Quem é ouvido', Users, (
            <div className="space-y-3">
              {detalhe.participantes.length === 0 ? (
                <p className="text-sm text-muted-foreground">Ninguém ainda. Adicione o primeiro participante.</p>
              ) : (
                <ul className="space-y-1.5">
                  {detalhe.participantes.map((p) => (
                    <li key={p.id} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm">
                      <span className="font-medium">{p.nome}</span>
                      <span className="text-xs text-muted-foreground">
                        {PAPEL_PARTICIPANTE_DESCOBERTA_ROTULO[p.papel as keyof typeof PAPEL_PARTICIPANTE_DESCOBERTA_ROTULO] ?? p.papel}
                        {p.cargo ? ` · ${p.cargo}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={pNome}
                  onChange={(e) => setPNome(e.target.value)}
                  placeholder="Nome"
                  className="col-span-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <select
                  value={pPapel}
                  onChange={(e) => setPPapel(e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {Object.entries(PAPEL_PARTICIPANTE_DESCOBERTA_ROTULO).map(([chave, rotulo]) => (
                    <option key={chave} value={chave}>{rotulo}</option>
                  ))}
                </select>
                <input
                  value={pCargo}
                  onChange={(e) => setPCargo(e.target.value)}
                  placeholder="Cargo (opcional)"
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <Button
                size="sm"
                onClick={() => acaoRegistro(
                  'participante',
                  `/api/descoberta/diagnosticos/${d.id}/participantes`,
                  { nome: pNome, papel: pPapel, cargo: pCargo || null },
                  'Participante adicionado.',
                  true,
                )}
                disabled={ocupado === 'participante' || !pNome.trim()}
              >
                <Save className="h-4 w-4" />
                {ocupado === 'participante' ? 'Salvando...' : 'Adicionar'}
              </Button>
            </div>
          ))}

          {/* Falas / respostas (T6) */}
          {bloco('O que disseram', MessageSquare, (
            <div className="space-y-3">
              {detalhe.respostas.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma fala registrada ainda.</p>
              ) : (
                <ul className="space-y-1.5">
                  {detalhe.respostas.map((r) => (
                    <li key={r.id} className="rounded-lg border bg-background px-3 py-2 text-sm">
                      <p className="leading-relaxed whitespace-pre-wrap">{r.resposta}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground/70">
                        {r.participante ? `${r.participante.nome} (${PAPEL_PARTICIPANTE_DESCOBERTA_ROTULO[r.participante.papel as keyof typeof PAPEL_PARTICIPANTE_DESCOBERTA_ROTULO] ?? r.participante.papel})` : 'sem participante'}
                        {r.pergunta && ` · sobre: ${r.pergunta.texto}`}
                        {' · '}{formatarData(r.criadaEm)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2">
                <select
                  value={rParticipanteId}
                  onChange={(e) => setRParticipanteId(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">Sem participante...</option>
                  {detalhe.participantes.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
                <textarea
                  value={rTexto}
                  onChange={(e) => setRTexto(e.target.value)}
                  rows={2}
                  placeholder="O que a pessoa disse, o mais literal possível (DITO)."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
              <Button
                size="sm"
                onClick={() => acaoRegistro(
                  'resposta',
                  `/api/descoberta/diagnosticos/${d.id}/respostas`,
                  { participanteId: rParticipanteId || null, resposta: rTexto },
                  'Fala registrada.',
                  true,
                )}
                disabled={ocupado === 'resposta' || !rTexto.trim()}
              >
                <Save className="h-4 w-4" />
                {ocupado === 'resposta' ? 'Salvando...' : 'Registrar fala'}
              </Button>
            </div>
          ))}

          {/* Registros classificados (tarefa 7) */}
          {bloco('Fatos registrados (taxonomia)', Eye, (
            <div className="space-y-3">
              {detalhe.registros.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum fato registrado. Cada registro precisa de um tipo — informação fornecida, observação, hipótese...
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {detalhe.registros.map((r) => (
                    <li key={r.id} className="rounded-lg border bg-background px-3 py-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {rotuloTipo(r.tipo) ?? r.tipo}
                        </span>
                        {r.area && <span className="text-[11px] text-muted-foreground/70">[{r.area}]</span>}
                        {r.confianca && (
                          <span className="text-[11px] text-muted-foreground/70">
                            confiança {CONFIANCA_DESCOBERTA_ROTULO[r.confianca as keyof typeof CONFIANCA_DESCOBERTA_ROTULO] ?? r.confianca}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 leading-relaxed whitespace-pre-wrap">{r.conteudo}</p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={regTipo}
                    onChange={(e) => setRegTipo(e.target.value)}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {TAXONOMIA_REGISTRO_DESCOBERTA.map((t) => (
                      <option key={t.chave} value={t.chave}>{t.rotulo}</option>
                    ))}
                  </select>
                  <input
                    value={regArea}
                    onChange={(e) => setRegArea(e.target.value)}
                    placeholder="Área (ex.: Orçamento)"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <select
                  value={regConfianca}
                  onChange={(e) => setRegConfianca(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">Confiança (opcional)...</option>
                  {Object.entries(CONFIANCA_DESCOBERTA_ROTULO).map(([chave, rotulo]) => (
                    <option key={chave} value={chave}>{rotulo}</option>
                  ))}
                </select>
                <textarea
                  value={regConteudo}
                  onChange={(e) => setRegConteudo(e.target.value)}
                  rows={2}
                  placeholder="O fato, separando o que foi dito do que foi observado."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
              <Button
                size="sm"
                onClick={() => acaoRegistro(
                  'registro',
                  `/api/descoberta/diagnosticos/${d.id}/registros`,
                  { tipo: regTipo, conteudo: regConteudo, area: regArea || null, confianca: regConfianca || null },
                  'Registro classificado.',
                  true,
                )}
                disabled={ocupado === 'registro' || !regConteudo.trim()}
              >
                <Save className="h-4 w-4" />
                {ocupado === 'registro' ? 'Salvando...' : 'Classificar registro'}
              </Button>
              <p className="text-[11px] text-muted-foreground/70 italic">
                Informação fornecida, conhecimento prévio e hipóteses exigem verificação — não viram fato sozinhos (P82).
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Processos — COMO É (tarefa 8) */}
          {bloco('Processos — COMO É', Building2, (
            <div className="space-y-3">
              {detalhe.processos.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum processo mapeado ainda.</p>
              ) : (
                <ul className="space-y-1.5">
                  {detalhe.processos.map((p) => (
                    <li key={p.id} className="rounded-lg border bg-background px-3 py-2 text-sm">
                      <p className="font-medium">{p.nome}</p>
                      {(p.inicio || p.fim) && (
                        <p className="text-xs text-muted-foreground">
                          {p.inicio && `Início: ${p.inicio}`}{p.inicio && p.fim && ' · '}{p.fim && `Fim: ${p.fim}`}
                        </p>
                      )}
                      {listaDe(p.etapas).length > 0 && (
                        <p className="mt-1 text-xs leading-relaxed">
                          <span className="text-muted-foreground">Etapas: </span>
                          {listaDe(p.etapas).join(' → ')}
                        </p>
                      )}
                      {listaDe(p.retrabalhos).length > 0 && (
                        <p className="mt-0.5 text-xs text-rose-600">Retrabalhos: {listaDe(p.retrabalhos).join('; ')}</p>
                      )}
                      {listaDe(p.dependencias).length > 0 && (
                        <p className="mt-0.5 text-xs text-amber-700">Dependências: {listaDe(p.dependencias).join('; ')}</p>
                      )}
                      {listaDe(p.riscos).length > 0 && (
                        <p className="mt-0.5 text-xs text-destructive/80">Riscos: {listaDe(p.riscos).join('; ')}</p>
                      )}
                      {p.fonte && (
                        <p className="mt-0.5 text-[11px] text-muted-foreground/60">fonte: {p.fonte}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2">
                <input
                  value={prNome}
                  onChange={(e) => setPrNome(e.target.value)}
                  placeholder="Nome do processo (ex.: Fazer um portão de grade)"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={prInicio}
                    onChange={(e) => setPrInicio(e.target.value)}
                    placeholder="Início / gatilho"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <input
                    value={prFim}
                    onChange={(e) => setPrFim(e.target.value)}
                    placeholder="Fim / sinal de termo"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <textarea
                  value={prEtapas}
                  onChange={(e) => setPrEtapas(e.target.value)}
                  rows={2}
                  placeholder="Etapas, uma por linha (quem faz o quê, na ordem)"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={prResponsavel}
                    onChange={(e) => setPrResponsavel(e.target.value)}
                    placeholder="Responsável principal"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <select
                    value={prRetrabalhos}
                    onChange={() => {}}
                    className="hidden"
                  />
                </div>
                <textarea
                  value={prRetrabalhos}
                  onChange={(e) => setPrRetrabalhos(e.target.value)}
                  rows={2}
                  placeholder="Retrabalhos observados (uma por linha)"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <textarea
                  value={prRiscos}
                  onChange={(e) => setPrRiscos(e.target.value)}
                  rows={1}
                  placeholder="Riscos reais (uma por linha)"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <textarea
                  value={prDependencias}
                  onChange={(e) => setPrDependencias(e.target.value)}
                  rows={1}
                  placeholder="Dependências (quem espera quem) — uma por linha"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
              <Button
                size="sm"
                onClick={() => acaoRegistro(
                  'processo',
                  `/api/descoberta/diagnosticos/${d.id}/processos`,
                  {
                    nome: prNome,
                    inicio: prInicio || null,
                    fim: prFim || null,
                    responsavel: prResponsavel || null,
                    fonte: 'campo',
                    etapas: prEtapas.split('\n').map((x) => x.trim()).filter(Boolean),
                    retrabalhos: prRetrabalhos.split('\n').map((x) => x.trim()).filter(Boolean),
                    dependencias: prDependencias.split('\n').map((x) => x.trim()).filter(Boolean),
                    riscos: prRiscos.split('\n').map((x) => x.trim()).filter(Boolean),
                  },
                  'Processo mapeado (COMO É).',
                  true,
                )}
                disabled={ocupado === 'processo' || !prNome.trim()}
              >
                <Save className="h-4 w-4" />
                {ocupado === 'processo' ? 'Salvando...' : 'Mapear processo'}
              </Button>
            </div>
          ))}

          {/* COMO PODERIA SER (tarefa 9) */}
          {bloco('COMO PODERIA SER', Sparkles, (
            <div className="space-y-3">
              {detalhe.processosDesejados.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum desenho desejado proposto ainda.</p>
              ) : (
                <ul className="space-y-1.5">
                  {detalhe.processosDesejados.map((p) => (
                    <li key={p.id} className="rounded-lg border bg-background px-3 py-2 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium">{p.nome}</p>
                        <span className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                          p.status === 'VALIDADO' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        )}>
                          {p.status === 'VALIDADO' ? 'Validado' : 'Proposto'}
                        </span>
                      </div>
                      {p.processoAtual && (
                        <p className="text-xs text-muted-foreground">a partir de: {p.processoAtual.nome}</p>
                      )}
                      {p.melhoriaPrincipal && (
                        <p className="mt-1 text-xs leading-relaxed">{p.melhoriaPrincipal}</p>
                      )}
                      {p.status !== 'VALIDADO' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2"
                          onClick={() => acaoRegistro(
                            'desejadoValidar',
                            `/api/descoberta/processos-desejados/${p.id}/validar`,
                            {},
                            'Desenho aprovado pelo campo.',
                          )}
                          disabled={ocupado === 'desejadoValidar'}
                        >
                          <Check className="h-3.5 w-3.5" />
                          Aprovar com o campo
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2">
                <select
                  value={djProcessoId}
                  onChange={(e) => setDjProcessoId(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="">A partir de qual processo? (opcional)</option>
                  {detalhe.processos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
                <input
                  value={djNome}
                  onChange={(e) => setDjNome(e.target.value)}
                  placeholder="Nome do desenho desejado"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <textarea
                  value={djMelhoria}
                  onChange={(e) => setDjMelhoria(e.target.value)}
                  rows={2}
                  placeholder="Qual é a melhoria principal em relação ao hoje?"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>
              <Button
                size="sm"
                onClick={() => acaoRegistro(
                  'desejado',
                  `/api/descoberta/diagnosticos/${d.id}/processos-desejados`,
                  { processoAtualId: djProcessoId || null, nome: djNome, melhoriaPrincipal: djMelhoria || null },
                  'COMO PODERIA SER proposto.',
                  true,
                )}
                disabled={ocupado === 'desejado' || !djNome.trim()}
              >
                <Save className="h-4 w-4" />
                {ocupado === 'desejado' ? 'Salvando...' : 'Propor desenho'}
              </Button>
            </div>
          ))}

          {/* Divergências (descrição 6) */}
          {bloco('Descrito × Observado', ChevronDown, (
            <div className="space-y-3">
              {detalhe.divergencias.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhuma divergência registrada. Quando o dito e o observado discordarem, registre aqui.
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {detalhe.divergencias.map((dv) => (
                    <li key={dv.id} className="rounded-lg border bg-background px-3 py-2 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium">{dv.titulo}</p>
                        <span className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-semibold',
                          dv.status === 'RESOLVIDA' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        )}>
                          {dv.status === 'ABERTA' ? 'Aberta' : dv.status === 'QUESTAO_VALIDACAO' ? 'Em validação' : 'Resolvida'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed whitespace-pre-wrap">{dv.descricao}</p>
                      {dv.questaoValidacao && (
                        <p className="mt-1 text-xs text-primary border-l-2 border-primary pl-2">{dv.questaoValidacao}</p>
                      )}
                      {dv.participanteOrigem && (
                        <p className="mt-1 text-[11px] text-muted-foreground/60">sustentada por: {dv.participanteOrigem.nome}</p>
                      )}
                      {dv.status === 'ABERTA' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2"
                          disabled={true}
                          title="Resolução de divergência será feita pelo condutor durante a validação no campo."
                        >
                          Virar pergunta de validação (em campo)
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2">
                <input
                  value={dvTitulo}
                  onChange={(e) => setDvTitulo(e.target.value)}
                  placeholder="Título da divergência"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <textarea
                  value={dvDescricao}
                  onChange={(e) => setDvDescricao(e.target.value)}
                  rows={2}
                  placeholder="O que o participante disse × o que foi observado"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={dvProcessoId}
                    onChange={(e) => setDvProcessoId(e.target.value)}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="">Sem processo</option>
                    {detalhe.processos.map((p) => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                  <select
                    value={dvParticipanteId}
                    onChange={(e) => setDvParticipanteId(e.target.value)}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="">Sem participante</option>
                    {detalhe.participantes.map((p) => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => acaoRegistro(
                  'divergencia',
                  `/api/descoberta/diagnosticos/${d.id}/divergencias`,
                  { titulo: dvTitulo, descricao: dvDescricao, processoId: dvProcessoId || null, participantesId: dvParticipanteId || null },
                  'Divergência registrada.',
                  true,
                )}
                disabled={ocupado === 'divergencia' || !dvTitulo.trim() || !dvDescricao.trim()}
              >
                <Save className="h-4 w-4" />
                {ocupado === 'divergencia' ? 'Salvando...' : 'Registrar divergência'}
              </Button>
            </div>
          ))}

          {/* Oportunidades (tarefa 11) */}
          {bloco('Oportunidades', Sparkles, (
            <div className="space-y-3">
              {detalhe.oportunidades.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma oportunidade registrada ainda.</p>
              ) : (
                <ul className="space-y-1.5">
                  {detalhe.oportunidades.map((o) => (
                    <li key={o.id} className="rounded-lg border bg-background px-3 py-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          {rotuloCategoriaOportunidade(o.categoria) ?? o.categoria}
                        </span>
                        {o.status !== 'CANDIDATA' && (
                          <span className="text-[10px] text-muted-foreground/70">{o.status}</span>
                        )}
                      </div>
                      <p className="mt-1 leading-relaxed whitespace-pre-wrap">{o.descricao}</p>
                      {o.etapaReferente && <p className="mt-0.5 text-[11px] text-muted-foreground/70">etapa: {o.etapaReferente}</p>}
                      {o.impactoEstimado && (
                        <p className="mt-0.5 text-xs text-muted-foreground/80">Impacto estimado (hipótese): {o.impactoEstimado}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={opCategoria}
                    onChange={(e) => setOpCategoria(e.target.value)}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    {CATEGORIAS_OPORTUNIDADE_DESCOBERTA.map((c) => (
                      <option key={c} value={c}>{rotuloCategoriaOportunidade(c)}</option>
                    ))}
                  </select>
                  <input
                    value={opEtapa}
                    onChange={(e) => setOpEtapa(e.target.value)}
                    placeholder="Etapa referente"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <textarea
                  value={opDescricao}
                  onChange={(e) => setOpDescricao(e.target.value)}
                  rows={2}
                  placeholder="A oportunidade, a partir de fato observado ou dito."
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <input
                  value={opImpacto}
                  onChange={(e) => setOpImpacto(e.target.value)}
                  placeholder="Impacto de negócio estimado (hipótese, a validar)"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <Button
                size="sm"
                onClick={() => acaoRegistro(
                  'oportunidade',
                  `/api/descoberta/diagnosticos/${d.id}/oportunidades`,
                  { descricao: opDescricao, categoria: opCategoria, etapaReferente: opEtapa || null, impactoEstimado: opImpacto || null },
                  'Oportunidade registrada.',
                  true,
                )}
                disabled={ocupado === 'oportunidade' || !opDescricao.trim()}
              >
                <Save className="h-4 w-4" />
                {ocupado === 'oportunidade' ? 'Salvando...' : 'Registrar oportunidade'}
              </Button>
            </div>
          ))}

          {/* Estado do diagnóstico */}
          {bloco('Fluxo do diagnóstico', Clock, (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label htmlFor="proximo-status" className="text-xs text-muted-foreground">Novo estado:</label>
                <select
                  id="proximo-status"
                  value={proximoStatus}
                  onChange={(e) => setProximoStatus(e.target.value as StatusDiagnosticoDescobertaOp)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  {Object.entries(STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO).map(([chave, rotulo]) => (
                    <option
                      key={chave}
                      value={chave}
                      disabled={!podeTransicionarStatusDiagnostico(d.status, chave as StatusDiagnosticoDescobertaOp)}
                    >
                      {rotulo}
                    </option>
                  ))}
                </select>
                <Button size="sm" variant="outline" onClick={mudarStatus} disabled={ocupado === 'status' || proximoStatus === d.status}>
                  {ocupado === 'status' ? 'Salvando...' : 'Mudar estado'}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground/70">
                {STATUS_DIAGNOSTICO_DESCOBERTA_DESCRICAO[d.status]} Estados de peso pedem confirmação, de propósito.
              </p>
            </div>
          ))}

          {/* Relatório final (tarefa 14) */}
          {bloco('Relatório final', FileText, (
            <div className="space-y-3">
              <Button size="sm" onClick={gerarRelatorio} disabled={ocupado === 'relatorio'} variant="secondary">
                <Sparkles className="h-4 w-4" />
                {ocupado === 'relatorio' ? 'Gerando...' : 'Gerar relatório (sem IA)'}
              </Button>
              {relatorio && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">12 seções do briefing §21, texto puro.</p>
                    <Button size="sm" variant="outline" onClick={copiarRelatorio}>
                      <FileText className="h-3.5 w-3.5" />
                      {copiado ? 'Copiado!' : 'Copiar'}
                    </Button>
                  </div>
                  <pre className="max-h-96 overflow-auto rounded-lg border bg-muted/40 px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap">
                    {relatorio}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Histórico */}
      <div>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <Clock className="h-4 w-4 text-primary" />
          Histórico da descoberta
        </h3>
        <ol className="space-y-2">
          <li className="rounded-lg border bg-card px-4 py-2.5 text-sm">
            <span className="font-medium">Diagnóstico criado</span>
            <span className="ml-2 text-xs text-muted-foreground">{formatarData(d.criadaEm)}</span>
          </li>
          {detalhe.historico.map((h) => (
            <li key={h.id} className="rounded-lg border bg-card px-4 py-2.5 text-sm">
              <span className="font-medium">{ROTULO_ACAO_HISTORICO[h.acao] ?? h.acao}</span>
              {h.statusDe && h.statusPara && (
                <span className="text-xs text-muted-foreground">
                  {' '}· {STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[h.statusDe as StatusDiagnosticoDescobertaOp] ?? h.statusDe} → {STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[h.statusPara as StatusDiagnosticoDescobertaOp] ?? h.statusPara}
                </span>
              )}
              <span className="ml-2 text-xs text-muted-foreground">{formatarData(h.criadoEm)}</span>
              {h.criadoPorEmail && (
                <span className="block text-[11px] text-muted-foreground/60">por {h.criadoPorEmail}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
