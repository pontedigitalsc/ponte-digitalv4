# Eventos Cognitivos da Empresa Zero

**Propósito:** Mapear os eventos reais que a Empresa Zero deve gerar ao operar. Cada evento é um dado cognitivo — não apenas um registro técnico.

---

## 1. Eventos de Empresa

Eventos que marcam o ciclo de vida da própria Ponte Digital.

| Evento | Disparo | Dados associados |
|--------|---------|------------------|
| `empresa_criada` | Fundador cria a empresa no sistema | nome, data, plano inicial |
| `empresa_ativada` | Primeiro login com dados reais | data_primeiro_uso, modulo_inicial |
| `empresa_expandida` | Primeiro lead externo registrado | data, origem_lead |
| `empresa_inativa` | 7 dias sem atividade do fundador | data_ultimo_acesso, dias_inativo |

### Observação
A Empresa Zero já está criada (`cms17tcgu0000g4vrmuq11cgw`). O evento `empresa_criada` já ocorreu. O marco `empresa_ativada` será registrado quando o fundador começar a usar o sistema com dados reais da operação.

---

## 2. Eventos Comerciais

Eventos que mapeiam o ciclo de vendas real.

| Evento | Disparo | Dados associados |
|--------|---------|------------------|
| `lead_criado` | Novo lead registrado no CRM | origem, temperatura, valor_estimado |
| `contato_realizado` | Primeiro contato com lead | canal (whatsapp/email/presencial), data, resumo |
| `diagnostico_iniciado` | Lead inicia diagnóstico | lead_id, data_inicio |
| `diagnostico_completo` | Lead conclui diagnóstico | lead_id, perguntas_respondidas, tempo_total |
| `proposta_enviada` | Proposta formal enviada ao lead | valor, prazo, escopo_resumido |
| `negociacao_iniciada` | Lead entra em negociação | contraproposta_valor, objeções |
| `venda_realizada` | Lead fecha contrato | lead_id, valor_fechado, plano, ciclo_dias |
| `venda_perdida` | Lead fecha como perdido | motivo, estagio_final, concorrente (se souber) |

### Métricas derivadas
- Taxa de conversão por estágio: CONTATO → DIAGNOSTICO → PROPOSTA → FECHADO
- Ciclo médio de venda (dias)
- Ticket médio
- Fontes de lead mais eficientes

---

## 3. Eventos de Conhecimento

Eventos que registram a evolução do patrimônio intelectual.

| Evento | Disparo | Dados associados |
|--------|---------|------------------|
| `hipotese_criada` | Fundador registra hipótese no Diário Cognitivo | categoria, descrição, confianca_inicial |
| `hipotese_testada` | Hipótese submetida a teste prático | resultado, data_teste, evidencia_coletada |
| `hipotese_validada` | Evidência confirma hipótese (confiança ≥ 60) | score_final, numero_evidencias |
| `hipotese_rejeitada` | Evidência contradiz hipótese | score_final, contra_evidencia |
| `decisao_registrada` | Decisão formal documentada | contexto, alternativas, impacto_esperado |
| `decisao_revisada` | Decisão anterior reavaliada | decisao_id, resultado_observado, nova_decisao |
| `padrao_identificado` | Padrão recorrente percebido pelo fundador | descricao, frequencia, dominio |
| `aprendizado_consolidado` | Aprendizado com confiança ≥ 70 registrado | categoria, confianca, fontes |

---

## 4. Eventos de Valor

Eventos que marcam momentos de valor real entregue.

| Evento | Disparo | Dados associados |
|--------|---------|------------------|
| `primeiro_valor_entregue` | Primeiro insight que ajudou o fundador a decidir | data, descricao, impacto |
| `problema_resolvido` | Problema operacional resolvido pelo sistema | tipo, tempo_resolucao, satisfacao |
| `recomendacao_aceita` | Recomendação do sistema foi seguida | recomendacao, resultado, acao_tomada |
| `feedback_positivo` | Feedback AJUDOU registrado | modulo, acao_cognitiva_id |
| `feedback_negativo` | Feedback NAO_AJUDOU registrado | modulo, acao_cognitiva_id, motivo |
| `ciclo_completado` | Ciclo cognitivo (observar → decidir → agir → aprender) concluído | tempo_ciclo, decisoes_tomadas, aprendizados_gerados |

---

## 5. Eventos de Risco

Eventos que indicam perigo ou desvio.

| Evento | Disparo | Severidade |
|--------|---------|------------|
| `churn_sinal` | Cliente sem login por 7+ dias | ALTA |
| `inatividade_cognitiva` | Nenhum aprendizado registrado em 7 dias | MÉDIA |
| `decisao_atrasada` | Decisão importante não tomada no prazo | MÉDIA |
| `objetivo_desviado` | Ação tomada contradiz objetivo registrado | BAIXA |
| `promessa_nao_cumprida` | Tarefa ou compromisso com cliente vencido | ALTA |

---

## 6. Integração com o Sistema Atual

### Eventos já existentes no schema

O modelo `EventoAtivacao` (`src/engine/tipos.ts`) já define:

| Evento no sistema | Evento cognitivo correspondente |
|-------------------|--------------------------------|
| `DIAGNOSTICO_COMPLETO` | `diagnostico_completo` |
| `IDENTIDADE_CRIADA` | — |
| `PRIMEIRA_DECISAO_VISTA` | — |
| `PRIMEIRA_ACAO_CRIADA` | — |
| `PRIMEIRA_ACAO_CONCLUIDA` | — |
| `PRIMEIRO_FEEDBACK` | `feedback_positivo` / `feedback_negativo` |
| `PRIMEIRO_RETORNO` | `primeiro_valor_entregue` |
| `CONVERSA_MENSAL_REALIZADA` | — |

### Próximo passo

Os eventos cognitivos da Empresa Zero não exigem novo schema ou código. Eles devem ser registrados como:
- **Entradas no Diário Cognitivo** (descobertas, hipóteses, decisões)
- **Histórico** (`TipoHistorico` no model `Historico`)
- **Sinais** (`HistoricoSinal` no motor cognitivo)
