# Sistema Oficial de Movimento

> Cada movimento precisa ter significado. Nunca decorar.
> Este documento define todos os movimentos da interface da Ponte Digital, seus parâmetros, significados e regras de composição.

---

## 1. Princípios de Movimento

### 1.1 Direção comunica relação

| Direção | Significado | Uso principal |
|---|---|---|
| Slide up | Novo, chegando, aparecendo | Cards, mensagens, conteúdo novo |
| Slide down | Passado, retornando, sumindo | Toasts, notificações, conteúdo saindo |
| Slide right → left | Avançar, próximo, aprofundar | Sheets, drill-down, navegação progressiva |
| Slide left → right | Voltar, anterior, retornar | Voltar de drill-down, fechar sheet |
| Fade | Neutro, transição suave | Transições de tela, mudanças de estado |
| Scale | Destaque, foco, importância | Modais, insights, expansão de card |

### 1.2 Velocidade comunica confiança

| Velocidade | Duração | Significado | Exemplos |
|---|---|---|---|
| Instantâneo | < 100ms | Confiança total, sem hesitação | Confirmações, feedback de ação |
| Rápido | 150-250ms | Confiante, direto | Toasts, transições simples |
| Normal | 300-400ms | Natural, padrão | Cards aparecendo, transições |
| Pensado | 400-600ms | Calculado, importante | Insights, decisões, conteúdo complexo |
| Lento | 600-1200ms | Muito importante, WOW | Destaques especiais, revelações |

Regra: quanto MAIS importante o elemento, MAIS LENTO ele se move para que o empresário processe.

### 1.3 Easing comunica personalidade

| Easing | Curva | Personalidade | Uso |
|---|---|---|---|
| ease-out | Início rápido, desacelera | Natural, orgânico | Aparição de elementos (padrão) |
| ease-in | Início lento, acelera | Entrada, foco | Saída de elementos |
| ease-in-out | Suave nos dois extremos | Calculado, artificial | Movimentos contínuos, cíclicos |
| linear | Velocidade constante | Mecânico, preciso | Barras de progresso |
| spring | Estica antes de parar | Lúdico, vibrante | NUNCA usar (exceto onboarding) |
| bounce | Quica ao final | Divertido | NUNCA usar |

Regra: Preferir SEMPRE ease-out. ease-out é o easing mais natural para o olho humano.

### 1.4 Sobreposição comunica hierarquia

O que se move primeiro é mais importante.

| Ordem de movimento | Significado |
|---|---|
| 1º elemento a se mover | O mais importante da tela |
| 2º elemento a se mover | Segundo mais importante |
| Último elemento | O menos importante |
| Simultâneo (mesmo timing) | Mesmo nível hierárquico |

Regra de stagger (movimento em cascata):
- Intervalo entre elementos: 50-100ms
- Elementos do mesmo grupo: mismo intervalo
- Elementos de grupos diferentes: 100ms entre grupos
- Stagger sempre do MAIS importante para o MENOS importante

---

## 2. Tabela Completa de Movimentos

### 2.1 Movimentos de elementos

| Movimento | Direção | Duração | Easing | Delay | Significado |
|---|---|---|---|---|---|
| Card aparece | Slide up (20px) + fade | 300ms | ease-out | 0ms | Novo conteúdo disponível |
| Card sai | Fade + scale 0.95 | 200ms | ease-in | 0ms | Conteúdo removido |
| Card realça | Scale 1.0 → 1.02 | 400ms | ease-out | 0ms | Foco em card específico |
| Card desseleciona | Scale 1.02 → 1.0 | 300ms | ease-in | 0ms | Perdeu o foco |
| Card expande | Vertical scale, revela conteúdo | 400ms | ease-out | 0ms | Revelar detalhes ocultos |
| Card colapsa | Vertical scale reverse | 300ms | ease-in | 0ms | Esconder detalhes |
| Card arrasta | Follow pointer | 0ms | linear | 0ms | Rearranjo manual |

### 2.2 Movimentos de mensagens

