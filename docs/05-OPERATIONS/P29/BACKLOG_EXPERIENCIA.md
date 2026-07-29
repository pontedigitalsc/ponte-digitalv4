# Backlog de Materialização — Camada de Experiência

## Propósito

Listar todos os itens especificados na documentação P23 que precisam ser criados, corrigidos ou alinhados entre documentação e código na camada de Experiência (Landing, Diagnóstico, Assistente, Microinterações, Estados, Mapa Cognitivo, Transições).

---

## Legenda

| Sigla | Significado |
|---|---|
| AUS | Especificado na P23, ausente no código |
| DIV | Existe no código mas diverge da especificação |
| SIM | Implementado conforme especificação |
| PRI | Prioridade (Crítico/Alta/Média/Baixa) |
| ESF | Esforço estimado em pontos (1-13) |

---

## BACKLOG

### LANDING

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-001 | Tagline "A inteligência da sua empresa"    | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E1   | Alta | 2   | src/app/page.tsx
M-XP-002 | Logo + nome "Ponte Digital" lado a lado     | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E1   | Alta | 2   | src/app/page.tsx
M-XP-003 | Campo de email e senha na landing           | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E1   | Alta | 5   | src/app/page.tsx
M-XP-004 | Botão de login (Entrar)                      | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E1   | Alta | 1   | src/app/page.tsx
M-XP-005 | CTA secundário "Primeira vez? Conhecer"      | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E1   | Alta | 2   | src/app/page.tsx
M-XP-006 | Footer minimalista                            | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E1   | Média| 1   | src/app/page.tsx
M-XP-007 | Fundo escuro ou muito claro + acento primary  | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E1   | Média| 2   | src/app/page.tsx, globals.css
M-XP-008 | Tom emocional: segurança, seriedade           | DIV    | EXPERIENCIA_COGNITIVA.md §Fase 0        | Alta | 3   | src/app/page.tsx (cópia + tagline + CTAs)
M-XP-009 | Zero referência a chat/chatbot na landing     | DIV    | EXPERIENCIA_COGNITIVA.md §Fase 0        | Média| 1   | src/app/page.tsx
```

### DIAGNÓSTICO — SAUDAÇÃO E ABERTURA

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-010 | Saudação "Bem-vindo. Vou conhecer sua empresa" | AUS   | EXPERIENCIA_COGNITIVA.md §Fase 1        | Alta | 3   | src/app/conversa/page.tsx, src/components/conversa/
M-XP-011 | Variações de saudação (primeiro vs retorno)   | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 1        | Alta | 5   | src/app/conversa/page.tsx, src/engine/conversation-engine.ts
M-XP-012 | Texto datilografado (typewriter effect)       | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 1        | Média| 5   | src/components/conversa/typewriter.tsx (novo), globals.css
M-XP-013 | Saudação com fade + slide up 400ms            | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 1        | Média| 2   | src/components/conversa/saudacao-card.tsx (novo)
M-XP-014 | Atraso de 200ms antes da primeira pergunta    | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 1        | Alta | 1   | src/app/conversa/page.tsx
```

