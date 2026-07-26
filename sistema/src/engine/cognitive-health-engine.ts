export interface HealthScoreItem {
  rotulo: string
  valor: number
  peso: number
}

export interface HealthScore {
  score: number
  distribuicao: HealthScoreItem[]
  pontosFortes: string[]
  pontosFracos: string[]
  recomendacoes: string[]
  tendencia: 'positiva' | 'estavel' | 'negativa'
}

type DadoImpacto = { evolucaoGeral: number; mudancasPositivas: Array<{ categoria: string }>; mudancasNegativas: Array<{ categoria: string }> }
type DadoAtivacao = { nivel: string; progresso: number }
type DadoAuditoria = { conhecimentosPromovidos: number; totalConhecimentos: number; scoreMedio: number }
type DadoAcao = { status: string }
type DadoFeedback = { tipo?: string }

export function calcularHealthScore(
  dados: {
    impacto?: DadoImpacto
    jornada?: DadoAtivacao
    auditoria?: DadoAuditoria
    acoesAtivas?: DadoAcao[]
    feedbackRecente?: DadoFeedback[]
  }
): HealthScore {
  const items: HealthScoreItem[] = []

  // 1. Ativação (peso 30)
  const ativacaoProgresso = dados.jornada?.progresso ?? 0
  items.push({ rotulo: 'Ativação', valor: ativacaoProgresso, peso: 30 })

  // 2. Evolução (peso 25)
  const evolucao = dados.impacto?.evolucaoGeral ?? 0
  items.push({ rotulo: 'Evolução', valor: evolucao, peso: 25 })

  // 3. Conhecimento (peso 20)
  const scoreConhecimento = dados.auditoria?.scoreMedio ?? 0
  items.push({ rotulo: 'Informações', valor: scoreConhecimento, peso: 20 })

  // 4. Ações concluídas (peso 15)
  const totalAcoes = dados.acoesAtivas?.length ?? 0
  const concluidas = dados.acoesAtivas?.filter(a => a.status === 'CONCLUIDA')?.length ?? 0
  const taxaConclusao = totalAcoes > 0 ? Math.round((concluidas / totalAcoes) * 100) : dados.impacto?.evolucaoGeral ?? 50
  items.push({ rotulo: 'Execução', valor: taxaConclusao, peso: 15 })

  // 5. Feedback (peso 10)
  const totalFeedback = dados.feedbackRecente?.length ?? 0
  const feedbackPositivo = dados.feedbackRecente?.filter(fb => fb.tipo === 'AJUDOU')?.length ?? 0
  const taxaFeedback = totalFeedback > 0 ? Math.round((feedbackPositivo / totalFeedback) * 100) : 50
  items.push({ rotulo: 'Aprendizado', valor: taxaFeedback, peso: 10 })

  // Score total (0-100)
  const scoreTotal = items.reduce((acc, item) => acc + Math.round(item.valor * item.peso / 100), 0)

  // Pontos fortes (score > 60)
  const pontosFortes = items
    .filter(i => i.valor >= 60)
    .map(i => i.rotulo)

  // Pontos fracos (score < 40)
  const pontosFracos = items
    .filter(i => i.valor < 40)
    .map(i => i.rotulo)

  // Tendência
  const tendencia = (dados.impacto?.mudancasPositivas?.length ?? 0) > (dados.impacto?.mudancasNegativas?.length ?? 0)
    ? 'positiva' as const
    : (dados.impacto?.mudancasNegativas?.length ?? 0) > (dados.impacto?.mudancasPositivas?.length ?? 0)
      ? 'negativa' as const
      : 'estavel' as const

  // Recomendações
  const recomendacoes: string[] = []
  if (pontosFracos.includes('Ativação')) {
    recomendacoes.push('Avançar no nível de ativação com conversas frequentes')
  }
  if (pontosFracos.includes('Evolução')) {
    recomendacoes.push('Focar nas áreas com maior potencial de evolução')
  }
  if (pontosFracos.includes('Conhecimento')) {
    recomendacoes.push('Validar hipóteses para fortalecer o conhecimento')
  }
  if (pontosFracos.includes('Execução')) {
    recomendacoes.push('Concluir ações pendentes para melhorar a execução')
  }
  if (pontosFracos.includes('Aprendizado')) {
    recomendacoes.push('Fornecer feedback para acelerar o aprendizado')
  }
  if (recomendacoes.length === 0) {
    recomendacoes.push('Manter o ritmo atual — evolução consistente')
  }

  return {
    score: Math.min(100, Math.max(0, scoreTotal)),
    distribuicao: items,
    pontosFortes,
    pontosFracos,
    recomendacoes,
    tendencia,
  }
}
