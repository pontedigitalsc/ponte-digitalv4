# Novos Indicadores — Versão Expandida

**Programa:** 26 — Ativação Cognitiva da Empresa Zero
**Propósito:** Aprofundar os 13 indicadores não financeiros que definem o sucesso da Empresa Zero.
**Data:** 26/07/2026
**Versão:** 1.0

---

## Sobre este documento

Enquanto o PAINEL_DA_EMPRESA_ZERO.md define todos os indicadores, este documento aprofunda os 13 indicadores não financeiros mais estratégicos. Cada um recebe definição completa, metas para 30/60/90 dias e orientações de ação.

---

## Indicador 1 — Tempo até descoberta

### Nome oficial
Tempo até descoberta (TTD — Time To Discovery)

### Definição
Mede quantos dias levamos desde a ocorrência de um evento no mundo real até sua identificação como um padrão relevante no Catálogo de Observações. Quanto menor o tempo, mais rápida a capacidade de perceber o que está acontecendo.

### Fórmula conceitual
```
TTD = Data da Observação (Camada 2) — Data do Evento no Diário (Camada 1)
```

### Unidade de medida
Dias corridos.

### Frequência de coleta
Semanal. Média dos TTDs das observações criadas na semana.

### Fonte dos dados
Camada 1 (Diário Operacional) e Camada 2 (Catálogo de Observações). Diferença entre a data do relato original e a data de catalogação como observação estruturada.

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≤ 14 dias | Identificar padrões em até 2 semanas |
| 60 dias | ≤ 7 dias | Identificar padrões na semana seguinte |
| 90 dias | ≤ 3 dias | Identificar padrões em até 72h |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 14 dias)** | Estamos demorando para perceber padrões. O Diário está sendo escrito mas não revisado. Observações estão sendo perdidas. |
| **Baixo (< 3 dias)** | Excelente capacidade de percepção. Padrões são identificados quase em tempo real. |
| **Muito baixo (< 1 dia)** | Atenção: pode indicar que estamos criando observações precipitadas sem evidência suficiente. |
| **Meta (7 dias)** | Ritmo saudável: tempo suficiente para acumular evidência, rápido o suficiente para agir. |

### O que fazer se estiver abaixo da meta
- Revisar o Diário diariamente (não só semanalmente)
- Criar gatilho: toda entrada no Diário gera alerta de "possível observação?" no dia seguinte
- IA deve sugerir observações candidatas automaticamente

### O que fazer se estiver acima da meta
- Observações podem estar prematuras — verificar se têm evidência suficiente
- Aumentar o rigor: uma observação precisa de pelo menos 2 ocorrências no Diário
- Comemorar: a capacidade de percepção está afiada

### Relação com outros indicadores
- Inverso de **Conhecimento produzido/semana**: TTD baixo → mais observações por semana
- Diretamente ligado a **Qualidade das observações**: TTD muito baixo pode reduzir qualidade
- Alimenta **Tempo até compreensão**: não se pode compreender o que não se descobriu

---

## Indicador 2 — Tempo até compreensão

### Nome oficial
Tempo até compreensão (TTC — Time To Comprehension)

### Definição
Mede quantos dias levamos desde a identificação de um padrão (observação) até a formulação de uma hipótese testável que explique o padrão. É a velocidade com que passamos de "o que está acontecendo" para "por que está acontecendo".

### Fórmula conceitual
```
TTC = Data da Hipótese (Camada 3) — Data da Observação (Camada 2)
```

### Unidade de medida
Dias corridos.

### Frequência de coleta
Semanal. Média dos TTCs das hipóteses criadas na semana.

### Fonte dos dados
Camada 2 (Catálogo de Observações) e Camada 3 (Banco de Hipóteses).

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≤ 30 dias | Formular hipótese em até 1 mês |
| 60 dias | ≤ 14 dias | Formular hipótese em até 2 semanas |
| 90 dias | ≤ 7 dias | Formular hipótese na semana seguinte à observação |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 30 dias)** | Observações estão sendo arquivadas sem gerar investigação. Hipóteses não estão sendo formuladas. |
| **Baixo (< 7 dias)** | Boa capacidade de gerar explicações. Risco: hipóteses podem ser superficiais se formuladas rápido demais. |
| **Muito baixo (< 1 dia)** | Observação e hipótese estão sendo criadas juntas — possivelmente é uma opinião, não uma hipótese baseada em observação. |

