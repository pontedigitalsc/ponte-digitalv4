# Arquitetura Conceitual — Copiloto Operacional

> **Rodada:** PONTE OPERACIONAL — evolução da descoberta operacional (P92) para o Copiloto
> Operacional.
> **Status:** DESENHO CONCEITUAL (documentação + motor puro determinístico + testes). Sem
> migration, sem OS/Workflow codificado, sem inventar operação da Souza Mestrinho.
> **Decisões desta rodada (aprovadas pelo usuário):** (1) nome canônico da empresa =
> **Souza Mestrinho Metais** (variação "Mestre Metais" descartada); (2) implementação mínima =
> **motor puro + testes**.
> **Referências respeitadas:** ADR-035 (CORE × vertical), P79/P80/P81/P82 (bloqueio de campo),
> P92 (caderno de descoberta em produção), 09-ARCHITECTURE/MODELO_DE_INTERVENCAO (7 níveis),
> MODELO_DE_ESTADOS, MODELO_DE_OBSERVAÇÃO_CONTÍNUA, MEMÓRIA_OPERACIONAL, APRENDIZADO, EVOLUÇÃO.

---

## 0. O que esta rodada entrega e o que NÃO entrega

### Entrega

1. **Diagnóstico da arquitetura atual** (seção 1).
2. **Arquitetura conceitual do Copiloto Operacional** (seção 2): a Ponte que acompanha a
   operação a partir de sinais, em vez de exigir alimentação de formulários.
3. **Mapa de eventos e estados** (seção 3).
4. **Modelo de entradas e relações** (seção 4) — princípio "uma vez informado, muitas vezes
   utilizado".
5. **Modelo de carga cognitiva** (seção 5).
6. **Modelo de gargalos e atritos** (seção 6).
7. **Modelo de perguntas contextuais** (seção 7).
8. **Hierarquia de intervenção da Ponte** (seção 8) — Nível 0–4, alinhada aos 7 níveis já
   existentes.
9. **Modelo de memória operacional** (seção 9).
10. **Modelo descoberta → validação → implementação → observação** (seção 10).
11. **Modelo de empresa pioneira** (seção 11).
12. **Modelo conceitual de dados** (seção 12) — o que já existe, o que reutiliza, o que fica
    adiado.
13. **Mapa de integração com o sistema atual** (seção 13).
14. **Implementação mínima desta rodada** (seção 14): motor puro `copiloto-operacional.ts` +
    testes.
15. **Testes e auditoria** (seção 15).
16. **Guia para a próxima etapa** (seção 16).
17. **Material para a primeira reunião com a Souza Mestrinho** → arquivo separado
    `docs/05-OPERATIONS/P79/KIT_REUNIAO_SOUZA_MESTRINHO.md`.

### NÃO entrega (guardrails ativos)

- ❌ Nenhuma tabela nova, migration, rota, tela ou componente novo.
- ❌ Nenhuma regra/estado/evento da operação da Souza Mestrinho inventado (P80/P82: campo
  bloqueado — OBSERVADO = ∅).
- ❌ Nenhuma IA. Nada de `OrdemServico`/`Workflow`/`Orcamento` codificado.
- ❌ Nenhuma mudança silenciosa em funcionalidades existentes.

> **Por que não migra os modelos operacionais ainda:** o P80/P81/P82 declaram o gate — nada de
> OS/Workflow antes de `REGISTRO_CAMPO` real. Esta rodada constrói a **estrutura** para a
> Ponte descobrir corretamente; a empresa ainda não confirmou nada.

---

## 1. Diagnóstico da arquitetura atual (auditado no código)

### 1.1 O que a P92 já entrega (em produção)

- **Engine pura** `src/engine/descoberta-operacional.ts`: `PERGUNTA_ANCORA` (P82), 8 estados
  com `TRANSICOES_STATUS_DIAGNOSTICO`, taxonomia 7 tipos com `exigeVerificacao`, confiança
  ALTA/MEDIA/BAIXA, papéis PROPRIETARIO/GESTAO/OPERACAO, 9 categorias de oportunidade,
  `TEMPLATE_SERRALHERIA` (ADR-035), `calcularProgressoDescoberta`, `montarRelatorioDescoberta`
  (12 seções).
