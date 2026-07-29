# Cognitive Design System

## Guia Definitivo de Design da Ponte Digital

Este não é um Design System visual. É um **Cognitive Design System** — define a alma da interface, o ritmo da conversa, a presença da IA. Cada dimensão abaixo é um princípio fundamental que rege como o empresário *sente* a Ponte Digital.

---

## 1. RITMO

### Definição

Cadência com que os elementos aparecem na tela. O ritmo controla o fluxo de informação visual, guiando a atenção do empresário sem sobrecarregá-lo.

### Regras

1. **Elementos primários aparecem primeiro** — a mensagem da IA sempre precede qualquer feedback visual, card, ou indicador.
2. **Nunca mais de 1 elemento por 200ms** — elementos simultâneos competem por atenção. O cérebro humano processa um estímulo visual por vez.
3. **Ritmo acelera com confiança da IA** — quanto maior a confiança na resposta, mais rápida a entrega dos elementos. Confiança baixa = ritmo lento para permitir reflexão.

### Padrões de Ritmo

| Ritmo | Contexto | Intervalo entre elementos | Exemplo |
|-------|----------|---------------------------|---------|
| **Lento** | Reflexão, pergunta complexa, análise profunda | 600ms–1s | IA analisando margem de lucro dos últimos 12 meses |
| **Médio** | Conversa natural, exploração de hipóteses | 300ms–600ms | IA sugerindo causas possíveis para queda de vendas |
| **Rápido** | Confirmação, ações simples, comandos diretos | 100ms–200ms | IA confirmando "Relatório gerado" com indicadores |

### Exemplos

- **Bom:** IA fala → 400ms → badge de confiança aparece → 300ms → insight card desliza
- **Bom:** IA pergunta "O que você acha?" → silêncio de 2s → campo de resposta ganha foco

### O que NÃO fazer

- Todos os elementos aparecendo ao mesmo tempo
- Ritmo constante independente do contexto
- Ignorar a confiança da IA para definir ritmo

---

## 2. SILÊNCIO

### Definição

Ausência intencional de interface quando o empresário precisa pensar. Silêncio não é vazio — é espaço cognitivo para processamento.

### Regras

1. **Silêncio mínimo de 2s após pergunta complexa** — o empresário precisa de tempo para formular resposta sem pressão visual.
2. **Silêncio máximo de 8s sem intervenção** — após 8s, a IA oferece um toque sutil ("Quer que eu reformule a pergunta?").
3. **Silêncio não é tela parada** — a IA mantém presença sutil (respiração do avatar, micro-movimento) para indicar que está presente mas aguardando.

### Exemplos

- **Bom:** IA pergunta "Qual dessas alternativas faz mais sentido?" → silêncio de 3s → campo de resposta mantém placeholder calmo
- **Bom:** Empresário está lendo um insight → silêncio de 5s → IA aguarda sem interferir

### O que NÃO fazer

- Preencher todo silêncio com animação, spinner, ou texto
- Apressar o empresário com micro-interações durante a reflexão
- Tela congelada (sem indicação de que a IA ainda está presente)

---

## 3. DENSIDADE

### Definição

Quantidade de informação por unidade de tela. Densidade controla a carga cognitiva do empresário em cada momento.

### Regras

1. **Máximo 3 elementos cognitivos por viewport** — elemento cognitivo = qualquer item que exija processamento consciente (cards, gráficos, botões com decisão, textos de análise).
2. **Densidade reduz em 50% em telas de conversa** — conversa exige processamento linguístico, não competir com elementos visuais.
3. **Densidade aumenta em telas de dashboard** — monitoramento permite maior densidade, pois o empresário está escaneando, não processando profundamente.

### Exemplos

- **Bom:** Tela de conversa: IA falando + campo de resposta + badge de confiança (3 elementos)
- **Bom:** Dashboard: 6 cards com indicadores + 2 gráficos + menu lateral (densidade alta, contexto de monitoramento)

### O que NÃO fazer

- Sobrecarregar tela de conversa com cards, números, gráficos
- Densidade uniforme entre conversa e dashboard
- Ignorar que gráficos e textos competem pelo mesmo recurso cognitivo

