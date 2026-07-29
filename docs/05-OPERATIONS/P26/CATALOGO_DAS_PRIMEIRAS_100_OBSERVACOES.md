# CATÁLOGO DAS PRIMEIRAS 100 OBSERVAÇÕES

## Modelo para registro das primeiras cem observações reais da Empresa Zero

**Programa 26 | Validação Contínua | Julho de 2026 | Versão 1.0**

> Este catálogo é o coração da Era da Observação. Cada uma das primeiras 100
> observações registradas aqui é um tijolo na base de evidência da Ponte Digital.
> Nenhuma observação é pequena demais. Nenhuma é óbvia demais.
> As observações são os dados primários de tudo o que construiremos.

---

## Instruções de preenchimento

### Regras gerais

1. **Uma observação por formulário.** Se dois eventos distintos aconteceram, são duas observações (OBS-001 e OBS-002).

2. **Preencher em até 15 minutos após a observação.** Após esse prazo, a confiabilidade cai.

3. **O campo "Fato observado" é o mais importante.** Deve conter apenas o que qualquer câmera registraria. Se uma palavra for interpretativa, a observação inteira perde validade.

4. **Interpretação é opcional mas incentivada.** Desde que claramente identificada como interpretação.

5. **Confiança é autoavaliação.** 10 = "tenho absoluta certeza do que vi, qualquer outra pessoa teria o mesmo registro". 0 = "não tenho certeza do que vi".

6. **Uma observação pode não ter hipótese relacionada.** Nem toda observação se conecta a uma hipótese existente. Isso é normal e desejável — significa que estamos descobrindo o que não sabíamos que existia.

7. **OBS-001 a OBS-100 são as primeiras 100.** Se o catálogo atingir 100, inicia-se um novo volume (OBS-101 em diante).

### Hierarquia de preenchimento

| Campo | Obrigatório? | Criticidade |
|---|---|---|
| ID | Sim | Automático (sequencial) |
| Data | Sim | Essencial para correlação temporal |
| Hora | Sim | Essencial para correlação contextual |
| Contexto | Sim | Sem contexto, a observação não pode ser interpretada |
| Categoria | Sim | Determina roteiro de análise |
| Fato observado | **SIM** | É a própria observação |
| Interpretação | Recomendado | Valor agregado pelo observador |
| Impacto estimado | Sim | Prioriza investigação |
| Confiança | Sim | Pondera a observação na validação |
| Registrado por | Sim | Rastreabilidade |

### Como atribuir categoria e subcategoria

Ver Sistema de Categorias (Seção abaixo). Escolher a categoria principal e a subcategoria que melhor descrevem o fato observado. Se houver dúvida entre duas categorias, escolher a que descreve o fenômeno, não a que descreve sua causa presumida.

---

## Template oficial de observação

```
OBS-[XXX]

Data: [dd/mm/aaaa]
Hora: [hh:mm]
Contexto: [o que estava acontecendo — fluxo, tela, interação, condição]
Categoria: [categoria principal / subcategoria]

Fato observado:
[Apenas o que foi percebido, mensurado ou capturado. Zero interpretação.
Descrição objetiva, como se fosse uma gravação literal.]

Interpretação:
[O que o observador acha que significa. Hipótese causal. Claramente
identificado como interpretação.]

Impacto estimado: [baixo / médio / alto]
Tempo de observação: [minutos]
Confiança na observação: [0-10]
Hipótese relacionada: [H-XXX se houver]
RFC futura: [potencial, ainda não iniciada — descrever se aplicável]
Registrado por: [nome do observador]

Aprendizado inicial:
[O que esta observação já nos ensina, mesmo sem validação formal.
Pode ser uma intuição, um alerta, uma confirmação surpreendente.]

─── (fim da observação) ───
```

---

## Sistema de categorias com subcategorias

### Categoria 1 — OPERACIONAL

Processos internos de operação da plataforma e da empresa.

| Subcategoria | Descrição | Exemplo de fato observado |
|---|---|---|
| 1.1 Fluxo de uso | Como o usuário navega, avança, retrocede | "Usuário clicou em voltar duas vezes antes de responder" |
| 1.2 Performance | Tempos de carregamento, resposta, latência | "Tela demorou 8s para renderizar após o clique" |
| 1.3 Erro/falha | Bugs, mensagens de erro, quebras de fluxo | "Mensagem 'Erro inesperado' apareceu ao salvar" |
| 1.4 Configuração | Setup, instalação, onboarding, ajustes | "Usuário precisou de 3 tentativas para configurar a conta" |
| 1.5 Integração | Conexão com outros sistemas, importação/exportação | "Importação de CSV falhou na 5ª linha" |

