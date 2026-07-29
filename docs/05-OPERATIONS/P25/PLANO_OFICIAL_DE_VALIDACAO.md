# Plano Oficial de Validação — P25

## Propósito

Transformar sistematicamente ACREDITAMOS em SABEMOS. Cada hipótese em aberto (H-001 a H-022) recebe um plano de validação completo. Nenhuma hipótese é implementada em produção sem antes ser testada.

---

## Organização em Lotes

| Lote | Prazo | Hipóteses | Objetivo |
|---|---|---|---|
| Lote 1 — Imediato | Primeiras 2 semanas | 5 hipóteses mais críticas | Validar o core da proposta de valor antes de implementar |
| Lote 2 — Curto prazo | 30 dias | 8 hipóteses | Consolidar decisões de experiência |
| Lote 3 — Médio prazo | 60 dias | 9 hipóteses | Refinar e otimizar |

---

## Lote 1 — Imediato (Empresa Zero, primeiras 2 semanas)

### H-001 — Confiança na incerteza

| Campo | Detalhe |
|---|---|
| **Hipótese** | Empresários sentem mais confiança na IA quando ela admite incerteza do que quando parece sempre certa |
| **Critério de sucesso** | Taxa de conclusão da conversa >= 70% no grupo com incerteza E profundidade média das respostas >= 20% maior que no grupo sem incerteza |
| **Critério de fracasso** | Taxa de abandono no grupo com incerteza >= 40% OU NPS < 30 no grupo com incerteza |
| **Evidências necessárias** | Taxa de conclusão por grupo, profundidade lexical das respostas, NPS pós-sessão, taxa de retorno em 7 dias |
| **Quantidade mínima de observações** | 10 sessões por grupo (20 total) |
| **Tempo mínimo de coleta** | 7 dias |
| **Método de coleta** | A/B test: Versão A (sempre confiante) vs Versão B (admite incerteza) |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | ALTO — Se H-001 for falsa e implementarmos transparência de confiança, a IA parecerá insegura e empresários abandonarão. Se for verdadeira e não implementarmos, perdemos o principal diferencial de honestidade |

### H-004 — Timing de resposta proporcional à complexidade

| Campo | Detalhe |
|---|---|
| **Hipótese** | Timing de resposta proporcional à complexidade aumenta percepção de inteligência |
| **Critério de sucesso** | >= 60% dos empresários no grupo com timing variável respondem "Sim" à pergunta "A IA pareceu pensar antes de responder?" |
| **Critério de fracasso** | < 40% percebem diferença OU grupo com timing variável tem NPS menor que grupo sempre rápido |
| **Evidências necessárias** | Respostas à pergunta "A IA pareceu pensar antes de responder?", NPS por grupo, taxa de abandono |
| **Quantidade mínima de observações** | 8 sessões por grupo (16 total) |
| **Tempo mínimo de coleta** | 5 dias |
| **Método de coleta** | A/B test: Versão A (timing variável: <500ms, 2-5s, 5-15s) vs Versão B (sempre <2s) |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | ALTO — Se H-004 for falsa, adicionamos latência desnecessária e pioramos a experiência. Se for verdadeira e ignorarmos, a IA parecerá "decorada" e perderá percepção de inteligência |

### H-007 — Digitar vs selecionar

| Campo | Detalhe |
|---|---|
| **Hipótese** | Empresários preferem digitar respostas a selecionar opções em múltipla escolha |
| **Critério de sucesso** | Dados extraídos do grupo texto livre têm profundidade >= 30% maior (medida por entidades únicas por resposta) E taxa de conclusão >= 60% |
| **Critério de fracasso** | Taxa de abandono no grupo texto livre >= 50% OU profundidade dos dados não difere significativamente entre grupos |
| **Evidências necessárias** | Profundidade média das respostas (entidades únicas), taxa de conclusão, taxa de correção necessária, dados úteis extraídos |
| **Quantidade mínima de observações** | 10 sessões por grupo (20 total) |
| **Tempo mínimo de coleta** | 7 dias |
| **Método de coleta** | A/B test: Versão A (apenas campo de texto livre) vs Versão B (múltipla escolha + "outro") |
| **Responsável sugerido** | Arquitetura |
| **Risco de implementar sem validar** | ALTO — Se H-007 for falsa, forçar digitação livre aumenta abandono. Se for verdadeira e usarmos múltipla escolha, perdemos riqueza de dados e o Motor Cognitivo opera com entrada empobrecida |

