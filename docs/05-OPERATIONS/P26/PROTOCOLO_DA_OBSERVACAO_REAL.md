# PROTOCOLO DA OBSERVAÇÃO REAL

## Como observar uma empresa (inclusive a própria) sem enviesar resultados

**Programa 26 | Validação Contínua | Julho de 2026 | Versão 1.0**

> Este protocolo define o padrão científico de observação da Ponte Digital.
> Toda observação registrada no Catálogo deve seguir este protocolo.
> Observações que violam este protocolo são inválidas e não alimentam o sistema de hipóteses.

---

## 1. O que é uma observação válida

Uma observação válida é o registro de um fenômeno perceptível por sentidos humanos ou por instrumentos de medição, documentado no momento em que ocorre ou imediatamente após, com separação rigorosa entre:

- **O que foi percebido** (o fenômeno em si)
- **O contexto em que foi percebido** (quando, onde, em que circunstâncias)
- **Quem percebeu** (o observador, com seus vieses declarados)

Uma observação válida pode ser refutada por outra observação. Não é verdade absoluta — é evidência.

### Critérios de validade

| Critério | Obrigatório? | Explicação |
|---|---|---|
| O fenômeno foi percebido diretamente | Sim | Não vale "ouvi dizer" ou "li em algum lugar" |
| Data e hora registradas | Sim | Sem isso, a observação não pode ser correlacionada |
| Contexto documentado | Sim | O que estava acontecendo ao redor |
| Observador identificado | Sim | Para rastreabilidade e declaração de viés |
| Fato separado da interpretação | Sim | Seção "fato observado" sem inferências |
| Reprodutível por outro observador | Ideal | Outra pessoa no mesmo contexto chegaria ao mesmo registro |
| Instrumento de medição calibrado | Quando aplicável | Se usou métrica, a métrica precisa ser confiável |

---

## 2. O que NÃO é uma observação válida

| Não é observação | Exemplo | Problema |
|---|---|---|
| Opinião | "Acho que o empresário ficou confuso" | Inferência não verificada |
| Suposição | "Ele deve ter desistido porque achou difícil" | Causa atribuída sem evidência |
| Inferência não verificada | "Isso significa que o produto não é intuitivo" | Interpretação sem base |
| Anedota de terceiros | "Me contaram que um usuário..." | Não foi percebido diretamente |
| Dado sem contexto | "A taxa de abandono foi 40%" | Não se sabe em que condições |
| Lembrança vaga | "Semana passada alguém mencionou..." | Sem registro no momento |
| Conhecimento geral | "Todo mundo sabe que empresário não lê" | Generalização sem evidência local |
| Desejo | "Espero que isso melhore o engajamento" | Não é observação, é expectativa |

### Regra dos 5 segundos

Se você levar mais de 5 segundos para responder "O que exatamente eu vi/ouvi/medi?", não é uma observação válida. É uma interpretação disfarçada.

---

## 3. Como separar o que você VIU do que você ACHOU que viu

### Exercício de separação

**Situação:** Você vê um empresário franzir a testa enquanto olha para o mapa cognitivo.

| O que você VIU | O que você ACHOU que viu |
|---|---|
| Sobrancelhas contraídas por 3 segundos | "Ele não entendeu o mapa" |
| Olhos fixos em um ponto do mapa por 8 segundos | "Ele está confuso" |
| Cabeça inclinada 15 graus à esquerda | "Ele está frustrado" |

O fato observado é apenas a primeira coluna. A segunda coluna são interpretações que **podem** estar corretas ou não.

### Técnica do MASP (Mínima Afirmação Sensorial Possível)

Antes de registrar, pergunte: "Qual é a menor descrição possível que um gravador de vídeo registraria?" A resposta é o fato. O resto é interpretação.

### Protocolo de dúvida

