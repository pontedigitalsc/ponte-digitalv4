# Auditoria: Dashboard (Camada 6), Assistente (Camada 7), Sistema Visual (Camada 8)

**Auditoria de materialização | P29 | Julho 2026**
**Comparação: código real vs especificações P24 (Certificação Visual), P28 (Linguagem Visual, Assinatura Visual), P29 (Dashboard, Assistente, Componentes)**

---

## Sumário

| Camada | Fidelidade geral | Status |
|---|---|---|
| Dashboard | ~25% | **Crítico** — estrutura não corresponde à hierarquia dos 3-10-30s |
| Assistente | ~15% | **Crítico** — chat box tradicional, sem presença, avatar ou comportamento especificado |
| Sistema Visual | ~20% | **Crítico** — paleta, tipografia, espaçamento, animações, z-index fora do especificado |

---

## DASHBOARD

### 1. Sidebar — ordem dos módulos

| Item | Status |
|---|---|
| Ordem atual no código | Principal → Comercial → Operacional → Financeiro → Inteligência → Sistema |
| Ordem especificada (P28/P29) | Conhecimento > Decisão > Ação (hierarquia cognitiva) |
| **Fidelidade** | **0%** |
| **Evidência** | `sidebar.tsx` (linha 15-57): grupos organizados por departamento empresarial, não por prioridade cognitiva. Inteligência (Conhecimento) está no 5º grupo, enterrada. |
| **Diferença** | A ordem departamental é herança de um CRM. A P29 especifica que o que importa é o estado cognitivo do empresário (explorando → decidindo → agindo). O módulo "Conhecimento" deveria ser o primeiro na hierarquia. |
| **Impacto** | Empresário não encontra o que importa primeiro. A navegação reflete organização interna (departamentos) em vez da jornada cognitiva do usuário. |

### 2. Cards cognitivos — correspondência com especificação

| Card no código | Especificado em P29? | Fidelidade | Diferença |
|---|---|---|---|
| `BriefingCard` | Resumo do diagnóstico (5.3) + Saudação (5.1) | **20%** | O BriefingCard tem saudação + pontos, mas não segue estrutura de Insight Principal (8/12, roxo, badge "Novo", confiança+impacto). Saudação foi duplicada: está inline no `page.tsx` (h2) e dentro do BriefingCard. |
| `NotificationCard` | Não especificado como card separado | **0%** | Notificações no P29 são Badge no header ou toast, não um card cognitivo. |
| `HealthScoreCard` | Indicadores por área (5.7) | **30%** | Tem score + barras, mas não mostra variação por área (▲/▼), não segue 12/12 layout, não tem ordenação por prioridade. |
| `EvolutionCard` | Não especificado como card separado | **0%** | P29 não prevê card "Evolução da sua empresa". A evolução está implícita nos indicadores. |
| `MaturityCard` | Não especificado | **0%** | P29 não prevê estágio da empresa como card no dashboard. |
| `MilestoneCard` | Não especificado | **0%** | Conquistas aparecem na Timeline (especificação P29), não como card separado. |
| `KnowledgeAgingCard` | Não especificado | **0%** | Informações para revisar seria subseção, não card principal. |
| `ConfidenceDriftCard` | Anel de Confiança (P28 seção 1) | **5%** | Variação de certeza é lista vertical, não o Anel de Confiança circular com arco, cor gradiente, e pulso. O conceito é vagamente relacionado mas a implementação visual é outra. |
| `PriorityCard` (PRIORIDADES_INICIAIS) | Primeiro login (4.1) | **40%** | Existe escopo reduzido com boas-vindas + 4 cards. Mas o P29 especifica: 1 card de boas-vindas + 1 CTA "Iniciar diagnóstico" + mapa vazio + indicadores placeholder. O código mostra 4 cards de prioridades iguais — não segue a hierarquia de atenção. |

**Achado crítico:** NENHUM card corresponde diretamente ao que o P29 especifica como "Insight Principal em destaque" (5.2) — o elemento mais crítico do dashboard.

### 3. Insight principal em destaque (P29 item 6)

