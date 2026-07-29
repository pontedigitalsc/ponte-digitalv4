# EXPERIÊNCIA SENSORIAL — Design da Percepção da Ponte Digital

**Programa 23 | Fase 12 | Versão 1.0**

> Este documento especifica a experiência sensorial completa da Ponte Digital: som, movimento, tato, tempo, ritmo e cadência. Não é especificação de implementação — é design de percepção. Define como o empresário *sente* a plataforma, não como ela funciona.

---

## 1. Filosofia Sensorial

A Ponte Digital não é um dashboard. É uma presença cognitiva. O empresário não deveria sentir que está "usando um sistema" — deveria sentir que está *conversando com alguém que entende do negócio dele*.

Toda decisão sensorial abaixo serve a um princípio único: **reduzir o atrito entre a dúvida do empresário e a clareza da resposta.**

### Princípios sensoriais

| Princípio | O que significa |
|---|---|
| **Presença, não intrusão** | A plataforma existe no fundo da percepção até ser necessária |
| **Movimento com significado** | Toda animação carrega informação — nunca é decorativa |
| **Ritmo orgânico** | A interface respira no ritmo da cognição humana, não no ciclo do processador |
| **Paciência calculada** | A IA espera o tempo humano, não o tempo da máquina |
| **Familiaridade evolutiva** | A interface se torna mais familiar com o uso, sem jamais entediar |

---

## 2. Sons (Opcionais)

O design de som não é implementação técnica. É especificação de *caráter* sonoro. Todos os sons são opt-in, desligados por padrão, ativáveis em Preferências > Experiência > Som Ambiente.

### 2.1 Notificação de Insight

**Quando:** A IA conecta dois pontos que o empresário não havia conectado.

**Caráter:** Um "ah" metálico suave, como uma lâmpada se acendendo dentro de um vidro grosso. Frequência média (440Hz-660Hz), caimento rápido (~300ms), com ressonância curta.

**Sensação pretendida:** Satisfação de descoberta. O som de algo que *se encaixa*.

**Volume:** 30% abaixo dos sons de notificação do sistema operacional.

### 2.2 Som de Descoberta

**Quando:** Uma nova informação relevante é revelada (barra de conhecimento avança, lacuna é preenchida).

**Caráter:** Um "ploc" líquido, como uma gota caindo em água parada. Ondas concêntricas de frequência. Grave suave (~180Hz), com harmônicos subindo para 320Hz.

**Sensação pretendida:** "Encontrei algo". Satisfação de progresso.

**Duração:** ~200ms.

### 2.3 Som de Conclusão

**Quando:** Um ciclo cognitivo se completa (diagnóstico finalizado, relatório gerado, recomendação entregue).

**Caráter:** Três notas ascendentes em intervalo de quinta justa, com caimento lento. Tom de "missão cumprida" — mas sem triunfalismo. Deve soar como um bom marcador de conversa, não como uma fanfarra.

**Sensação pretendida:** Ciclo completo. Pronto para o próximo.

**Duração:** ~800ms.

### 2.4 Som de Novo Padrão

**Quando:** A IA detecta um padrão recorrente (sazonalidade, comportamento, tendência).

**Caráter:** Ruído branco filtrado que gradualmente se cristaliza em uma nota clara. O som de *ordem emergindo do caos*. Começa difuso (~200ms), torna-se tom puro (400ms), e se sustenta por mais 200ms.

**Sensação pretendida:** "Isso tem padrão". Reconhecimento de ordem.

**Duração:** ~800ms total.

### 2.5 Som de Erro Cognitivo (Contradição)

**Quando:** O empresário fornece informação que contradiz algo dito antes.

**Caráter:** Não é um erro. É um "hum?" — tom descendente leve, como uma sobrancelha levantada em som. Frequência começa em 500Hz e desce para 300Hz.

**Sensação pretendida:** Curiosidade, não alarme. "Isso é interessante, me conta mais."

**Duração:** ~250ms.

### 2.6 Ausência Sonora (Silêncio)

