'use client'

import { Search } from 'lucide-react'
import { CATEGORIA_EVIDENCIA, STATUS_CONHECIMENTO } from '@/constants'

interface KnowledgeFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  categoriaFiltro: string | null
  onCategoriaChange: (value: string | null) => void
  statusFiltro: string | null
  onStatusChange: (value: string | null) => void
  ordenarPor: string
  onOrdenarChange: (value: string) => void
}

export function KnowledgeFilters({
  search,
  onSearchChange,
  categoriaFiltro,
  onCategoriaChange,
  statusFiltro,
  onStatusChange,
  ordenarPor,
  onOrdenarChange,
}: KnowledgeFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar conhecimento..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-9 pl-8 pr-3 rounded-md border bg-background text-sm outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <select
          value={categoriaFiltro ?? ''}
          onChange={(e) => onCategoriaChange(e.target.value || null)}
          className="h-9 rounded-md border bg-background px-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Todas categorias</option>
          {Object.entries(CATEGORIA_EVIDENCIA).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <select
          value={statusFiltro ?? ''}
          onChange={(e) => onStatusChange(e.target.value || null)}
          className="h-9 rounded-md border bg-background px-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Todos status</option>
          {Object.entries(STATUS_CONHECIMENTO).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <select
          value={ordenarPor}
          onChange={(e) => onOrdenarChange(e.target.value)}
          className="h-9 rounded-md border bg-background px-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="recentes">Mais recentes</option>
          <option value="score">Maior confiança</option>
          <option value="antigos">Mais antigos</option>
        </select>
      </div>
    </div>
  )
}
