import { icons } from './icons'
import type { IconSize } from './types'
import { cn } from '../../../lib/utils'

type IconName = keyof typeof icons

type Props = {
  name: IconName
  size?: IconSize
  className?: string
  alt?: string
  color?: string
}

const sizes: Record<IconSize, string> = {
  mini:'w-3',
  sm: 'w-4 h-4',
  'sm-x': 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

export function Icon({
  name,
  size = 'md',
  className,
  alt,
  color,
}: Props) {
  const SvgIcon = icons[name]
  return (
    <SvgIcon
      className={cn(sizes[size], 'inline-block [&_path]:fill-current', className)}
      style={color ? { color } : undefined}
      aria-label={alt || name}
      role="img"
    />
  )
}