# Arquitetura do Patrimônio Global

> **Programa 12 — Fase 4: Sistema Cognitivo Completo (Nível Sistema Operacional)**
> Versão: 1.0
> Propósito: Definir o ciclo de vida completo do patrimônio cognitivo — nascimento, crescimento, maturidade, envelhecimento, proteção e compartilhamento

---

## Preâmbulo

O patrimônio cognitivo é a razão de ser da Ponte Digital. Cada interação, cada decisão, cada resultado — tudo gera conhecimento que se acumula ao longo de anos. Este conhecimento é o ativo mais valioso da plataforma.

Este documento trata do patrimônio em nível global: não apenas de uma empresa, mas de todas as empresas juntas. Como o conhecimento nasce, cresce, amadurece, envelhece e é protegido. Como conhecimento individual vira coletivo sem violar privacidade.

O patrimônio cognitivo é imortal — ele nunca é perdido. Apenas transformado.

---

## Seção 1 — Como nasce o patrimônio

### 1.1 Nascimento por Empresa

Quando uma nova empresa entra na plataforma:

```
t0: Signup → empresaId gerado
t1: Patrimônio vazio criado (estrutura, sem conteúdo)
t2: Modo ONBOARDING — coleta inicial de dados
t3: Primeiras evidências → primeiras hipóteses → primeiro conhecimento
t4: Patrimônio mínimo estabelecido (10+ objetos cognitivos)
t5: Empresa transita para OPERAÇÃO NORMAL
```

### 1.2 Nascimento por Conhecimento

Cada novo conhecimento nasce de uma das seguintes fontes:

| Fonte | Como nasce | Exemplo |
|-------|:----------:|---------|
| Empresário (ensino explícito) | Pergunta direta ou ensino voluntário | "Minha margem é 30%" |
| Motor (inferência) | Padrão observado 3+ vezes | "Vendas caem em janeiro" |
| Motor (validação) | Hipótese confirmada (confiança ≥ 70) | "Sazonalidade de verão confirmada" |
| Importação | Dados estruturados importados | "Seus 50 clientes com CNPJ, telefone" |
| Coletivo | Padrão de empresas similares | "Empresas do seu porte faturam R$ X" |

### 1.3 Estrutura de Nascimento

```typescript
interface NascimentoConhecimento {
  fonte: 'EMPRESARIO' | 'MOTOR_INFERENCIA' | 'MOTOR_VALIDACAO' | 'IMPORTACAO' | 'COLETIVO';
  confiancaInicial: number; // 0-100
  estadoInicial: 'EM_OBSERVACAO' | 'VALIDADO' | 'COLETIVO';
  objetoCognitivo: string; // qual objeto da ontologia
  empresaId: string;
  timestamp: string;
}
```

---

## Seção 2 — Como cresce o patrimônio

### 2.1 Crescimento por Empresa

```
Tempo │ Patrimônio (itens) │ Fase
──────┼────────────────────┼───────
Dia 1 │ 0-10               │ ONBOARDING
Mês 1 │ 10-100             │ AQUISIÇÃO
Mês 3 │ 100-500            │ CONSOLIDAÇÃO
Mês 6 │ 500-2.000          │ MATURIDADE
Ano 1 │ 2.000-5.000        │ OTIMIZAÇÃO
Ano 2+│ 5.000-10.000       │ EVOLUÇÃO CONTÍNUA
```

### 2.2 Mecanismos de Crescimento

O patrimônio cresce através de 4 mecanismos:

**M1 — Acumulação:** Novas evidências, transações, interações são adicionadas diariamente.

**M2 — Refinamento:** Hipóteses evoluem → conhecimento validado → maior confiança.

**M3 — Descoberta:** O Motor observa padrões que não existiam antes → novo conhecimento criado.

**M4 — Conexão:** Relacionamentos entre objetos existentes são descobertos → novos insights.

### 2.3 Limites Naturais de Crescimento

O patrimônio não cresce infinitamente. A condensação (ARQUITETURA_DA_MEMORIA_OPERACIONAL.md) mantém o volume gerenciável:

- Long Term: limite de 10.000 itens por empresa
- Após 10.000 itens → condensação mais agressiva
- Conhecimento redundante é unificado (não duplicado)
- Conhecimento irrelevante é arquivado

