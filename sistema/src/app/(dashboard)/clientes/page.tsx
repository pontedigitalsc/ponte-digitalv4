import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import { ClienteList } from '@/components/clientes/cliente-list'

export default async function ClientesPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterClientesExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Clientes</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Acompanhe os relacionamentos com as pessoas importantes para sua empresa.
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <ClienteList />
    </div>
  )
}
