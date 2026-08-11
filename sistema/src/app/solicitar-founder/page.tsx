import type { Metadata } from 'next'
import { FounderSolicitacaoFlow } from '@/components/marketing/founder-solicitacao-flow'

export const metadata: Metadata = {
  title: 'Tornar-se Founder | Ponte Digital',
  description:
    'Conte sobre sua empresa e comece sua participação como Founder da Ponte Digital. Sem cadastro para começar.',
}

export default function SolicitarFounderPage() {
  return <FounderSolicitacaoFlow />
}
