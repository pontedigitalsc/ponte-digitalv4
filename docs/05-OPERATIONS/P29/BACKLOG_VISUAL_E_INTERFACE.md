# Backlog Visual e de Interface — Alinhamento P28+P29

**Prioridades:** 🔴 Crítico (bloqueia identidade) | 🟠 Alta (bloqueia experiência) | 🟡 Média (aprimoramento) | 🟢 Baixa (refinamento)
**Esforço:** P (pequeno, ≤4h) | M (médio, 1-2d) | G (grande, 3-5d) | XG (extremamente grande, >5d)

---

## Dashboard — Estrutura e Navegação

| ID | Nome | Componente | Estado atual | Estado desejado | Prioridade | Esforço |
|---|---|---|---|---|---|---|
| M-001 | Reordenar sidebar por hierarquia cognitiva | `sidebar.tsx` | Grupos departamentais (Principal → Comercial → Operacional → Financeiro → Inteligência → Sistema) | Conhecimento > Decisão > Ação. Grupo "Inteligência" (conhecimento/aprendizados/assistente) move para 1º. | 🔴 Crítico | P |
| M-002 | Implementar layout 8/12 + 4/12 | `dashboard/page.tsx`, `app-shell.tsx` | Single column vertical com `space-y-6` | Duas colunas: coluna principal (8/12) com insight + resumo, coluna secundária (4/12) com ações + indicadores. | 🔴 Crítico | M |
| M-003 | Criar card Insight Principal dedicado | Novo componente `insight-principal-card` | Inexistente | Card 8/12, roxo insight (borda ou fundo 5%), título H3 semi-bold, descrição máx 3 linhas, badge "Novo" (se aplicável), confiança+impacto, tags, botões "Explorar" + "Ação". | 🔴 Crítico | M |
| M-004 | Implementar hierarquia 3-10-30 segundos | `dashboard/page.tsx` | Todos os cards empilhados linearmente | 3s: Saudação + Insight Principal. 10s: Mapa Cognitivo + Últimas Descobertas. 30s: Indicadores + Histórico + Próximos Passos. | 🔴 Crítico | M |
| M-005 | Criar seção "Últimas Descobertas" | Novo componente | Inexistente | Grid de 2-3 cards compactos com ícone + título + descrição (1 linha) + tags. Clicáveis → navegam para conversa. | 🟠 Alta | M |
| M-006 | Criar seção "Ações Recomendadas" | `ExperienceRenderer` (modificar) | Dentro de ExperienceRenderer, sem destaque | Cards ordenados por urgência, máximo 3 visíveis, "Ver todas..." para o restante. Chip de urgência + CTA "Iniciar". | 🟠 Alta | M |
| M-007 | Criar seção "Indicadores por Área" | Novo componente (substitui HealthScoreCard) | HealthScoreCard com score único + distribuição | Barras horizontais por área (8px altura), label + valor + variação (▲/▼/—), cores por área, ordenação por prioridade. | 🟠 Alta | M |
| M-008 | Criar "Histórico de Insights" (últimos 3) | Novo componente | Inexistente | Lista vertical: data + título + área + confiança. Clicável → conversa. "Ver histórico completo" → sheet. | 🟡 Média | P |
| M-009 | Implementar "Próximos Passos" | Novo componente | Inexistente | 2-3 botões secundários com label + descrição, contexto-dependentes. | 🟡 Média | P |
| M-010 | Implementar Mapa Cognitivo (radar) | Novo componente | Inexistente | Gráfico radar (5-8 eixos), animação de entrada (100ms/eixo), hover → tooltip, click → navega para área. | 🟠 Alta | G |

## Dashboard — Estados e Comportamento

| ID | Nome | Componente | Estado atual | Estado desejado | Prioridade | Esforço |
|---|---|---|---|---|---|---|
| M-011 | Implementar variação de saudação "desde última visita" | `dashboard/page.tsx` | Saudação por período + foco.rotulo | Varia por: primeiro login, diagnóstico concluído, retorno sem novidades, retorno com novidades, ações pendentes. Incluir "Desde sua última visita" com data relativa. | 🟠 Alta | M |
| M-012 | Badge "Novo" em insights não visualizados | `insight-principal-card`, cards de descoberta | Inexistente | Badge animado (pulse 3s) em insights novos. Card de insight novo com destaque mais vibrante por 5s. | 🟠 Alta | P |
| M-013 | Estado vazio informativo para cada card cognitivo | Todos os cognitive cards | `return null` quando vazio | Mensagens específicas: "Nenhum insight ainda. Inicie seu diagnóstico.", "Indicadores serão exibidos após o diagnóstico.", etc. | 🟠 Alta | M |
| M-014 | Card de lembretes de ações pendentes | Novo componente | Inexistente | Card entre ações e indicadores, borda âmbar/vermelho conforme urgência, lista de ações pendentes, CTA "Revisar ações". | 🟡 Média | P |
| M-015 | Resumo do diagnóstico (3-5 bullets) | Novo componente ou dentro de BriefingCard | BriefingCard com pontos variáveis | Bullets com ícones de status (✔/⚠/✕), ordenação positivos primeiro, máx 5. | 🟡 Média | P |

