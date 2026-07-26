# Blueprint — Identity Engine + Conversation Engine

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `identity-engine.ts`, `conversation-engine.ts`, `interpretacoes.ts`, `reacoes.ts`
> Dependências: `prisma-tenant-safe`, `evidence-engine`, `logger`
> Criticidade: **Alta**
> ADRs: ADR-007 (JSON Identity), ADR-017 (IA tradutora), ADR-030 (eliminar crenças)

---

## 1. Responsabilidade

**Identity Engine:** Manter a identidade digital da empresa — perfil cognitivo, verdades estabelecidas e hipóteses em observação.

**Conversation Engine:** Gerenciar o fluxo da conversa de diagnóstico — criar, responder, avançar etapas, finalizar e interpretar.

---

## 2. Papel

**Identity:** Entra após o cadastro (interpretação das respostas) e em todo pipeline cognitivo. Alimenta o Context Engine.

**Conversation:** Entra na rota `/conversa` e `/api/auth/criar-conta`. Único pipeline que usa IA para interpretar respostas (ADR-017).

---

## 3. Dependências

| Identity chama | Conversation chama |
|----------------|-------------------|
| `prisma-tenant-safe` | `prisma-tenant-safe` |
| `evidence-engine` | (via Orchestrator) |

Nenhuma engine chama Identity ou Conversation (elas são chamadas pelo Orchestrator).

---

## 4. Contratos

### Identity Engine

```typescript
async function construirIdentidade(empresaId: string): Promise<IdentidadeDigital | null>;
async function obterIdentidade(empresaId: string): Promise<IdentidadeDigital | null>;
async function interpretarRespostas(empresaId: string, respostas: Record<string, unknown>): Promise<void>;
async function atualizarIdentidade(empresaId: string, dados: Partial<IdentidadeDigital>): Promise<void>;
async function registrarHistoricoConversa(empresaId: string, mes: number, ano: number, respostas: JsonValue): Promise<void>;
```

### Conversation Engine

```typescript
async function criarConversa(token: string): Promise<Conversa>;
async function carregarConversa(token: string): Promise<Conversa | null>;
async function responder(token: string, perguntaId: string, valor: string): Promise<Conversa>;
async function obterEstado(token: string): Promise<{ etapa: string; concluida: boolean; progresso: number }>;
async function vincularConversa(token: string, empresaId: string): Promise<void>;
async function obterRespostas(token: string): Promise<Record<string, unknown>>;
```

### Persistência

```prisma
model IdentidadeDigital {
  empresaId        String   @id
  versao           Int
  dados            Json?       // perfil, setor, faturamento, etc
  interpretacoes   Json?       // inferências do sistema
  conhecimentos    Json?       // verdades estabelecidas
  crencas          Json?       // hipóteses (será removido — ADR-030)
  lacunas          Json?       // o que não sabemos
  narrativaVersao  String?
  ultimaConversa   DateTime?
  // ...
}

model Conversa {
  id         String   @id
  token      String   @unique
  fluxo      String   // "primeira-conversa"
  etapa      String?
  respostas  Json
  empresaId  String?
  concluida  Boolean
  // ...
}
```

---

## 5. Fluxo

### Fluxo da Conversa

```
1. GET /api/conversa → criarConversa(token) ou carregarConversa(token)
2. Retorna pergunta atual do fluxo "primeira-conversa"
3. POST /api/conversa → responder(token, perguntaId, valor)
4. Avança para próxima pergunta
5. Quando fluxo termina:
   - Marcar conversa como concluída
   - POST /api/auth/criar-conta vincula conversa + cria identidade
```

### Fluxo da Identidade (pós-cadastro)

```
1. Orchestrator.processarCadastro()
2. conversation-engine.obterRespostas(token)
3. identity-engine.interpretarRespostas(respostas)
   ├─ Extrair setor, faturamento, número de funcionários
   ├─ Inferir estágio de maturidade
   └─ Identificar lacunas de informação
4. identity-engine.atualizarIdentidade(dados extraídos)
5. Registrar histórico da conversa
```

---

## 6. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| Token de conversa inválido | `carregarConversa` retorna null |
| Respostas incompletas | Identity cria identidade parcial com lacunas |
| Cadastro sem conversa | Orchestrator lança erro |
| Múltiplas conversas para mesma empresa | Apenas a última é considerada (mais recente) |

---

## 7. Critérios de Aceite

1. Conversa de diagnóstico completa (7+ perguntas) → identidade criada
2. Identidade com dados mínimos (setor, faturamento) → pipeline funciona
3. `interpretarRespostas` cria identidade mesmo com dados parciais
4. `registrarHistoricoConversa` persiste histórico mensal

---

## 8-10. Testes, Observabilidade, Evolução

**Testes:** Conversa completa → identidade com dados. Conversa incompleta → identidade parcial. Token inválido → null.

**Observabilidade:** `identity.criadas` (contador), `conversation.iniciadas` (contador), `conversation.concluidas` (contador).

**Evolução:** Múltiplos fluxos de conversa (não apenas "primeira-conversa"). NLP próprio para interpretação (hoje usa IA — ADR-017).
