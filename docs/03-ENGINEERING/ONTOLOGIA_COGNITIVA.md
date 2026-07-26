# Ontologia Cognitiva da Ponte Digital

**Data:** 2026-07-18
**Status:** Vigente
**Hierarquia:** Constituição → **Ontologia Cognitiva** → Motor Cognitivo → DDD → Implementação
**Validade:** 10 anos (revisão obrigatória em 2036-07-18)

---

## Preâmbulo

Este documento define formalmente todos os conceitos fundamentais utilizados pela Plataforma Cognitiva da Ponte Digital.

Nenhum documento futuro poderá redefinir, expandir ou contradizer estes conceitos sem uma nova versão deste documento, aprovada pelo fundador e registrada em ADR.

Este documento não descreve código, banco ou telas. Ele descreve a **teoria do conhecimento** que fundamenta todo o sistema cognitivo. O DDD, o Motor Cognitivo, os agregados, as engines e a implementação são camadas abaixo desta ontologia.

**Princípio norteador:** Um conceito não é definido pelo que o sistema faz hoje. É definido pelo que o sistema deve tratar como verdade, independentemente de implementação. Se o sistema não implementa um conceito hoje, isso não é autorização para redefini-lo — é uma lacuna de implementação.

---

## Como ler este documento

Cada conceito é definido em 10 dimensões:

1. **Definição formal** — o que é, em uma frase.
2. **Propósito** — por que existe no sistema.
3. **Quem cria** — qual agente ou processo dá origem ao conceito.
4. **Quem pode alterar** — qual agente ou processo pode modificá-lo após criação.
5. **Quem pode consumir** — quem pode ler ou usar o conceito.
6. **Tempo de vida** — quanto tempo o conceito existe.
7. **Persistência** — como e onde o conceito é armazenado.
8. **Exemplo real** — caso concreto no domínio da Ponte.
9. **Exemplo incorreto** — caso que parece se aplicar mas não se aplica.
10. **Relacionamentos** — conexões formais com outros conceitos da ontologia.

---

## 1. FATO

### 1.1 Definição formal

**Fato é a unidade atômica da realidade.** Um fato é uma proposição objetiva sobre o mundo que pode ser verificada como verdadeira ou falsa independentemente de interpretação, crença ou contexto.

Fatos existem no mundo real. O sistema não cria fatos — o sistema apenas os registra.

### 1.2 Propósito

Fatos são a matéria-prima do sistema cognitivo. Todo processamento começa com um fato. Nenhum conhecimento existe sem fatos que o sustentem. Fatos são o limite inferior da cadeia de rastreabilidade: todo conhecimento, decisão e resultado deve poder ser rastreado até os fatos que o originaram.

### 1.3 Quem cria

- O mundo real (fatos ocorrem independentemente do sistema).
- Sistemas externos (APIs de pagamento, CRM, agenda — fatos chegam como dados).
- O empresário (ao registrar manualmente uma transação, contato ou evento).
- O sistema (ao registrar eventos internos — login, acesso, configuração).

O sistema não cria fatos do nada — ele cria registros de fatos. A distinção é fundamental: o fato "cliente pagou" existe no mundo; o sistema registra que isso aconteceu.

### 1.4 Quem pode alterar

**Ninguém.** Fatos são imutáveis por definição. Um fato não pode ser alterado — apenas corrigido (se foi registrado incorretamente) ou complementado (se mais detalhes forem descobertos). A correção de um fato não apaga o fato original — cria-se um novo fato (a correção) e mantém-se o original com a devida marcação.

### 1.5 Quem pode consumir

Qualquer processo do sistema pode consumir fatos: Observação, Sinal, Evidência, Hipótese, Decisão. Todo consumo de fato deve manter rastreabilidade para o fato original.

### 1.6 Tempo de vida

**Permanente.** Fatos não expiram. Um fato registrado é eterno no sistema. Mesmo que o conhecimento derivado dele seja refutado ou esquecido, o fato original permanece.

### 1.7 Persistência

- Tabelas de domínio CRM, Financeiro, Tarefas, Agenda.
- Logs de eventos de sistema.
- Registros de entrada de dados (diagnóstico, formulários).
- Futuro: Event Store dedicado.

A regra é: todo fato deve ser preservado em sua forma original. Agregações, sumários e interpretações são armazenados separadamente.

### 1.8 Exemplo real

"Cliente João Pagador efetuou um pagamento de R$ 1.500,00 em 2026-07-15." Este é um fato: ocorreu no mundo, foi registrado no Financeiro, pode ser verificado.

### 1.9 Exemplo incorreto

"Cliente João Pagador é bom pagador." Isso não é um fato — é uma interpretação. O fato é "João Pagador efetuou pagamentos em 15/07, 15/06, 15/05 sem atraso". "Bom pagador" é uma conclusão a partir de múltiplos fatos.

### 1.10 Relacionamentos

- **Observação** é a representação de um fato no sistema cognitivo.
- **Evidência** é um conjunto de fatos organizados em torno de uma hipótese.
- **Sinal** é um fato ou conjunto de fatos que se destaca por sua relevância.
- **Resultado** é o fato gerado por uma decisão (efeito colateral no mundo).

---

## 2. OBSERVAÇÃO

### 2.1 Definição formal

**Observação é a representação interna de um fato no sistema cognitivo.** É a tradução de um fato bruto (que existe no mundo) para a linguagem e formato do Motor Cognitivo.

Toda observação corresponde a um ou mais fatos. Nem todo fato vira observação — fatos irrelevantes ou abaixo do limiar de interesse são ignorados.

Uma observação é sempre imutável, datada e atribuída a uma fonte.

### 2.2 Propósito

As observações são o ponto de entrada do sistema cognitivo. O Motor não enxerga o mundo diretamente — enxerga observações. A qualidade e integridade de todo conhecimento depende da qualidade das observações que o fundamentam.

### 2.3 Quem cria

- **Observation Engine** — recebe eventos brutos do barramento e os normaliza em observações padronizadas.
- **Integrações externas** — APIs que entregam dados já no formato de observação.
- **Input direto** — empresário ou usuário registrando algo.

### 2.4 Quem pode alterar

**Ninguém.** Observações são imutáveis. Uma vez registrada, a observação não pode ser alterada. Se o fato foi mal interpretado, registra-se uma nova observação corrigindo a anterior. A observação original permanece para rastreabilidade.

### 2.5 Quem pode consumir

- Signal Engine (detecta padrões).
- Hypothesis Engine (formula hipóteses a partir de observações).
- Context Engine (inclui observações relevantes no contexto).
- Evidence Engine (organiza observações como evidência).
- Audit (rastreabilidade).

### 2.6 Tempo de vida

**Permanente.** Observações não expiram. Uma observação velha pode se tornar irrelevante, mas permanece disponível para consulta e auditoria.

### 2.7 Persistência

- Tabela `Observacao` (discriminada por tipo no agregado `PatrimonioCognitivo` após ADR-010).
- Ou tabela dedicada `Observacao` ligada ao fato original.

### 2.8 Exemplo real

Fato: "Cliente João Pagador efetuou pagamento de R$ 1.500,00."
Observação: `{ tipo: "PAGAMENTO_RECEBIDO", valor: 1500.00, cliente: "João Pagador", data: "2026-07-15", confianca: 1.0 }`

### 2.9 Exemplo incorreto

"Cliente João Pagador parece estar com fluxo de caixa positivo." Isso não é uma observação — é uma interpretação. A observação seria: "Cliente João Pagador recebeu R$ 15.000,00 em receitas e pagou R$ 12.000,00 em despesas no mês." O "fluxo de caixa positivo" é uma conclusão.

### 2.10 Relacionamentos

- **Fato**: observação é a representação de um fato.
- **Sinal**: uma observação que se destaca do ruído de fundo.
- **Evidência**: observações organizadas para sustentar ou refutar uma hipótese.
- **Evento**: observações são produzidas a partir de eventos que chegam ao barramento.

---

## 3. EVENTO

### 3.1 Definição formal

**Evento é a notificação de que algo ocorreu em um momento específico, dentro de um contexto delimitado.**

Eventos são a linguagem de comunicação entre os módulos e submotores do sistema. Todo evento carrega:
- Um nome semântico (`ClienteNaoRetornou`, `HipoteseConfirmada`)
- Um correlationId único (ADR-027)
- Um aggregateId (a que entidade se refere)
- Uma data/hora de ocorrência
- Dados contextuais

Eventos são imutáveis — uma vez emitidos, não podem ser retraídos. Se algo precisa ser desfeito, emite-se um novo evento de compensação.

### 3.2 Propósito

Eventos são o sistema circulatório da plataforma. Toda comunicação entre bounded contexts, módulos e submotores do Motor Cognitivo é feita exclusivamente por eventos. Eventos permitem:
- Rastreabilidade causal (correlationId).
- Desacoplamento entre emissores e consumidores.
- Processamento assíncrono e escalável.
- Auditoria completa de toda atividade do sistema.

### 3.3 Quem cria

- Módulos de domínio (CRM, Financeiro, Tarefas, Agenda) — emitem eventos de negócio quando algo relevante ocorre.
- Submotores do Motor Cognitivo — emitem eventos cognitivos (ObservacaoRegistrada, SinalDetectado, HipoteseGerada, etc.).
- O próprio barramento — eventos de infraestrutura (RotinaIniciada, CicloCompleto).
- Sistemas externos — através de adaptadores que traduzem chamadas externas em eventos internos.

### 3.4 Quem pode alterar

**Ninguém.** Eventos são imutáveis após emissão. Um evento emitido incorretamente é compensado por outro evento, nunca alterado.

### 3.5 Quem pode consumir

- Submotores do Motor Cognitivo (via Event Bus).
- Módulos de domínio (via Event Bus).
- Audit e rastreabilidade.
- Futuro: Data Warehouse / Analytics.

### 3.6 Tempo de vida

- **Ativo:** até ser processado por todos os handlers registrados (segundos a minutos).
- **Arquivado:** retido em log de eventos por no mínimo 2 anos para auditoria.

### 3.7 Persistência

- **Momento do processamento:** fila in-memory (Event Bus V1).
- **Persistido:** Event Store ou log de eventos (archivado periódicamente).

### 3.8 Exemplo real

Evento de negócio: `LeadConvertido { correlationId: "abc-123", leadId: "lead-456", empresaId: "emp-789", ocorridoEm: "2026-07-15T10:30:00Z" }`

Evento cognitivo: `HipoteseConfirmada { correlationId: "abc-123", hipoteseId: "hip-001", conhecimentoId: "conhec-001", ocorridoEm: "2026-07-16T14:00:00Z" }`

