import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { TipoHistorico } from '@/types'
import { NotFoundError, BusinessRuleError } from '@/lib/app-errors'

interface FiltroHistorico {
  clienteId?: string
  leadId?: string
  tipo?: TipoHistorico
  busca?: string
  page?: number
  pageSize?: number
}

// ─── LISTAR HISTÓRICO GERAL ───────────────────────────────────────────────────

export async function listarHistorico(empresaId: string, filtros: FiltroHistorico = {}) {
  const { page = 1, pageSize = 30, clienteId, leadId, tipo, busca } = filtros
  const skip = (page - 1) * pageSize

  const where = {
    empresaId,
    ...(clienteId && { clienteId }),
    ...(leadId    && { leadId }),
    ...(tipo      && { tipo }),
    ...(busca && {
      OR: [
        { titulo:    { contains: busca, mode: 'insensitive' as const } },
        { descricao: { contains: busca, mode: 'insensitive' as const } },
      ],
    }),
  }

  const [historicos, total] = await Promise.all([
    prisma.historico.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { criadoEm: 'desc' },
      include: {
        usuario:    { select: { id: true, nome: true, avatar: true } },
        cliente:    { select: { id: true, nome: true } },
        lead:       { select: { id: true, nome: true } },
        implantacao:{ select: { id: true, titulo: true } },
      },
    }),
    prisma.historico.count({ where }),
  ])

  return { historicos, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
}

// ─── CRIAR REGISTRO DE HISTÓRICO ──────────────────────────────────────────────

export async function criarHistorico(
  empresaId: string,
  usuarioId: string,
  dados: {
    tipo: TipoHistorico
    titulo: string
    descricao?: string
    clienteId?: string | null
    leadId?: string | null
    implantacaoId?: string | null
  }
) {
  return prisma.historico.create({
    data: { empresaId, usuarioId, ...dados },
    include: {
      usuario: { select: { id: true, nome: true, avatar: true } },
      cliente: { select: { id: true, nome: true } },
      lead:    { select: { id: true, nome: true } },
    },
  })
}

// ─── EXCLUIR REGISTRO ─────────────────────────────────────────────────────────

export async function excluirHistorico(id: string, empresaId: string) {
  const existe = await prisma.historico.findFirst({ where: { id, empresaId } })
  if (!existe) throw new NotFoundError('Registro não encontrado')
  // Só permite excluir registros manuais (não SISTEMA)
  if (existe.tipo === 'SISTEMA') throw new BusinessRuleError('Registros automáticos não podem ser excluídos')
  await prisma.historico.deleteMany({ where: { id, empresaId } })
  return true
}

// ─── STATS DO FEED ────────────────────────────────────────────────────────────

export async function statsHistorico(empresaId: string) {
  const seteDiasAtras = new Date()
  seteDiasAtras.setDate(seteDiasAtras.getDate() - 7)

  const [total, semana, porTipo] = await Promise.all([
    prisma.historico.count({ where: { empresaId } }),
    prisma.historico.count({ where: { empresaId, criadoEm: { gte: seteDiasAtras } } }),
    prisma.historico.groupBy({
      by: ['tipo'],
      where: { empresaId, criadoEm: { gte: seteDiasAtras } },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    }),
  ])

  return {
    total,
    semana,
    porTipo: porTipo.map((p) => ({ tipo: p.tipo, total: p._count.id })),
  }
}
