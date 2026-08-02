import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { calcularPaginacao } from '@/lib/utils'
import type { FiltroTarefa } from '@/types'
import type { TarefaInput } from '@/lib/validations'
import type { StatusTarefa } from '@prisma/client'
import { NotFoundError } from '@/lib/app-errors'

// ─── LISTAR TAREFAS ───────────────────────────────────────────────────────────

export async function listarTarefas(empresaId: string, filtros: FiltroTarefa = {}) {
  const { page = 1, pageSize = 50, status, prioridade, responsavelId, clienteId, tipo } = filtros
  const { skip } = calcularPaginacao(0, page, pageSize)

  const where = {
    empresaId,
    deletedAt: null,
    ...(status        && { status }),
    ...(prioridade    && { prioridade }),
    ...(responsavelId && { responsavelId }),
    ...(clienteId     && { clienteId }),
    ...(tipo          && { tipo }),
  }

  const [tarefas, total] = await Promise.all([
    prisma.tarefa.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: [
        { status: 'asc' },
        { prioridade: 'asc' },
        { dataVencimento: 'asc' },
        { criadaEm: 'desc' },
      ],
      include: {
        responsavel: { select: { id: true, nome: true, avatar: true } },
        cliente:     { select: { id: true, nome: true } },
        lead:        { select: { id: true, nome: true } },
      },
    }),
    prisma.tarefa.count({ where }),
  ])

  return { tarefas, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
}

// ─── TAREFAS DE HOJE + ATRASADAS ─────────────────────────────────────────────

export async function tarefasDeHoje(empresaId: string, usuarioId?: string) {
  const agora = new Date()
  const inicioHoje = new Date(agora); inicioHoje.setHours(0, 0, 0, 0)
  const fimHoje    = new Date(agora); fimHoje.setHours(23, 59, 59, 999)

  const where = {
    empresaId,
    deletedAt: null,
    status: { in: ['PENDENTE', 'EM_ANDAMENTO'] as StatusTarefa[] },
    ...(usuarioId && { responsavelId: usuarioId }),
  }

  const [hoje, atrasadas] = await Promise.all([
    prisma.tarefa.findMany({
      where: { ...where, dataVencimento: { gte: inicioHoje, lte: fimHoje } },
      orderBy: [{ prioridade: 'asc' }, { dataVencimento: 'asc' }],
      include: {
        responsavel: { select: { id: true, nome: true, avatar: true } },
        cliente:     { select: { id: true, nome: true } },
      },
    }),
    prisma.tarefa.findMany({
      where: { ...where, dataVencimento: { lt: inicioHoje } },
      orderBy: [{ dataVencimento: 'asc' }, { prioridade: 'asc' }],
      include: {
        responsavel: { select: { id: true, nome: true, avatar: true } },
        cliente:     { select: { id: true, nome: true } },
      },
    }),
  ])

  return { hoje, atrasadas }
}

// ─── CRIAR TAREFA ─────────────────────────────────────────────────────────────

export async function criarTarefa(empresaId: string, criadorId: string, dados: TarefaInput) {
  return prisma.tarefa.create({
    data: {
      empresaId,
      criadorId,
      ...dados,
      dataVencimento: dados.dataVencimento ?? null,
      responsavelId:  dados.responsavelId  ?? null,
      clienteId:      dados.clienteId      ?? null,
      leadId:         dados.leadId         ?? null,
    },
    include: {
      responsavel: { select: { id: true, nome: true, avatar: true } },
      cliente:     { select: { id: true, nome: true } },
      lead:        { select: { id: true, nome: true } },
    },
  })
}

// ─── ATUALIZAR TAREFA ─────────────────────────────────────────────────────────

const INCLUDE_TAREFA = {
  responsavel: { select: { id: true, nome: true, avatar: true } },
  cliente:     { select: { id: true, nome: true } },
  lead:        { select: { id: true, nome: true } },
} as const

async function obterTarefa(empresaId: string, id: string) {
  return prisma.tarefa.findFirst({
    where: { id, empresaId, deletedAt: null },
    include: INCLUDE_TAREFA,
  })
}

export async function atualizarTarefa(id: string, empresaId: string, dados: Partial<TarefaInput>) {
  const existe = await prisma.tarefa.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!existe) throw new NotFoundError('Tarefa não encontrada')

  // Se estiver concluindo, registra data de conclusão
  const extra: Record<string, unknown> = {}
  if (dados.status === 'CONCLUIDA' && existe.status !== 'CONCLUIDA') {
    extra.concluidaEm = new Date()
  }
  if (dados.status && dados.status !== 'CONCLUIDA') {
    extra.concluidaEm = null
  }

  await prisma.tarefa.updateMany({
    where: { id, empresaId, deletedAt: null },
    data: { ...dados, ...extra },
  })
  const tarefa = await obterTarefa(empresaId, id)
  if (!tarefa) throw new NotFoundError('Tarefa não encontrada')
  return tarefa
}

// ─── CONCLUIR / REABRIR (toggle) ──────────────────────────────────────────────

export async function toggleConcluida(id: string, empresaId: string) {
  const tarefa = await prisma.tarefa.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!tarefa) throw new NotFoundError('Tarefa não encontrada')

  const novoConcluida = tarefa.status !== 'CONCLUIDA'
  await prisma.tarefa.updateMany({
    where: { id, empresaId, deletedAt: null },
    data: {
      status:      novoConcluida ? 'CONCLUIDA' : 'PENDENTE',
      concluidaEm: novoConcluida ? new Date() : null,
    },
  })
  const atualizada = await obterTarefa(empresaId, id)
  if (!atualizada) throw new NotFoundError('Tarefa não encontrada')
  return atualizada
}

// ─── EXCLUIR TAREFA (soft delete) ─────────────────────────────────────────────
// Exclusão lógica: o registro permanece no banco com deletedAt preenchido,
// permitindo recuperação futura e preservando o histórico para auditoria.
// Todas as consultas de leitura (listarTarefas, tarefasDeHoje) já filtram
// deletedAt: null, então o registro some da UI imediatamente.
//
// Nota: rastrear QUEM excluiu (deletedById) exige um campo de auditoria que
// ainda não existe no schema — fica para uma migração dedicada, não deve
// ser misturado aqui. Por ora, apenas o registro de histórico (chamado pela
// rota, se aplicável) preserva o "quem fez o quê".

export async function excluirTarefa(id: string, empresaId: string) {
  const existe = await prisma.tarefa.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!existe) throw new NotFoundError('Tarefa não encontrada')

  await prisma.tarefa.updateMany({
    where: { id, empresaId, deletedAt: null },
    data: { deletedAt: new Date() },
  })
  return true
}

// ─── LIXEIRA: LISTAR EXCLUÍDAS ────────────────────────────────────────────────

export async function listarTarefasExcluidas(empresaId: string) {
  const trintaDiasAtras = new Date()
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30)

  return prisma.tarefa.findMany({
    where: { empresaId, deletedAt: { not: null, gte: trintaDiasAtras } },
    orderBy: { deletedAt: 'desc' },
    select: { id: true, titulo: true, status: true, prioridade: true, deletedAt: true },
  })
}

// ─── LIXEIRA: RESTAURAR ───────────────────────────────────────────────────────

export async function restaurarTarefa(id: string, empresaId: string) {
  const existe = await prisma.tarefa.findFirst({ where: { id, empresaId, deletedAt: { not: null } } })
  if (!existe) throw new NotFoundError('Tarefa excluída não encontrada')

  await prisma.tarefa.updateMany({
    where: { id, empresaId, deletedAt: { not: null } },
    data: { deletedAt: null },
  })
  return true
}