| Movimento | Direção | Duração | Easing | Delay | Significado |
|---|---|---|---|---|---|
| Mensagem IA aparece | Slide up (20px) + fade | 400ms | ease-out | 200ms* | Nova informação do assistente |
| Mensagem IA (bloco) | Slide up (10px) + fade | 300ms | ease-out | 150ms** | Bloco de resposta do assistente |
| Mensagem empresário | Slide up (15px) + fade | 300ms | ease-out | 0ms | Resposta enviada pelo empresário |
| Mensagem de erro | Fade in | 200ms | ease-out | 0ms | Erro aparecendo |
| Mensagem de sistema | Fade in | 150ms | ease-out | 0ms | Notificação de sistema |
| Indicador digitando | Pontos pulsando | 1s cycle | ease-in-out | 0ms | Empresário está digitando |
| Indicador pensando | Pontos pulsando | 1s cycle | ease-in-out | 0ms | IA está processando |

* Delay de 200ms antes da mensagem da IA aparecer = "processamento simbólico"
** Intervalo entre blocos de uma mesma mensagem

### 2.3 Movimentos de transição

| Movimento | Direção | Duração | Easing | Delay | Significado |
|---|---|---|---|---|---|
| Transição de tela | Fade | 400ms | ease-out | 0ms | Mudança de contexto |
| Transição de tela (avanço) | Slide left → right | 350ms | ease-out | 0ms | Navegação para tela mais profunda |
| Transição de tela (retorno) | Slide right → left | 300ms | ease-out | 0ms | Navegação de volta |
| Transição de aba | Fade | 300ms | ease-out | 0ms | Troca de aba |
| Transição de seção | Slide up | 350ms | ease-out | 0ms | Seção dentro da mesma tela |

### 2.4 Movimentos de modal e sheet

| Movimento | Direção | Duração | Easing | Delay | Significado |
|---|---|---|---|---|---|
| Modal abre | Scale 0.95 → 1 + overlay fade | 300ms | ease-out | 0ms | Foco total, bloqueia interação |
| Modal fecha | Scale 1 → 0.95 + overlay fade | 250ms | ease-in | 0ms | Fim do foco total |
| Sheet abre | Slide from right | 350ms | ease-out | 0ms | Foco parcial, mantém contexto |
| Sheet fecha | Slide to right | 300ms | ease-in | 0ms | Retorno ao contexto anterior |
| Sheet mobile | Slide up from bottom | 350ms | ease-out | 0ms | Sheet em dispositivos móveis |
| Tooltip abre | Fade + slide up (5px) | 200ms | ease-out | 300ms | Informação adicional |
| Tooltip fecha | Fade + slide down (5px) | 150ms | ease-in | 0ms | Informação lida |
| Menu dropdown abre | Scale Y + fade | 200ms | ease-out | 0ms | Opções disponíveis |
| Menu dropdown fecha | Scale Y reverse + fade | 150ms | ease-in | 0ms | Opções fechadas |

### 2.5 Movimentos de notificação

| Movimento | Direção | Duração | Easing | Delay | Significado |
|---|---|---|---|---|---|
| Toast aparece | Slide down (10px) + fade | 250ms | ease-out | 0ms | Notificação de ação/evento |
| Toast sai | Fade + slide up (10px) | 200ms | ease-in | 3000-5000ms* | Notificação lida/descartada |
| Badge aparece | Scale 0 → 1 | 200ms | ease-out | 0ms | Novo item/notificação |
| Badge desaparece | Scale 1 → 0 | 150ms | ease-in | 0ms | Item lido |
| Alerta crítico | Vibração sutil (2px) | 300ms (3 ciclos) | ease-in-out | 0ms | Situação urgente |

* Toast auto-dismiss: 3s para notificações comuns, 5s para alertas importantes

### 2.6 Movimentos de progresso e dados

| Movimento | Direção | Duração | Easing | Delay | Significado |
|---|---|---|---|---|---|
| Barra preenche | Horizontal fill (esq → dir) | 600ms | ease-out | 0ms | Progresso de carregamento |
| Barra preenche (ação) | Horizontal fill | 400ms | ease-out | 0ms | Progresso de ação confirmada |
| Anel preenche | Radial fill (clockwise) | 600ms | ease-out | 0ms | Nível de confiança |
| Anel preenche (score) | Radial fill | 800ms | ease-out | 0ms | Score/pontuação |
| Número incrementa | Contagem vertical | 400ms | ease-out | 0ms | Atualização de valor |
| Gráfico anima | Scale Y (barras) / fade (linhas) | 600ms | ease-out | 100ms (stagger) | Dados carregados |
| Lista atualiza | Row slide in | 300ms | ease-out | 50ms (stagger) | Novos itens na lista |

