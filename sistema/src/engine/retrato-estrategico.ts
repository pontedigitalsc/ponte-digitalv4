import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import type { Interpretacoes } from '@/engine/tipos'
import type { HipoteseEstrategica } from '@/engine/hipoteses-estrategicas'
import type { Prisma } from '@prisma/client'

// ─────────────────────────────────────────────────────────────────────────────
// RETRATO ESTRATÉGICO DA EMPRESA — P67 (Retrato V4 — "Primeiro diagnóstico
// cognitivo da empresa")
//
// A entrega da primeira conversa não é "mostrar dados". É mostrar leitura
// estratégica. O Retrato tem SEIS partes e é CONSEQUÊNCIA das hipóteses que os
// blocos formam — nunca um template. Termina sempre com uma pergunta aberta
// (continuidade, nunca coleta). Nenhuma IA é usada: é regra + hipóteses sobre
// as respostas reais, fiel ao princípio "IA é interface, não cérebro".
//
// A estrutura (V4) foi reescrita para parecer um DIAGNÓSTICO COGNITIVO — a
// Ponte não descreve a empresa, ela mostra O QUE leu, O QUE acredita ter
// percebido e O QUE precisa observar com você. Por isso a seção 4 é tripartida
// (sabemos / acreditamos / observamos):
//   1. Quem sua empresa é hoje              (baseado em evidências reais)
//   2. O que percebemos                     (3 padrões, não forças)
//   3. Seu maior ponto de atenção           (ponto de evolução)
//   4. Uma decisão que merece cuidado       (sabemos / acreditamos / observamos)
//   5. Primeiro passo recomendado           (executável)
//   6. Pergunta que acompanhará sua evolução (sempre aberta)
// ─────────────────────────────────────────────────────────────────────────────

export interface SecaoRetrato {
  numero: number
  titulo: string
  corpo: string
  itens?: string[]
}

export interface RetratoEstrategico {
  titulo: string
  secoes: SecaoRetrato[]
  proximaReflexao: string
  aviso: string
}

type Respostas = Record<string, string | null>

function r(respostas: Respostas, id: string): string | null {
  return respostas[id]?.trim() || null
}

// ─── 1. Quem sua empresa é hoje ──────────────────────────────────────────────
function gerarEntendimento(respostas: Respostas, hipoteses: HipoteseEstrategica[]): string {
  const momento = r(respostas, 'empresa.momento')
  const energia = r(respostas, 'rotina.energia')
  const cabeca = r(respostas, 'rotina.cabeca')
  const top = hipoteses[0]

  let base = ''
  if (momento) {
    base = `Pelo que você me contou, você lê o momento da empresa como "${momento}".`
  } else {
    base = 'Pelo que você me contou, sua empresa está em um momento que pede atenção.'
  }

  if (top) {
    base += ` Isso me leva a concluir que ${top.rotulo.toLowerCase()}.`
  }

  if (energia || cabeca) {
    base += ` E o que mais ocupa sua atenção hoje é "${energia ?? cabeca}".`
  }

  return base
}

// ─── 2. O que percebemos (3 padrões, não forças) ─────────────────
function gerarDescobertas(hipoteses: HipoteseEstrategica[]): string[] {
  if (hipoteses.length === 0) {
    return ['Você dedicou tempo para olhar para a própria empresa — isso, sozinho, já é um patrimônio.']
  }
  return hipoteses.slice(0, 3).map((h) => `${h.texto} Você disse: "${h.evidencia}".`)
}

// ─── Constrói a seção tripartida "sabemos / acreditamos / observamos" ───────
// P67 — a leitura não é opinião sobre a empresa, é um diagnóstico que separa o
// que foi REGISTRADO do que é ACREDITADO e do que PRECISA de observação.
function gerarDecisaoCuidadosa(
  respostas: Respostas,
  prioridade: HipoteseEstrategica | null,
): string[] {
  const sabemos: string[] = []
  const citacoes: { id: string; rotulo: string }[] = [
    { id: 'empresa.momento', rotulo: 'o momento' },
    { id: 'empresa.decisao', rotulo: 'como a empresa decide' },
    { id: 'financeiro.previsao', rotulo: 'a previsão do próximo mês' },
    { id: 'financeiro.caixa', rotulo: 'como lê o caixa' },
    { id: 'empresa.dependencia', rotulo: 'o que aconteceria se você se afastasse' },
    { id: 'empresa.clientes', rotulo: 'o que faz clientes voltarem' },
  ]
  for (const c of citacoes) {
    const v = r(respostas, c.id)
    if (v) sabemos.push(`Você me contou sobre ${c.rotulo} que "${v}"`)
  }
  if (sabemos.length === 0) {
    sabemos.push('Você dedicou tempo para olhar para a própria empresa, e nenhuma resposta foi genérica.')
  }

  const itemSabemos = `O que sabemos — ${sabemos[0]}${sabemos.length > 1 ? ` E que ${sabemos.slice(1).join('; e que ')}.` : '.'}`

  const acredita = prioridade
    ? prioridade.pontoCego.replace(
        /^Posso estar enganada,? ?/i,
        '',
      )
    : 'Ainda não tenho confiança para afirmar um padrão — começamos há poucos minutos juntos.'

  const observamos = prioridade
    ? `${prioridade.decisao.replace(/^Se eu estivesse no seu lugar, ?/i, '')}`
    : 'Observar quais decisões da próxima semana vêm de número e quais vêm de intuição.'

  return [
    itemSabemos,
    `O que acreditamos — ${acredita}`,
    `O que precisamos observar — ${observamos}`,
  ]
}

