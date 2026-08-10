'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'span'
}

/**
 * Progressive-enhancement reveal. Sem JS, o elemento é renderizado e
 * exibido normalmente (ver .reveal em globals.css, que só some com a
 * classe "js" no <html>). Com JS, um IntersectionObserver por instância
 * adiciona "is-visible" na primeira vez que o elemento entra na tela —
 * discreto, sem reflow, sem dependência de biblioteca externa.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Comp = as as 'div'

  return (
    <Comp
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Comp>
  )
}
