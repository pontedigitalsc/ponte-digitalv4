// P77 — MOTOR DAS DESCOBERTAS ("A Ponte precisa merecer a conversa")
//
// Missão: não adicionar funcionalidades, não mudar telas, não aumentar
// perguntas. Apenas aumentar a QUALIDADE DA INTERPRETAÇÃO. A Ponte nunca
// deve responder apenas resumindo — ela precisa PRODUZIR CONHECIMENTO.
//
// Para garantir isso, este motor gera, antes do Retrato, no máximo 3
// descobertas. Cada uma precisa CONECTAR PELO MENOS DUAS partes diferentes da
// conversa (nunca uma única resposta). Quanto mais distante a conexão, maior o
// impacto. Formato obrigatório de cada descoberta:
//   1. O que observamos   → evidência factual das respostas reais
//   2. Por que acreditamos → o raciocínio que conecta as partes
//   3. O que isso pode    → a hipótese (humildade, nunca prever traçar)
//
// REGRA ABSOLUTA (evidência): tudo nasce exclusivamente das respostas. Se não
// houver evidência suficiente, a Ponte diz: "Ainda não tenho elementos
// suficientes para afirmar isso." Nunca preencher lacunas com criatividade.
//
// Determinístico. Sem IA. Mesmo estilo das engines P70/P72.

export interface Descoberta {
  id: string
  // 1. O que observamos — fatos das respostas (evidência)
  observacao: string
  // 2. Por que acreditamos — a conexão que sustenta a leitura
  porque: string
  // 3. O que isso pode significar — a hipótese (com humildade)
  significa: string
}

export interface DescobertasGeradas {
  descobertas: Descoberta[]
  // P77 — a frase final transformadora (uma única frase que o empresário
  // lembra dias depois). Prefere a descoberta mais forte; senão, null.
  fraseTransformadora: string | null
  // Prova de evidência: se não houver suporte, `insuficiente` é preenchido.
  insuficiente: string | null
}

type Respostas = Record<string, string | null>

function r(respostas: Respostas, id: string): string | null {
  return respostas[id]?.trim() || null
}

function tem(respostas: Respostas, id: string, palavras: string[]): boolean {
  const v = r(respostas, id)?.toLowerCase() ?? ''
  return palavras.some((p) => v.includes(p.toLowerCase()))
}

// Traduz o `valor` (chave curta da opção) para a fala natural, para a Ponte
// citar as palavras do empresário na devolutiva.
const ROTULO: Record<string, Record<string, string>> = {
  'frente.proximo': {
    crescer: 'crescer o faturamento',
    organizar: 'organizar a operação',
    lucro: 'aumentar o lucro mesmo sem vender mais',
    equipe: 'formar a equipe',
    fidelizar: 'fidelizar os melhores clientes',
  },
  'empresa.dependencia': {
    pararia: 'que a empresa pararia de funcionar se você se afastasse',
    estancaria: 'que ela estancaria até você voltar',
    sofreria: 'que ela sofreria muito, mas não pararia',
    quase_sozinha: 'que ela andaria quase sozinha, com alguns buracos',
  },
  'empresa.momento': {
    depende_de_mim: 'que a empresa depende muito de você para funcionar',
    muito_trabalho: 'que está dando mais trabalho do que retorno',
    crescendo_rapido: 'que está crescendo mais rápido do que consegue organizar',
    estavel_sem_avancar: 'que está estável, mas não avança',
  },
  'rotina.energia': {
    operacao: 'apagar incêndios do dia a dia você mesmo',
    decisoes: 'decisões grandes sem clareza',
    financeiro: 'a preocupação com o dinheiro',
  },
  'empresa.crescer': {
    tempo: 'falta de tempo — ter virado o gargalo',
    organizacao: 'falta de organização e processo',
    capital: 'falta de dinheiro ou capital de giro',
    clientes: 'falta de clientes',
    equipe: 'falta de gente certa na equipe',
  },
  'rotina.cabeca': {
    operacional: 'os problemas operacionais de hoje',
    crescimento: 'como crescer sem bagunçar o que funciona',
    mes: 'se vamos conseguir cumprir o mês',
    equipe: 'quem vai tocar cada área',
    futuro: 'onde a empresa estará em alguns meses',
  },
  'financeiro.previsao': {
    nao: 'não saber ao certo o que vem no próximo mês',
    parcial: 'saber apenas no chute',
    sim: 'saber com números',
  },
  'financeiro.caixa': {
    faltara: 'o que pode faltar no caixa',
    pouco: 'olhar pouco o caixa',
    entrou: 'o que já entrou',
    entrara: 'o que vai entrar',
  },
  'rotina.tranquilo': {
    nao_lembro: 'não lembrar da última vez que terminou tranquilo',
    nunca: 'não lembrar de um dia tranquilo',
    meses: 'terminar tranquilo pela última vez há meses',
  },
  'empresa.decisao': {
    instinto: 'decidir pelo instincto',
    momento: 'decidir na hora, quando a oportunidade aparece',
    sem_criterio: 'não ter um critério claro',
    caixa: 'só investir se o dinheiro em caixa deixar',
  },
  'visao.funcionando': {
    sem_mim: 'que a empresa rodaria bem mesmo sem você estivesse',
    equipe: 'que a equipe decidiria sem te consultar',
    foco: 'trabalhar menos e com mais foco',
    crescimento: 'crescer sem bagunçar o que funciona',
    previsivel: 'ter um resultado previsível todo mês',
  },
}

