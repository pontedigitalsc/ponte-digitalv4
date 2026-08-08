# Domínio Operacional — Mapa (P79, sem código)

**Status:** Mapeamento (P79) — atende à decisão ADR-035. Este documento NÃO é schema nem especificação de implementação; é o inventário do que o Motor Operacional precisa e do que já existe no repositório (`sistema/prisma/schema.prisma`).
**Próxima etapa:** P80 — Motor de Workflow (somente após gate de observação da Souza Mestrinho).

---

## 1. Legenda

| Marca | Significado |
|---|---|
| ✅ EXISTE | Modelo/padrão presente no schema hoje (coluna real) |
| 🟡 PADRÃO | Existe um padrão análogo que será **reutilizado/generalizado**, não duplicado |
| 🔴 A CRIAR | Não existe; propõe-se na fase indicada, com migration + ADR própria |

Ctx: todos os modelos seguem as convenções da V4: `empresaId` (tenant), `criadoEm`/`atualizadoEm`, `deletedAt` (soft delete), `@@map("português_plural")`, índices `@@index([empresaId, ...])`.

## 2. Inventário — conceitos universais vs. estado real

| Conceito da tese | Estado | Observação (verificado no schema) |
|---|---|---|
| Cliente | ✅ `Cliente` | `id, empresaId, nome, …` |
| Contato | ✅ `Contato` | vincula a Cliente |
| Lead / Oportunidade | ✅ `Lead` | funil/comercial |
| Tarefa | ✅ `Tarefa` | `responsavelId, clienteId, leadId, prioridade, dataVencimento, status, tipo` — base para ações de OS |
| Histórico | ✅ `Historico` | enum já inclui `PROPOSTA, WHATSAPP, NOTA, LIGACAO, EMAIL, REUNIAO, CONTRATO, SISTEMA` |
| Pagamento | ✅ `Transacao` | financeiro (`valor, status, dataVencimento, dataPagamento, recorrente`) |
| Workflow + Etapa | 🟡 padrão em `Implantacao`/`EtapaImplantacao` | fluxo `StatusImplantacao` + etapas ordenadas (`titulo, ordem, concluida, concluidaEm`) — usado no **onboarding**. O padrão é o certo; o domínio operacional o generaliza (etapas por Tipo de Trabalho), sem duplicar a tabela de onboarding |
| Event Engine | ✅ esqueleto `Evento` + `EventSubscription` + `DeadLetter` | `eventos`, `event_subscriptions`, `dead_letters` (tenant, aggregate, payload Json, tentativas, status). ADR-011 (barramento in-memory) e ADR-012 (catálogo) já documentam o motor |
| Agenda | 🔴 a criar (P84) | — |
| Equipe / Responsável | 🔴 a criar (P84, reuso de `Usuario`) | Responsável pode começar como `usuarioId` em OS (sem tabela Equipe até prova) |
| Recurso | 🔴 a criar (P84/P85) | genérico |
| Material | 🔴 a criar (P85) | item + reserva + estoque mínimo ligeiro |
| Checklist | 🔴 a criar (P82, metadado Json possível) | checklist configurável do Tipo → aplicar na OS como Json |
| Ocorrência × Bloqueio | 🔴 a criar (P83) | pilar do Motor de Gargalos (usuário)
| Grário (Orçamento) | 🟡 **em aberto** | pode nascer como **modelo próprio** OU como etapa do workflow com `valorpotência` na OS. Decisão na P81 (não feita aqui) |
| Tipo de Trabalho | 🔴 a criar (P82) | config: nome, workflow, etapas, prazo est., checklists, metadados (codeset) |
| Ordem de Serviço | 🔴 a criar (P81) | núcleo: cliente + tipoTrabalho + etapaAtual + prazo + status + `Json(fotos/medidas/eq./observações)` |
| Demanda | 🔴 a criar (P80/P81) | entrada universal (WhatsApp/telefone/visita) → origina Orçamento/OS |
| Indicadores / Gargalos | 🔴 a criar (P87) | sobre dados operacionais |
| Assistente Operacional | 🔴 a criar (P86) | camada cognitiva existente (MemoriaCognitiva, Descobertas P77, PerguntaViva P78) é o encaixe repo |

## 3. Decisões do mapeamento (para P80+)

1. **Universal-first, vertical em `Json`** (ADR-035): términos de vertical (medidas, fotos, veículo, diagnóstico) ficam em `Json` na OS e no Tipo de Trabalho; 2ª vertical pedir o mesmo recurso → só aí motele próprio.
2. **Ordem de Serviço é o "ficha viva"**: agrega cliente, tipo, etapa atual, prazo, equipe, valor, observações, ocorrências, fotos e eventos. Pode referenciar `Tarefa`/`equipe`/`transacoes` existentes por FK — não recoil.
3. **Workflow com 2 níveis**: `Workflow` (mola de uma vertical/tipo) → `Etapa` (ordem, título, regra de avanço). Cada OS carrega uma `instancia de etapas` (o estado de avanço) — Ângelo de generalização do padrão `EtapaImplantacao`.
4. **Ciclo de vida da OS** pode ser (P81) um `estadoOS` + `etapa atual` + instância de Etapa: o dual é aceito no mapemento — nada de ded des. Candidatos de índice: `(empresaId, status)`, `(empresaId, tipo)` `(empresaId, responsavel)`, `(empresaId, prazo)`.
5. **Eventos operacionais** (P83): eventos vão à `Evento` (same tenant/aggregateId/type pattern) — `ordemServico.criada`, `orcamento.aprovado`, …, e `EventSubscription`/handers dispararão automações. Nenhuma segunda infra — ADR-011/012.
6. **Sem migrations em P79.** Nenhum `CREATE TABLE`, `ALTER`, `enum` novo neste milestone. TODO model proposto acima é apenas desenho.

## 4. Gate de saída do P79

O P79 é considerado recaluch até que:

- ✅ Tese registrada (`MOTOR_OPERACIONAL_TESE.md`)
- ✅ ADR-035 aceito
- ✅ Mapa aqui lançado
- ⏳ **Kit de observação aplicado na Souza Mestrinho** (1 visita/documentação real) e pergunta-âncora respondida ("uma única bagunça")
- ⏳ Registro de campo convertido em **hipóteses de fluxo** (não em funcionalidade)

Só então P80 (Motor de Workflow) abre nação com recorte validado — provavelmente bem menor que o roadmap completo (§14 da tese: `Cliente → Orçamento → OS → Produção → Instalação → Conclusão` ).