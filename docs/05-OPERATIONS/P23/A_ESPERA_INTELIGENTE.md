# A Espera Inteligente

## 1. Conceito

Esperas longas de análise (15-60s) são o momento de maior risco de abandono. O empresário não sabe se o sistema travou, se está processando, ou se simplesmente ignorou ele.

A Espera Inteligente transforma esse período em uma experiência guiada, com transparência total sobre o progresso, previsibilidade de conclusão, e uma escolha real: esperar ou continuar.

---

## 2. Timeline da Espera

### 0s — Início da análise

O empresário completou o questionário inicial ou solicitou uma análise completa.

**O que o empresário vê:**

- Tela de transição: conteúdo anterior escurece suavemente
- Texto central: "Estamos montando seu diagnóstico."
- Subtítulo: "Estou processando as informações que você forneceu."
- Barra de progresso única, indeterminada (pulsação suave)
- Botão no canto inferior: "Quero responder mais perguntas" (link para continuar)

**Animação:** Background gradient animado (rotação lenta de 30s). Texto fade-in 300ms.

**O que ele pode fazer:** Clicar em "Quero responder mais perguntas" para sair da espera. Ou aguardar.

---

### 2s — Primeira fase identificada

**O que o empresário vê:**

```
┌───────────────────────────────────────────┐
│  Analisando sua empresa                    │
│                                           │
│  ● Relacionando clientes...    [ativo]    │
│  ○ Comparando padrões...       [3s]       │
│  ○ Construindo hipótese...     [5s]       │
│  ○ Calculando confiança...     [7s]       │
│  ○ Detectando oportunidades..  [10s]      │
│  ○ Organizando conhecimento..  [12s]      │
│  ○ Preparando recomendações..  [15s]      │
│                                           │
│  ⏱️ Tempo estimado: 15-25 segundos        │
│                                           │
│  [Continuar agora] — sem perder progresso │
└───────────────────────────────────────────┘
```

- Lista numerada de etapas (até 7, conforme o pipeline)
- Etapa atual: bullet cheio + "ativo" + animação de processamento ao lado
- Etapas futuras: bullet vazio + estimativa de quando serão executadas
- Etapas concluídas: bullet verde com check
- Barra de progresso: agora determinada, preenchendo conforme etapas concluídas

**Transição de entrada:** A tela inicial (texto único + barra indeterminada) dissolve-se na tela de etapas (400ms).

---

### 5s — Primeiras etapas concluídas

**O que muda:**

- "Relacionando clientes..." → check verde
- "Comparando padrões..." → estado ativo
- Barra de progresso em ~20%
- Tempo estimado recalculado com base na duração real das primeiras etapas
- Se as primeiras etapas foram mais rápidas que o esperado, o tempo estimado restante diminui

**Micro-interação:** Ao marcar check verde, o bullet dá um "pulo" (scale 1.2) e brilha (200ms).

---

### 10s — Ponto de decisão

**O que o empresário vê:**

Mesma tela, mas:

- Botão "Continuar agora" se torna mais proeminente (muda de cinza para cor primária)
- Texto adicional acima do botão: "Enquanto isso, posso fazer mais perguntas — não perco o que já processei."
- Se o empresário não interage, a tela continua normalmente

**Comportamento do botão:**

```
[Continuar agora] — leva para o chat ativo
                   — motor continua processando em background
                   — ao terminar, notificação: "Análise concluída!"
                   — empresário pode visualizar resultado quando quiser

[Esperar análise completa] — permanece na tela de espera
                           — ao final, transição suave para resultados
```

---

### 15-25s — Conclusão normal

**Fluxo de conclusão:**

1. Última etapa marca check verde
2. Texto muda: "Diagnóstico concluído!"
3. Barra de progresso atinge 100%
4. Brilho crescente na tela (1s)
5. Conteúdo de resultado aparece com fade-in (600ms)
6. Tela de espera dissolve-se

**Som:** (se habilitado) tom suave de conclusão — não obrigatório, mas disponível como configuração

---

### 30s+ — Excedeu tempo estimado

Se a análise ultrapassar o tempo máximo estimado:

```
┌───────────────────────────────────────────┐
│  ⏳ A análise está demorando mais         │
│  que o previsto.                          │
│                                           │
│  Motivo: [fase atual] está levando        │
│  mais tempo que o normal.                  │
│                                           │
│  Você pode:                                │
│  • Continuar no chat enquanto espero      │
│  • Aguardar mais um pouco                 │
│  • Receber um alerta quando ficar pronto  │
│                                           │
└───────────────────────────────────────────┘
```

