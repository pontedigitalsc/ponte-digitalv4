export const EVENTOS_NEGOCIO = {
  DIAGNOSTICO_CONCLUIDO: 'DiagnosticoConcluido',
  DIAGNOSTICO_ATUALIZADO: 'DiagnosticoAtualizado',
  IDENTIDADE_CRIADA: 'IdentidadeCriada',
  IDENTIDADE_EVOLUIDA: 'IdentidadeEvoluida',
  NOVO_LEAD_CHEGOU: 'NovoLeadChegou',
  LEAD_AVANCOU: 'LeadAvancou',
  LEAD_CONVERTIDO: 'LeadConvertido',
  CLIENTE_CRIADO: 'ClienteCriado',
  TRANSACAO_REGISTRADA: 'TransacaoRegistrada',
  DESPESA_RECORRENTE_CRIADA: 'DespesaRecorrenteCriada',
  FATURAMENTO_AUMENTOU: 'FaturamentoAumentou',
  DESPESA_EXCEDEU: 'DespesaExcedeu',
  TAREFA_CRIADA: 'TarefaCriada',
  TAREFA_CONCLUIDA: 'TarefaConcluida',
  TAREFA_VENCEU: 'TarefaVenceu',
  APRENDIZADO_REGISTRADO: 'AprendizadoRegistrado',
  APRENDIZADO_DESATIVADO: 'AprendizadoDesativado',
} as const

export const EVENTOS_COGNITIVOS = {
  CLIENTE_NAO_RETORNOU: 'ClienteNaoRetornou',
  PADRAO_IDENTIFICADO: 'PadraoIdentificado',
  HIPOTESE_FORTALECIDA: 'HipoteseFortalecida',
  HIPOTESE_CONFIRMADA: 'HipoteseConfirmada',
  HIPOTESE_DESCARTADA: 'HipoteseDescartada',
  CONHECIMENTO_PROMOVIDO: 'ConhecimentoPromovido',
  CONHECIMENTO_ENFRAQUECIDO: 'ConhecimentoEnfraquecido',
  CONHECIMENTO_DESCARTADO: 'ConhecimentoDescartado',
  INSIGHT_GERADO: 'InsightGerado',
  MEMORIA_REGISTRADA: 'MemoriaRegistrada',
  OPORTUNIDADE_IDENTIFICADA: 'OportunidadeIdentificada',
  RISCO_DETECTADO: 'RiscoDetectado',
  DECISAO_TOMADA: 'DecisaoTomada',
  ACAO_AJUDOU: 'AcaoAjudou',
  ACAO_NAO_FUNCIONOU: 'AcaoNaoFuncionou',
  RESULTADO_REGISTRADO: 'ResultadoRegistrado',
} as const

export const EVENTOS_ENTRADA = {
  CONVERSA_INICIADA: 'ConversaIniciada',
  RESPOSTA_REGISTRADA: 'RespostaRegistrada',
  DADOS_SINCRONIZADOS: 'DadosSincronizados',
  COMANDO_EXPLICITO: 'ComandoExplicito',
  ROTINA_DIARIA_INICIADA: 'RotinaDiariaIniciada',
  ROTINA_SEMANAL_INICIADA: 'RotinaSemanalIniciada',
} as const

export const EVENTOS_SAIDA = {
  CONTEXTO_ATUALIZADO: 'ContextoAtualizado',
  NOTIFICACAO_GERADA: 'NotificacaoGerada',
  BRIEFING_PRODUZIDO: 'BriefingProduzido',
  MILESTONE_ATINGIDO: 'MilestoneAtingido',
  SUGESTAO_GERADA: 'SugestaoGerada',
} as const

export const EVENTOS_JORNADA = {
  CONTA_CRIADA: 'ContaCriada',
  PRIMEIRA_ACAO_CRIADA: 'PrimeiraAcaoCriada',
  PRIMEIRO_FEEDBACK_DADO: 'PrimeiroFeedbackDado',
  PRIMEIRO_APRENDIZADO_REGISTRADO: 'PrimeiroAprendizadoRegistrado',
  PRIMEIRO_OUTCOME_REGISTRADO: 'PrimeiroOutcomeRegistrado',
  TODAS_FERRAMENTAS_EXPLORADAS: 'TodasFerramentasExploradas',
} as const

export const EVENTOS_PIPELINE = {
  NIVEL_ATIVACAO_CALCULADO: 'NivelAtivacaoCalculado',
  HIPOTESE_INICIAL_GERADA: 'HipoteseInicialGerada',
} as const

export const EVENTOS_CICLO = {
  CICLO_INICIADO: 'CicloCognitivoIniciado',
  CICLO_ETAPA: 'CicloCognitivoEtapa',
  CICLO_FINALIZADO: 'CicloCognitivoFinalizado',
  CICLO_FALHA: 'CicloCognitivoFalha',
} as const

export const EVENTOS = {
  ...EVENTOS_NEGOCIO,
  ...EVENTOS_COGNITIVOS,
  ...EVENTOS_ENTRADA,
  ...EVENTOS_SAIDA,
  ...EVENTOS_JORNADA,
  ...EVENTOS_PIPELINE,
  ...EVENTOS_CICLO,
} as const

export type EventType = typeof EVENTOS[keyof typeof EVENTOS]

export const TODOS_EVENTOS = new Set<string>(Object.values(EVENTOS))

export type CategoriaEvento = 'NEGOCIO' | 'COGNITIVO' | 'ENTRADA' | 'SAIDA' | 'JORNADA' | 'PIPELINE' | 'CICLO'

const CATEGORIA_MAP: Record<string, CategoriaEvento> = {}

function preencherCategoria(
  eventos: Record<string, string>,
  categoria: CategoriaEvento
): void {
  for (const valor of Object.values(eventos)) {
    CATEGORIA_MAP[valor] = categoria
  }
}

preencherCategoria(EVENTOS_NEGOCIO, 'NEGOCIO')
preencherCategoria(EVENTOS_COGNITIVOS, 'COGNITIVO')
preencherCategoria(EVENTOS_ENTRADA, 'ENTRADA')
preencherCategoria(EVENTOS_SAIDA, 'SAIDA')
preencherCategoria(EVENTOS_JORNADA, 'JORNADA')
preencherCategoria(EVENTOS_PIPELINE, 'PIPELINE')
preencherCategoria(EVENTOS_CICLO, 'CICLO')

export function ehEventoValido(eventType: string): boolean {
  return TODOS_EVENTOS.has(eventType)
}

export function categoriaDoEvento(eventType: string): CategoriaEvento | undefined {
  return CATEGORIA_MAP[eventType]
}
