# P92-PONTE-DESCOBERTA — Descoberta Operacional + Pioneiro de Categoria (relatório)

> Missão designada "**P92 PONTE DESCOBERTA + PIONEIRO DE CATEGORIA**" — dar ao programa de
> campo real (P79/P82, bloqueado por "OBSERVADO = ∅") um **instrumento interno de trabalho**:
> um módulo de plataforma onde o condutor (Kelven) registra e organiza o que é encontrado na
> empresa real (1º caso: Serralheria Souza Mestrinho), segue um fluxo guiado obrigatório
> (pergunta-âncora P82 → taxonomia de fatos → COMO É × COMO PODERIA SER → divergências →
> oportunidades), gera um relatório final **determinístico, sem IA**, e marca a primeira
> empresa de cada categoria como **Pioneira de Categoria**.
>
> O que o P79 fez foi levantar a hipótese do Motor Operacional; o P82 provou que **não existia
> nenhum registro real de campo**. O P92 não inventa dados: ele constrói o **caderno de campo
> digital** para que o campo, quando visitado, deixe de ser vazio. Nada é alimentado por
> suposição — cada fato é classificado numa taxonomia e o que não tem confirmação não vira fato.

---

## 0. Resumo executivo

O módulo **Ponte Descoberta** está em produção, com:

- **Páginas novas:** `/admin/descoberta` (lista por estado, abas com contagem, acesso só
  `FOUNDER_VIEW_INTERNAL`) e `/admin/descoberta/[id]` (detalhe completo do diagnóstico).
- **Fluxo guiado obrigatório:** pergunta-âncora P82 (obrigatória no MVP), participantes,
  falas, fatos classificados pela taxonomia, processos COMO É, desenhos COMO PODERIA SER,
  divergências (dito × observado), oportunidades e relatório final.
- **Engine puro:** `src/engine/descoberta-operacional.ts` — 8 estados com transições
  explícitas, 7 tipos de registro com `exigeVerificacao`, níveis de confiança, papéis de
  participante, categorias de oportunidade, template de vertical (ADR-035), progresso
  (checklist) e **relatório com as 12 seções do briefing §21 em texto puro**.
- **Histórico + auditoria:** cada ação fica em `diagnosticos_operacionais_historico` e ações
  privilegiadas (resposta-âncora) também em `auditorias_plataforma`.
- **Pioneiro de Categoria:** a primeira empresa de uma categoria é marcada automaticamente
  (`empresaPioneiraId`) e exibida como "pioneira de categoria".
- **Commit:** `0929496` — push `3aaa6ec..0929496 → main`.
- **Produção:** migration `012` aplicada via `prisma migrate deploy`; push em `main` dispara o
  deploy automático da Vercel (integração Git — sem CLI de validação disponível nesta rodada).
- **Status:** typecheck limpo, build limpo, **15 testes novos verdes** + legado
  (`test:plataforma` 5/5, `test:handoff` 4/4).

---

## 1. O que existia (antes)

- O programa de campo (P79 → P82) tinha **tese e protocolo**, mas nenhum software: o P82 auditou
  o repositório e encontrou **OBSERVADO = ∅**, DITO = 3 declarações do enunciado, resto NÃO
  SABEMOS. Não havia onde registrar, organizar e reportar o campo.
- Existiam documentos (kit de campo `REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md`,
  `MOTOR_OPERACIONAL_TESE.md`, ADR-035) e a pergunta-âncora P82, mas **sem implementação**.
- A plataforma já tinha padrões a reutilizar: `painel-do-fundador`, `admin/founder-operacoes`
  (P91), `requirePlataforma`, `handleApiError`, validações zod, `useConfirm`, pills/timeline,
  e o padrão de auditoria (`auditorias_plataforma`).

---

## 2. Decisão de arquitetura

Auditoria concluída e **4 decisões aprovadas pelo usuário** antes de codificar:

1. **Nível PLATAFORMA** (sem tenant guard): dados internos do condutor, acesso restrito a
   `FOUNDER_PRINCIPAL`; `empresaId` é opcional e referencia a Empresa real quando existir.
2. **Uma entrega única** (MVP completo): os 15 blocos da especificação §19 num fluxo guiado,
   **sem IA** — tudo determinístico, documento decidiu não haver IA.
3. **Pergunta-âncora P82 obrigatória** no MVP (não opcional): é ela que define o primeiro
   recorte do campo.
