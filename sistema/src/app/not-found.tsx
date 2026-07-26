import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="space-y-1.5 max-w-sm">
        <h1 className="text-4xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-lg font-semibold">Página não encontrada</h2>
        <p className="text-sm text-muted-foreground">
          Esta página não existe ou foi movida.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
