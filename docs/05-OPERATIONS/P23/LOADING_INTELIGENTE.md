# Loading Inteligente

## 1. Conceito

Eliminar todo loader genérico (spinner infinito, barra indeterminada). Substituir por narrações do processo real do Motor Cognitivo. Cada fase de carregamento exibe o que o motor está fazendo naquele momento — com texto, animação e duração condizentes.

O loading inteligente transforma tempo de espera em tempo de entendimento. O empresário não espera: ele acompanha.

---

## 2. Fases do Motor Cognitivo

### Mapeamento Fase → Texto → Animação → Duração

| Fase do Motor | Texto Visível | Animação | Duração Esperada | Gatilho Real |
|---|---|---|---|---|
| 1. Análise de clientes | "Relacionando clientes..." | Pontos conectando-se em rede | 1-3s | Motor consulta base de clientes e monta grafo de relações |
| 2. Cruzamento de dados | "Comparando padrões..." | Duas ondas aproximando-se e sobrepondo | 2-5s | Motor cruza variáveis (ex: ticket × sazonalidade) |
| 3. Formação de conjectura | "Construindo hipótese..." | Estrutura molecular montando-se | 1-4s | Motor cruza indícios e forma hipótese inicial |
| 4. Validação | "Calculando confiança..." | Barra de medição subindo/descendo | 1-2s | Motor calcula confiança da hipótese |
| 5. Descoberta de padrão | "Detectando oportunidades..." | Pontos brilhantes emergindo de nuvem | 2-4s | Motor identifica padrão relevante |
| 6. Estruturação | "Organizando conhecimento..." | Cards empilhando-se em árvore | 1-3s | Motor estrutura descobertas em hierarquia |
| 7. Formatação | "Preparando recomendações..." | Documento sendo escrito linha a linha | 1-3s | Motor gera texto de saída formatado |

### Pipeline real integrado

O loading NUNCA é falso. Cada texto mapeia 1:1 para uma etapa real do pipeline do Motor Cognitivo:

```
Pipeline do Motor
─────────────────────────────────────────────
1. analyzeClients()      → "Relacionando clientes..."
2. crossReference()      → "Comparando padrões..."
3. buildHypothesis()     → "Construindo hipótese..."
4. calculateConfidence() → "Calculando confiança..."
5. detectOpportunities() → "Detectando oportunidades..."
6. organizeKnowledge()   → "Organizando conhecimento..."
7. formatRecommendations() → "Preparando recomendações..."
```

Se uma fase for pulada (ex: motor já tem hipótese pronta, pula construção), a UI também pula — NUNCA mostra fase que não executou.

---

## 3. Animação por Fase

### 3.1 "Relacionando clientes..."

**Animação:** Círculos (representando clientes) aparecendo em tela escura. Linhas finas conectando círculos gradualmente. Novos círculos surgindo nas bordas, conectando-se aos existentes. Velocidade: 1 nova conexão a cada 300ms.

**Metáfora:** O motor está literalmente montando o grafo de clientes.

**Transição de entrada:** Fade-in de toda cena (200ms). Círculos surgem do centro para as bordas.

**Transição de saída:** Círculos encolhem para um ponto central (300ms). Texto fade-out.

### 3.2 "Comparando padrões..."

**Animação:** Duas formas de onda (sine waves) em cores diferentes aproximando-se horizontalmente de lados opostos. Ao se encontrarem no centro, formam uma terceira onda (interferência construtiva) que pulsa.

**Metáfora:** Dados sendo sobrepostos, padrões emergindo da interseção.

**Transição de entrada:** Ondas surgem das bordas e deslizam para o centro.

**Transição de saída:** Onda resultante se dissolve em partículas.

### 3.3 "Construindo hipótese..."

**Animação:** Estrutura molecular — esferas (indícios) conectando-se por hastes brilhantes, formando uma estrutura tridimensional que gira lentamente.

**Metáfora:** Hipótese sendo montada peça por peça.

**Transição de entrada:** Esferas caem de cima (com bounce suave) e conectam-se.

**Transição de saída:** Estrutura brilha intensamente e fade-out.

### 3.4 "Calculando confiança..."

**Animação:** Barra vertical numerada de 0 a 100. Um marcador sobe e desce até estabilizar no valor calculado. Ao estabilizar, o número é revelado com glow.

**Metáfora:** Instrumento de medição preciso.

**Transição de entrada:** Barra aparece crescendo de baixo para cima (200ms).

**Transição de saída:** Número final brilha e encolhe, sumindo.

### 3.5 "Detectando oportunidades..."

**Animação:** Nuvem de partículas escuras. Gradualmente, partículas douradas começam a brilhar dentro da nuvem. As partículas brilhantes se agrupam em constelações.

