import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import { registrarEventoAtivacao } from '@/engine/founder-activation-engine'
import type { Prisma } from '@prisma/client'

// ─────────────────────────────────────────────────────────────────────────────
// O RETORNO — P64
//
// A primeira sessão entrega o Retrato, mas só vira relação quando o empresário
// volta. Este motor fecha esse loop com um mecanismo de produto:
//
//   1. Finalizar a conversa agenda um retorno (7 dias depois) — a Ponte não
//      cobra, apenas lembra que quer saber o que aconteceu depois da conversa.
//   2. Quando o empresário volta (dentro ou fora da janela), se o retorno
//      estiver disponível e ainda não foi feito, o check-in aparece junto do
//      Retrato — nunca o bloqueando.
//   3. O check-in é evidência real: SinalValor `RETORNO_7_DIAS` +
//      EventoAtivacao `PRIMEIRO_RETORNO` (que hoje existia no enum mas nunca
//      era gravado). Alimenta diretamente o Protocolo Founder 1–10
//      ("Depois de 7 dias: voltou? mudou a visão? alguma recomendação ajudou?").
//
// Funil anônimo: a resposta fica pendente na conversa (`respostas.__retorno`)
// e é registrada quando a conta existe — mesmo padrão da Clareza Gerada (P59).
// ─────────────────────────────────────────────────────────────────────────────

export const JANELA_RETORNO_DIAS = 7

export const OPCOES_RETORNO = [
  { valor: 'voltei-a-olhar', rotulo: 'Voltei a olhar a empresa' },
  { valor: 'comecei-algo', rotulo: 'Comecei algo que a conversa apontou' },
  { valor: 'mudou-minha-visao', rotulo: 'Mudou minha visão sobre a empresa' },
  { valor: 'nada-ainda', rotulo: 'Ainda não fiz nada' },
] as const

export type OpcaoRetorno = (typeof OPCOES_RETORNO)[number]['valor']

const ROTULOS: Record<OpcaoRetorno, string> = {
  'voltei-a-olhar': 'Voltei a olhar a empresa',
  'comecei-algo': 'Comecei algo que a conversa apontou',
  'mudou-minha-visao': 'Mudou minha visão sobre a empresa',
  'nada-ainda': 'Ainda não fiz nada',
}

export function rotuloOpcaoRetorno(opcao: string): string {
  return ROTULOS[opcao as OpcaoRetorno] ?? opcao
}

const CHAVE_PENDENTE = '__retorno'

interface RetornoPendente {
  mudou?: string
  texto?: string
}

// ─── 1. AGENDAR — chamado ao finalizar a primeira conversa ──────────────────

export async function agendarRetorno(conversaId: string, dias = JANELA_RETORNO_DIAS): Promise<void> {
  const conversa = await prismaSeguro.conversa.findFirst({
    where: { id: conversaId, deletedAt: null },
    select: { id: true, retornoDisponivelEm: true },
  })
  if (!conversa) return

  // Nunca sobrescreve um retorno já agendado (a janela pertence à sessão que
  // gerou o Retrato; sessões seguintes agendam o próximo retorno).
  if (conversa.retornoDisponivelEm) return

  const disponivelEm = new Date(Date.now() + dias * 24 * 60 * 60 * 1000)
  await prismaSeguro.conversa.update({
    where: { id: conversa.id },
    data: { retornoDisponivelEm: disponivelEm },
  })
}

// ─── 2. CONSULTAR — o que o GET /api/conversa devolve junto do Retrato ──────

export interface RetornoDisponivel {
  disponivel: boolean
  agendado: boolean
  dataDisponivel: string | null
  conversaId: string | null
}

