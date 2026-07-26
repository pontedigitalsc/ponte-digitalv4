# Motor Cognitivo da Ponte Digital

## A Infraestrutura Cognitiva Empresarial

> Este documento define como a plataforma pensa.
> Não como ela salva dados.
> Não como ela exibe telas.
> Não como ela se conecta a APIs.
>
> Como ela pensa.

---

## #1 — A Missão do Motor Cognitivo

### 1.1 O que é

O Motor Cognitivo é o cérebro da Ponte Digital. Ele não é uma IA conversacional nem um mecanismo de busca sobre dados do banco. Ele é um sistema perpétuo de observação, interpretação, decisão e aprendizado que constrói e mantém, ao longo do tempo, o modelo mais preciso possível do negócio de um empresário.

Sua única missão é responder, a qualquer momento, com o máximo de precisão possível:

> *"O que esta empresa precisa agora, e por quê?"*

### 1.2 O que ele NÃO é

| O Motor Cognitivo NÃO é | Por quê |
|---|---|
| Um LLM / IA generativa | A IA conversa. O Motor decide. A IA é a voz. O Motor é o cérebro. A IA nunca cria conhecimento — ela apenas traduz o conhecimento do Motor em linguagem natural. |
| Um banco de dados | O banco armazena fatos. O Motor armazena entendimento. Fatos são "cliente X pagou R\$ 500 em 01/01". Entendimento é "cliente X paga pontualmente há 6 meses, mas reduziu o valor médio nos últimos 2". |
| Um mecanismo de busca | Busca recupera o que existe. O Motor infere o que não está explícito, mas pode ser deduzido do conjunto de evidências. |
| Um motor de regras | Regras são um dos insumos. O Motor combina regras + evidências + confiança + contexto + histórico para decidir. Uma regra engine pura não aprende. |
| Um ERP | ERP registra operações. O Motor entende o significado das operações para a saúde do negócio. |
| Um sistema de recomendação | Recomendação é uma saída do Motor, não o Motor em si. A diferença é que o Motor também sabe quando NÃO recomendar nada. |

### 1.3 Separação definitiva: Motor Cognitivo vs IA Conversacional

```
                  ┌──────────────────────────────┐
                  │       MUNDO REAL              │
                  │  (eventos, ações, resultados) │
                  └──────────┬───────────────────┘
                             │ Eventos brutos
                             ▼
                  ┌──────────────────────────────┐
                  │     MOTOR COGNITIVO           │
                  │     (o cérebro)               │
                  │                                │
                  │  Observa → Interpreta → Decide │
                  │  → Aprende → Lembra → Esquece │
                  │                                │
                  │  SAÍDAS:                       │
                  │  • Decisões                    │
                  │  • Recomendações              │
                  │  • Alertas                    │
                  │  • Contexto Cognitivo         │
                  │  • Conhecimento               │
                  └──────────┬───────────────────┘
                             │ Contexto Cognitivo pronto
                             ▼
                  ┌──────────────────────────────┐
                  │    IA CONVERSACIONAL          │
                  │    (a voz)                    │
                  │                                │
                  │  Recebe: contexto pronto      │
                  │  Faz: traduz em linguagem     │
                  │  Não pode: criar conhecimento │
                  │  Não pode: decidir            │
                  │  Não pode: interpretar dados  │
                  └──────────────────────────────┘
```

A IA **nunca** consulta o banco. A IA **nunca** interpreta dados brutos. A IA recebe do Motor Cognitivo um pacote fechado chamado **Contexto Cognitivo** — que já contém o que é relevante saber, o que foi decidido, o que o empresário precisa ouvir, e o que o Motor ainda não sabe. A IA é apenas a tradutora desse contexto para linguagem natural.

Se a IA disser algo que não veio do Contexto Cognitivo, isso é um erro grave de arquitetura — equivalente a um paciente tomando um remédio que o médico não prescreveu.

---

## #2 — Componentes Internos do Motor Cognitivo

### 2.1 Arquitetura Modular

O Motor Cognitivo é composto por 16 submotores, cada um com responsabilidade única. Nenhum deles é opcional. Nenhum deles é substituível por IA. Todos seguem a mesma regra: **processam entradas, produzem saídas, emitem eventos, não se comunicam diretamente entre si**.

A comunicação entre submotores é feita exclusivamente por eventos. Um submotor nunca chama outro. Cada submotor escuta eventos que lhe interessam e produz eventos que outros podem consumir.

```
                    ┌────────────────────────────────────────────┐
                    │            EVENT BUS                       │
                    │  (único barramento de comunicação)         │
                    └────────────────────────────────────────────┘
                    ▲    ▲    ▲    ▲    ▲    ▲    ▲    ▲    ▲    ▲
                    │    │    │    │    │    │    │    │    │    │
    ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐
    │ O │  │ S │  │ H │  │ K │  │ C │  │ D │  │ L │  │ M │  │ P │  │ T │
    │ b │  │ i │  │ i │  │ n │  │ o │  │ e │  │ e │  │ e │  │ r │  │ r │
    │ s │  │ g │  │ p │  │ o │  │ n │  │ c │  │ a │  │ m │  │ i │  │ u │
    │ e │  │ n │  │ o │  │ w │  │ t │  │ i │  │ r │  │ o │  │ o │  │ s │
    │ r │  │ a │  │ t │  │ l │  │ e │  │ s │  │ n │  │ r │  │ r │  │ t │
    │ v │  │ l │  │ h │  │ e │  │ x │  │ i │  │ i │  │ y │  │ i │  │   │
    │ e │  │   │  │ e │  │ d │  │ t │  │ o │  │ n │  │   │  │ t │  │ E │
    │ r │  │ E │  │ s │  │ g │  │   │  │ n │  │ g │  │ M │  │ y │  │ n │
    │   │  │ n │  │ i │  │ e │  │ E │  │   │  │   │  │ e │  │   │  │ g │
    │   │  │ g │  │ s │  │   │  │ n │  │ E │  │ E │  │ m │  │ E │  │ i │
    │ E │  │ i │  │   │  │ K │  │ g │  │ n │  │ v │  │ o │  │ n │  │ n │
    │ n │  │ n │  │ E │  │ n │  │ i │  │ g │  │ e │  │ r │  │ g │  │ e │
    │ g │  │ e │  │ n │  │ o │  │ n │  │ i │  │ n │  │ y │  │ i │  │   │
    │   │  │   │  │ g │  │ w │  │ e │  │ n │  │ t │  │   │  │ n │  │ E │
    └───┘  └───┘  └───┘  └───┘  └───┘  └───┘  └───┘  └───┘  └───┘  └───┘
```

### 2.2 Catálogo de Submotores

#### Observation Engine
**Responsabilidade:** Receber eventos brutos do mundo real e transformá-los em observações padronizadas. Uma observação é a forma mais atômica de conhecimento: "cliente X pagou R\$ 500", "tarefa Y venceu", "lead Z não respondeu há 15 dias".

**O que faz:**
- Normaliza eventos de diferentes origens (CRM, Financeiro, Tarefas, Módulos Externos) para um formato único de observação
- Enriquece a observação com metadados de contexto (categoria, momento, confiança inicial)
- Publica a observação no barramento
- **Nunca interpreta** — apenas registra o fato ocorrido

**Recebe:** Eventos brutos dos módulos da plataforma
**Produz:** Observações padronizadas
**Não pode:** Inferir causas, criar hipóteses, decidir

---

#### Signal Engine
**Responsabilidade:** Detectar padrões nas observações que mereçam atenção. Um sinal é uma observação que se destaca do ruído de fundo.

**O que faz:**
- Acumula observações em janelas de tempo (curta: horas, média: dias, longa: semanas)
- Aplica limiares para distinguir sinal de ruído (ex.: "1 tarefa atrasada é ruído; 5 tarefas atrasadas na mesma semana é sinal")
- Classifica a urgência do sinal (baixa, média, alta, crítica)
- Publica o sinal no barramento

**Recebe:** Observações da Observation Engine
**Produz:** Sinais classificados por urgência
**Não pode:** Criar hipóteses, sugerir causas, recomendar ações

---

#### Hypothesis Engine
**Responsabilidade:** Formular explicações candidatas para os sinais observados. Uma hipótese é uma causa possível que ainda não foi confirmada.

**O que faz:**
- Ao receber um sinal, busca em seu banco de padrões por causas conhecidas
- Se não encontra padrão conhecido, formula uma hipótese genérica (ex.: "pode haver um problema operacional")
- Atribui uma confiança inicial à hipótese (sempre baixa no nascimento)
- Relaciona a hipótese às observações que a motivaram
- Publica a hipótese no barramento

**Recebe:** Sinais da Signal Engine
**Produz:** Hipóteses com confiança inicial
**Não pode:** Confirmar hipóteses, tomar decisões, recomendar ações

---

