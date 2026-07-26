# Arquitetura da Orquestração

> **Programa 12 — Fase 4: Sistema Cognitivo Completo (Nível Sistema Operacional)**
> Versão: 1.0
> Propósito: Definir quem coordena, quem executa, quem interrompe e quem mantém consistência no sistema cognitivo

---

## Preâmbulo

No nível de sistema, orquestração não é apenas "chamar engines em sequência". É o tecido conjuntivo que garante que milhares de processos (um por empresa) rodem simultaneamente sem conflito, que loops não aconteçam, que falhas não se propaguem, e que o estado global permaneça consistente.

Este documento define a hierarquia de coordenação da Ponte Digital: quem desperta quem, quem nunca chama quem, quem interrompe execução, quem quebra loops, quem mantém a verdade.

---

## Seção 1 — Hierarquia de Coordenação

### 1.1 A Pirâmide de Coordenação

```
                    ┌──────────────────────────────┐
                    │        COGNITIVE-             │
                    │        ORCHESTRATOR           │  ← Coordena ciclo de 10 estágios
                    │        (1 por sistema)        │
                    └──────────────┬───────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
     ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
     │ PERCEPTION     │   │ RITMO-ENGINE   │   │ ACTION-ENGINE  │
     │ ENGINE         │   │ (Ciclo         │   │ (Intervenção)  │
     │ (Sinal)        │   │  Agendado)     │   │                │
     └────────────────┘   └────────────────┘   └────────────────┘
              │                    │                    │
              ▼                    ▼                    ▼
     ┌──────────────────────────────────────────────────────┐
     │              ENGINES INDIVIDUAIS                      │
     │  context, analysis, hypothesis, validation, decision, │
     │  memory, learning, heritage, action, perception      │
     └──────────────────────────────────────────────────────┘
              │                    │                    │
              ▼                    ▼                    ▼
     ┌──────────────────────────────────────────────────────┐
     │                    PRISMA (Banco)                     │
     │              + prisma-tenant-safe                     │
     └──────────────────────────────────────────────────────┘
```

### 1.2 Regras de Coordenação

As regras seguem a Constituição da Engenharia (Leis 1-10) e são expandidas para o nível de sistema:

**Regra 1 — Orchestrator coordena, engines executam:**
O cognitive-orchestrator decide O QUE fazer (qual estágio, em que ordem). Cada engine decide COMO fazer (sua lógica interna). Nenhuma engine coordena outra engine — exceto dependências declaradas.

**Regra 2 — Ritmo-engine desperta ciclos, não engines:**
O ritmo-engine (ciclo agendado) não chama engines diretamente. Ele desperta o orchestrator, que então coordena o ciclo. Isto garante que o orchestrator mantenha controle do fluxo.

**Regra 3 — Nenhuma engine chama o orchestrator:**
Engines são chamadas PELO orchestrator. Elas nunca chamam o orchestrator de volta. Se uma engine precisa iniciar algo, ela publica um evento — e o orchestrator (ou outro subscriber) decide o que fazer.

**Regra 4 — Evento nunca chama engine diretamente:**
Eventos são publicados no cognitive-bus. Subscribers registrados recebem o evento e decidem se e como responder. Um evento nunca invoca uma engine específica — o subscriber decide.

**Regra 5 — Ação nunca chama raciocínio:**
Action-engine executa intervenções. Ela não inicia um novo ciclo de raciocínio. Se uma ação gera um resultado que precisa ser processado, o resultado é publicado como evento → perception-engine captura o evento → ciclo começa.

---

## Seção 2 — Quem chama quem

### 2.1 Mapa de Chamadas do Sistema

