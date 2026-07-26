# KNOWLEDGE_REGISTRY.md — Registro de Padrões Observados sobre a Própria Ponte Digital

## Atenção — desambiguação necessária

Este documento **não é** o mesmo conceito que `KnowledgeRegistry`, a feature de produto congelada até Fase 3 (repositório de conhecimento acumulado sobre padrões de negócio dos clientes, por segmento — ver `01-VISION/TERMINOLOGY.md` e `02-PRODUCT/MVP_SCOPE.md`). O nome colide de propósito por vir da mesma missão de auditoria, mas os dois documentos servem públicos diferentes:

- **`KnowledgeRegistry` (produto, congelado):** o que a Ponte aprende sobre os negócios dos clientes.
- **`KNOWLEDGE_REGISTRY.md` (este arquivo, documentação):** o que a própria equipe/fundador aprendeu construindo a Ponte Digital — padrões de arquitetura, de processo, de decisão.

Se essa colisão de nome incomodar, renomear este arquivo para `PROJECT_KNOWLEDGE_REGISTRY.md` é uma opção — não fiz isso automaticamente para não presumir preferência de nomenclatura sem confirmar.

## Padrões observados até agora (2026-07-13)

- Simplificações estratégicas aceitas (ADR-001, ADR-002) tendem a ser mal interpretadas por auditorias futuras como "dívida técnica" — vale sempre checar se existe um ADR justificando a divergência antes de propor correção.
- Documentação gerada por sessões de IA separadas, sem ponto de entrada único versionado, tende a divergir silenciosamente (ver `LESSONS_LEARNED.md`, LIÇÃO-001).
- Mecanismos de segurança bem documentados no código não são garantia de que estão em uso — verificar sempre o consumo real (ver `LESSONS_LEARNED.md`, LIÇÃO-003).

## Pendente

Este registro cresce conforme mais padrões forem observados ao longo do desenvolvimento — não há conteúdo suficiente ainda para ir além do que a auditoria de 2026-07-13 encontrou.
