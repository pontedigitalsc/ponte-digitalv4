# Biblioteca de Microinterações

Catálogo completo de microinterações da Ponte Digital. Cada entrada define o comportamento atômico de um componente em resposta a uma ação ou estado.

---

## INPUT

### 1. Input Focus

| Campo | Valor |
|-------|-------|
| **Componente** | Input de texto, textarea, select |
| **Estado** | Focus |
| **Gatilho** | Empresário clica ou tabula para o campo |
| **Duração** | 200ms |
| **Easing** | ease-out |
| **Comportamento** | Borda sutil ganha cor primária (azul cognitivo), glow externo de 2px com opacidade 0.3 aparece ao redor do campo |
| **Áudio** | `focus-click.wav` (opcional, tom suave 40ms) |

### 2. Input Blur

| Campo | Valor |
|-------|-------|
| **Componente** | Input de texto, textarea, select |
| **Estado** | Blur |
| **Gatilho** | Empresário sai do campo |
| **Duração** | 200ms |
| **Easing** | ease-in-out |
| **Comportamento** | Borda retorna à cor neutra, glow desaparece em fade |
| **Áudio** | — |

### 3. Input Error

| Campo | Valor |
|-------|-------|
| **Componente** | Input de texto |
| **Estado** | Error |
| **Gatilho** | Validação falha (campo obrigatório vazio, formato inválido) |
| **Duração** | 400ms (shake) + 300ms (mensagem) |
| **Easing** | ease-in-out |
| **Comportamento** | Campo treme horizontalmente (3 oscilações de 4px), borda muda para vermelho, mensagem de erro aparece abaixo com fade + slide down |
| **Áudio** | `error-alert.wav` (opcional) |

### 4. Input Success

| Campo | Valor |
|-------|-------|
| **Componente** | Input de texto |
| **Estado** | Success |
| **Gatilho** | Validação bem-sucedida |
| **Duração** | 300ms |
| **Easing** | ease-out |
| **Comportamento** | Borda muda para verde, checkmark aparece à direita com escala de 0→1, fade do checkmark mantém-se visível até próximo input |
| **Áudio** | `success-check.wav` (opcional) |

### 5. Input Disabled

| Campo | Valor |
|-------|-------|
| **Componente** | Input de texto |
| **Estado** | Disabled |
| **Gatilho** | Campo desabilitado por estado do sistema |
| **Duração** | 200ms |
| **Easing** | linear |
| **Comportamento** | Opacidade reduz para 0.4, cursor muda para not-allowed, placeholder mantém-se legível |
| **Áudio** | — |

### 6. Placeholder Change

| Campo | Valor |
|-------|-------|
| **Componente** | Input de texto |
| **Estado** | Normal |
| **Gatilho** | IA altera o placeholder para guiar o empresário |
| **Duração** | 300ms |
| **Easing** | ease-in-out |
| **Comportamento** | Placeholder atual fade out (150ms), novo texto fade in (150ms) |
| **Áudio** | — |

### 7. Character Count

| Campo | Valor |
|-------|-------|
| **Componente** | Input de texto (resposta do empresário) |
| **Estado** | Typing |
| **Gatilho** | Empresário digita caractere |
| **Duração** | 50ms |
| **Easing** | linear |
| **Comportamento** | Contador abaixo do campo atualiza número sem animação; se aproximando do limite, número muda para laranja |
| **Áudio** | — |

---

## BOTÕES

### 8. Button Hover

| Campo | Valor |
|-------|-------|
| **Componente** | Botão primário, secundário, terciário |
| **Estado** | Hover |
| **Gatilho** | Mouse entra na área do botão |
| **Duração** | 150ms |
| **Easing** | ease-out |
| **Comportamento** | Botão primário: opacidade 0.9 + fill mais escuro. Botão secundário: borda + fill sutil |
| **Áudio** | — |

### 9. Button Click

| Campo | Valor |
|-------|-------|
| **Componente** | Todos os botões |
| **Estado** | Active |
| **Gatilho** | Clique ou pressionamento via teclado |
| **Duração** | 100ms |
| **Easing** | ease-in |
| **Comportamento** | Escala reduz para 0.97, retorna a 1.0. Sem ripple (para não competir com foco cognitivo) |
| **Áudio** | `click-press.wav` (opcional) |

