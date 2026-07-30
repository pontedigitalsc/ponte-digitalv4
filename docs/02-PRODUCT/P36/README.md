# P36 — Validação Científica da Ponte Digital

*Da hipótese à evidência.*

---

## Contexto

A Fundação V1 está concluída. A Constituição está congelada. O Fluxo Cognitivo Operacional foi implementado. A Experiência Founder V1 está pronta.

A partir deste momento, a Ponte Digital entra oficialmente na fase de validação. O objetivo deste programa não é criar funcionalidades — é transformar toda interação em evidência para evolução do produto.

## Princípio Absoluto

Durante este programa fica proibido adicionar funcionalidades que não contribuam diretamente para medir, aprender ou validar hipóteses.

Não estamos construindo mais produto. Estamos produzindo conhecimento.

## Estrutura Técnica

### Novos Modelos (Prisma)

| Modelo | ETAPA | Finalidade |
|--------|-------|------------|
| `MomentoWow` | 4 | Biblioteca de Momentos WOW |
| `Friccao` | 5 | Radar de Fricção |
| `SinalValor` | 3 | Índice de Valor Percebido |
| `AuditoriaRecomendacao` | 8 | Auditoria de Recomendações |
| `PlataformaSnapshot` | 9 | Capital Cognitivo da Plataforma |

### Novas Engines (`src/engine/p36/`)

| Engine | ETAPA | Export |
|--------|-------|--------|
| `evidence-autologger.ts` | 2 | `registrarAcao()`, `registrarRecomendacao()` |
| `wow-detector.ts` | 4 | `detectarWow()`, `registrarWow()` |
| `friction-radar.ts` | 5 | `registrarFriccao()`, `obterFricoesAgrupadas()` |
| `value-index.ts` | 3 | `registrarSinalValor()`, `calcularIndiceValor()`, `calcularIndiceGlobal()` |
| `recommendation-auditor.ts` | 8 | `auditarRecomendacao()`, `obterRecomendacoesIgnoradas()`, `calcularPrecisaoRecomendacoes()` |
| `platform-capital-engine.ts` | 9 | `calcularMetricasPlataforma()`, `gerarSnapshotPlataforma()` |

### Nova Página Interna

| Rota | ETAPA | Descrição |
|------|-------|-----------|
| `/admin/diario-founder` | 6,7 | Diário do Founder + Mapa de Transformação |

Apenas usuários com role `ADMIN` podem acessar. Sem link na sidebar — acesso exclusivamente direto.

## ETAPAS

| ETAPA | Descrição | Status | Entrega |
|-------|-----------|--------|---------|
| 1 | Sistema Oficial de Hipóteses | ✅ | `HYPOTHESIS_TEMPLATE.md` |
| 2 | Registro Automático de Evidências | ✅ | `evidence-autologger.ts` |
| 3 | Índice de Valor Percebido | ✅ | `value-index.ts` |
| 4 | Biblioteca de Momentos WOW | ✅ | `wow-detector.ts` + model `MomentoWow` |
| 5 | Radar de Fricção | ✅ | `friction-radar.ts` + model `Friccao` |
| 6 | Diário do Founder | ✅ | `/admin/diario-founder` |
| 7 | Mapa de Transformação | ✅ | `mapa-transformacao.tsx` (inline na página) |
| 8 | Auditoria de Valor | ✅ | `recommendation-auditor.ts` + model `AuditoriaRecomendacao` |
| 9 | Capital Cognitivo da Plataforma | ✅ | `platform-capital-engine.ts` + model `PlataformaSnapshot` |
| 10 | Critérios P37 | ✅ | Este documento |

## Regras Seguidas

- ✅ Nenhuma nova funcionalidade de gestão visível ao empresário
- ✅ Nenhum aumento de complexidade da interface
- ✅ Nenhuma métrica técnica exposta ao empresário
- ✅ Toda coleta invisível
- ✅ Toda informação fortalece pelo menos um dos 5 Patrimônios
- ✅ Produto continua parecendo simples

## Uso

### Para registrar uma ação importante:
```ts
import { registrarAcao } from '@/engine'

await registrarAcao(empresaId, 'ATENDIMENTO_REGISTRADO', 'Cliente João foi atendido')
```

### Para detectar um momento WOW:
```ts
import { detectarWow, registrarWow } from '@/engine'

if (detectarWow(fraseDoUsuario)) {
  await registrarWow(empresaId, fraseDoUsuario, 'assistente')
}
```

### Para registrar fricção:
```ts
import { registrarFriccao } from '@/engine'

await registrarFriccao(empresaId, 'ABANDONO', 'fluxo-cadastro-cliente', {
  pagina: '/atendimento',
  duracaoSegundos: 45,
})
```

### Para gerar snapshot da plataforma (agendado):
```ts
import { gerarSnapshotPlataforma } from '@/engine'

await gerarSnapshotPlataforma('DIARIO')
```

## Migração de Banco

Para aplicar os novos modelos ao banco de dados:

```bash
cd sistema
npx prisma migrate dev --name p36-validacao-cientifica
```
