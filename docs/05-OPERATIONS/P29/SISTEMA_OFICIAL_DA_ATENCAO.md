# SISTEMA OFICIAL DA ATENÇÃO

**Responsável:** Arquiteto de Superfície Cognitiva
**Versão:** 1.0
**Fase:** V4 Founder
**Classificação:** Estratégia de implementação obrigatória

---

## Propósito

Este documento define como a Ponte Digital gerencia o recurso mais escasso do empresário: a atenção. Não se trata de design de interface — trata-se de engenharia de percepção. Saber onde o empresário olha, para onde queremos que ele olhe, e como recuperar o foco quando ele se distrai.

A atenção do empresário é o petróleo da Ponte Digital. Cada pixel é um poço de petróleo.

---

## Princípio fundamental

> A atenção do empresário segue: movimento > contraste > hierarquia > posição > isolamento.

Toda decisão de layout, cor, animação e conteúdo deve ser filtrada por esta hierarquia. Se você não sabe para onde o empresário deve olhar, ele olhará para o que se move — e se nada se move, ele sairá.

---

## MAPEAMENTO DA ATENÇÃO

### Onde o empresário OLHA (ordem de atração visual)

| Prioridade | Elemento | Exemplo | Por quê |
|------------|----------|---------|---------|
| 1 | **Texto em movimento** | Mensagem aparecendo, loading mudando, contagem crescendo | O cérebro humano tem detector de movimento prioritário (herança evolutiva: movimento = perigo ou oportunidade) |
| 2 | **Elementos com cor diferente da paleta** | Badges, destaques, alerts, CTAs | Contraste cromático quebra o padrão visual — o cérebro investiga anomalias |
| 3 | **Elemento central da tela** | Mensagem da IA, insight principal, card destacado | Centro da viewport é onde o olhar descansa naturalmente |
| 4 | **Botões e CTAs** | Botão primário, link de ação, call to action | Design训练 o usuário a procurar onde agir |
| 5 | **Canto superior esquerdo** | Voltar, logo, breadcrumb de contexto | Padrão cultural ocidental de leitura (esquerda → direita, cima → baixo) |
| 6 | **Indicadores numéricos** | Badges com contagem, métricas, KPIs | O cérebro processa números antes de palavras (via subitização — reconhecimento instantâneo de quantidade) |

### Onde o empresário NUNCA OLHA (a menos que necessário)

| Elemento | Condição para ser notado | Risco de chamar atenção |
|----------|-------------------------|------------------------|
| **Rodapé** | Apenas se procurar contato, suporte, política | Chamar atenção para o rodapé desvia do conteúdo. Informações críticas nunca no rodapé |
| **Sidebar** | Quando focado no conteúdo principal, sidebar é invisível | Sidebar com links piscando compete com o conteúdo. Em modo foco, sidebar deve colapsar |
| **Configurações** | Apenas quando procurando ativamente | Nunca destacar configurações. Empresário em tarefa não quer configurar — quer resolver |
| **Elementos estáticos** | Banner fixo, logo, background | Quanto mais estático, mais invisível. Não confiar neles para comunicação |
| **Breadcrumbs** | Em telas rasas (2 níveis ou menos) | Breadcrumbs são muleta de navegação profunda. Em telas rasas, são ruído |
| **Data/hora fixa** | Relógio no canto | Empresário tem relógio no celular e no computador. O da tela é irrelevante |
| **Links "Saiba mais"** | Links genéricos sem destaque | Empresário em fluxo não clica em "Saiba mais" — quer continuar o que está fazendo |

### Teste do olhar

Para validar qualquer tela, aplicar o teste do olhar:

1. Entre na tela como se fosse a primeira vez
2. Feche os olhos por 3 segundos
3. Abra e veja para onde seu olhar vai naturalmente
4. Isso é para onde o empresário vai olhar

Se o olhar não for para o elemento mais importante da tela, o design está errado.

---

## COMO CONDUZIR A ATENÇÃO

### Técnica 1 — Movimento

O detector de movimento do cérebro humano é anterior à linguagem, anterior à escrita, anterior à civilização. Movimento sempre vence.

