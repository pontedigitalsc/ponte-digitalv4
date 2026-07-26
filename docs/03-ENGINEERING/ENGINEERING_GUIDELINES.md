# Engineering Guidelines — Ponte Digital V4 Founder

> Este documento contém regras técnicas, validações de input, constraints de banco e convenções de implementação. Complementa o `ARCHITECTURE_DDD.md` (que contém apenas invariantes de domínio genuínos).

**Origem:** Separação determinada pela ADR-033. Regras R04, R08-R16, R19 foram movidas de `ARCHITECTURE_DDD.md` §7.1 para este documento.

---

## 1. Regras Técnicas Obrigatórias

### 1.1 IAM

| Regra | Descrição |
|---|---|
| R04 | Cada empresa tem exatamente 1 ADMIN. Ao criar empresa, o primeiro usuário é ADMIN. Ao remover ADMIN, deve existir outro ADMIN antes. |

### 1.2 CognitiveIdentity

| Regra | Descrição |
|---|---|
| R08 | Versão da identidade é monotônica (nunca decrementa). Implementar via `versao + 1` no update. |
| R09 | `dados` e `interpretacoes` são atualizados atomicamente (mesma transação). Nunca atualizar um sem o outro. |

### 1.3 Knowledge

| Regra | Descrição |
|---|---|
| R10 | Evidência é imutável após criação. Nenhum UPDATE em `Evidencia.descricao` ou `Evidencia.categoria`. Apenas INSERT. |
| R11 | Estado da hipótese não regride (CONFIRMADA não volta para NOVA). Validar no service antes de persistir. |
| R12 | `scoreConfianca` é sempre 0-100. Validar no service e no schema (constraint CHECK ou validação em camada de aplicação). |
| R13 | Status do conhecimento é derivado do `scoreConfianca`, não armazenado. Calcular em tempo de consulta: ≥60 CONFIRMADO, <20 DESCARTADO, 20-59 EM_OBSERVACAO. |

### 1.4 Learning

| Regra | Descrição |
|---|---|
| R14 | `categoria` do aprendizado deve ser exatamente uma das 11 definidas em `CategoriaAprendizado`. Validar contra enum. |
| R15 | `descricao` do aprendizado mínimo 2 caracteres. Validar no service antes de persistir. |

### 1.5 Signal

| Regra | Descrição |
|---|---|
| R16 | Sinal é imutável após criação (mesma regra da evidência). O campo `lido` é a única exceção — permite soft toggle. |

### 1.6 Activation

| Regra | Descrição |
|---|---|
| R19 | Nível de ativação é calculado, não armazenado. Derivar de `EventoAtivacao` em tempo de consulta. |

---

## 2. Validações de Input (camada de aplicação)

Toda API Route DEVE validar input com Zod antes de chamar o Application Service.

| Campo | Tipo | Validação |
|---|---|---|
| `email` | string | Formato email válido |
| `nome` | string | 2-255 caracteres |
| `descricao` | string | 2-2000 caracteres (salvo exceção documentada) |
| `valor` (transação) | Decimal | > 0 |
| `empresaId` | string | UUID ou CUID válido |

---

## 3. Prisma Schema — Convenções

```
TODO model:
  id: String @id @default(cuid())
  empresaId: String              (se multi-tenant)
  criadoEm: DateTime @default(now())
  atualizadoEm: DateTime @updatedAt
  deletedAt: DateTime?           (soft delete)

TODO enum:
  @@map("nome_em_portugues")

TODO relação:
  onDelete: Cascade
  Índice composto: [empresaId, campoDeBusca]
```

---

## 4. Naming Conventions

| Contexto | Padrão | Exemplo |
|---|---|---|
| Arquivos | kebab-case | `cognitive-orchestrator.ts` |
| Classes/Tipos | PascalCase | `CognitiveOrchestrator` |
| Funções/Variáveis | camelCase | `processarConversa()` |
| Constantes | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Models Prisma | PascalCase em português | `IdentidadeDigital` |
| Enums Prisma | PascalCase em português | `StatusAcao` |
| Tabelas (SQL) | snake_case (via @@map) | `identidade_digital` |
| Rotas API | /api/kebab-case | `/api/aprendizados` |
| Páginas | /kebab-case | `/dashboard/aprendizados` |
| Componentes React | PascalCase.tsx | `KnowledgeCard.tsx` |
| Hooks React | useCamelCase.ts | `useAuth.ts` |

---

> Este documento é mantido em sincronia com o `ARCHITECTURE_DDD.md`. Consulte aquele documento para invariantes de domínio, arquitetura DDD, e especificação de bounded contexts.
