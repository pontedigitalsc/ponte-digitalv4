// P70 — MOTOR DE HIPÓTESES ESTRATÉGICAS
//
// Determinístico — sem IA. Cada hipótese nasce de regras sobre as respostas
// reais da Primeira Sessão Estratégica. O Retrato é CONSEQUÊNCIA das
// hipóteses, nunca um template. Princípio do produto: a IA é interface, não
// cérebro; a leitura estratégica é construída sobre evidência, com as
// palavras do próprio empresário.
//
// Direções: uma resposta pode reforçar (alta), contradizer (queda) ou
// confirmar (confirmada) uma hipótese. `forca` (1–3) pondera quanto a
// evidência sustenta a hipótese hoje.

export interface HipoteseEstrategica {
  id: string
  rotulo: string
  texto: string
  evidencia: string
  forca: number // 1 = pouco sustentada, 3 = muito sustentada
  confianca: 'BAIXA' | 'MEDIA' | 'ALTA'
  prioridade: string // o que merece atenção primeiro (seção 3 do Retrato)
  decisao: string // a decisão que a Ponte observaria (seção 4)
  pergunta: string // pergunta aberta para a próxima conversa (seção 5)
  // P65 — ponto cego: o que o empresário provavelmente ainda não percebe
  // (seção 3 do Retrato V3). Sempre como hipótese — "Posso estar enganada...".
  pontoCego: string
}

type Respostas = Record<string, string | null>

function r(respostas: Respostas, id: string): string | null {
  return respostas[id]?.trim() || null
}

// P86-B2 — reconhecimento do contexto Founder (fluxo `configuracao-founder`).
// A presença de um único id desse fluxo é suficiente para a Ponte tratar as
// respostas como uma conversa sobre a PONTE (a própria empresa do Founder),
// reutilizando as MESMAS estruturas P70/P72/P73/P77/P78.
function ehConversaFounder(respostas: Respostas): boolean {
  return !!r(respostas, 'fundador.papel') || !!r(respostas, 'fluxo.afastamento') || !!r(respostas, 'atencao.mudanca')
}

function tem(respostas: Respostas, id: string, palavras: string[]): boolean {
  const v = r(respostas, id)?.toLowerCase() ?? ''
  return palavras.some((p) => v.includes(p.toLowerCase()))
}

const palavrasParada = ['para', 'pararia', 'parava', 'trava', 'pára', 'cancela', 'adia', 'ninguém', 'nada', 'paro', 'não funciona', 'nao funciona', 'fecha', 'quebrar']
const palavrasDelega = ['equipe', 'time', 'funcionário', 'funcionario', 'pessoas', 'delego', 'delegar', 'repasso', 'processo', 'procedimento', 'está em pé', 'anda', 'quase sozinha', 'quase sozinho']
const palavrasIntuicao = ['intuição', 'intuicao', 'sinto', 'no momento', 'quando sobra', 'vou vendo', 'visceral', 'achismo', 'no chute', 'achando', 'instinto']
const palavrasCaixaOrganizado = ['tabela', 'planilha', 'sistema', 'aplicativo', 'app', 'registro', 'fechamento', 'semanal', 'diário', 'diario', 'fluxo', 'previsão', 'previsao']
const palavrasCaixaFalta = ['falta', 'faltar', 'buraco', 'não vai dar', 'nao vai dar', 'apertado', 'vai faltar']
const palavrasTranquiloLonge = ['não lembro', 'nao lembro', 'há muito tempo', 'ha muito tempo', 'nunca', 'faz tempo', 'nem sei']
const palavrasSobrecarga = ['tudo', 'sozinho', 'sozinha', 'eu mesmo', 'eu mesma', 'sempre', 'não dou conta', 'nao dou conta', 'sobrecarregado', 'esgotado', 'exausto']

function confiancaPorForca(forca: number): HipoteseEstrategica['confianca'] {
  if (forca >= 3) return 'ALTA'
  if (forca === 2) return 'MEDIA'
  return 'BAIXA'
}

