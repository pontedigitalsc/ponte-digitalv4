# P82 — O CAMPO REAL

**Status:** INICIADO E BLOQUEADO — aguardando registro real de campo. Zero código, zero workflow, zero banco, zero tela, zero API, zero unidade operacional escolhida.
**Método obrigatório:** `docs/05-OPERATIONS/P26/PROTOCOLO_DA_OBSERVACAO_REAL.md` (padrão científico da Ponte: FATO × INTERPRETAÇÃO, validade, viés, ciclo de maturação).
**Captura:** `docs/05-OPERATIONS/P79/REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md`.

---

## 1. MISSÃO

Observar uma operação real (Souza Mestrinho Metais) e transformar essa experiência em **conhecimento operacional confiável** — descobrir a menor unidade de trabalho que, se acompanhada perfeitamente, gera valor real, e onde o trabalho perde energia. **Não inventar o funcionamento da empresa.** A regra fundamental:

> A Ponte não deve inventar o funcionamento de uma empresa para depois encaixá-lo no software. Primeiro observa o trabalho real. Depois descobre o padrão. Só então constrói o motor.

## 2. CONTEXTO DOS PROGRAMAS ANTERIORES (referência preservada)

Terminologia/patrimônio da Ponte que o P82 respeita (não substituir por interpretação genérica):
- **P65** Memória Empresarial Viva (painéis de evolução por resposta real).
- **P66** Conselheiro Empresarial · **P68** Ciclo de Decisão (`AcaoCognitiva`).
- **P69/P69.5** Presença Cognitiva Permanente (`motor-continuacao`) · **P70/P71/P74** conversa que parece humana (determinístico).
- **P72/P73** Espelho Empresarial + Experiência da Descoberta (`retrato-estrategico`).
- **P76/P76.5** Experiência Inesquecível / Regra dos 5 Minutos.
- **P77** Motor das Descobertas (`motor-descobertas`, `MemoriaCognitiva` tipo `descoberta`).
- **P78** A Ponte que Acompanha (ritmo 12s, pergunta viva, ciclo cognitivo).
- **P79/P80/P81** Tese + domínio + workflow conceitual + aprendizado operacional (documentação; **nenhum código**).
- **P26** (`PROTOCOLO_DA_OBSERVACAO_REAL.md`) — o padrão científico de observação já existente, que é o método aplicado aqui.

## 3. EVIDÊNCIAS ENCONTRADAS

Inventário rigoroso do que existe no repositório (não confundir documentação com evidência):
- **Fato verificado em código (P80/P81):** o Event Engine publica e grava `eventos`; o padrão de etapas existe em `Implantacao`/`EtapaImplantacao`; CRUD de `Cliente/Lead/Tarefa/Historico/Transacao`; `AcaoCognitiva`/`MemoriaCognitiva`/`Hipotese` prontos. **Isto é arquitetura, não operação observada.**
- **Fato verificado em busca (P82):** não existe **nenhum `REGISTRO_CAMPO` preenchido**, nenhuma planilha (xlsx/csv), nenhuma anotação bruta da operação da Souza Mestrinho no repositório.
- **Documentação existente = hipótese estruturada (P79–P81), NÃO evidência de campo.**

## 4. OBSERVADO

**Conjunto vazio — nenhuma observação de campo registrada.** Nenhum fato presencial com data/hora/contexto conforme P26.
> Não confundir com os exemplos didáticos do programa (ex.: "o funcionário interrompeu para confirmar medida") — são ilustrações de categorias, **não** fatos observados.

## 5. DITO

Única fonte de afirmação disponível (declarações no enunciado do programa P79, **não verificadas por observação**):
- [DITO P79-f1] Empresa de serralheria/metais em Palhoça, ~8 funcionários.
- [DITO P79-f2] Trabalha com produtos e serviços de ferro **e** calhas, rufos, condutores, instalações e trabalhos sob medida.
- [DITO P79-f3] "Atualmente existe dependência de `Excel`" (palavra do contexto; **não validado** o que exatamente está em planilha).

> Declarações do enunciado P79 (ditas pelo fundador); **corretamente classificadas como DITO, não fato operacional**.

## 6. INFERIDO