### 3.9 Exemplo incorreto

`EvidenciaRegistrada { ... }` — isso é um evento CRUD, não um evento de negócio. O evento correto seria o fato de negócio que gerou a evidência, não o registro da evidência em si.

### 3.10 Relacionamentos

- **Fato**: um evento notifica a ocorrência de um fato no sistema.
- **Observação**: o Observation Engine produz observações a partir de eventos recebidos.
- **Correlation ID**: mecanismo que agrupa eventos de uma mesma cadeia causal.
- **Event Bus**: infraestrutura de transporte dos eventos.

---

## 4. SINAL

### 4.1 Definição formal

**Sinal é uma observação que se destaca do ruído de fundo por sua relevância potencial.** Não é um tipo diferente de observação — é uma observação qualificada: a mesma observação, com um atributo adicional de "merece atenção".

O que distingue um sinal de uma observação comum é o **threshold de relevância**. Uma observação vira sinal quando seu score de prioridade potencial ultrapassa o limiar definido para aquele contexto.

Sinal não é conhecimento. Sinal é um alerta de que algo pode merecer investigação.

### 4.2 Propósito

Sinais são o mecanismo de filtragem entre o dilúvio de observações diárias e aquilo que realmente merece atenção. O Signal Engine existe para responder: "dentre todas as observações que recebemos hoje, quais merecem virar hipótese?"

Sinais evitam que o Motor Cognitivo tente explicar tudo — ele só tenta explicar o que se destaca.

### 4.3 Quem cria

- **Signal Engine** — analisa observações, aplica thresholds, emite `SinalDetectado`.
- **Regras explícitas** — empresário pode definir "toda observação do tipo X é sinal automático".
- **Padrões históricos** — se um tipo de observação repetidamente gera conhecimento útil, sua relevância aumenta.

### 4.4 Quem pode alterar

- O score de relevância do sinal pode ser ajustado pelo Priority Engine (com base em novos dados).
- O empresário pode promover uma observação a sinal manualmente (ensino explícito).
- O empresário pode rebaixar um sinal a observação comum (falso alarme).

O fato de ser sinal ou não é derivado, não absoluto.

### 4.5 Quem pode consumir

- Hypothesis Engine (formula hipótese a partir de sinais).
- Priority Engine (ajusta prioridade de processamento).
- Context Engine (inclui sinais ativos no contexto).
- Centro de Decisão (apresenta ao empresário).

### 4.6 Tempo de vida

- **Ativo:** até ser processado (vira hipótese) ou expirar (relevância cai abaixo do threshold).
- **Arquivado:** o histórico de sinais emitidos e ignorados é preservado para aprendizado do Motor.

### 4.7 Persistência

- Evento `SinalDetectado` no Event Bus.
- Registro no agregado `PatrimonioCognitivo` (tipo: SINAL, com score de relevância).
- Futuro: não haverá tabela separada "Sinal" — sinal é um estado no ciclo de vida do conhecimento.

### 4.8 Exemplo real

Observação: "Cliente João Pagador, que sempre pagava até o dia 5, não pagou até o dia 15."
Isso é uma observação. Se o histórico de João é de pontualidade, essa observação se destaca — vira sinal. Se João nunca paga no prazo, a mesma observação é ruído.

### 4.9 Exemplo incorreto

"Alerta de inadimplência acionado." Isso não é um sinal — é uma ação tomada a partir de um sinal. O sinal é a observação que se destacou. O alerta é a consequência.

### 4.10 Relacionamentos

- **Observação**: sinal é uma observação qualificada.
- **Hipótese**: sinal é o combustível da hipótese.
- **Ruído**: o negativo do sinal — observações que não se destacam.
- **Prioridade**: o score que determina se uma observação vira sinal.

---

## 5. EVIDÊNCIA

### 5.1 Definição formal

**Evidência é o conjunto de observações, organizadas em função de uma hipótese, que a sustentam ou a contradizem.**

Evidência não é um tipo de dado — é uma **relação** entre observações e uma hipótese. A mesma observação pode ser evidência a favor de uma hipótese e evidência contra outra.

A evidência é sempre contextual: depende da pergunta que se está fazendo.

### 5.2 Propósito

Evidências são o mecanismo de validação do sistema. Nenhuma hipótese pode ser confirmada sem evidência suficiente. Nenhum conhecimento pode ser mantido sem evidência que o suporte. A função do sistema é acumular evidências e avaliá-las — não saltar para conclusões.

### 5.3 Quem cria

- **Automaticamente:** o sistema relaciona observações a hipóteses ativas.
- **Explícitamente:** o empresário pode apontar "este fato sustenta esta hipótese".
- **Por inferência:** o Motor identifica observações que corroboram hipóteses existentes.

### 5.4 Quem pode alterar

- Novas observações podem ser adicionadas como evidência.
- Observações existentes podem ser removidas como evidência de uma hipótese (se a relação se mostrar inválida).
- A observação em si nunca é alterada — apenas a relação observação-hipótese pode ser modificada.

### 5.5 Quem pode consumir

- Hypothesis Engine (avalia se hipótese tem evidência suficiente).
- Knowledge Engine (promove hipótese a conhecimento quando evidência é suficiente).
- Trust Engine (calcula confiança com base na força das evidências).
- Context Engine (inclui evidências relevantes no contexto).
- Audit (rastreabilidade de validação).

### 5.6 Tempo de vida

- **Enquanto a hipótese estiver ativa:** evidências são mantidas ligadas à hipótese.
- **Após confirmação ou descarte:** o vínculo evidência-hipótese é arquivado (preservado para auditoria).

### 5.7 Persistência

- Relação N:N entre observações e hipóteses (tabela associativa ou dentro do agregado `PatrimonioCognitivo`).

### 5.8 Exemplo real

Hipótese: "João Pagador está com dificuldade financeira."
Evidências a favor: "João atrasou pagamento de R$ 1.500" (observação), "João não responde a contatos há 10 dias" (observação).
Evidências contra: "João pagou adiantado nos últimos 6 meses" (observações históricas).

### 5.9 Exemplo incorreto

"João está com dificuldade." Isso é a própria hipótese, não a evidência. Evidência são as observações que levam a essa conclusão.

### 5.10 Relacionamentos

- **Observação**: evidência é uma relação entre observações e hipóteses.
- **Hipótese**: evidência só existe em relação a uma hipótese.
- **Confiança**: a força da evidência determina a confiança na hipótese.
- **Conhecimento**: conhecimento validado é o resultado de evidência suficiente.

---

## 6. HIPÓTESE

### 6.1 Definição formal

**Hipótese é uma explicação candidata para um padrão observado, que ainda não foi confirmada, mas que possui evidência suficiente para merecer investigação.**

Hipótese é o primeiro momento em que o sistema propõe um "porquê". Observações e sinais respondem "o quê". Hipóteses respondem "por quê".

Uma hipótese temporariamente assume uma causalidade para poder testá-la — mas não a afirma como verdade até ser confirmada.

### 6.2 Propósito

Hipóteses são o motor da descoberta. O sistema não sabe tudo — ele formula hipóteses, coleta evidências e as confirma ou refuta. O ciclo hipótese → evidência → confirmação/refutação é o núcleo do aprendizado da máquina.

Sem hipóteses, o sistema só acumularia fatos, sem nunca interpretá-los.

### 6.3 Quem cria

- **Hypothesis Engine** — formula hipóteses a partir de sinais, buscando em seu banco de padrões.
- **Business rules** — regras de negócio podem gerar hipóteses automaticamente (ex.: "se atraso > 15 dias em cliente histórico, gerar hipótese de inadimplência").
- **Empresário** — o empresário pode registrar hipóteses diretamente (ensino explícito).

### 6.4 Quem pode alterar

- Hypothesis Engine — atualiza hipótese com novas evidências.
- Knowledge Engine — promove a conhecimento ou descarta.
- Validation Engine — ajusta força da hipótese.
- Empresário — pode refinar, confirmar ou rejeitar hipóteses.

### 6.5 Quem pode consumir

- Knowledge Engine (para validação e promoção).
- Decision Engine (para fundamentar decisões — com a devida transparência de que é hipótese, não conhecimento).
- Context Engine (inclui hipóteses ativas no contexto).
- Centro de Decisão (apresenta ao empresário como "suspeitas").

### 6.6 Tempo de vida

- **Ativa:** até ser confirmada (vira conhecimento), refutada (vira descartada) ou expirar (não evolui e é arquivada).
- **Mínimo para refutação:** 3 tentativas de validação ou 30 dias sem evidência conclusiva.
- **Após decisão:** arquivada com resultado (confirmada, refutada, inconclusiva).

### 6.7 Persistência

- Agregado discriminado no `PatrimonioCognitivo` (tipo: HIPOTESE, com campo estado no ciclo de vida).
- Estado segue: NOVA → EM_OBSERVACAO → FORTALECIDA → CONFIRMADA | DESCARTADA.

### 6.8 Exemplo real

Sinal: "João Pagador atrasou pagamento pela primeira vez em 18 meses."
Hipótese: "João Pagador pode estar enfrentando dificuldade financeira temporária."
Evidências subsequentes (coletadas pela hipótese): verificar se outros pagamentos atrasaram, se contato foi respondido.

### 6.9 Exemplo incorreto

"João Pagador é inadimplente." Isso já seria uma conclusão (conhecimento). Enquanto as evidências não forem suficientes, o correto é: "Hipótese: João Pagador pode estar se tornando inadimplente."

### 6.10 Relacionamentos

- **Sinal**: hipótese nasce de um sinal.
- **Evidência**: hipótese é sustentada ou refutada por evidências.
- **Conhecimento**: hipótese confirmada vira conhecimento.
- **Confiança**: hipótese tem score de confiança (inicial ≤ 30, ADR-025).
- **Convicção**: hipótese não tem convicção — só conhecimento tem.

---

## 7. CONVICÇÃO

### 7.1 Definição formal

**Convicção é a medida de estabilidade temporal de um conhecimento.** Confiança responde "quão certo estamos?". Convicção responde "há quanto tempo estamos certos?".

Fórmula: `convicção = dias_sem_refutação * 0.5`

Uma única refutação zera a convicção.

### 7.2 Propósito

Convicção resolve o dilema entre conhecimento novo de alta confiança e conhecimento antigo que nunca foi desafiado. Um conhecimento com confiança 80 e convicção 365 (2 anos sem refutação) merece mais peso que um conhecimento com confiança 90 e convicção 1 (confirmado hoje).