- **11 modelos** nível plataforma: `CategoriaOperacional`, `DiagnosticoOperacional`,
  `DiagnosticoOperacionalHistorico`, `ParticipanteDescoberta`, `PerguntaDescoberta`,
  `RespostaDescoberta`, `RegistroDescoberta`, `ProcessoDescoberta`, `ProcessoDesejadoDescoberta`,
  `DivergenciaDescoberta`, `OportunidadeDescoberta`.
- **15 rotas API** com `requirePlataforma`, páginas `/admin/descoberta` e `/admin/descoberta/[id]`.

### 1.2 O que a plataforma já tem de reutilizável (verificado)

| Recurso | Onde | Uso no Copiloto |
|---|---|---|
| Event Engine (publicar+persistir+sinscrever) | `cognitive-bus`, `event-catalog`, `event-publisher`, `event-store`, `EventSubscription`, `DeadLetter` | Base para **evento operacional** (o catálogo precisa de eventos de operação — ver §3) |
| Sinais (em memória) | `clientes.sinais`, `tarefas.sinais`, `financeiro.sinais` | Referência de padrão; `HistoricoSinal`/`DecisaoSinal` existem no schema mas **órfãos de escrita** |
| Workflow+Etapa (padrão) | `Implantacao`/`EtapaImplantacao` | Modelo a **generalizar**, nunca duplicar |
| CRUD operacional | `Cliente`, `Lead`, `Contato`, `Tarefa`, `Historico`, `Transacao` | Entradas/saídas; reutilizar em OS futura |
| Memória decisionária | `AcaoCognitiva`, `MemoriaCognitiva`, `Hipotese`, `FeedbackAcao`, `PerguntaViva` | Loop descoberta→decisão→resultado |
| Intervenção (conceito) | `09-ARCHITECTURE/MODELO_DE_INTERVENCAO.md` (7 níveis: 0 NADA … 6 ACOMPANHAMENTO) | A hierarquia Nv 0–4 desta rodada **é um recorte operacional** sobre esses 7 níveis (§8) |
| Estados/Observação/Aprendizado/Evolução | `MODELO_DE_ESTADOS.md`, `MODELO_DE_OBSERVACAO_CONTINUA.md`, `MODELO_DE_APRENDIZADO.md`, `MODELO_DE_EVOLUCAO.md`, `ARQUITETURA_DA_MEMORIA_OPERACIONAL.md` | Referências conceituais (não duplicar) |

### 1.3 Lacunas reais (o que falta para o Copiloto)

1. **Eventos operacionais** não existem no catálogo (`EVENTOS_NEGOCIO` é cognitivo/comercial;
   nada de `MEDIDA_REGISTRADA`, `ORCAMENTO_ENVIADO`, `PRODUCAO_LIBERADA`...). §3 propõe o mapa.
2. **Estado do trabalho** (em que estado está o serviço agora, o que falta, quem é responsável,
   qual o próximo passo) não é uma consulta existente. §2/§4 modelam o conceito e o motor
   (P92 → contexto) já responde a partir do registrado.
3. **Carga cognitiva / atrito / trabalho invisível** não são medidos. §5/§6 definem o modelo.
4. **Perguntas contextuais** existem como noção (pergunta viva P77/relação), mas não ligadas ao
   estado operacional. §7.
5. **Visão do gerente** (uma tela que responde "o que está acontecendo agora") não existe. O
   motor desta rodada já a produz em texto puro.
6. `HistoricoSinal`/`DeadLetterProcessor` são órfãos no código.

---

## 2. Arquitetura conceitual do Copiloto Operacional

### 2.1 O que muda no paradigma

```
ANTES (sistema tradicional):  Pessoa trabalha → abre o sistema → preenche → salva → volta.
DEPOIS (Copiloto):            Pessoa trabalha → registra naturalmente o que já precisava
                              registrar → Ponte conecta sinais → mantém o processo →
                              aponta o próximo passo → só pergunta quando necessário.
```

