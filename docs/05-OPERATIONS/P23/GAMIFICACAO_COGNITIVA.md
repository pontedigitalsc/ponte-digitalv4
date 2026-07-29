# GAMIFICACAO_COGNITIVA.md — Fase 10: Arquitetura de Gamificação Cognitiva

**Propósito:** Criar um sistema de gamificação que representa APRENDIZADO, não pontos aleatórios. O empresário nunca ganha "pontos por fazer login". Ele ganha reconhecimento por construir conhecimento.

**Princípio fundamental:** Gamificação não é sobre motivar o empresário a usar a plataforma. É sobre mostrar o valor do que foi construído. O jogo já existe — é o negócio dele. A Ponte Digital apenas revela o placar.

**O que NÃO é gamificação cognitiva:**
- Badges por login diário
- Ranking de quem respondeu mais perguntas
- Pontos por clicar em botões
- Nível por tempo gasto na plataforma

**O que É gamificação cognitiva:**
- Reconhecimento de que o empresário conhece bem o próprio negócio
- Clareza sobre o que já foi mapeado e o que falta
- Sensação de progresso real no entendimento da empresa
- Valor acumulado que permanece mesmo sem uso da plataforma

---

## 1. NÍVEL DE CONHECIMENTO

**Nome exato:** Nível de Conhecimento (Knowledge Level)

**Fórmula conceitual:**
```
Nível = floor(coberturaCognitiva / 10) + 1
```
Onde:
- `coberturaCognitiva` = % de áreas do modelo ontológico com conhecimento validado (confiança ≥ 60)
- Nível mínimo: 1 (0% de cobertura)
- Nível máximo: 10 (100% de cobertura)
- Cada nível exige progressão em todas as áreas, não apenas em uma

**Representação visual:**
Barra horizontal graduada com 10 segmentos. Cada segmento completo ganha cor (gradiente do azul claro ao dourado). O nível atual aparece como número dentro de um hexágono (símbolo de conhecimento, não de estrela ou troféu). Ao lado: label textual "Nível [X] — [título do nível]".

Títulos dos níveis:
1. Explorador — "começando a mapear"
2. Observador — "primeiros padrões identificados"
3. Aprendiz — "conhecimento começando a se formar"
4. Analista — "visão estrutural da empresa"
5. Conhecedor — "mais da metade mapeado"
6. Estrategista — "visão integrada do negócio"
7. Sábio — "conhecimento profundo e validado"
8. Mestre — "domínio do diagnóstico completo"
9. Visionário — "conhecimento quase total"
10. Empresa Descoberta — "conhecimento completo"

**Comportamento:**
- Aumenta quando uma nova área atinge conhecimento validado (confiança ≥ 60)
- Nunca diminui (conhecimento validado não retrocede de nível, apenas é arquivado)
- A progressão é mais rápida nos níveis iniciais (1→3) e mais lenta nos finais (7→10)
- Cada novo nível dispara um momento WOW (ver SISTEMA_DE_VALOR.md)

**Posição na tela:**
Topo do painel cognitivo (Knowledge Vault + Dashboard). Fixo no canto superior esquerdo do grupo "Inteligência". Visível em todas as telas cognitivas, oculto nas telas operacionais (CRM, Financeiro).

**Texto de apoio:**
"Nível [X] — [título]. Você já mapeou [Y]% da sua empresa."

**Quando mostrar / quando esconder:**
- Mostrar: sempre que o empresário estiver em telas de inteligência (Knowledge Vault, Aprendizados, Diagnóstico)
- Esconder: telas operacionais (CRM, Financeiro, Tarefas) — a menos que o empresário clique para ver
- Mostrar também no primeiro login de cada semana (resumo de progresso)

**Relação com outros indicadores:**
- Diretamente proporcional à Cobertura Cognitiva
- Diretamente proporcional ao Patrimônio Construído
- Inversamente proporcional às Lacunas
- Indicador de longo prazo (muda em dias/semanas, não em minutos)

---

## 2. ÍNDICE DE CLAREZA