**Metáfora:** Sinal emergindo do ruído.

**Transição de entrada:** Nuvem aparece por difusão.

**Transição de saída:** Constelações expandem-se e dissolvem-se em luz.

### 3.6 "Organizando conhecimento..."

**Animação:** Cards (representando pedaços de conhecimento) empilhando-se em estrutura de árvore hierárquica. Cards maiores no topo (conceitos gerais), menores embaixo (detalhes). Conexões visuais entre eles.

**Metáfora:** Conhecimento sendo estruturado em taxonomia.

**Transição de entrada:** Cards voam de diferentes direções para suas posições.

**Transição de saída:** Cards se reorganizam em grid antes de sumir.

### 3.7 "Preparando recomendações..."

**Animação:** Linhas de texto sendo escritas uma a uma (como máquina de escrever), com cursor piscando. Cada linha aparece com fade-in suave. Ao final, um documento é "dobrado" e desaparece.

**Metáfora:** Documento sendo redigido.

**Transição de entrada:** Primeira linha aparece com cursor.

**Transição de saída:** Documento se fecha como envelope e fade-out.

---

## 4. Duração e Comportamento

### Timing real

Cada fase reporta ao frontend:

```json
{
  "phase": "crossReference",
  "text": "Comparando padrões...",
  "expectedMs": 3500,
  "actualMs": 2800,
  "progress": 0.0..1.0,
  "state": "inProgress" | "completed" | "skipped"
}
```

O frontend usa `actualMs` para a barra de progresso e `expectedMs` para estimar fallback.

### Transição entre fases

- Fase atual: animação principal visível + texto
- Transição: 300ms de sobreposição — animação da fase anterior dissolve enquanto a nova surge
- Se fase dura <500ms (muito rápida): o texto aparece mas a animação não chega a completar um ciclo — mostra o texto + fade rápido

### Fallback se exceder tempo

Se `actualMs` > `expectedMs * 2.5`:

1. A animação da fase continua, mas o texto muda para: "Ainda [texto original]..."
2. Adiciona uma mensagem secundária: "Isso está demorando mais que o normal."
3. Se exceder `expectedMs * 5`: entra o protocolo de timeout (seção 6 deste documento)

### Se fase for muito rápida (<300ms)

O texto ainda aparece, mas a transição de entrada + saída é acelerada (100ms cada). Não pula a fase visualmente — apenas compacta.

---

## 5. Como Evitar Parecer Fake

### Regras absolutas

1. **Nunca mostrar fase que não executou.** Se o motor pulou `crossReference()` porque não havia dados para cruzar, o loading pula de "Relacionando clientes" direto para "Construindo hipótese".

2. **Nunca mostrar progresso artificial.** A barra de progresso reflete `actualMs / expectedMs` da fase atual. Não existe preenchimento falso para "dar sensação de velocidade".

3. **Nunca mostrar texto genérico.** Todo texto mapeia 1:1 para uma função no Motor Cognitivo. Se não existe função "Analisando métricas", o texto não existe.

4. **Transparência sobre o que está acontecendo.** O empresário pode clicar no texto do loading para expandir um tooltip com detalhes técnicos legíveis:

```
Tooltip:
"Estou comparando o ticket médio dos seus clientes com a sazonalidade
dos últimos 12 meses para identificar padrões de concentração."
```

5. **Variação textual.** O motor tem 3-5 variações de texto para cada fase, escolhidas aleatoriamente, para não parecer repetitivo:

| Fase | Variações |
|---|---|
| Relacionando clientes | "Relacionando clientes..." / "Mapeando base de clientes..." / "Conectando dados de clientes..." |
| Comparando padrões | "Comparando padrões..." / "Cruzando informações..." / "Buscando correlações..." / "Analisando variáveis..." |
| Construindo hipótese | "Construindo hipótese..." / "Montando conjectura..." / "Formando tese..." / "Estruturando suspeita..." |
| Calculando confiança | "Calculando confiança..." / "Validando consistência..." / "Verificando evidências..." / "Medindo precisão..." |
| Detectando oportunidades | "Detectando oportunidades..." / "Encontrando padrões..." / "Identificando insights..." / "Revelando descobertas..." |
| Organizando conhecimento | "Organizando conhecimento..." / "Estruturando descobertas..." / "Hierarquizando informações..." / "Classificando resultados..." |
| Preparando recomendações | "Preparando recomendações..." / "Formatando diagnóstico..." / "Gerando saída..." / "Montando relatório..." |

---

## 6. Estado de Timeout

Se o processamento total exceder o limite definido (atualmente 30s):

