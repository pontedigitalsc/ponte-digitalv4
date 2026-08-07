// ─────────────────────────────────────────────────────────────────────────────
// RELAÇÃO ENGINE — P49 O Nascimento da Relação Contínua
//
// A Ponte deixa de ser um sistema. Passa a ser um lugar onde empresários
// organizam seus pensamentos ao longo dos anos.
//
// Este motor implementa, sem IA pesada (regras determinísticas sobre as
// respostas reais da conversa):
//   1. Pergunta Viva      — UMA pergunta por empresa, nascida da conversa.
//   2. Reflexão Semanal   — UMA reflexão por semana; planta observação, não cobra.
//   3. Memória Emocional  — guarda contexto emocional, não apenas fatos.
//   4. Linha da História  — capítulos narrativos construídos com dados reais.
//
// Princípio: a IA não é o cérebro da Ponte. O patrimônio está em dados,
// contexto, decisões, aprendizado acumulado. Este motor apenas transforma
// respostas reais em percepção contínua.
// ─────────────────────────────────────────────────────────────────────────────

import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { listarRespostasPorEmpresa } from './question-answer-engine'

// ─── 1. PERGUNTA VIVA ──────────────────────────────────────────────────────

export interface PerguntaViva {
  id: string
  pergunta: string
  contexto: string | null
  estado: string
  resposta: string | null
  respondidaEm: Date | null
  criadaEm: Date
}

interface RegraPerguntaViva {
  id: string
  palavras: string[]
  pergunta: string
  contexto: (valor: string) => string
}

const REGRAS_PERGUNTA_VIVA: RegraPerguntaViva[] = [
  {
    id: 'decisao.depende-de-voce',
    palavras: ['depende', 'sozinho', 'sozinha', 'eu que', 'sem mim', 'centralizo', 'tudo eu'],
    pergunta: 'Por que todas as decisões continuam dependendo de você?',
    contexto: (v) => `Você mencionou que "${v}". Isso sugere que as decisões ainda passam todas por você.`,
  },
  {
    id: 'trabalho.muito-avanca-pouco',
    palavras: ['muito trabalho', 'trabalho muito', 'não avança', 'não evolui', 'mesmo esforço', 'trabalho demais'],
    pergunta: 'Por que você sente que trabalha muito e avança pouco?',
    contexto: (v) => `Você descreveu que "${v}". Esforço intenso sem avanço proporcional é um sinal de que algo pode estar no lugar errado.`,
  },
  {
    id: 'clientes.nao-voltam',
    palavras: ['cliente não volta', 'clientes não voltam', 'não retorna', 'não voltam', 'perco cliente'],
    pergunta: 'Por que seus melhores clientes não voltam?',
    contexto: (v) => `Você mencionou "${v}". Entender por que os melhores clientes não retornam pode revelar um padrão importante.`,
  },
  {
    id: 'equipe.contratar',
    palavras: ['contratar', 'funcionário', 'funcionarios', 'equipe', 'delegar', 'delegar', 'mais gente', 'pessoa para'],
    pergunta: 'O que impede você de ter a equipe que sua empresa precisa?',
    contexto: (v) => `Você trouxe "${v}". A questão de equipe aparece com força nas suas respostas.`,
  },
  {
    id: 'financeiro.calculo',
    palavras: ['dinheiro', 'caixa', 'faturamento', 'financeiro', 'custo', 'lucro', 'falta'],
    pergunta: 'Por que as decisões financeiras ainda parecem acontecer por intuição?',
    contexto: (v) => `Você mencionou "${v}". A preocupação financeira parece ser a consequência de algo mais profundo.`,
  },
  {
    id: 'foco.organizacao',
    palavras: ['organizar', 'organizada', 'ideias', 'foco', 'prioridade', 'desorganizado', 'planejamento'],
    pergunta: 'Por que tantas ideias boas ainda não se transformam em organização?',
    contexto: (v) => `Você descreveu "${v}". Muitas ideias sem organização geram dispersão.`,
  },
  {
    id: 'tempo.energia',
    palavras: ['tempo', 'energia', 'cansado', 'cansada', 'esgotado', 'sem tempo', 'desgaste'],
    pergunta: 'Onde sua energia está indo todos os dias?',
    contexto: (v) => `Você mencionou "${v}". A energia que sustenta a empresa merece atenção.`,
  },
  {
    id: 'decisao.modo',
    palavras: ['medo', 'inseguro', 'insegura', 'não sei', 'dúvida', 'certeza', 'decidir'],
    pergunta: 'O que torna as decisões importantes tão difíceis de tomar?',
    contexto: (v) => `Você trouxe "${v}". Reconhecer a dificuldade de decidir já é um sinal de maturidade.`,
  },
]

