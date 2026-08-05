import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { montarContinuidadeConversa } from './relacao-engine'

// P69.5 — Presença Cognitiva Permanente (versão fundacional).
//
// O P69 já montava uma agenda. Mas ainda parecia um painel com cards.
// Este programa transforma a abertura em CONTINUIDADE DA CONVERSA:
//
//   "Minha empresa continuou sendo compreendida enquanto eu vivia minha rotina."
//
// REGRAS DE ORO DA ABERTURA:
// - A Ponte nunca começa perguntando. Ela começa MOSTRANDO QUE LEMBRA.
// - Nunca "bem-vindo" — sempre "na nossa última conversa..." ou "desde a última...".
// - Nunca cards / listas / KPIs / "você possui" / "existem" / "foram encontrados".
// - Assuntos aparecem como PEQUENAS CONVERSAS, não cards.
// - A abertura tem 5 camadas: CONTINUIDADE → OBSERVAÇÃO → CONEXÃO → PRIORIDADE → CONVITE.
// - Cada abertura tem um MOMENTO (oportunidade, risco, evolução, dúvida, revisar decisão...).
// - A Ponte sempre tem algo inteligente para conversar. Nunca deixa a abertura vazia.
//
// Tudo determinístico (sem IA): a conversa nasce de dados e memória reais.

export type MomentoTipo =
  | 'OPORTUNIDADE'
  | 'RISCO'
  | 'EVOLUCAO'
  | 'DUVIDA'
  | 'REVISAR_DECISAO'
  | 'NADA_URGENTE'

export type PrioridadeAssunto = 'ALTA' | 'MEDIA' | 'BAIXA'
export type TipoAssunto = 'DECISAO' | 'HIPOTESE' | 'EVOLUCAO' | 'CONEXAO'

export interface AssuntoConversa {
  id: string
  tipo: TipoAssunto
  fala: string // o que a Ponte diz, como convite à conversa — não um card
  pergunta: string
  opcoes: string[]
  prioridade: PrioridadeAssunto
  rota: string
}

export interface AberturaPermanente {
  saudacao: string
  momento: { tipo: MomentoTipo; rotulo: string; frase: string }
  continuidade: string // camada 1 — a Ponte lembra
  observacao: string // camada 2 — interpreta, não repete fato
  conexao: string | null // camada 3 — liga fatos separados
  prioridade: string // camada 4 — POR QUE conversar
  convite: string // camada 5 — parece conversa, não botão
  assuntos: AssuntoConversa[] // pequenas conversas (máx 3)
  sempreTemOQueDizer: boolean // nunca fica vazio
}

const ORDEM_PRIORIDADE: Record<PrioridadeAssunto, number> = { ALTA: 0, MEDIA: 1, BAIXA: 2 }

function diasDesde(data: Date, agora: Date): number {
  return Math.floor((agora.getTime() - data.getTime()) / (24 * 60 * 60 * 1000))
}

function saudacaoDoDia(nome: string, agora: Date): string {
  const hora = agora.getHours()
  const primeiroNome = nome.split(' ')[0]
  if (hora >= 5 && hora < 12) return `Bom dia, ${primeiroNome}.`
  if (hora >= 12 && hora < 18) return `Boa tarde, ${primeiroNome}.`
  return `Boa noite, ${primeiroNome}.`
}

// P69.5 — escolhe o MOMENTO desta abertura. Cada abertura tem uma intenção,
// o que cria expectativa e surpresa. Determinístico, ancorado no sinal mais forte.
function escolherMomento(
  decisoes: { criadaEm: Date }[],
  hipoteses: { descricao: string; impacto: string; criadaEm: Date }[],
  temEvolucao: boolean,
  agora: Date
): AberturaPermanente['momento'] {
  const decisaoAntiga = decisoes.some((d) => diasDesde(d.criadaEm, agora) >= 14)
  const decisaoRecenteAberta = decisoes.some((d) => diasDesde(d.criadaEm, agora) >= 3)
  const hipoteseAlta = hipoteses.some((h) => h.impacto === 'ALTO')

  if (decisaoAntiga) {
    return {
      tipo: 'REVISAR_DECISAO',
      rotulo: 'Uma decisão para revisitar',
      frase: 'Existe uma decisão antiga que talvez valha revisitar.',
    }
  }
  if (decisaoRecenteAberta) {
    return {
      tipo: 'OPORTUNIDADE',
      rotulo: 'Uma decisão em aberto',
      frase: 'Existe uma decisão importante que ainda não sabemos como terminou.',
    }
  }
  if (hipoteseAlta) {
    return {
      tipo: 'DUVIDA',
      rotulo: 'Uma dúvida que me acompanha',
      frase: 'Hoje fiquei com uma dúvida que vale conversarmos.',
    }
  }
  if (temEvolucao) {
    return {
      tipo: 'EVOLUCAO',
      rotulo: 'Uma evolução que percebi',
      frase: 'Acho que você evoluiu em um ponto importante.',
    }
  }
  return {
    tipo: 'NADA_URGENTE',
    rotulo: 'Nada urgente hoje',
    frase: 'Hoje não encontrei nenhum alerta importante. Isso é uma boa notícia.',
  }
}

