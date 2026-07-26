# Constituição da Engenharia da Ponte Digital

> Documento máximo da engenharia. Versão: 1.0.
> Nenhuma outra documentação substitui este documento.
> Se todos os outros documentos fossem perdidos, um engenheiro sênior deveria reconstruir a filosofia, os princípios e a forma correta de evoluir a plataforma apenas lendo esta Constituição.

---

## Preâmbulo

Este documento existe porque a Ponte Digital não é um SaaS comum. Ela é uma plataforma cognitiva para o empresário brasileiro de pequeno e médio porte. Ela combina gestão operacional (clientes, tarefas, finanças) com inteligência artificial que aprende o negócio do usuário ao longo do tempo.

Esta combinação — gestão + cognição continuada — cria um tipo de sistema que não se encaixa em arquiteturas prontas. Não é ERP. Não é chatbot. Não é dashboard. É patrimônio cognitivo.

Esta Constituição documenta os padrões que emergiram naturalmente do desenvolvimento real. Eles não foram inventados em um whiteboard. Foram extraídos do código, das decisões que funcionaram, dos erros que custaram caro, e das restrições que o domínio impôs.

Toda regra aqui pode ser quebrada — mas somente com um ADR que documente por que a regra não se aplica, qual problema ela causaria, e qual garantia substitui sua ausência.

---

## Seção 1 — Filosofia da Engenharia

### Como pensamos

A arquitetura da Ponte Digital segue seis valores fundamentais. Eles aparecem repetidamente no código, nas decisões, e nos padrões que sobreviveram:

**1. Verdade executável > verdade documentada.** Um padrão que funciona no código vale mais que uma especificação perfeita no papel. A documentação existe para explicar, não para prescrever.

**2. Isolamento por convenção, não por estrutura.** A Ponte Digital não usa RLS do Supabase, nem microserviços, nem barreiras físicas entre tenants. O isolamento entre empresas depende de cada query incluir `empresaId` no `where`. O `prisma-tenant-safe` detecta violações em desenvolvimento, mas não substitui o cuidado de quem escreve a query. (Ver `prisma-tenant-safe.ts` — "garantia humana, não estrutural".)

**3. Crescer para dentro, não para fora.** Antes de adicionar uma nova dependência externa (Redis, fila, banco novo), a pergunta é: "Dá para fazer com o que já temos?" Cache in-memory, EventEmitter para pub/sub, Prisma para tudo — esta postura mantém a plataforma gerenciável por uma equipe pequena.

**4. Cognição é patrimônio, não pipeline.** A inteligência da Ponte Digital não é um chatbot que esquece tudo após a resposta. Cada interação gera memória, contexto, evidência, decisão. A engine `heritage-engine` (patrimônio) é a mais importante de todo o sistema — ela unifica memória, conhecimento e síntese.

**5. Separação rígida entre orquestração e execução.** Engines cognitivas orquestram. Services operacionais executam. Uma engine pode chamar outra engine. Um service nunca chama uma engine. Esta barreira é a mais importante da arquitetura.

**6. Nomes em português; tipos e padrões previsíveis.** Todo o domínio está em português porque o usuário final é o empresário brasileiro. Mas a previsibilidade importa mais que o idioma: `listarClientes`, `criarTarefa`, `calcularHealthScore` seguem o mesmo padrão em toda a base.

### O que nunca fazemos

- Nunca colocamos regra de negócio em componente React.
- Nunca acessamos Prisma diretamente de uma engine cognitiva (só via `prisma-tenant-safe` ou serviço).
- Nunca criamos uma API que implementa lógica de negócio — ela só valida entrada, chama service, retorna.
- Nunca duplicamos inteligência — conhecimento cognitivo existe em um único lugar.
- Nunca confiamos apenas no frontend para segurança ou isolamento.
- Nunca criamos abstrações antes de existir repetição.

### Como decisões são tomadas

Toda decisão arquitetural segue esta escada:

1. **O código atual resolve?** Se sim, não mude.
2. **É consistente com os padrões existentes?** Se sim, implemente. Se não, ADR.
3. **Aumenta o patrimônio da plataforma?** Dados, contexto, decisões, aprendizado acumulado — toda mudança deve fortalecer um destes.
4. **O empresário brasileiro se beneficia semanalmente?** Se a resposta for não, a funcionalidade não é prioridade.
5. **Reduz trabalho manual do usuário?** Automação de tarefas operacionais vale mais que qualquer feature cosmética.

---

## Seção 2 — Leis Imutáveis

Estas leis não podem ser violadas sem um ADR formal que explique a exceção e suas consequências.

### Lei 1 — Service nunca importa Engine
- **O que diz:** Um arquivo em `services/` nunca pode importar nada de `engine/`.
- **Por que existe:** Engines representam o patrimônio cognitivo. Services representam operações de negócio. A cognição coordena; a operação executa. Se um service chamasse uma engine, a cognição se tornaria um detalhe operacional, e a separação se perderia.
- **Consequência da violação:** O sistema se torna impossível de evoluir porque qualquer mudança cognitiva pode quebrar operações, e qualquer mudança operacional pode corromper o estado cognitivo.
- **Evidência no código:** `cliente.service.ts`, `tarefa.service.ts`, `implantacao.service.ts` — nenhum importa `@/engine/`.

### Lei 2 — Engine nunca acessa Prisma diretamente
- **O que diz:** Engines usam `prisma-tenant-safe` ou chamam services. Não instanciam Prisma diretamente.
- **Por que existe:** O `prisma-tenant-safe` é a única camada que garante isolamento multi-tenant em todas as queries. Uma engine que ignorasse esta camada poderia vazar dados entre empresas.
- **Consequência da violação:** Violação de isolamento de dados entre empresas. Risco legal e de negócio inaceitável.
- **Evidência no código:** `cognitive-context-engine.ts` importa `@/lib/prisma-tenant-safe`, nunca `@/lib/prisma` diretamente. Nenhuma engine usa `new PrismaClient()`.

