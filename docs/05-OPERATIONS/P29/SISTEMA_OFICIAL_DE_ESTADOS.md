# SISTEMA OFICIAL DE ESTADOS — Matriz Completa de Estados por Tela

> **Documento P29.3** — Arquiteto de Superficie Cognitiva
> Data: 26/07/2026 | Status: Oficial

---

## SUMARIO

1. [Introducao aos 13 Estados Obrigatorios](#1-introducao-aos-13-estados-obrigatorios)
2. [Matriz Geral de Estados](#2-matriz-geral-de-estados)
3. [Detalhamento por Tela — Landing](#3-detalhamento-por-tela)
4. [Detalhamento por Tela — Diagnostico](#4-detalhamento-por-tela)
5. [Detalhamento por Tela — Resumo](#5-detalhamento-por-tela)
6. [Detalhamento por Tela — Criar Conta](#6-detalhamento-por-tela)
7. [Detalhamento por Tela — Login](#7-detalhamento-por-tela)
8. [Detalhamento por Tela — Dashboard](#8-detalhamento-por-tela)
9. [Detalhamento por Tela — Assistente](#9-detalhamento-por-tela)
10. [Detalhamento por Tela — CRM](#10-detalhamento-por-tela)
11. [Detalhamento por Tela — Clientes](#11-detalhamento-por-tela)
12. [Detalhamento por Tela — Centro de Decisao](#12-detalhamento-por-tela)
13. [Detalhamento por Tela — Financeiro](#13-detalhamento-por-tela)
14. [Detalhamento por Tela — Conhecimento](#14-detalhamento-por-tela)
15. [Detalhamento por Tela — Aprendizados](#15-detalhamento-por-tela)
16. [Detalhamento por Tela — Tarefas](#16-detalhamento-por-tela)
17. [Detalhamento por Tela — Configuracoes](#17-detalhamento-por-tela)
18. [Regras de Transicao entre Estados](#18-regras-de-transicao-entre-estados)
19. [Estados Globais (Aplicativos a Qualquer Tela)](#19-estados-globais)
20. [Checklist de Implementacao de Estados](#20-checklist-de-implementacao-de-estados)

---

## 1. Introducao aos 13 Estados Obrigatorios

### 1.1 Os 13 Estados

Toda tela da Ponte Digital DEVE implementar todos os estados abaixo que forem aplicaveis. Estados marcados como "N/A" para uma tela especifica sao excecoes justificadas.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     OS 13 ESTADOS OBRIGATORIOS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  E01 — INICIAL        A tela acabou de carregar, IA pronta                  │
│  E02 — VAZIO          Sem dados anteriores, sem historico                   │
│  E03 — CARREGANDO     Dados sendo obtidos (loading inteligente)             │
│  E04 — PENSANDO       IA processando informacoes (com texto do processo)    │
│  E05 — APRENDENDO     IA formou nova hipotese (mapa sendo atualizado)       │
│  E06 — SUCESSO        Acao concluida (com proximo passo)                    │
│  E07 — ERRO           Algo deu errado (com solucao)                         │
│  E08 — DUVIDA         IA nao tem certeza (com explicacao)                   │
│  E09 — CONFIRMACAO    Pedindo confirmacao ao empresario                     │
│  E10 — EVOLUCAO       Mostrando mudanca desde ultima visita                 │
│  E11 — BLOQUEADO      Empresario nao pode agir (com explicacao)             │
│  E12 — HISTORICO      Mostrando versao anterior de algo                     │
│  E13 — ARQUIVADO      Dado preservado mas nao ativo                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Formato de Cada Entrada na Matriz

Cada celula da matriz segue o formato:

```
[O que o empresario ve] → [comportamento/acao da IA]
```

Exemplo:
> Saudacao personalizada ("Bom dia, Joao") + BriefingCard com resumo do dia → IA prepara contexto completo da empresa

---

## 2. Matriz Geral de Estados

### 2.1 Matriz Resumo

Legenda: ✅ = implementado | ⬜ = N/A (nao se aplica) | 🔲 = aplicavel mas nao implementado

| Tela | E01 Inicial | E02 Vazio | E03 Carregando | E04 Pensando | E05 Aprendendo | E06 Sucesso | E07 Erro | E08 Duvida | E09 Confirmacao | E10 Evolucao | E11 Bloqueado | E12 Historico | E13 Arquivado |
|------|-------------|-----------|----------------|--------------|----------------|-------------|----------|------------|-----------------|--------------|---------------|---------------|---------------|
| Landing | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Diagnostico | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Resumo | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Criar Conta | ✅ | ⬜ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Login | ✅ | ⬜ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ |
| Assistente | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ |
| CRM | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ✅ | ⬜ | ✅ | ⬜ | ⬜ |
| Clientes | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ |
| Centro Decisao | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ✅ | ⬜ | ✅ | ⬜ |
| Financeiro | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ |
| Conhecimento | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ✅ | ⬜ | ✅ | ✅ |
| Aprendizados | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Tarefas | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Configuracoes | ✅ | ⬜ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

---

## 3. Detalhamento por Tela — Landing (`/`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Tela carregou, pronta para interacao | Hero: "Cansou de planilha?" + subtitulo "Responda 5 perguntas..." + CTA "Descobrir agora" + selo "Gratuito. Sem cadastro." | Nada (tela estatica) | Hero, CTA, texto de apoio, logo | Pronta para clique. CTA com efeito hover. |
| **E07 Erro** | Erro de rede ou CDN | Mensagem de erro generica do navegador | Nada | N/A (o browser que gerencia) | Extremamente raro (pagina estatica). Se CDN falhar, pagina nao renderiza. |

### Estados N/A

| Estado | Justificativa |
|--------|---------------|
| E02 Vazio | Landing nao tem "dados" — e uma pagina de entrada, nao de conteudo |
| E03 Carregando | Pagina estatica renderizada no servidor — sem loading |
| E04 Pensando | Nao ha processamento de IA na landing |
| E05 Aprendendo | Nao ha aprendizado na landing |
| E06 Sucesso | Nao ha acao a concluir (o CTA leva para fora) |
| E08 Duvida | Nao ha incerteza — mensagem clara |
| E09 Confirmacao | Nao ha o que confirmar |
| E10 Evolucao | Nao ha historico |
| E11 Bloqueado | Tela publica |
| E12 Historico | Nao ha historico |
| E13 Arquivado | Nao ha dados |

---

## 4. Detalhamento por Tela — Diagnostico (`/conversa`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Tela carregou, primeira pergunta pronta | Logo "Ponte Digital" + subtitulo "Conhecendo sua empresa" + ProgressBar em 0% + primeira pergunta no QuestionCard + "Enviar" desabilitado ate resposta | IA prepara primeira questao do bloco 1, aguarda input | `QuestionCard`, `ProgressBar`, logo | Input vazio, botao desabilitado, foco automatico no input |
| **E02 Vazio** | Primeira vez do usuario (sessao nova) | Saudacao "Vamos comecar?" + explicacao do diagnostico + primeira pergunta | IA gera primeira pergunta generica mas com tom acolhedor | `QuestionCard` com saudacao inicial | Mesma renderizacao do estado Inicial, mas com texto introdutorio |
| **E03 Carregando** | Fetch inicial para `/api/conversa` | Spinner centralizado + texto "Iniciando conversa..." | Nada (aguardando resposta da API) | Spinner animado | Nao ha interacao ate o fetch completar. Se >5s, exibir "Isso esta demorando mais que o normal..." |
| **E04 Pensando** | IA processou a resposta e esta gerando reacao | Indicador "IA esta processando sua resposta..." (animacao de tres pontos) | IA interpreta a resposta, gera reacao emocional/cognitiva, prepara proxima pergunta | Indicador de pensamento | 1-3s tipico. Se >5s, exibir "Ainda estou pensando... boas respostas levam tempo." |
| **E05 Aprendendo** | IA formou nova hipotese sobre a empresa | MicroReaction com texto de descoberta: "Interessante! Isso me diz que sua empresa..." | IA registra internamente uma nova hipotese sobre a empresa baseada na resposta | `MicroReaction` | Reacao exibida por 5s, depois avanca automaticamente. Empresario pode clicar "Continuar agora" para pular. |
| **E06 Sucesso** | Resposta enviada com sucesso, reacao sendo exibida | MicroReaction com reacao da IA + timer 5s + botao "Continuar agora" | IA aguarda o timer ou clique do usuario para avancar | `MicroReaction`, timer, botao "Continuar agora" | Transicao automatica apos 5s. Botao "Continuar agora" acelera. |
| **E07 Erro** | Erro ao enviar resposta ou iniciar conversa | Input com borda vermelha + mensagem "Erro ao enviar resposta. Tente novamente." | Nenhuma — aguarda retry | Mensagem de erro, input destacado | Botao "Tentar novamente" reenviar a resposta. Dados do input preservados. |

### Transicoes entre Estados no Diagnostico

```
INICIAL → [empresario digita resposta] → PENSANDO (1-3s) → APRENDENDO (5s) → 
SUCESSO (reacao) → [auto/clique] → INICIAL (proxima pergunta) → ... → 
ULTIMA PERGUNTA → PENSANDO → APRENDENDO → SUCESSO → RESUMO

QUALQUER ESTADO → ERRO (se fetch falhar) → [retry] → ESTADO ANTERIOR
```

---

## 5. Detalhamento por Tela — Resumo (integrado ao Diagnostico, estado concluido)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Resumo carregado e exibido | RevelacaoCard com 3 interpretacoes (ponto de atencao, observacao, alinhamento) + ResumoNatural em 5 secoes (se disponivel) | IA finalizou o processamento, apresentou o resumo | `RevelacaoCard`, secoes do resumo | Tela completa, scrollavel. Empresario le as interpretacoes. |
| **E06 Sucesso** | Diagnostico concluido, CTA visivel para criar conta | Texto persuasivo "Quer que eu te ajude a resolver isso?" + CTA "Quero criar minha conta e continuar" | IA aguarda decisao do empresario | CTA, texto persuasivo, link `/criar-conta` | Empresario pode ler, refletir, clicar quando quiser. |
| **E07 Erro** | Erro ao finalizar conversa | Mensagem "Erro ao finalizar conversa. Tente novamente." + botao de retry | Nenhuma | Mensagem de erro, botao retry | Empresario clica "Tentar novamente" → refaz `POST /api/conversa/finalizar` |

### Estados N/A

| Estado | Justificativa |
|--------|---------------|
| E02 Vazio | Resumo so existe se o diagnostico foi concluido — nunca esta vazio |
| E03 Carregando | O carregamento ocorre no estado Pensando do Diagnostico |
| E04 Pensando | O processamento ja terminou |
| E05 Aprendendo | O aprendizado ja ocorreu durante o diagnostico |
| E08 Duvida | As interpretacoes sao apresentadas com confianca (mesmo que internamente haja duvida) |
| E09 Confirmacao | Nao ha confirmacao a pedir |
| E10 Evolucao | Primeira vez — nao ha historico |
| E11 Bloqueado | Tela publica |
| E12 Historico | Primeira vez |
| E13 Arquivado | Nao se aplica |

---

## 6. Detalhamento por Tela — Criar Conta (`/criar-conta`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Tela carregou, formulario pronto | Titulo "Salvar minha Identidade Digital" + subtitulo explicativo + formulario com 5 campos (nome, empresa, email, senha, confirmar) + CTA "Salvar e acessar" | IA aguarda preenchimento | Formulario, inputs, labels, CTA | Foco no primeiro campo. Validacao client-side ativa. |
| **E03 Carregando** | Verificando se ha sessao de diagnostico valida | Spinner + texto "Verificando sua conversa..." | Nenhuma (verificacao de sessao) | Spinner | Fetch para `/api/conversa`. Se nao houver sessao, redirect para `/conversa`. |
| **E06 Sucesso** | Conta criada com sucesso | Redirect para `/dashboard` + saudacao personalizada | Identidade Digital vinculada ao diagnostico | Redirect (nao ha tela de sucesso intermediaria) | `router.push('/dashboard')` |
| **E07 Erro** | Erro ao criar conta | Mensagem de erro especifica no topo do formulario: "Email ja cadastrado", "Erro ao criar conta", etc. | Nenhuma | Mensagem de erro, formulario ainda visivel | Campos preservados (exceto senha). Empresario pode corrigir e reenviar. |

### Estados N/A

| Estado | Justificativa |
|--------|---------------|
| E02 Vazio | Formulario sempre tem campos para preencher |
| E04 Pensando | Nao ha processamento de IA |
| E05 Aprendendo | Nao ha aprendizado |
| E08 Duvida | Validacoes sao claras |
| E09 Confirmacao | Submit = confirmacao |
| E10 Evolucao | Primeira vez |
| E11 Bloqueado | Tela publica |
| E12 Historico | Nao se aplica |
| E13 Arquivado | Nao se aplica |

---

## 7. Detalhamento por Tela — Login (`/login`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Formulario de login pronto | Titulo "Entrar" + subtitulo + campos email/senha + link "Esqueci a senha" + CTA "Entrar" | Nenhuma | Formulario, labels, CTA, link | Foco no email. Validacao Zod client-side. |
| **E03 Carregando** | Autenticacao em andamento | Botao "Entrando..." com spinner + campos desabilitados | Nenhuma | Spinner no botao | `signInWithPassword` do Supabase em andamento |
| **E06 Sucesso** | Login bem-sucedido | Redirect para `/dashboard` (ou redirect salvo) | IA prepara contexto para o dashboard | Redirect | `router.push(redirect)` |
| **E07 Erro** | Credenciais invalidas ou erro de rede | Mensagem "E-mail ou senha invalidos." no topo do formulario | Nenhuma | Mensagem de erro | Campos preservados (seguranca: senha e limpa). Empresario tenta novamente. |

### Estados N/A

| Estado | Justificativa |
|--------|---------------|
| E02 Vazio | Formulario sempre tem campos |
| E04 Pensando | Nao ha IA |
| E05 Aprendendo | Nao ha aprendizado |
| E08 Duvida | Mensagens de erro sao claras |
| E09 Confirmacao | Submit = confirmacao |
| E10 Evolucao | Login e sempre igual |
| E11 Bloqueado | Tela publica |
| E12 Historico | Nao se aplica |
| E13 Arquivado | Nao se aplica |

---

## 8. Detalhamento por Tela — Dashboard (`/dashboard`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Dashboard carregado com dados | Saudacao personalizada ("Bom dia, Joao") + subtitulo com foco do dia | IA executou pipeline cognitivo completo e gerou Experience pronta | Titulo, saudacao, cards | Tudo renderizado, scrollavel, interativo |
| **E02 Vazio** | Empresa nova, sem diagnosticos, sem dados | "Bem-vindo a Ponte Digital" + 4 PriorityCards com proximos passos (diagnostico, recomendacoes, jornada, conhecimento) | IA detecta que e primeira vez e prepara onboarding simplificado | `PriorityCard`, banner de boas-vindas | Nao ha dados cognitivos — apenas os 4 cards de acao |
| **E03 Carregando** | Dados sendo carregados (multiplos fetches) | Esqueletos de loading para cada secao (cards cinza com animacao de pulso) | IA executando pipeline cognitivo (Context → Identity → Memory → Knowledge → Decision → Evolution → Health → Journey → Action → Experience) | Skeleton components | Cada card carrega independentemente. O que termina primeiro aparece primeiro. |
| **E04 Pensando** | IA esta processando contexto (ciclo cognitivo) | Card central "IA esta analisando sua empresa..." + texto do processo: "Buscando memorias... Analisando conhecimentos... Priorizando decisoes..." | IA percorrendo o pipeline cognitivo completo | Card de processamento, indicador de etapa | Breve (<3s tipico). Se >5s, exibir "Sua empresa tem muitos dados — estou organizando tudo." |
| **E05 Aprendendo** | IA formou novo conhecimento desde a ultima visita | Card destacado "Novo insight disponivel" com resumo do que foi aprendido | IA registrou nova hipotese ou conhecimento validado | Card de destaque, notificacao | Insight fica visivel ate o empresario interagir ou navegar. |
| **E06 Sucesso** | Acao concluida (ex: insight lido, tarefa feita) | Card "Insight registrado" ou "Acao concluida" com opcao "Ver detalhes" | IA registra a acao, atualiza estado cognitivo | Card de confirmacao, CTA secundario | Feedback sutil, nao intrusivo. |
| **E07 Erro** | Erro ao carregar dados do dashboard | Card especifico mostra "Erro ao carregar [componente]" + botao "Tentar novamente" | IA tenta novamente ou degrada graciosamente | Mensagem de erro, botao retry | Erro parcial: so o card afetado mostra erro. Erro total: mensagem generica. |
| **E10 Evolucao** | Mudancas desde a ultima visita | Se >7 dias: Banner "Veja o que mudou desde sua ultima visita" no topo + cards destacam diferencas | IA compara estado atual vs ultimo estado registrado | Banner de evolucao, cards com indicadores de mudanca | Banner pode ser dispensado. Mudancas ficam visiveis nos cards. |

### Transicoes entre Estados no Dashboard

```
INICIAL (primeira visita)
  → VAZIO (se empresa nova, sem dados)
  → CARREGANDO (multiplos fetches)
  → INICIAL (dados prontos)
  → PENSANDO (ciclo cognitivo em andamento — raro, tipicamente rapido)
  → APRENDENDO (se IA descobriu algo novo)
  → SUCESSO (se empresario agiu)
  → ERRO (se fetch falhou)

RETORNO (>7 dias)
  → CARREGANDO
  → EVOLUCAO (se houver mudancas detectadas)
  → INICIAL
```

---

## 9. Detalhamento por Tela — Assistente (`/assistente`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Chat carregado, IA pronta | Saudacao do assistente + contexto atual da empresa + input de mensagem | IA carregou contexto cognitivo completo (identidade, memorias, conhecimentos, aprendizados) | `Chat`, input, historico | Input habilitado, IA pronta para responder. |
| **E02 Vazio** | Primeira vez no assistente (pouco contexto) | Saudacao generica "Ola! Como posso ajudar?" + sugestoes de perguntas iniciais | IA tem pouco ou nenhum contexto sobre a empresa (ou usuario anonimo) | Chat com sugestoes, input | Sugestoes de perguntas ("O que voce sabe sobre minha empresa?", "Como funciona o diagnostico?") |
| **E03 Carregando** | Contexto sendo carregado | Indicador "Preparando seu contexto..." + esqueleto de chat | IA buscando `obterAssistenteExperience`, `obterEstadoCognitivoCompleto`, `decidirContexto` | Skeleton do chat, texto de carregamento | Breve (<2s). Se usuario nao autenticado, carregamento e mais rapido (sem contexto). |
| **E04 Pensando** | IA processando pergunta do empresario | Indicador "IA esta pensando..." com animacao de tres pontos + possivel texto intermediario ("Analisando seus dados...") | IA consulta contexto, memorias, conhecimentos, gera resposta via Anthropic API | Animacao de pensamento, texto do processo | 2-5s tipico. Se >10s, exibir "Estou pesquisando profundamente... sua pergunta exige analise." |
| **E05 Aprendendo** | IA aprendeu algo novo com a conversa | Card ou mensagem "Aprendi algo novo sobre sua empresa!" + resumo do que foi aprendido | IA registra novo aprendizado via `aprendizado-service.ts`, atualiza Identity Engine | Mensagem de aprendizado, link para `/aprendizados` | Aparece como parte da resposta da IA, nao como notificacao separada. |
| **E06 Sucesso** | Resposta gerada e exibida | Resposta completa no chat, com fontes/citacoes quando aplicavel | IA concluiu a geracao, resposta exibida | Mensagem da IA no chat | Empresario le e pode fazer nova pergunta. |
| **E07 Erro** | Falha na geracao da resposta | Mensagem "Nao foi possivel obter resposta. Tente novamente." | IA registra erro, possivelmente tenta novamente | Mensagem de erro, botao retry | Input reabilitado para nova tentativa. |
| **E08 Duvida** | IA nao tem certeza da resposta | Resposta com qualificacao: "Nao tenho certeza absoluta, mas com base nos dados disponiveis..." + explicacao do que falta | IA identifica que a confianca esta abaixo do limiar, mas ainda assim gera resposta com ressalvas | Resposta com disclaimer de confianca | Empresario pode pedir mais detalhes ou corrigir a IA. |
| **E11 Bloqueado** | Rate limit atingido (plano basico) | Mensagem "Voce atingiu o limite de mensagens para hoje." + info do plano | IA bloqueia nova pergunta | Mensagem de bloqueio, upsell do plano | Input desabilitado. Plano BASICO = 0 msg/dia, PROFISSIONAL = 50, ENTERPRISE = 500. |

### Fluxo de Estados no Assistente

```
INICIAL → [empresario digita] → PENSANDO → [APRENDENDO] → SUCESSO
                                                          ou
                                                       → DUVIDA
                                                          ou
                                                       → ERRO → [retry] → PENSANDO

Se BLOQUEADO: input desabilitado ate reset do rate limit (diario)
```

---

## 10. Detalhamento por Tela — CRM (`/crm`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Pipeline carregado com leads | Kanban com colunas de estagio (Novo, Em Contato, Qualificado, Proposta, Fechado) + cards de leads em cada coluna | IA carregou dados via `lead.service` | Pipeline, colunas, cards | Leads visiveis, drag-and-drop entre estagios |
| **E02 Vazio** | Nenhum lead cadastrado | Mensagem "Nenhum lead ainda. Crie seu primeiro lead." + CTA "Criar lead" | IA detecta lista vazia, sugere primeiro cadastro | Mensagem de vazio, CTA | CTA leva a modal de criacao de lead |
| **E03 Carregando** | Leads sendo carregados | Esqueletos de cards nas colunas (cards cinza sem conteudo) | IA consultando `lead.service` | Skeleton cards | Cada coluna carrega independentemente |
| **E06 Sucesso** | Acao concluida (lead movido, criado, convertido) | Feedback sutil: card move de coluna (drag) ou modal fecha apos criacao | IA executa `lead.service` de acordo com a acao | Animacao de transicao | Lead criado: aparece na coluna "Novo". Lead movido: animacao de voo entre colunas. Lead convertido: redireciona para `/clientes`. |
| **E07 Erro** | Erro ao carregar leads ou executar acao | Mensagem "Erro ao carregar pipeline" ou "Erro ao mover lead. Tente novamente." | IA registra erro, lead permanece no estado anterior | Mensagem de erro, toast | Rollback visual: lead volta para posicao original |
| **E09 Confirmacao** | Confirmacao antes de acao destrutiva | Modal de confirmacao: "Tem certeza que deseja excluir este lead?" + botoes "Cancelar" / "Confirmar" | IA aguarda confirmacao | Modal de confirmacao | Acao so executada apos confirmacao |
| **E11 Bloqueado** | Modulo bloqueado para o plano | Item na sidebar mostra "bloqueado". Se URL direta: "Modulo disponivel no plano PROFISSIONAL." | IA nao carrega dados | Mensagem de bloqueio, upsell | Nenhuma acao permitida. |

---

## 11. Detalhamento por Tela — Clientes (`/clientes`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Lista de clientes carregada | Tabela/lista de clientes com busca, filtros, ordenacao + stats (total, ativos) | IA carregou `cliente.service` (listar + stats) | Tabela, busca, filtros, stats | Clientes paginados, scroll infinito |
| **E02 Vazio** | Nenhum cliente cadastrado | Mensagem "Nenhum cliente ainda." + CTA "Converter lead" (se houver leads) ou "Criar cliente" | IA detecta lista vazia, sugere acao | Mensagem de vazio, CTA | CTA leva para `/crm` (se houver leads) ou modal de criacao |
| **E03 Carregando** | Clientes sendo carregados | Esqueletos de linhas na tabela | IA consultando `cliente.service` | Skeleton rows | Busca e filtros desabilitados ate carregar |
| **E06 Sucesso** | Acao concluida (criar, buscar, filtrar) | Cliente aparece na lista / resultados de busca exibidos / filtro aplicado | IA retorna dados apos acao | Lista atualizada | Feedback visual sutil |
| **E07 Erro** | Erro ao carregar lista | Mensagem "Erro ao carregar clientes. Tente novamente." | IA registra erro | Mensagem de erro, botao retry | Tabela vazia com erro |
| **E11 Bloqueado** | Modulo bloqueado | Mesmo comportamento do CRM | IA nao carrega dados | Mensagem de bloqueio | — |

---

## 12. Detalhamento por Tela — Centro de Decisao (`/centro-decisao`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Decisoes carregadas e priorizadas | Lista de decisoes priorizadas por urgencia com: titulo, descricao, motivo, prioridade (URGENTE/ALTA/MEDIA/BAIXA), confianca, acoes sugeridas + ScoreBar com metricas | IA executou `gerarDecisoes`, `classificarDecisoesPorPrioridade`, `enriquecerDecisoesComTrust`, `filtrarDecisoesPorRelevancia` | Cards de decisao, badges, ScoreBar, grafico de urgencia | Decisoes ordenadas por prioridade. Empresario pode clicar em qualquer uma para ver detalhes. |
| **E02 Vazio** | Nenhuma decisao gerada (poucos dados) | Mensagem "Ainda nao ha decisoes suficientes. Continue usando a plataforma para que possamos identificar prioridades." + CTA "Ir para o Assistente" | IA nao tem dados suficientes para gerar decisoes | Mensagem de vazio, CTA | CTA leva para Assistente para iniciar conversa |
| **E03 Carregando** | Decisoes sendo geradas | Esqueletos de cards de decisao | IA executando pipeline: `obterEstadoCognitivoCompleto` → `gerarDecisoes` → classificar → enriquecer → filtrar | Skeleton cards | 2-5s tipico. CPUs mais lentas podem levar mais. |
| **E04 Pensando** | IA esta processando sinais e gerando decisoes | Card central "Analisando sinais da sua empresa..." com lista de etapas: "Identificando padroes... Priorizando acoes... Calculando urgencia..." | IA percorrendo o pipeline completo de decisoes | Card de processamento, etapas | Etapas sao exibidas em tempo real a medida que sao concluidas |
| **E05 Aprendendo** | IA descobriu novo padrao ao gerar decisoes | Card "Novo padrao identificado!" com descricao do padrao e link para `/conhecimento` | IA registrou novo padrao como hipotese em `Hipotese` | Card de descoberta | Empresario pode revisar e validar o padrao |
| **E06 Sucesso** | Acao concluida (ex: decisao lida, acao tomada) | Card "Decisao registrada" ou toast de confirmacao | IA registra que a decisao foi visualizada/considerada | Toast, feedback sutil | — |
| **E07 Erro** | Erro ao gerar decisoes | Mensagem "Erro ao analisar sinais. Tente novamente." | IA registra erro, tenta novamente | Mensagem de erro, botao retry | Se falha parcial: algumas decisoes carregam, outras mostram erro |
| **E08 Duvida** | IA tem baixa confianca em algumas decisoes | Decisoes com badge "Confianca baixa" + texto "Esta decisao tem baixa confianca porque faltam dados de [dominio]." | IA identifica que a confianca esta abaixo do limiar para aquela decisao | Badge de confianca, explicacao | Decisao ainda visivel, mas com ressalva |
| **E10 Evolucao** | Mudanca nas decisoes desde ultima visita | Indicador "Novas decisoes desde sua ultima visita" nas decisoes que mudaram | IA comparou decisoes atuais vs ultimo estado | Badge "Nova", indicador de mudanca | Decisoes novas sao destacadas |
| **E12 Historico** | Mostrando versao anterior de decisoes | Opcao "Ver decisoes anteriores" que mostra snapshot do estado passado | IA recupera estado anterior do `HistoricoSinal` | Toggle de visao, dados anteriores | Nao altera decisoes atuais — e apenas visualizacao |

### Transicoes entre Estados no Centro de Decisao

```
CARREGANDO → PENSANDO (IA processando) → [APRENDENDO] → INICIAL (decisoes prontas)
                                                                   ↓
                                                            DUVIDA (se baixa confianca)
                                                                   ↓
                                                            SUCESSO (acao tomada)
                                                                   ↓
                                                            EVOLUCAO (se retorno com mudancas)
                                                                   ↓
                                                            HISTORICO (se ver versao anterior)

CARREGANDO → ERRO (se falha)
```

---

## 13. Detalhamento por Tela — Financeiro (`/financeiro`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Lista de transacoes + resumo financeiro | Tabela de transacoes (receita/despesa) com filtros (categoria, data, tipo) + card de resumo (saldo, receita total, despesa total) | IA carregou `transacao.service` (listar + resumo financeiro) | Tabela, filtros, card de resumo | Transacoes paginadas, scroll infinito |
| **E02 Vazio** | Nenhuma transacao cadastrada | Mensagem "Nenhuma transacao ainda. Registre sua primeira receita ou despesa." + CTA "Criar transacao" | IA detecta lista vazia, sugere primeiro registro | Mensagem de vazio, CTA | CTA abre modal de criacao de transacao |
| **E03 Carregando** | Transacoes sendo carregadas | Esqueletos de linhas na tabela + card de resumo carregando | IA consultando `transacao.service` | Skeleton rows, skeleton card | Filtros desabilitados ate carregar |
| **E06 Sucesso** | Acao concluida (criar, filtrar, marcar pago) | Toast de confirmacao "Transacao criada" / "Transacao marcada como paga" | IA executa acao no `transacao.service` | Toast, lista atualizada | Lista reflete a mudanca imediatamente |
| **E07 Erro** | Erro ao carregar ou executar acao | Mensagem "Erro ao carregar transacoes. Tente novamente." / "Erro ao criar transacao." | IA registra erro | Mensagem de erro, botao retry | Acao reverte ao estado anterior |
| **E11 Bloqueado** | Modulo bloqueado | Mensagem de bloqueio padrao | IA nao carrega dados | Mensagem de bloqueio | — |

---

## 14. Detalhamento por Tela — Conhecimento (`/conhecimento`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Biblioteca de conhecimento carregada | Sumario de conhecimentos + filtros (busca, categoria, status, ordenacao) + lista de `KnowledgeCard` + timeline de eventos cognitivos | IA carregou dados de `ConhecimentoValidado`, `Hipotese`, `Evidencia`, `MemoriaCognitiva` | `KnowledgeSummary`, `KnowledgeFilters`, `KnowledgeCard`, `KnowledgeTimeline`, `KnowledgeTag` | Conhecimentos exibidos com score de confianca, status derivado |
| **E02 Vazio** | Nenhum conhecimento gerado ainda | Mensagem "Ainda nao ha conhecimentos registrados. Quanto mais voce usar a plataforma, mais conhecimentos vamos construir." + CTA "Ir para o Assistente" | IA detecta que nao ha `ConhecimentoValidado` com score ≥20 | Mensagem de vazio, CTA | CTA leva para Assistente para iniciar interacao |
| **E03 Carregando** | Conhecimentos sendo carregados | Esqueletos de `KnowledgeCard` + sumario carregando | IA consultando multiplas tabelas (ConhecimentoValidado, Hipotese, Evidencia, MemoriaCognitiva) | Skeleton cards, skeleton summary | 3-7s (multiplas consultas). Pode ser mais lento se muitos dados. |
| **E04 Pensando** | IA esta processando conhecimentos | Indicador "Organizando conhecimentos..." | IA agrupando, classificando e derivando status dos conhecimentos | Indicador de processamento | Breve (<2s — processamento local) |
| **E05 Aprendendo** | Novo conhecimento validado desde ultima visita | Card destacado "Novo conhecimento disponivel" com tag "NOVO" | IA detectou que um `ConhecimentoValidado` novo foi criado ou um existente mudou de status | Card destacado, tag "NOVO" | Conhecimento novo fica destacado ate o empresario interagir |
| **E06 Sucesso** | Acao concluida (visualizar, filtrar, buscar) | Filtros aplicados / resultados de busca exibidos | IA retorna dados conforme filtro | Lista filtrada | Feedback visual sutil |
| **E07 Erro** | Erro ao carregar biblioteca | Mensagem "Erro ao carregar conhecimentos. Tente novamente." | IA registra erro | Mensagem de erro, botao retry | — |
| **E08 Duvida** | Conhecimento com score de confianca baixo | Card com badge "Em observacao" (score 20-59) ou "Descartado" (score <20) + texto explicativo do score | IA deriva status do `scoreConfianca` | Badge de status, texto explicativo | Conhecimento ainda visivel mas com indicacao de baixa confianca |
| **E10 Evolucao** | Mudancas desde ultima visita | Tag "Atualizado" em conhecimentos que mudaram de status desde a ultima visita | IA compara estado atual vs ultimo snapshot | Tag "Atualizado" | Visivel apenas se houve mudanca |
| **E12 Historico** | Versao anterior de um conhecimento | Opcao "Ver historico" no `KnowledgeCard` que mostra a timeline de evolucao daquele conhecimento | IA recupera `MemoriaCognitiva` e `Evidencia` associadas | Timeline, dados anteriores | Visualizacao apenas — nao altera o estado atual |
| **E13 Arquivado** | Conhecimento descartado (score <20) | Card com status "Descartado" + data de arquivamento + opcao "Reativar" | IA mantem o conhecimento preservado mas inativo | Card com status, data, CTA "Reativar" | Nao aparece na busca padrao (so com filtro "arquivados") |

### Status Derivados do Score de Confianca

```
scoreConfianca ≥ 60  → Status: "Confirmado" (E01 Inicial / E06 Sucesso)
scoreConfianca 20-59 → Status: "Em observacao" (E08 Duvida)
scoreConfianca < 20  → Status: "Descartado" (E13 Arquivado)
```

---

## 15. Detalhamento por Tela — Aprendizados (`/aprendizados`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Pagina de aprendizados carregada | Lista de aprendizados registrados + perguntas rapidas (se houver pendentes) + historico de aprendizado | IA carregou dados do modelo `Aprendizado` via `aprendizado-service.ts` | `ConversationKnowledgeCard`, `QuickLearningQuestion`, `LearningHistory` | Aprendizados exibidos por categoria (VALORES, PREFERENCIAS, REGRAS, OBJETIVOS, etc.) |
| **E02 Vazio** | Nenhum aprendizado registrado | Mensagem "Ainda nao aprendemos nada sobre sua empresa. Responda algumas perguntas para comecarmos." + CTA "Responder perguntas rapidas" | IA detecta que nao ha `Aprendizado` registrado | Mensagem de vazio, CTA "Responder" | CTA abre a primeira `QuickLearningQuestion` (12 perguntas em 11 categorias) |
| **E03 Carregando** | Aprendizados sendo carregados | Esqueletos de cards de aprendizado | IA consultando `aprendizado-service.ts` | Skeleton cards | Breve |
| **E04 Pensando** | IA processando resposta a pergunta rapida | Indicador "Registrando seu aprendizado..." | IA interpreta a resposta, cria/atualiza `Aprendizado`, atualiza Identity Engine | Indicador de processamento | 1-3s |
| **E05 Aprendendo** | Novo aprendizado registrado | Card "Aprendi algo novo!" com o aprendizado registrado e categoria | IA registrou novo `Aprendizado` com origem PERGUNTA (ou MANUAL/CONVERSA) | Card de confirmacao | Aparece apos responder pergunta ou registrar manualmente |
| **E06 Sucesso** | Acao concluida | Pergunta respondida: proxima pergunta aparece / aprendizado registrado: card aparece na lista | IA concluiu o registro | Lista atualizada, proxima pergunta | — |
| **E07 Erro** | Erro ao registrar aprendizado | Mensagem "Erro ao registrar aprendizado. Tente novamente." | IA registra erro | Mensagem de erro, botao retry | Resposta nao e perdida — input mantem valor |

### Nota sobre as 12 Perguntas Rapidas

```
Categorias: VALORES, PREFERENCIAS, REGRAS, OBJETIVOS, ROTINAS, EQUIPE,
            CLIENTES, FINANCEIRO, OPERACAO, VISAO, RISCOS

A cada resposta:
  1. IA interpreta → E04 Pensando
  2. Registra aprendizado → E05 Aprendendo
  3. Avanca para proxima pergunta → E06 Sucesso
  4. Se todas respondidas: "Todas as perguntas respondidas!"
```

---

## 16. Detalhamento por Tela — Tarefas (`/tarefas`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Lista de tarefas carregada | Lista de tarefas agrupadas por status (Hoje, Atrasadas, Pendentes, Concluidas) + opcao de criar nova tarefa | IA carregou `tarefa.service` (listar + hoje+atrasadas) | Lista, cards de tarefa, CTA "Criar" | Tarefas de hoje aparecem primeiro |
| **E02 Vazio** | Nenhuma tarefa cadastrada | Mensagem "Nenhuma tarefa ainda. Crie sua primeira tarefa." + CTA "Criar tarefa" | IA detecta lista vazia | Mensagem de vazio, CTA | CTA abre modal de criacao |
| **E03 Carregando** | Tarefas sendo carregadas | Esqueletos de cards de tarefa | IA consultando `tarefa.service` | Skeleton cards | — |
| **E06 Sucesso** | Acao concluida (criar, concluir, excluir) | Tarefa marcada como concluida com linha riscada / nova tarefa aparece na lista | IA executa acao no `tarefa.service` | Animacao de conclusao, lista atualizada | Concluir tarefa: animacao de check com confete sutil |
| **E07 Erro** | Erro ao carregar ou executar acao | Mensagem "Erro ao carregar tarefas. Tente novamente." | IA registra erro | Mensagem de erro, botao retry | — |

---

## 17. Detalhamento por Tela — Configuracoes (`/configuracoes`)

### Matriz de Estados

| Estado | Descricao | O que o empresario ve | O que a IA faz | Elementos | Comportamento |
|--------|-----------|----------------------|----------------|-----------|---------------|
| **E01 Inicial** | Configuracoes carregadas | Abas: Geral, Perfil, Membros (se ADMIN) + formularios pre-preenchidos com dados atuais | IA carregou dados de `Configuracao`, `Usuario`, `Empresa` | Tabs, formularios, dados pre-preenchidos | Dados carregados e prontos para edicao |
| **E03 Carregando** | Configuracoes sendo carregadas | Esqueletos de formularios | IA consultando dados | Skeleton forms | — |
| **E06 Sucesso** | Alteracao salva | Toast "Configuracao atualizada com sucesso." | IA salva alteracao | Toast, campos atualizados | Alteracao persiste imediatamente |
| **E07 Erro** | Erro ao carregar ou salvar | Mensagem "Erro ao carregar configuracoes. Tente novamente." / "Erro ao salvar." | IA registra erro | Mensagem de erro, botao retry | Alteracao nao persiste |

### Estados N/A para Configuracoes

| Estado | Justificativa |
|--------|---------------|
| E02 Vazio | Configuracoes sempre tem dados (minimo: empresa + usuario criados) |
| E04 Pensando | Nao ha IA |
| E05 Aprendendo | Nao ha aprendizado |
| E08 Duvida | Informacoes sao factuais |
| E09 Confirmacao | Nao ha confirmacoes complexas (apenas submit) |
| E10 Evolucao | Nao ha "desde a ultima visita" em config |
| E11 Bloqueado | Se bloqueado, nao acessa a tela |
| E12 Historico | Nao ha historico de config |
| E13 Arquivado | Nao se aplica |

---

## 18. Regras de Transicao entre Estados

### 18.1 Regras Gerais

```
1. Toda tela comeca em INICIAL ou CARREGANDO
2. Transicoes entre estados sao determinadas por eventos (acao do usuario, resposta da API, timer)
3. Estados de erro podem ser recuperados para o estado anterior
4. Estados de pensamento/aprendizado sao temporarios (max 10s sem acao)
5. Estados de confirmacao exigem acao explicita do usuario para prosseguir
6. Nenhum estado deve ser permanente sem saida — sempre ha uma acao possivel
```

### 18.2 Diagrama de Transicoes Generico

```
                              ┌───────────────┐
                              │   CARREGANDO  │
                              └───────┬───────┘
                                      │ dados carregados
                                      ▼
                    ┌──────────────────────────────┐
                    │         INICIAL / VAZIO       │
                    │  (ou INICIAL com dados)       │
                    └─────────┬──────────┬──────────┘
                              │          │
                    acao do   │          │ IA precisa
                    usuario   │          │ processar
                              ▼          ▼
                    ┌──────────────┐  ┌──────────────┐
                    │ CONFIRMACAO  │  │   PENSANDO   │
                    └──────┬───────┘  └──────┬───────┘
                           │                 │
                     confirmou?        processou?
                     ├── Sim           ├── Sim
                     │   ↓             │   ↓
                     │   ┌─────────┐   │   APRENDENDO ───► SUCESSO
                     │   │ SUCESSO │   │   (opcional)
                     │   └─────────┘   ▼
                     │               ┌────────┐
                     └── Nao ───────▶│ INICIAL│
                                     └────────┘

                    ┌──────────────────────────────┐
                    │            ERRO               │
                    │  (pode vir de qualquer estado) │
                    └──────────────┬───────────────┘
                                   │ retry
                                   ▼
                           ESTADO ANTERIOR

                    ┌──────────────────────────────┐
                    │          DUVIDA               │
                    │  (apenas em telas cognitivas) │
                    └──────────────┬───────────────┘
                                   │ empresario le e decide
                                   ▼
                           INICIAL / SUCESSO
```

---

## 19. Estados Globais (Aplicativos a Qualquer Tela)

### 19.1 Erro de Autenticacao

```
Quando: qualquer fetch retorna 401 (token expirado, sessao invalida)
O que acontece: redirect para /login com mensagem "Sua sessao expirou."
Comportamento: a tela atual nao e preservada
```

### 19.2 Erro de Rede (Offline)

```
Quando: todos os fetches falham por falta de conectividade
O que o empresario ve: Banner no topo "Voce esta offline. Algumas funcionalidades podem 
nao funcionar." + dados em cache (se disponiveis)
O que a IA faz: Nada (IA precisa de conexao)
Comportamento: Se cache disponivel, exibir dados offline. Se nao, telas ficam em estado de erro.
```

### 19.3 Timeout de Sessao

```
Quando: 30 minutos de inatividade
O que o empresario ve: Modal "Sua sessao vai expirar em 2 minutos. Deseja continuar?"
  [Continuar] [Sair]
O que a IA faz: Salva estado atual (se aplicavel)
Comportamento: Se "Continuar", sessao renovada. Se "Sair", redirect para /login.
```

### 19.4 Erro 500 (Servidor)

```
Quando: API retorna 500
O que o empresario ve: Mensagem "Algo deu errado em nossos servidores. Ja estamos 
trabalhando para resolver." + contato suporte
O que a IA faz: Registra erro no log
Comportamento: Botao "Tentar novamente"
```

---

## 20. Checklist de Implementacao de Estados

### 20.1 Para cada nova tela criada

```markdown
- [ ] E01 — INICIAL: estado padrao apos carregamento completo
- [ ] E02 — VAZIO: comportamento quando nao ha dados (se aplicavel)
- [ ] E03 — CARREGANDO: skeleton loading durante fetch
- [ ] E04 — PENSANDO: indicador de processamento (se aplicavel)
- [ ] E05 — APRENDENDO: indicador de novo conhecimento (se aplicavel)
- [ ] E06 — SUCESSO: feedback de acao concluida
- [ ] E07 — ERRO: mensagem de erro + solucao + retry
- [ ] E08 — DUVIDA: indicador de baixa confianca (se aplicavel)
- [ ] E09 — CONFIRMACAO: modal de confirmacao (se aplicavel)
- [ ] E10 — EVOLUCAO: indicador de mudanca desde ultima visita (se aplicavel)
- [ ] E11 — BLOQUEADO: mensagem de bloqueio (se aplicavel)
- [ ] E12 — HISTORICO: visualizacao de versao anterior (se aplicavel)
- [ ] E13 — ARQUIVADO: exibicao de dados inativos (se aplicavel)
```

### 20.2 Checklist de Qualidade de Estados

```markdown
- [ ] Cada estado tem uma saida clara (o que o empresario pode fazer)
- [ ] Estados de erro oferecem solucao, nao apenas diagnostico
- [ ] Estados de carregamento sao informativos (nao apenas spinners genericos)
- [ ] Transicoes entre estados sao suaves (animacao <300ms)
- [ ] Estados de pensamento tem fallback (se >10s, exibir mensagem alternativa)
- [ ] Estados de confirmacao podem ser cancelados
- [ ] Nenhum estado e "sem saida" — sempre ha uma acao possivel
- [ ] Todos os textos de estado sao em portugues claro (sem jargao tecnico)
- [ ] Estados respeitam `prefers-reduced-motion`
```

### 20.3 Matriz de Cobertura de Estados por Tela

Use esta matriz ao final da implementacao para verificar se todas as telas cobrem todos os estados aplicaveis:

| Tela | E01 | E02 | E03 | E04 | E05 | E06 | E07 | E08 | E09 | E10 | E11 | E12 | E13 | Status |
|------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|--------|
| Landing | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ |
| Diagnostico | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ |
| Resumo | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ |
| Criar Conta | ✅ | ⬜ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ |
| Login | ✅ | ⬜ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ |
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ⬜ | ✅ |
| Assistente | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ✅ |
| CRM | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ✅ | ⬜ | ✅ | ⬜ | ⬜ | ✅ |
| Clientes | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ✅ |
| Centro Decisao | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ✅ | ⬜ | ✅ | ⬜ | ✅ |
| Financeiro | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ✅ | ⬜ | ⬜ | ✅ |
| Conhecimento | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ✅ | ⬜ | ✅ | ✅ | ✅ |
| Aprendizados | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ |
| Tarefas | ✅ | ✅ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ |
| Configuracoes | ✅ | ⬜ | ✅ | ⬜ | ⬜ | ✅ | ✅ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ |

**Legenda:** ✅ = Estado definido | ⬜ = N/A | 🔲 = Pendente de implementacao

---

> **Fim do Documento 3 — SISTEMA_OFICIAL_DE_ESTADOS.md**
> Fim do Pacote P29 — Arquitetura de Superficie Cognitiva
