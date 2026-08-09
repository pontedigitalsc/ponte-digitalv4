import type { Interpretacoes, ResumoNatural } from '@/engine/tipos'

// ─────────────────────────────────────────────────────────────────────────────
// INTERPRETAÇÕES — P49 Carta Nunca Termina
//
// Corrige o débito Tipo C: usava ids de um fluxo antigo (empresa.segmento,
// gestao.caixa, problemas.insonia) que não existem mais no fluxo real
// (historia.nascer, rotina.dia, empresa.clientes, frente.proximo). A carta
// agora é construída com as respostas REAIS da Primeira Conversa.
//
// Toda carta termina aberta — prepara a próxima conversa. Nunca fecha.
// ─────────────────────────────────────────────────────────────────────────────

interface ContextoInterpretacao {
  respostas: Record<string, string | null>
}

function extrairContexto(respostas: Record<string, string | null>): ContextoInterpretacao {
  return { respostas }
}

function r(ctx: ContextoInterpretacao, id: string): string | null {
  return ctx.respostas[id]?.trim() || null
}

// ─── Contexto Founder — P86-B2 ────────────────────────────────────────────
// O fluxo `configuracao-founder` responde ao sujeito FOUNDER_PRINCIPAL. As
// leituras abaixo usam os MESMOS princípios da carta P49 (toda carta termina
// aberta), mas alimentadas pelos ids desse fluxo. A guarda `ehConversaFounder`
// impede qualquer interferência na Primeira Conversa.

function ehConversaFounder(respostas: Record<string, string | null>): boolean {
  return !!respostas['fundador.papel']?.trim() || !!respostas['fluxo.afastamento']?.trim() || !!respostas['atencao.mudanca']?.trim()
}

function gerarObservacaoFounder(ctx: ContextoInterpretacao): string {
  const papel = r(ctx, 'fundador.papel')
  const momento = r(ctx, 'realidade.momento')
  const uso = r(ctx, 'realidade.uso')

  if (momento) {
    return `Você descreveu a Ponte neste momento como "${momento}". A forma como você lê esse momento costuma guiar o que você decide construir a seguir.`
  }
  if (uso) {
    return `Você me contou como a Ponte é usada hoje: "${uso}". Observar como quem usa recebe o que você construiu é onde começa qualquer leitura honesta.`
  }
  if (papel) {
    return `Você se apresentou como "${papel}". Pelo que você contou, essa origem ainda influencia as decisões que toma hoje.`
  }
  return 'Pelo que você me contou, a Ponte ainda vive um momento em que muita coisa depende de uma só pessoa — a sua.'
}

function gerarPontoAtencaoFounder(ctx: ContextoInterpretacao): string {
  const trava = r(ctx, 'decisoes.trava')
  const afastamento = r(ctx, 'fluxo.afastamento')
  const mudanca = r(ctx, 'atencao.mudanca')

  if (trava) {
    return `Você nomeou como grande trava hoje "${trava}". Travas têm nome e história — nomeá-las é o primeiro passo de observação.`
  }
  if (afastamento) {
    return `Você me disse que, se se afastasse por trinta dias, a Ponte "${afastamento}". Esse cenário mostra onde a Ponte ainda precisa ficar mais de pé sozinha.`
  }
  if (mudanca) {
    return `Você disse que, se pudesse mudar uma única coisa, mudaria "${mudanca}". Uma coisa só já é um padrão em construção — quero observar com você.`
  }
  return 'Existe uma concentração grande de decisões e contexto em você. Quando tudo passa por uma pessoa, a Ponte fica limitada ao que uma pessoa consegue carregar.'
}

function gerarAlinhamentoFounder(ctx: ContextoInterpretacao): string {
  const sucesso = r(ctx, 'atencao.sucesso')
  const registro = r(ctx, 'evolucao.registro')
  const interesse = r(ctx, 'atencao.nao_dito')

  if (sucesso) {
    return `Você disse que vai saber que a mudança funcionou quando "${sucesso}". Proteger essa resposta é o menor movimento que pode melhorar sua próxima semana.`
  }
  if (registro) {
    return `Você me disse que o conhecimento da Ponte mora "${registro}". Tirar uma parte disso da cabeça já é um começo concreto.`
  }
  if (interesse) {
    return `Você contou que ainda não sente que merece a atenção que quer — e é exatamente isso que quero observar com você até que a resposta fique mais clara.`
  }
  return 'O menor movimento que pode melhorar sua próxima semana é escolher uma única coisa para observar com atenção.'
}

