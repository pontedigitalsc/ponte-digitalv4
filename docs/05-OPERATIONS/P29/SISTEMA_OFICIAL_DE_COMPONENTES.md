# Sistema Oficial de Componentes

> *"Cada componente da Ponte Digital existe por uma razão. Nenhum é decorativo. Nenhum é acidental. Todos servem ao propósito de reduzir a distância entre o empresário e a decisão."*

---

## 1. Cards

### 1.1 Propósito

Agrupar informações relacionadas em unidade visual coesa. O card é o contêiner mais usado na Ponte Digital — é a "unidade de significado" da interface. Cada card contém exatamente UM conceito.

### 1.2 Variantes

| Variante | Propósito | Conteúdo típico | Cor de borda/ênfase |
|---|---|---|---|
| Card de Insight | Apresentar descoberta, padrão, conexão | Título, descrição, tags, confiança, botão de ação | Roxo Insight |
| Card de Hipótese | Mostrar suposição a ser validada | Título, evidências, indicador de força, botão "Validar" | Âmbar |
| Card de Recomendação | Sugerir ação baseada em insight | Título, descrição, impacto estimado, CTA | Azul Tranquilo |
| Card de Resumo | Destilar informação em formato condensado | Título, 2-3 bullets, métrica principal | Sem cor extra (neutro) |
| Card de Métrica | Apresentar número / KPI | Valor numérico, label, variação, sparkline opcional | Variável conforme o número |

### 1.3 Estrutura Interna

```
┌────────────────────────────────────────┐
│ ┌──────┐                               │
│ │ Ícone│  TÍTULO DO CARD               │
│ └──────┘  subtítulo ou metadado        │
│                                        │
│  CONTEÚDO PRINCIPAL                    │
│  (texto, lista, número, gráfico)       │
│                                        │
│  ┌────────┐  ┌────────┐               │
│  │ Tag 1  │  │ Tag 2  │               │
│  └────────┘  └────────┘               │
│                                        │
│  ─────────────────────────────────     │
│  Ação secundária           Ação prim.  │
└────────────────────────────────────────┘
```

**Regras de estrutura:**
- Título: H3 (1.25rem), sempre presente
- Ícone: opcional, 24x24px, cor do tema do card
- Subtítulo: Body Small (0.875rem), cor neutra, opcional
- Tags: bottom-left, wrap
- Ações: bottom-right, no máximo 2 ações
- Divisor interno: 1px sólido, cor neutra clara, opcional

### 1.4 Comportamento

| Estado | Comportamento |
|---|---|
| Padrão | Card estático, sem sombra ou sombra 1 (depende do fundo) |
| Hover | Elevação suave: translateY(-2px), sombra 2, transição 200ms |
| Click | Navega para detalhe ou expande conteúdo (300ms) |
| Foco (teclado) | Outline 2px na cor de ênfase do card |
| Entrada | Slide up (20px) + fade in (300ms), stagger de 100ms entre cards |
| Saída | Fade out (200ms) + collapse vertical |
| Carregando | Skeleton do card (mesma estrutura, sem conteúdo) |
| Erro no card | Borda vermelha sutil + mensagem interna |

### 1.5 Regras de Uso

1. **Nunca mais que 3 cards em linha.** Em desktop (12 colunas): 3 cards de 4 colunas cada. Em tablet: 2 cards. Em mobile: 1 card.
2. **Padding interno: 24px.** Exceção: card de métrica (16px), card de insight (32px).
3. **Cards no mesmo grupo têm a mesma altura.** Use flexbox com altura igual para todos os cards da linha.
4. **Card de insight é o único que pode ter cor de fundo diferente** (roxo muito claro, 5% de opacidade).
5. **Card clicável tem indicador visual** (cursor pointer, hover com elevação). Card não-clicável não tem hover.
6. **Card de métrica nunca tem borda colorida.** A métrica é o destaque, não a borda.
7. **Card de recomendação sempre tem CTA.** Se não tem ação, não é recomendação.
8. **Card de hipótese nunca é clicável** (não navega). A ação é "Validar" (botão interno).

### 1.6 O que NÃO fazer

- Colocar 4+ cards em linha
- Misturar variantes no mesmo grupo de cards
- Card com scroll interno
- Card com padding diferente do padrão
- Card sem título
- Card clicável sem indicador visual
- Card de insight sem cor de ênfase
- Card com bordas arredondadas inconsistentes (sempre 8px)
- Card que não se destaca do fundo (sempre usar sombra ou borda)

---

## 2. Listas

### 2.1 Propósito

Apresentar itens sequenciais de forma consistente e escaneável. A lista é o componente de "atemporalidade" — o empresário percorre, encontra, decide.

### 2.2 Variantes

| Variante | Uso | Colunas | Altura da linha | Comportamento |
|---|---|---|---|---|
| Lista de Clientes | CRM, visualização de empresas | Nome, contato, status, última atividade | 56px | Clique navega para detalhe |
| Lista de Insights | Histórico de descobertas | Título, área, data, confiança | 72px | Clique expande ou navega |
| Lista de Decisões | Registro de ações tomadas | Decisão, data, responsável, impacto | 64px | Clique abre detalhes |
| Timeline | Eventos em ordem cronológica | Evento, data, descrição | Variável | Scroll vertical, sem clique |
| Lista de Recomendações | Ações sugeridas | Título, área, urgência, CTA | 80px | CTA inline |

### 2.3 Estrutura de Linha

```
┌──────────────────────────────────────────────┐
│                                             │
│  ┌────────────┐  ┌──────┐  ┌──────┐        │
│  │  Coluna 1  │  │ Col2 │  │ Col3 │  Ícone  │
│  │  (principal)│  │      │  │      │  >      │
│  └────────────┘  └──────┘  └──────┘        │
│                                             │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─     │
│                                             │
│  ┌────────────┐  ┌──────┐  ┌──────┐        │
│  │  Item 2    │  │      │  │      │  >      │
│  └────────────┘  └──────┘  └──────┘        │
│                                             │
└──────────────────────────────────────────────┘
```

### 2.4 Comportamento

