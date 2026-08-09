# P86 — Conversa de Configuração Cognitiva do Founder (Bloco B)

> **Status:** BLOCO B IMPLEMENTADO (Fases 7–10) — 8 de agosto de 2026
>
> O Bloco A (P85, Fases 1–6) entregou identidade/membership/fundação. O **Bloco B** entrega a
> Conversa de Configuração Cognitiva do Founder Principal (P86) em duas partes:
> **P86-1** (roteamento e estrutura do fluxo `configuracao-founder`, com a decisão de fluxo
> `decisaoFluxoInicial`) e **P86-2** (Fundação Cognitiva — compreensão → memória → hipóteses →
> retrato inicial → continuidade).
>
> ADR de referência: `docs/04-DECISIONS/ADR/ADR-037-founder-identidade-membership.md` (P85).

---

## 1. Objetivo

O Founder Principal administra a Ponte Digital usando a **mesma ferramenta** que a Ponte constrói
para os Founders do Futuro. Antes de configurar o produto, a Ponte precisa entender **quem está
administrando-a e como ele pensa a própria empresa**. A configuração é uma **conversa cognitiva
profunda** — não formulário — que termina com um **Retrato Inicial** da Ponte lida pelo próprio
Founder.

## 2. P86-1 — roteamento e fluxo

- **Rota** `decisaoFluxoInicial(eFounderPrincipal, configuracaoConcluida)` em
  `sistema/src/engine/fluxos/configuracao-founder.ts`: `FOUNDER_PRINCIPAL` ainda sem configuração
  concluída → fluxo `configuracao-founder`; **qualquer outro caso** → `primeira-conversa`.
- **Fluxo `CONFIGURACAO_FOUNDER`**: 13 interações em 6 blocos (`fundador_identidade`,
  `fundador_realidade`, `fundador_fluxo`, `fundador_decisoes`, `fundador_evolucao`,
  `fundador_atencao`), com `contexto`+`motivo`, opções 3–5 e "Minha situação é diferente".
- **Sem infraestrutura nova:** grava em `Conversa` + `RespostasConversa` + `IdentidadeDigital`
  como hoje; nenhuma tabela/migration nova.
- **Testes determinísticos** (`configuracao-founder.test.ts`, 5 casos).

## 3. P86-2 — Fundação Cognitiva

A leitura da conversa do Founder reutiliza **todas as engines existentes** (P70/P72/P73/P77/P78)
com **adaptadores mínimos de contexto** — nunca engines ou tabelas paralelas:

### 3.1 Hipóteses estratégicas do Founder (`sistema/src/engine/hipoteses-estrategicas.ts`)

- Guarda `ehConversaFounder(respostas)` (presença de `fundador.papel` / `fluxo.afastamento` /
  `atencao.mudanca`), que roteia `gerarHipoteses` → `gerarHipotesesFounder` e
  `gerarLeituraCognitiva` → `gerarLeituraFounder`.
- Hipóteses determinísticas: `founder_dependencia_pessoal`, `founder_construcao_fase`,
  `founder_decisao_por_evidencia|momento`, `founder_conhecimento_na_cabeca|sistema`,
  `founder_trava_principal` (todas com `forca` 1–3 e `confianca` BAIXA/MEDIA/ALTA).
- A leitura P72 conecta: centralidade × querer girar com menos (contradição), trava
  `decisoes.trava` × afastamento `fluxo.afastamento` (conexão) e entrega a frase que o Founder
  queira guardar.
- Regra **SABEMOS / ACREDITAMOS / INVESTIGANDO** — nenhuma hipótese vira rótulo ou sentença.

### 3.2 Descobertas do Founder (`sistema/src/engine/motor-descobertas.ts`)

- `gerarDescobertas` roteia para `gerarDescobertasFounder` quando o contexto é Founder.
- 3 descobertas conectando **≥ 2 respostas de momentos diferentes**: `founder_girar_com_menos`
  (dependência × `atencao.mudanca`), `founder_conhecimento_sem_endereco` (aprendizado ×
  registro), `founder_fase_e_tracao` (`realidade.momento` × `decisoes.trava`).
- Guarda de evidência mantida: sem suporte, `insuficiente` — a Ponte diz que ainda não tem
  elementos para afirmar.

