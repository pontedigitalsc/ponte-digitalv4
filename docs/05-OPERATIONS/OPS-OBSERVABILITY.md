# Observabilidade em Produção

> **WP-4.5** — Release Program v1.0, Programa 4
> Data: 24/07/2026 | Status: Concluído

---

## Stack de Observabilidade

| Camada | Ferramenta | Status |
|--------|-----------|--------|
| Logs estruturados | Logger próprio (JSON stdout) | ✅ Implementado |
| Health check | `/api/health` (memória, uptime, ambiente) | ✅ Implementado |
| Correlation ID | `correlationId` em erros e logs | ✅ Implementado |
| Métricas | Nenhuma | ⚠ Pendente |
| Alertas | Nenhum | ⚠ Pendente |
| APM | Nenhum | ⚠ Pendente |

---

## Logs

### Formato (Produção)

```json
{
  "timestamp": "2026-07-24T10:30:00.000Z",
  "level": "error",
  "message": "Erro na API",
  "service": "api",
  "module": "error-handler",
  "correlationId": "uuid-v4",
  "empresaId": "ckl...",
  "errorCode": "NOT_FOUND",
  "durationMs": 342,
  "error": { "message": "Cliente não encontrado" }
}
```

### Como visualizar (Vercel)

```
Vercel Dashboard → Project → Logs
→ Filtrar por: Runtime Logs
→ Buscar por correlationId ou empresaId
```

**Nota:** Vercel Logs têm retenção limitada (gratuito: 3 dias, Pro: 14 dias). Para retenção maior, considere integrar com:

- [Logtail](https://logtail.com) — gratuito até 1GB/mês
- [Axiom](https://axiom.co) — gratuito para dev
- [Datadog](https://datadoghq.com) — pago

---

## Health Check

### Endpoint: `GET /api/health`

```json
{
  "status": "ok",
  "timestamp": "2026-07-24T10:30:00.000Z",
  "uptime": 123456,
  "ambiente": "production",
  "memoria": { "rss": 128, "heapTotal": 64, "heapUsed": 48 },
  "tempoResposta": 5
}
```

**Uptime monitor:** Usar [Better Stack](https://betterstack.com) (gratuito) ou [Pingdom](https://pingdom.com) para monitorar:

```
URL: https://pontedigital.com.br/api/health
Intervalo: 1 minuto
Zonas: 2+ regiões
Alertar: se resposta != 200
```

---

## Métricas Recomendadas

Sem implementação atual. Para produção, recomenda-se:

### Mínimo Viável (sem custo)

1. **Vercel Analytics** — ativar em Vercel Dashboard (gratuito)
   - Page views, visitantes, geolocalização
   - Sem necessidade de código

2. **Vercel Web Vitals** — ativar em Vercel Dashboard
   - LCP, CLS, INP (Core Web Vitals)

### Intermediário (baixo custo)

3. **Better Stack** (gratuito até 3 URLs)
   - Uptime monitoring
   - SSL expiry alerts
   - Heartbeat para cron jobs

4. **Sentry** (gratuito para dev)
   - Error tracking com stack traces
   - Performance monitoring

---

## Alertas Recomendados

| Alerta | Condição | Canal | Prioridade |
|--------|----------|-------|-----------|
| Health check falhou | Resposta != 200 | Email/Slack | P0 |
| Erro 500 em produção | > 1% das requisições | Email | P1 |
| Uptime baixo | < 99.9% em 1h | Email | P1 |
| Certificado SSL expirando | < 30 dias | Email | P1 |
| Backup falhou | Sem backup nas últimas 24h | Email | P0 |

---

## Configuração de Alertas

### Better Stack (gratuito)

1. Criar conta em [betterstack.com](https://betterstack.com)
2. Adicionar URL: `https://pontedigital.com.br/api/health`
3. Configurar intervalo: 1 minuto
4. Adicionar integração Slack/Email
5. Configurar alerta SSL: notificar se < 30 dias

### Vercel (nativo)

1. Vercel Dashboard → Project → Monitoring
2. Ativar "Error Rate Alerts"
3. Threshold: > 5% error rate em 5 minutos
4. Notificar: email do time
