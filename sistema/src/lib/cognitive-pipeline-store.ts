import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { EVENTOS_CICLO } from '@/engine/event-catalog'
import { createLogger } from '@/lib/logger'
import { getCache, TTL } from '@/lib/cache'

const log = createLogger('lib', 'cognitive-pipeline-store')

export interface EstatisticasOperacionais {
  totalCiclos: number
  totalSucessos: number
  totalFalhas: number
  tempoMedio: number | null
  tempoMaximo: number | null
  tempoMinimo: number | null
  taxaSucesso: number | null
}

export interface FalhaRegistro {
  correlationId: string
  empresaId: string
  pipeline: string
  etapa: string
  erro: string
  horario: Date
}

export interface EtapaRegistro {
  nome: string
  ordem: number
  status: 'sucesso' | 'falha'
  duracaoMs: number
  erro?: string
  engine?: string
  iniciadoEm?: string
  terminadoEm?: string
  dadosProcessados?: number
  metadata?: Record<string, unknown>
}

export interface CicloRegistro {
  cicloId: string
  empresaId: string
  pipeline: string
  correlationId: string
  usuario?: string
  origem?: string
  tipoExecucao?: string
  versaoPipeline?: string
  startedAt: Date
  finishedAt: Date | null
  duration: number | null
  status: 'EM_ANDAMENTO' | 'CONCLUIDO' | 'FALHA'
  etapas: EtapaRegistro[]
  erros: string[]
  metricas: {
    quantidadeEtapas: number
    quantidadeSucessos: number
    quantidadeFalhas: number
    duracaoTotal: number | null
    duracaoMedia: number | null
  }
}

export interface CicloContexto {
  usuario?: string
  origem?: string
  tipoExecucao?: string
  versaoPipeline?: string
  metadata?: Record<string, unknown>
}

const CHAVE_CACHE_DASHBOARD = 'pipeline:dashboard'
const CHAVE_CACHE_RESUMO_PIPELINE = 'pipeline:resumo:pipeline'
const CHAVE_CACHE_RESUMO_EMPRESA = 'pipeline:resumo:empresa'
const CHAVE_CACHE_RANKING = 'pipeline:ranking'

function invalidarCachePipeline(): void {
  const cache = getCache()
  cache.invalidateNamespace('pipeline')
}

export async function registrarInicioCiclo(
  empresaId: string,
  pipeline: string,
  correlationId: string,
  contexto?: CicloContexto
): Promise<string> {
  const cicloId = correlationId
  await prisma.event.create({
    data: {
      eventType: EVENTOS_CICLO.CICLO_INICIADO,
      aggregateId: empresaId,
      aggregateType: 'Empresa',
      tenantId: empresaId,
      correlationId,
      payload: {
        pipeline,
        cicloId,
        startedAt: new Date().toISOString(),
        ...(contexto?.usuario ? { usuario: contexto.usuario } : {}),
        ...(contexto?.origem ? { origem: contexto.origem } : {}),
        ...(contexto?.tipoExecucao ? { tipoExecucao: contexto.tipoExecucao } : {}),
        ...(contexto?.versaoPipeline ? { versaoPipeline: contexto.versaoPipeline } : {}),
        ...(contexto?.metadata ? { metadataContexto: contexto.metadata } : {}),
      },
      occurredAt: new Date(),
    },
  })
  invalidarCachePipeline()
  return cicloId
}

export async function registrarEtapaCiclo(
  empresaId: string,
  correlationId: string,
  etapa: EtapaRegistro
): Promise<void> {
  const payload: Record<string, unknown> = {
    cicloId: correlationId,
    nome: etapa.nome,
    ordem: etapa.ordem,
    status: etapa.status,
    duracaoMs: etapa.duracaoMs,
    erro: etapa.erro ?? null,
  }

  if (etapa.engine) payload.engine = etapa.engine
  if (etapa.iniciadoEm) payload.iniciadoEm = etapa.iniciadoEm
  if (etapa.terminadoEm) payload.terminadoEm = etapa.terminadoEm
  if (etapa.dadosProcessados !== undefined) payload.dadosProcessados = etapa.dadosProcessados
  if (etapa.metadata) payload.metadata = etapa.metadata

  await prisma.event.create({
    data: {
      eventType: EVENTOS_CICLO.CICLO_ETAPA,
      aggregateId: empresaId,
      aggregateType: 'Empresa',
      tenantId: empresaId,
      correlationId,
      payload,
      occurredAt: new Date(),
    },
  })
}

export async function registrarFinalizacaoCiclo(
  empresaId: string,
  correlationId: string,
  status: 'CONCLUIDO' | 'FALHA',
  duration: number,
  erros: string[]
): Promise<void> {
  await prisma.event.create({
    data: {
      eventType: EVENTOS_CICLO.CICLO_FINALIZADO,
      aggregateId: empresaId,
      aggregateType: 'Empresa',
      tenantId: empresaId,
      correlationId,
      payload: {
        cicloId: correlationId,
        status,
        duration,
        erros,
        finishedAt: new Date().toISOString(),
      },
      occurredAt: new Date(),
    },
  })
}

export async function registrarFalhaCiclo(
  empresaId: string,
  correlationId: string,
  etapa: string,
  erro: string
): Promise<void> {
  await prisma.event.create({
    data: {
      eventType: EVENTOS_CICLO.CICLO_FALHA,
      aggregateId: empresaId,
      aggregateType: 'Empresa',
      tenantId: empresaId,
      correlationId,
      payload: {
        cicloId: correlationId,
        etapa,
        erro,
        timestamp: new Date().toISOString(),
      },
      occurredAt: new Date(),
    },
  })
}

function calcularMetricas(
  etapas: EtapaRegistro[],
  duracaoTotal: number | null
): CicloRegistro['metricas'] {
  const quantidadeEtapas = etapas.length
  const quantidadeSucessos = etapas.filter((e) => e.status === 'sucesso').length
  const quantidadeFalhas = etapas.filter((e) => e.status === 'falha').length
  const duracaoMedia = quantidadeEtapas > 0 && duracaoTotal !== null
    ? Math.round(duracaoTotal / quantidadeEtapas)
    : null

  return {
    quantidadeEtapas,
    quantidadeSucessos,
    quantidadeFalhas,
    duracaoTotal,
    duracaoMedia,
  }
}

