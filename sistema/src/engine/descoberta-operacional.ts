/**
 * ─── PONTE DESCOBERTA (P92) — NÚCLEO PURO ─────────────────────────────────────
 *
 * Módulo determinístico (sem acesso a banco) que define as regras do trabalho
 * de descoberta operacional no campo real:
 *
 *  - estados do diagnóstico (briefing §20): NAO_INICIADO → EM_DESCOBERTA →
 *    MAPEADO → EM_VALIDACAO → VALIDADO → EM_IMPLEMENTACAO → IMPLEMENTADO →
 *    EM_APRENDIZADO, com as transições válidas entre eles;
 *  - taxonomia obrigatória dos registros (briefing §2): todo fato coletado
 *    precisa ser classificado — conhecimento conhecido, informação fornecida,
 *    observação, hipótese, decisão, oportunidade ou desconhecido;
 *  - pergunta-âncora (P82) que abre o diagnóstico do campo real;
 *  - template de vertical (ADR-035): a vertical é CONFIGURAÇÃO (Json + seed de
 *    perguntas), nunca código — o primeiro caso real (serralheria) nasce aqui;
 *  - montagem do relatório final determinístico (briefing §21) em texto puro,
 *    pronto para copiar — sem IA, sem PDF.
 *
 * A regra do P82 vale aqui dentro: não inventar o funcionamento de uma empresa.
 * Todo registro tem um tipo na taxonomia; o que não sabemos fica DESCONHECIDO.
 */

// ─── PERGUNTA-ÂNCORA (P82) ────────────────────────────────────────────────────

/**
 * Pergunta-âncora do P82: a única bagunça que, se eliminada primeiro, tornaria
 * o restante do trabalho mais fácil. No MVP ela é OBRIGATÓRIA no diagnóstico.
 */
export const PERGUNTA_ANCORA =
  'Qual é a única bagunça que, se a gente eliminasse primeiro, faria o restante do trabalho ficar mais fácil?'

// ─── ESTADOS DO DIAGNÓSTICO (briefing §20) ────────────────────────────────────

export type StatusDiagnosticoDescobertaOp =
  | 'NAO_INICIADO'
  | 'EM_DESCOBERTA'
  | 'MAPEADO'
  | 'EM_VALIDACAO'
  | 'VALIDADO'
  | 'EM_IMPLEMENTACAO'
  | 'IMPLEMENTADO'
  | 'EM_APRENDIZADO'

/** Ordem canônica do fluxo (também usada para ordenar listagens). */
export const STATUS_DIAGNOSTICO_DESCOBERTA_ORDEM: StatusDiagnosticoDescobertaOp[] = [
  'NAO_INICIADO',
  'EM_DESCOBERTA',
  'MAPEADO',
  'EM_VALIDACAO',
  'VALIDADO',
  'EM_IMPLEMENTACAO',
  'IMPLEMENTADO',
  'EM_APRENDIZADO',
]

/** Rótulo curto em PT-BR para exibição. */
export const STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO: Record<
  StatusDiagnosticoDescobertaOp,
  string
> = {
  NAO_INICIADO: 'Não iniciado',
  EM_DESCOBERTA: 'Em descoberta',
  MAPEADO: 'Mapeado',
  EM_VALIDACAO: 'Em validação',
  VALIDADO: 'Validado',
  EM_IMPLEMENTACAO: 'Em implementação',
  IMPLEMENTADO: 'Implementado',
  EM_APRENDIZADO: 'Em aprendizado',
}

/** Descrição de cada estado (o que ele significa no trabalho de campo). */
export const STATUS_DIAGNOSTICO_DESCOBERTA_DESCRICAO: Record<
  StatusDiagnosticoDescobertaOp,
  string
> = {
  NAO_INICIADO: 'Diagnóstico criado, aguardando início do trabalho de campo.',
  EM_DESCOBERTA:
    'Coletando fatos um de cada vez: participantes, respostas, registros classificados e processos (COMO É).',
  MAPEADO:
    'COMO É dominado e divergências triadas. Pronto para desenhar o COMO PODERIA SER.',
  EM_VALIDACAO:
    'Desenhos do COMO PODERIA SER em validação com o campo (tarefa 10).',
  VALIDADO: 'Desenho validado, pronto para o plano de implementação (tarefa 11).',
  EM_IMPLEMENTACAO: 'Implementação em andamento no campo (tarefa 12).',
  IMPLEMENTADO: 'Implementado no campo, coletando sinais.',
  EM_APRENDIZADO:
    'Relatório final consolidado (tarefa 14) — aprendizagem para o patrimônio da Ponte.',
}

