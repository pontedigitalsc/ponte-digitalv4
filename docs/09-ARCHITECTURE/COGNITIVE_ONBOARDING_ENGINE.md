# Cognitive Onboarding Engine — Projeto Arquitetural

> Programa 12 — A Primeira Experiência Inteligente da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.
> Alinhado com: Constituição da Engenharia, Governança Permanente, Arquitetura Consolidada v1.0, Plataforma de Aquisição Cognitiva

---

## 0. Filosofia do novo onboarding

### O que MUDA

| Hoje (Programa 1-11) | Depois (Programa 12) |
|----------------------|----------------------|
| Fluxo linear de 17 perguntas fixas | Entrevista adaptativa, perguntas dependem das respostas |
| Questionário estruturado | Conversa natural |
| Nenhum valor entregue durante o onboarding | Primeiro valor entregue antes do onboarding terminar |
| Sem importação de dados externos | Importação multi-fonte (CSV, ERP, Google Sheets) |
| Sem diagnóstico | Relatório Cognitivo completo ao finalizar |
| Ativa tudo para todos | Ativação progressiva por maturidade |
| Confiança não medida | Toda informação tem score de confiança |
| Nada é validado com o usuário | A IA pergunta "Entendi corretamente?" |
| Dados da conversa viram IdentidadeDigital | Dados viram Patrimônio Cognitivo completo |

### O que NÃO muda

- O Motor Cognitivo não é alterado (Lei 6 da Constituição — Inteligência não é duplicada).
- O `conversation-engine` atual pode coexistir durante a transição.
- O modelo `Conversa` do schema não precisa de migration imediata.
- A API pública não é alterada.
- A autenticação dual (cookie para anônimo + `requireUserApi` para logado) RFC-003 permanece.

### Arquitetura de transição

O Cognitive Onboarding Engine não substitui o onboarding atual — ele o envolve. A primeira versão deve:
1. Usar o fluxo atual como entrada inicial (17 perguntas → identidade básica).
2. Adicionar a entrevista adaptativa como camada superior (opcional, disponível após a primeira conversa).
3. Adicionar importação, validação e relatório como serviços independentes.

---

## P12.1 — Cognitive Interview Engine

### Problema resolvido

Hoje a conversa de onboarding é linear: 17 perguntas fixas, mesma ordem, mesmas opções para toda empresa. Uma loja de roupas recebe as mesmas perguntas que uma clínica odontológica. O empresário responde perguntas irrelevantes para o negócio dele e não responde perguntas que seriam relevantes.

### Arquitetura conceitual

A Cognitive Interview Engine substitui o fluxo linear por um **grafo de entrevista adaptativa**:

```
                    ┌──────────────────┐
                    │  Segmento detectado │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ Comércio │  │ Serviço  │  │ Indústria│
        └────┬─────┘  └────┬─────┘  └────┬─────┘
             │             │             │
     ┌───────┼───────┐     │     ┌───────┼───────┐
     ▼               ▼     ▼     ▼               ▼
  Produto?      Estoque?  Agenda?  Matéria-prima?  Produção?
     │               │     │     │               │
     └───────┬───────┘     │     └───────┬───────┘
             ▼             ▼             ▼
         Venda como?   Atendimento?   Custo?
             │             │             │
             └───────┬─────┴─────┬───────┘
                     ▼           ▼
                 Pagamento?   Entrega?
```

### Funcionamento

1. **Pergunta inicial aberta**: "Como você vende?" — não "Qual o segmento do seu negócio?".
2. **Processamento da resposta**: IA identifica entidades, intenções e lacunas na resposta.
3. **Seleção da próxima pergunta**: Baseado no que já foi dito e no que ainda não foi coberto.
4. **Cobertura mínima garantida**: A entrevista continua até que o modelo cognitivo mínimo da empresa seja construído (5 blocos: quem é, como vende, como recebe, como organiza, o que precisa).

### Grafo de conhecimento mínimo

A entrevista termina quando a plataforma consegue responder a todas estas perguntas:

| Pergunta | Coberta por |
|----------|-------------|
| Qual o segmento? | Pergunta direta OU inferida do CNPJ OU inferida dos produtos mencionados |
| Como vende? | Presencial, online, ambos, representante |
| Como recebe? | Pix, boleto, cartão, transferência |
| Quem compra? | PF, PJ, ambos, nicho específico |
| Como organiza clientes? | Planilha, CRM, ERP, papel, não organiza |
| Como controla caixa? | Diário, semanal, mensal, só quando falta |
| Qual o maior problema hoje? | Pergunta aberta |
| Qual o objetivo para 6 meses? | Pergunta aberta |

### Diferenças do fluxo atual

| Atual | Novo |
|-------|------|
| 17 perguntas na mesma ordem para todos | Mínimo 5-8 perguntas adaptativas, máximo depende do segmento |
| Perguntas em blocos fixos | Perguntas fluem naturalmente |
| Respostas em texto livre | Respostas classificadas + entidades extraídas |
| Nenhuma adaptação | Próxima pergunta depende da resposta anterior |
| 5 blocos predefinidos | 5 blocos como cobertura mínima, ordem flexível |
| Mesma profundidade para todos | Profundidade depende do segmento (indústria pergunta sobre produção, serviço pergunta sobre agenda) |

### Relação com o Motor Cognitivo

