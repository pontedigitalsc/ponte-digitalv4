'use client'

import { useEffect, useState, useMemo } from 'react'
import { Plus, Search, RefreshCw, AlertCircle } from 'lucide-react'
import { PipelineColumn } from './pipeline-column'
import { LeadModal } from './lead-modal'
import { useLeads } from '@/hooks/use-leads'
import { useConfirm } from '@/hooks/use-confirm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/avatar'
import { formatarMoeda } from '@/lib/utils'
import type { Lead, EstagioLead } from '@/types'
import type { LeadInput } from '@/lib/validations'

// Ordem das colunas do pipeline
const COLUNAS: EstagioLead[] = [
  'CONTATO', 'DIAGNOSTICO', 'PROPOSTA', 'NEGOCIACAO', 'FECHADO_GANHO', 'FECHADO_PERDIDO'
]

export function Pipeline() {
  const { leads, loading, error, carregarLeads, criarLead, atualizarLead, moverEstagio, excluirLead } = useLeads()
  const { confirmar, ConfirmDialog } = useConfirm()
  const [busca, setBusca] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [leadEditando, setLeadEditando] = useState<Lead | null>(null)
  const [estagioModal, setEstagioModal] = useState<EstagioLead>('CONTATO')

  useEffect(() => {
    carregarLeads()
  }, [carregarLeads])

  // Filtro por busca
  const leadsFiltrados = useMemo(() => {
    if (!busca.trim()) return leads
    const q = busca.toLowerCase()
    return leads.filter(
      (l) =>
        l.nome.toLowerCase().includes(q) ||
        (l.empresa ?? '').toLowerCase().includes(q) ||
        (l.email ?? '').toLowerCase().includes(q)
    )
  }, [leads, busca])

  // Agrupa leads por estágio
  const leadsPorEstagio = useMemo(() => {
    const mapa: Record<EstagioLead, Lead[]> = {
      CONTATO: [], DIAGNOSTICO: [], PROPOSTA: [],
      NEGOCIACAO: [], FECHADO_GANHO: [], FECHADO_PERDIDO: [],
    }
    leadsFiltrados.forEach((l) => mapa[l.estagio].push(l))
    return mapa
  }, [leadsFiltrados])

  // Totais do pipeline (apenas ativos)
  const totalAtivos = leads.filter(
    (l) => l.estagio !== 'FECHADO_GANHO' && l.estagio !== 'FECHADO_PERDIDO'
  ).length
  const valorPipeline = leads
    .filter((l) => l.estagio !== 'FECHADO_PERDIDO')
    .reduce((acc, l) => acc + (l.valor ?? 0), 0)

  // Handlers
  const abrirNovoPorEstagio = (estagio: EstagioLead) => {
    setLeadEditando(null)
    setEstagioModal(estagio)
    setModalOpen(true)
  }

  const abrirEdicao = (lead: Lead) => {
    setLeadEditando(lead)
    setEstagioModal(lead.estagio)
    setModalOpen(true)
  }

  const fecharModal = () => {
    setModalOpen(false)
    setLeadEditando(null)
  }

  const handleSubmit = async (dados: LeadInput) => {
    if (leadEditando) {
      await atualizarLead(leadEditando.id, dados)
    } else {
      await criarLead(dados)
    }
  }

  const handleDelete = async (id: string) => {
    const ok = await confirmar({
      titulo: 'Mover oportunidade para a Lixeira?',
      descricao: 'Você poderá restaurá-la dentro dos próximos 30 dias, caso precise.',
      textoConfirmar: 'Mover para a Lixeira',
      variante: 'destrutiva',
    })
    if (ok) await excluirLead(id)
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar oportunidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-8 h-8 w-56 text-xs"
            />
          </div>
          <button
            onClick={() => carregarLeads()}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-accent transition-colors"
            title="Atualizar"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-muted-foreground ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Resumo das etapas de negociação */}
          <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
            <span><strong className="text-foreground">{totalAtivos}</strong> ativas</span>
            {valorPipeline > 0 && (
              <span><strong className="text-emerald-600">{formatarMoeda(valorPipeline)}</strong> em negociação</span>
            )}
          </div>

          <Button size="sm" onClick={() => abrirNovoPorEstagio('CONTATO')}>
            <Plus className="h-4 w-4" />
            Nova oportunidade
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Loading inicial */}
      {loading && leads.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="h-6 w-6" />
        </div>
      )}

      {/* Kanban board */}
      {!loading || leads.length > 0 ? (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-3 h-full min-h-[calc(100vh-220px)]">
            {COLUNAS.map((estagio) => (
              <PipelineColumn
                key={estagio}
                estagio={estagio}
                leads={leadsPorEstagio[estagio]}
                onAddLead={abrirNovoPorEstagio}
                onEditLead={abrirEdicao}
                onDeleteLead={handleDelete}
                onDropLead={moverEstagio}
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* Modal */}
      <LeadModal
        open={modalOpen}
        lead={leadEditando}
        estagioInicial={estagioModal}
        onClose={fecharModal}
        onSubmit={handleSubmit}
      />
      {ConfirmDialog}
    </div>
  )
}
