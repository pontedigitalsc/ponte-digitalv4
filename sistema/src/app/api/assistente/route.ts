import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { requireRecurso } from '@/lib/planos'
import { handleApiError } from '@/lib/api-error'
import { assertRateLimit } from '@/lib/rate-limit'
import { getEmpresaDoUsuario } from '@/lib/auth'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { assistenteRequisicaoSchema } from '@/lib/validations'
import { getAIProvider } from '@/lib/ai-provider'
import { registrarResposta } from '@/engine/question-answer-engine'

// ─── CONTEXTO DO BANCO ────────────────────────────────────────────────────────
// Busca um snapshot compacto dos dados reais para fundamentar as respostas da IA.
// A IA nunca inventa — responde com base nesses dados.

interface ContextoEstruturado {
  empresaNome: string
  totalClientes: number
  clientesAtivos: number
  clientesInadimplentes: number
  statsClientes: { status: string; total: number }[]
  totalLeadsAtivos: number
  statsLeads: { estagio: string; total: number }[]
  tarefasAtrasadas: { titulo: string; prioridade: string; cliente?: string }[]
  tarefasHoje: { titulo: string; prioridade: string; cliente?: string }[]
  implantacoesComProgresso: { nome?: string; titulo: string; progresso: number; previsao?: Date | null }[]
  receitaMes: number
  despesaMes: number
  ultimosHistoricos: { tipo: string; titulo: string; cliente?: string }[]
}

async function buscarContexto(empresaId: string): Promise<ContextoEstruturado> {
  const agora = new Date()
  const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1)

  const [
    empresa,
    statsClientes,
    statsLeads,
    tarefasAtrasadas,
    tarefasHoje,
    implantacoesEmAndamento,
    receitaMes,
    despesaMes,
    clientesInadimplentes,
    ultimosHistoricos,
  ] = await Promise.all([
    prisma.empresa.findUnique({ where: { id: empresaId }, select: { nome: true, plano: true } }),

    prisma.cliente.groupBy({
      by: ['status'],
      where: { empresaId, deletedAt: null },
      _count: { id: true },
    }),

    prisma.lead.groupBy({
      by: ['estagio'],
      where: { empresaId, deletedAt: null },
      _count: { id: true },
    }),

    prisma.tarefa.findMany({
      where: {
        empresaId,
        deletedAt: null,
        status: { in: ['PENDENTE', 'EM_ANDAMENTO'] },
        dataVencimento: { lt: agora },
      },
      select: { titulo: true, prioridade: true, dataVencimento: true, cliente: { select: { nome: true } } },
      orderBy: { dataVencimento: 'asc' },
      take: 10,
    }),

    prisma.tarefa.findMany({
      where: {
        empresaId,
        deletedAt: null,
        status: { in: ['PENDENTE', 'EM_ANDAMENTO'] },
        dataVencimento: {
          gte: new Date(agora.setHours(0, 0, 0, 0)),
          lte: new Date(agora.setHours(23, 59, 59, 999)),
        },
      },
      select: { titulo: true, prioridade: true, cliente: { select: { nome: true } } },
      take: 10,
    }),

    prisma.implantacao.findMany({
      where: { empresaId, deletedAt: null, status: 'EM_ANDAMENTO' },
      select: {
        titulo: true,
        dataPrevisao: true,
        cliente: { select: { nome: true } },
        etapas: { select: { concluida: true } },
      },
      take: 5,
    }),

    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'RECEITA', status: 'PAGO', dataPagamento: { gte: inicioMes } },
      _sum: { valor: true },
    }),

    prisma.transacao.aggregate({
      where: { empresaId, deletedAt: null, tipo: 'DESPESA', status: 'PAGO', dataPagamento: { gte: inicioMes } },
      _sum: { valor: true },
    }),

    prisma.cliente.count({
      where: { empresaId, deletedAt: null, status: 'INADIMPLENTE' },
    }),

    prisma.historico.findMany({
      where: { empresaId, tipo: { not: 'SISTEMA' } },
      select: { tipo: true, titulo: true, criadoEm: true, cliente: { select: { nome: true } } },
      orderBy: { criadoEm: 'desc' },
      take: 5,
    }),
  ])

  const totalClientes = statsClientes.reduce((a, c) => a + c._count.id, 0)
  const clientesAtivos = statsClientes.find((s) => s.status === 'ATIVO')?._count.id ?? 0
  const totalLeadsAtivos = statsLeads
    .filter((s) => !['FECHADO_GANHO', 'FECHADO_PERDIDO'].includes(s.estagio))
    .reduce((a, l) => a + l._count.id, 0)

  const implantacoesComProgresso = implantacoesEmAndamento.map((i) => {
    const total = i.etapas.length
    const concluidas = i.etapas.filter((e) => e.concluida).length
    const progresso = total > 0 ? Math.round((concluidas / total) * 100) : 0
    return { nome: i.cliente?.nome, titulo: i.titulo, progresso, previsao: i.dataPrevisao }
  })

  return {
    empresaNome: empresa?.nome ?? 'Empresa',
    totalClientes,
    clientesAtivos,
    clientesInadimplentes,
    statsClientes: statsClientes.map((s) => ({ status: s.status, total: s._count.id })),
    totalLeadsAtivos,
    statsLeads: statsLeads.map((s) => ({ estagio: s.estagio, total: s._count.id })),
    tarefasAtrasadas: tarefasAtrasadas.map((t) => ({ titulo: t.titulo, prioridade: t.prioridade, cliente: t.cliente?.nome })),
    tarefasHoje: tarefasHoje.map((t) => ({ titulo: t.titulo, prioridade: t.prioridade, cliente: t.cliente?.nome })),
    implantacoesComProgresso,
    receitaMes: Number(receitaMes._sum.valor ?? 0),
    despesaMes: Number(despesaMes._sum.valor ?? 0),
    ultimosHistoricos: ultimosHistoricos.map((h) => ({ tipo: h.tipo, titulo: h.titulo, cliente: h.cliente?.nome })),
  }
}

