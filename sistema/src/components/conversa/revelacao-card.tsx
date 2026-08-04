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

// P70 — Cerimônia de entrega. A tela limpa, a Ponte diz que vai organizar o
// que entendeu (~3s) e o Retrato surge gradualmente, seção por seção, como se
// estivesse escrevendo. A entrega é um momento — nunca uma tabela que aparece.
export function RevelacaoCard({ retratoEstrategico }: RevelacaoCardProps) {
  const [fase, setFase] = useState<'espera' | 'organizando' | 'revelando'>('espera')

  useEffect(() => {
    const t1 = setTimeout(() => setFase('organizando'), 500)
    const t2 = setTimeout(() => setFase('revelando'), 3600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
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

  if (fase === 'organizando') {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center space-y-5 max-w-sm mx-auto animate-fade-in">
          <AvatarPonte state="thinking" size="lg" />
          <p className="text-base text-foreground font-medium leading-relaxed">
            A conversa terminou. Agora quero organizar tudo o que consegui entender.
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
          Olhando para sua empresa
        </h2>
      </div>

      {retratoEstrategico && (
        <RetratoEstrategicoCard retrato={retratoEstrategico} revelar />
      )}
    </div>
  )
}