function hipoteseDependencia(respostas: Respostas): HipoteseEstrategica | null {
  const dependencia = r(respostas, 'empresa.dependencia')
  const horaLivre = r(respostas, 'empresa.horalivre')
  const momento = r(respostas, 'empresa.momento')?.toLowerCase() ?? ''
  const energia = r(respostas, 'rotina.energia')

  if (!dependencia && !horaLivre && !momento.includes('depende de mim')) return null

  let forca = 1
  if (dependencia && tem(respostas, 'empresa.dependencia', palavrasParada)) forca += 1
  if (dependencia && tem(respostas, 'empresa.dependencia', palavrasDelega)) forca -= 1
  if (momento.includes('depende de mim')) forca += 1
  if (momento.includes('crescendo mais rápido') || momento.includes('muito trabalho')) forca += 1
  if (horaLivre && tem(respostas, 'empresa.horalivre', palavrasDelega)) forca -= 1
  if (energia && tem(respostas, 'rotina.energia', palavrasSobrecarga)) forca += 1

  forca = Math.max(1, Math.min(3, forca))

  const evidencia = dependencia ?? `"${momento.trim()}"`
  return {
    id: 'dependencia_fundador',
    rotulo: 'A empresa depende de uma só pessoa',
    texto: `Muita coisa ainda passa por você — a empresa parece depender do fundador para funcionar no dia a dia.`,
    evidencia,
    forca,
    confianca: confiancaPorForca(forca),
    prioridade: 'Reduzir a dependência de uma única pessoa — escolher uma tarefa que só você faz e escrever o passo a passo dela é o começo de uma empresa que funciona sem você em cada detalhe.',
    decisao: 'Se eu estivesse no seu lugar, observaria qual tarefa só você sabe fazer e que, se você sumisse, pararia a empresa — e decidiria qual delas merece virar um processo escrito primeiro.',
    pergunta: 'Se você tivesse mais uma pessoa de confiança cuidando da operação por um mês, qual seria a primeira coisa que você pediria que ela assumisse?',
    pontoCego: 'O que talvez você ainda não esteja percebendo: a empresa cresce até o tamanho do que você consegue carregar sozinho. O que parece "fazer o negócio andar" hoje — você em cada decisão — é o mesmo que limita o próximo passo.',
  }
}

function hipoteseMaturidade(respostas: Respostas): HipoteseEstrategica | null {
  const decisao = r(respostas, 'empresa.decisao')
  const momento = r(respostas, 'empresa.momento')?.toLowerCase() ?? ''
  const caixa = r(respostas, 'financeiro.caixa')

  if (!decisao && !caixa && !momento) return null

  let forca = 1
  if (decisao && tem(respostas, 'empresa.decisao', palavrasIntuicao)) forca += 1
  if (momento.includes('crescendo mais rápido') || momento.includes('muito trabalho')) forca += 1
  if (caixa && tem(respostas, 'financeiro.caixa', palavrasCaixaOrganizado)) forca -= 1
  if (caixa && tem(respostas, 'financeiro.caixa', palavrasCaixaFalta)) forca += 1

  forca = Math.max(1, Math.min(3, forca))

  const evidencia = decisao ?? caixa ?? momento.trim()
  return {
    id: 'maturidade_operacional',
    rotulo: 'A operação é tocada pela intuição',
    texto: `Decisões importantes parecem ser tomadas no momento, sem um método — a operação se sustenta mais na intuição do que em registros.`,
    evidencia,
    forca,
    confianca: confiancaPorForca(forca),
    prioridade: 'Criar um mínimo de registro sobre as decisões e o caixa — não um sistema completo, apenas saber onde a empresa está antes de decidir.',
    decisao: 'Se eu estivesse no seu lugar, observaria a próxima decisão de investir: quanto do que você decidiu na semana veio de número e quanto veio de intuição — e se o registro mudaria a escolha.',
    pergunta: 'Se você anotasse, durante uma semana, as três decisões mais caras que tomou — quanto você acha que enxergaria de padrão nelas?',
    pontoCego: 'O que talvez você ainda não esteja percebendo: decisões repetidas do mesmo jeito tendem a repetir os mesmos resultados. O que parece "sentir o momento" hoje pode estar escondendo um padrão que um registro simples revelaria.',
  }
}

function hipoteseCliente(respostas: Respostas): HipoteseEstrategica | null {
  const clientes = r(respostas, 'empresa.clientes')
  const multiplicar = r(respostas, 'empresa.multiplicar')

  if (!clientes && !multiplicar) return null

  let forca = 1
  if (clientes && clientes.length >= 15) forca += 1
  if (multiplicar && multiplicar.length >= 10) forca += 1
  if (clientes && clientes.length < 8) forca -= 1

  forca = Math.max(1, Math.min(3, forca))

  const evidencia = clientes ?? multiplicar ?? ''
  return {
    id: 'conhecimento_cliente',
    rotulo: 'Conhecimento do cliente existe, mas é vivido, não registrado',
    texto: `Você sabe por que os clientes voltam, mas esse conhecimento parece viver mais na prática do dia a dia do que em decisões estruturadas.`,
    evidencia,
    forca,
    confianca: confiancaPorForca(forca),
    prioridade: 'Transformar o que você já sabe sobre clientes em previsibilidade — nomear o que faz voltarem e proteger isso como prioridade.',
    decisao: 'Se eu estivesse no seu lugar, decidiria qual cliente não quer perder de jeito nenhum e observaria quantas decisões da próxima semana o protegem.',
    pergunta: 'Se você tivesse que explicar a um funcionário novo, em uma frase, o que faz um cliente voltar — qual frase seria?',
    pontoCego: 'O que talvez você ainda não esteja percebendo: você conhece seus clientes de cor, mas esse conhecimento mora na sua cabeça. Enquanto não virar previsibilidade registrada, cada decisão sobre eles recomeça do zero.',
  }
}