### H-008 — Primeira pergunta define o tom

| Campo | Detalhe |
|---|---|
| **Hipótese** | A primeira pergunta define o tom de toda a conversa |
| **Critério de sucesso** | Conversas que começam com pergunta fácil têm taxa de abandono precoce < 20% E número total de trocas >= 15 |
| **Critério de fracasso** | Não há diferença significativa (>10%) na taxa de abandono precoce entre perguntas fácil, média e difícil |
| **Evidências necessárias** | Taxa de abandono precoce (primeiras 3 perguntas), número total de trocas, profundidade máxima alcançada |
| **Quantidade mínima de observações** | 5 sessões por tipo de primeira pergunta (15 total) |
| **Tempo mínimo de coleta** | 5 dias |
| **Método de coleta** | A/B test com 3 variantes de primeira pergunta: fácil ("Qual o nome da sua empresa?"), média ("Qual sua maior dificuldade hoje?"), difícil ("Como você calcula o CAC da sua empresa?") |
| **Responsável sugerido** | Produto |
| **Risco de implementar sem validar** | BAIXO — Ajustar pergunta inicial é mudança de conteúdo, não de arquitetura. Mas o impacto no engajamento é potencialmente alto |

### H-013 — Compartilhar dados sensíveis após ver valor

| Campo | Detalhe |
|---|---|
| **Hipótese** | Empresários se sentem mais confortáveis compartilhando dados sensíveis após verem valor |
| **Critério de sucesso** | Profundidade das respostas aumenta >= 40% após o primeiro insight (comparando antes vs depois) E taxa de recusa cai pela metade |
| **Critério de fracasso** | Não há correlação entre o momento do primeiro insight e a profundidade das respostas subsequentes |
| **Evidências necessárias** | Momento do primeiro insight, profundidade das respostas antes/depois, taxa de recusa por pergunta sensível (faturamento, margem, custos) |
| **Quantidade mínima de observações** | 15 sessões |
| **Tempo mínimo de coleta** | 10 dias |
| **Método de coleta** | Observação direta: registrar em cada sessão o momento exato do primeiro insight e comparar a profundidade das respostas antes vs depois desse marco |
| **Responsável sugerido** | Arquitetura |
| **Risco de implementar sem validar** | MÉDIO — Se H-013 for verdadeira e não ordenarmos perguntas para gerar valor cedo, perdemos dados profundos. Se for falsa e reordenarmos baseados nela, não há dano significativo |

---

## Lote 2 — Curto Prazo (30 dias)

### H-002 — Mapa Cognitivo Vivo aumenta percepção de inteligência

| Campo | Detalhe |
|---|---|
| **Hipótese** | O Mapa Cognitivo Vivo aumenta a percepção de inteligência e engajamento |
| **Critério de sucesso** | Grupo com mapa tem NPS >= 10 pontos maior que grupo sem mapa E taxa de conclusão >= 80% |
| **Critério de fracasso** | NPS não difere significativamente OU empresários ignoram o mapa (eye tracking mostra fixação < 2s) |
| **Evidências necessárias** | NPS, taxa de conclusão, retorno em 7 dias, eye tracking (número de fixações no mapa) |
| **Quantidade mínima de observações** | 10 sessões por grupo (20 total) |
| **Tempo mínimo de coleta** | 14 dias |
| **Método de coleta** | A/B test: Versão A (com mapa lateral) vs Versão B (apenas chat) |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | MÉDIO — Implementar mapa é esforço significativo de desenvolvimento. Se for falso, todo esse esforço é desperdiçado |

