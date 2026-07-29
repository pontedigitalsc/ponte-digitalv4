# Backlog Científico — P25

## Propósito

Este não é um backlog técnico. É um backlog de CONHECIMENTO. Cada item representa algo que não sabemos e precisamos aprender. Resolver um item científico não significa implementar código — significa produzir conhecimento que aumente o patrimônio intelectual da Ponte Digital.

---

## Como usar este backlog

1. Prioridade científica (P0-P4) determina ordem de ataque
2. Conhecimentos com dependências devem ser resolvidos em ordem
3. Todo item resolvido produz um documento em `docs/08-KNOWLEDGE/`
4. Nada é "entregue" — tudo é "aprendido"

---

## Itens do Backlog Científico

### BC-001 — Constituição da Engenharia: documento ausente

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-001 |
| **Conhecimento produzido** | Saberemos se a Constituição da Engenharia realmente existe como conceito fundacional ou é apenas uma referência fantasmas. Saberemos o que a equipe atual considera como "constituição" |
| **Por que aumenta o patrimônio intelectual** | Sem documento basal, toda a governança não tem âncora. Resolver BC-001 desbloqueia a certificação da governança e estabelece a linha de base para decisões arquiteturais futuras |
| **Como fortalece o Motor Cognitivo** | Indiretamente — governança sólida permite decisões mais coerentes sobre a evolução do motor |
| **Tipo de conhecimento** | governança / processo |
| **Esforço de aprendizado** | Baixo — entrevistar equipe, verificar se o conceito existe em outro formato, decidir criar ou remover referências |
| **Dependência de conhecimento** | Nenhuma |
| **Prioridade científica** | P0 |

### BC-002 — Motor Cognitivo: documentação vs código divergem

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-002 |
| **Conhecimento produzido** | Saberemos o que cada uma das 58 engines realmente faz, quais são sobrepostas, quais estão obsoletas, e qual é a distância entre a especificação documentada e a realidade do código |
| **Por que aumenta o patrimônio intelectual** | Este é o gap de conhecimento mais caro do sistema. Enquanto documentação e código divergirem, nenhuma decisão arquitetural pode ser tomada com confiança |
| **Como fortalece o Motor Cognitivo** | Diretamente — mapear engines reais é pré-requisito para qualquer melhoria ou simplificação do motor |
| **Tipo de conhecimento** | arquitetura / domínio |
| **Esforço de aprendizado** | Alto — auditar 58 engines, documentar cada uma, mapear responsabilidades e dependências |
| **Dependência de conhecimento** | BC-001 (sem constituição, a auditoria pode perder critérios de avaliação) |
| **Prioridade científica** | P0 |

### BC-003 — Loading inteligente: implementação vs manifesto

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-003 |
| **Conhecimento produzido** | Saberemos se o Princípio 2 do Manifesto ("Toda espera é narrativa") realmente importa para o empresário. Saberemos se loading narrativo reduz ansiedade ou é indiferente |
| **Por que aumenta o patrimônio intelectual** | Valida (ou refuta) um princípio fundacional do Manifesto. Se o princípio for falso, todo o Manifesto precisa ser revisto |
| **Como fortalece o Motor Cognitivo** | Indiretamente — loading narrativo depende de fases do motor. Entender isso ajuda a mapear o pipeline real |
| **Tipo de conhecimento** | experiência / comportamento |
| **Esforço de aprendizado** | Médio — implementar protótipo de loading narrativo, testar com 10 empresários |
| **Dependência de conhecimento** | BC-002 (precisa saber as fases reais do motor para criar loading narrativo fiel) |
| **Prioridade científica** | P0 |

