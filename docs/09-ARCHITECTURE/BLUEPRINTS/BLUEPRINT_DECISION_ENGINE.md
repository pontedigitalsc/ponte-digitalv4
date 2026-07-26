# Blueprint — Decision Engine

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `decision-engine.ts`, `priority-engine.ts`, `trust-engine.ts`, `relevance-engine.ts`
> Dependências: `prisma-tenant-safe`, `cognitive-context-engine`, `evidence-engine`, `cache`
> Criticidade: **Crítica**
> ADRs: ADR-017, ADR-020, ADR-021, ADR-032

---

## 1. Responsabilidade

Registrar, ponderar e recomendar a decisão mais importante para o empresário no momento, com base em contexto, conhecimento, evidências, confiança das fontes e relevância temporal.

---

## 2. Papel dentro do Sistema Cognitivo

**Onde entra:** Recebe `ContextoDecisao` do Context Engine e `ConhecimentoValidado[]` do Knowledge Governance. É chamada pelo Orchestrator na posição 5 do pipeline.

**Onde termina:** Produz `Decisao` — recomendação única com prioridade numérica, título, descrição, motivo e score de confiança.

---

## 3. Dependências

### Quem chama

| Quem | Função | Quando |
|------|--------|--------|
| `cognitive-orchestrator` | `melhorDecisao()` | Pipeline principal |
| `action-intelligence-engine` | `gerarDecisoes()` (indireto) | Geração de ações |
| `cognitive-experience-engine` | `obterCentroDecisaoExperience()` | Página centro de decisão |

### Quem ela chama

| Engine | Função |
|--------|--------|
| `priority-engine` | Cálculo de prioridade (`P = u × i × conf × conv × alinh × momento`) |
| `trust-engine` | `obterConfianca()`, `registrarAcerto()`, `registrarErro()`, `aplicarDecaimento()` |
| `relevance-engine` | `calcularRelevancia()` — peso temporal + confiança + contexto |
| `prisma-tenant-safe` | Persistência de decisões |

### Quem nunca pode chamar

- **Services**
- **API Routes diretamente**

---

## 4. Contratos

### 4.1 Funções Públicas

```typescript
// Decision Engine
async function gerarDecisoes(empresaId: string, contexto: DecisaoContexto): Promise<Decisao[]>;
async function melhorDecisao(empresaId: string, contexto: DecisaoContexto): Promise<Decisao | null>;
function classificarDecisoesPorPrioridade(decisoes: Decisao[]): Decisao[];
async function enriquecerDecisoesComTrust(decisoes: Decisao[], empresaId: string): Promise<Decisao[]>;
function filtrarDecisoesPorRelevancia(decisoes: Decisao[], limite?: number): Decisao[];

// Priority Engine
function calcularPrioridade(params: {
  urgencia: number;       // 0-1
  impacto: number;        // 0-1
  confianca: number;      // 0-1
  conviccao: number;      // 0-1 (ADR-032)
  alinhamento: number;    // 0-1
  momento: number;        // 0-1
}): number;               // 0-1

// Trust Engine
async function obterConfianca(empresaId: string, nomeFonte: string): Promise<number>;
async function registrarAcerto(empresaId: string, nomeFonte: string): Promise<void>;
async function registrarErro(empresaId: string, nomeFonte: string): Promise<void>;
async function aplicarDecaimento(empresaId: string): Promise<void>;
async function obterTodosTrustScores(empresaId: string): Promise<TrustScore[]>;

// Relevance Engine
function calcularRelevancia(
  data: Date,
  confianca: number,
  pesoContexto: number,
  parametros?: { decaimentoHoras?: number; pesoMinimo?: number }
): number;
```

### 4.2 Tipos

```typescript
interface Decisao {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: number;      // 0-1
  categoria: string;       // CategoriaEvidencia
  confianca: number;       // 0-1
  motivacao: string;
  evidencias: Evidencia[];
  acoesSugeridas: string[];
  trustScore: number;       // enriquecido por trust-engine
}

interface TrustScore {
  nomeFonte: string;
  scoreAtual: number;       // 0-1
  totalAcertos: number;
  totalErros: number;
  ultimoAcerto: Date | null;
  ultimoErro: Date | null;
}
```

### 4.3 Eventos

| Evento | Quando |
|--------|--------|
| `DecisaoTomada` | Nova decisão gerada |
| `ConfiancaAtualizada` | Trust score de fonte mudou significativamente |

### 4.4 Persistência

Decisões são armazenadas via `AcaoCognitiva` (modelo Prisma) — não há modelo `Decisao` separado.