#### Knowledge Engine
**Responsabilidade:** O coração do Motor. Mantém o conhecimento validado sobre a empresa. Conhecimento é uma hipótese que recebeu evidência suficiente para ser tratada como verdade (com um nível de confiança associado).

**O que faz:**
- Escuta hipóteses e evidências
- Quando uma hipótese acumula evidência suficiente (score ≥ 60), promove a hipótese a conhecimento
- Mantém o score de confiança de cada conhecimento (0-100)
- Mantém o score de convicção (quanto mais tempo sem ser refutado, maior a convicção)
- Mantém o score de relevância (quanto mais recente a última evidência, maior a relevância)
- Publica eventos de conhecimento promovido, enfraquecido, reativado, arquivado

**Recebe:** Hipóteses, evidências, resultados de ações
**Produz:** Conhecimento validado com scores
**Não pode:** Decidir, recomendar, conversar

---

#### Context Engine
**Responsabilidade:** Construir, a qualquer momento, o retrato mais preciso possível do estado atual da empresa. Contexto é uma fotografia do que importa agora.

**O que faz:**
- Escuta todos os eventos do barramento (observações, sinais, conhecimento, decisões, resultados)
- Mantém um modelo vivo do estado atual da empresa
- A pedido (de um decisor, da IA, de uma rotina), produz um Contexto Cognitivo — um pacote fechado contendo:
  - O que sabemos (conhecimentos mais relevantes)
  - O que suspeitamos (hipóteses mais ativas)
  - O que não sabemos (lacunas)
  - O que mudou recentemente (últimas observações relevantes)
  - O que merece atenção agora (sinais ativos)
  - O que foi decidido recentemente
  - A prioridade do momento

**Recebe:** Todos os eventos do barramento
**Produz:** Contexto Cognitivo sob demanda
**Não pode:** Decidir, recomendar, aprender

---

#### Decision Engine
**Responsabilidade:** Produzir decisões a partir do contexto. Uma decisão é uma recomendação formal de ação, com justificativa rastreável.

**O que faz:**
- Recebe um Contexto Cognitivo (ou é acionado por evento)
- Aplica as regras de decisão (prioridade, urgência, impacto, dificuldade)
- Consulta o conhecimento disponível para embasar a decisão
- Produz decisões ordenadas por prioridade
- Cada decisão contém: o quê, por quê, com base em quais conhecimentos, com qual confiança
- Publica decisões no barramento

**Recebe:** Contexto Cognitivo da Context Engine
**Produz:** Decisões com rastreabilidade
**Não pode:** Executar ações, aprender com resultados, conversar

---

#### Learning Engine
**Responsabilidade:** Extrair aprendizado de cada resultado. O Learning Engine é o único submotor que altera o conhecimento existente.

**O que faz:**
- Escuta resultados de ações (positivos, negativos, neutros)
- Escuta feedback explícito do empresário
- Escuta aprendizado explícito (via perguntas rápidas, ensinamento manual)
- Para cada resultado:
  - Se positivo: fortalece as hipóteses e conhecimentos relacionados ao resultado
  - Se negativo: enfraquece as hipóteses e conhecimentos relacionados
  - Se neutro: registra como histórico, sem alterar scores
- Para feedback explícito:
  - "Isso ajudou": equivalente a resultado positivo
  - "Isso não ajudou": equivalente a resultado negativo
  - "Não executei": registro histórico, sem alteração
- Para aprendizado explícito:
  - Cria conhecimento direto (confiança inicial: ALTA, pois veio do empresário)
  - Mas sujeito a enfraquecimento se contradito por evidências futuras

**Recebe:** Resultados, feedback explícito, aprendizado explícito
**Produz:** Alterações nos scores de conhecimento e hipóteses
**Não pode:** Decidir, recomendar, conversar

---

#### Memory Engine
**Responsabilidade:** Gerenciar a hierarquia de memória do Motor. Decidir o que manter na memória de trabalho, o que mover para memória de longo prazo, o que resumir, o que arquivar, o que esquecer.

**O que faz:**
- Mantém 3 níveis de memória:
  - **Memória de Trabalho:** últimas 24h de observações, sinais, decisões, resultados. Disponível instantaneamente.
  - **Memória de Curto Prazo:** últimos 30 dias. Acessível, mas não carregada por padrão.
  - **Memória de Longo Prazo:** todo o histórico consolidado. Acessível apenas por consulta explícita.
- Periodicamente (rotina noturna):
  - Move eventos da memória de trabalho para curto prazo
  - Condensa eventos de curto prazo em resumos semanais
  - Move resumos consolidados para longo prazo
  - Identifica conhecimento que não foi acessado recentemente para possível arquivamento
- Publica eventos de consolidação de memória

**Recebe:** Todos os eventos do barramento
**Produz:** Eventos de consolidação, resumo, arquivamento
**Não pode:** Interpretar, decidir, aprender

---

#### Priority Engine
**Responsabilidade:** Determinar, a cada momento, qual é a prioridade absoluta da empresa. O Motor nunca consegue pensar sobre tudo ao mesmo tempo — a Priority Engine escolhe o que merece atenção AGORA.

**O que faz:**
- Escuta sinais, decisões, contexto, objetivos da empresa
- Mantém uma fila de prioridades atualizada continuamente
- Usa um algoritmo de priorização que combina:
  - Urgência: quão crítico é o prazo
  - Impacto: quanto a empresa ganha ou perde
  - Confiança: quão certo estamos sobre isso
  - Convicção: há quanto tempo sabemos disso
  - Alinhamento com objetivos: isso ajuda a chegar onde o empresário quer
  - Momento da empresa: empresa em crescimento vs empresa em crise têm prioridades diferentes
- Publica a prioridade atual no barramento

**Recebe:** Sinais, decisões, objetivos, contexto
**Produz:** Prioridade atual (única — qual é A coisa mais importante agora)
**Não pode:** Criar conhecimento, aprender, conversar

---

#### Trust Engine
**Responsabilidade:** Manter o nível de confiança que o Motor tem sobre cada conhecimento. Confiança não é binária — é um score que varia com o tempo e as evidências.

**O que faz:**
- Mantém o score de confiança (0-100) para cada conhecimento
- O score de confiança é influenciado por:
  - Quantidade de evidências favoráveis
  - Quantidade de evidências contrárias
  - Recência das evidências (evidência antiga vale menos)
  - Qualidade das evidências (evidência do próprio empresário pesa mais que evidência inferida)
  - Tempo sem refutação (aumenta convicção, mas não confiança)
- Publica eventos de alteração de confiança

**Recebe:** Evidências, resultados, feedback
**Produz:** Scores de confiança atualizados
**Não pode:** Decidir, recomendar, conversar

---

#### Relevance Engine
**Responsabilidade:** Determinar quais conhecimentos são relevantes no momento atual. Conhecimento relevante hoje pode ser irrelevante amanhã.

**O que faz:**
- Escuta o contexto atual e os objetivos da empresa
- Para cada conhecimento, calcula um score de relevância (0-100) baseado em:
  - Relação com a prioridade atual
  - Relação com os objetivos declarados
  - Recência da última evidência
  - Categoria do conhecimento vs categoria do momento da empresa
- Abaixo de um limiar de relevância, o conhecimento não é incluído no Contexto Cognitivo
- Publica eventos de relevância alterada

**Recebe:** Contexto, objetivos, prioridade atual
**Produz:** Scores de relevância
**Não pode:** Aprender, decidir, conversar

---

#### Forgetting Engine
**Responsabilidade:** Arquivar conhecimento que perdeu relevância ou confiança. Decidir o que esquecer é tão importante quanto decidir o que lembrar.

**O que faz:**
- Escuta eventos de relevância e confiança
- Quando um conhecimento acumula:
  - Confiança < 20: move para "arquivado com baixa confiança"
  - Relevância = 0 por mais de 90 dias: move para "arquivado por desuso"
  - Confiança = 0 por mais de 30 dias: move para "descartado"
- Conhecimento arquivado não é perdido — pode ser recuperado se novas evidências surgirem
- Conhecimento descartado é removido (irreversível — confiança zero, sem chance de renascimento)
- Publica eventos de arquivamento e descarte

**Recebe:** Scores de relevância, confiança, tempo
**Produz:** Eventos de arquivamento e descarte
**Não pode:** Aprender, decidir

---

#### Validation Engine
**Responsabilidade:** Decidir quando uma hipótese já tem evidência suficiente para se tornar conhecimento. É o "portão" entre o que suspeitamos e o que sabemos.

**O que faz:**
- Escuta hipóteses e as evidências associadas
- Para cada hipótese, executa o algoritmo de validação:
  - Score de confiança ≥ 60: hipótese promovida a conhecimento
  - Score de confiança < 20: hipótese descartada
  - Score entre 20-59 há mais de 30 dias sem novas evidências: hipótese entra em "observação"
  - Score entre 20-59 há mais de 60 dias sem novas evidências: hipótese descartada por inatividade