| Aspecto | Comportamento |
|---|---|
| Scroll | Vertical. Header fixo no topo da lista. |
| Header da coluna | Clique ordena (toggle crescente/decrescente). Indicador visual de ordenação. |
| Hover na linha | Fundo sutil (neutro, 3% opacidade). Cursor pointer (se clicável). |
| Linha ativa | Fundo mais escuro (neutro, 8% opacidade). Borda sutil à esquerda. |
| Linha sem dados | "---" em vez de vazio. |
| Alternância | Linhas alternam fundo (par: neutro 0%; ímpar: neutro 2%). |
| Empty state | Texto centralizado "Nenhum item encontrado" + CTA opcional. |

### 2.5 Regras de Uso

1. **Cada linha = uma informação.** Uma linha nunca contém dois conceitos diferentes.
2. **Máximo 3 colunas de dados.** A primeira coluna é sempre o identificador principal.
3. **Primeira coluna tem peso visual maior** (semi-bold, cor primária do texto).
4. **Scroll infinito para listas > 50 itens.** Paginação para < 50 itens (5, 10, 25 por página).
5. **Lista de timeline: sem grid de colunas.** Eventos em bloco, ordenados por data.
6. **Lista de clientes: ordenação padrão por nome.** Alternativa: último contato.
7. **Lista de insights: ordenação padrão por data (mais recente primeiro).**
8. **Divisor entre linhas:** 1px sólido, cor neutra muito clara (opacidade 0.1). Linhas não clicáveis têm divisor completo; clicáveis têm divisor com recuo de 16px.
9. **Timeline: usar conector visual (linha vertical + bolinhas) entre eventos.**

### 2.6 O que NÃO fazer

- Lista com 5+ colunas de dados
- Linha com altura variável inconsistente
- Linha clicável sem indicador de clique (seta, hover)
- Lista sem header de coluna
- Lista sem ordenação funcional
- Linhas sem divisor (confunde onde uma termina e outra começa)
- Timeline sem conector visual
- Scroll infinito sem indicador de carregamento

---

## 3. Painéis

### 3.1 Propósito

Agrupar informações contextuais que apoiam a decisão sem ser o foco principal. O painel é o "segundo nível" — está lá quando o empresário precisa, mas não compete com o conteúdo primário.

### 3.2 Variantes

| Variante | Conteúdo | Posição | Comportamento |
|---|---|---|---|
| Painel Cognitivo | Áreas de conhecimento, indicadores por área | Sidebar direita (conversa) | Colapsável, fixo no viewport |
| Painel de Confiança | Nível de confiança por insight, evidências | Abaixo do insight | Expansível, inline |
| Painel de Hipóteses | Hipóteses ativas, status de validação | Sidebar ou abaixo da conversa | Colapsável, scrollável |
| Painel de Diagnóstico | Resumo do diagnóstico completo | Abaixo do insight principal | Expansível, seções internas |

### 3.3 Estrutura

```
┌───────────────────────┐
│  TÍTULO DO PAINEL     │
│  ───────────────────  │
│                        │
│  Seção 1               │
│  ┌─────────────────┐  │
│  │ Item            │  │
│  │ Item            │  │
│  │ Item            │  │
│  └─────────────────┘  │
│                        │
│  Seção 2               │
│  ┌─────────────────┐  │
│  │ Item            │  │
│  │ Item            │  │
│  └─────────────────┘  │
│                        │
└───────────────────────┘
```

### 3.4 Comportamento

| Aspecto | Comportamento |
|---|---|
| Padrão | Visível, largura fixa (320px), altura total da viewport |
| Colapsado | Apenas ícone + label visível (sidebar fina de 48px) |
| Expansão | Slide lateral (300ms), conteúdo fade in (200ms depois) |
| Colapso | Slide lateral reverso (200ms) |
| Rolagem | Scroll interna (se o conteúdo exceder a altura) |
| Fixação | No viewport (acompanha scroll da página) |
| Painel inline (expansível) | Expande verticalmente, empurra conteúdo abaixo |

### 3.5 Regras de Uso

1. **Painel fixo:** usado em tela de conversa. Sempre disponível, nunca obrigatório.
2. **Painel expansível:** usado em dashboard e detalhe. Expande inline sem sobreposição.
3. **Painel cognitivo:** visível em wide, colapsado em desktop, oculto em tablet/mobile (acessível por botão flutuante).
4. **Painel de confiança:** sempre abaixo do insight que referencia. Inline. Expansível.
5. **Painel de hipóteses:** visível durante análise. Pode ficar aberto ou colapsado conforme preferência.
6. **Painel nunca contém ação primária.** Ações primárias estão no conteúdo principal.
7. **Painel com scroll interno nunca mistura scroll da página.** Scroll do painel é independente.
8. **Painel colapsável tem ícone claro de expandir/colapsar** (seta ou hambúrguer).
9. **Painel não pode ter mais que 4 seções.** Mais que 4: o conteúdo merece uma tela própria.

### 3.6 O que NÃO fazer

- Painel com ação primária
- Painel que compete visualmente com o conteúdo principal
- Painel com largura variável (sempre fixa: 320px expandido, 48px colapsado)
- Painel sem scroll interno (conteúdo cortado não é aceitável)
- Painel que não preserva estado (fechou ao navegar? perdeu a posição de scroll?)
- Painel com mais de 4 seções

---

## 4. Gráficos

### 4.1 Propósito

Visualizar padrões, distribuições e evoluções que texto não conseguiria comunicar com a mesma eficiência. O gráfico na Ponte Digital não é decorativo — ele revela.

### 4.2 Variantes

| Variante | Uso | Dados | Quando usar |
|---|---|---|---|
| Barra | Comparar valores entre categorias | Discreto, até 12 categorias | "Receita por mês", "Insights por área" |
| Linha | Mostrar evolução ao longo do tempo | Contínuo, temporal | "Confiança ao longo do tempo", "Progresso" |
| Donut | Mostrar proporção de um todo | Percentual, até 5 fatias | "Distribuição por área", "Composição" |
| Radar | Mapa cognitivo — comparar múltiplas variáveis | 5-8 eixos, 1-2 séries | "Saúde do negócio", "Cobertura cognitiva" |

### 4.3 Comportamento

