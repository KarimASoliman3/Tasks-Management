import React from 'react'
import {
  baseWrapper,
  labelStyle,
  inputBase,
  variants,
  type InputVariant,
} from './Input.styles'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  variant?: InputVariant
  error?: string
}

export function Input({
  label,
  variant = 'default',
  className = '',
  error,
  ...props
}: Props) {
  const isError = variant === 'error' || !!error

  return (
    <div className={baseWrapper}>
      {/* Label */}
      <label
        className={`${labelStyle} ${error ? 'text-red-500' : ''}`}
      >
        {label}
      </label>

      {/* Input */}
      <input
        {...props}   // 🔥 IMPORTANT FIX
        className={`
          ${inputBase}
          ${variants[isError ? 'error' : 'default']}
          ${className}
        `}
      />

      {/* Error text (optional but recommended) */}
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  )
}