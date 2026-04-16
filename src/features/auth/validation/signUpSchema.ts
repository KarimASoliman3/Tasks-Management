import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .trim()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be at most 50 characters')
      .regex(/^[\p{L}]+(?:\s[\p{L}]+)*$/u, 'Name must contain only letters and single spaces'),

    email: z.string().trim().min(1, 'Email is required').email('Invalid email format'),

    password: z
      .string()
      .nonempty('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be at most 64 characters')
      .refine((val) => !/\s/.test(val), {
        message: 'Password must not contain spaces',
      })
      .superRefine((val, ctx) => {
        if (!/[A-Z]/.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Must contain at least one uppercase letter (A–Z)',
          })
        }
        if (!/[a-z]/.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Must contain at least one lowercase letter (a–z)',
          })
        }
        if (!/[0-9]/.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Must contain at least one digit (0–9)',
          })
        }
        if (!/[!@#$%^&*]/.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Must contain at least one special character (!@#$%^&*)',
          })
        }
      }),

    confirmPassword: z.string().nonempty('Confirm password is required'),

    jobTitle: z.string().trim().max(100).optional(),
  })
  .refine(
    (data) => data.password && data.confirmPassword && data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  )

export type SignUpFormData = z.infer<typeof signUpSchema>
