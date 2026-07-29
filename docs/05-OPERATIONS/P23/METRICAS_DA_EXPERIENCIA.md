# MÉTRICAS DA EXPERIÊNCIA — Programa 23

**Versão 1.0 | 26/07/2026**

> Sistema próprio de indicadores da experiência cognitiva da Ponte Digital. Nenhuma métrica genérica (tempo na tela, bounce rate, cliques). Apenas métricas que medem o que realmente importa: clareza, confiança, descoberta, curiosidade, encantamento, fluidez, carga cognitiva, valor por minuto, inteligência percebida e continuidade.

---

## Filosofia das Métricas

### Por que métricas próprias

Métricas tradicionais de produto (DAU, MAU, tempo na tela, bounce rate, NPS) foram criadas para produtos transacionais e de conteúdo. Elas medem **quantidade de uso**, não **qualidade da experiência cognitiva**.

A Ponte Digital não quer que o empresário passe mais tempo na plataforma. Quer que ele passe o tempo certo e saia mais inteligente. Métricas de quantidade puniriam uma experiência eficiente.

### Princípios das métricas da experiência

1. **Toda métrica mede percepção, não performance.** Não importa se o motor cognitivo processou em 200ms — importa se o empresário sentiu que a IA pensou antes de responder.
2. **Toda métrica é observável no comportamento.** Se não podemos ver o empresário fazer algo que indica a métrica, a métrica é inútil.
3. **Toda métrica tem alvo mínimo, não máximo.** O mínimo indica "aceitável para lançar". Acima do mínimo, comemorar e subir o padrão. Abaixo do mínimo, interromper e corrigir.
4. **Toda métrica é conceitual.** O cálculo descrito não é implementável em código — é uma definição de negócio. A implementação real pode se aproximar, mas nunca será exata.
5. **Métricas se complementam, não se substituem.** Clareza sem confiança não vale nada. Confiança sem descoberta não vale nada. Descoberta sem curiosidade não vale nada.

### Hierarquia das métricas

```
                        VALOR POR MINUTO
                      /        |        \
            CLAREZA          CONFIANÇA      DESCOBERTA
               |                |               |
           FLUIDEZ        INTELIGÊNCIA      CURIOSIDADE
               |          PERCEBIDA             |
          CARGA            (transversal)    ENCANTAMENTO
        COGNITIVA
               \
           CONTINUIDADE
```

As métricas de base (fluidez, carga cognitiva) sustentam as métricas de experiência (clareza, confiança, descoberta), que geram as métricas de resultado (valor por minuto, continuidade). Inteligência Percebida é transversal — afeta todas as outras.

---

## Índice de Clareza

**Nome oficial:** Clareza Cognitiva (CC)

**O que mede:** O quão claro é o diagnóstico para o empresário — se ele entende o que a IA pergunta, o que a IA descobre, e o que pode fazer com isso.

**Definição conceitual:** Clareza é a ausência de ambiguidade percebida. O empresário não precisa reler, não precisa perguntar "O que isso quer dizer?", não precisa pedir esclarecimento.

**Cálculo conceitual:**

```
CC = (perguntas respondidas sem hesitação / total de perguntas) × (taxa de resumo compreendido)
```

Onde:
- **Perguntas respondidas sem hesitação:** perguntas em que o empresário respondeu em < 5s, sem reler, sem pedir esclarecimento, sem corrigir a resposta
- **Total de perguntas:** todas as perguntas feitas pela IA na sessão
- **Taxa de resumo compreendido:** o empresário confirma o resumo parcial sem corrigir (sim/não na última pergunta)

**Como observar no usuário:**

| Indicador de clareza ALTA | Indicador de clareza BAIXA |
|---------------------------|----------------------------|
| Responde em < 3s | Pausa > 5s antes de responder |
| Não relê a pergunta | Relê a pergunta 2+ vezes |
| Confirma resumo sem correção | Corrige o resumo da IA |
| Faz perguntas de aprofundamento | Pergunta "O que isso quer dizer?" |
| Age com base no insight | Ignora o insight |
| Responde na primeira tentativa | Apaga e redigita a resposta |

**Alvo mínimo:** 0.70 (70% das interações são claras para o empresário)

**O que fazer se estiver abaixo do alvo:**
- Revisar o texto de cada pergunta da IA — estão claras e diretas?
- Verificar se as perguntas são específicas demais (exigem conhecimento que o empresário não tem)
- Verificar se o vocabulário é adequado ao perfil do empresário
- Simplificar: uma pergunta por vez, sem informação adicional
- Testar perguntas com empresários reais antes de implementar no fluxo

**O que fazer se estiver acima do alvo:**
- Subir o padrão para 0.80
- Introduzir perguntas mais sofisticadas (que exigem mais reflexão, mas ainda são claras)
- Verificar se clareza alta está mascarando superficialidade (empresário entende porque a pergunta é simples demais)

