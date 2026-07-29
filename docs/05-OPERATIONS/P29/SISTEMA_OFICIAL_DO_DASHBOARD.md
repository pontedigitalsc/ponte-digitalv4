# Sistema Oficial do Dashboard

> *"O empresário não abre o dashboard para ver gráficos bonitos. Ele abre para saber: 'Minha empresa está melhor ou pior do que ontem?' O dashboard responde essa pergunta nos primeiros 3 segundos, ou falhou."*

---

## 1. Princípio Fundamental

> **"O dashboard da Ponte Digital não é um painel de controle — é um espelho cognitivo. O empresário se vê nele: suas descobertas, suas decisões, seu progresso. O que ele vê primeiro é o que mais importa para ele naquele momento."**

### 1.1 Derivadas do Princípio

1. **O business owner não é um analista de dados.** Ele não quer dashboards cheios de números. Ele quer respostas.
2. **Cada visita ao dashboard tem um propósito.** O propósito muda. O dashboard se adapta.
3. **O ontem importa mais que o hoje.** O dashboard responde: "O que mudou?" antes de responder "Qual é o estado?"
4. **Insight > Dado.** Um insight vale mais que 10 gráficos. O dashboard prioriza o que foi descoberto, não o que foi medido.
5. **O dashboard nunca é o ponto de partida.** A conversa é. O dashboard é o "lar" — onde o empresário volta para ver o estado geral.

---

## 2. O Olhar do Empresário

### 2.1 Os Primeiros 3 Segundos

**O que o empresário vê:**

| Ordem | Elemento | % de atenção | Técnica visual |
|---|---|---|---|
| 1º | Saudação personalizada | 10% | Topo da página, tipografia H2 (1.5rem), tom pessoal. "Bom dia, Carlos." |
| 2º | Insight principal em destaque | 50% | Card grande (8/12), cor de destaque (Roxo Insight), tipografia H3 + body, badge "Novo" se aplicável |
| 3º | Resumo do diagnóstico | 30% | 3-5 bullets abaixo do insight principal. Body (1rem), check icons verdes. |
| 4º | Mapa cognitivo (miniatura) | 10% | Canto superior direito ou abaixo do resumo. Radar pequeno (200x200px) |

**Hierarquia visual nos primeiros 3 segundos:**
- Insight principal: 50% da atenção
- Resumo do diagnóstico: 30% da atenção
- Saudação + Mapa: 20% da atenção

**O que NÃO aparece nos primeiros 3 segundos:**
- Gráficos detalhados (chegam depois)
- Listas de histórico (chegam depois)
- Indicadores secundários (chegam depois)
- Configurações (apenas ícone acessível)
- Navegação complexa (apenas sidebar contraída)

**Regra dos 3 segundos:** Alguém que nunca viu a Ponte Digital deve ser capaz de identificar o insight principal em 3 segundos. Se hesitar, o layout falhou.

### 2.2 Dos 3 aos 10 Segundos

**O olho se move para:**

| Ordem | Elemento | Como o olho chega lá |
|---|---|---|
| 1º | Mapa cognitivo | Do insight principal, olho sobe ou desloca para a direita. Visão geral das áreas de conhecimento. |
| 2º | Últimas descobertas | Abaixo do insight principal. Lista compacta de 2-3 descobertas recentes. |
| 3º | Ações recomendadas | Sidebar direita (4/12). Cards menores com próxima ação. |

**Comportamento do olhar:**
- Movimento natural: de cima (mais importante) para baixo (menos importante)
- O olho faz um "F": linha superior (insight) → linha média (mapa + descobertas) → linha inferior (ações)
- O olho nunca precisa voltar ao topo para entender o fluxo

### 2.3 Dos 10 aos 30 Segundos

**Exploração:**

| Ordem | Elemento | Comportamento |
|---|---|---|
| 1º | Indicadores por área | Barras de conhecimento. O empresário vê "como estou em cada área?" |
| 2º | Ações recomendadas detalhadas | Cards expandidos com descrição + impacto |
| 3º | Histórico de insights | Lista vertical dos últimos insights (máximo 5) |

**Apenas sob demanda (clique ou scroll intencional):**
- Histórico completo (sheet ou modal)
- Configurações do dashboard
- Exportação de dados
- Comparação com períodos anteriores

### 2.4 Mapa de Calor do Olhar

```
 ┌─────────────────────────────────────────────────────┐
 │  ┌────────────────────────────────┐ ┌──────────────┐│
 │  │  3s: SAUDAÇÃO + INSIGHT       │ │ 10s: AÇÕES   ││
 │  │  (50% de atenção)             │ │ (20%)        ││
 │  │                                │ │              ││
 │  │  ┌────────────────────────┐   │ │  Card 1      ││
 │  │  │ RESUMO (30%)           │   │ │  Card 2      ││
 │  │  │ • bullet               │   │ │              ││
 │  │  │ • bullet               │   │ └──────────────┘│
 │  │  │ • bullet               │   │                  │
 │  │  └────────────────────────┘   │                  │
 │  │                                │                  │
 │  │  ┌────────────────────────┐   │                  │
 │  │  │ 10s: MAPA + ÚLTIMAS    │   │                  │
 │  │  │ DESCOBERTAS (25%)      │   │                  │
 │  │  └────────────────────────┘   │                  │
 │  │                                │                  │
 │  └────────────────────────────────┘                  │
 │                                                       │
 │  ┌─────────────────────────────────────────────────┐ │
 │  │ 30s: INDICADORES + HISTÓRICO + PRÓXIMOS PASSOS  │ │
 │  │ (15%)                                           │ │
 │  └─────────────────────────────────────────────────┘ │
 └─────────────────────────────────────────────────────┘
```

