# Auditoria de Microinterações (Camada 9) e Sistema Emocional (Camada 10)

> **Propósito:** Comparar a especificação documentada das Bibliotecas P23/P27 contra o código real em `/sistema/src/`. Classificar cada item, identificar lacunas críticas e priorizar materialização.

---

## PARTE 1 — MICROINTERAÇÕES

### Sumário Executivo

| Métrica | Valor |
|---|---|
| Microinterações especificadas (P27 Biblioteca) | 53 |
| Implementadas completamente | 0 (0%) |
| Implementadas parcialmente | 14 (26%) |
| Não implementadas | 39 (74%) |
| Animações CSS definidas no globals.css | 4 (fadeIn, slideUp, scaleIn, pulseSoft) |
| Frameworks de animação usados | Tailwind `transition-all`, animações CSS puras |
| Sistema de fila de animações | **Ausente** |
| Inibição por estado | **Ausente** |

### Conclusão fundamental

Nenhuma microinteração está 100% implementada conforme a especificação P27. O código real tem **esboços funcionais** mas **sem animação, sem temporização, sem easing, sem áudio, sem fila**. O gap entre documentação e realidade é o maior de todas as camadas auditadas até P29.

---

### Auditoria Detalhada — 53 Microinterações da Biblioteca P27

#### INPUT (7 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 1 | **Input Focus** | Não | `question-card.tsx:31` tem `focus:ring-2 focus:ring-primary/50 transition-shadow` — é o padrão shadcn, sem glow 2px | Spec: 200ms ease-out. Real: 150ms default Tailwind | Borda muda mas não há glow externo com opacidade 0.3 | P2 |
| 2 | **Input Blur** | Não | Sem implementação específica — usa comportamento nativo do browser | Spec: 200ms ease-in-out. Real: nativo (0ms) | Nenhuma transição de retorno | P3 |
| 3 | **Input Error** | Parcial | `conversa/page.tsx:184-188` — div de erro existe com `border-destructive` | Spec: 400ms shake + 300ms msg. Real: aparece instantaneamente | **Sem shake**, sem easing ease-in-out, sem mensagem de erro animada | P1 |
| 4 | **Input Success** | Não | Não existe. Nenhum componente tem estado de sucesso visual | — | Checkmark com escala 0→1, borda verde | P3 |
| 5 | **Input Disabled** | Parcial | `question-card.tsx:33` usa `disabled={enviando}` — Tailwind `disabled:opacity-40` | Spec: 200ms linear. Real: instantâneo (default) | Transição de 200ms ausente, cursor `not-allowed` é padrão | P3 |
| 6 | **Placeholder Change** | Não | Placeholder é estático: `"Digite sua resposta..."` | Spec: 300ms ease-in-out crossfade | Placeholder não muda conforme estado da IA | P1 |
| 7 | **Character Count** | Não | Não existe nenhum contador de caracteres | — | Funcionalidade inteira ausente | P4 |

#### BOTÕES (5 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 8 | **Button Hover** | Parcial | `button.tsx` usa `hover:bg-primary/90`, `transition-colors` | Spec: 150ms ease-out. Real: 150ms default | Spec pede opacidade 0.9 + fill mais escuro, mas não há efeito de elevação ou scale; botão outline não tem fill sutil | P2 |
| 9 | **Button Click** | Não | Nenhum botão tem `active:scale-95` ou escala momentânea | Spec: 100ms ease-in, escala 0.97 | **Microinteração tátil mais básica ausente** | P1 |
| 10 | **Button Loading** | Parcial | `question-card.tsx:62` mostra texto "Enviando..." mas **sem spinner** | Spec: texto fade out 100ms, spinner fade in 100ms | Apenas texto, sem spinner circular, sem animação crossfade | P1 |
| 11 | **Button Disabled** | Parcial | `button.tsx` usa `disabled:opacity-50`, `disabled:pointer-events-none` | Spec: 200ms linear. Real: instantâneo | Transição de 200ms ausente; cursor not-allowed é padrão | P3 |
| 12 | **Button Success** | Não | Não existe em nenhum componente | Spec: 600ms ease-out, check scale 0→1 | Funcionalidade inteira ausente | P2 |

