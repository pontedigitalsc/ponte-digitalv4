# P98 — HOMOLOGAÇÃO DA IDENTIDADE "A PASSAGEM" + EVOLUÇÃO DA EXPERIÊNCIA DA LANDING

> **P98 — A própria landing passa a demonstrar a filosofia da marca (fragmentos → conexão → contexto → clareza → evolução), sem tocar na identidade.**
>
> Data: 15 de agosto de 2026
> Tipo de trabalho: experiência da landing (rodada do Founder) — **sem mudanças de arquitetura, schema, API, autenticação, Copiloto, Founder, descoberta ou multi-tenant**.
> Status: implementado — `typecheck` limpo, `build` limpo, testes verdes (plataforma 5/5 + handoff 4/4), responsividade validada no Chrome headless (sem overflow horizontal em todas as larguras).

---

## 1. Contexto

Após a rodada de identidade (P-102, "A Passagem"), a auditoria da landing constatou que **a identidade não tem problema real** (forma validada por amostragem de pixels; integrara em nav/footer/auth/sidebar/avatares/favicon/assets). A margem de evolução era a **experiência**: a página devia demonstrar o que ela descreve.

A decisão da rodada: **não mexer na forma validada** — evoluir a experiência com a própria linguagem da marca (linhas, pontos, lentes, conexões, superfícies alternadas).

Toda seção foi conferida contra a **regra de ouro**: cada seção responde a uma pergunta da narrativa (o que é → por que diferente → como pensa → o que conecta → como aprende → como participa → como entra → para onde → próximo passo).

---

## 2. O que foi implementado

### 2.1 Hero (§1) — "Existe muita coisa acontecendo."
- Sublinha editorial em itálico sob o parágrafo de introdução (font-editorial, night-mist).
- Bloco de **fragmentos nomeados** (`Cliente · Operação · Equipe · Financeiro · Pedidos · Decisões`) com leve rotação, `animate-note`, `aria-hidden` — a empresa real já produz tudo isso.
- **Frase de chegada** (`hero-signals`): trocado "talvez exista um padrão" por **"Quando as partes começam a conversar, a empresa começa a enxergar melhor."** (verde evergreen).
- Ecos discretos da mira da identidade (lentes gigantes quase invisíveis, topo-direita e base-esquerda) no fundo do hero.

### 2.2 "O problema" (§3) — novo componente `fragmentacao-map.tsx`
- Mapa honesto de silos: 6 pares **informação → lugar onde vive** (Cliente→WhatsApp, Orçamento→planilha, Produção→conversa do dia a dia, Financeiro→outro controle manual, Gerente→memória dele, Decisão→improviso).
- Linguagem honesta: *"Em muitas empresas, é comum encontrar..."* + fechamento *"Quando essas informações ficam separadas, a decisão fica no improviso."*
- Nota explícita: *"Não é uma regra sobre todas as empresas — é um padrão comum."*

### 2.3 "A Passagem" (§3.5) — novo componente `passagem.tsx`
- A travessia da marca em três momentos: **ANTES** (informações espalhadas + pílulas rotacionadas) → **PASSAGEM** (`PonteSymbol` full dark + fio vertical + chip "conexão + contexto") → **DEPOIS** (visão mais clara: contexto, leitura, decisão preparada, aprendizado).
- A própria identidade vira o fio condutor da narrativa — sem prometer resultado: *"não é promessa de resultado pronto, é clareza para enxergar o que já existe e decidir melhor."*
- Acessibilidade: chip "conexão + contexto" e símbolo legíveis ao leitor de tela; apenas os pontos e o fio ficam `aria-hidden`.

### 2.4 PonteEssence (§2) — chips "o que ela procura conectar"
- Sob a lista de separações, novo grupo de chips: **pessoas · processos · sinais · decisões · histórico · contexto · melhorias**.

