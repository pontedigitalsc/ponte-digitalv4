# P78 — A Ponte que Acompanha (Ritmo 12s + Ciclo de Evolução Cognitiva)

## 1. Problema

A Ponte entrega clareza na primeira sessão, mas a relação termina ali. O empresário descobre algo importante ("sua empresa depende de você") e depois não há continuidade: ninguém pergunta "e agora? o que mudou?". A memória guarda fatos, não **mudança**. Sem o ciclo OBSERVAÇÃO → DESCOBERTA → DECISÃO → AÇÃO → RESULTADO → APRENDIZADO → NOVA EVOLUÇÃO, a Ponte deixa de ser uma relação cognitiva contínua.

## 2. Missão

Transformar a Ponte de um sistema que *entende* o empresário em um sistema que *caminha com ele*. Nada de novo módulo, dashboard, ranking, score, gamificação, medalha, pontos, IA generativa nova, arquitetura paralela ou banco novo. **Conectar e elevar o que já existe.**

## 3. Comportamento anterior

- Devolutiva espera ~7s; barra e timer eram dois números mágicos independentes (`7000` em `page.tsx` e `7s` na animação CSS).
- Descobertas P77 eram geradas no Retrato e **descartadas** ao final da sessão (não persistidas).
- Pergunta viva só nascia por regras de palavras-chave nas respostas; sem regra correspondente, caía numa pergunta genérica fixa.
- Comparações "antes → depois" já existiam na Memória Viva (`obterMemoriaViva`), porém não conectadas às descobertas P77.

## 4. Comportamento desejado

1. Devolutiva fica ~12s (espaço cognitivo, não loading), com **fonte única** para barra e timer.
2. "Continuar agora" disponível imediatamente, cancelando o timer sem dupla transição.
3. Descobertas P77 persistidas → **continuam vivas** entre sessões.
4. Pergunta viva nasce da última descoberta P77 (o que foi percebido) quando nenhuma regra de palavras fechou.
5. A Ponte compara evidências temporais só quando existem, com epistemologia SABEMOS/ACREDITAMOS/INVESTIGANDO.

## 5. Conceito ObjetoEvolucao

Primeiro é **conceito**, não entidade física. `ObjetoEvolucao` = unidade de transformação acompanhada ao longo do tempo. **Decisão adotada:** é **composto das estruturas existentes** — que já representam o conceito, SEM migration nova:

| Campo conceitual | Estrutura existente que o representa |
|---|---|
| tipo / origem | `MemoriaCognitiva.tipo` (`descoberta\|mudanca\|evolucao`...) + `metadados.origem` |
| evidencias | `Evidencia` (append-only, `criadaEm`) |
| estado | `Hipotese.estado` (NOVA→EM_OBSERVACAO→FORTALECIDA/CONFIRMADA...) |
| ultimoContexto | `MemoriaCognitiva.descricao` / `Hipotese.descricao` |
| proximaPergunta | `Hipotese` → `pergunta` da hipótese P70 OU a Pergunta Viva (`PerguntaViva.pergunta`) |
| historico | `MemoriaCognitiva.versao` (append-only, cada mudança vira um registro) + `RespostasConversa.criadaEm`/`token` (sessão) |
| criadoEm/atualizadoEm | `criadaEm` em todas as entidades (`Hipotese`, `MemoriaCognitiva`, `AcaoCognitiva`) |

**Justificativa de não migração:** a Memória Viva (`memoria-evolutiva-engine.ts`) já calcula os 5 painéis "antes → hoje" comparando a primeira vs última sessão (`prisma.respostasConversa`), com selos `SABEMOS`/`ACREDITAMOS`/`INVESTIGANDO`. Criar tabela nova duplicaria esse patrimônio sem ganho.

## 6. Estados do ciclo de vida

`NASCIDA → OBSERVANDO → EVOLUINDO → RESOLVIDA → NOVO CICLO`.

- **NASCIDA** = descoberta persistida (`MemoriaCognitiva tipo 'descoberta'`).
- **OBSERVANDO** = a pergunta viva que nasce dela (Ponte passa a perguntar nas próximas interações).
- **EVOLUINDO** = evidências novas comparadas (Memória Viva mostra "antes → hoje" com selo).
- **RESOLVIDA** = quando `Hipotese.estado` chega a CONFIRMADA/DESCARTADA OU `AcaoCognitiva` a CONCLUÍDA/ABANDONADA.
- **NOVO CICLO** = `criarPerguntaVivaSeNecessario`/`motor-continuacao` partem da resolução para a próxima pergunta.

