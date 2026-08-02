import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { calcularPaginacao } from '@/lib/utils'
import type { TransacaoInput } from '@/lib/validations'
import { NotFoundError } from '@/lib/app-errors'
import type { TipoTransacao, StatusTransacao } from '@/types'
import { startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'

// ─── FILTROS ──────────────────────────────────────────────────────────────────

interface FiltroTransacao {
  tipo?: TipoTransacao
  status?: StatusTransacao
  clienteId?: string
  categoria?: string
  busca?: string
  mes?: number   // 1-12
  ano?: number
  page?: number
  pageSize?: number
}

// ─── LISTAR TRANSAÇÕES ────────────────────────────────────────────────────────

export async function listarTransacoes(empresaId: string, filtros: FiltroTransacao = {}) {
  const { page = 1, pageSize = 30, tipo, status, clienteId, categoria, busca, mes, ano } = filtros
  const { skip } = calcularPaginacao(0, page, pageSize)

  const agora = new Date()
  const anoRef = ano ?? agora.getFullYear()
  const mesRef = mes ?? agora.getMonth() + 1

  // Filtro de período
  const dataRef = new Date(anoRef, mesRef - 1, 1)
  const inicioPeriodo = startOfMonth(dataRef)
  const fimPeriodo    = endOfMonth(dataRef)

  const OR: Record<string, unknown>[] = [
    // Filtra pelo mês da data de vencimento (ou criação se não tiver vencimento)
    { dataVencimento: { gte: inicioPeriodo, lte: fimPeriodo } },
    { dataVencimento: null, criadaEm: { gte: inicioPeriodo, lte: fimPeriodo } },
  ]
  if (busca) {
    OR.push(
      { descricao: { contains: busca, mode: 'insensitive' as const } },
      { categoria: { contains: busca, mode: 'insensitive' as const } }
    )
  }

  const where = {
    empresaId,
    deletedAt: null,
    ...(tipo      && { tipo }),
    ...(status    && { status }),
    ...(clienteId && { clienteId }),
    ...(categoria && { categoria }),
    OR,
  }

  const [transacoes, total] = await Promise.all([
    prisma.transacao.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: [{ dataVencimento: 'asc' }, { criadaEm: 'desc' }],
      include: {
        cliente: { select: { id: true, nome: true } },
      },
    }),
    prisma.transacao.count({ where }),
  ])

  return { transacoes, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
}

// ─── RESUMO FINANCEIRO (KPIs) ─────────────────────────────────────────────────

export async function resumoFinanceiro(empresaId: string, mes?: number, ano?: number) {
  const agora  = new Date()
  const anoRef = ano ?? agora.getFullYear()
  const mesRef = mes ?? agora.getMonth() + 1

  const dataRef       = new Date(anoRef, mesRef - 1, 1)
  const inicioPeriodo = startOfMonth(dataRef)
  const fimPeriodo    = endOfMonth(dataRef)
  const inicioAno     = startOfYear(dataRef)
  const fimAno        = endOfYear(dataRef)

  const base = { empresaId, deletedAt: null, dataVencimento: { gte: inicioPeriodo, lte: fimPeriodo } }
  const baseAno = { empresaId, deletedAt: null, dataVencimento: { gte: inicioAno, lte: fimAno } }

  const [
    receitaMes,
    despesaMes,
    receitaPaga,
    despesaPaga,
    receitaPendente,
    vencidas,
    receitaAno,
    despesaAno,
    porCategoria,
    receitaMensalRecorrente,
  ] = await Promise.all([
    // Receita total do mês (todas)
    prisma.transacao.aggregate({
      where: { ...base, tipo: 'RECEITA' },
      _sum: { valor: true },
    }),
    // Despesa total do mês (todas)
    prisma.transacao.aggregate({
      where: { ...base, tipo: 'DESPESA' },
      _sum: { valor: true },
    }),
    // Receita paga no mês
    prisma.transacao.aggregate({
      where: { ...base, tipo: 'RECEITA', status: 'PAGO' },
      _sum: { valor: true },
    }),
    // Despesa paga no mês
    prisma.transacao.aggregate({
      where: { ...base, tipo: 'DESPESA', status: 'PAGO' },
      _sum: { valor: true },
    }),
    // Receita pendente (todos os meses)
    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', status: 'PENDENTE' },
      _sum: { valor: true },
    }),
    // Vencidas (todos os tipos)
    prisma.transacao.count({
      where: {
        empresaId,
        deletedAt: null,
        status: 'VENCIDO',
      },
    }),
    // Receita acumulada no ano
    prisma.transacao.aggregate({
      where: { ...baseAno, tipo: 'RECEITA', status: 'PAGO' },
      _sum: { valor: true },
    }),
    // Despesa acumulada no ano
    prisma.transacao.aggregate({
      where: { ...baseAno, tipo: 'DESPESA', status: 'PAGO' },
      _sum: { valor: true },
    }),
    // Breakdown por categoria (receitas pagas)
    prisma.transacao.groupBy({
      by: ['categoria'],
      where: { ...base, tipo: 'RECEITA', status: 'PAGO' },
      _sum: { valor: true },
      orderBy: { _sum: { valor: 'desc' } },
    }),
    // MRR — soma das mensalidades dos clientes ativos
    prisma.cliente.aggregate({
      where: { empresaId, deletedAt: null, status: 'ATIVO' },
      _sum: { valorMensal: true },
    }),
  ])

  const receitaBruta   = Number(receitaMes._sum.valor   ?? 0)
  const despesaBruta   = Number(despesaMes._sum.valor   ?? 0)
  const receitaLiquida = Number(receitaPaga._sum.valor  ?? 0)
  const despesaLiquida = Number(despesaPaga._sum.valor  ?? 0)
  const lucro          = receitaLiquida - despesaLiquida
  const margem         = receitaLiquida > 0 ? Math.round((lucro / receitaLiquida) * 100) : 0

  return {
    // Mês atual
    receitaBruta,
    despesaBruta,
    receitaLiquida,
    despesaLiquida,
    lucro,
    margem,
    receitaPendente:    Number(receitaPendente._sum.valor ?? 0),
    vencidas,
    // Ano
    receitaAno:         Number(receitaAno._sum.valor  ?? 0),
    despesaAno:         Number(despesaAno._sum.valor  ?? 0),
    // MRR
    mrr:                Number(receitaMensalRecorrente._sum.valorMensal ?? 0),
    // Breakdown
    porCategoria: porCategoria.map((c) => ({
      categoria: c.categoria ?? 'Sem categoria',
      valor:     Number(c._sum.valor ?? 0),
    })),
  }
}

