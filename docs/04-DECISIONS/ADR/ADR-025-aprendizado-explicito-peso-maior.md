# ADR-025: Aprendizado explícito do empresário tem peso maior que aprendizado inferido

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O MOTOR_COGNITIVO.md (seção 11) define que o aprendizado explícito (ensinado pelo empresário) e o aprendizado inferido (deduzido pelo Motor) têm pesos diferentes. Score de confiança inicial de aprendizado explícito é ≥ 70; aprendizado inferido começa em ≤ 30.

Hoje o sistema não distingue entre os dois tipos de conhecimento — um padrão observado por 3 dias tem o mesmo peso que uma regra de negócio ensinada pelo empresário que tem 20 anos de experiência.

## Decisão

1. Score de confiança inicial é atribuído conforme a origem:

   | Origem | Score inicial | Peso |
   |---|---|---|
   | Empresário (ensino explícito) | ≥ 70 | Alto |
   | Motor (inferido de padrões) | ≤ 30 | Baixo |
   | Validação de terceiros (ex.: contador) | ≥ 50 | Médio |
   | IA (tradução de contexto) | 0 | Nenhum — só traduz |

2. O score evolui com o tempo:
   - Conhecimento confirmado por resultados → score aumenta.
   - Conhecimento contradito por resultados → score diminui.
   - Conhecimento não revalidado → score decai (ADR-026).
3. Decisões baseadas em conhecimento com score < 50 são marcadas como "baixa confiança" e exigem validação do empresário.
4. A IA não gera conhecimento — portanto seu score de confiança é sempre 0 no que se refere a conteúdo cognitivo.

## Alternativas consideradas

- Score uniforme para todo conhecimento — rejeitada: não reflete a realidade — conhecimento ensinado por quem vive o negócio é inerentemente mais confiável que um padrão observado em 3 dias.
- Score apenas baseado em validação posterior — rejeitada: a confiança inicial importa — conhecimento do empresário merece precedência até que evidências mostrem o contrário.

## Consequências

- Positivo: o Motor respeita o conhecimento do empresário — ele não "compete" com quem entende do negócio.
- Positivo: decisões com baixa confiança são explicitamente marcadas — o empresário sabe quando validar.
- Negativo: score inicial de conhecimento inferido é baixo — pode levar mais tempo para que padrões reais sejam confiáveis. Aceito: melhor falso negativo (padrão real não priorizado) que falso positivo (ruído tratado como verdade).
