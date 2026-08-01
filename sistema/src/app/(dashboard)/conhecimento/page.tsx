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
        <h2 className="text-xl font-semibold tracking-tight">O que estamos entendendo sobre sua empresa</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tudo que vamos descobrindo juntos, em um só lugar: o que já sabemos, o que ainda estamos acompanhando e o que aprendemos com você.
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
