# Sistema de Insights

## Fase 7 — A IA Explica o Que Está Fazendo

## 1. Conceito

Não basta a IA chegar à resposta certa — ela precisa mostrar como chegou lá. O Sistema de Insights é a camada de autoexplicação do Motor Cognitivo: mensagens, badges, tooltips e cards que revelam ao empresário o raciocínio em andamento.

O objetivo não é explicar tecnologia. É mostrar competência. O empresário confia mais quando entende o processo.

---

## 2. Padrões de Mensagem

### 2.1 "Estou analisando seu fluxo comercial..."

| Campo | Valor |
|---|---|
| **Gatilho** | Motor identifica a área de análise predominante ao iniciar o diagnóstico (ex: detecta que empresa tem alta sazonalidade e foca em Operação) |
| **Nível de confiança associado** | 0-20% (exploratório) |
| **Timing** | Aparece nas primeiras 2-3 interações, assim que o motor define um "foco inicial" |
| **Duração visível** | 4-8 segundos, ou até o motor mudar de área |
| **Formato visual** | Texto em badge sutil no topo do chat, com ícone da área correspondente |
| **Transição de entrada** | Fade-in (300ms) vindo do canto superior esquerdo |
| **Transição de saída** | Fade-out (300ms) ou substituição por outro insight |
| **Relação com painel cognitivo** | Barra da área correspondente ganha destaque (brilho) |
| **Variações** | "Estou analisando seu fluxo comercial..." / "Estou focando na operação da sua empresa..." / "Estou examinando como sua empresa funciona no dia a dia..." |

### 2.2 "Percebi uma possível dependência do proprietário..."

| Campo | Valor |
|---|---|
| **Gatilho** | Motor cruza informações (ex: empresário menciona que aprova pessoalmente compras > R$500, que não tem substituto para funções-chave, que trabalha >50h/semana) e forma hipótese de gargalo |
| **Nível de confiança associado** | 50-74% (hipótese em verificação) |
| **Timing** | Após o empresário dar 2+ respostas que reforçam o mesmo padrão |
| **Duração visível** | Persiste como card no painel cognitivo até ser confirmada ou refutada |
| **Formato visual** | Card expansível no painel cognitivo + texto inline no chat |
| **Transição de entrada** | Card slide-up + glow amarelo sutil (400ms) |
| **Transição de saída** | Se confirmada: glow verde e transição para "diagnóstico". Se refutada: fade-out silencioso (500ms) |
| **Relação com painel cognitivo** | Card de hipótese correspondente aparece/atualiza no painel |
| **Variações** | "Percebi que você pode estar centralizando decisões..." / "Notei uma possível concentração de poder em você..." / "Identifiquei um padrão de dependência da sua figura..."

### 2.3 "Vou investigar isso..."

| Campo | Valor |
|---|---|
| **Gatilho** | Empresário responde algo que abre um ramo de investigação (ex: "sim, tenho dificuldade com fluxo de caixa") — motor decide aprofundar |
| **Nível de confiança associado** | 20-50% (precisa de mais dados) |
| **Timing** | Imediatamente após resposta do empresário, antes da próxima pergunta |
| **Duração visível** | 2-4 segundos |
| **Formato visual** | Texto inline no chat, com seta ou ícone de lupa |
| **Transição de entrada** | Fade-in + slide-right (200ms) |
| **Transição de saída** | Fade-out enquanto a próxima pergunta aparece |
| **Relação com painel cognitivo** | Lacuna relacionada ao tópico ganha destaque |
| **Variações** | "Vou investigar isso mais a fundo..." / "Deixa eu entender melhor..." / "Vou aprofundar essa questão..." / "Quero explorar esse ponto..."

### 2.4 "Já tenho evidências suficientes..."

| Campo | Valor |
|---|---|
| **Gatilho** | Confiança em uma hipótese ultrapassa 80% e o motor não precisa de mais perguntas sobre aquele tópico |
| **Nível de confiança associado** | 80-100% |
| **Timing** | Quando o motor decide parar de perguntar sobre um tópico específico |
| **Duração visível** | Badge persistente até o final da seção |
| **Formato visual** | Badge verde ao lado da hipótese confirmada no painel + texto inline |
| **Transição de entrada** | Pop-in com escala (200ms) + glow verde |
| **Transição de saída** | Não some — permanece como selo de "confirmado" |
| **Relação com painel cognitivo** | Hipótese marca "Evidências suficientes". Confiança da área aumenta. Lacuna correspondente é fechada |
| **Variações** | "Já tenho informações suficientes sobre isso." / "Com o que você me disse, já posso concluir esse ponto." / "Entendi. Não preciso perguntar mais sobre esse assunto."