// ─── O que mais me chamou atenção hoje ─────────────────────────────────────
function gerarObservacao(ctx: ContextoInterpretacao): string {
  const nascer = r(ctx, 'historia.nascer')
  const energia = r(ctx, 'rotina.energia')
  const cabeca = r(ctx, 'rotina.cabeca')
  const momento = r(ctx, 'empresa.momento')

  if (momento) {
    return `Você descreveu o momento da sua empresa como "${momento}". A forma como você lê esse momento costuma guiar as decisões que vêm pela frente.`
  }
  if (energia) {
    return `Você me contou que o que mais consumiu sua energia foi "${energia}". Reparei que o que toma sua energia também é o que mais ocupa sua cabeça — não por acaso.`
  }
  if (cabeca) {
    return `Você disse que o que mais ocupa sua cabeça hoje é "${cabeca}". Isso parece ser mais do que uma preocupação — é onde sua empresa está concentrando a atenção.`
  }
  if (nascer) {
    return `Sua empresa nasceu de "${nascer}". Pelo que você contou, essa origem ainda influencia a forma como você administra hoje.`
  }
  return 'Pelo que você me contou, sua empresa parece viver um momento em que muita coisa depende de uma só pessoa.'
}

// ─── Existe um padrão aparecendo ──────────────────────────────────────────
function gerarPontoAtencao(ctx: ContextoInterpretacao): string {
  const pressao = r(ctx, 'rotina.pressao')
  const crescer = r(ctx, 'empresa.crescer')
  const tranquilidade = r(ctx, 'rotina.tranquilo')
  const decisao = r(ctx, 'empresa.decisao')
  const preocupacao = r(ctx, 'empresa.preocupacao')

  if (preocupacao) {
    return `Você disse que sua maior preocupação hoje é "${preocupacao}". Preocupações têm raiz — encontrar a raiz costuma ser o primeiro passo.`
  }
  if (crescer) {
    return `Você mencionou que o que impede sua empresa de crescer é "${crescer}". Esse tipo de coisa costuma aparecer em várias áreas da empresa — e o primeiro passo é observar, não tentar resolver de uma vez.`
  }
  if (pressao) {
    return `Você sente maior pressão em "${pressao}". Se esse momento do dia se repetir, há um padrão que vale a pena observar nesta semana.`
  }
  if (decisao) {
    return `Você descreveu que descobre se pode investir assim: "${decisao}". Decisões que dependem só do momento costumam se repetir do mesmo jeito.`
  }
  if (tranquilidade) {
    return `Você mencionou que a última vez que terminou o dia tranquilo foi "${tranquilidade}". O intervalo entre esses momentos é um padrão que quero observar.`
  }
  return 'Existe uma concentração grande de decisões em você. Quando tudo passa por uma pessoa, a empresa fica limitada ao que uma pessoa consegue fazer.'
}

// ─── O que mais admirei / o menor movimento ───────────────────────────────
function gerarAlinhamento(ctx: ContextoInterpretacao): string {
  const orgulho = r(ctx, 'historia.orgulho')
  const funcionou = r(ctx, 'frente.funcionou')
  const proximo = r(ctx, 'frente.proximo')
  const clientes = r(ctx, 'empresa.clientes')

  if (orgulho) {
    return `Você tem orgulho de "${orgulho}". É nesse ponto que a empresa já tem força — e é onde qualquer próximo movimento encontra sustentação.`
  }
  if (funcionou) {
    return `Você disse que o que funcionou melhor do que esperava foi "${funcionou}". Repetir isso com consciência é o menor movimento que pode melhorar sua próxima semana.`
  }
  if (clientes) {
    return `Você disse que o que mais faz clientes voltarem é "${clientes}". Proteger essa qualidade é o menor movimento que pode melhorar sua próxima semana.`
  }
  if (proximo) {
    return `Seu objetivo para os próximos meses é "${proximo}". Comece observando uma única coisa que o aproxime disso a cada dia.`
  }
  return 'O menor movimento que pode melhorar sua próxima semana é escolher uma única coisa para observar com atenção.'
}

function gerarContinuidade(ctx: ContextoInterpretacao): string {
  const crescer = r(ctx, 'empresa.crescer')
  const pressao = r(ctx, 'rotina.pressao')
  const decisao = r(ctx, 'empresa.decisao')
  const tranquilidade = r(ctx, 'rotina.tranquilo')
  const preocupacao = r(ctx, 'empresa.preocupacao')

  const tema = preocupacao ?? crescer ?? pressao ?? decisao ?? tranquilidade
  if (tema) {
    return `Hoje apareceu um padrão sobre "${tema}". Na próxima conversa quero descobrir se isso ainda continua acontecendo — e o que você percebeu quando passou a observar.`
  }
  return 'Hoje apareceu um padrão interessante. Quero observar isso junto com você durante esta semana. Na próxima conversa quero descobrir se algo mudou.'
}