function hipoteseFinanceira(respostas: Respostas): HipoteseEstrategica | null {
  const previsao = r(respostas, 'financeiro.previsao')?.toLowerCase() ?? ''
  const caixa = r(respostas, 'financeiro.caixa')

  if (!previsao && !caixa) return null

  let forca = 1
  if (previsao.includes('sim')) forca += 1
  if (previsao.includes('não') || previsao.includes('nao') || previsao.includes('chute')) forca += 1
  if (caixa && tem(respostas, 'financeiro.caixa', palavrasCaixaFalta)) forca += 1
  if (caixa && tem(respostas, 'financeiro.caixa', palavrasCaixaOrganizado)) forca -= 1

  forca = Math.max(1, Math.min(3, forca))

  const evidencia = previsao || (caixa ?? '')
  return {
    id: 'previsibilidade_financeira',
    rotulo: 'O próximo mês ainda é uma aposta',
    texto: `O mês seguinte da empresa ainda não é previsível — o que vai entrar parece depender mais de acontecimento do que de previsão.`,
    evidencia,
    forca,
    confianca: confiancaPorForca(forca),
    prioridade: 'Construir previsibilidade — não um controle completo, apenas conseguir estimar o próximo mês com base no que já aconteceu.',
    decisao: 'Se eu estivesse no seu lugar, observaria quantas vezes na próxima semana a empresa decidiu sem saber quanto tinha em caixa — e escolheria uma única decisão para esperar o número antes.',
    pergunta: 'Se você soubesse exatamente quanto vai entrar no próximo mês, qual decisão diferente você tomaria ainda esta semana?',
    pontoCego: 'O que talvez você ainda não esteja percebendo: sem saber o que vem pela frente, cada decisão vira aposta. A previsibilidade não é sobre controlar — é sobre deixar de decidir no escuro.',
  }
}

function hipoteseEnergia(respostas: Respostas): HipoteseEstrategica | null {
  const energia = r(respostas, 'rotina.energia')
  const cabeca = r(respostas, 'rotina.cabeca')
  const tranquilo = r(respostas, 'rotina.tranquilo')

  if (!energia && !cabeca && !tranquilo) return null

  let forca = 1
  if (energia && tem(respostas, 'rotina.energia', palavrasSobrecarga)) forca += 1
  if (cabeca && tem(respostas, 'rotina.cabeca', palavrasSobrecarga)) forca += 1
  if (tranquilo && tem(respostas, 'rotina.tranquilo', palavrasTranquiloLonge)) forca += 1

  forca = Math.max(1, Math.min(3, forca))

  const evidencia = energia ?? cabeca ?? tranquilo ?? ''
  return {
    id: 'sobrecarga_fundador',
    rotulo: 'A energia do fundador está sendo drenada',
    texto: `O que consome sua energia e ocupa sua cabeça é o mesmo — a empresa pede mais de você do que devolveria.`,
    evidencia,
    forca,
    confianca: confiancaPorForca(forca),
    prioridade: 'Proteger a energia — o que mais consome sua energia costuma ser também o que mais ocupa sua cabeça; observar isso por uma semana é o primeiro passo.',
    decisao: 'Se eu estivesse no seu lugar, observaria em quais horários a energia some e qual atividade vem antes — para decidir onde colocar um limite primeiro.',
    pergunta: 'Se sua semana tivesse uma hora só sua, sem ligações, e-mail ou urgências — o que você faria dela?',
    pontoCego: 'O que talvez você ainda não esteja percebendo: o que toma sua energia é o mesmo que ocupa sua cabeça — não por acaso. A energia não está sendo drenada por "falta de tempo", mas por algo que se repete todos os dias.',
  }
}

