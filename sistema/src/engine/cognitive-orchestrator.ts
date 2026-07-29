// ─────────────────────────────────────────────────────────────────────────────
// COGNITIVE ORCHESTRATOR
//
// Papel: coordenar a Infraestrutura Cognitiva como um único organismo.
// Não cria conhecimento. Não interpreta. Não decide. Apenas coordena.
//
// ─────────────────────────────────────────────────────────────────────────────

import type { TipoFeedbackAcao, CategoriaOutcome, CategoriaEvidencia, OrigemOutcome, ConfiancaEvidencia, OrigemAcao } from '@prisma/client'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { randomUUID } from 'crypto'
import { EVENTOS_NEGOCIO, EVENTOS_COGNITIVOS, EVENTOS_ENTRADA, EVENTOS_SAIDA } from './event-catalog'
import { decidirContexto } from './cognitive-context-engine'
import { calcularNivelAtivacao } from './founder-activation-engine'
import { featureFlags } from './feature-flags'
import { PipelineComparator } from './pipeline-comparator'
import type { LegacyStep } from './pipeline-comparator'
import { criarEventPublisherPersistente } from './event-store'
import { createLogger } from '@/lib/logger'
import {
  registrarInicioCiclo,
  registrarEtapaCiclo,
  registrarFinalizacaoCiclo,
  registrarFalhaCiclo,
} from '@/lib/cognitive-pipeline-store'

const log = createLogger('engine', 'orchestrator')

const eventBusPublisher = criarEventPublisherPersistente()
const pipelineComparator = new PipelineComparator()

async function registrarCicloSeguro(
  fn: () => Promise<unknown>,
  contexto: string,
  empresaId: string,
  correlationId?: string
): Promise<void> {
  try {
    await fn()
  } catch (err) {
    log.error(`Falha ao registrar ${contexto} do ciclo cognitivo`, {
      empresaId,
      correlationId,
      error: err instanceof Error ? err : undefined,
    })
  }
}

import { construirIdentidade } from './identity-engine'
import { melhorDecisao } from './decision-engine'
import type { Decisao } from './decision-engine'
import type { DecisaoContexto } from './cognitive-context-engine'
import { listarAcoesAtivas } from './action-intelligence-engine'
import { listarFeedbackRecente } from './feedback-intelligence-engine'
import { registrarFeedback } from './feedback-intelligence-engine'
import { obterJornadaFundador, registrarEventoAtivacao } from './founder-activation-engine'
import type { JornadaFundador } from './founder-activation-engine'
import { calcularImpactoEmpresa, principaisOutcomes, registrarOutcome } from './outcome-intelligence-engine'
import type { ImpactoEmpresa } from './outcome-intelligence-engine'
import { auditarConhecimento, validarHipoteses, promoverConhecimento } from './knowledge-governance-engine'
import type { AuditoriaConhecimento } from './knowledge-governance-engine'
import { obterResumoCognitivo, obterAlertasGovernanca } from './cognitive-observatory'
import { registrarEvidencia } from './evidence-engine'
import { registrarNaMemoria } from './cognitive-memory-engine'
import { criarAcao } from './action-intelligence-engine'
import { obterRespostas, vincularConversa } from './conversation-engine'
import { interpretarRespostas, atualizarIdentidade, registrarHistoricoConversa } from './identity-engine'
import { obterProximaPergunta } from './adaptive-question-engine'
import { gerarHipotesesDeEvidencias } from './hypothesis-engine'
import { aprenderComResposta } from './aprendizado-service'

// ─── Tipos do Orchestrator ────────────────────────────────────────────────

export interface EstadoCognitivoCompleto {
  contexto: DecisaoContexto | null
  identidade: Awaited<ReturnType<typeof construirIdentidade>> | null
  decisao: Decisao | null
  acoesAtivas: Awaited<ReturnType<typeof listarAcoesAtivas>>
  feedbackRecente: Awaited<ReturnType<typeof listarFeedbackRecente>>
  jornada: JornadaFundador
  impacto: ImpactoEmpresa
  topOutcomes: Awaited<ReturnType<typeof principaisOutcomes>>
  auditoria: AuditoriaConhecimento | null
}

export interface ResultadoProcessamento {
  sucesso: boolean
  evento: string
  empresaId: string
  acionamentos: string[]
  erros: string[]
  estado?: Partial<EstadoCognitivoCompleto>
}

// ─── 1. ESTADO COGNITIVO COMPLETO ─────────────────────────────────────────
// Ponto único de entrada para dashboards, assistente, etc.
// Substitui chamadas espalhadas para 8+ engines.

const JORNADA_PADRAO = {
  nivel: 'NOVO' as const,
  progresso: 0,
  eventos: [] as string[],
  proximosPassos: ['Realizar a Primeira Conversa'],
}