### BC-004 — Indicador de confiança ausente na interface

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-004 |
| **Conhecimento produzido** | Saberemos se empresários realmente olham para indicadores de confiança e se ajustam comportamento baseado neles. Saberemos se confiança visível aumenta engajamento |
| **Por que aumenta o patrimônio intelectual** | Confiança é um dos pilares da experiência. Saber se o indicador é notado e valorizado informa toda a estratégia de transparência da IA |
| **Como fortalece o Motor Cognitivo** | Indiretamente — o motor precisa calcular confiança para exibi-la. Isso força a criação de métricas de confiança por engine |
| **Tipo de conhecimento** | experiência / comportamento |
| **Esforço de aprendizado** | Médio — implementar protótipo do indicador (pode ser MVP simples), testar com eye tracking ou heatmap |
| **Dependência de conhecimento** | BC-002 (engine precisa calcular confiança; sem mapeamento das engines, não sabemos qual engine produz qual nível de confiança) |
| **Prioridade científica** | P0 |

### BC-005 — Motor Cognitivo sem perguntas para empresa de tecnologia

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-005 |
| **Conhecimento produzido** | Saberemos quais perguntas específicas para empresas de tecnologia/software são necessárias para capturar a realidade de uma SaaS. Saberemos como o modelo de domínio atual falha para tech |
| **Por que aumenta o patrimônio intelectual** | Sem isso, a Empresa Zero (a própria Ponte) não consegue se auto-diagnosticar. O conhecimento gerado aqui é aplicável a qualquer empresa de tecnologia que a Ponte atender |
| **Como fortalece o Motor Cognitivo** | Diretamente — expande o modelo de domínio do motor para cobrir um novo segmento |
| **Tipo de conhecimento** | domínio |
| **Esforço de aprendizado** | Alto — entrevistar equipes de tech, mapear dinâmicas de SaaS, criar e testar perguntas |
| **Dependência de conhecimento** | BC-002 (sem saber o estado real das engines, não sabemos onde adicionar as novas) |
| **Prioridade científica** | P0 |

### BC-006 — Continuidade entre sessões não implementada

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-006 |
| **Conhecimento produzido** | Saberemos qual é o modelo mínimo de continuidade que gera valor. Saberemos quanta informação de sessões anteriores precisa ser carregada para o empresário sentir "a IA me conhece" |
| **Por que aumenta o patrimônio intelectual** | Continuidade é o que diferencia uma ferramenta de uma relação intelectual. Sem acumulação de conhecimento, cada sessão começa do zero e o patrimônio cognitivo nunca cresce |
| **Como fortalece o Motor Cognitivo** | Diretamente — o motor precisa ler e escrever memória entre sessões. Isso é a base do patrimônio cognitivo |
| **Tipo de conhecimento** | arquitetura / experiência |
| **Esforço de aprendizado** | Alto — projetar modelo de continuidade, testar diferentes níveis de retenção de contexto |
| **Dependência de conhecimento** | BC-002, BC-005 (precisa do motor mapeado e do domínio expandido) |
| **Prioridade científica** | P0 |

### BC-007 — 4 WPs P0 do P23 não implementados

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-007 |
| **Conhecimento produzido** | Saberemos se a especificação original do P23 é viável e desejável, ou se precisa ser revisada antes de implementar. Saberemos qual WP gera mais valor por esforço |
| **Por que aumenta o patrimônio intelectual** | Os 4 WPs representam o core da especificação P23. Saber se eles fazem sentido ANTES de implementar evita meses de desenvolvimento desperdiçado |
| **Como fortalece o Motor Cognitivo** | Diretamente — os WPs dependem do motor. Implementá-los força o motor a operar em cenário real |
| **Tipo de conhecimento** | implementação / experiência |
| **Esforço de aprendizado** | Alto — revisar especificação, validar hipóteses associadas, priorizar WP mais promissor |
| **Dependência de conhecimento** | BC-002, BC-003, BC-004, BC-006 (os 4 WPs dependem das engrenagens básicas) |
| **Prioridade científica** | P0 |

