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
