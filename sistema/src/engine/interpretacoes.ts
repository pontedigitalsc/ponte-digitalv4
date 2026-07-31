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

// ─── O que mais me chamou atenção hoje ─────────────────────────────────────
function gerarObservacao(ctx: ContextoInterpretacao): string {
  const nascer = r(ctx, 'historia.nascer')
  const comecar = r(ctx, 'historia.comecar')
  const energia = r(ctx, 'rotina.energia')
  const cabeca = r(ctx, 'rotina.cabeca')

  if (energia) {
    return `Você me contou que o que mais consumiu sua energia foi "${energia}". Reparei que o que toma sua energia também é o que mais ocupa sua cabeça — não por acaso.`
  }
  if (cabeca) {
    return `Você disse que o que mais ocupa sua cabeça hoje é "${cabeca}". Isso parece ser mais do que uma preocupação — é onde sua empresa está concentrando a atenção.`
  }
  if (nascer) {
    return `Sua empresa nasceu de "${nascer}". Pelo que você contou, essa origem ainda influencia a forma como você administra hoje.`
  }
  if (comecar) {
    return `Você começou por "${comecar}". É interessante ver como essa motivação inicial ainda aparece na sua rotina.`
  }
  return 'Pelo que você me contou, sua empresa parece viver um momento em que muita coisa depende de uma só pessoa.'
}

// ─── Existe um padrão aparecendo ──────────────────────────────────────────
function gerarPontoAtencao(ctx: ContextoInterpretacao): string {
  const pressao = r(ctx, 'rotina.pressao')
  const crescer = r(ctx, 'empresa.crescer')
  const tranquilidade = r(ctx, 'rotina.tranquilo')
  const decisao = r(ctx, 'empresa.decisao')

  if (crescer) {
    return `Você mencionou que o que impede sua empresa de crescer é "${crescer}". Esse tipo de bloqueio costuma aparecer em todas as áreas — e o primeiro passo é observar, não resolver.`
  }
  if (pressao) {
    return `Você sente maior pressão em "${pressao}". Se esse momento do dia se repetir, há um padrão que vale a pena observar nesta semana.`
  }
  if (decisao) {
    return `Você descreveu que descobre se pode investir assim: "${decisao}". Decisões assim, sem um método, costumam gerar o mesmo padrão repetidamente.`
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

  const tema = crescer ?? pressao ?? decisao ?? tranquilidade
  if (tema) {
    return `Hoje apareceu um padrão sobre "${tema}". Na próxima conversa quero descobrir se isso ainda continua acontecendo — e o que você percebeu quando passou a observar.`
  }
  return 'Hoje apareceu um padrão interessante. Quero observar isso junto com você durante esta semana. Na próxima conversa quero descobrir se algo mudou.'
}

export function interpretar(respostas: Record<string, string | null>): Interpretacoes {
  const ctx = extrairContexto(respostas)
  return {
    pontoAtencao: gerarPontoAtencao(ctx),
    observacao: gerarObservacao(ctx),
    alinhamento: gerarAlinhamento(ctx),
  }
}

// ─── Resumo Natural — carta estruturada, sempre terminando aberta ─────────

function gerarSecao1(ctx: ContextoInterpretacao): string {
  const nascer = r(ctx, 'historia.nascer')
  const comecar = r(ctx, 'historia.comecar')
  const rotina = r(ctx, 'rotina.dia')

  const partes: string[] = []
  if (nascer) partes.push(`sua empresa nasceu de "${nascer}"`)
  if (comecar) partes.push(`você começou por "${comecar}"`)
  if (rotina) partes.push(`seu dia costuma começar "${rotina}"`)

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
    pontos.push({ evidencia: `O momento de maior pressão: "${pressao}"`, analise: 'Esse tipo de pressão raramente aparece sozinho — costuma estar ligado a como a empresa está estruturada.' })
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
    return `Durante uma semana, apenas observe: quantas vezes o bloqueio de "${crescer}" aparece na sua semana. Não precisa resolver — só anote quando aparecer.`
  }
  if (pressao) {
    return `Durante uma semana, observe o momento de maior pressão ("${pressao}"). Não precisa mudar nada — só perceber quando ele acontece e o que vem antes.`
  }
  return 'Durante uma semana, escolha uma única coisa para observar — só observar, sem querer resolver. O simples registro já revela padrões.'
}

export function gerarResumoNatural(respostas: Record<string, string | null>, interpretacoes: Interpretacoes): ResumoNatural {
  const ctx = extrairContexto(respostas)
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
      titulo: 'Ainda não sei',
      lacunas: gerarSecao4(ctx),
    },
    secao5: {
      titulo: 'Para sua próxima semana',
      acao: gerarSecao5(ctx),
    },
  }
}