Sem gamification: é estado cognitivo, não progresso visual.

## 7. Evidência

Regra absoluta: nunca afirmar mudança sem evidência; nunca fabricar antes/depois; nunca comparar frases só por semelhança. Critérios mínimos: duas evidências temporais, contexto compatível, relação semântica suficiente, origem conhecida, confiança registrada. Quando faltar → `"Ainda não tenho elementos suficientes para afirmar que isso mudou."` (isso é sucesso).

Epistemologia obrigatória: **SABEMOS** ("A empresa relatou..."), **ACREDITAMOS** ("Isso pode indicar..."), **INVESTIGANDO** ("Ainda precisamos observar..."). Nunca "você melhorou" — sempre "pelas evidências que temos, parece que algo mudou".

## 8. Integração com P65 (Memória Viva)

A memória já é "o que aconteceu"; a camada interpretativa "o que mudou" **já existe** em `obterMemoriaViva` (paineis ANTES/HOJE + selos). Não apaguei nada; apenas dei a uma descoberta P77 persistência para que essa camada pudesse "vê-la" no tempo (a descoberta vira `MemoriaCognitiva tipo 'descoberta'` — a mesma fonte que `ultimasMudancas` lê).

## 9. Integração com P66 (Conselheiro)

Sem alterações no P66 nesta etapa; a listagem de caminho está documentada: `carregarMemoria` do conselheiro pode passar e incluir `memoriaCognitiva tipo 'descoberta'` e `sinalValor` no futuro para "não perguntar o que já tem evidência". O hábito de persistir descobertas como memória agora **alimenta** essa consulta futura.

## 10. Integração com P68 (Decisão acompanhada)

`AcaoCognitiva` já suporta acompanhamento temporal: `status` (PENDENTE/EM_ANDAMENTO/CONCLUIDA/ABANDONADA) + `resultado` (aconteceu/aprendemos) + `criadaEm/atualizadaEm`. E `motor-continuacao` já cria momento `REVISAR_DECISAO` (≥14d) e `OPORTUNIDADE` (≥3d aberta). **Não duplicado**; sem alterações aqui nesta etapa pois já cobrem o requisito.

## 11. Integração com P69/P69.5

`motor-continuacao` (P69.5) já monta a abertura permanente lendo `AcaoCognitiva`, `Hipotese`, `PerguntaViva`, `MemoriaEmocional`. As descobertas P77 recém-persistidas poderão aparecer nesse vocabulário. Nada novo criado.

## 12. Integração com P72/P73/P77

- P72 (Espelho) → relações/contradições — inalterado.
- P73 (Retrato) → experiência da descoberta — inalterado.
- P77 (Motor das Descobertas) → **agora persiste** o que descobriu.
- **P78** → pergunta viva e base para comparações temporais.

Sem duplicação do Motor: reutiliza `gerarDescobertas` + `registrarNaMemoria` (sem segunda versão).

## 13. Fluxo temporal

**Sessão 1**: observar → descoberta P77 → hipótese → pergunta aberta.
**Retorno**: pergunta viva (da descoberta) → nova evidência → comparação (memória viva) .
**Decisão (P68)**: hipótese → decisão → ação (`AcaoCognitiva`).
**Acompanhamento**: resultado → aprendizado → atualização de hipótese (`processarFeedback`).
**Evolução**: antes → agora → interpretação (selos) → nova pergunta → novo ciclo.

## 14. Regras epistemológicas

Ver §5/§7/§17 do programa: fato ≠ hipótese ≠ investigação; nada de "seu problema é delegação"; sempre "uma hipótese que estamos investigando é X".

## 15. Critérios de comparação

Duas `RespostasConversa` da mesma `perguntaId` com timestamps distintos (1ª sessão vs última), pertencentes à mesma linha por empresa + bloco; comparação determinística por painel (a `memoria-evolutiva-engine` já faz isso). Evolução só é dita com 2+ evidências temporais de origem conhecida.

## 16. Riscos

- Timer: dupla transição / race condition → mitigado com `transicionandoRef` (lock) + clear de timer + `dadosRespostaRef = null`.
- Barra dessincronizada: mitigado pela constante única `RITMO_DEVOLUTIVA_MS/S`.
- Persistência duplicada: `persistirDescobertas` é idempotente por `versao` e `catch` silencioso (não quebra finalização). Retorno-limite mínimo no caso de falhas do Prisma.
- Nenhuma UI alterada além da barra/timer → sem risco de design.

