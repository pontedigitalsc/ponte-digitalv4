'use client'

import { useState, useCallback, useRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmOptions {
  titulo: string
  descricao: string
  textoConfirmar?: string
  textoCancelar?: string
  /** 'destrutiva' usa botão vermelho + ícone de alerta — para exclusões e ações irreversíveis */
  variante?: 'destrutiva' | 'neutra'
}

/**
 * ─── HOOK DE CONFIRMAÇÃO REUTILIZÁVEL ────────────────────────────────────────
 *
 * Substitui `window.confirm()` — que só aceita texto simples, sem estilo,
 * sem botões customizados — por um modal consistente com o resto do
 * sistema, mantendo a mesma ergonomia de uso (await + boolean).
 *
 * Uso:
 *   const { confirmar, ConfirmDialog } = useConfirm()
 *
 *   const handleExcluir = async (id: string) => {
 *     const ok = await confirmar({
 *       titulo: 'Mover cliente para a Lixeira?',
 *       descricao: 'Você poderá restaurá-lo dentro dos próximos 30 dias.',
 *       variante: 'destrutiva',
 *     })
 *     if (ok) await excluirCliente(id)
 *   }
 *
 *   // No JSX do componente, uma única vez:
 *   return <>{ConfirmDialog}...</>
 */
export function useConfirm() {
  const [open, setOpen] = useState(false)
  const [opcoes, setOpcoes] = useState<ConfirmOptions | null>(null)
  // Guarda a função de resolução da Promise em andamento, para o botão
  // de confirmar/cancelar poder "responder" a chamada de confirmar().
  const resolverRef = useRef<((valor: boolean) => void) | null>(null)

  const confirmar = useCallback((novasOpcoes: ConfirmOptions): Promise<boolean> => {
    setOpcoes(novasOpcoes)
    setOpen(true)
    return new Promise((resolve) => {
      resolverRef.current = resolve
    })
  }, [])

  const responder = useCallback((valor: boolean) => {
    setOpen(false)
    resolverRef.current?.(valor)
    resolverRef.current = null
  }, [])

  const ConfirmDialog = (
    <Dialog open={open} onOpenChange={(v) => !v && responder(false)}>
      <DialogContent className="max-w-sm">
        {opcoes && (
          <>
            <DialogHeader>
              <div className="flex items-start gap-3">
                {opcoes.variante === 'destrutiva' && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-4.5 w-4.5 text-destructive" />
                  </div>
                )}
                <div>
                  <DialogTitle>{opcoes.titulo}</DialogTitle>
                  <DialogDescription className="mt-1.5">{opcoes.descricao}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => responder(false)}>
                {opcoes.textoCancelar ?? 'Cancelar'}
              </Button>
              <Button
                variant={opcoes.variante === 'destrutiva' ? 'destructive' : 'default'}
                onClick={() => responder(true)}
              >
                {opcoes.textoConfirmar ?? 'Confirmar'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )

  return { confirmar, ConfirmDialog }
}