A Cognitive Interview Engine usa o Motor Cognitivo APENAS para interpretar respostas (P12.8 — Company Memory Builder). Ela não depende do Motor para funcionar — o grafo de perguntas é determinístico. A IA é usada para:
- Extrair entidades da resposta do usuário
- Classificar a resposta no contexto do negócio
- Sugerir a próxima pergunta mais relevante

A decisão de qual pergunta fazer é determinística (baseada em cobertura mínima). A IA enriquece, não decide.

---

## P12.2 — Company Reconstruction Engine

### Problema resolvido

Depois da entrevista, a plataforma tem respostas soltas — "Vendo roupas", "Recebo por Pix", "Uso planilha". Isso não é uma empresa. É um conjunto de fraturas. A Company Reconstruction Engine transforma estas fraturas em **modelo estruturado de empresa**.

### Arquitetura conceitual

```
Respostas da entrevista
         ↓
Company Reconstruction Engine
         ↓
    ┌────┴────┐
    │ EMPRESA │  ← nome, segmento, porte, maturidade
    ├─────────┤
    │ PROCESSOS│  ← venda, atendimento, entrega, produção
    ├─────────┤
    │ PESSOAS │  ← clientes, fornecedores, funcionários
    ├─────────┤
    │ PRODUTOS│  ← serviços, produtos, categorias
    ├─────────┤
    │ FINANCEIRO│ ← receita, despesa, forma de pagamento, ticket médio
    ├─────────┤
    │ ROTINA  │  ← horas trabalhadas, delegação, sistemas usados
    ├─────────┤
    │ DORES   │  ← problemas, insônia, repetição, perda
    ├─────────┤
    │ OBJETIVOS│  ← meta 6 meses, automatizar, delegar
    └─────────┘
         ↓
    Objeto ReconstrucaoEmpresa → enviado para P12.8 (Company Memory Builder)
```

### Objeto ReconstrucaoEmpresa

```typescript
interface ReconstrucaoEmpresa {
  empresa: {
    nome: string
    segmento: string
    subsegmento?: string       // "Vestuário" dentro de "Comércio"
    porte: 'MEI' | 'ME' | 'EPP' | 'MÉDIO'
    faturamentoEstimado: number
    maturidadeDigital: 'MANUAL' | 'PLANILHA' | 'SISTEMA' | 'ERP'
    tempoOperacao: string
    funcionarios: number
  }
  processos: {
    aquisicao: string[]        // Como clientes chegam
    venda: string[]            // Como vende
    pagamento: string[]        // Como recebe
    entrega: string[]          // Como entrega
    posVenda?: string[]        // Como acompanha
  }
  pessoas: {
    clientes: { tipo: 'PF' | 'PJ' | 'AMBOS'; estimativa?: number }
    fornecedores?: { estimativa?: number }
    funcionarios: number
  }
  produtos: Array<{
    nome: string
    tipo: 'PRODUTO' | 'SERVICO'
    maisVendido?: boolean
    maisLucrativo?: boolean
    maisTrabalhoso?: boolean
  }>
  financeiro: {
    faturamentoMensal: number
    ticketMedio?: number
    formasPagamento: string[]
    controlaCaixa: 'DIARIO' | 'SEMANAL' | 'MENSAL' | 'QUANDO_FALTA'
    lucroConhecido?: boolean
  }
  dores: {
    insonia: string
    problemaRepetido: string
    perdaFinanceira: string
  }
  objetivos: {
    meta6Meses: string
    automatizar: string
    delegar: string
  }
}
```

### Como a reconstrução acontece

1. **Fase 1 — Extração**: Cada resposta é processada para extrair entidades. "Vendo roupas femininas pela internet" → segmento: comércio, subsegmento: vestuário, canal: online.
2. **Fase 2 — Estruturação**: Entidades são organizadas no objeto `ReconstrucaoEmpresa`. Lacunas são identificadas (ex: "como recebe?" não foi respondido → `formasPagamento: GAP`).
3. **Fase 3 — Enriquecimento**: Dados públicos são consultados para preencher lacunas (CNPJ → segmento e porte, se disponível).
4. **Fase 4 — Validação interna**: O objeto é verificado por consistência — uma empresa de serviços não deveria ter estoque. Se houver contradição, a confiança é rebaixada e a pergunta será refeita no P12.4 (Mapping Engine).

### Relação com a aquisição de dados

Se o usuário importar dados (P12.3), a reconstrução é substituída pelos dados reais. A Company Reconstruction Engine é o **fallback para quando não há dados fonte**. Quando há importação, ela funciona como **validação cruzada**: "A entrevista disse X, os dados mostram Y — qual está correto?"

---

## P12.3 — Smart Import Engine

### Problema resolvido

O empresário tem dados em planilhas, ERP, CRM, mas não consegue importá-los sem configuração técnica. A importação hoje não existe no onboarding — o empresário só começa a usar a plataforma depois do cadastro, com zero dados.

### Arquitetura conceitual

Importação como **primeiro ato do onboarding**, não como feature posterior. O empresário conecta uma fonte ANTES de terminar a configuração.

```
Fluxo:
  1. Entrevista inicial (3-5 min)
  2. "Quer importar dados existentes?" — opcional, não obrigatório
  3. Se sim → Smart Import Engine
  4. Se não → plataforma usa dados da entrevista (Company Reconstruction)
```

### Integração com a Plataforma de Aquisição Cognitiva

O Smart Import Engine é a primeira implementação da Plataforma de Aquisição Cognitiva (Programa 12 Fase 0). Ele usa o mesmo pipeline:

