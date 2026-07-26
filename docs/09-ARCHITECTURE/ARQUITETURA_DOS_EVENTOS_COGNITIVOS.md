# Arquitetura dos Eventos Cognitivos

> **Programa 12 — Fase 4: Sistema Cognitivo Completo (Nível Sistema Operacional)**
> Versão: 1.0
> Propósito: Catálogo completo de todos os eventos do sistema cognitivo

---

## Preâmbulo

O sistema cognitivo inteiro é orientado a eventos. Tudo que acontece — uma conversa, uma importação, um ciclo noturno, uma decisão, um aprendizado — é um evento que trafega pelo cognitive-bus.

Este documento cataloga todos os eventos do sistema, organizados por origem e função. É o dicionário completo de comunicação da Ponte Digital.

---

## Seção 1 — Convenções

### 1.1 Formato de Evento

```typescript
interface EventoCognitivo {
  id: string;                    // uuid
  tipo: string;                  // "DOMINIO.NOME"
  correlationId: string;         // rastreia toda a cadeia causal
  origem: string;                // engine ou subsistema que gerou
  empresaId: string;             // tenant (quando aplicável)
  dados: Record<string, unknown>; // payload específico do evento
  timestamp: string;             // ISO 8601
  prioridade: 'CRITICA' | 'NORMAL' | 'BACKGROUND';
  versao: number;                // versão do schema do evento
}
```

### 1.2 Namespaces de Eventos

| Namespace | Prefixo | Origem |
|-----------|:-------:|--------|
| Sistema | `SISTEMA.` | cognitive-orchestrator, heartbeat |
| Empresa | `EMPRESA.` | lifecycle de empresa |
| Sessão | `SESSAO.` | sessão do empresário |
| Sinal | `SINAL.` | perception-engine |
| Contexto | `CONTEXTO.` | context-engine |
| Análise | `ANALISE.` | analysis-engine |
| Hipótese | `HIPOTESE.` | hypothesis-engine |
| Decisão | `DECISAO.` | decision-engine |
| Ação | `ACAO.` | action-engine |
| Memória | `MEMORIA.` | memory-engine |
| Aprendizado | `APRENDIZADO.` | learning-engine |
| Patrimônio | `PATRIMONIO.` | heritage-engine |
| Ciclo | `CICLO.` | cognitive-orchestrator |
| Coletivo | `COLETIVO.` | collective intelligence |
| IA | `IA.` | conversation-engine (apenas tradutor) |
| Erro | `ERRO.` | qualquer engine |
| Degradação | `DEGRADACAO.` | heartbeat, orchestrator |
| Evolução | `EVOLUCAO.` | evolution-engine |

---

## Seção 2 — Eventos Internos

### 2.1 Eventos de Sistema

| Evento | Publisher | Payload | Quando |
|--------|:---------:|---------|-------|
| `SISTEMA.INICIADO` | cognitive-orchestrator | `{ modo: 'NORMAL' \| 'RECUPERACAO', tempoBoot: ms }` | Após boot completo |
| `SISTEMA.FINALIZADO` | cognitive-orchestrator | `{ motivo: 'SHUTDOWN' \| 'CRASH', ciclosPendentes: number }` | Durante shutdown |
| `SISTEMA.HEARTBEAT` | cognitive-orchestrator | `{ engines: Record<string, 'OK' \| 'TIMEOUT' \| 'ERRO'>, cache: 'OK' \| 'CORROMPIDO', fila: { tamanho: number, maisAntigo: ms } }` | A cada 60s |
| `SISTEMA.DEGRADACAO` | cognitive-orchestrator | `{ nivel: 1-4, motivo: string, enginesAfetadas: string[] }` | Quando nível de degradação muda |
| `SISTEMA.RECUPERACAO` | cognitive-orchestrator | `{ nivelAnterior: number, nivelAtual: 0 }` | Quando sistema volta ao normal |
| `SISTEMA.VERSAO` | cognitive-orchestrator | `{ versao: string, enginesAtualizadas: string[] }` | Após atualização |

