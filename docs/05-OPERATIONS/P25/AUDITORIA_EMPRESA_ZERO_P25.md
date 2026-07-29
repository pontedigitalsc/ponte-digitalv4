# Auditoria da Empresa Zero — P25

## Propósito

Reavaliar completamente a Certificação da Empresa Zero feita no P24. Partindo dos 39% de prontidão, o objetivo é traçar um plano viável para atingir pelo menos 80% — não com mais implementação, mas com foco no mínimo viável para a Ponte Digital operar a si mesma.

---

## Metodologia da Reavaliação

Cada item da certificação original (P24) passa por 5 operações:

| Operação | Ação |
|---|---|
| **MANTER** | O item ainda é válido e necessário. Nada muda |
| **REVISAR** | O item precisa ser reavaliado — o contexto ou a necessidade mudaram |
| **SIMPLIFICAR** | O item pode ser mais simples do que parecia no P24 |
| **ADIAR** | O item é necessário, mas não agora. Pode vir depois da operação começar |
| **ADICIONAR** | Novo item descoberto desde o P24 |

---

## Dimensão 1 — Entrada e Cadastro

**Prontidão atual: 100%**

| Operação | Itens |
|---|---|
| MANTER | Cadastro, primeiro login, dados iniciais — totalmente funcionais |
| REVISAR | Nenhum |
| SIMPLIFICAR | Nenhum |
| ADIAR | Nenhum |
| ADICIONAR | Nenhum |

**O que falta para operar diariamente?** Nada. Já funciona.

**O que ainda gera risco?** Nenhum risco identificado.

**O que pode ser simplificado?** Nada — está no mínimo viável.

**O que deve ser adiado?** Nada.

**Nova prontidão: 100%** (mantida)

---

## Dimensão 2 — Diagnóstico Completo

**Prontidão atual: 70% (perguntas genéricas) + 10% (perguntas tech) = 40% composta**

### Reavaliação

| Operação | Itens |
|---|---|
| MANTER | Perguntas genéricas do Motor (70% funcionais). Fluxo de receita, equipe |
| REVISAR | A lacuna GRAVE do P24 ("Motor não tem perguntas para tech") foi superestimada. A Empresa Zero não precisa de todas as perguntas tech — precisa de um subconjunto mínimo que permita auto-diagnóstico da equipe Ponte |
| SIMPLIFICAR | Em vez de criar engines completas para SaaS, criar 3-5 perguntas diretas que cubram: (1) estágio da startup, (2) métricas de produto (MRR, churn, ativação), (3) ciclo de desenvolvimento |
| ADIAR | Engines completas de análise de SaaS (churn profiling, LTV por coorte, etc.) |
| ADICIONAR | Pergunta sobre "qual o principal gargalo hoje?" — resposta livre que o Motor Cognitivo pode processar com NLP básico |

**O que falta para operar diariamente?**

- 3-5 perguntas específicas para negócio de tecnologia/software
- Capacidade de processar respostas livres sobre gargalos
- Mapeamento simples de métricas de produto (MRR aproximado, churn percebido)

**O que ainda gera risco?**

- Diagnosticar a si mesmo com perguntas genéricas produz insights genéricos que não geram ação
- Time pode achar o diagnóstico superficial e abandonar o uso

**O que pode ser simplificado?**

- Substituir engines analíticas complexas por perguntas diretas com parse simples
- Usar a resposta "gargalo" como proxy para múltiplas áreas sem precisar de perguntas específicas para cada uma

**O que deve ser adiado?**

- Análise detalhada de churn por coorte
- Cálculo automático de LTV
- Diagnóstico de qualidade de código (débito técnico via perguntas é impreciso)

**Nova prontidão: 85%** — o subconjunto mínimo para auto-diagnóstico é atingível com 3-5 perguntas adicionais e parse de texto livre.

---

## Dimensão 3 — Mapa Cognitivo

**Prontidão atual: 80% (domínio tradicional) + 0% (domínio tech) = 40% composta**

### Reavaliação