export function gerarHipoteses(respostas: Respostas): HipoteseEstrategica[] {
  // P86-B2 — a mesma conversa, um contexto diferente. Quando as respostas vêm do
  // fluxo `configuracao-founder`, o motor lê a Ponte como a "empresa" sob
  // gestão do Founder. Determinístico, guiado pelas MESMAS estruturas P70.
  if (ehConversaFounder(respostas)) {
    return gerarHipotesesFounder(respostas)
  }

  const candidatas = [
    hipoteseDependencia(respostas),
    hipoteseMaturidade(respostas),
    hipoteseCliente(respostas),
    hipoteseFinanceira(respostas),
    hipoteseEnergia(respostas),
  ].filter((h): h is HipoteseEstrategica => h !== null)

  // Mesmo nome de hipótese não se repete; ordena por força (mais sustentada primeiro).
  return [...candidatas].sort((a, b) => b.forca - a.forca)
}

// Persistência — ao finalizar a conversa, as hipóteses são gravadas como
// memória cognitiva (descobertas) e como sinal de valor. Nenhuma hipótese
// aparece como "certeza": elas existem para serem observadas, não para
// rotular a empresa.
// ─── P72 — O ESPELHO EMPRESARIAL ─────────────────────────────────────────────
// Até aqui as hipóteses eram lidas uma a uma (Dependência, Maturidade, Cliente,
// Financeira, Energia). P72 muda isso: a Ponte passa a CONECTAR CAUSAS em vez de
// interpretar respostas isoladas. Mostra RELAÇÕES não dados; monta mapa mental
// (pressão → centralização → sobrecarga → crescimento limitado → caixa apertado);
// identifica CONTRADIÇÕES ("Você quer crescer, mas a empresa para sem você");
// e entrega uma FRASE que o empresário queira guardar.
//
// Determinístico, sem IA, 100% derivado das respostas reais. Nunca afirmar sem
// evidência, nunca inventar padrão. Toda leitura parte das palavras do próprio
// empresário.

export interface LeituraCognitiva {
  padrao: string
  relacoes: string[]
  contradicoes: string[]
  frase: string | null
}

const palavrasQuerCrescer = ['crescer', 'crescimento', 'expandir', 'evoluir', 'faturar', 'mais vendas', 'ganhar mais', 'escala', 'abrir']
const palavrasCentralizado = ['depende de mim', 'só eu', 'eu mesmo', 'eu mesma', 'sozinho', 'sozinha', 'ninguém', 'nada', 'sem mim', 'parei', 'pararia', 'estancaria', 'na minha cabeça']
const palavrasCaixaApertado = ['falta', 'faltar', 'buraco', 'apertado', 'vai faltar', 'não vai dar', 'nao vai dar']
const palavrasSemTempo = ['falta de tempo', 'tempo', 'gargalo', 'horas', 'sobrecarregado']

function querCrescer(respostas: Respostas): boolean {
  if (tem(respostas, 'frente.proximo', palavrasQuerCrescer)) return true
  if (tem(respostas, 'visao.funcionando', palavrasQuerCrescer)) return true
  return false
}

function centralizado(respostas: Respostas): boolean {
  if (tem(respostas, 'empresa.momento', palavrasCentralizado)) return true
  if (tem(respostas, 'empresa.dependencia', ['pararia', 'sofreria', 'estancaria', 'gargalo'])) return true
  if (tem(respostas, 'rotina.energia', ['eu mesmo', 'eu mesma', 'operacao'])) return true
  return false
}

function caixaApertado(respostas: Respostas): boolean {
  if (tem(respostas, 'financeiro.caixa', palavrasCaixaApertado)) return true
  if (tem(respostas, 'financeiro.previsao', ['nao', 'chute', 'parcial', 'mais ou menos'])) return true
  return false
}

function semTempo(respostas: Respostas): boolean {
  if (tem(respostas, 'empresa.crescer', palavrasSemTempo)) return true
  if (tem(respostas, 'rotina.energia', ['apagar', 'incendio', 'operacao', 'muito trabalho'])) return true
  return false
}

