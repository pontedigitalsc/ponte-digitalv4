const TRADICIONAL = [
  { parte: 'Cliente', lugar: 'CRM' },
  { parte: 'Financeiro', lugar: 'sistema financeiro' },
  { parte: 'Tarefas', lugar: 'gestor de tarefas' },
  { parte: 'Conversas', lugar: 'WhatsApp' },
  { parte: 'Equipe', lugar: 'conhecimento individual' },
  { parte: 'Gestor', lugar: 'interpretação manual' },
]

const PONTE = [
  'Cliente',
  'Operação',
  'Equipe',
  'Conversas',
  'Histórico',
  'Contexto',
  'Inteligência',
]

const PARES = [
  { tradicional: 'Cadastro', ponte: 'Contexto' },
  { tradicional: 'Relatório', ponte: 'Leitura' },
  { tradicional: 'Alerta', ponte: 'Sinal contextual' },
  { tradicional: 'Formulário', ponte: 'Entrada simples' },
  { tradicional: 'Módulo isolado', ponte: 'Operação conectada' },
  { tradicional: 'Automação rígida', ponte: 'Evolução validada' },
  { tradicional: 'Banco de dados', ponte: 'Memória operacional' },
  { tradicional: 'IA genérica', ponte: 'Inteligência contextual' },
]

/**
 * Comparação conceitual entre o modelo tradicional (cada parte em um
 * lugar — realidade fragmentada) e o modelo Ponte (as informações formam
 * uma cadeia e começam a conversar entre si). Sem atacar sistemas: eles
 * resolveram problemas reais; a Ponte tenta existir no ponto em que as
 * partes podem conversar.
 *
 * Abaixo do grid, a tabela por pares mostra a MUDANÇA DE PAPEL de cada
 * ideia (o que era guardar/averbar vira compreender/conectar). Por regra
 * da rodada, é direção — a Ponte não entrega "mais uma tela do mesmo";
 * a mudança de papel é o que procuramos construir.
 */
export function Comparison() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-night-text-soft sm:text-base">
        Os sistemas tradicionais resolveram partes reais da empresa. A Ponte tenta
        existir no ponto em que essas partes podem conversar.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        {/* Modelo tradicional */}
        <div className="rounded-2xl border border-night-700/50 bg-night-surf/50 px-6 py-7 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-text-dim">
            Modelo tradicional
          </p>
          <ul className="mt-4 space-y-2.5">
            {TRADICIONAL.map((t) => (
              <li key={t.parte} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-night-text-soft">{t.parte}</span>
                <span aria-hidden="true" className="text-night-text-dim/60">→</span>
                <span className="text-right text-night-text-dim">{t.lugar}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-night-700/60 pt-4 text-xs italic leading-relaxed text-night-text-dim">
            Muitos lugares, uma realidade fragmentada.
          </p>
        </div>

        <span aria-hidden="true" className="hidden font-editorial text-2xl italic text-night-text-dim lg:block">
          →
        </span>

        {/* Modelo Ponte */}
        <div className="rounded-2xl border border-night-green/40 bg-[radial-gradient(120%_100%_at_100%_0%,hsl(var(--l-green)/0.14),transparent_65%)] bg-night-800/80 px-6 py-7 backdrop-blur-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-green-bright">
            Modelo Ponte
          </p>
          <ul className="mt-4 space-y-2">
            {PONTE.map((p, i) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <span aria-hidden="true" className="dot-green h-1.5 w-1.5 shrink-0 rounded-full" />
                <span className={i === PONTE.length - 1 ? 'font-editorial italic text-night-green-bright' : 'text-night-text'}>
                  {p}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-night-green/30 pt-4 text-xs italic leading-relaxed text-night-text-soft">
            As informações começam a conversar entre si.
          </p>
        </div>
      </div>

      {/* Tabela por pares — a mudança de papel de cada ideia */}
      <div className="mt-12">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-night-text-dim">
          A mudança de papel — o que era guardar vira compreender
        </p>

        <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl border border-night-700/50 bg-night-850/60">
          <div className="grid grid-cols-2 gap-px bg-night-700/40">
            <p className="bg-night-800/70 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-night-text-dim">
              Sistema tradicional
            </p>
            <p className="bg-night-800/70 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-night-green-bright">
              Ponte
            </p>
          </div>

          {PARES.map((par) => (
            <div key={par.tradicional} className="grid grid-cols-2 gap-px bg-night-700/40">
              <div className="flex items-center justify-between gap-3 bg-night-900/60 px-4 py-3">
                <span className="text-sm text-night-text-soft">{par.tradicional}</span>
                <span aria-hidden="true" className="text-xs text-night-text-dim/50">→</span>
              </div>
              <div className="flex items-center gap-2.5 bg-night-800/70 px-4 py-3">
                <span aria-hidden="true" className="dot-green h-1.5 w-1.5 shrink-0 rounded-full" />
                <span className="text-sm font-medium text-night-text">{par.ponte}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-lg text-center text-xs italic leading-relaxed text-night-text-dim">
          Não é trocar um sistema por outro: é mudar o papel que a tecnologia
          cumpre — de guardar o que já foi feito para compreender o que está
          acontecendo. Direção, não promessa de entrega pronta.
        </p>
      </div>
    </div>
  )
}