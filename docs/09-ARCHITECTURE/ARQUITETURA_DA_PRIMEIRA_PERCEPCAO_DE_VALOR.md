# Arquitetura da Primeira Percepção de Valor — Os Primeiros 5 Minutos

> **Programa 12 — Fase 2** | Fluxo Operacional do Conhecimento
> Patrimônio Intelectual da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O problema dos primeiros minutos](#1-o-problema-dos-primeiros-minutos)
2. [A linha do tempo dos primeiros 5 minutos](#2-a-linha-do-tempo-dos-primeiros-5-minutos)
3. [Segundo 0-30 — Aterrissagem](#3-segundo-0-30--aterrissagem)
4. [Segundo 30-120 — Primeira Pergunta e Resposta](#4-segundo-30-120--primeira-pergunta-e-resposta)
5. [Minuto 2-3 — Primeiro Diagnóstico](#5-minuto-2-3--primeiro-diagnóstico)
6. [Minuto 3-4 — Primeiro Valor Entregue](#6-minuto-3-4--primeiro-valor-entregue)
7. [Minuto 4-5 — Primeiro Próximo Passo](#7-minuto-4-5--primeiro-próximo-passo)
8. [O que acontece se o empresário não responde](#8-o-que-acontece-se-o-empresário-não-responde)

---

## 1. O problema dos primeiros minutos

### 1.1 A janela de atenção

O empresário dá à Ponte Digital cerca de **5 minutos** para provar que vale o tempo dele. Depois disso, se não viu valor, ele nunca mais volta.

### 1.2 O que está em jogo

```
Segundo 0-30:  "O que é isso?"   → Se confuso, abandona
Segundo 30-120:"Entendi"          → Se não entendeu, abandona
Minuto 2-3:    "Isso é útil?"     → Se não vê utilidade, abandona
Minuto 3-4:    "Uau, isso ajudou" → ✅ Engajou
Minuto 4-5:    "O que mais?"      → ✅ Quer continuar
```

### 1.3 Princípio fundamental

**Valor antes de coleta.** A IA deve entregar algo útil antes de pedir mais informação. O empresário precisa sentir que *ganhou* algo na interação, não que *perdeu* tempo respondendo.

## 2. A linha do tempo dos primeiros 5 minutos

```
Segundo 0  ── Empresário chega (primeiro acesso)
                │
Segundo 5  ── Interface aparece com saudação personalizada
                │
Segundo 15 ── Primeira pergunta sobre o negócio
                │
Segundo 60 ── Empresário respondeu
                │
Minuto 2   ── IA já tem 3-5 entidades identificadas
                │
Minuto 2:30── IA apresenta primeiro diagnóstico parcial
                │
Minuto 3:30── Empresário vê algo útil sobre o negócio dele
                │
Minuto 4   ── IA sugere próximo passo (importação, pergunta, etc.)
                │
Minuto 5   ── Primeira interação concluída. Empresário quer continuar.
```

## 3. Segundo 0-30 — Aterrissagem

### 3.1 O que o empresário vê

```
Tela/chat de boas-vindas:
  "Olá! Prazer em conhecer a [Nome da Empresa].
   Sou a assistente inteligente da Ponte Digital.

   Enquanto você me conta um pouco sobre seu negócio,
   eu já vou começando a analisar e trazer insights.

   Vamos começar?"
```

### 3.2 O que a IA faz

```
1. Se CNPJ disponível: exibir "Sei que sua empresa é [segmento] em [cidade]"
2. Se CNPJ não disponível: perguntar "Qual o nome do seu negócio?"
3. Preparar perguntas específicas do segmento (se conhecido)
4. Preparar primeiro diagnóstico (baseado no que já sabe)
```

### 3.3 O que NÃO fazer

```
❌ Pedir cadastro: "Preencha seu nome, email, telefone..."
❌ Mostrar tutorial: "Deixe-me explicar como funciona..."
❌ Pedir documentos antes do valor: "Envie sua NF para começarmos"
❌ Ser genérico: "Como posso ajudar?" (muito vago)
```

## 4. Segundo 30-120 — Primeira Pergunta e Resposta

### 4.1 Pergunta ideal

A primeira pergunta deve ser:

1. **Específica** (mostra que sabe do segmento)
2. **Fácil** (empresário não precisa pensar muito)
3. **Não-ameaçadora** (não pede dinheiro, problema ou dado sensível)

```
Para barbearia:
  "Quantas cadeiras você tem na sua barbearia?"

Para restaurante:
  "Quantos lugares tem seu restaurante?"

Para oficina:
  "Quantos carros você atende por semana?"

Para clínica:
  "Quantos pacientes você atende por dia?"

Para loja:
  "Você tem loja física, online ou ambos?"
```

### 4.2 Processamento da resposta

```
Enquanto o empresário digita/fala:

1. IA já prepara a próxima pergunta (baseada na resposta esperada)
2. Se resposta for inesperada → IA ajusta o plano
3. IA extrai entidades da resposta
4. IA calcula: já posso gerar valor ou preciso de mais info?

Exemplo:
  Empresário: "Tenho 3 cadeiras"
  IA pensa: "3 cadeiras, barbearia → capacidade ~45 clientes/dia"
  IA: "Legal, 3 cadeiras! Com quantos barbeiros você trabalha?"
```

## 5. Minuto 2-3 — Primeiro Diagnóstico

### 5.1 O diagnóstico parcial

Após 2-3 respostas, a IA já pode gerar um **diagnóstico parcial** — não completo, mas suficiente para mostrar valor.

```
IA: "Com o que você me contou, já consigo ver algumas coisas:

     📊 CAPACIDADE: Com 3 cadeiras e 2 barbeiros,
        você pode atender até 30 clientes/dia.
        Seu potencial de receita diária: ~R$ 1.350.

     ⚠️ OBSERVAÇÃO: Se no horário de almoço você
        fica com apenas 1 barbeiro, está perdendo
        cerca de 5-8 clientes/dia.

     Quer que eu ajude a calcular quanto isso
     representa no fim do mês?"
```

### 5.2 O que o diagnóstico deve conter

```
1. ✅ ALGO QUE A IA JÁ SABE SOBRE A EMPRESA
   → Mostra que está prestando atenção
   → Ex: "Você tem 3 cadeiras e 2 barbeiros"

2. 📊 UMA ESTIMATIVA OU CÁLCULO ÚTIL
   → Mostra que está analisando
   → Ex: "Potencial de R$ 1.350/dia"

3. ⚠️ UMA OBSERVAÇÃO RELEVANTE
   → Mostra que está encontrando coisas que o empresário não viu
   → Ex: "Perdendo 5-8 clientes no almoço"

4. ❓ UMA OFERTA DE AJUDA
   → Mostra que está pronta para agir
   → Ex: "Quer que eu ajude a calcular?"
```

## 6. Minuto 3-4 — Primeiro Valor Entregue

### 6.1 O momento da verdade

Neste minuto, o empresário decide se a Ponte Digital é útil ou não.

### 6.2 Formatos de valor

| Formato | Exemplo | Quando usar |
|---------|---------|-------------|
| Cálculo | "Seu potencial de receita é R$ X" | Empresário é analítico |
| Alerta | "Você pode estar perdendo R$ Y/mês" | Empresário é prático |
| Comparação | "Barbearias do seu porte faturam em média R$ Z" | Empresário é competitivo |
| Simplificação | "Com 3 cadeiras, o ideal é ter 3 barbeiros" | Empresário é operacional |
| Priorização | "Seu maior desafio parece ser a lotação no almoço" | Empresário está sobrecarregado |

### 6.3 O valor deve ser específico

```
✅ BOM: "Com 3 cadeiras e 2 barbeiros, você pode estar
        perdendo até R$ 3.000/mês no horário de almoço."

❌ RUIM: "Podemos ajudar a otimizar seu negócio."
         (genérico, qualquer um pode dizer)

✅ BOM: "Vi que você aceita dinheiro e Pix. Sabia que
        85% dos seus clientes pagam no Pix? Talvez
        valha a pena incentivar ainda mais."

❌ RUIM: "Oferecemos soluções de pagamento digital."
         (parece propaganda)
```

## 7. Minuto 4-5 — Primeiro Próximo Passo

### 7.1 O que oferecer

Após entregar valor, a IA oferece o próximo passo natural:

```
IA: "Gostou do que viu até agora? Posso:

    1️⃣ CONECTAR SEU SISTEMA: Se você usar Omie,
       Bling ou ContaAzul, posso analisar tudo
       automaticamente.

    2️⃣ IMPORTAR NOTAS FISCAIS: Se tiver NFs dos
       últimos meses, posso calcular sua margem real.

    3️⃣ CONTINUAR CONVERSANDO: Posso fazer mais
       algumas perguntas e te dar um diagnóstico
       mais completo.

    O que você prefere?"
```

### 7.2 O que a IA NÃO deve oferecer

```
❌ "Assine nosso plano premium"
❌ "Compartilhe com seus amigos"
❌ "Preencha este formulário de 20 campos"
❌ "Aceite nossos termos de serviço" (já deve ter feito)
```

## 8. O que acontece se o empresário não responde

### 8.1 Abandono na primeira interação

```
Se empresário não respondeu nos primeiros 30 segundos:
  → Enviar lembrete suave após 1 hora:
     "Oi! Fiquei por aqui se quiser continuar o papo."

Se empresário não respondeu após 24 horas:
  → Enviar resumo do que foi discutido + oferta de ajuda
  → Marcar empresa como "Contato pendente"

Se empresário não respondeu após 7 dias:
  → Tentar contato por outro canal (email, WhatsApp)
  → Reduzir prioridade da empresa
  → Manter dados básicos (CNPJ, segmento) para quando voltar
```

### 8.2 Retorno após abandono

```
Quando o empresário volta (dias/semanas depois):

IA: "Bem-vindo de volta! Da última vez, estávamos
     conversando sobre sua barbearia. Já entendi
     que você tem 3 cadeiras e 2 barbeiros.

     Desde então, conseguiu alguma NF ou planilha
     que queira compartilhar?"

→ A IA retoma de onde parou, não recomeça do zero
→ Não repete perguntas já respondidas
```

---

> **Fim da Arquitetura da Primeira Percepção de Valor**
> Próximo: `ARQUITETURA_DA_EVOLUCAO_COGNITIVA.md` — Evolução e indicadores