export function gerarLeituraCognitiva(respostas: Respostas, hipoteses: HipoteseEstrategica[]): LeituraCognitiva {
  // P86-B2 — leitura do contexto Founder (a Ponte como empresa do Founder).
  if (ehConversaFounder(respostas)) return gerarLeituraFounder(respostas, hipoteses)

  const leituras: string[] = []
  const contradicoes: string[] = []
  let frase: string | null = null

  const quer = querCrescer(respostas)
  const central = centralizado(respostas)
  const caixa = caixaApertado(respostas)
  const tempo = semTempo(respostas)

  // Relação: o problema "financeiro" quase sempre é operacional.
  if (caixa && central) {
    leituras.push(
      'Talvez o problema que você considera financeiro não seja financeiro. O caixa apertado quase nunca é a origem — é o sintoma de uma operação que depende de você para girar. Se a empresa para sem você, o dinheiro só entra onde você está.',
    )
    frase = frase ?? 'Seu maior desafio talvez não seja a falta de caixa. Talvez seja o excesso de dependência.'
  }

  // Relação: crescimento e tempo faltam sempre juntos.
  if (quer && tempo) {
    leituras.push(
      'Curiosamente... toda vez que você fala em crescer, também aparece falta de tempo. Não é coincidência: quando tudo passa por uma pessoa, crescer não soma — ela apenas pesa mais.',
    )
    if (!frase) frase = 'Você não parece estar crescendo. Você parece estar acumulando responsabilidade.'
  }

  // Relação: a energia não some sozinha — é a operação drenando o caixa.
  if (central && caixa && tempo) {
    leituras.push(
      'Existe uma corrente aqui: pressão → você no centro → sobrecarga → crescimento limitado → caixa apertado. Não são fatos isolados; é um sistema. Tocar em um ponto (você) mexe nos outros.',
    )
  }

  // Contradição: querer crescer sem conseguir delegar.
  if (quer && central) {
    contradicoes.push(
      'Você quer crescer — e ao mesmo tempo me contou que a empresa depende de você para girar. Talvez essas duas respostas estejam em conflito: crescer amplia exatamente o que você mais precisa ceder.',
    )
  }

  // Contradição: desejar previsibilidade enquanto se decide por intuição.
  if (caixa && hipoteses.some((h) => h.id === 'maturidade_operacional' && h.forca >= 2)) {
    contradicoes.push(
      'Você quer mais previsibilidade no caixa — mas me contou que as decisões ainda se sustentam na intuição. A previsão que falta pode não estar nos números, e sim na forma de decidir.',
    )
  }

  // Contradição: método de decisão x previsibilidade.
  if (hipoteses.some((h) => h.id === 'previsibilidade_financeira')) {
    contradicoes.push(
      'Você aponta o dinheiro como o que mais pesa — e ao mesmo tempo admite que não sabe exatamente o que vem no próximo mês. O que pesa talvez não seja a falta de dinheiro, seja a leitura.',
    )
  }

  // Frase padrão quando nenhuma relação mais forte aparece.
  if (!frase && hipoteses.length > 0) {
    frase = 'A empresa está funcionando, sim — mas ainda não está aprendendo. Um negócio que conhece o cliente, decide por intuição e não registra o que aprende gira no lugar com a mesma história.'
  }

  const padrao =
    leituras[0] ??
    (hipoteses[0]
      ? `Para mim, quem passa tudo: ${hipoteses[0].rotulo.toLowerCase()}.`
      : 'Começamos há pouco e ainda não tenho um padrão para afirmar — mas já tenho as primeiras conexões para observar com você.')

  return { padrao, relacoes: leituras, contradicoes, frase }
}

// ─── P86-B2 — AS HIPÓTESES DO FOUNDER ────────────────────────────────────────
// Mesmo motor P70, contexto da Conversa de Configuração Cognitiva do Founder
// (`configuracao-founder`). As respostas usam ids `fundador_*` e temáticas
// próprias (`realidade.*`, `fluxo.*`, `decisoes.*`, `evolucao.*`, `atencao.*`)
// — por isso estas regras só disparam quando esse contexto existe. Nenhuma
// hipótese afirma certeza: toda leitura segue como observação (SABEMOS /
// ACREDITAMOS / INVESTIGANDO), nunca como rótulo da pessoa ou da empresa.

function fTem(respostas: Respostas, id: string, fragmentos: string[]): boolean {
  const valor = r(respostas, id)
  if (!valor) return false
  const limpo = (v: string) => v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const alvo = limpo(valor)
  return fragmentos.some((f) => alvo.includes(limpo(f)))
}