```
Estímulo Externo
  │
  ▼
cognitive-orchestrator.executarCiclo(estimulo)
  │
  ├──► perception-engine.processar(estimulo)
  │         │
  │         └──► (persiste sinal, retorna SinalProcessado)
  │
  ├──► context-engine.enriquecer(sinal)
  │         │
  │         ├──► relevance-engine.filtrar(contexto)
  │         └──► (persiste contexto, retorna ContextoEnriquecido)
  │
  ├──► analysis-engine.analisar(contexto)
  │         │
  │         ├──► evidence-engine.coletar(dominio)
  │         ├──► (detectores internos: padrões, anomalias, correlações)
  │         └──► (retorna Analise)
  │
  ├──► hypothesis-engine.formular(analise)
  │         │
  │         ├──► trust-engine.avaliar(evidencias)
  │         └──► (retorna Hipotese[])
  │
  ├──► [para cada hipótese] validation-engine.validar(hipotese)
  │         │
  │         ├──► trust-engine.avaliarConfiabilidade(hipotese)
  │         └──► (retorna HipoteseValidada)
  │
  ├──► decision-engine.decidir(hipoteses, contexto)
  │         │
  │         ├──► priority-engine.classificar(decisoes)
  │         └──► (retorna Decisao)
  │
  ├──► action-engine.executar(decisao)
  │         │
  │         └──► (cria notificação/tarefa/plano, retorna ResultadoExecucao)
  │
  ├──► memory-engine.registrar(ciclo)
  │         │
  │         └──► (persiste todo ciclo, retorna PatrimonioAtualizado)
  │
  └──► heritage-engine.consolidar(patrimonio)
            │
            └──► (atualiza conhecimento validado, métricas)
```

### 2.2 Chamadas Assíncronas (fora do ciclo)

```
ritmo-engine (timer)
  │
  └──► cognitive-orchestrator.executarCicloNoturno(empresaId)

action-engine (após ação concluída)
  │
  └──► (publica RESULTADO_OBSERVADO)
         │
         ▼
       learning-engine.processarResultado(decisaoId, resultado)

memory-engine (noturno)
  │
  └──► forgetting-engine.arquivar(empresaId)
  └──► (condensação de memória)
```

---

## Seção 3 — Quem nunca chama quem

| Chamada | Por que é proibida | Consequência se ocorrer |
|---------|-------------------|------------------------|
| Service → Engine | Lei 1 da Constituição | Cognição vira detalhe operacional |
| Engine → Prisma (diretamente) | Lei 2 da Constituição | Vazamento de dados entre empresas |
| Engine → Orchestrator | Regra 3 (este documento) | Loop de coordenação |
| UI → Engine (diretamente) | Lei 5 da Constituição | Regra de negócio no frontend |
| Evento → Engine específica | Regra 4 (este documento) | Acoplamento de evento a implementação |
| Ação → Raciocínio | Regra 5 (este documento) | Loop infinito ação→raciocínio→ação |
| API → Prisma | Lei 3 da Constituição | Lógica de negócio na API |

---

## Seção 4 — Quem desperta engines

| Despertador | Engine despertada | Quando |
|:-----------:|:-----------------:|--------|
| cognitive-orchestrator | perception-engine | Novo estímulo |
| cognitive-orchestrator | context-engine | Após sinal processado |
| cognitive-orchestrator | analysis-engine | Após contexto enriquecido |
| cognitive-orchestrator | hypothesis-engine | Após análise concluída |
| cognitive-orchestrator | validation-engine | Após hipótese formulada |
| cognitive-orchestrator | decision-engine | Após hipótese validada |
| cognitive-orchestrator | action-engine | Após decisão tomada |
| cognitive-orchestrator | memory-engine | Após ação executada |
| learning-engine (via evento) | heritage-engine | Após resultado observado |
| ritmo-engine | cognitive-orchestrator | Ciclo noturno/semanal/mensal |
| cognitive-bus (via evento) | Qualquer subscriber | Evento publicado |

---

## Seção 5 — Quem controla prioridades

### 5.1 Hierarquia de Prioridade no Sistema

| Nível | Controlador | O que prioriza |
|:-----:|:-----------:|----------------|
| Global | cognitive-orchestrator | Tipo de estímulo (CRÍTICO > IMPORTANTE > OPORTUNIDADE > SILÊNCIO) |
| Empresa | priority-engine | Fila de itens da empresa (URGENTE > IMPORTANTE > RISCO > OPORTUNIDADE) |
| Ciclo | cognitive-orchestrator | Ordem dos estágios (01 → 02 → ... → 10) |
| Execução | action-engine | Nível de intervenção (6 > 5 > ... > 0) |
| Evento | cognitive-bus | Tipo de evento (CRITICO > NORMAL > BACKGROUND) |

### 5.2 Regra de Preempção

Um ciclo de raciocínio de prioridade mais alta pode interromper um ciclo de prioridade mais baixa:

