# SISTEMA OFICIAL DA CONTINUIDADE

**Responsável:** Arquiteto de Superfície Cognitiva
**Versão:** 1.0
**Fase:** V4 Founder
**Classificação:** Estratégia de implementação obrigatória

---

## Propósito

Este documento define como a Ponte Digital garante que o empresário nunca sinta que entrou em um sistema diferente. O cérebro humano odeia descontinuidade — mudanças abruptas geram estresse, desconfiança e abandono. Toda transição, toda mudança de estado, toda navegação deve parecer *continuidade natural*, nunca *reinício*.

O empresário não navega entre telas. Ele *percorre* um fluxo contínuo.

---

## Princípio fundamental

> O sistema não tem "telas". O sistema tem *estados de um mesmo organismo vivo*. Cada mudança é uma transformação, não uma substituição.

Se o empresário sente que "entrou em outra página", o design falhou. Ele deve sentir que "o sistema evoluiu" para atender ao que ele precisa agora.

---

## PRINCÍPIOS DE CONTINUIDADE

### Princípio 1 — Transições suaves

Toda mudança de tela ou estado é animada. Não há cortes secos.

**Tempos de transição:**

| Tipo de transição | Duração | Easing | Efeito |
|-------------------|---------|--------|--------|
| Tela → Tela (mesmo contexto) | 250ms | ease-in-out | Fade + slide |
| Modal abre/fecha | 200ms | ease-out (abre), ease-in (fecha) | Escala + fade |
| Card expande/colapsa | 300ms | ease-in-out | Expansão vertical |
| Lista → Detalhe | 350ms | ease-out | Slide esquerda |
| Detalhe → Lista | 300ms | ease-out | Slide direita |
| Notificação aparece | 200ms | ease-out | Slide topo |
| Notificação desaparece | 300ms | ease-in | Fade + slide |
| Skeleton → Conteúdo | 150ms | ease-out | Fade suave |
| Drag and drop | 100ms | linear | Acompanha cursor |
| Sidebar expande/colapsa | 250ms | ease-out | Slide lateral |

**Regras de transição:**
1. **Nunca < 150ms.** Parece instável, como se o sistema não tivesse certeza.
2. **Nunca > 500ms.** Parece lento, como se o sistema estivesse sobrecarregado.
3. **Mesma duração para mesma direção.** Transições inconsistentes parecem erros.
4. **Easing consistente no sistema todo.** Definir easing padrão (ease-in-out) e easing de entrada (ease-out) e easing de saída (ease-in).
5. **Transições stackáveis.** Se duas transições acontecem simultaneamente, combiná-las em uma única transição, não em sequência.

### Princípio 2 — Contexto permanente

O que o empresário estava fazendo não é perdido quando ele navega.

**O que preservar sempre:**

| Contexto | Preservar | Como |
|----------|-----------|------|
| Scroll position | Posição exata do scroll | Salvar scrollY antes da navegação, restaurar ao voltar |
| Foco | Elemento que estava em foco | `document.activeElement` salvo e restaurado |
| Seleção | Texto selecionado, checkbox marcado | Preservar estado de seleção |
| Input não enviado | Texto digitado em formulário/campo | Salvar em sessionStorage ou estado global |
| Filtros ativos | Filtros aplicados em listas | Manter query params ou estado global |
| Sessão da IA | Contexto da conversa atual | Histórico completo preservado em memória |
| Timeline da jornada | Onde o empresário parou no fluxo | Salvar step atual do onboarding/processo |

**Regras de contexto permanente:**
1. **Preservar automaticamente.** Empresário não precisa clicar "Salvar" para manter contexto.
2. **Preservar em toda navegação.** Mesmo navegação por link direto preserva estado anterior.
3. **Timeout de contexto:** 24h para sessão, 7 dias para filtros e preferências.
4. **Contexto visível.** Empresário deve poder ver o que foi preservado ("Continuando de onde parou").

### Princípio 3 — Estado preservado

Scroll, foco, seleção e estado de componentes são mantidos entre transições.

**Regras de preservação de estado:**

