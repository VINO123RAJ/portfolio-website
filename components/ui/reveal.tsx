'use client'

import { createElement, type CSSProperties } from 'react'
import { useInView } from '@/lib/hooks/use-in-view'
import styles from './reveal.module.css'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: React.ElementType
  y?: number
}

export function Reveal({ children, delay = 0, className, as = 'div', y = 28 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  const classes = [styles.reveal, inView ? styles.visible : '', className].filter(Boolean).join(' ')

  const style = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-y': `${y}px`,
  } as CSSProperties

  return createElement(as, { ref, className: classes, style }, children)
}
