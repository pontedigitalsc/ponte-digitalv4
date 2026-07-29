# Manual de Transições

> **Programa 23 | Certificação de Experiência | Documento 2 de 3**
>
> Toda mudança de estado na Ponte Digital deve ter entrada, transição, estado, saída, tempo, prioridade, interrupções, fallback e continuidade especificados. Este manual mapeia TODAS as transições do sistema — cada uma com especificação completa.

---

## Sumário

1. [Convenções e Legenda](#1-convenções-e-legenda)
2. [Transições de Tela](#2-transições-de-tela)
3. [Transições de Estado da IA](#3-transições-de-estado-da-ia)
4. [Transições de Painel Cognitivo](#4-transições-de-painel-cognitivo)
5. [Transições de Conversa](#5-transições-de-conversa)
6. [Transições do Mapa Cognitivo Vivo](#6-transições-do-mapa-cognitivo-vivo)
7. [Transições de Erro](#7-transições-de-erro)
8. [Transições de Sessão](#8-transições-de-sessão)
9. [Matriz de Prioridade e Interrupção](#9-matriz-de-prioridade-e-interrupção)
10. [Regras Globais de Transição](#10-regras-globais-de-transição)

---

## 1. Convenções e Legenda

### 1.1 Estrutura de cada transição

Toda transição neste manual segue esta estrutura:

```
## T[Número] — Nome da Transição

Entrada:      O que dispara a transição (gatilho exato)
Transição:    Como ocorre visualmente (animação, duração, easing)
Estado:       Como fica o estado final
Saída:        Como se sai desse estado (próximo gatilho)
Tempo mínimo: Duração mínima aceitável
Tempo ideal:  Duração alvo
Tempo máximo: Duração máxima tolerável
Prioridade:   Se pode ser interrompida (Sim/Não/Parcial)
Interrupções: O que pode interromper esta transição
Fallback:     O que acontece se falhar
Continuidade: Como o próximo estado se conecta
```

### 1.2 Legenda de easing

| Easing | Uso |
|---|---|
| `ease-out` | Entradas — suaviza o final |
| `ease-in` | Saídas — suaviza o início |
| `ease-in-out` | Transições bidirecionais |
| `linear` | Movimentos contínuos (loading, progresso) |
| `cubic-bezier(0.16, 1, 0.3, 1)` | Entradas dramáticas (insights) |
| `cubic-bezier(0.4, 0, 0.2, 1)` | Transições padrão (Material Design suave) |
| `spring( stiffness 300, damping 20 )` | Microinterações com feedback físico |

### 1.3 Notação de tempo

- `200ms` = 200 milissegundos
- `1.5s` = 1.5 segundos
- `3s-5s` = entre 3 e 5 segundos (variável conforme contexto)

### 1.4 Diagrama de estados global

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌───────────┐
│ LOGIN   │────▶│ CONVERSA │────▶│ RESUMO   │────▶│ DASHBOARD │
│         │     │          │     │ PARCIAL  │     │           │
└─────────┘     └──────────┘     └──────────┘     └───────────┘
      ▲              │                                  │
      │              │                                  │
      │              ▼                                  ▼
      │         ┌──────────┐                     ┌───────────┐
      └─────────│ DIAGNÓS. │◀────────────────────│   NOVA    │
                │  FINAL   │                     │ CONVERSA  │
                └──────────┘                     └───────────┘
```

---

## 2. Transições de Tela

### 2.1 T01 — Login → Conversa

| Campo | Especificação |
|---|---|
| **Entrada** | Credenciais válidas + clique em "Entrar" OU sucesso no OAuth |
| **Transição** | Tela de login fade out (200ms, ease-out); fundo escurece (150ms); tela de conversa fade in com slide up (400ms, ease-out); IA começa a "digitar" saudação 300ms após tela aparecer |
| **Estado** | Conversa aberta, IA em estado "Aguardando" (primeira vez) ou "Retorno" (sessão existente). Painel cognitivo visível à direita (se desktop) ou em aba (se mobile) |
| **Saída** | Empresário digita mensagem OU IA inicia com saudação |
| **Tempo mínimo** | 400ms (transição completa) |
| **Tempo ideal** | 700ms (transição + IA "respirando") |
| **Tempo máximo** | 1.5s (acima disso parece lento) |
| **Prioridade** | Parcial — não pode ser interrompida após iniciada |
| **Interrupções** | Nenhuma durante a transição |
| **Fallback** | Se login falhar: mensagem de erro na tela de login (nunca ir para conversa). Se transição falhar (timeout > 3s): tela de erro com "Não foi possível carregar sua conversa. Tente novamente." |
| **Continuidade** | Se é primeira vez: IA mostra saudação de boas-vindas. Se é retorno: IA mostra resumo da última sessão + estado atual. O estado da conversa é carregado antes da transição começar |

**Variações:**
- Primeiro login (T01a): Transição idêntica, mas IA mostra saudação de boas-vindas em vez de continuidade. Adicionar 200ms de atraso para efeito dramático
- Retorno (T01b): IA carrega contexto da última sessão e exibe resumo. Transição 100ms mais rápida (sistema "aquecido")

---

### 2.2 T02 — Conversa → Resumo Parcial

| Campo | Especificação |
|---|---|
| **Entrada** | Gatilho temporal: 5 perguntas respondidas OU 3 minutos de conversa OU explicitamente solicitado pelo empresário ("Resumo", "O que você sabe até agora?") |
| **Transição** | Conversa "pausa" — input fica com placeholder "Aguardando resumo...". Indicador "Gerando resumo..." aparece (800ms-1.5s). Card de resumo expande de cima para baixo (400ms, ease-out). Título "Resumo parcial" fade in (200ms). Conteúdo aparece em bullet points com staggered animation (100ms entre cada item). Botão "Continuar" fade in após 3s (tempo de leitura mínimo) |
| **Estado** | Resumo visível em destaque. Conversa "pausada" abaixo (opacidade 50%). IA aguarda confirmação do empresário. Painel cognitivo atualizado com novos dados |
| **Saída** | Empresário clica "Continuar" OU digita nova pergunta |
| **Tempo mínimo** | 2s (geração + exibição) |
| **Tempo ideal** | 3s-4s (tempo para ler + pausa) |
| **Tempo máximo** | 6s (acima disso empresário perde o fluxo) |
| **Prioridade** | Parcial — pode ser ignorada se empresário digitar nova pergunta |
| **Interrupções** | Empresário digita nova pergunta → resumo é descartado, volta à conversa. Empresário clica "Fechar" → resumo é minimizado, não descartado |
| **Fallback** | Se geração falhar: "Não consegui gerar o resumo agora. Quer tentar de novo?" com botão "Tentar novamente". Dados do painel cognitivo são preservados |
| **Continuidade** | Após fechar: IA pergunta "Podemos continuar?" ou retoma de onde parou. Resumo fica acessível no histórico. Painel cognitivo mantém estado atualizado |

---

### 2.3 T03 — Conversa → Diagnóstico Final

| Campo | Especificação |
|---|---|
| **Entrada** | Cobertura cognitiva > 80% OU confiança média > 75% OU empresário solicita ("Quero finalizar", "Pode fechar o diagnóstico") |
| **Transição** | IA exibe confirmação: "Já tenho dados suficientes para um diagnóstico. Quer que eu finalize?" (3s para empresário responder). Se sim: tela escurece suavemente (300ms). "Gerando diagnóstico..." com progresso narrativo (3s-5s) — IA mostra o que está consolidando. Card de diagnóstico expande em camadas: (1) título, (2) insights principais, (3) recomendações, (4) ações sugeridas. Cada camada com 200ms de atraso. Painel cognitivo atinge estado "Completo" com animação de preenchimento. Botões "Ver Dashboard", "Agendar Revisão", "Nova Conversa" aparecem |
| **Estado** | Diagnóstico final visível, completo e interativo. IA em estado "Concluindo". Painel cognitivo 100% preenchido |
| **Saída** | Empresário clica em um dos botões de ação |
| **Tempo mínimo** | 5s (confirmação + geração) |
| **Tempo ideal** | 8s-12s (geração com narrativa + apresentação dramática) |
| **Tempo máximo** | 20s (acima disso o empresário acha que travou) |
| **Prioridade** | Não — uma vez iniciado, não pode ser interrompido |
| **Interrupções** | Nenhuma após confirmação. Antes da confirmação, empresário pode recusar: "Ainda quero responder mais perguntas" |
| **Fallback** | Se geração falhar: "Não consegui consolidar o diagnóstico. Seus dados estão salvos — podemos tentar de novo." Dados parciais são preservados. Se falha persiste (2+ tentativas): oferta de diagnóstico parcial |
| **Continuidade** | Diagnóstico fica salvo no dashboard e no histórico. IA pode ser reconsultada sobre qualquer tópico do diagnóstico. Painel cognitivo mantém estado "Completo" |

---

### 2.4 T04 — Conversa → Dashboard

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário clica "Dashboard" no menu OU "Ver Dashboard" no diagnóstico final OU comando de voz |
| **Transição** | Conversa fade out (200ms, ease-in). Fundo transita (150ms). Dashboard fade in com slide up de elementos (500ms, ease-out). Cards do dashboard aparecem em sequência: (1) resumo financeiro, (2) insights/padrões, (3) recomendações, (4) atividades recentes. Cada card com 150ms de staggered delay. Sidebar permanece visível durante toda a transição |
| **Estado** | Dashboard completo e interativo. Conversa minimizada no histórico (acessível por botão "Última Conversa") |
| **Saída** | Empresário clica em qualquer card, inicia nova conversa, ou navega pelo menu |
| **Tempo mínimo** | 500ms |
| **Tempo ideal** | 800ms-1.2s |
| **Tempo máximo** | 2s |
| **Prioridade** | Sim — pode ser interrompida se empresário clicar em outro menu durante a transição |
| **Interrupções** | Clique em outro item do menu → nova transição começa, esta é cancelada |
| **Fallback** | Se dashboard não carregar: mostrar "resumo de emergência" com últimos insights disponíveis + botão "Tentar carregar dashboard completo". Se falha de dados: dashboard parcial com dados existentes + indicador de "dados incompletos" |
| **Continuidade** | Ao voltar para conversa, IA reconhece: "Você estava no dashboard. Quer continuar de onde paramos?" |

---

### 2.5 T05 — Dashboard → Nova Conversa

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário clica "Nova Conversa" OU "Assistente" no menu OU IA sugere e empresário aceita |
| **Transição** | Dashboard fade out (200ms, ease-in). Input de texto aparece primeiro (100ms) — para empresário começar a digitar imediatamente. IA exibe saudação adaptada ao contexto: se há dado novo: "Enquanto você estava no dashboard, notei algo..." Se não: "Pronto para continuar?" Histórico da conversa anterior minimizado (acessível por botão "Conversa Anterior") |
| **Estado** | Conversa aberta, IA "Aguardando" ou "Próxima Pergunta" se tem algo a dizer |
| **Tempo mínimo** | 300ms |
| **Tempo ideal** | 500ms-800ms |
| **Tempo máximo** | 1.5s |
| **Prioridade** | Sim |
| **Interrupções** | Clique em outro menu durante transição |
| **Fallback** | Se conversa não abrir: notificação de erro + permanecer no dashboard |
| **Continuidade** | IA mantém contexto completo da empresa. "Vi que você estava vendo os dados financeiros. Quer aprofundar?" |

---

### 2.6 T06 — Conversa → Conversa (retorno ao histórico)

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário clica em uma conversa anterior no histórico |
| **Transição** | Conversa atual fade out (150ms). Histórico scrolla para a conversa selecionada (300ms, ease-out). Mensagens da conversa selecionada aparecem com slide up rápido (200ms). IA no final da conversa: "Você está vendo a conversa de [data]. Quer continuar daqui?" |
| **Estado** | Conversa histórica visível do início ao fim. IA no estado em que a conversa terminou |
| **Saída** | Empresário clica "Continuar" OU volta ao histórico |
| **Tempo mínimo** | 400ms |
| **Tempo ideal** | 700ms |
| **Tempo máximo** | 1.5s |
| **Prioridade** | Sim |
| **Interrupções** | Clique em outra conversa |
| **Fallback** | Se conversa não for encontrada: mensagem "Conversa não encontrada. Pode ter sido arquivada." + lista de conversas disponíveis |
| **Continuidade** | Ao continuar, IA retoma do último estado. "Estávamos falando sobre [tópico]. Tem novidades?" |

---

## 3. Transições de Estado da IA

### 3.1 IA01 — Ociosa → Pensando

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário envia mensagem OU evento externo dispara análise |
| **Transição** | Indicador de input desaparece (100ms). Indicador de pensamento aparece: 3 pontos pulsando com texto dinâmico. Input fica desabilitado. Duração da transição: 200ms ease-out |
| **Estado** | IA em "Pensando". Input desabilitado. Indicador visível |
| **Saída** | Processamento concluído (vai para IA02 ou IA03) |
| **Tempo mínimo** | 300ms |
| **Tempo ideal** | 500ms-4s (conforme complexidade) |
| **Tempo máximo** | 7s (se > 7s, vai para "Processando Resposta" com indicador narrativo) |
| **Prioridade** | Parcial — pode ser interrompida se empresário cancelar |
| **Interrupções** | Empresário clica "Cancelar" → volta a "Aguardando". Se não houver botão cancelar, não interrompível |
| **Fallback** | Se processamento falhar: vai para estado de erro (IA07). "Não consegui processar sua pergunta. Pode reformular?" |
| **Continuidade** | Ao terminar, vai para IA02 (Respondendo) se tiver resposta, ou IA05 (Próxima Pergunta) se precisar de mais dados |

---

### 3.2 IA02 — Pensando → Respondendo

| Campo | Especificação |
|---|---|
| **Entrada** | Processamento concluído com resposta pronta |
| **Transição** | Indicador de pensamento fade out (150ms). Resposta aparece com slide up + fade in (400ms, ease-out). Se é insight: "✦" aparece antes do texto com destaque visual. Se é resposta normal: texto aparece sem destaque. Se a resposta é longa (> 100 palavras): aparece em parágrafos com 100ms de atraso entre cada um. Indicador de "recebido" aparece no canto após conclusão |
| **Estado** | Resposta visível, completa. Input reabilitado |
| **Saída** | Empresário lê a resposta |
| **Tempo mínimo** | 200ms (transição visual) |
| **Tempo ideal** | 400ms-800ms (transição + tempo de leitura do início) |
| **Tempo máximo** | 2s (se a resposta é muito longa, mostrar indicador de "gerando resposta" durante a exibição) |
| **Prioridade** | Sim — empresário pode começar a digitar enquanto resposta aparece |
| **Interrupções** | Empresário começa a digitar → IA não interrompe a exibição, mas prepara contexto para próxima pergunta |
| **Fallback** | Se exibição falhar (resposta corrompida): "Desculpe, a resposta foi corrompida. Quer que eu tente de novo?" com botão "Regenerar" |
| **Continuidade** | Resposta fica visível no histórico. IA transita para IA03 (Aguardando) se espera resposta, ou IA05 (Próxima Pergunta) se já tem a próxima pergunta |

---

### 3.3 IA03 — Respondendo → Aguardando

| Campo | Especificação |
|---|---|
| **Entrada** | Final da exibição da resposta + IA não tem pergunta imediata |
| **Transição** | Indicador de "pronto" sutil aparece (check pequeno ou opacidade normaliza). Input reabilitado com placeholder "Pergunte algo..." (se primeira pergunta) ou "Continue..." (se meio da conversa). IA não faz nada — apenas aguarda. Duração: 100ms |
| **Estado** | IA pronta para receber input. Resposta visível |
| **Saída** | Empresário digita nova mensagem |
| **Tempo mínimo** | Imediato |
| **Tempo ideal** | Imediato |
| **Tempo máximo** | 60s (após 60s, IA rompe silêncio — ver seção 9 do Manual da Inteligência Visível) |
| **Prioridade** | Sim — sempre interrompível |
| **Interrupções** | Empresário digita a qualquer momento |
| **Fallback** | Não se aplica (não há processamento para falhar) |
| **Continuidade** | Próxima entrada do empresário dispara IA01 novamente |

---

### 3.4 IA04 — Aguardando → Processando Resposta

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário envia mensagem durante estado "Aguardando" |
| **Transição** | Mensagem do empresário aparece na tela com slide up (200ms). Badge "Enviando..." com animação de pulso (300-800ms, conforme tamanho). Mensagem ganha opacidade total quando "recebida" pelo servidor (confirmação visual). Input limpa |
| **Estado** | Mensagem do empresário visível. IA em transição para "Pensando" |
| **Saída** | Mensagem confirmada como recebida → dispara IA01 |
| **Tempo mínimo** | 300ms |
| **Tempo ideal** | 500ms-800ms |
| **Tempo máximo** | 2s (se > 2s sem confirmação, mostrar "Reconectando...") |
| **Prioridade** | Não — a mensagem precisa ser enviada |
| **Interrupções** | Empresário não pode cancelar após enviar (mas pode enviar outra mensagem que será enfileirada) |
| **Fallback** | Se falha de rede: "Não foi possível enviar. Verifique sua conexão." Mensagem preservada no input. Se falha de servidor: "Erro ao processar. Tente novamente." |
| **Continuidade** | Ao confirmar recebimento, vai para IA01 (Pensando) |

---

### 3.5 IA05 — Processando Resposta → Próxima Pergunta

| Campo | Especificação |
|---|---|
| **Entrada** | IA tem dados suficientes para continuar e já sabe qual pergunta fazer |
| **Transição** | Se IA estava "Pensando": transição normal de IA01→IA02→IA03→IA05. Se IA estava "Insight": transição de IA06→IA05. A pergunta aparece como parte da resposta da IA ou como mensagem separada. Se for pergunta de confirmação: formato mais curto. Se for pergunta exploratória: formato mais longo com contexto. A pergunta sempre aparece depois de uma pausa de 300-800ms após a resposta anterior |
| **Estado** | IA exibiu resposta + fez pergunta. Aguardando resposta |
| **Saída** | Empresário responde |
| **Tempo mínimo** | 200ms |
| **Tempo ideal** | 300ms-500ms entre resposta e pergunta |
| **Tempo máximo** | 2s entre resposta e pergunta |
| **Prioridade** | Parcial — se empresário responder antes da pergunta, IA usa a resposta como contexto |
| **Interrupções** | Empresário responde antes de a pergunta terminar de ser exibida |
| **Fallback** | Se IA não conseguir gerar pergunta: transitar para "Aguardando" sem pergunta. Se pergunta for redundante: "Você já respondeu isso antes. Quer revisar?" |
| **Continuidade** | Próxima resposta do empresário entra no ciclo cognitivo. Se empresário não responder em 30s, IA pode reformular a pergunta ou sugerir outro tópico |

---

### 3.6 IA06 — Próxima Pergunta → Insight

| Campo | Especificação |
|---|---|
| **Entrada** | IA identifica padrão com confiança > 60% em relação causal OU correlação significativa OU anomalia relevante |
| **Transição** | **É a transição mais dramática do sistema.** IA faz pausa de 800ms-1.5s (silêncio intencional). Ícone "✦" aparece com fade + scale (200ms, cubic-bezier dramático). Background da mensagem muda sutilmente (cor de destaque). Texto do insight aparece datilografado (100ms por caractere). Dados chave em negrito. Indicador de confiança aparece ao lado ("Confiança: 72%"). Após conclusão: badge "Insight" aparece. 3s em destaque, depois retorna ao normal |
| **Estado** | Insight visível em destaque. Painel cognitivo atualizado com novo conhecimento |
| **Saída** | Empresário reage (confirma, contesta, aprofunda) |
| **Tempo mínimo** | 2s (pausa + exibição) |
| **Tempo ideal** | 3s-5s (construção de suspense + revelação) |
| **Tempo máximo** | 8s (acima disso perde o impacto) |
| **Prioridade** | Parcial — empresário pode interromper para perguntar |
| **Interrupções** | Empresário digita pergunta → insight é pausado (não cancelado). Empresário pode continuar lendo depois |
| **Fallback** | Se confiança cai abaixo de 60% durante geração: insight não é exibido, IA transita para pergunta normal. Se formatação falhar: insight é exibido como texto normal sem destaque |
| **Continuidade** | Insight vira card no painel cognitivo. IA pergunta "Isso faz sentido para você?" e aguarda confirmação. Se confirmado, vai para IA03 (Aguardando) ou IA04 (Processando). Se contestado, vai para revisão de hipótese |

---

### 3.7 IA07 — Insight → Concluindo

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário confirma insight OU IA decide que ciclo está completo OU diagnóstico final solicitado |
| **Transição** | IA faz pausa (500ms). Se é conclusão de insight: "Isso é mais um peça do quebra-cabeça." Se é conclusão de diagnóstico: sequência completa de T03. Painel cognitivo mostra progresso final. Mensagem de conclusão com slide up (300ms). Opções de próximo passo aparecem |
| **Estado** | Sessão de insights concluída (total ou parcialmente) |
| **Saída** | Empresário escolhe próximo passo (continuar, dashboard, novo tópico, encerrar) |
| **Tempo mínimo** | 1s |
| **Tempo ideal** | 2s-3s |
| **Tempo máximo** | 5s |
| **Prioridade** | Sim — empresário pode escolher ação a qualquer momento |
| **Interrupções** | Empresário clica em ação futura |
| **Fallback** | Se conclusão falhar: "Não consegui finalizar essa linha de raciocínio. Os insights já gerados estão salvos." |
| **Continuidade** | Depende da escolha do empresário. Se continuar: volta para IA01. Se encerrar: vai para T03 ou T04. Se novo tópico: IA05 |

---

## 4. Transições de Painel Cognitivo

### 4.1 P01 — Painel Vazio → Painel Preenchendo

| Campo | Especificação |
|---|---|
| **Entrada** | Primeira resposta do empresário na primeira conversa |
| **Transição** | Painel aparece vazio com leve fade in (300ms). Primeira área começa a preencher com animação de "crescimento" de barra (500ms, ease-out). Texto "Conhecendo sua empresa..." aparece. Indicador de cobertura: 2%. Transição de "vazio" para "primeiro dado" |
| **Estado** | Painel com 1-2 áreas em preenchimento (15-25%). Confiança: 2-12% |
| **Saída** | Novas respostas continuam preenchendo |
| **Tempo mínimo** | 300ms |
| **Tempo ideal** | 500ms-800ms |
| **Tempo máximo** | 1.5s |
| **Prioridade** | Sim (é apenas apresentação) |
| **Interrupções** | Empresário continua conversando |
| **Fallback** | Se painel não carregar: não exibir. Conversa continua normalmente. Painel aparece quando carregar |
| **Continuidade** | A cada resposta, painel se atualiza com novos dados |

---

### 4.2 P02 — Painel Preenchendo → Painel Parcial

| Campo | Especificação |
|---|---|
| **Entrada** | Cobertura atinge 25-60% (normalmente após 5-8 respostas) |
| **Transição** | Novas áreas do painel aparecem com expand animação (300ms). Barras de preenchimento atualizam com animação suave (400ms, ease-out). Cards de hipótese começam a aparecer (staggered, 100ms cada). Indicador de lacunas aparece: "2 áreas ainda não exploradas". Números de confiança e cobertura atualizam com contador animado |
| **Estado** | Painel com 3-5 áreas preenchidas parcialmente. 1-3 hipóteses visíveis. Confiança: 25-55% |
| **Saída** | Continua preenchendo (P03) ou atinge maturidade |
| **Tempo mínimo** | 200ms |
| **Tempo ideal** | 500ms |
| **Tempo máximo** | 1s |
| **Prioridade** | Sim |
| **Interrupções** | Nova resposta do empresário |
| **Fallback** | Se atualização falhar: painel mantém estado anterior com indicador "Aguardando atualização" |
| **Continuidade** | Painel é atualizado incrementalmente a cada interação |

---

### 4.3 P03 — Painel Parcial → Painel Avançado

| Campo | Especificação |
|---|---|
| **Entrada** | Cobertura atinge 60-80% + pelo menos 1 insight gerado |
| **Transição** | Painel expande para mostrar conexões entre áreas (linhas de conexão animadas — 500ms). Cards de insight aparecem em destaque com fade (300ms). Confiança mostra valor atualizado com animação. Seção "Próximas investigações" aparece. Seção "Padrões identificados" aparece |
| **Estado** | Painel com 60-80% de cobertura. Múltiplos insights. Conexões visíveis |
| **Saída** | Atinge cobertura máxima ou diagnóstico |
| **Tempo mínimo** | 500ms |
| **Tempo ideal** | 1s-1.5s |
| **Tempo máximo** | 2s |
| **Prioridade** | Parcial |
| **Interrupções** | Novo insight durante transição → painel prioriza o novo dado |
| **Fallback** | Se conexões não carregarem: painel mantém cards individuais sem linhas |
| **Continuidade** | Painel continua sendo a referência visual do progresso cognitivo |

---

### 4.4 P04 — Painel Avançado → Painel Completo

| Campo | Especificação |
|---|---|
| **Entrada** | Cobertura > 80% OU confiança média > 75% OU diagnóstico final solicitado |
| **Transição** | Animação de "completude" — todas as barras atingem 100% com efeito de brilho (600ms). Check animado aparece em cada área completa. Cards de insight são finalizados com badge "Confirmado". Seção "Lacunas remanescentes" aparece com indicação clara do que não foi explorado. Footer do painel: "Diagnóstico completo" com botão "Ver relatório" |
| **Estado** | Painel 100% preenchido. Todos os insights consolidados. Lacunas documentadas |
| **Saída** | Empresário navega para relatório, dashboard, ou nova conversa |
| **Tempo mínimo** | 1s |
| **Tempo ideal** | 1.5s-2s |
| **Tempo máximo** | 3s |
| **Prioridade** | Não — momento de celebração, não deve ser interrompido |
| **Interrupções** | Nenhuma durante a animação de completude |
| **Fallback** | Se animação falhar: painel mostra estado completo sem animação. Dados preservados |
| **Continuidade** | Painel mantém estado "Completo" até nova conversa começar |

---

### 4.5 P05 — Painel Completo → Painel Revisando

| Campo | Especificação |
|---|---|
| **Entrada** | Nova informação contradiz dado anterior OU empresário corrige um dado OU IA detecta inconsistência |
| **Transição** | Área afetada do painel muda para cor âmbar (200ms). Badge "Revisando" aparece com pulse (300ms). Confiança na hipótese afetada diminui com animação. Indicador "IA está reavaliando..." aparece. Se a revisão é significativa: painel "abre" para mostrar o que mudou (expansão, 400ms) |
| **Estado** | Painel com 1-N áreas em estado "Revisando". Confiança geral pode ter caído |
| **Saída** | IA conclui revisão → volta a P03 ou P04 |
| **Tempo mínimo** | 300ms |
| **Tempo ideal** | 500ms-800ms |
| **Tempo máximo** | 1.5s |
| **Prioridade** | Parcial |
| **Interrupções** | Nova correção do empresário |
| **Fallback** | Se revisão falhar: painel mantém estado anterior com badge "Revisão pendente" |
| **Continuidade** | IA explica o que mudou e por quê. Painel reflete o novo entendimento |

---

## 5. Transições de Conversa

### 5.1 C01 — Pergunta → Resposta

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário envia uma pergunta |
| **Transição** | Mensagem do empresário aparece (200ms). IA processa (300ms-4s). Resposta da IA aparece (400ms). Para perguntas simples: resposta direta. Para perguntas complexas: processamento + resposta. Para perguntas que geram insight: transição especial (ver IA06) |
| **Estado** | Pergunta visível + resposta visível |
| **Saída** | Empresário lê e decide próximo passo |
| **Tempo mínimo** | 500ms |
| **Tempo ideal** | 1s-3s |
| **Tempo máximo** | 7s |
| **Prioridade** | Parcial — empresário pode enviar nova pergunta |
| **Interrupções** | Nova pergunta do empresário enfileira |
| **Fallback** | Se IA não conseguir responder: "Não consegui processar sua pergunta. Pode reformular?" |
| **Continuidade** | Resposta se torna contexto para próximas perguntas |

---

### 5.2 C02 — Resposta → Próxima Pergunta

| Campo | Especificação |
|---|---|
| **Entrada** | IA tem contexto suficiente para saber qual pergunta fazer a seguir |
| **Transição** | Pausa de 300-800ms entre fim da resposta e início da pergunta. Se pergunta é continuação direta: "E [pergunta]?". Se pergunta é novo tópico: breve ponte de transição ("Isso me leva a outro ponto: [pergunta]"). A pergunta aparece como continuação da conversa, não como mensagem separada |
| **Estado** | Resposta + pergunta visíveis. IA aguardando |
| **Saída** | Empresário responde |
| **Tempo mínimo** | 300ms |
| **Tempo ideal** | 500ms-1s |
| **Tempo máximo** | 2s |
| **Prioridade** | Sim |
| **Interrupções** | Empresário responde antes |
| **Fallback** | Se IA não gerar pergunta: transita para "Aguardando" |
| **Continuidade** | Próxima resposta do empresário segue o ciclo |

---

### 5.3 C03 — Tópico → Novo Tópico

| Campo | Especificação |
|---|---|
| **Entrada** | IA decide que tópico atual está suficientemente explorado OU empresário muda de assunto |
| **Transição** | Se IA inicia: "Isso cobre o que precisávamos sobre [tópico]. Isso me faz pensar em [novo tópico]." Se empresário inicia: IA reconhece a mudança e se adapta. Background da conversa não muda. Painel cognitivo mostra novo tópico sendo adicionado. Histórico do tópico anterior permanece acessível |
| **Estado** | Novo tópico ativo. Tópico anterior concluído (visível no histórico) |
| **Saída** | Conversa continua no novo tópico |
| **Tempo mínimo** | 500ms |
| **Tempo ideal** | 1s-2s (se IA inicia: pausa de transição de 1s) |
| **Tempo máximo** | 3s |
| **Prioridade** | Sim |
| **Interrupções** | Empresário pode mudar de tópico a qualquer momento |
| **Fallback** | Se transição for brusca demais: IA pergunta "Quer mudar de assunto?" |
| **Continuidade** | Dados do tópico anterior são preservados. IA pode fazer conexões entre tópicos futuramente |

---

### 5.4 C04 — Tópico → Retorno ao Tópico Anterior

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário menciona tópico anterior OU IA percebe que dado novo se conecta com tópico anterior |
| **Transição** | IA pausa (500ms) e diz: "Isso me leva de volta àquilo que falamos sobre [tópico]." Se empresário iniciou: IA reconhece e retoma o contexto. Painel cognitivo destaca o tópico anterior. Histórico scrolla rapidamente para referência |
| **Estado** | Tópico anterior reativado. Contexto completo disponível |
| **Saída** | Conversa continua no tópico retomado |
| **Tempo mínimo** | 500ms |
| **Tempo ideal** | 1s-1.5s |
| **Tempo máximo** | 2.5s |
| **Prioridade** | Sim |
| **Interrupções** | Empresário decide não retornar |
| **Fallback** | Se IA não encontrar o tópico anterior: peça confirmação "Você se refere a [tópico]? Não encontrei nos registros." |
| **Continuidade** | IA usa o contexto anterior + o novo dado para aprofundar |

---

### 5.5 C05 — Hipótese → Hipótese Corrigida

| Campo | Especificação |
|---|---|
| **Entrada** | Novo dado contradiz hipótese existente OU empresário corrige a IA |
| **Transição** | IA pausa (500ms). "Com essa informação, preciso revisar o que pensei sobre [tópico]." Hipótese anterior é marcada no painel como "Revisada" (cor âmbar). Nova hipótese aparece com badge "Atualizada". Confiança na hipótese antiga cai (animação). Confiança na nova sobe gradualmente. Versão anterior preservada no histórico com data/hora |
| **Estado** | Hipótese corrigida visível. Hipótese anterior preservada como "versão [data]" |
| **Saída** | IA pergunta se faz sentido: "Isso está mais alinhado com sua realidade?" |
| **Tempo mínimo** | 1s |
| **Tempo ideal** | 2s-3s |
| **Tempo máximo** | 4s |
| **Prioridade** | Parcial |
| **Interrupções** | Empresário faz nova correção |
| **Fallback** | Se correção gerar inconsistência: IA indica o conflito e pede ajuda do empresário |
| **Continuidade** | IA segue a partir da hipótese corrigida. Lição aprendida registrada |

---

### 5.6 C06 — Hipótese → Hipótese Confirmada

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário confirma hipótese explicitamente OU dados adicionais confirmam com confiança > 80% |
| **Transição** | Hipótese no painel ganha badge verde "Confirmado" com animação de reforço (300ms). Confiança sobe com animação. IA diz: "Isso valida o que estávamos investigando." Se é primeira confirmação: "Primeira hipótese confirmada. Estamos no caminho certo." Hipótese vira card de conhecimento validado permanentemente |
| **Estado** | Hipótese confirmada. Virou conhecimento validado no patrimônio cognitivo |
| **Saída** | IA segue para próxima investigação |
| **Tempo mínimo** | 500ms |
| **Tempo ideal** | 1s-1.5s |
| **Tempo máximo** | 2s |
| **Prioridade** | Parcial |
| **Interrupções** | Empresário adiciona ressalva → hipótese vai para "Confirmada com ressalvas" |
| **Fallback** | Se confirmação não puder ser registrada: hipótese mantém estado "Pendente de confirmação" |
| **Continuidade** | Conhecimento entra para o vault. IA usa como base para próximas investigações |

---

## 6. Transições do Mapa Cognitivo Vivo

### 6.1 MCV01 — Mapa Vazio → Mapa Inicial

| Campo | Especificação |
|---|---|
| **Entrada** | Primeiro dado coletado na primeira conversa |
| **Transição** | Mapa aparece como um círculo vazio com centro pulsando (300ms). Primeiro nodo aparece com animação de "nascimento" (scale 0→1, 500ms, spring). Nodo é categorizado automaticamente (cor por área). Linha fina conecta centro ao nodo |
| **Estado** | Mapa com 1 nodo e centro ativo |
| **Saída** | Novo dado adiciona novo nodo |
| **Tempo mínimo** | 300ms |
| **Tempo ideal** | 500ms-800ms |
| **Tempo máximo** | 1.2s |
| **Prioridade** | Sim |
| **Interrupções** | Novo dado adiciona outro nodo — transição é enfileirada |
| **Fallback** | Se nodo não categorizar: nodo genérico com cor neutra |
| **Continuidade** | Centro do mapa representa o conhecimento combinado |

---

### 6.2 MCV02 — Mapa Inicial → Mapa em Expansão

| Campo | Especificação |
|---|---|
| **Entrada** | 3-7 nodos coletados (múltiplas áreas) |
| **Transição** | Novos nodos aparecem com escala (300ms cada). Cores se diferenciam por área. Linhas de conexão aparecem entre nodos relacionados (animação de "desenho" da linha, 400ms). Centro do mapa cresce proporcionalmente ao conhecimento. Áreas não conectadas aparecem mais distantes. Tooltip com nome da área aparece ao hover |
| **Estado** | Mapa com 3-7 nodos, conexões visíveis, áreas identificáveis |
| **Saída** | Mais dados adicionam nodos e conexões |
| **Tempo mínimo** | 200ms por nodo |
| **Tempo ideal** | 300ms por nodo |
| **Tempo máximo** | 500ms por nodo |
| **Prioridade** | Sim |
| **Interrupções** | Empresário pode interagir com o mapa (clicar em nodos) durante a expansão |
| **Fallback** | Se conexão falhar: nodos são exibidos sem conexão |
| **Continuidade** | Mapa se torna ferramenta de navegação do conhecimento |

---

### 6.3 MCV03 — Mapa em Expansão → Mapa com Insights

| Campo | Especificação |
|---|---|
| **Entrada** | Insight gerado (confiança > 60%) |
| **Transição** | Nodos envolvidos no insight ganham brilho (400ms). Linha de conexão entre eles fica mais grossa e com cor de destaque (300ms). Badge "✦ Insight" aparece próximo à conexão (200ms). Centro do mapa pulsa com energia. Tooltip expandido mostra resumo do insight |
| **Estado** | Mapa com insights destacados |
| **Saída** | Empresário clica no insight para expandir OU continua conversa |
| **Tempo mínimo** | 500ms |
| **Tempo ideal** | 800ms-1.2s |
| **Tempo máximo** | 2s |
| **Prioridade** | Parcial |
| **Interrupções** | Novo insight sobrepõe o anterior |
| **Fallback** | Se destaque não funcionar: insight aparece como card separado abaixo do mapa |
| **Continuidade** | Insight permanece destacado até ser confirmado ou revisado |

---

## 7. Transições de Erro

### 7.1 E01 — Erro de Conexão

| Campo | Especificação |
|---|---|
| **Entrada** | Perda de conexão com servidor |
| **Transição** | Barra sutil no topo aparece (200ms): "Conexão instável. Suas respostas estão sendo salvas." Se perda total: overlay translúcido com indicador "Reconectando..." (300ms). Input desabilitado. Mensagens preservadas. Reconexão automática com indicador de tentativa |
| **Estado** | Sistema em modo offline parcial. Input desabilitado. Dados locais preservados |
| **Saída** | Conexão restabelecida → barra desaparece (200ms). Input reabilitado. Mensagens enviadas durante desconexão são processadas |
| **Tempo mínimo** | Imediato |
| **Tempo ideal** | Mensagem de aviso < 1s |
| **Tempo máximo** | 3s para indicador de falha |
| **Prioridade** | Não |
| **Interrupções** | Nenhuma |
| **Fallback** | Se reconexão falhar por > 10s: "Sua conexão caiu. Seus dados estão salvos. Volte quando estiver online." |
| **Continuidade** | Conversa retoma do ponto exato de interrupção |

---

### 7.2 E02 — Erro de Processamento

| Campo | Especificação |
|---|---|
| **Entrada** | IA não consegue processar pergunta (timeout, erro interno, resposta inválida) |
| **Transição** | Indicador de processamento para subitamente. IA exibe mensagem de erro em tom neutro: "Não consegui processar sua pergunta agora." Input reabilitado. Botão "Tentar novamente" aparece. Mensagem original preservada no input para edição. Sem animações dramáticas |
| **Estado** | Mensagem de erro visível. Input preservado. Conversa continua |
| **Saída** | Empresário clica "Tentar novamente" ou edita e reenvia |
| **Tempo mínimo** | < 500ms |
| **Tempo ideal** | 300ms-500ms |
| **Tempo máximo** | 1.5s |
| **Prioridade** | Sim |
| **Interrupções** | Empresário pode editar a pergunta |
| **Fallback** | Se erro persiste (2+): IA sugere reformular a pergunta de forma mais simples |
| **Continuidade** | Nenhum dado é perdido. Apenas a resposta não foi gerada |

---

### 7.3 E03 — Erro de Dado

| Campo | Especificação |
|---|---|
| **Entrada** | Dado solicitado não existe, está corrompido ou é inconsistente |
| **Transição** | IA pausa (300ms). "Não encontrei esse dado nos registros." Se dado parcial: "Encontrei apenas parte do que você pediu." Se dado inconsistente: "Os dados que tenho são contraditórios. Vou mostrar os dois lados." IA oferece alternativa: "Quer que eu investigue de outra forma?" |
| **Estado** | Mensagem de dado ausente/parcial/contraditório visível |
| **Saída** | Empresário decide o que fazer: aceitar parcial, pedir investigação, mudar pergunta |
| **Tempo mínimo** | 500ms |
| **Tempo ideal** | 800ms-1.5s |
| **Tempo máximo** | 2s |
| **Prioridade** | Sim |
| **Interrupções** | Empresário faz nova pergunta |
| **Fallback** | Se dado não for encontrado após investigação: "Confirmei — esse dado não está disponível. Quer que eu comece a coletá-lo?" |
| **Continuidade** | IA registra lacuna de dado para coleta futura |

---

## 8. Transições de Sessão

### 8.1 S01 — Login → Primeira Sessão (Onboarding)

| Campo | Especificação |
|---|---|
| **Entrada** | Primeiro login do empresário |
| **Transição** | Transição de login (T01) seguida de apresentação especial. IA diz: "Bem-vindo. É a primeira vez aqui — vou conhecer sua empresa." IA faz pausa de 1s (solene). Primeira pergunta (mais fácil) aparece. Painel cognitivo aparece vazio e começa a preencher com primeira resposta |
| **Estado** | Primeira sessão ativa. IA em modo onboarding |
| **Saída** | Empresário responde primeira pergunta |
| **Tempo mínimo** | 1s |
| **Tempo ideal** | 2s-3s (apresentação + pausa) |
| **Tempo máximo** | 5s |
| **Prioridade** | Não (momento de apresentação) |
| **Interrupções** | Empresário pode começar a digitar imediatamente |
| **Fallback** | Se onboarding não carregar: IA inicia conversa normal em vez de onboarding especial |
| **Continuidade** | Primeira sessão segue o fluxo normal da conversa cognitiva |

---

### 8.2 S02 — Login → Sessão Existente (Retorno)

| Campo | Especificação |
|---|---|
| **Entrada** | Login de empresário com sessões anteriores |
| **Transição** | Transição de login (T01) + IA carrega contexto da última sessão. IA diz variação de retorno: "Bem-vindo de volta. Sua última visita foi [data]. Desde então, processei [insight novo, se houver]." Painel cognitivo carrega com estado da última sessão + atualizações. Se houve mudança nos dados desde a última visita: IA menciona |
| **Estado** | Sessão retomada com contexto completo |
| **Saída** | Empresário começa a interagir |
| **Tempo mínimo** | 500ms (carregamento) |
| **Tempo ideal** | 1s-2s (carregamento + saudação) |
| **Tempo máximo** | 3s (se > 3s, mostrar indicador de "carregando seu contexto") |
| **Prioridade** | Parcial |
| **Interrupções** | Empresário digita antes de IA terminar saudação → IA processa a mensagem e descarta o resto da saudação |
| **Fallback** | Se contexto não carregar: IA inicia sessão normal sem contexto: "Bem-vindo de volta. Não consegui recuperar nossa última conversa — mas sei tudo sobre sua empresa." |
| **Continuidade** | Sessão retoma naturalmente |

---

### 8.3 S03 — Encerramento de Sessão

| Campo | Especificação |
|---|---|
| **Entrada** | Empresário fecha navegador, faz logout, ou sessão expira (30min inatividade) |
| **Transição** | Se fechamento normal: IA exibe resumo de sessão (opcional). "Isso é o que temos hoje. Amanhã terei novidades." Conversa é salva automaticamente. Painel cognitivo é congelado no estado final. Se timeout: antes de expirar, IA pergunta "Ainda está aí?" (aos 25min). Se não responder: sessão é salva e encerrada |
| **Estado** | Sessão encerrada. Dados salvos. Contexto preservado |
| **Saída** | Próximo login → S02 |
| **Tempo mínimo** | Imediato |
| **Tempo ideal** | 500ms (salvamento automático) |
| **Tempo máximo** | 2s (salvamento) |
| **Prioridade** | Não |s
| **Interrupções** | Empresário volta antes de expirar → sessão continua |
| **Fallback** | Se salvamento falhar: dados são preservados em cache local + tentativa de salvamento na próxima sessão |
| **Continuidade** | Próximo login recupera o estado exato |

---

## 9. Matriz de Prioridade e Interrupção

### 9.1 Tabela de Prioridade

| Prioridade | Transições | Comportamento |
|---|---|---|
| **Alta (Sim)** | T04, T05, T06, IA02, IA03, IA07, P01, P02, P03, C02, C04, MCV01, MCV02, E02, E03 | Podem ser interrompidas a qualquer momento. Se interrompidas, estado anterior é preservado |
| **Média (Parcial)** | T01, T02, IA01, IA05, IA06, P04, P05, C01, C05, C06, MCV03, E01, S02 | Podem ser interrompidas em pontos específicos. Interrupção completa só em estados de espera |
| **Baixa (Não)** | T03, IA04, IA07 (início), S01, S03 | Não podem ser interrompidas. Devem completar o ciclo |

### 9.2 Regras de Interrupção

| Tipo de interrupção | Ação |
|---|---|
| **Empresário digita** | Interrompe transições de prioridade Alta e Média. A prioridade Baixa completa primeiro |
| **Erro de sistema** | Interrompe TODAS as transições, independente de prioridade. Sistema vai para estado de erro |
| **Timeout** | Interrompe transições de prioridade Média e Baixa se excederem o tempo máximo. Transições Alta continuam |
| **Nova transição conflitante** | A transição de maior prioridade cancela a de menor. Se mesma prioridade, a mais recente vence |

---

## 10. Regras Globais de Transição

### 10.1 Regras de Animação

| Regra | Descrição |
|---|---|
| **Duração total máxima** | Nenhuma transição pode durar mais que 5s (exceção: gerar diagnóstico) |
| **Stagger máximo** | No máximo 5 elementos em sequência staggered. Acima disso, paralelizar |
| **Easing consistente** | Toda entrada: ease-out. Toda saída: ease-in. Transições bidirecionais: ease-in-out |
| **Sem bounce excessivo** | Spring animations com damping mínimo de 15 (aparência natural, não elástica) |
| **Reduced motion** | Se sistema detecta preferência `prefers-reduced-motion`: todas as transições duram 50% menos. Sem parallax, sem scale, sem spring. Apenas fade e slide suave |
| **Mobile adapt** | Em mobile, transições duram 30% menos. Stagger reduzido para 2 elementos. Sem animações complexas (múltiplas camadas) |

### 10.2 Regras de Estado

| Regra | Descrição |
|---|---|
| **Estado sempre definido** | O sistema nunca está em "lugar nenhum". Toda tela tem um estado nomeado |
| **Estado preservado** | Transições de ida e volta preservam o estado anterior (navegação não destrói contexto) |
| **Estado de erro explícito** | Erro é um estado nomeado, não um "buraco" no fluxo |
| **Estado inconsistente é proibido** | Se dois componentes mostram estados diferentes do mesmo dado, o sistema está em estado inválido |
| **Timeout de estado** | Todo estado de processamento tem timeout. Se excedido, vai para fallback |

### 10.3 Regras de Fallback

| Regra | Descrição |
|---|---|
| **Fallback sempre definido** | Toda transição tem fallback documentado. Não existe "se falhar, quebra" |
| **Fallback preserva dados** | Fallback nunca perde dados do empresário. No máximo, atrasa a entrega |
| **Fallback comunicado** | Se fallback for ativado, IA informa o empresário: "Algo não saiu como esperado, mas seus dados estão seguros." |
| **Fallback recursivo** | Se fallback falhar: segundo fallback (mais genérico). Se segundo falhar: estado de "modo de segurança" com funcionalidade mínima |

### 10.4 Regras de Continuidade

| Regra | Descrição |
|---|---|
| **Toda transição gera continuidade** | Ao final de cada transição, o sistema sabe para onde pode ir em seguida |
| **Continuidade múltipla** | Todo estado tem pelo menos 2 saídas possíveis (nunca "só para frente") |
| **Continuidade preserva contexto** | Mudar de estado nunca perde o contexto do estado anterior (a menos que explicitamente limpo) |
| **Continuidade reversível** | Toda transição tem uma reversão possível (voltar ao estado anterior sem perda) |

### 10.5 Regras de Timing

| Regra | Descrição |
|---|---|
| **Mínimo respeitado** | Transições não podem ser mais rápidas que o tempo mínimo (pareceria instável) |
| **Máximo respeitado** | Transições não podem exceder o tempo máximo (pareceria travado) |
| **Ideal buscado** | O sistema deve sempre buscar o tempo ideal — nem mais rápido, nem mais lento |
| **Tempo adaptativo** | Em uso repetido, transições podem acelerar (o sistema "aprende" que o empresário é experiente) |
| **Primeira vez mais lenta** | Na primeira vez que o empresário vê uma transição, ela dura 30% mais (efeito de apresentação) |

---

### Anexo A — Índice Rápido de Transições

| ID | Nome | Prioridade | Tempo ideal |
|---|---|---|---|
| **T01** | Login → Conversa | Parcial | 700ms |
| **T02** | Conversa → Resumo Parcial | Parcial | 3-4s |
| **T03** | Conversa → Diagnóstico Final | Não | 8-12s |
| **T04** | Conversa → Dashboard | Sim | 800ms-1.2s |
| **T05** | Dashboard → Nova Conversa | Sim | 500ms-800ms |
| **T06** | Conversa → Conversa (histórico) | Sim | 700ms |
| **IA01** | Ociosa → Pensando | Parcial | 500ms-4s |
| **IA02** | Pensando → Respondendo | Sim | 400ms-800ms |
| **IA03** | Respondendo → Aguardando | Sim | Imediato |
| **IA04** | Aguardando → Processando Resposta | Não | 500ms-800ms |
| **IA05** | Processando → Próxima Pergunta | Parcial | 300ms-500ms |
| **IA06** | Próxima Pergunta → Insight | Parcial | 3-5s |
| **IA07** | Insight → Concluindo | Sim | 2-3s |
| **P01** | Painel Vazio → Preenchendo | Sim | 500ms-800ms |
| **P02** | Painel Preenchendo → Parcial | Sim | 500ms |
| **P03** | Painel Parcial → Avançado | Parcial | 1s-1.5s |
| **P04** | Painel Avançado → Completo | Não | 1.5s-2s |
| **P05** | Painel Completo → Revisando | Parcial | 500ms-800ms |
| **C01** | Pergunta → Resposta | Parcial | 1s-3s |
| **C02** | Resposta → Próxima Pergunta | Sim | 500ms-1s |
| **C03** | Tópico → Novo Tópico | Sim | 1s-2s |
| **C04** | Tópico → Retorno | Sim | 1s-1.5s |
| **C05** | Hipótese → Corrigida | Parcial | 2s-3s |
| **C06** | Hipótese → Confirmada | Parcial | 1s-1.5s |
| **MCV01** | Mapa Vazio → Inicial | Sim | 500ms-800ms |
| **MCV02** | Mapa Inicial → Expansão | Sim | 300ms/nodo |
| **MCV03** | Mapa Expansão → Insights | Parcial | 800ms-1.2s |
| **E01** | Erro de Conexão | Não | Imediato |
| **E02** | Erro de Processamento | Sim | 300ms-500ms |
| **E03** | Erro de Dado | Sim | 800ms-1.5s |
| **S01** | Login → Primeira Sessão | Não | 2s-3s |
| **S02** | Login → Sessão Existente | Parcial | 1s-2s |
| **S03** | Encerramento de Sessão | Não | 500ms |

---

### Anexo B — Diagrama de Transições Críticas

```
                        ┌─────────────┐
                        │   LOGIN     │
                        │  (T01/S01/  │
                        │   S02)      │
                        └──────┬──────┘
                               │
                               ▼
                   ┌─────────────────────┐
              ┌───▶│   CONVERSA INICIO   │◀──────────────┐
              │    │    IA01 → IA03      │               │
              │    └──────────┬──────────┘               │
              │               │                          │
              │               ▼                          │
              │    ┌─────────────────────┐               │
              │    │  PERGUNTA → RESPOSTA│               │
              │    │      C01/C02        │               │
              │    └──────────┬──────────┘               │
              │               │                          │
              │        ┌──────┴──────┐                   │
              │        ▼             ▼                   │
              │  ┌──────────┐ ┌──────────┐              │
              │  │  INSIGHT │ │ PRÓXIMA  │              │
              │  │  IA06    │ │ PERGUNTA │              │
              │  └────┬─────┘ │ IA05     │              │
              │       │       └────┬─────┘              │
              │       ▼           ▼                      │
              │    ┌─────────────────────┐               │
              │    │    IA07 → IA03      │               │
              │    └──────────┬──────────┘               │
              │               │                          │
              │               ▼                          │
              │    ┌─────────────────────┐               │
              │    │  5 PERGUNTAS /      │               │
              │    │  3 MINUTOS?         │───────────────┘
              │    └──────────┬──────────┘   (não)
              │               │ (sim)
              │               ▼
              │    ┌─────────────────────┐
              │    │  RESUMO PARCIAL     │
              │    │      T02            │
              │    └──────────┬──────────┘
              │               │
              │        ┌──────┴──────┐
              │        ▼             ▼
              │  (continua)   (cobertura > 80%?)
              │                         │
              │                         ▼ (sim)
              │              ┌─────────────────────┐
              │              │  DIAGNÓSTICO FINAL  │
              │              │       T03           │
              │              └──────────┬──────────┘
              │                         │
              │                         ▼
              │              ┌─────────────────────┐
              │              │  DASHBOARD / NOVA   │
              └──────────────│  CONVERSA           │
                             │    T04/T05          │
                             └─────────────────────┘
```

---

*Este manual é complementar ao `EXPERIENCIA_COGNITIVA.md` (fases da conversa) e ao `A_ESPERA_INTELIGENTE.md` (espera como narrativa). Enquanto aqueles definem o conteúdo da experiência, este define a mecânica de cada transição.*

*Programa 23 — Julho de 2026.*
