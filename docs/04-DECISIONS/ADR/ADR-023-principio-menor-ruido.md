# ADR-023: Princípio do menor ruído possível

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O MOTOR_COGNITIVO.md (seção 5.2) define a matriz de decisão "falar vs calar" — o Motor só deve se manifestar quando tem algo relevante a dizer. Silêncio é o estado padrão.

Hoje o sistema tende a notificar excessivamente: toda observação vira alerta, toda hipótese vira recomendação. O empresário recebe mais informação do que consegue processar, gerando o oposto do efeito desejado: ruído em vez de clareza.

## Decisão

1. Silêncio é o estado padrão do Motor Cognitivo.
2. A matriz de decisão "falar vs calar" (documentada em MOTOR_COGNITIVO.md seção 5.2) é a única política de notificação.
3. O Motor só se manifesta quando:
   - O score de prioridade (ADR-020) ultrapassa o threshold configurado por empresa.
   - O conhecimento novo contradiz conhecimento anterior (conflito relevante).
   - O empresário perguntou explicitamente.
   - Uma decisão iminente exige ação do empresário.
4. O empresário pode configurar o threshold de "ruído aceitável" por tipo de notificação.
5. Por padrão, recomendações e diagnósticos periódicos seguem a frequência definida em conjunto com o empresário — não a frequência máxima possível.

## Alternativas consideradas

- Notificar tudo — rejeitada: gera ruído, dessensibiliza o empresário, e contradiz o princípio de "menos é mais".
- Deixar o empresário configurar tudo manualmente — rejeitada: o empresário não deveria precisar ser engenheiro de notificações para usar a plataforma.

## Consequências

- Positivo: o empresário recebe apenas o que é relevante no momento.
- Positivo: confiança aumenta — cada notificação tem um motivo claro.
- Negativo: conhecimento que não atinge o threshold pode ficar "escondido" — mas está disponível quando o empresário consulta.
- Negativo: calibrar o threshold para cada empresa exige aprendizado inicial — aceito como custo de onboarding.
