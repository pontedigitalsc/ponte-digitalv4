# Sistema Oficial de Atenção

> *O olho do empresário precisa saber exatamente para onde olhar. Nunca mais que uma prioridade. Em qualquer tela da Ponte Digital, existe exatamente UM elemento que merece a atenção do empresário naquele momento. Todo o resto existe para apoiar ou aguardar.*

---

## 1. Princípio Fundamental

> **"Em qualquer tela da Ponte Digital, existe exatamente UM elemento que merece a atenção do empresário naquele momento. Todo o resto existe para apoiar ou aguardar."**

Este princípio não é idealismo — é uma regra de design vinculante. Nenhuma tela, painel ou página pode ser enviada para produção sem responder claramente: **qual é o único elemento que o empresário deve olhar primeiro?**

Se a resposta não for imediata e inequívoca, a tela não está pronta.

### 1.1 Derivadas do princípio

1. **Uma coisa por vez.** O cérebro do empresário não faz multitarefa visual. Ele focaliza, processa, depois focaliza outra coisa.
2. **Transferência fluida.** Quando a atenção precisa se mover, o movimento é guiado — nunca abrupto, nunca confuso.
3. **Estado determina foco.** O elemento focal muda de acordo com o estado cognitivo da IA e o contexto do empresário.
4. **Não-foco não é ausência.** Elementos não-focais não desaparecem — eles recuam (opacidade reduzida, tamanho menor, cor mais neutra).
5. **Nunca abandonar o olhar.** Em nenhum estado a tela fica sem um ponto focal claro.

---

## 2. Hierarquia de Atenção por Estado

### 2.1 Conversa — IA falando

Quando a IA está se comunicando com o empresário, a atenção deve estar no que ela está dizendo.

| Hierarquia | Elemento | % de atenção | Técnica visual |
|---|---|---|---|
| **1º** | Mensagem da IA | 60% | Destaque tipográfico. Balão com sombra suave. Margem generosa. |
| **2º** | Campo de resposta | 20% | Visível, mas visualmente recuado (opacidade 0.7, borda mais sutil). |
| **3º** | Histórico recente | 10% | Rolagem para cima disponível, mas as mensagens anteriores têm contraste reduzido. |
| **4º** | Painel cognitivo | 10% | Colapsado ou minimizado. Disponível para expandir, não à vista. |

**Regra visual:** A mensagem da IA ocupa a zona central e superior da área de conversa. As mensagens anteriores escurecem (opacidade 0.5). O campo de resposta fica abaixo, com destaque secundário.

### 2.2 Conversa — Empresário respondendo

Quando o empresário está digitando, a atenção deve estar no que ele está formulando.

| Hierarquia | Elemento | % de atenção | Técnica visual |
|---|---|---|---|
| **1º** | Campo de resposta | 50% | Input com destaque (borda primária, fundo levemente destacado, cursor piscando). |
| **2º** | Última mensagem da IA | 25% | Permanece visível acima, mas com contraste reduzido em 20%. |
| **3º** | Indicadores | 15% | Minimizados. Mostrar apenas o essencial (tipo de empresa, hora). |
| **4º** | Painel cognitivo | 10% | Colapsado. |

**Regra visual:** O campo de resposta ganha um destaque sutil (borda Azul Tranquilo, fundo Azul Gelo muito leve). O placeholder desaparece ou fica muito sutil. A última mensagem da IA ainda é legível, mas não compete.

### 2.3 Conversa — IA pensando

Quando a IA está processando, a atenção deve estar no progresso do pensamento.

| Hierarquia | Elemento | % de atenção | Técnica visual |
|---|---|---|---|
| **1º** | Indicador de pensamento | 50% | Centralizado. Texto dinâmico ("Analisando..."). O indicador pulsa suavemente. |
| **2º** | Mapa cognitivo (se presente) | 30% | À direita ou abaixo do indicador. Mostra o que está sendo processado. |
| **3º** | Última mensagem | 20% | Permanece visível, mas recuada (opacidade 0.4). |

**Regra visual:** O indicador de pensamento é o elemento mais contrastado da tela. Todo o resto escurece. O mapa cognitivo (se disponível) é o segundo ponto de interesse — mostra o "raciocínio" da IA.