### Categoria 2 — COGNITIVO

Como o Motor Cognitivo processa, raciocina e produz resultados.

| Subcategoria | Descrição | Exemplo |
|---|---|---|
| 2.1 Qualidade do insight | Precisão, relevância, profundidade dos insights gerados | "Insight sugeriu causa incorreta para queda de vendas" |
| 2.2 Comportamento da IA | Como a IA se comporta — tom, timing, assertividade | "IA respondeu com tom excessivamente formal após 30 min de conversa informal" |
| 2.3 Diagnóstico | Precisão e completude do diagnóstico | "Diagnóstico deixou de identificar área crítica de RH" |
| 2.4 Recomendação | Qualidade e acionabilidade das recomendações | "Recomendação 'aumente sua margem' sem instrução de como fazer" |
| 2.5 Descoberta | Insight não esperado que surpreendeu o observador | "IA identificou padrão que o time nunca tinha notado" |

### Categoria 3 — PRODUTO

Funcionalidades, interface, componentes.

| Subcategoria | Descrição | Exemplo |
|---|---|---|
| 3.1 Funcionalidade | Comportamento esperado vs real de uma feature | "Botão de exportar PDF não gerou o arquivo" |
| 3.2 Navegação | Menu, links, fluxo entre telas | "Usuário não encontrou o histórico de sessões" |
| 3.3 Conteúdo | Textos, mensagens, ajuda, documentos | "Texto do tooltip foi considerado confuso pelo usuário" |
| 3.4 Visual | Design, layout, cores, tipografia | "Gráfico de pizza com 12 cores indistinguíveis" |
| 3.5 Mapa Cognitivo | Comportamento do mapa, nós, conexões | "Nó 'Financeiro' não apareceu no mapa mesmo após responder perguntas financeiras" |

### Categoria 4 — CLIENTE

Comportamento, reação, feedback do empresário (usuário).

| Subcategoria | Descrição | Exemplo |
|---|---|---|
| 4.1 Reação emocional | Expressão de emoção durante o uso | "Usuário sorriu ao ver o insight sobre margem" |
| 4.2 Abandono | Desistência em qualquer ponto do fluxo | "Usuário fechou o navegador na 3ª pergunta sem aviso" |
| 4.3 Retorno | Volta para nova sessão | "Usuário retornou após 3 dias e iniciou nova sessão" |
| 4.4 Feedback explícito | Comentários, avaliações, sugestões | "Usuário disse: 'Isso não é útil para mim'" |
| 4.5 Comportamento inesperado | Ação que surpreendeu o observador | "Usuário copiou o insight e colou no WhatsApp" |

### Categoria 5 — EQUIPE

Comportamento, processo e interação do time Ponte Digital (Empresa Zero).

| Subcategoria | Descrição | Exemplo |
|---|---|---|
| 5.1 Uso interno | Como o time usa a plataforma | "Time agendou sessão mas ninguém compareceu" |
| 5.2 Decisão | Como o time decide baseado nos dados | "Após insight, time mudou prioridade do backlog" |
| 5.3 Processo | Fluxo de trabalho, rituais, cerimônias | "Sessão de diagnóstico semanal foi cancelada por falta de preparo" |
| 5.4 Resistência | Relutância em usar ou confiar | "Membro do time disse: 'Esses dados não refletem nossa realidade'" |
| 5.5 Descoberta interna | Aprendizado do time sobre si mesmo | "Time descobriu que gastava 40% do tempo em reunião" |

### Categoria 6 — ARQUITETURA

Estrutura técnica, banco de dados, APIs, segurança.

| Subcategoria | Descrição | Exemplo |
|---|---|---|
| 6.1 Dados | Qualidade, consistência, integridade dos dados | "Campo 'faturamento' vazio em 30% dos registros" |
| 6.2 Multi-tenancy | Isolamento entre empresas, contexto de tenant | "Insight de uma empresa apareceu no dashboard de outra" |
| 6.3 Performance técnica | Banco, API, infraestrutura | "Query de dashboard levou 45s para executar" |
| 6.4 Segurança | Permissões, autenticação, exposição | "Usuário sem permissão conseguiu acessar rota admin" |
| 6.5 API/Integração | Contratos, versões, compatibilidade | "API retornou campo inesperado que quebrou o frontend" |