### H-003 — 5 perguntas ideal para resumo parcial

| Campo | Detalhe |
|---|---|
| **Hipótese** | 5 perguntas é o número ideal antes do primeiro resumo parcial |
| **Critério de sucesso** | >= 70% dos empresários avaliam o resumo como "na medida certa" (nota 4-5 em escala de 1-5) no grupo de 5 perguntas |
| **Critério de fracasso** | Grupo de 5 perguntas não difere significativamente dos grupos 3, 7 e 10 na satisfação com o resumo |
| **Evidências necessárias** | Resposta à pergunta "Você sentiu que sabia o que a IA já tinha descoberto?" (1-5), sensação de progresso relatada |
| **Quantidade mínima de observações** | 5 sessões por variação (20 total) |
| **Tempo mínimo de coleta** | 10 dias |
| **Método de coleta** | A/B test com 4 variações: resumo a cada 3, 5, 7, 10 perguntas |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | BAIXO — Ajustar frequência é mudança de configuração |

### H-005 — Loading inteligente reduz abandono

| Campo | Detalhe |
|---|---|
| **Hipótese** | Loading inteligente (com texto do processo) reduz abandono durante espera |
| **Critério de sucesso** | Taxa de abandono em esperas > 5s no grupo com loading inteligente é < 30% (vs >= 50% no spinner genérico) |
| **Critério de fracasso** | Diferença na taxa de abandono entre os grupos é < 10 pontos percentuais |
| **Evidências necessárias** | Taxa de abandono durante espera por tipo de loading, tempo médio de espera tolerado |
| **Quantidade mínima de observações** | 10 sessões por grupo (20 total) |
| **Tempo mínimo de coleta** | 10 dias |
| **Método de coleta** | A/B test: Versão A (loading com fases do processo + texto narrativo) vs Versão B (spinner genérico) |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | MÉDIO — Loading inteligente requer desenvolvimento significativo. Se for falso, economia de desenvolvimento |

### H-006 — Notificação de novo insight aumenta retorno

| Campo | Detalhe |
|---|---|
| **Hipótese** | Empresários retornam mais quando recebem notificação de novo insight |
| **Critério de sucesso** | Taxa de retorno em 7 dias no grupo com notificação é >= 30% maior que no grupo sem notificação |
| **Critério de fracasso** | Taxa de abertura de notificação < 20% OU retorno não difere entre grupos |
| **Evidências necessárias** | Taxa de retorno em 7, 14, 30 dias, taxa de abertura de notificação, tempo até retorno |
| **Quantidade mínima de observações** | 15 empresários por grupo (30 total) |
| **Tempo mínimo de coleta** | 30 dias (para medir retorno em 30 dias) |
| **Método de coleta** | A/B test: Grupo A (recebe notificação push de novo insight) vs Grupo B (sem notificação) |
| **Responsável sugerido** | Engenharia |
| **Risco de implementar sem validar** | MÉDIO — Sistema de notificações tem custo de implementação e risco de ser percebido como spam |

### H-009 — Proporção IA:Empresário 40:60

| Campo | Detalhe |
|---|---|
| **Hipótese** | A IA deve falar menos que o empresário (proporção 40:60) |
| **Critério de sucesso** | Proporção real de fala no grupo conciso fica entre 35%-45% para IA E insights gerados são >= 20% mais precisos (avaliação por especialista) |
| **Critério de fracasso** | NPS do grupo conciso é menor que o grupo explicativo OU empresários reportam "senti-me interrogado" |
| **Evidências necessárias** | Proporção de fala real (caracteres/palavras), profundidade das respostas, NPS, feedback qualitativo |
| **Quantidade mínima de observações** | 8 sessões por grupo (16 total) |
| **Tempo mínimo de coleta** | 10 dias |
| **Método de coleta** | A/B test: Versão A (IA concisa — respostas de 1-2 frases) vs Versão B (IA explicativa — respostas de 3-5 frases) |
| **Responsável sugerido** | Produto |
| **Risco de implementar sem validar** | MÉDIO — Mudar tom da IA requer reescrita de conteúdo significativo |

