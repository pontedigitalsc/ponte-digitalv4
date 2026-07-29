# GUIA DE IMPLEMENTAÇÃO VISUAL — Regras Objetivas da Arquitetura Visual da Ponte Digital

**Programa 23 | Documento de Regras | Versão 1.0**

> Este documento traduz toda a arquitetura visual dos documentos P23 em REGRAS OBJETIVAS.
> Não cria componentes. Cria regras que qualquer implementação deve seguir.
>
> Cada regra tem: nome, descrição, valor/parâmetro, exceções e exemplo de aplicação.

---

## Sumário

1. [Regras de Espaçamentos](#1-regras-de-espaçamentos)
2. [Regras de Hierarquia Visual](#2-regras-de-hierarquia-visual)
3. [Regras de Ritmo](#3-regras-de-ritmo)
4. [Regras de Tempo](#4-regras-de-tempo)
5. [Regras de Densidade](#5-regras-de-densidade)
6. [Regras de Respiração](#6-regras-de-respiração)
7. [Regras de Foco](#7-regras-de-foco)
8. [Regras de Contraste](#8-regras-de-contraste)
9. [Regras de Prioridade](#9-regras-de-prioridade)
10. [Regras de Movimento](#10-regras-de-movimento)

---

## 1. Regras de Espaçamentos

### R-E01 — Padding Mínimo entre Elementos

| Campo | Valor |
|---|---|
| **Nome** | Padding mínimo entre elementos interativos |
| **Descrição** | Nenhum elemento interativo pode estar a menos de 8px de distância de outro elemento interativo. Isso previne erros de clique e poluição visual. |
| **Valor/Parâmetro** | Mínimo: 8px. Recomendado: 12px entre elementos do mesmo grupo. 16px entre grupos diferentes. |
| **Exceções** | Elementos do mesmo card (título, subtítulo, badge) podem ter 4px entre si. Elementos de texto inline (palavras) seguem espaçamento de fonte. |
| **Exemplo** | Badge de confiança (24px altura) e texto do insight (16px) têm 12px de distância vertical. Botão "Continuar" e o card acima têm 24px de distância. |

### R-E02 — Densidade Máxima por Viewport

| Campo | Valor |
|---|---|
| **Nome** | Densidade máxima de elementos por viewport |
| **Descrição** | Em qualquer viewport, o número máximo de blocos de informação visíveis simultaneamente é controlado para evitar sobrecarga cognitiva. |
| **Valor/Parâmetro** | Desktop (>1024px): máximo 5 blocos. Tablet (768-1024px): máximo 4 blocos. Mobile (<768px): máximo 3 blocos. |
| **Exceções** | O painel cognitivo com grelha 4x5 de cobertura não conta como 20 blocos — conta como 1 bloco. Listas de lacunas contam como 1 bloco desde que usem scroll. |
| **Exemplo** | Na tela de conversa: (1) saudação da IA, (2) primeira pergunta, (3) campo de texto, (4) painel cognitivo compacto, (5) indicador de progresso. Máximo 5 blocos. |

### R-E03 — Hierarquia de Espaçamentos

| Campo | Valor |
|---|---|
| **Nome** | Escala de espaçamentos |
| **Descrição** | Todos os espaçamentos da interface seguem uma escala predefinida de 5 níveis. Não usar valores fora desta escala. |
| **Valor/Parâmetro** | xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px. A escala dobra a partir de xl: 2xl: 48px, 3xl: 64px. |
| **Exceções** | Padding interno de cards pode usar valores intermediários quando necessário para alinhamento óptico (ex: 20px em vez de 16px ou 24px). |
| **Exemplo** | Card de mensagem da IA: padding vertical 24px (lg), padding horizontal 32px (xl). Distância entre cards: 16px (md). Distância do card ao campo de texto: 24px (lg). |

---

## 2. Regras de Hierarquia Visual

### R-H01 — Ordem de Atração por Estado

| Campo | Valor |
|---|---|
| **Nome** | Hierarquia de atenção em cada estado |
| **Descrição** | Em cada estado da tela, o elemento mais importante para a decisão atual deve dominar o campo visual. A ordem de atração é fixa por estado. |
| **Valor/Parâmetro** | **E3 (Conversa ativa):** 1º Mensagem atual da IA, 2º Histórico recente, 3º Campo de resposta, 4º Painel cognitivo, 5º Indicadores de progresso. **E4 (IA pensando):** 1º Indicador narrativo de pensamento, 2º Última mensagem do empresário, 3º Mapa cognitivo animado. **E5 (Insight):** 1º Anúncio da descoberta (✦ + texto), 2º Evidência visual, 3º Indicador de confiança, 4º Painel cognitivo atualizado. |
| **Exceções** | Se o empresário está digitando, o campo de texto assume a posição 1 temporariamente. |
| **Exemplo** | Durante a conversa, a mensagem atual da IA está no centro, com tamanho de fonte 16px, cor primária. A mensagem anterior está acima com opacidade reduzida (70%). O painel cognitivo está à direita com opacidade 80% e tamanho reduzido. |

### R-H02 — Proporção entre Elementos

| Campo | Valor |
|---|---|
| **Nome** | Proporção de tamanhos entre níveis hierárquicos |
| **Descrição** | Elementos primários, secundários e terciários seguem uma proporção fixa de tamanho. |
| **Valor/Parâmetro** | Primário : Secundário : Terciário = 4 : 2 : 1 (em área ocupada). Exemplo: card da IA (primário) ocupa 720px largura, painel cognitivo (secundário) ocupa 360px, badge (terciário) ocupa ~180px. |
| **Exceções** | Em mobile, a proporção se adapta: primário ocupa 100% da largura, secundário vira bottom sheet, terciário vira badge inline. |
| **Exemplo** | Na tela de insight: o card do insight ocupa 720px (centro), o mapa cognitivo ocupa 360px (direita), os badges de confiança ocupam ~180px (dentro do card). |

### R-H03 — Hierarquia por Opacidade

| Campo | Valor |
|---|---|
| **Nome** | Opacidade como marcador de relevância temporal |
| **Descrição** | Mensagens antigas perdem opacidade gradualmente conforme ficam para trás no histórico. A opacidade comunica "isto é relevante agora" vs "isto já foi processado". |
| **Valor/Parâmetro** | Mensagem atual: 100%. Mensagem anterior: 70%. 2 mensagens atrás: 40%. 3+ mensagens atrás: 20%. |
| **Exceções** | Mensagens de insight mantêm 70% de opacidade mesmo após 2 turnos (são permanentemente mais relevantes). Mensagens de erro mantêm 100% até resolução. |
| **Exemplo** | O empresário vê 4 mensagens no histórico. A última (atual) está nítida. A penúltima está semi-opaca. As duas primeiras estão quase invisíveis — mas ainda legíveis se o empresário focar. |

---

## 3. Regras de Ritmo

### R-R01 — Cadência de Aparecimento de Elementos

| Campo | Valor |
|---|---|
| **Nome** | Intervalo entre novos elementos na tela |
| **Descrição** | Elementos novos não aparecem todos ao mesmo tempo. Seguem uma cadência que simula o ritmo de uma conversa ou processamento natural. |
| **Valor/Parâmetro** | Intervalo mínimo entre elementos não-relacionados: 200ms. Intervalo entre elementos da mesma cadeia: 100ms. Máximo de 2 elementos novos por segundo. |
| **Exceções** | Em estado de insight, elementos relacionados (✦ + texto + badge) podem aparecer em sequência de 50ms para criar impacto dramático. |
| **Exemplo** | Quando a IA termina de pensar: (1) pontos de pensamento desaparecem (0ms), (2) card da IA começa slide up (100ms), (3) texto aparece datilografado (200ms em diante). Três elementos em ~400ms. |

### R-R02 — Densidade Temporal

| Campo | Valor |
|---|---|
| **Nome** | Densidade máxima de eventos visuais por janela de tempo |
| **Descrição** | Controla quantas microinterações podem acontecer em um intervalo para não sobrecarregar a percepção do empresário. |
| **Valor/Parâmetro** | Máximo de 3 eventos visuais por segundo. Evento visual = animação, transição, badge, card, alteração de cor. |
| **Exceções** | Atualização de barra de confiança (contagem numérica + barra + badge) conta como 1 evento se sincronizado na mesma animação. |
| **Exemplo** | Durante um insight: ✦ aparece (evento 1), texto slide up (evento 2), confiança atualiza (evento 3). Máximo permitido em 1s. Se houver mais 1 evento (ex: badge de lacuna), ele espera o próximo segundo. |

### R-R03 — Ritmo por Fase da Conversa

| Campo | Valor |
|---|---|
| **Nome** | Velocidade de progressão entre turnos |
| **Descrição** | O ritmo da conversa varia conforme a fase. Fases iniciais são mais lentas; fases de aprofundamento são mais rápidas. |
| **Valor/Parâmetro** | Abertura (fase 1): 3-5s entre turnos. Contextualização (fase 2): 2-4s. Investigação (fase 3-5): 1-3s. Insight (fase 6): 4-6s (pausa dramática). Aprofundamento (fase 7): 1-2s. |
| **Exceções** | Se o empresário responde rápido (<2s), a IA acelera o ritmo. Se responde lento (>5s), a IA desacelera. |
| **Exemplo** | Na abertura, a IA faz uma pergunta, espera 3s, o empresário responde em 2s, a IA espera 1s (absorve), responde. Na investigação ativa, a IA pergunta, empresário responde em 1s, IA responde em 500ms. |

---

## 4. Regras de Tempo

### R-T01 — Tolerância Máxima de Resposta

| Campo | Valor |
|---|---|
| **Nome** | Limite superior de tolerância por tipo de ação |
| **Descrição** | Define o tempo máximo aceitável para cada tipo de resposta do sistema. Acima disso, a experiência é percebida como lenta. |
| **Valor/Parâmetro** | Clique → feedback visual: 150ms máximo (ideal <20ms). Resposta simples: 500ms máximo (ideal <200ms). Resposta da IA (pergunta factual): 2s máximo (ideal 300-800ms). Resposta da IA (análise complexa): 5s máximo (ideal 2-3s). Relatório completo: 12s máximo (ideal 5-8s). |
| **Exceções** | Processamento noturno não tem limite de tolerância (o empresário não está esperando). Se o motor excede o limite, o loading inteligente assume com narrativa de progresso. |
| **Exemplo** | O empresário clica no botão "Ver detalhes". Em <20ms o botão já deve dar feedback visual (scale 0.95). Em <500ms o conteúdo já deve estar aparecendo. |

### R-T02 — Timing de Feedbacks

| Campo | Valor |
|---|---|
| **Nome** | Janela de timing para feedbacks da IA |
| **Descrição** | O timing da resposta da IA comunica confiança. Respostas muito rápidas para perguntas complexas parecem fake. Respostas muito lentas para perguntas simples parecem incompetência. |
| **Valor/Parâmetro** | <500ms: "Isso eu sei de cabeça" (factual, já tem o dado). 500ms-2s: "Deixa eu verificar" (consulta rápida). 2s-5s: "Estou pensando" (cruzamento de dados). 5s-10s: "Estou analisando" (processamento profundo). >10s: "Isso é complexo" (relatório, recomendação). |
| **Exceções** | Se o empresário explicitamente pede "Me responde rápido", a IA ignora a variação de timing e resposta o mais rápido possível. |
| **Exemplo** | O empresário pergunta "Qual foi meu faturamento mês passado?" — resposta em 400ms (factual). Pergunta "O que está causando minha queda de margem?" — resposta em 3.5s (cruzamento). |

### R-T03 — Duração de Animações por Prioridade

| Campo | Valor |
|---|---|
| **Nome** | Duração conforme a intenção da animação |
| **Descrição** | Cada tipo de intenção de microinteração tem uma faixa de duração específica. |
| **Valor/Parâmetro** | Confirmar: 200-400ms. Notificar: 300-500ms. Transicionar: 400-700ms. Surpreender: 600-1000ms. Celebrar: 500-800ms. Corrigir: 400-600ms. Aguardar: 200ms (entrada, mantém). |
| **Exceções** | Em modo "economia de animação" (prefers-reduced-motion), todas as durações são reduzidas em 50% e o easing torna-se linear. |
| **Exemplo** | Uma confirmação de hipótese (intenção: confirmar) dura 400ms com ease-out. Um insight (intenção: surpreender) dura 800ms com ease-out e overshoot. |

---

## 5. Regras de Densidade

### R-D01 — Quantidade Máxima de Informação por Tela

| Campo | Valor |
|---|---|
| **Nome** | Limite de informação ativa por tela |
| **Descrição** | Nenhuma tela pode apresentar mais que 7±2 elementos de informação ativa simultaneamente. Elementos de informação ativa = blocos que exigem processamento cognitivo. |
| **Valor/Parâmetro** | Máximo: 9 elementos. Ideal: 5 elementos. Mínimo: 3 elementos (para não parecer vazio). |
| **Exceções** | O painel cognitivo pode ter até 9 indicadores porque o empresário já os conhece e não exige processamento novo a cada olhada. Uma grelha 4x5 de cobertura conta como 1 elemento (é um padrão reconhecível). |
| **Exemplo** | Na conversa: (1) saudação, (2) pergunta atual, (3) campo de texto, (4) botão enviar, (5) painel cognitivo compacto = 5 elementos. Ideal. |

### R-D02 — Proporção de Espaços Vazios

| Campo | Valor |
|---|---|
| **Nome** | Relação conteúdo / espaço vazio |
| **Descrição** | A proporção mínima de espaço vazio em qualquer tela da experiência principal. Espaço vazio não é desperdício — é recurso de fluência perceptual. |
| **Valor/Parâmetro** | Mínimo: 30% de espaço vazio. Ideal: 40-50%. Máximo aceitável de conteúdo: 70% da área da tela. |
| **Exceções** | O painel cognitivo pode ter até 80% de ocupação (é uma tela de monitoramento, não de descoberta). Em mobile, a proporção mínima cai para 20% (viewport limitado). |
| **Exemplo** | Tela de conversa desktop: a área de conversa ocupa ~40% da largura (720px centralizados), painel cognitivo ~25% (360px), espaço vazio ~35% (laterais e entre elementos). |

### R-D03 — Complexidade por Card

| Campo | Valor |
|---|---|
| **Nome** | Limite de conteúdo por card de mensagem |
| **Descrição** | Nenhum card de mensagem da IA pode conter mais que 3 linhas de texto ou 1 parágrafo + 1 dado numérico. Informações extensas são quebradas em múltiplos cards. |
| **Valor/Parâmetro** | Máximo: 3 linhas ou 200 caracteres por card. Recomendado: 1-2 linhas ou 80-120 caracteres. |
| **Exceções** | Cards de resumo parcial podem ter até 6 bullet points (são intencionalmente densos). Cards de recomendação podem ter até 4 linhas (contexto + recomendação + impacto + confiança). |
| **Exemplo** | IA: "Notei que seus clientes estão concentrados." (1 linha) — badge aparece. IA: "Três clientes representam 72% da receita. Isso é arriscado." (2 linhas) — segundo card. IA: "Quer ver quem são?" (1 linha) — terceiro card. |

---

## 6. Regras de Respiração

### R-RE01 — Margens Mínimas de Tela

| Campo | Valor |
|---|---|
| **Nome** | Margens de segurança da viewport |
| **Descrição** | Toda tela da experiência principal deve ter uma margem interna que nenhum elemento ultrapassa. O conteúdo "respira" dentro destas margens. |
| **Valor/Parâmetro** | Desktop (>1024px): 48px laterais, 32px superior e inferior. Tablet (768-1024px): 32px laterais, 24px superior e inferior. Mobile (<768px): 16px laterais, 16px superior e inferior. |
| **Exceções** | Animações de fundo e elementos decorativos podem ultrapassar as margens. O painel cognitivo pode encostar na margem direita. |
| **Exemplo** | No desktop, a área de conversa começa a 48px da borda esquerda. O painel cognitivo termina a 48px da borda direita. Nenhum texto, botão ou card invade estas margens. |

### R-RE02 — Áreas de Descanso Visual

| Campo | Valor |
|---|---|
| **Nome** | Zonas de respiro entre blocos de conteúdo |
| **Descrição** | Entre blocos de conteúdo funcionalmente diferentes, deve haver uma área de descanso visual — espaço vazio intencional que separa seções. |
| **Valor/Parâmetro** | Entre blocos diferentes: mínimo 32px (2xl). Recomendado: 48px (3xl). Entre seções da tela: mínimo 48px. |
| **Exceções** | Entre elementos do mesmo bloco funcional (ex: badges dentro de um card), a distância pode ser 8px (sm). |
| **Exemplo** | Entre o card da última mensagem e o campo de texto: 32px. Entre o campo de texto e os indicadores de rodapé: 48px. Entre o cabeçalho (logo + painel) e a conversa: 24px. |

### R-RE03 — Espaçamento entre Cards de Mensagem

| Campo | Valor |
|---|---|
| **Nome** | Vertical spacing entre mensagens consecutivas |
| **Descrição** | Mensagens consecutivas no histórico têm espaçamento fixo que permite leitura fluida sem parecer aglomerado. |
| **Valor/Parâmetro** | Entre mensagens do mesmo turno (IA + resposta do empresário): 12px. Entre turnos diferentes: 24px. Entre seções da conversa (após resumo): 32px. |
| **Exceções** | Se uma mensagem é um insight, o espaçamento para a próxima mensagem é de 32px (mais espaço para processamento). |
| **Exemplo** | Card da IA (pergunta) → 12px → Card do empresário (resposta) → 24px → Card da IA (próxima pergunta). |

---

## 7. Regras de Foco

### R-F01 — Determinação do Elemento Focal por Estado

| Campo | Valor |
|---|---|
| **Nome** | Elemento focal obrigatório por estado |
| **Descrição** | Em cada estado da interface, exatamente um elemento é o foco visual principal. Os demais elementos são periféricos e não competem com o foco. |
| **Valor/Parâmetro** | **E1 (Landing):** Formulário de entrada. **E2 (Onboarding):** Saudação da IA. **E3 (Conversa):** Mensagem atual da IA. **E4 (Pensando):** Indicador narrativo de pensamento. **E5 (Insight):** Anúncio da descoberta (✦ + texto). **E6 (Resumo):** Card de resumo parcial. **E7 (Conclusão):** Diagnóstico completo. |
| **Exceções** | Se o empresário está digitando, o campo de texto torna-se o elemento focal temporário. Após o envio, o foco retorna à IA. |
| **Exemplo** | Em E5 (Insight), o ✦ e o texto do insight estão no centro com destaque (glow, cor diferente). O painel cognitivo está em segundo plano. O campo de texto está desabilitado. Nada compete com o insight. |

### R-F02 — Guias de Olhar

| Campo | Valor |
|---|---|
| **Nome** | Direção do olhar guiado |
| **Descrição** | O layout é projetado para guiar o olhar do empresário em uma sequência específica, nunca aleatória. O olhar nunca é abandonado. |
| **Valor/Parâmetro** | Sequência de leitura obrigatória: Canto superior esquerdo (identidade) → Centro (conteúdo principal) → Canto inferior direito (ação/próximo passo). A leitura é sempre Z (ocidental) ou F (digital), nunca dispersa. |
| **Exceções** | Em telas de insight, a sequência é: Centro (✦) → Direita (evidência) → Esquerda (contexto). O olhar é guiado para a descoberta. |
| **Exemplo** | O empresário chega na conversa: olha para o logo (canto superior esquerdo), move para a saudação da IA (centro), lê a pergunta (centro), desce para o campo de texto (centro inferior), vê o painel cognitivo (direita) como informação periférica. |

### R-F03 — O que Nunca Pode Competir com o Foco Atual

| Campo | Valor |
|---|---|
| **Nome** | Proibição de concorrência visual |
| **Descrição** | Durante um estado focal, certos elementos não podem se mover, mudar de cor, aparecer ou desaparecer. Eles congelam até o fim do estado. |
| **Valor/Parâmetro** | Durante insight (E5): nenhum badge pode aparecer no painel, nenhuma barra pode se mover, nenhum card pode entrar/sair. Durante pensamento (E4): o campo de texto fica desabilitado, o painel não atualiza. Durante digitação do empresário: nenhuma animação ocorre, nenhum elemento novo aparece. |
| **Exceções** | Indicador de timeout (8s sem resposta) pode aparecer mesmo durante E5, pois é mais urgente que o insight. |
| **Exemplo** | A IA está exibindo um insight. O painel cognitivo detecta uma nova lacuna. Ela espera — não aparece agora. Aparece 3s depois, quando o destaque do insight termina e o foco retorna à conversa normal. |

---

## 8. Regras de Contraste

### R-C01 — Contraste Mínimo entre Elementos

| Campo | Valor |
|---|---|
| **Nome** | Relação de contraste mínima |
| **Descrição** | Todos os elementos textuais e interativos devem atender ao contraste mínimo para garantir legibilidade em qualquer condição de iluminação. |
| **Valor/Parâmetro** | Texto principal sobre fundo: relação ≥ 7:1 (AAA WCAG). Texto secundário sobre fundo: ≥ 4.5:1 (AA WCAG). Badges e indicadores: ≥ 3:1 com o fundo do card. Elementos não-interativos (decorativos): ≥ 2:1. |
| **Exceções** | Elementos desabilitados podem ter contraste reduzido (≥ 2:1). Modo escuro segue os mesmos valores, mas com cores invertidas. |
| **Exemplo** | Texto da IA (#1E293B) sobre fundo branco (#FFFFFF) = contraste ~15:1. Texto secundário (#64748B) sobre fundo branco = contraste ~5:1. Badge verde de confiança (#059669) sobre fundo do card (#F8FAFC) = contraste ~4:1. |

### R-C02 — Contraste Semântico (Importância = Contraste)

| Campo | Valor |
|---|---|
| **Nome** | Contraste como função da importância |
| **Descrição** | Quanto mais importante é um elemento para a decisão atual, maior seu contraste com o fundo. Importância zero = contraste zero (elemento desaparece). |
| **Valor/Parâmetro** | Importância crítica: contraste ≥ 10:1. Importância alta: contraste ≥ 7:1. Importância média: contraste ≥ 4.5:1. Importância baixa: contraste ≥ 2:1. Importância nula: elemento oculto ou opacidade < 20%. |
| **Exceções** | Elementos de identidade (logo) mantêm contraste fixo independentemente da importância contextual. |
| **Exemplo** | Durante um insight crítico: o texto do insight tem contraste 12:1 (preto sobre fundo claro). O badge de confiança tem 7:1. O timestamp tem 3:1. O painel cognitivo tem 4.5:1. A hierarquia de contraste reflete a hierarquia de importância. |

### R-C03 — Fundos vs Conteúdo

| Campo | Valor |
|---|---|
| **Nome** | Relação entre fundo e camada de conteúdo |
| **Descrição** | Fundos nunca competem com o conteúdo. Fundos são sempre neutros, com textura mínima ou nenhuma. Conteúdo sempre se destaca do fundo por contraste, não por textura. |
| **Valor/Parâmetro** | Fundo da tela: cor sólida, sem textura, sem gradiente (a menos que seja parte da identidade). Variação máxima de luminosidade no fundo: 10%. Cards: fundo 5-10% mais claro/escuro que o fundo da tela. Sombras: suaves, nunca excedendo 4px de blur. |
| **Exceções** | O fundo do loading inteligente pode ser escuro (near-black) para destacar as animações de processamento. |
| **Exemplo** | Fundo da tela: #F8FAFC (quase branco). Card da IA: #FFFFFF (branco) com sombra de 2px blur. Card do empresário: tom primário com 10% opacidade (azul claro). A diferença entre fundo e card é sutil mas suficiente para criar hierarquia. |

---

## 9. Regras de Prioridade

### R-P01 — Ordering Visual Fixo

| Campo | Valor |
|---|---|
| **Nome** | Ordem de aparecimento e posicionamento |
| **Descrição** | Em cada tela, os elementos têm uma ordem fixa de posicionamento que não varia. O empresário sabe onde encontrar cada tipo de informação. |
| **Valor/Parâmetro** | **Conversa (topo para base):** 1. Cabeçalho (logo + painel cognitivo), 2. Histórico de mensagens, 3. Mensagem atual, 4. Campo de texto, 5. Indicadores de rodapé. **Painel cognitivo (topo para base):** 1. Nível + Clareza + Confiança, 2. Mapa cognitivo, 3. Hipóteses ativas, 4. Lacunas. |
| **Exceções** | Em mobile, o painel cognitivo pode ser recolhido para bottom sheet, mas a ordem interna se mantém. |
| **Exemplo** | O empresário sabe que, abaixo da última mensagem, sempre encontra o campo de texto. Acima da última mensagem, sempre o histórico. À direita, sempre o painel. Consistência absoluta. |

### R-P02 — O Que Sempre Fica Acima

| Campo | Valor |
|---|---|
| **Nome** | Elementos que nunca podem ser ocultados |
| **Descrição** | Certos elementos são obrigatoriamente visíveis em todos os estados da experiência principal. Eles nunca podem ser colapsados, rolados para fora ou ocultados. |
| **Valor/Parâmetro** | Sempre visíveis: última mensagem da IA (centro), campo de texto (base da conversa), indicador do estado da IA (ativo/pensando/ocioso), identidade da Ponte (logo ou nome). |
| **Exceções** | Durante exibição de insight (E5), o campo de texto pode ficar desabilitado, mas ainda visível. Em tela cheia de diagnóstico, a identidade da Ponte pode ser reduzida a um ícone mínimo. |
| **Exemplo** | Mesmo durante o loading inteligente (que escurece a tela), a identidade da Ponte permanece visível no topo. O empresário nunca se sente "fora" da experiência. |

### R-P03 — O Que Pode Ser Colapsado

| Campo | Valor |
|---|---|
| **Nome** | Elementos colapsáveis por viewport |
| **Descrição** | Em viewports menores, certos elementos podem ser colapsados (ocultados sob demanda) para liberar espaço, desde que o acesso seja intuitivo. |
| **Valor/Parâmetro** | **Colapsável:** painel cognitivo (em <1024px), histórico de mensagens antigas (em <768px), indicadores de rodapé (em <480px). **Forma de colapso:** swipe up para bottom sheet (painel), scroll infinito (histórico), ocultação com indicador (rodapé). |
| **Exceções** | O campo de texto nunca é colapsável. A última mensagem da IA nunca é colapsável. |
| **Exemplo** | Em mobile, o painel cognitivo não está visível. Há um ícone no topo com o número de indicadores. O empresário desliza para cima e o painel aparece como bottom sheet ocupando 60% da tela. |

### R-P04 — O Que Pode Ser Ocultado

| Campo | Valor |
|---|---|
| **Nome** | Elementos ocultáveis em estados específicos |
| **Descrição** | Durante estados específicos (insight, erro, processamento), elementos de prioridade baixa podem ser completamente ocultados para não competir com o foco. |
| **Valor/Parâmetro** | **Ocultável durante E5 (insight):** indicadores de rodapé, badges de lacuna, contadores de perguntas. **Ocultável durante E4 (pensando):** painel cognitivo (mantém apenas indicador de busca). **Ocultável durante digitação:** animações periféricas, badges não-críticos. |
| **Exceções** | O indicador de confiança nunca é ocultado — é um elemento permanente (seção 3). |
| **Exemplo** | Durante um insight, os indicadores "Cobertura: 45%", "Perguntas restantes: 3" e "Lacunas: 2" somem. Apenas o insight e a confiança permanecem. Após 3s, os indicadores retornam com fade. |

---

## 10. Regras de Movimento

### R-M01 — Direção de Animações

| Campo | Valor |
|---|---|
| **Nome** | Semântica de direção |
| **Descrição** | Cada direção de animação carrega um significado específico. A direção não é decorativa — comunica o tipo de transição. |
| **Valor/Parâmetro** | **Esquerda → Direita:** Progresso, avanço, completude (ex: barra de conhecimento preenchendo). **Direita → Esquerda:** Retorno, revisão, refinamento (ex: card sendo descartado). **Cima → Baixo:** Revelação, descoberta, expansão (ex: card de insight aparecendo). **Baixo → Cima:** Confirmação, conclusão, estabilização (ex: confirmação "✓" subindo). **Zoom in:** Aprofundamento, foco, detalhe (ex: expandir card de hipótese). **Zoom out:** Contexto, visão geral, distanciamento (ex: recolher card expandido). |
| **Exceções** | Fade (sem direção) é usado para elementos que não representam progresso: badges, timestamps, elementos decorativos. |
| **Exemplo** | Novo insight aparece de baixo para cima (revelação). Confirmação de hipótese sobe da base do card para o topo (conclusão). Correção de hipótese desliza para a esquerda (revisão). |

### R-M02 — Velocidade por Hierarquia

| Campo | Valor |
|---|---|
| **Nome** | Velocidade conforme o nível hierárquico |
| **Descrição** | Elementos de maior hierarquia visual se movem mais lentamente (dignidade). Elementos de menor hierarquia se movem mais rápido (eficiência). |
| **Valor/Parâmetro** | **Hierarquia 1 (foco atual):** 400-600ms (ex: card de insight). **Hierarquia 2 (relacionados):** 300-400ms (ex: badge de confiança). **Hierarquia 3 (periféricos):** 200-300ms (ex: atualização de contador). **Hierarquia 4 (decorativos):** 100-200ms (ex: brilho de fundo). |
| **Exceções** | Mensagens de erro ignoram hierarquia — aparecem em 200ms independentemente da posição. |
| **Exemplo** | O ✦ do insight (hierarquia 1) aparece em 500ms com ease-out. O texto do insight (hierarquia 1) slide up em 400ms. O badge de confiança (hierarquia 2) aparece em 300ms. O fundo escurece (hierarquia 4) em 200ms. |

### R-M03 — Easing por Estado Cognitivo

| Campo | Valor |
|---|---|
| **Nome** | Curva de easing conforme o estado mental da IA |
| **Descrição** | O easing da animação varia conforme o estado cognitivo que a IA está comunicando. Estados diferentes usam curvas diferentes. |
| **Valor/Parâmetro** | **Estado orgânico (pensando, analisando, descobrindo):** cubic-bezier(0.34, 1.56, 0.64, 1) — com overshoot suave, como um galho balançando até parar. **Estado mecânico (confirmando, concluindo, sistema):** cubic-bezier(0.4, 0, 0.2, 1) — vai e para, sem overshoot. **Estado natural (interação direta: clique, hover, foco):** ease-out padrão — suave e previsível. |
| **Exceções** | Em modo "reduzir movimento", todo easing torna-se linear (0, 0, 1, 1) e a duração é cortada em 50%. |
| **Exemplo** | Card de hipótese aparecendo no painel: orgânico (overshoot) porque representa o pensamento da IA. Modal de confirmação aparecendo: mecânico (sem overshoot) porque é ação de sistema. |

### R-M04 — Sobreposição de Movimentos

| Campo | Valor |
|---|---|
| **Nome** | Fila e prioridade de animações simultâneas |
| **Descrição** | Animações nunca ocorrem simultaneamente se competem pela atenção. Seguem uma fila com prioridade. |
| **Valor/Parâmetro** | **Fila de prioridade (maior para menor):** 1. Erro/timeout, 2. Insight/descoberta, 3. Confirmação de hipótese, 4. Atualização de painel, 5. Nova pergunta, 6. Atualização de barra. **Regra:** Máximo de 1 animação ativa por vez em cada quadrante da tela (dividir em 4 quadrantes). |
| **Exceções** | Durante insight, as animações subordinadas (✦ + texto + badge + painel) podem ocorrer em cascata desde que sigam a sequência definida (ver MICROINTERACOES.md seção "Insight Aparece"). |
| **Exemplo** | O empresário confirma uma hipótese. Simultaneamente, o motor detecta um padrão. A confirmação (prioridade 3) executa primeiro (400ms). Após 500ms do fim da confirmação, o insight (prioridade 2) executa (800ms). Eles não se sobrepõem. |

### R-M05 — Duração por Intenção

| Campo | Valor |
|---|---|
| **Nome** | Tabela de duração por tipo de intenção |
| **Descrição** | Cada microinteração tem duração definida pelo seu propósito comunicativo, não por conveniência técnica. |
| **Valor/Parâmetro** | **Transições de tela:** Login → Conversa: 600ms, Pergunta → Resposta: 300-800ms (variável), Pensando → Insight: 500ms, Resumo parcial: 700ms, Diagnóstico final: 800ms. **Microinterações:** IA aparece: 600ms, Empresário envia: 300ms, IA recebe: 200ms, IA começa a pensar: 200ms, IA termina de pensar: 300ms, Nova pergunta: 400ms, Insight: 800ms (entrada). |
| **Exceções** | Primeira visita do empresário: todas as animações são 1.5x mais lentas. Empresário experiente (>30 sessões): 0.75x mais rápidas. |
| **Exemplo** | Na primeira visita, a saudação da IA aparece em 900ms (600ms * 1.5). As perguntas são mais lentas. Na 40ª visita, a saudação aparece em 450ms (600ms * 0.75). A IA é mais direta. |

### R-M06 — Inibição de Movimento

| Campo | Valor |
|---|---|
| **Nome** | Situações em que movimentos são suspensos |
| **Descrição** | Durante certos estados do empresário, todo movimento na interface é suspenso para não competir com a atenção dele. |
| **Valor/Parâmetro** | **Suspender durante:** empresário digitando, empresário lendo relatório, empresário preenchendo dados financeiros, modo "Foco" ativado, chamada de vídeo/áudio. **Retomar após:** 500ms da última ação do empresário. |
| **Exceções** | O indicador de timeout (8s) não é suspenso — é mais importante que a regra de inibição. |
| **Exemplo** | O empresário está digitando uma resposta longa. A IA detecta um padrão, mas não mostra — espera. 500ms após o empresário terminar de digitar, o insight começa a aparecer. |

---

## Anexo A — Tabela Resumo de Parâmetros

| Categoria | Parâmetro | Valor |
|---|---|---|
| Espaçamentos | Padding mínimo entre elementos | 8px |
| Espaçamentos | Escala de espaçamentos | xs:4, sm:8, md:16, lg:24, xl:32, 2xl:48, 3xl:64 |
| Hierarquia | Proporção primário:secundário:terciário | 4:2:1 |
| Hierarquia | Opacidade decrescente do histórico | 100% → 70% → 40% → 20% |
| Ritmo | Intervalo mínimo entre elementos | 200ms |
| Ritmo | Máximo de eventos por segundo | 3 |
| Tempo | Tolerância máxima clique → feedback | 150ms |
| Tempo | Tolerância máxima resposta IA factual | 2s |
| Densidade | Máximo de elementos ativos por tela | 7±2 |
| Densidade | Proporção mínima de espaço vazio | 30% |
| Respiração | Margem mínima desktop | 48px |
| Respiração | Margem mínima mobile | 16px |
| Contraste | Mínimo texto principal | 7:1 |
| Contraste | Mínimo texto secundário | 4.5:1 |
| Movimento | Easing orgânico | cubic-bezier(0.34, 1.56, 0.64, 1) |
| Movimento | Easing mecânico | cubic-bezier(0.4, 0, 0.2, 1) |
| Movimento | Duração insight | 800ms |
| Movimento | Duração transição de tela | 400-600ms |
| Foco | Máximo de quadro | O quadrante com animação ativa |

---

## Anexo B — Guia Rápido de Decisão Visual

Para qualquer decisão visual na implementação, responder:

1. **Estado:** Em que estado da tela isso aparece? (E1-E7)
2. **Hierarquia:** Qual a posição na ordem de atenção? (1-5)
3. **Intenção:** O que isso comunica? (confirmar/notificar/transicionar/surpreender/celebrar/corrigir)
4. **Direção:** Qual direção de movimento? (progresso/revisão/revelação/conclusão)
5. **Easing:** Estado cognitivo associado? (orgânico/mecânico/natural)
6. **Tempo:** Duração adequada para a intenção?
7. **Concorrência:** Nada mais compete com esse elemento agora?

Se as 7 perguntas estiverem respondidas, a implementação visual está alinhada.

---

*Este documento é parte do Programa 23 — Arquitetura da Experiência Cognitiva.*
*Toda implementação visual da Ponte Digital deve seguir estas regras. Violações devem ser documentadas em KNOWN_ISSUES.md.*
