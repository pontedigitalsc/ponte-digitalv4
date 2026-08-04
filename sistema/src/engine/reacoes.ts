import type { BlocoConversa } from './tipos'

// P70 — A Ponte conversa. Cada devolutiva de bloco cita as palavras reais do
// empresário ("Percebi isso porque você comentou que...") — nunca um texto
// que sirva para qualquer empresa. As reações individuais reconhecem a
// resposta sem soar como formulário.

export const reacoesIndividuais: Record<string, string> = {
  'empresa.momento': 'Essa frase diz muito. Vou usá-la como régua para ler tudo o que você me contar daqui pra frente.',
  'empresa.crescer': 'Guardei o que segura a empresa. Vamos olhar isso com calma — sem pressa de resolver.',
  'empresa.decisao': 'Como você decide é o coração da empresa. Vou prestar atenção nesse padrão.',
  'empresa.preocupacao': 'Entendi onde o peso está agora. Vamos olhar isso juntos.',
  'empresa.dependencia': 'Essa resposta é importante. Quando o conhecimento está só na cabeça de uma pessoa, ela precisa ser observada.',
  'empresa.horalivre': 'Essa resposta quase sempre revela o que a pessoa mais deseja. A sua, sim.',
  'empresa.clientes': 'Quando o cliente volta, tem um motivo. Vou tentar enxergá-lo com você.',
  'empresa.multiplicar': 'Saber quem você quer ver voltando é uma escolha. Você tem.',
  'historia.orgulho': 'Sinto o orgulho nessa resposta. É dos seus.',
  'financeiro.previsao': 'Sem previsão, toda decisão vira aposta. Vou levar isso em conta.',
  'financeiro.caixa': 'O que você vê primeiro no caixa revela como a empresa lê o próprio dinheiro.',
  'rotina.energia': 'Onde a energia se vai costuma ser onde a empresa precisa de um descanso.',
  'rotina.cabeca': 'O que ocupa sua cabeça quase nunca é o que parece por fora.',
  'rotina.tranquilo': 'Terminar o dia tranquilo é raro. Quando você me conta, eu noto.',
  'visao.funcionando': 'Essa é a imagem que vale a pena carregar. Vou lembrar dela.',
  'frente.proximo': 'Um horizonte claro orienta decisões pequenas. Vou lembrar do seu.',
  'exploracao.crescer': 'Obrigada por precisar isso. "Crescer" é um horizonte — agora sei melhor para onde ele aponta.',
}

export const SILENCIO_INTELIGENTE = [
  'Vou guardar isso.',
  'Isso me fez pensar. Vou deixar descansar um pouco antes de falar.',
  'Prefiro observar mais um tempo antes de sugerir qualquer coisa.',
  'Percebi. Mas ainda não quero concluir nada com pressa.',
  'Essa informação é importante. Vou prestar atenção em como ela evolui.',
  'Não vou dizer nada agora. Só quero que você saiba que eu ouvi.',
  'Fico com isso em silêncio por um momento.',
  'Escuto. Algumas coisas pedem calma antes de qualquer palavra.',
]