### BC-008 — Camada de Services com cobertura de 7%

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-008 |
| **Conhecimento produzido** | Saberemos se a camada de services é realmente necessária na arquitetura atual ou se é um resquício de design que não se provou útil. Saberemos onde a lógica realmente reside e se isso é saudável |
| **Por que aumenta o patrimônio intelectual** | Entender a arquitetura real vs documentada é conhecimento fundacional. Decisões futuras dependem de sabermos onde a lógica está |
| **Como fortalece o Motor Cognitivo** | Indiretamente — a arquitetura do motor é afetada pela decisão de ter ou não services |
| **Tipo de conhecimento** | arquitetura |
| **Esforço de aprendizado** | Médio — mapear onde a lógica realmente está, entrevistar equipe sobre intenção original |
| **Dependência de conhecimento** | BC-002 (precisa do mapeamento completo do motor) |
| **Prioridade científica** | P1 |

### BC-009 — Telas com 52% de cobertura

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-009 |
| **Conhecimento produzido** | Saberemos quais telas são prioritárias na percepção do empresário. Saberemos se a baixa cobertura é porque as telas não são necessárias ou porque não foram implementadas |
| **Por que aumenta o patrimônio intelectual** | Diz o que empresários realmente veem vs o que especificamos que deveriam ver. Pode revelar que especificamos telas demais |
| **Como fortalece o Motor Cognitivo** | Não afeta diretamente |
| **Tipo de conhecimento** | experiência |
| **Esforço de aprendizado** | Médio — cruzar especificação vs implementação, priorizar com base em valor percebido |
| **Dependência de conhecimento** | BC-007 |
| **Prioridade científica** | P1 |

### BC-010 — 5 violações do Manifesto da Experiência

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-010 |
| **Conhecimento produzido** | Saberemos se as violações do Manifesto são acidentais (esquecemos de implementar) ou intencionais (o Manifesto não é seguível na prática). Saberemos quais princípios são realistas |
| **Por que aumenta o patrimônio intelectual** | O Manifesto é o DNA da experiência. Saber onde ele é violado e por que revela gaps entre visão e realidade |
| **Como fortalece o Motor Cognitivo** | Indiretamente — violações como loading genérico e confiança ausente dependem do motor |
| **Tipo de conhecimento** | experiência / processo |
| **Esforço de aprendizado** | Baixo — auditar cada violação, determinar causa raiz |
| **Dependência de conhecimento** | BC-003, BC-004 (duas violações são exatamente essas pendências) |
| **Prioridade científica** | P0 |

### BC-011 — Certificação da Experiência incompleta (6.5/10)

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-011 |
| **Conhecimento produzido** | Saberemos quais áreas da certificação são fracas e por que. Saberemos se a certificação atual é um instrumento útil ou burocracia |
| **Por que aumenta o patrimônio intelectual** | A certificação é o guardião da experiência. Se ela é incompleta, não confiamos no que estamos auditando |
| **Como fortalece o Motor Cognitivo** | Não afeta diretamente |
| **Tipo de conhecimento** | processo |
| **Esforço de aprendizado** | Médio — revisar cada regra, identificar lacunas, refinar |
| **Dependência de conhecimento** | BC-010 (entender violações ajuda a refinar certificação) |
| **Prioridade científica** | P1 |

### BC-012 — Mapa Cognitivo Vivo não implementado

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-012 |
| **Conhecimento produzido** | Saberemos se empresários realmente entendem e valorizam um mapa cognitivo em tempo real. Saberemos qual formato de mapa (grafos, áreas, porcentagens) é mais compreensível |
| **Por que aumenta o patrimônio intelectual** | O mapa é o principal diferencial visual da experiência. Saber se ele funciona é crítico para a identidade do produto |
| **Como fortalece o Motor Cognitivo** | Diretamente — o mapa expõe o estado interno do motor em tempo real |
| **Tipo de conhecimento** | experiência / comportamento |
| **Esforço de aprendizado** | Alto — protótipo de mapa com dados estáticos, teste com 10 empresários, iteração |
| **Dependência de conhecimento** | BC-002, BC-004 (precisa do motor mapeado e da confiança calculada) |
| **Prioridade científica** | P0 |