```
Conector → Ingestão → Normalização Estrutural → Normalização Semântica → Validação
```

Diferença: no onboarding, o pipeline é **síncrono e interativo** (usuário espera o resultado). Na aquisição contínua, é **assíncrono** (processa em background).

### Conectores da primeira versão

| Conector | Complexidade | Prioritário? |
|----------|-------------|--------------|
| CSV | Baixa | ✅ Sim — universal |
| Excel (.xlsx) | Baixa | ✅ Sim — universal |
| Google Sheets | Média | ✅ Sim — cloud, sem instalação |
| Omie | Média | ✅ Sim — ERP mais comum no público-alvo |
| Bling | Média | Alta demanda |
| Tiny | Média | Alta demanda |

### Smart Column Mapping

O diferencial: a IA identifica automaticamente as colunas.

```
Arquivo importado:
  "Nome" | "Tel" | "Email" | "Valor" | "Data"

Mapeamento automático:
  "Nome"  → Person.name (confiança: 0.95 — campo padrão)
  "Tel"   → Person.phone (confiança: 0.85 — abreviação conhecida)
  "Email" → Person.contact (confiança: 0.95)
  "Valor" → Transaction.amount (confiança: 0.70 — pode ser outro valor)
  "Data"  → Transaction.date (confiança: 0.65 — precisa de contexto)

Após mapeamento → P12.4 (Mapping Engine) pergunta:
  "Identifiquei que 'Valor' é o valor da venda. Está correto?"
```

O mapeamento usa:
1. **Dicionário de nomes conhecidos** (mais de 200 variações de nomes de colunas em português).
2. **Heurísticas de formato** (campos com formato de CPF/CNPJ → document).
3. **Conteúdo da coluna** (se 90% dos valores seguem formato de telefone → phone).
4. **Relação entre colunas** (se existe "Valor" e "Data" → provavelmente transação financeira).

### O que NÃO faz na primeira versão

- Não tenta inferir schema de PDF (Fase 2 da Aquisição Cognitiva).
- Não conecta a ERPs automaticamente (requer configuração manual de credenciais).
- Não faz deduplicação cross-source (apenas dentro do mesmo arquivo).

---

## P12.4 — Mapping Engine

### Problema resolvido

A IA entendeu a empresa — mas será que entendeu **corretamente**? Sem validação humana, erros de interpretação se acumulam no Patrimônio Cognitivo e produzem recomendações erradas.

### Arquitetura conceitual

A Mapping Engine é uma **camada de validação visual** entre o conhecimento inferido (P12.1 + P12.2 + P12.3) e o conhecimento confirmado (P12.8).

```
Company Reconstruction (P12.2) + Smart Import (P12.3)
         ↓
   Mapping Engine
         ↓
   "Entendi corretamente?"
   ┌─────────────────────────────────────┐
   │ Clientes: 45 importados             │
   │ Produtos: 12 identificados          │
   │ Serviço principal: Consultoria (96%)│
   │ Ticket médio: R$ 1.200 (71%)        │
   │                                     │
   │ [✓ Confirmar] [✗ Corrigir]         │
   └─────────────────────────────────────┘
         ↓
   Se confirmado → P12.8 (Confiança alta)
   Se corrigido  → P12.1 + P12.2 reprocessam (Confiança rebaixada)
```

### O que a Mapping Engine mostra

Cada bloco do conhecimento reconstruído é exibido com seu nível de confiança:

| Bloco | Exibição | Quando confiança baixa |
|-------|----------|------------------------|
| Clientes | Lista dos primeiros 10 + total | "Identifiquei 45 clientes. Confere?" |
| Produtos | Lista + serviço principal | "Seu principal serviço é Consultoria?" |
| Financeiro | Ticket médio + formas de pagamento | "Você recebe principalmente por Pix?" |
| Processos | Como vende + como entrega | "Você vende presencialmente e entrega via correio?" |
| Dores | Problemas identificados | "Seu maior problema é gerenciar fluxo de caixa?" |

### Regras de operação

- **Confiança ≥ 0.9**: Exibe apenas como informação. Não pergunta.
- **Confiança 0.5 a 0.9**: Pergunta para confirmar.
- **Confiança < 0.5**: Pergunta de forma mais aberta: "Não consegui entender direito como você recebe. É Pix, boleto, cartão?"
- **Lacuna (GAP)**: Pergunta diretamente: "Não identifiquei seus clientes. Quantos você tem?"

### Impacto no Patrimônio Cognitivo

- Se confirmado → `confidence = 1.0` (fonte: "CONFIRMACAO_USUARIO").
- Se corrigido → resposta original + correção são armazenadas. A resposta corrigida prevalece.
- Se ignorado (usuário não responde) → confiança mantida. P12.5 pode perguntar de novo mais tarde.

---

## P12.5 — Knowledge Gap Engine

### Problema resolvido

Depois de entender a empresa, a plataforma sabe O QUE o empresário controla e O QUE ele não controla. Mas o empresário não sabe o que ele deveria controlar. A Knowledge Gap Engine transforma lacunas em oportunidades.

### Arquitetura conceitual

```
Company Reconstruction (P12.2) + Import (P12.3) + Confirmação (P12.4)
         ↓
   Knowledge Gap Engine
         ↓
   Matriz: [controla] vs [não controla] vs [deveria controlar]
         ↓
   "Você controla clientes, mas não mede retorno."
   "Você controla vendas, mas não mede lucratividade."
   "Você controla caixa, mas não tem fluxo financeiro."
         ↓
   Para cada gap → "Deseja ativar?" + explicação
```