Convicção é o mecanismo que impede que conhecimento recém-adquirido, mesmo com alta confiança, sufoque conhecimento testado pelo tempo.

### 7.3 Quem cria

- **Trust Engine** — atribui convicção inicial (0) e a incrementa diariamente.
- **Outcome Engine** — zera convicção quando um resultado contradiz o conhecimento.

### 7.4 Quem pode alterar

- Trust Engine — incrementa (diariamente) ou zera (refutação).
- Validation Engine — zera quando revalidação falha.

Ninguém mais. Convicção não pode ser ajustada manualmente.

### 7.5 Quem pode consumir

- Priority Engine (fator de priorização).
- Decision Engine (peso na decisão).
- Context Engine (inclui convicção no contexto).
- Learning Engine (determina se conhecimento é estável o suficiente para ser usado como verdade).

### 7.6 Tempo de vida

- **Ativa:** enquanto o conhecimento não for refutado.
- **Zerada:** imediatamente após refutação.

### 7.7 Persistência

- Campo `conviccao` no agregado `PatrimonioCognitivo` (tipo: CONHECIMENTO).
- Ou derivado por fórmula a partir do campo `ultimaRefutacaoEm`.

### 7.8 Exemplo real

Conhecimento A: "Empresa X tem sazonalidade em dezembro." Confiança: 75, Convicção: 730 (2 anos sem refutação).
Conhecimento B: "Empresa X tem sazonalidade em julho." Confiança: 85, Convicção: 10 (descoberta recente).

Para uma decisão de dezembro, A pesa mais. Para uma decisão de julho, mais evidência é necessária.

### 7.9 Exemplo incorreto

Usar convicção como único fator de decisão. Um conhecimento errado, mas antigo, teria alta convicção sem merecer. Convicção sempre acompanha confiança, nunca a substitui.

### 7.10 Relacionamentos

- **Confiança**: convicção é complementar à confiança. Juntos formam a credibilidade do conhecimento.
- **Conhecimento**: convicção só se aplica a conhecimento validado.
- **Esquecimento**: convicção zero contribui para o arquivamento do conhecimento.
- **Prioridade**: convicção é um dos fatores de priorização (ADR-020).

---

## 8. CONHECIMENTO

### 8.1 Definição formal

**Conhecimento é uma hipótese que recebeu evidência suficiente para ser tratada como uma verdade funcional dentro de um contexto e com um nível de confiança associado.**

Conhecimento não é verdade absoluta — é verdade funcional. Funciona até nova evidência. Está sempre sujeito a revalidação.

A passagem de hipótese a conhecimento ocorre quando:
1. Evidência acumulada ≥ threshold de confirmação (score ≥ 60, ADR-025).
2. Mínimo de 2 submotores validaram a hipótese (ADR-028 — Curadoria).
3. A hipótese não contradiz conhecimento existente sem resolução.

### 8.2 Propósito

Conhecimento é o patrimônio mais valioso do sistema. É o que o Motor "sabe" sobre a empresa e que pode usar para:
- Fundamentar decisões.
- Gerar recomendações.
- Alimentar contexto para a IA.
- Aprender com resultados.

Nenhuma recomendação é gerada sem conhecimento que a fundamente. Nenhuma decisão é tomada no vácuo.

### 8.3 Quem cria

- **Knowledge Engine** — promove hipóteses validadas a conhecimento.
- **Empresário** — conhecimento explícito (ensino) entra com curadoria simplificada e score ≥ 70.

A IA nunca cria conhecimento (ADR-017).

### 8.4 Quem pode alterar

- Knowledge Engine — atualiza score de confiança com novas evidências.
- Learning Engine — ajusta com base em resultados e feedback.
- Validation Engine — revalida e pode rebaixar a hipótese se evidências contraditórias surgirem.
- Forgetting Engine — arquiva quando irrelevante.
- Empresário — pode corrigir, refinar ou remover conhecimento.

### 8.5 Quem pode consumir

- Decision Engine (fundamenta decisões).
- Context Engine (conhecimentos ativos vão para o Contexto Cognitivo).
- IA (recebe conhecimento já consolidado no Contexto Cognitivo — nunca cru).
- Centro de Decisão.
- Knowledge Vault (exibe ao empresário).
- Todos os submotores do Motor.

### 8.6 Tempo de vida

- **Ativo:** até ser arquivado (por irrelevância), refutado (por contradição) ou revalidado com sucesso.
- **Mínimo para arquivamento:** 90 dias sem acesso ou uso em decisão.
- **Mínimo para refutação:** evidência contrária com score maior que a evidência original.

### 8.7 Persistência

- Agregado `PatrimonioCognitivo` (tipo: CONHECIMENTO), com:
  - `confianca` (0-100)
  - `conviccao` (dias * 0.5)
  - `estado` (CONFIRMADO, CONSOLIDADO, ARQUIVADO)
  - `origem` (INFERIDO, EXPLICITO, VALIDACAO_TERCEIRO)
  - `ultimaRevalidacaoEm`
  - `correlationId` (cadeia causal)

### 8.8 Exemplo real

Hipótese promovida a conhecimento: "A empresa X tem um ciclo de vendas de 45 dias." Evidência: 12 ciclos observados em 18 meses, com desvio padrão de 5 dias. Confiança: 82. Convicção: 45 dias. Usado pelo Decision Engine para recomendar: "iniciar prospecção 45 dias antes do fim do trimestre."

### 8.9 Exemplo incorreto

"A empresa X está falindo." Isso não é conhecimento — é uma hipótese de alto impacto que exigiria evidências fortes demais para ser considerada conhecimento. Conhecimento seria: "A empresa X teve 3 trimestres consecutivos de queda de receita." A conclusão "está falindo" é uma interpretação que não deve ser tratada como conhecimento.

### 8.10 Relacionamentos

- **Hipótese**: conhecimento é hipótese confirmada.
- **Evidência**: conhecimento é sustentado por evidências.
- **Confiança**: todo conhecimento tem um score de confiança.
- **Convicção**: todo conhecimento tem convicção.
- **Decisão**: conhecimento fundamenta decisões.
- **Aprendizado**: conhecimento pode ser modificado por aprendizado.
- **Memória**: conhecimento é armazenado na hierarquia de memória.
- **Contexto**: conhecimentos ativos são parte do Contexto Cognitivo.

---

## 9. APRENDIZADO

### 9.1 Definição formal

**Aprendizado é a modificação do estado cognitivo do Motor resultante da interpretação de resultados e feedback sobre decisões anteriores.**

Aprendizado não é um tipo de conhecimento — é um processo que altera conhecimento. O output do aprendizado pode ser:
- Um novo conhecimento (aprendizado por descoberta).
- Um ajuste de confiança em conhecimento existente (aprendizado por reforço).
- A refutação de um conhecimento (aprendizado por correção).
- Uma nova hipótese (aprendizado por analogia).

### 9.2 Propósito

Aprendizado é o que faz o Motor evoluir. Sem aprendizado, o Motor saberia apenas o que foi programado ou ensinado. Com aprendizado, o Motor melhora com o uso.

Aprendizado fecha o ciclo cognitivo: decisão → resultado → feedback → aprendizado → melhor decisão.

### 9.3 Quem cria

- **Learning Engine** — processa resultados e feedback, gera modificações no conhecimento.
- **Empresário** — aprendizado explícito (ensino direto: "isso não funciona assim", "na verdade, a regra é X").
- **Sistema** — aprendizado automático por repetição (padrão observado N vezes vira hipótese).

A IA não gera aprendizado. A IA traduz o que já foi aprendido.

### 9.4 Quem pode alterar

- Learning Engine — executa as modificações.
- Empresário — pode reverter um aprendizado ("desensinar").
- Validation Engine — pode questionar aprendizado com evidências contrárias.

### 9.5 Quem pode consumir

- Knowledge Engine (aprendizado vira ou modifica conhecimento).
- Hypothesis Engine (aprendizado gera novas hipóteses).
- Context Engine (aprendizados recentes alimentam contexto).
- Decision Engine (aprendizado melhora decisões futuras).
- Memory Engine (aprendizado é consolidado na memória de longo prazo).

### 9.6 Tempo de vida

- **Processo:** contínuo (cada resultado gera potencial de aprendizado).
- **Efeito:** permanente até nova evidência.
- **Ensino explícito:** vigora até o empresário desensinar.

### 9.7 Persistência

- O aprendizado em si não é armazenado — armazenam-se seus efeitos (conhecimentos alterados, hipóteses criadas/refutadas).
- O registro de "o que foi aprendido quando" é armazenado no evento de aprendizado.
- O aggregate `Aprendizado` (LearningContext) registra o ensino explícito do empresário.

### 9.8 Exemplo real

Decisão: "Recomendar que João Pagador seja contatado para renegociação." Resultado: "João pagou no dia seguinte ao contato." Feedback: AJUDOU (confirmado pelo empresário). Aprendizado: o score do conhecimento "contato amigável resolve atrasos pontuais" é incrementado em +5.

### 9.9 Exemplo incorreto

"O Motor aprendeu que João Pagador é inadimplente." Incorreto. O Motor aprendeu que "João Pagador atrasou pagamentos em 3 dos últimos 12 meses" e ajustou a confiança de uma hipótese. A generalização "João é inadimplente" é excessiva e viola o princípio de não personificar.

### 9.10 Relacionamentos

- **Resultado**: aprendizado parte da análise de resultados.
- **Feedback**: aprendizado é guiado por feedback.
- **Conhecimento**: aprendizado altera conhecimento.
- **Memória**: aprendizado é consolidado na memória.
- **Decisão**: aprendizado melhora a qualidade de decisões futuras.

---

## 10. MEMÓRIA

### 10.1 Definição formal

**Memória é a capacidade do sistema de armazenar, recuperar e organizar conhecimento ao longo do tempo, organizada em níveis hierárquicos por recência, relevância e confiança.**

A memória não é um repositório uniforme. Ela tem quatro níveis hierárquicos (ADR-019):
1. **Working Memory** — contexto da sessão atual, volátil, capacidade limitada.
2. **Short Term** — últimos 30 dias, alta acessibilidade.
3. **Long Term** — até 1 ano, condensado, acessível por consulta.
4. **Archived** — permanente, removido do contexto ativo, acessível apenas por busca explícita.

### 10.2 Propósito

Memória resolve o problema da "cauda longa do conhecimento". Nem todo conhecimento precisa estar disponível o tempo todo. O que foi relevante ontem pode não ser hoje. A memória hierárquica permite que o sistema:
- Responda rápido com o que é relevante agora (Working + Short).
- Não perca o que foi aprendido (Long + Archived).
- Gerencie volume sem degradar performance (condensação).