### 2.2 O pipeline do Copiloto (entender → estruturar → validar → conectar → automatizar →
observar → melhorar)

```
SINAIS ──▶ CONTEXTO ──▶ ESTADO ──▶ INTERVENÇÃO ──▶ AÇÃO ──▶ RESULTADO ──▶ APRENDIZADO
  │            │           │              │            │           │            │
 (P92:      (conecta    (em que     (Nv 0–4,    (auto ou    (registra   (reverte em
  registros, info já     estado      §8)         confirmada  o que      template/kit,
  falas,      registrada, está o                  pelo        aconteceu  nunca em
  divergên-   nunca pede   trabalho?)             gerente)               regra dura)
  cias)       de novo)
```

### 2.3 Princípios-guia (do briefing)

1. **Informação entra uma vez, e a Ponte cria as relações** — nunca pedir a mesma coisa em 5
   lugares. Antes de criar campo: "essa informação já existe em outro momento da operação?".
2. **Não confundir automatização com inteligência** — primeiro estrutura sólida; regras
   críticas são rastreáveis, determinísticas, validáveis, reversíveis. IA = interface, não cérebro.
3. **A unidade fundamental é o evento operacional**, não o formulário.
4. **Perguntar só por necessidade operacional** (contexto), nunca por formulário vazio.
5. **A experiência humana não é substituída** — a Ponte distingue informação / regra /
   sugestão / decisão / julgamento profissional.
6. **Separar 5 realidades:** REALIDADE / PROBLEMA / HIPÓTESE / DECISÃO / RESULTADO — nunca
   misturar "como fazemos" com "como gostaríamos de fazer".

### 2.4 O Copiloto por camadas (mapeado para o que existe)

| Camada conceitual | Peça que implementa (hoje/adiada) |
|---|---|
| Coleta (sinais crus) | P92 (registros, falas, divergências) + Event Engine (adiado) |
| Contexto (conectar) | **motor `copiloto-operacional.ts`** (NESTA rodada) |
| Estado do trabalho | motor (derivado do registrado) + futura OS (bloqueada) |
| Intervenção (Nv 0–4) | **motor** (regras determinísticas) |
| Memória | `MemoriaCognitiva`/`AcaoCognitiva`/`Hipotese` (existentes) |
| Aprendizado | P81 (+ caderno de campo) |
| Evolução | `MODELO_DE_EVOLUCAO.md` + ciclo §10 |

---

## 3. Mapa de eventos e estados

### 3.1 Eventos operacionais (propostos; NÃO emitidos ainda — esperam campo)

Reutiliza o Event Engine existente (`event-catalog` + `event-publisher` + `event-store`).
Cada evento é um **fato de negócio** (ADR-011/012), com `eventType`, `aggregateId`
(quando a OS existir), `tenantId`, `payload` (apenas o mínimo que a operação já produzia),
`occurredAt`. A regra: **o evento só existe se a informação já nasce naturalmente na operação**
(uma medida registrada, um orçamento enviado) — nada de evento inventado para "alimentar o sistema".

Mapa de eventos por fase do ciclo da demanda (hipótese de investigação, NÃO regra):

```
ENTRADA        cliente-entrou · pedido-recebido · visita-marcada · visita-realizada
PROJETO        medida-registrada · desenho-aprovado
COMERCIAL      orcamento-iniciado · orcamento-enviado · orcamento-aprovado · sinal-recebido
SUPRIMENTOS    material-solicitado · material-recebido
PRODUÇÃO       producao-liberada · producao-iniciada · producao-concluida · acabamento-iniciado · acabamento-concluido
ENTREGA        instalacao-agendada · instalacao-realizada · entrega-concluida
FINANCEIRO     pagamento-recebido · cobrança-registrada
EXCEÇÃO        problema-identificado · retrabalho-aberto · exceção-registrada (regra normal × exceção separadas)
CICLO          servico-concluido · aprendizado-registrado
```

