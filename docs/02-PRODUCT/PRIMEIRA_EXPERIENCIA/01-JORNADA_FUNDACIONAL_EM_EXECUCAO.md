# Jornada Fundacional em Execução

> PROGRAMA 15 — Documento 1 de 10
> Nível operacional: a jornada real do empresário dentro do sistema, do primeiro contato ao primeiro valor percebido

---

## Relatório de execução

- **Descobertas:** o sistema já implementa conversa anônima com 17 perguntas em 5 blocos, micro-reações, interpretação determinística e tela de revelação. O fluxo de criação de conta pós-conversa já existe e funciona.
- **Pressupostos:** a experiência atual está mais próxima da Jornada Fundacional do que a auditoria do Programa 14 sugeria — mas ainda há lacunas críticas nos 5 eixos.
- **Lacunas:** não existe landing page pública, o formato é pergunta→resposta (não conversa fluida), o resumo final são 3 cards técnicos (não linguagem natural), não existe conceito de Apoiador, e o primeiro login mostra tudo.
- **Riscos:** alterar o fluxo de conversa existente pode quebrar a integração com Identity Engine e Orchestrator. Qualquer mudança precisa preservar o contrato atual de `respostas`, `interpretacoes` e `etapa`.
- **Conflitos:** nenhum conflito documental identificado com a Jornada Fundacional ou com a Constituição.
- **Impactos futuros:** a especificação deste documento definirá o comportamento dos próximos 9 documentos. É a fundação operacional do programa.
- **Confirmação de coerência:** coerente com a Jornada Fundacional (Capítulos 2-4), com os 5 eixos do Programa 15, e com a arquitetura existente.

---

## 1. Macrofluxo da Jornada

```
[Fora da Ponte]                    → empresário com problema, buscando solução
       ↓
[1. ENTRADA]                       → aterrissa na página inicial (landing)
       ↓
[2. DIAGNÓSTICO COMO CONVERSA]     → responde perguntas, recebe reações
       ↓
[3. RESUMO EM LINGUAGEM NATURAL]   → recebe entendimento da empresa
       ↓
[4. TRANSIÇÃO APOIADOR → FUNDADOR] → decide criar conta e aprofundar
       ↓
[5. PRIMEIRO LOGIN CURADO]         → vê apenas o necessário para começar
       ↓
[6. CONTINUIDADE]                  → usa, retorna, a Ponte aprende
```

Cada etapa é descrita em detalhes abaixo, com o que o empresário vê, o que ele sente, o que o sistema faz, e o que o sistema NÃO faz.

---

## 2. Etapa 1 — Entrada

### 2.1 Onde ele chega

O empresário chega na raiz da Ponte Digital (`/`) vindo de:
- Google (pesquisou "sistema para pequena empresa", "controlar finanças do negócio")
- Indicação de outro empresário
- Post de Instagram ou Facebook

### 2.2 O que ele vê

Uma página limpa, sem jargão técnico. Nada de "plataforma cognitiva", "inteligência artificial", "machine learning". O que ele vê:

- Uma pergunta no centro: **"Cansou de planilha?"**
- Um subtítulo: *"Responda 5 perguntas sobre seu negócio e descubra o que está passando despercebido."*
- Um botão: **"Descobrir agora"** — sem "criar conta", sem "assinar", sem "começar trial"

Não há:
- Menu de navegação
- Links para "recursos" ou "preços"
- Popup de cookies pedindo permissão antes do conteúdo
- Vídeo de apresentação institucional
- Botão "Entrar" em destaque

### 2.3 O que o sistema faz

- Renderiza página estática (sem necessidade de auth)
- Não cria cookie, não rastreia, não pede nada
- Prepara chamada para iniciar sessão anônima quando ele clicar em "Descobrir agora"

### 2.4 O que o sistema NÃO faz

- Não pede login
- Não pede e-mail
- Não mostra termos de uso antes da hora
- Não redireciona para /login
- Não exibe tutorial