---

## 3. Hierarquia de Conteúdo

### 3.1 O Que Aparece Primeiro (Ordem Absoluta)

| # | Elemento | Tipo | Obrigatório? | Tamanho/Espaço |
|---|---|---|---|---|
| 1 | Saudação personalizada | Texto | Sim | H2, 1 linha |
| 2 | Insight principal em destaque | Card | Sim | 8/12 de largura, min 200px altura |
| 3 | Resumo do diagnóstico (3-5 bullets) | Lista vertical | Sim | Abaixo do insight, body |
| 4 | Mapa cognitivo | Radar gráfico | Sim | 4/12 de largura (se ao lado), ou abaixo |
| 5 | Últimas descobertas (2-3 itens) | Lista compacta | Sim | Cards pequenos (2/12 cada) |
| 6 | Ações recomendadas | Cards | Sim | Sidebar (4/12) ou abaixo |
| 7 | Indicadores por área | Barras de conhecimento | Sim | Seção completa, 12/12 |
| 8 | Histórico de insights (últimos 3) | Lista vertical | Não (se vazio) | 12/12, compacto |
| 9 | Próximos passos | Botões / CTAs | Sim (se houver) | Final do dashboard |
| 10 | Footer / rodapé informativo | Texto | Opcional | "Última atualização: xx min atrás" |

### 3.2 Tamanhos e Prioridades dos Cards no Dashboard

| Card | Largura (desktop) | Altura | Cor de ênfase | Prioridade |
|---|---|---|---|---|
| Insight principal | 8/12 | 240-320px | Roxo Insight (borda ou fundo sutil) | Máxima |
| Resumo do diagnóstico | 8/12 | 120-160px | Nenhuma (neutro) | Alta |
| Mapa cognitivo | 4/12 (ou 8/12 isolado) | 240-320px | Azul Tranquilo | Alta |
| Últimas descobertas | 4/12 cada (2 por linha) | 160px | Nenhuma (neutro, hover sutil) | Média |
| Ação recomendada | 4/12 (sidebar) ou 6/12 (abaixo) | 180px | Azul Tranquilo (borda sutil) | Média |
| Indicador por área | 12/12 (com barras internas) | 200px + 40px por área | Cor da área | Média |
| Histórico de insights | 12/12 | Altura do conteúdo | Nenhuma | Baixa |
| Próximos passos | 12/12 | Altura dos botões | Primário (botão) | Variável |

### 3.3 Consolidação em Mobile

| Elemento | Comportamento em mobile |
|---|---|
| Saudação | Reduzida para "Olá, [nome]" (H3) |
| Insight principal | 100% largura, altura reduzida (200px) |
| Resumo | 100%, 3 bullets (max) |
| Mapa cognitivo | Abaixo do resumo, 100% largura, 200x200px |
| Últimas descobertas | 1 por linha, 100% largura |
| Ações recomendadas | Abaixo das descobertas, 1 por linha |
| Indicadores | 100% largura, nomes das áreas à esquerda |
| Histórico | Últimos 2 insights apenas |
| Sidebar | Inexistente (conteúdo incorporado ao fluxo vertical) |

---

## 4. Variações de Estado

### 4.1 Primeiro Login ("Bem-vindo!")

| Propriedade | Valor |
|---|---|
| Saudação | "Bem-vindo à Ponte Digital, [nome]!" |
| Insight principal | Não há. Substituído por: "Vamos começar seu diagnóstico" |
| Conteúdo principal | Card de boas-vindas + CTA "Iniciar diagnóstico" |
| Mapa cognitivo | Vazio (todos os eixos em 0%) com label "Ainda não há dados" |
| Ações | Uma única: "Começar diagnóstico" (botão primário) |
| Indicadores | Todos vazios, com placeholder "Diagnóstico pendente" |

**Comportamento visual:**
- Empty state amigável, não assustador
- Ilustração sutil (opcional) + texto acolhedor
- Nenhum dado falso ou placeholder
- "Isso aqui vai te ajudar a entender sua empresa"
- Botão proeminente, sem distrações
- Navegação visível mas recuada

**Estrutura do primeiro login:**

```
 ┌────────────────────────────────────────────────┐
 │  ┌────────────────────────────────────────┐    │
 │  │  🏠  "Bem-vindo, [nome]!"              │    │
 │  └────────────────────────────────────────┘    │
 │                                                 │
 │  ┌────────────────────────────────────────┐    │
 │  │                                        │    │
 │  │   SUA JORNADA COMEÇA AQUI             │    │
 │  │                                        │    │
 │  │   "Vamos mapear sua empresa para       │    │
 │  │    descobrir padrões e oportunidades   │    │
 │  │    que estão escondidos nos seus       │    │
 │  │    dados."                             │    │
 │  │                                        │    │
 │  │   ┌────────────────────────────┐       │    │
 │  │   │  INICIAR DIAGNÓSTICO      │       │    │
 │  │   └────────────────────────────┘       │    │
 │  │                                        │    │
 │  └────────────────────────────────────────┘    │
 │                                                 │
 │  ┌────────────────────┐ ┌────────────────────┐  │
 │  │  Mapa Cognitivo    │ │  Indicadores       │  │
 │  │  (vazio)           │ │  (placeholder)     │  │
 │  └────────────────────┘ └────────────────────┘  │
 └────────────────────────────────────────────────┘
```

