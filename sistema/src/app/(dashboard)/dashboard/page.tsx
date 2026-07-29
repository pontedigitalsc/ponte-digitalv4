import { Metadata } from 'next'
import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { BriefingCard } from '@/components/cognitive/briefing-card'
import { NotificationCard } from '@/components/cognitive/notification-card'
import { HealthScoreCard } from '@/components/cognitive/health-score-card'
import { EvolutionCard } from '@/components/cognitive/evolution-card'
import { MaturityCard } from '@/components/cognitive/maturity-card'
import { MilestoneCard } from '@/components/cognitive/milestone-card'
import { KnowledgeAgingCard } from '@/components/cognitive/knowledge-aging-card'
import { ConfidenceDriftCard } from '@/components/cognitive/confidence-drift-card'
import { ConversationKnowledgeCard } from '@/components/aprendizados/conversation-knowledge-card'
import { PriorityCard } from '@/components/shared/priority-card'
import { ExplicavelDecisaoCard } from '@/components/cognitive/explicavel-decisao-card'
import { GrowthOpportunitiesCard } from '@/components/cognitive/growth-opportunities-card'
import { KnowledgeTimelineCard } from '@/components/cognitive/knowledge-timeline-card'
import { CognitiveHeatmapCard } from '@/components/cognitive/cognitive-heatmap-card'
import { CognitiveCommunicationCard } from '@/components/cognitive/cognitive-communication-card'
import { CognitiveMemoryCard } from '@/components/cognitive/cognitive-memory-card'
import { PatrimonyCognitivoCard } from '@/components/cognitive/patrimony-cognitivo-card'
import { ExecutiveNarrativeCard } from '@/components/cognitive/executive-narrative-card'
import { AdaptiveCapacityCard } from '@/components/cognitive/adaptive-capacity-card'
import { DecisionCycleCard } from '@/components/cognitive/decision-cycle-card'
import { ProactiveAlertCard } from '@/components/cognitive/proactive-alert-card'
import { StrategicRoomCard } from '@/components/cognitive/strategic-room-card'
import { LivingPortraitCard } from '@/components/cognitive/living-portrait-card'
import { EvolutionCurveCard } from '@/components/cognitive/evolution-curve-card'
import { CognitiveCapitalCard } from '@/components/cognitive/cognitive-capital-card'
import { TransformationSummaryCard } from '@/components/cognitive/transformation-summary-card'
import { NextLevelCard } from '@/components/cognitive/next-level-card'
import { CapabilityRadarCard } from '@/components/cognitive/capability-radar-card'
import { BeforeAfterCard } from '@/components/cognitive/before-after-card'
import { TemporalComparisonCard } from '@/components/cognitive/temporal-comparison-card'
import { CognitiveCelebrationsCard } from '@/components/cognitive/cognitive-celebrations-card'
import { StrategicMemoryCard } from '@/components/cognitive/strategic-memory-card'
import { FounderPanelCard } from '@/components/cognitive/founder-panel-card'
import { CompanyMirrorCard } from '@/components/cognitive/company-mirror-card'
import { KnowledgeGeneratedPanel } from '@/components/cognitive/knowledge-generated-panel'
import { MemoryShiftCard } from '@/components/cognitive/memory-shift-card'
import { MonthlySummaryCard } from '@/components/cognitive/monthly-summary-card'
import { Sparkles } from 'lucide-react'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'

export const metadata: Metadata = { title: 'Home' }

const PRIORIDADES_INICIAIS = [
  {
    icone: <Sparkles className="h-4 w-4 text-primary" />,
    titulo: 'Complete seu diagnóstico',
    descricao: 'Responda as perguntas do assistente para que possamos entender a realidade da sua empresa.',
    acao: { rotulo: 'Ir para o diagnóstico', href: '/assistente' },
  },
  {
    icone: <Sparkles className="h-4 w-4 text-primary" />,
    titulo: 'Receba suas primeiras recomendações',
    descricao: 'Com base no diagnóstico, a Ponte Digital vai sugerir ações personalizadas para você.',
    acao: { rotulo: 'Ver recomendações', href: '/dashboard' },
  },
  {
    icone: <Sparkles className="h-4 w-4 text-primary" />,
    titulo: 'Explore o que sua empresa pode alcançar',
    descricao: 'A cada interação, novos módulos e funcionalidades serão liberados para você.',
    acao: { rotulo: 'Entender jornada', href: '/assistente' },
  },
  {
    icone: <Sparkles className="h-4 w-4 text-primary" />,
    titulo: 'Aprenda com seus dados',
    descricao: 'Quanto mais você usa a Ponte Digital, mais inteligente ela fica sobre seu negócio.',
    acao: { rotulo: 'Saber mais', href: '/conhecimento' },
  },
]

