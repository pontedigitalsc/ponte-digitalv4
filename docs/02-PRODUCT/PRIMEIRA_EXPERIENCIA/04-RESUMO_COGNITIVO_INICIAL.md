# Resumo Cognitivo Inicial

> PROGRAMA 15 — Documento 4 de 10
> Formato ideal do primeiro resumo natural: estrutura, tom, profundidade, limite, ordem

---

## Relatório de execução

- **Descobertas:** o sistema já gera interpretações determinísticas em `interpretacoes.ts` com 3 categorias: `pontoAtencao`, `observacao`, `alinhamento`. O que falta é "traduzir" essas interpretações de um formato estruturado (cards) para um formato corrido (texto natural).
- **Pressupostos:** o motor de interpretação existente é suficiente. Não precisa de IA generativa para gerar o resumo. Um template que organize as interpretações em texto corrido é suficiente e mais seguro.
- **Lacunas:** o resumo atual é apresentado como 3 cards independentes. Não há coesão narrativa entre eles. A ordem (ponto de atenção → observação → alinhamento) é lógica mas não emocional.
- **Riscos:** um template mal escrito parece genérico. O resumo precisa soar específico para o negócio da pessoa — cada parágrafo deve refletir as respostas reais, não placeholders.
- **Conflitos:** o campo `narrativaVersao` em `IdentidadeDigital` pode armazenar o resumo. Verificar se o tamanho máximo do JSON suporta texto corrido (deve suportar — é `Json?` no Prisma).
- **Impactos futuros:** o formato do resumo define o padrão de comunicação para TODAS as futuras interações da Ponte. Consistência é crítica.
- **Confirmação de coerência:** coerente com a Jornada Fundacional (Capítulo 3, seção 3.3 — "Resultado") e com o Eixo 3 do Programa 15.

---

## 1. Estrutura do resumo

O resumo é dividido em 5 seções, nesta ordem:

### Seção 1: "Pelo que você me contou" (o essencial)

Um parágrafo curto (2-3 frases) com:
- Segmento + tempo de operação
- Tamanho da equipe
- O que ele mais vende ou faz

**Fonte:** Bloco 1 (Empresa) + Bloco 2 (Operação)

**Tom:** Afirmativo, confirmatório. "Pelo que você me contou, sua [segmento] está há [X] anos com [Y] funcionários..."

**Exemplo real:**
> "Pelo que você me contou, sua barbearia está há 3 anos na ativa com 2 funcionários. Você sabe que poderia faturar mais, mas sente que o dinheiro some sem explicação."

### Seção 2: "Duas coisas que me chamaram atenção" (pontos de atenção)

2-3 pontos de atenção, cada um com 1-2 frases. Derivados das respostas + interpretações.

**Fonte:** Bloco 4 (Problemas) + interpretações (`pontoAtencao`)

**Tom:** Observador, não julgador. "Isso me chamou atenção porque..."

**Regras:**
- Máximo de 3 pontos. Se houver mais, priorizar os que têm mais evidência
- Cada ponto deve mencionar a resposta do empresário que o gerou
- Nunca dizer "isso está errado" — dizer "isso costuma ser um sinal de..."

**Exemplo real:**
> "Duas coisas me chamaram atenção: você não tem ideia de qual serviço dá mais lucro (e provavelmente está gastando tempo no que rende menos), e seus clientes chegam mais por indicação do que por qualquer esforço seu — o que é bom, mas significa que você não controla de onde vêm os clientes novos."

### Seção 3: "Uma coisa que você acertou" (alinhamento)

1-2 pontos fortes identificados nas respostas.

**Fonte:** interpretações (`alinhamento`) + Bloco 5 (Objetivos)

**Tom:** Reforço positivo. "Uma coisa que você acertou..."

**Regras:**
- Sempre incluir. Mesmo que o negócio esteja em situação difícil, sempre há algo que o empresário faz certo
- Conectar com o objetivo declarado no Bloco 5

**Exemplo real:**
> "Uma coisa que você acertou: seu objetivo de automatizar agendamentos é o caminho certo. É por onde eu começaria no seu lugar."

### Seção 4: "Ainda não sei" (lacunas honestas)

O que o diagnóstico não cobriu.

**Fonte:** Bloco 2-3 (lacunas não preenchidas) + regras de inferência

**Tom:** Honesto, sem falsa onisciência. "Ainda não sei [X], mas já sei por onde perguntar."

**Regras:**
- Máximo de 2 lacunas
- Sempre seguido de "mas já sei por onde começar"
- Convidativo para o próximo passo

**Exemplo real:**
> "Ainda não sei como está seu fluxo de caixa real nem quem são seus clientes mais valiosos — mas já sei por onde perguntar."

### Seção 5: "Se eu fosse você" (próximo passo sugerido)

Ação simples e acionável.

**Fonte:** Bloco 5 (Objetivos) + interpretações

**Tom:** Sugestivo, não imperativo. "Se eu fosse você, começaria por..."

**Regras:**
- Apenas 1 próximo passo
- Deve ser executável em até 1 dia
- Deve estar sob controle do empresário (não depender de terceiros)
- Não mencionar a Ponte como dependência — ele ainda não é usuário

**Exemplo real:**
> "Se eu fosse você, começaria anotando durante uma semana tudo que entra e sai de dinheiro — mesmo que seja no papel. Esse simples hábito já responde metade das perguntas que você está se fazendo."

---

## 2. Tom

### 2.1 Características do tom