| Item | Status |
|---|---|
| **Fidelidade** | **5%** |
| **Evidência** | `dashboard/page.tsx` linha 92-97: `ExperienceRenderer` renderiza narrativa + blocks + actions + workflows. Não há um card de insight principal dedicado com 8/12 largura, cor roxo, badge "Novo", indicadores de confiança/impacto, tags, botões "Explorar" e "Ação". |
| **Diferença** | O P29 especifica 50% da atenção do empresário deve ir para o insight principal nos primeiros 3 segundos. O código não tem este componente. A experiência é renderizada genericamente via `ExperienceRenderer`, que pode incluir `InsightCard` entre os blocks, mas sem destaque especial. |
| **Impacto** | **Crítico.** O dashboard não passa no teste dos 3 segundos (Apêndice B do SISTEMA_OFICIAL_DO_DASHBOARD). O empresário não identifica o insight principal rapidamente. |

### 4. Estados vazios

| Seção | Estado vazio implementado? | Especificado? | Gap |
|---|---|---|---|
| Dashboard vazio (escopoReduzido) | ✅ Sim | Sim (4.1) | Parcial — o código mostra 4 cards iguais, a especificação pede 1 card + CTA + placeholders |
| BriefingCard | ❌ `if (!briefing) return null` | Card "Nenhum insight ainda" | Estado vazio silencioso — sem mensagem |
| NotificationCard | ❌ `if (notifications.length === 0) return null` | Badge de notificação zero | Estado vazio silencioso |
| HealthScoreCard | ❌ `if (!healthScore) return null` | "Indicadores após diagnóstico" | Estado vazio silencioso |
| EvolutionCard | ✅ Sempre renderizado | N/A | — |
| MilestoneCard | ❌ `if (!milestones.length) return null` | Timeline vazia | Estado vazio silencioso |
| KnowledgeAgingCard | ❌ `if (!knowledgeAge.length) return null` | Não especificado | — |
| ConfidenceDriftCard | ❌ `if (!confidenceDrift.length) return null` | Aneis vazios | Estado vazio silencioso |
| Conversa (assistente) | ✅ Sim (chat.tsx linha 282-402) | Sim (P29) | Implementação robusta com múltiplos contextos |

**Achado:** Card cognitivos retornam `null` quando vazios, criando "buracos" visuais no layout. O P29 especifica estados vazios informativos.

### 5. Hierarquia visual: conhecimento > decisão > ação (P28)

| Item | Status |
|---|---|
| **Fidelidade** | **10%** |
| **Evidência** | O código empilha componentes verticalmente com `space-y-6`. Não há hierarquia de tamanhos (todos os cards parecem ter o mesmo peso visual). Não há colunas 8/12 + 4/12. Não há diferenciação de 3s → 10s → 30s. |
| **Diferença** | P29 especifica: Saudação + Insight (3s), Mapa + Descobertas (10s), Indicadores + Histórico (30s). O código: tudo de uma vez, linear, mesmo tamanho. |
| **Impacto** | Sobrecarga cognitiva. Empresário não sabe para onde olhar primeiro. |

### 6. Saudação personalizada + "última visita"

| Item | Status |
|---|---|
| Saudação por período | ✅ Implementado (linha 48-53) |
| Nome do empresário | ✅ Apenas primeiro nome |
| Frase de contexto abaixo | ✅ `home.foco?.rotulo` |
| "Desde sua última visita" | ❌ Não implementado |
| Badge "Novo" em insights | ❌ Não implementado |
| Variação por estado (primeiro login, retorno, etc.) | ❌ Apenas saudação de período + foco |
| **Fidelidade** | **30%** |
| **Impacto** | Médio. Saudação existe mas sem o contexto temporal que o P29 considera essencial para a âncora emocional. |

### 7. O que aparece primeiro vs desaparece

| Item | Status |
|---|---|
| 8/12 + 4/12 layout | ❌ Não existe (layout single column) |
| Insight principal em destaque | ❌ Não existe como card dedicado |
| Resumo do diagnóstico (3-5 bullets) | ❌ Dentro do BriefingCard, não separado |
| Mapa cognitivo (radar) | ❌ Não existe no dashboard |
| Últimas descobertas | ❌ Não existe como seção |
| Ações recomendadas | ⚠️ Dentro de ExperienceRenderer.actions |
| Indicadores por área | ⚠️ HealthScoreCard, mas sem variação por área |
| Histórico de insights | ❌ Não existe |
| Próximos passos | ❌ Não existe |
| **Fidelidade** | **5%** |

