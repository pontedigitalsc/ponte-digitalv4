import { requireUser } from '@/lib/auth'
import { experienceEngine } from '@/engine'
import { AvatarPonte } from '@/components/ui/avatar'
import Link from 'next/link'

export const metadata = { title: 'Minha Jornada' }

export default async function MinhaJornadaPage() {
  const usuario = await requireUser()
  const nome = usuario.nome.split(' ')[0]

  const historia = await experienceEngine.obterHomeExperience(usuario.empresaId)
  const retrato = historia.narrativaEmpresarial?.retratoVivo

  const capitulos = [
    {
      titulo: 'Primeira conversa',
      descricao: 'O momento em que você decidiu olhar para sua empresa de fora.',
      icone: '🌱',
      cor: 'border-green-400/30',
    },
    {
      titulo: 'Primeiro desafio',
      descricao: retrato?.riscos?.[0] ?? 'O primeiro obstáculo que apareceu no caminho.',
      icone: '🪨',
      cor: 'border-amber-400/30',
    },
    {
      titulo: 'Primeira mudança',
      descricao: 'Algo começou a mudar depois que você passou a observar sua empresa com atenção.',
      icone: '🔄',
      cor: 'border-blue-400/30',
    },
    {
      titulo: 'Primeira vitória',
      descricao: retrato?.forcas?.[0] ?? 'Um momento em que algo deu certo e você percebeu.',
      icone: '🌟',
      cor: 'border-yellow-400/30',
    },
    {
      titulo: 'Maior aprendizado',
      descricao: 'O que administrar sua empresa está te ensinando sobre você.',
      icone: '📖',
      cor: 'border-purple-400/30',
    },
    {
      titulo: 'Grandes decisões',
      descricao: 'As escolhas que definiram o rumo até aqui.',
      icone: '🎯',
      cor: 'border-red-400/30',
    },
    {
      titulo: 'Transformações',
      descricao: 'Como sua empresa mudou — e como você mudou junto.',
      icone: '🦋',
      cor: 'border-pink-400/30',
    },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <AvatarPonte state="success" size="lg" />
        <h1 className="text-2xl font-semibold tracking-tight">{nome}, sua jornada</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Cada conversa é um capítulo. Cada percepção é uma página. Sua empresa não é um relatório — é uma história.
        </p>
      </div>

      <div className="space-y-3">
        {capitulos.map((cap) => (
          <div
            key={cap.titulo}
            className={`rounded-xl border-l-4 ${cap.cor} border bg-card p-5 space-y-2 hover:bg-muted/30 transition-colors`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{cap.icone}</span>
              <h3 className="font-semibold text-sm">{cap.titulo}</h3>
            </div>
            <p className="text-sm text-muted-foreground pl-10">{cap.descricao}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-4 pb-8">
        <Link
          href="/conversa"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Continuar minha história
        </Link>
      </div>
    </div>
  )
}
