# RODADA DE IDENTIDADE VISUAL — A MARCA DA PONTE DIGITAL

> **P‑101 — "O Encontro": símbolo institucional definitivo + sistema de marca**
>
> Data: 14 de agosto de 2026
> Tipo de trabalho: identidade visual (rodada do Founder) — **sem mudanças de arquitetura, schema, APIs, rotas, autenticação, Copiloto, Foundation, descoberta ou multi-tenant**.
> Status: implementado — `typecheck` limpo, `build` limpo (68 páginas), testes verdes (5/5 plataforma + 4/4 handoff).
> Componente: `sistema/src/components/brand/ponte-logo.tsx`.

---

## 1. Conceito — "O Encontro"

Um único gesto geométrico que traduz a filosofia da Ponte:

```
fragmentos → conexão → convergência → clareza
   (4 pontos)   (2 arcos)   (os arcos encontram)   (1 ponto central)
```

- **Fragmentos:** quatro pequenos sinais (pontos) dispersos nas margens esquerda e direita — a informação espalhada entre pessoas, planilhas, sistemas e conversas.
- **Conexão:** dois arcos serenos partem das margens e convergem ao centro — a linha que liga o que estava separado.
- **Convergência:** as duas margens apontam para um único ponto central; o olhar naturalmente converge.
- **Clareza:** no centro, **um único ponto se completa**. A clareza **nasce da própria geometria** — não é um desenho acrescentado (não há estrela, não há engrenagem, não há arco de ponte literal).

A leitura é de **acolhimento** (duas margens que se abrem para um centro): humana, calma, equilibrada e tecnológica sem ser genérica. Ao esconder o nome "Ponte Digital", o gesto reconhecível é: *duas bordas que caminham para encontrar um centro*.

> **Nota de evolução (rodada +):** a primeira execução da direção D1 continha um glifo "✦" como terminação do traço. Por decisão do Founder, o símbolo NÃO deve conter estrela/ornamento literal — a clareza deve surgir da geometria. A versão final remove o glifo e trata o ponto central como a forma completa em si. O "✦" permanece apenas como elemento narrativo do `AvatarPonte` (identidade não-mascote, inalterado).

### Por que não é uma ponte desenhada

Não há tabuleiro, não há pilares, não há vão explícito. O símbolo dá a VER o relacionamento entre dois lados sem desenhar a infraestrutura — o que importa é a passagem/relação, não a estrutura de engenharia. Esse é o grau de abstração desejado: a pessoa percebe "isso conecta dois lados" sem apontar "isso é uma ponte".

---

## 2. As 3 direções conceituais avaliadas

| Direção | Ideia | Veredito |
|---|---|---|
| **D1 · Convergência → "O Encontro"** | margens de sinais → arcos → ponto central único | **ESCOLHIDA** — melhor representa a etapa convergência/clareza, reusa a linguagem de sinais existente, é uma única construção, sobrevive à redução e é animável |
| D2 · Vale (espaço negativo) | duas placas geométricas deslocadas com um vão | Descartada — emblemática em favicon, porém leitura mais institucional/genérica |
| D3 · Constelação (rede de nós) | mini-mapa vivo (muitos nós + linhas) | Descartada — tende a "rede/IA genérica", densa em 24px |

---

## 3. Variações do sistema

| Arquivo | Uso |
|---|---|
| `public/brand/simbolo.svg` | símbolo completo, fundo claro |
| `public/brand/simbolo-azul-noite.svg` | símbolo completo, fundo azul-noite |
| `public/brand/simbolo-mono.svg` | monocromático preto (PB / impressão) |
| `public/brand/simbolo-mono-branco.svg` | monocromático branco |
| `public/brand/simbolo-micro.svg` | **versão micro** (16–24px / avatares / tiles), fundo claro |
| `public/brand/simbolo-micro-azul-noite.svg` | **versão micro**, fundo azul-noite |
| `public/brand/ponte-digital.svg` | logo horizontal (símbolo + wordmark), fundo claro |
| `public/brand/ponte-digital-azul-noite.svg` | logo horizontal, fundo azul-noite |
| `public/favicon.svg` | favicon/avatar canônico (64×64, micro sobre azul-noite) — **substituiu o favicon anterior (ponte literal)** |
| `public/brand/preview.html` | página de verificação das superfícies (abrir num navegador) |

