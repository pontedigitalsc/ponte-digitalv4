# C1–C3: Relatórios de Impacto

## C1 — Órfãos (exportados do barrel sem consumidor externo)

### Funções órfãs (sem nenhum consumidor no `src/`)

| Export | Origem | Notas |
|--------|--------|-------|
| `criarHipotese` | cognitive-memory-engine | Nunca importada |
| `ultimasMudancas` | cognitive-memory-engine | Nunca importada |
| `registrarExecucaoDecisao` | decision-engine | Nunca importada |
| `atualizarStatusAcao` | action-intelligence-engine | Nunca importada |
| `registrarResultadoAcao` | action-intelligence-engine | Nunca importada |
| `analisarImpacto` | action-intelligence-engine | Nunca importada |
| `listarHistoricoAcoes` | action-intelligence-engine | Só usada internamente por `analisarImpacto` |
| `analisarResultadoAcao` | feedback-intelligence-engine | Nunca importada |
| `acoesSemFeedback` | feedback-intelligence-engine | Nunca importada |
| `analisarAprendizados` | feedback-intelligence-engine | Nunca importada |
| `rotuloNivel`, `descricaoNivel`, `corNivel` | founder-activation-engine | Nunca importadas |
| `listarOutcomes`, `atualizarOutcome` | outcome-intelligence-engine | Nunca importadas |
| `descartarConhecimento` | knowledge-governance-engine | Nunca importada |
| `executarRotinaDiaria/Semanal/Mensal` | cognitive-orchestrator | Nunca importadas |
| `aprendizadosRecentes`, `obterPerguntaAleatoria` | aprendizado-service | Nunca importadas |
| `calcularAgendaRotinas` | cognitive-routine-engine | Nunca importada |
| `arquivar`, `reativar`, `marcarEnfraquecimento`, `adormecer`, `resetForgettingStats` | forgetting-engine | Nunca importadas |
| `resetSynthesisStats`, `validarSintese` | synthesis-engine | Nunca importadas |
| `registrarMemoria`, `resetMetricas` | cognitive-heritage-facade | Nunca importadas |
| `EventPublisherError` | event-publisher | Nunca importado |
| `EmpresaCriadaHandler` e outros handlers | event-subscriber | Nunca importados |
| `DeadLetterProcessor` | dead-letter-queue | Nunca importado |
| `RetryPolicy`, `RetryExecutor` | retry-policy | Nunca importados |
| `EventMonitor` | event-monitor | Nunca importado |
| `obterCiclo` | ritmo-engine | Nunca importado |
| `registrarHeartbeat` | ritmo-engine | Nunca importado |
| `verificarHeartbeats` | ritmo-engine | Nunca importado |
| `obterStatusCiclos` | ritmo-engine | Só alias de `obterCiclos` |
| `filtrarSinais`, `distribuirPorDominio`, `ponderarSinais`, `consultarHistoricoSinais`, `expandirComEvidencias` | signal-engine | Nunca importados |
| `validarSinaisCruzado`, `validarDecisoesComOutcomes`, `validarConhecimentoComMemoria` | validation-engine | Nunca importados |
| `calcularPrioridadeGeral` | priority-engine | Nunca importado |
| `obterTrustScore`, `registrarAcerto`, `registrarErro`, `recalcularDecaimento` | trust-engine | Só usados internamente |
| `filtrarPorRelevancia`, `agruparPorRelevancia` | relevance-engine | Nunca importados |

### Recomendação
Remover exports órfãos do barrel `index.ts`. Manter as funções nos arquivos-fonte (podem ser úteis internamente). Se nenhum consumidor surgir em 2 sprints, considerar remover o código.

---

## C2 — `/api/patrimonio` consumidores

### Nenhum consumidor frontend
Nenhuma página ou componente chama `/api/patrimonio` via fetch. Zero consumidores externos.

### Duplicado por `/api/cognitive-heritage`
O endpoint de admin `/api/cognitive-heritage` chama as mesmas 6 funções do `cognitive-heritage-facade` com os mesmos parâmetros.

### Recomendação
Remover `/api/patrimonio/route.ts` e manter apenas `/api/cognitive-heritage` para admin. As funções do facade continuam acessíveis via server components para páginas que precisarem.

---

## C3 — `CicloConfiguracao` consumidores

### Referências diretas no código
- `src/engine/ritmo-engine.ts` — importa o type `CicloConfiguracao` do Prisma e usa em `calcularStatusCiclo`
- `src/app/api/cognitivo/config/route.ts` — acessa via `obterCiclos`/`atualizarConfiguracaoCiclo` (indireto)

### Prisma schema
Modelo definido em `prisma/schema.prisma` com campos: id, empresaId, tipo, frequencia, ativo, ultimaExecucao, proximaExecucao, heartbeatEm, heartbeatOk, config, deletedAt.

### Consumo real
O modelo é operado exclusivamente pelo `ritmo-engine.ts`. Nenhum outro engine ou página acessa `CicloConfiguracao` diretamente.

### Recomendação
Manter como está. O acoplamento é baixo e esperado — o `ritmo-engine` é o dono do modelo. Se no futuro houver necessidade de acesso externo, criar serviço dedicado.
