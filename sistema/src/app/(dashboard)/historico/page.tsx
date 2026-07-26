import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import HistoricoContent from './historico-content'

export default async function HistoricoPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterHistoricoExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Histórico</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Registro completo de todas as interações, decisões e atividades da sua equipe.
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <HistoricoContent experience={experience} />
    </div>
  )
}
