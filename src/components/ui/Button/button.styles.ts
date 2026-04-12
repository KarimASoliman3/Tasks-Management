export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

/* =========================
   BASE
========================= */
export const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-[2px] transition-all cursor-pointer'

/* =========================
   SIZES
========================= */
export const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-[32px] px-4 py-2 text-body-label-sm',
  md: 'min-h-[40px] px-6 py-[10px] text-body-md',
  lg: 'min-h-[48px] px-8 py-3 text-title-md',
}

/* =========================
   VARIANTS
========================= */
export const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-primary
    text-white
    font-semibold
  `,
  secondary: `
    bg-transparent
    text-primary
    font-semibold
  `,
    // border
    // border-[var(--color-primary)]
  
    ghost: `
    bg-transparent
    text-slate-600
    font-medium
  `,
}