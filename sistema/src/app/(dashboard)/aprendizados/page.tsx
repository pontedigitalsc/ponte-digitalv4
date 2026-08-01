import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import { AprendizadosContent } from './aprendizados-content'

export default async function AprendizadosPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterLearningExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">O que fomos descobrindo juntos</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Conte as preferências, regras e valores da sua empresa. Cada resposta me ajuda a entender melhor seu negócio.
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <AprendizadosContent experience={experience} />
    </div>
  )
}
