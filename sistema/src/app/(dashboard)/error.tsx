'use client'

// Error boundaries do App Router precisam ser Client Component — mesmo
// capturando falhas de Server Components (como as 10 queries paralelas
// do Dashboard). Este arquivo vive no nível do grupo (dashboard) para
// cobrir as 9 páginas de uma vez, em vez de duplicar o mesmo fallback
// em cada pasta individualmente.

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log estruturado no console do servidor/cliente — próximo passo
    // natural aqui seria enviar para um serviço de observabilidade
    // (item já registrado como pendência em revisões anteriores), mas
    // não faz parte do escopo desta correção pontual.
    // eslint-disable-next-line no-console
    console.error('[dashboard-error-boundary]', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-lg font-semibold">Algo deu errado ao carregar esta página</h2>
        <p className="text-sm text-muted-foreground">
          Isso pode ter sido uma instabilidade temporária. Tente novamente — se o
          problema continuar, entre em contato com o suporte.
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Button onClick={reset} variant="default" size="sm">
          <RefreshCw className="h-3.5 w-3.5" />
          Tentar novamente
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard">
            <Home className="h-3.5 w-3.5" />
            Ir para o Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
