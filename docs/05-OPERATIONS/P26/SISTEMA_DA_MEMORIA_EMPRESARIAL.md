# Sistema da Memória Empresarial

**Programa:** 26 — Ativação Cognitiva da Empresa Zero
**Propósito:** Preservar tudo que a Empresa Zero aprende. Nada pode desaparecer.
**Data:** 26/07/2026
**Versão:** 1.0

---

## Arquitetura da Memória — 5 Camadas

A memória empresarial é organizada em 5 camadas que representam o ciclo de maturação do conhecimento: do dado bruto ao patrimônio intelectual confirmado.

```
Camada 1 — Diário Operacional       (dados não processados)
    ↓
Camada 2 — Catálogo de Observações  (dados classificados)
    ↓
Camada 3 — Banco de Hipóteses       (conhecimento em formação)
    ↓
Camada 4 — Conhecimento Confirmado  (patrimônio intelectual)
    ↓
Camada 5 — RFCs                     (evolução documentada)
```

---

## Camada 1 — Diário Operacional

### O que armazena
Registro bruto diário de tudo que acontece na operação da Empresa Zero: eventos, decisões, conversas, observações soltas, dados de sistemas, métricas brutas, erros, achados, sentimentos.

### Formato
Entradas de texto livre com timestamp e tags mínimas.

```
DATA: YYYY-MM-DD
CATEGORIA: [comercial | operação | produto | técnico | comportamento | negócio]
RELATO: texto livre do ocorrido
CONTEXTO: situação em que apareceu
TAGS: palavra-chave1, palavra-chave2
ESTADO_EMOCIONAL: [confiante | incerto | frustrado | surpreso | neutro]
```

### Quem escreve
Fundador (Kelven), diariamente. Qualquer membro do time que opere a plataforma.

### Quem lê
Fundador (revisão semanal). IA (para processamento e extração de observações). Arquiteto de Conhecimento (para validação).

### Frequência de atualização
Diária. Mínimo 5 minutos ao final do expediente.

### Backup / preservação
- Backup automático semanal em repositório Git (docs/05-OPERATIONS/EMPRESA_ZERO/DIARIO_COGNITIVO.md)
- Backup físico mensal (exportação para formato estático)
- Versão completa preservada permanentemente — nunca deletada
- Cada entrada imutável após 24h (período de edição permitido)

### Como consultar
- Busca textual por palavra-chave, data ou categoria
- IA indexa e correlaciona entradas para gerar observações
- Revisão semanal manual pelo fundador

### Como conectar com as outras camadas
- Alimenta a **Camada 2**: padrões recorrentes são extraídos como observações estruturadas
- Alimenta a **Camada 3**: perguntas não respondidas viram hipóteses
- Evidencia a **Camada 4**: dados brutos que confirmam conhecimento existente

---

## Camada 2 — Catálogo de Observações

### O que armazena
Observações estruturadas extraídas do Diário Operacional. Cada observação é um padrão, comportamento, fenômeno ou descoberta identificada e classificada.

### Formato
Entrada estruturada com campos fixos.

```
ID: OBS-{NUMERO_SEQUENCIAL}
DATA: YYYY-MM-DD
TÍTULO: frase curta que nomeia a observação
DESCRIÇÃO: descrição factual do fenômeno observado
CATEGORIA: [produto | processo | comportamento | técnico | negócio | mercado]
FONTES: [lista de entradas do Diário que originaram esta observação]
CONFIANÇA: [0-100] — quão confiável é esta observação
PADRÃO: [novo | recorrente | exceção]
EVIDÊNCIAS: links para dados concretos que apoiam
CO-AUTORES: quem contribuiu para a observação
STATUS: [ativa | em_analise | arquivada]
```

### Quem escreve
Arquiteto de Conhecimento (extrai do Diário). IA (sugere observações candidatas). Fundador (valida e ajusta).

