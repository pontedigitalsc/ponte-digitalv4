import type { Decisao } from '@/engine'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, AlertTriangle, Check, Shield, ChevronDown } from 'lucide-react'

interface ExplicavelDecisaoCardProps {
  decisao: Decisao | null
}

const COR_CONFIANCA = (c: number) =>
  c >= 0.7 ? 'bg-emerald-500' : c >= 0.4 ? 'bg-amber-500' : 'bg-red-500'

const ROTULO_IMPACTO: Record<string, { label: string; cor: string }> = {
  alto: { label: 'Alto impacto', cor: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30' },
  medio: { label: 'Médio impacto', cor: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30' },
  baixo: { label: 'Baixo impacto', cor: 'text-muted-foreground bg-muted' },
}

const ROTULO_URGENCIA: Record<string, { label: string; cor: string }> = {
  alta: { label: 'Urgente', cor: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950/30' },
  media: { label: 'Média urgência', cor: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30' },
  baixa: { label: 'Baixa urgência', cor: 'text-muted-foreground bg-muted' },
}

const ROTULO_DIFICULDADE: Record<string, { label: string; cor: string }> = {
  alta: { label: 'Difícil', cor: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/30' },
  media: { label: 'Médio esforço', cor: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30' },
  baixa: { label: 'Fácil', cor: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30' },
}

const ROTULO_CATEGORIA: Record<string, string> = {
  FINANCEIRO: 'Financeiro',
  CLIENTES: 'Clientes',
  GESTAO: 'Gestão',
  OPERACAO: 'Operação',
  ESTRATEGIA: 'Estratégia',
  PESSOAS: 'Pessoas',
  PRODUTO: 'Produto',
}

const ROTULO_ACAO: Record<string, string> = {
  registrar: 'Registrar',
  revisar: 'Revisar',
  contatar: 'Contatar',
  negociar: 'Negociar',
  organizar: 'Organizar',
  mapear: 'Mapear',
  conversar: 'Conversar',
  analisar: 'Analisar',
  planejar: 'Planejar',
}

export function ExplicavelDecisaoCard({ decisao }: ExplicavelDecisaoCardProps) {
  if (!decisao) return null

  const categoriaLabel = ROTULO_CATEGORIA[decisao.categoria] ?? decisao.categoria
  const acaoLabel = ROTULO_ACAO[decisao.tipoAcao] ?? decisao.tipoAcao
  const impacto = ROTULO_IMPACTO[decisao.impacto] ?? ROTULO_IMPACTO.baixo
  const urgencia = ROTULO_URGENCIA[decisao.urgencia] ?? ROTULO_URGENCIA.baixa
  const dificuldade = ROTULO_DIFICULDADE[decisao.dificuldade] ?? ROTULO_DIFICULDADE.media

  return (
    <Card className="border-indigo-200 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-950/10">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-indigo-500" />
          Melhor decisão hoje
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium leading-snug">{decisao.titulo}</p>
            <span className="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full border bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50">
              {categoriaLabel}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{decisao.descricao}</p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-3 space-y-1.5">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Por que essa decisão?</p>
          <p className="text-xs leading-relaxed text-foreground/90">{decisao.motivo}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', impacto.cor)}>{impacto.label}</span>
          <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', urgencia.cor)}>{urgencia.label}</span>
          <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full border', dificuldade.cor)}>{dificuldade.label}</span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/50">
            {acaoLabel}
          </span>
        </div>

        <details className="group">
          <summary className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none [&::-webkit-details-marker]:hidden">
            <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
            Ver raciocínio completo
          </summary>

          <div className="mt-3 space-y-3">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-500" />
                Evidências consideradas
              </p>
              {decisao.evidenciasChave.length > 0 ? (
                <ul className="space-y-1">
                  {decisao.evidenciasChave.map((ev, i) => (
                    <li key={i} className="text-xs text-foreground/80 flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                      {ev}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground italic">Nenhuma evidência específica registrada</p>
              )}
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                Confiança na recomendação
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', COR_CONFIANCA(decisao.confianca))}
                    style={{ width: `${Math.round(decisao.confianca * 100)}%` }}
                  />
                </div>
                <span className={cn('text-xs font-medium', COR_CONFIANCA(decisao.confianca).replace('bg-', 'text-').replace('-500', '-600'))}>
                  {Math.round(decisao.confianca * 100)}%
                </span>
              </div>
            </div>

            {decisao.riscos.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  Riscos considerados
                </p>
                <ul className="space-y-1">
                  {decisao.riscos.map((r, i) => (
                    <li key={i} className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {decisao.desconhecidos.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-sky-600 dark:text-sky-400">
                  O que ainda não sabemos
                </p>
                <ul className="space-y-1">
                  {decisao.desconhecidos.map((d, i) => (
                    <li key={i} className="text-xs text-sky-700 dark:text-sky-400 flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {decisao.dependencias && decisao.dependencias.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Shield className="h-3 w-3 text-muted-foreground" />
                  Dependências
                </p>
                <ul className="space-y-1">
                  {decisao.dependencias.map((dep, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                      {dep}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>
      </CardContent>
    </Card>
  )
}