### BC-013 — Microinterações não implementadas

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-013 |
| **Conhecimento produzido** | Saberemos quais microinterações (entre centenas) geram mais impacto percebido. Saberemos se a ausência delas é notada pelo empresário |
| **Por que aumenta o patrimônio intelectual** | Microinterações são o que diferencia uma experiência genérica de uma inteligência viva. Saber quais valem o esforço é economia de desenvolvimento |
| **Como fortalece o Motor Cognitivo** | Não afeta diretamente |
| **Tipo de conhecimento** | experiência |
| **Esforço de aprendizado** | Alto — catalogar, priorizar, testar top 10 microinterações |
| **Dependência de conhecimento** | BC-003 (loading é uma microinteração prioritária) |
| **Prioridade científica** | P2 |

### BC-014 — Gamificação cognitiva ausente

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-014 |
| **Conhecimento produzido** | Saberemos se gamificação cognitiva (indicadores de Nível de Conhecimento, Índice de Clareza) é desejada ou rejeitada por empresários. Saberemos se contradiz o Manifesto na prática |
| **Por que aumenta o patrimônio intelectual** | Há contradição documental sobre gamificação. Resolver isso é aprender se a gamificação cabe na identidade da Ponte |
| **Como fortalece o Motor Cognitivo** | Indiretamente — métricas de gamificação dependeriam do motor |
| **Tipo de conhecimento** | experiência / processo |
| **Esforço de aprendizado** | Médio — testar indicador simples com 10 empresários, resolver contradição documental |
| **Dependência de conhecimento** | BC-004 (indicador de confiança é pré-requisito para gamificação) |
| **Prioridade científica** | P2 |

### BC-015 — Experiência sensorial não implementada

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-015 |
| **Conhecimento produzido** | Saberemos se sons, vibração e timing de transições são percebidos e valorizados por empresários, ou se são indiferentes |
| **Por que aumenta o patrimônio intelectual** | Experiência sensorial completa é visão de longo prazo. Saber se faz diferença agora informa se devemos investir |
| **Como fortalece o Motor Cognitivo** | Não afeta |
| **Tipo de conhecimento** | experiência |
| **Esforço de aprendizado** | Médio — protótipo de som sutil, testar com 10 empresários |
| **Dependência de conhecimento** | BC-013 (microinterações base primeiro) |
| **Prioridade científica** | P3 |

### BC-016 — 61.5% do conhecimento é ACREDITAMOS

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-016 |
| **Conhecimento produzido** | A validação de cada hipótese (H-001 a H-022) produzirá conhecimento. BC-016 é o meta-conhecimento: saberemos, ao final do P25, qual percentual do conhecimento fundacional é validado |
| **Por que aumenta o patrimônio intelectual** | Esta é a métrica mestra da saúde epistemológica da Ponte. Reduzir de 61.5% para < 30% é o objetivo do P25 |
| **Como fortalece o Motor Cognitivo** | Diretamente — hipóteses validadas viram regras no motor |
| **Tipo de conhecimento** | epistemologia (meta) |
| **Esforço de aprendizado** | Alto (é o programa inteiro de validação) |
| **Dependência de conhecimento** | Todas as hipóteses (H-001 a H-022) |
| **Prioridade científica** | P0 |

### BC-017 — 8.3% do conhecimento é NÃO SABEMOS

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-017 |
| **Conhecimento produzido** | Para cada afirmação "NÃO SABEMOS", saberemos se vira hipótese formal (ACREDITAMOS) ou é removida por falta de fundamento |
| **Por que aumenta o patrimônio intelectual** | Suposições sem base são risco puro. Transformá-las em hipóteses ou removê-las limpa o conhecimento fundacional |
| **Como fortalece o Motor Cognitivo** | Indiretamente — limpeza epistemológica reduz ruído nas decisões de produto |
| **Tipo de conhecimento** | epistemologia |
| **Esforço de aprendizado** | Baixo — revisar 8 afirmações, decidir destino de cada |
| **Dependência de conhecimento** | BC-016 (as afirmações NÃO SABEMOS estão misturadas com as ACREDITAMOS) |
| **Prioridade científica** | P1 |

