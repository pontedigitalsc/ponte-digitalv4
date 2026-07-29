# Auditoria de Materialização — Experiência, Landing e Diagnóstico

## Propósito

Comparar a especificação documentada na P23 (`ARQUITETURA_VISUAL_DA_CONVERSA.md` e `EXPERIENCIA_COGNITIVA.md`) com o código real, identificando divergências, ausências e simplificações para a camada de Experiência (Camada 3), Landing (Camada 4) e Diagnóstico (Camada 5).

---

## Resumo Executivo

| Camada | Fidelidade | Itens OK | Itens Divergentes | Itens Ausentes |
|---|---|---|---|---|
| Landing (E1) | ~25% | 2 | 3 | 4 |
| Diagnóstico (E2-E7) | ~30% | 5 | 4 | 14 |
| Assistente | ~40% | 6 | 3 | 6 |
| **Geral** | **~32%** | **13** | **10** | **24** |

---

## 1. LANDING (E1 — Pré-login)

### 1.1 Tagline

| Item | Status | Evidência |
|---|---|---|
| Tagline "A inteligência da sua empresa" | **Divergente** | `sistema/src/app/page.tsx:12` — código usa "Cansou de planilha?" como título principal. A tagline especificada não existe em nenhum lugar. |
| Fidelidade | 0% | |
| Impacto | Alto — a promessa de inteligência é o posicionamento central da Ponte Digital. "Cansou de planilha?" posiciona como ferramenta, não como inteligência. |

### 1.2 Hierarquia Visual

| Item | Status | Evidência |
|---|---|---|
| Logo + nome (identidade) | **Parcial** | Código tem ícone "P" em rounded-2xl bg-primary (linha 8-10), sem o nome "Ponte Digital" ao lado. Especificação pede `[logo] Ponte Digital` lado a lado. |
| Tagline (promessa) | **Divergente** | Especificado como linha central de texto; código tem "Cansou de planilha?" como título + subtítulo "Responda 5 perguntas...". |
| Formulário de entrada (ação) | **Ausente** | Especificação define campos de email + senha + botão Entrar. Código tem apenas um CTA "Descobrir agora" que redireciona para `/api/sessao/iniciar`. |
| CTA secundário "Primeira vez?" | **Ausente** | Especificação define link "Primeira vez? Conhecer a Ponte". Código não tem. |
| Footer minimalista | **Ausente** | Especificação inclui footer. Código tem apenas "Gratuito. Sem cadastro..." (linha 27-29). |
| Fidelidade | ~30% | |
| Impacto | Alto — a hierarquia visual define a percepção de primeira visita. A versão atual é mais próxima de uma landing page de conversão do que de uma tela de login de plataforma de inteligência. |

### 1.3 CTA Principal

| Item | Status | Evidência |
|---|---|---|
| CTA principal existe | **Sim** | Botão "Descobrir agora" (linha 19-25), estilizado com bg-primary, shadow-lg, rounded-xl. |
| É proeminente | **Sim** | Centralizado, padding generoso (px-10 py-4), sombra e hover state. |
| É o único CTA | **Sim** | Não há CTA secundário. |
| Fidelidade | 60% | |
| Impacto | Médio — CTA existe e é funcional, mas sem alternativa de exploração. |

### 1.4 Tempo até Valor

| Item | Status | Evidência |
|---|---|---|
| Especificado < 5s | **Implementado** | Landing é estática, sem carregamento de dados externos. O CTA leva à rota `/api/sessao/iniciar` que inicia conversa. Tempo de carregamento da página é essencialmente zero. |
| Fidelidade | 100% | |
| Impacto | Baixo — ok. |

### 1.5 Emoção da Landing

| Item | Status | Evidência |
|---|---|---|
| Especificada: segurança, seriedade, expectativa positiva | **Divergente** | Código usa tom casual ("Cansou de planilha?", "Descobrir agora", "Gratuito. Sem cadastro.") que transmite acessibilidade e baixo compromisso, não seriedade/segurança. Fundo usa gradient suave (from-background to-muted/30) vs fundo escuro ou muito claro especificado. |
| Fidelidade | 20% | |
| Impacto | Alto — o posicionamento emocional define o tipo de empresário que se sente atraído. |

---

## 2. DIAGNÓSTICO (Conversa de Onboarding — E2 a E7)

### 2.1 Fluxo de Perguntas