function formatarContextoParaPrompt(c: ContextoEstruturado): string {
  return `
CONTEXTO ATUAL DO SISTEMA — ${c.empresaNome} (${new Date().toLocaleDateString('pt-BR')})

CLIENTES:
- Total: ${c.totalClientes} | Ativos: ${c.clientesAtivos} | Inadimplentes: ${c.clientesInadimplentes}
- Status breakdown: ${c.statsClientes.map((s) => `${s.status}: ${s.total}`).join(', ')}

LEADS NO PIPELINE:
- Total ativo: ${c.totalLeadsAtivos}
- Por estágio: ${c.statsLeads.map((s) => `${s.estagio}: ${s.total}`).join(', ')}

TAREFAS:
- Atrasadas (${c.tarefasAtrasadas.length}): ${c.tarefasAtrasadas.map((t) => `"${t.titulo}"${t.cliente ? ` (${t.cliente})` : ''} — ${t.prioridade}`).join(' | ')}
- Para hoje (${c.tarefasHoje.length}): ${c.tarefasHoje.map((t) => `"${t.titulo}"${t.cliente ? ` (${t.cliente})` : ''}`).join(' | ')}

IMPLANTAÇÕES EM ANDAMENTO (${c.implantacoesComProgresso.length}):
${c.implantacoesComProgresso.map((i) => `- ${i.nome}: ${i.titulo} — ${i.progresso}% concluído${i.previsao ? `, previsão ${new Date(i.previsao).toLocaleDateString('pt-BR')}` : ''}`).join('\n')}

FINANCEIRO (mês atual):
- Receita recebida: R$ ${c.receitaMes.toFixed(2)}
- Despesas pagas: R$ ${c.despesaMes.toFixed(2)}
- Resultado: R$ ${(c.receitaMes - c.despesaMes).toFixed(2)}

ÚLTIMAS ATIVIDADES:
${c.ultimosHistoricos.map((h) => `- ${h.tipo}: "${h.titulo}"${h.cliente ? ` (${h.cliente})` : ''}`).join('\n')}
`.trim()
}