### A matriz de maturidade

A plataforma mantém uma matriz de capacidades vs maturidade. Para cada capacidade, ela sabe:
- Qual o nível mínimo de maturidade para fazer sentido.
- Qual problema empresarial resolve.
- Qual o impacto estimado.

| Capacidade | Maturidade Mínima | Problema que resolve | Impacto |
|-----------|-------------------|---------------------|---------|
| CRM | MANUAL | Perde clientes, não acompanha | Alto |
| Controle de clientes | PLANILHA | Clientes dispersos | Alto |
| Fluxo de caixa | MANUAL | Não sabe se vai faltar dinheiro | Crítico |
| Ticket médio | SISTEMA | Não sabe se está vendendo bem | Médio |
| Margem por produto | SISTEMA | Vende produto errado | Alto |
| Pipeline cognitivo | ERP | Não tem visão do negócio | Alto |
| Hipóteses | SISTEMA | Não testa melhorias | Médio |
| Predições | ERP | Não antecipa problemas | Alto |

### Exibição das recomendações

Cada recomendação segue o formato:

```
┌─────────────────────────────────────────────────────────────────┐
│ 📊 Você controla clientes, mas não mede retorno               │
│                                                                 │
│ Você sabe quantos clientes tem, mas não sabe quantos voltam.   │
│ Sem esta informação, você não sabe se seu negócio está         │
│ crescendo ou encolhendo.                                       │
│                                                                 │
│ Impacto estimado: identificar clientes que geram 80% da receita│
│                                                                 │
│ [Ativar monitoramento de retorno]  [Pular]  [Explicar mais]    │
└─────────────────────────────────────────────────────────────────┘
```

### Regras

- Máximo 3 recomendações por vez (não sobrecarregar o empresário).
- Recomendações são priorizadas por impacto × facilidade.
- Se o empresário ativar, a plataforma configura automaticamente (P12.6).
- Se o empresário pular, a recomendação volta em 30 dias (se ainda for relevante).

---

## P12.6 — Progressive Activation Engine

### Problema resolvido

Hoje a Ponte Digital ativa TUDO para TODOS. Um MEI que só quer controlar clientes recebe a mesma plataforma que uma empresa de médio porte com ERP, fluxo de caixa e pipeline cognitivo. O resultado: o MEI se sente sobrecarregado, a empresa grande se sente limitada.

### Arquitetura conceitual

A plataforma não tem "feature flags" individuais — tem **níveis de maturidade** que ativam capacidades completas.

```
Maturidade detectada: PLANILHA (usa planilha para controlar clientes)

Ativa:
  ✅ CRM básico (clientes, histórico)
  ✅ Agenda (compromissos)
  ✅ Tarefas (atividades)

Não ativa:
  ❌ Fluxo de caixa (não controla ainda)
  ❌ Pipeline cognitivo (empresa não tem dados suficientes)
  ❌ Hipóteses (requer maturidade SISTEMA)
  ❌ Recomendações (requer dados históricos)

Recomenda para PRÓXIMO nível:
  📊 "Quando começar a controlar suas finanças, ativaremos o fluxo de caixa."
```

### A escada de maturidade

```
Nível 0 — MANUAL
  Tudo na cabeça ou papel
  → Ativa: cadastro básico, tarefas, agenda

Nível 1 — PLANILHA
  Usa planilha para controlar algo
  → Ativa: + CRM, + clientes, + financeiro básico

Nível 2 — SISTEMA
  Usa sistema para alguma área
  → Ativa: + fluxo de caixa, + indicadores, + produto

Nível 3 — ERP
  Usa sistema integrado
  → Ativa: + pipeline cognitivo, + insights, + hipóteses

Nível 4 — COGNITIVO
  Usa inteligência para decidir
  → Ativa: + predições, + recomendações, + automações
```

Cada nível é um conjunto de capacidades. O empresário não "sobe de nível" manualmente — a plataforma detecta quando ele está pronto e sugere ativação.

### Gatilhos de progressão

| Gatilho | Ação |
|---------|------|
| Empresa usou CRM por 30 dias | Sugere ativar fluxo de caixa |
| Empresa registrou 50+ transações | Sugere ativar indicadores |
| Empresa conectou ERP | Ativa pipeline cognitivo automaticamente |
| Empresa tem 3+ meses de dados | Sugere ativar hipóteses |
| Empresa tem 6+ meses de dados | Sugere ativar predições |

### Relação com o cadastro atual

A Progressive Activation Engine não altera o schema (`configuracaoEmpresa` ou `planos`). Ela é uma **camada de recomendação** sobre o que já está disponível. O empresário pode ativar manualmente qualquer capacidade a qualquer momento — a engine apenas sugere o caminho.

---

## P12.7 — Confidence Engine

### Problema resolvido

O maior risco de uma plataforma cognitiva é o excesso de confiança: a IA age como se tivesse certeza quando não tem. Ou, ao contrário, duvida de tudo e não recomenda nada. A Confidence Engine resolve ambos os extremos.

### Arquitetura conceitual

Toda informação que entra no Patrimônio Cognitivo tem uma **confidence score**. Esta pontuação não é fixa — evolui com o tempo e com novas evidências.