export async function obterEstadoCognitivoCompleto(
  empresaId: string,
  opcoes?: { incluirAuditoria?: boolean; registrarVisualizacao?: boolean; skipDecidirContexto?: boolean; skipCalcularNivelAtivacao?: boolean }
): Promise<EstadoCognitivoCompleto> {
  const contextoPadrao: DecisaoContexto = {
    prioridade: 'GESTAO',
    motivo: 'Vamos conhecer sua empresa?',
    confianca: 0,
    evidenciasChave: [],
    setoresEstaveis: [],
    mudancasRecentes: [],
  }

  const [
    contexto,
    identidade,
    decisao,
    acoesAtivas,
    feedbackRecente,
    jornada,
    impacto,
    topOutcomes,
    auditoria,
  ] = await Promise.all([
    opcoes?.skipDecidirContexto
      ? Promise.resolve(contextoPadrao)
      : decidirContexto(empresaId).catch(() => contextoPadrao),
    construirIdentidade(empresaId).catch(() => null),
    melhorDecisao(empresaId).catch(() => null),
    listarAcoesAtivas(empresaId).catch(() => []),
    listarFeedbackRecente(empresaId).catch(() => []),
    opcoes?.skipCalcularNivelAtivacao
      ? Promise.resolve(JORNADA_PADRAO)
      : obterJornadaFundador(empresaId).catch(() => JORNADA_PADRAO),
    calcularImpactoEmpresa(empresaId).catch(() => ({
      mudancasPositivas: [],
      mudancasNegativas: [],
      permaneceuIgual: [],
      areaMaisEvoluiu: null,
      areaAtencao: null,
      evolucaoGeral: 0,
    })),
    principaisOutcomes(empresaId, 5).catch(() => []),
    opcoes?.incluirAuditoria
      ? auditarConhecimento(empresaId).catch(() => null)
      : Promise.resolve(null),
  ])

  if (decisao && opcoes?.registrarVisualizacao) {
    void registrarEventoAtivacao(empresaId, 'PRIMEIRA_DECISAO_VISTA', { decisaoId: decisao.id })
      .catch((err) => log.error('Erro ao registrar PRIMEIRA_DECISAO_VISTA (obterEstadoCognitivoCompleto)', { error: err instanceof Error ? err : undefined }))
  }

  void eventBusPublisher.publish({
    eventType: EVENTOS_SAIDA.CONTEXTO_ATUALIZADO,
    aggregateId: empresaId,
    aggregateType: 'Empresa',
    data: { contexto, decisaoId: decisao?.id },
    tenantId: empresaId,
    correlationId: randomUUID(),
  })

  return {
    contexto,
    identidade,
    decisao,
    acoesAtivas,
    feedbackRecente,
    jornada,
    impacto,
    topOutcomes,
    auditoria,
  }
}

// ─── 2. PROCESSAR CONVERSA ────────────────────────────────────────────────
// Dispara após a Primeira Conversa ser concluída:
//   evidence → memory → identity → context → decision → action

