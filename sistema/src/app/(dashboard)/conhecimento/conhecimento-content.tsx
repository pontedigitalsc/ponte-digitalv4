'use client'

import { useState, useMemo } from 'react'
import { KnowledgeSummary } from '@/components/conhecimento/knowledge-summary'
import { KnowledgeFilters } from '@/components/conhecimento/knowledge-filters'
import { KnowledgeCard } from '@/components/conhecimento/knowledge-card'
import { KnowledgeTimeline } from '@/components/conhecimento/knowledge-timeline'
import { KnowledgeTag } from '@/components/conhecimento/knowledge-tag'
import type { ConhecimentoExperience } from '@/engine'

type Props = {
  experience: ConhecimentoExperience
}

export function ConhecimentoContent({ experience }: Props) {
  const [search, setSearch] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | null>(null)
  const [statusFiltro, setStatusFiltro] = useState<string | null>(null)
  const [ordenarPor, setOrdenarPor] = useState('recentes')

  const conhecimentosFiltrados = useMemo(() => {
    let lista = [...experience.conhecimentos]

    if (search) {
      const termo = search.toLowerCase()
      lista = lista.filter((c) => c.descricao.toLowerCase().includes(termo))
    }
    if (categoriaFiltro) {
      lista = lista.filter((c) => c.categoria === categoriaFiltro)
    }
    if (statusFiltro) {
      lista = lista.filter((c) => c.status === statusFiltro)
    }

    if (ordenarPor === 'score') {
      lista.sort((a, b) => b.scoreConfianca - a.scoreConfianca)
    } else if (ordenarPor === 'antigos') {
      lista.sort((a, b) => new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime())
    } else {
      lista.sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
    }

    return lista
  }, [experience.conhecimentos, search, categoriaFiltro, statusFiltro, ordenarPor])

  return (
    <div className="space-y-6">
      <KnowledgeSummary {...experience.resumo} />

      <KnowledgeFilters
        search={search}
        onSearchChange={setSearch}
        categoriaFiltro={categoriaFiltro}
        onCategoriaChange={setCategoriaFiltro}
        statusFiltro={statusFiltro}
        onStatusChange={setStatusFiltro}
        ordenarPor={ordenarPor}
        onOrdenarChange={setOrdenarPor}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {conhecimentosFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">Nenhum conhecimento encontrado com esses filtros.</p>
            </div>
          ) : (
            conhecimentosFiltrados.map((item) => (
              <KnowledgeCard key={item.id} item={item} />
            ))
          )}
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Categorias</h3>
            <div className="space-y-1.5">
              {experience.categorias.map((cat) => (
                <button
                  key={cat.categoria}
                  onClick={() => setCategoriaFiltro(categoriaFiltro === cat.categoria ? null : cat.categoria)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${
                    categoriaFiltro === cat.categoria ? 'bg-muted font-medium' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <KnowledgeTag type="categoria" value={cat.categoria} />
                    <span className="text-xs text-muted-foreground">({cat.total})</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{cat.confirmados} confirmados</span>
                </button>
              ))}
            </div>
          </div>

          <KnowledgeTimeline events={experience.timeline} />
        </div>
      </div>
    </div>
  )
}
