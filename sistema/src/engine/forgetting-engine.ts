import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { avaliarEnvelhecimento } from './knowledge-aging-engine'
import { obterConhecimentosAprovados, enfraquecerConhecimento } from './knowledge-governance-engine'
import { registrarNaMemoria } from './cognitive-memory-engine'
import type { CategoriaEvidencia } from '@prisma/client'

// ─── Estados do Conhecimento ────────────────────────────────────────────────

export enum EstadoConhecimento {
  ATIVO = 'ATIVO',
  ENFRAQUECENDO = 'ENFRAQUECENDO',
  ADORMECIDO = 'ADORMECIDO',
  ARQUIVADO = 'ARQUIVADO',
}

export interface EstadoMetadata {
  estadoConhecimento: EstadoConhecimento
  arquivadoEm: Date | null
  motivoArquivamento: string | null
  reativadoEm: Date | null
  adormecidoEm: Date | null
  scoreDecaimento: number
  ultimoEstado: EstadoConhecimento | null
}

// ─── Configuração ───────────────────────────────────────────────────────────

export interface ForgettingConfig {
  diasSemUsoParaEnfraquecer: number
  diasSemUsoParaAdormecer: number
  diasSemUsoParaArquivar: number
  scoreMinimoParaAtivo: number
  scoreMinimoParaEnfraquecendo: number
  confirmacoesMinimasParaAtivo: number
  refutacoesMaximasParaAtivo: number
}

export const FORGETTING_CONFIG: ForgettingConfig = {
  diasSemUsoParaEnfraquecer: 90,
  diasSemUsoParaAdormecer: 180,
  diasSemUsoParaArquivar: 365,
  scoreMinimoParaAtivo: 50,
  scoreMinimoParaEnfraquecendo: 30,
  confirmacoesMinimasParaAtivo: 3,
  refutacoesMaximasParaAtivo: 2,
}

// ─── Resultado da Avaliação ─────────────────────────────────────────────────

export interface ConhecimentoEstado {
  conhecimentoId: string
  descricao: string
  categoria: string
  estadoAtual: EstadoConhecimento
  estadoSugerido: EstadoConhecimento
  scoreConfianca: number
  diasSemUso: number
  confirmacoes: number
  refutacoes: number
  motivo: string
}

export interface AvaliacaoResultado {
  empresaId: string
  data: string
  totalAvaliados: number
  sugestoes: ConhecimentoEstado[]
  resumo: {
    manterAtivo: number
    enfraquecer: number
    adormecer: number
    arquivar: number
  }
}

// ─── Observabilidade ────────────────────────────────────────────────────────

export interface ForgettingStats {
  ativos: number
  enfraquecendo: number
  adormecidos: number
  arquivados: number
  reativados: number
  totalAvaliacoes: number
}

let stats: ForgettingStats = {
  ativos: 0,
  enfraquecendo: 0,
  adormecidos: 0,
  arquivados: 0,
  reativados: 0,
  totalAvaliacoes: 0,
}

export function getForgettingStats(): ForgettingStats {
  return { ...stats }
}

function atualizarStats(estado: EstadoConhecimento, incremento: number): void {
  if (estado === EstadoConhecimento.ATIVO) stats.ativos += incremento
  else if (estado === EstadoConhecimento.ENFRAQUECENDO) stats.enfraquecendo += incremento
  else if (estado === EstadoConhecimento.ADORMECIDO) stats.adormecidos += incremento
  else if (estado === EstadoConhecimento.ARQUIVADO) stats.arquivados += incremento
}

export function resetForgettingStats(): void {
  stats = { ativos: 0, enfraquecendo: 0, adormecidos: 0, arquivados: 0, reativados: 0, totalAvaliacoes: 0 }
}

// ─── Helpers internos ───────────────────────────────────────────────────────

function obterEstadoAtual(dados: unknown): EstadoConhecimento {
  const metadata = dados as Record<string, unknown> | null
  const estado = metadata?.estadoConhecimento as string | undefined
  return (estado as EstadoConhecimento) ?? EstadoConhecimento.ATIVO
}

function montarMetadata(estado: EstadoConhecimento, motivo?: string): Record<string, unknown> {
  const agora = new Date()
  const base: Record<string, unknown> = { estadoConhecimento: estado }
  if (estado === EstadoConhecimento.ARQUIVADO) {
    base.arquivadoEm = agora.toISOString()
    base.motivoArquivamento = motivo ?? null
  } else if (estado === EstadoConhecimento.ADORMECIDO) {
    base.adormecidoEm = agora.toISOString()
  }
  return base
}

type ConhecimentoComDados = {
  id: string
  descricao: string
  categoria: string
  scoreConfianca: number
  quantidadeConfirmacoes: number
  quantidadeRefutacoes: number
  dados: unknown
  ultimaAuditoria: Date | null
  ultimaValidacao: Date | null
  atualizadoEm: Date
}