function montarCiclo(
  correlationId: string,
  empresaId: string,
  eventos: Array<{ eventType: string; payload: unknown; occurredAt: Date; tenantId: string }>
): CicloRegistro | null {
  const inicioEvento = eventos.find((e) => e.eventType === EVENTOS_CICLO.CICLO_INICIADO)
  if (!inicioEvento) return null

  const pInicio = inicioEvento.payload as Record<string, unknown>
  const etapas: EtapaRegistro[] = eventos
    .filter((e) => e.eventType === EVENTOS_CICLO.CICLO_ETAPA)
    .map((e) => {
      const p = e.payload as Record<string, unknown>
      return {
        nome: p.nome as string,
        ordem: p.ordem as number,
        status: (p.status as 'sucesso' | 'falha'),
        duracaoMs: p.duracaoMs as number,
        erro: (p.erro as string | undefined) ?? undefined,
        engine: p.engine as string | undefined,
        iniciadoEm: p.iniciadoEm as string | undefined,
        terminadoEm: p.terminadoEm as string | undefined,
        dadosProcessados: p.dadosProcessados as number | undefined,
        metadata: p.metadata as Record<string, unknown> | undefined,
      }
    })

  const finalEvento = eventos.find((e) => e.eventType === EVENTOS_CICLO.CICLO_FINALIZADO)
  const pFinal = finalEvento?.payload as Record<string, unknown> | undefined

  const errosFinal = (pFinal?.erros as string[]) ?? []
  const falhas = eventos
    .filter((e) => e.eventType === EVENTOS_CICLO.CICLO_FALHA)
    .map((e) => {
      const p = e.payload as { erro: string }
      return p.erro
    })

  const duracaoTotal = (pFinal?.duration as number | null) ?? null
  const metricas = calcularMetricas(etapas, duracaoTotal)

  return {
    cicloId: pInicio.cicloId as string,
    empresaId,
    pipeline: pInicio.pipeline as string,
    correlationId,
    usuario: pInicio.usuario as string | undefined,
    origem: pInicio.origem as string | undefined,
    tipoExecucao: pInicio.tipoExecucao as string | undefined,
    versaoPipeline: pInicio.versaoPipeline as string | undefined,
    startedAt: new Date(pInicio.startedAt as string),
    finishedAt: pFinal?.finishedAt ? new Date(pFinal.finishedAt as string) : null,
    duration: duracaoTotal,
    status: ((pFinal?.status as string) ?? 'EM_ANDAMENTO') as 'EM_ANDAMENTO' | 'CONCLUIDO' | 'FALHA',
    etapas,
    erros: [...errosFinal, ...falhas],
    metricas,
  }
}

async function consultarCiclosBatch(correlationIds: string[]): Promise<CicloRegistro[]> {
  if (correlationIds.length === 0) return []

  const eventos = await prisma.event.findMany({
    where: { correlationId: { in: correlationIds } },
    orderBy: { occurredAt: 'asc' },
  })

  const grupos = new Map<string, Array<{ eventType: string; payload: unknown; occurredAt: Date; tenantId: string }>>()
  for (const e of eventos) {
    if (!grupos.has(e.correlationId)) grupos.set(e.correlationId, [])
    grupos.get(e.correlationId)!.push(e)
  }

  const ciclos: CicloRegistro[] = []
  for (const [correlationId, evts] of grupos) {
    const empresaId = evts[0].tenantId
    const ciclo = montarCiclo(correlationId, empresaId, evts)
    if (ciclo) ciclos.push(ciclo)
  }

  return ciclos
}

export async function consultarCiclo(correlationId: string): Promise<CicloRegistro | null> {
  const eventos = await prisma.event.findMany({
    where: { correlationId },
    orderBy: { occurredAt: 'asc' },
  })

  if (eventos.length === 0) return null
  const empresaId = eventos[0].tenantId
  return montarCiclo(correlationId, empresaId, eventos)
}

export async function consultarCiclosPorEmpresa(
  empresaId: string,
  limite = 20,
  pipeline?: string
): Promise<CicloRegistro[]> {
  const iniciados = await prisma.event.findMany({
    where: {
      tenantId: empresaId,
      eventType: EVENTOS_CICLO.CICLO_INICIADO,
      ...(pipeline ? { payload: { path: ['pipeline'], equals: pipeline } } : {}),
    },
    orderBy: { occurredAt: 'desc' },
    take: limite,
  })

  const correlationIds = iniciados.map((e) => e.correlationId)
  return consultarCiclosBatch(correlationIds)
}

export async function consultarCiclosPorStatus(
  empresaId: string,
  status: 'CONCLUIDO' | 'FALHA' | 'EM_ANDAMENTO',
  limite = 20,
  pipeline?: string
): Promise<CicloRegistro[]> {
  if (status === 'EM_ANDAMENTO') {
    const finalizados = await prisma.event.findMany({
      where: { tenantId: empresaId, eventType: EVENTOS_CICLO.CICLO_FINALIZADO },
      select: { correlationId: true },
    })
    const finalizadosSet = new Set(finalizados.map((e) => e.correlationId))

    const iniciados = await prisma.event.findMany({
      where: {
        tenantId: empresaId,
        eventType: EVENTOS_CICLO.CICLO_INICIADO,
        ...(pipeline ? { payload: { path: ['pipeline'], equals: pipeline } } : {}),
      },
      orderBy: { occurredAt: 'desc' },
      take: limite * 2,
    })

    const pendentes = iniciados
      .filter((e) => !finalizadosSet.has(e.correlationId))
      .slice(0, limite)
      .map((e) => e.correlationId)

    return consultarCiclosBatch(pendentes)
  }

  const eventos = await prisma.event.findMany({
    where: {
      tenantId: empresaId,
      eventType: EVENTOS_CICLO.CICLO_FINALIZADO,
      AND: [
        { payload: { path: ['status'], equals: status } },
        ...(pipeline ? [{ payload: { path: ['pipeline'], equals: pipeline } }] : []),
      ],
    },
    orderBy: { occurredAt: 'desc' },
    take: limite,
  })

  const correlationIds = eventos.map((e) => e.correlationId)
  return consultarCiclosBatch(correlationIds)
}

export async function consultarCiclosPorPeriodo(
  empresaId: string,
  dataInicial: Date,
  dataFinal: Date,
  limite = 50,
  pipeline?: string
): Promise<CicloRegistro[]> {
  const iniciados = await prisma.event.findMany({
    where: {
      tenantId: empresaId,
      eventType: EVENTOS_CICLO.CICLO_INICIADO,
      occurredAt: { gte: dataInicial, lte: dataFinal },
      ...(pipeline ? { payload: { path: ['pipeline'], equals: pipeline } } : {}),
    },
    orderBy: { occurredAt: 'desc' },
    take: limite,
  })

  const correlationIds = iniciados.map((e) => e.correlationId)
  return consultarCiclosBatch(correlationIds)
}