### 4.2 Diagnóstico Concluído

| Propriedade | Valor |
|---|---|
| Saudação | "Bom dia, [nome]. Seu diagnóstico está completo!" |
| Insight principal | O insight mais relevante encontrado |
| Resumo | 5 bullets com os principais achados |
| Mapa cognitivo | Preenchido com os dados do diagnóstico |
| Ações | Recomendações baseadas nos insights |
| Indicadores | Nível de conhecimento por área |

**Transição do primeiro login para diagnóstico concluído:**
1. Empresário clica "Iniciar diagnóstico"
2. Diagnóstico roda (loading inteligente com progresso)
3. Ao concluir: tela faz fade (200ms) → novo dashboard aparece com fade in (400ms)
4. Card de insight principal tem animação de destaque (pulse sutil por 2s)
5. "Seu primeiro insight está pronto!" (toast informativo, 4s)
6. Mapa cognitivo preenche com animação (600ms)

### 4.3 Retorno Comum ("Desde sua última visita")

| Propriedade | Valor |
|---|---|
| Saudação | "Bom dia, [nome]. Desde sua última visita..." |
| Destaque | O que mudou desde a última visita |
| Insight principal | Insight mais recente (se houver novo) |
| Badge | "Novo" no card se for insight não visto |
| Resumo | "Desde [data]: 2 novos insights, 1 recomendação" |
| Mapa cognitivo | Comparação (antes/depois) sutil |

**Regras do "Desde sua última visita":**
- A saudação muda conforme o período do dia (Bom dia, Boa tarde, Boa noite)
- A data ("Desde sua última visita") é calculada automaticamente
- Se a última visita foi hoje: "Você passou por aqui hoje cedo"
- Se a última visita foi ontem: "Desde ontem"
- Se a última visita foi há mais de 7 dias: "Desde [dia da semana], [data]"
- Se a última visita foi há mais de 30 dias: "Bem-vindo de volta! Aqui está o que aconteceu"

**Elemento "O que mudou":**
- Card ou linha destacada entre a saudação e o insight principal
- "2 novos insights | 1 recomendação atualizada | Nenhum alerta"
- Cores: verde para positivo, âmbar para atenção, neutro para informativo
- Se não houve mudança: omitir este elemento

### 4.4 Retorno sem Novidades

| Propriedade | Valor |
|---|---|
| Saudação | "Bom dia, [nome]. Tudo está como na sua última visita." |
| Insight principal | O insight de maior relevância (já visto) |
| Badge | Nenhum (já foi visto) |
| Resumo | "Nenhuma mudança desde [data]. Seus indicadores estão estáveis." |
| Ações | "Quer explorar um novo ângulo?" ou "Conversar com a IA?" |

**Comportamento:**
- Dashboard parece o mesmo, mas sem elementos "Novo"
- A saudação reconhece a estabilidade: "Tudo certo por aqui"
- Sugestão de ação: "Que tal explorar um tema diferente hoje?"
- Não forçar mudança onde não existe — estabilidade também é informação

### 4.5 Retorno com Insights Novos

| Propriedade | Valor |
|---|---|
| Saudação | "Bom dia, [nome]. Temos novidades!" |
| Insight principal | Insight novo, com badge "Novo" |
| Destaque adicional | Badges "Novo" nos cards de descoberta |
| Mapa cognitivo | Atualizado (se houver mudança), com indicador de mudança |
| Ações | Atualizadas com base nos novos insights |

**Comportamento visual:**
- Badge "Novo" animado (pulse sutil por 3s)
- Card de insight novo tem cor de destaque mais vibrante por 5 segundos, depois normaliza
- Toast: "Novo insight disponível!" (se o empresário não iniciou a sessão vendo o dashboard)
- Lista de descobertas: os novos itens aparecem no topo com indicador "Novo"
- Mapa cognitivo: áreas com mudança têm glow sutil (300ms pulse)

### 4.6 Ações Pendentes

| Propriedade | Valor |
|---|---|
| Posição | Entre ações recomendadas e indicadores |
| Card | Cartão de lembrete (borda âmbar ou vermelho, conforme urgência) |
| Conteúdo | "Você tem [N] ações pendentes" + lista das ações |
| Badge | "Pendente" em cada ação |
| CTA | "Revisar ações" (navega para lista de ações) |

**Comportamento:**
- Ações pendentes aparecem com badge "Pendente" (chip âmbar)
- Card de lembrete tem cor de alerta sutil
- Se a ação está atrasada (mais de 7 dias): borda vermelha, badge "Atrasada"
- Se não há ações pendentes: o card não aparece

---

## 5. Seções do Dashboard

### 5.1 Saudação Personalizada

**Formato:**
```
"Bom dia, Carlos."
"Seu diagnóstico está completo — aqui estão suas descobertas."
```

**Variações por período do dia:**
| Período | Saudação |
|---|---|
| 05:00 - 12:00 | Bom dia |
| 12:00 - 18:00 | Boa tarde |
| 18:00 - 05:00 | Boa noite |

**Regras:**
- O nome é o primeiro nome do empresário (nunca nome completo)
- A saudação nunca contém emojis
- Abaixo da saudação, uma frase de contexto (muda conforme o estado)
- A frase de contexto tem no máximo 80 caracteres, body (1rem), cor neutra
- A saudação nunca desaparece — é a âncora do dashboard

