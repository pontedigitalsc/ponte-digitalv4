# P68 — O Ciclo de Decisão Empresarial

**Data:** 4 de agosto de 2026
**STATUS:** IMPLEMENTADO (conexão P66 ↔ Centro de Decisão + Patrimônio Decisório; sem loop automático nesta versão).

> A Ponte não apenas aconselha. A Ponte passa a **acompanhar decisões reais até o resultado**.
> Quando ela detecta que o empresário está considerando contratar, demitir, mexer em preços,
> pegar empréstimo ou expandir, ela não só reflete — ela pergunta: *"posso acompanhar essa
> decisão com você?"*. A decisão ganha vida.

---

## 1. Problema

Antes do P68 o ciclo era:

> Empresário: *"Estou pensando em contratar alguém."*
> Ponte: *"Essa decisão parece importante. Considere alguns pontos."*
> Fim.

Isso é **reflexão**, não **acompanhamento**. A decisão nascia e morria na conversa.
Não havia registro acompanhado, nem estados evoluindo, nem aprendizado que voltasse
para a memória. O Conselheiro (P66) pensava junto, mas o Ciclo de Decisão não estava
conectado ao Centro de Decisão (P61) nem alimentava uma memória decisória.

## 2. O que P68 entrega

Missão restrita por design: **não criar telas, não criar módulos, conectar o que já
existe.** Foram entregues as Partes 1 e 3 do spec (conexão Conselheiro ↔ Centro de
Decisão e memória decisória). A Parte 4 (loop automático após X dias) foi **deixada de
fora** deliberadamente nesta sprint — ver §6.

### 2.1 Parte 1 — Conselheiro → Decisão acompanhada (P66 ↔ Centro de Decisão)

Quando o Conselheiro (P66) detecta uma decisão (contratar, demitir, preço, empréstimo,
expansão, compra), a decisão agora **ganha vida**: um registro `AcaoCognitiva` é criado
com `origem: 'ASSISTENTE'` contendo a **Origem** (o que o empresário disse), o **Contexto**
(os sinais reais da empresa), a **Hipótese** (a reflexão construída, sempre como hipótese,
nunca verdade) e as **lacunas** (o que ainda não sabemos). Tudo dentro do campo `Json`
`impactoEsperado` — sem migration (ver §5).

- **Dedupe anti-poluição:** se já existe uma decisão **da mesma categoria** aberta
  (`PENDENTE`/`EM_ANDAMENTO`) criada pelo conselheiro nos **últimos 30 dias**, o registro
  não é duplicado — a decisão que está viva é reaproveitada.
- **Estado nasce** `PENDENTE` (a "ideia") e evolui no Centro de Decisão exatamente como as
  decisões registradas pelo próprio empresário — os 4 estados atuais do `status` são mantidos
  (ver §5 sobre a decisão do enum).
- O convite *"posso acompanhar essa decisão com você?"* entra no prompt via bloco
  **DECISÃO ACOMPANHADA** em `formatarRaciocinioParaPrompt`.

### 2.2 Parte 3 — Patrimônio Decisório (memória decisória)

A Ponte agora sabe **"essa empresa já tomou decisões parecidas?"**:

- `conselheiro-engine.ts` carrega as `decisoesAnteriores` da empresa e as cita no
  raciocínio (SABEMOS quando há `resultado`, e em `memoriaCitada` decidões do mesmo tipo
  com sua data). A conversa pode lembrar de verdade: *"em janeiro você mexeu nos preços —
  e o que aconteceu foi..."*.
- `assistente/route.ts` passa a carregar as decisões (`acaoCognitiva`) no contexto e expõe
  a seção **DECISÕES JÁ TOMADAS OU ACOMPANHADAS** (Patrimônio Decisório) no prompt, com
  status, data e o resultado quando registrado.

### 2.3 Centro de Decisão vê a decisão acompanhada

O GET de `decisoes` passa a listar também `origem: 'ASSISTENTE'` além de `USUARIO` — a
decisão que "ganhou vida" na conversa aparece no Centro de Decisão, e o empresário pode
evoluí-la (PATCH: status, o que aconteceu, o que aprendeu, se ajudou) exatamente como
sempre fez. Nada de formulário novo: a decisão nasce na conversa.

### 2.4 Métricas (acompanhamento, não quantidade)

Os dados para **taxa de decisões acompanhadas** e **taxa de aprendizado** ficam
rastreáveis pelo `status` (quantas chegam a `CONCLUIDA`/fecham com `resultado`) e pela
pergunta de valor percebido já existente no PATCH (*"essa reflexão ajudou você a decidir?"*).
Não foi criado dashboard novo — fica sustentado no que já existe.

