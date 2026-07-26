# ADR-028: Curadoria obrigatória do Knowledge Vault

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O princípio 7 do MOTOR_COGNITIVO.md estabelece: "Um Knowledge Vault sem curadoria é um depósito de lixo."

Hoje o conhecimento entra no sistema sem validação cruzada:
- Qualquer engine pode escrever em `ConhecimentoValidado` diretamente.
- Não há verificação de que uma hipótese foi realmente validada antes de virar conhecimento.
- Conhecimento contraditório pode coexistir sem resolução.
- Não há distinção entre "conhecimento validado por curadoria" e "conhecimento aceito por falta de evidência contrária".

## Decisão

1. Nenhum conhecimento entra no Knowledge Vault sem curadoria.
2. Curadoria exige validação cruzada por no mínimo 2 submotores do Motor Cognitivo:
   - **Submotor de Hipótese** — gerou a hipótese a partir de sinais observados.
   - **Submotor de Validação** — confirmou a hipótese contra evidências existentes.
   - **Submotor de Confiança** — atribuiu score de confiança (ADR-025).
   - **Submotor de Conhecimento** — formalizou como conhecimento no ciclo de vida (ADR-018).
3. Conhecimento que não passa por curadoria não atinge o estado `ConhecimentoValidado` — permanece como `HipoteseGerada` ou `EmObservacao`.
4. Exceção: conhecimento explícito do empresário (ADR-025, score ≥ 70) entra com curadoria simplificada — 1 submotor (Confiança) valida a origem, não o conteúdo.
5. A curadoria é registrada como metadado do conhecimento — quem curou, quando, com base em quais evidências.

## Alternativas consideradas

- Sem curadoria (qualquer engine escreve conhecimento) — rejeitada: leva a conhecimento contraditório, não validado, e sem rastreabilidade de origem.
- Curadoria manual (empresário valida todo conhecimento) — rejeitada: o empresário não tem tempo para isso. A curadoria é automatizada pelos submotores.

## Consequências

- Positivo: conhecimento no Vault é confiável — passou por validação cruzada.
- Positivo: rastreabilidade de curadoria — sabe-se quem (qual submotor) validou o quê e quando.
- Positivo: conhecimento contraditório é identificado e resolvido durante a curadoria.
- Negativo: conhecimento leva mais tempo para entrar no Vault (precisa passar por N submotores). Aceito: melhor conhecimento mais lento mas correto que conhecimento rápido mas não confiável.
- Negativo: exceção do conhecimento explícito do empresário exige implementação cuidadosa para evitar que conhecimento não-validado entre como "explícito".
