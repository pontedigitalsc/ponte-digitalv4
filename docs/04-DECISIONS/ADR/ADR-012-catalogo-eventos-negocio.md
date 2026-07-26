# ADR-012: Catálogo formal de eventos de negócio

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O sistema usa hoje nomenclatura técnica para seus sinais/eventos (`sinal-clientes`, `sinal-financeiro`, `sinal-operacional`). Isso é aceito pelo ADR-001 durante a V4 Founder, mas a auditoria identificou que antes da Sprint 8 é necessário congelar o padrão semântico para eventos novos.

Além disso, o MOTOR_COGNITIVO.md define que todo evento de entrada e saída do Motor deve ser catalogado antes de implementado (ADR-022 original). Ambas as ADRs (012 e 022) tratam do mesmo problema: vocabulário formal de eventos.

## Decisão

1. **Fundir ADR-012 e ADR-022** em um catálogo único de eventos da Ponte Digital.
2. Adotar o padrão de nomenclatura `{Sujeito}{AcaoNoParticipioPassado}` para eventos de negócio (ex.: `ClienteNaoRetornou`, `DiagnosticoConcluido`, `HipoteseValidada`).
3. O catálogo abrange:
   - **Eventos de negócio** (disparados por domínios da Plataforma Cognitiva)
   - **Eventos cognitivos** (disparados pelos submotores do Motor Cognitivo)
   - **Eventos de entrada** (o que o Motor recebe de módulos externos)
   - **Eventos de saída** (o que o Motor produz para consumo externo)
4. Eventos novos DEVEM seguir o catálogo formal. Eventos antigos (`sinal-*`) são migrados gradualmente quando o módulo correspondente for refatorado.
5. O catálogo é documentado em `docs/03-ENGINEERING/CATALOGO_EVENTOS.md`.

## Alternativas consideradas

- Manter nomenclatura técnica existente — rejeitada: não comunica intenção de negócio, dificulta rastreamento de impacto.
- Criar dois catálogos separados (012 para negócio, 022 para Motor) — rejeitada: a fusão reduz duplicação e garante vocabulário consistente em toda a plataforma.

## Consequências

- Positivo: vocabulário único e semântico para todo o sistema.
- Positivo: novos desenvolvedores entendem o significado do evento pelo nome, sem precisar ler a implementação.
- Negativo: eventos antigos (`sinal-*`) precisam ser migrados gradualmente — custo aceito e planejado na Fase 6 da auditoria.
- Este ADR substitui a necessidade de ADR-022 separada.
