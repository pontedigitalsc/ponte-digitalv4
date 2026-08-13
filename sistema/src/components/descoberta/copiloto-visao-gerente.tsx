'use client'

import { Building2, Compass, Eye, MessageSquare, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  classificarNivelIntervencao,
  montarContextoOperacional,
  montarMapaDeAtrito,
  avaliarCargaCognitivaPorProcesso,
  proximasPerguntasContextuais,
  type NivelCarga,
} from '@/engine/copiloto-operacional'

// ─── TIPOS (mesma forma dos DTOs vindos do servidor) ──────────────────────────

interface ProcessoCopilotoDto {
  nome: string
  inicio: string | null
  fim: string | null
  responsavel: string | null
  etapas: unknown
  retrabalhos: unknown
  dependencias: unknown
  riscos: unknown
}

interface DivergenciaCopilotoDto {
  titulo: string
  descricao: string
  questaoValidacao: string | null
  status: string
}

interface OportunidadeCopilotoDto {
  descricao: string
  categoria: string
  status: string
}

interface CopilotoVisaoGerenteProps {
  diagnostico: {
    nomeEmpresa: string
    unidadeOperacional: string | null
    status: string
    respostaAncora: string | null
  }
  processos: ProcessoCopilotoDto[]
  divergencias: DivergenciaCopilotoDto[]
  oportunidades: OportunidadeCopilotoDto[]
  historico: Array<{
    acao: string
    statusDe: string | null
    statusPara: string | null
    criadoEm: Date
  }>
}

// ─── RÓTULOS ──────────────────────────────────────────────────────────────────

const NIVEL_COR: Record<number, string> = {
  0: 'bg-slate-100 text-slate-700',
  1: 'bg-sky-100 text-sky-800',
  2: 'bg-amber-100 text-amber-800',
  3: 'bg-violet-100 text-violet-800',
  4: 'bg-rose-100 text-rose-700',
}

const CARGA_COR: Record<NivelCarga, string> = {
  BAIXA: 'bg-emerald-100 text-emerald-800',
  MEDIA: 'bg-amber-100 text-amber-800',
  ALTA: 'bg-rose-100 text-rose-700',
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export function CopilotoVisaoGerente({ diagnostico, processos, divergencias, oportunidades, historico }: CopilotoVisaoGerenteProps) {
  const nivel = classificarNivelIntervencao({
    status: diagnostico.status,
    respostaAncoraRegistrada: Boolean(diagnostico.respostaAncora?.trim()),
    processos,
    divergencias,
    oportunidades,
  })

  const contexto = montarContextoOperacional({
    nomeEmpresa: diagnostico.nomeEmpresa,
    status: diagnostico.status,
    unidadeOperacional: diagnostico.unidadeOperacional,
    respostaAncora: diagnostico.respostaAncora,
    processos,
    divergencias,
    oportunidades,
    historico,
  })

  const atritos = montarMapaDeAtrito({
    nomeEmpresa: diagnostico.nomeEmpresa,
    status: diagnostico.status,
    processos,
    divergencias,
    oportunidades,
  })
  const perguntas = proximasPerguntasContextuais({
    status: diagnostico.status,
    respostaAncora: diagnostico.respostaAncora,
    processos,
    divergencias,
    oportunidades,
  })
  const cargas = processos.map((p) => avaliarCargaCognitivaPorProcesso(p))

  return (
    <div className="space-y-4 rounded-xl border border-primary/20 bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Visão do gerente — Copiloto Operacional</h3>
        </div>
        <span className={cn('rounded-full px-2.5 py-1 text-[10px] font-semibold', NIVEL_COR[nivel.nivel])}>
          {nivel.rotulo}
        </span>
      </div>

      {nivel.motivos.length > 0 && (
        <ul className="space-y-1 text-xs text-muted-foreground">
          {nivel.motivos.map((m, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
              {m}
            </li>
          ))}
        </ul>
      )}

      {/* Contexto (texto puro, só dado registrado) */}
      <div>
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          <Eye className="h-3.5 w-3.5" />
          Contexto
        </p>
        <pre className="max-h-72 overflow-auto rounded-lg border bg-muted/40 px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap">
          {contexto}
        </pre>
      </div>

      {/* Carga cognitiva por processo */}
      {cargas.length > 0 && (
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            <Building2 className="h-3.5 w-3.5" />
            Carga cognitiva por processo
          </p>
          <div className="space-y-2">
            {cargas.map((c) => (
              <div key={c.processo} className="rounded-lg border bg-background px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{c.processo}</p>
                  <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', CARGA_COR[c.geral])}>
                    {c.geral}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {c.dimensoes.map((dim) => (
                    <span
                      key={dim.dimensao}
                      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px]"
                      title={`${dim.descricao}: ${dim.contagem}`}
                    >
                      <span className={cn('h-1.5 w-1.5 rounded-full', {
                        BAIXA: 'bg-emerald-500',
                        MEDIA: 'bg-amber-500',
                        ALTA: 'bg-rose-500',
                      }[dim.nivel])} />
                      {dim.dimensao} · {dim.contagem}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mapa de atrito */}
      <div>
        <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          <Sparkles className="h-3.5 w-3.5" />
          Mapa de atrito
        </p>
        <ul className="space-y-1.5">
          {atritos.map((linha, i) => (
            <li key={i} className="rounded-lg border border-dashed bg-muted/30 px-3 py-1.5 text-[11px] leading-relaxed text-muted-foreground">
              {linha}
            </li>
          ))}
        </ul>
      </div>

      {/* Próximas perguntas */}
      {perguntas.length > 0 && (
        <div>
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            <MessageSquare className="h-3.5 w-3.5" />
            Perguntas com gatilho real
          </p>
          <ul className="space-y-1.5">
            {perguntas.map((p, i) => (
              <li key={i} className="rounded-lg border bg-background px-3 py-2 text-sm">
                <p className="font-medium">{p.texto}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                  {p.para} · {p.porQueSurgiu}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-[11px] text-muted-foreground/60 italic">
        Determinístico e sem IA: mostra apenas o que está registrado no caderno — lacunas aparecem como “não sabemos” (P80/P82).
      </p>
    </div>
  )
}