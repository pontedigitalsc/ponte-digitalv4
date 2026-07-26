import { Building2 } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Brand Panel */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">Ponte Digital</span>
        </div>
        <div>
          <blockquote className="space-y-2">
            <p className="text-xl font-medium text-white leading-relaxed">
              "Organizamos sua operação para que você possa focar no que realmente importa: crescer."
            </p>
            <footer className="text-sm text-white/70">Ponte Digital — Gestão inteligente para PMEs</footer>
          </blockquote>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Clientes ativos', valor: '200+' },
            { label: 'Processos automatizados', valor: '1.2k' },
            { label: 'Horas economizadas', valor: '50k+' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white/10 p-3">
              <p className="text-xl font-bold text-white">{stat.valor}</p>
              <p className="text-xs text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Ponte Digital</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
