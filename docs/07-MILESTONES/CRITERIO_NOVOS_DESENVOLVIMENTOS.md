# Critério Oficial para Novos Desenvolvimentos

## Aprovado em: 29 de julho de 2026 — Foundation V2.0

---

## Princípio

Nenhuma funcionalidade entra na Ponte Digital sem passar por este critério.

Não importa quem propõe — founder, agente de código, parceiro, investidor ou usuário. Se não passar no critério, não entra.

---

## As 7 Perguntas

Toda proposta de nova funcionalidade deve responder **sim** a todas as 7 perguntas abaixo. Uma única resposta negativa impede a entrada.

### 1. Que capacidade fundamental ela fortalece?

Qual das 9 capacidades (Observar, Compreender, Clareza, Priorizar, Decidir, Executar, Aprender, Evoluir, Adaptar) é diretamente fortalecida por esta funcionalidade?

**Se a resposta for "nenhuma" ou "indiretamente":** a funcionalidade não pertence à Ponte.

### 2. Qual patrimônio cognitivo ela aumenta?

Dos 5 patrimônios (Operacional, Decisório, Conhecimento, Evolutivo, Coletivo), qual é aumentado por esta funcionalidade?

**Patrimônio aumentado =** a empresa sai com mais capacidade depois de usar do que antes.

### 3. Como ela reduz a carga cognitiva do empresário?

Esta funcionalidade **elimina uma decisão**, **automatiza um processo manual**, ou **substitui uma tela de registro**?

> Regra: se a funcionalidade adiciona uma tela onde o empresário precisa digitar algo que o sistema já poderia saber, ela falha nesta pergunta.

### 4. Como ela aumenta a capacidade adaptativa da empresa?

Capacidade adaptativa = a empresa consegue responder melhor a mudanças imprevistas depois de usar esta funcionalidade.

**Se a resposta depender de "o empresário vai aprender com o tempo":** falhou. Tem que ser mensurável imediatamente.

### 5. Como ela aumenta o Capital Cognitivo?

Capital Cognitivo = conhecimento validado + decisões tomadas + hipóteses testadas + capacidades desenvolvidas.

A funcionalidade gera aprendizado que fica como patrimônio da empresa?

### 6. Como ela será validada?

Especificar:
- Como saberemos se a funcionalidade gerou valor?
- Qual métrica concreta será observada?
- Em quanto tempo (dias/semanas) teremos evidência?

**Validação não pode ser "feedback positivo dos usuários".** Tem que ser métrica objetiva.

### 7. Como saberemos que gerou valor?

Valor = a empresa tomou uma decisão melhor, executou uma ação mais rápida, ou aprendeu algo que não sabia antes.

**Se a resposta for ambígua, genérica ou teórica:** a funcionalidade precisa de mais maturação antes de entrar.

---

## Casos Onde a Resposta é SEMPRE Não

- Funcionalidades que **apenas registram dados** sem gerar ação ou aprendizado
- Funcionalidades que **duplicam informação** já disponível em outro lugar
- Funcionalidades que **adicionam complexidade** sem remover complexidade equivalente
- Funcionalidades que **atendem um caso raro** em detrimento do fluxo principal
- Funcionalidades que **substituem julgamento humano** por decisão automatizada

---

## Rito de Entrada

1. **Proponente** responde as 7 perguntas por escrito
2. **Founder** revisa e aprova ou rejeita
3. Se aprovada: vira issue em `docs/05-OPERATIONS/BACKLOG.md`
4. Quando houver sprint disponível: entra como tarefa com as 7 respostas anexadas

Nenhuma funcionalidade pode ser implementada diretamente sem passar por este rito — inclusive por agentes de código.

---

## Exceções

As únicas exceções são:

1. **Correção de bugs** — não precisa passar pelo critério
2. **Melhorias de performance** — não precisa, desde que não mude comportamento
3. **Acessibilidade** — não precisa, desde que não mude funcionalidade
4. **Segurança** — não precisa, prioridade máxima

Toda exceção deve ser registrada em `docs/05-OPERATIONS/KNOWN_ISSUES.md` com justificativa.

---

**Este critério substitui todas as versões anteriores. Nenhuma funcionalidade entra sem passar por ele.**