---

## 3. Etapa 2 — Diagnóstico como Conversa

### 3.1 A transição

Ele clica em "Descobrir agora". O sistema:
- Gera um token anônimo (`conv_token`) via cookie httpOnly
- Redireciona para `/conversa`
- A primeira pergunta aparece imediatamente — sem loading screen, sem "preparando diagnóstico"

### 3.2 A experiência (já implementada no código)

O fluxo de 17 perguntas em 5 blocos já existe e deve ser preservado:

| Bloco | Tema | Perguntas | O que desbloqueia |
|-------|------|-----------|-------------------|
| 🧭 Empresa | Segmento, tempo, funcionários, faturamento | 4 | Enquadramento em segmento |
| ⚙️ Operação | Clientes, produtos, estoque, horas | 6 | Eventos/sinais corretos |
| 🧠 Gestão | Decisões, contratação, caixa | 4 | Base para perfil cognitivo |
| ⚠️ Problemas | O que tira o sono, o que se repete | 3 | Prioridade do centro |
| 🎯 Objetivos | Meta 6 meses, o que automatizar | 3 | Critério de priorização |

### 3.3 Micro-reações (já implementadas)

A cada pergunta respondida, o sistema reage com uma frase contextual. Exemplos:
- Resposta: "Tenho uma barbearia há 3 anos" → reação: "Barbearia é um segmento interessante — margem boa, mas cliente fiel é tudo."
- Resposta: "Não controlo fluxo de caixa" → reação: "Isso é mais comum do que parece. Vamos observar isso junto com as próximas respostas."

As micro-reações já existem em `reacoes.ts` e devem ser aperfeiçoadas para soar mais naturais, menos template.

### 3.4 Barra de progresso (já implementada)

Uma barra mostra o bloco atual entre os 5. Não é uma porcentagem genérica — mostra qual bloco ele está e quantos faltam. Exemplo:
```
🧭 Empresa → ⚙️ Operação (você está aqui) → 🧠 Gestão → ⚠️ Problemas → 🎯 Objetivos
```

### 3.5 O que o sistema NÃO faz

- Não pergunta nome, e-mail ou telefone durante a conversa
- Não oferece "pular pergunta" (mas o empresário pode parar e voltar depois — a sessão é preservada por 7 dias)
- Não mostra popups "32% concluído — crie sua conta para salvar"
- Não avalia respostas como "certas" ou "erradas"

---

## 4. Etapa 3 — Resumo em Linguagem Natural

### 4.1 O momento

Após a última pergunta respondida (Bloco 5 — Objetivos, pergunta "O que você gostaria que alguém resolvesse por você?"), o sistema não joga um "parabéns, você completou o diagnóstico!" genérico.

Em vez disso, há uma pausa natural.

### 4.2 O que o sistema faz

O sistema chama `POST /api/conversa/finalizar` (já existe). Este endpoint:
1. Obtém todas as respostas
2. Marca a conversa como concluída
3. Gera interpretações determinísticas (`interpretacoes.ts` — já existe)

A diferença é no que é retornado para o empresário: em vez de 3 cards técnicos ("ponto de atenção", "observação", "alinhamento"), o sistema monta um **resumo corrido em linguagem natural**.

### 4.3 O que o empresário vê

Um texto contínuo, como se alguém tivesse ouvido atentamente e estivesse resumindo:

> "Pelo que você me contou, sua barbearia está há 3 anos na ativa com 2 funcionários. Você sabe que poderia faturar mais, mas sente que o dinheiro some sem explicação — e contratar mais alguém parece arriscado sem ter certeza do caixa.
>
> Dois pontos que chamaram minha atenção: você não tem ideia de qual serviço dá mais lucro (e provavelmente está gastando tempo no que rende menos), e seus clientes chegam mais por indicação do que por qualquer esforço seu — o que é bom, mas significa que você não controla de onde vêm os clientes novos.
>
> Uma coisa que você acertou: seu objetivo de automatizar agendamentos é o caminho certo. É por onde eu começaria no seu lugar.
>
> Ainda não sei como está seu fluxo de caixa real nem quem são seus clientes mais valiosos — mas já sei por onde perguntar."

