// P36 ETAPA 7 — Mapa de Transformação
// Linha do tempo da evolução da empresa.
// Mostra marcos de transformação, não apenas eventos.

import { prisma } from '@/lib/prisma'

interface MarcoTransformacao {
  ordem: number
  titulo: string
  descricao: string
  icone: string
  data: Date | null
  alcançado: boolean
}

export async function obterMapaTransformacao(empresaId: string): Promise<MarcoTransformacao[]> {
  const [totalVendas, totalRecomendacoes, totalHipotesesValidadas, totalConhecimentos, totalOutcomes, empresa] = await Promise.all([
    prisma.transacao.count({ where: { empresaId, tipo: 'RECEITA', deletedAt: null } }),
    prisma.auditoriaRecomendacao.count({ where: { empresaId, resultado: 'SIM', deletedAt: null } }),
    prisma.hipotese.count({ where: { empresaId, estado: { in: ['FORTALECIDA', 'CONFIRMADA'] }, deletedAt: null } }),
    prisma.conhecimentoValidado.count({ where: { empresaId, deletedAt: null } }),
    prisma.outcome.count({ where: { empresaId, deletedAt: null } }),
    prisma.empresa.findUnique({ where: { id: empresaId }, select: { criadaEm: true } }),
  ])

  return [
    {
      ordem: 1,
      titulo: 'Empresa entrou',
      descricao: 'Primeiro acesso à plataforma',
      icone: '🚪',
      data: empresa?.criadaEm ?? null,
      alcançado: true,
    },
    {
      ordem: 2,
      titulo: 'Primeiras vendas registradas',
      descricao: totalVendas > 0 ? `${totalVendas} vendas no total` : 'Nenhuma venda registrada',
      icone: '💰',
      data: null,
      alcançado: totalVendas > 0,
    },
    {
      ordem: 3,
      titulo: 'Primeira recomendação aceita',
      descricao: totalRecomendacoes > 0 ? `${totalRecomendacoes} recomendações aceitas` : 'Nenhuma recomendação aceita',
      icone: '🎯',
      data: null,
      alcançado: totalRecomendacoes > 0,
    },
    {
      ordem: 4,
      titulo: 'Primeira hipótese validada',
      descricao: totalHipotesesValidadas > 0 ? `${totalHipotesesValidadas} hipóteses validadas` : 'Nenhuma hipótese validada',
      icone: '✅',
      data: null,
      alcançado: totalHipotesesValidadas > 0,
    },
    {
      ordem: 5,
      titulo: 'Primeiro conhecimento reutilizado',
      descricao: totalConhecimentos > 0 ? `${totalConhecimentos} conhecimentos gerados` : 'Nenhum conhecimento gerado',
      icone: '🧠',
      data: null,
      alcançado: totalConhecimentos > 0,
    },
    {
      ordem: 6,
      titulo: 'Primeira melhoria operacional',
      descricao: totalOutcomes > 0 ? `${totalOutcomes} outcomes registrados` : 'Nenhum outcome registrado',
      icone: '⚡',
      data: null,
      alcançado: totalOutcomes > 0,
    },
    {
      ordem: 7,
      titulo: 'Primeira decisão antecipada',
      descricao: 'Decisão tomada antes do problema aparecer',
      icone: '🔮',
      data: null,
      alcançado: false,
    },
    {
      ordem: 8,
      titulo: 'Nova capacidade desenvolvida',
      descricao: 'A empresa evoluiu para um novo nível de maturidade',
      icone: '🏆',
      data: null,
      alcançado: false,
    },
  ]
}

export function MapaTransformacaoView({ marcos }: { marcos: MarcoTransformacao[] }) {
  return (
    <div className="space-y-0">
      {marcos.map((marco, idx) => (
        <div key={marco.ordem} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm border-2 ${
              marco.alcançado
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-muted border-muted-foreground/20 text-muted-foreground/40'
            }`}>
              {marco.icone}
            </div>
            {idx < marcos.length - 1 && (
              <div className={`w-px flex-1 ${marco.alcançado ? 'bg-primary/30' : 'bg-border'}`} />
            )}
          </div>
          <div className={`pb-8 ${!marco.alcançado ? 'opacity-40' : ''}`}>
            <p className="text-sm font-medium">{marco.titulo}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{marco.descricao}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