### 2.2 Eventos de Engine

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `SISTEMA.ENGINE.REGISTRADA` | cognitive-orchestrator | Engine registrada no boot |
| `SISTEMA.ENGINE.REMOVIDA` | cognitive-orchestrator | Engine removida (degradação) |
| `SISTEMA.ENGINE.TIMEOUT` | heartbeat | Engine não respondeu |
| `SISTEMA.ENGINE.RECUPERADA` | heartbeat | Engine voltou a responder |

---

## Seção 3 — Eventos Externos

| Evento | Origem | Payload | Quando |
|--------|:------:|---------|-------|
| `SISTEMA.DEPLOY` | Infra (webhook) | `{ versao: string, timestamp: string }` | Novo deploy |
| `SISTEMA.BACKUP` | Infra (cron) | `{ status: 'SUCESSO' \| 'FALHA', tamanho: bytes }` | Backup realizado |
| `SISTEMA.ALERTA.INFRA` | Monitoramento | `{ tipo: 'CPU' \| 'MEMORIA' \| 'DISCO' \| 'BANCO', valor: number, threshold: number }` | Métrica de infra fora do limite |

---

## Seção 4 — Eventos do Empresário

| Evento | Origem | Quando |
|--------|:------:|--------|
| `EMPRESA.CRIADA` | auth/criar-conta | Nova empresa registrada |
| `EMPRESA.ATIVADA` | cognitive-orchestrator | Empresa pronta para processamento |
| `EMPRESA.INATIVA` | cognitive-orchestrator | 30 dias sem login |
| `EMPRESA.REATIVADA` | cognitive-orchestrator | Empresa voltou após inatividade |
| `EMPRESA.CANCELADA` | billing | Empresa cancelou plano |
| `SESSAO.INICIADA` | auth | Empresário fez login |
| `SESSAO.FINALIZADA` | auth | Empresário saiu (timeout ou logout) |
| `SESSAO.INTERACAO` | frontend | Empresário clicou/navegou |
| `SESSAO.PERDIDA` | auth | Sessão expirou por inatividade |
| `EMPRESARIO.RESPOSTA.PERGUNTA` | conversation-engine | Empresário respondeu uma pergunta |
| `EMPRESARIO.RESPOSTA.RECOMENDACAO` | decision-engine | Empresário aceitou/rejeitou recomendação |
| `EMPRESARIO.RESPOSTA.PLANO` | action-engine | Empresário aprovou/cancelou plano |
| `EMPRESARIO.ENSINO` | conversation-engine | Empresário ensinou algo explicitamente |
| `EMPRESARIO.DESENSINO` | conversation-engine | Empresário desensinou algo |
| `EMPRESARIO.FEEDBACK` | feedback-intelligence-engine | Empresário deu feedback geral |
| `EMPRESARIO.VETO` | decision-engine | Empresário vetou uma decisão automática |
| `EMPRESARIO.SILENCIO` | cognitive-orchestrator | Empresário ignorou N intervenções consecutivas |

---