---

## ASSISTENTE

### 1. Chat component — chat box tradicional ou "presença"?

| Item | Status |
|---|---|
| **Fidelidade** | **10%** |
| **Evidência** | `chat.tsx`: implementation clássica de chat box — lista de mensagens verticais + textarea no final. O P29 especifica um Assistente que ocupa espaço conforme o estado (25% presente, 60% falando, 40% pensando, 5% invisível), com comportamento de iniciativa, hesitação, silêncio ativo. |
| **Diferença fundamental** | O código é um chat box. O P29 especifica uma PRESENÇA que ocupa a interface, não uma janela de conversa. O Assistente no P29: adapta-se ao tipo de tela (conversa/dashboard/configuração), toma iniciativa após 10s, tem protocolo de hesitação, respira, inclina. Nada disso existe no código. |
| **Impacto** | **Crítico.** A experiência do assistente é reducionista. Não comunica inteligência, presença ou personalidade. É apenas "um chatbot" — exatamente o que a especificação diz para não ser. |

### 2. Avatar — personalidade visual (respiração, estados)

| Item | Código | Especificação P29 | Fidelidade |
|---|---|---|---|
| Avatar do assistente | Ícone `Bot` estático 28x28px, fundo `bg-muted` | 7 estados: Presente (40px), Falando (64px), Pensando (40px), Invisível (24px), Escutando (40px), Erro (40px), Insight (64px) | **0%** |
| Respiração (ciclo 3-4s) | ❌ Não existe | Sim, senoidal 0.98x→1.02x | **0%** |
| Inclinação (escuta) | ❌ Não existe | 5° para frente | **0%** |
| Cor da borda por estado | ❌ Sem borda | Neutra → Primária → Vermelha → Dourada | **0%** |
| Avatar do usuário | Ícone `User` estático 28x28px, fundo `bg-primary` | Não especificado | — |
| **Impacto** | **Crítico.** O avatar do assistente é genérico. Não há identidade visual, não há presença, não há comunicação não-verbal (respiração, escuta, pensamento). O P28/P29 fazem do avatar O elemento de assinatura visual mais importante. |

### 3. Microfeedback de pensamento

| Item | Código | Especificação | Fidelidade |
|---|---|---|---|
| Loading | 3 dots animados (bounce) | Pipeline cognitivo: "Escutando" → "Relacionando" → "Hipótese" → "Validação" → "Finalização" | **5%** |
| Escrita Pensada | ❌ Texto aparece completo | Palavra por palavra, pausas em pontuação, ~200ms/palavra | **0%** |
| Delay inicial | ❌ Imediato | 200ms-1200ms conforme tipo de resposta | **0%** |
| **Impacto** | Alto. O usuario não percebe a IA "pensando". A resposta aparece completa, sem o ritmo que comunica raciocínio. |

### 4. Tom de voz por contexto

| Item | Status |
|---|---|
| **Fidelidade** | **25%** |
| **Evidência** | `chat.tsx` linha 77-146: as `sugestoes` mudam conforme `temFeedbackRecente`, `temOutcomePositivo`, `decisao`, `empresaConhecida`. Mensagens de estado vazio variam o texto. Porém, isso é apenas texto estático — não há variação de "tom" na resposta da IA (que chega via streaming da API). |
| **Diferença** | O P29 espera que o tom varie por tipo de resposta (afirmativo, investigativo, curioso, direto) conforme o nível de confiança e o estado cognitivo. O código não controla tom — a IA responde via API sem contexto de tom. |

---

## SISTEMA VISUAL

### 1. Paleta P28: primary 221/83/53 corresponde?

