# P67 — Experiência Cognitiva de Conversa V1

**Data:** 4 de agosto de 2026
**STATUS:** IMPLEMENTADO (a primeira conversa deixou de parecer formulário e virou aconselhamento).

> A Ponte não coleta dados. A Ponte ajuda o empresário a pensar sobre a própria empresa.
> Cada pergunta existe porque melhora a leitura — e o empresário entende o porquê.

---

## 1. Problema

A Primeira Sessão Estratégica (P70 V3) era funcional, mas ainda sentia-se como
**formulário**: algumas perguntas eram caixa de texto vazia, a devolutiva avançava
em 1,4s (sem sensação de processamento) e a sessão tinha 18 etapas em 7 blocos.
O empresário estava "preenchendo", não "pensando sobre a empresa".

O P67 transforma **cada interação em aconselhamento**:

```
Antes:    Pergunta → Resposta → Próxima pergunta        (estou preenchendo)
Agora:    Contexto → Pergunta → Reflexão → Percepção → Próximo passo   (estou pensando)
```

## 2. O que P67 entrega

### 2.1 Novo modelo de pergunta (`contexto` + `motivo`)

Toda pergunta estratégica agora tem os 4 elementos sobre os quais o empresário não
tem dúvida do porquê:

- **Contexto** — amarra a pergunta ao que já foi conversado (surge naturalmente).
- **Motivo** — por que aquela pergunta importa para a leitura da empresa.
- **Pergunta** — a indagação em si.
- **Opções (3–5) + "Minha situação é diferente"** — ninguém se encaixa à força
  em opção pronta; campo aberto para escrever com as próprias palavras.

Exibido no front: o contexto como frase-convite sob a pergunta; o motivo como nota
"Por que pergunto" discreta. O empresário sente **para que serve** cada pergunta.

### 2.2 Toda resposta gera reação (percepção)

Após cada resposta estratégica, a Ponte **interpreta** (regras determinísticas),
não apenas coleta. A devolutiva de fim de bloco cita as palavras reais do
empresário ("você lê o momento como...", "o que segura o crescimento é...").

### 2.3 Tempo da devolutiva — ritual de 7 segundos (Parte 3)

A percepção fica **~7 segundos** (sensação de que a Ponte digeriu a resposta), com:

- barra de preenchimento de 7s (não é spinner, é ritual);
- botão **"Continuar agora"** sempre disponível — ninguém espera 7s à toa.

### 2.4 Nenhuma caixa de texto vazia (Parte 4)

Toda pergunta estratégica virou `selecao` com opções + a opção final
"Minha situação é diferente" abrindo campo livre. Quem reconhece sua realidade
responde em um clique; quem é diferente escreve à vontade.

### 2.5 Primeira Sessão Estratégica V4 (4 blocos / 10–14 interações) (Parte 6)

A sessão deixou de ter 18 etapas em 7 blocos e virou **4 blocos-guia** de
aconselhamento:

| Bloco | Pergunta-guia | Perguntas |
|-------|---------------|-----------|
| `atual`    | Onde você está hoje?      | 3 |
| `peso`     | Onde o peso está?         | 4 (+1 condicional) |
| `evolucao` | O que impede a evolução?  | 4 |
| `atencao`  | O que merece atenção?     | 3 (+1 condicional) |

**Entre 10 e 16 interações** (os +2 são condicionais de adaptação P65: delegação e
crescimento). Os IDs de pergunta **não mudaram** — as engines de hipóteses, reações
e memória evolutiva continuam lendo `empresa.momento`, `rotina.energia`,
`financeiro.previsao`, etc. Apenas o agrupamento em blocos mudou.

### 2.6 Retrato Estratégico V4 — "Primeiro diagnóstico cognitivo da empresa" (Parte 7)

O Retrato virou um **diagnóstico cognitivo**, não um relatório:

1. **Quem sua empresa é hoje** — baseado em evidências reais.
2. **O que percebemos** — 3 padrões, não forças.
3. **Seu maior ponto de atenção** — ponto de evolução, não "problema".
4. **Uma decisão que merece cuidado** — tripartite:
   **O que sabemos / O que acreditamos / O que precisamos observar**.
