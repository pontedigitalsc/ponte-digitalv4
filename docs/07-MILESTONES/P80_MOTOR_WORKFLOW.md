# P80 — MOTOR DE WORKFLOW (DOCUMENTO CONCEITUAL — NÃO IMPLEMENTADO)

**Status:** 📌 **BLOQUEADO — aguardando evidência de campo real (Souza Mestrinho). Zero código. Zero migrations.**
**Decisão:** este documento contém **hipóteses estruturadas** e o **mecanismo para receber a observação** — não um modelo de dados nem uma arquitetura definitiva (regra do P80: não transformar hipótese em arquitetura definitiva).
**Relaciona:** `P79_MOTOR_OPERACIONAL.md`, `ADR-035`, `OPERACIONAL/DOMINIO.md`, `ROTEIRO_CAMPO_SOUZA_MESTRINHO.md`, `REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md`.

---

## 0. DECISÃO EXECUTIVA (PARE)

Após a auditoria, **não existe nenhum registro de campo** da Souza Mestrinho (nada de `OBSERVADO`/`DITO`; apenas documentos do próprio plano). Pela regra absoluta do programa:

> **PARE. Não invente o workflow.** Não há evidência para implementar. O P80 NÃO inicia código.

O que segue é **investigação e preparação**:
1. Auditoria do P79 (o que é fato vs hipótese);
2. Inventário da arquitetura existente (o que reutilizar);
3. Mecanismo pronto para receber a observação (`REGISTRO_CAMPO_..._TEMPLATE.md`);
4. Lista explícita dos dados que ainda faltam;
5. Nenhuma linha de código.

---

## 1. AUDITORIA DO P79 (Parte 1) — respostas

**1.1 O que JÁ FOI COMPROVADO (fatos, não documentação):**
- O schema e as engines existentes foram **verificados no código** (inventário anexo): `Event/EventSubscription/DeadLetter` existem; `cognitive-bus`/`event-publisher`/`event-store` publicam e **gravam `eventos`**; `Implantacao/EtapaImplantacao` existem e são o padrão de etapas; CRUD de `Cliente/Lead/Tarefa/Historico/Transacao` existe; `AcaoCognitiva` materializa decisões acompanhadas; `MemoriaCognitiva` guarda descobertas P77/P78.
- **Fatos do domínio operacional: NENHUM.** Toda a operação é hipótese.

**1.2 O que CONTINUA SENDO HIPÓTESE:**
- A tese do motor operacional (que "organizar o trabalho" vira produto e generaliza);
- A unidade operacional (OS vs Demanda vs Serviço vs Pedido…);
- O modelo de workflow e de estados;
- O ciclo de aprendizado operacional;
- Que a vertical "Fabricação & Instalação" seja um template correto;
- Que a Souza Mestrinho é um caso que generaliza.

**1.3 O que DEPENDE da observação de campo:**
- A resposta da pergunta-âncora ("uma única bagunça");
- O fluxo real (entradas, saídas, responsáveis, esperas, retrabalho);
- Estados reais de parada e seus motivos;
- Dependências reais ("quem pergunta para quem");
- Os tempos que importam;
- As informações que se perdem.

**1.4 Decisões arquiteturais JÁ MADURAS (como princípio, não schema):**
- Universal-first com metadados `Json` (ADR-035 + ADR-007);
- Não duplicar infra: Event e padrão de etapas são reutilizados;
- Modelar **o trabalho**, não a empresa;
- Evento como língua franca entre operação e cognição.

**1.5 Decisões que NÃO DEVEM ser tomadas ainda:**
- Nome/tipo da unidade operacional;
- Schema de `Workflow`/`Etapa` (colunas, enums, tabelas);
- Estados enumerados de OS;
- Formato de "próxima ação";
- Métricas de tempo;
- Camadas de domínio (Business OS / Personal OS — abstração arriscada).

---

## 2. REALIDADE DE CAMPO (Parte 2)

**2.1 Estado da evidência:** busca no repositório (docs + código) retornou apenas os documentos do próprio plano — **nenhum registro real da operação**. Não há visita registrada, nem fluxo observado, nem fala do dono.