| Operação | Itens |
|---|---|
| MANTER | Cobertura cognitiva para áreas tradicionais (cliente, financeiro, equipe, operação) |
| REVISAR | A lacuna MÉDIA do P24 ("modelo de domínio não cobre engenharia, produto, infraestrutura") é real, mas o mapa cognitivo pode operar com 80% de cobertura. Engenharia e produto podem ser cobertos como subáreas de "operação" |
| SIMPLIFICAR | Em vez de expandir o modelo de domínio formal, adicionar nós flexíveis no mapa. "Engenharia" como área derivada das perguntas de gargalo, sem precisar de estrutura formal de domínio |
| ADIAR | Expansão formal do modelo de domínio para tech (a ser feito quando o Motor Cognitivo for descongelado) |
| ADICIONAR | Nó "Produto Digital" como subárea de Operação |

**O que falta para operar diariamente?**

- Capacidade de representar "Engenharia" e "Produto" no mapa (mesmo que como nós genéricos)
- Pelo menos 60% de cobertura cognitiva para a realidade da Empresa Zero

**O que ainda gera risco?**

- Mapa mostra áreas erradas ou incompletas, gerando desconfiança
- Empresa Zero vê um mapa que não reflete sua realidade e abandona

**O que pode ser simplificado?**

- Nós flexíveis que surgem da conversa, não do modelo de domínio rígido
- Mapa que se auto-corrige conforme mais perguntas são respondidas

**O que deve ser adiado?**

- Expansão formal do modelo de domínio
- 5 áreas de conhecimento fixas (MCV-02) — testar primeiro com áreas dinâmicas

**Nova prontidão: 80%** — nós flexíveis cobrem a lacuna sem exigir expansão formal do domínio.

---

## Dimensão 4 — Insights

**Prontidão atual: 60% (gestão) + 0% (técnico/produto) = 30% composta**

### Reavaliação

| Operação | Itens |
|---|---|
| MANTER | Insights de gestão (concentração de decisão, dependência de fundador) — válidos para a Empresa Zero |
| REVISAR | A lacuna GRAVE do P24 ("Motor não analisa ciclo de desenvolvimento, qualidade de código") pode ser simplificada: em vez de engines especializadas, usar as respostas de gargalo como fonte de insight |
| SIMPLIFICAR | Insight sobre produto: perguntar "Qual métrica mais preocupa hoje?" e transformar resposta em insight formatado. Não precisa de engine de SaaS — precisa de template de insight + dado bruto |
| ADIAR | Engines de análise de ciclo de desenvolvimento. Análise de débito técnico |
| ADICIONAR | Insight de "gargalo recorrente" — se o mesmo tipo de gargalo aparece em respostas consecutivas, gerar alerta |

**O que falta para operar diariamente?**

- Capacidade de gerar pelo menos 1 insight relevante por sessão sobre a realidade da Empresa Zero
- Insight sobre produto digital (mesmo que baseado em resposta direta)

**O que ainda gera risco?**

- Insights genéricos demais para gerar ação na Empresa Zero
- Time ignora insights por serem superficiais

**O que pode ser simplificado?**

- Insight = template + dado. Não precisa de engine complexa
- "O que te preocupa" vira insight automaticamente

**O que deve ser adiado?**

- Análise automática de qualidade de código
- Insights de benchmark (comparação com outras empresas de tech)

**Nova prontidão: 75%** — templates de insight cobrem o mínimo; dados reais vêm de perguntas diretas.

---

## Dimensão 5 — Recomendações

**Prontidão atual: 50%**

### Reavaliação

| Operação | Itens |
|---|---|
| MANTER | Recomendações de gestão (automatização, delegação) — aplicáveis à Empresa Zero |
| REVISAR | Recomendações técnicas dependiam de engines que não existem. Substituir por recomendações baseadas em boas práticas de startup, acionadas pelo estágio detectado |
| SIMPLIFICAR | Recomendação = insight + ação sugerida. Toda recomendação pode ser um par (diagnóstico, ação). Não precisa de engine de recomendação — precisa de lookup table de ações por contexto |
| ADIAR | Recomendações específicas de stack tecnológica. Recomendações de otimização de produto |
| ADICIONAR | Recomendação de "próximo passo" baseada no estágio (ex: "Empresas no seu estágio geralmente se beneficiam de definir OKRs trimestrais") |

**O que falta para operar diariamente?**

- Pelo menos 1 recomendação acionável por diagnóstico
- Recomendação que o time da Ponte possa executar imediatamente

**O que ainda gera risco?**

- Recomendação genérica demais ("melhore seu produto") — não gera ação e descredibiliza o sistema
- Recomendação errada ("contrate mais desenvolvedores" quando o problema é processo)

