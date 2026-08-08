import { requireUser } from '@/lib/auth'
import { temPermissaoPlataformaUsuario } from '@/lib/plataforma'
import { redirect } from 'next/navigation'
import { obterPainelFundador, listarPerguntasAbertas } from '@/engine/pergunta-aberta-service'
import { BIBLIOTECA_GRANDES_PERGUNTAS } from '@/engine/adaptive-question-engine'
import { obterMetricasTransformacao } from '@/engine/operacao-founder'
import { obterMaturidadeColetiva, obterPadroesColetivos, listarConhecimentoColetivo } from '@/engine/inteligencia-coletiva'
import { PainelDoFundador } from './painel'

// ETAPA 5 — Painel interno exclusivo do fundador. Não aparece para clientes.
// Apenas organiza o que as conversas revelaram. Nenhuma IA inventando conclusões.
export default async function PainelDoFundadorPage() {
  const usuario = await requireUser()
  if (!temPermissaoPlataformaUsuario(usuario, 'FOUNDER_VIEW_PLATFORM')) redirect('/dashboard')

  const [painel, perguntas, metricas, maturidade, padroes, candidatos] = await Promise.all([
    obterPainelFundador().catch(() => null),
    listarPerguntasAbertas().catch(() => []),
    obterMetricasTransformacao().catch(() => null),
    obterMaturidadeColetiva().catch(() => null),
    obterPadroesColetivos(5).catch(() => []),
    listarConhecimentoColetivo(['CANDIDATO']).catch(() => []),
  ])

  return (
    <PainelDoFundador
      painel={painel}
      perguntas={perguntas}
      biblioteca={BIBLIOTECA_GRANDES_PERGUNTAS}
      metricas={metricas}
      maturidadeColetiva={maturidade}
      padroesColetivos={padroes}
      candidatos={candidatos}
    />
  )
}
