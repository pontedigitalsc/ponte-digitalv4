# Sistema Operacional Cognitivo

> **Programa 12 — Fase 4: Sistema Cognitivo Completo (Nível Sistema Operacional)**
> Versão: 1.0
> Propósito: Definir o ciclo completo de vida do sistema — startup, boot, heartbeat, shutdown, degradação, recuperação, atualização

---

## Preâmbulo

Até aqui projetamos partes do Motor Cognitivo: raciocínio (Fase 3), decisão, contexto, memória, perguntas, priorização, observação, intervenção, ciclo. Agora precisamos projetar como tudo isso vive junto como um sistema único.

Este documento trata do Sistema Operacional Cognitivo — a camada que gerencia o ciclo de vida da plataforma como um todo. Não são engines individuais. É o comportamento global: como o sistema nasce, respira, adoece, se recupera e evolui.

Uma empresa vive dentro da Ponte Digital por anos. O sistema precisa suportar esse ciclo sem perder conhecimento, sem corromper estado, sem exigir reinicializações.

---

## Seção 1 — Ciclo Completo do Sistema

### 1.1 O Ciclo de Vida da Plataforma

```
BOOT → INICIALIZAÇÃO → OPERAÇÃO NORMAL → DEGRADAÇÃO → RECUPERAÇÃO → (OPERAÇÃO) → SHUTDOWN → RETOMADA
```

Cada transição entre estados é monitorada, registrada e reversível.

### 1.2 Estados Globais do Sistema

| Estado | Definição | Duração Típica |
|--------|-----------|:--------------:|
| BOOT | Processo inicial de carga | 10-30s |
| INICIALIZAÇÃO | Engines carregando, cache warming | 1-5min |
| OPERAÇÃO NORMAL | Sistema processando ciclos | Indeterminado (dias-meses) |
| DEGRADAÇÃO | Subsistema falhou, modo limitado | Minutos-horas |
| RECUPERAÇÃO | Restauração de consistência | Segundos-minutos |
| SHUTDOWN | Desligamento controlado | 10-30s |
| RETOMADA | Volta após shutdown | 1-5min |

---

## Seção 2 — Startup e Boot

### 2.1 Sequência de Boot

```
t0: Gatilho de boot (deploy, restart, crash recovery)
t1: Verificar integridade do banco (prisma validate)
t2: Carregar configurações globais (feature flags, thresholds)
t3: Inicializar cognitive-bus (event bus)
t4: Registrar subscribers (engines que ouvem eventos)
t5: Inicializar cache (warm TTLs padrão)
t6: Verificar estado de empresas ativas
t7: Para cada engine: verificar se responde (health check interno)
t8: Publicar evento SISTEMA_INICIADO
t9: Transitar para OPERAÇÃO NORMAL
```

### 2.2 Boot Parcial (após crash)

Se o boot segue um crash (não um shutdown controlado):

```
t0: Detectar crash (arquivo de lock, flag de shutdown incompleto)
t1: Modo RECUPERAÇÃO forçado
t2: Verificar integridade de ciclos incompletos
t3: Re-processar ciclos que estavam em andamento (se seguro)
t4: Se ciclo corrompido → marcar como FALHO, preservar dados parciais
t5: Publicar evento CRASH_DETECTADO com diagnóstico
t6: Transitar para OPERAÇÃO NORMAL após consistência verificada
```

### 2.3 Cláusula de Boot Seguro

Nenhuma decisão cognitiva é tomada durante o boot. O sistema só começa a processar ciclos após:
1. Todos os subscribers registrados
2. Cache inicial populado
3. Consistência do banco verificada
4. Pelo menos 1 heartbeat bem-sucedido

---

## Seção 3 — Inicialização

### 3.1 Inicialização de Empresa

Quando uma nova empresa entra na plataforma:

```
t0: Empresa criada (signup)
t1: Patrimônio cognitivo inicial gerado (empresaId, configurações padrão)
t2: CicloConfiguracao criado (frequências padrão)
t3: Modo ONBOARDING ativado (por 7 dias)
t4: Primeira conversa agendada
t5: Contexto inicial montado (dados CNPJ, setor, porte)
t6: Publicar evento EMPRESA_INICIADA
```

### 3.2 Inicialização de Sessão

Quando o empresário faz login:

