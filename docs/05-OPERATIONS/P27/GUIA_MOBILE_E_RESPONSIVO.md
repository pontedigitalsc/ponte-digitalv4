# GUIA MOBILE E RESPONSIVO

> Programa 27 — O Polimento da Empresa Zero
> Versão: 1.0 | Status: Aprovado

---

## Sumário

1. [Princípios de Design Mobile](#1-princípios-de-design-mobile)
2. [Touch e Interação](#2-touch-e-interação)
3. [Adaptação por Tela](#3-adaptação-por-tela)
4. [Gestos](#4-gestos)
5. [Acessibilidade Mobile](#5-acessibilidade-mobile)
6. [Breakpoints e Grid](#6-breakpoints-e-grid)

---

## 1. Princípios de Design Mobile

### 1.1 Filosofia

A experiência mobile da Ponte Digital não é o desktop "encolhido". É uma experiência própria, desenhada para o contexto do empresário em movimento: consultas rápidas, notificações, registro de observações no momento em que acontecem.

**Personalidades desktop vs mobile:**

| Desktop | Mobile |
|---------|--------|
| Análise profunda | Consulta rápida |
| Múltiplos painéis | Fluxo único, focado |
| Leitura prolongada | Micro-interações |
| Decisões estratégicas | Observações em tempo real |
| Configurações complexas | Ações imediatas |

### 1.2 Regras Gerais

- Touch targets: mínimo 44x44px, ideal 48x48px.
- Densidade de informação: reduzir em 50% vs desktop.
- Priorizar conteúdo essencial por viewport.
- Toda tela mobile tem exatamente um CTA primário.
- Navegação por tabs no bottom (nunca no topo).
- Header compacto com título + ações mínimas.
- Respeitar safe areas (notch, island, barra de navegação do sistema).

---

## 2. Touch e Interação

### 2.1 Touch Targets

| Elemento | Tamanho mínimo | Tamanho ideal | Espaçamento |
|----------|---------------|---------------|-------------|
| Botão primário | 44x44 | 48x56 | 12px entre botões |
| Botão secundário | 44x44 | 44x44 | 8px entre botões |
| Ícone de ação | 44x44 | 48x48 | 16px mínimo |
| Link inline | 44px altura (padding) | - | - |
| Checkbox/Radio | 44x44 | 48x48 | 12px do label |
| Input de texto | 44px altura | 48px altura | 16px padding interno |
| Slider | 44px altura | 48px altura | - |
| Tab (bottom nav) | 48x48 | 56x56 | 0 (contíguo) |

### 2.2 Feedback Tátil e Visual

- Todo toque tem feedback visual imediato (< 50ms).
- Ripple effect em botões (toque → expansão circular de 300ms).
- Hover não existe em mobile — substituir por estado "active" no toque.
- Long press (500ms) para ações contextuais.
- Swipe com feedback de resistência (overscroll suave).

### 2.3 Teclado

- Campo de texto fixo no bottom da tela (não flutuante).
- Ao abrir teclado: campo sobe junto, não esconde mensagens.
- Viewport ajusta para campo visível acima do teclado (keyboard-aware).
- Enter = enviar (em conversa). Opção de quebra de linha visível (ícone ao lado).
- Sugestões de texto autocomplete do sistema desabilitadas (interferem com termos de negócio).
- Teclado numérico para campos de valor (CNPJ, telefone, moeda).

---

## 3. Adaptação por Tela

### 3.1 Landing em Mobile

**Layout:**
- Full screen (viewport height).
- CTA primário ocupando toda a largura com padding vertical generoso (min 56px).
- Ilustração em tamanho reduzido (30% da tela, centralizada).
- Texto principal: 2-3 linhas no máximo.
- Scroll reveal: seções secundárias aparecem conforme scroll.

**Comportamento:**
- CTA principal: "Começar Diagnóstico" — fixo no bottom (sticky).
- Botão "Já tenho conta" no canto superior direito (text link).
- Scroll suave, navegação por dots indicando seções.
- Sem pop-ups ou modais na primeira visita.

**Diferenças do desktop:**
- Desktop: hero com 3 colunas de valor.
- Mobile: uma mensagem de cada vez, CTA grande.

---

### 3.2 Tela de Conversa em Mobile

**Layout:**
- Header: título + botão de voltar + menu (ícone).
- Área de mensagens: scrollável, ocupa todo o espaço disponível entre header e input.
- Input: fixo no bottom, campo de texto + botão enviar.
- Bolhas de mensagem: largura máxima 85% da tela.
- Indicador de digitação: bolha pulsante antes da resposta.

**Comportamento:**
- Ao abrir tela: scroll automático para última mensagem.
- Ao enviar: scroll automático para nova mensagem.
- Ao receber resposta: scroll automático (se usuário não estiver lendo histórico).
- Se usuário scrollar para cima: não scrollar automaticamente (respeitar leitura).
- Indicador "Você" e "Ponte Digital" com avatar/ícone pequeno.
- Timestamp relativo ("há 2 min", "ontem") — compacto.

**Estado vazio:**
- "Comece sua conversa com a Ponte Digital" — texto centralizado.
- Sugestões de primeira mensagem: chips clicáveis.
  - "Quero fazer um diagnóstico"
  - "Qual a saúde da minha empresa?"
  - "Me ajude a decidir sobre..."

**Adaptações:**
- Desktop: painel cognitivo visível ao lado.
- Mobile: painel acessível por bottom sheet (ver seção 3.3).

---

### 3.3 Painel Cognitivo em Mobile

**Layout:**
- Bottom sheet com handle (barra de arrasto) no topo.
- Trigger: ícone no header ou swipe up na conversa.
- Sheet ocupa 40% (colapsado) a 85% (expandido) da tela.
- Conteúdo scrollável dentro do sheet.
- Handle visível e responsivo ao toque (mín 44px).

**Comportamento:**
- Swipe up: abre sheet com conteúdo do painel cognitivo.
- Swipe down: fecha sheet.
- Tap no backdrop: fecha sheet.
- Sheet mantém estado de scroll entre aberturas.
- Atualização em tempo real: novo insight aparece com badge no trigger.

**Conteúdo do painel (versão mobile):**
- Compacto: apenas ícone + número (indicadores).
- Insights em cards menores (sem gráficos).
- Máximo 3 indicadores visíveis (rolagem horizontal se mais).
- CTA "Ver Completo" abre versão desktop ou tela dedicada.

**Diferenças do desktop:**
- Desktop: painel fixo na lateral, sempre visível.
- Mobile: sheet sobreposto, acessível sob demanda.

---

### 3.4 Dashboard em Mobile

**Layout:**
- Cards de indicador em grid 1 coluna (scroll vertical).
- Cada card: ícone + valor + label + variação (seta).
- Gráfico principal ocupa largura total, altura reduzida (200px).
- Cards secundários abaixo do gráfico.
- Filtro de período: dropdown compacto no header.

**Comportamento:**
- Pull to refresh para atualizar dados.
- Tap em card: abre detalhamento do indicador.
- Swipe horizontal em gráfico: alterna entre visualizações.
- Loading: skeleton cards (ver Guia de Estados e Performance).

**O que é cortado vs desktop:**
- Desktop: 4 indicadores em grid 2x2 + gráfico grande + tabela.
- Mobile: 1 indicador principal + gráfico + lista vertical.

---

### 3.5 Diagnóstico em Mobile

**Layout:**
- Pergunta única por tela (wizard).
- Barra de progresso no topo: "Pergunta 3 de 20" + barra.
- Botões de resposta grandes (mín 56px altura), radio buttons.
- Botão "Próximo" fixo no bottom.
- Botão "Voltar" no header (texto ou seta).

**Comportamento:**
- Transição entre perguntas: slide horizontal (300ms).
- Resposta salva automaticamente ao avançar.
- Toast de confirmação ao completar seção.
- Ao voltar: manter resposta anterior (editável).
- Progresso persistido (fechar e voltar retoma de onde parou).

**Adaptações:**
- Desktop: perguntas em painel único com scroll.
- Mobile: uma pergunta por vez (foco total).

---

### 3.6 Centro de Decisão em Mobile

**Layout:**
- Lista vertical de decisões (scroll infinito ou paginação).
- Cada item: título + data + status + preview (2 linhas).
- Botão "Nova Decisão" fixo no bottom (FAB).
- Filtros: dropdown compacto + busca no header.

**Comportamento:**
- Tap no item: abre detalhes em bottom sheet ou nova tela.
- Swipe em item: ações rápidas (arquivar, editar).
- FAB "Nova Decisão" expande com opções (decisão rápida vs completa).
- Pull to refresh para atualizar.

**Adaptações:**
- Desktop: grid 2 colunas + painel de métricas.
- Mobile: lista vertical 1 coluna, métricas reduzidas.

---

### 3.7 Histórico de Insights em Mobile

**Layout:**
- Lista vertical de insights.
- Cada insight: ícone + título + resumo (2 linhas) + timestamp.
- Badge de "novo" para insights não lidos.
- Ordenação: mais recente primeiro.

**Comportamento:**
- Tap: expande insight inline (accordion) ou abre tela dedicada.
- Swipe: marcar como lido/não lido.
- Long press: compartilhar insight.
- Header com filtro: "Todos", "Não lidos", "Favoritos".

---

### 3.8 Autenticação em Mobile

**Layout:**
- Full screen, sem header de navegação.
- Logo centralizado (topo).
- Formulário compacto (2 campos: email, senha).
- Botão "Entrar" ocupando largura total (56px altura).
- Links: "Esqueci senha", "Criar conta".

**Comportamento:**
- Teclado: email abre com teclado com "@", senha com eye toggle.
- Biometria: suporte a Face ID / Touch ID / impressão digital.
- Auto-login: sessão persistente (token refresh).
- Logout: confirmação (bottom sheet) + fingerprint opcional para re-login.

---

## 4. Gestos

### 4.1 Tabela de Gestos

| Gesto | Ação | Onde | Feedback |
|-------|------|------|----------|
| Tap | Selecionar, ativar | Todos elementos | Ripple effect |
| Double tap | Zoom em detalhe | Gráficos | Expansão suave |
| Long press (500ms) | Menu de contexto | Cards, itens de lista | Haptic + tooltip |
| Swipe left | Remover/arquivar | Itens de lista | Card desliza + ação |
| Swipe right | Marcar conclusão | Checklists | Check mark animado |
| Swipe up | Abrir bottom sheet | Painel cognitivo | Sheet sobe com tracking |
| Swipe down | Fechar bottom sheet | Bottom sheet | Sheet desce com tracking |
| Pull to refresh | Atualizar dados | Dashboard, listas | Refresh indicator + haptic |
| Pinch to zoom | Zoom em gráfico | Gráfico detalhado | Zoom suave |
| Horizontal swipe | Navegar entre abas | Tab view | Slide animado |

### 4.2 Implementação de Gestos

- Swipe com resistência: overscroll de 50px antes de executar ação.
- Velocidade mínima: 300px/s para considerar swipe (evitar falsos positivos).
- Dead zone: primeiros 10px de movimento ignorados.
- Gestos não conflitam com scroll (scroll vertical tem prioridade sobre swipe horizontal).
- Haptic feedback: Taptic Engine em ações destrutivas (swipe para remover).
- Gestos desativam durante transições de tela.

---

## 5. Acessibilidade Mobile

### 5.1 Touch

- Touch target mínimo 44x44px (WCAG 2.2).
- Espaçamento entre targets adjacentes: mínimo 8px.
- Targets próximos à borda inferior: mínimo 56px (polegar).
- Zona de conforto do polegar: área central + inferior da tela.
- Ações destrutivas nunca na zona de alcance fácil (canto inferior direito).

### 5.2 Contraste e Legibilidade

- Tamanho mínimo de texto: 14px para corpo.
- Tamanho ideal de texto: 16px para corpo (evita zoom do navegador).
- Alta legibilidade em luz solar direta (contraste WCAG AA+).
- Suporte a Dynamic Type / font scaling do sistema (até 200%).
- Texto nunca truncado com ellipsis em elementos de ação.

### 5.3 Safe Areas

- Respeitar notch/island: padding mínimo de 44px no topo.
- Respeitar barra de navegação do sistema: padding mínimo de 34px no bottom.
- Input fixo no bottom: considerar altura do teclado + safe area.
- Conteúdo nunca abaixo da safe area inferior (em repouso).

---

## 6. Breakpoints e Grid

### 6.1 Breakpoints

| Identificador | Largura mínima | Largura máxima | Dispositivo típico |
|--------------|---------------|---------------|-------------------|
| Mobile P | 320px | 374px | iPhone SE / pequenos |
| Mobile M | 375px | 429px | iPhone padrão |
| Mobile G | 430px | 767px | iPhone Pro Max / Android grandes |
| Tablet P | 768px | 1023px | iPad mini / portrait |
| Tablet G | 1024px | 1279px | iPad / landscape |
| Desktop P | 1280px | 1519px | Notebook |
| Desktop G | 1520px | 1919px | Desktop HD |
| Desktop GG | 1920px | + | Desktop wide / ultra-wide |

### 6.2 Grid Mobile

- Colunas: 4 (mobile P) a 8 (mobile G + tablet).
- Gutter: 16px (mobile), 24px (tablet).
- Margem lateral: 16px (mobile), 24px (tablet), 32px (desktop).
- Densidade: 50% dos elementos visíveis vs desktop.

### 6.3 Padrões de Adaptação

**50/50 rule (redução de densidade):**
- Para cada elemento visível no desktop, no máximo 1 elemento correspondente no mobile.
- Se desktop mostra 4 cards de indicador, mobile mostra 2.
- Se desktop mostra tabela de 10 linhas, mobile mostra 5 + "ver mais".
- Se desktop mostra gráfico com 4 séries, mobile mostra 2 séries + alternância.

**Prioridades de corte (o que esconder em mobile):**

| Prioridade | Elemento | Faz em mobile |
|-----------|----------|---------------|
| Essencial | Título da página | Mostrar sempre |
| Essencial | CTA primário | Mostrar sempre |
| Essencial | Dado principal | Mostrar sempre |
| Alta | Navegação | Tabs no bottom |
| Alta | Filtros | Dropdown compacto |
| Média | Gráficos secundários | Esconder ou colapsar |
| Média | Tabelas de detalhe | "Ver mais" com link |
| Baixa | Metadados | Esconder |
| Baixa | Ações em massa | Menu overflow |
| Mínima | Decoração | Remover |

---

## Apêndice A: Checklist Mobile

Antes de liberar qualquer tela mobile:
- [ ] Touch targets >= 44x44
- [ ] Densidade reduzida em 50%
- [ ] Safe areas respeitadas
- [ ] Teclado não esconde campo de input
- [ ] Pull to refresh implementado
- [ ] Bottom navigation funcional
- [ ] Gestos não conflitam com scroll
- [ ] Dark mode funcional
- [ ] Contrato WCAG AA verificado
- [ ] Transições suaves (< 300ms)
- [ ] Estado vazio com CTA (ver Guia de Estados)
- [ ] Erros com tratamento mobile (toast no topo)
- [ ] Loading skeleton implementado

---

## Apêndice B: Modo Retrato vs Paisagem

### Retrato (padrão)
- Todas as telas suportam retrato como modo primário.
- Navegação bottom tabs visível.
- Input no bottom fixo.

### Paisagem (otimizado para digitação)
- Bottom tabs substituídos por header tabs (economizar altura).
- Input de texto expande horizontalmente (aproveitar largura).
- Painel cognitivo pode ficar à direita (como desktop, se largura > 700px).
- Indicadores em grid horizontal.
- Teclado ocupa menos % da tela (melhor para digitação).
- Conteúdo de leitura (relatórios, insights) se beneficia do formato widescreen.
