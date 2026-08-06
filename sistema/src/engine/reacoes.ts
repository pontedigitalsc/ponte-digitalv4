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

// ─── P74 — PEQUENOS SILÊNCIOS (PARTE 6) ───────────────────────────────────────
// Nem toda resposta precisa de uma devolutiva elaborada. Às vezes basta uma
// pausa: a Ponte reconhece e segue. O empresário sente que foi ouvido sem que
// cada resposta vire um comentário.

export const SILENCIOS_CURTOS = [
  'Entendi.',
  'Interessante.',
  'Hm...',
  'Certo.',
  'Faz sentido.',
  'Isso muda bastante a forma como estou enxergando sua empresa.',
]

// ─── P74 — HUMILDADE INTELECTUAL (PARTE 7) ────────────────────────────────────
// A Ponte nunca parece perfeita. Mostra que sabe que está lendo uma empresa
// pela primeira vez. Humildade aumenta confiança — nunca é frase de efeito.

export const HUMILDADE_INTELECTUAL = [
  'Posso estar interpretando errado.',
  'Ainda tenho pouca evidência para afirmar com segurança.',
  'Vou tratar isso como hipótese, não como conclusão.',
  'Quero investigar isso melhor antes de dizer qualquer coisa definitiva.',
  'Essa é apenas a primeira leitura — ela pode mudar.',
]

// ─── P74 — PENSAR EM VOZ ALTA: A HIPÓTESE MUDOU (PARTE 3) ─────────────────────
// Grandes conselheiros mostram parte do próprio raciocínio. Quando a resposta
// muda o que a Ponte vinha pensando, ela fala abertamente sobre isso.

export const HIPOTESE_MUDOU = [
  'Enquanto você respondia, minha hipótese mudou.',
  'No começo achei que o seu desafio principal fosse um. Agora não acho mais.',
  'Essa resposta me fez repensar o que eu vinha considerando até aqui.',
  'Eu vinha lendo sua empresa de um jeito. Essa resposta mudou o rumo da leitura.',
]

// ─── P74 — EMOÇÕES DISCRETAS (PARTE 9) ────────────────────────────────────────
// A Ponte nunca dramatiza. Mas pode demonstrar surpresa — pouco, natural, sem
// exagero. Surpresa só aparece quando há motivo real na resposta.

export const SURPRESA_DISCRETA = [
  'Confesso que isso me surpreendeu.',
  'Não esperava encontrar esse padrão.',
  'Essa resposta mudou bastante minha percepção.',
  'Isso me pegou de surpresa — de um jeito bom.',
]

// ─── P74 — ABERTURAS NATURAIS (PARTE 1) ───────────────────────────────────────
// A conversa não pode parecer um formulário. As perguntas nunca podem ser
// introduzidas do mesmo jeito duas vezes seguidas. A Ponte usa aberturas que
// fazem a pergunta parecer nascer da conversa — nunca de uma lista.

export const ABERTURAS_NATURAIS = [
  'Tem uma curiosidade minha.',
  'Posso te perguntar uma coisa?',
  'Enquanto você falava, fiquei pensando...',
  'Isso me chamou atenção.',
  'Parece simples, mas...',
  'Queria entender melhor uma coisa.',
  'Fiquei com uma dúvida agora.',
]

// ─── P70/P71 — PENSAR EM VOZ ALTA ─────────────────────────────────────────────
// O sistema deixa o raciocínio aparecer: "Interessante...", "Isso muda um pouco
// minha percepção." Criar presença sem soar roteirizado. Determinístico (sem IA).

export const PENSAR_EM_VOZ_ALTA = [
  'Interessante...',
  'Isso muda um pouco minha percepção.',
  'Acho que encontrei um padrão.',
  'Espera... isso conecta com outra coisa que você comentou.',
  'Deixa eu pensar no que você disse...',
]

// ─── P70 — PEQUENOS MISTÉRIOS ─────────────────────────────────────────────────
// O empresário precisa sentir curiosidade: "Tem uma coisa interessante aparecendo
// aqui... mas ainda preciso entender mais um ponto." Mantém atenção até a próxima
// pergunta resolver o mistério.