**2.2 Dados que AINDA FALTAM (lista exata que bloqueia o P80):**
| # | Dado faltante | Fonte (template) |
|---|---|---|
| 1 | Resposta literal da pergunta-âncora | §Pergunta-âncora |
| 2 | Fluxo real (passos, onde vive a info, responsáveis, esperas, dependências) | §1 FLUXO REAL |
| 3 | Entradas/saídas esperadas por etapa | §2 ENTRA E SAI |
| 4 | Estados reais de parada com motivo | §3 ESTADOS REAIS |
| 5 | Dependências "quem pergunta para quem" | §4 |
| 6 | Gargalos observados com evidência | §6 |
| 7 | Unidade operacional de fato (como os funcionários chamam o objeto que se move) | §8 |
| 8 | Tempos reais relevantes | §8 |
| 9 | Diferença entre processo descrito × executado | §8 |
| 10 | Classificação CORE/Template/Config dos problemas | §7 |

**2.3 Recomendação:** preencher `REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md` em 1+ visitas reais. Sem esse registro, o "workflow" seria um workflow bonito inventado pelo desenvolvedor — exatamente o que o programa proíbe.

---

## 3. MODELAR O TRABALHO, NÃO A EMPRESA (Parte 3)

Hipótese inicial (EXEMPLO, não modelo): `Pedido → Demanda → Planejamento → Execução → Verificação → Entrega`. **Não é o modelo correto** — é um candidato que será confrontado com a observação. O modelo verdadeiro nasce do registro de campo, etapa por etapa.

---

## 4. A UNIDADE OPERACIONAL (Parte 4) — EM ABERTO

**Não escolher antecipadamente.** Candidatos possíveis: OS · Demanda · Serviço · Pedido · Projeto · Atendimento · Produção · Instalação · Manutenção.
Perguntas que a observação responde:
- Qual objeto realmente se desloca pelo processo?
- O que nasce? O que muda de estado? O que precisa de responsável? O que pode ficar parado? O que termina? O que gera outra demanda?

> A entidade central deve representar o **trabalho real**, não uma abstração administrativa.

---

## 5. MOTOR DE WORKFLOW (Parte 5) — conceito (hipótese)

Workflow = **sequência configurável de transformação de trabalho**. Cada etapa precisa de **significado operacional**; não é um Kanban genérico. A Ponte deve saber: o que entrou, onde está, quem é responsável, o que falta, por que está parado, qual o próximo passo, há quanto tempo parado, o que depende dele, o que vem depois.

**Compatibilidade com o existente:** o padrão de "processo com etapas ordenadas + conclusão" já existe em `Implantacao`/`EtapaImplantacao` (`implantacoes`, `etapas_implantacao`) com CRUD e API (`/api/implantacoes/*`). O Workflow **generaliza** esse padrão (reuso), não o duplica.

---

## 6. ESTADOS NÃO SÃO APENAS STATUS (Parte 6)

Cada etapa pode possuir: estado · responsável · entrada esperada · saída esperada · pré-condições · dependências · bloqueios · evidências · próxima ação · tempo esperado · tempo real · **motivo de espera**.
Distinguir **trabalho acontecendo** × **trabalho parado** — "motivo de espera" é a matéria-prima do Motor de Bloqueios e, depois, da inteligência operacional (Parte 17).

---

## 7. MOTOR DE BLOQUEIOS (Parte 7)

Detectáveis (hipótese): tarefa parada · dependência não resolvida · informação ausente · responsável indefinido · etapa atrasada · retrabalho · repetição · gargalo · decisão pendente.
**Princípio:** intervir somente quando há contexto suficiente para acreditar que a intervenção ajuda. Não transformar cada evento em alerta.

---

## 8. MOTOR DE PRÓXIMA AÇÃO (Parte 8)

A Ponte deve responder **"O que precisa acontecer agora?"**, não só "em qual etapa está?".
Exemplo hipotético (a validar): *"A OS está em preparação. Próxima ação provável: confirmar medida e material. Falta: confirmação do responsável. Sem isso, a execução não deve começar."*

---

## 9. MOTOR DE TEMPO (Parte 9)

Tempos a considerar (hipótese): por etapa · parado · espera · execução · total · reincidência · variação · gargalos.
**Regra:** não criar métricas arbitrárias. Primeiro descobrir (em campo) quais tempos realmente importam — depois modelar.

---

## 10. MOTOR DE APRENDIZADO (Parte 10)

