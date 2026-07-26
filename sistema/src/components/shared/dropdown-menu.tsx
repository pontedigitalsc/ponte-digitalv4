'use client'

import { useState, useCallback, type ReactNode } from 'react'
import { MoreHorizontal } from 'lucide-react'

interface MenuItem {
  label: string
  onClick: () => void
  variant?: 'default' | 'danger'
  icon?: ReactNode
}

interface DropdownMenuProps {
  items: (MenuItem | 'divider')[]
  trigger?: ReactNode
  width?: string
  align?: 'right' | 'left'
}

export function DropdownMenu({ items, trigger, width = 'w-44', align = 'right' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent transition-colors"
      >
        {trigger ?? <MoreHorizontal className="h-4 w-4 text-muted-foreground" />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={close} />
          <div
            className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} top-full z-20 mt-1 ${width} rounded-lg border bg-card shadow-lg py-1 text-sm`}
          >
            {items.map((item, i) =>
              item === 'divider' ? (
                <div key={`div-${i}`} className="my-1 h-px bg-border" />
              ) : (
                <button
                  key={item.label}
                  onClick={() => { close(); item.onClick() }}
                  className={`flex w-full items-center gap-2 px-3 py-1.5 transition-colors ${
                    item.variant === 'danger'
                      ? 'text-destructive hover:bg-destructive/10'
                      : 'hover:bg-accent'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  )
}
