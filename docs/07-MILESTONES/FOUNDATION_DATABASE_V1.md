# Foundation Database V1

## Marco de Fundação do Banco de Dados

### Data de conclusão: 29 de julho de 2026

---

## 1. Contexto

Após os Programas 31–36, a base de dados da Ponte Digital estava funcional — o banco continha todos os dados reais necessários para operação — mas a cadeia de migrations do Prisma não era confiável. As 4 migrations existentes eram correções incrementais (add FK, add indexes, fase 0/1) que não representavam a estrutura completa do banco, e dependiam de migrations anteriores que não estavam mais no histórico.

Isso significava que era impossível reconstruir o banco a partir de migrations em um ambiente novo — uma violação do princípio de Infrastructure as Code e um risco operacional para deploys futuros.

## 2. Problema Resolvido

| Problema | Impacto | Solução |
|----------|---------|---------|
| Cadeia de migrations incompleta | `prisma migrate dev` falhava em banco vazio | Baseline única representando 100% do schema |
| 4 migrations incrementais quebradas | Histórico não refletia a realidade | Migrações arquivadas em `prisma/migrations_archive/` |
| P36 adicionou modelos sem migration | Tabelas existiam em schema.prisma mas não no banco | Migration de reconciliação `002_p36_materialization` |
| Sem política oficial de migrations | Decisões ad-hoc sobre git, nomes, escopo | Política documentada na seção 8 |

## 3. Estrutura Final das Migrations

```
prisma/migrations/
├── 001_foundation_database_v1/    ← Baseline completa do schema
│   └── migration.sql              (53KB, ~1470 linhas)
├── 002_p36_materialization/       ← Reconciliação P36 para banco existente
│   └── migration.sql              (ALTER TABLE + CREATE TABLE para modelos P36)
└── migration_lock.toml            ← Provider: postgresql

prisma/migrations_archive/         ← Migrações antigas (período pré-fundação)
├── 20260719000001_add_fk_4_structures/
├── 20260719000002_add_explicit_indexes/
├── 20260720000001_fase0_emergencia/
├── 20260720000002_fase1_event_models/
└── README.md
```

## 4. Schema Coberto

### 4.1 Models (40)

| Grupo | Models |
|-------|--------|
| Base | empresas, usuarios, configuracoes, sessoes_ia |
| Atendimento | atendimentos, itens_atendimento |
| Financeiro | transacoes, categorias_financeiro, contas_bancarias |
| Clientes | clientes |
| CRM | leads, historico_atividades, interacoes_lead |
| Implantação | implantacoes, etapas_implantacao, progresso_etapas |
| Cognitivo | anotacoes, tags, sessoes_cognitivas, metricas_cognitivas |
| Decisões | decisoes, recomendacoes, acoes, decisoes_sinais |
| Hipóteses | hipoteses, evidencias, respostas_conversa |
| Onboarding | onboarding_decisoes, onboarding_respostas |
| Conhecimento | conhecimentos_validados |
| P36 | momentos_wow, fricoes, sinais_valor |
| P36 | auditoria_recomendacoes, plataforma_snapshots |
| Tarefas | tarefas |

### 4.2 Enums (8)

`TipoTransacao`, `StatusLead`, `StatusImplantacao`, `StatusTarefa`, `Prioridade`, `OrigemLead`, `OrigemHipotese`, `ImpactoHipotese`, `OrigemResposta`

### 4.3 Funcionalidades do Schema

- **Multi-tenancy**: `empresaId` em todas as tabelas de negócio
- **Soft delete**: `deletedAt` nullable + índices compostos
- **Auditoria**: `createdAt`/`updatedAt` automáticos
- **Timestamps**: controle completo de criação/atualização
- **Índices**: índices estratégicos por tenant, por data, e compostos

## 5. Modelos P36 Materializados

Os 5 modelos criados no P36 foram materializados no banco via `002_p36_materialization`:

