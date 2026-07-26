import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { interpretar } from '@/engine/interpretacoes'
import { consultarEvidencias, contagemPorCategoria } from '@/engine/evidence-engine'
import { analisarEvolucao, registrarNaMemoria, listarHipoteses } from '@/engine/cognitive-memory-engine'
import { registrarEventoAtivacao } from '@/engine/founder-activation-engine'
import { obterConhecimentosAprovados } from '@/engine/knowledge-governance-engine'
import { aprendizadosParaContexto } from '@/engine/aprendizado-service'
import { getCache, TTL } from '@/lib/cache'
import type { Interpretacoes } from '@/engine/tipos'

export async function interpretarRespostas(respostas: Record<string, string | null>): Promise<Interpretacoes> {
  return interpretar(respostas)
}

function invalidateEmpresaCache(empresaId: string): void {
  const cache = getCache()
  cache.invalidatePattern(`:${empresaId}:`)
}

export async function atualizarIdentidade(
  empresaId: string,
  respostas: Record<string, string | null>,
  interpretacoes: Interpretacoes
) {
  const existente = await prisma.identidadeDigital.findUnique({ where: { empresaId } })

  const novaVersao = (existente?.versao ?? 0) + 1

  invalidateEmpresaCache(empresaId)

  if (existente) {
    return prisma.identidadeDigital.update({
      where: { empresaId },
      data: {
        dados: respostas,
        interpretacoes,
        versao: novaVersao,
        ultimaConversa: new Date(),
      },
    })
  }

  const identidade = await prisma.identidadeDigital.create({
    data: {
      empresaId,
      dados: respostas,
      interpretacoes,
      versao: 1,
      ultimaConversa: new Date(),
    },
  })

  void registrarEventoAtivacao(empresaId, 'IDENTIDADE_CRIADA')

  return identidade
}

const cacheIdentidade = {
  key: (id: string) => `identidade:${id}`,
  ns: (id: string) => `identidade:${id}`,
}

export async function obterIdentidade(empresaId: string) {
  return getCache().remember(
    cacheIdentidade.key(empresaId),
    () => prisma.identidadeDigital.findUnique({ where: { empresaId } }),
    TTL.RAPIDO
  )
}

export async function construirIdentidade(empresaId: string) {
  return getCache().remember(
    `empresa:${empresaId}:identidade`,
    async () => {
      const identidade = await obterIdentidade(empresaId)
      const evidenciasRecentes = await consultarEvidencias(empresaId, {
        desde: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        limite: 100,
      })
      const contagemCat = await contagemPorCategoria(empresaId, 90)

      const conhecimentosAprovados = await obterConhecimentosAprovados(empresaId)
      const conhecimentosIdentity = (identidade?.conhecimentos as { descricao: string; confianca: string }[] | null) ?? []
      const lacunas = (identidade?.lacunas as { descricao: string }[] | null) ?? []
      const hipoteses = await listarHipoteses(empresaId, true)

      const categoriasComAtividade = Object.keys(contagemCat).filter(
        (c) => (contagemCat[c] ?? 0) > 0
      )

      const aprendizados = await aprendizadosParaContexto(empresaId, 10)

      const verdadesEstaveis = [
        ...(conhecimentosAprovados.length > 0
          ? conhecimentosAprovados.map((c) => c.descricao)
          : conhecimentosIdentity.map((c) => c.descricao)),
        ...aprendizados,
      ]
      const hipotesesStr = hipoteses.map((h) => h.descricao)
      const lacunasStr = lacunas.map((l) => l.descricao)
      const mudancas: string[] = []

      if (evidenciasRecentes.length > 0) {
        const ultima = evidenciasRecentes[0]
        mudancas.push(`Última atividade: ${ultima.descricao}`)
      }

      return {
        empresaConhecida: !!identidade,
        verdadesEstaveis,
        hipoteses: hipotesesStr,
        lacunas: lacunasStr,
        mudancasRecentes: mudancas,
        categoriasComAtividade,
        totalEvidencias: evidenciasRecentes.length,
        ultimaConversa: identidade?.ultimaConversa ?? null,
        versao: identidade?.versao ?? 0,
        narrativaVersao: identidade?.narrativaVersao ?? null,
      }
    },
    TTL.RAPIDO
  )
}