### 2.7 Movimentos de avatar e IA

| Movimento | Direção | Duração | Easing | Delay | Significado |
|---|---|---|---|---|---|
| Avatar respirando | Scale 1 → 1.02 → 1 | 3s cycle | ease-in-out | 0ms | IA presente, ativa |
| Avatar escutando | Inclinação 5° forward | 300ms | ease-out | 0ms | IA focada no empresário |
| Avatar falando | Onda sonora sutil na borda | 400ms (ciclo) | ease-out | 0ms | IA está respondendo |
| Avatar pensando | Pontos pulsando (3 pontos) | 1s cycle | ease-in-out | 0ms | IA processando |
| Avatar transita (presente→falando) | Scale 40px → 64px + fade | 300ms | ease-out | 0ms | Início da fala |
| Avatar transita (falando→presente) | Scale 64px → 40px + fade | 300ms | ease-in | 200ms | Fim da fala |
| Avatar transita (presente→invisível) | Scale 40px → 24px + fade | 400ms | ease-out | 0ms | Empresário focado |
| Avatar insight | Scale + glow (64px + brilho) | 500ms + 3s hold | ease-out | 0ms | Momento WOW |
| Avatar erro | Vibração leve (2px horizontal) | 150ms (3 ciclos) | ease-in-out | 0ms | Erro detectado |

### 2.8 Movimentos especiais

| Movimento | Direção | Duração | Easing | Delay | Significado |
|---|---|---|---|---|---|
| Insight destaque | Scale 1 → 1.05 + glow | 500ms + 3s hold | ease-out | 200ms | Descoberta importante |
| Confetti/celebração | Partículas para cima | 1500ms | ease-out | 0ms | Conquista, meta batida |
| Loading inicial | Skeleton pulse | 1.5s cycle | ease-in-out | 0ms | Conteúdo carregando |
| Scroll suave | Vertical | 400ms | ease-out | 0ms | Navegação por âncora |
| Hover (elemento clicável) | Scale 1 → 1.02 + shadow | 200ms | ease-out | 0ms | Elemento interativo |
| Hover (botão) | Background color transition | 200ms | ease-out | 0ms | Botão interativo |
| Click feedback | Scale 1 → 0.97 → 1 | 150ms | ease-out | 0ms | Confirmação de clique |
| Drag feedback | Scale 1 → 1.05 + shadow | 200ms | ease-out | 0ms | Item sendo arrastado |
| Drop feedback | Scale 1.05 → 1 + shadow fade | 200ms | ease-in | 0ms | Item solto no destino |

---

## 3. Regras de Composição de Movimento

### 3.1 Movimento SEMPRE tem propósito

Nenhum movimento existe por razão estética. Todo movimento comunica algo.

Checklist de propósito para cada movimento:
- [ ] O que este movimento comunica? (aparecendo, sumindo, mudando, destacando, processando)
- [ ] O empresário precisa saber disso agora?
- [ ] Este movimento ajuda ou atrapalha a compreensão?
- [ ] Sem este movimento, a experiência seria pior?

Se um movimento não passa no checklist: remova-o.

### 3.2 Duração varia com importância

| Importância do elemento | Duração da animação | Exemplos |
|---|---|---|
| Crítico (insight, decisão, erro) | 500-1200ms | Insight destaque, erro crítico, recomendação |
| Importante (transição, card, mensagem) | 300-500ms | Card aparece, transição de tela |
| Normal (feedback, notificação) | 200-300ms | Toast, tooltip, hover |
| Sutil (indicador, respiração) | 1-3s (cíclico) | Avatar respirando, loading |

### 3.3 Movimentos nunca conflitam

Dois movimentos nunca ocorrem em direções opostas simultaneamente.

