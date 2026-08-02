import { buscarSituacaoEmpresa } from './cognitive-context-engine'

// ─── P53 — PILAR 2: A PONTE RECONHECE MOMENTOS ───────────────────────────────
// O objetivo não é identificar emoções. É compreender o contexto empresarial.
// A conversa muda quando percebe a empresa crescendo, desacelerando, estagnada,
// sobrecarregada, comemorando ou em recuperação — cada momento gera uma postura
// diferente. Tudo derivado de dados reais, sem invenção.

export type MomentoEmpresa =
  | 'CRESCENDO'
  | 'DESACELERANDO'
  | 'ESTAGNADA'
  | 'SOBRECARREGADA'
  | 'COMEMORANDO'
  | 'EM_RECUPERACAO'

export interface MomentoDetectado {
  momento: MomentoEmpresa
  rotulo: string
  postura: string
  razao: string
}

const MOMENTO_INFO: Record<MomentoEmpresa, { rotulo: string; postura: string }> = {
  CRESCENDO: {
    rotulo: 'Sua empresa está crescendo',
    postura: 'Talvez seja hora de organizar processos antes que o crescimento vire desorganização. Vamos olhar juntos o que precisa de estrutura.',
  },
  DESACELERANDO: {
    rotulo: 'Sua empresa está desacelerando',
    postura: 'Vamos entender juntos o que mudou antes de tomar decisões precipitadas.',
  },
  ESTAGNADA: {
    rotulo: 'Sua empresa está em um platô',
    postura: 'Nenhuma mudança brusca — e isso também é informação. O próximo movimento pode vir de onde você menos espera.',
  },
  SOBRECARREGADA: {
    rotulo: 'Sua empresa está sobrecarregada',
    postura: 'Há mais peso no dia a dia do que deveria. Antes de qualquer recomendação, precisamos tirar um pouco de pressão de você.',
  },
  COMEMORANDO: {
    rotulo: 'Sua empresa tem motivos para comemorar',
    postura: 'Vale registrar o que deu certo — para repetir com consciência, não por acaso.',
  },
  EM_RECUPERACAO: {
    rotulo: 'Sua empresa está se recuperando',
    postura: 'Depois de um período difícil, o movimento voltou. Vamos consolidar essa recuperação antes de mirar mais alto.',
  },
}

export async function detectarMomentoEmpresa(empresaId: string): Promise<MomentoDetectado> {
  const situacao = await buscarSituacaoEmpresa(empresaId)
  const {
    variacaoReceita,
    temLeadsQuentes,
    temTarefasAtrasadas,
    temClientesInadimplentes,
    temTransacoesRecentes,
    diasSemRegistroFinanceiro,
  } = situacao

  let momento: MomentoEmpresa
  let razao: string

  // Pressão operacional vem antes de qualquer leitura de receita: quando o dia
  // a dia já está pesado, essa é a realidade a ser acolhida primeiro.
  if (temTarefasAtrasadas || temClientesInadimplentes || diasSemRegistroFinanceiro >= 30) {
    momento = 'SOBRECARREGADA'
    razao =
      temTarefasAtrasadas && temClientesInadimplentes
        ? 'Há tarefas atrasadas e clientes inadimplentes ao mesmo tempo'
        : temTarefasAtrasadas
          ? 'Há tarefas atrasadas acumuladas no dia a dia'
          : temClientesInadimplentes
            ? 'Há clientes inadimplentes no cadastro'
            : 'Faz 30 dias ou mais sem registro financeiro'
  } else if (temLeadsQuentes && variacaoReceita !== null && variacaoReceita >= 0) {
    momento = 'COMEMORANDO'
    razao = 'Há negociações em andamento e o faturamento não caiu no mês'
  } else if (variacaoReceita !== null && variacaoReceita >= 20) {
    momento = 'CRESCENDO'
    razao = `O faturamento cresceu ${variacaoReceita}% em relação ao mês anterior`
  } else if (variacaoReceita !== null && variacaoReceita <= -15) {
    momento = temTransacoesRecentes ? 'EM_RECUPERACAO' : 'DESACELERANDO'
    razao = temTransacoesRecentes
      ? `O faturamento caiu ${Math.abs(variacaoReceita)}%, mas a operação voltou a se movimentar`
      : `O faturamento caiu ${Math.abs(variacaoReceita)}% em relação ao mês anterior`
  } else {
    momento = 'ESTAGNADA'
    razao =
      variacaoReceita !== null
        ? 'Sem variação relevante de receita no mês'
        : 'Ainda estamos juntando os primeiros registros da sua empresa'
  }

  return { momento, razao, ...MOMENTO_INFO[momento] }
}