Regra mais importante do design de som: **a maior parte do tempo não há som.**

A Ponte Digital só emite som quando tem algo a *comunicar*, não a *notificar*. Notificações de sistema (e-mails, convites, alertas de plano) não produzem som — apenas sinal visual.

### 2.7 Mecanismo de Adaptação de Volume

Os sons se adaptam ao ambiente percebido:

- Se o usuário não interage há >5 minutos, todos os sons reduzem 50% de volume nos próximos 3 eventos
- Se o usuário está em horário noturno (22h-6h configurável), sons usam filtro passa-baixa (graves apenas)
- Se o usuário usou fone de ouvido na última sessão, o sistema sugere ativar som na próxima

---

## 3. Feedback Tátil (Mobile)

Toda ação do empresário no mobile deve ter confirmação tátil. A vibração não é decorativa — é *confirmação de que algo relevante acabou de acontecer*.

### 3.1 Padrões de Vibração

| Evento | Padrão | Duração | Intensidade |
|---|---|---|---|
| Insight gerado | Três pulsos curtos e um longo | 600ms | Média |
| Descoberta | Pulso curto único | 50ms | Leve |
| Confirmação de ação | Pulso médio | 100ms | Leve |
| Alerta de contradição | Dois pulsos médios alternados | 300ms | Média |
| Conclusão de ciclo | Pulso longo contínuo | 400ms | Leve a média, fade out |
| Recomendação recebida | Pulso curto + pulso médio | 200ms | Média |
| Hover/feedback de botão (3D Touch) | Micro-pulso | 10ms | Mínima |

### 3.2 Regras Táteis

- **Não vibrar para erros.** Erro é visual, não tátil. Vibração em erro gera ansiedade.
- **Não vibrar para notificações de sistema.** Convites, e-mails, alertas de plano não têm feedback tátil.
- **Empresário pode silenciar vibração** em Preferências > Experiência > Feedback Tátil.
- **Modo "Não Perturbe" (configurável):** apenas insights e conclusões vibram. Descobertas e confirmações passam a ser apenas visuais.

### 3.3 Vibration Design System

A vibração segue uma gramática:

```
Pulso curto (50ms) = confirmação
Pulso médio (100ms) = informação relevante
Pulso longo (200ms+) = conclusão
Pulso alternado = atenção requerida
Sequência curta+longa = descoberta importante
```

Vibrações nunca se sobrepõem. Se dois eventos ocorrem simultaneamente, toca-se o padrão de maior prioridade (Insight > Conclusão > Recomendação > Descoberta > Confirmação > Alerta).

---

## 4. Transições Visuais

### 4.1 Sistema Base de Transições

| Transição | Duração | Easing | Quando usar |
|---|---|---|---|
| Fade | 200ms | ease-out | Aparecimento/desaparecimento de elementos leves (tags, badges) |
| Fade + Slide horizontal | 300ms | ease-in-out | Navegação entre painéis |
| Fade + Slide vertical | 250ms | ease-out | Cards surgindo |
| Scale | 150ms | ease-out | Feedback de clique em botão |
| Morph | 400ms | ease-in-out | Elemento que muda de forma (ícone para card) |
| Página cheia | 400ms | ease-in-out | Navegação entre rotas (modo SPA) |
| Página cheia pesada | 600ms | ease-in-out | Navegação entre rotas com dados carregando |

### 4.2 Overrides por Contexto

| Contexto | Override | Motivo |
|---|---|---|
| Empresário digitando | Transições suspensas | Não competir com a atenção do texto |
| Motor processando | Micro-pulsação no elemento ativo | Indicar atividade sem ruído visual |
| Mapa Cognitivo expandindo | 500ms ease-out (mais lento que padrão) | Sensação de "puxar" um painel pesado |
| Mapa Cognitivo recolhendo | 300ms ease-in | Sensação de "encaixar" de volta |
| Primeira visita (onboarding) | Todas 1.5x mais lentas | Dar tempo ao novo usuário de processar |
| Empresário experiente (>30 sessões) | Todas 0.75x mais rápidas | Não atrapalhar fluxo de quem já sabe |
| Modo escuro | Transições com opacidade 10% menor | Menos contraste para evitar fadiga |
| Estado de erro | Nenhuma animação | Informação crítica não deve ser suavizada |

