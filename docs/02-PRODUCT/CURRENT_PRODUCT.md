# CURRENT_PRODUCT.md — Estado Atual do Produto (V4 Founder)

> **MARCO: P99 — "A TRAVESSIA" — A MARCA AGORA É UMA PONTE — 15 de agosto de 2026**
>
> **A identidade deixa de esconder o nome: o símbolo institucional evolui da lente/portal "A Passagem" (P102) para "A Travessia" — uma ponte arquitetônica estilizada reconhecível em 2 segundos como UMA PONTE.** Mesma filosofia (fragmentos → conexão → clareza → evolução), agora com leitura literal: LOGO = ponte · MARCA = ponte + conexão + inteligência · EXPERIÊNCIA = fragmentação → conexão → contexto → clareza → evolução. Rodada exclusiva de identidade visual, sem migration, sem novas dependências, sem tocar em backend/schema/auth/Copiloto/Founder.
> - **Geometria "A Travessia" (viewBox 48×48):** duas torres (pilares 12/36, y 16→40) sustentando a **corda de suspensão** (arco de Bézier 12,16 → ápice 24,6 → 36,16 — sem ambigüidade de sweep de arco SVG); **tabuleiro partido** (y=22, trechos 12–20 e 28–36) com **vão central** onde brilha a **jóia** (24,22); finas **linhas de conexão** (hangers) ligando corda a tabuleiro. micro (16–24px): mesma silhueta, sem hangers, traços mais pesados.
> - **Correção importante:** a rodada anterior usava `A 20.69 20.69 0 0 0` que desenhava o cabo curvando para **baixo** (bulbo); a nova geometria usa Béziers determinísticos — validação por pixel-scan confirma: cable no ápice, tabuleiro partido, pilares como estrutura, jóia no vão, espaço transparente no centro (a passagem).
> - **Hierarquia de cor (só tokens existentes):** ink (estrutura/pilares) → path (travessia/corda+tabuleiro) → signal (jóia). Light/dark/deepnight via CSS vars; mono = currentColor. Nenhuma cor nova.
> - **Componentes:** `PonteSymbol` (full/micro × 4 surfaces), `PonteLogo`, `PonteLogoHorizontal`, `PonteLogoStacked` em `ponte-logo.tsx`; `AvatarPonte` e sidebar herdam automaticamente (mono). 8 SVGs de `public/brand` + `favicon.svg` + `app/icon.svg` + 4 ecos da landing regravados.
> - **Status:** typecheck limpo, **build limpo** (69 rotas + `/icon`), forma validada por amostragem de pixels (full 96/48/32, micro 24/16, noite, favicon, horizontal). Ecos da landing com a silhueta quase invisível da ponte.
>
> Ver P99 em `docs/05-OPERATIONS/REPORTS/IDENTIDADE-VISUAL.md`.

> **MARCO: P98 — HOMOLOGAÇÃO DA IDENTIDADE "A PASSAGEM" + EVOLUÇÃO DA EXPERIÊNCIA DA LANDING — 15 de agosto de 2026**
>
> **A própria landing passa a demonstrar a filosofia da marca — fragmentos → conexão → contexto → clareza → evolução — sem tocar na forma validada da identidade (a margem de evolução era a experiência, não a marca).** Rodada exclusiva de experiência da landing, sem backend, schema, API, autenticação, Copiloto, Founder, descoberta ou multi-tenant.
> - **Hero:** sublinha editorial *"Existe muita coisa acontecendo dentro de uma empresa."* + fragmentos nomeados (Cliente/Operação/Equipe/Financeiro/Pedidos/Decisões) + frase de chegada da marca (*"Quando as partes começam a conversar, a empresa começa a enxergar melhor."*) + ecos da lente quase invisíveis no fundo.
> - **"O problema"** (novo `fragmentacao-map.tsx`): mapa honesto de silos (informação → lugar onde vive — WhatsApp/planilha/conversa/memória/improviso), linguagem "em muitas empresas, é comum...", fechamento "a decisão fica no improviso" + nota de que não é regra universal.
> - **"A Passagem"** (novo `passagem.tsx`): travessia ANTES (espalhado) → PASSAGEM (`PonteSymbol` central + chip "conexão + contexto") → DEPOIS (visão mais clara) — a identidade se torna o fio condutor da narrativa, sem prometer resultado.
> - **Refinamentos de conteúdo:** PonteEssence com chips "o que ela procura conectar" (pessoas/processos/sinais/decisões/histórico/contexto/melhorias); Realities com cadeias de operação conceituais (Serralheria/Lavação/Barbearia) marcadas como "como a Ponte pode investigar e organizar"; Futuro com rótulos audáveis **Hoje · Em construção · Depois · Futuro** ("existe"/"em desenvolvimento"/"visão"); lentes gigantes quase invisíveis nos fundos de `#a-nova-categoria` e `#a-visao` (eco da identidade).
> - **Limpeza:** `signal-strip.tsx` removido (componente morto, superado pelo mapa de fragmentação + fragmentos do hero).
> - **Status:** typecheck limpo, **build limpo** (rota `/icon` presente), testes verdes (plataforma 5/5 + handoff 4/4). Responsividade validada por medição objetiva de `scrollWidth ≤ clientWidth` no Chrome headless nas larguras 320–1440 (sem overflow horizontal); `prefers-reduced-motion` respeitado.
>
> Ver `docs/05-OPERATIONS/REPORTS/P98-LANDING-EXPERIENCIA.md`.

> **MARCO: IDENTIDADE VISUAL — "A PASSAGEM" — SÍMBOLO INSTITUCIONAL DEFINITIVO — 15 de agosto de 2026**
>
> **A marca ganha personalidade institucional: fragmentos → passagem (lente/portal) → jóia (clareza) + fluxo contínuo (evolução).** Evolução da rodada P-101 ("O Encontro", minimalista demais), mesma filosofia — nada é ponte literal, estrela, cérebro, robô, circuito ou alvo literal. Rodada exclusiva de identidade visual, sem tocar em arquitetura, schema, APIs, rotas, autenticação, Copiloto, descoberta ou multi-tenant.
> - **Conceito "A Passagem":** 6 fragmentos em colunas (informação dispersa) → **lente/portal vertical** formada por 2 arcos (a ponte que não é desenhada — a travessia) → **jóia** central (clareza = núcleo) → **2 fluxos diagonais** que continuam além do quadro (nada é estático). **Segunda leitura: "mira/olho"** — reforça o posicionamento *"antes de melhorar sua empresa, enxergue-a melhor"*.
> - **Componente único** `PonteSymbol`/`PonteLogo` (`ponte-logo.tsx`, surfaces light/dark/mono, variants full/micro) — nav/footer/auth/sidebar herdam a nova marca automaticamente; `AvatarPonte` agora converge na própria marca (substituiu o glifo ✦).
> - **Linguagem P-102 na landing:** 2 lentes gigantes quase invisíveis + pontos no hero (eco da mira) e divisor "A Passagem" (pontos → símbolo → pontos) entre a Fragmentação e o Mapa Vivo.
> - **Assets:** `public/brand/*` (8 SVGs + preview), `public/favicon.svg` e `src/app/icon.svg` (micro sobre azul-noite) atualizados. Tudo dos tokens existentes (institutional-900/primary/evergreen ← l-azure/l-green), nenhuma cor nova.
> - **Status:** typecheck limpo, **build limpo** (69 rotas, incluindo `/icon`), testes verdes (plataforma 5/5 + handoff 4/4). Forma validada programaticamente por amostragem de pixels em 16/20/24/48/96px; decisão estética final em `public/brand/preview.html`.
>
> Ver `docs/05-OPERATIONS/REPORTS/IDENTIDADE-VISUAL.md`.

> **MARCO: P93 — CONSOLIDAÇÃO DO SISTEMA + LANDING VIVA — 12 de agosto de 2026**
>
> **A casa foi limpa e a porta da frente reconstruída: a landing deixou de ser slides que explicam e passou a ser um caminho que demonstra compreensão, sem inventar nenhuma promessa.** Nenhuma funcionalidade nova entrou na sprint — tudo o que foi feito fortalece o que já existia (Regra Final: conhecimento, confiabilidade, capacidade de evolução).
> - **Landing viva (~20 seções, `page.tsx` reconstruído):** narrativa "informação espalhada → conexões → compreensão → melhores perguntas → melhores decisões → empresa que aprende". Novo **mapa vivo** (8 pílulas de informação → linhas → AvatarPonte → clareza), **copiloto demonstrativo** (a descoberta P92/COPILOTO lida pelo que ela lê: "Cliente aprovou o orçamento" → ainda falta sinal de pagamento e prazo), **3 exemplos de valor** (marcados "exemplo conceitual"), **carga cognitiva** (8 dimensões reais do motor), **não-substitui**, **base + pioneiro de categoria** (fato real: `empresaPioneiraId`).
> - **Nada inventado:** os componentes citam apenas o que existe em código (8 dimensões de `copiloto-operacional.ts`, pioneiro de `descoberta-operacional.service.ts`, passos reais do fluxo). Exemplos numericos/claims foram vetados — o que é ilustração está explícito como "exemplo conceitual".
> - **Fixes técnicos P1/P2:** header com link correto (`/configuracoes`), import de `toast` corrigido (`toat`→`toast`, `git mv` preserva histórico), número de WhatsApp unificado via engine (`FOUNDER_WHATSAPP_NUMERO`), 6 componentes mortos deletados (0 referências restantes), nav mobile com menu hambúrguer.
> - **Status:** typecheck limpo, **build limpo** (66 páginas + proxy, `Compiled successfully` + `Finished TypeScript`), 52 testes verdes (copiloto 14 + descoberta 15 + founder-operações 9 + plataforma 5 + handoff 4 + configuração 5). Nenhum schema novo, nenhuma API de negócio alterada, `package.json` intocado.
>
> Ver `docs/05-OPERATIONS/REPORTS/P93-CONSOLIDACAO-PONTE.md` + `GUIA-P93.md` + `ponte-p93-final.zip`.

