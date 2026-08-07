# EVOLUÇÃO ESTRATÉGICA DA PONTE DIGITAL

**Tema:** Software de Gestão Empresarial OU Plataforma de Evolução Inteligente?
**Tipo:** Documento de análise / reavaliação arquitetural (base para decisões futuras, não é um ADR).
**Data:** 2026-08-06
**Estado:** Proposta de leitura — pendente de decisão do fundador.
**Fonte da verdade de referência:** `docs/03-ENGINEERING/ARCHITECTURE.md`, `docs/01-VISION/THESIS.md`, `docs/04-DECISIONS/ADR/ADR-003-ecossistema-publico-vs-plataforma-cognitiva.md`, `docs/04-DECISIONS/ADR/ADR-017-ia-como-tradutora-de-contexto.md`, `docs/04-DECISIONS/ADR/ADR-016-submotores-responsabilidade-unica.md`.

---

## 0. Resumo executivo

Investigamos se a Ponte Digital é apenas um software de gestão empresarial (CRM + Financeiro + Agenda + Assistente) ou se há nela um **núcleo cognitivo genérico de evolução** que usa o domínio *Empresa* apenas como **primeiro domínio concreto**.

**Veredicto:** a hipótese está **mais correta do que o suposto**, porém em um grau específico. O código revela duas camadas de natureza distinta convivendo sob o mesmo tenant:

- **Camada A — Motores Cognitivos de Evolução (domínio-neutros):** evidência, hipótese, memória evolutiva, reações humanizadas, ritmo, relação, decisão, aprendizado, reflexão, linha da vida, jornada. Estes motores operam sobre *contexto* (objetivos, problemas, prioridades, histórico, decisões, aprendizados) — conceitos idênticos entre uma empresa e uma pessoa.
- **Camada B — Sinais e Regras de Domínio Empresarial (negócio-específicos):** `financeiro.sinais`, `clientes.sinais`, `tarefas.sinais`, `growth-opportunity`, `company-maturity`, `retrato-estrategico` (regras de palavras como "caixa / crescimento / cliente / dependência") e o fluxo `primeira-conversa`.

O código **já preserva parte da separação A/B em módulos distintos** (multi-motores), mas a **fonte de verdade conceitual que os conecta — o tenant — está travada em `empresaId`** (222 ocorrências no schema Prisma). Ou seja: o núcleo cognitivo é **conceitualmente genérico** e **implementacionalmente acoplado** ao domínio Empresa.

**Leitura recomendada:** a Ponte é uma **Plataforma de Evolução Inteligente** cuja camada cognitiva nasceu materializada como se fosse "empresarial". Os conceitos abstratos (evolução, aprendizado, decisão, contradição) já estão corretos e genéricos no código das engines; o que ainda é "empresarial" está (a) no vocabulário embutido nas regras da Camada B e (b) no enraizamento do tenant. Isso é uma **oportunidade de abstração barata no futuro** e uma **armadilha de custo/complexidade se feita agora** — pois ainda não existe um segundo domínio (ex.: Pessoa) validado com cliente real.

---

## 1. Índice dos 11 entregáveis

| # | Entregável | Seção |
|---|-----------|-------|
| 1 | Diagnóstico arquitetural (estado atual) | 3 |
| 2 | Identificação do verdadeiro CORE | 4 |
| 3 | Separação das partes exclusivas do domínio de negócio | 5 |
| 4 | Análise motor a motor (cognitivo vs. empresarial) | 6 |
| 5 | Proposta de abstração | 7 |
| 6 | Avaliação da hipótese crítica | 8 |
| 7 | Riscos técnicos | 9 |
| 8 | Riscos de produto | 10 |
| 9 | Benefícios | 11 |
| 10 | Arquitetura conceitual futura | 12 |
| 11 | Plano de migração em fases | 13 |

---

## 2. Método

Análise baseada em leitura de código-fonte e de documentação:

- Inventário de ~100 motores em `sistema/src/engine/**`, `sistema/prisma/schema.prisma` e `sistema/src/lib/prisma-tenant-safe.ts`.
- Leitura dos pontos de acoplamento: `retrato-estrategico.ts`, `hipoteses-estrategicas.ts`, `conversation-engine.ts`, `fluxos/primeira-conversa.ts`, `src/app/api/assistente/route.ts`.
- Leitura da documentação estratégica existente (THESIS, ADR-003, ADR-017, ontologia cognitiva).

