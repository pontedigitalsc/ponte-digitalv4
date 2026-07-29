# Microinterações

## Propósito

Cada movimento na interface da Ponte Digital deve comunicar um estado interno da inteligência. Nada é decorativo. Toda animação, transição e feedback revela algo sobre o processo cognitivo em andamento.

## Princípios

1. **Propósito**: toda microinteração comunica um estado mental da IA
2. **Tempo**: duração transmite confiança (rápido = certo, lento = pensando)
3. **Suavidade**: transições bruscas quebram a imersão cognitiva
4. **Hierarquia**: microinterações nunca competem — uma domina por vez
5. **Consistência**: o mesmo padrão visual = o mesmo estado mental

---

## Abertura (Pré-Conversa)

### IA Aparece

| Campo | Valor |
|---|---|
| Gatilho | Login completo ou recarregar página |
| Descrição | IA "entra" na tela com saudação |
| Duração | 600ms |
| Easing | ease-out |
| Elementos afetados | Avatar + saudação + painel |
| Sequência | Campo de texto (0ms) → Avatar (100ms) → Saudação (200ms) → Painel (300ms) |

**Animação:**
- Avatar: escala de 0.8 → 1.0 com fade
- Saudação: slide up (20px → 0) + fade, texto "datilografado"
- Painel: slide in da direita (40px → 0) + fade

---

## Interação com Mensagens

### Empresário Digita

| Campo | Valor |
|---|---|
| Gatilho | Input focus |
| Descrição | Campo de texto ganha destaque |
| Duração | 200ms |
| Easing | ease-out |
| Efeito | Borda sutil + glow de 1px + placeholder fade |
| Som (opcional) | Clique suave (input ativo) |

### Empresário Envia Mensagem

| Campo | Valor |
|---|---|
| Gatilho | Enter ou clique em enviar |
| Duração | 300ms |
| Easing | ease-out |
| Sequência | Haptic feedback (mobile) → Texto some do input → Card do empresário aparece |

**Animação do card:**
- Slide up (30px → 0)
- Fade in (0 → 1)
- Fundo: tom secundário da marca com 10% opacidade
- Badge "Enviando..." com pulso sutil (opacidade 70-100%, 1s ciclo)

### Mensagem Recebida (IA Confirma)

| Campo | Valor |
|---|---|
| Gatilho | Resposta do servidor |
| Duração | 400ms |
| Easing | ease-out |

**Animação:**
- Badge "Enviando..." → "✓ Recebido" com fade (200ms)
- Texto do empresário ganha opacidade total (70% → 100%)
- Barra de digitação da IA aparece abaixo

### IA Começa a Pensar

| Campo | Valor |
|---|---|
| Gatilho | IA inicia processamento |
| Duração | 200ms de transição |
| Easing | ease-in-out |

**Animação:**
- Três pontos (•) aparecem com opacidade sequencial (cada um 100ms)
- Texto dinâmico abaixo: "Pensando..." → muda conforme o processo
- Avatar da IA: leve pulsação (0.5px scale, 2s ciclo)
- Painel cognitivo: área de hipóteses ativa animação de "busca"

### IA Termina de Pensar

| Campo | Valor |
|---|---|
| Gatilho | IA conclui processamento |
| Duração | 300ms |
| Easing | ease-out |

**Animação:**
- Pontos somem em fade (100ms)
- Card da IA slide up + fade (300ms)
- Texto da IA aparece (datilografado se for insight, instantâneo se for pergunta simples)

---

## Perguntas e Respostas

### Nova Pergunta Aparece

| Campo | Valor |
|---|---|
| Gatilho | IA define próxima pergunta |
| Duração | 400ms |
| Easing | ease-out |
| Animação | Slide up (15px → 0) + fade |
| Tom | Sem destaque especial (pergunta é continuação natural) |

### Pergunta Complexa

| Campo | Valor |
|---|---|
| Gatilho | Pergunta de alto valor estratégico |
| Duração | 600ms |
| Easing | ease-out |
| Animação | Slide up + fade + leve glow inicial (1s) |
| Diferenciação | Fonte ligeiramente maior (16px → 18px) |
| Texto de apoio | Badge "Pergunta importante" (opcional) |

### Resposta Confirmada

| Campo | Valor |
|---|---|
| Gatilho | Empresário confirma hipótese |
| Duração | 500ms |
| Easing | ease-out |
| Animação | Badge verde "✓ Confirmado" aparece no card da hipótese |
| Confiança | Barra de confiança no painel incrementa com animação de preenchimento |
| Feedback | Leve vibração (mobile) ou flash verde sutil |

### Resposta Contradita

| Campo | Valor |
|---|---|
| Gatilho | Empresário corrige IA |
| Duração | 600ms |
| Easing | ease-in-out |
| Animação | Hipótese existente: badge "Revisando" (âmbar) |
| Confiança | Barra diminui suavemente (600ms) |
| Mapa | Conexão é quebrada com animação (linha se desfaz) |
| IA | "Entendi. Vou ajustar minha compreensão." |

