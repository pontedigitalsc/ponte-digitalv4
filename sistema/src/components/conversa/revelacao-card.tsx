import { useState, useEffect } from 'react'
import type { ResumoNatural } from '@/engine/tipos'
import { AvatarPonte } from '@/components/ui/avatar'

interface RevelacaoCardProps {
  interpretacoes: {
    pontoAtencao: string
    observacao: string
    alinhamento: string
  }
  resumoNatural?: ResumoNatural | null
}

function DigitarTexto({ texto, onComplete }: { texto: string; onComplete?: () => void }) {
  const [mostrado, setMostrado] = useState(0)
  useEffect(() => {
    if (mostrado >= texto.length) { onComplete?.(); return }
    const t = setTimeout(() => setMostrado(p => p + 1), 15)
    return () => clearTimeout(t)
  }, [mostrado, texto, onComplete])
  return <span>{texto.slice(0, mostrado)}<span className="animate-pulse">|</span></span>
}

function CartaContent({ interpretacoes, resumoNatural }: RevelacaoCardProps) {
  const [lido, setLido] = useState(false)

  if (resumoNatural) {
    return (
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
    )
  }

  if (!lido) {
    return (
      <div className="text-center space-y-4 py-8">
        <AvatarPonte state="thinking" size="lg" />
        <p className="text-sm text-muted-foreground">
          <DigitarTexto
            texto="Deixa eu organizar o que entendi sobre sua empresa..."
            onComplete={() => setLido(true)}
          />
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 text-sm leading-relaxed">
      {/* Descoberta obrigatória (ETAPA 4) */}
      <div className="border-l-2 border-primary/30 pl-4 py-2">
        <p className="font-semibold text-foreground">O que mais me chamou atenção hoje</p>
        <p className="mt-1 text-muted-foreground italic">&ldquo;{interpretacoes.observacao}&rdquo;</p>
      </div>

      {interpretacoes.pontoAtencao && (
        <div className="border-l-2 border-amber-500/30 pl-4 py-2">
          <p className="font-semibold text-foreground">Existe um padrão aparecendo</p>
          <p className="mt-1 text-muted-foreground">{interpretacoes.pontoAtencao}</p>
        </div>
      )}

      <div className="border-l-2 border-green-500/30 pl-4 py-2">
        <p className="font-semibold text-foreground">O que mais admirei</p>
        <p className="mt-1 text-muted-foreground">
          Você dedicou tempo para pensar sobre sua empresa. Isso já mostra maturidade. Mesmo que hoje as coisas não estejam como você gostaria, estar aqui é um movimento importante.
        </p>
      </div>

      {/* Uma única ação (ETAPA 5) */}
      <div className="border-l-2 border-primary/30 pl-4 py-2">
        <p className="font-semibold text-foreground">O menor movimento que pode melhorar sua próxima semana</p>
        <p className="mt-1 text-muted-foreground">{interpretacoes.alinhamento}</p>
      </div>

      {/* Continuidade (ETAPA 1 + ETAPA 6 + P49 Carta Nunca Termina) */}
      <div className="mt-6 pt-4 border-t space-y-3">
        <p className="text-sm font-medium text-foreground">O que quero descobrir na próxima conversa</p>
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          {interpretacoes.observacao ? (
            <>Na próxima conversa quero descobrir se isso ainda continua acontecendo. Quero entender o que você percebeu quando passou a observar — e se alguma coisa já mudou.</>
          ) : (
            'Hoje apareceu um padrão interessante. Quero observar isso junto com você durante esta semana. Na próxima conversa quero descobrir se algo mudou.'
          )}
        </p>
      </div>
    </div>
  )
}

export function RevelacaoCard(props: RevelacaoCardProps) {
  return (
    <div className="relative space-y-6">
      <div className="space-y-5 animate-fade-in relative">
        <div className="text-center space-y-3">
          <div className="mx-auto">
            <AvatarPonte state="success" size="lg" />
          </div>
          <p className="text-xs text-muted-foreground italic">
            — Carta para sua empresa —
          </p>
          <h2 className="text-xl font-semibold tracking-tight">
            Olhando para sua empresa
          </h2>
        </div>
        <CartaContent {...props} />
      </div>
    </div>
  )
}
