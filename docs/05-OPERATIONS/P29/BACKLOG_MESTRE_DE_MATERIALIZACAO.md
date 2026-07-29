# Backlog Mestre de Materialização — Ponte Digital

> **Propósito:** Consolidar TODOS os itens identificados nas auditorias P23 a P29 em um único backlog priorizado. Cada item representa uma materialização necessária entre o estado atual do código e a visão documentada.
>
> **Legenda:**
> - **Pri:** P0 (bloqueia operação) / P1 (bloqueia aprendizado) / P2 (melhora experiência) / P3 (melhora arquitetura) / P4 (pode esperar)
> - **Esforço:** XS (<4h) / S (1-2d) / M (3-5d) / L (1-2sem) / XL (>2sem)
> - **Impacto:** T (Transformacional) / A (Alto) / M (Médio) / B (Baixo)
> - **VC:** Valor Cognitivo (0-10) — quanto a materialização aumenta a inteligência percebida

---

## ITENS DE ARQUITETURA (12 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| A-001 | Implementar sistema de fila de animações com inibição por estado | 10 | Pendente | P23 Microinterações | P1 | M | A | 8 | novo: `lib/animation-queue.ts` |
| A-002 | Criar AnimationProvider (contexto global para fila de animações) | 10 | Pendente | P23 | P1 | M | A | 7 | novo: `providers/animation-provider.tsx` |
| A-003 | Padronizar easing e duração em constantes/tokens (não valores soltos) | 9 | Pendente | P27 | P2 | S | M | 5 | `tailwind.config.ts`, novo: `lib/tokens/motion.ts` |
| A-004 | Implementar CSS `@keyframes` faltantes: shake, glow, slideInRight, slideDown, scaleY | 9 | Pendente | P27 | P1 | XS | A | 6 | `globals.css` |
| A-005 | Criar hook `useAnimationQueue` para priorização de animações | 10 | Pendente | P23 | P2 | M | M | 7 | novo: `hooks/use-animation-queue.ts` |
| A-006 | Implementar detecção de estado do usuário (digitando, idle, lendo) | 10 | Pendente | P23 | P2 | M | A | 8 | novo: `lib/user-state.ts` |
| A-007 | Extrair tema de animação para tailwind config (não classes soltas) | 9 | Pendente | P27 | P3 | S | B | 3 | `tailwind.config.ts` |
| A-008 | Documentar e versionar tokens de movimento (duration, easing, delay) | 9 | Pendente | — | P3 | XS | B | 2 | `docs/04-DECISIONS/ADR/motion-tokens.md` |
| A-009 | Implementar prefers-reduced-motion em todas as animações | 9 | Pendente | — | P2 | S | M | 4 | `globals.css`, componentes |
| A-010 | Criar sistema de logging de animações (dev mode) | 10 | Pendente | — | P4 | S | B | 2 | novo: `lib/animation-logger.ts` |
| A-011 | Unificar todos os timers de auto-avanço em um único hook | 9 | Pendente | P29 | P2 | S | M | 5 | novo: `hooks/use-auto-advance.ts` |
| A-012 | Implementar sistema de microfones emocionais (detecção de sentimento do empresário via input) | 10 | Pendente | P27 Emoções | P1 | L | T | 9 | novo: `engine/sentiment-detector.ts` |

---

