# P64 — O Retorno

**Data:** 3 de agosto de 2026
**STATUS:** IMPLEMENTADO (V1 — mecanismo de retorno no produto).

> O Retrato entrega a primeira sessão. O Retorno faz a primeira sessão virar relação.
> Pergunta central (do Protocolo Founder 1–10): _"Você voltou para olhar sua empresa?"_

---

## 1. Problema

A auditoria P59–P63 concluiu: a primeira sessão entrega o Retrato Estratégico, mas
**não existe mecanismo de retorno/evolução** no produto. O Protocolo Founder 1–10 prevê
"Depois de 7 dias" de forma **manual** (WhatsApp, registro à mão). P63 já media
"empresas que retornaram em 7 dias" — mas nada no produto criava ou capturava esse retorno.
O enum `EventoAtivacao.PRIMEIRO_RETORNO` existia no schema e nunca era gravado.

## 2. O que P64 entrega

**O Retorno é um mecanismo de produto que fecha o loop da primeira sessão:**

1. **Agendamento** — ao finalizar a primeira conversa, a Ponte agenda um retorno
   para **7 dias depois** (`Conversa.retornoDisponivelEm`). Não cobra: apenas lembra
   que quer saber o que aconteceu depois da conversa.
2. **Check-in de 1 minuto** — quando o empresário volta (com o cookie `conv_token`
   ou logado) e a janela está aberta, o `/conversa` mostra, junto do Retrato — nunca
   o bloqueando — o check-in: _"O que aconteceu depois da nossa conversa?"_ com as
   opções derivadas do Protocolo (Voltei a olhar a empresa / Comecei algo que a conversa
   apontou / Mudou minha visão sobre a empresa / Ainda não fiz nada) + texto livre.
3. **Evidência real** — a resposta vira `SinalValor` tipo `RETORNO_7_DIAS`
   (metadata: `mudou`, `mudouRotulo`, `texto`, `respondidoEm`, `conversaId`) e grava
   o `EventoAtivacao.PRIMEIRO_RETORNO` (que alimenta o nível Fundador Validado).
4. **Funil anônimo preservado** — conversa anônima: a resposta fica pendente na
   conversa (`respostas.__retorno`) e é registrada quando a conta é criada (mesmo
   padrão da Clareza Gerada, P59). Nada se perde silenciosamente.
5. **Métrica no Painel do Fundador** — novo agregado `retornosRegistrados` em
   "Transformação, não funcionalidades" (P63): a prova de que o loop está fechando.

## 3. Implementação

- **Schema + migração 007** — `Conversa.retornoDisponivelEm` e `Conversa.retornoConcluidoEm`
  + índice `(empresaId, retornoDisponivelEm)`.
- **`src/engine/retorno-engine.ts`** — `agendarRetorno` (finalizar+7d, idempotente),
  `obterRetornoDisponivel` (GET), `registrarRetorno` / `registrarRetornoPendente` /
  `registrarRetornoDaConversa` (flush na criação da conta).
- **`src/app/api/conversa/retorno/route.ts`** — `POST /api/conversa/retorno`.
- **`GET /api/conversa`** — no bloco `retomando`, devolve `retorno: { disponivel, agendado, dataDisponivel }`.
- **`POST /api/conversa/finalizar`** — chama `agendarRetorno`.
- **`POST /api/auth/criar-conta`** — chama `registrarRetornoDaConversa` (flush).
- **`src/components/conversa/retorno-checkin.tsx`** — check-in de 1 minuto,
  complementar ao Retrato.
- **`src/engine/operacao-founder.ts` + `painel-do-fundador/painel.tsx`** —
  métrica `retornosRegistrados`.

## 4. Critérios de aceite

- [x] Finalizar a primeira conversa agenda o retorno (7 dias) — sem bloquear o Retrato.
- [x] Ao voltar dentro da janela, o check-in aparece junto do Retrato, sem cobrança.
- [x] A resposta vira `SinalValor RETORNO_7_DIAS` + `EventoAtivacao PRIMEIRO_RETORNO`.
- [x] Conversa anônima não perde o retorno (pendência → conta).
- [x] Painel do Fundador mostra `retornosRegistrados`.
- [x] `tsc --noEmit` limpo e `npm run build` limpo.

## 5. Não fazer

- Não enviar e-mail/WhatsApp automático de nudge (sem infraestrutura e antes de
  evidência; o nudge é em produto, onde o empresário já está).
- Não transformar o check-in em questionário obrigatório nem bloquear o Retrato.
- Não inventar retorno por "tempo de acesso": só conta o check-in registrado.

## 6. Documentos irmãos

- `PROTOCOLO_FOUNDER_1-10.md` (05-OPERATIONS) — o check-in automatiza o bloco
  "Depois de 7 dias" do protocolo.
- `P59_PRIMEIRO_VALOR_RETENCAO.md`, `P63_ESCALA_COMERCIAL.md`.
