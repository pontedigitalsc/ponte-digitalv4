export interface WorkflowStep {
  id: string
  titulo: string
  descricao: string
  href?: string
  concluido: boolean
  obrigatorio: boolean
}

export interface CognitiveWorkflow {
  id: string
  titulo: string
  descricao: string
  categoria: 'financeiro' | 'clientes' | 'crm' | 'tarefas' | 'implantacoes'
  prioridade: 'alta' | 'media' | 'baixa'
  etapas: WorkflowStep[]
  progresso: number
  concluido: boolean
  origem: string
}

type InsightBasico = { categoria: string; prioridade: string; origem: string }
type AcaoBasica = { categoria: string; prioridade: string; origem: string }

let contadorWorkflow = 0

function gerarId(): string {
  return `wf_${++contadorWorkflow}_${Date.now()}`
}

const TEMPLATES: Record<string, {
  titulo: string
  descricao: string
  categoria: CognitiveWorkflow['categoria']
  etapas: Array<{ titulo: string; descricao: string; href?: string }>
}> = {
  COBRANCA: {
    titulo: 'Cobrança de cliente',
    descricao: 'Receber pagamentos pendentes',
    categoria: 'financeiro',
    etapas: [
      { titulo: 'Abrir cliente', descricao: 'Identificar cliente com débito', href: '/clientes' },
      { titulo: 'Enviar cobrança', descricao: 'Notificar cliente sobre pendência' },
      { titulo: 'Registrar pagamento', descricao: 'Atualizar sistema ao receber' },
      { titulo: 'Concluir ação', descricao: 'Fechar ciclo de cobrança' },
    ],
  },
  REATIVAR_CLIENTES: {
    titulo: 'Reativar clientes antigos',
    descricao: 'Recuperar base inativa',
    categoria: 'clientes',
    etapas: [
      { titulo: 'Abrir clientes inativos', descricao: 'Listar clientes sem interação recente', href: '/clientes' },
      { titulo: 'Selecionar 10', descricao: 'Escolher os com maior potencial' },
      { titulo: 'Enviar mensagem', descricao: 'Contatar clientes selecionados' },
      { titulo: 'Registrar resultado', descricao: 'Anotar respostas obtidas' },
      { titulo: 'Avaliar retorno', descricao: 'Medir taxa de reativação' },
    ],
  },
  MOVIMENTAR_LEAD: {
    titulo: 'Converter lead parado',
    descricao: 'Mover lead no pipeline',
    categoria: 'crm',
    etapas: [
      { titulo: 'Abrir lead', descricao: 'Identificar lead sem avanço', href: '/crm' },
      { titulo: 'Atualizar contato', descricao: 'Registrar nova interação' },
      { titulo: 'Definir próximo passo', descricao: 'Alinhar expectativa do lead' },
      { titulo: 'Mover no pipeline', descricao: 'Avançar estágio comercial' },
    ],
  },
  REVISAR_TAREFAS: {
    titulo: 'Organizar tarefas pendentes',
    descricao: 'Priorizar e executar pendências',
    categoria: 'tarefas',
    etapas: [
      { titulo: 'Revisar tarefas', descricao: 'Listar tarefas em aberto', href: '/tarefas' },
      { titulo: 'Priorizar', descricao: 'Ordenar por urgência e impacto' },
      { titulo: 'Reagendar', descricao: 'Ajustar prazos se necessário' },
      { titulo: 'Executar', descricao: 'Iniciar pela tarefa principal' },
    ],
  },
  ACOMPANHAR_IMPLANTACAO: {
    titulo: 'Acompanhar implantação crítica',
    descricao: 'Evitar atrasos em implantações',
    categoria: 'implantacoes',
    etapas: [
      { titulo: 'Revisar cronograma', descricao: 'Verificar prazos atuais', href: '/implantacoes' },
      { titulo: 'Identificar gargalo', descricao: 'Descobrir o que está travando' },
      { titulo: 'Ajustar prazo', descricao: 'Realinhar expectativas' },
      { titulo: 'Comunicar cliente', descricao: 'Manter transparência' },
    ],
  },
}

function detectarTemplate(insights: InsightBasico[]): string[] {
  const templatesAtivados: string[] = []
  const categoriasJaVistas = new Set<string>()

  for (const ins of insights) {
    const cat = ins.categoria.toUpperCase()

    if (cat === 'FINANCEIRO' && !categoriasJaVistas.has('FINANCEIRO')) {
      templatesAtivados.push('COBRANCA')
      categoriasJaVistas.add('FINANCEIRO')
    }

    if (cat === 'CLIENTES' && !categoriasJaVistas.has('CLIENTES')) {
      templatesAtivados.push('REATIVAR_CLIENTES')
      categoriasJaVistas.add('CLIENTES')
    }

    if (cat === 'CRM' && !categoriasJaVistas.has('CRM')) {
      templatesAtivados.push('MOVIMENTAR_LEAD')
      categoriasJaVistas.add('CRM')
    }

    if (cat === 'GESTAO' && !categoriasJaVistas.has('GESTAO')) {
      templatesAtivados.push('REVISAR_TAREFAS')
      categoriasJaVistas.add('GESTAO')
    }

    if (cat === 'OPERACAO' && !categoriasJaVistas.has('OPERACAO')) {
      templatesAtivados.push('ACOMPANHAR_IMPLANTACAO')
      categoriasJaVistas.add('OPERACAO')
    }
  }

  if (templatesAtivados.length === 0 && insights.length > 0) {
    templatesAtivados.push('REVISAR_TAREFAS')
  }

  return templatesAtivados.slice(0, 3)
}

export function gerarWorkflows(
  insights: InsightBasico[],
  _actions?: AcaoBasica[]
): CognitiveWorkflow[] {
  const templates = detectarTemplate(insights)

  return templates.map((chave) => {
    const tmpl = TEMPLATES[chave]
    if (!tmpl) return null

    const insightsRelacionados = insights.filter(
      i => i.categoria.toUpperCase() === tmpl.categoria.toUpperCase()
        || (chave === 'REVISAR_TAREFAS' && i.categoria.toUpperCase() === 'GESTAO')
    )

    const prioridade = insightsRelacionados.some(i => i.prioridade === 'alta') ? 'alta' as const
      : insightsRelacionados.some(i => i.prioridade === 'media') ? 'media' as const
      : 'baixa' as const

    const etapas = tmpl.etapas.map((e, idx) => ({
      id: `${gerarId()}_step_${idx}`,
      titulo: e.titulo,
      descricao: e.descricao,
      href: e.href,
      concluido: false,
      obrigatorio: idx < 2,
    }))

    const concluidos = etapas.filter(e => e.concluido).length
    const progresso = Math.round((concluidos / etapas.length) * 100)

    return {
      id: gerarId(),
      titulo: tmpl.titulo,
      descricao: tmpl.descricao,
      categoria: tmpl.categoria,
      prioridade,
      etapas,
      progresso,
      concluido: progresso >= 100,
      origem: insightsRelacionados[0]?.origem ?? 'Workflow Engine',
    }
  }).filter(Boolean) as CognitiveWorkflow[]
}
