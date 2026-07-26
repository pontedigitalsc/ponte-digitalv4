# Transição Apoiador → Fundador

> PROGRAMA 15 — Documento 5 de 10
> Definição precisa do que é apoiador, fundador, o que muda na experiência, no contexto, na confiança e na superfície do sistema

---

## Relatório de execução

- **Descobertas:** o conceito de "Apoiador" não existe hoje no código — é apenas uma entidade conceitual. O que existe é: usuário não logado (Conversa com `empresaId: null`) e usuário logado (Conversa com `empresaId` populado + Empresa + Usuario). A Founder Activation Engine já modela níveis (NOVO → CONHECENDO → ATIVO → ENGAJADO → FUNDADOR_VALIDADO) mas não há conceito de "pré-cadastro".
- **Pressupostos:** não criar novos schemas para Apoiador. A distinção é puramente conceitual e de estado: `Conversa.empresaId == null` = Apoiador, `Conversa.empresaId != null` = Fundador. O nível de ativação (NOVO → FUNDADOR_VALIDADO) refina o estado dentro de Fundador.
- **Lacunas:** sem schema, sem modelo, sem representação de "Apoiador" no sistema. A transição é um momento (quando ele clica em criar conta), não um estado persistente.
- **Riscos:** se no futuro for necessário modelar o Apoiador (e-mail para recall, preferências, etc.), será necessário criar um schema. Por ora, o cookie + Conversa é suficiente.
- **Conflitos:** nenhum.
- **Impactos futuros:** a Founder Activation Engine vai precisar de um novo evento de ativação: `PRIMEIRO_ACESSO_ANONIMO` ou similar, para marcar o momento em que o empresário começa o diagnóstico (mesmo sem cadastro).
- **Confirmação de coerência:** coerente com a Escada Comunitária (JORNADA_APOIADOR.md), com a Jornada Fundacional (Capítulo 4 — Onboarding Cognitivo) e com o Eixo 4 do Programa 15.

---

## 1. O que é um Apoiador

### 1.1 Definição

Apoiador é o empresário que **completou o Diagnóstico Inteligente** mas **não criou conta na Plataforma Cognitiva**.

Ele:
- Existe no sistema como cookie `conv_token` + registro `Conversa` com `empresaId: null`
- Tem respostas salvas, interpretações geradas e resumo disponível
- Pode acessar o resumo novamente dentro de 7 dias
- Não tem acesso a CRM, Financeiro, Tarefas, Assistente
- Não tem Identidade Digital persistente (apenas as respostas brutas)
- Não tem eventos de ativação registrados

### 1.2 O que ele pode fazer

| Ação | Permitida? | Como? |
|------|-----------|-------|
| Fazer o diagnóstico | ✓ | Fluxo de conversa anônima |
| Ver o resumo | ✓ | Página de resumo (cookie válido) |
| Compartilhar o resumo | ✓ | Link único (se implementado) |
| Refazer o diagnóstico | ✓ | Novo cookie (perde o anterior) |
| Criar conta | ✓ | Botão "Quero criar minha conta" |
| Acessar CRM/Financeiro/etc. | ✗ | Bloqueado por requireUser |
| Usar o Assistente | ✗ | Bloqueado por requireUser |
| Receber notificações | ✗ | Sem e-mail/contato |
| Recuperar sessão após 7 dias | ✗ | Cookie expira |

### 1.3 O que o sistema sabe sobre ele

- Apenas o que ele respondeu no diagnóstico
- Nome do segmento, tempo de operação, funcionários, etc.
- Problemas declarados, objetivos
- **Não sabe:** nome, e-mail, telefone, endereço, CNPJ

### 1.4 Duração do estado Apoiador

| Cenário | Duração | Fim do estado |
|---------|---------|---------------|
| Não cria conta | 7 dias (cookie) | Cookie expira → Apoiador vira "visitante perdido" |
| Cria conta | Imediato | Apoiador → Fundador no momento do cadastro |
| Volta antes de expirar | Renovado +7 dias | Cookie renovado a cada interação |