**Frases de contexto por estado:**

| Estado | Frase |
|---|---|
| Primeiro login | "Vamos começar a mapear sua empresa." |
| Diagnóstico concluído | "Seu diagnóstico está completo — aqui estão suas descobertas." |
| Retorno sem novidades | "Tudo está como na sua última visita." |
| Retorno com novidades | "Temos novos insights para você." |
| Ações pendentes | "Você tem ações pendentes para revisar." |
| Processando | "Estamos analisando novos dados." |

### 5.2 Insight Principal

**Estrutura do card:**

```
┌────────────────────────────────────────────────┐
│  [ÍCONE]  [ÁREA]                 [Badge: Novo]  │
│                                        [Há: 2h] │
│  TÍTULO DO INSIGHT                             │
│  (H3, 1.25rem, semi-bold)                      │
│                                                 │
│  Descrição do insight em 2-3 frases.           │
│  O que foi descoberto, por que importa.        │
│  (Body, 1rem, cor neutra)                       │
│                                                 │
│  ┌────────────────────────────────────────┐     │
│  │  ●  Confiança: 82%    ●  Impacto: Alto │     │
│  └────────────────────────────────────────┘     │
│                                                 │
│  ──────────────────────────────────────────     │
│  [Tag: Finanças] [Tag: Tendência]               │
│                               [Explorar] [Ação] │
└────────────────────────────────────────────────┘
```

**Regras do card de insight:**
- O título do insight é a primeira coisa legível (H3, semi-bold)
- A descrição tem no máximo 3 linhas (ver "expandir" se precisar de mais)
- Badge "Novo" aparece apenas em insights não visualizados
- Tags são clicáveis (filtram por área)
- Botão "Explorar" navega para a conversa com aquele insight como contexto
- Botão "Ação" leva à recomendação associada
- Confiança e impacto são indicadores obrigatórios
- O card tem um ícone representando a área (finanças, operações, etc.)

**Comportamento:**
- Se não há insight: o card mostra "Nenhum insight ainda. Inicie seu diagnóstico."
- Se há múltiplos insights: apenas o mais relevante aparece aqui (os demais vão para "Últimas descobertas")
- O insight principal muda quando um novo insight de maior prioridade surge
- O insight principal nunca é removido sem substituto (sempre há um "mais relevante")

### 5.3 Resumo do Diagnóstico

**Estrutura:**

```
  ┌─────────────────────────────────────────┐
  │  ✔  Receita recorrente identificada     │
  │  ✔  Margem operacional acima da média   │
  │  ⚠  Concentração de clientes (risco)    │
  │  ✔  Fluxo de caixa estável              │
  │  ✔  NPS dentro da meta                  │
  └─────────────────────────────────────────┘
```

**Regras:**
- Mínimo 3 bullets, máximo 5 bullets
- Cada bullet: ícone de status (✔, ⚠, ✕) + frase curta (máximo 60 caracteres)
- Ordenação: bullets positivos primeiro, alertas por último
- Bullets não são clicáveis (são informativos)
- Se não há diagnóstico: "Diagnóstico pendente. Vamos começar?"

### 5.4 Mapa Cognitivo

**Estrutura:**

```
  ┌─────────────────────────────────────────┐
  │          MAPA COGNITIVO                 │
  │                                         │
  │              ┌─────┐                    │
  │           ┌──┤ 85% ├──┐                 │
  │           │  └─────┘  │                 │
  │       ┌───┤           ├───┐             │
  │       │   │    ┌───┐  │   │             │
  │    ┌──┤   └────┤70%├──┘   ├──┐         │
  │    │  │        └───┘      │  │         │
  │    │  │                   │  │         │
  │    └──┤                   ├──┘         │
  │       │                   │            │
  │       └───────────────────┘            │
  │                                         │
  │  [Finanças] [Clientes] [Operações] ... │
  └─────────────────────────────────────────┘
```

**Comportamento:**
- Radar ou gráfico de áreas conectadas (ver SISTEMA_OFICIAL_DE_COMPONENTES.md, seção 4.5)
- Cada eixo representa uma área de conhecimento
- Hover no eixo: tooltip com detalhes da área (nome, valor, variação desde última visita)
- Click no eixo: navega para detalhes da área
- Se não há dados: "Ainda não mapeamos sua empresa. Inicie o diagnóstico."
- Em wide: mapa expandido (4/12 ou 6/12). Em tablet/mobile: mapa compacto (200x200px)

### 5.5 Últimas Descobertas

**Estrutura:**

```
  ┌──────────────┐  ┌──────────────┐
  │  DESC 1      │  │  DESC 2      │
  │              │  │              │
  │  [Ícone]     │  │  [Ícone]     │
  │              │  │              │
  │  Título      │  │  Título      │
  │  descrição   │  │  descrição   │
  │  curta       │  │  curta       │
  │              │  │              │
  │  Tags        │  │  Tags        │
  └──────────────┘  └──────────────┘
```

**Regras:**
- Máximo 3 cards (2 em desktop, 1 em mobile)
- Cada card: ícone + título (H4) + descrição (1 linha, body small)
- Cards clicáveis: navegam para o insight completo na conversa
- Se não há descobertas: seção oculta
- Se há apenas 1 descoberta: ocupa 2 colunas de largura

### 5.6 Ações Recomendadas

**Estrutura:**