---

## Índice de Confiança

**Nome oficial:** Confiança Percebida (CP)

**O que mede:** O quanto o empresário confia nas descobertas da IA — se ele acredita que os insights são verdadeiros e relevantes, e se agiria baseado neles.

**Definição conceitual:** Confiança é a disposição do empresário de agir baseado na informação fornecida pela IA, mesmo sem verificação independente.

**Cálculo conceitual:**

```
CP = (taxa de concordância com hipóteses) × (profundidade média das respostas) / (taxa de correções necessárias + 0.1)
```

Onde:
- **Taxa de concordância:** número de hipóteses que o empresário confirma / total de hipóteses apresentadas
- **Profundidade média das respostas:** classificação manual (1 = resposta mínima, 2 = resposta informativa, 3 = resposta reflexiva, 4 = resposta reveladora, 5 = resposta transformadora)
- **Taxa de correções:** número de vezes que o empresário corrige a IA / total de interações

**Como observar no usuário:**

| Indicador de confiança ALTA | Indicador de confiança BAIXA |
|------------------------------|------------------------------|
| Compartilha dados sensíveis voluntariamente | Hesita antes de compartilhar dados |
| Concorda com as hipóteses da IA | Discord ou questiona cada hipótese |
| Aprofunda respostas sem solicitação | Respostas monossilábicas |
| Pergunta "Como conecto meus dados?" | Pergunta "De onde veio isso?" |
| Toma decisão baseada no insight | Ignora o insight, muda de assunto |
| Chama outra pessoa para ver | Sai da tela sem comentar |
| Diz "Isso faz sentido" genuinamente | Diz "Isso é óbvio" ou "Não é bem assim" |
| Faz perguntas sobre implementação | Faz perguntas sobre fontes e métodos |
| Não questiona a mesma informação 2x | Relê e questiona a mesma info repetidamente |
| Responde à pergunta "Confirma?" com confiança | Responde "Talvez", "Não tenho certeza", "Preciso verificar" |

**Alvo mínimo:** 0.60 (60% das interações geram confiança no empresário)

**O que fazer se estiver abaixo do alvo:**
- Verificar a precisão dos insights — se estão errados ou genéricos, a confiança nunca sobe
- Aumentar a transparência do raciocínio da IA ("Cheguei a esta conclusão porque...")
- Melhorar a demonstração de evidências ("Usei estes 3 dados para chegar aqui")
- Garantir que a IA admite incerteza quando apropriado (confiança aumenta quando a IA é honesta sobre não saber)
- Reduzir o número de hipóteses apresentadas — menos hipóteses, mas mais precisas
- Verificar o tom da IA — está arrogante? inseguro? O tom certo gera confiança

**O que fazer se estiver acima do alvo:**
- Subir o padrão para 0.75
- Introduzir hipóteses mais desafiadoras (que exigem mais confiança do empresário para aceitar)
- Testar se a confiança se mantém quando a IA faz uma recomendação contraintuitiva
- Verificar se a confiança não é complacência (empresário concorda com tudo sem pensar)

---

## Índice de Descoberta

**Nome oficial:** Taxa de Descoberta (TD)

**O que mede:** Quantidade e qualidade dos insights gerados pela IA que o empresário reconhece como válidos e relevantes.

**Definição conceitual:** Descoberta é a diferença entre o que o empresário sabia antes da interação e o que ele sabe depois. Cada insight que ele reconhece como "não sabia disso" é uma descoberta.

**Cálculo conceitual:**

```
TD = (insights confirmados × confiança média dos insights) / (total de hipóteses formadas)
```

Onde:
- **Insights confirmados:** número de insights que o empresário explicitamente confirmou como verdadeiros e relevantes
- **Confiança média dos insights:** score médio de confiança (calculado pelo Trust Engine) dos insights confirmados
- **Total de hipóteses:** todas as hipóteses que a IA formou e apresentou ao empresário

**Como observar no usuário:**

| Indicador de descoberta ALTA | Indicador de descoberta BAIXA |
|-------------------------------|-------------------------------|
| "Não sabia disso" — comentário espontâneo | "Isso eu já sabia" |
| "Isso explica [outra coisa]" — conecta insights | Ignora o insight |
| Anota o insight | Não reage ao insight |
| Compartilha o insight com terceiros | Pergunta "Isso é verdade?" |
| Faz pergunta de aprofundamento | Muda de assunto |
| "Faz sentido agora" — mudança de perspectiva | Diz que o insight é óbvio |
| Expressão facial de surpresa positiva | Expressão neutra ou de decepção |

**Alvo mínimo:** 0.50 (metade das hipóteses da IA se transformam em descoberta reconhecida)

