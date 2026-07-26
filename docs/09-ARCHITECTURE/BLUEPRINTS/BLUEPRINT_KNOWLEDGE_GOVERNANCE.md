# Blueprint — Knowledge Governance + Synthesis + Evidence

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `knowledge-governance-engine.ts`, `synthesis-engine.ts`, `evidence-engine.ts`, `confidence-drift-engine.ts`
> Dependências: `prisma-tenant-safe`, `cognitive-memory-engine`
> Criticidade: **Alta**
> ADRs: ADR-018, ADR-024, ADR-025, ADR-028, ADR-031, ADR-034

---

## 1. Responsabilidade

**Knowledge Governance:** Ciclo de vida do conhecimento — evidências → hipóteses → conhecimentos validados → curadoria.

**Synthesis:** Agrupar conhecimentos por categoria e gerar sínteses de alto nível.

**Evidence:** Coletar, classificar e ponderar evidências que sustentam hipóteses.

---

## 2. Papel

**Onde entra:** Chamada pelo Orchestrator após decisões. Chamada pelo pipeline de feedback (feedback fortalece/enfraquece hipóteses).

**Onde termina:** Conhecimentos validados alimentam o Decision Engine. Evidências alimentam o Context Engine.

---

## 3. Contratos

### Knowledge Governance

```typescript
async function validarHipoteses(empresaId: string): Promise<void>;
async function promoverConhecimento(empresaId: string, hipoteseId: string): Promise<void>;
async function enfraquecerConhecimento(empresaId: string, conhecimentoId: string): Promise<void>;
async function calcularConfiancaConhecimento(empresaId: string): Promise<ConfiancaConhecimento>;
async function auditarConhecimento(empresaId: string): Promise<AuditoriaConhecimento>;
async function obterConhecimentosAprovados(empresaId: string): Promise<ConhecimentoValidado[]>;
```

### Evidence Engine

```typescript
async function registrarEvidencia(params: {
  empresaId: string; categoria: CategoriaEvidencia; descricao: string;
  confianca: ConfiancaEvidencia; origem: OrigemEvidencia;
}): Promise<Evidencia>;
async function consultarEvidencias(empresaId: string, filtro?: {
  categoria?: CategoriaEvidencia; origem?: OrigemEvidencia;
}): Promise<Evidencia[]>;
function contagemPorCategoria(evidencias: Evidencia[]): Record<string, number>;
```

### Synthesis Engine

```typescript
async function identificarGrupos(empresaId: string): Promise<Array<{ tema: string; count: number }>>;
async function gerarSintese(empresaId: string, grupo: string): Promise<string>;
async function executarSintese(empresaId: string): Promise<void>;
async function getSynthesisStats(): Promise<{ total: number; porCategoria: Record<string, number> }>;
```

### Persistência

```prisma
model Evidencia {
  id            String   @id
  empresaId     String
  categoria     CategoriaEvidencia
  origem        OrigemEvidencia
  descricao     String
  confianca     ConfiancaEvidencia
  dados         Json?
  criadaEm      DateTime
  deletedAt     DateTime?
}

model Hipotese {
  id            String   @id
  empresaId     String
  descricao     String
  categoria     String
  estado        EstadoHipotese    // NOVA | EM_OBSERVACAO | FORTALECIDA | CONFIRMADA | ENFRAQUECIDA | DESCARTADA
  confianca     Float
  tipoCausalidade String?          // ADR-034
  evidenciaOrigem String?
}

model ConhecimentoValidado {
  id                    String   @id
  empresaId             String
  descricao             String
  categoria             String
  scoreConfianca        Float
  quantidadeEvidencias  Int
  quantidadeConfirmacoes Int
  quantidadeRefutacoes  Int
  ultimaValidacao       DateTime?
  origem                String
}
```

---

## 4. Fluxo de Vida do Conhecimento

```
Observação (Sinal/Evidência)
       │
       ▼
   Hipótese (NOVA) ──→ EM_OBSERVACAO ──→ FORTALECIDA ──→ CONFIRMADA → ConhecimentoValidado
       │                     │                │
       ▼                     ▼                ▼
   DESCARTADA          ENFRAQUECIDA      ENFRAQUECIDA
       │                     │                │
       ▼                     ▼                ▼
   (soft delete)       (reavaliar)      (reavaliar)
```

### Regras de Transição (ADR-025)

| Transição | Gatilho |
|-----------|---------|
| NOVA → EM_OBSERVACAO | 1+ evidência a favor |
| EM_OBSERVACAO → FORTALECIDA | 3+ evidências a favor OU feedback AJUDOU |
| FORTALECIDA → CONFIRMADA | 5+ evidências a favor OU 3+ feedbacks AJUDOU |
| CONFIRMADA → ConhecimentoValidado | Curadoria manual OU score > 0.8 |
| Qualquer → ENFRAQUECIDA | 1+ evidência contra OU feedback NAO_AJUDOU |
| ENFRAQUECIDA → DESCARTADA | 3+ evidências contra OU sem revalidação em 90 dias |

---

## 5. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| Evidências contraditórias | Hipótese marcada como "conflito" — aguarda mais evidências |
| Feedback misto (AJUDOU + NAO_AJUDOU) | Peso: feedback explícito do empresário vale mais (ADR-025) |
| Conhecimento sem validação recente | Enfraquecido automaticamente (envelhecimento) |

---

## 6. Critérios de Aceite

1. Evidência registrada → hipótese criada/atualizada
2. Feedback AJUDOU → hipótese fortalecida
3. Feedback NAO_AJUDOU → hipótese enfraquecida
4. Conhecimento com score > 0.8 → promovido a validado
5. `auditarConhecimento` retorna relatório completo

---

## 7-10. Testes, Observabilidade, Evolução

**Testes:** Transições de estado, feedback fortalece hipótese, curadoria promove conhecimento.

**Observabilidade:** `knowledge.hipoteses.por_estado` (gauge), `knowledge.evidencias.registradas` (contador), `knowledge.conhecimentos_validados` (gauge).

**Evolução:** Pipeline único de Observação → Conhecimento (ADR-024). Correlação vs causalidade (ADR-034).