## Seção 5 — Eventos Automáticos

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `SINAL.GERADO` | perception-engine | Novo sinal processado |
| `SINAL.DEDUPLICADO` | perception-engine | Sinal ignorado (já processado) |
| `SINAL.PRIORIZADO` | perception-engine | Sinal classificado na fila |
| `CONTEXTO.MONTADO` | context-engine | Novo contexto enriquecido produzido |
| `CONTEXTO.EXPIRADO` | context-engine | Contexto excedeu TTL |
| `CONTEXTO.INVALIDADO` | context-engine | Contexto foi invalidado (mudança de domínio) |
| `ANALISE.CONCLUIDA` | analysis-engine | Análise finalizada |
| `ANALISE.ANOMALIA` | analysis-engine | Anomalia detectada |
| `ANALISE.PADRAO` | analysis-engine | Padrão detectado |
| `ANALISE.CORRELACAO` | analysis-engine | Correlação detectada |
| `ANALISE.TENDENCIA` | analysis-engine | Tendência detectada |
| `ANALISE.REGRESSAO` | analysis-engine | Regressão detectada |
| `HIPOTESE.FORMULADA` | hypothesis-engine | Nova hipótese criada |
| `HIPOTESE.CONFIRMADA` | validation-engine | Hipótese confirmada |
| `HIPOTESE.REFUTADA` | validation-engine | Hipótese refutada |
| `HIPOTESE.DESCARTADA` | validation-engine | Hipótese descartada (confiança < 20) |
| `HIPOTESE.ARQUIVADA` | memory-engine | Hipótese arquivada (limite de 7) |
| `HIPOTESE.REVALIDACAO` | validation-engine | Hipótese entrou em revalidação (90 dias) |
| `DECISAO.TOMADA` | decision-engine | Nova decisão produzida |
| `DECISAO.SILENCIO` | decision-engine | Decisão foi não intervir |
| `DECISAO.URGENTE` | decision-engine | Decisão classificada como URGENTE |
| `DECISAO.RISCO` | decision-engine | Decisão classificada como RISCO |
| `DECISAO.OPORTUNIDADE` | decision-engine | Decisão classificada como OPORTUNIDADE |
| `DECISAO.VETADA` | decision-engine | Decisão vetada pelo empresário |
| `DECISAO.EXECUTADA` | action-engine | Ação da decisão foi executada |
| `DECISAO.FALHA` | action-engine | Ação falhou ao executar |
| `ACAO.CRIADA.TAREFA` | action-engine | Tarefa automática criada |
| `ACAO.CRIADA.NOTIFICACAO` | action-engine | Notificação criada |
| `ACAO.CRIADA.PERGUNTA` | action-engine | Pergunta criada |
| `ACAO.CRIADA.PLANO` | action-engine | Plano criado |
| `ACAO.CONCLUIDA` | action-engine | Tarefa/plano concluído com sucesso |
| `ACAO.CANCELADA` | action-engine | Tarefa/plano cancelado |
| `ACAO.PROGRESSO` | action-engine | Acompanhamento reportou progresso |
| `ACAO.ATRASADA` | action-engine | Tarefa/plano atrasado |
| `ACAO.ABANDONADA` | action-engine | Tarefa/plano sem progresso por 30 dias |

---

## Seção 6 — Eventos de IA

A IA (modelo de linguagem) é apenas tradutora de contexto (ADR-017). Seus eventos são limitados:

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `IA.TRADUCAO.INICIADA` | conversation-engine | IA recebeu contexto para traduzir |
| `IA.TRADUCAO.CONCLUIDA` | conversation-engine | IA devolveu tradução |
| `IA.TRADUCAO.FALHA` | conversation-engine | IA não conseguiu traduzir |
| `IA.TRADUCAO.TIMEOUT` | conversation-engine | IA excedeu tempo de resposta |
| `IA.TRADUCAO.TAMANHO` | conversation-engine | Contexto excedeu limite de tokens |
| `IA.MODELO.TROCADO` | conversation-engine | Modelo de IA foi trocado (ex.: Claude→GPT) |

**Eventos que a IA NUNCA gera:**
- `IA.DECISAO.*` — IA não decide
- `IA.HIPOTESE.*` — IA não formula hipóteses
- `IA.ANALISE.*` — IA não analisa

---

## Seção 7 — Eventos de Aprendizado

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `APRENDIZADO.REGISTRADO` | learning-engine | Novo aprendizado registrado |
| `APRENDIZADO.RESULTADO.POSITIVO` | learning-engine | Decisão teve resultado positivo |
| `APRENDIZADO.RESULTADO.NEGATIVO` | learning-engine | Decisão teve resultado negativo |
| `APRENDIZADO.CONHECIMENTO.VALIDADO` | learning-engine | Hipótese virou Conhecimento Validado |
| `APRENDIZADO.CONHECIMENTO.REFUTADO` | learning-engine | Conhecimento validado foi refutado |
| `APRENDIZADO.CONHECIMENTO.REVALIDADO` | learning-engine | Conhecimento revalidado com sucesso |
| `APRENDIZADO.PADRAO.DESCOBERTO` | learning-engine | Novo padrão descoberto (aprendizado inferido) |
| `APRENDIZADO.CICLO.CONCLUIDO` | learning-engine | Ciclo de aprendizado noturno concluído |

