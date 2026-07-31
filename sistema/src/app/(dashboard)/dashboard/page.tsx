'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AvatarPonte } from '@/components/ui/avatar'

const HUMORES = [
  { emoji: '😀', rotulo: 'Muito bem', cor: 'border-green-400/40 hover:bg-green-50 dark:hover:bg-green-950/20' },
  { emoji: '🙂', rotulo: 'Bem',       cor: 'border-blue-400/40 hover:bg-blue-50 dark:hover:bg-blue-950/20' },
  { emoji: '😐', rotulo: 'Mais ou menos', cor: 'border-amber-400/40 hover:bg-amber-50 dark:hover:bg-amber-950/20' },
  { emoji: '😟', rotulo: 'Difícil',    cor: 'border-orange-400/40 hover:bg-orange-50 dark:hover:bg-orange-950/20' },
  { emoji: '😔', rotulo: 'Muito difícil', cor: 'border-red-400/40 hover:bg-red-50 dark:hover:bg-red-950/20' },
]

export default function HomePage() {
  const [selecionado, setSelecionado] = useState<string | null>(null)
  const router = useRouter()

  if (selecionado) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="max-w-md text-center space-y-6 animate-fade-in">
          <AvatarPonte state="speaking" size="lg" />
          <p className="text-lg text-muted-foreground leading-relaxed">
            Me conta o que aconteceu.
          </p>
          <textarea
            autoFocus
            className="w-full rounded-xl border bg-card p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[120px]"
            placeholder="Pode escrever à vontade. Estou aqui para ouvir."
          />
          <button
            onClick={() => router.push('/conversa')}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Quero conversar sobre isso
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-lg text-center space-y-8 animate-fade-in">
        <div className="space-y-3">
          <AvatarPonte state="breathing" size="lg" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Como sua empresa está hoje?
          </h1>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {HUMORES.map((h) => (
            <button
              key={h.rotulo}
              onClick={() => setSelecionado(h.rotulo)}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 bg-card p-4 transition-all ${h.cor}`}
            >
              <span className="text-3xl">{h.emoji}</span>
              <span className="text-xs font-medium text-muted-foreground">{h.rotulo}</span>
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Não precisa ser perfeito. É sobre como você se sente hoje.
        </p>
      </div>
    </div>
  )
}
