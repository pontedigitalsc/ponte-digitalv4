# P72 + P73 — Engenharia da Transformação (Espelho Empresarial + Experiência da Descoberta)

**Data:** 5 de agosto de 2026
**STATUS:** IMPLEMENTADO (qualidade da reflexão da primeira sessão).

> **"A Ponte Digital não existe para responder perguntas. Ela existe para mudar a forma como um empresário pensa sobre a própria empresa."**
> Este programa NÃO adiciona módulos, funcionalidades, IA ou telas. Ele transforma profundamente a qualidade da reflexão produzida pela Ponte: a primeira sessão deixa de ser uma conversa interessante e passa a ser uma experiência transformadora.

---

## 1. Problema

Mesmo com P67 (contexto + motivo) e P70+P71 (reação conversacional e ritmo), a *entrega* da primeira sessão — o Retrato — ainda informava em vez de revelar:

1. **Mostrava fatos isolados, não relações.** O Retrato V4 citava respostas uma por uma, sem conectar causas.
2. **Não apontava contradições.** "Quero crescer" e "a empresa para sem você" ficavam como dois registros, não como um conflito a pensar.
3. **Parecia um relatório, não uma jornada.** A estrutura "diagnóstico" não contava como a Ponte havia chegado à leitura.
4. **Sem evolução da própria Ponte.** O Retrato nunca mostrava que a Ponte mudou de ideia durante a conversa.
5. **Não gerava frases memoráveis.** Nada que o empresário quisesse guardar.

## 2. O que P72 + P73 entregam

### 2.1 P72 — O Espelho Empresarial (mostrar relações, não dados)

Novo `gerarLeituraCognitiva(respostas, hipoteses)` em `hipoteses-estrategicas.ts`. A Ponte deixa de interpretar respostas isoladas e passa a **conectar causas**:

- **Relações:** caixa apertado → dependência ("Talvez o problema que você considera financeiro não seja financeiro. O caixa quase nunca é a origem — é o sintoma de uma operação que depende de você para girar."); crescimento + falta de tempo ("toda vez que você fala em crescer, também aparece falta de tempo — crescer, para uma pessoa que segura tudo, não soma, pesa mais").
- **Mapa mental:** pressão → centralização → sobrecarga → crescimento limitado → caixa apertado ("Não são fatos isolados; é um sistema. Tocar em um ponto você nos outros.").
- **Contradições:** querer crescer + empresa parar sem você ("Talvez essas duas respostas estejam em conflito"); querer previsibilidade + decidir por intuição; apontar o dinheiro como o peso + não saber o que vem no mês.
- **Frase memorável (P73, adiante):** "Seu maior desafio talvez não seja a falta de caixa. Talvez seja o excesso de dependência."

Tudo determinístico e **derivado das respostas reais** — nenhuma frase é template, nenhuma leitura aparece sem a evidência que a sustenta.

### 2.2 P73 — A Experiência da Descoberta (o Retrato revela)

`gerarRetratoEstrategico` foi reescrito para manter a mesma *entrega* (seis partes, continuidade) mas com uma **jornada** nova:

| # | Título | Conteúdo |
|---|---|---|
| 1 | O que eu achava que você era | hipótese inicial (primeiras respostas) |
| 2 | O que eu fui percebendo durante nossa conversa | relações + contradições do P72 |
| 3 | O que hoje parece me importante | síntese — o padrão que conecta |
| 4 | O ponto que talvez você ainda não esteja olhando | ponto cego (hipótese) |
| 5 | A decisão que eu não decidiria com pressa | baseada em tudo |
| 6 | A conversa que a gente deveria ter daqui a alguns dias | pergunta aberta |

- **Evolução da Ponte:** a seção 1 mostra que a Ponte partiu de uma hipótese e a seção 2 mostra o que mudou — "Eu achava que... fui percebendo... hoje acho".
- **Discórdia com evidência:** contradições e ponto cego mostram que o melhor conselheiro nem sempre concorda ("Talvez você esteja tentando resolver um efeito, não a causa").
- **Frases inesquecíveis:** novo campo `frase` no Retrato, exibido em destaque no topo e incluído no texto copiável.
- **Cerimônia retrabalhada:** os passos passaram a falar de *relações, padrão e descoberta* ("Vou voltar ao começo da conversa e rever as primeiras impressões", "Vou ver se percebi um padrão que ainda não tinha notado").

## 3. Implementação

- `src/engine/hipoteses-estrategicas.ts` — `LeituraCognitiva` + `gerarLeituraCognitiva()`.
- `src/engine/retrato-estrategico.ts` — Retrato V5 em 6 seções de jornada + campo `frase`.
- `src/components/conversa/retrato-estrategico-card.tsx` — exibição do `frase` em destaque + copy inclui o destaque.
- `src/components/conversa/revelacao-card.tsx` — cerimônia de descoberta (mensagens) + título "Olhando para sua empresa de um jeito novo".

## 4. Critérios de aceite

- [x] A Ponte mostra RELAÇÕES, não dados isolados (caixa ↔ dependência ↔ sobrecarga).
- [x] Identifica contradições (crescer × delegar; previsibilidade × intuição).
- [x] Monta mapa mental de causas (cadeia de pressão→caixa).
- [x] Mostra a evolução da própria Ponte dentro do Retrato (hipótese inicial → descoberta).
- [x] O retrato vira descoberta (estrutura de jornada, não relatório).
- [x] Produz frase inesquecível exibida como destaque.
- [x] Discórdia só com evidência; nunca inventa padrão.
- [x] Nenhum módulo, função, IA ou tela adicionada.
- [x] `tsc --noEmit` limpo e `npm run build` limpo.

## 5. Não fazer

- Não usar IA para gerar relações, contradições ou frases.
- Não mostrar padrão sem a evidência que o sustenta.
- Não transformar "descobrir" em rotular a empresa ("sua empresa é X") — tudo como hipótese a ser observada.
- Não criar novas telas/módulos para "exibir" a descoberta.

## 6. Documentos irmãos

- `P70_P71_EXPERIENCIA_COGNITIVA_V1.md` — ritmo e reação da conversa.
- `P67_EXPERIENCIA_COGNITIVA_DE_CONVERSA_V1.md` — contexto + motivo + Retrato V4.
- `P65_MEMORIA_EMPRESARIAL_VIVA.md` — hipóteses como coisa a observar.