function citar(respostas: Respostas, id: string): string | null {
  const v = r(respostas, id)
  if (!v) return null
  return ROTULO[id]?.[v] ?? v
}

// ─── Descoberta A — crescer sem estruturar → crescimento linear x estrutural ─
function descobertaCrescimento(par: Respostas): Descoberta | null {
  const querCrescer = tem(par, 'frente.proximo', ['crescer', 'equipe', 'lucro'])
  const central = tem(par, 'empresa.dependencia', ['pararia', 'estancaria', 'sofreria', 'quase_sozinha']) ||
    tem(par, 'empresa.momento', ['depende_de_mim', 'muito_trabalho', 'crescendo_rapido']) ||
    tem(par, 'rotina.energia', ['operacao'])
  if (!querCrescer || !central) return null

  const obj = citar(par, 'frente.proximo')
  const dep = citar(par, 'empresa.dependencia') ?? citar(par, 'empresa.momento')
  const energia = citar(par, 'rotina.energia')
  const observacao = (() => {
    const partes = [`Você definiu como objetivo ${obj ?? 'crescer'}`]
    if (dep) partes.push(`mas, em outro momento, me contou ${dep}`)
    if (energia) partes.push(`e nas rotinas a energia vai para ${energia}`)
    partes.push('• respsas de momentos diferentes, apontam no mesmo lugar.')
    return partes.join(' ')
  })()
  return {
    id: 'crescimento_linear',
    observacao,
    porque: `Porque acreditamos nisso: crescimento aparece associado ao esforço de uma pessoa só. Mais você, mais empresa — nunca menos você, mais empresa.`,
    significa: `Pode significar que a empresa está crescendo de forma linear, e não estrutural — e que o próximo obstáculo não é vender mais, é desmontar uma operação que só anda com você no centro.`,
  }
}

// ─── Descoberta B — "falta de tempo" é sintoma, não causa ───────────────────
function fTempo(par: Respostas): Descoberta | null {
  const faltaTempo = tem(par, 'empresa.crescer', ['tempo'])
  if (!faltaTempo) return null
  const operacional = tem(par, 'rotina.cabeca', ['operacional'])
  const longeDescanso = tem(par, 'rotina.tranquilo', ['nao_lembro', 'nunca', 'meses'])
  const decisaoIntuitiva = tem(par, 'empresa.decisao', ['instinto', 'momento', 'sem_criterio'])
  if (!operacional && !longeDescanso && !decisaoIntuitiva) return null

  const cabeca = citar(par, 'rotina.cabeca')
  const tranquilo = citar(par, 'rotina.tranquilo')
  const decisao = citar(par, 'empresa.decisao')
  const partes = ['Você apontou falta de tempo como trava e, em outro momento, me disse que o que ocupa sua cabeça é']
  if (cabeca) partes.push(`"${cabeca}"`)
  if (tranquilo) partes.push(`; também ${tranquilo}`)
  if (decisao) partes.push(`; e que decide ${decisao}`)
  partes.push('. ')
  return {
    id: 'tempo_sem_espaco',
    observacao: partes.join(' '),
    porque: `Porque acreditamos nisso: o que você chama de falta de tempo coincide com o que mais ocupa sua cabeça e com decisões tomadas sem critério. O tempo não sai porque não há espaço.`,
    significa: `Pode significar que liberar sua agenda não vem de trabalhar mais, e sim de fechir decisões do seu centro — decidir com critério e registrar o que está na cabeça.`,
  }
}

