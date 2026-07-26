# Stack Técnica Real

*(Corrigido em 2026-07-13 por auditoria de patrimônio intelectual, cruzando com inspeção direta do código real — ver `../../AUDITORIA_PATRIMONIO_INTELECTUAL.md`. Versão anterior estava incompleta. Atualizar se a stack mudar.)*

- **Framework:** Next.js 16.2.9 (App Router)
- **UI:** React 19.2.4, TypeScript, Tailwind CSS 4, shadcn/ui (Radix primitives)
- **Formulários:** react-hook-form + @hookform/resolvers + Zod
- **Estado/dados:** TanStack Query (react-query) + hooks próprios (`use-*.ts`)
- **Gráficos:** Recharts
- **Datas:** date-fns
- **ORM:** Prisma 7.8 com `@prisma/adapter-pg`
- **Banco de dados:** PostgreSQL via Supabase (`DATABASE_URL` pooling + `DIRECT_URL` para migrations — no Prisma 7, isso vive em `prisma.config.ts`, não mais no `schema.prisma`)
- **Autenticação:** Supabase Auth (`@supabase/ssr`, `@supabase/supabase-js`) via middleware
- **Entrada de mutações:** API Routes (não Server Actions — decisão aceita para a V4 Founder, ver `04-DECISIONS/ADR/ADR-002-api-routes-vs-server-actions.md` e `02-PRODUCT/MVP_SCOPE.md`)
- **IA:** `@anthropic-ai/sdk` + pacote `ai` (Vercel AI SDK), usados em `/api/assistente`, com limites por plano

## Nota sobre tenant guard (ver `08-KNOWLEDGE/ENGINEERING_KNOWLEDGE.md` para o detalhe completo)

O tenant guard hoje depende de três coisas, nem todas totalmente confirmadas: `empresaId` manual em cada query, Row Level Security (`sistema/prisma/rls-policies.sql` — incompleta, faltam policies em 3 tabelas), e um wrapper de aplicação (`sistema/src/lib/prisma-tenant-safe.ts`) que existe mas **não está conectado em nenhum service**. Tratar como item de prioridade alta em `05-OPERATIONS/KNOWN_ISSUES.md`, não como garantia já cumprida.

## O que NÃO fazer com a stack agora

- Não migrar API Routes para Server Actions nesta fase.
- Não introduzir camada `repositories/` separada nesta fase — services acessando Prisma diretamente é aceito.
- Não adicionar novas dependências grandes sem justificar pela Matriz de Decisão (`01-VISION/PRINCIPLES.md`).