---

## 3. Diagnóstico arquitetural do estado atual

### 3.1 Pilha (verificada no código)

- **Aplicação:** Next.js 16 — **App Router apenas** (sem Pages Router). React 19.
- **Banco:** PostgreSQL via **Prisma 7** com `@prisma/adapter-pg`. Migrações em `sistema/prisma/`.
- **Autenticação:** Supabase (cookie + SSR); autorização por papel (ADMIN/GESTOR/MEMBRO) dentro de uma empresa/tenant.
- **IA (multiprovider):** Google Gemini (default), Groq, Anthropic (compatível) e fallback `NoopProvider`, selecionados por factory em `src/lib/ai-provider.ts`. Envelope de streaming Data Stream **manual**, sem usar as utilidades do SDK `ai`.
- **UI:** Tailwind v4, Radix UI, lucide-react, recharts.
- **Engines:** ~100 motores em `src/engine/**`, seguindo o padrão de sub-motores de responsabilidade única (ADR-016) e motor como barramento central (ADR-015).

### 3.2 Multi-tenancy e o fato central de acoplamento

- Todo dado — **inclusive os modelos cognitivos** (Evidencia, Hipotese, MemoriaCognitiva, AcaoCognitiva, Conversa, SinalValor) — carrega `empresaId` como tenant e chave estrangeira.
- O isolamento é feito pelo wrapper `prismaSeguro` (`src/lib/prisma-tenant-safe.ts`), que força o tenant nas queries. O tenant está **hardcoded ao conceito "empresa"**, não a um conceito neutro de "dono do contexto" (ex.: `contextoId` / `donoId`).

### 3.3 Fluxo de execução (como o assistente usa as engines)

```
Frontend (Next App Router)
   │
   ├─ Páginas de negócio (CRM, Financeiro, Agenda, Assistente) → prismaSeguro
   ├─ /api/assistente  → buscarContexto(empresaId) monta snapshot empresarial
   │      │             (cliente, lead, tarefa, implantacao, transacao, historico)
   │      ├── usa engines cognitivas (relacao, conselheiro, memoria) p/ contexto-IA
   │      └── chama getAIProvider()  → IA é INTERFACE / tradutora (ADR-017)
   └─ /api/conversa (primeira conversa) → fluxo → motores de hipóteses → retrato
           (empresa.dependencia, rotina.energia, financeiro.caixa ...)
```

Esse fluxo mostra que as engines cognitivas dão **forma/consistência** e a IA **sintetiza** sobre o contexto de negócio.

---

## 4. O verdadeiro CORE da Ponte

A leitura do código + da documentação (`THESIS.md`, `MOTOR_COGNITIVO.md`, ontologia) converge para este CORE:

> **Um conjunto de motores determinísticos que modelam e evoluem a relação entre uma entidade e sua evolução — objetivos, problemas, prioridades, evidências, hipóteses, decisões, contradições, memória, aprendizado, reflexão e momento — e que usam a IA como um ator de tradução/interface, nunca como cérebro.**

O CORE é o **Ciclo Cognitivo Contínuo** (ADR-013):

```
Observação/Evidência → Hipótese → Decisão → Ação → Feedback → Aprendizado/Reflexão → nova Observação
```

Esse ciclo é **agnóstico ao domínio**: qualquer "sujeito" que tem objetivos, age, decide e aprende pode evoluir — Empresa, Pessoa, Projeto, ou mesmo uma Área da empresa.

**Motores que são efetivamente o CORE (domínio-neutro):**

- `evidence-engine` (evidência/sinal)
- `hipoteses-estrategicas` (estrutura de hipótese genérica — ver nota em 6.3)
- `cognitive-memory-engine`, `memoria-evolutiva-engine`, `forgetting-engine` (memória e esquecimento)
- `cognitive-evolution-engine` (evolução)
- `reacoes.ts` (Ritmo Cognitivo e Reações Humanizadas — P74)
- `relacao-engine` (relação e continuidade)
- `decision-engine` e `decision-learning-cycle-engine` (decisão + ciclo de aprendizado)
- `aprendizado-service`, reflexão (conhecimento/reflexão)
- `cognitive-journey-engine`, `linha-da-vida-engine` (jornada de evolução)

