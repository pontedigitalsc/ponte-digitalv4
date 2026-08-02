export const reacoesIndividuais: Record<string, string> = {
  'historia.nascer':     'Uma empresa nasce de um momento. O seu, agora, faz parte do que eu vou lembrar.',
  'historia.comecar':    'Começar exige coragem. Você teve.',
  'historia.momento':    'Esse momento importa. Vou guardá-lo com o cuidado que ele merece.',
  'historia.orgulho':    'Sinto o orgulho nessa resposta. É dos seus.',
  'historia.mudanca':    'Olhar para trás e enxergar o que mudaria exige honestidade. Você teve.',
  'rotina.dia':          'Entendi como seu dia começa. Isso me diz muito sobre como ele termina.',
  'rotina.pressao':      'Percebi onde a pressão aperta. Vou prestar atenção nisso.',
  'rotina.cabeca':       'O que ocupa sua cabeça quase nunca é o que parece por fora.',
  'rotina.tranquilo':    'Terminar o dia tranquilo é raro. Quando você me conta, eu noto.',
  'rotina.energia':      'Onde a energia se vai costuma ser onde a empresa precisa de um descanso.',
  'empresa.clientes':    'Quando o cliente volta, tem um motivo. Vou tentar enxergá-lo com você.',
  'empresa.multiplicar': 'Saber quem você quer ver voltando é uma escolha. Você tem.',
  'empresa.crescer':     'O que segura uma empresa costuma ser silencioso. Vamos olhar juntos.',
  'empresa.horalivre':   'Essa resposta quase sempre revela o que a pessoa mais deseja. A sua, sim.',
  'empresa.decisao':     'Decidir sem certeza é o trabalho mais difícil que existe. Você o faz todos os dias.',
  'frente.surpresa':     'Surpresas guardam lições. Boas ou ruins, vale prestar atenção.',
  'frente.funcionou':    'O que funcionou merece ser lembrado. Você raramente tem tempo para isso.',
  'frente.diferente':    'Refletir sobre a semana é um hábito de quem evolui. Você está nele.',
  'frente.proximo':      'Um horizonte claro orienta decisões pequenas. Vou lembrar do seu.',
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

// P52 — reações de transição entre os 5 estágios do conselheiro.
export const REACOES_BLOCO: Record<string, string> = {
  'contexto': 'Uma empresa nasce de um momento — o seu já me conta muita coisa. Agora quero entender como esse começo virou o dia a dia.',
  'realidade': 'Já imagino como é seu dia. Agora quero enxergar a empresa por trás dele, como ela funciona de verdade.',
  'tensao': 'Estou começando a sentir onde a corda aperta. Vamos olhar isso com calma — é assim que encontramos o que trava.',
  'evolucao': 'Você carrega mais conquistas do que imagina. Deixa eu registrar o que já está funcionando.',
  'proximo_movimento': 'Com o que você me contou, já consigo pensar em direção. Vamos definir o próximo movimento.',
}
