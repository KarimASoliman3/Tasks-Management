import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpFormData } from '../validation/signUpSchema'
import { sendRegisterData } from '../api/signUp'
import { Button } from '../../../components/ui/Button'
import { ValidationCheckboxHint } from '../../../components/ui/ValidationCheckboxHint'
import { Input } from '../../../components/ui/Input/Input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

export function SignUpForm() {
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      jobTitle: '',
    },
    mode: 'onBlur',
  })

  const password = watch('password') || ''

  const passwordRules = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    {
      label: 'One uppercase, one lowercase, and one digit',
      valid: /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password),
    },
    {
      label: 'One special character',
      valid: /[!@#$%^&*]/.test(password),
    },
  ]

  const navigate = useNavigate();

 const signUp = async (data: SignUpFormData) => {
  try {
    setApiError(null)

    const response = await sendRegisterData(data, '/signup')

    // ❌ ERROR CASE
    if (response?.error) {
      const message = response.msg || 'Sign up failed'

      setApiError(message)
      toast.error(message)
      return
    }

    // ✅ SUCCESS CASE
    toast.success('Account created successfully!')

    navigate('/login') // 👈 ONLY here (after success)
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Unexpected error occurred'

    setApiError(message)
    toast.error(message)
  }
}

  return (
    <div className="min-h-screen max-w-xl flex flex-col items-centerbg-background min-[390px]:bg-white p-6 min-[390px]:p-12 rounded-lg shadow-[0px_24px_48px_0px_#041B3C0F]">
      {/* Header */}
      <div className=" text-center space-y-[6.87px] min-[390px]:space-y-2 mb-10">
        <h1 className="font-semibold text-[28px] min-[390px]:text-3xl text-slate-900">Create your workspace </h1>
        <p className="text-slate-600 text-[14px]">
          Join the editorial approach to task management.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(signUp)} className="w-full">
        {/* Name */}
        <div className="mb-6">
          <Input
            label="Name"
            placeholder="Enter your full name"
            {...register('name')}
            error={errors.name?.message && touchedFields.name ? errors.name.message : undefined}
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <Input
            label="Email"
            placeholder="yourname@company.com"
            {...register('email')}
            error={errors.email?.message && touchedFields.email ? errors.email.message : undefined}
          />
        </div>

        {/* Job Title */}
        <div className="mb-6">
          <Input
            label="Job Title (Optional)"
            placeholder="e.g. Project Manager"
            {...register('jobTitle')}
            error={
              errors.jobTitle?.message && touchedFields.jobTitle
                ? errors.jobTitle.message
                : undefined
            }
          />
        </div>

        {/* Password */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              label="Password"
              type="password"
              placeholder="Minimum 8 characters"
              {...register('password')}
              error={
                errors.password?.message && touchedFields.password
                  ? errors.password.message
                  : undefined
              }
            />
          </div>

          <div className="flex-1">
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              {...register('confirmPassword')}
              error={
                errors.confirmPassword?.message && touchedFields.confirmPassword
                  ? errors.confirmPassword.message
                  : undefined
              }
            />
          </div>
        </div>

        {/* Password rules */}
        {password && (
          <div className="mb-6">
            <ValidationCheckboxHint items={passwordRules} />
          </div>
        )}

        {/* Submit */}
        <Button loading={isSubmitting} variant="primary" className="w-full">
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
        {/* API Error */}
        {apiError && (
          <div className="w-full px-2 py-3 text-sm text-error text-center">
            {apiError}
          </div>
        )}
        {/* Footer */}
        <div className="pt-8 text-center text-slate-600 text-[14px]">
          <p>
            Already have an account?
            <span 
              onClick={() => navigate('/login')}
              className="text-primary hover:text-primary-container cursor-pointer font-semibold">
              {' '}
              Log in
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}
