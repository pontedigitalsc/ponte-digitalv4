# UX_DECISIONS.md — Decisões de Tom e Experiência Já Tomadas

Decisões que hoje estão espalhadas por vários documentos de produto/domínio, sem um lugar único de referência para quem escreve texto de interface, mensagens do Assistente, ou copy em geral.

## Regra central de tom

O mantra do produto ("não crie um ERP completo, crie um empresário mais tranquilo") é também uma regra de tom: toda tela, mensagem ou notificação deveria reduzir ansiedade, não adicionar mais uma coisa para o empresário gerenciar.

## CRM Invisível — o empresário age, não administra

O módulo de CRM é deliberadamente **uma lista de ações sugeridas**, não um cadastro de clientes nem um pipeline para gerenciar ativamente (`01-VISION/TERMINOLOGY.md`, `THESIS.md`). Consequência de copy: qualquer texto de interface do CRM deveria soar como "faça isso agora", não como "aqui está seu banco de dados de clientes".

## Nunca inferir estado emocional não declarado

Registrado no Nível 3 do `MAPA_DE_MATURIDADE.md` (árvore antiga) como "Camada de Sensibilidade Situacional": adaptar tom quando o empresário **sinaliza** um momento difícil, mas nunca inferir estado emocional que ele não declarou. Isso é uma regra de segurança de produto tanto quanto de UX — evita que o Assistente da Ponte pareça estar "lendo a mente" do usuário de forma invasiva.

## Diagnóstico — critério de aceite é também critério de UX

`07-BUSINESS/DIAGNOSTIC.md`: completável em até 5 minutos, nenhuma pergunta deve exigir mais do que uma resposta curta ou seleção. Isso não é só um critério técnico — é uma decisão de que o primeiro contato do empresário com o produto não pode parecer um formulário burocrático.

## Roteiro da primeira sessão (árvore antiga, `DIAGNOSIS_ENGINE.md`) — vale herdar para a árvore ativa

1. Diagnóstico completo no primeiro acesso.
2. Abertura do Centro de Decisão já com 3-5 itens, nunca vazio.
3. Fechar com uma ação concreta do CRM invisível (ex.: "Quer que eu monte uma mensagem de reativação agora?").

Critério informal, mas valioso: se o empresário sai da primeira sessão com uma ação concreta em mãos — não apenas um cadastro completo — o Diagnóstico cumpriu seu papel. **Recomendação:** copiar este roteiro para `07-BUSINESS/DIAGNOSTIC.md` (árvore ativa), que hoje não tem essa seção.

## Pendente de definição pelo fundador

- Governança de tom do Assistente da Ponte (o que ele pode/não pode dizer sobre a empresa do cliente, como lidar com perguntas fora do escopo do diagnóstico) — `01-VISION/TERMINOLOGY.md` já marca isso como `PENDENTE DE DOCUMENTO DEDICADO`. Continua pendente após esta auditoria.
- Conteúdo completo da Escada Comunitária (reconhecimento para os 100 fundadores) — continua `PENDENTE DE DEFINIÇÃO PELO FUNDADOR`.