**Infraestrutura da plataforma (forma, não domínio):** `event-publisher/store/catalog/subscriber`, `cognitive-bus`, `pipeline-*`, `dead-letter-queue`, `retry-policy`, `pipeline-comparator`.

**Apresentação/UX cognitiva (forma, não domínio):** `cognitive-experience`, `briefing`, `narrative`, `timeline`, `radar`, `curve`, `heatmap`, `before-after`. Dão "forma de leitura" ao CORE, sem conteúdo empresarial.

---

## 4. O que é EXCLUSIVO do domínio Empresa (não-cognitivo)

Estes motores/conceitos são **inerentes ao domínio negocial** e **não devem migrar para o CORE** — compõem a Camada B:

- `financeiro.sinais.ts` — sinais construídos sobre transações/receita/despesa/caixa.
- `clientes.sinais.ts` — sinais baseados em clientes/leads.
- `tarefas.sinais.ts` — sinais de operação/tarefas.
- `growth-opportunity-engine.ts` — oportunidades de crescimento (vocabulário comercial).
- `company-maturity-engine.ts` — maturidade **de empresa** (conceito específico de negócio).
- `cenario-engine.ts` — cenários financeiros.
- `fluxos/primeira-conversa.ts` — fluxo de perguntas com **IDs empresariais** (`empresa.*`, `rotina.*`, `financeiro.*`) e opções voltadas a negócio.
- Modelos Prisma `financeiro.*`, `cliente`, `lead`, `tarefa`, `implantacao`, `transacao`, `historico`, e os eventos de negócio do catálogo (ex.: `cliente.criado`, `venda.registrada`).

**Regra de bolso (critério de separação):**

> Um motor é **do CORE** se faz sentido para uma *Pessoa* evoluir (objetivos, hábitos, decisões, aprendizados). É **exclusivo de negócio** se só faz sentido para uma *Empresa* (faturamento, clientes, equipe, maturidade organizacional).

A decisão do ADR-003 já aponta nessa direção: o Diagnóstico pertence ao **Ecossistema Público** ("ajudar quem ainda não é cliente"), e a Plataforma Cognitiva (CRM, Agenda, Financeiro) é o produto pago. Isso reforça que o valor cognitivo primordial (a "leitura" e a "evolução") não é exclusivo do cliente pagante empresarial — existe também para um Apoiador/Pessoa.

---

## 5. Análise motor a motor (Camada A vs. Camada B)

### 5.1 Motores cognitivos/genéricos (domínio-neutro)

| Motor | O que faz | Específico de negócio? | Nota |
|-------|-----------|------------------------|------|
| `evidence-engine` | registra evidência | Não | Genérico. OK. |
| `memoria-evolutiva-engine` | memória que evolui | Não | Genérico. OK |
| `forgetting-engine` | esquecimento planejado | Não | Genérico. OK |
| `decision-engine` + `decision-learning-cycle` | decisão + aprender | Não | Genérico. OK. Implementação robusta. |
| `aprendizado-service` | conhecimento/prioridade | Não | Genérico. OK |
| `cognitive-journey-engine`, `linha-da-vida-engine` | jornada de evolução | Não | Genérico. OK |
| `conselheiro-engine` | raciocínio de aconselhamento | Parcial | Revisar vocabulário interno. |
| `reacoes.ts` (Ritmo/Reações, P74) | reações humanas | Não | Genérico (feito para empresário, mas sem termos de domínio). |
| `relacao-engine` | continuidade/relação | Não | Genérico. OK |
| `cognitive-experience/briefing/narrative/timeline/radar/curve/heatmap` | apresentação da jornada | Não | Forma, não domínio. |
| reflexão / clareza | clareza e reflexão | Não* | Sem termos de negócio. |
| `priority-engine` etc. | adereças de prioridade | Misto | A mecânica é genérica; o conteúdo priorizado é de domínio. |

### 5.2 Motores empresariais (domínio-negócio)

| Motor | O que faz | Tipo de acoplamento |
|-------|-----------|---------------------|
| `financeiro.sinais` | sinais de caixa/faturamento | Termos de caixa, receita, despesa |
| `clientes.sinais` | sinais de clientes | Termos de CRM |
| `tarefas.sinais` | sinais de operação | Termos de operação/tarefas |
| `company-maturity-engine` | maturidade organizacional | Termos de empresa |
| `growth-opportunity-engine` | oportunidades de crescimento | Termos de venda/comercial |
| `cenario-engine` | cenários financeiros | Visão financeira |

