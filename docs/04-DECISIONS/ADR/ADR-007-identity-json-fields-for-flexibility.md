# ADR-007: Campos JSON na Identidade Digital — flexibilidade sobre schema formal

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O model `IdentidadeDigital` usa campos JSON para armazenar dados não-estruturados:

- `dados` (Json) — respostas do diagnóstico, mapa chave-valor de perguntas e respostas
- `interpretacoes` (Json) — saída do interpretador de respostas (`pontoAtencao`, `observacao`, `alinhamento`)
- `conhecimentos` (Json) — array de `{ descricao, confianca }` — conhecimentos da empresa
- `crencas` (Json) — array de `{ descricao, confianca }` — hipóteses em observação
- `lacunas` (Json) — array de `{ descricao }` — o que ainda não sabemos

Isso foi criticado como "falta de schema" em auditorias. No entanto, é intencional: a Identidade Digital é um agregado de conhecimento em evolução constante, onde o schema de cada campo muda conforme o motor cognitivo amadurece. Congelar um schema formal agora criaria migrações a cada sprint.

## Decisão

Manter campos JSON na Identidade Digital durante toda a V4 Founder. Formalizar em colunas/relações separadas apenas quando:

1. Um campo JSON for consultado em queries de filtro/ordenação com frequência (ex.: "buscar empresas onde `pontoAtencao === 'FINANCEIRO'`").
2. Um campo JSON crescer além de 10 propriedades aninhadas.
3. Houver necessidade de constraints de integridade referencial (ex.: `conhecimentos` referenciar `ConhecimentoValidado.id`).

## Alternativas consideradas

- Modelar cada subcampo como tabela separada (ex.: `ConhecimentoDaIdentidade`, `Interpretacao`, `Lacuna`): rejeitada — adicionaria 5+ tabelas que só existem como projeção de leitura da identidade, sem operações CRUD independentes.
- Usar `Json` tipado com Zod + type genérico do Prisma: aceita como melhoria contínua, não como mudança de schema — os tipos já existem no TypeScript (ex.: `Interpretacoes` em `tipos.ts`), só não estão vinculados ao schema Prisma.

## Consequências

- Positivo: zero migrações para adicionar/remover campos dentro da identidade.
- Positivo: o interpretador de respostas pode evoluir livremente sem acoplar o banco.
- Negativo: sem índices em campos JSON, queries de filtro por `pontoAtencao`, por exemplo, são lentas. Mitigação: não fazemos essas queries hoje; quando precisarmos, migramos o campo para coluna própria.
