import { compactarSinais } from './tipos'
import type { Sinal } from './tipos'

/**
 * ─── SINAIS FINANCEIROS ───────────────────────────────────────────────────────
 *
 * Diferente de clientes.sinais.ts e tarefas.sinais.ts, este domínio recebe
 * valores já agregados (não uma lista de Transacao[]), porque é assim que
 * o dado já existe hoje — o cálculo de receita do mês, variação percentual
 * e receita pendente acontece via aggregate() do Prisma no Service, e
 * refazer essa agregação aqui seria trabalho duplicado.
 */

export interface ResumoFinanceiroEntrada {
  receitaMes: number
  /** null quando não há mês anterior para comparar — nunca inventamos essa comparação */
  variacaoReceita: number | null
  receitaPendente: number
}

/**
 * Queda de faturamento em relação ao mês anterior. Só gera sinal quando
 * variacaoReceita é um número real — se for null (empresa em seu primeiro
 * mês, por exemplo), não há base de comparação e nenhum sinal é forçado.
 */
export function sinalQuedaFaturamento(resumo: ResumoFinanceiroEntrada): Sinal | null {
  if (resumo.variacaoReceita === null || resumo.variacaoReceita >= 0) return null

  const quedaAbsoluta = Math.abs(resumo.variacaoReceita)

  return {
    id: 'financeiro-queda-faturamento',
    dominio: 'financeiro',
    urgencia: quedaAbsoluta >= 15 ? 'alta' : 'media',
    titulo: `Faturamento caiu ${quedaAbsoluta}% em relação ao mês anterior`,
    descricao: 'Comparação entre a receita recebida neste mês e no mês anterior.',
    origemDados: 'Transacao.tipo = RECEITA, Transacao.status = PAGO, comparando período atual vs. anterior',
    acaoSugerida: { label: 'Ver financeiro', href: '/financeiro' },
  }
}

/**
 * Receita pendente de recebimento — fato direto, sem inferência de risco
 * de inadimplência (isso exigiria histórico de atraso por cliente, que
 * ainda não está desenhado nesta fase).
 */
export function sinalReceitaPendente(resumo: ResumoFinanceiroEntrada): Sinal | null {
  if (resumo.receitaPendente <= 0) return null

  return {
    id: 'financeiro-receita-pendente',
    dominio: 'financeiro',
    urgencia: 'baixa',
    titulo: 'Há receita pendente de recebimento',
    descricao: 'Valores de receita já lançados que ainda não foram marcados como pagos.',
    origemDados: 'Transacao.tipo = RECEITA, Transacao.status = PENDENTE',
    acaoSugerida: { label: 'Ver financeiro', href: '/financeiro' },
  }
}

export function gerarSinaisFinanceiro(resumo: ResumoFinanceiroEntrada): Sinal[] {
  return compactarSinais([
    sinalQuedaFaturamento(resumo),
    sinalReceitaPendente(resumo),
  ])
}
