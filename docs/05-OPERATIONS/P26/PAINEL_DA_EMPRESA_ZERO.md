# Painel da Empresa Zero

**Programa:** 26 — Ativação Cognitiva da Empresa Zero
**Propósito:** Definir todos os indicadores que medem a saúde e evolução da Empresa Zero.
**Data:** 26/07/2026
**Versão:** 1.0

---

## Sobre este painel

Este painel não mede apenas financeiro. A Empresa Zero é um organismo de aprendizado. Seus indicadores refletem: quanto estamos aprendendo, quão rápido estamos evoluindo, quão saudável é nossa operação, quão confiante está o empresário (fundador).

**Regra fundamental:** Nenhum indicador deve existir sem uma ação correspondente. Se não sabemos o que fazer com o resultado, não deveríamos estar medindo.

**Estado atual:** Todos os indicadores começam em "sem dado". O valor real será preenchido após a instrumentação. Nunca estimar, nunca projetar.

---

## Indicadores Cognitivos

Medem a produção, qualidade e evolução do conhecimento da empresa.

### Conhecimento produzido por semana

| Campo | Valor |
|-------|-------|
| Nome | Conhecimento produzido por semana |
| Fórmula conceitual | `Observações válidas registradas (Camada 2) / semana` |
| Unidade | Observações/semana |
| Frequência | Semanal |
| Meta inicial | ≥ 3 observações/semana |
| Como coletar | Contagem de novas entradas no Catálogo de Observações |
| O que significa alto | Empresa está gerando muitos insights a partir da operação |
| O que significa baixo | Operação não está gerando aprendizado ou registros estão sendo negligenciados |

### Taxa de hipóteses corretas

| Campo | Valor |
|-------|-------|
| Nome | Taxa de hipóteses corretas |
| Fórmula conceitual | `Hipóteses confirmadas / (Hipóteses confirmadas + Hipóteses refutadas)` |
| Unidade | Percentual |
| Frequência | Mensal |
| Meta inicial | ≥ 40% (60% de erro é aceitável — estamos aprendendo) |
| Como coletar | Status do Banco de Hipóteses (Camada 3) |
| O que significa alto | Hipóteses estão bem formuladas ou estamos sendo conservadores demais |
| O que significa baixo | Hipóteses estão fracas ou estamos testando suposições muito arriscadas |

### Taxa de hipóteses descartadas

| Campo | Valor |
|-------|-------|
| Nome | Taxa de hipóteses descartadas |
| Fórmula conceitual | `Hipóteses refutadas / (Hipóteses confirmadas + Hipóteses refutadas)` |
| Unidade | Percentual |
| Frequência | Mensal |
| Meta inicial | ≤ 60% (refutar é aprender; mas refutar demais indica hipóteses fracas) |
| Como coletar | Status do Banco de Hipóteses (Camada 3) |
| O que significa alto | Muitas hipóteses erradas — melhorar formulação ou método de teste |
| O que significa baixo | Hipóteses muito seguras — podemos estar sendo conservadores demais |

### Patrimônio intelectual acumulado

| Campo | Valor |
|-------|-------|
| Nome | Patrimônio intelectual acumulado |
| Fórmula conceitual | `Total de conhecimentos confirmados (Camada 4) ativos` |
| Unidade | Conhecimentos |
| Frequência | Mensal |
| Meta inicial | ≥ 10 conhecimentos ao final do P26 |
| Como coletar | Contagem de entradas no Conhecimento Confirmado |
| O que significa alto | Empresa está acumulando patrimônio que não precisa ser redescoberto |
| O que significa baixo | Conhecimento está sendo perdido ou não validado |

### Qualidade das observações

| Campo | Valor |
|-------|-------|
| Nome | Qualidade das observações |
| Fórmula conceitual | `Média de confiança (0-100) das observações ativas no Catálogo` |
| Unidade | Escala 0-100 |
| Frequência | Mensal |
| Meta inicial | ≥ 60 |
| Como coletar | Campo CONFIANÇA nas observações (Camada 2) |
| O que significa alto | Observações são fundamentadas em dados concretos |
| O que significa baixo | Observações são baseadas em suposições fracas |

