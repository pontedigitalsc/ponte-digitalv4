# ADR-033: Separar invariantes de domínio de regras técnicas

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

A seção 7 do ARCHITECTURE_DDD.md lista 19 invariantes (R01-R19). A auditoria (P6) identificou que 63% deles são regras técnicas (validação de input, constraints de banco), não invariantes de domínio. Exemplos:

| Invariante | Tipo correto |
|---|---|
| R04: "Mínimo 10 caracteres de diagnóstico" | Regra técnica |
| R07: "Evidência é imutável" | Invariante de domínio ✅ |
| R08: "Status derivado" | Regra técnica |
| R15: "Mínimo 2 caracteres" | Regra técnica |
| R19: "Nome não vazio" | Regra técnica |

Manter regras técnicas misturadas com invariantes de domínio:
- Infla a lista de invariantes (parece que o domínio é mais complexo do que é).
- Confunde agentes de código sobre o que é regra de negócio inegociável vs validação de input.
- Dificulta auditorias futuras.

## Decisão

1. Mover R04, R08-R16, R19 (regras técnicas) de ARCHITECTURE_DDD.md para `CODE_PATTERNS.md` ou novo `ENGINEERING_GUIDELINES.md`.
2. Manter em ARCHITECTURE_DDD.md apenas os invariantes de domínio genuínos: R01, R02, R03, R05, R06, R07, R17, R18.
3. Atualizar a numeração para refletir a separação (reiniciar em R01 ou manter numeração original com notas).
4. Esta ADR não requer mudança de código.

## Alternativas consideradas

- Manter misturado — rejeitada: a auditoria mostrou que isso distorce a percepção da complexidade do domínio.
- Criar seção separada dentro do mesmo documento — rejeitada: menos claro que mover para documento próprio.

## Consequências

- Positivo: ARCHITECTURE_DDD.md passa a listar apenas invariantes reais de domínio.
- Positivo: agentes de código encontram validações técnicas no local correto.
- Negativo: dois documentos para consultar — mitigado por referência cruzada.
