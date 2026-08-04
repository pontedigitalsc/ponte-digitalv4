import { redirect } from 'next/navigation'

// P65 — a timeline morreu. A caminhada agora é a Memória Viva em /minha-jornada.
export default function HistoricoPage() {
  redirect('/minha-jornada')
}
