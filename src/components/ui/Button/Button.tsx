import React from 'react'
import { cn } from '../../../lib/utils'
import {
  baseStyles,
  sizes,
  variants,
  type ButtonVariant,
  type ButtonSize,
} from './button.styles'

type Props = {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  disabled?: boolean
  loading?: boolean
  'aria-disabled'?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  ...ariaProps
}: Props) {
  const isDisabled = disabled || loading

  return (
    <button
      className={cn(
        baseStyles,
        sizes[size],
        variants[variant],
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      {...ariaProps}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  )
}