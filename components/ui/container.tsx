import { createElement } from 'react'
import styles from './container.module.css'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide' | 'full'
  as?: React.ElementType
}

export function Container({ children, className, size = 'default', as = 'div' }: ContainerProps) {
  const classes = [styles.container, styles[size], className].filter(Boolean).join(' ')

  return createElement(as, { className: classes }, children)
}
