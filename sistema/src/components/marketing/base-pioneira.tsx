import { AvatarPonte } from '@/components/ui/avatar'

/**
 * Como a empresa constrói a própria base — o caminho de quem chega primeiro:
 * a Ponte não chega pronta na empresa; ela aprende a operação de quem a
 * alimenta. Cada empresa constrói sua base, e a primeira a mapear uma
 * categoria ajuda a desenhar o padrão — sem que isso prometa liderança de
 * mercado ou números inventados.
 *
 * A menção a "pioneiro da categoria" tem base real no produto: o modelo de
 * diagnóstico operacional registra a primeira empresa de cada categoria como
 * pioneira (ver service descoberta-operacional / campo empresaPioneiraId).
 * A linguagem segue a honestidade: quem se dispõe a construir junto, não
 * quem se promete vencedor.
 */

const FLUXO = [
  {
    n: '01',
    titulo: 'A empresa conta como funciona',
    texto: 'O empresário descreve a operação real — não como deveria ser, mas como é.',
  },
  {
    n: '02',
    titulo: 'A base nasce do que foi dito',
    texto: 'O que já existe vira estrutura: sinais, contexto, hipóteses marcadas como hipóteses.',
  },
  {
    n: '03',
    titulo: 'A equipe valida',
    texto: 'Nada vira regra sem passar por quem vive o chão da empresa. Exceções são mantidas.',
  },
  {
    n: '04',
    titulo: 'A solução evolui com o uso',
    texto: 'Quanto mais a operação alimenta, mais a leitura se afina — sempre devolvendo perguntas, não ordens.',
  },
]

export function BasePioneira() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          A base é da empresa
        </p>
        <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          A Ponte não chega pronta.{' '}
          <span className="italic text-night-mist">Ela aprende a sua operação, com você.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-night-text-soft">
          Isso significa que a primeira empresa a mapear um jeito de trabalhar
          ajuda a desenhar o padrão para a categoria — e a construir sua própria
          base no caminho.
        </p>
      </div>

      {/* Fluxo — a construção da base */}
      <ol className="mx-auto mt-12 max-w-xl space-y-0">
        {FLUXO.map((etapa, i) => (
          <li key={etapa.n} className="relative flex gap-5 pb-9 last:pb-0">
            {i < FLUXO.length - 1 && (
              <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-night-teal/40 to-night-teal/10" />
            )}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-night-700/70 bg-night-800 text-xs font-semibold text-night-teal shadow-[0_0_16px_-4px_hsl(var(--l-teal)/0.5)]">
              {etapa.n}
            </span>
            <div className="pt-0.5">
              <p className="font-editorial text-lg font-light tracking-tight text-night-text">{etapa.titulo}</p>
              <p className="mt-1 text-sm leading-relaxed text-night-text-soft">{etapa.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Pioneiro da categoria */}
      <div className="balloon relative mt-10 overflow-hidden px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center self-center rounded-2xl border border-night-green/30 bg-night-800 sm:self-auto">
            <AvatarPonte state="breathing" size="sm" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
              O pioneiro da categoria
            </p>
            <p className="mt-2 font-editorial text-xl font-light leading-snug text-night-text sm:text-2xl">
              A primeira empresa a mapear uma categoria fica registrada como
              sua pioneira.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-night-text-soft">
              Isso existe no produto: quando a categoria nasce, a primeira
              empresa a construir a base junto com a Ponte é marcada como
              pioneira. Quem chega primeiro não ganha um título de vitória —
              ganha a chance de ajudar a definir como a categoria será
              compreendida.
            </p>
          </div>
        </div>
      </div>

      {/* fecho honesto */}
      <p className="mx-auto mt-8 max-w-md text-center text-xs italic leading-relaxed text-night-text-dim">
        Ser pioneiro não é ganhar mercado prometido — é construir um padrão que
        talvez ajude muitas empresas da mesma categoria. É isso que a Ponte
        procura honrar.
      </p>
    </div>
  )
}