export default async function DashboardPage() {
  const usuario = await requireUser()
  const saudacao = () => {
    const hora = new Date().getHours()
    if (hora < 12) return 'Bom dia'
    if (hora < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const [home, evolution, learning, modulosLiberados] = await Promise.all([
    experienceEngine.obterHomeExperience(usuario.empresaId),
    experienceEngine.obterEvolutionExperience(usuario.empresaId),
    experienceEngine.obterLearningExperience(usuario.empresaId),
    experienceEngine.obterModulosLiberados(usuario.empresaId).catch(() => null),
  ])

  const escopoReduzido = modulosLiberados && !modulosLiberados.todosLiberados

  const maiorCapCurva = home.curvaEvolutiva.maiorEvolucao.capacidade
    ? {
        capacidade: home.curvaEvolutiva.maiorEvolucao.capacidade,
        score: Math.round(Object.values(home.curvaEvolutiva.pontos[home.curvaEvolutiva.pontos.length - 1]?.capacidades ?? {}).reduce((a, b) => a + b, 0) / Math.max(1, Object.keys(home.curvaEvolutiva.pontos[home.curvaEvolutiva.pontos.length - 1]?.capacidades ?? {}).length)),
        variacao: home.curvaEvolutiva.maiorEvolucao.variacao,
      }
    : undefined

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold">
          {saudacao()}, {usuario.nome.split(' ')[0]}
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {home.foco?.rotulo ?? 'Vamos conhecer sua empresa?'}
        </p>
      </div>

      {escopoReduzido ? (
        <>
          <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-5 space-y-2">
            <h3 className="text-sm font-semibold">Bem-vindo à Ponte Digital</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Estamos começando sua jornada. Complete as etapas abaixo para liberar todo o potencial da plataforma.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRIORIDADES_INICIAIS.map((p, i) => (
              <PriorityCard key={i} {...p} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <CompanyMirrorCard
                retrato={home.narrativaEmpresarial?.retratoVivo ?? { identidade: 'Sua empresa esta comecando a jornada cognitiva.', forcas: [], riscos: [], ultimos90Dias: 'Ainda nao ha dados suficientes para analise de 90 dias.' }}
                transformacao={home.narrativaEmpresarial?.transformacao ?? null}
                comparacoes={home.narrativaEmpresarial?.comparacoesTemporais ?? []}
              />
              <ExecutiveNarrativeCard
                narrativa={home.narrativaEmpresarial}
                nomeUsuario={usuario.nome.split(' ')[0]}
                impactoAdaptativo={maiorCapCurva}
              />
            </div>
            <div className="space-y-4">
              <MonthlySummaryCard
                capital={home.capitalCognitivo}
                capacidade={home.capacidadeAdaptativa}
                curva={home.curvaEvolutiva}
                totalConhecimentos={home.patrimonioAtivos}
                totalHipoteses={home.totalHipoteses}
                totalDescartados={home.totalDescartados}
              />
              <CognitiveCapitalCard capital={home.capitalCognitivo} />
              <AdaptiveCapacityCard capacity={home.capacidadeAdaptativa} />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <EvolutionCurveCard curva={home.curvaEvolutiva} />
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <CapabilityRadarCard radar={home.radarCapacidades} />
                <BeforeAfterCard dados={home.antesDepois} />
              </div>
              <TemporalComparisonCard comparacoes={home.narrativaEmpresarial?.comparacoesTemporais ?? []} />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Aprendizado e crescimento</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <MilestoneCard milestones={evolution.milestones} evolucaoGeral={evolution.evolution.evolucaoTotal} />
              <EvolutionCard evolution={evolution.evolution} />
              <DecisionCycleCard resumo={home.ciclosDecisao} />
            </div>
            {learning.aprendizados.length > 0 && (
              <ConversationKnowledgeCard aprendizados={learning.aprendizados.slice(0, 3)} />
            )}
            <KnowledgeTimelineCard timeline={home.timeline} />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <KnowledgeGeneratedPanel
                totalConhecimentos={home.patrimonioAtivos}
                totalHipoteses={home.totalHipoteses}
                totalDescartados={home.totalDescartados}
                memoriaEstrategica={home.memoriaEstrategica}
                evolucaoMaturidade={home.evolucaoMaturidade}
              />
              <MemoryShiftCard memoriaEstrategica={home.memoriaEstrategica} />
            </div>
            <div className="space-y-4">
              <NextLevelCard proximoNivel={home.narrativaEmpresarial?.proximoNivel ?? null} />
              <TransformationSummaryCard transformacao={home.narrativaEmpresarial?.transformacao ?? null} />
              <StrategicMemoryCard memoria={home.memoriaEstrategica} />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Conhecimento acumulado</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <MaturityCard maturity={evolution.companyMaturity} />
                <KnowledgeAgingCard knowledgeAge={evolution.knowledgeAge} />
              </div>
              <div className="space-y-4">
                <ConfidenceDriftCard confidenceDrift={evolution.confidenceDrift} />
                <CognitiveHeatmapCard mapa={home.mapaCalor} />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <CognitiveCommunicationCard narrativa={home.narrativa} notificationsCount={home.notifications.length} insightsCount={home.blocks.filter(b => b.tipoBloco === 'insight').length} />
              <CognitiveMemoryCard recentes={home.memoriasRecentes} totalMemorias={home.totalMemorias} idadeMedia={home.idadeMediaMemorias} hipotesesAtivas={home.totalHipoteses} conhecimentosConfirmados={0} />
              <PatrimonyCognitivoCard conhecimentos={[]} scorePatrimonio={home.patrimonioScore} totalAtivos={home.patrimonioAtivos} maiorConfianca={home.patrimonioMaiorConfianca} totalHipoteses={home.totalHipoteses} totalDescartados={home.totalDescartados} evolucaoMaturidade={home.evolucaoMaturidade} />
            </div>
          </div>

          <div className="space-y-6">
            <CognitiveCelebrationsCard
              conquistas={[
                ...(evolution.milestones.length > 0 ? evolution.milestones.slice(0, 3).map(m => ({
                  icone: (m.categoria === 'conhecimento' ? 'conhecimento' : m.categoria === 'aprendizado' ? 'aprendizado' : 'evolucao') as 'conhecimento' | 'decisao' | 'aprendizado' | 'evolucao',
                  titulo: m.titulo,
                  descricao: m.descricao,
                  data: new Date(m.data).toLocaleDateString(),
                })) : []),
                ...(home.totalHipoteses > 0 ? [{ icone: 'aprendizado' as const, titulo: `${home.totalHipoteses} hipoteses levantadas`, descricao: 'Cada hipotese representa um ciclo de aprendizado em andamento', data: '' }] : []),
                ...(home.patrimonioAtivos > 0 ? [{ icone: 'conhecimento' as const, titulo: `${home.patrimonioAtivos} conhecimentos acumulados`, descricao: 'Base cognitiva em crescimento continuo', data: '' }] : []),
              ]}
            />
            <FounderPanelCard visao={home.visaoFundador} />
            <ProactiveAlertCard alertas={home.alertasCognitivos} />
            <NotificationCard notifications={home.notifications} />
            <HealthScoreCard healthScore={home.healthScore} />
          </div>

          <div className="space-y-4 border-t border-border/40 pt-6">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Operações</p>
            <ExperienceRenderer narrativa={home.narrativa} blocks={home.blocks} actions={home.actions} workflows={home.workflows} />
            <div className="grid gap-6 lg:grid-cols-2">
              <ExplicavelDecisaoCard decisao={home.centroCognitivo.decisaoCompleta} />
              <BriefingCard briefing={home.briefing} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
