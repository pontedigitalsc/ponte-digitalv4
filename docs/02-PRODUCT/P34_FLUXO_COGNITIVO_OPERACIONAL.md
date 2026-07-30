# P34 — Fluxo Cognitivo Operacional

## Documento Mestre de Design

---

# ETAPA 1 — Auditoria Completa da Jornada do Empresário

## A Rotina Real de uma Pequena Empresa

### Cenário típico: lavação, barbearia, oficina, clínica, loja

| Hora | Atividade | Ferramenta | Fricção |
|------|-----------|-----------|---------|
| 07:00 | Abre empresa, verifica agenda do dia | Papel / WhatsApp | Perde 5min procurando |
| 07:30 | Cliente chega sem agendar | Presencial | Nenhum registro prévio |
| 07:35 | Atende, anota serviço | Papel / Calculadora | Escreve, depois digita |
| 08:00 | Cliente paga | Maquininha / Dinheiro | Não integra com sistema |
| 08:05 | Anota pagamento | Papel / Planilha | Duplicação |
| 09:00 | Faz orçamento para outro | WhatsApp | Perde histórico do cliente |
| 10:00 | Compra insumos | Calculadora / WhatsApp | Não registra no fluxo de caixa |
| 12:00 | Fecha meio dia | Planilha | Soma manual de vendas |
| 14:00 | Cliente liga reclamando | Telefone | Sem registro de pós-venda |
| 16:00 | Envia cobrança | WhatsApp | Manual |
| 18:00 | Fecha caixa | Calculadora / Papel | 15min de soma manual |
| 19:00 | Pergunta: "E aí, foi um bom dia?" | Memória | Baseada em achismo |

### Onde ele PERDE TEMPO
1. **Anotação duplicada**: papel → sistema (ou nunca chega ao sistema)
2. **Cálculo manual**: soma de vendas, fluxo de caixa, comissões
3. **Procura de histórico**: "Quanto o João pagou da última vez?"
4. **Conciliação**: separar vendas de despesas, formas de pagamento
5. **Relatórios**: "Quanto faturei esse mês?" — soma manual

### Onde ele ESCREVE EM PAPEL
- Agenda do dia
- Recados de clientes
- Contas a pagar/receber
- Lista de compras/insumos
- Orçamentos rápidos

### Onde usa WHATSAPP
- Agendamento
- Cobrança
- Orçamento
- Pós-venda
- Reclamação
- Indicação

### Onde usa CALCULADORA
- Soma de vendas do dia
- Troco
- Margem de serviço
- Desconto

### Onde usa MEMÓRIA
- "Esse cliente prefere tal serviço"
- "A última vez foi caro"
- "Ele costuma pagar atrasado"
- "Aquele produto acabou"

### Onde TOMA DECISÕES
- Preço de serviço
- Desconto para cliente recorrente
- Contratar ou não
- Vale a pena este cliente?
- O que fazer para melhorar?

### Onde GERA CONHECIMENTO
- Percebe que cliente X sempre compra Y junto
- Percebe que serviço Z dá mais problema
- Percebe que época do ano altera demanda
- Aprende a lidar com cada perfil de cliente

## Diagnóstico

**O empresário de pequena empresa NÃO usa sistema de gestão por uma razão simples: o sistema dá mais trabalho do que o problema que resolve.**

Ele prefere WhatsApp + papel + calculadora porque:
- É mais rápido
- Não exige aprendizado
- Funciona offline
- Não separa operação de comunicação

**A Ponte Digital precisa ser mais rápida que WhatsApp + papel + calculadora.** Esse é o único critério que importa.

---

# ETAPA 2 — Fluxo Operacional Unificado

## Design: O Fluxo Único

### Antes (13 páginas separadas — herança P33)

```
CRM → Lead → Cliente → Tarefa → Financeiro → Histórico → ...
```

Cada transição de página é uma interrupção. O empresário precisa mudar de contexto 13 vezes.

### Depois (1 fluxo único)