export async function consultarCiclosPorPipeline(
  empresaId: string,
  pipeline: string,
  limite = 20
): Promise<CicloRegistro[]> {
  const iniciados = await prisma.event.findMany({
    where: {
      tenantId: empresaId,
      eventType: EVENTOS_CICLO.CICLO_INICIADO,
      payload: { path: ['pipeline'], equals: pipeline },
    },
    orderBy: { occurredAt: 'desc' },
    take: limite,
  })

  const correlationIds = iniciados.map((e) => e.correlationId)
  return consultarCiclosBatch(correlationIds)
}

export async function obterEstatisticas(
  empresaId: string,
  dataInicial?: Date,
  dataFinal?: Date,
  pipeline?: string
): Promise<EstatisticasOperacionais> {
  const filtroTempo: Record<string, unknown> = {}
  if (dataInicial) filtroTempo.gte = dataInicial
  if (dataFinal) filtroTempo.lte = dataFinal

  const filtroFinalizado: Record<string, unknown> = {
    tenantId: empresaId,
    eventType: EVENTOS_CICLO.CICLO_FINALIZADO,
  }
  if (dataInicial || dataFinal) filtroFinalizado.occurredAt = filtroTempo
  if (pipeline) filtroFinalizado.payload = { path: ['pipeline'], equals: pipeline }

  const eventos = await prisma.event.findMany({
    where: filtroFinalizado,
    orderBy: { occurredAt: 'desc' },
  })

  const duracoes: number[] = []
  let totalSucessos = 0
  let totalFalhas = 0

  for (const e of eventos) {
    const p = e.payload as Record<string, unknown>
    const status = p.status as string
    const duration = p.duration as number | undefined

    if (duration !== undefined) duracoes.push(duration)
    if (status === 'CONCLUIDO') totalSucessos++
    else if (status === 'FALHA') totalFalhas++
  }

  const totalCiclos = eventos.length
  const sorted = [...duracoes].sort((a, b) => a - b)

  return {
    totalCiclos,
    totalSucessos,
    totalFalhas,
    tempoMedio: duracoes.length > 0 ? Math.round(duracoes.reduce((a, b) => a + b, 0) / duracoes.length) : null,
    tempoMaximo: sorted.length > 0 ? sorted[sorted.length - 1] : null,
    tempoMinimo: sorted.length > 0 ? sorted[0] : null,
    taxaSucesso: totalCiclos > 0 ? totalSucessos / totalCiclos : null,
  }
}

export async function consultarUltimasFalhas(
  empresaId: string,
  limite = 10,
  pipeline?: string
): Promise<FalhaRegistro[]> {
  const finalizados = await prisma.event.findMany({
    where: {
      tenantId: empresaId,
      eventType: EVENTOS_CICLO.CICLO_FINALIZADO,
      AND: [
        { payload: { path: ['status'], equals: 'FALHA' } },
        ...(pipeline ? [{ payload: { path: ['pipeline'], equals: pipeline } }] : []),
      ],
    },
    orderBy: { occurredAt: 'desc' },
    take: limite,
  })

  if (finalizados.length === 0) return []

  const correlationIds = finalizados.map((e) => e.correlationId)

  const [iniciados, falhasEtapa] = await Promise.all([
    prisma.event.findMany({
      where: { correlationId: { in: correlationIds }, eventType: EVENTOS_CICLO.CICLO_INICIADO },
    }),
    prisma.event.findMany({
      where: { correlationId: { in: correlationIds }, eventType: EVENTOS_CICLO.CICLO_FALHA },
      orderBy: { occurredAt: 'desc' },
    }),
  ])

  const pipelineMap: Record<string, string> = {}
  for (const e of iniciados) {
    const p = e.payload as Record<string, unknown>
    pipelineMap[e.correlationId] = (p.pipeline as string) ?? 'desconhecido'
  }

  const falhasPorCiclo = new Map<string, Array<{ etapa: string; erro: string; horario: Date }>>()
  for (const e of falhasEtapa) {
    if (!falhasPorCiclo.has(e.correlationId)) falhasPorCiclo.set(e.correlationId, [])
    const p = e.payload as Record<string, unknown>
    falhasPorCiclo.get(e.correlationId)!.push({
      etapa: (p.etapa as string) ?? 'desconhecida',
      erro: (p.erro as string) ?? 'erro desconhecido',
      horario: e.occurredAt,
    })
  }

  const falhas: FalhaRegistro[] = []
  for (const e of finalizados) {
    const pFinal = e.payload as Record<string, unknown>
    const pipeline = pipelineMap[e.correlationId] ?? 'desconhecido'
    const falhasDoCiclo = falhasPorCiclo.get(e.correlationId)

    if (!falhasDoCiclo || falhasDoCiclo.length === 0) {
      falhas.push({
        correlationId: e.correlationId,
        empresaId: e.tenantId,
        pipeline,
        etapa: 'ciclo',
        erro: ((pFinal.erros as string[])?.join('; ') ?? 'erro desconhecido'),
        horario: e.occurredAt,
      })
    } else {
      for (const f of falhasDoCiclo) {
        falhas.push({
          correlationId: e.correlationId,
          empresaId: e.tenantId,
          pipeline,
          etapa: f.etapa,
          erro: f.erro,
          horario: f.horario,
        })
      }
    }
  }

  return falhas.slice(0, limite)
}

export interface PipelineBottleneck {
  tipo: 'etapa_lenta' | 'etapa_com_muitas_falhas' | 'pipeline_lento'
  pipeline: string
  etapa?: string
  metrica: string
  valor: number
  media: number
}

export interface PipelineAlert {
  tipo: 'muitas_falhas' | 'sem_execucao' | 'etapa_muito_lenta' | 'tempo_medio_elevado'
  severidade: 'baixa' | 'media' | 'alta'
  pipeline?: string
  etapa?: string
  mensagem: string
  valor: number
  limite: number
}

export interface PipelineHealth {
  score: number
  status: 'saudavel' | 'atencao' | 'critico'
  totalCiclos: number
  taxaSucesso: number
  duracaoMedia: number | null
  pipelinesAtivos: string[]
  pipelinesComFalha: string[]
  gargalos: PipelineBottleneck[]
  alertas: PipelineAlert[]
}

