# Sistema Oficial de Densidade

> Regras matemáticas para densidade da interface.
> Este documento define os limites numéricos de elementos, ações, destaques, animações, cores e profundidade hierárquica em cada tela da Ponte Digital.

---

## 1. Princípio Fundamental

A densidade da interface é inversamente proporcional à carga cognitiva necessária.

- Quanto mais o empresário precisa pensar, menos elementos a tela deve ter.
- Quanto mais o empresário está explorando, mais densa a tela pode ser.
- O espaço vazio não é desperdício — é processamento cognitivo preservado.

---

## 2. Regras de Densidade

### 2.1 Elementos por tela

| Tipo de elemento | Máximo | Mínimo | Definição de "elemento" |
|---|---|---|---|
| Elementos cognitivos | 7 | 1 | Cards, painéis, indicadores, blocos de informação |
| Elementos interativos | 5 | 0 | Botões, links, inputs, checkboxes, selects |
| Elementos em destaque | 3 | 0 | Elementos com cor diferente, tamanho maior, animação |
| Elementos totais | 12 | 1 | Soma de todos os tipos |

Regras:
- "Mínimo 1 elemento" significa que nenhuma tela fica vazia sem propósito.
- Se uma tela tem função apenas de transição (loading, redirecionamento), exibir pelo menos o avatar do assistente (conta como 1 elemento).
- Tela vazia apenas quando explicitamente projetada para ser vazia (onboarding inicial, estado sem dados).

Cálculo de elementos em destaque:
- Um elemento com cor de destaque (não neutra) conta como 1 destaque
- Um elemento com tamanho 20%+ maior que o padrão conta como 1 destaque
- Um elemento com animação própria (não decorativa) conta como 1 destaque
- Se um elemento acumula múltiplos atributos de destaque, ainda conta como 1 destaque

### 2.2 Ações simultâneas

| Tipo de ação | Máximo | Comportamento |
|---|---|---|
| Ação primária (CTA principal) | 1 | Visível, cor primária, destaque |
| Ações secundárias (CTAs alternativos) | 2 | Visíveis, outline ou tom neutro |
| Ações terciárias | Ilimitado | Apenas em menu dropdown ou "Mais opções" |

Regras:
- Ação primária: o que o empresário DEVE fazer (salvar, confirmar, enviar)
- Ação secundária: o que o empresário PODE fazer (cancelar, descartar, editar)
- Ação terciária: o que o empresário PODERIA fazer (exportar, compartilhar, configurar)
- Ação primária e ação secundária não podem ter o mesmo peso visual
- Se houver apenas uma ação, ela é sempre primária

Exemplo de layout de ações:
```
[Seguir recomendação]    [Explorar alternativas]    ⋮ (Ver dados completos)
   primária                  secundária                terciária (menu)
```

### 2.3 Destaques visuais

| Tipo de destaque | Máximo | Características |
|---|---|---|
| Destaque primário | 1 | Cor de destaque, tamanho grande (120%+ do padrão), pode ter animação |
| Destaques secundários | 2 | Cor de apoio, badge, ícone diferenciado, sem animação |
| Destaques conflitantes | 0 | Dois ou mais elementos competindo pelo mesmo atributo de destaque |

Regras:
- Destaque primário: único elemento que "grita" por atenção
- Destaque secundário: elemento que "chama" atenção sem competir com o primário
- Destaque conflitante: dois elementos com a MESMA cor de destaque, mesmo tamanho ou mesma animação na mesma tela
- Se houver 2+ elementos com cor de destaque primária, a tela está em violação

Como identificar destaque conflitante:
- Dois botões primários na mesma tela → conflito
- Dois cards com fundo colorido chamativo → conflito
- Duas notificações com badge vermelho → conflito
- Um botão primário E um card com borda primária → NÃO é conflito (diferentes funções)
- Um gráfico colorido E um botão primário → NÃO é conflito (gráfico tem cores próprias)

### 2.4 Animações simultâneas

| Tipo de animação | Máximo | Exemplos |
|---|---|---|
| Animação principal | 1 | Transição de tela, card aparecendo, destaque |
| Movimento sutil | 2 | Loading spinner, avatar respirando, indicador de digitação |
| Animações conflitantes | 0 | Movimentos em direções opostas no mesmo instante |

Regras:
- Animação principal: visível, notável, comunica uma transição de estado
- Movimento sutil: quase imperceptível, comunica atividade contínua
- Animação conflitante: dois elementos se movendo em direções visivelmente opostas ao mesmo tempo

Exemplos de animações conflitantes:
- Elemento subindo (slide up) E elemento descendo (slide down) simultaneamente
- Elemento expandindo E elemento colapsando simultaneamente
- Loading girando horário E loading girando anti-horário na mesma tela

### 2.5 Cores simultâneas

