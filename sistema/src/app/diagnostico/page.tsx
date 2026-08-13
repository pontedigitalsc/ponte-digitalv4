import { redirect } from 'next/navigation'

// P94 — protótipo mock de diagnóstico público (Apoiador #, revelação por texto
// fixo, nada salvo) removido do ar: mostrava resultado fabricado e atritava com
// a regra de não inventar nada. O diagnóstico real vive em /admin/descoberta.
export default function DiagnosticoPage() {
  redirect('/')
}