### Quem lê
Fundador. IA. Arquiteto de Conhecimento. Qualquer agente de IA autorizado.

### Frequência de atualização
Semanal. Processamento do Diário dos últimos 7 dias.

### Backup / preservação
- Armazenado em repositório Git (docs/08-KNOWLEDGE/OBSERVACOES/)
- Cada observação tem ID único e imutável
- Status pode mudar (ativa → arquivada), mas o registro nunca é deletado
- Toda alteração de status é registrada com data e autor

### Como consultar
- Por ID, categoria, padrão, status
- IA consulta para gerar hipóteses e insights
- Relatório semanal de observações novas

### Como conectar com as outras camadas
- Origina da **Camada 1**: extração de padrões do diário bruto
- Alimenta a **Camada 3**: observações que geram dúvida viram hipóteses
- Valida a **Camada 4**: observações consistentes confirmam conhecimento

---

## Camada 3 — Banco de Hipóteses

### O que armazena
Hipóteses em aberto — suposições testáveis sobre o negócio, produto, comportamento do empresário ou operação. Conhecimento em formação.

### Formato
```
ID: H-{NUMERO_SEQUENCIAL}
DATA: YYYY-MM-DD
HIPÓTESE: descrição clara e testável
CATEGORIA: [comportamento | motor | experiência | adoção | negócio]
OBSERVAÇÕES_RELACIONADAS: [IDs das observações que originaram]
EVIDÊNCIA_ATUAL: o que já sabemos até agora
COMO_TESTAR: ação específica que confirmaria ou rejeitaria
STATUS: [nova | em_teste | confirmada | refutada | inconclusiva]
PRIORIDADE: [alta | média | baixa]
RISCO: [alto | médio | baixo] — risco de estar errada
TEMPO_ESTIMADO: dias para validar
DATA_CRIAÇÃO: YYYY-MM-DD
DATA_ÚLTIMA_ATUALIZAÇÃO: YYYY-MM-DD
DATA_CONFIRMAÇÃO: YYYY-MM-DD (preenchido se confirmada/refutada)
RESPONSÁVEL: quem está validando
```

### Quem escreve
Arquiteto de Conhecimento. IA (sugere hipóteses baseadas em observações). Fundador (propõe hipóteses do negócio).

### Quem lê
Fundador (para decidir quais testar). IA (para gerar experimentos). Time (para entender o que está sendo investigado).

### Frequência de atualização
Semanal. Revisão de status de todas as hipóteses ativas.

### Backup / preservação
- Armazenado em docs/08-KNOWLEDGE/HIPOTESES/
- Toda mudança de status preserva o histórico
- Hipóteses refutadas são mantidas com registro do aprendizado
- Ciclo de vida totalmente rastreável: criada → testada → confirmada/refutada

### Como consultar
- Por status, categoria, prioridade
- IA consulta para evitar repetir experimentos já feitos
- Dashboard semanal de hipóteses ativas vs validadas

### Como conectar com as outras camadas
- Originada da **Camada 2**: observações que geram dúvida
- Testada com dados da **Camada 1**: experimentos geram novas entradas no diário
- Confirmada → migra para **Camada 4**: vira conhecimento confirmado
- Pode gerar **Camada 5**: hipótese validada vira RFC de mudança

---

## Camada 4 — Conhecimento Confirmado

### O que armazena
Aprendizados validados que se tornam patrimônio intelectual da empresa. Conhecimento que não precisa ser redescoberto.

