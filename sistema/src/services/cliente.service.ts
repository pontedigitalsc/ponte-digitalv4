import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { criarHistorico } from '@/services/historico.service'
import { calcularPaginacao } from '@/lib/utils'
import type { FiltroCliente } from '@/types'
import type { ClienteInput } from '@/lib/validations'
import { NotFoundError, ConflictError } from '@/lib/app-errors'

// ─── LISTAR CLIENTES ──────────────────────────────────────────────────────────

export async function listarClientes(empresaId: string, filtros: FiltroCliente = {}) {
  const { page = 1, pageSize = 20, status, segmento, busca } = filtros
  const { skip } = calcularPaginacao(0, page, pageSize)

  const where = {
    empresaId,
    deletedAt: null,
    ...(status && { status }),
    ...(segmento && { segmento }),
    ...(busca && {
      OR: [
        { nome: { contains: busca, mode: 'insensitive' as const } },
        { email: { contains: busca, mode: 'insensitive' as const } },
        { telefone: { contains: busca, mode: 'insensitive' as const } },
        { cidade: { contains: busca, mode: 'insensitive' as const } },
      ],
    }),
  }

  const [clientes, total] = await Promise.all([
    prisma.cliente.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { nome: 'asc' },
      include: {
        _count: {
          select: { tarefas: true, historicos: true, implantacoes: true },
        },
      },
    }),
    prisma.cliente.count({ where }),
  ])

  let resultado = clientes

  // Enriquecimento para a tela de Atendimento: último serviço/valor, visitas e
  // total gasto, derivados das Transações reais (o caixa do dia é a consequência).
  if (filtros.paraAtendimento && clientes.length > 0) {
    const ids = clientes.map((c) => c.id)

    const [ultimasTransacoes, porCliente] = await Promise.all([
      prisma.transacao.findMany({
        where: { empresaId, deletedAt: null, clienteId: { in: ids }, tipo: 'RECEITA' },
        orderBy: { criadaEm: 'desc' },
        select: { clienteId: true, descricao: true, valor: true, dataPagamento: true, criadaEm: true },
      }),
      prisma.transacao.groupBy({
        by: ['clienteId'],
        where: { empresaId, deletedAt: null, clienteId: { in: ids }, tipo: 'RECEITA' },
        _count: { id: true },
        _sum: { valor: true },
      }),
    ])

    const ultimoPorCliente = new Map<string, typeof ultimasTransacoes[number]>()
    for (const t of ultimasTransacoes) {
      if (t.clienteId && !ultimoPorCliente.has(t.clienteId)) ultimoPorCliente.set(t.clienteId, t)
    }

    resultado = clientes.map((c) => {
      const ultimo = ultimoPorCliente.get(c.id)
      const agg = porCliente.find((p) => p.clienteId === c.id)
      const referencia = ultimo?.dataPagamento ?? ultimo?.criadaEm
      const dias = referencia ? Math.max(0, Math.floor((Date.now() - referencia.getTime()) / 86400000)) : null
      return {
        ...c,
        ultimoServico: ultimo?.descricao ?? null,
        ultimoValor: ultimo?.valor != null ? Number(ultimo.valor) : null,
        diasDesdeUltimo: dias,
        totalGasto: Number(agg?._sum.valor ?? 0),
        totalVisitas: agg?._count.id ?? 0,
      }
    })
  }

  return { clientes: resultado, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
}

// ─── BUSCAR CLIENTE POR ID (perfil completo) ──────────────────────────────────

