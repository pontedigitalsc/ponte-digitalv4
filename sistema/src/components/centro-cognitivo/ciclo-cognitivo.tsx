interface CicloCognitivoProps {
  etapaAtual: string
  etapas: string[]
}

export function CicloCognitivo({ etapaAtual, etapas }: CicloCognitivoProps) {
  const idxAtual = etapas.findIndex(e => e.toLowerCase() === etapaAtual.toLowerCase())

  return (
    <div className="flex items-center gap-1" title={`Ciclo: ${etapaAtual}`}>
      {etapas.map((etapa, i) => {
        const concluida = i < idxAtual
        const atual = i === idxAtual
        const futura = i > idxAtual
        return (
          <div
            key={etapa}
            className={`h-2 w-2 rounded-full transition-all ${
              concluida
                ? 'bg-emerald-500'
                : atual
                ? 'bg-primary scale-125'
                : futura
                ? 'bg-muted-foreground/20'
                : 'bg-muted-foreground/20'
            }`}
            title={etapa}
          />
        )
      })}
    </div>
  )
}