### Profundidade do entendimento empresarial

| Campo | Valor |
|-------|-------|
| Nome | Profundidade do entendimento empresarial |
| Fórmula conceitual | `Média de camadas de conhecimento por área (comercial, financeiro, operação, produto, pessoas)` |
| Unidade | Camadas (1-5) |
| Frequência | Mensal |
| Meta inicial | ≥ 2 camadas por área |
| Como coletar | Mapeamento de conhecimentos por área no Conhecimento Confirmado |
| O que significa alto | Entendimento profundo e multinível do negócio |
| O que significa baixo | Conhecimento superficial em várias áreas |

### Precisão das recomendações

| Campo | Valor |
|-------|-------|
| Nome | Precisão das recomendações |
| Fórmula conceitual | `Recomendações que geraram ação positiva / Total de recomendações dadas` |
| Unidade | Percentual |
| Frequência | Mensal |
| Meta inicial | ≥ 50% |
| Como coletar | Acompanhamento de recomendações vs resultados |
| O que significa alto | Sistema está gerando valor real com as recomendações |
| O que significa baixo | Recomendações estão desconectadas da realidade |

### Nível de autonomia da IA

| Campo | Valor |
|-------|-------|
| Nome | Nível de autonomia da IA |
| Fórmula conceitual | `Decisões executadas sem intervenção humana / Total de decisões possíveis` |
| Unidade | Percentual |
| Frequência | Mensal |
| Meta inicial | 0% (fase inicial — intervenção humana obrigatória) |
| Como coletar | Registro de decisões com e sem intervenção |
| O que significa alto | IA opera com autonomia alta — confiança estabelecida |
| O que significa baixo | IA requer supervisão constante — esperado no início |

### Nível de confiança do empresário

| Campo | Valor |
|-------|-------|
| Nome | Nível de confiança do empresário |
| Fórmula conceitual | `Média das respostas da pesquisa periódica de confiança` |
| Unidade | Escala 1-5 |
| Frequência | Mensal |
| Meta inicial | ≥ 3.0 |
| Como coletar | Pesquisa rápida (3 perguntas: confiança nas recomendações, clareza dos insights, valor percebido) |
| O que significa alto | Empresário confia no sistema e nas recomendações |
| O que significa baixo | Sistema não está gerando confiança — investigar causas |

### Tempo até descoberta

| Campo | Valor |
|-------|-------|
| Nome | Tempo até descoberta |
| Fórmula conceitual | `Data da observação (Camada 2) — Data do evento no Diário (Camada 1)` |
| Unidade | Dias |
| Frequência | Semanal |
| Meta inicial | ≤ 7 dias |
| Como coletar | Diferença entre data do diário e data da observação catalogada |
| O que significa alto | Demoramos muito para perceber padrões |
| O que significa baixo | Identificamos padrões rapidamente |

### Tempo até compreensão

| Campo | Valor |
|-------|-------|
| Nome | Tempo até compreensão |
| Fórmula conceitual | `Data da hipótese (Camada 3) — Data da observação (Camada 2)` |
| Unidade | Dias |
| Frequência | Semanal |
| Meta inicial | ≤ 14 dias |
| Como coletar | Diferença entre data da observação e data da hipótese gerada |
| O que significa alto | Demoramos para formular hipóteses a partir de observações |
| O que significa baixo | Rápida capacidade de gerar explicações testáveis |

### Tempo até decisão

| Campo | Valor |
|-------|-------|
| Nome | Tempo até decisão |
| Fórmula conceitual | `Data da decisão registrada — Data da hipótese (Camada 3)` |
| Unidade | Dias |
| Frequência | Semanal |
| Meta inicial | ≤ 30 dias |
| Como coletar | Diferença entre data da hipótese e data da decisão que a testa |
| O que significa alto | Paralisia por análise — hipóteses não viram ação |
| O que significa baixo | Decisões rápidas baseadas em hipóteses — cultura de experimentação |