### Formato
```
ID: K-{NUMERO_SEQUENCIAL}
DATA: YYYY-MM-DD
TÍTULO: nome do conhecimento
DESCRIÇÃO: enunciado claro do que sabemos
CATEGORIA: [valores | preferências | regras | objetivos | rotinas | padrões | princípios]
CONFIANÇA: [0-100] — quão certo estamos disso
HIPÓTESES_CONFIRMADAS: [IDs das hipóteses que levaram a este conhecimento]
OBSERVAÇÕES_BASE: [IDs das observações que fundamentam]
EVIDÊNCIAS: [links para dados, experimentos, decisões]
REVISÕES: quantas vezes foi revalidado
ÚLTIMA_REVISÃO: YYYY-MM-DD
NÍVEL: [fundação | operacional | estratégico]
ÁREA: [comercial | financeiro | operação | produto | cognitivo | pessoas]
```

### Quem escreve
Arquiteto de Conhecimento. Fundador (valida). A entrada é proposta pela IA ou pelo Arquiteto, mas apenas validada pelo fundador entra como conhecimento confirmado.

### Quem lê
Fundador. IA (como base de consulta para recomendações e decisões). Time (como fonte da verdade).

### Frequência de atualização
Mensal. Novos conhecimentos são adicionados conforme hipóteses são confirmadas.

### Backup / preservação
- Armazenado em docs/08-KNOWLEDGE/CONHECIMENTO_CONFIRMADO/
- Backup em repositório Git e exportação estática
- Imutável após confirmação (só pode ser revisado, nunca deletado)
- Toda revisão mantém versão anterior visível

### Como consultar
- Por área, categoria, nível, confiança
- IA usa como base de conhecimento para gerar recomendações
- Relatório trimestral de patrimônio intelectual

### Como conectar com as outras camadas
- Originado da **Camada 3**: hipóteses confirmadas migram para cá
- Baseia decisões registradas na **Camada 1**: decisões referenciam conhecimento
- Fundamenta **Camada 5**: RFCs propõem mudanças baseadas em conhecimento
- Feedbacks da **Camada 2**: novas observações revisam conhecimento existente

---

## Camada 5 — RFCs (Request for Changes)

### O que armazena
Mudanças propostas e implementadas na empresa. Evolução documentada de processos, produto, arquitetura e operação.

### Formato
```
ID: RFC-{NUMERO_SEQUENCIAL}
TÍTULO: nome da mudança proposta
AUTOR: quem propôs
DATA_CRIAÇÃO: YYYY-MM-DD
STATUS: [rascunho | em_revisao | aprovada | em_implementacao | implementada | rejeitada | cancelada]
PROBLEMA: o problema que esta RFC resolve
CONTEXTO: por que isso é necessário agora
SOLUÇÃO: descrição da mudança proposta
CONHECIMENTO_BASE: [IDs dos conhecimentos confirmados que fundamentam]
OBSERVAÇÕES_BASE: [IDs das observações que motivaram]
HIPÓTESES_BASE: [IDs das hipóteses relacionadas]
ALTERNATIVAS: o que foi considerado mas rejeitado
IMPACTO_ESPERADO: o que esperamos que aconteça
IMPACTO_REAL: o que realmente aconteceu (preenchido após implementação)
DECISÃO: quem aprovou e em que data
DATA_IMPLEMENTAÇÃO: YYYY-MM-DD
LIÇÕES_APRENDIDAS: o que a implementação ensinou
```

### Quem escreve
Qualquer membro do time. Fundador (aprova). Arquiteto de Conhecimento (revisa alinhamento com o patrimônio).

### Quem lê
Fundador (revisa e aprova). Time (executa). IA (consulta para entender decisões passadas).

### Frequência de atualização
Conforme necessidade. Toda mudança significativa deve virar RFC.

### Backup / preservação
- Armazenado em docs/rfcs/ (já existe estrutura)
- Todas as RFCs preservadas mesmo se rejeitadas ou canceladas
- Implementação registra impacto real e lições aprendidas
- Histórico completo de status acessível

### Como consultar
- Por status, autor, data
- Timeline de evolução da empresa
- IA consulta para não propor mudanças já rejeitadas