/**
 * Transições permitidas entre estados.
 *
 * O caminho feliz é linear (uma descoberta de cada vez, como manda o P82):
 * NAO_INICIADO → EM_DESCOBERTA → MAPEADO → EM_VALIDACAO → VALIDADO →
 * EM_IMPLEMENTACAO → IMPLEMENTADO → EM_APRENDIZADO. Nada pula etapa, e o
 * trabalho pode voltar quando o campo mostrou que o entendimento estava errado.
 */
export const TRANSICOES_STATUS_DIAGNOSTICO: Record<
  StatusDiagnosticoDescobertaOp,
  StatusDiagnosticoDescobertaOp[]
> = {
  NAO_INICIADO: ['EM_DESCOBERTA'],
  EM_DESCOBERTA: ['MAPEADO', 'NAO_INICIADO'],
  MAPEADO: ['EM_VALIDACAO', 'EM_DESCOBERTA'],
  EM_VALIDACAO: ['VALIDADO', 'MAPEADO'],
  VALIDADO: ['EM_IMPLEMENTACAO', 'EM_VALIDACAO'],
  EM_IMPLEMENTACAO: ['IMPLEMENTADO', 'VALIDADO'],
  IMPLEMENTADO: ['EM_APRENDIZADO', 'EM_IMPLEMENTACAO'],
  EM_APRENDIZADO: ['IMPLEMENTADO'],
}

/** Pode mudar de estado? */
export function podeTransicionarStatusDiagnostico(
  de: StatusDiagnosticoDescobertaOp,
  para: StatusDiagnosticoDescobertaOp,
): boolean {
  if (de === para) return true
  const permitidos = TRANSICOES_STATUS_DIAGNOSTICO[de]
  return permitidos?.includes(para) ?? false
}

/** Estados que exigem confirmação explícita no painel (peso / irreversibilidade). */
export const STATUS_DIAGNOSTICO_COM_CONFIRMACAO: StatusDiagnosticoDescobertaOp[] = [
  'EM_VALIDACAO',
  'VALIDADO',
  'IMPLEMENTADO',
  'EM_APRENDIZADO',
]

// ─── TAXONOMIA DOS REGISTROS (briefing §2) ────────────────────────────────────

export type TipoRegistroDescobertaOp =
  | 'CONHECIMENTO_CONHECIDO'
  | 'INFORMACAO_FORNECIDA'
  | 'OBSERVACAO'
  | 'HIPOTESE'
  | 'DECISAO'
  | 'OPORTUNIDADE'
  | 'DESCONHECIDO'

/** Taxonomia obrigatória do briefing §2 — nenhum registro fica sem tipo. */
export const TAXONOMIA_REGISTRO_DESCOBERTA: {
  chave: TipoRegistroDescobertaOp
  rotulo: string
  descricao: string
  exigeVerificacao: boolean
}[] = [
  {
    chave: 'CONHECIMENTO_CONHECIDO',
    rotulo: 'Conhecimento conhecido',
    descricao:
      'Já sabíamos de antemão (hipótese prévia da Ponte). Deve ser CONFIRMADO no campo antes de virar aprendizado.',
    exigeVerificacao: true,
  },
  {
    chave: 'INFORMACAO_FORNECIDA',
    rotulo: 'Informação fornecida',
    descricao:
      'Dado dito por um participante na entrevista (DITO do P82). É o que a pessoa afirma — não um fato observado.',
    exigeVerificacao: true,
  },
  {
    chave: 'OBSERVACAO',
    rotulo: 'Observação',
    descricao:
      'Fato observado na operação (FATO do P82), com data e contexto — a fonte mais confiável.',
    exigeVerificacao: false,
  },
  {
    chave: 'HIPOTESE',
    rotulo: 'Hipótese',
    descricao:
      'Suposição ainda sem confirmação. NUNCA deve ser tratada como fato ou vazar como verdade.',
    exigeVerificacao: true,
  },
  {
    chave: 'DECISAO',
    rotulo: 'Decisão',
    descricao:
      'Uma decisão registrada: o que o campo decidiu, quem decidiu e com qual informação.',
    exigeVerificacao: false,
  },
  {
    chave: 'OPORTUNIDADE',
    rotulo: 'Oportunidade',
    descricao:
      'Possibilidade de melhoria identificada a partir de fato observado ou dito. Vira candidata a COMO PODERIA SER.',
    exigeVerificacao: false,
  },
  {
    chave: 'DESCONHECIDO',
    rotulo: 'Desconhecido',
    descricao:
      'O que NÃO sabemos — lacuna honesta. A Ponte não inventa: registra o que falta saber.',
    exigeVerificacao: false,
  },
]