| Item | Código | P28 | Fidelidade |
|---|---|---|---|
| `--color-primary` (token) | 221 83% 53% (hsl) → ~#3B82F6 (shadcn/ui azul) | `#0A1F2E` (Azul Profundo) | **0%** |
| `--color-secondary` (token) | 210 40% 96% (cinza claro) — shadcn/ui padrão | `#2B6B9E` (Azul Tranquilo) | **0%** |
| Fundo de página | 0 0% 99% (quase branco) | `#F4F6F8` (Branco Oceano) | **~50%** |
| Fundo de cards | 0 0% 100% (branco puro) | Proibido pela P28: "Nunca usar branco puro como fundo de tela" | **0%** (viola regra P28) |
| **Paleta de apoio (5 cores)** | Não implementada (usa tokens shadcn/ui padrão) | Cinza Texto #2D3748, Cinza Suave #718096, Cinza Borda #E2E8F0, Azul Gelo #EBF4FF, Preto Suave #1A202C | **0%** |
| **Paleta semântica** | Apenas `--destructive` vermelho. Sem tokens para sucesso, alerta, insight, confiança | 5 cores semânticas especificadas | **10%** |
| **Impacto** | **Crítico.** A identidade visual completa da Ponte Digital (Azul Profundo + Azul Tranquilo + Branco Oceano) NÃO está implementada. O código usa shadcn/ui default palette, que é visualmente outra marca. |

### 2. Tipografia: Inter + JetBrains Mono conforme P28?

| Item | Código | P28 | Fidelidade |
|---|---|---|---|
| Inter | ✅ `layout.tsx`: `Inter({ variable: '--font-inter' })` | Inter é a fonte principal | **100%** |
| JetBrains Mono | ❌ Não importado, não configurado | Fonte de apoio para dados/números | **0%** |
| Escala tipográfica | ❌ Usa Tailwind padrão (text-xs a text-3xl) | `--text-xs` a `--text-3xl` com line-height específico | **10%** |
| Pesos (Light/Regular/Medium/Semibold/Bold) | ❌ Usa font-semibold, font-medium, font-bold do Tailwind | Pesos específicos com regras de uso | **10%** |
| Regras (nunca bold em texto corrido, máx 2 pesos por tela, etc.) | ❌ Não verificáveis em código | Regras explícitas | **0%** |
| **Impacto** | Alto. Inter está correta, mas JetBrains Mono está faltando. A escala tipográfica não segue a especificação (line-heights diferentes). Regras de uso não são aplicadas. |

### 3. Espaçamento: sistema de 8px implementado?

| Item | Status |
|---|---|
| **Fidelidade** | **20%** |
| **Evidência** | Tailwind padrão usa base de 4px (gap-1=4px, gap-2=8px, gap-4=16px). O P28 especifica base de 8px (space-1=8px, space-2=16px, etc.). O código usa gap-4, p-4, space-y-6 — que são multiplos de 4, não de 8. A escala de 8px do P28 inclui valores como 12px (space-1.5), 24px (space-3), 48px (space-6) que não têm correspondente direto no Tailwind padrão. |
| **Diferença fundamental** | A P28 diz "Nunca usar valores fora da escala" e a escala começa em 8px. O código usa escala 4px. A diferença de 4px parece pequena mas afeta consistência em todo o layout. |
| **Impacto** | Alto. O sistema de espaçamento é o alicerce visual. Com a base errada, todos os componentes ficam ligeiramente desalinhados da especificação. |

### 4. Animações — 4 animações CSS correspondem às 53 microinterações?

| Item | Código | Especificação | Fidelidade |
|---|---|---|---|
| Animações CSS | 4 em `globals.css` (fadeIn 0.4s, slideUp 0.35s, scaleIn 0.25s, pulseSoft 2s) + 4 em `tailwind.config.ts` (accordion-down 0.2s, accordion-up 0.2s, fade-in 0.2s, slide-in-right 0.3s) | P24 especifica 18 microinterações + 30 transições = 53 cenários com durações, easings e comportamentos específicos | **8%** |
| Easing | Apenas `ease-out` e `ease-in-out` | Múltiplos: ease-out, ease-in-out, cubic-bezier específicos (0.4,0,0.2,1), spring, orgânico, mecânico, natural, dramático | **5%** |
| Stagger | ❌ Não implementado | Cards: 100ms, Linhas: 50ms, Timeline: 100ms, Barras: 80ms | **0%** |
| Skeleton/Shimmer | ❌ Não implementado nos componentes | Skeleton para cada componente | **0%** |
| **Impacto** | **Crítico.** A experiência de movimento é minimalista. Não há microfeedback, não há transições de estado, não há entrada com stagger, não há skeleton loading. A interface parece "muda" comparada à especificação. |

### 5. Sistema de camadas (z-index 0-5) conforme P29?