Exemplos de conflito proibido:
- Elemento A subindo (slide up) + Elemento B descendo (slide down)
- Modal abrindo (scale up) + Card fechando (scale down)
- Sheet abrindo (slide right) + Sheet anterior fechando (slide left)

Exceção: se os movimentos estão em zonas visuais DISTINTAS da tela (superior vs. inferior, esquerda vs. direita com gap visível entre elas), o conflito é tolerável mas deve ser evitado.

### 3.4 Stagger (movimento em cascata)

Quando múltiplos elementos do mesmo tipo aparecem:

| Quantidade de elementos | Intervalo entre eles | Exemplo |
|---|---|---|
| 2-3 elementos | 80ms | Cards de decisão |
| 4-6 elementos | 60ms | Itens de lista |
| 7-10 elementos | 40ms | Grid de indicadores |
| 10+ elementos | 30ms | Resultados de busca |

Regras:
- Stagger sempre do topo para baixo (padrão de leitura ocidental)
- Stagger sempre da esquerda para direita (padrão de leitura ocidental)
- Exceção: se o elemento mais importante não está no canto superior esquerdo, ele se move primeiro
- Stagger nunca ultrapassa 1 segundo total (do primeiro ao último elemento)

### 3.5 Preferência por fade e slide

Fade e slide são os movimentos mais naturais para o olho humano.

Hierarquia de preferência:
1. Fade + slide up (mais natural, mais usado)
2. Fade apenas (segundo mais natural)
3. Slide horizontal (natural, mas cuidado com direção)
4. Scale (usar apenas para foco/destaque)
5. Rotação (EVITAR — reservado para loading spinners)
6. 3D / parallax / bounce / spring (NUNCA USAR)

### 3.6 Duração máxima de movimento

Nenhum movimento individual deve durar mais que 1200ms.

Se um conceito precisa de mais tempo para ser comunicado:
- Dividir em múltiplos movimentos em sequência
- Usar hold (elemento fica parado em destaque) após o movimento inicial
- Exemplo: insight = 500ms de animação + 3s de hold (não 3.5s de animação)

---

## 4. Composições de Movimento (Sequências)

### 4.1 Sequência de abertura de tela

1. (0ms) Overlay de transição fade out (se houver) — 200ms
2. (200ms) Avatar aparece (fade in) — 300ms
3. (250ms) Título da tela (slide up + fade) — 300ms
4. (350ms) Card principal (slide up + fade) — 300ms
5. (430ms) Segundo card (slide up + fade) — 300ms
6. (510ms) Terceiro card (slide up + fade) — 300ms
7. (590ms) Demais elementos (stagger, 40-80ms cada)
8. (700ms+) Animações internas (gráficos, progresso)

Duração total estimada: 900-1200ms

### 4.2 Sequência de resposta do Assistente

1. (0ms) Empresário envia mensagem (mensagem slide up + fade) — 300ms
2. (150ms) Avatar transita para "pensando" — 300ms
3. (300ms) Indicador de pensamento aparece (3 pontos pulsando)
4. (500ms) Resposta pronta — primeiro bloco (slide up + fade) — 400ms
   (Inclui delay de 200ms de "processamento simbólico")
5. (700ms) Avatar transita para "falando" + mensagem continua — 300ms
6. (850ms) Bloco 2 (slide up + fade) — 300ms
7. (1050ms) Bloco 3 (slide up + fade) — 300ms
8. (1350ms) Resposta completa + avatar transita para "presente" — 300ms
9. (1650ms) Avatar transita para "escutando" — 300ms

Duração total estimada: 2000-3000ms (dependendo do número de blocos)

### 4.3 Sequência de insight

1. (0ms) Contexto estabelecido (avatar em modo presente)
2. (200ms) Avatar transita para "insight" (scale + glow) — 500ms
3. (700ms) Card de insight aparece (scale 0.95 → 1 + glow) — 500ms
4. (1200ms) Conteúdo do insight revelado linha por linha (stagger 150ms) — 600ms
5. (1800ms) Hold: card permanece em destaque por 3s
6. (4800ms) Glow desaparece gradualmente — 500ms
7. (5300ms) Card retorna ao tamanho normal — 300ms
8. (5600ms) Avatar retorna ao modo presente