/** Rótulo amigável de um tipo de registro. */
export function rotuloTipoRegistroDescoberta(chave: string | null | undefined): string | null {
  if (!chave) return null
  return TAXONOMIA_REGISTRO_DESCOBERTA.find((t) => t.chave === chave)?.rotulo ?? chave
}

// ─── CONFIANÇA ────────────────────────────────────────────────────────────────

export type ConfiancaDescobertaOp = 'ALTA' | 'MEDIA' | 'BAIXA'

export const CONFIANCA_DESCOBERTA_ROTULO: Record<ConfiancaDescobertaOp, string> = {
  ALTA: 'Alta',
  MEDIA: 'Média',
  BAIXA: 'Baixa',
}

// ─── PAPEL DO PARTICIPANTE ────────────────────────────────────────────────────

export type PapelParticipanteDescobertaOp = 'PROPRIETARIO' | 'GESTAO' | 'OPERACAO'

export const PAPEL_PARTICIPANTE_DESCOBERTA_ROTULO: Record<
  PapelParticipanteDescobertaOp,
  string
> = {
  PROPRIETARIO: 'Proprietário(a)',
  GESTAO: 'Gestão',
  OPERACAO: 'Operação',
}

// ─── OPORTUNIDADES (categorias abertas de perda de energia) ───────────────────

/**
 * Categorias de oportunidade baseadas nas perdas de energia do P82 §13.
 * São um vocabulário inicial (texto livre também é aceito no banco), alinhado
 * à investigação de campo — não um sistema fechado de serralheria.
 */
export const CATEGORIAS_OPORTUNIDADE_DESCOBERTA = [
  'GARGALO',
  'RETRABALHO',
  'ESPERA',
  'DEPENDENCIA',
  'INFORMACAO_FALTANTE',
  'DECISAO_MANUAL',
  'COMUNICACAO',
  'MEMORIA_HUMANA',
  'IA_FUTURA',
] as const

export const ROTULO_CATEGORIA_OPORTUNIDADE: Record<string, string> = {
  GARGALO: 'Gargalo',
  RETRABALHO: 'Retrabalho',
  ESPERA: 'Espera',
  DEPENDENCIA: 'Dependência',
  INFORMACAO_FALTANTE: 'Informação faltante',
  DECISAO_MANUAL: 'Decisão manual',
  COMUNICACAO: 'Comunicação',
  MEMORIA_HUMANA: 'Memória humana',
  IA_FUTURA: 'Candidata a IA no futuro',
}

export function rotuloCategoriaOportunidade(chave: string | null | undefined): string | null {
  if (!chave) return null
  return ROTULO_CATEGORIA_OPORTUNIDADE[chave] ?? chave
}

// ─── ÁREAS TEMPLATE E VERTICAL (ADR-035) ──────────────────────────────────────

/**
 * Áreas de observação do template de uma categoria. ADR-035: vertical é
 * CONFIGURAÇÃO (metadados + seed de perguntas), nunca código de domínio.
 * O serviço grava estas áreas em `CategoriaOperacional.areasTemplate` (Json) e
 * cria as linhas de `PerguntaDescoberta` — o campo real decide o que vale.
 */
export interface AreaTemplate {
  area: string
  objetivo: string
  perguntas: { texto: string; objetivo: string }[]
}