**O que fazer se estiver abaixo do alvo:**
- Revisar a qualidade das hipóteses — estão baseadas em dados reais ou são genéricas?
- Verificar se as hipóteses são relevantes para o estágio da empresa
- Melhorar a forma como a IA apresenta o insight (narrativa de descoberta, não entrega de dado)
- Garantir que a IA só apresenta hipótese quando tem confiança suficiente (> 50%)
- Reduzir o número de hipóteses fracas (qualidade > quantidade)

**O que fazer se estiver acima do alvo:**
- Subir o padrão para 0.65
- Introduzir hipóteses mais complexas (múltiplas variáveis, padrões não óbvios)
- Testar se as descobertas são profundas ou superficiais (o empresário realmente aprendeu algo ou só confirmou o que já sabia?)
- Aumentar a ambição do Motor de Insights — padrões mais sofisticados

---

## Índice de Curiosidade

**Nome oficial:** Curiosidade Gerada (CG)

**O que mede:** O quanto o empresário quer continuar a conversa — se ele faz perguntas de volta, aceita aprofundar, e demonstra vontade de voltar.

**Definição conceitual:** Curiosidade é a motivação intrínseca para continuar explorando. Não é engajamento (que pode ser passivo). É desejo ativo de saber mais.

**Cálculo conceitual:**

```
CG = (perguntas feitas pelo empresário / total de interações) + (taxa de resposta a convites de aprofundamento)
```

Onde:
- **Perguntas feitas pelo empresário:** toda pergunta que o empresário faz espontaneamente (não em resposta a uma pergunta da IA)
- **Total de interações:** todas as trocas na sessão (perguntas + respostas + insights)
- **Taxa de resposta a convites:** número de vezes que o empresário aceita aprofundar / número de vezes que a IA oferece aprofundamento

**Como observar no usuário:**

| Indicador de curiosidade ALTA | Indicador de curiosidade BAIXA |
|-------------------------------|-------------------------------|
| Empresário pergunta "E sobre X?" | Só responde o que é perguntado |
| Empresário aceita aprofundamento | Recusa ou ignora convite para aprofundar |
| Empresário diz "Interessante, me conta mais" | "Tá, entendi" (tom de encerramento) |
| Empresário explora caminhos não sugeridos | Segue apenas o roteiro da IA |
| Empresário faz conexões entre temas | Não conecta insights entre si |
| Pergunta "O que mais você descobriu?" | "Já chega por hoje" |
| Quer saber sobre funcionalidades futuras | Não demonstra interesse no que vem depois |

**Alvo mínimo:** 0.40 (40% das interações geram uma ação curiosa do empresário)

**O que fazer se estiver abaixo do alvo:**
- Verificar se a IA está gerando curiosidade ou apenas respondendo — a IA precisa provocar, não só informar
- Melhorar os ganchos de continuidade ("Isso me lembrou outra coisa... Quer ver?")
- Garantir que a IA está revelando informação gradualmente, não toda de uma vez
- Verificar se o tom da IA é muito formal (curiosidade morre em ambientes formais)
- Introduzir elementos de mistério ("Tem uma coisa sobre seus clientes que você não sabe...")

**O que fazer se estiver acima do alvo:**
- Subir o padrão para 0.55
- Canalizar a curiosidade para tópicos de alto valor (o empresário está curioso, mas está curioso sobre o que importa?)
- Verificar se a curiosidade se traduz em retorno (curiosidade sem ação não gera valor)

---

## Índice de Encantamento

**Nome oficial:** Encantamento Cognitivo (EC)

**O que mede:** Momentos de surpresa positiva genuína — quando o empresário recebe algo que não esperava e que muda sua percepção.

**Definição conceitual:** Encantamento não é diversão. É a emoção de descobrir algo que não se sabia e que se reconhece como valioso. É "Como isso sabe?" + "Isso é importante".

**Cálculo conceitual:**

```
EC = (momentos WOW percebidos / total de momentos WOW disponíveis) × (taxa de reação positiva)
```

Onde:
- **Momentos WOW percebidos:** número de vezes que o empresário demonstrou encantamento genuíno (ver Guia de Testes, seção 10)
- **Total de momentos WOW disponíveis:** número de insights ou revelações que a IA apresentou e que tinham potencial de encantar
- **Taxa de reação positiva:** proporção de momentos WOW que geraram reação positiva (sorriso, comentário, compartilhamento)

**Como observar no usuário:**

| Indicador de encantamento ALTO | Indicador de encantamento BAIXO |
|--------------------------------|---------------------------------|
| Sorriso genuíno (olhos apertam) | Expressão neutra |
| "Nossa, não esperava!" | "Ok" |
| "Como isso sabe?" | "Isso é óbvio" |
| Inclina para frente, olhos fixos | Recosta na cadeira |
| Chama outra pessoa para ver | Permanece inexpressivo |
| Anota/compartilha o insight | Ignora e continua |
| Pausa após o insight (digerindo) | Avança imediatamente |