4. **Relatório final em página + botão copiar** (sem PDF).

Padrões seguidos:

- **CORE universal, vertical como template (ADR-035):** nenhum setor hard-codado em código.
  A serralheria entrou como `TEMPLATE_SERRALHERIA` (slug `serralheria-metais`, 6 áreas, seed de
  perguntas) — gravado como dados/estrutura, nunca como módulo. Aprendizado entre empresas é só
  estrutural.
- **Engine puro** (como founder-operacoes): regras de negócio testáveis sem banco.
- **Patrimônio a proteger:** decisões, contexto e histórico ficam no banco; a IA (quando vier)
  é só interface — nunca a dona da lógica.

---

## 3. Modelo e banco (migration `012_descoberta_operacional`)

11 modelos novos (todos snake_case, padrão plataforma com `criadoPorUsuarioId`/`criadoPorEmail`,
soft delete `deletedAt` onde relevante, sem FK obrigatória de usuário):

| Modelo (tabela) | Papel |
|---|---|
| `CategoriaOperacional` (`categorias_operacionais`) | vertical/segmento — título, slug, descrição, template Json |
| `DiagnosticoOperacional` (`diagnosticos_operacionais`) | o caso: empresa (opcional), unidade, estado 8 posições, resposta-âncora, `empresaPioneiraId` |
| `DiagnosticoOperacionalHistorico` (`diagnosticos_operacionais_historico`) | timeline de ações no caso |
| `ParticipanteDescoberta` (`participantes_descoberta`) | quem é ouvido (PROPRIETARIO/GESTAO/OPERACAO) |
| `PerguntaDescoberta` (`perguntas_descoberta`) | perguntas seed do template da vertical |
| `RespostaDescoberta` (`respostas_descoberta`) | falas (DITO literal), ligadas a participante/pergunta |
| `RegistroDescoberta` (`registros_descoberta`) | fatos classificados pela taxonomia (7 tipos) + confiança |
| `ProcessoDescoberta` (`processos_descoberta`) | COMO É: início/fim/responsável/etapas/retrabalhos/dependências/riscos |
| `ProcessoDesejadoDescoberta` (`processos_desejados_descoberta`) | COMO PODERIA SER + validação com o campo |
| `DivergenciaDescoberta` (`divergencias_descoberta`) | dito × observado; vira pergunta de validação |
| `OportunidadeDescoberta` (`oportunidades_descoberta`) | candidatas a implementação |

Enums no banco: `StatusDiagnosticoDescoberta` (8), `PapelParticipanteDescoberta`,
`TipoRegistroDescoberta` (7), `ConfiancaDescoberta`, `StatusProcessoDesejadoDescoberta`,
`StatusDivergenciaDescoberta`, `CategoriaOportunidadeDescoberta` (9).

Física: enums + CREATE TABLE + índices + FKs com `ON DELETE` coerente (participantes/
falas/registros/processos/desenhos/divergências/oportunidades/histórico em cascata a partir do
diagnóstico).

### 3.1 Migration manual (importante)

`prisma migrate dev --create-only` **não funciona neste repositório**: a shadow database do
Supabase não reexecuta a migration `002` (`type "ImpactoHipotese" already exists`, erro P3006;
o `--from-url` também foi removido no Prisma 7). Solução adotada (mesma da `011`): **migration
escrita à mão** em `prisma/migrations/012_descoberta_operacional/migration.sql`.

### 3.2 Aplicação

`npx prisma migrate deploy` — aplicada com sucesso (todas as 12 migrations OK).

---

## 4. Regras de negócio (engine `src/engine/descoberta-operacional.ts`)

### 4.1 Pergunta-âncora (P82)

```
"Qual é a única bagunça que, se a gente eliminasse primeiro, faria o restante do trabalho ficar mais fácil?"
```

Gravada literalmente como `PERGUNTA_ANCORA`. O MVP exige resposta antes de considerar o caso
"em descoberta" completo (checklist + relatório não inventam a resposta — o relatório só usa o
que foi registrado).

### 4.2 Estados e transições (8 posições)