### Lei 3 — API nunca implementa regra de negócio
- **O que diz:** Uma rota de API valida entrada (`zod`, tipos), chama um service, formata resposta. Nunca contém lógica de domínio.
- **Por que existe:** Testabilidade. Se a regra está na API, não pode ser testada sem HTTP. Se está no service, pode ser testada unitariamente.
- **Consequência da violação:** Código não testável, acoplamento a framework HTTP, dificuldade de evoluir regras.
- **Evidência no código:** `app/api/clientes/route.ts` chama `listarClientes(empresaId, filtros)` e retorna. Não contém `if` de negócio.

### Lei 4 — Lib nunca conhece UI
- **O que diz:** Código em `lib/` nunca importa React, hooks, componentes, ou qualquer coisa de `app/` ou `components/`.
- **Por que existe:** `lib/` é a camada fundamental. Se ela conhecesse UI, não poderia ser usada por services, engines, ou testes sem carregar o ecossistema React.
- **Consequência da violação:** Impossibilidade de testar libs sem jsdom, lentidão em imports, dependência circular.

### Lei 5 — Componente React nunca contém regra de negócio
- **O que diz:** Um componente renderiza estado, dispara ações, exibe dados. A decisão sobre o que fazer — qual dado buscar, como transformar, quando atualizar — não está no componente.
- **Por que existe:** Separar apresentação de lógica permite que a interface mude sem risco de quebrar o domínio.
- **Consequência da violação:** Regras de negócio espalhadas em 20 componentes diferentes, impossível de auditar, testar, ou evoluir.

### Lei 6 — Nunca duplicamos inteligência
- **O que diz:** Conhecimento, contexto, memória, hipótese, evidência — cada conceito cognitivo existe em uma única engine. Se duas engines precisam do mesmo conhecimento, ele é exposto por uma delas, não copiado.
- **Por que existe:** Se o mesmo padrão de descoberta existe em duas engines, elas divergem com o tempo. A cognição se torna contraditória.
- **Consequência da violação:** O sistema dá respostas diferentes para a mesma pergunta dependendo de qual engine processou.

### Lei 7 — Nunca criamos Engine por conveniência
- **O que diz:** Uma engine só existe se representa uma capacidade cognitiva autônoma (contexto, memória, evidência, decisão, etc.). Não se cria engine para "organizar código" ou "evitar arquivo grande".
- **Por que existe:** Engines formam o grafo cognitivo. Cada engine nova aumenta a complexidade do grafo. Engines falsas (que só delegam) poluem o grafo sem benefício.
- **Consequência da violação:** Grafo cognitivo inchado, dependências falsas, dificuldade de rastrear fluxos. O `ARCHITECTURE.md` lista 55 engines; muitas podem ser falsas.

### Lei 8 — Toda query multi-tenant inclui empresaId no where
- **O que diz:** Nenhum `findMany`, `findFirst`, `create`, `update`, `delete` em modelos com `empresaId` pode omitir o campo do `where`. Não importa se o usuário logado é admin.
- **Por que existe:** O `prisma-tenant-safe` detecta violações em dev, mas em produção apenas loga. A segurança real está em cada query.
- **Consequência da violação:** Dados de uma empresa aparecem para outra. A plataforma perde a confiança do cliente e fica exposta legalmente.

### Lei 9 — Toda migration adiciona dados, nunca remove sem estratégia
- **O que diz:** Remover coluna, tabela, ou campo só é permitido após: (a) verificar que nenhum código referencia, (b) verificar que dados existentes têm plano de migração ou arquivamento, (c) executar em duas fases (deprecate → remove).
- **Por que existe:** A plataforma tem 33 modelos com dados reais de clientes. Uma migration destrutiva acidental causa perda de dados irreversível.
- **Consequência da violação:** Perda de dados de clientes. Fim do negócio.

### Lei 10 — Toda engine cognitiva registra sua saída
- **O que diz:** Engines que produzem decisão, contexto, recomendação, ou predição escrevem no modelo correspondente (MemoriaCognitiva, Evidencia, AcaoCognitiva, Outcome). Não mantêm estado apenas em memória.
- **Por que existe:** O patrimônio cognitivo da Ponte Digital são os dados persistidos. Estado em memória que não vira registro não gera aprendizado futuro.
- **Consequência da violação:** O sistema aprende com cada execução, mas se não persiste, repete os mesmos erros.

---

## Seção 3 — Hierarquia Arquitetural

### A pirâmide de dependências

A arquitetura tem dois domínios paralelos (negócio e cognição) que compartilham a mesma base:

```
        components/ (UI)
             ↑
          hooks/ (estado + efeitos)
             ↑
        ┌────┴────┐
        │         │
    api/         api/
 (negócio)   (cognitivo)
        ↑         ↑
  services/    engine/ (orchestrator → engines individuais)
        ↑         ↑
        └────┬────┘
             │
        lib/ (prisma-tenant-safe, erros, cache, utils)
             ↑
        prisma/ (schema + client PostgreSQL)
```

**Regra fundamental:** API de negócio chama service. API cognitiva chama engine. Nunca o contrário.

### Regras de dependência

