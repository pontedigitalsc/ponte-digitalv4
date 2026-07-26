import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import ImplantacoesContent from './implantacoes-content'

export default async function ImplantacoesPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterImplantacoesExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Implantações</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Acompanhe cada etapa da implementação dos seus projetos, do início à conclusão.
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <ImplantacoesContent experience={experience} />
    </div>
  )
}
