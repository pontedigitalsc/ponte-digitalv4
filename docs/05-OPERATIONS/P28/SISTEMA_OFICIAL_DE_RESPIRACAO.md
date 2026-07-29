# Sistema Oficial de Respiração

> *O espaço entre as coisas define tanto quanto as coisas em si. Na Ponte Digital, o vazio não é ausência — é intenção. Cada pixel de espaço branco é uma decisão consciente de dar ao empresário exatamente o ar de que ele precisa para processar, decidir e confiar.*

---

## 1. Fundamentos da Respiração

### 1.1 O que o espaço comunica

| Quantidade de espaço | O que comunica |
|---|---|
| **Muito espaço** (> 50% vazio) | "Isso é importante. Processe com calma. Não há pressa." |
| **Espaço médio** (25-40% vazio) | "Informação relevante, mas gerível. Você consegue absorver isso agora." |
| **Pouco espaço** (15-25% vazio) | "Muitas opções, explore com cuidado. Dados densos, mas organizados." |
| **Sem espaço** (< 15% vazio) | **Erro de design.** Nunca deve acontecer em telas da Ponte Digital. |

### 1.2 Princípio fundamental

O empresário da Ponte Digital já tem a cabeça cheia. O cérebro dele não precisa de mais estímulo — precisa de menos atrito. Cada elemento visual adicional é um custo cognitivo. Cada espaço em branco é um alívio cognitivo.

**A interface respira para que o empresário não precise prender a respiração.**

---

## 2. Proporções de Espaço Branco

### 2.1 Por contexto

| Contexto | Mínimo de espaço vazio | Densidade alvo |
|---|---|---|
| **Conversa** (chat IA ↔ empresário) | 40% | Folgado. Cada mensagem é um bloco distinto com ar ao redor. |
| **Dashboard** | 25% | Compacto, mas arejado. Informação densa sem sufocar. |
| **Landing / Hero** | 50% | Generoso. A primeira impressão respira confiança. |
| **Formulário** | 30% | Funcional, mas espaçado. Preencher não deve ser uma tortura. |
| **Lista / Tabela de dados** | 20% | Mínimo aceitável. A densidade serve à escaneabilidade. |
| **Modal / Dialog** | 35% | A modal precisa isolar o conteúdo do resto da tela. |
| **Mobile** | 30% | Tela pequena exige mais disciplina. Cada pixel conta. |

### 2.2 Regra da densidade máxima

> Em nenhuma circunstância mais de 70% da área útil de uma tela deve estar preenchida com elementos visuais (texto, cards, imagens, inputs, botões, ícones).

Os 30% restantes são espaçamentos, margens, gaps e áreas de respiro. Esta regra é absoluta — não há exceção para dashboards densos.

### 2.3 Como medir densidade

Densidade = (área ocupada por elementos) / (área total da viewport) × 100

Para calcular rapidamente:
- **Alta densidade** (> 60%): provavelmente precisa de mais respiro
- **Densidade ideal** (30-50%): faixa saudável
- **Baixa densidade** (< 30%) pode ser intencional (landing, foco)

---

## 3. Respiração entre Elementos

### 3.1 Distâncias mínimas

| Relação entre elementos | Distância mínima | Token |
|---|---|---|
| **Entre qualquer elemento e a borda do container** | 24px (desktop), 16px (mobile) | `--space-3` / `--space-2` |
| **Entre elementos diferentes** (card e card, card e botão) | 16px | `--space-2` |
| **Entre elementos do mesmo grupo** (itens de lista) | 12px | `--space-1.5` |
| **Entre label e input** | 8px | `--space-1` |
| **Entre input e mensagem de erro** | 4px | `--space-0.5` |
| **Entre título e conteúdo** | 24px | `--space-3` |
| **Entre seções** | 48px | `--space-6` |
| **Entre grupos de seções** | 64px | `--space-8` |

### 3.2 Respiração vertical

A respiração vertical é mais importante que a horizontal — o cérebro humano lê de cima para baixo, e o espaçamento vertical determina o ritmo da leitura.

| Contexto | Padding vertical | Line-height |
|---|---|---|
| **Texto corrido** | — | 1.6 (interlinea generosa) |
| **Card de conversa** | 16px (top) + 16px (bottom) | — |
| **Card de dashboard** | 12px (top) + 12px (bottom) | — |
| **Parágrafo para parágrafo** | 16px | — |
| **Título para conteúdo** | 24px | — |
| **Bloco de dados** | 8px entre linhas | 1.3 |