export interface PipelineDiagnostics {
  saude: PipelineHealth
  timestamp: Date
  empresaId: string
}

// DÍVIDA TÉCNICA REGISTRADA (P3.4): Tipos internos (DadosPipeline,
// DadosGlobaisPipeline) estão misturados com tipos públicos de observabilidade
// (CicloRegistro, PipelineDashboard, etc.) no mesmo arquivo.
// Separar exigiria: (1) novo arquivo de tipos, (2) mover ~12 interfaces,
// (3) corrigir imports em ~4 consumidores. Refatoração ampla sem ganho imediato.
// Adiado até que um novo consumidor externo justifique a separação.

interface DadosPipeline {
  correlationId: string
  status: 'CONCLUIDO' | 'FALHA'
  duration: number
  pipeline: string
}

function calcularPtsDuracao(duracao: number | null, valorMinimo = 0): number {
  return duracao === null
    ? 0
    : duracao < 1000 ? 25
    : duracao < 5000 ? 20
    : duracao < 10000 ? 15
    : duracao < 30000 ? 10
    : valorMinimo
}

function calcularHealthScore(
  taxaSucesso: number,
  duracaoMedia: number | null,
  falhasRecentes: number,
  totalCiclos: number
): number {
  const ptsSucesso = Math.min(40, Math.round(taxaSucesso * 40))
  const ptsDuracao = calcularPtsDuracao(duracaoMedia)
  const ptsFalhas = falhasRecentes === 0 ? 20 : falhasRecentes <= 2 ? 15 : falhasRecentes <= 5 ? 10 : falhasRecentes <= 10 ? 5 : 0
  const ptsCiclos = totalCiclos > 50 ? 15 : totalCiclos > 20 ? 12 : totalCiclos > 10 ? 9 : totalCiclos > 5 ? 5 : totalCiclos > 0 ? 3 : 0
  return Math.min(100, ptsSucesso + ptsDuracao + ptsFalhas + ptsCiclos)
}

function classificarSaude(score: number): 'saudavel' | 'atencao' | 'critico' {
  if (score >= 80) return 'saudavel'
  if (score >= 50) return 'atencao'
  return 'critico'
}

async function carregarDadosFinalizados(
  filtroTenant?: string
): Promise<DadosGlobaisPipeline[]> {
  const where: Record<string, unknown> = { eventType: EVENTOS_CICLO.CICLO_FINALIZADO }
  if (filtroTenant) where.tenantId = filtroTenant

  const finalizados = await prisma.event.findMany({ where })

  const correlationIds = finalizados.map((e) => e.correlationId)
  if (correlationIds.length === 0) return []

  const iniciados = await prisma.event.findMany({
    where: { correlationId: { in: correlationIds }, eventType: EVENTOS_CICLO.CICLO_INICIADO },
  })

  const pipelineMap: Record<string, string> = {}
  for (const e of iniciados) {
    const p = e.payload as Record<string, unknown>
    pipelineMap[e.correlationId] = (p.pipeline as string) ?? 'desconhecido'
  }

  const dados: DadosGlobaisPipeline[] = []
  for (const e of finalizados) {
    const p = e.payload as Record<string, unknown>
    const status = (p.status as string) ?? ''
    if (status !== 'CONCLUIDO' && status !== 'FALHA') continue
    dados.push({
      correlationId: e.correlationId,
      status: status as 'CONCLUIDO' | 'FALHA',
      duration: (p.duration as number) ?? 0,
      pipeline: pipelineMap[e.correlationId] ?? 'desconhecido',
      tenantId: e.tenantId,
      occurredAt: e.occurredAt,
    })
  }

  return dados
}

async function coletarDadosPipelines(empresaId: string): Promise<DadosPipeline[]> {
  const dados = await carregarDadosFinalizados(empresaId)
  return dados.map((d) => ({
    correlationId: d.correlationId,
    status: d.status,
    duration: d.duration,
    pipeline: d.pipeline,
  }))
}

async function detectarGargalosInterno(
  dados: DadosPipeline[],
  duracaoMediaGeral: number | null
): Promise<PipelineBottleneck[]> {
  const correlationIds = dados.map((d) => d.correlationId)
  if (correlationIds.length === 0) return []

  const etapas = await prisma.event.findMany({
    where: { correlationId: { in: correlationIds }, eventType: EVENTOS_CICLO.CICLO_ETAPA },
  })

  const statsPorEtapa: Record<string, { duracoes: number[]; falhas: number; total: number }> = {}
  for (const e of etapas) {
    const p = e.payload as Record<string, unknown>
    const nome = (p.nome as string) ?? 'desconhecida'
    if (!statsPorEtapa[nome]) statsPorEtapa[nome] = { duracoes: [], falhas: 0, total: 0 }
    statsPorEtapa[nome].total++
    statsPorEtapa[nome].duracoes.push((p.duracaoMs as number) ?? 0)
    if (p.status === 'falha') statsPorEtapa[nome].falhas++
  }

  const bottlenecks: PipelineBottleneck[] = []

  const duracoesValidas = dados.map((d) => d.duration).filter((dur) => dur > 0)
  const mediaGeral = duracaoMediaGeral ?? (
    duracoesValidas.length > 0
      ? Math.round(duracoesValidas.reduce((a, b) => a + b, 0) / duracoesValidas.length)
      : 0
  )

  const etapasPorDuracao = Object.entries(statsPorEtapa)
    .map(([nome, stats]) => ({
      nome,
      media: stats.duracoes.length > 0 ? Math.round(stats.duracoes.reduce((a, b) => a + b, 0) / stats.duracoes.length) : 0,
    }))
    .filter((e) => e.media > mediaGeral && e.media > 100)
    .sort((a, b) => b.media - a.media)
    .slice(0, 3)

  for (const etapa of etapasPorDuracao) {
    bottlenecks.push({
      tipo: 'etapa_lenta', pipeline: 'geral', etapa: etapa.nome,
      metrica: 'duracaoMedia (ms)', valor: etapa.media, media: mediaGeral,
    })
  }

  const etapasComFalhas = Object.entries(statsPorEtapa)
    .map(([nome, stats]) => ({ nome, taxaFalha: stats.total > 0 ? stats.falhas / stats.total : 0, falhas: stats.falhas }))
    .filter((e) => e.taxaFalha > 0)
    .sort((a, b) => b.taxaFalha - a.taxaFalha)
    .slice(0, 3)

  for (const etapa of etapasComFalhas) {
    bottlenecks.push({
      tipo: 'etapa_com_muitas_falhas', pipeline: 'geral', etapa: etapa.nome,
      metrica: 'taxaFalha', valor: Math.round(etapa.taxaFalha * 100), media: 0,
    })
  }

  const statsPipeline: Record<string, number[]> = {}
  for (const d of dados) {
    if (!statsPipeline[d.pipeline]) statsPipeline[d.pipeline] = []
    if (d.duration > 0) statsPipeline[d.pipeline].push(d.duration)
  }

  const pipelinesLentos = Object.entries(statsPipeline)
    .map(([nome, duracoes]) => ({
      nome,
      media: duracoes.length > 0 ? Math.round(duracoes.reduce((a, b) => a + b, 0) / duracoes.length) : 0,
    }))
    .filter((p) => p.media > mediaGeral * 1.5 && p.media > 500)
    .sort((a, b) => b.media - a.media)
    .slice(0, 2)

  for (const p of pipelinesLentos) {
    bottlenecks.push({
      tipo: 'pipeline_lento', pipeline: p.nome,
      metrica: 'duracaoMedia (ms)', valor: p.media, media: mediaGeral,
    })
  }

  return bottlenecks
}

