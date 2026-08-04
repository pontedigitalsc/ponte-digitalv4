import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

// ─────────────────────────────────────────────────────────────────────────────
// MEMÓRIA EMPRESARIAL VIVA — P65
//
// "A Ponte não guarda dados. A Ponte guarda a evolução da empresa."
//
// Substitui a linha do tempo por PAINÉIS DE EVOLUÇÃO. Cinco painéis — Empresa,
// Fundador, Decisões, Clientes, Operação — cada um respondendo a uma pergunta:
// "Estamos evoluindo?". Não existem linhas do tempo, existem comparações.
//
// Regras duras (P65):
//   • Comparar comportamento, nunca apenas respostas.
//   • Cada painel: ANTES (1ª sessão) → HOJE (última sessão) → interpretação.
//   • Selos de confiança: O que sabemos / O que acreditamos / O que ainda
//     estamos investigando. Nunca apresentar hipótese como fato.
//   • Narrativa primeiro. Gráficos nunca.
//   • Com uma única sessão: mostra o estado atual + aviso honesto. Nunca
//     inventar evolução onde não há tempo para ela existir.
//
// Nenhuma IA é usada: interpretação determinística sobre as respostas reais,
// fiel ao princípio "IA é interface, não cérebro".
// ─────────────────────────────────────────────────────────────────────────────

export type SeloConfianca = 'SABEMOS' | 'ACREDITAMOS' | 'INVESTIGANDO'

export interface PainelMemoria {
  id: string
  titulo: string
  icone: string
  pergunta: string // a pergunta que o painel responde ("Estamos evoluindo?")
  antes: string | null // citação da 1ª sessão
  hoje: string | null // citação da última sessão
  interpretacao: string
  selo: SeloConfianca
  seloTexto: string
}

export interface MemoriaViva {
  empresaId: string
  totalSessoes: number
  temHistorico: boolean
  narrativa: string
  aviso: string
  paineis: PainelMemoria[]
}

interface PainelDef {
  id: string
  titulo: string
  icone: string
  pergunta: string
  perguntaIds: string[]
  interpretar: (antes: string | null, hoje: string | null) => {
    texto: string
    selo: SeloConfianca
  }
}

