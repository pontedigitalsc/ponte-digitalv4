import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import { startOfMonth } from 'date-fns'

// ─────────────────────────────────────────────────────────────────────────────
// EXPLORAÇÃO DE CENÁRIOS — P57A
//
// A Ponte não prevê o futuro. Ela explora cenários: "Como seria se eu
// aumentasse meus preços?" "Como seria se contratasse alguém?" "Como seria se
// criasse uma nova oferta?" Toda resposta começa com "Com base no que sabemos
// hoje..." e nunca afirma o futuro. Regra + template, sem IA — fiel ao
// princípio "IA é interface, não cérebro" e à segurança da IA (P58).
// ─────────────────────────────────────────────────────────────────────────────

export interface ContextoCenario {
  receitaMensal: number
  ticketMedio: number
  clientesAtivos: number
  tarefasPendentes: number
  pessoasNaEquipe: number
}

export interface Cenario {
  id: string
  pergunta: string
  titulo: string
  mudaria: string
  observacao: string
  risco: string
}

export interface ExploracaoCenarios {
  contexto: ContextoCenario
  cenarios: Cenario[]
  aviso: string
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function formatar(valor: number): string {
  return brl.format(valor)
}

export async function montarContextoCenario(empresaId: string): Promise<ContextoCenario> {
  const inicioMes = startOfMonth(new Date())

  const [receita, ticket, clientes, tarefas, pessoas] = await Promise.all([
    prismaSeguro.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', status: 'PAGO', dataPagamento: { gte: inicioMes } },
      _sum: { valor: true },
    }),
    prismaSeguro.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', status: 'PAGO' },
      _avg: { valor: true },
    }),
    prismaSeguro.cliente.count({
      where: { empresaId, deletedAt: null, status: { in: ['ATIVO', 'TRIAL'] } },
    }),
    prismaSeguro.tarefa.count({
      where: { empresaId, deletedAt: null, status: { in: ['PENDENTE', 'EM_ANDAMENTO'] } },
    }),
    prismaSeguro.usuario.count({ where: { empresaId, deletedAt: null, ativo: true } }),
  ])

  return {
    receitaMensal: Number(receita._sum.valor ?? 0),
    ticketMedio: Number(ticket._avg.valor ?? 0),
    clientesAtivos: clientes,
    tarefasPendentes: tarefas,
    pessoasNaEquipe: pessoas,
  }
}

export function gerarCenarios(ctx: ContextoCenario): ExploracaoCenarios {
  const temDados = ctx.receitaMensal > 0 || ctx.clientesAtivos > 0 || ctx.ticketMedio > 0

  // ── Como seria se eu aumentasse meus preços? ─────────────────────────────
  const aumentarPrecos: Cenario = {
    id: 'aumentar-precos',
    pergunta: 'Como seria se eu aumentasse meus preços?',
    titulo: 'Aumentar preços',
    mudaria: temDados
      ? `Com base no que sabemos hoje, com ${ctx.clientesAtivos} cliente${ctx.clientesAtivos === 1 ? '' : 's'} ativo${ctx.clientesAtivos === 1 ? '' : 's'} e ticket médio de ${formatar(ctx.ticketMedio)}, um aumento de 10% no ticket representaria cerca de ${formatar(ctx.receitaMensal * 0.1)} a mais por mês se a base se mantivesse.`
      : 'Com base no que sabemos hoje, sua empresa ainda não tem um histórico de receita e ticket registrado na Ponte — então não dá para estimar números. O que dá para fazer é tratar o aumento como uma hipótese a observar: o que os clientes mais fiéis fariam diante de um aumento pequeno?',
    observacao: 'O que mudaria para observar: quantos clientes se mantêm, quantos passam a comprar menos, e como isso afeta a sensação de tranquilidade no fim do mês.',
    risco: 'O risco a observar não é o preço em si — é a previsibilidade de receita antes de arriscar uma mudança dessa natureza.',
  }

  // ── Como seria se eu contratasse alguém? ─────────────────────────────────
  const contratarAlguem: Cenario = {
    id: 'contratar-alguem',
    pergunta: 'Como seria se contratasse alguém?',
    titulo: 'Contratar alguém',
    mudaria: ctx.tarefasPendentes > 0
      ? `Com base no que sabemos hoje, existem ${ctx.tarefasPendentes} tarefa${ctx.tarefasPendentes === 1 ? '' : 's'} pendente${ctx.tarefasPendentes === 1 ? '' : 's'} registradas. Contratar não é sobre pagar alguém — é sobre escolher, de todo esse acúmulo, o que exatamente essa pessoa vai liberar de você.`
      : 'Com base no que sabemos hoje, a pergunta mais útil não é "consigo pagar alguém?" — é "qual tarefa, se saísse de você, liberaria mais tempo ou tranquilidade?" Contratar começa por definir isso.',
    observacao: 'O que mudaria para observar: se a tarefa escolhida realmente sai da sua cabeça, e se o tempo liberado vira espaço para a empresa — e não para mais trabalho.',
    risco: 'O risco a observar é contratar a primeira coisa que aparecer para aliviar a pressão de hoje, em vez de estruturar o que vai ser transferido.',
  }

  // ── Como seria se eu criasse uma nova oferta? ────────────────────────────
  const novaOferta: Cenario = {
    id: 'nova-oferta',
    pergunta: 'Como seria se criasse uma nova oferta?',
    titulo: 'Criar uma nova oferta',
    mudaria: ctx.clientesAtivos > 0
      ? `Com base no que sabemos hoje, você já tem ${ctx.clientesAtivos} cliente${ctx.clientesAtivos === 1 ? '' : 's'} ativo${ctx.clientesAtivos === 1 ? '' : 's'}. Uma nova oferta não precisa de novos clientes para ser testada — ela pode começar como uma pergunta aos mais fiéis: "se eu criasse isso, você compraria?"`
      : 'Com base no que sabemos hoje, uma nova oferta nasce melhor de uma pergunta aos clientes que você já conhece do que de uma ideia nova vinda de dentro. Antes de criar, pergunte.',
    observacao: 'O que mudaria para observar: o que os clientes mais fiéis respondem, e se a oferta resolve algo que eles já demonstraram que doem.',
    risco: 'O risco a observar é criar uma oferta para o mercado imaginado, em vez de para o cliente real que já confia em você.',
  }

  return {
    contexto: ctx,
    cenarios: [aumentarPrecos, contratarAlguem, novaOferta],
    aviso: 'A Ponte não prevê o futuro. Ela explora cenários com base no que sabemos hoje — e nenhum cenário é uma promessa.',
  }
}
