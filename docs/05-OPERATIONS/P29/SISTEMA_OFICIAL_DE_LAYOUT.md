# Sistema Oficial de Layout

> *"O espaço não é vazio — é pausa, hierarquia, direção. O layout da Ponte Digital não apenas organiza elementos: ele conduz o olhar, respeita a atenção, protege o foco."*

---

## 1. Sistema de Grid

### 1.1 Estrutura Base

| Propriedade | Desktop (≥1024px) | Tablet (768-1023px) | Mobile (360-767px) |
|---|---|---|---|
| Colunas | 12 | 8 | 4 |
| Gutter (entre colunas) | 24px | 16px | 8px |
| Margem (borda da tela) | 32px | 24px | 16px |
| Largura máxima | 1280px | 100% | 100% |
| Alinhamento | Centralizado | Centralizado | Esticado |

### 1.2 Breakpoints Oficiais

| Nome | Largura | Alvo |
|---|---|---|
| Mobile | 360px - 767px | Smartphones |
| Tablet | 768px - 1023px | Tablets portrait |
| Desktop | 1024px - 1439px | Notebooks/desktop |
| Wide | ≥1440px | Monitores largos |

**Regra:** Todo layout deve ser projetado mobile-first. O breakpoint wide é o único que pode conter conteúdo extra (sidebar informacional), nunca conteúdo essencial.

### 1.3 Distribuição de Colunas

| Proporção | Colunas (12) | Uso |
|---|---|---|
| Inteiro | 12/12 | Conversa, landing, formulário |
| Dois terços + um terço | 8/12 + 4/12 | Dashboard, perfil |
| Metade + metade | 6/12 + 6/12 | Comparação lado a lado |
| Três quartos + um quarto | 9/12 + 3/12 | Detalhe com sidebar |
| Dois + dois + dois + dois + dois + dois | 2/12 × 6 | Indicadores em linha |

**Em telas menores:**

| Proporção original | Tablet (8 col) | Mobile (4 col) |
|---|---|---|
| 8 + 4 | 6 + 2 | 4 + 0 (empilhado) |
| 6 + 6 | 4 + 4 | 4 + 0 (empilhado) |
| 9 + 3 | 6 + 2 | 4 + 0 (empilhado) |
| 2 × 6 | 2 × 4 (2 linhas) | 4 + 0 (rolagem horizontal) |

### 1.4 Regras do Grid

1. **Nunca usar grid para landing pages.** Landing é livre, orgânica, narrativa. Grid é para telas de produto.
2. **Nunca centralizar texto dentro de colunas de grid.** Texto alinhado à esquerda, sempre.
3. **Nunca ter um elemento ocupando colunas quebradas (ex: 5/12).** Use 4/12, 6/12, 8/12, 9/12. Simetria importa.
4. **Gutter é sagrado.** Nenhum elemento invade o gutter. Nenhum elemento tem padding menor que o gutter.
5. **Em mobile, o grid se torna empilhamento.** A exceção é uma lista de indicadores numéricos (2 por linha, 4/4 em cada).
6. **Sidebar no wide não conta no grid principal.** Sidebar wide é uma coluna extra além das 12.

---

## 2. Layouts por Tipo de Tela

### 2.1 Conversa

| Propriedade | Valor |
|---|---|
| Colunas | 12/12 centralizado |
| Largura máxima do conteúdo | 720px |
| Sidebar opcional | 320px (wide apenas) |
| Altura | Viewport inteira |
| Rolagem | Vertical, conteúdo principal |
| Posição do input | Base fixa |

```
┌──────────────────────────────────────────────┐
│  ┌────────────────────────────────────┐       │
│  │                                    │       │
│  │         ÁREA DE CONVERSA           │       │
│  │         (max 720px)                │       │
│  │                                    │       │
│  │         Balões de IA               │       │
│  │         Balões de usuário          │       │
│  │                                    │       │
│  └────────────────────────────────────┘       │
│  ┌────────────────────────────────────┐       │
│  │         CAMPO DE INPUT             │       │
│  └────────────────────────────────────┘       │
└──────────────────────────────────────────────┘
```