---

## Seção 3 — Como amadurece o patrimônio

### 3.1 Fases de Maturidade do Conhecimento Individual

```
Evidência Bruta ──(3+ observações)──→ Sinal
Sinal ──(análise)──→ Hipótese EM_OBSERVAÇÃO
Hipótese ──(confiança ≥ 70)──→ Hipótese CONFIRMADA
Hipótese ──(confiança ≥ 85 + 30 dias)──→ Conhecimento Validado
Conhecimento ──(1+ ano sem refutação)──→ Conhecimento Consolidado
```

### 3.2 Fases de Maturidade do Patrimônio da Empresa

| Fase | Tempo | Característica | Score do Motor |
|:----:|:-----:|:--------------|:--------------:|
| EMBRIONÁRIO | 0-7 dias | Conhecimento mínimo (10+ objetos) | 0-100 |
| EM FORMAÇÃO | 7-30 dias | Primeiras hipóteses, muitas lacunas | 100-300 |
| EM CRESCIMENTO | 30-90 dias | Conhecimento validado aparecendo | 300-500 |
| MADURO | 90-365 dias | Conhecimento consolidado, decisões confiáveis | 500-800 |
| EXPERT | 1+ ano | Motor conhece a empresa profundamente | 800-1000 |

### 3.3 Indicador de Maturidade

```
Maturidade Patrimônio = (
  (ConhecimentoValidado / ConhecimentoTotal) × 0.4
  + (DecisoesComOutcomePositivo / DecisoesTotal) × 0.3
  + (DiasSemGrandeMudanca / 365) × 0.2
  + (HipotesesConfirmadas / HipotesesTotal × 0.1)
) × 1000
```

---

## Seção 4 — Como envelhece o patrimônio

### 4.1 Envelhecimento Natural

Todo conhecimento envelhece. Sem revalidação, sua relevância diminui:

```
Conhecimento novo (0-30 dias):   Relevância = 100%
Conhecimento recente (30-90):     Relevância = 80%
Conhecimento semestral (90-180):  Relevância = 60%
Conhecimento anual (180-365):     Relevância = 40%
Conhecimento antigo (365+):       Relevância = 20% (e decaindo)
```

### 4.2 Revalidação como Antídoto ao Envelhecimento

O envelhecimento é revertido pela revalidação:

| Ação | Efeito na Relevância |
|------|:-------------------:|
| Conhecimento consultado pelo Motor | Volta para 100% (como se fosse novo) |
| Nova evidência consistente | +30% de relevância |
| Empresário confirma conhecimento | +50% de relevância |
| Conhecimento usado em decisão com resultado positivo | +40% de relevância |

### 4.3 Morte do Conhecimento (Arquivamento)

Conhecimento não revalidado por 365+ dias é gradualmente arquivado:

```
Dia 0-180:  Ativo (relevância 100-40%)
Dia 180-365: Em risco de arquivamento (relevância 40-20%)
Dia 365-730: Arquivado (não participa do contexto ativo)
Dia 730+:   Preservado no histórico (apenas consulta manual)
```

Conhecimento arquivado NUNCA é deletado. Apenas movido para Archived (ARQUITETURA_DA_MEMORIA_OPERACIONAL.md).

---

## Seção 5 — Como o patrimônio é protegido

### 5.1 Proteções Estruturais

| Proteção | Mecanismo | Violação |
|:--------:|:---------:|:--------:|
| Isolamento multi-tenant | empresaId em toda query | Lei 8 da Constituição |
| Integridade do ciclo | Registro síncrono no banco | Lei 10 da Constituição |
| Imutabilidade de contexto | Pacote fechado (ADR-021) | Inconsistência de decisão |
| Preservação de conhecimento | Soft delete em 33 modelos | Perda de patrimônio |
| Rastreabilidade de decisão | correlationId em todo ciclo | Decisão sem origem |

### 5.2 Proteções contra Degradação

- **Hard delete é proibido** em todos os modelos cognitivos (soft delete + archived)
- **Backup automático** do banco (frequência a ser definida pela operação, mínimo diário)
- **Replicação** do banco (via PostgreSQL/Supabase)
- **Snapshot pré-migration** antes de qualquer alteração de schema
- **Versão de patrimônio** (cada atualização incrementa versão — permite rollback)