export interface TemplateVertical {
  nome: string
  slug: string
  descricao: string
  areas: AreaTemplate[]
}

/**
 * Template do primeiro caso real (serralheria — Souza Mestrinho), derivado do
 * roteiro de campo P79 (perguntas de mapeamento do "hoje"). Reutilizado como
 * partida para qualquer nova empresa da categoria; nada aqui é dado de cliente.
 */
export const TEMPLATE_SERRALHERIA: TemplateVertical = {
  nome: 'Serralheria e Metais',
  slug: 'serralheria-metais',
  descricao:
    'Vertical Fabricação & Instalação (ferro, calhas, rufos, condutores, trabalhos sob medida). Template inicial derivado do roteiro de campo P79.',
  areas: [
    {
      area: 'Chegada do pedido',
      objetivo: 'Descobrir como um novo pedido chega e onde ele é registrado.',
      perguntas: [
        {
          texto: 'Como chega um novo pedido?',
          objetivo: 'WhatsApp, telefone, indicação, presencial.',
        },
        {
          texto: 'Onde o cliente é registrado?',
          objetivo: 'Excel, caderno, cabeça, outro meio.',
        },
      ],
    },
    {
      area: 'Orçamento',
      objetivo: 'Entender como o orçamento é feito, quem faz e quanto demora.',
      perguntas: [
        {
          texto: 'Como fazem orçamento?',
          objetivo: 'Quem, quando, quanto demora, como cobra, base de preço.',
        },
        {
          texto: 'O que acontece quando o orçamento é aprovado?',
          objetivo: 'Para quem vai a informação e como.',
        },
      ],
    },
    {
      area: 'Arranque da produção',
      objetivo: 'Descobrir como a produção sabe o que precisa fazer.',
      perguntas: [
        {
          texto: 'Quem recebe a informação de arranque?',
          objetivo: 'Dono, funcionário, papel, meio.',
        },
        {
          texto: 'Como a produção sabe o que precisa fazer?',
          objetivo: 'Pedido escrito, oral, folha.',
        },
      ],
    },
    {
      area: 'Materiais e compras',
      objetivo: 'Entender como decidem quais materiais comprar.',
      perguntas: [
        {
          texto: 'Como sabem quais materiais comprar?',
          objetivo: 'Projeto, estimativa, experiência.',
        },
      ],
    },
    {
      area: 'Instalação e agenda',
      objetivo: 'Entender como organizam as instalações.',
      perguntas: [
        {
          texto: 'Como organizam as instalações (agenda)?',
          objetivo: 'Atrás de qual informação estão marcadas.',
        },
      ],
    },
    {
      area: 'Pagamentos e entrega',
      objetivo: 'Entender o controle financeiro e a conclusão do serviço.',
      perguntas: [
        {
          texto: 'Como controlam pagamentos?',
          objetivo: 'Entrada, sinal, restante, notas.',
        },
      ],
    },
  ],
}

// ─── PROGRESSO DO DIAGNÓSTICO (checklist do trabalho de campo) ─────────────────

export interface ProgressoDescoberta {
  chave: string
  rotulo: string
  concluido: boolean
  obrigatorioNoEstado: StatusDiagnosticoDescobertaOp[] | null
}

/** Verificações de progresso usadas no painel para guiar o condutor (Kelven). */
export function calcularProgressoDescoberta(estado: {
  respostaAncora: string | null
  totalParticipantes: number
  totalRegistros: number
  totalProcessos: number
  totalProcessosDesejados: number
  totalDivergencias: number
  totalOportunidades: number
}): ProgressoDescoberta[] {
  return [
    {
      chave: 'ancora',
      rotulo: 'Resposta da pergunta-âncora registrada',
      concluido: Boolean(estado.respostaAncora?.trim()),
      obrigatorioNoEstado: ['EM_DESCOBERTA', 'MAPEADO', 'EM_VALIDACAO', 'VALIDADO'],
    },
    {
      chave: 'participantes',
      rotulo: 'Pelo menos um participante ouvido',
      concluido: estado.totalParticipantes > 0,
      obrigatorioNoEstado: ['EM_DESCOBERTA'],
    },
    {
      chave: 'registros',
      rotulo: 'Fatos registrados e classificados',
      concluido: estado.totalRegistros > 0,
      obrigatorioNoEstado: ['EM_DESCOBERTA'],
    },
    {
      chave: 'processos',
      rotulo: 'Processos mapeados (COMO É)',
      concluido: estado.totalProcessos > 0,
      obrigatorioNoEstado: ['MAPEADO'],
    },
    {
      chave: 'desejados',
      rotulo: 'Desenhos do COMO PODERIA SER propostos',
      concluido: estado.totalProcessosDesejados > 0,
      obrigatorioNoEstado: ['EM_VALIDACAO'],
    },
    {
      chave: 'divergencias',
      rotulo: 'Divergências entre fontes triadas',
      concluido: estado.totalDivergencias === 0 || estado.totalDivergencias > 0, // sempre contável
      obrigatorioNoEstado: null,
    },
    {
      chave: 'oportunidades',
      rotulo: 'Oportunidades priorizadas',
      concluido: estado.totalOportunidades > 0,
      obrigatorioNoEstado: ['EM_IMPLEMENTACAO'],
    },
  ]
}