### 10.3 Quem cria

- **Memory Engine** — gerencia a hierarquia, move conhecimento entre níveis.
- **Knowledge Engine** — conhecimento novo entra em Short Term.
- **Forgetting Engine** — move de Long para Archived.

### 10.4 Quem pode alterar

- Memory Engine — promove/remove entre níveis.
- Forgetting Engine — arquiva com base em políticas.
- Condensação — sumariza múltiplos conhecimentos correlatos em um registro mais genérico.

### 10.5 Quem pode consumir

- Context Engine (consulta Working + Short para montar contexto).
- Decision Engine (consulta Long para fundamentar decisões).
- IA (recebe o que está no Contexto Cognitivo — não consulta memória diretamente).
- Empresário (consulta Archived explicitamente).

### 10.6 Tempo de vida

- **Working Memory:** duração da sessão (horas).
- **Short Term:** até 30 dias.
- **Long Term:** até 1 ano sem acesso.
- **Archived:** permanente (não expira).

### 10.7 Persistência

- Working Memory: em memória (Redis ou estrutura volátil).
- Short/Long/Archived: no agregado `PatrimonioCognitivo`, com campo `nivelMemoria`.

### 10.8 Exemplo real

Working Memory: "João Pagador está com pagamento atrasado — estamos analisando." (contexto da conversa atual).
Short Term: "João Pagador atrasou pagamento em 15/07 — hipótese de dificuldade financeira gerada."
Long Term: "João Pagador tem histórico de pontualidade de 95% em 18 meses."
Archived: "João Pagador atrasou pagamento em jan/2024 — resolvido com contato."

### 10.9 Exemplo incorreto

Tudo em memória permanente. Sem condensação, o volume de conhecimento cresce sem limite e o Motor não consegue distinguir o relevante do obsoleto.

### 10.10 Relacionamentos

- **Conhecimento**: memória é onde o conhecimento é armazenado.
- **Aprendizado**: aprendizado é consolidado na memória.
- **Esquecimento**: memória é gerenciada pelo esquecimento programado.
- **Contexto**: contexto é montado a partir da memória ativa.

---

## 11. CONTEXTO

### 11.1 Definição formal

**Contexto é o pacote fechado e imutável que representa o estado cognitivo atual da empresa para um fim específico (decisão, comunicação, análise).**

Contexto é sempre:
- **Fechado** — produzido por um único produtor (Context Engine).
- **Imutável** — uma vez produzido, não é alterado.
- **Orientado a propósito** — contexto para decidir, contexto para comunicar, contexto para analisar.
- **Temporário** — contexto expira com a sessão ou decisão.

O Contexto não é o estado real da empresa. É uma fotografia do que o Motor sabe sobre a empresa naquele momento.

### 11.2 Propósito

Contexto é a interface entre o Motor e o resto do mundo. Tudo que o Motor comunica — para a IA, para o empresário, para outros módulos — passa pelo Contexto. Ninguém acessa o estado interno do Motor diretamente (ADR-021).

O Contexto garante que toda decisão, recomendação ou comunicação é baseada no mesmo retrato da empresa.

### 11.3 Quem cria

- **Context Engine** — único produtor (ADR-021). Coleta informações de todos os submotores e monta o pacote.

### 11.4 Quem pode alterar

**Ninguém.** O Contexto é imutável após produzido. Se a situação muda, produz-se um novo Contexto.

### 11.5 Quem pode consumir

- **Decision Engine** — recebe contexto e toma decisões.
- **IA** — recebe contexto e traduz para linguagem natural (ADR-017).
- **Módulos de domínio** — recebem contexto para ajustar comportamento.
- **Empresário** — via UI (o contexto é traduzido em experiência).

### 11.6 Tempo de vida

- **Decisão:** o contexto dura o tempo da decisão (segundos).
- **Sessão:** o contexto da sessão dura até o fim da interação.
- **Notificação:** o contexto de uma notificação dura até ser lida.

### 11.7 Persistência

- **Em trânsito:** objeto de dados no barramento.
- **Cache:** in-memory com TTL da sessão.
- **Histórico:** opcional, para auditoria de decisões.

### 11.8 Exemplo real

Contexto Cognitivo para decisão de contato com João Pagador:
- Conhecimentos ativos: "João é pontual (confiança 90)", "João está com pagamento atrasado (confiança 80)".
- Hipóteses ativas: "João pode estar com dificuldade financeira".
- Sinais: "atraso de 15 dias em cliente de 18 meses".
- Prioridade: 72 (relevante).
- Recomendações do Motor: "contatar João para verificar situação".

### 11.9 Exemplo incorreto

Contexto como um dump completo do banco de dados. Contexto é fotografia, não backup. Contém apenas o relevante para o propósito específico.

### 11.10 Relacionamentos

- **Memória**: contexto é uma projeção da memória ativa.
- **Decisão**: contexto é pré-requisito para decisão.
- **IA**: contexto é o único insumo que a IA recebe.
- **Sinal**: sinais ativos são parte do contexto.

---

## 12. DECISÃO

### 12.1 Definição formal

**Decisão é uma recomendação formal de ação, com justificativa rastreável, baseada em contexto, conhecimento e priorização.**

Uma decisão sempre contém:
- **O quê** — a ação recomendada.
- **Por quê** — a justificativa.
- **Com base em quais conhecimentos** — linkage para os conhecimentos usados.
- **Com qual confiança** — score de confiança da decisão.
- **Alternativas consideradas** — outras opções avaliadas.
- **Risco** — riscos identificados.

### 12.2 Propósito

Decisões são o output primário do Motor Cognitivo. O Motor não existe para acumular conhecimento — existe para ajudar o empresário a decidir melhor. Conhecimento sem decisão é biblioteca; conhecimento com decisão é consultoria.

### 12.3 Quem cria

- **Decision Engine** — produz decisões formais a partir do Contexto Cognitivo.
- **Empresário** — toma decisões independentemente do Motor (e o Motor aprende com elas).

A IA não toma decisões. A IA comunica as decisões do Motor.

### 12.4 Quem pode alterar

- **Decision Engine** — pode revisar uma decisão se novo contexto chegar (antes da execução).
- **Empresário** — aceita, rejeita ou modifica a decisão.

### 12.5 Quem pode consumir

- **Action Engine** — executa a decisão (se for ação automática).
- **Empresário** — executa ou recusa.
- **Outcome Engine** — registra o resultado da decisão.
- **Learning Engine** — analisa resultado e gera aprendizado.
- **Memory Engine** — registra a decisão na memória.

### 12.6 Tempo de vida

- **Ativa:** até ser executada, rejeitada ou expirar (ver regras de expiração).
- **Arquivada:** como registro de decisão (para auditoria e aprendizado).
- **Padrão de expiração:** 7 dias para decisão não executada (configurável).

### 12.7 Persistência

- Aggregate `AcaoCognitiva` (DecisionContext) ou dentro do agregado de Decisão.
- Sempre linkada ao Contexto Cognitivo que a gerou.

### 12.8 Exemplo real

Decisão: "Recomendar contato preventivo com João Pagador."
Justificativa: "João tem 95% de pontualidade em 18 meses e está com pagamento atrasado há 15 dias — evidência de possível dificuldade financeira temporária."
Confiança: 82.
Conhecimentos usados: "João é pontual (confiança 90)", "Atraso em cliente pontual é preditivo de dificuldade financeira (confiança 75)".
Alternativas consideradas: "Aguardar mais 15 dias (risco: multa contratual)", "Enviar cobrança automática (risco: dano ao relacionamento)".

### 12.9 Exemplo incorreto

Decisão sem justificativa. "Contatar João" sem explicar por quê não é uma decisão do Motor — é uma ação arbitrária.

### 12.10 Relacionamentos

- **Contexto**: decisão é baseada em contexto.
- **Conhecimento**: decisão é fundamentada em conhecimento.
- **Resultado**: decisão gera resultado.
- **Aprendizado**: resultado gera aprendizado que melhora decisões futuras.
- **Confiança**: toda decisão tem confiança associada.

---

## 13. RESULTADO

### 13.1 Definição formal

**Resultado é a consequência observável de uma decisão no mundo real.**

Resultado é a evidência mais valiosa do sistema. Uma decisão pode estar certa na teoria. O resultado mostra se estava certa na prática. Sem resultado, o Motor não aprende.

### 13.2 Propósito

Resultados fecham o ciclo cognitivo. São o "feedback do mundo real" que permite ao Motor:
- Validar suas decisões.
- Ajustar conhecimento.
- Gerar aprendizado.
- Melhorar decisões futuras.

### 13.3 Quem cria

- **Outcome Engine** — registra resultados observados.
- **Sistemas externos** — resultados que chegam via integração (ex.: pagamento confirmado).
- **Empresário** — registra resultado de uma decisão manual.

### 13.4 Quem pode alterar

- O resultado em si é imutável após registro.
- A interpretação do resultado (positivo/negativo/neutro) pode ser ajustada pelo Learning Engine com base em feedback.

### 13.5 Quem pode consumir

- **Learning Engine** — principal consumidor (resultados geram aprendizado).
- **Knowledge Engine** — resultados podem fortalecer ou enfraquecer conhecimento.
- **Context Engine** — resultados recentes são parte do contexto.
- **Empresário** — via Centro de Decisão e dashboards.

### 13.6 Tempo de vida

- **Ativo:** até ser processado (segundos a dias).
- **Arquivado:** permanente (para auditoria e aprendizado retrospectivo).

### 13.7 Persistência

- Aggregate `Outcome` (FeedbackContext) ou dentro do agregado de Decisão.
- `correlationId` liga ao ciclo causal completo.

### 13.8 Exemplo real

Decisão: "Contatar João Pagador preventivamente."
Resultado: "João Pagador efetuou o pagamento no dia seguinte ao contato e respondeu positivamente." Interpretação: positivo.

### 13.9 Exemplo incorreto

"João Pagador ficou satisfeito." Isso é interpretação, não resultado. O resultado é: "João Pagador pagou" e "João respondeu positivamente". "Satisfeito" é inferência sobre estado emocional.

### 13.10 Relacionamentos

- **Decisão**: resultado é a consequência de uma decisão.
- **Aprendizado**: resultado gera aprendizado.
- **Feedback**: resultado é frequentemente acompanhado de feedback.
- **Evidência**: resultado é a forma mais forte de evidência.

---

## 14. FEEDBACK

### 14.1 Definição formal

**Feedback é a avaliação explícita do empresário sobre a qualidade e utilidade de uma decisão, ação ou recomendação do Motor.**

