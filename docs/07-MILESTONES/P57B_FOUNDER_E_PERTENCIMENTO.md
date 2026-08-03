# P57B — Fundação Founder e Pertencimento V1

**Data:** 2 de agosto de 2026
**STATUS:** OFICIAL — pertencimento materializado.

> A Ponte Digital não tem planos. Tem **níveis de relacionamento**. Criar conta
> significa "começar a construir a história da sua empresa" — não comprar acesso.

---

## 1. Os caminhos

| Caminho | Conta? | O que a pessoa pode fazer |
|---|---|---|
| **Explorar** | Não | Conhecer a ideia, experimentar conceitos, fazer o diagnóstico gratuito (`/diagnostico`, `/conversa`) |
| **Conta Gratuita** | Sim | Acompanhar diagnóstico mensal, conversar com a Ponte, explorar cenários, guardar histórico, acompanhar evolução |

Toda conta criada recebe automaticamente um número único de pertencimento.

---

## 2. O número de pertencimento

- **Formato:** `Apoiador #0001`, `Apoiador #0002`, `Apoiador #0003`...
- **Regras:**
  - Atribuído na criação da conta, **sem exceção**;
  - **Nunca reutilizado** (índice único no banco);
  - **Nunca alterado**;
  - Não dá vantagem — dá **pertencimento**. Representa o momento em que a pessoa entrou na história da Ponte.
- **Marco histórico:** os **primeiros 1000 usuários** recebem o título **Apoiador da Ponte Digital**. Depois disso o sistema continua funcionando normalmente, mas o marco histórico termina.

### Implementação técnica
- Campos na `Empresa` (P57B): `numeroApoiador Int? @unique` e `numeroFundador Int? @unique`.
- Alocação no `POST /api/auth/criar-conta`: transação atômica que lê o `MAX(numeroApoiador)` e cria a empresa com `max+1`; em colisão de índice único, retenta (até 3x).
- Exibição: card de pertencimento em `/minha-empresa-hoje`, selo em `/fundador`, selo em `/tornar-se-fundador`.

---

## 3. Caminho Fundador

Dentro da conta gratuita existe **"Tornar-se Fundador"** (`/tornar-se-fundador`).
Não aparece como venda — é uma **evolução**.

> Você não está apenas usando uma plataforma.
> Você está participando da construção de uma nova forma de administrar empresas.

- **Fundadores:** os primeiros 1000. Número permanente (`Apoiador #0345` → `Fundador #0345`).
- **Nunca perdem:** histórico, número e identidade.
- **Benefícios Fundador** (participação simbólica, não desconto):
  - canal direto com a equipe;
  - prioridade de aprendizado;
  - participação nas validações;
  - reconhecimento histórico;
  - empresa registrada como parte da construção.

---

## 4. Processo inicial de conversão (manual)

Neste momento a mudança de Apoiador → Fundador é **manual**, iniciada por uma conversa real:

1. O apoiador clica em **"Quero ser Fundador"** (página `/tornar-se-fundador`).
2. Abre o WhatsApp `48991133397` com a mensagem automática: _"Olá, quero participar como Founder da Ponte Digital."_
3. A equipe registra: **data, empresa, número fundador e conversa inicial**.
4. A promoção é aplicada no banco (campo `numeroFundador` = mesmo número do `numeroApoiador`); o selo passa a exibir `Fundador #0001`.

O processo permanece manual até existir evidência de volume (evolução nasce de uso real — P58).

---

## 5. Critérios de aceite

- [x] Número único atribuído a cada conta criada (banco, índice único).
- [x] Número exibido após criação de conta e nas páginas de pertencimento.
- [x] "Tornar-se Fundador" disponível dentro da conta gratuita.
- [x] Botão "Quero ser Fundador" abre WhatsApp com mensagem automática.
- [x] Nenhuma venda, nenhum plano, nenhum desconto — apenas pertencimento.

---

## 6. Documentos irmãos

- `P58_OPERATION_FREEZE_V1.md` — regras de operação pós-ponte.
- `FOUNDER_V1_FREEZE.md` e `P55_FOUNDER_READY_V1.md` — congelamentos anteriores.
