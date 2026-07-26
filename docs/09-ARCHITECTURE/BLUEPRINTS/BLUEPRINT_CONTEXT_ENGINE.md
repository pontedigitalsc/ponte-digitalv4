# Blueprint — Cognitive Context Engine

> **Programa 13 — Blueprint de Implementação**
> Arquivo: `sistema/src/engine/cognitive-context-engine.ts`
> Dependências: `prisma-tenant-safe`, `evidence-engine`, `identity-engine`, `cognitive-memory-engine`, `clientes.sinais`, `tarefas.sinais`, `financeiro.sinais`, `cache`
> Criticidade: **Crítica**
> ADRs: ADR-016, ADR-017, ADR-021

---

## 1. Responsabilidade

Montar o contexto cognitivo atual da empresa — um snapshot imutável de onde a empresa está, o que mudou, qual a prioridade e quais evidências sustentam cada conclusão.

---

## 2. Papel dentro do Sistema Cognitivo

**Onde entra:** Primeira engine chamada no pipeline cognitivo completo (Orchestrator → Context). Chamada pelo Orchestrator para cada empresa a cada ciclo.

**Onde termina:** Produz `DecisaoContexto` — pacote fechado e imutável que é consumido por todas as engines superiores (Decision, Evolution, Health, Action, Experience).

---

## 3. Dependências

### Quem chama

| Quem | Quando |
|------|--------|
| `cognitive-orchestrator` | Pipeline principal |
| `cognitive-experience-engine` | Montagem de experiência (indireto) |

### Quem ela chama

| Engine | Função |
|--------|--------|
| `evidence-engine` | `consultarEvidencias()` |
| `identity-engine` | `obterIdentidade()` |
| `cognitive-memory-engine` | `consultarMemoria()` |
| `clientes.sinais` | `gerarSinaisClientes()` |
| `tarefas.sinais` | `gerarSinaisTarefas()` |
| `financeiro.sinais` | `gerarSinaisFinanceiro()` |
| `cache` | `remember()` com TTL = 60s (TTL.CONTEXTO) |

### Quem nunca pode chamar

- **Services** (Lei 1)
- **API Routes diretamente**

---

## 4. Contratos

### 4.1 Função Principal

```typescript
async function decidirContexto(empresaId: string): Promise<DecisaoContexto>;

interface DecisaoContexto {
  prioridade: CategoriaEvidencia;   // "FINANCEIRO" | "CLIENTES" | etc.
  motivo: string;                    // "Fluxo de caixa baixo" | "Clientes inadimplentes"
  confianca: number;                 // 0-1, ponderado por scores de categoria
  evidenciasChave: Array<{
    descricao: string;
    origem: string;
    data: Date;
    confianca: string;               // "ALTA" | "MEDIA" | "BAIXA"
  }>;
  acaoSugerida?: string;            // "Cortar custos" | "Negociar com cliente X"
  setoresEstaveis: string[];        // Categorias sem anomalia
  mudancasRecentes: string[];       // "Cliente X inadimplente" | "Tarefa Y atrasada"
  tendencia?: string;               // "melhorando" | "estavel" | "piorando"
  memoriaRecente?: Array<{          // Últimas memórias da empresa
    tipo: string;
    descricao: string;
  }>;
}
```

### 4.2 Funções Internas

```typescript
async function buscarSituacaoEmpresa(empresaId: string): Promise<{
  evidencias: Evidencia[];
  memoria: MemoriaCognitiva[];
  identidade: IdentidadeDigital | null;
  sinais: Sinal[];
}>;

type CategoriaEvidencia = 'FINANCEIRO' | 'CLIENTES' | 'OPERACAO' | 'GESTAO' | 'PESSOAS' | 'PRODUTO' | 'ESTRATEGIA';
```

### 4.3 Eventos

Publica `ContextoAtualizado` via Event Bus (se feature flag ativa).

### 4.4 Persistência

Nenhuma direta. Lê de `Evidencia`, `MemoriaCognitiva`, `IdentidadeDigital`, `HistoricoSinal`.

### 4.5 Cache

```typescript
Chave: `contexto:${empresaId}:decisao`
TTL: 60s (TTL.CONTEXTO)
Estratégia: cache-aside (remember)
```

---

## 5. Fluxo Interno

```
1. Verificar cache: `getCache().remember(contexto:${empresaId}:decisao, ...)`
2. Buscar situação da empresa (buscarSituacaoEmpresa):
   a. Evidências: evidence-engine → consultarEvidencias(empresaId)
   b. Memória: cognitive-memory-engine → consultarMemoria(empresaId)
   c. Identidade: identity-engine → obterIdentidade(empresaId)
   d. Sinais: gerarSinaisClientes + gerarSinaisTarefas + gerarSinaisFinanceiro
3. Filtrar evidências recentes (últimos 7 dias)
4. Calcular scores por categoria:
   Para cada categoria (FINANCEIRO, CLIENTES, ...):
   ├─ Soma pesos de confiança das evidências da categoria
   ├─ Adiciona peso de sinais urgentes da categoria
   ├─ Adiciona peso de memórias recentes da categoria
   └─ Score = total / max possível
5. Determinar prioridade: categoria com maior score
6. Extrair evidências chave (top 3 por confiança)
7. Identificar setores estáveis (score < threshold)
8. Identificar mudanças recentes (evidências dos últimos 7 dias)
9. Calcular tendência (comparar scores atuais vs período anterior)
10. Montar DecisaoContexto
11. Armazenar em cache (TTL 60s)
12. Retornar DecisaoContexto
```

---

## 6. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| **Nenhuma evidência** | Scores vazios → `prioridade` = primeira categoria, `confianca` = 0 |
| **Nenhuma identidade** | `identidade = null` — pipeline continua |
| **Cache expirado** | Recalcula do zero |
| **Sinais com erro** | Detectores rodam independentemente |
| **Empresa recém-criada** | Sem evidências, sem memória, sem sinais → contexto default |

---

## 7. Critérios de Aceite

1. `decidirContexto(empresaId)` retorna `DecisaoContexto` completo em < 500ms
2. Cache funciona: segunda chamada é 10x mais rápida que a primeira
3. Evidências recentes (7 dias) têm peso maior que antigas
4. Categoria com maior score vira `prioridade`
5. `confianca` é um número entre 0 e 1

---

## 8. Critérios de Teste

### Unitário

- `calcularScoresCategoria` com evidências vazias → scores vazios
- `determinarPrioridade` com scores diferentes → maior score
- `extrairEvidenciasChave` com 10 evidências → top 3

### Integração

- `decidirContexto` com dados reais → retorna contexto completo
- Cache: primeira chamada 500ms, segunda 50ms

---

## 9. Observabilidade

### Logs

| Evento | Nível |
|--------|-------|
| Contexto calculado | `info` (empresaId, prioridade, confianca) |
| Cache hit | `debug` |
| Cache miss | `debug` |
| Nenhuma evidência | `warn` |

### Métricas

- `context.calculo.duracao_ms` — histograma
- `context.cache.hit_ratio` — gauge
- `context.prioridade.distribuicao` — contador por categoria

---

## 10. Evolução Futura

### Pode crescer

- Fontes externas de contexto (mercado, concorrência)
- ML para ponderação de scores
- Contexto preditivo (não apenas reativo)

### Nunca deve mudar

- `DecisaoContexto` é pacote fechado e imutável (ADR-021)
- Cache TTL nunca deve ser maior que 60s (contexto precisa ser fresco)
- IA nunca recebe dados brutos — apenas `DecisaoContexto` (ADR-017)
