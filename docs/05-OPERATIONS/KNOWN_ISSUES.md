# Known Issues

## Soft Delete incompleto

**Status:** Pendente
**Prioridade:** Alta
**Descrição:** Parte dos models do Prisma não possui campo `deletedAt`. Duas auditorias reportaram listas diferentes e inconsistentes entre si — antes de corrigir, é necessário gerar uma lista real e completa direto do `schema.prisma` (não confiar em listagem gerada por IA sem conferência manual).
**Ação:** rodar `grep -L "deletedAt" **/*.prisma` ou revisão manual do schema, listar todos os models e seu status, então corrigir os que deveriam ter e não têm.
**Sprint:** pode ser corrigido em paralelo, não precisa de sprint dedicada.

## HistoricoSinal com nomenclatura técnica, não semântica

**Status:** Aceito (não é bug)
**Prioridade:** Baixa, congelado até Fase 2
**Descrição:** nomes como `clientes-sem-contato` não seguem a convenção semântica formal de `DomainEvent`. Ver `04-DECISIONS/ADR/ADR-001-historico-sinal-vs-domain-event.md`.
**Ação:** nenhuma agora.

## Zero cobertura de teste automatizado

**Status:** Pendente, prioridade proporcional à fase
**Prioridade:** Média
**Descrição:** nenhum teste automatizado no repositório.
**Ação recomendada:** testes de fumaça mínimos em autenticação e transações financeiras (maior risco silencioso) — não uma suíte completa, que seria sofisticação prematura para esta fase.

## README.md é o template padrão do projeto

**Status:** Resolvido em 2026-07-13
**Prioridade:** Baixa
**Descrição:** README não documentava o projeto real.
**Ação:** README raiz agora aponta direto para `docs/00-START-HERE.md`, ponto de entrada do Sistema Operacional de Engenharia. Nenhum conteúdo de negócio foi adicionado ao README — ele só direciona.

## Gap de Row Level Security confirmado (auditoria de patrimônio intelectual, 2026-07-13)

**Status:** Pendente
**Prioridade:** Alta
**Descrição:** `sistema/prisma/rls-policies.sql` habilita RLS em 11 tabelas, mas só cria a policy `empresa_isolamento` em 8 delas. `empresas`, `contatos` e `etapas_implantacao` têm RLS habilitado sem nenhuma policy — dependendo da role de conexão do Prisma, isso pode significar acesso bloqueado (se a role respeita RLS) ou RLS simplesmente inofensivo (se a role usada, como `service_role` do Supabase, ignora RLS por padrão). `HistoricoSinal` não tem RLS habilitado de forma nenhuma.
**Ação:** confirmar qual role o Prisma usa para conectar; criar as policies faltantes; decidir se `HistoricoSinal` precisa de RLS.
**Detalhe técnico completo:** `../08-KNOWLEDGE/ENGINEERING_KNOWLEDGE.md`.

## Wrapper de tenant guard (`prismaSeguro`) existe mas não está conectado

**Status:** Pendente
**Prioridade:** Alta
**Descrição:** `sistema/src/lib/prisma-tenant-safe.ts` define um cliente Prisma estendido que detecta queries multi-tenant sem `empresaId`. Nenhum dos 7 services do projeto o importa — todos usam o cliente Prisma direto (`@/lib/prisma`). O "segundo nível de proteção" descrito no comentário do próprio arquivo não está, de fato, rodando.
**Ação:** decidir se os services devem migrar para `prismaSeguro`, ou se o arquivo deve ser removido caso a abordagem tenha sido abandonada — não deixar código morto que sugere uma garantia que não existe.
**Detalhe técnico completo:** `../08-KNOWLEDGE/ENGINEERING_KNOWLEDGE.md`.

## Soft delete — lista real confirmada por inspeção direta do schema (não mais "rodar grep depois")

**Status:** Parcialmente resolvido — dado real levantado, decisão de correção ainda pendente
**Prioridade:** Alta
**Descrição:** confirmado contra `schema.prisma`: têm `deletedAt` — Cliente, Implantacao, Lead, Tarefa, Transacao (5 de 12 models). Não têm — Empresa, Usuario, Contato, EtapaImplantacao, Historico, ConfiguracaoEmpresa, HistoricoSinal (7 de 12 models).
**Ação:** decidir quais dos 7 são exceção legítima (ex.: Empresa é a raiz do tenant; Historico/HistoricoSinal são logs) e quais são lacuna real a corrigir.
**Detalhe técnico completo:** `../08-KNOWLEDGE/ENGINEERING_KNOWLEDGE.md`.

## Sistema não modela um usuário "Apoiador" fora do conceito de empresa/tenant

**Status:** Pendente
**Prioridade:** Média — não bloqueia a sprint ativa, mas bloqueia operar a Escada Comunitária de ponta a ponta
**Descrição:** desde `ADR-003` (2026-07-14), a jornada do usuário prevê um estágio "Apoiador" — alguém que completou o Diagnóstico mas ainda não é Fundador, sem necessariamente ter uma "Empresa" cadastrada no sentido atual do schema (multiempresa, papéis ADMIN/GESTOR/MEMBRO). Hoje o sistema só reconhece usuários dentro de uma empresa já criada.
**Ação:** decisão de engenharia pendente — se um Apoiador precisa de um registro leve próprio (não uma Empresa completa), ou se a Empresa é criada de forma simplificada já no Diagnóstico. Não decidir sozinho; ver `07-BUSINESS/JORNADA_APOIADOR.md`.
**Detalhe estratégico completo:** `04-DECISIONS/ADR/ADR-003-ecossistema-publico-vs-plataforma-cognitiva.md`.