### 5.3 Motor misto — o caso mais revelador

**`hipoteses-estrategicas.ts`** é o exemplo mais interessante. A **estrutura** da hipótese é 100% genérica e correta (`id/rotulo/texto/forca/confianca/evidencia/prioridade/decisao/pergunta`). Porém a **implementação das regras** contém **vocabulário de domínio empresarial embutido** dentro das regras:

- `palavrasSobrecarga`, `palavrasDelega`, `palavrasIntuicao`, `palavrasCaixaOrganizado`, `palavrasCaixaFalta`, `palavrasTranquiloLonge` — são, na verdade, **vocabulário de hábitos de trabalho** relativamente genérico (energia, delegação, intuição, registro);
- as **hipóteses específicas** (dependencia_fundador, maturidade_operacional, cliente...) são **conceitos empresariais** (ex.: "a operação é tocada pela intuição", "reduzir dependência de uma pessoa").

Ou seja: o **motor de hipóteses tem geometria cognitiva universal** (a mecânica) e **conteúdo de domínio** (as regras concretas). Separar essas duas é a chave da abstração (ver 7).

**`conversation-engine.ts` + `fluxos/primeira-conversa.ts`** — o fluxo usa IDs empresariais (`empresa.*`, `rotina.*`, `financeiro.*`) e `ESTAGIO_POR_ETAPA` mapeia essas etapas a estágios. O conceito **de estágios do conselheiro (contexto → realidade → tensão → evolução → próximo movimento)** é **genérico e valioso**; os **IDs de pergunta** é que são empresariais.

**`src/app/api/assistente/route.ts`** — `buscarContexto(empresaId)` monta um snapshot 100% empresarial (clientes, leads, tarefas atrasadas, receita, despesa, implantação). É a prova de que a IA hoje é **síntese sobre o contexto de negócio**, enquanto as engines cognitivas dão a "forma/consistência" da relação. A IA permanece como **intermediário da síntese** (ADR-017).

---

## 6. Avaliação da hipótese crítica

**Hipótese:** "O núcleo cognitivo depende do contexto, não do domínio Empresa; empresa e pessoa compartilham objetivos, problemas, prioridades e evolução."

**Conclusão: A hipótese é VÁLIDA no nível conceitual — SIM, o núcleo é dependente de *contexto*, não de *domínio Empresa* — mas com ressalva técnica crítica.**

### Evidências a favor (verificáveis no código)

1. **A ontologia e os motores cognitivos são enunciados e implementados de forma agnóstica ao domínio.** `MOTOR_COGNITIVO.md` e `ONTOLOGIA_COGNITIVA.md` definem evidência, hipótese, memória, decisão, aprendizado, reflexão — conceitos que se aplicam a **qualquer entidade que evolua**, sem citar faturamento ou cliente.
2. **Os motores de hipóteses/raciocínio têm forma genérica; apenas o "conteúdo das regras" é empresarial.** A `HipoteseEstrategica` 'schema' se aplicaria a objetivos de vida sem mudança de modelo.
3. **As Reações Humanizadas (P74) e o Ritmo/Relação já são aplicáveis a uma Pessoa.** `reches.ts` e `relacao-engine` não contêm termos empresariais.
4. **No assistente, a síntese é da IA / das engines, independente do domínio do contexto.** Trocando `buscarContexto` por outro contexto, o conselheiro raciocina de forma idêntica — a mecânica é neutra.
5. **ADR-003 e ADR-017 já decidem que o valor cognitivo não é exclusivo do cliente pagante** (o Diagnóstico existe no Ecossistema Público e pode atender Apoiadores) e que a IA é tradutora, não cérebro — logo, o "cérebro" (motores) não tem verse de negócio.

### Ressalva (honestidade técnica)

