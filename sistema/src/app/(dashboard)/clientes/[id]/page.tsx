import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { ExperienceRenderer } from '@/components/shared/experience-renderer'
import { buscarClientePorId, atualizarCliente } from '@/services/cliente.service'
import { ClientePerfil } from '@/components/clientes/cliente-perfil'
import type { ClienteInput } from '@/lib/validations'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const usuario = await requireUser()
  const { id } = await params
  const cliente = await buscarClientePorId(id, usuario.empresaId)
  return { title: cliente?.nome ?? 'Cliente' }
}

export default async function ClientePerfilPage({ params }: Props) {
  const usuario = await requireUser()
  const { id } = await params
  const cliente = await buscarClientePorId(id, usuario.empresaId)

  if (!cliente) notFound()

  const experience = await experienceEngine.obterClienteExperience(usuario.empresaId, cliente.nome)

  async function handleAtualizar(dados: Partial<ClienteInput>) {
    'use server'
    const u = await requireUser()
    await atualizarCliente(id, u.empresaId, dados)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{cliente.nome}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {experience.narrativa.texto}
        </p>
      </div>
      <ExperienceRenderer
        narrativa={experience.narrativa}
        blocks={experience.blocks}
        actions={experience.actions}
        workflows={experience.workflows}
      />
      <ClientePerfil cliente={cliente} onAtualizar={handleAtualizar} />
    </div>
  )
}