#### CARDS (6 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 13 | **Card Appear** | Parcial | `question-card.tsx`, `revelacao-card.tsx` usam `animate-fade-in` (0.4s) | Spec: 400ms ease-out + slide up 20px. Real: 0.4s ease-out sem slide | **Slide up ausente**; `slideUp` (0.35s) existe no CSS mas não é usado em cards | P1 |
| 14 | **Card Hover** | Parcial | `question-card.tsx:45` tem `hover:border-primary/50 hover:bg-accent` | Spec: 200ms ease-out, shadow +2px, translateY -2px | Sem elevação (shadow), sem translateY. Apenas transição de cor | P2 |
| 15 | **Card Click** | Não | Nenhum card tem `active:scale-[0.98]` | Spec: 150ms ease-in-out, escala 0.98 | Nenhum feedback tátil de clique em cards | P2 |
| 16 | **Card Dismiss** | Não | Não existe mecanismo de dismiss em cards | Spec: 300ms ease-in, slide right 50px + fade | Funcionalidade inteira ausente | P4 |
| 17 | **Card Expand** | Não | Nenhum card tem estado expansível animado | Spec: 300ms ease-out, scaleY | Funcionalidade inteira ausente | P3 |
| 18 | **Card Collapse** | Não | Nenhum card tem estado de recolhimento animado | Spec: 250ms ease-in | Funcionalidade inteira ausente | P3 |

#### MENSAGENS (6 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 19 | **Message Appear** | Parcial | `chat.tsx` renderiza mensagens sem animação de entrada | Spec: 300ms ease-out, slide up 15px + fade + avatar glow | **Zero animação** nas mensagens do chat; apenas render condicional | **P0** |
| 20 | **Message Typing** | Parcial | `chat-message.tsx:36-39` — três dots com `animate-bounce` + `[animation-delay]` | Spec: loop 1.2s, ease-in-out, opacidade 0.4→1.0 | Dots existem mas sem delay alternado de 1º→2º→3º, sem opacidade variável | P1 |
| 21 | **Message Received** | Não | Não existe checkmark de entrega nas mensagens do empresário | Spec: 300ms ease-out, check escala 0→1 com stroke animado | Funcionalidade inteira ausente | P2 |
| 22 | **Message Insight** | Parcial | `revelacao-card.tsx` tem `<Sparkles/>` mas sem animação de glow | Spec: 600ms ease-out, glow dourado, escala 1.02 no pico, glow fade out 2s | **Glow de insight ausente** — ícone é estático, sem glow, sem escala | **P0** |
| 23 | **Message Error** | Não | Banner de erro existe em `conversa/page.tsx:184` e `chat.tsx:416` mas sem animação | Spec: 400ms ease-in-out, shake horizontal 2 oscilações 3px | Sem shake, sem borda vermelha animada | P1 |
| 24 | **Message Correction** | Não | Não existe mecanismo de correção de mensagem da IA | Spec: 500ms ease-in-out, fade out/in, indicador "Corrigido" | Funcionalidade inteira ausente | P2 |

#### PAINEL COGNITIVO (5 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 25 | **Knowledge Bar Fill** | Parcial | `progress-bar.tsx:36` — barra com `transition-all duration-500` | Spec: 600ms ease-out. Real: 500ms ease-out (aproximado) | Label percentual não anima em sincronia; cor não transiciona por nível | P1 |
| 26 | **Hypothesis Card Appear** | Não | Painel de hipóteses não existe no frontend real | Spec: 400ms ease-out, slide-in from right 30px | **Painel cognitivo ausente** | **P0** |
| 27 | **Confidence Update** | Não | **Anel de confiança não existe** em lugar nenhum | Spec: 500ms ease-out, anel preenche/despreenche | **Elemento de assinatura #1 ausente** | **P0** |
| 28 | **Insight Card Add** | Não | Nenhum card de insight animado no painel | Spec: 500ms ease-out, destaque amarelo 2s | Funcionalidade inteira ausente | P1 |
| 29 | **Lacuna Appear** | Não | Nenhum badge de lacuna implementado | Spec: 300ms ease-out, "?" escala 0→1 | Funcionalidade inteira ausente | P2 |

