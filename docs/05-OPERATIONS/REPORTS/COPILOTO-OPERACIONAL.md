# COPILOTO-OPERACIONAL — Evolução da Descoberta para a Ponte que acompanha a operação (relatório)

> Missão designada "**COPILOTO OPERACIONAL**": evoluir a descoberta operacional (P92) para uma
> Ponte que **acompanha a operação** — a plataforma deixa de ser um lugar onde a pessoa precisa
> parar para preencher e passa a **florar dos sinais que já nascem na rotina**: informação
> registrada uma vez, eventos operacionais, estados do trabalho, hierarquia de intervenção
> (Nv 0–4), redução de carga cognitiva, mapa de atrito e trabalho invisível.
>
> **Decisões desta rodada (aprovadas pelo usuário):**
> 1. **Nome canônico da empresa = Souza Mestrinho Metais** (variação informal "Mestre Metais"
>    descartada nos artefatos).
> 2. **Implementação mínima = motor puro + testes** (engine determinístico que classifica o nível
>    de intervenção e monta o contexto do gerente a partir SOMENTE do que já está registrado na
>    P92). Sem migration, sem rotas novas, sem codificar a operação da empresa.
>
> **Guardrail absoluto respeitado:** nada da operação real (P80/P81/P82, OBSERVADO = ∅) foi
> inventado. Este relatório desenha a **estrutura** para o campo real — não a regra da empresa.

---

## 0. Resumo executivo

- **Arquitetura conceitual** do Copiloto Operacional documentada em
  `docs/03-ENGINEERING/OPERACIONAL/ARQUITETURA_DO_COPILOTO_OPERACIONAL.md` (mapa de eventos e
  estados, modelo de entradas/relações "uma vez informado, muitas vezes utilizado", carga
  cognitiva, atrito, perguntas contextuais, hierarquia Nv 0–4 alinhada aos 7 níveis existentes,
  memória operacional, ciclo descobrir→validar→implementar→observar→melhorar, 5 realidades,
  empresa pioneira, modelo de dados conceitual, mapa de integração).
- **Kit de reunião** com a produção da Souza Mestrinho em
  `docs/05-OPERATIONS/P79/KIT_REUNIAO_SOUZA_MESTRINHO.md` (agenda, roteiro a partir da âncora,
  captura direta para o caderno P92, separação das 5 realidades, critério de aceite).
- **Motor puro novo:** `src/engine/copiloto-operacional.ts` + 14 testes verdes.
- **Nenhuma migration, rota, tela, componente ou alteração em arquivo existente.**
- **Status:** typecheck limpo, build limpo (67 páginas), regressão legada intacta
  (P92 15/15, `test:plataforma` 5/5, `test:handoff` 4/4).

---

## 1. O que existia (antes)

- Programas P79→P82 provaram que **não havia campo registrado** (P82: OBSERVADO = ∅).
- O **P92** entregou o caderno de descoberta em produção: 11 modelos, 15 rotas, engine puro,
  relatório final determinístico, pioneiro de categoria (migration `012` aplicada).
- O que faltava para virar "Copiloto": conectar o que já está registrado em **respostas para quem
  gerencia** (nível de intervenção + visão do gerente + carga + atrito + pergunta certa) e
  preparar a estrutura (eventos/estados) para quando o campo real validar P80/P81.

---

## 2. Decisões de arquitetura

1. **Recorte dos 7 níveis existentes, não modelo paralelo:** a hierarquia operacional Nv 0–4
   (SILENCIOSA / AUTOMÁTICA / SUGESTÃO / CONFIRMAÇÃO / ESCALADA) é mapeada sobre os 7 níveis do
   `MODELO_DE_INTERVENCAO.md` (§8 da arquitetura). Nada de segundo modelo.
2. **Motor puro determinístico** (como P92/founder-operacoes): consome o agregado do
   diagnóstico já existente — sem schema novo, sem banco, sem IA.
3. **Eventos operacionais reusam o Event Engine** (catálogo `event-catalog` existente): o mapa
   da seção 3 da arquitetura é hipótese de investigação; nenhum evento é emitido até o campo
   mostrar que a informação **já nasce naturalmente** na rotina.
4. **Carga/atrito/perguntas são computados, não campos:** não se cria tabela nova — mede-se o
   que já foi registrado no caderno P92.
5. **Sem inventar a empresa:** tudo que não está registrado aparece como "não sabemos".

---

## 3. Entregas desta rodada

| Entregável | Arquivo | Detalhe |
|---|---|---|
| Arquitetura conceitual | `docs/03-ENGINEERING/OPERACIONAL/ARQUITETURA_DO_COPILOTO_OPERACIONAL.md` | 17 seções: diagnóstico atual, pipeline, princípios, eventos×estados, entradas/relações, carga, atrito, perguntas, Nv 0–4, memória, ciclo, pioneira, modelo de dados, integração, implementação mínima, testes, próximos passos, conflitos |
| Kit de reunião | `docs/05-OPERATIONS/P79/KIT_REUNIAO_SOUZA_MESTRINHO.md` | agenda 90 min, roteiro pela âncora, captura → caderno P92, 5 realidades, checklist de aceite |
| Motor puro | `sistema/src/engine/copiloto-operacional.ts` | 5 funções exportadas (abaixo) |
| Testes do motor | `sistema/src/engine/copiloto-operacional.test.ts` | **14 testes** verdes |
| Relatório | este arquivo | — |
| Guia operacional | `docs/05-OPERATIONS/REPORTS/GUIA-COPILOTO-OPERACIONAL.md` | como usar o motor + o que fazer antes/durante/depois da reunião |