export async function detectarGargalos(
  empresaId: string,
  pipelines?: DadosPipeline[],
  duracaoMediaGeral?: number | null
): Promise<PipelineBottleneck[]> {
  const dados = pipelines ?? (await coletarDadosPipelines(empresaId))
  return detectarGargalosInterno(dados, duracaoMediaGeral ?? null)
}

function gerarAlertas(
  taxaSucesso: number,
  duracaoMedia: number | null,
  totalCiclos: number,
  pipelinesAtivos: number,
  pipelines: DadosPipeline[],
  gargalos: PipelineBottleneck[]
): PipelineAlert[] {
  const alertas: PipelineAlert[] = []

  if (totalCiclos === 0) {
    alertas.push({ tipo: 'sem_execucao', severidade: 'alta', mensagem: 'Nenhum ciclo cognitivo foi executado', valor: 0, limite: 1 })
    return alertas
  }

  if (taxaSucesso < 0.5) {
    alertas.push({
      tipo: 'muitas_falhas', severidade: 'alta', mensagem: `Taxa de sucesso crítica: ${Math.round(taxaSucesso * 100)}%`,
      valor: Math.round(taxaSucesso * 100), limite: 50,
    })
  } else if (taxaSucesso < 0.7) {
    alertas.push({
      tipo: 'muitas_falhas', severidade: 'media', mensagem: `Taxa de sucesso baixa: ${Math.round(taxaSucesso * 100)}%`,
      valor: Math.round(taxaSucesso * 100), limite: 70,
    })
  } else if (taxaSucesso < 0.9) {
    alertas.push({
      tipo: 'muitas_falhas', severidade: 'baixa', mensagem: `Taxa de sucesso abaixo do ideal: ${Math.round(taxaSucesso * 100)}%`,
      valor: Math.round(taxaSucesso * 100), limite: 90,
    })
  }

  if (duracaoMedia !== null && duracaoMedia > 60000) {
    alertas.push({
      tipo: 'tempo_medio_elevado', severidade: 'alta', mensagem: `Tempo médio muito elevado: ${Math.round(duracaoMedia / 1000)}s`,
      valor: duracaoMedia, limite: 60000,
    })
  } else if (duracaoMedia !== null && duracaoMedia > 30000) {
    alertas.push({
      tipo: 'tempo_medio_elevado', severidade: 'media', mensagem: `Tempo médio elevado: ${Math.round(duracaoMedia / 1000)}s`,
      valor: duracaoMedia, limite: 30000,
    })
  }

  if (pipelinesAtivos === 0) {
    alertas.push({ tipo: 'sem_execucao', severidade: 'alta', mensagem: 'Nenhum pipeline ativo', valor: 0, limite: 1 })
  }

  for (const g of gargalos) {
    if (g.tipo === 'etapa_lenta' && g.etapa) {
      alertas.push({
        tipo: 'etapa_muito_lenta', severidade: 'media', pipeline: g.pipeline, etapa: g.etapa,
        mensagem: `Etapa ${g.etapa} muito lenta: ${g.valor}ms (média geral: ${g.media}ms)`,
        valor: g.valor, limite: g.media,
      })
    }
  }

  const falhasRecentes = pipelines.slice(0, 10).filter((p) => p.status === 'FALHA').length
  if (falhasRecentes >= 5) {
    alertas.push({
      tipo: 'muitas_falhas', severidade: 'alta', mensagem: `${falhasRecentes} falhas nos últimos 10 ciclos`,
      valor: falhasRecentes, limite: 5,
    })
  }

  return alertas
}

export async function diagnosticarPipeline(empresaId: string): Promise<PipelineDiagnostics> {
  const dados = await coletarDadosPipelines(empresaId)
  const totalCiclos = dados.length
  if (totalCiclos === 0) {
    const vazio: PipelineHealth = {
      score: 0,
      status: 'critico',
      totalCiclos: 0,
      taxaSucesso: 0,
      duracaoMedia: null,
      pipelinesAtivos: [],
      pipelinesComFalha: [],
      gargalos: [],
      alertas: [{ tipo: 'sem_execucao', severidade: 'alta', mensagem: 'Nenhum ciclo cognitivo foi executado', valor: 0, limite: 1 }],
    }
    return { saude: vazio, timestamp: new Date(), empresaId }
  }

  const sucessos = dados.filter((p) => p.status === 'CONCLUIDO').length
  const falhas = dados.filter((p) => p.status === 'FALHA').length
  const taxaSucesso = totalCiclos > 0 ? sucessos / totalCiclos : 0

  const duracoesValidas = dados.map((p) => p.duration).filter((d) => d > 0)
  const duracaoMedia = duracoesValidas.length > 0
    ? Math.round(duracoesValidas.reduce((a, b) => a + b, 0) / duracoesValidas.length)
    : null

  const pipelinesPorNome: Record<string, { total: number; falhas: number }> = {}
  for (const p of dados) {
    if (!pipelinesPorNome[p.pipeline]) pipelinesPorNome[p.pipeline] = { total: 0, falhas: 0 }
    pipelinesPorNome[p.pipeline].total++
    if (p.status === 'FALHA') pipelinesPorNome[p.pipeline].falhas++
  }

  const pipelinesAtivos = Object.keys(pipelinesPorNome)
  const pipelinesComFalha = Object.entries(pipelinesPorNome)
    .filter(([, v]) => v.falhas > 0)
    .map(([k]) => k)

  const falhasRecentes = dados.slice(0, 20).filter((p) => p.status === 'FALHA').length
  const score = calcularHealthScore(taxaSucesso, duracaoMedia, falhasRecentes, totalCiclos)
  const gargalos = await detectarGargalosInterno(dados, duracaoMedia)
  const alertas = gerarAlertas(taxaSucesso, duracaoMedia, totalCiclos, pipelinesAtivos.length, dados, gargalos)

  return {
    saude: {
      score,
      status: classificarSaude(score),
      totalCiclos,
      taxaSucesso,
      duracaoMedia,
      pipelinesAtivos,
      pipelinesComFalha,
      gargalos,
      alertas,
    },
    timestamp: new Date(),
    empresaId,
  }
}