### H-010 — Dados percentuais geram mais confiança

| Campo | Detalhe |
|---|---|
| **Hipótese** | Empresários confiam mais em insights com dados percentuais do que qualitativos |
| **Critério de sucesso** | Média de confiança reportada (escala 1-5) para insights com dados é >= 4.0 vs < 3.5 para qualitativos |
| **Critério de fracasso** | Confiança reportada não difere entre formatos OU empresários analíticos têm score alto em ambos |
| **Evidências necessárias** | Resposta à pergunta "Você confia neste insight?" (1-5), segmentação por perfil do empresário |
| **Quantidade mínima de observações** | 10 empresários (cada um vê ambos os formatos) |
| **Tempo mínimo de coleta** | 5 dias |
| **Método de coleta** | Questionário pós-sessão: apresentar insights no mesmo tema em dois formatos e perguntar confiança em cada |
| **Responsável sugerido** | Produto |
| **Risco de implementar sem validar** | MÉDIO — Se H-010 for falsa, priorizar formato percentual adiciona complexidade desnecessária ao Motor Cognitivo |

### H-011 — Gamificação cognitiva aumenta engajamento

| Campo | Detalhe |
|---|---|
| **Hipótese** | A gamificação cognitiva (indicadores de progresso) aumenta engajamento |
| **Critério de sucesso** | Taxa de conclusão no grupo com indicadores >= 80% vs < 60% no grupo sem indicadores |
| **Critério de fracasso** | Empresários reportam "me senti pressionado" no grupo com indicadores OU conclusão não difere |
| **Evidências necessárias** | Taxa de conclusão, tempo médio de sessão, feedback qualitativo |
| **Quantidade mínima de observações** | 10 sessões por grupo (20 total) |
| **Tempo mínimo de coleta** | 7 dias |
| **Método de coleta** | A/B test: Versão A (barra de progresso, indicador de cobertura) vs Versão B (sem indicadores) |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | BAIXO — Indicadores são simples de implementar e remover |

### H-018 — Botão "Continuar agora" reduz abandono

| Campo | Detalhe |
|---|---|
| **Hipótese** | O botão "Continuar agora" durante espera longa reduz abandono |
| **Critério de sucesso** | Taxa de abandono em esperas > 5s no grupo com botão é < 25% |
| **Critério de fracasso** | Maioria dos empresários (> 60%) escolhe esperar em vez de continuar OU abandono não difere |
| **Evidências necessárias** | Taxa de abandono por grupo, proporção de escolhas (continuar vs esperar) |
| **Quantidade mínima de observações** | 10 sessões por grupo (20 total) |
| **Tempo mínimo de coleta** | 7 dias |
| **Método de coleta** | A/B test: Versão A (com botão "Continuar agora") vs Versão B (espera obrigatória) |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | BAIXO — Botão é simples de adicionar e remover |

---

## Lote 3 — Médio Prazo (60 dias)

### H-012 — Insights em tempo real aumentam retorno

| Campo | Detalhe |
|---|---|
| **Hipótese** | Empresários que veem os insights em tempo real retornam mais |
| **Critério de sucesso** | Taxa de retorno em 7 dias no grupo com insight em tempo real >= 50% vs < 30% no grupo sem |
| **Critério de fracasso** | Retorno não difere entre grupos OU insight em tempo real distrai da conversa |
| **Evidências necessárias** | Taxa de conclusão, retorno em 7 dias, feedback sobre distração |
| **Quantidade mínima de observações** | 10 sessões por grupo (20 total) |
| **Tempo mínimo de coleta** | 14 dias |
| **Método de coleta** | A/B test: Versão A (insight aparece durante a conversa) vs Versão B (insight apenas no resumo final) |
| **Responsável sugerido** | Arquitetura |
| **Risco de implementar sem validar** | MÉDIO — Insights em tempo real exigem pipeline de processamento contínuo |