// P69.5 — monta a abertura permanente.
// Camadas: continuidade → observação → conexão → prioridade → convite.
// Assuntos viram PEQUENAS CONVERSAS, nunca cards.
export async function montarAberturaPermanente(
  empresaId: string,
  nome: string
): Promise<AberturaPermanente> {
  const agora = new Date()

  const [decisoes, hipoteses, ultimaConversa, continuidade, perguntaViva, memorias] = await Promise.all([
    prisma.acaoCognitiva.findMany({
      where: { empresaId, deletedAt: null, status: { in: ['PENDENTE', 'EM_ANDAMENTO'] } },
      select: { id: true, titulo: true, criadaEm: true, atualizadaEm: true },
      orderBy: { criadaEm: 'asc' },
    }),
    prisma.hipotese.findMany({
      where: {
        empresaId,
        deletedAt: null,
        estado: { in: ['NOVA', 'EM_OBSERVACAO', 'FORTALECIDA'] },
      },
      select: { id: true, descricao: true, impacto: true, criadaEm: true },
      orderBy: [{ impacto: 'desc' }, { criadaEm: 'asc' }],
      take: 6,
    }),
    prisma.conversa.findFirst({
      where: { empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      select: { criadaEm: true },
    }),
    montarContinuidadeConversa(empresaId).catch(() => null),
    prisma.perguntaViva.findFirst({
      where: { empresaId, estado: 'ATIVA', deletedAt: null },
      orderBy: { criadaEm: 'desc' },
    }),
    prisma.memoriaEmocional.findMany({
      where: { empresaId, deletedAt: null },
      orderBy: { criadaEm: 'desc' },
      take: 1,
    }),
  ])

  const decisoesAbertas = decisoes.filter((d) => diasDesde(d.criadaEm, agora) >= 3)
  const temEvolucao = memorias.length > 0
  const momento = escolherMomento(decisoes, hipoteses, temEvolucao, agora)

  // ─── CAMADA 1 — CONTINUIDADE: a Ponte mostra que lembra, nunca "bem-vindo".
  const baseContinuidade =
    continuidade ??
    (ultimaConversa
      ? 'Desde nossa última conversa, algumas coisas continuaram chamando minha atenção.'
      : 'Ainda estamos nos conhecendo — mas já estou começando a entender sua empresa.')

  // ─── CAMADA 4 — PRIORIDADE: POR QUE conversar (nunca listar tarefas).
  const prioridade =
    momento.tipo === 'REVISAR_DECISAO'
      ? 'Acho que vale revisarmos essa decisão porque ela pode influenciar praticamente as próximas escolhas da empresa.'
      : momento.tipo === 'OPORTUNIDADE'
        ? 'Hoje eu destacaria isso porque é uma decisão que pode mudar o rumo das próximas semanas.'
        : momento.tipo === 'EVOLUCAO'
          ? 'Vale conversarmos porque entender o que mudou ajuda a repetir o que funcionou.'
          : momento.tipo === 'DUVIDA'
            ? 'Essa dúvida importa porque ela pode estar atrás de várias outras decisões que você está tomando.'
            : 'Mesmo sem urgência, vale pensarmos juntos para continuarmos afinando a leitura da sua empresa.'

  // ─── CAMADA 5 — CONVITE: parece conversa, não botão.
  const convite =
    momento.tipo === 'NADA_URGENTE'
      ? 'Podemos analisar isso agora, quando você quiser.'
      : 'Vamos pensar nisso juntos?'

  // ─── ASSUNTOS — pequenas conversas (máx 3).
  const assuntos: AssuntoConversa[] = []

  for (const d of decisoesAbertas) {
    const idadeDias = diasDesde(d.criadaEm, agora)
    assuntos.push({
      id: `decisao:${d.id}`,
      tipo: 'DECISAO',
      fala: `Tenho pensado em uma coisa. Há uma decisão em aberto — "${d.titulo}" — que ainda não sabemos como terminou.`,
      pergunta: 'Essa decisão aconteceu?',
      opcoes: ['Sim', 'Ainda não', 'Mudei de ideia'],
      prioridade: idadeDias >= 7 ? 'ALTA' : 'MEDIA',
      rota: '/centro-decisao',
    })
    if (assuntos.length >= 3) break
  }

  for (const h of hipoteses) {
    assuntos.push({
      id: `hipotese:${h.id}`,
      tipo: 'HIPOTESE',
      fala: `Eu tenho continuado a acreditar que ${h.descricao.toLowerCase()}.`,
      pergunta: 'Você ainda sente isso?',
      opcoes: ['Sim', 'Parcialmente', 'Não'],
      prioridade: h.impacto === 'ALTO' ? 'ALTA' : 'MEDIA',
      rota: '/conversa',
    })
    if (assuntos.length >= 3) break
  }

  // Conexão: ligar fatos separados (decisão + hipótese) — raciocínio real.
  let conexao: string | null = null
  if (decisoesAbertas.length > 0 && hipoteses.length > 0) {
    conexao =
      'Tenho notado que uma decisão segue em aberto ao mesmo tempo em que continuo acreditando em uma hipótese sobre a sua empresa. Quando essas duas coisas caminham lado a lado, costuma valer a pena olhá-las juntas — uma costuma explicar a outra.'
  } else if (decisoesAbertas.length > 1) {
    conexao =
      'Percebi que há mais de uma decisão em aberto ao mesmo tempo. Decisões empilhadas costumam ter uma ordem mais segura de serem tomadas — talvez exista uma sequência que simplifique tudo.'
  }

  // Nunca deixa a abertura vazia: sempre há algo inteligente para conversar.
  if (assuntos.length === 0) {
    const questao = perguntaViva?.pergunta
      ? `Mesmo assim fiquei pensando em uma pergunta que vem me acompanhando: "${perguntaViva.pergunta}"`
      : 'Mesmo assim fiquei pensando em algo: quando você percebe que a empresa depende de você para quase tudo, isso costuma aparecer primeiro no tempo, e depois no caixa.'
    assuntos.push({
      id: `pergunta:${perguntaViva?.id ?? 'sempre'}`,
      tipo: 'EVOLUCAO',
      fala: questao,
      pergunta: 'O que você acha?',
      opcoes: ['Faz sentido', 'Não é bem assim', 'Deixa eu pensar'],
      prioridade: 'BAIXA',
      rota: '/conversa',
    })
  }

  const assuntosOrdenados = assuntos
    .sort((a, b) => ORDEM_PRIORIDADE[a.prioridade] - ORDEM_PRIORIDADE[b.prioridade])
    .slice(0, 3)

  // ─── CAMADA 2 — OBSERVAÇÃO: interpreta, nunca repete fato.
  const top = assuntosOrdenados[0]
  const observacao = top
    ? top.tipo === 'DECISAO'
      ? `O que mais me chamou atenção é que essa decisão está em aberto há alguns dias. Decisões em aberto costumam pesar mais do que parecem — e isso vale conversarmos antes que ela vire um nó.`
      : top.tipo === 'HIPOTESE'
        ? `O que mais me chamou atenção é que seguimos acreditando em algo sobre a sua empresa, mas ainda não tivemos a chance de confirmar se continua sendo verdade.`
        : `O que mais me chamou atenção é que você tem continuado a empresa mesmo com tantas coisas se movendo ao mesmo tempo.`
    : 'O que mais me chamou atenção, hoje, é o quanto a sua rotina e a empresa seguem caminhando juntas.'

  return {
    saudacao: saudacaoDoDia(nome, agora),
    momento,
    continuidade: baseContinuidade,
    observacao,
    conexao,
    prioridade,
    convite,
    assuntos: assuntosOrdenados,
    sempreTemOQueDizer: true,
  }
}