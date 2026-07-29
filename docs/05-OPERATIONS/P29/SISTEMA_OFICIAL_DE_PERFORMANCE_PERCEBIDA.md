# SISTEMA OFICIAL DE PERFORMANCE PERCEBIDA

**Responsável:** Arquiteto de Superfície Cognitiva
**Versão:** 1.0
**Fase:** V4 Founder
**Classificação:** Estratégia de implementação obrigatória

---

## Propósito

Este documento define como a Ponte Digital gerencia a percepção de tempo do empresário. Não se trata de performance real de servidor — trata-se de como o empresário *sente* o tempo passar. Um sistema que parece rápido é confiável. Um sistema que parece lento é abandonado, mesmo que tecnicamente tenha a mesma performance.

A percepção é a única métrica que importa.

---

## Princípio fundamental

> O empresário não percebe tempo de processamento. Ele percebe **atenção**. Se a atenção dele está ocupada durante a espera, a espera não existe.

Toda técnica abaixo deriva deste princípio: ocupar a atenção do empresário durante o processamento transforma espera em experiência.

---

## TÉCNICA 1 — FEEDBACK IMEDIATO (0–100ms)

### O que é

Toda ação do empresário — clique, toque, digitação, scroll — deve produzir uma resposta visual em menos de 100ms. O cérebro humano interpreta qualquer resposta abaixo de 100ms como *instantânea*.

### Implementação

| Ação | Resposta visual | Tempo alvo |
|------|----------------|------------|
| Clique em botão | Botão escurece 20% (0–50ms) | 30ms |
| Clique em card | Card escala 0.98 (0–50ms) | 30ms |
| Input de texto | Borda muda de cor, cursor aparece | 0ms (nativo) |
| Hover em elemento | Cor de fundo altera | 50ms |
| Checkbox/Radio | Estado visual muda imediatamente | 20ms |
| CTA primário | Botão "afunda" + muda de cor | 30ms |
| Abrir modal | Fundo escurece + modal aparece | 80ms |
| Fechar modal | Modal desaparece + fundo volta (não encadear) | 60ms |

### Regras de ouro

1. **Nunca usar `setTimeout` para delay visual.** Resposta deve ser síncrona no evento.
2. **Hover em dispositivo touch não existe.** Em mobile, usar `:active` como substituto.
3. **Escurecer é melhor que clarear.** Olho humano detecta redução de brilho mais rápido que aumento.
4. **Microfeedback tátil (vibração) em mobile.** 10–20ms de vibração em ação confirmada.
5. **Botão desabilitado visualmente no mesmo frame.** `disabled` com opacidade e cursor `not-allowed` no mesmo ciclo de render.

### O que NÃO fazer

- Spinner para ação que leva < 300ms (o spinner aparece e desaparece — parece instável)
- Transição de 200ms para abrir modal (a espera parece intencional e frustra)
- Feedback apenas no callback da requisição (empresário já duvidou que clicou)
- Animação CSS com `transition: all` (pode atrasar feedback de hover)

---

## TÉCNICA 2 — SKELETON SCREENS (100–300ms)

### O que é

Quando o conteúdo não pode ser exibido instantaneamente, mostrar a *estrutura* da tela antes do conteúdo. Esqueletos pulsantes comunicam: "algo está chegando" e o cérebro aceita a espera porque *vê progresso*.

### Anatomia de um skeleton

```
┌──────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   │  ← Título (retângulo cinza)
│                      │
│ ┌────┐  ┌──────────┐│
│ │ ▓▓ │  │ ▓▓▓▓▓▓▓▓ ││  ← Card vazio com avatar + texto
│ │ ▓▓ │  │ ▓▓▓▓▓▓▓▓ ││
│ └────┘  └──────────┘│
│                      │
│ ┌── ▓▓▓▓▓▓ ────────┐│
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ││  ← Linhas de texto pulsando
│ │ ▓▓▓▓▓▓▓▓          ││
│ └───────────────────┘│
└──────────────────────┘
```

### Regras de skeleton

1. **Nunca mostrar skeleton se o conteúdo chegar em < 100ms.** O skeleton apareceria e sumiria — pior que tela em branco.
2. **Skeleton aparece SEMPRE se o conteúdo demorar > 100ms.** Tela em branco é inaceitável.
3. **Pulso suave, não agressivo.** Opacidade 0.3 → 0.6 → 0.3, duração 1.5s, easing ease-in-out.
4. **Formato do skeleton reflete o conteúdo real.** Não genérico. Card de insight tem formato de card de insight. Tabela tem formato de tabela.
5. **Transição skeleton → conteúdo deve ser fade de 150ms.** O conteúdo substitui o skeleton suavemente.
6. **Skeleton não tem bordas arredondadas muito grandes.** Máximo 4px. Senão parece "infantil".