## 3. O que NÃO mudou

- **Nenhuma tela, rota ou módulo novo.**
- **Sem migrations, sem novas dependências.**
- O comportamento socrático do P66 é preservado — P68 adiciona uma camada de conexão,
  não substitui as perguntas nem a ordem obrigatória.
- **Sem loop automático** (Parte 4 do spec foi adiada — §6).
- Calendário, tarefas genéricas, CRM de decisão e dashboard bonito **não** foram criados.

## 4. Arquivos

- `engine/conselheiro-engine.ts` — **modificado:** carrega `decisoesAnteriores` (patrimônio
  decisório), cita decisões antigas no raciocínio/memória, cria `acompanharDecisao`
  (dedupe 30d, origem `ASSISTENTE`, contexto/hipótese/lacunas em `impactoEsperado`), expõe
  `decisaoAcompanhada` no raciocínio e no prompt (bloco **DECISÃO ACOMPANHADA** com o convite).
- `app/api/assistente/route.ts` — **modificado:** `buscarContexto` carrega as decisões;
  prompt com a seção **DECISÕES JÁ TOMADAS OU ACOMPANHADAS**.
- `app/api/centro-decisao/decisoes/route.ts` — **modificado:** GET inclui `origem: 'ASSISTENTE'`.
- Mapeamentos novos: `TITULO_DECISAO` (título por categoria) e `CATEGORIA_EVIDENCIA_DECISAO`
  (categoria → `CategoriaEvidencia`).

## 5. Decisão de implementação — o ciclo rico no campo `Json` (sem migration)

O spec da Parte 2 pedia um enum com 7 estados (`IDEIA`, `EM_ANALISE`, `DECIDIDA`,
`EM_EXECUCAO`, `RESULTADO_PENDENTE`, `CONCLUIDA`, `APRENDIZADO_GERADO`). **Decisão do
projeto: manter os 4 estados existentes** (`PENDENTE`/`EM_ANDAMENTO`/`CONCLUIDA`/
`ABANDONADA`) e expressar o **ciclo rico** (origem, contexto, hipótese, critério de
sucesso, aprendizado) nos campos `Json` já existentes (`impactoEsperado`/`resultado`).

**Motivo:** Fase V4 Founder — prioridade é aprendizado e usuário real sobre arquitetura
rara. Introduzir 7 estados exigiria migration, replantar o PATCH do Centro de Decisão,
revisar os filtros existentes e migrar dados — complexidade alta para **zero valor ao
empresário nesta fase**. O mesmo ciclo é representado como dados (`Json`), sem quebra, e
pode virar enum formal quando houver evidência de que o empresário usa o ciclo de verdade.
**Desvio documentado em `KNOWN_ISSUES.md`.**

## 6. O que fica para depois (registrado como aprendizado)

- **Parte 4 — Loop automático:** a Ponte perguntar "você tomou aquela decisão?" após X dias
  (e "o que aconteceu?" / "o que está impedindo?"). Foi adiado porque (a) está fora do escopo
  de "conectar o que já existe" — seria um mecanismo temporal novo; (b) a hipótese precisa de
  evidência de que as decisões acompanhadas estão sendo usadas antes de construir o pulso.
  Registrado em `KNOWN_ISSUES.md`.
- **P69 — Evolução do Fundador:** transformar memória em evolução humana.
- **P70 — Diagnóstico Estratégico Comercial:** transformar a primeira sessão em ferramenta de venda.

## 7. Critérios de aceite (P68, escopo desta sprint)

- [x] Decisão detectada pelo conselheiro gera **registro acompanhado** (origem `ASSISTENTE`).
- [x] Registro contém Origem / Contexto / Hipótese / Lacunas em `impactoEsperado` (sem migration).
- [x] Não duplica decisão aberta da mesma categoria nos últimos 30 dias (dedupe).
- [x] Prompt oferece *"posso acompanhar essa decisão com você?"* (bloco DECISÃO ACOMPANHADA).
- [x] Patrimônio Decisório: decisões anteriores são carregadas e citadas no raciocínio/memória.
- [x] Assistente expõe a seção **DECISÕES JÁ TOMADAS OU ACOMPANHADAS** no prompt.
- [x] Centro de Decisão lista decisões de origem `ASSISTENTE`.
- [x] Sem telas, módulos, migrations, calendário, tarefas genéricas, CRM de decisão ou dashboard novos.
- [x] `tsc` e `build` limpos.