export function interpretar(respostas: Record<string, string | null>): Interpretacoes {
  const ctx = extrairContexto(respostas)
  if (ehConversaFounder(respostas)) {
    return {
      pontoAtencao: gerarPontoAtencaoFounder(ctx),
      observacao: gerarObservacaoFounder(ctx),
      alinhamento: gerarAlinhamentoFounder(ctx),
    }
  }
  return {
    pontoAtencao: gerarPontoAtencao(ctx),
    observacao: gerarObservacao(ctx),
    alinhamento: gerarAlinhamento(ctx),
  }
}

// ─── Resumo Natural — carta estruturada, sempre terminando aberta ─────────

function gerarSecao1(ctx: ContextoInterpretacao): string {
  const nascer = r(ctx, 'historia.nascer')
  const nome = r(ctx, 'empresa.nome')
  const oque = r(ctx, 'empresa.oque')
  const haquanto = r(ctx, 'empresa.haquanto')
  const momento = r(ctx, 'empresa.momento')

  const partes: string[] = []
  if (nome && oque) partes.push(`sua empresa é "${nome}", e ela se explica assim: "${oque}"`)
  else if (nome) partes.push(`sua empresa se chama "${nome}"`)
  else if (oque) partes.push(`sua empresa se explica assim: "${oque}"`)
  if (haquanto) partes.push(`ela existe há "${haquanto}"`)
  if (momento) partes.push(`você vive este momento como: "${momento}"`)
  if (nascer) partes.push(`sua empresa nasceu de "${nascer}"`)

  if (partes.length > 0) {
    return `Pelo que você me contou, ${partes.join('; e ')}. Isso já me dá um retrato inicial de como você conduz sua empresa.`
  }
  return 'Pelo que você me contou, sua empresa está em um momento importante da sua trajetória — e esse retrato inicial vai ficar mais nítido a cada conversa.'
}

function gerarSecao2(ctx: ContextoInterpretacao, interpretacoes: Interpretacoes): { evidencia: string; analise: string }[] {
  const pontos: { evidencia: string; analise: string }[] = [
    { evidencia: interpretacoes.pontoAtencao, analise: interpretacoes.observacao },
  ]
  const pressao = r(ctx, 'rotina.pressao')
  if (pressao) {
    pontos.push({ evidencia: `O momento de maior pressão: "${pressao}"`, analise: 'Esse tipo de pressão raramente aparece sozinho — quase sempre vem do jeito que a empresa é tocada no dia a dia.' })
  }
  return pontos
}

function gerarSecao3(ctx: ContextoInterpretacao, interpretacoes: Interpretacoes): string {
  return interpretacoes.alinhamento
}

function gerarSecao4(ctx: ContextoInterpretacao): string[] {
  const lacunas: string[] = []
  if (!r(ctx, 'empresa.decisao')) lacunas.push('Como você decide onde investir o tempo e o dinheiro')
  if (!r(ctx, 'frente.proximo')) lacunas.push('Qual é o objetivo concreto para os próximos meses')
  if (!r(ctx, 'empresa.crescer')) lacunas.push('O que exatamente trava o crescimento da empresa')
  if (lacunas.length === 0) lacunas.push('Alguns detalhes que só aparecem com o tempo — e com mais conversas')
  return lacunas.slice(0, 2)
}

function gerarSecao5(ctx: ContextoInterpretacao): string {
  const crescer = r(ctx, 'empresa.crescer')
  const pressao = r(ctx, 'rotina.pressao')
  if (crescer) {
    return `Durante uma semana, apenas observe: quantas vezes aquele assunto aparece na sua semana — "${crescer}". Não precisa resolver, só anote quando ele aparecer.`
  }
  if (pressao) {
    return `Durante uma semana, observe o momento de maior pressão ("${pressao}"). Não precisa mudar nada — só perceber quando ele acontece e o que vem antes.`
  }
  return 'Durante uma semana, escolha uma única coisa para observar — só observar, sem querer resolver. Só o fato de você registrar já mostra coisas que antes passavam despercebidas.'
}