### BC-018 — 9 ADRs aceitas não implementadas

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-018 |
| **Conhecimento produzido** | Saberemos se as ADRs foram rejeitadas na prática por boas razões (aprendizado posterior) ou se foram simplesmente ignoradas. Saberemos se o processo de ADR está gerando decisões executáveis |
| **Por que aumenta o patrimônio intelectual** | ADRs são o registro de decisões arquiteturais. Se decisões aprovadas não são implementadas, o processo de ADR perde credibilidade |
| **Como fortalece o Motor Cognitivo** | Indiretamente — ADRs não implementadas podem afetar a evolução do motor |
| **Tipo de conhecimento** | governança / arquitetura |
| **Esforço de aprendizado** | Médio — revisar cada ADR, entrevistar por que não foi implementada, decidir implementar ou reverter |
| **Dependência de conhecimento** | BC-002 (precisa do estado real do motor para avaliar ADRs) |
| **Prioridade científica** | P1 |

### BC-019 — Documentos sem owner definido

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-019 |
| **Conhecimento produzido** | Saberemos quem são os responsáveis naturais por cada documento. Saberemos se a falta de owner causa documentos obsoletos |
| **Por que aumenta o patrimônio intelectual** | Documentação sem dono é conhecimento não mantido. Atribuir donos é criar responsabilidade pela verdade documental |
| **Como fortalece o Motor Cognitivo** | Não afeta |
| **Tipo de conhecimento** | processo |
| **Esforço de aprendizado** | Baixo — mapear autores e responsáveis |
| **Dependência de conhecimento** | Nenhuma |
| **Prioridade científica** | P2 |

### BC-020 — Governança aprovada em 5.8/10

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-020 |
| **Conhecimento produzido** | Saberemos quais áreas da governança são frágeis e por que. Saberemos se a nota baixa é por falta de documentação ou por desalinhamento real |
| **Por que aumenta o patrimônio intelectual** | Governança frágil produz decisões inconsistentes. Fortalecê-la é garantir que decisões futuras sigam a visão |
| **Como fortalece o Motor Cognitivo** | Indiretamente — governança define como decisões sobre o motor são tomadas |
| **Tipo de conhecimento** | processo / governança |
| **Esforço de aprendizado** | Médio — auditar cada pilar da governança, comparar com visão fundacional |
| **Dependência de conhecimento** | BC-001, BC-018 (governança depende de constituição e ADRs implementadas) |
| **Prioridade científica** | P1 |

### BC-021 — Checklist de experiência com 50.5% de cobertura

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-021 |
| **Conhecimento produzido** | Saberemos quais dos ~200 itens da experiência são realmente importantes vs burocracia. Saberemos se a cobertura baixa é porque especificamos demais |
| **Por que aumenta o patrimônio intelectual** | Um checklist que cobre metade do especificado ou é incompetência de implementação ou é excesso de especificação. Saber qual é |
| **Como fortalece o Motor Cognitivo** | Não afeta |
| **Tipo de conhecimento** | processo / experiência |
| **Esforço de aprendizado** | Alto — revisar 200 itens, classificar por importância real, priorizar |
| **Dependência de conhecimento** | BC-007 (itens do checklist são os WPs) |
| **Prioridade científica** | P1 |