function normalizarTexto(valor: string): string {
  return valor
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function cita(valor: string | null, limite = 160): string | null {
  if (!valor) return null
  const limpo = valor.trim()
  if (!limpo) return null
  return limpo.slice(0, limite)
}

function primeiraResposta(lista: string[]): string | null {
  for (const v of lista) if (v && v.trim()) return v.trim()
  return null
}

function haAlguma(antes: string | null, hoje: string | null, palavras: string[]): boolean {
  for (const v of [antes, hoje]) {
    if (!v) continue
    const t = normalizarTexto(v)
    for (const p of palavras) {
      if (t.includes(normalizarTexto(p))) return true
    }
  }
  return false
}

function seloAcrediata(texto: string): { texto: string; selo: SeloConfianca } {
  return { texto, selo: 'ACREDITAMOS' }
}

// ─── Definição dos 5 painéis ─────────────────────────────────────────────────

const PAINEIS: PainelDef[] = [
  {
    id: 'empresa',
    titulo: 'Empresa',
    icone: '🏢',
    pergunta: 'A sua empresa está evoluindo?',
    perguntaIds: ['empresa.momento', 'empresa.crescer', 'visao.funcionando', 'frente.proximo'],
    interpretar: (antes, hoje) => {
      if (haAlguma(antes, hoje, ['parada', 'estagnou', 'não avança', 'mesmo lugar', 'sem avançar'])) {
        return seloAcrediata('Você falou da empresa sem avançar nas duas conversas. Posso estar enganada, mas a evolução aqui ainda parece estar começando — não em velocidade, mas em direção.')
      }
      if (antes && hoje && normalizarTexto(antes) !== normalizarTexto(hoje)) {
        return seloAcrediata('A forma como você descreve a empresa mudou entre as duas conversas. Isso pode indicar movimento real — ou apenas um momento diferente. O que me confirma a evolução é o que acontece entre uma conversa e outra.')
      }
      return {
        texto: 'A descrição da empresa se manteve parecida. Não vou chamar isso de evolução: pode ser estabilidade consistente ou um período parado — o tempo vai contar.',
        selo: 'INVESTIGANDO',
      }
    },
  },
  {
    id: 'fundador',
    titulo: 'Fundador',
    icone: '🧭',
    pergunta: 'Você está conseguindo mais espaço e tranquilidade?',
    perguntaIds: ['rotina.energia', 'rotina.cabeca', 'rotina.tranquilo'],
    interpretar: (antes, hoje) => {
      const antesCalmo = antes && haAlguma(antes, null, ['nunca', 'não lembro', 'não sei', 'dificilmente'])
      const hojeCalmo = hoje && haAlguma(hoje, null, ['nunca', 'não lembro', 'não sei', 'dificilmente'])
      if (antesCalmo && !hojeCalmo) {
        return seloAcrediata('Na primeira conversa, a tranquilidade parecia distante. Na última, você conseguiu apontar um momento concreto. Isso é um sinal de mudança — o quanto ela é sustentável, só as próximas conversas mostram.')
      }
      if (!antesCalmo && hojeCalmo) {
        return seloAcrediata('Você terminou o dia tranquilo há pouco tempo. Se isso se repete, é evolução de verdade — mas uma ocorrência ainda não é um padrão.')
      }
      return {
        texto: 'Sobre energia e tranquilidade, o que você me contou não mudou de forma clara. Ainda não tenho como afirmar evolução — estou investigando como isso se comporta entre as conversas.',
        selo: 'INVESTIGANDO',
      }
    },
  },
  {
    id: 'decisoes',
    titulo: 'Decisões',
    icone: '🎯',
    pergunta: 'A empresa está decidindo melhor?',
    perguntaIds: ['empresa.decisao', 'empresa.preocupacao', 'financeiro.previsao', 'financeiro.caixa'],
    interpretar: (antes, hoje) => {
      const agoraTemNumero = haAlguma(antes, hoje, ['número', 'planilha', 'registro', 'previsão', 'previsao', 'dado', 'valor', 'histórico', 'historico'])
      if (agoraTemNumero) {
        return seloAcrediata('Você passou a citar números, registros ou previsão ao decidir. Decisão apoiada em número não é garantia de acerto, mas deixa de ser aposta. Essa é a direção mais confiável de evolução que encontrei.')
      }
      if (haAlguma(antes, hoje, ['intuição', 'feeling', 'sinto', 'achismo', 'no escuro', 'chute'])) {
        return seloAcrediata('A intuição continua sendo o principal instrumento de decisão. Ela tem valor, mas sem nenhum registro por trás, cada decisão recomeça do zero. Vejo espaço de evolução — não uma evolução acontecendo ainda.')
      }
      return {
        texto: 'Não encontrei sinais claros de mudança na forma de decidir. Sem comparação direta entre as conversas, não posso afirmar que a empresa decidiu melhor — apenas que continuou decidindo.',
        selo: 'INVESTIGANDO',
      }
    },
  },
  {
    id: 'clientes',
    titulo: 'Clientes',
    icone: '🤝',
    pergunta: 'A empresa conhece melhor os próprios clientes?',
    perguntaIds: ['empresa.clientes', 'empresa.multiplicar', 'historia.orgulho'],
    interpretar: (antes, hoje) => {
      if (antes && hoje && normalizarTexto(antes) !== normalizarTexto(hoje)) {
        return seloAcrediata('A forma como você descreve o que faz clientes voltarem mudou. Quanto mais específica e detalhada essa resposta fica, mais a empresa está transformando intuição sobre clientes em conhecimento. A consistência nas próximas conversas vai confirmar.')
      }
      return {
        texto: 'A resposta sobre clientes se manteve muito parecida. Isso pode ser um ponto de maturidade ou um ponto cego — preciso de mais conversas para saber.',
        selo: 'INVESTIGANDO',
      }
    },
  },
  {
    id: 'operacao',
    titulo: 'Operação',
    icone: '⚙️',
    pergunta: 'A operação está menos dependente de você?',
    perguntaIds: ['empresa.dependencia', 'empresa.horalivre'],
    interpretar: (antes, hoje) => {
      const delegacao = haAlguma(antes, hoje, ['equipe', 'time', 'funcionário', 'funcionario', 'delego', 'delegar', 'repasso', 'processo', 'pessoas'])
      const centralizacao = haAlguma(antes, hoje, ['tudo eu', 'sozinho', 'sozinha', 'sem mim', 'depende de mim', 'eu que'])
      if (delegacao && !centralizacao) {
        return seloAcrediata('Você passou a mencionar equipe, processo ou delegação ao falar do que aconteceria se você se afastasse. Isso é o sinal mais claro de evolução na operação: a empresa deixando de caber numa cabeça só.')
      }
      if (centralizacao) {
        return seloAcrediata('Nas duas conversas, a operação continua centralizada em você. É um padrão consistente — e é exatamente o ponto que a sua memória vai acompanhar ao longo do tempo.')
      }
      return {
        texto: 'A dependência da operação em você ainda não aparece de forma clara nas respostas. Preciso de mais sessões para observar esse padrão.',
        selo: 'INVESTIGANDO',
      }
    },
  },
]

// ─── Motor: monta a Memória Viva ─────────────────────────────────────────────

export async function obterMemoriaViva(empresaId: string): Promise<MemoriaViva> {
  const respostas = await prisma.respostasConversa.findMany({
    where: { empresaId, deletedAt: null },
    select: { perguntaId: true, valor: true, token: true, criadaEm: true },
    orderBy: { criadaEm: 'asc' },
  })

  // Agrupa por sessão (token). Sem token (respostas antigas), cada resposta é
  // uma "sessão" própria — a comparação usa o primeiro e o último registro.
  const sessoes = new Map<string, { criadaEm: Date; valores: Map<string, string> }>()
  for (const r of respostas) {
    const chave = r.token ?? `anom-${r.criadaEm.getTime()}`
    if (!sessoes.has(chave)) {
      sessoes.set(chave, { criadaEm: r.criadaEm, valores: new Map() })
    }
    const sessao = sessoes.get(chave)!
    sessao.valores.set(r.perguntaId, r.valor)
  }

  const sessoesOrdenadas = [...sessoes.values()].sort((a, b) => a.criadaEm.getTime() - b.criadaEm.getTime())
  const totalSessoes = sessoesOrdenadas.length
  const temHistorico = totalSessoes > 1

  const primeira = sessoesOrdenadas[0]
  const ultima = sessoesOrdenadas[totalSessoes - 1]

  // Para cada perguntaId, "antes" = valor da 1ª sessão (se existir) senão o
  // primeiro valor registrado; "hoje" = valor da última sessão (se existir)
  // senão o último valor registrado.
  const valorNaSessao = (sessao: { valores: Map<string, string> } | undefined, perguntaId: string): string | null => {
    return sessao?.valores.get(perguntaId) ?? null
  }

  const paineis: PainelMemoria[] = PAINEIS.map((def) => {
    const antesIds = def.perguntaIds
      .map((id) => valorNaSessao(primeira, id) ?? valorNaSessao(ultima, id))
      .filter((v): v is string => !!v)
    const hojeIds = def.perguntaIds
      .map((id) => valorNaSessao(ultima, id) ?? valorNaSessao(primeira, id))
      .filter((v): v is string => !!v)

    // Melhor citação: usa a pergunta mais "narrativa" do painel.
    const antes = cita(primeiraResposta(antesIds))
    const hoje = cita(primeiraResposta(hojeIds))
    const antesExato = primeiraResposta(antesIds)
    const hojeExato = primeiraResposta(hojeIds)

    const { texto, selo } = def.interpretar(antesExato, hojeExato)

    return {
      id: def.id,
      titulo: def.titulo,
      icone: def.icone,
      pergunta: def.pergunta,
      antes,
      hoje,
      interpretacao: texto,
      selo,
      seloTexto:
        selo === 'SABEMOS'
          ? 'O que sabemos — com evidência nas suas palavras.'
          : selo === 'ACREDITAMOS'
            ? 'O que acreditamos — uma leitura, não uma certeza. Posso estar enganada.'
            : 'O que ainda estamos investigando — precisa de mais conversas.',
    }
  })

  const aviso = temHistorico
    ? 'Estas são as minhas leituras, não verdades fechadas. A evolução se confirma quando o comportamento se repete entre conversas — e é isso que vou continuar observando.'
    : 'Esta é a primeira conversa registrada. Não vou inventar evolução onde ainda não há tempo para ela existir: estes painéis guardam o estado atual, e a comparação começa a ganhar sentido na próxima sessão.'

  const narrativa = temHistorico
    ? `Comparando a primeira conversa com a última, já consigo observar como sua empresa e você mudaram. Não estou medindo você — estou guardando o que muda e o que permanece, para as próximas conversas partirem daqui.`
    : `Nossa memória começou. A Ponte não guarda dados — guarda a evolução da empresa. Nesta primeira conversa, plantamos o estado atual: cada painel abaixo é o ponto de partida para as comparações futuras.`

  return {
    empresaId,
    totalSessoes,
    temHistorico,
    narrativa,
    aviso,
    paineis,
  }
}
