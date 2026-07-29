# Roadmap de Implementação — Programa 23

**Programa 23 | Fase 15 | Versão 1.0**

> Roadmap completo de implementação da Experiência Cognitiva da Ponte Digital. Organizado em 4 fases com 11 Work Packages. Cada WP contém prioridade, dependências, impacto, risco, complexidade, tempo estimado, ordem ideal e critério de aceite.

---

## Work Packages

### WP01 — Transparência Cognitiva (Mapa Cognitivo Vivo)

**Código:** P23-WP01

**Prioridade:** P0

**Dependências:** Nenhuma (pode começar imediatamente)

**Impacto no produto:** Transforma o chat de IA genérico em uma experiência cognitiva transparente. Empresário vê o motor pensando.

**Risco:** Médio — o mapa pode distrair em vez de ajudar se mal projetado. Risco mitigado pela especificação detalhada em `MAPAS_COGNITIVO_VIVO.md`.

**Complexidade:** Alta

**Tempo estimado:** 15 dias

**Ordem ideal:** 1º (fundação de toda a experiência)

**Critério de aceite:**
- [ ] Sidebar direita expansível funciona com estados recolhido/expandido
- [ ] 5 barras de conhecimento (Empresa, Financeiro, Clientes, Equipe, Operação) preenchem e crescem com dados reais
- [ ] Cards de hipótese surgem com informações reais do motor cognitivo
- [ ] Anel de confiança reflete o percentual real calculado
- [ ] Lacunas aparecem e são riscadas dinamicamente
- [ ] Estados (vazio, preenchendo, completo, revisando) funcionam corretamente
- [ ] Responsivo: mobile usa modal com swipe-to-dismiss
- [ ] Todas as animações seguem a especificação de `EXPERIENCIA_SENSORIAL.md`

---

### WP02 — Jornada da Primeira Semana

**Código:** P23-WP02

**Prioridade:** P0

**Dependências:** WP01 (o mapa é parte central da jornada)

**Impacto no produto:** Define se o empresário fica ou abandona. É o momento de ativação.

**Risco:** Alto — a jornada precisa ser inteligente, não apenas um script fixo. Se soar artificial, o efeito é oposto.

**Complexidade:** Alta

**Tempo estimado:** 20 dias

**Ordem ideal:** 2º (após o mapa)

**Critério de aceite:**
- [ ] Dias 1-7 têm ações planejadas e executadas automaticamente pela IA
- [ ] Dia 1: onboarding com 5 perguntas + mini-diagnóstico + 1 insight
- [ ] Dia 3: primeira hipótese com >60% de confiança
- [ ] Dia 5: primeira recomendação
- [ ] Dia 7: relatório semanal consolidado
- [ ] Empresário que completa a semana tem >80% de chance de retornar (meta)
- [ ] Jornada é adaptativa — se empresário avança rápido, os dias se condensam

---

### WP03 — Motor de Insights

**Código:** P23-WP03

**Prioridade:** P0

**Dependências:** WP01 (insights usam o mapa como canvas de apresentação)

**Impacto no produto:** O insight é o produto principal. Sem ele, a Ponte não entrega inteligência.

**Risco:** Alto — detecção de padrões não óbvios é tecnicamente desafiadora. Risco de gerar insights falsos ou irrelevantes.

**Complexidade:** Alta

**Tempo estimado:** 25 dias

**Ordem ideal:** 3º (após a jornada da primeira semana)

**Critério de aceite:**
- [ ] IA detecta padrões em dados financeiros, de clientes, equipe e operação
- [ ] Insight apresentado com: padrão, evidência, impacto, pergunta para explorar
- [ ] Primeiro insight é celebrado explicitamente
- [ ] Insights podem ser salvos, compartilhados, aprofundados
- [ ] Insight vira card na biblioteca de conhecimento
- [ ] Taxa de aceite de insights >60% (empresário considera relevante)
- [ ] Falsos positivos <10%

---

### WP04 — Nova Landing Page

**Código:** P23-WP04

**Prioridade:** P0

**Dependências:** WP03 (mini-diagnóstico usa o motor de insights)

**Impacto no produto:** A comunicação correta atrai o perfil certo de empresário.

**Risco:** Baixo — é redesign de página + feature de mini-diagnóstico. Nada arquitetural.

**Complexidade:** Alta (pela combinação de comunicação + funcionalidade nova)

**Tempo estimado:** 12 dias

**Ordem ideal:** 4º (simultâneo ao WP03 ou após)

**Critério de aceite:**
- [ ] Landing comunica "decisão", não "software"
- [ ] Mini-diagnóstico: 3 perguntas → mini-mapa cognitivo se formando
- [ ] Nenhum login necessário para experimentar o mini-diagnóstico
- [ ] Taxa de conversão visitante → cadastro ≥ 5% (métrica)
- [ ] Tempo médio na landing ≥ 45s

