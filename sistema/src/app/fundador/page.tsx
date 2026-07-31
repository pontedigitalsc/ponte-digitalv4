import { getCurrentUser } from '@/lib/auth'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'

export const metadata = { title: 'Fundador' }

export default async function FundadorPage() {
  const usuario = await getCurrentUser().catch(() => null)
  const nome = usuario?.nome?.split(' ')[0]

  const compromissos = [
    { titulo: 'Participar da evolução', descricao: 'Cada decisão que a Ponte toma passa por quem a constrói.' },
    { titulo: 'Ajudar a validar', descricao: 'Seu uso real mostra o que funciona e o que precisa mudar.' },
    { titulo: 'Influenciar caminhos', descricao: 'Os primeiros Founders ajudam a definir a direção.' },
    { titulo: 'Fazer parte dos primeiros 1000', descricao: 'Um grupo pequeno que esteve no começo de algo novo.' },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <AvatarPonte state="success" size="lg" />
          <h1 className="text-2xl font-semibold tracking-tight">Fundador</h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {nome
              ? `${nome}, você já faz parte da história da Ponte. Alguns empresários escolhem participar ainda mais da construção.`
              : 'Você já faz parte da história da Ponte. Alguns empresários escolhem participar ainda mais da construção.'}
          </p>
        </div>

        <div className="space-y-3">
          {compromissos.map((c) => (
            <div key={c.titulo} className="rounded-xl border-l-4 border-amber-400/40 border bg-card p-4 space-y-1">
              <h3 className="font-semibold text-sm">{c.titulo}</h3>
              <p className="text-sm text-muted-foreground">{c.descricao}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-dashed border-primary/30 bg-card/50 p-6 text-center space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ser Fundador não é uma vantagem. É uma forma de pertencer a algo que está sendo construído por pessoas reais, com problemas reais.
          </p>
          <p className="text-sm font-medium">
            Os primeiros 1000 empresários estão construindo uma nova forma de pensar empresas.
          </p>
          <div className="space-y-2 pt-2">
            <Link
              href={usuario ? '/conversa' : '/criar-conta'}
              className="block w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Quero continuar essa conversa
            </Link>
            <Link
              href="/diagnostico"
              className="block w-full rounded-xl border border-border bg-card px-6 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Voltar ao diagnóstico
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
