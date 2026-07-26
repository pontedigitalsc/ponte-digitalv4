# Mapa dos Pipelines

> **WP-2.4** — Release Program v1.0, Programa 2 (Documentação Viva)
> Data: 23/07/2026 | Status: Concluído

---

## Objetivo

Documentar todos os pipelines da plataforma: etapas, entradas, saídas, engines envolvidas, eventos emitidos, persistência e mecanismos de recuperação.

---

## Pipeline Cognitivo Completo (Dashboard)

**Gatilho:** Navegação do usuário para qualquer página do dashboard

**Orquestrador:** `orchestrator-engine.ts`

```mermaid
flowchart TD
    A["Requisicao HTTP<br/>GET /dashboard"] --> B["Server Component<br/>requireUser()"]
    B --> C["Orchestrator.executar()"]
    
    subgraph Pipeline
        C --> D["1. Context Engine<br/>montarContexto(empresaId)"]
        D --> E["2. Identity Engine<br/>obterIdentidade(empresaId)"]
        D --> F["3. Memory Engine<br/>obterMemoriasRecentes()"]
        E --> G["4. Knowledge Engine<br/>obterConhecimentos()"]
        F --> G
        G --> H["5. Decision Engine<br/>decidir()"]
        H --> I["6. Evolution Engine<br/>calcularEvolucao()"]
        I --> J["7. Health Engine<br/>avaliarSaude()"]
        J --> K["8. Journey Engine<br/>obterJornada()"]
        K --> L["9. Action Intelligence<br/>gerarAcoes()"]
        L --> M["10. Sinal Engine<br/>gerarSinais()"]
        M --> N["11. Notification Engine<br/>consolidar()"]
        N --> O["12. Experience Engine<br/>montarExperience()"]
    end
    
    O --> P["Experience Renderer<br/>Componente React"]
    P --> Q["HTML para o usuario"]
```

**Persistência:** Nenhuma direta — o pipeline é read-only. Sinais são registrados via `historico-sinal.service` como efeito colateral.

**Rollback:** Não se aplica (leitura). Se uma etapa falha, o Orchestrator propaga o erro para o Server Component, que renderiza a página de erro (`error.tsx`).

**Recuperação:** O usuário clica "Tentar novamente" no error boundary.

---

## Pipeline de Diagnóstico (Conversa)

**Gatilho:** Usuário acessa `/conversa`

**Orquestrador:** `conversa/route.ts` + `conversation-engine.ts`

```mermaid
flowchart TD
    A["GET /api/conversa"] --> B{"Token existe?"}
    B -->|Nao| C["criarConversa(token)"]
    B -->|Sim| D["carregarConversa(token)"]
    C --> E["Selecionar fluxo<br/>(primeira-conversa)"]
    D --> F{"Conversa concluida?"}
    F -->|Nao| G["Retornar pergunta atual"]
    F -->|Sim| H["Retornar estado concluido"]
    E --> G
    
    I["POST /api/conversa"] --> J["responder(token, perguntaId, valor)"]
    J --> K["Avancar para proxima pergunta"]
    K --> L{"Fim do fluxo?"}
    L -->|Nao| M["Retornar proxima pergunta"]
    L -->|Sim| N["Marcar como concluida"]
    
    O["POST /api/conversa/finalizar"] --> P["obterRespostas(token)"]
    P --> Q["interpretarRespostas(respostas)"]
    Q --> R["Criar IdentidadeDigital"]
    R --> S["Retornar interpretacoes"]
```

**Entradas:** Token de conversa (cookie `conv_token`), respostas do usuário

**Saídas:** IdentidadeDigital, interpretações

**Engines utilizadas:** Conversation Engine, Identity Engine

**Eventos emitidos:** Nenhum (o pipeline não usa event bus)

**Persistência:** `Conversa` + `ConversaHistorico` no banco

**Rollback:** Cada resposta é persistida individualmente. Se `finalizar` falha, a conversa permanece em andamento.

**Recuperação:** Usuário pode tentar finalizar novamente.

---

## Pipeline de Cadastro (Criar Conta)

**Gatilho:** POST `/api/auth/criar-conta`

**Orquestrador:** `criar-conta/route.ts` + `processarCadastro()` do Orchestrator

```mermaid
flowchart TD
    A["POST /api/auth/criar-conta"] --> B["Rate limit (IP)"]
    B --> C["Validar schema Zod"]
    C --> D{"Conversa token valido?"}
    D -->|Nao| E["Erro: faca a conversa primeiro"]
    D -->|Sim| F["Criar usuario no Supabase Auth"]
    F --> G["Criar Empresa no banco"]
    G --> H["Criar Usuario (ADMIN)"]
    H --> I["processarCadastro(empresaId, token)"]
    
    subgraph processarCadastro
        J["Obter respostas da conversa"]
        J --> K["Interpretar respostas<br/>(Identity Engine)"]
        K --> L["Criar IdentidadeDigital"]
        L --> M["Criar conhecimentos iniciais"]
        M --> N["Emitir evento EmpresaCriada"]
    end
    
    I --> O["Retornar sucesso"]
```