#### TRANSIÇÕES (5 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 30 | **Screen Transition** | Não | Navegação Next.js é instantânea (RSC), sem overlay de transição | Spec: 400ms ease-in-out, fade out 200ms + fade in 200ms | **Transição entre telas zerada** — sem fade, sem overlay | **P0** |
| 31 | **Section Change** | Não | Não existe mudança de seção animada | Spec: 300ms ease-out, slide left/right | Funcionalidade inteira ausente | P3 |
| 32 | **Tab Switch** | Não | Não há tabs no frontend real | Spec: 250ms ease-out | Funcionalidade inteira ausente | P4 |
| 33 | **Modal Open** | Parcial | `dialog.tsx` (shadcn) existe mas sem animação de escala | Spec: 300ms ease-out, overlay 150ms + modal 150ms | Overlay fade in e scale 0.95→1 ausentes | P2 |
| 34 | **Modal Close** | Não | Não há animação de fechamento de modal | Spec: 200ms ease-in | Funcionalidade inteira ausente | P2 |

#### LOADING (4 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 35 | **Spinner Cognitive** | Parcial | `conversa/page.tsx:158` — spinner com `animate-spin` + texto "Iniciando conversa..." | Spec: loop 2s, texto alterna a cada 4s | **Texto dinâmico não alterna**; spinner é genérico, sem identidade visual cognitiva | P1 |
| 36 | **Progress Bar** | Parcial | `progress-bar.tsx` — existe como stepper + barra | Spec: mínimo 300ms, linear | Stepper é funcional mas sem animação de transição entre etapas; label não anima | P2 |
| 37 | **Skeleton Screen** | Não | Não existe nenhum componente skeleton | Spec: loop 1.5s, shimmer gradiente móvel | Funcionalidade inteira ausente | P2 |
| 38 | **Phase Transition** | Não | Não há indicador de fase cognitiva | Spec: 400ms ease-in-out, fade texto + rotação ícone | Funcionalidade inteira ausente | P2 |

#### NOTIFICAÇÕES (4 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 39 | **Toast Appear** | Não | **Não existe sistema de toast/notificação** | Spec: 300ms ease-out, slide down 20px + fade | **Ausência completa de sistema de notificações** | **P0** |
| 40 | **Toast Dismiss** | Não | Não existe | Spec: 300ms ease-in | Ausente | P1 |
| 41 | **Badge Update** | Não | Não existe badge com contador animado | Spec: 400ms ease-out, pulse 1→1.3→1 | Ausente | P2 |
| 42 | **Alert Appear** | Parcial | `conversa/page.tsx:184` e `chat.tsx:416` — erro aparece instantaneamente | Spec: 400ms ease-out, slide down 30px | **Sem slide down**, sem ícone de alerta com escala | P1 |

#### AVATAR IA (5 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 43 | **Avatar Idle** | Não | `avatar.tsx` (shadcn) é estático; `chat-message.tsx` tem ícone Bot estático | Spec: ciclo 4s, Y 2px, opacidade 0.9 | **Avatar "respirando" ausente** — um dos elementos mais críticos de percepção de IA viva | **P0** |
| 44 | **Avatar Thinking** | Não | Nenhum estado de pensamento no avatar | Spec: rotate 3°, glow pulsante 0→0.2, ciclo 2s | Ausente | **P0** |
| 45 | **Avatar Speaking** | Não | Nenhum estado de fala | Spec: glow 0.3~0.5 | Ausente | P1 |
| 46 | **Avatar Listening** | Não | Nenhum estado de escuta | Spec: translateY 3px, glow 0.1 | Ausente | P1 |
| 47 | **Avatar Success** | Não | Nenhum estado de sucesso | Spec: 800ms ease-out, glow dourado, escala 1→1.05→1 | Ausente | P1 |