| Model | Tabela | Finalidade |
|-------|--------|------------|
| MomentoWow | `momentos_wow` | Registro de momentos de valor percebido |
| Friccao | `fricoes` | Pontos de atrito na experiência |
| SinalValor | `sinais_valor` | Sinais quantificáveis de valor gerado |
| AuditoriaRecomendacao | `auditoria_recomendacoes` | Auditoria de recomendações do sistema |
| PlataformaSnapshot | `plataforma_snapshots` | Snapshots mensais da plataforma |

### Colunas adicionadas em hipoteses

- `contagemEvidencias` — contagem numérica de evidências
- `impacto` (ImpactoHipotese enum) — BAIXO/MEDIO/ALTO
- `origem` (OrigemHipotese enum) — origem da hipótese

## 6. Procedimento de Baseline

Para ambientes novos (produção, staging, novo desenvolvedor):

```bash
# Restaurar a partir do dump (recomendado para dados reais)
psql "$DIRECT_URL" < dump.sql

# OU: criar banco vazio com migrations
npx prisma migrate deploy
```

Para ambientes existentes que usavam as migrations antigas:

```bash
# 1. Arquivar migrations antigas (já feito)
# 2. Criar nova migration baseline
npx prisma migrate diff --from-empty --to-schema ./prisma/schema.prisma --script --output ./prisma/migrations/001_foundation_database_v1/migration.sql

# 3. Limpar tabela _prisma_migrations das entradas antigas
# 4. Resolver baseline como applied
npx prisma migrate resolve --applied 001_foundation_database_v1

# 5. Gerar e aplicar migration de reconciliação se houver drifts
npx prisma migrate diff --from-config-datasource --to-schema ./prisma/schema.prisma --script --output ./prisma/migrations/002_p36_materialization/migration.sql
npx prisma migrate deploy
```

## 7. Validação

| Etapa | Comando | Resultado |
|-------|---------|-----------|
| Schema validation | `prisma validate` | ✅ Aprovado |
| Migrations resolvidas | `prisma migrate resolve --applied` | ✅ 001 marcada como applied |
| Migrations aplicadas | `prisma migrate deploy` | ✅ 2/2 aplicadas |
| Status | `prisma migrate status` | ✅ Database schema is up to date |
| Build | `npm run build` | ✅ Compilado em 44s |
| TypeScript | `npx tsc --noEmit` | ✅ Zero erros |
| Páginas | Next.js build output | ✅ 45 páginas |

## 8. Nova Política de Migrations

A partir da Foundation Database V1:

1. **Nomenclatura**: `<número_sequencial>_<descrição_curta>_<opcional>`
   - `001_foundation_database_v1`
   - `002_p36_materialization`
   - `003_adicionar_campo_x`
2. **Cada migration**: uma única mudança atômica
3. **Nunca alterar migration já aplicada** em produção
4. **Git**: migrations versionadas no repositório
5. **Rollback**: sempre via nova migration (nunca editar histórico)
6. **Shadow database**: usar `prisma migrate dev` apenas em desenvolvimento
7. **Produção**: usar `prisma migrate deploy` — nunca `prisma migrate dev` ou `prisma db push`
8. **Baseline completo**: `001_foundation_database_v1` é a representação oficial do schema inteiro
9. **Reconciliação**: drifts entre schema e banco geram novas migrations incrementais
10. **Arquivo morto**: migrations antigas em `migrations_archive/` — não apagar

## 9. Impacto nos Programas Anteriores

| Programa | Impacto |
|----------|---------|
| P31–34B | Nenhum — estrutura do banco inalterada |
| P35 | Nenhum — alterações constitucionais não afetam banco |
| P36 | Materializado — modelos P36 agora existem no banco |
| P33 (Foundation Freeze V1) | Atualizado — seção de banco de dados agora referencia Foundation Database V1 |
| P34B (Foundation Candidate V2) | Atualizado — dívida técnica de migração quitada |

## 10. Riscos e Mitigações

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Perda da migration_lock.toml | Baixa | Versionada no git |
| Shadow database inconsistente | Baixa | `prisma validate` + `prisma migrate status` |
| Drift futuro não detectado | Média | CI/CD com `prisma migrate status --exit-code` |
| Alguém editar migration aplicada | Baixa | Política + code review |

---

**A fundação do banco de dados da Ponte Digital está consolidada. Toda nova migration parte deste marco.**