### 10. Button Loading

| Campo | Valor |
|-------|-------|
| **Componente** | Botão primário |
| **Estado** | Loading |
| **Gatilho** | Ação é disparada, aguardando resposta |
| **Duração** | Indeterminado (até conclusão) |
| **Easing** | linear |
| **Comportamento** | Texto fade out (100ms), spinner circular aparece com fade in (100ms), label troca para texto de ação ("Enviando...", "Salvando...") |
| **Áudio** | — |

### 11. Button Disabled

| Campo | Valor |
|-------|-------|
| **Componente** | Todos os botões |
| **Estado** | Disabled |
| **Gatilho** | Condição não satisfeita para ação |
| **Duração** | 200ms |
| **Easing** | linear |
| **Comportamento** | Opacidade reduz para 0.4, cursor not-allowed, sem hover state |
| **Áudio** | — |

### 12. Button Success

| Campo | Valor |
|-------|-------|
| **Componente** | Botão primário |
| **Estado** | Success |
| **Gatilho** | Ação concluída com sucesso |
| **Duração** | 600ms |
| **Easing** | ease-out |
| **Comportamento** | Botão muda para verde, ícone de check aparece com escala 0→1, após 600ms retorna ao estado normal ou avança para próxima etapa |
| **Áudio** | `success-confirm.wav` (opcional) |

---

## CARDS

### 13. Card Appear

| Campo | Valor |
|-------|-------|
| **Componente** | Insight card, hypothesis card, info card |
| **Estado** | Enter |
| **Gatilho** | Card é adicionado à tela |
| **Duração** | 400ms |
| **Easing** | ease-out |
| **Comportamento** | Card desliza de baixo para cima (slide up 20px) enquanto fade in de 0→1 |
| **Áudio** | `card-appear.wav` (opcional, tom suave) |

### 14. Card Hover

| Campo | Valor |
|-------|-------|
| **Componente** | Cards clicáveis |
| **Estado** | Hover |
| **Gatilho** | Mouse sobre o card |
| **Duração** | 200ms |
| **Easing** | ease-out |
| **Comportamento** | Elevação sutil (shadow aumenta em 2px, translateY -2px) |
| **Áudio** | — |

### 15. Card Click

| Campo | Valor |
|-------|-------|
| **Componente** | Cards clicáveis |
| **Estado** | Active |
| **Gatilho** | Clique no card |
| **Duração** | 150ms |
| **Easing** | ease-in-out |
| **Comportamento** | Escala 0.98 momentânea, retorna a 1.0 |
| **Áudio** | — |

### 16. Card Dismiss

| Campo | Valor |
|-------|-------|
| **Componente** | Cards descartáveis (notificações, sugestões) |
| **Estado** | Exit |
| **Gatilho** | Empresário clica no X ou desliza |
| **Duração** | 300ms |
| **Easing** | ease-in |
| **Comportamento** | Card desliza para a direita (slide right 50px) enquanto fade out, altura colapsa após movimento |
| **Áudio** | `dismiss-swish.wav` (opcional) |

### 17. Card Expand

| Campo | Valor |
|-------|-------|
| **Componente** | Cards expansíveis (insight detail) |
| **Estado** | Expanded |
| **Gatilho** | Clique no card para expandir |
| **Duração** | 300ms |
| **Easing** | ease-out |
| **Comportamento** | Card escala no eixo Y de 1→altura final, conteúdo interno fade in após 150ms |
| **Áudio** | — |

### 18. Card Collapse

| Campo | Valor |
|-------|-------|
| **Componente** | Cards expansíveis |
| **Estado** | Collapsed |
| **Gatilho** | Clique no card expandido para recolher |
| **Duração** | 250ms |
| **Easing** | ease-in |
| **Comportamento** | Conteúdo interno fade out (100ms), card escala Y de altura atual→1 |
| **Áudio** | — |

---

## MENSAGENS

### 19. Message Appear

| Campo | Valor |
|-------|-------|
| **Componente** | Balão de mensagem da IA |
| **Estado** | Enter |
| **Gatilho** | IA envia nova mensagem |
| **Duração** | 300ms |
| **Easing** | ease-out |
| **Comportamento** | Balão desliza de baixo para cima (slide up 15px), fade in, avatar da IA glow síncrono |
| **Áudio** | `message-in.wav` (opcional) |