**Nome exato:** Índice de Clareza (Clarity Index)

**Fórmula conceitual:**
```
Clareza = (conhecimentosAtivos * 0.4) + (confiancaMedia * 0.3) + (areasCompletas * 0.3)
```
Onde:
- `conhecimentosAtivos` = % de conhecimento ativo em relação ao máximo esperado para o porte da empresa
- `confiancaMedia` = média aritmética da confiança de todos os conhecimentos validados
- `areasCompletas` = % de áreas ontológicas com pelo menos 1 conhecimento validado

**Representação visual:**
Círculo concêntrico (anel) que se preenche no sentido horário. Cor gradient: tons de amarelo (baixo) → verde (médio) → azul (alto). No centro do círculo: número percentual. Abaixo: texto "de clareza".

**Comportamento:**
- Aumenta gradualmente com cada novo conhecimento validado
- Aumenta mais quando o conhecimento é em área não mapeada antes
- Pode diminuir se a confiança média cair (conhecimentos antigos perdem confiança)
- Atualizado a cada ciclo noturno de consolidação

**Posição na tela:**
Ao lado do Nível de Conhecimento, no topo do painel cognitivo. Par visual: nível (esquerda, hexágono) e clareza (direita, círculo).

**Texto de apoio:**
"Índice de Clareza: [X]% — [frase contextual]."

Frases contextuais:
- 0-20%: "Ainda estamos no começo."
- 20-40%: "O panorama começa a ficar mais nítido."
- 40-60%: "Já temos uma visão razoável da empresa."
- 60-80%: "O conhecimento está consolidado."
- 80-100%: "Sua empresa está quase totalmente mapeada."

**Quando mostrar / quando esconder:**
- Sempre visível junto com o Nível de Conhecimento
- Destacar na primeira vez que atinge 50% (momento WOW)
- Destacar na primeira vez que atinge 80%

**Relação com outros indicadores:**
- Correlacionado positivamente com Confiança Atual
- Correlacionado positivamente com Patrimônio Construído
- Inversamente correlacionado com Perguntas Restantes
- Clareza alta + confiança baixa = conhecimento raso (sinal de alerta)

---

## 3. EMPRESA DESCOBERTA

**Nome exato:** Empresa Descoberta (Discovered Business)

**Fórmula conceitual:**
```
EmpresaDescoberta = coberturaCognitiva * fatorProfundidade
```
Onde:
- `coberturaCognitiva` = % de células do modelo ontológico preenchidas com conhecimento validado
- `fatorProfundidade` = média de conhecimento por área (quantos conhecimentos por área)
- Resultado normalizado para 0-100%

**Representação visual:**
Silhueta estilizada de uma empresa (prédio/escritório) que se ilumina gradualmente. Cada área iluminada representa um conhecimento validado. Quanto mais áreas acesas, mais completa a silhueta. Animação suave quando nova área é descoberta (pulse de luz).

**Comportamento:**
- Aumenta sempre que uma nova célula do modelo ontológico é preenchida
- O fator de profundidade acelera conforme mais conhecimentos são descobertos na mesma área
- Atualizado em tempo real (cada novo conhecimento validado)
- Nunca diminui (o que foi descoberto não é "perdido")

**Posição na tela:**
Seção hero do Dashboard de Inteligência — centro da página, maior elemento visual. A silhueta da empresa ocupa aproximadamente 40% da largura da tela.

**Texto de apoio:**
"Sua empresa está [X]% descoberta."

**Quando mostrar / quando esconder:**
- Sempre visível no Dashboard de Inteligência (página inicial cognitiva)
- Mostrar no onboarding com a silhueta vazia ("vamos descobrir sua empresa juntos")
- Ocultar em telas operacionais
- Destacar em cerimônia quando atinge 25%, 50%, 75%, 100%

**Relação com outros indicadores:**
- É a visualização principal da Cobertura Cognitiva
- Diretamente proporcional ao Patrimônio Construído
- Quando atinge 100%, todos os outros indicadores devem estar no máximo

---

## 4. COBERTURA COGNITIVA

