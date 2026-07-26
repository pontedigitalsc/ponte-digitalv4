# Blueprint — Feedback + Outcome + Action Intelligence + Founder Activation + Ritmo

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `feedback-intelligence-engine.ts`, `outcome-intelligence-engine.ts`, `action-intelligence-engine.ts`, `founder-activation-engine.ts`, `ritmo-engine.ts`
> Dependências: `prisma-tenant-safe`, `cognitive-memory-engine`, `knowledge-governance-engine`
> Criticidade: **Média**

---

## 1. Responsabilidade

**Feedback:** Processar feedback do empresário sobre ações — alimenta o ciclo de aprendizado.

**Outcome:** Registrar outcomes — mudanças reais observadas na empresa.

**Action Intelligence:** Compor ações sugeridas baseadas em decisões e contexto.

**Founder Activation:** Rastrear ativação do empresário — eventos comportamentais que indicam engajamento.

**Ritmo:** Executar ciclos cognitivos automáticos em frequência configurável (DIARIA, SEMANAL, MENSAL).

---

## 2. Contratos

```typescript
// Feedback Intelligence
async function registrarFeedback(empresaId: string, acaoId: string, tipo: TipoFeedbackAcao): Promise<void>;
async function listarFeedbackRecente(empresaId: string, limite?: number): Promise<FeedbackAcao[]>;

// Outcome Intelligence
async function registrarOutcome(empresaId: string, params: {
  categoria: CategoriaOutcome; descricao: string; confianca: ConfiancaEvidencia; evidenciasIds: string[];
}): Promise<void>;
async function calcularImpactoEmpresa(empresaId: string): Promise<ImpactoEmpresa>;
async function principaisOutcomes(empresaId: string, limite?: number): Promise<Outcome[]>;

// Action Intelligence
async function gerarActions(decisao: Decisao, contexto: DecisaoContexto): Promise<AcaoSugerida[]>;
async function criarAcao(empresaId: string, params: {
  titulo: string; descricao: string; categoria: string; origem: OrigemAcao;
}): Promise<AcaoCognitiva>;
async function listarAcoesAtivas(empresaId: string): Promise<AcaoCognitiva[]>;

// Founder Activation
async function registrarEventoAtivacao(empresaId: string, tipo: TipoEventoAtivacao): Promise<void>;
async function calcularNivelAtivacao(empresaId: string): Promise<number>;
async function obterJornadaFundador(empresaId: string): Promise<JornadaFundador>;

// Ritmo
async function obterCiclos(empresaId: string): Promise<CicloConfiguracao[]>;
async function atualizarConfiguracaoCiclo(empresaId: string, config: Partial<CicloConfiguracao>): Promise<void>;
async function calcularProximaData(empresaId: string, tipo: string): Promise<Date>;
async function registrarHeartbeat(empresaId: string): Promise<void>;
async function verificarSaude(empresaId: string): Promise<boolean>;
```

### Persistência

```prisma
model EventoAtivacao {
  empresaId String
  tipo      TipoEventoAtivacao
  dados     Json?
  @unique([empresaId, tipo])
}

model CicloConfiguracao {
  empresaId       String
  tipo            String        // "completo" | "leve"
  frequencia      FrequenciaCiclo  // DIARIA | SEMANAL | MENSAL
  ativo           Boolean
  ultimaExecucao  DateTime?
  proximaExecucao DateTime?
  heartbeatOk    Boolean
  @unique([empresaId, tipo])
}
```

---

## 3. Fluxos

### Fluxo de Feedback

```
1. Empresário fornece feedback (AJUDOU | NAO_AJUDOU | AJUDOU_PARCIALMENTE)
2. feedback-intelligence.registrarFeedback(empresaId, acaoId, tipo)
3. Orchestrator chama:
   ├─ outcome-intelligence.registrarOutcome(...)
   └─ knowledge-governance.validarHipoteses()
```

### Fluxo do Ritmo

```
1. Verificar heartbeat da empresa (verificarSaude)
2. Se heartbeat ok e próximo ciclo ≤ agora:
   ├─ Processar pipeline completo (cognitive-orchestrator)
   ├─ Registrar execução (ultimaExecucao = now)
   ├─ Calcular próxima data (calcularProximaData)
   └─ Publicar evento CicloCompleto
3. Se heartbeat falhou (sem heartbeat há 7+ dias):
   └─ Marcar ciclo como inativo
```

---

## 4. Critérios de Aceite

1. Feedback registrado → hipótese fortalecida/enfraquecida
2. Outcome registrado → impacto recalculado
3. Ação criada com origem DECISION_ENGINE → aparece em `listarAcoesAtivas`
4. Evento de ativação registrado → nível de ativação aumenta
5. Ritmo executa ciclo automático baseado em `proximaExecucao`

---

## 5-6. Casos Extremos/Testes

| Caso | Comportamento |
|------|--------------|
| Feedback sem ação vinculada | `registrarFeedback` lança erro |
| Outcome sem evidências | Registrado, mas com confiança baixa |
| Ciclo desativado | Ritmo não executa |
| Heartbeat ausente por 7 dias | Ciclo marcado como inativo |

**Testes:** Registro de feedback, criação de ação, cálculo de ativação, execução de ciclo.

---

## 7-10. Observabilidade, Evolução

**Observabilidade:** `feedback.registrados` (contador), `outcome.registrados` (contador), `ritmo.ciclos.executados` (contador), `ritmo.heartbeat.falhas` (contador).

**Evolução:** Ritmo pode ser substituído por job scheduler externo (Bull/PgBoss) em escala.