### 20. Message Typing

| Campo | Valor |
|-------|-------|
| **Componente** | Indicador de digitação da IA |
| **Estado** | Typing |
| **Gatilho** | IA está processando/gerando resposta |
| **Duração** | Indeterminado (loop) |
| **Easing** | ease-in-out |
| **Comportamento** | Três pontos pulsando com delay alternado (1º → 2º → 3º), ciclo de 1.2s, opacidade alterna entre 0.4 e 1.0 |
| **Áudio** | `typing-tick.wav` (opcional, a cada ponto) |

### 21. Message Received

| Campo | Valor |
|-------|-------|
| **Componente** | Check de mensagem do empresário |
| **Estado** | Sent |
| **Gatilho** | Mensagem do empresário é entregue |
| **Duração** | 300ms |
| **Easing** | ease-out |
| **Comportamento** | Checkmark aparece ao lado da mensagem com escala 0→1, preenche com animação de stroke |
| **Áudio** | — |

### 22. Message Insight

| Campo | Valor |
|-------|-------|
| **Componente** | Mensagem especial de insight da IA |
| **Estado** | Enter |
| **Gatilho** | IA identifica um insight importante |
| **Duração** | 600ms |
| **Easing** | ease-out |
| **Comportamento** | Balão aparece com glow dourado (✦), escala leve 1.02 no pico, glow fade out lentamente (2s) |
| **Áudio** | `insight-chime.wav` (opcional) |

### 23. Message Error

| Campo | Valor |
|-------|-------|
| **Componente** | Mensagem de erro da IA |
| **Estado** | Error |
| **Gatilho** | Falha no processamento, erro de sistema |
| **Duração** | 400ms |
| **Easing** | ease-in-out |
| **Comportamento** | Balão aparece com shake horizontal suave (2 oscilações de 3px), borda vermelha, ícone de erro fade in |
| **Áudio** | `error-beep.wav` (opcional) |

### 24. Message Correction

| Campo | Valor |
|-------|-------|
| **Componente** | Mensagem da IA sendo corrigida |
| **Estado** | Update |
| **Gatilho** | IA ajusta resposta baseada em novo contexto |
| **Duração** | 500ms |
| **Easing** | ease-in-out |
| **Comportamento** | Mensagem anterior fade out (200ms), nova mensagem fade in (300ms), indicador "Corrigido" aparece sutilmente |
| **Áudio** | — |

---

## PAINEL COGNITIVO

### 25. Knowledge Bar Fill

| Campo | Valor |
|-------|-------|
| **Componente** | Barra de conhecimento acumulado |
| **Estado** | Update |
| **Gatilho** | Novo conhecimento é incorporado |
| **Duração** | 600ms |
| **Easing** | ease-out |
| **Comportamento** | Barra preenche da esquerda para a direita com easing, label percentual atualiza em sincronia, cor transiciona conforme nível |
| **Áudio** | `knowledge-fill.wav` (opcional) |

### 26. Hypothesis Card Appear

| Campo | Valor |
|-------|-------|
| **Componente** | Card de hipótese no painel |
| **Estado** | Enter |
| **Gatilho** | IA gera nova hipótese |
| **Duração** | 400ms |
| **Easing** | ease-out |
| **Comportamento** | Card desliza da direita para a esquerda (slide in from right 30px), fade in, badge de confiança aparece após 200ms |
| **Áudio** | — |

### 27. Confidence Update

| Campo | Valor |
|-------|-------|
| **Componente** | Anel de confiança da IA |
| **Estado** | Update |
| **Gatilho** | Confiança da IA em uma hipótese muda |
| **Duração** | 500ms |
| **Easing** | ease-out |
| **Comportamento** | Anel preenche/despreenche com transição suave, valor numérico central atualiza com fade, cor transiciona (baixo=vermelho, médio=amarelo, alto=verde) |
| **Áudio** | — |

### 28. Insight Card Add