Diferente de resultado (que é factual — "pagou" ou "não pagou"), feedback é avaliativo — "isso foi útil" ou "isso não ajudou".

Tipos de feedback (ARCHITECTURE_DDD.md):
- AJUDOU
- AJUDOU_PARCIALMENTE
- NAO_AJUDOU
- NAO_EXECUTADA

### 14.2 Propósito

Feedback é o canal direto de ensino do empresário. Enquanto resultados dizem "o que aconteceu", feedback diz "o que você acha do que aconteceu?". A combinação resultado + feedback é o insumo mais rico para aprendizado.

### 14.3 Quem cria

- **Empresário** — exclusivamente. Feedback só tem valor se vier do usuário do sistema.

### 14.4 Quem pode alterar

- Empresário — pode alterar feedback (se mudar de opinião).
- Learning Engine — interpreta feedback, mas não altera o registro original.

### 14.5 Quem pode consumir

- **Learning Engine** — processa feedback para gerar aprendizado.
- **Trust Engine** — ajusta confiança com base em feedback.
- **Decision Engine** — feedback negativo sobre decisões semelhantes reduz score de decisões futuras.
- **Knowledge Engine** — feedback pode fortalecer ou enfraquecer conhecimento (MOTOR_COGNITIVO.md seção 9.3).

### 14.6 Tempo de vida

- **Ativo:** até ser processado (imediato).
- **Arquivado:** permanente (para auditoria da relação empresário-Motor).

### 14.7 Persistência

- Aggregate `FeedbackAcao` (FeedbackContext). Futuramente: Value Object dentro da Decisão.

### 14.8 Exemplo real

Decisão: "Contatar João Pagador." Resultado: "João pagou."
Feedback do empresário: AJUDOU — "Sim, o contato resolveu."
Impacto: conhecimento "contato amigável resolve atrasos pontuais" ganha +5 confiança.

### 14.9 Exemplo incorreto

Feedback gerado automaticamente. "Sistema detectou que o empresário ignorou a recomendação → NAO_EXECUTADA." Isso não é feedback — é inferência. Pode ser um indicador, mas não substitui o feedback explícito.

### 14.10 Relacionamentos

- **Decisão**: feedback avalia uma decisão.
- **Resultado**: feedback complementa o resultado (factual vs avaliativo).
- **Aprendizado**: feedback é matéria-prima do aprendizado.
- **Confiança**: feedback altera scores de confiança.

---

## 15. PADRÃO

### 15.1 Definição formal

**Padrão é uma regularidade observável em múltiplas observações, que sugere, mas não prova, uma relação subjacente.**

Um padrão é uma observação de segunda ordem — não é um fato, é uma regularidade entre fatos. Padrões são detectados pela Signal Engine e alimentam a Hypothesis Engine.

Padrão não é conhecimento. É suspeita de que pode haver conhecimento ali.

### 15.2 Propósito

Padrões são a ponte entre observação bruta e hipótese. O Signal Engine não formula hipóteses — ele detecta padrões. A Hypothesis Engine interpreta padrões como possíveis causas.

### 15.3 Quem cria

- **Signal Engine** — detecta padrões em observações.
- **Learning Engine** — padrões de longo prazo podem emergir de múltiplos ciclos.
- **Empresário** — pode apontar padrões explicitamente ("sempre que chove, minhas vendas caem").

### 15.4 Quem pode alterar

- Signal Engine — ajusta padrão com novas observações.
- Ninguém mais — padrão é observação, não construção.

### 15.5 Quem pode consumir

- **Hypothesis Engine** — principal consumidor.
- **Context Engine** — padrões ativos podem contextualizar decisões.

### 15.6 Tempo de vida

- **Ativo:** enquanto houver observações que o sustentem.
- **Arquivado:** se não gerar hipótese após N observações (esquecido como padrão irrelevante).

### 15.7 Persistência

- Em memória (Signal Engine mantém padrões ativos).
- Persistido como evento `PadraoDetectado` no barramento.
- Futuro: pode ser armazenado como estado transitório no agregado `PatrimonioCognitivo`.

### 15.8 Exemplo real

Observações: "João Pagador atrasou pagamento em jan/2025", "fev/2025", "mar/2025".
Padrão: "João Pagador atrasa pagamentos no início do ano."
Isso não é conhecimento (3 meses podem ser coincidência). É um padrão que merece virar hipótese.

### 15.9 Exemplo incorreto

"João Pagador é mau pagador." Isso já é uma hipótese (ou pior, uma conclusão). O padrão é "João atrasa no início do ano". A hipótese é "João pode ter dificuldade sazonal". A confusão entre padrão e hipótese é um erro comum.

### 15.10 Relacionamentos

- **Observação**: padrão emerge de múltiplas observações.
- **Hipótese**: padrão vira insumo para hipótese.
- **Correlação**: padrão pode ser correlacional (A e B acontecem juntos) — ver regra universal sobre causalidade.

---

## 16. CORRELAÇÃO

### 16.1 Definição formal

**Correlação é a observação de que dois ou mais fenômenos ocorrem juntos com frequência maior que o acaso, sem que se possa afirmar que um causa o outro.**

Correlação é um tipo específico de padrão — padrão entre duas variáveis. Toda correlação é um padrão, mas nem todo padrão é uma correlação.

Correlação é o limite do que o Motor pode observar sem fazer afirmações causais.

### 16.2 Propósito

Correlações são úteis como:
- **Sinal de alerta:** "quando X e Y acontecem juntos, algo pode estar errado."
- **Pista para investigação:** "X e Y estão correlacionados — vamos investigar por quê."
- **Input para hipótese:** a correlação alimenta a Hypothesis Engine que busca a causa.

O Motor nunca trata correlação como causalidade. Essa distinção é um dos princípios mais importantes do sistema (Princípio 2).

### 16.3 Quem cria

- **Signal Engine** — detecta correlações entre observações.
- **Analysis Engine** (futuro) — análises estatísticas.

### 16.4 Quem pode alterar

- O coeficiente de correlação é atualizado com novos dados.
- A correlação pode desaparecer se novos dados a enfraquecerem.

### 16.5 Quem pode consumir

- **Hypothesis Engine** — busca causas para correlações observadas.
- **Context Engine** — correlações fortes podem ser incluídas no contexto.
- **Empresário** — correlações são apresentadas como "observamos que..." nunca como "isso causa aquilo".

### 16.6 Tempo de vida

- **Ativa:** enquanto houver dados que a sustentem.
- **Mínimo para existência:** 10 observações ou 30 dias.

### 16.7 Persistência

- Em memória ou como evento `CorrelacaoObservada` no barramento.
- Não tem representação como conhecimento (correlação não é conhecimento).

### 16.8 Exemplo real

"Observamos que empresas que contratam funcionários em janeiro têm maior rotatividade no primeiro trimestre."
Isso é uma correlação. Não significa que contratar em janeiro CAUSA rotatividade. Pode ser que empresas que contratam em janeiro sejam de setores com alta rotatividade natural.

### 16.9 Exemplo incorreto

"Portanto, não contrate em janeiro." Isso seria tratar correlação como causalidade. A ação correta é: "Vamos investigar por que empresas que contratam em janeiro têm maior rotatividade — existe uma causa comum?"

### 16.10 Relacionamentos

- **Padrão**: correlação é um tipo de padrão.
- **Hipótese**: correlação alimenta hipóteses causais.
- **Causalidade**: correlação não é causalidade — regra universal obrigatória.

---

## 17. REGRA

### 17.1 Definição formal

**Regra é uma formalização determinística de um padrão ou conhecimento que dispara comportamento automático quando suas condições são satisfeitas.**

Regras são diferentes de conhecimento:
- Conhecimento informa. Regra executa.
- Conhecimento pode ser incerto. Regra é binária (condição satisfeita ou não).
- Conhecimento evolui. Regra é fixa até ser explicitamente alterada.

Toda regra deve ser rastreável ao conhecimento ou padrão que a originou.

### 17.2 Propósito

Regras são o mecanismo de ação automática do sistema. Enquanto conhecimento alimenta decisões (que exigem julgamento), regras executam ações determinísticas (que não exigem julgamento).

Exemplos de regras:
- "Se cliente com pagamento atrasado > 30 dias, enviar notificação."
- "Se lead não responde em 7 dias, rebaixar temperatura."
- "Se receita mensal < 80% da meta, gerar alerta."

### 17.3 Quem cria

- **Domínio** — regras de negócio embutidas nos módulos (CRM, Financeiro, etc.).
- **Empresário** — regras personalizadas ("me avise quando...", "automaticamente faça...").
- **Motor Cognitivo** — regras derivadas de conhecimento confirmado (ex.: "João sempre paga dia 5 → regra: antecipar cobrança para dia 3").

### 17.4 Quem pode alterar

- Empresário — regras personalizadas.
- Admin — regras de sistema.
- Motor Cognitivo — pode sugerir alteração, mas não altera automaticamente sem aprovação.

### 17.5 Quem pode consumir

- **Módulos de domínio** — executam regras de negócio.
- **Action Engine** — executa regras do Motor.
- **Centro de Decisão** — regras alimentam alertas e prioridades.

### 17.6 Tempo de vida

- **Regra de negócio:** permanente (enquanto o módulo existir).
- **Regra personalizada:** vigora até o empresário remover.
- **Regra derivada:** vigora enquanto o conhecimento que a originou for válido.

### 17.7 Persistência

- No código dos módulos (regras de negócio fixas).
- Em tabela de regras configuráveis (regras personalizáveis).
- Como conhecimento do tipo REGRA no agregado `PatrimonioCognitivo`.

### 17.8 Exemplo real

Regra: "Se lead ficar 7 dias sem interação no estágio 'Qualificação', reduzir temperatura para Fria."
Origem: conhecimento "leads sem interação por 7 dias têm 80% de chance de não converter."

### 17.9 Exemplo incorreto

Regra baseada em correlação não validada. "Se lead veio de campanha de e-mail, atribuir score alto." Se a correlação "e-mail → alta conversão" não foi validada como conhecimento, a regra não deve existir.

### 17.10 Relacionamentos

- **Conhecimento**: regra pode ser derivada de conhecimento.
- **Decisão**: regra pode executar uma decisão automaticamente.
- **Ação**: regra dispara ações.

---

## 18. INSIGHT

### 18.1 Definição formal

**Insight é uma conexão nova entre dois ou mais conhecimentos previamente não relacionados, que revela uma percepção não óbvia sobre a realidade da empresa.**

Insight difere de conhecimento:
- Conhecimento é a confirmação de uma hipótese.
- Insight é a conexão entre conhecimentos que já existiam separadamente.