| Item | Status | Evidência |
|---|---|---|
| 5 perguntas vs 18 etapas | **Divergente** | A landing promete "5 perguntas" (`page.tsx:15`), mas o fluxo real (`primeira-conversa.ts`) tem 18 etapas em 5 blocos temáticos. Empresário pode perceber discrepância. |
| Especificação P23: fluxo mais rico | **Parcial** | P23 descreve fases (Fase 0 a 11) com abertura personalizada, variações por perfil, reações contextuais, hipóteses, insights, resumo parcial, fechamento. O código implementa apenas um questionário linear com reações estáticas. |
| Fidelidade | 40% | |
| Impacto | Alto — a documentação vende uma "investigação inteligente"; o código entrega um formulário sofisticado. |

### 2.2 Microinterações

| Item | Status | Evidência |
|---|---|---|
| Card slide up ao aparecer | **Parcial** | Existe `animate-fade-in` (0.4s) e `animate-scale-in` (0.25s) no CSS global (`globals.css:76-87`). QuestionCard não usa animação — o conteúdo aparece sem transição. RevelacaoCard usa `animate-fade-in`. |
| Fade especificado 300ms ease-out | **Divergente** | Animação fadeIn é 0.4s ease-out, não 300ms. slideUp é 0.35s vs 300ms especificado. ScaleIn não está na especificação. Nenhum card de mensagem tem a transição completa de fade + slide up combinados. |
| Tipografia e padding especificados | **Parcial** | Código usa Tailwind com fontes system sans-serif, mas largura máxima e padding dos cards não seguem exatamente 720px / 24px 32px. QuestionCard tem `rounded-lg` (8px) vs especificação 16px IA / 12px empresário. |
| Fidelidade | 35% | |
| Impacto | Médio — microinterações são cruciais para a sensação de "inteligência". A ausência de animações consistentes reduz a percepção de sofisticação. |

### 2.3 Loading Inteligente

| Item | Status | Evidência |
|---|---|---|
| Loading com texto do processo | **Ausente** | `conversa/page.tsx:154-163` — loading é um spinner (`animate-spin rounded-full border-2`) + texto "Iniciando conversa...". Não há "Relacionando dados", "Comparando padrões", "Analisando..." como especificado em E4. |
| Especificação: "Relacionando informações..." + progresso sutil | **Ausente** | Não existe indicador de pensamento com texto dinâmico. |
| Campo desabilitado durante pensamento | **Parcial** | `question-card.tsx` desabilita input durante `enviando`, mas não há estado de "pensando" entre envio e resposta. |
| Duração máxima 8s | **Ausente** | Não há controle de timeout com progressão detalhada. |
| Fidelidade | 10% | |
| Impacto | Alto — o loading inteligente é o que diferencia "formulário" de "inteligência". A ausência reduz drasticamente a percepção cognitiva. |

### 2.4 Mapa Cognitivo Vivo

| Item | Status | Evidência |
|---|---|---|
| Mapa cognitivo especificado em E2-E7 | **Ausente** | Não existe componente de mapa cognitivo em lugar nenhum da aplicação. A especificação descreve painel lateral com áreas preenchendo, confiança, insights, lacunas. |
| Indicador de cobertura | **Parcial** | `ProgressBar.tsx` mostra 5 blocos com ícones e percentual, mas é simples (não mostra áreas mapeadas). |
| Cards de hipótese no mapa | **Ausente** | Não há "Hipóteses Atuais" ou visualização de conexões. |
| Fidelidade | 5% | |
| Impacto | Crítico — o mapa cognitivo vivo é o patrimônio visual central da experiência. Sua ausência é a maior lacuna de materialização. |

### 2.5 Estados Cognitivos

| Item | Status | Evidência |
|---|---|---|
| Estados especificados: pensando, aprendendo, analisando | **Ausente** | `conversa/page.tsx` só tem estados: carregando, perguntaAtual, mostrandoReacao, concluida. Não há "pensando", "analisando", "descobrindo", "duvidando", "confirmando", "concluindo". |
| Cores por estado cognitivo | **Ausente** | Especificação define cores para cada estado (Azul, Roxo, Verde, Âmbar, etc). Código não implementa. |
| Badges por estado | **Ausente** | "Processando", "Analisando", "Descoberta", "Verificando" não existem. |
| Fidelidade | 0% | |
| Impacto | Crítico — sem estados, a experiência é funcional mas não cognitiva. |

