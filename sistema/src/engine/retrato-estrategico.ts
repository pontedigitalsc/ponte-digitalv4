import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import type { Interpretacoes } from '@/engine/tipos'
import type { HipoteseEstrategica } from '@/engine/hipoteses-estrategicas'
import { gerarLeituraCognitiva } from '@/engine/hipoteses-estrategicas'
import { gerarDescobertas } from '@/engine/motor-descobertas'
import type { Prisma } from '@prisma/client'

// ─────────────────────────────────────────────────────────────────────────────
// RETRATO ESTRATÉGICO DA EMPRESA — P73 (Retrato V5 — "A Experiência da
// Descoberta") + P77 ("A Ponte precisa merecer a conversa")
//
// O Retrato deixa de INFORMAR e passa a REVELAR. Não é um relatório: é uma
// JORNADA. A estrutura conta como a Ponte chegou à leitura:
//   1. O que eu já tinha como primeira leitura     (hipótese inicial)
//   2. O que eu fui percebendo na conversa         (mudanças + contradições)
//   3. As descobertas que você me fez chegar       (MOTOR DAS DESCOBERTAS, P77)
//   4. O que hoje parece me importante             (síntese — o padrão)
//   5. O ponto que talvez você ainda não esteja olhando (ponto cego)
//   6. A decisão que eu não decidiria com pressa          (baseada em tudo)
//   7. A conversa que teremos daqui a alguns dias   (pergunta aberta)
//
// P72 alimenta este Retrato: mostra RELAÇÕES (causa), não fatos isolados;
// entrega CONTRADIÇÕES; e produz uma FRASE que o empresário quer guardar.
// P77 (Motor das Descobertas) garante que a Ponte PRODUZA CONHECIMENTO — cada
// descoberta conecta pelo menos duas respostas de momentos diferentes — e
// jamais invente: sem evidência suficiente, ela diz que ainda não tem
// elementos para afirmar. Determinístico, sem IA, 100% derivado das respostas.
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
  // P73 — uma frase que o empresário queira guardar (destaque do Retrato).
  frase?: string | null
}

type Respostas = Record<string, string | null>

function r(respostas: Respostas, id: string): string | null {
  return respostas[id]?.trim() || null
}

// ─── 1. A hipótese inicial (do primeiro lugar por onde a conversa começou) ───
function capituloHipoteseInicial(respostas: Respostas): string {
  const momento = r(respostas, 'empresa.momento')
  const energia = r(respostas, 'rotina.energia')

  const primeira = momento ?? energia
  if (!primeira) {
    return 'Quando você começou a falar, eu ainda não sabia por onde ia caminhar — só percebia que você estava aberto a olhar de verdade para a empresa.'
  }

  return `Quando você começou me contando que está assim — "${primeira}" —, minha primeira tentativa de leitura foi procurar ali o ponto mais pesado: a energia indo para segurar uma operação que ainda depende de você. Era o melhor que eu podia inferir naquele início.`
}

// ─── 2. O que fui percebendo — relações + contradições (P72) ─────────────────
function capituloPercepcao(respostas: Respostas, leitura: ReturnType<typeof gerarLeituraCognitiva>): string {
  const itens: string[] = []
  if (leitura.relacoes.length > 0) {
    itens.push(...leitura.relacoes)
  }
  if (leitura.contradicoes.length > 0) {
    itens.push(...leitura.contradicoes)
  }
  if (itens.length === 0) {
    itens.push('Ao longo da conversa, comecei a perceber conexões no que você me contou — não fatos soltos, mas uma história que se encaixava aos poucos.')
  }
  return itens.join(' ')
}

// ─── 3. Síntese — o que importa mais hoje (a relação, não a resposta) ────────
function capituloSintese(leitura: ReturnType<typeof gerarLeituraCognitiva>, prioridade: HipoteseEstrategica | null): string {
  const padrao = leitura.padrao
  if (prioridade) {
    return `${padrao} Por isso o mais importante hoje não é uma ação pontual — é enxergar que ${prioridade.rotulo.toLowerCase()}.`
  }
  return padrao
}

// ─── 4. Ponto cego (sempre como hipótese) ────────────────────────────────────
function capituloPontoCego(prioridade: HipoteseEstrategica | null): string {
  if (!prioridade) {
    return 'Ainda não tenho confiança para apontar um ponto cego — começamos há poucos minutos. Mas já tenho o que observar juntos na próxima conversa.'
  }
  return prioridade.pontoCego
}