**Entradas:** nome, email, senha, nomeEmpresa, token de conversa

**Saídas:** empresaId, usuarioId

**Engines utilizadas:** Conversation Engine, Identity Engine, Knowledge Engine

**Eventos emitidos:** `EmpresaCriada` (subscriber é stub — ver ARCH-002)

**Persistência:** Usuário (Supabase + banco), Empresa, IdentidadeDigital, Conhecimentos iniciais

**Rollback:** Não há rollback automático. Se `processarCadastro` falha após criar o usuário, o usuário fica órfão (sem empresa). Tratamento futuro: transação distribuída.

**Rate limit:** `assertRateLimit('criar-conta:{ip}', 'CRIAR_CONTA')`

---

## Pipeline de Ciclo Automático (Ritmo)

**Gatilho:** Temporizador/configuração do Ritmo Engine

**Orquestrador:** `ritmo-engine.ts` → `orchestrator-engine.ts`

```mermaid
flowchart TD
    A["Ritmo Engine<br/>Ciclo disparado"] --> B["Carregar config do ciclo"]
    B --> C["Buscar empresas ativas"]
    C --> D["Para cada empresa:"]
    D --> E["Executar pipeline completo"]
    E --> F["Registrar execucao"]
    F --> G{"Proxima empresa?"}
    G -->|Sim| D
    G -->|Nao| H["Aguardar proximo ciclo"]
```

**Frequências disponíveis:** DIARIA, SEMANAL, MENSAL

**Entradas:** empresaId, configuração do ciclo

**Engines utilizadas:** Todas (pipeline completo)

**Eventos emitidos:** `CicloCompleto`

**Persistência:** Resultados do ciclo são persistidos pelas engines individuais

---

## Pipeline de Feedback

**Gatilho:** Usuário fornece feedback sobre uma ação

**Orquestrador:** Feedback Engine → Knowledge Engine + Evolution Engine

```mermaid
flowchart TD
    A["Usuario da feedback"] --> B["Feedback Engine<br/>processar(feedback)"]
    B --> C{"Tipo do feedback?"}
    C -->|AJUDOU| D["Knowledge Engine<br/>fortalecerHipotese()"]
    C -->|NAO_AJUDOU| E["Knowledge Engine<br/>enfraquecerHipotese()"]
    C -->|AJUDOU_PARCIALMENTE| F["Knowledge Engine<br/>ajustarHipotese()"]
    D --> G["Evolution Engine<br/>atualizarEvolucao()"]
    E --> G
    F --> G
    G --> H["Registrar Outcome"]
    H --> I["Emitir FeedbackRegistrado"]
```

**Entradas:** empresaId, acaoId, tipo de feedback

**Engines utilizadas:** Feedback, Knowledge, Evolution, Outcome

**Eventos emitidos:** `FeedbackRegistrado`, `ResultadoObservado` (via Outcome)

---

## Resumo dos Pipelines

| Pipeline | Gatilho | Etapas | Engines | Persiste | Eventos |
|----------|---------|--------|---------|----------|---------|
| Cognitivo (Dashboard) | Navegação | 12 | Todas | Sinais (side-effect) | Nenhum |
| Diagnóstico | GET /conversa | 5 | Conversation, Identity | Conversa, Identity | Nenhum |
| Cadastro | POST /criar-conta | 7 | Conversation, Identity, Knowledge | Usuário, Empresa, Identity | EmpresaCriada |
| Ciclo (Ritmo) | Temporizador | 4+ | Todas | Por engine | CicloCompleto |
| Feedback | Ação do usuário | 5 | Feedback, Knowledge, Evolution, Outcome | Feedback, Outcome | FeedbackRegistrado |

---

## ADRs Relacionados

- ADR-015: Motor como barramento central
- ADR-024: Pipeline único de observação → conhecimento
- ADR-013: Ciclo cognitivo contínuo

---

## Riscos Conhecidos

1. **Pipeline de Cadastro sem rollback:** se `processarCadastro` falha, usuário fica órfão (criado no Supabase mas sem empresa no banco).
2. **Pipeline de Diagnóstico só tem um fluxo** (`primeira-conversa`). Novo fluxo exige criar novo template.
3. **Eventos stubs** (ARCH-002): pipeline de cadastro emite `EmpresaCriada` mas ninguém processa.

---

## Como Evoluir Sem Quebrar

1. **Novo pipeline:** criar novo método no Orchestrator, manter pipelines existentes intactos
2. **Nova etapa em pipeline existente:** adicionar entre as etapas existentes, verificar compatibilidade de entradas/saídas
3. **Rollback em pipelines de escrita:** implementar `try/catch` com operação reversa em cada etapa
4. **Sempre validar** que o pipeline não quebrou com `tsc --noEmit` + verificação manual de fluxo