### DIAGNÓSTICO — FLUXO COGNITIVO

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-015 | Reações adaptativas ao conteúdo da resposta  | DIV    | EXPERIENCIA_COGNITIVA.md §Fase 3        | Alta | 8   | src/engine/reacoes.ts, src/engine/conversation-engine.ts
M-XP-016 | Variação: resposta esperada/inesperada/vaga  | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 3        | Alta | 5   | src/engine/reacoes.ts
M-XP-017 | Primeira hipótese com confiança > 25%         | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 4        | Alta | 8   | src/engine/conversation-engine.ts, src/engine/evidence-engine.ts
M-XP-018 | Card de hipótese no fluxo da conversa         | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 4        | Alta | 5   | src/components/conversa/hipotese-card.tsx (novo)
M-XP-019 | Perguntas confrontadoras (confiança > 50%)    | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 5        | Média| 5   | src/engine/fluxos/primeira-conversa.ts
M-XP-020 | Perguntas conectivas (com dados suficientes)  | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 5        | Média| 5   | src/engine/fluxos/primeira-conversa.ts
M-XP-021 | Recuo se empresário resiste a pergunta        | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 5        | Alta | 5   | src/engine/conversation-engine.ts
M-XP-022 | Insight durante conversa (✦ + destaque)       | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 6        | Alta | 8   | src/components/conversa/, src/engine/
M-XP-023 | Confirmação/contestação de insight            | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 6        | Média| 5   | src/app/conversa/page.tsx
M-XP-024 | Correção de hipótese com nova informação      | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 8        | Média| 8   | src/engine/conversation-engine.ts
M-XP-025 | Resumo parcial a cada 5 perguntas             | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 9        | Alta | 8   | src/app/conversa/page.tsx, src/components/conversa/resumo-card.tsx (novo)
M-XP-026 | Botão "Continuar" após 3s no resumo           | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 9        | Média| 3   | src/components/conversa/resumo-card.tsx (novo)
M-XP-027 | Fechamento com cobertura > 80% ou confiança > 75% | AUS | EXPERIENCIA_COGNITIVA.md §Fase 10      | Alta | 5   | src/engine/conversation-engine.ts
M-XP-028 | Recomendações no fechamento                   | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 10       | Média| 5   | src/components/conversa/revelacao-card.tsx
M-XP-029 | Botão "Ver dashboard completo" no diagnóstico  | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E7   | Média| 2   | src/components/conversa/revelacao-card.tsx
M-XP-030 | Botão "Agendar revisão" no diagnóstico        | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E7   | Média| 2   | src/components/conversa/revelacao-card.tsx
```

### MAPA COGNITIVO

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-031 | Mapa cognitivo vivo (painel lateral)         | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E2-7 | Críti| 13  | src/components/conversa/cognitive-map.tsx (novo)
M-XP-032 | Áreas de cobertura preenchendo no mapa       | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E2   | Críti| 8   | src/components/conversa/cognitive-map.tsx (novo)
M-XP-033 | Indicador de confiança no painel             | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E3   | Críti| 5   | src/components/conversa/confidence-indicator.tsx (novo)
M-XP-034 | Contador de insights no painel               | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E3   | Alta | 3   | src/components/conversa/cognitive-map.tsx (novo)
M-XP-035 | Contador de lacunas no painel                | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E3   | Alta | 3   | src/components/conversa/cognitive-map.tsx (novo)
M-XP-036 | Cards de hipótese no mapa cognitivo          | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 4        | Alta | 5   | src/components/conversa/cognitive-map.tsx (novo)
M-XP-037 | Conexões visuais entre dados no mapa         | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 4        | Média| 8   | src/components/conversa/cognitive-map.tsx (novo)
M-XP-038 | Animação de busca no mapa (pensando)         | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E4   | Alta | 5   | src/components/conversa/cognitive-map.tsx (novo)
M-XP-039 | Painel cognitivo em estado de conclusão      | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 10       | Média| 3   | src/components/conversa/cognitive-map.tsx (novo)
```