export async function processarConversa(
  empresaId: string,
  token: string
): Promise<ResultadoProcessamento> {
  const acionamentos: string[] = []
  const erros: string[] = []

  let cicloIniciado = false
  let diagnosticoCorrelationId = ''

  try {
    const respostas = await obterRespostas(token)
    acionamentos.push('conversation:obterRespostas')

    await vincularConversa(token, empresaId)
    acionamentos.push('conversation:vincularConversa')

    await registrarEvidencia(empresaId, {
      categoria: 'ESTRATEGIA',
      origem: 'PRIMEIRA_CONVERSA',
      descricao: 'Empresa criou conta após realizar a Primeira Conversa',
      confianca: 'ALTA',
    })
    acionamentos.push('evidence:registrarEvidencia')

    const interpretacoes = await interpretarRespostas(respostas)
    acionamentos.push('identity:interpretarRespostas')

    const identidade = await atualizarIdentidade(empresaId, respostas, interpretacoes)
    acionamentos.push('identity:atualizarIdentidade')

    void eventBusPublisher.publish({
      eventType: EVENTOS_NEGOCIO.IDENTIDADE_CRIADA,
      aggregateId: empresaId,
      aggregateType: 'Empresa',
      data: { identidadeId: identidade.id },
      tenantId: empresaId,
      correlationId: randomUUID(),
    })

    await registrarHistoricoConversa(empresaId, identidade.id, respostas, interpretacoes)
    acionamentos.push('identity:registrarHistoricoConversa')

    await registrarNaMemoria(empresaId, {
      tipo: 'evolucao',
      descricao: 'Primeira Conversa concluída — identidade digital criada',
      categoria: 'ESTRATEGIA',
      versao: 1,
      metadados: { interpretacoes },
    })
    acionamentos.push('memory:registrarNaMemoria')

    await registrarEventoAtivacao(empresaId, 'IDENTIDADE_CRIADA', { identidadeId: identidade.id })
    await registrarEventoAtivacao(empresaId, 'DIAGNOSTICO_COMPLETO', {})
    acionamentos.push('activation:registrarEventoAtivacao (2)')

    diagnosticoCorrelationId = randomUUID()
    cicloIniciado = true
    const inicioDecisao = Date.now()

    await registrarCicloSeguro(
      () => registrarInicioCiclo(empresaId, 'processarConversa', diagnosticoCorrelationId, {
        origem: 'primeira-conversa',
        tipoExecucao: 'manual',
      }),
      'inicio', empresaId, diagnosticoCorrelationId
    )

    await eventBusPublisher.publish({
      eventType: EVENTOS_NEGOCIO.DIAGNOSTICO_CONCLUIDO,
      aggregateId: empresaId,
      aggregateType: 'Empresa',
      data: {},
      tenantId: empresaId,
      correlationId: diagnosticoCorrelationId,
    })

    const usarPipeline = featureFlags.isEnabled('useCognitivePipeline')
    const legacySteps: LegacyStep[] = []

    if (usarPipeline) {
      acionamentos.push('pipeline:handlerDiagnosticoPipeline (via subscriber)')
      acionamentos.push('pipeline:handlerContextoPipeline (via subscriber)')
    } else {
      const inicioDecisaoStep = new Date().toISOString()
      const contexto = await decidirContexto(empresaId).catch(() => null)
      const terminadoDecisaoStep = new Date().toISOString()
      const duracaoDecisao = Date.now() - inicioDecisao
      acionamentos.push('context:decidirContexto')
      await registrarCicloSeguro(
        () => registrarEtapaCiclo(empresaId, diagnosticoCorrelationId, {
          nome: 'decidirContexto',
          ordem: 1,
          status: contexto !== null ? 'sucesso' : 'falha',
          duracaoMs: duracaoDecisao,
          erro: contexto === null ? 'decidirContexto retornou null' : undefined,
          engine: 'cognitive-context-engine',
          iniciadoEm: inicioDecisaoStep,
          terminadoEm: terminadoDecisaoStep,
        }),
        'etapa:decidirContexto', empresaId, diagnosticoCorrelationId
      )
      legacySteps.push({
        step: 1,
        eventType: 'DIAGNOSTICO_CONCLUIDO',
        handler: 'orchestrator:decidirContexto',
        duration: duracaoDecisao,
        success: contexto !== null,
        payload: { contexto, empresaId },
      })

      const inicioAtivacao = Date.now()
      const inicioAtivacaoStep = new Date().toISOString()
      const nivel = await calcularNivelAtivacao(empresaId).catch(() => null)
      const terminadoAtivacaoStep = new Date().toISOString()
      const duracaoAtivacao = Date.now() - inicioAtivacao
      acionamentos.push('activation:calcularNivelAtivacao')
      await registrarCicloSeguro(
        () => registrarEtapaCiclo(empresaId, diagnosticoCorrelationId, {
          nome: 'calcularNivelAtivacao',
          ordem: 2,
          status: nivel !== null ? 'sucesso' : 'falha',
          duracaoMs: duracaoAtivacao,
          erro: nivel === null ? 'calcularNivelAtivacao retornou null' : undefined,
          engine: 'founder-activation-engine',
          iniciadoEm: inicioAtivacaoStep,
          terminadoEm: terminadoAtivacaoStep,
        }),
        'etapa:calcularNivelAtivacao', empresaId, diagnosticoCorrelationId
      )
      legacySteps.push({
        step: 2,
        eventType: 'CONTEXTO_ATUALIZADO',
        handler: 'orchestrator:calcularNivelAtivacao',
        duration: duracaoAtivacao,
        success: nivel !== null,
        payload: { nivel, empresaId },
      })
    }

    pipelineComparator.comparar(diagnosticoCorrelationId, legacySteps)
    acionamentos.push(`comparator:comparar(${diagnosticoCorrelationId.slice(0, 8)}…)`)
    await registrarCicloSeguro(
      () => registrarFinalizacaoCiclo(empresaId, diagnosticoCorrelationId, 'CONCLUIDO', Date.now() - inicioDecisao, erros),
      'finalizacao', empresaId, diagnosticoCorrelationId
    )

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    erros.push(msg)
    if (cicloIniciado) {
      await registrarCicloSeguro(
        () => registrarFalhaCiclo(empresaId, diagnosticoCorrelationId, 'processarConversa', msg),
        'falha', empresaId, diagnosticoCorrelationId
      )
    }
  }

  return {
    sucesso: erros.length === 0,
    evento: 'CONVERSA_PROCESSADA',
    empresaId,
    acionamentos,
    erros,
    estado: erros.length === 0
      ? await obterEstadoCognitivoCompleto(empresaId, { skipDecidirContexto: true, skipCalcularNivelAtivacao: true }).catch(() => undefined)
      : undefined,
  }
}

