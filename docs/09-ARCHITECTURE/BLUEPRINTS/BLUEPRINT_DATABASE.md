# Blueprint — Banco de Dados

> **Programa 13 — Blueprint de Implementação**
> Arquivo: `sistema/prisma/schema.prisma` (1142 linhas, 29 models, 21 enums)
> Dependências: PostgreSQL (Supabase), Prisma ORM v7
> Criticidade: **Crítica**

---

## 1. Models por Domínio

### 1.1 Tenant (Raiz)

| Model | Chave | Relacionamentos |
|-------|-------|-----------------|
| **Empresa** | `id` (UUID) | Mãe de todos os models com `empresaId` |
| **Usuario** | `id`, `supabaseId` (unique) | `empresaId → Empresa` |

### 1.2 CRM

| Model | Chave | Relacionamentos |
|-------|-------|-----------------|
| **Lead** | `id` | `empresaId`, `responsavelId? → Usuario`, `cliente? → Cliente` |
| **Cliente** | `id` | `empresaId`, `leadId? → Lead` |
| **Contato** | `id` | `empresaId`, `clienteId → Cliente` |

### 1.3 Operacional

| Model | Chave | Relacionamentos |
|-------|-------|-----------------|
| **Tarefa** | `id` | `empresaId`, `criadorId → Usuario`, `responsavelId?`, `clienteId?`, `leadId?` |
| **Implantacao** | `id` | `empresaId`, `clienteId → Cliente` |
| **EtapaImplantacao** | `id` | `empresaId`, `implantacaoId → Implantacao` |
| **Transacao** | `id` | `empresaId`, `clienteId? → Cliente` |
| **Historico** | `id` | `empresaId`, `usuarioId?`, `clienteId?`, `leadId?`, `implantacaoId?` |

### 1.4 Configuração

| Model | Chave | Relacionamentos |
|-------|-------|-----------------|
| **ConfiguracaoEmpresa** | `id` | `empresaId` (unique) |
| **Anotacao** | `id` | `empresaId`, `criadoPorId? → Usuario` |
| **Tag** | `id` | `empresaId`, `nome` (unique composto) |

### 1.5 Cognitivo

| Model | Chave | Relacionamentos |
|-------|-------|-----------------|
| **Evidencia** | `id` | `empresaId` |
| **Hipotese** | `id` | `empresaId` |
| **MemoriaCognitiva** | `id` | `empresaId` |
| **AcaoCognitiva** | `id` | `empresaId` |
| **ConhecimentoValidado** | `id` | `empresaId` |
| **FeedbackAcao** | `id` | `empresaId`, `acaoId → AcaoCognitiva` |
| **Outcome** | `id` | `empresaId` |
| **EventoAtivacao** | `id` | `empresaId`, `tipo` (unique composto) |
| **HistoricoSinal** | `id` | `empresaId` |
| **DecisaoSinal** | `id` | `empresaId`, `decisaoId → AcaoCognitiva`, `sinalId → HistoricoSinal` |
| **ConfiancaFonte** | `id` | `empresaId`, `nomeFonte` (unique composto) |
| **CicloConfiguracao** | `id` | `empresaId`, `tipo` (unique composto) |

### 1.6 Conversa

| Model | Chave | Relacionamentos |
|-------|-------|-----------------|
| **Conversa** | `id` | `token` (unique), `empresaId?` |
| **ConversaHistorico** | `id` | `empresaId`, `identidadeId? → IdentidadeDigital` |
| **IdentidadeDigital** | `empresaId` (PK) | `empresaId` |

### 1.7 Event Bus

| Model | Chave | Anomalia |
|-------|-------|----------|
| **Event** | `id` | Usa `tenantId` em vez de `empresaId` |
| **EventSubscription** | `id` | `empresaId?` (opcional — global) |
| **DeadLetter** | `id` | Usa `tenantId` em vez de `empresaId` |

---

## 2. Regras Transversais

| Regra | Aplicação |
|-------|-----------|
| **Soft delete** | `deletedAt: DateTime?` em TODOS os 29 models |
| **Audit trail** | 24 de 29 models têm `criadaEm` + `atualizadaEm` (exceções: 7 têm só `criadaEm`, 1 só `atualizadaEm`) |
| **Tenant isolation** | 30 de 33 models com `empresaId`. **Anomalia:** Event e DeadLetter usam `tenantId` |
| **Índices compostos** | 141 índices no total |

---

## 3. Enums (21)

| Enum | Valores | Usado por |
|------|---------|-----------|
| `Plano` | BASICO, PROFISSIONAL, ENTERPRISE | Empresa |
| `Role` | ADMIN, GESTOR, MEMBRO | Usuario |
| `OrigemLead` | INDICACAO, SITE, INSTAGRAM, ... | Lead |
| `EstagioLead` | CONTATO, DIAGNOSTICO, PROPOSTA, ... | Lead |
| `StatusCliente` | ATIVO, INATIVO, INADIMPLENTE, CANCELADO, TRIAL | Cliente |
| `StatusTarefa` | PENDENTE, EM_ANDAMENTO, CONCLUIDA, CANCELADA | Tarefa |
| `Prioridade` | URGENTE, ALTA, MEDIA, BAIXA | Tarefa |
| `TipoTransacao` | RECEITA, DESPESA | Transacao |
| `StatusTransacao` | PENDENTE, PAGO, VENCIDO, CANCELADO | Transacao |
| `EstadoHipotese` | NOVA, EM_OBSERVACAO, FORTALECIDA, CONFIRMADA, ENFRAQUECIDA, DESCARTADA | Hipotese |
| `CategoriaEvidencia` | FINANCEIRO, CLIENTES, OPERACAO, GESTAO, PESSOAS, PRODUTO, ESTRATEGIA | Evidencia |
| `OrigemEvidencia` | PRIMEIRA_CONVERSA, CONVERSA_MENSAL, MODULO_CLIENTES, ... | Evidencia |
| `ConfiancaEvidencia` | ALTA, MEDIA, BAIXA | Evidencia |
| `FrequenciaCiclo` | DIARIA, SEMANAL, MENSAL | CicloConfiguracao |
| `EventStatus` | PENDENTE, PROCESSADO, FALHA | Event |

---

## 4. Anomalias Conhecidas

| Anomalia | Impacto | Correção |
|----------|---------|----------|
| `Event.tenantId` e `DeadLetter.tenantId` | Inconsistente com o padrão `empresaId` | Renomear para `empresaId` |
| `Conversa.empresaId?` opcional | Conversa pré-cadastro sem tenant | Aceitável (conversa anônima) |
| `EventSubscription.empresaId?` opcional | Subscription global sem tenant | Aceitável por design |
| `ConfiguracaoEmpresa` sem `criadaEm` | Audit trail incompleto | Baixo impacto |

---

## 5. Versionamento

Prisma cuida do versionamento via `prisma/migrations/`. Regras:

1. Nunca remover coluna sem verificar dependências em services e engines
2. Toda migration nova deve ser testada com `prisma migrate dev`
3. Soft delete (`deletedAt`) prefere `update` a `delete` — usar `findMany({ where: { deletedAt: null } })`
4. Toda query deve incluir `empresaId` no `where` (ADR-008)