Exemplo hipotético: *"Instalação de calha: Medição → Corte → Montagem → Instalação. Observação: medições incompletas geraram retrabalho em 3 casos. Hipótese: a ausência de validação antes do corte aumenta retrabalho. Ação: adicionar confirmação de medida. Resultado: retrabalho caiu. Aprendizado: a validação pré-corte parece reduzir erros."* → alimenta o patrimônio cognitivo (ver P81).

---

## 11. OPERACIONAL + COGNITIVO (Parte 11)

Loop-alvo:

```
TRABALHO → EVENTO → OBSERVAÇÃO → HIPÓTESE → DECISÃO → AÇÃO → RESULTADO → APRENDIZADO → ALTERAÇÃO DO WORKFLOW
```

Mapeamento nas estruturas existentes (reuso, não duplicação):

| Passo do loop | Estrutura existente | Observação |
|---|---|---|
| TRABALHO | a criar (unidade operacional) | P80+ |
| EVENTO | `Event` + `cognitive-bus`/`event-publisher`/`event-store` | já persiste em `eventos` |
| OBSERVAÇÃO | `Hipotese`/evidência, `MemoriaCognitiva` | padrão P65/P77 |
| HIPÓTESE | `Hipotese` + epistemologia SABEMOS/ACREDITAMOS/INVESTIGANDO | existente |
| DECISÃO | `AcaoCognitiva` (Centro de Decisão) | existente |
| AÇÃO | `Tarefa`/`FeedbackAcao` | Tarefa existe; auto-criação futura |
| RESULTADO | `FeedbackAcao`/`Outcome` | existe |
| APRENDIZADO | `MemoriaCognitiva`/`ConhecimentoValidado` | existe |
| ALTERAÇÃO DO WORKFLOW | a criar (P80) | fechará o ciclo |

Se isto funcionar, a Ponte **executa → observa → aprende → melhora a execução**.

---

## 12. CORE vs BUSINESS (Parte 12)

Classificação por conceito (a usar como "carimbo" de cada proposta futura):

| Conceito | Classe | Justificativa |
|---|---|---|
| Workflow Engine (motor de fluxo) | **CORE** | serve qualquer domínio |
| Estados de etapa + motivo de espera | **CORE** | universal |
| Motor de próxima ação / bloqueios | **CORE** | universal |
| Fluxo "instalação de calha" | **TEMPLATE** (vertical) | configuração setorial |
| Fluxo "fabricação de portão" | **TEMPLATE** (vertical) | configuração setorial |
| Campos "medidas", "fotos", "material" | **CORE (Json)** | metadados universais (ADR-007) |
| Fluxo específico da Souza Mestrinho | **CONFIGURAÇÃO** | tenant |
| Painel do founder (métricas agregadas) | JÁ EXISTE (`operacao-founder.ts`) | não é operação do cliente |

**Não permitir particularidades no CORE.**

---

## 13. ARQUITETURA (Parte 13) — proposta E crítica

**Proposta do programa (a questionar):**

```
PONTE CORE (Context, Memory, Event, Insight, Decision, Reflection, Evolution, Workflow, Learning Engines)
  → DOMÍNIOS (Business OS, Personal OS, futuros)
  → TEMPLATES (Serralheria, Calhas, Barbearia, Lavação, Oficina, …)
  → CONFIGURAÇÃO (empresa específica)
```

**Crítica honesta:**
- Separar "Business OS" de "Personal OS" como domínio distinto no CORE é **abstração prematura**: não existe um segundo domínio validado. Manter o CORE fino e deixar "domínio" implícito até a evidência (2ª vertical ou uso pessoal).
- Engines "Context/Memory/Insight/Decision/Reflection/Evolution" já existem espalhadas no código (`memoria-evolutiva-engine`, `conselheiro-engine`, `motor-continuacao`, `motor-descobertas`, `centro-cognitivo-engine`, `cognitive-memory-engine`). A arquitetura **não** deve criar novos arquivos-engine "de fachada" — deve conectar os existentes ao novo Workflow/Evento.
- Proposta alternativa recomendada (mais enxuta): **CORE fino** (Workflow Engine novo, único) + **reuso de Event e Memória existentes** + **Template como dados** + **Configuração como tenant**. Nada mais.

---

## 14. COMPATIBILIDADE COM O EXISTENTE (Parte 14) — matriz real

