import { prisma } from '@/lib/prisma'

// ─────────────────────────────────────────────────────────────────────────────
// INTELIGÊNCIA COLETIVA — P62
//
// A Ponte nunca compartilha dados de uma empresa com outra. Ela compartilha
// APENAS padrões agregados e anônimos. A maturidade coletiva segue gates de
// volume, não de funcionalidade:
//   10 → coleta | 50 → comparação | 100 → hipóteses | 500 → conhecimento |
//   1000+ → recomendações estatisticamente maduras.
//
// Este engine usa o client `prisma` cru (sem guard de tenant) porque lida
// exclusivamente com métricas de PLATAFORMA (agregados), nunca com linhas de
// uma empresa específica. O painel Founder é exclusivo do founder (ADMIN).
// ─────────────────────────────────────────────────────────────────────────────

export interface GateColetivo {
  limite: number
  rotulo: string
  descricao: string
  ativo: boolean
}

export interface MaturidadeColetiva {
  totalEmpresas: number
  nivel: number
  rotulo: string
  descricao: string
  gates: GateColetivo[]
}

const GATES: Omit<GateColetivo, 'ativo'>[] = [
  { limite: 10,  rotulo: 'Coleta', descricao: 'Cada empresa que usa a Ponte aumenta o acervo de padrões.' },
  { limite: 50,  rotulo: 'Comparação', descricao: 'Os primeiros padrões repetidos começam a aparecer.' },
  { limite: 100, rotulo: 'Hipóteses', descricao: 'Padrões viram hipóteses testáveis — sempre marcadas como hipóteses.' },
  { limite: 500, rotulo: 'Conhecimento coletivo', descricao: 'Padrões com repetição suficiente viram conhecimento consolidado.' },
  { limite: 1000, rotulo: 'Recomendações maduras', descricao: 'Recomendações com base estatística real e confiável.' },
]

export async function obterMaturidadeColetiva(): Promise<MaturidadeColetiva> {
  const totalEmpresas = await prisma.empresa.count({ where: { deletedAt: null } })

  const gates = GATES.map((g) => ({ ...g, ativo: totalEmpresas >= g.limite }))

  let nivel = 0
  for (const g of GATES) {
    if (totalEmpresas >= g.limite) nivel++
    else break
  }

  const rotulo = nivel === 0 ? 'Coleta' : GATES[nivel - 1].rotulo

  const descricao =
    nivel === 0
      ? 'Estamos na fase de coleta: cada empresa que usa a Ponte aumenta o acervo de padrões. Nenhum dado de uma empresa é exposto a outra — apenas padrões, e somente quando houver volume.'
      : `Estamos na fase de ${rotulo.toLowerCase()}: os padrões ainda são apresentados como hipóteses, nunca como verdades, até que haja repetição suficiente.`

  return { totalEmpresas, nivel, rotulo, descricao, gates }
}

export interface PadraoColetivo {
  titulo: string
  categoria: string | null
  repeticoes: number
  scoreConfianca: number
}

// Retorna apenas conhecimento coletivo VALIDADO+ — padrões que já mostraram
// repetição. Nunca expõe a empresa de origem nem dados brutos.
export async function obterPadroesColetivos(limite = 5): Promise<PadraoColetivo[]> {
  const registros = await prisma.conhecimentoColetivo.findMany({
    where: {
      deletedAt: null,
      status: { in: ['VALIDADO', 'REPLICADO', 'CONSOLIDADO'] },
    },
    orderBy: [{ repeticoes: 'desc' }, { scoreConfianca: 'desc' }],
    select: { titulo: true, categoria: true, repeticoes: true, scoreConfianca: true },
    take: limite,
  })

  return registros
}
