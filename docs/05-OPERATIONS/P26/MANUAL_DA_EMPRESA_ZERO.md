# Manual da Empresa Zero

## Primeira empresa administrada por uma Infraestrutura Cognitiva Empresarial

---

## 1. O que é a Empresa Zero

**Definição:** A Empresa Zero é a primeira empresa real operada integralmente sob os protocolos da Ponte Digital. Não é um simulado, não é uma demonstração — é o laboratório vivo onde cada decisão, cada erro, cada insight é matéria-prima para a Infraestrutura Cognitiva Empresarial.

**Propósito:** A Empresa Zero existe para três razões, nesta ordem:

1. **Gerar aprendizado real** sobre como uma empresa pode ser administrada com o suporte de uma IA cognitiva — não automatizada, não substituída, mas amplificada.
2. **Validar os protocolos** da Ponte Digital em condições reais: pressão, incerteza, recursos limitados, decisões com consequências.
3. **Produzir patrimônio intelectual** — dados, decisões registradas, RFCs, ciclos de aprendizado — que alimentam a própria plataforma e a tornam mais inteligente para as próximas empresas.

A Empresa Zero não é um MVP da Ponte Digital. A Empresa Zero é a primeira cliente da Ponte Digital. E também sua criadora. Essa dualidade é intencional e deve ser preservada.

---

## 2. Estrutura Organizacional

A Empresa Zero opera com quatro papéis fundamentais. Uma mesma pessoa pode acumular múltiplos papéis, mas nenhum papel pode ficar vazio.

### 2.1 Arquiteto

**Responsabilidade:** Integridade do sistema. O Arquiteto garante que cada decisão, cada linha de código, cada registro esteja alinhado com a visão de longo prazo da Ponte Digital.

**O que faz:**
- Define e protege os princípios arquiteturais
- Conduz RFCs de impacto arquitetural
- Revisa decisões de médio e alto impacto
- Garante que o Motor Cognitivo não vire um monólito de regras implícitas
- Mantém a coerência entre documentação e implementação

**Pergunta que nunca pode deixar de fazer:** "Isso fortalece ou enfraquece a capacidade da empresa de evoluir nos próximos 5 anos?"

### 2.2 Engenheiro

**Responsabilidade:** Entrega com qualidade. O Engenheiro transforma decisões em software que funciona, é seguro e pode ser mantido.

**O que faz:**
- Implementa funcionalidades dentro do escopo da sprint
- Preserva multi-tenancy, segurança e rastreabilidade
- Documenta decisões técnicas no código e nos ADRs
- Executa a rotina de qualidade (testes, lint, typecheck)
- Reporta divergências entre documentação e código

**Pergunta que nunca pode deixar de fazer:** "Isso resolve o problema do usuário sem criar dívida técnica desnecessária?"

### 2.3 Produtor de Conhecimento

**Responsabilidade:** Transformar observação em aprendizado. O Produtor de Conhecimento garante que nenhum insight seja perdido.

**O que faz:**
- Registra observações diárias no Diário Operacional
- Converte observações recorrentes em Hipóteses
- Conduz a redação de RFCs quando necessário
- Mantém o acervo de conhecimento em `docs/08-KNOWLEDGE/`
- Identifica padrões nas decisões e nos resultados

**Pergunta que nunca pode deixar de fazer:** "O que aprendemos hoje que não sabíamos ontem?"

### 2.4 Operador de Observação

**Responsabilidade:** Manter os olhos abertos. O Operador de Observação é o radar da empresa — capta sinais fracos, surpresas, anomalias.

**O que faz:**
- Registra tudo que parece relevante, mesmo que não entenda ainda
- Categoriza observações por tipo (cliente, produto, mercado, operação)
- Alimenta o diário com dados brutos
- Sinaliza quando uma observação contradiz uma hipótese ativa
- Pergunta "isso é padrão ou exceção?" para cada observação

**Pergunta que nunca pode deixar de fazer:** "O que está diferente hoje?"

---

## 3. Rotina Diária

### Exemplo de dia de um membro típico (acumulando todos os papéis)

| Horário | Atividade | Papel |
|---------|-----------|-------|
| 08:00 - 08:15 | Revisão do diário do dia anterior + planejamento do dia | Arquiteto |
| 08:15 - 09:00 | Leitura de observações pendentes, categorização | Operador |
| 09:00 - 11:00 | Bloco de execução (codificação, design, escrita) | Engenheiro |
| 11:00 - 11:15 | Pausa + registro de observações da manhã | Operador |
| 11:15 - 12:30 | Bloco de execução (continuação) | Engenheiro |
| 12:30 - 13:30 | Almoço | — |
| 13:30 - 14:00 | Revisão de decisões pendentes | Arquiteto |
| 14:00 - 15:30 | Bloco de conhecimento (RFCs, documentação, hipóteses) | Produtor |
| 15:30 - 15:45 | Pausa + observações da tarde | Operador |
| 15:45 - 17:00 | Bloco de execução (finalização) | Engenheiro |
| 17:00 - 17:30 | Fechamento do diário operacional do dia | Produtor |
| 17:30 - 18:00 | Revisão com IA: o que ficou, o que escapou, o que aprendemos | Arquiteto |

