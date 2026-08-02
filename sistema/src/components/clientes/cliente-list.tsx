'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Search, RefreshCw, AlertCircle,
  Phone, Mail,
  Pencil, Trash2, ExternalLink, UserPlus,
} from 'lucide-react'
import { useClientes } from '@/hooks/use-clientes'
import { useConfirm } from '@/hooks/use-confirm'
import { ClienteModal } from './cliente-modal'
import { LixeiraModal } from '@/components/shared/lixeira-modal'
import { EstadoVazio } from '@/components/shared/estado-vazio'
import { DropdownMenu } from '@/components/shared/dropdown-menu'
import { DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/avatar'
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from '@/components/ui/form-elements'
import { STATUS_CLIENTE } from '@/constants'
import { formatarMoeda, formatarTelefone, cn } from '@/lib/utils'
import type { Cliente, StatusCliente } from '@/types'
import type { ClienteInput } from '@/lib/validations'

export function ClienteList() {
  const router = useRouter()
  const { clientes, total, totalPages, loading, error, carregarClientes, criarCliente, atualizarCliente, excluirCliente } = useClientes()
  const { confirmar, ConfirmDialog } = useConfirm()

  const [busca, setBusca] = useState('')
  const [statusFiltro, setStatusFiltro] = useState<StatusCliente | 'TODOS'>('TODOS')
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null)
  const carregar = useCallback(() => {
    carregarClientes({
      busca: busca || undefined,
      status: statusFiltro !== 'TODOS' ? statusFiltro : undefined,
      page,
    })
  }, [busca, statusFiltro, page, carregarClientes])

  useEffect(() => { carregar() }, [carregar])

  // Debounce busca
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); carregar() }, 350)
    return () => clearTimeout(t)
  }, [busca]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (dados: ClienteInput) => {
    if (clienteEditando) {
      await atualizarCliente(clienteEditando.id, dados)
    } else {
      await criarCliente(dados)
    }
    setModalOpen(false)
    setClienteEditando(null)
  }

  const handleDelete = async (id: string) => {
    const ok = await confirmar({
      titulo: 'Mover cliente para a Lixeira?',
      descricao: 'Você poderá restaurá-lo dentro dos próximos 30 dias, caso precise.',
      textoConfirmar: 'Mover para a Lixeira',
      variante: 'destrutiva',
    })
    if (ok) await excluirCliente(id)
  }

  const abrirEdicao = (cliente: Cliente) => {
    setClienteEditando(cliente)
    setModalOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>

          <Select
            value={statusFiltro}
            onValueChange={(v) => { setStatusFiltro(v as StatusCliente | 'TODOS'); setPage(1) }}
          >
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos os status</SelectItem>
              {Object.entries(STATUS_CLIENTE).map(([key, s]) => (
                <SelectItem key={key} value={key}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={carregar}
            disabled={loading}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border hover:bg-accent transition-colors"
          >
            <RefreshCw className={cn('h-3.5 w-3.5 text-muted-foreground', loading && 'animate-spin')} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {total > 0 && <><strong className="text-foreground">{total}</strong> cliente{total !== 1 ? 's' : ''}</>}
          </span>
          <LixeiraModal
            tipo="clientes"
            rotuloSingular="cliente"
            renderTitulo={(item) => String(item.nome ?? '—')}
            renderSubtitulo={(item) => (item.segmento ? String(item.segmento) : null)}
            onRestaurado={carregar}
          >
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Trash2 className="h-3.5 w-3.5" />
                Lixeira
              </Button>
            </DialogTrigger>
          </LixeiraModal>
          <Button size="sm" onClick={() => { setClienteEditando(null); setModalOpen(true) }}>
            <Plus className="h-4 w-4" />
            Novo cliente
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

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Contato</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Mensalidade</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading && clientes.length === 0
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
                      <td className="px-4 py-3 hidden md:table-cell"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><Skeleton className="h-4 w-20" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-5 w-16 rounded-full" /></td>
                      <td className="px-4 py-3" />
                    </tr>
                  ))
                : clientes.map((cliente) => {
                    const status = STATUS_CLIENTE[cliente.status]
                    return (
                      <tr
                        key={cliente.id}
                        className="hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => router.push(`/clientes/${cliente.id}`)}
                      >
                        {/* Nome */}
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{cliente.nome}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {cliente.segmento ?? '—'}{cliente.cidade ? ` · ${cliente.cidade}` : ''}
                            </p>
                          </div>
                        </td>

                        {/* Contato */}
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="space-y-0.5">
                            {cliente.telefone && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {formatarTelefone(cliente.telefone)}
                              </div>
                            )}
                            {cliente.email && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span className="truncate max-w-[160px]">{cliente.email}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Mensalidade */}
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {cliente.valorMensal ? (
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">
                              {formatarMoeda(cliente.valorMensal)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                            style={{ color: status.cor, backgroundColor: status.bg }}
                          >
                            {status.label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu
                            items={[
                              { label: 'Ver perfil', onClick: () => router.push(`/clientes/${cliente.id}`), icon: <ExternalLink className="h-3.5 w-3.5" /> },
                              { label: 'Editar', onClick: () => abrirEdicao(cliente), icon: <Pencil className="h-3.5 w-3.5" /> },
                              'divider',
                              { label: 'Remover', onClick: () => handleDelete(cliente.id), variant: 'danger', icon: <Trash2 className="h-3.5 w-3.5" /> },
                            ]}
                          />
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>

          {/* Empty state */}
          {!loading && clientes.length === 0 && (
            <EstadoVazio
              icone={UserPlus}
              titulo="Ainda não existem clientes cadastrados"
              descricao="Adicione seu primeiro contato para começar a organizar seus relacionamentos e acompanhar cada um."
              acaoLabel="Novo cliente"
              onAcao={() => { setClienteEditando(null); setModalOpen(true) }}
              temFiltroAtivo={Boolean(busca || statusFiltro !== 'TODOS')}
              onLimparFiltro={() => { setBusca(''); setStatusFiltro('TODOS') }}
            />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Página {page} de {totalPages}
            </p>
            <div className="flex gap-1">
              <Button
                variant="outline" size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
              >
                Anterior
              </Button>
              <Button
                variant="outline" size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
              >
                Próxima
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <ClienteModal
        open={modalOpen}
        cliente={clienteEditando}
        onClose={() => { setModalOpen(false); setClienteEditando(null) }}
        onSubmit={handleSubmit}
      />
      {ConfirmDialog}
    </div>
  )
}