### O que fazer se estiver abaixo da meta
- Agendar "sessão de hipóteses" semanal: revisar observações novas e forçar formulação de hipóteses
- IA deve sugerir hipóteses candidatas para cada observação nova
- Parar de criar observações sem hipótese correspondente

### O que fazer se estiver acima da meta
- Verificar se as hipóteses são genuínas ou apenas explicações óbvias
- Exigir que cada hipótese tenha um "como testar" claro antes de ser aceita
- Celebrar: a empresa está convertendo padrões em investigações rapidamente

### Relação com outros indicadores
- Diretamente ligado a **Tempo até descoberta**: TTC baixo depende de TTD baixo
- Alimenta **Taxa de hipóteses refutadas**: hipóteses rápidas podem ser mais frágeis
- É pré-requisito para **Ciclos completos de aprendizado**

---

## Indicador 3 — Tempo até decisão

### Nome oficial
Tempo até decisão (TTDc — Time To Decision)

### Definição
Mede quantos dias levamos desde a formulação de uma hipótese até a tomada de decisão de testá-la. Captura a paralisia por análise: o tempo que passamos "pensando em testar" sem realmente testar.

### Fórmula conceitual
```
TTDc = Data da Decisão — Data da Hipótese (Camada 3)
```

### Unidade de medida
Dias corridos.

### Frequência de coleta
Semanal. Média dos TTDcs das decisões tomadas na semana.

### Fonte dos dados
Camada 3 (Banco de Hipóteses) e decisões registradas no Diário Operacional.

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≤ 45 dias | Decidir testar em até 45 dias |
| 60 dias | ≤ 30 dias | Decidir testar em até 1 mês |
| 90 dias | ≤ 14 dias | Decidir testar em até 2 semanas |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 45 dias)** | Paralisia por análise. Hipóteses estão empilhadas sem decisão. A empresa está pensando demais e agindo de menos. |
| **Baixo (< 14 dias)** | Cultura de experimentação saudável. Hipóteses viram decisões rapidamente. |
| **Muito baixo (< 1 dia)** | Decisões impulsivas sem consideração adequada. Verificar se a decisão tem fundamento. |

### O que fazer se estiver abaixo da meta
- Limitar o número de hipóteses ativas (máximo 5)
- Toda hipótese criada já deve ter uma "decisão mínima" associada: testar ou arquivar
- Reunião quinzenal de "desempate de hipóteses" onde o fundador decide qual testar

### O que fazer se estiver acima da meta
- Verificar se as decisões estão sendo tomadas com informação suficiente
- Garantir que cada decisão está registrada com seu contexto e alternativas
- Acelerar: estamos prontos para ciclos mais rápidos

### Relação com outros indicadores
- Inverso de **Taxa de hipóteses corretas**: decisões rápidas podem errar mais
- Diretamente ligado a **Tempo até validação**: sem decisão não há validação
- Correlacionado com **Nível de confiança do empresário**: baixa confiança → maior TTDc

---

## Indicador 4 — Tempo até validação

### Nome oficial
Tempo até validação (TTV — Time To Validation)

### Definição
Mede quantos dias levamos desde a decisão de testar uma hipótese até a obtenção de um resultado (confirmação ou refutação). É o tempo do experimento em si.

### Fórmula conceitual
```
TTV = Data do Resultado — Data da Decisão
```

### Unidade de medida
Dias corridos.

### Frequência de coleta
Semanal. Média dos TTVs das hipóteses validadas na semana.

### Fonte dos dados
Banco de Hipóteses (Camada 3): data da decisão e data do status confirmado/refutado.

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≤ 90 dias | Validar hipóteses em até 3 meses |
| 60 dias | ≤ 60 dias | Validar hipóteses em até 2 meses |
| 90 dias | ≤ 30 dias | Validar hipóteses em até 1 mês |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 90 dias)** | Experimentos muito longos ou abandonados. O aprendizado não está sendo concluído. |
| **Baixo (< 30 dias)** | Experimentos rápidos e eficientes. Ciclo de aprendizado acelerado. |
| **Muito baixo (< 7 dias)** | Verificar se o experimento foi conclusivo ou se o resultado foi superficial. |