### Tempo até validação

| Campo | Valor |
|-------|-------|
| Nome | Tempo até validação |
| Fórmula conceitual | `Data do resultado (confirmação/refutação) — Data da decisão` |
| Unidade | Dias |
| Frequência | Semanal |
| Meta inicial | ≤ 60 dias |
| Como coletar | Diferença entre data da decisão e data do resultado da hipótese |
| O que significa alto | Experimentos demoram ou não são concluídos |
| O que significa baixo | Ciclos rápidos de validação — aprendizado acelerado |

---

## Indicadores Operacionais

Medem a saúde da operação diária.

### Decisões por período

| Campo | Valor |
|-------|-------|
| Nome | Decisões por período |
| Fórmula conceitual | `Total de decisões registradas no período (dia/semana/mês)` |
| Unidade | Decisões |
| Frequência | Diária, Semanal, Mensal |
| Meta inicial | ≥ 1 decisão/dia |
| Como coletar | Contagem de decisões no Diário Operacional |

### Observações registradas

| Campo | Valor |
|-------|-------|
| Nome | Observações registradas |
| Fórmula conceitual | `Total de entradas no Diário Operacional no período` |
| Unidade | Entradas |
| Frequência | Semanal |
| Meta inicial | ≥ 5 entradas/dia úteis |
| Como coletar | Contagem de entradas no Diário |

### RFCs abertas, aprovadas, rejeitadas

| Campo | Valor |
|-------|-------|
| Nome | RFCs por status |
| Fórmula conceitual | `Contagem de RFCs por status (aberta / aprovada / rejeitada) no período` |
| Unidade | RFCs |
| Frequência | Mensal |
| Meta inicial | ≥ 1 RFC/mês |
| Como coletar | Status das RFCs em docs/rfcs/ |

### Ciclos completos de aprendizado

| Campo | Valor |
|-------|-------|
| Nome | Ciclos completos de aprendizado |
| Fórmula conceitual | `Observação → Hipótese → Experimento → Aprendizado concluído no período` |
| Unidade | Ciclos |
| Frequência | Mensal |
| Meta inicial | ≥ 2 ciclos/mês |
| Como coletar | Rastreamento de uma observação até o conhecimento confirmado |

### Tempo perdido vs tempo economizado

| Campo | Valor |
|-------|-------|
| Nome | Tempo perdido vs tempo economizado |
| Fórmula conceitual | `Horas gastas em retrabalho (tempo perdido) — Horas poupadas por automação/aprendizado` |
| Unidade | Horas |
| Frequência | Mensal |
| Meta inicial | Tempo economizado > tempo perdido |
| Como coletar | Estimativa semanal de retrabalho vs automação |

---

## Indicadores Humanos

Medem a energia, satisfação e clareza do time (hoje: fundador).

### Energia do time

| Campo | Valor |
|-------|-------|
| Nome | Energia do time |
| Fórmula conceitual | `Auto-avaliação semanal: "De 0-10, qual sua energia para trabalhar hoje?"` |
| Unidade | Escala 0-10 |
| Frequência | Semanal |
| Meta inicial | ≥ 6 |
| Como coletar | Pergunta direta no Diário Operacional da sexta |

### Satisfação com a IA

| Campo | Valor |
|-------|-------|
| Nome | Satisfação com a IA |
| Fórmula conceitual | `Média de avaliações de satisfação nas interações com IA` |
| Unidade | Escala 1-5 |
| Frequência | Semanal |
| Meta inicial | ≥ 3.0 |
| Como coletar | Feedback após cada interação significativa com a IA |

### Confiança nas decisões