| Campo | Valor |
|-------|-------|
| **Componente** | Card de insight no painel |
| **Estado** | Enter |
| **Gatilho** | Novo insight registrado |
| **Duração** | 500ms |
| **Easing** | ease-out |
| **Comportamento** | Card aparece com destaque amarelo no background (2s fade out), ícone de lâmpada escala 0→1, borda sutil |
| **Áudio** | `insight-add.wav` (opcional) |

### 29. Lacuna Appear

| Campo | Valor |
|-------|-------|
| **Componente** | Badge de lacuna de conhecimento |
| **Estado** | Enter |
| **Gatilho** | IA identifica lacuna no conhecimento do empresário |
| **Duração** | 300ms |
| **Easing** | ease-out |
| **Comportamento** | Badge aparece com fade in + slide up sutil (5px), ícone de "?" escala de 0→1, cor laranja |
| **Áudio** | — |

---

## TRANSIÇÕES

### 30. Screen Transition

| Campo | Valor |
|-------|-------|
| **Componente** | Tela inteira |
| **Estado** | Navigate |
| **Gatilho** | Mudança de rota/página |
| **Duração** | 400ms |
| **Easing** | ease-in-out |
| **Comportamento** | Tela atual fade out (200ms), nova tela fade in (200ms), overlay de transição com cor neutra |
| **Áudio** | — |

### 31. Section Change

| Campo | Valor |
|-------|-------|
| **Componente** | Seção dentro de uma tela |
| **Estado** | Navigate |
| **Gatilho** | Mudança de seção via menu ou ação |
| **Duração** | 300ms |
| **Easing** | ease-out |
| **Comportamento** | Seção antiga slide left + fade out (150ms), nova seção slide right + fade in (150ms) |
| **Áudio** | — |

### 32. Tab Switch

| Campo | Valor |
|-------|-------|
| **Componente** | Abas (tabs) |
| **Estado** | Active |
| **Gatilho** | Clique em nova aba |
| **Duração** | 250ms |
| **Easing** | ease-out |
| **Comportamento** | Aba ativa anterior fade out (100ms), nova aba fade in + slide up (150ms), indicador de aba desliza horizontalmente |
| **Áudio** | — |

### 33. Modal Open

| Campo | Valor |
|-------|-------|
| **Componente** | Modal |
| **Estado** | Open |
| **Gatilho** | Ação que abre modal |
| **Duração** | 300ms |
| **Easing** | ease-out |
| **Comportamento** | Overlay fade in (150ms), modal escala de 0.95→1 + fade in (150ms), conteúdo interno fade in após 200ms |
| **Áudio** | — |

### 34. Modal Close

| Campo | Valor |
|-------|-------|
| **Componente** | Modal |
| **Estado** | Close |
| **Gatilho** | Ação que fecha modal (X, esc, submit) |
| **Duração** | 200ms |
| **Easing** | ease-in |
| **Comportamento** | Modal fade out + escala 1→0.95 (100ms), overlay fade out (100ms) |
| **Áudio** | — |

---

## LOADING

### 35. Spinner Cognitive

| Campo | Valor |
|-------|-------|
| **Componente** | Spinner da IA |
| **Estado** | Loading |
| **Gatilho** | IA processando análise complexa |
| **Duração** | Indeterminado (loop de 2s) |
| **Easing** | linear |
| **Comportamento** | Círculo rotaciona (rotação contínua, 1 volta/2s), texto alterna entre mensagens cognitivas a cada 4s ("Analisando dados...", "Buscando padrões...") |
| **Áudio** | — |

### 36. Progress Bar

| Campo | Valor |
|-------|-------|
| **Componente** | Barra de progresso determinada |
| **Estado** | Loading |
| **Gatilho** | Processo com progresso mensurável |
| **Duração** | Conforme progresso (mínimo 300ms) |
| **Easing** | linear |
| **Comportamento** | Barra preenche horizontalmente, label percentual acompanha, cor sólida sem gradiente |
| **Áudio** | — |

### 37. Skeleton Screen

| Campo | Valor |
|-------|-------|
| **Componente** | Placeholder de cards/mensagens |
| **Estado** | Loading |
| **Gatilho** | Conteúdo está sendo carregado |
| **Duração** | Indeterminado (loop de 1.5s) |
| **Easing** | ease-in-out |
| **Comportamento** | Blocos retangulares com cor neutra, shimmer (gradiente móvel) passando da esquerda para a direita, ciclo de 1.5s |
| **Áudio** | — |