## Assistente — Presença e Comportamento

| ID | Nome | Componente | Estado atual | Estado desejado | Prioridade | Esforço |
|---|---|---|---|---|---|---|
| M-016 | Implementar avatar com estados visuais | `chat-message.tsx` | Ícone Bot estático 28px, sem borda, sem variação | 7 estados: Presente (40px), Falando (64px), Pensando (40px), Invisível (24px), Escutando (40px), Erro (40px), Insight (64px). Cada estado com cor de borda, animação, ícone interno. | 🔴 Crítico | G |
| M-017 | Adicionar animação de respiração ao avatar | Avatar component | Inexistente | Ciclo senoidal 4s: 0.98x → 1.02x, opacidade 80% (presente) / 60% (processando). | 🟠 Alta | M |
| M-018 | Implementar Escrita Pensada (streaming palavra por palavra) | `chat.tsx` (stream) | Texto aparece via streaming SSE (linha 196-225) | Adicionar delay controlado por tipo de resposta: 200ms simples, 400ms média, 600ms complexa, 800ms análise, 1200ms insight. Pausas em vírgula (+100ms) e ponto final (+300ms). | 🟠 Alta | G |
| M-019 | Implementar pipeline cognitivo de loading | `chat.tsx` | 3 dots animados | Texto narrativo: "Escutando atentamente…" → "Relacionando informações…" → "Construindo hipótese…" → "Validando com dados…" → "Finalizando análise…". Timeout progressivo em 8s, 15s, 30s. | 🟠 Alta | M |
| M-020 | Implementar iniciativa do assistente (silêncio > 10s) | `chat.tsx` | Inexistente | Após 10s sem input: sugerir próximo assunto. Após 5s de campo vazio focado: "Está com dúvida sobre o que perguntar?" | 🟡 Média | M |
| M-021 | Adaptar ocupação do assistente por tipo de tela | `chat.tsx`, dashboard | Chat box fixo | Conversa: avatar expandido + campo visível. Dashboard: avatar reduzido + campo compacto. Configuração: avatar mínimo + campo oculto. | 🟡 Média | G |
| M-022 | Implementar "Ver mais" em mensagens longas (>400 chars) | `chat-message.tsx` | Inexistente | Truncar em 3 linhas + "Ver mais". Expandir para conteúdo completo (máx 30 linhas antes de scroll). | 🟢 Baixa | P |

## Sistema Visual — Paleta e Cores

| ID | Nome | Componente | Estado atual | Estado desejado | Prioridade | Esforço |
|---|---|---|---|---|---|---|
| M-023 | Substituir paleta shadcn/ui por paleta P28 oficial | `globals.css`, `tailwind.config.ts` | HSL 221/83/53 (shadcn blue), #F8FAFC fundo, #FFFFFF cards | Azul Profundo `#0A1F2E` primary, Azul Tranquilo `#2B6B9E` secondary, Branco Oceano `#F4F6F8` bg. Proibido branco puro (#FFFFFF). | 🔴 Crítico | M |
| M-024 | Implementar paleta de apoio (5 cores) | `globals.css`, `tailwind.config.ts` | Inexistente (usa muted/border/accent do shadcn) | Cinza Texto `#2D3748`, Cinza Suave `#718096`, Cinza Borda `#E2E8F0`, Azul Gelo `#EBF4FF`, Preto Suave `#1A202C`. | 🟠 Alta | M |
| M-025 | Implementar paleta semântica (5 cores) | `globals.css`, `tailwind.config.ts` | Apenas `--destructive` (vermelho) | Sucesso `#2F855A`, Erro `#C53030`, Alerta `#D69E2E`, Insight `#6B46C1`, Confiança `#2B6B9E`. | 🟠 Alta | P |
| M-026 | Aplicar regra 80/15/5 de proporção de cores | Revisão global de componentes | Sem controle de proporção | Principal (Azul Profundo + Branco Oceano) = 80%. Apoio (cinzas) = 15%. Destaque (Azul Tranquilo + semânticas) = 5%. | 🟡 Média | G |

## Sistema Visual — Tipografia