- Publica eventos de promoção, descarte, e entrada em observação

**Recebe:** Hipóteses, evidências
**Produz:** Decisões de validação (promover, descartar, observar)
**Não pode:** Aprender com resultados, decidir ações

---

#### Outcome Engine
**Responsabilidade:** Rastrear consequências de decisões e ações. Um resultado é a evidência mais valiosa — mostra se uma decisão estava certa.

**O que faz:**
- Escuta ações e seus resultados
- Mantém um registro de cada ação e seu resultado associado
- Calcula o impacto da ação (positivo, negativo, neutro) com base em:
  - Critérios explícitos (ex.: "aumentar vendas em 10%")
  - Evidências indiretas (ex.: após a ação, observações na categoria melhoraram)
  - Feedback do empresário (ex.: "essa ação ajudou de verdade")
- Publica eventos de resultado registrado e impacto calculado

**Recebe:** Ações, resultados, feedback
**Produz:** Resultados com impacto calculado
**Não pode:** Decidir, recomendar

---

#### Ritmo Engine
**Responsabilidade:** Determinar o ritmo cognitivo — quando o Motor deve pensar ativamente e quando deve ficar em silêncio. O Motor não precisa pensar o tempo todo. Pensar o tempo todo é ruído.

**O que faz:**
- Mantém um ciclo cognitivo com 4 fases:
  - **Observação Contínua:** eventos são processados em tempo real. O Motor está sempre "acordado" para receber eventos.
  - **Processamento Discreto:** a cada tick do relógio cognitivo (a cada 5 minutos), o Motor processa a fila de eventos acumulados.
  - **Síntese Periódica:** a cada hora, o Motor condensa observações da última hora em resumos.
  - **Consolidação Noturna:** uma vez por dia, o Motor executa a rotina completa de validação, esquecimento, promoção e consolidação.
- O empresário nunca interage com o Motor durante a consolidação noturna — é um processo silencioso.
- O Motor só "fala" (alerta, recomenda, pergunta) quando a Priority Engine determina que há algo relevante o suficiente para interromper o empresário.

**Recebe:** O tick do relógio, eventos, alertas da Priority Engine
**Produz:** Gatilhos para os ciclos de processamento
**Não pode:** Interpretar, decidir, aprender

---

## #3 — Fluxo Cognitivo Completo

### 3.1 O Ciclo Fundamental

```
EVENTO BRUTO (do mundo real)
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          OBSERVATION ENGINE                          │
│  "Algo aconteceu. Está registrado."                                 │
│  Evento bruto → Observação padronizada                              │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                            SIGNAL ENGINE                             │
│  "Isso é relevante ou é só ruído?"                                  │
│  Observação → (acumula) → Sinal (se ultrapassar limiar)            │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          HYPOTHESIS ENGINE                           │
│  "O que pode estar causando isso?"                                  │
│  Sinal → Hipótese candidata (confiança inicial baixa)              │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           VALIDATION ENGINE                          │
│  "Já podemos confiar nessa hipótese?"                               │
│  Hipótese + Evidências → Promove (≥60) | Observa (20-59) | Descarta (<20) │
└─────────────────────────────────────────────────────────────────────┘
    │ (se promovida)
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           KNOWLEDGE ENGINE                           │
│  "Isso agora é conhecimento."                                       │
│  Hipótese validada → Conhecimento com scores                         │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           CONTEXT ENGINE                             │
│  "Dado tudo que sabemos, qual é o retrato da empresa agora?"        │
│  Conhecimentos + Sinais + Hipóteses + Histórico → Contexto Cognitivo│
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           PRIORITY ENGINE                            │
│  "O que é MAIS importante agora?"                                   │
│  Contexto + Objetivos → Prioridade única                            │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           DECISION ENGINE                            │
│  "O que fazer sobre isso?"                                          │
│  Contexto + Prioridade → Decisões ordenadas                          │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                             AÇÃO                                      │
│  (O empresário executa — ou o módulo da plataforma)                 │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           OUTCOME ENGINE                             │
│  "O que aconteceu depois?"                                          │
│  Ação + Resultado → Impacto calculado                                │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           LEARNING ENGINE                            │
│  "O que isso nos ensina?"                                           │
│  Resultado → Fortalece | Enfraquece | Registra conhecimento         │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                            MEMORY ENGINE                             │
│  "Onde isso vive agora?"                                            │
│  Resultado + Aprendizado → Memória de trabalho | Curto prazo |      │
│  Longo prazo | Arquivado                                             │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      RELEVANCE + FORGETTING                          │
│  "Isso ainda é relevante?" / "Já podemos esquecer?"                │
│  Conhecimento + Tempo → Relevância | Arquivamento | Descarte        │
└─────────────────────────────────────────────────────────────────────┘
    │
    ▼
(Nova decisão — o ciclo recomeça com um contexto mais rico)
```

### 3.2 Quando Cada Etapa Acontece

| Etapa | Gatilho | Frequência |
|---|---|---|
| **Observação** | Evento bruto chega ao barramento | Tempo real |
| **Sinal** | Nova observação é publicada | A cada observação (janelas deslizantes) |
| **Hipótese** | Novo sinal é publicado | A cada sinal |
| **Validação** | Hipótese publicada OU rotina noturna | Por hipótese + lote noturno |
| **Conhecimento** | Hipótese validada | Quando promovida |
| **Contexto** | Sob demanda (alguém pediu) OU alerta de mudança significativa | A cada 5 minutos (tick) + sob demanda |
| **Prioridade** | Contexto atualizado | A cada tick + quando algo crítico acontece |
| **Decisão** | Prioridade definida OU rotina | A cada tick + quando prioridade muda |
| **Ação** | Decisão tomada | O empresário decide quando agir |
| **Resultado** | Ação concluída OU feedback recebido | Quando acontece |
| **Aprendizado** | Resultado registrado | Imediatamente após resultado |
| **Memória** | Aprendizado registrado + rotina noturna | Imediato + noturno |
| **Relevância** | Contexto muda + rotina noturna | A cada tick + noturno |
| **Esquecimento** | Rotina noturna | Uma vez por dia |

### 3.3 Quem Chama Quem (e quem NUNCA PODE chamar quem)

```
REGRAS DE COMUNICAÇÃO:

✓ Observation Engine → Event Bus (publica observações)
✓ Signal Engine → Event Bus (publica sinais)
✓ Hypothesis Engine → Event Bus (publica hipóteses)
✓ Validation Engine → Event Bus (publica validações)
✓ Knowledge Engine → Event Bus (publica conhecimento)
✓ Context Engine → Event Bus (publica contextos)
✓ Priority Engine → Event Bus (publica prioridades)
✓ Decision Engine → Event Bus (publica decisões)
✓ Outcome Engine → Event Bus (publica resultados)
✓ Learning Engine → Event Bus (publica alterações de conhecimento)
✓ Memory Engine → Event Bus (publica consolidações)
✓ Relevance Engine → Event Bus (publica relevâncias)
✓ Forgetting Engine → Event Bus (publica arquivamentos)
✓ Trust Engine → Event Bus (publica scores)
✓ Ritmo Engine → Event Bus (publica ticks e gatilhos)

NUNCA:
✗ Nenhum submotor chama outro diretamente — sempre via Event Bus
✗ Decision Engine NUNCA chama Learning Engine (a decisão não pode influenciar o aprendizado)
✗ Learning Engine NUNCA chama Decision Engine (o aprendizado não pode influenciar a decisão atual)
✗ Context Engine NUNCA chama Knowledge Engine (contexto é leitura, não escrita)
✗ IA Conversacional NUNCA chama nenhum submotor
✗ Módulos da plataforma (CRM, Financeiro, etc.) NUNCA chamam submotores diretamente
✓ Módulos da plataforma SÓ conversam com o Motor Cognitivo através de eventos
```

---

## #4 — Ciclo de Vida do Conhecimento

### 4.1 Os 8 Estados do Conhecimento