### 38. Phase Transition

| Campo | Valor |
|-------|-------|
| **Componente** | Indicador de fase cognitiva |
| **Estado** | Transition |
| **Gatilho** | IA muda de fase (ex: análise → insight) |
| **Duração** | 400ms |
| **Easing** | ease-in-out |
| **Comportamento** | Texto da fase atual fade out (200ms), novo texto fade in (200ms), ícone da fase transiciona com rotação suave |
| **Áudio** | `phase-change.wav` (opcional) |

---

## NOTIFICAÇÕES

### 39. Toast Appear

| Campo | Valor |
|-------|-------|
| **Componente** | Toast notification |
| **Estado** | Enter |
| **Gatilho** | Evento de notificação (processo concluído, alerta) |
| **Duração** | 300ms |
| **Easing** | ease-out |
| **Comportamento** | Toast desliza de cima para baixo (slide down 20px) + fade in, ícone de tipo aparece (info/success/warning/error) |
| **Áudio** | `toast-in.wav` (opcional) |

### 40. Toast Dismiss

| Campo | Valor |
|-------|-------|
| **Componente** | Toast notification |
| **Estado** | Exit |
| **Gatilho** | Tempo expirado (4s) ou clique no dismiss |
| **Duração** | 300ms |
| **Easing** | ease-in |
| **Comportamento** | Toast desliza para cima (slide up 20px) + fade out |
| **Áudio** | — |

### 41. Badge Update

| Campo | Valor |
|-------|-------|
| **Componente** | Badge de notificação |
| **Estado** | Update |
| **Gatilho** | Novo evento incrementa contador |
| **Duração** | 400ms |
| **Easing** | ease-out |
| **Comportamento** | Badge escala 1→1.3→1 (pulse), número fade out/in se valor mudar |
| **Áudio** | — |

### 42. Alert Appear

| Campo | Valor |
|-------|-------|
| **Componente** | Alerta no topo da tela |
| **Estado** | Enter |
| **Gatilho** | Evento crítico (erro de sistema, dado inconsistente) |
| **Duração** | 400ms |
| **Easing** | ease-out |
| **Comportamento** | Alerta desliza do topo (slide down 30px), ícone de alerta aparece com escala, fundo com cor de severidade, borda lateral esquerda colorida |
| **Áudio** | `alert-critical.wav` (opcional) |

---

## AVATAR IA

### 43. Avatar Idle

| Campo | Valor |
|-------|-------|
| **Componente** | Avatar da IA |
| **Estado** | Idle |
| **Gatilho** | IA ociosa, aguardando input |
| **Duração** | Ciclo de 4s (loop contínuo) |
| **Easing** | ease-in-out |
| **Comportamento** | Avatar move-se sutilmente no eixo Y (2px para cima e para baixo), ciclo de 4s, opacidade estável em 0.9, sem glow |
| **Áudio** | — |

### 44. Avatar Thinking

| Campo | Valor |
|-------|-------|
| **Componente** | Avatar da IA |
| **Estado** | Thinking |
| **Gatilho** | IA processando pergunta ou dados |
| **Duração** | Indeterminado (até resposta pronta) |
| **Easing** | ease-in-out |
| **Comportamento** | Avatar inclina levemente (rotate 3°), olhar direcionado para cima/ diagonal, glow pulsante sutil (opacidade 0→0.2), ciclo de 2s |
| **Áudio** | — |

### 45. Avatar Speaking

| Campo | Valor |
|-------|-------|
| **Componente** | Avatar da IA |
| **Estado** | Speaking |
| **Gatilho** | IA está emitindo mensagem de texto/som |
| **Duração** | Enquanto IA fala |
| **Easing** | ease-out |
| **Comportamento** | Avatar em posição neutra, glow ativo (opacidade 0.3~0.5), leve animação de "fala" (boca/forma sutil se aplicável), olhar direcionado ao centro |
| **Áudio** | `voice-feedback.wav` (se aplicável) |

### 46. Avatar Listening