**Regras:**
- Balões de IA alinhados à esquerda
- Balões de empresário alinhados à direita
- Timestamp entre blocos de mensagem (não por mensagem individual)
- Sidebar cognitiva aparece apenas em wide (≥1440px) e é colapsável
- Em mobile, input ocupa 100% da largura disponível

### 2.2 Dashboard

| Propriedade | Valor |
|---|---|
| Colunas | 8/12 + 4/12 |
| Principal (8) | Conteúdo dinâmico, insights, mapa |
| Lateral (4) | Ações, indicadores, cards secundários |
| Em tablet | 6/12 + 2/12 (lateral reduzida) |
| Em mobile | Empilhado (principal + lateral abaixo) |

```
┌────────────────────────────────────────────────┐
│ ┌──────────────────────┐ ┌────────────────────┐│
│ │                      │ │                    ││
│ │   INSIGHT PRINCIPAL  │ │   AÇÕES RÁPIDAS   ││
│ │   (8 colunas)        │ │   (4 colunas)     ││
│ │                      │ │                    ││
│ │   MAPA COGNITIVO     │ │   INDICADORES     ││
│ │                      │ │                    ││
│ │   DESCOBERTAS        │ │   HISTÓRICO       ││
│ │                      │ │                    ││
│ └──────────────────────┘ └────────────────────┘│
└────────────────────────────────────────────────┘
```

**Regras:**
- A coluna principal (8) contém o insight principal e o mapa cognitivo — o que o empresário veio ver
- A coluna lateral (4) contém suporte — ações, indicadores, histórico recente
- Em mobile, a lateral vai para baixo da principal, na ordem: insight → mapa → ações → indicadores
- A coluna lateral nunca contém informação crítica sozinha

### 2.3 Lista (CRM, Clientes, Insights, Decisões)

| Propriedade | Valor |
|---|---|
| Estrutura | Sidebar de filtros + lista principal |
| Largura dos filtros | 280px (fixa) |
| Colunas da lista | 12/12 (o restante) |
| Comportamento | Scroll vertical com header fixo |
| Em tablet | Filtros colapsáveis (280px → ícone + overlay) |
| Em mobile | Filtros em sheet (tela inteira) |

```
┌────────────────────────────────────────────────┐
│ ┌──────────┐ ┌───────────────────────────────┐│
│ │          │ │                               ││
│ │  FILTROS │ │  LISTA PRINCIPAL              ││
│ │  280px   │ │                               ││
│ │          │ │  Item 1  │  Info  │  Status   ││
│ │  busca   │ │  Item 2  │  Info  │  Status   ││
│ │  status  │ │  Item 3  │  Info  │  Status   ││
│ │  data    │ │  Item 4  │  Info  │  Status   ││
│ │  tags    │ │                               ││
│ │          │ │  Paginação / Scroll infinito   ││
│ └──────────┘ └───────────────────────────────┘│
└────────────────────────────────────────────────┘
```

**Regras:**
- Filtros são persistentes em desktop, colapsáveis em tablet, sheet em mobile
- A lista nunca tem mais que 3 colunas de dados por linha
- A primeira coluna é sempre o identificador principal (nome, título, assunto)
- Ordenação é feita por clique no cabeçalho da coluna
- Scroll infinito para listas > 50 itens; paginação para < 50 itens

### 2.4 Detalhe

| Propriedade | Valor |
|---|---|
| Colunas | 12/12 centralizado |
| Largura máxima | 800px |
| Comportamento | Scroll vertical, seções ordenadas |