| Camada | Pode importar | Nunca importa | Notas |
|--------|--------------|---------------|-------|
| `prisma/` | Nada do `src/` | Código da aplicação | Schema-only |
| `lib/` | `prisma/` | `services/`, `engine/`, `api/`, `hooks/`, `components/` | Deve ser independente |
| `services/` | `lib/`, `services/` (outros), `engine/` (apenas tipos) | `engine/` (runtime), `api/`, `hooks/`, `components/` | Um service importa `type { Sinal }` de `engine` como exceção |
| `engine/` | `lib/`, `engine/` (outros) | `services/`, `api/`, `hooks/`, `components/` | Nenhuma engine importa service atualmente |
| `api/` | `services/`, `engine/`, `lib/` | `hooks/`, `components/` | API cognitiva importa engine; API de negócio importa service |
| `hooks/` | `lib/`, `services/` | `engine/`, `prisma/` | Hooks conectam UI a services, não a engines |
| `components/` | `hooks/`, `lib/` | `services/`, `engine/`, `api/`, `prisma/` | Apenas render e eventos |

### Exceções documentadas

- **APIs cognitivas** (`/api/patrimonio`, `/api/conversa`, `/api/cognitivo`, `/api/cognitive-heritage`, `/api/experience/login`, `/api/auth/criar-conta`) importam engines diretamente porque representam exposição de capacidades cognitivas, não operações de negócio. A regra é: API de negócio chama service; API cognitiva chama engine.
- **Services que importam type de engine** — `historico-sinal.service.ts` importa `type { Sinal }` de `@/engine`. Isto é aceitável porque é apenas tipo (compila para nada em runtime) e evita duplicar a definição do tipo.
- **Engines de pipeline cognitivo** — podem chamar `cognitive-orchestrator` como coordenador central.
- **Services operacionais** entre si — podem importar outros services (ex: `cliente.service` importa `historico.service`).

### Quem coordena

`cognitive-orchestrator` coordena o fluxo cognitivo completo. Nenhuma engine individual decide o fluxo. Engines produzem informação; o orchestrator decide o que fazer com ela.

### Quem apenas executa

Engines especializadas (evidence, memory, identity, health, evolution, etc.) executam uma única capacidade cognitiva. Elas não sabem da existência umas das outras — o orchestrator as conecta.

---

## Seção 4 — Princípios Cognitivos

### Por que existe cognição na arquitetura

A Ponte Digital não é um SaaS que "tem uma IA". A cognição é a razão de ser da plataforma. Ela existe para transformar dados operacionais do empresário em conhecimento acionável que evolui com o tempo.

### Patrimônio Cognitivo

- **O que é:** O conjunto de memórias, evidências, hipóteses, decisões e conhecimentos validados acumulados sobre uma empresa ao longo do tempo.
- **Onde vive:** Nos modelos `MemoriaCognitiva`, `Evidencia`, `Hipotese`, `AcaoCognitiva`, `Outcome`, `ConhecimentoValidado` no banco de dados.
- **Por que é importante:** É a única coisa que torna a Ponte Digital impossível de copiar. Concorrentes podem copiar features; não podem copiar anos de contexto acumulado.
- **Quem coordena:** `heritage-engine` — engine responsável por unificar memória, conhecimento e síntese.

### Motor Cognitivo

- **O que é:** O conjunto de todas as engines que produzem, processam ou transformam informação cognitiva.
- **Onde vive:** Em `engine/`. Cada engine é um motor especializado.
- **O que não é:** Não é um monolito. O motor cognitivo é a soma de capacidades independentes coordenadas pelo orchestrator.

### Pipeline Cognitivo

- **O que é:** O fluxo que transforma dados brutos em decisão: `Sinais → Contexto → Evidências → Decisão → Ação → Outcome`.
- **Onde vive:** Em `cognitive-pipeline-store.ts` (o monolito de 1392 linhas — um débito reconhecido).
- **Como deveria ser:** Cada etapa do pipeline deveria ser uma engine independente. A versão atual é procedural e centralizada.

### Decision Engine

- **O que é:** A capacidade de recomendar ou executar ações com base no contexto consolidado.
- **Onde vive:** `cognitive-decision-engine.ts` + `cognitive-action-composer.ts`.
- **Por que é separada:** Decidir é diferente de analisar. A análise produz contexto; a decisão consome contexto e produz ação.

### Observabilidade Cognitiva

- **O que é:** A capacidade de entender por que o sistema tomou cada decisão.
- **Onde vive:** Em logs estruturados com `correlationId`, no modelo `EventoAtivacao`, e na engine `observability-engine`.
- **Por que é crítica:** Sem observabilidade, decisões erradas da IA não podem ser corrigidas, auditadas, ou melhoradas. O sistema se torna uma caixa-preta.

---

## Seção 5 — Como nasce uma funcionalidade

### Passo a passo da ideia à produção

```
IDEA → VALIDAÇÃO → ARQUITETURA → IMPLEMENTAÇÃO → REVISÃO → TESTE → PRODUÇÃO
```

### Fase 1 — Ideia

1. A funcionalidade resolve um problema real do empresário?
2. Ela ajuda ele a decidir melhor?
3. Ela reduz trabalho manual?
4. Pode ser usada semanalmente?
5. Gera conhecimento futuro para a plataforma?

Se menos de 3 respostas forem "sim", a funcionalidade não deve ser implementada agora.

### Fase 2 — Validação

1. Existe evidência (usuário pediu, dado mostra, concorrente resolveu)?
2. É consistente com a fase atual do produto (ver CURRENT_PRODUCT.md)?
3. A implementação mínima (MVP) é clara?
4. Sabemos medir se funcionou?

### Fase 3 — Arquitetura