1. **Scroll infinito preserva posição.** Se o empresário scrolou até o item 47 de 100, ao voltar ele está no item 47.
2. **Aba ativa preserva seleção.** Se estava na aba "Insights", volta para "Insights".
3. **Dropdown preserva seleção.** Se selecionou "Últimos 30 dias", continua selecionado.
4. **Formulário em andamento preserva dados.** Navegou para ver um insight e voltou? Dados do formulário intactos.
5. **Modo de visualização preservado.** Se estava em "grade", volta em "grade".
6. **Ordenação de lista preservada.** Se ordenou por "receita", volta na mesma ordenação.

**Mecanismo de preservação:**

```
[ESTADO ATUAL] → Navega → [ESTADO SALVO em memória/URL] → [NOVA TELA]
                                                               ↓
[ESTADO RESTAURADO] ← Volta ← [ESTADO SALVO recuperado] ← [TELA ANTERIOR]
```

### Princípio 4 — Identidade consistente

Mesmos elementos, mesmas cores, mesmo tom em todas as telas.

**O que deve ser consistente:**

| Elemento | Consistência | Exceção |
|----------|-------------|---------|
| Header | Mesma altura, mesma posição, mesmo conteúdo | Modo foco (oculta elementos) |
| Sidebar | Mesma largura, mesmos ícones, mesmas labels | Modo foco (colapsa) |
| Tipografia | Mesma fonte, mesmos tamanhos, mesmo peso | Hierarquia de tela |
| Paleta de cores | Mesma cor primária, secundária, neutra | Estado (hover, active, disabled) |
| Tom de voz da IA | Mesma persona, mesmas expressões | Contexto (analítico vs motivacional) |
| Botões | Mesmo padding, border-radius, height | Papel (primário vs secundário) |
| Animações | Mesmo easing, mesmas durações | Direção (entrada vs saída) |
| Ícones | Mesmo style (line, fill), mesma stroke-width | N/A |

**Regras de identidade:**
1. **Não reinventar por tela.** Sistema de design não muda por página. O que funciona em uma funciona em todas.
2. **Consistência > novidade.** Empresário não quer "surpresa visual". Quer previsibilidade.
3. **Mudança justificada.** Se um elemento é diferente, deve haver razão funcional clara.
4. **Auditoria de identidade.** Revisar todo novo componente contra os padrões existentes.

### Princípio 5 — Fluxo natural

O próximo passo é sempre óbvio. Empresário nunca precisa pensar "e agora?".

**O que torna o fluxo natural:**

1. **Progressão lógica.** Ação A leva naturalmente ao B, que leva ao C.
2. **Affordance clara.** Botão parece clicável, link parece navegável, card parece expansível.
3. **Caminho único.** Se há múltiplas ações possíveis, uma é visualmente prioritária.
4. **Retorno óbvio.** Empresário sabe como voltar sem procurar.
5. **Fim claro.** Empresário sabe quando completou uma tarefa (confirmação, badge, transição).

**Teste do fluxo natural:**

1. Entre na tela sem instruções prévias
2. O que você faria primeiro?
3. Depois disso, o que faria?
4. Em algum momento você pensou "e agora?"

Se em qualquer passo a resposta for "não sei", o fluxo precisa ser redesenhado.

---

## TÉCNICAS DE CONTINUIDADE

### Técnica 1 — Shared transitions

Elementos comuns entre telas não desaparecem. Eles *se transformam*.

**Implementação:**
- Sidebar: mesmo elemento DOM entre telas, apenas conteúdo muda
- Header: logo + breadcrumb persistem, apenas notificações atualizam
- Background: mesma cor de fundo em todas as telas (sem flash branco)
- Container principal: fade + slide do conteúdo, não do container

**Transição compartilhada:**

```
TELA A                          TELA B
┌──────────┬──────────────┐    ┌──────────┬──────────────┐
│ SIDEBAR  │ Conteúdo A   │    │ SIDEBAR  │ Conteúdo B   │
│ (persiste)│              │ ──→│ (persiste)│              │
│          │              │    │          │              │
│          │              │    │          │              │
└──────────┴──────────────┘    └──────────┴──────────────┘
     ↑                              ↑
     Mesmo componente DOM          Mesmo componente DOM
     (não remontar)                (não remontar)
```

### Técnica 2 — Remember state

Ao voltar para uma tela, restaurar scroll, filtros, seleção, ordenação.