> **MARCO: COPILOTO OPERACIONAL — A DESCOBERTA VIRA PONTE QUE ACOMPANHA A OPERAÇÃO — 12 de agosto de 2026**
>
> **A descoberta P92 ganha a camada de leitura para decisão: um motor puro que devolve o que já está registrado no caderno transformado em nível de intervenção (Nv 0–4) e "Visão do gerente".** Sem migration, sem rotas novas, sem IA e sem inventar a operação da Souza Mestrinho (P80/P81/P82 seguem bloqueados até campo real).
> - **Arquitetura conceitual** em `docs/03-ENGINEERING/OPERACIONAL/ARQUITETURA_DO_COPILOTO_OPERACIONAL.md`: mapa de eventos e estados, modelo de entradas/relações ("uma vez informado, muitas vezes utilizado"), carga cognitiva (8 dimensões), mapa de atrito, perguntas contextuais, hierarquia Nv 0–4 (recorte dos 7 níveis existentes do `MODELO_DE_INTERVENCAO`), memória operacional, ciclo descobrir→validar→implementar→observar→melhorar, 5 realidades, empresa pioneira, modelo de dados conceitual e mapa de integração.
> - **Motor puro `copiloto-operacional.ts`:** `classificarNivelIntervencao` (Nv 0–4 + motivos, prioridade 4>3>2>1>0), `montarContextoOperacional` (o que aconteceu / estado / responsável / o que falta / risco / decisão pendente — lacunas como "não sabemos"), `avaliarCargaCognitivaPorProcesso` (8 dimensões BAIXA/MEDIA/ALTA), `montarMapaDeAtrito` (nunca inventa frequência/impacto sem dado) e `proximasPerguntasContextuais` (≤3, só com gatilho real). **14 testes verdes.**
> - **Kit de reunião** para o primeiro campo: `docs/05-OPERATIONS/P79/KIT_REUNIAO_SOUZA_MESTRINHO.md` (agenda 90 min, roteiro pela âncora, captura direta para o caderno P92, separação das 5 realidades, critério de aceite).
> - **Decisão de nomenclatura:** nome canônico da empresa = **Souza Mestrinho Metais** (variação informal "Mestre Metais" descartada; registrada em `KNOWN_ISSUES.md`).
> - **Status:** typecheck limpo, build limpo (67 páginas), 14 testes novos + regressão legada intacta (P92 15/15, plataforma 5/5, handoff 4/4). Nenhum arquivo existente alterado em código.
>
> Ver `docs/05-OPERATIONS/REPORTS/COPILOTO-OPERACIONAL.md` + `GUIA-COPILOTO-OPERACIONAL.md` + `copiloto-operacional.zip`.

> **MARCO: P92 — PONTE DESCOBERTA — CADERNO DE CAMPO REAL + PIONEIRO DE CATEGORIA — 12 de agosto de 2026**
>
> **O programa de campo real agora tem instrumento: um caderno de campo digital interno (nível plataforma) para o condutor registrar e organizar o que encontra na empresa.** O P82 havia provado que "OBSERVADO = ∅"; o P92 não inventa dados — constrói o fluxo guiado para que o próximo campo deixe rastro digital, sem IA.
> - **Fluxo obrigatório:** pergunta-âncora P82 (obrigatória no MVP) → participantes → falas → fatos classificados pela taxonomia (7 tipos; hipóteses/informações fornecidas exigem verificação) → processos COMO É → COMO PODERIA SER → divergências (dito × observado) → oportunidades → relatório final (12 seções §21, texto puro).
> - **Engine puro `descoberta-operacional.ts`:** 8 estados com transições, taxonomia com `exigeVerificacao`, template de vertical (ADR-035), progresso/checklist, relatório determinístico (nunca inventa a âncora). **15 testes verdes.**
> - **Pioneiro de Categoria:** a primeira empresa de cada vertical é marcada automaticamente (`empresaPioneiraId`) e exibida como "pioneira de categoria" — patrimônio de aprendizado estrutural.
> - **Páginas:** `/admin/descoberta` (lista por estado) e `/admin/descoberta/[id]` (detalhe com checklist, âncora, participantes, falas, registros, processos, desenhos, divergências, oportunidades, fluxo de estado com confirmação, relatório com copiar, histórico). 15 rotas API com `requirePlataforma` (leitura/escrita).
> - **Migration `012_descoberta_operacional`:** 11 tabelas + 7 enums, aplicada via `prisma migrate deploy`. **Problema registrado:** shadow DB do Supabase não reexecuta a migration `002` (P3006) — migrations novas são escritas à mão.
> - **Status:** typecheck limpo, build limpo, 15 testes novos verdes + legado (5/5 + 4/4). Commit `0929496` publicado em `main`; deploy Vercel automático via integração Git.
>
> Ver `docs/05-OPERATIONS/REPORTS/P92-PONTE-DESCOBERTA.md` + `GUIA-PONTE-DESCOBERTA.md` + `ponte-descoberta-p92.zip`.

> **MARCO: P84 — FOUNDER ACCESS — CAMADA DE PLATAFORMA (IDENTIDADE + RE-GATE + AUDITORIA) — 8 de agosto de 2026**
>
> **P84 criou a camada de plataforma: a identidade que separa quem opera a Ponte (Founder Principal) de quem usa a Ponte (empresas).** Corrige a exposição de dados internos que existia porque `painel-do-fundador` e `/admin/*` eram protegidos pelo mesmo `role: 'ADMIN'` de empresa.
> - **Identidade:** `Usuario.platformRole` (enum `PlatformRole` → `FOUNDER_PRINCIPAL`), atribuída por **bootstrap seguro** (`scripts/provision-founder.ts`, vars server-only `FOUNDER_BOOTSTRAP_*`) — nunca email/URL/localStorage/frontend. Sem segundo login/banco/sessão.
> - **Permissões (5, módulo puro `permissao-plataforma.ts`):** `FOUNDER_VIEW_PLATFORM`, `FOUNDER_VIEW_INTERNAL`, `FOUNDER_VIEW_SYSTEM_HEALTH`, `FOUNDER_MANAGE_PLATFORM`, `FOUNDER_MANAGE_AUDIT_ACCESS` — validadas no servidor (`requirePlataforma`, `temPermissaoPlataformaUsuario`).
> - **Re-gate:** 5 páginas + 5 APIs gateadas para Founder; **ADMIN de empresa perde acesso** às áreas de plataforma. Health público mínimo (`/api/health`) + detalhe privado (`/api/health/plataforma`).
> - **Auditoria (`auditorias_plataforma`):** só escritas privilegiadas (criar/revisar/promover/descartar) — nunca leituras.
> - **Isolamento multi-tenant preservado:** nenhuma mudança em `prismaSeguro`; contexto plataforma = agregados, sem `empresaId` arbitrário.
> - **Status:** implementado + testes verdes; **deploy de produção pendente** (migration `008` + `founder:provision`) — ver `KNOWN_ISSUES.md`.
>
> Ver `docs/07-MILESTONES/P84_FOUNDER_ACCESS.md` e `docs/04-DECISIONS/ADR/ADR-036-founder-access-plataforma.md`.

> **MARCO: P86 — CONVERSA DE CONFIGURAÇÃO COGNITIVA DO FOUNDER (BLOCO B) — 8 de agosto de 2026**
>
> **O Bloco B do P85/P86 está implementado: a Ponte usa a própria conversa para se configurar com o Founder Principal.** B1 (roteamento) + B2 (Fundação Cognitiva) reutilizam 100% do cérebro existente — P70/P72/P73/P77/P78 — sem engines nem tabelas paralelas:
> - **P86-1:** `decisaoFluxoInicial` em `configuracao-founder.ts` — só `FOUNDER_PRINCIPAL` sem configuração concluída entra no fluxo `configuracao-founder` (13 interações/6 blocos); qualquer outro caso segue `primeira-conversa`.
> - **P86-2 (guarda `ehConversaFounder` nos 4 motores):** hipóteses `founder_*` (dependência, construção, decisão por evidência/momento, conhecimento na cabeça/sistema, trava) com `forca`/`confianca`; leitura P72 com a contradição "centralidade × querer girar com menos"; descobertas P77 conectando ≥ 2 respostas com guarda de evidência (`insuficiente`); carta P49 que fala da **Ponte** com o `atencao.nao_dito` como **lacuna investigável**; **Retrato Inicial** P73 em 7 seções.
> - **Determinístico, sem IA; um único caminho de persistência** (idempotente por versão); comportamento da Primeira Sessão de empresas preservado 100% (testes comprovam).
> - **Status:** testes 21/21 (`configuracao-founder-cognitivo.test.ts` 11 + legado 10), `tsc` e `npm run build` limpos (63 rotas); **deploy de produção pendente** (migrations `008`+`009` + `founder:plantar-fundacao`) — ver `KNOWN_ISSUES.md`.
>
> Ver `docs/07-MILESTONES/P86_CONFIGURACAO_COGNITIVA.md`.