**Regras:**
- Seções separadas por divisores sutis (1px, cor neutra)
- Cada seção tem título descritivo (h3)
- Informações relacionadas ficam juntas — nunca espalhadas
- Navegação entre seções via scroll (âncoras na lateral em wide)
- Em mobile, scroll puro, sem âncoras laterais

### 2.5 Landing / Apresentação

| Propriedade | Valor |
|---|---|
| Grid | Livre — não usar grid de produto |
| Largura | 100% viewport |
| Alinhamento | Narrativo, vertical, scroll contínuo |
| Quebras | Seções-fullscreen com transição suave |

**Regras:**
- Landing não segue grid de 12 colunas
- Landing pode usar grids assimétricos, sobreposições, elementos flutuantes
- Landing é a única tela que pode ter animações de entrada elaboradas
- Landing é a única tela que pode ter ilustrações grandes
- Landing nunca tem sidebar, nunca tem navegação complexa

---

## 3. Espaçamento Vertical

### 3.1 Escala de Espaçamento

| Token | Valor | Uso |
|---|---|---|
| `space-0` | 0 | Remoção de espaçamento |
| `space-1` | 4px | Entre ícone e label, elementos inline |
| `space-2` | 8px | Entre chips/tags, itens de lista compacta |
| `space-3` | 12px | Entre label e input, entre bullets e texto |
| `space-4` | 16px | Entre cards no mesmo grupo, entre seções leves |
| `space-5` | 20px | Entre título e conteúdo, padding de cards |
| `space-6` | 24px | Entre seções, padding de containers |
| `space-7` | 32px | Entre seções maiores, padding de página |
| `space-8` | 40px | Entre blocos temáticos, separação forte |
| `space-9` | 48px | Entre grandes áreas da tela |
| `space-10` | 64px | Topo da página, antes de rodapé |

### 3.2 Regras de Espaçamento

1. **Padding interno de cards:** sempre 24px. Exceto card de métrica (16px) e card de insight (32px).
2. **Entre cards no mesmo grupo:** 16px (gutter). Entre grupos de cards: 32px.
3. **Entre título e primeiro conteúdo:** 20px. Entre subtítulo e conteúdo: 12px.
4. **Entre label e input:** 8px. Entre input e mensagem de erro: 4px.
5. **Entre parágrafos de texto corrido:** 16px.
6. **Entre balões de mensagem:** 8px (mesmo autor), 16px (autor diferente).
7. **Topo da página (conteúdo principal):** 48px (desktop), 32px (mobile).
8. **Entre seções irmãs no mesmo nível hierárquico:** 24px. Entre pai e filho: 16px.
9. **Acima de botão primário isolado:** 24px. Acima de botão em formulário: 16px.
10. **Abaixo de título de página:** 24px. Abaixo de breadcrumb: 16px.

### 3.3 Compressão em Mobile

| Elemento | Desktop → Mobile |
|---|---|
| Card padding | 24px → 16px |
| Entre cards | 16px → 12px |
| Topo da página | 48px → 24px |
| Entre seções | 32px → 20px |
| Margem lateral | 32px → 16px |
| Gutter entre colunas | 24px → 8px |

---

## 4. Hierarquia Visual

### 4.1 Tamanhos de Tipografia (rem)

| Nível | Tamanho | Peso | Uso |
|---|---|---|---|
| Display | 2.5rem (40px) | Bold (700) | Título de landing, número hero |
| H1 | 2rem (32px) | Bold (700) | Título de página, saudação |
| H2 | 1.5rem (24px) | SemiBold (600) | Título de seção |
| H3 | 1.25rem (20px) | SemiBold (600) | Título de card, insight |
| H4 | 1.125rem (18px) | Medium (500) | Subtítulo, label de grupo |
| Body | 1rem (16px) | Regular (400) | Texto corrido, parágrafos |
| Body Small | 0.875rem (14px) | Regular (400) | Metadados, timestamps |
| Caption | 0.75rem (12px) | Regular (400) | Tags, badges, legendas |
| Micro | 0.625rem (10px) | Medium (500) | Versões, contagens mínimas |