**Implementação:**
- Usar `scrollRestoration` do histórico do navegador
- Salvar estado em `sessionStorage` com chave = rota + parâmetros
- Restaurar estado no `useEffect` de montagem (antes de qualquer fetch)

**O que lembrar por tipo de tela:**

| Tipo de tela | Estado a lembrar |
|--------------|------------------|
| Lista/Pesquisa | Scroll, filtros, ordenação, paginação, search term |
| Detalhe | Aba ativa, scroll interno, seção expandida |
| Dashboard | Período selecionado, métrica destacada, gráfico ativo |
| Conversa | Última mensagem, input não enviado, contexto da IA |
| Formulário | Todos os campos preenchidos (mesmo não salvos) |
| Configurações | Aba ativa, alterações não salvas |

### Técnica 3 — Breadcrumbs de contexto

Breadcrumbs não são de página — são de *jornada*. Mostram "Onde estou no fluxo", não "Onde estou na hierarquia de páginas".

**Implementação:**

```
Em vez de:                               Use:
Home > Dashboard > Insights              Você está analisando seus insights
Home > Conversa                          Você está conversando com a IA
Config > Notificações                    Você está ajustando preferências
```

**Breadcrumbs de contexto vs breadcrumbs de página:**

| Característica | Breadcrumb de página | Breadcrumb de contexto |
|---------------|---------------------|----------------------|
| O que mostra | Hierarquia de URLs | Fluxo do empresário |
| Exemplo | "Sistema > Módulo > Tela" | "Analisando seus dados..." |
| Navegável? | Sim (links) | Parcial (etapas anteriores) |
| Tom | Técnico (nomes de seção) | Natural (ação em andamento) |
| Valor para empresário | Baixo (só se perdeu) | Alto (entende o contexto) |

**Regras:**
1. Breadcrumb de contexto aparece no topo da tela, abaixo do header
2. Texto dinâmico baseado no que o empresário está fazendo
3. Ao clicar em etapa anterior, contexto é preservado (não reinicia)
4. Breadcrumb some após 5s se empresário estiver interagindo com o conteúdo

### Técnica 4 — Progresso visível

"Você está aqui" no fluxo atual. Empresário sabe em que etapa está e quantas faltam.

**Implementação:**
- Stepper horizontal para fluxos lineares (onboarding, diagnóstico, configuração)
- Indicador de progresso percentual ou fracionário ("Passo 3 de 5")
- Barra de progresso para processos contínuos (análise, geração de relatório)
- Etapas concluídas com check verde (não removíveis — mostram o que já foi feito)

**Stepper visual:**

```
[1] ✔ Configuração inicial → [2] ✔ Conexão de dados → [3] ● Primeiro insight → [4] ○ Recomendações
      Concluído                  Concluído                 Atual                      Próximo
```

**Regras:**
1. **Etapas concluídas são visíveis mas colapsadas.** Empresário não precisa revê-las, mas sabe que existem.
2. **Etapa atual é destacada.** Visualmente diferente (cor primária, tamanho maior, badge ativo).
3. **Etapas futuras são visíveis mas em opacidade reduzida.** Empresário sabe o que vem a seguir.
4. **Stepper não ocupa espaço vertical excessivo.** No máximo 60px de altura.
5. **Stepper em telas pequenas vira dropdown.** "Passo 3 de 5 ▼" que expande para ver todos.

### Técnica 5 — Retomada natural

"Continuando de onde parou." Ao retornar, o sistema se apresenta como se nunca tivesse sido interrompido.

**Implementação:**

```
Bem-vindo de volta, João.
Continuando sua análise de faturamento...
┌──────────────────────────────────────────┐
│ Insight que você estava vendo:           │
│ "Seu faturamento cresceu 12% este mês"   │
│ [Continuar] [Explorar outros insights]   │
└──────────────────────────────────────────┘
```

**Gatilhos de retomada:**
1. **Sessão expirada (24h).** Mostrar "Continuar de onde parou" no login.
2. **Retorno após > 1h de inatividade.** Resumo do que estava fazendo.
3. **Retorno após conclusão parcial.** "Você estava preenchendo os dados da empresa. Quer continuar?"
4. **Primeiro acesso do dia.** "Bom dia! Seus dados foram atualizados desde sua última visita."