### Categoria 7 — EXPERIÊNCIA

Experiência percebida pelo usuário (UX, tom, confiança).

| Subcategoria | Descrição | Exemplo |
|---|---|---|
| 7.1 Confiança | Percepção de confiabilidade do sistema | "Usuário questionou em voz alta se o dado estava correto" |
| 7.2 Clareza | Entendimento do que está acontecendo | "Usuário perguntou: 'O que esse gráfico significa?'" |
| 7.3 Engajamento | Nível de envolvimento com a interação | "Usuário respondeu perguntas sem pausa por 15 minutos" |
| 7.4 Frustração | Momentos de irritação, confusão | "Usuário bateu a mão na mesa após erro no salvamento" |
| 7.5 Delight | Momentos de encantamento | "Usuário chamou colegas para mostrar o insight recebido" |

---

## 5 exemplos preenchidos de observações prováveis nos primeiros dias

### Exemplo 1 — Primeiro contato do time com o diagnóstico

```
OBS-001

Data: 28/07/2026
Hora: 10:15
Contexto: Primeira sessão de diagnóstico da Empresa Zero. Time completo (5 pessoas)
presentes. Sessão conduzida pelo Arquiteto de Produto.
Categoria: cliente / comportamento inesperado

Fato observado:
Ao receber a primeira pergunta do diagnóstico ("Qual o nome da sua empresa?"),
o time inteiro riu. Um membro disse: "A gente já sabe o nome da própria empresa,
né?" Três membros responderam a pergunta ao mesmo tempo em voz alta com
respostas diferentes (Ponte Digital, Ponte, Empresa Zero). Levaram 45 segundos
para concordar em uma resposta e digitar.

Interpretação:
O time teve dificuldade de responder uma pergunta aparentemente simples. O riso
pode indicar que a pergunta pareceu trivial para eles. A divergência de respostas
sugere que nem o time tem clareza sobre a identidade da própria empresa.

Impacto estimado: médio
Tempo de observação: 2 min
Confiança na observação: 9
Hipótese relacionada: H-008 (Primeira pergunta define o tom)
RFC futura: potencial — revisar onboarding para empresas que já se conhecem
Registrado por: Arquiteto de Observação

Aprendizado inicial:
Empresas que já têm identidade clara podem achar perguntas básicas pouco úteis.
O riso foi um sinal de alerta.
```

### Exemplo 2 — Insight gerando reação emocional

```
OBS-002

Data: 28/07/2026
Hora: 10:47
Contexto: Primeira sessão de diagnóstico, momento do primeiro insight gerado.
Membro da equipe respondeu sobre "maior dificuldade atual" (gargalo de priorização).
Categoria: cliente / reação emocional

Fato observado:
O insight apareceu: "Sua equipe parece concentrar esforços em múltiplas frentes
simultaneamente, o que pode diluir o impacto de cada ação." O membro que havia
respondido a pergunta arregalou os olhos, inclinou o corpo para frente na cadeira,
apontou para a tela e disse: "É exatamente isso. Como você sabe?" Olhou para os
outros membros do time. Três segundos de silêncio.

Interpretação:
O insight gerou reconhecimento imediato. A reação (olhos arregalados, inclinação,
apontar) sugere surpresa com a precisão. O "Como você sabe?" pode indicar que
o membro sentiu que a IA "entendeu" a situação, o que pode aumentar a confiança
no sistema. O silêncio subsequente pode ser processamento (digerindo a precisão).

Impacto estimado: alto
Tempo de observação: 1 min
Confiança na observação: 10
Hipótese relacionada: H-001 (Confiança na IA que admite incerteza)
RFC futura: potencial — estudar momento de impacto emocional em insights
Registrado por: Arquiteto de Observação

Aprendizado inicial:
Um insight preciso gera reação emocional forte. A confiança parece aumentar
instantaneamente quando o acerto é percebido como "profundo".
```

### Exemplo 3 — Abandono durante espera de processamento