Se você não tem certeza se algo é fato ou interpretação:
1. Escreva como se estivesse descrevendo para alguém que não pode ver a tela
2. Remova todos os adjetivos e verbos de emoção
3. Se sobrou apenas substantivos e verbos de ação, é fato
4. Se sobrou qualquer julgamento, é interpretação

---

## 4. Técnicas de observação não-enviesada

### 4.1 Observação passiva — registrar sem interpretar

A técnica mais pura: você apenas documenta o que acontece, sem intervir.

**Como fazer:**
- Sente-se em silêncio durante a sessão
- Anote apenas ações observáveis: cliques, pausas, expressões, palavras textuais
- Não faça perguntas durante a observação
- Não sugira caminhos
- Registre timestamps de cada evento

**Quando usar:**
- Primeiras sessões de um novo usuário
- Quando quer saber o que acontece naturalmente
- Quando testa uma hipótese de comportamento não-intervencionista

**Exemplo de registro passivo válido:**
```
[14:32:15] Usuário abre a página inicial
[14:32:22] Cursor permanece sobre "Iniciar diagnóstico" por 4s
[14:32:26] Usuário clica em "Iniciar diagnóstico"
[14:32:28] Usuário lê a primeira pergunta em voz alta: "Qual o nome da sua empresa?"
[14:32:35] Usuário digita resposta sem pausa
[14:32:40] Usuário clica em "Responder"
```

### 4.2 Observação ativa — perguntar para entender

Você intervém minimamente para entender o que está acontecendo, mas sem dirigir o comportamento.

**Como fazer:**
- Durante a sessão, faça apenas perguntas abertas: "O que você está pensando agora?"
- Não faça perguntas sugestivas: "Você achou confuso, né?"
- Peça ao usuário para pensar em voz alta (protocolo think-aloud)
- Anote as respostas textuais

**Quando usar:**
- Quando a observação passiva não explica o comportamento
- Quando quer entender a motivação por trás da ação
- Em sessões de validação qualitativa

**Exemplo de pergunta ativa válida vs inválida:**

| Válida | Inválida |
|---|---|
| "O que você está pensando agora?" | "Você está confuso?" |
| "O que te fez clicar ali?" | "Você clicou porque achou bonito?" |
| "Como você se sente sobre isso?" | "Isso te frustra, não é?" |

### 4.3 Observação comparativa — comparar com padrões anteriores

A observação ganha significado quando comparada com ela mesma ao longo do tempo ou com outras observações similares.

**Como fazer:**
- Mantenha um registro histórico de observações para o mesmo contexto
- Compare: "Na semana passada ele fez X, hoje fez Y"
- Compare entre usuários diferentes no mesmo fluxo
- Identifique desvios do padrão conhecido

**Quando usar:**
- Sempre que houver observações anteriores do mesmo fenômeno
- Para identificar se um comportamento é padrão ou anomalia
- Para medir impacto de mudanças implementadas

---

## 5. O viés do observador

### Como se manifesta na prática

| Tipo de viés | Manifestação | Exemplo |
|---|---|---|
| Viés de confirmação | Ver o que confirma sua crença | "O empresário demorou 5s para responder. Isso prova que a pergunta é boa." (achou que seria boa) |
| Viés de expectativa | Ver o que você espera ver | "Ela sorriu, deve ter gostado." (você esperava que gostasse) |
| Viés de afeto | Julgar baseado em simpatia/antipatia | "O João é experiente, então se ele fez isso é porque a interface é ruim" |
| Viés de recência | Supervalorizar a última observação | "Acabei de ver um caso de abandono. Isso deve ser um grande problema." |
| Viés de disponibilidade | Dar peso maior ao que vem fácil à mente | "Lembro de 3 casos de erro no pagamento. Deve ser o maior problema do sistema." |
| Viés de ancoragem | Fixar-se na primeira informação | "A primeira empresa disse que o preço é alto. Agora toda reclamação parece ser sobre preço." |
| Viés do sobrevivente | Observar só quem ficou | "Nossos usuários ativos adoram o produto." (e quem desistiu?) |