| Aspecto | Comportamento |
|---|---|
| Entrada | Animação progressiva (500ms-800ms). Barra: cresce de baixo. Linha: desenha da esquerda. Donut: preenche em círculo. Radar: revela por eixo. |
| Hover | Tooltip com valor exato. Destaque sutil no elemento. |
| Click | Em barra/linha: filtra ou explora aquele ponto. Em donut: isola a fatia. Em radar: expande eixo. |
| Empty | "Sem dados suficientes" no centro do espaço do gráfico |
| Loading | Skeleton no formato do gráfico |
| Redimensionamento | Reflow responsivo (mantém proporção) |

### 4.4 Regras de Uso

1. **Máximo 2 gráficos por tela.** Nunca mais. Gráficos competem entre si.
2. **Nunca gráfico 3D.** 3D distorce percepção, adiciona profundidade falsa, não é informativo.
3. **Gráfico sempre tem título** (H4, 1.125rem).
4. **Gráfico sempre tem rótulo claro nos eixos.** Eixo X e Y nomeados.
5. **Tooltip sempre mostra valor exato.** Usuário não deve precisar adivinhar.
6. **Cores dos gráficos seguem o sistema de cores oficial.** Nunca usar cores arbitrárias.
7. **Donut: máximo 5 fatias.** Acima disso, agrupar em "Outros".
8. **Donut: o valor central mostra o total ou a média.**
9. **Radar: usar apenas para mapa cognitivo.** Radar não serve para outros fins.
10. **Gráfico de linha: máximo 3 séries.** Mais que 3: ilegível.
11. **Gráfico de barra: máximo 12 barras.** Mais que 12: horizontal ou agrupamento.
12. **Gráfico sem animação em telas de consulta rápida.** Animação apenas na primeira exibição.
13. **Acessibilidade:** gráfico deve ter descrição textual alternativa para leitores de tela.

### 4.5 Mapa Cognitivo (Radar)

| Propriedade | Valor |
|---|---|
| Eixos | 5-8 áreas de conhecimento |
| Série 1 | Nível atual de conhecimento da empresa |
| Série 2 | Benchmark ou meta (opcional, tracejado) |
| Escala | 0-100 (percentual) |
| Cor da área | Preenchimento com opacidade 0.15 + borda com opacidade 0.8 |
| Interação | Hover no eixo mostra detalhes da área |

**Regras específicas do radar:**
- Sempre animado na entrada (os eixos se revelam em sequência, 100ms por eixo)
- O preenchimento da área deve ser semi-transparente para não esconder o grid
- Rótulos dos eixos fora do círculo, legíveis, sem rotação
- Se houver segunda série (benchmark), usar linha tracejada sem preenchimento

### 4.6 O que NÃO fazer

- Gráfico 3D em qualquer contexto
- 3+ gráficos na mesma tela
- Gráfico sem título ou sem rótulos
- Donut com 8 fatias minúsculas
- Gráfico com cores que não seguem o sistema oficial
- Gráfico com animação infinita (anima apenas na entrada)
- Gráfico sem tooltip de valor exato
- Radar fora do mapa cognitivo
- Gráfico de linha com 4+ séries
- Gráfico de barra vertical com 20 barras (usar horizontal)

---

## 5. Inputs

### 5.1 Propósito

Coletar informações do empresário de forma clara, eficiente e sem atrito. O input na Ponte Digital é conversa — nunca formulário frio.

### 5.2 Variantes

#### 5.2.1 Campo de Texto (Text Input)

| Propriedade | Conversa | Formulário |
|---|---|---|
| Linhas | Multi-linha (auto-resize, 1-6 linhas) | Single-line |
| Largura | 100% do container | Definida pelo contexto (min 240px, max 480px) |
| Placeholder | Texto contextual ("Digite sua resposta...") | Label funcional ("Nome da empresa") |
| Comportamento | Enter envia. Shift+Enter quebra linha. | Enter não envia (a menos que único campo). |
| Validação | Feedback visual sutil (borda) | Inline, abaixo do campo |
| Altura mínima | 48px | 44px |
| Altura máxima | 200px (com scroll) | 48px |

**Estados:**
- Padrão: borda 1px neutra, fundo branco, placeholder visível
- Foco: borda Azul Tranquilo, glow sutil (box-shadow 0 0 0 2px rgba(azul, 0.1))
- Preenchido: fundo branco, texto visível, placeholder oculto
- Erro: borda vermelha suave, mensagem de erro abaixo (4px após input)
- Desabilitado: opacidade 0.5, cursor not-allowed
- Loading: shimmer fino na borda ou spinner pequeno à direita

#### 5.2.2 Textarea

| Propriedade | Valor |
|---|---|
| Uso | Respostas longas, descrições, notas |
| Linhas mínimas | 3 |
| Linhas máximas | 10 (auto-resize entre esses limites) |
| Largura | 100% do container |
| Corner | Canto inferior direito com indicador de redimensionamento (opcional) |
| Comportamento | Enter quebra linha. Envio por botão ou Cmd+Enter. |
| Placeholder | Descritivo ("Descreva o que você observou...") |

#### 5.2.3 Select

| Propriedade | Valor |
|---|---|
| Uso | Opções predefinidas |
| Itens máximos no dropdown | 7 |
| Largura | Definida pelo conteúdo (min 160px) |
| Comportamento | Clique abre dropdown. Clique fora fecha. Teclado navega. |
| Opção padrão | "Selecionar..." (placeholder, não selecionável) |
| Busca interna | Se mais de 5 opções, incluir campo de busca no dropdown |
| Dropdown | Camada 3 (z-index: 300), 8px abaixo do campo, sombra 3 |

**Para mais de 7 opções:** usar select com busca (autocomplete). Não usar select nativo do navegador.

#### 5.2.4 Radio e Checkbox

| Regra | Valor |
|---|---|
| Preferência | Evitar. Preferir select ou cards clicáveis. |
| Quando usar | Apenas quando há 2-3 opções mutuamente exclusivas (radio) ou múltiplas escolhas (checkbox) |
| Tamanho mínimo | 20x20px |
| Label | À direita, body (1rem), clicável |

**Exceção:** Radio é aceitável para "Sim/Não/Não sei" e Checkbox para "Selecionar tudo" / "Concordo com os termos".

#### 5.2.5 Date Picker

| Propriedade | Valor |
|---|---|
| Uso | Apenas quando necessário (datas específicas) |
| Formato | dd/mm/aaaa (Brasil) |
| Comportamento | Clique abre calendário. Input manual aceito. |
| Validação | Data válida, não futura (se for passado) |
| Acessibilidade | Navegação por teclado no calendário |

