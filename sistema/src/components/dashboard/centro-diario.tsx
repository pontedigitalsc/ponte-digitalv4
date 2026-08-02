import { AvatarPonte } from '@/components/ui/avatar'

// P52 — Centro Diário: a Ponte responde diariamente a 5 perguntas usando
// dados reais. Não é painel, é presença: o que mudou, o que aprendemos,
// o que merece atenção, que oportunidade estamos deixando passar e o
// próximo melhor movimento.

export interface CentroDiarioData {
  mudancas: string[]
  aprendizados: { id: string; descricao: string; categoria: string }[]
  memoriasEmocionais: string[]
  atencao: { titulo: string; descricao: string }[]
  oportunidade: string | null
  proximoMovimento: string | null
}

function Bloco({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">{rotulo}</p>
      {children}
    </div>
  )
}

export function CentroDiario({ data }: { data: CentroDiarioData }) {
  const temNada = data.mudancas.length === 0 && data.atencao.length === 0 && !data.oportunidade && !data.proximoMovimento

  return (
    <section className="rounded-xl border bg-card p-6 space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <AvatarPonte state="breathing" size="sm" />
        <div>
          <h2 className="text-base font-semibold tracking-tight">Centro Diário</h2>
          <p className="text-xs text-muted-foreground">O que a Ponte enxerga hoje na sua empresa</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Bloco rotulo="O que mudou">
          {data.mudancas.length > 0 ? (
            <ul className="space-y-1">
              {data.mudancas.map((m, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-3">{m}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Nada mudou desde ontem — e isso também é informação.</p>
          )}
        </Bloco>

        <Bloco rotulo="O que aprendemos">
          {data.aprendizados.length > 0 || data.memoriasEmocionais.length > 0 ? (
            <div className="space-y-1">
              {data.aprendizados.slice(0, 2).map((a) => (
                <p key={a.id} className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-3">"{a.descricao}"</p>
              ))}
              {data.memoriasEmocionais.slice(0, 1).map((m, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-3">{m}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Ainda estamos juntando as primeiras lições da sua empresa.</p>
          )}
        </Bloco>

        <Bloco rotulo="O que merece atenção">
          {data.atencao.length > 0 ? (
            <div className="space-y-1">
              {data.atencao.slice(0, 2).map((a, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed border-l-2 border-amber-500/40 pl-3">
                  <span className="font-medium text-amber-700 dark:text-amber-400">{a.titulo}.</span> {a.descricao}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nada crítico agora. Quando surgir, você vê aqui.</p>
          )}
        </Bloco>

        <Bloco rotulo="Que oportunidade estou deixando passar">
          {data.oportunidade ? (
            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-emerald-500/40 pl-3">{data.oportunidade}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Ainda estou observando para encontrar a sua próxima oportunidade.</p>
          )}
        </Bloco>

        <Bloco rotulo="Próximo melhor movimento">
          {data.proximoMovimento ? (
            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-3">{data.proximoMovimento}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Continuar a conversa é o melhor movimento agora.</p>
          )}
        </Bloco>

        {temNada && (
          <p className="text-xs text-muted-foreground/70 sm:col-span-2">
            Conforme a empresa ganha vida dentro da Ponte, esse espaço passa a responder as 5 perguntas todos os dias.
          </p>
        )}
      </div>
    </section>
  )
}