Duração total: ~5.6 segundos (hold incluso)

### 4.4 Sequência de erro

1. (0ms) Erro detectado
2. (0ms) Avatar vibra (2px, 3 ciclos) — 150ms
3. (150ms) Toast aparece (slide down) — 250ms
4. (300ms) Card de erro aparece (fade in) — 200ms
5. (500ms) Mensagem de erro com instruções (slide up + fade) — 300ms
6. (800ms) Botão de ação "Resolver" aparece (fade in) — 200ms

Duração total: ~1000ms

---

## 5. Movimentos Proibidos

### 5.1 Proibidos em qualquer contexto

- Rotação de elementos (exceto loading spinner)
- Scale acima de 1.2 (exceto modal de foco total)
- Bounce
- Parallax
- 3D transforms
- Spring animations
- Animação infinita em elemento de conteúdo (exceto loading)
- Duas animações simultâneas concorrentes

### 5.2 Proibidos por contexto

| Contexto | Movimentos proibidos |
|---|---|
| Conversa | Scale, rotação, movimentos horizontais (confundem fluxo vertical) |
| Dashboard | Movimentos em mais de 2 cards simultaneamente |
| Decisão | Movimentos rápidos (< 200ms) — decisão precisa de calma |
| Configuração | Qualquer movimento não iniciado pelo empresário |
| Erro | Bounce, spring, ou qualquer movimento que pareça "leve" |

### 5.3 Proibidos para acessibilidade

Se o empresário tem preferência por "reduzir movimentos":

- Todos os movimentos > 200ms são reduzidos para 100ms
- Animações cíclicas (respiração, loading) são pausadas
- Stagger é removido (tudo aparece ao mesmo tempo)
- Apenas fade in/out é mantido (essencial para compreensão)
- Toast não anima (aparece instantaneamente)

---

## 6. Resumo por Elemento

| Elemento | Movimento | Duração | Easing |
|---|---|---|---|
| Card | Slide up + fade | 300ms | ease-out |
| Mensagem IA | Slide up + fade | 400ms | ease-out |
| Mensagem empresário | Slide up | 300ms | ease-out |
| Transição tela | Fade | 400ms | ease-out |
| Modal | Scale + overlay | 300ms | ease-out |
| Sheet | Slide from right | 350ms | ease-out |
| Toast | Slide down | 250ms | ease-out |
| Badge | Scale | 200ms | ease-out |
| Barra progresso | Horizontal fill | 600ms | ease-out |
| Anel confiança | Radial fill | 600ms | ease-out |
| Avatar respirando | Scale 1→1.02→1 | 3s cycle | ease-in-out |
| Avatar pensando | Pontos pulsando | 1s cycle | ease-in-out |
| Insight | Scale + glow + hold | 500ms + 3s | ease-out |
| Tooltip | Fade + slide up | 200ms | ease-out |
| Hover | Scale + shadow | 200ms | ease-out |
| Click | Scale 0.97 | 150ms | ease-out |

---

## 7. Contratos de Movimento (Resumo)

1. Todo movimento tem propósito — nunca decorativo.
2. Direção comunica relação: slide up = novo, slide down = passado, slide right = avançar, slide left = voltar.
3. Velocidade comunica confiança: mais rápido = mais confiante, mais lento = mais importante.
4. Preferir SEMPRE ease-out (natural para o olho humano).
5. O que se move primeiro é o mais importante (stagger do topo esq. para baixo dir.).
6. Duração varia com importância: crítico (500-1200ms), importante (300-500ms), normal (200-300ms).
7. Máximo 1 animação principal por vez. Máximo 2 movimentos sutis.
8. Nenhum movimento individual > 1200ms (exceto holds e ciclos).
9. Movimento conflitante (direções opostas) é proibido.
10. Preferir fade + slide up. Evitar scale, rotação, bounce, parallax, 3D.
11. Stagger: 30-80ms entre elementos, máximo 1s de stagger total.
12. Acessibilidade: "reduzir movimentos" desativa animações > 100ms e pausa ciclos.