### 4.3 Transições Proibidas

- **Zoom de texto/número:** valores nunca devem animar de um número para outro — são informação, não espetáculo
- **Rotação 3D:** nenhum elemento gira em 3D. Causa desorientação
- **Flip:** nenhum elemento vira de cabeça para baixo
- **Piscar (blink):** nenhum elemento pisca. Elementos que precisam de atenção usam pulsação suave de brilho
- **Stagger sem propósito:** múltiplos elementos animando em sequência só são permitidos se houver hierarquia de informação (ex: barras do mapa atualizando da mais relevante para a menos)

---

## 5. Tempo

### 5.1 Cadência da Interface

A interface da Ponte Digital não é um fluxo contínuo. É uma *conversa* — e conversas têm pausas, respirações, momentos de silêncio.

| Micro-interação | Latência tolerável | Latência ideal | Latência inaceitável |
|---|---|---|---|
| Clique → feedback visual | 50ms | <20ms | >150ms |
| Resposta simples (toggle, filtro) | 200ms | <100ms | >500ms |
| Renderização de lista filtrada | 500ms | <200ms | >1s |
| Resposta da IA (pergunta → resposta) | 2-3s | 1-2s | >5s |
| Relatório completo | 5-8s | 3-5s | >12s |

### 5.2 Ritmo da Conversa

A conversa com a IA segue um ritmo de três tempos:

1. **Pergunta da IA →** empresário lê (2-5s)
2. **Empresário digita resposta →** (5-30s, depende da complexidade)
3. **IA processa e responde →** (1-3s)

Regras de ritmo:

- **Paciência forçada:** a IA nunca interrompe o empresário digitando. Mesmo que ele pare por 30s, a IA espera.
- **Pausa pós-resposta:** a IA aguarda 600ms-1.2s *depois* que o empresário termina de digitar antes de começar a processar. Isso simula o tempo de *"deixa eu absorver o que você disse"*.
- **Tempo de digitação simulada:** quando a IA está gerando uma resposta longa (recomendação, relatório), ela "digita" a resposta a ~30 caracteres/segundo — mais lento que a leitura, rápido o bastante para não entediar.
- **Overflow cognitivo:** se a IA tem muito a dizer, ela quebra em 2-3 mensagens com 1s de intervalo entre elas, simulando pausas de respiração.

### 5.3 Paciência da IA

A IA da Ponte Digital tem três modos de paciência:

| Modo | Quando | Comportamento |
|---|---|---|
| **Atenta** | Empresário respondeu há <5s | IA processa imediatamente, resposta rápida |
| **Aguardando** | Empresário não responde há 5-30s | IA não faz nada, apenas espera. Indicador visual de "estou aqui" (bolinha pulsando) |
| **Curiosa** | Empresário não responde há >30s | IA pergunta "Está com dúvida nessa pergunta?" ou "Quer que eu reformule?" |

A IA nunca pergunta "Ainda está aí?" — isso soa passivo-agressivo. Em vez disso:

- **30s:** sugestão sutil "Posso ajudar com algo diferente?"
- **60s:** a IA oferece resumir o que foi discutido até agora
- **120s:** a IA se despede educadamente e salva o progresso

---

## 6. Movimento

### 6.1 Direção

O movimento na interface carrega significado semântico:

| Direção | Significado |
|---|---|
| **Esquerda → Direita** | Progresso, avanço, completude |
| **Direita → Esquerda** | Retorno, revisão, refinamento |
| **Cima → Baixo** | Revelação, descoberta, expansão |
| **Baixo → Cima** | Confirmação, conclusão, estabilização |
| **Zoom in** | Aprofundamento, foco, detalhe |
| **Zoom out** | Contexto, visão geral, distanciamento |

### 6.2 Profundidade

Três camadas de profundidade visual:

