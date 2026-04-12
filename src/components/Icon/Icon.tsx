import { icons } from './icons'
import type { IconSize } from './types'

type IconName = keyof typeof icons

// type IconSize = 'sm' | 'md' | 'lg'

type Props = {
  name: IconName
  size?: IconSize
  className?: string
  alt?: string
}

const sizes: Record<IconSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export function Icon({
  name,
  size = 'md',
  className = '',
  alt,
}: Props) {
  return (
    <img
      src={icons[name]}
      alt={alt || name}
      className={`${sizes[size]} ${className}`}
    />
  )
}