### 5.3 Proteção Legal

O patrimônio cognitivo contém dados do empresário e de seus clientes. Proteções legais:
- Empresa pode solicitar exportação completa de seu patrimônio a qualquer momento
- Empresa pode solicitar exclusão de dados (compliance LGPD) — neste caso, o patrimônio é anonimizado, não deletado
- Dados anonimizados podem ser retidos para aprendizado coletivo mesmo após exclusão
- Auditoria de acesso: toda leitura de patrimônio é logada com quem, quando e por quê

---

## Seção 6 — Como o patrimônio nunca perde conhecimento

### 6.1 A Regra de Ouro

**Nenhuma operação no sistema cognitivo pode destruir conhecimento.**

Isso é garantido por:

1. **Soft delete universal:** Nenhum registro cognitivo é deletado — apenas marcado como `deletedAt`.
2. **Refutação = arquivamento:** Hipótese refutada não é deletada — é movida para Archived com a evidência que a refutou.
3. **Decisão errada = aprendizado:** Decisão que deu errado é registrada como erro, não apagada. O erro vira aprendizado.
4. **Condensação = sumarização, não remoção:** A condensação cria sumários, mas os originais permanecem em Archived.
5. **Versão de patrimônio:** Toda mudança incrementa a versão. É possível reconstruir o estado anterior.

### 6.2 Cadeia de Preservação

```
Sinal original → Persiste em HistoricoSinal (nunca deletado)
  │
  ▼
Evidência → Persiste em Evidencia (nunca deletado)
  │
  ▼
Hipótese → Persiste em Hipotese (nunca deletado, refutada = archived)
  │
  ▼
Decisão → Persiste em AcaoCognitiva (nunca deletado)
  │
  ▼
Resultado → Persiste em Outcome (nunca deletado)
  │
  ▼
Conhecimento Validado → Persiste em ConhecimentoValidado (nunca deletado)
  │
  ▼
Memória → Condensada em MemoriaCognitiva (original em archived)
```

### 6.3 Recuperação de Conhecimento "Perdido"

Mesmo conhecimento arquivado pode ser recuperado:

```
1. Empresário pergunta sobre algo antigo
2. Motor busca em Archived
3. Se encontrar → reativa para Long Term
4. Se não encontrar em memória → busca em registros originais (sinal, evidência)
5. Se não encontrar → "não sei" (silêncio honesto)
```

---

## Seção 7 — Como conhecimento individual vira coletivo

### 7.1 Processo de Coletivização

```
Conhecimento Individual → Anonimização → Agregação → Padrão Coletivo
```

**Etapa 1 — Anonimização:**
- Remove empresaId, nomes, CNPJ, valores exatos
- Substitui valores exatos por faixas (ex.: "faturamento entre R$ 50k-100k")
- Remove contexto específico (ex.: "cliente X" → "cliente do setor Y")

**Etapa 2 — Agregação:**
- Agrupa por setor, porte, região
- Calcula média, mediana, desvio padrão, correlações
- Exige N mínimo de 30 empresas para qualquer padrão

**Etapa 3 — Padrão Coletivo:**
- "70% das empresas de varejo que implementaram controle de estoque reduziram custos em 15%"
- Armazenado como conhecimento coletivo (sem referência a empresas individuais)

### 7.2 O que é Coletivizável

| Tipo | Pode virar coletivo? | Anonimização necessária |
|:----:|:--------------------:|:-----------------------:|
| Conhecimento Validado | Sim (estatística anônima) | Remover empresaId, valores exatos |
| Hipótese CONFIRMADA | Sim (se genérica) | Remover contexto específico |
| Decisão → Outcome | Sim (resultado agregado) | Remover dados financeiros exatos |
| Padrão comportamental | Sim (anonimizado) | Remover identificadores |
| Dado financeiro bruto | Não (nunca) | — |
| Dado de cliente | Não (nunca) | — |
| Conversa | Não (nunca) | — |
| Preferência pessoal | Não (nunca) | — |

### 7.3 Quando o Coletivo É Atualizado

