import type { Interpretacoes, ResumoNatural } from '@/engine/tipos'

interface ContextoInterpretacao {
  respostas: Record<string, string | null>
  blocoEmpresa: Record<string, string | null>
  blocoGestao: Record<string, string | null>
  blocoProblemas: Record<string, string | null>
  blocoObjetivos: Record<string, string | null>
}

function extrairContexto(respostas: Record<string, string | null>): ContextoInterpretacao {
  return {
    respostas,
    blocoEmpresa: {
      segmento: respostas['empresa.segmento'],
      tempo: respostas['empresa.tempo'],
      funcionarios: respostas['empresa.funcionarios'],
      faturamento: respostas['empresa.faturamento'],
    },
    blocoGestao: {
      caixa: respostas['gestao.caixa'],
      contratacao: respostas['gestao.contratacao'],
      promocao: respostas['gestao.promocao'],
      decisao: respostas['gestao.decisao'],
    },
    blocoProblemas: {
      insonia: respostas['problemas.insonia'],
      repeticao: respostas['problemas.repeticao'],
      perda: respostas['problemas.perda'],
    },
    blocoObjetivos: {
      meta: respostas['objetivos.meta'],
      automatizar: respostas['objetivos.automatizar'],
      delegar: respostas['objetivos.delegar'],
    },
  }
}

function gerarPontoAtencao(ctx: ContextoInterpretacao): string {
  const insonia = ctx.blocoProblemas.insonia
  if (insonia) return `Você mencionou que "${insonia.toLowerCase()}". Isso costuma estar ligado a como o negócio está estruturado hoje — e é um bom ponto de partida para priorizar mudanças.`
  return 'Seu maior desafio parece estar relacionado à forma como o negócio é conduzido no dia a dia.'
}

function gerarObservacao(ctx: ContextoInterpretacao): string {
  const caixa = ctx.blocoGestao.caixa?.toLowerCase() ?? ''
  if (/\bsó quando falta\b/.test(caixa) || /\bfalta\b/.test(caixa)) {
    return 'Você disse que acompanha o caixa "só quando falta dinheiro". Essa é uma das principais causas de empresas saudáveis quebrarem sem aviso — vale a pena criar o hábito de olhar semanalmente.'
  }
  if (/\bsemanal(mente)?\b/.test(caixa)) {
    return 'Você acompanha o caixa semanalmente. Esse hábito já coloca você à frente de muitos empresários.'
  }
  if (/\bdiari[aoa]mente\b/.test(caixa)) {
    return 'Você acompanha o caixa diariamente. Esse nível de controle faz diferença em momentos de aperto.'
  }

  const horas = parseInt(ctx.respostas['operacao.horas'] ?? '0', 10) || 0
  if (horas > 10) {
    return `Você dedica cerca de ${horas}h por dia ao negócio. Com essa carga, é importante identificar tarefas que podem ser automatizadas ou delegadas — senão o desgaste compromete as decisões.`
  }

  return 'Pelo que você me contou, sua gestão parece ser focada no essencial — mas alguns hábitos podem fazer grande diferença.'
}

function gerarAlinhamento(ctx: ContextoInterpretacao): string {
  const meta = ctx.blocoObjetivos.meta
  const insonia = ctx.blocoProblemas.insonia
  if (meta && insonia) {
    return `Seu objetivo de "${meta.toLowerCase()}" é compatível com o momento da sua empresa — desde que o desafio de "${insonia.toLowerCase()}" seja tratado primeiro. Um passo de cada vez.`
  }
  if (meta) {
    return `Seu objetivo de "${meta.toLowerCase()}" está alinhado com o que você me contou sobre sua empresa. Com organização, é um caminho factível.`
  }
  return 'Seus objetivos e desafios atuais formam um retrato coerente de uma empresa em movimento.'
}

export function interpretar(respostas: Record<string, string | null>): Interpretacoes {
  const ctx = extrairContexto(respostas)
  return {
    pontoAtencao: gerarPontoAtencao(ctx),
    observacao: gerarObservacao(ctx),
    alinhamento: gerarAlinhamento(ctx),
  }
}

function gerarSecao1(ctx: ContextoInterpretacao): string {
  const segmento = ctx.blocoEmpresa.segmento?.toLowerCase() ?? 'negocio'
  const tempo = ctx.blocoEmpresa.tempo?.toLowerCase() ?? 'algum tempo'
  const funcionarios = ctx.blocoEmpresa.funcionarios?.toLowerCase() ?? 'alguns funcionarios'

  return `Pelo que voce me contou, seu ${segmento} esta ha ${tempo} com ${funcionarios}. Voce sente que poderia render mais, mas ainda falta clareza sobre alguns pontos importantes.`
}

function gerarSecao4(ctx: ContextoInterpretacao): string[] {
  const lacunas: string[] = []
  const caixa = ctx.blocoGestao.caixa?.toLowerCase() ?? ''
  if (!caixa || /\bs[oó] quando falta\b/.test(caixa)) {
    lacunas.push('Como esta seu fluxo de caixa real no dia a dia')
  }
  if (!ctx.blocoEmpresa.faturamento) {
    lacunas.push('Qual e o faturamento medio mensal com precisao')
  }
  if (lacunas.length === 0) {
    lacunas.push('Alguns detalhes operacionais que so aparecem com o uso continuo')
  }
  return lacunas.slice(0, 2)
}

function gerarSecao5(ctx: ContextoInterpretacao): string {
  const automatizar = ctx.blocoObjetivos.automatizar
  if (automatizar) {
    return `Comece anotando durante uma semana tudo que entra e sai de dinheiro — mesmo que seja no papel. Esse simples habito ja responde metade das perguntas que voce esta se fazendo.`
  }
  const insonia = ctx.blocoProblemas.insonia
  if (insonia) {
    return `Identifique qual dos problemas que voce mencionou acontece com mais frequencia e comece a registrar cada ocorrencia durante uma semana. So o registro ja vai te dar mais clareza.`
  }
  return `Comece observando seu negocio por uma semana com um caderno ao lado. Anote tudo que chama sua atencao — o simples habito de registrar ja revela padroes.`
}

export function gerarResumoNatural(respostas: Record<string, string | null>, interpretacoes: Interpretacoes): ResumoNatural {
  const ctx = extrairContexto(respostas)
  return {
    secao1: {
      titulo: 'Pelo que voce me contou',
      paragrafo: gerarSecao1(ctx),
    },
    secao2: {
      titulo: 'Duas coisas que me chamaram atencao',
      pontos: [
        { evidencia: interpretacoes.pontoAtencao, analise: interpretacoes.observacao },
      ],
    },
    secao3: {
      titulo: 'Uma coisa que voce acertou',
      paragrafo: interpretacoes.alinhamento,
    },
    secao4: {
      titulo: 'Ainda nao sei',
      lacunas: gerarSecao4(ctx),
    },
    secao5: {
      titulo: 'Se eu fosse voce',
      acao: gerarSecao5(ctx),
    },
  }
}
