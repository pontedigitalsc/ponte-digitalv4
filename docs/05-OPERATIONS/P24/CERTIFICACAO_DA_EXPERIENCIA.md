# CERTIFICAÇÃO DA EXPERIÊNCIA — Auditoria P24 da Certificação Criada no P23

**Programa 24 | Documento de Auditoria | 26/07/2026**

> Esta auditoria avalia o sistema de certificação da experiência criado no P23.
> Examina se a certificação é completa, consistente, testável e permanente.
> Identifica lacunas, regras não-testáveis e propõe evolução.

---

## Sumário

1. [Resumo da Avaliação](#1-resumo-da-avaliação)
2. [Matriz de Cobertura](#2-matriz-de-cobertura)
3. [Lista de Lacunas](#3-lista-de-lacunas)
4. [Lista de Regras Não-Testáveis](#4-lista-de-regras-não-testáveis)
5. [Proposta de Evolução](#5-proposta-de-evolução)
6. [Checklist Final de Certificação](#6-checklist-final-de-certificação)

---

## 1. Resumo da Avaliação

| Critério | Nota | Status |
|---|---|---|
| **COMPLETA** — cobre todos os estados, telas, transições e interações? | 6.5/10 | PARCIAL |
| **CONSISTENTE** — sem regras conflitantes internas? | 8.0/10 | BOA |
| **TESTÁVEL** — cada regra pode ser verificada objetivamente? | 5.5/10 | FRACA |
| **PERMANENTE** — as regras não dependem de tecnologia? | 9.0/10 | FORTE |

**Nota geral:** 7.2/10

### Pontos fortes da certificação P23

- Definição formal clara da experiência Ponte (seção 1 do documento original) — cinco componentes inseparáveis bem articulados
- Separação rigorosa entre elementos obrigatórios, permanentes, evoluíveis e proibidos — taxonomia madura
- Teste de Integridade com 12 perguntas + corte negativo — estrutura de verificação prática
- Níveis de certificação (Ouro/Prata/Bronze) com critérios objetivos — escala de qualidade
- Processo de revogação bem definido com gradação de gravidade
- Metáfora central e assinatura invisível consistentes em todo o documento

### Fragilidades identificadas

- Cobertura incompleta (ver matriz de cobertura)
- Regras não-testáveis em ambiente automatizado
- Ausência de critérios para 5 das 12 perguntas do Teste de Integridade
- Dependência de tecnologia futura (Motor Cognitivo) sem fallback

---

## 2. Matriz de Cobertura

### Convenção
- **SIM** = elemento coberto explicitamente, com critérios de verificação
- **NÃO** = elemento não coberto pela certificação atual
- **PARCIAL** = elemento mencionado mas sem critérios de verificação completos
- **N/A** = fora do escopo declarado da certificação

### 2.1 Estados da Conversa (baseado em EXPERIENCIA_COGNITIVA.md e ARQUITETURA_VISUAL_DA_CONVERSA)

| Estado | Coberto? | Observação |
|---|---|---|
| Pré-login (Fase 0) | NÃO | Certificação não cobre tela de login |
| Abertura (Fase 1) | PARCIAL | "Nunca-primeira-frase" coberto. Timing, transições e painel vazio não |
| Contextualização (Fase 2) | PARCIAL | Primeira pergunta mais fácil não é regra de certificação |
| Primeiras perguntas (Fase 3) | PARCIAL | IA reagir ao conteúdo não tem critério de verificação |
| Primeira hipótese (Fase 4) | PARCIAL | Confiança >25% para formar hipótese não está na certificação |
| Investigação ativa (Fase 5) | NÃO | Progressão de perguntas, recuo se resistência — não cobertos |
| Insight (Fase 6) | SIM | Coberto pelo Teste de Integridade pergunta 12 |
| Aprofundamento (Fase 7) | NÃO | Critérios de aprofundamento não cobertos |
| Correção de hipótese (Fase 8) | SIM | Coberto pelo Teste de Integridade pergunta 10 |
| Resumo parcial (Fase 9) | NÃO | Periodicidade e formato do resumo não cobertos |
| Fechamento (Fase 10) | NÃO | Gatilhos de fechamento e despedida não cobertos |
| Pós-conversa (Fase 11) | NÃO | Dashboard pós-conversa fora do escopo da certificação |

### 2.2 Telas e Componentes

| Elemento | Coberto? | Observação |
|---|---|---|
| Tela principal de conversa | SIM | Núcleo da certificação |
| Painel cognitivo (sidebar) | SIM | Elemento obrigatório 2.6 |
| Mapa cognitivo | PARCIAL | Existência exigida. Conteúdo, transições e estados não |
| Loading inteligente | PARCIAL | Mencionado como manifestação de inteligência. Fases não especificadas |
| Microinterações | PARCIAL | Animações proibidas listadas. Permitidas sem critérios de verificação |
| Cards de insight | NÃO | Não há regras de certificação para cards |
| Badges de confiança | NÃO | Não há regras específicas para indicadores de confiança |
| Gamificação cognitiva | N/A | Excluída deliberadamente do P23 |
| Som/áudio | NÃO | Sons permitidos listados, mas sem critérios de certificação |
| Layout responsivo (mobile) | NÃO | Ausência completa de especificação mobile |
| Tela de erro/fallback | NÃO | Não coberta |

### 2.3 Transições

| Transição | Coberto? | Observação |
|---|---|---|
| Entre estados cognitivos | NÃO | Transições E1-E7 não mapeadas na certificação |
| De resposta para resposta | NÃO | Cadência e timing não têm regras certificáveis |
| De tela para tela | NÃO | Navegação entre telas não coberta |
| De sessão para sessão | NÃO | Continuidade entre sessões não tem regras |
| De erro para recuperação | NÃO | Fluxo de erro não coberto |

### 2.4 Interações

| Interação | Coberto? | Observação |
|---|---|---|
| Empresário pergunta | SIM | Diálogo como interface primária |
| Empresário responde | PARCIAL | IA reage ao conteúdo — sem critério objetivo |
| Empresário corrige IA | SIM | Mecanismo de correção exigido |
| Empresário discorda | NÃO | Fluxo de discordância não coberto |
| Empresário fica inativo | NÃO | Timeout, retomada, "ainda está aí?" não cobertos |
| Empresário interrompe | NÃO | Interrupção não tem regra de certificação |
| IA inicia interação | SIM | IA não espera pergunta |
| IA diz "não sei" | SIM | Teste de Integridade pergunta 11 |
| IA revisa hipótese | SIM | Teste de Integridade pergunta 10 |
| IA aprofunda | NÃO | Critérios de aprofundamento não definidos |
| IA recua | NÃO | Recuo diante de resistência não coberto |
| IA muda de assunto | NÃO | Mudança de direção baseada em insight não coberta |

---

## 3. Lista de Lacunas

### GRAVE

| # | Lacuna | Impacto |
|---|---|---|
| L1 | **Nenhum critério objetivo para 5 das 12 perguntas do Teste de Integridade** | Perguntas 1, 7, 8, 10, 12 dependem de julgamento humano. Impossível verificar em CI/CD |
| L2 | **Experiência mobile completamente ausente** | Se mobile for o principal canal, a certificação é irrelevante |
| L3 | **Fluxo de erro e fallback não cobertos** | Primeira falha real destrói confiança sem protocolo de recuperação |
| L4 | **Transições entre estados cognitivos não especificadas** | Implementação pode ter transições bruscas sem violar regras explícitas |
| L5 | **Pós-jornada (após 7 dias) não definida** | Experiência após a primeira semana é indefinida |

### ALTA

| # | Lacuna | Impacto |
|---|---|---|
| L6 | **Cadência e timing de resposta não têm regras certificáveis** | Ritmo da conversa é central para a experiência mas não é verificável |
| L7 | **Conteúdo do painel cognitivo não especificado** | Existência exigida, mas o que ele mostra e como atualiza não tem regras |
| L8 | **Onboarding do mapa cognitivo não coberto** | Empresário pode nunca descobrir o mapa |
| L9 | **Descoberta de insights pelo empresário não coberta** | Empresário pode nunca aprender a expandir um insight |
| L10 | **Métricas de sucesso da experiência não integradas à certificação** | Não há como saber se a certificação está funcionando |

### MÉDIA

| # | Lacuna | Impacto |
|---|---|---|
| L11 | **Variabilidade linguística (i18n/l10n) não considerada** | Frases proibidas são específicas do português brasileiro |
| L12 | **Feedback do empresário sobre a IA não coberto** | IA não melhora com uso |
| L13 | **Transição entre níveis de formalidade não especificada** | Quando a IA muda de tom não tem regra |
| L14 | **Silêncio como padrão de comunicação não testável** | "Pausa intencional" não é verificável objetivamente |

---

## 4. Lista de Regras Não-Testáveis

Regras da certificação P23 que **não podem ser verificadas objetivamente** sem um avaliador humano.

| # | Regra | Fonte | Problema |
|---|---|---|---|
| NT1 | "O empresário deve perceber evidências de que a IA está processando, raciocinando e aprendendo" | Elemento obrigatório 2.2 | Percepção é subjetiva. Não há métrica para "perceber evidências" |
| NT2 | "Toda resposta precisa ser mais rápida do que o empresário obteria a informação por conta própria" | Elemento obrigatório 2.3 | Impossível de medir sem conhecer a capacidade do empresário |
| NT3 | "Demonstração de contexto (referência a interações anteriores)" | Elemento obrigatório 2.2 | Não especifica o que conta como "demonstração" |
| NT4 | "A conversa não é linear: IA adapta, revisita, aprofunda, recua" | Teste Integridade #7 | "Adapta" é vago. Qual o critério para considerar que adaptou? |
| NT5 | "A personalidade é de consultor sênior" | Teste Integridade #8 | Personalidade é inerentemente qualitativa |
| NT6 | "A resposta é mais que informação — entrega descoberta" | Teste Integridade #12 | "Descoberta" vs "informação" é distinção subjetiva |
| NT7 | "IA diz não sei sem parecer incompetente" | Teste Integridade #11 | "Parecer incompetente" é percepção, não métrica |
| NT8 | "O fluxo de perguntas é fixo e imutável — reprova automaticamente" | Teste Negativo | Como medir que o fluxo É fixo sem testar todos os caminhos? |
| NT9 | "A IA tem voz única e reconhecível" | Elemento permanente 3.3 | "Reconhecível" é subjetivo |
| NT10 | "A IA usa dados específicos da empresa, nunca texto genérico" | Elemento permanente 3.3 | Não especifica como detectar texto genérico |
| NT11 | "A assinatura invisível deve ser sentida, mas nunca vista escrita" | Seção 1.3 | O que não pode ser visto nem escrito não pode ser testado |
| NT12 | "Inteligência perceptível é a inteligência que se vê funcionando" | Manifesto 2.1 | Circular — não define o que é "ver funcionando" |

### Regras Testáveis (contraponto positivo)

A certificação P23 também contém regras exemplarmente testáveis:

| # | Regra | Como testar |
|---|---|---|
| T1 | Zero elementos proibidos da seção 5 | Varredura automatizada de UI |
| T2 | "Nunca-primeira-frase" não contém itens proibidos | Análise de texto da primeira resposta |
| T3 | Painel cognitivo existe | Verificação de presença do componente |
| T4 | Tempo de resposta <2s para perguntas simples | Teste de performance |
| T5 | Cores por estado cognitivo são as definidas | Teste visual (snapshot) |
| T6 | Loading inteligente com texto narrativo, não spinner | Inspeção de estado |
| T7 | Mecanismo de correção de hipótese existe | Teste de fluxo |
| T8 | Padrões de frase (Afirmação, Pergunta, Insight, Silêncio, Recomendação) | Análise de texto do output |
| T9 | Respostas complexas têm indicador narrativo de progresso | Teste de UI |
| T10 | IA pode dizer "não sei" | Teste com pergunta sem resposta no domínio |

---

## 5. Proposta de Evolução

### 5.1 Curto Prazo (P24 — esta sprint)

| Ação | Lacuna resolvida | Esforço |
|---|---|---|
| **Adicionar critérios objetivos para as 5 perguntas subjetivas do Teste de Integridade** (#1, 7, 8, 10, 12) | L1 | 2 dias |
| **Criar mini-especificação mobile** — layout responsivo do chat, mapa e painel | L2 | 2 dias |
| **Adicionar seção de fallback e tratamento de erro** à certificação | L3 | 1 dia |
| **Adicionar máquina de estados com transições** como anexo da certificação | L4 | 2 dias |

### 5.2 Proposta de Novas Regras Objetivas

**Para o Teste de Integridade pergunta 1 (Inteligência perceptível):**
Substituir "O empresário vê evidências?" por:
- [ ] A resposta inclui referência a dado específico da empresa (nome, valor, data)
- [ ] O tempo de resposta varia conforme a complexidade da pergunta (delta >500ms entre simples e complexa)
- [ ] O indicador de pensamento mostra texto diferente de "Carregando..." / "Aguarde..."
- [ ] O painel cognitivo atualizou algum indicador nos últimos 5 segundos

**Para o Teste de Integridade pergunta 7 (Conversa não linear):**
Substituir "A IA adapta, revisita, aprofunda, recua?" por:
- [ ] Duas perguntas consecutivas não usam o mesmo template
- [ ] A IA referencia informação fornecida pelo empresário >2 turnos atrás
- [ ] Quando empresário dá resposta inesperada, a próxima pergunta da IA difere do caminho esperado (pré-definir 3 cenários)

**Para o Teste de Integridade pergunta 8 (Personalidade de consultor sênior):**
Substituir por checklist de proibidos:
- [ ] Nenhuma das frases proibidas da tabela 5.5 aparece
- [ ] Nenhum dos vocabulários proibidos de IDENTIDADE aparece
- [ ] Nenhuma saudação genérica na primeira frase
- [ ] Nenhum tom de intimidade ou informalidade

### 5.3 Médio Prazo (P25+)

| Ação | Lacuna resolvida |
|---|---|
| **Criar mecanismo de auto-avaliação da certificação em CI/CD** — script que executa as 12 perguntas programaticamente e gera relatório | L1, L6 |
| **Integrar métricas de sucesso (NPS, retorno, tempo até WOW) como condição de manutenção da certificação** | L10 |
| **Especificar conteúdo e comportamento do painel cognitivo** com estados, transições e dados de cada indicador | L7 |
| **Adicionar regras de fallback para quando o Motor Cognitivo não responde** | L3 |
| **Estrategia de i18n/l10n** — declarar que variações linguísticas em outros idiomas precisam passar pelo mesmo Teste de Integridade | L11 |

### 5.4 Proposta de Regra de Evolução da Certificação

A certificação deve evoluir com o produto. Proposta de ciclo:

1. **A cada sprint**, o time avalia se alguma nova funcionalidade ou interação não está coberta pela certificação atual
2. **Se não estiver coberta**, a certificação é estendida — novo elemento obrigatório ou nova pergunta no Teste
3. **A cada 3 sprints**, auditoria completa da certificação (como este documento)
4. **A certificação tem versão** — versão 1.0 (P23), versão 1.1 (P24), etc.

---

## 6. Checklist Final de Certificação

### 6.1 A certificação P23 é COMPLETA?

- [ ] Cobre todos os 12 estados da conversa? **NÃO** (6 de 12 cobertos)
- [ ] Cobre todas as telas do escopo? **PARCIAL** (7 de 10)
- [ ] Cobre todas as transições? **NÃO** (0 de 5)
- [ ] Cobre todas as interações? **PARCIAL** (6 de 12)
- [ ] **Resultado: INCOMPLETA** — lacunas graves em transições, mobile, erro e pós-jornada

### 6.2 A certificação P23 é CONSISTENTE?

- [ ] Existem regras conflitantes internas? **NÃO** — boa consistência interna
- [ ] Os elementos obrigatórios são coerentes com os permanentes? **SIM**
- [ ] Os elementos proibidos não contradizem os permitidos? **SIM**
- [ ] O Teste de Integridade é coerente com os elementos que pretende testar? **SIM**
- [ ] **Resultado: CONSISTENTE** — uma das forças da certificação

### 6.3 A certificação P23 é TESTÁVEL?

- [ ] Todas as regras podem ser verificadas por script automatizado? **NÃO** (12 regras não-testáveis)
- [ ] Todas as regras têm critérios de aprovação/reprovação claros? **NÃO** (5 perguntas do Teste são subjetivas)
- [ ] O Teste de Integridade pode ser executado sem avaliador humano? **NÃO** — requer julgamento
- [ ] **Resultado: PARCIALMENTE TESTÁVEL** — 12 regras subjetivas precisam de objetificação

### 6.4 A certificação P23 é PERMANENTE?

- [ ] As regras dependem de tecnologia específica? **NÃO** — a maioria é atemporal
- [ ] As regras mencionam frameworks, bibliotecas ou linguagens? **NÃO**
- [ ] As regras seriam válidas em 2030? **SIM** — a filosofia é independente de tecnologia
- [ ] **Resultado: PERMANENTE** — maior força da certificação

### 6.5 Decisão Final

| Componente | Peso | Nota | Pontos |
|---|---|---|---|
| Completude | 30% | 6.5 | 1.95 |
| Consistência | 25% | 8.0 | 2.00 |
| Testabilidade | 25% | 5.5 | 1.38 |
| Permanência | 20% | 9.0 | 1.80 |
| **Total** | **100%** | | **7.13** |

**A certificação P23 é aprovada como versão 1.0, com ressalvas.**

**Condições para manter a certificação:**
1. Resolver as 5 lacunas graves (L1-L5) até o final do P24
2. Objetificar as 5 perguntas subjetivas do Teste de Integridade
3. Adicionar especificação mobile mínima

**Sem estas correções, a certificação corre risco de se tornar irrelevante na primeira implementação real com a Empresa Zero.**

---

## Anexo A — Mapeamento: Teste de Integridade × Testabilidade

| # | Pergunta | Testável? | Como objetificar |
|---|---|---|---|
| 1 | Inteligência perceptível? | NÃO | Checklist de 4 marcadores objetivos (proposta seção 5.2) |
| 2 | Diálogo é interface principal? | SIM | Verificar centralidade do chat no layout |
| 3 | Respeito ao tempo? | SIM | Tempo de primeira entrega de valor <30s |
| 4 | Confiança transparente? | SIM | Indicador de confiança visível |
| 5 | Não parece chatbot? | SIM | Varredura de elementos proibidos |
| 6 | Não parece formulário/dashboard? | SIM | Varredura de elementos proibidos |
| 7 | Conversa não linear? | NÃO | 3 cenários pré-definidos com verificação de adaptação |
| 8 | Personalidade consultor sênior? | NÃO | Checklist de proibidos de vocabulário e tom |
| 9 | Painel cognitivo existe? | SIM | Verificação de presença do componente |
| 10 | IA corrige quando erra? | NÃO | Teste de fluxo com contradição |
| 11 | "Não sei" inteligente? | NÃO | Teste com pergunta for a do domínio + análise de texto |
| 12 | Resposta é mais que informação? | NÃO | Análise de presença de dado específico + interpretação |

---

## Anexo B — Histórico de Versões

| Versão | Data | Autor | Mudanças |
|---|---|---|---|
| 1.0 | 26/07/2026 | Auditoria P24 | Versão inicial da auditoria da certificação P23 |

---

*Este documento é parte do Programa 24 — Certificação e Validação.*
*Audita o documento CERTIFICACAO_DA_EXPERIENCIA.md do P23.*
