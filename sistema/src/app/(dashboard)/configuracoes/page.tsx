import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import ConfiguracoesContent from './configuracoes-content'

export default async function ConfiguracoesPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterConfiguracoesExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Preferências</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ajuste sua conta, sua empresa e a aparência do jeito que combina com você.
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <ConfiguracoesContent experience={experience} />
    </div>
  )
}
