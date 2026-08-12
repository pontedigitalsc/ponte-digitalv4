# GUIA-PONTE-DESCOBERTA — Como usar, testar, localizar e reverter o caderno de campo

> Guia operacional do módulo implementado na missão **P92 PONTE DESCOBERTA + PIONEIRO DE
> CATEGORIA** (commit `0929496`). Foco: **como usar o caderno de campo**, **como testar**,
> **onde está cada peça** e **como reverter**.

---

## 1. O que este módulo faz

O programa de campo (P79–P82) provou que não existe nenhum registro real de campo registrado. O
P92 cria o **caderno de campo digital** do condutor: para cada empresa visitada, um
**Diagnóstico de Descoberta** guia o trabalho na ordem certa e **sem inventar nada**:

```
Diagnóstico criado (categoria + empresa opcional)
  → pergunta-âncora P82 respondida (obrigatória no MVP)
  → participantes ouvidos → falas registradas (DITO literal)
  → fatos classificados pela taxonomia (7 tipos; hipóteses exigem verificação)
  → processos COMO É → desenhos COMO PODERIA SER → validação com o campo
  → divergências (dito × observado) → oportunidades
  → relatório final (12 seções, texto puro, sem IA)
  → primeira empresa de cada categoria = PIONEIRA DE CATEGORIA
```

Tudo determinístico. O **relatório nunca inventa** a resposta da âncora: só monta o que foi
registrado.

---

## 2. Como usar (passo a passo)

1. Logar com usuário de plataforma (acesso `FOUNDER_VIEW_INTERNAL`).
2. Acessar **`https://pontedigital.vercel.app/admin/descoberta`**.
3. **Criar o diagnóstico** (botão "Novo diagnóstico"): informar empresa (opcional), unidade e
   escolher uma **categoria** (serviço vertical; hoje existe **Serralheria & Metais**). A
   categoria nasce com as perguntas-template (ADR-035). Se for a primeira empresa da categoria,
   ela vira a **Pioneira**.
4. Abrir o **detalhe** do diagnóstico e seguir o **checklist** (o "próximo passo" fica no topo):
   - **Pergunta-âncora:** registrar a resposta NA VOZ do proprietário + o resultado declarado.
     É obrigatória — sem ela o checklist não fecha.
   - **Quem é ouvido:** adicionar participantes (Proprietário / Gestão / Operação) com cargo.
   - **O que disseram:** registrar falas literais, vinculadas (ou não) a um participante.
   - **Fatos registrados (taxonomia):** classificar cada fato:
     - `INFORMAÇÃO FORNECIDA`, `CONHECIMENTO CONHECIDO`, `HIPÓTESE`, `MEMÓRIA HUMANA` →
       **exigem verificação** (não viram fato sozinhos);
     - `OBSERVAÇÃO`, `DECISÃO`, `OPORTUNIDADE` → observados/decididos no campo.
     - Nível de confiança opcional (Alta/Média/Baixa) + área (ex.: Orçamento).
   - **Processos — COMO É:** nome, início/gatilho, fim, responsável, etapas (uma por linha),
     retrabalhos, riscos e dependências.
   - **COMO PODERIA SER:** desenho desejado a partir de um processo mapeado + melhoria
     principal. Depois **"Aprovar com o campo"** (validação).
   - **Descrito × Observado:** quando o dito discordar do observado, registrar a divergência
     (a resolução em campo está marcada como "em validação" — condutor confirma na visita).
   - **Oportunidades:** categoria (Gargalo, Retrabalho, Espera, Dependência, Informação
     faltante, Decisão manual, Comunicação, Memória humana, IA futura) + etapa + impacto
     estimado (hipótese, claramente rotulado).
5. **Mudar o estado** conforme o campo avança: `EM_DESCOBERTA → MAPEADO → EM_VALIDAÇÃO →
   VALIDADO → EM_IMPLEMENTAÇÃO → IMPLEMENTADO → EM_APRENDIZADO`. Estados de peso (ex.:
   `EM_APRENDIZADO`) pedem **confirmação** (variante destrutiva).
6. **Relatório final:** botão "Gerar relatório (sem IA)" → texto com as 12 seções do briefing
   §21 → **copiar** para levar ao cliente/equipe.

---

## 3. Como testar em produção

| O que testar | URL / ação | Esperado |
| --- | --- | --- |
| Lista | `https://pontedigital.vercel.app/admin/descoberta` | HTTP 200; abas por estado com contagens; sem sessão → login; sem permissão → aviso de acesso |
| Detalhe | `https://pontedigital.vercel.app/admin/descoberta/[id]` | HTTP 200; checklist; id inexistente → 404 |
| APIs em GET com método errado | `POST /api/descoberta/diagnosticos` → **GET** | **405** (rota existe e está protegida) |
| API sem sessão | qualquer POST em `/api/descoberta/**` | **401/403** (não abre dado nenhum) |
| Transição inválida | `MUDAR_ESTADO` para fora das transições permitidas | **422** com aviso de transição não permitida |
| Slug inválido na criação | nome de categoria com maiúscula/espaço | **422** (slug deve ser `[a-z0-9-]`) |