1. **Onde esta funcionalidade se encaixa na hierarquia?**
   - Regra operacional → Service
   - Capacidade cognitiva → Engine
   - Validação/formatação → Lib
   - Estado/interface → Hook + Component
   - Exposição → API

2. **Qual o impacto nas camadas existentes?**
   - Novo modelo Prisma? → Migration necessária.
   - Nova engine? → Verificar se é genuinamente cognitiva (Seção 6).
   - Novo service? → Verificar se não duplica responsabilidade existente.

3. **A funcionalidade precisa de:**
   - Proteção de tenant? → empresaId em toda query.
   - Log? → correlationId, logger estruturado.
   - Permissão? → Verificar autorização.
   - Evento? → EventEmitter ou EventoAtivacao.

### Fase 4 — Implementação

1. Comece pela camada mais funda (lib, prisma).
2. Depois a lógica de domínio:
   - Se for operação de negócio → service.
   - Se for capacidade cognitiva → engine.
3. Depois a API (chama service ou engine conforme o domínio).
4. Depois o hook.
5. Depois o componente.
6. Nunca na ordem inversa.

### Fase 5 — Revisão

Ver Checklist permanente na Seção 11 (PR Review).

### Fase 6 — Teste

1. Service → Teste unitário.
2. API → Teste de integração.
3. Componente → Teste de renderização.
4. Fluxo → Teste end-to-end.

### Fase 7 — Produção

1. Migration executada e verificada.
2. Feature flag (se aplicável).
3. Monitoramento do uso (ver OPS-OBSERVABILITY.md).

---

## Seção 6 — Como nasce uma Engine

### Quando merece existir

Uma engine merece ser criada quando TODOS os critérios abaixo são verdadeiros:

1. **Representa uma capacidade cognitiva autônoma.** Exemplos reais: contexto, memória, evidência, identidade, saúde, evolução, envelhecimento, confiança, milestone, briefing, timeline, action, workflow, jornada, notificação, experiência. Cada uma destas existe porque processa um aspecto específico da cognição.

2. **Tem entrada, processamento e saída claros.** A engine recebe um estado, transforma, e devolve um resultado. Não é uma coleção de funções soltas.

3. **Pode ser testada isoladamente.** A saída depende apenas da entrada, não de efeitos colaterais de outras engines (exceto dependências declaradas).

4. **Acumula patrimônio.** A engine escreve em banco (MemoriaCognitiva, Evidencia, Outcome, etc.) ou produz conhecimento que será persistido por outra engine.

### Quando NÃO merece existir

1. **Apenas organiza código.** Se a "engine" só agrupa funções relacionadas, é uma lib ou um service, não uma engine.

2. **Só delega para outra engine.** Se a "engine" chama outra engine e formata a saída, é um adaptador, não uma capacidade cognitiva.

3. **Nunca é chamada isoladamente.** Se ela só existe como parte de um pipeline maior, considere fundir no orchestrator ou tornar o pipeline uma engine única.

4. **Repete responsabilidade de engine existente.** Duas engines não podem ter o mesmo propósito cognitivo (Lei 6).

### Checklist obrigatório para criar uma Engine

```
[ ] A engine representa uma capacidade cognitiva autônoma? (Se não, pare.)
[ ] A engine tem nome que descreve O QUE ela faz, não COMO faz?
    (Bom: "context-engine". Ruim: "data-fetcher-engine".)
[ ] A engine pode ser testada sem HTTP, sem React, sem API?
[ ] A engine escreve em banco ou produz saída que será persistida?
[ ] A engine não depende de outra engine em andamento de criação?
[ ] A engine não acessa PrismaClient diretamente?
[ ] A engine não importa nada de services/?
[ ] A engine registra sua execução (correlationId, logger)?
[ ] A engine tem um tipo de saída definido (interface)?
[ ] Um ADR foi criado justificando a existência desta engine?
```

---

## Seção 7 — Como remover código

### Critérios para remover

1. **Código morto** — nenhum import, nenhuma chamada, nenhuma referência em todo o códigobase → remover imediatamente.
2. **Código órfão** — importado mas nunca chamado em produção → marcar como `@deprecated` por 1 sprint, depois remover.
3. **Código duplicado** — existe em dois lugares → unificar em lib, manter a versão mais recente, remover a antiga.
4. **Código substituto** — nova implementação substitui a antiga → manter a antiga como fallback por 1 sprint, depois remover.
5. **Feature removida** — funcionalidade não existe mais → remover todo código associado (engine, service, API, hook, component).

### Processo

1. **Identificar.** Use grep para encontrar todas as referências. Não confie em "achar que não usa".
2. **Deprecatar.** Marcar com `@deprecated (remover em <data>)`. Comitar.
3. **Aguardar.** Mínimo 1 sprint (2 semanas) para que ninguém dependa do código sem saber.
4. **Remover.** Apagar o arquivo. Remover todos os imports.
5. **Verificar.** `tsc --noEmit` passa? Prisma validate passa? Testes passam?
6. **Documentar.** Registrar no CHANGELOG.md como "removido".

### Garantias

- **Nunca remover sem verificar runtime.** A verificação de compilação não pega imports dinâmicos ou strings.
- **Nunca remover dado sem estratégia.** Colunas, tabelas, ou modelos só são removidos do Prisma após dados serem arquivados ou migrados.
- **Nunca remover sem ADR.** Se a remoção altera comportamento visível ao usuário, requer ADR.

---

## Seção 8 — Como identificar débito técnico

### O que é débito técnico na Ponte Digital

Débito técnico é qualquer código que:
- Viola uma Lei Imutável (Seção 2).
- Duplica responsabilidade que já existe em outro lugar.
- É desnecessariamente complexo (mais linhas que a alternativa clara).
- Não pode ser testado sem setup excessivo.
- Impede ou dificulta uma mudança futura necessária.

