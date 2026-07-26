# Primeiro Login com Escopo Curado

> PROGRAMA 15 — Documento 6 de 10
> Primeiro login útil: superfície mínima, dados prioritários, módulos ocultos, progressão por maturidade

---

## Relatório de execução

- **Descobertas:** o fluxo de criação de conta já existe e já executa `processarCadastro()` no Orchestrator. O Experience Engine (`obterLoginExperience`, `obterDashboardExperience`) já existe e pode ser adaptado para escopo curado. O que não existe é o filtro de módulos por nível de ativação.
- **Pressupostos:** o Experience Engine existente é suficiente para implementar escopo curado — basta adicionar lógica de "o que mostrar com base no EventoAtivacao". A Founder Activation Engine já tem os níveis.
- **Lacunas:** a Experience Engine hoje retorna a mesma experiência para todos os usuários logados, independente do nível de ativação. Não há diferenciação entre "primeiro login" e "login do dia 30".
- **Riscos:** a Founder Activation Engine tem níveis pré-definidos (NOVO → CONHECENDO → ATIVO → ENGAJADO → FUNDADOR_VALIDADO). Se o escopo curado for implementado com base nesses níveis, qualquer mudança nos níveis afeta o escopo. É um acoplamento aceitável por ora.
- **Conflitos:** nenhum.
- **Impactos futuros:** este padrão de escopo curado define como novos módulos serão liberados para o empresário ao longo do tempo. É a base do Onboarding Cognitivo.
- **Confirmação de coerência:** coerente com a Jornada Fundacional (Capítulo 4 — Onboarding Cognitivo), com o Eixo 5 do Programa 15, e com o fluxo de criação de conta existente.

---

## 1. Princípios do escopo curado

1. **Mostrar menos é mostrar mais:** o empresário não precisa ver tudo no primeiro dia
2. **Contexto determina escopo:** o que ele vê depende do que ele respondeu no diagnóstico
3. **Progressão natural:** novos módulos aparecem quando ele está pronto, não quando o sistema decide
4. **Zero surpresa:** módulos bloqueados são visíveis mas identificados como "Em breve"
5. **Continuidade:** o primeiro login é continuação do diagnóstico, não recomeço

---

## 2. Superfície mínima

### 2.1 O que aparece no primeiro login

Após criar conta e ser redirecionado para `/dashboard`:

**Header:**
- Nome da empresa
- Avatar do usuário
- Notificações (zero inicialmente)

**Sidebar:**
```
🏠 Início                     ← ativo
💬 Assistente                 ← ativo
━ Recursos ───
🎯 Decisões                   ← ativo (simplificado)
📋 Tarefas                    ← acinzentado: "Disponível em breve"
━ Gestão ───
👥 Clientes                   ← acinzentado: "Disponível em breve"
💰 Financeiro                 ← acinzentado: "Disponível em breve"
━ Inteligência ───
📚 Conhecimento               ← acinzentado: "Disponível em breve"
🔄 Aprendizados               ← acinzentado: "Disponível em breve"
━━━━━━━━━━━━━━━━━
⚙️ Configurações              ← ativo
```

**Dashboard (centro):**
- **Banner de boas-vindas:** "Bem-vindo, [nome]! Com base no que você me contou, organizei algumas prioridades para começarmos."
- **Card de prioridade 1:** baseado no principal problema identificado
- **Card de prioridade 2:** baseado no objetivo declarado
- **Card do Assistente:** "Precisa de ajuda? Estou aqui." com campo de input rápido

**Nada mais.** Sem gráfico de receita. Sem lista de tarefas. Sem timeline de clientes.

### 2.2 O que NÃO aparece

| Elemento | Motivo |
|----------|--------|
| Gráfico de fluxo de caixa | Ele não tem dados financeiros ainda |
| Lista de clientes | Ele não cadastrou clientes ainda |
| Pipeline de leads | Não faz sentido sem clientes |
| Knowledge Vault | Vazio sem uso |
| Métricas cognitivas | Técnico demais para o primeiro dia |
| Observatório de saúde cognitiva | Admin only |
| Centro de Decisão completo | Apenas 2 itens, não 10 |

---

## 3. Dados prioritários

### 3.1 O que é mostrado nos cards de prioridade

