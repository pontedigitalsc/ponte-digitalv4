import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { TimelineViva } from '@/components/historico/timeline-viva'

export default async function HistoricoPage() {
  const usuario = await requireUser()
  const experience = await experienceEngine.obterHistoricoExperience(usuario.empresaId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">Nossa caminhada até aqui</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A memória viva da sua empresa: conversas, decisões, descobertas e o que vamos entendendo juntos.
        </p>
      </div>
      <TimelineViva experience={experience} empresaId={usuario.empresaId} />
    </div>
  )
}
