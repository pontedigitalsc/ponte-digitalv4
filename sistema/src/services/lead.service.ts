import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { criarHistorico } from '@/services/historico.service'
import { calcularPaginacao } from '@/lib/utils'
import type { FiltroLead, EstagioLead } from '@/types'
import type { LeadInput } from '@/lib/validations'
import { NotFoundError } from '@/lib/app-errors'

// ─── LISTAR LEADS (pipeline ou lista) ────────────────────────────────────────

export async function listarLeads(empresaId: string, filtros: FiltroLead = {}) {
  const { page = 1, pageSize = 100, estagio, responsavelId, temperatura, busca } = filtros
  const { skip } = calcularPaginacao(0, page, pageSize)

  const where = {
    empresaId,
    deletedAt: null,
    ...(estagio && { estagio }),
    ...(responsavelId && { responsavelId }),
    ...(temperatura && { temperatura }),
    ...(busca && {
      OR: [
        { nome: { contains: busca, mode: 'insensitive' as const } },
        { empresa: { contains: busca, mode: 'insensitive' as const } },
        { email: { contains: busca, mode: 'insensitive' as const } },
      ],
    }),
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { atualizadoEm: 'desc' },
      include: {
        responsavel: { select: { id: true, nome: true, avatar: true } },
        _count: { select: { tarefas: true, historicos: true } },
      },
    }),
    prisma.lead.count({ where }),
  ])

  return { leads, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
}

// ─── BUSCAR LEAD POR ID ───────────────────────────────────────────────────────

export async function buscarLeadPorId(id: string, empresaId: string) {
  return prisma.lead.findFirst({
    where: { id, empresaId, deletedAt: null },
    include: {
      responsavel: { select: { id: true, nome: true, avatar: true } },
      tarefas: {
        where: { status: { not: 'CANCELADA' } },
        orderBy: { dataVencimento: 'asc' },
        take: 5,
      },
      historicos: {
        orderBy: { criadoEm: 'desc' },
        take: 10,
        include: { usuario: { select: { id: true, nome: true, avatar: true } } },
      },
      _count: { select: { tarefas: true, historicos: true } },
    },
  })
}

// ─── CRIAR LEAD ───────────────────────────────────────────────────────────────

export async function criarLead(empresaId: string, usuarioId: string, dados: LeadInput) {
  const [lead] = await prisma.$transaction(async (tx) => {
    const l = await tx.lead.create({
      data: {
        empresaId,
        ...dados,
        valor: dados.valor ?? null,
        contatoEm: new Date(),
      },
      include: {
        responsavel: { select: { id: true, nome: true, avatar: true } },
      },
    })

    await tx.historico.create({
      data: {
        empresaId,
        usuarioId,
        leadId: l.id,
        tipo: 'SISTEMA',
        titulo: 'Oportunidade criada',
        descricao: `"${l.nome}" adicionada às etapas de negociação.`,
      },
    })

    return [l]
  })

  return lead
}

// ─── ATUALIZAR LEAD ───────────────────────────────────────────────────────────

export async function atualizarLead(id: string, empresaId: string, usuarioId: string, dados: Partial<LeadInput>) {
  const leadAnterior = await prisma.lead.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!leadAnterior) throw new NotFoundError('Lead não encontrado')

  await prisma.lead.updateMany({
    where: { id, empresaId, deletedAt: null },
    data: { ...dados, valor: dados.valor ?? null },
  })
  const lead = await prisma.lead.findFirst({
    where: { id, empresaId, deletedAt: null },
    include: { responsavel: { select: { id: true, nome: true, avatar: true } } },
  })
  if (!lead) throw new NotFoundError('Lead não encontrado')

  // Registrar mudança de estágio no histórico
  if (dados.estagio && dados.estagio !== leadAnterior.estagio) {
    const estagios: Record<string, string> = {
      CONTATO: 'Contato', DIAGNOSTICO: 'Diagnóstico', PROPOSTA: 'Proposta',
      NEGOCIACAO: 'Negociação', FECHADO_GANHO: 'Ganho', FECHADO_PERDIDO: 'Perdido',
    }
    await criarHistorico(empresaId, usuarioId, {
      leadId: id,
      tipo: 'SISTEMA',
      titulo: 'Etapa atualizada',
      descricao: `Movido de "${estagios[leadAnterior.estagio]}" para "${estagios[dados.estagio]}".`,
    })
  }

  return lead
}

// ─── MOVER ESTÁGIO (pipeline drag) ───────────────────────────────────────────

export async function moverEstagio(id: string, empresaId: string, usuarioId: string, novoEstagio: EstagioLead) {
  return atualizarLead(id, empresaId, usuarioId, { estagio: novoEstagio })
}

// ─── EXCLUIR LEAD (soft delete) ───────────────────────────────────────────────
// Um lead pode representar semanas de trabalho comercial (contatos,
// histórico, tarefas vinculadas) — exclusão lógica preserva esse rastro
// mesmo depois que o lead some do pipeline visível.

export async function excluirLead(id: string, empresaId: string) {
  const lead = await prisma.lead.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!lead) throw new NotFoundError('Lead não encontrado')

  await prisma.lead.updateMany({
    where: { id, empresaId, deletedAt: null },
    data: { deletedAt: new Date() },
  })
  return true
}

// ─── LIXEIRA: LISTAR EXCLUÍDOS ────────────────────────────────────────────────

export async function listarLeadsExcluidos(empresaId: string) {
  const trintaDiasAtras = new Date()
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30)

  return prisma.lead.findMany({
    where: { empresaId, deletedAt: { not: null, gte: trintaDiasAtras } },
    orderBy: { deletedAt: 'desc' },
    select: { id: true, nome: true, empresa: true, estagio: true, deletedAt: true },
  })
}

// ─── LIXEIRA: RESTAURAR ───────────────────────────────────────────────────────

export async function restaurarLead(id: string, empresaId: string) {
  const existe = await prisma.lead.findFirst({ where: { id, empresaId, deletedAt: { not: null } } })
  if (!existe) throw new NotFoundError('Lead excluído não encontrado')

  await prisma.lead.updateMany({
    where: { id, empresaId, deletedAt: { not: null } },
    data: { deletedAt: null },
  })
  return true
}

// ─── STATS DO PIPELINE ────────────────────────────────────────────────────────

export async function statsPipeline(empresaId: string) {
  const leads = await prisma.lead.groupBy({
    by: ['estagio'],
    where: { empresaId, deletedAt: null },
    _count: { id: true },
    _sum: { valor: true },
  })

  return leads.map((l) => ({
    estagio: l.estagio,
    total: l._count.id,
    valorTotal: Number(l._sum.valor ?? 0),
  }))
}
