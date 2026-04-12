import React from 'react'
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
  loading?: boolean
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
}: Props) {
  const isDisabled = disabled || loading

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${variants[variant]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
        ${className}
      `}
    >
      {!loading && leftIcon && <span>{leftIcon}</span>}

      {loading ? 'Loading...' : children}

      {!loading && rightIcon && <span>{rightIcon}</span>}
    </button>
  )
}