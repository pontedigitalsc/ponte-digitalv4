# LISTA DE SIMPLIFICAÇÕES — P33

## 1. Componentes Eliminados (Código Morto)

### Diretório `components/cognitive/` — 32 arquivos deletados

| Arquivo | Motivo | Impacto |
|---------|--------|---------|
| `adaptive-capacity-card.tsx` | Zero imports | Nenhum |
| `before-after-card.tsx` | Zero imports | Nenhum |
| `capability-radar-card.tsx` | Zero imports | Nenhum |
| `cognitive-capital-card.tsx` | Zero imports + jargão | Nenhum |
| `cognitive-celebrations-card.tsx` | Zero imports + jargão | Nenhum |
| `cognitive-communication-card.tsx` | Zero imports + jargão | Nenhum |
| `cognitive-heatmap-card.tsx` | Zero imports + jargão | Nenhum |
| `cognitive-memory-card.tsx` | Zero imports + jargão | Nenhum |
| `company-mirror-card.tsx` | Zero imports | Nenhum |
| `confidence-drift-card.tsx` | Zero imports + jargão | Nenhum |
| `decision-cycle-card.tsx` | Zero imports | Nenhum |
| `evolution-card.tsx` | Zero imports | Nenhum |
| `evolution-curve-card.tsx` | Zero imports | Nenhum |
| `executive-narrative-card.tsx` | Zero imports | Nenhum |
| `explicavel-decisao-card.tsx` | Zero imports | Nenhum |
| `founder-panel-card.tsx` | Zero imports | Nenhum |
| `growth-opportunities-card.tsx` | Zero imports | Nenhum |
| `knowledge-aging-card.tsx` | Zero imports | Nenhum |
| `knowledge-generated-panel.tsx` | Zero imports | Nenhum |
| `knowledge-timeline-card.tsx` | Zero imports | Nenhum |
| `living-portrait-card.tsx` | Zero imports | Nenhum |
| `maturity-card.tsx` | Zero imports | Nenhum |
| `memory-shift-card.tsx` | Zero imports | Nenhum |
| `milestone-card.tsx` | Zero imports | Nenhum |
| `monthly-summary-card.tsx` | Zero imports | Nenhum |
| `next-level-card.tsx` | Zero imports | Nenhum |
| `patrimony-cognitivo-card.tsx` | Zero imports | Nenhum |
| `proactive-alert-card.tsx` | Zero imports | Nenhum |
| `strategic-memory-card.tsx` | Zero imports | Nenhum |
| `strategic-room-card.tsx` | Zero imports | Nenhum |
| `temporal-comparison-card.tsx` | Zero imports | Nenhum |
| `transformation-summary-card.tsx` | Zero imports | Nenhum |

### Outros Arquivos Mortos

| Arquivo | Motivo | Impacto |
|---------|--------|---------|
| `components/shared/priority-card.tsx` | Zero imports | Nenhum |
| `components/layout/page-transition.tsx` | Zero imports | Nenhum |
| `services/historico-sinal.service.ts` | Zero imports | Nenhum |

## 2. Componentes Renomeados (Eliminação de Jargão)

| Nome Antigo | Novo Nome | Motivo |
|------------|-----------|--------|
| `cognitive/confidence-ring.tsx` → `AnelConfianca` | Mantido no mesmo arquivo, export renomeado | "Confidence" é jargão inglês |
| `cognitive/briefing-card.tsx` → `BriefingCard` | Movido para `centro-cognitivo/` | Padronização de diretório |
| `cognitive/notification-card.tsx` → `NotificacaoCard` | Export renomeado | "Notification" é inglês |
| `cognitive/health-score-card.tsx` → `IndiceSaudeCard` | Export e arquivo renomeados | "Health Score" é jargão técnico |
| `ui/avatar.tsx` → `CognitiveAvatar` → `AvatarPonte` | Export renomeado | "Cognitive" é jargão interno |

## 3. Jargão Técnico Eliminado da Interface

| Termo Original | Substituído Por | Local |
|---------------|----------------|-------|
| "ConfidenceRing" | "AnelConfianca" | conversa/page.tsx, revelacao-card.tsx |
| "CognitiveAvatar" | "AvatarPonte" | conversa/page.tsx, revelacao-card.tsx, avatar.tsx |
| "HealthScore" | "IndiceSaude" | assistente/page.tsx |
| "ScoreBar" | "BarraIndice" | centro-decisao/page.tsx |
| "trustScore" | "confiancaFonte" | centro-decisao/page.tsx |
| "Assistente IA" | "Assistente" | assistente/page.tsx (metadata) |
| "Construindo hipótese..." | "Montando retrato da empresa..." | conversa/page.tsx |
| "Calculando nível de confiança..." | "Verificando consistência..." | conversa/page.tsx |
| "Detectando oportunidades..." | "Identificando oportunidades..." | conversa/page.tsx |
| "Capital Cognitivo" | "patrimônio de conhecimento" | dashboard/page.tsx |

## 4. Páginas Ocultadas (Modo Founder)

| Página | Rota | Ação |
|--------|------|------|
| CRM | `/crm` | 🔒 Rota existe mas sem link na navegação Founder |
| Financeiro | `/financeiro` | 🔒 Rota existe mas sem link na navegação Founder |
| Clientes | `/clientes` | 🔒 Rota existe mas sem link na navegação Founder |
| Tarefas | `/tarefas` | 🔒 Rota existe mas sem link na navegação Founder |
| Implantações | `/implantacoes` | 🔒 Rota existe mas sem link na navegação Founder |

## 5. Métricas de Simplificação

| Métrica | Antes P33 | Depois P33 | Redução |
|---------|----------|-----------|---------|
| Componentes em `cognitive/` | 36 | 4 | 89% |
| Termos técnicos na UI | 15+ | 0 | 100% |
| Páginas com aparência ERP | 5 | 0 (ocultadas) | 100% |
| Arquivos mortos | 35 | 0 | 100% |
| Código morto (estimativa linhas) | ~8.000 | 0 | 100% |
