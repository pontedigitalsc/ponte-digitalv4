// P36 ETAPA 4 — Biblioteca de Momentos WOW
// Sempre que um empresário demonstrar surpresa positiva, registrar.
// Invisível. Alimenta a biblioteca permanente da Ponte.

import { prisma } from '@/lib/prisma'

const FRASES_WOW = [
  'nunca tinha percebido',
  'economizou muito tempo',
  'agora faz sentido',
  'resolvi em cinco minutos',
  'incrível',
  'não acredito',
  'muito bom',
  'simplificou demais',
  'por que não fiz isso antes',
  'mudou minha visão',
  'agora entendi',
  'que diferença',
  'muito mais fácil',
  'isso é genial',
  'nunca mais vou precisar',
]

export function detectarWow(fala: string): boolean {
  const falaLower = fala.toLowerCase()
  return FRASES_WOW.some(frase => falaLower.includes(frase))
}

export async function registrarWow(
  empresaId: string,
  frase: string,
  contexto?: string,
  origem?: string,
) {
  const intensidade = calcularIntensidade(frase)

  await prisma.momentoWow.create({
    data: {
      empresaId,
      frase,
      contexto: contexto ?? null,
      categoria: classificarWow(frase),
      intensidade,
      origem: origem ?? 'SISTEMA',
    },
  })
}

function calcularIntensidade(frase: string): number {
  const exclamacao = (frase.match(/!/g) ?? []).length
  const palavras = frase.split(/\s+/).length
  if (exclamacao >= 2 && palavras <= 6) return 5
  if (exclamacao >= 1) return 4
  if (palavras <= 8) return 3
  return 2
}

function classificarWow(frase: string): string {
  const f = frase.toLowerCase()
  if (f.includes('tempo') || f.includes('minuto') || f.includes('segundo')) return 'ECONOMIA_TEMPO'
  if (f.includes('sentido') || f.includes('entendi') || f.includes('visão')) return 'CLAREZA'
  if (f.includes('fácil') || f.includes('simplificou')) return 'SIMPLICIDADE'
  if (f.includes('nunca') || f.includes('primeira vez')) return 'DESCOBERTA'
  if (f.includes('genial') || f.includes('incrível')) return 'ENCONTAMENTO'
  return 'OUTRO'
}