> ⚠️ **Efeito do evento:** cada evento pode mudar o **estado do trabalho** e gerar próximo
> passo. A lista acima é **mapa de investigação** — será validada/corrigida/reduzida com a
> reunião da Souza Mestrinho. Nenhum evento é emitido nesta rodada.

### 3.2 Estados do trabalho (conceito, derivado pela Ponte)

Para respondermos "em que estado está esse trabalho agora?", o Copiloto usa um **estado
derivado** (não confundir com status de formulário): cada item do catalogo de eventos gera um
estado com:

```
estado atual · responsável · dependência (o que falta) · próximo passo · há quanto tempo parado
motivo da espera (material / cliente / decisão / retrabalho / fluxo anterior) · risco (a validar)
```

Estados de serviço (hipótese, esperam campo): `E0 no_recebido` → `E1 medida` → `E2 orcamento`
→ `E3 aprovado` → `E4 material` → `E5 producao` → `E6 acabamento` → `E7 instalacao` →
`E8 concluido`. Cada um com `motivoEspera` (o "motor de bloqueios" do P80) e **nunca** inferido
sem dado (se não há dado → `EM_BRANCO`/não sabemos).

Modos de parada (só quando observados): `parado_por_cliente`, `parado_por_material`,
`parado_por_decisao`, `retrabalho`, `aguardando_agendamento`.

### 3.3 Instrumento que já existe hoje

O caderno P92 já captura processos, etapas, dependências, divergências e oportunidades de uma
empresa. O **motor desta rodada** consome esse caderno e devolve o **contexto do gerente** e o
**nível de intervenção** — o primeiro passo do "estado do trabalho" sem bancar a OS futura.

---

## 4. Modelo de entradas e relações ("uma vez informado, muitas vezes utilizado")

### 4.1 Regra de ouro

Toda informação tem **um único ponto de nascimento** e múltiplos consumidores derivados.

```
Exemplo (da tese P79): "Portão 3,20 m × 2,40 m" nasce UMA vez (medida registrada)
  → projeto · orçamento · metragem · cálculo de materiais · produção · instalação ·
    documentação · histórico · indicadores
```

### 4.2 Tabela: fonte única por informação

| Informação | Nasce onde (único ponto) | Consumidores (derivados) | Reutilizado? |
|---|---|---|---|
| Cliente + contato | `Cliente`/`Lead`/`Contato` (existentes) | OS, orçamento, produção, financeiro, tarefas | ✅ já existe |
| Medida do serviço | registro de medida (campo futuro/evento) | orçamento, corte, material, instalação | 🔲 quando campo real validar |
| Itens/vals. orçamento | orçamento | OS, cobrança, indicador | 🔲 |
| Responsável/equipe | `Usuario`/`Tarefa.responsavelId` | OS, agenda | ✅ (reuso) |
| Descrição do trabalho/tipo | Tipo de Trabalho (config, ADR-035) | OS, produção | 🔲 |
| Ocorrência/exceção | exceção registrada no campo | retrabalho, alerta, aprendizado | 🔲 |

> **Guia de decisão:** se a informação já é produzida por um passo da operação, o Copiloto a
> consome de lá — **nunca duplica no cadastro**. Se não nasce em lugar nenhum e o sistema é
> quem precisaria, **não se cria campo** (regra da rodada): vira pergunta contextual ou
> registra-se "não sabemos".

---

## 5. Modelo de carga cognitiva

### 5.1 O que medir (por processo descoberto)

Para cada processo do caderno P92, o modelo avalia **oito dimensões de carga**:

| Dimensão | Pergunta | Origem no caderno P92 |
|---|---|---|
| Decisões | quantas decisões existem entre início e fim? | registros tipo `DECISAO`; divergências |
| Memória | quantas informações precisam ser lembradas? | registros `MEMORIA_HUMANA` e `CONHECIMENTO_CONHECIDO` |
| Digitação | quantas informações são digitadas? | (via campo/observação — a validar) |
| Repetição | quantas vezes uma informação é repetida? | divergências / ocorrências de retrabalho |
| Consulta | quantas pessoas precisam ser consultadas? | `processos.dependencias` (quem espera quem) |
| Ferramentas | quantas ferramentas/meios são usados? | `processos.ferramentas` (Json existente) |
| Exceções | quantas exceções existem? | divergências + retrabalhos (Json) |
| Intervenção do gerente | quantas vezes o gerente precisa intervir? | divergências / oportunidades / processos |