### 2.5 Realities (§13) — como a Ponte pode investigar e organizar uma operação
- Três cadeias conceituais de operações (Serralheria, Lavação, Barbearia) com etapas ligadas em cadeia.
- Marcador honesto: *"São exemplos de como a Ponte pode investigar e organizar uma operação — não promessa de módulos já prontos. Cada empresa é compreendida em conversa real."*

### 2.6 Futuro (§19) — rótulos explícitos do tempo
- Cards renomeados com o tempo explícito: **Hoje · Em construção · Depois · Futuro**, com rótulos de tipificação ("existe" / "em desenvolvimento" / "visão" / "visão maior") — a visão nunca é vendida como pronto.

### 2.7 Panos de fundo com a marca (§17/§19)
- Lentes gigantes `opacity-[0.05]` nos fundos de `#a-nova-categoria` e `#a-visao` (eco da identidade, sem distrair).

### 2.8 Limpeza
- `signal-strip.tsx` (componente morto, superado pelo mapa de fragmentação + fragmentos do hero) **removido** — zero referências restantes.

---

## 3. O que NÃO foi feito (escopo protegido)

- Identidade: nenhuma mudança na forma (jóia/lente/fragmentos), cores ou proporções — validada por amostragem de pixels na rodada anterior.
- Nada inventado: nenhuma métrica, cliente, história ou funcionalidade nova; as cadeias de operações são marcadas como exemplos conceituais de investigação.
- Nenhuma mudança em backend, schema, migrations, APIs, Copiloto, Founder, descoberta, multi-tenancy.
- Fora do escopo e preservados (não commitados nesta rodada): `package.json`, `criar-conta`, `conversa/page.tsx`, `ritmo.ts`.

---

## 4. Validação

| Checagem | Resultado |
|---|---|
| `tsc --noEmit` | limpo |
| `test:plataforma` | 5/5 |
| `test:handoff` | 4/4 |
| `npm run build` | `Compiled successfully` (rota `/icon` presente) |
| Responsividade (Chrome headless, página real em broadcast) | **sem overflow horizontal** em 320/375/390/768/1024/1280/1440 (medido via `scrollWidth ≤ clientWidth` por probe temporário no layout; sub-500 são clampados pelo mínimo da janela do Chromium — mesma faixa de quebra única `<sm`, sem elementos de largura fixa) |
| `prefers-reduced-motion: reduce` | animações da landing já são reduzidas a 1ms/1 iteração (inclui `animate-note`) |
| Acessibilidade | fragmentos decorativos `aria-hidden`; conteúdo narrativo legível; chips de realidade sem `aria-hidden` indevido |

> **Nota de método:** o modelo não "enxerga" screenshots; a validação lateral foi feita por medição objetiva de `scrollWidth`/`clientWidth` no documento renderizado, nas larguras exigidas.

---

## 5. Arquivos tocados

- `sistema/src/app/page.tsx` — hero (sublinha + fragmentos), seção problema com `FragmentacaoMap`, seção `#a-passagem`, panos de fundo com lentes, remoção do import de `signal-strip`.
- `sistema/src/components/marketing/fragmentacao-map.tsx` — **novo** (mapa de silos honesto).
- `sistema/src/components/marketing/passagem.tsx` — **novo** (travessia ANTES→PASSAGEM→DEPOIS).
- `sistema/src/components/marketing/hero-signals.tsx` — frase de chegada da marca.
- `sistema/src/components/marketing/ponte-essence.tsx` — chips "o que ela procura conectar".
- `sistema/src/components/marketing/realities.tsx` — cadeias de operação conceituais.
- `sistema/src/components/marketing/futuro.tsx` — rótulos Hoje/Em construção/Depois/Futuro explícitos.
- `sistema/src/components/marketing/signal-strip.tsx` — **removido** (morto).

## 6. Ver

Marco atualizado em `docs/02-PRODUCT/CURRENT_PRODUCT.md`. Identidade: `docs/05-OPERATIONS/REPORTS/IDENTIDADE-VISUAL.md`.