Fonte: inventário de código (arquivos verificados). Legenda: **REUTILIZAR** · **ADAPTAR** · **SUBSTITUIR FUTURAMENTE** · **NÃO TOCAR**.

| Componente | Classificação | Base real |
|---|---|---|
| Event/EventSubscription/DeadLetter | **REUTILIZAR** (ADAPTAR o "gap") | `cognitive-bus`, `event-publisher`, `event-store` (grava `eventos`); `event_subscriptions`/`dead_letters` existem mas **sem escrita executante hoje** → completar, não duplicar |
| Implantacao/EtapaImplantacao | **REUTILIZAR como padrão** | `implantacao.service.ts` + API `/api/implantacoes/*` — base do Workflow (generalização) |
| Cliente / Lead | **REUTILIZAR** | `cliente.service.ts`, `lead.service.ts` + APIs — a OS referenciará `clienteId` |
| Tarefa | **REUTILIZAR/ADAPTAR** | `tarefa.service.ts` — base para ações futuras de OS; hoje nada cria Tarefa automaticamente |
| Historico | **REUTILIZAR** | `historico.service.ts` — registrar eventos de OS no histórico do cliente |
| Transacao | **REUTILIZAR** | `transacao.service.ts` — financeiro operacional futuro |
| Centro de Decisão (`AcaoCognitiva`) | **REUTILIZAR** | `decision-engine`, `action-intelligence-engine`, `conselheiro-engine` — decisões operacionais podem nascer aqui |
| Conselheiro (P66) | **NÃO TOCAR** | foco conversa |
| Motor de Continuação (P69.5) | **ADAPTAR futuramente** | `motor-continuacao.ts` — abrir conversa sobre operação quando houver dado |
| Memória Evolutiva (P65) | **REUTILIZAR** | `memoria-evolutiva-engine` — painel "Operação" de `obterMemoriaViva` já existe |
| Motor de Descobertas (P77/P78) | **REUTILIZAR** | `motor-descobertas.ts` — descobertas operacionais entram na mesma `MemoriaCognitiva` |
| Hipóteses | **REUTILIZAR** | `cognitive-memory-engine`, `hipoteses-estrategicas` |
| Espelho Empresarial/Retrato (P72/73/77) | **NÃO TOCAR** | conversacional |
| P74/P77/P78 (fala/descoberta/ritmo) | **NÃO TOCAR** | no ar |
| Atlas | **⚠️ NÃO ENCONTRADO** | não existe no repositório — lacuna a investigar (não inventar) |

Regra: **não reescrever algo que já resolve o problema.**

---

## 15. MIGRAÇÃO (Parte 15) — fases 0–8 com gates

| Fase | Objetivo | Critério de ENTRADA | Critério de SAÍDA |
|---|---|---|---|
| 0 — Observação | registrar o trabalho real | — (início) | `REGISTRO_CAMPO` completo e aceito + pergunta-âncora respondida |
| 1 — Modelo conceitual | unidade operacional + fluxo | Fase 0 completa | modelo validado com 2+ fluxos reais (OBSERVADO, não inferido) |
| 2 — Interfaces | contratos (Workflow/Etapa/Evento) | Fase 1 aprovada | API/engines desenhadas sem migration |
| 3 — Primeiro workflow | 1 fluxo vertical configurável | Fase 2 | recorte do piloto operando com dados reais de entrada |
| 4 — Eventos | eventos operacionais no `Event` | Fase 3 | eventos gravados + 1 subscriber |
| 5 — Bloqueios | paradas + motivos | Fase 4 | bloqueio detectado sem alerta-spam (intervenção por contexto) |
| 6 — Próxima ação | "o que precisa acontecer" | Fase 5 | 1 recomendação de próxima ação validada pelo usuário |
| 7 — Aprendizado | ciclo completo (P81) | Fase 6 | 1 aprendizado registrado e revertido em workflow |
| 8 — Templates verticais | 2ª vertical | Fase 7 + generalização | template reutilizado fora da serralheria |

**Regra:** nenhuma migration sem necessidade; cada fase preserva compatibilidade; nada é "segunda arquitetura".

---

## 16. TESTE DE GENERALIZAÇÃO (Parte 16) — rodado mentalmente

Aplicar o recorte "OS configurável por workflow" a: barbearia · lavação · oficina · clínica · empresa de instalação · projeto pessoal.