export async function buscarClientePorId(id: string, empresaId: string) {
  return prisma.cliente.findFirst({
    where: { id, empresaId, deletedAt: null },
    include: {
      contatos: { orderBy: { principal: 'desc' } },
      tarefas: {
        where: { status: { not: 'CANCELADA' } },
        orderBy: [{ status: 'asc' }, { dataVencimento: 'asc' }],
        take: 10,
        include: {
          responsavel: { select: { id: true, nome: true, avatar: true } },
        },
      },
      historicos: {
        orderBy: { criadoEm: 'desc' },
        take: 20,
        include: {
          usuario: { select: { id: true, nome: true, avatar: true } },
        },
      },
      implantacoes: {
        orderBy: { criadaEm: 'desc' },
        include: {
          etapas: { orderBy: { ordem: 'asc' } },
        },
      },
      transacoes: {
        where: { status: { in: ['PENDENTE', 'VENCIDO'] } },
        orderBy: { dataVencimento: 'asc' },
        take: 5,
      },
      _count: {
        select: { tarefas: true, historicos: true, implantacoes: true },
      },
    },
  })
}

// ─── CRIAR CLIENTE ────────────────────────────────────────────────────────────

export async function criarCliente(empresaId: string, usuarioId: string, dados: ClienteInput) {
  const [cliente] = await prisma.$transaction(async (tx) => {
    const c = await tx.cliente.create({
      data: { empresaId, ...dados },
      include: {
        _count: { select: { tarefas: true, historicos: true, implantacoes: true } },
      },
    })

    await tx.historico.create({
      data: {
        empresaId,
        usuarioId,
        clienteId: c.id,
        tipo: 'SISTEMA',
        titulo: 'Cliente cadastrado',
        descricao: `${c.nome} foi adicionado à base de clientes.`,
      },
    })

    return [c]
  })

  return cliente
}

// ─── CONVERTER LEAD EM CLIENTE ────────────────────────────────────────────────

export async function converterLeadEmCliente(
  leadId: string,
  empresaId: string,
  usuarioId: string,
  dadosExtras: Partial<ClienteInput> = {}
) {
  const lead = await prisma.lead.findFirst({ where: { id: leadId, empresaId, deletedAt: null }, include: { cliente: true } })
  if (!lead) throw new NotFoundError('Lead não encontrado')
  if (lead.cliente) throw new ConflictError('Este lead já foi convertido em cliente')

  const [cliente] = await prisma.$transaction([
    // Cria o cliente a partir dos dados do lead
    prisma.cliente.create({
      data: {
        empresaId,
        leadId: lead.id,
        nome: lead.nome,
        email: lead.email ?? undefined,
        telefone: lead.telefone ?? undefined,
        segmento: dadosExtras.segmento,
        valorMensal: dadosExtras.valorMensal ?? (lead.valor ? Number(lead.valor) : undefined),
        status: 'ATIVO',
        ...dadosExtras,
      },
    }),
    // Marca o lead como ganho
    prisma.lead.updateMany({
      where: { id: leadId, empresaId, deletedAt: null },
      data: { estagio: 'FECHADO_GANHO' },
    }),
  ])

  await criarHistorico(empresaId, usuarioId, {
    clienteId: cliente.id,
    leadId,
    tipo: 'SISTEMA',
    titulo: 'Lead convertido em cliente',
    descricao: `Lead "${lead.nome}" convertido e adicionado à base de clientes.`,
  })

  // Cria implantação automática
  await prisma.implantacao.create({
    data: {
      empresaId,
      clienteId: cliente.id,
      titulo: `Implantação — ${cliente.nome}`,
      status: 'PENDENTE',
      etapas: {
        create: [
          { empresaId, titulo: 'Kickoff com o cliente',             ordem: 1 },
          { empresaId, titulo: 'Configuração inicial do sistema',   ordem: 2 },
          { empresaId, titulo: 'Migração de dados',                 ordem: 3 },
          { empresaId, titulo: 'Treinamento da equipe',             ordem: 4 },
          { empresaId, titulo: 'Período de testes',                 ordem: 5 },
          { empresaId, titulo: 'Go-live',                           ordem: 6 },
          { empresaId, titulo: 'Acompanhamento pós-implantação',    ordem: 7 },
        ],
      },
    },
  })

  return cliente
}

// ─── ATUALIZAR CLIENTE ────────────────────────────────────────────────────────