#### AÇÕES DO EMPRESÁRIO (3 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 48 | **Selection Change** | Não | Seleção em `question-card.tsx` (tipo selecao/faixa) é instantânea | Spec: 200ms ease-out, fill animado 0→100% | Sem animação de seleção; toggle não existe | P2 |
| 49 | **Action Confirm** | Não | Não existe duplo clique de confirmação | Spec: 300ms ease-out | Funcionalidade inteira ausente | P3 |
| 50 | **Drag & Drop** | Não | Não existe em lugar nenhum | Spec: tempo real | Funcionalidade inteira ausente | P4 |

#### SISTEMA (3 itens)

| # | Nome | Status | Onde | Duração/Easing | Gap | Prioridade |
|---|---|---|---|---|---|---|
| 51 | **Auto-Save** | Não | Não existe indicador de salvamento automático | Spec: 800ms ease-out, fade verde | Funcionalidade inteira ausente | P3 |
| 52 | **Connection Status** | Não | Não existe indicador de conexão | Spec: 500ms ease-out, ponto verde/vermelho | Funcionalidade inteira ausente | P2 |
| 53 | **Sync Indicator** | Não | Não existe | Spec: loop 2s | Funcionalidade inteira ausente | P4 |

---

### Itens Críticos que Faltam — Checklist Especial

