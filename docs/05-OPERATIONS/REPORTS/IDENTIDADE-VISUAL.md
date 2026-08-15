# RODADA DE IDENTIDADE VISUAL — A MARCA DA PONTE DIGITAL

> **P-102 — "A Passagem": evolução da identidade (o símbolo institucional definitivo)**
>
> Data: 15 de agosto de 2026
> Tipo de trabalho: identidade visual (rodada do Founder) — **sem mudanças de arquitetura, schema, APIs, rotas, autenticação, Copiloto, Foundation, descoberta ou multi-tenant**.
> Status: implementado — `typecheck` limpo, `build` limpo (69 rotas, incluindo `/icon`), testes verdes (5/5 plataforma + 4/4 handoff), validação programática da forma em 6 tamanhos.
> Componente: `sistema/src/components/brand/ponte-logo.tsx`.

---

## 1. Conceito — "A Passagem"

A primeira marca ("O Encontro", rodada P-101) era minimalista demais para carregar a personalidade institucional. A evolução mantém a mesma filosofia geométrica e adiciona **fluxo e segunda leitura**, sem perder a redução:

```
fragmentos → passagem → clareza + fluxo contínuo
  (6 pontos)  (lente)    (jóia)    (a forma continua = evolução)
```

- **Fragmentos (6):** pequenos sinais em duas colunas nas margens — a informação dispersa. Na leitura dinâmica, eles **se aproximam** (convergência).
- **Passagem — a lente:** dois arcos que se cruzam criando uma **lente/portal vertical** no centro. Uma ponte existe **sem ser desenhada**: o olhar atravessa a abertura. Abstraction idêntica da rodada anterior (nenhum tabuleiro, nenhum pilar — só a passagem).
- **Clareza — a jóia:** no centro da lente, o ponto central virou uma **jóia** (sinal evergreen). A clareza é o núcleo, não um detalhe das margens.
- **Fluxo (2 diagonais curtas):** nas pontas superior-direita e inferior-esquerda, a forma **continua para fora do enquadramento** — nada na empresa é estático; a marca nunca "acaba".
- **Segunda leitura — a mira:** lente + colunas laterais + jóia coincidem com uma **mira/olho**, reforçando o posicionamento **"Antes de melhorar sua empresa, enxergue-a melhor"** — sem ser literal (não é ícone de alvo/visão genérico).

### Por que não é uma ponte desenhada

Não há tabuleiro, pilares ou vão explícito. A **lente é a passagem** — a empresa atravessa a estrutura; o símbolo VAR ver o relacionamento entre dois lados sem desenhar a infraestrutura. Esse é o grau de abstração desejado.

> **Nota de evolução:** o glifo "✦" do `AvatarPonte` (rodada P-101) foi **substituído pela própria marca** (micro, mono). O `AvatarPonte` agora converge na marca — clareza = a Ponte. Nenhuma personificação foi criada: a marca não é mascote, é o ponto de convergência.

---

## 2. As 3 variações avaliadas (evolução visual)

| Variação | Ideia | Veredito |
|---|---|---|
| **A · Passagem** | colunas de pontos → lente/portal vertical → jóia + fluxos diagonais | **ESCOLHIDA** — personalidade institucional, segunda leitura (mira), única construção, animável (pontos se aproximam → lente se forma → jóia converge) e sobrevive à redução |
| B · Encontro | versão polida do símbolo anterior (4 pontos + arcos + ponto) | Descartada — leitura ambígua (balança/livro) e ainda minimalista |
| C · Fluxo | linhas fluidas atravessando arcos | Descartada — parece circuito/SaaS genérico; perde o "encontro" |

---

## 3. Variações do sistema

