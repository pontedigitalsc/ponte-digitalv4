'use client'

import { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTransacoes } from '@/hooks/use-transacoes'
import { useConfirm } from '@/hooks/use-confirm'
import { FinanceiroResumo } from '@/components/financeiro/financeiro-resumo'
import { TransacaoList } from '@/components/financeiro/transacao-list'
import { format, addMonths, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { TransacaoInput } from '@/lib/validations'
import type { FinanceiroExperience } from '@/engine'

type Props = {
  experience: FinanceiroExperience
}

export function FinancasContent({ experience }: Props) {
  const [mesAtual, setMesAtual] = useState(new Date())
  const [filtros, setFiltros]   = useState<Record<string, string | undefined>>({})
  const [page, setPage]         = useState(1)

  const {
    transacoes, resumo, total, totalPages,
    loading, loadingResumo,
    carregarTransacoes, carregarResumo,
    criarTransacao, atualizarTransacao, marcarComoPago, excluirTransacao,
  } = useTransacoes()
  const { confirmar, ConfirmDialog } = useConfirm()

  const mes = mesAtual.getMonth() + 1
  const ano = mesAtual.getFullYear()

  const carregar = useCallback(() => {
    carregarTransacoes({ ...filtros, mes, ano, page })
    carregarResumo(mes, ano)
  }, [filtros, mes, ano, page, carregarTransacoes, carregarResumo])

  useEffect(() => { carregar() }, [carregar])

  const handleFiltroChange = (novosFiltros: Record<string, string | undefined>) => {
    setFiltros(novosFiltros)
    setPage(1)
  }

  const handleCriar = async (dados: TransacaoInput) => {
    await criarTransacao(dados)
    carregar()
  }

  const handleAtualizar = async (id: string, dados: Partial<TransacaoInput>) => {
    await atualizarTransacao(id, dados)
    carregar()
  }

  const handlePagar = async (id: string) => {
    await marcarComoPago(id)
    carregar()
  }

  const handleExcluir = async (id: string) => {
    const ok = await confirmar({
      titulo: 'Mover lançamento para a Lixeira?',
      descricao: 'Você poderá restaurá-lo dentro dos próximos 30 dias, caso precise.',
      textoConfirmar: 'Mover para a Lixeira',
      variante: 'destrutiva',
    })
    if (ok) {
      await excluirTransacao(id)
      carregar()
    }
  }

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-semibold">Dinheiro da empresa</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {experience.focoFinanceiro?.descricao ?? 'Acompanhe o que entra e o que sai, mês a mês.'}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border bg-card px-2 py-1">
          <button
            onClick={() => setMesAtual(subMonths(mesAtual, 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium w-36 text-center capitalize">
            {format(mesAtual, 'MMMM yyyy', { locale: ptBR })}
          </span>
          <button
            onClick={() => setMesAtual(addMonths(mesAtual, 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {experience.tendencia && (
        <div className="rounded-lg border bg-card px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Tendência:</span>
            <span className="text-sm font-medium">{experience.tendencia.rotulo}</span>
            <span className="text-lg font-bold">{experience.tendencia.valor}</span>
          </div>
        </div>
      )}

      <FinanceiroResumo resumo={resumo} loading={loadingResumo} />

      <TransacaoList
        transacoes={transacoes}
        loading={loading}
        total={total}
        totalPages={totalPages}
        page={page}
        onPageChange={setPage}
        onFiltroChange={handleFiltroChange}
        onCriar={handleCriar}
        onAtualizar={handleAtualizar}
        onPagar={handlePagar}
        onExcluir={handleExcluir}
      />
      {ConfirmDialog}
    </>
  )
}