// ─── 5. A decisão que a Ponte criticaria sem pressa ──────────────────────────
function capituloDecisao(prioridade: HipoteseEstrategica | null): string {
  if (!prioridade) {
    return 'Observar quais decisões da próxima semana vêm de número e quais vêm de intuição — e escolher UMA para esperar o número antes de decidir.'
  }
  return prioridade.decisao
}

// ─── 6. Conversa daqui a alguns dias (pergunta aberta) ───────────────────────
function capituloPergunta(prioridade: HipoteseEstrategica | null): string {
  return prioridade?.pergunta ?? 'Se você tivesse 20% mais tempo livre na semana, qual parte da empresa gostaria de desenvolver?'
}

function hipotesePrioritaria(hipoteses: HipoteseEstrategica[]): HipoteseEstrategica | null {
  return hipoteses[0] ?? null
}

// ─────────────────────────────────────────────────────────────────────────────
// RETRATO INICIAL DO FOUNDER — P86-B2
//
// O fluxo `configuracao-founder` gera um "Retrato Inicial" (não um veredito):
// as MESMAS seções da carta P73, mas contando o que a Ponte entendeu sobre a
// PONTE que o fundador está construindo. Cada capítulo só usa o que foi
// realmente dito; a guarda de evidência continua valendo (sem resposta, a
// Ponte não inventa). A seção "O que eu descobri sobre a Ponte" substitui o
// retrato empresarial sem alterá-lo — o fluxo da Primeira Conversa permanece.
// ─────────────────────────────────────────────────────────────────────────────

function ehConversaFounder(respostas: Respostas): boolean {
  return !!r(respostas, 'fundador.papel') || !!r(respostas, 'fluxo.afastamento') || !!r(respostas, 'atencao.mudanca')
}

function capituloHipoteseInicialFounder(respostas: Respostas): string {
  const momento = r(respostas, 'realidade.momento')
  const papel = r(respostas, 'fundador.papel')
  const primeira = momento ?? papel
  if (!primeira) {
    return 'Quando você começou a falar da Ponte, eu ainda não sabia por onde ia caminhar — só percebia que você estava aberto a olhar de verdade para o que está construindo.'
  }
  return `Quando você começou me contando que a Ponte está assim — "${primeira}" —, minha primeira tentativa de leitura foi procurar ali o ponto mais pesado: a energia indo para segurar uma operação que ainda depende de você. Era o melhor que eu podia inferir naquele início.`
}

function capituloPontoCegoFounder(prioridade: HipoteseEstrategica | null): string {
  if (!prioridade) {
    return 'Ainda não tenho confiança para apontar um ponto cego — começamos há poucos minutos. Mas já tenho o que observar juntos na próxima conversa.'
  }
  return prioridade.pontoCego
}

function capituloDecisaoFounder(prioridade: HipoteseEstrategica | null): string {
  if (!prioridade) {
    return 'Observar quais decisões da próxima semana vêm de número e quais vêm de intuição — e escolher UMA para esperar o número antes de decidir.'
  }
  return prioridade.decisao
}

function capituloPerguntaFounder(respostas: Respostas, prioridade: HipoteseEstrategica | null): string {
  if (prioridade?.pergunta) return prioridade.pergunta
  if (!r(respostas, 'realidade.uso')) {
    return 'O que acontece hoje quando alguém encontra a Ponte pela primeira vez? O que faz essa pessoa voltar?'
  }
  return 'Se você tivesse um mês de trégua nas urgências, qual é a primeira coisa que tentaria mudar na Ponte?'
}