Os 2 cards do dashboard são gerados a partir do diagnóstico:

**Card 1 — Prioridade baseada no maior problema:**
```
🎯 [Problema principal identificado]
—————————————————————
Você mencionou que [problema]. 
Este é um bom ponto de partida.

→ [Ação sugerida]
```

**Card 2 — Prioridade baseada no objetivo:**
```
⭐ [Objetivo declarado]
—————————————————————
Seu objetivo para os próximos meses é [objetivo].
Vamos trabalhar nessa direção.

→ [Primeiro passo]
```

### 3.2 Regras de geração

| Regra | Descrição |
|-------|-----------|
| Card 1 sempre do Bloco 4 (Problemas) | A maior dor é sempre a prioridade |
| Card 2 sempre do Bloco 5 (Objetivos) | Onde ele quer chegar |
| Máximo 2 cards | Nunca mais que isso |
| Ação sugerida é 1 passo simples | Coisa que ele pode fazer HOJE |
| Se não houver problema declarado | Card único com "Vamos começar devagar" |

### 3.3 Exemplos reais

**Barbearia:**
```
🎯 Fluxo de caixa
Você mencionou que o dinheiro some sem explicação.
Que tal começarmos anotando os gastos desta semana?

📅 Automatizar agendamentos
Você quer automatizar agendamentos.
Por enquanto, vamos organizar sua lista de clientes.
```

**Oficina:**
```
🎯 Clientes sumindo
Você notou que alguns clientes param de voltar.
Vamos registrar quem são seus clientes ativos.

📅 Aumentar ticket médio
Seu objetivo é aumentar o valor por serviço.
Primeiro, vamos entender quais serviços dão mais lucro.
```

---

## 4. Módulos ocultos

### 4.1 O que significa "acinzentado"

Módulos acinzentados na sidebar:
- São visíveis (o empresário sabe que existem)
- Estão com opacidade reduzida e um cadeado ou "Em breve"
- Ao clicar, mostram um toast: "Esse recurso será liberado em breve. Continue usando a Ponte para desbloqueá-lo."
- Não geram erro 404 ou 403 — são graciosamente bloqueados

### 4.2 Como desbloquear

| Módulo | Evento de desbloqueio | Gatilho |
|--------|----------------------|---------|
| Tarefas | PRIMEIRA_ACAO_CRIADA | Criar primeira ação/tarefa |
| CRM | PRIMEIRA_DECISAO_VISTA | 3 dias de uso |
| Financeiro | PRIMEIRO_RETORNO | 7 dias de uso + 1 decisão |
| Clientes | Automático com CRM | Mesmo que CRM |
| Conhecimento | PRIMEIRO_FEEDBACK | Primeiro feedback em ação |
| Aprendizados | PRIMEIRA_ACAO_CONCLUIDA | Primeira tarefa concluída |

### 4.3 Notificações de desbloqueio

Quando um módulo é desbloqueado, o empresário recebe:
1. Um toast no dashboard: "📋 Tarefas liberadas! Agora você pode organizar suas tarefas."
2. O módulo fica ativo na sidebar (cor normal, clicável)
3. Uma notificação sutil no header

---

## 5. Progressão por maturidade

### 5.1 Timeline de desbloqueio

```
DIA 1
  ├── Dashboard (2 cards de prioridade)
  ├── Assistente (com contexto do diagnóstico)
  └── Decisões (simplificado)

DIA 3
  └── Tarefas (se criou primeira ação)

DIA 7
  ├── CRM + Clientes (se usou por 3+ dias)
  └── Financeiro (se tomou 1+ decisão)

DIA 14
  ├── Conhecimento (se deu feedback)
  └── Aprendizados (se concluiu 1+ tarefa)

DIA 30
  └── Módulos completos (se ativo continuamente)
```

### 5.2 Matriz de decisão de desbloqueio

```
function moduloDesbloqueado(empresaId, modulo, eventos) {
  switch (modulo) {
    case 'TAREFAS':
      return eventos.includes(PRIMEIRA_ACAO_CRIADA);
    case 'CRM':
      return diasDesdeCriacao(empresaId) >= 3;
    case 'FINANCEIRO':
      return diasDesdeCriacao(empresaId) >= 7 
          && eventos.includes(PRIMEIRA_DECISAO_VISTA);
    case 'CONHECIMENTO':
      return eventos.includes(PRIMEIRO_FEEDBACK);
    case 'APRENDIZADOS':
      return eventos.includes(PRIMEIRA_ACAO_CONCLUIDA);
    default:
      return true;  // dashboard, assistente, decisoes sempre liberados
  }
}
```