---

### WP05 — Dashboard Inteligente

**Código:** P23-WP05

**Prioridade:** P1

**Dependências:** WP01 e WP03 (dashboard exibe estado cognitivo e insights)

**Impacto no produto:** Transforma o dashboard de "tela de passagem" em "centro de decisão".

**Risco:** Médio — risco de sobrecarregar o dashboard se muitos elementos forem adicionados.

**Complexidade:** Alta

**Tempo estimado:** 15 dias

**Ordem ideal:** 5º

**Critério de aceite:**
- [ ] Dashboard exibe estado cognitivo atual (% de diagnóstico completo)
- [ ] Insight do dia gerado automaticamente
- [ ] Recomendações pendentes com contagem
- [ ] Última sessão com resumo
- [ ] Mapa Cognitivo em versão reduzida visível
- [ ] Empresário consegue identificar o elemento mais importante em <1s
- [ ] Modo "Foco" disponível (dashboard simplificado)

---

### WP06 — Resumo de Sessão

**Código:** P23-WP06

**Prioridade:** P1

**Dependências:** WP01 (resumo usa dados do mapa) e WP03 (insights da sessão)

**Impacto no produto:** Fecha o ciclo da conversa. Empresário sai com uma conclusão.

**Risco:** Baixo — é uma feature de apresentação, não de processamento.

**Complexidade:** Média

**Tempo estimado:** 8 dias

**Ordem ideal:** 6º

**Critério de aceite:**
- [ ] Cada sessão termina com resumo: descobertas, insights, lacunas, próximos passos
- [ ] Resumo pode ser salvo ou compartilhado
- [ ] IA personaliza o desfecho (frase de encerramento com nome do empresário + tema da sessão)
- [ ] Resumo aparece automaticamente ao final do diagnóstico completo
- [ ] Empresário pode solicitar resumo a qualquer momento

---

### WP07 — Sistema de Recomendações

**Código:** P23-WP07

**Prioridade:** P1

**Dependências:** WP03 (recomendações baseadas em insights) e WP05 (dashboard como ponto de exibição)

**Impacto no produto:** A recomendação é o produto final da inteligência. Completa o ciclo descoberta→ação.

**Risco:** Alto — recomendação errada destrói confiança. Requer evidências sólidas e transparência.

**Complexidade:** Alta

**Tempo estimado:** 20 dias

**Ordem ideal:** 7º

**Critério de aceite:**
- [ ] Recomendação aparece em local dedicado com: ação, evidências (mínimo 2), impacto esperado
- [ ] Empresário pode aceitar, recusar com motivo, ou agendar
- [ ] Recomendação aceita é acompanhada: IA pergunta resultado após período configurável
- [ ] Histórico de recomendações: taxa de aceite, taxa de sucesso, impacto médio
- [ ] Primeira recomendação é celebrada
- [ ] Precisão da recomendação >70% (validação com resultado real)

---

### WP08 — Feedback Loop de Decisão

**Código:** P23-WP08

**Prioridade:** P1

**Dependências:** WP07 (recomendações geram decisões)

**Impacto no produto:** Constrói confiança. Empresário vê o impacto real das recomendações.

**Risco:** Médio — medir resultado de decisão é incerto. Decisões de negócio têm múltiplas variáveis.

**Complexidade:** Média

**Tempo estimado:** 10 dias

**Ordem ideal:** 8º

**Critério de aceite:**
- [ ] IA detecta quando empresário tomou decisão baseada em recomendação
- [ ] Primeira decisão apoiada é registrada como marco
- [ ] IA retorna após período: "Lembra daquela decisão? Os resultados foram X"
- [ ] Decisão com resultado positivo reforça confiança da IA
- [ ] Decisão com resultado negativo alimenta aprendizado do motor

---

### WP09 — Relatório Mensal Inteligente

**Código:** P23-WP09

**Prioridade:** P1

**Dependências:** WP03, WP06, WP07, WP08 (consolida insights, recomendações, decisões)

**Impacto no produto:** Visibilidade do valor acumulado. Base para decisão de renovação.

**Risco:** Baixo — relatório consolidado, sem processamento novo.

**Complexidade:** Alta (pela quantidade de fontes de dados a consolidar)

**Tempo estimado:** 12 dias

**Ordem ideal:** 9º

