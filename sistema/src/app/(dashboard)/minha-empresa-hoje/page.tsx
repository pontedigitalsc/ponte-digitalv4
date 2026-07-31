import { requireUser, getEmpresaDoUsuario } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'

export const metadata = { title: 'Minha Empresa Hoje' }

export default async function MinhaEmpresaHojePage() {
  const usuario = await requireUser()
  const empresa = await getEmpresaDoUsuario(usuario.id)
  const nome = usuario.nome.split(' ')[0]

  const historia = await experienceEngine.obterHomeExperience(usuario.empresaId)
  const retrato = historia.narrativaEmpresarial?.retratoVivo

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Cabeçalho */}
      <div className="text-center space-y-4">
        <AvatarPonte state="success" size="lg" />
        <h1 className="text-2xl font-semibold tracking-tight">{nome}, sua empresa hoje</h1>
      </div>

      {/* Narrativa principal */}
      <div className="rounded-xl border bg-card p-6 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Na última conversa, começamos a entender como sua empresa funciona.
          Cada resposta que você deu foi um passo para construir um retrato mais fiel.
        </p>
        <div className="border-l-2 border-primary/30 pl-4 py-2 space-y-2">
          {retrato?.forcas?.[0] && (
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 dark:text-green-400 font-medium">Uma força que percebemos:</span>{' '}
              {retrato.forcas[0]}
            </p>
          )}
          {retrato?.riscos?.[0] && (
            <p className="text-sm text-muted-foreground">
              <span className="text-amber-600 dark:text-amber-400 font-medium">Um ponto que merece atenção:</span>{' '}
              {retrato.riscos[0]}
            </p>
          )}
          {!retrato?.forcas?.[0] && !retrato?.riscos?.[0] && (
            <p className="text-sm text-muted-foreground">
              Conforme conversamos, sua empresa vai ficando mais nítida. Cada conversa revela algo novo.
            </p>
          )}
        </div>
      </div>

      {/* O que mudou? */}
      <div className="rounded-xl border border-dashed border-primary/20 bg-card/50 p-6 space-y-4 text-center">
        <AvatarPonte state="speaking" size="md" />
        <h2 className="text-lg font-semibold tracking-tight">Vamos continuar entendendo sua empresa?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          O que mudou desde nossa última conversa?
        </p>
        <Link
          href="/conversa"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Quero continuar essa conversa
        </Link>
      </div>

      {/* Jornada */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">Sua história está sendo construída</p>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/minha-jornada"
            className="rounded-xl border bg-card p-4 space-y-1 hover:bg-muted/30 transition-colors"
          >
            <p className="text-sm font-medium">Minha Jornada</p>
            <p className="text-xs text-muted-foreground">Veja os capítulos da sua história</p>
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border bg-card p-4 space-y-1 hover:bg-muted/30 transition-colors"
          >
            <p className="text-sm font-medium">Como está hoje?</p>
            <p className="text-xs text-muted-foreground">Compartilhe como se sente agora</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