| Item | Status |
|---|---|
| **Fidelidade** | **0%** |
| **Evidência** | Nenhum z-index definido em `globals.css` ou `tailwind.config.ts`. O P24/P29 menciona: "modal > insight > painel > conversa" com camadas definidas. O código usa z-index apenas onde o Tailwind/componentes aplicam automaticamente (ex: modais). |
| **Impacto** | Médio. Sem sistema de camadas explícito, sobreposições podem conflitar. |

### 6. Dark mode

| Item | Status |
|---|---|
| Variáveis CSS `.dark` | ✅ `globals.css` linha 27-47 |
| Toggle via next-themes | ✅ `header.tsx` linha 50-58 |
| Todas cores adaptadas? | ⚠️ Parcial. Cores HSL invertidas, mas sem verificação de contraste. |
| Paleta P28 no dark mode? | ❌ A paleta dark mode do código é shadcn/ui padrão, não derivada da P28. |
| **Fidelidade** | **60% para existência, 10% para alinhamento com P28** |

### 7. Anel de Confiança (assinatura primária P28)

| Item | Status |
|---|---|
| **Fidelidade** | **0%** |
| **Evidência** | Nenhum componente de Anel de Confiança existe no código. O P28 especifica como elemento primário de assinatura visual: círculo com arco, cores (vermelho < 40% → amarelo 40-70% → verde > 70%), tamanhos variáveis (16px/24px/32px), pulso suave. O `ConfidenceDriftCard` é uma lista vertical de variações de certeza — conceito diferente, implementação diferente. |
| **Impacto** | **Crítico.** O Anel de Confiança é a assinatura visual #1 da Ponte Digital. É o elemento que diferencia a marca. Não existir significa que a identidade visual central não foi implementada. |

---

## Resumo de Fidelidade por Componente

| Componente | Fidelidade | Prioridade |
|---|---|---|
| Sidebar — ordem cognitiva | 0% | Alta |
| Insight Principal em destaque | 5% | **Crítico** |
| Cards cognitivos (estrutura P29) | 10% | **Crítico** |
| Estados vazios informativos | 15% | Alta |
| Hierarquia 3-10-30s | 5% | **Crítico** |
| Saudação + última visita | 30% | Média |
| Layout 8/12 + 4/12 | 0% | Alta |
| Mapa cognitivo (radar) | 0% | Alta |
| Assistente como presença | 10% | **Crítico** |
| Avatar com estados | 0% | **Crítico** |
| Microfeedback de pensamento | 5% | **Crítico** |
| Escrita Pensada | 0% | Alta |
| Tom de voz contextual | 25% | Média |
| Paleta P28 (Azul Profundo) | 0% | **Crítico** |
| Paleta de apoio (5 cores) | 0% | Alta |
| Paleta semântica (5 cores) | 10% | Alta |
| JetBrains Mono | 0% | Média |
| Escala tipográfica P28 | 10% | Alta |
| Regras tipográficas | 0% | Média |
| Espaçamento 8px | 20% | Alta |
| Animações (53 cenários) | 8% | **Crítico** |
| Z-index hierarquizado | 0% | Média |
| Dark mode alinhado P28 | 10% | Média |
| Anel de Confiança | 0% | **Crítico** |

---

## Problemas Críticos (devem ser resolvidos na sprint atual)

1. **Insight Principal em destaque não existe.** O dashboard não passa no teste dos 3 segundos.
2. **Paleta P28 não implementada.** A identidade visual da marca está ausente. O azul 221/83/53 do shadcn/ui não é o Azul Profundo #0A1F2E.
3. **Anel de Confiança não existe.** A assinatura primária da Ponte Digital não foi materializada.
4. **Assistente é chat box, não presença.** Falta avatar com estados, respiração, Escrita Pensada, microfeedback, iniciativa.
5. **Hierarquia 3-10-30s não implementada.** Todos os cards têm o mesmo peso visual.
6. **53 microinterações vs 4 animações CSS.** A experiência de movimento é drasticamente inferior ao especificado.

---

*Documento gerado por auditoria de materialização em 27/07/2026.*
*Base de comparação: P24 (Certificação Visual), P28 (Linguagem Visual + Assinatura Visual), P29 (Dashboard, Assistente, Componentes).*