| Tipo de cor | Máximo | O que conta |
|---|---|---|
| Cores diferentes (exceto neutros e gráficos) | 3 | Cores com função de identificação, destaque ou semântica |
| Cor de destaque | 1 | Primária ou semântica (sucesso, erro, alerta) que não seja neutra |
| Neutros | Ilimitado | Preto, branco, cinza (em todas as variações) não contam no limite |
| Cores de gráficos | Ilimitado | Cores específicas de visualização de dados não contam no limite |

Regras:
- Cor de destaque é UMA: primária OU semântica (erro, sucesso, alerta) em destaque
- Se uma tela tem um botão de sucesso (verde) E um botão de erro (vermelho), isso conta como 2 cores de destaque → violação
- Solução: usar a cor semântica apenas no elemento mais importante e neutro no outro
- Cores de marca (logo, identidade visual) não contam se forem usadas apenas em elementos fixos (header, footer)

Exemplo de contagem de cores:
- Tela com: botão azul (primário) + card com borda verde (sucesso) + avatar roxo (marca) = 3 cores (ok)
- Tela com: botão azul + botão verde + badge vermelho + card roxo = 4 cores (violação)
- Solução: badge vermelho vira badge cinza com ícone, card roxo vira card neutro

### 2.6 Níveis hierárquicos visíveis

| Nível | Características | Máximo visível |
|---|---|---|
| 1º nível | Primário: principal, título, ação principal | Sempre visível |
| 2º nível | Secundário: suporte, detalhes, ações secundárias | Sempre visível |
| 3º nível | Terciário: detalhes adicionais, metadados | Sempre visível |
| 4º nível | Quaternário: drill-down, expansão, detalhes profundos | Apenas sob demanda |

Regras:
- Apenas 3 níveis de profundidade VISÍVEIS ao mesmo tempo
- 4º nível: exibido apenas quando empresário clica, expande ou faz drill-down
- Hierarquia é cumulativa: 4º nível só aparece se 1º, 2º e 3º estão visíveis

Exemplo de hierarquia em uma lista de decisões:
- 1º nível: Título da decisão (visível)
- 2º nível: Área + prioridade + data (visível)
- 3º nível: Resumo de 1 linha (visível)
- 4º nível: Detalhes completos + evidências (clicar para expandir)

---

## 3. Densidade por Contexto

A densidade se ajusta conforme o tipo de tela. Os limites mudam.

### 3.1 Tabela de densidade por contexto

| Contexto | Espaço vazio mínimo | Elementos cognitivos máx | Elementos interativos máx | Destaques máx | Animações máx |
|---|---|---|---|---|---|
| Conversa | 40% | 4 | 3 | 2 | 2 |
| Dashboard | 25% | 7 | 5 | 3 | 2 |
| Lista/Grade | 15% | 6 | 4 | 2 | 1 |
| Landing | 50%+ | 3 | 2 | 2 | 2 |
| Decisão | 35% | 5 | 4 | 3 | 1 |
| Relatório | 25% | 6 | 4 | 2 | 1 |
| Configuração | 30% | 4 | 4 | 1 | 0 |
| Onboarding | 50%+ | 3 | 2 | 2 | 2 |
| Modal/Foco | 40% | 3 | 3 | 2 | 1 |

### 3.2 Definição de "espaço vazio"

Espaço vazio = área da viewport não ocupada por elementos (incluindo padding, margens, gap).

Cálculo:
```
Espaço vazio (%) = (Área não ocupada ÷ Área total da viewport) × 100
```

Onde "área não ocupada" exclui:
- Elementos de UI (cards, botões, inputs, texto, imagens)
- Background sólido (apenas gradientes ou padrões sutis contam como vazio)
- Padding interno de elementos NÃO conta como vazio
- Margens entre elementos contam como vazio

### 3.3 Transição entre contextos

Quando o empresário navega entre telas de contextos diferentes:

1. Transição de densidade: gradual (não abrupta)
2. Elementos desaparecem antes de novos aparecerem (fade out antes de fade in)
3. Espaçamento se ajusta (gap aumenta ou diminui conforme necessário)
4. Tempo da transição: 400ms (fade, ease-out)

Exemplo: Conversa → Dashboard
- t=0ms: Conversa (40% vazio, 3 elementos)
- t=200ms: Elementos da conversa desaparecem (fade out)
- t=400ms: Elementos do dashboard aparecem (fade in)
- t=800ms: Dashboard estabilizado (25% vazio, 6 elementos)

### 3.4 Violação de densidade

Se uma tela ultrapassa os limites de densidade do seu contexto:

1. Registro interno: violação registrada em log de desempenho cognitivo
2. Não bloqueia a interface (nunca impedir o empresário de agir)
3. Sugestão ao Assistente: "Esta tela está acima da densidade recomendada"
4. Assistente pode sugerir: "Tem muitos elementos aqui. Quer que eu oculte alguns?"

Ações corretivas automáticas (prioridade):
1. Reduzir elementos interativos (agrupar em menus)
2. Reduzir destaques (manter apenas 1 primário)
3. Reduzir elementos cognitivos (colapsar cards em títulos)
4. Aumentar espaço vazio (aumentar padding/margens)