> **MARCO: P85 — A PONTE USA A PONTE — IDENTIDADE DEFINITIVA (BLOCO A) — 8 de agosto de 2026**
>
> **A Ponte Digital torna-se a primeira empresa real que usa o próprio Business OS.** Bloco A (Fases 1–6) implementado; **Bloco B (Fases 7–10: Conversa de Configuração Cognitiva P86) implementado — ver o marco P86 acima**.
> - **Modelo (`migration 009`):** enum `PlatformRole` alargado para `FOUNDER_PRINCIPAL | FOUNDER | APOIADOR` (só vocabulário — NENHUMA permissão nova); nova tabela `EmpresaUsuario` (`empresa_usuarios`) — associação explícita usuário ↔ empresa com `role`/`ativo`, `@@unique([empresaId, usuarioId])`. `Usuario.empresaId` permanece como empresa principal (compatibilidade total).
> - **Permissões:** `FOUNDER`/`APOIADOR` têm **zero** permissões de plataforma (regra "não inventar privilégios"); a matriz continua resolvendo apenas `FOUNDER_PRINCIPAL`.
> - **Multi-tenancy:** `empresa_usuarios` entra nos `MODELOS_MULTI_TENANT` do `prismaSeguro` — membership respeita o tenant guard.
> - **Fundação plantada:** script idempotente `scripts/plantar-fundacao.ts` garante a empresa **Imperador** (slug `imperador`, Apoiador nº1 / Fundador nº1), numera a **Ponte Digital canônica** (`slug: ponte-digital`, do seed) com os números nº2, provisiona o **Founder Principal** (`FOUNDER_PRINCIPAL` via env `FOUNDER_BOOTSTRAP_*`) e cria a **membership ADMIN** do Founder na empresa canônica. **Duplicatas de "Ponte Digital" de fases anteriores não são tocadas** (histórico preservado).
> - **Status:** `tsc`, `test:plataforma` (5/5) e `npm run build` limpos; **deploy de produção pendente** — migrations `008`+`009` + rodar `founder:plantar-fundacao`.
>
> Ver `docs/07-MILESTONES/P85_PONTE_USA_A_PONTE.md` e `docs/04-DECISIONS/ADR/ADR-037-founder-identidade-membership.md`.

> **MARCO: P82 — O CAMPO REAL — INVESTIGAÇÃO (SEM CÓDIGO) — 8 de agosto de 2026**
>
> **P82 executou o programa de campo e confirmou o bloqueio do Motor Operacional: não existe NENHUM registro real de campo** (nenhum `REGISTRO_CAMPO` preenchido, nenhuma planilha ou anotação bruta da Souza Mestrinho no repositório). Pela regra absoluta do programa, **OBSERVADO = ∅, DITO = 3 declarações do enunciado do P79, o restante NÃO SABEMOS — nada se inventa.**
> - **Entregue:** `docs/07-MILESTONES/P82_O_CAMPO_REAL.md` (27 seções, classificação centralizada OBSERVADO/DITO/INFERIDO/NÃO SABEMOS). Gate A–F do P82: **BLOQUEADO** — veredito: P82 NÃO concluído.
> - **Método ancorado:** `PROTOCOLO_DA_OBSERVACAO_REAL` (P26) — primeiro uso fora da Empresa Zero; captura pelo template `REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md`.
> - **Pergunta-âncora** ("Qual é a única bagunça...?"): **sem resposta**. Unidade operacional: **não escolhida**.
> - **P83 (A Unidade Operacional) NÃO abre** até existir registro real que sustente hipótese operacional.
>
> Ver `docs/07-MILESTONES/P82_O_CAMPO_REAL.md`.

> **MARCO: P80 + P81 — MOTOR OPERACIONAL: INVESTIGAÇÃO, SEM CÓDIGO — 7 de agosto de 2026**
>
> **P80 e P81 estão em estado de **documentação conceitual** — NENHUMA funcionalidade implementada, NENHUMA migration.** A auditoria confirmou que **não existe evidência de campo** da Souza Mestrinho (nenhum registro `OBSERVADO`/`DITO`); pela regra absoluta do programa, **não se inventa o workflow**. O que foi entregue: a **auditoria do P79** (fato × hipótese), o **inventário de compatibilidade real** (Event `cognitive-bus`/`event-store` gravam `eventos`; `Implantacao/EtapaImplantacao` são o padrão a generalizar; `Cliente/Lead/Tarefa/Historico/Transacao/AcaoCognitiva/MemoriaCognitiva` reutilizáveis), o **mecanismo de captura** (`REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md`) e o **plano de fases 0→8 com gates**.
> - **Status do gate:** P80 bloqueado até um `REGISTRO_CAMPO` real (visita à Souza Mestrinho) responder à pergunta-âncora e documentar fluxo/paradas/dependências.
> - **Lacuna registrada:** "Atlas" (citado no P80) **não encontrado** no repositório — a investigar antes de qualquer uso.
> - **Verdict da Parte 22:** direção estratégica = "compreender como o trabalho acontece e aprender"; afirmação adiada até evidência.
>
> Ver `docs/07-MILESTONES/P80_MOTOR_WORKFLOW.md` e `docs/07-MILESTONES/P81_APRENDIZADO_OPERACIONAL.md`.

> **MARCO: P79 — MOTOR OPERACIONAL — TESE DE FASE (MAPEAMENTO, SEM CÓDIGO) — 7 de agosto de 2026**
>
> **Nova tese de produto registrada como hipótese de fase, sem funcionalidade implementada.** A Ponte Digital passa a investigar a camada **Operações** (Cliente → Demanda → Orçamento → Execução → Entrega → Relacionamento) como um **motor configurável por vertical** — o CRM, o financeiro e o assistente continuam; o que surge é o "Motor Operacional" com a **Ordem de Serviço como ficha viva** (tipo de trabalho + workflow + etapas + histórico + fotos + materiais + ocorrências). O laboratório real é a **Souza Mestrinho Metais** (serralheria, ~8 funcionários, Palhoça) — primeiro ambiente de descoberta, NÃO "o sistema da Souza".
> - **Princípio-guia (ADR-035):** universal → CORE (modelo universal); específico de segmento → **template vertical** (configuração/metadados, NUNCA módulo novo); particular de um cliente → configuração tenant ou não implementar.
> - **P79 = zero código:** entregas são documentais — `MOTOR_OPERACIONAL_TESE.md`, `ADR-035`, `docs/03-ENGINEERING/OPERACIONAL/DOMINIO.md` (mapa existe/a criar) e o kit de campo `ROTEIRO_CAMPO_SOUZA_MESTRINHO.md`.
> - **Já existe para reutilizar:** Event Engine (`Event`/`EventSubscription`/`DeadLetter` + ADR-011) e o padrão de etapas (`Implantacao`/`EtapaImplantacao`) — o novo motor generaliza, não duplica.
> - **Gate de saída:** P80 (Motor de Workflow) só abre após observação real de campo na Souza Mestrinho e resposta à pergunta-âncora *"Se pudéssemos eliminar uma única bagunça da empresa hoje, qual seria?"*.
>
> Ver `docs/07-MILESTONES/P79_MOTOR_OPERACIONAL.md`.

> **MARCO: P74 — A CONVERSA QUE PARECE HUMANA — STATUS OFICIAL (comportamental) — 6 de agosto de 2026**
>
> **"O empresário nunca deve sentir que está falando com um roteiro, com uma IA ou com um chatbot — deve sentir que existe alguém prestando atenção."** A Ponte aprende a **conversar como um excelente conselheiro** — sem telas, módulos, banco, rotas ou funcionalidades; determinístico (sem IA), tudo na camada de reação da primeira sessão (`sistema/src/engine/reacoes.ts`):
>
> - A fala deixa de ser "uma reação" e vira **conversa**: aberturas variadas ("Tem uma curiosidade minha.", "Posso te perguntar uma coisa?") → nunca duas respostas começam iguais; **a hipótese mudou** ("Enquanto você respondia, minha hipótese mudou") — a Ponte mostra que raciocina; **pequenos silêncios** ("Entendi.", "Hm..."); **humildade intelectual** antes de toda percepção e em 1 a cada 3 devolutivas de bloco ("Posso estar interpretando errado."); **surpresa discreta** só com sinal forte.
> - **Perguntar antes de explicar um conflito:** `contradicaoDurante` detecta a tensão real entre respostas (crescimento × dependência) e a Ponte PERGUNTA ("Parece existir uma contradição... Posso explorar isso com você?") em vez de explicar — o empresário sente controle.
> - **Mudança de direção** (P71) permanece no topo: fechar/vender/demitir interrompe o roteiro.
> - Sem coaching, sem elogio, sem teatro. **Aprovação depende de empresários reais** (frases espontâneas como "Parecia que você estava acompanhando meu raciocínio").
>
> Ver `docs/07-MILESTONES/P74_CONVERSA_QUE_PARECE_HUMANA.md`.

> **MARCO: P78 — A PONTE QUE ACOMPANHA (RITMO 12s + CICLO DE EVOLUÇÃO COGNITIVA) — STATUS OFICIAL — 7 de agosto de 2026**
>
> **"A Ponte deixa de entender o empresário e passa a caminhar com ele."** Sem novo módulo, dashboard, banco ou IA generativa — compõe o patrimônio existente e faz as peças começarem a **relação longitudinal**:
>
> - **Ritmo de leitura 7s → 12s** (`sistema/src/lib/ritmo.ts` + `app/conversa/page.tsx`): fonte única `RITMO_DEVOLUTIVA_MS=12000` para timer lógico **e** barra visual (nunca mais barra=12s/timer=7s). Os 12s são **espaço cognitivo, não loading** — a devolutiva é algo que vale a pena ler; "Continuar agora" está disponível imediatamente, com trava de transição única (sem dupla transição/race condition).
> - **Descobertas P77 continuam vivas**: agora persistidas em `MemoriaCognitiva` (`tipo 'descoberta'`, origem `MOTOR_DAS_DESCOBERTAS_P77`, pelo `persistirDescobertas` no finalizar). A sessão seguinte pode **retomá-las** e observar evolução.
> - **Pergunta viva nasce da descoberta** (`relacao-engine.ts`): quando nenhuma regra de palavras fecha, a Pergunta Viva vira continuidade real — "Na nossa última conversa percebemos algo ainda em aberto. Você descobriu alguma coisa nova desde então?" (o retorno parece continuação, nunca "quer fazer uma nova sessão?").
> - **Ciclo cognitivo (P78–22):** OBSERVAÇÃO → DESCOBERTA → DECISÃO → AÇÃO → RESULTADO → APRENDIZADO → NOVA EVOLUÇÃO — baseado nas estruturas existentes (`MemoriaCognitiva`, `RespostasConversa`, `Hipotese.estado`, `AcaoCognitiva` com `resultado`, `PerguntaViva`). SABEMOS/ACREDITAMOS/INVESTIGANDO preservados; comparação antes/agora só com evidência, nunca "você melhorou".
> - **Decisão de arquitetura:** `ObjetoEvolucao` é conceito composto (sem migration); P65/P66/P68/P69.5 já cobrem período temporal — nada duplicado.
>
> Ver `docs/07-MILESTONES/P78_ACOMPANHAMENTO_COGNITIVO.md`.

