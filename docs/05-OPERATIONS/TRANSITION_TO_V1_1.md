# Transição para v1.1 — Ponte Digital

> **WP-5.8** — Release Program v1.0, Programa 5 (Encerramento)
> Data: 24/07/2026 | Status: ✅ Concluído

---

## Como Iniciar a Evolução

A v1.0 está congelada. Toda evolução futura deve seguir o fluxo abaixo.

### Pré-requisitos para iniciar v1.1

Antes de qualquer desenvolvimento novo:
1. **Executar Go-Live checklist** (OPS-GO-LIVE-CHECKLIST.md) — ação humana
2. **Resolver ARCH-016** (CI/CD) e **ARCH-017** (Backup) — P0 do RC
3. **Estabelecer ambiente de staging** (pelo menos 1 semana de operação assistida)

---

## Regras de Novas Funcionalidades

Toda funcionalidade proposta para v1.1 deve:
1. Responder a um problema real do empresário (ver matriz de decisão em AGENTS.md)
2. Passar por ADR se tocar em arquitetura
3. Ser documentada antes de implementada
4. Ser testada (unitário + integração quando possível)
5. Preservar compatibilidade com dados v1.0

---

## Fluxo de ADR

```
1. Identificar necessidade → Registrar issue
2. Escrever ADR (template em docs/04-DECISIONS/ADR/)
3. Revisar com time
4. Aprovar ou rejeitar
5. Se aprovado: atualizar ARQUITETURA.md + ADR_NAVIGATOR.md
6. Implementar conforme ADR
```

ADR deve responder:
- Qual o problema?
- Quais as opções consideradas?
- Qual a decisão e por quê?
- Quais as consequências?

---

## Fluxo de Auditoria

Antes de qualquer merge para main:
1. `tsc --noEmit` — zero erros
2. `npm run lint` — zero erros
3. `npm run build` — ok
4. Revisão de segurança (tenant guard, session, input validation)
5. Documentação atualizada (se aplicável)
6. ADR registrada (se mudança arquitetural)

---

## Fluxo de Documentação

Toda mudança deve gerar atualização documental:

| Tipo de Mudança | Documentos a Atualizar |
|----------------|------------------------|
| Nova funcionalidade | CHANGELOG.md, ROADMAP.md |
| Mudança arquitetural | ADR, ARQUITETURA.md, ADR_NAVIGATOR.md |
| Novo módulo | KNOWLEDGE_INDEX.md, START-HERE.md |
| Mudança de API | DOCUMENTAÇÃO_APIS.md |
| Mudança de schema | DATABASE.md, schema.prisma migration |
| Mudança operacional | RUNBOOK.md, OPS-* docs |
| Qualquer mudança | CHANGELOG.md |

---

## Fluxo de Release

```
1. Branch develop → Staging deploy automático
2. Testes em staging (mínimo 24h)
3. Criar tag release/vX.Y.Z
4. CI/CD roda testes + build
5. Deploy para produção
6. Criar GitHub Release
7. Verificar health check (24h pós-deploy)
8. Atualizar CHANGELOG.md
```

---

## Governança

| Prática | Regra |
|---------|-------|
| ADRs obrigatórias | Para toda decisão arquitetural |
| Backlog arquitetural | Manter atualizado com novos itens |
| Definição de pronto | Ver DoD no EXECUTION_PROGRAM.md |
| Code review | Obrigatório antes de merge |
| Quality gates | `tsc --noEmit` + lint + build |
| Documentação | Deve acompanhar código |

---

## Critérios para Novas Engines

Uma nova engine cognitiva deve:
1. Ser aprovada via ADR
2. Ter interface definida antes da implementação
3. Publicar eventos no barramento (quando implementado)
4. Respeitar TTL/configurações do Forgetting Engine
5. Registrar métricas (tempo, taxa, erros)
6. Ter testes unitários com cobertura ≥ 60%

---

## Critérios para Novos Módulos

Um novo módulo de negócio deve:
1. Ser aprovado pelo gestor de produto
2. Ter ADR se tocar em arquitetura
3. Seguir padrão API Routes → Services → Prisma
4. Implementar tenant guard
5. Implementar validação Zod
6. Implementar logs estruturados
7. Ter testes de integração

---

## Critérios para Mudanças Arquiteturais

Uma mudança arquitetural deve:
1. Ser registrada como ADR
2. Justificar o motivo da mudança
3. Avaliar impacto nos módulos existentes
4. Incluir plano de migração
5. Ser testada em staging antes de produção
6. Ter rollback documentado

---

## Boas Práticas para v1.1

1. **Testes primeiro** — estabelecer cultura de teste desde o início da v1.1
2. **CI/CD desde o dia 1** — não repetir o erro da v1.0
3. **Backup automático antes de qualquer mudança significativa**
4. **Documentação acompanha código** — sem exceção
5. **Release pequenas e frequentes** — evitar acumular mudanças
6. **Staging como ambiente obrigatório** — nunca deploy direto em produção
7. **Monitoramento antes de escala** — só escalar quando souber medir

---

## Roadmap Sugerido para v1.1

```
Fase 1: Operação Assistida (2 semanas)
├── Go-Live checklist executado
├── CI/CD configurado
├── Backup ativado
├── Monitoramento básico
└── Correção de bugs reportados

Fase 2: Foundation (P1 — 2 semanas)
├── FK, tenant, soft delete, auditoria
├── RLS no Supabase
├── Zod em 100% das rotas
└── Rate limiting

Fase 3: Otimização (P6 — 2 semanas)
├── Testes unitários (engine core)
├── CI/CD completo
├── Cache distribuído
└── Performance (N+1, índices)

Fase 4+: Roadmap P2-P5 (Motor Cognitivo completo)
```

---

## Referências

| Documento | Link |
|-----------|------|
| Release Final v1.0 | `docs/05-OPERATIONS/RELEASE_FINAL_V1.md` |
| Platform Baseline | `docs/09-ARCHITECTURE/PLATFORM_BASELINE_V1.md` |
| Platform Certification | `docs/05-OPERATIONS/PLATFORM_CERTIFICATION_V1.md` |
| Roadmap v1.1 | `docs/06-ROADMAP/ROADMAP_V1_1.md` |
| Lessons Learned | `docs/05-OPERATIONS/LESSONS_LEARNED.md` |
| Backlog Arquitetural | `docs/05-OPERATIONS/BACKLOG_ARQUITETURAL.md` |
| Execution Program | `docs/05-OPERATIONS/EXECUTION_PROGRAM.md` |
| ADR Navigator | `docs/09-ARCHITECTURE/ADR_NAVIGATOR.md` |
| CHANGELOG | `CHANGELOG.md` |
| VERSION_1.0 | `docs/05-OPERATIONS/VERSION_1.0.md` |

---

*Documento de transição oficial. Emitido em 24/07/2026.*