## ITENS DE MOTOR COGNITIVO (12 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| C-001 | Implementar referência a respostas anteriores nas perguntas da IA | 8 | Pendente | P27 Emoções | P0 | M | T | 9 | `engine/cognitive-journey-engine.ts` |
| C-002 | Criar pipeline de evidência textual para insights ("cheguei a isso porque você disse X") | 8 | Pendente | P27 Emoções | P0 | M | T | 10 | `engine/cognitive-insight-engine.ts` (novo) |
| C-003 | Implementar formação de hipóteses visíveis em tempo real | 8 | Pendente | P23 | P0 | L | T | 10 | novo: `engine/hypothesis-engine.ts` |
| C-004 | Criar sistema de confiança por hipótese (0-100%) com persistência | 8 | Pendente | P23 | P0 | M | T | 10 | novo: `engine/confidence-engine.ts` |
| C-005 | Implementar detecção de saturação por tópico (IA sabe quando parar) | 8 | Pendente | P27 Emoções | P1 | M | A | 8 | `engine/cognitive-journey-engine.ts` |
| C-006 | Criar resumo parcial automático a cada 5 perguntas | 8 | Pendente | P23 | P1 | M | A | 8 | `engine/cognitive-briefing-engine.ts` |
| C-007 | Implementar pergunta de validação pós-insight ("Isso faz sentido?") | 8 | Parcial | P27 Emoções | P1 | S | A | 7 | `app/conversa/page.tsx` |
| C-008 | Adicionar "pular pergunta" com justificativa emocional | 8 | Pendente | P27 Emoções | P2 | S | M | 5 | `components/conversa/question-card.tsx` |
| C-009 | Implementar onboarding por setor (pergunta inicial baseada no segmento) | 8 | Pendente | P27 Emoções | P1 | M | A | 8 | `engine/cognitive-context-engine.ts` |
| C-010 | Criar sistema de memória de tópicos explorados (evitar repetição) | 8 | Pendente | P27 Emoções | P2 | M | M | 7 | `engine/cognitive-evolution-engine.ts` |
| C-011 | Implementar linha do tempo cognitiva do empresário (insights acumulados) | 8 | Pendente | P27 Emoções | P1 | M | A | 9 | novo: `components/cognitive/timeline.tsx` |
| C-012 | Adicionar "modo rápido" e "modo completo" para controle do empresário | 8 | Pendente | P27 Emoções | P2 | M | M | 6 | `engine/cognitive-journey-engine.ts` |

---

## ITENS DE EXPERIÊNCIA (18 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| E-001 | Implementar tela de transição animada entre login e conversa | 9 | Pendente | P23 | P0 | S | T | 8 | `app/page.tsx` |
| E-002 | Substituir spinner genérico por loading inteligente com texto dinâmico | 9 | Pendente | P23/P27 | P0 | S | T | 9 | `app/conversa/page.tsx` |
| E-003 | Implementar fade-out/fade-in entre rotas (overlay de transição) | 9 | Pendente | P23 | P0 | M | A | 7 | `app/layout.tsx` |
| E-004 | Criar sistema de toast/notificação com auto-dismiss 4s | 9 | Pendente | P27 | P0 | S | T | 8 | novo: `components/ui/toast.tsx` |
| E-005 | Adicionar animação de entrada nas mensagens do chat (slideUp) | 9 | Pendente | P27 | P0 | XS | A | 7 | `components/assistente/chat-message.tsx` |
| E-006 | Implementar placeholder dinâmico que muda conforme estado da IA | 9 | Pendente | P23 | P1 | XS | A | 7 | `components/conversa/question-card.tsx` |
| E-007 | Adicionar MicroReaction com animação de entrada (scaleIn + slideUp) | 9 | Parcial | P27 | P1 | XS | M | 6 | `components/conversa/micro-reaction.tsx` |
| E-008 | Implementar animação de shake em inputs com erro | 9 | Pendente | P27 | P1 | XS | M | 5 | `components/conversa/question-card.tsx` |
| E-009 | Adicionar escala 0.97 no clique de botões | 9 | Pendente | P27 | P1 | XS | M | 5 | `components/ui/button.tsx` |
| E-010 | Implementar skeleton screen para loading de conteúdo | 9 | Pendente | P27 | P2 | S | M | 5 | novo: `components/ui/skeleton.tsx` |
| E-011 | Adicionar checkmark animado em inputs válidos | 9 | Pendente | P27 | P2 | XS | B | 4 | `components/conversa/question-card.tsx` |
| E-012 | Criar fade-in do botão "Continuar" após 3s no resumo | 9 | Pendente | P23 | P2 | XS | M | 5 | `app/conversa/page.tsx` |
| E-013 | Adicionar animação de badge "✓ Recebido" nas mensagens | 9 | Pendente | P27 | P2 | S | M | 5 | `components/assistente/chat-message.tsx` |
| E-014 | Implementar contador de caracteres com alerta visual | 9 | Pendente | P27 | P3 | XS | B | 3 | `components/conversa/question-card.tsx` |
| E-015 | Criar modal com animação de abertura/fechamento (scale + overlay) | 9 | Parcial | P27 | P2 | S | M | 5 | `components/ui/dialog.tsx` |
| E-016 | Adicionar card hover com shadow + translateY | 9 | Pendente | P27 | P2 | XS | M | 4 | `components/ui/card.tsx` |
| E-017 | Implementar auto-avanço após MicroReaction com timer de 5s + botão "Continuar agora" | 9 | Parcial | P23 | P1 | XS | M | 6 | `app/conversa/page.tsx:109` |
| E-018 | Adicionar tratamento de timeout (8s/15s/30s) com texto progressivo | 9 | Pendente | P23 | P1 | S | A | 8 | `app/conversa/page.tsx` |