### 5.3 Regressão de escopo (se o empresário para de usar)

Se o empresário fica inativo por 30+ dias:
- Módulos avançados permanecem liberados (não há regressão de escopo)
- O dashboard volta a mostrar os cards de prioridade originais
- O Assistente pergunta: "Faz tempo que não nos falamos. Quer retomar de onde paramos?"

---

## 6. Continuidade da conversa

### 6.1 O Assistente no primeiro login

O Assistente aparece com uma mensagem inicial contextual:

> "Olá, [nome]! Você me contou que [setor] com [funcionários] funcionários e que [principal problema]. Como posso ajudar?"

O Assistente tem acesso a:
- Respostas do diagnóstico
- Interpretações (pontos de atenção, alinhamento)
- Nível de ativação atual
- Dados básicos da empresa

O Assistente NÃO tem acesso a:
- Dados financeiros (ainda não existem)
- Dados de clientes (ainda não existem)
- Dados de tarefas (ainda não existem)

### 6.2 Perguntas típicas do primeiro login

| Pergunta do empresário | Resposta do Assistente |
|------------------------|----------------------|
| "O que eu faço agora?" | Sugere a ação do Card 1 |
| "Como controlo meu fluxo de caixa?" | Explica passo simples + "Quer que eu te ajude a registrar?" |
| "O que você sabe sobre minha empresa?" | Resume o diagnóstico |
| "Quanto custa?" | "Ainda estamos em fase de validação. Por enquanto, é gratuito para os primeiros participantes." |

---

## 7. Continuidade do patrimônio cognitivo

### 7.1 O que é preservado

| Patrimônio | Primeiro login | 7 dias depois |
|------------|----------------|---------------|
| Respostas do diagnóstico | ✓ | ✓ |
| Interpretações | ✓ | ✓ |
| Resumo corrido | ✓ | ✓ |
| Identidade Digital | ✓ (gerada no cadastro) | ✓ (atualizada) |
| Eventos de ativação | ✓ (2 eventos) | ✓ (+ eventos) |
| Nível de ativação | NOVO | CONHECENDO (provavelmente) |

### 7.2 O que começa a ser construído

| Patrimônio | Início | Maturidade |
|------------|--------|------------|
| Conhecimentos validados | Após ações | 30 dias |
| Evidências | Após interações | 14 dias |
| Hipóteses | Após feedback | 21 dias |
| Memória Cognitiva | Após decisões | 14 dias |
| Aprendizados | Perguntas rápidas | 7 dias |
| Sinais (HistoricoSinal) | Automático | 3 dias |

---

## 8. Integração com o código existente

### 8.1 O que já existe e será usado

| Componente | Uso |
|------------|-----|
| `experienceEngine.obterLoginExperience` | Redireciona para dashboard |
| `experienceEngine.obterDashboardExperience` | Gera cards de prioridade + narrativa |
| `founder-activation-engine.ts` | Determina nível de ativação |
| `EventoAtivacao` | Gatilhos de desbloqueio |
| `sidebar.tsx` | Sidebar com módulos (precisa de estado "bloqueado") |
| `assistente/chat.tsx` | Assistente contextual |

### 8.2 O que precisa ser modificado

| Modificação | Onde | O quê |
|-------------|------|-------|
| Filtro de módulos | `cognitive-experience-engine.ts` | Adicionar método `obterModulosLiberados(empresaId)` que consulta `EventoAtivacao` e retorna lista de módulos permitidos |
| Estado "bloqueado" na sidebar | `sidebar.tsx` | Aceitar prop `modulosLiberados: string[]` e renderizar bloqueados com estilo diferente |
| Dashboard curado | `dashboard/page.tsx` | Usar `obterDashboardExperience` com escopo limitado |
| Card de prioridade | NOVO componente | `priority-card.tsx` — card simples com ícone, título, descrição e ação |

---

*Documento concluído. Avançando para Documento 7.*