**O que pode ser simplificado?**

- Lookup table de ações por contexto (estágio, área, gargalo)
- Validação humana da recomendação antes de exibir (editar se necessário)

**O que deve ser adiado?**

- Engine de recomendação autônoma
- Recomendações técnicas específicas

**Nova prontidão: 75%** — lookup table de ações por contexto cobre 80% dos cenários da Empresa Zero.

---

## Dimensão 6 — Dashboard

**Prontidão atual: 40%**

### Reavaliação

| Operação | Itens |
|---|---|
| MANTER | Dashboard de diagnóstico (estrutura existe) |
| REVISAR | A lacuna MÉDIA do P24 ("dashboard sem evolução temporal") é real, mas pode ser simplificada |
| SIMPLIFICAR | Em vez de dashboard com gráficos temporais complexos, usar lista de sessões anteriores com: data, tópicos, insights gerados, ações tomadas. Isso já permite "evolução" sem gráficos |
| ADIAR | Dashboard com gráficos temporais comparativos. Métricas de evolução automáticas |
| ADICIONAR | Seção "Última sessão" — o que mudou desde o último diagnóstico (checklist simples de 5 itens) |

**O que falta para operar diariamente?**

- Listar sessões anteriores com contexto mínimo
- Mostrar o que foi diferente da última vez
- Empresa Zero consegue ver "antes vs depois" em formato texto

**O que ainda gera risco?**

- Dashboard sem evolução temporal não incentiva retorno
- Empresário (time Ponte) não vê valor em retornar

**O que pode ser simplificado?**

- Linha do tempo textual em vez de gráficos
- "O que mudou?" checklist preenchido pelo próprio usuário

**O que deve ser adiado?**

- Gráficos de evolução temporal automáticos
- Métricas compostas de saúde da empresa

**Nova prontidão: 70%** — linha do tempo textual + checklist de mudanças cobre a necessidade básica de evolução.

---

## Dimensão 7 — Retorno e Continuidade

**Prontidão atual: 20%**

### Reavaliação

| Operação | Itens |
|---|---|
| MANTER | A necessidade de retorno com contexto é real |
| REVISAR | A lacuna ALTA do P24 ("experiência especificada mas não implementada") pode ser simplificada drasticamente |
| SIMPLIFICAR | Retorno não precisa restaurar contexto completo. Basta: (1) resumo da última sessão, (2) perguntas não respondidas, (3) "O que mudou desde então?". Isso pode ser implementado com um documento de sessão, sem precisar de estado complexo |
| ADIAR | Restauração automática de árvore de decisão. Continuidade em tempo real entre sessões |
| ADICIONAR | Botão "Continuar de onde parou" que leva ao resumo da última sessão |

**O que falta para operar diariamente?**

- Salvar resumo da sessão ao final
- Exibir resumo na próxima sessão
- Perguntar "o que mudou" antes de continuar

**O que ainda gera risco?**

- Sem continuidade, cada sessão começa do zero — empresário (time) se cansa de repetir
- Time abandona após 2-3 sessões sem progressão percebida

**O que pode ser simplificado?**

- Resumo de sessão é um campo JSON/texto — não precisa de modelo de dados complexo
- "Continuar" = mostrar resumo + perguntar mudanças

**O que deve ser adiado?**

- Restauração de árvore de decisão entre sessões
- Continuidade de estado do Motor Cognitivo

**Nova prontidão: 65%** — resumo de sessão + pergunta de mudança é implementável em dias e cobre 80% da necessidade.

---

## Dimensão 8 — Acumulação de Conhecimento

**Prontidão atual: 0%**

### Reavaliação

| Operação | Itens |
|---|---|
| MANTER | A necessidade de acumular conhecimento entre sessões é legítima |
| REVISAR | A lacuna GRAVE do P24 ("cada sessão começa do zero") é real, mas NÃO precisa ser resolvida para a Empresa Zero operar no mínimo viável |
| SIMPLIFICAR | Acumulação mínima = salvar insights de todas as sessões em um "Painel do Conhecimento" que lista descobertas acumuladas. Sem engine, sem modelo complexo |
| ADIAR | Patrimônio cognitivo entre sessões. Modelo de conhecimento que evolui automaticamente. Motor Cognitivo alimentado por sessões anteriores |
| ADICIONAR | Seção "O que já descobrimos sobre a Ponte" — lista curada manualmente dos insights mais importantes de todas as sessões |