### O que fazer se estiver abaixo da meta
- Projetar experimentos menores: testar a hipótese com o menor esforço possível
- Definir prazo máximo para cada experimento (não pode ficar aberto para sempre)
- Hipóteses sem experimento por > 90 dias são automaticamente arquivadas

### O que fazer se estiver acima da meta
- Expandir o escopo dos experimentos (testes mais robustos)
- Celebrar: a empresa está validando conhecimento em ritmo acelerado
- Documentar metodologias que estão funcionando para replicar

### Relação com outros indicadores
- É o último estágio antes de **Conhecimento Confirmado**
- Impacta **Patrimônio intelectual acumulado**: TTV baixo → mais conhecimento validado
- Relacionado a **Tempo até decisão**: os dois formam o "ciclo de experimentação"

---

## Indicador 5 — Taxa de hipóteses corretas

### Nome oficial
Taxa de hipóteses corretas (THC)

### Definição
Percentual de hipóteses que foram confirmadas pela realidade. Mede a precisão do nosso entendimento do negócio.

### Fórmula conceitual
```
THC = Hipóteses confirmadas / (Hipóteses confirmadas + Hipóteses refutadas)
```
Hipóteses inconclusivas ou em teste são excluídas.

### Unidade de medida
Percentual (0% — 100%).

### Frequência de coleta
Mensal.

### Fonte dos dados
Banco de Hipóteses (Camada 3): status CONFIRMADA e REFUTADA.

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≥ 25% | 1 em cada 4 hipóteses confirmada |
| 60 dias | ≥ 35% | ~1 em cada 3 confirmada |
| 90 dias | ≥ 45% | Quase metade das hipóteses confirmada |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Muito alto (> 70%)** | Suspeito: podemos estar formulando hipóteses muito óbvias ou apenas confirmando o que já sabemos. |
| **Alto (45-70%)** | Saudável: bom equilíbrio entre hipóteses arriscadas e precisão. |
| **Baixo (< 25%)** | Muitas hipóteses erradas. Pode ser bom (estamos arriscando) ou ruim (hipóteses mal formuladas). |
| **Muito baixo (< 10%)** | Hipóteses estão fracas ou método de teste é falho. Revisar o processo de formulação. |

### O que fazer se estiver abaixo da meta
- Revisar o método de formulação de hipóteses (estão testáveis?)
- Buscar mais evidência antes de formular (voltar para Camada 2)
- Hipóteses devem ser mais específicas e mensuráveis

### O que fazer se estiver acima da meta
- Aumentar o risco das hipóteses (formular suposições mais ousadas)
- Verificar se não estamos confirmando apenas o óbvio
- Desafiar o conhecimento confirmado: será que está correto?

### Relação com outros indicadores
- Complementar à **Taxa de hipóteses refutadas** (THC + THR = 100% das hipóteses concluídas)
- Relacionada a **Qualidade das observações**: observações fracas geram hipóteses erradas
- Impacta diretamente **Patrimônio intelectual acumulado**: só hipóteses corretas viram conhecimento

---

## Indicador 6 — Taxa de hipóteses descartadas

### Nome oficial
Taxa de hipóteses refutadas (THR)

### Definição
Percentual de hipóteses que foram refutadas pela realidade. Mede a capacidade de eliminar suposições incorretas.

### Fórmula conceitual
```
THR = Hipóteses refutadas / (Hipóteses confirmadas + Hipóteses refutadas)
```

### Unidade de medida
Percentual (0% — 100%).

### Frequência de coleta
Mensal.

### Fonte dos dados
Banco de Hipóteses (Camada 3): status REFUTADA.

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≤ 75% | Até 3 em cada 4 refutadas |
| 60 dias | ≤ 65% | ~2 em cada 3 refutadas |
| 90 dias | ≤ 55% | ~1 em cada 2 refutadas |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Muito alto (> 75%)** | Hipóteses estão fracas ou muito arriscadas. Revisar processo de formulação. |
| **Alto (55-75%)** | Aceitável para fase inicial: estamos aprendendo sobre o que não funciona. |
| **Baixo (< 30%)** | Suspeito: podemos estar formulando apenas hipóteses seguras demais. |
| **Muito baixo (< 10%)** | Quase tudo que supomos está correto — ou estamos sendo muito conservadores. |

