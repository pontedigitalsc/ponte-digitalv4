export interface AgendaRotina {
  tipo: 'diaria' | 'semanal' | 'mensal'
  ultimaExecucao: Date | null
  proximaExecucao: Date
  descricao: string
}

export function calcularAgendaRotinas(): AgendaRotina[] {
  const agora = new Date()

  const hojeMeiaNoite = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), 0, 0, 0)
  const amanhaMeiaNoite = new Date(hojeMeiaNoite.getTime() + 24 * 60 * 60 * 1000)

  const diaSemana = agora.getDay()
  const diasAteProximaSemana = diaSemana === 0 ? 0 : 7 - diaSemana
  const proximaSegunda = new Date(hojeMeiaNoite.getTime() + diasAteProximaSemana * 24 * 60 * 60 * 1000)

  const primeiroDiaProximoMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 1)

  return [
    {
      tipo: 'diaria',
      ultimaExecucao: null,
      proximaExecucao: amanhaMeiaNoite,
      descricao: 'Validação de hipóteses — verifica quais hipóteses podem ser promovidas ou descartadas',
    },
    {
      tipo: 'semanal',
      ultimaExecucao: null,
      proximaExecucao: proximaSegunda,
      descricao: 'Promoção de conhecimento — fortalece hipóteses confirmadas e audita conhecimento',
    },
    {
      tipo: 'mensal',
      ultimaExecucao: null,
      proximaExecucao: primeiroDiaProximoMes,
      descricao: 'Resumo cognitivo — gera panorama mensal e alertas de governança',
    },
  ]
}