---

## Insights e Descobertas

### Insight Aparece

| Campo | Valor |
|---|---|
| Gatilho | IA atinge confiança > 60% em relação causal |
| Duração | 800ms (entrada) |
| Easing | ease-out |
| Destaque | 3s de duração após aparecer |

**Sequência de animação:**
1. IA para de digitar (se estiver) — 100ms
2. Pausa dramática (500ms-1s)
3. Ícone ✦ aparece com escala 0 → 1 + glow (400ms)
4. Texto do insight slide up (400ms)
5. Após 3s: destaque fading out (500ms)
6. Card retorna ao estado normal

**Efeitos colaterais:**
- Painel: novo card de insight adicionado (slide in da direita, 400ms)
- Confiança: sobe com animação (600ms)
- Mapa: nova conexão aparece (linha animada, 500ms)
- Som (opcional): "ping" suave ascendente

### Descoberta Menor

| Campo | Valor |
|---|---|
| Gatilho | IA encontra padrão com confiança 40-60% |
| Duração | 500ms |
| Easing | ease-out |
| Diferenciação | Sem ✦, apenas texto com badge "Descoberta" |
| Destaque | 1.5s (menos dramático) |

### Múltiplos Insights Rápidos

| Campo | Valor |
|---|---|
| Gatilho | Vários padrões detectados simultaneamente |
| Duração | 300ms entre cada um |
| Easing | ease-out |
| Comportamento | Segundo insight aparece 500ms após o primeiro |
| Acumulação | Ambos visíveis, segundo abaixo do primeiro |

---

## Painel Cognitivo

### Barra de Conhecimento Atualiza

| Campo | Valor |
|---|---|
| Gatilho | Nova informação em área específica |
| Duração | 600ms |
| Easing | ease-out |
| Animação | Barra preenche da esquerda para a direita |
| Cor | Específica por área (ver ARQUITETURA_VISUAL) |
| Valor numérico | Atualiza com transição (contagem animada) |

### Card de Hipótese Aparece

| Campo | Valor |
|---|---|
| Gatilho | IA forma nova hipótese |
| Duração | 400ms |
| Easing | ease-out |
| Animação | Slide in da direita + fade |
| Posição | Abaixo dos cards existentes |
| Hierarquia | Cards ordenados por confiança (maior no topo) |

### Card de Hipótese é Confirmado

| Campo | Valor |
|---|---|
| Gatilho | Empresário confirma |
| Duração | 400ms |
| Easing | ease-out |
| Animação | Card ganha borda verde + badge "✓ Confirmado" |
| Posição | Sobe na hierarquia (mais confiante = mais visível) |

### Card de Hipótese é Revisado

| Campo | Valor |
|---|---|
| Gatilho | Empresário contradiz |
| Duração | 500ms |
| Easing | ease-in-out |
| Animação | Card perde destaque, badge "Revisando" |
| Posição | Desce na hierarquia |

### Confiança Atualiza

| Campo | Valor |
|---|---|
| Gatilho | Qualquer dado novo processado |
| Duração | 600ms |
| Easing | ease-out |
| Animação | Anel de confiança (circular) preenche ou esvazia |
| Valor | Número central anima (contagem) |
| Cor | Varia conforme nível (vermelho < 30% → âmbar < 60% → verde) |

### Lacunas Identificadas

| Campo | Valor |
|---|---|
| Gatilho | IA detecta área não explorada |
| Duração | 300ms |
| Easing | ease-out |
| Animação | Badge "?" aparece na área do mapa |
| Texto | Área fica destacada como "Não explorada" |

---

## Transições de Tela

### Login → Conversa

| Campo | Valor |
|---|---|
| Gatilho | Autenticação bem-sucedida |
| Duração | 600ms |
| Easing | ease-out |
| Animação | Fade out da tela de login (300ms) → Fade in da conversa (300ms) |
| IA | Aparece 200ms após fade in completo |

### Conversa → Resumo Parcial

| Campo | Valor |
|---|---|
| Gatilho | 5 perguntas respondidas |
| Duração | 700ms |
| Easing | ease-out |
| Animação | Card de resumo expande de cima (scale Y 0 → 1) |
| Conteúdo | Fade in sequencial dos itens (100ms entre cada) |
| Botão "Continuar" | Fade in após 3s (tempo de leitura) |

### Conversa → Diagnóstico Final

| Campo | Valor |
|---|---|
| Gatilho | Análise concluída |
| Duração | 800ms |
| Easing | ease-out |
| Animação | Cards de resultado aparecem em cascata (200ms entre cada) |
| Painel | Todos os elementos em estado "completo" com badges verdes |

### Conversa → Dashboard