function determinarSugestao(
  conhecimento: ConhecimentoComDados,
  config: ForgettingConfig
): { estadoSugerido: EstadoConhecimento; motivo: string } {
  const estadoAtual = obterEstadoAtual(conhecimento.dados as Record<string, unknown> | null)
  if (estadoAtual === EstadoConhecimento.ARQUIVADO) {
    return { estadoSugerido: EstadoConhecimento.ARQUIVADO, motivo: 'Conhecimento arquivado anteriormente' }
  }

  const referencia = conhecimento.ultimaAuditoria ?? conhecimento.ultimaValidacao ?? conhecimento.atualizadoEm
  const diasSemUso = Math.floor((Date.now() - new Date(referencia).getTime()) / (1000 * 60 * 60 * 24))

  if (diasSemUso > config.diasSemUsoParaArquivar) {
    return {
      estadoSugerido: EstadoConhecimento.ARQUIVADO,
      motivo: `Sem uso há ${diasSemUso} dias (limite: ${config.diasSemUsoParaArquivar})`,
    }
  }

  if (diasSemUso > config.diasSemUsoParaAdormecer) {
    return {
      estadoSugerido: EstadoConhecimento.ADORMECIDO,
      motivo: `Sem uso há ${diasSemUso} dias (limite: ${config.diasSemUsoParaAdormecer})`,
    }
  }

  if (
    conhecimento.scoreConfianca < config.scoreMinimoParaAtivo &&
    conhecimento.quantidadeRefutacoes >= config.refutacoesMaximasParaAtivo
  ) {
    return {
      estadoSugerido: EstadoConhecimento.ENFRAQUECENDO,
      motivo: `Score ${conhecimento.scoreConfianca} abaixo de ${config.scoreMinimoParaAtivo} com ${conhecimento.quantidadeRefutacoes} refutações`,
    }
  }

  if (
    conhecimento.scoreConfianca < config.scoreMinimoParaEnfraquecendo &&
    diasSemUso > config.diasSemUsoParaEnfraquecer
  ) {
    return {
      estadoSugerido: EstadoConhecimento.ENFRAQUECENDO,
      motivo: `Score baixo (${conhecimento.scoreConfianca}) e sem uso há ${diasSemUso} dias`,
    }
  }

  return {
    estadoSugerido: EstadoConhecimento.ATIVO,
    motivo: 'Conhecimento dentro dos critérios de atividade',
  }
}

// ─── Métodos principais ─────────────────────────────────────────────────────

export async function avaliar(empresaId: string, config?: Partial<ForgettingConfig>): Promise<AvaliacaoResultado> {
  const cfg = { ...FORGETTING_CONFIG, ...config }

  const conhecimentos = await prisma.conhecimentoValidado.findMany({
    where: { empresaId },
    select: {
      id: true,
      descricao: true,
      categoria: true,
      scoreConfianca: true,
      quantidadeConfirmacoes: true,
      quantidadeRefutacoes: true,
      dados: true,
      ultimaAuditoria: true,
      ultimaValidacao: true,
      atualizadoEm: true,
    },
  })

  const sugestoes: ConhecimentoEstado[] = []
  const resumo = { manterAtivo: 0, enfraquecer: 0, adormecer: 0, arquivar: 0 }

  for (const c of conhecimentos) {
    const estadoAtual = obterEstadoAtual(c.dados as Record<string, unknown> | null)
    const { estadoSugerido, motivo } = determinarSugestao(c, cfg)

    sugestoes.push({
      conhecimentoId: c.id,
      descricao: c.descricao,
      categoria: c.categoria,
      estadoAtual,
      estadoSugerido,
      scoreConfianca: c.scoreConfianca,
      diasSemUso: Math.floor((Date.now() - new Date(c.ultimaAuditoria ?? c.ultimaValidacao ?? c.atualizadoEm).getTime()) / (1000 * 60 * 60 * 24)),
      confirmacoes: c.quantidadeConfirmacoes,
      refutacoes: c.quantidadeRefutacoes,
      motivo,
    })

    if (estadoSugerido === EstadoConhecimento.ATIVO) resumo.manterAtivo++
    else if (estadoSugerido === EstadoConhecimento.ENFRAQUECENDO) resumo.enfraquecer++
    else if (estadoSugerido === EstadoConhecimento.ADORMECIDO) resumo.adormecer++
    else if (estadoSugerido === EstadoConhecimento.ARQUIVADO) resumo.arquivar++
  }

  stats.totalAvaliacoes++

  return {
    empresaId,
    data: new Date().toISOString(),
    totalAvaliados: conhecimentos.length,
    sugestoes,
    resumo,
  }
}