function hipoteseFounderDependencia(respostas: Respostas): HipoteseEstrategica | null {
  const trabalho = r(respostas, 'fluxo.trabalho')
  const afastamento = r(respostas, 'fluxo.afastamento')
  const uso = r(respostas, 'realidade.uso')
  if (!trabalho && !afastamento && !uso) return null

  let forca = 1
  if (trabalho && fTem(respostas, 'fluxo.trabalho', ['tudo passa por voce'])) forca += 1
  if (afastamento && fTem(respostas, 'fluxo.afastamento', ['quase tudo', 'improviso'])) forca += 1
  if (uso && fTem(respostas, 'realidade.uso', ['so eu'])) forca += 1
  if (trabalho && fTem(respostas, 'fluxo.trabalho', ['time conduz', 'revisa', 'terceiros'])) forca -= 1
  if (afastamento && fTem(respostas, 'fluxo.afastamento', ['quase sozinha'])) forca -= 1
  forca = Math.max(1, Math.min(3, forca))

  return {
    id: 'founder_dependencia_pessoal',
    rotulo: 'A Ponte ainda gira em torno de você',
    texto: `Boa parte do que sustenta a Ponte continua passando por você — o papel de fundador e o papel de funcionamento ainda se misturam mais do que deveriam.`,
    evidencia: afastamento ?? trabalho ?? uso ?? '',
    forca,
    confianca: confiancaPorForca(forca),
    prioridade: 'Escolher um pedaço da operação que só você faz e escrever o passo a passo dele — a Ponte precisa de ao menos um processo que não dependa do seu dia para virar empresa de verdade.',
    decisao: 'Se eu estivesse no seu lugar, observaria qual tarefa — se você faltasse trinta dias — pararia a Ponte — e decidiria qual delas merece virar um processo escrito primeiro.',
    pergunta: 'Se uma pessoa de confiança assumisse o seu papel por um mês, o que você pediria que ela mantivesse exatamente como você faz hoje?',
    pontoCego: 'O que talvez você ainda não esteja percebendo: você criou a Ponte para empresas deixarem de depender de uma pessoa só — e a própria Ponte, hoje, pode estar dependendo só de você. O próximo movimento talvez não seja construir mais: seja escolher o que deixar de carregar sozinho.',
  }
}

function hipoteseFounderConstrucao(respostas: Respostas): HipoteseEstrategica | null {
  const momento = r(respostas, 'realidade.momento')
  if (!momento) return null

  let forca = 1
  if (fTem(respostas, 'realidade.momento', ['formacao', 'visao', 'fundada', 'comecando a andar'])) forca += 1
  if (fTem(respostas, 'realidade.momento', ['funciona', 'founders de rua', 'usando'])) forca -= 1
  forca = Math.max(1, Math.min(3, forca))

  return {
    id: 'founder_construcao_fase',
    rotulo: 'A Ponte ainda é mais direção do que operação',
    texto: `Você descreveu a Ponte como "${momento}". A construção parece mais próxima da direção escolhida do que de uma operação estabelecida.`,
    evidencia: momento,
    forca,
    confianca: confiancaPorForca(forca),
    prioridade: 'Definir a menor operação que precisa existir para validar a direção — antes de construir mais estrutura.',
    decisao: 'Se eu estivesse no seu lugar, observaria se as decisões da próxima semana aproximam a Ponte do uso real de Founders ou apenas vertem em produto.',
    pergunta: 'Se daqui a trinta dias só um fato pudesse provar que a direção está certa, qual fato você escolheria?',
    pontoCego: 'O que talvez você ainda não esteja olhando: construção constante pode confundir atividade com progresso — movimento não é a mesma coisa que avanço.',
  }
}

function hipoteseFounderDecisao(respostas: Respostas): HipoteseEstrategica | null {
  const influencia = r(respostas, 'decisoes.influencia')
  if (!influencia) return null

  const porEvidencia = fTem(respostas, 'decisoes.influencia', ['evidencias', 'dados e evidencia', 'encontros'])
  const porMomento = !porEvidencia &&
    fTem(respostas, 'decisoes.influencia', ['intuicao', 'urgente', 'recursos permitem'])

  let forca = 1
  if (porEvidencia && fTem(respostas, 'evolucao.registro', ['sistema da ponte', 'memoria'])) forca += 1
  if (porMomento && fTem(respostas, 'evolucao.registro', ['minha cabeca', 'pouco ainda e registrado', 'docs e arquivos'])) forca += 1
  forca = Math.max(1, Math.min(3, forca))

  const base = porEvidencia
    ? {
        id: 'founder_decisao_por_evidencia',
        rotulo: 'As decisões já se sustentam em evidência',
        texto: `A influência das suas decisões sobre a Ponte vem de evidência — encontros e dados —, não apenas de percepção.`,
      }
    : {
        id: 'founder_decisao_por_momento',
        rotulo: 'As decisões ainda se guiam pela percepção do momento',
        texto: `O que mais influencia suas decisões sobre a Ponte é a leitura do momento — a evidência ainda sustenta menos do que a percepção de hoje.`,
      }

  return {
    ...base,
    evidencia: influencia,
    forca,
    confianca: confiancaPorForca(forca),
    prioridade: 'Observar quantas decisões da próxima semana nascem de informação real e quantas nascem de sensação — sem precisar mudar nada, apenas anotando.',
    decisao: 'Se eu estivesse no seu lugar, separaria a próxima decisão importante e anotaria o que a sustentou: dado ou sensação — e checaria se o dado mudaria a escolha.',
    pergunta: 'Uma decisão sua recente sobre a Ponte mudaria se você tivesse mais informação confiável antes de tomá-la?',
    pontoCego: 'O possível ponto cego: o que parece ser "decisão de fundador" pode estar, na verdade, sendo uma decisão sem informação suficiente — e o padrão só aparece quando começa a ser registrado.',
  }
}