| ID | Nome | Componente | Estado atual | Estado desejado | Prioridade | Esforço |
|---|---|---|---|---|---|---|
| M-027 | Adicionar JetBrains Mono como fonte de apoio | `app/layout.tsx`, `tailwind.config.ts` | Apenas Inter configurada | Importar JetBrains Mono via next/font. Criar classe `font-mono` para dados, números, código, métricas. | 🟡 Média | P |
| M-028 | Implementar escala tipográfica como CSS custom properties | `globals.css` | Tailwind padrão (text-xs a text-3xl) | `--text-xs` (12px/16px), `--text-sm` (14px/20px), `--text-md` (16px/24px), `--text-lg` (20px/28px), `--text-xl` (24px/32px), `--text-2xl` (32px/40px), `--text-3xl` (48px/56px). Mapear para utilitários Tailwind. | 🟠 Alta | M |
| M-029 | Implementar tokens de peso tipográfico | `globals.css`, `tailwind.config.ts` | `font-light/regular/medium/semibold/bold` do Tailwind | `--weight-light` (300), `--weight-regular` (400), `--weight-medium` (500), `--weight-semibold` (600), `--weight-bold` (700). Regras: nunca bold em texto corrido, máx 2 pesos por tela. | 🟡 Média | P |

## Sistema Visual — Espaçamento

| ID | Nome | Componente | Estado atual | Estado desejado | Prioridade | Esforço |
|---|---|---|---|---|---|---|
| M-030 | Implementar sistema de espaçamento base 8px | `tailwind.config.ts` | Tailwind padrão base 4px | Custom spacing scale: space-0 (0), space-0.5 (4px), space-1 (8px), space-1.5 (12px), space-2 (16px), space-3 (24px), space-4 (32px), space-6 (48px), space-8 (64px), space-12 (96px), space-16 (128px). | 🟠 Alta | M |
| M-031 | Revisar padding/gap de todos os componentes | Todos os componentes | Usam gap-4, p-4, space-y-6 (escala 4px) | Substituir por valores da escala 8px. Ex: gap-2 → gap-space-2 (16px), p-4 → p-space-2 (16px). | 🟡 Média | G |

## Sistema Visual — Animações e Movimento

| ID | Nome | Componente | Estado atual | Estado desejado | Prioridade | Esforço |
|---|---|---|---|---|---|---|
| M-032 | Implementar 18 microinterações da tabela P24 | Globais (CSS + componentes) | 4 animações CSS + 2 tailwind | Implementar: IA aparece, empresário digita, empresário envia, IA recebe, IA começa a pensar, IA termina de pensar, nova pergunta, pergunta complexa, insight aparece, hipótese confirmada, hipótese corrigida, barra atualiza, lacuna identificada. Cada um com duração, easing, animação específica. | 🔴 Crítico | XG |
| M-033 | Implementar sistema de easing por estado cognitivo | `globals.css` ou lib | Apenas ease-out e ease-in-out | Orgânico `cubic-bezier(0.34,1.56,0.64,1)`, Mecânico `cubic-bezier(0.4,0,0.2,1)`, Natural `ease-out`, Dramático `cubic-bezier(0.16,1,0.3,1)`, Padrão `cubic-bezier(0.4,0,0.2,1)`. | 🟠 Alta | M |
| M-034 | Implementar stagger na entrada de cards e listas | Todos os grupos de cards/listas | Inexistente | Cards: 100ms entre itens. Linhas de lista: 50ms. Timeline: 100ms. Barras de conhecimento: 80ms. Máximo 500ms total. | 🟡 Média | M |
| M-035 | Implementar skeleton loading para todos os componentes | Todos os componentes | Inexistente | Skeleton correspondente ao layout real de cada componente: card, lista, gráfico, texto, botão. Shimmer fino. | 🟠 Alta | G |
| M-036 | Implementar fila de prioridade de animação | Engine de animação | Inexistente | 1. Erro/timeout > 2. Insight > 3. Confirmação > 4. Atualização painel > 5. Nova pergunta > 6. Atualização barra. Regras de inibição durante digitação. | 🟡 Média | G |

## Sistema Visual — Assinatura e Identidade

| ID | Nome | Componente | Estado atual | Estado desejado | Prioridade | Esforço |
|---|---|---|---|---|---|---|
| M-037 | Criar Anel de Confiança (assinatura primária) | Novo componente `anel-confianca` | Inexistente | Círculo com arco preenchido, cores (vermelho <40% → amarelo 40-70% → verde >70%), tamanhos 16/24/32px, transição 600ms, pulso suave. 3 instâncias: conversa (24px), dashboard (16px), painel cognitivo (32px). | 🔴 Crítico | G |
| M-038 | Implementar Glow de Insight (assinatura secundária) | `insight-card` ou novo | Inexistente | Glow radial crescendo do centro, pico 500ms, fade 2.5s, duração total 3s, opacidade máx 30%, cor primária clara. | 🟡 Média | M |
| M-039 | Implementar sistema de z-index hierarquizado | `globals.css` | Inexistente | Camadas: 0 (base), 1 (conteúdo), 2 (painéis), 3 (insight/modal), 4 (toast/notificação), 5 (crítico/erro). | 🟡 Média | P |
| M-040 | Aplicar border-radius conforme P28 | `globals.css`, todos os componentes | `--radius: 0.5rem` (8px) para tudo | `--radius-sm`: 4px (inputs, botões pequenos), `--radius-md`: 8px (cards, modais), `--radius-lg`: 12px (cards grandes), `--radius-xl`: 16px (modais grandes). | 🟡 Média | M |