```
Company Reconstruction (P12.2) + Smart Import (P12.3)
         ↓
   Cada campo recebe confidence score
         ↓
   ┌──────────────────────────────────────┐
   │ Serviço principal    Consultoria 96% │ → Alta → segue
   │ Ticket médio         R$ 1.200    71% │ → Média → pergunta (P12.4)
   │ Forma pagamento      Pix         89% │ → Alta → segue
   │ Número funcionários  GAP            — │ → Lacuna → pergunta
   │ Fluxo caixa          Inferido   0.45 │ → Baixa → não usa para decisões
   └──────────────────────────────────────┘
```

### Como a confiança é calculada

| Fonte | Confiança base | Ajustes |
|-------|---------------|---------|
| Resposta direta do empresário | 0.90 | +0.05 se consistente com outras respostas |
| Inferência por contexto | 0.60 | +0.10 se corroborado por dados externos |
| Importação de sistema confiável | 0.95 | -0.05 se dados desatualizados |
| Importação de CSV | 0.80 | -0.10 se mapeamento foi heurístico |
| OCR de documento | 0.50 | +0.20 se validação visual passou |
| Dado público (CNPJ) | 0.90 | +0.05 se compatível com o porte declarado |
| Confirmação do usuário (P12.4) | 1.00 | Máximo |
| Correção do usuário (P12.4) | 0.95 | Resposta corrigida > resposta original |
| Dado não verificado > 90 dias | Base - 0.20 | Decai com o tempo |

### Limiares de ação

| Confiança | Ação |
|-----------|------|
| ≥ 0.90 | Usado para decisões automáticas |
| 0.70 a 0.89 | Exibido, requer confirmação (P12.4) |
| 0.40 a 0.69 | Não usado para decisões, exibido como "suspeito" |
| 0.10 a 0.39 | Armazenado como referência, não exibido |
| < 0.10 | Descartado após N ciclos |

### Ciclo de vida da confiança

```
Ciclo 1: Resposta do empresário → confidence 0.90
Ciclo 2: Importação de CSV confirma → confidence 0.95
Ciclo 3: ERP confirma → confidence 1.00
...
Ciclo 10: 180 dias sem atualização → confidence 0.70
Ciclo 11: 270 dias sem atualização → confidence 0.50 (suspeito)
Ciclo 12: 365 dias sem atualização → confidence 0.20 (arquivado)
```

---

## P12.8 — Company Memory Builder

### Problema resolvido

Tudo que a plataforma aprendeu sobre a empresa durante o onboarding está disperso: respostas no `Conversa`, interpretações no `IdentidadeDigital`, dados importados no banco, confiança na Confidence Engine, gaps na Knowledge Gap Engine. A Company Memory Builder consolida tudo no Patrimônio Cognitivo.

### Arquitetura conceitual

```
Company Reconstruction (P12.2)
Smart Import (P12.3)
Mapping Validation (P12.4)
Confidence Scores (P12.7)
         ↓
   Company Memory Builder
         ↓
   Atualiza:
   ┌─────────────────────────────┐
   │ Conhecimento Individual     │ ← Respostas da entrevista + dados importados
   │ (IdentidadeDigital)          │
   ├─────────────────────────────┤
   │ Conhecimento Coletivo       │ ← Padrões aprendidos cross-company
   │ (ConhecimentoValidado)       │
   ├─────────────────────────────┤
   │ Evidências                  │ ← Cada fato tem proveniência
   │ (Evidencia)                  │
   ├─────────────────────────────┤
   │ Memórias Cognitivas         │ ← Contexto para o Motor Cognitivo
   │ (MemoriaCognitiva)           │
   ├─────────────────────────────┤
   │ Eventos de Ativação         │ ← O que foi ativado e quando
   │ (EventoAtivacao)             │
   ├─────────────────────────────┤
   │ Outcomes                    │ ← Decisões tomadas (primeiras recomendações)
   │ (Outcome)                    │
   └─────────────────────────────┘
```

### O que alimenta o Motor Cognitivo

O Motor Cognitivo precisa de 4 tipos de entrada para funcionar:

| Entrada | Fonte | Como o Company Memory Builder alimenta |
|---------|-------|----------------------------------------|
| Memória | `MemoriaCognitiva` | Cada resposta da entrevista vira uma memória |
| Evidência | `Evidencia` | Cada fato confirmado vira uma evidência com confiança |
| Contexto | `Hipotese` | Gaps identificados viram hipóteses a serem validadas |
| Decisão | `Outcome` | Recomendações aceitas viram outcomes |

### Integração com o fluxo atual

O Company Memory Builder NÃO substitui o fluxo atual (`processarCadastro` → `atualizarIdentidade` → `registrarEventoAtivacao`). Ele é aditivo:
1. O fluxo atual persiste os dados essenciais (Identity, Activation).
2. O Company Memory Builder persiste TUDO (memórias, evidências, gaps, confiança, recomendações).

---

## P12.9 — First Value Generator

### Problema resolvido

O maior problema do onboarding atual: o empresário responde 17 perguntas, cria conta, e cai em um dashboard vazio. Ele não recebe NENHUM valor até começar a usar o sistema ativamente. Muitos abandonam antes de chegar lá.

A First Value Generator entrega valor ANTES do onboarding terminar — durante a validação (P12.4) ou logo após a confirmação.

### Arquitetura conceitual

