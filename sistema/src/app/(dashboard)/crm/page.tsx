import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import { Pipeline } from '@/components/crm/pipeline'

export default async function CrmPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterCRMExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">CRM</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Acompanhe seus leads em cada etapa do funil, da prospecção ao fechamento.
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <Pipeline />
    </div>
  )
}
