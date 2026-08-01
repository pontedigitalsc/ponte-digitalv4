import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { resumoCaixaDoDia } from '@/services/atendimento.service'
import { AtendimentoShell } from '@/components/atendimento/atendimento-shell'

export const metadata = { title: 'Atendimento' }

export default async function AtendimentoPage() {
  const usuario = await requireUser()

  const [experience, caixaResumo] = await Promise.all([
    experienceEngine.obterHomeExperience(usuario.empresaId),
    resumoCaixaDoDia(usuario.empresaId),
  ])

  return (
    <div className="space-y-6 animate-fade-in">
      <AtendimentoShell
        empresaId={usuario.empresaId}
        caixaResumo={caixaResumo}
        notifications={experience.notifications ?? []}
      />
    </div>
  )
}