// ─── 2B. PROCESSAR RESPOSTA ADAPTATIVA ────────────────────────────────────
// Dispara após cada resposta do usuário em conversa adaptativa:
// evidence → memory → adaptive-question

export async function processarNovaResposta(
  empresaId: string,
  perguntaId: string,
  valor: string
): Promise<ResultadoProcessamento> {
  const acionamentos: string[] = []
  const erros: string[] = []

  try {
    await registrarEvidencia(empresaId, {
      categoria: 'GESTAO',
      origem: 'PRIMEIRA_CONVERSA',
      descricao: `Nova resposta registrada: ${valor.slice(0, 120)}`,
      confianca: 'ALTA',
      dados: { perguntaId },
    })
    acionamentos.push('evidence:registrarEvidencia')

    await registrarNaMemoria(empresaId, {
      tipo: 'evolucao',
      descricao: `Resposta registrada para: ${perguntaId}`,
      categoria: 'GESTAO',
      versao: 1,
      metadados: { perguntaId, valor: valor.slice(0, 200) },
    })
    acionamentos.push('memory:registrarNaMemoria')

    void aprenderComResposta(empresaId, perguntaId, perguntaId, valor).catch(() => {})
    acionamentos.push('learning:aprenderComResposta')

    const proximaPergunta = await obterProximaPergunta(empresaId)
    if (proximaPergunta) {
      acionamentos.push(`adaptive-question:${proximaPergunta.id}`)

      await registrarNaMemoria(empresaId, {
        tipo: 'descoberta',
        descricao: `Próxima pergunta adaptativa gerada: ${proximaPergunta.categoria}`,
        categoria: proximaPergunta.categoria,
        versao: 1,
        metadados: { perguntaId: proximaPergunta.id, lacuna: proximaPergunta.lacuna },
      })
    } else {
      acionamentos.push('adaptive-question:complete')
    }

    void gerarHipotesesDeEvidencias(empresaId).catch(() => {})
    acionamentos.push('hypothesis:gerarDeEvidencias')

    void validarHipoteses(empresaId).then(async (validacoes) => {
      for (const v of validacoes) {
        if (v.podePromover) {
          await promoverConhecimento(empresaId, v.hipoteseId, v.scoreConfianca)
            .catch(() => {})
        }
      }
    }).catch(() => {})
    acionamentos.push('knowledge:validarEPromover')

    void eventBusPublisher.publish({
      eventType: EVENTOS_COGNITIVOS.DECISAO_TOMADA,
      aggregateId: empresaId,
      aggregateType: 'Empresa',
      data: { tipo: 'RESPOSTA_REGISTRADA', perguntaId },
      tenantId: empresaId,
      correlationId: randomUUID(),
    })
  } catch (err) {
    erros.push(err instanceof Error ? err.message : String(err))
  }

  return {
    sucesso: erros.length === 0,
    evento: 'RESPOSTA_PROCESSADA',
    empresaId,
    acionamentos,
    erros,
  }
}

// ─── 3. PROCESSAR AÇÃO ────────────────────────────────────────────────────
// Quando uma ação é criada/atualizada/concluída.

export async function processarAcao(
  empresaId: string,
  decisao: Decisao,
  origem?: string
): Promise<ResultadoProcessamento> {
  const acionamentos: string[] = []
  const erros: string[] = []

  try {
    const acao = await criarAcao(empresaId, decisao, origem as OrigemAcao)
    acionamentos.push('action:criarAcao')

    if (acao) {
      await registrarNaMemoria(empresaId, {
        tipo: 'confirmacao',
        descricao: `Nova ação criada: ${acao.titulo}`,
        categoria: decisao.categoria,
        versao: 1,
        metadados: { acaoId: acao.id, decisaoId: decisao.id },
      })
      acionamentos.push('memory:registrarNaMemoria')

      void eventBusPublisher.publish({
        eventType: EVENTOS_COGNITIVOS.DECISAO_TOMADA,
        aggregateId: acao.id,
        aggregateType: 'AcaoCognitiva',
        data: { decisaoId: decisao.id, titulo: acao.titulo },
        tenantId: empresaId,
        correlationId: randomUUID(),
      })

      const primeiroEventoAcao = await prisma.eventoAtivacao.findFirst({
        where: { empresaId, tipo: 'PRIMEIRA_ACAO_CRIADA' },
      })
      if (!primeiroEventoAcao) {
        await registrarEventoAtivacao(empresaId, 'PRIMEIRA_ACAO_CRIADA', { acaoId: acao.id })
        acionamentos.push('activation:registrarEventoAtivacao')
      }
    }
  } catch (err) {
    erros.push(err instanceof Error ? err.message : String(err))
  }

  return {
    sucesso: erros.length === 0,
    evento: 'ACAO_PROCESSADA',
    empresaId,
    acionamentos,
    erros,
  }
}