---

## ITENS DE LANDING (7 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| L-001 | Redesenhar landing com design premium cognitivo (não "mais um site") | 1 | Parcial | P27 Emoções | P0 | L | T | 8 | `app/page.tsx` |
| L-002 | Adicionar selo LGPD / privacidade visível no hero | 1 | Pendente | P27 Emoções | P0 | XS | A | 6 | `app/page.tsx` |
| L-003 | Adicionar preview do diagnóstico (exemplo interativo) | 1 | Pendente | P27 Emoções | P1 | M | A | 9 | `app/page.tsx` |
| L-004 | Implementar depoimentos / prova social no hero | 1 | Pendente | P27 Emoções | P1 | S | A | 7 | `app/page.tsx` |
| L-005 | Adicionar tagline secundária com gancho de antecipação | 1 | Pendente | P27 Emoções | P1 | XS | M | 5 | `app/page.tsx` |
| L-006 | Criar animação de entrada da landing (fade + slide IA aparece) | 9 | Pendente | P23 | P1 | S | A | 7 | `app/page.tsx` |
| L-007 | Adicionar contador "mais de X empresas diagnosticaram" | 1 | Pendente | P27 Emoções | P2 | XS | M | 5 | `app/page.tsx` |

---

## ITENS DE DIAGNÓSTICO (12 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| D-001 | Criar Painel Cognitivo visível durante a conversa (hipóteses, confiança, áreas) | 8 | Pendente | P23 | P0 | L | T | 10 | novo: `components/cognitive/cognitive-panel.tsx` |
| D-002 | Implementar Anel de Confiança (elemento de assinatura #1) | 9 | Pendente | P23/P27 | P0 | M | T | 10 | novo: `components/cognitive/confidence-ring.tsx` |
| D-003 | Criar revelação de insight com cerimônia completa (glow, ✦, pausa, evidência) | 9 | Pendente | P23 | P0 | M | T | 10 | `components/conversa/revelacao-card.tsx` |
| D-004 | Implementar barra de conhecimento acumulado por área com animação de preenchimento | 9 | Pendente | P23 | P1 | S | A | 8 | `components/conversa/progress-bar.tsx` |
| D-005 | Adicionar cards de hipótese no painel com entrada animada (slide-in right) | 9 | Pendente | P27 | P1 | M | A | 8 | novo + `components/cognitive/` |
| D-006 | Criar mapa de conexões entre áreas (relações causais visíveis) | 8 | Pendente | P23 | P1 | L | A | 9 | novo: `components/cognitive/connection-map.tsx` |
| D-007 | Implementar badge de lacuna "?" nas áreas não exploradas | 9 | Pendente | P23 | P2 | S | M | 6 | novo: `components/cognitive/lacuna-badge.tsx` |
| D-008 | Adicionar resumo parcial com animação expand (scaleY 0→1) | 9 | Pendente | P23 | P1 | S | A | 8 | novo: `components/conversa/parcial-summary.tsx` |
| D-009 | Mostrar evidência textual no insight ("você disse X → concluí Y") | 8 | Pendente | P27 | P0 | M | T | 10 | `engine/cognitive-briefing-engine.ts` |
| D-010 | Implementar contraste entre insight maior (✦) e descoberta menor (badge) | 9 | Pendente | P23 | P2 | XS | M | 6 | `components/conversa/revelacao-card.tsx` |
| D-011 | Criar preview "antes vs depois" da correção de hipótese | 9 | Pendente | P27 | P2 | S | M | 7 | novo: `components/cognitive/correction-compare.tsx` |
| D-012 | Adicionar indicador de "fase cognitiva" com transição animada entre etapas | 9 | Pendente | P27 | P2 | S | M | 7 | novo: `components/conversa/phase-indicator.tsx` |

---

## ITENS DE DASHBOARD (12 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| DB-001 | Adicionar indicador de saúde cognitiva animado no dashboard | 9 | Parcial | P29 | P2 | S | M | 6 | `app/(dashboard)/dashboard/page.tsx` |
| DB-002 | Implementar evolução temporal dos insights no dashboard | 8 | Pendente | P27 | P1 | M | A | 8 | `app/(dashboard)/dashboard/page.tsx` |
| DB-003 | Criar widget de "próximos passos" com base no diagnóstico | 8 | Pendente | P27 | P1 | M | A | 8 | novo: `components/dashboard/next-steps.tsx` |
| DB-004 | Adicionar comparação "antes vs agora" no dashboard | 8 | Pendente | P27 | P2 | M | M | 7 | `app/(dashboard)/dashboard/page.tsx` |
| DB-005 | Implementar tooltips explicativos em todas as métricas do dashboard | 9 | Pendente | P27 | P2 | S | M | 5 | `app/(dashboard)/dashboard/page.tsx` |
| DB-006 | Criar visão de patrimônio cognitivo acumulado | 8 | Pendente | P27 | P2 | M | M | 7 | novo: `components/dashboard/cognitive-assets.tsx` |
| DB-007 | Adicionar filtros por período e comparação no dashboard | 9 | Pendente | P27 | P2 | S | M | 5 | `app/(dashboard)/dashboard/page.tsx` |
| DB-008 | Implementar empty states informativos em todas as seções | 9 | Parcial | P29 | P1 | S | M | 5 | `components/shared/estado-vazio.tsx` |
| DB-009 | Adicionar indicador de conexão (online/offline) no dashboard | 9 | Pendente | P27 | P2 | XS | M | 4 | `components/layout/header.tsx` |
| DB-010 | Criar onboarding interativo para primeiro acesso ao dashboard | 8 | Pendente | — | P2 | M | M | 6 | novo: `components/onboarding/` |
| DB-011 | Implementar notificações push no dashboard | 9 | Pendente | — | P2 | L | M | 5 | novo: `components/notifications/` |
| DB-012 | Adicionar modo de comparação entre empresas (apenas multi-tenant) | 8 | Pendente | — | P4 | XL | B | 4 | novo |

---

## ITENS DE ASSISTENTE (7 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| AS-001 | Implementar estado de "digitando" da IA com indicador visual + texto do processo | 9 | Parcial | P27 | P0 | S | T | 9 | `components/assistente/chat-message.tsx` |
| AS-002 | Adicionar sugestões contextuais dinâmicas baseadas no estado da empresa | 8 | Parcial | P27 | P1 | M | A | 8 | `components/assistente/chat.tsx` |
| AS-003 | Implementar referência a respostas anteriores nas respostas do assistente | 8 | Pendente | P27 | P0 | M | T | 9 | `components/assistente/chat.tsx` |
| AS-004 | Criar saudação de retorno personalizada com contexto da última conversa | 9 | Pendente | P27 | P1 | S | A | 8 | `components/assistente/chat.tsx` |
| AS-005 | Adicionar estado de erro com tratamento empático (não "Erro 500") | 9 | Parcial | P27 | P1 | XS | A | 7 | `components/assistente/chat.tsx` |
| AS-006 | Implementar histórico visível de interações anteriores no assistente | 8 | Pendente | P27 | P2 | S | M | 6 | `components/assistente/chat.tsx` |
| AS-007 | Criar modo de conversa bidirecional (empresário pode perguntar) | 8 | Parcial | P27 | P1 | S | A | 7 | `components/assistente/chat.tsx` |

---

## ITENS VISUAIS (16 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| V-001 | Implementar Avatar IA com estados (idle/respiração, thinking, speaking, success) | 9 | Pendente | P27 | P0 | L | T | 10 | `components/ui/avatar.tsx` |
| V-002 | Criar animação Avatar "respirando" (ciclo 4s, Y 2px) | 9 | Pendente | P27 | P0 | S | T | 10 | `components/ui/avatar.tsx` |
| V-003 | Implementar Glow de Insight (✦ com glow dourado, escala 0→1, persistência 3s) | 9 | Pendente | P23 | P0 | S | T | 10 | `components/conversa/revelacao-card.tsx` |
| V-004 | Adicionar glow pulsante no avatar durante thinking (opacidade 0→0.2, ciclo 2s) | 9 | Pendente | P27 | P0 | S | A | 9 | `components/ui/avatar.tsx` |
| V-005 | Criar transição de fase cognitiva com ícone animado (rotação suave) | 9 | Pendente | P27 | P2 | S | M | 6 | novo: `components/conversa/phase-icon.tsx` |
| V-006 | Implementar gradiente e glow nos cards de insight (fundo amarelo 2s fade out) | 9 | Pendente | P27 | P1 | XS | M | 7 | `components/conversa/revelacao-card.tsx` |
| V-007 | Adicionar animação de stroke em checkmarks | 9 | Pendente | P27 | P2 | S | M | 5 | novo ou lib SVG |
| V-008 | Criar overlay de transição entre telas com cor neutra | 9 | Pendente | P27 | P0 | XS | A | 7 | `components/layout/app-shell.tsx` |
| V-009 | Implementar skeleton shimmer com gradiente móvel | 9 | Pendente | P27 | P2 | S | M | 5 | novo: `components/ui/skeleton.tsx` |
| V-010 | Adicionar animação de badge pulse (escala 1→1.3→1) | 9 | Pendente | P27 | P2 | XS | B | 4 | novo: `components/ui/badge.tsx` |
| V-011 | Implementar card expand/collapse com animação scaleY | 9 | Pendente | P27 | P3 | S | B | 4 | `components/ui/card.tsx` |
| V-012 | Criar animação de conexão no mapa (linha animada aparecendo) | 9 | Pendente | P23 | P2 | M | M | 7 | novo: `components/cognitive/map-connection.tsx` |
| V-013 | Adicionar indicador de "área completa" com badge verde animado | 9 | Pendente | P23 | P2 | XS | M | 5 | novo badge component |
| V-014 | Implementar chat message loading com delay alternado entre dots | 9 | Parcial | P27 | P1 | XS | M | 6 | `components/assistente/chat-message.tsx` |
| V-015 | Criar tema escuro consistente (todas as cores cognitivas mapeadas) | 1 | Parcial | P29 | P2 | S | M | 4 | `globals.css` |
| V-016 | Adicionar indicador visual de "progresso do pensamento" da IA | 9 | Pendente | P23 | P1 | S | A | 8 | novo: `components/conversa/thinking-indicator.tsx` |

---

## ITENS DE MICROINTERAÇÕES (17 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| M-001 | Implementar 53 microinterações da Biblioteca P27 (consolidado) | 9 | Pendente | P27 | P0 | XL | T | 10 | Múltiplos |
| M-002 | Aplicar `.animate-slide-up` nos cards de pergunta e revelação | 9 | Pendente | P23 | P0 | XS | A | 7 | `components/conversa/question-card.tsx`, `revelacao-card.tsx` |
| M-003 | Aplicar `.animate-pulse-soft` em badges de confiança | 9 | Pendente | P23 | P1 | XS | M | 6 | novo badge |
| M-004 | Adicionar `.animate-scale-in` no avatar da IA | 9 | Pendente | P23 | P1 | XS | M | 6 | `components/ui/avatar.tsx` |
| M-005 | Criar animação de input focus com glow 2px | 9 | Pendente | P27 | P2 | XS | M | 5 | `components/ui/input.tsx` |
| M-006 | Implementar animação de input blur com transição de retorno | 9 | Pendente | P27 | P3 | XS | B | 3 | `components/ui/input.tsx` |
| M-007 | Adicionar animação de input erro com shake (3 oscilações 4px) | 9 | Pendente | P27 | P1 | XS | M | 6 | `components/ui/input.tsx` |
| M-008 | Criar animação de input success com checkmark scale 0→1 | 9 | Pendente | P27 | P2 | XS | M | 5 | `components/ui/input.tsx` |
| M-009 | Implementar button loading com crossfade texto→spinner | 9 | Pendente | P27 | P1 | XS | M | 6 | `components/ui/button.tsx` |
| M-010 | Adicionar button success com check verde animado | 9 | Pendente | P27 | P2 | XS | M | 5 | `components/ui/button.tsx` |
| M-011 | Implementar card dismiss com slide right + fade | 9 | Pendente | P27 | P3 | S | B | 4 | `components/ui/card.tsx` |
| M-012 | Criar modal close animado com escala 1→0.95 | 9 | Pendente | P27 | P2 | XS | M | 5 | `components/ui/dialog.tsx` |
| M-013 | Implementar auto-save indicator com fade verde | 9 | Pendente | P27 | P3 | S | B | 3 | novo componente |
| M-014 | Adicionar connection status indicator (ponto verde/vermelho) | 9 | Pendente | P27 | P2 | XS | M | 4 | `components/layout/header.tsx` |
| M-015 | Implementar sync indicator com rotação | 9 | Pendente | P27 | P4 | XS | B | 2 | novo componente |
| M-016 | Criar selection change animado (radio/checkbox fill) | 9 | Pendente | P27 | P2 | S | M | 5 | `components/conversa/question-card.tsx` |
| M-017 | Adicionar action confirm com duplo clique (estado de confirmação) | 9 | Pendente | P27 | P3 | S | B | 4 | botões de ação destrutiva |

---

## ITENS DE EMOÇÕES (8 itens)

| # | Nome | Camada | Status | Fonte | Pri | Esforço | Impacto | VC | Arquivos |
|---|---|---|---|---|---|---|---|---|---|
| EM-001 | Implementar verificação emocional em cada etapa da jornada | 10 | Pendente | P27 Emoções | P1 | M | A | 8 | novo: `lib/emotional-check.ts` |
| EM-002 | Criar matriz de risco emocional com gatilhos de correção automática | 10 | Pendente | P27 Emoções | P2 | L | A | 8 | novo: `engine/emotional-risk-engine.ts` |
| EM-003 | Adicionar selo LGPD e mensagens de privacidade em todas as telas de input | 10 | Pendente | P27 Emoções | P0 | S | A | 7 | `app/page.tsx`, `app/(auth)/criar-conta/page.tsx` |
| EM-004 | Implementar detecção de hesitação do empresário (respostas curtas → oferecer pausa) | 10 | Pendente | P27 Emoções | P1 | M | A | 8 | `engine/sentiment-detector.ts` |
| EM-005 | Criar mensagens de erro empáticas (não apenas "Erro ao enviar") | 10 | Parcial | P27 Emoções | P1 | XS | A | 7 | `app/conversa/page.tsx`, `components/assistente/chat.tsx` |
| EM-006 | Implementar celebração de marcos ("você está entre os X% mais engajados") | 10 | Pendente | P27 Emoções | P2 | S | M | 6 | novo: `components/celebration/` |
| EM-007 | Adicionar tom de gratidão nas correções do empresário ("obrigado por me corrigir") | 10 | Pendente | P27 Emoções | P1 | XS | M | 7 | prompt da IA |
| EM-008 | Criar dashboard emocional (NPS, satisfação, taxa de retorno visível) | 10 | Pendente | P27 Emoções | P2 | M | M | 6 | novo: `components/admin/emotional-dashboard.tsx` |

---

## RESUMO GERAL

| Categoria | Total | P0 | P1 | P2 | P3 | P4 |
|---|---|---|---|---|---|---|
| Arquitetura | 12 | 0 | 4 | 5 | 3 | 0 |
| Motor Cognitivo | 12 | 4 | 5 | 3 | 0 | 0 |
| Experiência | 18 | 5 | 7 | 5 | 1 | 0 |
| Landing | 7 | 2 | 3 | 2 | 0 | 0 |
| Diagnóstico | 12 | 5 | 4 | 3 | 0 | 0 |
| Dashboard | 12 | 0 | 4 | 7 | 0 | 1 |
| Assistente | 7 | 2 | 4 | 1 | 0 | 0 |
| Visuais | 16 | 5 | 4 | 6 | 1 | 0 |
| Microinterações | 17 | 2 | 4 | 7 | 3 | 1 |
| Emoções | 8 | 1 | 4 | 3 | 0 | 0 |
| **Total** | **121** | **26** | **43** | **42** | **8** | **2** |

### Por Esforço

| Esforço | Contagem | % |
|---|---|---|
| XS (< 4h) | 36 | 30% |
| S (1-2d) | 37 | 31% |
| M (3-5d) | 31 | 26% |
| L (1-2sem) | 11 | 9% |
| XL (> 2sem) | 6 | 5% |

### Por Impacto

| Impacto | Contagem | % |
|---|---|---|
| Transformacional | 18 | 15% |
| Alto | 40 | 33% |
| Médio | 55 | 45% |
| Baixo | 8 | 7% |

---

## TOP 20 PRIORIDADES ABSOLUTAS (P0)

| # | ID | Nome | Esforço | VC | Impacto |
|---|---|---|---|---|---|
| 1 | C-001 | Referência a respostas anteriores nas perguntas | M | 9 | T |
| 2 | C-002 | Evidência textual nos insights | M | 10 | T |
| 3 | C-003 | Formação de hipóteses visíveis em tempo real | L | 10 | T |
| 4 | C-004 | Sistema de confiança por hipótese (0-100%) | M | 10 | T |
| 5 | D-001 | Painel Cognitivo visível durante conversa | L | 10 | T |
| 6 | D-002 | Anel de Confiança (elemento de assinatura #1) | M | 10 | T |
| 7 | D-003 | Cerimônia de revelação de insight (glow, ✦, pausa, evidência) | M | 10 | T |
| 8 | D-009 | Evidência textual "você disse X → concluí Y" | M | 10 | T |
| 9 | V-001 | Avatar IA com estados (respiração, thinking, success) | L | 10 | T |
| 10 | V-002 | Avatar "respirando" (ciclo 4s, Y 2px) | S | 10 | T |
| 11 | V-003 | Glow de Insight (✦ + glow dourado + escala 0→1) | S | 10 | T |
| 12 | V-004 | Glow pulsante no avatar durante thinking | S | 9 | A |
| 13 | V-008 | Overlay de transição entre telas | XS | 7 | A |
| 14 | E-001 | Tela de transição animada login→conversa | S | 8 | T |
| 15 | E-002 | Loading inteligente com texto dinâmico | S | 9 | T |
| 16 | E-003 | Fade-out/fade-in entre rotas | M | 7 | A |
| 17 | E-004 | Sistema de toast/notificação | S | 8 | T |
| 18 | E-005 | Animação de entrada nas mensagens do chat | XS | 7 | A |
| 19 | L-001 | Redesenho da landing (premium cognitivo) | L | 8 | T |
| 20 | L-002 | Selo LGPD visível no hero | XS | 6 | A |

---

## PRÓXIMA SPRINT SUGERIDA (P0 + P1 — 69 itens)

**Foco:** Tornar a IA parecida com uma inteligência (não um formulário bonito).

**Sprint atual:** P29 (Materialização do Diagnóstico — sistemas oficiais criados mas sem microinterações)

**Meta da próxima sprint (P30):**
1. Implementar ANEL DE CONFIANÇA + PAINEL COGNITIVO + GLOW DE INSIGHT (os 3 itens de maior VC)
2. Aplicar as 4 animações CSS já existentes nos componentes corretos (slideUp, pulseSoft)
3. Criar Avatar com estado idle/respiração
4. Sistema de transição entre telas
5. Toast/notificações
6. Loading inteligente