`NAO_INICIADO → EM_DESCOBERTA → MAPEADO → EM_VALIDACAO → VALIDADO → EM_IMPLEMENTACAO →
IMPLEMENTADO → EM_APRENDIZADO`, com voltas possíveis definidas em `TRANSICOES_STATUS_DIAGNOSTICO`
e validadas por `podeTransicionarStatusDiagnostico`. `STATUS_DIAGNOSTICO_COM_CONFIRMACAO` força
confirmação na UI (incluindo `EM_APRENDIZADO` com variante destrutiva).

### 4.3 Taxonomia de registros (7 tipos com `exigeVerificacao`)

| Tipo | Exige verificação? |
|---|---|
| CONHECIMENTO_CONHECIDO | sim (já sabia de antemão) |
| INFORMACAO_FORNECIDA | sim (dito na entrevista) |
| OBSERVACAO | não (fato observado) |
| HIPOTESE | sim |
| DECISAO | não |
| OPORTUNIDADE | não |
| MEMORIA_HUMANA | sim |

Regra central (do P82): **informação fornecida, conhecimento prévio e hipóteses não viram fato
sozinhos** — exigem verificação.

### 4.4 Categorias de oportunidade (as perdas de energia do P82)

GARGALO, RETRABALHO, ESPERA, DEPENDENCIA, INFORMACAO_FALTANTE, DECISAO_MANUAL, COMUNICACAO,
MEMORIA_HUMANA, IA_FUTURA — com rótulos PT-BR.

### 4.5 Progresso (checklist do campo)

`calcularProgressoDescoberta` define os passos obrigatórios (âncora, participantes, falas,
registros, processos, desenhos, oportunidade relatório) e aponta o "próximo passo" exibido no
detalhe (narrativa do condutor, sem IA).

### 4.6 Relatório

`montarRelatorioDescoberta` gera **texto puro com as 12 seções do briefing §21**, apenas com o
que foi registrado (nunca inventa a resposta da âncora).

---

## 5. Rotas e fluxo

**Páginas (gate `FOUNDER_VIEW_INTERNAL`):**

- `GET /admin/descoberta` — lista por estado (aba padrão `EM_DESCOBERTA`), cards com categoria e
  contagens.
- `GET /admin/descoberta/[id]` — server component que monta o agregado e passa ao componente
  client.

**API (15 rotas):** `diagnosticos` (GET/POST), `diagnosticos/meta`, `diagnosticos/[id]` (GET
detalhe agregado), `[id]/status`, `[id]/ancora`, `[id]/participantes`, `[id]/respostas`,
`[id]/registros`, `[id]/processos`, `[id]/processos-desejados`, `[id]/divergencias`,
`[id]/oportunidades`, `[id]/relatorio`, `divergencias/[id]/resolver`,
`processos-desejados/[id]/validar`.

Leituras (GET) exigem `FOUNDER_VIEW_INTERNAL`; escritas usam `FOUNDER_MANAGE_PLATFORM`.
Toda rota: zod → 422, `handleApiError`, mensagens PT-BR.

**Componente client:** `descoberta-detalhe.tsx` — checklist, banner "próximo passo", âncora +
resultado declarado, participantes, falas, registros (taxonomia + confiança), processos COMO É,
COMO PODERIA SER (com "Aprovar com o campo"), divergências (resolução "em campo" marcada como
pendente de validação), oportunidades, seletor de estado com `disabled` para transições
inválidas, `useConfirm` para estados pesados, relatório (gerar + copiar via clipboard) e
histórico (timeline).

---

## 6. Segurança

- **Nível plataforma, sem tenant guard**: dados internos do condutor — precedente
  `SolicitacaoFounder`/`AuditoriaPlataforma`. Nenhum endpoint expõe dados de outras empresas de
  forma não autorizada.
- **Gate em toda rota** via `requirePlataforma` (leitura vs. escrita com permissões distintas).
- **Validação de entrada** em todas as rotas (zod), incluindo slug `^[a-z0-9-]+$`.
- **Nenhuma lógica crítica no frontend** — todas as validações de domínio repetidas no servidor.
- **Auditoria** para resposta-âncora (ação privilegiada que muda o recorte do diagnóstico).

---

## 7. Arquivos alterados/criados

**Novos:**

- `sistema/src/engine/descoberta-operacional.ts` + `.test.ts` (15 testes)
- `sistema/src/services/descoberta-operacional.service.ts`
- `sistema/prisma/migrations/012_descoberta_operacional/migration.sql`
- `sistema/src/app/api/descoberta/**` (15 rotas)
- `sistema/src/app/(dashboard)/admin/descoberta/page.tsx` + `[id]/page.tsx`
- `sistema/src/components/descoberta/descoberta-lista.tsx` + `descoberta-detalhe.tsx`