- A barra de progresso para de avançar?
  - Não. Ela continua refletindo o progresso real (se passou de 80%, mostra 80%).
  - Mas o "tempo estimado" é substituído por "levando mais tempo que o previsto".
- As animações das fases continuam normalmente — não congelam.

---

## 3. Estados da Espera

### Estado Normal (0-25s, dentro do esperado)

- Tela de etapas com progresso
- Atualizações a cada etapa concluída
- Botão "Continuar agora" disponível desde o início, mais visível a partir de 10s
- Tempo estimado visível e recalculado a cada etapa

### Estado Estendido (25-60s, acima do esperado)

- Mensagem de "demorando mais que o previsto" aparece
- Botões: "Continuar no chat", "Aguardar", "Receber alerta"
- Se "Aguardar": tela continua normalmente, com atualizações a cada etapa
- Se "Receber alerta": empresário é liberado para outras atividades; ao concluir, notificação no canto

### Estado de Erro

Se a análise falhar:

```
┌───────────────────────────────────────────┐
│                                           │
│  ⚠️ Não foi possível concluir a análise   │
│                                           │
│  Ocorreu um erro ao [fase com erro].      │
│  Isso não afeta as respostas que você     │
│  já deu — seus dados estão salvos.        │
│                                           │
│  [Tentar novamente]                       │
│  [Continuar mesmo com análise parcial]    │
│  [Falar com suporte]                      │
│                                           │
└───────────────────────────────────────────┘
```

- **"Tentar novamente":** reinicia a análise do início
- **"Continuar mesmo com análise parcial":** leva ao resultado com o que foi processado até o momento
- **"Falar com suporte":** abre canal de suporte (chat, email, ou whatsapp)

### Estado de Timeout (60s+)

Se a análise excede o limite máximo absoluto (60s):

```
┌───────────────────────────────────────────┐
│                                           │
│  ⏰ Tempo limite excedido                  │
│                                           │
│  A análise ultrapassou o tempo máximo.    │
│  Seus dados foram salvos — você pode      │
│  tentar novamente ou continuar com o      │
│  que já foi processado.                    │
│                                           │
│  [Tentar novamente]                       │
│  [Continuar com análise parcial]          │
│                                           │
└───────────────────────────────────────────┘
```

O timeout é um mecanismo de segurança — não deve ocorrer em condições normais. Se ocorre com frequência (>5% das sessões), é sinal de problema no Motor Cognitivo.

---

## 4. Ação: "Continuar Agora"

### O que acontece

Empresário clica em "Continuar agora":

1. Tela de espera fecha com fade-out (300ms)
2. Empresário volta ao chat ativo
3. Mensagem no chat: "A análise continua em background. Avise quando terminar."
4. Motor Cognitivo continua processando normalmente
5. Quando a análise termina, notificação no canto inferior:
   ```
   ┌─────────────────────────────────┐
   │ ✅ Análise concluída!            │
   │ Toque para ver resultados       │
   └─────────────────────────────────┘
   ```

### Estado do chat durante background

- Empresário pode continuar respondendo perguntas
- Novas respostas alimentam a análise em andamento (o motor incorpora em tempo real)
- Se o motor já passou da fase que a nova resposta afetaria, a resposta é registrada para a próxima análise

### Se o empresário escolhe esperar

- Tela de espera contínua
- Ao final, transição direta para resultados
- Empresário não perde tempo de espera — vê o resultado assim que pronto

---

## 5. Retomada (Sair e Voltar)

### Cenário

Empresário inicia análise, sai do navegador (ou muda de tela), e retorna minutos ou horas depois.

### Comportamento

1. Ao retornar, verifica se há análise em andamento ou concluída para a sessão
2. Se análise **concluída**: notificação aguardando + botão "Ver resultados"
3. Se análise **em andamento**: tela de espera retoma do estado atual (ou exibe "Ainda processando..." se passou muito tempo)
4. Se análise **falhou/timeout**: mensagem de erro com opções

### Persistência

- Estado da análise é salvo no backend a cada etapa concluída
- Frontend recupera o estado ao reconectar
- Se a sessão expirou (mais de 24h), análise é descartada e empresário deve reiniciar

---

## 6. Design Visual da Tela de Espera

### Layout (desktop)

