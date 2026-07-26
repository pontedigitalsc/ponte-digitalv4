import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import { ConhecimentoContent } from './conhecimento-content'

export default async function ConhecimentoPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterConhecimentoExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Biblioteca de Conhecimento</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Todo conhecimento organizado da sua empresa em um só lugar. Informações confirmadas, suspeitas em observação e aprendizado acumulado.
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <ConhecimentoContent experience={experience} />
    </div>
  )
}
