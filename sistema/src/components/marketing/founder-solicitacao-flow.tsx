'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Pencil, MessageCircle } from 'lucide-react'
import {
  founderSolicitacaoSchema,
  EQUIPE_FOUNDER_OPCOES,
  rotuloEquipeFounder,
  type FounderSolicitacaoInput,
} from '@/lib/validations'

type Etapa = 'apresentacao' | 'empresa' | 'realidade' | 'founder' | 'revisar' | 'sucesso'

const ETAPAS_FORMULARIO = ['empresa', 'realidade', 'founder', 'revisar'] as const
const ROTULO_ETAPA: Record<(typeof ETAPAS_FORMULARIO)[number], string> = {
  empresa: 'Empresa',
  realidade: 'Realidade',
  founder: 'Founder',
  revisar: 'Revisar',
}

const DADOS_INICIAIS: FounderSolicitacaoInput = {
  nomeEmpresa: '',
  responsavel: '',
  segmento: '',
  cidadeRegiao: '',
  equipe: null,
  oQueEmpresaFaz: '',
  principalDesafio: '',
  gostariaEnxergar: '',
  motivacao: '',
}

const BENEFICIOS = [
  { titulo: 'Canal direto com a equipe', descricao: 'Suas dúvidas, ideias e dificuldades chegam direto em quem constrói.' },
  { titulo: 'Prioridade de aprendizado', descricao: 'Sua empresa participa primeiro das novidades que nascem da Ponte.' },
  { titulo: 'Participação nas validações', descricao: 'Você decide, com uso real, o que a Ponte vai se tornar.' },
  { titulo: 'Reconhecimento histórico', descricao: 'Seu número, sua empresa e sua história ficam registrados para sempre.' },
  { titulo: 'Parte da construção', descricao: 'Sua empresa entra como parte da fundação de uma nova forma de administrar.' },
]

const inputClass =
  'w-full rounded-xl border border-night-700/70 bg-night-surf/60 px-4 py-3 text-sm text-night-text placeholder:text-night-text-dim/60 transition-colors focus:border-night-azure/70 focus:bg-night-800/50 focus:outline-none focus:ring-2 focus:ring-night-azure/25'

const labelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-wider text-night-text-soft'

const erroClass = 'mt-1.5 text-xs leading-relaxed text-night-azure-soft'