| Arquivo | Uso |
|---|---|
| `public/brand/simbolo.svg` | símbolo completo "A Passagem", fundo claro |
| `public/brand/simbolo-azul-noite.svg` | símbolo completo, fundo azul-noite |
| `public/brand/simbolo-mono.svg` | monocromático preto (PB / impressão) |
| `public/brand/simbolo-mono-branco.svg` | monocromático branco |
| `public/brand/simbolo-micro.svg` | **versão micro** (16–24px / favicon / avatares / tiles), fundo claro — lente + 2 pontos + jóia |
| `public/brand/simbolo-micro-azul-noite.svg` | **versão micro**, fundo azul-noite |
| `public/brand/ponte-digital.svg` | logo horizontal (símbolo + wordmark), fundo claro |
| `public/brand/ponte-digital-azul-noite.svg` | logo horizontal, fundo azul-noite |
| `public/favicon.svg` | favicon estático (64×64, micro sobre azul-noite) — usado pelo manifest/PWA |
| `src/app/icon.svg` | **ícone canônico do site** (file convention do Next) — `<link rel="icon">` SVG |
| `public/brand/preview.html` | página de verificação das superfícies (abrir num navegador) |

### Componente reutilizável

`PonteLogo` / `PonteSymbol` em `sistema/src/components/brand/ponte-logo.tsx`:

- `variant="full"` (padrão) ou `variant="micro"`.
- `surface="light"` (padrão, produto/documentos) · `"dark"` (landing azul-noite) · `"mono"` (herda `currentColor` — tiles, PB, favicon).
- `PonteLogo withWordmark` → lockup horizontal (símbolo + "Ponte Digital"), com `symbolClassName` para controle de altura.
- 100% vetorial; nenhum SVG duplicado.

---

## 4. Paleta utilizada

Todas as cores são **tokens já existentes** (globals.css). Nenhuma cor nova.

| Papel | Claro (produto/documentos) | Azul-noite (landing) |
|---|---|---|
| Fragmentos/ink (estrutura) | `hsl(226 64% 14%)` · institutional-900 | `hsl(205 32% 62%)` · l-azure-soft |
| Lente — o caminho (path) | `hsl(221 72% 45%)` · primary | `hsl(205 50% 80%)` · l-azure |
| Jóia — a clareza (signal) | `hsl(165 34% 26%)` · evergreen | `hsl(157 40% 45%)` · l-green |
| Fluxos (same path, opacity 0.7) | primary desbotado | l-azure desbotado |

Hierarquia: tinta (estrutura) + azul (caminho/passagem) + evergreen (clareza). Gradientes: **nenhum** — contraste plano e robusto.

## 5. Tipografia

Idêntica à rodada anterior (sem fontes novas): wordmark/UI Inter (`font-semibold` + `tracking-tight`); Fraunces (`font-editorial`) nos momentos narrativos.

## 6. Geometria e tamanho mínimo

- Símbolo full: **quadrado 1:1** (viewBox 48×48). Lente: `M 24 9.5 C 17.6 10.9, 13.9 16.7, 13.9 24 C 13.9 31.3, 17.6 37.1, 24 38.5` + espelho direito; 6 fragmentos em colunas (cx 8.2/7.6/8.2 e 39.8/40.4/39.8); fluxos `M 34.8 6.2 C…` e `M 24 38.5 C…`; jóia central r 3.4.
- Micro: lente espessa (stroke 3.4) + 2 pontos diagonais + jóia r 4.2 — legível em 16px.
- Lockup horizontal: proporção ≈ **224:48**.
- Tamanho mínimo: full **24px**; micro **16px**. Abaixo de 16px não usar.
- **Validação programática da forma (6 tamanhos):** renderização headless + amostragem por pixel (centro = jóia evergreen; x=30%/70% = lente primary; cobertura de tinta 20–33%) — a geometria é fiel de 16px a 96px em full e micro.

## 7. Regras de uso

**Fazer:**
- Usar sempre nas duas superfícies canônicas: claro (produto) ou azul-noite (landing).
- Em fundos coloridos (tile azul do app), usar `surface="mono"` com cor de contraste adequada.
- Preferir o componente React a qualquer cópia de SVG.
- Favicon sempre na variante canônica (micro sobre azul-noite).

**Não fazer:**
- Não redesenhar a forma, nem escalar fora das proporções (squash/stretch).
- Não usar estrelas, engrenagens, cérebros, robôs, circuitos, setas de crescimento, ícones de alvo/mira literais ou arcos de ponte com tabuleiro.
- Não aplicar gradientes, sombras decorativas ou efeitos 3D no símbolo.
- Não trocar o wordmark de fonte.
- Não usar a versão a cores sobre fundos intermediários que concorram com a hierarquia tinta/caminho/clareza.

## 8. Integração realizada