```
OBS-003

Data: 29/07/2026
Hora: 14:22
Contexto: Segunda sessão de diagnóstico. Após responder 5 perguntas, o sistema
entrou em processamento para gerar o resumo parcial. Timer de loading apareceu.
Categoria: cliente / abandono

Fato observado:
O timer de loading apareceu com a mensagem "Analisando suas respostas..."
Após 8 segundos, o membro da equipe (único nesta sessão) suspirou audivelmente,
moveu o cursor para a borda direita da tela, abriu o Slack em outro monitor,
respondeu uma mensagem, voltou para a tela da Ponte após 35 segundos.
O processamento já havia terminado (havia terminado aos 12 segundos).
O membro disse: "Já terminou? Nem vi."

Interpretação:
A espera real foi de 12s, mas o membro se distraiu aos 8s e só voltou aos 47s (35s
após o término). A distração para outra ferramenta sugere que a espera (mesmo curta)
foi suficiente para quebrar o estado de imersão. O fato de ele ter dito "Nem vi" pode
indicar que não se importou em perder o momento do término ou não percebeu
a notificação de conclusão.

Impacto estimado: alto
Tempo de observação: 1 min
Confiança na observação: 9
Hipótese relacionada: H-005 (Loading inteligente reduz abandono)
RFC futura: potencial — notificação mais evidente de conclusão de processamento
Registrado por: Arquiteto de Observação

Aprendizado inicial:
Esperas acima de 8s quebram a imersão. Não basta o processamento terminar rápido —
é preciso que o usuário perceba o término.
```

### Exemplo 4 — Time discorda do diagnóstico

```
OBS-004

Data: 29/07/2026
Hora: 15:30
Contexto: Reunião do time para revisar o primeiro diagnóstico completo da Empresa Zero.
Categoria: equipe / resistência

Fato observado:
O diagnóstico apontou "Concentração excessiva de decisões no fundador" como
o principal gargalo. O fundador (presente na reunião) franziu a testa, cruzou os
braços e disse: "Isso não é bem verdade. Eu só decido porque o time não decide."
Silêncio de 5 segundos. Um membro do time olhou para baixo. Outro membro disse
baixinho: "Talvez a gente não decida porque você sempre decide." A tensão no ar
era perceptível. A reunião mudou de assunto 2 minutos depois.

Interpretação:
O diagnóstico tocou em um ponto sensível. A reação do fundador (defensiva) e a
resposta do time (baixinho, olhando para baixo) sugerem que o diagnóstico está
correto — e que é um tema delicado internamente. A mudança de assunto rápida
indica que o time não está pronto para discutir esse gargalo abertamente.

Impacto estimado: alto
Tempo de observação: 3 min
Confiança na observação: 10
Hipótese relacionada: H-001 (Confiança na IA que admite incerteza), H-013
RFC futura: potencial — como a plataforma deve lidar com diagnósticos sensíveis
Registrado por: Arquiteto de Observação

Aprendizado inicial:
A Ponte Digital pode gerar diagnósticos precisos que a equipe não está pronta para
ouvir. A precisão do insight não garante sua aceitação. É preciso preparar o terreno
para diagnósticos difíceis.
```

### Exemplo 5 — Descoberta inesperada no uso do mapa

```
OBS-005

Data: 30/07/2026
Hora: 11:05
Contexto: Sessão livre — membro da equipe navegando pelo mapa cognitivo sem
objetivo definido, apenas explorando. Nenhuma tarefa foi atribuída.
Categoria: produto / mapa cognitivo

Fato observado:
O membro clicou em cada nó do mapa sequencialmente, da esquerda para a direita.
Ao clicar no nó "Operações", um subnó "Reuniões" apareceu. O membro disse:
"Ah, então o sistema acha que reunião é operação?" Clicou no subnó e viu os
insights associados. Depois disse: "Legal, mas reunião pra gente não é operação,
é planejamento." Não clicou em mais nada. Fechou o mapa após 25 segundos.

Interpretação:
O membro explorou o mapa mas discordou da categorização do sistema. A expressão
"então o sistema acha" sugere que ele está avaliando criticamente o modelo mental
da IA, não apenas consumindo passivamente. O fechamento rápido (25s) pode indicar
que, após ver algo que discorda, o interesse cai.

Impacto estimado: médio
Tempo de observação: 1 min
Confiança na observação: 8
Hipótese relacionada: H-002 (Mapa Cognitivo Vivo aumenta engajamento)
RFC futura: potencial — permitir que usuário ajuste categorização do mapa
Registrado por: Arquiteto de Observação

Aprendizado inicial:
O mapa será avaliado criticamente, não consumido passivamente. A categorização
precisa fazer sentido para o usuário, não apenas para o modelo de domínio.
```

