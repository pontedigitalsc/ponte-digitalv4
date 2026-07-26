import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

/**
 * A partir do Prisma 7, a instanciação do PrismaClient exige um driver
 * adapter explícito — confirmado na documentação oficial de upgrade:
 * "The way to create a new Prisma Client has changed to require a driver
 * adapter for all databases."
 *
 * DATABASE_URL (pooled, porta 6543) é usada aqui porque este é o client
 * de runtime da aplicação — diferente de DIRECT_URL, usada apenas pelo
 * CLI em prisma.config.ts para migrations.
 */
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
