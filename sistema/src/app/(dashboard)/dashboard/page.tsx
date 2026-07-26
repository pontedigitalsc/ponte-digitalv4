import { Metadata } from 'next'
import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
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
import { TrendingUp, CheckSquare, Users, Sparkles } from 'lucide-react'

export const metadata: Metadata = { title: 'Home' }

const PRIORIDADES_INICIAIS = [
  {
    icone: <CheckSquare className="h-4 w-4 text-primary" />,
    titulo: 'Complete seu diagnóstico',
    descricao: 'Responda as perguntas do assistente para que possamos entender a realidade da sua empresa.',
    acao: { rotulo: 'Ir para o diagnóstico', href: '/assistente' },
  },
  {
    icone: <TrendingUp className="h-4 w-4 text-primary" />,
    titulo: 'Receba suas primeiras recomendações',
    descricao: 'Com base no diagnóstico, a Ponte Digital vai sugerir ações personalizadas para você.',
    acao: { rotulo: 'Ver recomendações', href: '/dashboard' },
  },
  {
    icone: <Users className="h-4 w-4 text-primary" />,
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
              Estamos começando sua jornada. Complete as etapas abaixo para liberar todo o potencial
              da plataforma.
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
          <ExperienceRenderer
            narrativa={home.narrativa}
            blocks={home.blocks}
            actions={home.actions}
            workflows={home.workflows}
          />

          <BriefingCard briefing={home.briefing} />

          <NotificationCard notifications={home.notifications} />

          <HealthScoreCard healthScore={home.healthScore} />

          {learning.aprendizados.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                O que aprendemos sobre sua empresa
              </h3>
              <ConversationKnowledgeCard aprendizados={learning.aprendizados.slice(0, 3)} />
            </div>
          )}

          <div className="space-y-6 border-t pt-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Inteligência da sua empresa
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <EvolutionCard evolution={evolution.evolution} />
              <MaturityCard maturity={evolution.companyMaturity} />
            </div>
            <MilestoneCard milestones={evolution.milestones} />
            <KnowledgeAgingCard knowledgeAge={evolution.knowledgeAge} />
            <ConfidenceDriftCard confidenceDrift={evolution.confidenceDrift} />
          </div>
        </>
      )}
    </div>
  )
}