export async function atualizarCliente(
  id: string,
  empresaId: string,
  dados: Partial<ClienteInput>
) {
  const existe = await prisma.cliente.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!existe) throw new NotFoundError('Cliente não encontrado')

  await prisma.cliente.updateMany({
    where: { id, empresaId, deletedAt: null },
    data: dados,
  })
  const cliente = await prisma.cliente.findFirst({
    where: { id, empresaId, deletedAt: null },
    include: { _count: { select: { tarefas: true, historicos: true, implantacoes: true } } },
  })
  if (!cliente) throw new NotFoundError('Cliente não encontrado')
  return cliente
}

// ─── EXCLUIR CLIENTE (soft delete) ────────────────────────────────────────────
// Cliente é o modelo com mais relações filhas do sistema (Tarefa, Historico,
// Implantacao, Transacao, Contato). Exclusão lógica aqui é ainda mais
// importante do que nos demais domínios: apagar fisicamente um cliente
// apagaria em cascata (via onDelete: Cascade do schema) todo o histórico
// comercial e financeiro vinculado a ele.
//
// Deliberadamente NÃO propagamos deletedAt para as entidades filhas — cada
// uma mantém seu próprio ciclo de vida. Uma Tarefa vinculada a um cliente
// excluído continua existindo e aparece normalmente nas listagens gerais de
// Tarefa (que filtram por deletedAt da própria Tarefa, não do cliente pai).
// Isso é intencional: excluir o cadastro do cliente não deveria apagar o
// registro de trabalho já realizado.

export async function excluirCliente(id: string, empresaId: string) {
  const existe = await prisma.cliente.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!existe) throw new NotFoundError('Cliente não encontrado')

  await prisma.cliente.updateMany({
    where: { id, empresaId, deletedAt: null },
    data: { deletedAt: new Date() },
  })
  return true
}

// ─── LIXEIRA: LISTAR EXCLUÍDOS ────────────────────────────────────────────────
// Busca clientes soft-deletados dos últimos 30 dias — não expomos o
// histórico de exclusão indefinidamente, apenas uma janela recente onde
// "restaurar por engano" é uma ação plausível.

export async function listarClientesExcluidos(empresaId: string) {
  const trintaDiasAtras = new Date()
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30)

  return prisma.cliente.findMany({
    where: { empresaId, deletedAt: { not: null, gte: trintaDiasAtras } },
    orderBy: { deletedAt: 'desc' },
    select: { id: true, nome: true, segmento: true, status: true, deletedAt: true },
  })
}

// ─── LIXEIRA: RESTAURAR ───────────────────────────────────────────────────────

export async function restaurarCliente(id: string, empresaId: string) {
  const existe = await prisma.cliente.findFirst({ where: { id, empresaId, deletedAt: { not: null } } })
  if (!existe) throw new NotFoundError('Cliente excluído não encontrado')

  await prisma.cliente.updateMany({
    where: { id, empresaId, deletedAt: { not: null } },
    data: { deletedAt: null },
  })
  return true
}

// ─── ADICIONAR HISTÓRICO ──────────────────────────────────────────────────────

export async function adicionarHistorico(
  clienteId: string,
  empresaId: string,
  usuarioId: string,
  tipo: string,
  titulo: string,
  descricao?: string
) {
  return prisma.historico.create({
    data: {
      empresaId,
      usuarioId,
      clienteId,
      tipo: tipo as never,
      titulo,
      descricao,
    },
    include: {
      usuario: { select: { id: true, nome: true, avatar: true } },
    },
  })
}

// ─── STATS GERAIS ─────────────────────────────────────────────────────────────

export async function statsClientes(empresaId: string) {
  const [porStatus, receitaMensal] = await Promise.all([
    prisma.cliente.groupBy({
      by: ['status'],
      where: { empresaId, deletedAt: null },
      _count: { id: true },
    }),
    prisma.cliente.aggregate({
      where: { empresaId, deletedAt: null, status: 'ATIVO' },
      _sum: { valorMensal: true },
    }),
  ])

  return {
    porStatus: porStatus.map((s) => ({ status: s.status, total: s._count.id })),
    receitaMensalRecorrente: Number(receitaMensal._sum.valorMensal ?? 0),
  }
}