export interface TimelineEvento {
  timestamp: Date
  tipo: string
  etapa?: string
  pipeline?: string
  status?: string
  duracao?: number
  engine?: string
  metadata?: Record<string, unknown>
  erro?: string
}

export interface TimelineResumo {
  correlationId: string
  pipeline: string
  etapas: {
    nome: string
    status: string
    duracaoMs: number
  }[]
  duracaoTotal: number | null
  status: string
}

export interface EstadoReconstruido {
  cicloId: string
  pipeline: string
  empresaId: string
  status: 'EM_ANDAMENTO' | 'CONCLUIDO' | 'FALHA'
  startedAt: Date | null
  finishedAt: Date | null
  duration: number | null
  etapas: {
    nome: string
    status: 'sucesso' | 'falha'
    duracaoMs: number
    engine?: string
    erro?: string
  }[]
  erros: string[]
}

export interface AuditoriaPipeline {
  ciclo: CicloRegistro
  timeline: TimelineEvento[]
  metricas: CicloRegistro['metricas']
  healthScore: number
  gargalos: PipelineBottleneck[]
  alertas: PipelineAlert[]
}

export async function obterTimelineCiclo(correlationId: string): Promise<TimelineEvento[]> {
  const eventos = await prisma.event.findMany({
    where: { correlationId },
    orderBy: { occurredAt: 'asc' },
  })

  return eventos.map((e) => {
    const p = e.payload as Record<string, unknown>
    return {
      timestamp: e.occurredAt,
      tipo: e.eventType,
      etapa: p.etapa as string | undefined,
      pipeline: p.pipeline as string | undefined,
      status: p.status as string | undefined,
      duracao: p.duracaoMs as number | undefined,
      engine: p.engine as string | undefined,
      erro: p.erro as string | undefined,
      metadata: p.metadata as Record<string, unknown> | undefined,
    }
  })
}

export async function obterResumoTimeline(correlationId: string): Promise<TimelineResumo | null> {
  const eventos = await prisma.event.findMany({
    where: { correlationId },
    orderBy: { occurredAt: 'asc' },
  })

  if (eventos.length === 0) return null

  const inicioEvento = eventos.find((e) => e.eventType === EVENTOS_CICLO.CICLO_INICIADO)
  if (!inicioEvento) return null
  const pInicio = inicioEvento.payload as Record<string, unknown>

  const finalEvento = eventos.find((e) => e.eventType === EVENTOS_CICLO.CICLO_FINALIZADO)
  const pFinal = finalEvento?.payload as Record<string, unknown> | undefined

  const etapas = eventos
    .filter((e) => e.eventType === EVENTOS_CICLO.CICLO_ETAPA)
    .map((e) => {
      const p = e.payload as Record<string, unknown>
      return {
        nome: (p.nome as string) ?? 'desconhecida',
        status: (p.status as string) ?? 'desconhecido',
        duracaoMs: (p.duracaoMs as number) ?? 0,
      }
    })

  return {
    correlationId,
    pipeline: (pInicio.pipeline as string) ?? 'desconhecido',
    etapas,
    duracaoTotal: (pFinal?.duration as number | null) ?? null,
    status: ((pFinal?.status as string) ?? 'EM_ANDAMENTO'),
  }
}

export async function reconstruirEstadoCiclo(correlationId: string): Promise<EstadoReconstruido> {
  const eventos = await prisma.event.findMany({
    where: { correlationId },
    orderBy: { occurredAt: 'asc' },
  })

  const estado: EstadoReconstruido = {
    cicloId: correlationId,
    pipeline: 'desconhecido',
    empresaId: eventos[0]?.tenantId ?? '',
    status: 'EM_ANDAMENTO',
    startedAt: null,
    finishedAt: null,
    duration: null,
    etapas: [],
    erros: [],
  }

  const etapasVistas = new Set<string>()
  const errosVistos = new Set<string>()
  let finalizacaoVista = false

  for (const e of eventos) {
    const p = e.payload as Record<string, unknown>

    switch (e.eventType) {
      case EVENTOS_CICLO.CICLO_INICIADO:
        estado.cicloId = (p.cicloId as string) ?? correlationId
        estado.pipeline = (p.pipeline as string) ?? 'desconhecido'
        estado.empresaId = e.tenantId
        estado.startedAt = new Date((p.startedAt as string) ?? e.occurredAt)
        break

      case EVENTOS_CICLO.CICLO_ETAPA: {
        const chave = `${p.ordem}:${p.nome}`
        if (etapasVistas.has(chave)) break
        etapasVistas.add(chave)
        estado.etapas.push({
          nome: (p.nome as string) ?? 'desconhecida',
          status: (p.status as 'sucesso' | 'falha') ?? 'falha',
          duracaoMs: (p.duracaoMs as number) ?? 0,
          engine: p.engine as string | undefined,
          erro: (p.erro as string | undefined) ?? undefined,
        })
        break
      }

      case EVENTOS_CICLO.CICLO_FINALIZADO:
        if (finalizacaoVista) break
        finalizacaoVista = true
        estado.status = (p.status as 'CONCLUIDO' | 'FALHA') ?? 'EM_ANDAMENTO'
        estado.duration = (p.duration as number) ?? null
        estado.finishedAt = p.finishedAt ? new Date(p.finishedAt as string) : new Date()
        const errosFinal = (p.erros as string[]) ?? []
        for (const err of errosFinal) {
          if (err && !errosVistos.has(err)) {
            errosVistos.add(err)
            estado.erros.push(err)
          }
        }
        break

      case EVENTOS_CICLO.CICLO_FALHA: {
        const erro = (p.erro as string) ?? 'erro desconhecido'
        if (erro && !errosVistos.has(erro)) {
          errosVistos.add(erro)
          estado.erros.push(erro)
        }
        break
      }
    }
  }

  return estado
}

