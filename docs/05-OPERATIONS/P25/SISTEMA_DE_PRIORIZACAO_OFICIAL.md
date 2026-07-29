# SISTEMA DE PRIORIZAÇÃO OFICIAL

## Critérios Mensuráveis para Decisão de Produto e Engenharia

**Programa 25 | Documento Operacional | 26/07/2026 | Versão 1.0**

> Este documento substitui qualquer processo anterior de priorização baseado em opinião, hierarquia, ou urgência autodeclarada.
> A partir de agora, toda demanda entra no backlog somente após ser pontuada.
> Nenhuma decisão de "o que fazer primeiro" é tomada sem a pontuação definida aqui.

---

## Preâmbulo

Durante a construção da Fundação, as prioridades foram definidas por um pequeno grupo com base em visão de produto e intuição arquitetural. Isso foi necessário e produziu resultados — a Fundação existe e está congelada.

A partir da Era da Observação, este método não é mais suficiente. Com empresários reais usando a plataforma, as decisões de prioridade não podem mais depender de quem tem a opinião mais forte ou o cargo mais alto.

Este sistema estabelece critérios objetivos, mensuráveis, e rastreáveis para toda decisão de prioridade na Ponte Digital.

---

## Os 8 Critérios

### Critério 1 — Impacto no Empresário

**Peso:** 5

**O que mede:** O quanto esta demanda melhora a vida do empresário que usa a plataforma.

| Valor | Definição |
|:-----:|-----------|
| 1 | Nenhum impacto perceptível pelo empresário |
| 2 | Impacto marginal (cosmético, irrelevante para a decisão) |
| 3 | Impacto moderado (reduz atrito, mas não muda comportamento) |
| 4 | Impacto alto (muda a forma como o empresário usa a plataforma) |
| 5 | Impacto transformador (resolve um problema que impedia o uso) |

---

### Critério 2 — Impacto Cognitivo

**Peso:** 4

**O que mede:** O quanto esta demanda aumenta a capacidade da plataforma de aprender, correlacionar, ou revelar padrões.

| Valor | Definição |
|:-----:|-----------|
| 1 | Nenhum impacto na cognição |
| 2 | Impacto marginal (coleta dado que pode ser usado no futuro) |
| 3 | Impacto moderado (revela um padrão já conhecido de forma mais clara) |
| 4 | Impacto alto (revela um padrão novo que antes era invisível) |
| 5 | Impacto máximo (cria uma nova capacidade de descoberta cognitiva) |

---

### Critério 3 — Frequência

**Peso:** 3

**O que mede:** Com que frequência o empresário encontra esta funcionalidade ou é afetado por este problema.

| Valor | Definição |
|:-----:|-----------|
| 1 | Raro (uma vez por mês ou menos) |
| 2 | Ocasional (algumas vezes por mês) |
| 3 | Semanal (toda semana) |
| 4 | Diário (todos os dias) |
| 5 | Toda sessão (cada vez que abre a plataforma) |

---

### Critério 4 — Gravidade

**Peso:** 5

**O que mede:** O impacto de **não** fazer esta demanda. Qual é o custo da inação.

| Valor | Definição |
|:-----:|-----------|
| 1 | Cosmético (ninguém percebe a falta) |
| 2 | Baixo (causa desconforto menor, não afeta decisão) |
| 3 | Médio (causa atrito visível, reduz engajamento) |
| 4 | Alto (causa abandono de fluxo, perda de dados, ou erro do empresário) |
| 5 | Bloqueia operação (impossibilita o uso da plataforma ou viola segurança) |

---

### Critério 5 — Patrimônio Gerado

**Peso:** 4

**O que mede:** O quanto esta demanda gera conhecimento, dados, contexto, ou decisões que permanecem na plataforma como ativo intelectual.

| Valor | Definição |
|:-----:|-----------|
| 1 | Nenhum patrimônio gerado |
| 2 | Marginal (gera dado descartável) |
| 3 | Moderado (gera dado que pode ser reutilizado) |
| 4 | Alto (gera contexto ou memória que alimenta outras capacidades) |
| 5 | Fundacional (gera conhecimento que muda a plataforma permanentemente) |

---

### Critério 6 — Complexidade

**Peso:** 3 | **INVERTIDO** (menos complexo = maior prioridade)

**O que mede:** O esforço técnico necessário para implementar a demanda.

| Valor | Definição |
|:-----:|-----------|
| 1 | Trivial (1-2 horas, arquivo único, sem migration) |
| 2 | Baixa (1-2 dias, poucos arquivos, sem nova dependência) |
| 3 | Média (3-5 dias, múltiplos arquivos, possível migration) |
| 4 | Alta (1-2 semanas, nova engine ou service, migration) |
| 5 | Altera arquitetura (requer ADR, múltiplas sprints, impacto transversal) |

**Inversão na fórmula:** O valor usado na conta é `(6 - Complexidade)`.

---

### Critério 7 — Tempo de Validação

**Peso:** 2 | **INVERTIDO** (validação rápida = maior prioridade)

**O que mede:** Quanto tempo leva para saber se a demanda fez diferença.