**Regras de movimento:**
1. **Apenas um elemento se move por vez.** Múltiplos movimentos simultâneos = confusão.
2. **Movimento tem propósito.** Animação decorativa sem função cansa a atenção.
3. **Movimento não é repetitivo infinito.** Loading infinito sem progresso frustra. Se for indeterminado, que mude de forma periodicamente.
4. **Movimento sutil é mais eficaz que movimento agressivo.** Um pulso de 10px é melhor que um shake de 50px.
5. **Movimento para de ser novidade após 3 segundos.** Se o elemento precisa continuar chamando atenção, variar o tipo de movimento.

**Implementação:**
- **Mensagem chegando:** fade-in + deslocamento vertical de 20px (300ms)
- **Notificação:** slide-in da borda + badge pulsando 2x (1s total)
- **Card destacado:** elevação + sombra aumentam (200ms)
- **Badge com contagem:** escala 1 → 1.2 → 1 (150ms) + número muda
- **Alerta:** cor muda + leve pulsação (repete 3x, depois para)

### Técnica 2 — Contraste

O contraste quebra o padrão visual. O cérebro investiga anomalias.

**Regras de contraste:**
1. **Uma cor de destaque por tela.** Duas cores competem — o empresário não sabe qual é mais importante.
2. **Contraste por cor, não por brilho.** Vermelho em fundo cinza chama mais atenção que preto em fundo cinza.
3. **Contraste de tamanho é mais forte que contraste de cor.** Um card 2x maior que os outros será visto antes de um card colorido.
4. **Isolamento + contraste = atenção garantida.** Elemento isolado com cor diferente é impossível de ignorar.
5. **Contraste reverso (claro em escuro) para CTAs.** Botões claros em fundo escuro têm clique maior que o contrário.

**Hierarquia de contraste (mais atrativo → menos atrativo):**

```
1. Vermelho/laranja em fundo neutro   (alerta, urgência)
2. Verde/azul em fundo neutro        (positivo, sucesso)
3. Tamanho 2x em fundo uniforme      (destaque estrutural)
4. Negrito/itálico em texto          (ênfase leve)
5. Cor da marca (primária) em cinza  (identidade visual)
```

### Técnica 3 — Hierarquia visual

Nem todo elemento merece o mesmo espaço. Hierarquia é alocação de atenção pré-planejada.

**Regras de hierarquia:**
1. **O elemento mais importante ocupa 40–60% da tela.** Não há hierarquia sem diferença de tamanho.
2. **Hierarquia de 3 níveis no máximo.** Principal, secundário, terciário. Quarto nível é ruído.
3. **Hierarquia funcional > hierarquia decorativa.** Um botão pequeno pode ser mais importante que uma imagem grande — mas o tamanho deve refletir a importância.
4. **Hierarquia quebra sem padding.** Espaçamento define grupos visuais. Sem ele, tudo parece igual.

**Níveis hierárquicos:**

```
NÍVEL 1 (Principal)      │ 40-60% da tela │ Mensagem da IA, insight, CTA principal
NÍVEL 2 (Secundário)     │ 20-30% da tela │ Métricas de apoio, cards secundários
NÍVEL 3 (Terciário)      │ 10-15% da tela │ Navegação, breadcrumbs, metadados
NÍVEL 4 (Ruído)          │ < 5%           │ Rodapé, elementos decorativos
```

### Técnica 4 — Posição

A posição na tela determina a ordem de escaneamento visual.

**Mapa de calor de posição:**

```
ÓTIMA          │  BOA           │  MÉDIA
Canto sup. esq │  Centro        │  Lado direito
(origem da     │  (descanso do  │  (periferia visual)
leitura)       │  olhar)        │
               │                │
BOA            │  MÉDIA         │  RUIM
Topo           │  Centro-baixo  │  Canto inf. dir.
(primeiro      │  (pouca        │  (último a ser
escaneado)     │  atenção)      │  visto)
               │                │
RUIM           │  PÉSSIMA       │  PÉSSIMA
Canto inf. esq │  Rodapé        │  Fora da viewport
(pouca         │  (quase nunca  │  (scroll obrigatório
atenção)       │  visto)        │  para ver)
```

