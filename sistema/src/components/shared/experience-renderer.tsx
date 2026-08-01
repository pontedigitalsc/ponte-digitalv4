import { TrendingUp, TrendingDown, Bot } from 'lucide-react'
import type { Narrativa, ExperienceBlock, ExperienceAction, CognitiveWorkflow, Journey } from '@/engine'
import { NarrativaCard } from './narrativa-card'
import { InsightCard } from './insight-card'
import { ActionCard } from './action-card'
import { WorkflowCard } from './workflow-card'
import { JourneyCard } from './journey-card'

type ExperienceRendererProps = {
  narrativa: Narrativa
  blocks: ExperienceBlock[]
  actions?: ExperienceAction[]
  workflows?: CognitiveWorkflow[]
  journeys?: Journey[]
}

function renderImpactSummary(block: {
  tipoBloco: 'impact-summary'
  evolucaoGeral: number
  areaMaisEvoluiu: { categoria: string; descricao: string } | null
  areaAtencao: { categoria: string; descricao: string } | null
  aprendizadosRecentes: number
}) {
  return (
    <div key="impact-summary" className="rounded-lg border bg-card px-5 py-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Impacto na sua empresa
        </p>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs text-muted-foreground">Evolução geral</span>
        <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${block.evolucaoGeral}%` }}
          />
        </div>
        <span className="text-xs font-medium">{block.evolucaoGeral}%</span>
      </div>
      <div className="space-y-2">
        {block.areaMaisEvoluiu && (
          <div className="flex items-start gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">{block.areaMaisEvoluiu.categoria}</span>
              <span className="text-muted-foreground"> — {block.areaMaisEvoluiu.descricao}</span>
            </div>
          </div>
        )}
        {block.areaAtencao && (
          <div className="flex items-start gap-2 text-sm">
            <TrendingDown className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">{block.areaAtencao.categoria}</span>
              <span className="text-muted-foreground"> — {block.areaAtencao.descricao}</span>
            </div>
          </div>
        )}
        {block.aprendizadosRecentes > 0 && (
          <div className="flex items-start gap-2 text-sm">
            <Bot className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">{block.aprendizadosRecentes} aprendizado{block.aprendizadosRecentes !== 1 ? 's' : ''} recente{block.aprendizadosRecentes !== 1 ? 's' : ''}</span>
              <span className="text-muted-foreground"> — baseado no seu retorno</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function renderMetricSummary(block: {
  tipoBloco: 'metric-summary'
  rotulo: string
  valor: string
}) {
  return (
    <div key={`metric-${block.rotulo}`} className="rounded-lg border bg-card px-5 py-4">
      <p className="text-xs text-muted-foreground">{block.rotulo}</p>
      <p className="text-lg font-semibold mt-0.5">{block.valor}</p>
    </div>
  )
}

export function ExperienceRenderer({ narrativa, blocks, actions, workflows, journeys }: ExperienceRendererProps) {
  return (
    <div className="space-y-3">
      <NarrativaCard narrativa={narrativa} />

      {blocks.length > 0 && (
        <div className="space-y-2">
          {blocks.map((block) => {
            if (block.tipoBloco === 'insight') return <InsightCard key={block.id} insight={block} />
            if (block.tipoBloco === 'impact-summary') return renderImpactSummary(block)
            if (block.tipoBloco === 'metric-summary') return renderMetricSummary(block)
            return null
          })}
        </div>
      )}

      {actions && actions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Caminhos possíveis
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {actions.map((action) => (
              <ActionCard key={action.id} action={action} />
            ))}
          </div>
        </div>
      )}

      {workflows && workflows.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            O que está em movimento
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {workflows.map((wf) => (
              <WorkflowCard key={wf.id} workflow={wf} />
            ))}
          </div>
        </div>
      )}

      {journeys && journeys.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Jornadas
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {journeys.map((j) => (
              <JourneyCard key={j.id} journey={j} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