**Preferir:** "Hoje", "Essa semana", "Esse mês" (chips) em vez de date picker sempre que possível.

### 5.3 Regras Gerais de Input

1. **Label sempre presente acima do input.** Placeholder não substitui label (acessibilidade).
2. **Label em Body Small (0.875rem),** semi-bold (600), cor neutra escura.
3. **Espaçamento label-input:** 8px.
4. **Espaçamento input-próximo elemento:** 16px.
5. **Mensagem de erro:** 4px abaixo do input, Body Small (0.875rem), cor vermelha suave.
6. **Input desabilitado:** opacidade 0.5, sem sombra, sem glow.
7. **Tamanho mínimo de toque:** 44px (mobile). 36px (desktop, exceto em formulários críticos).
8. **Input sempre tem borda visível** (1px). Sempre contrasta com o fundo.
9. **Grupo de inputs relacionados** tem padding de 16px entre eles.
10. **Auto-completar:** ativar para campos previsíveis (nome, email, empresa).

### 5.4 O que NÃO fazer

- Input sem label (apenas placeholder)
- Input com placeholder como label (quebra acessibilidade)
- Select com 15 itens e sem busca
- Radio/Checkbox como padrão para qualquer escolha
- Date picker para "mês corrente" (usar chip)
- Input de 100% de largura em formulário no desktop (máximo 480px)
- Input sem estado de erro visual
- Input desabilitado sem indicação clara (cursor, opacidade)
- Textarea sem limite máximo (pode crescer infinitamente)

---

## 6. Botões

### 6.1 Propósito

Iniciar ações. O botão na Ponte Digital é o ponto de virada — onde o empresário sai da leitura e entra na ação.

### 6.2 Variantes

| Variante | Destaque | Cor | Quantidade por tela | Uso |
|---|---|---|---|---|
| Primário | Alto | Azul Tranquilo (ou cor da ação) | 1 | Ação principal da tela |
| Secundário | Médio | Fundo branco, borda 1px | Até 2 | Ações de apoio |
| Terciário | Baixo | Link (apenas texto, sem fundo) | Ilimitado | Ações complementares |
| Icon Button | Variável | Sem label, apenas ícone | 2-3 | Ações universais |

#### 6.2.1 Botão Primário

| Propriedade | Valor |
|---|---|
| Largura | Definida pelo conteúdo (min 120px) |
| Preenchimento | 12px 24px |
| Border radius | 8px |
| Cor de fundo | Azul Tranquilo (primário) |
| Cor do texto | Branco |
| Hover | Escurecer 10% (overlay preto com opacidade 0.1) |
| Active | Escurecer 20% |
| Disabled | Opacidade 0.4, cursor not-allowed, sem hover |
| Loading | Spinner substitui o texto (mantém largura) |

#### 6.2.2 Botão Secundário

| Propriedade | Valor |
|---|---|
| Largura | Definida pelo conteúdo (min 100px) |
| Preenchimento | 12px 24px |
| Border radius | 8px |
| Cor de fundo | Branco / transparente |
| Borda | 1px sólida, cor neutra escura (opacidade 0.3) |
| Cor do texto | Cor do texto primário |
| Hover | Fundo sutil (neutro 5%) |
| Disabled | Opacidade 0.4 |

#### 6.2.3 Botão Terciário

| Propriedade | Valor |
|---|---|
| Aparência | Link (apenas texto) |
| Preenchimento | 4px 8px (vertical menor) |
| Cor | Azul Tranquilo ou cor do texto |
| Hover | Sublinhado ou opacidade 0.7 |
| Disabled | Opacidade 0.3 |

#### 6.2.4 Icon Button

| Propriedade | Valor |
|---|---|
| Tamanho | 44x44px (mínimo) |
| Ícone | 20x20px |
| Border radius | 8px |
| Fundo | Transparente |
| Hover | Fundo circular sutil (neutro 10%) |
| Tooltip | Sempre presente (descreve a ação) |
| Uso | Fechar, configurar, ajuda, notificações |

### 6.3 Regras de Uso

1. **No máximo 1 botão primário por tela.** Apenas um. A ação principal é única.
2. **Até 2 botões secundários por tela.** Se precisar de mais, as ações secundárias são botões terciários.
3. **Label sempre visível.** Botão sem texto só é aceitável para icon buttons.
4. **Ícone é opcional.** Se usado, 20x20px, 8px de distância do label. Ícone à esquerda.
5. **Tamanho mínimo de toque: 44px** (mobile). 36px (desktop).
6. **Botão em formulário:** primário à esquerda, secundário à direita. Terciário distante.
7. **Botão loading:** spinner substitui o texto. Largura do botão não muda (evitar reflow).
8. **Botão desabilitado:** nunca esconder o motivo. Tooltip opcional explicando por que está desabilitado.
9. **Grupo de botões:** 8px de gutter entre eles.
10. **CTA em card de insight:** botão primário no card, mas se for o único CTA da tela, pode ser secundário para não competir com o CTA principal da página.

### 6.4 Hierarquia de Ações por Contexto

| Contexto | Primário | Secundário | Terciário |
|---|---|---|---|
| Conversa | Enviar (junto ao input) | Cancelar / Limpar | Ver histórico |
| Dashboard | Explorar insight | Compartilhar / Exportar | Configurar |
| Lista de clientes | Adicionar cliente | Filtrar / Ordenar | Ver todos |
| Detalhe de insight | Aplicar recomendação | Ver evidências | Compartilhar |
| Modal de confirmação | Confirmar | Cancelar | — |
| Formulário | Salvar | Cancelar | Descartar alterações |

### 6.5 O que NÃO fazer

- Dois botões primários na mesma tela
- Botão sem label (exceto icon button)
- Botão com largura fixa que corta o texto
- Botão desabilitado sem explicação
- Botão loading que muda de largura
- Botão terciário que parece link (mas não navega — confunde)
- Icon button sem tooltip
- Botão "Voltar" como ação primária
- Botão que abre modal sem indicar (seta ou "..." após label)
- Botão com padding insuficiente (< 12px vertical)

---

## 7. Modais e Sheets

### 7.1 Propósito