**Nome exato:** Cobertura Cognitiva (Cognitive Coverage)

**Fórmula conceitual:**
```
CoberturaCognitiva = (areasMapeadas / totalAreas) * 100
```
Onde:
- `totalAreas` = 19 áreas (correspondentes aos 19 conceitos da Ontologia Cognitiva)
- `areasMapeadas` = áreas com pelo menos 1 conhecimento validado (confiança ≥ 60)

**Representação visual:**
Grelha 4x5 (19 células + 1 vazia) representando as áreas ontológicas. Cada célula:
- Vazia (cinza): área não explorada
- Preenchimento parcial (gradiente): área em observação
- Preenchida (cor sólida): conhecimento validado
- Ícone específico para cada área

A grelha ocupa o canto inferior direito do Dashboard, tamanho médio.

**Comportamento:**
- Aumenta quando uma nova área recebe seu primeiro conhecimento validado
- Cada área tem peso igual na cobertura
- A grelha mostra também áreas "em observação" (meio preenchidas) para dar sensação de progresso
- Atualizado em tempo real

**Posição na tela:**
Canto inferior direito do Dashboard de Inteligência. Abaixo da Empresa Descoberta.

**Texto de apoio:**
"[X] de 19 áreas mapeadas."

Tooltip em cada célula: "[Nome da área] — [status] — [N] conhecimentos."

**Quando mostrar / quando esconder:**
- Sempre visível no Dashboard de Inteligência
- Visível no Knowledge Vault como filtro (clicar em uma área filtra os conhecimentos)
- Oculto em telas operacionais

**Relação com outros indicadores:**
- É a base do Nível de Conhecimento
- Alimenta a Empresa Descoberta
- Inversamente proporcional às Lacunas
- Cobertura alta + Clareza baixa = áreas mapeadas superficialmente

---

## 5. CONFIANÇA ATUAL

**Nome exato:** Confiança Atual (Current Trust)

**Fórmula conceitual:**
```
ConfiancaAtual = mediaPonderada(confianca de cada conhecimento ativo * relevancia)
```
Onde:
- `relevancia` = score de relevância do conhecimento (0-100) — conhecimentos mais relevantes pesam mais na média
- Confiança de cada conhecimento vinda do Trust Engine

**Representação visual:**
Barra vertical com marcador de nível (tipo termômetro). Cor gradiente: vermelho (0-30) → amarelo (30-60) → verde (60-80) → azul (80-100). Número ao lado da barra.

**Comportamento:**
- Aumenta com novas evidências que confirmam conhecimentos existentes
- Aumenta quando um conhecimento de baixa confiança é refutado (remove peso negativo)
- Diminui quando conhecimento de alta confiança recebe evidência contrária
- Diminui lentamente com o tempo sem novas evidências (envelhecimento)
- Atualizado a cada ciclo de processamento (mínimo diário)

**Posição na tela:**
Abaixo do Índice de Clareza, lado direito do topo do painel. Indicador complementar à Clareza.

**Texto de apoio:**
"Confiança: [X]% — [frase contextual]."

Frases contextuais:
- 0-30%: "Ainda temos muitas incertezas."
- 30-50%: "Algumas hipóteses estão se fortalecendo."
- 50-70%: "A maior parte do conhecimento já tem base sólida."
- 70-90%: "Temos alta confiança no que sabemos."
- 90-100%: "Conhecimento praticamente consolidado."

**Quando mostrar / quando esconder:**
- Visível no Dashboard de Inteligência
- Destacado no Knowledge Vault (cada card de conhecimento tem sua confiança individual)
- Não mostrar no primeiro login (não há confiança para medir)
- Mostrar apenas quando houver 5+ conhecimentos validados

**Relação com outros indicadores:**
- É a média ponderada que alimenta o texto de apoio da Clareza
- Não é o mesmo que Clareza — Clareza é sobre cobertura, Confiança é sobre profundidade
- Relação ideal: Clareza e Confiança devem caminhar juntas

---

## 6. PERGUNTAS RESTANTES