```
                 ┌──────────────────────┐
                 │      HIPÓTESE        │  ↑ Nasce de um sinal
                 │  confiança: 10-30    │  ↑ Sempre cheia de dúvidas
                 └──────────┬───────────┘
                            │ Acumula evidências
                            ▼
                 ┌──────────────────────┐
                 │   EM OBSERVAÇÃO      │  ↑ Tem potencial, mas precisa de mais provas
                 │  confiança: 30-59    │  ↑ Está sendo monitorada
                 └──────────┬───────────┘
                           / \
                          /   \
                Confiança ≥ 60  Confiança < 20
                │                                  │
                ▼                                  ▼
     ┌──────────────────────┐          ┌──────────────────────┐
     │   CONHECIMENTO       │          │     DESCARTADO       │  ↑ Nunca mais será usado
     │  confiança ≥ 60      │          │                      │  ↑ Irreversível
     │  convicção aumenta   │          └──────────────────────┘
     │  com o tempo         │
     └──────────┬───────────┘
               /|\
              / | \
             /  |  \
            /   |   \
           /    |    \
          /     |     \
         /      |      \
        /       |       \
       /        |        \
      /         |         \
Confiança    Relevância   Tempo sem        Tempo sem
cai < 60     cai a 0      evidências       consulta
(cai para   (por         > 60 dias        > 90 dias
EM OBS)     desuso)      (inatividade)    (desinteresse)
│            │             │                │
▼            ▼             ▼                ▼
┌──────────┐ ┌──────────┐ ┌──────────────┐ ┌──────────────┐
│EM OBSERVA.│ │ARQUIVADO │ │  ARQUIVADO   │ │  ARQUIVADO   │
│(reativar) │ │(desuso)  │ │ (inatividade)│ │(desinteresse)│
└──────────┘ └──────────┘ └──────────────┘ └──────────────┘
    │             │              │                │
    └─────────────┴──────────────┴────────────────┘
                        │
                        │ Novas evidências surgem?
                    ┌───┴───┐
                    │       │
                  SIM      NÃO
                    │       │
                    ▼       ▼
           ┌────────────┐  PERMANECE
           │ REATIVADO  │  ARQUIVADO
           │(renasce)   │
           │confiança   │
           │recomeça    │
           │em 40       │
           └────────────┘
```

### 4.2 Detalhamento de Cada Fase

**Nascimento:**
- Toda hipótese nasce de um sinal. A Signal Engine detecta um padrão. A Hypothesis Engine propõe uma causa.
- Confiança inicial: entre 10 e 30 (nunca acima, pois acabou de nascer).
- Uma hipótese sozinha não gera nenhuma ação. Ela precisa ser validada primeiro.

**Amadurecimento:**
- Uma hipótese acumula evidências conforme mais observações relacionadas são registradas.
- Cada evidência favorável aumenta a confiança. Cada evidência contrária diminui.
- A Validation Engine verifica periodicamente se a hipótese já pode ser promovida.
- O amadurecimento pode levar horas (casos óbvios) ou semanas (padrões complexos).

**Ganho de Confiança:**
- Confiança é um score de 0 a 100, calculado pelo Trust Engine.
- Fórmula conceitual:
  ```
  confiança = (evidências_favoráveis * peso_evidência)
            - (evidências_contrárias * peso_refutação)
            + (recência_das_evidências * peso_recência)
            - (tempo_sem_evidências * penalidade_envelhecimento)
  ```
- Onde:
  - `peso_evidência`: depende da origem (evidência do empresário = 15, do sistema = 8)
  - `peso_refutação`: sempre maior que o peso da evidência (errar custa mais que acertar)
  - `peso_recência`: evidência de hoje vale 100%, de 30 dias atrás vale 50%
  - `penalidade_envelhecimento`: 5 pontos perdidos por semana sem novas evidências

**Ganho de Convicção:**
- Convicção é diferente de confiança. Confiança responde a "quão certo estamos?". Convicção responde a "há quanto tempo estamos certos?".
- Convicção aumenta com o tempo sem refutação, independentemente de novas evidências.
- Fórmula conceitual: `convicção = dias_sem_refutação * 0.5`
- Convicção máxima: 100 (atingida após 200 dias sem refutação)
- Uma única refutação zera a convicção (volta a acumular do zero)

**Perda de Relevância:**
- A Relevance Engine monitora continuamente a utilidade de cada conhecimento.
- Relevância cai quando:
  - O conhecimento não é usado em decisões recentes
  - O conhecimento é sobre uma categoria que não está mais ativa
  - O conhecimento foi substituído por outro mais específico
- Relevância não é confiança. Um conhecimento pode ter confiança alta e relevância baixa (ex.: "cliente X prefere contato por email" — ainda é verdade, mas o cliente não compra há 2 anos).

**Envelhecimento:**
- Conhecimento envelhece quando não recebe novas evidências.
- A cada 7 dias sem nenhuma evidência relacionada, o conhecimento perde 5 pontos de confiança.
- A cada 30 dias sem consulta para decisões, perde 10 pontos de relevância.
- O envelhecimento é intencional — evita que conhecimento desatualizado pareça verdade absoluta.

**Arquivamento:**
- Quando confiança cai abaixo de 20, o conhecimento é arquivado.
- Quando relevância fica em 0 por 90 dias, o conhecimento é arquivado.
- Arquivado não é perdido. Permanece em um repositório de conhecimento histórico.
- Conhecimento arquivado não aparece em Contextos Cognitivos — a menos que seja explicitamente consultado.

**Renascimento:**
- Um conhecimento arquivado pode renascer se novas evidências surgirem.
- Ao renascer, começa com confiança 40 (metade do caminho) — não do zero.
- O renascimento é automático: a Observation Engine registra uma observação, que alimenta o conhecimento arquivado, e a Validation Engine detecta o padrão.

---

## #5 — Quando o Motor Deve Falar (e Quando Deve Ficar em Silêncio)

### 5.1 O Princípio Fundamental

O Motor Cognitivo segue o princípio do **menor ruído possível**. O silêncio é o estado padrão. O Motor só fala quando tem algo que o empresário PRECISA saber e que ele NÃO DESCOBRIRIA sozinho.

Um erro comum em sistemas "inteligentes" é falar demais. Cada notificação, cada alerta, cada recomendação que não agrega valor destrói a confiança do empresário no sistema. A Ponte Digital prefere que o empresário diga "nossa, o sistema ficou em silêncio por uma semana e de repente me alertou sobre algo que eu realmente não tinha visto" a "o sistema me notifica toda hora e eu ignoro tudo".

### 5.2 Matriz de Decisão: Falar vs Calar

```
                                            O empresário descobriria sozinho?
                                            SIM               NÃO
                                           ┌──────────────────────────────┐
                                    GRAVE  │   ALERTAR (mas só se puder  │
                    O impacto da          │   agir agora)               │
                    informação     SIM    │                              │
                    é...                  │   Ex.: "Sua conta de luz    │
                                           │   vai vencer amanhã"        │
                                           ├──────────────────────────────┤
                                           │   NÃO ALERTAR               │
                                           │                              │
                    (não saber             │   (registrar para contexto   │
                    agora causa     NÃO    │   futuro)                    │
                    danho real)            │                              │
                                           │   Ex.: "Lead X não responde  │
                                           │   há 3 dias"                │
                                           └──────────────────────────────┘
```

### 5.3 Quando o Motor Deve:

**PERGUNTAR:**
- Quando uma lacuna de conhecimento impede uma decisão importante.
- Quando uma hipótese está em observação há tempo demais sem evidências.
- Quando o empresário pode responder algo que o Motor não consegue observar sozinho.
- Ex.: "Você mencionou que o problema se repete — há quanto tempo isso acontece?"
- **Frequência máxima:** 1 pergunta a cada 3 dias (evitar sobrecarga).

**OBSERVAR:**
- SEMPRE. O Motor observa continuamente. Observação não cansa o empresário.
- Observação silenciosa é o estado padrão do Motor.
- O empresário nunca precisa saber que o Motor está observando.

**ENSINAR:**
- Quando novas evidências contradizem conhecimento estabelecido.
- Quando o empresário toma uma decisão que contraria a recomendação do Motor — o Motor deve registrar o aprendizado, não contestar.
- Ex.: O Motor recomendou "renegociar com cliente X", o empresário optou por "não renovar o contrato". O Motor aprende que aquela recomendação específica não se aplica àquele cliente.
- Ensinamento é sempre silencioso. O empresário não precisa ser notificado de que o Motor aprendeu.

**ALERTAR:**
- Apenas quando TODAS as condições abaixo são verdade:
  1. A informação é grave (impacto financeiro, legal, ou operacional irreversível)
  2. O empresário NÃO descobriria sozinho a tempo de agir
  3. O empresário PODE agir agora (não adianta alertar sobre o que não pode ser mudado)
  4. A confiança no alerta é ≥ 70 (nunca alertar com dúvida)
- Se qualquer condição falhar: não alertar. Registrar para contexto futuro.

**FICAR EM SILÊNCIO:**
- É o estado padrão.
- Quando o empresário está em um momento de alta carga cognitiva (muitas decisões seguidas).
- Quando o conhecimento tem baixa confiança (< 50) — o Motor não deve transmitir dúvida.
- Quando o alerta seria sobre algo que o empresário já está ciente.
- Quando não há novidade desde a última interação.

---

## #6 — Contexto Cognitivo

### 6.1 Definição

Contexto Cognitivo é a representação completa, porém condensada, do estado atual da empresa do ponto de vista do Motor Cognitivo. É o que o Motor "sabe" sobre a empresa neste momento exato.