---

## Como as observações se conectam com as 22 hipóteses do P25

Cada observação pode fortalecer ou enfraquecer uma ou mais hipóteses. Abaixo o mapeamento de como as categorias de observação se relacionam com as hipóteses.

### Matriz de conexão

| Hipótese | Categoria(s) de observação mais prováveis | O que procurar |
|---|---|---|
| H-001 — Confiança na incerteza | cliente, experiência | Reação a insights com e sem indicação de confiança |
| H-002 — Mapa Cognitivo Vivo | produto (mapa), cliente | Tempo no mapa, cliques, reações emocionais |
| H-003 — 5 perguntas ideal | cliente, operacional | Abandono por número de perguntas, feedback |
| H-004 — Timing proporcional | experiência, operacional | Reação a tempos de resposta variáveis |
| H-005 — Loading inteligente | operacional, cliente | Abandono durante espera, reação ao loading |
| H-006 — Notificação de insight | cliente, equipe | Retorno após notificação, reação à notificação |
| H-007 — Digitar vs selecionar | cliente, operacional | Preferência por tipo de resposta, tempo de digitação |
| H-008 — Primeira pergunta | cliente, experiência | Reação à primeira pergunta, abandono precoce |
| H-009 — Proporção 40:60 | experiência, cognitivo | Percepção de quanto a IA fala |
| H-010 — Dados percentuais | cliente, experiência | Confiança reportada em insights numéricos vs textuais |
| H-011 — Gamificação cognitiva | cliente, experiência | Engajamento com/ sem indicadores de progresso |
| H-012 — Insight em tempo real | cliente, cognitivo | Retorno, reação a insight durante vs no final |
| H-013 — Compartilhar após valor | cliente, equipe | Profundidade de resposta após primeiro insight valioso |
| H-014 — Tom formal → informal | experiência, cliente | Reação à mudança de tom durante a sessão |
| H-015 — 3 tópicos principais | cliente, cognitivo | Recall de tópicos, satisfação com resumo |
| H-016 — Indicador visível | experiência, produto | Atenção ao indicador de confiança |
| H-017 — Perfis analítico/intuitivo | cliente, equipe | Diferença de comportamento entre perfis |
| H-018 — Botão continuar | operacional, cliente | Uso do botão, abandono durante espera |
| H-019 — Silêncio produtivo | experiência, cliente | Profundidade de resposta com pausas |
| H-020 — Diagnóstico completo | cliente, equipe | Retorno após completar diagnóstico |
| H-021 — Microcelebrações | experiência, cliente | Reação a celebrações, engajamento |
| H-022 — Som como inteligência viva | experiência, cliente | Reação a som, percepção de "vida" do sistema |

### Regra de conexão

1. Uma observação pode se conectar a múltiplas hipóteses
2. Uma observação não precisa se conectar a nenhuma hipótese — descobertas fora do mapa de hipóteses são igualmente valiosas
3. Observações que contradizem uma hipótese são tão importantes quanto as que confirmam
4. A conexão é registrada no campo "Hipótese relacionada" com o ID da hipótese (H-XXX)

### Observações sem hipótese correspondente

Se uma observação não se conecta a nenhuma hipótese existente, isso pode significar:

1. **Nova hipótese não identificada** — a observação revela algo que não estava no radar
2. **Anomalia isolada** — evento único que não justifica hipótese própria
3. **Ruído** — dado sem significado aparente (pode ser arquivado)

O número de observações sem hipótese é um indicador de saúde do sistema de observação. Muitas observações sem hipótese = estamos descobrindo coisas novas (bom). Muitas observações com hipótese sempre confirmada = estamos vendo só o que queremos ver (ruim).

---

## Abertura do catálogo

O Catálogo das Primeiras 100 Observações está oficialmente aberto em 26/07/2026.

A primeira observação (OBS-001) deve ser registrada na primeira sessão real da Empresa Zero.

O catálogo será considerado completo quando OBS-100 for registrada. Nesse momento, inicia-se o volume 2 (OBS-101 em diante), com eventuais ajustes de template baseados no aprendizado do volume 1.

---

*Documento editável — o template pode ser ajustado conforme o aprendizado das primeiras observações.*
*Toda alteração no template deve ser registrada como observação (OBS-XXX).*
*Ponte Digital — Empresa Zero — Catálogo de Observações.*
