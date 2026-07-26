import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

/**
 * ─── CONFIGURAÇÃO PRISMA 7 ─────────────────────────────────────────────────
 *
 * A partir do Prisma 7, `url` e `directUrl` não são mais aceitos dentro do
 * bloco `datasource` do schema.prisma — a conexão usada pelo CLI (migrations,
 * db push, introspection) passa a ser configurada aqui.
 *
 * Importante, confirmado na documentação oficial de upgrade
 * (prisma.io/docs/guides/upgrade-prisma-orm/v7):
 * "the connection string defined in url is used by Prisma CLI for
 * migrations" — ou seja, o campo `url` abaixo corresponde ao antigo
 * `directUrl` (conexão direta, sem pooling), não ao `DATABASE_URL` com
 * pooling que a aplicação usa em runtime.
 *
 * DATABASE_URL (pooled, porta 6543) continua sendo usada apenas pela
 * aplicação em runtime — configurada separadamente em src/lib/prisma.ts,
 * não aqui.
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DIRECT_URL'),
  },
})