### H-014 — Tom formal → informal

| Campo | Detalhe |
|---|---|
| **Hipótese** | Tom formal no início seguido de tom mais informal gera mais engajamento |
| **Critério de sucesso** | NPS do grupo com transição de tom é >= 5 pontos maior que grupo com tom constante |
| **Critério de fracasso** | Empresários percebem mudança como "inconsistente" OU NPS não difere |
| **Evidências necessárias** | NPS, taxa de conclusão, feedback qualitativo sobre consistência |
| **Quantidade mínima de observações** | 8 sessões por grupo (16 total) |
| **Tempo mínimo de coleta** | 10 dias |
| **Método de coleta** | A/B test: Versão A (formal → informal gradual) vs Versão B (tom constante) |
| **Responsável sugerido** | Produto |
| **Risco de implementar sem validar** | BAIXO — Mudança de tom é ajuste de conteúdo |

### H-015 — Diagnóstico em 3 tópicos principais

| Campo | Detalhe |
|---|---|
| **Hipótese** | Empresários preferem diagnóstico em 3 tópicos principais (não mais que 5) |
| **Critério de sucesso** | Recall de tópicos após 7 dias no grupo de 3 tópicos >= 80% vs < 50% no grupo de 7 tópicos |
| **Critério de fracasso** | Empresários querem "ver todos os detalhes" OU recall não difere |
| **Evidências necessárias** | Número de tópicos lembrados após 7 dias, ações tomadas baseadas nos tópicos |
| **Quantidade mínima de observações** | 8 sessões por grupo (16 total) |
| **Tempo mínimo de coleta** | 14 dias |
| **Método de coleta** | A/B test: Versão A (3 tópicos) vs Versão B (7 tópicos). Medir recall após 7 dias |
| **Responsável sugerido** | Produto |
| **Risco de implementar sem validar** | BAIXO — Número de tópicos é ajustável sem mudança arquitetural |

### H-016 — Indicador de confiança sempre visível

| Campo | Detalhe |
|---|---|
| **Hipótese** | O indicador de confiança deve ser sempre visível (não colapsável) |
| **Critério de sucesso** | Eye tracking mostra que empresários olham para o indicador >= 3 vezes por sessão com fixação média >= 1s |
| **Critério de fracasso** | Indicador recebe < 2 fixações por sessão OU empresários reportam distração |
| **Evidências necessárias** | Eye tracking (número de fixações, tempo de fixação), feedback qualitativo |
| **Quantidade mínima de observações** | 10 sessões com eye tracking |
| **Tempo mínimo de coleta** | 10 dias |
| **Método de coleta** | Observação direta com eye tracking |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | MÉDIO — Manter indicador sempre visível ocupa espaço de tela e pode distrair |

### H-017 — Perfis analítico e intuitivo precisam de experiências diferentes

| Campo | Detalhe |
|---|---|
| **Hipótese** | Empresários com perfil "analítico" e "intuitivo" precisam de experiências diferentes |
| **Critério de sucesso** | Engajamento segmentado por perfil mostra NPS >= 8 pontos maior quando a abordagem corresponde ao perfil detectado |
| **Critério de fracasso** | Abordagem única funciona igualmente bem para ambos os perfis |
| **Evidências necessárias** | Engajamento por perfil, NPS segmentado, profundidade das respostas por perfil |
| **Quantidade mínima de observações** | 10 empresários de cada perfil (20 total) |
| **Tempo mínimo de coleta** | 20 dias |
| **Método de coleta** | A/B test: detectar perfil nas primeiras 3 respostas e adaptar tom (dados vs histórias). Medir NPS segmentado |
| **Responsável sugerido** | Arquitetura |
| **Risco de implementar sem validar** | ALTO — Personalização por perfil adiciona complexidade significativa ao Motor Cognitivo |

### H-019 — Silêncio produtivo