### 2.5 "Não preciso perguntar novamente..."

| Campo | Valor |
|---|---|
| **Gatilho** | Empresário fornece informação que o motor já havia perguntado antes (voluntariamente ou em resposta a outra pergunta). Motor reconhece que já sabe |
| **Nível de confiança associado** | 90-100% na informação específica |
| **Timing** | Imediatamente após empresário dar informação redundante |
| **Duração visível** | 3-5 segundos |
| **Formato visual** | Tooltip discreto ao lado da mensagem do empresário |
| **Transição de entrada** | Fade-in discreto (300ms) |
| **Transição de saída** | Fade-out (300ms) |
| **Relação com painel cognitivo** | Nenhuma (informação já estava registrada) |
| **Variações** | "Você já mencionou isso — não precisa repetir." / "Já anotei isso da outra vez." / "Lembro dessa informação." / "Está nos meus registros."

### 2.6 "Ainda não tenho confiança suficiente..."

| Campo | Valor |
|---|---|
| **Gatilho** | Empresário pergunta "você tem certeza?" ou motor detecta que confiança está baixa (<50%) e quer ser transparente |
| **Nível de confiança associado** | 0-50% |
| **Timing** | Quando o empresário questiona uma recomendação, ou automaticamente se confiança está baixa |
| **Duração visível** | Persiste como badge laranja até confiança subir |
| **Formato visual** | Badge laranja + tooltip com explicação |
| **Transição de entrada** | Fade-in + pulse laranja (300ms) |
| **Transição de saída** | Badge muda para verde quando confiança atinge >75%. Se não atingir, badge some apenas quando tópico é encerrado |
| **Relação com painel cognitivo** | Anel de confiança fica em faixa laranja/amarela. Lacunas abertas relacionadas ficam destacadas |
| **Variações** | "Ainda estou em dúvida sobre isso..." / "Não tenho dados suficientes para afirmar com segurança." / "Isso ainda não está claro para mim." / "Prefiro confirmar mais antes de afirmar."

### 2.7 "Preciso confirmar mais uma informação..."

| Campo | Valor |
|---|---|
| **Gatilho** | Motor está prestes a formar uma hipótese relevante, mas precisa de 1 dado específico para confirmar |
| **Nível de confiança associado** | 50-70% |
| **Timing** | Aparece como preâmbulo da próxima pergunta |
| **Duração visível** | 2-3 segundos antes da pergunta aparecer |
| **Formato visual** | Texto inline + transição suave para a pergunta |
| **Transição de entrada** | Fade-in (200ms) |
| **Transição de saída** | Texto dissolve-se na pergunta real (não há gap visual entre os dois) |
| **Relação com painel cognitivo** | Lacuna específica fica "piscando" (atenção do empresário) |
| **Variações** | "Só mais uma coisa..." / "Preciso de um último dado para confirmar." / "Deixa só confirmar um ponto..." / "Mais uma perguntinha..."

---

## 3. Formato Visual por Tipo

### Badge (insight contínuo)

- Exibido no topo do chat ou ao lado de cards
- Fundo: cor conforme nível (verde=confiança alta, laranja=média, cinza=exploratório)
- Ícone: conforme contexto (lupa, cérebro, check, alerta)
- Tamanho: compacto (altura 24px)
- Pode conter tooltip com explicação estendida

### Card (hipótese ou descoberta)

- No painel cognitivo (sidebar)
- Título, confiança, descrição, ações
- Entrada/saída com animação
- Pode ser expandido para detalhes

### Texto inline (transição ou justificativa)

- Diretamente no fluxo do chat
- Fonte menor (14px vs 16px das perguntas)
- Cor secundária (slate-400)
- Aparece e desaparece naturalmente

### Tooltip (explicação sob demanda)

- Acionado por hover/clique em badge, card ou texto
- Conteúdo: explicação completa do raciocínio
- Largura máxima: 300px
- Fundo escuro (slate-800) com borda sutil

---

## 4. Arquitetura do Sistema de Insights

### Componentes

