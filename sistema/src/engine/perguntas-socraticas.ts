// ─────────────────────────────────────────────────────────────────────────────
// BIBLIOTECA SÓCRATICA — P66 O Conselheiro Empresarial
//
// Patrimônio intelectual da Ponte: perguntas que constroem decisão.
// A Ponte não responde imediatamente — quando o empresário traz uma decisão
// importante, ela primeiro percebe, depois pergunta. Perguntas socráticas são
// o núcleo desse comportamento. Cada uma nasce da experiência de quem observa
// empresários de perto: não pergunta o que o sistema já sabe, pergunta o que
// muda a qualidade da decisão.
//
// As perguntas são entregues à IA como material (nunca como roteiro rígido):
// a IA adapta às palavras reais do empresário. Mas a curadoria é humana e
// determinística — a IA nunca inventa uma pergunta socrática nova por conta.
// ─────────────────────────────────────────────────────────────────────────────

export type CategoriaDecisao =
  | 'CONTRATACAO'
  | 'DEMISSAO'
  | 'PRECOS'
  | 'EQUIPAMENTO'
  | 'EMPRESTIMO'
  | 'EXPANSAO'

export interface PerguntaSocratica {
  id: string
  categoria: CategoriaDecisao
  pergunta: string
  /** Condição de aplicação (critério determinístico para priorizar). */
  quando: string
}

export const LABEL_CATEGORIA: Record<CategoriaDecisao, string> = {
  CONTRATACAO: 'contratar alguém',
  DEMISSAO: 'dispensar alguém',
  PRECOS: 'mexer nos preços',
  EQUIPAMENTO: 'investir em equipamento',
  EMPRESTIMO: 'pegar empréstimo',
  EXPANSAO: 'expandir o negócio',
}