| Campo | Valor |
|---|---|
| Gatilho | Empresário clica "Ver dashboard completo" |
| Duração | 500ms |
| Easing | ease-out |
| Animação | Transição suave: conversa fade out, dashboard fade in |
| Posição | Dashboard mantém painel cognitivo à direita |

---

## Estados Especiais

### Retorno do Empresário (Sessão Anterior)

| Campo | Valor |
|---|---|
| Gatilho | Login com sessão anterior |
| Duração | 400ms |
| Easing | ease-out |
| Animação | IA: "Bem-vindo de volta" (tom diferente da primeira vez) |
| Painel | Último estado restaurado com fade in |
| Mensagens | Últimas 3 mensagens visíveis (histórico acima disponível) |

### Erro de Rede

| Campo | Valor |
|---|---|
| Gatilho | Falha de conexão |
| Duração | 200ms (imediato) |
| Easing | ease-in |
| Animação | Badge "Conexão perdida" aparece no topo (slide down) |
| Input | Mensagem fica em estado "Não enviada" (ícone de alerta) |
| Reconexão | Badge "Conexão restabelecida" (fade, 300ms) + mensagens reenviadas |

### Timeout (IA Demora)

| Campo | Valor |
|---|---|
| Gatilho | IA não responde em 8s |
| Ação 1 (8s) | Texto muda: "Ainda estou analisando..." |
| Ação 2 (15s) | Texto muda: "Estou processando informações complexas. Mais alguns instantes." |
| Ação 3 (30s) | Botão: "Receber notificação quando terminar" / "Continuar sem análise completa" |

---

## Microinterações no Campo de Texto

### Placeholder Dinâmico

| Estado | Placeholder |
|---|---|
| Aguardando pergunta | "Digite sua resposta..." |
| IA fez pergunta | "Digite sua resposta..." |
| IA processando | "Aguardando IA..." (desabilitado) |
| Insight aparecendo | "Aguardando..." (desabilitado) |
| Erro | "Tente novamente..." |

### Input Estado

| Estado | Borda | Fundo | Texto |
|---|---|---|---|
| Normal | 1px solid (neutro) | Branco | Primário |
| Foco | 2px solid (primary) | Branco | Primário |
| Desabilitado | 1px solid (30% opacidade) | Cinza 5% | Cinza |
| Erro | 1px solid (vermelho) | Vermelho 5% | Primário |
| Enviando | 1px solid (primary, 50%) | Branco | Primário (50%) |

### Botão de Envio

| Estado | Ícone | Cor | Hover |
|---|---|---|---|
| Normal | Seta → | Primary | Opacidade 80% |
| Habilitado | → | Primary | Fundo mais escuro |
| Desabilitado | → | Cinza | Nenhum |
| Enviando | Spinner | Primary | Nenhum |

---

## Guia de Duração por Intenção

| Intenção | Duração | Easing |
|---|---|---|
| Confirmar | 200-400ms | ease-out |
| Notificar | 300-500ms | ease-out |
| Transicionar | 400-700ms | ease-out |
| Surpreender | 600-1000ms | ease-out |
| Celebrar | 500-800ms | ease-out |
| Corrigir | 400-600ms | ease-in-out |
| Aguardar | 200ms (entrada), mantém | linear |

---

## Regras de Inibição

Durante as seguintes situações, microinterações são INIBIDAS (não acumulam fila):

- Empresário está digitando (inputs não competem com animações)
- IA está exibindo insight (nenhuma nova animação até destaque terminar)
- Transição de tela em andamento
- Estado de erro ativo

Após a inibição, a fila de animações é processada em ordem de prioridade:

1. Erro/timeout
2. Insight/descoberta
3. Confirmação de hipótese
4. Atualização de painel
5. Nova pergunta
6. Atualização de barra

---

## Checklist de Microinterações

- [ ] IA aparecendo (login/refresh): fade + slide, 600ms
- [ ] Empresário enviando: card slide up, 300ms
- [ ] IA recebendo: badge "✓", 200ms
- [ ] IA pensando: pontos + texto dinâmico
- [ ] IA terminando: fade dos pontos + slide do card, 300ms
- [ ] Insight: ✦ com glow + destaque 3s
- [ ] Nova pergunta: slide up, 400ms
- [ ] Confirmação de hipótese: badge verde, confiança sobe
- [ ] Correção de hipótese: badge âmbar, confiança desce
- [ ] Barra de conhecimento: preenchimento animado, 600ms
- [ ] Transição de tela: fade + scale, 500-800ms
- [ ] Erro de rede: badge imediato, 200ms
- [ ] Timeout: texto progressivo, 8/15/30s
- [ ] Placeholder do input: muda conforme estado
- [ ] Botão de envio: estados normal/foco/desabilitado/enviando
- [ ] Inibição de fila durante digitação, insight, transição, erro
- [ ] Prioridade de fila: erro > insight > confirmação > painel > pergunta > barra