### ESTADOS COGNITIVOS

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-040 | Estado "pensando" com indicador visual       | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E4   | Críti| 5   | src/components/conversa/thinking-indicator.tsx (novo)
M-XP-041 | Texto dinâmico no pensamento ("Relacionando...") | AUS | ARQUITETURA_VISUAL_DA_CONVERSA.md §E4  | Críti| 3   | src/components/conversa/thinking-indicator.tsx (novo)
M-XP-042 | 3 pontos pulsando com delay progressivo      | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E4   | Alta | 3   | src/components/conversa/thinking-indicator.tsx (novo)
M-XP-043 | Estado "analisando" (roxo + badge)           | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Tabela Cores | Alta | 3 | src/components/conversa/, globals.css
M-XP-044 | Estado "descobrindo" (verde + badge)         | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Tabela Cores | Alta | 3 | src/components/conversa/, globals.css
M-XP-045 | Estado "duvidando" (âmbar + badge)           | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Tabela Cores | Média| 3 | src/components/conversa/, globals.css
M-XP-046 | Estado "confirmando" (azul escuro + badge)   | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Tabela Cores | Média| 3 | src/components/conversa/, globals.css
M-XP-047 | Estado "concluindo" (verde escuro + badge)   | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Tabela Cores | Média| 3 | src/components/conversa/, globals.css
M-XP-048 | Badges por estado (Processando, Analisando...) | AUS  | ARQUITETURA_VISUAL_DA_CONVERSA.md §Tabela Cores | Alta | 3 | src/components/conversa/state-badge.tsx (novo)
```

### CARDS E MENSAGENS

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-049 | Card de mensagem: largura 720px centralizado | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Card | Média| 2   | src/components/conversa/question-card.tsx
M-XP-050 | Card de mensagem: padding 24x32px            | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Card | Média| 1   | src/components/conversa/question-card.tsx
M-XP-051 | Card IA: border-radius 16px                  | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Card | Média| 1   | src/components/conversa/question-card.tsx
M-XP-052 | Card empresário: border-radius 12px          | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Card | Média| 1   | src/components/conversa/question-card.tsx
M-XP-053 | Card IA: bg neutro 5% opacidade              | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Card | Média| 1   | src/components/conversa/question-card.tsx
M-XP-054 | Card empresário: bg acentuado 10% opacidade  | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Card | Média| 1   | src/components/conversa/question-card.tsx
M-XP-055 | Transição card: fade + slide up 300ms        | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Card | Média| 3   | src/components/conversa/, globals.css
M-XP-056 | Mensagens antigas: opacidade 70%→40%→20%     | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E3   | Média| 3   | src/components/conversa/question-card.tsx
M-XP-057 | Crescimento do resumo de dados               | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E5   | Média| 1   | src/components/conversa/question-card.tsx
```

### TIMING E TRANSIÇÕES

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-058 | Pausa após pergunta: 1-2s                   | AUS    | EXPERIENCIA_COGNITIVA.md §Pausas        | Alta | 3   | src/app/conversa/page.tsx
M-XP-059 | Pausa após resposta: 500ms                  | DIV    | EXPERIENCIA_COGNITIVA.md §Pausas        | Alta | 2   | src/app/conversa/page.tsx
M-XP-060 | Pausa antes de insight: 1-2s                | AUS    | EXPERIENCIA_COGNITIVA.md §Pausas        | Alta | 3   | src/app/conversa/page.tsx
M-XP-061 | Pausa em silêncio: 5s                       | AUS    | EXPERIENCIA_COGNITIVA.md §Pausas        | Alta | 5   | src/app/conversa/page.tsx, src/hooks/use-silence-detection.ts (novo)
M-XP-062 | Duração máxima sem resposta: 8s             | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E4   | Alta | 5   | src/app/conversa/page.tsx
M-XP-063 | Tempo resposta varia com complexidade       | AUS    | EXPERIENCIA_COGNITIVA.md §Velocidade    | Alta | 5   | src/engine/conversation-engine.ts
M-XP-064 | Cadência adaptativa ao ritmo empresário     | AUS    | EXPERIENCIA_COGNITIVA.md §Cadência      | Alta | 8   | src/engine/conversation-engine.ts
M-XP-065 | Transição login→conversa: 600ms fade+scale  | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Transições | Média | 3 | src/app/conversa/page.tsx
M-XP-066 | Transição pergunta→resposta: 300-800ms      | DIV    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Transições | Média | 3 | src/app/conversa/page.tsx
M-XP-067 | Transição pensando→insight: 500ms           | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Transições | Alta | 5 | src/app/conversa/page.tsx
M-XP-068 | Transição confiança: 600ms preenchimento    | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Transições | Média | 3 | src/components/conversa/confidence-indicator.tsx (novo)
```

### MICROINTERAÇÕES DO ASSISTENTE

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-069 | Indicador "ouvindo" durante digitação       | AUS    | EXPERIENCIA_COGNITIVA.md §Estados       | Média| 3   | src/components/assistente/chat.tsx
M-XP-070 | Avatar IA com nome e personalidade          | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §E3   | Média| 5   | src/components/assistente/chat-message.tsx
M-XP-071 | Silêncio produtivo: IA intervém após 5s     | AUS    | EXPERIENCIA_COGNITIVA.md §Pausas        | Média| 5   | src/components/assistente/chat.tsx
M-XP-072 | Badge "Recebido" nas mensagens              | AUS    | EXPERIENCIA_COGNITIVA.md §Mensagem Rec. | Média| 2   | src/components/assistente/chat-message.tsx
M-XP-073 | Badge "Enviando..." com animação de pulso   | AUS    | EXPERIENCIA_COGNITIVA.md §Mensagem Env. | Média| 3   | src/components/assistente/chat-message.tsx
M-XP-074 | Mensagem vazia: opacidade 70% enquanto envia | AUS   | EXPERIENCIA_COGNITIVA.md §Mensagem Env. | Média| 2   | src/components/assistente/chat-message.tsx
M-XP-075 | Foco automático no campo após resposta      | SIM    | —                                       | —    | —   | src/components/assistente/chat.tsx (linha 232)
```