### O que fazer se estiver acima da meta
- Melhorar a qualidade das hipóteses (mais específicas, mais baseadas em evidência)
- Revisar se os experimentos estão bem desenhados
- Reduzir a velocidade de formulação — gastar mais tempo em cada hipótese

### O que fazer se estiver abaixo da meta
- Aumentar o risco das hipóteses — errar mais significa aprender mais
- Verificar se não estamos tendenciosos a confirmar (viés de confirmação)
- Celebrar: errar rápido é aprender rápido

### Relação com outros indicadores
- Complementar à **Taxa de hipóteses corretas** (THC + THR = 100%)
- Alta THR + alto **Conhecimento produzido/semana** = ambiente saudável de aprendizado
- Baixa THR + baixo **Patrimônio intelectual** = estagnação cognitiva

---

## Indicador 7 — Conhecimento produzido por semana

### Nome oficial
Conhecimento produzido por semana (CPS)

### Definição
Número de observações válidas registradas no Catálogo de Observações (Camada 2) por semana. Mede a taxa de geração de novos insights estruturados.

### Fórmula conceitual
```
CPS = Total de observações criadas na semana
```

### Unidade de medida
Observações/semana.

### Frequência de coleta
Semanal.

### Fonte dos dados
Catálogo de Observações (Camada 2).

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≥ 2/semana | Pelo menos 2 observações por semana |
| 60 dias | ≥ 4/semana | Quase 1 observação por dia útil |
| 90 dias | ≥ 6/semana | Média de 1 observação por dia útil |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 8/semana)** | Empresa está gerando muitos insights. Risco: quantidade sobre qualidade. |
| **Médio (4-6/semana)** | Ritmo saudável de produção de conhecimento. |
| **Baixo (< 2/semana)** | Diário não está sendo revisado ou operação não está gerando aprendizado. |
| **Zero (> 1 semana)** | Crise de aprendizado. A empresa não está percebendo padrões. |

### O que fazer se estiver abaixo da meta
- Aumentar a frequência do Diário (diário obrigatório)
- IA deve sugerir observações candidatas automaticamente
- Sessão de revisão de diário deve ser mais rigorosa

### O que fazer se estiver acima da meta
- Verificar a qualidade das observações (estão sendo validadas?)
- Priorizar observações mais relevantes (qualidade > quantidade)
- Garantir que cada observação está gerando hipótese

### Relação com outros indicadores
- Correlacionado com **Qualidade das observações**: quantidade não deve sacrificar qualidade
- Alimenta **Banco de Hipóteses**: mais observações = mais hipóteses potenciais
- É pré-requisito para **Ciclos completos de aprendizado**

---

## Indicador 8 — Patrimônio intelectual acumulado

### Nome oficial
Patrimônio intelectual acumulado (PIA)

### Definição
Total de conhecimentos confirmados (Camada 4) ativos. Representa o estoque de conhecimento validado que a empresa acumulou e não precisa redescobrir.

### Fórmula conceitual
```
PIA = Total de entradas no Conhecimento Confirmado (Camada 4) com status ativo
```

### Unidade de medida
Conhecimentos.

### Frequência de coleta
Mensal.

### Fonte dos dados
Conhecimento Confirmado (Camada 4).

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≥ 3 conhecimentos | Pelo menos 3 certezas estabelecidas |
| 60 dias | ≥ 7 conhecimentos | 7 aprendizados validados |
| 90 dias | ≥ 12 conhecimentos | 12 certezas — um conhecimento por semana |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 20)** | Patrimônio intelectual significativo. Empresa sabe muito sobre si mesma. |
| **Médio (10-20)** | Bom acúmulo de conhecimento. Base sólida. |
| **Baixo (< 5)** | Conhecimento está sendo perdido ou não validado. Poucas certezas. |
| **Zero** | Nada foi validado ainda. É esperado no início. |

### O que fazer se estiver abaixo da meta
- Fechar ciclos de aprendizado: priorizar validação de hipóteses existentes
- Hipóteses confirmadas devem migrar para Camada 4 imediatamente
- Revisar hipóteses antigas que podem ser confirmadas com evidência já disponível

### O que fazer se estiver acima da meta
- Revisar periodicamente o conhecimento para garantir que ainda é válido
- Compartilhar conhecimento com o time e a IA
- Usar o patrimônio para fundamentar RFCs e decisões

