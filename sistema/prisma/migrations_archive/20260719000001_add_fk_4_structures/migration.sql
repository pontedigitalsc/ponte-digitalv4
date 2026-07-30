-- CreateTable
CREATE TABLE "anotacoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "criadoPorId" TEXT,
    "entidadeTipo" TEXT NOT NULL,
    "entidadeId" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "anotacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL DEFAULT '#3B82F6',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onboarding_decisoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "implantacaoId" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "decisao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'ESCOLHA',
    "dataDecisao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsavelId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "onboarding_decisoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decisoes_sinais" (
    "id" TEXT NOT NULL,
    "decisaoId" TEXT NOT NULL,
    "sinalId" TEXT NOT NULL,
    "tipoRelacao" TEXT NOT NULL DEFAULT 'GEROU',
    "peso" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "decisoes_sinais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "anotacoes_empresaId_entidadeTipo_entidadeId_idx" ON "anotacoes"("empresaId", "entidadeTipo", "entidadeId");

-- CreateIndex
CREATE INDEX "anotacoes_empresaId_criadoEm_idx" ON "anotacoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "anotacoes_criadoPorId_idx" ON "anotacoes"("criadoPorId");

-- CreateIndex
CREATE INDEX "tags_empresaId_idx" ON "tags"("empresaId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_empresaId_nome_key" ON "tags"("empresaId", "nome");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_empresaId_criadoEm_idx" ON "onboarding_decisoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_implantacaoId_idx" ON "onboarding_decisoes"("implantacaoId");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_responsavelId_idx" ON "onboarding_decisoes"("responsavelId");

-- CreateIndex
CREATE INDEX "decisoes_sinais_decisaoId_idx" ON "decisoes_sinais"("decisaoId");

-- CreateIndex
CREATE INDEX "decisoes_sinais_sinalId_idx" ON "decisoes_sinais"("sinalId");

-- CreateIndex
CREATE UNIQUE INDEX "decisoes_sinais_decisaoId_sinalId_tipoRelacao_key" ON "decisoes_sinais"("decisaoId", "sinalId", "tipoRelacao");

-- AddForeignKey
ALTER TABLE "anotacoes" ADD CONSTRAINT "anotacoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anotacoes" ADD CONSTRAINT "anotacoes_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_decisoes" ADD CONSTRAINT "onboarding_decisoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_decisoes" ADD CONSTRAINT "onboarding_decisoes_implantacaoId_fkey" FOREIGN KEY ("implantacaoId") REFERENCES "implantacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_decisoes" ADD CONSTRAINT "onboarding_decisoes_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decisoes_sinais" ADD CONSTRAINT "decisoes_sinais_decisaoId_fkey" FOREIGN KEY ("decisaoId") REFERENCES "acoes_cognitivas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decisoes_sinais" ADD CONSTRAINT "decisoes_sinais_sinalId_fkey" FOREIGN KEY ("sinalId") REFERENCES "historico_sinais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

