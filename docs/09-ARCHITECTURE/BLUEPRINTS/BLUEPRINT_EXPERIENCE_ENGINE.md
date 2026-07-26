# Blueprint — Experience Engine

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `cognitive-experience-engine.ts`, `cognitive-briefing-engine.ts`, `cognitive-health-engine.ts`, `cognitive-evolution-engine.ts`, `cognitive-journey-engine.ts`, `cognitive-timeline-engine.ts`, `cognitive-workflow-engine.ts`, `cognitive-milestone-engine.ts`, `cognitive-notification-engine.ts`, `company-maturity-engine.ts`
> Dependências: 10+ engines, 7 services, `prisma-tenant-safe`, `cache`
> Criticidade: **Crítica**
> ADR: ADR-005 (monolítico até 2500 linhas)

---

## 1. Responsabilidade

Produzir objetos de experiência (Experience) que o frontend renderiza — cada página do dashboard tem um método `obter<Nome>Experience()` que orquestra as engines necessárias.

---

## 2. Papel

**Onde entra:** Última engine do pipeline cognitivo. Recebe dados de todas as engines anteriores e monta a experiência final.

**Onde termina:** Retorna objeto Experience consumido pelos Server Components do dashboard.

---

## 3. Dependências

### Quem chama

| Quem | Função |
|------|--------|
| `app/(dashboard)/layout.tsx` | `obterCognitiveOS()` |
| `app/(dashboard)/dashboard/page.tsx` | `obterHomeExperience()` |
| `app/(dashboard)/clientes/page.tsx` | `obterClientesExperience()` |
| `app/(dashboard)/crm/page.tsx` | `obterCRMExperience()` |
| `app/(dashboard)/tarefas/page.tsx` | `obterTarefasExperience()` |
| `app/(dashboard)/financeiro/page.tsx` | `obterFinanceiroExperience()` |
| `app/(dashboard)/conhecimento/page.tsx` | `obterConhecimentoExperience()` |
| `app/(dashboard)/aprendizados/page.tsx` | `obterLearningExperience()` |
| `app/(dashboard)/assistente/page.tsx` | `obterAssistenteExperience()` |
| `app/(dashboard)/implantacoes/page.tsx` | `obterImplantacoesExperience()` |
| `app/(dashboard)/historico/page.tsx` | `obterHistoricoExperience()` |
| `app/(dashboard)/configuracoes/page.tsx` | `obterConfiguracoesExperience()` |
| `app/(dashboard)/clientes/[id]/page.tsx` | `obterClienteExperience()` |
| `app/(dashboard)/centro-decisao/page.tsx` | `obterCentroDecisaoExperience()` |
| `api/experience/login/route.ts` | `obterLoginExperience()` |

### Quem ela chama

| Engine/Função | Usado por |
|---------------|-----------|
| `cognitive-context-engine.decidirContexto()` | Home, CognitiveOS |
| `identity-engine.construirIdentidade()` | Home, Config |
| `decision-engine.melhorDecisao()` | Home, CentroDecisao |
| `cognitive-health-engine.calcularHealthScore()` | Home |
| `cognitive-evolution-engine.calcularEvolucao()` | Home |
| `company-maturity-engine.calcularMaturidade()` | Home |
| `cognitive-briefing-engine.gerarBriefing()` | Home |
| `cognitive-journey-engine.gerarJornadas()` | Home |
| `cognitive-timeline-engine.gerarTimeline()` | Historico |
| `cognitive-workflow-engine.gerarWorkflows()` | Home |
| `cognitive-milestone-engine.gerarMilestones()` | Home |
| `cognitive-notification-engine.gerarNotificacoes()` | CognitiveOS |
| `founder-activation-engine.obterJornadaFundador()` | Home |
| `action-intelligence-engine.gerarActions()` | Home, CentroDecisao |

---

## 4. Contrato

```typescript
interface Experience {
  narrativa: Narrativa;        // texto contextual para o empresário
  blocks: ExperienceBlock[];   // cards/blocos de conteúdo
  actions: AcaoSugerida[];     // ações recomendadas
  workflows: CognitiveWorkflow[];
  journeys: Jornada[];
}

interface Narrativa {
  saudacao: string;            // "Bom dia, João!"
  resumo: string;              // "Sua empresa está saudável..."
  foco: string;                // "Sugestão do dia: negociar com cliente X"
}

interface ExperienceBlock {
  id: string;
  tipo: 'health' | 'evolution' | 'maturity' | 'briefing' | 'milestone' | 'insight';
  titulo: string;
  dados: unknown;              // específico por tipo
  prioridade: number;
}
```

---

## 5. Fluxo por Método

### obterHomeExperience (Dashboard Principal)

```
1. contexto = cognitive-context-engine.decidirContexto(empresaId)
2. identidade = identity-engine.construirIdentidade(empresaId)
3. decisao = decision-engine.melhorDecisao(empresaId, contexto)
4. healthScore = cognitive-health-engine.calcularHealthScore(empresaId)
5. evolucao = cognitive-evolution-engine.calcularEvolucao(empresaId)
6. maturidade = company-maturity-engine.calcularMaturidade(empresaId)
7. briefing = cognitive-briefing-engine.gerarBriefing(empresaId)
8. jornada = cognitive-journey-engine.gerarJornadas(empresaId)
9. milestones = cognitive-milestone-engine.gerarMilestones(empresaId)
10. workflows = cognitive-workflow-engine.gerarWorkflows(empresaId)
11. Montar Experience com blocks ordenados por prioridade
```

### obterCognitiveOS (Sidebar)

```
1. contexto = cognitive-context-engine.decidirContexto(empresaId)
2. notificacoes = cognitive-notification-engine.gerarNotificacoes(empresaId, contexto)
3. Montar CognitiveOS com notificacoes + contexto
```

---

## 6. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| Falha em health engine | Block de saúde não aparece (não quebra) |
| Falha em evolution engine | Block de evolução não aparece |
| Decisão nula | Nenhuma ação sugerida |
| Todas as engines falham | Experience com narrativa mínima + blocks vazios |

---

## 7. Critérios de Aceite

1. Cada método `obter<Nome>Experience` retorna Experience sem lançar erro
2. Falha em qualquer engine downstream não quebra a experiência
3. Experience tem blocks ordenados por prioridade
4. CognitiveOS sidebar mostra notificações + contexto

---

## 8-10. Testes, Observabilidade, Evolução

**Testes:** Cada método Experience retorna estrutura correta. Falha simulada em engine → experience parcial.

**Observabilidade:** `experience.metodo.chamado` (contador por método), `experience.metodo.duracao_ms` (histograma).

**Evolução:** Quando ultrapassar 2500 linhas (ADR-005), dividir em engines especializadas por página. Nunca mudar: `obterHomeExperience()` e `obterCognitiveOS()` — consumidos pelo layout principal.