### 2.4 Dashboard

No dashboard, o empresário chega para ver o estado atual do negócio.

| Hierarquia | Elemento | % de atenção | Técnica visual |
|---|---|---|---|
| **1º** | Insight principal | 40% | Card destacado no topo ou à esquerda. Cor de insight (roxo) ou destaque de confiança (azul). |
| **2º** | Mapa cognitivo | 25% | Ocupa área central. Visualização do que a IA está monitorando. |
| **3º** | Ações recomendadas | 20% | Abaixo ou à direita do insight principal. Cards menores. |
| **4º** | Indicadores secundários | 15% | Na periferia. Números que contextualizam mas não são o foco. |

**Regra visual:** O insight principal é inconfundível — ocupa mais espaço, tem cor de destaque, tipografia maior. O olho vai para ele naturalmente. Os indicadores secundários usam tipografia menor e cor mais neutra.

### 2.5 Landing

Na landing, o empresário decide se a Ponte Digital é para ele.

| Hierarquia | Elemento | % de atenção | Técnica visual |
|---|---|---|---|
| **1º** | Tagline + CTA | 50% | Centro da tela. Tipografia grande (2xl-3xl). Uma frase. Um botão. |
| **2º** | Proposta de valor | 30% | Abaixo ou ao lado. 3 pilares, 3 cards, 3 frases. |
| **3º** | Identidade visual | 20% | Logo, cores, elementos gráficos sutis. A identidade existe, mas não compete. |

**Regra visual:** A tagline é o elemento mais contrastado e de maior tamanho. O CTA é a única ação primária. A proposta de valor está abaixo (scroll), subordinada. A identidade visual (logo, marca) está presente mas não grita.

### 2.6 Formulário / Configuração

| Hierarquia | Elemento | % de atenção | Técnica visual |
|---|---|---|---|
| **1º** | Campo ativo | 50% | Input focalizado com destaque (borda, glow suave). |
| **2º** | Título do formulário | 20% | Topo. O empresário precisa saber "o que estou preenchendo". |
| **3º** | Campos seguintes | 20% | Visíveis, mas em estado de repouso (menos contraste). |
| **4º** | Ações secundárias | 10% | "Voltar", "Cancelar" — minimizadas, sem destaque visual. |

**Regra visual:** O campo ativo é inconfundível. Os campos seguintes existem para dar contexto, não para competir. "Salvar" (ação primária) tem destaque, "Cancelar" é um link sem fundo.

### 2.7 Empty State / Primeiro uso

| Hierarquia | Elemento | % de atenção | Técnica visual |
|---|---|---|---|
| **1º** | Mensagem de boas-vindas ou call-to-action inicial | 50% | Centro. Ilustração sutil + frase + botão de ação. |
| **2º** | Explicação do valor | 30% | Abaixo. "Isso aqui faz X por você." |
| **3º** | Navegação / identidade | 20% | Sidebar ou topbar visível, mas recuada. |

---

## 3. Técnicas de Direcionamento de Atenção

### 3.1 Técnicas primárias (alta prioridade)

| Técnica | Como funciona | Quando usar |
|---|---|---|
| **Contraste de cor** | Elemento focal usa cor de destaque (Azul Tranquilo, Insight) contra fundo neutro | Insight principal, CTA, ação primária |
| **Tamanho** | Elemento focal é visivelmente maior (1.5x-2x o tamanho dos demais) | Número principal, título, KPI mais importante |
| **Isolamento** | Elemento focal tem espaço ao redor (padding generoso, sem elementos competindo) | Mensagem da IA, indicador de pensamento |
| **Âncora superior** | Elemento focal está no topo da viewport ou no início do fluxo de leitura | Hierarquia de informação, estado de dashboard |

### 3.2 Técnicas secundárias (recuo de elementos não-focais)