> **MARCO: P72 + P73 — ENGENHARIA DA TRANSFORMAÇÃO (ESPELHO EMPRESARIAL + EXPERIÊNCIA DA DESCOBERTA) — STATUS OFICIAL — 5 de agosto de 2026**
>
> **"A Ponte não existe para responder perguntas. Existe para mudar a forma como o empresário pensa sobre a própria empresa."** O Retrato da primeira sessão deixa de informar e passa a **revelar** — sem módulos, funcionalidades, IA ou telas; determinístico:
>
> - **P72 — Espelho Empresarial (`gerarLeituraCognitiva`):** a Ponte conecta causas, não respostas isoladas — **relações** ("o problema que você considera financeiro talvez seja operacional — o caixa é o sintoma de uma operação que depende de você"), **mapa mental** (pressão → centralização → sobrecarga → crescimento limitado → caixa apertado, "é um sistema"), e **contradições** ("você quer crescer, mas a empresa para sem você — talvez estejam em conflito") — tudo a partir das palavras reais, nunca sem evidência.
> - **P73 — Experiência da Descoberta:** o Retrato vira **jornada** — 1) O que eu achava que você era; 2) O que eu fui percebendo (relações + contradições); 3) O que hoje parece me importante; 4) O ponto que talvez você ainda não esteja olhando; 5) A decisão que eu não decidiria com pressa; 6) A conversa daqui a alguns dias. **Mostra a evolução da própria Ponte** ("eu achava... fui percebendo... hoje acho"), **discorda com evidência** e entrega uma **frase inesquecível** em destaque.
> - Cerimônia retrabalhada para falar de *relações, padrão e descoberta*.
>
> Ver `docs/07-MILESTONES/P72_P73_ENGENHARIA_DA_TRANSFORMACAO.md`.

> **MARCO: P70 + P71 — EXPERIÊNCIA COGNITIVA V1 (PRIMEIRA IMPRESSÃO + RITMO COGNITIVO) — STATUS OFICIAL — 5 de agosto de 2026**
>
> **"A Ponte deixa de parecer um software e passa a parecer um conselheiro."** A primeira conversa muda de experiência — sem funcionalidades, módulos, IA, telas ou migrations; tudo determinístico:
>
> - **Ritmo cognitivo imprevisível (`montarRitmoCognitivo`):** após cada resposta a Ponte escolhe a fala em ordem de prioridade — **mudança de direção** se a resposta revela algo grande (fechar/vender a empresa, demitir → "Espera. Isso é grande demais...") → **contrapergunta** (aprofundamento: "Quando você diz que a empresa para sem você... fala das decisões ou da operação?") → **conexão** com o que foi dito minutos antes (crescimento × dependência, previsão × caixa) → **percepção como hipótese** (P65) → **ritmo** que alterna deterministicamente entre recompensa, silêncio inteligente, pensar em voz alta e pequeno mistério (hash estável — mesmo input, mesmo output).
> - **Pensar em voz alta + pequenos mistérios:** "Interessante...", "Isso muda um pouco minha percepção", "Espera... isso conecta com outra coisa que você comentou", "Tem uma coisa interessante aparecendo aqui..." — a Ponte nunca é previsível e nunca comenta todas as respostas do mesmo jeito.
> - **Motivo implícito:** removido o rótulo "Por que pergunto:" do QuestionCard — a razão de cada pergunta agora aparece em tom de quem pensa junto, nunca como formulário.
> - **Primeira pergunta emocional:** `empresa.momento` abre com *"Antes de qualquer coisa... quero entender como você enxerga sua empresa neste momento. Não financeiramente. Mas como empresário."*.
> - **Ritual de digestão variável:** a frase sob a reação varia em sequência estável ("Deixa eu digerir...", "Interessante... deixa eu pensar...", etc.).
> - **Decisão documentada:** contrapergunta vive na camada de reação (reflexão sem bloquear) — campo de resposta interativo seria nova feature, fora do escopo.
>
> Ver `docs/07-MILESTONES/P70_P71_EXPERIENCIA_COGNITIVA_V1.md`.

> **MARCO: P69.5 — A PRESENÇA COGNITIVA PERMANENTE (VERSÃO FUNDACIONAL) — STATUS OFICIAL — 5 de agosto de 2026**
>
> **"Ao abrir a Ponte, o empresário deve sentir: minha empresa continuou sendo compreendida enquanto eu vivia minha rotina."** O P69.5 transformou a abertura — ela deixou de parecer um dashboard com cards e virou **continuidade da conversa** (sem migrations, rotas, telas, módulos ou funcionalidades novas; determinístico, sem IA):
>
> - **A primeira tela não é um dashboard:** abertura com saudação pelo nome e *"Enquanto você esteve trabalhando na empresa, algumas coisas continuaram chamando minha atenção..."*.
> - **5 camadas em toda abertura:** **Continuidade** (nunca "bem-vindo", sempre "na nossa última conversa..." via `montarContinuidadeConversa`) → **Observação** (interpreta, não repete fato) → **Conexão** (liga decisão em aberto + hipótese, ou decisões empilhadas — "talvez exista uma ordem mais segura") → **Prioridade** (POR QUE conversar, nunca lista de tarefas) → **Convite** ("Vamos pensar nisso juntos?", parece conversa, não botão).
> - **Nunca cards:** assuntos viram **pequenas conversas** ("Tenho pensado em uma coisa. Há uma decisão em aberto..."). Proibidos: cards genéricos, listas, KPIs protagonistas, "você possui"/"existem"/"foram encontrados", linguagem técnica.
> - **Momentos:** cada abertura tem uma intenção por sinal mais forte — revisar decisão antiga (≥14 dias), oportunidade (decisão aberta), dúvida (hipótese de alto impacto), evolução, ou *"nada urgente — isso é uma boa notícia"*.
> - **Nunca vazia:** sem decisões/hipóteses, a Ponte oferece a pergunta viva ou uma reflexão — sempre tem algo inteligente para conversar.
> - **Dashboard vira secundário:** ordem da home é conversa → agenda → reflexões → módulos.
>
> Ver `docs/07-MILESTONES/P69_5_PRESENCA_COGNITIVA_PERMANENTE.md`.

> **MARCO: P69 — CONVERSA PERMANENTE — STATUS OFICIAL — 4 de agosto de 2026**
>
> **"A Ponte Digital não é um lugar onde você entra para responder perguntas. É um lugar que acompanha continuamente a história da sua empresa e sempre mostra o que realmente merece sua atenção antes da próxima decisão."** A Ponte deixa de ser sistema de consultas e conduz a continuidade (sem migrations, rotas, telas ou módulos novos):
>
> - **Agenda Inteligente (`motor-continuacao.ts`):** engine determinística (sem IA) que decide o que merece atenção **hoje**, por **contexto** (história da empresa), nunca por data. Critérios em ordem de peso: decisão acompanhada sem retorno (P68, ≥ 3 dias), hipótese importante não validada (P65/P66), evolução após tempo sem conversar via `montarContinuidadeConversa`. Cada item com prioridade Alta/Média/Baixa; **nunca mais que 3**.
> - **Abertura da Ponte (`abertura-do-dia.tsx`):** ao abrir, **antes de qualquer módulo**, o empresário encontra **"Hoje vale conversarmos sobre..."** — cards clicáveis (motivo legítimo + pergunta + opções) + convite *"Tem alguma decisão acontecendo hoje?"* + CTA **"Conversar agora"**. O Ritual Diário desceu; a abertura vira o primeiro bloco da home.
> - **Princípios garantidos:** nunca interrompe sem razão legítima; nunca "você está há X dias sem acessar" (substituído por razão baseada na história); agenda vazia mostra só a mensagem gentil; nunca cria tarefa/agenda/calendário/gamificação. A abertura dura menos de um minuto.
>
> Ver `docs/07-MILESTONES/P69_CONVERSA_PERMANENTE.md`.