O insight não cria novo conhecimento — ele cria nova relação entre conhecimentos existentes. O valor está na relação, não nos elementos.

### 18.2 Propósito

Insights são o nível mais alto de processamento cognitivo do Motor. Enquanto conhecimento responde "o que sabemos", insight responde "o que isso significa junto com aquilo".

Insights são o principal gerador de valor percebido pelo empresário — revelam conexões que o empresário não teria feito sozinho.

### 18.3 Quem cria

- **Decision Engine** — ao cruzar conhecimentos para fundamentar uma decisão.
- **Context Engine** — ao montar o contexto, conexões não óbvias emergem.
- **Empresário** — o insight mais valioso é o do empresário ("agora entendi por que isso acontece").

A IA não gera insights. A IA traduz insights gerados pelo Motor.

### 18.4 Quem pode alterar

- **Ninguém.** Um insight é uma descoberta, não uma construção. Pode ser refinado ou complementado, mas não "editado".

### 18.5 Quem pode consumir

- **Empresário** — principal consumidor.
- **Context Engine** — insigths recentes alimentam o contexto.
- **Learning Engine** — um insight pode gerar novas hipóteses.

### 18.6 Tempo de vida

- **Ativo:** enquanto os conhecimentos que o compõem forem ativos.
- **Arquivado:** se os conhecimentos forem refutados ou arquivados.

### 18.7 Persistência

- Como evento `InsightGerado` no barramento.
- Como registro vinculado ao Contexto Cognitivo que o gerou.
- Futuro: conhecimento do tipo INSIGHT no agregado `PatrimonioCognitivo`.

### 18.8 Exemplo real

Conhecimento A: "João Pagador atrasa pagamentos no início do ano."
Conhecimento B: "João Pagador tem alta sazonalidade de vendas em dezembro."
Insight: "João Pagador pode atrasar pagamentos no início do ano porque seu fluxo de caixa é afetado pela sazonalidade de vendas em dezembro — o atraso não é inadimplência, é ciclo."

### 18.9 Exemplo incorreto

"A empresa X está com problemas." Isso não é insight — é uma conclusão genérica. Insight é específico e revela conexão: "A inadimplência dos clientes da empresa X está correlacionada com o prazo de pagamento que ela oferece — clientes com prazo > 30 dias inadimplem 3x mais."

### 18.10 Relacionamentos

- **Conhecimento**: insight conecta conhecimentos.
- **Contexto**: insight emerge do contexto.
- **Decisão**: insight pode fundamentar decisões melhores.
- **Aprendizado**: um insight pode gerar aprendizado se validado.

---

## 19. SABEDORIA EMPRESARIAL

### 19.1 Definição formal

**Sabedoria Empresarial é a capacidade do sistema de fazer julgamentos sólidos com base em conhecimento acumulado, experiência validada e reconhecimento de padrões, mesmo quando os dados são incompletos ou ambíguos.**

Sabedoria não é um tipo de conhecimento. É uma propriedade emergente do sistema quando:
1. Conhecimento acumulado é suficiente para cobrir a maioria dos cenários.
2. Convicção é alta nos conhecimentos mais críticos.
3. O sistema conhece seus próprios limites (sabe o que não sabe).
4. O sistema reconhece padrões que já viu antes.

### 19.2 Propósito

Sabedoria Empresarial é o estado de maturidade que o Motor atinge após acumular e validar conhecimento por tempo suficiente. Não se programa sabedoria — ela emerge do uso.

A Ponte Digital não entrega sabedoria. Ela cria as condições para que a sabedoria emerja: observação consistente, validação rigorosa, aprendizado contínuo, memória organizada.

### 19.3 Quem cria

**Ninguém.** Sabedoria não é criada — emerge. É o resultado de:
- Anos de observação consistente.
- Milhares de ciclos completos de decisão → resultado → aprendizado.
- Conhecimento validado por múltiplas fontes.
- Reconhecimento de padrões que se repetem ao longo do tempo.

### 19.4 Quem pode alterar

- Ninguém. A sabedoria do sistema evolui organicamente.

### 19.5 Quem pode consumir

- **Empresário** — como recomendações mais precisas e contextualizadas.
- **Sistema** — como melhores decisões automáticas.

### 19.6 Tempo de vida

- **Emerge:** após meses a anos de operação consistente.
- **Permanente:** uma vez atingida, a sabedoria se mantém enquanto o ciclo cognitivo continuar operando.

### 19.7 Persistência

- **Não é armazenada.** Sabedoria é propriedade emergente do estado do sistema. Não existe campo "sabedoria" no banco.

### 19.8 Exemplo real

Após 3 anos operando a Ponte Digital para uma empresa, o Motor:
- Sabe que a empresa tem sazonalidade em dezembro (conhecimento confirmado).
- Sabe que atrasos em janeiro são cíclicos, não inadimplência (conhecimento confirmado).
- Sabe que recomendar contato preventivo em janeiro sempre funciona (aprendizado acumulado).
- Recomenda automaticamente ações de fluxo de caixa para janeiro sem precisar de input explícito.

Isso é sabedoria empresarial: o Motor age como um conselheiro que conhece a empresa profundamente.

### 19.9 Exemplo incorreto

Um sistema de regras complexas. Regras não produzem sabedoria — produzem comportamento determinístico. Sabedoria envolve julgamento contextual, não condicional.

### 19.10 Relacionamentos

- **Conhecimento**: sabedoria se constrói sobre conhecimento.
- **Convicção**: sabedoria requer convicção alta nos conhecimentos fundamentais.
- **Experiência**: sabedoria requer ciclos completos de decisão → resultado.
- **Memória**: sabedoria requer memória de longo prazo.
- **Contexto**: sabedoria se manifesta no contexto.

---

## MAPA DE EVOLUÇÃO DO CONHECIMENTO

```
Fato (mundo real)
   │
   ▼
Evento (notificação no barramento)
   │
   ▼
Observação (representação interna)
   │
   ▼
[Sinal?] ──(relevância ≥ threshold)──▶ Sinal (observação que se destaca)
   │                                       │
   │                                       ▼
   │                                  [Padrão?] ──(regularidade)──▶ Padrão
   │                                       │                          │
   │                                       ▼                          ▼
   └────────────────────────────────────────────────────────────── Hipótese (explicação candidata)
                                                                      │
                                                                      ▼
                                                              [Evidência?] ◀── Observações adicionais
                                                                      │
                                                    ┌─────────────────┼─────────────────┐
                                                    ▼                 ▼                 ▼
                                          Evidência            Evidência          Inconclusivo
                                          Suficiente          Insuficiente
                                                    │                 │
                                                    ▼                 ▼
                                            Conhecimento       [Hipótese]
                                            (score ≥ 60,       (continua em
                                             validado)          observação)
                                                    │
                                                    ▼
                                            [Decisão?] ◀── Contexto Cognitivo
                                                    │
                                                    ▼
                                              Decisão
                                                    │
                                                    ▼
                                              Ação
                                                    │
                                                    ▼
                                              Resultado ◀── mundo real
                                                    │
                                                    ▼
                                         [Feedback?] ──▶ Aprendizado
                                                    │
                        ┌───────────────────────────┼───────────────────────────┐
                        ▼                           ▼                           ▼
                  Conhecimento                Hipótese                     Memória
                  fortalecido                criada/refutada            (aprendizado
                                                                        consolidado)
                        │                           │                           │
                        ▼                           ▼                           ▼
                  Novo ciclo ◀──────────── Contexto Cognitivo ◀─────────── Próxima decisão
```

### Regras de evolução

1. Nenhuma etapa pode ser pulada. Conhecimento não nasce de observação direta — precisa passar por hipótese e validação.
2. Exceção: conhecimento explícito do empresário entra direto (etapa Conhecimento) com score ≥ 70 (ADR-025).
3. Toda etapa é opcional no sentido de que o fluxo pode parar em qualquer ponto. Observações que não viram sinal param ali. Hipóteses sem evidência param ali.
4. O ciclo nunca termina — resultado realimenta o sistema.
5. O Correlation ID (ADR-027) propaga por todo o ciclo: do evento ao aprendizado.

---

## MÁQUINA DE ESTADOS DO CONHECIMENTO

### Estados

```
SINAL_BRUTO ──▶ EM_OBSERVACAO ──▶ HIPOTESE ──▶ EM_VALIDACAO ──▶ CONFIRMADO ──▶ CONSOLIDADO ──▶ ARQUIVADO
                      │                │              │                                    ▲
                      │                │              ▼                                    │
                      │                │           DESCARTADO ──────────────────────────────┘
                      │                │                                                   
                      ▼                ▼                                                   
                 DESCARTADO       REATIVADO ────────────────────────────────────────────────┘
                                                          
ARQUIVADO ──▶ REATIVADO (via novo sinal)
```

### Transições formais

| De | Para | Gatilho | Regras |
|---|---|---|---|
| SINAL_BRUTO | EM_OBSERVACAO | Sinal detectado com relevância ≥ threshold | Mínimo: 1 observação |
| SINAL_BRUTO | DESCARTADO | Sinal irrelevante (threshold não atingido em 7 dias) | Preservar para histórico |
| EM_OBSERVACAO | HIPOTESE | Padrão detectado com confiança mínima de 10 | Mínimo: 3 observações em período ≤ 30 dias |
| EM_OBSERVACAO | DESCARTADO | Não evolui para hipótese em 30 dias | Prorrogável pelo empresário |
| HIPOTESE | EM_VALIDACAO | Hipótese formalizada com evidência inicial | Deve ter ao menos 1 evidência |
| HIPOTESE | DESCARTADO | Evidência contrária inicial supera evidência favorável | Mínimo: 1 evidência contrária |
| EM_VALIDACAO | CONFIRMADO | Score de confiança ≥ 60 + curadoria (ADR-028) | Mínimo: 2 submotores validaram |
| EM_VALIDACAO | DESCARTADO | Score de confiança cai abaixo de 20 ou evidência contrária forte | Registrar motivo do descarte |
| CONFIRMADO | CONSOLIDADO | Usado em 3+ decisões com resultado positivo | Feedback AJUDOU em ≥ 2 |
| CONFIRMADO | EM_VALIDACAO | Evidência contrária surge ou revalidação falha | Convicção não zera — apenas suspende |
| CONSOLIDADO | ARQUIVADO | Sem acesso ou uso em decisão por 90+ dias | Aplicar ADR-026 (esquecimento) |
| CONSOLIDADO | EM_VALIDACAO | Nova evidência contraditória | Revalidação completa |
| DESCARTADO | ARQUIVADO | Automático (após 30 dias do descarte) | Preservar motivo e evidências |
| ARQUIVADO | REATIVADO | Novo sinal relacionado ao conhecimento arquivado | Score de reativação mínimo: 40 |
| DESCARTADO | REATIVADO | Nova evidência que contradiz o motivo do descarte | Apenas por decisão explícita do empresário |

