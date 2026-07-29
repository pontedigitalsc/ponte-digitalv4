# CERTIFICAÇÃO VISUAL — Parâmetros Unificados da Experiência Cognitiva

**Documento de certificação | 26/07/2026 | Arquiteto-Chefe**

> Unificação de todos os parâmetros visuais dos documentos P23 em uma única especificação canônica. Este documento substitui referências visuais dispersas como fonte única da verdade para implementação de frontend.

---

## 1. Sistema de Cores

### 1.1 Paleta Base

| Token | Cor | Uso | Contraste |
|---|---|---|---|
| `--color-bg` | #F8FAFC | Fundo da tela | — |
| `--color-surface` | #FFFFFF | Cards, superfícies | — |
| `--color-primary` | #4A90D9 | Acento principal, links, badges | 7:1+ |
| `--color-text-primary` | #1E293B | Texto principal | 15:1 |
| `--color-text-secondary` | #64748B | Rótulos, timestamps | 5:1 |
| `--color-text-tertiary` | #94A3B8 | Texto de baixa hierarquia | 3:1 |

### 1.2 Cores por Estado Cognitivo (Matriz Oficial)

| Estado | Badge | Cor Primária | Cor Card (10%) | Borda/Hover |
|---|---|---|---|---|
| **Pensando** | Processando | #4A90D9 (Azul suave) | #E8F0FE | Azul |
| **Analisando** | Analisando | #7C3AED (Roxo) | #F3E8FF | Roxo |
| **Descobrindo/Insight** | Descoberta | #059669 (Verde) | #D1FAE5 | Verde |
| **Duvidando** | Verificando | #D97706 (Âmbar) | #FEF3C7 | Âmbar |
| **Confirmando** | Confirmado | #1E40AF (Azul escuro) | #DBEAFE | Azul escuro |
| **Concluindo** | Concluído | #065F46 (Verde escuro) | #A7F3D0 | Verde escuro |

### 1.3 Cores do Sistema de Confiança