export const BIBLIOTECA_SOCRATICA: PerguntaSocratica[] = [
  // ─── CONTRATAÇÃO ──────────────────────────────────────────────────────────
  {
    id: 'contratacao.hoje-ou-futuro',
    categoria: 'CONTRATACAO',
    pergunta: 'Essa contratação resolve um problema que existe hoje — ou um que você acredita que vai existir quando a empresa crescer?',
    quando: 'sempre',
  },
  {
    id: 'contratacao.tempo-liberado',
    categoria: 'CONTRATACAO',
    pergunta: 'Quanto do seu tempo essa pessoa vai liberar? E o que você pretende fazer com esse tempo liberado?',
    quando: 'empresário cita sobrecarga ou trabalho excessivo',
  },
  {
    id: 'contratacao.custo-real',
    categoria: 'CONTRATACAO',
    pergunta: 'Qual o custo real dessa contratação — salário, encargos, treinamento — frente ao que ela gera de caixa?',
    quando: 'caixa apertado ou decisão financeira frágil',
  },
  {
    id: 'contratacao.se-nao-contratar',
    categoria: 'CONTRATACAO',
    pergunta: 'O que acontece com a empresa nos próximos seis meses se você NÃO contratar?',
    quando: 'empresário hesitante ou decisão adiada',
  },
  {
    id: 'contratacao.dono-do-processo',
    categoria: 'CONTRATACAO',
    pergunta: 'Quem cuida do recrutamento e do treinamento? Isso tem dono claro?',
    quando: 'empresa pequena e dependente do dono',
  },

  // ─── DEMISSÃO ─────────────────────────────────────────────────────────────
  {
    id: 'demissao.o-que-mudou',
    categoria: 'DEMISSAO',
    pergunta: 'O que mudou para essa pessoa passar de necessária a dispensável?',
    quando: 'sempre',
  },
  {
    id: 'demissao.pessoa-ou-lugar',
    categoria: 'DEMISSAO',
    pergunta: 'O problema é da pessoa — ou do lugar que ela ocupa na empresa?',
    quando: 'insatisfação com desempenho sem causa clara',
  },
  {
    id: 'demissao.quem-absorve',
    categoria: 'DEMISSAO',
    pergunta: 'Quem vai absorver o trabalho dela se você demitir?',
    quando: 'empresa dependente do dono ou equipe mínima',
  },
  {
    id: 'demissao.padrao-ou-momento',
    categoria: 'DEMISSAO',
    pergunta: 'Essa decisão vem de um padrão de gestão — ou de uma frustração do momento?',
    quando: 'decisão emocional (cansaço, irritação, desgaste)',
  },
  {
    id: 'demissao.motivo-escrito',
    categoria: 'DEMISSAO',
    pergunta: 'Se você tivesse que escrever o motivo dessa demissão para a própria empresa, qual seria?',
    quando: 'razão pouco clara',
  },

  // ─── PREÇOS ───────────────────────────────────────────────────────────────
  {
    id: 'precos.origem-do-preco',
    categoria: 'PRECOS',
    pergunta: 'O preço atual foi decidido por você — ou herdado da concorrência?',
    quando: 'sempre',
  },
  {
    id: 'precos.custo-real',
    categoria: 'PRECOS',
    pergunta: 'Quanto desse preço cobre o seu custo real? E quanto é lucro?',
    quando: 'sem cálculo claro de margem',
  },
  {
    id: 'precos.melhor-cliente',
    categoria: 'PRECOS',
    pergunta: 'Se o seu melhor cliente questionasse o novo preço, o que você responderia?',
    quando: 'receio de perder clientes',
  },
  {
    id: 'precos.queda-de-volume',
    categoria: 'PRECOS',
    pergunta: 'O que acontece com o volume se você subir 10%? Você aguenta uma queda?',
    quando: 'receio de perder clientes',
  },
  {
    id: 'precos.menor-aumento',
    categoria: 'PRECOS',
    pergunta: 'Qual o menor aumento que faz diferença real no caixa — e o que ele cobre?',
    quando: 'insegurança para reajustar',
  },

  // ─── EQUIPAMENTO ──────────────────────────────────────────────────────────
  {
    id: 'equipamento.impacto-numerico',
    categoria: 'EQUIPAMENTO',
    pergunta: 'Esse equipamento vai reduzir custo, aumentar produção ou os dois? Em quanto, numericamente?',
    quando: 'sempre',
  },
  {
    id: 'equipamento.payback',
    categoria: 'EQUIPAMENTO',
    pergunta: 'Quanto tempo até ele se pagar — e o que acontece se o prazo estourar?',
    quando: 'decisão sem prazo claro de retorno',
  },
  {
    id: 'equipamento.troca-de-prioridade',
    categoria: 'EQUIPAMENTO',
    pergunta: 'O que você deixa de comprar ou investir para comprar isso?',
    quando: 'caixa apertado',
  },
  {
    id: 'equipamento.operacao',
    categoria: 'EQUIPAMENTO',
    pergunta: 'O equipamento vai exigir manutenção, treinamento ou matéria-prima nova? Quem cuida disso?',
    quando: 'empresa pequena',
  },
  {
    id: 'equipamento.demanda',
    categoria: 'EQUIPAMENTO',
    pergunta: 'Se a demanda não crescer, o equipamento ainda se justifica?',
    quando: 'compra por impulso ou oportunidade',
  },

  // ─── EMPRÉSTIMO ───────────────────────────────────────────────────────────
  {
    id: 'emprestimo.para-que',
    categoria: 'EMPRESTIMO',
    pergunta: 'Para que exatamente esse dinheiro vai servir? O que ele destrava de concreto?',
    quando: 'sempre',
  },
  {
    id: 'emprestimo.custo-total',
    categoria: 'EMPRESTIMO',
    pergunta: 'Qual o custo total — juros e taxas — e em quanto tempo esse dinheiro se paga?',
    quando: 'decisão por necessidade sem cálculo',
  },
  {
    id: 'emprestimo.mes-ruim',
    categoria: 'EMPRESTIMO',
    pergunta: 'O que muda no caixa se o parcelamento apertar em um mês ruim?',
    quando: 'caixa já apertado',
  },
  {
    id: 'emprestimo.causa',
    categoria: 'EMPRESTIMO',
    pergunta: 'Você já tentou resolver a causa que está criando a necessidade do empréstimo?',
    quando: 'empréstimo recorrente',
  },
  {
    id: 'emprestimo.plano-b',
    categoria: 'EMPRESTIMO',
    pergunta: 'Se você não pegasse esse empréstimo, qual seria o plano B?',
    quando: 'decisão sem alternativa',
  },

  // ─── EXPANSÃO ─────────────────────────────────────────────────────────────
  {
    id: 'expansao.evidencias',
    categoria: 'EXPANSAO',
    pergunta: 'O que você tem hoje — clientes, operação, equipe — que prova que a expansão vai se sustentar?',
    quando: 'sempre',
  },
  {
    id: 'expansao.quem-opera',
    categoria: 'EXPANSAO',
    pergunta: 'Quem vai operar a nova frente? Se for você, o que deixa de ser cuidado na atual?',
    quando: 'empresa dependente do dono',
  },
  {
    id: 'expansao.custo-fixo',
    categoria: 'EXPANSAO',
    pergunta: 'Qual o custo fixo novo por mês e qual a receita necessária para cobri-lo?',
    quando: 'sem plano financeiro',
  },
  {
    id: 'expansao.ganhar-ou-trabalhar',
    categoria: 'EXPANSAO',
    pergunta: 'Expansão aqui é ganhar mais — ou apenas trabalhar mais?',
    quando: 'empresário já sobrecarregado',
  },
  {
    id: 'expansao.sucesso-em-12-meses',
    categoria: 'EXPANSAO',
    pergunta: 'Daqui a doze meses, como você vai saber que essa expansão valeu a pena?',
    quando: 'decisão sem critério de sucesso',
  },
]

export function perguntasPorCategoria(categoria: CategoriaDecisao): PerguntaSocratica[] {
  return BIBLIOTECA_SOCRATICA.filter((p) => p.categoria === categoria)
}