**Regras de posição:**
1. **Informação crítica nunca abaixo da dobra.** Se for importante, está visível sem scroll.
2. **CTA primário no quadrante inferior direito da área de conteúdo.** É onde o olhar termina a leitura — engaja ação.
3. **Retorno/voltar no canto superior esquerdo.** Convenção estabelecida, não quebrar.
4. **Elementos que precisam de comparação ficam lado a lado, não empilhados.** Olho humano compara horizontalmente, não verticalmente.

### Técnica 5 — Isolamento

Espaço vazio ao redor de um elemento concentra o olhar. O silêncio visual amplifica o que importa.

**Regras de isolamento:**
1. **Quanto mais importante, mais espaço vazio ao redor.** Um insight crítico merece 40px de padding em cada lado.
2. **Grupos de elementos com padding interno < padding externo.** Relacionamento visual: o que está perto é do mesmo grupo.
3. **Isolamento por cor de fundo.** Card com fundo levemente diferente ({primário com 5% de opacidade}) isola sem poluir.
4. **Isolamento não é desperdício de espaço.** É investimento em clareza. Uma tela sem espaço vazio é uma tela que ninguém lê.
5. **Primeiro elemento isolado recebe 60% da atenção.** Se você quer que algo seja visto, isole.

---

## COMO RECUPERAR FOCO PERDIDO

### Cenário 1 — Empresário olhou para outro lugar

**Gatilho:** Tempo sem interação > 3s (detectado por hover/click fora da área focal).

**Ação:** Microinteração sutil no elemento focal
- Elemento focal "pulsa" levemente (opacidade 1 → 0.8 → 1, 500ms)
- Sutil mudança de cor (se for card, borda ganha 1px cor primária por 1s)
- O movimento é suave, não agressivo — não deve "assustar" o empresário

**O que NÃO fazer:**
- Notificação pop-up "Você ainda está aí?"
- Tela escurecer com "Clique para continuar"
- Animação que chama atenção de forma abrupta

### Cenário 2 — Empresário voltou para a tela

**Gatilho:** Tab/window re-focused (VisibilityChange API)

**Ação:** Destacar o estado atual por 1 segundo
- Elemento principal da tela ganha um "respiro visual": suave elevação de opacidade ou brilho
- Se havia notificações durante a ausência, agrupar no canto superior direito com contagem
- O destaque não interrompe — apenas orienta: "você estava aqui"
- Manter scroll e estado exatamente como estava (nunca recarregar ao voltar)

**O que NÃO fazer:**
- Recarregar a página ao voltar (perde tudo que ele viu)
- Mostrar pop-up "Bem-vindo de volta!" (interrupção desnecessária)
- Resetar timer ou sessão sem aviso

### Cenário 3 — Empresário parece perdido (hesitação > 5s)

**Gatilho:** Sem interação por 5s com elemento focal disponível (botão, input, CTA visível).

**Ação:** IA pergunta "Posso ajudar?"
- Após 5s de inatividade com elemento focal disponível, IA analisa contexto e oferece ajuda
- Abordagem: "Parece que está avaliando os dados. Quer que eu destaque algo específico?"
- **Nunca:** "Você está com dificuldade?" (soa paternalista)
- A oferta de ajuda é sutil: um botão "Ajuda" com badge ou tooltip, não um modal
- Se o empresário ignorar a oferta por 5s, remover a sugestão e não repetir na mesma sessão

**Textos de help contextual (por hesitação):**

| Contexto | Abordagem |
|----------|-----------|
| Empresário parou na tela de insight | "Quer explorar este insight mais a fundo?" |
| Empresário parou no dashboard | "Tem alguma métrica específica que você quer ver?" |
| Empresário parou em formulário | "Precisa de ajuda com alguma informação?" |
| Empresário parou na conversa | "Quer que eu reformule ou explique melhor?" |
| Empresário abriu recomendação mas não agiu | "Essa recomendação faz sentido para você?" |

**O que NÃO fazer:**
- Questionar a capacidade do empresário ("Não entendeu?") — humilha, não ajuda
- Oferecer ajuda genérica ("Precisa de ajuda?") sem contexto — parece robozinho decorado
- Repetir a oferta se ele recusou — parece insistente

