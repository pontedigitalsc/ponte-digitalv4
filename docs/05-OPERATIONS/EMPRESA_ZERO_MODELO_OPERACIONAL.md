# Modelo Operacional da Empresa Zero

**Programa:** 21 — Ativação da Empresa Zero
**Data:** 26/07/2026
**Versão:** 1.0

---

## 1. Processo Comercial

### Ciclo completo de aquisição

```
Lead encontrado
    ↓
Primeiro contato
    ↓
Diagnóstico
    ↓
Proposta
    ↓
Negociação
    ↓
Contrato
    ↓
Implantação
    ↓
Cliente ativo
```

### 1.1 Lead encontrado

**Canais previstos:**
- Indicação (fundador, early adopters, parceiros)
- Site/landing page (quando implementada)
- Instagram orgânico
- Eventos presenciais
- Cold outreach direcionado

**Como o sistema apoia:**
- CRM com pipeline kanban (`Lead` com `origem`, `estagio`, `temperatura`)
- Origens mapeadas: INDICACAO, SITE, INSTAGRAM, FACEBOOK, GOOGLE, WHATSAPP, COLD_OUTREACH, EVENTO, OUTRO
- Busca e filtros por estágio, origem, responsável, data

**Como a Empresa Zero opera hoje:**
- Fundador atua como comercial
- Leads entram manualmente no CRM
- Temperatura (QUENTE/MORNO/FRIO) definida manualmente
- Valor potencial registrado no campo `Lead.valor`

### 1.2 Primeiro contato

**Fluxo atual:**
- Lead migra de CONTATO para DIAGNOSTICO
- Contato registrado via `Historico` com tipo `CONTATO`
- Sem automação de e-mail ou WhatsApp

**Gap identificado:**
- Sem landing page pública para captura automatizada
- Sem sequência de nutrição automática
- Sem registro de data de próximo contato

### 1.3 Diagnóstico

**Fluxo atual:**
- 5 blocos de perguntas (Empresa, Operação, Gestão, Problemas, Objetivos)
- ~5 minutos de preenchimento
- Resumo do estado do negócio ao final
- Cadastro obrigatório (barreira — sem opção anônima)

**Como a Empresa Zero deve usar:**
- Fundador experencia o diagnóstico como primeiro cliente fictício
- Registrar: perguntas que geraram mais reflexão, perguntas que geraram atrito, insights obtidos durante o processo

### 1.4 Proposta

**Fluxo atual:**
- Lead avança para estágio PROPOSTA
- Campo `Lead.valor` registra valor da proposta
- `TipoHistorico.PROPOSTA` registra movimentação

**Gap:**
- Sem template de proposta integrado
- Sem geração automática de proposta baseada em diagnóstico
- Sem comunicação de valor estruturada

### 1.5 Negociação

**Fluxo atual:**
- Lead avança para NEGOCIACAO
- Histórico registra interações
- Sem sistema de objeções ou versões de proposta

### 1.6 Contrato

**Fluxo atual:**
- Lead migra para FECHADO_GANHO
- Vinculado a `Cliente` via `leadId`
- Plano definido: BASICO, PROFISSIONAL, ENTERPRISE
- Histórico registra tipo CONTRATO

**Gap:**
- Sem entidade de contrato formal no sistema

### 1.7 Implantação

**Fluxo atual:**
- `Implantacao` criada para o cliente
- Etapas concluíveis: ordem, título, descrição
- Decisões de onboarding registradas (`OnboardingDecisao`)
- Status: PENDENTE → EM_ANDAMENTO → CONCLUIDA

### 1.8 Cliente ativo

**Estado final:**
- Cliente com status ATIVO
- Transações financeiras registradas
- Tarefas, atendimento, acompanhamento contínuo

---

## 2. Processo de Implantação

### Primeiros 7 dias

| Dia | Ação | Responsável | Registro |
|-----|------|-------------|----------|
| 1 | Boas-vindas + agendamento de kickoff | Comercial | Histórico |
| 2 | Kickoff: alinhamento de expectativas | Fundador | OnboardingDecisao |
| 3 | Configuração inicial da empresa no sistema | Suporte | EtapaImplantacao |
| 4 | Importação de dados iniciais (clientes, finanças) | Suporte | EtapaImplantacao |
| 5-6 | Treinamento básico (CRM, Financeiro, Tarefas) | Fundador | EtapaImplantacao |
| 7 | Primeira revisão + próximos passos | Fundador + Cliente | Histórico |

### Primeiros 30 dias

| Semana | Foco | Entrega | Verificação |
|--------|------|---------|-------------|
| 1 | Configuração + treinamento | Sistema operacional | Cliente cria primeiro lead |
| 2 | Uso assistido | Primeiros dados reais | Cliente registra primeira transação |
| 3 | Autonomia guiada | Cliente opera sozinho | Primeira tarefa criada pelo cliente |
| 4 | Revisão + expansão | Plano de próximos 30 dias | Feedback registrado |