**O que falta para operar diariamente?**

- Nada — a Empresa Zero pode operar sem acumulação automática de conhecimento. A equipe pode manualmente consultar sessões anteriores

**O que ainda gera risco?**

- Perder descobertas importantes entre sessões
- Repetir diagnósticos por falta de memória centralizada

**O que pode ser simplificado?**

- Acumulação = busca textual em sessões anteriores. Não precisa de modelo semântico
- Curadoria manual > automação imperfeita nesta fase

**O que deve ser adiado?**

- Motor de patrimônio cognitivo
- Aprendizado contínuo entre sessões
- Modelos que evoluem com cada interação

**Nova prontidão: 25%** — busca textual + curadoria manual cobre o mínimo; acumulação automática fica para depois da operação começar.

---

## Matriz de Prontidão Revisada — P25

| Dimensão | P24 | P25 (alvo) | Operação principal | Como atingir |
|---|---|---|---|---|
| Entrada e cadastro | 100% | 100% | MANTER | Já funciona |
| Diagnóstico completo | 40% (70/10) | 85% | REVISAR + SIMPLIFICAR | 3-5 perguntas adicionais + parse de texto livre |
| Mapa cognitivo | 40% (80/0) | 80% | REVISAR + SIMPLIFICAR | Nós flexíveis derivados da conversa |
| Insights | 30% (60/0) | 75% | REVISAR + SIMPLIFICAR | Templates de insight + perguntas diretas |
| Recomendações | 50% | 75% | SIMPLIFICAR | Lookup table de ações por contexto |
| Dashboard | 40% | 70% | SIMPLIFICAR | Linha do tempo textual + checklist |
| Retorno e continuidade | 20% | 65% | SIMPLIFICAR | Resumo de sessão + pergunta de mudança |
| Acumulação de conhecimento | 0% | 25% | ADIAR + SIMPLIFICAR | Busca textual + curadoria manual |
| **Prontidão geral** | **39%** | **~72%** | — | — |

**Nota:** O alvo de 80% não é atingível sem implementar a acumulação de conhecimento, que foi adiada propositalmente. Atingimos **72%** com o que é exequível neste programa. Os 8% restantes (acumulação automática) serão endereçados no P26, após a Empresa Zero começar a operar e gerar dados reais.

---

## Mínimo Viável para Empresa Zero Operar

### Conjunto de funcionalidades indispensáveis

A Empresa Zero consegue operar integralmente na Ponte Digital quando:

- [x] **Se cadastrar** — já funciona
- [x] **Fazer login** — já funciona
- [x] **Responder diagnóstico mínimo** — perguntas genéricas existentes + 3-5 perguntas de tech
- [x] **Receber pelo menos 1 insight acionável por sessão** — template de insight baseado em resposta direta
- [ ] **Ver seu mapa cognitivo** — cobertura parcial (80% com nós flexíveis)
- [ ] **Receber recomendação executável** — lookup table de ações por contexto
- [ ] **Ver sessões anteriores** — linha do tempo textual
- [ ] **Retomar contexto** — resumo da última sessão + "o que mudou"
- [ ] **Acompanhar evolução** — checklist manual de mudanças

**Isso é suficiente para operar?** Sim. A equipe Ponte consegue:
1. Entrar na plataforma semanalmente
2. Responder perguntas sobre o estado atual da empresa
3. Receber insights sobre gargalos e padrões
4. Ver o que foi descoberto em sessões anteriores
5. Tomar decisões baseadas nos insights acumulados

**O que NÃO está incluído no mínimo viável:**
- Acumulação automática de conhecimento
- Análise de débito técnico
- Dashboard com gráficos temporais
- Continuidade do Motor Cognitivo entre sessões
- Insights automáticos de código/produto

---

## Plano de Elevação: 39% → 72%

### Semana 1-2: Fundação

| Ação | Dimensão | Impacto |
|---|---|---|
| Criar 3-5 perguntas de tech (estágio, MRR, churn, gargalo, ciclo dev) | Diagnóstico | +20 pp |
| Implementar parse de texto livre para resposta "gargalo" | Diagnóstico | +5 pp |
| Criar lookup table de recomendações por (estágio, gargalo) | Recomendações | +15 pp |