```
  ┌────────────────────────────────────────┐
  │  AÇÕES RECOMENDADAS                    │
  │                                        │
  │  ┌─────────────────────────────────┐  │
  │  │  [Urgente]  Nome da ação       │  │
  │  │  Descrição do impacto e passo  │  │
  │  │                       [Iniciar]│  │
  │  └─────────────────────────────────┘  │
  │                                        │
  │  ┌─────────────────────────────────┐  │
  │  │  [Médio]     Nome da ação       │  │
  │  │  Descrição do impacto e passo  │  │
  │  │                       [Iniciar]│  │
  │  └─────────────────────────────────┘  │
  │                                        │
  │                        [Ver todas...]  │
  └────────────────────────────────────────┘
```

**Regras:**
- Ações ordenadas por urgência (Crítico > Alto > Médio > Baixo)
- Máximo 3 ações visíveis. "Ver todas..." para o restante.
- Cada ação tem: nível de urgência (chip), título, descrição (1-2 linhas), botão "Iniciar"
- "Iniciar" navega para a conversa com aquela ação como contexto
- Se não há ações: "Nenhuma ação recomendada no momento." (seção oculta)
- Se há apenas ações de baixa prioridade: "Tudo em dia! Nenhuma ação urgente."

### 5.7 Indicadores por Área

**Estrutura:**

```
  ┌────────────────────────────────────────────────┐
  │  INDICADORES POR ÁREA                          │
  │                                                │
  │  Finanças         ████████████░░░░░░  72%  ▲8% │
  │  Clientes         ██████████░░░░░░░░  58%  ▼2% │
  │  Operações        ██████████████░░░░  81%  ▲5% │
  │  Pessoas          ████████░░░░░░░░░░  43%  ▲12%│
  │  Estratégia       ██████░░░░░░░░░░░░  35%  —   │
  └────────────────────────────────────────────────┘
```

**Regras:**
- Cada linha: nome da área + barra de conhecimento + valor percentual + variação
- Cores da barra seguem a cor da área (sistema de cores oficial)
- Variação: ▲ (positivo), ▼ (negativo), — (estável). Cor verde/vermelho/neutro.
- Linhas clicáveis: navegam para detalhes da área
- Máximo 6 áreas visíveis. Se houver mais: scroll vertical na seção
- Se não há indicadores: "Indicadores serão exibidos após o diagnóstico."
- Ordenação: por ordem de prioridade da área (não alfabética, não percentual)

### 5.8 Histórico de Insights

**Estrutura:**

```
  ┌────────────────────────────────────────────────┐
  │  HISTÓRICO DE INSIGHTS                         │
  │                                                │
  │  ┌─────────────────────────────────────────┐  │
  │  │  12/06  │  Insight mais recente       │  │
  │  │         │  [Finanças] [Confiança: 82%]│  │
  │  ├─────────────────────────────────────────┤  │
  │  │  10/06  │  Insight anterior            │  │
  │  │         │  [Clientes] [Confiança: 75%]│  │
  │  ├─────────────────────────────────────────┤  │
  │  │  08/06  │  Insight ainda anterior      │  │
  │  │         │  [Operações] [Confiança: 91%]│  │
  │  └─────────────────────────────────────────┘  │
  │                                                │
  │                        [Ver histórico completo]│
  └────────────────────────────────────────────────┘
```

**Regras:**
- Últimos 3 insights visíveis (data, título, área, confiança)
- Cada linha clicável: navega para o insight na conversa
- "Ver histórico completo" abre lista completa (sheet ou página)
- Se não há histórico: seção oculta
- Se há menos de 3: mostrar os existentes

### 5.9 Próximos Passos

**Estrutura:**

```
  ┌────────────────────────────────────────────────┐
  │  PRÓXIMOS PASSOS                               │
  │                                                │
  │  ┌──────────────────────┐ ┌──────────────────┐│
  │  │  Explorar insights   │ │  Falar com a IA  ││
  │  │  de finanças         │ │  sobre clientes  ││
  │  └──────────────────────┘ └──────────────────┘│
  │                                                │
  │  ┌──────────────────────────┐                  │
  │  │  Compartilhar relatório  │                  │
  │  │  com a equipe            │                  │
  │  └──────────────────────────┘                  │
  └────────────────────────────────────────────────┘
```

**Regras:**
- Botões de ação (secundários, no máximo 3)
- Cada botão: label + descrição curta (body small)
- Os passos mudam conforme o contexto do empresário
- Se não há próximos passos: "Que tal conversar com a IA sobre sua empresa?"
- Próximos passos são sugestões — o empresário pode ignorar

---

## 6. Elementos Variáveis e Fixos

### 6.1 O Que Muda (Conteúdo Dinâmico)

| Elemento | O que muda | Frequência de mudança |
|---|---|---|
| Saudação | Período do dia + estado do dashboard | Por sessão |
| Insight principal | Conteúdo, badge "Novo" | Quando novo insight de maior prioridade surge |
| Resumo | Bullets conforme diagnóstico evolui | Quando diagnóstico é atualizado |
| Mapa cognitivo | Valores de cada eixo | Quando dados de área mudam |
| Últimas descobertas | Lista de insights | Quando novo insight chega |
| Ações recomendadas | Cards, urgência, descrição | Quando contexto do insight muda |
| Indicadores | Percentuais, variações | Quando dados são atualizados |
| Histórico | Ordem, conteúdo | Quando novo insight é gerado |
| Próximos passos | Botões, labels | Conforme contexto do empresário |

### 6.2 O Que Nunca Muda (Estrutura Fixa)

