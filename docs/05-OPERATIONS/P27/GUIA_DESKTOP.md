# GUIA DESKTOP

> Programa 27 — O Polimento da Empresa Zero
> Versão: 1.0 | Status: Aprovado

---

## Sumário

1. [Layout e Estrutura](#1-layout-e-estrutura)
2. [Atalhos de Teclado](#2-atalhos-de-teclado)
3. [Hover e Microinterações](#3-hover-e-microinterações)
4. [Multi-Janela e Redimensionamento](#4-multi-janela-e-redimensionamento)
5. [Scroll e Navegação](#5-scroll-e-navegação)
6. [Suporte a Múltiplos Monitores](#6-suporte-a-múltiplos-monitores)

---

## 1. Layout e Estrutura

### 1.1 Layout 3 Colunas (Opcional)

O desktop da Ponte Digital suporta três zonas de conteúdo que podem ser reorganizadas conforme o perfil de uso:

| Coluna | Zona | Conteúdo | Largura padrão | Largura mínima |
|--------|------|----------|---------------|----------------|
| Esquerda | Histórico | Timeline de interações, navegação, menu | 280px | 240px |
| Centro | Conversa | Mensagens, diagnóstico, conteúdo principal | Fluida (max 720px) | 360px |
| Direita | Painel | Painel cognitivo, insights, métricas | 320px | 280px |

**Comportamento:**
- As 3 colunas são visíveis em resolução >= 1280px.
- Em resoluções entre 1024px e 1279px: histograma esquerdo colapsa em ícone lateral, painel direito reduz para 280px.
- Em resoluções < 1024px: painel direito vira painel sobreposto (toggle no header).
- Colunas podem ser redimensionadas pelo usuário (arrastar bordas entre colunas).
- Estado de layout persiste entre sessões.

### 1.2 Limite de Largura da Conversa

- Mensagens centralizadas com largura máxima de 720px.
- Acima de 720px: espaçamento lateral aumenta, conteúdo permanece legível.
- Abaixo de 720px: mensagens ocupam toda a largura disponível.
- Texto de leitura confortável: 60-75 caracteres por linha (comprovado para retenção).

### 1.3 Header

- Logo da Ponte Digital (esquerda).
- Breadcrumb ou título da página (centro).
- Ações globais: notificações, perfil, toggle dark mode, configurações (direita).
- Altura: 56px (compacto, sem desperdício vertical).

### 1.4 Zonas de Layout por Tela

**Dashboard:**
- Esquerda: navegação colapsada.
- Centro: indicadores principais + gráficos.
- Direita: painel cognitivo com métricas rápidas.

**Conversa:**
- Esquerda: histórico de conversas.
- Centro: mensagens (max 720px).
- Direita: painel cognitivo com insights.

**Diagnóstico:**
- Esquerda: progresso e navegação entre seções.
- Centro: perguntas do diagnóstico.
- Direita: dicas e contexto da pergunta atual.

**Centro de Decisão:**
- Esquerda: filtros e busca.
- Centro: lista de decisões.
- Direita: métricas de decisão.

**Relatórios:**
- Esquerda: sumário executivo fixo (navegação por seções).
- Centro: conteúdo do relatório.
- Direita: anotações e observações.

---

## 2. Atalhos de Teclado

### 2.1 Atalhos Globais

| Atalho | Ação | Contexto |
|--------|------|----------|
| `Esc` | Fechar modal / painel / cancelar ação | Global |
| `?` | Abrir ajuda de atalhos | Global |
| `Ctrl + K` | Paleta de comandos | Global |
| `Ctrl + ,` | Abrir configurações | Global |
| `Ctrl + Shift + D` | Toggle dark mode | Global |

### 2.2 Atalhos de Navegação

| Atalho | Ação |
|--------|------|
| `Ctrl + 1` | Ir para Dashboard |
| `Ctrl + 2` | Ir para Diagnóstico |
| `Ctrl + 3` | Ir para Conversa |
| `Ctrl + 4` | Ir para Centro de Decisão |
| `Ctrl + 5` | Ir para Histórico de Insights |
| `Ctrl + Shift + H` | Ir para Home |
| `Alt + Seta Esquerda` | Voltar |
| `Alt + Seta Direita` | Avançar |

### 2.3 Atalhos de Conversa

| Atalho | Ação |
|--------|------|
| `Enter` | Enviar mensagem |
| `Ctrl + Enter` | Nova linha (sem enviar) |
| `Shift + Enter` | Nova linha (sem enviar) |
| `Seta Cima` | Editar última mensagem enviada |
| `Ctrl + Shift + C` | Copiar última resposta |
| `Ctrl + Z` | Desfazer última ação (se aplicável) |

### 2.4 Atalhos de Ação

| Atalho | Ação |
|--------|------|
| `Ctrl + N` | Nova decisão |
| `Ctrl + Shift + O` | Nova observação |
| `Ctrl + Shift + R` | Nova RFC |
| `Ctrl + S` | Salvar rascunho atual |
| `Ctrl + P` | Imprimir / exportar PDF |
| `Ctrl + F` | Buscar na tela atual |

### 2.5 Regras de Atalhos

- Atalhos só funcionam quando não há foco em campo de texto (exceto os da seção 2.3).
- Em campo de texto: `Ctrl + Enter` para nova linha, `Enter` para enviar.
- Atalhos com `Ctrl + Shift` reservados para ações complementares.
- Tooltip de atalho visível no hover dos botões (ex: "Enviar (Enter)").
- `?` ou `Ctrl + /` abre overlay de todos os atalhos disponíveis.

---

## 3. Hover e Microinterações

### 3.1 Hover States

| Elemento | Estado normal | Estado hover | Transição |
|----------|--------------|--------------|-----------|
| Botão primário | Fundo sólido | Fundo 15% mais escuro | 150ms ease |
| Botão secundário | Borda + texto | Fundo preenchido 10% | 150ms ease |
| Link | Texto cor padrão | Sublinhado + cor 20% mais escura | 100ms ease |
| Card de indicador | Sombra sutil | Sombra elevada + translateY(-2px) | 200ms ease |
| Item de lista | Fundo transparente | Fundo 5% tonificado | 150ms ease |
| Toggle | Estado atual | Opacidade 90% + cursor pointer | 100ms |
| Ícone de ação | Opacidade 70% | Opacidade 100% + leve escala | 150ms ease |
| Dropdown | Fechado | Borda destacada + seta rotaciona | 150ms ease |
| Tabela linha | Fundo padrão | Fundo alternado + leve destaque | 100ms |

### 3.2 Regras de Hover em Desktop

- TODO elemento clicável tem hover state implementado.
- Hover nunca é a única indicação de interatividade (cursor pointer + hover).
- Hover em elementos desabilitados: cursor not-allowed + sem hover state.
- Hover com tooltip para ícones sem label textual.
- Tooltip aparece após 500ms de hover (delay para não poluir).

### 3.3 Microinterações de Hover

- **Cards:** elevam 2px com sombra proporcional.
- **Botões:** leve escala (1.02) + cor mais escura.
- **Gráficos:** ao hover em ponto de dado, tooltip com valor exato + linha guia vertical.
- **Links:** sublinhado animado (da esquerda para a direita, 200ms).
- **Tabs:** indicador de seleção desliza entre tabs (300ms ease).

---

## 4. Multi-Janela e Redimensionamento

### 4.1 Resolução Mínima

- **Mínimo funcional:** 800x600.
- **Mínimo recomendado:** 1024x768.
- **Máximo:** sem limite (adaptável a qualquer resolução).

### 4.2 Comportamento em Redimensionamento

**Redimensionamento horizontal (largura):**

| Largura | Comportamento |
|---------|--------------|
| >= 1280px | Layout 3 colunas completo |
| 1024 - 1279px | Coluna esquerda colapsa (ícone), coluna direita reduz |
| 800 - 1023px | Coluna direita vira toggle, coluna esquerda vira drawer |
| < 800px | Aviso: "Resolução abaixo do recomendado" (não bloqueante) |

**Redimensionamento vertical (altura):**

| Altura | Comportamento |
|--------|--------------|
| >= 900px | Layout completo, scroll confortável |
| 600 - 899px | Header reduz para 48px, padding reduzido, scroll vertical |
| < 600px | Modo compacto: header minimalista, scroll prioritário |

### 4.3 Layout Fluido

- Todas as telas usam unidades relativas (%, vw, vh, rem).
- Nenhum elemento tem largura fixa em pixels (exceto inputs e botões).
- Grid se adapta: 2 colunas → 1 coluna conforme resolução diminui.
- Imagens e ilustrações redimensionam proporcionalmente.
- Fontes escalam com viewport (entre 14px e 18px corpo).

### 4.4 Salvamento de Layout

- Largura das colunas é persistida (localStorage).
- Estado de colapso dos painéis é persistido.
- Ao reabrir o navegador: layout restaurado ao último estado.
- Botão "Resetar Layout" nas configurações.

---

## 5. Scroll e Navegação

### 5.1 Scroll Suave

- `scroll-behavior: smooth` em toda navegação interna.
- Mouse wheel: scroll de 30px por notch (evitar pulos).
- Touchpad: scroll suave com aceleração natural (inércia do sistema).
- Scroll em listas longas: virtual scrolling para performance.
- Scroll em áreas específicas: overflow com scrollbar personalizada.

### 5.2 Scrollbar Personalizada

- Largura: 8px (fina, sem roubar espaço).
- Cor: tom neutro, combinando com o tema.
- Hover: thumb expande para 12px.
- Transparência: scrollbar invisível quando não está em uso (aparece ao scrollar).
- Sempre visível em áreas de conteúdo scrollável com overflow auto.

### 5.3 Navegação por Teclado (Focus)

- Tab order: lógico, seguindo a ordem visual (esquerda → direita, cima → baixo).
- Focus visible: outline de 2px com cor de destaque (azul informativo).
- Focus trap em modais e bottom sheets (esc fecha, tab cíclico dentro do modal).
- Skip to main content: link invisível no topo (atalho `Tab` no primeiro foco).
- Elementos focoáveis: todos os controles interativos (botões, links, inputs, selects).

### 5.4 Scroll Positions

- Ao navegar entre telas: scroll position da tela anterior é preservado no histórico.
- Ao voltar para uma lista: scroll position restaurado.
- Ao clicar em item de lista e voltar: item permanece visível e destacado.
- Dashboard: scroll position não é crítico (curto).
- Conversa: scroll position no final (última mensagem) ao enviar/receber.

---

## 6. Suporte a Múltiplos Monitores

### 6.1 Comportamento

- A Plataforma funciona em janela redimensionada em qualquer monitor.
- Resolução máxima: sem limite (adaptável a ultra-wide 32:9).
- Em ultra-wide (> 2560px): conteúdo centralizado com margens laterais generosas, ou opção de layout expandido com mais colunas.

### 6.2 Janela Independente

- A Plataforma pode ser aberta em múltiplas janelas (não há bloqueio de sessão única).
- Cada janela mantém seu próprio estado de layout.
- Alterações em uma janela refletem em tempo real na outra (via assinatura de dados).
- Notificações aparecem em todas as janelas abertas.
- Cache compartilhado entre janelas (Service Worker / BroadcastChannel).

### 6.3 Detecção de Monitor

- DPI scaling respeitado (imagens e layouts adaptam a 150%, 200%, etc.).
- Posicionamento de modais e toasts: centralizados na janela atual (não no monitor principal fixo).
- Ao arrastar janela entre monitores com DPIs diferentes: plataforma re-renderiza com escala correta.

---

## Apêndice A: Resumo de Layout por Resolução

| Resolução | Colunas | Painel Esquerdo | Conversa | Painel Direito | Observação |
|-----------|---------|----------------|----------|---------------|------------|
| < 800px | 1 | Drawer | 100% | Bottom sheet | Aviso de resolução |
| 800-1023px | 1+ | Drawer | 100% | Toggle | Layout compacto |
| 1024-1279px | 2+ | Ícone lateral | 60% | 280px/toggle | Transição |
| 1280-1519px | 3 | 280px | 720px | 320px | Padrão |
| 1520-1919px | 3 | 320px | 720px | 360px | Confortável |
| 1920px+ | 3+ | 360px | 840px | 400px | Expandido |

---

## Apêndice B: Checklist Desktop

- [ ] Layout 3 colunas funcional em >= 1280px
- [ ] Mensagens centralizadas com max 720px
- [ ] Todos os atalhos de teclado implementados
- [ ] Hover states em todos elementos clicáveis
- [ ] Resolução mínima 800x600 respeitada
- [ ] Scroll suave em toda navegação
- [ ] Tab order lógico e focus visible
- [ ] Scrollbars personalizadas e sutis
- [ ] Layout fluido e responsivo a redimensionamento
- [ ] Salvamento de layout entre sessões
- [ ] Suporte a múltiplos monitores (DPI, janelas)
- [ ] Tooltips com delay de 500ms
- [ ] Colunas redimensionáveis por arrasto
- [ ] Atalho `?` ou `Ctrl + /` com lista de atalhos
- [ ] Modais com focus trap e Esc para fechar
