import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import type { Prisma } from '@prisma/client'

// ─────────────────────────────────────────────────────────────────────────────
// CLAREZA GERADA — P59
//
// A Clareza Gerada é evidência, não score. O empresário responde logo após a
// conversa: "Qual foi a principal coisa que você percebeu sobre sua empresa?"
// com uma categoria de impacto.
//
// O funil principal é ANÔNIMO: o visitante faz a primeira conversa e decide
// criar a conta depois. Se a resposta de clareza fosse descartada nesse
// momento, a evidência mais importante do ciclo se perderia silenciosamente.
//
// Solução: a resposta fica pendente na própria conversa (`respostas.__clareza`)
// e é registrada como SinalValor assim que a conta existe (criar-conta ou
// finalizar com usuário autenticado).
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIAS_CLAREZA = ['NOVA_PERCEPCAO', 'CONFIRMACAO', 'MUDANCA_DE_DECISAO', 'NENHUM_IMPACTO'] as const

export type CategoriaClareza = (typeof CATEGORIAS_CLAREZA)[number]

const ROTULOS: Record<CategoriaClareza, string> = {
  NOVA_PERCEPCAO: 'Nova percepção',
  CONFIRMACAO: 'Confirmação',
  MUDANCA_DE_DECISAO: 'Mudança de decisão',
  NENHUM_IMPACTO: 'Nenhum impacto',
}

const CHAVE_PENDENTE = '__clareza'

interface ClarezaPendente {
  categoria?: string
  texto?: string
}

export function rotuloCategoria(categoria: string): string {
  return ROTULOS[categoria as CategoriaClareza] ?? categoria
}

// Guarda a resposta na conversa anônima para registrar quando a conta existir.
export async function registrarClarezaPendente(
  token: string,
  dados: { categoria: CategoriaClareza; texto: string },
): Promise<boolean> {
  const conversa = await prismaSeguro.conversa.findFirst({
    where: { token, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    select: { id: true, respostas: true },
  })
  if (!conversa) return false

  const respostas = (conversa.respostas as Record<string, unknown>) ?? {}
  respostas[CHAVE_PENDENTE] = { categoria: dados.categoria, texto: dados.texto }

  await prismaSeguro.conversa.update({
    where: { id: conversa.id },
    data: { respostas: respostas as Prisma.InputJsonValue },
  })

  return true
}

// Registra a clareza pendente como SinalValor quando a conta existe e remove a
// pendência da conversa. Retorna `true` se algo foi registrado.
export async function registrarClarezaDaConversa(token: string, empresaId: string): Promise<boolean> {
  const conversa = await prismaSeguro.conversa.findFirst({
    where: { token, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    select: { id: true, respostas: true },
  })
  if (!conversa) return false

  const respostas = (conversa.respostas as Record<string, unknown>) ?? {}
  const pendente = respostas[CHAVE_PENDENTE] as ClarezaPendente | undefined
  if (!pendente?.categoria || !pendente?.texto) return false

  const metadata = {
    reacao: pendente.texto,
    categoria: pendente.categoria,
    categoriaRotulo: rotuloCategoria(pendente.categoria),
    respondidoEm: new Date().toISOString(),
  }

  await prismaSeguro.$transaction(async (tx) => {
    const existente = await tx.sinalValor.findFirst({
      where: { empresaId, tipo: 'CLAREZA_GERADA', deletedAt: null },
      orderBy: { criadoEm: 'desc' },
    })

    if (existente) {
      await tx.sinalValor.update({
        where: { id: existente.id },
        data: { metadata: { ...((existente.metadata as Record<string, unknown>) ?? {}), ...metadata } },
      })
    } else {
      await tx.sinalValor.create({
        data: {
          empresaId,
          tipo: 'CLAREZA_GERADA',
          origem: 'PRIMEIRA_CONVERSA',
          peso: 1.0,
          metadata,
        },
      })
    }
  })

  delete respostas[CHAVE_PENDENTE]
  await prismaSeguro.conversa.update({
    where: { id: conversa.id },
    data: { respostas: respostas as Prisma.InputJsonValue },
  })

  return true
}
