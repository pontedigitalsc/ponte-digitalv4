# P24 — Ciclo Cognitivo Contínuo: Consolidação e Valor de Negócio

## Resumo Executivo

**Período:** 27/07/2026 — 07/08/2026 (10 dias úteis)
**Fase:** V4 Founder — Validação de Produto
**Objetivo estratégico:** Consolidar o Ciclo Cognitivo Contínuo (Observação → Conhecimento → Correlação → Convicção → Decisão) como um pipeline robusto e multi-tenant, gerando valor de negócio visível para o empresário.

**Contexto:** P23 entregou o motor de correlação/causalidade, o enrichment framework baseado em eventos e o pipeline de stream processing PNAB. P24 fecha o círculo: o Motor como barramento central (ADR-015) precisa orquestrar o ciclo completo, os resultados precisam chegar à interface do usuário, e a qualidade dos dados precisa ser auditável.

---

## 1. Sprint Goal

> "O empresário consegue abrir o dashboard, ver **correlações reais** entre observações do seu negócio, entender **por que** certas correlações são fortes (convicção), e receber **decisões sugeridas** — tudo processado pelo Ciclo Cognitivo Contínuo em background."

### Critérios de sucesso

1. Ciclo Cognitivo Completo executado end-to-end em ao menos 1 tenant real.
2. Dashboard exibe correlações com nível de convicção visível.
3. Decisões sugeridas são geradas automaticamente a partir de convicções fortes.
4. Pipeline suporta pelo menos 3 tenants simultâneos sem degradação.
5. Tempo médio do ciclo completo < 30 segundos para cargas moderadas.

---

## 2. O que está em escopo

### 2.1 Motor como Barramento Central (ADR-015)

- [P24-001] Implementar orquestrador do Ciclo Cognitivo no Motor
- [P24-002] Criar fila interna de processamento por tenant
- [P24-003] Implementar barramento de eventos entre etapas do ciclo
- [P24-004] Adicionar métricas de latência por etapa do ciclo

### 2.2 Ciclo Cognitivo Contínuo (ADR-013)

- [P24-005] Pipeline Observação → Conhecimento (consolidar ADR-024)
- [P24-006] Pipeline Conhecimento → Correlação (usar motor existente)
- [P24-007] Pipeline Correlação → Convicção (ADR-032)
- [P24-008] Pipeline Convicção → Decisão (gerar decisões sugeridas)

### 2.3 Correlação com Convicção (ADR-032, ADR-034)

- [P24-009] Aprimorar algoritmo de convicção com peso por recência e frequência
- [P24-010] Separar serviço de correlação do serviço de causalidade
- [P24-011] Exibir nível de convicção no dashboard (0–100)

### 2.4 Frontend: Dashboard Cognitivo

- [P24-012] Criar componente de lista de correlações com convicção
- [P24-013] Criar componente de decisões sugeridas
- [P24-014] Conectar engine ao frontend via API
- [P24-015] Adicionar indicador de ciclo em execução (status do Motor)

### 2.5 Multi-tenant e Produção

- [P24-016] Auditoria de isolamento entre tenants no ciclo cognitivo
- [P24-017] Testes de carga com 3+ tenants simultâneos
- [P24-018] Rate limiting por tenant no Motor

### 2.6 Qualidade e Testes

- [P24-019] Testes de integração do ciclo completo
- [P24-020] Logging estruturado do ciclo cognitivo
- [P24-021] Health check do Motor expondo status de cada etapa

---

## 3. O que NÃO está em escopo

- Motor Cognitivo completo com raciocínio simbólico (visão futura)
- Domain Events formais com Event Sourcing
- Migração para Server Actions
- Inteligência Coletiva entre tenants
- Sistemas avançados de recomendação
- Interface mobile nativa
- NLP ou processamento de linguagem natural

---

## 4. Cronograma

| Semana | Dias | Foco |
|--------|------|------|
| Semana 1 | 27/07 a 31/07 | Motor como barramento + Ciclo Cognitivo pipeline interno |
| Semana 2 | 03/08 a 07/08 | Frontend + Multi-tenant + Testes integrados |

---

## 5. Débitos técnicos da sprint

- Revisar e limpar logs de depuração no Motor
- Remover código morto dos serviços de cognição legados
- Atualizar documentação da API com novos endpoints do ciclo
- Revisar permissões dos novos endpoints no tenant guard

---

## 6. Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|:------------:|:-------:|-----------|
| Pipeline completo excede 30s | Média | Alto | Otimizar por etapas, assíncrono onde possível |
| Convicção sem dados suficientes | Alta | Médio | Usar thresholds adaptativos por volume de dados |
| Frontend atrasa depends do backend | Média | Médio | Componentes mockados primeiro |
| Tenant isolation falha em corrida | Baixa | Crítico | Revisão de segurança obrigatória antes do deploy |

---

## 7. Dependências

- **Motor de Correlação/Causalidade** (entregue em P23)
- **Enrichment Framework** (entregue em P23)
- **PNAB Stream Pipeline** (entregue em P23)
- **API de Observações** (endpoints existentes)
- **Schema do Prisma** (modelos Observacao, Conhecimento, Correlacao, Conviccao, Decisao)

---

## 8. Definição de Pronto (DoD)

- [ ] Código revisado e aprovado
- [ ] Testes de integração passando
- [ ] Logging estruturado implementado
- [ ] Documentação da API atualizada
- [ ] Isolamento multi-tenant verificado
- [ ] Métricas de latência coletadas
- [ ] Deploy realizado em staging
- [ ] Validação com dados de tenant real

---

## 9. Lições de P23 para P24

1. **Começar pelo Motor** — o orquestrador do ciclo é a espinha dorsal.
2. **Mockar frontend cedo** — não esperar backend pronto para componentes visuais.
3. **Testar com dados reais desde o início** — correlações só fazem sentido com dados reais de negócio.
4. **Métrica primeiro** — sem métricas de latência por etapa, não dá para otimizar.
5. **Documentar enquanto codifica** — a base de conhecimento cresce junto com o código.

---

## 10. Definições importadas de P23

As definições conceituais estabelecidas em P23 continuam valendo (ver `P23_SPRINT.md` seção 10):
- Observação: dado bruto com metadado de contexto
- Conhecimento: observação processada e enriquecida
- Correlação: relação estatística entre conhecimentos
- Causalidade (futuro): relação causal validada
- Convicção: confiança na correlação (0–100)
- Decisão: ação sugerida baseada em convicção forte