A engine analisa o conhecimento reconstruído (P12.2 + P12.3) em tempo real e procura **padrões que indicam oportunidade, risco ou insight**.

```
Company Reconstruction (P12.2) + Dados Importados (P12.3)
         ↓
   First Value Generator
         ↓
   Detecta padrões:
   ┌─────────────────────────────────────────────┐
   │ "Percebi três oportunidades no seu negócio:"│
   │                                             │
   │ 📈 1. Seus clientes retornam abaixo da média│
   │     → Você pode aumentar retorno em 30%     │
   │     investindo em pós-venda.                │
   │                                             │
   │ ⚠️ 2. Seu fluxo financeiro apresenta risco  │
   │     → Você não sabe se vai faltar caixa.    │
   │     → Ative o fluxo de caixa.               │
   │                                             │
   │ 💡 3. Você pode aumentar faturamento em R$  │
   │     → Ticket médio abaixo do potencial.     │
   └─────────────────────────────────────────────┘
```

### Padrões detectados na primeira versão

| Padrão | Gatilho | Mensagem |
|--------|---------|----------|
| Ticket médio baixo para o segmento | Empresa faturou X com Y clientes → ticket = X/Y | "Seu ticket médio parece baixo para... deseja explorar?" |
| Falta de fluxo de caixa | Empresa não controla caixa | "Sem fluxo de caixa você corre risco de... deseja ativar?" |
| Clientes sem histórico | Todos os clientes importados sem interações | "Você tem N clientes mas não acompanha retorno..." |
| Gap de faturamento vs lucro | Empresa sabe quanto fatura mas não quanto lucra | "Você sabe quanto fatura, mas sabe quanto sobra?" |
| Concentração de receita | Poucos clientes representam muito da receita | "N cliente(s) representa(m) X% da sua receita — risco de concentração" |
| Dados desatualizados | Última atualização > 90 dias | "Parte dos seus dados está desatualizada — deseja atualizar?" |

### Timing de entrega

O primeiro valor é entregue em 3 momentos:

1. **Durante a validação (P12.4)**: "Enquanto você confirma os dados, percebi algo interessante..."
2. **Imediatamente após confirmação**: "Com base no seu negócio, identifiquei estas oportunidades."
3. **24 horas depois (assinatura cognitiva)**: "Passei o dia analisando. Tenho novas percepções."

---

## P12.10 — Cognitive Company Report

### Problema resolvido

Ao finalizar o onboarding, o empresário não tem nenhum diagnóstico formal. Ele não sabe se a plataforma entendeu corretamente sua empresa, nem tem uma visão consolidada de onde está e para onde pode ir. O Cognitive Company Report é o **primeiro artefato de valor entregue pela plataforma**.

### Arquitetura conceitual

O relatório é gerado automaticamente a partir do conhecimento consolidado (P12.2 + P12.3 + P12.4 + P12.5 + P12.7 + P12.8 + P12.9).

```
Company Reconstruction + Import + Validação + Gaps + Confiança + Memória + Primeiro Valor
         ↓
   Cognitive Company Report
         ↓
   ┌─────────────────────────────────────────────────────────────┐
   │               DIAGNÓSTICO INICIAL DA EMPRESA               │
   │                     [Nome da Empresa]                      │
   │                     [Data]                                 │
   ├─────────────────────────────────────────────────────────────┤
   │ Empresa                                                     │
   │   Segmento: Consultoria                                    │
   │   Porte: ME (12 funcionários)                              │
   │   Maturidade Digital: PLANILHA                             │
   │   Faturamento estimado: R$ 50-100k/mês                     │
   │                                                             │
   │ Processos                                                   │
   │   Venda: Indicação + LinkedIn                               │
   │   Pagamento: Pix + Boleto (89% confiança)                  │
   │   Entrega: Presencial + Google Meet                        │
   │                                                             │
   │ Pontos Fortes                                               │
   │   ✅ Nicho claro (consultoria para e-commerce)             │
   │   ✅ Retenção de clientes acima da média                   │
   │   ✅ Fluxo de caixa positivo                                │
   │                                                             │
   │ Pontos Fracos                                               │
   │   ❌ Não mede retorno sobre cliente                         │
   │   ❌ Não controla horas por projeto                         │
   │   ❌ Ticket médio variável sem padrão                       │
   │                                                             │
   │ Oportunidades                                               │
   │   📈 Aumentar ticket médio em 20% com cross-sell           │
   │   📈 Reduzir custo de aquisição com CRM                    │
   │   📈 Automatizar agendamento com Google Calendar           │
   │                                                             │
   │ Riscos                                                      │
   │   ⚠️ Dependência de 3 clientes para 70% da receita        │
   │   ⚠️ Sem reserva financeira identificada                   │
   │                                                             │
   │ Plano dos próximos 30 dias                                 │
   │   1. Ativar CRM (estima +15% retorno)                      │
   │   2. Importar extrato bancário (automatizar fluxo caixa)   │
   │   3. Configurar agenda online (reduzir faltas)             │
   │                                                             │
   │ Módulos Recomendados                                       │
   │   → CRM (gratuito no seu plano)                            │
   │   → Fluxo de Caixa (gratuito)                              │
   │   → Agenda (gratuito)                                      │
   │   → Pipeline Cognitivo (disponível no plano Profissional)  │
   │                                                             │
   │ Próximos Aprendizados                                      │
   │   🔄 Em 30 dias: revisar metas                            │
   │   🔄 Em 60 dias: analisar tendências financeiras           │
   │   🔄 Em 90 dias: primeiro ciclo completo de hipóteses      │
   └─────────────────────────────────────────────────────────────┘
```

