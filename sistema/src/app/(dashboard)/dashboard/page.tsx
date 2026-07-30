import { Metadata } from 'next'
import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { EspelhoCard } from '@/components/centro-cognitivo/espelho-card'
import { RitualCard } from '@/components/centro-cognitivo/ritual-card'
import { ProximoSaltoCard } from '@/components/centro-cognitivo/proximo-salto-card'
import { CicloCognitivo } from '@/components/centro-cognitivo/ciclo-cognitivo'
import { NotificacaoCard } from '@/components/cognitive/notification-card'

export const metadata: Metadata = { title: 'Centro Diário' }

const ETAPAS_CICLO = [
  'Observação', 'Compreensão', 'Clareza', 'Priorização',
  'Decisão', 'Execução', 'Aprendizado', 'Incorporação', 'Evolução',
]

function determinarEtapaCiclo(clareza: unknown): string {
  if (!clareza) return 'Observação'
  return 'Compreensão'
}

export default async function CentroDiarioPage() {
  const usuario = await requireUser()
  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'

  const [home] = await Promise.all([
    experienceEngine.obterHomeExperience(usuario.empresaId),
  ])

  const nome = usuario.nome.split(' ')[0]
  const retrato = home.narrativaEmpresarial?.retratoVivo
  const clareza = home.analiseClareza
  const melhorDecisao = home.centroCognitivo?.melhorDecisao
  const notifications = home.notifications ?? []
  const etapaAtual = determinarEtapaCiclo(clareza)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Centro Diário</h2>
        <CicloCognitivo etapaAtual={etapaAtual} etapas={ETAPAS_CICLO} />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <EspelhoCard
            saudacao={saudacao}
            nomeUsuario={nome}
            identidade={retrato?.identidade ?? 'Sua empresa está começando a jornada cognitiva.'}
            forcas={retrato?.forcas ?? []}
            riscos={retrato?.riscos ?? []}
            transformacao={null}
            ultimos90Dias={retrato?.ultimos90Dias ?? ''}
          />

          <RitualCard
            ondeEstamos={clareza?.ondeEstamos ?? 'Vamos conhecer sua empresa?'}
            oqueMudou={clareza?.oQueMudou ?? null}
            oqueMereceAtencao={clareza?.oQueImporta ?? null}
            oquePodeEsperar={clareza?.oQuePodeEsperar ?? null}
            proximoMovimento={clareza?.proximoMelhorMovimento ?? null}
            etapaCiclo={etapaAtual}
          />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <ProximoSaltoCard
            titulo={melhorDecisao?.titulo ?? null}
            descricao={melhorDecisao?.descricao ?? null}
            impacto={melhorDecisao?.impacto ?? null}
            confianca={melhorDecisao?.confianca ?? null}
          />

          {notifications.length > 0 && (
            <NotificacaoCard notifications={notifications} />
          )}

          <div className="rounded-xl border bg-card p-6 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Acessos rápidos
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/atendimento"
                className="rounded-lg border p-3 text-sm font-medium hover:bg-accent transition-colors text-center"
              >
                Novo atendimento
              </a>
              <a
                href="/centro-decisao"
                className="rounded-lg border p-3 text-sm font-medium hover:bg-accent transition-colors text-center"
              >
                Decisões
              </a>
              <a
                href="/conhecimento"
                className="rounded-lg border p-3 text-sm font-medium hover:bg-accent transition-colors text-center"
              >
                Conhecimento
              </a>
              <a
                href="/assistente"
                className="rounded-lg border p-3 text-sm font-medium hover:bg-accent transition-colors text-center"
              >
                Assistente
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