- **~222 referências a `empresaId`** e os guards de tenant em `prismaSeguro` **travam o CORE ao cluster de negócio na prática**, mesmo quando o conceito é genérico. Abstração nasce "vestida" empresarial.
- **O vocabulário das regras de hipótese** (caixa, crescimento, cliente, dependência) é **empresarial** e precisaria ser parametrizado para valer para uma Pessoa. Um objetivo de vida (ex.: "sair de uma emprego para ter mais qualidade de vida") não se encaixa nas mesmas regras hoje.
- **O fluxo de conversa (primeira conversa) é empresarial de ponta.** Reutilizá-lo para a pessoa exigiria um fluxo paralelo, não apenas troca de vocabulário.

**Portanto:** a hipótese está **aprovada no plano conceitual** (o CORE cognitivo é de fato *contexto*-agnóstico), mas **não está pronta para entrega de produto agora**. O acoplamento técnico e o conteúdo empresarial embutido pedem abstração **em fases** (ver 13), não uma busca por "remover o domínio Empresa" imediata.

---

## 7. Proposta de abstração (preparar caminho, sem quebrar nada)

### 7.1 Princípio-guia

Não refatorar para o ideal na fase de validação (V4). O objetivo é **abrir pontos de extensão** e **padronizar vocabulário**, sem trocar a stack nem criar camada nova que não tenha cliente.

### 7.2 Abstração concreta recomendada (barata, não invasiva)

1. **Introduzir o conceito de "Dono do Contexto" (`contextOwnerId`) em vez de "Empresa" como primeira-classe em escala de tenant.** Na prática, hoje o `prismaSeguro` usa `empresaId`. O passo barato é **manter o schema atual** e **documentar no repositório que `empresaId` hoje representa "o dono do contexto"** (i.e., hoje = empresa), sem migração de dados — apenas semântica + preparação.
2. **Separar "mecânica cognitiva" de "regras/palavras de domínio" nos motores mistos.** Ex.: em `hipoteses-estrategicas.ts`, mover as listas de keywords e as regras para um **dicionário/`regras-dominio` externo** (arquivo `dominio/empresa.ts`), mantendo o motor de `forca`/`confianca`/`prioridade` **genérico**. Isso permite depois carregar outro conjunto de regras sem tocar no motor.
3. **Separar "esqueleto de fluxo" do "etapas/conteúdo".** Em `conversation-engine`, separar o *estágio conceitual* (contexto→realidade→tensão→evolução→próximo) do *conteúdo das perguntas*. Já quase feito com `ESTAGIO_POR_ETAPA`; formalizando, o fluxo de uma Pessoa seria apenas um **novo array de etapas** no mesmo motor.
4. **Manter a camada de apresentação (briefing, radar, curva, timeline)** — já é genérica; apenas tem rótulos de domínio no render.

### 7.3 O que NÃO fazer agora (para não virar débito)

- **Não criar schema novo** (ex.: tabela `Owner` separada) enquanto não houver um cliente real de "Pessoa".
- **Não reescrever o `buscarContexto` do assistente** para ser multi-domínio hoje.
- **Não renomear/migrar `empresaId`** brutalmente — ADR-008 indica que o wrapper é "not-enforced"; renomear agora criaria migração agressiva e sem receptor.

---

## 8. Matriz de cenários da hipótese

| Cenário | Veredicto | Implicação |
|--------|-----------|------------|
| CORE conceptualmente genérico e reutilizável | **Verdadeiro no nível conceitual** (evidências 1–5) | Preparar extensões pontuais (config de domínio, dono do contexto) |
| CORE operacionalmente preso à Empresa | Parcialmente | O motor é genérico; o *prompt* e as *regras* são empresariais; o assistente só sabe ler contexto de negócio |
| CORE teórico, porém reprimir o produto atual | Verdadeiro | O núcleo cognitivo de evolução é o patrimônio real (o que ADR-003 chamou de "patrimônio cognitivo coletivo") |

---

## 9. Riscos técnicos (se a abstração for adotada)