| Campo | Valor |
|-------|-------|
| **Componente** | Avatar da IA |
| **Estado** | Listening |
| **Gatilho** | Empresário está digitando ou falando |
| **Duração** | Enquanto empresário inputa |
| **Easing** | ease-out |
| **Comportamento** | Avatar inclina ligeiramente para frente (translateY 3px), olhar direcionado ao campo de input, glow reduzido (opacidade 0.1) |
| **Áudio** | — |

### 47. Avatar Success

| Campo | Valor |
|-------|-------|
| **Componente** | Avatar da IA |
| **Estado** | Success |
| **Gatilho** | Insight confirmado, objetivo alcançado |
| **Duração** | 800ms |
| **Easing** | ease-out |
| **Comportamento** | Avatar glow dourado (opacidade 0→0.5→0) ao longo de 800ms, escala 1→1.05→1 nos primeiros 400ms, expressão de satisfação |
| **Áudio** | `success-triumph.wav` (opcional) |

---

## Ações do Empresário

### 48. Selection Change

| Campo | Valor |
|-------|-------|
| **Componente** | Radio, checkbox, toggle |
| **Estado** | Selected |
| **Gatilho** | Empresário seleciona opção |
| **Duração** | 200ms |
| **Easing** | ease-out |
| **Comportamento** | Check/radio fill animado de 0→100%, toggle desliza suavemente, feedback de seleção |
| **Áudio** | `select-tick.wav` (opcional) |

### 49. Action Confirm

| Campo | Valor |
|-------|-------|
| **Componente** | Botão de confirmação (ação destrutiva ou importante) |
| **Estado** | Confirm |
| **Gatilho** | Empresário confirma ação crítica |
| **Duração** | 300ms |
| **Easing** | ease-out |
| **Comportamento** | Botão muda para estado de confirmação (cor vermelha/laranja), texto muda para "Confirmar", segundo clique executa |
| **Áudio** | — |

### 50. Drag & Drop

| Campo | Valor |
|-------|-------|
| **Componente** | Card, item de lista |
| **Estado** | Dragging |
| **Gatilho** | Empresário inicia arrasto |
| **Duração** | Tempo real (follow cursor) |
| **Easing** | linear |
| **Comportamento** | Item reduz opacidade (0.8), eleva (shadow +4px), item original ghost (opacidade 0.3), zona de drop destacada com dashed border |
| **Áudio** | `drag-start.wav`, `drag-drop.wav` (opcional) |

---

## Sistema (background)

### 51. Auto-Save

| Campo | Valor |
|-------|-------|
| **Componente** | Indicador de salvamento |
| **Estado** | Saving |
| **Gatilho** | Sistema salva dados automaticamente |
| **Duração** | 800ms |
| **Easing** | ease-out |
| **Comportamento** | Texto "Salvo" aparece com fade (verde, 300ms), permanece 500ms, fade out 200ms; se erro, texto "Erro ao salvar" (vermelho) |
| **Áudio** | — |

### 52. Connection Status

| Campo | Valor |
|-------|-------|
| **Componente** | Indicador de conexão |
| **Estado** | Online / Offline |
| **Gatilho** | Mudança no estado da rede |
| **Duração** | 500ms |
| **Easing** | ease-out |
| **Comportamento** | Indicador no canto: online = ponto verde discreto, offline = ponto vermelho + texto "Offline" com fade in, reconexão automática com fade para verde |
| **Áudio** | `connection-lost.wav` (opcional) |

### 53. Sync Indicator

| Campo | Valor |
|-------|-------|
| **Componente** | Ícone de sincronização |
| **Estado** | Syncing |
| **Gatilho** | Dados sendo sincronizados com servidor |
| **Duração** | Indeterminado (loop de 2s) |
| **Easing** | linear |
| **Comportamento** | Ícone de seta circular rotaciona (1 volta/2s), opacidade 0.6 |
| **Áudio** | — |

---

## Resumo de Temporização

| Categoria | Duração típica | Easing padrão |
|-----------|----------------|---------------|
| Feedback imediato (hover, click, focus) | 100–200ms | ease-out |
| Microinterações (badge, check, pulse) | 200–400ms | ease-out |
| Transições (slide, fade, expand) | 300–500ms | ease-in-out |
| Aparições (card, message, modal) | 300–600ms | ease-out |
| Loading (spinner, skeleton, bar) | Indeterminado / loop | linear |
| Silêncio cognitivo | 2000–8000ms | — |