### Primeiros 90 dias

| Mês | Marco | Indicador |
|-----|-------|-----------|
| 1 | Configuração completa + primeiros dados | Sistema em uso diário |
| 2 | Primeiro insight cognitivo gerado | Conhecimento validado ≥ 3 |
| 3 | Cliente obtém primeiro valor mensurável | Outcome registrado como AJUDOU |

---

## 3. Processo de Aprendizado

### Toda interação deve responder

**O que aprendemos?**
- Observação factual
- Dado concreto
- Comportamento observado

**O que mudou?**
- Diferença em relação à interação anterior
- Novo padrão identificado
- Desvio de expectativa

**O que ficou mais claro?**
- Hipótese confirmada ou rejeitada
- Incerteza reduzida
- Nova pergunta que surgiu

### Ciclo de aprendizado operacional

```
Observar → Registrar → Refletir → Ajustar → Observar
```

1. **Observar:** Fundador usa o sistema e registra tudo
2. **Registrar:** Cada ação vira dado no Diário Cognitivo
3. **Refletir:** Semanalmente, revisar o que foi aprendido
4. **Ajustar:** Pequenas mudanças no processo (nunca na arquitetura)
5. **Observar:** Novo ciclo começa

### Categorias de aprendizado

| Categoria | O que captura | Exemplo |
|-----------|---------------|---------|
| Produto | Como o sistema é percebido | "Usuário não entendeu o Centro de Decisão" |
| Processo | Como a operação funciona | "Diagnóstico leva 7min, não 5min" |
| Comportamental | Como o empresário age | "Empresário abre o CRM antes do Dashboard" |
| Técnico | Como o sistema se comporta | "Tempo de resposta do Assistente é aceitável" |
| Negócio | Como a empresa performa | "Lead qualificado quente fecha em 5 dias" |

---

## 4. Estrutura de Dados da Empresa Zero

### Dados comerciais

| Dado | Onde vive no sistema | Frequência de atualização |
|------|---------------------|---------------------------|
| Leads | `Lead` | Diária |
| Clientes | `Cliente` | Semanal |
| Pipeline status | `Lead.estagio` | Contínuo |
| Valor potencial | `Lead.valor` | Por lead |

### Dados financeiros

| Dado | Onde vive | Frequência |
|------|-----------|------------|
| Receitas | `Transacao` (RECEITA) | Mensal |
| Custos | `Transacao` (DESPESA) | Mensal |
| Recorrência | `Transacao.recorrente` | Mensal |

### Dados operacionais

| Dado | Onde vive | Frequência |
|------|-----------|------------|
| Tarefas | `Tarefa` | Diária |
| Implantações | `Implantacao` | Por cliente |
| Atendimento | `Historico` | Contínuo |

### Dados cognitivos

| Dado | Onde vive | Frequência |
|------|-----------|------------|
| Aprendizados | `Aprendizado` | Semanal |
| Conhecimento validado | `ConhecimentoValidado` | Mensal |
| Eventos de ativação | `EventoAtivacao` | Por marco |
| Feedback | `FeedbackAcao` | Por ação |
| Sinais | `HistoricoSinal` | Contínuo |

---

## 5. Papéis e Responsabilidades na Empresa Zero

| Papel | Quem exerce | Responsabilidades |
|-------|-------------|-------------------|
| Fundador | Kelven | Operação, vendas, produto, decisões estratégicas |
| Primeiro usuário | Fundador | Usar o sistema diariamente, registrar feedback |
| Primeiro cliente | Fundador | Experenciar o produto como cliente pagante |
| Primeiro professor | Fundador | Ensinar a IA sobre como a empresa funciona |

---

## 6. Rituais Operacionais

| Ritual | Frequência | O que faz |
|--------|------------|-----------|
| Revisão do Diário Cognitivo | Diária (5min) | Registrar descobertas do dia |
| Análise de Padrões | Semanal (30min) | Revisar hipóteses, identificar repetições |
| Ciclo de Aprendizado | Quinzenal (1h) | Avaliar o que o sistema está ensinando |
| Planejamento do Ciclo | Mensal (2h) | Definir próximas validações |

---

## 7. Métricas de Sucesso Operacional

| Métrica | Meta para Empresa Zero | Frequência |
|---------|------------------------|------------|
| Leads criados/semana | ≥ 5 | Semanal |
| Taxa de conversão Lead → Cliente | ≥ 20% | Mensal |
| Ticket médio | A definir com 3 primeiros clientes | Mensal |
| Ciclo de venda (dias) | ≤ 15 dias | Por lead |
| Tempo de implantação | ≤ 7 dias ativos | Por cliente |
| Satisfação (FeedbackAcao) | ≥ 80% AJUDOU | Mensal |