> As páginas exigem `FOUNDER_VIEW_INTERNAL`; escritas exigem `FOUNDER_MANAGE_PLATFORM`. Papéis
> são atribuídos pela plataforma (P84/P85) — criação de usuário com papel está fora de escopo.

### Testar as regras do motor (sem tela)

```powershell
# Na pasta sistema/
node --experimental-strip-types --test src/engine/descoberta-operacional.test.ts
# Esperado: 15/15 verdes (âncora, estados, transições, taxonomia 7 tipos, confiança,
#            papéis, template ADR-035, categorias, progresso, relatório 12 seções)

# Legado confirmando que nada quebrou:
npm run test:plataforma   # 5/5
npm run test:handoff      # 4/4
```

---

## 4. Onde está cada peça

| Peça | Arquivo |
| --- | --- |
| Regras de negócio (estados, taxonomia, template, progresso, relatório) | `sistema/src/engine/descoberta-operacional.ts` |
| Testes das regras | `sistema/src/engine/descoberta-operacional.test.ts` |
| Acesso a dados (criar, detalhe, ações, relatório) | `sistema/src/services/descoberta-operacional.service.ts` |
| Validação de entrada | `sistema/src/lib/validations/index.ts` (seção "PONTE DESCOBERTA (P92)") |
| APIs (15 rotas) | `sistema/src/app/api/descoberta/**` |
| Lista | `sistema/src/app/(dashboard)/admin/descoberta/page.tsx` |
| Detalhe (server) | `sistema/src/app/(dashboard)/admin/descoberta/[id]/page.tsx` |
| Componentes visuais | `sistema/src/components/descoberta/descoberta-lista.tsx` e `descoberta-detalhe.tsx` |
| Link no menu | `sistema/src/components/layout/sidebar.tsx` ("Descoberta") |
| Banco (migration) | `sistema/prisma/migrations/012_descoberta_operacional/` |
| Modelos | `sistema/prisma/schema.prisma` (11 modelos de descoberta no fim) |

---

## 5. Como reverter (rollback)

### Código

```powershell
git revert 0929496   # volta páginas, APIs, engine, service
git push origin main # deploy automático da Vercel
```

### Banco

A migration `012` é **aditiva** (tabelas novas; nada em tabelas existentes foi alterado). Não
afeta dados atuais. Para remover a estrutura de vez (só se quiser descartar o caderno de campo
de fato), apagar nos dois sentidos (filhos antes dos pais):

```sql
-- tabelas (filhos → pais)
DROP TABLE IF EXISTS "diagnosticos_operacionais_historico"  CASCADE;
DROP TABLE IF EXISTS "oportunidades_descoberta"             CASCADE;
DROP TABLE IF EXISTS "divergencias_descoberta"              CASCADE;
DROP TABLE IF EXISTS "processos_desejados_descoberta"       CASCADE;
DROP TABLE IF EXISTS "processos_descoberta"                 CASCADE;
DROP TABLE IF EXISTS "registros_descoberta"                 CASCADE;
DROP TABLE IF EXISTS "respostas_descoberta"                 CASCADE;
DROP TABLE IF EXISTS "perguntas_descoberta"                 CASCADE;
DROP TABLE IF EXISTS "participantes_descoberta"             CASCADE;
DROP TABLE IF EXISTS "diagnosticos_operacionais"            CASCADE;
DROP TABLE IF EXISTS "categorias_operacionais"              CASCADE;

-- enums
DROP TYPE IF EXISTS "StatusDiagnosticoDescoberta"            CASCADE;
DROP TYPE IF EXISTS "PapelParticipanteDescoberta"            CASCADE;
DROP TYPE IF EXISTS "TipoRegistroDescoberta"                 CASCADE;
DROP TYPE IF EXISTS "ConfiancaDescoberta"                    CASCADE;
DROP TYPE IF EXISTS "StatusProcessoDesejadoDescoberta"       CASCADE;
DROP TYPE IF EXISTS "StatusDivergenciaDescoberta"            CASCADE;
DROP TYPE IF EXISTS "CategoriaOportunidadeDescoberta"        CASCADE;
```

> **Atenção:** apaga o caderno de campo. Só executar com certeza de que não há conhecimento a
> preservar. As migrations SQL no repositório são imutáveis (estado histórico).

---

## 6. Observações finais

- **Nenhuma IA:** o relatório e o "próximo passo" são determinísticos. A IA, quando existir,
  será apenas interface sobre o patrimônio registrado.
- **Vertical = template, não código (ADR-035):** a serralheria entrou como dados (`TEMPLATE_
  SERRALHERIA`, slug `serralheria-metais`). Nova categoria = novo registro, sem migration.
- **Pioneirismo:** a primeira empresa de cada categoria é patrimônio de aprendizado estrutural
  — não vira módulo novo.
- **Migration manual:** `prisma migrate dev` está inviável (shadow DB do Supabase falha no
  replay da migration 002). Novas migrations: escrever `migration.sql` à mão + `prisma migrate
  deploy`.
- **Link "Descoberta"** no menu lateral já leva ao caderno de campo.