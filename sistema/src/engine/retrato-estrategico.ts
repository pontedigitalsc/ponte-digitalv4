import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import type { Interpretacoes } from '@/engine/tipos'
import type { HipoteseEstrategica } from '@/engine/hipoteses-estrategicas'
import type { Prisma } from '@prisma/client'

// ─────────────────────────────────────────────────────────────────────────────
// RETRATO ESTRATÉGICO DA EMPRESA — P65 (Retrato V3)
//
// A entrega da primeira conversa não é "mostrar dados". É mostrar leitura
// estratégica. O Retrato tem SEIS partes e é CONSEQUÊNCIA das hipóteses que os
// blocos formam — nunca um template. Termina sempre com uma pergunta aberta
// (continuidade, nunca coleta). Nenhuma IA é usada: é regra + hipóteses sobre
// as respostas reais, fiel ao princípio "IA é interface, não cérebro".
//
// A estrutura mudou para parecer uma conversa, não um relatório (P65):
//   1. Quem sua empresa parece ser hoje
//   2. O que mais me chamou atenção           (3 descobertas, não forças)
//   3. O que talvez você ainda não esteja percebendo   (ponto cego, hipótese)
//   4. A decisão que merece mais atenção
//   5. Se eu estivesse no seu lugar
//   6. A pergunta que quero continuar investigando     (sempre aberta)
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

// ─── 1. Quem sua empresa parece ser hoje ──────────────────────────────────────
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

// ─── 2. O que mais me chamou atenção (3 descobertas, não forças) ─────────────
function gerarDescobertas(hipoteses: HipoteseEstrategica[]): string[] {
  if (hipoteses.length === 0) {
    return ['Você dedicou tempo para olhar para a própria empresa — isso, sozinho, já é um patrimônio.']
  }
  return hipoteses.slice(0, 3).map((h) => `${h.texto} Você disse: "${h.evidencia}".`)
}

// ─── 3. Ponto cego — o que o empresário provavelmente ainda não percebe ──────
function gerarPontoCego(hipoteses: HipoteseEstrategica[]): string {
  const top = hipoteses[0]
  if (top?.pontoCego) {
    return `Posso estar enganada, mas há uma coisa que me chamou atenção. ${top.pontoCego}`
  }
  return 'Posso estar enganada, mas ainda estamos no começo da nossa conversa. Conforme eu te conhecer mais, vou conseguir apontar com mais segurança o que pode estar passando despercebido.'
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

  return {
    titulo: 'Retrato Estratégico da Empresa',
    secoes: [
      {
        numero: 1,
        titulo: 'Quem sua empresa parece ser hoje',
        corpo: gerarEntendimento(respostas, hipoteses),
      },
      {
        numero: 2,
        titulo: 'O que mais me chamou atenção',
        corpo: 'Três descobertas — todas a partir do que você me contou:',
        itens: gerarDescobertas(hipoteses),
      },
      {
        numero: 3,
        titulo: 'O que talvez você ainda não esteja percebendo',
        corpo: gerarPontoCego(hipoteses),
      },
      {
        numero: 4,
        titulo: 'A decisão que merece mais atenção',
        corpo: prioridade
          ? prioridade.prioridade
          : 'Escolher uma única coisa para observar com atenção nesta semana — só o registro já revela padrões que passavam despercebidos.',
      },
      {
        numero: 5,
        titulo: 'Se eu estivesse no seu lugar',
        corpo: prioridade
          ? prioridade.decisao
          : 'Se eu estivesse no seu lugar, observaria quais decisões da semana vêm de número e quais vêm de intuição — e escolheria uma única decisão para esperar o número antes.',
      },
      {
        numero: 6,
        titulo: 'A pergunta que quero continuar investigando',
        corpo: prioridade
          ? prioridade.pergunta
          : 'Se você tivesse 20% mais tempo livre na sua semana, qual parte da empresa você gostaria de desenvolver?',
      },
    ],
    proximaReflexao: prioridade
      ? prioridade.pergunta
      : 'Se você tivesse 20% mais tempo livre na sua semana, qual parte da empresa você gostaria de desenvolver?',
    aviso: 'Este é o começo de uma leitura — não uma verdade fechada. O que sabemos hoje muda com cada conversa. Eu volto para ver o que aconteceu.',
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
