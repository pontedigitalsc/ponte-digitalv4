# Go-Live Ready — Plano de Deploy e Comunicação

> **WP-4.8** — Release Program v1.0, Programa 4
> Data: 24/07/2026 | Status: Concluído

---

## Resumo Executivo

O Release Program v1.0 está completo. Abaixo, o plano para levar a Ponte Digital à produção.

---

## Plano de Deploy

### Passo a Passo

```
Dia D-7: Pré-Deploy
├── Executar checklist de segurança (OPS-GO-LIVE-CHECKLIST.md, Fase 1)
├── Executar checklist de infraestrutura (Fase 2)
├── Configurar backups (Fase 3)
└── Simular restore

Dia D-3: Verificação
├── Executar checklist CI/CD (Fase 4)
├── Executar checklist observabilidade (Fase 5)
├── Testar todos os fluxos em staging
└── Verificar health checks

Dia D-1: Preparação
├── Executar checklist de qualidade (Fase 6)
├── Revisar documentação (Fase 7)
├── Notificar time do Go-Live
└── Preparar canal de comunicação de incidentes

Dia D (Go-Live):
├── Último deploy de staging aprovado
├── Executar deploy para produção (Vercel --prod)
├── Verificar health check
├── Verificar login
├── Verificar funcionalidades críticas
├── Liberar DNS (se necessário)
└── Assinar decisão final (Fase 8)

Dia D+1: Pós-Deploy
├── Monitorar logs
├── Verificar métricas
├── Coletar feedback
└── Post-mortem (se necessário)
```

---

## Plano de Rollback

Se algo crítico falhar no Go-Live:

```
1. Rollback: Vercel → Deployments → Promote to Production (último estável)
2. Se migration foi aplicada: rollback de migration
3. Se banco foi afetado: restore do backup
4. Comunicação: informar usuários no canal oficial
```

---

## Plano de Comunicação

### Antes do Go-Live

| Público | Mensagem | Canal | Quando |
|---------|---------|-------|--------|
| Time interno | "Go-Live agendado para D às H" | Slack/Email | D-7 |
| Fundadores (testers) | "Plataforma estará disponível em breve" | Email | D-3 |
| Primeiros usuários | "Bem-vindo à Ponte Digital" | Email | D+1 |

### Durante o Go-Live

| Situação | Ação | Responsável |
|----------|------|------------|
| Deploy bem-sucedido | Comunicar no canal interno | Operador |
| Falha no deploy | Executar rollback, investigar, reagendar | Time técnico |
| Incidente pós-deploy | Seguir runbook (OPS-RUNBOOK.md) | Plantonista |

### Pós-Go-Live (primeira semana)

| Frequência | Ação | Responsável |
|-----------|------|------------|
| A cada 6h | Verificar health check + logs | Plantonista |
| Diário | Revisar métricas de uso | Produto |
| Semanal | Post-mortem de incidentes | Time |

---

## Responsabilidades

| Papel | Responsável | Contato |
|-------|------------|---------|
| Operador de Deploy | | |
| Plantonista P0/P1 | | |
| Suporte ao Usuário | | |
| Gestor de Produto | | |

---

## Documentos de Referência

| Documento | Localização |
|-----------|-------------|
| Go-Live Checklist | `docs/05-OPERATIONS/OPS-GO-LIVE-CHECKLIST.md` |
| Runbook Operacional | `docs/05-OPERATIONS/OPS-RUNBOOK.md` |
| Segurança Operacional | `docs/05-OPERATIONS/OPS-SECURITY-CHECKLIST.md` |
| Infraestrutura | `docs/05-OPERATIONS/OPS-INFRASTRUCTURE.md` |
| Backup e Recuperação | `docs/05-OPERATIONS/OPS-BACKUP.md` |
| CI/CD | `docs/05-OPERATIONS/OPS-CICD.md` |
| Observabilidade | `docs/05-OPERATIONS/OPS-OBSERVABILITY.md` |
| Release Candidate v1.0 | `docs/05-OPERATIONS/RELEASE_CANDIDATE_V1.md` |
| Backlog Arquitetural | `docs/05-OPERATIONS/BACKLOG_ARQUITETURAL.md` |

---

## Próximos Passos (Pós-Go-Live)

1. **Programa 5 — Operação Assistida** (duas semanas pós-Go-Live)
   - Monitoramento intensivo
   - Correção de bugs reportados
   - Ajustes de performance
   - Coleta de métricas de uso real

2. **Backlog Arquitetural (ARCH-001 a ARCH-018)**
   - Priorizar com base em dados reais de uso
   - ARCH-017 (Backup automático) e ARCH-016 (CI/CD) como prioridades máximas se não resolvidos

3. **Próximo Release (v1.1+)**
   - Definido com base no aprendizado da Operação Assistida
