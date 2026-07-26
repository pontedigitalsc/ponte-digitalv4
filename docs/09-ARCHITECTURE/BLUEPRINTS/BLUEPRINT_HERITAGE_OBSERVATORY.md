# Blueprint — Heritage Facade + Observatory + Pipeline Monitor

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `cognitive-heritage-facade.ts`, `cognitive-observatory.ts`, `pipeline-monitor.ts`, `pipeline-comparator.ts`, `cognitive-pipeline-store.ts` (lib)
> Dependências: `prisma-tenant-safe`, `logger`, `cache`
> Criticidade: **Alta**

---

## 1. Responsabilidade

**Heritage Facade:** Fachada unificada para acesso ao patrimônio cognitivo (memória + conhecimento + síntese).

**Observatory:** Visão consolidada do estado cognitivo global — métricas de saúde do sistema.

**Pipeline Monitor:** Observabilidade da execução do pipeline cognitivo.

---

## 2. Contratos

```typescript
// Heritage Facade
async function obterConhecimentos(empresaId: string): Promise<ConhecimentoValidado[]>;
async function avaliarEnvelhecimentoPatrimonio(empresaId: string): Promise<AgingReport>;
async function avaliarEsquecimento(empresaId: string): Promise<ForgettingReport>;
async function gerarSinteses(empresaId: string): Promise<Sintese[]>;
async function obterEstadoPatrimonio(empresaId: string): Promise<EstadoPatrimonio>;
async function obterMetricas(empresaId: string): Promise<MetricasPatrimonio>;

// Observatory
async function obterResumoCognitivo(empresaId: string): Promise<ResumoCognitivo>;
async function obterEvolucaoDiaria(empresaId: string): Promise<EvolucaoDiaria[]>;
async function obterCategoriasMaisAprendidas(): Promise<Array<{ categoria: string; total: number }>>;
async function obterCategoriasEstagnadas(): Promise<Array<{ categoria: string; total: number }>>;
async function obterAlertasGovernanca(empresaId: string): Promise<string[]>;

// Pipeline Monitor (lib)
async function registrarInicioCiclo(empresaId: string, correlationId: string): Promise<void>;
async function registrarEtapaCiclo(empresaId: string, etapa: string, duracaoMs: number): Promise<void>;
async function registrarFinalizacaoCiclo(empresaId: string): Promise<void>;
async function registrarFalhaCiclo(empresaId: string, etapa: string, erro: string): Promise<void>;
```

---

## 3. Fluxo

### Heritage Facade

```
obterEstadoPatrimonio(empresaId):
  ├─ cognitive-memory-engine.consultarMemoria(empresaId)
  ├─ knowledge-governance.obterConhecimentosAprovados(empresaId)
  ├─ synthesis-engine.gerarSintese(empresaId)
  └─ Consolidar em EstadoPatrimonio
```

### Pipeline Monitor (chamado pelo Orchestrator)

```
1. registrarInicioCiclo(empresaId, correlationId) → cria registro
2. Para cada etapa:
   ├─ Início: registrarEtapa(etapa) se necessário
   └─ Fim: registrarEtapaCiclo(etapa, duracaoMs)
3. Se sucesso: registrarFinalizacaoCiclo
4. Se falha: registrarFalhaCiclo(etapa, erro)
```

---

## 4. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| Patrimônio vazio | Estado com arrays vazios |
| Muitos ciclos registrados | Monitor limpa registros > 30 dias |
| Falha no monitor | Não afeta o pipeline (registrado via try/catch) |

---

## 5. Critérios de Aceite

1. `obterEstadoPatrimonio` consolida memória + conhecimento + síntese
2. `obterResumoCognitivo` retorna dados sem lançar erro
3. Pipeline monitor registra início, etapas e fim de cada ciclo
4. Falha do monitor não quebra o pipeline

---

## 6-10. Observabilidade, Evolução

**Observabilidade:** `heritage.estado` (log info por empresa), `observatory.alertas` (gauge), `pipeline.ciclos.por_hora` (contador).

**Evolução:** Heritage Facade pode se tornar microsserviço independente em escala.