// ─── Evolução da Identidade ───────────────────────────────────────────

function gerarNarrativaVersao(versao: number, analise: {
  novasHipoteses: string[]
  hipotesesFortalecidas: string[]
  conhecimentosConfirmados: string[]
  mudancasPercebidas: string[]
}): string {
  if (versao === 1) return 'Empresa recém conhecida'
  if (analise.novasHipoteses.length > 2) return 'Novos padrões identificados'
  if (analise.hipotesesFortalecidas.length > 1) return 'Hipóteses fortalecidas por evidências'
  if (analise.conhecimentosConfirmados.length > 2) return 'Conhecimento consolidado'
  if (analise.mudancasPercebidas.some((m) => m.includes('FINANCEIRO'))) return 'Mais evidências financeiras'
  if (analise.mudancasPercebidas.some((m) => m.includes('CLIENTES'))) return 'Mudança no comportamento de vendas'
  if (analise.mudancasPercebidas.some((m) => m.includes('OPERACAO'))) return 'Novo padrão operacional identificado'
  return `Versão ${versao} — conhecimento atualizado`
}

export async function evoluirIdentidade(empresaId: string) {
  const identidade = await obterIdentidade(empresaId)
  const analise = await analisarEvolucao(empresaId, identidade)

  const proximaVersao = (identidade?.versao ?? 0) + 1
  const narrativa = gerarNarrativaVersao(proximaVersao, analise)

  // Monta as 4 camadas — conhecimentos aprovados vêm do Governance Engine
  const conhecimentosAprovados = await obterConhecimentosAprovados(empresaId)
  const conhecimentosAtuais: { descricao: string; confianca: string }[] = []
  const crencasAtuais: { descricao: string; confianca: string }[] = []
  const lacunasAtuais: { descricao: string }[] = []

  // Conhecimentos validados pelo Governance Engine → conhecimentos (confiança alta)
  for (const c of conhecimentosAprovados) {
    conhecimentosAtuais.push({
      descricao: c.descricao,
      confianca: c.scoreConfianca >= 80 ? 'ALTA' : 'MEDIA',
    })
  }

  // Complementa com conhecimentos confirmados que ainda não estão aprovados
  for (const c of analise.conhecimentosConfirmados) {
    if (!conhecimentosAtuais.some((k) => k.descricao === c)) {
      conhecimentosAtuais.push({ descricao: c, confianca: 'ALTA' })
    }
  }

  // Novas hipóteses fortes → crenças
  for (const h of analise.hipotesesFortalecidas) {
    crencasAtuais.push({ descricao: h, confianca: 'MEDIA' })
  }

  // Novas hipóteses → observação
  for (const h of analise.novasHipoteses) {
    crencasAtuais.push({ descricao: h, confianca: 'BAIXA' })
  }

  // Lacunas
  if (analise.novasHipoteses.length === 0 && analise.hipotesesFortalecidas.length === 0) {
    lacunasAtuais.push({ descricao: 'Ainda não temos evidências suficientes para formar hipóteses' })
  }

  // Atualiza a identidade
  const resultado = await prisma.identidadeDigital.upsert({
    where: { empresaId },
    create: {
      empresaId,
      versao: 1,
      conhecimentos: conhecimentosAtuais,
      crencas: crencasAtuais,
      lacunas: lacunasAtuais,
      narrativaVersao: narrativa,
    },
    update: {
      versao: proximaVersao,
      conhecimentos: conhecimentosAtuais.length > 0 ? conhecimentosAtuais : undefined,
      crencas: crencasAtuais.length > 0 ? crencasAtuais : undefined,
      lacunas: lacunasAtuais.length > 0 ? lacunasAtuais : undefined,
      narrativaVersao: narrativa,
    },
  })

  // Registra na memória cognitiva
  if (analise.novasHipoteses.length > 0) {
    await registrarNaMemoria(empresaId, {
      tipo: 'descoberta',
      descricao: `Novas hipóteses: ${analise.novasHipoteses.join(', ')}`,
      categoria: 'ESTRATEGIA',
      versao: proximaVersao,
    })
  }

  if (analise.hipotesesFortalecidas.length > 0) {
    await registrarNaMemoria(empresaId, {
      tipo: 'confirmacao',
      descricao: `Hipóteses fortalecidas: ${analise.hipotesesFortalecidas.join(', ')}`,
      categoria: 'ESTRATEGIA',
      versao: proximaVersao,
    })
  }

  invalidateEmpresaCache(empresaId)

  return resultado
}