### 4.4 Estrutura do resumo

| Seção | Conteúdo | Fonte |
|-------|----------|-------|
| 1. O que entendi | Parágrafo com o essencial do negócio | Bloco 1 (Empresa) |
| 2. O que me preocupa | 2-3 pontos de atenção | Bloco 4 (Problemas) + interpretações |
| 3. O que você acertou | 1-2 pontos fortes confirmados | Interpretações (alinhamento) |
| 4. O que ainda não sei | Lacunas honestas | O que o bloco 2-3 não cobriu |
| 5. Próximo passo | Sugestão simples e acionável | Bloco 5 (Objetivos) |

### 4.5 O que aparece depois do resumo

Abaixo do resumo, dois botões de ação:
- **"Quero criar minha conta e continuar"** → leva para `/criar-conta` (já existe)
- **"Guardar e ver depois"** → gera um link único que o empresário pode salvar (ou envia por e-mail se ele quiser)

Importante: **nenhum dos dois botões é "assine agora" ou "escolha seu plano"**. O segundo botão não exige e-mail — apenas gera um link que funciona enquanto o cookie `conv_token` for válido (7 dias).

---

## 5. Etapa 4 — Transição Apoiador → Fundador

### 5.1 O que é "Apoiador"

Apoiador é o estado do empresário que completou o diagnóstico mas **não** criou conta. Ele:
- Existe apenas como cookie `conv_token` + registro `Conversa` com `empresaId: null`
- Pode voltar e ver o resumo novamente (dentro de 7 dias)
- Não tem acesso a CRM, Financeiro, Tarefas, Assistente
- Recebe e-mail de "sentimos sua falta" se não voltar em 7 dias (apenas se optar por informar e-mail)

### 5.2 O que é "Fundador"

Fundador é o empresário que criou conta e vinculou a conversa. Ele:
- Tem `Usuario` + `Empresa` no banco
- A conversa anônima foi vinculada (`conversa.empresaId = empresa.id`)
- O Orchestrator processou a conversa e gerou Identidade Digital + Eventos de Ativação
- Acessa a Plataforma Cognitiva com escopo curado

### 5.3 O sinal de transição

O momento da transição é decidido pelo empresário, não pelo sistema. O sistema apenas oferece o convite:

**"Você já tem um retrato interessante do seu negócio. Quer ver como a Ponte pode te ajudar a agir sobre isso?"**

O convite aparece:
- No final do resumo (botão "Quero criar minha conta e continuar")
- Se ele voltar depois de alguns dias, o convite é contextual: "Da última vez, você descobriu que não controla o fluxo de caixa. Quer ver como podemos resolver isso juntos?"

### 5.4 O que NÃO muda na transição

- O resumo que ele viu continua disponível
- As respostas que ele deu não são perdidas
- A conversa não recomeça
- As micro-reações que ele recebeu continuam valendo

A transição é **aditiva**: ele ganha acesso a mais coisas, sem perder o que já tinha.

---

## 6. Etapa 5 — Primeiro Login Curado

### 6.1 O momento do cadastro

Ele clica em "Quero criar minha conta e continuar". O formulário `/criar-conta` (já existe) pede:
- Nome
- Nome da empresa
- E-mail
- Senha

### 6.2 O que o sistema faz

`POST /api/auth/criar-conta` (já existe) executa:
1. Cria usuário no Supabase Auth
2. Cria Empresa no banco
3. Vincula conversa anônima à empresa
4. Dispara `processarCadastro()` no Orchestrator
5. Gera Identidade Digital + Eventos de Ativação

### 6.3 O primeiro login — o que ele vê

Após criar conta, ele é redirecionado para `/dashboard`. Mas o dashboard que ele vê **não é o dashboard completo de um usuário avançado**.