**Critério de aceite:**
- [ ] Relatório mensal automático no dia 30
- [ ] Conteúdo: evolução do conhecimento, hipóteses confirmadas/descartadas, recomendações feitas, decisões apoiadas
- [ ] Tom narrativo, não apenas números: "Neste mês, descobrimos que..."
- [ ] IA inicia conversa no mês seguinte com "Vamos ver o que mudou?"
- [ ] Empresário compartilha relatório com sócios em 1 clique

---

### WP10 — Login Personalizado

**Código:** P23-WP10

**Prioridade:** P2

**Dependências:** Nenhuma

**Impacto no produto:** Baixo impacto isolado. Reforça sensação de continuidade.

**Risco:** Baixíssimo

**Complexidade:** Baixa

**Tempo estimado:** 3 dias

**Ordem ideal:** 10º

**Critério de aceite:**
- [ ] Primeiro login: tela de apresentação personalizada com nome do empresário
- [ ] Retorno: "João, estávamos analisando seu fluxo de caixa. Quer continuar?"
- [ ] Login redireciona para o estado da última sessão
- [ ] Nenhum elemento cognitivo novo na tela de login

---

### WP11 — Ciclo Decisão → Ação (Automação)

**Código:** P23-WP11

**Prioridade:** P2

**Dependências:** WP07 (automação nasce de recomendações aceitas)

**Impacto no produto:** Fecha o ciclo completo. Ponte não apenas recomenda — executa.

**Risco:** Alto — automação mal feita pode causar danos reais (financeiros, operacionais).

**Complexidade:** Alta

**Tempo estimado:** 25 dias

**Ordem ideal:** 11º

**Critério de aceite:**
- [ ] IA detecta tarefas repetitivas e sugere automatizar
- [ ] Sugestão aparece como recomendação no dashboard
- [ ] Empresário aceita → IA configura automação (ou guia configuração)
- [ ] Automações têm salvaguardas: confirmação, rollback, log
- [ ] Histórico de automações ativas com status e resultados
- [ ] Zero automação executada sem confirmação explícita

---

## Fases do Roadmap

### Fase 1 — Fundação (P0, curto prazo, alto impacto)

**Duração estimada:** 30-40 dias

**WPs incluídos:**

| WP | Nome | Dias |
|---|---|---|
| WP01 | Transparência Cognitiva | 15 |
| WP02 | Jornada da Primeira Semana | 20 |
| WP03 | Motor de Insights | 25 |
| WP04 | Nova Landing Page | 12 |

**Ordem:** WP01 → WP02 → WP03 (simultâneo WP04)

**Dependência crítica:** WP01 e WP03 são interdependentes para o restante

**Critério de sucesso da fase:**
- [ ] Empresário vê o mapa cognitivo durante a conversa
- [ ] Empresário recebe ao menos 1 insight relevante na primeira semana
- [ ] Landing comunica inteligência, não software
- [ ] Taxa de abandono na primeira semana reduz 30%

**Riscos:**
- WP02 pode entregar jornada artificial se não houver dados reais (mitigar com fallbacks textuais)
- WP03 pode gerar insights de baixa qualidade (mitigar com threshold de confiança mínimo de 40%)

---

### Fase 2 — Inteligência (P0-P1, médio prazo)

**Duração estimada:** 30-40 dias

**WPs incluídos:**

| WP | Nome | Dias |
|---|---|---|
| WP05 | Dashboard Inteligente | 15 |
| WP06 | Resumo de Sessão | 8 |
| WP07 | Sistema de Recomendações | 20 |

**Ordem:** WP05 → WP06 → WP07

**Dependências:** Fase 1 completa (especialmente WP01 e WP03)

**Critério de sucesso da fase:**
- [ ] Dashboard é o centro de decisão, não de dados
- [ ] Toda sessão termina com resumo
- [ ] Recomendações são registradas, acompanhadas e medidas
- [ ] NPS da experiência ≥ 50 (net promoter score)

**Riscos:**
- WP07 pode gerar recomendações rejeitadas em massa (mitigar com IA transparente mostrando evidências)
- WP05 pode sobrecarregar o dashboard (mitigar com teste de 1s: empresário identifica elemento principal em 1 segundo)

---

### Fase 3 — Profundidade (P1-P2, longo prazo)

**Duração estimada:** 30-45 dias

**WPs incluídos:**

| WP | Nome | Dias |
|---|---|---|
| WP08 | Feedback Loop de Decisão | 10 |
| WP09 | Relatório Mensal Inteligente | 12 |
| WP11 | Ciclo Decisão → Ação (Automação) | 25 |

**Ordem:** WP08 → WP09 → WP11

**Dependências:** Fase 2 completa (recomendações e decisões são base)

**Critério de sucesso da fase:**
- [ ] Decisões apoiadas são registradas e têm acompanhamento
- [ ] Relatório mensal é aberto por >70% dos empresários
- [ ] Primeiras automações sugeridas com aceite >30%
- [ ] Zero incidente de automação incorreta