### BC-022 — 8 regras não testáveis na certificação

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-022 |
| **Conhecimento produzido** | Saberemos quais regras são intrinsecamente qualitativas (e devem permanecer como heurísticas) e quais podem ser transformadas em teste objetivo |
| **Por que aumenta o patrimônio intelectual** | Regras não testáveis são crenças, não padrões. Clarear isso fortalece a certificação |
| **Como fortalece o Motor Cognitivo** | Não afeta |
| **Tipo de conhecimento** | processo |
| **Esforço de aprendizado** | Baixo — revisar 8 regras, propor versão testável ou aceitar como heurística |
| **Dependência de conhecimento** | BC-011 |
| **Prioridade científica** | P2 |

### BC-023 — 5 engines sobrepostas sem dono

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-023 |
| **Conhecimento produzido** | Saberemos qual engine de cada par sobreposto deve ser mantida e qual deve ser consolidada. Saberemos se a sobreposição é acidental ou intencional (redundância para resiliência) |
| **Por que aumenta o patrimônio intelectual** | Engines sobrepostas produzem resultados inconsistentes e consomem processamento desnecessário. Consolidar é limpeza arquitetural |
| **Como fortalece o Motor Cognitivo** | Diretamente — reduz sobrecarga e inconsistência no motor |
| **Tipo de conhecimento** | arquitetura |
| **Esforço de aprendizado** | Médio — auditar 5 pares de engines, decidir consolidação |
| **Dependência de conhecimento** | BC-002 (precisa do mapeamento completo) |
| **Prioridade científica** | P2 |

### BC-024 — Implementação da experiência sem rastro

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-024 |
| **Conhecimento produzido** | Saberemos quantos documentos P23 realmente geraram implementação. Saberemos se o esforço de especificação foi produtivo ou perdido |
| **Por que aumenta o patrimônio intelectual** | Especificar e não implementar é conhecimento teórico sem validação prática. Saber a taxa de conversão especificação → implementação informa se o processo de design está funcionando |
| **Como fortalece o Motor Cognitivo** | Indiretamente — especificações não implementadas podem conter requisitos válidos para o motor |
| **Tipo de conhecimento** | processo |
| **Esforço de aprendizado** | Médio — cruzar cada documento P23 com implementação real |
| **Dependência de conhecimento** | BC-007 |
| **Prioridade científica** | P1 |

### BC-025 — Nomenclatura divergente entre documentos

| Campo | Valor |
|---|---|
| **Pendência original** | PEND-025 |
| **Conhecimento produzido** | Saberemos quantos termos duplicados existem e qual versão deve ser adotada como padrão. Saberemos se a divergência causa confusão real em quem lê os documentos |
| **Por que aumenta o patrimônio intelectual** | Terminologia unificada é a base da comunicação clara. Sem ela, time e documentos se contradizem sem perceber |
| **Como fortalece o Motor Cognitivo** | Indiretamente — nomenclatura confusa no código (engines com nomes divergentes) reflete a confusão documental |
| **Tipo de conhecimento** | terminologia |
| **Esforço de aprendizado** | Baixo — cruzar termos do Catálogo com documentos originais, corrigir divergências |
| **Dependência de conhecimento** | BC-002 (nomenclatura das engines pode conter divergências) |
| **Prioridade científica** | P2 |

---

## Árvore de Conhecimento

Abaixo, o mapa visual de como os conhecimentos se conectam. Nós = conhecimento a ser produzido. Setas = dependência.