### 4.2 Regras de Hierarquia Visual

1. **Nunca mais de um Display por tela.** Display é o grito visual — só um grita por vez.
2. **H1 é único por página.** Apenas o título principal usa H1.
3. **H2 pode repetir (seções).** Máximo 6 H2 por página.
4. **H3 pode repetir (cards).** Máximo 12 H3 visíveis sem scroll.
5. **Body é o padrão.** Texto de insight, descrições, ajuda, mensagens.
6. **Body Small é recuo.** Dados de apoio, informações secundárias.
7. **Caption não deve ser usado para conteúdo essencial.** Nada importante pode estar em Caption.
8. **A hierarquia de tipografia reflete a hierarquia cognitiva.** Insight é H3 ou maior. Ação secundária é Body Small. Metadado é Caption.

### 4.3 Alinhamento

| Elemento | Alinhamento |
|---|---|
| Títulos | Esquerda (nunca centralizado) |
| Texto corrido | Esquerda (justificado apenas em landing) |
| Números/KPIs | Centralizado no card |
| Botões | Esquerda em formulários, centralizado em CTAs |
| Ícones | Centralizado no container |
| Labels | Esquerda, acima do input |
| Tags/Chips | Esquerda, wrap |
| Modal content | Esquerda (título centralizado opcional) |

---

## 5. Profundidade e Camadas

### 5.1 Sistema de Camadas (z-index)

| Camada | Nome | z-index | Elementos |
|---|---|---|---|
| 0 | Fundo | 0 | Background da página, grid de fundo, texturas |
| 1 | Conteúdo base | 10-50 | Cards, texto, imagens, listas, formulários |
| 2 | Navegação | 100-200 | Sidebar, topbar, tabs, breadcrumbs |
| 3 | Sobreposições | 300-500 | Modais, sheets, dropdowns, date pickers |
| 4 | Notificações | 600-700 | Toasts, badges flutuantes, alertas não-bloqueantes |
| 5 | Loading states | 800-900 | Overlay de loading, skeleton, shimmer |

**Regra fundamental:** Nenhum elemento pode usar z-index fora dessas faixas. As faixas são reservadas.

### 5.2 Distribuição Interna por Camada

| Camada | Faixa | Sub-regra |
|---|---|---|
| 0 | z-index: 0 | Apenas o background |
| 1 | z-index: 10-50 | Cards: 10, Listas: 20, Formulários: 30, Conteúdo em foco: 50 |
| 2 | z-index: 100-200 | Topbar: 100, Sidebar: 110, Tabs fixas: 120, Header sticky: 130 |
| 3 | z-index: 300-500 | Dropdown: 300, Date picker: 310, Tooltip: 320, Sheet: 400, Modal: 500 |
| 4 | z-index: 600-700 | Badge flutuante: 600, Toast: 610, Toast crítico: 650 |
| 5 | z-index: 800-900 | Skeleton: 800, Overlay de loading: 810 |

### 5.3 Regras de Profundidade

1. **Sombra só existe se houver camada abaixo.** Um card na camada 1 só tem sombra se houver algo na camada 0 abaixo dele. Se o fundo for sólido, sombra é opcional.
2. **Camadas não se misturam.** Uma sheet (camada 3) nunca compete com um toast (camada 4). Toast fica acima de tudo, exceto loading.
3. **Profundidade máxima: 5 camadas.** Nenhuma circunstância permite uma 6ª camada. Se precisar de mais, o design está errado.
4. **Transição entre camadas:** fade (300ms) + scale (1.0 → 1.02) para elementos que sobem de camada. Apenas fade (300ms) para elementos que descem.
5. **Overlay de backdrop:** cor preta com opacidade 0.4 (modal), 0.2 (sheet), 0.6 (loading). Nunca branco.
6. **Duas sobreposições nunca simultâneas.** Modal fecha antes de abrir sheet. Sheet fecha antes de abrir modal. Notificação não abre durante modal.
7. **Loading overlay é a única camada que cobre tudo.** Nem toast fica acima de loading.