### Regras gerais da máquina de estados

1. **Imutabilidade de histórico:** o estado atual não apaga o histórico de estados anteriores.
2. **Transições inválidas são rejeitadas:** CONFIRMADO não volta a HIPOTESE diretamente — precisa passar por EM_VALIDACAO.
3. **Toda transição gera evento:** cada mudança de estado emite um evento com o novo estado e o motivo.
4. **Conhecimento só é CONFIRMADO com curadoria:** validação cruzada mínima de 2 submotores (ADR-028).
5. **Descarte não é deleção:** DESCARTADO e ARQUIVADO preservam todo o histórico para auditoria.

---

## REGRAS UNIVERSAIS

### Grupo 1: Origem e Criação

**R1. Conhecimento nunca nasce da IA.**
A IA é tradutora de contexto (ADR-017). Ela não cria, valida ou modifica conhecimento. Todo conhecimento tem origem em observações, hipóteses validadas ou ensino explícito do empresário.

**R2. Conhecimento nunca nasce de uma única observação.**
O mínimo para nascer uma hipótese é 3 observações em período ≤ 30 dias. Exceção: ensino explícito do empresário.

**R3. Toda observação corresponde a um ou mais fatos.**
Não existe observação sem fato correspondente. Observações órfãs (sem rastreabilidade para o fato que as originou) são inválidas.

**R4. Toda regra é rastreável ao conhecimento que a originou.**
Regras não existem no vácuo. Se não há conhecimento que justifique uma regra, a regra não deve existir.

### Grupo 2: Verdade e Causalidade

**R5. Correlação nunca implica causalidade.**
O Motor pode observar que A e B ocorrem juntos. O Motor nunca afirmará que A causa B sem evidência direta. Hipóteses causais devem ser explicitamente marcadas como tal.

**R6. Nenhuma decisão é tomada sem contexto.**
Contexto é pré-requisito (ADR-021). Contexto vazio = silêncio. O Decision Engine não decide sem contexto.

**R7. Toda recomendação deve apontar quais conhecimentos foram utilizados.**
Rastreabilidade não é opcional. Toda recomendação do Motor lista explicitamente os conhecimentos que a fundamentam.

### Grupo 3: Rastreabilidade e Confiança

**R8. Todo conhecimento possui rastreabilidade.**
É possível reconstruir a cadeia causal completa de qualquer conhecimento até os fatos que o originaram (ADR-027).

**R9. Todo conhecimento possui origem.**
INFERIDO (padrões detectados), EXPLICITO (ensino do empresário), ou VALIDACAO_TERCEIRO (validação externa).

**R10. Todo conhecimento possui confiança.**
Score 0-100. Conhecimento sem score de confiança não é conhecimento — é ruído.

**R11. Todo conhecimento possui convicção.**
Dias sem refutação × 0.5. Conhecimento sem convicção é conhecimento sem história.

**R12. Silêncio é melhor que inferência fraca.**
Se a confiança no conhecimento disponível é insuficiente (score < 50), o Motor não recomenda. Calar é melhor que enganar.

### Grupo 4: Ciclo de Vida

**R13. Todo conhecimento pode envelhecer.**
A confiança decai com o tempo sem revalidação. A velocidade de decaimento depende do tipo de conhecimento.

**R14. Todo conhecimento pode ser revalidado.**
Nenhum conhecimento está isento de revalidação periódica (ADR-026).

**R15. Nenhum conhecimento é eterno.**
Conhecimento não revalidado em N dias é arquivado. O arquivamento não é deleção, mas remove o conhecimento do contexto ativo.

**R16. Todo resultado gera potencial de aprendizado.**
Resultados não processados pelo Learning Engine são oportunidades perdidas. O sistema deve garantir que todo resultado seja analisado.

### Grupo 5: Decisão e Ação

**R17. A IA não decide.**
A IA comunica decisões tomadas pelo Motor. A IA não participa do ciclo de decisão (ADR-017).

**R18. O empresário sempre tem a última palavra.**
O Motor recomenda. O empresário decide. O Motor aprende com a decisão do empresário, mesmo quando diferente da recomendação.

**R19. Nenhuma decisão é executada sem consentimento explícito.**
A menos que seja uma regra configurada pelo empresário para ações automáticas.

**R20. Feedback é a única avaliação que altera scores automaticamente.**
Resultados alteram scores apenas através do Learning Engine. Resultado positivo não é autorização para auto-incremento de confiança.

### Grupo 6: Arquitetura Cognitiva

**R21. O Motor não personifica.**
O Motor não tem emoções, intuições ou preferências. Tudo que ele "diz" é resultado de processo determinístico.

**R22. O Motor não compete com o empresário.**
Se o empresário decide diferente da recomendação, o Motor aprende — não insiste.

**R23. Memória não é backup.**
Memória é hierárquica por relevância. Working Memory não persiste entre sessões. Archived não participa do contexto ativo.

**R24. Aprendizado não é download.**
Não existe transferência de conhecimento entre empresas sem curadoria. O que uma empresa aprende não é automaticamente conhecimento para outra.

---

## DIAGRAMA CONCEITUAL

```
                        ┌─────────────────────────────────────────────────────┐
                        │                    MUNDO REAL                       │
                        │  Fato ───▶ Evento ───▶ Resultado                    │
                        └──────────────────┬──────────────────────────────────┘
                                           │
                                           ▼
             ┌──────────────────────────────────────────────────────────┐
             │                      MOTOR COGNITIVO                     │
             │                                                          │
             │  ┌──────────────────────────────────────────────────────┐│
             │  │           Observação                                ││
             │  │           (Fato representado internamente)          ││
             │  └────────────────────┬───────────────────────────────-┘│
             │                       │                                  │
             │                       ▼                                  │
             │  ┌──────────────────────────────────────────────────────┐│
             │  │    [Sinal?] ──threshold──▶ Sinal ◀── Prioridade     ││
             │  │    Observação que se destaca                        ││
             │  └────────────────────┬───────────────────────────────-┘│
             │                       │                                  │
             │                       ▼                                  │
             │  ┌──────────────────────────────────────────────────────┐│
             │  │    [Padrão?] ──regularidade──▶ Padrão               ││
             │  │    Regularidade entre observações                   ││
             │  └────────────────────┬───────────────────────────────-┘│
             │                       │                                  │
             │                       ▼                                  │
             │  ┌──────────────────────────────────────────────────────┐│
             │  │    Hipótese ◀── Evidência ◀── Correlação            ││
             │  │    (explicação candidata)                           ││
             │  └────────────────────┬───────────────────────────────-┘│
             │                       │                                  │
             │         ┌─────────────┼──────────────┐                   │
             │         ▼             ▼              ▼                   │
             │    Confirmada    Em validação   Descartada               │
             │         │             │                                 │
             │         ▼             │                                 │
             │  ┌──────────────────┐ │                                 │
             │  │ Conhecimento     │ │                                 │
             │  │ - Confiança      │ │                                 │
             │  │ - Convicção      │ │                                 │
             │  │ - Origem         │ │                                 │
             │  └───────┬──────────┘ │                                 │
             │          │            │                                  │
             │          ▼            ▼                                  │
             │  ┌──────────────────────────────────────────────────────┐│
             │  │           Memória                                   ││
             │  │  Working  │  Short  │  Long  │  Archived            ││
             │  └────────────────────┬───────────────────────────────-┘│
             │                       │                                  │
             │                       ▼                                  │
             │  ┌──────────────────────────────────────────────────────┐│
             │  │           Contexto Cognitivo                        ││
             │  │  (pacote fechado e imutável)                        ││
             │  └────────────────────┬───────────────────────────────-┘│
             │                       │                                  │
             │          ┌────────────┼──────────────┐                   │
             │          ▼            ▼              ▼                   │
             │   Decision Engine    IA          Empresário              │
             │          │            │              │                   │
             │          ▼            ▼              ▼                   │
             │     Decisão       Tradução      Validação                │
             │          │                                               │
             └──────────┼───────────────────────────────────────────────┘
                        │
                        ▼
             ┌──────────────────────────────────────────────────────┐
             │                    EXECUÇÃO                          │
             │  Ação (via Action Engine)                            │
             │  ──▶ Resultado (mundo real)                          │
             │  ──▶ Feedback (empresário avalia)                    │
             └────────────────────┬─────────────────────────────────┘
                                 │
                                 ▼
             ┌──────────────────────────────────────────────────────┐
             │                 APRENDIZADO                          │
             │  Learning Engine:                                    │
             │  - Fortalece/enfraquece conhecimento                │
             │  - Cria/refuta hipóteses                             │
             │  - Gera Insight (conexão entre conhecimentos)        │
             │  - Condensa na memória                               │
             │                                                      │
             │  ↻ Novo ciclo ◀── Contexto ◀── Próxima decisão       │
             └──────────────────────────────────────────────────────┘

             ══════════════════════════════════════════════════════════
             PROPRIEDADE EMERGENTE:
             Sabedoria Empresarial = f(conhecimento, convicção,
                                       experiência, reconhecimento
                                       de padrões)
```

---

## GLOSSÁRIO OFICIAL

Este glossário é obrigatório para toda documentação futura. Nenhum documento pode usar uma palavra diferente para representar um conceito já definido. Nenhum documento pode usar a mesma palavra para representar um conceito diferente.