| Característica | Presente | Ausente |
|----------------|----------|---------|
| Pessoal | "você", "sua empresa" | "o usuário", "o cliente" |
| Honesto | "Ainda não sei sobre..." | Finge saber tudo |
| Observador | "Isso me chamou atenção..." | "Você está errado sobre..." |
| Direto | Frases curtas | Rodeios |
| Caloroso | "Uma coisa que você acertou" | Frieza de relatório |
| Humilde | "Se eu fosse você..." | "Faça X imediatamente" |

### 2.2 O que o tom NÃO deve ser

| Tom errado | Exemplo | Problema |
|------------|---------|----------|
| Institucional | "A Ponte Digital identificou..." | Despersonaliza |
| Técnico | "Análise de segmento indica..." | Parece máquina |
| Julgador | "Você deveria estar controlando..." | Gera culpa |
| Vendedor | "Com nosso plano Premium..." | Quebra confiança |
| Genérico | "Pelo que entendi, você tem um negócio..." | Soa template |

---

## 3. Profundidade

### 3.1 Nível de profundidade

| Aspecto | Nível | Justificativa |
|---------|-------|---------------|
| Informações do negócio | Superficial | O suficiente para mostrar que ouviu |
| Pontos de atenção | Médio | O suficiente para gerar reflexão |
| Lacunas | Raso | Não aprofundar o que não sabe |
| Próximo passo | Raso | Apenas 1 ação, nada complexo |

### 3.2 Limite de informações

| Métrica | Limite | Motivo |
|---------|--------|--------|
| Palavras total | 200-350 | O empresário lê rápido ou não lê |
| Seções | 5 | Mapeamento mental simples |
| Pontos de atenção | 2-3 | Mais que isso sobrecarrega |
| Próximos passos | 1 | Decisão única |
| Lacunas | 1-2 | Não destacar o que não sabe |
| Parágrafos por seção | 1 | Leitura escaneável |

---

## 4. Ordem das informações

### 4.1 Por que esta ordem

1. **O que entendi** — começa confirmando: "eu ouvi você". O empresário precisa saber que foi compreendido ANTES de ouvir opiniões.
2. **O que me preocupa** — depois de confirmar entendimento, pode apontar riscos. A confiança já foi estabelecida.
3. **O que você acertou** — após os pontos de atenção, um reforço positivo. Evita que o resumo pareça só críticas.
4. **O que ainda não sei** — honestidade intelectual. Mostra que o sistema não está fingindo.
5. **O próximo passo** — fecha com ação. O empresário não fica com "e agora?".

### 4.2 Psicologia da ordem

```
Confirmação → Preocupação → Reforço → Honestidade → Ação
     ↑             ↑             ↑           ↑           ↑
  "ouvi vc"    "vc sabe"    "vc acerta"  "não finjo"  "faça isso"
```

Esta ordem respeita o estado emocional do empresário: primeiro ele precisa se sentir ouvido, depois pode ouvir críticas, depois precisa de reforço, depois valoriza a honestidade, e finalmente quer uma ação.

---

## 5. Critérios de clareza

| Critério | Definição | Verificação |
|----------|-----------|-------------|
| Linguagem simples | Sem palavras > 3 sílabas desnecessárias | Teste de leitura em voz alta |
| Frases curtas | Máximo 20 palavras por frase | Contagem automática |
| Parágrafos curtos | Máximo 3 frases por parágrafo | Contagem automática |
| Sem jargão | Nenhum termo de TERMINOLOGY.md não explicado | Revisão manual |
| Pronomes corretos | "você", "sua", "seu", "eu" | Revisão manual |
| Conexão causal | "porque" entre observação e evidência | Lógica verificável |

---

## 6. Critérios de valor

| Critério | Definição | Métrica |
|----------|-----------|---------|
| Utilidade imediata | O resumo sugere algo que ele pode fazer HOJE | Taxa de clique no próximo passo |
| Precisão | O empresário confirma que a Ponte entendeu | Comentário "Isso mesmo!" |
| Novidade | Pelo menos 1 ponto que ele não tinha considerado | Respostas pós-resumo |
| Honestidade | O resumo admite o que não sabe | Pesquisa de satisfação |
| Conexão emocional | O empresário sente que foi ouvido | NPS |

---

## 7. Template técnico

```
Resumo Cognitivo = {
  secao1: {
    titulo: "Pelo que você me contou",
    paragrafo: string,  // 2-3 frases, dados do bloco 1+2
  },
  secao2: {
    titulo: "[N] coisas que me chamaram atenção",
    pontos: [
      { evidencia: string, analise: string },  // 2-3 itens
    ],
  },
  secao3: {
    titulo: "Uma coisa que você acertou",
    paragrafo: string,  // 1-2 frases, alinhamento
  },
  secao4: {
    titulo: "Ainda não sei",
    lacunas: string[],  // 1-2 itens
  },
  secao5: {
    titulo: "Se eu fosse você",
    acao: string,  // 1 ação, 1 frase
  },
}
```

### Implementação

O resumo é gerado no servidor (`POST /api/conversa/finalizar`), após as interpretações existentes, combinando os dados estruturados em texto corrido via template. Exemplo conceitual:

```
function gerarResumo(interpretacoes: Interpretacoes, respostas: Respostas): ResumoCognitivo {
  return {
    secao1: gerarSecao1(respostas),       // bloco 1 + 2 → texto
    secao2: gerarSecao2(interpretacoes),  // pontoAtencao → 2-3 pontos
    secao3: gerarSecao3(interpretacoes),  // alinhamento → 1-2 forças
    secao4: gerarSecao4(respostas),       // lacunas identificadas
    secao5: gerarSecao5(interpretacoes),  // próximo passo
  };
}
```

Sem IA. Sem LLM. Template puro com dados determinísticos das interpretações já existentes.

---

*Documento concluído. Avançando para Documento 5.*