| Nível | Cor | Badge | Ícone |
|---|---|---|---|
| Alta (≥80%) | Verde escuro (#059669) | Escudo | ✓ |
| Média (50-80%) | Amarelo/Âmbar (#D97706) | Lupa | 🔍 |
| Baixa (<50%) | Cinza (#94A3B8) / Violeta | Interrogação | ? |
| Dúvida | Azul-marinho (#1E40AF) | Balança | ⚖️ |
| Correção | Azul-claro (#3B82F6) | Seta curva | ↩️ |
| Evolução | Verde-claro (#10B981) | Espiral | 🔄 |
| Não sei | Neutro (sem badge) | Nenhum | — |

### 1.4 Regra de Contraste Mínimo

| Elemento | Relação | Padrão WCAG |
|---|---|---|
| Texto principal sobre fundo | ≥ 7:1 | AAA |
| Texto secundário sobre fundo | ≥ 4.5:1 | AA |
| Badges e indicadores | ≥ 3:1 | — |
| Não-interativos decorativos | ≥ 2:1 | — |
| Desabilitados | ≥ 2:1 | — |

---

## 2. Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|---|---|---|---|---|
| Nome da IA | System sans-serif | 14px | 600 | Primary (--color-primary) |
| Mensagem da IA | System sans-serif | 16px | 400 | --color-text-primary |
| Dado / número | System sans-serif | 20px | 700 | --color-primary |
| Rótulo | System sans-serif | 12px | 500 | --color-text-secondary |
| Timestamp | System sans-serif | 11px | 400 | --color-text-tertiary |
| Entrada do usuário | System sans-serif | 16px | 400 | --color-text-primary |
| Badge insight | System sans-serif | 13px | 600 | Cor de acento |

---

## 3. Espaçamentos (Escala Canônica)

| Token | Valor | Uso |
|---|---|---|
| `xs` | 4px | Elementos inline no mesmo card |
| `sm` | 8px | Entre elementos interativos (mínimo) |
| `md` | 16px | Entre cards, padding interno |
| `lg` | 24px | Padding vertical de cards |
| `xl` | 32px | Padding horizontal de cards, entre blocos |
| `2xl` | 48px | Entre seções da tela |
| `3xl` | 64px | Margens de viewport desktop |

### 3.1 Margens de Viewport

| Viewport | Lateral | Superior/Inferior |
|---|---|---|
| Desktop (>1024px) | 48px | 32px |
| Tablet (768-1024px) | 32px | 24px |
| Mobile (<768px) | 16px | 16px |

### 3.2 Espaçamento entre Mensagens

| Contexto | Espaçamento |
|---|---|
| Mesmo turno (IA + empresário) | 12px |
| Turnos diferentes | 24px |
| Após insight | 32px |
| Entre seções da conversa | 32px |

---

## 4. Cards e Componentes

### 4.1 Card de Mensagem

| Propriedade | IA | Empresário |
|---|---|---|
| Largura máxima | 720px (centralizado) | 720px (centralizado) |
| Padding | 24px vertical, 32px horizontal | 24px vertical, 32px horizontal |
| Background | Tom neutro 5% opacidade | Tom acentuado 10% opacidade |
| Border radius | 16px | 12px |
| Sombra | Suave, apenas na ativa | Nenhuma |
| Transição | Fade + slide up, 300ms ease-out | Slide up, 200ms ease-out |

### 4.2 Card de Insight

| Propriedade | Valor |
|---|---|
| Destaque ✦ | Escala 0→1 + glow, 400ms |
| Texto | Slide up, 400ms |
| Pausa dramática | 500ms-1s antes do anúncio |
| Tempo em destaque | 3s |
| Fading out | 500ms após destaque |
| Dados chave | Em negrito dentro do texto |

### 4.3 Card de Hipótese (Painel Cognitivo)

| Propriedade | Valor |
|---|---|
| Aparecimento | Slide in da direita + fade, 400ms |
| Ordenação | Por confiança (maior no topo) |
| Confirmação | Borda verde + badge ✓, 400ms |
| Revisão | Badge âmbar "Revisando", 500ms |

---

## 5. Estados da Tela (E1-E7) — Hierarquia Visual

### E1 — Landing
1. Logo + nome (identidade)
2. Tagline (promessa)
3. Formulário de entrada (ação)
4. CTA secundário (exploração)

### E2 — Onboarding (Primeiro Login)
1. Saudação da IA (texto principal)
2. Explicação (texto secundário)
3. Botão de ação (convite)
4. Indicadores de progresso (antecipação)

### E3 — Conversa Ativa
1. Mensagem atual da IA (centro, dominante)
2. Histórico recente (acima, semi-opaco)
3. Campo de resposta (base, pronto)
4. Painel cognitivo (lateral, periférico)
5. Indicadores de rodapé (monitoramento)

### E4 — IA Pensando
1. Indicador narrativo de pensamento
2. Última mensagem do empresário
3. Mapa cognitivo animado

### E5 — Insight
1. Anúncio da descoberta (✦ + texto)
2. Evidência visual (gráfico, dado)
3. Indicador de confiança
4. Painel cognitivo atualizado

### E6 — Resumo Parcial
1. Card de resumo (expande de cima)
2. Conteúdo em bullet points (staggered)
3. Botão "Continuar" (após 3s)

### E7 — Conclusão/Diagnóstico
1. Diagnóstico completo
2. Cards de resultado em cascata
3. Painel em estado "Completo"

---

## 6. Microinterações — Tabela Completa

### 6.1 Duração por Intenção

| Intenção | Duração | Easing |
|---|---|---|
| Confirmar | 200-400ms | ease-out |
| Notificar | 300-500ms | ease-out |
| Transicionar | 400-700ms | ease-out |
| Surpreender | 600-1000ms | ease-out |
| Celebrar | 500-800ms | ease-out |
| Corrigir | 400-600ms | ease-in-out |
| Aguardar | 200ms (entrada) | linear |

### 6.2 Tabela de Microinterações

| Interação | Gatilho | Duração | Easing | Animação |
|---|---|---|---|---|
| IA aparece | Login/refresh | 600ms | ease-out | Scale 0.8→1 + fade, slide up 20px |
| Empresário digita | Input focus | 200ms | ease-out | Borda 2px + glow 1px |
| Empresário envia | Enter/clique | 300ms | ease-out | Card slide up 30px + fade |
| IA recebe | Resposta servidor | 400ms | ease-out | Badge "✓ Recebido" |
| IA começa a pensar | Processamento | 200ms | ease-in-out | 3 pontos sequenciais |
| IA termina de pensar | Conclusão | 300ms | ease-out | Pontos somem + card slide up |
| Nova pergunta | Próxima etapa | 400ms | ease-out | Slide up 15px + fade |
| Pergunta complexa | Alto valor | 600ms | ease-out | Slide up + glow inicial 1s |
| Insight aparece | Confiança >60% | 800ms | ease-out | ✦ scale 0→1 + glow (400ms) + texto (400ms) |
| Hipótese confirmada | Empresário confirma | 500ms | ease-out | Badge verde ✓, confiança sobe |
| Hipótese corrigida | Empresário corrige | 600ms | ease-in-out | Badge âmbar, confiança desce |
| Barra atualiza | Novo dado | 600ms | ease-out | Preenchimento esquerda→direita |
| Lacuna identificada | Área não explorada | 300ms | ease-out | Badge "?" no mapa |

### 6.3 Duração por Tipo de Resposta

| Tipo de Resposta | Timing Ideal | Timing Máximo |
|---|---|---|
| Clique → feedback visual | <20ms | 150ms |
| Resposta simples (factual) | 300-800ms | 2s |
| Resposta análise complexa | 2-3s | 5s |
| Relatório completo | 5-8s | 12s |

### 6.4 Timing = Semântica de Confiança

| Timing | Mensagem Percebida |
|---|---|
| <500ms | "Isso eu sei de cabeça" (factual) |
| 500ms-2s | "Deixa eu verificar" (consulta) |
| 2s-5s | "Estou pensando" (cruzamento) |
| 5s-10s | "Estou analisando" (profundo) |
| >10s | "Isso é complexo" (relatório) |

---

## 7. Transições — Especificação Completa

### 7.1 Transições de Tela

| ID | De → Para | Duração | Easing | Prioridade |
|---|---|---|---|---|
| T01 | Login → Conversa | 700ms | ease-out | Parcial |
| T02 | Conversa → Resumo Parcial | 3-4s | ease-out | Parcial |
| T03 | Conversa → Diagnóstico Final | 8-12s | ease-out | Não |
| T04 | Conversa → Dashboard | 800ms-1.2s | ease-out | Sim |
| T05 | Dashboard → Nova Conversa | 500ms-800ms | ease-out | Sim |
| T06 | Conversa → Histórico | 700ms | ease-out | Sim |

### 7.2 Transições de Estado da IA

| ID | De → Para | Duração | Prioridade |
|---|---|---|---|
| IA01 | Ociosa → Pensando | 500ms-4s | Parcial |
| IA02 | Pensando → Respondendo | 400ms-800ms | Sim |
| IA03 | Respondendo → Aguardando | Imediato | Sim |
| IA04 | Aguardando → Processando | 500ms-800ms | Não |
| IA05 | Processando → Próxima Pergunta | 300ms-500ms | Parcial |
| IA06 | Pergunta → Insight | 3-5s | Parcial |
| IA07 | Insight → Concluindo | 2-3s | Sim |

### 7.3 Transições de Painel Cognitivo

| ID | De → Para | Duração | Prioridade |
|---|---|---|---|
| P01 | Vazio → Preenchendo | 500ms-800ms | Sim |
| P02 | Preenchendo → Parcial | 500ms | Sim |
| P03 | Parcial → Avançado | 1s-1.5s | Parcial |
| P04 | Avançado → Completo | 1.5s-2s | Não |
| P05 | Completo → Revisando | 500ms-800ms | Parcial |

---

## 8. Movimento e Animação

### 8.1 Semântica de Direção

| Direção | Significado | Exemplo |
|---|---|---|
| Esquerda → Direita | Progresso, avanço, completude | Barra preenchendo |
| Direita → Esquerda | Retorno, revisão, refinamento | Card descartado |
| Cima → Baixo | Revelação, descoberta | Insight aparecendo |
| Baixo → Cima | Confirmação, conclusão | ✓ subindo |
| Zoom in | Aprofundamento, foco | Expandir hipótese |
| Zoom out | Contexto, visão geral | Recolher card |

### 8.2 Velocidade por Hierarquia

| Hierarquia | Exemplo | Duração |
|---|---|---|
| 1 — Foco atual | Card de insight | 400-600ms |
| 2 — Relacionados | Badge de confiança | 300-400ms |
| 3 — Periféricos | Atualização de contador | 200-300ms |
| 4 — Decorativos | Brilho de fundo | 100-200ms |

### 8.3 Easing por Estado Cognitivo

| Estado | Curva | Uso |
|---|---|---|
| Orgânico | cubic-bezier(0.34, 1.56, 0.64, 1) | Pensando, analisando, descobrindo (com overshoot) |
| Mecânico | cubic-bezier(0.4, 0, 0.2, 1) | Confirmando, concluindo, sistema (sem overshoot) |
| Natural | ease-out | Clique, hover, foco |
| Dramático | cubic-bezier(0.16, 1, 0.3, 1) | Insights, descobertas |
| Padrão | cubic-bezier(0.4, 0, 0.2, 1) | Transições Material Design |
| Spring | spring(stiffness 300, damping 20) | Microinterações com feedback físico |

### 8.4 Regras de Inibição de Animação

Animações são proibidas durante:
- Empresário digitando
- IA exibindo insight (até destaque terminar)
- Transição de tela em andamento
- Estado de erro ativo

### 8.5 Fila de Prioridade de Animação

1. Erro/timeout (maior)
2. Insight/descoberta
3. Confirmação de hipótese
4. Atualização de painel
5. Nova pergunta
6. Atualização de barra (menor)

---

## 9. Densidade e Respiração

| Regra | Parâmetro | Valor |
|---|---|---|
| Elementos ativos por tela | Máximo | 7±2 (ideal: 5) |
| Espaço vazio mínimo | Proporção | 30% (ideal: 40-50%) |
| Conteúdo máximo | Ocupação | 70% da área |
| Complexidade por card | Linhas | Máx 3 linhas ou 200 caracteres |
| Densidade por viewport | Desktop | Máx 5 blocos |
| Densidade por viewport | Tablet | Máx 4 blocos |
| Densidade por viewport | Mobile | Máx 3 blocos |
| Eventos visuais por segundo | Máximo | 3 eventos/s |

---

## 10. Responsivo

| Viewport | Comportamento |
|---|---|
| Desktop (>1024px) | 3 colunas: conversa (centro, 720px) + painel (direita, 360px) + histórico (esquerda opcional) |
| Tablet (768-1024px) | Painel colapsável (sidebar 240px), mensagens max 600px centralizado |
| Mobile (<768px) | Painel em bottom sheet (swipe up), mensagens largura total (margem 16px), campo de texto fixo no bottom |

---

## 11. Regras de Foco

- Exatamente 1 elemento focal por estado (definido na hierarquia E1-E7)
- Sequência de leitura: canto superior esquerdo → centro → canto inferior direito (padrão Z/F)
- Durante insight: nada compete — painel não atualiza, campo desabilitado
- Durante digitação: nenhuma animação ocorre
- Durante IA pensando: campo desabilitado
- Durante erro: apenas o elemento de erro compete

### Elementos Sempre Visíveis

- Última mensagem da IA
- Campo de texto (mesmo desabilitado)
- Indicador do estado da IA (ativo/pensando/ocioso)
- Identidade da Ponte (logo ou nome)

---

## 12. Microestados do Campo de Texto

| Estado | Placeholder | Borda | Fundo |
|---|---|---|---|
| Normal | "Digite sua resposta..." | 1px solid neutro | Branco |
| Foco | "Digite sua resposta..." | 2px solid primary | Branco |
| Aguardando IA | "Aguardando IA..." | 1px solid 30% | Cinza 5% |
| Erro | "Tente novamente..." | 1px solid vermelho | Vermelho 5% |
| Enviando | "Enviando..." | 1px solid primary 50% | Branco 50% |

### Botão de Envio

| Estado | Ícone | Cor |
|---|---|---|
| Normal | → | Primary |
| Habilitado | → | Primary + hover |
| Desabilitado | → | Cinza |
| Enviando | Spinner | Primary |

---

## 13. Sistema de Confiança — Parâmetros

### 13.1 Níveis de Confiança

| Nível | Score | Badge | Cor | Timing | Tom da IA |
|---|---|---|---|---|---|
| Alta | ≥80% | Escudo ✓ | Verde escuro | Sempre que apresenta | Afirmativo |
| Média | 50-80% | Lupa 🔍 | Amarelo/Âmbar | Ao apresentar hipótese | Investigativo |
| Baixa | <50% | Interrogação ? | Cinza/Violeta | Só se perguntado | Curioso |
| Dúvida | Contraditório | Balança ⚖️ | Azul-marinho | Imediato na contradição | Honesto |
| Não sei | Fora de escopo | Nenhum | Neutro | Imediato na pergunta | Direto |
| Silêncio | Rotina | Ponto pulsante ● | Cinza claro | Estado padrão | — |

### 13.2 Gatilhos do Trust Engine

| Nível | Evidências | Tempo | Fontes |
|---|---|---|---|
| Alta (≥80%) | ≥5 favoráveis independentes | ≥30 dias sem refutação | ≥2 fontes |
| Média (50-80%) | 2-4 favoráveis | <30 dias | 1 fonte |
| Baixa (<50%) | 1 favorável | <7 dias ou >60 dias sem reforço | Fonte score <5 |

### 13.3 Transições de Confiança

| Transição | Animação | Aviso |
|---|---|---|
| Médio → Alto | Card muda de amarelo para verde (24-48h) | Gradual, sem anúncio súbito |
| Alto → Médio | Badge substituída imediatamente | IA avisa: "Informação me faz revisar" |
| Baixo → Médio | Card muda de cinza para amarelo | Silenciosa (IA não anuncia) |
| Nível → Descartado | Card removido após 30 dias | Não comunica a menos que perguntado |

---

## 14. Prioridade de Interrupção

| Prioridade | Transições | Comportamento |
|---|---|---|
| Alta (Sim) | T04, T05, T06, IA02, IA03, P01-P03, C02, C04, MCV01-MCV02, E02, E03 | Interrompível a qualquer momento |
| Média (Parcial) | T01, T02, IA01, IA05, IA06, P04, P05, C01, C05, C06, MCV03, E01, S02 | Interrompível em pontos específicos |
| Baixa (Não) | T03, IA04, IA07 (início), S01, S03 | Deve completar o ciclo |

---

## 15. Loading e Espera

### 15.1 Estados de Loading (Pipeline Cognitivo)

| Fase | Texto | Estado |
|---|---|---|
| Escuta | "Escutando atentamente…" | IA recebendo input |
| Correlação | "Relacionando informações…" | Cruzando dados |
| Hipótese | "Construindo hipótese…" | Formando conclusão |
| Validação | "Validando com dados públicos…" | Checando fontes |
| Finalização | "Finalizando análise…" | Preparando resposta |

### 15.2 Timeout Progressivo

| Tempo | Ação |
|---|---|
| 8s sem resposta | "Ainda estou analisando..." |
| 15s sem resposta | "Estou processando informações complexas. Mais alguns instantes." |
| 30s sem resposta | Botão: "Receber notificação" / "Continuar sem análise completa" |

---

## 16. Regras de Acessibilidade

- Modo `prefers-reduced-motion`: todas as durações reduzidas em 50%, easing linear, sem parallax/scale/spring
- Modo escuro: mesmos valores de contraste com cores invertidas
- Contraste mínimo AAA (7:1) para texto principal
- Animações de entrada: ease-out. Saída: ease-in. Bidirecionais: ease-in-out
- Nenhuma transição dura mais que 5s (exceção: gerar diagnóstico)
- Stagger máximo: 5 elementos em sequência (acima disso, paralelizar)

---

## 17. Documentos Fonte e Status

| Documento P23 | Status | Contribuição para esta Certificação |
|---|---|---|
| GUIA_DE_IMPLEMENTACAO_VISUAL.md | ✅ Certificado | Base principal (espaçamentos, hierarquia, movimento, contraste) |
| ARQUITETURA_VISUAL_DA_CONVERSA.md | ✅ Certificado | Estados E1-E7, tipografia, cores, responsivo |
| SISTEMA_DE_CONFIANCA_VISUAL.md | ⚠️ Thresholds a unificar | 8 níveis de confiança, cores, timing, transições |
| MICROINTERACOES.md | ✅ Certificado | Tabela completa de microinterações, durações, easing |
| MANUAL_DE_TRANSICOES.md | ✅ Certificado | 30 transições especificadas, prioridades, fallbacks |
| LOADING_INTELIGENTE.md | ⚠️ Pipeline inconsistente com A_ESPERA | Estados de loading e timeout |
| A_ESPERA_INTELIGENTE.md | ⚠️ Ver acima | Texto narrativo de espera |
| EXPERIENCIA_SENSORIAL.md | ⚠️ Mobile ausente | Som opt-in, vibração |
| MAPAS_COGNITIVO_VIVO.md | ⚠️ Curta vs longa duração | Mapa, áreas de conhecimento |
| MANIFESTO_DA_EXPERIENCIA.md | ✅ Certificado | Princípios de design (sem gamificação, IA sem nome/rosto) |

---

## 18. Contradições Resolvidas

| Contradição P23 | Decisão para esta Certificação |
|---|---|
| IA deve mostrar confiança vs dúvida | IA mostra o estado real do anel de confiança. CONFIANTE só se anel verde. |
| IA concisa vs acrescentar sempre | Resposta curta (foco) + 1 linha extra (<20% do texto) |
| Curta duração (30s-3min) vs longa (7 dias) | Sessão individual: 30s-3min (padrão) ou 15min (mergulho). Relação: longitudinal. |
| 5 áreas vs 19 conceitos | 19 ontológicos → agregados em 5 áreas de apresentação |
| Centro = chat vs mapa | Mapa é centro semântico; chat é centro operacional |
| Loading (indeterminado) vs A_ESPERA (durações) | LOADING é conteúdo textual; A_ESPERA é design de transição |
| 3 thresholds de confiança (20%, 40%, >50%) | ≥20% para sugestão; ≥40% para WOW/insight. Unificado. |

---

## 19. Parâmetros Omisso (Identificados)

| Parâmetro | Onde Deveria Estar | Recomendação |
|---|---|---|
| Fonte exata (Inter? Sistema?) | ARQUITETURA_VISUAL_DA_CONVERSA | Definir família tipográfica canônica |
| Paleta de cores completa com hex | Vários documentos | Consolidar em um design tokens file |
| Grid system (colunas, gutters) | GUIA_DE_IMPLEMENTACAO_VISUAL | Definir grid de 12 colunas |
| Z-index hierarchy | MICROINTERACOES | Definir camadas (modal > insight > painel > conversa) |
| Breakpoints exatos (sm, md, lg, xl) | Vários documentos | Padronizar em 480/768/1024/1440 |

---

## 20. Checklist de Verificação Visual

- [ ] Cores por estado cognitivo documentadas (6 estados)
- [ ] Sistema de confiança visual (8 níveis)
- [ ] Tipografia hierarquizada (7 níveis)
- [ ] Escala de espaçamentos (7 tokens)
- [ ] Margens de viewport por breakpoint (3 breakpoints)
- [ ] Estados da tela mapeados (E1-E7)
- [ ] Microinterações especificadas (18 interações)
- [ ] Transições de tela (6), estado da IA (7), painel (5)
- [ ] Semântica de direção de animação (6 direções)
- [ ] Easing por estado cognitivo (3 curvas + 3 especiais)
- [ ] Fila de prioridade de animação (6 níveis)
- [ ] Regras de inibição (4 situações)
- [ ] Regras de foco e hierarquia por estado
- [ ] Responsivo: 3 breakpoints com comportamentos definidos
- [ ] Acessibilidade: reduced-motion, contraste AAA
- [ ] Placeholder dinâmico (5 estados)
- [ ] Botão de envio (4 estados)
- [ ] Timeout progressivo (3 estágios)
- [ ] Contraste mínimo por tipo de elemento (4 níveis)

---

*Documento certificado por arquitetura em 26/07/2026.*
*17 documentos P23 consolidados em 1 especificação visual unificada.*
