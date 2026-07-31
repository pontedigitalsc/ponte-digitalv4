export const reacoesIndividuais: Record<string, string> = {
  'historia.nascer':     'É importante entender de onde a empresa veio. A origem revela muito sobre os valores que guiam suas decisões.',
  'historia.comecar':    'Saber o que motivou o começo me ajuda a entender o que sustenta sua motivação até hoje.',
  'historia.momento':    'Esse tipo de memória mostra o que realmente importa para você no negócio.',
  'historia.orgulho':    'Saber do que você se orgulha me mostra onde estão seus maiores acertos até agora.',
  'historia.mudanca':    'Interessante. As respostas mostram que você já reflete bastante sobre o que poderia ter sido diferente.',
  'rotina.dia':          'Como o dia começa diz muito sobre como a energia é distribuída ao longo dele.',
  'rotina.pressao':      'Identificar onde a pressão aparece ajuda a entender onde um processo faria diferença.',
  'rotina.cabeca':       'O que ocupa a cabeça de um empresário raramente é o que parece de fora.',
  'rotina.tranquilo':    'Essa resposta diz muito. Empresários tranquilos administram melhor.',
  'rotina.energia':      'O que consome energia é geralmente o primeiro lugar onde uma mudança traria alívio.',
  'empresa.clientes':    'Saber o que faz clientes voltarem é uma das informações mais valiosas de qualquer negócio.',
  'empresa.multiplicar': 'Concentrar esforços no cliente ideal é uma das decisões que mais aceleram o crescimento.',
  'empresa.crescer':     'Identificar o freio do crescimento é o primeiro passo para tirá-lo.',
  'empresa.horalivre':   'Essa é uma pergunta reveladora — onde o empresário investiria tempo livre mostra onde ele sente que está perdendo oportunidades.',
  'empresa.decisao':     'Entender como você decide me ajuda a ver onde uma informação melhor faria diferença.',
  'frente.surpresa':     'Prestar atenção nas surpresas — boas ou ruins — é um dos maiores geradores de aprendizado.',
  'frente.funcionou':    'Saber o que funcionou permite repetir. A maioria dos empresários só olha para o que deu errado.',
  'frente.diferente':    'Essa reflexão semanal é um dos hábitos que separa empresas que evoluem das que estagnam.',
  'frente.proximo':      'Ter um horizonte claro permite que cada decisão seja avaliada contra um destino desejado.',
}

export const SILENCIO_INTELIGENTE = [
  'Vou guardar isso.',
  'Isso me fez pensar. Vou deixar descansar um pouco antes de falar.',
  'Prefiro observar mais um tempo antes de sugerir qualquer coisa.',
  'Percebi. Mas ainda não quero concluir nada com pressa.',
  'Essa informação é importante. Vou prestar atenção em como ela evolui.',
  'Não vou dizer nada agora. Só quero que você saiba que eu ouvi.',
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

export const REACOES_BLOCO: Record<string, string> = {
  'historia': 'Obrigado por compartilhar a história. Isso me ajuda a entender quem está por trás da empresa.',
  'rotina':   'Já consigo imaginar como é seu dia a dia. Vamos falar agora sobre o negócio em si.',
  'empresa':  'Agora estou começando a enxergar padrões. Percebi algumas coisas que vou compartilhar em breve.',
  'frente':   'Com isso já tenho material suficiente para escrever uma carta sobre sua empresa.',
}
