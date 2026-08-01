import { prisma } from '@/lib/prisma'
import { startOfDay, endOfDay } from 'date-fns'
import { NotFoundError } from '@/lib/app-errors'
import { criarTransacao } from '@/services/transacao.service'
import { registrarEvidencia } from '@/engine/evidence-engine'
import { processarOutcome } from '@/engine/cognitive-orchestrator'
import type { TransacaoInput } from '@/lib/validations'

// ─── RESUMO DO DIA (Caixa do Atendimento) ───────────────────────────────────
// Números reais do dia a partir das Transações e do fluxo de atendimentos.
// Nada de valores fixos — o caixa é consequência da operação.

export async function resumoCaixaDoDia(empresaId: string) {
  const agora = new Date()
  const hojeInicio = startOfDay(agora)
  const hojeFim = endOfDay(agora)

  const ontemInicio = startOfDay(new Date(agora.getTime() - 86400000))
  const ontemFim = endOfDay(new Date(agora.getTime() - 86400000))

  const [faturamentoHoje, recebidoHoje, aReceber, clientesHoje, recebidoOntem] = await Promise.all([
    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', dataVencimento: { gte: hojeInicio, lte: hojeFim } },
      _sum: { valor: true },
    }),
    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', dataPagamento: { gte: hojeInicio, lte: hojeFim } },
      _sum: { valor: true },
    }),
    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', status: { in: ['PENDENTE', 'VENCIDO'] } },
      _sum: { valor: true },
    }),
    prisma.historico.count({
      where: { empresaId, criadoEm: { gte: hojeInicio, lte: hojeFim }, descricao: { startsWith: 'Atendimento:' } },
    }),
    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', dataPagamento: { gte: ontemInicio, lte: ontemFim } },
      _sum: { valor: true },
    }),
  ])

  const recebido = Number(recebidoHoje._sum.valor ?? 0)
  const recebidoAntes = Number(recebidoOntem._sum.valor ?? 0)

  return {
    faturamentoHoje: Number(faturamentoHoje._sum.valor ?? 0),
    recebidoHoje: recebido,
    aReceber: Number(aReceber._sum.valor ?? 0),
    ticketMedio: clientesHoje > 0 ? Math.round(recebido / clientesHoje) : 0,
    clientesHoje,
    variacao: recebidoAntes > 0 ? Math.round(((recebido - recebidoAntes) / recebidoAntes) * 100) : 0,
  }
}

// ─── REGISTRAR ATENDIMENTO ───────────────────────────────────────────────────
// Um atendimento não é só uma linha no histórico. Ele é:
// 1. A memória operacional do dia (Histórico)
// 2. O dinheiro do dia (Transação no Caixa)
// 3. Uma evidência de aprendizado (Evidência + Outcome — ETAPA 7)
// O aprendizado NUNCA pode travar o atendimento: se falhar, o atendimento segue.

export async function registrarAtendimento(
  empresaId: string,
  usuarioId: string,
  dados: { clienteId: string; servico: string; valor: number; recebido: boolean }
) {
  const cliente = await prisma.cliente.findFirst({
    where: { id: dados.clienteId, empresaId, deletedAt: null },
    select: { id: true, nome: true },
  })
  if (!cliente) throw new NotFoundError('Cliente não encontrado')

  await prisma.historico.create({
    data: {
      empresaId,
      usuarioId,
      clienteId: cliente.id,
      tipo: 'SISTEMA',
      titulo: dados.servico,
      descricao: `Atendimento: ${dados.servico} — R$ ${dados.valor.toFixed(2)}`,
    },
  })

  const transacaoInput: TransacaoInput = {
    tipo: 'RECEITA',
    descricao: dados.servico,
    valor: dados.valor,
    status: dados.recebido ? 'PAGO' : 'PENDENTE',
    dataVencimento: new Date(),
    dataPagamento: dados.recebido ? new Date() : null,
    recorrente: false,
    clienteId: cliente.id,
    categoria: 'Atendimento',
  }
  const transacao = await criarTransacao(empresaId, transacaoInput)

  try {
    await registrarEvidencia(empresaId, {
      categoria: 'CLIENTES',
      origem: 'MODULO_CRM',
      descricao: `${cliente.nome} foi atendido — ${dados.servico} (R$ ${dados.valor.toFixed(2)})`,
      confianca: 'ALTA',
      dados: {
        clienteId: cliente.id,
        servico: dados.servico,
        valor: dados.valor,
        recebido: dados.recebido,
        transacaoId: transacao.id,
      },
    })
    await processarOutcome(empresaId, {
      categoria: 'OPERACAO',
      origem: 'SISTEMA',
      descricao: `Atendimento registrado: ${dados.servico} — ${cliente.nome}`,
      confianca: 'ALTA',
      detalhes: { clienteId: cliente.id, servico: dados.servico, valor: dados.valor, recebido: dados.recebido },
    })
  } catch (err) {
    console.error('Falha ao registrar aprendizado do atendimento', err)
  }

  return { transacao }
}