### Cenário 4 — Múltiplas notificações simultâneas

**Gatilho:** 2+ notificações geradas no mesmo período (< 2s entre elas).

**Ação:** Agrupar, nunca mostrar simultaneamente
- Notificações são enfileiradas com intervalo de 1.5s entre cada
- Badge de notificações acumula contagem (não mostra 3 pop-ups ao mesmo tempo)
- Se for urgente, a primeira é mostrada, as demais viram contagem no badge
- Notificações não urgentes são silenciadas e enviadas para central de notificações

**Hierarquia de notificações:**

| Tipo | Comportamento | Pode agrupar? |
|------|---------------|---------------|
| Insight crítico encontrado | Notificação imediata com som (se habilitado) | Não — é urgente |
| Sugestão de ação | Notificação silenciosa + badge | Sim |
| Atualização de dados | Badge silencioso | Sim |
| Mensagem de outro usuário | Notificação com som (se habilitado) | Sim (agrupar por remetente) |
| Alerta de sistema | Notificação imediata | Não — mas nunca urgente de verdade |

---

## COMO ELIMINAR DISTRAÇÕES

### Técnica 1 — Navegação minimalista durante foco

**Regra:** Quando o empresário está focado em conteúdo (conversa, insight, leitura), a navegação secundária reduz.

**Implementação:**
- Sidebar colapsa automaticamente após 3s sem interação com ela
- Sidebar reaparece com hover na borda esquerda (5px de hit area)
- Header mostra apenas: logo + breadcrumb + notificações (ícone)
- Links para outras seções ficam disponíveis mas sem destaque visual
- Modo "foco" ativado por: scroll em área de conteúdo + sem clique na sidebar por > 5s

**Níveis de navegação:**

| Modo | Sidebar | Header | Links | Distrações |
|------|---------|--------|-------|------------|
| Normal | Visível, 240px | Completo | Todos visíveis | Neutro |
| Foco leve | Colapsado, 60px (ícones) | Breadcrumb + notificações | Links secundários ocultos | Baixo |
| Foco profundo | Oculto (aparece com hover) | Apenas logo | Todos links ocultos | Mínimo |

### Técnica 2 — Notificações silenciosas durante conversa

**Regra:** Quando o empresário está conversando com a IA, notificações não urgentes são silenciadas.

**Implementação:**
- Durante digitação + envio de mensagens → badge silencioso (apenas contagem no canto)
- Badge não pisca, não anima, não muda de cor
- Ao finalizar a conversa (3s sem nova mensagem), notificações acumuladas são exibidas suavemente
- Notificações críticas (ex: falha de sistema) quebram o silêncio com alerta visual sutil

### Técnica 3 — Badges apenas para itens não lidos

**Regra:** Badge numérico aparece exclusivamente para conteúdo novo não visualizado pelo empresário.

**Implementação:**
- Badge = contagem de itens com `is_read = false` (filtrado no backend)
- Badge some imediatamente ao visualizar (optimistic UI)
- Badge nunca é usado para: chamar atenção para recurso novo, destacar promoção, indicar tutorial disponível
- Badges decorativos (sem contagem real) são proibidos
- Badge máximo: "99+". Acima disso, não importa mais — é ruído

### Técnica 4 — Cores neutras para elementos não focais

**Regra:** Tudo que não é importante no momento deve ser visualmente silencioso.