### Como é gerado

| Seção | Fonte | Responsável |
|-------|-------|-------------|
| Empresa | Company Reconstruction (P12.2) | P12.2 |
| Processos | Company Reconstruction (P12.2) + Import (P12.3) | P12.2 + P12.3 |
| Pontos Fortes | Análise de padrões positivos | P12.9 (First Value Generator) |
| Pontos Fracos | Knowledge Gap Engine (P12.5) | P12.5 |
| Oportunidades | Primeiro cruzamento de dados | P12.9 |
| Riscos | Identificação de concentração/lacunas | P12.5 + P12.9 |
| Plano 30 dias | Priorização automática de gaps | P12.5 + P12.6 |
| Módulos Recomendados | Progressive Activation Engine (P12.6) | P12.6 |
| Próximos Aprendizados | Ciclo de maturidade | P12.6 |

### Persistência

O relatório é:
1. **Exibido imediatamente** ao empresário no final do onboarding.
2. **Armazenado** como um artefato do Patrimônio Cognitivo (primeiro `Outcome` da empresa).
3. **Regenerado** automaticamente a cada 30 dias ou após mudanças significativas.

---

## O novo fluxo completo de onboarding

### Antes (Programa 1-11)

```
/conversa → 17 perguntas fixas → /criar-conta → /dashboard (vazio)
```

### Depois (Programa 12)

```
1. CONVERSA INICIAL (P12.1)
   Entrevista adaptativa — 3 a 8 perguntas
   "Como você vende? Como recebe? Quem compra?"
   IA adapta as perguntas com base nas respostas
         ↓
2. RECONSTRUÇÃO DA EMPRESA (P12.2)
   Respostas → modelo estruturado da empresa
         ↓
3. IMPORTAÇÃO (P12.3) — OPCIONAL
   "Quer importar dados existentes?"
   CSV / Excel / Google Sheets / ERP (primeira versão: CSV+Excel)
   IA mapeia colunas automaticamente
         ↓
4. VALIDAÇÃO (P12.4)
   "Entendi corretamente?"
   Mostra: clientes, produtos, serviços, financeiro
   Usuário confirma ou corrige
         ↓
5. PRIMEIRO VALOR (P12.9)
   "Enquanto confirma, percebi três oportunidades..."
         ↓
6. CRIAÇÃO DE CONTA
   Supabase + Banco + Vinculação de conversa
         ↓
7. GAPS E RECOMENDAÇÕES (P12.5 + P12.6)
   "Você controla clientes, mas não mede retorno. Deseja ativar?"
   Ativação progressiva por maturidade
         ↓
8. RELATÓRIO COGNITIVO (P12.10)
   Diagnóstico inicial completo
   Plano dos próximos 30 dias
         ↓
9. MEMÓRIA (P12.8)
   Tudo persiste no Patrimônio Cognitivo
         ↓
10. DASHBOARD (agora com dados + contexto)
```

### Comparação com o fluxo atual

| Aspecto | Fluxo atual | Novo fluxo |
|---------|-------------|------------|
| Perguntas | 17 fixas | 3-8 adaptativas + até 8 opcionais |
| Ordem | Fixa | Adaptativa |
| Importação | Depois do cadastro | Durante o onboarding |
| Primeiro valor | Nenhum | Durante a validação |
| Diagnóstico | Nenhum | Relatório completo |
| Ativação | Tudo para todos | Progressiva por maturidade |
| Confiança | Não medida | Medida em cada campo |
| Validação | Nenhuma | "Entendi corretamente?" |
| Tempo total | 15-20 min fixos | 5-15 min (básico) ou 15-30 (com importação) |

---

## Alinhamento com a arquitetura existente

### Relação com a Constituição da Engenharia

| Princípio | Como o Cognitive Onboarding Engine respeita |
|-----------|---------------------------------------------|
| Lei 1 — Service não importa Engine | Nenhum service criado (ainda). As engines propostas comunicam-se via objetos, não imports diretos. |
| Lei 2 — Engine não acessa Prisma | As engines propostas usam `prisma-tenant-safe` através do Company Memory Builder (P12.8), nunca diretamente. |
| Lei 3 — API não implementa regra | As novas funcionalidades serão expostas por APIs que chamam engines, não implementam regras. |
| Lei 6 — Não duplicar inteligência | A Cognitive Interview Engine (P12.1) NÃO duplica o `conversation-engine` — ela o envolve e estende. A transição é gradual. |
| Lei 10 — Toda engine persiste saída | P12.8 (Company Memory Builder) garante que toda informação vire patrimônio persistido. |
| Seção 1 — Verdade executável | O novo onboarding é validado pelo empresário antes de virar patrimônio (P12.4). |
| Seção 4 — Patrimônio Cognitivo | Tudo que a plataforma aprende alimenta o Patrimônio (P12.8). |

### Relação com a Plataforma de Aquisição Cognitiva

| Pilar da Aquisição | Como o Cognitive Onboarding Engine implementa |
|--------------------|----------------------------------------------|
| Conectores como plugins | P12.3 (Smart Import Engine) usa conectores CSV/Excel/Google Sheets |
| Normalização em 5 camadas | P12.3 implementa Normalização Estrutural + Semântica durante a importação |
| Objetos Universais | P12.2 (Company Reconstruction) produz Objetos Universais |
| Confiança em cada campo | P12.7 (Confidence Engine) |
| Pipeline mínimo (5 estágios) | P12.3 implementa a versão mínima do pipeline |
| Ciclo de vida do dado | P12.8 garante que dados sigam raw → normalized → contextualized → cognitive |