---

## 2. O que é um Fundador

### 2.1 Definição

Fundador é o empresário que **criou conta** e **vinculou a conversa** ao seu perfil.

Ele:
- Tem `Usuario` + `Empresa` no banco
- Tem `Conversa.empresaId` populado
- Tem `IdentidadeDigital` gerada pelo Orchestrator
- Tem `EventoAtivacao` registrados (DIAGNOSTICO_COMPLETO, IDENTIDADE_CRIADA)
- Tem nível de ativação na Founder Activation Engine (NOVO inicialmente)
- Acessa a Plataforma Cognitiva com escopo curado

### 2.2 Níveis dentro de Fundador (Founder Activation Engine — já existe)

| Nível | Condição | O que desbloqueia |
|-------|----------|-------------------|
| NOVO | Criou conta | Dashboard + Assistente |
| CONHECENDO | 3 dias de uso | Tarefas |
| ATIVO | 7 dias + 1 decisão | CRM |
| ENGAJADO | 14 dias + 3 decisões | Financeiro + Conhecimento |
| FUNDADOR_VALIDADO | 30 dias + feedback | Módulos completos |

### 2.3 Níveis de ativação e maturidade (já existentes)

| Motor | Níveis existentes | Uso |
|-------|-------------------|-----|
| `founder-activation-engine.ts` | NOVO → CONHECENDO → ATIVO → ENGAJADO → FUNDADOR_VALIDADO | Controla o que o usuário vê |
| `company-maturity-engine.ts` | Maturidade da empresa | Controla recomendações |
| `cognitive-milestone-engine.ts` | Marcos cognitivos | Gatilhos de progressão |

---

## 3. O que muda na experiência

| Aspecto | Apoiador | Fundador (NOVO) |
|---------|----------|-----------------|
| Autenticação | Cookie anônimo | Supabase session |
| Página inicial | `/conversa` (ou resumo) | `/dashboard` |
| Acesso a módulos | Nenhum | Dashboard + Assistente |
| Persistência de dados | 7 dias | Permanente |
| Identidade Digital | Não existe | Gerada |
| Eventos de ativação | Nenhum | DIAGNOSTICO_COMPLETO, IDENTIDADE_CRIADA |
| Sidebar | Inexistente | Reduzida (módulos acinzentados) |
| Assistente | Inexistente | Disponível com contexto |
| Notificações | Nenhuma | Nenhuma (ainda) |

---

## 4. O que muda no contexto

### 4.1 Contexto do Apoiador

```
{
  conversa: { respostas, interpretacoes },
  cookie: conv_token,
  identidade: null,           // não existe
  eventos: [],                // não existem
  patrimonio: null,           // não existe
}
```

### 4.2 Contexto do Fundador (NOVO)

```
{
  conversa: { respostas, interpretacoes, empresaVinculada: true },
  identidade: {
    dados: respostas,
    interpretacoes: [...],
    conhecimentos: [],
    lacunas: [...],
    narrativa: "resumo corrido...",
  },
  eventos: [
    { tipo: DIAGNOSTICO_COMPLETO },
    { tipo: IDENTIDADE_CRIADA },
  ],
  ativacao: { nivel: "NOVO" },
  empresa: { nome, segmento, funcionarios },
}
```

### 4.3 O que é transferido

| Dado | Origem (Apoiador) | Destino (Fundador) |
|------|--------------------|--------------------|
| Respostas | `Conversa.respostas` (Json) | `IdentidadeDigital.dados` |
| Interpretações | Em memória (pós-finalizar) | `IdentidadeDigital.interpretacoes` |
| Resumo corrido | Em memória (pós-finalizar) | `IdentidadeDigital.narrativa` |
| Etapa da conversa | `Conversa.etapa` | — (concluída) |

Nada é perdido.

---

## 5. O que muda na confiança

### 5.1 Confiança do Apoiador

A confiança do Apoiador é baseada em:
- **Utilidade do diagnóstico:** "as perguntas me fizeram pensar"
- **Precisão do resumo:** "o sistema me entendeu"
- **Honestidade:** "não tentou me vender nada"