| Termo | Sinônimos proibidos | Notas |
|---|---|---|
| **Fato** | Dado bruto, ocorrência, registro objetivo | Não usar sinônimo. Fato é o termo oficial. |
| **Observação** | Fato registrado, dado normalizado, observável | Não confundir com "dado" (muito genérico). |
| **Evento** | Notificação, sinal, mensagem, ocorrência | É o termo mais polissêmico do sistema. Sempre especificar: "Evento de negócio", "Evento cognitivo", "Evento de barramento". |
| **Sinal** | Alerta, destaque, flag | Não usar "sinal" como sinônimo de "evento" (erro comum). Sinal é subconjunto de observação. |
| **Evidência** | Prova, indício, subsídio | Evidência é relação, não entidade. "Evidência a favor de" ou "evidência contra". |
| **Hipótese** | Suspeita, teoria, conjectura, crença | "CrencaDaIdentidade" (documentos antigos) deve ser substituído por "hipótese". |
| **Convicção** | Estabilidade, tempo sem refutação | Termo muito específico. Não confundir com "confiança". |
| **Conhecimento** | Saber, verdade, conhecimento validado | "ConhecimentoDaIdentidade" (documentos antigos) deve ser substituído por "Conhecimento". |
| **Aprendizado** | Ensinamento, descoberta, lição | Aprendizado é processo, não tipo de conhecimento. "Aprendizado explícito" vs "aprendizado inferido". |
| **Memória** | Histórico, timeline, arquivo | Não confundir "memória" com "log". Memória é hierárquica. |
| **Contexto** | Estado, retrato, visão geral | Sempre usar "Contexto Cognitivo" para o pacote fechado. "Bounded Context" é termo DDD. |
| **Decisão** | Recomendação, ação, escolha | "Decisão" é o termo do Motor. "Ação" é execução da decisão. |
| **Resultado** | Outcome, impacto, consequência | Termo oficial: "Resultado". O aggregate `Outcome` será renomeado. |
| **Feedback** | Avaliação, opinião, parecer | Não confundir com "resultado". Resultado é factual; feedback é avaliativo. |
| **Padrão** | Regularidade, tendência, recorrência | Padrão não é conhecimento. Padrão alimenta hipótese. |
| **Correlação** | Coincidência, associação, relação estatística | Nunca usar como sinônimo de "causalidade". |
| **Regra** | Invariante, política, condicional, trigger | Sempre especificar o tipo: "Regra de negócio", "Regra personalizada", "Regra derivada". |
| **Insight** | Percepção, revelação, descoberta | Não confundir com "recomendação". Insight é conexão entre conhecimentos. |
| **Sabedoria Empresarial** | Maturidade, expertise, know-how | Propriedade emergente. Não implementar como agregado. |

### Termos deprecados e suas substituições

| Termo deprecado | Substituir por | Motivo |
|---|---|---|
| sinal-{categoria} | EventoDeNegocio: {NomeSemantico} | ADR-012 |
| HistoricoSinal | LogDeEventos (infraestrutura) | ADR-001 + ADR-011 |
| EventoAtivacao | MarcoDeJornada | Não é evento cognitivo |
| CrencaDaIdentidade | Hipotese (dentro do PatrimonioCognitivo) | Duplicata conceitual |
| ConhecimentoDaIdentidade | Conhecimento (dentro do PatrimonioCognitivo) | Duplicata conceitual |
| Outcome | Resultado | Português |
| AcaoCognitiva | Decisao | Maior clareza |
| AprendizadoItem | Aprendizado | Sem subdivisão necessária |
| KnowledgeContext | ContextoDeConhecimento (bounded context) | Português |
| FeedbackContext | ContextoDeFeedback (bounded context) | Português |
| DecisionContext | ContextoDeDecisao (bounded context) | Português |
| Evidencia (agregado) | EvidenciaDeHipotese (relação, não tabela) | ADR-010 |

---

## AUDITORIA DE CONCEITOS EM DOCUMENTOS EXISTENTES

Esta seção relaciona os conflitos, duplicatas e imprecisões conceituais encontradas nos documentos existentes à luz desta Ontologia.

**Nenhum documento foi alterado.** Este relatório serve como guia para correções futuras.

### Conflitos críticos

| # | Documento | Problema | Severidade | Correção necessária |
|---|---|---|---|---|
| C1 | ARCHITECTURE_DDD.md §1 | `SignalContext` e `ActivationContext` listados como bounded contexts | Crítica | Remover como BCs formais (ADR-009) |
| C2 | ARCHITECTURE_DDD.md §4 | 9/22 eventos são CRUD, não fatos de negócio | Crítica | Renomear conforme ADR-012 |
| C3 | ARCHITECTURE_DDD.md §3 | `Evidencia`, `Hipotese`, `ConhecimentoValidado`, `MemoriaCognitiva` como agregados separados | Crítica | Unificar em `PatrimonioCognitivo` (ADR-010) |
| C4 | ARCHITECTURE_DDD.md §2 | `ConhecimentoDaIdentidade` e `CrencaDaIdentidade` duplicam `Conhecimento` e `Hipotese` | Crítica | Substituir por referências ao agregado unificado |

### Conflitos altos

| # | Documento | Problema | Severidade | Correção necessária |
|---|---|---|---|---|
| C5 | ARCHITECTURE_DDD.md + MOTOR_COGNITIVO.md | Catálogos de eventos divergentes (22 vs 12 eventos, nomenclatura diferente) | Alta | Unificar conforme ADR-012 |
| C6 | MOTOR_COGNITIVO.md + ARCHITECTURE_DDD.md | Ciclo cognitivo documentado em 2 versões diferentes (4 estágios vs 8+ estágios) | Alta | Alinhar com esta Ontologia |
| C7 | MOTOR_COGNITIVO.md §10 | Hierarquia de memória definida, mas código não implementa (todo conhecimento no mesmo nível) | Alta | Implementar ADR-019 |
| C8 | ADR-020 | Algoritmo de priorização não inclui convicção, mas MOTOR_COGNITIVO.md diz que sim | Alta | Revisar ADR-020 |

### Conflitos médios

| # | Documento | Problema | Severidade | Correção necessária |
|---|---|---|---|---|
| C9 | ARCHITECTURE_DDD.md §7 | 63% dos invariantes (R04, R07-R16, R19) são técnicos, não de domínio | Média | Separar invariantes de domínio de regras técnicas |
| C10 | ADR-001 | "Sinal" usado como sinônimo de "Domain Event" — contradiz esta Ontologia (sinal ≠ evento) | Média | ADR-001 mantém decisão de congelamento, mas terminologia deve ser atualizada |
| C11 | ARCHITECTURE_DDD.md | "Insight" não tem definição formal nem representação | Média | Incorporar definição desta Ontologia |
| C12 | ARCHITECTURE_DDD.md | "FeedbackAcao" como aggregate independente — deveria ser VO de Decisão | Média | Refatorar na Fase 5 |

### Conceitos ausentes

| # | Conceito | Onde deveria estar | Impacto |
|---|---|---|---|
| A1 | **Correlação** | ARCHITECTURE_DDD.md, MOTOR_COGNITIVO.md | Ausência total. Conceito existe apenas como princípio. |
| A2 | **Padrão** | ARCHITECTURE_DDD.md (agregados) | Mencionado mas sem representação formal. |
| A3 | **Insight** | ARCHITECTURE_DDD.md (tipo de conhecimento) | Não modelado como conceito. |
| A4 | **Sabedoria Empresarial** | — | Propriedade emergente — não deve ser modelada, mas deve ser documentada. |
| A5 | **Convicção** | Schema Prisma, agregado ConhecimentoValidado | Não existe campo nem fórmula implementada. |

---

## ADRs NECESSÁRIAS

Com base nesta Ontologia, as seguintes ADRs são necessárias para resolver conflitos ou implementar conceitos ainda não representados:

### ADR-029: Renomear aggregates para português

**Motivo:** O glossário oficial depreca termos em inglês (`Outcome` → `Resultado`, `FeedbackAcao` → `Feedback`, `AcaoCognitiva` → `Decisao`, `KnowledgeContext` → `ContextoDeConhecimento`).

**Impacto:** Renomeação de agregados, modelos Prisma e referências no código.

### ADR-030: Eliminar CrencaDaIdentidade e ConhecimentoDaIdentidade

**Motivo:** Duplicata conceitual com `Hipotese` e `Conhecimento` (C4 da auditoria). Os campos JSON em `IdentidadeDigital` devem ser substituídos por referências ao agregado `PatrimonioCognitivo` (ADR-010).

**Impacto:** Migração de dados dos campos JSON para o agregado unificado.

### ADR-031: Formalizar Padrão e Correlação como conceitos do sistema

**Motivo:** Ambos existem como ideias mas não têm representação formal. Sua ausência permitirá que o sistema trate padrões como hipóteses e correlações como causalidade.

**Impacto:** Novo tipo de evento (`PadraoDetectado`, `CorrelacaoObservada`), novos processadores no Signal Engine, distinção explícita entre hipótese causal e correlação.

### ADR-032: Incluir convicção no algoritmo de priorização

**Motivo:** C8 da auditoria: ADR-020 não inclui convicção, mas MOTOR_COGNITIVO.md determina que sim. Revisar a fórmula de priorização para:

```
Prioridade = urgencia × impacto × confianca × conviccao × alinhamento × momento
```

**Impacto:** Revisão do Priority Engine e da ADR-020.

### ADR-033: Separar invariantes de domínio de regras técnicas

**Motivo:** C9 da auditoria: 63% dos invariantes em ARCHITECTURE_DDD.md são técnicos (validação de input, constraints de banco). Devem ser movidos para `CODE_PATTERNS.md` ou `ENGINEERING_GUIDELINES.md`.

**Impacto:** Revisão de ARCHITECTURE_DDD.md seção 7. Nenhuma mudança de código.

### ADR-034: Estabelecer política de correlação vs causalidade

**Motivo:** Princípio 2 do Motor Cognitivo e Regra Universal R5 exigem que o sistema nunca trate correlação como causalidade. É necessário um mecanismo explícito de marcação: toda hipótese causal deve declarar sua evidência causal, e hipóteses puramente correlacionais devem ser marcadas como tal.

**Impacto:** Campo `tipoCausalidade` (CORRELACIONAL | CAUSAL) no ciclo de vida da hipótese.

---

## Colofão

Este documento define a ontologia cognitiva da Ponte Digital.

Ele descreve:
- **O que existe** (19 conceitos fundamentais).
- **O que cada conceito significa** (definição formal em 10 dimensões).
- **Como os conceitos se relacionam** (diagrama conceitual completo).
- **Como o conhecimento evolui** (mapa de evolução, máquina de estados).
- **O que é sempre verdade** (24 regras universais).
- **O que cada termo significa** (glossário oficial com termos deprecados).
- **Onde os documentos existentes conflitam** (auditoria com 12 conflitos + 5 ausências).
- **O que precisa ser decidido** (6 ADRs propostas).

Não há uma linha de código aqui. Não há uma tabela de banco. Não há uma rota de API.

Este documento é a **teoria do conhecimento da Ponte Digital**. Ela deve permanecer válida pelos próximos 10 anos. Nenhum documento futuro pode redefinir estes conceitos sem uma nova versão deste documento, aprovada pelo fundador e registrada em ADR.

**A Constituição precede tudo. Esta Ontologia precede o Motor Cognitivo, que precede o DDD, que precede a Implementação.**

*Nenhuma linha de código foi escrita ou alterada para produzir este documento.*
