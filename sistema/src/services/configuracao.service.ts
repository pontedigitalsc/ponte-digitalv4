import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

export async function listarConfiguracoes(empresaId: string, usuarioId: string) {
  const [empresa, config, usuario] = await Promise.all([
    prisma.empresa.findUnique({ where: { id: empresaId } }),
    prisma.configuracaoEmpresa.findUnique({ where: { empresaId } }),
    prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { id: true, nome: true, cargo: true, email: true },
    }),
  ])

  return {
    empresa,
    config,
    usuario,
  }
}

export async function atualizarEmpresa(empresaId: string, dados: { nome?: string; logo?: string }) {
  return prisma.empresa.update({
    where: { id: empresaId },
    data: {
      nome: dados.nome,
      logo: dados.logo,
    },
  })
}

export async function atualizarConfiguracao(empresaId: string, dados: Record<string, unknown>) {
  return prisma.configuracaoEmpresa.upsert({
    where: { empresaId },
    update: dados as never,
    create: { empresaId, ...dados } as never,
  })
}

export async function atualizarPerfil(usuarioId: string, empresaId: string, dados: { nome?: string; cargo?: string }) {
  await prisma.usuario.updateMany({
    where: { id: usuarioId, empresaId },
    data: {
      nome: dados.nome,
      cargo: dados.cargo,
    },
  })
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: { id: true, nome: true, cargo: true, email: true },
  })
  return usuario ?? undefined
}