### Como mitigar

1. **Declarar viés antes de observar:** "Minha hipótese atual é que X vai acontecer. Sei disso e vou me esforçar para ver o contrário também."

2. **Observação cega:** Sempre que possível, o observador não deve saber qual versão está sendo testada (A/B).

3. **Múltiplos observadores independentes:** Duas pessoas observam a mesma sessão e comparam registros.

4. **Registro imediato:** Quanto mais tempo passa entre o fenômeno e o registro, mais viés contamina a descrição.

5. **Revisão por par:** Outra pessoa lê sua observação e tenta identificar onde você pode ter interpretado em vez de observado.

---

## 6. O viés de confirmação — como evitar ver só o que confirma crenças

O viés de confirmação é o mais perigoso porque é automático. Seu cérebro naturalmente filtra o que contradiz suas crenças.

### Protocolo de detecção

Antes de registrar, faça estas 3 perguntas:

1. **"O que eu esperava ver aqui?"** — Identifique sua expectativa antes de continuar.

2. **"O que contradiz minha expectativa?"** — Forçadamente, procure o contrário. Se você não encontra nada, é provável que não esteja procurando.

3. **"Se eu estivesse do lado oposto, que evidência eu mostraria?"** — Troque de lado mentalmente.

### Técnica do advogado do diabo

Após registrar uma observação que confirma sua crença, escreva imediatamente uma observação alternativa que refutaria a mesma crença, mesmo que você não a tenha visto. Isso treina o cérebro a não se contentar com confirmação fácil.

### O paradoxo da falsificação

Karl Popper ensina: uma hipótese só é científica se pode ser falsificada. Na observação, o mesmo vale: se você só consegue ver evidências a favor da sua crença, você não está observando — está colecionando confirmações.

**Regra prática:** Se nas últimas 5 observações você sempre confirmou sua hipótese inicial, algo está errado. Hipóteses reais são refutadas com frequência.

---

## 7. Como registrar sem contaminar — fatos primeiro, interpretação depois

### Formato obrigatório de registro

Toda observação deve ser registrada em duas seções separadas e claramente identificadas:

```
─── FATO OBSERVADO ───
[Apenas o que foi percebido. Zero interpretação.]

─── INTERPRETAÇÃO ───
[O que o observador acha que significa. Claramente identificada como interpretação.]
```

### A barreira obrigatória

Entre a seção de FATO e a seção de INTERPRETAÇÃO, deve haver uma linha de separação visual explícita. Isso força o observador a reconhecer que está mudando de modo.

### Regra do tempo

- Seção FATO: pode ser escrita durante ou imediatamente após (máximo 15 minutos)
- Seção INTERPRETAÇÃO: deve esperar no mínimo 30 minutos após o fato

Por que? As primeiras interpretações são as mais contaminadas por viés imediato. Esperar 30 minutos reduz o efeito de ancoragem emocional.

---

## 8. Template de observação

```
─── DADOS DA OBSERVAÇÃO ───
ID da observação: OBS-[XXX]
Data: [dd/mm/aaaa]
Hora: [hh:mm]
Contexto: [o que estava acontecendo no momento da observação]
Local/Fluxo: [qual tela, funcionalidade, etapa do fluxo]
Observador: [nome]
Duração da observação: [minutos]

─── CATEGORIZAÇÃO ───
Categoria principal: [operacional / cognitivo / produto / cliente / equipe / arquitetura / experiência]
Subcategoria: [especificar]

─── FATO OBSERVADO ───
[Descrição objetiva do que foi percebido. Linguagem factual. Apenas ações,
expressões, métricas, eventos. Nada de interpretação.]

─── INTERPRETAÇÃO ───
[O que o observador acha que o fato significa. Hipótese causal.
Claramente identificada como interpretação do observador.]

─── VALIDAÇÃO ───
Instrumento usado: [visual / métrica / log / gravação / pergunta ativa / outra]
Confiança no fato observado: [0-10] (o quanto o observador confia que o
registro corresponde exatamente ao que aconteceu)
Nível de inferência na interpretação: [0-10] (o quanto a interpretação é
baseada em suposição vs evidência)

─── APRENDIZADO POTENCIAL ───
[O que esta observação sugere que ainda não sabemos]

─── CONEXÕES ───
Hipótese relacionada: [H-XXX se aplicável]
Observações similares anteriores: [IDs se houver]
```