### Relação com outros indicadores
- Resultado direto de **Taxa de hipóteses corretas** e **Ciclos completos de aprendizado**
- Base para **Profundidade do entendimento empresarial**
- Quanto maior o PIA, menor o **Tempo até decisão** (mais base para decidir)

---

## Indicador 9 — Qualidade das observações

### Nome oficial
Qualidade das observações (QO)

### Definição
Média do campo CONFIANÇA (0-100) das observações ativas no Catálogo de Observações. Mede o quão fundamentadas em evidência estão nossas observações.

### Fórmula conceitual
```
QO = Soma(CONFIANÇA das observações ativas) / Total de observações ativas
```

### Unidade de medida
Escala 0-100.

### Frequência de coleta
Mensal.

### Fonte dos dados
Campo CONFIANÇA no Catálogo de Observações (Camada 2).

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≥ 40 | Confiança moderada — observações baseadas em ao menos 2 ocorrências |
| 60 dias | ≥ 55 | Confiança boa — observações corroboradas por múltiplas fontes |
| 90 dias | ≥ 65 | Confiança alta — observações com evidência sólida |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 80)** | Observações são altamente confiáveis. Risco: podemos estar exigindo evidência demais e perdendo insights precoces. |
| **Médio (50-70)** | Faixa saudável: confiança razoável sem perder agilidade. |
| **Baixo (< 40)** | Observações frágeis. Muitas suposições passando como observações. |
| **Muito baixo (< 20)** | Catálogo está cheio de opiniões não fundamentadas. Revisar critérios. |

### O que fazer se estiver abaixo da meta
- Exigir que cada observação referencie entradas específicas do Diário
- Revisar observações existentes e rebaixar as que não têm evidência
- Criar regra: uma observação precisa de no mínimo 2 ocorrências no Diário

### O que fazer se estiver acima da meta
- Verificar se a confiança não está inflada (viés de confirmação)
- Manter o rigor: cada observação nova deve atingir o mesmo padrão
- Documentar o que está gerando observações de alta qualidade para replicar

### Relação com outros indicadores
- Correlacionado com **Conhecimento produzido/semana**: quantidade vs qualidade
- Impacta **Taxa de hipóteses corretas**: observações de alta qualidade geram melhores hipóteses
- Relacionado a **Tempo até descoberta**: observações de qualidade podem levar mais tempo

---

## Indicador 10 — Profundidade do entendimento empresarial

### Nome oficial
Profundidade do entendimento empresarial (PEE)

### Definição
Média de camadas de conhecimento por área do negócio. Mede quão profundo é nosso entendimento em cada área: superficial (1 camada) a profundo (5 camadas).

### Fórmula conceitual
```
PEE = Soma(camadas por área) / Total de áreas mapeadas
```
Onde cada área pode ter de 1 a 5 camadas correspondentes aos estágios: Dado bruto → Observação → Hipótese → Conhecimento → RFC.

### Unidade de medida
Camadas (escala 1-5).

### Frequência de coleta
Mensal.

### Fonte dos dados
Mapeamento cruzado entre Conhecimento Confirmado (Camada 4) e áreas do negócio.

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≥ 1.5 | Áreas começando a ter observações e hipóteses |
| 60 dias | ≥ 2.0 | Áreas com observações e hipóteses estabelecidas |
| 90 dias | ≥ 2.5 | Algumas áreas começando a ter conhecimento confirmado |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 3.5)** | Entendimento multinível e profundo. Empresa se conhece bem em múltiplas áreas. |
| **Médio (2.0-3.0)** | Conhecimento razoável. Áreas principais cobertas, algumas superficiais. |
| **Baixo (< 1.5)** | Conhecimento superficial. Muitas áreas com apenas dados brutos. |
| **1.0 em todas** | Apenas Diário existe. Nenhuma área gerou observação ou hipótese. |

### O que fazer se estiver abaixo da meta
- Identificar áreas com menor profundidade e priorizá-las
- Para cada área sem observação, forçar uma sessão de investigação
- Distribuir o esforço de observação por todas as áreas, não apenas as favoritas

### O que fazer se estiver acima da meta
- Identificar as áreas mais profundas e extrair insights transversais
- Usar o conhecimento de áreas profundas para acelerar áreas rasas
- Publicar o mapa de profundidade como ferramenta de decisão