| Onde | Antes (P-101) | Agora (P-102) |
|---|---|---|
| `marketing-nav.tsx` | `PonteLogo withWordmark` → marca P-101 | componente atualizado → **nova marca** automática |
| `marketing-footer.tsx` | `PonteLogo withWordmark` | componente atualizado → **nova marca** automática |
| `(auth)/layout.tsx` + `sidebar.tsx` | `PonteSymbol` micro mono | componente atualizado → **nova marca** automática |
| `ui/avatar.tsx` → `AvatarPonte` | glifo "✦" narrativo | **`PonteSymbol` micro mono** (a convergência da presenza é a marca) |
| `layout.tsx` (metadata) | `src/app/icon.svg` canônico | atualizado para a nova marca (micro, azul-noite) |
| `manifest.ts` | `/favicon.svg` | mesma referência; arquivo atualizado |
| Landing `page.tsx` (P-101 intacta) | sem eco de marca | **linguagem P-102:** 2 lentes gigantes quase invisíveis + pontos no hero (eco da "mira"); **divisor "A Passagem"** (pontos → símbolo → pontos) entre a Fragmentação e o Mapa Vivo |

**Fora do escopo:** arquitetura, schema, APIs, rotas, autenticação, Copiloto, descoberta, Foundation, multi-tenant — nenhum arquivo tocado. `Building2` remanescente é funcional (preservado). Hero `hero-visual.tsx` intacto (já usa linguagem sinais→convergência).

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

## 9. Animação possível (geometria suporta)

1. os 6 fragmentos surgem (sinais dispersos); 2. aproximam-se / a lente se desenha (passagem); 3. o fluxo continua além do quadro (evolução); 4. a jóia converge ao centro (clareza). Não implementada nesta rodada por escopo — elementos discretos e desenháveis via `stroke-dashoffset` (mesmo mecanismo de `.signal-line`).

## 10. Backup e substituição

- Todas as formas anteriores resgatáveis no git; o símbolo P-101 foi **substituído** pela nova marca em todos os pontos (componente + `public/brand/*` + favicon + icon).
- Sistema de marca consolidado em `sistema/public/brand/`.

## 11. Validação desta rodada

1. **Programática (forma):** headless Chrome + amostragem de pixels — jóia central no pixel exato, lente nos dois lados, cobertura de tinta consistente em 16/20/24/48/96px (full e micro). A estética final permanece uma decisão humana: `sistema/public/brand/preview.html`.
2. **Manual pendente (decisão estética):** contraste no tile do app (sidebar 18px, mono branco), favicon em abas escuras/claras, lockup em larguras ≤ 320px, `apple-icon.png` (iOS ignora SVG — decisão manual, fora do escopo).
3. Nota plataforma: o Next mantém `<link rel="icon" href="/favicon.ico?hash">` default (placeholder padrão, não 404) mesmo com `app/icon.svg` — comportamento da plataforma.

---

## 12. Critérios de qualidade

| Pergunta | Resposta |
|---|---|
| Funciona em 24px? | Sim — variante micro dedicada |
| Funciona como favicon? | Sim — canônico 64×64 |
| Funciona sem o nome "Ponte Digital"? | Sim — a lente/portal é reconhecível |
| Reconhecível rapidamente? | Sim — gesto único (lente + jóia) |
| Profissional / tecnológica sem ser genérica? | Sim — sem estrela, engrenagem, cérebro, robô, alvo literal, rede ou ponte literal |
| Substantiva o bastante para institucional? | Sim — a lente adiciona peso que a versão minimalista não tinha |
| Tem segunda leitura? | Sim — "mira/olho": *antes de melhorar sua empresa, enxergue-a melhor* |
| Humana? | Sim — passagem acolhe; nada de máquina |
| Relação conceitual real com "Ponte"? | Sim — passagem + convergência + clareza + evolução |
| Gera linguagem visual? | Sim — pontos / lente / jóia / fluxo (já aplicada na landing: eco do hero + divisor) |
| Continua boa em 5–10 anos? | Sim — geometria simples, sem modismos |
| Funciona em azul-noite, claro, PB, documento, sistema? | Sim — surfaces light/dark/mono |
| Animável com elegância? | Sim — pontos → lente → jóia (não implementado por escopo) |