### O que NÃO precisa ser construído agora

| Componente | Quando | Motivo |
|-----------|--------|--------|
| Grafo de entrevista completo | Fase 2 | Primeira versão usa fluxo atual + perguntas adaptativas simples |
| Resolução de entidades cross-source | Fase 2 | Requer 2+ fontes conectadas |
| Auto-descoberta de conectores | Fase 2 | Requer conectores maduros |
| Conectores de ERP em tempo real | Fase 2 | Primeira versão é CSV/Excel (importação manual) |
| Mercado de conectores | Fase 4 | Requer base de usuários |
| Gêmeo digital | Fase 6 | Requer anos de dados |

---

## Riscos arquiteturais

### Risco 1 — Complexidade da entrevista adaptativa

O maior risco técnico. Um grafo de entrevista com branches para cada segmento, subsegmento, porte e maturidade pode explodir em complexidade. Um grafo com 5 segmentos × 5 subsegmentos × 4 portes × 4 maturidades = 400 combinações.

**Mitigação:** Primeira versão usa o fluxo atual (17 perguntas) + apenas 3 perguntas adaptativas opcionais. O grafo completo é Fase 2.

### Risco 2 — Qualidade do mapeamento automático de colunas

Se a IA mapeia colunas erradas, o empresário perde confiança na plataforma. Se pedir confirmação de cada campo, a experiência é pior que configuração manual.

**Mitigação:** Confidence Engine (P12.7) + Mapping Engine (P12.4). Só mapeia automaticamente quando confiança ≥ 0.85. Abaixo disso, pergunta.

### Risco 3 — Sobrecarga de recomendações no primeiro contato

Mostrar gaps, oportunidades, riscos e plano de 30 dias no primeiro uso pode sobrecarregar o empresário.

**Mitigação:** Progressive Activation (P12.6) limita a 3 recomendações por vez. First Value Generator (P12.9) mostra apenas o padrão mais relevante. Relatório completo (P12.10) está disponível mas não é exibido automaticamente — o empresário pode acessá-lo.

### Risco 4 — Dependência do Motor Cognitivo para funcionamento básico

Se o Cognitive Interview Engine depender de IA para interpretar respostas, e a IA estiver indisponível, o onboarding para.

**Mitigação:** A entrevista básica funciona sem IA (usando o fluxo atual como fallback). IA é usada para enriquecer, não para executar.

### Risco 5 — Fragmentação da experiência do usuário

Se as 10 engines forem implementadas como sistemas separados, o onboarding vira uma coleção de telas desconexas.

**Mitigação:** As 10 engines são camadas, não módulos independentes. Elas compartilham o mesmo contexto de onboarding e são orquestradas por um fluxo central que coordena a transição entre cada etapa.

---

## Resumo arquitetural — As 10 engines

```
                    Cognitive Onboarding Engine
                    ┌─────────────────────────────────┐
                    │       Orchestrator do Fluxo      │
                    │  (coordena as 10 engines abaixo) │
                    └─────────────────────────────────┘
                                    │
       ┌───────────────┬────────────┼────────────┬───────────────┐
       ▼               ▼            ▼            ▼               ▼
  P12.1            P12.2         P12.3         P12.4          P12.5
  Cognitive        Company       Smart         Mapping         Knowledge
  Interview        Reconstruction Import        Engine          Gap
  Engine           Engine        Engine                        Engine
       │               │            │            │               │
       ▼               ▼            ▼            ▼               ▼
  P12.6            P12.7         P12.8         P12.9          P12.10
  Progressive      Confidence    Company       First Value     Cognitive
  Activation       Engine        Memory        Generator       Company
  Engine                        Builder                       Report
       │               │            │            │               │
       └───────┬───────┴────────────┼────────────┴───────┬───────┘
               ▼                    ▼                    ▼
        Patrimônio Cognitivo    Motor Cognitivo      Decision Engine
```

### Padrão arquitetural comum

Todas as 10 engines seguem o mesmo padrão:

```
INPUT  → contexto do onboarding (respostas, dados, confirmações)
PROCESS → transformação específica (reconstruir, validar, ativar, etc.)
OUTPUT → um dos:
          • Atualização no Patrimônio Cognitivo (P12.8)
          • Recomendação exibida ao usuário (P12.4, P12.5, P12.9)
          • Decisão de ativação (P12.6)
          • Relatório (P12.10)
```

### Interface comum proposta

Toda engine do Cognitive Onboarding Engine implementa conceitualmente:

```
interface CognitiveOnboardingEngine {
  id: string
  nome: string
  
  // Executa a engine com o contexto atual
  executar(contexto: ContextoOnboarding): Promise<ResultadoEngine>
  
  // Verifica se a engine pode executar (dependências satisfeitas?)
  podeExecutar(contexto: ContextoOnboarding): boolean
  
  // Retorna o peso/prioridade desta engine no fluxo
  prioridade: number
}
```

O Orchestrator do Fluxo coordena a execução: chama `podeExecutar`, executa as engines elegíveis em ordem de prioridade, e passa o resultado para a próxima etapa.