### 3.3 Respiração horizontal

| Contexto | Padding horizontal | Largura máxima de linha |
|---|---|---|
| **Texto corrido (conversa)** | 24px (esquerda/direita) | 70 caracteres |
| **Painel / Card** | 16px | 45 caracteres |
| **Dashboard** | 16-24px | — |
| **Landing** | 48px | 70 caracteres |

---

## 4. Densidade de Texto

### 4.1 Limites de texto por bloco

| Contexto | Limite | Regra |
|---|---|---|
| **Caracteres por linha (conversa)** | Máximo 70 | Mais que isso quebra a escaneabilidade |
| **Caracteres por linha (painel)** | Máximo 45 | Painéis são para consulta, não para leitura prolongada |
| **Parágrafos por bloco** | Máximo 3 | Mais que 3 parágrafos viram texto corrido — separar em seções |
| **Bullets por lista** | Máximo 5 | Listas com mais de 5 itens devem ter subcategorias |
| **Palavras por título** | Máximo 8 | Títulos longos não são lidos — são varridos |
| **Números por card** | Máximo 1 principal + 3 secundários | Um card com 5 números é um dashboard compactado — não funciona |

### 4.2 Line-height

| Peso do texto | Line-height | Contexto |
|---|---|---|
| **Light / Regular** | 1.6 | Texto corrido, leitura prolongada |
| **Medium** | 1.4 | Subtítulos, labels |
| **Semibold / Bold** | 1.2 | Títulos, números grandes |
| **Mono (dados)** | 1.3 | Tabelas, métricas |

### 4.3 O que NÃO fazer com texto

- ❌ Linhas com mais de 80 caracteres (em qualquer contexto).
- ❌ Blocos de texto sem parágrafos — parede de texto é o inimigo número 1 da clareza.
- ❌ Listas com mais de 5 itens sem subdivisão.
- ❌ Texto justificado (justify) — o espaçamento irregular entre palavras quebra a respiração.
- ❌ Tracking (letter-spacing) em texto corrido — apenas em labels e uppercase.
- ❌ Texto sobre fundo ocupado — o contraste é essencial para a respiração visual.

---

## 5. Densidade de Movimento

### 5.1 Limites de animação

| Regra | Especificação | Razão |
|---|---|---|
| **Máximo de 1 animação por vez** | Apenas um elemento pode estar animando em qualquer momento | Animação concorrente cria ansiedade visual |
| **Mínimo de 200ms entre animações** | Se duas animações precisam ocorrer, a segunda espera 200ms após a primeira terminar | Dá tempo ao cérebro de processar cada movimento |
| **Animações não podem ocupar > 20% da tela** | A área animada (incluindo elementos que se movem) não deve cobrir mais de 20% da viewport | Movimento excessivo rouba atenção do conteúdo |
| **Exceção: loading inteligente** | Pode ocupar até 40% | Loading é um estado temporário; o empresário precisa saber que algo está acontecendo |

### 5.2 Tipos de movimento e seu impacto

| Tipo | Impacto na respiração | Uso recomendado |
|---|---|---|
| **Fade** | Baixo — quase imperceptível | Transições de estado, aparecimento de elementos |
| **Translate (deslizamento)** | Médio — perceptível, suave | Painéis laterais, modais, entrada de cards |
| **Scale** | Alto — chama atenção | Apenas para momentos de destaque (insight) |
| **Bounce / Spring** | Muito alto — agita | **Nunca usar.** Viola a personalidade de CALMA. |
| **Rotação** | Alto — desorienta | Apenas para spinners de loading (e assim mesmo, fade é melhor) |
| **Pulse / piscar** | Extremo — prende atenção | **Nunca usar.** O olho humano não consegue ignorar. |

### 5.3 Movimento silencioso

O movimento na Ponte Digital deve ser tão suave que o empresário pode não notá-lo conscientemente, mas sente seus efeitos. Um card que aparece com fade+translate sutil é percebido como "natural" — não como "animação".

---

## 6. Densidade de Informação

### 6.1 Limites por tela