1. **Risco de over-engineering (maior):** separar o domínio do CORE é tentador, mas antecipa o domínio "Pessoa" que **ainda não tem cliente/validação**. Regra: não implementar hipóteses (seção 4 de `CURRENT_PRODUCT`). → mitigação: **abstração config-only**, sem novo produto.
2. **Custo de renomear/migrar `empresaId`→`contextOwnerId`: ** alto se físico (222 campos + índices + FKs). → **Mitigação:** reinterpretar o campo ontologicamente, sem mover colunas; preparar o guard `prismaSeguro` para ler o novo conceito no futuro.
3. **Risco de segurança no wrapper** (ADR-028/008): o wrapper é "not enforced"; abstrair não aumenta segurança. → **Não associar abstração a segurança.** Separar as duas coisas.
4. **Dois planos que podem divergir** (lógica cognitiva + regras de domínio): pode virar um caos de configuração. → **Mitigação:** documentar a divisão na ontologia; nunca colocar regra de domínio dentro de motor cognitivo novo.
5. **Risco de regra para a IA** (ADR-017): a IA deve permanecer **tradutor/interface**; se a abstração for mal feita, a IA pode virar cerelebral. → Vigilância sobre o `buscarContexto`.

---

## 8. Riscos de produto

1. **Divisão de foco:** desejar "Ponte = plataforma para Pessoa" e implementá-lo no palco enquanto o time valida a **Empresa** (fase atual) é curto prazo crítico. → **Aplicação:** a abstração é infraestrutura constante; o negócio continua o mesmo.
2. **Posicionamento enganoso:** se a comunicação passar a "plataforma de evolução para pessoas" antes de o produto de Pessoa existir, gera promessa vazia e confusão (vs. ADR-003). → Manter evolução gradual e documentada.
3. **Centrar o discurso em redução do "diagnóstico":** a energia do produto atual (validar Empresa) não deve ser drenada para a abstração.

---

## 9. Benefícios

1. **Unificação de intenção e realidade:** a leitura da `MOTOR_COGNITIVO`/ontologia passa a casar com a implementação — o motor é, de fato, o motor de contexto-neutro. Claro para a equipe.
2. **Reuso futuro barato:** se o fundador entrar com o domínio **Pessoa/Apoiador** (que o ADR-003 já prevê no Ecossistema Público), o CORE já estará estruturado para reuso sem grande refração.
3. **Empacotar o "patrimônio cognitivo":** o valor diferido real da Ponte (evolução de qualquer entidade) ganha uma **forma genérica** reutilizável que **não depende de CRM/Financeiro** — posicionando a Ponte como **plataforma de inteligência de evolução** (missão), e não como "SaaS de gestão que tem IA".
4. **Responsabilidade única:** motores de cognição ficam testáveis de forma independente (ex.: ciclo de aprendizado pode ser testado com outro domínio).

---

## 10. Arquitetura conceitual futura (visão, NÃO escopo atual)

### 10.1 Camadas-alvo (conceitual)