| Técnica | Como funciona | Quando usar |
|---|---|---|
| **Redução de opacidade** | Elementos não-focais vão para opacidade 0.4-0.7 | Histórico de conversa, indicadores secundários |
| **Redução de tamanho** | Elementos não-focais usam tipografia 1-2 níveis abaixo | Labels, timestamps, metadados |
| **Desaturação** | Elementos não-focais perdem cor vibrante, vão para tons de cinza | Gráficos secundários, dados de apoio |
| **Colapso** | Painéis não-focais são colapsados com indicador de expansão | Painel cognitivo, histórico |
| **Desfoque** | Elementos de fundo recebem blur sutil (apenas em modais) | Modal aberto, conteúdo atrás do foco |

### 3.3 Sequência de direcionamento

Quando a tela muda de estado, o olho do empresário precisa ser guiado:

1. **Estado anterior** → o elemento focal atual perde destaque (transição de 300ms)
2. **Pausa** (150ms) — o olho do empresário descansa brevemente
3. **Novo elemento focal ganha destaque** (transição de 300ms)
4. **Estabilização** (200ms) — o novo foco se firma

**Nunca:** dois elementos trocando de destaque simultaneamente. **Nunca:** transição mais rápida que 200ms (o olho não acompanha).

---

## 4. Atenção em Momentos Específicos

### 4.1 Insight sendo revelado

1. Empresário vê dados normais (foco normal)
2. IA identifica padrão → pausa de 800ms (tela "respira")
3. Card de insight aparece com fade+translate suave (500ms)
4. Card de insight ganha destaque com cor de insight (roxo) + opacidade total
5. Demais elementos recuam (opacidade 0.5) por 3s
6. Após 3s, tela volta ao equilíbrio — insight permanece como card normal

### 4.2 Erro ocorrendo

1. Empresário está em fluxo normal
2. Erro detectado → NOT. Erro não aparece de repente.
3. IA informa: "Notei algo que não está certo..." (tom calmo, sem pânico visual)
4. Campo de erro ganha destaque (borda vermelha, se for input)
5. Mensagem de erro aparece abaixo (texto regular, sem bold, sem ícone de alerta gigante)
6. IA oferece correção: "Quer que eu ajuste?"

**Jamais:** modal de erro bloqueante. **Jamais:** vermelho piscando. **Jamais:** som de erro.

### 4.3 Notificação chegando

1. Notificação aparece no canto superior direito (fade in, 400ms)
2. Ocupa no máximo 15% da largura da tela
3. 4s visível (ver SISTEMA_OFICIAL_DE_RITMO.md)
4. Auto-dismiss com fade out (300ms)
5. Se crítica: permanece até ação do empresário, mas sem piscar

### 4.4 Múltiplos resultados

Quando a IA retorna múltiplos resultados (ex: "Encontrei 3 padrões"):

1. IA mostra o resumo: "Encontrei 3 padrões nos dados financeiros deste mês."
2. O primeiro resultado aparece com destaque (é o focal)
3. Os demais aparecem abaixo, em ordem de relevância
4. Empresário pode clicar em cada um para torná-lo focal
5. O focal atual tem indicador visual sutil (borda, cor)

---

## 5. Anti-padrões de Atenção

### 5.1 O que NUNCA fazer

| Anti-padrão | Problema | Solução |
|---|---|---|
| **Dois elementos competindo** | Empresário não sabe para onde olhar | Escolher um elemento focal. O outro recua. |
| **Mudança abrupta de foco** | Empresário perde o contexto | Transição de 300ms entre focos. |
| **Elementos não-focais com mesma força visual** | Nenhum elemento parece mais importante | Reduzir contraste, tamanho ou opacidade dos não-focais. |
| **Notificação sobre insight** | Empresário perde o insight | Aguardar. Notificação chega depois. |
| **Loading no lugar errado** | Empresário não sabe o que está carregando | Loading próximo ao elemento que será atualizado. |
| **Tela sem foco claro** | Empresário se sente perdido | Definir hierarquia de atenção antes de desenhar a tela. |
| **Elemento focal que não é interativo** | Empresário tenta clicar sem sucesso | Se é focal, deve ser acionável. Se não é, não deveria ser focal. |
| **Pular a hierarquia** | Card de insight aparece abaixo de 3 indicadores secundários | Hierarquia visual deve refletir hierarquia de importância. |
| **Foco no erro em vez da solução** | Empresário fica paralisado | Erro é secundário — a solução ou o próximo passo são o foco. |
| **Cores de atenção iguais para tudo** | Nada se destaca | Reservar cores de destaque para o elemento focal. |

