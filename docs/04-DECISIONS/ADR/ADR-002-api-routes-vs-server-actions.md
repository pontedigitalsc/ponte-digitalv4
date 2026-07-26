# ADR-002: Manter API Routes em vez de migrar para Server Actions agora

**Data:** 2026-07-13
**Status:** Aceita

## Contexto

`ARCHITECTURE.md` descreve uma camada futura `server/actions → services → repositories`. O código implementado hoje usa API Routes chamando services que acessam o Prisma diretamente — sem camada de `repositories` separada.

Essa divergência já era tratada como aceita em `STACK.md` e `CODE_PATTERNS.md`, mas sem um ADR formal por trás. Este documento fecha essa lacuna.

## Decisão

Manter API Routes + services (sem `repositories/` separado) durante toda a fase V4 Founder. Não migrar para `server/actions/services/repositories` antes de uma decisão explícita de escopo pós-validação com os 100 fundadores.

## Alternativas consideradas

- Migrar para Server Actions agora: rejeitada — mesma lógica do ADR-001, é sofisticação arquitetural que não resolve nenhuma lacuna real da fase atual (a lacuna real é o Diagnóstico Inteligente).
- Introduzir `repositories/` sem migrar o restante: rejeitada — camada extra sem um segundo consumidor real (só Prisma) hoje não reduz custo, só aumenta indireção.

## Consequências

- Positivo: menos camadas para o agente de código navegar, menos chance de inconsistência entre rotas.
- Negativo: quando a migração para `server/actions/services/repositories` acontecer (Fase 2/3), o volume de arquivos tocados será maior por ter sido adiado.
- Este ADR encerra a discussão: futuras auditorias não devem reabrir esse ponto como "conflito crítico" — apenas confirmar que o congelamento continua vigente em `MVP_SCOPE.md`.