### Relação com outros indicadores
- É a média ponderada de **Patrimônio intelectual acumulado** por área
- Correlacionado com **Conhecimento produzido/semana**: mais observações → mais profundidade
- Impacta **Precisão das recomendações**: áreas profundas geram recomendações mais precisas

---

## Indicador 11 — Precisão das recomendações

### Nome oficial
Precisão das recomendações (PR)

### Definição
Percentual de recomendações que, quando seguidas, geraram um resultado positivo mensurável. Mede a efetividade do sistema em transformar conhecimento em ação útil.

### Fórmula conceitual
```
PR = Recomendações com resultado positivo / Total de recomendações acionadas
```
Onde "resultado positivo" significa: a ação recomendada gerou o efeito esperado.

### Unidade de medida
Percentual (0% — 100%).

### Frequência de coleta
Mensal.

### Fonte dos dados
Registro de recomendações no sistema + acompanhamento de resultados.

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≥ 30% | 1 em cada 3 recomendações é precisa |
| 60 dias | ≥ 45% | ~1 em cada 2 é precisa |
| 90 dias | ≥ 55% | Mais da metade das recomendações é precisa |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 70%)** | Sistema de recomendações é altamente preciso. Risco: podemos estar recomendando apenas o óbvio. |
| **Médio (40-60%)** | Faixa saudável. Recomendações são úteis mas não infalíveis. |
| **Baixo (< 30%)** | Recomendações estão fracas. Base de conhecimento insuficiente ou desconectada da realidade. |
| **Muito baixo (< 10%)** | Sistema está ativamente recomendando coisas erradas. Revisar base inteira. |

### O que fazer se estiver abaixo da meta
- Revisar a base de conhecimento que fundamenta as recomendações
- Melhorar o vínculo entre recomendação e evidência
- Reduzir o número de recomendações e aumentar a qualidade

### O que fazer se estiver acima da meta
- Aumentar a ambição das recomendações (recomendar ações mais ousadas)
- Validar se o "resultado positivo" não está sendo avaliado com viés
- Expandir recomendações para mais áreas do negócio

### Relação com outros indicadores
- Dependente de **Qualidade das observações** e **Patrimônio intelectual**
- Impacta **Nível de confiança do empresário**: recomendações precisas geram confiança
- Correlacionada com **Profundidade do entendimento**: áreas profundas geram recomendações precisas

---

## Indicador 12 — Nível de autonomia da IA

### Nome oficial
Nível de autonomia da IA (NAI)

### Definição
Percentual de decisões ou ações que a IA executa sem intervenção humana, dentro do conjunto de decisões que poderiam ser delegadas. Mede a maturidade da confiança no sistema.

### Fórmula conceitual
```
NAI = Decisões executadas pela IA sem revisão / Total de decisões delegáveis
```

### Unidade de medida
Percentual (0% — 100%).

### Frequência de coleta
Mensal.

### Fonte dos dados
Registro de decisões com classificação de intervenção (humana vs automática).

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | 0% | Nenhuma autonomia — toda decisão revisada |
| 60 dias | ≤ 10% | Autonomia mínima — decisões de baixo risco |
| 90 dias | ≤ 20% | Autonomia moderada — decisões rotineiras delegadas |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (> 50%)** | IA opera com autonomia significativa. Confiança estabelecida. Risco: supervisão insuficiente. |
| **Médio (20-50%)** | Autonomia em áreas de baixo risco. Áreas críticas ainda supervisionadas. |
| **Baixo (5-20%)** | Autonomia inicial. Apenas decisões triviais delegadas. |
| **Zero** | Fase de construção de confiança. Toda decisão é revisada. |

### O que fazer se estiver abaixo da meta
- Identificar decisões de baixo risco que podem ser delegadas
- Criar protocolo de supervisão reduzida para decisões repetitivas e previsíveis
- Documentar cada delegação com critérios claros de sucesso

### O que fazer se estiver acima da meta
- Verificar se a supervisão está sendo negligenciada
- Realizar auditoria periódica das decisões autônomas
- Aumentar gradualmente, nunca subitamente

### Relação com outros indicadores
- Dependente de **Precisão das recomendações**: IA precisa recomendar bem para ganhar autonomia
- Correlacionado com **Nível de confiança do empresário**: confiança alta → mais autonomia
- Impacta **Tempo até decisão**: autonomia reduz o tempo de decisão