### 5.4 Sombras

| Nível | Uso | Valor |
|---|---|---|
| Sombra 0 | Cards no fundo sólido | `none` |
| Sombra 1 | Cards sobre background texturizado | `0 1px 3px rgba(0,0,0,0.08)` |
| Sombra 2 | Cards em hover, dropdowns | `0 4px 12px rgba(0,0,0,0.10)` |
| Sombra 3 | Sheets, nav flutuante | `0 8px 24px rgba(0,0,0,0.12)` |
| Sombra 4 | Modais | `0 16px 48px rgba(0,0,0,0.16)` |
| Sombra 5 | Toast, loading | `0 4px 12px rgba(0,0,0,0.20)` |

**Regra de sombra:** Sombra só existe em direção à camada inferior. Um elemento na camada 3 projeta sombra sobre a camada 2. A sombra nunca "vaza" para cima.

---

## 6. Responsividade

### 6.1 Estratégia de Adaptação

| Tipo de tela | Abordagem |
|---|---|
| Mobile (360-767) | Empilhamento máximo. 1 coluna. Navegação em bottom bar. Filtros em sheet. Sidebar oculta. |
| Tablet (768-1023) | Grid reduzido (8 colunas). Sidebar colapsável. Navegação lateral ou top bar. |
| Desktop (1024-1439) | Grid completo (12 colunas). Sidebar visível. Tudo acessível sem clique extra. |
| Wide (≥1440) | Grid 12 + sidebar extra. Conteúdo informacional adicional. Mapa cognitivo expandido. |

### 6.2 O que muda em cada breakpoint

| Elemento | Mobile | Tablet | Desktop | Wide |
|---|---|---|---|---|
| Grid | 4 col | 8 col | 12 col | 12 col + extra |
| Margem | 16px | 24px | 32px | 32px |
| Gutter | 8px | 16px | 24px | 24px |
| Topbar | Compacta | Normal | Normal | Normal + shortcuts |
| Sidebar | Bottom nav | Colapsável | Fixa | Fixa + info extra |
| Cards por linha | 1-2 | 2-3 | 3 | 3 |
| Filtros de lista | Sheet | Drawer colapsável | Sidebar fixa | Sidebar fixa |
| Conversa sidebar | Oculta | Oculta | Oculta | Visível (320px) |
| Tipografia | -1 nível | Normal | Normal | Normal + wide extras |
| Espaçamento | Comprimido | Normal | Normal | Normal + respirável |

### 6.3 Regras de Responsividade

1. **Conteúdo crítico nunca é exclusivo de desktop.** Se algo é essencial, existe em mobile.
2. **Conteúdo extra em wide é sempre informacional, nunca funcional.** Nenhuma ação crítica está disponível apenas em wide.
3. **Em mobile, botão primário é full-width.** Em desktop, botão primário tem largura definida pelo conteúdo.
4. **Tabelas viram listas em mobile.** Cada linha vira um card com label + valor.
5. **Gráficos viram cards resumidos em mobile.** Tap abre o gráfico completo em overlay.
6. **Navegação em mobile é bottom bar,** com no máximo 5 itens. Mais que 5: overflow em menu "Mais".
7. **Input em mobile tem viewport fixa.** Zoom é desabilitado em inputs para evitar auto-zoom indesejado.
8. **Modais em mobile são full-screen** (exceto para confirmações simples).

---

## 7. Layouts Especiais

### 7.1 Empty State

| Propriedade | Valor |
|---|---|
| Posição | Centro da área útil |
| Largura máxima | 480px |
| Alinhamento | Centralizado |
| Elementos | Ilustração/ícone (opcional) + título + descrição + CTA |