---

## Seção 8 — Eventos de Crise

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `CRISE.FINANCEIRA` | analysis-engine | Score de crise financeira ≥ 7 |
| `CRISE.CLIENTES` | analysis-engine | Churn abrupto, perda de cliente relevante |
| `CRISE.OPERACIONAL` | analysis-engine | Gargalo operacional crítico |
| `CRISE.ABANDONO` | analysis-engine | Empresário sem login por 30+ dias |
| `CRISE.CONHECIMENTO` | learning-engine | Conhecimento validado refutado em massa |
| `CRISE.IA` | conversation-engine | IA falhou repetidamente (3+ vezes) |
| `CRISE.SISTEMA` | cognitive-orchestrator | Degradação nível 3 ou 4 |
| `CRISE.RESOLVIDA` | cognitive-orchestrator | Estado de crise encerrado |

---

## Seção 9 — Eventos de Reconstrução

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `RECONSTRUCAO.INICIADA` | cognitive-orchestrator | Reconstrução cognitiva começou (nova empresa) |
| `RECONSTRUCAO.ETAPA.CONCLUIDA` | cognitive-orchestrator | Etapa de reconstrução finalizada |
| `RECONSTRUCAO.LACUNA.IDENTIFICADA` | context-engine | Lacuna de conhecimento detectada |
| `RECONSTRUCAO.CONHECIMENTO.ADICIONADO` | heritage-engine | Novo conhecimento inserido na reconstrução |
| `RECONSTRUCAO.PROGRESSO` | cognitive-orchestrator | Percentual de reconstrução concluído |
| `RECONSTRUCAO.CONCLUIDA` | cognitive-orchestrator | Empresa reconstruída (conhecimento mínimo atingido) |

---

## Seção 10 — Eventos de Evolução

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `EVOLUCAO.FASE.NOVA` | evolution-engine | Empresa atingiu nova fase de maturidade |
| `EVOLUCAO.REGRESSAO` | evolution-engine | Empresa regrediu de fase |
| `EVOLUCAO.PLATO` | evolution-engine | Empresa estagnou em uma fase |
| `EVOLUCAO.SCORE.ATUALIZADO` | evolution-engine | Score de evolução foi recalculado |
| `EVOLUCAO.MARCO.ATINGIDO` | cognitive-milestone-engine | Marco importante alcançado |
| `EVOLUCAO.OBJETIVO.CONCLUIDO` | decision-engine | Objetivo ativo concluído |

---

## Seção 11 — Eventos de Patrimônio

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `PATRIMONIO.ATUALIZADO` | heritage-engine | Patrimônio consolidado (fim do ciclo) |
| `PATRIMONIO.CONDENSADO` | memory-engine | Memória condensada (noturno) |
| `PATRIMONIO.ARQUIVADO` | memory-engine | Conhecimento arquivado por tempo |
| `PATRIMONIO.REATIVADO` | memory-engine | Conhecimento arquivado reativado |
| `PATRIMONIO.VERSAO` | heritage-engine | Versão do patrimônio incrementada |
| `PATRIMONIO.METRICAS` | heritage-engine | Métricas de saúde do patrimônio |
| `PATRIMONIO.COLETIVO.ATUALIZADO` | collective engine | Padrão coletivo atualizado |

---