**Alvo mínimo:** 0.30 (30% dos momentos potencialmente encantadores geram encantamento real)

**Nota:** Encantamento é raro por natureza. Alvo abaixo de 0.50 é intencional. Se o encantamento for > 0.60, o sistema pode estar usando truques (surpresa vazia) em vez de descoberta genuína.

**O que fazer se estiver abaixo do alvo:**
- Revisar a qualidade dos insights — são genuinamente surpreendentes ou são óbvios?
- Melhorar o timing da apresentação (a pausa antes do insight, o destaque visual)
- Verificar se os insights são sobre o negócio do empresário (não sobre a ferramenta)
- Garantir que cada insight carrega uma conexão não óbvia (A + B = C que ele não viu)
- Reduzir a frequência de tentativas de encantar — menos tentativas, mais potentes

**O que fazer se estiver acima do alvo:**
- Subir o padrão para 0.40 (encantamento genuíno é raro — 0.30 já é alto para a média)
- Verificar se o encantamento é genuíno ou se o empresário está sendo cortês
- Desafiar: o insight que encantou pode ser substituído por algo mais profundo?

---

## Índice de Fluidez

**Nome oficial:** Fluidez da Conversa (FC)

**O que mede:** O quão natural é a conversa — se flui sem interrupções, hesitações não-naturais, correções ou atritos.

**Definição conceitual:** Fluidez é a sensação de que a conversa "acontece sozinha", sem que o empresário precise se esforçar para manter o fluxo.

**Cálculo conceitual:**

```
FC = 1 - (interrupções + hesitações + correções) / (total de trocas)
```

Onde:
- **Interrupções:** número de vezes que a IA ou o empresário interrompem o fluxo natural (IA responde antes do empresário terminar, empresário corta a IA)
- **Hesitações:** número de pausas > 3s antes de responder (não naturais — excluir pausas de processamento reflexivo)
- **Correções:** número de vezes que o empresário corrige a IA ou a si mesmo
- **Total de trocas:** todas as mensagens trocadas (IA + empresário)

**Como observar no usuário:**

| Indicador de fluidez ALTA | Indicador de fluidez BAIXA |
|----------------------------|----------------------------|
| Empresário responde no ritmo natural | Pausas frequentes > 5s |
| Conversa avança sem repetições | Empresário relê a mesma pergunta |
| Empresário parece "no fluxo" | Empresário parece "travado" |
| Respostas são naturais, sem hesitação | Respostas são corrigidas/apagadas |
| Transições entre tópicos são suaves | Transições são bruscas ou confusas |
| Empresário não precisa se explicar | "Deixa eu explicar melhor..." |

**Alvo mínimo:** 0.70 (70% das trocas ocorrem sem atrito perceptível)

**O que fazer se estiver abaixo do alvo:**
- Mapear em que ponto as hesitações ocorrem (é uma pergunta específica?)
- Verificar se a IA está no ritmo certo para o perfil do empresário
- Reduzir o número de perguntas por turno (uma pergunta por vez)
- Melhorar as transições entre tópicos (conexão explícita)
- Verificar se a IA está "ouvindo" o suficiente antes de responder

**O que fazer se estiver acima do alvo:**
- Subir o padrão para 0.80
- Verificar se fluidez alta não está mascarando superficialidade (conversa flui porque não há profundidade)
- Testar com perguntas mais complexas (fluidez pode cair com profundidade — e isso é aceitável)

---

## Índice de Carga Cognitiva

**Nome oficial:** Carga Cognitiva Percebida (CCP)

**O que mede:** O quão sobrecarregado o empresário se sente — se está confortável com o volume e a complexidade da informação ou se está sendo exigido além da conta.

**Definição conceitual:** Carga cognitiva é o esforço mental necessário para processar a informação. Muita carga = cansaço, desistência. Pouca carga = tédio, superficialidade. O ponto ideal é "desafiado mas não sobrecarregado".

**Cálculo conceitual:**

```
CCP = (tempo médio de resposta / tempo ideal de resposta) × (taxa de re-leitura)
```

Onde:
- **Tempo médio de resposta:** tempo médio que o empresário leva para responder às perguntas da IA
- **Tempo ideal de resposta:** tempo esperado para aquela pergunta (perguntas fáceis: 2-5s, perguntas médias: 5-15s, perguntas difíceis: 15-30s)
- **Taxa de re-leitura:** número de vezes que o empresário relê uma mensagem da IA antes de responder / total de mensagens

**Como observar no usuário:**

