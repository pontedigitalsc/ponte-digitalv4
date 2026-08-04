import { useState } from 'react'
import type { RetratoEstrategico } from '@/engine/retrato-estrategico'

interface RetratoEstrategicoCardProps {
  retrato: RetratoEstrategico
  // P70 — cerimônia: quando `revelar` é true, as seções surgem gradualmente,
  // como se a Ponte estivesse escrevendo o retrato.
  revelar?: boolean
}

function montarTextoCompartilhavel(retrato: RetratoEstrategico): string {
  const partes = retrato.secoes.map(
    (secao) =>
      `${secao.numero}. ${secao.titulo}\n${secao.corpo}${
        secao.itens ? '\n' + secao.itens.map((item) => `- ${item}`).join('\n') : ''
      }`,
  )
  return [retrato.titulo, ...partes, `Pergunta para nossa próxima conversa: ${retrato.proximaReflexao}`].join(
    '\n\n',
  )
}

export function RetratoEstrategicoCard({ retrato, revelar = false }: RetratoEstrategicoCardProps) {
  const [copiado, setCopiado] = useState(false)

  async function copiarRetrato() {
    try {
      await navigator.clipboard.writeText(montarTextoCompartilhavel(retrato))
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2 animate-fade-in">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
          O que entendi sobre sua empresa
        </p>
        <h3 className="text-lg font-semibold tracking-tight">{retrato.titulo}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
          Nada aqui é genérico: cada parte foi escrita a partir do que você me contou — e termina com uma pergunta para continuarmos.
        </p>
      </div>

      <div className="space-y-4">
        {retrato.secoes.map((secao, i) => (
          <div
            key={secao.numero}
            className={`rounded-xl border bg-card p-5 space-y-3 ${revelar ? 'animate-slide-up' : 'animate-fade-in'}`}
            style={revelar ? { animationDelay: `${i * 380}ms`, animationFillMode: 'both' } : undefined}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {secao.numero}
              </span>
              <p className="text-sm font-semibold">{secao.titulo}</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{secao.corpo}</p>
            {secao.itens && (
              <ul className="space-y-2">
                {secao.itens.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-0.5 shrink-0 text-primary" aria-hidden>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div
        className={`rounded-xl border border-dashed border-primary/30 bg-card/50 p-5 space-y-2 ${revelar ? 'animate-slide-up' : 'animate-fade-in'}`}
        style={revelar ? { animationDelay: `${retrato.secoes.length * 380}ms`, animationFillMode: 'both' } : undefined}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
          Pergunta para nossa próxima conversa
        </p>
        <p className="text-sm text-foreground leading-relaxed italic">
          {retrato.proximaReflexao}
        </p>
      </div>

      <p
        className={`text-center text-xs text-muted-foreground italic leading-relaxed ${revelar ? 'animate-fade-in' : ''}`}
        style={revelar ? { animationDelay: `${(retrato.secoes.length + 1) * 380}ms`, animationFillMode: 'both' } : undefined}
      >
        {retrato.aviso}
      </p>

      <div
        className={`flex justify-center ${revelar ? 'animate-fade-in' : ''}`}
        style={revelar ? { animationDelay: `${(retrato.secoes.length + 2) * 380}ms`, animationFillMode: 'both' } : undefined}
      >
        <button
          type="button"
          onClick={copiarRetrato}
          className="rounded-full border bg-card px-5 py-2 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          {copiado ? 'Retrato copiado — pode colar onde quiser' : 'Copiar meu Retrato'}
        </button>
      </div>
    </div>
  )
}
