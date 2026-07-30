import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { AtendimentoShell } from '@/components/atendimento/atendimento-shell'

export const metadata = { title: 'Atendimento' }

export default async function AtendimentoPage() {
  const usuario = await requireUser()

  const [experience] = await Promise.all([
    experienceEngine.obterHomeExperience(usuario.empresaId),
  ])

  const caixaResumo = {
    faturamentoHoje: 0,
    recebidoHoje: 0,
    aReceber: 0,
    ticketMedio: 0,
    clientesHoje: 0,
    variacao: 0,
  }

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