## Seção 12 — Eventos de Ciclo

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `CICLO.INICIADO` | cognitive-orchestrator | Novo ciclo cognitivo começou |
| `CICLO.ESTAGIO.INICIADO` | cognitive-orchestrator | Estágio N do ciclo começou |
| `CICLO.ESTAGIO.CONCLUIDO` | cognitive-orchestrator | Estágio N do ciclo concluiu |
| `CICLO.ESTAGIO.FALHA` | cognitive-orchestrator | Estágio N do ciclo falhou |
| `CICLO.CONCLUIDO` | cognitive-orchestrator | Ciclo completo finalizado |
| `CICLO.FALHO` | cognitive-orchestrator | Ciclo falhou (crítico) |
| `CICLO.PAUSADO` | cognitive-orchestrator | Ciclo pausado (preempção) |
| `CICLO.RETOMADO` | cognitive-orchestrator | Ciclo retomado após pausa |
| `CICLO.NOTURNO.INICIADO` | ritmo-engine | Ciclo noturno começou |
| `CICLO.NOTURNO.CONCLUIDO` | ritmo-engine | Ciclo noturno concluído |
| `CICLO.NOTURNO.FALHA` | ritmo-engine | Ciclo noturno falhou |

---

## Seção 13 — Eventos Coletivos

| Evento | Publisher | Quando |
|--------|:---------:|--------|
| `COLETIVO.PADRAO.NOVO` | collective engine | Novo padrão coletivo descoberto |
| `COLETIVO.PADRAO.ATUALIZADO` | collective engine | Padrão coletivo atualizado com novos dados |
| `COLETIVO.PADRAO.REMOVIDO` | collective engine | Padrão coletivo removido (não mais estatisticamente significativo) |
| `COLETIVO.METRICAS` | collective engine | Métricas do coletivo (N empresas, N padrões) |
| `COLETIVO.SAUDE` | collective engine | Saúde do aprendizado coletivo |

---

## Seção 14 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. O sistema tem aproximadamente 100 eventos distribuídos em 13 categorias — cada evento representa uma transição de estado significativa.
2. A maioria dos eventos (70%) são publicados por engines do ciclo cognitivo (perception → heritage).
3. Eventos de crise e eventos de aprendizado são os mais críticos para rastreabilidade — permitem auditar por que uma decisão foi tomada e qual foi seu resultado.

### Pressupostos

1. **P1:** O cognitive-bus existente (EventEmitter) suporta o volume de ~100 tipos de evento sem degradação.
2. **P2:** O formato de evento com versão (versao: number) permite evolução futura sem quebrar subscribers.
3. **P3:** Eventos de crise têm prioridade máxima no bus e sempre são processados antes de eventos NORMAL.

### Lacunas

1. **L1:** Não foi especificada a política de retenção de eventos no event-store — quantos dias manter? Qual o TTL por tipo?
2. **L2:** A migração de versão de evento (ex.: versão 1 → 2) não foi detalhada — subscribers antigos continuam funcionando?
3. **L3:** Eventos entre instâncias (futuro multi-instância) não foram contemplados — o bus atual é in-memory.

### Riscos

1. **R1 — Explosão de eventos:** Se cada estágio de cada empresa gera eventos, o volume pode crescer sem controle. Mitigação: eventos têm prioridade — BACKGROUND pode ser descartado em pico.
2. **R2 — Acoplamento por evento:** Se um subscriber depende de um evento que muda de formato, quebra. Mitigação: versão de evento + testes de compatibilidade.
3. **R3 — Evento órfão:** Um evento publicado mas sem subscriber não é processado. Mitigação: evento sem subscriber é logado como WARNING.

### Conflitos

Nenhum conflito. O catálogo é consistente com ADR-011 (Event Bus formal), ADR-012 (Catálogo de eventos de negócio) e o cognitive-bus existente.

### Impacto Futuro

1. O catálogo completo permite que qualquer novo subsistema saiba exatamente quais eventos publicar e consumir.
2. A separação por namespace facilita a manutenção — novos eventos seguem o padrão existente.
3. Eventos com versão permitem evolução do schema sem quebrar subscribers existentes.