// ─── 4. PROCESSAR FEEDBACK ────────────────────────────────────────────────
// Quando um feedback de ação é recebido.
// Cicla: feedback → evidence → memory → hipótese → activation

export async function processarFeedback(
  empresaId: string,
  acaoId: string,
  tipo: TipoFeedbackAcao,
  comentario?: string
): Promise<ResultadoProcessamento> {
  const acionamentos: string[] = []
  const erros: string[] = []

  try {
    const feedback = await registrarFeedback(empresaId, acaoId, tipo, comentario)
    acionamentos.push('feedback:registrarFeedback')

    if (feedback) {
      await registrarEventoAtivacao(empresaId, 'PRIMEIRO_FEEDBACK', { feedbackId: feedback.id, tipo })
      acionamentos.push('activation:registrarEventoAtivacao')

      void eventBusPublisher.publish({
        eventType: tipo === 'AJUDOU' || tipo === 'AJUDOU_PARCIALMENTE' ? EVENTOS_COGNITIVOS.ACAO_AJUDOU : EVENTOS_COGNITIVOS.ACAO_NAO_FUNCIONOU,
        aggregateId: acaoId,
        aggregateType: 'FeedbackAcao',
        data: { tipo, feedbackId: feedback.id },
        tenantId: empresaId,
        correlationId: randomUUID(),
      })
    }
  } catch (err) {
    erros.push(err instanceof Error ? err.message : String(err))
  }

  return {
    sucesso: erros.length === 0,
    evento: 'FEEDBACK_PROCESSADO',
    empresaId,
    acionamentos,
    erros,
  }
}

// ─── 5. PROCESSAR OUTCOME ─────────────────────────────────────────────────
// Quando um novo outcome é registrado pela empresa.

export async function processarOutcome(
  empresaId: string,
  dados: {
    categoria: CategoriaOutcome
    origem: OrigemOutcome
    descricao: string
    detalhes?: Record<string, unknown>
    confianca?: ConfiancaEvidencia
  }
): Promise<ResultadoProcessamento> {
  const acionamentos: string[] = []
  const erros: string[] = []

  try {
    const outcome = await registrarOutcome(empresaId, {
      categoria: dados.categoria,
      origem: dados.origem,
      descricao: dados.descricao,
      detalhes: dados.detalhes,
      confianca: dados.confianca,
    })
    acionamentos.push('outcome:registrarOutcome')

    void eventBusPublisher.publish({
      eventType: EVENTOS_COGNITIVOS.RESULTADO_REGISTRADO,
      aggregateId: outcome.id,
      aggregateType: 'Outcome',
      data: { categoria: dados.categoria, descricao: dados.descricao },
      tenantId: empresaId,
      correlationId: randomUUID(),
    })

    await registrarNaMemoria(empresaId, {
      tipo: 'mudanca',
      descricao: `Outcome registrado: ${dados.descricao}`,
      categoria: dados.categoria as CategoriaEvidencia,
      versao: 1,
      metadados: { outcomeId: outcome.id },
    })
    acionamentos.push('memory:registrarNaMemoria')

    const validacoes = await validarHipoteses(empresaId)
    acionamentos.push('governance:validarHipoteses')

    for (const v of validacoes) {
      if (v.podePromover) {
        await promoverConhecimento(empresaId, v.hipoteseId, v.scoreConfianca)
        acionamentos.push('governance:promoverConhecimento')

        void eventBusPublisher.publish({
          eventType: EVENTOS_COGNITIVOS.CONHECIMENTO_PROMOVIDO,
          aggregateId: v.hipoteseId,
          aggregateType: 'Hipotese',
          data: { score: v.scoreConfianca },
          tenantId: empresaId,
          correlationId: randomUUID(),
        })
      }
    }
  } catch (err) {
    erros.push(err instanceof Error ? err.message : String(err))
  }

  return {
    sucesso: erros.length === 0,
    evento: 'OUTCOME_PROCESSADO',
    empresaId,
    acionamentos,
    erros,
  }
}

// ─── 6. PROCESSAR CADASTRO ────────────────────────────────────────────────
// Após o cadastro da empresa + usuário.

export async function processarCadastro(
  empresaId: string,
  token: string
): Promise<ResultadoProcessamento> {
  return processarConversa(empresaId, token)
}

// ─── 7. PROCESSAR LOGIN ───────────────────────────────────────────────────
// Quando o empresário faz login.