---

## 9. Checklist anti-viés (5 perguntas antes de registrar)

Antes de finalizar qualquer observação, responder honestamente:

| # | Pergunta | Resposta esperada |
|---|---|---|
| 1 | **Isto é um fato que qualquer pessoa na mesma posição teria registrado da mesma forma?** | Se qualquer pessoa chegaria à mesma descrição, é fato. Se depende de interpretação pessoal, não é. |
| 2 | **O que eu esperava ver antes de começar?** | Declare sua expectativa. Reconheça o viés antes de registrar. |
| 3 | **O que contradiz o que eu acredito sobre este fenômeno?** | Se você não consegue pensar em nada que contradiga, provavelmente não está procurando. |
| 4 | **Esta observação é útil mesmo se estiver errada?** | Se só é útil se confirmar sua crença, você está contaminado por viés de confirmação. |
| 5 | **Eu registraria esta observação da mesma forma se meu chefe/equipe/cliente estivesse olhando?** | Se você ajustaria o tom para agradar alguém, o registro está contaminado por viés social. |

### Regra de ouro

Se alguma das 5 perguntas gerar desconforto ou hesitação, não registre a observação ainda. Volte ao local do fato e observe novamente, focando apenas no que é perceptível por qualquer observador imparcial.

---

## 10. Quando uma observação vira dado, hipótese ou aprendizado

### Ciclo de maturação da observação

```
OBSERVAÇÃO BRUTA
       │
       ├── Singleton → Arquivada (aprendizado mínimo)
       │
       ├── Padrão (3+ ocorrências similares)
       │       │
       │       ├── DADO → Alimenta métricas e dashboards
       │       │
       │       ├── HIPÓTESE → "Acreditamos que isso acontece porque..."
       │       │       │
       │       │       ├── Confirmada → APRENDIZADO → Conhecimento
       │       │       │
       │       │       └── Refutada → APRENDIZADO → O que não funciona
       │       │
       │       └── Ação imediata → RFC → Implementação
       │
       ├── Anomalia
       │       │
       │       ├── Erro → Correção imediata
       │       │
       │       └── Descoberta → Hipótese → Validação
       │
       └── Ruído → Arquivado
```

### Definições formais

| Estado | Definição | Ação |
|---|---|---|
| **Observação bruta** | Registro único de um fenômeno | Aguardar repetição ou classificar |
| **Dado** | Observação quantificada e comparável | Alimentar métricas; correlacionar |
| **Padrão** | 3+ observações similares em contextos equivalentes | Formular hipótese causal |
| **Hipótese** | Explicação causal proposta para o padrão | Desenhar experimento |
| **Conhecimento** | Hipótese confirmada por múltiplas fontes | Documentar; ensinar; usar como premissa |
| **Aprendizado** | Hipótese refutada ou observação única relevante | Registrar o que não funciona; evitar repetir |
| **Sinal** | Observação que indica direção para o produto | Priorizar investigação |
| **Ruído** | Observação sem padrão ou significado | Arquivar com data de expiração |

### Quando uma observação vira dado

Observação vira dado quando:
- Pode ser expressa numericamente
- Pode ser comparada com ela mesma ao longo do tempo
- Pode ser agregada com outras observações similares
- Tem um contexto claro de coleta

**Exemplo:**
- Observação: "O usuário clicou 5 vezes no botão 'Salvar' sem sucesso"
- Dado: "Taxa de erro no clique em 'Salvar': 62% (n=13 tentativas, 8 falhas) em 3 empresas diferentes na última semana"

