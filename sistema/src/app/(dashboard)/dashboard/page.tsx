import { requireUser } from '@/lib/auth'
import {
  obterPerguntaVivaAtiva,
  obterReflexaoDaSemana,
  listarMemoriasEmocionais,
  montarLinhaDaHistoria,
} from '@/engine/relacao-engine'
import { decidirContexto, buscarSituacaoEmpresa } from '@/engine/cognitive-context-engine'
import { listarAprendizados } from '@/engine/aprendizado-service'
import { obterRitualDiario } from '@/engine/ritual-engine'
import { obterConquistas } from '@/engine/celebracao-service'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { AvatarPonte } from '@/components/ui/avatar'
import { ComoEstaHoje } from '@/components/dashboard/como-esta-hoje'
import { RitualDiario } from '@/components/dashboard/ritual-diario'
import type { RitualDiario as RitualDiarioData } from '@/engine/ritual-engine'
import { Celebracoes } from '@/components/dashboard/celebracao'
import { CentroDiario, type CentroDiarioData } from '@/components/dashboard/centro-diario'
import { RevisaoEvolucao, type RevisaoEvolucaoData } from '@/components/dashboard/revisao-evolucao'
import Link from 'next/link'

export const metadata = { title: 'Ponte Digital' }

export default async function DashboardPage() {
  const usuario = await requireUser()
  const nome = usuario.nome.split(' ')[0]

  const [perguntaViva, reflexao, memorias, contexto, situacao, aprendizados, ultimaConversa, ritualData, conquistas] = await Promise.all([
    obterPerguntaVivaAtiva(usuario.empresaId).catch(() => null),
    obterReflexaoDaSemana(usuario.empresaId).catch(() => null),
    listarMemoriasEmocionais(usuario.empresaId, 3).catch(() => []),
    decidirContexto(usuario.empresaId).catch(() => null),
    buscarSituacaoEmpresa(usuario.empresaId).catch(() => null),
    listarAprendizados(usuario.empresaId, { ativo: true, limite: 3 }).catch(() => []),
    prisma.conversa
      .findFirst({
        where: { empresaId: usuario.empresaId, deletedAt: null },
        orderBy: { criadaEm: 'desc' },
        select: { criadaEm: true },
      })
      .catch(() => null),
    obterRitualDiario(usuario.empresaId, nome).catch(() => null),
    obterConquistas(usuario.empresaId).catch(() => []),
  ])

  const ritual: RitualDiarioData = ritualData ?? {
    saudacao: `${nome}, sua empresa está sendo escrita.`,
    focoDoDia: {
      rotulo: 'Um dia para observar',
      orientacao: 'Continue a conversa — cada registro constrói a sua biografia.',
    },
    momento: {
      momento: 'ESTAGNADA',
      rotulo: 'Ainda estamos nos conhecendo',
      postura: 'Vamos continuar a conversa para eu entender melhor o momento da sua empresa.',
      razao: 'Ainda estamos juntando os primeiros registros',
    },
    percepcao: {
      tipo: 'silencio',
      texto: 'Hoje não encontrei nenhuma mudança importante. Continue exatamente como está — isso também gera confiança.',
    },
    proximoMovimento: 'Continuar nossa conversa é o melhor movimento de hoje.',
    perguntaQueFica: 'O que a sua empresa precisa para você dormir tranquilo?',
  }

  const diasDesdeUltimaConversa = ultimaConversa
    ? Math.floor((Date.now() - new Date(ultimaConversa.criadaEm).getTime()) / (24 * 60 * 60 * 1000))
    : null

  const centroDiario: CentroDiarioData = {
    mudancas: contexto?.mudancasRecentes ?? [],
    aprendizados: aprendizados.map((a) => ({ id: a.id, descricao: a.descricao, categoria: a.categoria })),
    memoriasEmocionais: memorias.map((m) => m.sentimento),
    atencao: (situacao?.sinais ?? []).slice(0, 3).map((s) => ({ titulo: s.titulo, descricao: s.descricao ?? '' })),
    oportunidade: situacao?.temLeadsQuentes
      ? 'Você tem leads em negociação no pipeline — o momento de retomá-los é agora.'
      : situacao?.variacaoReceita && situacao.variacaoReceita > 0
        ? `Seu faturamento subiu ${situacao.variacaoReceita}% neste mês — entender o que funcionou vale virar padrão.`
        : null,
    proximoMovimento: contexto?.acaoSugerida ?? null,
  }

  let revisao: RevisaoEvolucaoData | null = null
  if (diasDesdeUltimaConversa !== null && diasDesdeUltimaConversa >= 30) {
    const linha = await montarLinhaDaHistoria(usuario.empresaId).catch(() => null)
    revisao = {
      diasDesdeUltimaConversa,
      antes: linha?.capitulos[0]?.paragrafos[0] ?? null,
      durante: linha?.capitulos[4]?.paragrafos ?? [],
      depois: [
        ...(linha?.capitulos[2]?.paragrafos ?? []),
        ...(linha?.capitulos[5]?.paragrafos ?? []),
      ],
      proximo: perguntaViva?.pergunta ?? contexto?.acaoSugerida ?? null,
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Cabeçalho — presença, não painel */}
      <div className="text-center space-y-3">
        <AvatarPonte state="breathing" size="lg" />
        <h1 className="text-2xl font-semibold tracking-tight">
          {ritual.saudacao}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Não é um painel com números. É uma conversa que continua — com uma pergunta que acompanha você.
        </p>
      </div>

      {/* Ritual Diário — a abertura que acolhe */}
      <RitualDiario data={ritual} />

      {/* Pergunta Viva — UMA pergunta */}
      {perguntaViva && (
        <div className="rounded-xl border border-primary/20 bg-card p-6 space-y-3 animate-fade-in">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            A pergunta que acompanha você
          </p>
          <p className="text-lg font-medium leading-relaxed">
            {perguntaViva.pergunta}
          </p>
          {perguntaViva.contexto && (
            <p className="text-xs text-muted-foreground italic leading-relaxed">
              {perguntaViva.contexto}
            </p>
          )}
          <Link
            href="/minha-jornada"
            className="inline-block text-xs text-primary hover:underline underline-offset-2"
          >
            Ver como essa pergunta evolui na minha história →
          </Link>
        </div>
      )}

      {/* Reflexão da Semana — UMA observação, não tarefa */}
      {reflexao && (
        <div className="rounded-xl border border-dashed border-amber-400/40 bg-card/50 p-6 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Para esta semana — apenas observe
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {reflexao.reflexao}
          </p>
          <p className="text-[10px] text-muted-foreground/60">
            Não precisa responder agora. A Ponte apenas planta a observação.
          </p>
        </div>
      )}

      {/* Memória Emocional — o que a Ponte lembra como sentiu */}
      {memorias.length > 0 && (
        <div className="rounded-xl border bg-card p-6 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            O que a Ponte lembra de como você se sentiu
          </p>
          <div className="space-y-2">
            {memorias.map((m) => (
              <p key={m.id} className="text-sm text-muted-foreground leading-relaxed border-l-2 border-muted pl-3">
                {m.sentimento}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Como está hoje — sentimento, não status */}
      <ComoEstaHoje />

      {/* Celebrações de evolução — conquistas, não apenas dinheiro */}
      {conquistas.length > 0 && <Celebracoes conquistas={conquistas} />}

      {/* Linha da História */}
      <div className="text-center pt-2">
        <Link
          href="/minha-jornada"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm text-foreground hover:bg-muted/50 transition-colors"
        >
          Ler minha história
        </Link>
      </div>
    </div>
  )
}