### 2.6 Transições entre Estados

| Item | Status | Evidência |
|---|---|---|
| Login -> Conversa: 600ms fade+scale | **Ausente** | Não há transição entre landing e conversa. A rota muda e a página aparece. |
| Pergunta -> Resposta: 300-800ms slide up | **Parcial** | Após resposta, aparece MicroReaction com `animate-scale-in` (0.25s). Após 5 segundos automáticos, avança. Não há slide up do card de mensagem. |
| Pensando -> Insight: 500ms revelação | **Ausente** | Não existe estado pensando. Não há revelação com destaque. |
| Confiança atualiza: 600ms | **Ausente** | Não há indicador de confiança. |
| Fidelidade | 10% | |
| Impacto | Alto — transições definem o ritmo da conversa. A implementação atual é abrupta e mecânica. |

### 2.7 Espera Inteligente

| Item | Status | Evidência |
|---|---|---|
| Pausa após pergunta: 1-2s | **Ausente** | Pergunta aparece imediatamente. Não há pausa. |
| Pausa após resposta: 500ms | **Parcial** | Após enviar, MicroReaction aparece com auto-avanço em 5s. Há delay, mas não é o especificado. |
| Pausa antes de insight: 1-2s | **Ausente** | Não há insight durante a conversa. |
| Pausa em silêncio: 5s | **Ausente** | Não há detecção de silêncio. |
| Fidelidade | 5% | |
| Impacto | Alto — o timing da conversa é essencial para parecer natural e inteligente. |

### 2.8 Indicador de Confiança

| Item | Status | Evidência |
|---|---|---|
| Confiança visível durante conversa | **Ausente** | Nenhum indicador de confiança na página de conversa. Especificação define confiança desde 0% até valores progressivos com animação de preenchimento. |
| Confiança em insights | **Parcial** | `InsightCard.tsx:48` mostra "Confiança: {insight.confianca}%", mas este card só aparece no dashboard, não durante o onboarding. |
| Fidelidade | 5% | |
| Impacto | Alto — indicador de confiança é o termômetro da relação empresário-IA. |

### 2.9 Saudação e Abertura

| Item | Status | Evidência |
|---|---|---|
| "Bem-vindo. Vou conhecer sua empresa." | **Ausente** | Conversa começa diretamente com a primeira pergunta. Não há saudação. |
| Variações: primeiro login vs retorno | **Ausente** | Não há personalização de abertura. |
| Texto datilografado | **Ausente** | Não há efeito typewriter. |
| Painel vazio aparece com atraso 200ms | **Ausente** | Não há painel. |
| Fidelidade | 0% | |
| Impacto | Alto — a abertura define o tom de toda a conversa. |

### 2.10 Reações da IA

| Item | Status | Evidência |
|---|---|---|
| Reações especificadas: "Entendi. Anotado.", "Interessante...", "Entendi. Vou anotar..." | **Parcial** | `reacoes.ts` define reações para cada pergunta, mas são explicativas ("Saber o segmento me ajuda a entender..."), não reações naturais de escuta. |
| Reação a resposta inesperada | **Ausente** | Todas as reações são fixas por pergunta, independente da resposta. |
| Check "Recebido" | **Parcial** | `MicroReaction.tsx` mostra `CheckCircle2` com texto da reação, mas não há badge "Recebido" na mensagem. |
| Fidelidade | 30% | |
| Impacto | Médio — reações existem mas são genéricas, não adaptativas. |

### 2.11 Revelação / Diagnóstico Final (E7)

| Item | Status | Evidência |
|---|---|---|
| Card de diagnóstico completo | **Sim** | `RevelacaoCard.tsx` exibe interpretações (pontoAtencao, observacao, alinhamento) e resumoNatural com 5 seções. |
| Barra de cobertura | **Ausente** | Não há barra de cobertura percentual no diagnóstico. |
| Confiança final | **Ausente** | Não mostrada. |
| Insights gerados | **Ausente** | Não há contagem. |
| Lacunas | **Parcial** | `resumoNatural.secao4` exibe lacunas como bullets. |
| Botões: "Ver dashboard" / "Agendar revisão" | **Parcial** | Código oferece "Quero criar minha conta e continuar" que leva a `/criar-conta`. |
| Fidelidade | 40% | |
| Impacto | Médio — o diagnóstico existe mas sem os indicadores quantitativos que demonstram conhecimento. |

