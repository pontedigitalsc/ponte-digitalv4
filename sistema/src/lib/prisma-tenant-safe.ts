import { prisma } from './prisma'
import { InternalApplicationError } from './app-errors'
import { createLogger } from './logger'

const log = createLogger('db', 'prisma-tenant-safe')

/**
 * ─── CLIENTE PRISMA SEGURO PARA MULTI-TENANT ─────────────────────────────────
 *
 * Por que este arquivo existe:
 * O isolamento entre empresas hoje depende de cada service lembrar de incluir
 * `empresaId` no `where` de toda query. Isso funciona, mas é uma garantia
 * humana, não estrutural — um único `findMany` esquecido vaza dados entre
 * tenants.
 *
 * Este wrapper não substitui o cuidado nos services (que devem continuar
 * passando `empresaId` explicitamente), mas adiciona uma segunda camada:
 * em ambiente de desenvolvimento, qualquer query nos modelos multi-tenant
 * que não inclua `empresaId` no `where` lança erro imediatamente, em vez
 * de silenciosamente retornar dados de todas as empresas.
 *
 * Em produção, o erro é logado (não lançado) para não derrubar a aplicação
 * por um bug de query — mas fica registrado para correção imediata.
 *
 * Modelos cobertos: todos os que têm empresaId como campo direto.
 * Modelos como Contato e EtapaImplantacao são protegidos indiretamente
 * pelo filtro na entidade pai (Cliente/Implantacao).
 */

const MODELOS_MULTI_TENANT = [
  'lead',
  'cliente',
  'tarefa',
  'implantacao',
  'transacao',
  'usuario',
  'contato',
  'etapaImplantacao',
  'historico', // empresaId é opcional neste modelo (ver nota abaixo)
  'historicoSinal',
  'configuracaoEmpresa',
  'evidencia',
  'hipotese',
  'memoriaCognitiva',
  'acaoCognitiva',
  'eventoAtivacao',
  'outcome',
  'conhecimentoValidado',
  'feedbackAcao',
  'conversa',
  'identidadeDigital',
  'conversaHistorico',
  'aprendizado',
  'anotacao',
  'tag',
  'onboardingDecisao',
  'decisaoSinal',
  'event',
  'eventSubscription',
  'deadLetter',
] as const

type ModeloMultiTenant = (typeof MODELOS_MULTI_TENANT)[number]

// Alguns modelos multi-tenant têm empresaId opcional no schema
// (`empresaId String?`). Foram decisões de design para permitir
// registros sem vínculo direto de empresa em casos específicos.
// Para não gerar falso-positivo nestes modelos, o guard abaixo não
// bloqueia queries sem empresaId neles — mas para os demais modelos
// (onde empresaId é obrigatório), a ausência continua sendo tratada
// como risco real.
const MODELOS_COM_EMPRESA_ID_OPCIONAL: ModeloMultiTenant[] = ['historico', 'conversa']

function temEmpresaIdNoWhere(args: unknown): boolean {
  if (!args || typeof args !== 'object') return false
  const where = (args as { where?: unknown }).where
  if (!where || typeof where !== 'object') return false

  // empresaId direto, ou dentro de um AND/OR (uso comum em filtros compostos)
  if ('empresaId' in where) return true

  const whereObj = where as Record<string, unknown>
  if (Array.isArray(whereObj.AND)) {
    return whereObj.AND.some((c) => c && typeof c === 'object' && 'empresaId' in c)
  }
  if (Array.isArray(whereObj.OR)) {
    // OR sozinho não garante isolamento — precisa estar dentro de um AND com empresaId
    return false
  }

  return false
}

/**
 * Verifica empresaId em operações de criação — diferente de leitura/update/
 * delete, aqui o campo relevante é `data`, não `where`. Esta checagem não
 * existia até agora: todo `create()` dos services sempre incluiu empresaId
 * manualmente, mas isso era disciplina do desenvolvedor, não garantia
 * estrutural — exatamente o tipo de lacuna que este arquivo existe para
 * fechar. `createMany` usa `data` como array, precisa checar cada item.
 */
function temEmpresaIdNoData(args: unknown): boolean {
  if (!args || typeof args !== 'object') return false
  const data = (args as { data?: unknown }).data
  if (!data) return false

  if (Array.isArray(data)) {
    // createMany — todos os itens precisam ter empresaId, um esquecido já é risco
    return data.length > 0 && data.every((item) => item && typeof item === 'object' && 'empresaId' in item)
  }

  return typeof data === 'object' && 'empresaId' in data
}

/**
 * Cliente Prisma estendido com verificação de empresaId.
 * Use este client (`prismaSeguro`) em qualquer service novo, no lugar de
 * importar `prisma` diretamente, para queries nos modelos multi-tenant.
 */
export const prismaSeguro = prisma.$extends({
  name: 'tenant-isolation-guard',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const modeloLower = model.charAt(0).toLowerCase() + model.slice(1)

        const ehModeloProtegido = MODELOS_MULTI_TENANT.includes(modeloLower as ModeloMultiTenant)
        const ehModeloComExcecao = MODELOS_COM_EMPRESA_ID_OPCIONAL.includes(modeloLower as ModeloMultiTenant)

        const ehOperacaoDeLeituraOuEscrita = [
          'findMany', 'findFirst', 'update', 'updateMany', 'delete', 'deleteMany', 'count',
        ].includes(operation)
        const ehOperacaoDeCriacao = ['create', 'createMany'].includes(operation)

        // findUnique é exceção: busca por ID único, validação de empresaId
        // deve acontecer depois, no service (comparando o resultado.empresaId)
        if (ehModeloProtegido && !ehModeloComExcecao) {
          if (ehOperacaoDeLeituraOuEscrita && !temEmpresaIdNoWhere(args)) {
            avisarRisco(operation, model, args)
          }
          if (ehOperacaoDeCriacao && !temEmpresaIdNoData(args)) {
            avisarRisco(operation, model, args)
          }
        }

        return query(args)
      },
    },
  },
})

function avisarRisco(operation: string, model: string, args: unknown): void {
  const mensagem = `[tenant-isolation-guard] Query "${operation}" no modelo "${model}" foi feita sem "empresaId". Risco de vazamento entre empresas.`

  if (process.env.NODE_ENV === 'development') {
    throw new InternalApplicationError(mensagem)
  } else if (process.env.NODE_ENV === 'production') {
    log.error('Risco de vazamento entre empresas — query bloqueada', { details: { model, operation } })
    throw new InternalApplicationError('Consulta rejeitada por segurança: empresaId não especificado.')
  } else {
    log.error('Risco de vazamento entre empresas', { details: { model, operation } })
  }
}