**Regras:**
1. Retomada é oferecida, nunca imposta. Empresário pode optar por começar de novo.
2. Texto da retomada é específico ("sua análise de vendas"), não genérico ("continuar onde parou").
3. Dados da sessão anterior ficam disponíveis por 24h após último acesso.
4. Retomada não recarrega dados — usa cache da última sessão.

---

## FLUXOS INTERROMPIDOS

### Cenário 1 — Notificação durante conversa

**Problema:** Empresário está focado na conversa com a IA e recebe notificação de insight.

**Solução:**
- Notificação não aparece como pop-up
- Badge silencioso no canto superior direito (apenas número)
- Conversa não é interrompida — notificação não tem som, não vibra
- Ao finalizar a conversa (3s sem nova mensagem), notificação é exibida suavemente
- Se notificação for urgente, aparece como badge colorido (nunca modal)

**Fluxo:**
```
Conversa em andamento → Notificação gerada → Badge +1 no canto → (empresário termina) → Notificação aparece como card sutil
```

### Cenário 2 — Mudança de tela durante diagnóstico

**Problema:** Empresário está no meio de um diagnóstico (respondendo perguntas, vendo resultados parciais) e navega para outra seção.

**Solução:**
- Diagnóstico é automaticamente salvo como rascunho
- Ao voltar, pergunta: "Continuar diagnóstico ou começar novo?"
- Estado do diagnóstico é preservado integralmente (pergunta atual, respostas, resultados parciais)
- Se o diagnóstico tinha timer ou etapa sensível a tempo, pausar

**Fluxo:**
```
Diagnóstico (passo 3 de 7) → Navega → Diagnóstico salvo como rascunho → Volta → "Continuar de onde parou?"
```

### Cenário 3 — Fechamento do navegador

**Problema:** Empresário fecha o navegador sem aviso.

**Solução:**
- Sessão preservada por 24h no servidor
- Estado da interface salvo em `sessionStorage` (restaura ao reabrir)
- Conversa da IA preservada no backend (disponível na próxima sessão)
- Inputs não enviados perdidos (avisar ao retornar: "Havia uma mensagem não enviada")

**Fluxo:**
```
Empresário usando → Fecha navegador → 24h depois → Abre → "Continuando de onde parou" com mesmo estado
```

### Cenário 4 — Timeout de sessão

**Problema:** Empresário deixa a tela aberta por > 30 min sem interagir.

**Solução:**
- Salvar estado da interface antes de desconectar
- Mostrar tela de timeout com aviso: "Por segurança, sua sessão foi pausada"
- "Continuar" restaura o estado exato (não recarrega do zero)
- Timeout de 5 minutos para salvar: se empresário não voltar em 5 min, sessão é salva

**Fluxo:**
```
Empresário ausente 30 min → Tela escurece → "Sessão pausada" → Empresário retorna → Clique → Estado restaurado
```

---

## TRANSIÇÃO ENTRE MODOS

### Conversa → Dashboard

**Efeito:** Fade + slide.

```
┌──────────────────┐       ┌──────────────────┐
│  💬 Conversa     │       │  📊 Dashboard    │
│                  │       │                  │
│  Mensagens da IA │  ──→  │  Cards e         │
│  Campo de texto  │       │  métricas        │
│                  │       │                  │
└──────────────────┘       └──────────────────┘
     Fade (100ms)              Fade (150ms)
     + slide up (20px)         + slide down (20px)
```

**Sensação:** Conversa "se transforma" em dashboard. A última mensagem da IA parece "se espalhar" para formar os cards.

### Dashboard → Conversa

**Efeito:** Fade + slide (reverso).

```
┌──────────────────┐       ┌──────────────────┐
│  📊 Dashboard    │       │  💬 Conversa     │
│                  │       │                  │
│  Cards e         │  ──→  │  Mensagens da IA │
│  métricas        │       │  Campo de texto  │
│                  │       │                  │
└──────────────────┘       └──────────────────┘
     Fade (100ms)              Fade (150ms)
     + slide down (20px)       + slide up (20px)
```

**Sensação:** Dashboard "se recolhe" em mensagem. Os cards "se condensam" na última frase da IA.

### Lista → Detalhe

**Efeito:** Slide (item expande).

