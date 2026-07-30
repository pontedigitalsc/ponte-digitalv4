// P36 ETAPA 2 — Registro Automático de Evidências
// Toda ação importante do empresário gera evidência automaticamente.
// Invisível para o usuário. Fortalece o Patrimônio de Conhecimento.

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type AcoesImportantes =
  | 'RECOMENDACAO_VISUALIZADA'
  | 'RECOMENDACAO_IGNORADA'
  | 'RECOMENDACAO_ACEITA'
  | 'DECISAO_TOMADA'
  | 'ATENDIMENTO_REGISTRADO'
  | 'RETORNO_CLIENTE'
  | 'ALTERACAO_PRECO'
  | 'CRIACAO_SERVICO'
  | 'MELHORIA_OPERACIONAL'

export async function registrarAcao(
  empresaId: string,
  acao: AcoesImportantes,
  descricao: string,
  dados?: Prisma.InputJsonValue,
) {
  await prisma.evidencia.create({
    data: {
      empresaId,
      categoria: 'GESTAO',
      origem: 'ACAO_USUARIO',
      descricao: `[${acao}] ${descricao}`,
      confianca: 'ALTA',
      dados: dados ?? Prisma.DbNull,
    },
  })
}

export async function registrarRecomendacao(
  empresaId: string,
  recomendacaoId: string,
  acao: 'VISUALIZADA' | 'ACEITA' | 'IGNORADA',
) {
  await registrarAcao(empresaId, `RECOMENDACAO_${acao}` as AcoesImportantes, `Recomendação ${acao.toLowerCase()}`, { recomendacaoId } as Prisma.InputJsonValue)

  await prisma.auditoriaRecomendacao.create({
    data: {
      empresaId,
      recomendacaoId,
      tipo: acao === 'VISUALIZADA' ? 'ACAO_GERADA' : acao === 'ACEITA' ? 'RESULTADO_OBTIDO' : 'IGNORADA',
      resultado: acao === 'ACEITA' ? 'SIM' : acao === 'IGNORADA' ? 'NAO' : null,
    },
  })
}