O Contexto Cognitivo nunca inclui tudo que o Motor sabe. Inclui apenas:
1. O que é relevante AGORA (filtrado pela Relevance Engine)
2. O que é necessário para a decisão atual (filtrado pela Priority Engine)
3. O que mudou desde o último contexto (para evitar repetição)

### 6.2 Estrutura do Contexto Cognitivo

```
CONTEXTO COGNITIVO
│
├── DADOS GERAIS
│   ├── empresaId
│   ├── momento (timestamp da construção)
│   ├── tick do relógio cognitivo
│   └── versão do contexto (incremental)
│
├── IDENTIDADE DA EMPRESA
│   ├── segmento
│   ├── porte (funcionários, faturamento)
│   ├── tempo de operação
│   └── estágio na Escada Comunitária (Curioso / Apoiador / Fundador / Embaixador)
│
├── O QUE SABEMOS (conhecimentos ativos)
│   ├── conhecimentos com confiança ≥ 60 E relevância ≥ 30
│   ├── ordenados por relevância (mais relevante primeiro)
│   └── cada conhecimento com: descrição, confiança, convicção, última evidência
│
├── O QUE SUSPEITAMOS (hipóteses ativas)
│   ├── hipóteses em observação ou fortalecidas
│   ├── ordenadas por potencial de confirmação
│   └── cada hipótese com: descrição, confiança atual, sinais que a motivaram
│
├── O QUE NÃO SABEMOS (lacunas)
│   ├── lacunas que bloqueiam decisões atuais
│   └── cada lacuna com: o que falta saber, por que é importante
│
├── O QUE MUDOU (delta desde o último contexto)
│   ├── novos conhecimentos desde o último contexto
│   ├── conhecimentos enfraquecidos ou descartados
│   ├── novas hipóteses
│   ├── novas observações relevantes
│   └── resultados de ações recentes
│
├── PRIORIDADE ATUAL
│   ├── única prioridade (a coisa mais importante agora)
│   └── por que essa é a prioridade (rastreabilidade até conhecimento)
│
├── DECISÕES ATIVAS
│   ├── decisões em aberto (recomendadas, não executadas)
│   ├── cada decisão com: o quê, por quê, confiança, urgência
│   └── decisões executadas recentemente (últimos 7 dias)
│
├── APRENDIZADOS EXPLÍCITOS
│   ├── aprendizados registrados (o empresário ensinou)
│   └── cada aprendizado com: descrição, categoria, origem
│
└── MÉTRICAS COGNITIVAS
    ├── score de saúde cognitiva
    ├── score de maturidade
    ├── score de evolução recente
    ├── sinais ativos (não processados)
    └── insights gerados na última rodada
```

### 6.3 Como a Informação é Escolhida

A Context Engine usa um algoritmo de 3 estágios:

**Estágio 1 — Filtragem por Relevância:**
- Todos os conhecimentos ativos passam pela Relevance Engine
- São mantidos apenas os com relevância ≥ 30 (escala 0-100)
- Conhecimentos arquivados são excluídos (a menos que consulta explícita)

**Estágio 2 — Filtragem por Mudança:**
- Conhecimentos que não mudaram desde o último contexto são movidos para uma seção "estável" condensada
- Apenas o que mudou (novo, alterado, enfraquecido) aparece na seção de destaque
- Isso evita que o contexto cresça indefinidamente com informações repetidas

**Estágio 3 — Limite de Tamanho:**
- O Contexto Cognitivo tem um limite máximo de informações
- Se ultrapassar, a Priority Engine determina o que cortar
- A regra é: o empresário deve conseguir ler o contexto em menos de 30 segundos
- A IA deve conseguir processar o contexto em menos de 5 segundos

### 6.4 Como Evitar Excesso de Contexto

| Técnica | O que faz |
|---|---|
| **Janela de relevância** | Conhecimento não acessado na última semana não entra no contexto padrão |
| **Condensação de similares** | 5 observações sobre o mesmo tema viram 1 resumo |
| **Hierarquia de importância** | Seção "Destaque" (max 3 itens) + seção "Detalhes" (max 10 itens) |
| **Remoção de redundância** | Se um conhecimento diz "cliente X atrasa pagamentos" e outro diz "cliente X tem 80% de chance de atrasar", o Motor mantém o mais específico e descarta o redundante |
| **Podas noturnas** | A cada noite, a Forgetting Engine revisa o tamanho do contexto e remove o que não justifica seu espaço |

---

## #7 — Mecanismo de Priorização

### 7.1 O Problema

O Motor Cognitivo pode ter centenas de conhecimentos, dezenas de hipóteses, e milhares de observações sobre uma empresa. Ele nunca consegue atuar sobre tudo ao mesmo tempo. Ele precisa escolher.

A prioridade responde a pergunta: **"Se o empresário só puder fazer uma coisa hoje, qual deve ser?"**

### 7.2 Algoritmo Conceitual de Priorização

```
Para cada candidato a prioridade (sinal, decisão, oportunidade):

1. SCORE DE URGÊNCIA (0-100)
   ├── Tem prazo? Sim → dias até o prazo:
   │   0 dias = 100, 1 dia = 80, 3 dias = 50, 7 dias = 30, 30+ dias = 10
   │   Não → 0
   └── Perda financeira iminente? Sim → +30

2. SCORE DE IMPACTO (0-100)
   ├── Afeta receita? Sim → +40
   ├── Afeta cliente? Sim → +30
   ├── Afeta operação? Sim → +20
   ├── Afeta conformidade legal? Sim → +50 (sempre alta)
   └── É reversível depois? Sim → -20

3. SCORE DE CONFIANÇA (0-100)
   └── (vem do Trust Engine para este conhecimento/decisão)

4. SCORE DE ALINHAMENTO COM OBJETIVOS (0-100)
   ├── Contribui diretamente para o objetivo principal? Sim → +50
   ├── Contribui indiretamente? Sim → +20
   └── Não contribui? → 0

5. SCORE DE MOMENTO DA EMPRESA (0-100)
   ├── Empresa em crise → prioridade financeiro + operação pesam 3x
   ├── Empresa em crescimento → prioridade clientes + vendas pesam 2x
   ├── Empresa estável → todas as categorias pesam igual
   └── Empresa recém-chegada → prioridade diagnóstico (conhecer a empresa)

PRIORIDADE FINAL = 
    (urgencia * 0.30)
  + (impacto * 0.25)
  + (confianca * 0.20)
  + (alinhamento * 0.15)
  + (momento * 0.10)

A prioridade mais alta é A prioridade da empresa agora.
Apenas a mais alta. Não existe segunda prioridade no contexto ativo.
```

### 7.3 Regras de Desempate

Se dois candidatos tiverem a mesma prioridade final:

1. Ganha quem tem **maior urgência** (prazo mais curto)
2. Se ainda empatado, ganha quem tem **maior confiança** (estamos mais certos)
3. Se ainda empatado, ganha quem tem **maior convicção** (sabemos há mais tempo)
4. Se ainda empatado, ganha **o mais recente** (acabou de acontecer)

### 7.4 Quando a Prioridade Muda

- Uma nova observação de alta urgência chega
- Um prazo expira
- Um objetivo é alterado pelo empresário
- Uma ação é concluída (libera capacidade para a próxima)
- O ciclo de processamento detecta mudança significativa no contexto

---

## #8 — Mecanismo de Memória

### 8.1 Hierarquia de Memória

```
MEMÓRIA DE TRABALHO (Working Memory)
─────────────────────────────────────
Capacidade:     últimas 24h
Propósito:      decisões em tempo real
Conteúdo:       observações recentes, sinais ativos, decisões em aberto
Persistência:   em memória (volátil)
Recuperação:    instantânea
Expurgo:        a cada 24 horas (move para curto prazo)

MEMÓRIA DE CURTO PRAZO (Short Term)
─────────────────────────────────────
Capacidade:     últimos 30 dias
Propósito:      contexto de decisões, aprendizado recente
Conteúdo:       observações, sinais, decisões, resultados dos últimos 30 dias
Persistência:   persistente (banco de eventos)
Recuperação:   < 100ms
Condensação:    a cada 7 dias (resumo semanal)
Expurgo:        a cada 30 dias (move para longo prazo, condensa)

MEMÓRIA DE LONGO PRAZO (Long Term)
─────────────────────────────────────
Capacidade:     histórico completo (> 30 dias)
Propósito:      padrões sazonais, aprendizado consolidado, conhecimento estável
Conteúdo:       conhecimento validado, padrões confirmados, tendências
Persistência:   persistente
Recuperação:   < 500ms
Condensação:    a cada 30 dias (resumo mensal)
Expurgo:        nunca (é o arquivo definitivo)

MEMÓRIA ARQUIVADA (Archived)
─────────────────────────────────────
Capacidade:     conhecimento desativado mas não perdido
Propósito:      reter conhecimento que pode renascer
Conteúdo:       conhecimento com confiança < 20, relevância = 0 por 90+ dias
Persistência:   persistente
Recuperação:   < 2s (consulta explícita, não automática)
Expurgo:        apenas quando explicitamente descartado
```

