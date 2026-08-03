import { getCurrentUser } from '@/lib/auth'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'

export const metadata = { title: 'Tornar-se Fundador' }

const WHATSAPP_URL = 'https://wa.me/5548991133397'

export default async function TornarSeFundadorPage() {
  const usuario = await getCurrentUser().catch(() => null)

  let pertencimento: { numero: number; titulo: string } | null = null
  if (usuario) {
    const empresa = await prisma.empresa
      .findUnique({
        where: { id: usuario.empresaId },
        select: { numeroApoiador: true, numeroFundador: true },
      })
      .catch(() => null)
    if (empresa?.numeroFundador) {
      pertencimento = { numero: empresa.numeroFundador, titulo: 'Fundador' }
    } else if (empresa?.numeroApoiador) {
      pertencimento = { numero: empresa.numeroApoiador, titulo: 'Apoiador' }
    }
  }

  const beneficios = [
    { titulo: 'Canal direto com a equipe', descricao: 'Suas dúvidas, ideias e dificuldades chegam direto em quem constrói.' },
    { titulo: 'Prioridade de aprendizado', descricao: 'Sua empresa participa primeiro das novidades que nascem da Ponte.' },
    { titulo: 'Participação nas validações', descricao: 'Você decide, com uso real, o que a Ponte vai se tornar.' },
    { titulo: 'Reconhecimento histórico', descricao: 'Seu número, sua empresa e sua história ficam registrados para sempre.' },
    { titulo: 'Parte da construção', descricao: 'Sua empresa entra como parte da fundação de uma nova forma de administrar.' },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <AvatarPonte state="success" size="lg" />
          <h1 className="text-2xl font-semibold tracking-tight">Construa a Ponte Digital conosco</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Você não está apenas usando uma plataforma.
            <br />
            Você está participando da construção de uma nova forma de administrar empresas.
          </p>
          {pertencimento && (
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-50 px-4 py-2 text-sm dark:bg-amber-950/30">
              <span className="text-amber-700 dark:text-amber-400">
                {pertencimento.titulo} #{String(pertencimento.numero).padStart(4, '0')}
              </span>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-dashed border-primary/30 bg-card/50 p-6 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            Tornar-se Fundador não é uma compra. É uma evolução.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A mudança é feita em uma conversa com a equipe. Você conta sobre sua empresa, registramos sua
            participação e seu número de apoiador se torna um número de Fundador — mantendo sua história e sua identidade.
          </p>
        </div>

        <div className="space-y-3">
          {beneficios.map((b) => (
            <div key={b.titulo} className="rounded-xl border-l-4 border-amber-400/40 border bg-card p-4 space-y-1">
              <h3 className="font-semibold text-sm">{b.titulo}</h3>
              <p className="text-sm text-muted-foreground">{b.descricao}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-amber-400/40 bg-card p-6 text-center space-y-3">
          <p className="text-sm font-medium">
            Quer fazer parte dos primeiros 1000?
          </p>
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent('Olá, quero participar como Founder da Ponte Digital.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Quero ser Fundador
          </a>
          <p className="text-xs text-muted-foreground">
            O primeiro contato acontece pelo WhatsApp, direto com a equipe da Ponte.
          </p>
          <div className="space-y-2 pt-1">
            <Link href="/fundador" className="block text-xs text-primary hover:underline underline-offset-2">
              ← Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