| Campo | Valor |
|-------|-------|
| Nome | Confiança nas decisões |
| Fórmula conceitual | `Auto-avaliação: "De 0-10, quão confiante você está nas decisões tomadas esta semana?"` |
| Unidade | Escala 0-10 |
| Frequência | Semanal |
| Meta inicial | ≥ 6 |
| Como coletar | Pergunta no Diário Operacional |

### Clareza do propósito

| Campo | Valor |
|-------|-------|
| Nome | Clareza do propósito |
| Fórmula conceitual | `Auto-avaliação: "De 0-10, quão claro está o propósito da Empresa Zero para você?"` |
| Unidade | Escala 0-10 |
| Frequência | Mensal |
| Meta inicial | ≥ 7 |
| Como coletar | Pergunta mensal no Diário |

---

## Indicadores Estratégicos

Medem a evolução da empresa como organismo de aprendizado.

### Evolução da maturidade da empresa

| Campo | Valor |
|-------|-------|
| Nome | Evolução da maturidade |
| Fórmula conceitual | `Estágio atual no Mapa de Maturidade (1-6) — ver GUIA_DA_EMPRESA_QUE_APRENDE.md` |
| Unidade | Estágio |
| Frequência | Mensal |
| Meta inicial | Avançar 1 estágio a cada 2 meses |
| Como coletar | Auto-avaliação baseada nos critérios de cada estágio |

### Crescimento do Motor Cognitivo

| Campo | Valor |
|-------|-------|
| Nome | Crescimento do Motor Cognitivo |
| Fórmula conceitual | `Áreas cobertas pelo conhecimento confirmado / Total de áreas do negócio` |
| Unidade | Percentual |
| Frequência | Mensal |
| Meta inicial | ≥ 50% de cobertura |
| Como coletar | Mapeamento de conhecimento por área |

### Crescimento do patrimônio intelectual

| Campo | Valor |
|-------|-------|
| Nome | Crescimento do patrimônio intelectual |
| Fórmula conceitual | `(Conhecimentos confirmados no fim do período — Conhecimentos no início) / Conhecimentos no início` |
| Unidade | Percentual de crescimento |
| Frequência | Mensal |
| Meta inicial | ≥ 20% de crescimento mensal |
| Como coletar | Contagem de conhecimentos confirmados |

### Novos padrões identificados

| Campo | Valor |
|-------|-------|
| Nome | Novos padrões identificados |
| Fórmula conceitual | `Observações classificadas como "novo padrão" no período` |
| Unidade | Padrões |
| Frequência | Mensal |
| Meta inicial | ≥ 1 novo padrão/mês |
| Como coletar | Campo PADRÃO no Catálogo de Observações |

---

## Matriz de Prioridade dos Indicadores

| Prioridade | Indicadores | Motivo |
|------------|-------------|--------|
| **Crítica** | Conhecimento produzido/semana, Decisões/dia, Energia do time | Base da operação — sem estes, nada mais funciona |
| **Alta** | Tempo até descoberta, Tempo até compreensão, Qualidade das observações | Velocidade e qualidade do aprendizado |
| **Média** | Taxa de hipóteses, Patrimônio intelectual, Nível de confiança | Evolução e saúde cognitiva |
| **Baixa** | Autonomia da IA, Ciclos completos, Novos padrões | Indicadores de maturidade futura |

---

## Periodicidade do Painel

| Frequência | O que é revisado |
|------------|------------------|
| **Diário** | Decisões do dia, entrada no Diário |
| **Semanal** | Conhecimento produzido, Tempos (descoberta, compreensão), Energia, Satisfação IA |
| **Mensal** | Taxas de hipóteses, Patrimônio intelectual, Confiança, Maturidade, RFCs |
| **Trimestral** | Tendências, evolução geral, revisão do próprio painel |

---

*Este documento faz parte do Programa 26 — Ativação Cognitiva da Empresa Zero.*
*Painel da Empresa Zero: 4 categorias, 25 indicadores. Do cognitivo ao estratégico.*
*Meta: não apenas medir, mas agir sobre cada indicador.*