| Valor | Definição |
|:-----:|-----------|
| 1 | > 6 meses para saber se funcionou |
| 2 | 1-6 meses |
| 3 | 2-4 semanas |
| 4 | 1-2 semanas |
| 5 | < 1 semana (experimento rápido, métrica imediata) |

**Inversão na fórmula:** O valor usado na conta é `(6 - Tempo)`.

---

### Critério 8 — Risco de Não Fazer

**Peso:** 4

**O que mede:** O que a Ponte Digital perde se esta demanda não for implementada.

| Valor | Definição |
|:-----:|-----------|
| 1 | Nenhum risco perceptível |
| 2 | Baixo (perde oportunidade menor) |
| 3 | Médio (perde aprendizado, atrasa descoberta) |
| 4 | Alto (perde vantagem competitiva, empresário migra) |
| 5 | Perda irreparável (violação de segurança, perda de dado, fim do negócio) |

---

## Fórmula de Prioridade

```
Prioridade = (I_empresário × 5) + (I_cognitivo × 4) + (Frequência × 3) +
             (Gravidade × 5) + (Patrimônio × 4) + ((6 - Complexidade) × 3) +
             ((6 - Tempo) × 2) + (Risco × 4)
```

### Valores mínimo e máximo

| Cenário | Cálculo | Score |
|---------|---------|:-----:|
| Máximo teórico | (5×5)+(5×4)+(5×3)+(5×5)+(5×4)+((6-5)×3)+((6-5)×2)+(5×4) | 150 |
| Mínimo teórico | (1×5)+(1×4)+(1×3)+(1×5)+(1×4)+((6-1)×3)+((6-1)×2)+(1×4) | 50 |
| Ponto médio | todos os critérios em 3 | 102 |

---

## Tabela de Conversão — Score para Categoria

| Categoria | Faixa de Score | Significado | Ação Esperada |
|:---------:|:--------------:|-------------|---------------|
| **P0** | ≥ 120 | Crítico — ameaça a operação ou segurança | Iniciar imediatamente, pode interromper sprint atual |
| **P1** | 90 — 119 | Alta prioridade — valor significativo | Planejar na próxima sprint |
| **P2** | 70 — 89 | Média prioridade — valor moderado | Incluir no backlog da sprint atual ou próxima |
| **P3** | 55 — 69 | Baixa prioridade — valor marginal | Manter no backlog, revisar a cada 2 sprints |
| **P4** | < 55 | Muito baixa — não justifica esforço agora | Arquivar ou revisar em 3 meses |

---

## Exemplos de Aplicação

### Exemplo 1 — Middleware de Autenticação (P24, PE02)

**Origem:** Pendência estrutural P24 — middleware de autenticação inexistente.

| Critério | Valor | Justificativa |
|----------|:-----:|---------------|
| Impacto no empresário | 5 | Protege dados sensíveis de todas as empresas |
| Impacto cognitivo | 1 | Não cognitivo — é segurança |
| Frequência | 5 | Toda requisição passa por autenticação |
| Gravidade | 5 | Sem autenticação, qualquer requisição pode acessar dados de qualquer empresa |
| Patrimônio gerado | 3 | Cria infraestrutura de segurança que permite evoluções futuras |
| Complexidade | 2 | Médio-baixo: middleware padronizado, sem nova dependência |
| Tempo de validação | 5 | Testável imediatamente após deploy |
| Risco de não fazer | 5 | Perda irreparável — dados de clientes expostos |

**Cálculo:** (5×5)+(1×4)+(5×3)+(5×5)+(3×4)+((6-2)×3)+((6-5)×2)+(5×4)
**= 25 + 4 + 15 + 25 + 12 + 12 + 2 + 20**
**= 115 → P1**

*Apesar do score P1, o Critério 8 (Risco=5) e a gravidade 5 indicam que deve ser tratado como emergencial. O sistema de priorização não substitui o julgamento sobre risco existencial.*

---

### Exemplo 2 — Mapa Cognitivo Vivo (P23, WP01)

**Origem:** Work Package 01 do P23 — especificado, não implementado.

| Critério | Valor | Justificativa |
|----------|:-----:|---------------|
| Impacto no empresário | 4 | Centro visual da experiência — o empresário vê seu negócio |
| Impacto cognitivo | 5 | Revela padrões e conexões que antes eram invisíveis |
| Frequência | 4 | Toda sessão — é a tela central |
| Gravidade | 3 | Não bloqueia, mas sem ele a experiência é incompleta |
| Patrimônio gerado | 4 | Gera visualização de conhecimento que fortalece o patrimônio cognitivo |
| Complexidade | 3 | Moderado: componentes visuais complexos, mas sem nova engine |
| Tempo de validação | 3 | Algumas semanas para medir engajamento real |
| Risco de não fazer | 4 | Perde a principal interface cognitiva — hipótese H01 não é validada |

**Cálculo:** (4×5)+(5×4)+(4×3)+(3×5)+(4×4)+((6-3)×3)+((6-3)×2)+(4×4)
**= 20 + 20 + 12 + 15 + 16 + 9 + 6 + 16**
**= 114 → P1**