| Componente | Propósito |
|---|---|
| Modal | Ações que exigem foco total do empresário: confirmar decisão, editar informação crítica, exibir conteúdo que não pode ser ignorado |
| Sheet | Ações que exigem contexto parcial: ver detalhes de um item, histórico, informações complementares sem perder a tela atual |

### 7.2 Variantes

#### 7.2.1 Modal

| Propriedade | Valor |
|---|---|
| Tamanhos | Pequeno (400px), Médio (560px), Grande (720px) |
| Posição | Centro da viewport |
| Backdrop | Preto, opacidade 0.4 |
| Fechamento | Escape key + clique no backdrop |
| Transição | Fade in (200ms) + scale (0.95 → 1.0) |
| Saída | Fade out (150ms) |
| Largura em mobile | 100% (com margem 16px) |
| Altura máxima | 90% da viewport |
| Scroll | Interno (se o conteúdo exceder) |

```
┌──────────────────────────────────────────┐
│                                          │
│  ┌────────────────────────────────┐      │
│  │  ┌──────  TÍTULO  ──────  ✕  │      │
│  │  ├────────────────────────────┤      │
│  │  │                            │      │
│  │  │     CONTEÚDO               │      │
│  │  │     (scrollável)           │      │
│  │  │                            │      │
│  │  ├────────────────────────────┤      │
│  │  │  Ação sec.     Ação prim.  │      │
│  │  └────────────────────────────┘      │
│  │                                       │
│  └────────────────────────────────┘      │
│                                          │
└──────────────────────────────────────────┘
```

**Estrutura do modal:**
- Header: título (H3) + botão fechar (✕). 24px padding.
- Conteúdo: scrollável, 24px padding. Máximo 3 seções internas.
- Footer: ações. 24px padding, 16px entre ações. Primário à direita.

#### 7.2.2 Sheet

| Propriedade | Valor |
|---|---|
| Posição | Direita (padrão), Esquerda (raro) |
| Largura | 400px (desktop), 100% (mobile) |
| Altura | 100% da viewport |
| Backdrop | Preto, opacidade 0.2 |
| Fechamento | Escape key + clique no backdrop + botão fechar |
| Transição | Slide horizontal (250ms) |
| Saída | Slide reverso (200ms) |

```
┌───────────────┬────────────────────────┐
│               │                        │
│   CONTEÚDO    │  ┌────────────────┐    │
│   PRINCIPAL   │  │  ✕  TÍTULO    │    │
│   (escurecido)│  │               │    │
│               │  │  CONTEÚDO     │    │
│               │  │  DA SHEET     │    │
│               │  │               │    │
│               │  │               │    │
│               │  └────────────────┘    │
│               │                        │
└───────────────┴────────────────────────┘
```

### 7.3 Comportamento

| Aspecto | Modal | Sheet |
|---|---|---|
| Abertura | Fade + scale (200ms) | Slide da direita (250ms) |
| Fechamento | Fade out (150ms) | Slide reverso (200ms) |
| Backdrop | Opacidade 0.4 | Opacidade 0.2 |
| Clique no backdrop | Fecha | Fecha |
| Escape key | Fecha | Fecha |
| Scroll do body | Bloqueado | Bloqueado |
| Scroll interno | Ativado | Ativado |
| Foco inicial | Primeiro input ou botão primário | Título |
| Retorno de foco | Elemento que abriu | Elemento que abriu |

### 7.4 Regras de Uso

1. **Nunca modal sobre modal.** Se precisar de confirmação dentro de um modal, substitua o conteúdo (não empilhe).
2. **Máximo 1 sheet aberta.** Se abrir outra, a atual fecha primeiro.
3. **Modal não abre com sheet aberta.** Feche a sheet antes.
4. **Modal de confirmação:** use o tamanho Pequeno (400px). Título + mensagem + 2 botões. Sem scroll.
5. **Modal de edição:** use o tamanho Médio (560px). Formulário com scroll se necessário.
6. **Modal de detalhes:** use o tamanho Grande (720px). Conteúdo rico, scroll.
7. **Sheet para detalhes rápidos:** informação complementar que o empresário consulta e fecha.
8. **Sheet para histórico:** acesso ao passado sem perder o presente.
9. **Modal crítico (exclusão, ação irreversível):** botão primário vermelho (perigo), não azul.
10. **Modal de sucesso:** não existe. Sucesso é toast ou mudança na tela.
11. **Sheet tem título H3.** Modal tem título H3.
12. **Sheet pode ter abas internas** (máximo 3). Modal não tem abas.
13. **Sheet pode ter footer fixo.** Modal sempre tem footer fixo.
14. **Sheet em mobile: full-width** (100% - 16px de margem), altura total.
15. **Modal em mobile: full-width** (100% - 16px de margem), altura 90% viewport.

### 7.5 O que NÃO fazer

- Modal sobre modal
- Sheet sobre sheet
- Modal com sheet aberta
- Sheet sem backdrop (perde o contexto)
- Modal sem scroll quando conteúdo excede (conteúdo cortado)
- Sheet que cobre header de navegação (navegação deve ficar visível ou ter substituto)
- Modal de erro (preferir mensagem inline ou toast)
- Modal de "sucesso" (toast é suficiente)
- Sheet com 5 seções de conteúdo (máximo 3)
- Modal ou sheet sem título
- Botão de fechar ausente ou escondido

---

## 8. Toasts

### 8.1 Propósito

Feedback temporário sobre uma ação concluída. O toast informa sem interromper — o empresário continua seu fluxo enquanto recebe a confirmação.

### 8.2 Variantes

| Variante | Cor | Uso | Duração | Ação |
|---|---|---|---|---|
| Sucesso | Verde | Ação concluída com êxito | 4s (auto-dismiss) | Opcional (desfazer) |
| Erro | Vermelho suave | Ação falhou | Permanente (até ação) | "Tentar novamente" |
| Alerta | Âmbar | Aviso não-crítico | 4s (auto-dismiss) | "Ver" ou "Ignorar" |
| Informação | Neutro (cinza) | Informação não-urgente | 4s (auto-dismiss) | Nenhuma |

### 8.3 Estrutura

```
┌──────────────────────────────────────┐
│  ┌──────┐                            │
│  │ ícone│  Mensagem de feedback     │
│  └──────┘                            │
│                          ┌────────┐  │
│                          │  Ação  │  │
│                          └────────┘  │
└──────────────────────────────────────┘
```