### Quando uma observação vira hipótese

Observação vira hipótese quando:
- Ela faz parte de um padrão (3+ ocorrências)
- Existe uma explicação causal plausível
- É possível desenhar um experimento para testá-la
- O impacto potencial justifica a investigação

### Quando uma observação vira aprendizado

Observação vira aprendizado quando:
- A hipótese correspondente foi confirmada (aprendizado positivo)
- A hipótese correspondente foi refutada (aprendizado negativo — igualmente valioso)
- A observação é um singleton, mas revela algo que a equipe não sabia

---

## 11. Exemplos de boas e más observações

### Exemplo 1 — Interação com o mapa cognitivo

| Boa observação | Má observação |
|---|---|
| **Fato:** O usuário abriu o mapa, moveu o cursor sobre o nó "Financeiro", parou por 4s, moveu para "Clientes", parou por 2s, e fechou o mapa. Tempo total na tela: 38s. | "O usuário não entendeu o mapa e ficou perdido." |
| **Interpretação:** O usuário pode estar explorando os nós, mas não se aprofundou em nenhum. Pode indicar que o mapa não comunicou claramente o que fazer. | Problema: não registro o que aconteceu, já dou a interpretação como fato. |

### Exemplo 2 — Resposta a insight

| Boa observação | Má observação |
|---|---|
| **Fato:** Ao receber o insight "85% dos seus clientes estão concentrados em 2 setores", o usuário disse em voz alta: "Nossa, é verdade. Nunca tinha pensado por esse ângulo." Fez uma pausa de 5s, depois escreveu uma anotação em papel. | "O insight gerou valor imenso para o usuário." |
| **Interpretação:** O insight parece ter gerado uma nova perspectiva para o usuário, suficiente para interromper o fluxo e registrar manualmente. | Problema: "valor imenso" é inferência não verificada. |

### Exemplo 3 — Abandono durante espera

| Boa observação | Má observação |
|---|---|
| **Fato:** Tempo de espera: 12s. Usuário olhou para o canto superior direito da tela (onde está o timer), suspirou audivelmente, moveu o mouse para o botão "Fechar", parou o cursor sobre ele por 2s, não clicou. Aguardou o processamento. | "O loading é aceitável, o usuário quase desistiu mas não desistiu." |
| **Interpretação:** A espera de 12s gerou frustração visível (suspiro, movimento em direção ao fechamento), mas o usuário decidiu continuar. O limiar de tolerância parece estar entre 10-15s para este contexto. | Problema: "quase desistiu" é suposição. Não se sabe o que o usuário pensava. |

### Exemplo 4 — Dado quantitativo

| Boa observação | Má observação |
|---|---|
| **Fato:** Dashboard reporta que das 47 empresas que iniciaram o diagnóstico na última semana, 31 (66%) completaram as 3 primeiras perguntas e 16 (34%) abandonaram antes da 2ª pergunta. Das que abandonaram, 12 (75%) o fizeram na 1ª pergunta. | "Muita gente está abandonando no começo. A primeira pergunta deve estar muito difícil." |
| **Interpretação:** A maior perda acontece na 1ª pergunta. Taxa de abandono de 34% na 1ª pergunta é alta comparada com benchmarks de formulários (~20%). Hipótese: a primeira pergunta pode estar gerando atrito. | Problema: "muita gente" é vago; "deve estar" é suposição; não há dado de comparação. |

### Exemplo 5 — Feedback verbal

| Boa observação | Má observação |
|---|---|
| **Fato:** Ao final da sessão, o usuário disse textualmente: "Gostei, mas achei que as perguntas foram muito óbvias. Não aprendi nada de novo." Repetiu a frase "não aprendi nada de novo" duas vezes durante a conversa. | "O usuário não gostou do diagnóstico." |
| **Interpretação:** A percepção do usuário é que o diagnóstico não agregou conhecimento novo. Isso pode indicar que as perguntas precisam ser mais desafiadoras ou que o perfil do usuário é mais experiente que o público-alvo inicial. | Problema: "não gostou" é redução. Perde-se a informação específica sobre o que ele disse (perguntas óbvias, nada de novo). |

