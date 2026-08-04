// ─────────────────────────────────────────────────────────────────────────────
// CONSELHEIRO ENGINE — P66 O Conselheiro Empresarial
//
// Mudança de comportamento, não de funcionalidades. A Ponte deixa de apenas
// responder e passa a "pensar junto": quando o empresário traz uma decisão
// importante, ela NÃO responde imediatamente — primeiro percebe, conecta com a
// memória real, identifica o que ainda não sabe, escolhe 1–2 perguntas que
// importam e só então (se houver evidência) oferece uma reflexão.
//
// Princípio (Constituição): a IA é interface, não cérebro. Este motor é o
// raciocínio determinístico construído sobre dados e memória reais; a IA apenas
// fala com as palavras dele. Nenhuma recomendação nasce sem evidência.
// ─────────────────────────────────────────────────────────────────────────────

import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { listarRespostasPorEmpresa } from './question-answer-engine'
import { listarHipoteses } from './cognitive-memory-engine'
import { registrarEvidencia } from './evidence-engine'
import {
  BIBLIOTECA_SOCRATICA,
  LABEL_CATEGORIA,
  type CategoriaDecisao,
} from './perguntas-socraticas'

// ─── DETECÇÃO DE DECISÃO IMPORTANTE ─────────────────────────────────────────

interface RegraDecisao {
  categoria: CategoriaDecisao
  palavras: string[]
}

const REGRAS_DECISAO: RegraDecisao[] = [
  {
    categoria: 'CONTRATACAO',
    palavras: [
      'contratar', 'contratação', 'contrata', 'funcionario', 'funcionários',
      'empregado', 'admitir', 'pessoa para', 'pessoa pra', 'montar equipe',
      'ajudante', 'equipe',
    ],
  },
  {
    categoria: 'DEMISSAO',
    palavras: [
      'demitir', 'demissão', 'demissao', 'mandar embora', 'dispensar',
      'desligar', 'desligar o funcionario',
    ],
  },
  {
    categoria: 'PRECOS',
    palavras: [
      'aumentar preço', 'aumentar precos', 'aumentar o preço', 'subir preço',
      'subir precos', 'aumento de preço', 'reajuste', 'reajustar', 'mudar preço',
      'mudar precos', 'tabela de preço', 'cobrar mais', 'preço', 'precos',
      'barato demais', 'muito barato',
    ],
  },
  {
    categoria: 'EQUIPAMENTO',
    palavras: [
      'comprar maquina', 'comprar máquina', 'equipamento novo', 'equipamento',
      'maquina nova', 'máquina nova', 'investir em equipamento', 'comprar equipamento',
      'comprar um equipamento',
    ],
  },
  {
    categoria: 'EMPRESTIMO',
    palavras: [
      'emprestimo', 'empréstimo', 'financiamento', 'financiar', 'credito',
      'crédito', 'linha de credito', 'linha de crédito', 'pegar dinheiro',
      'dinheiro do banco', 'banco',
    ],
  },
  {
    categoria: 'EXPANSAO',
    palavras: [
      'expandir', 'expansão', 'expansao', 'abrir filial', 'nova unidade',
      'abrir outra loja', 'segunda loja', 'novo ponto', 'ampliar', 'crescer',
      'abrir mais uma',
    ],
  },
]