| Indicador de carga ADEQUADA | Indicador de carga EXCESSIVA |
|-----------------------------|------------------------------|
| Responde no tempo natural para a pergunta | Demora muito mais que o esperado |
| Lê uma vez e responde | Relê 2+ vezes antes de responder |
| Mantém ritmo consistente | Ritmo desacelera ao longo da sessão |
| Expressão facial relaxada | Testa franzida, cansaço visível |
| Faz perguntas de aprofundamento | Responde monossilabicamente |
| Não pede pausa | "Deixa eu pensar..." com frequência |
| Conclui a sessão | Abandona antes do fim |

**Alvo máximo:** 0.50 (quanto menor, melhor — abaixo de 0.50 significa que o empresário está confortável)

**Nota:** CCP é inverso — alvo é um valor máximo, não mínimo. Se CCP > 0.50, o empresário está sobrecarregado.

**O que fazer se estiver acima do alvo (> 0.50):**
- Reduzir a complexidade das perguntas (dividir perguntas complexas em etapas)
- Aumentar a frequência de resumos parciais (ajuda o empresário a "respirar")
- Reduzir a quantidade de informação apresentada por vez
- Verificar se há excesso de elementos visuais competindo pela atenção
- Simplificar o vocabulário e a estrutura das frases

**O que fazer se estiver abaixo do alvo (< 0.50, ideal):**
- Verificar se está baixo porque o conteúdo é muito simples (tédio) ou porque está no ponto ideal
- Se o empresário está desafiado mas confortável, manter
- Se o empresário está entediado (ver índice de curiosidade baixo), aumentar a complexidade gradualmente

---

## Índice de Valor por Minuto

**Nome oficial:** Densidade de Valor (DV)

**O que mede:** Quanto valor o empresário percebe por tempo investido — se cada minuto na plataforma vale o tempo gasto.

**Definição conceitual:** Valor por minuto é a métrica mais importante da experiência. Se o empresário sente que cada minuto entregou algo relevante, ele volta. Se sente que "perdeu tempo", ele não volta — não importa quão bom seja o resto.

**Cálculo conceitual:**

```
DV = (insights válidos / minutos de conversa) × (relevância média dos insights)
```

Onde:
- **Insights válidos:** número de insights que o empresário confirmou como relevantes (não apenas verdadeiros)
- **Minutos de conversa:** tempo total da sessão em minutos
- **Relevância média:** classificação manual (1 = irrelevante, 2 = pouco relevante, 3 = relevante, 4 = muito relevante, 5 = crítico)

**Como observar no usuário:**

| Indicador de valor ALTO | Indicador de valor BAIXO |
|--------------------------|--------------------------|
| Empresário diz "Valeu a pena" espontaneamente | "Já acabou?" (tom de decepção) |
| Empresário faz anotações | Não demonstra retenção |
| Empresário pergunta "Quando posso usar denovo?" | "Tá, entendi" (encerrando) |
| Empresário conecta insights com ações | Ignora insights e vai embora |
| Sessão termina com ação planejada | Sessão termina sem conclusão |
| Empresário sai com direção clara | Empresário sai com mais dúvidas que antes |

**Alvo mínimo:** 0.30 insights válidos por minuto (a cada 3 minutos, pelo menos 1 insight relevante)

**O que fazer se estiver abaixo do alvo:**
- Acelerar a entrega de valor — o primeiro insight precisa vir em < 2 minutos
- Reduzir perguntas que não geram insights (cada pergunta precisa ter um propósito de descoberta)
- Eliminar interações que não agregam valor direto
- Melhorar a relevância dos insights (um insight muito relevante vale mais que 3 insights médios)
- Verificar se há "perda de tempo" em loading, explicações, ou perguntas redundantes

**O que fazer se estiver acima do alvo:**
- Subir o padrão para 0.50 insights/minuto
- Verificar se a densidade de valor se mantém em sessões mais longas (é fácil ter alta densidade nos primeiros 5 min, difícil manter em 20 min)
- Garantir que a alta densidade não está sacrificando profundidade (muitos insights rasos não valem tanto quanto poucos insights profundos)

---

## Índice de Inteligência Percebida

**Nome oficial:** Inteligência Percebida (IP)

**O que mede:** O quanto a IA parece inteligente para o empresário — se ele percebe que há raciocínio, contexto, memória e conexão, não apenas recuperação de texto.

**Definição conceitual:** Inteligência percebida é a diferença entre o que o empresário espera que um sistema seja capaz de fazer e o que a Ponte realmente faz. Quanto maior a diferença, maior a inteligência percebida.

**Cálculo conceitual:**

```
IP = (conexões percebidas / conexões esperadas) × (taxa de acerto) - (taxa de erro perceptível)
```

