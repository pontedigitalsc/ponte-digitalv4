'use client'

import { useState, useEffect, useCallback } from 'react'
import { Trash2, RotateCcw, Loader2, Inbox } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/avatar'
import { apiFetch, mensagemDeErro } from '@/lib/api-client'
import { formatarDataRelativa } from '@/lib/utils'

type TipoLixeira = 'clientes' | 'leads' | 'tarefas' | 'implantacoes' | 'transacoes'

interface ItemLixeira {
  id: string
  deletedAt: string | Date
  [key: string]: unknown
}

interface LixeiraModalProps {
  tipo: TipoLixeira
  /** Rótulo singular usado nas mensagens (ex: "cliente", "tarefa") */
  rotuloSingular: string
  /**
   * Como renderizar o título de cada item da lista — cada tipo tem campos
   * diferentes (Cliente.nome, Transacao.descricao, etc), então quem usa o
   * modal decide como extrair o texto principal, em vez do componente
   * embutir um switch por tipo.
   */
  renderTitulo: (item: ItemLixeira) => string
  /** Linha secundária opcional (ex: segmento do cliente, valor da transação) */
  renderSubtitulo?: (item: ItemLixeira) => string | null
  /** Chamado depois de uma restauração bem-sucedida, para o caller recarregar sua lista */
  onRestaurado?: () => void
  children: React.ReactNode // trigger customizado (ex: um botão "Lixeira")
}

export function LixeiraModal({
  tipo, rotuloSingular, renderTitulo, renderSubtitulo, onRestaurado, children,
}: LixeiraModalProps) {
  const [open, setOpen] = useState(false)
  const [itens, setItens] = useState<ItemLixeira[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [restaurandoId, setRestaurandoId] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    setLoading(true)
    setErro(null)
    try {
      const { itens } = await apiFetch<{ itens: ItemLixeira[] }>(`/api/lixeira/${tipo}`)
      setItens(itens)
    } catch (e) {
      setErro(mensagemDeErro(e, 'Erro ao carregar itens excluídos'))
    } finally {
      setLoading(false)
    }
  }, [tipo])

  // Carrega ao abrir, não antes — evita disparar a query em toda página
  // que tenha o modal disponível, mesmo que o usuário nunca clique nele.
  useEffect(() => {
    if (open) carregar()
  }, [open, carregar])

  const restaurar = async (id: string) => {
    setRestaurandoId(id)
    try {
      await apiFetch(`/api/lixeira/${tipo}/${id}`, { method: 'PATCH' })
      setItens((prev) => prev.filter((i) => i.id !== id))
      onRestaurado?.()
    } catch (e) {
      // Mensagem real chega aqui — ex: "Esta ação exige permissão de
      // GESTOR ou superior" para um MEMBRO tentando restaurar.
      setErro(mensagemDeErro(e, 'Erro ao restaurar'))
    } finally {
      setRestaurandoId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContentLixeira
        rotuloSingular={rotuloSingular}
        itens={itens}
        loading={loading}
        erro={erro}
        restaurandoId={restaurandoId}
        renderTitulo={renderTitulo}
        renderSubtitulo={renderSubtitulo}
        onRestaurar={restaurar}
      />
    </Dialog>
  )
}

// Separado em componente interno só para manter o corpo do modal legível
// sem inflar o componente principal com JSX de renderização de lista.
interface DialogContentLixeiraProps {
  rotuloSingular: string
  itens: ItemLixeira[]
  loading: boolean
  erro: string | null
  restaurandoId: string | null
  renderTitulo: (item: ItemLixeira) => string
  renderSubtitulo?: (item: ItemLixeira) => string | null
  onRestaurar: (id: string) => void
}

function DialogContentLixeira({
  rotuloSingular, itens, loading, erro, restaurandoId,
  renderTitulo, renderSubtitulo, onRestaurar,
}: DialogContentLixeiraProps) {
  return (
    <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-muted-foreground" />
          Itens excluídos
        </DialogTitle>
        <DialogDescription>
          {rotuloSingular.charAt(0).toUpperCase() + rotuloSingular.slice(1)}s excluídos nos últimos 30 dias podem ser restaurados aqui.
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto -mx-1 px-1">
        {loading && (
          <div className="space-y-2 py-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-lg" />
            ))}
          </div>
        )}

        {erro && (
          <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive my-2">
            {erro}
          </div>
        )}

        {!loading && itens.length === 0 && !erro && (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Inbox className="h-8 w-8 mb-2 opacity-30" />
            <p className="text-sm">Nenhum {rotuloSingular} excluído recentemente</p>
          </div>
        )}

        {!loading && itens.length > 0 && (
          <ul className="space-y-1.5 py-1">
            {itens.map((item) => {
              const subtitulo = renderSubtitulo?.(item)
              const restaurando = restaurandoId === item.id
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{renderTitulo(item)}</p>
                    <p className="text-xs text-muted-foreground">
                      {subtitulo ? `${subtitulo} · ` : ''}
                      Excluído {formatarDataRelativa(item.deletedAt)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0"
                    disabled={restaurando}
                    onClick={() => onRestaurar(item.id)}
                  >
                    {restaurando
                      ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      : <RotateCcw className="h-3.5 w-3.5" />
                    }
                    {restaurando ? 'Restaurando' : 'Restaurar'}
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </DialogContent>
  )
}
