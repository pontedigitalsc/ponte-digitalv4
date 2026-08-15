const PARES = [
  { parte: 'Cliente', onde: 'WhatsApp' },
  { parte: 'Orçamento', onde: 'uma planilha' },
  { parte: 'Produção', onde: 'a conversa do dia a dia' },
  { parte: 'Financeiro', onde: 'outro controle manual' },
  { parte: 'Gerente', onde: 'a memória dele' },
  { parte: 'Decisão', onde: 'o improviso' },
]

/**
 * O problema — a realidade fragmentada em um mapa concreto: cada informação
 * da empresa vive em um lugar separado. Linguagem honesta ("em muitas
 * empresas", "é comum") — não afirma que toda empresa é assim. O contraste
 * da leitura vem de quão óbvio é o silo quando colocado lado a lado.
 */
export function FragmentacaoMap() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="balloon px-5 py-7 sm:px-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-night-azure">
          Em muitas empresas, é comum encontrar...
        </p>

        {/* mapa de silos — informação à esquerda, lugar onde ela vive à direita */}
        <div className="mx-auto mt-7 max-w-2xl space-y-3">
          {PARES.map((p) => (
            <div key={p.parte} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-5">
              <div className="flex justify-end">
                <span className="pill px-3 py-1.5 text-sm text-night-text">{p.parte}</span>
              </div>
              <div aria-hidden="true" className="flex items-center gap-1.5">
                <span className="dot-azure h-1 w-1 rounded-full opacity-60" />
                <span
                  className="h-px w-6 sm:w-12"
                  style={{ background: 'linear-gradient(90deg, hsl(var(--l-azure)/0.45), hsl(var(--l-azure-dim)/0.25))' }}
                />
                <span className="dot-teal h-1 w-1 rounded-full opacity-50" />
              </div>
              <div className="text-left">
                <span className="inline-block rounded-lg border border-night-700/60 bg-night-850/70 px-3 py-1.5 text-sm text-night-text-dim">
                  {p.onde}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center font-editorial text-xl font-light italic leading-snug text-night-text text-balance sm:text-2xl">
          Quando essas informações ficam separadas,{' '}
          <span className="text-night-text-soft">a decisão fica no improviso.</span>
        </p>
      </div>

      <p className="mx-auto mt-4 max-w-md text-center text-xs italic leading-relaxed text-night-text-dim">
        Não é uma regra sobre todas as empresas — é um padrão comum. A Ponte foi
        pensada para o ponto em que as partes começam a conversar.
      </p>
    </div>
  )
}