export function FounderSolicitacaoFlow() {
  const [etapa, setEtapa] = useState<Etapa>('apresentacao')
  const [dados, setDados] = useState<FounderSolicitacaoInput>(DADOS_INICIAIS)
  const [erros, setErros] = useState<Partial<Record<keyof FounderSolicitacaoInput, string>>>({})
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState<string | null>(null)
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)

  const atualizar = useCallback(<K extends keyof FounderSolicitacaoInput>(campo: K, valor: FounderSolicitacaoInput[K]) => {
    setDados((atual) => ({ ...atual, [campo]: valor }))
    setErros((atual) => {
      if (!(campo in atual)) return atual
      const { [campo]: _removido, ...resto } = atual
      return resto
    })
  }, [])

  const validarEtapa = useCallback(
    (etapa: (typeof ETAPAS_FORMULARIO)[number]): boolean => {
      const camposPorEtapa = {
        empresa: ['nomeEmpresa', 'responsavel', 'segmento', 'cidadeRegiao'],
        realidade: ['oQueEmpresaFaz', 'principalDesafio', 'gostariaEnxergar'],
        founder: ['motivacao'],
        revisar: [],
      } as const

      const campos = camposPorEtapa[etapa]
      const schemaParcial = founderSolicitacaoSchema.pick(
        Object.fromEntries(campos.map((c) => [c, true])) as Record<(typeof campos)[number], true>
      )
      const parsed = schemaParcial.safeParse(dados)

      if (parsed.success) {
        setErros({})
        return true
      }

      const campoErros = parsed.error.flatten().fieldErrors
      const novosErros: Partial<Record<keyof FounderSolicitacaoInput, string>> = {}
      for (const campo of campos) {
        const msg = campoErros[campo]?.[0]
        if (msg) novosErros[campo] = msg
      }
      setErros(novosErros)
      return Object.keys(novosErros).length === 0
    },
    [dados]
  )

  const proximaEtapa = useCallback(() => {
    if (etapa === 'apresentacao') {
      setEtapa('empresa')
      return
    }
    if (etapa === 'empresa') {
      if (validarEtapa('empresa')) setEtapa('realidade')
      return
    }
    if (etapa === 'realidade') {
      if (validarEtapa('realidade')) setEtapa('founder')
      return
    }
    if (etapa === 'founder') {
      if (validarEtapa('founder')) setEtapa('revisar')
      return
    }
  }, [etapa, validarEtapa])

  const voltar = useCallback(() => {
    setErros({})
    setErroEnvio(null)
    const ordem: Etapa[] = ['apresentacao', 'empresa', 'realidade', 'founder', 'revisar']
    const idx = ordem.indexOf(etapa)
    setEtapa(ordem[Math.max(0, idx - 1)])
  }, [etapa])

  const irParaEtapa = useCallback(
    (alvo: (typeof ETAPAS_FORMULARIO)[number]) => {
      setErros({})
      setErroEnvio(null)
      setEtapa(alvo)
    },
    []
  )

  const enviar = useCallback(async () => {
    if (enviando) return
    const completo = founderSolicitacaoSchema.safeParse(dados)
    if (!completo.success) {
      setErros({
        nomeEmpresa: completo.error.flatten().fieldErrors.nomeEmpresa?.[0],
        responsavel: completo.error.flatten().fieldErrors.responsavel?.[0],
        segmento: completo.error.flatten().fieldErrors.segmento?.[0],
        cidadeRegiao: completo.error.flatten().fieldErrors.cidadeRegiao?.[0],
        oQueEmpresaFaz: completo.error.flatten().fieldErrors.oQueEmpresaFaz?.[0],
        principalDesafio: completo.error.flatten().fieldErrors.principalDesafio?.[0],
        gostariaEnxergar: completo.error.flatten().fieldErrors.gostariaEnxergar?.[0],
        motivacao: completo.error.flatten().fieldErrors.motivacao?.[0],
      })
      setEtapa('revisar')
      return
    }

    setEnviando(true)
    setErroEnvio(null)

    try {
      const resposta = await fetch('/api/founder/solicitar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completo.data),
      })

      const corpo = await resposta.json().catch(() => null)

      if (!resposta.ok) {
        setErroEnvio(
          'Não conseguimos registrar sua solicitação agora. Tente novamente em instantes.'
        )
        return
      }

      const url = (corpo?.data as { whatsappUrl?: string } | undefined)?.whatsappUrl
      if (!url) {
        setErroEnvio(
          'Não conseguimos registrar sua solicitação agora. Tente novamente em instantes.'
        )
        return
      }

      setWhatsappUrl(url)
      setEtapa('sucesso')
      // Abre o WhatsApp SÓ depois de a solicitação ter sido salva.
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch {
      setErroEnvio(
        'Não conseguimos registrar sua solicitação agora. Tente novamente em instantes.'
      )
    } finally {
      setEnviando(false)
    }
  }, [dados, enviando])

  const indiceEtapaAtual = useMemo(() => {
    if (etapa === 'apresentacao' || etapa === 'sucesso') return -1
    return ETAPAS_FORMULARIO.indexOf(etapa as (typeof ETAPAS_FORMULARIO)[number])
  }, [etapa])

  if (etapa === 'apresentacao') {
    return <Apresentacao aoProsseguir={() => setEtapa('empresa')} />
  }

  if (etapa === 'sucesso') {
    return (
      <Sucesso
        dados={dados}
        whatsappUrl={whatsappUrl}
        aoRevisar={() => setEtapa('revisar')}
      />
    )
  }

  return (
    <div className="bg-landing-night flex min-h-screen flex-col text-night-text">
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        {/* Cabeçalho do fluxo */}
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
            Tornar-se Founder
          </p>
          <h1 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text sm:text-4xl">
            {ROTULO_ETAPA[etapa as (typeof ETAPAS_FORMULARIO)[number]]}
          </h1>
        </div>

        {/* Progresso — versão desktop */}
        <nav className="mt-8 hidden items-center justify-center gap-2 sm:flex" aria-label="Progresso do formulário">
          {ETAPAS_FORMULARIO.map((e, i) => {
            const ativa = i === indiceEtapaAtual
            const concluida = i < indiceEtapaAtual
            return (
              <div key={e} className="flex items-center gap-2">
                {i > 0 && <span className="h-px w-6 bg-night-700/70" aria-hidden="true" />}
                <button
                  type="button"
                  onClick={() => concluida && irParaEtapa(e)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                    ativa
                      ? 'border-night-azure/60 bg-night-surf text-night-text'
                      : concluida
                        ? 'border-night-green/50 bg-night-800/50 text-night-text-soft hover:border-night-azure/50'
                        : 'border-night-700/60 bg-night-900/40 text-night-text-dim'
                  }`}
                  aria-current={ativa ? 'step' : undefined}
                >
                  {concluida ? <Check className="h-3 w-3 text-night-green-bright" /> : <span>{String(i + 1).padStart(2, '0')}</span>}
                  {ROTULO_ETAPA[e]}
                </button>
              </div>
            )
          })}
        </nav>

        {/* Progresso — versão mobile compacta */}
        <nav className="mt-6 flex items-center gap-2 sm:hidden" aria-label="Progresso do formulário">
          <span className="text-xs font-semibold text-night-text">
            {String(indiceEtapaAtual + 1).padStart(2, '0')}
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-night-800">
            <div
              className="h-full rounded-full bg-night-azure transition-all duration-300"
              style={{ width: `${((indiceEtapaAtual + 1) / ETAPAS_FORMULARIO.length) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-night-text-dim">
            {ROTULO_ETAPA[etapa as (typeof ETAPAS_FORMULARIO)[number]]}
          </span>
        </nav>

        {/* Conteúdo da etapa */}
        <div className="mt-8 space-y-5 animate-fade-in">
          {etapa === 'empresa' && (
            <div className="space-y-5">
              <Campo
                label="Nome da empresa"
                obrigatorio
                erro={erros.nomeEmpresa}
                input={
                  <input
                    className={inputClass}
                    value={dados.nomeEmpresa}
                    onChange={(e) => atualizar('nomeEmpresa', e.target.value)}
                    placeholder="Como sua empresa se chama?"
                    maxLength={120}
                  />
                }
              />
              <Campo
                label="Responsável"
                obrigatorio
                erro={erros.responsavel}
                input={
                  <input
                    className={inputClass}
                    value={dados.responsavel}
                    onChange={(e) => atualizar('responsavel', e.target.value)}
                    placeholder="Quem responde por ela?"
                    maxLength={120}
                  />
                }
              />
              <Campo
                label="Segmento"
                obrigatorio
                erro={erros.segmento}
                input={
                  <input
                    className={inputClass}
                    value={dados.segmento}
                    onChange={(e) => atualizar('segmento', e.target.value)}
                    placeholder="Ex.: alimentação, construção, serviços..."
                    maxLength={80}
                  />
                }
              />
              <Campo
                label="Cidade / região"
                obrigatorio
                erro={erros.cidadeRegiao}
                input={
                  <input
                    className={inputClass}
                    value={dados.cidadeRegiao}
                    onChange={(e) => atualizar('cidadeRegiao', e.target.value)}
                    placeholder="Onde a empresa atua?"
                    maxLength={120}
                  />
                }
              />

              <div>
                <span className={labelClass}>Tamanho da equipe <span className="normal-case text-night-text-dim">(opcional)</span></span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {EQUIPE_FOUNDER_OPCOES.map((opcao) => {
                    const selecionada = dados.equipe === opcao.chave
                    return (
                      <button
                        key={opcao.chave}
                        type="button"
                        onClick={() => atualizar('equipe', selecionada ? null : opcao.chave)}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
                          selecionada
                            ? 'border-night-green/70 bg-night-green/15 text-night-green-bright'
                            : 'border-night-700/70 bg-night-surf/40 text-night-text-soft hover:border-night-azure/50 hover:text-night-text'
                        }`}
                        aria-pressed={selecionada}
                      >
                        {opcao.rotulo}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {etapa === 'realidade' && (
            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-night-text-soft">
                Conte como as coisas são hoje. Não existe resposta certa — quanto mais real, melhor para começarmos.
              </p>
              <Campo
                label="O que sua empresa faz?"
                obrigatorio
                erro={erros.oQueEmpresaFaz}
                input={
                  <textarea
                    className={`${inputClass} min-h-[110px] resize-none`}
                    value={dados.oQueEmpresaFaz}
                    onChange={(e) => atualizar('oQueEmpresaFaz', e.target.value)}
                    placeholder="O que vocês entregam, para quem, como..."
                    maxLength={4000}
                  />
                }
              />
              <Campo
                label="Qual é o principal desafio hoje?"
                obrigatorio
                erro={erros.principalDesafio}
                input={
                  <textarea
                    className={`${inputClass} min-h-[110px] resize-none`}
                    value={dados.principalDesafio}
                    onChange={(e) => atualizar('principalDesafio', e.target.value)}
                    placeholder="O que mais pesa agora?"
                    maxLength={4000}
                  />
                }
              />
              <Campo
                label="O que você gostaria de enxergar melhor?"
                obrigatorio
                erro={erros.gostariaEnxergar}
                input={
                  <textarea
                    className={`${inputClass} min-h-[110px] resize-none`}
                    value={dados.gostariaEnxergar}
                    onChange={(e) => atualizar('gostariaEnxergar', e.target.value)}
                    placeholder="O que hoje é invisível ou espalhado?"
                    maxLength={4000}
                  />
                }
              />
            </div>
          )}

          {etapa === 'founder' && (
            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-night-text-soft">
                O convite Founder é sobre construir algo — não sobre receber uma vantagem. Por isso queremos entender seu porquê.
              </p>
              <Campo
                label="Por que você quer se tornar Founder?"
                obrigatorio
                erro={erros.motivacao}
                input={
                  <textarea
                    className={`${inputClass} min-h-[150px] resize-none`}
                    value={dados.motivacao}
                    onChange={(e) => atualizar('motivacao', e.target.value)}
                    placeholder="O que te trouxe até aqui?"
                    maxLength={4000}
                  />
                }
              />
            </div>
          )}

          {etapa === 'revisar' && (
            <div className="space-y-4">
              <BlocoRevisao
                titulo="Sua empresa"
                aoEditar={() => irParaEtapa('empresa')}
                linhas={[
                  { rotulo: 'Nome', valor: dados.nomeEmpresa },
                  { rotulo: 'Responsável', valor: dados.responsavel },
                  { rotulo: 'Segmento', valor: dados.segmento },
                  { rotulo: 'Cidade / região', valor: dados.cidadeRegiao },
                  { rotulo: 'Equipe', valor: rotuloEquipeFounder(dados.equipe) ?? 'Não informado' },
                ]}
              />
              <BlocoRevisao
                titulo="Sua realidade"
                aoEditar={() => irParaEtapa('realidade')}
                linhas={[
                  { rotulo: 'O que a empresa faz', valor: dados.oQueEmpresaFaz },
                  { rotulo: 'Principal desafio', valor: dados.principalDesafio },
                  { rotulo: 'Quer enxergar', valor: dados.gostariaEnxergar },
                ]}
              />
              <BlocoRevisao
                titulo="Sua motivação"
                aoEditar={() => irParaEtapa('founder')}
                linhas={[{ rotulo: 'Por que Founder', valor: dados.motivacao }]}
              />

              {erroEnvio && (
                <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs leading-relaxed text-red-200">
                  {erroEnvio}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={voltar}
            className="inline-flex items-center gap-1.5 rounded-xl border border-night-700/70 bg-night-surf/40 px-4 py-3 text-sm font-medium text-night-text-soft transition-colors hover:border-night-azure/50 hover:text-night-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          {etapa === 'revisar' ? (
            <button
              type="button"
              onClick={enviar}
              disabled={enviando}
              className="inline-flex items-center gap-2 rounded-xl bg-night-azure px-6 py-3 text-sm font-medium text-night-light-foreground transition-colors hover:bg-night-mist disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enviando ? 'Registrando...' : 'Enviar solicitação'}
              {!enviando && <ArrowRight className="h-4 w-4" />}
            </button>
          ) : (
            <button
              type="button"
              onClick={proximaEtapa}
              className="inline-flex items-center gap-2 rounded-xl bg-night-azure px-6 py-3 text-sm font-medium text-night-light-foreground transition-colors hover:bg-night-mist"
            >
              Continuar
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Campo({
  label,
  obrigatorio,
  erro,
  input,
}: {
  label: string
  obrigatorio?: boolean
  erro?: string
  input: React.ReactNode
}) {
  return (
    <div>
      <span className={labelClass}>
        {label} {obrigatorio && <span className="text-night-azure-soft">*</span>}
      </span>
      {input}
      {erro && <p className={erroClass}>{erro}</p>}
    </div>
  )
}

function BlocoRevisao({
  titulo,
  aoEditar,
  linhas,
}: {
  titulo: string
  aoEditar: () => void
  linhas: { rotulo: string; valor: string }[]
}) {
  return (
    <div className="balloon p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-night-teal">{titulo}</p>
        <button
          type="button"
          onClick={aoEditar}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-night-text-soft transition-colors hover:text-night-text"
        >
          <Pencil className="h-3 w-3" />
          Editar
        </button>
      </div>
      <dl className="mt-3 space-y-3">
        {linhas.map((linha) => (
          <div key={linha.rotulo} className="space-y-0.5">
            <dt className="text-[10px] uppercase tracking-wider text-night-text-dim">{linha.rotulo}</dt>
            <dd className="whitespace-pre-wrap text-sm leading-relaxed text-night-text">{linha.valor}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Apresentacao({ aoProsseguir }: { aoProsseguir: () => void }) {
  return (
    <div className="bg-landing-night flex min-h-screen flex-col text-night-text">
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 sm:py-16">
        <div className="text-center space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
            Ponte Digital
          </p>
          <h1 className="font-editorial text-3xl font-light leading-[1.18] tracking-tight text-night-text sm:text-5xl">
            Construa a Ponte Digital <span className="italic text-night-mist">conosco.</span>
          </h1>
          <p className="mx-auto max-w-md text-base leading-relaxed text-night-text-soft">
            Você não está apenas usando uma plataforma. Está participando da construção
            de uma nova forma de administrar empresas.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {BENEFICIOS.map((b) => (
            <div key={b.titulo} className="balloon p-5">
              <p className="text-sm font-semibold text-night-text">{b.titulo}</p>
              <p className="mt-1 text-sm leading-relaxed text-night-text-soft">{b.descricao}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-night-700/60 bg-night-900/40 p-5">
          <p className="text-xs leading-relaxed text-night-text-dim">
            Ser Founder não é uma compra — é uma evolução. Contamos com você para começar.
            Não é preciso cadastro: você nos conta sobre sua empresa e seguimos pelo WhatsApp.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={aoProsseguir}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-night-azure px-7 py-3.5 text-sm font-medium text-night-light-foreground transition-colors hover:bg-night-mist sm:w-auto"
          >
            Começar
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl border border-night-700/70 bg-night-surf/40 px-7 py-3.5 text-sm font-medium text-night-text-soft transition-colors hover:border-night-azure/50 hover:text-night-text sm:w-auto"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}

function Sucesso({
  dados,
  whatsappUrl,
  aoRevisar,
}: {
  dados: FounderSolicitacaoInput
  whatsappUrl: string | null
  aoRevisar: () => void
}) {
  return (
    <div className="bg-landing-night flex min-h-screen flex-col text-night-text">
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-green-bright">
            Solicitação registrada
          </p>
          <h1 className="font-editorial text-3xl font-light leading-tight text-night-text sm:text-4xl">
            Obrigado, {dados.responsavel.split(' ')[0]}. Seu pedido está conosco.
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-night-text-soft">
            Registramos sua solicitação. Na próxima etapa conversamos direto pelo WhatsApp
            para conhecer sua empresa melhor.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="balloon p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-night-teal">Resumo enviado</p>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-night-text-dim">Empresa</dt>
                <dd className="text-sm leading-relaxed text-night-text">{dados.nomeEmpresa} — {dados.cidadeRegiao}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wider text-night-text-dim">Motivação</dt>
                <dd className="whitespace-pre-wrap text-sm leading-relaxed text-night-text">{dados.motivacao}</dd>
              </div>
            </dl>
          </div>

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-night-green px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-night-green-soft"
            >
              <MessageCircle className="h-4 w-4" />
              Abrir WhatsApp
            </a>
          )}

          <button
            type="button"
            onClick={aoRevisar}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-night-700/70 bg-night-surf/40 px-7 py-3.5 text-sm font-medium text-night-text-soft transition-colors hover:border-night-azure/50 hover:text-night-text"
          >
            <Pencil className="h-4 w-4" />
            Revisar meus dados
          </button>

          <Link
            href="/"
            className="block text-center text-xs text-night-text-dim transition-colors hover:text-night-text-soft"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
