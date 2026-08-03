import { prismaSeguro } from '@/lib/prisma-tenant-safe'
import type { Interpretacoes } from '@/engine/tipos'
import type { Prisma } from '@prisma/client'

// ─────────────────────────────────────────────────────────────────────────────
// RETRATO ESTRATÉGICO DA EMPRESA — P57A
//
// A entrega da primeira conversa não é "mostrar dados". É mostrar interpretação.
// Este documento vivo tem cinco partes e sempre termina com uma pergunta aberta
// (continuidade, nunca coleta). Nenhuma IA é usada: é regra + template sobre as
// respostas reais da conversa, fiel ao princípio "IA é interface, não cérebro".
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

// ─── 1. O que entendemos sobre sua empresa ────────────────────────────────────
function gerarEntendimento(respostas: Respostas, interpretacoes: Interpretacoes): string {
  const oque = r(respostas, 'empresa.oque')
  const momento = r(respostas, 'empresa.momento')
  const nascer = r(respostas, 'historia.nascer')
  const energia = r(respostas, 'rotina.energia')
  const cabeca = r(respostas, 'rotina.cabeca')
  const clientes = r(respostas, 'empresa.clientes')

  const forca = clientes ?? r(respostas, 'historia.orgulho') ?? r(respostas, 'frente.funcionou')

  let base = interpretacoes.observacao
  if (forca) {
    base = `Sua empresa demonstra força ${forca.toLowerCase().startsWith('a') ? 'na forma como' : 'em'} ${forca.toLowerCase()}.`
    if (energia || cabeca) {
      base += ` Ao mesmo tempo, o que mais ocupa sua atenção hoje é "${energia ?? cabeca}". Muita coisa ainda depende de uma só pessoa — e transformar conhecimento em crescimento passa por isso.`
    }
  } else if (momento) {
    base = `Você descreve o momento da sua empresa como "${momento}". A forma como você lê esse momento costuma guiar as decisões que vêm pela frente.`
  }
  if (nascer && !base.includes(nascer)) {
    base += ` Essa empresa nasceu de "${nascer}", e essa origem ainda influencia a forma como ela é conduzida.`
  }
  if (oque) {
    base += ` Em resumo: "${oque}".`
  }
  return base
}

// ─── 2. Forças identificadas ─────────────────────────────────────────────────
function gerarForcas(respostas: Respostas): string[] {
  const itens: string[] = []
  const orgulho = r(respostas, 'historia.orgulho')
  const funcionou = r(respostas, 'frente.funcionou')
  const clientes = r(respostas, 'empresa.clientes')
  const diferencas = r(respostas, 'frente.diferente')
  const surpresa = r(respostas, 'frente.surpresa')

  if (orgulho) itens.push(`Conhecimento e história: "${orgulho}"`)
  if (clientes) itens.push(`Relacionamento com clientes: você percebe que "${clientes}"`)
  if (funcionou) itens.push(`Capacidade de execução: "${funcionou}" funcionou melhor do que você esperava`)
  if (diferencas) itens.push(`O que diferencia você: "${diferencas}"`)
  if (surpresa) itens.push(`Capacidade de adaptação: "${surpresa}"`)
  if (itens.length === 0) itens.push('Você dedicou tempo para olhar para a própria empresa — isso já é um patrimônio.')
  return itens.slice(0, 4)
}

// ─── 3. O que merece atenção (ponto de evolução, nunca "problema") ───────────
function gerarPontosDeEvolucao(respostas: Respostas): string[] {
  const itens: string[] = []
  const preocupacao = r(respostas, 'empresa.preocupacao')
  const crescer = r(respostas, 'empresa.crescer')
  const pressao = r(respostas, 'rotina.pressao')
  const multiplicar = r(respostas, 'empresa.multiplicar')

  if (preocupacao) itens.push(`Sua maior preocupação hoje é "${preocupacao}". Ela tem raiz — encontrá-la é o primeiro passo.`)
  if (crescer) itens.push(`O que hoje trava o crescimento é "${crescer}". É um ponto de evolução, não um defeito: a empresa está pedindo estrutura nova.`)
  if (pressao) itens.push(`O momento de maior pressão é "${pressao}". Se ele se repete, há um padrão valendo a pena observar.`)
  if (multiplicar) itens.push(`Sobre crescer sem depender só de você, você disse: "${multiplicar}". Distribuir conhecimento é o caminho natural.`)
  if (itens.length === 0) itens.push('Muitas decisões ainda passam diretamente por você. Conforme a empresa cresce, distribuir esse conhecimento aumenta a capacidade de evolução.')
  return itens.slice(0, 3)
}