### Como conectar com as outras camadas
- Motivada por **Camada 2 + 3**: observações e hipóteses geram necessidade de mudança
- Fundamentada em **Camada 4**: conhecimento confirmado baseia as decisões
- Impacto registrado na **Camada 1**: resultados da implementação viram diário
- Pode gerar novas **Camada 3**: mudanças criam novas hipóteses a testar

---

## Regras da Memória

### Regra 1 — Preservação permanente
Toda observação é preservada permanentemente. Nunca deletada. Alteração de status não é remoção. O registro original permanece acessível mesmo quando reclassificado.

### Regra 2 — Lifecycle rastreável de hipóteses
Toda hipótese tem ciclo de vida documentado: criada → em teste → confirmada/refutada. Cada transição registra data, autor e evidência que motivou a mudança.

### Regra 3 — Contexto preservado em decisões
Toda decisão registrada inclui: o problema que motivou, as alternativas consideradas, o conhecimento base, o impacto esperado. Uma decisão sem contexto não é uma decisão — é um palpite.

### Regra 4 — Reclassificação, nunca descarte
Nada é descartado. Apenas reclassificado. Uma observação que não faz mais sentido vai para status "arquivada", não é deletada. Uma hipótese refutada permanece como aprendizado.

### Regra 5 — Memória consultável pela IA
Todas as camadas são legíveis por máquina. A IA consulta a memória para: não repetir experimentos, basear recomendações em conhecimento validado, correlacionar padrões entre camadas, gerar novos insights.

### Regra 6 — Memória auditável
Todo registro sabe: quem escreveu, quando, o que mudou desde então. Trilha de auditoria completa para cada entrada em todas as camadas.

---

## Ciclo de Vida do Conhecimento

```
Diário (C1) → Observação (C2) → Hipótese (C3) → Conhecimento (C4) → RFC (C5)
   ↑                                                                       ↓
   └─────────────────────── Feedback ──────────────────────────────────────┘
```

Cada ciclo completo de conhecimento passa por todas as 5 camadas. O feedback fecha o ciclo: RFCs implementadas geram novos registros no Diário, que geram novas observações, e o ciclo recomeça.

---

## Tabela Resumo

| Camada | Nome | O que armazena | Frequência | Quem escreve | Quem lê |
|--------|------|----------------|------------|-------------|---------|
| C1 | Diário Operacional | Dados brutos diários | Diária | Fundador | Fundador, IA |
| C2 | Catálogo de Observações | Padrões extraídos | Semanal | Arquiteto, IA | Fundador, IA |
| C3 | Banco de Hipóteses | Suposições testáveis | Semanal | Arquiteto, IA, Fundador | Fundador, IA |
| C4 | Conhecimento Confirmado | Aprendizados validados | Mensal | Arquiteto, Fundador | Fundador, IA, Time |
| C5 | RFCs | Mudanças propostas | Sob demanda | Time, Fundador | Fundador, Time, IA |

---

## Implementação Técnica Prevista

| Camada | Formato de armazenamento | Local |
|--------|--------------------------|-------|
| C1 | Markdown estruturado + JSON | docs/05-OPERATIONS/EMPRESA_ZERO/DIARIO_COGNITIVO.md |
| C2 | Markdown + YAML frontmatter | docs/08-KNOWLEDGE/OBSERVACOES/ |
| C3 | Markdown + YAML frontmatter | docs/08-KNOWLEDGE/HIPOTESES/ |
| C4 | Markdown + YAML frontmatter | docs/08-KNOWLEDGE/CONHECIMENTO_CONFIRMADO/ |
| C5 | Markdown com template fixo | docs/rfcs/ |

**Fase atual:** Implementação manual (markdown em repositório Git). A automação da consulta pela IA virá quando o Motor Cognitivo for descongelado.

---

*Este documento faz parte do Programa 26 — Ativação Cognitiva da Empresa Zero.*
*Sistema de Memória Empresarial — 5 camadas, 6 regras, ciclo completo de conhecimento.*