function hipoteseFounderConhecimento(respostas: Respostas): HipoteseEstrategica | null {
  const registro = r(respostas, 'evolucao.registro')
  if (!registro) return null

  const estruturado = fTem(respostas, 'evolucao.registro', ['sistema da ponte', 'memoria'])
  let forca = estruturado ? 2 : 3
  if (registro && fTem(respostas, 'evolucao.registro', ['pouco ainda e registrado'])) forca = 3
  if (registro && fTem(respostas, 'evolucao.registro', ['sistema da ponte'])) forca = 1

  return {
    id: estruturado ? 'founder_conhecimento_sistema' : 'founder_conhecimento_na_cabeca',
    rotulo: estruturado
      ? 'O conhecimento dos resultados já mora na memória da empresa'
      : 'O conhecimento ainda mora na cabeça de quem toca a Ponte',
    texto: `Sobre onde mora o conhecimento dos resultados que a Ponte vê, você disse: "${registro}". Isso define de onde partem as próximas decisões.`,
    evidencia: registro,
    forca,
    confianca: confiancaPorForca(forca),
    prioridade: 'Proteger o lugar onde o conhecimento mora — e, se ele mora em gente só, dar a ele o primeiro endereço fora da cabeça do fundador.',
    decisao: 'Se eu estivesse no seu lugar, escolheria uma descoberta dos últimos trinta dias e decidiria onde ela vai viver a partir de agora (documento, memória do sistema ou com as pessoas).',
    pergunta: 'O que a Ponte aprendeu nos últimos meses que, se apenas uma pessoa saísse, simplesmente se perderia?',
    pontoCego: 'O que parece invisível: conhecimento que mora numa cabeça não é patrimônio — é risco. O primeiro registro vale mais do que o décimo sistema.',
  }
}

function hipoteseFounderTrava(respostas: Respostas): HipoteseEstrategica | null {
  const trava = r(respostas, 'decisoes.trava')
  if (!trava) return null

  const nomeTrava = fTem(respostas, 'decisoes.trava', ['produto', 'proposta', 'ajuste']) 
    ? 'a direção do produto ainda não fecha a proposta'
    : fTem(respostas, 'decisoes.trava', ['recursos'])
      ? 'a escassez de recursos (dinheiro, tempo, pessoas)'
      : fTem(respostas, 'decisoes.trava', ['construindo', 'ocupados', 'recuar'])
        ? 'a ocupação de construir sem parar'
        : fTem(respostas, 'decisoes.trava', ['tracao', 'founders'])
          ? 'a tração ainda pequena de Founders de verdade'
          : trava

  return {
    id: 'founder_trava_principal',
    rotulo: 'A trava que você nomeou é o primeiro lugar onde vou olhar',
    texto: `Você nomeou como travamento: ${nomeTrava}. Esse é o ponto que a Ponte e você vão observar junto — não a solução pronta, mas a confirmação de que é ali.`,
    evidencia: trava,
    forca: 2,
    confianca: 'MEDIA',
    prioridade: 'Observar, por duas semanas, se o travamento nomeado reaparece nas decisões — e registrar quando ele aparece, sem tentar resolvê-lo já.',
    decisao: 'A decisão a acompanhar nos próximos dias: qual trabalho da semana se aproxima ou se afasta dessa trava — para saber se o tempo está indo para onde você apontou.',
    pergunta: 'Se a revista principal da Ponte fosse resolvida em trinta dias, o que você faria com o tempo que ela está tomando?',
    pontoCego: 'O mapa que talvez você ainda não esteja vendo: o que você nomeou como trava pode ser a tradução de uma raiz mais central — por isso vamos conferir com convivência, não com chute.',
  }
}