```
Ciclo em andamento (prioridade: NORMAL)
  │
  ▼ (chega estímulo CRÍTICO)
cognitive-orchestrator:
  1. Pausar ciclo atual (após estágio atual completar)
  2. Salvar estado do ciclo pausado
  3. Iniciar ciclo CRÍTICO
  4. Após ciclo CRÍTICO concluir → retomar ciclo pausado
```

### 5.3 Quando NÃO interromper

- Estágio 08 (Registro): nunca é interrompido — integridade do patrimônio primeiro
- Estágio 07 (Execução): nunca é interrompido se já iniciou — ação parcial não é segura

---

## Seção 6 — Quem cancela execução

### 6.1 Cancelamento de Ciclo

| Motivo | Quem cancela | O que acontece |
|--------|:-----------:|----------------|
| Sinal duplicado (hash) | perception-engine | Ciclo não inicia |
| Empresa sem atividade por 30+ dias | cognitive-orchestrator | Ciclo abortado, modo inatividade |
| Degradação nível 3+ | cognitive-orchestrator | Ciclo não inicia (apenas registro) |
| Erro no estágio 01 | cognitive-orchestrator | Ciclo abortado |
| Erro no estágio 08 (Registro) | cognitive-orchestrator | CRÍTICO — retry, ciclo não é descartado |
| Timeout de ciclo > 30s | cognitive-orchestrator | Ciclo abortado, marcar como FALHO |
| Empresário cancelou plano | action-engine | Plano cancelado, aprendizado registrado |

### 6.2 Cancelamento de Plano

Quando um plano (Nível 5) é cancelado:

```
1. action-engine marca plano como CANCELADO
2. learning-engine registra motivo do cancelamento
3. Hipóteses base do plano têm confiança reduzida (-10)
4. Próximo ciclo não re-cria o mesmo plano automaticamente
```

---

## Seção 7 — Quem interrompe loops

### 7.1 Tipos de Loop

| Tipo | Exemplo | Detecção | Interrupção |
|------|---------|:--------:|:-----------:|
| Ação → Sinal → Ação | Ação gera sinal que gera mesma ação | Hash de dedup | perception-engine bloqueia |
| Hipótese → Validação → Hipótese | Hipótese refutada → nova hipótese igual | Máximo de 3 tentativas | hypothesis-engine bloqueia |
| Pergunta → Resposta → Pergunta | Resposta incompleta gera nova pergunta | Máximo 3 por ciclo | orchestrator bloqueia |
| Ciclo → Erro → Ciclo | Erro no estágio 08 repete ciclo | Máximo 3 retries | orchestrator bloqueia |

### 7.2 Proteção contra Loop Infinito

O sistema tem um mecanismo de "circuit breaker" global:

```
Se o mesmo ciclo (mesmo correlationId) executa mais de 3 vezes:
  1. Orchestrator interrompe o ciclo
  2. Marca como FALHO com motivo "loop detectado"
  3. Notifica admin
  4. Empresa afetada entra em modo SILÊNCIO (Nível 0) por 1 hora
  5. Após 1 hora, ciclo pode ser tentado novamente
```

### 7.3 Proteção contra Loop de Engines

Se uma engine A chama engine B que chama engine A (ciclo de dependência):

```
ciclo de dependência: context → analysis → hypothesis → validation → decision → context
```

Este ciclo é intencional e seguro porque:
- Cada chamada é um novo estágio (01 → 02 → ... → 10)
- O orchestrator controla a sequência — nenhuma engine chama outra diretamente
- Se o ciclo tentar re-processar o mesmo sinal, o hash de dedup bloqueia

---

## Seção 8 — Quem coordena pipelines

### 8.1 Pipelines do Sistema

O sistema tem 4 pipelines principais:

**Pipeline 1 — Ciclo Cognitivo (orquestrado pelo cognitive-orchestrator):**
Percepção → Contexto → Análise → Hipótese → Validação → Decisão → Ação → Registro

**Pipeline 2 — Ciclo Noturno (orquestrado pelo ritmo-engine + orchestrator):**
Observação acumulada → Revalidação → Condensação → Arquivamento → Aprendizado

**Pipeline 3 — Aquisição Cognitiva (orquestrado pelo perception-engine):**
Importação → Classificação → Sinal → Enfileiramento → Ciclo Cognitivo

**Pipeline 4 — Aprendizado Coletivo (orquestrado pelo learning-engine):**
Resultado → Anonimização → Extração de padrão → Distribuição