function normalizarTexto(valor: string): string {
  return valor.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function encontrarRegraPerguntaViva(respostas: Record<string, string>): RegraPerguntaViva | null {
  for (const regra of REGRAS_PERGUNTA_VIVA) {
    for (const valor of Object.values(respostas)) {
      const texto = normalizarTexto(valor)
      for (const palavra of regra.palavras) {
        if (texto.includes(normalizarTexto(palavra))) return regra
      }
    }
  }
  return null
}

const PERGUNTA_VIVA_GENERICA = 'Por que sua empresa ainda depende tanto do seu dia a dia?'

export async function obterPerguntaVivaAtiva(empresaId: string): Promise<PerguntaViva | null> {
  return prisma.perguntaViva.findFirst({
    where: { empresaId, estado: 'ATIVA', deletedAt: null },
    orderBy: { criadaEm: 'desc' },
  })
}

export async function listarPerguntasVivas(empresaId: string): Promise<PerguntaViva[]> {
  return prisma.perguntaViva.findMany({
    where: { empresaId, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
  })
}

export async function responderPerguntaViva(empresaId: string, id: string, resposta: string): Promise<void> {
  await prisma.perguntaViva.updateMany({
    where: { id, empresaId, estado: 'ATIVA', deletedAt: null },
    data: { estado: 'RESPONDIDA', resposta, respondidaEm: new Date() },
  })
}

// Cria a Pergunta Viva a partir das respostas da conversa, se ainda não houver uma ativa.
// "Ela nasce naturalmente da conversa." — nunca duas, nunca cinco.
// P78 — quando nenhuma regra de palavras fecha, a pergunta nasce da descoberta
// P77 persistida: a Ponte retoma o que percebeu, em vez de criar pergunta vazia.
async function montarPerguntaVivaDeDescoberta(empresaId: string): Promise<{ pergunta: string; contexto: string } | null> {
  const descoberta = await prisma.memoriaCognitiva.findFirst({
    where: { empresaId, tipo: 'descoberta', deletedAt: null },
    orderBy: { criadaEm: 'desc' },
  })
  if (!descoberta) return null
  const significa = (descoberta.metadados as { significa?: string } | null)?.significa
  const nucleo = significa ?? descoberta.descricao
  return {
    pergunta: 'Na nossa última conversa, percebemos algo sobre a sua operação que ainda está em aberto. Você descobriu alguma coisa nova desde então?',
    contexto: `Da última vez, descrevemos assim: ${nucleo}. Queremos observar se disso evoluiu — sem afirmar nada antes de ouvir você.`,
  }
}
export async function criarPerguntaVivaSeNecessario(empresaId: string, respostas: Record<string, string | null>): Promise<PerguntaViva | null> {
  const ativa = await obterPerguntaVivaAtiva(empresaId)
  if (ativa) return ativa

  const respostasString: Record<string, string> = {}
  for (const [k, v] of Object.entries(respostas)) {
    if (v && v.trim()) respostasString[k] = v
  }

  const regra = encontrarRegraPerguntaViva(respostasString)
  const perguntaVivaDaDescoberta = await montarPerguntaVivaDeDescoberta(empresaId)
  const pergunta = regra?.pergunta ?? perguntaVivaDaDescoberta?.pergunta ?? PERGUNTA_VIVA_GENERICA
  const contexto = regra
    ? Object.values(respostasString).map(regra.contexto).find(() => true)
    : (perguntaVivaDaDescoberta?.contexto ??
      'Ainda estamos conhecendo sua empresa. Essa pergunta vai se tornar mais nítida com o tempo.')

  const criada = await prisma.perguntaViva.create({
    data: { empresaId, pergunta, contexto },
  })
  return {
    id: criada.id,
    pergunta: criada.pergunta,
    contexto: criada.contexto,
    estado: criada.estado,
    resposta: criada.resposta,
    respondidaEm: criada.respondidaEm,
    criadaEm: criada.criadaEm,
  }
}

// ─── P52 — CONTINUIDADE DA CONVERSA ────────────────────────────────────────
// A Ponte não recomeça do zero. Quando o empresário volta, ela retoma de onde
// ficou: referenciando o que ele contou na última conversa, com as próprias
// palavras dele. É memória real, não cortesia.

export async function montarContinuidadeConversa(empresaId: string): Promise<string | null> {
  const [ultimasRespostas, memorias, perguntasVivas] = await Promise.all([
    listarRespostasPorEmpresa(empresaId, { limite: 1 }),
    prisma.memoriaEmocional.findMany({
      where: { empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      take: 1,
    }),
    prisma.perguntaViva.findMany({
      where: { empresaId, deletedAt: null, estado: 'RESPONDIDA', resposta: { not: null } },
      orderBy: { criadaEm: 'desc' },
      take: 1,
    }),
  ])

  const partes: string[] = []

  if (ultimasRespostas.length > 0) {
    const valor = ultimasRespostas[0].valor.trim().slice(0, 160)
    if (valor) partes.push(`Na última conversa, você me contou que: "${valor}".`)
  }

  if (perguntasVivas.length > 0 && perguntasVivas[0].resposta) {
    const resposta = perguntasVivas[0].resposta.trim().slice(0, 160)
    if (resposta) partes.push(`Também respondeu à pergunta "${perguntasVivas[0].pergunta}" com: "${resposta}".`)
  }

  const sentimento = memorias.length > 0
    ? `${memorias[0].sentimento} `
    : ''
  partes.push(`${sentimento}Quero saber como está isso agora.`)

  if (partes.length === 0) return null
  return partes.join(' ')
}

// ─── 2. REFLEXÃO DA SEMANA ─────────────────────────────────────────────────
export interface ReflexaoSemanal {
  id: string
  semana: string
  reflexao: string
  contexto: string | null
  criadaEm: Date
}

function chaveSemana(data: Date = new Date()): string {
  const d = new Date(data)
  const dia = d.getDay()
  const diff = d.getDate() - dia + (dia === 0 ? -6 : 1) // segunda como início
  const segunda = new Date(d.setDate(diff))
  const ano = segunda.getFullYear()
  const inicioAno = new Date(ano, 0, 1)
  const dias = Math.floor((segunda.getTime() - inicioAno.getTime()) / (24 * 60 * 60 * 1000))
  const semana = Math.ceil((dias + inicioAno.getDay() + 1) / 7)
  return `${ano}-W${String(semana).padStart(2, '0')}`
}

const REFLEXOES_SEMANAIS: { id: string; reflexao: string }[] = [
  { id: 'observar-decisao', reflexao: 'Durante essa semana, observe apenas um momento: quando você sentiu que precisava decidir tudo sozinho.' },
  { id: 'observar-energia', reflexao: 'Durante essa semana, repare para onde sua energia foi primeiro. O que recebeu sua melhor atenção?' },
  { id: 'observar-cliente', reflexao: 'Durante essa semana, preste atenção em um cliente que voltou — e em um que não voltou. O que os diferencia?' },
  { id: 'observar-peso', reflexao: 'Durante essa semana, note quando a empresa pesou mais do que o necessário. O que poderia ter sido diferente?' },
  { id: 'observar-equipe', reflexao: 'Durante essa semana, observe as tarefas que você faz e que poderiam ser feitas por outra pessoa.' },
  { id: 'observar-calma', reflexao: 'Durante essa semana, identifique o momento em que você se sentiu mais tranquilo trabalhando. O que havia de diferente?' },
  { id: 'observar-decisao-adiada', reflexao: 'Durante essa semana, repare em uma decisão que você adiou. O que faz dela tão difícil de tomar agora?' },
]

function reflexaoDaSemana(chave: string): { reflexao: string } {
  let hash = 0
  for (let i = 0; i < chave.length; i++) {
    hash = (hash << 5) - hash + chave.charCodeAt(i)
    hash |= 0
  }
  return REFLEXOES_SEMANAIS[Math.abs(hash) % REFLEXOES_SEMANAIS.length]
}

export async function obterReflexaoDaSemana(empresaId: string): Promise<ReflexaoSemanal | null> {
  const semana = chaveSemana()
  const existente = await prisma.reflexaoSemanal.findFirst({
    where: { empresaId, semana, deletedAt: null },
  })
  if (existente) {
    return {
      id: existente.id,
      semana: existente.semana,
      reflexao: existente.reflexao,
      contexto: existente.contexto,
      criadaEm: existente.criadaEm,
    }
  }

  const perguntaViva = await obterPerguntaVivaAtiva(empresaId)
  const escolhida = reflexaoDaSemana(semana)
  const reflexao = perguntaViva
    ? `${escolhida.reflexao} E, quando surgir, anote: ${perguntaViva.pergunta}`
    : escolhida.reflexao

  const criada = await prisma.reflexaoSemanal.create({
    data: { empresaId, semana, reflexao, contexto: perguntaViva?.pergunta ?? null },
  })
  return {
    id: criada.id,
    semana: criada.semana,
    reflexao: criada.reflexao,
    contexto: criada.contexto,
    criadaEm: criada.criadaEm,
  }
}

// ─── 3. MEMÓRIA EMOCIONAL ─────────────────────────────────────────────────

export interface MemoriaEmocional {
  id: string
  tipo: string
  sentimento: string
  fato: string | null
  contexto: string | null
  criadaEm: Date
}

interface RegraEmocional {
  tipo: string
  palavras: string[]
  sentimento: (valor: string) => string
}

const REGRAS_EMOCIONAIS: RegraEmocional[] = [
  {
    tipo: 'inseguranca',
    palavras: ['medo', 'inseguro', 'insegura', 'não sei', 'não tenho certeza', 'com medo'],
    sentimento: (v) => `Você parecia inseguro ao falar sobre "${v}".`,
  },
  {
    tipo: 'peso',
    palavras: ['peso', 'cansado', 'cansada', 'sobrecarregado', 'sozinho', 'sozinha', 'exausto'],
    sentimento: (v) => `Essa parte da conversa trouxe peso — você falou de "${v}" como algo que carrega sozinho.`,
  },
  {
    tipo: 'confianca',
    palavras: ['orgulho', 'consegui', 'deu certo', 'funcionou', 'feliz', 'satisfeito', 'satisfeita'],
    sentimento: (v) => `Você falou de "${v}" com orgulho. Esse é um momento de força para lembrar.`,
  },
  {
    tipo: 'ansiedade',
    palavras: ['correria', 'pressão', 'pressao', 'urgente', 'atrasado', 'correndo', 'ansioso'],
    sentimento: (v) => `Dava para sentir a pressa quando você mencionou "${v}".`,
  },
  {
    tipo: 'realizacao',
    palavras: ['evoluindo', 'melhorou', 'cresceu', 'conquista', 'vencemos', 'crescemos', 'orgulho'],
    sentimento: (v) => `Havia realização na sua voz quando você trouxe "${v}".`,
  },
]

function encontrarRegraEmocional(valor: string): RegraEmocional | null {
  const texto = normalizarTexto(valor)
  for (const regra of REGRAS_EMOCIONAIS) {
    for (const palavra of regra.palavras) {
      if (texto.includes(normalizarTexto(palavra))) return regra
    }
  }
  return null
}

// Analisa as respostas e registra memórias emocionais (sem duplicar a mesma sentença).
export async function registrarMemoriasEmocionais(empresaId: string, respostas: Record<string, string | null>): Promise<number> {
  let criadas = 0
  for (const [perguntaId, valor] of Object.entries(respostas)) {
    if (!valor || !valor.trim()) continue
    const regra = encontrarRegraEmocional(valor)
    if (!regra) continue

    const jaExiste = await prisma.memoriaEmocional.findFirst({
      where: { empresaId, tipo: regra.tipo, fato: valor.slice(0, 200) },
    })
    if (jaExiste) continue

    await prisma.memoriaEmocional.create({
      data: {
        empresaId,
        tipo: regra.tipo,
        sentimento: regra.sentimento(valor),
        fato: valor.slice(0, 500),
        contexto: perguntaId,
      },
    })
    criadas++
  }
  return criadas
}

export async function listarMemoriasEmocionais(empresaId: string, limite = 6): Promise<MemoriaEmocional[]> {
  const memorias = await prisma.memoriaEmocional.findMany({
    where: { empresaId, deletedAt: null },
    orderBy: { criadaEm: 'desc' },
    take: limite,
  })
  return memorias.map((m) => ({
    id: m.id,
    tipo: m.tipo,
    sentimento: m.sentimento,
    fato: m.fato,
    contexto: m.contexto,
    criadaEm: m.criadaEm,
  }))
}

// ─── 4. LINHA DA HISTÓRIA ─────────────────────────────────────────────────

export interface CapituloHistoria {
  numero: number
  titulo: string
  icone: string
  cor: string
  paragrafos: string[]
}

export interface LinhaHistoria {
  empresaId: string
  capitulos: CapituloHistoria[]
  totalReflexoes: number
  totalPerguntasResolvidas: number
  resumo: string
}

export async function montarLinhaDaHistoria(
  empresaId: string,
  respostas: Record<string, string | null> = {},
): Promise<LinhaHistoria> {
  const [perguntasVivas, reflexoes, memorias, conversasHistorico] = await Promise.all([
    prisma.perguntaViva.findMany({
      where: { empresaId, deletedAt: null },
      orderBy: { criadaEm: 'asc' },
    }),
    prisma.reflexaoSemanal.count({ where: { empresaId, deletedAt: null } }),
    prisma.memoriaEmocional.findMany({
      where: { empresaId, deletedAt: null },
      orderBy: { criadaEm: 'asc' },
    }),
    prisma.conversaHistorico.findMany({
      where: { empresaId, deletedAt: null },
      orderBy: { criadaEm: 'asc' },
    }),
  ])

  const r = (id: string): string | null => respostas[id] ?? null

  const capitulos: CapituloHistoria[] = [
    {
      numero: 1,
      titulo: 'Como tudo começou',
      icone: '🌱',
      cor: 'border-green-400/30',
      paragrafos: [
        r('historia.nascer') ?? 'Ainda não me contaram como sua empresa nasceu.',
        r('historia.comecar') ? `O que fez você começar: ${r('historia.comecar')}` : null,
      ].filter(Boolean) as string[],
    },
    {
      numero: 2,
      titulo: 'Primeiros desafios',
      icone: '🪨',
      cor: 'border-amber-400/30',
      paragrafos: [
        r('rotina.pressao') ? `O momento do dia que mais pesa: ${r('rotina.pressao')}` : null,
        r('empresa.crescer') ? `O que costuma impedir o crescimento: ${r('empresa.crescer')}` : null,
        ...memorias.filter((m) => ['inseguranca', 'peso', 'ansiedade'].includes(m.tipo)).slice(0, 2).map((m) => m.sentimento),
      ].filter(Boolean) as string[],
    },
    {
      numero: 3,
      titulo: 'Primeiras conquistas',
      icone: '🌟',
      cor: 'border-yellow-400/30',
      paragrafos: [
        r('historia.orgulho') ? `O que mais gera orgulho hoje: ${r('historia.orgulho')}` : null,
        r('frente.funcionou') ? `O que funcionou melhor do que o esperado: ${r('frente.funcionou')}` : null,
        ...memorias.filter((m) => ['confianca', 'realizacao'].includes(m.tipo)).slice(0, 2).map((m) => m.sentimento),
      ].filter(Boolean) as string[],
    },
    {
      numero: 4,
      titulo: 'Momentos difíceis',
      icone: '🌧️',
      cor: 'border-blue-400/30',
      paragrafos: [
        r('rotina.tranquilo') ? `A última vez que você terminou o dia tranquilo: ${r('rotina.tranquilo')}` : null,
        r('frente.diferente') ? `O que você faria diferente se voltasse ao início: ${r('frente.diferente')}` : null,
      ].filter(Boolean) as string[],
    },
    {
      numero: 5,
      titulo: 'Grandes decisões',
      icone: '🎯',
      cor: 'border-red-400/30',
      paragrafos: [
        r('empresa.decisao') ? `Como você descobre se pode investir: ${r('empresa.decisao')}` : null,
        r('frente.proximo') ? `O objetivo para os próximos 6 meses: ${r('frente.proximo')}` : null,
        ...perguntasVivas.filter((p) => p.estado === 'RESPONDIDA' && p.resposta).slice(0, 2).map((p) => `${p.pergunta} → ${p.resposta}`),
      ].filter(Boolean) as string[],
    },
    {
      numero: 6,
      titulo: 'Mudanças importantes',
      icone: '🦋',
      cor: 'border-pink-400/30',
      paragrafos: [
        r('historia.mudanca') ? `O que você faria diferente desde o início: ${r('historia.mudanca')}` : null,
        r('empresa.horalivre') ? `Onde investiria uma hora livre por dia: ${r('empresa.horalivre')}` : null,
        ...(conversasHistorico.length > 0
          ? [`A empresa passou por ${conversasHistorico.length} conversa(s) registradas na história.`]
          : []),
      ].filter(Boolean) as string[],
    },
  ]

  const totalPerguntasResolvidas = perguntasVivas.filter((p) => p.estado === 'RESPONDIDA').length
  const resumo = capitulos.some((c) => c.paragrafos.length > 1)
    ? 'Sua empresa está se transformando em uma história — cada conversa escreve um novo parágrafo.'
    : 'Sua história está começando. Cada conversa que tivermos vai escrever um novo capítulo.'

  return {
    empresaId,
    capitulos,
    totalReflexoes: reflexoes,
    totalPerguntasResolvidas,
    resumo,
  }
}