**Implementação:**
- Elementos não focais recebem opacidade reduzida (60% da cor original)
- Cores neutras: gray-300, gray-400 (#d1d5db, #9ca3af)
- Textos não focais: gray-500 (#6b7280) em vez de gray-900 (#111827)
- Backgrounds não focais: gray-50 (#f9fafb)
- Elementos interativos mantêm contraste mínimo para serem encontráveis, mas não atrativos

**Paleta de silêncio visual:**

| Elemento | Cor normal | Cor silenciada |
|----------|-----------|----------------|
| Texto secundário | gray-700 | gray-400 |
| Ícone decorativo | gray-500 | gray-300 |
| Borda de card | gray-200 | gray-100 |
| Background de área não focal | white | gray-50 |
| Link de navegação (sem foco) | primary-600 | gray-400 |
| Badge zerado | transparente | transparente (não existe) |

### Técnica 5 — Animações apenas no elemento focal

**Regra:** Animação é uma ferramenta de direcionamento da atenção. Se um elemento não é o focal, ele não deve ter animação.

**Implementação:**
- Apenas 1 elemento animado por tela (o focal)
- Elementos em segundo plano: estáticos (zero animação, zero transição)
- Animações de background (gradientes animados, parallax, partículas): proibidas
- Transições de hover em elementos não focais: proibidas

**O que NÃO fazer:**
- Card girando ao passar o mouse (tira atenção do conteúdo)
- Background com gradiente animado (compete com o conteúdo a cada frame)
- Vários spinners na mesma tela (cada um puxa a atenção para um lugar diferente)
- Toast notification com animação de entrada chamativa enquanto empresário lê

---

## TESTE DE DISTRAÇÃO

Para cada tela, responder:

1. Se o empresário está lendo o conteúdo principal, quantos elementos estão competindo pela atenção dele?
2. Algum elemento está se movendo sem ser o focal?
3. Há mais de uma cor de destaque na tela?
4. O CTA principal está claro ou há múltiplos botões com o mesmo peso visual?
5. Há notificações/badges que não representam conteúdo não lido?

**Se qualquer resposta for "sim" > 1, a tela tem excesso de distração.**

---

## MAPA DE CALOR DA ATENÇÃO — EXEMPLO PRÁTICO

```
Dashboard empresarial — Onde o empresário olha:

┌──────────────────────────────────────────────────────┐
│ Logo  │ Breadcrumb              │ 🔔  ⚙️            │  ── 30% atenção (início)
├──────────────────────────────────────────────────────┤
│                                                        │
│   ┌──────────────────────────────────────────────┐    │
│   │ 💬 Mensagem da IA: "Seu negócio cresceu..." │    │  ── 50% atenção (centro)
│   │                                              │    │
│   │ ┌──────────┐ ┌──────────┐ ┌──────────┐      │    │
│   │ │ Receita  │ │ Clientes │ │ Ticket   │      │    │  ── 15% atenção (secundário)
│   │ │ R$ 50k   │ │  1.200   │ │ R$ 42    │      │    │
│   │ │ ▲ 12%   │ │ ▲ 8%     │ │ ▲ 5%    │      │    │
│   │ └──────────┘ └──────────┘ └──────────┘      │    │
│   │                                              │    │
│   │ [Ver detalhes]     [Conversar sobre]         │    │  ── 5% atenção (CTA)
│   └──────────────────────────────────────────────┘    │
│                                                        │
└──────────────────────────────────────────────────────┘
```

**Análise:**
- Mensagem da IA no centro + em movimento (digitando) = 50% da atenção
- Cards de métrica abaixo = 15% (escaneamento rápido)
- CTAs no final = 5% (decisão)
- Header com notificações = 30% (no início, mas atenção volta ao centro)

**Problema identificado:** Badge de notificação no header compete com a mensagem da IA. Durante conversa, badge deve ser silencioso.

---

## REGRAS DE ATENÇÃO (resumo executivo)

1. **Movimento sempre vence.** Se não quer que o empresário olhe para algo, não anime.
2. **Contraste direciona.** A cor diferente da paleta é a segunda coisa que ele vê.
3. **Uma âncora por tela.** Apenas um elemento deve ser o centro da atenção.
4. **Hierarquia clara.** Tamanho = importância. Se é importante, é maior.
5. **Espaço vazio é silêncio.** Use isolamento para destacar o que importa.
6. **Distração é inimiga.** Tudo que não é focal deve ser cinza e parado.
7. **Recupere sem interromper.** Se ele se distraiu, traga de volta com sutileza.

---

## Documentos relacionados

- `SISTEMA_OFICIAL_DE_PERFORMANCE_PERCEBIDA.md` — Como ocupar a atenção durante esperas
- `SISTEMA_OFICIAL_DA_CONTINUIDADE.md` — Como a atenção não se perde em transições
- `SISTEMA_OFICIAL_DO_CONHECIMENTO_VISIVEL.md` — Para onde a atenção deve ir depois da espera
