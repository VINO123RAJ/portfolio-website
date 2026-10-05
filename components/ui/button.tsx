import Link from 'next/link'
import styles from './button.module.css'
import { Icon } from '@/components/ui/icon'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: string
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  className?: string
  magnetic?: boolean
}

interface ButtonAsButton extends BaseProps {
  as?: 'button'
  href?: never
  external?: never
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  'aria-label'?: string
}

interface ButtonAsLink extends BaseProps {
  as: 'link'
  href: string
  external?: boolean
  onClick?: never
  type?: never
  disabled?: never
  loading?: never
  'aria-label'?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    fullWidth,
    className,
  } = props

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && <Icon name={icon} size={size === 'lg' ? 18 : 16} />}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <Icon name={icon} size={size === 'lg' ? 18 : 16} />}
    </>
  )

  if (props.as === 'link') {
    const { href, external } = props
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={props['aria-label']}
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} aria-label={props['aria-label']}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      aria-label={props['aria-label']}
      aria-busy={props.loading}
    >
      {props.loading && <span className={styles.spinner} aria-hidden="true" />}
      {content}
    </button>
  )
}