```
t0: Login detectado
t1: Working Memory criada (sessão)
t2: Contexto Cognitivo carregado (cache)
t3: Decisões pendentes verificadas
t4: Se havia plano em andamento → reativar acompanhamento
t5: Se havia perguntas não respondidas → re-apresentar (1 vez apenas)
t6: Publicar evento SESSAO_INICIADA
```

### 3.3 Inicialização de Ciclo

Cada ciclo cognitivo (Documento 9 da Fase 3) inicia com:
- Verificação de consistência do último ciclo
- Carregamento do contexto vigente
- Verificação de estimulos pendentes na fila
- Confirmação de que o ciclo anterior não deixou estado inconsistente

---

## Seção 4 — Heartbeat

### 4.1 Heartbeat Interno

O sistema mantém um batimento cardíaco interno que verifica a saúde de todos os subsistemas:

**Frequência:** A cada 60 segundos
**Responsável:** cognitive-orchestrator

```
Heartbeat:
  1. Verificar cognitive-bus (está aceitando eventos?)
  2. Verificar cada engine registrada (health check, < 500ms timeout)
  3. Verificar cache (TTLs não expirados em massa)
  4. Verificar fila de processamento (tamanho, idade do item mais antigo)
  5. Verificar ciclo noturno (está agendado? rodou? falhou?)
  6. Registrar métricas de saúde (todas as engines respondendo? latência?)
  7. Se alguma engine não responde → transitar para DEGRADAÇÃO
```

### 4.2 Heartbeat Externo

Para monitoramento externo (uptime, observabilidade):

**Endpoint:** `GET /api/health`
**Resposta:** `{ status: 'ok' | 'degradado' | 'falha', engines: { nome: 'ok' | 'timeout' | 'erro' } }`

### 4.3 Heartbeat de Empresa

Cada empresa ativa tem um heartbeat individual (processado pelo ritmo-engine):

**Frequência:** Configurável (padrão: 5 minutos para empresas ativas)
**Função:** Verificar se a empresa ainda está sendo processada, se há ciclos pendentes, se o último ciclo concluiu com sucesso.

---

## Seção 5 — Shutdown

### 5.1 Shutdown Controlado

```
t0: Sinal de shutdown recebido (SIGTERM, deploy)
t1: Pausar processamento de novos estímulos
t2: Finalizar ciclos em andamento (com timeout de 30s)
t3: Persistir estado de todos os ciclos (para retomada)
t4: Limpar cache (Working Memory expira de qualquer forma)
t5: Fechar conexões de banco (prisma)
t6: Publicar evento SISTEMA_FINALIZADO
t7: Processo encerra
```

### 5.2 Shutdown Forçado (Crash)

Se o processo morre sem shutdown controlado:

1. Ciclos em andamento são perdidos — não é possível recuperá-los
2. Dados já persistidos (Lei 10 da Constituição) permanecem no banco
3. Ciclos interrompidos são detectados no próximo boot (boot parcial)
4. Empresas processadas no momento do crash têm consistência verificada
5. Nenhum dado de patrimônio é perdido (está no banco, não em memória)

**Garantia:** O design garante que dados de patrimônio cognitivo nunca são perdidos em crash. Apenas ciclos em andamento (não persistidos) são perdidos — e serão re-processados.

---

## Seção 6 — Retomada

### 6.1 Retomada após Shutdown Controlado

```
t0: Boot padrão (Seção 2.1)
t1: Verificar se há ciclos pausados (shutdown iniciou mas não completou)
t2: Se sim → re-processar a partir do estágio onde parou
t3: Se não → operação normal
```

### 6.2 Retomada após Crash

```
t0: Boot parcial (Seção 2.2)
t1: Verificar integridade de cada empresa ativa
t2: Empresas com ciclos incompletos → re-processar último estímulo
t3: Empresas com último ciclo completo → operação normal
t4: Se alguma empresa tem dados inconsistentes → isolar e alertar admin
```

### 6.3 Retomada de Empresa Individual (após inatividade)

Se o empresário fica semanas sem login:

```
t0: Empresário faz login após inatividade
t1: Motor detecta lacuna temporal (último ciclo vs agora)
t2: Ciclo noturno acumulado é executado (todos os dias perdidos)
t3: Se mais de 30 dias → modo "retomada" (inferência prioritária, sem perguntas)
t4: Se mais de 90 dias → modo "reativação" (revalidação forçada de conhecimento)
t5: Patrimônio é consolidado após catch-up
```

---

## Seção 7 — Degradação

### 7.1 Níveis de Degradação