### Quando refatorar

1. **O débito impede uma funcionalidade nova.** Não refatore porque "o código está feio". Refatore porque a próxima feature não cabe sem limpar antes.
2. **O débito causa bugs recorrentes.** Se o mesmo tipo de erro aparece em code review toda semana, o padrão precisa mudar.
3. **O débito aumenta o tempo de onboarding.** Se todo novo desenvolvedor tropeça no mesmo lugar, o código está ensinando errado.
4. **O débito é classificado como crítico na governança.** ARQUITETURA_CONSOLIDADA_V1.md e GOVERNANCA_PERMANENTE.md listam os débitos conhecidos. Priorizar os de alto impacto.

### Quando NÃO refatorar

1. **O código funciona e não há mudança planejada.** Código que "poderia ser melhor" mas não atrapalha ninguém não deve ser tocado.
2. **A refatoração não tem dono claro.** Refatoração sem responsável vira reescrita infinita.
3. **A refatoração não pode ser feita em paralelo com features.** Se a refatoração bloqueia a sprint, não é o momento.
4. **O débito é arquitetural e exigiria mudança estrutural.** Exemplo: `cognitive-pipeline-store.ts` com 1392 linhas é um débito real, mas sua refatoração exige redesenho do pipeline — isso é programa de uma sprint inteira, não tarefa de code review.

### Como priorizar

| Impacto | Exemplo | Ação |
|---------|---------|------|
| Crítico | Violação de Lei Imutável | Corrigir imediatamente |
| Alto | Duplicação de inteligência | Planejar na sprint atual |
| Médio | Arquivo inchado (>500 linhas) | Programar nas próximas 2 sprints |
| Baixo | Nomenclatura inconsistente | Incluir em refatoração agendada |
| Cosmético | Formatação, comentários | Ignorar |

---

## Seção 9 — Como proteger a arquitetura

### Contra duplicações

- Toda nova funcionalidade deve responder: "Isso já existe em algum lugar?"
- Antes de criar uma engine, verificar se a responsabilidade não é coberta por engine existente. O catálogo vivo (GOVERNANCA_PERMANENTE.md Seção A) é a fonte da verdade.
- Dupla verificação em code review: "Este código não duplica a responsabilidade de ${arquivo}?"

### Contra atalhos

- Atalhos mais comuns:
  - "Vou colocar isso no componente porque é rápido" → viola Lei 5.
  - "Vou acessar Prisma direto da engine" → viola Lei 2.
  - "Vou chamar a engine do service porque não quero criar uma API" → viola Lei 1.
  - "Vou fazer a query sem empresaId porque é admin" → viola Lei 8.

- **Como impedir:** Code review com checklist (Seção 11). Ferramentas: buscar `new PrismaClient()` fora de lib/, buscar imports de engine/ em services/, buscar empresaId ausente em queries.

### Contra violação de camadas

- A pirâmide da Seção 3 é a regra. Nenhuma PR deve subir com dependência que viola a direção das setas.
- Se um import viola a hierarquia, o revisor deve marcar como blocker, não como sugestão.

### Contra acoplamentos

- Engines podem importar outras engines, mas este acoplamento deve ser justificado: "Esta engine depende da engine X porque precisa de Y que só X produz."
- Acoplamento não justificado = candidate a refatoração.
- Serviços acoplados entre si: permitido, mas cada service deve ter uma responsabilidade única e clara (SRP).

### Contra vazamento de domínio

- Nenhum conceito do domínio (cliente, tarefa, financeiro, cognitivo) deve vazar para camadas que não são de domínio.
- Camadas de domínio: `engine/`, `services/`, `lib/` (parcial).
- Camadas de infra: `api/`, `hooks/`, `components/`.
- Se um componente React sabe o que é "Evidencia" ou "HealthScore", ele está recebendo dados prontos — mas se ele decide o que é uma "evidencia de alto risco", o domínio vazou.

---

## Seção 10 — E se o código contradiz a Lei?

### O contrato de integridade

Toda Lei Imutável (Seção 2) está sujeita a esta regra:

> **O código atual é a verdade.** Se uma Lei escrita aqui contradiz o código que está em produção, o código está certo e a Lei está errada — a menos que haja um débito técnico registrado.

### Processo para inconsistência

1. Identificar qual Lei está sendo violada e por qual código.
2. Classificar:
   - **Violação justificada** — há um motivo (feature flag, débito conhecido, ADR, simplificação estratégica da fase V4 Founder). Marcar como "exceção documentada".
   - **Violação acidental** — ninguém percebeu. Corrigir o código ou atualizar a Lei.
   - **Lei desatualizada** — a arquitetura evoluiu e a Lei não acompanhou. Atualizar a Lei.
3. Registrar no `KNOWN_ISSUES.md` da sprint atual.
4. Se for uma exceção importante, criar ADR.

### Exceções conhecidas (válidas na data desta Constituição)

| Lei | Violação | Justificativa |
|-----|----------|---------------|
| 3 (API não implementa regra) | APIs cognitivas (`/api/patrimonio`, `/api/conversa`) importam engines e orquestram chamadas | Não implementam regra — delegam para engines. A API é apenas roteamento. Exceção válida. |
| 2 (Engine não acessa Prisma) | `cognitive-context-engine.ts` usa `prismaSeguro` diretamente | `prisma-tenant-safe` é lib, não PrismaClient. Acesso controlado. Válido. |
| 1 (Service não importa Engine) | `historico-sinal.service.ts` importa `type { Sinal }` de `@/engine` | Apenas tipo, não runtime. Compila para nada. Evita duplicar definição. Exceção aceitável. |
| 10 (Toda engine persiste) | `identity-engine` não escreve em banco | Identidade é derivada de dados existentes (usuário, empresa). Recalcular é mais seguro que cache. Exceção válida. |