**Nome exato:** Perguntas Restantes (Remaining Questions)

**Fórmula conceitual:**
```
PerguntasRestantes = lacunasIdentificadas - perguntasRespondidas
```
Onde:
- `lacunasIdentificadas` = número total de lacunas que o Motor identificou no diagnóstico
- `perguntasRespondidas` = perguntas já respondidas pelo empresário
- Atualizado a cada ciclo cognitivo

**Representação visual:**
Contador numérico com ícone de balão de perguntas. Se o número é 0, exibe um check verde. Se > 0, exibe o número em destaque com um ponto de interrogação.

**Comportamento:**
- Diminui quando o empresário responde uma pergunta que o Motor considera lacuna
- Aumenta se o Motor identifica nova lacuna (empresário revela algo que gera novas perguntas)
- Em empresas complexas, pode aumentar antes de diminuir (quanto mais se descobre, mais se descobre que não sabe)
- Atualizado em tempo real

**Posição na tela:**
Abaixo da Cobertura Cognitiva, lado direito inferior do Dashboard. Posição de "próxima ação".

**Texto de apoio:**
"[X] perguntas restantes — [frase contextual]."

Frases contextuais:
- 0: "Diagnóstico completo! Nenhuma pergunta pendente."
- 1-3: "Quase lá — algumas perguntas finais."
- 4-10: "Ainda temos um bom caminho pela frente."
- 10+: "Sua empresa tem muitas particularidades — cada pergunta reduz a incerteza."

**Quando mostrar / quando esconder:**
- Sempre visível durante o diagnóstico
- Esconder quando a contagem chega a 0 (mostrar o check por 1 semana, depois ocultar)
- Não mostrar em telas operacionais
- Se o número aumenta, destacar com animação sutil (nova lacuna descoberta)

**Relação com outros indicadores:**
- Inversamente proporcional à Cobertura Cognitiva
- Inversamente proporcional ao Patrimônio Construído
- Diretamente proporcional às Lacunas (mesmo conceito, visões diferentes)
- Quando Zera: atinge o "diagnóstico completo" (gatilho de momento WOW)

---

## 7. LACUNAS

**Nome exato:** Lacunas (Gaps)

**Fórmula conceitual:**
```
Lacunas = areasNaoMapeadas + areasEmObservacao * fatorCriticidade
```
Onde:
- `areasNaoMapeadas` = áreas com 0 conhecimento validado
- `areasEmObservacao` = áreas com conhecimento em hipótese (confiança < 60)
- `fatorCriticidade` = peso da área na Priority Engine (áreas mais críticas pesam mais)

**Representação visual:**
Lista vertical com prioridade. Cada lacuna aparece como uma linha com:
- Ícone da área ontológica
- Nome da área
- Status (não explorada / em observação)
- Prioridade (ícone de fogo: prioridade alta; neutro: prioridade normal; gelo: baixa prioridade)
- Botão "Explorar" para iniciar pergunta sobre a lacuna

**Comportamento:**
- Diminui quando uma área em lacuna recebe seu primeiro conhecimento validado
- A prioridade é recalculada sempre que o contexto muda
- Lacunas de alta prioridade aparecem no topo da lista
- Se a lacuna persiste por > 30 dias, sua prioridade sobe
- Atualizado a cada ciclo cognitivo

**Posição na tela:**
Seção dedicada no Knowledge Vault e no Dashboard de Inteligência (como "Próximas áreas para explorar"). Posição mediana, abaixo da Empresa Descoberta.

**Texto de apoio:**
"[X] lacunas — [Y] de alta prioridade."

Ao lado de cada lacuna: "Área [nome] — [status] — prioridade [alta/média/baixa]."

**Quando mostrar / quando esconder:**
- Visível no Knowledge Vault como seção principal
- Visível no Dashboard de Inteligência como "próximos passos"
- Não mostrar em telas operacionais
- Se todas as lacunas estão preenchidas, mostrar "Nenhuma lacuna identificada" com ícone de escudo