### 5.2 Índice de carga (conceitual, por processo)

```
carga(processo) = Σ (decisões, dependências, retrabalhos, divergências, ferramentas,
                    informação repetida, memória humana)  — pesos a calibrar com campo
classificação: BAIXA / MEDIA / ALTA / CRITICA
```

> O ponto da rodada NÃO é o número — é **onde a empresa gasta energia mental que a Ponte pode
> absorver**. Cada dimensão vira uma **oportunidade de intervenção** (Nv 0–4).

### 5.3 Trabalho invisível (modelo de captura)

Durante a descoberta, procurar e registrar (como registros P92 classificados) atividades que
não aparecem no fluxograma:

```
lembrar · conferir · procurar · perguntar · copiar · repetir · reconciliar · avisar ·
cobrar · acompanhar · atualizar · conferir novamente
```

No caderno, essas atividades entram como `registros` com tipo `OBSERVACAO`/`INFORMACAO_FORNECIDA`
ou em `divergencias` (dito × observado) — a taxonomia P92 já captura; o modelo de carga torna
isso **mensurável por processo**.

---

## 6. Modelo de gargalos e atritos

### 6.1 Cadeia de atrito (por gargalo)

```
Processo → Atrito → Causa → Consequência → Frequência → Impacto → Possível intervenção
```

### 6.2 Exemplo de preenchimento (hipótese didática da tese P79 — NÃO fato da empresa)

```
Medição
 → informação incompleta
 → produção começa sem dados suficientes
 → serviço precisa parar / retrabalho
 → atraso + custo
 → (frequência/impacto: a medir no campo)
 → validação antes da liberação
```

### 6.3 Como o caderno alimenta o modelo

- `ProcessoDescoberta.retrabalhos` (Json) → registro de atrito (consequência/recorrência).
- `DivergenciaDescoberta` (dito × observado) → causa de atrito.
- `OportunidadeDescoberta` × categoria (`GARGALO`, `RETRABALHO`, `ESPERA`, `DEPENDENCIA`,
  `INFORMACAO_FALTANTE`, `DECISAO_MANUAL`, `COMUNICACAO`, `MEMORIA_HUMANA`, `IA_FUTURA`)
  → possível intervenção candidata.

> O mapa de atrito NÃO vira regra automática de bloqueio. Ele orienta o **que perguntar** e o
> **onde medir** (Nv 2–3), até o campo confirmar.

---

## 7. Modelo de perguntas contextuais

### 7.1 Por que perguntar (só com necessidade operacional)

Três fatos-gatilho (derivados do caderno, nunca de formulário vazio):

| Gatilho | Exemplo real de pergunta (Ponte) |
|---|---|
| Faltou obrigatório p/ liberar etapa | "Falta confirmar X para liberar este serviço. Deseja resolver agora?" |
| Item parado | "Este orçamento está aguardando resposta. Marcar como aguardando cliente ou revisar?" |
| Inconsistência registrada | "Encontrei uma diferença entre a medida registrada na visita e a usada no orçamento. Quer revisar?" |

### 7.2 Classificação da pergunta

Cada pergunta contextual carrega: **por que surgiu** (registro/divergência/processo), **o que
faria a diferença** (resposta muda o estado), **nível de urgência**, **para quem** (dono /
gestão / operação).

### 7.3 Regras

- Máx. 3 perguntas/dia por diagnóstico (tomar base do MODELO_DE_INTERVENCAO Nv 2).
- Pergunta só quando houver `gatilho de contexto` — nunca por falta de dados do sistema.
- Se o condutor ignora, pergunta expira (não repertório).