Onde:
- **Conexões percebidas:** número de vezes que a IA conecta informações que o empresário não conectou sozinho
- **Conexões esperadas:** número de conexões que o empresário esperaria de uma "ferramenta normal" (baseline)
- **Taxa de acerto:** proporção de afirmações da IA que o empresário considera corretas
- **Taxa de erro perceptível:** proporção de erros que o empresário NOTA (não erros reais — erros perceptíveis)

**Como observar no usuário:**

| Indicador de IP ALTA | Indicador de IP BAIXA |
|----------------------|-----------------------|
| "Como isso sabe?" | "Isso é óbvio" |
| "Você sabia disso?" (compartilhando) | "Isso não é verdade" |
| Faz perguntas cada vez mais complexas | Continua fazendo perguntas simples |
| "Isso é muito específico, gostei" | "Parece resposta genérica" |
| Espera um momento antes de responder (está processando a inteligência) | Responde no automático |
| "O que mais você descobriu?" | "E daí?" |

**Alvo mínimo:** 0.60 (60% das conexões da IA são percebidas como além do esperado)

**O que fazer se estiver abaixo do alvo:**
- Melhorar a demonstração de raciocínio — a IA precisa "mostrar o trabalho" ("Considerei A, B e C...")
- Aumentar a frequência de conexões entre dados não óbvios
- Melhorar o timing — respostas muito rápidas para perguntas complexas parecem automáticas
- Garantir que a IA usa o contexto histórico da conversa (referências a respostas anteriores)
- Reduzir erros perceptíveis (um erro anula 10 acertos na percepção de inteligência)

**O que fazer se estiver acima do alvo:**
- Subir o padrão para 0.75
- Verificar se a inteligência percebida é genuína ou se o empresário tem baixa expectativa (se ele acha que sistema algum é inteligente, qualquer coisa parece inteligente)
- Introduzir demonstrações de inteligência mais sutis (conexões mais profundas, não apenas óbvias)

---

## Índice de Continuidade

**Nome oficial:** Continuidade da Experiência (CE)

**O que mede:** O quanto a experiência se mantém entre sessões — se o empresário volta, retoma de onde parou, e sente que o conhecimento é cumulativo.

**Definição conceitual:** Continuidade é a ausência de atrito entre sessões. O empresário não precisa "recomeçar" cada vez que entra — a experiência é contínua, como uma conversa que foi pausada e retomada.

**Cálculo conceitual:**

```
CE = (retornos voluntários / total de sessões) × (retenção de contexto)
```

Onde:
- **Retornos voluntários:** número de vezes que o empresário volta sem estímulo externo (notificação, e-mail, convite)
- **Total de sessões:** todas as sessões do empresário
- **Retenção de contexto:** o empresário retoma de onde parou (sim/não) — avaliado por observação: ele repete informação? ele faz referência à sessão anterior?

**Como observar no usuário:**

| Indicador de continuidade ALTA | Indicador de continuidade BAIXA |
|---------------------------------|---------------------------------|
| Empresário volta e retoma naturalmente | Empresário volta e pergunta "Onde eu estava?" |
| Refere-se à sessão anterior ("Da última vez você disse...") | Age como se fosse a primeira vez |
| Não repete informação já fornecida | Repete informação (esqueceu que já disse) |
| Empresário pergunta "Tem coisa nova?" | Não demonstra expectativa de novidade |
| Sessão atual constrói sobre a anterior | Sessão atual começa do zero |
| Empresário lembra dos insights anteriores | "O que você tinha descoberto mesmo?" |

**Alvo mínimo:** 0.50 (50% dos retornos são naturais, com contexto preservado)

**O que fazer se estiver abaixo do alvo:**
- Melhorar a saudação de retorno ("Bem-vindo de volta. Da última vez estávamos falando sobre X")
- Garantir que o estado cognitivo (confiança, hipóteses, lacunas) é salvo e restaurado
- Criar um "gancho" no final de cada sessão ("Na próxima, vou investigar Y")
- Verificar se o resumo da sessão anterior está acessível e visível
- Testar se o empresário consegue retomar em dispositivo diferente

**O que fazer se estiver acima do alvo:**
- Subir o padrão para 0.65
- Verificar se a continuidade é genuína ou se o empresário usa a plataforma com frequência tão alta que não há esquecimento
- Introduzir capacidades de "catch-up" automático ("Enquanto você esteve fora, descobri mais 2 coisas")

---

## Painel de Métricas — Resumo