function hashEtapa(etapaId: string): number {
  let hash = 0
  for (let i = 0; i < etapaId.length; i++) {
    hash = (hash << 5) - hash + etapaId.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function obterReacao(etapaId: string): string {
  const individual = reacoesIndividuais[etapaId]
  if (individual) return individual
  return SILENCIO_INTELIGENTE[hashEtapa(etapaId) % SILENCIO_INTELIGENTE.length]
}

// ─── P65 — MICRO DEVOLUTIVAS DURANTE A CONVERSA ──────────────────────────────
// Pequenos momentos no meio da conversa, sempre como hipótese ("Posso
// compartilhar algo que estou percebendo?", "Posso estar enganada, mas...",
// "Isso normalmente acontece quando..."). A Ponte nunca afirma sem evidência:
// cada percepção cita o que o empresário realmente disse. Determinístico, sem IA.

type Respostas = Record<string, string | null>

function r(respostas: Respostas, id: string): string | null {
  return respostas[id]?.trim() || null
}

function normalizar(v: string): string {
  return v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function contemAlguma(respostas: Respostas, id: string, palavras: string[]): boolean {
  const v = r(respostas, id)
  if (!v) return false
  const texto = normalizar(v)
  return palavras.some((p) => texto.includes(normalizar(p)))
}

interface RegraPercepcao {
  perguntaId: string
  condicao: (respostas: Respostas) => boolean
  mensagem: (respostas: Respostas) => string
}

const REGRAS_PERCEPCAO: RegraPercepcao[] = [
  {
    perguntaId: 'empresa.crescer',
    condicao: (respostas) => contemAlguma(respostas, 'empresa.crescer', ['cliente', 'venda', 'vender', 'faturamento', 'mercado', 'vender mais']),
    mensagem: (respostas) =>
      `Posso compartilhar algo que estou percebendo? Você me contou que o que segura a empresa é "${r(respostas, 'empresa.crescer')}". Isso normalmente acontece não por falta de clientes, mas pela complexidade de organizar o que já existe. Posso estar enganada — mas é essa a leitura que quero observar com você.`,
  },
  {
    perguntaId: 'empresa.dependencia',
    condicao: (respostas) => contemAlguma(respostas, 'empresa.dependencia', ['para', 'trava', 'ninguém', 'ninguem', 'nada', 'fecha', 'quebra']),
    mensagem: (respostas) =>
      `Existe um padrão que estou percebendo: você me disse que, se ficasse 30 dias fora, "${r(respostas, 'empresa.dependencia')}". Quando o conhecimento está só na cabeça do fundador, a empresa cresce até o tamanho dele. Posso estar enganada, mas é isso que vamos observar.`,
  },
  {
    perguntaId: 'rotina.cabeca',
    condicao: (respostas) => !!r(respostas, 'rotina.energia') && !!r(respostas, 'rotina.cabeca'),
    mensagem: (respostas) =>
      `Isso normalmente acontece quando o que consome sua energia é também o que mais ocupa sua cabeça. Você me contou que sua energia vai para "${r(respostas, 'rotina.energia')}" e que sua cabeça está em "${r(respostas, 'rotina.cabeca')}". Não por acaso.`,
  },
  {
    perguntaId: 'financeiro.caixa',
    condicao: (respostas) => contemAlguma(respostas, 'financeiro.caixa', ['falta', 'faltar', 'buraco', 'apertado', 'vai faltar']),
    mensagem: (respostas) =>
      `Posso estar enganada, mas quando você olha o caixa e vê primeiro "${r(respostas, 'financeiro.caixa')}", as decisões financeiras tendem a virar aposta. Quero prestar atenção em como isso se repete.`,
  },
  {
    perguntaId: 'empresa.clientes',
    condicao: (respostas) => !!r(respostas, 'empresa.clientes'),
    mensagem: (respostas) =>
      `Percebi algo: você sabe exatamente o que faz clientes voltarem — "${r(respostas, 'empresa.clientes')}". Esse conhecimento é vivido, não registrado. A diferença entre crescer e girar no lugar está em transformá-lo em previsibilidade.`,
  },
]

// Retorna uma percepção durante a conversa (como hipótese) ou null se nenhuma
// regra se aplica à resposta recém-dada. Não substitui a devolutiva de bloco.
export function percepcaoDurante(perguntaId: string, respostas: Respostas): string | null {
  for (const regra of REGRAS_PERCEPCAO) {
    if (regra.perguntaId !== perguntaId) continue
    if (regra.condicao(respostas)) return regra.mensagem(respostas)
  }
  return null
}

// ─── Devolutivas de fim de bloco — a Ponte conversa citando evidência ────────
// Chamadas quando o empresário responde a última pergunta de um bloco.
// Cada devolutiva referencia as palavras reais gravadas em `respostas`.

export function devolutivaDeBloco(bloco: BlocoConversa, respostas: Respostas): string {
  switch (bloco) {
    case 'momento': {
      const momento = r(respostas, 'empresa.momento')
      const crescer = r(respostas, 'empresa.crescer')
      const partes: string[] = []
      if (momento) partes.push(`você lê o momento da empresa como "${momento}"`)
      if (crescer) partes.push(`e me contou que o que segura o crescimento é "${crescer}"`)
      const base = partes.length > 0
        ? `Percebi que ${partes.join(', ')}.`
        : 'Percebi como você lê o momento da empresa.'
      return `${base} Empresas geralmente travam pela complexidade, não pela falta de clientes. Essa leitura vai guiar o que vamos conversar daqui pra frente.`
    }
    case 'decisao': {
      const decisao = r(respostas, 'empresa.decisao')
      if (decisao) {
        return `Você me contou que descobre se pode investir assim: "${decisao}". Percebi um padrão — decisões que dependem só do momento costumam se repetir do mesmo jeito. Vou prestar atenção nisso.`
      }
      return 'Como você decide é o coração da empresa. Vou prestar atenção nesse padrão.'
    }
    case 'dependencia': {
      const dependencia = r(respostas, 'empresa.dependencia')
      if (dependencia) {
        return `Você me disse que, se ficasse 30 dias fora, "${dependencia}". Quando o conhecimento está só na cabeça do fundador, a empresa cresce até o tamanho dele — é isso que vamos observar.`
      }
      return 'Quando o conhecimento está só na cabeça do fundador, a empresa cresce até o tamanho dele.'
    }
    case 'clientes': {
      const clientes = r(respostas, 'empresa.clientes')
      if (clientes) {
        return `Guardei o que faz clientes voltarem: "${clientes}". Você conhece isso de perto — a diferença entre crescer e girar no lugar está em transformar esse conhecimento em previsibilidade.`
      }
      return 'Você conhece seus clientes de perto. A diferença entre crescer e girar no lugar está em transformar isso em previsibilidade.'
    }
    case 'dinheiro': {
      const previsao = r(respostas, 'financeiro.previsao')
      const caixa = r(respostas, 'financeiro.caixa')
      const partes: string[] = []
      if (previsao) partes.push(`sobre o próximo mês, você me disse "${previsao}"`)
      if (caixa) partes.push(`e que, ao olhar o caixa, vê primeiro "${caixa}"`)
      const base = partes.length > 0
        ? `Percebi que ${partes.join('; e ')}.`
        : 'Percebi como a empresa lê o próprio dinheiro.'
      return `${base} Sem previsão, toda decisão vira aposta. Essa é a parte que mais vale observar com calma.`
    }
    case 'energia': {
      const energia = r(respostas, 'rotina.energia')
      const cabeca = r(respostas, 'rotina.cabeca')
      if (energia) {
        const base = `O que mais consumiu sua energia foi "${energia}".`
        if (cabeca) {
          return `${base} E o que mais ocupa sua cabeça é "${cabeca}" — reparei que o que toma sua energia também é o que mais ocupa sua cabeça. Não por acaso.`
        }
        return `${base} Reparei que o que toma sua energia quase sempre é também o que mais ocupa sua cabeça. Não por acaso.`
      }
      return 'O que consome sua energia quase sempre é também o que ocupa sua cabeça. Não por acaso.'
    }
    case 'visao': {
      const visao = r(respostas, 'visao.funcionando')
      if (visao) {
        return `Você me contou que, se sua empresa funcionasse como você gostaria, "${visao}". Essa imagem é a direção — agora quero organizar tudo o que entendi sobre o caminho até lá.`
      }
      return 'Essa imagem da empresa funcionando como você gostaria é a direção. Agora quero organizar tudo o que entendi.'
    }
    default:
      return obterReacao('')
  }
}