| Nível | Estado | O que funciona | O que não funciona |
|:-----:|:------:|:--------------|:-------------------|
| 0 | Normal | Tudo | Nada |
| 1 | Leve | Ciclo cognitivo completo | Acompanhamento (Nível 6) |
| 2 | Moderado | Percepção, Contexto, Registro | Análise, Hipótese, Decisão |
| 3 | Grave | Apenas Percepção e Registro | Análise em diante (sem raciocínio) |
| 4 | Crítico | Apenas heartbeat | Nenhuma engine cognitiva |

### 7.2 Gatilhos de Degradação

| Gatilho | Nível | Ação automática |
|---------|:-----:|-----------------|
| 1 engine não responde no heartbeat | 1 | Isolar engine, continuar sem ela |
| 3+ engines não respondem | 2 | Pular estágios afetados, registrar |
| cognitive-bus com timeout | 2 | Tentar reinicialização do bus |
| Cache corrompido | 2 | Limpar cache, forçar reload |
| Banco inacessível | 4 | Parar tudo, manter heartbeat |
| Ciclo noturno falha 3x consecutivas | 2 | Alerta admin, tentar novamente no próximo dia |

### 7.3 Operação Degradada

Em modo degradado, o sistema nunca:
- Perde dados (persiste tudo que pode)
- Toma decisões baseadas em informação incompleta (não substitui engines offline)
- Apaga fila de processamento (preserva para retomada)

---

## Seção 8 — Recuperação

### 8.1 Recuperação Automática

| Falha | Recuperação | Tempo |
|-------|:-----------:|:-----:|
| Engine timeout | Retry 3x com backoff (1s, 2s, 4s) | 7s |
| Cache corrompido | Limpar e repopular | 2s |
| Conexão de banco perdida | Reconectar (prisma faz automaticamente) | 1-5s |
| Evento perdido no bus | Republish do último evento conhecido | 1s |
| Ciclo falho | Re-processar no próximo ciclo | Próximo ciclo |
| Dados inconsistentes | Isolar empresa, alertar admin | Manual |

### 8.2 Recuperação Manual

Situações que exigem intervenção de admin (humano):

- Empresa com dados inconsistentes não resolvíveis automaticamente
- Engine que não recupera após 5 tentativas automáticas
- Heartbeat crítico ignorado por 3 ciclos consecutivos
- Degradação nível 3 ou 4 sem melhora em 30 minutos

### 8.3 Plano de Recuperação de Desastre

Em caso de perda total do servidor:
1. Novo servidor provisionado (infraestrutura)
2. Banco restaurado do último backup (≤ 5 min de dados perdidos)
3. Sistema faz boot parcial
4. Ciclos pós-backup são re-processados a partir de estímulos registrados
5. Empresas com ciclos perdidos recebem notificação "período de catch-up"

---

## Seção 9 — Atualização

### 9.1 Atualização de Engines Individuais

Cada engine do Motor Cognitivo pode ser atualizada independentemente:

```
1. Nova versão da engine é publicada
2. Feature flag desliga versão antiga
3. Subscriber da engine é substituído (sem parar o bus)
4. Heartbeat verifica nova engine
5. Se nova engine falha → feature flag reverte para versão antiga
6. Se nova engine OK → versão antiga é removida
```

### 9.2 Atualização de Regras de Negócio

Regras de negócio (thresholds, pesos, configurações) são atualizadas sem deploy:

- Armazenadas em ConfiguracaoEmpresa (banco) ou feature-flags.ts
- Lidas a cada ciclo (não em cache eterno)
- Mudanças propagam em até 5 minutos (próximo heartbeat)

### 9.3 Atualização do Modelo Cognitivo Universal

Mudanças no modelo cognitivo (novos objetos, novos relacionamentos) requerem:
1. Migration de banco (se aplicável — adicionar campos, não remover)
2. Atualização das engines que processam os novos objetos
3. Ciclo noturno para re-processar empresas existentes com o novo modelo
4. Compatibilidade retroativa garantida (engines antigas ignoram campos novos)

---

## Seção 10 — Consistência

### 10.1 Garantias de Consistência