---

## Seção 11 — Como revisar Pull Requests

### Checklist permanente de revisão

#### Bloqueadores (PR não pode mergear)

```
[ ] Algum código importa de camada que não deveria? (Leis 1-5)
[ ] Alguma query multi-tenant não inclui empresaId no where? (Lei 8)
[ ] Alguma regra de negócio está em componente React, API, ou hook? (Lei 5)
[ ] Alguma migration remove coluna/tabela sem estratégia de dados? (Lei 9)
[ ] Foi criada uma engine sem ADR? (Seção 6)
```

#### Críticos (mergear só com justificativa)

```
[ ] A PR adiciona dependência externa nova? (npm, serviço, lib?)
[ ] A PR altera schema do banco?
[ ] A PR altera comportamento de engine existente?
[ ] A PR altera endpoint de API pública?
[ ] A PR adiciona mais de 400 linhas em um único arquivo?
[ ] A PR introduz nova forma de fazer algo que já tem padrão?
```

#### Recomendados (discutir, não bloquear)

```
[ ] Os nomes seguem o padrão português do domínio?
[ ] A PR tem testes para a camada alterada?
[ ] Os imports estão ordenados (lib externa → lib interna → types)?
[ ] Foi usado `prismaSeguro` em vez de `prisma`?
[ ] Há tratamento de erro consistente (app-errors)?
[ ] Logs têm correlationId?
[ ] A PR altera documentação existente que referencia o código?
[ ] A PR adiciona TODO, FIXME, ou HACK sem issue associada?
```

---

## Seção 12 — Como decidir entre Engine, Service, Lib, Helper, Component, Hook, API, Middleware

### Árvore de decisão

```
A funcionalidade é uma capacidade cognitiva autônoma?
├── SIM → Engine (criar em engine/, seguir checklist da Seção 6)
└── NÃO → continua

A funcionalidade é uma operação de negócio (CRUD, validação, regra)?
├── SIM → Service (criar em services/)
└── NÃO → continua

A funcionalidade é utilidade genérica (formatação, cálculo, validação)?
├── SIM → Lib (criar em lib/)
└── NÃO → continua

A funcionalidade é um ponto de extensão que envolve dados e UI?
├── SIM → Hook (criar em hooks/)
└── NÃO → continua

A funcionalidade é exposição HTTP de uma operação?
├── SIM → API (criar em app/api/)
├──── A operação é de negócio (CRUD, regra, validação)?
├──── → API chama service (ex: app/api/clientes/route.ts → services/cliente.service.ts)
├──── A operação é cognitiva (memória, patrimônio, contexto, conversa)?
├──── → API chama engine (ex: app/api/patrimonio/route.ts → engines/heritage-engine)
└── NÃO → continua

A funcionalidade renderiza algo na tela?
├── SIM → Component (criar em components/)
└── NÃO → continua

A funcionalidade intercepta requisições de forma transversal?
├── SIM → Middleware (criar em middleware.ts)
└── NÃO → Repensar: esta funcionalidade é realmente necessária?
```

### Regras de desempate

- Na dúvida entre Service e Engine → é Service (engines são caras de criar e manter).
- Na dúvida entre Service e Lib → é Service (libs devem ser genéricas e reutilizáveis).
- Na dúvida entre Component e Hook → separar: hook para estado/lógica, componente para render.
- Na dúvida entre API e Server Action → API (Server Actions ainda não são padrão na Ponte Digital — não há nenhuma no código).
- Na dúvida entre Middleware e API handler → handler (não há middleware.ts atualmente; criar middleware só se o mesmo filtro se aplica a 3+ rotas).

---

## Seção 13 — Como decidir se um arquivo ficou grande demais

### Critérios objetivos

**Limiar de alerta:** 400 linhas.
**Limiar crítico:** 800 linhas.

Acima de 400 linhas, o arquivo deve ser avaliado. Acima de 800, o arquivo DEVE ser justificado ou quebrado.

### Fatores agravantes (reduzem o limiar)

| Fator | Redução |
|-------|---------|
| O arquivo mistura responsabilidades (ex: query + formatação + decisão) | 400 → 200 |
| O arquivo tem mais de 3 imports de camadas diferentes | 400 → 250 |
| O arquivo tem funções com mais de 50 linhas | 400 → 300 |
| O arquivo não pode ser testado sem mock complexo | 400 → 200 |
| O arquivo é uma engine que deveria ser uma capacidade única (Lei 7) | 400 → 150 |

### Fatores atenuantes (aumentam o limiar)

| Fator | Aumento |
|-------|---------|
| O arquivo é um orchestrator que coordena 5+ engines | 400 → 800 |
| O arquivo é uma store com estado compartilhado e reducers | 400 → 600 |
| O arquivo segue um padrão boilerplate repetitivo (ex: todas as queries de um modelo) | 400 → 500 |

### Arquivos que exigem ação imediata no código atual

| Arquivo | Linhas | Problema | Ação |
|---------|--------|----------|------|
| `engine/cognitive-pipeline-store.ts` | 1392 | Monolito de pipeline | Refatorar em engines independentes (Programa futuro) |
| `engine/cognitive-experience-engine.ts` | 1898 | Agrega 12 engines como imports | Separar por interface de experiência |
| `engine/cognitive-orchestrator/` | ~400+ | Coordenador legítimo | Aceitável dentro do limite aumentado |

---