---

## 4. FOCO

### Definição

O elemento que domina a atenção do empresário em cada momento. Foco é único por tela — não existe atenção dividida.

### Regras

1. **Apenas 1 foco por tela** — todo o layout deve conduzir o olhar ao foco atual.
2. **Foco é determinado pelo estado da IA** — IA falando → mensagem da IA é foco. Empresário pensando → campo de resposta ou silêncio é foco.
3. **Foco pode ser transferido (nunca roubado)** — transições de foco são anunciadas ou percebidas naturalmente. O foco nunca muda abruptamente sem contexto.

### Hierarquia de Foco

| Prioridade | Situação | Elemento foco |
|------------|----------|---------------|
| 1 | IA falando | Balão/mensagem da IA |
| 2 | Empresário respondendo | Campo de texto / seleção |
| 3 | Painel atualizando | Elemento que mudou (com destaque sutil) |
| 4 | Indicadores | Badges, métricas, contadores |

### Exemplos

- **Bom:** IA está explicando um insight → o balão de mensagem ocupa 60% da tela, o campo de resposta está discreto
- **Bom:** Empresário digita → foco transfere suavemente para o campo de texto com glow sutil
- **Ruim:** Dois cards aparecem simultaneamente com animações competitivas

### O que NÃO fazer

- Dois elementos competindo pela atenção
- Roubar o foco sem contexto (notificação durante leitura de insight)
- Múltiplos elementos piscando ou destacados ao mesmo tempo

---

## 5. PROFUNDIDADE

### Definição

Sensação de camadas e espaço na interface. Profundidade comunica hierarquia e relação entre elementos.

### Regras

1. **Profundidade máxima de 3 camadas** — superfície (fundo), conteúdo (cards, mensagens), destaque (modais, tooltips).
2. **Apenas sombras sutis** — profundidade deve ser percebida, não notada. Sombras com opacidade baixa e blur suave.
3. **Profundidade comunica hierarquia** — elementos mais importantes estão na camada superior. Elementos de fundo nunca competem com o primeiro plano.

### Exemplos

- **Bom:** Card de insight elevado (shadow sm), fundo da tela liso, avatar da IA em camada própria
- **Bom:** Modal com overlay semitransparente e sombra na borda do card modal

### O que NÃO fazer

- Sombras exageradas (drop-shadow pesado)
- Neumorphism (profundidade falsa que confunde o que é clicável)
- 3D desnecessário
- Mais de 3 camadas visíveis simultaneamente

---

## 6. HIERARQUIA

### Definição

Ordem de importância visual dos elementos na tela. Hierarquia orienta o olhar do empresário para o que importa em cada momento.

### Regras

1. **A mensagem da IA é sempre o elemento mais importante** — a voz da IA é a razão da interface existir. Nunca competir com ela.
2. **O campo de resposta é o segundo** — o empresário precisa responder. Deve estar visível mas não competir com a IA.
3. **O painel cognitivo é terceiro** — indicadores, badges, hipóteses são suporte, não protagonistas.

### Proporção Hierárquica

| Nível | Proporção da tela | Conteúdo |
|-------|-------------------|----------|
| Primário | 60% | Mensagem da IA, insight principal |
| Secundário | 25% | Campo de resposta, ações do empresário |
| Terciário | 15% | Painel cognitivo, badges, indicadores |

### Exemplos

- **Bom:** Mensagem da IA central, campo de resposta abaixo, painel de confiança em coluna lateral estreita
- **Bom:** Ao expandir um insight, a mensagem mantém 60% e o insight expandido ocupa 60% dentro da primária

### O que NÃO fazer

- Painel competindo com a conversa (terciário maior que o secundário)
- Hierarquia que muda drasticamente sem transição
- Elemento de suporte visualmente mais forte que a mensagem principal

---

## 7. MOVIMENTO

### Definição

Direção e propósito das animações. Movimento não é decorativo — comunica significado.

### Regras

1. **Slide up para novas informações** — o novo chega de baixo para cima, como se emergisse da profundidade.
2. **Fade para transições suaves** — mudanças de estado sem deslocamento usam fade (ex: mudar texto do badge).
3. **Escala para destaques** — elementos importantes ganham escala momentânea para atrair atenção.
4. **Direção consistente** — uma vez estabelecida a direção do movimento, ela não muda aleatoriamente.