export async function arquivar(conhecimentoId: string, empresaId: string, motivo: string): Promise<void> {
  const conhecimento = await prisma.conhecimentoValidado.findFirst({
    where: { id: conhecimentoId, empresaId },
    select: { id: true, descricao: true, categoria: true, dados: true },
  })
  if (!conhecimento) return

  const metadados = (conhecimento.dados as Record<string, unknown>) ?? {}
  const metadataAtualizada = {
    ...metadados,
    ...montarMetadata(EstadoConhecimento.ARQUIVADO, motivo),
    ultimoEstado: metadados.estadoConhecimento ?? 'ATIVO',
  }

  await prisma.conhecimentoValidado.update({
    where: { id: conhecimentoId, empresaId },
    data: {
      dados: metadataAtualizada,
      atualizadoEm: new Date(),
    },
  })

  atualizarStats(EstadoConhecimento.ARQUIVADO, 1)

  void registrarNaMemoria(empresaId, {
    tipo: 'descarte',
    descricao: `Conhecimento arquivado: ${conhecimento.descricao} — ${motivo}`,
    categoria: conhecimento.categoria as CategoriaEvidencia,
    versao: 0,
    metadados: { conhecimentoId, motivo, acao: 'ARQUIVAR' },
  })
}

export async function reativar(conhecimentoId: string, empresaId: string, motivo: string): Promise<void> {
  const conhecimento = await prisma.conhecimentoValidado.findFirst({
    where: { id: conhecimentoId, empresaId },
    select: { id: true, descricao: true, categoria: true, dados: true },
  })
  if (!conhecimento) return

  const metadados = (conhecimento.dados as Record<string, unknown>) ?? {}

  await prisma.conhecimentoValidado.update({
    where: { id: conhecimentoId, empresaId },
    data: {
      dados: {
        ...metadados,
        estadoConhecimento: EstadoConhecimento.ATIVO,
        reativadoEm: new Date().toISOString(),
        ultimoEstado: metadados.estadoConhecimento ?? 'ARQUIVADO',
      },
      ultimaAuditoria: new Date(),
      atualizadoEm: new Date(),
    },
  })

  stats.reativados++

  void registrarNaMemoria(empresaId, {
    tipo: 'evolucao',
    descricao: `Conhecimento reativado: ${conhecimento.descricao} — ${motivo}`,
    categoria: conhecimento.categoria as CategoriaEvidencia,
    versao: 0,
    metadados: { conhecimentoId, motivo, acao: 'REATIVAR' },
  })
}

export async function marcarEnfraquecimento(conhecimentoId: string, empresaId: string, motivo: string): Promise<void> {
  const conhecimento = await prisma.conhecimentoValidado.findFirst({
    where: { id: conhecimentoId, empresaId },
    select: { id: true, descricao: true, categoria: true, dados: true, scoreConfianca: true },
  })
  if (!conhecimento) return

  const metadados = (conhecimento.dados as Record<string, unknown>) ?? {}

  await prisma.conhecimentoValidado.update({
    where: { id: conhecimentoId, empresaId },
    data: {
      dados: {
        ...metadados,
        estadoConhecimento: EstadoConhecimento.ENFRAQUECENDO,
        ultimoEstado: metadados.estadoConhecimento ?? 'ATIVO',
        scoreDecaimento: (metadados.scoreDecaimento as number ?? 0) + 5,
      },
      atualizadoEm: new Date(),
    },
  })

  atualizarStats(EstadoConhecimento.ENFRAQUECENDO, 1)

  void registrarNaMemoria(empresaId, {
    tipo: 'mudanca',
    descricao: `Conhecimento enfraquecendo: ${conhecimento.descricao} — ${motivo}`,
    categoria: conhecimento.categoria as CategoriaEvidencia,
    versao: 0,
    metadados: { conhecimentoId, motivo, scoreAnterior: conhecimento.scoreConfianca, acao: 'ENFRAQUECER' },
  })
}

export async function adormecer(conhecimentoId: string, empresaId: string, motivo: string): Promise<void> {
  const conhecimento = await prisma.conhecimentoValidado.findFirst({
    where: { id: conhecimentoId, empresaId },
    select: { id: true, descricao: true, categoria: true, dados: true },
  })
  if (!conhecimento) return

  const metadados = (conhecimento.dados as Record<string, unknown>) ?? {}

  await prisma.conhecimentoValidado.update({
    where: { id: conhecimentoId, empresaId },
    data: {
      dados: {
        ...metadados,
        estadoConhecimento: EstadoConhecimento.ADORMECIDO,
        adormecidoEm: new Date().toISOString(),
        ultimoEstado: metadados.estadoConhecimento ?? 'ATIVO',
      },
      atualizadoEm: new Date(),
    },
  })

  atualizarStats(EstadoConhecimento.ADORMECIDO, 1)

  void registrarNaMemoria(empresaId, {
    tipo: 'mudanca',
    descricao: `Conhecimento adormecido: ${conhecimento.descricao} — ${motivo}`,
    categoria: conhecimento.categoria as CategoriaEvidencia,
    versao: 0,
    metadados: { conhecimentoId, motivo, acao: 'ADORMECER' },
  })
}