### 2.12 Resumo Parcial a cada 5 Perguntas (E6)

| Item | Status | Evidência |
|---|---|---|
| Resumo parcial a cada 5 perguntas | **Ausente** | Não há checkpoint de resumo intermediário. O fluxo é linear sem pausas de consolidação. |
| Especificação: a cada 5 perguntas OU 3 min | **Ausente** | |
| Fidelidade | 0% | |
| Impacto | Alto — o resumo parcial é o momento em que o empresário valida o entendimento da IA. |

---

## 3. ASSISTENTE

### 3.1 Chat Component

| Item | Status | Evidência |
|---|---|---|
| `chat.tsx` + `chat-message.tsx` existem | **Sim** | Componentes implementados com streaming, sugestões contextuais, estados vazios dinâmicos. |
| Corresponde à especificação de presença? | **Parcial** | Especificação E3 define layout 3 colunas (conversa + painel cognitivo + histórico). Código implementa apenas chat centralizado, sem painel. |
| Fidelidade | 50% | |
| Impacto | Médio — chat funcional mas sem a riqueza contextual especificada. |

### 3.2 Tom de Voz

| Item | Status | Evidência |
|---|---|---|
| Tom especificado está implementado? | **Parcial** | O assistente alterna entre "Analisando tudo o que sabemos...", "Estamos evoluindo juntos", etc (contextual). Mas não há variação de tom (formal/informal, confiante/humilde) conforme especificação. |
| Especificação: voz consistente, varia conforme confiança | **Ausente** | Não há modulação de tom baseada em confiança. |
| Fidelidade | 30% | |
| Impacto | Médio — o tom é adequado mas sem a sofisticação especificada. |

### 3.3 Centro vs Coadjuvante

| Item | Status | Evidência |
|---|---|---|
| O assistente é centro ou coadjuvante? | **Centro** | `assistente/page.tsx` coloca o Chat como elemento principal da página, com BriefingCard, NotificationCard, HealthScoreCard acima. É o centro da experiência. |
| Especificação: IA é guia da investigação | **Parcial** | Implementação posiciona IA como centro, mas sem o papel de "investigador ativo" — é mais um Q&A. |
| Fidelidade | 50% | |
| Impacto | Baixo — posicionamento correto. |

### 3.4 Microfeedback "Ouvindo"

| Item | Status | Evidência |
|---|---|---|
| Indicador de "ouvindo" enquanto empresário digita | **Ausente** | Não há feedback visual de que a IA está "ouvindo" durante a digitação. |
| Especificação: reação visual enquanto usuário digita | **Ausente** | |
| Fidelidade | 0% | |
| Impacto | Médio — feedback de escuta ativa é essencial para sensação de presença. |

### 3.5 Silêncio Produtivo

| Item | Status | Evidência |
|---|---|---|
| Silêncio produtivo implementado? | **Ausente** | Não há detecção de pausa, nem ação da IA após silêncio de 5s. |
| Especificação: após 5s de silêncio, IA intervém | **Ausente** | |
| Fidelidade | 0% | |
| Impacto | Médio — a IA parece passiva quando o empresário para de interagir. |

### 3.6 Avatar com Personalidade

| Item | Status | Evidência |
|---|---|---|
| Avatar existe? | **Parcial** | `chat-message.tsx:22-25` — IA usa ícone `Bot` do lucide-react em círculo bg-muted. Sem personalidade, sem nome, sem identidade visual única. |
| Especificação: IA com nome, avatar e personalidade visual | **Ausente** | A IA não tem nome nem elementos de personalidade (expressões, reações visuais). |
| Fidelidade | 15% | |
| Impacto | Médio — a ausência de personalidade reduz a conexão emocional. |

---

## 4. ESTADOS DA TELA (COMPLETUDE)

| Estado Especificado | Implementado | Fidelidade |
|---|---|---|
| E1 — Landing | Parcial | 30% |
| E2 — Primeiro Login | Ausente | 0% |
| E3 — Conversa Ativa | Parcial | 40% |
| E4 — IA Pensando | Ausente | 0% |
| E5 — Insight | Ausente | 0% |
| E6 — Resumo Parcial | Ausente | 0% |
| E7 — Conclusão/Diagnóstico | Parcial | 40% |

---

## 5. ANIMAÇÕES E MICROESTADOS