**Modificados:**

- `sistema/prisma/schema.prisma` (11 modelos + enums anexados; sem tocar multi-tenancy)
- `sistema/src/lib/validations/index.ts` (seção `PONTE DESCOBERTA (P92)`, 12 schemas)
- `sistema/src/components/layout/sidebar.tsx` (item "Descoberta" com ícone Compass)

---

## 8. Validações (aceite)

- `npx tsc --noEmit` — limpo.
- `npm run build` — limpo; rotas novas listadas (incl. `/admin/descoberta`, `[id]` e as 15 APIs).
- Testes:
  - `descoberta-operacional.test.ts` — **15/15** (âncora, estados, transições, 7 tipos de
    registro, confiança, papéis, template ADR-035, categorias que cobrem as perdas do P82,
    progresso, relatório 12 seções).
  - `test:plataforma` — 5/5; `test:handoff` — 4/4 (legado intacto).
- `npx prisma migrate deploy` — migration `012` aplicada.
- Migration é **reversível**: `DROP TABLE` + `DROP TYPE` na ordem correta (ver GUIA, rollback).

---

## 9. Problemas encontrados

1. **Shadow database do Supabase não reexecuta a migration 002** (P3006 `type "ImpactoHipotese"
   already exists`). Migrations via `prisma migrate dev` ficam inviáveis neste repositório —
   padrão passa a ser **migration manual + `prisma migrate deploy`** (já era o caso da 011).
2. **`prisma migrate diff --from-url` removido no Prisma 7** — para contradanças contra o banco
   usar `--[from/to]-config-datasource`.
3. **Lucide-react `1.24.0` nesta instalação não exporta vários nomes canônicos** (`Copy`,
   `ClipboardList`, `ClipboardCopy`...). Substituídos no componente por ícones comprovados no
   codebase (`FileText`, `CheckSquare2`).
4. **Um `write` do componente de detalhe foi gravado num caminho errado** (`ponte-digital-move/…`)
   por engano; arquivo movido ao caminho correto e pasta fantasma removida.
5. **Sem CLI/token da Vercel** nesta máquina: o deploy fica no trilho automático da integração
   Git (o push em `main` dispara o build). Validar em `https://pontedigital.vercel.app/admin/descoberta`.

---

## 10. Produção, deploy e rollback

**Produção (git):**

1. `git add` somente do módulo PONTE DESCOBERTA (schema, migration 012, engine, service,
   validações, rotas, páginas, componentes, sidebar) — sem arrastar sujeira pré-existente.
2. `git commit -m "P92: Ponte Descoberta — …"` → `0929496`.
3. `git push origin main` → `3aaa6ec..0929496`.

**Banco:** `npx prisma migrate deploy` aplicou a `012_descoberta_operacional` (status: 12
applied).

**Deploy Vercel:** automático via integração Git (push em `main`). Não há CLI disponível nesta
máquina para disparo/validação manual — confirmar pelas rotas em produção.

### Rollback

- **Código:** `git revert 0929496 && git push origin main`.
- **Banco:** reverter a migration aplicando (na ordem) os `DROP TABLE` das tabelas novas
  (histórico → oportunidades → divergências → desenhos → processos → registros → respostas →
  perguntas → participantes → diagnósticos → categorias) e depois os `DROP TYPE` dos 7 enums —
  ou restaurar backup da plataforma. Migrations SQL são estado imutável no repositório.
- **Dados:** nenhum dado real de campo foi inserido ainda; o banco está pronto para o primeiro
  caso (Serralheria Souza Mestrinho) via UI.

---

## 11. Significado para o programa

- O P82 provou que **não havia campo registrado**. O P92 entrega o **instrumento** para que a
  próxima visita deixe rastro digital: pergunta-âncora obrigatória, fatos classificados,
  dito × observado separados, COMO É × COMO PODERIA SER, divergências e relatório.
- A regra absoluta permanece: **não se inventa**. O relatório só monta o que foi registrado; o
  sistema marca hipóteses e informações fornecidas como "exige verificação".
- O **Pioneiro de Categoria** transforma a primeira empresa real de cada vertical em patrimônio
  de aprendizado estrutural (ADR-035) — não em módulo novo.