1. **Superfície:** texto, botões, inputs — elementos com quem o empresário interage diretamente. Sem sombra. Sem movimento próprio.
2. **Camada cognitiva:** mapas, barras, hipóteses — elementos que representam o pensamento da IA. Sombras suaves, movimento orgânico.
3. **Camada de sistema:** notificações, modais, alertas — elementos que exigem atenção. Translúcidos, com backdrop blur.

### 6.3 Hierarquia de Animações

A hierarquia define *qual elemento se move primeiro*:

1. **Elemento de foco atual** (o que o empresário está olhando/interagindo) — anima primeiro
2. **Elementos relacionados** (mesma seção, mesma área cognitiva) — animam 100ms depois
3. **Elementos periféricos** (outras seções, indicadores distantes) — animam 200ms depois
4. **Background / elementos decorativos** — animam por último (se aplicável)

Isso cria uma *onda de atenção* guiando o olhar do empresário na direção correta.

### 6.4 Movimento Orgânico vs Mecânico

| Caráter | Easing | Onde usar |
|---|---|---|
| **Orgânico** | cubic-bezier(0.34, 1.56, 0.64, 1) | Elementos cognitivos (mapa, hipóteses, conhecimento) |
| **Mecânico** | cubic-bezier(0.4, 0, 0.2, 1) | Elementos de sistema (menus, modais, painéis) |
| **Natural** | ease-out-padrão | Interações diretas (clique, hover, foco) |

A diferença: orgânico tem *overshoot* suave no final (como um galho balançando até parar). Mecânico não — vai e para.

---

## 7. Ritmo

### 7.1 Quando Acelerar

- **Após o terceiro uso consecutivo da mesma funcionalidade** — a interface assume familiaridade e reduz animações em 25%
- **Entre 8h e 10h (horário comercial)** — horário de pico de decisões. Respostas da IA são 15% mais concisas
- **No repeat de uma pergunta similar** — a IA responde mais rápido (+40% de velocidade) porque já tem o contexto quente
- **No preenchimento de formulários** — auto-avanço de campo quando a resposta é objetiva

### 7.2 Quando Desacelerar

- **Primeira vez do empresário em qualquer tela** — animações 1.5x mais lentas, textos mais explicativos
- **Após um insight importante** — pausa de 2s antes de continuar. O empresário precisa de tempo para absorver
- **Quando o empresário está editando/corrigindo** — a IA desacelera e pergunta "Entendi. Vou ajustar. Confirma?"
- **Em informações financeiras** — valores nunca mudam rapidamente. Transições numéricas têm 800ms mínimos
- **Em recomendações** — a IA entrega a recomendação, pausa 3s, e pergunta "O que acha?"

### 7.3 Quando Pausar (Silêncio de Interface)

A interface inteira *pausa* — nenhuma animação, nenhum som, nenhum movimento — quando:

- **O empresário está lendo um relatório** — movimento distrai. O relatório é texto estático
- **O empresário está preenchendo dados financeiros** — qualquer animação rouba concentração
- **Modo "Foco":** ativado manualmente pelo empresário. Interface inteira congela. Apenas o texto do chat se move
- **Chamada de vídeo/áudio:** interface entra em modo estático. O som da plataforma silencia completamente

---

## 8. Cadência

### 8.1 Velocidade da Digitação Simulada

Quando a IA "digita" a resposta em vez de aparecer instantaneamente:

| Tipo de resposta | Velocidade | Tamanho médio |
|---|---|---|
| Pergunta simples | Instantânea (sem digitação) | Até 80 caracteres |
| Resposta curta | 50 char/s | 80-200 caracteres |
| Resposta média | 35 char/s | 200-500 caracteres |
| Recomendação | 25 char/s | 500-2000 caracteres |
| Relatório | 20 char/s | 2000+ caracteres |
| Relatório com tabela | Renderiza tabela instantaneamente, digita explicação em 25 char/s | Misto |

Digitação simulada nunca ultrapassa 8 segundos. Se o conteúdo for maior, a IA entrega em blocos.