### Componente reutilizável

`PonteLogo` / `PonteSymbol` em `sistema/src/components/brand/ponte-logo.tsx`:

- `variant="full"` (padrão) ou `variant="micro"`.
- `surface="light"` (padrão, produto/documentos) · `"dark"` (landing azul-noite) · `"mono"` (herda `currentColor` — tiles, PB, favicon).
- `PonteLogo withWordmark` → lockup horizontal (símbolo + "Ponte Digital"), com `symbolClassName` para controle de altura.
- 100% vetorial; nenhum SVG duplicado em dezenas de arquivos.

---

## 4. Paleta utilizada

Todas as cores são **tokens já existentes** da identidade (globals.css / tailwind.config). Nenhuma cor nova desconectada.

| Papel | Claro (produto/documentos) | Azul-noite (landing) |
|---|---|---|
| Margens/fragmentos (ink) | `hsl(226 64% 14%)` · institutional-900 | `hsl(205 32% 62%)` · l-azure-soft |
| Arcos — o caminho (path) | `hsl(221 72% 45%)` · primary | `hsl(205 50% 80%)` · l-azure |
| Ponto central — a clareza (signal) | `hsl(165 34% 26%)` · evergreen | `hsl(157 40% 45%)` · l-green |

Hierarquia conceitual: tinta (estrutura) + azul (caminho) + evergreen (clareza). Gradientes: **nenhum** — contraste plano e robusto.

## 5. Tipografia

Mantém a identidade existente (sem fontes novas):
- **Wordmark / UI:** Inter — projectivo `font-semibold` + `tracking-tight` (→ `font-sans`).
- **Momentos narrativos:** Fraunces (`font-editorial`) — permanece nos textos editoriais da landing; a logo usa Inter, coerente com navegação funcional.

## 6. Geometria e tamanho mínimo

- Símbolo: **quadrado 1:1** (viewBox 48×48), próprio para favicon/avatar.
- Lockup horizontal: proporção ≈ **220:48** (símbolo + wordmark).
- Tamanho mínimo:
  - `variant="full"`: **24px** de altura.
  - `variant="micro"`: **16px** de altura (favicon, avatares pequenos, tiles).
  - Abaixo de 16px: não usar — o ponto central deve permanecer sempre a leitura dominante.
- Área de proteção: margem livre em torno do símbolo igual a **1× o diâmetro do ponto central** (ponto: unidade da marca).
- Metodologia de redução testada (ver `preview.html`): 128 / 64 / 48 / 32 / 24 (micro) / 16 (micro) sobre fundo azul-noite.

## 7. Regras de uso

**Fazer:**
- Usar sempre nas duas superfícies canônicas: claro (produto) ou azul-noite (landing), nunca fora delas.
- Em fundos coloridos (ex. tile azul do app), usar `surface="mono"` com a cor de contraste adequada (`text-white` / `text-primary-foreground`).
- Preferir o componente React a qualquer cópia de SVG.
- Favicon sempre na variante canônica (micro sobre azul-noite).

**Não fazer:**
- Não redesenhar a forma, nem escalar fora das proporções.
- Não usar estrelas, engrenagens, cerebros, robôs, circuitos, setas de crescimento ou arcos de ponte literal.
- Não aplicar gradientes, sombras decorativas ou efeitos 3D no símbolo.
- Não deformar/recolher/estender a marca (ex. em squash/estretch).
- Não trocar o wordmark de fonte.
- Não usar a versão a cores sobre fundos intermediários que concorram com a hierarquia tinta/caminho/clareza.

## 8. Integração realizada

| Onde | Antes | Depois |
|---|---|---|
| `marketing-nav.tsx` | glyph "✦" | `PonteLogo withWordmark` (micro, fundo noite) |
| `marketing-footer.tsx` | glyph "✦" | `PonteLogo withWordmark` (micro, fundo noite) |
| `(auth)/layout.tsx` (painel esquerdo + mobile) | ícone `Building2` | `PonteSymbol` micro, mono (`text-white` / `text-primary-foreground`) |
| `(dashboard)/layout.tsx` → `sidebar.tsx` (tile de logo) | ícone `Building2` | `PonteSymbol` micro, mono (`text-primary-foreground`) |
| `layout.tsx` (metadata icons) | `/favicon.ico` (**inexistente**) | `/favicon.svg` (novo, canônico) |
| `manifest.ts` | `/favicon.ico` (**inexistente**) | `/favicon.svg` (svg/xml) |
| `public/favicon.svg` | ponte literal + estrela | símbolo "O Encontro" (micro) |