| Campo | Detalhe |
|---|---|
| **Hipótese** | Silêncio da IA durante reflexão do empresário é produtivo (não desconfortável) |
| **Critério de sucesso** | Respostas após pausa silenciosa têm profundidade >= 30% maior que respostas sem pausa |
| **Critério de fracasso** | Empresários reportam "me senti abandonado" ou profundidade não difere entre grupos |
| **Evidências necessárias** | Profundidade das respostas (entidades únicas, complexidade sintática), feedback pós-teste |
| **Quantidade mínima de observações** | 8 sessões por grupo (16 total) |
| **Tempo mínimo de coleta** | 10 dias |
| **Método de coleta** | A/B test: Versão A (IA espera em silêncio) vs Versão B (IA faz comentários periódicos como "Estou aqui") |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | MÉDIO — Silêncio pode ser interpretado como erro ou inatividade |

### H-020 — Retorno após diagnóstico completo

| Campo | Detalhe |
|---|---|
| **Hipótese** | Empresários que completam o diagnóstico têm 3x mais chance de retornar |
| **Critério de sucesso** | Taxa de retorno em 7 dias entre quem completou o diagnóstico é >= 3x maior que entre quem abandonou |
| **Critério de fracasso** | Taxa de retorno não difere significativamente entre grupos |
| **Evidências necessárias** | Retorno em 7, 14, 30 dias segmentado por conclusão do diagnóstico |
| **Quantidade mínima de observações** | 30 empresários (amostra total, independente de segmentação) |
| **Tempo mínimo de coleta** | 30 dias |
| **Método de coleta** | Observação direta: correlacionar conclusão do diagnóstico com retorno |
| **Responsável sugerido** | Produto |
| **Risco de implementar sem validar** | BAIXO — Apenas confirma o óbvio, mas o dado é necessário para calibrar estratégia de engajamento |

### H-021 — Microcelebrações aumentam engajamento

| Campo | Detalhe |
|---|---|
| **Hipótese** | Microcelebrações a cada insight aumentam engajamento na sessão |
| **Critério de sucesso** | NPS do grupo com celebrações é >= 5 pontos maior E tempo de sessão >= 20% maior |
| **Critério de fracasso** | Celebrações são percebidas como "artificiais" ou "forçadas" |
| **Evidências necessárias** | NPS, tempo de sessão, feedback qualitativo aberto |
| **Quantidade mínima de observações** | 8 sessões por grupo (16 total) |
| **Tempo mínimo de coleta** | 10 dias |
| **Método de coleta** | A/B test: Versão A (microcelebração visual a cada insight) vs Versão B (sem celebração) |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | MÉDIO — Microcelebrações requerem design e implementação visual. Podem parecer forçadas |

### H-022 — Som como inteligência viva

| Campo | Detalhe |
|---|---|
| **Hipótese** | A Ponte Digital deve ter som para ser percebida como inteligência viva |
| **Critério de sucesso** | >= 60% dos empresários no grupo com som respondem "sistema vivo" (vs "ferramenta") na pergunta "A Ponte pareceu um sistema vivo ou uma ferramenta?" |
| **Critério de fracasso** | Empresários desativam o som imediatamente OU reportam irritação |
| **Evidências necessárias** | Resposta à pergunta "A Ponte pareceu um sistema vivo ou uma ferramenta?", taxa de desativação do som |
| **Quantidade mínima de observações** | 10 sessões por grupo (20 total) |
| **Tempo mínimo de coleta** | 10 dias |
| **Método de coleta** | A/B test: Versão A (com som sutil, opt-out) vs Versão B (sem som) |
| **Responsável sugerido** | Experiência |
| **Risco de implementar sem validar** | ALTO — Som pode irritar usuários. Se H-022 for falsa, implementar som gera rejeição e dano à experiência |

---

## Cronograma Visual