### 8.2 Timing das Respostas

O *timing* da resposta da IA comunica *confiança*:

| Tempo de resposta | O que comunica |
|---|---|
| <500ms | "Isso eu sei de cabeça" (pergunta factual, já tem o dado) |
| 500ms-2s | "Deixa eu verificar" (consulta rápida ao contexto) |
| 2s-5s | "Estou pensando" (cruzamento de dados, hipóteses) |
| 5s-10s | "Estou analisando" (processamento mais profundo) |
| >10s | "Isso é complexo, deixa eu preparar" (relatório, recomendação) |

A IA nunca responde instantaneamente perguntas complexas — mesmo que o processamento tenha sido rápido. Se a pergunta merece reflexão, a IA espera 800ms-1.5s antes de começar a responder, para parecer que *pensou*.

### 8.3 Velocidades da IA

Três modos de velocidade definem o comportamento geral:

| Modo | Disparo | Tempo de resposta | Profundidade | Tom |
|---|---|---|---|---|
| **Rápida** | Pergunta direta, comando, dado factual | <1.5s | Baixa (apenas o necessário) | Direto, conciso |
| **Pensada** | Pergunta de diagnóstico, análise, exploração | 2-5s | Média (com contexto e hipóteses) | Reflexivo, ponderado |
| **Profunda** | Recomendação, relatório, decisão | 5-15s | Alta (múltiplas fontes, evidências, cenários) | Cuidadoso, fundamentado |

A IA *escolhe* o modo com base na pergunta do empresário. Empresário pode override manual com "Me responde rápido" (força modo Rápida) ou "Pensa bem" (força modo Profunda).

---

## 9. Fundamentos de Psicologia Cognitiva

### 9.1 Carga Cognitiva — Como Evitar Sobrecarga

A interface nunca apresenta mais de **3 elementos novos** simultaneamente ao empresário.

**Estratégias:**

- **Revelação progressiva:** cada nova informação surge no contexto da anterior, não como bloco separado
- **Agrupamento visual:** informações relacionadas compartilham fundo, borda, e distância entre si menor que a distância para outros grupos (Lei de Proximidade)
- **Eliminação de redundância:** se o mapa cognitivo já mostra a confiança em 72%, a IA não diz verbalmente "Tenho 72% de confiança" — apenas "Já tenho uma boa base"
- **Modo escuro como redução de carga:** o modo escuro não é estético — reduz a carga cognitiva em ambientes de baixa luminosidade, que é onde empresários costumam trabalhar à noite

### 9.2 Fluência Perceptual — Como Tornar Fácil de Processar

**O que é:** informações fáceis de perceber são processadas como mais verdadeiras, mais agradáveis, mais confiáveis.

**Aplicações na Ponte:**

- **Contraste alto:** texto #F8FAFC em fundo #0F172A (relação de contraste >13:1) — acima do mínimo WCAG de 4.5:1
- **Fonte mono para dados:** números em fonte monoespaçada são processados 20% mais rápido pelo cérebro
- **Ícones consistentes:** todas as 5 áreas cognitivas têm ícone único e consistente. Empresário não precisa "traduzir" o que o ícone significa a cada aparição
- **Hierarquia visual clara:** em qualquer tela, o empresário deve ser capaz de identificar em <300ms qual é o elemento mais importante
- **Padding generoso:** elementos nunca encostam uns nos outros. O espaço em branco é recurso de fluência

### 9.3 Efeito de Mera Exposição — Como Familiarizar sem Entediar

**O que é:** quanto mais vemos algo, mais gostamos — até um ponto de saturação.

**Aplicações na Ponte:**

- **Repetição com variação:** o Mapa Cognitivo aparece sempre no mesmo lugar (canto inferior direito), mas nunca exatamente igual — muda conforme o progresso
- **Animações consistentes:** o easing de entrada de hipóteses é sempre o mesmo (slide-up 300ms ease-out). A consistência gera familiaridade
- **Variação controlada:** a IA alterna entre 12 formas de fazer a mesma pergunta Educacional (ver `MAPAS_COGNITIVO_VIVO.md`) para não soar repetitiva
- **Quebra de padrão deliberada:** a cada 5-7 interações similares, a IA muda o formato (pergunta → gráfico → resumo → insight) para resetar o efeito de saturação

