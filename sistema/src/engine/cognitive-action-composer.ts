// ─────────────────────────────────────────────────────────────────────────────
// COGNITIVE ACTION COMPOSER
//
// Camada puramente determinística que transforma Insights em ExperienceActions.
//
// Não consulta banco.
// Não consulta engines.
// Não cria regras novas.
// Não decide.
//
// Apenas traduz o que já foi produzido pelos motores cognitivos.
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight } from './cognitive-experience-engine'

export interface ExperienceAction {
  id: string
  titulo: string
  descricao: string
  tipo: 'abrir' | 'criar' | 'executar' | 'corrigir' | 'acompanhar'
  href?: string
  callback?: string
  prioridade: 'alta' | 'media' | 'baixa'
  origem: string
  categoria: string
}

const CATEGORIA_HREF: Record<string, string> = {
  FINANCEIRO: '/financeiro',
  CLIENTES: '/crm',
  GESTAO: '/tarefas',
  OPERACAO: '/implantacoes',
  CONFIGURACOES: '/configuracoes',
  HISTORICO: '/minha-jornada',
}

const MAPA_TIPO_ACAO: Record<string, ExperienceAction['tipo']> = {
  recomendacao: 'executar',
  alerta: 'corrigir',
  atencao: 'acompanhar',
  descoberta: 'abrir',
  impacto: 'acompanhar',
  evolucao: 'acompanhar',
  confirmacao: 'abrir',
  aprendizado: 'abrir',
}

function gerarId(): string {
  return `act-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function gerarActions(insights: Insight[]): ExperienceAction[] {
  const actions: ExperienceAction[] = []

  for (const ins of insights) {
    const tipo = MAPA_TIPO_ACAO[ins.tipo] ?? 'executar'
    let href = ins.acao?.href

    if (!href) {
      href = CATEGORIA_HREF[ins.categoria.toUpperCase()] ?? `/assistente?acao=${ins.id}`
    }

    actions.push({
      id: `action-${ins.id}`,
      titulo: ins.acao?.rotulo ?? traduzirTitulo(tipo),
      descricao: ins.mensagem,
      tipo,
      href,
      prioridade: ins.prioridade,
      origem: ins.origem,
      categoria: ins.categoria,
    })
  }

  return actions
}

function traduzirTitulo(tipo: ExperienceAction['tipo']): string {
  const mapa: Record<ExperienceAction['tipo'], string> = {
    abrir: 'Abrir',
    criar: 'Criar',
    executar: 'Executar agora',
    corrigir: 'Corrigir',
    acompanhar: 'Acompanhar',
  }
  return mapa[tipo]
}
