# GOVERNANCA-DE-DESENVOLVIMENTO.md — Regras de Governança para desenvolvimento na Ponte Digital

> **Criado na rodada P100C — Governança e Consolidação (16 de agosto de 2026).**
> Este documento define regras simples e obrigatórias para TODO desenvolvimento no repositório oficial.
> Leia junto com `AGENTS.md` (raiz), `docs/06-AI/AGENTS.md`, `docs/00-START-HERE.md` e `PONTE-SOURCE-OF-TRUTH.md`.

---

## Objetivo

Garantir que a Ponte continue evoluindo **sem se fragmentar**. Nenhuma versão paralela, nenhuma pasta alternativa, nenhuma alteração fora da fonte oficial.

---

## REGRA 1 — Todo desenvolvimento acontece no repositório oficial

- Diretório oficial: `...\ponte-digital-organizado (1.3)\ponte-digital` (verifique com `git remote -v`).
- **Proibido** desenvolver em: `evolucao-os`, `ponte-digital-existent (1.3)`, `ponte-digital-operacional`, `Versao antiga`, ou qualquer pasta irmã.
- Se você estiver em outro diretório com `.git` apontando para o mesmo remote: **PAROU. Esse diretório não é a fonte.** Migrar para o oficial antes de qualquer alteração.

## REGRA 2 — Nenhuma cópia paralela é fonte de verdade

- Cópias/backups servem apenas como referência histórica.
- O que vale é o que está em `main` (verificado via `git log`/`origin/main`) e o que está em produção.
- Nunca commitar de pasta paralela — conflito/divergência é acidente de processo, não feature.

## REGRA 3 — Antes de criar: procurar → entender → reutilizar → adaptar → somente então criar

- Buscar por componente/engine/API/hook existente antes de escrever um novo.
- Entender o que já resolve o problema. Adaptar se for quase. Criar só se nada existir.

## REGRA 4 — Antes de modificar: ler → mapear impacto → alterar → testar → revisar

1. Ler o arquivo E o contexto (imports, consumidores, docs).
2. Mapear impacto: quem usa, qui depende, o que pode quebrar.
3. Alterar com o menor diff possível.
4. Rodar typecheck + testes + build.
5. Revisar o diff antes do commit.

## REGRA 5 — Não criar API se uma API existente resolve

- Ver catálogo em `docs/05-OPERATIONS/PONTE-SOURCE-OF-TRUTH.md` §16 e a auditoria de APIs (P100C).
- Conflitos já conhecidos: `/api/patrimonio` vs `/api/cognitive-heritage` (pendência de decisão) — NÃO criar nova API de patrimônio.

## REGRA 6 — Não criar componente se já existe componente equivalente

- Verificar `sistema/src/components/` (94 arquivos hoje). Reutilizar `shared/*`, `ui/*`, marca (`brand/ponte-logo.tsx`).

## REGRA 7 — Não criar regra de negócio sem origem

- Toda regra precisa de origem: ADR, milestone, produto ou campo real. Sem origem → hipótese, não regra.
- Hipóteses ficam em `docs/08-KNOWLEDGE/HYPOTHESES.md` — nunca viram regra sem validação.

## REGRA 8 — Não criar schema/migration apenas para resolver necessidade local

- Avaliar a arquitetura antes. Migrations têm risco real (Supabase shadow DB quebra na 002; 12 migrations hoje, várias manuais).
- Tabela nova = patrimônio novo — exige justificativa e documentação.

## REGRA 9 — Não transformar hipótese em regra

- Ver `CURRENT_PRODUCT.md` §4. Ex.: Inteligência Coletiva, recomendações, Machine Learning — tudo hipótese/futuro, não funcionalidade.
- O Motor Operacional (P80/P81/P82) fica **bloqueado** até evidência de campo (OBSERVADO = ∅).

## REGRA 10 — Toda alteração importante precisa ter motivo rastreável

- Commit claro, escopo fechado, referência (rodada P###, ADR, KNOWN_ISSUES).
- Nada de "limpeza" sem propósito, refactor fora do escopo, ou mudança de domínio sem atualização documental.

---

## Fluxo operacional padrão (toda tarefa)

```
Objetivo (qual problema resolve?)
Arquivos envolvidos
Problema resolvido
Critérios de aceite
Impacto no produto
Impacto arquitetural
Documentação afetada
Riscos
Plano de implementação
```

(Fonte: `AGENTS.md` raiz — formato obrigatório de início de tarefa.)

---

## Matriz de decisão para novas funcionalidades

Toda funcionalidade bloqueada sem 6 respostas claras (`AGENTS.md` raiz):
1. Qual problema do empresário resolve?
2. Ajuda a decidir melhor?
3. Reduz trabalho manual?
4. Gera conhecimento futuro?
5. Fortalece um patrimônio da Ponte?
6. Pode ser usada semanalmente?

## Princípio central (imutável)

> **A Ponte não aumenta a carga operacional do empresário.**
> Ordem de captura de informação: informação já existente → evento natural → integração → entrada simples → pergunta contextual → formulário completo (último recurso).

## Estados de funcionalidade (nunca só "feito/não feito")

`IDEIA → INVESTIGAÇÃO → DESCOBERTA → VALIDAÇÃO → APROVADA → IMPLEMENTADA → EM PRODUÇÃO → OBSERVADA → EVOLUÇÃO → BLOQUEADA → ARQUIVADA`

Use esses rótulos em reports e no `P100C-STATUS-DA-PONTE.md`.

## Backlog vs Trabalho atual

- Algo importante mas não necessário agora? → `docs/05-OPERATIONS/BACKLOG.md` (ou BACKLOG_ARQUITETURAL.md).
- Nunca implementar "trabalho por trabalho".

## Entrega (nunca ZIP como substituto)

Entrega real = código alterado + documentação + testes + commit + push + resumo.
ZIPs servem apenas como anexo/backup, NUNCA como a implementação.

---

## Governança de identidade (P100B preservada)

- Forma oficial: `PonteSymbol`/`PonteLogo` em `components/brand/ponte-logo.tsx` + 8 SVGs de `public/brand/` + `app/icon.svg` (canônico).
- **Proibido:** `✦`, símbolos antigos (A Travessia/P99/P100), ponte literal de engenharia, estrela decorativa, lozenge como caractere.
- `favicon.ico` pré-P96 foi removido na P100C — novos ícones devem usar SVG (file convention `app/icon.svg`).
- Não redesenhar, não simplificar, não substituir a P100B (decisão do Founder — P100C §9/§29).

---

## Regra de ouro final

> Nunca decida sozinho. Conflito entre docs, ou entre pedido e documentado: **pare, registre em `docs/05-OPERATIONS/KNOWN_ISSUES.md`, pergunte.**