Hipóteses derivadas de DITO/arquitetura (NUNCA tratadas como fato):
- [INFERIDO-1] Sendo malha de serviços sob medida, **provavelmente** haverá fluxo `cliente → orçamento → execução (medição/fabricação/instalação) → entrega` — **inspirado na tese P79; não observado.**
- [INFERIDO-2] `Medição` provavelmente é etapa crítica com dependência de uma pessoa (e retrabalho) — **categoria de investigação**, sem evidência.

## 7. NÃO SABEMOS (o que falta)

1. Unidade operacional de fato (o objeto com que os funcionários se referem ao trabalho: "o portão"? "a OS"? "o serviço"?).
2. Fluxo real (quem faz o quê em qual ordem; entradas/saídas).
3. Resposta da pergunta-âncora na voz do dono.
4. Dependências ("quem pergunta para quem todos os dias").
5. Estados reais de parada e seus motivos.
6. Tempos que importam (onde medir; parado vs executando).
7. Comunicação (WhatsApp / papel / cabeça / sistema) e o que vive em cada meio.
8. Decisões atuais: quem decide, com qual informação, se ficam registradas.
9. Retrabalho real (onde e por quê).
10. Diferença entre processo descrito (dito) × executado (observado) — P26 §"viés / 5s".
11. O que a informação "ninguém consegue responder rápido".

## 8. FLUXO REAL OBSERVADO

**Nenhum.** Não há fluxo observado. Hipóteses de fluxo (NÃO evidenciadas):
- Skeleton de investigação (o mapa provisório a validar/corrigir — **hipótese, não modelo**):

```
TRABALHO → ENTRADA → AÇÃO → DECISÃO → DEPENDÊNCIA → BLOQUEIO → SAÍDA
```

- Fluxo-hipótese da tese (do P79/P80: `Cliente → Demanda → Orçamento → OS → Produção → Instalação → Conclusão`) — **NÃO confundir com fluxo observado.**

## 9. UNIDADE OPERACIONAL CANDIDATA

**Nenhuma escolhida** (proibido escolher antes). Candidatos em aberto: ordem de serviço · obra · instalação · peça · orçamento · solicitação · etapa · demanda · serviço · outro. Se a realidade não permitir concluir: "Ainda não sabemos."

## 10. DEPENDÊNCIAS

**Não há observação.** Categorias de investigação (não dados): quem espera quem · que informação depende de outra pessoa · que atividade só começa após outra. Preencher via template §4.

## 11. BLOQUEIOS

**Não há observação.** Categorias: onde para · por quê · quanto tempo · recorrência · trabalho que volta de etapa · decisão aberta. Via template §1/§3.

## 12. DECISÕES

**Não há observação.** Categorias: quem decide · com o quê · quando · fica registrada? · delegável? · esquecível?

## 13. PERDAS DE ENERGIA OPERACIONAL

**Não há evidência de nenhuma.** Categorias de investigação (§4 do programa): espera · retrabalho · informação faltante · dependência de uma pessoa · decisão manual · aprovação · deslocamento · comunicação · esquecimento · perda de contexto · mudança de prioridade · falta de material/informação · conflito entre etapas · trabalho parado · trabalho que volta de etapa · decisões abertas · atividades que dependem de memória humana.

## 14. PERGUNTA-ÂNCORA

> **"Qual é a única bagunça que, se a gente eliminasse primeiro, faria o restante do trabalho ficar mais fácil?"**

## 15. RESPOSTA À PERGUNTA-ÂNCORA

> **NÃO SABEMOS.** Não há resposta dada por alguém da operação em nenhum registro.

## 16. EVIDÊNCIAS QUE SUSTENTAM A RESPOSTA

Nenhuma (não há resposta a sustentar).

## 17. EVIDÊNCIAS QUE CONTRADIZEM

Nenhuma.

## 18. PADRÕES UNIVERSAIS

**Nenhum derivado de campo.** Apenas hipóteses conceituais (da tese P79, não evidenciadas): o "ciclo da transformação da demanda" seria universal **se confirmado** — aguardando.

## 19. PADRÕES VERTICAIS

**Nenhum derivado de campo.** Hipóteses conceituais: "Fabricação & Instalação" (medida → material → instalação) — aguardando.

## 20. PARTICULARIDADES DA EMPRESA

**Nenhuma derivada de campo.** Ex.: trabalhos sob medida, calhas/rufos — apenas categorias de classificação.

## 21. RELAÇÃO COM O CORE COGNITIVO

