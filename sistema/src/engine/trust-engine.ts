import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

export const DECAIMENTO_POR_DIA = 1
export const SCORE_INICIAL = 50
export const AJUSTE_ACERTO = 5
export const AJUSTE_ERRO = -10
export const SCORE_MINIMO = 0
export const SCORE_MAXIMO = 100

export interface TrustScore {
  nomeFonte: string
  scoreAtual: number
  totalAcertos: number
  totalErros: number
  taxaAcerto: number | null
  ultimoAcertoEm: Date | null
  ultimoErroEm: Date | null
  emDecaimento: boolean
}

type RegistroConfianca = {
  nomeFonte: string
  scoreAtual: number
  totalAcertos: number
  totalErros: number
  ultimoAcertoEm: Date | null
  ultimoErroEm: Date | null
}

// ─── Pure decay logic ──────────────────────────────────────────────

export function aplicarDecaimento(registro: RegistroConfianca): TrustScore {
  const agora = new Date()
  const ultimoRegistro = registro.ultimoAcertoEm ?? registro.ultimoErroEm
  if (!ultimoRegistro) {
    return {
      nomeFonte: registro.nomeFonte,
      scoreAtual: registro.scoreAtual,
      totalAcertos: registro.totalAcertos,
      totalErros: registro.totalErros,
      taxaAcerto: calcularTaxa(registro.totalAcertos, registro.totalErros),
      ultimoAcertoEm: registro.ultimoAcertoEm,
      ultimoErroEm: registro.ultimoErroEm,
      emDecaimento: false,
    }
  }

  const diasDesdeUltimo = Math.floor((agora.getTime() - ultimoRegistro.getTime()) / (1000 * 60 * 60 * 24))
  const scoreComDecaimento = Math.max(registro.scoreAtual - diasDesdeUltimo * DECAIMENTO_POR_DIA, SCORE_MINIMO)
  const emDecaimento = scoreComDecaimento < registro.scoreAtual

  return {
    nomeFonte: registro.nomeFonte,
    scoreAtual: scoreComDecaimento,
    totalAcertos: registro.totalAcertos,
    totalErros: registro.totalErros,
    taxaAcerto: calcularTaxa(registro.totalAcertos, registro.totalErros),
    ultimoAcertoEm: registro.ultimoAcertoEm,
    ultimoErroEm: registro.ultimoErroEm,
    emDecaimento,
  }
}

export function calcularTaxa(acertos: number, erros: number): number | null {
  const total = acertos + erros
  if (total === 0) return null
  return Math.round((acertos / total) * 100)
}

export function criarScorePadrao(nomeFonte: string): TrustScore {
  return {
    nomeFonte,
    scoreAtual: SCORE_INICIAL,
    totalAcertos: 0,
    totalErros: 0,
    taxaAcerto: null,
    ultimoAcertoEm: null,
    ultimoErroEm: null,
    emDecaimento: false,
  }
}

// ─── DB access ─────────────────────────────────────────────────────

export async function obterTrustScore(empresaId: string, nomeFonte: string): Promise<TrustScore> {
  const registro = await prisma.confiancaFonte.findUnique({
    where: { empresaId_nomeFonte: { empresaId, nomeFonte } },
  })
  if (!registro) return criarScorePadrao(nomeFonte)
  return aplicarDecaimento(registro)
}

export async function obterTodosTrustScores(empresaId: string): Promise<TrustScore[]> {
  const registros = await prisma.confiancaFonte.findMany({
    where: { empresaId, deletedAt: null },
  })
  if (registros.length === 0) return []
  return registros.map(aplicarDecaimento)
}

export async function recalcularDecaimento(empresaId: string): Promise<TrustScore[]> {
  return obterTodosTrustScores(empresaId)
}

export async function registrarAcerto(empresaId: string, nomeFonte: string): Promise<TrustScore> {
  const registro = await upsertFonte(empresaId, nomeFonte)
  const novoScore = Math.min(registro.scoreAtual + AJUSTE_ACERTO, SCORE_MAXIMO)
  const atualizado = await prisma.confiancaFonte.update({
    where: { id: registro.id },
    data: {
      scoreAtual: novoScore,
      totalAcertos: { increment: 1 },
      ultimoAcertoEm: new Date(),
    },
  })
  return aplicarDecaimento(atualizado)
}

export async function registrarErro(empresaId: string, nomeFonte: string): Promise<TrustScore> {
  const registro = await upsertFonte(empresaId, nomeFonte)
  const novoScore = Math.max(registro.scoreAtual + AJUSTE_ERRO, SCORE_MINIMO)
  const atualizado = await prisma.confiancaFonte.update({
    where: { id: registro.id },
    data: {
      scoreAtual: novoScore,
      totalErros: { increment: 1 },
      ultimoErroEm: new Date(),
    },
  })
  return aplicarDecaimento(atualizado)
}

async function upsertFonte(empresaId: string, nomeFonte: string) {
  return prisma.confiancaFonte.upsert({
    where: { empresaId_nomeFonte: { empresaId, nomeFonte } },
    update: {},
    create: { empresaId, nomeFonte, scoreAtual: SCORE_INICIAL },
  })
}