---

## 4. Contratos de Densidade

### 4.1 Contrato por tipo de tela

**Conversa:**
- Máximo 3 blocos de informação visíveis além da mensagem atual
- Máximo 2 ações por mensagem do assistente
- Avatar + campo de resposta: sempre visíveis
- Espaço vazio: mínimo 40%

**Dashboard:**
- Máximo 7 cards/indicadores
- Máximo 1 destaque primário (métrica mais importante)
- Máximo 2 destaques secundários (metas, alertas)
- Espaço vazio: mínimo 25%

**Lista/Grade:**
- Máximo 20 itens por página (sem scroll infinito)
- Máximo 2 filtros visíveis (demais em "Mais filtros")
- 1 ação primária por linha (as demais em menu)
- Espaço vazio: mínimo 15%

**Landing:**
- Máximo 3 seções de conteúdo visíveis
- 1 CTA principal
- Espaço vazio: mínimo 50%

### 4.2 Contrato de destaque

- 1 destaque primário por tela
- 2 destaques secundários no máximo
- Destaques conflitantes: zero

### 4.3 Contrato de animação

- 1 animação principal por vez
- 2 movimentos sutis no máximo
- Animações conflitantes: zero
- Duração da animação principal: 300-600ms
- Duração de movimento sutil: 1-3s (cíclico)

### 4.4 Contrato de cor

- 3 cores diferentes por tela (exceto neutros e gráficos)
- 1 cor de destaque (primária ou semântica)
- Neutros (preto, branco, cinza): ilimitados
- Cores de gráfico: ilimitadas (mas limitadas a 1 gráfico em destaque)

### 4.5 Contrato de profundidade

- 3 níveis hierárquicos visíveis
- 4º nível: apenas sob demanda
- Hierarquia: primário > secundário > terciário

---

## 5. Tabela Resumo

| Contexto | Vazio min | Cog máx | Int máx | Destaq máx | Anim máx | Cor máx | Prof máx |
|---|---|---|---|---|---|---|---|
| Conversa | 40% | 4 | 3 | 2 | 2 | 3 | 3 |
| Dashboard | 25% | 7 | 5 | 3 | 2 | 3 | 3 |
| Lista/Grade | 15% | 6 | 4 | 2 | 1 | 3 | 3 |
| Landing | 50% | 3 | 2 | 2 | 2 | 3 | 2 |
| Decisão | 35% | 5 | 4 | 3 | 1 | 3 | 3 |
| Relatório | 25% | 6 | 4 | 2 | 1 | 3 | 3 |
| Configuração | 30% | 4 | 4 | 1 | 0 | 2 | 2 |
| Onboarding | 50% | 3 | 2 | 2 | 2 | 3 | 2 |
| Modal/Foco | 40% | 3 | 3 | 2 | 1 | 2 | 2 |

---

## 6. Mecanismo de Aplicação

### 6.1 Verificação em tempo de desenvolvimento

Cada tela é verificada contra os limites do seu contexto:

1. Contagem de elementos (cognitivos + interativos)
2. Identificação de destaques (primário, secundários, conflitos)
3. Identificação de animações (principal, sutis, conflitantes)
4. Contagem de cores (distintas, destaque, violações)
5. Medição de profundidade hierárquica
6. Cálculo de espaço vazio (aproximado)

Violações são registradas mas não bloqueiam build.

### 6.2 Verificação em tempo de execução

Se uma tela dinâmica (com dados variáveis) excede os limites:

1. Registro em log de desempenho cognitivo
2. Sugestão ao Assistente (não ao usuário)
3. Assistente pode sugerir ocultar elementos sedensidade > 120% do limite
4. Se densidade > 150%: Assistente pergunta se empresário quer simplificar a tela

### 6.3 Limite de segurança

Nenhuma tela deve exceder 15 elementos totais (cognitivos + interativos) independentemente do contexto.

Se uma tela atinge 12 elementos (próximo do limite): o Assistente sugere simplificação.

---

## 7. Contratos de Densidade (Resumo)

1. Máximo 7 elementos cognitivos, 5 interativos, 3 em destaque por tela.
2. Mínimo 1 elemento por tela (nunca tela vazia sem propósito).
3. Apenas 1 ação primária visível. Máximo 2 ações secundárias.
4. Ações terciárias sempre em menu ou "Mais opções".
5. Apenas 1 destaque primário. Máximo 2 destaques secundários. Zero conflitantes.
6. Apenas 1 animação principal por vez. Máximo 2 movimentos sutis.
7. Máximo 3 cores por tela (exclusive neutros e gráficos).
8. Máximo 3 níveis hierárquicos visíveis. 4º nível sob demanda.
9. Espaço vazio mínimo varia por contexto: 15% (lista) a 50%+ (landing).
10. Violações de densidade são registradas, não bloqueiam, geram sugestão do Assistente.
