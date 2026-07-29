import { Metadata } from 'next'
import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { EspelhoCard } from '@/components/centro-cognitivo/espelho-card'
import { RitualCard } from '@/components/centro-cognitivo/ritual-card'
import { CapitalCard } from '@/components/centro-cognitivo/capital-card'
import { CapacidadeCard } from '@/components/centro-cognitivo/capacidade-card'
import { ConhecimentoCard } from '@/components/centro-cognitivo/conhecimento-card'
import { JornadaCard } from '@/components/centro-cognitivo/jornada-card'
import { ProximoSaltoCard } from '@/components/centro-cognitivo/proximo-salto-card'

export const metadata: Metadata = { title: 'Centro Cognitivo' }

export default async function DashboardPage() {
  const usuario = await requireUser()
  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'

  const [home] = await Promise.all([
    experienceEngine.obterHomeExperience(usuario.empresaId),
  ])

  const nome = usuario.nome.split(' ')[0]
  const retrato = home.narrativaEmpresarial?.retratoVivo
  const transformacao = home.narrativaEmpresarial?.transformacao
  const capital = home.capitalCognitivo
  const curva = home.curvaEvolutiva
  const radar = home.radarCapacidades
  const clareza = home.analiseClareza
  const ciclos = home.ciclosDecisao

  const todasCapacidades = [
    ...(radar?.muitoForte ?? []),
    ...(radar?.forte ?? []),
    ...(radar?.emEvolucao ?? []),
    ...(radar?.critica ?? []),
  ]

  const capacidadeMaisUrgente = [...todasCapacidades].sort((a, b) => a.score - b.score)[0] ?? null

  const capacidadeMaisEvoluida = curva.maiorEvolucao.capacidade
    ? { nome: curva.maiorEvolucao.capacidade, variacao: Math.round(curva.maiorEvolucao.variacao) }
    : null

  const conhecimentoGerado = home.timeline.secoes
    .flatMap(s => s.grupos)
    .flatMap(g => g.items)
    .filter(i => i.tipo === 'memoria' || i.tipo === 'conhecimento')
    .slice(0, 3)
    .map(i => ({
      descricao: i.explicacao,
      categoria: i.categoria || 'Geral',
      confianca: Math.round((i.confianca ?? 0.5) * 100),
      data: new Date(i.momento).toLocaleDateString(),
    }))

  const memoriasRecentes = home.memoriasRecentes ?? []

  const marcos = [
    ...(ciclos?.ciclos?.filter(c => c.status === 'CONCLUIDO').slice(0, 3).map(c => ({
      data: new Date(c.dataFim ?? c.dataInicio).toLocaleDateString(),
      titulo: `Ciclo concluído: ${c.titulo}`,
      descricao: c.aprendizadosGerados.slice(0, 2).join('; ') || 'Ciclo de evolução completo',
      tipo: 'evolucao' as const,
    })) ?? []),
    ...(memoriasRecentes.filter(m => m.tipo === 'confirmacao' || m.tipo === 'descoberta').slice(0, 3).map(m => ({
      data: new Date(m.data).toLocaleDateString(),
      titulo: m.descricao.slice(0, 60),
      descricao: m.descricao,
      tipo: (m.tipo === 'confirmacao' ? 'conquista' : 'aprendizado') as 'conquista' | 'aprendizado',
    })) ?? []),
  ].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())

  const scoreCapital = capital.scoreAtual
  const variacaoCapital = capital.variacaoMensal

  const melhorDecisao = home.centroCognitivo?.melhorDecisao

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <EspelhoCard
            saudacao={saudacao}
            nomeUsuario={nome}
            identidade={retrato?.identidade ?? 'Sua empresa está começando a jornada cognitiva.'}
            forcas={retrato?.forcas ?? []}
            riscos={retrato?.riscos ?? []}
            transformacao={transformacao ? `${transformacao.antes} → ${transformacao.depois}` : null}
            ultimos90Dias={retrato?.ultimos90Dias ?? ''}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <RitualCard
              ondeEstamos={clareza?.ondeEstamos ?? 'Vamos conhecer sua empresa?'}
              oqueMudou={clareza?.oQueMudou ?? null}
              oqueMereceAtencao={clareza?.oQueImporta ?? null}
              oquePodeEsperar={clareza?.oQuePodeEsperar ?? null}
              proximoMovimento={clareza?.proximoMelhorMovimento ?? null}
              etapaCiclo="Observação"
            />
            {capacidadeMaisUrgente && (
              <CapacidadeCard
                nome={capacidadeMaisUrgente.nome}
                score={Math.round(capacidadeMaisUrgente.score)}
                descricao={capacidadeMaisUrgente.descricao}
                impactoAtual={`Prioritária para o momento atual da empresa. Score atual: ${Math.round(capacidadeMaisUrgente.score)}%`}
                comoDesenvolver={capacidadeMaisUrgente.score < 50
                  ? 'Focar em pequenos rituais diários de observação e registro para fortalecer esta capacidade.'
                  : 'Avançar para práticas mais estruturadas de análise e decisão.'}
              />
            )}
          </div>
          <CapitalCard
            score={scoreCapital}
            scoreAnterior={capital.scoreAnterior ?? null}
            variacao={variacaoCapital}
            nivel={capital.nivel}
            explicacao={variacaoCapital >= 0
              ? 'Seu Capital Cognitivo está crescendo. Cada decisão registrada e cada aprendizado aumentam permanentemente a capacidade da sua empresa de tomar decisões melhores.'
              : 'Seu Capital Cognitivo ainda está em formação. Continue registrando decisões e aprendizados para construir este patrimônio.'}
            comportamentoQueGerou={marcos.length > 0
              ? `${marcos.length} marcos de evolução registrados nos últimos ciclos.`
              : 'Ainda não há dados suficientes para identificar padrões de comportamento.'}
            comoContinuarEvoluindo="Registre cada decisão importante e documente o aprendizado após cada resultado."
          />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <JornadaCard
            marcos={marcos}
            capacidadeMaisEvoluida={capacidadeMaisEvoluida}
          />
          {conhecimentoGerado.length > 0 && (
            <ConhecimentoCard conhecimentos={conhecimentoGerado} />
          )}
          <ProximoSaltoCard
            titulo={melhorDecisao?.titulo ?? null}
            descricao={melhorDecisao?.descricao ?? null}
            impacto={melhorDecisao?.impacto ?? null}
            confianca={melhorDecisao?.confianca ?? null}
          />
        </div>
      </div>
    </div>
  )
}
