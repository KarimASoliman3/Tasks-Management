import { icons } from './icons'
import type { IconSize } from './types'
import { cn } from '../../../lib/utils'

type IconName = keyof typeof icons

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
  className,
  alt,
}: Props) {
  return (
    <img
      src={icons[name]}
      alt={alt || name}
      className={cn(
        sizes[size],
        'inline-block',
        className
      )}
    />
  )
}