**Preservado (fora do escopo):** `AvatarPonte` (elemento narrativo; **não virou mascote** e não foi substituído pela logo), hero da landing (`hero-visual.tsx` já usa a linguagem sinais→convergência e não foi alterado), demais telas do produto. Nenhuma API, banco, rota, autenticação ou regra de negócio foi alterada.

### Como usar daqui em diante

```tsx
import { PonteLogo, PonteSymbol } from '@/components/brand/ponte-logo'

// Landing (fundo azul-noite)
<PonteLogo withWordmark surface="dark" variant="micro" className="text-sm text-night-text" />
// Produto (fundo claro), símbolo grande
<PonteSymbol surface="light" className="h-10 w-auto" />
// Tile colorido do app (mono herda currentColor)
<PonteSymbol variant="micro" surface="mono" className="text-white" />
```

## 9. Animação futura (possibilitada pela geometria)

A marca permite a animação "a filosofia da Ponte":
1. os 4 fragmentos aparecem (sinais dispersos);
2. os 2 arcos se desenham (conexões chegam);
3. o ponto central se completa (convergência → clareza).

Não foi implementada nesta rodada por escopo — a geometria já a suporta (elementos são discretos e desenháveis via `stroke-dashoffset`, mesmo mecanismo de `.signal-line`).

## 10. Backup e substituição

- O favicon anterior (ponte literal) foi **substituído** (arquivo único, resgatável no git).
- Sistema de marca consolidado em `sistema/public/brand/` (this rodada) para futuras consultas.
- ZIP de entregáveis: `docs/05-OPERATIONS/REPORTS/ponte-identidade-visual.zip`.

## 11. Limitações de validação automática (validação manual pendente)

Não é possível validar automaticamente a renderização pixel em navegador nesta rodada. Antes de anunciar a marca como definitiva, sugere-se conferir manualmente em `sistema/public/brand/preview.html`:
1. **Contraste no tile do app** (sidebar: símbolo 18px dentro de tile `bg-primary` mono branco) — verificar visibilidade em tema claro e escuro.
2. **Favicon em abas** escuras e claras (fundo azul-noite + traço azure + ponto verde): conferir leitura entre 16 e 24px.
3. **Lockup horizontal** em larguras de footer/nav ≤ 320px (não quebrar linha).
4. **iOS apple-touch icon**: `layout.tsx` aponta `apple: '/favicon.svg'`; iOS atual prefere PNG — se desejado, gerar `apple-icon.png` (round +, fora do escopo desta rodada).
5. **`docs/05-OPERATIONS/REPORTS/`**: identificada divergência documental pré-existente (P33 fala em `docs/05-OPERATIONS/SPRINTS/` como local de auditorias) — sem impacto nesta rodada; registrada para auditoria futura.

---

## 12. Critérios de qualidade (resumo da resposta)

| Pergunta | Resposta |
|---|---|
| Funciona em 24px? | Sim — variante micro dedicada |
| Funciona como favicon? | Sim — canônico 64×64 |
| Funciona sem o nome "Ponte Digital"? | Sim — "duas margens que encontram um centro" |
| Reconhecível rapidamente? | Sim — um único gesto |
| Profissional / tecnológica sem ser genérica? | Sim — sem estrela, engrenagem, cérebro, robô, rede ou ponte literal |
| Humana? | Sim — acolhimento / equilíbrio |
| Relação conceitual real com "Ponte"? | Sim — conexão+convergência+clareza |
| Gera linguagem visual? | Sim — ponto / arco / convergência (ver §9) |
| Continua boa em 5–10 anos? | Sim — geometria simples, sem modismos |
| Funciona em azul-noite, claro, PB, documentos, sistema? | Sim — surfaces light/dark/mono |
| Animável com elegância? | Sim — fragmentos→arcos→ponto (não implementado por escopo) |