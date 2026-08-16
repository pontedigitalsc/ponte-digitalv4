# P100C-STATUS-DA-PONTE.md — Status da Ponte (16 de agosto de 2026)

> **Documento de rodada P100C — Governança e Consolidação.** Diagnóstico do estado REAL da Ponte Digital, com estados de maturidade e classificação Core/Experiência/Infra/Descoberta/Copiloto/Experimental/Legado. Complementa `PONTE-SOURCE-OF-TRUTH.md` (mapa) e `GOVERNANCA-DE-DESENVOLVIMENTO.md` (regras).

---

## O que temos hoje?

Uma plataforma Next.js + Prisma + Supabase em produção (Vercel), única aplicação, validando produto com os primeiros Founders. Núcleo determinístico (engines TS), IA como interface, identidade P100B "Clareza", camada de plataforma Founder, caderno de campo para descoberta operacional, e memória operacional mapeada (entrada → sinal → contexto → relação → memória → raciocínio → decisão → ação → resultado → novo sinal).

## O que está funcionando?

### EM PRODUÇÃO (verificado)
| Capacidade | Estado | Classificação |
|---|---|---|
| Landing demonstrativa (P98/P93) | **EM PRODUÇÃO** | EXPERIÊNCIA |
| Conversa (Pri. Sessão Estratégica) funil anônimo | **EM PRODUÇÃO** | CORE |
| Retrato Estratégico determinístico | **EM PRODUÇÃO** | CORE |
| Hipóteses estratégicas + memória cognitiva | **EM PRODUÇÃO** | CORE |
| Clareza Gerada / Retorno 7 dias | **EM PRODUÇÃO** | CORE |
| Check-in diário (P95) | **EM PRODUÇÃO** | EXPERIÊNCIA |
| Dashboard / abertura inteligente (P69/P69.5) | **EM PRODUÇÃO** | EXPERIÊNCIA |
| Minha Jornada / Memória Viva (P65) | **EM PRODUÇÃO** | EXPERIÊNCIA |
| Centro de Decisão (P61/P68) | **EM PRODUÇÃO** | CORE/EXPERIÊNCIA |
| Assistente IA contextual (P66) | **EM PRODUÇÃO** | COPILOTO |
| Login/criar-conta autenticação Supabase | **EM PRODUÇÃO** | INFRAESTRUTURA |
| Camada plataforma Founder (P84/P85) | **IMPLEMENTADO** (deploy pendente de migração 008/009 + bootstrap) | INFRAESTRUTURA |
| Solicitação Founder (P90) + Ops (P91) | **EM PRODUÇÃO** | DESCOBERTA |
| Descoberta operacional / caderno de campo (P92) | **EM PRODUÇÃO** | DESCOBERTA |
| Copiloto operacional (Nv 0–4) | **IMPLEMENTADO** (motor puro, 14 testes) | COPILOTO |
| Identidade P100B "Clareza" | **EM PRODUÇÃO** | EXPERIÊNCIA/MARCA |
| Módulos legados (CRM/tarefas/financeiro/implantacoes/atendimento) | **EM PRODUÇÃO** (legado preservado, não expandir) | LEGADO |
| Rate limit + proxy + tenant guard (disciplina de empresaId) | **EM PRODUÇÃO** | INFRAESTRUTURA |

### IMPLEMENTADO (código pronto, pendência de deploy/autorização)
| Capacidade | Estado | Pendência |
|---|---|---|
| Founder Access (P84): platformRole, matriz permissões, re-gate, auditoria | **IMPLEMENTADO** | aplicar migration 008 + `founder:provision` em produção |
| Identidade definitiva `EmpresaUsuario` (P85) | **IMPLEMENTADO** | migration 009 + `founder:plantar-fundacao` |
| Configuração cognitiva Founder (P86) | **IMPLEMENTADO** | depende do deploy de 008/009 |
| Check-in persistido (P95) | **IMPLEMENTADO** (requer verificação ao vivo) | verificação de campo |

## O que está incompleto?