```
┌─────────────────────────────────────────────────────┐
│                    PONTE DIGITAL                      │
│                                                       │
│  ┌───────────────────────────────────────────────┐   │
│  │         ATENDIMENTO (a única tela)             │   │
│  │                                               │   │
│  │  Busca: [________]  →  "João voltou"          │   │
│  │                                               │   │
│  │  ┌─── JOÃO SILVA ──────────────────────────┐  │   │
│  │  │  Último: Lavagem completa (15/07) R$80   │  │   │
│  │  │  Recorrência: 18 dias                    │  │   │
│  │  │  Sugestão: Lavagem + Cera (R$110)        │  │   │
│  │  │  ⏱ 1min │ 👍 Cliente fiel │ 💳 R$ 80    │  │   │
│  │  │  ┌──────────────────────────────┐        │  │   │
│  │  │  │ ✓ Serviço │ ✓ Valor │ ✓ Pago  │        │  │   │
│  │  │  │ Tudo certo? [Confirmar]       │        │  │   │
│  │  │  └──────────────────────────────┘        │  │   │
│  │  └───────────────────────────────────────────┘  │   │
│  │                                               │   │
│  │  Abaixo: Timeline do dia │ Caixa │ Pendências  │   │
│  └───────────────────────────────────────────────┘   │
│                                                       │
│  [Centro Hoje] [Timeline] [Aprendizados] [Decisões]   │
└─────────────────────────────────────────────────────┘
```

### O que desaparece como páginas separadas

| Página atual | Vira | Por quê |
|-------------|------|---------|
| CRM | Aba "Funil" no Atendimento | Lead é só um status do cliente |
| Clientes | Aba "Pessoas" no Atendimento | Cliente é contexto, não módulo |
| Financeiro | Aba "Caixa" no Atendimento | Fluxo de caixa é consequência |
| Tarefas | Aba "Ações" no Atendimento | Tarefa é um item da timeline |
| Dashboard | Centro Hoje (ETAPA 7) | Visão do dia, não relatório |
| Histórico | Timeline da Empresa (ETAPA 6) | Memória única |
| Conhecimento | Aba "Inteligência" | Saber da empresa |
| Aprendizados | Aba "Regras" | Preferências do empresário |
| Configurações | Aba "Empresa" | Dados do negócio |
| Centro Decisão | Aba "Decisões" | O que fazer |
| Assistente | Aba "Pergunte" | Conselho sob demanda |
| Implantações | 🔒 Congelado | Fora do escopo Founder |
| Admin | 🔒 Congelado | Apenas operação interna |

### A Única Página de Trabalho

O empresário tem UMA página principal. Ela tem:
1. **Campo de busca/atendimento no topo** — o cérebro da operação
2. **Painel do cliente/serviço** — contexto atual
3. **Timeline do dia** — o que já aconteceu
4. **Caixa do dia** — quanto entrou/saiu
5. **Pendências** — o que precisa de atenção

E 7 abas secundárias para consulta:
- Pessoas, Caixa, Funil, Timeline, Decisões, Inteligência, Empresa

---

# ETAPA 3 — Entrada Inteligente de Dados

## Princípio: Zero formulários. Apenas confirmação.

### Cenário 1: Cliente recorrente (80% dos casos)

```
"João voltou."
    ↓
Ponte reconhece João (busca por nome, telefone, placa, CPF)
    ↓
Exibe: João Silva | Último: Lavagem R$80 | Há 18 dias
    ↓
Sugere: Lavagem + Cera (R$110) — baseado no histórico
    ↓
Empresário confirma (1 clique)
    ↓
Serviço registrado | Caixa atualizado | Conhecimento gerado
    ↓
Tempo: ~5 segundos
```

### Cenário 2: Cliente novo

```
"Nome: Maria"
    ↓
Ponte: "Telefone?" (pergunta única)
    ↓
"11999999999"
    ↓
Ponte cria cliente + inicia atendimento
    ↓
"Serviço?" → "Corte" → "R$50" → "Pago"
    ↓
Tempo: ~15 segundos (única vez)
```

### Cenário 3: Serviço sem cliente (compra/despesa)

```
"Gastei R$200 em produtos"
    ↓
Ponte: "Categoria?" — sugere baseado em histórico
    ↓
"Insumos" → confirmar
    ↓
Registrado no caixa
    ↓
Tempo: ~5 segundos
```

