-- CreateEnum
CREATE TYPE "EstadoPerguntaViva" AS ENUM ('ATIVA', 'RESPONDIDA', 'ARQUIVADA');

-- CreateTable
CREATE TABLE "perguntas_vivas" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "contexto" TEXT,
    "estado" "EstadoPerguntaViva" NOT NULL DEFAULT 'ATIVA',
    "resposta" TEXT,
    "respondidaEm" TIMESTAMP(3),
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "perguntas_vivas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reflexoes_semanais" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "semana" TEXT NOT NULL,
    "reflexao" TEXT NOT NULL,
    "contexto" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "reflexoes_semanais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memoria_emocional" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "sentimento" TEXT NOT NULL,
    "fato" TEXT,
    "contexto" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "memoria_emocional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "perguntas_vivas_empresaId_estado_criadaEm_idx" ON "perguntas_vivas"("empresaId", "estado", "criadaEm");

-- CreateIndex
CREATE INDEX "perguntas_vivas_empresaId_criadaEm_idx" ON "perguntas_vivas"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "perguntas_vivas_empresaId_deletedAt_idx" ON "perguntas_vivas"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "reflexoes_semanais_empresaId_semana_idx" ON "reflexoes_semanais"("empresaId", "semana");

-- CreateIndex
CREATE INDEX "reflexoes_semanais_empresaId_criadaEm_idx" ON "reflexoes_semanais"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "reflexoes_semanais_empresaId_deletedAt_idx" ON "reflexoes_semanais"("empresaId", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "reflexoes_semanais_empresaId_semana_key" ON "reflexoes_semanais"("empresaId", "semana");

-- CreateIndex
CREATE INDEX "memoria_emocional_empresaId_tipo_idx" ON "memoria_emocional"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "memoria_emocional_empresaId_criadaEm_idx" ON "memoria_emocional"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "memoria_emocional_empresaId_deletedAt_idx" ON "memoria_emocional"("empresaId", "deletedAt");

-- AddForeignKey
ALTER TABLE "perguntas_vivas" ADD CONSTRAINT "perguntas_vivas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflexoes_semanais" ADD CONSTRAINT "reflexoes_semanais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memoria_emocional" ADD CONSTRAINT "memoria_emocional_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