| Tipo de conteúdo | Máximo por tela | Por quê |
|---|---|---|
| **Indicadores numéricos** (KPIs visíveis) | 5 | Mais que 5, o cérebro não consegue processar sem esforço consciente |
| **Cards de hipótese** | 3 | Hipóteses exigem reflexão — mais que 3 vira lista, não reflexão |
| **Ações primárias** (botões principais) | 2 | Mais que 2 ações primárias, nenhuma é realmente prioritária |
| **Ações secundárias** | 5 | Incluindo links, botões secundários, ícones clicáveis |
| **Itens em lista (sem "ver mais")** | 7 | A lei de Miller: 7±2 itens na memória de trabalho |
| **Abas / Tabs** | 5 | Mais que 5 abas, o usuário não lembra qual é qual |
| **Notificações visíveis** | 1 | Múltiplas notificações competem — mostrar só a mais recente |
| **Gráficos na mesma viewport** | 2 | Gráficos exigem processamento visual intenso |
| **Cores semânticas diferentes** | 2 | Cada cor semântica adiciona um significado a ser processado |

### 6.2 A Lei do Número Único

> Em qualquer card, painel ou bloco de informação, deve haver **exatamente um número principal** — o mais importante. Os demais números são secundários e visualmente subordinados (menores, mais apagados, agrupados).

O empresário nunca deve se perguntar "para onde olho primeiro?" quando encontra um conjunto de números. O número principal é óbvio.

### 6.3 Regra da progressão informacional

A informação não deve ser apresentada toda de uma vez. Deve ser revelada em camadas:

1. **Camada 1 — O que importa agora** (o insight, o número principal, a ação recomendada)
2. **Camada 2 — O contexto** (dados de suporte, tendência, comparação)
3. **Camada 3 — Os detalhes** (tabela completa, histórico, raw data)

O empresário decide até onde quer descer. O default é a Camada 1.

---

## 7. Respiração por Estado da IA

### 7.1 IA falando

| Elemento | Espaçamento |
|---|---|
| Balão da IA | Padding interno 20px (top) + 16px (sides) + 12px (bottom) |
| Distância entre balões IA ↔ empresário | 24px |
| Distância entre balão e entrada de texto | 32px |
| Margem lateral | 24px (mínimo) |

### 7.2 IA pensando

| Elemento | Espaçamento |
|---|---|
| Indicador de pensamento | 48px acima do campo de entrada |
| Espaço ao redor do indicador | Mínimo 40% da viewport vazia |
| Mapa cognitivo (se visível) | 32px abaixo do indicador |

### 7.3 Dashboard

| Elemento | Espaçamento |
|---|---|
| Entre linhas de grade | 24px (vertical) |
| Entre colunas | 24px (horizontal) |
| Card para card | 16px |
| Insight principal para grade | 32px |
| Sidebar (se houver) | 24px de distância do conteúdo |

---

## 8. Verificações de Respiração

### 8.1 O teste do olho semicerrrado

Semicerrando os olhos, a tela deve mostrar **manchas claras e escuras equilibradas**. Se uma área escura (texto, cards) domina o campo visual, a tela precisa de mais respiro. Se a tela parece "cinza" demais, há espaço demais — está perdendo densidade útil.

### 8.2 O teste do foco único

OLhe para a tela por 2 segundos e feche os olhos. O que você lembra?

- Se lembra de **um** elemento claramente → respiração correta
- Se lembra de vários elementos competindo → respiração insuficiente
- Se não lembra de nada → respiração excessiva (pouca informação)

### 8.3 Checklist de respiração

- [ ] A densidade de espaço vazio está dentro da proporção do contexto?
- [ ] Não há mais de 2 ações primárias na tela?
- [ ] Não há mais de 5 indicadores numéricos visíveis?
- [ ] Não há mais de 3 cards de hipótese?
- [ ] Não há mais de 7 itens em lista sem "ver mais"?
- [ ] A linha de texto tem no máximo 70 caracteres?
- [ ] Não há mais de 2 gráficos na mesma viewport?
- [ ] Existe um número principal óbvio?
- [ ] O layout passaria no teste do olho semicerrado?
- [ ] O layout passaria no teste do foco único?
- [ ] Animações respeitam o limite de 1 por vez?
- [ ] Há pelo menos um "respiro" visual em cada quadrante da tela?

---

*Documento complementar: LINGUAGEM_VISUAL_OFICIAL.md (o que preenche o espaço), SISTEMA_OFICIAL_DE_RITMO.md (quando as coisas acontecem no espaço), SISTEMA_OFICIAL_DE_ATENCAO.md (para onde o olhar vai no espaço).*