**Regras:**
- Empty state não compete com navegação — navegação permanece visível
- Título descreve o que falta ("Nenhum insight ainda")
- Descrição explica por que ("Seu diagnóstico está sendo processado")
- CTA é a ação natural ("Iniciar diagnóstico")
- Empty state pode ter múltiplos estados: "primeiro uso", "sem resultados", "sem dados no período"

### 7.2 Error State

| Propriedade | Valor |
|---|---|
| Posição | Substitui o conteúdo que falhou |
| Alinhamento | Centralizado na área do erro |
| Elementos | Mensagem + ação de recuperação |

**Regras:**
- Erro não é uma tela — é um estado. Navegação permanece.
- Descrição do erro em linguagem humana, não técnica ("Não conseguimos carregar seus insights" em vez de "Erro 500")
- Ação de recuperação: "Tentar novamente" (primário) ou "Falar com suporte" (secundário)
- Erro em formulário: mensagem inline, não estado de erro geral

### 7.3 Loading State

| Propriedade | Valor |
|---|---|
| Pode ser | Skeleton, shimmer, loader inteligente |
| Posição | Substitui o conteúdo que está carregando |
| Hierarquia | Mantém a estrutura do layout (skeleton) |

**Regras:**
- Skeleton é preferível a spinner — mostra a estrutura futura
- Skeleton usa cor neutra (cinza claro, sem animação agressiva)
- Loading inteligente: texto descritivo do que está sendo processado
- Loading > 3s: mostrar indicador de progresso ou mensagem descritiva
- Loading > 10s: oferecer "continuar em segundo plano" ou "notificar quando pronto"
- Shimmer: animação de 1.5s, movimento da esquerda para a direita, opacidade suave

---

## 8. Regras de Layout por Contexto

### 8.1 Contexto: Conversa Ativa

| O layout deve | O layout não deve |
|---|---|
| Dar máximo espaço aos balões | Permitir que sidebar roube espaço |
| Manter input sempre visível | Esconder input atrás de teclado (mobile) |
| Mostrar indicador de pensamento | Deixar tela vazia durante processamento |
| Preservar contexto (últimas mensagens) | Limpar a tela ao mudar de assunto |

### 8.2 Contexto: Análise em Andamento

| O layout deve | O layout não deve |
|---|---|
| Mostrar progresso da análise | Ficar estático sem feedback |
| Permitir colapso de resultados parciais | Mostrar resultados brutos ou dados crus |
| Manter acesso à conversa original | Bloquear navegação durante análise |

### 8.3 Contexto: Múltiplos Insights

| O layout deve | O layout não deve |
|---|---|
| Agrupar insights relacionados | Mostrar 10 cards do mesmo tamanho |
| Hierarquizar por relevância | Ordenar por timestamp apenas |
| Permitir expansão de detalhes | Forçar leitura linear de todos |
| Manter insight principal fixo no topo | Empurrar o principal para baixo ao adicionar novos |

### 8.4 Contexto: Comparação

| O layout deve | O layout não deve |
|---|---|
| Usar layout lado a lado (6/12 + 6/12) | Empilhar verticalmente em desktop |
| Destacar diferenças visualmente | Mostrar apenas valores absolutos |
| Manter mesma escala nos gráficos | Usar escalas diferentes (engana) |
| Usar cores iguais para o mesmo item | Mudar cor entre os lados |

---

## 9. Anti-padrões de Layout

### 9.1 O que NUNCA fazer