### 5.2 O erro do "tudo importante"

Sintomas:
- Dashboard onde todos os cards têm o mesmo tamanho e cor
- Tela com 7 indicadores numéricos no mesmo nível visual
- Conversa onde IA e empresário têm o mesmo destaque visual o tempo todo
- Landing com 3 CTAs visíveis simultaneamente

Diagnóstico: o design não escolheu uma prioridade. Correção: aplicar a hierarquia de atenção por estado.

---

## 6. Atenção Dinâmica

### 6.1 O foco muda com o estado

A hierarquia de atenção não é fixa — muda dinamicamente conforme:

| Mudança de estado | Transição de atenção |
|---|---|
| IA termina de pensar → começa a falar | Indicador de pensamento → Mensagem da IA (300ms) |
| Empresário termina de ler → começa a digitar | Mensagem da IA → Campo de resposta (200ms) |
| Dashboard carrega → Insight aparece | Loader → Card de insight (500ms) |
| Notificação chega durante conversa | Mensagem → Notificação por 4s → Mensagem (400ms) |
| Empresário clica em um card secundário | Card principal → Card clicado (300ms) |

### 6.2 O olho nunca é abandonado

Em nenhum estado a tela pode ficar sem um ponto focal claro:

| Estado vazio | Foco provisório |
|---|---|
| Carregando | Loader inteligente com texto descritivo |
| Sem dados | Empty state com ilustração + call-to-action |
| Erro | Mensagem de erro + ação de correção |
| Transição entre telas | Fade sutil + logo no centro (máximo 400ms) |

---

## 7. Verificações de Atenção

### 7.1 Testes rápidos

**Teste dos 2 segundos:** OLhe para a tela por 2 segundos. Feche os olhos. O que você lembra? Se for um elemento, a atenção está correta. Se for mais de um, a tela compete consigo mesma.

**Teste do "qual é o foco?":** Peça a alguém que nunca viu a tela para apontar para o elemento mais importante. Se ela hesitar ou apontar para o lugar errado, a hierarquia de atenção falhou.

**Teste do contraste progressivo:** Converta a tela para escala de cinza. O elemento focal ainda se destaca? Se não, a hierarquia depende apenas de cor, e cor não é suficiente.

### 7.2 Checklist de atenção

- [ ] Existe exatamente UM elemento que domina a atenção nesta tela?
- [ ] Os elementos não-focais estão visualmente recuados (opacidade, tamanho, cor)?
- [ ] A transição entre estados é fluida (> 200ms)?
- [ ] O elemento focal corresponde ao estado cognitivo atual do empresário?
- [ ] Não há dois elementos com o mesmo nível de destaque competindo?
- [ ] A tela passaria no teste dos 2 segundos?
- [ ] A tela passaria no teste do "qual é o foco?"
- [ ] Cores de destaque foram usadas apenas para o elemento focal?
- [ ] Em escala de cinza, o foco ainda é identificável?
- [ ] Não há notificações ou alertas disputando com o conteúdo principal?
- [ ] O CTA ou ação principal é visualmente a segunda coisa mais evidente (depois do insight)?
- [ ] Cada estado (falando, pensando, respondendo, vazio, erro) tem seu próprio foco definido?

---

## 8. Matriz de Decisão de Atenção

Para cada nova tela ou componente, responder:

1. **Qual o estado cognitivo do empresário aqui?** (explorando, decidindo, preocupado, confiante, aprendendo)
2. **Qual o elemento mais importante para ele neste estado?**
3. **Como garantir que este elemento receba 40-60% da atenção visual?**
4. **Quais elementos precisam recuar para que o focal brilhe?**
5. **Para onde a atenção vai depois? E depois?**

Se essas perguntas não tiverem respostas claras, a tela não está pronta para implementação.

---

*Documento complementar: LINGUAGEM_VISUAL_OFICIAL.md (como o foco se parece), SISTEMA_OFICIAL_DE_RITMO.md (quando o foco se move), SISTEMA_OFICIAL_DE_RESPIRACAO.md (o espaço que permite o foco).*