### 8.2 Coordenação entre Pipelines

```
Pipeline 3 (Aquisição)
  │
  ▼ (produz sinal)
Pipeline 1 (Ciclo Cognitivo)
  │
  ▼ (produz decisão + ação)
Pipeline 1 → resultado → Pipeline 4 (Aprendizado Coletivo)
  │
  ▼ (acumula observações)
Pipeline 2 (Ciclo Noturno)
  │
  ▼ (realimenta)
Pipeline 1 (novo ciclo com conhecimento atualizado)
```

---

## Seção 9 — Quem mantém consistência

### 9.1 Guardiões de Consistência

| Guardião | O que protege | Mecanismo |
|:--------:|:-------------:|-----------|
| cognitive-orchestrator | Fluxo do ciclo | Estágios executados em ordem, sem pulos |
| prisma-tenant-safe | Isolamento entre empresas | empresaId obrigatório em toda query |
| perception-engine (hash) | Deduplicação de sinal | Hash SHA256 do conteúdo do estímulo |
| hypothesis-engine (limite) | Máximo de hipóteses | 7 ativas por domínio |
| memory-engine (não deleta) | Preservação de patrimônio | Soft delete, archived, nunca hard delete |
| learning-engine (refutação) | Correição de conhecimento | Evidência contrária reduz confiança, não apaga |
| heartbeat | Saúde do sistema | Verificação periódica de todas as engines |

### 9.2 Regra de Ouro da Consistência

**Nenhuma operação pode destruir conhecimento.**
- Soft delete em todos os modelos (deletedAt)
- Hipóteses refutadas são ARQUIVADAS, não deletadas
- Decisões erradas são REGISTRADAS como erro, não apagadas
- Conhecimento desatualizado é ARQUIVADO, não removido

---

## Seção 10 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. A maioria dos problemas de orquestração não está em "quem chama quem" (que já está definido) — está em "quem interrompe o quê". Loops e cancelamentos precisam de regras explícitas.
2. O cognitive-orchestrator é o ponto único de coordenação — sua falha paralisa todo o sistema. Mas isso é aceitável porque sua lógica é simples (sequenciar estágios, sem lógica de negócio).
3. A hierarquia de prioridade em 5 níveis (global, empresa, ciclo, execução, evento) evita conflitos de prioridade entre diferentes escalas.

### Pressupostos

1. **P1:** O cognitive-orchestrator consegue processar todas as empresas em uma única thread sem gargalo.
2. **P2:** 3 retries por ciclo é suficiente — ciclos que falham 3+ vezes têm problemas que exigem intervenção manual.
3. **P3:** O hash de deduplicação (SHA256 do conteúdo) é suficiente para evitar loops de ação→sinal→ação.

### Lacunas

1. **L1:** O mecanismo de "pausar ciclo" para preempção (Seção 5.2) não foi detalhado — como salvar e restaurar estado de um ciclo parcialmente executado?
2. **L2:** Circuit breaker global precisa de um timeout de reset — quanto tempo esperar antes de tentar novamente?
3. **L3:** A coordenação entre pipelines (Seção 8.2) não especifica quem gerencia a fila entre eles.

### Riscos

1. **R1 — Gargalo no orchestrator:** Se o orchestrator processa ciclos sequencialmente, o throughput máximo é limitado. Mitigação: cada ciclo é leve (~1.5s), então centenas de empresas podem ser processadas por minuto.
2. **R2 — Loop não detectado:** Se o hash de dedup não cobre todos os casos (ex.: mesmo conteúdo semântico mas serialização diferente), loops podem escapar. Mitigação: circuit breaker global como proteção final.
3. **R3 — Cancelamento incorreto:** Se um ciclo é cancelado no momento errado (estágio 08), patrimônio pode ficar inconsistente. Mitigação: estágios 07 e 08 nunca são interrompidos.

### Conflitos

Nenhum conflito encontrado. Consistente com a Constituição (Leis 1-10) e com a arquitetura de orquestração existente.

### Impacto Futuro

1. A separação em 4 pipelines independentes permite escalar cada um separadamente.
2. As regras de "quem nunca chama quem" previnem violações de camada mesmo em código novo.
3. O circuit breaker global protege contra loops não previstos sem exigir detecção perfeita.
