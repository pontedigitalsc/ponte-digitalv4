# ADR-011: Implementar Event Bus formal

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O sistema hoje não tem barramento de eventos. A comunicação entre módulos é feita por:
- Chamadas diretas de função (ex.: `cognitive-orchestrator.ts` chama `processarEvento()` que é um switch/case).
- Switch/case em `cognitive-signal-context.ts` que roteia manualmente para o handler correto.
- Queries diretas ao banco que outro módulo deveria notificar.

Isso significa que:
- Adicionar um novo handler exige modificar o switch/case (violação de Open/Closed).
- Não há rastreabilidade de quem emitiu o que e quem consumiu.
- Não há retry, dead letter, ou política de falha.
- Escalar para fila (Bull/PgBoss) exigiria reescrever todo o roteamento.

A auditoria (P4/P9) classifica como um dos problemas centrais do sistema.

## Decisão

1. Implementar um Event Bus formal com:
   - **In-memory (EventEmitter)** como implementação inicial para V1.
   - **Interface de Event Bus** abstrata para permitir substituição por fila (Bull/PgBoss) sem alterar consumidores.
2. Toda comunicação entre bounded contexts passa a usar o Event Bus.
   - Nenhum novo fluxo pode chamar outro service diretamente.
   - Fluxos existentes são encapsulados um por um (migração gradual).
3. O Event Bus deve oferecer:
   - Pub/sub por tipo de evento
   - Suporte a Correlation ID (ADR-027)
   - Middleware para logging e telemetria
   - Política de retry configurável por handler
4. `processarEvento` no `cognitive-signal-context.ts` vira um dispatcher que apenas roteia para o Event Bus — não mais um switch/case.
5. Rotinas N+1 em background (P11) são eliminadas como parte da migração: em vez de `for...of` sobre empresas, a rotina emite um `RotinaIniciada` e cada empresa processa via handler de evento.

## Alternativas consideradas

- Continuar com switch/case — rejeitada: não escala, viola Open/Closed, não tem rastreabilidade.
- Implementar diretamente com fila Bull/PgBoss — rejeitada: complexidade desnecessária para V1. In-memory é suficiente até que haja necessidade real de persistência de eventos ou processamento assíncrono entre serviços.
- Usar mensageria externa (RabbitMQ, Kafka) — rejeitada: fora de proporção para o estágio da empresa.

## Consequências

- Positivo: adicionar novos handlers não exige modificar roteamento existente — apenas registrar no Event Bus.
- Positivo: rastreabilidade completa de eventos (quem emitiu, quem consumiu, quanto tempo levou).
- Positivo: caminho pavimentado para escalar para fila quando necessário.
- Positivo: score de Event Driven sobe de 1/10 para 7/10.
- Negativo: migração gradual — fluxos existentes continuam no padrão antigo até serem encapsulados um por um.
- Negativo: in-memory significa que eventos são perdidos se o processo morre antes do processamento. Aceito para V1 — eventos não-processados são reconstruíveis a partir do banco.