function gerarRetratoFounder(respostas: Respostas, hipoteses: HipoteseEstrategica[]): RetratoEstrategico {
  const prioridade = hipotesePrioritaria(hipoteses)
  const leitura = gerarLeituraCognitiva(respostas, hipoteses)
  const descobertas = gerarDescobertas(respostas)
  const capDescobertas = capituloDescobertas(descobertas)

  const capPercepcao = capituloPercepcao(respostas, leitura)
  const padraoSintese = leitura.padrao
  const sintese = prioridade
    ? `${padraoSintese} Por isso o mais importante hoje não é uma ação pontual — é enxergar que ${prioridade.rotulo.toLowerCase()}.`
    : padraoSintese

  return {
    titulo: 'O que eu descobri sobre a Ponte até agora',
    frase: descobertas.fraseTransformadora ?? leitura.frase,
    secoes: [
      {
        numero: 1,
        titulo: 'O que eu achei que a Ponte era',
        corpo: capituloHipoteseInicialFounder(respostas),
      },
      {
        numero: 2,
        titulo: 'O que eu fui percebendo durante a conversa',
        corpo: capPercepcao,
      },
      {
        numero: 3,
        titulo: 'As descobertas que eu cheguei',
        corpo: capDescobertas.corpo,
        itens: capDescobertas.itens,
      },
      {
        numero: 4,
        titulo: 'O que hoje me parece importante',
        corpo: sintese,
      },
      {
        numero: 5,
        titulo: 'O ponto que talvez você ainda não esteja olhando',
        corpo: capituloPontoCegoFounder(prioridade),
      },
      {
        numero: 6,
        titulo: 'A decisão que eu não decidiria com pressa',
        corpo: capituloDecisaoFounder(prioridade),
      },
      {
        numero: 7,
        titulo: 'A conversa que a gente deveria ter daqui a alguns dias',
        corpo: capituloPerguntaFounder(respostas, prioridade),
      },
    ],
    proximaReflexao: capituloPerguntaFounder(respostas, prioridade),
    aviso: 'Este não é um veredito — é o começo de uma leitura sobre a Ponte que vamos construir juntos. O que eu acredito hoje muda com cada conversa.',
  }
}

// ─── 3. As descobertas (P77 — Motor das Descobertas) ───────────────────────
// Cada descoberta conecta duas ou mais respostas de momentos diferentes e só
// nasce de evidência. Sem evidência suficiente, a Ponte diz que não tem
// elementos para afirmar — nunca inventa.
function capituloDescobertas(geradas: ReturnType<typeof gerarDescobertas>): { corpo: string; itens?: string[] } {
  if (geradas.insuficiente) {
    return { corpo: geradas.insuficiente }
  }
  const itens = geradas.descobertas.map(
    (d) => `O que observei: ${d.observacao} Por isso eu acredito: ${d.porque} Isso pode significar: ${d.significa}`,
  )
  return {
    corpo: 'Conectei informações de momentos diferentes da conversa — nenhuma dessas leituras viria de uma resposta isolada.',
    itens,
  }
}

export function gerarRetratoEstrategico(
  respostas: Respostas,
  hipoteses: HipoteseEstrategica[],
  _interpretacoes?: Interpretacoes,
): RetratoEstrategico {
  if (ehConversaFounder(respostas)) return gerarRetratoFounder(respostas, hipoteses)

  const prioridade = hipotesePrioritaria(hipoteses)
  const leitura = gerarLeituraCognitiva(respostas, hipoteses)
  const descobertas = gerarDescobertas(respostas)
  const capDescobertas = capituloDescobertas(descobertas)

  return {
    titulo: 'O que eu descobri sobre a sua empresa',
    frase: descobertas.fraseTransformadora ?? leitura.frase,
    secoes: [
      {
        numero: 1,
        titulo: 'O que eu achava que você era',
        corpo: capituloHipoteseInicial(respostas),
      },
      {
        numero: 2,
        titulo: 'O que eu fui percebendo durante nossa conversa',
        corpo: capituloPercepcao(respostas, leitura),
      },
      {
        numero: 3,
        titulo: 'As descobertas que eu cheguei',
        corpo: capDescobertas.corpo,
        itens: capDescobertas.itens,
      },
      {
        numero: 4,
        titulo: 'O que hoje parece me importante',
        corpo: capituloSintese(leitura, prioridade),
      },
      {
        numero: 5,
        titulo: 'O ponto que talvez você ainda não esteja olhando',
        corpo: capituloPontoCego(prioridade),
      },
      {
        numero: 6,
        titulo: 'A decisão que eu não decidiria com pressa',
        corpo: capituloDecisao(prioridade),
      },
      {
        numero: 7,
        titulo: 'A conversa que a gente deveria ter daqui a alguns dias',
        corpo: capituloPergunta(prioridade),
      },
    ],
    proximaReflexao: capituloPergunta(prioridade),
    aviso: 'Este não é um veredito — é uma descoberta que começamos a fazer juntos. O que eu acredito hoje muda com cada conversa. Eu volto para ver o que aconteceu.',
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
  const decisao = retrato.secoes.find((s) => s.titulo.includes('A decisão'))?.corpo ?? retrato.proximaReflexao
  const descoberta = retrato.frase ?? retrato.secoes.find((s) => s.titulo.includes('As descobertas'))?.corpo ?? retrato.titulo
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