// ─── 4. A decisão mais importante agora ───────────────────────────────────────
function gerarDecisao(respostas: Respostas): string {
  const crescer = r(respostas, 'empresa.crescer')
  const proximo = r(respostas, 'frente.proximo')
  const clientes = r(respostas, 'empresa.clientes')
  const multiplicar = r(respostas, 'empresa.multiplicar')

  if (clientes && crescer) {
    return `O próximo movimento mais importante parece ser criar maior previsibilidade sobre "${clientes}" antes de buscar crescimento acelerado. Quando a recorrência é previsível, "${crescer}" deixa de ser um risco e vira uma escolha.`
  }
  if (multiplicar) {
    return `O próximo movimento mais importante parece ser distribuir o que só você sabe fazer — sobre crescer sem depender de você, você disse "${multiplicar}". Começar por um único processo transferível é o passo mais seguro.`
  }
  if (proximo) {
    return `O próximo movimento mais importante parece ser avançar em direção a "${proximo}" — mas em um único passo pequeno e observável primeiro.`
  }
  if (crescer) {
    return `O próximo movimento mais importante parece ser tratar "${crescer}" como algo a observar durante uma semana — registrar quando aparece e o que vem antes. Depois, decidir com base nessa observação.`
  }
  return 'O próximo movimento mais importante parece ser escolher uma única coisa para observar com atenção nesta semana — só o registro já mostra padrões que passavam despercebidos.'
}

// ─── 5. Primeiro movimento recomendado ───────────────────────────────────────
function gerarPrimeiroMovimento(respostas: Respostas): string {
  const proximo = r(respostas, 'frente.proximo')
  const crescer = r(respostas, 'empresa.crescer')
  const multiplicar = r(respostas, 'empresa.multiplicar')

  if (proximo) {
    return `O primeiro movimento recomendado é dar um passo pequeno e observável em direção a "${proximo}" ainda esta semana — e registrar o que acontece.`
  }
  if (multiplicar) {
    return `O primeiro movimento recomendado é escolher um único processo que só você sabe fazer e descrevê-lo por escrito, para poder dividi-lo depois.`
  }
  if (crescer) {
    return `O primeiro movimento recomendado é observar "${crescer}" durante uma semana — registrar quando aparece e o que vem antes. Só o registro já revela o que trava.`
  }
  return 'O primeiro movimento recomendado é escolher uma única coisa para observar com atenção nesta semana — e voltar na próxima conversa com o que percebeu.'
}

// ─── Próxima reflexão (pergunta aberta, para continuidade) ───────────────────
function gerarProximaReflexao(respostas: Respostas): string {
  const horaLivre = r(respostas, 'empresa.horalivre')
  if (horaLivre) {
    return `Se você tivesse 20% mais tempo livre na sua semana — e você me disse que usaria para "${horaLivre}" — qual parte da empresa você gostaria de desenvolver primeiro?`
  }
  return 'Se você tivesse 20% mais tempo livre na sua semana, qual parte da empresa você gostaria de desenvolver?'
}

export function gerarRetratoEstrategico(respostas: Respostas, interpretacoes: Interpretacoes): RetratoEstrategico {
  return {
    titulo: 'Retrato Estratégico da Empresa',
    secoes: [
      {
        numero: 1,
        titulo: 'Onde sua empresa está hoje',
        corpo: gerarEntendimento(respostas, interpretacoes),
      },
      {
        numero: 2,
        titulo: 'O que sua empresa já construiu',
        corpo: 'Patrimônios que já existem e sustentam qualquer próximo movimento:',
        itens: gerarForcas(respostas),
      },
      {
        numero: 3,
        titulo: 'Onde existe risco de continuar igual',
        corpo: 'Pontos cegos — não defeitos. Continuar exatamente como está hoje tem um custo silencioso:',
        itens: gerarPontosDeEvolucao(respostas),
      },
      {
        numero: 4,
        titulo: 'Qual decisão merece atenção agora',
        corpo: gerarDecisao(respostas),
      },
      {
        numero: 5,
        titulo: 'Primeiro movimento recomendado',
        corpo: gerarPrimeiroMovimento(respostas),
      },
    ],
    proximaReflexao: gerarProximaReflexao(respostas),
    aviso: 'Esta é uma fotografia inicial. A Ponte fica mais inteligente conforme acompanha sua empresa — cada conversa revela algo novo.',
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
  const decisao = retrato.secoes.find((s) => s.numero === 4)?.corpo ?? retrato.proximaReflexao
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