export async function obterRetornoDisponivel(token: string): Promise<RetornoDisponivel | null> {
  const conversa = await prismaSeguro.conversa.findFirst({
    where: { token, concluida: true, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    select: { id: true, retornoDisponivelEm: true, retornoConcluidoEm: true },
  })
  if (!conversa) return null

  const agendado = conversa.retornoDisponivelEm !== null
  const disponivel =
    agendado &&
    conversa.retornoDisponivelEm! <= new Date() &&
    conversa.retornoConcluidoEm === null

  return {
    disponivel,
    agendado,
    dataDisponivel: conversa.retornoDisponivelEm?.toISOString() ?? null,
    conversaId: conversa.id,
  }
}

// ─── 3. REGISTRAR — grava a pendência e, se houver conta, a evidência ───────

export async function registrarRetorno(
  token: string,
  dados: { mudou: OpcaoRetorno; texto: string },
): Promise<{ gravado: boolean; pendente: boolean }> {
  const conversa = await prismaSeguro.conversa.findFirst({
    where: { token, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    select: { id: true, empresaId: true, respostas: true, retornoConcluidoEm: true },
  })
  if (!conversa) return { gravado: false, pendente: false }

  // Marca o retorno como feito nesta conversa (indempotente).
  if (!conversa.retornoConcluidoEm) {
    await prismaSeguro.conversa.update({
      where: { id: conversa.id },
      data: { retornoConcluidoEm: new Date() },
    })
  }

  // Pendência na conversa — registrada quando a conta existir.
  await registrarRetornoPendente(token, dados)

  if (!conversa.empresaId) {
    return { gravado: false, pendente: true }
  }

  await registrarRetornoDaConversa(token, conversa.empresaId)
  return { gravado: true, pendente: false }
}

async function registrarRetornoPendente(
  token: string,
  dados: { mudou: OpcaoRetorno; texto: string },
): Promise<boolean> {
  const conversa = await prismaSeguro.conversa.findFirst({
    where: { token, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    select: { id: true, respostas: true },
  })
  if (!conversa) return false

  const respostas = (conversa.respostas as Record<string, unknown>) ?? {}
  respostas[CHAVE_PENDENTE] = { mudou: dados.mudou, texto: dados.texto }

  await prismaSeguro.conversa.update({
    where: { id: conversa.id },
    data: { respostas: respostas as Prisma.InputJsonValue },
  })
  return true
}

// Registra o retorno pendente como evidência (SinalValor + EventoAtivacao)
// quando a conta existe e remove a pendência da conversa.
export async function registrarRetornoDaConversa(token: string, empresaId: string): Promise<boolean> {
  const conversa = await prismaSeguro.conversa.findFirst({
    where: { token, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    select: { id: true, respostas: true },
  })
  if (!conversa) return false

  const respostas = (conversa.respostas as Record<string, unknown>) ?? {}
  const pendente = respostas[CHAVE_PENDENTE] as RetornoPendente | undefined
  if (!pendente?.mudou || !pendente?.texto) return false

  const metadata = {
    mudou: pendente.mudou,
    mudouRotulo: rotuloOpcaoRetorno(pendente.mudou),
    texto: pendente.texto,
    respondidoEm: new Date().toISOString(),
    conversaId: conversa.id,
  }

  await prismaSeguro.$transaction(async (tx) => {
    const existente = await tx.sinalValor.findFirst({
      where: { empresaId, tipo: 'RETORNO_7_DIAS', deletedAt: null },
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
          tipo: 'RETORNO_7_DIAS',
          origem: 'PRIMEIRA_CONVERSA',
          peso: 1.0,
          metadata,
        },
      })
    }
  })

  // Evento de ativação — o único retorno comprovado pela própria Ponte.
  await registrarEventoAtivacao(empresaId, 'PRIMEIRO_RETORNO', {
    mudou: pendente.mudou,
    texto: pendente.texto,
  }).catch(() => null)

  delete respostas[CHAVE_PENDENTE]
  await prismaSeguro.conversa.update({
    where: { id: conversa.id },
    data: { respostas: respostas as Prisma.InputJsonValue },
  })

  return true
}