```
BC-001 (Constituição)
    │
    ▼
BC-002 (Motor Cognitivo real) ◄── BC-025 (Nomenclatura)
    │
    ├────────────────────────────────────┐
    ▼                                    ▼
BC-003 (Loading) ──┐               BC-005 (Domínio Tech)
BC-004 (Confiança) ─┤               BC-008 (Services)
BC-012 (Mapa Vivo) ─┼──► BC-007    BC-023 (Engines sobrepostas)
BC-006 (Continuidade) ┘    (4 WPs)  BC-018 (ADRs)
    │                         │
    ▼                         ▼
BC-010 (Violações        BC-009 (Telas)
  Manifesto)             BC-021 (Checklist)
    │                    BC-024 (Rastro)
    ▼
BC-011 (Certificação
  Experiência)
    │
    ├──► BC-022 (Regras não testáveis)
    │
    ▼
BC-013 (Microinterações)
    │
    ▼
BC-015 (Experiência Sensorial)

BC-014 (Gamificação) ──► BC-004 (Confiança)

BC-016 (61.5% ACREDITAMOS) ◄── H-001 a H-022
    │
    ▼
BC-017 (8.3% NÃO SABEMOS)

BC-019 (Documentos sem owner)
BC-020 (Governança 5.8/10) ──► BC-001, BC-018
```

### Caminhos Críticos de Aprendizado

**Caminho 1 — Fundação Arquitetural (P0/P1):**
BC-001 → BC-002 → BC-005 → BC-006 → BC-007 → BC-012
*Conhecimento necessário para desbloquear a Empresa Zero*

**Caminho 2 — Validação da Experiência (P0):**
BC-003 → BC-004 → BC-010 → BC-011 → BC-013
*Conhecimento necessário para saber se a experiência funciona*

**Caminho 3 — Epistemologia (P0/P1):**
BC-016 → BC-017 → (todas as hipóteses H-001 a H-022)
*Conhecimento meta: validar a base de conhecimento da empresa*

### Matriz de Dependências

| Item | Depende de | Desbloqueia |
|---|---|---|
| BC-002 | BC-001 | BC-003, BC-004, BC-005, BC-006, BC-008, BC-012, BC-018, BC-023, BC-025 |
| BC-003 | BC-002 | BC-010 |
| BC-004 | BC-002 | BC-010, BC-012, BC-014 |
| BC-005 | BC-002 | BC-006 |
| BC-006 | BC-002, BC-005 | BC-007 |
| BC-007 | BC-002, BC-003, BC-004, BC-006 | BC-009, BC-021, BC-024 |
| BC-010 | BC-003, BC-004 | BC-011 |
| BC-011 | BC-010 | BC-022 |
| BC-012 | BC-002, BC-004 | — |
| BC-013 | BC-003 | BC-015 |
| BC-016 | Todas as hipóteses | BC-017 |
| BC-018 | BC-002 | BC-020 |
| BC-020 | BC-001, BC-018 | — |
| BC-021 | BC-007 | — |
| BC-023 | BC-002 | — |
| BC-024 | BC-007 | — |
| BC-025 | BC-002 | — |

---

## Resumo do Backlog Científico

| Métrica | Valor |
|---|---|
| Total de itens | 25 |
| P0 — Crítico | 8 (BC-001 a BC-007, BC-010, BC-012, BC-016) |
| P1 — Alto | 8 (BC-008, BC-009, BC-011, BC-017, BC-018, BC-020, BC-021, BC-024) |
| P2 — Médio | 6 (BC-013, BC-014, BC-019, BC-022, BC-023, BC-025) |
| P3 — Baixo | 1 (BC-015) |
| Conhecimento de arquitetura | 5 (BC-002, BC-008, BC-012, BC-018, BC-023) |
| Conhecimento de experiência | 9 (BC-003, BC-004, BC-009, BC-010, BC-012, BC-013, BC-014, BC-015, BC-021) |
| Conhecimento de processo/governança | 6 (BC-001, BC-011, BC-019, BC-020, BC-022, BC-024) |
| Conhecimento de domínio | 2 (BC-005, BC-025) |
| Conhecimento epistemológico | 2 (BC-016, BC-017) |
| Fortalece o Motor Cognitivo diretamente | 6 (BC-002, BC-005, BC-006, BC-007, BC-012, BC-023) |

---

*Este documento é parte do Programa 25 — Validação Científica.*
*Não é backlog de código. É backlog de conhecimento. Cada item resolvido: um documento em docs/08-KNOWLEDGE/.*
