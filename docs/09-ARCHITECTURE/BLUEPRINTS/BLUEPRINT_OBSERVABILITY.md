# Blueprint — Observabilidade

> **Programa 13 — Blueprint de Implementação**
> Estado atual: logs estruturados (logger.ts), sem tracing, sem métricas externas, sem dashboard

---

## 1. Logs (já implementado)

| Nível | Uso | Cor |
|-------|-----|-----|
| `error` | Falhas inesperadas, dead letters, exceções não tratadas | Vermelho |
| `warn` | Falhas esperadas, rate limit excedido, degradação | Amarelo |
| `info` | Ações importantes (login, cadastro, decisão gerada) | Verde |
| `debug` | Etapas de pipeline, cache hit/miss, eventos | Cinza |

### Formato

```typescript
createLogger('engine', 'orchestrator').info('Ciclo completo', {
  empresaId, correlationId, duracaoMs: 1234
})
```

---

## 2. Métricas (não implementado — plano)

| Métrica | Tipo | Fonte | Prioridade |
|---------|------|-------|------------|
| `http.requests.total` | Contador | API routes | Alta |
| `http.requests.duracao_ms` | Histograma | API routes | Alta |
| `http.requests.erros` | Contador (por status) | API routes | Alta |
| `engine.pipeline.duracao_ms` | Histograma | Pipeline Monitor | Alta |
| `engine.pipeline.falhas` | Contador (por etapa) | Pipeline Monitor | Alta |
| `eventbus.eventos.publicados` | Contador (por tipo) | Event Bus | Média |
| `eventbus.dlq.total` | Gauge | Dead Letter | Média |
| `cache.hit_ratio` | Gauge | Cache Provider | Média |
| `database.queries.lentas` | Contador (threshold 500ms) | Prisma | Alta |
| `auth.login.sucessos` | Contador | Auth | Média |
| `auth.login.falhas` | Contador | Auth | Média |

---

## 3. Alertas (não implementado — plano)

| Alerta | Condição | Canal | Prioridade |
|--------|----------|-------|------------|
| Pipeline parado | Nenhum ciclo completo em 1h para empresa ativa | Email/Slack | Alta |
| Taxa de erro > 10% | Erros/total > 0.10 nos últimos 5 min | Email/Slack | Alta |
| Dead letter crescente | DLQ > 10 eventos não processados | Email | Média |
| Cache hit ratio baixo | Hit ratio < 0.5 | Log | Baixa |
| Rate limit frequente | Mais de 10 bloqueios/min em mesma rota | Log | Média |

---

## 4. Dashboard (não implementado — plano)

Página admin `/admin/cognitive-observatory` já existe. Deve mostrar:

1. **Visão geral:** total de empresas, ciclos hoje, eventos hoje, DLQ total
2. **Saúde do pipeline:** gráfico de duração média, taxa de falha por etapa
3. **Engines:** tempo de resposta por engine, chamadas por engine
4. **Event Bus:** eventos por tipo, taxa de falha por handler
5. **Cache:** hit ratio por namespace, TTL médio
6. **Banco:** queries lentas, conexões ativas

---

## 5. Ferramentas Recomendadas

| Ferramenta | Para | Custo |
|------------|------|-------|
| Sentry | Error tracking + performance | Gratuito (inicial) |
| Upstash Redis | Rate limit + cache (escala) | Gratuito (inicial) |
| Vercel Analytics | Métricas de página | Incluso no Vercel |
| Logtail / BetterStack | Log management | Gratuito (inicial) |