async function auditarMetricasCiclo(
  correlationId: string,
  ciclo?: CicloRegistro | null
): Promise<{
  metricas: CicloRegistro['metricas']
  healthScore: number
  gargalos: PipelineBottleneck[]
  alertas: PipelineAlert[]
}> {
  if (!ciclo) ciclo = await consultarCiclo(correlationId)
  if (!ciclo) {
    return {
      metricas: { quantidadeEtapas: 0, quantidadeSucessos: 0, quantidadeFalhas: 0, duracaoTotal: null, duracaoMedia: null },
      healthScore: 0,
      gargalos: [],
      alertas: [{ tipo: 'sem_execucao', severidade: 'alta', mensagem: 'Ciclo não encontrado', valor: 0, limite: 1 }],
    }
  }

  const metricas = ciclo.metricas
  const estaFalha = ciclo.status === 'FALHA'
  const ptsSucesso = estaFalha ? 0 : 40

  const ptsDuracao = calcularPtsDuracao(ciclo.duration, 5)

  const ptsEtapasFalhas = metricas.quantidadeFalhas === 0 ? 20 : metricas.quantidadeFalhas <= 2 ? 10 : 0
  const ptsEtapasCompletas = metricas.quantidadeEtapas > 0 ? Math.min(15, metricas.quantidadeSucessos * 5) : 0
  const healthScore = Math.min(100, ptsSucesso + ptsDuracao + ptsEtapasFalhas + ptsEtapasCompletas)

  const gargalos: PipelineBottleneck[] = []
  for (const etapa of ciclo.etapas) {
    if (etapa.duracaoMs > 100 && metricas.duracaoMedia !== null && etapa.duracaoMs > metricas.duracaoMedia * 2) {
      gargalos.push({
        tipo: 'etapa_lenta',
        pipeline: ciclo.pipeline,
        etapa: etapa.nome,
        metrica: 'duracaoMs',
        valor: etapa.duracaoMs,
        media: metricas.duracaoMedia,
      })
    }
    if (etapa.status === 'falha') {
      gargalos.push({
        tipo: 'etapa_com_muitas_falhas',
        pipeline: ciclo.pipeline,
        etapa: etapa.nome,
        metrica: 'status',
        valor: 1,
        media: 0,
      })
    }
  }

  const alertas: PipelineAlert[] = []
  if (estaFalha) {
    alertas.push({
      tipo: 'muitas_falhas', severidade: 'alta', pipeline: ciclo.pipeline,
      mensagem: `Ciclo finalizou com falha`, valor: 1, limite: 0,
    })
  }
  if (ciclo.duration !== null && ciclo.duration > 30000) {
    alertas.push({
      tipo: 'tempo_medio_elevado', severidade: 'media', pipeline: ciclo.pipeline,
      mensagem: `Ciclo lento: ${Math.round(ciclo.duration / 1000)}s`, valor: ciclo.duration, limite: 30000,
    })
  }
  for (const g of gargalos) {
    if (g.tipo === 'etapa_lenta' && g.etapa) {
      alertas.push({
        tipo: 'etapa_muito_lenta', severidade: 'media', pipeline: ciclo.pipeline, etapa: g.etapa,
        mensagem: `Etapa ${g.etapa} muito lenta: ${g.valor}ms`, valor: g.valor, limite: g.media,
      })
    }
  }

  return { metricas, healthScore, gargalos, alertas }
}

export async function auditarCiclo(correlationId: string): Promise<AuditoriaPipeline | null> {
  const ciclo = await consultarCiclo(correlationId)
  if (!ciclo) return null

  const timeline = await obterTimelineCiclo(correlationId)
  const { metricas, healthScore, gargalos, alertas } = await auditarMetricasCiclo(correlationId, ciclo)

  return { ciclo, timeline, metricas, healthScore, gargalos, alertas }
}

export interface PipelineDashboard {
  totalCiclos: number
  ciclosHoje: number
  ciclos7dias: number
  ciclos30dias: number
  taxaSucesso: number
  taxaFalha: number
  duracaoMedia: number | null
  healthScoreMedio: number | null
  pipelinesAtivos: string[]
  pipelinesComFalha: string[]
  alertasAtivos: number
  gargalosAtuais: PipelineBottleneck[]
}

export interface PipelineResumo {
  pipeline: string
  quantidadeExecucoes: number
  taxaSucesso: number
  duracaoMedia: number | null
  duracaoMaxima: number | null
  duracaoMinima: number | null
  falhas: number
  ultimoProcessamento: Date | null
}

export interface EmpresaResumo {
  empresaId: string
  totalCiclos: number
  sucessos: number
  falhas: number
  healthScoreMedio: number | null
  ultimoCiclo: Date | null
}

export interface PipelineRanking {
  porVolume: { pipeline: string; total: number }[]
  porTempoMedio: { pipeline: string; duracaoMedia: number }[]
  porFalhas: { pipeline: string; falhas: number }[]
}

interface DadosGlobaisPipeline {
  correlationId: string
  status: 'CONCLUIDO' | 'FALHA'
  duration: number
  pipeline: string
  tenantId: string
  occurredAt: Date
}

async function coletarDadosGlobais(): Promise<DadosGlobaisPipeline[]> {
  return carregarDadosFinalizados()
}