O conhecimento coletivo é atualizado:
- **Semanalmente:** Extração de novos padrões (aprendizado coletivo)
- **Mensalmente:** Revalidação de padrões existentes (ainda são estatisticamente significativos?)
- **Trimestralmente:** Revisão de todo o conjunto de padrões coletivos

---

## Seção 8 — Como conhecimento coletivo nunca viola privacidade

### 8.1 Barreiras de Privacidade

| Barreira | Mecanismo |
|:--------:|:---------:|
| N mínimo | Nenhum padrão coletivo é formado com menos de 30 empresas |
| Anonimização | empresaId é removido antes de qualquer agregação |
| Faixas, não valores | Valores exatos são substituídos por faixas |
| Sem correlação individual | Padrões são agregados, nunca individuais |
| Opt-out | Empresa pode optar por não participar do coletivo |
| Auditoria | Todo padrão coletivo tem origem rastreável (sem identificar a empresa) |

### 8.2 O que NUNCA é Compartilhado

- Nome, CNPJ, telefone, email da empresa
- Nome, cargo, dados pessoais do empresário
- Nome, dados de clientes da empresa
- Valores financeiros exatos (apenas faixas)
- Conversas ou interações individuais
- Decisões individuais identificáveis
- Score de confiança individual

### 8.3 Caso Extremo: Empresa Solicita Exclusão (LGPD)

Se uma empresa solicita exclusão total de dados:
1. Dados individuais são anonimizados (empresaId removido)
2. Conhecimento validado da empresa pode ser mantido no coletivo se irreversivelmente anônimo
3. Dados brutos (conversas, transações) são removidos após 90 dias (período de segurança)
4. Padrões coletivos que dependem exclusivamente desta empresa são removidos (se N cai abaixo de 30)

---

## Seção 9 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. O patrimônio cognitivo nunca perde conhecimento porque toda operação é aditiva — dados são adicionados, nunca removidos. Apenas o estado muda (ativo → arquivado).
2. A maior ameaça ao patrimônio não é erro técnico (crash, bug) — é a inação. Se o empresário para de interagir, o patrimônio para de crescer e começa a envelhecer.
3. O conhecimento coletivo exige N mínimo = 30 empresas para ser estatisticamente significativo — antes disso, o Motor opera apenas com conhecimento individual.

### Pressupostos

1. **P1:** 30 empresas é o N mínimo suficiente para significância estatística. Pode precisar ser maior para setores muito específicos.
2. **P2:** Soft delete universal não impacta performance negativamente. Pode precisar de indexação adicional.
3. **P3:** Empresas aceitam compartilhar conhecimento anonimizado. Validar com pesquisa de aceitação.

### Lacunas

1. **L1:** Mecanismo de "exportação de patrimônio" não foi especificado — formato, prazo, como o empresário solicita.
2. **L2:** A anonimização para aprendizado coletivo não especifica o algoritmo — como garantir que não é reversível?
3. **L3:** A exclusão LGPD (Seção 8.3) tem prazo de 90 dias para remoção — por que 90? Qual o critério?

### Riscos

1. **R1 — Reidentificação:** Padrões coletivos muito específicos (ex.: "empresas de 2 funcionários em Manaus") podem ser combinados para reidentificar empresas. Mitigação: N mínimo = 30 e revisão trimestral.
2. **R2 — Viés de seleção:** Empresas que optam por não participar do coletivo podem ter características diferentes, enviesando os padrões. Mitigação: registrar taxa de opt-out por setor.
3. **R3 — Overflow de conhecimento:** Se o conhecimento validado cresce sem condensação eficaz, o arquivamento pode não ser suficiente. Mitigação: limites por empresa e condensação periódica.

### Conflitos

Nenhum conflito. Consistente com ADR-010 (Patrimônio Cognitivo Unificado), ADR-019 (Hierarquia de Memória), ADR-026 (Esquecimento Programado) e Lei 10 da Constituição.

### Impacto Futuro

1. O patrimônio cognitivo global é o ativo mais valioso da Ponte Digital e sua maior barreira de entrada para concorrentes.
2. A proteção contra perda de conhecimento garante que anos de aprendizado não são perdidos por falha técnica.
3. O conhecimento coletivo permite que empresas novas se beneficiem de padrões descobertos por milhares de empresas sem violar privacidade.
