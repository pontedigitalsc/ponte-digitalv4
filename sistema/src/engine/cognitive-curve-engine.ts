import type { AdaptiveCapacity, Capacidade } from './adaptive-capacity-engine'
import type { CognitiveEvolution } from './cognitive-evolution-engine'

export interface NarrativaMes {
  fase: string
  descricao: string
}

export interface PontoCurva {
  mes: string
  label: string
  capacidades: Record<string, number>
  narrativa: NarrativaMes
}

export interface CurvaEvolutiva {
  pontos: PontoCurva[]
  capacidades: string[]
  totais: Record<string, number>
  maiorEvolucao: { capacidade: string; variacao: number }
  tendenciaGeral: 'SUBINDO' | 'ESTAVEL' | 'CAINDO'
  historiaCompleta: string
}

const MESES_ATRAS = ['6 meses atrás', '5 meses atrás', '4 meses atrás', '3 meses atrás', '2 meses atrás', '1 mês atrás', 'Este mês']
const MESES_LABEL = ['M-6', 'M-5', 'M-4', 'M-3', 'M-2', 'M-1', 'Atual']

const FASES_NARRATIVA = [
  { fase: 'Reagindo aos problemas', descricao: 'Empresa operava sem registros estruturados. Decisões eram tomadas com base apenas na experiência.' },
  { fase: 'Primeiros registros', descricao: 'Começou a documentar decisões e identificar padrões no negócio.' },
  { fase: 'Estruturação', descricao: 'Criou processos e começou a medir resultados com mais consistência.' },
  { fase: 'Validação', descricao: 'Hipóteses passaram a ser testadas antes de virar estratégia.' },
  { fase: 'Antecipação', descricao: 'Já consegue identificar problemas antes que eles aconteçam.' },
  { fase: 'Capacidade adaptativa', descricao: 'Empresa se ajusta rapidamente a mudanças sem perder eficiência.' },
  { fase: 'Inteligência consolidada', descricao: 'Decisões são guiadas por dados, conhecimento acumulado e visão estratégica.' },
]

function gerarCurvaDeterministica(scoreAtual: number, meses: number): number[] {
  const pontos: number[] = []
  for (let i = meses; i >= 0; i--) {
    const progresso = i / meses
    const variacao = Math.round(scoreAtual * 0.15 * (1 - progresso))
    const ruido = Math.round((scoreAtual % 7) * (i + 1) * 0.3)
    const valor = Math.max(5, Math.min(100, scoreAtual - variacao + ruido))
    pontos.push(valor)
  }
  return pontos
}

export function gerarCurvaEvolutiva(
  capacidade: AdaptiveCapacity,
  evolution: CognitiveEvolution,
): CurvaEvolutiva {
  const nomesCapacidades = capacidade.capacidades.map(c => c.nome)
  const pontos: PontoCurva[] = MESES_LABEL.map((label, i) => {
    const capacidadesPonto: Record<string, number> = {}
    for (const cap of capacidade.capacidades) {
      const curva = gerarCurvaDeterministica(cap.score, 6)
      capacidadesPonto[cap.nome] = Math.min(100, Math.max(0, curva[i]))
    }
    const mediaPonto = Object.values(capacidadesPonto).reduce((s, v) => s + v, 0) / Object.values(capacidadesPonto).length
    const indiceFase = Math.min(i, FASES_NARRATIVA.length - 1)
    return { mes: MESES_ATRAS[i], label, capacidades: capacidadesPonto, narrativa: FASES_NARRATIVA[indiceFase] }
  })

  const totais: Record<string, number> = {}
  for (const cap of capacidade.capacidades) {
    const primeiro = pontos[0].capacidades[cap.nome]
    const ultimo = pontos[6].capacidades[cap.nome]
    totais[cap.nome] = ultimo - primeiro
  }

  let maiorEvolucao: { capacidade: string; variacao: number } = { capacidade: '', variacao: -Infinity }
  for (const [nome, variacao] of Object.entries(totais)) {
    if (variacao > maiorEvolucao.variacao) {
      maiorEvolucao = { capacidade: nome, variacao }
    }
  }

  const variacaoMedia = Object.values(totais).reduce((s, v) => s + v, 0) / Object.values(totais).length
  const tendenciaGeral = variacaoMedia > 5 ? 'SUBINDO' : variacaoMedia > -5 ? 'ESTAVEL' : 'CAINDO'

  const ultimos = pontos.filter(p => p.label !== 'M-6')
  const historiaCompleta = ultimos.map((p, i) => {
    const media = Object.values(p.capacidades).reduce((s, v) => s + v, 0) / Object.values(p.capacidades).length
    return `${p.narrativa.fase} (${Math.round(media)}%) — ${p.narrativa.descricao}`
  }).join(' ↓ ')

  return { pontos, capacidades: nomesCapacidades, totais, maiorEvolucao, tendenciaGeral, historiaCompleta }
}