// ─── 3 + 4 + 5 + 6 — prioridade, decisão, conselho e pergunta (hipótese mais forte) ──
function hipotesePrioritaria(hipoteses: HipoteseEstrategica[]): HipoteseEstrategica | null {
  return hipoteses[0] ?? null
}

export function gerarRetratoEstrategico(
  respostas: Respostas,
  hipoteses: HipoteseEstrategica[],
  _interpretacoes?: Interpretacoes,
): RetratoEstrategico {
  const prioridade = hipotesePrioritaria(hipoteses)

  const pontoAtencao = prioridade
    ? `${prioridade.rotulo}. ${prioridade.texto}`
    : 'Escolher uma única coisa para observar com atenção nesta semana — só o registro já revela padrões que passavam despercebidos.'

  const primeiroPasso = prioridade
    ? prioridade.prioridade
    : 'Observar quais decisões da próxima semana vêm de número e quais vêm de intuição — e escolher uma única decisão para esperar o número antes.'

  const perguntaAcompanha = prioridade
    ? prioridade.pergunta
    : 'Se você tivesse 20% mais tempo livre na sua semana, qual parte da empresa você gostaria de desenvolver?'

  return {
    titulo: 'Primeiro diagnóstico cognitivo da empresa',
    secoes: [
      {
        numero: 1,
        titulo: 'Quem sua empresa é hoje',
        corpo: gerarEntendimento(respostas, hipoteses),
      },
      {
        numero: 2,
        titulo: 'O que percebemos',
        corpo: 'Três padrões — todos a partir do que você me contou:',
        itens: gerarDescobertas(hipoteses),
      },
      {
        numero: 3,
        titulo: 'Seu maior ponto de atenção',
        corpo: `Posso estar enganada, mas é o ponto onde a evolução costuma travar. ${pontoAtencao}`,
      },
      {
        numero: 4,
        titulo: 'Uma decisão que merece cuidado',
        corpo: 'Separei o que já foi registrado do que é hipótese — porque a leitura que vale não é a opinião, é o que conseguimos observar juntos:',
        itens: gerarDecisaoCuidadosa(respostas, prioridade),
      },
      {
        numero: 5,
        titulo: 'Primeiro passo recomendado',
        corpo: primeiroPasso,
      },
      {
        numero: 6,
        titulo: 'A pergunta que acompanhará sua evolução',
        corpo: perguntaAcompanha,
      },
    ],
    proximaReflexao: perguntaAcompanha,
    aviso: 'Este é o começo de um diagnóstico — não uma verdade fechada. O que sabemos hoje muda com cada conversa. Eu volto para ver o que aconteceu.',
  }
}

// ─── Clareza Gerada — registro sem score artificial ──────────────────────────
// Registra o que a conversa gerou: pergunta inicial, descoberta, decisão
// sugerida e (futuramente) a reação do empresário. Reusa o modelo SinalValor.
export interface ClarezaGerada {
  perguntaInicial: string | null
  descoberta: string
  decisaoSugerida: string
  reacao: string | null
}

export async function registrarClarezaGerada(
  empresaId: string,
  retrato: RetratoEstrategico,
  respostas: Respostas,
): Promise<void> {
  const decisao = retrato.secoes.find((s) => s.numero === 5)?.corpo ?? retrato.proximaReflexao
  const descoberta = retrato.secoes.find((s) => s.numero === 1)?.corpo ?? retrato.titulo
  const clareza: ClarezaGerada = {
    perguntaInicial: r(respostas, 'empresa.momento') ?? r(respostas, 'rotina.energia'),
    descoberta,
    decisaoSugerida: decisao,
    reacao: null,
  }

  await prismaSeguro.sinalValor.create({
    data: {
      empresaId,
      tipo: 'CLAREZA_GERADA',
      origem: 'PRIMEIRA_CONVERSA',
      peso: 1.0,
      metadata: clareza as unknown as Prisma.InputJsonValue,
    },
  })
}