export function gerarResumoNatural(respostas: Record<string, string | null>, interpretacoes: Interpretacoes): ResumoNatural {
  const ctx = extrairContexto(respostas)
  if (ehConversaFounder(respostas)) {
    return {
      secao1: {
        titulo: 'Pelo que você me contou',
        paragrafo: gerarSecao1Founder(ctx),
      },
      secao2: {
        titulo: 'Duas coisas que me chamaram a atenção',
        pontos: gerarSecao2Founder(ctx, interpretacoes),
      },
      secao3: {
        titulo: 'Algo em que você aposta',
        paragrafo: gerarSecao3Founder(ctx),
      },
      secao4: {
        titulo: 'O que ainda quero entender',
        lacunas: gerarSecao4Founder(ctx),
      },
      secao5: {
        titulo: 'Para sua próxima semana',
        acao: gerarSecao5Founder(ctx),
      },
    }
  }
  return {
    secao1: {
      titulo: 'Pelo que você me contou',
      paragrafo: gerarSecao1(ctx),
    },
    secao2: {
      titulo: 'Duas coisas que me chamaram atenção',
      pontos: gerarSecao2(ctx, interpretacoes),
    },
    secao3: {
      titulo: 'Uma coisa que você acertou',
      paragrafo: gerarSecao3(ctx, interpretacoes),
    },
    secao4: {
      titulo: 'O que ainda quero entender',
      lacunas: gerarSecao4(ctx),
    },
    secao5: {
      titulo: 'Para sua próxima semana',
      acao: gerarSecao5(ctx),
    },
  }
}

// ─── Resumo Natural no contexto Founder (P86-B2) ──────────────────────────

function gerarSecao1Founder(ctx: ContextoInterpretacao): string {
  const papel = r(ctx, 'fundador.papel')
  const momento = r(ctx, 'realidade.momento')
  const uso = r(ctx, 'realidade.uso')

  const partes: string[] = []
  if (papel) partes.push(`você se apresentou na Ponte como "${papel}"`)
  if (momento) partes.push(`descreve a Ponte hoje como "${momento}"`)
  if (uso) partes.push(`contou que ela é usada assim: "${uso}"`)

  if (partes.length > 0) {
    return `Pelo que você me contou, ${partes.join('; e ')}. Isso já me dá um retrato inicial de como você olha para a Ponte.`
  }
  return 'Pelo que você me contou, a Ponte está em um momento decisivo da sua trajetória — esse retrato ficará mais nítido a cada conversa.'
}

function gerarSecao2Founder(ctx: ContextoInterpretacao, interpretacoes: Interpretacoes): { evidencia: string; analise: string }[] {
  const pontos: { evidencia: string; analise: string }[] = [
    { evidencia: interpretacoes.pontoAtencao, analise: interpretacoes.observacao },
  ]
  const afastamento = r(ctx, 'fluxo.afastamento')
  if (afastamento) {
    pontos.push({ evidencia: `Se você se afastasse por trinta dias: "${afastamento}"`, analise: 'O que acontece na sua ausência é a medida mais honesta de como a Ponte está consolidada.' })
  }
  return pontos
}

function gerarSecao3Founder(ctx: ContextoInterpretacao): string {
  const aprendizado = r(ctx, 'evolucao.aprendizado')
  const mudanca = r(ctx, 'atencao.mudanca')
  if (aprendizado) {
    return `Você apontou como o aprendizado mais valioso até aqui "${aprendizado}". Esse é um ponto de força sobre o qual construir — e proteger.`
  }
  if (mudanca) {
    return `Você sabe exatamente o que gostaria de mudar primeiro — "${mudanca}". Saber o primeiro passo já é uma aposta clara.`
  }
  return 'Você anda construindo uma visão — e a visão é a aposta mais forte desta fase.'
}

function gerarSecao4Founder(ctx: ContextoInterpretacao): string[] {
  const lacunas: string[] = []
  if (!r(ctx, 'realidade.uso')) lacunas.push('Como a Ponte é usada hoje, na prática')
  if (!r(ctx, 'decisoes.trava')) lacunas.push('Qual é a principal trava de recursos ou direção')
  if (!r(ctx, 'atencao.mudanca')) lacunas.push('O que você quer mudar primeiro na Ponte')
  if (lacunas.length === 0) lacunas.push('Alguns detalhes que só aparecem com o tempo — e com mais conversas')
  return lacunas.slice(0, 2)
}

function gerarSecao5Founder(ctx: ContextoInterpretacao): string {
  const travada = r(ctx, 'decisoes.trava')
  const mudanca = r(ctx, 'atencao.mudanca')
  const sucesso = r(ctx, 'atencao.sucesso')
  if (travada) {
    return `Durante uma semana, apenas observe: quantas vezes "${travada}" aparece nas suas decisões. Não precisa resolver — só anote quando ela aparecer.`
  }
  if (mudanca) {
    return `Durante uma semana, observe as vezes em que "${mudanca}" entra na conversa. Não muda nada — só perceba quando e o que vem antes.`
  }
  if (sucesso) {
    return `Durante uma semana, preste atenção em quando "${sucesso}" acontece — um encontro, uma resposta espontânea. Só observe.`
  }
  return 'Durante uma semana, escolha uma única coisa para observar — só observar, sem querer resolver. O simples registro já traz respostas que passavam despercebidas.'
}
