# Valor Líquido da Primeira Experiência

> PROGRAMA 15 — Documento 7 de 10
> Como medir se a primeira experiência realmente ajuda: reduz tempo, ansiedade, erro; aumenta clareza, confiança, chance de uso contínuo

---

## Relatório de execução

- **Descobertas:** não existem métricas de experiência do usuário hoje. As métricas existentes são técnicas (engines, pipelines, observatório cognitivo). Não há coleta de NPS, satisfação, ou valor percebido.
- **Pressupostos:** as métricas propostas aqui são todas coletáveis via sistema (eventos, timestamps, taxas) + 1 pergunta opcional ao final do resumo.
- **Lacunas:** nenhuma coleta de feedback do empresário existe hoje na primeira experiência. O resumo não pergunta "isso foi útil?". A criação de conta não pergunta "por que você decidiu criar?".
- **Riscos:** adicionar perguntas de feedback pode introduzir fricção. Cada pergunta de feedback precisa ser justificada pelo valor que gera.
- **Conflitos:** nenhum.
- **Impactos futuros:** as métricas definidas aqui serão os critérios objetivos para decidir se a primeira experiência está funcionando. Devem ser monitoradas continuamente.
- **Confirmação de coerência:** coerente com a Auditoria de Valor da Jornada Fundacional (Capítulo 9) e com o Eixo 7 do Programa 15.

---

## 1. O que é Valor Líquido

**Valor Líquido = Valor Entregue − Custo (tempo + atenção + confiança)**

Uma interação tem valor líquido positivo se o empresário sai dela melhor do que entrou. O cálculo é subjetivo, mas pode ser aproximado por métricas objetivas.

### 1.1 Componentes do valor

| Componente | Definição | Medidor |
|------------|-----------|---------|
| Tempo economizado | Minutos que ele não precisou gastar fazendo manualmente | Comparação com alternativa (planilha, contador) |
| Ansiedade reduzida | Sensação de "não estou perdendo o controle" | Pesquisa de satisfação |
| Erro evitado | Decisão que ele não teria tomado sozinho e daria errado | Acompanhamento de outcomes |
| Clareza aumentada | Entendimento do estado real do negócio | Pergunta "você entendeu a situação?" |
| Confiança aumentada | Disposição a seguir recomendações futuras | Taxa de aceitação de sugestões |
| Uso contínuo | Volta a usar o sistema | Retenção D1, D7, D30 |

### 1.2 Componentes do custo

| Componente | Definição | Medidor |
|------------|-----------|---------|
| Tempo gasto | Minutos gastos na interação | Timestamps de início e fim |
| Atenção consumida | Esforço mental necessário | Taxa de abandono, tempo por pergunta |
| Confiança arriscada | Potencial de dano se a experiência for ruim | NPS, feedback negativo |

---

## 2. Métricas por interação

### 2.1 Entrada (landing page)

| Métrica | Como medir | Meta |
|---------|------------|------|
| Taxa de clique no CTA | Cliques / visitas | > 30% |
| Tempo na página | Timestamp de entrada → clique | < 10s (decisão rápida) |
| Taxa de rejeição | Saídas sem interagir | < 50% |
| Origem do tráfego | UTM parameters | — |

### 2.2 Diagnóstico (conversa)

| Métrica | Como medir | Meta |
|---------|------------|------|
| Taxa de conclusão | Concluíram / Iniciaram | > 60% |
| Tempo total no diagnóstico | Timestamp 1ª pergunta → último resposta | < 8 min |
| Tempo médio por pergunta | Timestamps individuais | < 30s |
| Taxa de abandono por bloco | Saídas em cada bloco | Bloco 3 < 15% |
| Respostas não respondidas | Perguntas puladas (se houver opção) | < 5% |
| Comprimento médio das respostas | Caracteres por resposta | > 20 chars (indica reflexão) |
| Taxa de retomada | Voltar ao diagnóstico após pausa | > 10% |

### 2.3 Resumo

| Métrica | Como medir | Meta |
|---------|------------|------|
| Tempo no resumo | Timestamp de exibição → próxima ação | > 20s (leu) |
| Taxa de clique em "criar conta" | Cliques / visualizações | > 15% |
| Taxa de clique em "guardar e ver depois" | Cliques / visualizações | > 5% |
| Compartilhamento | Links de acesso externo gerados | > 2% |
| Pergunta pós-resumo: "Isso foi útil?" | Resposta opcional ao final | > 80% "sim" |

### 2.4 Criação de conta

| Métrica | Como medir | Meta |
|---------|------------|------|
| Taxa de conclusão do formulário | Iniciaram / Finalizaram | > 70% |
| Tempo no formulário | Timestamps | < 2 min |
| Taxa de abandono no formulário | Saíram sem finalizar | < 30% |
| Erros de validação | Validação de e-mail/senha | < 10% |
| Contas criadas / diagnóstico concluído | Conversão geral | > 15% |

### 2.5 Primeiro login

