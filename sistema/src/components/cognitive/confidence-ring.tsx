'use client'

import { cn } from '@/lib/utils'
import { CONFIDENCE_RING } from '@/lib/tokens/motion'

interface ConfidenceRingProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

function getConfidenceColor(value: number): string {
  if (value >= CONFIDENCE_RING.THRESHOLDS.MID) return 'stroke-emerald-500'
  if (value >= CONFIDENCE_RING.THRESHOLDS.LOW) return 'stroke-amber-500'
  return 'stroke-red-500'
}

function getRingBg(value: number): string {
  if (value >= CONFIDENCE_RING.THRESHOLDS.MID) return 'text-emerald-200 dark:text-emerald-800'
  if (value >= CONFIDENCE_RING.THRESHOLDS.LOW) return 'text-amber-200 dark:text-amber-800'
  return 'text-red-200 dark:text-red-800'
}

function getLabel(value: number): string {
  if (value >= CONFIDENCE_RING.THRESHOLDS.MID) return 'Alta'
  if (value >= CONFIDENCE_RING.THRESHOLDS.LOW) return 'Média'
  return 'Baixa'
}

const DIMENSIONS = { sm: 16, md: 24, lg: 32 }
const STROKE_WIDTH = { sm: 2, md: 2.5, lg: 3 }

export function ConfidenceRing({ value, size = 'md', showLabel = false, className }: ConfidenceRingProps) {
  const dim = DIMENSIONS[size]
  const stroke = STROKE_WIDTH[size]
  const radius = (dim - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const color = getConfidenceColor(value)

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <svg
        width={dim}
        height={dim}
        className={cn('animate-scale-in', color)}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className={getRingBg(value)}
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all"
          style={{ transitionDuration: `${CONFIDENCE_RING.TRANSITION_MS}ms` }}
        />
      </svg>
      {showLabel && (
        <span className="text-xs text-muted-foreground">
          {getLabel(value)} ({value}%)
        </span>
      )}
    </div>
  )
}