### Vocabulário de Movimento

| Direção/Tipo | Significado | Exemplo |
|--------------|-------------|---------|
| Subir (slide up) | Novo, emergente | Card de insight aparecendo |
| Descer (slide down) | Passado, arquivado | Mensagem sendo histórico |
| Fade | Transição, mudança de estado | Badge de confiança atualizando |
| Escala | Importância, destaque | Insight especial com glow |

### Exemplos

- **Bom:** Insight aparece com slide up + fade (400ms), indicando que é novo conteúdo
- **Bom:** Histórico de mensagens rola para cima, novas mensagens emergem de baixo
- **Ruim:** Toda animação usa o mesmo easing e direção

### O que NÃO fazer

- Movimento sem direção consistente
- Animações decorativas sem significado
- Direção aleatória (hora sobe, hora desce para o mesmo tipo de conteúdo)

---

## 8. PRESENÇA

### Definição

A sensação de que a IA está ali, viva, atenta. Presença é o que transforma uma interface em uma conversa.

### Regras

1. **IA tem avatar consistente** — mesmo avatar, mesmo estilo, mesma posição. O avatar é a âncora visual da IA.
2. **IA reage a cada ação (microfeedback)** — cada toque, clique, digitação do empresário gera uma resposta sutil da IA (olhar, inclinação, glow).
3. **IA respira (animação sutil quando ociosa)** — o avatar tem um ciclo de respiração quase imperceptível. A interface nunca parece "morta".
4. **IA "pisca" (pausa antes de responder)** — pausa de 400ms–800ms antes de responder simula processamento natural.

### Exemplos

- **Bom:** Avatar com respiração sutil (ciclo de 4s, movimento de 2px no eixo Y)
- **Bom:** Empresário digita → avatar inclina levemente (indicação de "ouvindo")
- **Bom:** IA vai responder → glow sutil no avatar 300ms antes da mensagem

### O que NÃO fazer

- IA invisível (apenas texto, sem identidade visual)
- IA onipresente (avatar enorme, animações exageradas, presença sufocante)
- Avatar congelado que não reage a ações do empresário

---

## 9. PERSONALIDADE

### Definição

O caráter visual e verbal da interface. Personalidade é a consistência emocional da IA — como ela se comporta em cada situação.

### Regras

1. **Calma em momentos de análise** — quando a IA está processando dados, a interface é serena: cores neutras, movimento mínimo, tipografia leve.
2. **Confiança em momentos de insight** — quando a IA apresenta uma descoberta, a interface transmite segurança: destaque sutil, tom direto, linguagem afirmativa.
3. **Curiosidade em momentos de descoberta** — quando explorando possibilidades, a IA usa linguagem aberta, sugestões, exploração visual com cards expansivos.
4. **Seriedade em momentos de decisão** — quando o empresário precisa decidir, a interface é direta: sem distrações, linguagem clara, ação evidente.

### Espectro de Personalidade

```
Formal ← — — — — ◦ — — — — → Casual
```

A IA opera no centro do espectro, inclinando-se ligeiramente para um lado conforme o contexto, mas nunca atinge os extremos.

| Contexto | Tom | Linguagem |
|----------|-----|-----------|
| Análise | Formal leve | "Considerando os dados dos últimos 30 dias..." |
| Insight | Confiante | "Identifiquei um padrão relevante." |
| Exploração | Curioso | "Que tal investigarmos essa hipótese?" |
| Decisão | Sério | "Você precisa escolher entre estas três opções." |

### Exemplos

- **Bom:** IA analisando margem → tom calmo, dados discretos, sem pressa
- **Bom:** IA apresentando insight crucial → destaque visual na descoberta, tom afirmativo
- **Ruim:** IA contando piada durante uma análise de risco financeiro

### O que NÃO fazer

- Personalidade inconsistente entre telas
- Extremos (muito formal parece robótico, muito casual parece pouco confiável)
- Personalidade que não muda com o contexto
- Tom que contradiz o estado da análise