### CONFIABILIDADE

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-076 | IA admite ignorância ("não sei")            | AUS    | EXPERIENCIA_COGNITIVA.md §Princípios    | Média| 3   | src/engine/
M-XP-077 | IA revisa e corrige hipótese                | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 8        | Média| 8   | src/engine/
M-XP-078 | "Revisando" badge + hipótese marcada        | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 8        | Média| 5   | src/components/conversa/
M-XP-079 | Histórico de versões de hipótese            | AUS    | EXPERIENCIA_COGNITIVA.md §Fase 8        | Baixa| 5   | src/engine/
```

### RESPONSIVO

```
ID       | Nome                                       | Status | Documento de Origem                     | PRI  | ESF | Arquivos envolvidos
---------+---------------------------------------------+--------+-----------------------------------------+------+-----+---------------------------------------------------
M-XP-080 | Painel cognitivo colapsa em bottom sheet    | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Resp | Baixa| 8   | src/components/conversa/cognitive-map.tsx (novo)
M-XP-081 | Mobile: indicadores topo compactos          | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Resp | Baixa| 3   | src/components/conversa/
M-XP-082 | Desktop: layout 3 colunas                   | AUS    | ARQUITETURA_VISUAL_DA_CONVERSA.md §Resp | Baixa| 13  | src/app/conversa/page.tsx
```

---

## SUMÁRIO

| Categoria | Total Itens | Ausentes | Divergentes | Implementados |
|---|---|---|---|---|
| Landing | 9 | 7 | 2 | 0 |
| Saudação/Abertura | 5 | 5 | 0 | 0 |
| Fluxo Cognitivo | 16 | 15 | 1 | 0 |
| Mapa Cognitivo | 9 | 9 | 0 | 0 |
| Estados Cognitivos | 9 | 9 | 0 | 0 |
| Cards e Mensagens | 9 | 5 | 4 | 0 |
| Timing e Transições | 11 | 9 | 2 | 0 |
| Microinterações Assistente | 7 | 6 | 0 | 1 |
| Confiabilidade | 4 | 4 | 0 | 0 |
| Responsivo | 3 | 3 | 0 | 0 |
| **Total** | **82** | **72** | **9** | **1** |

**Distribuição por Prioridade:**

| Prioridade | Quantidade |
|---|---|
| Crítico | 6 |
| Alta | 30 |
| Média | 37 |
| Baixa | 9 |

---

## RECOMENDAÇÃO DE EXECUÇÃO

### Fase 1 — Fundação Cognitiva (Sprint atual, 6 itens críticos)
1. M-XP-031: Mapa cognitivo vivo — o patrimônio visual central
2. M-XP-032: Áreas de cobertura preenchendo
3. M-XP-033: Indicador de confiança
4. M-XP-040: Estado "pensando" com indicador visual
5. M-XP-041: Texto dinâmico no pensamento

### Fase 2 — Corpo da Conversa (Próxima sprint, ~15 itens alta)
- M-XP-001 a 005: Landing revisada
- M-XP-010, 014: Saudação + abertura
- M-XP-015, 016: Reações adaptativas
- M-XP-025, 027: Resumo parcial + fechamento
- M-XP-058, 059, 061: Timing e pausas

### Fase 3 — Profundidade (Sprints seguintes)
- M-XP-017, 018: Hipóteses
- M-XP-022, 023: Insights durante conversa
- M-XP-042 a 048: Estados cognitivos completos
- M-XP-043, 044: Cores por estado
- M-XP-069, 070: Personalidade do assistente

### Fase 4 — Polimento (Backlog contínuo)
- Demais itens de média e baixa prioridade
- Responsivo
- Confiabilidade
- Consistência visual fina