**Relação com outros indicadores:**
- É o negativo da Cobertura Cognitiva
- Alimenta as Perguntas Restantes
- Lacunas de alta prioridade são candidatas a momento WOW (pergunta crucial)
- Fechar lacunas de alta prioridade aumenta mais rapidamente a Confiança Atual

---

## 8. DESCOBERTAS

**Nome exato:** Descobertas (Discoveries)

**Fórmula conceitual:**
```
Descobertas = conhecimentosNovosUltimos30Dias + insightsGeradosUltimos30Dias
```
Onde:
- `conhecimentosNovos` = conhecimentos validados nos últimos 30 dias
- `insightsGerados` = insights comunicados ao empresário nos últimos 30 dias
- Cada item conta como 1 descoberta, independentemente do tamanho

**Representação visual:**
Timeline vertical com cards de descoberta. Cada card:
- Data relativa ("há 2 dias", "semana passada")
- Ícone representando o tipo de descoberta (conhecimento novo, insight, padrão identificado)
- Título da descoberta
- Impacto estimado (quando aplicável)
- Botão "Ver detalhes" (expande o card)

No topo da timeline: contador total.

**Comportamento:**
- Aumenta a cada conhecimento novo validado
- Aumenta a cada insight gerado pela IA
- A timeline é rolável (últimos 30 dias)
- Descobertas com mais de 30 dias saem da timeline mas entram no Patrimônio Construído
- Atualizado em tempo real

**Posição na tela:**
Seção lateral direita do Knowledge Vault. Timeline vertical ocupando aproximadamente 30% da largura da página.

**Texto de apoio:**
"[X] descobertas nos últimos 30 dias."

Ao passar o mouse sobre uma descoberta: "Nova descoberta: [título] em [data]."

**Quando mostrar / quando esconder:**
- Visível no Knowledge Vault como seção "Descobertas Recentes"
- Visível no Dashboard de Inteligência como resumo (top 3 descobertas)
- Não mostrar em telas operacionais
- Se não há descobertas recentes: "Nenhuma descoberta nova esta semana. Que tal explorar uma nova área?"

**Relação com outros indicadores:**
- Diretamente proporcional ao Patrimônio Construído
- Descobertas em áreas de alta prioridade aumentam a Confiança Atual mais rapidamente
- Poucas descobertas + muitas perguntas respondidas = diagnóstico raso
- Muitas descobertas + poucas lacunas = diagnóstico profundo

---

## 9. PATRIMÔNIO CONSTRUÍDO

**Nome exato:** Patrimônio Construído (Built Capital)

**Fórmula conceitual:**
```
Patrimonio = sum(conhecimentosValidados * confianca * relevancia * conviccao) / 100
```
Onde:
- `conhecimentosValidados` = total de conhecimentos com confiança ≥ 60
- `confianca` = confiança de cada conhecimento (0-100)
- `relevancia` = relevância de cada conhecimento (0-100)
- `conviccao` = convicção de cada conhecimento (dias * 0.5, máximo 100)
- Divide por 100 para normalizar para escala

**Representação visual:**
Medalhão/escudo com número central e uma barra de progresso circular ao redor. O escudo tem iconografia de "tesouro" (baú ou diamante estilizado). A barra circular mostra a % em relação ao máximo esperado para o porte da empresa.

**Comportamento:**
- Aumenta com cada novo conhecimento validado
- Aumenta com o tempo (convicção cresce) — mesmo sem novos conhecimentos, o patrimônio valoriza com o tempo
- Diminui se um conhecimento perde confiança ou relevância
- Diminui se um conhecimento é refutado (perde o valor)
- Atualizado a cada ciclo noturno (consolidação)
- Tendência diária: seta para cima (↑), estável (→), ou para baixo (↓)

**Posição na tela:**
Elemento de destaque no Dashboard de Inteligência — centro visual, abaixo do título "Patrimônio da Empresa". Acesso rápido ao Knowledge Vault.

**Texto de apoio:**
"Patrimônio: [X] pontos — [tendência] [↑/→/↓]."