| Animação Especificada | Código Real | Status |
|---|---|---|
| Card slide up + fade 300ms | fadeIn 0.4s, slideUp 0.35s, scaleIn 0.25s | Divergente |
| Pensando: 3 pontos pulsando + texto dinâmico | Spinner CSS + "Iniciando conversa..." | Ausente |
| Insight: destaque visual + ✦ | Não existe | Ausente |
| Confiança: barra preenche 600ms | Não existe | Ausente |
| Resumo parcial: card expande 700ms | Não existe | Ausente |
| Cores por estado cognitivo (6 estados) | Não existe | Ausente |
| Badges por estado (Processando, Analisando, etc) | Não existe | Ausente |

---

## 6. Checklist de Consistência Visual (P23)

| Item | Status |
|---|---|
| Todos os estados da tela mapeados | Não — apenas E1 e E3/E7 parciais |
| Cada estado tem hierarquia visual definida | Não |
| Microestados têm tratamento visual único | Não |
| Transições têm duração e easing | Parcial (apenas 4 animações genéricas) |
| Responsivo: mobile, tablet, desktop | Não avaliado nesta auditoria |
| Cores por estado cognitivo documentadas | Especificado no P23, não implementado |
| Tipografia hierarquizada por função | Não implementado conforme especificação |
| Cards têm padding, border-radius e sombra consistentes | Parcial |

---

## 7. Checklist de Consistência da Conversa (P23)

| Item | Status |
|---|---|
| Abertura personalizada (primeira vez vs retorno) | Ausente |
| Primeira pergunta é a mais fácil | Implementado (segmento do negócio) |
| IA reage ao conteúdo, não só avança | Parcial (reações fixas, não adaptativas) |
| IA admite quando não sabe | Ausente |
| IA revisa hipóteses quando contradita | Ausente |
| Resumo parcial a cada 5 perguntas | Ausente |
| Timing da resposta varia com complexidade | Ausente |
| Cadência se adapta ao ritmo do empresário | Ausente |
| Insights baseados em dados reais | Parcial (insight-card existe mas não durante conversa) |
| Painel cognitivo reflete estado atual | Ausente |
| Transições entre fases suaves e naturais | Ausente |
| Empresário pode interromper, corrigir, parar | Parcial (pode parar, mas não interromper/corrigir) |

---

## 8. Matriz de Impacto

| Lacuna | Camada | Impacto | Urgência |
|---|---|---|---|
| Mapa cognitivo vivo ausente | Diagnóstico | Crítico | Imediata |
| Estados cognitivos não implementados | Diagnóstico | Crítico | Imediata |
| Loading inteligente sem texto dinâmico | Diagnóstico | Alto | Alta |
| Espera inteligente (pausas) ausente | Diagnóstico | Alto | Alta |
| Indicador de confiança ausente | Diagnóstico | Alto | Alta |
| Saudação/abertura personalizada ausente | Diagnóstico | Alto | Alta |
| Resumo parcial ausente | Diagnóstico | Alto | Alta |
| Transições entre estados ausentes | Diagnóstico | Alto | Alta |
| Tagline divergente | Landing | Alto | Alta |
| Hierarquia visual divergente | Landing | Alto | Alta |
| Formulário de login ausente | Landing | Alto | Média |
| Emoção da landing divergente | Landing | Alto | Média |
| Avatar/personalidade IA ausente | Assistente | Médio | Média |
| Microfeedback "ouvindo" ausente | Assistente | Médio | Média |
| Silêncio produtivo ausente | Assistente | Médio | Média |
| Cores por estado cognitivo ausentes | Ambos | Médio | Média |

---

## 9. Conclusão

A implementação atual entrega uma versão **funcional** mas **não cognitiva** do que o P23 especifica. O código resolve o problema de coleta de dados (onboarding de 18 perguntas + assistente com streaming), mas não entrega a experiência de "investigação inteligente" descrita na documentação.

As três lacunas mais críticas são:
1. **Mapa cognitivo vivo** — o elemento visual central da especificação não existe
2. **Estados cognitivos** — sem eles, a IA não demonstra processo de pensamento
3. **Microtiming** — sem espera inteligente, a conversa parece mecânica

**A fidelidade geral de ~32% é aceitável para a fase V4 Founder** (que prioriza usuário real > arquitetura perfeita), desde que estas lacunas sejam documentadas como hipóteses a validar: "o empresário precisa ver o processo de pensamento da IA para confiar no diagnóstico?".