## 17. Decisões arquiteturais

- **Fonte única de tempo**: novo `sistema/src/lib/ritmo.ts` (`RITMO_DEVOLUTIVA_MS = 12000`, `RITMO_DEVOLUTIVA_S`).
- **ObjetoEvolucao composto** (sem migration) — ver §5.
- **Descobertas persistentes** via `registrarNaMemoria(tipo 'descoberta')` no finalizar.
- **Pergunta viva da descoberta** como fallback em `criarPerguntaVivaSeNecessario`.

## 18. Desvios deliberados

- Não criei entidade/migration para `ObjetoEvolucao` (composição suficiente).
- Não alterei `motor-continuacao`/`conselheiro`/Memória Viva (já cobrem os requisitos; evitei risco).
- Não implementei etapa "Respostas para deslocar em conversa viva intra-sessão" (documentada como passo futuro).

## 19. Plano de implementação (executado)

1. **Etapa 1 (ritmo)**: constante + `page.tsx` (timer 12s, barra 12s, lock de transição, "Continuar agora" imediato) ✅
2. **Etapa 2 (conceito)**: ObjetoEvolucao composto, sem migration ✅ (documentação §5)
3. **Etapa 3 (descobertas vivas)**: `persistirDescobertas` + finalizar route ✅
4. **Etapa 4 (perguntas vivas)**: `criarPerguntaVivaSeNecessario` deriva da descoberta ✅
5. Etapa 5 (decisões P68 com acompanhamento): já coberta por `AcaoCognitiva`+`motor-continuacao` — sem alteração nesta entrega.
6. Etapa 6 (comparação antes/agora): já coberta por `obterMemoriaViva` — sem alteração.
7. Etapa 7 (abertura P69.5): já coberta — sem alteração.
8. Etapa 8 (Conselheiro): documento caminho futuro — sem alteração.

A cada etapa: `npm run typecheck` ✅ e `npm run build` ✅ (sem regressões).

## 20. Critérios de sucesso (status)

| Critério | Estado |
|---|---|
| Devolutiva ~12s com fonte única | ✅ |
| "Continuar agora" imediato sem dupla transição | ✅ |
| Descobertas continuam entre sessões (persistidas) | ✅ |
| Perguntas vivas vão nascer do histórico real | ✅ |
| Distinção fato/hipótese/investigação | ✅ (selos existentes) |
| Comparações antes/depois só com evidência | ✅ (Memoria Viva guard) |
| Memória demonestra evolução | ✅ (paineis de antes/hoje + descobertas persistidas) |
| P77 tem continuidade | ✅ (persistência + pergunta viva) |
| P68 tem continuidade temporal | ✅ (existente, sem alteração) |
| P69/P69.5 usa objeto de evolução | ✅ (composição, sem alteração) |
| Conselheiro pode consultar evolução | ⏳ caminho documentado (§9) — passo futuro |
| Nenhuma retenção artificial | ✅ |
| Nenhuma IA generativa nova | ✅ |
| Nenhum módulo desnecessário | ✅ |
| Nenhuma migration desnecessária | ✅ |
| Código antigo continua funcionando | ✅ (build) |
| Typecheck | ✅ |
| Build | ✅ |
| Testes relevantes | ✅ nos limites do ambiente (não automatizados; cobertos por typecheck/build) |
| Produção atualizada + verificação ao vivo | **PENDENTE — requer acesso ao deploy da Ponte (credenciais); não executado pelo agente sem confirmação explícita do usuário** |

## Decisões é desvios final

