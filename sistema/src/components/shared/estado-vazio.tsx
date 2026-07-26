'use client'

import type { LucideIcon } from 'lucide-react'
import { SearchX, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EstadoVazioProps {
  icone?: LucideIcon
  titulo: string
  descricao: string
  acaoLabel?: string
  onAcao?: () => void
  temFiltroAtivo?: boolean
  onLimparFiltro?: () => void
  /** Quando true, mostra o estado vazio em um card com borda sutil */
  emCard?: boolean
}

function EstadoVazioVazio({
  icone: Icone = Sparkles,
  titulo,
  descricao,
  acaoLabel,
  onAcao,
  emCard,
}: {
  icone?: LucideIcon
  titulo: string
  descricao: string
  acaoLabel?: string
  onAcao?: () => void
  emCard?: boolean
}) {
  const content = (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4 animate-fade-in">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent mb-4 ring-1 ring-primary/10">
        <Icone className="h-5 w-5 text-primary" />
      </div>
      <p className="text-sm font-semibold text-foreground">{titulo}</p>
      <p className="text-xs text-muted-foreground mt-2 max-w-sm leading-relaxed">{descricao}</p>
      {acaoLabel && onAcao && (
        <Button size="sm" onClick={onAcao} className="mt-5 transition-all duration-200 hover:scale-105">
          {acaoLabel}
        </Button>
      )}
    </div>
  )

  if (emCard) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/20 p-4">
        {content}
      </div>
    )
  }

  return content
}

function EstadoVazioFiltro({
  onLimparFiltro,
}: {
  onLimparFiltro?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4 animate-fade-in">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
        <SearchX className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-semibold">Nada encontrado com esse filtro</p>
      <p className="text-xs text-muted-foreground mt-2 max-w-xs leading-relaxed">
        Tente ajustar a busca ou remover algum filtro para ver mais resultados.
      </p>
      {onLimparFiltro && (
        <Button variant="outline" size="sm" onClick={onLimparFiltro} className="mt-5">
          Limpar filtros
        </Button>
      )}
    </div>
  )
}

export function EstadoVazio({
  icone,
  titulo,
  descricao,
  acaoLabel,
  onAcao,
  temFiltroAtivo = false,
  onLimparFiltro,
  emCard = false,
}: EstadoVazioProps) {
  if (temFiltroAtivo) {
    return <EstadoVazioFiltro onLimparFiltro={onLimparFiltro} />
  }

  return (
    <EstadoVazioVazio
      icone={icone}
      titulo={titulo}
      descricao={descricao}
      acaoLabel={acaoLabel}
      onAcao={onAcao}
      emCard={emCard}
    />
  )
}