```
┌──────────────────────────────────────────────────┐
│                                                  │
│              ⊙  [animação central]              │
│                                                  │
│    Estamos montando seu diagnóstico.              │
│    (subtítulo variável conforme etapa atual)      │
│                                                  │
│    ● Relacionando clientes...            ● ● ●   │
│    ● Comparando padrões...              ●   ●    │
│    ○ Construindo hipótese...              ●      │
│    ○ Calculando confiança...                     │
│    ○ Detectando oportunidades...                  │
│    ○ Organizando conhecimento...                  │
│    ○ Preparando recomendações...                  │
│                                                  │
│    ════════════════▓▓░░░░░░░░ 45%                │
│                                                  │
│    ⏱️ Tempo estimado: 15-25 segundos              │
│                                                  │
│    [Continuar agora]        [Esperar análise]     │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Layout (mobile)

- Mesma estrutura, mas empilhada verticalmente
- Lista de etapas em 2 colunas (4 à esquerda, 3 à direita) ou scroll vertical
- Botões em largura total
- Animação central menor (economia de espaço)

### Cores

- Fundo: gradiente escuro (#0F172A → #1E293B)
- Texto principal: #F8FAFC
- Texto secundário: #94A3B8
- Barra de progresso: gradiente índigo (#6366F1 → #818CF8)
- Check concluído: #10B981
- Etapa ativa: #818CF8 + glow sutil
- Etapa futura: #334155

### Animações

| Elemento | Animação | Duração |
|---|---|---|
| Background | Gradiente rotacionando lentamente | 30s/ciclo |
| Etapa concluída | Scale 1.2 + glow verde | 200ms |
| Etapa ativa | Pulsação sutil (opacity) | 1.5s/ciclo |
| Barra de progresso | Preenchimento com ease-out | Por etapa |
| Transição de telas | Fade-in/out | 300-600ms |
| Notificação de conclusão | Slide-up do canto inferior | 400ms |

---

## 7. Mensagens Específicas por Contexto

### Primeira análise (empresário novo)

- Texto: "Estou montando seu primeiro diagnóstico."
- Subtítulo: "Vou processar todas as informações que você compartilhou."
- Tom: acolhedor, paciente

### Análise subsequente (empresário recorrente)

- Texto: "Atualizando seu diagnóstico."
- Subtítulo: "Já tenho dados anteriores — estou incorporando as novidades."
- Tom: mais rápido, confiante
- Tempo estimado: menor (10-15s) porque parte da análise é reaproveitada

### Análise aprofundada (empresário solicitou análise extra)

- Texto: "Aprofundando a análise..."
- Subtítulo: "Vou cruzar dados com mais detalhes desta vez."
- Tom: focado, analítico

---

## 8. Métricas e Monitoramento

### O que medir

- **Tempo médio de espera real vs estimado** — erro <30% é aceitável
- **Taxa de abandono durante espera** — alvo <10%
- **Taxa de clique em "Continuar agora"** — se >50%, talvez a espera seja longa demais
- **Taxa de retomada após saída** — se >20%, empresários estão saindo e voltando, o que é saudável
- **Fase mais lenta do pipeline** — onde o motor mais demora (candidate a otimização)
- **Fase com maior taxa de erro** — onde o motor mais falha

### Alertas

- Se tempo médio de espera >50s: alerta de performance no motor
- Se taxa de abandono >20%: alerta de UX crítico
- Se taxa de timeout >5%: alerta de infraestrutura

---

## 9. Integração com Loading Inteligente

A Espera Inteligente e o Loading Inteligente compartilham o mesmo pipeline de fases (seção 2 do documento LOADING_INTELIGENTE.md).

A diferença é:

- **Loading Inteligente:** usado em micro-esperas (1-8s), análises rápidas, transições entre perguntas
- **Espera Inteligente:** usado em esperas longas (15-60s), análise completa, processamento batch

Ambos usam o mesmo sistema de eventos do Motor Cognitivo. A Espera Inteligente é uma versão expandida e mais rica do Loading Inteligente, com lista de etapas, timeline, e opção de continuar em background.

### Regra de seleção

| Duração esperada | Qual usar |
|---|---|
| 0-8s | Loading Inteligente (fases simples) |
| 8-60s | Espera Inteligente (tela completa com etapas) |
| >60s | Espera Inteligente + estado de timeout |

O frontend decide qual usar baseado no `estimatedRemainingMs` do primeiro evento de status do motor.

---

## 10. Acessibilidade

- Todas as animações respeitam `prefers-reduced-motion`
- Em modo reduzido: animações são substituídas por transições instantâneas ou barras estáticas
- Leitores de tela: cada etapa concluída dispara notificação ARIA: "Etapa concluída: [nome da etapa]"
- Contraste: todas as combinações de cor atendem WCAG AA (4.5:1)
- Foco visível em todos os botões e elementos interativos
- Navegação por teclado: Tab entre botões, Enter para selecionar, ESC para fechar notificações