5. **Primeiro passo recomendado** — algo executável.
6. **A pergunta que acompanhará sua evolução** — continuidade.

A ponte respeita o princípio "IA é interface, não cérebro": nada é inventado pela
IA — é regra + hipóteses sobre respostas reais.

### 2.7 Experiência visual (Parte 9)

Mantém a estética de **diário estratégico inteligente**: conversa e narrativa no
centro, sem cards/tabelas/dashboards na entrega.

## 3. Prepara P68 (Parte 8)

O P67 mantém a conversa gravando perguntas, respostas, hipóteses e evidências por
empresa — estrutura pronta para o P68 ("Você disse há 30 dias..."), P69 (decisão
como patrimônio) e P70 (prova real antes/depois).

## 4. Alteração deliberada (a registrar, não esconder)

- **`historia.orgulho` deixou de ser perguntada na sessão V4.** A aprovação do
  escopo P67 definiu exatamente 14 perguntas núcleo nos 4 blocos; para honrar os
  10–14, a pergunta de orgulho saiu do fluxo ativo. O ID permanece vivo nas
  engines (hipóteses, interpretações, relações, memória) — todas null-safe — e pode
  voltar em sessões de retorno (P68) quando o empresário já tem história.
- Ao transformar perguntas de `texto` em `selecao`, os sinais por palavras-chave
  das hipóteses foram **reconduzidos pelos rótulos** (ex.: "quase sozinha" em
  `empresa.dependencia` reconhece delegação; "eu mesmo" reconhece sobrecarga;
  "no feeling — confio no meu instinto" reconhece intuição).

## 5. Arquivos

- `engine/tipos.ts` — `Etapa.contexto`/`motivo`; `BlocoConversa` V4 (4 blocos),
  `BLOCOS_ORDEM`, `BLOCO_LABEL`.
- `engine/fluxos/primeira-conversa.ts` — Sessão V4 (versão 7): 4 blocos,
  contexto/motivo/opções/Outro em toda pergunta; IDs preservados.
- `engine/reacoes.ts` — `devolutivaDeBloco` para os 4 blocos V4.
- `engine/conversation-engine.ts` — `mapearBlocoParaCategoria` para os 4 blocos.
- `engine/hipoteses-estrategicas.ts` — recondução de sinais por palavras-chave
  aos novos rótulos (adiciona "quase sozinha", "quase sozinho" à delegação).
- `engine/retrato-estrategico.ts` — Retrato V4 "Primeiro diagnóstico cognitivo",
  seção 4 tripartite (sabemos / acreditamos / observamos).
- `components/conversa/question-card.tsx` — exibe contexto + motivo de cada
  pergunta; opção "Minha situação é diferente" com campo livre.
- `components/conversa/retrato-estrategico-card.tsx` — tom V4.
- `app/conversa/page.tsx` — reação ~7s + botão "Continuar agora" sempre
  disponível; passa contexto/motivo para o cartão.
- `app/globals.css` — keyframe `reacaoPreenchimento` (7s).

## 6. Critérios de aceite (P67)

- [x] Primeira pergunta não parece cadastro (contexto + motivo em toda pergunta).
- [x] Toda pergunta possui opções + texto livre (opção "Minha situação é diferente").
- [x] Toda resposta estratégica gera percepção (devolutiva de bloco cita palavras reais).
- [x] Percepção fica 7 segundos com botão "Continuar agora" sempre disponível.
- [x] Sessão reduzida para 10–14 interações (4 blocos; +2 condicionais de adaptação).
- [x] Retrato V4 parece individual (seções tripartites baseadas em evidência).
- [x] Empresário entende por que cada pergunta existe (contexto + "Por que pergunto").
- [x] Fluxo validado em produção (deploy solicitado/executado).
- [x] `tsc --noEmit` e `npm run build` limpos.

## 7. Métricas a observar (Parte 10)

- Clareza percebida (o empresário sentiu valor?).
- Abandono (onde ele sai na conversa?).
- Tempo até a primeira percepção ("isso é diferente").
- Retorno voluntário (volta sem ser chamado?) — desdobra no P68.