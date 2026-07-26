# Padrões de Código Atuais (V4 Founder)

Este documento descreve o padrão **real e aceito** para esta fase — não o padrão aspiracional de `ARCHITECTURE.md`.

## Como criar um Service

- Um arquivo por domínio em `sistema/src/services/`.
- Acesso direto ao Prisma dentro do service é aceito nesta fase.
- Toda query deve respeitar tenant guard (filtrar por empresa) e soft delete (`deletedAt: null` por padrão).

## Como criar uma API Route

- Uma rota por operação, chamando o service correspondente.
- Validação de entrada com Zod antes de chamar o service.
- Nunca acessar Prisma diretamente dentro da rota — sempre via service.

## Nomenclatura

- Arquivos: `kebab-case`.
- Models Prisma: `PascalCase` em português (consistente com o domínio já em uso: `Lead`, `Cliente`, `Tarefa`, etc.).
- Nunca renomear models existentes fora de uma sprint dedicada a isso — ver `05-OPERATIONS/KNOWN_ISSUES.md`.

## O que não fazer agora

- Não criar camada `repositories/`.
- Não criar camada `server/actions/`.
- Não "otimizar" ou refatorar código fora do escopo da tarefa, mesmo que pareça rápido.
