'use client'

import { useState, useCallback } from 'react'
import { ConversationKnowledgeCard } from '@/components/aprendizados/conversation-knowledge-card'
import { QuickLearningQuestion } from '@/components/aprendizados/quick-learning-question'
import { LearningHistory } from '@/components/aprendizados/learning-history'
import type { LearningExperience, PerguntaRapida, AprendizadoExplicito } from '@/engine'

type Props = {
  experience: LearningExperience
}

export function AprendizadosContent({ experience }: Props) {
  const [aprendizados, setAprendizados] = useState(experience.aprendizados)
  const [jaRespondidas, setJaRespondidas] = useState<string[]>([])

  const handleResponder = useCallback(async (pergunta: PerguntaRapida, resposta: string) => {
    const res = await fetch('/api/aprendizados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descricao: resposta,
        categoria: pergunta.categoria,
        origem: 'PERGUNTA',
        contexto: pergunta.contexto,
      }),
    })
    if (!res.ok) return
    const novo: AprendizadoExplicito = await res.json()
    setAprendizados((prev) => [novo, ...prev])
    setJaRespondidas((prev) => [...prev, pergunta.contexto])
  }, [])

  const handleDesativar = useCallback(async (id: string) => {
    const res = await fetch(`/api/aprendizados?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    if (!res.ok) return
    setAprendizados((prev) => prev.filter((a) => a.id !== id))
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <ConversationKnowledgeCard
          aprendizados={aprendizados}
          onDesativar={handleDesativar}
        />

        {aprendizados.length > 0 && (
          <LearningHistory aprendizados={aprendizados} />
        )}
      </div>

      <div className="space-y-5">
        <QuickLearningQuestion
          perguntas={experience.perguntasRapidas}
          onResponder={handleResponder}
          jaRespondidas={jaRespondidas}
        />
      </div>
    </div>
  )
}