**Regra dos 15 minutos:** Nenhum registro deve levar mais que 15 minutos. Se levar, está sendo detalhado demais. O valor está na consistência, não na profundidade de cada entrada.

---

## 4. Rotina Semanal

### Segunda-feira: Planejamento da Semana

- Revisão das hipóteses ativas (30 min)
- Definição do foco da semana (1 coisa mais importante) (15 min)
- Revisão de RFCs pendentes (15 min)

### Quarta-feira: Revisão de Médio Curso

- Verificação do progresso real vs planejado (15 min)
- Ajuste de prioridades se necessário (15 min)
- Registro de observações acumuladas (15 min)

### Sexta-feira: Fechamento Semanal

- Revisão das decisões da semana (30 min)
- Atualização do Knowledge (15 min)
- Checklist de integridade: documentação vs código (15 min)
- Preparação do resumo semanal para o fundador (15 min)

### Rituais Diários (todos os dias)

- Abertura: 5 min de revisão do plano do dia com IA
- Fechamento: 10 min de diário operacional

---

## 5. Rotina Mensal

### Ciclo de Aprendizado (mês 1, mês 2, etc.)

Cada mês fechado produz:

1. **Relatório de Decisões:** todas as decisões MÉDIAS e ALTAS do mês, com resultados e aprendizados
2. **Revisão de Hipóteses:** quais hipóteses foram validadas, quais foram refutadas, quais seguem ativas
3. **RFCs do Mês:** documentos de decisão arquitetural ou de produto produzidos no período
4. **Retrospectiva Pessoal:** o que funcionou, o que não funcionou, o que mudar no próximo mês

### Agenda Mensal

- Dia 1-2: Fechamento do mês anterior + relatório
- Dia 3-5: Definição de foco do novo mês
- Dia 15: Revisão de meio de mês
- Dia 25-30: Preparação para fechamento

---

## 6. Como Decisões São Tomadas

Visão geral. Para o protocolo completo, ver `PROTOCOLO_DA_DECISAO.md`.

**Toda decisão relevante passa por 7 etapas:**

1. CONTEXTO — O que está em jogo?
2. HIPÓTESE — O que acreditamos?
3. EVIDÊNCIAS — O que sabemos?
4. ALTERNATIVAS — O que consideramos?
5. ESCOLHA — O que escolhemos e por quê?
6. RESULTADO — O que aconteceu?
7. APRENDIZADO — O que aprendemos?

**Classificação por impacto:**

| Impacto | Tempo | Onde registrar | RFC necessária? |
|---------|-------|----------------|-----------------|
| BAIXO | 5 min | Diário | Não |
| MÉDIO | 15 min | Diário | Não |
| ALTO | 30 min+ | Diário + RFC | Sim |

**A IA não decide.** A IA apresenta: contexto consolidado, evidências encontradas, alternativas identificadas, riscos calculados. A decisão é sempre humana.

---

## 7. Como o Conhecimento Flui

### Da Observação à RFC

```
OBSERVAÇÃO (bruta, diária)
    → categorizada pelo Operador
    → agrupada em padrões pelo Produtor
    → vira HIPÓTESE se for recorrente ou relevante
    → vira DECISÃO se exigir escolha
    → vira APRENDIZADO quando o resultado é conhecido
    → vira RFC se afetar arquitetura, produto ou protocolo
    → vira KNOWLEDGE se for reutilizável
```

### Canais de Fluxo

1. **Diário Operacional:** entrada diária de observações, decisões, insights
2. **Hipóteses Ativas:** lista viva de crenças sendo testadas
3. **Decisões Registradas:** histórico completo de escolhas e resultados
4. **RFCs:** documentos formais de mudança
5. **Knowledge:** aprendizado destilado, reutilizável

### Regra de Ouro

Nunca pule etapas. Uma observação que vira decisão sem passar por hipótese é uma decisão cega. Uma decisão que vira aprendizado sem passar por resultado é uma crença não testada.

---

## 8. Como a IA Participa em Cada Etapa

| Etapa | O que a IA faz | O que a IA NÃO faz |
|-------|---------------|-------------------|
| Observação | Sugere categorização, pergunta "isso é novo?", busca padrões em observações passadas | Não inventa observações, não descarta observações como irrelevantes |
| Hipótese | Ajuda a formalizar "se X então Y", sugere formas de validação | Não define o que é importante, não prioriza hipóteses |
| Decisão | Consolida contexto, lista alternativas conhecidas, estima riscos | Não escolhe, não pondera valores que não pode medir |
| Execução | Revisa código, aponta divergências, sugere melhorias | Não ignora segurança, não cria funcionalidades fora do escopo |
| Aprendizado | Compara resultado com hipótese, sugere conexões com conhecimento anterior | Não declara aprendizado onde não há evidência |