| Anti-padrão | Problema | Solução |
|---|---|---|
| **Layout congestionado** | Empresário não respira | Reduzir densidade, aumentar espaçamento |
| **Largura máxima ignorada** | Texto muito largo (ilegível) | Respeitar 720px para texto, 800px para conteúdo |
| **Grid usado em landing** | Landing parece produto | Landing é livre; produto segue grid |
| **Sidebar com info crítica** | Empresário perde dado importante | Informação crítica vai no conteúdo principal |
| **Overlay sobre overlay** | Empresário não sabe o que está à frente | Máximo 1 overlay por vez |
| **Margens inconsistentes** | Layout parece quebrado | Usar tokens de espaçamento, nunca valores avulsos |
| **Cards de tamanhos diferentes no mesmo grupo** | Desarmonia visual | Cards no mesmo grupo têm mesma largura |
| **Scroll horizontal** | Empresário não descobre conteúdo | Conteúdo deve estar visível ou ter indicador |
| **Elemento focal sem isolamento** | Foco compete com vizinhos | Espaço ao redor do elemento focal |
| **Tipografia sem hierarquia** | Tudo parece igual | Aplicar escala de 6 níveis |

### 9.2 O erro do "encaixar tudo"

Sintomas:
- Tela com 14 cards de tamanhos variados
- Elementos com padding de 8px forçados em layout de 1280px
- Sidebar com 7 itens diferentes e 3 seções
- Grid de 12 colunas com elementos de 5, 4 e 3 colunas

Diagnóstico: o layout está tentando mostrar tudo de uma vez. Correção: reduzir. Uma tela não pode mostrar tudo. Priorizar, agrupar, esconder em segundo nível.

---

## 10. Checklist de Layout

- [ ] O layout usa o grid corretamente para o tipo de tela?
- [ ] O espaçamento segue os tokens oficiais?
- [ ] A hierarquia tipográfica está correta (sem pular níveis)?
- [ ] As camadas de profundidade respeitam a faixa de z-index?
- [ ] O layout funciona em mobile, tablet e desktop?
- [ ] Conteúdo crítico não está escondido em sidebar ou hover?
- [ ] Não há sobreposição de camadas (ex: modal + toast)?
- [ ] A sombra existe apenas entre camadas adjacentes?
- [ ] O empty state tem CTA claro?
- [ ] O loading state mantém a estrutura do layout (skeleton)?
- [ ] Landing não usa grid de produto?
- [ ] Cards no mesmo grupo têm o mesmo tamanho?
- [ ] Não há scroll horizontal em nenhum breakpoint?
- [ ] A margem lateral está correta para cada breakpoint?
- [ ] O gutter está sendo respeitado (sem invasão)?
- [ ] O elemento focal tem isolamento visual adequado?
- [ ] A largura máxima de 1280px está aplicada?
- [ ] Em mobile, botões são full-width e inputs não zoomam?
- [ ] Em formulários, labels estão acima dos inputs?
- [ ] A conversa respeita 720px de largura máxima?

---

## 11. Matriz de Decisão de Layout

Para cada nova tela ou componente, responder:

1. **Qual tipo de tela é?** (conversa, dashboard, lista, detalhe, landing)
2. **Qual grid usar?** (12 col, 8 col, livre)
3. **Quantas camadas de profundidade?** (mínimo 2: fundo + conteúdo; máximo 5)
4. **Qual o espaço vertical entre seções?** (usar token adequado)
5. **Qual breakpoint mínimo necessário?** (mobile = mínimo obrigatório)
6. **Onde está o elemento focal?** (coluna principal, centro da viewport)
7. **Há sobreposições? Quantas?** (máximo 1; nunca simultâneas)
8. **Há sidebar? Ela é essencial ou informacional?** (nunca essencial em sidebar)

Se essas perguntas não tiverem respostas claras, o layout não está pronto para implementação.

---

*Documentos complementares: SISTEMA_OFICIAL_DE_COMPONENTES.md (como cada elemento se comporta dentro do layout), SISTEMA_OFICIAL_DO_DASHBOARD.md (layout específico do dashboard), SISTEMA_OFICIAL_DE_RESPIRACAO.md (o espaço como pausa), SISTEMA_OFICIAL_DE_ATENCAO.md (como o layout guia o olhar).*