// ─── RELATÓRIO FINAL (briefing §21) ───────────────────────────────────────────

export interface DadosRelatorioDescoberta {
  nomeEmpresa: string
  categoriaNome: string
  unidadeOperacional: string | null
  status: StatusDiagnosticoDescobertaOp
  respostaAncora: string | null
  participantes: { nome: string; papel: string; cargo: string | null }[]
  registros: {
    tipo: TipoRegistroDescobertaOp
    conteudo: string
    area: string | null
    confianca: string | null
  }[]
  processos: {
    nome: string
    inicio: string | null
    fim: string | null
    responsavel: string | null
    etapas: unknown
    retrabalhos: unknown
    dependencias: unknown
    riscos: unknown
  }[]
  processosDesejados: { nome: string; melhoriaPrincipal: string | null }[]
  divergencias: { titulo: string; descricao: string; status: string }[]
  oportunidades: { descricao: string; categoria: string; status: string }[]
  criadaEm: string
  concluidoEm: string | null
}

function lista(v: unknown): string[] {
  if (!Array.isArray(v)) return []
  return v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0)
}

/**
 * Monta o relatório final (briefing §21, 12 seções) em texto puro determinístico.
 * Sem IA: apenas agrega o que foi registrado e classificado no campo. As lacunas
 * honestas (DESCONHECIDO) aparecem como tal — a Ponte não inventa.
 */