| Elemento | Por que nunca muda |
|---|---|
| Saudação | É a âncora emocional — o empresário é recebido sempre |
| Mapa cognitivo | É a visão geral — o empresário sempre pode ver o todo |
| Navegação (sidebar/topbar) | É o sistema de orientação — o empresário nunca se perde |
| Posição do insight principal | Topo do conteúdo — a atenção máxima está sempre no mesmo lugar |
| Estrutura de 2 colunas | 8/12 + 4/12 — o layout não se reorganiza sozinho |
| Barra de pesquisa | Ponto de partida para exploração intencional (se existir) |
| Última atualização | Rodapé informativo — "há quanto tempo esses dados são atuais" |
| Acesso a configurações | Ícone de engrenagem (canto superior direito ou sidebar) |

### 6.3 O Que Desaparece em Versão Reduzida

| Elemento | Onde vai | Condição para reaparecer |
|---|---|---|
| Gráficos detalhados | Acessíveis por clique no indicador | Empresário clica para expandir |
| Histórico completo | Sheet ou página separada | Empresário clica "Ver histórico completo" |
| Configurações | Ícone de engrenagem | Sempre acessível em 1 clique |
| Sidebar de ações | Incorporada ao fluxo vertical (mobile) | Tela em landscape ou tablet+ |
| Descobertas antigas | Removidas da vista inicial | Apenas as 3 mais recentes ficam visíveis |
| Ações de baixa prioridade | "Ver todas..." | Apenas ações de urgência Média+ são visíveis |
| Variações de indicadores | Mostradas apenas em hover ou linha ativa | Variação positiva/negativa visível sempre (é informação crítica) |

---

## 7. Comportamento do Dashboard

### 7.1 Ciclo de Vida

```
                     ┌─────────────┐
                     │  PRIMEIRO   │
                     │  LOGIN      │
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
                     │  DIAGNÓSTICO│
                     │  EM         │
                     │  ANDAMENTO  │
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
               ┌─────│ DIAGNÓSTICO │
               │     │ CONCLUÍDO   │
               │     └──────┬──────┘
               │            │
               │            ▼
               │     ┌─────────────┐
               │     │  RETORNO    │
               │     │  (COM OU    │
               │     │  SEM NOVID.)│
               │     └──────┬──────┘
               │            │
               │            ▼
               │     ┌─────────────┐
               │     │  NOVOS      │
               └─────│  INSIGHTS   │
                     │  (CICLO)    │
                     └─────────────┘
```

### 7.2 Transições de Estado

| Transição | Como acontece | Duração | Efeito visual |
|---|---|---|---|
| Primeiro login → Diagnóstico em andamento | Empresário clica "Iniciar diagnóstico" | 300ms | Fade out do empty state → Loading inteligente |
| Diagnóstico em andamento → Concluído | IA conclui análise | 400ms | Loading → Fade in com animação dos componentes |
| Retorno sem novidades → Retorno com novidades | Novo insight gerado | 500ms | Card de insight aparece com slide up + badge "Novo" |
| Retorno com novidades → Retorno sem novidades | Empresário vê todos os insights | 300ms | Badges "Novo" desaparecem com fade out |
| Ações pendentes → Ações resolvidas | Empresário executa ação | 200ms | Card de lembrete desaparece com fade |
| Erro no carregamento → Estado normal | Dados carregam com sucesso | 300ms | Mensagem de erro substituída por conteúdo |

### 7.3 Atualização de Dados

| Tipo de atualização | Comportamento |
|---|---|
| Automática (background) | Dados atualizados em background. Toast informativo: "Novos dados disponíveis. Atualize o dashboard." |
| Manual (puxar para atualizar) | Pull-to-refresh em mobile. Botão "Atualizar" em desktop (canto superior direito). |
| Em tempo real (conversa) | Dashboard reflete mudanças da conversa em tempo real (sem reload). |
| Programada (diária) | Atualização automática a cada 24h ou quando novos insights são gerados. |

**Regra de atualização:**
- O dashboard nunca atualiza sem aviso (exceto em tempo real durante conversa)
- Atualização automática: badge sutil aparece "Novos dados disponíveis"
- O empresário escolhe quando atualizar (clicando no badge ou botão)
- Após atualização: scroll volta ao topo (com transição suave de 300ms)

### 7.4 Navegação a Partir do Dashboard

| Ação | Destino | Comportamento |
|---|---|---|
| Clica no insight principal | Conversa (contexto = insight) | Transição suave, insight pré-carregado |
| Clica em ação recomendada | Conversa (contexto = ação) | Transição, IA pronta para guiar |
| Clica no mapa cognitivo | Detalhe da área | Navega para área específica |
| Clica em última descoberta | Conversa (contexto = descoberta) | Transição para conversa |
| Clica em indicador | Detalhe da área (com indicador expansível) | Navega para área |
| Clica em "Ver histórico completo" | Sheet ou página de histórico | Sheet abre (400px) com lista completa |
| Clica em "Ver todas" (ações) | Sheet com todas as ações | Sheet abre (400px) com ações ordenadas |
| Clica em configurações | Página de configurações | Navegação padrão |

---

## 8. Anti-padrões do Dashboard

### 8.1 O que NUNCA fazer