| Operação | Garantia | Mecanismo |
|----------|:--------:|-----------|
| Persistência de patrimônio | IMMEDIATE | Escrita síncrona no banco antes de confirmar ciclo |
| Publicação de evento | AT_LEAST_ONCE | Retry com backoff, deduplicação no consumidor |
| Atualização de contexto | EVENTUAL | TTL de 5 min, novo contexto a cada ciclo |
| Decisão de intervenção | IMMEDIATE | Decisão é tomada com contexto vigente (imutável) |
| Aprendizado coletivo | EVENTUAL | Ciclo noturno, batch processing |
| Condensação de memória | EVENTUAL | Ciclo noturno |

### 10.2 Detecção de Inconsistência

O heartbeat verifica consistência global:

```
Verificações de consistência:
  ├─ Saldo contábil: total de transações = saldo informado?
  ├─ Contagem de hipóteses: ativas por domínio ≤ 7?
  ├─ Ciclo noturno: rodou nas últimas 24h?
  ├─ Patrimônio: última atualização há menos de 24h?
  └─ Memória: Short Term + Long Term dentro dos limites?
```

### 10.3 Resolução de Inconsistência

Se uma inconsistência é detectada:

```
1. Isolar o escopo da inconsistência (empresa, domínio, engine)
2. Se auto-resolvível (truncar, recalcular, re-processar) → resolver
3. Se não auto-resolvível → marcar empresa como INCONSISTENTE
4. Empresa inconsistente não recebe novas recomendações até resolução
5. Admin notificado
```

---

## Seção 11 — Sincronização

### 11.1 Sincronização entre Instâncias

O sistema opera em uma única instância (por enquanto). Sincronização entre instâncias futuras:

| Recurso | Estratégia de Sincronização |
|---------|---------------------------|
| Cache | Cache distribuído (Redis) quando houver 2+ instâncias |
| Ciclo noturno | Lock de empresa: apenas 1 instância processa cada empresa |
| Event Bus | Kafka/RabbitMQ quando houver 2+ instâncias |
| Banco | PostgreSQL gerencia concorrência (transações) |

### 11.2 Sincronização Temporária

Para períodos curtos de downtime (deploy, restart):

- Heartbeat de 60s detecta parada
- Fila de eventos não processados acumula no banco (event-store)
- Após retomada, fila é drenada em ordem de prioridade
- Máximo de 60s sem processamento durante deploy

---

## Seção 12 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. O maior risco de inconsistência não está no banco (que é transacional) — está no cache. Um cache stale pode fazer o Motor decidir com contexto desatualizado.
2. O boot parcial (após crash) é o momento mais crítico — requer verificação de consistência empresa por empresa.
3. A degradação por engine individual é segura porque cada estágio do ciclo tem fallback definido (Documento 9 Fase 3, Seção 12.3).

### Pressupostos

1. **P1:** Uma única instância é suficiente para o volume atual. Multi-instância é evolução futura.
2. **P2:** O heartbeat de 60s é frequente o suficiente para detectar falhas rapidamente.
3. **P3:** A recuperação automática de engine (retry 3x com backoff) resolve 90% das falhas transitórias.

### Lacunas

1. **L1:** Não foi especificado o mecanismo de "lock de empresa" para processamento — como garantir que duas instâncias não processam a mesma empresa simultaneamente?
2. **L2:** A recuperação de desastre (Seção 8.3) depende de backup automático do banco — não foi especificada a frequência nem o mecanismo.
3. **L3:** O isolamento de empresa inconsistente (Seção 10.3) não especifica como reabilitá-la após resolução manual.

### Riscos

1. **R1 — Perda de ciclo em crash:** Ciclos em andamento durante um crash são perdidos. Se o estímulo original não for registrado, o conhecimento pode ser perdido. Mitigação: perception-engine persiste o sinal antes de iniciar o ciclo.
2. **R2 — Acumulação de dead letters:** Se uma engine falha consistentemente, eventos não processados se acumulam no event-store. Mitigação: dead letter queue com alerta após N falhas.
3. **R3 — Split-brain em multi-instância:** Se o sistema escalar para 2+ instâncias sem mecanismo de lock, duas instâncias podem processar a mesma empresa. Mitigação: lock distribído por empresaId.

### Conflitos

Nenhum conflito com documentos anteriores. A operação em instância única é consistente com a Constituição (Seção 14 — simplicidade intencional).

### Impacto Futuro

1. O ciclo de vida definido neste documento permite que o sistema opere por anos sem reinicializações forçadas.
2. A degradação gradual (4 níveis) evita falhas catastróficas — o sistema nunca "morre" de repente.
3. A recuperação automática reduz necessidade de intervenção humana para falhas comuns.