| Item | Spec | Realidade | Gap | Prioridade |
|---|---|---|---|---|
| **Anel de Confiança** (elemento de assinatura #1) | Anel circular preenche/esvazia, cor varia por nível, número central anima | **Não existe em lugar nenhum** — nenhum componente de confiança no frontend | Total | **P0** |
| **Glow de Insight** | ✦ com glow dourado, escala 0→1, destaque 3s, fade out 500ms | `revelacao-card.tsx` tem ícone Sparkles estático sem glow, sem animação de entrada | Total (parcial visual) | **P0** |
| **Avatar "respirando"** | Ciclo 4s, Y 2px, opacidade 0.9, sem glow | Avatar é estático (ícone ou shadcn) — sem movimento, sem vida | Total | **P0** |
| **Loading inteligente com texto do processo** | Texto alterna a cada 4s: "Analisando dados...", "Buscando padrões..." | `conversa/page.tsx:159` — texto fixo "Iniciando conversa..." | Total | **P0** |
| **Transição entre telas com fade 400ms** | Fade out 200ms + fade in 200ms | Navegação Next.js instantânea, sem overlay | Total | **P0** |
| **Card slide up 300ms + fade** | Slide up (15-20px) + fade simultâneo | `animate-fade-in` apenas — sem slide; `animate-slide-up` (0.35s) existe no CSS mas **não é usado** | Total | **P0** |
| **Notificações/toast** | Slide down 20px + fade, 300ms, auto-dismiss 4s | **Não existe sistema de toast** | Total | **P0** |
| **Hover states em todos elementos clicáveis** | Shadow +2px, translateY -2px, 200ms | Botões têm hover básico, cards têm hover básico; sem shadow, sem translateY | Parcial | **P1** |

---

### Animações CSS Existentes vs. Necessárias

| Animação | Existe no globals.css | Usada em componentes | Spec exige |
|---|---|---|---|
| `fadeIn` 0.4s ease-out | Sim | Sim (revelacao-card, estado-vazio) | Sim |
| `slideUp` 0.35s ease-out | Sim | **Não usada em nenhum componente** | Sim (cards, mensagens) |
| `scaleIn` 0.25s ease-out | Sim | Sim (micro-reaction) | Parcial |
| `pulseSoft` 2s ease-in-out | Sim | **Não usada em nenhum componente** | Sim (badges, loading) |
| **shake** | **Não** | — | Sim (input error, message error) |
| **glow** | **Não** | — | Sim (insight, focus, avatar) |
| **bounce typing** | **Não** (Tailwind animate-bounce usado inline) | Sim (chat-message) | Parcial |
| **slide-in from right** | **Não** | — | Sim (hypothesis card, painel) |
| **slide down** | **Não** | — | Sim (toast, alert) |
| **scaleY expand** | **Não** | — | Sim (card expand) |

---

## PARTE 2 — SISTEMA EMOCIONAL (Camada 10)

### Metodologia

Avaliação dos marcos temporais da Biblioteca de Emoções (P27) contra a experiência real que o código entrega. Nota 0-10 baseada em: componentes existentes, fluxo funcional, tratamento de estados, feedback visual.

---

### Marco 3s — Curiosidade + Segurança

**O que o empresário vê:** Landing page (`page.tsx`)
**Nota real:** Curiosidade 7 | Segurança 4

| Emoção | Alvo | Real | Lacuna |
|---|---|---|---|
| Curiosidade | 9 | 7 | Tagline "Cansou de planilha?" é boa, mas sem preview interativo do diagnóstico |
| Segurança | 6 | 4 | Frase única "Seus dados estao seguros" no rodapé; sem selo LGPD visível, sem depoimentos, sem prova social |

**O que falta:**
- Selo LGPD / privacidade visível no hero (não no rodapé)
- Preview do diagnóstico antes do cadastro
- Depoimentos ou contador de empresas
- Design mais sofisticado (atual é minimalista mas não "premium cognitivo")

---

### Marco 10s — Antecipação + Confiança

**O que o empresário vê:** Clique em "Descobrir agora" → inicia sessão → loading → primeira pergunta
**Nota real:** Antecipação 6 | Confiança 5

| Emoção | Alvo | Real | Lacuna |
|---|---|---|---|
| Antecipação | 8 | 6 | Loading "Iniciando conversa..." é genérico; sem barra de progresso ou expectativa |
| Confiança | 8 | 5 | Sem selo de privacidade visível durante transição, sem promessa de valor repetida |

**O que falta:**
- Tela de transição animada com micro-cópia engajadora
- Preview do valor ("você receberá um diagnóstico completo")
- Selo de segurança visível durante toda a jornada
- Barra de progresso com tempo estimado visível desde o início

---

### Marco 30s — Engajamento + Descoberta

**O que o empresário vê:** Primeira pergunta + QuestionCard
**Nota real:** Engajamento 7 | Descoberta 6

| Emoção | Alvo | Real | Lacuna |
|---|---|---|---|
| Engajamento | 9 | 7 | Primeira pergunta existe, tom é de conversa; mas sem reação da IA antes da próxima pergunta |
| Descoberta | 7 | 6 | `MicroReaction` existe e mostra reação contextual, mas sem preview do diagnóstico |

**O que falta:**
- Feedback da IA após cada resposta (MicroReaction existe mas é genérico)
- "A próxima pergunta vai te surpreender" — elemento de antecipação
- Indicador de progresso mais visível
- Perguntas menos óbvias / mais personalizadas pelo setor

---

### Marco 2min — Interesse + Respeito

**O que o empresário vê:** Múltiplas perguntas respondidas, progress-bar mostrando avanço
**Nota real:** Interesse 5 | Respeito 4

| Emoção | Alvo | Real | Lacuna |
|---|---|---|---|
| Interesse | 8 | 5 | IA não faz conexões entre respostas; perguntas são lineares |
| Respeito | 8 | 4 | IA não referencia respostas anteriores; nenhum painel cognitivo mostrando progresso |

**O que falta:**
- **Painel cognitivo visível** — o maior gap desta camada
- IA referenciando respostas anteriores ("você mencionou que...")
- Hipóteses sendo formadas e mostradas em tempo real
- Resumo parcial automático

---

### Marco 5min — Admiração + Confiança Alta

**O que o empresário vê:** Revelação do insight após conversa completa
**Nota real:** Admiração 5 | Confiança Alta 5

| Emoção | Alvo | Real | Lacuna |
|---|---|---|---|
| Admiração | 9 | 5 | Revelação existe (`revelacao-card.tsx`) mas é texto estático; sem animação de insight, sem glow, sem ✦ |
| Confiança Alta | 9 | 5 | Insight não mostra evidência do raciocínio da IA ("cheguei a isso porque você disse X") |

**O que falta:**
- **Cerimônia de revelação** — sem animação dramática, sem pausa, sem glow
- Evidência textual das respostas do empresário no insight
- Validação interativa ("Isso faz sentido para você?")
- Mapa cognitivo mostrando conexões
- **Anel de confiança** mostrando > 50%

---

### Matriz Emocional Consolidada — Notas Reais vs. Alvo

| Etapa | Confiança (Alvo/Real) | Curiosidade (Alvo/Real) | Segurança (Alvo/Real) | Controle (Alvo/Real) | Descoberta (Alvo/Real) | Alívio (Alvo/Real) | Orgulho (Alvo/Real) |
|---|---|---|---|---|---|---|---|
| **Landing** | 7 / **4** | 9 / **7** | 6 / **4** | 5 / **5** | 4 / **2** | 3 / **3** | 2 / **1** |
| **Login/1 acesso** | 8 / **5** | 8 / **6** | 9 / **4** | 7 / **6** | 5 / **3** | 4 / **3** | 3 / **2** |
| **Onboarding (1as perg)** | 7 / **5** | 9 / **7** | 8 / **5** | 8 / **7** | 7 / **5** | 5 / **4** | 4 / **2** |
| **Conversa meio** | 8 / **4** | 8 / **5** | 8 / **5** | 7 / **5** | 8 / **4** | 6 / **4** | 5 / **2** |
| **Primeiro insight** | 9 / **5** | 7 / **5** | 8 / **5** | 7 / **5** | 9 / **5** | 8 / **4** | 8 / **3** |

**Média geral real:** 4.3/10 vs alvo 7.2/10
**Gap médio:** -2.9 pontos por célula

---

### Maiores Lacunas Emocionais

| Lacuna | Impacto | Causa Raiz | Prioridade |
|---|---|---|---|
| **Confiança no insight** | Empresário não valida IA como inteligente | Falta de evidência textual + anel de confiança + animação de revelação | **P0** |
| **Segurança durante todo fluxo** | Empresário pode desistir por medo de dados | Sem selos LGPD visíveis, sem mensagens de privacidade recorrentes | **P0** |
| **Respeito durante conversa** | IA parece robô, não parceiro | Sem referência a respostas anteriores, sem painel cognitivo, sem hipóteses visíveis | **P0** |
| **Admiração na revelação** | Insight parece ser só texto | Zero cerimônia visual — sem glow, sem pausa, sem animação | **P0** |
| **Alívio no final** | Empresário sai com mais dúvidas que clareza | Sem resumo executivo, sem próximos passos claros | **P1** |

---

### Plano de Correção Imediata (Top 10)

1. **Criar Anel de Confiança** — componente circular com preenchimento animado, cor variável, número central
2. **Implementar Glow de Insight** — animação CSS de glow dourado + ✦ com escala 0→1 + fade out 3s
3. **Criar Avatar com estados** — pelo menos idle (respiração) + thinking + success
4. **Adicionar transição entre telas** — overlay fade 200ms + 200ms
5. **Implementar sistema de Toast** — notificações slide down + auto-dismiss
6. **Adicionar slideUp nos cards** — usar `.animate-slide-up` já existente no CSS
7. **Tornar loading inteligente** — texto alternado por timer com mensagens do processo cognitivo
8. **Criar Painel Cognitivo** — hipóteses visíveis, confiança por tópico, conhecimento acumulado
9. **Implementar feedback referencial da IA** — "você disse que X, e isso me fez pensar em Y"
10. **Adicionar shimmer/skeleton** — para loading de conteúdo futuro
