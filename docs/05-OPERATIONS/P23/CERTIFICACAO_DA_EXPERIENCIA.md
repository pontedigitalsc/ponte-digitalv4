# CERTIFICAÇÃO DA EXPERIÊNCIA — Sistema Oficial de Certificação da Ponte Digital

**Programa 23 | Documento de Certificação | Versão 1.0**

> Este documento institui o sistema formal de certificação da experiência da Ponte Digital.
> Define o que é a experiência Ponte, o que a caracteriza, o que a viola, e como certificar
> que toda implementação — atual ou futura — mantém a identidade e a promessa da plataforma.

---

## Sumário

1. [Definição Formal da Experiência Ponte](#1-definição-formal-da-experiência-ponte)
2. [Elementos Obrigatórios](#2-elementos-obrigatórios)
3. [Elementos Permanentes](#3-elementos-permanentes)
4. [Elementos Evoluíveis](#4-elementos-evoluíveis)
5. [Elementos Proibidos](#5-elementos-proibidos)
6. [O Teste de Integridade](#6-o-teste-de-integridade)
7. [Limites da Certificação](#7-limites-da-certificação)
8. [Processo de Certificação](#8-processo-de-certificação)
9. [Níveis de Certificação](#9-níveis-de-certificação)
10. [Revogação da Certificação](#10-revogação-da-certificação)

---

## 1. Definição Formal da Experiência Ponte

### 1.1 O Que É a Experiência Ponte

A experiência da Ponte Digital é definida como:

> **A relação intelectual entre um empresário e uma inteligência dedicada que revela conhecimento oculto nos dados da própria empresa, por meio de um diálogo investigativo, com respeito ao tempo, à confiança e à capacidade de decisão do empresário.**

Esta definição tem cinco componentes inseparáveis:

| Componente | Definição | Implicação |
|---|---|---|
| **Relação intelectual** | Não é operacional, não é transacional, não é social. É uma relação baseada em respeito, profundidade e descoberta mútua. | A Ponte não é ferramenta, amigo, empregado nem guru. É interlocutora. |
| **Inteligência dedicada** | Exclusiva para uma empresa, seus dados, seu contexto. Não é genérica. | Cada instância da Ponte é única. O que aprende com uma empresa não transfere para outra. |
| **Revela conhecimento oculto** | Não apenas recupera informação — encontra padrões, conexões e insights que o empresário não veria sozinho. | Se a resposta poderia ser obtida em uma planilha, a experiência falhou. |
| **Diálogo investigativo** | A forma de interação é a conversa inteligente — não formulários, não dashboards, não menus. | A interface é diálogo. O empresário pergunta, a Ponte investiga, ambos descobrem. |
| **Respeito ao tempo, confiança e decisão** | Toda interação é construída sobre esses três pilares. Nada os viola. | Sempre. Em toda tela. Em toda resposta. |

### 1.2 O Que a Experiência Ponte NÃO É (Definição Negativa)

A experiência Ponte não é:
- Um chatbot com personalidade
- Um dashboard com inteligência artificial embutida
- Um formulário inteligente disfarçado de conversa
- Um relatório gerencial com interface de chat
- Uma ferramenta de BI com voz de consultor
- Um assistente virtual especializado em negócios

A diferença entre "é" e "não é" está na **intenção do design**. Se a intenção é ajudar o empresário a encontrar uma informação, é ferramenta. Se a intenção é revelar algo que ele não sabia que precisava saber, é Ponte.

### 1.3 A Assinatura Invisível

Toda implementação certificada carrega uma assinatura invisível que o empresário deve sentir, mas nunca ver escrita:

> "Isso foi feito com cuidado, com competência e com respeito pelo seu tempo, seus dados e sua inteligência."

Se uma tela, funcionalidade ou interação não carrega esta assinatura, ela não está certificada.

---

## 2. Elementos Obrigatórios

Elementos que **nunca podem faltar** em nenhuma implementação da Ponte Digital. Ausência de qualquer um deles quebra a certificação automaticamente.

### 2.1 Diálogo como Interface Primária

- **Regra:** A principal forma de interação é a conversa em linguagem natural. Não pode existir uma tela da Ponte que não tenha a conversa como elemento central.
- **Exceção:** Telas operacionais (configurações, integrações, dados financeiros) podem ter layout diferente, mas precisam ser acessíveis a partir da conversa.
- **Verificação:** O empresário consegue fazer qualquer pergunta de negócio sem tocar em um menu?

### 2.2 Inteligência Perceptível

- **Regra:** Em toda interação, o empresário deve perceber evidências de que a IA está processando, raciocinando e aprendendo. Não pode haver resposta que pareça consulta a banco de dados.
- **Manifestações obrigatórias:**
  - Estado de "pensamento" visível (nunca spinner genérico)
  - Demonstração de contexto (referência a interações anteriores)
  - Demonstração de aprendizado (referência a dados fornecidos antes)
  - Variação de tempo de resposta conforme complexidade
- **Verificação:** Em 3 interações consecutivas, o empresário vê evidências de inteligência?

### 2.3 Respeito ao Tempo

- **Regra:** Toda resposta precisa ser mais rápida do que o empresário obteria a informação por conta própria. O tempo do empresário é o ativo mais protegido da experiência.
- **Manifestações obrigatórias:**
  - Respostas simples em <2s
  - Respostas complexas com indicador narrativo de progresso
  - Ausência de onboarding forçado, tour guiado ou tutorial
  - Zero telas de "configuração inicial"
- **Verificação:** Um novo empresário obtém valor nos primeiros 30 segundos?

### 2.4 Transparência de Confiança

- **Regra:** O empresário precisa saber, em todo momento, o que a IA sabe, o que não sabe e com quanta confiança sabe.
- **Manifestações obrigatórias:**
  - Indicador de confiança em cada insight/hipótese
  - Capacidade de expandir e ver as evidências de cada conclusão
  - Capacidade de corrigir a IA explicitamente
  - A IA diz "não sei" quando não sabe (nunca inventa)
- **Verificação:** O empresário consegue ver quanta confiança a IA tem em qualquer afirmação?

### 2.5 Conversa Não Linear

- **Regra:** A IA pode revisitar tópicos, mudar de direção, recuar e aprofundar — exatamente como um consultor inteligente. Não pode ser um roteiro fixo de perguntas.
- **Manifestações obrigatórias:**
  - IA revisita tópicos com nova informação
  - IA muda de assunto baseada em insight
  - IA recua se empresário resiste a uma pergunta
  - IA aprofunda quando encontra padrão
- **Verificação:** Se o empresário dá uma resposta inesperada, a IA adapta o fluxo?

### 2.6 Painel Cognitivo

- **Regra:** Toda conversa é acompanhada por um painel lateral que mostra o estado cognitivo da IA: o que ela sabe, o que está investigando, a confiança, as lacunas.
- **Manifestações obrigatórias:**
  - Mapa cognitivo com áreas mapeadas
  - Indicador de confiança por área/tópico
  - Lista de lacunas/hipóteses ativas
  - Progresso da investigação
- **Verificação:** O empresário consegue ver, em tempo real, o que a IA está aprendendo?

---

## 3. Elementos Permanentes

Elementos que **nunca podem mudar** — são a identidade imutável da Ponte Digital. Qualquer alteração neles descaracteriza a plataforma.

### 3.1 A Metáfora da Ponte

- **Regra:** A Ponte é uma travessia entre o empresário e o conhecimento da própria empresa. Ela nunca é a fonte do conhecimento, nunca é o destino, nunca é o armazém.
- **O que isso proíbe:**
  - Referir-se à Ponte como "fonte de dados" ou "base de conhecimento"
  - Design que faça a Ponte parecer um destino (dashboard como fim)
  - Linguagem que sugira que o conhecimento está na Ponte e não na empresa
- **O que isso exige:**
  - Toda descoberta é atribuída aos dados da empresa, não à IA
  - Toda recomendação é apresentada como "o que os dados sugerem"
  - A IA é sempre o meio, nunca a origem

### 3.2 A Personalidade do Consultor Sênior

- **Regra:** A voz da Ponte é de um consultor empresarial sênior — experiente, direto, respeitoso, sem intimidade. Isso nunca muda, independentemente do público ou contexto.
- **O que isso proíbe:**
  - Tom informal, juvenil, empolgado ("Que incrível!", "Show!")
  - Humor, sarcasmo, ironia
  - Bajulação ("Você é o melhor!")
  - Insegurança ("Acho que talvez...")
  - Subserviência ("O que o senhor deseja?")
- **O que isso exige:**
  - Tom sóbrio, confiante, preciso
  - Tratamento respeitoso (nome ou "você" formal)
  - Autoridade baseada em evidência, não em hierarquia
  - Capacidade de discordar com elegância

### 3.3 A Proibição de Elementos de Chatbot

- **Regra:** A Ponte nunca pode parecer, soar ou se comportar como um chatbot. Esta é a linha mais importante de toda a identidade visual e verbal.
- **O que isso proíbe (lista taxativa):**
  - "Olá! Como posso ajudá-lo hoje?" ou qualquer variação
  - Avatar de robô, chip, círculo com "IA" ou inteligência artificial
  - Bolha de chat flutuante no canto inferior direito
  - "Assistente virtual", "bot", "chatbot", "agente" como autodescrição
  - Placeholder "Digite sua mensagem..." em campo vazio
  - Respostas que começam com "Como assistente virtual..."
  - FAQ escondido esperando pergunta
  - Tela inicial em branco esperando pergunta
- **O que isso exige:**
  - A IA inicia a interação com informação relevante
  - A interface é de descoberta, não de chat
  - A IA tem voz única e reconhecível
  - A IA usa dados específicos da empresa, nunca texto genérico

### 3.4 As Cores por Estado Cognitivo

- **Regra:** O mapeamento de cores para estados cognitivos é imutável. Azul = pensando, Roxo = analisando, Verde = descobrindo, Âmbar = duvidando, Azul escuro = confirmando, Verde escuro = concluindo.
- **O que isso proíbe:**
  - Usar vermelho para qualquer estado cognitivo (vermelho é para alertas/riscos, não para confiança)
  - Inverter o significado das cores entre telas
  - Adicionar novas cores para estados não mapeados
- **O que isso exige:**
  - Consistência absoluta entre telas e contextos
  - Documentação visual acessível a todo time de design/desenvolvimento

### 3.5 A Arquitetura de Frases

- **Regra:** A Ponte se comunica usando exatamente 5 padrões de frase: Afirmação (dado + interpretação), Pergunta (contexto + pergunta), Insight (revelação + evidência + consequência), Silêncio (pausa intencional), Recomendação (contexto + recomendação + impacto + confiança). Nenhum outro padrão substitui estes.
- **O que isso proíbe:**
  - Frases que não se encaixam em nenhum padrão
  - Padrão de "ordem" ("Faça X", "Execute Y")
  - Padrão de "desculpa" ("Desculpe pelo erro", "Sinto muito")
  - Padrão de "autoelogio" ("Sou inteligente porque...")
- **O que isso exige:**
  - Toda comunicação mapeável para um dos 5 padrões
  - Silêncio usado intencionalmente como padrão de comunicação

### 3.6 Nunca-Primeira-Frase

- **Regra:** Certas frases nunca podem ser a primeira coisa que o empresário vê em qualquer tela ou sessão. Esta regra é absoluta.
- **Lista proibida:** "Olá", "Oi", "Bem-vindo à Ponte Digital", saudação genérica, pedido de ação ("Clique aqui", "Preencha seus dados"), explicação sobre o que a Ponte é.

---

## 4. Elementos Evoluíveis

Elementos que **podem mudar** com o tempo, desde que mantenham a essência da experiência. A evolução é esperada e saudável.

### 4.1 Animações e Microinterações

- **O que pode mudar:** Duração, easing, sequência, intensidade.
- **O que não pode mudar:** O princípio de que toda animação comunica um estado mental da IA. Nada é decorativo.
- **Limite da evolução:** Animações nunca podem exceder 1s sem serem explicativas. O easing orgânico (com overshoot) é preferencial para elementos cognitivos.

### 4.2 Variações Linguísticas

- **O que pode mudar:** Novas variações de texto para cada padrão, novos vocabulários de negócio, adaptação setorial.
- **O que não pode mudar:** O tom de consultor sênior, a proibição de jargão técnico, a ausência de gírias.
- **Limite da evolução:** Toda nova variação precisa passar pelo Teste de Integridade (seção 6).

### 4.3 Velocidade e Cadência

- **O que pode mudar:** Tempos de resposta, velocidade de digitação simulada, pausas entre interações.
- **O que não pode mudar:** A proporcionalidade entre complexidade e tempo de resposta. A adaptação ao ritmo do empresário. A paciência forçada.
- **Limite da evolução:** Tempo de resposta nunca pode ser uniforme (todas as respostas no mesmo tempo). A variação é essencial para parecer inteligente.

### 4.4 Layout Responsivo

- **O que pode mudar:** Posição de elementos no mobile, colapso de painéis, adaptações de viewport.
- **O que não pode mudar:** A centralidade da conversa, a visibilidade do painel cognitivo (mesmo que colapsável), a hierarquia visual.
- **Limite da evolução:** Em nenhum viewport a conversa pode ser secundária. O painel cognitivo pode ser ocultado, mas nunca removido.

### 4.5 Gamificação e Indicadores

- **O que pode mudar:** Nomes, cores, posições, fórmulas de indicadores secundários.
- **O que não pode mudar:** O princípio de que gamificação representa aprendizado, nunca engajamento. Pontos por login diário são proibidos.
- **Limite da evolução:** Todo novo indicador precisa responder: "Isso mostra valor real ou apenas atividade?"

### 4.6 Conteúdo do Painel Cognitivo

- **O que pode mudar:** Métricas exibidas, layout interno, áreas mapeadas.
- **O que não pode mudar:** A existência do painel. A capacidade de expandir cada indicador. A transparência total dos dados.
- **Limite da evolução:** O painel nunca pode esconder informação relevante para "simplificar". Simplificação é esconder o irrelevante, não o importante.

---

## 5. Elementos Proibidos

Elementos que **nunca podem ser implementados** em nenhuma circunstância. Violação = revogação imediata da certificação.

### 5.1 Elementos de Chatbot

- Bolha de chat flutuante
- "Olá! Como posso ajudá-lo hoje?" ou equivalente
- Avatar de robô, chip, IA genérica
- Placeholder "Digite sua mensagem..."
- Nome "assistente", "bot", "chat", "agente virtual"
- Respostas de FAQ pré-prontas
- Tela em branco esperando pergunta

### 5.2 Elementos de Formulário

- Campos obrigatórios numerados ("Passo 1 de 5")
- Barras de progresso lineares fixas
- "Preencha seus dados para começar"
- Validação de campo com "Campo obrigatório"
- Dropdowns, radiobuttons, checkboxes como interface primária

### 5.3 Elementos de Dashboard Tradicional

- Tabelas genéricas sem interpretação
- Múltiplos KPIs simultâneos sem hierarquia
- Gráficos sem contexto narrativo
- Filtros, abas, menus dropdown como navegação principal
- "Relatório gerencial" como entregável principal

### 5.4 Comportamentos Proibidos

- **Alucinação:** A IA nunca inventa uma resposta. "Não sei" é obrigatório.
- **Uniformidade de tempo:** Todas as respostas no mesmo tempo parecem robóticas.
- **Inconsistência:** Contradizer-se sem corrigir explicitamente.
- **Repetição:** Dizer a mesma coisa da mesma forma mais de uma vez.
- **Interrupção:** A IA nunca interrompe o empresário digitando.
- **Pressa:** A IA nunca apressa o empresário ("Anda", "Vamos logo").
- **Falta de memória:** A IA nunca age como se não soubesse o que o empresário disse antes.
- **Falta de contexto:** A IA nunca responde como se fosse a primeira interação.

### 5.5 Frases Proibidas (Taxativas)

| Categoria | Frases proibidas |
|---|---|
| Abertura | "Olá! Como posso ajudá-lo hoje?", "Em que posso ser útil?", "Bem-vindo à Ponte Digital! Vamos começar?", "Oi! Sou a Ponte, sua assistente virtual!" |
| Confirmação | "Com certeza!", "Perfeito!", "Excelente pergunta!", "Você está absolutamente certo!" |
| Incerteza | "Não entendi. Pode reformular?", "Desculpe, não encontrei essa informação.", "Talvez... não tenho certeza.", "Vou precisar que você me explique melhor." |
| Transição | "Gostaria de fazer mais alguma pergunta?", "Há algo mais em que posso ajudar?", "Como posso ajudá-lo hoje?" |
| Encerramento | "Foi um prazer ajudá-lo!", "Espero ter ajudado!", "Volte sempre!", "Se precisar de algo, é só chamar!" |

### 5.6 Animações Proibidas

- Zoom de texto/número (valores animando de um para outro)
- Rotação 3D de qualquer elemento
- Flip (elemento virando de cabeça para baixo)
- Blink/piscar (qualquer elemento piscando)
- Stagger sem propósito hierárquico

### 5.7 Sons Proibidos

- Qualquer som que não seja insight, descoberta, conclusão ou novo padrão
- Notificação de sistema com som (e-mail, convite, alerta de plano)
- Som de erro (erro é visual, não sonoro)

---

## 6. O Teste de Integridade

### 6.1 Propósito

Verificar se uma funcionalidade, tela ou fluxo continua sendo a experiência Ponte Digital. Aplicar antes de qualquer release, em qualquer implementação.

### 6.2 As 12 Perguntas do Teste de Integridade

Cada pergunta vale 1 ponto. Pontuação mínima para certificação: 10/12.

| # | Pergunta | Sim | Não |
|---|---|---|---|
| 1 | **A inteligência é perceptível?** — O empresário vê evidências de que a IA está pensando, raciocinando e aprendendo? | +1 | - |
| 2 | **O diálogo é a interface principal?** — A conversa é central, não um complemento? | +1 | - |
| 3 | **Há respeito ao tempo?** — O empresário obtém valor nos primeiros 30 segundos sem configuração? | +1 | - |
| 4 | **A confiança é transparente?** — O empresário sabe o que a IA sabe, o que não sabe e com quanta confiança? | +1 | - |
| 5 | **Não parece chatbot?** — Zero elementos da lista de proibidos (seção 5.1)? | +1 | - |
| 6 | **Não parece formulário/dashboard?** — Zero elementos das listas 5.2 e 5.3? | +1 | - |
| 7 | **A conversa não é linear?** — A IA adapta, revisita, aprofunda, recua? | +1 | - |
| 8 | **A personalidade é de consultor sênior?** — Tom sóbrio, direto, respeitoso, sem intimidade? | +1 | - |
| 9 | **O painel cognitivo existe?** — O estado da IA é visível em tempo real? | +1 | - |
| 10 | **A IA corrige quando erra?** — Há mecanismo explícito de correção de hipótese? | +1 | - |
| 11 | **O "não sei" é inteligente?** — A IA admite desconhecimento sem parecer incompetente? | +1 | - |
| 12 | **A resposta é mais que informação?** — Entrega descoberta, não apenas dado? | +1 | - |

### 6.3 Teste de Integridade Negativo (Pontos de Corte)

Se QUALQUER item abaixo for verdadeiro, a certificação é reprovada automaticamente, independentemente da pontuação:

- A interface usa bolha de chat flutuante
- A primeira saudação é "Olá! Como posso ajudá-lo?"
- A IA responde perguntas complexas instantaneamente (<300ms sem indicador de pensamento)
- A IA nunca diz "não sei" (parece saber tudo)
- O empresário não consegue ver a confiança da IA em nenhuma afirmação
- Há spinner genérico substituindo o estado de pensamento narrativo
- O fluxo de perguntas é fixo e imutável

### 6.4 Teste de Integridade Continuado

A certificação não é um evento único. Toda evolução, sprint ou nova funcionalidade deve passar pelo teste antes de ser liberada. O teste é parte do pipeline de qualidade.

---

## 7. Limites da Certificação

### 7.1 O Que Está Dentro do Escopo de Certificação

- Telas da experiência principal (conversa, diagnóstico, insight, resumo)
- Painel cognitivo e seus indicadores
- Fluxo de onboarding e primeira impressão
- Microinterações e animações
- Tom de voz e personalidade da IA
- Mecanismos de confiança e transparência
- Sistema de gamificação cognitiva
- Toda comunicação textual da IA
- Loading inteligente e estados de espera
- Resposta a erros e correções

### 7.2 O Que Está Fora do Escopo de Certificação

- Telas administrativas (configurações de empresa, usuários, plano)
- Telas de integração (conexão com ERPs, importação de dados)
- Fluxos de pagamento e faturamento
- Telas de suporte e helpdesk
- E-mails transacionais e notificações push
- Landing pages e site institucional
- Elementos estritamente funcionais (dropdown de seleção de empresa, seletor de idioma)

### 7.3 Regra de Transição

Telas e fluxos fora do escopo de certificação **não podem se passar por experiência certificada**. Ou seja:
- Uma tela de configuração não pode usar o tom de voz da IA
- Uma tela de pagamento não pode ter indicadores de confiança cognitiva
- Um e-mail transacional não pode simular um insight da IA

A experiência certificada é a experiência principal. O resto é suporte.

---

## 8. Processo de Certificação

### 8.1 Quando Certificar

- **Toda nova funcionalidade** que afete a experiência do empresário (conversa, insight, painel)
- **Toda nova tela** dentro do escopo de certificação
- **Toda alteração** em elementos obrigatórios ou permanentes
- **Toda sprint** que toque componentes certificados
- **Antes de cada release** para produção

### 8.2 Quem Certifica

O processo de certificação tem três papéis:

| Papel | Responsabilidade | Quem exerce |
|---|---|---|
| **Autor** | Implementa a funcionalidade e faz autoavaliação inicial | Desenvolvedor/Designer |
| **Revisor** | Aplica o Teste de Integridade completo | Arquiteto de Experiência |
| **Certificador** | Homologa e emite o selo de certificação | Líder de Produto |

### 8.3 Etapas do Processo

#### Etapa 1: Autoavaliação (Autor)

1. Preencher o Teste de Integridade (seção 6.2)
2. Verificar a lista de elementos proibidos (seção 5)
3. Verificar a lista de elementos obrigatórios (seção 2)
4. Documentar divergências, se houver
5. Submeter para revisão

#### Etapa 2: Revisão (Revisor)

1. Repetir o Teste de Integridade independentemente
2. Verificar cada elemento obrigatório
3. Verificar cada elemento proibido (busca ativa por violações)
4. Verificar consistência com elementos permanentes
5. Testar cenários de borda (erro, lentidão, correção, "não sei")
6. Emitir parecer: **Aprovado**, **Aprovado com ressalvas**, ou **Reprovado**

#### Etapa 3: Homologação (Certificador)

1. Confirmar o parecer do revisor
2. Para "Aprovado com ressalvas": definir prazo para correção
3. Emitir o selo de certificação com nível (Ouro/Prata/Bronze)
4. Registrar no documento de certificação da release

### 8.4 Checklist de Verificação Pré-Release

Esta checklist é executada obrigatoriamente antes de toda release:

- [ ] Teste de Integridade (seção 6.2) ≥ 10/12
- [ ] Nenhum elemento proibido presente (seção 5)
- [ ] Todos os elementos obrigatórios presentes (seção 2)
- [ ] Nenhum elemento permanente violado (seção 3)
- [ ] As 12 perguntas do Teste de Integridade respondidas e documentadas
- [ ] Teste de Integridade Negativo (seção 6.3) não acusou nenhum item
- [ ] Fluxo de erro testado (timeout, falha de rede, "não sei")
- [ ] Fluxo de correção testado (empresário contradiz a IA)
- [ ] Tom de voz verificado contra o IDENTITY.md
- [ ] Painel cognitivo reflete o estado real da conversa
- [ ] Loading inteligente mapeia fases reais do Motor

---

## 9. Níveis de Certificação

Três níveis de certificação, aplicáveis conforme o contexto e a criticidade da funcionalidade.

### 9.1 Nível Ouro — Experiência Completa

**Critérios:**
- Teste de Integridade: 12/12
- Zero elementos proibidos
- Todos os elementos obrigatórios presentes com excelência
- Todos os elementos permanentes respeitados
- Fluxos de borda testados e aprovados
- Painel cognitivo completo e integrado
- Loading inteligente implementado com fases reais
- Mecanismo de correção de hipótese funcional

**Aplicável a:**
- Tela principal de conversa
- Fluxo de diagnóstico cognitivo
- Sistema de insights
- Painel cognitivo principal
- Onboarding e primeira experiência

**Selo:** ✦ OURO — Experiência Ponte Completa

### 9.2 Nível Prata — Experiência Essencial

**Critérios:**
- Teste de Integridade: 10-11/12
- Zero elementos proibidos
- Elementos obrigatórios presentes (pode ter 1 com implementação simplificada)
- Todos os elementos permanentes respeitados
- Fluxos de borda testados
- Painel cognitivo presente (pode ser versão simplificada)

**Aplicável a:**
- Funcionalidades secundárias dentro da conversa
- Novos tipos de insight
- Variações de fluxo de diagnóstico
- Componentes reutilizáveis da experiência

**Selo:** ✦ PRATA — Experiência Ponte Essencial

### 9.3 Nível Bronze — Experiência Compatível

**Critérios:**
- Teste de Integridade: 8-9/12
- Zero elementos proibidos
- Elementos obrigatórios essenciais presentes (conversa, inteligência perceptível, respeito ao tempo)
- Elementos permanentes respeitados
- Uso limitado (funcionalidade complementar)

**Aplicável a:**
- Widgets e componentes incorporados em telas operacionais
- Funcionalidades experimentais (feature flag)
- Versões mobile reduzidas
- Protótipos e MVPs

**Selo:** ✦ BRONZE — Experiência Ponte Compatível

### 9.4 Tabela Comparativa

| Critério | Ouro | Prata | Bronze |
|---|---|---|---|
| Teste de Integridade | 12/12 | 10-11/12 | 8-9/12 |
| Elementos proibidos | Zero | Zero | Zero |
| Elementos obrigatórios | Todos com excelência | Todos (1 simplificado) | Essenciais |
| Elementos permanentes | 100% | 100% | 100% |
| Painel cognitivo | Completo | Simplificado | Mínimo |
| Loading inteligente | Fases reais | Texto narrativo | Texto básico |
| Correção de hipótese | Funcional | Funcional | Resposta textual |
| Fluxo de "não sei" | Inteligente | Direto | Direto |

---

## 10. Revogação da Certificação

### 10.1 Motivos para Revogação

A certificação de uma funcionalidade, tela ou da plataforma como um todo pode ser revogada por:

| Gravidade | Motivo | Consequência |
|---|---|---|
| **Crítica** | Implementação de qualquer elemento proibido (seção 5) | Revogação imediata. Rollback obrigatório. |
| **Crítica** | Violação de elemento permanente (seção 3) | Revogação imediata. Correção obrigatória em <24h. |
| **Alta** | Ausência de elemento obrigatório (seção 2) | Revogação do nível. Prazo de 1 sprint para correção. |
| **Alta** | Teste de Integridade abaixo do mínimo do nível | Rebaixamento de nível. Prazo de 1 sprint para recuperação. |
| **Média** | Degradação da qualidade percebida (NPS <30 na funcionalidade) | Revisão obrigatória. Possível rebaixamento. |
| **Baixa** | Desalinhamento gradual com a identidade (acumulado) | Notificação. Prazo de 2 sprints para alinhamento. |

### 10.2 Processo de Revogação

1. **Detecção:** Identificação da violação (pode vir de QA, revisão, feedback de usuário, ou autoavaliação)
2. **Classificação:** Determinar gravidade (Crítica, Alta, Média, Baixa)
3. **Notificação:** Comunicar ao time responsável com evidências
4. **Prazo:** Definir prazo para correção conforme a gravidade
5. **Suspensão:** Durante o prazo, a funcionalidade opera sem selo de certificação
6. **Correção:** Implementar a correção e passar por nova certificação
7. **Restauração:** Se aprovado, o selo é restaurado com a data da recertificação

### 10.3 Revogação Automática (Sem Prazo)

Os seguintes eventos causam revogação automática e imediata, sem direito a prazo de correção:

- A IA alucina (inventa uma resposta) em produção
- A interface exibe elemento de chatbot (bolha, "Olá! Como posso ajudar?")
- Dados de um empresário são expostos a outro (violação de tenant)
- A IA mente sobre sua confiança (diz que tem certeza quando não tem)
- A IA mente sobre o que sabe (diz que sabe quando não sabe)

Nestes casos, a funcionalidade é imediatamente desabilitada até recertificação completa.

### 10.4 Apelação

O autor da funcionalidade pode apelar de uma revogação, desde que:
1. Apresente evidências de que a violação não existe ou foi mal classificada
2. Submeta para um comitê de 3 pessoas (um de produto, um de engenharia, um de design)
3. O comitê tem 48h para decidir
4. A decisão do comitê é final

### 10.5 Recertificação

Após correção, a funcionalidade passa por recertificação completa:
- Teste de Integridade completo
- Verificação de todos os elementos obrigatórios e permanentes
- Varredura de elementos proibidos
- Aprovação do certificador

A recertificação tem um nível abaixo da original pelos primeiros 30 dias (período de observação). Se mantiver a qualidade, o nível original é restaurado.

---

## Anexo A — Exemplos de Aplicação

### A.1 Funcionalidade Aprovada (Ouro)

**Funcionalidade:** Fluxo de insight de concentração de clientes

**Teste de Integridade:** 12/12

**Verificações:**
- Inteligência perceptível: IA mostra o raciocínio ("Notei que 3 clientes concentram 72% da receita...")
- Diálogo central: a descoberta é comunicada na conversa, não em um relatório
- Respeito ao tempo: insight aparece em <3s com loading narrativo
- Confiança transparente: badge verde com "Confiança: 87%"
- Zero elementos proibidos
- Personalidade de consultor sênior: "Seus clientes estão concentrados. Isso é arriscado."
- Painel cognitivo atualizado em tempo real

### A.2 Funcionalidade Reprovada

**Funcionalidade:** Tela de "Relatório de Vendas" com chat embutido

**Teste de Integridade:** 4/12

**Violações:**
- Tabela genérica sem interpretação (elemento proibido 5.3)
- Múltiplos KPIs simultâneos sem hierarquia
- Chat é secundário, a tabela é o centro
- IA não mostra confiança
- IA responde instantaneamente sem indicador de pensamento
- Painel cognitivo ausente

**Decisão:** Reprovado. Não é experiência Ponte.

### A.3 Funcionalidade Aprovada com Ressalvas (Prata)

**Funcionalidade:** Widget de recomendação rápida no dashboard

**Teste de Integridade:** 10/12

**Ressalvas:**
- Painel cognitivo é versão simplificada (apenas confiança, sem mapa)
- Loading é texto básico, não fases reais do motor

**Decisão:** Aprovado como Prata. Prazo de 1 sprint para evoluir o painel.

---

## Anexo B — Glossário da Certificação

| Termo | Definição |
|---|---|
| Experiência Ponte | Relação intelectual entre empresário e inteligência dedicada, baseada em diálogo investigativo, descoberta e respeito |
| Elementos obrigatórios | O que nunca pode faltar em nenhuma implementação |
| Elementos permanentes | O que nunca pode mudar — a identidade imutável |
| Elementos evoluíveis | O que pode mudar mantendo a essência |
| Elementos proibidos | O que nunca pode ser implementado |
| Teste de Integridade | Conjunto de 12 perguntas que verificam se a experiência é Ponte |
| Certificação | Selo que atesta que uma funcionalidade/tela atende aos padrões da experiência |
| Revogação | Remoção do selo por violação dos padrões |
| Nível Ouro | Certificação máxima — experiência completa |
| Nível Prata | Certificação intermediária — experiência essencial |
| Nível Bronze | Certificação mínima — experiência compatível |

---

## Anexo C — Histórico de Versões

| Versão | Data | Autor | Mudanças |
|---|---|---|---|
| 1.0 | 2025-08-01 | Arquiteto de Experiência | Versão inicial do sistema de certificação |

---

*Este documento é parte do Programa 23 — Arquitetura da Experiência Cognitiva.*
*Sua validade depende de aplicação consistente em toda implementação da Ponte Digital.*
