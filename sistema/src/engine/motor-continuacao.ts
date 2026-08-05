import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { montarContinuidadeConversa } from './relacao-engine'

// P69 — Conversa Permanente: Agenda Inteligente (motor-continuacao.ts).
//
// A Ponte não depende do empresário lembrar dela — ela lembra do empresário.
// Ao abrir a Ponte, antes de qualquer módulo, o empresário encontra
// "Hoje vale conversarmos sobre...": uma agenda montada da história daquela
// empresa. NUNCA por data — sempre por contexto.
//
// Regras absolutas:
// - Nunca interrompe com notificação vazia.
// - Nunca cria tarefa artificial.
// - Nunca mostra mais que 3 assuntos.
// - Nunca repete pergunta já respondida ou assunto encerrado.
// - Se não há motivo legítimo, mostra apenas a mensagem gentil.

export type PrioridadeAssunto = 'ALTA' | 'MEDIA' | 'BAIXA'
export type TipoAssunto = 'DECISAO' | 'HIPOTESE' | 'EVOLUCAO'

export interface ItemAbertura {
  id: string
  tipo: TipoAssunto
  titulo: string
  contexto: string // a razão legítima, baseada na história — nunca "X dias sem acessar"
  pergunta: string
  opcoes: string[]
  prioridade: PrioridadeAssunto
  rota: string
}

export interface AgendaDoDia {
  saudacao: string
  itens: ItemAbertura[]
  vazia: boolean
  mensagemVazia: string
  convite: string
}

const ORDEM_PRIORIDADE: Record<PrioridadeAssunto, number> = { ALTA: 0, MEDIA: 1, BAIXA: 2 }

function diasDesde(data: Date, agora: Date): number {
  return Math.floor((agora.getTime() - data.getTime()) / (24 * 60 * 60 * 1000))
}

function saudacaoDoDia(agora: Date): string {
  const hora = agora.getHours()
  if (hora >= 5 && hora < 12) return 'Bom dia.'
  if (hora >= 12 && hora < 18) return 'Boa tarde.'
  return 'Boa noite.'
}

// P69 — escolhe os assuntos da abertura. Nenhuma IA: a decisão é
// determinística, sobre dados e memória reais. Critérios, em ordem de peso:
// 1. Decisão acompanhada (P68) sem retorno há alguns dias — "não sabemos como
//    terminou" é uma razão legítima para abrir conversa.
// 2. Hipótese importante ainda não validada (impacto alto/médio, ativa).
// 3. Evolução: passou tempo desde a última conversa e há o que retomar.
//
// Nunca há mais que 3 assuntos; cada um com prioridade Alta/Média/Baixa.
export async function montarAgendaDoDia(empresaId: string): Promise<AgendaDoDia> {
  const agora = new Date()
  const itens: ItemAbertura[] = []

  const [decisoes, hipoteses, ultimaConversa, continuidade] = await Promise.all([
    prisma.acaoCognitiva.findMany({
      where: {
        empresaId,
        deletedAt: null,
        status: { in: ['PENDENTE', 'EM_ANDAMENTO'] },
      },
      select: { id: true, titulo: true, criadaEm: true, atualizadaEm: true, origem: true, feedbacks: { where: { deletedAt: null }, select: { id: true }, take: 1 } },
      orderBy: { criadaEm: 'asc' },
    }),
    prisma.hipotese.findMany({
      where: {
        empresaId,
        deletedAt: null,
        estado: { in: ['NOVA', 'EM_OBSERVACAO', 'FORTALECIDA'] },
      },
      select: { id: true, descricao: true, impacto: true },
      orderBy: [{ impacto: 'desc' }, { criadaEm: 'asc' }],
      take: 6,
    }),
    prisma.conversa.findFirst({
      where: { empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      select: { criadaEm: true },
    }),
    montarContinuidadeConversa(empresaId).catch(() => null),
  ])

  // 1 — Decisões acompanhadas abertas. Uma decisão viva que não voltou é a
  // razão mais legítima: ela importa para o futuro da empresa.
  for (const d of decisoes) {
    const idadeDias = diasDesde(d.criadaEm, agora)
    // Só entra se já passou algum tempo desde o registro (>= 3 dias) — logo
    // após nascer, ela está sendo pensada; voltar agora seria insistência.
    if (idadeDias < 3) continue
    const prioridade: PrioridadeAssunto = idadeDias >= 7 ? 'ALTA' : 'MEDIA'
    itens.push({
      id: `decisao:${d.id}`,
      tipo: 'DECISAO',
      titulo: d.titulo,
      contexto: 'Há uma decisão importante que ainda não sabemos como terminou.',
      pergunta: 'Essa decisão aconteceu?',
      opcoes: ['Sim', 'Ainda não', 'Mudei de ideia'],
      prioridade,
      rota: '/centro-decisao',
    })
    if (itens.length >= 3) break
  }

  // 2 — Hipóteses importantes ainda não validadas. A Ponte continua acreditando
  // em algo sobre a empresa e precisa saber se ainda é verdade.
  for (const h of hipoteses) {
    const prioridade: PrioridadeAssunto = h.impacto === 'ALTO' ? 'ALTA' : 'MEDIA'
    itens.push({
      id: `hipotese:${h.id}`,
      tipo: 'HIPOTESE',
      titulo: h.descricao.slice(0, 90),
      contexto: 'Eu continuo acreditando em algo sobre sua empresa e quero saber se ainda faz sentido.',
      pergunta: 'Você ainda sente isso?',
      opcoes: ['Sim', 'Parcialmente', 'Não'],
      prioridade,
      rota: '/conversa',
    })
    if (itens.length >= 3) break
  }

  // 3 — Evolução: faz tempo desde a última conversa e há o que retomar. A
  // frase usa memória recente ("na última conversa você contou..."), nunca
  // "você está há X dias sem acessar".
  if (itens.length < 3 && ultimaConversa) {
    const diasDesdeConversa = diasDesde(ultimaConversa.criadaEm, agora)
    if (diasDesdeConversa >= 7 && continuidade) {
      itens.push({
        id: `evolucao:${ultimaConversa.criadaEm.toISOString()}`,
        tipo: 'EVOLUCAO',
        titulo: continuidade.slice(0, 120),
        contexto: 'Desde nossa última conversa algumas coisas podem ter mudado.',
        pergunta: 'Nesta semana isso mudou?',
        opcoes: ['Melhorou', 'Continua igual', 'Piorou'],
        prioridade: diasDesdeConversa >= 14 ? 'ALTA' : 'MEDIA',
        rota: '/conversa',
      })
    }
  }

  const itensOrdenados = itens
    .sort((a, b) => ORDEM_PRIORIDADE[a.prioridade] - ORDEM_PRIORIDADE[b.prioridade])
    .slice(0, 3)

  return {
    saudacao: saudacaoDoDia(agora),
    itens: itensOrdenados,
    vazia: itensOrdenados.length === 0,
    mensagemVazia:
      'Hoje não encontrei nenhum ponto que mereça sua atenção imediata. Mas, se alguma decisão importante estiver acontecendo, estou aqui.',
    convite: 'Tem alguma decisão importante acontecendo hoje?',
  }
}
