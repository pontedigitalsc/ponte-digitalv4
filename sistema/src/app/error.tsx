'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function RootErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('[root-error-boundary]', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-7 w-7 text-destructive" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h2 className="text-lg font-semibold">Algo deu errado</h2>
        <p className="text-sm text-muted-foreground">
          Tente novamente ou volte para o início.
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <Button onClick={reset} variant="default" size="sm">
          <RefreshCw className="h-3.5 w-3.5" />
          Tentar novamente
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard">
            Ir para o Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