## Cross-cutting — Qualidade e Consistência

| ID | Nome | Componente | Estado atual | Estado desejado | Prioridade | Esforço |
|---|---|---|---|---|---|---|
| M-041 | Adaptar dark mode para paleta P28 | `globals.css` | Dark mode shadcn/ui padrão | Dark mode derivado da paleta P28: fundo escuro profundo, superfícies escuras com a mesma hierarquia de cores. Contraste AAA mantido. | 🟡 Média | M |
| M-042 | Criar design tokens unificados (arquivo JSON/TS) | Novo `design-tokens.ts` | Tokens dispersos entre globals.css e tailwind.config.ts | Arquivo único com todas as cores, tipografia, espaçamento, border-radius, sombras, z-index, easing. Fonte única da verdade. | 🟠 Alta | M |
| M-043 | Substituir cores inline arbitrárias nos componentes | Todos os componentes | Cores inline: `text-emerald-500`, `bg-red-100`, `text-blue-500`, etc. | Substituir por tokens semânticos ou da paleta oficial. Nunca cores inline que não pertencem à paleta. Ex: verde semântico usa `--color-success`, não `text-emerald-500`. | 🟠 Alta | G |
| M-044 | Revisar densidade por contexto | Dashboard, Conversa, Listas | Densidade uniforme | Conversa: padding space-4+. Dashboard: padding space-2, line-height 1.4. Lista: padding space-1 a space-2. | 🟢 Baixa | M |
| M-045 | Implementar contraste mínimo AAA | Todos os textos | Sem verificação | Texto principal ≥ 7:1, texto secundário ≥ 4.5:1, badges ≥ 3:1. Verificar em light e dark mode. | 🟡 Média | M |

---

## Distribuição por Prioridade

| Prioridade | Itens | % |
|---|---|---|
| 🔴 Crítico | 8 (M-001, M-002, M-003, M-004, M-016, M-023, M-032, M-037) | 17.8% |
| 🟠 Alta | 17 (M-005, M-006, M-007, M-010, M-011, M-012, M-013, M-017, M-018, M-019, M-024, M-025, M-028, M-030, M-033, M-035, M-042, M-043) | 37.8% |
| 🟡 Média | 16 (M-008, M-009, M-014, M-015, M-020, M-026, M-027, M-029, M-031, M-034, M-036, M-038, M-039, M-040, M-041, M-045) | 35.6% |
| 🟢 Baixa | 4 (M-022, M-021, M-044, restante) | 8.9% |

## Estimativa de Esforço Total

- **P (≤4h):** 10 itens = ~40h
- **M (1-2d):** 20 itens = ~240h
- **G (3-5d):** 11 itens = ~330h
- **XG (>5d):** 4 itens = ~200h
- **Total estimado:** ~810h (~20 semanas para 1 designer/desenvolvedor full-time)

---

## Recomendação de Ordem de Execução

**Sprint 1-2: Fundação Visual**
M-023 (paleta P28) → M-042 (design tokens) → M-024 (paleta apoio) → M-025 (paleta semântica) → M-028 (escala tipográfica) → M-030 (espaçamento 8px)

**Sprint 3-4: Assinaturas**
M-037 (Anel de Confiança) → M-038 (Glow de Insight) → M-039 (z-index)

**Sprint 5-7: Dashboard**
M-001 (sidebar) → M-002 (layout) → M-003 (insight principal) → M-004 (hierarquia 3-10-30) → M-005 a M-010 (seções)

**Sprint 8-10: Assistente**
M-016 (avatar estados) → M-017 (respiração) → M-018 (Escrita Pensada) → M-019 (pipeline) → M-020 (iniciativa)

**Sprint 11-13: Microinterações**
M-032 (18 microinterações) → M-033 (easings) → M-034 (stagger) → M-035 (skeletons) → M-036 (fila)

**Sprint 14-15: Refinamento**
M-043 (cores inline) → M-040 (border radius) → M-044 (densidade) → M-045 (contraste) → M-041 (dark mode) → M-022 (ver mais)

---

*Backlog gerado em 27/07/2026. Baseado nas especificações P24, P28 e P29.*
