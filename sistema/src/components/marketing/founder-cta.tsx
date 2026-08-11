import Link from 'next/link'

interface FounderCTAProps {
  className?: string
  variant?: 'evergreen' | 'secondary'
  children: React.ReactNode
}

export function FounderCTA({ className, variant = 'secondary', children }: FounderCTAProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-medium transition-colors'
  const styles =
    variant === 'evergreen'
      ? 'bg-night-green text-white hover:bg-night-green-soft'
      : 'border border-night-700/70 bg-night-surf/60 text-night-text hover:bg-night-800/70'

  return (
    <Link href="/solicitar-founder" className={`${base} ${styles} ${className ?? ''}`}>
      {children}
    </Link>
  )
}
