# Blueprint — Services

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `sistema/src/services/*.service.ts` (7 services)
> Dependências: `prisma-tenant-safe`, `app-errors`, `logger`, `utils`
> Criticidade: **Crítica**

---

## 1. Regras

1. **Service nunca importa Engine** (Lei 1 da Constituição)
2. Todo service usa `prismaSeguro` (nunca `prisma` diretamente)
3. Todo service replica `empresaId` do usuário autenticado (nunca confia no body)
4. Todo service que cria registro também registra histórico (se aplicável)

---

## 2. Catálogo

### 2.1 Cliente Service (`cliente.service.ts`)

| Função | Entrada | Saída |
|--------|---------|-------|
| `listarClientes(empresaId, filtros?)` | empresaId, opções (busca, status, paginação) | `{ clientes, total, totalPages }` |
| `buscarClientePorId(empresaId, id)` | empresaId, clienteId | Cliente \| null |
| `criarCliente(empresaId, dados)` | empresaId, dados validados | Cliente |
| `atualizarCliente(empresaId, id, dados)` | empresaId, id, dados parciais | Cliente |
| `excluirCliente(empresaId, id)` | empresaId, id | void (soft delete) |
| `converterLeadParaCliente(empresaId, leadId)` | empresaId, leadId | Cliente |

### 2.2 Lead Service (`lead.service.ts`)

| Função | Entrada | Saída |
|--------|---------|-------|
| `listarLeads(empresaId, filtros?)` | empresaId, opções | `{ leads, total }` |
| `criarLead(empresaId, dados)` | empresaId, dados | Lead |
| `atualizarLead(empresaId, id, dados)` | empresaId, id, dados | Lead |
| `moverEstagio(empresaId, id, estagio)` | empresaId, id, novo estágio | Lead |
| `excluirLead(empresaId, id)` | empresaId, id | void |

### 2.3 Tarefa Service (`tarefa.service.ts`)

| Função | Entrada | Saída |
|--------|---------|-------|
| `listarTarefas(empresaId, filtros?)` | empresaId, opções | `{ tarefas, total }` |
| `tarefasDeHoje(empresaId)` | empresaId | Tarefa[] |
| `criarTarefa(empresaId, dados)` | empresaId, dados | Tarefa |
| `atualizarTarefa(empresaId, id, dados)` | empresaId, id, dados | Tarefa |
| `toggleConcluida(empresaId, id)` | empresaId, id | Tarefa |
| `excluirTarefa(empresaId, id)` | empresaId, id | void |
| `statsTarefas(empresaId)` | empresaId | { pendentes, hoje, atrasadas } |

### 2.4 Transação Service (`transacao.service.ts`)

| Função | Entrada | Saída |
|--------|---------|-------|
| `listarTransacoes(empresaId, filtros?)` | empresaId, opções | `{ transacoes, total }` |
| `resumoFinanceiro(empresaId)` | empresaId | { receitas, despesas, MRR, margem } |
| `criarTransacao(empresaId, dados)` | empresaId, dados | Transacao |
| `atualizarTransacao(empresaId, id, dados)` | empresaId, id, dados | Transacao |
| `excluirTransacao(empresaId, id)` | empresaId, id | void |
| `recorrentesPendentes(empresaId)` | empresaId | Transacao[] |

### 2.5 Histórico Service (`historico.service.ts`)

| Função | Entrada | Saída |
|--------|---------|-------|
| `listarHistorico(empresaId, filtros?)` | empresaId, opções | Historico[] |
| `criarHistorico(empresaId, dados)` | empresaId, dados | Historico |
| `excluirHistorico(empresaId, id)` | empresaId, id | void |
| `statsHistorico(empresaId)` | empresaId | { total, porTipo } |

### 2.6 Implantação Service (`implantacao.service.ts`)

| Função | Entrada | Saída |
|--------|---------|-------|
| `listarImplantacoes(empresaId, filtros?)` | empresaId, opções | Implantacao[] |
| `criarImplantacao(empresaId, dados)` | empresaId, dados | Implantacao |
| `atualizarImplantacao(empresaId, id, dados)` | empresaId, id, dados | Implantacao |
| `toggleEtapa(empresaId, etapaId)` | empresaId, etapaId | EtapaImplantacao |
| `concluirImplantacao(empresaId, id)` | empresaId, id | Implantacao |
| `excluirImplantacao(empresaId, id)` | empresaId, id | void |

### 2.7 Histórico Sinal Service (`historico-sinal.service.ts`)

| Função | Entrada | Saída |
|--------|---------|-------|
| `registrarHistoricoSinais(empresaId, sinais)` | empresaId, Sinal[] | void |
| `contarOcorrenciasSinal(empresaId, sinalId)` | empresaId, sinalId | number |

### 2.8 Configuração Service (`configuracao.service.ts`)

| Função | Entrada | Saída |
|--------|---------|-------|
| `listarConfiguracoes(empresaId)` | empresaId | ConfiguracaoEmpresa |
| `atualizarEmpresa(empresaId, dados)` | empresaId, dados | Empresa |
| `atualizarConfiguracao(empresaId, dados)` | empresaId, dados | ConfiguracaoEmpresa |
| `atualizarPerfil(usuarioId, dados)` | usuarioId, dados | Usuario |

---

## 3. Padrão de Implementação

```typescript
// TODO: Template para todo service
export async function listarClientes(empresaId: string, filtros?: FiltroCliente) {
  return prismaSeguro.cliente.findMany({
    where: { empresaId, deletedAt: null, ...buildWhereCliente(filtros) },
    orderBy: { criadoEm: 'desc' },
    take: filtros?.limite ?? 20,
    skip: filtros?.pagina ? (filtros.pagina - 1) * (filtros.limite ?? 20) : 0,
  })
}
```