- Ícone: 20x20px, cor da variante
- Mensagem: Body Small (0.875rem), máximo 120 caracteres
- Ação: link-style (terciário), opcional
- Botão fechar: icon button (✕), opcional (para erro)
- Padding: 12px 16px

### 8.4 Comportamento

| Aspecto | Comportamento |
|---|---|
| Entrada | Slide down (do topo) + fade in, 300ms |
| Visível | 4 segundos (sucesso, alerta, info) |
| Saída automática | Fade out + slide up, 300ms |
| Saída manual | Fade out, 200ms |
| Hover | Pausa o timer de auto-dismiss |
| Empilhamento | Até 3 toasts empilhados (8px entre eles) |
| Posição | Topo centralizado (sempre) |
| Altura | 56px (1 linha), 72px (2 linhas) |

### 8.5 Regras de Uso

1. **Sucesso:** após ação do empresário (salvar, enviar, excluir). "Empresa cadastrada com sucesso."
2. **Erro:** quando uma ação falha. "Não foi possível salvar. Tente novamente." Botão "Tentar novamente" obrigatório.
3. **Alerta:** ação com efeito colateral. "Isso afetará os insights ativos."
4. **Informação:** evento de background. "Novo insight disponível."
5. **Toast nunca é o único feedback de erro.** Erro em formulário usa mensagem inline + toast.
6. **Toast de sucesso não tem ação obrigatória.** "Desfazer" é opcional e raro.
7. **Toast de erro dura até o empresário agir.** Não desaparece sozinho.
8. **Toast nunca cobre botão primário.** Posição: topo centralizado, abaixo da topbar.
9. **Toast empilhado: o mais recente fica no topo.**
10. **Toast sem ícone?** Nunca. Ícone é a primeira coisa que o olho identifica (cor + símbolo).

### 8.6 O que NÃO fazer

- Toast que desaparece sem o empresário ler (mínimo 4s, mas hover pausa)
- Toast no canto inferior direito (padrão "moderno" — não funciona com layout de conversa)
- Toast com 3 linhas de texto (máximo 2 linhas, 120 caracteres)
- Toast sem contraste com o fundo (sempre ter fundo sólido + sombra)
- Toast que compete com modal (se modal está aberto, toast espera)
- Toast de erro sem ação (o empresário fica sem saber o que fazer)
- Toast que cobre informação importante no topo
- Mais de 3 toasts visíveis (qualidade sobre quantidade)

---

## 9. Badges, Chips e Tags

### 9.1 Badge

| Propriedade | Valor |
|---|---|
| Propósito | Notificações, contagem, alertas numéricos |
| Formato | Circular ou pill (arredondado) |
| Conteúdo | Número (1-99), "99+" para acima |
| Tamanho | 20px (com número), 10px (ponto) |
| Cor | Vermelho (notificação), Cinza (informativo) |
| Posição | Canto superior direito do elemento pai |

**Comportamento:**
- Badge de notificação aparece com fade in (200ms)
- Badge some quando o conteúdo é acessado
- Badge "99+" indica muitos itens pendentes
- Badge ponto (sem número): notificação não visualizada

**Regras:**
- Badge numérico: máximo 3 dígitos ("99+")
- Badge nunca aparece em elemento desabilitado
- Badge não é clicável — o elemento pai que é

### 9.2 Chip

| Propriedade | Valor |
|---|---|
| Propósito | Status, categorias, estados |
| Formato | Pill (border-radius: 999px) |
| Conteúdo | Label + cor de fundo |
| Tamanho | 24px altura, padding horizontal 8px |
| Cor | Variável conforme o status |

**Chips de Status:**

| Status | Cor de fundo | Cor do texto |
|---|---|---|
| Ativo / Concluído | Verde claro (opacidade 0.15) | Verde escuro |
| Pendente / Em análise | Âmbar claro (opacidade 0.15) | Âmbar escuro |
| Inativo / Parado | Cinza claro (opacidade 0.15) | Cinza escuro |
| Crítico / Urgente | Vermelho claro (opacidade 0.15) | Vermelho escuro |
| Novo | Azul claro (opacidade 0.15) | Azul escuro |
| Validado | Roxo claro (opacidade 0.15) | Roxo escuro |

**Comportamento:**
- Chip não é clicável (apenas informativo)
- Chip pode ter ícone à esquerda (12x12px)
- Chip pode ter ação de remoção (✕) quando usado como filtro ativo

**Regras:**
- Chip sempre tem label legível (mínimo 0.75rem)
- Chip nunca aparece sem cor de fundo (seria apenas texto)
- Máximo 5 chips em linha (depois: wrap ou "+N")

### 9.3 Tag

| Propriedade | Valor |
|---|---|
| Propósito | Assuntos, áreas, temas |
| Formato | Pill com borda (sem fundo sólido) |
| Conteúdo | Label + ícone opcional |
| Tamanho | 28px altura, padding horizontal 12px |
| Aparência | Borda 1px, fundo transparente |

**Comportamento:**
- Tag pode ser clicável (filtro, navegação para área)
- Tag clicável tem hover: fundo sutil (opacidade 0.05)
- Tag pode ser selecionável (fundo preenchido quando ativa)
- Tag tem ícone à esquerda (16x16px)

**Regras:**
- Tag sempre tem borda visível
- Tag sem ícone só quando o label é auto-explicativo
- Máximo 3 tags por card. Mais que 3: expandir em "Ver todas"
- Tags clicáveis têm cursor pointer
- Tags selecionáveis têm estado ativo (fundo + borda mais escura)

### 9.4 O que NÃO fazer (Badges, Chips, Tags)

- Badge sem número nem ponto (o que indica?)
- Badge em elemento que não é clicável (badge notifica ação, ação precisa existir)
- Chip com cor arbitrária (sempre usar o mapa de cores oficial)
- Chip sem label (apenas cor — inacessível)
- Tag sem borda (confunde com chip)
- Tag clicável sem indicador visual (hover, cursor)
- Misturar chip e tag no mesmo contexto sem critério claro

---

## 10. Indicadores

### 10.1 Barra de Conhecimento