```
┌──────────────────────────────────────────────────────────────────┐
│  CAMADA DE INTERFACE IA  (Gemini / Groq / Anthropic)            │
│  - só traduz / formata; nunca decide (ADR-017)                  │
└────────────────────────────┬────────────────────────────────────┘
                             │ contexto + evolução
┌────────────────────────────▼────────────────────────────────────┐
│  CORE COGNITIVO DE EVOLUÇÃO (domínio-NEUTRO)                  │
│  - Ciclo: Evidência→Hipótese→Decisão→Ação→Feedback→Aprender    │
│  - Motores: memória, esquecimento, reflexão, contradição,       │
│    ritmo, relação, jornada, linha-da-vida                       │
│  - Canvas: briefing, radar, curva, timeline, narrativa          │
└────────────────────────────┬────────────────────────────────────┘
                             │ lê / escreve "Contexto de evolução"
┌────────────────────────────▼────────────────────────────────────┐
│  ADAPTADORES DE DOMÍNIO  (o que EU enxergo / sugere)           │
│     Empresa (hoje) ·  Pessoa  ·  (futuro) comunidade etc.      │
│  - fluxo de perguntas, regras/sinais,                           │
│    leituras reais (transação, cliente, tarefa...)               │
└────────────────────────────┬────────────────────────────────────┘
                             │ tenant = "Dono do Contexto"
┌────────────────────────────▼────────────────────────────────────┐
│  DB: Tenant (ownerId) + dados cognitivos + dados de domínio    │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 Principios da linha 10

- **CORE é o patrimônio** (domínio-neutro); produtos (Empresa/Pessoa) são **adaptadores** sobre o mesmo CORE.
- **IA é interface** (ADR-017) — em nenhum nível o modelo decide.
- **Multi-tenancy** passa a ser por `contextOwnerId` (dono do contexto); `empresaId` torna-se um caso particular desse dono.

---

## 11. Plano de migração em fases (sem quebrar compatibilidade)

### Fase 0 — Reconhecimento (agora)
- Marcar este documento como **fonte de verdade de intenção**.
- **Sem código** morto. `AGENTS.md`, `ARCHITECTURE.md`, `ONTOLOGIA_COGNITIVA.md` passam a refletir que `empresaId` = "dono do contexto" no contexto atual.
- **Registrar em `KNOWN_ISSUES.md`** a lacuna (sem resolver agora): o CORE é genérico, mas o sistema é acoplado; abstração vem quando houver segundo domínio validado.

### Fase 1 — Design-only (não é implementação)
- Escrever **ADR** que formalize: "O núcleo cognitivo é genérico (contexto-neutro); a entidade dona é hoje a Empresa via `empresaId`; o vocabulário de regras de negócio fica na camada de domínio configurável."
- Definir **interfaces puras (TypeScript)** dos motores cognitivos, **sem tocar no runtime**.

### Fase 2 — Abstração do débito mínimo (quando novo motor/regra surgir)
- Extrair **dicionários de regras** dos motores mistos (`hipoteses`, `company-maturity`) para `config.dominio.ts`, deixando o motor de inferência genérico.
- Abrir função de filtro do `engine` cognitivo para receber `domínio`.

### Fase 3 — **Somente se** um segundo domínio for validado (ex.: Pessoa/Apoiador)
- Modelar a entidade (ex.: `pessoa`/`apoiador`) como novo **tipo de dono de contexto** (ex.: `ownerType`), mantendo `empresa` intacta.
- Criar uma **nova `primeira-conversa.pessoa`** com o mesmo motor de estágio e fluxo genérico.
- Então migrar o schema cognitivo para `contextOwnerId` (migração planejada + backfill), mantendo interação de `prismaSeguro`.

### Cronograma estimado (se aprovado)

- **Fase 0:** imediatamente (barato, revisão de documentação).
- **Fase 1:** 1 sprint (só ADR + interfaces, sem runtime).
- **Fase 2:** quando a próxima feature de regra de negócio surgir.
- **Fase 3:** **skip até existir prova de cliente não-empresa.**

**Regra dura:** *"Nenhuma abstração cuja hipótese não tenha evidência de cliente deve se transformar em requisito."* (princípio da fase V4, seção 4 do `CURRENT_PRODUCT`).

---

## 12. Conclusão

A Ponte Digital **não é apenas um software de gestão**. No nível de intenção **e de código** ela é uma **Plataforma de Evolução Inteligente**, cujo núcleo (Ciclo cognitivo, memória, aprendizagem, decisão, reflexão) é **agnóstico ao domínio**, e usa a Empresa como **primeiro domínio concreto** (produto atual). O que separa hoje a intenção da realização é:

1. o enraizamento do tenant em `empresaId` (fato técnico, migrável depois),
2. o vocabulário empresarial embutido nas regras mistas (hipóteses, maturidade, fluxo).

Ambos são **dívida técnica de abstração**, sem que a abstração precise ser feita **agora** — precisamente porque **não existe ainda um segundo domínio (ex.: Pessoa) com cliente e validação.**

**Recomendação:** adotar as **Fases 0 e 1** (reconhecimento, documentação, ADR e interfaces), e **adliar 2 e 3 até que o mercado puxe** um segundo domínio real. Não iniciar nenhuma migração de dados hoje.

---

## Anexo A — Léx de separação CORE vs. DOMÍNIO

| Termo | CORE (sim) | DOMÍNIO Empresa |
|-------|------------|-----------------|
| "Objetivo" | sim | específico do caso |
| "Problema / prioridade" | sim | específico |
| "Evidência" | sim | — |
| "Hipótese" | mecanismo sim / conteúdo domínio | sim |
| "Decisão observada" | sim | — |
| "Aprendizado / Reflexão" | sim | — |
| "Dependência de uma pessoa" | sim | **tédio empresarial (dependência do fundador)** |
| "cliente / faturamento / maturidade organizacional" | — | **sim** |
| "curva / radar / timeline / briefing" | sim (forma) | — |

> Nota: o item **hipóteses da Empresa** é o único misto — **mecânica no CORE**, **conteúdo no domínio**.