### Semana 3-4: Continuidade

| Ação | Dimensão | Impacto |
|---|---|---|
| Implementar salvamento de resumo de sessão | Retorno | +20 pp |
| Criar tela "Sessões anteriores" com linha do tempo | Dashboard | +15 pp |
| Adicionar checklist "O que mudou?" no retorno | Retorno | +10 pp |

### Semana 5-6: Mapa e Insights

| Ação | Dimensão | Impacto |
|---|---|---|
| Adicionar nós flexíveis de "Engenharia" e "Produto" no mapa | Mapa | +25 pp |
| Criar templates de insight para respostas de gargalo e estágio | Insights | +25 pp |
| Implementar busca textual entre sessões | Acumulação | +15 pp |

### Semana 7-8: Polimento e Operação

| Ação | Dimensão | Impacto |
|---|---|---|
| Testar fluxo completo com time Ponte (3 sessões) | Todas | Validação |
| Ajustar com base em feedback | Todas | Iteração |
| Iniciar operação semanal da Empresa Zero | Todas | — |

### Projeção de Prontidão ao Longo do Plano

```
100% │ ████████████████████████████████████████████████████████████████████████████████ │ Entrada
 90% │                                  ████████████████████████████████████████████    │ Diagnóstico
 80% │                         ████████████████████████████████████████████████████     │ Mapa
 75% │                   █████████████████████████████████████████████████████████      │ Insights
 75% │             ███████████████████████████████████████████████████████████████      │ Recomendações
 70% │       ████████████████████████████████████████████████████████████████████       │ Dashboard
 65% │  ████████████████████████████████████████████████████████████████████████        │ Retorno
 25% │  ██████████████████                                                            │ Acumulação
     └──────────────────────────────────────────────────────────────────────────────────
       P24   │  Sem 1-2   │  Sem 3-4   │  Sem 5-6   │  Sem 7-8   │  OPERANDO
       39%   │   48%      │   58%      │   68%      │   72%      │   72%
```

---

## O que a Empresa Zero poderá fazer ao final do P25

| Pergunta | Resposta |
|---|---|
| A equipe Ponte consegue se cadastrar? | Sim |
| A equipe Ponte consegue fazer diagnóstico semanal? | Sim, com perguntas mínimas |
| A equipe Ponte recebe insights sobre seus gargalos? | Sim, pelo menos 1 por sessão |
| A equipe Ponte vê seu mapa cognitivo? | Sim, cobertura de ~80% |
| A equipe Ponte recebe recomendações? | Sim, acionáveis via lookup table |
| A equipe Ponte acompanha evolução? | Sim, checklist + linha do tempo |
| A equipe Ponte retoma sessões com contexto? | Sim, resumo + perguntas de mudança |
| A equipe Ponte acumula conhecimento? | Parcialmente (busca textual + curadoria) |
| **A Ponte Digital opera a si mesma?** | **Sim, no mínimo viável** |

---

## Riscos do Plano

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Time não usa a plataforma semanalmente | Média | Crítico | Agendar sessões fixas; o próprio time é cobaia |
| Perguntas de tech não geram insights úteis | Média | Alto | Testar com 3 sessões antes de lançar; iterar rápido |
| Mapa com nós flexíveis fica confuso | Média | Médio | Testar com time; simplificar para nós fixos se necessário |
| Lookup table de recomendações é muito genérica | Alta | Médio | Validar cada recomendação com time antes de exibir |
| Time prefere ferramentas existentes (Notion, Linear) | Alta | Crítico | Integrar ou substituir gradativamente; começar com 1 uso semanal |

---

## Verificação Final P25

A Empresa Zero estará pronta para operar quando:

- [ ] Time Ponte completa 3 ciclos de diagnóstico → insight → ação
- [ ] Pelo menos 80% das sessões geram pelo menos 1 insight acionável
- [ ] Pelo menos 70% dos insights geram alguma ação documentada
- [ ] Time reporta que "vale a pena" usar a plataforma semanalmente (NPS >= 30)
- [ ] Prontidão geral >= 70%

---

*Este documento é parte do Programa 25 — Validação Científica.*
*Reavaliação da Empresa Zero: 39% → 72% de prontidão. Mínimo viável para auto-operação.*
*Acumulação de conhecimento adiada para P26. O resto é exequível em 8 semanas.*