| Métrica | Sigla | O que mede | Cálculo conceitual | Alvo | Como observar |
|---------|-------|-----------|-------------------|------|--------------|
| Clareza Cognitiva | CC | O quão claro é o diagnóstico | perguntas sem hesitação / total × taxa de resumo compreendido | ≥ 0.70 | Empresário relê menos, responde mais rápido, confirma resumos |
| Confiança Percebida | CP | O quanto o empresário confia | concordância × profundidade / (correções + 0.1) | ≥ 0.60 | Empresário discorda pouco, compartilha dados sensíveis, aprofunda |
| Taxa de Descoberta | TD | Qualidade dos insights | insights confirmados × confiança média / total de hipóteses | ≥ 0.50 | Empresário reconhece insights como válidos |
| Curiosidade Gerada | CG | Vontade de continuar | perguntas do empresário / total interações + taxa de aprofundamento | ≥ 0.40 | Empresário pergunta de volta, aceita aprofundar |
| Encantamento Cognitivo | EC | Surpresa positiva genuína | momentos WOW percebidos / disponíveis × reação positiva | ≥ 0.30 | Sorriso genuíno, comentários espontâneos, compartilhamento |
| Fluidez da Conversa | FC | Naturalidade da conversa | 1 - (interrupções + hesitações + correções) / total trocas | ≥ 0.70 | Fluxo contínuo sem pausas não-naturais |
| Carga Cognitiva Percebida | CCP | Sobrecarga do empresário | tempo médio / tempo ideal × taxa de re-leitura | ≤ 0.50 | Empresário demora, relê, parece cansado |
| Densidade de Valor | DV | Valor por tempo investido | insights válidos / minutos × relevância média | ≥ 0.30 | Empresário sente que o tempo valeu |
| Inteligência Percebida | IP | Quão inteligente a IA parece | conexões percebidas / esperadas × acerto - erro perceptível | ≥ 0.60 | Empresário se surpreende com conexões |
| Continuidade da Experiência | CE | Consistência entre sessões | retornos voluntários / total sessões × retenção de contexto | ≥ 0.50 | Empresário volta e retoma naturalmente |

---

## Matriz de Ação

| Métrica | Abaixo do alvo | No alvo | Acima do alvo |
|---------|---------------|---------|---------------|
| **CC** (Clareza) | Revisar texto das perguntas, simplificar, uma pergunta por vez | Manter, monitorar | Subir padrão, introduzir perguntas mais sofisticadas |
| **CP** (Confiança) | Melhorar precisão, transparência, demonstração de evidências | Manter, monitorar | Subir padrão, introduzir hipóteses desafiadoras |
| **TD** (Descoberta) | Revisar qualidade das hipóteses, aumentar confiança mínima | Manter, monitorar | Subir padrão, introduzir padrões mais complexos |
| **CG** (Curiosidade) | Melhorar ganchos de continuidade, provocar mais | Manter, monitorar | Subir padrão, canalizar para tópicos de alto valor |
| **EC** (Encantamento) | Melhorar qualidade dos insights, timing, conexões não óbvias | Manter, monitorar | Subir padrão (com cautela — é raro por natureza) |
| **FC** (Fluidez) | Mapear pontos de hesitação, ajustar ritmo | Manter, monitorar | Subir padrão, testar com perguntas mais complexas |
| **CCP** (Carga) | Simplificar, reduzir informação por vez, mais resumos | Manter, monitorar | Verificar se não está baixo por tédio, não por conforto |
| **DV** (Valor) | Acelerar primeiro insight, eliminar interações sem valor | Manter, monitorar | Subir padrão, verificar se densidade se mantém em sessões longas |
| **IP** (Inteligência) | Melhorar demonstração de raciocínio, reduzir erros | Manter, monitorar | Subir padrão, introduzir demonstrações mais sutis |
| **CE** (Continuidade) | Melhorar saudação de retorno, preservar estado, criar ganchos | Manter, monitorar | Subir padrão, introduzir catch-up automático |

---

## Regras de Leitura do Painel

1. **Nenhuma métrica existe isolada.** Sempre ler o conjunto. CC alta + CP baixa = empresário entende mas não confia. CC baixa + CP alta = impossível (confiança exige clareza).
2. **Se CCP está alta (carga excessiva), todas as outras métricas serão afetadas.** Reduzir carga é sempre a primeira prioridade.
3. **EC (encantamento) é a métrica mais volátil.** Pode cair sem aviso. Monitorar de perto.
4. **DV (valor por minuto) é a métrica de resultado final.** Se todas as outras estão bem mas DV está baixa, algo fundamental está errado.
5. **CE (continuidade) é a métrica de longo prazo.** Pode levar semanas para estabilizar. Não reagir a oscilações de curto prazo.

---

## Frequência de Medição

| Métrica | Frequência | Notas |
|---------|-----------|-------|
| CC (Clareza) | A cada sessão | Medir após cada conversa |
| CP (Confiança) | A cada sessão | Especialmente nas primeiras 5 sessões |
| TD (Descoberta) | A cada sessão | Contar insights válidos |
| CG (Curiosidade) | A cada sessão | Baixo custo de medição |
| EC (Encantamento) | A cada sessão | Exige observação direta (testes com usuários) |
| FC (Fluidez) | A cada sessão | Correlacionar com CCP |
| CCP (Carga) | A cada sessão | Médir tendência ao longo da sessão |
| DV (Valor) | A cada sessão | A métrica mais importante do painel |
| IP (Inteligência) | Semanal | Junta múltiplas sessões para formar percepção |
| CE (Continuidade) | Mensal | Precisa de múltiplos retornos para ser significativa |