// ─── RESPOSTAS POR FÓRMULA (sem IA) ──────────────────────────────────────────
//
// Diretriz do projeto: usar fórmulas e lógica determinística sempre que a
// IA não for genuinamente necessária. As perguntas abaixo já têm a resposta
// pronta dentro do contexto que acabamos de buscar via SQL — não há motivo
// para pagar uma chamada à Anthropic para reformatar um número que a
// aplicação já calculou.
//
// Cada entrada tem um conjunto de palavras-chave (todas precisam aparecer
// na pergunta, case-insensitive) e uma função que monta a resposta direto
// do contexto estruturado. Se nenhuma regra bater, a pergunta segue para
// o modelo normalmente — isso é deliberadamente conservador: o classificador
// só intercepta quando tem certeza razoável, nunca tenta "adivinhar" para
// economizar custo às custas de qualidade de resposta.

interface RegraFormula {
  palavrasChave: string[][]
  resposta: (c: ContextoEstruturado) => string
}

const REGRAS_FORMULA: RegraFormula[] = [
  {
    palavrasChave: [['quantos', 'clientes'], ['número', 'clientes'], ['total', 'clientes']],
    resposta: (c) =>
      `Hoje são ${c.totalClientes} cliente${c.totalClientes !== 1 ? 's' : ''} no cadastro, sendo ${c.clientesAtivos} ativo${c.clientesAtivos !== 1 ? 's' : ''}${c.clientesInadimplentes > 0 ? ` e ${c.clientesInadimplentes} devendo${c.clientesInadimplentes !== 1 ? '' : ''}` : ''}. Quer que a gente comece olhando os que estão devendo?`,
  },
  {
    palavrasChave: [['faturamento', 'mês'], ['receita', 'mês'], ['quanto', 'faturei']],
    resposta: (c) =>
      `Este mês entraram R$ ${c.receitaMes.toFixed(2)} e saíram R$ ${c.despesaMes.toFixed(2)} — sobraram R$ ${(c.receitaMes - c.despesaMes).toFixed(2)}. Está dentro do que você esperava?`,
  },
  {
    palavrasChave: [['quantas', 'tarefas', 'atrasadas'], ['tarefas', 'atraso']],
    resposta: (c) =>
      c.tarefasAtrasadas.length === 0
        ? 'Não tem tarefa atrasada agora. Bom momento pra planejar a próxima.'
        : `Tem ${c.tarefasAtrasadas.length} tarefa${c.tarefasAtrasadas.length !== 1 ? 's' : ''} atrasada${c.tarefasAtrasadas.length !== 1 ? 's' : ''}:\n${c.tarefasAtrasadas.map((t) => `- ${t.titulo}${t.cliente ? ` (${t.cliente})` : ''}`).join('\n')}\nVale olhar a que mais pesa no caixa primeiro.`,
  },
  {
    palavrasChave: [['quantos', 'leads'], ['leads', 'pipeline']],
    resposta: (c) =>
      `Tem ${c.totalLeadsAtivos} conversa${c.totalLeadsAtivos !== 1 ? 's' : ''} de venda em aberto: ${c.statsLeads.map((s) => `${s.estagio} (${s.total})`).join(', ')}.`,
  },
]

function tentarResponderPorFormula(pergunta: string, contexto: ContextoEstruturado): string | null {
  const perguntaNormalizada = pergunta
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  for (const regra of REGRAS_FORMULA) {
    const bateu = regra.palavrasChave.some((grupo) =>
      grupo.every((palavra) => perguntaNormalizada.includes(palavra))
    )
    if (bateu) return regra.resposta(contexto)
  }

  return null
}

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────