| Propriedade | Valor |
|---|---|
| Propósito | Mostrar progresso de conhecimento por área |
| Formato | Barra horizontal com preenchimento |
| Altura | 8px (fina), 12px (média), 16px (larga) |
| Largura | 100% do container |
| Preenchimento | Gradiente ou cor sólida por área |
| Rótulo | Label da área + valor percentual |
| Comportamento | Animação de preenchimento na entrada (500ms) |

**Variantes:**
- Barra fina (8px): em cards de métrica, sem label
- Barra média (12px): em painéis, com label ao lado
- Barra larga (16px): em indicadores principais, com label + valor + variação

**Regras:**
- Barra de conhecimento usa cor da área correspondente (consulte sistema de cores)
- Valor sempre em percentual (0-100%)
- Variação opcional: seta para cima/baixo + valor absoluto
- Barra vazia (0%): preenchimento 0, mas com borda sutil para indicar que existe
- Barra completa (100%): apenas para áreas totalmente mapeadas

### 10.2 Anel de Confiança

| Propriedade | Valor |
|---|---|
| Propósito | Nível de confiança em insights, recomendações, dados |
| Formato | Círculo com preenchimento progressivo (arc) |
| Tamanho | 40px (pequeno), 56px (médio), 80px (grande) |
| Espessura | 4px (pequeno), 6px (médio), 8px (grande) |
| Valor central | Percentual (número) |
| Cor | Gradiente: vermelho → âmbar → verde conforme o valor |
| Comportamento | Animação de preenchimento na entrada (600ms, easing) |

**Faixas de confiança:**

| Valor | Cor | Significado |
|---|---|---|
| 0-30% | Vermelho | Baixa confiança — dados insuficientes |
| 31-60% | Âmbar | Confiança moderada — em evolução |
| 61-80% | Verde claro | Confiança boa — consistente |
| 81-100% | Verde escuro | Confiança alta — validado |

**Regras:**
- Anel sempre mostra o valor percentual no centro
- Anel pequeno (40px): apenas em listas e cards compactos
- Anel médio (56px): em cards de insight e painéis
- Anel grande (80px): no dashboard como indicador principal
- Anel nunca é usado sem contexto (sempre acompanhado de label)

### 10.3 Timeline

| Propriedade | Valor |
|---|---|
| Propósito | Histórico de eventos em ordem cronológica |
| Formato | Linha vertical com marcadores + cards de evento |
| Largura da linha | 2px, cor neutra |
| Marcador | Círculo de 12px, cor conforme o tipo de evento |
| Espaçamento entre eventos | 24px |
| Conector | Linha vertical conectando os marcadores |

**Variantes:**

| Tipo de evento | Cor do marcador | Ícone |
|---|---|---|
| Insight descoberto | Roxo | Lâmpada |
| Decisão tomada | Azul | Check |
| Recomendação aplicada | Verde | Seta |
| Hipótese validada | Âmbar | Experimental |
| Evento do sistema | Cinza | Gear |

**Comportamento:**
- Timeline entra com fade in + slide up (300ms, stagger 100ms)
- Marcadores clicáveis abrem detalhes (modal ou sheet, conforme o contexto)
- Rótulo de data à esquerda do marcador (caption, 0.75rem, cor neutra)
- Conteúdo do evento à direita do marcador (body small, 0.875rem)

**Regras:**
- Timeline sempre ordenada do mais recente para o mais antigo
- Máximo 10 eventos visíveis (mais: "Ver histórico completo" no final)
- Timeline sem eventos: "Nenhum evento registrado ainda"
- Marcador sem conector no primeiro e no último evento
- Eventos do mesmo dia: agrupar sob o mesmo marcador de data

### 10.4 Indicador de Processo (Loading Inteligente)

| Propriedade | Valor |
|---|---|
| Propósito | Mostrar progresso de processamento cognitivo |
| Formato | Texto dinâmico + indicador sutil (pulsação ou barra) |
| Posição | Substitui o conteúdo que está sendo processado |
| Hierarquia | Mantém o layout futuro (skeleton) |

**Comportamento:**

| Tempo | Comportamento |
|---|---|
| 0-1s | Skeleton (sem texto) |
| 1-3s | Skeleton + "Analisando dados..." |
| 3-6s | Skeleton + "Identificando padrões..." |
| 6-10s | Skeleton + "Comparando com benchmarks..." |
| 10s+ | Skeleton + "Ainda processando... quer continuar em segundo plano?" |

**Regras:**
- Texto dinâmico: muda a cada 3s, mostrando o que está sendo processado
- Sempre mostrar o contexto: "Analisando dados financeiros do último trimestre" em vez de "Carregando..."
- Indicador de processo nunca é um spinner solitário no centro da tela
- O layout do skeleton corresponde exatamente ao layout do conteúdo futuro
- Loading inteligente tem botão "Cancelar" (se aplicável)

### 10.5 O que NÃO fazer (Indicadores)

- Barra de conhecimento sem label (o que está sendo medido?)
- Anel de confiança sem valor numérico (percentual no centro é obrigatório)
- Timeline com eventos de tipos diferentes sem distinção visual
- Timeline sem conector entre eventos (perde a noção de continuidade)
- Loading spinner sem contexto (o que está carregando?)
- Skeleton que não corresponde ao layout real (confunde na transição)
- Indicador de processo que nunca termina (timeout + "Tentar novamente")
- Anel de confiança sem cor gradiente (apenas um número não comunica)
- Barra de conhecimento sem variação (evolução é tão importante quanto o estado atual)
- Timeline com mais de 10 eventos sem link para ver mais

---

## 11. Componentes e o Contexto de Uso

### 11.1 Matriz: Qual componente usar

| Situação | Componente recomendado | Evitar |
|---|---|---|
| Mostrar um padrão descoberto | Card de Insight | Lista, Apenas texto |
| Mostrar vários padrões | Lista de Insights + Card de Insight (principal) | Vários cards grandes |
| Confirmar ação destrutiva | Modal Pequeno | Toast, Sheet |
| Mostrar detalhes sem sair da tela | Sheet | Modal (perde contexto) |
| Feedback rápido de ação | Toast | Modal, Sheet |
| Escolher entre 2-3 opções | Select ou Card clicável | Radio (exceto Sim/Não) |
| Escolher entre 4-7 opções | Select | Radio, Checkbox |
| Escolher data | Date picker (ou chips de período) | Input de texto |
| Mostrar progresso por área | Barra de Conhecimento | Gráfico de barra |
| Mostrar nível de confiança | Anel de Confiança | Número solto, Barra |
| Mostrar histórico de eventos | Timeline | Lista comum |
| Ordenar/filtrar dados | Select + Tags | Checkbox, Radio |
| Mostrar status | Chip | Badge, Tag |
| Marcar item como lido/não lido | Badge (ponto) | Mudança de cor |