### Reconhecimento Automático

A Ponte deve reconhecer:
- Nome do cliente (digitação parcial)
- Telefone (completo ou parcial)
- Placa de veículo (oficina/lavação)
- CPF (consulta rápida)
- Último serviço (recorrência)
- Último valor pago (precificação)
- Forma de pagamento preferida

### Regra dos 10 segundos

Toda operação comum deve ser concluída em ≤10 segundos.
Toda operação nova deve ser concluída em ≤30 segundos.
Nenhuma operação pode exigir mais de 3 cliques.

---

# ETAPA 4 — Caixa Inteligente

## Princípio: Caixa é consequência, não módulo.

### Fluxo Atual (herança P33)

```
Venda → Abrir Financeiro → Lançar Receita → Categoria → Valor → Data → Salvar
```

### Novo Fluxo

```
"João, Lavagem R$80, Pago no crédito"
    ↓
Caixa atualiza automaticamente:
    ↓
✓ Faturamento do dia: +R$80
✓ Fluxo de caixa: entrada registrada
✓ Ticket médio: recalculado
✓ Recorrência: João voltou a cada 18 dias
✓ Retenção: atualizada
✓ Patrimônio operacional: +1 venda
✓ Patrimônio decisório: +1 dado de precificação
✓ Conhecimento: "João prefere lavagem + crédito"
    ↓
Zero cliques extras | Zero telas | Zero formulários
```

### O que o Caixa Inteligente sabe

| Informação | Origem | Atualização |
|-----------|--------|-------------|
| Saldo do dia | Soma automática de vendas - despesas | Em tempo real |
| Ticket médio | Média dos valores dos serviços | A cada venda |
| Recorrência | Intervalo entre visitas de cada cliente | A cada venda |
| Retenção | Clientes que voltaram / total de clientes | Diário |
| Inadimplência | Serviços pendentes de pagamento | Em tempo real |
| Projeção | Histórico de dias anteriores | Diário |
| Sazonalidade | Comparação mês a mês | Mensal |
| Margem por serviço | Custo estimado vs preço | Quando configurado |

### Extrato vivo

O empresário vê na aba "Caixa":
```
Hoje: Entrada R$480 | Saída R$120 | Saldo R$360
      ──────────────────────────────────────
      08:00  João Silva      Lavagem     R$ 80    ✔
      09:30  Maria Santos    Corte       R$ 50    ✔
      10:00  Insumos                      R$120    ➖
      11:00  Pedro Lima      Lavagem     R$ 80    ✔
      14:00  Carla Souza     Escova      R$150    💳
      15:00  Aluguel                      R$200    ➖
      18:00  Carlos José     Corte       R$ 50    💳
      ──────────────────────────────────────
      Faturamento: R$480 | Recebido: R$210 | A Receber: R$200
```

---

# ETAPA 5 — Operação Invisível

## Princípio: Conhecimento é subproduto do trabalho.

### O que acontece quando o empresário registra um atendimento

**Visível para o empresário:**
- Cliente registrado
- Serviço registrado
- Pagamento registrado
- Caixa atualizado

**Invisível (automático, zero esforço):**

| Motor | Gera | Exemplo |
|-------|------|---------|
| Evidence Engine | Observação | "João consome lavagem a cada 18 dias" |
| Memory Engine | Hipótese | "João pode preferir pacote mensal" |
| Context Engine | Padrão | "Clientes de lavagem também compram cera" |
| Evolution Engine | Evolução | "Ticket médio da lavação subiu 5%" |
| Knowledge Engine | Saber | "Melhor horário para lavagem é manhã" |
| Alert Engine | Alerta | "João não vem há 30 dias (acima do padrão)" |
| Trust Engine | Confiança | "Fonte 'atendimento' tem confiança 92%" |
| Heritage Facade | Patrimônio | "Capital Cognitivo +2 pontos" |

### Nenhuma tela de configuração. Nenhuma tela de resultado.
O empresário NUNCA vê "Evidência registrada com sucesso".
Ele vê apenas o reflexo no atendimento do dia seguinte:
- Sugestões melhores
- Preços mais precisos
- Alertas mais relevantes

