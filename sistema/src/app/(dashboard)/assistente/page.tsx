import { Metadata } from 'next'
import { requireUser } from '@/lib/auth'
import { obterEstadoCognitivoCompleto, experienceEngine, decidirContexto } from '@/engine'
import { Chat } from '@/components/assistente/chat'
import { BriefingCard } from '@/components/cognitive/briefing-card'
import { NotificationCard } from '@/components/cognitive/notification-card'
import { HealthScoreCard } from '@/components/cognitive/health-score-card'

export const metadata: Metadata = { title: 'Assistente IA' }

export default async function AssistentePage() {
  const usuario = await requireUser().catch(() => null)

  if (!usuario) {
    return <Chat contexto={null} />
  }

  const [experience, estado] = await Promise.all([
    experienceEngine.obterAssistenteExperience(usuario.empresaId),
    obterEstadoCognitivoCompleto(usuario.empresaId, { registrarVisualizacao: true }),
  ])

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Assistente</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {experience.narrativa.texto}
        </p>
      </div>

      {experience.briefing && (
        <BriefingCard briefing={experience.briefing} />
      )}

      {experience.notifications.length > 0 && (
        <NotificationCard notifications={experience.notifications} />
      )}

      {experience.healthScore && (
        <HealthScoreCard healthScore={experience.healthScore} />
      )}

      <Chat
        contexto={await decidirContexto(usuario.empresaId)}
        identidade={estado.identidade}
        decisao={estado.decisao}
        acoesAtivas={estado.acoesAtivas}
        feedbackRecente={estado.feedbackRecente}
        jornada={estado.jornada}
        impacto={estado.impacto}
      />
    </div>
  )
}