| Métrica | Como medir | Meta |
|---------|------------|------|
| Tempo no dashboard | Timestamp de entrada → próxima ação | > 30s |
| Cliques no primeiro dia | Interações totais | > 5 cliques |
| Uso do Assistente no primeiro login | Mensagens enviadas | > 1 mensagem |
| Acesso a módulo bloqueado | Tentativas de clique em item acinzentado | < 3 (indica frustração) |
| Retorno D1 | Voltou no dia seguinte | > 40% |
| Retorno D7 | Voltou em 7 dias | > 20% |
| Retorno D30 | Voltou em 30 dias | > 10% |

---

## 3. Métricas de valor líquido

### 3.1 Fórmulas

**Valor Líquido do Diagnóstico:**
```
ValorDiagnóstico = (TaxaConclusão × 0.3) + (TempoResumo > 20s × 0.3) + (FeedbackPositivo × 0.4)
CustoDiagnóstico = TempoMédio / 8min (normalizado, >1 é negativo)
ValorLíquido = ValorDiagnóstico − CustoDiagnóstico
```

**Valor Líquido da Transição:**
```
ValorTransição = TaxaConversão × 0.5 + RetornoD7 × 0.5
CustoTransição = 1 − TaxaConclusãoFormulário
ValorLíquido = ValorTransição − CustoTransição
```

### 3.2 Métricas compostas

| Métrica | Fórmula | Interpretação |
|---------|---------|---------------|
| Índice de Engajamento Inicial | Conclusão × Conversão × RetornoD1 | > 0.15 = bom |
| Índice de Fricção | AbandonoBloco3 + AbandonoFormulário | < 0.3 = baixo |
| Índice de Confiança | FeedbackPositivo × RetornoD7 | > 0.5 = confia |
| Índice de Valor Percebido | TempoResumo × Conversão | > 3 = percebeu valor |

---

## 4. Como coletar

### 4.1 Coleta automática (via sistema)

| Dado | Fonte |
|------|-------|
| Timestamps de cada etapa | `Conversa.updatedAt`, `EventoAtivacao.data` |
| Taxas de conclusão | Eventos de ativação (DIAGNOSTICO_COMPLETO, IDENTIDADE_CRIADA) |
| Tempo no resumo | Evento de início de renderização → próximo evento |
| Cliques no dashboard | Eventos de interação (a serem implementados) |
| Retorno | Último acesso do usuário |

### 4.2 Coleta explícita (feedback do empresário)

| Pergunta | Quando | Formato |
|----------|--------|---------|
| "O que você achou deste diagnóstico?" | Após o resumo | Ícones 😊😐😞 (3 opções) |
| "Recomendaria para outro empresário?" | Após 7 dias de uso | NPS (0-10) |
| "O que poderíamos melhorar?" | Após 30 dias | Texto livre (opcional) |
| "Por que você criou a conta?" | No formulário de criação | Seleção: "Quero resolver [problema]" / "Gostei do resumo" / "Indicação" |

### 4.3 Privacidade

- Nenhuma métrica é coletada nominalmente — apenas agregada por coorte
- O empresário pode optar por não responder perguntas de feedback
- Dados de uso são anônimos na coleta (identificados por `empresaId` mas analisados agregadamente)

---

## 5. Métricas que NÃO devem ser usadas

| Métrica | Motivo para evitar |
|---------|-------------------|
| Tempo de sessão total | Mais tempo não significa mais valor — pode indicar confusão |
| Número de páginas visitadas | Quantidade não é qualidade |
| Taxa de cliques em tudo | Pode indicar desorientação, não engajamento |
| Conversão imediata para pago | Ainda não há modelo de precificação definido |
| Dados biométricos ou comportamentais finos | Invasivo e desnecessário |

---

## 6. Monitoramento

### 6.1 Painel de métricas da primeira experiência

Um painel simples (pode ser no Cognitive Observatory existente) com:

```
┌─────────────────────────────────────────────────────┐
│  PRIMEIRA EXPERIÊNCIA                    Últimos 7d │
├─────────────────────────────────────────────────────┤
│  Visitantes: 1.234      │  Diagnósticos: 456        │
│  Conversão: 18.5%       │  Retenção D1: 42%        │
│  Valor Líquido: 0.72    │  NPS: 45                  │
├─────────────────────────────────────────────────────┤
│  Abandono por bloco:                                 │
│  🧭 B1: 5%  ⚙️ B2: 8%  🧠 B3: 12%  ⚠️ B4: 4%  🎯 B5: 3% │
├─────────────────────────────────────────────────────┤
│  Feedback: 😊 72%  😐 20%  😞 8%                     │
└─────────────────────────────────────────────────────┘
```

### 6.2 Alertas

| Condição | Alerta | Ação |
|----------|--------|------|
| Conversão < 5% | Crítico | Revisar fluxo de entrada |
| Abandono B3 > 25% | Atenção | Revisar perguntas do bloco de gestão |
| NPS < 20 | Crítico | Investigar causas |
| Retorno D1 < 20% | Atenção | Revisar experiência pós-login |

---

*Documento concluído. Avançando para Documento 8.*