---

## 8. Hierarquia de intervenção da Ponte (Nível 0–4)

### 8.1 Recorte operacional sobre os 7 níveis existentes

O `MODELO_DE_INTERVENCAO` já define 7 níveis (0 NADA … 6 ACOMPANHAMENTO). O briefing da rodada
pede uma escala **operacional** curta de 5 níveis. **Decisão:** manter os 7 níveis como fonte;
**mapear o recorte operacional de 5 níveis** para os 7 (evita duplicar o modelo):

| Nível operacional (briefing) | Mapeamento p/ 7 níveis (09-ARCHITECTURE) | Ação da Ponte |
|---|---|---|
| **Nv 0 — SILENCIOSA** | Nível 0 (NADA) | registra e organiza; não incomoda |
| **Nv 1 — AUTOMÁTICA** | Nível 4 (TAREFA) baixo-risco validada ou Nível 1 (ALERTA) | executa regra já validada (ex.: avança estado, gera checklist) |
| **Nv 2 — SUGESTÃO** | Nível 3 (RECOMENDAÇÃO) | "Parece pronto para a próxima etapa" — pergunta de confirmação leve |
| **Nv 3 — CONFIRMAÇÃO** | Nível 2 (PERGUNTA) / Nível 5 (PLANO) pré-aprovação | precisa de decisão humana: "Posso liberar a produção?" |
| **Nv 4 — ESCALADA** | Nível 1 (ALERTA) urgente / Nível 6 (ACOMPANHAMENTO) | problema relevante; responsável informado; acompanha |

### 8.2 Onde o motor classifica (regras determinísticas desta rodada)

O motor `copiloto-operacional.ts` produz, para cada diagnóstico/empresa, um **nível de
intervenção agregado** e uma lista de **motivos** (com base apenas no que está registrado):

| Condição (registrada) | Nível |
|---|---|
| Nada pendente + sem divergência aberta | Nv 0 — silenciosa |
| Processo com dependências/etapas preenchidas e mapeado → pronto p/ próximo passo | Nv 2 — sugestão |
| Divergência aberta entre dito × observado | Nv 3 — confirmação |
| Divergência com `questaoValidacao` pendente | Nv 3 — confirmação |
| Processo com retrabalho/risco registrado OU oportunidade VALIDADA não implementada | Nv 4 — escalada (responsável) |
| Oportunidade candidata (sem validação) | Nv 2 — sugestão |

> Nenhuma dessas regras é uma "verdade de mercado" — são **regras do caderno**: se o condutor
> gravou divergência, a Ponte precisa do condutor; se gravou retrabalho, o gerente precisa ser
> informado. Risco de escalada exige registro prévio (nunca suposição).

---

## 9. Modelo de memória operacional

### 9.1 O que a Ponte precisa responder (memória estruturada por empresa)

| Pergunta | Estrutura que responde (existente) |
|---|---|
| Como fazemos? | `ProcessoDescoberta` (etapas, entradas/saídas, ferramentas) |
| Quem faz? | `ParticipanteDescoberta` + `responsavel` dos processos |
| Por que assim? | registros `DECISAO` + divergências |
| Quando muda? | exceções/retrabalhos (Json) + divergências |
| Onde dói? | `OportunidadeDescoberta` categorizada (gargalos) |
| O que tentamos melhorar? | `ProcessoDesejadoDescoberta` (COMO PODERIA SER) |
| O que já mudou? | `DiagnosticoOperacionalHistorico` |
| Quem aprovou? | `validadoEm`/`validacao` dos desejados |

### 9.2 Camadas (reusa `ARQUITETURA_DA_MEMORIA_OPERACIONAL`)

Working → Short Term → Long Term → Archived (já especificado). O caderno P92 = memória **de
campo** (facts); `MemoriaCognitiva`/`AcaoCognitiva` = memória de **decisão/aprendizado**. Nada
novo a criar; apenas **ligar** campo → memória no ciclo §10.

---

## 10. Modelo descoberta → validação → implementação → observação

