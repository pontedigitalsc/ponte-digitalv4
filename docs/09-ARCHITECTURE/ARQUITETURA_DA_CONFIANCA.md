# Arquitetura da Confiança — Competição entre Fontes e Decisão de Uso

> **Programa 12 — Fase 2** | Fluxo Operacional do Conhecimento
> Patrimônio Intelectual da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O problema da múltiplas fontes](#1-o-problema-da-múltiplas-fontes)
2. [Hierarquia de fontes](#2-hierarquia-de-fontes)
3. [Regras de resolução de conflito](#3-regras-de-resolução-de-conflito)
4. [Arquitetura das Perguntas](#4-arquitetura-das-perguntas)
5. [Quando perguntar, quando silenciar](#5-quando-perguntar-quando-silenciar)
6. [Matriz de decisão de confiança](#6-matriz-de-decisão-de-confiança)

---

## 1. O problema da múltiplas fontes

### 1.1 Fontes competem, não cooperam

Cada fonte de informação sobre a empresa tem seus próprios vieses, limitações e níveis de precisão. Quando duas fontes dizem coisas diferentes, a IA não pode simplesmente "escolher uma" — precisa de regras claras para:

1. Decidir qual fonte priorizar
2. Registrar o conflito
3. Decidir se pergunta ao empresário
4. Decidir se suspende recomendações baseadas na informação

### 1.2 Exemplo típico

```
MESMA INFORMAÇÃO, 3 FONTES:

Conversa (15/07): "Minha receita é R$ 14 mil"
  Confiança: 0.55

Extrato bancário (18/07): Receita de R$ 16.200
  Confiança: 0.85

NF XML (18/07): Soma das NFs do mês = R$ 15.800
  Confiança: 0.90

PERGUNTA: Qual é a receita real da empresa?
```

## 2. Hierarquia de fontes

### 2.1 Ranking de fontes por confiança inerente

```
NÍVEL 1 — Fontes oficiais (confiança 0.80-0.95)
├── NF XML (fiscal, oficial)
├── Extrato bancário oficial (OFX, API)
├── Contrato social / CNPJ
├── Documento com assinatura digital

NÍVEL 2 — Fontes estruturadas de sistemas (confiança 0.65-0.85)
├── Integração ERP (API)
├── Integração CRM (API)
├── Integração e-commerce (API)
├── Google Sheets (sincronizado)
├── CSV de sistema (exportação)

NÍVEL 3 — Fontes não-estruturadas (confiança 0.40-0.65)
├── Conversa com empresário
├── Planilha manual (upload)
├── WhatsApp Business
├── E-mail

NÍVEL 4 — Fontes indiretas (confiança 0.20-0.45)
├── OCR de PDF
├── OCR de imagem
├── Conversa com funcionário
├── Dado público (CNPJ, redes sociais)

NÍVEL 5 — Inferência (confiança 0.05-0.30)
├── Analogia com empresas similares
├── Padrão estatístico
├── Dedução lógica sem evidência direta
```

### 2.2 Regra de hierarquia

```
REGRA: Fonte de nível superior sempre tem prioridade sobre fonte de nível inferior.

Exceção: se fonte de nível superior estiver comprovadamente desatualizada
(ex: NF de 6 meses atrás vs conversa de hoje), a data pode reverter a prioridade.
```

## 3. Regras de resolução de conflito

### 3.1 Matriz de resolução

| Fonte A (nível) | Fonte B (nível) | Valores | Ação |
|-----------------|-----------------|---------|------|
| Nível 1 | Nível 1 | Convergem | Usar valor, confiança = max |
| Nível 1 | Nível 1 | Divergem | Manter ambos, registrar conflito, perguntar |
| Nível 1 | Nível 2-3 | Convergem | Usar nível 1, aumentar confiança |
| Nível 1 | Nível 2-3 | Divergem | Usar nível 1, marcar nível 2-3 como suspeito |
| Nível 2 | Nível 2 | Convergem | Usar, confiança = média |
| Nível 2 | Nível 2 | Divergem | Investigar (qual está desatualizado?), perguntar |
| Nível 2 | Nível 3 | Divergem | Usar nível 2, marcar nível 3 como suspeito |
| Nível 3 | Nível 3 | Divergem | Perguntar ao empresário |
| Nível 1-2 | Nível 4-5 | Qualquer | Ignorar nível 4-5, usar nível 1-2 |

### 3.2 Exemplo resolvido

```
Caso: Receita da Barbearia

Conversa: R$ 14.000 (Nível 3, conf 0.55)
Extrato: R$ 16.200 (Nível 1, conf 0.85)
NF: R$ 15.800 (Nível 1, conf 0.90)

Resolução:
  1. Extrato e NF são Nível 1 → prioridade
  2. Extrato (R$ 16.200) e NF (R$ 15.800) divergem em 2.5%
  3. Diferença < 5% → considerar convergente
  4. Valor adotado: média ponderada = R$ 15.930
  5. Confiança: 0.88 (convergência de 2 fontes Nível 1)
  6. Conversa (R$ 14.000) → marcar como "subestimativa do empresário"
  7. Ação: não perguntar (convergência forte)
```

### 3.3 Quando perguntar ao empresário

```
Perguntar quando:
├── Duas fontes do mesmo nível divergem (ex: dois documentos)
├── Fonte única Nível 3 (conversa) sem confirmação
├── Informação crítica (finanças) com confiança < 0.50
├── Lacuna de alto impacto sem nenhuma fonte
├── Contradição entre fontes não resolvível automaticamente

Não perguntar quando:
├── Fonte Nível 1 disponível (confiar nela)
├── Diferença entre fontes < 10% (considerar convergente)
├── Informação de baixo impacto (endereço exato)
├── Empresário já respondeu sobre o assunto (não repetir)
├── Pode ser resolvido automaticamente em breve (nova integração)
```

## 4. Arquitetura das Perguntas

### 4.1 O ciclo da pergunta

```
                    ┌────────────────────────────┐
                    │    LACUNA IDENTIFICADA      │
                    │    (algo que não sabemos)   │
                    └────────────┬───────────────┘
                                 │
                    ┌────────────▼───────────────┐
                    │    AVALIAR PRIORIDADE       │
                    │    Impacto × Urgência /     │
                    │    Facilidade               │
                    └────────────┬───────────────┘
                                 │
                    ┌────────────▼───────────────┐
              ┌─────│    PODE SER RESPONDIDA      │
              │     │    POR PERGUNTA?            │
              │     └────────────┬───────────────┘
              │                  │ Sim
              │                  ▼
              │     ┌────────────────────────┐
              │     │ QUAL O MOMENTO CERTO?   │
              │     │ ─ Empresário disponível │
              │     │ ─ Já entregou valor     │
              │     │ ─ Não é invasiva        │
              │     └────────────┬───────────┘
              │                  │
     ┌────────┴────────┐        │
     │                 │        ▼
     ▼                 ▼  ┌──────────────────┐
┌────────────┐   ┌─────────────┐  │ ESCOLHER TÉCNICA │
│ BUSCAR DE  │   │ AGUARDAR    │  │ ─ Aberta          │
│ OUTRA      │   │ MOMENTO     │  │ ─ Direcionada     │
│ FONTE      │   │ MAIS        │  │ ─ Quantitativa    │
└────────────┘   │ OPORTUNO    │  └────────┬─────────┘
                 └─────────────┘           │
                                           ▼
                                  ┌──────────────────┐
                                  │ FAZER PERGUNTA   │
                                  │ + Processar      │
                                  │ resposta         │
                                  └────────┬─────────┘
                                           │
                                           ▼
                                  ┌──────────────────┐
                                  │ INCORPORAR       │
                                  │ RESPOSTA         │
                                  │ (Pipeline)       │
                                  └──────────────────┘
```

### 4.2 Tipos de pergunta e quando usar

| Tipo | Quando usar | Exemplo | Custo (tempo empresário) |
|------|-------------|---------|-------------------------|
| **Aberta** | Início de conversa, explorar | "Como está o negócio?" | 10-30s |
| **Direcionada** | Confirmar hipótese | "Você vende para PF?" | 2-5s |
| **Quantitativa** | Preencher métrica | "Quantos clientes por mês?" | 5-10s |
| **De confirmação** | Validar informação | "Entendi R$ 14 mil, certo?" | 2-3s |
| **De complemento** | Preencher lacuna pequena | "Falta o telefone — qual é?" | 3-5s |
| **De escavação** | Aprofundar causa | "Por que isso acontece?" | 15-60s |
| **De priorização** | Entender o que importa | "O que seria mais urgente?" | 5-10s |

### 4.3 Ordem das perguntas

```
Dentro de uma conversa, a ordem importa:

1. ☀️ AQUECIMENTO (pergunta aberta, fácil, não-ameaçadora)
   → "Como está o movimento hoje?"

2. 🔍 ESCOPO (pergunta sobre o negócio, o que faz)
   → "O que você tem vendido mais?"

3. 📊 DADOS (pergunta quantitativa, depois de conforto estabelecido)
   → "Qual foi a receita do último mês?"

4. ❤️ DOR (pergunta sobre problemas, depois de entender o contexto)
   → "Qual a maior dificuldade hoje?"

5. 🎯 FUTURO (pergunta sobre planos, fecha com visão positiva)
   → "Onde você quer estar daqui a 6 meses?"
```

### 4.4 Regras de frequência

```
Nunca fazer mais que:
├── 3 perguntas seguidas sem entregar valor
├── 10 perguntas por conversa
├── 2 perguntas sobre o mesmo assunto (se não respondeu, tentar outra abordagem)
├── 1 pergunta quantitativa muito pessoal (faturamento) por conversa
└── Perguntar a mesma coisa mais de 1 vez por semana
```

## 5. Quando perguntar, quando silenciar

### 5.1 Matriz completo de decisão

```
                    ┌────────────────────────────────────────────────────┐
                    │         MATRIZ DE DECISÃO: PERGUNTAR OU NÃO       │
                    ├────────────────────────────────────────────────────┤
                    │                                                    │
                    │                     CONHECIMENTO ATUAL              │
                    │           Nenhum    Baixo     Médio     Alto       │
                    │           (0-0.30)  (0.30-    (0.55-    (0.80+)    │
                    │                     0.55)     0.80)                │
┌───────────────────┼────────────────────────────────────────────────────┤
│ IMPACTO  │ Alto   │ Perguntar  Perguntar  Confirmar  Silêncio         │
│ DA LACUNA│        │ (urgente)  (priorit.) (rápido)   (confie)         │
│          ├────────┼────────────────────────────────────────────────────┤
│          │ Médio  │ Buscar     Perguntar  Silêncio   Silêncio         │
│          │        │ fonte      (se fácil) (observe)  (confie)         │
│          ├────────┼────────────────────────────────────────────────────┤
│          │ Baixo  │ Silêncio   Silêncio   Silêncio   Silêncio         │
│          │        │ (espere)   (espere)   (espere)   (confie)         │
└──────────┴────────┴────────────────────────────────────────────────────┘
```

### 5.2 Regras de silêncio absoluto

```
A IA permanece em silêncio absoluto quando:

├── A informação tem confiança ≥ 0.80 (já sabe, não repetir)
├── A lacuna tem impacto baixo e nenhuma fonte disponível
├── O empresário acabou de responder algo similar (dar tempo)
├── O empresário está claramente ocupado ou irritado
├── A pergunta pode soar acusatória ("você não controla?")
├── A informação pode ser obtida automaticamente em breve
└── A IA ainda não entregou valor suficiente (não pedir antes de dar)
```

## 6. Matriz de decisão de confiança

### 6.1 Decisão final por nível

| Confiança | Ação | Exemplo |
|-----------|------|---------|
| 0.80-1.00 | Usar para tudo: recomendações, diagnósticos, decisões | "Sua margem é 40%" |
| 0.55-0.79 | Usar com ressalva: sinalizar incerteza | "Acredito que sua margem seja ~40%" |
| 0.30-0.54 | Sugerir como hipótese: perguntar antes de usar | "Talvez sua margem esteja em 40%" |
| 0.10-0.29 | Não usar: buscar outra fonte ou perguntar | (silêncio) |
| 0.00-0.09 | Ignorar: informação não existe para o sistema | "Ainda não sei" |

### 6.2 Suspensão de recomendações

```
RECOMENDAÇÕES SUSPENSAS QUANDO:

├── Confiança da informação base < 0.55
├── Duas fontes contraditórias sem resolução
├── Lacuna crítica não preenchida (recomendação seria baseada em chute)
├── Empresa em estado < Diagnosticada (não conhece problemas)
└── Última validação do empresário > 90 dias (modelo pode estar desatualizado)

RECOMENDAÇÕES PERMITIDAS APENAS QUANDO:

├── Confiança da informação base ≥ 0.55
├── Nenhuma contradição ativa sobre a informação
├── Empresa ≥ Diagnosticada
├── Última validação ≤ 90 dias
└── Recomendação é claramente benéfica (baixo risco de dano)
```

---

> **Fim da Arquitetura da Confiança**
> Próximo: `ARQUITETURA_DA_PRIMEIRA_PERCEPCAO_DE_VALOR.md` — Primeiros 5 minutos
