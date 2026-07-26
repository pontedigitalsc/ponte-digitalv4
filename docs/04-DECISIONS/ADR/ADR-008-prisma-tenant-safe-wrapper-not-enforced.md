# ADR-008: Wrapper `prisma-tenant-safe` — aceitar como não-conectado durante V4 Founder

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O arquivo `src/lib/prisma-tenant-safe.ts` existe e implementa um wrapper que força `empresaId` em toda query. No entanto, conforme documentado em `STACK.md`: "existe mas **não está conectado em nenhum service**". Todos os services importam de `@/lib/prisma-tenant-safe` como `prismaSeguro`, mas o wrapper atualmente só re-exporta o PrismaClient padrão — o tenant guard real é feito manualmente em cada query.

O RLS (Row Level Security) do Supabase também está incompleto — 3 tabelas sem policies.

Esta é uma violação do princípio "soft delete, audit trail e tenant guard em todo model" (`FOUNDATION.md`, princípio 4). No entanto, corrigir o wrapper para forçar tenant guard automaticamente exigiria uma reescrita significativa de todos os services ou um pattern de Proxy que poderia introduzir bugs silenciosos.

## Decisão

1. **Não conectar** o wrapper `prisma-tenant-safe.ts` durante a V4 Founder — o tenant guard manual por query é aceito como prática corrente.
2. **Manter o RLS incompleto** como está — o Supabase RLS é um mecanismo de segurança em camadas; enquanto o tenant guard manual estiver funcionando, a prioridade de completar as policies é baixa.
3. **Criar verificação automatizada** apenas quando houver um incidente real de vazamento de dados entre empresas — até lá, aceitar o risco calculado.

**Exceção:** qualquer novo model adicionado ao schema DEVE incluir `empresaId` e filtrar por ele em todas as queries. Não repetir o erro dos models existentes.

## Alternativas consideradas

- Implementar Proxy do Prisma que injeta `empresaId` automaticamente: rejeitada — elegante, mas arriscado: um bug no proxy vazaria dados de todas as empresas de uma vez. O guard manual, por mais verboso, é explícito e auditável linha a linha.
- Completar RLS imediatamente: rejeitada — o RLS do Supabase é uma camada de defesa, não a defesa principal. Completá-lo sem testes de integração que validem o isolamento daria uma falsa sensação de segurança.

## Consequências

- Positivo: nenhuma refatoração necessária agora.
- Risco: vazamento de dados entre empresas por erro humano (esquecer `empresaId` em uma query). Mitigação: revisão de código nos PRs foca exatamente nisso — toda query nova é verificada quanto ao tenant guard.
- Futuro: antes de abrir o produto para empresas reais (não apenas fundadores controlados), o wrapper precisa ser conectado OU o RLS completado E testado. Isso vira critério de aceite da sprint "Validação com 100 fundadores", não uma tarefa avulsa.
