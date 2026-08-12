# GUIA-COPILOTO-OPERACIONAL — Como usar, testar e localizar o motor da Copa

> Guia operacional da missão **COPILOTO OPERACIONAL** (evolução da P92). Foco: **o que o motor
> responde**, **como rodar/testar**, **onde está cada peça**, **como usar antes e depois da
> reunião** com a Souza Mestrinho, e **o que o motor NÃO faz** (guardrails).

---

## 1. O que isto faz

A descoberta P92 registra fatos do campo; o **Copiloto Operacional** devolve o que está
registrado transformado em **decisão para quem gerencia**:

```
caderno P92 (processos, divergências, oportunidades, histórico)
        │
        ▼  classificarNivelIntervencao        → Nv 0..4 + motivos
        ▼  montarContextoOperacional         → "Visão do gerente" em texto
        ▼  avaliarCargaCognitivaPorProcesso  → 8 dimensões BAIXA/MEDIA/ALTA
        ▼  montarMapaDeAtrito                → linha por atrito registrado
        ▼  proximasPerguntasContextuais      → ≤3 perguntas com gatilho real
```

Tudo **determinístico e sem banco**. Nada é de suposição: o que não está registrado aparece
como "não sabemos".

---

## 2. Funções (em `sistema/src/engine/copiloto-operacional.ts`)

### 2.1 `classificarNivelIntervencao(input)`

Entrada estrutural (aceita o agregado já retornado pelo service da P92):

- `status`, `respostaAncoraRegistrada`, `processos[]`, `divergencias[]`, `oportunidades[]`.

Saída `{ nivel: 0|1|2|3|4, rotulo, motivos[] }`, prioridade **4 > 3 > 2 > 1 > 0**:

| Condição no caderno | Nível |
|---|---|
| Retrabalho/risco registrado OU oportunidade VALIDADA sem implementação | 4 — Escalada |
| Divergência ABERTA ou QUESTAO_VALIDACAO | 3 — Confirmação |
| Oportunidade CANDIDATA ou processo mapeado pronto p/ próximo passo | 2 — Sugestão |
| Rotina mapeada e operando sem pendências (IMPLEMENTADO/EM_APRENDIZADO) | 1 — Automática |
| Nada pendente / caderno em branco | 0 — Silenciosa |

### 2.2 `montarContextoOperacional(dados)`

Devolve texto "Visão do gerente" com: o que aconteceu (histórico recente), estado atual,
responsáveis, o que falta/próximo passo, risco/exceção, decisão pendente. LACUNAS = "não
sabemos".

### 2.3 `avaliarCargaCognitivaPorProcesso(processo)`

Proxy determinístico sobre arrays do caderno: Decisões (etapas com `decisao`), Memória
(`dependencias`), Digitação (`entradas`), Repetição (`retrabalhos`), Consulta (`etapas`),
Ferramentas (`ferramentas`), Exceções (`retrabalhos`), Intervenção do gerente
(`divergenciasAbertas + oportunidades`). Níveis BAIXA/MEDIA/ALTA (≥4 = ALTA) + `geral`.

### 2.4 `montarMapaDeAtrito(dados)`

Uma linha por atrito registrado:
`Processo → Atrito → Causa → Consequência → Frequência? → Impacto? → Intervenção`.
Sem evidência → única linha "nenhum atrito registrado". Frequência/impacto sem dado = "não
sabemos".

### 2.5 `proximasPerguntasContextuais(dados)`

≤3 perguntas, só com **gatilho real**: âncora em branco, divergência aberta, retrabalho,
oportunidade candidata. Sem gatilho → lista vazia.

---

## 3. Como testar

```bash
cd sistema

# Motor do Copiloto (novo)
node --experimental-strip-types --test src/engine/copiloto-operacional.test.ts   # 14 testes

# Regressão legada
node --experimental-strip-types --test src/engine/descoberta-operacional.test.ts # P92: 15 testes
npm run test:plataforma                                                          # 5 testes
npm run test:handoff                                                             # 4 testes

# Typecheck + build
npx tsc --noEmit
npm run build
```

---

## 4. Como usar na reunião (fluxo recomendado)

### ANTES (preparação — `docs/05-OPERATIONS/P79/KIT_REUNIAO_SOUZA_MESTRINHO.md`)

1. Confirmar pergunta-âncora e participantes (dono + 1 de produção).
2. Levar o template `REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md` para preencher durante.
3. Garantir a categoria **Serralheria & Metais** criada e, se for a primeira empresa,
   `empresaPioneiraId` apontando para a Souza Mestrinho.

### DURANTE

- Registrar **dito × observado** separados; classificar cada fato (taxonomia P92).
- NUNCA misturar REALIDADE / PROBLEMA / HIPÓTESE / DECISÃO / RESULTADO (5 realidades).
- Nenhuma promessa de funcionalidade.

### DEPOIS (dentro de 48h)

1. Preencher `REGISTRO_CAMPO_SOUZA_MESTRINHO_<data>.md` (template P79).
2. Alimentar o caderno P92 no painel `/admin/descoberta` (diagnóstico → âncora → participantes →
   registros → processos → divergências → desejados → oportunidades).
3. Classificar cada problema CORE / Template / Config (ADR-035).
4. Rodar o motor sobre o que foi registrado e **revisar com o dono**:
   - Nível de intervenção (Nv 0–4);
   - Visão do gerente (contexto);
   - Mapa de atrito (onde doía, em 1–3 prioridades).
5. Registrar a divergência de nomenclatura em `KNOWN_ISSUES.md` (canônico: **Souza Mestrinho
   Metais**).

---

## 5. O que o motor NÃO faz (guardrails)

- ❌ Não cria tabela/migration/rota/tela/componente (rodada 100% arquivo novo + docs).
- ❌ Não acessa banco, não cruza dados de outra empresa, não expõe dados de tenant.
- ❌ Não emite eventos operacionais (o mapa da arquitetura §3 é hipótese de investigação).
- ❌ Não implementa OS/Workflow/IA nem regras da Souza Mestrinho (P80/P81/P82 bloqueados até
  campo real → NÃO SABEMOS vira "não sabemos", nunca regra).

---

## 6. Onde está cada peça

| Peça | Caminho |
|---|---|
| Arquitetura conceitual | `docs/03-ENGINEERING/OPERACIONAL/ARQUITETURA_DO_COPILOTO_OPERACIONAL.md` |
| Kit de reunião | `docs/05-OPERATIONS/P79/KIT_REUNIAO_SOUZA_MESTRINHO.md` |
| Relatório da rodada | `docs/05-OPERATIONS/REPORTS/COPILOTO-OPERACIONAL.md` |
| Motor puro | `sistema/src/engine/copiloto-operacional.ts` |
| Testes do motor | `sistema/src/engine/copiloto-operacional.test.ts` |
| Referências conceituais usadas | `docs/09-ARCHITECTURE/MODELO_DE_INTERVENCAO.md` (7 níveis), `docs/03-ENGINEERING/OPERACIONAL/DOMINIO.md` (inventário P79) |
| Base de dados (não alterada) | `sistema/prisma/schema.prisma` (11 modelos P92) |

---

## 7. Rollback

- **Código:** reverter o commit (motor é arquivo novo; remover
  `sistema/src/engine/copiloto-operacional.ts` e `.test.ts`).
- **Banco:** nada a reverter (sem migration).
- **Docs:** remover os 4 novos + reverter as 2 linhas em `CURRENT_PRODUCT.md`/`KNOWN_ISSUES.md`.