| Pergunta | Resultado do teste |
|---|---|
| O que permanece igual | Workflow + etapas + estado + responsável + parada/motivo + próximo passo |
| O que muda | Nomes de etapas, campos, duração, templates |
| O que deveria ser configuração | Etapas, campos, checklists, regras de avanço |
| O que deveria ser template | Fluxos por setor (calha, corte de cabelo, lavagem, reparo) |
| O que NÃO deveria existir no CORE | Medidas/material/obra (serralheria); veículo (lavação); equipamento (assistência) — tudo `Json` |

**Conclusão:** o modelo "workflow configurável universal + metadados Json + templates" sobrevive à generalização. Qualquer conceito serralheria hard-coded quebraria fora da Souza — por isso o CORE fica limpo (Parte 12/13).

---

## 17. EXPERIÊNCIA (Parte 17)

Princípios (herdados de P70–P78):
- **Nunca** "Você tem 8 tarefas pendentes."
- Sim: *"Percebi que três trabalhos estão parados pelo mesmo motivo: falta de confirmação antes da execução."*
- Sim: *"Nas últimas instalações, o retrabalho aparece principalmente quando a medida é confirmada depois do corte. Vale observar antes do próximo serviço."* → **operação + memória + evidência + hipótese**, no tom de conselheiro, não de ERP.

---

## 18. O QUE NÃO FAZER (Parte 18)

- ERP · Kanban genérico · dashboard de gráficos · dezenas de filtros · ranking de funcionários · gamificação · IA generativa inventando recomendações · scores arbitrários · módulos da Souza Mestrinho · workflows em `if/else` · abstrações prematuras.

---

## 19. CRITÉRIO DE QUALIDADE — 5 TESTES (Parte 19) — avaliação atual

| Teste | Pergunta | Estado HOJE |
|---|---|---|
| 1. Realidade | Representa o trabalho real? | ❌ **INDEFINIDO** (sem registro de campo) |
| 2. Simplicidade | O empresário entende? | ❌ INDEFINIDO |
| 3. Generalização | Funciona fora da 1ª empresa? | ⚠️ hipótese plausível, não comprovada |
| 4. Inteligência | Aprende com o processo? | ❌ depende das fases 4–7 |
| 5. Patrimônio | Cada execução melhora o conhecimento? | ❌ depende do ciclo P81 |

**Regra:** falhou em qualquer teste → não implementar ainda. Hoje falha (indefinido) em 4/5. **Não implementar.**

---

## 20. ENTREGÁVEIS (Parte 20)

- `P80_MOTOR_WORKFLOW.md` (este, conceitual)
- `P81_APRENDIZADO_OPERACIONAL.md` (conceitual — ver adjacente)
- `REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md` (mecanismo de captura — criado)
- `CURRENT_PRODUCT.md`, `CHANGELOG_OFICIAL.md`, `KNOWN_ISSUES.md` (status atualizado)
- Nenhuma alteração de código/arquitetura (gate não liberado).

---

## 21. IMPLEMENTAÇÃO (Parte 21) — DECISÃO

> **PARE. Evidência insuficiente.** O mecanismo de recepção está pronto; o template de campo aguarda uma visita real. Quando o `REGISTRO_CAMPO` for preenchido e aceito, o P80 poderá abrir na Fase 1 (modelo conceitual) — ainda sem código — e só depois Fase 2+.

---

## 22. PERGUNTA FUNDAMENTAL (Parte 22) — resposta

> Estamos construindo um sistema que **administra tarefas**?

> ou

> Estamos construindo um sistema que **compreende como o trabalho acontece e aprende a fazê-lo melhor**?

**Resposta honesta:** a **direção estratégica** é a segunda. **Mas ela só pode ser afirmada quando arquitetura + evidência sustentarem** — hoje não sustentam (sem dado de campo; arquitetura em hipótese). Portanto: **direção = compreender e aprender; afirmação = ainda não; prova = pendente de observação real.**

---

## REGRA FINAL

Não quero velocidade, quero fundação. O motor operacional conecta o CORE cognitivo ao mundo real do trabalho. Para proteger isso:
**não transforme observação em código; não transforme hipótese em arquitetura definitiva; não transforme uma empresa em regra universal.** Primeiro compreenda. Depois modele. Depois generalize. Depois implemente. E somente então escale.