## Seção 14 — O que torna a Ponte Digital impossível de copiar

### Do ponto de vista técnico — não de marketing

**1. O patrimônio cognitivo acumulado é insubstituível.**

A Ponte Digital não armazena apenas dados do cliente. Ela armazena:
- O contexto de cada decisão (por que foi tomada).
- As evidências que levaram a cada recomendação.
- O histórico de aprendizado (o que funcionou, o que não funcionou).
- As memórias cognitivas que evoluem com o tempo.

Concorrentes podem copiar a interface, as engines, os services. Não podem copiar anos de cognição contextualizada por empresa.

**2. O conhecimento de domínio está embutido na arquitetura.**

As categorias de evidência, os sinais de clientes/tarefas/financeiro, o sistema de pesos e confianças, a hierarquia de urgência — tudo isso foi extraído da operação real de empresas brasileiras de pequeno e médio porte. Não é IA genérica. É conhecimento de domínio transformado em software.

**3. O acoplamento entre gestão e cognição é proprietário.**

A maioria dos SaaS separa o ERP do "AI chat". A Ponte Digital não. O `heritage-engine` unifica memória operacional (tarefas, clientes, transações) com memória cognitiva (evidências, decisões, outcomes) no mesmo fluxo. Esta integração é difícil de replicar porque exige tanto conhecimento de gestão quanto de cognição.

**4. A simplicidade arquitetural é uma vantagem intencional.**

Enquanto concorrentes constroem arquiteturas de micronível com 15 serviços, filas, event sourcing, CQRS, e DDD completo, a Ponte Digital usa:
- Um banco (PostgreSQL via Supabase).
- Cache in-memory (não Redis).
- Pub/sub com EventEmitter (não Kafka/RabbitMQ).
- 55 engines em um único processo (não microsserviços).

Isso significa que uma equipe pequena consegue manter, evoluir, e depurar todo o sistema. Concorrentes com arquiteturas complexas precisam de equipes 5x maiores para o mesmo resultado.

**5. O foco inabalável no empresário brasileiro.**

Toda decisão técnica é filtrada por: "Isso ajuda o empresário brasileiro a decidir melhor?" Nomes em português, categorias que refletem o dia a dia da empresa brasileira, fluxos que reduzem trabalho manual. Um concorrente internacional não consegue replicar sem mergulhar no mesmo domínio.

---

## Seção 15 — Erros que jamais devemos repetir

> Baseado no histórico real do projeto. Cada erro aqui custou tempo, qualidade, ou dinheiro.

### Erro 1 — Criar engines sem justificativa cognitiva

**O que aconteceu:** Múltiplas engines foram criadas que não representavam capacidades cognitivas autônomas. Algumas são apenas wrappers de query. Outras delegam integralmente para outra engine. O grafo cognitivo inchou para 55 engines, muitas das quais poderiam ser libs ou services.

**Como evitar:** Aplicar o checklist da Seção 6 antes de toda engine. Se não passa, não é engine.

### Erro 2 — Monolito de pipeline cognitivo

**O que aconteceu:** `cognitive-pipeline-store.ts` concentrou 1392 linhas de pipeline inteiro (sinais, contexto, evidência, decisão, ação) em um único arquivo. Testar, modificar, ou entender uma etapa exige ler o arquivo inteiro.

**Como evitar:** Cada etapa do pipeline deve ser uma engine independente. O orchestrator coordena; as engines executam.

### Erro 3 — Experiência engine como agregadora de 12 engines

**O que aconteceu:** `cognitive-experience-engine.ts` com 1898 linhas importa 12 engines diferentes e coordena tudo internamente. Ela virou um orchestrator paralelo, competindo com `cognitive-orchestrator`.

**Como evitar:** Uma engine não deve ser um agregador de 12 outras. Se o faz, ou é um orchestrator (e deve estar em cognitive-orchestrator/) ou está violando SRP.

### Erro 4 — Acúmulo de decisões arquiteturais sem ADR

**O que aconteceu:** Cache in-memory, rate limiting, feature flags, barrel pattern, auth flow, soft delete, Prisma $extends, Anthropic AI — 17 decisões arquiteturais significativas foram implementadas sem registro formal de decisão. Novos desenvolvedores não sabem por que as coisas são como são.

**Como evitar:** Toda decisão que fecha uma alternativa arquitetural requer ADR. Abrir ADR antes de implementar.

### Erro 5 — Cache in-memory contra ADR-014

**O que aconteceu:** ADR-014 diz que cache é "futuro/Fase 4". O cache in-memory já está ativo, implementado em `lib/cache.ts`, e consumido por 4 engines. O ADR não foi atualizado.

**Como evitar:** ADR que não reflete o código é pior que não ter ADR. Manter ADRs sincronizados com a implementação.

### Erro 6 — Engine/index.ts com side-effects

**O que aconteceu:** `engine/index.ts` inicializa subscribers e pipelines como efeito colateral da importação. Importar qualquer coisa de `@/engine` roda código que pode não ser necessário.

**Como evitar:** Imports não devem ter side-effects. Inicialização explícita (chamar uma função `initialize()` onde necessário) é mais segura e previsível.

### Erro 7 — Zero middleware de proteção

**O que aconteceu:** Não existe `middleware.ts`. Cada rota protege manualmente suas requisições (verifica empresaId, permissões). Isso aumenta a superfície de erro — um novo handler pode esquecer a proteção.

**Como evitar:** Criar middleware para autenticação/autorização transversal. Validar em code review que toda nova rota tem proteção.

### Erro 8 — TenantId vs empresaId inconsistente em Event/DeadLetter