```
DESCOBRIR ─▶ VALIDAR ─▶ IMPLEMENTAR ─▶ OBSERVAR ─▶ AVALIAR ─▶ MELHORAR ─▶ VALIDAR NOVAMENTE
   │           │             │              │           │           │
 caderno     desenhos      oportunidades   sinais      resultado   ciclo §21
 P92         COMO PODERIA  VALIDADAS      (a observar) (a medir)   repete
             SER (P92)
```

- **Descoberta:** caderno P92 (participantes, falas, registros classificados, processos COMO É).
- **Validação:** desenhos COMO PODERIA SER + "Aprovar com o campo" (já em P92).
- **Implementação:** oportunidades VALIDADAS → plano (Nv 3/4; adiado até campo).
- **Observação/Avaliação/Melhorar:** sinais + aprendizado (P81) + ciclo cognitivo existente.
- **Sem reconstrução:** tudo tem histórico (`DiagnosticoOperacionalHistorico` + `Event`).

---

## 11. Modelo de empresa pioneira

Preservado do P92 (já implementado): `CategoriaOperacional.empresaPioneiraId` marca a primeira
empresa da categoria; a página de detalhe exibe "pioneira de categoria".

**Regras (não inventar promessas):** pioneira = quem ajuda a construir a primeira estrutura,
influencia prioridades, valida processos, participa da evolução, contribui com a base de
conhecimento do ramo e recebe reconhecimento pelo papel. **Separação obrigatória:**

```
Dados privados da empresa (tenant)  │  Conhecimento estrutural do ramo (template/vertical)
------------------------------------┼-----------------------------------------------
nunca compartilhados sem autorização │  aprendizado estrutural (ADR-035), anonimizado
```

Ainda NÃO se define que a Souza Mestrinho é pioneira formal — isso só após campo real e
decisão com o dono (promessa de pioneirismo exige participação real).

---

## 12. Modelo conceitual de dados (o que usar agora)

### 12.1 Já existe (reutilizar — nenhuma schema nova)

- Caderno P92 (11 modelos) — **a fonte de campo desta rodada**.
- Event Engine (`Event`, `EventSubscription`, `DeadLetter`) — futuro dos eventos operacionais.
- `Implantacao`/`EtapaImplantacao` — padrão de etapas.
- `Cliente/Lead/Contato/Tarefa/Historico/Transacao` — CRUD operacional.
- `AcaoCognitiva/MemoriaCognitiva/Hipotese/FeedbackAcao/PerguntaViva` — memória/decidir/evolução.

### 12.2 Fica adiado (aguardando campo real + gate P80/P81)

`TipoDeTrabalho`, `Workflow`, `OrdemServico`, `Demanda`, `Orcamento` (decisão model vs etapa),
`Agenda`, `Material`, `Ocorrencia/Bloqueio`, `Indicador/Gargalo` — **não criar nesta rodada**.

### 12.3 O que o motor usa (segundo agregado conceitual, sem schema novo)

```
DiagnosticoOperacional (status, empresa, âncora)
 ├─ ProcessoDescoberta (etapas, retrabalhos, dependencias, riscos, ferramentas)
 ├─ DivergenciaDescoberta (status, questaoValidacao)
 ├─ OportunidadeDescoberta (categoria, status)
 └─ ProcessoDesejadoDescoberta (status)
```

---

## 13. Mapa de integração com o sistema atual

| Componente | Integra com | Via |
|---|---|---|
| Motor `copiloto-operacional.ts` (novo) | Service `descoberta-operacional.service` | função pura recebe o agregado do detalhe (tipos `DetalheDto` afins) — sem tocar schema |
| Contexto do gerente (motor) | futuro `/admin/descoberta/[id]` (bloco "Visão do gerente") | consumir a função pura no server component — adiado (UI já existe; motor entregue) |
| Nível de intervenção (motor) | histórico do diagnóstico + auditoria existente | merece rotas futuras; NÃO implementado nesta rodada |
| Eventos operacionais | `event-catalog`/`event-publisher` | catálogo novo com prefixo `operacional.*` — adiado até campo |
| Sinais usados no dashboard | `gerarSinais*` | reutilizar padrão; `HistoricoSinal` segue órfão (fora de escopo) |

