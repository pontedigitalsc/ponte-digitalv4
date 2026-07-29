# ARQUITETURA OFICIAL DA NAVEGACAO — Tipos, Regras e Comportamentos

> **Documento P29.2** — Arquiteto de Superficie Cognitiva
> Data: 26/07/2026 | Status: Oficial

---

## SUMARIO

1. [Introducao](#1-introducao)
2. [Navegacao Principal — Sidebar](#2-navegacao-principal--sidebar)
3. [Navegacao Secundaria — Tabs, Breadcrumbs, Voltar, Continuar](#3-navegacao-secundaria)
4. [Navegacao Contextual — Links Dentro de Conteudo](#4-navegacao-contextual)
5. [Navegacao Invisivel — Atalhos, Gestos, Voz](#5-navegacao-invisivel)
6. [Breadcrumbs — Regras e Formato](#6-breadcrumbs)
7. [Fluxos Interrompidos — Salvamento e Restauracao](#7-fluxos-interrompidos)
8. [Retomadas — Comportamento de Retorno](#8-retomadas)
9. [Hierarquia de Navegacao — Prioridade de Conflitos](#9-hierarquia-de-navegacao)
10. [Tratamento de Modulos Bloqueados](#10-tratamento-de-modulos-bloqueados)
11. [Regras de Roteamento no Next.js](#11-regras-de-roteamento-no-nextjs)
12. [Matriz de Decisao de Navegacao](#12-matriz-de-decisao-de-navegacao)
13. [Padroes de Transicao e Animacao](#13-padroes-de-transicao-e-animacao)
14. [Glossario da Arquitetura de Navegacao](#14-glossario-da-arquitetura-de-navegacao)

---

## 1. Introducao

### 1.1 O que e a Arquitetura de Navegacao

A arquitetura de navegacao da Ponte Digital define **como o empresario se move entre as telas** — nao apenas o mapa de rotas, mas as regras, prioridades, comportamentos e tratamentos de cada tipo de navegacao.

Ela existe em 4 camadas:

```
CAMADA 1: Navegacao Principal  → Sidebar (sempre visivel, persistente)
CAMADA 2: Navegacao Secundaria → Tabs, Breadcrumbs, Voltar, Continuar
CAMADA 3: Navegacao Contextual → Links em insights, cards, sugeridos pela IA
CAMADA 4: Navegacao Invisivel  → Atalhos de teclado, gestos, voz
```

Cada camada tem regras proprias de aparecimento, prioridade e comportamento.

### 1.2 Principios da Navegacao na Ponte Digital

1. **O empresario nunca deve se sentir perdido.** Em qualquer tela, ele deve saber:
   - Onde esta (indicacao visual clara)
   - Como voltar (sempre disponivel)
   - Para onde pode ir (proximos passos sugeridos)
2. **A sidebar e o norte.** Se o empresario estiver confuso, a sidebar e o ponto de orientacao. Ela nunca desaparece no desktop.
3. **A conversa e o contexto.** Quando o empresario esta no Assistente ou no Diagnostico, aquele e o contexto — nao se sobrepoe breadcrumbs ou navegacao desnecessaria.
4. **Menos e mais.** Cada tela tem no maximo UM CTA principal ("Continuar") e UM de apoio ("Voltar"). Navegacao excessiva compete com a atencao do empresario.
5. **Navegacao nao e decoracao.** Todo link, botao ou gesto precisa responder a pergunta: "qual problema do empresario isso resolve agora?"

---

## 2. Navegacao Principal — Sidebar

### 2.1 Regras Gerais

| Regra | Valor |
|-------|-------|
| **Visibilidade** | Sempre visivel em desktop. Colapsavel (toggle) em mobile/tablet. |
| **Largura** | Expandida: 240px (w-60). Colapsada: 64px (w-16). |
| **Transicao** | `transition-all duration-300 ease-in-out` — animacao suave ao colapsar/expandir. |
| **Z-index** | 50 (acima do conteudo mas abaixo de modais/dropdowns). |
| **Overflow** | `overflow-y-auto` com scroll interno se grupos excedem a altura da tela. |
| **Responsividade** | Desktop: expandida por padrao, colapsavel. Mobile: escondida por padrao, overlay ao abrir. |
| **Background** | `bg-card` (tema claro/escuro). Borda direita `border-r`. |
| **Toogle** | Botao `ChevronLeft` no canto inferior direito (expandida) ou centro inferior (colapsada). |

### 2.2 Itens da Sidebar — Ordem e Grupos

A ordem dos itens e definida por **prioridade cognitiva** (o que e mais util para o empresario decidir agora), nao alfabetica:

```
GRUPO: "Principal"         (uso diario, centro da operacao)
  1. Inicio                /dashboard          Icon: LayoutDashboard
  2. Tarefas               /tarefas            Icon: CheckSquare

GRUPO: "Comercial"         (gestao de receita)
  3. CRM                   /crm                Icon: TrendingUp
  4. Clientes              /clientes           Icon: UserCheck

GRUPO: "Operacional"       (dia a dia da operacao)
  5. Implantacoes          /implantacoes       Icon: Layers
  6. Historico             /historico          Icon: Clock

GRUPO: "Financeiro"        (saude financeira)
  7. Financeiro            /financeiro         Icon: DollarSign

GRUPO: "Inteligencia"      (camada cognitiva)
  8. Conhecimento          /conhecimento       Icon: Sparkles
  9. Aprendizados          /aprendizados       Icon: RefreshCw
  10. Assistente IA        /assistente         Icon: Bot

GRUPO: "Sistema"           (configuracao)
  11. Configuracoes        /configuracoes       Icon: Settings
```

**Justificativa da ordem:**
- **Inicio** primeiro porque e o hub central (para onde o empresario sempre volta)
- **Tarefas** segundo porque e acao diaria (o que fazer hoje)
- **Comercial** antes de Operacional porque gera receita (prioridade empresarial)
- **Financeiro** depois de Operacional porque depende de dados operacionais
- **Inteligencia** no final porque e camada cognitiva (uso menos frequente, maior profundidade)
- **Sistema** sempre por ultimo (utilitario)

### 2.3 Itens — Estrutura de Cada Um

Cada item possui obrigatoriamente:

```
{
  href: string            // URL da rota (ex: "/dashboard")
  label: string           // Nome visivel (ex: "Inicio")
  icon: LucideIcon        // Componente de icone
  grupo: string           // Nome do grupo (ex: "Principal")
  notificavel: boolean    // Se pode ter badge de notificacao
  liberado: boolean       // Se o modulo esta disponivel para o plano
  ativo: (pathname) => boolean  // Funcao que determina se o item esta ativo
}
```

### 2.4 Estado Ativo

| Regra | Comportamento |
|-------|---------------|
| Correspondencia exata | `pathname === item.href` → ativo (ex: `/dashboard`) |
| Prefixo de subrota | `pathname.startsWith(item.href + '/')` → ativo (ex: `/clientes/123` ativa "Clientes") |
| Visual | Background `bg-primary` + texto `text-primary-foreground` |
| Excecao | Nenhum item fica ativo na Landing, Diagnostico, Login ou Criar Conta (esses usam layout diferente) |

### 2.5 Badge de Notificacao

Cada item com `notificavel: true` pode exibir um badge numerico ao lado do icone:

```
// Regras do badge:
- Exibido apenas se count > 0
- Valor maximo: 99+ (acima disso, exibir "99+")
- Cor: `bg-primary` texto branco
- Tamanho: `h-5 min-w-[20px] text-[11px]`
- Atualizado a cada navegacao (via cognitiveOS.notifications)
- Posicao: top-right do icone (absolute)
```

### 2.6 Estado Colapsado

Quando a sidebar esta colapsada (64px):

- Apenas icones sao exibidos (sem labels, sem grupos)
- Ao hover sobre um item: tooltip com o nome aparece (atributo `title`)
- O nome da empresa e substituido pelo icone `Building2` centralizado
- O rodape com Health Score e Notificacoes e ocultado
- O toggle de colapsar aparece como icone rotacionado no rodape

### 2.7 Modulos Bloqueados (Gating por Plano)

Quando um modulo nao esta liberado para o plano do usuario:

```
// Regras de exibicao:
- Icone com opacidade reduzida (text-muted-foreground/40)
- Cursor: not-allowed
- Label: texto normal + "bloqueado" em cinza claro (text-[10px])
- Click: nenhuma navegacao ocorre
- Tooltip (colapsado): icone + indicador visual de bloqueio
- Comportamento: `isLiberado(href)` retorna `false`
- Nao interfere com a exibicao dos outros itens
```

**Regra de negocio:** modulos bloqueados SAO exibidos (para que o empresario saiba que existem), mas nao podem ser acessados.

---

## 3. Navegacao Secundaria

### 3.1 Tabs Internas (Dentro de Cada Modulo)

Alguns modulos possuem subsecoes navegaveis via tabs:

| Modulo | Tabs |
|--------|------|
| Configuracoes | Geral, Perfil, Membros |

**Regras das Tabs:**
- Aparecem abaixo do titulo da pagina e acima do conteudo
- Estado ativo: underline + cor primaria
- Navegacao via estado interno (nao via URL — o componente gerencia)
- Transicao: fade entre conteudos (200ms)
- Nunca mais de 5 tabs por modulo

### 3.2 Breadcrumbs

Ver secao 6 para detalhes completos. Resumo:

- Exibidos apenas se > 2 niveis de profundidade
- Formato: `Secao > Subsecao`
- Maximo 3 niveis
- Nunca na tela de conversa

### 3.3 Botao "Voltar"

**Regras do Voltar:**

| Tela | Comportamento |
|------|---------------|
| Landing | Nao ha "voltar" (e a primeira tela) |
| Diagnostico | Nao ha "voltar" explicito (a conversa e linear) |
| Resumo | Nao ha "voltar" explicito (decisao: criar conta ou sair) |
| Criar Conta | "Voltar" no navegador funciona normalmente |
| Login | "Voltar" no navegador funciona normalmente |
| Dashboard | Sidebar e suficiente (Inicio) |
| Qualquer modulo com sidebar | Sidebar e suficiente |
| Submodulo (ex: `/clientes/[id]`) | Botao "Voltar para Clientes" acima do conteudo |
| Assistente | Sidebar e suficiente |

**Implementacao do Voltar em submodulos:**

```
// Posicao: topo da pagina, antes do titulo
// Label: "Voltar para [modulo]"
// Icon: ChevronLeft
// Comportamento: router.back() ou router.push(modulo pai)
// Visivel apenas se o usuario veio de navegacao interna
```

### 3.4 Botao "Continuar" (CTA Principal)

Cada tela possui UM CTA principal. Regras:

| Tela | CTA | Comportamento |
|------|-----|---------------|
| Landing | "Descobrir agora" | Iniciar diagnostico |
| Diagnostico | "Enviar" (input) / "Continuar agora" (reacao) | Avancar pergunta |
| Resumo | "Quero criar minha conta e continuar" | Criar conta |
| Criar Conta | "Salvar e acessar" | Submit + redirect |
| Login | "Entrar" | Autenticar |
| Dashboard | Nenhum CTA fixo (cards internos tem seus proprios CTAs) |
| Assistente | Input de mensagem | Enviar pergunta |
| Demais modulos | CTA varia conforme acao (criar, salvar, filtrar) |

**Posicao do CTA:**
- Telas de formulario: abaixo do formulario, largura total
- Telas de leitura: no fim do conteudo
- Telas de conversa: no input fixo no rodape

---

## 4. Navegacao Contextual

### 4.1 O que e

Links inseridos dentro de conteudos que levam a modulos relacionados. Exemplos:

- Card "Complete seu diagnostico" no Dashboard → CTA "Ir para o diagnostico" → `/assistente`
- Card "Saber mais" no Dashboard → `/conhecimento`
- Sugestao no Assistente: "Parece que voce precisa revisar suas financas" → link `/financeiro`

### 4.2 Regras

| Regra | Valor |
|-------|-------|
| Aparece | Quando relevante para o contexto atual |
| Desaparece | Quando nao e mais relevante (nunca exibir link morto) |
| Competicao | Nunca compete com a sidebar — links contextuais sao complementares |
| Prioridade | Navegacao Principal > Navegacao Contextual |
| Estilo | Texto com underline + cor primaria, ou botao secundario com CTA |
| Comportamento | `Link` do Next.js — navegacao client-side sem recarregar |
| Rastreabilidade | Todo clique em link contextual e registrado como evento de navegacao |

### 4.3 Matriz de Links Contextuais por Tela

| Tela | Links contextuais | Destino |
|------|-------------------|---------|
| Dashboard | "Ir para o diagnostico" (PriorityCard) | `/assistente` |
| Dashboard | "Ver recomendacoes" (PriorityCard) | `/dashboard` (scroll) |
| Dashboard | "Entender jornada" (PriorityCard) | `/assistente` |
| Dashboard | "Saber mais" (PriorityCard) | `/conhecimento` |
| Assistente | Links sugeridos pela IA na resposta | Qualquer modulo |
| Centro Decisao | Acoes sugeridas em cada decisao | Modulo relacionado |
| Financeiro | "Ver cliente" em transacao | `/clientes/[id]` |

---

## 5. Navegacao Invisivel

### 5.1 Conceito

Navegacao que o empresario **descobre naturalmente** — nao esta explicita na interface, mas e intuitiva e consistente com padroes de UX.

### 5.2 Atalhos de Teclado

| Atalho | Acao | Contexto |
|--------|------|----------|
| `Ctrl + K` | Abrir busca global | Qualquer tela (header) |
| `Ctrl + B` | Toggle sidebar | Qualquer tela com sidebar |
| `Escape` | Fechar modal/dropdown | Qualquer modal aberto |
| `Enter` | Enviar mensagem | Assistente, Diagnostico |
| `/` | Focar no input de busca | Listas (clientes, financeiro, conhecimento) |

**Regras de implementacao:**
- Atalhos sao opcionais (nunca obrigatorios para navegar)
- Nao interferem com atalhos do navegador
- Registrados via `useEffect` com `keydown` listener
- Exibidos em tooltips ao hover sobre botoes (quando aplicavel)

### 5.3 Gestos (Mobile)

| Gesto | Acao |
|-------|------|
| Swipe direita para esquerda | Fechar sidebar (se aberta como overlay) |
| Swipe esquerda para direita | Abrir sidebar (se oculta) |
| Pull down | Refresh de dados (listas) |
| Tap no topo | Scroll ao topo da pagina |

### 5.4 Comandos de Voz

**Futuro (congelado).** A navegacao por voz nao esta na V4 Founder. Registrado como hipotese para Fase 2.

### 5.5 Scroll Infinito

Aplicavel em:

- Lista de transacoes (`/financeiro`)
- Lista de clientes (`/clientes`)
- Timeline de conhecimento (`/conhecimento`)

**Regra:** Scroll infinito com paginacao de 20 itens por pagina. Trigger quando o usuario esta a 200px do fim da lista.

---

## 6. Breadcrumbs

### 6.1 Regras Gerais

| Regra | Valor |
|-------|-------|
| **Formato** | `Secao > Subsecao` |
| **Maximo de niveis** | 3 (Secao > Subsecao > Subsubsecao) |
| **Clique em nivel superior** | Navega para aquele nivel |
| **Nivel atual** | Texto puro (sem link) — ultimo item |
| **Separador** | `>` (ou `/` em mobile) |
| **Posicao** | Abaixo do header, acima do titulo da pagina |

### 6.2 Quando Exibir

| Contexto | Exibe? | Exemplo |
|----------|--------|---------|
| Landing | Nao | — |
| Diagnostico | Nao | A conversa e o contexto |
| Dashboard | Nao | Apenas 1 nivel |
| CRM | Nao | Apenas 1 nivel |
| Clientes | Nao | Apenas 1 nivel |
| **Cliente Perfil** | **Sim** | `Clientes > [Nome do Cliente]` |
| **Financeiro** | Nao | Apenas 1 nivel (por enquanto) |
| Configuracoes | Nao | Apenas 1 nivel |
| **Configuracoes > Perfil** | **Sim** (se >2 niveis) | `Configuracoes > Perfil` |

### 6.3 Implementacao

```
// Arquivo: components/shared/breadcrumbs.tsx
// Props: items: { label: string, href?: string }[]

<nav aria-label="Breadcrumb">
  <ol>
    {items.map((item, i) => (
      <li key={i}>
        {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        {i < items.length - 1 && <span class="separator">/</span>}
      </li>
    ))}
  </ol>
</nav>
```

### 6.4 Excecao Importante

**Nunca exibir breadcrumbs na tela de conversa (Diagnostico / Assistente).**

Justificativa: a conversa e o contexto unico do empresario naquele momento. Breadcrumbs quebram a imersao e criam a sensacao de "estar em uma pagina", nao "em uma conversa".

---

## 7. Fluxos Interrompidos

### 7.1 Definicao

Um fluxo interrompido ocorre quando o empresario **sai de uma tela antes de completar seu objetivo primario**, intencionalmente ou nao.

### 7.2 Matriz de Fluxos Interrompidos

| Tela | Objetivo primario | O que preservar | Como restaurar |
|------|-------------------|-----------------|----------------|
| Diagnostico | Responder 5 perguntas | Respostas parciais + pergunta atual | Ao retornar, retoma da ultima pergunta pendente |
| Criar Conta | Preencher formulario e submit | NADA (por seguranca) | Preencher novamente |
| CRM — Editar Lead | Alterar dados do lead | NADA (ate submit explicito) | Reabrir lead e re editar |
| Financeiro — Nova Transacao | Criar transacao | NADA (ate submit explicito) | Recomecar criacao |
| Aprendizados — Pergunta Rapida | Responder pergunta | NADA (resposta so e salva se concluida) | Recomecar pergunta |

### 7.3 Regras Gerais de Preservacao

```
1. Se o fluxo envolve resposta do usuario que a IA processa:
   → PRESERVAR progresso (diagnostico, questionarios)

2. Se o fluxo envolve dados sendo editados:
   → NAO PRESERVAR (evitar dados inconsistentes)
   → Excecao: se for um formulario muito longo (>5 campos), considerar auto-save

3. Se o fluxo envolve navegacao de leitura:
   → NAO PRESERVAR (o estado e efemero por design)

4. Toda preservacao tem TTL maximo:
   → Diagnostico: 24h (token de sessao expira)
   → Progresso de questionario: 7 dias
```

### 7.4 Sinalizacao de Fluxo Interrompido

Quando o empresario retorna a uma tela com fluxo interrompido:

```
// Comportamento:
- Se progresso > 0: exibir indicador "Continuando de onde paramos"
- Se progresso = 0: tela normal (sem interrupcao)
- Excecao: se expirou o TTL: "Sua sessao anterior expirou. Vamos comecar novamente."
```

### 7.5 Botao "Continuar de Onde Parou"

**Onde aparece:** Na tela inicial (Landing, se o usuario tem sessao ativa) e no Dashboard (se o usuario tem acao pendente).

```
// Regras:
- Exibido apenas se existe progresso salvo E nao expirou
- Texto: "Continuar de onde parou"
- Comportamento: redirect para a tela do fluxo interrompido
- Prioridade: acima dos CTAs padrao
```

### 7.6 Timeout de Sessao

| Parametro | Valor |
|-----------|-------|
| Timeout de inatividade | 30 minutos |
| Acao ao timeout | Salvar estado atual (se aplicavel) + desconectar |
| Aviso previo | 2 minutos antes: modal "Sua sessao vai expirar. Deseja continuar?" |
| Apos timeout | Redirect para `/login` com estado restaurado |

---

## 8. Retomadas

### 8.1 Comportamento ao Retornar

Quando o empresario retorna a plataforma apos uma ausencia:

| Tempo de ausencia | Comportamento | Acao |
|-------------------|---------------|------|
| < 2 horas | Saudacao normal + continuacao natural | Dashboard renderiza normalmente |
| 2 — 24 horas | Saudacao + "Bem-vindo de volta" | Dashboard com dados atualizados |
| 1 — 7 dias | Saudacao personalizada + resumo de mudancas | Dashboard destaca "O que mudou" |
| 7 — 30 dias | "Veja o que mudou desde sua ultima visita" + oferta de revisao | Banner no topo do Dashboard |
| > 30 dias | "Vamos atualizar seu diagnostico?" + sugestao de revisitar assistente | Modal ou banner "Sua empresa pode ter mudado" |

### 8.2 Restauracao de Estado

Ao retornar para qualquer tela:

```
1. Verificar se ha fluxo interrompido
   ├── Sim: restaurar progresso + exibir indicador
   └── Nao: renderizar estado padrao da tela

2. Verificar se ha sessao anterior
   ├── Sim (autenticado): Dashboard com saudacao personalizada
   └── Nao: Landing

3. Verificar data da ultima visita
   ├── < 7 dias: normal
   ├── 7-30 dias: "Veja o que mudou"
   └── > 30 dias: "Vamos atualizar?"
```

### 8.3 Saudacao Personalizada

```
// Regras:
- Baseada no horario: "Bom dia", "Boa tarde", "Boa noite"
- Nome: primeiro nome do usuario
- Contexto: se ha acao pendente, incluir no subtitulo
- Exemplo: "Bom dia, Joao. Voce tem 3 tarefas para hoje."
- Implementacao: funcao `saudacao()` em dashboard/page.tsx
```

---

## 9. Hierarquia de Navegacao

Quando multiplas opcoes de navegacao estao disponiveis, a prioridade e:

```
1. BLOQUEIO DE SEGURANCA
   - Se nao autenticado: redirect para /login
   - Se modulo nao liberado: mostrar bloqueio, nao navegar

2. ACAO DO USUARIO (intencional)
   - Clique em sidebar > Clique em link contextual > Atalho de teclado

3. ACAO DO SISTEMA (automatica)
   - Redirect apos login > Redirect apos criacao de conta
   - Timeout de sessao > Erro de autenticacao

4. SUGESTAO CONTEXTUAL
   - Assistente sugere > Cards de insight > Priority Cards
```

### 9.1 Matriz de Conflitos

| Conflito | Resolucao |
|----------|-----------|
| Link contextual leva a modulo bloqueado | Nao exibir o link |
| Sidebar e breadcrumb apontam para mesmo destino | Ambos funcionam — sidebar sempre disponivel |
| CTA e link contextual na mesma tela | CTA tem prioridade (e primario) |
| Atalho de teclado conflita com input nativo | Atalho so funciona fora de inputs |
| Modal aberto e clique fora | Fechar modal antes de navegar |

---

## 10. Tratamento de Modulos Bloqueados

### 10.1 Cenario

Empresario com plano BASICO. Alguns modulos (ex: CRM, Assistente IA) nao estao disponiveis.

### 10.2 Comportamento em Cada Nivel de Navegacao

| Nivel | Comportamento |
|-------|---------------|
| **Sidebar** | Item exibido com `opacity: 0.4` + rotulo "bloqueado" + cursor `not-allowed` |
| **URL direta** | Layout renderiza, mas service retorna erro de permissao → tela exibe "Modulo nao disponivel no seu plano" |
| **Link contextual** | Nao exibir (gating no backend impede a geracao do link) |
| **Sugestao do Assistente** | Assistente nao sugere modulos que o usuario nao pode acessar |

### 10.3 Upsell

Quando um modulo bloqueado e encontrado:

```
Tela exibe:
  "Este modulo esta disponivel no plano PROFISSIONAL."
  [Botao: "Conhecer planos"] → /configuracoes/planos
```

---

## 11. Regras de Roteamento no Next.js

### 11.1 Estrutura de Diretorios

```
src/app/
├── page.tsx                          # Landing (/)
├── layout.tsx                        # Root Layout
├── globals.css
├── conversa/page.tsx                 # Diagnostico (/conversa)
├── (auth)/
│   ├── layout.tsx                    # Auth Layout (painel lateral)
│   ├── login/page.tsx                # Login (/login)
│   ├── criar-conta/page.tsx          # Criar Conta (/criar-conta)
│   ├── reset-password/
│   │   ├── page.tsx                  # Reset (/reset-password)
│   │   └── confirmar/page.tsx        # Confirmacao (/reset-password/confirmar)
├── (dashboard)/
│   ├── layout.tsx                    # Dashboard Layout (sidebar + header)
│   ├── dashboard/page.tsx            # Dashboard (/dashboard)
│   ├── assistente/page.tsx           # Assistente (/assistente)
│   ├── crm/page.tsx                  # CRM (/crm)
│   ├── clientes/
│   │   ├── page.tsx                  # Lista (/clientes)
│   │   └── [id]/page.tsx             # Perfil (/clientes/[id])
│   ├── tarefas/page.tsx              # Tarefas (/tarefas)
│   ├── financeiro/page.tsx           # Financeiro (/financeiro)
│   ├── centro-decisao/page.tsx       # Centro Decisao (/centro-decisao)
│   ├── conhecimento/page.tsx         # Conhecimento (/conhecimento)
│   ├── aprendizados/page.tsx         # Aprendizados (/aprendizados)
│   ├── historico/page.tsx            # Historico (/historico)
│   ├── implantacoes/page.tsx         # Implantacoes (/implantacoes)
│   ├── configuracoes/page.tsx        # Configuracoes (/configuracoes)
│   └── admin/
│       └── cognitive-observatory/page.tsx  # Admin (/admin/cognitive-observatory)
```

### 11.2 Regras de Layout

| Layout | Aplica-se a | Caracteristicas |
|--------|-------------|-----------------|
| Root (`/layout.tsx`) | Todas as paginas | ThemeProvider, fontes, metadata global |
| Auth (`/(auth)/layout.tsx`) | Login, Criar Conta, Reset Password | Painel lateral com branding, formulario centralizado |
| Dashboard (`/(dashboard)/layout.tsx`) | Dashboard e todos os modulos | `requireUser` + `AppShell` (sidebar + header) |
| Nenhum (layout implicito) | Landing, Diagnostico | Root Layout apenas, sem sidebar |

### 11.3 Regras de Redirect

| Condicao | Origem | Destino |
|----------|--------|---------|
| Nao autenticado acessa dashboard | `/dashboard`, `/clientes`, etc. | `/login` |
| Autenticado acessa login | `/login` | `/dashboard` |
| Autenticado acessa landing | `/` | `/dashboard` |
| Criar conta sem diagnostico | `/criar-conta` | `/conversa` |
| Diagnostico sem token | `/conversa` | `/` |

### 11.4 API Routes de Navegacao

| Rota | Funcao |
|------|--------|
| `GET /api/sessao/iniciar` | Criar token de sessao e redirecionar para `/conversa` |
| `GET /api/experience/login` | Determinar redirect pos-login (baseado em estado pendente) |

---

## 12. Matriz de Decisao de Navegacao

### 12.1 Para cada tipo de transicao

```
╔══════════════════════════════════════════════════════════════════════════╗
║                   MATRIZ DE DECISAO DE NAVEGACAO                        ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  NovaPagina = f(usuario, tela, contexto, permissao, estado)              ║
║                                                                          ║
║  1. usuario.estaAutenticado?                                             ║
║     ├── Nao → redirectLogin()                                           ║
║     └── Sim → 2                                                         ║
║                                                                          ║
║  2. usuario.temPermissao(tela)?                                          ║
║     ├── Nao → exibirBloqueio(tela)                                      ║
║     └── Sim → 3                                                         ║
║                                                                          ║
║  3. tela == 'dashboard'?                                                 ║
║     ├── Sim → renderizarDashboard(usuario.empresaId)                     ║
║     └── Nao → 4                                                         ║
║                                                                          ║
║  4. context.existeAcaoPendente(usuario)?                                 ║
║     ├── Sim → exibirBannerRetomada()                                     ║
║     └── Nao → renderizarTelaNormal()                                     ║
║                                                                          ║
║  5. Apos renderizar: registrarVisita(usuario, tela)                      ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

### 12.2 Tabela de Decisao para Cada Tela

| Tela | Requer auth? | Requer perm? | Redireciona se... | Renderiza se... |
|------|-------------|--------------|-------------------|-----------------|
| Landing | Nao | Nao | Ja autenticado → `/dashboard` | Nao autenticado |
| Diagnostico | Nao | Nao | Sem token → `/` | Token valido |
| Criar Conta | Nao | Nao | Sem diagnostico → `/conversa` | Diagnostico concluido |
| Login | Nao | Nao | Ja autenticado → `/dashboard` | Nao autenticado |
| Dashboard | Sim | Nao | Nao autenticado → `/login` | Autenticado |
| CRM | Sim | Sim (PROFISSIONAL+) | Nao autorizado → bloqueio | Autorizado |
| Clientes | Sim | Sim | Nao autorizado → bloqueio | Autorizado |
| Financeiro | Sim | Sim | Nao autorizado → bloqueio | Autorizado |
| Centro Decisao | Sim | Sim | Nao autorizado → bloqueio | Autorizado |
| Conhecimento | Sim | Sim | Nao autorizado → bloqueio | Autorizado |
| Aprendizados | Sim | Sim | Nao autorizado → bloqueio | Autorizado |
| Assistente | Nao (anonimo) | Sim (PROFISSIONAL+) | Nao autorizado → chat limitado | Qualquer |
| Configuracoes | Sim | Sim | Nao autorizado → bloqueio | Autorizado |
| Admin/Observatory | Sim | Sim (ADMIN) | Nao admin → `/dashboard` | Admin |

---

## 13. Padroes de Transicao e Animacao

### 13.1 Catalogo de Animacoes

| Animacao | Quando usar | Duracao | CSS/Easing |
|----------|-------------|---------|------------|
| **Fade** | Transicoes entre paginas, abertura de modais | 300ms | `opacity 300ms ease-in-out` |
| **Slide Up** | Nova pergunta no diagnostico, novo card entrando | 600ms | `transform translateY(20px) 600ms ease-out` |
| **Slide** | Transicao entre modulos (sidebar) | 300ms | `transform translateX(0) 300ms ease-in-out` |
| **Fade + Slide** | Transicao assistente → modulo | 300ms | Combinacao dos dois |
| **Scale** | Abertura de modal/overlay | 200ms | `transform scale(0.95→1) 200ms ease-out` |

### 13.2 Regras de Animacao

```
1. Animacoes sao OPCIONAIS — nunca impedem a navegacao
2. Duracao maxima: 600ms (acima disso, o empresario percebe latencia)
3. Todas as animacoes respeitam prefers-reduced-motion
4. Animacoes de transicao so ocorrem entre paginas diferentes (nao em SPA state changes)
5. Loading states usam esqueletos (skeleton), nunca spinners gigantes
```

### 13.3 Reducao de Movimento

```
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 14. Glossario da Arquitetura de Navegacao

| Termo | Definicao |
|-------|-----------|
| **Navegacao Principal** | Sidebar — sempre visivel, acesso a todos os modulos |
| **Navegacao Secundaria** | Tabs, breadcrumbs, voltar, continuar — apoio a navegacao principal |
| **Navegacao Contextual** | Links dentro de conteudos (insights, cards, sugestoes) |
| **Navegacao Invisivel** | Atalhos, gestos, voz — descoberta natural |
| **Estado Ativo** | Indicacao visual de qual item da sidebar corresponde a tela atual |
| **Badge** | Indicador numerico de notificacoes ao lado do icone na sidebar |
| **Gating** | Mecanismo de liberacao de modulos por plano |
| **Fluxo Interrompido** | Estado parcial de uma acao quando o usuario sai antes de completa-la |
| **Retomada** | Comportamento ao retornar a plataforma apos ausencia |
| **TTL** | Tempo de vida de um estado preservado (token, progresso) |
| **CTA** | Call to Action — botao principal da tela |
| **Hub Central** | Tela que serve como centro de distribuicao (Dashboard, Assistente) |

---

> **Fim do Documento 2 — ARQUITETURA_OFICIAL_DA_NAVEGACAO.md**
> Proximo: `SISTEMA_OFICIAL_DE_ESTADOS.md`