### O que desaparece da interface

- Tela de "Cadastro de Evidência" → nunca existiu, nunca existirá
- Tela de "Hipóteses" → invisível
- Tela de "Capital Cognitivo" → só no Centro Cognitivo (resumo semanal)
- Tela de "Score" → só como indicador indireto

---

# ETAPA 6 — Linha do Tempo da Empresa

## A Memória Oficial

### Design

Uma única timeline vertical que mistura TUDO que acontece na empresa:

```
2026
┌─ JULHO ─────────────────────────────────────────────┐
│                                                       │
│  29  ┌──────────────────────────────────────────┐    │
│       │ 📅 Atendimento │ João Silva              │    │
│       │ Lavagem completa │ R$ 80 │ 💳 Crédito    │    │
│       │ ├── Aprendizado: "João prefere manhã"    │    │
│       │ └── Decisão: "Oferecer pacote mensal"    │    │
│       └──────────────────────────────────────────┘    │
│                                                       │
│  28  ┌──────────────────────────────────────────┐    │
│       │ 💡 Decisão │ Comprar nova máquina        │    │
│       │ └── Resultado: Decidiu esperar 1 mês    │    │
│       └──────────────────────────────────────────┘    │
│                                                       │
│  27  ┌──────────────────────────────────────────┐    │
│       │ 📊 Conhecimento │ Sazonalidade detectada  │    │
│       │ "Julho tem 30% mais procura por cera"    │    │
│       └──────────────────────────────────────────┘    │
│                                                       │
│  25  ┌──────────────────────────────────────────┐    │
│       │ 📅 Atendimento │ Maria Silva              │    │
│       │ ● Novo cliente │ Indicado por João        │    │
│       │ Corte + Escova │ R$ 120 │ ✔ Dinheiro     │    │
│       │ ├── Aprendizado: "Indicação vale desconto"│    │
│       │ └── Outcome: "Nova cliente fidelizada"   │    │
│       └──────────────────────────────────────────┘    │
│                                                       │
│  20  ┌──────────────────────────────────────────┐    │
│       │ 💰 Caixa │ Fechamento mensal             │    │
│       │ Faturamento: R$ 12.450 │ Meta: 85%       │    │
│       │ ├── Insight: "Quartas são dias fracos"  │    │
│       │ └── Ação: "Campanha quarta-feira"        │    │
│       └──────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────┘
```

### Tipos de evento na timeline

| Tipo | Origem | Cor |
|------|--------|-----|
| Atendimento | Operação | Azul |
| Venda | Operação | Verde |
| Despesa | Operação | Vermelho |
| Decisão | Empresário | Roxo |
| Conhecimento | Motor | Dourado |
| Aprendizado | Empresário | Laranja |
| Meta | Empresário | Rosa |
| Alerta | Motor | Vermelho claro |
| Outcome | Motor | Verde escuro |
| Indicacao | Operação | Ciano |

### Funcionalidades da Timeline

- **Filtro por tipo**: "Só atendimentos" | "Só decisões" | "Tudo"
- **Busca por texto**: "João" → mostra tudo relacionado ao João
- **Agrupamento**: Por dia / semana / mês
- **Drill-down**: Clica no evento → detalhes completos
- **Exportação**: "Me mande o relatório da semana"

### O que substitui

A Timeline substitui:
- Página de Histórico (consolida)
- Página de Relatórios (visão diária)
- Feed de Notificações (eventos importantes)
- Extrato de Caixa (eventos financeiros)

---

# ETAPA 7 — Centro Diário

## A Página que o Empresário Abre Todo Dia

### Design

