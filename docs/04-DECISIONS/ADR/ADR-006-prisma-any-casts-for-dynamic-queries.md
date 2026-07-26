# ADR-006: Casts `as any` em queries Prisma dinâmicas — aceitar para V4 Founder

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

Diversas queries Prisma no código usam `as any` para contornar limitações de tipo do TypeScript/Prisma em cenários de queries dinâmicas. Exemplos:

- `aprendizado-service.ts:72` — filtro `where` montado condicionalmente: `const where: any = { empresaId }`
- `cognitive-observatory.ts` — `groupBy` com `_count` onde o tipo retornado não corresponde exatamente ao esperado
- `cognitive-experience-engine.ts` — acesso a `(fb as any).acao?.titulo` para campos de feedback que o tipo do Prisma não reflete

O Prisma 7 gera tipos exatos para operações estáticas, mas queries com `where` condicional, `groupBy` com agregadores, e campos JSON aninhados frequentemente exigem escapes de tipo.

## Decisão

Aceitar `as any` como prática válida durante a V4 Founder para:

1. **Filtros dinâmicos** — montagem condicional de `where` com campos opcionais.
2. **Agregações** — `groupBy` com `_count`, `_avg`, `_sum` onde o tipo de retorno do Prisma é genérico demais.
3. **Campos JSON** — acesso a propriedades de `JsonValue` que o tipo do Prisma trata como `Prisma.JsonValue`.
4. **Campos de relações que o tipo do Prisma não expõe** — como `feedback.acao.titulo` onde `acao` é um campo de relação em um tipo de retorno agregado.

**Não aceitar** `as any` para:
- Chamadas de função com assinatura conhecida (ex.: `await (qualquerFn as any)(args)`)
- Acesso a propriedades que existem no tipo gerado pelo Prisma mas foram ignoradas por preguiça de tipar
- Valores de retorno de funções que poderiam ser tipadas com `satisfies` ou type narrowing

## Alternativas consideradas

- Tipagem exaustiva com type guards e narrowing: rejeitada — aumenta a complexidade em 3x para zero ganho de segurança em tempo de execução, já que o Prisma valida as queries no servidor.
- Remover Prisma em favor de SQL puro + `zod`: rejeitada — fora de proporção para o problema; trocar de ORM para evitar 10 casts `as any` não faz sentido na V4 Founder.

## Consequências

- Positivo: código mais enxuto, menos cerimônia de tipos para queries dinâmicas.
- Negativo: perde-se verificação de tipos em tempo de compilação para esses trechos — mitigado por testes de fumaça nas rotas que usam essas queries.
- Futuro: quando o Prisma 8 ou uma versão futura gerar tipos melhores para agregadores e JSON, remover gradualmente os casts. Não criar tarefa agora.
