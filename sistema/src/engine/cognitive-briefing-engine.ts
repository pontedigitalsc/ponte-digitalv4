export interface BriefingPonto {
  tipo: 'evolucao' | 'alerta' | 'pendencia' | 'aprendizado' | 'conquista'
  mensagem: string
  categoria: string
}

export interface CognitiveBriefing {
  saudacao: string
  data: string
  pontos: BriefingPonto[]
  prioridadePrincipal: string | null
  acoesPendentes: number
  evolucaoRecente: string | null
}

type DadoImpacto = { evolucaoGeral: number; areaMaisEvoluiu: { categoria: string; justificativa: string } | null; areaAtencao: { categoria: string; justificativa: string } | null }
type DadoDecisao = { titulo: string; categoria: string }
type DadoAcao = { status: string; categoria: string }
type DadoFeedback = { tipo?: string }
type DadoOutcome = { categoria: string; descricao: string }
type DadoJornada = { categoria: string; progresso: number }
type DadoAtivacao = { nivel: string; progresso: number }

function saudacaoPorNivel(nivel: string): string {
  const mapa: Record<string, string> = {
    NOVO: 'Bom dia! Ainda estamos nos conhecendo.',
    CONHECENDO: 'Bom dia! Já sei algumas coisas sobre sua empresa.',
    ATIVO: 'Bom dia! Que bom ver você de volta.',
    ENGAJADO: 'Bom dia! Estamos evoluindo juntos.',
    FUNDADOR_VALIDADO: 'Bom dia! É sempre bom encontrar quem confia na Ponte.',
  }
  return mapa[nivel] ?? 'Bom dia!'
}

export function gerarBriefing(
  dados: {
    impacto?: DadoImpacto
    decisoes?: DadoDecisao[]
    acoesAtivas?: DadoAcao[]
    feedbackRecente?: DadoFeedback[]
    topOutcomes?: DadoOutcome[]
    journeys?: DadoJornada[]
    jornada?: DadoAtivacao
  }
): CognitiveBriefing {
  const pontos: BriefingPonto[] = []
  const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  // Evolução
  if (dados.impacto && dados.impacto.evolucaoGeral > 0) {
    const area = dados.impacto.areaMaisEvoluiu
    pontos.push({
      tipo: 'evolucao',
      mensagem: area
        ? `Sua empresa evoluiu ${dados.impacto.evolucaoGeral}% — destaque para ${area.categoria.toLowerCase()}`
        : `Sua empresa evoluiu ${dados.impacto.evolucaoGeral}%`,
      categoria: 'GESTAO',
    })
  }

  // Atenção
  if (dados.impacto && dados.impacto.areaAtencao) {
    pontos.push({
      tipo: 'alerta',
      mensagem: `${dados.impacto.areaAtencao.categoria.toLowerCase()} merece atenção: ${dados.impacto.areaAtencao.justificativa}`,
      categoria: dados.impacto.areaAtencao.categoria,
    })
  }

  // Decisão principal
  if (dados.decisoes && dados.decisoes.length > 0) {
    const dec = dados.decisoes[0]
    pontos.push({
      tipo: 'alerta',
      mensagem: `Prioridade: ${dec.titulo}`,
      categoria: dec.categoria,
    })
  }

  // Ações pendentes
  const acoesPendentes = dados.acoesAtivas?.filter(a => a.status !== 'CONCLUIDA')?.length ?? 0
  if (acoesPendentes > 0) {
    pontos.push({
      tipo: 'pendencia',
      mensagem: `${acoesPendentes} aç��o(ões) aguardando retorno`,
      categoria: 'GESTAO',
    })
  }

  // Aprendizados recentes
  const feedbackNaoAjudou = dados.feedbackRecente?.filter(fb => fb.tipo === 'NAO_AJUDOU')?.length ?? 0
  const feedbackAjudou = dados.feedbackRecente?.filter(fb => fb.tipo === 'AJUDOU')?.length ?? 0
  if (feedbackNaoAjudou > 0) {
    pontos.push({
      tipo: 'aprendizado',
      mensagem: `${feedbackNaoAjudou} aprendizado(s) novo(s) com feedback negativo`,
      categoria: 'GESTAO',
    })
  }
  if (feedbackAjudou > 0) {
    pontos.push({
      tipo: 'conquista',
      mensagem: `${feedbackAjudou} confirmação(ões) — conhecimento fortalecido`,
      categoria: 'GESTAO',
    })
  }

  // Outcomes
  if (dados.topOutcomes && dados.topOutcomes.length > 0) {
    pontos.push({
      tipo: 'conquista',
      mensagem: `${dados.topOutcomes.length} resultado(s): ${dados.topOutcomes[0].descricao}`,
      categoria: dados.topOutcomes[0].categoria,
    })
  }

  // Jornadas concluídas
  const jornadasConcluidas = dados.journeys?.filter(j => j.progresso >= 100)?.length ?? 0
  if (jornadasConcluidas > 0) {
    pontos.push({
      tipo: 'conquista',
      mensagem: `${jornadasConcluidas} jornada(s) concluída(s)`,
      categoria: 'GESTAO',
    })
  }

  // Prioridade principal
  const prioridadePrincipal = dados.decisoes?.[0]?.titulo
    ?? dados.impacto?.areaAtencao?.categoria
    ?? null

  // Evolução recente
  const evolucaoRecente = dados.impacto && dados.impacto.evolucaoGeral > 0
    ? `${dados.impacto.evolucaoGeral}% de evolução`
    : null

  const nivel = dados.jornada?.nivel ?? 'NOVO'

  return {
    saudacao: saudacaoPorNivel(nivel),
    data: hoje,
    pontos,
    prioridadePrincipal,
    acoesPendentes,
    evolucaoRecente,
  }
}
