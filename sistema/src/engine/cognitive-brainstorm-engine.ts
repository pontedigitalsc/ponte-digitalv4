import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'

export interface CenarioAlternativo {
  id: string
  titulo: string
  descricao: string
  impacto: 'positivo' | 'negativo' | 'neutro'
  confianca: number
  riscos: string[]
  premissas: string[]
  area: string
}

const CENARIOS_BASE = [
  {
    id: 'cenario-preco',
    titulo: 'E se você revisar seus preços?',
    descricao: 'Com base nos dados que temos, uma revisão de preços pode revelar oportunidades de margem ou ajustes necessários para competir melhor.',
    impacto: 'neutro' as const,
    confianca: 50,
    riscos: ['Mudança de preço pode afetar clientes fiéis', 'Concorrentes podem reagir'],
    premissas: ['Os custos atuais estão mapeados', 'O mercado aceita o novo posicionamento'],
    area: 'FINANCEIRO',
  },
  {
    id: 'cenario-equipe',
    titulo: 'E se você contratar para áreas estratégicas?',
    descricao: 'Reforçar a equipe em áreas com maior potencial de crescimento pode acelerar resultados.',
    impacto: 'positivo' as const,
    confianca: 40,
    riscos: ['Custo fixo adicional', 'Curva de aprendizado da nova contratação'],
    premissas: ['Existe orçamento disponível', 'O mercado tem profissionais qualificados'],
    area: 'PESSOAS',
  },
  {
    id: 'cenario-marketing',
    titulo: 'E se você aumentar o investimento em marketing?',
    descricao: 'Mais investimento em aquisição pode acelerar o crescimento, mas precisa ser calibrado com a capacidade de entrega.',
    impacto: 'positivo' as const,
    confianca: 45,
    riscos: ['Retorno pode não ser imediato', 'Pode sobrecarregar a operação'],
    premissas: ['O produto atual tem boa aceitação', 'O mercado-alvo é acessível via canais pagos'],
    area: 'CLIENTES',
  },
  {
    id: 'cenario-automacao',
    titulo: 'E se você automatizar processos operacionais?',
    descricao: 'Automação pode liberar tempo da equipe para atividades estratégicas e reduzir erros.',
    impacto: 'positivo' as const,
    confianca: 55,
    riscos: ['Investimento inicial em ferramentas', 'Resistência da equipe à mudança'],
    premissas: ['Os processos atuais estão documentados', 'Existem ferramentas adequadas ao porte'],
    area: 'OPERACAO',
  },
  {
    id: 'cenario-parceria',
    titulo: 'E se você buscar parcerias estratégicas?',
    descricao: 'Parcerias podem acelerar o acesso a novos mercados e complementar capacidades existentes.',
    impacto: 'positivo' as const,
    confianca: 35,
    riscos: ['Dependência de terceiros', 'Divisão de resultados'],
    premissas: ['Existem parceiros potenciais no mercado', 'A empresa tem capacidade de negociar'],
    area: 'ESTRATEGIA',
  },
  {
    id: 'cenario-corte-custos',
    titulo: 'E se você reduzir custos operacionais?',
    descricao: 'Uma análise de custos pode identificar desperdícios e melhorar a margem sem sacrificar qualidade.',
    impacto: 'positivo' as const,
    confianca: 60,
    riscos: ['Corte excessivo pode afetar qualidade', 'Pode desmotivar a equipe'],
    premissas: ['Os custos atuais são conhecidos', 'Existem alternativas mais econômicas'],
    area: 'GESTAO',
  },
  {
    id: 'cenario-novo-produto',
    titulo: 'E se você lançar um novo produto ou serviço?',
    descricao: 'Novas ofertas podem atrair clientes diferentes e diversificar a receita.',
    impacto: 'positivo' as const,
    confianca: 30,
    riscos: ['Alto investimento', 'Pode canibalizar o produto atual', 'Incerteza de aceitação'],
    premissas: ['Existe demanda não atendida', 'A empresa tem capacidade de desenvolvimento'],
    area: 'PRODUTO',
  },
]

export function gerarCenarios(estado: EstadoCognitivoCompleto): CenarioAlternativo[] {
  const areasAtivas = new Set<string>()
  if (estado.contexto?.setoresEstaveis) {
    for (const s of estado.contexto.setoresEstaveis) {
      areasAtivas.add(normalizar(s))
    }
  }
  if (estado.impacto.areaMaisEvoluiu) {
    areasAtivas.add(estado.impacto.areaMaisEvoluiu.categoria)
  }

  const areasComAtencao = new Set<string>()
  if (estado.impacto.areaAtencao) {
    areasComAtencao.add(estado.impacto.areaAtencao.categoria)
  }

  let cenarios = CENARIOS_BASE.map((c) => {
    const ajusteConfianca = calcularAjusteConfianca(c, areasAtivas, areasComAtencao, estado)
    return {
      ...c,
      confianca: Math.min(95, Math.max(5, c.confianca + ajusteConfianca)),
    }
  })

  const prioritarias = areasComAtencao
  cenarios = cenarios.sort((a, b) => {
    const aPrioritaria = prioritarias.has(a.area) ? -1 : 0
    const bPrioritaria = prioritarias.has(b.area) ? -1 : 0
    return aPrioritaria - bPrioritaria || b.confianca - a.confianca
  })

  return cenarios.slice(0, 4)
}

function calcularAjusteConfianca(
  cenario: typeof CENARIOS_BASE[0],
  _areasAtivas: Set<string>,
  areasComAtencao: Set<string>,
  estado: EstadoCognitivoCompleto,
): number {
  let ajuste = 0
  if (areasComAtencao.has(cenario.area)) ajuste += 15
  if (estado.contexto?.setoresEstaveis?.some(s => normalizar(s) === cenario.area)) ajuste += 10
  if (estado.decisao?.categoria === cenario.area) ajuste += 5
  return ajuste
}

function normalizar(valor: string): string {
  const u = valor.toUpperCase()
  if (u.includes('FINAN')) return 'FINANCEIRO'
  if (u.includes('CLIENT')) return 'CLIENTES'
  if (u.includes('GEST')) return 'GESTAO'
  if (u.includes('OPER')) return 'OPERACAO'
  if (u.includes('ESTRAT')) return 'ESTRATEGIA'
  if (u.includes('PESSO') || u.includes('EQUIPE')) return 'PESSOAS'
  if (u.includes('PROD')) return 'PRODUTO'
  return 'GESTAO'
}