---

## Indicador 13 — Nível de confiança do empresário

### Nome oficial
Nível de confiança do empresário (NCE)

### Definição
Mede, por pesquisa periódica, o quanto o empresário (fundador) confia no sistema, nas recomendações e na IA. É o indicador mais subjetivo e mais importante: sem confiança, nada funciona.

### Fórmula conceitual
```
NCE = Média das respostas da pesquisa de confiança (3 perguntas, escala 1-5)
```

**Perguntas da pesquisa:**
1. "Confio nas recomendações que o sistema me dá" (1-5)
2. "Os insights que recebo são claros e úteis" (1-5)
3. "Sinto que o sistema me ajuda a tomar decisões melhores" (1-5)

### Unidade de medida
Escala 1-5.

### Frequência de coleta
Mensal.

### Fonte dos dados
Pesquisa aplicada ao fundador no último dia de cada mês.

### Metas

| Prazo | Meta | Critério |
|-------|------|----------|
| 30 dias | ≥ 2.5 | Confiança mínima — sistema não atrapalha |
| 60 dias | ≥ 3.0 | Confiança mediana — sistema começa a ajudar |
| 90 dias | ≥ 3.5 | Confiança boa — sistema é visto como aliado |

### Como interpretar

| Cenário | Significado |
|---------|-------------|
| **Alto (≥ 4.0)** | Confiança alta. Empresário vê o sistema como parceiro de decisão. |
| **Médio (3.0-3.9)** | Confiança razoável. Empresário usa mas ainda desconfia. |
| **Baixo (2.0-2.9)** | Confiança baixa. Empresário não confia nas recomendações. |
| **Crítico (< 2.0)** | Confiança quebrada. Empresário não confia no sistema. Prioridade máxima de recuperação. |

### O que fazer se estiver abaixo da meta
- Investigar a causa raiz da baixa confiança (entrevista com o fundador)
- Revisar as últimas recomendações — alguma estava errada?
- Reduzir o escopo: menos recomendações, mais curadas
- Mostrar mais transparência (como a IA chegou à recomendação)

### O que fazer se estiver acima da meta
- Manter a qualidade que gerou a confiança
- Expandir gradualmente o escopo de atuação da IA
- Documentar o que está gerando confiança para não perder

### Relação com outros indicadores
- Resultado composto de **Precisão das recomendações**, **Qualidade das observações** e **Clareza dos insights**
- É pré-requisito para **Nível de autonomia da IA**
- Impacta **Energia do time** e **Confiança nas decisões**
- Correlacionado com **Tempo até decisão**: baixa confiança → maior tempo de decisão

---

## Mapa de interdependência entre indicadores

```
Tempo até descoberta (TTD)
    ↓
Tempo até compreensão (TTC)
    ↓
Tempo até decisão (TTDc)
    ↓
Tempo até validação (TTV)
    ↓
Taxa de hipóteses corretas (THC)
    ↓
Patrimônio intelectual acumulado (PIA)
    ↓
Profundidade do entendimento (PEE) → Precisão das recomendações (PR)
    ↓                                                    ↓
Qualidade das observações (QO) ← Conhecimento/semana (CPS)
                                                        ↓
                                            Nível de confiança (NCE)
                                                    ↓
                                            Autonomia da IA (NAI)
```

A leitura correta: indicadores de cima (TTD, TTC) são **leading** — mostram tendências futuras. Indicadores de baixo (NCE, NAI) são **lagging** — mostram resultado de tudo que veio antes.

---

## Regra de ouro da interpretação

Nenhum indicador deve ser lido isoladamente. Um TTD baixo (bom) combinado com QO baixo (ruim) sugere que estamos identificando padrões rápido mas de forma superficial. Um THC alto (bom) combinado com PIA baixo (ruim) sugere que estamos confirmando hipóteses mas não as transformando em conhecimento.

Sempre ler em pares. Sempre perguntar: "O que a combinação revela?"

---

*Este documento faz parte do Programa 26 — Ativação Cognitiva da Empresa Zero.*
*13 indicadores não financeiros expandidos. Metas para 30/60/90 dias. Interpretação e ação.*
*Nenhum indicador sozinho conta a história completa. A leitura é sempre sistêmica.*
