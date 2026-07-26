# Blueprint — Testes

> **Programa 13 — Blueprint de Implementação**
> Estado atual: **Zero testes automatizados** — todo o código está sem cobertura

---

## 1. Estratégia

### Pirâmide de Testes

```
        ╱╲
       ╱ E2E ╲          5% (crítico)
      ╱────────╲
     ╱ Integração ╲     20% (services + APIs)
    ╱──────────────╲
   ╱   Unitário      ╲   75% (engines + libs + utils)
  ╱────────────────────╲
```

### Prioridade

| Prioridade | O que testar | Por que |
|:----------:|:------------:|:--------|
| **P0** | `prisma-tenant-safe` | Segurança — isolamento de dados |
| **P0** | Engines cognitivas (Orchestrator, Context, Decision, Signal) | Core do sistema |
| **P0** | Services (CRUD com tenant guard) | Integridade dos dados |
| **P1** | Event Bus (pub/sub, DLQ, retry) | Comunicação entre módulos |
| **P1** | API routes (validação, autorização) | Contrato HTTP |
| **P1** | Hooks (fetch, loading, error states) | UX |
| **P2** | Componentes (renderização condicional) | UI |
| **P2** | Libs (cache, rate-limit, logger) | Infraestrutura |

---

## 2. Estrutura de Testes

```
sistema/
├── __tests__/
│   ├── unit/
│   │   ├── engines/
│   │   │   ├── cognitive-orchestrator.test.ts
│   │   │   ├── signal-engine.test.ts
│   │   │   ├── cognitive-context-engine.test.ts
│   │   │   ├── decision-engine.test.ts
│   │   │   └── trust-engine.test.ts
│   │   ├── services/
│   │   │   ├── cliente.service.test.ts
│   │   │   ├── lead.service.test.ts
│   │   │   └── tarefa.service.test.ts
│   │   ├── lib/
│   │   │   ├── prisma-tenant-safe.test.ts
│   │   │   ├── cache.test.ts
│   │   │   ├── rate-limit.test.ts
│   │   │   └── app-errors.test.ts
│   │   └── utils/
│   │       └── utils.test.ts
│   ├── integration/
│   │   ├── engines/
│   │   │   ├── cognitive-orchestrator.integration.test.ts
│   │   │   └── event-bus.integration.test.ts
│   │   └── services/
│   │       └── cliente.service.integration.test.ts
│   └── e2e/
│       ├── auth.cy.ts
│       ├── dashboard.cy.ts
│       └── conversa.cy.ts
```

---

## 3. Testes por Camada

### Engines (unitário)

```typescript
// Exemplo: signal-engine
describe('filtroSinais()', () => {
  it('filtra por dominio', () => {
    const sinais = [
      { dominio: 'FINANCEIRO', urgencia: 'alta', ... },
      { dominio: 'CLIENTES', urgencia: 'media', ... }
    ]
    expect(filtrarSinais(sinais, { dominio: ['FINANCEIRO'] })).toHaveLength(1)
  })
  it('filtra por urgencia minima', () => { /* ... */ })
  it('retorna todos sem filtro', () => { /* ... */ })
})
```

### Services (integração com banco de teste)

```typescript
// Exemplo: cliente.service
describe('criarCliente()', () => {
  it('cria cliente com empresaId', async () => {
    const cliente = await criarCliente(empresaId, dadosValidos)
    expect(cliente.empresaId).toBe(empresaId)
    expect(cliente.deletedAt).toBeNull()
  })
  it('rejeita cliente sem empresaId', async () => {
    await expect(criarCliente('', dados)).rejects.toThrow()
  })
})
```

### API Routes (integração com HTTP)

```typescript
describe('POST /api/clientes', () => {
  it('cria cliente com dados validos', async () => {
    const res = await request(app).post('/api/clientes').send(dados).set('Auth', token)
    expect(res.status).toBe(200)
    expect(res.body.dados.empresaId).toBe(empresaId)
  })
})
```

---

## 4. Cobertura Mínima

| Camada | Cobertura Mínima | Prazo |
|--------|:----------------:|:-----:|
| Libs (app-errors, logger, cache, utils) | 90% | Sprint 1 |
| Engines (pure functions) | 85% | Sprint 2 |
| Services (CRUD) | 80% | Sprint 2 |
| API Routes | 70% | Sprint 3 |
| Hooks | 60% | Sprint 3 |
| Components | 50% | Sprint 4 |

---

## 5. Ferramentas

| Ferramenta | Para |
|------------|------|
| Vitest | Testes unitários + integração (rápido, compatível com Vite/Next) |
| Testing Library | Testes de componentes React |
| MSW (Mock Service Worker) | Mock de requisições HTTP em testes |
| Playwright | E2E (navegador real) |
| c8 ou istanbul | Cobertura de código |