export async function processarLogin(empresaId: string): Promise<{
  estado: EstadoCognitivoCompleto
  evento: string
}> {
  const estado = await obterEstadoCognitivoCompleto(empresaId, { registrarVisualizacao: true })

  void registrarEventoAtivacao(empresaId, 'PRIMEIRA_DECISAO_VISTA', { origem: 'login' })
    .catch((err) => log.error('Erro ao registrar PRIMEIRA_DECISAO_VISTA (processarLogin)', { error: err instanceof Error ? err : undefined }))

  void eventBusPublisher.publish({
    eventType: EVENTOS_SAIDA.CONTEXTO_ATUALIZADO,
    aggregateId: empresaId,
    aggregateType: 'Empresa',
    data: { origem: 'login' },
    tenantId: empresaId,
    correlationId: randomUUID(),
  })

  return { estado, evento: 'LOGIN_PROCESSADO' }
}

// ─── 8. PROCESSAR MUDANÇA NA EMPRESA ──────────────────────────────────────
// Quando dados da empresa são alterados (ex.: onboarding, atualização).

export async function processarMudancaEmpresa(empresaId: string): Promise<ResultadoProcessamento> {
  const acionamentos: string[] = []
  const erros: string[] = []

  try {
    await registrarNaMemoria(empresaId, {
      tipo: 'mudanca',
      descricao: 'Dados da empresa foram atualizados',
      categoria: 'GESTAO',
      versao: 1,
      metadados: {},
    })
    acionamentos.push('memory:registrarNaMemoria')

    await registrarEvidencia(empresaId, {
      categoria: 'GESTAO',
      origem: 'SISTEMA',
      descricao: 'Empresa atualizou seus dados cadastrais',
      confianca: 'ALTA',
    })
    acionamentos.push('evidence:registrarEvidencia')

    void eventBusPublisher.publish({
      eventType: EVENTOS_ENTRADA.DADOS_SINCRONIZADOS,
      aggregateId: empresaId,
      aggregateType: 'Empresa',
      data: {},
      tenantId: empresaId,
      correlationId: randomUUID(),
    })
  } catch (err) {
    erros.push(err instanceof Error ? err.message : String(err))
  }

  return {
    sucesso: erros.length === 0,
    evento: 'MUDANCA_EMPRESA_PROCESSADA',
    empresaId,
    acionamentos,
    erros,
  }
}

// ─── 9. PROCESSAR EVENTO GENÉRICO ─────────────────────────────────────────
// Roteia qualquer evento importante para os engines corretos.

export async function processarEvento(
  empresaId: string,
  tipo: string,
  dados?: Record<string, unknown>
): Promise<ResultadoProcessamento> {
  switch (tipo) {
    case 'CONVERSA_FINALIZADA':
      return processarConversa(empresaId, (dados?.token as string) ?? '')

    case 'ACAO_CRIADA':
      return processarAcao(empresaId, dados?.decisao as unknown as Decisao)

    case 'FEEDBACK_RECEBIDO':
      return processarFeedback(
        empresaId,
        (dados?.acaoId as string) ?? '',
        (dados?.tipo as TipoFeedbackAcao) ?? 'AJUDOU',
        dados?.comentario as string | undefined
      )

    case 'OUTCOME_REGISTRADO':
      return processarOutcome(empresaId, dados as { categoria: CategoriaOutcome; origem: OrigemOutcome; descricao: string; detalhes?: Record<string, unknown>; confianca?: ConfiancaEvidencia })

    case 'EMPRESA_ATUALIZADA':
      return processarMudancaEmpresa(empresaId)

    case 'LOGIN_REALIZADO': {
      await processarLogin(empresaId)
      return {
        sucesso: true,
        evento: 'LOGIN_PROCESSADO',
        empresaId,
        acionamentos: ['orchestrator:processarLogin'],
        erros: [],
      }
    }

    default:
      return {
        sucesso: false,
        evento: `TIPO_DESCONHECIDO: ${tipo}`,
        empresaId,
        acionamentos: [],
        erros: [`Tipo de evento desconhecido: ${tipo}`],
      }
  }
}

// ─── 10. ROTINA DIÁRIA ────────────────────────────────────────────────────
// Executa a cada dia: valida hipóteses pendentes, verifica ações,
// recalcula evolução.

