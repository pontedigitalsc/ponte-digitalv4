export type NotificacaoPrioridade = 'urgente' | 'importante' | 'informativa'

export interface CognitiveNotification {
  id: string
  titulo: string
  descricao: string
  categoria: string
  prioridade: NotificacaoPrioridade
  origem: string
  cta?: { rotulo: string; href: string }
  lida: boolean
  criadaEm: Date
  expiraEm?: Date
}

type DadoFeedback = { tipo?: string; acao?: { titulo?: string; categoria?: string }; criadoEm?: string | Date }
type DadoAcao = { titulo: string; status: string; categoria: string; criadaEm?: string | Date; dataVencimento?: string | Date | null }
type DadoOutcome = { categoria: string; descricao: string; criadoEm?: string | Date }
type DadoDecisao = { titulo: string; motivo: string; categoria: string; confianca: number }
type DadoJornada = { categoria: string; titulo: string; progresso: number }
type DadoAtivacao = { nivel: string; progresso: number; eventos: string[]; proximosPassos: string[] }
type DadoAuditoria = { conhecimentosPromovidos: number; totalConhecimentos: number; scoreMedio: number }

let contadorNotif = 0

function gerarId(): string {
  return `notif_${++contadorNotif}_${Date.now()}`
}

function diasDesde(data: Date | string | undefined): number {
  if (!data) return 999
  const d = new Date(data)
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24))
}

export function gerarNotificacoes(
  dados: {
    decisoes?: DadoDecisao[]
    acoesAtivas?: DadoAcao[]
    feedbackRecente?: DadoFeedback[]
    topOutcomes?: DadoOutcome[]
    jornada?: DadoAtivacao
    auditoria?: DadoAuditoria
    journeys?: DadoJornada[]
  }
): CognitiveNotification[] {
  const notificacoes: CognitiveNotification[] = []
  const agora = new Date()

  // Ações paradas há mais de 7 dias
  for (const acao of dados.acoesAtivas ?? []) {
    const dias = diasDesde(acao.criadaEm)
    if (dias >= 7 && acao.status === 'PENDENTE') {
      notificacoes.push({
        id: gerarId(),
        titulo: 'Ação parada',
        descricao: `"${acao.titulo}" está pendente há ${dias} dias`,
        categoria: acao.categoria,
        prioridade: dias >= 14 ? 'urgente' : 'importante',
        origem: 'Action Engine',
        cta: { rotulo: 'Ver ação', href: '/tarefas' },
        lida: false,
        criadaEm: agora,
        expiraEm: new Date(agora.getTime() + 7 * 24 * 60 * 60 * 1000),
      })
    }
  }

  // Decisão ativa sem ação criada
  for (const dec of dados.decisoes ?? []) {
    if (dec.confianca >= 0.7) {
      notificacoes.push({
        id: gerarId(),
        titulo: 'Decisão importante',
        descricao: dec.titulo,
        categoria: dec.categoria,
        prioridade: 'importante',
        origem: 'Decision Engine',
        cta: { rotulo: 'Criar ação', href: '/assistente' },
        lida: false,
        criadaEm: agora,
        expiraEm: new Date(agora.getTime() + 14 * 24 * 60 * 60 * 1000),
      })
    }
  }

  // Feedback que gerou aprendizado
  for (const fb of dados.feedbackRecente ?? []) {
    if (fb.tipo === 'NAO_AJUDOU') {
      notificacoes.push({
        id: gerarId(),
        titulo: 'Nova descoberta',
        descricao: `"${fb.acao?.titulo ?? 'Ação'}" não funcionou como esperado`,
        categoria: fb.acao?.categoria ?? 'GESTAO',
        prioridade: 'informativa',
        origem: 'Feedback Engine',
        lida: false,
        criadaEm: agora,
      })
    }
    if (fb.tipo === 'AJUDOU') {
      notificacoes.push({
        id: gerarId(),
        titulo: 'Confirmação positiva',
        descricao: `"${fb.acao?.titulo ?? 'Ação'}" funcionou — conhecimento fortalecido`,
        categoria: fb.acao?.categoria ?? 'GESTAO',
        prioridade: 'informativa',
        origem: 'Feedback Engine',
        lida: false,
        criadaEm: agora,
      })
    }
  }

  // Outcomes positivos
  for (const oc of dados.topOutcomes ?? []) {
    notificacoes.push({
      id: gerarId(),
      titulo: 'Um resultado que percebi',
      descricao: oc.descricao,
      categoria: oc.categoria,
      prioridade: 'informativa',
      origem: 'Outcome Engine',
      cta: { rotulo: 'Ver detalhes', href: '/minha-jornada' },
      lida: false,
      criadaEm: agora,
    })
  }

  // Ativação — próximo passo disponível
  if (dados.jornada && dados.jornada.proximosPassos.length > 0) {
    const passo = dados.jornada.proximosPassos[0]
    if (dados.jornada.progresso < 100) {
      notificacoes.push({
        id: gerarId(),
        titulo: 'Próximo passo disponível',
        descricao: `Próximo: ${passo}`,
        categoria: 'GESTAO',
        prioridade: dados.jornada.progresso >= 80 ? 'importante' : 'informativa',
        origem: 'Activation Engine',
        cta: { rotulo: 'Avançar', href: '/assistente' },
        lida: false,
        criadaEm: agora,
      })
    }
  }

  // Jornadas com progresso significativo
  for (const j of dados.journeys ?? []) {
    if (j.progresso >= 100) {
      notificacoes.push({
        id: gerarId(),
        titulo: 'Jornada concluída',
        descricao: `"${j.titulo}" — todos os passos foram concluídos`,
        categoria: j.categoria,
        prioridade: 'informativa',
        origem: 'Journey Engine',
        lida: false,
        criadaEm: agora,
      })
    }
  }

  // Conhecimento — baixo score (se auditoria disponível)
  if (dados.auditoria && dados.auditoria.totalConhecimentos > 0 && dados.auditoria.scoreMedio < 40) {
    notificacoes.push({
      id: gerarId(),
      titulo: 'O que estamos acompanhando está frágil',
      descricao: `A confiança média é de ${dados.auditoria.scoreMedio}% — vamos revisar o que ainda não está sólido.`,
      categoria: 'GESTAO',
      prioridade: 'importante',
      origem: 'Knowledge Governance',
      cta: { rotulo: 'Revisar', href: '/configuracoes' },
      lida: false,
      criadaEm: agora,
      expiraEm: new Date(agora.getTime() + 30 * 24 * 60 * 60 * 1000),
    })
  }

  return notificacoes.sort((a, b) => {
    const peso = { urgente: 3, importante: 2, informativa: 1 }
    return (peso[b.prioridade] ?? 0) - (peso[a.prioridade] ?? 0)
  })
}
