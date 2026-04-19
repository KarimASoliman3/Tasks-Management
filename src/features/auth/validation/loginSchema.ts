import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email format'),

  password: z
    .string()
    .nonempty('Password is required'),

  rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>