**Riscos:**
- WP11 é o WP mais arriscado do programa inteiro (mitigar com rollout gradual e safelist de empresas na primeira onda)
- WP09 requer IA generativa intensiva (mitigar com cache de relatórios e geração assíncrona)

---

### Fase 4 — Refinamento (P2, contínuo)

**Duração estimada:** Contínuo (pós-Fase 3)

**WPs incluídos:**

| WP | Nome | Dias |
|---|---|---|
| WP10 | Login Personalizado | 3 |

**Ordem:** Último

**Dependências:** Nenhuma essencial

**Critério de sucesso da fase:**
- [ ] Login personalizado implementado e testado
- [ ] Polimento contínuo: animações, micro-interações, performance perceptual

**Observação:** O refinamento não é uma fase com fim — é um estado contínuo de melhoria. O WP10 é o único WP discreto aqui. O restante é acompanhamento de métricas.

---

## Matriz Consolidada

| WP | Nome | Prio | Dias | Fase | Risco | Complexidade |
|---|---|---|---|---|---|---|
| WP01 | Transparência Cognitiva | P0 | 15 | 1 | Médio | Alta |
| WP02 | Jornada Primeira Semana | P0 | 20 | 1 | Alto | Alta |
| WP03 | Motor de Insights | P0 | 25 | 1 | Alto | Alta |
| WP04 | Nova Landing Page | P0 | 12 | 1 | Baixo | Alta |
| WP05 | Dashboard Inteligente | P1 | 15 | 2 | Médio | Alta |
| WP06 | Resumo de Sessão | P1 | 8 | 2 | Baixo | Média |
| WP07 | Sistema de Recomendações | P1 | 20 | 2 | Alto | Alta |
| WP08 | Feedback Loop de Decisão | P1 | 10 | 3 | Médio | Média |
| WP09 | Relatório Mensal | P1 | 12 | 3 | Baixo | Alta |
| WP10 | Login Personalizado | P2 | 3 | 4 | Baixo | Baixa |
| WP11 | Automação | P2 | 25 | 3 | Alto | Alta |

**Total estimado (dias corridos, paralelizando):** 90-120 dias

**Total estimado (dias-homem, sem paralelismo):** 165 dias

---

## Cronograma Visual (Estimado)

```
Mês 1       Mês 2       Mês 3       Mês 4
├────┼────┼────┼────┼────┼────┼────┼────┤
WP01 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
WP02 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
WP03 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
WP04 ▓▓▓▓▓▓▓▓▓▓▓▓▓
     WP05 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
     WP06 ▓▓▓▓▓▓▓▓▓
     WP07 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
          WP08 ▓▓▓▓▓▓▓▓▓▓▓
          WP09 ▓▓▓▓▓▓▓▓▓▓▓▓
          WP11 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                    WP10 ▓▓▓
▓▓▓
       Fase 1     Fase 2    Fase 3   F4
       Fundação   Intel.    Prof.    Ref.
```

---

## Plano de Contingência

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| WP03 (insights) gera falsos positivos | Alta | Crítico | Threshold mínimo de confiança 40%; revisão humana nos primeiros 30 dias |
| WP02 (primeira semana) soa artificial | Média | Alto | Testar com 5 empresários reais antes de liberar; iterar roteiro |
| WP07 (recomendações) rejeitadas em massa | Média | Alto | Transparência total das evidências; se taxa de aceite <30%, pausar e revisar |
| WP11 (automação) causa erro financeiro | Baixa | Crítico | Rollout gradual: 5 empresas na primeira onda; confirmação explícita em 2 etapas |
| Fase 1 atrasa além de 50 dias | Média | Médio | Priorizar WP01 + WP03 (essenciais); WP02 e WP04 podem ser simplificados |
| Equipe não consegue implementar todas as animações | Baixa | Baixo | Animações são P2 em cada WP; priorizar funcionamento sobre polimento visual |

---

## Recomendações Finais

1. **Não pular a ordem:** WP01 e WP03 são a base. Tudo depende deles. Acelerar WP02 ou WP04 antes do mapa/motor é desperdício.
2. **Testar com empresários reais:** cada WP deve ser testado com 3-5 empresários antes de passar para o próximo. Feedback qualitativo vale mais que métrica.
3. **Não fazer tudo:** se o prazo apertar, cortar WP10 (Login) e WP11 (Automação) — são P2. A experiência central (mapa + insight + jornada + recomendação) é o que entrega valor.
4. **Métrica de cancelamento:** se após Fase 2 o NPS da experiência não subir >20pts, reavaliar o programa.
