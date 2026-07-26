import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { Prisma } from '@prisma/client'
import type { TipoEventoAtivacao } from '@prisma/client'

type NivelAtivacao = 'NOVO' | 'CONHECENDO' | 'ATIVO' | 'ENGAJADO' | 'FUNDADOR_VALIDADO'

export interface JornadaFundador {
  nivel: NivelAtivacao
  progresso: number
  eventos: string[]
  proximosPassos: string[]
}

// ─── Eventos únicos por empresa (unique constraint empresaId + tipo) ──────

export async function registrarEventoAtivacao(
  empresaId: string,
  tipo: TipoEventoAtivacao,
  dados?: Record<string, unknown>
) {
  try {
    return await prisma.eventoAtivacao.create({
      data: { empresaId, tipo, dados: dados ?? undefined },
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return null
    }
    throw err
  }
}

// ─── Cálculo determinístico do nível ────────────────────────────────────

export async function calcularNivelAtivacao(empresaId: string) {
  const eventos = await prisma.eventoAtivacao.findMany({
    where: { empresaId },
    select: { tipo: true },
  })

  const tipos = new Set(eventos.map((e) => e.tipo))

  const temDiagnostico = tipos.has('DIAGNOSTICO_COMPLETO') || tipos.has('IDENTIDADE_CRIADA')
  const temDecisao = tipos.has('PRIMEIRA_DECISAO_VISTA')
  const temAcaoCriada = tipos.has('PRIMEIRA_ACAO_CRIADA')
  const temAcaoConcluida = tipos.has('PRIMEIRA_ACAO_CONCLUIDA')
  const temFeedback = tipos.has('PRIMEIRO_FEEDBACK')
  const temRetorno = tipos.has('PRIMEIRO_RETORNO')
  const temConversaMensal = tipos.has('CONVERSA_MENSAL_REALIZADA')

  const totalEventos = tipos.size

  // FUNDADOR_VALIDADO — retorno comprovado + conversa recorrente
  if (temRetorno && temConversaMensal && temAcaoConcluida && temFeedback) {
    return { nivel: 'FUNDADOR_VALIDADO' as NivelAtivacao, progresso: 100, tipos: [...tipos] }
  }

  // ENGAJADO — ação concluída + feedback
  if ((temAcaoConcluida || temConversaMensal) && (temFeedback || temRetorno)) {
    return { nivel: 'ENGAJADO' as NivelAtivacao, progresso: 80, tipos: [...tipos] }
  }

  // ATIVO — decisão vista + ação criada
  if (temDecisao && temAcaoCriada) {
    return { nivel: 'ATIVO' as NivelAtivacao, progresso: 60, tipos: [...tipos] }
  }

  // CONHECENDO — diagnóstico ou identidade criada
  if (temDiagnostico) {
    return { nivel: 'CONHECENDO' as NivelAtivacao, progresso: 30, tipos: [...tipos] }
  }

  // NOVO — nenhum evento significativo
  return {
    nivel: 'NOVO' as NivelAtivacao,
    progresso: totalEventos > 0 ? 10 : 0,
    tipos: [...tipos],
  }
}

// ─── Jornada completa ──────────────────────────────────────────────────

export async function obterJornadaFundador(empresaId: string): Promise<JornadaFundador> {
  const { nivel, progresso, tipos } = await calcularNivelAtivacao(empresaId)
  const eventos = await prisma.eventoAtivacao.findMany({
    where: { empresaId },
    orderBy: { criadoEm: 'asc' },
    select: { tipo: true, criadoEm: true },
  })

  const proximosPassos = gerarProximosPassos(nivel, tipos)

  return {
    nivel,
    progresso,
    eventos: eventos.map((e) => e.tipo),
    proximosPassos,
  }
}

// ─── Próximos passos por nível ─────────────────────────────────────────

function gerarProximosPassos(nivel: NivelAtivacao, tiposAtuais: string[]): string[] {
  const passos: string[] = []
  const t = new Set(tiposAtuais)

  if (nivel === 'NOVO') {
    passos.push('Responder ao diagnóstico inicial')
    passos.push('Criar sua conta na Ponte')
  }

  if (nivel === 'CONHECENDO' || nivel === 'NOVO') {
    if (!t.has('PRIMEIRA_DECISAO_VISTA')) passos.push('Explorar a primeira recomendação')
    if (!t.has('PRIMEIRA_ACAO_CRIADA')) passos.push('Criar uma ação a partir de uma decisão')
  }

  if (nivel === 'ATIVO' || nivel === 'CONHECENDO' || nivel === 'NOVO') {
    if (!t.has('PRIMEIRA_ACAO_CONCLUIDA')) passos.push('Concluir a primeira ação')
    if (!t.has('PRIMEIRO_FEEDBACK')) passos.push('Dar feedback sobre uma ação concluída')
  }

  if (nivel === 'ENGAJADO' || nivel === 'ATIVO' || nivel === 'CONHECENDO' || nivel === 'NOVO') {
    if (!t.has('PRIMEIRO_RETORNO')) passos.push('Identificar um resultado concreto gerado pela Ponte')
    if (!t.has('CONVERSA_MENSAL_REALIZADA')) passos.push('Realizar a conversa mensal de acompanhamento')
  }

  return passos.slice(0, 3)
}

// ─── Helper de tradução para interface ─────────────────────────────────

export function rotuloNivel(nivel: NivelAtivacao): string {
  const mapa: Record<NivelAtivacao, string> = {
    NOVO: 'Novo',
    CONHECENDO: 'Conhecendo',
    ATIVO: 'Ativo',
    ENGAJADO: 'Engajado',
    FUNDADOR_VALIDADO: 'Fundador Validado',
  }
  return mapa[nivel]
}

export function descricaoNivel(nivel: NivelAtivacao): string {
  const mapa: Record<NivelAtivacao, string> = {
    NOVO: 'Você está começando sua jornada com a Ponte.',
    CONHECENDO: 'Você já compartilhou informações sobre sua empresa.',
    ATIVO: 'Você está explorando recomendações e criando ações.',
    ENGAJADO: 'Você está concluindo ações e dando retorno sobre os resultados.',
    FUNDADOR_VALIDADO: 'Você já colheu resultados concretos e mantém uma relação contínua com a Ponte.',
  }
  return mapa[nivel]
}

export function corNivel(nivel: NivelAtivacao): string {
  const mapa: Record<NivelAtivacao, string> = {
    NOVO: 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400',
    CONHECENDO: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
    ATIVO: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
    ENGAJADO: 'bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400',
    FUNDADOR_VALIDADO: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
  }
  return mapa[nivel]
}