**Pergunta de teste:** *o Motor Operacional precisa de um novo cérebro ou pode usar o cérebro cognitivo que já construímos?*
- **Hipótese atual:** reutilizar o máximo (Evento → `MemoriaCognitiva`/descobertas → `Hipotese` → `AcaoCognitiva` → `FeedbackAcao`), como registrado em P80/P81 §11.
- **Não testada:** sem dado de campo não há como validar se o fio funciona (a infra satisfaz, mas o padrão de aprendizado para os dados de operação é hipótese).

## 22. ESTRUTURAS EXISTENTES QUE PODEM SER REUTILIZADAS (verificado no código)

- `Event` (Event Store `eventos`) + `cognitive-bus`/`event-publisher` — hoje grava eventos.
- `Implantacao`/`EtapaImplantacao` — padrão de etapas ordenadas + API.
- `Cliente`/`Lead`/`Contato`, `Tarefa`, `Historico`, `Transacao` — bases CRUD prontas.
- `AcaoCognitiva` (Centro de Decisão), `MemoriaCognitiva`/descobertas P77, `Hipotese`, `FeedbackAcao`, `Outcome`/`ConhecimentoValidado`.
- `memoria-evolutiva-engine` (painel "Operação" do `obterMemoriaViva`), `motor-continuacao`, `motor-descobertas`, `conselheiro-engine`, `conversation-engine`.

## 23. ESTRUTURAS QUE TALVEZ PRECISEM SER ADAPTADAS

- `EventSubscription` e `DeadLetter`: existem no schema mas sem escrita executor hoje (P80) — **adaptar/completar, nunca duplicar**.
- `Tarefa`: hoje nada a cria automaticamente — automação operacional futura a adaptaria.
- `Implantacao`: generalização para Workflow aguardando a Fase 1 do P80 (modelo validado).
- "Atlas" (citado no programa P80): não existe no repositório — **investigar**.

## 24. O QUE AINDA NÃO SABEMOS

Item 7 completo + decisão da unidade operacional + resposta âncora + dependência + tempos + comunicação + decisões + retrabalho + divergência descrito/executado. Nada disso pode ser preenchido por opinião. Só via `REGISTRO_CAMPO`.

## 25. O QUE NÃO DEVE SER IMPLEMENTADO

Nada do motor operacional: nada de workflow, entidades/tabelas, models `Os/Ordem`/`Demanda`, APIs de operação, telas de acompanhamento, scripts de seed de template, automação de eventos ativos, motor de bloqueio/próxima ação — **até campo e modelo do P83**.

## 26. CRITÉRIOS PARA LIBERAR P83 (A UNIDADE OPERACIONAL)

1. `REGISTRO_CAMPO_SOUZA_MESTRINHO_<data>.md` preenchido em 1+ visitas reais (P26 válido: data/hora, observador, separação FATO × interpretação).
2. Pergunta-âncora respondida pela boca do dono (DITO literal) e as evidências classificadas (sustenta/contradiz).
3. Fluxo real renderizado com 2+ paradas/esperas descritas e suas causas.
4. Pelo menos 3 problemas com fonte `OBSERVADO`/`DITO` separados.
5. Unidade operacional indicada pela fala do time (não inferida pelo observador antes da hora).
6. Padrões UNIVERSAL/VERTICAL/PARTICULAR provisórios derivados de evidência (não de especulação).
Sem isso: `NÃO SABEMOS` e o P83 não abre.

## VEREDITO DO P82

**P82 NÃO está concluído.** É uma investigação paralizada pela falta de evidência de campo. O ponto que define o P82 é **coletar no chão** — e nenhum material real foi entregue ao repositório. Portanto: OBSERVADO = ∅, DITO = 3 declarações do P79, o restante NÃO SABEMOS. A única conclusão assegurada é processual: o método está pronto (protocolo P26 + template de registro) e **não há nada a modelar até a visita real**.

## Nota de descoberta

**Oportunidade de processo:** a investigação de campo da operação de um CLIENTE é o primeiro uso do `PROTOCOLO_DA_OBSERVACAO_REAL` (P26) fora da Empresa Zero (autoobservação). O protocolo já cobre: validade da observação, separação fato × interpretação, maturidade (3+ ocorrências para hipótese), viés, limite de 30min/sessão. Recomendo: (a) reutilizar o id `OBS-[XXX]` do P26 nos registros; (b) interpretar só depois dos 30 min de fatos registrados (regra do P26); (c) declarar o viés de quem observa — o mesmo dono pode estar cego sobre "bagunças" que ele conhece/acredita.