// ─── CRIAR TRANSAÇÃO ──────────────────────────────────────────────────────────

export async function criarTransacao(empresaId: string, dados: TransacaoInput) {
  return prisma.transacao.create({
    data: {
      empresaId,
      ...dados,
      dataVencimento: dados.dataVencimento ?? null,
      dataPagamento:  dados.dataPagamento  ?? null,
      clienteId:      dados.clienteId      ?? null,
      categoria:      dados.categoria      ?? null,
    },
    include: {
      cliente: { select: { id: true, nome: true } },
    },
  })
}

// ─── ATUALIZAR TRANSAÇÃO ──────────────────────────────────────────────────────

const SELECT_COM_CLIENTE = {
  include: { cliente: { select: { id: true, nome: true } } },
} as const

export async function atualizarTransacao(id: string, empresaId: string, dados: Partial<TransacaoInput>) {
  const existe = await prisma.transacao.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!existe) throw new NotFoundError('Transação não encontrada')

  // Se marcando como pago sem data de pagamento, preenche automaticamente
  const extra: Record<string, unknown> = {}
  if (dados.status === 'PAGO' && !dados.dataPagamento && !existe.dataPagamento) {
    extra.dataPagamento = new Date()
  }

  // Escrita delimitada por empresaId (requisito do guard de tenant) e por id.
  // O shape de retorno é preservado via uma leitura explícita logo a seguir.
  await prisma.transacao.updateMany({
    where: { id, empresaId: existe.empresaId, deletedAt: null },
    data: { ...dados, ...extra },
  })

  const atualizada = await prisma.transacao.findFirst({
    where: { id, empresaId, deletedAt: null },
    include: SELECT_COM_CLIENTE.include,
  })
  if (!atualizada) throw new NotFoundError('Transação não encontrada')
  return atualizada
}

// ─── MARCAR COMO PAGO (atalho) ────────────────────────────────────────────────

export async function marcarComoPago(id: string, empresaId: string) {
  const existe = await prisma.transacao.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!existe) throw new NotFoundError('Transação não encontrada')

  await prisma.transacao.updateMany({
    where: { id, empresaId, deletedAt: null },
    data: { status: 'PAGO', dataPagamento: new Date() },
  })

  const atualizada = await prisma.transacao.findFirst({
    where: { id, empresaId, deletedAt: null },
    ...SELECT_COM_CLIENTE.include,
  })
  if (!atualizada) throw new NotFoundError('Transação não encontrada')
  return atualizada
}

// ─── EXCLUIR TRANSAÇÃO (soft delete) ──────────────────────────────────────────
// Exclusão lógica — especialmente importante em dados financeiros, onde
// apagar fisicamente um registro remove rastro contábil. O registro some
// da UI (todas as leituras filtram deletedAt: null) mas permanece no banco
// para eventual reconciliação ou auditoria futura.

export async function excluirTransacao(id: string, empresaId: string) {
  const existe = await prisma.transacao.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!existe) throw new NotFoundError('Transação não encontrada')

  await prisma.transacao.updateMany({
    where: { id, empresaId, deletedAt: null },
    data: { deletedAt: new Date() },
  })
  return true
}

// ─── LIXEIRA: LISTAR EXCLUÍDAS ────────────────────────────────────────────────

export async function listarTransacoesExcluidas(empresaId: string) {
  const trintaDiasAtras = new Date()
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30)

  return prisma.transacao.findMany({
    where: { empresaId, deletedAt: { not: null, gte: trintaDiasAtras } },
    orderBy: { deletedAt: 'desc' },
    select: { id: true, descricao: true, valor: true, tipo: true, status: true, deletedAt: true },
  })
}

// ─── LIXEIRA: RESTAURAR ───────────────────────────────────────────────────────

export async function restaurarTransacao(id: string, empresaId: string) {
  const existe = await prisma.transacao.findFirst({ where: { id, empresaId, deletedAt: { not: null } } })
  if (!existe) throw new NotFoundError('Transação excluída não encontrada')

  await prisma.transacao.updateMany({
    where: { id, empresaId, deletedAt: { not: null } },
    data: { deletedAt: null },
  })
  return true
}

// ─── AUTO-VENCER (cron job / chamada manual) ──────────────────────────────────
// Atualiza transações pendentes com vencimento passado para VENCIDO

export async function atualizarTransacoesVencidas(empresaId: string) {
  return prisma.transacao.updateMany({
    where: {
      empresaId,
      deletedAt: null,
      status: 'PENDENTE',
      dataVencimento: { lt: new Date() },
    },
    data: { status: 'VENCIDO' },
  })
}