export async function executarRotinaDiaria(): Promise<{
  empresasProcessadas: number
  acionamentos: string[]
  erros: string[]
}> {
  const acionamentos: string[] = []
  const erros: string[] = []
  let empresasProcessadas = 0

  try {
    const empresas = await prisma.empresa.findMany({
      where: { ativa: true },
      select: { id: true },
    })

    const correlationId = randomUUID()
    const inicioCiclo = Date.now()

    await registrarCicloSeguro(
      () => registrarInicioCiclo('sistema', 'rotinaDiaria', correlationId, {
        origem: 'rotina-agendada',
        tipoExecucao: 'automatica',
      }),
      'inicio', 'sistema', correlationId
    )

    await eventBusPublisher.publish({
      eventType: EVENTOS_ENTRADA.ROTINA_DIARIA_INICIADA,
      aggregateId: new Date().toISOString().slice(0, 10),
      aggregateType: 'RotinaDiaria',
      data: { totalEmpresas: empresas.length },
      tenantId: 'sistema',
      correlationId,
    })

    for (const empresa of empresas) {
      const inicioEtapa = new Date().toISOString()
      try {
        await validarHipoteses(empresa.id)
        acionamentos.push(`governance:validarHipoteses(${empresa.id})`)
        await registrarCicloSeguro(
          () => registrarEtapaCiclo('sistema', correlationId, {
            nome: 'validarHipoteses',
            ordem: empresasProcessadas + 1,
            status: 'sucesso',
            duracaoMs: 0,
            engine: 'knowledge-governance-engine',
            iniciadoEm: inicioEtapa,
            terminadoEm: new Date().toISOString(),
            dadosProcessados: 1,
          }),
          'etapa:validarHipoteses', 'sistema', correlationId
        )

        empresasProcessadas++
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        erros.push(`Erro na empresa ${empresa.id}: ${msg}`)
        await registrarCicloSeguro(
          () => registrarEtapaCiclo('sistema', correlationId, {
            nome: 'validarHipoteses',
            ordem: empresasProcessadas + 1,
            status: 'falha',
            duracaoMs: 0,
            erro: msg,
            engine: 'knowledge-governance-engine',
            iniciadoEm: inicioEtapa,
            terminadoEm: new Date().toISOString(),
            dadosProcessados: 1,
          }),
          'etapa:validarHipoteses', 'sistema', correlationId
        )
      }
    }

    await registrarCicloSeguro(
      () => registrarFinalizacaoCiclo('sistema', correlationId, erros.length > 0 ? 'FALHA' : 'CONCLUIDO', Date.now() - inicioCiclo, erros),
      'finalizacao', 'sistema', correlationId
    )
  } catch (err) {
    const msg = `Erro na rotina diária: ${err instanceof Error ? err.message : String(err)}`
    erros.push(msg)
  }

  return { empresasProcessadas, acionamentos, erros }
}

// ─── 11. ROTINA SEMANAL ───────────────────────────────────────────────────
// Auditoria completa de governança + observatório.

export async function executarRotinaSemanal(): Promise<{
  empresasAuditadas: number
  conhecimentosPromovidos: number
  conhecimentosEnfraquecidos: number
  acionamentos: string[]
  erros: string[]
}> {
  const acionamentos: string[] = []
  const erros: string[] = []
  const conhecimentosEnfraquecidos = 0
  let conhecimentosPromovidos = 0
  let empresasAuditadas = 0

  try {
    const empresas = await prisma.empresa.findMany({
      where: { ativa: true },
      select: { id: true },
    })

    const correlationId = randomUUID()
    const inicioCiclo = Date.now()

    await registrarCicloSeguro(
      () => registrarInicioCiclo('sistema', 'rotinaSemanal', correlationId, {
        origem: 'rotina-agendada',
        tipoExecucao: 'automatica',
      }),
      'inicio', 'sistema', correlationId
    )

    await eventBusPublisher.publish({
      eventType: EVENTOS_ENTRADA.ROTINA_SEMANAL_INICIADA,
      aggregateId: new Date().toISOString().slice(0, 10),
      aggregateType: 'RotinaSemanal',
      data: { totalEmpresas: empresas.length },
      tenantId: 'sistema',
      correlationId,
    })

    for (const empresa of empresas) {
      try {
        const validacoes = await validarHipoteses(empresa.id)
        acionamentos.push(`governance:validarHipoteses(${empresa.id})`)

        for (const v of validacoes) {
          if (v.podePromover) {
            await promoverConhecimento(empresa.id, v.hipoteseId, v.scoreConfianca)
            conhecimentosPromovidos++
            acionamentos.push(`governance:promoverConhecimento(${v.hipoteseId})`)

            await eventBusPublisher.publish({
              eventType: EVENTOS_COGNITIVOS.CONHECIMENTO_PROMOVIDO,
              aggregateId: v.hipoteseId,
              aggregateType: 'Hipotese',
              data: { score: v.scoreConfianca },
              tenantId: empresa.id,
              correlationId: randomUUID(),
            })
          }
        }

        await auditarConhecimento(empresa.id)
        acionamentos.push(`governance:auditarConhecimento(${empresa.id})`)

        empresasAuditadas++
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        erros.push(`Erro na empresa ${empresa.id}: ${msg}`)
        await registrarCicloSeguro(
          () => registrarFalhaCiclo('sistema', correlationId, `rotinaSemanal:${empresa.id}`, msg),
          'falha', 'sistema', correlationId
        )
      }
    }

    await registrarCicloSeguro(
      () => registrarFinalizacaoCiclo('sistema', correlationId, erros.length > 0 ? 'FALHA' : 'CONCLUIDO', Date.now() - inicioCiclo, erros),
      'finalizacao', 'sistema', correlationId
    )
  } catch (err) {
    erros.push(`Erro na rotina semanal: ${err instanceof Error ? err.message : String(err)}`)
  }

  return { empresasAuditadas, conhecimentosPromovidos, conhecimentosEnfraquecidos, acionamentos, erros }
}