```
┌─────────────────────────────────────────────────────────┐
│  Bom dia, Carlos!                    Qui, 29 Jul 2026    │
│                                                          │
│  ┌─── ONDE ESTAMOS ─────────────────────────────────┐   │
│  │  Hoje: 3 atendimentos agendados                  │   │
│  │  Faturamento ontem: R$ 480 | Meta do dia: R$ 400 │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─── O QUE MUDOU ─────────────────────────────────┐   │
│  │  ✅ João confirmou 10h                           │   │
│  │  ❌ Maria cancelou 14h                           │   │
│  │  💡 Cliente novo: Pedro (indicado por João)     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─── O QUE MERECE ATENÇÃO ────────────────────────┐   │
│  │  ⚠ Conta de luz vence amanhã (R$ 350)           │   │
│  │  ⚠ João não vem há 30 dias (recorrência 18)    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─── QUEM PRECISA DE VOCÊ ───────────────────────┐   │
│  │  🕐 09:00 - João Silva - Lavagem completa       │   │
│  │  🕐 11:00 - Maria Santos - Corte                │   │
│  │  🕐 14:00 - Pedro Lima - Orçamento              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─── PRÓXIMO MELHOR MOVIMENTO ───────────────────┐   │
│  │  💡 Oferecer pacote mensal para João            │   │
│  │  📊 Revisar preço de corte (não ajusta há 3m)  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  [Iniciar Atendimento]  [Ver Timeline]  [Fechar Dia]     │
└─────────────────────────────────────────────────────────┘
```

### Regras do Centro Diário

1. **5 perguntas. Nada mais.** Onde estamos, o que mudou, o que merece atenção, quem precisa de você, próximo movimento.
2. **Tudo acionável.** Cada item é um link/botão que leva a ação.
3. **Zero gráficos.** Nada de radar, curva, score, capital. Apenas informação útil.
4. **Contexto do dia.** Amanhece com a agenda, atualiza em tempo real.
5. **Primeira coisa que o empresário vê.** É a página inicial (substitui o dashboard).

### O que o Centro Diário NÃO tem

- Gráfico de radar de capacidades ❌
- Curva evolutiva ❌
- Score de capital cognitivo ❌
- Cards de "patrimônio" ❌
- Comparação mensal ❌
- Indicadores sem ação ❌

### Ciclo Diário

```
Abre Centro Diário → Vê agenda → Atende cliente → 
Timeline atualiza → Caixa atualiza → Conhecimento gera → 
Fecha dia → Centro Diário reflete amanhã
```

---

# ETAPA 8 — Jornada Completa Founder

## Cenários Validados

### Cenário 1: Lavação

```
07:30 — Abre Ponte → Centro Diário mostra 4 agendamentos
07:45 — Cliente chega → Busca "João" → Reconhece → Confirma serviço
          → Caixa atualiza → Conhecimento: "João prefere manhã"
08:30 — Cliente novo → "Maria" → Telefone → Serviço → Valor
          → Cliente registrado → Caixa atualiza
09:00 — Cliente reclama (WhatsApp) → Busca cliente → Registra reclamação
          → Alerta gerado: "Cliente insatisfeito"
10:00 — Compra insumos → "Gastei R$200" → Categoria → Caixa atualiza
12:00 — Almoço
13:00 — Ver Timeline → Vê que quarta-feira é dia fraco → Decide criar campanha
14:00 — Atendimentos da tarde
18:00 — Fecha dia → Verifica caixa → R$ 780 no dia → Bateu meta
          → Aprendizado: "Semana está boa"
```

### Cenário 2: Barbearia

```
08:00 — Abre Ponte → 3 agendamentos + 1 cliente novo
09:00 — Corte → Busca "Pedro" → Último corte há 20 dias → Confirma
          → Sugestão: "Barba também?" → Cliente aceita → +R$20
11:00 — Cliente frequente → Reconhece automaticamente → Último valor R$50
          → "Mesmo de sempre?" → Confirma → Caixa atualiza
15:00 — Cliente novo → Nome + Whats → Preferência: "Corte degradê"
          → Registrado com preferência → Próxima vez já sabe
18:00 — Fecha: R$ 620 dia → Ticket médio: R$ 44 → 14 clientes
          → Insight: "Clientes que fazem barba gastam 30% mais"
```

### Cenário 3: Oficina

