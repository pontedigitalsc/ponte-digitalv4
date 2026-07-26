import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { Sinal } from '@/engine'
import { createLogger } from '@/lib/logger'

const log = createLogger('services', 'historico-sinal')

/**
 * ─── HISTÓRICO DE SINAIS (MEMÓRIA OPERACIONAL) ────────────────────────────────
 *
 * Responsabilidade única: registrar os Sinais gerados pela Camada de Sinais
 * (src/engine/) ao longo do tempo. Este service não interpreta nada — não
 * calcula tendência, não compara períodos. Isso é, deliberadamente, apenas
 * a metade "Banco" da futura Camada de Contexto: registrar o fato agora,
 * para que o cálculo de contexto real seja possível mais tarde, quando
 * houver histórico suficiente para isso não ser inventado.
 */

const MOTOR_ORIGEM_ATUAL = 'camada-sinais'

/**
 * Grava um snapshot dos sinais atuais de uma empresa. Chamado a partir do
 * Dashboard, na mesma requisição em que gerarSinais() já roda — não é uma
 * chamada adicional de rede do ponto de vista do usuário, é apenas uma
 * escrita a mais no mesmo ciclo de carregamento da página.
 *
 * O Sinal inteiro é serializado em `dadosOriginais` — preserva tudo que a
 * Camada de Sinais sabia sobre aquele fato no momento em que ocorreu,
 * incluindo a ação sugerida e a origem do dado. Sem isso, o histórico
 * teria só o título e a urgência, o que não seria suficiente para um
 * futuro Motor de Contexto recalcular ou comparar com precisão.
 *
 * Falhas aqui não devem quebrar o carregamento do Dashboard — registrar
 * histórico é um efeito colateral, não o propósito principal da página.
 * Por isso o service engole erros internamente em vez de propagá-los.
 */
export async function registrarHistoricoSinais(empresaId: string, sinais: Sinal[]): Promise<void> {
  if (sinais.length === 0) return

  try {
    await prisma.historicoSinal.createMany({
      data: sinais.map((sinal) => ({
        empresaId,
        motorOrigem: MOTOR_ORIGEM_ATUAL,
        sinalId: sinal.id,
        dominio: sinal.dominio,
        urgencia: sinal.urgencia,
        titulo: sinal.titulo,
        descricao: sinal.descricao,
        dadosOriginais: sinal as unknown as object,
      })),
    })
  } catch (erro) {
    // eslint-disable-next-line no-console
    log.error('Falha ao registrar histórico de sinais', { empresaId, details: { erro } })
  }
}

/**
 * Conta quantas vezes um sinal específico apareceu para uma empresa dentro
 * de uma janela de dias. Esta é a primeira consulta de "contexto" que já
 * pode ser respondida com dado real, sem inventar nada — mas ainda não é
 * o Motor de Contexto em si, só uma contagem simples que ele poderá usar
 * como um dos seus insumos no futuro.
 */
export async function contarOcorrenciasSinal(
  empresaId: string,
  sinalId: string,
  diasJanela: number = 30
): Promise<number> {
  const desde = new Date()
  desde.setDate(desde.getDate() - diasJanela)

  return prisma.historicoSinal.count({
    where: { empresaId, sinalId, criadoEm: { gte: desde } },
  })
}