export async function obterDashboardPipeline(): Promise<PipelineDashboard> {
  const cache = getCache()
  const cached = cache.get<PipelineDashboard>(CHAVE_CACHE_DASHBOARD)
  if (cached) return cached

  const dados = await coletarDadosGlobais()
  const totalCiclos = dados.length
  const agora = new Date()

  const inicioHoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate())
  const inicio7dias = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000)
  const inicio30dias = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000)

  const ciclosHoje = dados.filter((d) => d.occurredAt >= inicioHoje).length
  const ciclos7dias = dados.filter((d) => d.occurredAt >= inicio7dias).length
  const ciclos30dias = dados.filter((d) => d.occurredAt >= inicio30dias).length

  const sucessos = dados.filter((d) => d.status === 'CONCLUIDO').length
  const falhas = dados.filter((d) => d.status === 'FALHA').length
  const taxaSucesso = totalCiclos > 0 ? sucessos / totalCiclos : 0
  const taxaFalha = totalCiclos > 0 ? falhas / totalCiclos : 0

  const duracoesValidas = dados.map((d) => d.duration).filter((dur) => dur > 0)
  const duracaoMedia = duracoesValidas.length > 0
    ? Math.round(duracoesValidas.reduce((a, b) => a + b, 0) / duracoesValidas.length)
    : null

  const statsPipeline: Record<string, { total: number; falhas: number }> = {}
  for (const d of dados) {
    if (!statsPipeline[d.pipeline]) statsPipeline[d.pipeline] = { total: 0, falhas: 0 }
    statsPipeline[d.pipeline].total++
    if (d.status === 'FALHA') statsPipeline[d.pipeline].falhas++
  }

  const pipelinesAtivos = Object.keys(statsPipeline)
  const pipelinesComFalha = Object.entries(statsPipeline)
    .filter(([, v]) => v.falhas > 0)
    .map(([k]) => k)

  const healthScoreMedio = totalCiclos > 0
    ? Math.round(calcularHealthScore(taxaSucesso, duracaoMedia, falhas, totalCiclos))
    : null

  const gargalosAtuais = await detectarGargalosInterno(dados, duracaoMedia)
  const alertasAtivos = gerarAlertas(taxaSucesso, duracaoMedia, totalCiclos, pipelinesAtivos.length, dados, gargalosAtuais).length

  const result: PipelineDashboard = {
    totalCiclos,
    ciclosHoje,
    ciclos7dias,
    ciclos30dias,
    taxaSucesso,
    taxaFalha,
    duracaoMedia,
    healthScoreMedio,
    pipelinesAtivos,
    pipelinesComFalha,
    alertasAtivos,
    gargalosAtuais,
  }

  cache.set(CHAVE_CACHE_DASHBOARD, result, TTL.AGREGADO)
  return result
}

export async function obterResumoPorPipeline(): Promise<PipelineResumo[]> {
  const cache = getCache()
  const cached = cache.get<PipelineResumo[]>(CHAVE_CACHE_RESUMO_PIPELINE)
  if (cached) return cached

  const dados = await coletarDadosGlobais()

  const grupos: Record<string, DadosGlobaisPipeline[]> = {}
  for (const d of dados) {
    if (!grupos[d.pipeline]) grupos[d.pipeline] = []
    grupos[d.pipeline].push(d)
  }

  const resumo = Object.entries(grupos)
    .map(([pipeline, items]) => {
      const total = items.length
      const falhas = items.filter((i) => i.status === 'FALHA').length
      const sucessos = total - falhas
      const duracoes = items.map((i) => i.duration).filter((dur) => dur > 0)
      const duracaoMedia = duracoes.length > 0 ? Math.round(duracoes.reduce((a, b) => a + b, 0) / duracoes.length) : null
      const duracaoMaxima = duracoes.length > 0 ? Math.max(...duracoes) : null
      const duracaoMinima = duracoes.length > 0 ? Math.min(...duracoes) : null
      const datas = items.map((i) => i.occurredAt).sort((a, b) => b.getTime() - a.getTime())

      return {
        pipeline,
        quantidadeExecucoes: total,
        taxaSucesso: total > 0 ? sucessos / total : 0,
        duracaoMedia,
        duracaoMaxima,
        duracaoMinima,
        falhas,
        ultimoProcessamento: datas[0] ?? null,
      }
    })
    .sort((a, b) => b.quantidadeExecucoes - a.quantidadeExecucoes)

  cache.set(CHAVE_CACHE_RESUMO_PIPELINE, resumo, TTL.AGREGADO)
  return resumo
}

export async function obterResumoPorEmpresa(): Promise<EmpresaResumo[]> {
  const cache = getCache()
  const cached = cache.get<EmpresaResumo[]>(CHAVE_CACHE_RESUMO_EMPRESA)
  if (cached) return cached

  const dados = await coletarDadosGlobais()

  const grupos: Record<string, DadosGlobaisPipeline[]> = {}
  for (const d of dados) {
    if (!grupos[d.tenantId]) grupos[d.tenantId] = []
    grupos[d.tenantId].push(d)
  }

  const resumo: EmpresaResumo[] = []

  for (const [empresaId, items] of Object.entries(grupos)) {
    const totalCiclos = items.length
    const sucessos = items.filter((i) => i.status === 'CONCLUIDO').length
    const falhas = totalCiclos - sucessos
    const txs = totalCiclos > 0 ? sucessos / totalCiclos : 0
    const duracoes = items.map((i) => i.duration).filter((dur) => dur > 0)
    const duracaoMedia = duracoes.length > 0 ? Math.round(duracoes.reduce((a, b) => a + b, 0) / duracoes.length) : null
    const healthScoreMedio = totalCiclos > 0
      ? Math.round(calcularHealthScore(txs, duracaoMedia, falhas, totalCiclos))
      : null
    const datas = items.map((i) => i.occurredAt).sort((a, b) => b.getTime() - a.getTime())

    resumo.push({ empresaId, totalCiclos, sucessos, falhas, healthScoreMedio, ultimoCiclo: datas[0] ?? null })
  }

  const ordenado = [...resumo].sort((a, b) => b.totalCiclos - a.totalCiclos)
  cache.set(CHAVE_CACHE_RESUMO_EMPRESA, ordenado, TTL.AGREGADO)
  return ordenado
}

export async function obterRankingPipelines(): Promise<PipelineRanking> {
  const cache = getCache()
  const cached = cache.get<PipelineRanking>(CHAVE_CACHE_RANKING)
  if (cached) return cached

  const resumos = await obterResumoPorPipeline()

  const porVolume = resumos
    .map((r) => ({ pipeline: r.pipeline, total: r.quantidadeExecucoes }))
    .sort((a, b) => b.total - a.total)

  const porTempoMedio = resumos
    .filter((r) => r.duracaoMedia !== null)
    .map((r) => ({ pipeline: r.pipeline, duracaoMedia: r.duracaoMedia! }))
    .sort((a, b) => b.duracaoMedia - a.duracaoMedia)

  const porFalhas = resumos
    .map((r) => ({ pipeline: r.pipeline, falhas: r.falhas }))
    .sort((a, b) => b.falhas - a.falhas)

  const result: PipelineRanking = { porVolume, porTempoMedio, porFalhas }
  cache.set(CHAVE_CACHE_RANKING, result, TTL.AGREGADO)
  return result
}
