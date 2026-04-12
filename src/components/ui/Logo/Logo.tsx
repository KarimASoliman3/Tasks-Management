import { forwardRef } from 'react'
import { cn } from '../../../lib/utils'
import type { LogoProps } from './types'

const sizes = {
  sm: {
    img: 'w-[14px] h-[16px]',
    text: 'text-[16px]',
    gap: 'gap-1.5',
  },
  md: {
    img: 'w-[18px] h-[20px]',
    text: 'text-[20px]',
    gap: 'gap-2',
  },
  lg: {
    img: 'w-[22px] h-[24px]',
    text: 'text-[24px]',
    gap: 'gap-3',
  },
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { text, src, alt = 'logo', size = 'md', asLink = false, href = '/', className, ...props },
    ref,
  ) => {
    const selected = sizes[size]

    const content = (
      <div ref={ref} className={cn('inline-flex items-center', selected.gap, className)} {...props}>
        <img src={src} alt={alt} className={selected.img} />

        <span className={cn('font-bold tracking-[-0.5px] text-[#041B3C]', selected.text)}>
          {text}
        </span>
      </div>
    )

    if (asLink) {
      return (
        <a href={href} className="inline-block">
          {content}
        </a>
      )
    }

    return content
  },
)

Logo.displayName = 'Logo'