- **Deploy da camada plataforma** (P84/P85/P86): migrations 008+009 não aplicadas em produção; `founder:provision` e `founder:plantar-fundacao` não rodados. Áreas admin/descoberta/Foudner dependem disso.
- **Coach/system observatory**: `/admin/cognitive-observatory` e engines `cognitive-*` — experimentais, sem calibração.
- **Pergunta Viva / Reflexão da Semana / Memória Emocional**: implementados, comportamento não calibrado com empresas reais (P78, P74).
- **Contrapergunta (P71)**: só na fala, sem campo de resposta (decisão documentada).
- **Soft delete ausente em 4 logs de plataforma** (por design — auditorias, históricos, snapshots).
- **RLS do Supabase**: ~50% de cobertura; não é barreira real nesta fase.

## O que está bloqueado?

- **Motor Operacional completo** (P80/P81/P82) — **BLOQUEADO** até evidência de campo real (OBSERVADO = ∅). Souza Mestrinho Metais aguarda a reunião.
- **Domínio personalizado `pontedigital.com.br`** — pendência operacional (domínio em outra conta Vercel).
- **Deploy 008/009** — exige autorização do Fundador (KNOWN_ISSUES).
- **Parte 4 do P68** (loop "você tomou aquela decisão?") — adiado por decisão.

## O que depende de campo?

- Calibração das falas (P74/P78), ritmo (P70), leitura/Retrato (P72/P73), limiares P69, contrapergunta (P71), contemplação de Hipóteses.
- Validação do Copiloto operacional com registro real de campo.
- ETAPAS 6 e 12 do P51 (cronometrar perfis reais; primeiro Founder usa sozinho).

## O que depende de decisão minha (Founder)?

1. **Deploy da camada plataforma** (migrations 008+009 + provision/plantação) — unblock P84/P85/P86.
2. **`/api/patrimonio` vs `/api/cognitive-heritage`**: qual manter (conflito documental RFC-002 × C1-C3).
3. **`/register`** listado em público no proxy mas rota eliminada — remover referência? 
4. **Módulos legados** (CRM/tarefas/financeiro/implantações/atendimento): manter no sidebar como hoje (P94) ou decidir alguma ação.
5. **`/diagnostico`** (redirect para `/`) — manter fantasma legado ou resolver (P2-1).
6. **Sitemap** incompleto (`/explorar` ausente, P0-6).
7. Rodada de **limpeza/consolidação de engines experimentais** (`cognitive-*`, `p36/`, `p40/`) — não para agora.

## O que não devemos mexer?

- Identidade **P100B "Clareza"** (aprovada; proibido redesenhar/substituir).
- Núcleo determinístico da conversa e engines de evidência (cérebro).
- Disciplina multi-tenant por `empresaId` e `prismaSeguro`.
- Funil anônimo (`conv_token` + pendências na criação de conta).
- Regras P80–P82 (não inventar workflow).
- Schemas/migrations sem necessidade (risco alto, migração manual no Supabase).

## Qual é a próxima maior oportunidade?

**Campo real — a reunião com a Souza Mestrinho Metais** (kit `docs/05-OPERATIONS/P79/KIT_REUNIAO_SOUZA_MESTRINHO.md` + caderno P92). É o que destrava: registro real, primeiro uso do copiloto operacional (Nv 0–4), e a decisão de liberar fases do Motor Operacional. Juntamente com o **deploy da camada plataforma** (P84/P85/P86), que destrava a identidade e o painel interno completo.

## Qual é o maior risco técnico?

- **Multi-tenancy sem RLS efetivo + sense de segurança**: a barreira atual é disciplina de `empresaId`; TUDO depende disso (adeno risco se um service esquecer). Prioridade de atenção em qualquer service novo.
- **Rate limit in-memory** — não compartilhado entre instâncias; com escala real pode ser contornado.
- **Migrations manuais no Supabase** (shadow DB quebra na 002) — risco de divergência entre schema, migrations e banco de produção.
- **Engines experimentais acumuladas** (`cognitive-*`, `p36`, `p40`) aumentam superfície não testada.

## Qual é o maior risco de produto?

- **"Parecer mais um sistema para preencher"** — contradiz o princípio central. Mitigação: tudo que existe já respeita a ordem informação→evento→integração→entrada simples; continuar nessa direção e NUNCA exigir formulário desnecessário.
- **Falta de validação real** — produção sem usuários reais constantemente (a pergunta P58: só evoluir por evidência). Risco de estagnação OU de inventar.
- **Descoberta bloqueada** (campo ausente) segura o aprendizado mais valioso.

## Qual é o maior risco comercial?