```
08:00 — Abre Ponte → 2 carros agendados
09:00 — Troca de óleo → Busca placa "ABC-1234" → Histórico do veículo
          → Última troca há 8.000km → Sugere óleo + filtro
          → Confirma → Caixa: R$ 250
11:00 — Cliente liga → "Meu carro está fazendo barulho"
          → Busca placa → Registra ocorrência como pendência
          → Agendamento para amanhã
14:00 — Freios → Verifica histórico → "Pastilhas trocadas há 2 anos"
          → Recomenda troca → Cliente autoriza → R$ 600
18:00 — Fecha: R$ 1.850 → Insight: "Revisão de freios gera maior ticket"
```

### Cenário 4: Clínica

```
07:00 — Centro Diário → 5 pacientes agendados
08:00 — Paciente recorrete → Reconhece → Última consulta há 6 meses
          → Prontuário carregado → Anamnese prévia visível
          → Atendimento registrado → Prontuário atualizado
10:00 — Paciente novo → Cadastro rápido → CPF → Nome → Plano
          → Registra queixa → Atendimento vinculado
12:00 — Almoço
14:00 — Retorno paciente → Exame feito → "Resultado normal"
          → Decisão: "Manter tratamento" → Registrado no prontuário
18:00 — Fecha: 8 pacientes → Faturamento R$ 1.200 → Taxa de retorno 75%
```

### Cenário 5: Loja

```
09:00 — Abre Ponte → Verifica entregas pendentes
10:00 — Venda balcão → Busca produto → "Tênis X, R$ 200, Débito"
          → Cliente identificado (WhatsApp) → Histórico de compras
          → Sugestão: "Cliente compra tênis a cada 4 meses"
          → Venda registrada → Caixa atualiza → Estoque: -1
14:00 — Cliente recorrete → "Quero o mesmo de sempre"
          → Última compra: Tênis X, R$ 200 → Confirma → Caixa
16:00 — Fornecedor → "Comprei R$ 500 em estoque" → Categoria → Caixa
18:00 — Fecha: R$ 1.200 → Insight: "Clientes fiéis compram no sábado"
```

---

# ETAPA 9 — Auditoria de Fricção

## Cada Clique, Cada Campo, Cada Tela

### Critérios

| Critério | Pergunta | Ação se Não |
|----------|----------|-------------|
| Clique | "Este clique gera valor?" | Remover |
| Campo | "Esta informação será usada?" | Remover |
| Tela | "Fortalece capacidade empresarial?" | Remover |
| Etapa | "Sem ela o fluxo funciona?" | Remover |
| Confirmação | "Posso confiar no padrão?" | Auto-confirmar |

### Auditoria Aplicada ao Fluxo Atual

| Campo/Etapa | Valor? | Usado? | Decisão |
|-------------|--------|--------|---------|
| Nome completo do cliente (2 campos) | Não | Parcial | Unificar em 1 campo |
| Telefone (DDD + número separados) | Não | Não | Unificar |
| CPF/CNPJ obrigatório | Não | Raramente | Opcional, auto-detectado |
| Endereço completo | Não | Raramente | CEP → auto-complete |
| Categoria do lead (frio/morno/quente) | Parcial | Sim | Simplificar para 2 estados |
| Status de tarefa (8 opções) | Não | Não | Reduzir para 3 |
| Tipo de transação (20 categorias) | Parcial | Parcial | Auto-categorizar |
| Observação livre | Sim | Sim | Manter mas opcional |
| Data de nascimento | Não | Raramente | Opcional |
| Gênero | Não | Não | Remover |

### Fricções Identificadas no Fluxo Atual

1. **Separar lead de cliente**: O empresário não distingue. É cliente ou não é.
2. **Separar atendimento de venda**: No pequeno negócio, são a mesma coisa.
3. **Separar venda de pagamento**: A venda só existe se for paga.
4. **Separar financeiro de operação**: O empresário não pensa em "lançamento contábil".
5. **Separar histórico por entidade**: O empresário quer a história da empresa, não a história do cliente (separadamente).
6. **Formulários longos**: Qualquer campo além de 3 é demais.
7. **Telas de confirmação**: "Tem certeza?" é insulto. Desfazer é melhor que confirmar.
8. **Dropdowns com 20 opções**: O empresário não classifica, ele executa.

