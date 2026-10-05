'use client'

import { useMagnetic } from '@/lib/hooks/use-pointer'

interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.25, className }: MagneticProps) {
  const ref = useMagnetic<HTMLSpanElement>(strength)
  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex' }}>
      {children}
    </span>
  )
}