```prisma
model AcaoCognitiva {
  id            String   @id
  empresaId     String
  decisaoId     String?      // referência
  titulo        String
  descricao     String
  categoria     String
  status        StatusAcao
  origem        OrigemAcao   // DECISION_ENGINE
  impactoEsperado Json?
  resultado      Json?
  // ...
}
```

### 4.5 Cache

`trust-engine` usa cache com TTL de 300s (TTL.AGREGADO) para scores de confiança.

---

## 5. Fluxo Interno

### 5.1 Geração de Decisão

```
1. Receber empresaId + DecisaoContexto do Orchestrator
2. Consultar conhecimentos validados (via knowledge-governance-engine)
3. Consultar trust scores (trust-engine → obterTodosTrustScores)
4. Para cada combinação contexto + conhecimento:
   a. Calcular relevância (relevance-engine)
   b. Calcular prioridade (priority-engine)
   c. Enriquecer com trust score (trust-engine)
5. Ordenar decisões por prioridade (classificarDecisoesPorPrioridade)
6. Filtrar top N (padrão: 3) (filtrarDecisoesPorRelevancia)
7. Retornar Decisao[] para o Orchestrator
```

### 5.2 Fórmula de Prioridade (ADR-020 + ADR-032)

```
P = urgencia × impacto × confianca × conviccao × alinhamento × momento
  (0-1)      (0-1)     (0-1)       (0-1)       (0-1)       (0-1)
```

- `urgencia`: quão urgente é agir (0 = não urgente, 1 = crítico)
- `impacto`: impacto potencial na empresa (0 = nenhum, 1 = transformador)
- `confianca`: confiança nas evidências que sustentam (0 = nenhuma, 1 = certeza)
- `conviccao`: quantas vezes o padrão se repetiu (ADR-032)
- `alinhamento`: alinhamento com objetivos da empresa
- `momento`: janela de oportunidade (0 = qualquer hora, 1 = agora ou nunca)

---

## 6. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| **Nenhum conhecimento validado** | Decisão baseada apenas em contexto e sinais |
| **Trust score zero** | Decisão com confiança baixa, mas ainda gerada |
| **Todas as decisões com prioridade < 0.1** | `melhorDecisao` retorna `null` (silêncio) |
| **empresaId inválido** | Prisma retorna vazio → array vazio |

---

## 7. Critérios de Aceite

1. `melhorDecisao(empresaId, contexto)` retorna decisão com prioridade > 0
2. `calcularPrioridade` com todos os fatores = 1 → retorna 1.0
3. `calcularPrioridade` com urgencia = 0 → retorna 0.0
4. Trust scores persistem e decaem com o tempo
5. `classificarDecisoesPorPrioridade` ordena do maior para o menor

---

## 8. Critérios de Teste

### Unitário

- `calcularPrioridade({ urgencia: 1, impacto: 1, confianca: 1, conviccao: 1, alinhamento: 1, momento: 1 })` → 1.0
- `calcularPrioridade({ urgencia: 0, ... })` → 0.0
- `classificarDecisoesPorPrioridade` com array desordenado → ordem correta
- `filtrarDecisoesPorRelevancia` com limite = 2 → retorna 2 itens
- `calcularRelevancia` com data antiga → peso baixo

### Integração

- `melhorDecisao` com dados reais → decisão coerente com contexto
- `registrarAcerto` → trust score aumenta
- `registrarErro` → trust score diminui
- `aplicarDecaimento` → scores reduzem com o tempo

---

## 9. Observabilidade

### Logs

| Evento | Nível |
|--------|-------|
| Decisão gerada | `info` (título, prioridade, confianca) |
| Nenhuma decisão possível | `warn` |
| Trust score atualizado | `debug` |

### Métricas

- `decision.decisoes.geradas` — contador
- `decision.prioridade.media` — gauge
- `decision.trust.score_medio` — gauge
- `decision.relevance.tempo_medio` — histograma

---

## 10. Evolução Futura

### Pode crescer

- Modelo de decisão com múltiplas alternativas (não apenas top 1)
- Feedback loop: decisões aceitas/rejeitadas ajustam pesos
- Decisão automática (executar sem confirmação do empresário)

### Nunca deve mudar

- `Decisao.prioridade` = produto dos 6 fatores (ADR-020 + ADR-032)
- `melhorDecisao` retorna `null` se nenhuma decisão > threshold (silêncio é válido)
- Trust scores decaem com o tempo (ADR-026)
- IA nunca decide — apenas traduz a decisão do Motor (ADR-017)
