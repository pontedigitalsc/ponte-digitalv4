import { PonteSymbol } from '@/components/brand/ponte-logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Brand Panel — a promessa da Ponte, não stats de ERP */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <PonteSymbol variant="micro" surface="mono" className="h-5 w-auto text-white" />
          </div>
          <span className="text-lg font-semibold text-white">Ponte Digital</span>
        </div>
        <div className="space-y-6">
          <p className="text-2xl font-medium text-white leading-relaxed">
            Você não precisa decidir sozinho. Eu ouço, lembro e acompanho a sua empresa — todos os dias.
          </p>
          <div className="space-y-3">
            {[
              { titulo: 'Eu ouço', texto: 'Nossa conversa fica comigo — e evolui a cada dia.' },
              { titulo: 'Eu acompanho', texto: 'Olho seu caixa, seus clientes e o que mudou desde ontem.' },
              { titulo: 'Eu aviso', texto: 'Quando algo merece atenção, você fica sabendo na hora.' },
            ].map((item) => (
              <div key={item.titulo} className="rounded-lg bg-white/10 p-4">
                <p className="text-sm font-semibold text-white">{item.titulo}</p>
                <p className="text-sm text-white/70">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-white/60">
          Ponte Digital — o parceiro que acompanha o dono da empresa
        </p>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <PonteSymbol variant="micro" surface="mono" className="h-5 w-auto text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">Ponte Digital</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