### 8.2 Quando Esquecer

O esquecimento não é um erro — é uma função cognitiva essencial. Um Motor que não esquece acumula ruído até se tornar inútil.

| Gatilho de Esquecimento | Ação |
|---|---|
| Conhecimento não acessado por 90 dias | Arquivar (relevância = 0) |
| Conhecimento sem evidências por 60 dias | Arquivar (inautenticidade) |
| Hipótese sem novas evidências por 30 dias | Mover para observação |
| Hipótese sem novas evidências por 60 dias | Descartar |
| Observação com mais de 90 dias | Condensar em resumo |
| Sinal resolvido há mais de 30 dias | Remover da memória ativa |
| Feedback com mais de 90 dias | Condensar (manter só a direção: ajudou/não ajudou) |

### 8.3 Quando Recuperar

| Gatilho de Recuperação | O que recupera |
|---|---|
| Observação atual ativa conhecimento arquivado | Reativar conhecimento (confiança 40) |
| Empresa repete padrão arquivado | Reativar conhecimento associado |
| Consulta explícita do empresário | Buscar em toda a hierarquia |
| IA pergunta sobre tópico específico | Buscar em toda a hierarquia |

### 8.4 Condensação

A condensação é o processo de transformar N eventos em 1 resumo. Ela acontece:

- **A cada hora:** 60 observações por hora → 1 resumo horário por categoria
- **A cada dia:** 24 resumos horários → 1 resumo diário por categoria
- **A cada semana:** 7 resumos diários → 1 resumo semanal por categoria
- **A cada mês:** 4-5 resumos semanais → 1 resumo mensal (apenas para longo prazo)

A condensação preserva:
- A direção geral (positiva, negativa, estável)
- Os eventos extremos (melhor e pior observação do período)
- A contagem total de eventos
- Qualquer decisão tomada no período
- Qualquer aprendizado registrado

A condensação descarta:
- O detalhe individual de cada observação (perde-se granularidade em troca de compressão)
- Observações redundantes (a mesma informação repetida N vezes vira 1 no resumo)

---

## #9 — Mecanismo de Aprendizado

### 9.1 O Que Gera Aprendizado

```
Fonte de Aprendizado          │ O que gera                    │ Exemplo
──────────────────────────────┼────────────────────────────────┼──────────────────────
Resultado de ação positiva    │ Fortalece conhecimento         │ "Recomendação de
                              │ relacionado                    │ follow-up funcionou"
                              │                                │
Resultado de ação negativa    │ Enfraquece conhecimento         │ "Desconto não gerou
                              │ relacionado                    │ nova venda"
                              │                                │
Feedback explícito            │ Fortalece ou enfraquece         │ "Isso ajudou de verdade"
("ajudou" / "não ajudou")    │ (equivalente a resultado)       │
                              │                                │
Aprendizado explícito         │ Cria conhecimento direto       │ "Prefiro contato por
(pergunta rápida, ensinamento)│ (confiança inicial 70-80)      │ WhatsApp"
                              │                                │
Observação que contradiz      │ Enfraquece ou descarta          │ "Cliente X pagou
conhecimento estabelecido     │ conhecimento existente          │ adiantado" (contradiz
                              │                                │ "cliente X sempre atrasa")
                              │                                │
Padrão repetido observado     │ Fortalece ou cria hipótese      │ "Toda sexta-feira o
                              │                                │ fluxo de caixa fica
                              │                                │ negativo"
```

### 9.2 O Que NÃO Gera Aprendizado

| Situação | O que acontece |
|---|---|
| Empresário ignora recomendação | Nada. Silêncio não é evidência. Talvez a recomendação estava errada, talvez ele só não teve tempo. O Motor não assume nenhuma das duas. |
| Observação isolada | Uma observação sozinha não gera aprendizado — só se repetir (aí vira sinal). |
| Ação não executada | Registro histórico. Sem alteração de conhecimento. |
| Empresário pergunta algo | A pergunta em si não altera conhecimento (a resposta pode). |

### 9.3 Quando o Feedback Altera Conhecimento

| Feedback | Altera confiança? | Altera convicção? | Altera conhecimento? |
|---|---|---|---|
| AJUDOU | +10 no conhecimento associado | Zera convicção (recomeça) | Fortalece a relação ação→resultado |
| AJUDOU_PARCIALMENTE | +5 no conhecimento associado | Zera convicção | Cria nuance no conhecimento |
| NAO_AJUDOU | -15 no conhecimento associado | Zera convicção | Enfraquece a relação ação→resultado |
| NAO_EXECUTADA | 0 | 0 | Registra histórico apenas |

### 9.4 Quando o Feedback Apenas Registra Histórico

- Feedback sem ação associada (não sabemos o que gerou o feedback)
- Feedback sobre algo que não tem conhecimento associado
- Feedback "neutro" (sem direção positiva ou negativa)
- Nesses casos, o feedback é armazenado na memória de curto prazo como observação, mas não altera scores.

---

## #10 — Interface com a IA Conversacional

### 10.1 O Contrato

A IA conversacional (o Assistente da Ponte) nunca:
- Consulta o banco de dados
- Interpreta dados brutos
- Cria conhecimento
- Toma decisões
- Altera estado do Motor Cognitivo

A IA conversacional apenas:
- Recebe um Contexto Cognitivo (pacote fechado)
- Traduz o contexto em linguagem natural
- Responde perguntas do empresário DENTRO do escopo do contexto

### 10.2 O Formato do Contexto para a IA

A IA recebe um documento estruturado (não importa o formato técnico — o que importa é o CONTRATO):

```
PARA A IA:
Você é o Assistente da Ponte Digital, a voz do Motor Cognitivo.
Abaixo está o Contexto Cognitivo completo da empresa.
Você NÃO tem acesso a nenhuma outra informação.
Você NÃO pode criar informações novas.
Você NÃO pode tomar decisões.
Você NÃO pode recomendar nada que não esteja neste contexto.

O que você PODE fazer:
1. Explicar qualquer item do contexto em linguagem natural
2. Responder perguntas do empresário sobre os itens do contexto
3. Sugerir que o empresário veja detalhes no dashboard apropriado
4. Se o empresário perguntar algo fora do contexto, diga:
   "Não tenho essa informação agora. Posso perguntar ao sistema?"
   (isso gera um evento de "lacuna" que o Motor processa)

CONTEXTO COGNITIVO:
(conteúdo gerado pela Context Engine — estrutura da seção 6.2)
```

### 10.3 O Ciclo de Conversação

```
1. Empresário abre o Assistente
2. Motor Cognitivo gera Contexto Cognitivo atualizado
3. Contexto é enviado para a IA
4. IA gera saudação baseada no contexto
5. Empresário pergunta ou responde
6. Se a pergunta pode ser respondida com o contexto → IA responde
7. Se a pergunta exige informação que o Motor não tem → IA registra lacuna
8. Se a pergunta gera uma ação → IA recomenda ação (baseada nas decisões do contexto)
9. Após a conversa, IA publica evento de "conversa realizada"
10. Motor Cognitivo processa o evento (aprendizado, novas observações)
```

### 10.4 O que a IA NUNCA Pode Fazer

```
✗ "Acho que sua empresa está com problema de fluxo de caixa"
   (Isso é uma decisão — só o Motor Cognitivo pode decidir isso)

✗ "Segundo meus dados, sua receita caiu 15% este mês"
   (Isso é interpretação de dado bruto — só o Motor Cognitivo pode interpretar)

✗ "Recomendo que você demita o João"
   (Isso é uma decisão de negócio — o Motor Cognitivo pode recomendar "reveja a equipe",
    mas nunca individualizar sem evidência suficiente)

✗ "Você parece estressado hoje"
   (Isso é inferência emocional — proibido pela Constituição, UX_DECISIONS.md)

✓ "Segundo o que aprendemos sobre sua empresa, a prioridade hoje é organizar
   o fluxo de caixa. Tem uma decisão em aberto sobre isso, quer que eu explique?"
   (Isso é tradução do Contexto Cognitivo — correto)
```

---

## #11 — Interface com os Módulos da Plataforma

### 11.1 O Princípio

Nenhum módulo da plataforma (CRM, Financeiro, Tarefas, Agenda, Implantação, Clientes) se comunica diretamente com outro. Todos se comunicam **apenas através do Motor Cognitivo**.

O Motor Cognitivo é o barramento central. Todo evento gerado por um módulo passa pelo Motor. Toda ação que um módulo precisa tomar é decidida pelo Motor.

### 11.2 Como a Comunicação Funciona