### 11.2 Combinações Proibidas

| Combinação | Problema |
|---|---|
| Modal + Toast simultâneos | Toast compete com o foco do modal |
| Sheet + Modal simultâneos | Duas sobreposições na mesma tela |
| 3+ gráficos na mesma tela | Nenhum gráfico recebe atenção suficiente |
| Card de Insight sem cor de ênfase | Insight não se destaca |
| 5+ cards em linha | Ilegível, densidade excessiva |
| Lista com 6 colunas | "Sopa de dados" — empresário não escaneia |
| 2 botões primários na mesma tela | Empresário não sabe qual ação é a principal |
| Badge em elemento não clicável | Notificação sem ação associada |

---

## 12. Comportamentos Transversais

### 12.1 Transições

| Componente | Entrada | Saída | Interação |
|---|---|---|---|
| Card | Slide up (20px) + fade (300ms) | Fade (200ms) | Hover: translateY(-2px) |
| Lista (linha) | Fade (200ms), sem stagger | Fade (150ms) | Hover: fundo sutil |
| Modal | Fade (200ms) + scale (0.95→1) | Fade (150ms) | — |
| Sheet | Slide horizontal (250ms) | Slide reverso (200ms) | — |
| Toast | Slide down + fade (300ms) | Fade + slide up (300ms) | Hover: pausa timer |
| Badge | Fade (200ms) | Fade (150ms) | — |
| Barra de conhecimento | Preenchimento animado (500ms) | — | — |
| Anel de confiança | Arco animado (600ms) | — | — |
| Timeline | Fade + slide up (300ms), stagger 100ms | Fade (200ms) | — |
| Gráfico | Animação progressiva (500-800ms) | — | Hover: tooltip |

### 12.2 Stagger (Entrada em Conjunto)

| Grupo de componentes | Stagger entre itens |
|---|---|
| Cards no mesmo grupo | 100ms |
| Linhas de lista | 50ms |
| Itens de timeline | 100ms |
| Barras de conhecimento | 80ms |
| Tags dentro de um card | Sem stagger (entram juntas) |

**Regra:** Stagger nunca ultrapassa 500ms total para o grupo completo.

### 12.3 Estados de Carregamento

| Componente | Skeleton |
|---|---|
| Card | Retângulo com altura do card + shimmer |
| Lista (linha) | 3 retângulos horizontais + shimmer |
| Gráfico | Formato do gráfico vazio + shimmer |
| Texto | 2-3 linhas de blocos cinza (largura variável) |
| Imagem/Ilustração | Retângulo proporcional + shimmer |
| Botão | Retângulo do tamanho do botão + shimmer |

### 12.4 Acessibilidade nos Componentes

| Componente | Atributo essencial | Comportamento de teclado |
|---|---|---|
| Card clicável | `role="button"`, `tabindex="0"` | Enter/Espaço ativa |
| Lista | `role="list"`, `aria-label` | Setas navegam (se virtual) |
| Modal | `role="dialog"`, `aria-modal="true"` | Foco preso dentro. Escape fecha. |
| Sheet | `role="dialog"`, `aria-modal="true"` | Foco preso dentro. Escape fecha. |
| Toast | `role="alert"`, `aria-live="polite"` | Foco não é movido |
| Botão | `role="button"` | Enter/Espaço ativa |
| Input | `aria-label` ou `aria-labelledby` | — |
| Gráfico | `aria-label` descritivo | Dados em tabela oculta |
| Badge | `aria-label` com valor | — |
| Chip | Navegação por tab (se clicável) | — |
| Indicador de processo | `aria-live="polite"` | — |

---

## 13. Checklist de Componentes

### 13.1 Por tela

- [ ] Existe exatamente 1 botão primário?
- [ ] Cards no mesmo grupo têm o mesmo tamanho?
- [ ] Listas têm no máximo 3 colunas?
- [ ] Há no máximo 2 gráficos?
- [ ] Não há modal + sheet abertos simultaneamente?
- [ ] Toasts estão no topo centralizado?
- [ ] Inputs têm label visível?
- [ ] Botões têm label visível?
- [ ] Icon buttons têm tooltip?
- [ ] Badges estão em elemento clicável?
- [ ] Chips usam cores oficiais?
- [ ] Tags têm borda visível?

### 13.2 Por componente

- [ ] O componente tem propósito claro?
- [ ] A variante escolhida é adequada ao contexto?
- [ ] O comportamento de hover/click/entrada está implementado?
- [ ] O estado de carregamento existe?
- [ ] O estado de erro existe?
- [ ] O estado vazio existe?
- [ ] O componente é acessível por teclado?
- [ ] As transições respeitam os tempos definidos?

### 13.3 Matriz de Decisão de Componentes

Para cada novo componente a ser criado, responder:

1. **Qual informação este componente comunica?**
2. **Qual ação este componente permite?**
3. **Ele substitui um componente existente ou é novo?** (se novo: realmente necessário?)
4. **Qual variante usar?** (ver seção 11.1)
5. **Em quais estados ele existe?** (padrão, hover, foco, ativo, carregando, erro, vazio)
6. **Qual a transição de entrada e saída?**
7. **Como ele se comporta em mobile vs desktop?**
8. **Ele compete com outro componente na tela?** (se sim: ajustar hierarquia)
9. **Quais regras de uso se aplicam?** (anti-padrões desta seção)

Se essas perguntas não tiverem respostas claras, o componente não está pronto para implementação.

---

*Documentos complementares: SISTEMA_OFICIAL_DE_LAYOUT.md (onde os componentes vivem), SISTEMA_OFICIAL_DO_DASHBOARD.md (componentes no dashboard), SISTEMA_OFICIAL_DE_HIERARQUIA_COGNITIVA.md (peso cognitivo de cada componente), SISTEMA_OFICIAL_DE_ATENCAO.md (como cada componente atrai ou recua a atenção).*