Tooltip: "Patrimônio acumulado de conhecimento validado sobre sua empresa."

**Quando mostrar / quando esconder:**
- Sempre visível no Dashboard de Inteligência (é o indicador principal)
- Primeiro card do Knowledge Vault
- Não mostrar em telas operacionais
- Destacar quando atinge marcos: 100, 500, 1000 pontos
- Destacar quando a tendência semanal é positiva

**Relação com outros indicadores:**
- É o somatório de todos os outros indicadores
- Indicador mais estável (menos volátil)
- Patrimônio alto + Confiança alta + Cobertura alta = empresa bem diagnosticada
- Patrimônio alto + Confiança baixa = alerta (conhecimento acumulado mas não confiável)
- É o indicador que o empresário deve olhar semanalmente

---

## Painel Integrado: Layout dos Indicadores

```
┌──────────────────────────────────────────────────────────────────────┐
│  PAINEL COGNITIVO ── Dashboard de Inteligência da Empresa            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐                        │
│  │ NÍVEL    │  │ CLAREZA  │  │ CONFIANÇA    │                        │
│  │ ┌──────┐ │  │   ╭──────╮│  │   ┌─┐       │                        │
│  │ │  7   │ │  │   │ 72%  ││  │   │ │       │                        │
│  │ └──────┘ │  │   ╰──────╯│  │   │ │80%    │                        │
│  │  Mestre   │  │  de clareza│ │   │ │       │                        │
│  └──────────┘  └──────────┘  │   └─┘       │                        │
│                               └──────────────┘                        │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐                │
│  │         EMPRESA ESCOBERTA (72%)                   │                │
│  │                                                   │                │
│  │         ┌──────────────────────┐                   │                │
│  │         │   Silhueta da        │                   │                │
│  │         │   empresa com        │                   │                │
│  │         │   áreas iluminadas   │                   │                │
│  │         └──────────────────────┘                   │                │
│  └──────────────────────────────────────────────────┘                │
│                                                                       │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐   │
│  │  COBERTURA COGNITIVA        │  │  LACUNAS                     │   │
│  │  ┌──┬──┬──┬──┬──┐           │  │  ▸ Finanças (prioridade alta)│   │
│  │  │OK│OK│OK│..│..│           │  │  ▸ Equipe (prioridade média) │   │
│  │  ├──┼──┼──┼──┼──┤           │  │  ▸ Riscos (prioridade baixa) │   │
│  │  │OK│OK│..│..│..│  12/19   │  │  ┌────────────────────────┐  │   │
│  │  ├──┼──┼──┼──┼──┤           │  │  │ +3 perguntas restantes │  │   │
│  │  │OK│OK│OK│..│..│           │  │  └────────────────────────┘  │   │
│  │  └──┴──┴──┴──┴──┘           │  └──────────────────────────────┘   │
│  └──────────────────────────────┘                                    │
│                                                                       │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐   │
│  │  PATRIMÔNIO CONSTRUÍDO      │  │  DESCOBERTAS                 │   │
│  │  ┌─────────────────────┐    │  │  ┌──────────────────────────┐ │   │
│  │  │ ╭──────╮            │    │  │  │ ▸ Padrão de sazonalidade │ │   │
│  │  │ │ 845  │  ↗+12%     │    │  │  │   identificado (há 2d)   │ │   │
│  │  │ │ pts  │ este mês  │    │  │  ├──────────────────────────┤ │   │
│  │  │ ╰──────╯            │    │  │  │ ▸ Concentração de        │ │   │
│  │  └─────────────────────┘    │  │  │   clientes mapeada (há5d)│ │   │
│  │  Últimos 7 dias: +45 pts   │  │  └──────────────────────────┘ │   │
│  └──────────────────────────────┘  |  Total: 8 descobertas no mês |   │
│                                     └──────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Comportamento do Sistema de Gamificação

### Regras de Atualização

| Indicador | Frequência | Gatilho | Latência |
|---|---|---|---|
| Nível de Conhecimento | Por evento | Novo conhecimento validado | Imediato |
| Índice de Clareza | Diário | Ciclo noturno | 24h |
| Empresa Descoberta | Por evento | Nova área mapeada | Imediato |
| Cobertura Cognitiva | Por evento | Novo conhecimento validado | Imediato |
| Confiança Atual | Diário | Ciclo noturno | 24h |
| Perguntas Restantes | Por evento | Resposta do empresário | Imediato |
| Lacunas | Diário | Ciclo noturno | 24h |
| Descobertas | Por evento | Novo conhecimento/insight | Imediato |
| Patrimônio Construído | Diário | Ciclo noturno | 24h |

### Hierarquia de Importância Visual

1. **Indicador principal:** Empresa Descoberta (maior, centro)
2. **Indicadores secundários:** Nível, Clareza, Confiança (topo)
3. **Indicadores de progresso:** Cobertura, Patrimônio (meio)
4. **Indicadores de ação:** Lacunas, Perguntas Restantes, Descobertas (base)

### Regras de Interação

1. **Todo indicador é clicável.** Ao clicar, o empresário é levado à visão detalhada no Knowledge Vault.
2. **Nenhum indicador tem valor vazio.** Se não há dados, mostrar "Ainda não há dados suficientes" em vez de "0".
3. **Indicadores com tendência positiva** têm destaque sutil (borda verde). Negativa (borda âmbar).
4. **Todos os indicadores têm tooltip** explicando o cálculo de forma simples ("Esse número representa quantas áreas da sua empresa já mapeamos").
5. **Mudanças significativas** (> 10% em 24h) geram notificação sutil.

### Relação com Momentos WOW

Atingir marcos nos indicadores dispara momentos WOW do SISTEMA_DE_VALOR.md:

| Gatilho | Indicador | Marco | Momento WOW |
|---|---|---|---|
| Novo nível | Nível de Conhecimento | Cada nível | #1, #13, #14 |
| 50% de clareza | Índice de Clareza | 50% | #13 |
| 80% de clareza | Índice de Clareza | 80% | #13 |
| 100% descoberta | Empresa Descoberta | 100% | #13 |
| Cobertura = 100% | Cobertura Cognitiva | 19/19 | #13 |
| Confiança > 80% | Confiança Atual | 80% | (implícito nos cards) |
| Zera perguntas | Perguntas Restantes | 0 | #15 |
| Lacuna de alta prioridade | Lacunas | Persiste > 7 dias | #15 |
| 10 descobertas | Descobertas | 10 | #7 |
| Patrimônio dobra | Patrimônio Construído | 2x | #6 |

### Estado Vazio (Zero Day)

Quando o empresário chega pela primeira vez, todos os indicadores mostram estado vazio com linguagem de início de jornada:

- **Nível:** "Nível 1 — Explorador. Vamos começar?"
- **Clareza:** "0% — Ainda não mapeamos nada."
- **Empresa:** "Sua empresa ainda não foi descoberta."
- **Cobertura:** "0 de 19 áreas."
- **Confiança:** "— (sem dados ainda)"
- **Perguntas:** "Muitas! Vamos começar com algumas."
- **Lacunas:** "Todas as áreas estão por explorar."
- **Descobertas:** "Nenhuma ainda."
- **Patrimônio:** "0 pontos — o patrimônio começa com o primeiro conhecimento."

### Estado de Completação (Diagnóstico Completo)

Quando a cobertura atinge 100%:

- **Nível:** "Nível 10 — Empresa Descoberta. Conhecimento completo."
- **Clareza:** Oscila entre 90-100%
- **Empresa:** 100% iluminada
- **Cobertura:** "19 de 19 áreas."
- **Confiança:** Varia conforme novas evidências
- **Perguntas:** "0 — Diagnóstico completo."
- **Lacunas:** "Nenhuma — você conhece sua empresa."
- **Descobertas:** Contador acumula novas descobertas
- **Patrimônio:** Continua a crescer com convicção e novas evidências

O diagnóstico completo não é o fim — é o início do ciclo de manutenção. O patrimônio continua a crescer.
