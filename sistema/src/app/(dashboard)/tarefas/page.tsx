import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import { TarefaList } from '@/components/tarefas/tarefa-list'

export default async function TarefasPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterTarefasExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Tarefas</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Organize o que precisa ser feito e acompanhe o progresso de cada atividade.
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <TarefaList />
    </div>
  )
}