| Anti-padrão | Problema | Solução |
|---|---|---|
| **Dashboard como tabela** | Empresário não sabe o que é importante | Hierarquizar por relevância, não listar tudo |
| **Números sem contexto** | "72%" sem dizer "do que?" | Sempre label + variação + referência |
| **Gráfico sem insight** | O gráfico mostra, mas não explica | Gráfico + texto que revela o padrão |
| **Tudo do mesmo tamanho** | Nada se destaca | Insight principal é maior, o resto é menor |
| **Scroll infinito sem fim** | Empresário nunca termina de ver | Seções delimitadas, "Ver mais" para aprofundar |
| **Sidebar essencial** | Conteúdo crítico na lateral | Crítico vai para a coluna principal |
| **Dashboard sem saudação** | Experiência fria, impessoal | Saudação é a âncora emocional |
| **Atualizar sem avisar** | Empresário perde o que estava vendo | Atualização só com consentimento |
| **Esconder o que mudou** | Empresário não sabe o que é novo | Destacar mudanças com badges e cores |
| **Mostrar tudo de uma vez** | Sobrecarga cognitiva | Prioridade: 3s (essencial) → 10s (importante) → 30s (detalhe) |

### 8.2 O Erro do "Painel de Controle"

Sintomas:
- Dashboard com 12 cards do mesmo tamanho
- 5 gráficos visíveis simultaneamente
- Números que não contam uma história
- Empresário precisa de 30 segundos para encontrar o insight principal
- Navegação que compete com o conteúdo

Diagnóstico: o dashboard foi projetado como um "painel de controle" em vez de um "espelho cognitivo". Correção: aplicar a hierarquia dos 3-10-30 segundos. Nem tudo merece o mesmo espaço.

### 8.3 O Erro do "Tudo Importa"

Sintomas:
- "Todas as métricas são importantes"
- Cards de insight do mesmo tamanho que cards de métrica
- Indicadores secundários no topo, insight principal no meio
- "O empresário precisa ver tudo de uma vez"

Diagnóstico: não houve escolha de prioridade. Correção: escolher UM insight principal. O resto é suporte.

---

## 9. Dashboard em Contextos Especiais

### 9.1 Dashboard Vazio (Sem Empresa Associada)

| Comportamento |
|---|
| Se o empresário não vinculou empresa: "Você ainda não conectou sua empresa." |
| Botão: "Conectar empresa" (primário) |
| Explicação: "Precisamos dos dados da sua empresa para gerar insights." |
| Empty state informativo, sem pressão |

### 9.2 Dashboard em Periodo de Teste / Trial

| Comportamento |
|---|
| Saudação inclui: "[Nome], você está no período de teste." |
| Insight principal: disponível, mas com amostra limitada |
| Badge "Trial" sutil no canto |
| CTA: "Ver planos" (no lugar de "Compartilhar") |
| Após fim do trial: dashboard congelado com "Assine para continuar" |

### 9.3 Dashboard em Modo Offline / Sem Conexão

| Comportamento |
|---|
| Saudação: "[Nome], você está offline." |
| Insight principal: último insight disponível antes da desconexão |
| Indicadores: congelados com badge "Offline" |
| Ações: desabilitadas com tooltip "Disponível quando online" |
| Badge de conectividade: canto superior direito (vermelho) |

### 9.4 Dashboard em Multi-empresa

| Comportamento |
|---|
| Seletor de empresa no topo (ao lado da saudação) |
| Ao trocar de empresa: dashboard recarrega com os dados da empresa selecionada |
| Indicador de empresa ativa: nome da empresa + logo (se houver) |
| Insight principal: da empresa selecionada |
| Comparação entre empresas: não disponível no MVP (hipótese futura) |

---

## 10. Métricas do Dashboard

### 10.1 O que Medir

| Métrica | O que indica | Meta |
|---|---|---|
| Tempo até o insight principal | O empresário encontra o insight rapidamente? | < 3 segundos |
| Taxa de clique no insight principal | O insight chama atenção? | > 70% |
| Scroll até o final do dashboard | O empresário viu tudo? | > 50% |
| Cliques em ações recomendadas | As ações são relevantes? | > 30% |
| Retorno ao dashboard (DAU) | O dashboard é útil no dia a dia? | > 60% dos usuários ativos |
| Tempo total no dashboard | O empresário fica tempo suficiente? | 15-45 segundos (ideal) |

### 10.2 O que Observar (Sinais de Problema)

| Sinal | Possível causa |
|---|---|
| Tempo > 10s no insight principal | Insight não está claro o suficiente |
| Nenhum clique no insight principal | Insight não parece relevante |
| Scroll nunca chega aos indicadores | Dashboard está muito longo ou indicadores são desinteressantes |
| Cliques em ações = 0% | Ações não são relevantes ou não estão visíveis |
| Retorno < 20% dos usuários | Dashboard não agrega valor no dia a dia |
| Usuário fecha o dashboard em < 5s | Não encontrou o que veio buscar |

---

## 11. Checklist do Dashboard

### 11.1 Checklist Geral

- [ ] O insight principal é identificável em 3 segundos?
- [ ] A saudação está personalizada (nome + período do dia + contexto)?
- [ ] O resumo do diagnóstico tem 3-5 bullets claras?
- [ ] O mapa cognitivo está visível?
- [ ] As ações recomendadas são relevantes para o estado atual?
- [ ] Os indicadores por área estão atualizados?
- [ ] O histórico de insights está limitado a 3 itens?
- [ ] Não há gráficos demais (máximo 2)?
- [ ] A navegação está acessível mas não compete com o conteúdo?
- [ ] O estado atual (primeiro login, retorno, etc.) está correto?
- [ ] Badges "Novo" estão nos lugares certos?
- [ ] O que mudou desde a última visita está destacado?
- [ ] Em mobile, o conteúdo está empilhado corretamente?
- [ ] A sidebar (se existir) não contém informação crítica?
- [ ] O layout respeita 8/12 + 4/12?
- [ ] O card de insight principal tem 50% de atenção visual?
- [ ] Ações de baixa prioridade estão ocultas atrás de "Ver todas"?
- [ ] O dashboard tem rodapé com "Última atualização"?

