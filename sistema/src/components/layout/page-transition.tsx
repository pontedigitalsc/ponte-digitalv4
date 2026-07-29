'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displaying, setDisplaying] = useState(true)
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setDisplaying(false)
      const timeout = setTimeout(() => {
        setDisplaying(true)
        prevPath.current = pathname
      }, 250)
      return () => clearTimeout(timeout)
    }
  }, [pathname])

  return (
    <div className={`transition-opacity duration-200 ${displaying ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  )
}