// ─── 12. ROTINA MENSAL ────────────────────────────────────────────────────
// Atualiza o observatório cognitivo + métricas globais.

export async function executarRotinaMensal(): Promise<{
  resumo: Awaited<ReturnType<typeof obterResumoCognitivo>>
  alertas: Awaited<ReturnType<typeof obterAlertasGovernanca>>
  acionamentos: string[]
  erros: string[]
}> {
  const acionamentos: string[] = []
  const erros: string[] = []
  const correlationId = randomUUID()
  const inicioCiclo = Date.now()

  await registrarCicloSeguro(
    () => registrarInicioCiclo('sistema', 'rotinaMensal', correlationId, {
      origem: 'rotina-agendada',
      tipoExecucao: 'automatica',
    }),
    'inicio', 'sistema', correlationId
  )

  let resumo: Awaited<ReturnType<typeof obterResumoCognitivo>> | null = null
  let alertas: Awaited<ReturnType<typeof obterAlertasGovernanca>> = []

  try {
    const inicioResumo = new Date().toISOString()
    resumo = await obterResumoCognitivo()
    acionamentos.push('observatory:obterResumoCognitivo')
    await registrarCicloSeguro(
      () => registrarEtapaCiclo('sistema', correlationId, {
        nome: 'obterResumoCognitivo', ordem: 1, status: 'sucesso', duracaoMs: 0,
        engine: 'cognitive-observatory',
        iniciadoEm: inicioResumo,
        terminadoEm: new Date().toISOString(),
      }),
      'etapa:obterResumoCognitivo', 'sistema', correlationId
    )
  } catch (err) {
    const msg = `Erro ao obter resumo: ${err instanceof Error ? err.message : String(err)}`
    erros.push(msg)
    await registrarCicloSeguro(
      () => registrarEtapaCiclo('sistema', correlationId, {
        nome: 'obterResumoCognitivo', ordem: 1, status: 'falha', duracaoMs: 0, erro: msg,
        engine: 'cognitive-observatory',
      }),
      'etapa:obterResumoCognitivo', 'sistema', correlationId
    )
  }

  try {
    const inicioAlertas = new Date().toISOString()
    alertas = await obterAlertasGovernanca()
    acionamentos.push('observatory:obterAlertasGovernanca')
    await registrarCicloSeguro(
      () => registrarEtapaCiclo('sistema', correlationId, {
        nome: 'obterAlertasGovernanca', ordem: 2, status: 'sucesso', duracaoMs: 0,
        engine: 'cognitive-observatory',
        iniciadoEm: inicioAlertas,
        terminadoEm: new Date().toISOString(),
      }),
      'etapa:obterAlertasGovernanca', 'sistema', correlationId
    )
  } catch (err) {
    const msg = `Erro ao obter alertas: ${err instanceof Error ? err.message : String(err)}`
    erros.push(msg)
    await registrarCicloSeguro(
      () => registrarEtapaCiclo('sistema', correlationId, {
        nome: 'obterAlertasGovernanca', ordem: 2, status: 'falha', duracaoMs: 0, erro: msg,
        engine: 'cognitive-observatory',
      }),
      'etapa:obterAlertasGovernanca', 'sistema', correlationId
    )
  }

  await registrarCicloSeguro(
    () => registrarFinalizacaoCiclo('sistema', correlationId, erros.length > 0 ? 'FALHA' : 'CONCLUIDO', Date.now() - inicioCiclo, erros),
    'finalizacao', 'sistema', correlationId
  )

  return {
    resumo: resumo ?? {
      data: new Date().toISOString(),
      empresasAnalisadas: 0,
      evidenciasRegistradas: 0,
      hipotesesCriadas: 0,
      hipotesesFortalecidas: 0,
      hipotesesDescartadas: 0,
      conhecimentosPromovidos: 0,
      conhecimentosEnfraquecidos: 0,
      outcomesPositivos: 0,
      outcomesNegativos: 0,
      scoreMedioConhecimentos: 0,
      scoreMedioEvolucaoEmpresas: 0,
    },
    alertas,
    acionamentos,
    erros,
  }
}