---

## 12. O observador como instrumento

O maior instrumento de observação na Ponte Digital — especialmente na Empresa Zero — é o ser humano. Diferente de um sensor ou analytics, o observador humano tem:

**Vantagens:**
- Percebe contexto (o que está ao redor do evento)
- Captura sutilezas (tom de voz, expressão, hesitação)
- Entende narrativa (conecta eventos aparentemente isolados)
- Pode perguntar (observação ativa)

**Desvantagens:**
- Cansa (qualidade da observação cai após 30 minutos)
- Tem viés (como descrito neste protocolo)
- É inconsistente (mesma pessoa observa diferente em dias diferentes)

### Protocolo de higiene do observador

1. **Limite de 30 minutos por sessão** — após 30 minutos, faça pausa de 10 minutos
2. **Máximo de 3 sessões por dia** — a qualidade cai drasticamente na 4ª sessão
3. **Intervalo de 2 horas entre sessões** — para resetar viés de recência
4. **Registro imediato** — se não registrou em 15 minutos, não confie no registro
5. **Revisão semanal** — toda sexta, revisar as observações da semana em busca de viés não detectado
6. **Rodízio de observadores** — mesma empresa observada por pessoas diferentes em semanas alternadas

---

## 13. Observação de si mesmo — o caso da Empresa Zero

Quando a empresa observada é a própria equipe Ponte Digital, o viés atinge seu nível máximo. Ninguém é neutro sobre si mesmo.

### Regras especiais para auto-observação

1. **Observador externo obrigatório** — pelo menos 30% das observações da Empresa Zero devem ser feitas por alguém de fora da equipe

2. **Delay de 24h** — observações sobre a própria equipe só podem ser interpretadas após 24h do fato (reduz viés emocional)

3. **Registro anônimo** — observações sobre comportamento da equipe podem ser anônimas para evitar viés de hierarquia

4. **Meta-observação** — uma vez por semana, a equipe observa como está observando. O processo de observação é ele mesmo observado.

5. **Sessões gravadas** — toda sessão da Empresa Zero deve ser gravada (tela + áudio) para permitir re-observação por outro membro

---

## 14. O que fazer com observações discordantes

Duas observações sobre o mesmo fenômeno podem ser diferentes ou contraditórias. Isso não é um problema — é dado.

### Protocolo de discordância

1. **Não escolher uma contra a outra** — ambas são registradas com seus contextos
2. **Verificar se observaram o mesmo fenômeno** — às vezes observaram coisas diferentes no mesmo evento
3. **Verificar viés de cada observador** — cada um declara seu viés
4. **Buscar terceira observação** — um terceiro observador independente
5. **Aguardar mais dados** — às vezes a discordância se resolve com mais observações
6. **Documentar a discordância** — se persistir, vira dado sobre a dificuldade de observar aquele fenômeno

---

## 15. Limites éticos da observação

Observar não é vigiar. Toda observação deve respeitar:

1. **Consentimento informado** — a pessoa observada sabe que está sendo observada e consentiu
2. **Propósito claro** — a observação tem um objetivo declarado de melhoria do produto
3. **Não punição** — observações sobre erros ou dificuldades nunca são usadas para avaliar desempenho individual
4. **Anonimização** — observações são registradas por cargo/função, não por nome individual, a menos que o contexto exija
5. **Tempo limitado** — a observação tem início e fim definidos
6. **Direito de não participar** — qualquer membro pode optar por não ser observado em uma sessão específica

---

*Este protocolo entra em vigor na data de publicação e é revisado a cada 3 meses.*
*Primeira revisão: outubro de 2026.*
*Ponte Digital — Empresa Zero — Observação Científica.*