export const CURIOSIDADE = [
  'Tem uma coisa interessante aparecendo aqui... mas ainda preciso entender mais um ponto antes de te dizer.',
  'Essa resposta abriu uma porta. Quero olhar o que tem atrás dela na próxima pergunta.',
  'Estou começando a ver um fio nesta história. Ainda não vou puxar — a próxima parte vai me ajudar.',
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

// ─── P71 — CONTRAPERGUNTAS ────────────────────────────────────────────────────
// A Ponte aprofunda a conversa com uma pergunta sobre a própria resposta
// ("Quando você diz tudo... está falando das decisões, ou da operação?"). A
// contrapergunta vive na camada de reação: provoca reflexão e mantém o fluxo —
// não é um campo de resposta novo (seria uma interação/feature fora do escopo).
// Determinístico: regras por pergunta + palavras-chave.

interface RegraContrapergunta {
  perguntaId: string
  palavras: string[]
  mensagem: (respostas: Respostas) => string
}

const REGRAS_CONTRAPERGUNTA: RegraContrapergunta[] = [
  {
    perguntaId: 'empresa.dependencia',
    palavras: ['pararia', 'sofreria', 'estancaria', 'depende', 'tudo'],
    mensagem: (respostas) =>
      `Quando você diz que a empresa "${r(respostas, 'empresa.dependencia')}"... estou me perguntando: você fala das decisões, ou da operação do dia a dia? Essa distinção muda como eu leio tudo o mais que você me contar.`,
  },
  {
    perguntaId: 'empresa.momento',
    palavras: ['depende', 'dependo', 'eu mesmo', 'gargalo'],
    mensagem: (respostas) =>
      `Você disse que a empresa "${r(respostas, 'empresa.momento')}". Quando você pensa nisso, o que pesa mais: a falta de estrutura, ou a falta de tempo sua? Quero entender qual dos dois é a raiz.`,
  },
  {
    perguntaId: 'financeiro.previsao',
    palavras: ['nao', 'chute', 'parcial', 'mais ou menos'],
    mensagem: (respostas) =>
      `Quando você diz que a previsão é "${r(respostas, 'financeiro.previsao')}"... isso é por falta de número, ou por escolha de não olhar com regularidade? Uma coisa é não ter o dado; outra é não ter o hábito.`,
  },
  {
    perguntaId: 'empresa.crescer',
    palavras: ['cliente', 'venda', 'vender'],
    mensagem: (respostas) =>
      `Você apontou "${r(respostas, 'empresa.crescer')}" como o que segura a empresa. Deixa eu te perguntar: o que mais falta para isso destravar — plano, tempo, ou alguém para executar?`,
  },
]

export function contraperguntaDurante(perguntaId: string, respostas: Respostas): string | null {
  for (const regra of REGRAS_CONTRAPERGUNTA) {
    if (regra.perguntaId !== perguntaId) continue
    if (contemAlguma(respostas, perguntaId, regra.palavras)) return regra.mensagem(respostas)
  }
  return null
}

// ─── P71 — MUDANÇA DE DIREÇÃO (SINAL CRÍTICO) ─────────────────────────────────
// Se a resposta revela algo grande demais (fechar a empresa, demitir, vender),
// a Ponte abandona momentaneamente o roteiro e explora. Determinístico.

const SINAIS_CRITICOS: { palavras: string[]; mensagem: (resposta: string) => string }[] = [
  {
    palavras: ['fechar', 'fechando', 'fechar a empresa', 'encerrar', 'falir', 'falencia'],
    mensagem: (resposta) =>
      `Espera. Você disse "${resposta}". Isso é grande demais para eu seguir o roteiro como se nada tivesse acontecido. Antes de qualquer outra coisa, quero entender isso com você — o que está levando a esse ponto?`,
  },
  {
    palavras: ['vender', 'vendendo a empresa', 'vender a empresa'],
    mensagem: (resposta) =>
      `Você mencionou "${resposta}". Antes de seguirmos, preciso te dizer: essa é uma decisão grande, e quero pensar com você — não apressar nada.`,
  },
  {
    palavras: ['demitir', 'demissao', 'mandar embora'],
    mensagem: (resposta) =>
      `Parei aqui porque você falou em "${resposta}". Decisões assim pesam mais do que parecem. Vamos olhar isso com calma antes de qualquer outra pergunta.`,
  },
]

export function sinalCriticoDurante(resposta: string): string | null {
  const texto = normalizar(resposta)
  for (const sinal of SINAIS_CRITICOS) {
    if (sinal.palavras.some((p) => texto.includes(normalizar(p)))) return sinal.mensagem(resposta)
  }
  return null
}

// ─── P71 — CONEXÕES DURANTE A CONVERSA ───────────────────────────────────────
// A Ponte cita coisas ditas minutos antes e conecta com a resposta atual.
// Determinístico: combina duas respostas reais.

interface RegraConexao {
  perguntaId: string
  condicao: (respostas: Respostas) => boolean
  mensagem: (respostas: Respostas) => string
}

const REGRAS_CONEXAO: RegraConexao[] = [
  {
    perguntaId: 'rotina.cabeca',
    condicao: (respostas) => !!r(respostas, 'rotina.energia') && !!r(respostas, 'rotina.cabeca'),
    mensagem: (respostas) =>
      `Você me disse que sua energia vai para "${r(respostas, 'rotina.energia')}" e que sua cabeça está em "${r(respostas, 'rotina.cabeca')}". Não por acaso — costuma ser a mesma coisa consumindo os dois.`,
  },
  {
    perguntaId: 'empresa.dependencia',
    condicao: (respostas) => !!r(respostas, 'empresa.crescer') && contemAlguma(respostas, 'empresa.dependencia', ['pararia', 'sofreria', 'estancaria']),
    mensagem: (respostas) =>
      `Você quer crescer — e disse que o que segura é "${r(respostas, 'empresa.crescer')}". Agora conta que, se ficasse 30 dias fora, "${r(respostas, 'empresa.dependencia')}". Talvez as duas coisas estejam ligadas: a empresa só cresce até o tamanho de quem está nela.`,
  },
  {
    perguntaId: 'financeiro.caixa',
    condicao: (respostas) => !!r(respostas, 'financeiro.previsao') && contemAlguma(respostas, 'financeiro.previsao', ['nao', 'chute', 'parcial']),
    mensagem: (respostas) =>
      `Você me disse que não tem uma previsão segura do próximo mês — e que, ao olhar o caixa, vê primeiro "${r(respostas, 'financeiro.caixa')}". Essas duas coisas combinadas costumam transformar decisão em aposta.`,
  },
]

export function conexaoDurante(perguntaId: string, respostas: Respostas): string | null {
  for (const regra of REGRAS_CONEXAO) {
    if (regra.perguntaId !== perguntaId) continue
    if (regra.condicao(respostas)) return regra.mensagem(respostas)
  }
  return null
}

// ─── P74 — PARTE 5: QUANDO HÁ UM CONFLITO, PERGUNTAR ANTES DE EXPLICAR ────────
// A Ponte nunca explica imediatamente um conflito. Primeiro pergunta e só então
// continua. A pergunta-viva fica na camada de reação (reflexão sem bloquear o
// fluxo) — exatamente como a contrapergunta do P70. Determinístico: só dispara
// quando duas respostas REAIS já foram dadas.

interface RegraContradicao {
  perguntaAtual: string
  outraPergunta: string
  palavrasAtual: string[]
  palavrasOutra: string[]
  mensagem: (atual: string, outra: string) => string
}

const REGRAS_CONFLITO: RegraContradicao[] = [
  {
    perguntaAtual: 'empresa.momento',
    outraPergunta: 'empresa.dependencia',
    palavrasAtual: ['depende de mim', 'depende muito de mim', 'crescendo'],
    palavrasOutra: ['pararia', 'estancaria'],
    mensagem: (atual, outra) =>
      `Parece existir uma pequena contradição. Você me contou que a empresa hoje "${atual}" — e depois que, se você se afastasse, "${outra}". Posso explorar isso com você?`,
  },
  {
    perguntaAtual: 'empresa.crescer',
    outraPergunta: 'empresa.dependencia',
    palavrasAtual: ['crescer', 'crescimento', 'expandir', 'evoluir'],
    palavrasOutra: ['pararia', 'estancaria', 'sofreria'],
    mensagem: (atual, outra) =>
      `Você aponta "${atual}" como o que segura a empresa — e ao mesmo tempo me conta que, sem você, "${outra}". As duas respostas parecem se contradizer. Posso explorar isso juntos?`,
  },
  {
    perguntaAtual: 'visao.funcionando',
    outraPergunta: 'empresa.dependencia',
    palavrasAtual: ['sem mim', 'sem eu', 'sozinha', 'sozinho'],
    palavrasOutra: ['pararia', 'estancaria'],
    mensagem: (atual, outra) =>
      `Aqui me chamou atenção: você imagina a empresa "${atual}" — mas também me contou que, se você se afastasse, "${outra}". Há um contraste entre onde você quer chegar e onde ela está hoje. Posso olhar isso com você?`,
  },
]

// Retorna a mensagem que pergunta sobre uma contradição detectada ou null.
// Vem antes da conexão/percepção na prioridade: a Ponte PERGUNTA antes de
// explicar — o empresário sente que a Ponte está acompanhando o raciocínio.
export function contradicaoDurante(perguntaAtual: string, respostas: Respostas): string | null {
  for (const regra of REGRAS_CONFLITO) {
    if (regra.perguntaAtual !== perguntaAtual) continue
    const valorAtual = r(respostas, regra.perguntaAtual)
    const valorOutra = r(respostas, regra.outraPergunta)
    if (!valorAtual || !valorOutra) continue
    if (contemAlguma({ [regra.perguntaAtual]: valorAtual }, regra.perguntaAtual, regra.palavrasAtual) &&
        contemAlguma({ [regra.outraPergunta]: valorOutra }, regra.outraPergunta, regra.palavrasOutra)) {
      return regra.mensagem(valorAtual, valorOutra)
    }
  }
  return null
}

// ─── P70/P71 — RITMO COGNITIVO ────────────────────────────────────────────────
// A Ponte nunca responde todas as respostas do mesmo jeito. O ritmo é
// imprevisível de forma determinística: às vezes recompensa, às vezes silêncio,
// às vezes pensa em voz alta, às vezes cria um pequeno mistério. A imprevisibilidade
// é derivada de um hash estável (etapa + palavra-chave) — o mesmo input produz o
// mesmo output, mas respostas diferentes produzem ritmos diferentes.

function hashTexto(texto: string): number {
  let hash = 0
  for (let i = 0; i < texto.length; i++) {
    hash = (hash << 5) - hash + texto.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export interface RitmoContexto {
  perguntaId: string
  resposta: string
  respostas: Respostas
  blocoAtual?: BlocoConversa
  fechaBloco: boolean
}

// Ordem de prioridade da fala da Ponte dentro de um bloco (P74 — humano):
//   1. sinal crítico (mudança de direção — Parte 4)
//   2. contradição (PERGUNTA antes de explicar — Parte 5)
//   3. contrapergunta com abertura natural e convite (Partes 1 e 8)
//   4. conexão — mostrar que OUVIU, não que copiou (Parte 2)
//   5. humildade intelectual sobre uma percepção (Parte 7)
//   6. ritmo imprevisível (silêncio curto / pensar em voz alta / mistério /
//      surpresa discreta / recompensa) (Partes 6, 3, 9, 1)
export function montarRitmoCognitivo(ctx: RitmoContexto): string {
  if (ctx.fechaBloco) return humildizarDevolutiva(devolutivaDeBloco(ctx.blocoAtual as BlocoConversa, ctx.respostas), ctx.perguntaId, ctx.resposta)

  // Parte 4 — mudança de direção quando aparece algo grande.
  const critico = sinalCriticoDurante(ctx.resposta)
  if (critico) return critico

  // Parte 5 — há um conflito: a Ponte PERGUNTA, não explica na hora.
  const conflito = contradicaoDurante(ctx.perguntaId, ctx.respostas)
  if (conflito) return conflito

  // Parte 1 e 8 — contrapergunta nasce da conversa, com abertura natural
  // e convite para o empresário conduzir ("Vale aprofundarmos?").
  const contra = contraperguntaDurante(ctx.perguntaId, ctx.respostas)
  if (contra) return `${aberturaNatural(ctx.perguntaId, ctx.resposta)} ${contra}`

  // Parte 2 — citar a evidência de um jeito que mostra escuta genuína.
  const conexao = conexaoDurante(ctx.perguntaId, ctx.respostas)
  if (conexao) return conexao

  // Parte 7 — percepção SEMPRE como hipótese, com humildade intelectual.
  const percepcao = percepcaoDurante(ctx.perguntaId, ctx.respostas)
  if (percepcao) return `${humildade(ctx.perguntaId, ctx.resposta)} ${percepcao}`

  // Ritmo imprevisível e determinístico — baseado na pergunta + resposta.
  const semente = `${ctx.perguntaId}::${normalizar(ctx.resposta)}`
  const sorteio = hashTexto(semente) % 12

  // Parte 6 — pequenos silêncios: às vezes basta uma pausa.
  if (sorteio >= 0 && sorteio <= 1) {
    return SILENCIOS_CURTOS[hashTexto(semente + '::silcurto') % SILENCIOS_CURTOS.length]
  }
  // Parte 3 — pensar em voz alta: a hipótese mudou.
  if (sorteio >= 2 && sorteio <= 3) {
    return HIPOTESE_MUDOU[hashTexto(semente + '::hipp') % HIPOTESE_MUDOU.length]
  }
  // Parte 1 — abertura natural que encerra a reação e sustenta a pergunta.
  if (sorteio >= 4 && sorteio <= 5) {
    return ABERTURAS_NATURAIS[hashTexto(semente + '::abertura') % ABERTURAS_NATURAIS.length]
  }
  if (sorteio >= 6 && sorteio <= 7) {
    const pensar = PENSAR_EM_VOZ_ALTA[hashTexto(semente + '::pensar') % PENSAR_EM_VOZ_ALTA.length]
    return `${pensar} ${obterReacao(ctx.perguntaId)}`
  }
  if (sorteio >= 8 && sorteio <= 9) {
    // Parte 9 — surpresa discreta, só quando a resposta é marcante.
    const surpresa = surpresaMarcante(ctx.perguntaId, ctx.resposta)
    if (surpresa) return surpresa
    return CURIOSIDADE[hashTexto(semente + '::curiosidade') % CURIOSIDADE.length]
  }
  return obterReacao(ctx.perguntaId)
}

// P74 Partes 1 e 8 — abertura natural variada (hash estável) antes de uma
// contrapergunta, para que o aprofundamento nunca comece do mesmo jeito.
function aberturaNatural(perguntaId: string, resposta: string): string {
  const semente = `abertura::${perguntaId}::${normalizar(resposta)}`
  return ABERTURAS_NATURAIS[hashTexto(semente) % ABERTURAS_NATURAIS.length]
}

// P74 Parte 7 — humildade sobre uma percepção: a Ponte se corrige ao longo da
// conversa, nunca se apresenta como certeza.
function humildade(perguntaId: string, resposta: string): string {
  const semente = `humildade::${perguntaId}::${normalizar(resposta)}`
  return HUMILDADE_INTELECTUAL[hashTexto(semente) % HUMILDADE_INTELECTUAL.length]
}

// P74 Parte 7 — numa devolutiva de fim de bloco a Ponte às vezes abre com
// humildade, para o resumo nunca parecer um veredito fechado. Determinístico:
// cerca de 1 a cada 3 devolutivas recebem o aviso de humildade.
function humildizarDevolutiva(devolutiva: string, perguntaId: string, resposta: string): string {
  const semente = `humildizar::${perguntaId}::${normalizar(resposta)}`
  if (hashTexto(semente) % 3 !== 0) return devolutiva
  return `${humildade(perguntaId, resposta)} ${devolutiva}`
}

// P74 Parte 9 — surpresa discreta só quando a resposta é realmente marcante.
// Determinístico: palavras de sinal forte.
function surpresaMarcante(perguntaId: string, resposta: string): string | null {
  const texto = normalizar(resposta)
  const sinais = ['demitir', 'fechar', 'vender', 'quase quebrou', 'quase fechei', 'pedem muito de mim', 'nao aguento mais', 'esgotado', 'sozinho']
  if (sinais.some((s) => texto.includes(normalizar(s)))) {
    return `Confesso que isso me surpreendeu. ${humildade(perguntaId, resposta)}`
  }
  return null
}

// ─── Devolutivas de fim de bloco — a Ponte conversa citando evidência ────────
// Chamadas quando o empresário responde a última pergunta de um bloco.
// Cada devolutiva referencia as palavras reais gravadas em `respostas`.

export function devolutivaDeBloco(bloco: BlocoConversa, respostas: Respostas): string {
  switch (bloco) {
    case 'atual': {
      const momento = r(respostas, 'empresa.momento')
      const crescer = r(respostas, 'empresa.crescer')
      const clientes = r(respostas, 'empresa.clientes')
      const partes: string[] = []
      if (momento) partes.push(`você lê o momento da empresa como "${momento}"`)
      if (crescer) partes.push(`e que o que segura o crescimento é "${crescer}"`)
      if (clientes) partes.push(`e que o que faz clientes voltarem é "${clientes}"`)
      const base = partes.length > 0
        ? `Percebi que ${partes.join(', ')}.`
        : 'Percebi como você lê o momento da empresa.'
      return `${base} Empresas geralmente travam pela complexidade, não pela falta de clientes. Essa leitura vai guiar o que vamos conversar daqui pra frente.`
    }
    case 'peso': {
      const energia = r(respostas, 'rotina.energia')
      const cabeca = r(respostas, 'rotina.cabeca')
      const previsao = r(respostas, 'financeiro.previsao')
      const dependencia = r(respostas, 'empresa.dependencia')
      const partes: string[] = []
      if (energia) partes.push(`o que mais consumiu sua energia foi "${energia}"`)
      if (cabeca) partes.push(`e o que mais ocupa sua cabeça é "${cabeca}"`)
      if (previsao) partes.push(`e, sobre o próximo mês, você me disse "${previsao}"`)
      if (dependencia) partes.push(`e me contou que, se ficasse 30 dias fora, "${dependencia}"`)
      const base = partes.length > 0
        ? `Reparei que ${partes.join('; ')}.`
        : 'Reparei onde o peso está apoiado hoje.'
      return `${base} O que consome sua energia quase sempre é também o que ocupa sua cabeça — e quando o conhecimento está só na sua cabeça, a empresa cresce até o tamanho dele. Não por acaso.`
    }
    case 'evolucao': {
      const decisao = r(respostas, 'empresa.decisao')
      const caixa = r(respostas, 'financeiro.caixa')
      const tranquilo = r(respostas, 'rotina.tranquilo')
      const partes: string[] = []
      if (decisao) partes.push(`você descobre se pode investir "${decisao}"`)
      if (caixa) partes.push(`e que, ao olhar o caixa, vê primeiro "${caixa}"`)
      if (tranquilo) partes.push(`e que a última vez que terminou o dia tranquilo foi "${tranquilo}"`)
      const base = partes.length > 0
        ? `Percebi que ${partes.join('; ')}.`
        : 'Percebi o padrão das decisões da empresa.'
      return `${base} Decisões que dependem só do momento costumam se repetir do mesmo jeito — e sem previsão, toda decisão vira aposta. É aí que a evolução costuma travar.`
    }
    case 'atencao': {
      const visao = r(respostas, 'visao.funcionando')
      const proximo = r(respostas, 'frente.proximo')
      const multiplicar = r(respostas, 'empresa.multiplicar')
      const partes: string[] = []
      if (visao) partes.push(`que, se a empresa funcionasse como você gostaria, "${visao}"`)
      if (proximo) partes.push(`que o objetivo dos próximos 6 meses é "${proximo}"`)
      if (multiplicar) partes.push(`e que você gostaria de multiplicar o cliente "${multiplicar}"`)
      const base = partes.length > 0
        ? `Entendi a direção: ${partes.join('; ')}.`
        : 'Entendi a direção que você quer dar para a empresa.'
      return `${base} Essa imagem é a direção — agora quero organizar tudo o que entendi sobre o caminho até lá.`
    }
    default:
      return obterReacao('')
  }
}