```
┌──────────────┐     Eventos      ┌──────────────────┐    Eventos      ┌──────────────┐
│    MÓDULOS   │ ──────────────▶  │  MOTOR COGNITIVO │ ◀────────────── │    MÓDULOS   │
│  (CRM, Fin,  │                  │                  │                 │  (executores)│
│   Tasks,etc) │ ◀──────────────  │  (observa,       │  ──────────────▶│              │
│              │   Decisões       │   interpreta,    │   Recomendações │              │
│              │                  │   decide)        │                 │              │
└──────────────┘                  └──────────────────┘                 └──────────────┘
       │                                                                ▲
       │ Eventos brutos                                                  │
       │ (lead criado,                                                   │ Ações
       │  pagamento                                                     │ (criar lead,
       │  recebido,                                                      │  enviar email,
       │  tarefa venceu)                                                 │  agendar visita)
       │                                                                │
       ▼                                                                │
┌──────────────────────────────────────────────────────────────────────────┐
│                          EVENT BUS                                        │
│  (barramento único — todo evento é publicado aqui, todo submotor escuta) │
└──────────────────────────────────────────────────────────────────────────┘
```

### 11.3 Catálogo de Eventos por Módulo

```
MÓDULO          │ EVENTOS QUE EMITE                  │ EVENTOS QUE RECEBE
────────────────┼────────────────────────────────────┼─────────────────────────
CRM             │ LeadCriado                         │ Decisão → follow-up lead
                │ LeadAvancou                        │ Decisão → revisar pipeline
                │ LeadConvertido                     │ Decisão → aquecer lead frio
                │ LeadEsfriou                        │
                │ ClienteCriado                      │
                │ ClienteInativo                     │
                │ ContatoRegistrado                  │
                │                                    
Financeiro      │ ReceitaRegistrada                  │ Decisão → revisar fluxo de caixa
                │ DespesaRegistrada                  │ Decisão → negociar receber
                │ DespesaRecorrenteCriada            │ Decisão → registrar movimentação
                │ PagamentoRecebido                  │
                │ PagamentoAtrasado                  │
                │ FluxoCaixaNegativo                 │
                │                                    
Tarefas         │ TarefaCriada                       │ Decisão → organizar pendências
                │ TarefaConcluida                    │
                │ TarefaAtrasada                     │
                │ TarefaCancelada                    │
                │                                    
Agenda          │ AgendaCriada                       │ (futuro — a definir)
                │ AgendaConcluida                    │
                │ AgendaCancelada                    │
                │                                    
Implantação     │ ImplantacaoIniciada                │ Decisão → revisar cronograma
(OBS)           │ EtapaConcluida                     │
                │ ImplantacaoConcluida               │
                │ ImplantacaoAtrasada                │
                │                                    
Clientes        │ PedidoRegistrado                   │ (mesmo que CRM)
                │ ContratoRenovado                   │
                │ ContratoCancelado                  │
                │                                    
Assistente      │ ConversaIniciada                   │ Contexto Cognitivo (para IA)
(IA)            │ PerguntaRespondida                 │
                │ LacunaReportada                    │
                │                                    
Observatório    │ (consome eventos, não emite)       │ KnowledgeVaultMetrics
(Métricas)      │                                    │ LearningMetrics
                │                                    │ OSMetricsSummary
                │                                    │ EvolutionMetrics
                │                                    │
Motor Cognitivo │ HipoteseCriada                     │ (todos os eventos acima)
                │ HipoteseFortalecida                │
                │ HipoteseConfirmada                 │
                │ HipoteseDescartada                 │
                │ ConhecimentoPromovido              │
                │ ConhecimentoEnfraquecido           │
                │ ConhecimentoArquivado              │
                │ DecisaoGerada                      │
                │ ResultadoRegistrado                │
                │ AprendizadoRegistrado              │
                │ ContextoAtualizado                 │
```

---

## #12 — Catálogo de Eventos

### 12.1 Eventos que ENTRAM no Motor Cognitivo

```
Evento                      │ Origem                 │ Objetivo
────────────────────────────┼────────────────────────┼─────────────────────
LeadCriado                  │ CRM                    │ Nova oportunidade detectada
LeadAvancou                 │ CRM                    │ Lead progrediu no pipeline
LeadEsfriou                 │ CRM (inferido)         │ Lead perdeu engajamento
LeadConvertido              │ CRM                    │ Lead virou cliente
ClienteCriado               │ CRM                    │ Novo cliente registrado
ClienteInativo              │ CRM (inferido)         │ Cliente sem interação
ContatoRegistrado           │ CRM                    │ Novo contato adicionado
PedidoRegistrado            │ Clientes               │ Novo pedido recebido
ContratoRenovado            │ Clientes               │ Contato renovado
ContratoCancelado           │ Clientes               │ Contrato encerrado
ReceitaRegistrada           │ Financeiro             │ Receita lançada
DespesaRegistrada           │ Financeiro             │ Despesa lançada
PagamentoRecebido           │ Financeiro             │ Pagamento confirmado
PagamentoAtrasado           │ Financeiro             │ Pagamento venceu sem confirmação
FluxoCaixaNegativo          │ Financeiro (inferido)  │ Despesas > receitas no período
DespesaRecorrenteCriada     │ Financeiro             │ Nova despesa fixa registrada
TarefaCriada                │ Tarefas                │ Nova tarefa cadastrada
TarefaConcluida             │ Tarefas                │ Tarefa executada
TarefaAtrasada              │ Tarefas (inferido)     │ Tarefa venceu sem conclusão
TarefaCancelada             │ Tarefas                │ Tarefa removida
ImplantacaoIniciada         │ Implantação            │ Onboarding começou
ImplantacaoConcluida        │ Implantação            │ Onboarding finalizado
ImplantacaoAtrasada         │ Implantação (inferido) │ Etapa venceu sem conclusão
ConversaIniciada            │ Assistente (IA)        │ Empresário abriu o chat
PerguntaRespondida          │ Assistente (IA)        │ Pergunta foi respondida
LacunaReportada             │ Assistente (IA)        │ IA não soube responder
FeedbackRegistrado          │ Empresário             │ Ação foi avaliada
AprendizadoExplicito        │ Empresário             │ Empresário ensinou algo
ObjetivoDefinido            │ Empresário             │ Nova meta registrada
ObjetivoAtualizado          │ Empresário             │ Meta alterada
```

### 12.2 Eventos que SAEM do Motor Cognitivo

```
Evento                      │ Destino                        │ Objetivo
────────────────────────────┼────────────────────────────────┼───────────────────────────
ObservacaoRegistrada        │ Motor (todos os submotores)    │ Base para todo o resto
SinalDetectado              │ Hypothesis Engine              │ Dispara formulação
HipoteseCriada              │ Validation Engine + Knowledge  │ Novo candidato a conhecimento
                            │ Engine                         │
HipoteseFortalecida         │ Validation Engine              │ Hipótese ganhou evidências
HipoteseEnfraquecida        │ Validation Engine              │ Hipótese perdeu evidências
HipoteseConfirmada          │ Knowledge Engine               │ Virou conhecimento
HipoteseDescartada          │ Forgetting Engine              │ Eliminada
ConhecimentoPromovido       │ Context Engine + Trust         │ Novo conhecimento ativo
                            │ Engine + Relevance Engine      │
ConhecimentoEnfraquecido    │ Trust Engine + Learning Engine │ Perdeu confiança
ConhecimentoArquivado       │ Forgetting Engine + Memory     │ Movido para arquivo
                            │ Engine                         │
ConhecimentoReativado       │ Knowledge Engine + Context     │ Renasceu
                            │ Engine                         │
ContextoAtualizado          │ Priority Engine + Decision     │ Novo retrato da empresa
                            │ Engine                         │
PrioridadeDefinida          │ Decision Engine + Ritmo Engine │ O que importa agora
DecisaoGerada               │ Módulos (executores) + IA      │ Recomendação formal
ResultadoRegistrado         │ Learning Engine                │ Consequência de ação
ImpactoCalculado            │ Learning Engine + Memory       │ Quanto a ação impactou
                            │ Engine                         │
AprendizadoRegistrado       │ Knowledge Engine               │ Novo conhecimento do empresário
LacunaIdentificada          │ Context Engine + (se grave)    │ O que o Motor não sabe e
                            │ IA                             │ deveria saber
AlertaPublicado             │ IA (se grave + urgente)        │ Precisa da atenção AGORA
ResumoDiario                │ Memory Engine                  │ Condensação do dia
ResumoSemanal               │ Memory Engine                  │ Condensação da semana
ResumoMensal                │ Memory Engine                  │ Condensação do mês
TickCognitivo               │ Motor (todos os submotores)    │ Ciclo de processamento
```

---

## #13 — Princípios Imutáveis (Constituição do Motor Cognitivo)