> **Nenhum arquivo existente é modificado nesta rodada** (motor é arquivo novo + testes).

---

## 14. Implementação mínima desta rodada

`src/engine/copiloto-operacional.ts` — **módulo puro, determinístico, sem banco** (+ testes em
`copiloto-operacional.test.ts`). Funções:

1. `classificarNivelIntervencao(input)` → `Nv 0..4` + motivos (regras §8.2), consumindo apenas
   o registrado no caderno.
2. `montarContextoOperacional(detalhe)` → texto puro "Visão do gerente" (Hoje · Decisão
   necessária · Atenção · Próximos eventos) — a resposta às perguntas do critério de sucesso
   ("O que aconteceu? Em que estado está? Quem é responsável? O que falta? Próximo passo?
   Risco? Decisão pendente? Exceção?").
3. `avaliarCargaCognitivaPorProcesso(processo)` → 8 dimensões (§5) com nível BAIXA/MEDIA/ALTA
   por dimensão e classificação geral.
4. `montarMapaDeAtrito(diagnostico)` → cada `ProcessoDescoberta`/`DivergenciaDescoberta`/
   `OportunidadeDescoberta` vira uma linha `Processo → Atrito → Causa → Consequência →
   Frequência? → Impacto? → Intervenção`. Frequência/impacto sem dado → "não sabemos" (nunca
   inventar).
5. `proximasPerguntasContextuais(input)` → até 3 perguntas derivadas de gatilhos reais
   (divergência aberta, processo com retrabalho, oportunidade candidata), sem "campo vazio".

Sem migration. Sem rota/UI. Sem inventar exceção/regra de mercado. Testes cobrem os 5 itens.

---

## 15. Testes e auditoria

- Testes do motor: cobrem classificação de nível (5 regras), contexto do gerente (não inventa
  lacuna), carga cognitiva (8 dimensões), mapa de atrito (não preenche frequência sem dado),
  perguntas contextuais (limite 3, só com gatilho).
- Regressão: rodar `descoberta-operacional.test.ts`, `test:plataforma`, `test:handoff` +
  `tsc --noEmit` + `npm run build`.
- Nada da P80/P81/P82 é liberado — continua bloqueado até campo real.

---

## 16. Guia para a próxima etapa

1. **Reunião Souza Mestrinho** (laboratório): usar `KIT_REUNIAO_SOUZA_MESTRINHO.md`, alimentar
   o caderno P92 na própria visita (âncora, participantes, falas, registros, processos).
2. **Pós-campo:** aplicar `REGISTRO_CAMPO_SOUZA_MESTRINHO_<data>.md` (template P79) e converter
   `OBSERVADO/DITO/INFERIDO` em hipóteses classificadas CORE/Vertical/Config.
3. **Gate P83/P80:** só com registro real respondendo âncora + ≥2 fluxos reais + ≥3 problemas
   classificados, abrir unidade operacional e OS conceitual.
4. **Eventos operacionais:** preencher o catálogo `operacional.*` somente com fatos que a
   operação já produz.
5. **UI do Copiloto:** quando o campo validar, ligar o motor ao server component do detalhe
   (bloco "Visão do gerente" + nível de intervenção).

---

## 17. Conflitos e decisões registradas

- **Nomenclatura:** prompt citou "Mestre Metais"; empresa canônica nos documentos/milestones/
  código = **Souza Mestrinho Metais**. Decidido com o usuário → manter Souza Mestrinho; registrar
  a divergência em `KNOWN_ISSUES.md`.
- **Hierarquia de intervenção:** a escala Nv 0–4 é recorte dos 7 níveis existentes
  (MODELO_DE_INTERVENCAO) — nada de modelo paralelo.
- **Não-duplicação:** eventos operacionais reusam Event Engine; estados do trabalho são
  derivados (não nova tabela); carga/atrito são computados (não novos campos).