---

### Exemplo 3 — Hipótese H01: Mapa Cognitivo engaja ou distrai?

**Origem:** Hipótese em aberto do P24 — validação necessária antes de investir.

| Critério | Valor | Justificativa |
|----------|:-----:|---------------|
| Impacto no empresário | 3 | Indireto — o resultado do experimento melhora a experiência futura |
| Impacto cognitivo | 4 | Valida hipótese central sobre a interface cognitiva mais importante |
| Frequência | 1 | Experimento único, não contínuo |
| Gravidade | 2 | Não impede operação — é aprendizado |
| Patrimônio gerado | 5 | Conhecimento fundacional — define se o Mapa Cognitivo é o caminho certo |
| Complexidade | 2 | Experimento simples: versão A vs versão B com poucas empresas |
| Tempo de validação | 3 | 2-4 semanas para coleta de dados suficiente |
| Risco de não fazer | 3 | Perde aprendizado crítico sobre a direção do produto |

**Cálculo:** (3×5)+(4×4)+(1×3)+(2×5)+(5×4)+((6-2)×3)+((6-3)×2)+(3×4)
**= 15 + 16 + 3 + 10 + 20 + 12 + 6 + 12**
**= 94 → P1**

---

## Regras de Uso

### Regra 1 — Toda nova demanda precisa ser pontuada antes de entrar no backlog

Nenhuma demanda é aceita no backlog sem a pontuação completa dos 8 critérios e o score calculado. Demandas sem pontuação são rejeitadas automaticamente.

### Regra 2 — O score é documentado na própria demanda

A demanda deve conter, em seu corpo:
- Tabela com os 8 valores e justificativa resumida
- Cálculo do score total
- Categoria resultante (P0-P4)

### Regra 3 — Revisão de prioridade a cada sprint

Toda demanda no backlog tem sua pontuação revisada a cada sprint. Demandas que mudam de contexto (nova descoberta, mudança de fase, nova hipótese validada) podem ter score ajustado.

### Regra 4 — Exceções exigem justificativa registrada

Se uma demanda for executada fora da ordem definida pelo score (ex: um P3 executado antes de um P1), a justificativa deve ser registrada em `docs/05-OPERATIONS/KNOWN_ISSUES.md` com:
- Qual demanda foi priorizada fora de ordem
- Score da demanda preterida
- Score da demanda executada
- Motivo da exceção
- Quem autorizou

### Regra 5 — O sistema é revisitado a cada 6 meses

Este sistema de priorização será revisado integralmente a cada 6 meses. A primeira revisão acontece em **26 de janeiro de 2027**. Na revisão:
- Os pesos dos critérios podem ser ajustados com base no aprendizado
- A tabela de conversão pode ser recalibrada
- Novos critérios podem ser adicionados se necessário

---

## Casos Especiais

### Empate entre demandas

Se duas demandas têm o mesmo score, o desempate segue esta ordem:
1. Maior Gravidade (Critério 4)
2. Maior Risco de Não Fazer (Critério 8)
3. Menor Complexidade (Critério 6)
4. Maior Impacto no Empresário (Critério 1)
5. Decisão do Arquiteto de Produto

### Emergência de segurança

Demandas classificadas como emergência de segurança (vazamento de dados, falha crítica de autenticação, indisponibilidade total) não precisam ser pontuadas. São executadas imediatamente e documentadas posteriormente com score para rastreabilidade.

### Demanda com score alterado por revisão

Se uma demanda revisada tem seu score alterado em mais de 20 pontos, a demanda deve ser reclassificada e comunicada aos envolvidos. Mudanças menores que 20 pontos mantêm a categoria original.

---

## Templates

### Template de Pontuação (para incluir na demanda)

```
## Pontuação de Prioridade

| Critério | Valor (1-5) | Justificativa |
|----------|:-----------:|---------------|
| Impacto no empresário | | |
| Impacto cognitivo | | |
| Frequência | | |
| Gravidade | | |
| Patrimônio gerado | | |
| Complexidade | | (INVERTIDO) |
| Tempo de validação | | (INVERTIDO) |
| Risco de não fazer | | |

**Score calculado:**
( _ ×5) + ( _ ×4) + ( _ ×3) + ( _ ×5) + ( _ ×4) + ((6- _ )×3) + ((6- _ )×2) + ( _ ×4) = **[total]**

**Categoria:** P[0-4]

**Pontuado por:** [nome] | **Data:** [data]
```

---

## Compromisso

A Ponte Digital não decide mais "quem grita mais alto". Decide por critério.

A Ponte Digital não prioriza mais "o que parece mais urgente". Prioriza por métrica.

A Ponte Digital não adia mais "o que é difícil de medir". Mede mesmo assim.

Toda demanda sem pontuação é uma opinião disfarçada de prioridade. A partir de agora, opiniões não entram no backlog.

---

*Este documento entra em vigor na data de sua publicação.*
*Primeira revisão programada: 26 de janeiro de 2027.*
*Ponte Digital — Sistema de Priorização Oficial.*
