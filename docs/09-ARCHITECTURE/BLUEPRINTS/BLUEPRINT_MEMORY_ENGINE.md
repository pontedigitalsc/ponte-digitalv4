# Blueprint — Memory Engine + Forgetting + Knowledge Aging

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `cognitive-memory-engine.ts`, `forgetting-engine.ts`, `knowledge-aging-engine.ts`
> Dependências: `prisma-tenant-safe`, `logger`, `cache`
> Criticidade: **Alta**
> ADRs: ADR-019 (hierarquia memória), ADR-026 (esquecimento programado)

---

## 1. Responsabilidade

Gerenciar a memória cognitiva da empresa em 4 níveis (Working, Short, Long, Archived), incluindo armazenamento, recuperação, consolidação, envelhecimento e esquecimento programado.

---

## 2. Papel

**Onde entra:** Chamada pelo Context Engine para memórias recentes. Chamada pelo Orchestrator para registrar memórias. Ciclo noturno executa forgetting e aging.

**Onde termina:** Memórias armazenadas em `MemoriaCognitiva`. Ciclo de forgetting libera espaço arquivando ou removendo registros antigos.

---

## 3. Dependências

| Quem chama | Função |
|------------|--------|
| `cognitive-context-engine` | `consultarMemoria(empresaId)` |
| `cognitive-orchestrator` | `registrarNaMemoria(empresaId, tipo, descricao)` |
| `cognitive-heritage-facade` | `obterEstadoPatrimonio()` (usa memórias) |
| `ritmo-engine` | Ciclo noturno → `aplicarDecaimento()`, `avaliarEnvelhecimento()` |

| Chamado | Função |
|---------|--------|
| `prisma-tenant-safe` | CRUD de MemoriaCognitiva |
| `forgetting-engine` | `avaliar()`, `getForgettingStats()` |
| `knowledge-aging-engine` | `avaliarEnvelhecimento()` |

---

## 4. Contratos

```typescript
// Memory Engine
async function consultarMemoria(empresaId: string, filtro?: {
  tipo?: string; limite?: number; apenasRecentes?: boolean;
}): Promise<MemoriaCognitiva[]>;

async function registrarNaMemoria(
  empresaId: string,
  tipo: string,        // "observacao" | "decisao" | "aprendizado"
  descricao: string,
  metadados?: Record<string, unknown>
): Promise<MemoriaCognitiva>;

async function analisarEvolucao(empresaId: string): Promise<EvolucaoMemoria>;

// Forgetting Engine
async function avaliar(empresaId: string): Promise<EstadoConhecimento[]>;
async function getForgettingStats(): Promise<{ total: number; arquivados: number; removidos: number }>;

// Knowledge Aging
async function avaliarEnvelhecimento(empresaId: string): Promise<AgingReport>;
```

### Persistência

```prisma
model MemoriaCognitiva {
  id            String   @id
  empresaId     String
  tipo          String   // working | short | long | archived
  descricao     String
  categoria     String
  versao        Int
  metadados     Json?
  criadoEm      DateTime
  deletedAt     DateTime?
}
```

---

## 5. Fluxo

```
1. Registrar memória:
   - Criar MemoriaCognitiva com tipo = "short" (padrão)
   - Se working está cheio (5+ itens sem acesso recente), condensar working → short
   - Se short > 50 itens, mover mais antigos para long

2. Consultar memória:
   - Buscar working + short + long (excluindo archived)
   - Ordenar por criadoEm DESC
   - Limitar a 20 itens (padrão)

3. Ciclo noturno (forgetting):
   - Avaliar memórias archived com > 90 dias sem acesso
   - Se confianca < threshold: marcar deletedAt (soft delete)
   - Consolidar memórias long similares em uma única
```

---

## 6. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| 1000+ memórias para uma empresa | Apenas working + short + recent long são retornadas |
| Memória recém-criada com alta relevância | Promovida para working |
| Empresa sem memórias | Array vazio |

---

## 7. Critérios de Aceite

1. `registrarNaMemoria` persiste e retorna a memória
2. `consultarMemoria` retorna working + short + long (nunca archived)
3. `avaliar` do forgetting identifica memórias candidatas a arquivamento
4. Ciclo noturno executa forgetting sem quebrar

---

## 8-10. Testes, Observabilidade, Evolução

**Testes:** CRUD de memória, forgetting não remove memórias recentes, aging calcula corretamente.

**Observabilidade:** `memory.registros` (gauge), `memory.forgetting.removidos` (contador).

**Evolução:** 4 níveis de memória são fixos (ADR-019). Pode crescer: consolidação inteligente, memória coletiva.