### O que NÃO fazer

- Skeleton com animação rápida (< 800ms) — parece agitação, não progresso
- Skeleton para ações inline (salvar, enviar) — usar optimistic UI
- Skeleton genérico (sempre o mesmo formato independente da tela) — parece placeholder de sistema quebrado
- Skeleton com cores vibrantes — usar cinza neutro (#e0e0e0 ou similar)

---

## TÉCNICA 3 — LOADING PROGRESSIVO (300ms–2s)

### O que é

Mostrar o que já está pronto enquanto o resto carrega. O empresário pode começar a consumir informação parcial enquanto o restante da tela se completa. Isso transforma espera vertical (esperar tudo) em espera horizontal (consumir enquanto chega).

### Hierarquia de prioridade de carregamento

| Prioridade | Elemento | Justificativa |
|------------|----------|---------------|
| 1 (mais alta) | Texto estruturante (títulos, labels) | Empresário precisa entender o que está vendo |
| 2 | Texto de conteúdo (parágrafos, bullets) | Informação principal |
| 3 | Cards, estrutura de layout | Contexto espacial |
| 4 | Imagens (ícones, fotos, avatares) | Decorativo, não informativo |
| 5 | Gráficos, tabelas complexas | Elaboração computacional |
| 6 (mais baixa) | Animações, transitions, decorativos | Zero valor informativo |

### Estratégia de streaming visual

```
TEMPO:   0ms──────200ms─────500ms─────800ms─────1.2s─────2s
         │         │          │          │         │
TELA:    Título    Cards     Texto      Imagens   Gráficos
         ↑         ↑          ↑          ↑         ↑
         Feedback  Skeleton   Conteúdo   Mídia     Complexo
         imediato  específico parcial    carrega   carrega
```

### Regras de loading progressivo

1. **Nunca esperar tudo carregar para mostrar algo.** A primeira renderização deve ter conteúdo útil.
2. **Reservar espaço (aspect ratio) para imagens e gráficos.** Impede layout shift que desorienta.
3. **Texto parcial > placeholder vazio.** Se 3 de 5 insights chegaram, mostrar os 3. Placeholder para os outros 2.
4. **Loading progressivo não é streaming de dados.** É decisão de renderização: mostrar assim que possível.
5. **Container de texto parcial não pula.** Altura fixa para evitar que o botão "suma" quando o texto carregar.

### O que NÃO fazer

- Carregar imagem antes de texto (empresário vê foto bonita mas não sabe o que está lendo)
- Mostrar gráfico vazio "carregando..." (placeholder sem valor)
- Bloquear interação até tudo carregar (loading progressivo perde o sentido)
- Layout shift conforme carregamento avança (desorienta a leitura)

---

## TÉCNICA 4 — OPTIMISTIC UI

### O que é

Assumir que a operação vai funcionar e mostrar o resultado *imediatamente*, antes da confirmação do servidor. Se falhar, reverter suavemente. O empresário nunca espera por uma confirmação — ele já vê o resultado.

### Onde usar SEMPRE

| Ação | Comportamento otimista | Rollback |
|------|------------------------|----------|
| Enviar mensagem na conversa | Mensagem aparece imediatamente na lista | Marcador "Não enviada" + botão "Reenviar" |
| Marcar insight como lido | Badge some imediatamente | Badge reaparece se falhar |
| Favoritar/Desfavoritar | Ícone muda estado imediatamente | Volta ao estado anterior |
| Alternar toggle | Toggle muda imediatamente | Volta ao estado anterior |
| Excluir item | Item some com fade (não instantâneo — 200ms) | Item reaparece no lugar original |
| Mover card (kanban) | Card aparece na nova coluna | Card volta com animação suave |

### Onde NUNCA usar

| Ação | Motivo |
|------|--------|
| Transação financeira | Rollback causa ansiedade financeira ("sumiu meu dinheiro") |
| Alteração de senha | Segurança > velocidade |
| Cadastro de empresa/configuração crítica | Erro teria consequências graves |
| Exclusão em massa | Rollback complexo, imprevisível |
| Ações que dependem de validação externa (CNAE, CNPJ) | A validação define o resultado |

### Regras de rollback suave

1. **Nunca mostrar erro agressivo no rollback.** `toast` vermelho com "Erro" assusta. Preferir: "Não foi possível salvar. Seus dados estão seguros."
2. **Rollback com animação.** Item não desaparece — ele "volta" ao estado anterior com transição de 200ms.
3. **Oferecer ação corretiva.** "Tentar novamente" com um clique. Não obrigar o empresário a refazer tudo.
4. **Timeout otimista.** Se a requisição não responder em 5s, assumir falha e fazer rollback. Não esperar para sempre.
5. **Log interno.** Rollback é registrado internamente para diagnóstico, mas nunca exibido ao empresário como "erro do sistema".

### Exemplo de microcópia para rollback

> "A mensagem não foi enviada. Toque para tentar de novo."

(Ícone de aviso amarelo suave, não vermelho. Botão "Tentar" ao lado.)

---

## TÉCNICA 5 — PRELOADING

### O que é

Carregar a próxima tela/enquanto o empresário lê/interage com a atual. Quando ele decidir navegar, a transição parece instantânea porque o conteúdo já está em memória.

### Estratégia de preloading

| Gatilho | O que pré-carregar | Por quê |
|---------|-------------------|---------|
| Empresário lê um insight há > 3s | Dashboard principal ou lista seguinte | Ele provavelmente vai navegar após ler |
| Empresário está no final de uma lista | Página 2 da lista | Scroll infinito iminente |
| Empresário abre um card | Conteúdo do detalhe + próximo item | Navegação serial (próximo/anterior) |
| Mouse se move em direção a um link | Destino do link | Intenção precoce de navegação |
| Empresário está digitando uma pesquisa | Resultados parciais | Autocomplete / busca instantânea |
| Conversa parou (empresário não envia há 10s) | Próximo módulo sugerido | Recomendação antecipada |

### Regras de preloading

1. **Preloading não pode impactar performance da tela atual.** Prioridade: tela atual > preloading. Usar `requestIdleCallback`.
2. **Cache de preloading tem TTL.** 30 segundos. Se o empresário não navegar, limpar.
3. **Preloading de múltiplas telas simultâneas é proibido.** Máximo 1 tela pré-carregada. Mais que isso degrada a tela atual.
4. **Preloading não é eager loading.** Não carregar tudo que é possível. Apenas o provável próximo passo.
5. **Cancelar preloading se o empresário fizer ação inesperada.** Ex: estava pré-carregando detalhe, empresário volta para lista — cancelar.

### Técnicas de preloading

- **DNS prefetch** para domínios de API
- **Link rel="prefetch"** para rotas prováveis (Next.js suporta nativamente)
- **API call em background** com abort controller
- **Renderização oculta em iframe/div invisível** (para componentes pesados)
- **Pré-aquecimento de WebSocket** se a próxima tela usa streaming

### O que NÃO fazer

- Preloading de tela que o empresário nunca usa (desperdício de recurso — parece sistema lento em tela atual)
- Preloading sem abort controller (se ele mudar de ideia, a requisição continua — piora tudo)
- Preloading de dados sensíveis que exigem autenticação diferente (pausa para reautenticação quebra a ilusão)

---

## TÉCNICA 6 — PRIORIDADE DE PAINT

### O que é

Nem todo conteúdo tem o mesmo peso na percepção. O que o empresário vê primeiro deve carregar primeiro. A prioridade é determinada por: posição na tela, tipo de conteúdo, importância para a tarefa atual.

### Hierarquia de paint

```
1. TEXT (título, labels, dados textuais) — paint imediato
2. STRUCTURE (layout, cards, containers) — second paint
3. COLORS (backgrounds, bordas, badges) — third paint
4. IMAGES (ícones, fotos, avatares) — fourth paint
5. GRAPHICS (gráficos, diagramas, timelines) — final paint
6. DECORATIONS (animações, sombras, gradientes) — assíncrono, sem bloqueio
```

### Implementação por área da tela

```
ÁREA                                    PRIORIDADE
┌─────────────────────────────────────┐
│ Título do Dashboard         (text)   │ ← Paint 1
├─────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐         │
│ │ Card │ │ Card │ │ Card │         │ ← Paint 2 (estrutura)
│ │ txt  │ │ txt  │ │ txt  │         │    Paint 1 (texto dentro)
│ │ img  │ │ img  │ │ img  │         │    Paint 4 (imagens)
│ └──────┘ └──────┘ └──────┘         │
├─────────────────────────────────────┤
│ ┌─────────────────────────────┐     │
│ │ Gráfico de desempenho       │     │ ← Paint 5
│ │ (carrega após paint 1-4)    │     │
│ └─────────────────────────────┘     │
├─────────────────────────────────────┤
│ "Com base nos dados atuais..."      │ ← Paint 1
└─────────────────────────────────────┘
```

### Regras de prioridade de paint

1. **Above the fold carrega antes de below the fold.** O que está visível na viewport inicial tem prioridade máxima.
2. **Título e labels são inegociáveis.** Sempre no primeiro paint. Sem skeleton — texto direto.
3. **Background da página aparece no primeiro frame.** Evitar white flash.
4. **Imagens acima da dobra têm prioridade sobre imagens abaixo.** Mas ainda assim after text.
5. **Font-face carregada com `font-display: swap`.** Texto aparece com fallback até fonte carregar.
6. **CSS crítico inline no `<head>`.** Impede阻塞 de renderização por CSS externo.

### O que NÃO fazer

- Imagem hero carregando antes do título (empresário vê foto sem contexto)
- Gráfico complexo renderizando antes dos cards de texto (informação principal vs complementar)
- Animação de entrada de tela antes do conteúdo (delay artificial injustificável)
- Tela em branco esperando fonte customizada carregar

---

## TÉCNICA 7 — TEMPO DE RESPOSTA DA IA

### O que é

A resposta da IA — o elemento central da Ponte Digital — deve ter um tempo de resposta *percebido* que gere confiança. Respostas instantâneas parecem falsas (empresário pensa "isso foi decorado" ou "não analisou meus dados"). Respostas muito lentas parecem incompetencia.

### Tempos de resposta por tipo

| Tipo de pergunta | Tempo natural | Tempo artificial | Total percebido | Efeito |
|-----------------|---------------|------------------|-----------------|--------|
| "Qual meu faturamento?" (fato) | 50ms | +250–350ms | 300–400ms | Parece consulta rápida |
| "Como está meu negócio?" (resumo) | 200ms | +300–800ms | 500ms–1s | Parece análise cuidadosa |
| "O que está acontecendo?" (análise) | 500ms | +500ms–1s | 1s–1.5s | Parece diagnóstico |
| "O que devo fazer?" (recomendação) | 800ms | +1–2s | 1.8s–2.8s | Parece consultoria |
| "Explique esta tendência" (profundo) | 1.5s | +1–3s | 2.5s–4.5s | Parece estudo aprofundado |
| Pergunta vaga/mal formulada | 200ms | +500ms | ~700ms | Parece que "entendeu mesmo assim" |

### Regras de tempo de resposta

1. **Atraso artificial mínimo de 300ms, mesmo para respostas prontas.** Abaixo disso parece robótico, não inteligente.
2. **Nunca atrasar além de 5s.** Acima disso gera ansiedade, independente da qualidade. Se > 5s, usar streaming.
3. **Variação natural.** Nem toda resposta deve ter o mesmo tempo. Variação de ±20% no atraso artificial parece mais humano.
4. **Primeira resposta mais rápida que as seguintes.** A primeira resposta da sessão pode ser um pouco mais rápida para gerar confiança inicial.
5. **Perguntas do mesmo tipo no mesmo timing.** Se empresário faz 3 perguntas factuais consecutivas, todas devem levar ~ o mesmo tempo.
6. **Tempo de resposta inclui loading textual.** "Analisando seus dados..." aparece imediatamente, depois a resposta chega.

### Por que atraso artificial funciona

- O cérebro humano atribui mais valor a informações que "exigiram esforço" para serem produzidas
- Respostas instantâneas para perguntas complexas geram desconfiança ("isso veio de um roteiro, não dos meus dados")
- O atraso sinaliza: "processei seus dados especificamente para você"
- Empresários de PME desconfiam de respostas muito rápidas de IA — parece "chute"

### O que NÃO fazer

- Resposta instantânea para pergunta complexa (soa fake)
- Atraso visível de contagem regressiva (ansiedade — "faltam 3 segundos... 2... 1...")
- Atraso artificial inconsistente (mesma pergunta leva 300ms e depois 2s — parece instável)
- Atraso artificial em erro (se a IA falhou, mostrar rápido — "Não consegui processar" imediatamente)

---

## TÉCNICA 8 — TRANSFORMAÇÃO DA ESPERA

### O que é

Loading não é "aguarde" — é "estou trabalhando". Cada milissegundo de espera é uma oportunidade de demonstrar inteligência, cuidado, esforço. O texto do loading transforma a espera de obstáculo em experiência.

### Biblioteca oficial de textos de loading

**Para análise de dados:**
- "Organizando suas informações..."
- "Conectando os pontos nos seus dados..."
- "Examinando padrões do seu negócio..."
- "Processando informações da sua empresa..."
- "Cruzando dados de [período]..."
- "Analisando [métrica] dos últimos [período]..."

**Para geração de insights:**
- "Identificando oportunidades relevantes..."
- "Buscando padrões que merecem atenção..."
- "Comparando com o histórico do seu negócio..."
- "Encontrando relações entre seus dados..."
- "Construindo uma visão clara da situação..."

**Para recomendações:**
- "Pensando na melhor sugestão para você..."
- "Considerando o que funcionaria no seu negócio..."
- "Avaliando alternativas para sua empresa..."
- "Preparando recomendações personalizadas..."

**Para ações do empresário:**
- "Salvando sua alteração..."
- "Atualizando seus dados..."
- "Registrando sua decisão..."
- "Preparando o próximo passo..."

### Progressão narrativa (espera > 2s)

```
0s ──── 1s ──── 2s ──── 3s ──── 4s ──── 5s
│       │       │       │       │       │
Início  "Orga-  "Conec- "Iden-  "Quase  "Pronto"
        nizando tando   tificando lá"
        seus    os      oportu-
        infor-  pontos  nidades"
        mações" dos
                dados"
```

### Regras de transformação da espera

1. **Nunca usar "Aguarde" ou "Carregando".** Soa como desculpa, não como trabalho.
2. **Texto muda a cada 2–3s se o loading for longo.** Loading parado no mesmo texto por > 3s gera ansiedade.
3. **Texto deve conter verbo de ação.** "Analisando", "Processando", "Construindo" — transmite esforço.
4. **Texto deve ser verdadeiro.** Não inventar etapa que não existe ("Compilando algoritmo genético" se é apenas query SQL).
5. **Evitar pronomes muito pessoais.** "Estou analisando" vs "Analisando" — a segunda soa mais profissional.
6. **Loading com animation sutil.** Três pontos pulsando, barra de progresso indeterminada, rotação suave.

### O que NÃO fazer

- "Carregando..." + spinner (parece sistema quebrado dos anos 2000)
- Barra de progresso falsa que reinicia (destrói confiança)
- Texto genérico independente do que está processando (não engana ninguém)
- Loading screen que cobre a tela inteira (tira o contexto — pior que esperar)

---

## REGRAS DE PERFORMANCE PERCEBIDA (resumo executivo)

1. **O empresário nunca vê uma tela em branco.** Se algo vai demorar > 100ms, mostrar estrutura ou feedback imediato.

2. **O empresário nunca vê um spinner sem texto.** Spinner é abstrato. Texto dá significado.

3. **O empresário nunca espera sem saber o que está acontecendo.** Toda espera tem um "estou fazendo X".

4. **O empresário nunca precisa perguntar "está funcionando?".** A interface responde antes dele duvidar.

5. **Toda espera > 2s é uma oportunidade de mostrar inteligência.** É quando a IA mostra que "está pensando" — e isso constrói confiança.

---

## MÉTRICAS DE PERFORMANCE PERCEBIDA

| Métrica | Alvo | Como medir |
|---------|------|------------|
| Tempo até primeiro feedback | < 50ms | Performance Observer (first input delay) |
| Tempo até primeiro texto | < 200ms | First Paint + texto estruturante |
| Tempo até conteúdo útil | < 1s | Tempo até primeiro dado visível |
| Tempo até tela completa | < 2s | Load completo (sem imagens) |
| Taxa de abandono por espera | < 2% | Session com loading > 3s + saída |
| Respostas da IA ("pareceu inteligente") | > 90% | Survey pós-interação |

---

## ANTIPADRÕES — O QUE NUNCA FAZER

1. **Loading spinner genérico** — o empresário não sabe o que está acontecendo, não confia.
2. **Tela em branco enquanto processa** — o empresário acha que quebrou, recarrega a página.
3. **Barra de progresso falsa** — quando descoberta, destrói toda confiança no sistema.
4. **Feedback apenas no hover** — não funciona em mobile, exclui 40% dos usuários.
5. **Animações que atrasam a interação** — "assista à nossa logo por 3 segundos" é imperdoável.
6. **Delay artificial óbvio** — "respondeu mas está escondendo para parecer inteligente" se percebido.

---

## Documentos relacionados

- `SISTEMA_OFICIAL_DA_ATENCAO.md` — Onde o empresário olha durante a espera
- `SISTEMA_OFICIAL_DA_CONTINUIDADE.md` — Como a espera não quebra o fluxo
- `SISTEMA_OFICIAL_DO_CONHECIMENTO_VISIVEL.md` — O que aparece depois da espera
