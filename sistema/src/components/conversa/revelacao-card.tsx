'use client'

import { useState, useEffect } from 'react'
import type { RetratoEstrategico } from '@/engine/retrato-estrategico'
import { AvatarPonte } from '@/components/ui/avatar'
import { RetratoEstrategicoCard } from '@/components/conversa/retrato-estrategico-card'

interface RevelacaoCardProps {
  interpretacoes?: {
    pontoAtencao: string
    observacao: string
    alinhamento: string
  } | null
  retratoEstrategico?: RetratoEstrategico | null
}

// P65 — Cerimônia de entrega em 4 passos. A tela limpa e a Ponte atravessa
// os passos como se estivesse de fato pensando na empresa:
//   Organizando... → Conectando padrões... → Analisando sua empresa...
//   → Preparando seu Retrato...
// Cada passo tem uma mensagem própria — nunca um spinner. Depois o Retrato
// (V3, seis partes) surge gradualmente, seção por seção.
const PASSOS_CERIMONIA = [
  { chave: 'organizando', mensagem: 'A conversa terminou. Agora quero voltar ao começo dela e rever as primeiras impressões.' },
  { chave: 'conectando', mensagem: 'Vou conectar o que você me contou em relações — não em respostas soltas.' },
  { chave: 'analisando', mensagem: 'Deixa eu ver se percebi um padrão que ainda não tinha notado.' },
  { chave: 'preparando', mensagem: 'Estou organizando a descoberta que quero compartilhar com você.' },
] as const

type FaseCerimonia = 'espera' | (typeof PASSOS_CERIMONIA)[number]['chave'] | 'revelando'

export function RevelacaoCard({ retratoEstrategico }: RevelacaoCardProps) {
  const [fase, setFase] = useState<FaseCerimonia>('espera')

  useEffect(() => {
    const timers = [
      setTimeout(() => setFase('organizando'), 400),
      setTimeout(() => setFase('conectando'), 1400),
      setTimeout(() => setFase('analisando'), 2500),
      setTimeout(() => setFase('preparando'), 3600),
      setTimeout(() => setFase('revelando'), 4700),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  if (fase === 'espera') {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <AvatarPonte state="breathing" size="lg" />
        </div>
      </div>
    )
  }

  const passo = PASSOS_CERIMONIA.find((p) => p.chave === fase)

  if (passo) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center space-y-5 max-w-sm mx-auto animate-fade-in" key={passo.chave}>
          <AvatarPonte state="thinking" size="lg" />
          <p className="text-base text-foreground font-medium leading-relaxed">
            {passo.mensagem}
          </p>
          <div className="flex items-center justify-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-3 animate-slide-up">
        <div className="mx-auto">
          <AvatarPonte state="success" size="lg" />
        </div>
        <p className="text-xs text-muted-foreground italic">
          — Sua Primeira Sessão Estratégica —
        </p>
        <h2 className="text-xl font-semibold tracking-tight">
          Olhando para sua empresa de um jeito novo
        </h2>
      </div>

      {retratoEstrategico && (
        <RetratoEstrategicoCard retrato={retratoEstrategico} revelar />
      )}
    </div>
  )
}
