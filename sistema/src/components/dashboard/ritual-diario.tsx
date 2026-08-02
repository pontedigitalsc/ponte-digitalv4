import type { RitualDiario as RitualDiarioData } from '@/engine/ritual-engine'
import { AvatarPonte } from '@/components/ui/avatar'

// P53 — Ritual Diário: a abertura que acolhe. Cada dia a Ponte recebe o
// empresário com foco do dia, leitura do momento, percepção espontânea
// (ou silêncio inteligente), um único próximo movimento e uma pergunta
// que permanece depois que ele fecha a Ponte.

export function RitualDiario({ data }: { data: RitualDiarioData }) {
  return (
    <section className="card-premium card-premium-hover rounded-xl p-6 space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <AvatarPonte state="breathing" size="sm" />
        <div>
          <h2 className="text-base font-semibold tracking-tight">O ritual de hoje</h2>
          <p className="text-xs text-muted-foreground">{data.momento.rotulo}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">{data.focoDoDia.rotulo}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.focoDoDia.orientacao}</p>
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">Como sua empresa está</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.momento.postura}</p>
        <p className="text-[10px] text-muted-foreground/60 italic">Baseado em: {data.momento.razao}.</p>
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">O que eu percebi</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{data.percepcao.texto}</p>
      </div>

      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">Próximo melhor movimento</p>
        <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-3">{data.proximoMovimento}</p>
      </div>

      <div className="rounded-lg bg-muted/50 p-4 space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Uma pergunta para levar com você
        </p>
        <p className="text-base font-medium leading-relaxed">{data.perguntaQueFica}</p>
      </div>
    </section>
  )
}