**Regra fundamental:** A IA é uma lente, não um cérebro. Ela amplia a capacidade de observação e análise, mas não substitui a consciência do operador humano.

---

## 9. O que NÃO Pode Acontecer

### Violações do Protocolo (críticas — parar imediatamente)

1. **Decisão sem registro:** qualquer decisão de impacto médio ou alto que não seja registrada é uma violação grave. O protocolo não é burocracia — é o que transforma experiência em aprendizado.
2. **Pular a etapa de Hipótese:** decidir sem explicitar o que se acredita que vai acontecer é jogar dados. Mesmo que a decisão esteja correta, o aprendizado se perde.
3. **Ignorar evidência contrária:** se uma decisão foi tomada e depois surgem evidências que a contradizem, a decisão precisa ser revisitada. Manter o rumo por ego é violação.
4. **IA decidindo sozinha:** qualquer automatização de decisão sem supervisão humana direta. A IA pode sugerir, consolidar, alertar — nunca executar escolha com impacto real.
5. **Deixar de registrar um fracasso:** fracassos são o patrimônio mais valioso da Empresa Zero. Esconder ou suavizar um fracasso é roubar aprendizado futuro.
6. **Trabalhar sem diário por mais de 48h:** se o diário ficou dois dias sem atualização, algo está errado na rotina. Parar e reajustar antes de continuar.

### Violações Leves (registrar e corrigir)

1. Observação não categorizada por mais de 24h
2. Decisão BAIXA não registrada por mais de uma semana
3. Hipótese ativa sem revisão por mais de 30 dias
4. RFC aprovada sem atualização dos documentos afetados

---

## 10. Regras de Convivência com a IA

### Como tratar a IA

- **A IA é uma sócia júnior.** Ela tem acesso a muito mais dados que você, mas não tem contexto de vida, intuição, nem responsabilidade. Respeite o que ela traz, mas sempre valide.
- **Seja explícito.** A IA não lê mentes. Quanto mais claro o contexto, melhor a contribuição.
- **Corrija sem cerimônia.** Se a IA errou, aponte o erro. "Isso está errado porque..." é o feedback mais valioso que você pode dar.
- **Não se apoie demais.** Se você perceber que está seguindo sugestões da IA sem pensar, pare. A IA é uma muleta que vira cadeira de rodas se usada sem critério.

### Como a IA deve tratar você

- **Ela pergunta antes de sugerir.** Não assume que você quer uma resposta.
- **Ela admite quando não sabe.** "Não tenho dados suficientes para responder" é uma resposta válida.
- **Ela distingue fato de inferência.** "Os dados mostram X" vs "Isso pode indicar Y".
- **Ela não esconde incerteza.** Se a confiança é baixa, ela diz.
- **Ela não inventa.** Se não encontrou, não inventa. Prefere silêncio a ficção.

### Limites da relação

- A IA não pode simular um ser humano para clientes ou stakeholders
- A IA não pode tomar decisões financeiras sem aprovação explícita
- A IA não pode modificar registros do diário operacional
- A IA não pode acessar dados de clientes sem autorização explícita e registro de auditoria

---

## 11. Como Escala (de 1 para 5 pessoas)

### Fase 1: Pessoa Única (atual)

Todos os papéis são acumulados. A IA é o principal suporte. O diário operacional é a espinha dorsal.

### Fase 2: Duas Pessoas

Divisão natural:
- Pessoa A: Arquiteto + Produtor de Conhecimento (visão, conhecimento, decisões)
- Pessoa B: Engenheiro + Operador de Observação (execução, radar)

Rituais:
- Daily de 10 min pela manhã
- Revisão semanal de 30 min

### Fase 3: Três Pessoas

Divisão:
- Pessoa A: Arquiteto (visão e integridade)
- Pessoa B: Engenheiro (execução)
- Pessoa C: Produtor + Operador (conhecimento e observação)

Rituais:
- Daily de 10 min
- Revisão semanal de 30 min
- RFCs passam a ser revisadas pelo Arquiteto antes de implementadas

### Fase 4: Cinco Pessoas

Estrutura completa com papéis dedicados. Surge a necessidade de:
- Um repositório central de conhecimento acessível a todos
- Rituais de onboarding: como um novo membro aprende os protocolos em 1 semana
- Revisão trimestral de decisões
- Um membro dedicado exclusivamente à operação da IA (treinamento, ajuste, qualidade)

### Princípio de escala

Não adicione pessoas para fazer mais. Adicione pessoas para aprender mais rápido. O tamanho da equipe deve ser proporcional à taxa de aprendizado desejada, não à quantidade de trabalho.