### 3.3 Interpretação da carta do Founder (`sistema/src/engine/interpretacoes.ts`)

- `interpretar` e `gerarResumoNatural` roteiam para variantes do Founder quando as respostas são
  do fluxo de configuração.
- A fala é sobre a **Ponte** (não sobre a empresa cliente): observação vem de `realidade.momento`,
  atenção de `decisoes.trava`/`fluxo.afastamento`/`atencao.mudanca`, alinhamento de
  `atencao.sucesso`/`evolucao.registro`/`atencao.nao_dito`. O `nao_dito` vira **lacuna
  investigável**, nunca conclusão.

### 3.4 Retrato Inicial (`sistema/src/engine/retrato-estrategico.ts`)

- `gerarRetratoEstrategico` roteia para `gerarRetratoFounder` quando o contexto é Founder —
  **sempre um Retrato Inicial** (não um veredito), com as 7 seções da jornada P73 aplicadas à
  Ponte (o que achei que a Ponte era / o que fui percebendo / descobertas / o que importa hoje /
  ponto não olhado / decisão sem pressa / pergunta aberta).

### 3.5 Continuidade

`persistirHipoteses` e `persistirDescobertas` gravam as leituras na Memória Viva
(`MemoriaCognitiva` + `SinalValor`) — a próxima conversa encontra o Founder com as hipóteses e
descobertas prontas para observação. Sem duplicação de memória: as persistências já são
idempotentes por versão.

## 4. Decisões de arquitetura

1. **Nunca engine paralela** — reúso total (P70/P72/P73/P77/P78), só adaptadores de contexto
   condicionados por `ehConversaFounder`.
2. **Um só caminho de persistência** — `persistirHipoteses`/`persistirDescobertas` adotados;
   nenhuma função nova de banco é criada.
3. **Determinístico, sem IA** — toda leitura é derivada das respostas reais; a guarda de evidência
   impede invenção.
4. **Comportamento da Primeira Sessão preservado 100%** — o roteamento só dispara no fluxo de
   configuração do Founder; testes comprovam que empresas seguem com a carta original.

## 5. Testes

- **Novos** (`sistema/src/engine/fluxos/configuracao-founder-cognitivo.test.ts`): 11 casos
  determinísticos — hipóteses `founder_*`, ordenação por força, determinismo, dependência com
  `forca=3`, Primeira Sessão preservada, contradição centralidade × girar com menos, conexão
  trava × afastamento, descobertas `founder_*`, guarda de evidência (`insuficiente`), carta fala
  da Ponte, Primeira Conversa intacta.
- **Legado**: `configuracao-founder.test.ts` (5) e `permissao-plataforma.test.ts` (5) seguem
  passando — **conjunto total 21/21**.
- `tsc --noEmit` limpo; `npm run build` limpo (63 rotas).

## 6. Pontos de atenção (registrados em KNOWN_ISSUES)

- Deploy de produção das migrations `008`+`009` + `founder:plantar-fundacao` **continua pendente**
  (pré-requisito para validar o fluxo ao vivo).
- O fluxo Founder usa **rótulos naturais** como valor gravado (mesmo padrão da Primeira Sessão);
  o texto das opções do `configuracao-founder.ts` é a fonte dos fragmentos de reconhecimento —
  alterar um rótulo pode mudar uma leitura (manter as regras em sincronia com os rótulos).
- `atencao.nao_dito` é uma pergunta de `texto` — vira **investigação**, nunca hipótese com valor.

## 7. Docs afetados

- `CURRENT_PRODUCT.md` (marco P86 Bloco B);
- `CHANGELOG_OFICIAL.md` (programa 86);
- `KNOWN_ISSUES.md` (pendência do Bloco B atualizada);
- `P85_PONTE_USA_A_PONTE.md` (seção Bloco B marcada como implementada);
- ADR-037 (não alterado — continua válido).

## 8. Próximos passos

- Validar a conversa de configuração em uma sessão real de produção (após deploy do Bloco A);
- Observar se as leituras do Founder (frases/contradições) não geram fricção na experiência;
- Continuar a calibração SABEMOS/ACREDITAMOS/INVESTIGANDO com dados reais (princípio V4 Founder).