### 11.2 Checklist por Estado

**Primeiro login:**
- [ ] Empty state amigável com CTA "Iniciar diagnóstico"
- [ ] Mapa cognitivo vazio com placeholder
- [ ] Navegação visível mas recuada
- [ ] Nenhum número ou gráfico falso

**Diagnóstico concluído:**
- [ ] Insight principal com badge "Novo" (se primeira vez)
- [ ] Mapa cognitivo preenchido com animação
- [ ] Resumo com 5 bullets
- [ ] Ações recomendadas disponíveis

**Retorno sem novidades:**
- [ ] Saudação indica estabilidade ("Tudo como na última visita")
- [ ] Insight principal não tem badge "Novo"
- [ ] Nenhum toast ou badge de novidade
- [ ] Sugestão de ação: "Que tal explorar um novo ângulo?"

**Retorno com novidades:**
- [ ] Saudação indica novidades ("Temos novidades!")
- [ ] Insight principal com badge "Novo" + animação sutil
- [ ] Badges "Novo" nos cards de descoberta
- [ ] Toast (se aplicável)

**Ações pendentes:**
- [ ] Card de lembrete visível com badge de urgência
- [ ] Lista de ações pendentes (se houver)
- [ ] Botão "Revisar ações"

### 11.3 Checklist de Responsividade

- [ ] Saudação não quebra em mobile (1 linha)
- [ ] Insight principal ocupa 100% da largura
- [ ] Sidebar de ações incorporada ao fluxo (abaixo do principal)
- [ ] Mapa cognitivo 200x200px (mobile)
- [ ] Cards de descoberta: 1 por linha
- [ ] Indicadores: 100% largura, label à esquerda
- [ ] Ações recomendadas: 1 por linha
- [ ] Botões full-width em mobile
- [ ] Navegação em bottom bar (se mobile)
- [ ] Scroll suave em mobile (momentum scroll)

---

## 12. Matriz de Decisão do Dashboard

Para cada nova seção, painel ou funcionalidade a ser adicionada ao dashboard, responder:

1. **Qual problema do empresário esta seção resolve?** (se não resolve, não adicionar)
2. **Ela ajuda ele a decidir melhor?** (se apenas informa, é secundária)
3. **Onde ela se encaixa na hierarquia dos 3-10-30 segundos?** (essencial → aparece cedo)
4. **Ela compete com o insight principal?** (se sim: recuar ou reposicionar)
5. **Ela é informação fixa (nunca muda) ou variável (muda com frequência)?** (fixa não precisa de badge "Novo")
6. **Ela funciona em mobile?** (se não: repensar ou adaptar)
7. **Quantos elementos visuais ela adiciona à tela?** (máximo de elementos por tela: 7±2)
8. **Ela requer um novo componente?** (se sim: ver SISTEMA_OFICIAL_DE_COMPONENTES.md)
9. **Ela gera uma ação?** (se não: é apenas informativa — menor prioridade)
10. **O empresário usaria isso semanalmente?** (se não: não pertence ao dashboard)

Se essas perguntas não tiverem respostas claras, a seção não está pronta para o dashboard.

---

## Apêndice A: Glossário do Dashboard

| Termo | Definição |
|---|---|
| Insight principal | O padrão ou descoberta mais relevante para o empresário no momento |
| Saudação | Elemento textual personalizado que abre o dashboard |
| Resumo do diagnóstico | Conjunto de 3-5 bullets que destilam o estado atual |
| Mapa cognitivo | Representação visual (radar) do conhecimento por área |
| Últimas descobertas | Insights recentes que não são o principal |
| Ações recomendadas | Próximos passos sugeridos pela IA |
| Indicadores | Barras de conhecimento por área |
| Badge "Novo" | Indicador visual de conteúdo não visualizado |
| Card de lembrete | Alerta de ações pendentes |
| Estado do dashboard | Variação do dashboard conforme o momento do empresário (primeiro login, retorno, etc.) |

---

## Apêndice B: Regra dos 3 Segundos (Versão Resumida)

Para cada implementação do dashboard, aplicar:

1. **Abra o dashboard.**
2. **Conte 3 segundos.**
3. **Feche os olhos.**
4. **O que você lembra?**

Se a resposta for "o insight principal" → passou.
Se a resposta for "vários cards" → você tem 12 cards do mesmo tamanho.
Se a resposta for "nada" → o dashboard não tem ponto focal.

**O dashboard não passou no teste dos 3 segundos? Ele não está pronto.**

---

*Documentos complementares: SISTEMA_OFICIAL_DE_LAYOUT.md (grid e estrutura do dashboard), SISTEMA_OFICIAL_DE_COMPONENTES.md (cada componente dentro do dashboard), SISTEMA_OFICIAL_DE_ATENCAO.md (como o olho percorre o dashboard), SISTEMA_OFICIAL_DE_HIERARQUIA_COGNITIVA.md (peso de cada elemento no dashboard), CURRENT_PRODUCT.md (fase atual e prioridades do dashboard).*