Estes princípios são a Constituição do Motor Cognitivo. Nenhuma alteração, atualização ou exceção pode violá-los sem uma decisão explícita registrada como ADR. Eles precedem qualquer regra técnica, qualquer otimização, qualquer pressão de prazo.

### 13.1 Os 20 Mandamentos

```
1. NUNCA INFERIR SEM EVIDÊNCIA.
   O Motor não assume nada. Se não há evidência, não há conhecimento. A ausência de
   evidência contrária não é evidência favorável.

2. NUNCA CONFUNDIR CORRELAÇÃO COM CAUSALIDADE.
   O Motor pode observar que duas coisas acontecem juntas, mas nunca afirmará que
   uma causa a outra sem evidência direta.

3. TODA RECOMENDAÇÃO PRECISA CITAR ORIGEM.
   O empresário tem o direito de saber por que o Motor recomendou algo. Toda decisão
   deve ser rastreável até os conhecimentos e evidências que a motivaram.

4. TODO CONHECIMENTO POSSUI CICLO DE VIDA.
   Conhecimento não é permanente. Nasce, amadurece, envelhece, pode morrer. Nada
   é verdade para sempre.

5. TODA DECISÃO PRECISA SER AUDITÁVEL.
   Qualquer decisão passada pode ser reconstruída: o contexto na época, as evidências
   disponíveis, o score de confiança, a recomendação feita.

6. A IA NUNCA CRIA CONHECIMENTO.
   A IA é a voz. O Motor é o cérebro. A IA traduz. O Motor decide. Essa separação
   é inegociável.

7. O CONHECIMENTO PERTENCE AO MOTOR, NÃO À IA.
   O Motor acumula conhecimento ao longo do tempo. A IA é substituível. Quando a
   IA mudar (novo modelo, novo provedor), o conhecimento não muda.

8. SILÊNCIO É O ESTADO PADRÃO.
   O Motor não fala a menos que tenha algo relevante a dizer. Ruído destrói confiança.

9. O EMPRESÁRIO ENSINA, O MOTOR APRENDE.
   O empresário é a fonte última de verdade sobre o próprio negócio. O Motor pode
   sugerir, questionar, alertar — mas se o empresário diz que algo é de um jeito,
   o Motor aceita e aprende.

10. CONFIANÇA E CONVICÇÃO SÃO SCORES SEPARADOS.
    Confiança = quão certo estamos. Convicção = há quanto tempo estamos certos.
    Um conhecimento pode ter confiança alta e convicção baixa (recém-descoberto).
    Ou confiança baixa e convicção alta (sabíamos, mas fomos refutados).

11. RELEVÂNCIA É TÃO IMPORTANTE QUANTO CONFIANÇA.
    Conhecimento irrelevante não é conhecimento útil. O Motor gasta tanta energia
    mantendo relevância quanto mantendo confiança.

12. ESQUECER É UMA FUNÇÃO COGNITIVA, NÃO UM ERRO.
    Sistema que não esquece é sistema que não prioriza. O Motor foi projetado para
    esquecer o que não importa mais.

13. NENHUM SUBMOTOR CHAMA OUTRO DIRETAMENTE.
    Toda comunicação é via Event Bus. Isso não é negociável. Submotores que se chamam
    diretamente criam acoplamento que impede evolução.

14. TUDO QUE O MOTOR FAZ É DETERMINÍSTICO E REPRODUTÍVEL.
    Dado o mesmo conjunto de eventos, o Motor produz o mesmo resultado. Não há
    aleatoriedade. Não há "intuição". Não há "feeling".

15. O MOTOR NÃO PERSONIFICA.
    O Motor não tem emoções, intuições, ou preferências. Tudo que ele "diz" é
    resultado de um processo determinístico. A linguagem pode ser amigável (papel
    da IA), mas a decisão nunca é subjetiva.

16. APRENDIZADO É SEMPRE REGISTRADO, NUNCA PERDIDO.
    Toda iteração do ciclo cognitivo é registrada. Mesmo que o resultado seja
    "nada mudou", isso é registrado. O histórico de aprendizado é a memória do Motor.

17. NENHUMA DECISÃO É TOMADA SEM CONTEXTO.
    Contexto é pré-requisito para decisão. Se o Context Engine não produziu um
    contexto, a Decision Engine não decide. Contexto vazio = silêncio.

18. O MOTOR NÃO COMPETE COM O EMPRESÁRIO.
    O Motor não decide pelo empresário. O Motor apresenta decisões. O empresário
    escolhe. Se o empresário escolhe diferente, o Motor aprende — não insiste.

19. TODO EVENTO TEM UM CORRELATION ID.
    Eventos encadeados carregam o mesmo ID de correlação. É possível reconstruir
    a cadeia causal completa de qualquer conhecimento, decisão ou resultado.

20. A CONSTITUIÇÃO PRECEDE TUDO.
    Nenhuma regra técnica, nenhuma ADR, nenhuma otimização de performance pode
    violar estes 20 princípios. Se uma otimização exigir violar um deles, a
    otimização não é feita. Ponto final.
```

---

## #14 — ADRs que Precisam Nascer deste Documento

| ADR | Título | Resumo |
|---|---|---|
| ADR-015 | Motor Cognitivo como barramento central da plataforma | Todos os módulos passam a se comunicar exclusivamente através do Motor Cognitivo. Módulos existentes são encapsulados um por um |
| ADR-016 | Submotores com responsabilidade única e comunicação exclusiva por eventos | Os 16 submotores do Motor se comunicam apenas via Event Bus. Nenhum submotor chama outro diretamente |
| ADR-017 | IA como tradutora de contexto, não como fonte de conhecimento | A IA recebe Contexto Cognitivo pronto. Nunca consulta banco. Nunca interpreta dados. Nunca cria conhecimento |
| ADR-018 | Ciclo de vida formal do conhecimento | Os 8 estados do conhecimento (Hipótese → Em Observação → Conhecimento → Arquivado → etc.) são formalizados como o único ciclo de vida possível |
| ADR-019 | Hierarquia de memória do Motor Cognitivo | Working Memory, Short Term, Long Term, Archived — cada uma com políticas de retenção, condensação e expurgo |
| ADR-020 | Algoritmo de priorização do Motor | Fórmula conceitual de priorização (urgência × impacto × confiança × alinhamento × momento) como o único mecanismo de priorização do sistema |
| ADR-021 | Contexto Cognitivo como pacote fechado | Context Engine produz um pacote único e imutável que é consumido por Decision Engine e IA. Ninguém mais produz contexto |
| ADR-022 | Catálogo formal de eventos de entrada e saída | Todo evento que entra ou sai do Motor tem origem, destino e objetivo definidos. Eventos novos devem ser catalogados antes de implementados |
| ADR-023 | Princípio do menor ruído possível | Silêncio é o estado padrão. Matriz de decisão "falar vs calar" (seção 5.2) é a única política de notificação |
| ADR-024 | Observação → Sinal → Hipótese → Conhecimento como pipeline único | O fluxo cognitivo completo é o único pipeline de processamento. Nenhum atalho pode pular etapas |
| ADR-025 | Aprendizado explícito do empresário tem peso maior que aprendizado inferido | Score de confiança inicial de aprendizado explícito é sempre ≥ 70. Aprendizado inferido começa em ≤ 30 |
| ADR-026 | Esquecimento programado como função cognitiva | Forgetting Engine executa rotina noturna. Nenhum conhecimento fica ativo indefinidamente sem revalidação |

---

## Avaliação Final

Este documento define o Motor Cognitivo da Ponte Digital.

Ele descreve:
- **O que** o Motor faz (missão)
- **Como** ele pensa (16 submotores, ciclo cognitivo, pipeline de conhecimento)
- **Quando** ele fala e quando se cala (matriz de decisão silêncio/fala)
- **O que** ele lembra e o que esquece (hierarquia de memória)
- **Como** ele aprende (mecanismo de aprendizado)
- **Como** ele se comunica (Event Bus, Contexto Cognitivo, interfaces)
- **O que** ele nunca pode fazer (20 princípios imutáveis)
- **O que** precisa ser decidido para existir (14 ADRs propostas)

Não há uma linha de código aqui. Não há uma tabela de banco. Não há uma rota de API. Não há um componente React.

Isto não é um ERP com IA.

Isto é a especificação de uma Infraestrutura Cognitiva Empresarial.

A diferença fundamental: um ERP com IA consulta dados e gera respostas. Esta Infraestrutura Cognitiva observa, interpreta, decide, aprende, lembra e esquece — como um cérebro, não como um sistema de informação.

Os próximos cinco anos da Ponte Digital devem ser orientados por este documento. Cada sprint, cada funcionalidade, cada decisão arquitetural deve responder a uma pergunta: "isso aproxima ou afasta o Motor Cognitivo do que está definido aqui?"