function systemPrompt(contexto: string): string {
  return `Você é a Ponte, um empresário experiente que acompanha donos de pequenos negócios por dentro. Você não é um sistema, nem um consultor, nem um professor — é um sócio atento e direto.

REGRAS FUNDAMENTAIS:
1. Responda SEMPRE em português do Brasil, em tom de conversa entre empresários
2. NUNCA invente dados, clientes, valores ou situações que não estejam no contexto abaixo
3. Se não tiver a informação, diga com naturalidade: "isso ainda não passou pela nossa conversa"
4. Use os dados para conversar, não para relatar. Prefira "você tem 12 clientes e 2 devendo — quer que a gente comece por eles?" a uma lista de números
5. Sempre que notar algo que merece atenção (atraso, valor em aberto, oportunidade), chame como um parceiro faria, em voz de empresa, não de relatório
6. Respostas curtas e diretas. Uma ideia por vez, com cara de conversa

O QUE SABEMOS SOBRE A EMPRESA (atualizado agora):
${contexto}

Com base nisso, converse com o dono da empresa.`
}

// ─── HANDLER ──────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()

    // ── Gate de plano: Assistente IA é recurso pago (Profissional+) ──
    const empresa = await getEmpresaDoUsuario(usuario.id)
    if (!empresa) {
      return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 })
    }
    requireRecurso(empresa.plano, 'assistente_ia')

    // ── Rate limit: protege contra loop/abuso, independente do plano ──
    assertRateLimit(`assistente:${usuario.id}`, 'ASSISTENTE')

    const body = await request.json()
    const validacao = assistenteRequisicaoSchema.safeParse(body)

    if (!validacao.success) {
      return NextResponse.json({ error: 'Mensagens inválidas', detalhes: validacao.error.flatten() }, { status: 422 })
    }

    const { mensagens } = validacao.data

    const contexto = await buscarContexto(usuario.empresaId)

    // ── Curto-circuito por fórmula: pergunta factual simples não precisa de IA ──
    const ultimaMensagem = mensagens[mensagens.length - 1]
    if (ultimaMensagem?.role === 'user' && typeof ultimaMensagem.content === 'string') {
      const perguntaUsuario = ultimaMensagem.content

      const respostaFormula = tentarResponderPorFormula(perguntaUsuario, contexto)
      if (respostaFormula) {
        void registrarResposta({
          empresaId: usuario.empresaId,
          perguntaId: `assistente:${Date.now()}`,
          pergunta: perguntaUsuario.slice(0, 300),
          valor: respostaFormula.slice(0, 500),
          origem: 'ASSISTENTE_IA',
        })

        const encoder = new TextEncoder()
        const readable = new ReadableStream({
          start(controller) {
            controller.enqueue(encoder.encode(`0:${JSON.stringify(respostaFormula)}\n`))
            controller.enqueue(encoder.encode('d:{"finishReason":"stop"}\n'))
            controller.close()
          },
        })
        return new Response(readable, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Vercel-AI-Data-Stream': 'v1' },
        })
      }
    }

    // ── Pergunta exige interpretação: vai para o modelo ──
    const provider = getAIProvider()
    const aiStream = await provider.streamChat(mensagens, {
      system: systemPrompt(formatarContextoParaPrompt(contexto)),
      maxTokens: 1024,
    })

    void registrarResposta({
      empresaId: usuario.empresaId,
      perguntaId: `assistente-ai:${Date.now()}`,
      pergunta: (ultimaMensagem?.content as string)?.slice(0, 300) ?? '',
      valor: '[resposta gerada por IA]',
      origem: 'ASSISTENTE_IA',
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of aiStream) {
            if (chunk.type === 'text' && chunk.text) {
              controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk.text)}\n`))
            }
          }
          controller.enqueue(encoder.encode('d:{"finishReason":"stop"}\n'))
          controller.close()
        } catch (e) {
          controller.error(e)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type':  'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1',
      },
    })
  } catch (err) {
    return handleApiError(err)
  }
}