export async function contextoParaAssistente(empresaId: string) {
  return getCache().remember(
    `assistente:${empresaId}:contexto`,
    async () => {
      const identidade = await obterIdentidade(empresaId)
      if (!identidade) return null

      const dados = identidade.dados as Record<string, string | null> | null
      const interp = identidade.interpretacoes as Interpretacoes | null
      const aprendizados = await aprendizadosParaContexto(empresaId, 15)

      return {
        empresaConhecida: true,
        segmento: dados?.['empresa.segmento'] ?? null,
        faturamento: dados?.['empresa.faturamento'] ?? null,
        funcionarios: dados?.['empresa.funcionarios'] ?? null,
        pontoAtencao: interp?.pontoAtencao ?? null,
        observacao: interp?.observacao ?? null,
        alinhamento: interp?.alinhamento ?? null,
        aprendizados,
      }
    },
    TTL.RAPIDO
  )
}

export async function contextoParaDashboard(empresaId: string) {
  return getCache().remember(
    `contexto:${empresaId}:dashboard`,
    async () => {
      const identidade = await obterIdentidade(empresaId)
      if (!identidade) return null

      const dados = identidade.dados as Record<string, string | null> | null
      const interp = identidade.interpretacoes as Interpretacoes | null

      const sugestaoDestaque = determinarDestaque(dados ?? {})

      return {
        existeDiagnostico: true,
        interpretacoes: interp,
        destaqueSugerido: sugestaoDestaque,
        dados,
      }
    },
    TTL.RAPIDO
  )
}

function determinarDestaque(respostas: Record<string, string | null>): string {
  const insonia = (respostas['problemas.insonia'] ?? '').toLowerCase()
  const perda = (respostas['problemas.perda'] ?? '').toLowerCase()
  const caixa = (respostas['gestao.caixa'] ?? '').toLowerCase()

  const palavrasCliente = ['cliente', 'venda', 'faturamento', 'faturar', 'pipeline']
  if (palavrasCliente.some((p) => insonia.includes(p) || perda.includes(p))) return 'clientes'

  const palavrasCaixa = ['dinheiro', 'caixa', 'fluxo', 'fatura', 'receber', 'pagar']
  if (palavrasCaixa.some((p) => insonia.includes(p) || perda.includes(p) || caixa.includes(p))) return 'financeiro'

  const palavrasGestao = ['organizar', 'organização', 'tempo', 'processo', 'equipe']
  if (palavrasGestao.some((p) => insonia.includes(p) || perda.includes(p))) return 'tarefas'

  return 'clientes'
}

export async function registrarHistoricoConversa(
  empresaId: string,
  identidadeId: string,
  respostas: Record<string, string | null>,
  interpretacoes: Interpretacoes
) {
  const agora = new Date()
  return prisma.conversaHistorico.create({
    data: {
      empresaId,
      identidadeId,
      mes: agora.getMonth() + 1,
      ano: agora.getFullYear(),
      respostas,
      interpretacoes,
    },
  })
}
