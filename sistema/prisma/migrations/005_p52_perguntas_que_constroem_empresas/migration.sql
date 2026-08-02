-- CreateTable
CREATE TABLE "perguntas_abertas" (
    "id" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "capacidade" TEXT NOT NULL,
    "beneficio" TEXT NOT NULL,
    "segmentosRecomendados" TEXT[] NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT false,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataRevisao" TIMESTAMP(3) NOT NULL,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "perguntas_abertas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respostas_perguntas_abertas" (
    "id" TEXT NOT NULL,
    "perguntaId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "segmento" TEXT,
    "resumo" TEXT NOT NULL,
    "contexto" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "respostas_perguntas_abertas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "perguntas_abertas_ativa_idx" ON "perguntas_abertas"("ativa");

-- CreateIndex
CREATE INDEX "perguntas_abertas_dataRevisao_idx" ON "perguntas_abertas"("dataRevisao");

-- CreateIndex
CREATE INDEX "perguntas_abertas_deletedAt_idx" ON "perguntas_abertas"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "respostas_perguntas_abertas_perguntaId_empresaId_key" ON "respostas_perguntas_abertas"("perguntaId", "empresaId");

-- CreateIndex
CREATE INDEX "respostas_perguntas_abertas_perguntaId_empresaId_idx" ON "respostas_perguntas_abertas"("perguntaId", "empresaId");

-- CreateIndex
CREATE INDEX "respostas_perguntas_abertas_perguntaId_criadaEm_idx" ON "respostas_perguntas_abertas"("perguntaId", "criadaEm");

-- CreateIndex
CREATE INDEX "respostas_perguntas_abertas_empresaId_idx" ON "respostas_perguntas_abertas"("empresaId");

-- CreateIndex
CREATE INDEX "respostas_perguntas_abertas_empresaId_deletedAt_idx" ON "respostas_perguntas_abertas"("empresaId", "deletedAt");

-- AddForeignKey
ALTER TABLE "respostas_perguntas_abertas" ADD CONSTRAINT "respostas_perguntas_abertas_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "perguntas_abertas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_perguntas_abertas" ADD CONSTRAINT "respostas_perguntas_abertas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