### 9.4 Efeito Pico-Fim — Como Projetar o Ápice e o Desfecho

**O que é:** o usuário avalia uma experiência pelo momento mais intenso (pico) e pelo final, não pela média.

**Aplicações na Ponte:**

- **O pico de cada sessão:** a IA projeta um momento de insight na conversa — o "ahá!" — posicionado entre 60% e 80% do caminho (quando o empresário já deu dados suficientes)
- **O desfecho:** cada sessão termina com uma frase de encerramento *personalizada*: "João, você mencionou margens apertadas. Vou pensar em alternativas. Até amanhã."
- **O pico da primeira semana:** o maior impacto deve vir entre o dia 3 e o dia 5 — quando o empresário já confia mas ainda está descobrindo valor
- **O pico do primeiro mês:** a primeira recomendação acertada. Se a primeira recomendação falhar, o NPS cai 40%
- **O desfecho do mês:** relatório mensal com "O que descobrimos juntos" — não apenas números, mas narrativa de evolução

### 9.5 Viés de Confirmação — Como Usar a Favor da Descoberta

**O que é:** tendência a buscar informações que confirmam crenças existentes.

**Risco:** empresário ignora diagnósticos que contrariam sua intuição.

**Aplicações na Ponte:**

- **Apresentação balanceada:** antes de dar um diagnóstico que contraria a crença do empresário, a IA primeiro reconhece o que ele *acredita*: "Você mencionou que acha que o problema é financeiro. Olhando os dados, parece ser operacional. Vamos ver juntos?"
- **Evidências visíveis:** toda hipótese contraintuitiva é acompanhada de *duas evidências* concretas que o empresário pode verificar
- **Não confrontar:** a IA nunca diz "você está errado". Diz "os dados sugerem algo diferente — quer ver?"
- **Terceira via:** quando o empresário insiste em uma interpretação, a IA oferece uma terceira hipótese que reconcilia a visão dele com os dados
- **Gatilho de descoberta:** o viés de confirmação é redirecionado para *confirmar* o diagnóstico correto — a IA estrutura a conversa para que o empresário "descubra sozinho" o padrão, em vez de recebê-lo pronto

---

## 10. O Invisível — O que o Empresário *Não* Percebe

Parte mais importante da experiência sensorial: o que o empresário **não nota**.

| O que não percebe | Por que não percebe | Efeito real |
|---|---|---|
| Latência de processamento | Indicador visual de "pensando" ocupa a atenção | Sente que a IA está refletindo, não esperando |
| Correção de hipótese | Transição suave de um card para outro | Sente que a IA é consistente |
| Dados faltantes | Lacunas são apresentadas como "curiosidade" da IA | Sente que a IA é proativa |
| Erro de interpretação | IA pergunta "Deixa eu ver se entendi..." | Sente que a IA é cuidadosa |
| Complexidade do motor | Mapa simplifica 47 métricas em 5 barras | Sente que o negócio dele é "mapeável" |

---

## 11. Testes de Percepção (Checklist)

Antes de liberar qualquer funcionalidade sensorial, aplicar:

- [ ] Empresário consegue identificar o que é mais importante na tela em <1s?
- [ ] Alguma animação dura mais de 1s sem ser explicativa?
- [ ] Há som em algum lugar que não seja insight/descoberta/conclusão/novo padrão?
- [ ] A vibração tem significado claro ou é apenas decorativa?
- [ ] A IA respondeu instantaneamente uma pergunta que deveria parecer "pensada"?
- [ ] Alguma transição pode causar desconforto/náusea/movimento excessivo?
- [ ] O modo escuro está tão legível quanto o claro?
- [ ] Um novo usuário consegue completar uma ação sem se sentir perdido?
- [ ] Um usuário experiente consegue completar a mesma ação sem se sentir atrasado?