```
Semana 1  | Semana 2  | Semana 3-4  | Semana 5-6  | Semana 7-8  | Semana 9-10
──────────┼───────────┼─────────────┼─────────────┼─────────────┼─────────────
LOTE 1    │           │             │             │             │
H-001 ████│████       │             │             │             │
H-004 ████│████       │             │             │             │
H-007 ████│████       │             │             │             │
H-008 ████│████       │             │             │             │
H-013 ████│██████     │             │             │             │
          │           │             │             │             │
          │ LOTE 2    │             │             │             │
          │ H-002 ████│████████████ │             │             │
          │ H-003 ████│████         │             │             │
          │ H-005 ████│████         │             │             │
          │ H-006 ████│████████████ │████████████ │             │
          │ H-009 ████│████         │             │             │
          │ H-010 ████│███          │             │             │
          │ H-011 ████│████         │             │             │
          │ H-018 ████│████         │             │             │
          │           │             │             │             │
          │           │             │ LOTE 3      │             │
          │           │             │ H-012 ██████│████████     │
          │           │             │ H-014 ██████│████         │
          │           │             │ H-015 ██████│████████     │
          │           │             │ H-016 ██████│████         │
          │           │             │ H-017 ██████│█████████████│█████
          │           │             │ H-019 ██████│████         │
          │           │             │ H-020 ██████│█████████████│████████████
          │           │             │ H-021 ██████│████         │
          │           │             │ H-022 ██████│████         │
          │           │             │             │             │
──────────┼───────────┼─────────────┼─────────────┼─────────────┼─────────────
Marco 1   │ Marco 2   │ Marco 3     │ Marco 4     │ Marco 5     │ Marco 6
Fim Lote 1│ Lote 2    │ Metade      │ Lote 2      │ Metade      │ Fim
5 hipóteses│ em andamento│ Lote 2    │ completo   │ Lote 3     │ Lote 3
validadas │ 4 em campo │ 2 concluídas│ 8/8        │ 4 concluídas│ 9/9
          │           │             │             │             │
          │           │             │             │             │
```

### Marcos de Validação

| Marco | Data alvo | Entregável |
|---|---|---|
| **M1** | Fim semana 2 | Relatório de validação das 5 hipóteses do Lote 1. Decisões: implementar ou abandonar cada feature |
| **M2** | Fim semana 3 | Relatório intermediário do Lote 2 (4 hipóteses em coleta) |
| **M3** | Fim semana 4 | Relatório de validação das primeiras 4 hipóteses do Lote 2 |
| **M4** | Fim semana 6 | Relatório de validação das 8 hipóteses do Lote 2. Decisões de implementação |
| **M5** | Fim semana 8 | Relatório intermediário do Lote 3 |
| **M6** | Fim semana 10 | Relatório de validação das 22 hipóteses. Toda hipótese vira SABEMOS ou REFUTADA |

---

## Regras de Decisão

| Resultado da validação | Ação |
|---|---|
| Hipótese **CONFIRMADA** | Vira SABEMOS. Pode ser implementada conforme especificado |
| Hipótese **REFUTADA** | Vira aprendizado documentado. Alternativa é adotada. Remover especificação original |
| Hipótese **INCONCLUSIVA** (dados insuficientes) | Prorrogar coleta por mais 1 ciclo OU reduzir ambição da hipótese |
| Hipótese **PARCIALMENTE CONFIRMADA** (confirmada em subgrupo) | Implementar apenas para o subgrupo que confirmou |

---

## Resumo do Plano

| Métrica | Valor |
|---|---|
| Total de hipóteses no plano | 22 |
| Lote 1 (imediato, 2 semanas) | 5 |
| Lote 2 (curto prazo, 30 dias) | 8 |
| Lote 3 (médio prazo, 60 dias) | 9 |
| Duração total do plano | 70 dias |
| Sessões mínimas necessárias | ~350 sessões (todos os lotes) |
| Empresários únicos necessários (estimativa) | 20-30 (com reuso entre lotes) |
| Método dominante | A/B test (14 hipóteses) |
| Risco alto de implementar sem validar | H-001, H-004, H-007, H-017, H-022 |

---

*Este documento é parte do Programa 25 — Validação Científica.*
*Transforma ACREDITAMOS em SABEMOS. 22 hipóteses. 70 dias. 0 implementação sem validação.*