*(Adicionar uma entrada por problema identificado, com status, prioridade e ação.)*

## P51/P55/P56 — produção sincronizada (deploy resolvido)

**Status:** Resolvido em 2026-08-02 (P56) — produção == `main`
**Prioridade:** ~ (era Altox, bloqueava validação com Founder real)
**Descrição:** produção (`https://ponte-digital.vercel.app`) estava presa em P47.1/`1242564`. No P56 foi executado o deploy de produção via CLI Vercel (conta `pontedigitalsc-1314`, equipe `ponte-digital1`, projeto `ponte-digital`), publicando `main`/`ca4a099` (contém P50–P55). Migrations verificadas como "up to date" (5/5). A partir deste marco, `main` é a fonte da verdade em produção.
**Ação:** encerrado. Para futuros deploys: `npx vercel deploy --prod --yes --scope ponte-digital1` (na raiz do repo) ou Git-integration da Vercel.

## Conflito de URL de produção (documentação)

**Status:** Reconciliado em 2026-08-02 (P56) — URL oficial é `http://ponte-digital.vercel.app`
**Prioridade:** Média (documental)
**Descrição:** `OPS-INFRASTRUCTURE.md` e outros docs citam `https://pontedigital.com.br` como produção, mas o domínio personalizado não responde ao health check; a URL de produção real e ativa é `https://ponte-digital.vercel.app` (projeto `ponte-digital`, equipe `ponte-digital1`).
**Ação:** concluído — URL oficial registrada. Vincular `pontedigital.com.br` fica como pendência operacional (ver abaixo).

## Domínio personalizado `pontedigital.com.br` — pendência operacional

**Status:** Pendente (adiado para a fase operacional — decisão do usuário 2026-08-02)
**Prioridade:** Baixa na fase atual (URL da Vercel é oficial)
**Descrição:** `vercel domains add pontedigital.com.br` → `domain_already_exists` (o domínio está sob outra conta Vercel) e o DNS atual aponta para um hosting antigo (`186.202.135.240`, nameservers `ns1/ns2.pontedigital.com.br`).
**Ação:** quando desejado: (1) transferir/aliar o domínio para a equipe `ponte-digital1` na conta Vercel que o possui; (2) no provedor DNS atual, apontar `@` → A `76.76.21.21` e `www` → CNAME `cname.vercel-dns.com`; (3) vincular o domínio ao projeto `ponte-digital`. Registrar também o e-mail profissional (ex.: `contato@ponte-digital.com.br` ou equivalente) após a configuração.

## P51 — ETAPAS que exigem validação com usuário real (ETAPAS 6 e 12)

**Status:** Pendente — depende do primeiro Founder usar a plataforma
**Prioridade:** Alta
**Descrição:** ETAPA 6 (cronometrar perfis reais: lavagem, barbearia, corretor, oficina, clínica, loja) e ETAPA 12 ("o primeiro Founder usa sem ajuda do desenvolvedor") só podem ser confirmadas com um empresário real usando a versão publicada. A auditoria de código (P51 Lotes A-D) cobriu o que é verificável por código: build limpo, typecheck limpo, `/atendimento` no menu, caixa com valores reais, conversa sem jargão, diagnóstico sem percentuais fixos, recomendação com riscos/esforço visíveis.
**Ação:** após o deploy, o usuário valida com o primeiro Founder e marca as ETAPAS 6/12 no `FOUNDER_V1_CHECKLIST.md` e no `FOUNDER_READINESS_CHECKLIST.md` (58 itens — Seções A/G dependem de deploy, CI, domínio e política de dados).

## P51 — rotas de ERP legadas fora do menu Founder

**Status:** Aceito por ora (decisão de produto pendente)
**Prioridade:** Baixa
**Descrição:** `/dashboard`, `/crm`, `/tarefas` e `/implantacoes` seguem acessíveis por URL mas não aparecem na sidebar Founder (grupos "Sua empresa / Consultar / Aprender / Ajustes"). Não são links quebrados; são telas fora do escopo Founder V1. O checklist "rotas órfãs" (Seção E) pode exigir decisão de desligá-las ou mantê-las com gate de módulo.
**Ação:** decidir em próxima revisão se essas rotas são removidas, bloqueadas por módulo ou deixadas como estão.

## P58 — Foundation Freeze Operacional em vigor

**Status:** Resolvido em 2026-08-02 (P58) — formalizado como contrato operacional
**Prioridade:** ~
**Descrição:** a partir do P58 nenhuma funcionalidade é criada por ideia interna; toda evolução nasce de comportamento, pedidos, dificuldades e decisões dos Founders. Estabilidade, segurança, qualidade de experiência e segurança da IA congeladas como baseline (regra _"Com base no que entendemos..."_).
**Ação:** ver `07-MILESTONES/P58_OPERATION_FREEZE_V1.md`. A entrada "Sistema não modela usuário Apoiador" (acima) é endereçada pelo P57B (números Apoiador/Fundador).

