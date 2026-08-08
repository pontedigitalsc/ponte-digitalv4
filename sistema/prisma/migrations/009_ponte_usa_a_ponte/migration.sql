-- 009 — PONTE USA A PONTE (P85): identidade definitiva
-- ----------------------------------------------------
-- 1. Alarga PlatformRole (P84 limitava a FOUNDER_PRINCIPAL) para o
--    vocabulario definitivo da identidade: FOUNDER e APOIADOR.
--    Regra P85-18: SEM privilégios novos por enquanto — so vocabulario.
-- 2. cria a tabela de membros usuário <-> empresa (EmpresaUsuario):
--    a associacao administrativa real, permitindo "uma pessoa ser
--    Founder da plataforma E ADMIN de uma empresa".
-- 3. nenhuma redefinicao de numero de pertencimento (vive em Empresa,
--    ja existente — P57B).

ALTER TYPE "PlatformRole" ADD VALUE 'FOUNDER';
ALTER TYPE "PlatformRole" ADD VALUE 'APOIADOR';

CREATE TABLE "empresa_usuarios" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBRO',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "empresa_usuarios_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "empresa_usuarios_empresaId_usuarioId_key" ON "empresa_usuarios"("empresaId", "usuarioId");
CREATE INDEX "empresa_usuarios_empresaId_idx" ON "empresa_usuarios"("empresaId");
CREATE INDEX "empresa_usuarios_usuarioId_idx" ON "empresa_usuarios"("usuarioId");
CREATE INDEX "empresa_usuarios_empresaId_ativo_idx" ON "empresa_usuarios"("empresaId", "ativo");
CREATE INDEX "empresa_usuarios_usuarioId_ativo_idx" ON "empresa_usuarios"("usuarioId", "ativo");
CREATE INDEX "empresa_usuarios_empresaId_deletedAt_idx" ON "empresa_usuarios"("empresaId", "deletedAt");
CREATE INDEX "empresa_usuarios_usuarioId_deletedAt_idx" ON "empresa_usuarios"("usuarioId", "deletedAt");

ALTER TABLE "empresa_usuarios" ADD CONSTRAINT "empresa_usuarios_empresaId_fkey"
    FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "empresa_usuarios" ADD CONSTRAINT "empresa_usuarios_usuarioId_fkey"
    FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;