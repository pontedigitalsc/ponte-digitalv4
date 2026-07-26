import { Sparkles } from 'lucide-react'
import type { ResumoNatural } from '@/engine/tipos'

interface RevelacaoCardProps {
  interpretacoes: {
    pontoAtencao: string
    observacao: string
    alinhamento: string
  }
  resumoNatural?: ResumoNatural | null
}

export function RevelacaoCard({ interpretacoes, resumoNatural }: RevelacaoCardProps) {
  if (resumoNatural) {
    return (
      <div className="space-y-5 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent ring-1 ring-primary/20">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Aqui esta o que entendi sobre sua empresa</h2>
        </div>

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
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent ring-1 ring-primary/20">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">Aqui esta o que entendi sobre sua empresa</h2>
      </div>

      <div className="text-sm leading-relaxed text-muted-foreground space-y-3">
        <p><span className="font-semibold text-foreground">Ponto de atencao:</span> {interpretacoes.pontoAtencao}</p>
        <p><span className="font-semibold text-foreground">Observacao:</span> {interpretacoes.observacao}</p>
        <p><span className="font-semibold text-foreground">Alinhamento:</span> {interpretacoes.alinhamento}</p>
      </div>
    </div>
  )
}
