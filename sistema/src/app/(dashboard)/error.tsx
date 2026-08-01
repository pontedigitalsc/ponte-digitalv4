'use client'

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
    // eslint-disable-next-line no-console
    console.error('[dashboard-error-boundary]', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-lg font-semibold">Isso acontece às vezes</h2>
        <p className="text-sm text-muted-foreground">
          Alguma coisa não carregou por completo. Pode tentar de novo — se continuar, é só me avisar.
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Button onClick={reset} variant="default" size="sm">
          <RefreshCw className="h-3.5 w-3.5" />
          Tentar de novo
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard">
            <Home className="h-3.5 w-3.5" />
            Voltar ao início
          </Link>
        </Button>
      </div>
    </div>
  )
}