**Nota sobre EC:** Encantamento é a única métrica que não pode ser medida em todas as sessões (exige observação presencial ou gravação). Para sessões sem observação direta, aproximar por proxy: número de compartilhamentos + taxa de comentários positivos espontâneos.

---

## Metas P23

| Métrica | Baseline (estimada sem P23) | Meta curto prazo (30 dias) | Meta médio prazo (90 dias) | Meta longo prazo (120 dias) |
|---------|---------------------------|---------------------------|---------------------------|----------------------------|
| CC | 0.45 | 0.60 | 0.70 | 0.75 |
| CP | 0.35 | 0.50 | 0.60 | 0.65 |
| TD | 0.25 | 0.40 | 0.50 | 0.55 |
| CG | 0.20 | 0.30 | 0.40 | 0.50 |
| EC | 0.10 | 0.20 | 0.30 | 0.35 |
| FC | 0.50 | 0.60 | 0.70 | 0.75 |
| CCP | 0.70 | 0.60 | 0.50 | 0.45 |
| DV | 0.15 | 0.20 | 0.30 | 0.40 |
| IP | 0.30 | 0.45 | 0.60 | 0.65 |
| CE | 0.20 | 0.35 | 0.50 | 0.55 |

**Nota:** Baselines são estimativas baseadas em comportamento observado antes do P23. Após a primeira rodada de testes com usuários reais, revisar as baselines com dados concretos.

---

## Como Evoluir as Métricas

### Ciclo de melhoria contínua

```
1. Medir → 2. Identificar métrica abaixo do alvo → 3. Diagnosticar causa raiz
→ 4. Implementar correção → 5. Medir novamente → 6. Comparar
```

### Para cada métrica abaixo do alvo

1. **Não tentar corrigir tudo de uma vez.** Escolher a métrica mais crítica (prioridade: CCP > DV > CP > CC > FC > TD > IP > CG > CE > EC).
2. **Formular hipótese.** "CCP está alta porque as perguntas têm vocabulário técnico que o empresário não domina."
3. **Testar a hipótese.** Simplificar o vocabulário de 3 perguntas e medir o impacto no CCP.
4. **Se funcionou:** aplicar a todas as perguntas.
5. **Se não funcionou:** formular nova hipótese.
6. **Documentar.** Toda correção que afeta métricas deve ser registrada em `docs/08-KNOWLEDGE/`.

### Gatilhos de alerta

| Gatilho | Ação |
|---------|------|
| Qualquer métrica abaixo do alvo por 3 dias consecutivos | Reunião de revisão |
| CCP > 0.70 por 1 dia | Interromper release, investigar imediatamente |
| CP < 0.40 por 2 dias consecutivos | Pausar lançamento de novas funcionalidades até resolver |
| DV < 0.20 por 5 dias consecutivos | Revisão completa do fluxo de conversa |
| CE cai > 20% em 1 semana | Investigar mudança recente que pode ter quebrado continuidade |
| 3+ métricas abaixo do alvo simultaneamente | Pausar tudo, revisão de produto |

---

## Glossário

| Termo | Definição |
|-------|-----------|
| **Insight válido** | Descoberta que o empresário reconhece como verdadeira e relevante |
| **Momento WOW** | Instante de encantamento genuíno com reação observável |
| **Hesitação natural** | Pausa < 3s para processamento reflexivo (normal e desejável) |
| **Hesitação não-natural** | Pausa > 3s causada por confusão, dúvida ou fricção |
| **Re-leitura** | Empresário lê a mesma mensagem da IA mais de uma vez |
| **Correção** | Empresário corrige a IA ou a si mesmo durante a interação |
| **Interrupção** | Quebra no fluxo natural da conversa |
| **Relação A/B/C** | Métrica obtida da relação entre dois ou mais indicadores observáveis |
| **Baseline** | Valor da métrica antes da intervenção (ponto de partida) |
| **Alvo** | Valor mínimo aceitável para a métrica (ou máximo, no caso da CCP) |

---

## Histórico de Versões

| Data | Versão | Alterações |
|------|--------|------------|
| 26/07/2026 | 1.0 | Criação inicial — 10 métricas proprietárias |

---

*Estas métricas são proprietárias da Ponte Digital. Não são métricas universais de produto. Foram criadas para medir o que é único na experiência cognitiva. Não tente aplicá-las a outros produtos — cada produto precisa de suas próprias métricas de experiência.*