### Funções do motor `copiloto-operacional.ts`

1. `classificarNivelIntervencao(input)` → `{ nivel: 0..4, rotulo, motivos }` — regras
   determinísticas priorizadas (4 > 3 > 2 > 1 > 0) baseadas apenas no caderno P92:
   - retrabalho/risco registrado **ou** oportunidade VALIDADA sem implementação → **Nv 4**;
   - divergência ABERTA/QUESTAO_VALIDACAO → **Nv 3**;
   - oportunidade CANDIDATA → **Nv 2**; processo mapeado pronto → **Nv 2**;
   - rotina mapeada e operando sem pendências → **Nv 1**;
   - nada registrado / nada pendente → **Nv 0**.
2. `montarContextoOperacional(dados)` → texto puro "Visão do gerente": o que aconteceu
   (histórico), em que estado está, responsável, o que falta/próximo passo, risco/exceção,
   decisão pendente — lacunas como "não sabemos".
3. `avaliarCargaCognitivaPorProcesso(processo)` → 8 dimensões (Decisões, Memória, Digitação,
   Repetição, Consulta, Ferramentas, Exceções, Intervenção do gerente) com BAIXA/MEDIA/ALTA e
   nível geral — proxies medidos nos arrays existentes do caderno.
4. `montarMapaDeAtrito(dados)` → linha por atrito registrado
   `Processo → Atrito → Causa → Consequência → Frequência? → Impacto? → Intervenção`; sem
   evidência retorna "sem atrito registrado"; frequência/impacto sem dado = "não sabemos".
5. `proximasPerguntasContextuais(dados)` → ≤3 perguntas com **gatilho real** (divergência,
   retrabalho, oportunidade, âncora vazia); nunca por "campo vazio".

---

## 4. Arquivos alterados/criados

**Novos (sem tocar no legado):**

- `docs/03-ENGINEERING/OPERACIONAL/ARQUITETURA_DO_COPILOTO_OPERACIONAL.md`
- `docs/05-OPERATIONS/P79/KIT_REUNIAO_SOUZA_MESTRINHO.md`
- `docs/05-OPERATIONS/REPORTS/COPILOTO-OPERACIONAL.md` (este relatório)
- `docs/05-OPERATIONS/REPORTS/GUIA-COPILOTO-OPERACIONAL.md`
- `docs/05-OPERATIONS/REPORTS/copiloto-operacional.zip`
- `sistema/src/engine/copiloto-operacional.ts`
- `sistema/src/engine/copiloto-operacional.test.ts`

**Modificados (somente documentais):**

- `docs/02-PRODUCT/CURRENT_PRODUCT.md` — marco do Copiloto Operacional.
- `docs/05-OPERATIONS/KNOWN_ISSUES.md` — divergência de nomenclatura da empresa registrada.

---

## 5. Validações (aceite)

- Testes do motor: **14/14** (`node --experimental-strip-types --test src/engine/copiloto-operacional.test.ts`).
- Regressão legada:
  - `descoberta-operacional.test.ts` (P92) — **15/15**.
  - `npm run test:plataforma` — **5/5**.
  - `npm run test:handoff` — **4/4**.
- `npx tsc --noEmit` — limpo.
- `npm run build` — limpo (67 páginas geradas; rotas existentes intactas).

---

## 6. Segurança e multi-tenancy

- O motor é 100% puro e determinístico: **não acessa banco**, não expõe dados e não altera
  nenhum dado de tenant. Consome estruturas já retornadas pelo service da descoberta (nível de
  plataforma, acesso restrito) e nunca cruza informação de outra empresa.
- O mapa de atrito e o contexto citam apenas **dados da própria empresa** (nome do processo,
  responsável, divergência) conforme registrados no caderno — nenhuma inferência.
- Nada de `OrderServico`/`Workflow`/IA foi criado (P80/P81/P82 continuam bloqueados pelo gate de
  campo real).

---

## 7. Problemas encontrados

1. Nenhum bloqueio novo. Mantidos os problemas conhecidos do repo (shadow DB P3006 na 002,
   `migrate diff` no Prisma 7, Lucide-react sem alguns ícones, sem CLI/token Vercel).
2. Nomenclatura: o briefing citou "Mestre Metais"; a empresa canônica em todos os artefatos
   é **Souza Mestrinho Metais** — registrado em `KNOWN_ISSUES.md` para rastreabilidade.

---

## 8. Produção, deploy e rollback

- **Código:** commit técnico + push em `main` (deploy automático Vercel via integração Git).
  Mesmo sem migration, o push dispara rebuild.
- **Banco:** nenhuma alteração. Nada a aplicar.
- **Rollback:** reverter o commit (não há migration nem dados novos).

---

## 9. Significado para o programa

- O caderno P92 deixa de ser só "onde registrar" e passa a ter camada de **leitura para decisão**:
  o mesmo dado já registrado devolve ao condutor o **nível de intervenção** e a **visão do
  gerente**, sem pedir nada de novo ao campo.
- A arquitetura desenha o caminho honesto até P80/P81 (eventos → estados → OS), mas não queima
  o gate: a Souza Mestrinho definirá o "hoje" na reunião (kit), e só **depois** o que for
  observado vira regra.
- Princípio-parte do patrimônio: a Ponte guarda **estrutura** (o que perguntar, como medir,
  como intervir) e o **conhecimento do ramo** continua vindo do campo, classificado
  (CORE/Template/Config) e nunca hard-codado.