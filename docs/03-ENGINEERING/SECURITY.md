# Segurança — Isolamento Multi-Tenant

*Este arquivo consolida, num único lugar, o que já estava disperso entre `DATABASE.md`, `STACK.md`, `05-OPERATIONS/KNOWN_ISSUES.md` e `08-KNOWLEDGE/ENGINEERING_KNOWLEDGE.md` sobre o tenant guard. Não substitui o detalhe técnico completo — só evita que quem chega precise ler quatro arquivos para entender o quadro geral.*

## Regra inegociável

Todo model que pertence a uma empresa precisa filtrar por tenant em toda query — nunca confiar em filtro só na camada de UI (ver `01-VISION/FOUNDATION.md`, `03-ENGINEERING/DATABASE.md`).

## Situação real hoje — três camadas, nenhuma totalmente confirmada

O tenant guard hoje depende de três mecanismos, verificados diretamente contra `sistema/prisma/rls-policies.sql` e `sistema/src/` em 2026-07-13:

1. **`empresaId` manual em cada query** — depende de disciplina do desenvolvedor, sem rede de segurança automática.
2. **Row Level Security no Postgres** — `rls-policies.sql` habilita RLS em 11 tabelas, mas só cria a policy `empresa_isolamento` em 8 delas. `empresas`, `contatos` e `etapas_implantacao` têm RLS habilitado **sem nenhuma policy** — a depender da role de conexão do Prisma, isso pode significar acesso bloqueado ou RLS simplesmente ignorado (ex.: `service_role` do Supabase ignora RLS por padrão). `HistoricoSinal` não tem RLS habilitado de forma nenhuma.
3. **Wrapper de aplicação (`prismaSeguro`)** — `sistema/src/lib/prisma-tenant-safe.ts` detecta queries multi-tenant sem `empresaId`, mas **nenhum dos 7 services do projeto o importa**; todos usam `@/lib/prisma` direto. O "segundo nível de proteção" descrito no próprio comentário do arquivo não está, de fato, rodando.

**Conclusão prática:** a garantia de isolamento entre empresas hoje é mais fraca do que qualquer documento afirma. Não é um problema de documentação — é uma tarefa de engenharia real, com prioridade alta em `05-OPERATIONS/KNOWN_ISSUES.md`.

## Ação pendente (decisão do fundador, não implementar sozinho)

- Confirmar qual role o Prisma usa para conectar (define se o gap de RLS é crítico ou inofensivo).
- Criar as policies faltantes em `empresas`, `contatos`, `etapas_implantacao`.
- Decidir se `HistoricoSinal` precisa de RLS.
- Decidir se os services migram para `prismaSeguro` ou se o arquivo é removido (não deixar código morto que sugere uma garantia que não existe).

Detalhe técnico completo e verificação model-a-model: `08-KNOWLEDGE/ENGINEERING_KNOWLEDGE.md`.