```
SistemaDeInsights
│
├── GeradorDeMensagens
│   ├── templateEngine    (escolhe variação)
│   ├── levelCalculator   (mapeia confiança → tom)
│   └── timingOrchestrator (decide quando mostrar)
│
├── Renderizador
│   ├── badgeRenderer
│   ├── cardRenderer
│   ├── inlineRenderer
│   └── tooltipRenderer
│
├── GerenciadorDeEstado
│   ├── activeInsights    (quais insights estão visíveis agora)
│   ├── insightHistory    (histórico da sessão)
│   └── priorityQueue    (fila de insights a mostrar)
│
└── IntegraçãoMotor
    ├── cognitiveEventBus (escuta eventos do Motor)
    └── confidenceFeed    (recebe atualizações de confiança)
```

### Eventos do Motor que geram insights

| Evento do Motor | Insight Gerado |
|---|---|
| `areaIdentified` | "Estou analisando seu fluxo..." |
| `hypothesisFormed` | "Percebi uma possível..." |
| `investigationStarted` | "Vou investigar isso..." |
| `evidenceSufficient` | "Já tenho evidências suficientes..." |
| `informationDuplicate` | "Não preciso perguntar novamente..." |
| `lowConfidence` | "Ainda não tenho confiança suficiente..." |
| `confirmNeeded` | "Preciso confirmar mais uma informação..." |

### Regras de prioridade e supressão

1. **Máximo de 2 insights visíveis simultaneamente no chat** (para não poluir)
2. **Badges/persistentes não contam no limite** (podem coexistir com 2 insights inline)
3. **Se dois insights concorrem, vence o de maior urgência**: confirmNeeded > hypothesisFormed > investigationStarted > evidenceSufficient > areaIdentified > lowConfidence > informationDuplicate
4. **Insight não se repete em menos de 5 turnos** (evita redundância)
5. **Se empresário ignorou insight 2+ vezes seguidas** (não clicou, não respondeu), o insight não reaparece pelo resto da sessão

---

## 5. Cadeia de Confiança

O sistema de insights tem seu próprio indicador de confiança — não do diagnóstico, mas da própria IA sobre seu processo:

### Autoavaliação da IA

| Estado | O que a IA diz | Quando |
|---|---|---|
| Explorando | "Estou conhecendo sua empresa." | Início |
| Investigando | "Estou começando a ver padrões." | Hipóteses iniciais |
| Verificando | "Estou confirmando minhas suspeitas." | Confiança 50-75% |
| Confiante | "Já tenho clareza sobre sua situação." | Confiança >75% |
| Pronto | "Posso gerar um diagnóstico completo." | Confiança >90% |

Cada estado altera sutilmente o tom verbal:
- Explorando: "Vou fazer algumas perguntas para entender..."
- Investigando: "Suas respostas estão revelando um padrão..."
- Verificando: "Deixa eu confirmar se estou certo..."
- Confiante: "Com base no que você disse, posso afirmar..."
- Pronto: "Tenho informações suficientes para concluir..."

---

## 6. Variações e Personalidade

O sistema tem 5-7 variações para cada padrão de mensagem (listadas na seção 2). A escolha é semi-aleatória, mas com preferência por variações não usadas recentemente (últimas 5 escolhas).

### Tom consistente

- **Nunca** usa linguagem robótica ("processo identificado", "análise concluída")
- **Nunca** usa jargão técnico ("correlação estatística", "regressão logística")
- **Sempre** fala como um consultor humano experiente, não como um sistema

### Adaptação ao perfil do empresário

Se o empresário usa linguagem mais técnica (ex: "margem EBITDA", "churn rate"), o insight pode adotar um tom ligeiramente mais técnico também. Se o empresário fala de forma mais coloquial, o insight acompanha.

Essa adaptação é gradual (leva 3-4 interações para detectar o perfil) e nunca extrema.

---

## 7. Testes e Validação

### Critérios de aceite para cada insight

1. O texto parece genuinamente humano? (testar com 5 pessoas leigas)
2. O timing é natural? (não interrompe, não atrasa)
3. A mensagem adiciona confiança ou apenas enfeita? (se for apenas enfeite, remover)
4. O insight corresponde a uma ação real do motor? (nunca fingir)
5. A variação mantém o mesmo significado independente da escolha textual?

### Métricas de sucesso

- **Tempo até primeira percepção de "a IA está prestando atenção":** <30s
- **Taxa de clique em insights:** >15% (se ninguém clica, insights são irrelevantes)
- **Redução de perguntas repetidas:** >40% (empresário não precisa dar a mesma info duas vezes)
- **NPS da experiência de conversa:** >50 (medido em pesquisa pós-sessão)