Nível de confiança: **baixo, mas positivo**. Ele confia o suficiente para voltar, mas não o suficiente para pagar.

### 5.2 Confiança do Fundador (NOVO)

A confiança do Fundador recém-criado é baseada em:
- **Tudo acima** (preservado)
- **Primeira impressão do dashboard:** "não me assustou com informação demais"
- **Utilidade do Assistente:** "respondeu o que perguntei"

Nível de confiança: **médio, em construção**. Ele deu o primeiro passo de compromisso (criar conta), mas ainda está testando.

### 5.3 O que NÃO muda na confiança

- A honestidade do sistema (admitir o que não sabe) se mantém
- O tom pessoal ("eu" e "você") se mantém
- A ausência de pressão de venda se mantém

---

## 6. O que muda na superfície do sistema

### 6.1 Sidebar

**Apoiador:** sem sidebar (não há dashboard).

**Fundador (NOVO):**

| Módulo | Visível na sidebar | Ativo? |
|--------|-------------------|--------|
| Início | ✓ | ✓ |
| Assistente | ✓ | ✓ |
| — | Separador | — |
| Centro de Decisão | ✓ | ✓ (simplificado, 2 itens) |
| Tarefas | ✓ | ✗ (acinzentado: "Em breve") |
| CRM | ✓ | ✗ (acinzentado: "Em breve") |
| Financeiro | ✓ | ✗ (acinzentado: "Em breve") |
| Clientes | ✓ | ✗ (acinzentado: "Em breve") |
| Conhecimento | ✓ | ✗ (acinzentado: "Em breve") |
| Aprendizados | ✓ | ✗ (acinzentado: "Em breve") |

### 6.2 Dashboard

**Apoiador:** não existe.

**Fundador (NOVO):**
- Banner de boas-vindas contextual
- 1-2 cards de prioridade
- Card do Assistente ("Precisa de algo?")
- Nada mais — zero gráficos, zero relatórios

### 6.3 Assistente

**Apoiador:** não existe.

**Fundador (NOVO):**
- Disponível no canto inferior direito
- Contexto: "Seja bem-vindo, [nome]. Você mencionou que [problema principal]. Como posso ajudar?"
- Pode responder perguntas com base no diagnóstico
- Limite de mensagens: 50/dia (padrão do plano)

---

## 7. Sinal de transição

### 7.1 O que indica que o Apoiador está pronto para virar Fundador

O sistema não decide quando o Apoiador deve virar Fundador — o Apoiador decide. Mas o sistema pode identificar sinais:

| Sinal | Interpretação | Ação |
|-------|---------------|------|
| Concluiu o diagnóstico | Já tem contexto suficiente | Oferecer criação de conta |
| Voltou 2+ vezes ao resumo | Interesse mantido | Tornar oferta mais explícita |
| Tentou acessar módulo bloqueado | Quer mais | Sugerir conta |
| Compartilhou o resumo | Achou útil | Oferecer conta |

### 7.2 Mensagens de transição

Cada sinal gera uma mensagem diferente:

| Sinal | Mensagem |
|-------|----------|
| Concluiu diagnóstico | "Quer ver como posso te ajudar na prática?" |
| Voltou ao resumo | "Você já voltou algumas vezes — que tal criar sua conta e continuar de onde paramos?" |
| Tentou acessar módulo | "Esse recurso faz parte da Plataforma Cognitiva. Quer dar uma olhada?" |
| Compartilhou | "Que bom que você achou útil. Quer se aprofundar?" |

---

## 8. Representação no banco de dados

**Não criar novos schemas.** A transição é representada pelo estado do `Conversa.empresaId`:

```
Conversa.empresaId = null  →  Apoiador
Conversa.empresaId = "abc" →  Fundador (qualquer nível)
```

O nível dentro de Fundador é gerenciado pela `EventoAtivacao` + `founder-activation-engine.ts` (já existe).

---

*Documento concluído. Avançando para Documento 6.*