### Regra de Ouro da Fricção

> Se o empresário consegue fazer mais rápido no WhatsApp + papel, a Ponte Digital perdeu.

---

# ETAPA 10 — Relatório Executivo

## Fluxos Oficiais da Ponte Digital — P34

### Fluxo Diário

```
1. Abre Centro Diário (5 perguntas)
2. Vê agenda do dia
3. Atende cliente (busca + confirma, ~5 seg)
4. Cliente novo (nome + serviço + valor, ~15 seg)
5. Fecha dia (verifica caixa, 0 esforço extra)
```

### Fluxo Semanal

```
1. Centro Diário → "Como foi a semana?"
2. Timeline → Decisões da semana
3. Aprendizados → O que a empresa aprendeu
4. Próximos passos → Ajustar precificação, campanhas
```

### Fluxo Mensal

```
1. Fechamento financeiro automático
2. Revisão de conhecimento: O que aprendemos?
3. Decisões estratégicas: O que mudar?
4. Ajuste de metas para o próximo mês
```

### Fluxo de Atendimento

```
Busca cliente → Reconhecimento → Histórico carregado 
→ Sugestões → Confirma → Caixa atualiza → Conhecimento gera
```

### Fluxo de Venda

```
Cliente identificado → Serviço selecionado → Valor confirmado 
→ Pagamento registrado → Caixa atualiza → Ticket médio recalcula
→ Recorrência atualizada → Retenção atualizada
→ Aprendizado: "Cliente prefere [serviço + forma de pagamento]"
```

### Fluxo de Conhecimento

```
Atendimento registrado → Evidence Engine registra observação
→ Memory Engine cruza com padrões → Hipotese criada/atualizada
→ Se confiança alta → Knowledge Engine promove a conhecimento
→ Conhecimento vira sugestão no próximo atendimento similar
```

### Fluxo de Aprendizado

```
Empresário ensina: "Este cliente prefere X"
→ Aprendizado registrado → Memory Engine incorpora
→ Próximo atendimento do mesmo cliente → Preferência aplicada
→ Empresário confirma → Reforço positivo → Confiança aumenta
```

### Fluxo de Caixa Inteligente

```
Atendimento com pagamento → Caixa atualiza automaticamente
→ Faturamento do dia recalcula → Saldo atualiza
→ Ticket médio recalcula → Projeção ajusta
→ Extrato vivo reflete o momento atual
```

### Fluxo de Operação Invisível

```
Cada atendimento gera:
  → 1 observação (Evidence Engine)
  → 1 atualização de padrão (Context Engine)
  → 1 evolução de hipótese (Memory Engine)
  → 1 atualização de confiança (Trust Engine)
  → 1 contribuição ao patrimônio (Heritage Facade)
Zero telas. Zero formulários. Zero notificações.
```

## Critérios de Aprovação — Verificação Final

| Critério | Status | Como |
|----------|--------|------|
| Venda em ≤10 segundos | ✅ Projetado | Busca → Confirma → Pronto |
| Nenhuma info digitada 2x | ✅ Projetado | Reconhecimento automático |
| Operação gera conhecimento | ✅ Projetado | Operation Invisível (ETAPA 5) |
| Caixa é consequência | ✅ Projetado | Caixa Inteligente (ETAPA 4) |
| Ponte aprende sem esforço | ✅ Projetado | Aprendizado automático |
| Rotina mais leve que WhatsApp+papel+planilha | ✅ Projetado | Um fluxo único, zero formulários |

## Resumo da Transformação P34

| Antes (P33) | Depois (P34) |
|-------------|-------------|
| 13 páginas separadas | 1 página de trabalho + 7 abas |
| CRM, Financeiro, Tarefas como módulos | Tudo é Atendimento |
| Dados precisam ser alimentados | Dados são consequência do trabalho |
| Conhecimento é tela separada | Conhecimento nasce da operação |
| Caixa é módulo financeiro | Caixa é resultado do atendimento |
| Histórico é consulta | Timeline é memória viva |
| Empresário "alimenta o sistema" | Empresário "trabalha na Ponte" |