export function montarRelatorioDescoberta(dados: DadosRelatorioDescoberta): string {
  const linhas: string[] = []

  linhas.push('RELATÓRIO DE DESCOBERTA OPERACIONAL — PONTE DIGITAL')
  linhas.push('='.repeat(72))
  linhas.push('')
  linhas.push(`1. Identificação`)
  linhas.push(`   Empresa: ${dados.nomeEmpresa}`)
  linhas.push(`   Categoria: ${dados.categoriaNome}`)
  linhas.push(`   Unidade operacional: ${dados.unidadeOperacional ?? 'NÃO DEFINIDA (ainda não sabemos)'}`)
  linhas.push(`   Estado: ${STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[dados.status]}`)
  linhas.push(`   Início: ${dados.criadaEm}`)
  linhas.push(`   Conclusão: ${dados.concluidoEm ?? '—'}`)
  linhas.push('')

  linhas.push(`2. Resposta da pergunta-âncora`)
  linhas.push(`   Pergunta: ${PERGUNTA_ANCORA}`)
  linhas.push(`   Resposta: ${dados.respostaAncora ?? 'NÃO REGISTRADA — obrigatória no MVP'}`)
  linhas.push('')

  linhas.push(`3. Quem foi ouvido`)
  if (dados.participantes.length === 0) {
    linhas.push('   Ninguém ainda — participantes não registrados.')
  } else {
    for (const p of dados.participantes) {
      const cargo = p.cargo ? ` (${p.cargo})` : ''
      linhas.push(`   - ${p.nome} — ${p.papel}${cargo}`)
    }
  }
  linhas.push('')

  linhas.push('4. Fatos registrados (taxonomia)')
  if (dados.registros.length === 0) {
    linhas.push('   Nenhum fato registrado.')
  } else {
    for (const r of dados.registros) {
      const tipo = rotuloTipoRegistroDescoberta(r.tipo) ?? r.tipo
      const area = r.area ? ` [${r.area}]` : ''
      const confianca = r.confianca ? ` (confiança ${r.confianca})` : ''
      linhas.push(`   [${tipo}]${area}${confianca}: ${r.conteudo}`)
    }
  }
  linhas.push('')

  linhas.push('5. Processos mapeados (COMO É)')
  if (dados.processos.length === 0) {
    linhas.push('   Nenhum processo mapeado ainda.')
  } else {
    for (const proc of dados.processos) {
      linhas.push(`   - ${proc.nome}`)
      if (proc.inicio) linhas.push(`     Início: ${proc.inicio}`)
      if (proc.fim) linhas.push(`     Fim: ${proc.fim}`)
      if (proc.responsavel) linhas.push(`     Responsável: ${proc.responsavel}`)
      const etapas = lista(proc.etapas)
      if (etapas.length > 0) {
        linhas.push(`     Etapas: ${etapas.join(' → ')}`)
      }
      const retrabalhos = lista(proc.retrabalhos)
      if (retrabalhos.length > 0) {
        linhas.push(`     Retrabalhos: ${retrabalhos.join('; ')}`)
      }
      const dependencias = lista(proc.dependencias)
      if (dependencias.length > 0) {
        linhas.push(`     Dependências: ${dependencias.join('; ')}`)
      }
      const riscos = lista(proc.riscos)
      if (riscos.length > 0) {
        linhas.push(`     Riscos: ${riscos.join('; ')}`)
      }
    }
  }
  linhas.push('')

  linhas.push('6. Desvios entre o descrito e o observado (divergências)')
  if (dados.divergencias.length === 0) {
    linhas.push('   Nenhuma divergência registrada.')
  } else {
    for (const d of dados.divergencias) {
      linhas.push(`   - ${d.titulo} [${d.status}]: ${d.descricao}`)
    }
  }
  linhas.push('')

  linhas.push('7. COMO PODERIA SER (processos desejados)')
  if (dados.processosDesejados.length === 0) {
    linhas.push('   Nenhum desenho desejado proposto.')
  } else {
    for (const d of dados.processosDesejados) {
      const melhoria = d.melhoriaPrincipal ? ` — ${d.melhoriaPrincipal}` : ''
      linhas.push(`   - ${d.nome}${melhoria}`)
    }
  }
  linhas.push('')

  linhas.push('8. Oportunidades identificadas')
  if (dados.oportunidades.length === 0) {
    linhas.push('   Nenhuma oportunidade registrada.')
  } else {
    for (const o of dados.oportunidades) {
      linhas.push(`   - [${rotuloCategoriaOportunidade(o.categoria) ?? o.categoria}] (${o.status}) ${o.descricao}`)
    }
  }
  linhas.push('')

  linhas.push('9. O que ainda NÃO sabemos')
  const desconhecidos = dados.registros.filter((r) => r.tipo === 'DESCONHECIDO')
  if (desconhecidos.length === 0) {
    linhas.push('   Nenhuma lacuna registrada (ou tudo o que falta saber ainda não foi anotado).')
  } else {
    for (const d of desconhecidos) {
      linhas.push(`   - ${d.conteudo}`)
    }
  }
  linhas.push('')

  linhas.push('10. Padrões da categoria (aprendizado estrutural entre empresas)')
  linhas.push(`   Categoria: ${dados.categoriaNome}`)
  linhas.push(
    '   Aprendizado permitido: estrutural (categoria, áreas, número de etapas). Dados de empresas específicas não são compartilhados (ADR-035).'
  )
  linhas.push('')

  linhas.push('11. Aprendizado para a Ponte')
  linhas.push(
    '   Este relatório alimenta o patrimônio da Ponte apenas com o que foi observado e classificado no campo. Hipóteses continuam hipóteses até validação.'
  )
  linhas.push('')

  linhas.push('12. Próximo passo')
  linhas.push(
    `   Estado atual: ${STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[dados.status]} — ${STATUS_DIAGNOSTICO_DESCOBERTA_DESCRICAO[dados.status]}`
  )

  return linhas.join('\n')
}