> **MARCO: P68 — O CICLO DE DECISÃO EMPRESARIAL — STATUS OFICIAL — 4 de agosto de 2026**
>
> **"A Ponte não apenas lembra o que sua empresa fez. Ela acompanha as decisões que estão construindo o futuro dela."** A Ponte deixa de aconselhar e passa a **acompanhar decisões reais até o resultado** — sem novas telas, sem módulos, conectando o que já existe (P66 ↔ Centro de Decisão + memória decisória):
>
> - **Conselheiro → Decisão acompanhada (Parte 1):** quando o conselheiro (P66) detecta uma decisão (contratar, demitir, preço, empréstimo, expansão, compra), um registro `AcaoCognitiva` (origem `ASSISTENTE`) é criado com a **Origem** (o que o empresário disse), o **Contexto** (sinais reais), a **Hipótese** (a reflexão, sempre como hipótese) e as **Lacunas** — tudo no campo `Json` `impactoEsperado`, sem migration. Dedupe anti-poluição: não duplica decisão aberta da mesma categoria em 30 dias. O convite *"posso acompanhar essa decisão com você?"* entra no prompt via bloco **DECISÃO ACOMPANHADA**.
> - **Patrimônio Decisório (Parte 3):** a Ponte sabe *"essa empresa já tomou decisões parecidas?"* — o conselheiro carrega as decisões anteriores e as cita no raciocínio (SABEMOS quando há resultado; decisões do mesmo tipo com data na memória); o Assistente expõe a seção **DECISÕES JÁ TOMADAS OU ACOMPANHADAS** no prompt. O Centro de Decisão lista também decisões de origem `ASSISTENTE` — a decisão que "ganhou vida" na conversa evolui ali (PATCH: status, o que aconteceu, o que aprendeu, se ajudou).
> - **Decisão de implementação:** ciclo rico (7 estados) representado nos campos `Json` mantendo os 4 estados atuais (#5 do P68) — zero migration. **Parte 4 (loop automático) adiada** (#6 do P68, `KNOWN_ISSUES.md`). Nada de calendário, tarefas genéricas, CRM de decisão ou dashboard.
>
> Ver `docs/07-MILESTONES/P68_CICLO_DE_DECISAO_EMPRESARIAL.md`.

> **MARCO: P67 — EXPERIÊNCIA COGNITIVA DE CONVERSA V1 — STATUS OFICIAL — 4 de agosto de 2026**
>
> **"A Ponte não coleta dados. A Ponte ajuda o empresário a pensar sobre a própria empresa."** A primeira conversa deixou de parecer formulário e virou aconselhamento (sem funcionalidades novas de domínio):
>
> - **Novo modelo de pergunta:** toda pergunta estratégica tem 4 elementos — **contexto** (amarra ao que já foi falado), **motivo** (por que importa), **pergunta** e **opções (3–5) + "Minha situação é diferente"** (campo aberto). O empresário nunca sente que está preenchendo dados: vê o contexto como convite e o motivo como nota "Por que pergunto". Nenhuma pergunta estratégica aceita só caixa de texto vazia.
> - **Toda resposta gera reação:** devolutivas de fim de bloco citam as palavras reais do empresário, como um conselheiro que leu.
> - **Ritual de 7 segundos:** a percepção fica ~7s com barra de preenchimento (não é spinner, é ritual) e o botão **"Continuar agora"** está sempre disponível.
> - **Sessão V4 em 4 blocos (`atual`/`peso`/`evolucao`/`atencao`)** — 10–14 interações núcleo (até 16 com condicionais de adaptação P65). IDs de pergunta **preservados**; apenas a agrupação em blocos mudou. Sinais por palavras-chave das hipóteses reconduzidos nos novos rótulos.
> - **Retrato V4 — "Primeiro diagnóstico cognitivo da empresa":** 6 seções, com a tripartite **O que sabemos / O que acreditamos / O que precisamos observar** na seção de decisão. Sempre consequência de hipóteses sobre respostas reais, nunca template.
> - **Alteração deliberada a monitorar:** `historia.orgulho` saiu do fluxo ativo (teto de 14 interações); permanece null-safe nas engines, candidata a voltar no P68.
>
> Ver `docs/07-MILESTONES/P67_EXPERIENCIA_COGNITIVA_DE_CONVERSA_V1.md`.

> **MARCO: P66 — O CONSELHEIRO EMPRESARIAL — STATUS OFICIAL — 4 de agosto de 2026**
>
> **"A Ponte não responde imediatamente. A Ponte pensa junto."** Mudança de comportamento do Assistente (sem funcionalidades novas, sem tela, sem schema):
>
> - **Nunca responde imediatamente:** quando o empresário traz uma decisão importante (contratar / dispensar / mexer em preços / comprar equipamento / pegar empréstimo / expandir), o Assistente segue uma ordem obrigatória e nunca invertida: o que estou percebendo → por que chamou minha atenção → o que ainda não sabemos → 1–2 perguntas que realmente importam → só então, **se houver evidência**, reflexão.
> - **Raciocínio determinístico (`conselheiro-engine.ts`):** a IA é interface, não cérebro. O raciocínio é construído em código antes do modelo, com dados e memória reais — detecção da decisão, sinais de contexto (caixa apertado, sobrecarga, receio), tensões que comparam o que ele diz hoje com o que contou meses atrás, e níveis de confiança em tudo: **sabemos / acreditamos / investigando**.
> - **Biblioteca Socrática (`perguntas-socraticas.ts`):** patrimônio intelectual de 30 perguntas (5 por categoria) que constroem decisão; a IA adapta às palavras dele, nunca inventa pergunta nova.
> - **Memória participa da decisão:** respostas passadas, pergunta viva, memórias emocionais e hipóteses entram como material ("oito meses atrás você dizia X... hoje você diz Y... o que mudou?"). Sem evidência, a Ponte não recomenda — fica nas perguntas. Cada intervenção gera evidência (origem ASSISTENTE).
>
> Ver `docs/07-MILESTONES/P66_CONSELHEIRO_EMPRESARIAL.md`.

> **MARCO: P65 — MEMÓRIA EMPRESARIAL VIVA — STATUS OFICIAL — 4 de agosto de 2026**
>
> **"A Ponte não guarda dados. A Ponte guarda a evolução da empresa."** P65 refinou em profundidade o que já existia — sem funcionalidades novas:
>
> - **Primeira sessão adaptativa:** o fluxo deixou de ser obrigatório. `CondicaoEtapa` (`apenasSe`/`pularSe`) faz a conversa responder ao empresário: quem tem equipe/delegação pula a pergunta básica sobre a própria hora; quem fala em crescer recebe "Crescer costuma significar coisas diferentes..." (vender mais / ganhar mais / trabalhar menos / abrir novas unidades). Micro devolutivas de percepção durante a conversa, sempre como hipótese.
> - **Retrato V3 em 6 partes** — inclui a nova seção "O que talvez você ainda não esteja percebendo" (ponto cego por hipótese).
> - **Cerimônia em 4 passos** (Organizando... Conectando padrões... Analisando sua empresa... Preparando seu Retrato...) e **Retrato compartilhável** ("Copiar meu Retrato", sem PDF).
> - **Memória Viva em painéis:** a timeline morreu. `/minha-jornada` agora mostra **5 painéis de evolução** (Empresa, Fundador, Decisões, Clientes, Operação), cada um respondendo "Estamos evoluindo?" com ANTES (1ª sessão) → HOJE (última sessão) → interpretação. Selos de confiança em cada painel (sabemos / acreditamos / investigando). Narrativa primeiro, gráficos nunca.
> - `/historico` sai da sidebar e redireciona para `/minha-jornada`; timeline morta removida. Sem migrations.
>
> Ver `docs/07-MILESTONES/P65_MEMORIA_EMPRESARIAL_VIVA.md`.

> **MARCO: P70 — PRIMEIRA SESSÃO ESTRATÉGICA V3 — STATUS OFICIAL — 3 de agosto de 2026**
>
> **A primeira conversa deixou de ser um questionário e virou uma descoberta.** A auditoria P59–P63 apontou que a primeira sessão começava com 4 perguntas de cadastro, as perguntas não evoluíam e o valor só aparecia no final. **P70 reconstruiu a primeira sessão:**
>
> - **7 blocos, 16 perguntas** — cada bloco responde "o que eu consigo concluir agora?" (Momento / Como decide / Dependência / Clientes / Dinheiro / Energia / Visão). As 4 perguntas cadastrais saíram da conversa (criar-conta já coleta nome + nome da empresa).
> - **A Ponte conversa citando evidência** — devolutiva de fim de bloco com as palavras reais do empresário ("Percebi isso porque você comentou que..."), nunca "acho que".
> - **Motor de hipóteses estratégicas** (determinístico, sem IA) — dependência do fundador, maturidade operacional, conhecimento do cliente, previsibilidade financeira, sobrecarga. Persistido ao finalizar (memória cognitiva + SinalValor). **Retrato é consequência das hipóteses, nunca template.**
> - **Retrato novo em 5 partes** — Quem sua empresa parece ser hoje / O que mais chamou minha atenção (3 descobertas, não forças) / O que merece atenção primeiro / A decisão que eu observaria ("Se eu estivesse no seu lugar...") / Uma pergunta para nossa próxima conversa.
> - **Cerimônia de entrega** — "A conversa terminou. Agora quero organizar tudo o que consegui entender." (~3s) e o Retrato surge seção por seção.
>
> Ver `docs/07-MILESTONES/P70_PRIMEIRA_SESSAO_ESTRATEGICA_V3.md`.

> **MARCO: P64 — O RETORNO — STATUS OFICIAL — 3 de agosto de 2026**
>
> **A primeira sessão agora vira relação.** A auditoria P59–P63 apontou que a primeira sessão entregava o Retrato, mas não existia mecanismo de retorno/evolução no produto (o Protocolo Founder 1–10 era manual). **P64 fechou o loop de retorno:**
>
> - **Agendamento:** finalizar a primeira conversa agenda um retorno para **7 dias depois** (`Conversa.retornoDisponivelEm`) — a Ponte não cobra, apenas lembra que quer saber o que aconteceu.
> - **Check-in de 1 minuto:** quando o empresário volta e a janela está aberta, `/conversa` mostra, junto do Retrato (nunca o bloqueando), _"O que aconteceu depois da nossa conversa?"_ (Voltei a olhar a empresa / Comecei algo que a conversa apontou / Mudou minha visão / Ainda não fiz nada) + texto livre.
> - **Evidência real:** a resposta vira `SinalValor RETORNO_7_DIAS` e grava `EventoAtivacao.PRIMEIRO_RETORNO` (que alimenta o nível Fundador Validado). Funil anônimo preservado (pendência → conta, mesmo padrão da Clareza).
> - **Painel do Fundador:** nova métrica `retornosRegistrados` em "Transformação, não funcionalidades" (P63).
>
> Ver `docs/07-MILESTONES/P64_O_RETORNO.md`.

> **MARCO: P59–P63 — EXPERIÊNCIA FOUNDER V2 — STATUS OFICIAL — 3 de agosto de 2026**
>
> Refinamento definitivo da experiência Founder, sempre por evidência real (regra V4 Founder — nada artificial).
>
> **P59 V2:** nova pergunta de tensão "Se você precisasse se afastar por 30 dias, o que aconteceria com a empresa?" (`empresa.dependencia`) no fluxo de conversa e no mapeamento de estágios. **Retrato Estratégico 6 partes não-genérico** (subtítulo e primeiro movimento ancorados na resposta real — nada de texto que sirva para qualquer empresa). Landing com CTA direto para `/conversa`. **Área Founder completa** em `/fundador` (tese, como a Ponte aprende, patrimônio, evidências reais, Inteligência Coletiva com gates, roadmap, "o que acreditamos" como hipóteses, WhatsApp). Rota `/tornar-se-fundador` pública.
>
> **P60 (Memória Empresarial Viva):** página `/memoria` no menu — o patrimônio da empresa (decisões com status/resultado/feedback, aprendizados, clarezas com categoria, evoluções, sessões) com CTA para continuar conversa em aberto. Módulo `'memoria'` liberado na experiência cognitiva.
>
> **P61 (Conselheiro de Decisões):** **"Pensar antes de decidir"** em `/centro-decisao` — o empresário registra a decisão com 5 perguntas (o que / por quê / resultado esperado / riscos / condição de sucesso) e a fecha com "o que aconteceu / o que aprendemos" + feedback (`FeedbackAcao`). APIs `POST`/`GET` `/api/centro-decisao/decisoes` e `PATCH` `/.../[id]` com marcos de experiência.
>
> **P62 (Conhecimento Coletivo):** engine `inteligencia-coletiva.ts` com gates de maturidade (10 coleta / 50 comparação / 100 hipóteses / 500 conhecimento / 1000 recomendações maduras) e padrões coletivos apenas `VALIDADO+` — sempre agregações, jamais dados de uma empresa. Seção no Painel do Fundador (ADMIN).
>
> **P63 (Métricas de Transformação):** `operacao-founder.ts` mede transformação (sessões, clarezas por categoria, retorno espontâneo, primeiras decisões/evoluções, apoiadores/founders) no Painel do Fundador como "Transformação, não funcionalidades".
>
> Ver `docs/07-MILESTONES/P59_PRIMEIRO_VALOR_RETENCAO.md`, `P60_MEMORIA_EMPRESARIAL_VIVA.md`, `P61_CONSELHEIRO_DE_DECISOES.md`, `P62_CONHECIMENTO_COLETIVO.md`, `P63_ESCALA_COMERCIAL.md`.

> **MARCO: P59 — PRIMEIRO VALOR E RETENÇÃO FOUNDER V1 — STATUS OFICIAL — 2 de agosto de 2026**
>
> A Ponte passa a medir e provar utilidade, não impressionar. **Protocolo Founder 1–10** criado para acompanhar os primeiros 10 empresários (antes da Ponte / depois da primeira conversa / depois de 7 dias). **Clareza Gerada agora é evidência**: check-in pós-conversa com categorias (Nova percepção / Confirmação / Mudança de decisão / Nenhum impacto), gravado no SinalValor via `/api/conversa/clareza`. **Retrato Estratégico evoluído para 6 partes** (contexto, o que já construiu, risco de continuar igual, decisão a priorizar, primeiro movimento, pergunta que continuaremos acompanhando). **Linguagem externa**: "Primeira Sessão Estratégica" no funil gratuito. Critérios finais (10 empresários, depoimentos, evidências de retorno) dependem de humanos — pendência operacional.
>
> Ver `docs/07-MILESTONES/P59_PRIMEIRO_VALOR_RETENCAO.md` e `docs/05-OPERATIONS/PROTOCOLO_FOUNDER_1-10.md`.

> **MARCO: P57A+B — EXPERIÊNCIA DE VALOR + PERTENCIMENTO V1 — STATUS OFICIAL — 2 de agosto de 2026**
>
> A primeira interação entrega valor percebido imediato e pertencimento real.
>
> **P57A (Diagnóstico Estratégico):** nova entrega **Retrato Estratégico da Empresa** em 5 partes (entendimento → forças → pontos de evolução → decisão mais importante → próxima reflexão), gerado ao finalizar a primeira conversa de forma determinística (sem IA). Métrica **Clareza Gerada** registrada via SinalValor (pergunta inicial, descoberta, decisão sugerida — sem score artificial). **Raio-X Inicial** entregue gratuitamente antes do cadastro. **Exploração de cenários** (`/explorar`): "Como seria se..." sempre "Com base no que sabemos hoje..." — nunca prevê futuro.
>
> **P57B (Pertencimento):** toda conta criada recebe número único e permanente (`Apoiador #0001`...), gravado na `Empresa` (`numeroApoiador`/`numeroFundador`, migração 006). Página **"Tornar-se Fundador"** (`/tornar-se-fundador`) — evolução, não venda — com benefícios de participação simbólica e botão **"Quero ser Fundador"** → WhatsApp `48991133397`. Promoção Apoiador→Fundador manual inicialmente.
>
> Ver `docs/07-MILESTONES/P57A_DIAGNOSTICO_VALOR.md` e `docs/07-MILESTONES/P57B_FOUNDER_E_PERTENCIMENTO.md`.

> **MARCO: P58 — FOUNDATION FREEZE OPERACIONAL V1 — STATUS OFICIAL — 2 de agosto de 2026**
>
> **A Ponte Digital passa a ser uma empresa operacional.** Deixa de ser "um sistema que está sendo construído" e passa a ser **"uma empresa de tecnologia aprendendo com seus primeiros usuários."** A partir de P58, nenhuma funcionalidade é criada por ideia interna — toda evolução nasce de comportamento, pedidos, dificuldades e decisões dos Founders (Árvore de Decisões de Produto + critérios de novos desenvolvimentos). Estabilidade, segurança multi-tenant, qualidade da experiência e segurança da IA (regra _"Com base no que entendemos..."_) congeladas como contrato operacional. Produção live em `https://ponte-digital.vercel.app` (produção == `main`), estrutura pronta para Founder 1, 10 e 50.
>
> Ver `docs/07-MILESTONES/P58_OPERATION_FREEZE_V1.md`, `docs/07-MILESTONES/P57A_DIAGNOSTICO_VALOR.md` e `docs/07-MILESTONES/P57B_FOUNDER_E_PERTENCIMENTO.md`.

> **MARCO: Stable Release V3 — Preparação Definitiva para Produção — 29 de julho de 2026**
> 
> Programas 21 a 47 concluídos. Fundação completa, congelada e liberada. Sistema científico implementado. Todas as auditorias de produção aprovadas.
> 
> **A Ponte Digital deixa de ser um projeto em desenvolvimento. Passa a ser uma plataforma em produção, pronta para receber empresas reais e evoluir exclusivamente por meio de evidências coletadas com seus Founders.**
> 
> P41 — Stable Release V3 entregou: auditoria geral da aplicação (código morto removido, /register eliminado), auditoria de banco de dados (3 migrations, sincronizado), auditoria de segurança (proxy/middleware ativo, tenant guard com bloqueio em produção, .env.example completo sem secrets versionados), auditoria de experiência Founder (fluxo completo validado), correção de documentação (FEATURE_MATRIX, CURRENT_PRODUCT, CHANGELOG, MANIFESTO), snapshot oficial da arquitetura, congelamento técnico formal.
> 
> **Build: 45s compile. TypeScript: 0 erros. 54 rotas. Proxy: ATIVO.**
> 
> Principais entregas do P34B:
> - **Página Única de Atendimento** (`/atendimento`) — busca + reconhecimento + confirmação em ≤5s
> - **Centro Diário** (`/dashboard`) — substitui dashboard por 5 perguntas essenciais
> - **Timeline Viva** (`/historico`) — memória unificada da empresa
> - **Caixa Inteligente** — caixa como consequência, não módulo separado
> - **Ciclo Cognitivo Visual** — 8 capacidades visíveis na interface
> - **Sidebar simplificada** — navegação por fluxo (Trabalho/Consultar/Aprender/Sistema)
> - **Foundation Candidate V2** — documento oficial da nova base
> 
> **A partir deste ponto:**
> - Nenhuma alteração na Constituição sem emenda
> - Nenhuma alteração na Teoria da Evolução Empresarial sem ADR
> - Toda nova funcionalidade deve passar pela Árvore de Decisões de Produto (10 nós)
> - A Regra de Ouro ("A Ponte Digital não decide pela empresa") é inegociável
> - **Cada ação operacional deve fortalecer automaticamente o Capital Cognitivo**
> - **Nenhuma informação importante pode depender de lançamentos duplicados**
> - **Nenhuma tela pode existir apenas para registrar dados**
> - **Registrar atendimento em ≤5 segundos** — critério de aprovação do P34B
> 
> Ver `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` para o candidato oficial.
> Ver `docs/02-PRODUCT/P34_FLUXO_COGNITIVO_OPERACIONAL.md` para o design completo do P34.
> 
> ---
> 
> **Registro histórico da fase (Programa 32-33):**
> 
> A Ponte Digital foi reposicionada em torno de **8 Capacidades Fundamentais**: Observar, Compreender, Esclarecer, Priorizar, Decidir, Executar, Aprender, Evoluir.
> 
> **Capital Cognitivo** passa a ser o patrimônio central da plataforma — composto por decisões validadas, capacidades desenvolvidas, aprendizados registrados, hipóteses confirmadas, conhecimento acumulado e consistência operacional.
> 
> **Programa 33** eliminou toda aparência de ERP: 35 componentes mortos deletados, jargão técnico removido (HealthScore, ConfidenceRing, CognitiveAvatar, ScoreBar), 4 documentos de auditoria produzidos (`docs/05-OPERATIONS/SPRINTS/`).
> 
> **Programa 34 (atual)** projeta o Fluxo Cognitivo Operacional — onde operação e inteligência são inseparáveis.
> 
> **Ciclo oficial de evolução:** OBSERVAR → COMPREENDER → ESCLARECER → PRIORIZAR → DECIDIR → EXECUTAR → APRENDER → INCORPORAR → NOVA CAPACIDADE
> 
> Ver `docs/06-CONSTITUTION/P32/` para a Constituição completa.

> **MARCO: P52 — Inteligência Conversacional Estratégica + Perguntas que Constroem Empresas — 1 de agosto de 2026**
>
> Após P52, a Ponte Digital deixa de apenas acompanhar empresas. Ela passa a desenvolver uma relação contínua de evolução através de conversas inteligentes.
>
> Após o Programa 52, a Ponte Digital passa a aprender continuamente através de conversas que ajudam empresários a refletirem melhor sobre seus negócios. Cada conversa fortalece simultaneamente o empresário e o patrimônio de conhecimento da plataforma.
>
> **Conteúdo:** conversa reestruturada nos 5 estágios do conselheiro (contexto → realidade → tensão → evolução → próximo movimento), motor de qualidade das perguntas, perguntas adaptativas por contexto real, memória de conversa, recomendações com história, Centro Diário com as 5 perguntas essenciais, ritual mensal "Revisão da Evolução", Biblioteca das Grandes Perguntas, Pergunta Aberta da Semana (única ativa) com registro automático e Painel do Fundador interno.
>
> Ver `docs/07-MILESTONES/P52_INTELIGENCIA_CONVERSACIONAL.md` e `docs/07-MILESTONES/P52_PERGUNTAS_QUE_CONSTROEM_EMPRESAS.md`.

> **MARCO: P53 — Experiência Ponte: Da Conversa ao Relacionamento — 1 de agosto de 2026**
>
> Após P53, a Ponte Digital deixa de ser um lugar onde o empresário administra e passa a ser o lugar onde ele é acolhido, reconhecido e lembrado — uma presença constante que reduz ansiedade, aumenta clareza e cria vontade de voltar amanhã.
>
> **Conteúdo:** os 16 pilares materializados — ritual diário (saudação, foco do dia, leitura do momento), reconhecimento de momentos da empresa, foco variável por semana/fase do mês, Linha da Vida da empresa com marcos reais, evolução do fundador em 4 dimensões, percepções espontâneas, silêncio inteligente, conquistas de evolução, memória afetiva, índice de clareza, próximo melhor movimento único, pergunta que fica, personalidade permanente do assistente e retorno natural. Nenhum schema novo, nenhuma tela ERP nova, nenhum módulo administrativo — tudo reutilizou o patrimônio existente.
>
> Ver `docs/07-MILESTONES/P53_EXPERIENCIA_PONTE.md`.

> **MARCO: P54 — Experiência Founder V2: Auditoria Total de Valor e Missão — 1 de agosto de 2026**
>
> Após P54, cada interação da Ponte entrega valor percebido antes de pedir qualquer coisa — sem adicionar módulos. A auditoria percorreu conversa, visual, linguagem e recomendações.
>
> **Conteúdo:** primeira conversa reestruturada (v5, 22 perguntas) começando pela empresa antes do empresário; perguntas que ensinam antes de pedir resposta; alternativas inteligentes com campo opcional "Se quiser, conte mais" (permiteDetalhe); devolutiva que cita a empresa real; tokens visuais premium (card-premium, gradientes, sombras, tipografia); microcopy humano e remoção de jargão visível ("leads/pipeline/funil/follow-up" → "negociações/oportunidades/retomar contato", "Salvar" → "Guardar", "Excluir" → "Remover"); reações naturais; centro de decisão reestruturado na narrativa de conselheiro (O que percebemos / Por que importa / O que pode acontecer / Próximo passo); auditoria de telas e auditoria técnica com débitos registrados (`micro-reaction` órfão, `/diagnostico` legado). Nenhum schema novo, nenhum módulo novo, nenhuma tela ERP nova.
>
> Ver `docs/07-MILESTONES/P54_EXPERIENCIA_FOUNDER_V2.md`.

> **MARCO: P55 — CERTIFICAÇÃO FOUNDER READY V1 — STATUS OFICIAL — 1 de agosto de 2026**
>
> **A Ponte Digital V4 Founder está oficialmente certificada e congelada como **Founder Ready V1**.** Este marco encerra a fase de fundação e valida o produto para receber os primeiros 100 Founders reais. A partir daqui o produto evolui exclusivamente por evidência coletada destes Founders — nenhuma funcionalidade nova fora desta regra.
>
> **O que P55 entregou:**
> - **Auditoria total (4 frentes paralelas):** código morto/bugs, sistema de IA, segurança multi-tenant e experiência/identidade visual.
> - **IA resiliente ("a IA nunca pode simplesmente parar"):** `NoopProvider` agora lança erro explícito (em vez de stream vazio silencioso); chamada ao modelo protegida por timeout de 30s; em falha/timeout/stream vazio a conversa responde com uma mensagem humana de continuidade (`FALHA_GENTIL`) em vez de quebrar com 500.
> - **Bug crítico de produção corrigido:** o `prismaSeguro` (tenant isolation guard) era lançado quando um service fazia `update`/`updateMany`/`delete` por `id` sem `empresaId` — derrubaria a aplicação em produção. Todos os services de escrita foram escopados por `where: { id, empresaId }` + re-fetch preservando o shape de retorno (`transacao`, `tarefa`, `lead`, `cliente`, `implantacao`, `configuracao`, `historico`). Modelos-filho sem coluna `empresaId` (`contato`, `etapaImplantacao`) foram formalmente isentos do guard, isolados indiretamente pelo pai.
> - **Código morto removido:** `centro-cognitivo/`, `micro-reaction.tsx`, `confidence-ring.tsx`. Fricção eliminada: CTA "Continuar" da Jornada agora leva a rota real por categoria; casts desnecessários em `historico-content.tsx` removidos.
> - **Critérios de produção validados:** `npx tsc --noEmit` limpo, `npm run build` limpo (56 páginas, 54 rotas, proxy/middleware ativo).
>
> **Estado oficial a partir de P55:**
> - Produto congelado em **Founder Ready V1** — pronto para receber empresas reais.
> - Nenhuma funcionalidade fora da Árvore de Decisões de Produto.
> - Segurança multi-tenant estrutural com bloqueio em produção.
> - IA sempre continua a conversa (nunca trava a jornada do empresário).
>
> Ver `docs/05-OPERATIONS/P55/FOUNDER_READY_V1.md` e `docs/07-MILESTONES/P55_FOUNDER_READY_V1.md`.

> **MARCO: P56 — PRODUÇÃO CERTIFICADA E OPERAÇÃO FOUNDER V1 — STATUS OFICIAL — 2 de agosto de 2026**
>
> **A Ponte Digital encontra-se oficialmente publicada, certificada e sincronizada entre desenvolvimento e produção.** O deploy de produção (`https://ponte-digital.vercel.app`, commit `ca4a099` de `main`) foi executado em 2/8/2026 e validado (sincronização produção == main, migrations 5/5, build/TypeScript limpos, smoke de rotas públicas 200). Isto encerra a fase de construção.
>
> **Nenhuma evolução futura será iniciada por hipótese interna.** Toda melhoria nascerá exclusivamente da utilização da plataforma por empresas reais (Fase Founder). A Ponte Digital deixa de ser um software em desenvolvimento e passa a ser uma empresa de tecnologia em operação.
>
> **Regras vigentes a partir de P56:**
> - Produção == `main` (`ca4a099`) é a fonte da verdade.
> - Futuros deploys: `npx vercel deploy --prod --yes --scope ponte-digital1` ou Git-integration.
> - Toda evolução exige evidência de utilização real por um Founder (Árvore de Decisões de Produto + Critérios de Novos Desenvolvimentos).
> - Continua valendo o congelamento Founder Ready V1 (P55): IA resiliente, tenant guard ativo, código morto removido.
>
> Ver `docs/07-MILESTONES/PRODUCTION_CERTIFIED_V1.md`, `docs/07-MILESTONES/INICIO_DA_OPERACAO.md` e `docs/05-OPERATIONS/KNOWN_ISSUES.md`.

*Documento operacional, complementar ao FOUNDATION.md e à Tese de Valor (Nível 1). É a referência principal para qualquer agente de código — Roo Code, Gemini CLI, Claude ou outro — antes de qualquer tarefa de implementação. Atualizar a cada sprint concluída. Máximo duas páginas: se crescer além disso, o excesso vira Playbook (Nível 3), não fica aqui.*

**Objetivo desta fase:** validar as **8 Capacidades Fundamentais** com 100 fundadores — não apenas acumular evidências, mas testar se a materialização da Teoria da Evolução Empresarial produz empresários mais conscientes, adaptáveis e tranquilos. Os 100 primeiros são co-autores da tese: cada interação fortalece ou questiona uma capacidade, gera Capital Cognitivo e alimenta a Curva Evolutiva.

**Nota de posicionamento (2026-07-14):** desde `ADR-003`, o produto é entendido em duas camadas — Ecossistema Público (Diagnóstico) e Plataforma Cognitiva (os outros 6 pilares). Isso é reposicionamento estratégico, não muda o que está descrito tecnicamente abaixo: a V4 Founder continua sendo uma única aplicação. Ver `01-VISION/THESIS.md` e `07-BUSINESS/JORNADA_APOIADOR.md`.

**Nota arquitetural (2026-07-18):** 34 ADRs foram revisadas e aprovadas (001–034). A Ontologia Cognitiva — teoria do conhecimento da plataforma — está em `03-ENGINEERING/ONTOLOGIA_COGNITIVA.md` (camada superior ao DDD). A arquitetura do Motor Cognitivo em `03-ENGINEERING/MOTOR_COGNITIVO.md`, a auditoria arquitetural em `03-ENGINEERING/AUDITORIA_ARQUITETURAL.md`, e a especificação DDD em `03-ENGINEERING/ARCHITECTURE_DDD.md`. A implementação segue o plano de 6 fases da auditoria (Fase 0 → Fase 5). Ver `04-DECISIONS/ADR/` para as 34 ADRs.

---

## 1. O que já existe e funciona

*(Atualizado a partir de auditoria de código. Atualizar a cada sprint — esta seção reflete o código real, não a visão.)*

**Construído e funcional (estado atual — Foundation Candidate V2):**

**Fluxo Cognitivo Operacional (P34B):**
- **Página Única de Atendimento** (`/atendimento`) — busca + reconhecimento automático + confirmação em ≤5s. Caixa Inteligente integrada (faturamento, ticket médio, clientes do dia)
- **Centro Diário** (`/dashboard`) — substitui o dashboard antigo. Responde exatamente 5 perguntas: onde estamos, o que mudou, o que merece atenção, quem precisa de você, próximo melhor movimento. Inclui Ciclo Cognitivo Visual (8 capacidades)
- **Memória Viva** (`/minha-jornada`) — 5 painéis de evolução (Empresa, Fundador, Decisões, Clientes, Operação), ANTES → HOJE → interpretação, com selos de confiança. A timeline morreu (P65); `/historico` redireciona.
- **Sidebar simplificada** — navegação por fluxo: Trabalho / Consultar / Aprender / Sistema

**Núcleo cognitivo (40+ engines, mantidos):**
- Motor Cognitivo — evidência, memória, decisão, aprendizado, confiança, evolução, governança de conhecimento, identidade, orquestração
- Camada de Sinais (`HistoricoSinal`) conectando operação a cognição
- Assistente — chat contextual com Anthropic
- Centro de Decisão — decisões recomendadas com priorização
- Knowledge Vault — biblioteca de conhecimento validado
- Conversational Learning — aprendizado ativo via perguntas rápidas

**Fundação:**
- Diagnóstico (Conversa) — questionário adaptativo com revelação
- Autenticação multiempresa — login, criação de conta, papéis
- Landing, Páginas de suporte (login, criar-conta, configurações)

**Gap ativo:** Agenda como capacidade — não existe (P35+).

**Divergências de arquitetura em relação ao Plano Mestre — aceitáveis, dentro do congelamento (seção 3), NÃO são débito a corrigir agora:**
- API Routes chamando services diretamente, em vez de `server/actions → server/services → server/repositories`
- `HistoricoSinal` no lugar de um catálogo formal de `DomainEvent` semânticos
- Motor de decisão como função simples, não Strategy Pattern / Motor Cognitivo

**Gap real (não é simplificação aceitável — é escopo ativo que ficou pra trás):**
- ❌ Agenda como capacidade — não existe

**Violação de princípio inegociável (corrigir logo, independente de fase):**
- ⚠️ Soft delete incompleto — alguns models não têm `deletedAt`. Isso está na lista de princípios que nunca podem ser quebrados (seção 5), não é uma escolha de sofisticação por estágio.

**Zero cobertura de teste** — aceitável por ora, mas recomenda-se um mínimo de testes de fumaça em autenticação e transações financeiras (área de maior risco silencioso), não uma suíte completa — isso ainda seria sofisticação prematura pra esta fase.

## 2. Foundation Freeze V1 (Programas 21–32 concluídos)

**A fundação está congelada.** Os programas abaixo foram concluídos e documentados em `docs/07-MILESTONES/CHANGELOG_OFICIAL.md`.

**Programas concluídos:**
- P21 — Empresa Zero
- P22 — Motor Cognitivo
- P23 — Experiência Cognitiva
- P24 — Certificação da Fundação
- P25 — Era da Observação
- P26 — Empresa que Aprende
- P27 — Polimento & Microinterações
- P28 — Sistema Visual Oficial
- P29 — Materialização & Auditoria
- P30 — Critérios & Matriz de Materialização
- P31 — Dashboard Evolutivo + Fase Final
- P31D — Experiência da Evolução (Finalização)
- P32 — Constituição da Ponte Digital
- P33 — Limpeza de ERP & Fundação (auditoria, simplificação, linguagem)
- P34 — Fluxo Cognitivo Operacional (design)
- P34B — Materialização Completa do Fluxo Cognitivo Operacional

**Fase atual:** Foundation Candidate V2 — pronta para P35 (Founder V1).
Ver `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` para o candidato oficial.

**Próxima fase:** P35 — Founder V1 (auditoria final, validação com empresa real, estabilização, deploy).
Ver `docs/07-MILESTONES/ROADMAP_POS_FUNDACAO.md` para a visão macro das próximas fases.

**Nota importante:** A auditoria da Foundation V1 identificou débitos técnicos (P0–P3). O Programa 33 endereçou parte (remoção de dead code, simplificação). O Programa 34 projetou o fluxo unificado. O Programa 34B materializou o fluxo: Atendimento, Centro Diário, Timeline Viva, Caixa Inteligente. A dívida restante está documentada em `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` (seção 6).

## 3. O que está congelado para versões futuras

Não implementar agora — mas com as ADRs 009–034 aprovadas, a arquitetura futura está definida. A implementação segue o plano de 6 fases da auditoria (`03-ENGINEERING/AUDITORIA_ARQUITETURAL.md`). Itens abaixo permanecem sem ADR e sem previsão:

- Motor 4 — Conversação Contínua
- Modelo Cognitivo do Empresário (perfil adaptativo de decisão)
- Memória de Decisões estruturada e o Espelho de Decisões
- KnowledgeRegistry e os Patrimônios de Conhecimento
- Nível de Confiança do Empresário
- Camada de Sensibilidade Situacional
- BusinessMoment / EmpresaState sofisticado (hoje: status simples, sem inferência)
- Patrimônio Empresarial (5 dimensões) e suas visualizações — Evolução Contínua, DNA da Empresa, Espelho da Empresa
- Inteligência Coletiva (scope coletivo/institucional)
- Opportunity como estágio intermediário antes da Recomendação

**O que as ADRs aprovadas destravam (arquitetura definida, implementação futura):**
- Motor Cognitivo como barramento central (ADR-015) — arquitetura definida, sem código ainda
- Ciclo cognitivo contínuo (ADR-013) + pipeline único (ADR-024) — substituirá o ciclo atual
- Event Bus formal (ADR-011) + catálogo de eventos (ADR-012) — substituirá switch/case
- Submotores isolados por eventos (ADR-016) — engines atuais serão refatoradas gradualmente
- Contexto Cognitivo como pacote fechado (ADR-021) — IA receberá contexto pronto
- IA como tradutora (ADR-017) — IA para de interpretar dados brutos
- Hierarquia de memória (ADR-019) + esquecimento programado (ADR-026) — ciclo de vida completo
- Agregado único PatrimonioCognitivo (ADR-010) — unifica 5 tabelas hoje fragmentadas
- Curadoria obrigatória (ADR-028) + Correlation ID (ADR-027) — qualidade e rastreabilidade
- Agregados renomeados para português (ADR-029) — nomenclatura consistente com a Ontologia
- Eliminação de duplicatas Crenca/ConhecimentoDaIdentidade (ADR-030) — fonte única da verdade
- Padrão e Correlação como conceitos formais (ADR-031) — eventos dedicados no barramento
- Convicção no algoritmo de priorização (ADR-032) — conhecimento testado pelo tempo pesa mais
- Invariantes de domínio separados de regras técnicas (ADR-033) — clareza documental
- Política de causalidade vs correlação (ADR-034) — garantia executável contra falsas causalidades

**Novo na hierarquia de documentos:** `03-ENGINEERING/ONTOLOGIA_COGNITIVA.md` torna-se a camada entre a Constituição e o Motor Cognitivo, definindo formalmente os 19 conceitos fundamentais (Fato, Observação, Evento, Sinal, Evidência, Hipótese, Convicção, Conhecimento, Aprendizado, Memória, Contexto, Decisão, Resultado, Feedback, Padrão, Correlação, Regra, Insight, Sabedoria Empresarial).

**Regra de desacoplamento — a mais importante desta lista:** o Centro de Decisão existe desde o Sprint 6, mas hoje é alimentado por regras simples. Quando o Motor Cognitivo entrar, ele substitui apenas o "motor" por trás da tela — a experiência do empresário não muda. Nenhuma implementação atual pode acoplar lógica de decisão diretamente na tela, exatamente para permitir essa troca sem retrabalho.

## 4. O que é hipótese e não deve ser tratado como verdade do sistema

*Registro completo, com status e evidência por hipótese, em `08-KNOWLEDGE/HYPOTHESES.md` — a lista abaixo é o resumo em prosa.*

Tratar como pergunta em aberto até validar com os 100 fundadores, nunca como regra de negócio definitiva no código:

- Empresários responderão diagnósticos e check-ins continuamente.
- Aceitarão participar de experimentos controlados.
- Conhecimento coletivo produzirá recomendações melhores que conhecimento individual isolado.
- Reconhecimento comunitário será percebido como valioso, não como gamificação vazia.
- Recomendações adaptadas ao perfil de decisão têm maior aceitação que recomendações genéricas.
- O Nível de Confiança realmente prevê quando aceitar sugestões mais ousadas.
- O Índice de Tranquilidade engaja mais que indicadores financeiros tradicionais.

## 5. Princípios que nunca podem ser quebrados, nem nesta fase enxuta

1. Não crie um ERP completo — crie um empresário mais tranquilo. Toda funcionalidade deve responder: **Qual capacidade empresarial ela fortalece?** Se não fortalece nenhuma das 8 (Observar, Compreender, Esclarecer, Priorizar, Decidir, Executar, Aprender, Evoluir), não implementar.
2. **Capital Cognitivo é o patrimônio central** — decisões validadas, capacidades desenvolvidas, aprendizados registrados, hipóteses confirmadas, conhecimento acumulado, consistência operacional. Toda funcionalidade deve aumentar pelo menos um destes.
3. **Esforço mental é o inimigo** — o critério universal de avaliação inclui: a funcionalidade reduz o esforço mental do empresário? Se não, ela precisa gerar Capital Cognitivo suficiente para justificar o custo de atenção.
4. O estágio da empresa (hoje: MVP/0-25 empresas) é o teto da sofisticação técnica — nunca ativar um recurso avançado antes de evidência real.
5. Soft delete, audit trail e tenant guard em todo model, desde o primeiro módulo.
6. O Centro de Decisão nunca mostra mais itens do que a empresa consegue executar naquele dia.
7. Nenhuma funcionalidade entra sem passar pelo critério universal: (a) Qual capacidade fortalece? (b) Como aumenta Capital Cognitivo? (c) Como reduz esforço mental?
8. Todo pedido para o agente de código chega como especificação fechada (objetivo, arquivos, regras, critérios de aceite) — nunca como "continue o projeto" ou "pense em melhorias".

---

*A Tese de Valor e o FOUNDATION.md continuam sendo a referência de visão de longo prazo, mas não devem guiar decisões de escopo do dia a dia enquanto a V4 Founder estiver em construção — esse papel é deste documento. Quando uma sprint terminar, atualizar as seções 1 e 2 antes de começar a próxima.*