O que ele vê:

1. **Um banner de boas-vindas contextual:** "Bem-vindo, [nome]. Com base no que você me contou, comecei a organizar suas prioridades."

2. **Centro de Decisão (simplificado):** mostra 1-2 itens, não 10. Os itens são baseados nas respostas do diagnóstico:
   - Se ele disse que não controla fluxo de caixa → item: "Ainda não sei como entra e sai o dinheiro da sua empresa. Esse é o primeiro passo."
   - Se ele disse que cliente chega por indicação → item: "Clientes novos estão chegando, mas você não sabe de onde. Que tal começar a registrar?"

3. **Sidebar reduzida:** só mostra os módulos que fazem sentido para ele agora:
   - 🏠 Início (dashboard)
   - 💬 Assistente
   - Os demais módulos (CRM, Financeiro, Tarefas, Conhecimento, etc.) aparecem **acinzentados** com um texto: "Disponível em breve" ou são organizados em uma seção "Outros módulos" colapsada

4. **O Assistente:** acessível e já contextualizado. Se ele perguntar algo, o Assistente já tem o contexto do diagnóstico.

### 6.4 A progressão por maturidade

Conforme o empresário usa a Ponte, novos módulos são revelados:

| Evento | O que desbloqueia |
|--------|-------------------|
| Primeiro login | Dashboard + Assistente + Centro de Decisão (2 itens) |
| Primeira ação concluída | Tarefas |
| Primeiro feedback | Conhecimento |
| 3 dias de uso | CRM (visão simples) |
| 7 dias de uso | Financeiro |
| Primeira decisão registrada | Módulos completos |

Essa progressão é guiada pelo `EventoAtivacao` (já existe no schema) e pelo `founder-activation-engine.ts` (já existe).

---

## 7. Etapa 6 — Continuidade

Após o primeiro login curado, o empresário não está mais na "primeira experiência". Ele entrou no ciclo de uso contínuo.

A continuidade é garantida por:
- **Sessão preservada:** o cookie `conv_token` original não expira após o cadastro — ele é mantido como referência
- **Contexto retido:** tudo que ele respondeu está na Identidade Digital
- **Notificações:** alertas quando algo relevante acontece (cliente sem contato, prazo de tarefa)
- **Redescoberta:** se ele não volta por 7 dias, recebe um e-mail "sua empresa ainda está esperando você"

---

## 8. O que NÃO muda na arquitetura

Esta jornada operacionaliza a Jornada Fundacional **sem alterar a arquitetura**. O que muda:

| O que muda | Como muda |
|------------|-----------|
| Landing page | Nova página na raiz (hoje redireciona para /dashboard) |
| Resumo final | Novo formato de saída (interpretações → texto corrido) |
| Primeiro login | Filtro no Experience Engine (escopo curado) |
| Sidebar | Estado "bloqueado/em breve" para módulos não liberados |
| Apoiador | Modelagem conceitual (sem novo schema — apenas Conversa.empresaId=null) |

O que **NÃO** muda:
- Schema do Prisma
- Contratos de API
- Fluxo de conversa
- Engines existentes
- ADRs
- Constituição

---

## 9. Verificação de coerência

| Requisito | Status | Observação |
|-----------|--------|------------|
| Não parece cadastro | ✓ | Primeiro contato não pede cadastro |
| Não parece formulário | ✓ | Micro-reações + transições suaves |
| Não exige treinamento | ✓ | Zero tutorial |
| Entrega valor cedo | ✓ | Resumo ao final do diagnóstico |
| Reduz ansiedade | ✓ | "Você não está quebrado" — tom acolhedor |
| Constrói confiança | ✓ | Reações contextuais mostram que ouviu |
| Produz contexto útil | ✓ | Respostas viram Identidade Digital |
| Preserva patrimônio cognitivo | ✓ | Conversa anônima vinculável |

---

*Documento concluído. Avançando para Documento 2.*