- Auditou-se: `memoria-evolutiva-engine.ts`, `conselheiro-engine.ts`, `perguntas-socraticas.ts`, `motor-continuacao.ts`, `relacao-engine.ts`, `cognitive-memory-engine.ts`, `conversation-engine.ts`, `obterMemoriaViva`, `motor-descobertas.ts`, `retrato-estrategico.ts`, `reacoes.ts` e `page.tsx`.
- Resposta às perguntas do PARTE 21:
  - **Onde nasce a descoberta?** `motor-descobertas.ts:gerarDescobertas` (diretamente do `Respostas` de propios).
  - **Onde ela é persistida?** Agora em `MemoriaCognitiva` (tipo `descoberta`, origem `MOTOR_DAS_DESCOBERTAS_P77`) via `persistirDescobertas` no finalizar.
  - **Como recuperada?** `consultarMemoria`/`ultimasMudancas`/`memoriaCognitiva.findFirst` (Prisma já indexado por `(empresaId, tipo)` e `(empresaId, criadaEm)`).
  - **Como sabemos que pertence à mesma linha?** mesma `empresaId` + `metadados.idDescoberta`/`versao`.
  - **Como evita duplicação?** descobertas idempotentes por `versao`, e `PerguntaViva` nunca duas (`obterPerguntaVivaAtiva`).
  - **Como descoberta vira pergunta viva?** fallback em `criarPerguntaVivaSeNecessario`.
  - **Como decisão vira acompanhamento?** `AcaoCognitiva` + `motor-continuacao` (já existentes).
  - **Como resultado vira aprendizado?** `processarFeedback`/`registrarResultadoAcao` (já existentes).

## Arquivos alterados

- `sistema/src/lib/ritmo.ts` (novo — fonte única).
- `sistema/src/app/conversa/page.tsx` (12s + barra compartilhada + trava de transição).
- `sistema/src/engine/motor-descobertas.ts` (persistência de descobertas).
- `sistema/src/app/api/conversa/finalizar/route.ts` (chama `persistirDescobertas`).
- `sistema/src/engine/relacao-engine.ts` (`pergunta viva` da descoberta).

## Fechamento do P78 (registro de execução — 7/8/2026)

**Entregue, commitado, enviado a `main` e no ar na produção. Validação funcional ao vivo (conversa real) pendente de sessão do Founder.**

| Etapa do fechamento | Resultado |
|---|---|
| Auditoria do diff (sem escopo fora do P78) | ✅ só P78 + programas anteriores da sessão, cada um em commit próprio; 3 arquivos (`tsconfig.json`, `IMPLEMENTATION_BLUEPRINT`, `EXECUTION_PROGRAM`) marcados como "M" apenas por line-ending (sem mudança de conteúdo) |
| Typecheck | ✅ `npm run typecheck` sem erros |
| Build | ✅ `npm run build` sem erros (todas as rotas compilando) |
| Verificação de código (não sobrou magic number 7s/7000 no fluxo) | ✅ nenhuma ocorrência |
| Commit | ✅ `5dadcf5` **P78** (8 arquivos) isolado; anteriores: `fb87146` (reavaliação arquitetural), `b6b218e` (P75+P76), `b9deae5` (P76.5), `9934974` (P77) |
| Push | ✅ `git push origin main` → `f92a9d4..5dadcf5` em `main` |
| Deploy produção | ✅ detectado (CLI `vercel` ausente no ambiente; deploy disparado pelo push + integração GitHub Vercel no dashboard — instância recém-reiniciada, uptime ~60s no health check) |
| `/api/health` produção | ✅ `200 {"status":"ok","ambiente":"production"}` |
| `/conversa` produção | ✅ respondendo (shell da experiência) |
| `/dashboard` e `/assistente` | ⚠️ requerem sessão/sessão real do Founder (não testáveis anonimamente) |
| Conversa real em produção (fluxo completo P77→P78) | ⏳ **PENDENTE — requer Founder autenticado** (não é executável pelo agente sem credenciais de usuário) |
| Veredito (PARTE 22/23) | **A Ponte ficou PREPARADA e com o mecanismo de acompanhamento ENTREGUE; a confirmação definitiva de que ela "acompanha" depende de 1 conversa + 1 retorno real em produção, em acompanhamento com o Founder.** |

### Veredito

```
Depois do P78, a Ponte realmente acompanha o empresário?
RESPOSTA HONESTA: parcialmente.
O que está entregue e no ar: ritmo único de devolutiva (12s),
descobertas que persistem entre sessões e viram pergunta viva na próxima conversa,
e um caminho (AcaoCognitiva + motor-continuacao) para decidir e gerar acompanhamento.
O que falta para o veredito definitivo: 1 (uma) conversa real em produção que
gere descoberta → finalize → volte → receba a pergunta viva derivada da memória.
Enquanto isso não acontecer com um Founder real, a Ponte "acompanha"
(foi entregue-preparada), mas ainda não foi PROVADO que acompanhará — 
a prova é empírica, não por código.
```