```
┌──────────────────┐       ┌──────────────────┐
│  Lista           │       │  Detalhe         │
│                  │       │                  │
│  ┌──────────┐    │       │  ┌────────────────┐│
│  │ Item ● ──→│    │  ──→  │  │ ● Item ← voltar││
│  │ Item     │    │       │  │                ││
│  │ Item     │    │       │  │  Conteúdo      ││
│  └──────────┘    │       │  │  completo do   ││
│                  │       │  │  item...       ││
└──────────────────┘       │  └────────────────┘│
                            └──────────────────┘
     Slide left (350ms)
     + item scale up (1 → 1.05 → 1)
```

**Sensação:** O item "se expande" para preencher a tela, como se estivesse se abrindo.

### Detalhe → Lista

**Efeito:** Slide reverso (item colapsa).

```
┌──────────────────┐       ┌──────────────────┐
│  Detalhe         │       │  Lista           │
│                  │       │                  │
│  ┌────────────────┐│       │  ┌──────────┐    │
│  │ ● Item ← voltar││  ──→  │  │ ● Item   │    │
│  │                ││       │  │ Item     │    │
│  │  Conteúdo      ││       │  │ Item     │    │
│  │  completo...   ││       │  └──────────┘    │
│  └────────────────┘│       │                  │
└──────────────────┘       └──────────────────┘
     Slide right (300ms)
     + item scale down (1 → 0.95 → 1)
```

**Sensação:** O detalhe "se recolhe" de volta ao item na lista.

---

## REGRAS DE CONTINUIDADE (resumo executivo)

1. **Toda transição é animada (200–500ms).** Corte seco é proibido. O cérebro precisa de continuidade visual.

2. **Contexto nunca é perdido.** O que empresário estava fazendo persiste. Scroll, foco, seleção, input — tudo preservado.

3. **Estado é lembrado.** Ao voltar, a tela está exatamente como foi deixada. Nada de "recarregou e perdeu tudo".

4. **Identidade consistente.** Mesmos elementos, mesmas cores, mesmo tom. O sistema não "reinicia" a identidade visual por tela.

5. **Fluxo natural.** Próximo passo é sempre óbvio. Empresário nunca precisa pensar "e agora?".

6. **Transições significativas.** A animação não é enfeite — ela comunica a *relação* entre os estados: expansão, recolhimento, transformação.

7. **Retomada natural.** Mesmo após fechar o navegador, a experiência continua de onde parou.

---

## ANTIPADRÕES DE CONTINUIDADE

1. **Recarregar ao voltar.** Empresário clica "voltar" e a página recarrega do zero — perde scroll, perde estado, perde confiança.
2. **Corte seco.** Transição sem animação — parece que o sistema "travou" por um frame.
3. **Estado perdido.** Navegou para ver um insight, voltou, e o formulário que preenchia está vazio.
4. **Identidade inconsistente.** Cada tela parece de um sistema diferente — cores, fontes, tom mudam.
5. **Fim do fluxo invisível.** Empresário completou uma tarefa mas não sabe — não há confirmação, não há próximo passo.
6. **Voltar que não volta.** Botão de voltar leva para homepage em vez do estado anterior.
7. **Timeout sem aviso.** Empresário estava lendo um insight longo, tela escurece do nada — perdeu tudo que estava vendo.

---

## TESTE DE CONTINUIDADE

Para cada fluxo, testar:

1. Navegue para tela B. Depois volte para tela A. O scroll está no mesmo lugar?
2. Preencha metade de um formulário. Navegue para outra tela. Volte. Os dados estão lá?
3. Role até o fim de uma lista. Clique em um item. Volte. A lista está no fim?
4. Feche o navegador. Abra de novo. A sessão foi restaurada?
5. Inicie uma conversa com a IA. Navegue para o dashboard. Volte. A conversa continua?

**Se qualquer resposta for "não", a continuidade está quebrada.**

---

## Documentos relacionados

- `SISTEMA_OFICIAL_DE_PERFORMANCE_PERCEBIDA.md` — Como a continuidade se mantém durante esperas
- `SISTEMA_OFICIAL_DA_ATENCAO.md` — Como a continuidade é percebida pelo olhar
- `SISTEMA_OFICIAL_DO_CONHECIMENTO_VISIVEL.md` — O conteúdo contínuo que o empresário vê