function gerarHipotesesFounder(respostas: Respostas): HipoteseEstrategica[] {
  const candidatas = [
    hipoteseFounderDependencia(respostas),
    hipoteseFounderConstrucao(respostas),
    hipoteseFounderDecisao(respostas),
    hipoteseFounderConhecimento(respostas),
    hipoteseFounderTrava(respostas),
  ].filter((h): h is HipoteseEstrategica => h !== null)
  return [...candidatas].sort((a, b) => b.forca - a.forca)
}

// P86-B2 — a leitura do contexto Founder conecta evidências de momentos
// diferentes (P72), com contradições quando elas aparecem — sempre como
// pergunta, nunca como sentença.
function gerarLeituraFounder(respostas: Respostas, hipoteses: HipoteseEstrategica[]): LeituraCognitiva {
  const leituras: string[] = []
  const contradicoes: string[] = []
  let frase: string | null = null

  const central = hipoteses.find((h) => h.id === 'founder_dependencia_pessoal')
  const trava = hipoteses.find((h) => h.id === 'founder_trava_principal')
  const construcao = hipoteses.find((h) => h.id === 'founder_construcao_fase')
  const afastamento = r(respostas, 'fluxo.afastamento')
  const querSairDoCentro = fTem(respostas, 'atencao.mudanca', ['menos de mim', 'girar com menos', 'decolagem'])

  if (central && trava) {
    leituras.push(
      `Tem uma conexão aqui: você apontou "${trava.evidencia}" como travamento — e, em outro momento, me contou que, se você saísse por trinta dias, a Ponte "${afastamento ?? 'ficaria na suas mãos'}". Quando o funcionamento passa por uma pessoa, trocar o nome da trava não muda o destino — mas enxergar as duas coisas juntas começa a mudar.`,
    )
  }

  if (construcao && central) {
    leituras.push(
      'O momento de construção e o fato de que "o que sustenta funciona por você" contaram a mesma história com duas palavras: a Ponte ainda é mais direção do que operação. Não é um defeito — é onde o próximo capítulo começa.',
    )
  }

  if (central && querSairDoCentro) {
    contradicoes.push(
      `Você quer ver a Ponte girar com menos de você no comando — e, ao mesmo tempo, me contou que ela ainda precisa de você para funcionar. Não é incoerência: é a própria tarefa dos próximos meses.`,
    )
  }

  if (trava && fTem(respostas, 'atencao.sucesso', ['por conta propria'])) {
    contradicoes.push(
      'Você define avanço pela volta espontânea de quem usa — e nomeia uma trava de recursos ou direção no mesmo conjunto. As duas leituras pedem observação, não resolução das duas de uma vez.',
    )
  }

  frase = central && querSairDoCentro
    ? 'Apoiar a Ponte nem sempre é fazer mais — muitas vezes é parar de ser o combustível de todos os passos.'
    : null
  if (!frase && central) {
    frase = 'Você construiu a Ponte para empresas nunca dependerem de uma só pessoa. A pergunta mais incômoda que eu trago desta conversa é: e ela?'
  }

  const padrao =
    leituras[0] ??
    (hipoteses[0]
      ? `No centro de tudo o que você falou hoje, vejo: ${hipoteses[0].rotulo.toLowerCase()}.`
      : 'Começamos há poucos minutos — ainda não há padrão, mas já há o que observar com você.')

  return { padrao, relacoes: leituras, contradicoes, frase }
}

export async function persistirHipoteses(
  empresaId: string,
  hipoteses: HipoteseEstrategica[],
  versao: number,
): Promise<void> {
  if (hipoteses.length === 0) return
  const { registrarNaMemoria } = await import('@/engine/cognitive-memory-engine')
  const { registrarSinalValor } = await import('@/engine/p36/value-index')

  for (const h of hipoteses.slice(0, 5)) {
    await registrarNaMemoria(empresaId, {
      tipo: h.forca >= 3 ? 'confirmacao' : 'descoberta',
      descricao: `${h.rotulo}: ${h.evidencia}`,
      categoria: 'ESTRATEGIA',
      versao,
      metadados: { origem: 'PRIMEIRA_SESSAO_ESTRATEGICA', forca: h.forca, confianca: h.confianca },
    }).catch(() => undefined)
  }

  await registrarSinalValor(empresaId, 'DECIDIU_APOS_RECOMENDACAO', 'PRIMEIRA_SESSAO_ESTRATEGICA', {
    hipoteses: hipoteses.map((h) => ({ id: h.id, rotulo: h.rotulo, forca: h.forca, confianca: h.confianca })),
  } as unknown as import('@prisma/client').Prisma.InputJsonValue).catch(() => undefined)
}
