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
        <h2 className="text-xl font-semibold tracking-tight">Aprendizados</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ensine preferências, regras e valores da sua empresa. Cada resposta vira conhecimento para a plataforma.
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
