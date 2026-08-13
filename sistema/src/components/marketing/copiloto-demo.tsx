import { AvatarPonte } from '@/components/ui/avatar'

/**
 * Demonstração do Copiloto Operacional — exemplo literalmente do fluxo real:
 * "Cliente aprovou o orçamento da cobertura". A Ponte identifica o que já
 * existe, marca o que ainda falta confirmar e pergunta se deve preparar a
 * próxima etapa. Marcado como exemplo conceitual: o caminho que estamos
 * construindo, não uma promessa de que isso já roda em todos os clientes.
 */

const IDENTIFICADOS = [
  { rotulo: 'Cliente', texto: 'identificado' },
  { rotulo: 'Orçamento', texto: 'da cobertura localizado' },
  { rotulo: 'Aprovação', texto: 'registrada como sinal' },
]

const A_CONFIRMAR = ['sinal de pagamento', 'prazo de produção']

export function CopilotoDemo() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="balloon overflow-hidden p-0">
        {/* topo do cartão — o "rosto" do Copiloto */}
        <div className="flex items-center gap-3 border-b border-night-700/50 bg-night-850/70 px-5 py-4">
          <AvatarPonte state="breathing" size="sm" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-night-text">Copiloto Operacional</p>
            <p className="text-xs text-night-text-dim">uma camada de contexto entre a operação e a decisão</p>
          </div>
          <span className="rounded-full border border-night-700/70 bg-night-850 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-night-text-dim">
            exemplo conceitual
          </span>
        </div>

        {/* conversa demonstrativa */}
        <div className="space-y-4 px-5 py-6 sm:px-7">
          {/* o que o empresário disse */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-night-azure/90 px-4 py-3 text-sm leading-relaxed text-night-light-foreground sm:max-w-sm">
              Cliente aprovou o orçamento da cobertura.
            </div>
          </div>

          {/* o que a Ponte devolve */}
          <div className="flex justify-start">
            <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-night-700/60 bg-night-850/70 px-4 py-4 sm:max-w-md">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-night-teal">
                  No que você já me contou
                </p>
                {IDENTIFICADOS.map((item) => (
                  <p key={item.rotulo} className="flex items-start gap-2 text-sm leading-relaxed text-night-text">
                    <span aria-hidden="true" className="text-night-green-bright">✓</span>
                    <span>
                      <span className="text-night-text font-medium">{item.rotulo}</span>{' '}
                      {item.texto}
                    </span>
                  </p>
                ))}

                <p className="pt-2 text-xs font-semibold uppercase tracking-[0.2em] text-night-text-dim">
                  Ainda falta confirmar
                </p>
                {A_CONFIRMAR.map((item) => (
                  <p key={item} className="flex items-start gap-2 pl-1 text-sm leading-relaxed text-night-text-soft">
                    <span aria-hidden="true" className="mt-[0.4em] h-1 w-1 shrink-0 rounded-full bg-night-700" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* a pergunta que ela devolve */}
          <div className="flex justify-end sm:justify-start">
            <div className="rounded-2xl border border-night-green/40 bg-[radial-gradient(120%_100%_at_100%_0%,hsl(var(--l-green)/0.12),transparent_65%)] bg-night-800/80 px-4 py-3 text-sm leading-relaxed text-night-text">
              Quer que eu prepare a próxima etapa — ou prefere decidir com calma?
            </div>
          </div>
        </div>
      </div>

      {/* fecho honesto */}
      <p className="mx-auto mt-5 max-w-xl text-center text-xs italic leading-relaxed text-night-text-dim">
        Exemplo conceitual do fluxo que estamos construindo. A Ponte aprende a
        operação de cada empresa antes de acompanhá-la — e sempre pergunta antes
        de agir.
      </p>
    </div>
  )
}