**O que aconteceu:** A maioria do sistema usa `empresaId`. Event e DeadLetter usam `tenantId`. Duas nomenclaturas para o mesmo conceito.

**Como evitar:** Padronizar nomenclatura. `empresaId` é o padrão em todo o sistema.

---

## Seção 16 — Arquitetura daqui a cinco anos

### Como a arquitetura atual foi desenhada para evoluir

Sem inventar funcionalidades. Apenas mostrando os pontos de evolução já previstos pela arquitetura.

**1. Cache in-memory → Redis (já previsto).**

O `lib/cache.ts` já expõe a mesma interface que um Redis caching usaria. Trocar a implementação não exige mudar nenhum consumidor. ADR-014 já documenta esta evolução.

**2. Cognitive pipeline → engines independentes (já mapeado).**

O monolito `cognitive-pipeline-store.ts` já tem suas etapas identificadas. Cada etapa (sinais, contexto, evidência, decisão, ação, outcome) pode se tornar uma engine independente com o orchestrator coordenando. O trabalho é de extração, não de invenção.

**3. Prisma-tenant-safe → RLS do Supabase (alternativa).**

A camada `prisma-tenant-safe` pode ser substituída por Row Level Security do Supabase quando a plataforma atingir escala que justifique a complexidade adicional. A interface permaneceria a mesma.

**4. EventEmitter → fila externa (se necessário).**

O pub/sub via EventEmitter funciona para o volume atual. Se a plataforma crescer, a mesma interface pode ser implementada com RabbitMQ, Redis Streams, ou Kafka sem mudar os publishers/consumers.

**5. Cognitive-orchestrator → motor de regras (evolução natural).**

O orchestrator atual é procedural. Conforme o número de engines crescer, ele pode evoluir para um motor de regras configurável, onde o fluxo é definido por configuração em vez de código.

**6. 55 engines → 30 engines (consolidação).**

O excesso de engines é reconhecido. A tendência é consolidar engines que violam SRP em capacidades mais coesas, reduzindo o grafo cognitivo para ~30 engines verdadeiramente autônomas.

**7. Monorepo → pacotes separados (se time crescer).**

O monorepo atual serve bem uma equipe pequena. Se o time crescer para 3+ squads, o código pode ser separado em pacotes (core, cognitive, api, ui) sem reescrever — as camadas já estão separadas em diretórios.

**8. Zero middleware → middleware de autenticação.**

A ausência de `middleware.ts` é o maior gap de segurança. A evolução mais previsível é criar um middleware que proteja todas as rotas automaticamente.

### O que NÃO vai mudar

- **Português como idioma do domínio.** O empresário brasileiro é o usuário final. Isto não muda.
- **Separação service/engine.** A barreira mais importante da arquitetura.
- **Prisma + PostgreSQL.** O banco de dados relacional é o centro do patrimônio de dados.
- **Multi-tenancy por empresaId.** O modelo de isolamento por convenção, não por barreira física.
- **Simplicidade sobre pureza.** Não vamos virar DDD, CQRS, Event Sourcing, microsserviços só porque "é o certo". Vamos evoluir quando houver evidência de que a complexidade se justifica.

---

## Apêndice A — Glossário de termos arquiteturais

| Termo | Definição |
|-------|-----------|
| **Engine** | Capacidade cognitiva autônoma com entrada, processamento e saída definidos |
| **Service** | Operação de negócio (CRUD, validação, regra) que acessa banco via prisma-tenant-safe |
| **Lib** | Código de utilidade genérica sem dependência de camadas superiores |
| **Hook** | Função React que conecta estado/efeitos à UI |
| **API** | Rota HTTP que valida entrada, chama service, formata resposta |
| **Orchestrator** | Coordenador de fluxo cognitivo que conecta engines sem implementar cognição |
| **Patrimônio Cognitivo** | Conjunto de memórias, evidências, decisões acumuladas por empresa |
| **prisma-tenant-safe** | Wrapper do Prisma que detecta queries sem empresaId em desenvolvimento |
| **ADR** | Arquitetural Decision Record — registro formal de decisão arquitetural |
| **SRP** | Single Responsibility Principle — cada módulo tem uma única responsabilidade |

---

## Apêndice B — Documentos que esta Constituição referência

| Documento | Conteúdo |
|-----------|----------|
| `ARQUITETURA_CONSOLIDADA_V1.md` | Inventário completo da plataforma (55 engines, 33 models, 27 APIs, 9 fluxos) |
| `GOVERNANCA_PERMANENTE.md` | Catálogo vivo, matriz de impacto, checklists, ADRs pendentes (17 implícitas) |
| `docs/04-DECISIONS/ADR/ADR-014.md` | Decisão sobre caching (cache in-memory vs Redis) |
| `CHANGELOG.md` | Histórico semântico de mudanças |
| `PLATFORM_CERTIFICATION_V1.md` | Certificação oficial da plataforma (3 ✅, 7 ⚠, 0 ❌) |
| `LESSONS_LEARNED.md` | 7 categorias de lições aprendidas durante o desenvolvimento |

---

## Nota final sobre integridade

Esta Constituição foi validada contra o código real da Ponte Digital na data de sua criação. Nenhuma regra foi incluída baseada apenas em documentação, ideal arquitetural, ou "boas práticas" abstratas. Toda regra:

1. Tem uma contrapartida no código que a comprova **OU** identifica uma violação conhecida.
2. Explica por que existe e qual problema evita.
3. Declara as consequências de sua violação.
4. Lista exceções conhecidas e justificadas.

Se no futuro uma regra desta Constituição contradisser o código em produção, siga o contrato de integridade (Seção 10): o código é a verdade. Atualize a Constituição.
