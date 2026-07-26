# ADR-030: Eliminar CrencaDaIdentidade e ConhecimentoDaIdentidade

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O model `IdentidadeDigital` (IdentityContext) possui campos JSON `crencas` e `conhecimentos` que duplicam os agregados `Hipotese` e `Conhecimento` do KnowledgeContext. Esta duplicata não tem justificativa de domínio — ambos armazenam os mesmos tipos de informação em formatos diferentes.

A Ontologia Cognitiva (`ONTOLOGIA_COGNITIVA.md`) estabelece que não pode haver duas representações do mesmo conceito no sistema. `CrencaDaIdentidade` é, na Ontologia, uma `Hipotese`. `ConhecimentoDaIdentidade` é um `Conhecimento`.

## Decisão

1. Eliminar os campos JSON `crencas` e `conhecimentos` do model `IdentidadeDigital`.
2. Substituir por referências (IDs) ao agregado `PatrimonioCognitivo` (ADR-010).
3. A `IdentidadeDigital` mantém um resumo (cache) dos conhecimentos mais relevantes para consulta rápida, mas a fonte da verdade passa a ser o `PatrimonioCognitivo`.
4. Migração: script que lê os JSONs existentes, cria/vincula os registros no `PatrimonioCognitivo`, e remove os campos JSON.
5. A migração ocorre **após** a unificação do Patrimônio Cognitivo (ADR-010) — as duas mudanças devem ser implementadas na mesma sprint.

## Alternativas consideradas

- Manter duplicata como cache de leitura — rejeitada: viola o princípio de "uma fonte da verdade". Cache deve ser explícito e gerenciado, não um campo JSON paralelo.
- Migrar antes da ADR-010 — rejeitada: sem o agregado unificado, os dados JSON não teriam para onde migrar.

## Consequências

- Positivo: elimina duplicata conceitual que confunde auditores e desenvolvedores.
- Positivo: a `IdentidadeDigital` deixa de ser um "agregado de tudo" e volta a ter responsabilidade única.
- Negativo: migração de dados necessária — requer script de validação.
- Negativo: durante a migração, o sistema precisa operar em modo híbrido (lê dos dois lugares).