- **Modelo não validado** — a Ponça ainda não provou com Founder real que "os 10 primeiros empresários" adotam e voltam (Protocolo Founder 1–10 pendente).
- **Posicionamento de "inteligência da empresa"** sem prova de valor mensurável.
- **Dependência de uma única execução manual** (WhatsApp, Founders chamados por baixo) em vez de aquisição por evidência.

---

## Mapa de classificação Core / Experiência / Infra / Descoberta / Copiloto / Experimental / Legado (P100C §8)

| Agrupamento | O que contém | Exemplos |
|---|---|---|
| **CORE** | O núcleo cognitivo/empresarial | conversa, hipóteses, retrato, clareza, memória, decisão, evidência, pergunta viva |
| **EXPERIÊNCIA** | O que melhora a forma de sentir | landing, ritmo, cerimônia, retrato-share, abertura inteligente, narrativa |
| **INFRAESTRUTURA** | O que mantém funcionando | auth, proxy, rate-limit, tenant guard, health, prisma services, build |
| **DESCOBERTA** | Aprendizado da operação | caderno P92, solicitações Founder, diários, copiloto-operacional |
| **COPILOTO** | Interpretação/contexto/apoio | assistente, conselheiro, relacao-engine, clareza no dia a dia |
| **EXPERIMENTAL** | Sem validação suficiente | cognitive-orchestrator + fachadas, engines p36/p40, observatory |
| **LEGADO** | Compatibilidade/histórico | CRM, tarefas, financeiro, implantacoes, atendimento, /diagnostico, /historico |

---

## Inventário de auditorias desta rodada (achados principais)

| Auditoria | Principais achados |
|---|---|
| **Rotas** (37 páginas, 62 APIs, proxy.ts) | `/dashboard` semi-órfã; `/historico`+`/diagnostico` = páginas-ponte (redirect); `/register` residual no proxy; sitemap incompleto. |
| **APIs** | 6 órfãs/legadas (sessao/iniciar, relacao×2, cognitive/panel+decisoes, duplicação patrimonio×cognitive-heritage). Rate limit sem cobertura em rotas de plataforma/leitura. |
| **Schema/migrations** | 62 models; 58/62 com deletedAt (4 logs sem = por design); 12 migrations. Soft-delete note desatualizada; RLS 31/31 mas ~50% das tabelas; `atendimento.service` (1/10) sem wrapper; migrations 001/002 duplicam tabelas. |
| **Identidade** | Resíduo real: `app/favicon.ico` pré-P96 **removido** nesta rodada; `✦` restringe a marca e foi verificado (queda em 1 viñeta de lista + comentários); Building2/Sparkles funcionais. P100B íntegra. |
| **Ambiente** | Fonte oficial confirmada; `evolucao-os` = cópia com `.git` do mesmo remote (perigosa, desatualizada); demais pastas históricas. |

---

## Pendências organizadas (por rodada futura, NÃO para esta)

1. **RODADA DE DEPLOY PLATAFORMA:** migrations 008/009 + `founder:provision` + `founder:plantar-fundacao` (agenda do Fundador).
2. **RODADA DE LIMPEZA API:** resolver duplicação `patrimonio`×`cognitive-heritage`; retirar órfãs (`sessao/iniciar`, `relacao`, `cognitive/*`); rate limit plataforma.
3. **RODADA DE CONSOLIDAÇÃO DE ENGINES:** triagem experimental (`cognitive-*`, `p36`, `p40`) → MANTER/DEPREC#AR/DOCUMENTAR (P100C §14).
4. **RODADA DE SEGURANÇA:** decisão sobre wrapper em `atendimento.service`, atualizar RLS, política de rate limit (P94 adiou; registrar como decisão de fase).
5. **RODADA DOCUMENTAL:** atualizar `KNOWN_ISSUES` (soft-delete, RLS, prismaSeguro, favicon.ico já corrigido), sitemap, `/register`, token de "A travessia" na doc vs P100B.

## Notas finais

- **Nada foi "pronto" apenas por estar documentado.** Estados explicitados na coluna acima (IMPLEMENTADO ≠ EM PRODUÇÃO ≠ VALIDADO ≠ OBSERVADO).
- **Campo real é o próximo ato** — a reunião Souza Mestrinho e o deploy de plataforma.
- Este documento e o `PONTE-SOURCE-OF-TRUTH.md` são a base para qualquer desenvolvedor navegar sem depender da memória do Kelven.