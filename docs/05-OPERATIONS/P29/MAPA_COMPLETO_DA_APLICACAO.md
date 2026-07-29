# MAPA COMPLETO DA APLICACAO — Todas as Telas e Transicoes da Ponte Digital

> **Documento P29.1** — Arquiteto de Superficie Cognitiva
> Data: 26/07/2026 | Status: Oficial

---

## SUMARIO

1. [Fluxo Principal](#1-fluxo-principal)
2. [Catalogo de Telas](#2-catalogo-de-telas)
3. [Tabela de Transicoes Detalhadas](#3-tabela-de-transicoes-detalhadas)
4. [Mapa Visual da Navegacao](#4-mapa-visual-da-navegacao)
5. [Matriz de Rotas Completas](#5-matriz-de-rotas-completas)
6. [Riscos de Abandono por Transicao](#6-riscos-de-abandono-por-transicao)
7. [Fluxos de Excecao](#7-fluxos-de-excecao)
8. [Glossario de Termos de Navegacao](#8-glossario-de-termos-de-navegacao)

---

## 1. Fluxo Principal

```
LANDING → DIAGNOSTICO → RESUMO → CONTA → DASHBOARD → ASSISTENTE → MODULOS
```

O fluxo principal representa a **jornada ideal do empresario** desde o primeiro contato ate a operacao diaria na plataforma. Cada transicao possui gatilho, animacao, tempo estimado e comportamento de estado.

---

### 1.1 Visao macro do ecossistema de telas

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ECOLOGIA DE TELAS                                │
│                                                                         │
│  ┌─────────┐    ┌────────────┐    ┌────────┐    ┌───────┐              │
│  │ LANDING │───▶│ DIAGNOSTICO│───▶│ RESUMO │───▶│ CONTA │              │
│  │  (/)    │    │ (/conversa)│    │(concl.)│    │(/cria)│              │
│  └─────────┘    └────────────┘    └────────┘    └───┬───┘              │
│                                                      │                  │
│                    ┌─────────────────────────────────┘                  │
│                    ▼                                                     │
│  ┌───────────┐  ┌────────────┐  ┌───────────────────┐                  │
│  │ DASHBOARD │◀─│   LOGIN    │  │   RESET PASSWORD  │                  │
│  │(/dashboard)│  │  (/login)  │  │ (/reset-password) │                  │
│  └─────┬─────┘  └────────────┘  └───────────────────┘                  │
│        │                                                               │
│        ▼                                                               │
│  ┌───────────┐                                                         │
│  │ASSISTENTE │─────────── MODULOS ──────────────────────┐              │
│  │(/assist.) │                                           │              │
│  └─────┬─────┘     ┌────────┐ ┌────────┐ ┌───────────┐  │              │
│        │           │   CRM   │ │CLIENTES│ │   AGENDA   │  │              │
│        │           │ (/crm)  ││(/client)│ │(futuro)   │  │              │
│        │           └────────┘ └────────┘ └───────────┘  │              │
│        │           ┌────────┐ ┌────────┐ ┌───────────┐  │              │
│        ├──────────▶│CENTRO  │ │FINANCE.│ │CONHECIMENT│  │              │
│        │           │DECISAO │ │(/finan)│ │(/conhec.) │  │              │
│        │           └────────┘ └────────┘ └───────────┘  │              │
│        │           ┌────────┐ ┌────────┐ ┌───────────┐  │              │
│        │           │TAREFAS │ │HISTOR. │ │IMPLANTAC. │  │              │
│        │           │(/tarefa)││(/hist) ││(/implant.)│  │              │
│        │           └────────┘ └────────┘ └───────────┘  │              │
│        │           ┌────────┐ ┌──────────────────────┐  │              │
│        └──────────▶│APREND. │ │   CONFIGURACOES       │  │              │
│                    │(/apren)│ │   (/configuracoes)    │  │              │
│                    └────────┘ └──────────────────────┘  │              │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Catalogo de Telas

Para cada tela, a ficha completa com todos os atributos de navegacao, estado cognitivo, dependencias e comportamento.

---

### 2.1 LANDING (`/`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Landing Page |
| **Propósito** | O empresario chega, entende a proposta de valor em 3 segundos, clica no CTA para iniciar o diagnostico |
| **Estado cognitivo associado** | N/A (pre-cognitivo — nenhum dado da empresa existe ainda) |
| **De onde vem** | Link externo, busca Google, indicação, rede social, acesso direto a URL |
| **Para onde vai** | `/conversa` (inicio do diagnostico) |
| **Gatilho de entrada** | Acesso a URL raiz (`/`). Na primeira visita, servidor renderiza landing. Se ja existe sessao ativa com diagnostico em andamento, redireciona para `/conversa`. Se ja existe sessao autenticada, redireciona para `/dashboard`. |
| **Gatilho de saida** | Clique no CTA "Descobrir agora" → redireciona para `/api/sessao/iniciar` que cria token de sessao e redireciona para `/conversa` |
| **Pode voltar?** | Sim. Navegador "voltar" retorna para a landing. Mas se o usuario ja esta no diagnostico e usa "voltar", ele sai do fluxo — o progresso do diagnostico e preservado no servidor (token de sessao), entao ao clicar novamente em "Descobrir agora" ele retoma de onde parou. |
| **Fluxo interrompido** | Se o empresario acessa a landing e sai sem clicar: nada acontece — nao ha estado para preservar. Se clica no CTA e fecha o navegador antes do diagnostico carregar: o token de sessao foi criado, mas nenhuma pergunta foi respondida. Ao retornar e clicar no CTA novamente, um novo token e gerado (o anterior expira). |
| **Dependencia de dados** | Nenhuma. Tela estatica renderizada no servidor. |
| **Tempo estimado de permanencia** | 3-10 segundos (ideal: <5s para conversao) |
| **Componentes principais** | Hero com titulo, subtitulo, CTA principal, selo "Gratuito. Sem cadastro." |
| **URL amigavel** | `https://pontedigital.com.br/` |
| **Grupo de layout** | Root Layout (sem sidebar, sem header, fullscreen) |

**Estados da tela:**
| Estado | O que o empresario ve | Comportamento |
|--------|----------------------|---------------|
| Inicial | Hero, CTA, texto de apoio | Renderizacao completa, pronto para interacao |
| Erro de rede | Mensagem "Nao foi possivel conectar" | Raro (pagina estatica), mas se CDN falhar, browser mostra erro nativo |
| Pós-clique | Loading do redirect | Ao clicar CTA, redireciona para `/api/sessao/iniciar` que pode levar ~200-400ms para criar token |

---

### 2.2 DIAGNOSTICO (`/conversa`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Diagnostico Vivo / Conversa de Diagnostico |
| **Propósito** | O empresario responde 5 blocos de perguntas sobre seu negocio. A IA faz uma pergunta por vez, reage a cada resposta, e ao final revela interpretacoes. |
| **Estado cognitivo associado** | Transicao de **Desconhecida (0)** para **Superficial (1)** — a IA esta construindo o primeiro entendimento da empresa |
| **De onde vem** | Landing Page (`/`) via `api/sessao/iniciar`. Tambem pode vir de um retorno direto se o usuario digitar a URL `/conversa` ou se houver sessao ativa pre-existente. |
| **Para onde vai** | Ao concluir as 5 perguntas: exibe o Resumo com interpretacoes. De la, o empresario clica "Quero criar minha conta e continuar" → `/criar-conta`. |
| **Gatilho de entrada** | Token de sessao valido (criado em `/api/sessao/iniciar`). Se nao ha token, redireciona para `/`. Se o diagnostico ja foi concluido (sessao marcada como `concluida`), exibe diretamente o Resumo. |
| **Gatilho de saida** | Conclusao das 5 perguntas → sistema finaliza conversa (`POST /api/conversa/finalizar`) → exibe Resumo com interpretacoes + CTA "Quero criar minha conta e continuar" |
| **Pode voltar?** | Sim, mas a conversa e linear (nao volta para perguntas anteriores intencionalmente — o design e para manter o fluxo natural). O empresario pode fechar o navegador e retornar que o progresso e restaurado. |
| **Fluxo interrompido** | **Cenario critico:** empresario responde 3 de 5 perguntas e fecha. O progresso e salvo no servidor (vinculado ao token de sessao). Ao retornar (via landing → CTA ou URL direta), o sistema detecta sessao existente e retoma da ultima pergunta pendente. O token tem TTL de 24h — acima disso, expira e o diagnostico recomeca. |
| **Dependencia de dados** | Nenhuma (diagnostico nao requer dados previos do banco — opera apenas com o token de sessao e as respostas em memoria/API). |
| **Tempo estimado de permanencia** | 5-15 minutos (5 perguntas, tempo medio de leitura + resposta: 1-3 min cada) |
| **Componentes principais** | `QuestionCard`, `MicroReaction`, `RevelacaoCard`, `ProgressBar` |
| **URL amigavel** | `https://pontedigital.com.br/conversa` |
| **Grupo de layout** | Root Layout (sem sidebar, fundo com gradiente, centralizado) |

**Estados da tela:**
| Estado | O que o empresario ve | Comportamento |
|--------|----------------------|---------------|
| Inicial | Loading "Iniciando conversa..." com spinner | Fetch inicial para `/api/conversa` |
| Primeira vez | Saudacao + primeira pergunta (ProgressBar em 0%) | IA prepara primeira questao do bloco 1 |
| Respondendo | Input de texto/selecao/faixa + botao "Enviar" | Empresario digita ou seleciona |
| Enviando | Botao desabilitado, spinner no botao | `POST /api/conversa` processando |
| Reacao | `MicroReaction` com texto da IA reagindo a resposta + timer 5s | IA exibe reacao emocional/cognitiva a resposta |
| Avanco automatico | Transicao suave para proxima pergunta | Apos 5s (ou clique "Continuar agora"), proxima pergunta aparece com animacao slide-up |
| Pensando | Indicador "IA esta processando sua resposta..." | IA gera reacao (pode levar 1-3s em casos complexos) |
| Concluido | `RevelacaoCard` com interpretações + resumo natural | `POST /api/conversa/finalizar` executado |
| Erro de envio | Borda vermelha + mensagem "Erro ao enviar resposta. Tente novamente." | Fetch falhou. Empresario pode reenviar. |
| Erro de inicializacao | "Nao foi possivel conectar. Verifique sua internet e tente novamente." | Fetch inicial falhou. Botao "Tentar novamente". |
| Sessao expirada | "Sua sessao expirou. Clique aqui para comecar novamente." | Token invalido ou expirado (>24h sem atividade). |
| Retomada | ProgressBar no ponto onde parou + "Continuando de onde paramos" | Ao detectar sessao com respostas parciais, sistema restaura estado. |

---

### 2.3 RESUMO (integrado a `/conversa`, estado concluido)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Resumo do Diagnostico / Revelacao |
| **Propósito** | Apresentar ao empresario as interpretacoes que a IA gerou a partir de suas respostas. O empresario ve seu negocio sob uma nova perspectiva — e decide criar conta para preservar e aprofundar. |
| **Estado cognitivo associado** | **Superficial (1)** — a IA agora conhece segmento, porte, localizacao e oferta basica |
| **De onde vem** | Conclusao do Diagnostico (apos finalizar 5 blocos) |
| **Para onde vai** | `/criar-conta` (via CTA "Quero criar minha conta e continuar") |
| **Gatilho de entrada** | `POST /api/conversa/finalizar` bem-sucedido → interpretacoes + resumo natural sao renderizados no `RevelacaoCard` |
| **Gatilho de saida** | Clique em "Quero criar minha conta e continuar" → redireciona para `/criar-conta` |
| **Pode voltar?** | Sim. O empresario pode ler o resumo, refletir, e so clicar no CTA quando decidir. Nao ha timeout para essa decisao. Pode fechar e voltar depois (a sessao ainda esta valida). |
| **Fluxo interrompido** | Empresario le o resumo e fecha sem criar conta. O diagnostico esta completo, mas nao vinculado a nenhuma conta. Ao retornar para a landing e clicar CTA novamente: se a sessao ainda for valida, ele ve o resumo novamente. Se a sessao expirou, ele refaz o diagnostico. **Risco:** empresario pode perder o resumo se nao criar conta. |
| **Dependencia de dados** | Interpretacoes geradas pela Conversation Engine + Identity Engine |
| **Tempo estimado de permanencia** | 30-90 segundos (leitura do resumo + decisao de criar conta) |
| **Componentes principais** | `RevelacaoCard` (interpretacoes), texto persuasivo para criacao de conta |
| **URL** | Mesma do Diagnostico (`/conversa`) — estado interno de `concluida = true` |
| **Grupo de layout** | Root Layout |

**Estados da tela:**
| Estado | O que o empresario ve | Comportamento |
|--------|----------------------|---------------|
| Sucesso | RevelacaoCard com 3 interpretacoes (ponto de atencao, observacao, alinhamento) + resumo natural em 5 secoes | IA exibe o entendimento construido |
| CTA visivel | "Quer que eu te ajude a resolver isso? Crie sua conta e continuamos de onde paramos." + botao "Quero criar minha conta e continuar" | Empresario decide se continua |
| Erro ao finalizar | "Erro ao finalizar conversa. Tente novamente." | Fetch de finalizacao falhou; botao de retry |

---

### 2.4 CRIAR CONTA (`/criar-conta`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Criar Conta |
| **Propósito** | Empresario cria sua conta na plataforma para preservar o diagnostico, criar a Identidade Digital da empresa e acessar o Dashboard. |
| **Estado cognitivo associado** | **Superficial (1)** → **Estrutural (2)** — ao criar conta, o diagnostico e vinculado e a empresa ganha Identidade Digital |
| **De onde vem** | Resumo do Diagnostico (via CTA). Tambem pode vir de link direto (mas redireciona para `/conversa` se nao houver sessao ativa com diagnostico concluido). |
| **Para onde vai** | `/dashboard` (apos conta criada com sucesso) |
| **Gatilho de entrada** | Clique no CTA do Resumo. Se nao ha sessao com diagnostico concluido, redireciona para `/conversa`. |
| **Gatilho de saida** | `POST /api/auth/criar-conta` bem-sucedido → `router.push('/dashboard')` |
| **Pode voltar?** | Sim. "Voltar" no navegador retorna ao Resumo. Mas se fechar e retornar depois, pode encontrar a sessao expirada. |
| **Fluxo interrompido** | Empresario preenche nome, email e senha e fecha. Nada e salvo (o submit ainda nao ocorreu). Nao ha draft de cadastro. Ao retornar, precisa preencher novamente. |
| **Dependencia de dados** | Token de sessao valido com diagnostico concluido. Respostas do diagnostico sao vinculadas a conta no momento da criacao. |
| **Tempo estimado de permanencia** | 2-5 minutos (preenchimento de formulario: nome, nome da empresa, email, senha, confirmacao) |
| **Componentes principais** | Formulario com inputs, validacao, submit |
| **URL amigavel** | `https://pontedigital.com.br/criar-conta` |
| **Grupo de layout** | Auth Layout (painel lateral com branding + formulario) |

**Estados da tela:**
| Estado | O que o empresario ve | Comportamento |
|--------|----------------------|---------------|
| Inicial | Formulario com todos os campos vazios + CTA "Salvar e acessar" | Validacao client-side pronta |
| Verificando sessao | Loading "Verificando sua conversa..." | Fetch para `/api/conversa` para confirmar que ha sessao valida |
| Validacao erro | Border vermelha em campos + mensagem (ex: "As senhas nao conferem") | Validacao client-side |
| Enviando | Botao "Criando conta..." desabilitado com spinner | `POST /api/auth/criar-conta` em andamento |
| Erro servidor | Mensagem de erro (ex: "Email ja cadastrado") | API retornou erro |
| Sucesso | Redirecionamento para `/dashboard` | Conta criada, sessao autenticada, Identidade Digital vinculada |
| Email duplicado | "Este email ja esta em uso. Tente fazer login." | Erro especifico tratado |
| Sessao invalida | Redireciona para `/conversa` | Nao ha diagnostico concluido para vincular |

---

### 2.5 LOGIN (`/login`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Login |
| **Propósito** | Empresario que ja tem conta faz autenticacao para acessar o Dashboard |
| **Estado cognitivo associado** | Varia conforme o usuario — pode ser qualquer estado de Desconhecida a Validada |
| **De onde vem** | Redirect do Dashboard (se nao autenticado), link direto, menu "Sair", URL manual |
| **Para onde vai** | `/dashboard` (ou redirect customizado se houver sessao interrompida) |
| **Gatilho de entrada** | Acesso a URL `/login`. Se ja esta autenticado, redireciona para `/dashboard`. |
| **Gatilho de saida** | Submit do formulario → autenticacao Supabase → `POST /api/experience/login` → redirect |
| **Pode voltar?** | Sim. Navegador "voltar" vai para onde o usuario estava antes de ser redirecionado para login. |
| **Fluxo interrompido** | Empresario preenche email+senha e fecha. Nada e salvo. Ao retornar, preenche novamente. |
| **Dependencia de dados** | Nenhuma (autenticacao via Supabase, dados do usuario sao carregados apos login) |
| **Tempo estimado de permanencia** | 30-60 segundos |
| **Componentes principais** | Formulario de login com validação Zod + Supabase auth + redirect inteligente |
| **URL amigavel** | `https://pontedigital.com.br/login` |
| **Grupo de layout** | Auth Layout |

**Estados da tela:**
| Estado | O que o empresario ve | Comportamento |
|--------|----------------------|---------------|
| Inicial | Formulario email + senha + "Entrar" | Foco no primeiro campo |
| Validacao erro | "Email invalido" ou "Senha deve ter no minimo 6 caracteres" | Zod validation |
| Enviando | "Entrando..." com spinner | Autenticacao Supabase |
| Erro credenciais | "E-mail ou senha invalidos." | Supabase retornou erro |
| Sucesso | Redireciona para `/dashboard` ou redirect salvo | Login bem-sucedido |

---

### 2.6 RESET PASSWORD (`/reset-password` e `/reset-password/confirmar`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Recuperar Senha |
| **Propósito** | Empresario que esqueceu a senha solicita redefinicao |
| **De onde vem** | Link "Esqueci a senha" no Login |
| **Para onde vai** | Confirmacao de envio → email → link magico → pagina de confirmacao → Dashboard |
| **Gatilho de entrada** | Clique em "Esqueci a senha" |
| **Gatilho de saida** | Submit do email de recuperacao |
| **Pode voltar?** | Sim, para o Login |
| **Fluxo interrompido** | Preenche email e sai — nada enviado |
| **Dependencia de dados** | Usuario existente no Supabase Auth |
| **URL** | `/reset-password` e `/reset-password/confirmar` |
| **Grupo de layout** | Auth Layout |

---

### 2.7 DASHBOARD (`/dashboard`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Inicio / Home |
| **Propósito** | Visao geral da empresa: saudacao personalizada, briefing cognitivo, notificacoes, health score, aprendizados recentes, metricas de evolucao. E o centro nervoso — o empresario ve o resumo do que importa agora. |
| **Estado cognitivo associado** | Todos — o conteudo muda conforme o estado cognitivo da empresa. Quanto maior o estado, mais rico o dashboard. |
| **De onde vem** | Login, Criar Conta, qualquer clique no logo ou "Inicio" na sidebar |
| **Para onde vai** | Todos os modulos via sidebar. CTA "Ir para o diagnostico" → `/assistente`. Links internos nos cards de insight. |
| **Gatilho de entrada** | Autenticacao valida + rota `/dashboard` |
| **Gatilho de saida** | Clique em qualquer item da sidebar, CTA interno, clique no header |
| **Pode voltar?** | Sim. Dashboard e o hub central — o empresario sempre pode voltar via sidebar "Inicio" |
| **Fluxo interrompido** | Se o empresario estava vendo o dashboard e fecha: ao retornar, o dashboard e renderizado novamente. Se havia insights que ele nao viu, eles ainda estarao la. O estado do dashboard e efemero (nao ha estado de scroll preservado entre sessoes). |
| **Dependencia de dados** | `experienceEngine.obterHomeExperience`, `obterEvolutionExperience`, `obterLearningExperience`, `obterModulosLiberados`. Multiplos fetches paralelos. Se algum falha, componentes especificos mostram erro, mas o resto da pagina renderiza. |
| **Tempo estimado de permanencia** | 2-5 minutos (leitura do briefing, notificacoes, decidir proxima acao) |
| **Componentes principais** | `ExperienceRenderer`, `BriefingCard`, `NotificationCard`, `HealthScoreCard`, `EvolutionCard`, `MaturityCard`, `MilestoneCard`, `KnowledgeAgingCard`, `ConfidenceDriftCard`, `ConversationKnowledgeCard`, `PriorityCard` |
| **URL amigavel** | `https://pontedigital.com.br/dashboard` |
| **Grupo de layout** | Dashboard Layout (sidebar + header) |

**Estados da tela:**
| Estado | O que o empresario ve | Comportamento |
|--------|----------------------|---------------|
| Inicial | Saudacao personalizada ("Bom dia, Joao") + foco do dia | Renderizacao completa |
| Vazio (primeira vez) | "Bem-vindo a Ponte Digital" + 4 PriorityCards com proximos passos | Empresa nova, sem diagnosticos completos |
| Carregando | Esqueletos de loading para cada card | Dados sendo carregados do servidor |
| Dados prontos | BriefingCard + NotificationCard + HealthScoreCard + EvolutionCard + etc. | Experience completa renderizada |
| Erro parcial | Card especifico mostra "Erro ao carregar" | Um dos fetches falhou, outros continuam |
| Erro total | "Nao foi possivel carregar o dashboard. Tente novamente." | Todos os fetches falharam |
| Insight novo | Card destacado com "Novo insight disponivel" | IA gerou novo conhecimento desde a ultima visita |
| Saude baixa | HealthScoreCard em vermelho com alerta | Score < 40 |
| Sem aprendizado | Secao "O que aprendemos" oculta | `learning.aprendizados.length === 0` |

---

### 2.8 ASSISTENTE (`/assistente`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Assistente IA |
| **Propósito** | Chat com IA contextualizada. O empresario faz perguntas, recebe respostas baseadas nos dados da empresa. A IA tem acesso ao contexto cognitivo completo (identidade, memorias, conhecimentos, aprendizados). |
| **Estado cognitivo associado** | Todos — o assistente adapta suas respostas ao nivel de conhecimento sobre a empresa |
| **De onde vem** | Sidebar → "Assistente IA". Tambem via CTA do Dashboard ("Ir para o diagnostico") ou links contextuais. |
| **Para onde vai** | O assistente pode sugerir acoes que levam a qualquer modulo: CRM, Clientes, Financeiro, Centro de Decisao, Conhecimento, Aprendizados, Configuracoes. A navegacao e contextual — o assistente nao "leva" o usuario, mas recomenda onde ele deve ir. |
| **Gatilho de entrada** | Clique em "Assistente IA" na sidebar. Se nao autenticado, permite acesso anonimo limitado (`usuario = null`). Se autenticado, carrega `obterAssistenteExperience` + `obterEstadoCognitivoCompleto`. |
| **Gatilho de saida** | Clique em link sugerido pelo assistente OU navegacao via sidebar |
| **Pode voltar?** | Sim. A conversa com o assistente e preservada no historico da sessao. |
| **Fluxo interrompido** | Empresario faz uma pergunta, recebe resposta, fecha. Ao retornar ao assistente, o chat e restaurado com o historico da conversa (puxado do contexto cognitivo). |
| **Dependencia de dados** | `obterAssistenteExperience` (contexto completo), `obterEstadoCognitivoCompleto`, `decidirContexto`. Tambem depende do plano do usuario (rate limit: 0/50/500 msgs/dia). |
| **Tempo estimado de permanencia** | 3-15 minutos (depende da profundidade da conversa) |
| **Componentes principais** | `Chat`, `BriefingCard`, `NotificationCard`, `HealthScoreCard` |
| **URL amigavel** | `https://pontedigital.com.br/assistente` |
| **Grupo de layout** | Dashboard Layout |

**Estados da tela:**
| Estado | O que o empresario ve | Comportamento |
|--------|----------------------|---------------|
| Inicial | Saudacao do assistente + contexto atual + input de mensagem | IA pronta para responder |
| Vazio (anonimo) | Chat sem contexto: "Ola! Como posso ajudar?" | Usuario nao autenticado, funcionalidade limitada |
| Carregando contexto | "Preparando seu contexto..." | Fetch de experience + estado cognitivo |
| Pensando | Indicador "IA esta pensando..." + possivel texto intermediario | IA processando pergunta |
| Respondendo | Streaming da resposta no chat | Resposta sendo gerada token a token |
| Sucesso | Resposta completa exibida | Nao ha mais o que processar |
| Erro de rate limit | "Voce atingiu o limite de mensagens para hoje." | Plano BASICO = 0 msg/dia, PROFISSIONAL = 50, ENTERPRISE = 500 |
| Erro de API | "Nao foi possivel obter resposta. Tente novamente." | Falha na API da Anthropic |
| Erro de contexto | "Nao tenho informacoes suficientes sobre sua empresa ainda." | Estado cognitivo muito baixo |
| Duvida | "Nao tenho certeza absoluta, mas com base nos dados disponiveis..." | Confianca abaixo do limiar |

---

### 2.9 CRM (`/crm`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | CRM — Pipeline de Leads |
| **Propósito** | Gerenciar o funil de vendas: leads em estagios (Novo, Em Contato, Qualificado, Proposta, Fechado), conversao em cliente, temperatura do lead. |
| **Estado cognitivo associado** | **Comercial (5)** — a IA entende o perfil de clientes e oportunidades |
| **De onde vem** | Sidebar → grupo "Comercial" → "CRM". Links contextuais do Assistente. |
| **Para onde vai** | Perfil do lead (modal), conversao em cliente, tarefas vinculadas |
| **Gatilho de entrada** | Clique na sidebar. Se modulo nao liberado, mostra bloqueado. |
| **Gatilho de saida** | Conversao de lead → `/clientes`. Vinculo de tarefa → `/tarefas`. |
| **Pode voltar?** | Sim, via sidebar. |
| **Fluxo interrompido** | Empresario estava editando um lead e saiu. As alteracoes nao sao salvas ate o submit explicito. |
| **Dependencia de dados** | `lead.service` (listar, criar, atualizar, mover estagio). Depende de `empresaId`. |
| **Tempo estimado de permanencia** | 5-15 minutos |
| **Componentes principais** | Pipeline, PipelineColumn, LeadCard, LeadModal, LeadForm |
| **URL** | `/crm` |

---

### 2.10 CLIENTES (`/clientes`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Clientes |
| **Propósito** | Lista, busca, filtro e perfil completo dos clientes convertidos. Visao geral da base de clientes ativos. |
| **Estado cognitivo associado** | **Comercial (5)** |
| **De onde vem** | Sidebar → "Clientes", conversao de lead no CRM |
| **Para onde vai** | Perfil do cliente (`/clientes/[id]`), financeiro (transacoes do cliente), historico do cliente |
| **Gatilho de entrada** | Clique na sidebar, redirecionamento apos converter lead |
| **Gatilho de saida** | Clique em cliente especifico → `/clientes/[id]` |
| **Pode voltar?** | Sim. |
| **Fluxo interrompido** | Navegacao normal — sem estado critico |
| **Dependencia de dados** | `cliente.service` (listar, buscar, criar, atualizar, stats) |
| **Tempo estimado de permanencia** | 3-10 minutos |
| **URL** | `/clientes` e `/clientes/[id]` |

---

### 2.11 CENTRO DE DECISAO (`/centro-decisao`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Centro de Decisao |
| **Propósito** | Tela que traduz sinais da operacao em prioridades acionaveis. Mostra as decisoes mais importantes que o empresario precisa tomar hoje — alimentado por regras simples sobre `HistoricoSinal`. |
| **Estado cognitivo associado** | **Diagnosticada (6)** — a IA identifica problemas e prioriza acoes |
| **De onde vem** | Sidebar (futuro), links contextuais do Assistente |
| **Para onde vai** | Modulos relacionados a cada decisao (Financeiro, Clientes, Tarefas) |
| **Gatilho de entrada** | URL direta `/centro-decisao` ou navegacao interna |
| **Gatilho de saida** | Clique em acao sugerida |
| **Pode voltar?** | Sim. |
| **Fluxo interrompido** | Decisoes sao regeneradas a cada visita — nao ha estado intermediario |
| **Dependencia de dados** | `obterEstadoCognitivoCompleto`, `gerarDecisoes`, `classificarDecisoesPorPrioridade`, `enriquecerDecisoesComTrust`, `filtrarDecisoesPorRelevancia` |
| **Tempo estimado de permanencia** | 3-8 minutos |
| **Componentes principais** | `ScoreBar`, cards de decisao, badges de prioridade, grafico de urgencia |
| **URL** | `/centro-decisao` |

---

### 2.12 FINANCEIRO (`/financeiro`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Financeiro |
| **Propósito** | Gerenciar transacoes financeiras: receitas, despesas, categorizacao, recorencia, resumo financeiro, filtros. |
| **Estado cognitivo associado** | **Financeira (4)** |
| **De onde vem** | Sidebar → "Financeiro" |
| **Para onde vai** | Categorias, filtros, criacao de transacao |
| **Gatilho de entrada** | Clique na sidebar |
| **Gatilho de saida** | Clique em transacao especifica, criacao de nova, navegacao para outro modulo |
| **Pode voltar?** | Sim. |
| **Fluxo interrompido** | Criacao de transacao interrompida: dados nao salvos ate submit |
| **Dependencia de dados** | `transacao.service` (listar, criar, atualizar, marcar pago, resumo) |
| **Tempo estimado de permanencia** | 5-15 minutos |
| **URL** | `/financeiro` |

---

### 2.13 CONHECIMENTO (`/conhecimento`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Biblioteca de Conhecimento / Knowledge Vault |
| **Propósito** | Visualizar e gerir o conhecimento validado da empresa: conhecimentos com score de confianca (>60 confirmado, <20 descartado, 20-59 em observacao), filtros por categoria, busca, timeline de eventos cognitivos. |
| **Estado cognitivo associado** | **Cognitiva (7)** — a IA tem conhecimento estruturado sobre a empresa |
| **De onde vem** | Sidebar → grupo "Inteligencia" → "Conhecimento" |
| **Para onde vai** | Detalhes do conhecimento, timeline |
| **Gatilho de entrada** | Clique na sidebar |
| **Gatilho de saida** | Filtros, busca, navegacao |
| **Pode voltar?** | Sim. |
| **Fluxo interrompido** | Navegacao normal |
| **Dependencia de dados** | `ConhecimentoValidado`, `Hipotese`, `Evidencia`, `MemoriaCognitiva` |
| **Tempo estimado de permanencia** | 3-10 minutos |
| **Componentes principais** | `KnowledgeCard`, `KnowledgeTimeline`, `KnowledgeTag`, `KnowledgeFilters`, `KnowledgeSummary` |
| **URL** | `/conhecimento` |

---

### 2.14 APRENDIZADOS (`/aprendizados`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Aprendizados / Conversational Learning |
| **Propósito** | Captura explicita de aprendizados do empresario sobre valores, regras, preferencias e objetivos. O empresario ensina a Ponte sobre sua empresa. |
| **Estado cognitivo associado** | **Cognitiva (7)** — alimenta o Identity Engine com verdades estaveis |
| **De onde vem** | Sidebar → grupo "Inteligencia" → "Aprendizados" |
| **Para onde vai** | Detalhes do aprendizado |
| **Gatilho de entrada** | Clique na sidebar |
| **Gatilho de saida** | Resposta a pergunta rapida, cadastro manual |
| **Pode voltar?** | Sim. |
| **Fluxo interrompido** | Resposta a pergunta rapida interrompida: progresso nao salvo |
| **Dependencia de dados** | Modelo `Aprendizado`, `identity-engine.ts` |
| **Tempo estimado de permanencia** | 5-10 minutos |
| **Componentes principais** | `ConversationKnowledgeCard`, `QuickLearningQuestion`, `LearningHistory` |
| **URL** | `/aprendizados` |

---

### 2.15 TAREFAS (`/tarefas`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Tarefas |
| **Propósito** | Gerenciar tarefas operacionais: criacao, atribuicao, prioridade, tipos (ligacao, email, reuniao, follow-up, visita), status, tarefas de hoje + atrasadas. |
| **Estado cognitivo associado** | **Operacional (3)** |
| **De onde vem** | Sidebar → grupo "Principal" → "Tarefas" |
| **Para onde vai** | Detalhes da tarefa, modulos vinculados (cliente, lead) |
| **Gatilho de entrada** | Clique na sidebar |
| **Gatilho de saida** | Clicar em tarefa, criar nova |
| **Pode voltar?** | Sim. |
| **Fluxo interrompido** | Criacao de tarefa interrompida: dados nao salvos |
| **Dependencia de dados** | `tarefa.service` |
| **Tempo estimado de permanencia** | 3-8 minutos |
| **URL** | `/tarefas` |

---

### 2.16 HISTORICO (`/historico`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Historico / Timeline |
| **Propósito** | Timeline consolidada de eventos, acoes e mudancas por lead/cliente. |
| **Estado cognitivo associado** | **Estrutural (2)** — registra eventos observados |
| **De onde vem** | Sidebar → "Historico" |
| **Para onde vai** | Detalhes de eventos |
| **Gatilho de entrada** | Clique na sidebar |
| **Gatilho de saida** | Filtros, navegacao |
| **Pode voltar?** | Sim. |
| **Fluxo interrompido** | Navegacao normal |
| **Dependencia de dados** | `historico.service` |
| **Tempo estimado de permanencia** | 2-5 minutos |
| **URL** | `/historico` |

---

### 2.17 IMPLANTACOES (`/implantacoes`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Implantacoes / Onboarding de Cliente |
| **Propósito** | Acompanhamento do processo de implantacao de clientes: etapas, progresso, conclusao. |
| **Estado cognitivo associado** | **Estrutural (2)** |
| **De onde vem** | Sidebar → grupo "Operacional" → "Implantacoes" |
| **Para onde vai** | Etapas de implantacao, cliente vinculado |
| **Gatilho de entrada** | Clique na sidebar |
| **Gatilho de saida** | Clique em implantacao especifica |
| **Pode voltar?** | Sim. |
| **Fluxo interrompido** | Alternar etapa: estado e salvo imediatamente (toggle) |
| **Dependencia de dados** | `implantacao.service` |
| **Tempo estimado de permanencia** | 3-8 minutos |
| **URL** | `/implantacoes` |

---

### 2.18 CONFIGURACOES (`/configuracoes`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Configuracoes |
| **Propósito** | Gerenciar perfil, empresa, plano, preferencias, membros, papeis (ADMIN/GESTOR/MEMBRO). |
| **Estado cognitivo associado** | N/A (tela utilitaria, nao cognitiva) |
| **De onde vem** | Sidebar → "Configuracoes", menu do usuario no header → "Configuracoes" |
| **Para onde vai** | Configuracoes de perfil (via tabs internas) |
| **Gatilho de entrada** | Clique na sidebar ou menu do usuario |
| **Gatilho de saida** | Alternancia de abas internas, navegacao |
| **Pode voltar?** | Sim. |
| **Fluxo interrompido** | Alteracoes nao salvas: o submit e explicito |
| **Dependencia de dados** | `Configuracao`, `Usuario`, `Empresa` |
| **Tempo estimado de permanencia** | 3-10 minutos |
| **URL** | `/configuracoes` |

---

### 2.19 AGENDA (futuro — nao implementada)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Agenda |
| **Propósito** | Capacidade de agenda para reunioes, eventos, compromissos. **Nao implementada.** Gap ativo registrado em `CURRENT_PRODUCT.md`. |
| **Estado cognitivo associado** | **Operacional (3)** |
| **De onde vem** | Sidebar (grupo Operacional) |
| **URL** | N/A (futuro) |

---

### 2.20 ADMIN — COGNITIVE OBSERVATORY (`/admin/cognitive-observatory`)

| Atributo | Valor |
|----------|-------|
| **Nome oficial** | Cognitive Observatory |
| **Propósito** | Painel interno de metricas cognitivas: health scores, learning rates, evolution, confidence drift, knowledge aging. Uso administrativo/tecnico. |
| **Estado cognitivo associado** | N/A (ferramenta de observacao) |
| **De onde vem** | URL direta |
| **Para onde vai** | N/A (ferramenta) |
| **Gatilho de entrada** | URL direta `/admin/cognitive-observatory` |
| **Dependencia de dados** | Todas as engines cognitivas |
| **URL** | `/admin/cognitive-observatory` |

---

## 3. Tabela de Transicoes Detalhadas

Cada transicao entre telas especificada com: gatilho, animacao, tempo, mecanismo, origem, destino e tratamento de erro.

### 3.1 Transicoes do Fluxo Principal

| # | Origem | Destino | Gatilho | Animacao | Tempo | Mecanismo | Tratamento de erro |
|---|--------|---------|---------|----------|-------|-----------|-------------------|
| T01 | Landing (`/`) | Diagnostico (`/conversa`) | Clique CTA "Descobrir agora" | Fade out + fade in | 400ms | `Link href="/api/sessao/iniciar"` → cria token → redireciona 302 | Se API de sessao falhar: landing exibe erro ou CTA permanece inerte |
| T02 | Diagnostico → pergunta N | Diagnostico → pergunta N+1 | Resposta enviada + reacao exibida (auto 5s ou clique "Continuar agora") | Slide up (pergunta atual sai por cima, nova entra por baixo) | 600ms (+5s opcional de reacao) | `POST /api/conversa` retorna `proximaPergunta` | Se resposta falhar: campo mantem valor, botao reativa, mensagem de erro |
| T03 | Diagnostico | Resumo (mesma pagina, estado concluido) | 5a pergunta respondida → `POST /api/conversa/finalizar` | RevelacaoCard fade in com texto emergindo | 800ms | `setConcluida(true)` + renderiza `RevelacaoCard` | Se finalizar falhar: mensagem de erro + botao retry |
| T04 | Resumo | Criar Conta (`/criar-conta`) | Clique "Quero criar minha conta e continuar" | Fade | 300ms | `a href="/criar-conta"` | Se rota nao existir: 404 |
| T05 | Criar Conta | Dashboard (`/dashboard`) | Submit bem-sucedido | Transicao com saudacao (fade) | 600ms | `router.push('/dashboard')` apos `POST /api/auth/criar-conta` | Se criar conta falhar: erro exibido no formulario |
| T06 | Login (`/login`) | Dashboard (`/dashboard`) | Submit bem-sucedido | Fade | 400ms | Supabase auth → `router.push(redirect)` | Se login falhar: "E-mail ou senha invalidos." |
| T07 | Dashboard | Assistente (`/assistente`) | Clique sidebar "Assistente IA" | Slide | 300ms | `Link` do sidebar | Se nao autenticado: redirect `/login` |
| T08 | Dashboard | Qualquer modulo | Clique sidebar | Fade + slide | 300ms | `Link` do sidebar | Se modulo bloqueado: item mostra "bloqueado" (cursor not-allowed) |

### 3.2 Transicoes entre Modulos (via Assistente)

| # | Origem | Destino | Gatilho | Animacao | Tempo |
|---|--------|---------|---------|----------|-------|
| T09 | Assistente | CRM | Sugestao do assistente + clique do empresario | Fade + slide | 300ms |
| T10 | Assistente | Clientes | Sugestao do assistente + clique | Fade + slide | 300ms |
| T11 | Assistente | Financeiro | Sugestao do assistente + clique | Fade + slide | 300ms |
| T12 | Assistente | Centro Decisao | Sugestao do assistente + clique | Fade + slide | 300ms |
| T13 | Assistente | Conhecimento | Sugestao do assistente + clique | Fade + slide | 300ms |
| T14 | Assistente | Configuracoes | Sugestao do assistente + clique | Fade + slide | 300ms |
| T15 | Assistente | Tarefas | Sugestao do assistente + clique | Fade + slide | 300ms |
| T16 | Assistente | Aprendizados | Sugestao do assistente + clique | Fade + slide | 300ms |

### 3.3 Transicoes do Fluxo de Autenticacao

| # | Origem | Destino | Gatilho | Animacao | Tempo |
|---|--------|---------|---------|----------|-------|
| T17 | Login | Reset Password | Clique "Esqueci a senha" | Fade | 300ms |
| T18 | Reset Password | Confirmacao | Submit email | Fade | 300ms |
| T19 | Header (qualquer tela) | Login | Clique "Sair" | Instantaneo | 100ms |

### 3.4 Transicoes Internas (dentro de modulos)

| # | Origem | Destino | Gatilho | Mecanismo |
|---|--------|---------|---------|-----------|
| T20 | CRM (`/crm`) | Lead modal | Clique em lead | Modal overlay (mesma rota) |
| T21 | CRM | Clientes (`/clientes`) | Converter lead | `POST /api/leads/[id]/converter` → redirect |
| T22 | Clientes (`/clientes`) | Perfil (`/clientes/[id]`) | Clique em cliente | Navegacao Next.js |
| T23 | Dashboard | Conhecimento | Clique "Saber mais" no PriorityCard | `Link href="/conhecimento"` |
| T24 | Dashboard | Assistente | Clique "Ir para o diagnostico" no PriorityCard | `Link href="/assistente"` |

---

## 4. Mapa Visual da Navegacao

### 4.1 Diagrama textual completo

```
                                  ┌──────────────────────────────────────────────────────────────────────────────────────────────┐
                                  │                                                                                              │
                                  │                          ACESSO EXTERNO                                                      │
                                  │              (Google, indicacao, rede social, link)                                           │
                                  └────────────────────────────────┬─────────────────────────────────────────────────────────────┘
                                                                   │
                                                                   ▼
                              ┌──────────────────────────────────────────────────────────────────────┐
                              │                            LANDING (/)                              │
                              │  "Cansou de planilha? Responda 5 perguntas e descubra o que esta    │
                              │   passando despercebido."                                           │
                              │  [CTA: "Descobrir agora"]                                          │
                              └────────────────────────────────┬─────────────────────────────────────┘
                                                                   │
                                                                   │ [T01] Clique CTA | Fade 400ms
                                                                   ▼
                              ┌──────────────────────────────────────────────────────────────────────┐
                              │                        DIAGNOSTICO (/conversa)                       │
                              │  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐                      │
                              │  │ P.1 │→ │ P.2 │→ │ P.3 │→ │ P.4 │→ │ P.5 │  [T02] SlideUp 600ms │
                              │  └─────┘  └─────┘  └─────┘  └─────┘  └──┬──┘                      │
                              │                                          │                          │
                              │                                          ▼ [T03] Finalizar 800ms   │
                              │  ┌──────────────────────────────────────┐                          │
                              │  │            RESUMO (concluido)         │                          │
                              │  │  RevelacaoCard + Interpretacoes      │                          │
                              │  │  CTA: "Quero criar minha conta"      │                          │
                              │  └──────────────────────────────────────┘                          │
                              └────────────────────────────────┬─────────────────────────────────────┘
                                                                   │
                                                                   │ [T04] Clique CTA | Fade 300ms
                                                                   ▼
                              ┌──────────────────────────────────────────────────────────────────────┐
                              │                      CRIAR CONTA (/criar-conta)                      │
                              │  Formulario: nome, empresa, email, senha, confirmar                 │
                              │  [Submit: "Salvar e acessar"]                                       │
                              └────────────────────────────────┬─────────────────────────────────────┘
                                                                   │
                                                                   │ [T05] Submit OK | Fade 600ms
                                                                   ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                              │
│                         ╔══════════════════════════════════════════════════════════════════════╗                             │
│                         ║                         DASHBOARD (/dashboard)                      ║                             │
│                         ║  Saudacao + Briefing + Notificacoes + HealthScore                  ║                             │
│                         ║  + Evolucao + Aprendizados + Insights                              ║                             │
│                         ╚══════════════════════════════════════════════════════════════════════╝                             │
│                                              │                                                                               │
│              ┌───────────────────────────────┼───────────────────────────────┐                                               │
│              │                               │                               │                                               │
│              ▼                               ▼                               ▼                                               │
│  ┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐                                    │
│  │  SIDEBAR (sempre)   │         │  CARDS DE INSIGHT   │         │  PRIORITY CARDS     │                                    │
│  │  Navegacao para     │         │  Links contextuais  │         │  (primeira vez)     │                                    │
│  │  todos os modulos   │         │  para modulos       │         │  [T23] [T24]        │                                    │
│  └──────────┬──────────┘         └─────────────────────┘         └─────────────────────┘                                    │
│             │                                                                                                               │
│             │  SIDEBAR (navegacao principal)                                                                                │
│             ▼                                                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │                                            ASSISTENTE (/assistente)                                                   │   │
│  │  Chat contextual com IA | Sugestoes | Links para modulos                                                              │   │
│  └──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────────────────────────┘   │
│             │          │          │          │          │          │          │          │                                  │
│             ▼          ▼          ▼          ▼          ▼          ▼          ▼          ▼                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                                                 │
│  │ CRM  │ │CLIEN│ │ FIN  │ │CDE   │ │CONH  │ │CONF  │ │TAREF │ │APREN │                                                 │
│  │/crm  │ │/cli │ │/fin  │ │/cent │ │/conh │ │/conf │ │/tare │ │/apre │                                                 │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘                                                 │
│                                                                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

                    MODULOS INTERNOS (navegacao tab/abas):
                    ┌─────────────────────────────────────────────┐
                    │  CLIENTES: Lista → Perfil [id]             │
                    │  CRM: Pipeline → Lead (modal) → Converter  │
                    │  FINANCEIRO: Lista → Filtros               │
                    │  CONFIG: Geral → Perfil → Mebros           │
                    └─────────────────────────────────────────────┘
```

### 4.2 Diagrama de transicoes por grupo de layout

```
LAYOUT ROOT (sem sidebar, autenticacao nao necessaria)
├── Landing (/) ──────────────────────────────────────────► Diagnostico (/conversa)
│                                                              │
│                                                              ├──► Resumo (estado interno)
│                                                              │      │
│                                                              │      └──► Criar Conta (/criar-conta)
│                                                              │              │
│                                                              │              └──► Dashboard (/dashboard) ────► LAYOUT DASHBOARD
│                                                              │
│                                                              └── (sessao expirada) → Landing
│
└── Login (/login) ───────────────────────────────────────────────────────► Dashboard (/dashboard)

LAYOUT AUTH (painel lateral branding + formulario)
├── Login (/login) ───────────────────────────────────────► Dashboard (/dashboard)
├── Criar Conta (/criar-conta) ───────────────────────────► Dashboard (/dashboard)
└── Reset Password (/reset-password) ─────────────────────► Confirmacao (/reset-password/confirmar)

LAYOUT DASHBOARD (sidebar + header, autenticacao necessaria)
├── Dashboard (/dashboard) — hub central
├── Assistente (/assistente) — hub secundario
├── CRM (/crm) — modulo Comercial
├── Clientes (/clientes) — modulo Comercial
├── Cliente Perfil (/clientes/[id]) — submodulo Comercial
├── Financeiro (/financeiro) — modulo Financeiro
├── Centro Decisao (/centro-decisao) — modulo Cognitivo
├── Conhecimento (/conhecimento) — modulo Inteligencia
├── Aprendizados (/aprendizados) — modulo Inteligencia
├── Tarefas (/tarefas) — modulo Operacional
├── Historico (/historico) — modulo Operacional
├── Implantacoes (/implantacoes) — modulo Operacional
├── Configuracoes (/configuracoes) — modulo Sistema
└── Admin (/admin/cognitive-observatory) — ferramenta interna
```

---

## 5. Matriz de Rotas Completas

Para cada rota possivel (caminho completo desde a entrada ate um destino): tempo estimado total, risco de abandono, pontos de friccao.

### 5.1 Rotas de Primeiro Acesso (New User)

| Rota | Caminho | Tempo total | Risco de abandono | Pontos de friccao |
|------|---------|-------------|-------------------|-------------------|
| R01 | Google → Landing → Diagnostico → Resumo | 5-15 min | ALTO (60%) nas perguntas 3-4 | Perguntas longas (desistencia no meio), falta de contexto "por que estou respondendo isso?" |
| R02 | Google → Landing → Diagnostico → Resumo → Conta | 7-20 min | ALTO (40%) no formulario de cadastro | Formulario de 5 campos, email/senha, confianca para criar conta |
| R03 | Google → Landing → Diagnostico → Resumo → Conta → Dashboard | 10-25 min | ALTO (30% saida antes do dashboard) | Tempo total longo para primeira impressao |
| R04 | Indicacao → Landing → Diagnostico → Resumo → Conta → Dashboard | 8-20 min | MEDIO (30%) | Usuario indicado tem mais confianca inicial |
| R05 | Link direto → Diagnostico (sessao valida) → Resumo | 5-12 min | MEDIO (20%) | Sessao pode ter expirado |

### 5.2 Rotas de Retorno (Returning User)

| Rota | Caminho | Tempo total | Risco de abandono | Pontos de friccao |
|------|---------|-------------|-------------------|-------------------|
| R06 | Google → Login → Dashboard | 1-2 min | BAIXO (10%) | Esquecer senha |
| R07 | Bookmark → Login → Dashboard | 30-90s | BAIXO (5%) | Sessao expirada |
| R08 | Login → Dashboard → Assistente → Conversa | 2-5 min | BAIXO (15%) | Rate limit de mensagens |
| R09 | Login → Dashboard → Centro Decisao → Acao | 2-4 min | MEDIO (20%) | Decisoes podem estar desatualizadas |
| R10 | Login → Dashboard → Financeiro → Transacao | 3-6 min | BAIXO (10%) | Navegacao normal |

### 5.3 Rotas de Acao Rapida (Quick Task)

| Rota | Caminho | Tempo total | Risco de abandono |
|------|---------|-------------|-------------------|
| R11 | Dashboard → Tarefas → Criar | 1-2 min | BAIXO |
| R12 | Dashboard → CRM → Mover Lead | 30-90s | BAIXO |
| R13 | Dashboard → Clientes → Ver Perfil | 30-60s | BAIXO |
| R14 | Assistente → Pergunta → Resposta | 1-3 min | MEDIO (se resposta demora) |

### 5.4 Rotas de Exploracao (Discovery)

| Rota | Caminho | Tempo total | Risco de abandono | Nota |
|------|---------|-------------|-------------------|------|
| R15 | Dashboard → Conhecimento → Timeline | 2-5 min | MEDIO | Usuario pode nao entender o valor |
| R16 | Dashboard → Aprendizados → Responder Perguntas | 3-8 min | ALTO | 12 perguntas, cansativo |
| R17 | Dashboard → Centro Decisao → Analisar | 3-8 min | BAIXO | Decisoes sao acionaveis |

### 5.5 Caminhos Criticos (Critical Paths)

| Rota | Descricao | Prioridade | SLA estimado |
|------|-----------|------------|-------------|
| CP01 | Novo usuario → Diagnostico completo → Conta | Conversao maxima | <20 min |
| CP02 | Usuario existente → Login → Dashboard em <3s | Retencao | <3s carregamento |
| CP03 | Dashboard → Acao em qualquer modulo em <2 cliques | Usabilidade | 2 cliques maximo |
| CP04 | Assistente → Resposta em <5s | Experiencia | <5s geracao |

---

## 6. Riscos de Abandono por Transicao

### 6.1 Matriz de Risco

| Transicao | Risco | Fator critico | Mitigacao |
|-----------|-------|---------------|-----------|
| Landing → Diagnostico | 15% | CTA nao ser atraente o suficiente | Testar variacoes de copia do CTA |
| Pergunta 1 → Pergunta 2 | 10% | Primeira pergunta muito generica | Personalizar primeira pergunta |
| Pergunta 2 → Pergunta 3 | 25% | Cansaco, "ja entendi o conceito" | Micro-reacoes engajam, mas perdem efeito |
| Pergunta 3 → Pergunta 4 | 35% | **Ponto critico de abandono** | Reforcar progresso, mostrar "falta pouco" |
| Pergunta 4 → Pergunta 5 | 20% | Retomada de interesse (reta final) | Animacao de contagem regressiva |
| Pergunta 5 → Resumo | 5% | Expectativa pelo resultado | Revelacao surpreendente |
| Resumo → Criar Conta | 40% | **Maior ponto de abandono** | Qualidade do resumo, persuasao |
| Criar Conta → Submit | 30% | Friccao do formulario | Autocomplete, validacao instantanea |
| Criar Conta → Dashboard | 5% | Expectativa apos criacao | Saudacao personalizada |

### 6.2 Fatores de Risco por Tipo de Usuario

| Perfil | Risco medio | Comportamento tipico |
|--------|-------------|----------------------|
| Primeira visita (sem intencao) | 70% | Abandona na landing ou pergunta 1 |
| Primeira visita (com intencao) | 30% | Chega ao resumo, mas pode criar ou nao a conta |
| Indicado por conhecido | 15% | Maior taxa de conversao |
| Visitante recorrente (anonimo) | 25% | Pode completar diagnostico em varias sessoes |
| Usuario autenticado | 5% | Ja esta engajado, navega entre modulos |

---

## 7. Fluxos de Excecao

### 7.1 Sessao Expirada Durante Diagnostico

```
Empresario responde 2 perguntas → fica 25h sem voltar → token expira
→ Ao tentar retomar: API detecta token invalido
→ Landing exibe "Sua sessao expirou. Vamos comecar de novo?"
→ Clique CTA → novo diagnostico
→ Respostas anteriores: PERDIDAS
```

### 7.2 Login Apos Diagnostico Concluido

```
Empresario completa diagnostico mas NAO cria conta
→ Volta dias depois → clica "Descobrir agora"
→ Sistema verifica: sessao expirada? Sim
→ Novo diagnostico e iniciado
→ Se ele ja havia criado conta antes: detecta autenticacao e redireciona para Dashboard
```

### 7.3 Modulo Bloqueado

```
Empresario com plano BASICO tenta acessar CRM
→ Sidebar mostra "bloqueado" (cursor not-allowed, opacidade)
→ Nenhuma navegacao ocorre
→ Se URL direta for acessada: layout renderiza, mas service retorna erro de permissao
→ Tela exibe "Modulo disponivel no plano PROFISSIONAL. Fale com o suporte."
```

### 7.4 Erro de Rede Generalizado

```
Qualquer tela → fetch falha
→ Estado de erro exibido no componente afetado
→ Botao "Tentar novamente" disponivel
→ Se erro for de autenticacao: redirect para /login
→ Se erro for de servidor (500): mensagem generica + contato suporte
```

### 7.5 Retorno Apos Ausencia Prolongada

```
Empresario nao acessa por >7 dias:
→ Ao login: saudacao normal + notificacao "Veja o que mudou desde sua ultima visita"
→ Dashboard destaca novos insights, mudancas no health score

Empresario nao acessa por >30 dias:
→ Ao login: "Vamos atualizar seu diagnostico?"
→ Sugestao de revisitar o assistente para atualizar contexto
```

---

## 8. Glossario de Termos de Navegacao

| Termo | Definicao |
|-------|-----------|
| **Transicao** | Movimento do empresario entre duas telas |
| **Gatilho** | Acao do usuario ou do sistema que inicia uma transicao |
| **Animacao** | Efeito visual que acompanha a transicao |
| **Tempo de transicao** | Duracao da animacao em milissegundos |
| **Fluxo interrompido** | Cenario onde o usuario sai antes de completar o objetivo da tela |
| **Rota** | Caminho completo de A ate B incluindo todas as telas intermediarias |
| **Estado cognitivo** | Nivel de compreensao que a IA tem sobre a empresa |
| **Ponto de friccao** | Momento na rota onde o risco de abandono e maior |
| **Tela hub** | Tela que serve como centro de distribuicao para outras telas (Dashboard, Assistente) |
| **Tela terminal** | Tela que nao possui saida para outras telas (apenas retorno) |

---

> **Fim do Documento 1 — MAPA_COMPLETO_DA_APLICACAO.md**
> Proximo: `ARQUITETURA_OFICIAL_DA_NAVEGACAO.md`