function normalizarTexto(valor: string): string {
  return valor.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function detectarCategoriaDecisao(mensagem: string): CategoriaDecisao | null {
  const texto = normalizarTexto(mensagem)
  for (const regra of REGRAS_DECISAO) {
    if (regra.palavras.some((p) => texto.includes(normalizarTexto(p)))) {
      return regra.categoria
    }
  }
  return null
}

// ─── SINAIS DE CONTEXTO ─────────────────────────────────────────────────────
// Determina qual pergunta socrática priorizar, com base em critérios reais.

interface SinaisContexto {
  caixaApertado: boolean
  sobrecarga: boolean
  receioPerderClientes: boolean
  decisaoAdiada: boolean
  decisaoImpulso: boolean
}

function detectarSinais(
  mensagem: string,
  contexto: ContextoConselheiro,
  memoria: MemoriaConselheiro
): SinaisContexto {
  const texto = normalizarTexto(mensagem)
  const memoriaTexto = normalizarTexto(memoria.respostas.map((r) => r.valor).join(' '))

  return {
    caixaApertado:
      (contexto.despesaMes ?? 0) > (contexto.receitaMes ?? 0) ||
      (contexto.clientesInadimplentes ?? 0) > 0 ||
      memoriaTexto.includes('sem dinheiro') ||
      memoriaTexto.includes('apertado') ||
      memoriaTexto.includes('nao tenho') ||
      memoriaTexto.includes('divida'),
    sobrecarga:
      memoriaTexto.includes('cansado') ||
      memoriaTexto.includes('sozinho') ||
      memoriaTexto.includes('tudo eu') ||
      memoriaTexto.includes('trabalho muito'),
    receioPerderClientes:
      texto.includes('medo') ||
      texto.includes('perder cliente') ||
      texto.includes('perder o cliente') ||
      texto.includes('nao quero perder'),
    decisaoAdiada:
      texto.includes('nao sei') ||
      texto.includes('tenho medo') ||
      texto.includes('nao tenho certeza') ||
      texto.includes('nao tenho certeza se'),
    decisaoImpulso:
      texto.includes('oportunidade') ||
      texto.includes('achei') ||
      texto.includes('barato') ||
      texto.includes('promocao'),
  }
}

// ─── SELEÇÃO DE PERGUNTAS SÓCRÁTICAS ────────────────────────────────────────
// 1–2 perguntas, priorizando as que casam com o sinal detectado; nunca mais.

function selecionarPerguntas(
  categoria: CategoriaDecisao,
  sinais: SinaisContexto
): string[] {
  const disponiveis = BIBLIOTECA_SOCRATICA.filter((p) => p.categoria === categoria)

  const pontuadas = disponiveis.map((p) => {
    let pontos = 0
    if (p.quando === 'sempre') pontos += 1
    if (p.quando.includes('sobrecarga') && sinais.sobrecarga) pontos += 3
    if (p.quando.includes('caixa') && sinais.caixaApertado) pontos += 3
    if (p.quando.includes('receio') && sinais.receioPerderClientes) pontos += 3
    if (p.quando.includes('hesitante') && sinais.decisaoAdiada) pontos += 3
    if (p.quando.includes('impulso') && sinais.decisaoImpulso) pontos += 3
    if (p.quando.includes('dependente do dono') && sinais.sobrecarga) pontos += 2
    return { pergunta: p.pergunta, pontos }
  })

  pontuadas.sort((a, b) => b.pontos - a.pontos)
  return pontuadas.slice(0, 2).map((p) => p.pergunta)
}

// ─── TENSÕES / CONTRADIÇÕES ─────────────────────────────────────────────────
// O que ele diz hoje frente ao que já contou. Intervenção nasce da história,
// nunca de frases prontas.

function encontrarTensoes(
  categoria: CategoriaDecisao,
  memoria: MemoriaConselheiro
): string[] {
  const tensoes: string[] = []
  const texto = normalizarTexto(memoria.respostas.map((r) => r.valor).join(' '))

  const dependenciaDoDono =
    texto.includes('tudo eu') ||
    texto.includes('sozinho') ||
    texto.includes('eu que') ||
    texto.includes('sem mim')

  const caixaFragil =
    texto.includes('sem dinheiro') ||
    texto.includes('apertado') ||
    texto.includes('divida') ||
    texto.includes('nao tenho') ||
    texto.includes('falta') ||
    texto.includes('sobra pouco')

  const insatisfeitoComVolume =
    texto.includes('trabalho muito') ||
    texto.includes('nao avanca') ||
    texto.includes('mesmo esforço') ||
    texto.includes('trabalho demais')

  if (categoria === 'CONTRATACAO' && caixaFragil) {
    tensoes.push(
      'Ele está avaliando contratar, mas já contou que o caixa anda apertado. A pergunta certa vem antes da contratação.'
    )
  }
  if (categoria === 'EXPANSAO' && dependenciaDoDono) {
    tensoes.push(
      'Ele fala em expandir, mas a própria memória diz que as decisões ainda passam todas por ele. Expansão sem base quebra a operação atual.'
    )
  }
  if (categoria === 'EQUIPAMENTO' && caixaFragil) {
    tensoes.push(
      'Ele quer investir em equipamento, mas já mencionou dificuldade de caixa. O retorno precisa estar claro antes.'
    )
  }
  if (categoria === 'EMPRESTIMO' && caixaFragil) {
    tensoes.push(
      'Ele pensa em empréstimo para resolver o caixa — mas o caixa apertado é o sintoma, não a doença.'
    )
  }
  if (categoria === 'DEMISSAO' && insatisfeitoComVolume) {
    tensoes.push(
      'Ele quer dispensar alguém, mas já falou que sente que trabalha muito e avança pouco. Vale entender o que é padrão de gestão e o que é momento.'
    )
  }
  if (categoria === 'PRECOS' && caixaFragil) {
    tensoes.push(
      'Ele quer mexer nos preços com o caixa apertado — o reajuste precisa cobrir custo real, não só melhorar o mês.'
    )
  }

  return tensoes
}

// ─── MEMÓRIA DO CONSELHEIRO ─────────────────────────────────────────────────

interface MemoriaConselheiro {
  respostas: { pergunta: string; valor: string; criadaEm: Date }[]
  perguntaViva: string | null
  memoriasEmocionais: string[]
  hipoteses: string[]
}

async function carregarMemoria(empresaId: string): Promise<MemoriaConselheiro> {
  const [respostas, perguntaViva, memoriasEmocionais, hipoteses] = await Promise.all([
    listarRespostasPorEmpresa(empresaId, { limite: 12 }),
    prisma.perguntaViva.findFirst({
      where: { empresaId, estado: 'ATIVA', deletedAt: null },
      orderBy: { criadaEm: 'desc' },
    }),
    prisma.memoriaEmocional.findMany({
      where: { empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      take: 3,
    }),
    listarHipoteses(empresaId, true),
  ])

  return {
    respostas: respostas.map((r) => ({
      pergunta: r.pergunta,
      valor: r.valor,
      criadaEm: r.criadaEm,
    })),
    perguntaViva: perguntaViva?.pergunta ?? null,
    memoriasEmocionais: memoriasEmocionais.map((m) => m.sentimento),
    hipoteses: hipoteses.map((h) => h.descricao),
  }
}

// ─── CONTEXTO MÍNIMO NECESSÁRIO ─────────────────────────────────────────────
// A rota /api/assistente já monta o contexto estruturado; aqui aceitamos um
// subconjunto para fundamentar a percepção com números reais.

export interface ContextoConselheiro {
  empresaNome?: string
  totalClientes?: number
  clientesAtivos?: number
  clientesInadimplentes?: number
  receitaMes?: number
  despesaMes?: number
  tarefasAtrasadas?: { titulo: string }[]
}

// ─── RACIOCÍNIO DO CONSELHEIRO ──────────────────────────────────────────────

export interface RaciocinioConselheiro {
  categoria: CategoriaDecisao
  percepcao: string
  porQueChamouAtencao: string
  naoSabemos: string[]
  perguntas: string[]
  reflexao: string | null
  sabemos: string[]
  acreditamos: string[]
  investigando: string[]
  tensoes: string[]
  memoriaCitada: string[]
}

export async function montarRaciocinioConselheiro(
  empresaId: string,
  mensagem: string,
  contexto: ContextoConselheiro
): Promise<RaciocinioConselheiro | null> {
  const categoria = detectarCategoriaDecisao(mensagem)
  if (!categoria) return null

  const memoria = await carregarMemoria(empresaId).catch(() => ({
    respostas: [] as MemoriaConselheiro['respostas'],
    perguntaViva: null,
    memoriasEmocionais: [],
    hipoteses: [],
  }))

  const sinais = detectarSinais(mensagem, contexto, memoria)
  const tensoes = encontrarTensoes(categoria, memoria)
  const perguntas = selecionarPerguntas(categoria, sinais)

  const temMemoria = memoria.respostas.length > 0

  // Percepção: o que estou percebendo (ancorado no que ele disse e no que a
  // empresa mostra hoje). NUNCA resposta imediata — percepção primeiro.
  const percepcao = [
    `Você está pensando em ${LABEL_CATEGORIA[categoria]}.`,
    contexto.receitaMes !== undefined
      ? `Hoje a empresa tem ${contexto.totalClientes ?? 0} clientes e ${contexto.receitaMes.toFixed(0)} reais de receita no mês.`
      : '',
    temMemoria
      ? 'E eu lembro do que você me contou antes.'
      : 'E ainda estamos nos conhecendo.',
  ]
    .filter(Boolean)
    .join(' ')

  // Por que chamou minha atenção: decisões desse tipo mudam o caixa todo mês
  // e dependem da história da empresa, não de uma resposta rápida.
  const porQueChamouAtencao =
    'Porque essa é uma decisão que pesa no caixa e na rotina por muito tempo — e, pela forma como você trouxe, ela ainda não está decidida, está sendo pensada.'

  // O que ainda não sabemos: pontos abertos reais.
  const naoSabemos: string[] = []
  if (categoria === 'CONTRATACAO') {
    naoSabemos.push('o custo real dessa contratação frente ao caixa atual')
    naoSabemos.push('o que você deixa de fazer quando a pessoa assumir')
  }
  if (categoria === 'DEMISSAO') {
    naoSabemos.push('o que exatamente mudou para essa pessoa se tornar dispensável')
    naoSabemos.push('quem absorve o trabalho dela depois')
  }
  if (categoria === 'PRECOS') {
    naoSabemos.push('quanto do preço atual é custo e quanto é margem')
    naoSabemos.push('o que acontece com o volume se o preço subir')
  }
  if (categoria === 'EQUIPAMENTO') {
    naoSabemos.push('em quanto tempo o equipamento se paga')
    naoSabemos.push('o que fica para trás enquanto o investimento entra')
  }
  if (categoria === 'EMPRESTIMO') {
    naoSabemos.push('para que exatamente o dinheiro vai servir')
    naoSabemos.push('o custo total do empréstimo e como ele se paga')
  }
  if (categoria === 'EXPANSAO') {
    naoSabemos.push('o que a empresa já tem hoje que sustenta a expansão')
    naoSabemos.push('quem vai operar a nova frente')
  }

  // Reflexão: só quando existe evidência real (uma tensão identificada na
  // própria história da empresa). Sem evidência, a Ponte NÃO recomenda.
  const reflexao = tensoes[0] ?? null

  // Níveis de confiança — tudo que a Ponte afirma vem com nível.
  const sabemos: string[] = []
  const acreditamos: string[] = []
  const investigando: string[] = []

  if (contexto.receitaMes !== undefined) {
    sabemos.push(
      `a receita deste mês é ${contexto.receitaMes.toFixed(0)} e as despesas ${contexto.despesaMes?.toFixed(0) ?? 'ainda não mapeadas'}`
    )
  }
  if (contexto.clientesInadimplentes && contexto.clientesInadimplentes > 0) {
    sabemos.push(`há ${contexto.clientesInadimplentes} cliente(s) devendo`)
  }
  if (contexto.tarefasAtrasadas && contexto.tarefasAtrasadas.length > 0) {
    sabemos.push(`existem ${contexto.tarefasAtrasadas.length} tarefa(s) atrasada(s)`)
  }
  if (temMemoria) {
    sabemos.push(`ele já me contou sobre a empresa em conversas anteriores`)
  }
  if (memoria.perguntaViva) {
    acreditamos.push(`a pergunta que o acompanha é: "${memoria.perguntaViva}"`)
  }
  memoria.memoriasEmocionais.forEach((m) => acreditamos.push(m))
  memoria.hipoteses.slice(0, 2).forEach((h) => acreditamos.push(`tenho uma hipótese: ${h}`))
  naoSabemos.forEach((n) => investigando.push(`ainda estou investigando ${n}`))

  const memoriaCitada = [
    ...memoria.respostas.slice(0, 3).map((r) => r.valor.slice(0, 140)),
    ...(memoria.perguntaViva ? [`Pergunta que o acompanha: ${memoria.perguntaViva}`] : []),
  ]

  // Registra a intervenção como evidência (memória participa da conversa).
  void registrarEvidencia(empresaId, {
    categoria: 'ESTRATEGIA',
    origem: 'ASSISTENTE',
    descricao: `Intervenção do conselheiro: empresário trouxe decisão de ${LABEL_CATEGORIA[categoria]}. ${reflexao ?? 'Decisão em avaliação — perguntas socráticas aplicadas.'}`,
    confianca: reflexao ? 'ALTA' : 'MEDIA',
    dados: { categoria, tensoes: tensoes.length },
  }).catch(() => null)

  return {
    categoria,
    percepcao,
    porQueChamouAtencao,
    naoSabemos,
    perguntas,
    reflexao,
    sabemos,
    acreditamos,
    investigando,
    tensoes,
    memoriaCitada,
  }
}

// ─── FORMATAÇÃO PARA O PROMPT ───────────────────────────────────────────────
// O raciocínio entra no system prompt como material; a IA conversa com as
// palavras dele seguindo a ordem obrigatória — nunca inverte.

export function formatarRaciocinioParaPrompt(r: RaciocinioConselheiro): string {
  const linhas: string[] = [
    'RACIOCÍNIO QUE JÁ CONSTRUÍ (material para a sua resposta — não repita mecanicamente):',
    '',
    `- O que estou percebendo: ${r.percepcao}`,
    `- Por que chamou minha atenção: ${r.porQueChamouAtencao}`,
  ]

  if (r.sabemos.length > 0) {
    linhas.push('', 'SABEMOS (evidência real):')
    r.sabemos.forEach((s) => linhas.push(`  - ${s}`))
  }
  if (r.acreditamos.length > 0) {
    linhas.push('', 'ACREDITAMOS (leitura, não certeza):')
    r.acreditamos.forEach((a) => linhas.push(`  - ${a}`))
  }
  if (r.investigando.length > 0) {
    linhas.push('', 'INVESTIGANDO (ainda não sabemos):')
    r.investigando.forEach((i) => linhas.push(`  - ${i}`))
  }
  if (r.tensoes.length > 0) {
    linhas.push('', 'TENSÕES QUE PERCEBO NA HISTÓRIA DA EMPRESA:')
    r.tensoes.forEach((t) => linhas.push(`  - ${t}`))
  }
  if (r.perguntas.length > 0) {
    linhas.push('', 'PERGUNTAS QUE IMPORTAM AGORA (escolha 1–2 e faça com as suas palavras):')
    r.perguntas.forEach((p) => linhas.push(`  - ${p}`))
  }
  if (r.reflexao) {
    linhas.push('', `REFLEXÃO (só se ele responder às perguntas primeiro): ${r.reflexao}`)
  }

  return linhas.join('\n')
}