// ─── Descoberta C — o peso do dinheiro é a leitura, não a falta de dinheiro ──
function fFinanceiro(s: Respostas): Descoberta | null {
  const semPrevisao = tem(s, 'financeiro.previsao', ['nao', 'parcial'])
  const caixaPresa = tem(s, 'financeiro.caixa', ['faltara', 'pouco'])
  if (!semPrevisao && !caixaPresa) return null

  const previsao = citar(s, 'financeiro.previsao')
  const caixa = citar(s, 'financeiro.caixa')
  const decisao = citar(s, 'empresa.decisao')
  const partes = ['Na conversa você me contou que']
  if (previsao) partes.push(previsao)
  if (caixa) partes.push(` e que, ao olhar o caixa, vê primeiro ${caixa || 'o que pode faltar'}`)
  if (decisao) partes.push(`; e que costuma ${decisao}`)
  partes.push('. Isso conecta o dinheiro à forma de decidir, não o quanto você fatura.')
  return {
    id: 'dinheiro_e_leitura',
    observacao: partes.join(' '),
    porque: `Porque acreditamos nisso: quando a previsão é no chute e o caixa é lido pelo medo do que falta, o dinheiro deixa de ser número e vira ansiedade — e esse ruído sustenta o atravessamento da leitura.`,
    significa: `Pode significar que o problema do financeiro não é o que falta entrar, e sim o que falta ver — um mínimo de previsão muda a prioridade antes mesmo de qualquer corte de custo.`,
  }
}

export function gerarDescobertas(par: Respostas): DescobertasGeradas {
  const candidatos = [descobertaCrescimento(par), fTempo(par), fFinanceiro(par)].filter((d): d is Descoberta => d !== null)

  // no máximo 3 (já são 3) — mantemos as que nasceram de evidência real.
  if (candidatos.length === 0) {
    return {
      descobertas: [],
      fraseTransformadora: null,
      insuficiente: 'Ainda não tenho elementos suficientes para afirmar isso.',
    }
  }

  // A frase final transformadora (uma única linha), preferida da descoberta
  // mais forte (primeira com evidência sólida).
  let fraseTransformadora: string | null = null
  const d = candidatos[0]
  if (d.id === 'crescimento_linear') {
    fraseTransformadora = 'Talvez sua empresa não precise de mais esforço. Talvez precise que você deixe de ser o centro dela.'
  } else if (d.id === 'tempo_sem_espaco') {
    fraseTransformadora = 'Você não está sem tempo — está sem espaço para decidir.'
  } else if (d.id === 'dinheiro_e_leitura') {
    fraseTransformadora = 'Talvez o problema não seja o que falta de dinheiro. Seja o que falta de se ler.'
  }

  return { descobertas: candidatos.slice(0, 3), fraseTransformadora, insuficiente: null }
}

// P78 — DESCOBERTAS QUE CONTINUAM VIVAS.
// As descobertas P77 eram geradas e descartadas ao fim da sessão. P78 as grava
// na memória cognitiva (`MemoriaCognitiva`, append-only) como `descoberta`, para
// que a próxima sessão possa retomá-las, comparar evidências e observar evolução
// — sem criar banco novo: reutiliza a infraestrutura da Memória Viva.
export async function persistirDescobertas(
  empresaId: string,
  respostas: Respostas,
  versao: number,
): Promise<void> {
  const { descobertas, insuficiente } = gerarDescobertas(respostas)
  if (insuficiente || descobertas.length === 0) return
  const { registrarNaMemoria } = await import('@/engine/cognitive-memory-engine')
  for (const d of descobertas) {
    await registrarNaMemoria(empresaId, {
      tipo: 'descoberta',
      descricao: `${d.observacao} ${d.porque} ${d.significa}`,
      categoria: 'ESTRATEGIA',
      versao,
      metadados: {
        origem: 'MOTOR_DAS_DESCOBERTAS_P77',
        idDescoberta: d.id,
        observacao: d.observacao,
        porque: d.porque,
        significa: d.significa,
      },
    }).catch(() => undefined)
  }
}