import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import { FinancasContent } from './financas-content'

export default async function FinanceiroPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterFinanceiroExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Caixa</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Acompanhe o dinheiro que entra e o que sai, e saiba sempre onde sua empresa está.
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <FinancasContent experience={experience} />
    </div>
  )
}