```
┌───────────────────────────────────────────┐
│                                           │
│  ⏳ A análise está demorando mais         │
│  que o esperado.                          │
│                                           │
│  [Continuar mesmo assim]                  │
│  [Tentar novamente]                       │
│  [Cancelar]                               │
│                                           │
└───────────────────────────────────────────┘
```

- "Continuar mesmo assim": loading continua, mas em background — empresário pode interagir com o chat enquanto espera
- "Tentar novamente": reinicia o pipeline
- "Cancelar": volta ao estado anterior, sem prejuízo de dados já coletados

---

## 7. Integração com Pipeline Real

### Fluxo de comunicação Frontend ↔ Motor Cognitivo

```
Frontend                                     Motor Cognitivo
─────────                                     ──────────────
                                             
                    processRequest()
       ─────────────────────────────────►
                                             
                    status{phase, progress}
       ◄─────────────────────────────────
       (a cada 500ms, via WebSocket
        ou polling leve)
                                             
                    resultComplete(data)
       ◄─────────────────────────────────
```

### Formato do evento de status

```json
{
  "event": "cognitiveEngine.status",
  "data": {
    "sessionId": "abc-123",
    "currentPhase": {
      "id": "crossReference",
      "text": "Comparando padrões...",
      "startedAt": 1711400000000,
      "expectedMs": 3500,
      "progress": 0.65
    },
    "phaseHistory": [
      { "id": "analyzeClients", "durationMs": 1200 },
      { "id": "crossReference", "status": "inProgress" }
    ],
    "estimatedRemainingMs": 4200
  }
}
```

### O que o frontend faz com cada campo

| Campo | Uso no frontend |
|---|---|
| `currentPhase.id` | Seleciona animação correspondente |
| `currentPhase.text` | Exibe texto (ou pode substituir por variação, mantendo o mesmo id) |
| `currentPhase.progress` | Preenche barra de progresso da fase |
| `phaseHistory` | Usado para animação de transição entre fases |
| `estimatedRemainingMs` | Estima tempo restante total para fallback |
| `currentPhase.startedAt` | Calcula se excedeu expectedMs para trigger de fallback |

---

## 8. Estados de Loading

### Estado 1 — Inicial (0-100ms)

- Background escurece (opacity 0 → 0.3, 200ms)
- Primeira fase detectada e exibida
- Nenhuma animação visível ainda (apenas texto fade-in)

### Estado 2 — Processando (100ms até conclusão)

- Animação ativa da fase corrente
- Texto visível
- Barra de progresso preenchendo (se fase com progresso reportado)
- Transições entre fases

### Estado 3 — Concluído (última fase)

- Última animação executa até o fim
- Texto "Preparando recomendações..." conclui
- Fade-out de toda a tela de loading (400ms)
- Conteúdo do resultado aparece com fade-in

### Estado 4 — Erro

Se qualquer fase falhar:

```
┌───────────────────────────────────────────┐
│                                           │
│  ⚠️ Não consegui concluir [fase]          │
│                                           │
│  Motivo: [mensagem técnica legível]       │
│  Exemplo: "Não foi possível acessar       │
│  a base de clientes."                      │
│                                           │
│  [Tentar novamente]  [Continuar parcial]  │
│                                           │
└───────────────────────────────────────────┘
```

- "Continuar parcial": segue com o que foi processado até o momento, ignorando fases pendentes
- "Tentar novamente": reinicia da fase que falhou (não do início)

---

## 9. Mobile e Modos Alternativos

### Mobile (viewport <768px)

- Animação principal ocupa a tela inteira, mas com elementos maiores
- Texto com fonte 20px mínimo
- Barra de progresso mais espessa (8px)
- Sem tooltips (texto de detalhe já incluso abaixo do principal)

### Modo "apenas texto" (acessibilidade / preferência)

Usuário pode configurar para exibir apenas o texto sem animações:

```
Relacionando clientes... [████░░░░░░] 35%
Comparando padrões...    [████████░░] 78%
Construindo hipótese...  [▓▓▓▓▓▓▓▓▓▓] 100%
```

Ativado via preferência do usuário ou se `prefers-reduced-motion` estiver ativo.

---

## 10. Aderência ao Pipeline Real

Cada loading phase deve ser implementada como um listener no Cognitive Engine:

```javascript
// Exemplo conceitual de integração
cognitiveEngine.on('phaseChange', (phase) => {
  loadingUI.setPhase({
    id: phase.id,
    text: phase.text,
    animation: ANIMATION_MAP[phase.id],
    progress: phase.progress
  });
});
```

A source of truth das fases está no Motor Cognitivo. O frontend apenas escuta e renderiza. Se o motor reporta uma fase desconhecida, o frontend mostra um fallback genérico ("Processando...") — mas isso é um alerta de que o motor adicionou uma fase sem atualizar o frontend.