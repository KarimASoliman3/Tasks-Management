
// export const inputBaseStyles =
//   "w-full rounded-lg px-4 py-3 outline-none transition bg-surface-highest text-body-md font-normal";

// export const inputVariants = {
//   default: "text-slate-400",
//   error:
//     "bg-error-200  text-error-900 placeholder:text-error-900",
// };


export type InputVariant = 'default' | 'error'

export const baseWrapper = 'flex flex-col gap-2 w-full'

export const labelStyle =
  'text-[10px] font-semibold uppercase text-slate-400'

export const inputBase =
  'w-full rounded-sm  px-4 py-3 text-body-md outline-none transition'

export const variants: Record<InputVariant, string> = {
  default: `
    bg-surface-highest
    text-slate-400
    placeholder:text-slate-400
  `,
  error: `
    bg-error-200
    text-error-900
  `,
}

export const helperText = {
  default: 'text-slate-500 text-[12px]',
  error: 'text-error-900 text-[12px] font-medium',
}