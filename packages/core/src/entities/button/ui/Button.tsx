import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../shared/lib/cn'
import type { ButtonVariant, ButtonSize } from '../model/types'
import styles from './Button.module.css'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  /** Renders icon-only layout (no label, square padding) */
  iconOnly?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          iconOnly && styles.iconOnly,
          loading && styles.loading,
          className,
        )}
        {...rest}
      >
        {loading ? (
          <span className={styles.spinner} aria-hidden />
        ) : (
          leftIcon && <span aria-hidden>{leftIcon}</span>
        )}
        {!iconOnly && children}
        {rightIcon && !loading && <span aria-hidden>{rightIcon}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
