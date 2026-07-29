import { useState, useEffect, useCallback } from 'react'
import type { ResumoNatural } from '@/engine/tipos'
import { CognitiveAvatar } from '@/components/ui/avatar'
import { ConfidenceRing } from '@/components/cognitive/confidence-ring'

interface RevelacaoCardProps {
  interpretacoes: {
    pontoAtencao: string
    observacao: string
    alinhamento: string
  }
  resumoNatural?: ResumoNatural | null
}

function InsightGlow() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 600)
    return () => clearTimeout(t)
  }, [])
  if (!show) return null
  return <div className="absolute inset-0 rounded-xl animate-insight-glow pointer-events-none" />
}

function InsightStar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 400)
    return () => clearTimeout(t)
  }, [])
  if (!show) return null
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 animate-insight-star pointer-events-none">
      <span className="text-2xl drop-shadow-lg" style={{ color: 'hsl(var(--glow-insight))' }}>✦</span>
    </div>
  )
}

function PausaCognitiva({ onComplete }: { onComplete: () => void }) {
  const [fase, setFase] = useState(0)
  const fases = [
    'Interpretando respostas...',
    'Cruzando padrões...',
    'Montando diagnóstico...',
  ]

  useEffect(() => {
    if (fase >= fases.length) {
      onComplete()
      return
    }
    const t = setTimeout(() => setFase((f) => f + 1), 600)
    return () => clearTimeout(t)
  }, [fase, onComplete, fases.length])

  return (
    <div className="text-center space-y-4 py-8">
      <CognitiveAvatar state="thinking" size="lg" />
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground animate-fade-in" key={fase}>
          {fases[fase] ?? 'Finalizando...'}
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
      <ConfidenceRing value={65} size="sm" showLabel />
    </div>
  )
}

export function RevelacaoCard({ interpretacoes, resumoNatural }: RevelacaoCardProps) {
  const [pronto, setPronto] = useState(false)
  const handleComplete = useCallback(() => setPronto(true), [])

  const content = resumoNatural ? (
    <div className="space-y-5 text-sm leading-relaxed">
      <div>
        <p className="font-semibold mb-1">{resumoNatural.secao1.titulo}</p>
        <p className="text-muted-foreground">{resumoNatural.secao1.paragrafo}</p>
      </div>
      <div>
        <p className="font-semibold mb-1">{resumoNatural.secao2.titulo}</p>
        {resumoNatural.secao2.pontos.map((p, i) => (
          <p key={i} className="text-muted-foreground mb-1">{p.evidencia}</p>
        ))}
      </div>
      <div>
        <p className="font-semibold mb-1">{resumoNatural.secao3.titulo}</p>
        <p className="text-muted-foreground">{resumoNatural.secao3.paragrafo}</p>
      </div>
      <div>
        <p className="font-semibold mb-1">{resumoNatural.secao4.titulo}</p>
        {resumoNatural.secao4.lacunas.map((l, i) => (
          <p key={i} className="text-muted-foreground mb-1">&bull; {l}</p>
        ))}
      </div>
      <div>
        <p className="font-semibold mb-1">{resumoNatural.secao5.titulo}</p>
        <p className="text-muted-foreground">{resumoNatural.secao5.acao}</p>
      </div>
    </div>
  ) : (
    <div className="text-sm leading-relaxed text-muted-foreground space-y-3">
      <p><span className="font-semibold text-foreground">Ponto de atencao:</span> {interpretacoes.pontoAtencao}</p>
      <p><span className="font-semibold text-foreground">Observacao:</span> {interpretacoes.observacao}</p>
      <p><span className="font-semibold text-foreground">Alinhamento:</span> {interpretacoes.alinhamento}</p>
    </div>
  )

  if (!pronto) {
    return <PausaCognitiva onComplete={handleComplete} />
  }

  return (
    <div className="relative space-y-6">
      <InsightGlow />
      <InsightStar />
      <div className="space-y-5 animate-fade-in relative">
        <div className="text-center space-y-3">
          <div className="mx-auto">
            <CognitiveAvatar state="success" size="lg" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <ConfidenceRing value={85} size="sm" />
            <h2 className="text-xl font-semibold tracking-tight">Aqui esta o que entendi sobre sua empresa</h2>
          </div>
        </div>
        {content}
      </div>
    </div>
  )
}
